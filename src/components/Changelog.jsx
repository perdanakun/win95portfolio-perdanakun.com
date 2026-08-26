import React from 'react';

import {
  Button,
} from '@react95/core';



/* ======================================
   GITHUB CONFIG
====================================== */

const GITHUB_OWNER = 'perdanakun';

const GITHUB_REPO =
  'win95portfolio-perdanakun.com';

const GITHUB_COMMITS_URL =
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=100`;

const GITHUB_HISTORY_URL =
  `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commits`;


/* ======================================
   CACHE CONFIG
====================================== */

const CACHE_KEY =
  'perdana-changelog-cache';

const CACHE_DURATION =
  60 * 60 * 1000;


/* ======================================
   FORMAT DATE
====================================== */

function formatDate(dateString) {
  const date =
    new Date(dateString);

  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  ).format(date);
}


/* ======================================
   FORMAT COMMIT MESSAGE
====================================== */

function formatCommitMessage(message) {
  if (!message) {
    return '';
  }

  /*
    Git commit messages sometimes contain
    multiple lines.

    We only display the first line.
  */

  let cleanMessage =
    message
      .split('\n')[0]
      .trim();


  /*
    Remove common Conventional Commit
    prefixes.
  */

  cleanMessage =
    cleanMessage.replace(
      /^(feat|fix|style|update|refactor|docs|perf|build|ui|ux)(\(.+?\))?:\s*/i,
      ''
    );


  /*
    Uppercase first letter.
  */

  cleanMessage =
    cleanMessage.charAt(0).toUpperCase() +
    cleanMessage.slice(1);


  /*
    Remove period at the end so all entries
    look visually consistent.
  */

  cleanMessage =
    cleanMessage.replace(/\.$/, '');


  return cleanMessage;
}


/* ======================================
   FILTER COMMITS
====================================== */

function shouldShowCommit(message) {
  if (!message) {
    return false;
  }

  const lower =
    message.toLowerCase();


  /*
    Hide technical / noisy commits
    from portfolio visitors.
  */

  const hiddenPrefixes = [
    'merge ',
    'merge:',
    'chore:',
    'wip:',
    'test:',
    'ci:',
  ];


  return !hiddenPrefixes.some(
    (prefix) =>
      lower.startsWith(prefix)
  );
}


/* ======================================
   GROUP COMMITS BY DATE
====================================== */

function groupCommitsByDate(commits) {
  const groups = {};


  commits.forEach((commit) => {
    const dateString =
      commit?.commit?.author?.date;

    if (!dateString) {
      return;
    }

    const dateKey =
      new Date(dateString)
        .toISOString()
        .split('T')[0];


    if (!groups[dateKey]) {
      groups[dateKey] = {
        date:
          formatDate(dateString),

        commits: [],
      };
    }


    groups[dateKey].commits.push(
      commit
    );
  });


  return Object.values(groups);
}


/* ======================================
   CHANGELOG WINDOW
====================================== */

export default function Changelog({
  isMobile,
  isTablet,
  onClose,
}) {

  /* ====================================
     STATE
  ==================================== */

  const [commits, setCommits] =
    React.useState([]);

  const [isLoading, setIsLoading] =
    React.useState(true);

  const [error, setError] =
    React.useState(null);


  /* ====================================
     CLOSE WINDOW
  ==================================== */

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };


  /* ====================================
     OPEN GITHUB
  ==================================== */

  const handleViewGitHub = () => {
    window.open(
      GITHUB_HISTORY_URL,
      '_blank',
      'noopener,noreferrer'
    );
  };


  /* ====================================
     FETCH GITHUB COMMITS
  ==================================== */

  React.useEffect(() => {

    let isMounted = true;


    const fetchAllCommits =
      async () => {

        let page = 1;
        let allCommits = [];


        while (true) {

          const response =
            await fetch(
              `${GITHUB_COMMITS_URL}&page=${page}`
            );


          if (!response.ok) {
            throw new Error(
              `GitHub request failed: ${response.status}`
            );
          }


          const pageCommits =
            await response.json();


          allCommits = [
            ...allCommits,
            ...pageCommits,
          ];


          /*
            GitHub returns a maximum of
            100 commits per page.

            If this page contains fewer
            than 100 commits, this is the
            final page.
          */

          if (pageCommits.length < 100) {
            break;
          }


          page += 1;
        }


        return allCommits;
      };


    const loadCommits =
      async () => {

        try {

          /* ==============================
             CHECK CACHE
          ============================== */

          const cached =
            localStorage.getItem(
              CACHE_KEY
            );


          if (cached) {
            const parsed =
              JSON.parse(cached);

            const cacheAge =
              Date.now() -
              parsed.timestamp;


            if (
              cacheAge <
              CACHE_DURATION
            ) {

              if (isMounted) {
                setCommits(
                  parsed.commits
                );

                setIsLoading(false);
              }

              return;
            }
          }


          /* ==============================
             FETCH ALL GITHUB COMMITS
          ============================== */

          const data =
            await fetchAllCommits();


          /* ==============================
             FILTER
          ============================== */

          const filteredCommits =
            data.filter(
              (commit) =>
                shouldShowCommit(
                  commit?.commit
                    ?.message
                )
            );


          /*
            GitHub already returns commits
            newest first.

            Do not reverse the array so the
            changelog starts with the latest
            update and visitors can scroll
            all the way down to the first
            commit.
          */


          /* ==============================
             CACHE
          ============================== */

          localStorage.setItem(
            CACHE_KEY,

            JSON.stringify({
              timestamp:
                Date.now(),

              commits:
                filteredCommits,
            })
          );


          /* ==============================
             UPDATE STATE
          ============================== */

          if (isMounted) {
            setCommits(
              filteredCommits
            );

            setIsLoading(false);
          }

        } catch (err) {

          console.error(
            'Failed to load changelog:',
            err
          );


          if (isMounted) {
            setError(true);

            setIsLoading(false);
          }
        }
      };


    loadCommits();


    return () => {
      isMounted = false;
    };

  }, []);


  /* ====================================
     GROUP COMMITS
  ==================================== */

  const groupedCommits =
    groupCommitsByDate(
      commits
    );


  /* ====================================
     RENDER
  ==================================== */
return (
  <article
    aria-labelledby="changelog-title"
    className="ui-font"

    style={{
      width: '100%',
      height: '100%',

      minWidth: 0,
      minHeight: 0,

      boxSizing: 'border-box',

      backgroundColor: '#c0c0c0',

      overflow: 'hidden',

      display: 'flex',
      flexDirection: 'column',

      textAlign: 'left',
    }}
  >


        {/* ==================================
            MAIN ARTICLE
        ================================== */}

        <article
          aria-labelledby="changelog-title"

          className="ui-font"

          style={{
            width: '100%',
            height: '100%',

            minWidth: 0,
            minHeight: 0,

            boxSizing:
              'border-box',

            backgroundColor:
              '#c0c0c0',

            overflow:
              'hidden',

            display:
              'flex',

            flexDirection:
              'column',

            textAlign:
              'left',
          }}
        >


          {/* ==================================
              HEADER
          ================================== */}

          <div
            style={{
              flexShrink: 0,

              width: '100%',

              padding:
                '12px 12px 10px',

              boxSizing:
                'border-box',

              textAlign:
                'left',
            }}
          >

<h1
  id="changelog-title"
  style={{
    margin: 0,
    padding: 0,

    fontFamily:
      'Georgia, "Times New Roman", serif',

    fontSize:
      isMobile
        ? 18
        : 20,

    lineHeight:
      isMobile
        ? '21px'
        : '23px',

    fontWeight: 'bold',

    letterSpacing:
      '-0.4px',

    color: '#000000',

    textAlign: 'left',
  }}
>
  Recent Updates
</h1>



            <p
              className="ui-font"

              style={{
                margin:
                  '5px 0 0',

                padding: 0,

                width: '100%',

                color:
                  '#000000',

                textAlign:
                  'left',
              }}
            >
              Recent changes and improvements
              made to Perdana's Computer.
            </p>

          </div>


          {/* ==================================
              SCROLLABLE CONTENT WRAPPER
          ================================== */}

          <div
            style={{
              flex:
                '1 1 auto',

              minWidth: 0,
              minHeight: 0,

              width:
                '100%',

              padding:
                '0 12px',

              boxSizing:
                'border-box',

              overflow:
                'hidden',
            }}
          >


            {/* ==================================
                WHITE CONTENT PANEL
            ================================== */}

            <section
              aria-label="Recent updates"

              style={{
                width:
                  '100%',

                height:
                  '100%',

                minWidth: 0,
                minHeight: 0,

                backgroundColor:
                  '#ffffff',

                borderTop:
                  '1px solid #808080',

                borderLeft:
                  '1px solid #808080',

                borderRight:
                  '1px solid #ffffff',

                borderBottom:
                  '1px solid #ffffff',

                boxSizing:
                  'border-box',

                overflowY:
                  'auto',

                overflowX:
                  'hidden',

                padding:
                  isMobile
                    ? '14px'
                    : '16px',

                textAlign:
                  'left',
              }}
            >


              {/* ==================================
                  LOADING
              ================================== */}

              {isLoading && (
                <p
                  className="ui-font"

                  style={{
                    margin: 0,

                    padding: 0,

                    color:
                      '#000000',

                    textAlign:
                      'left',
                  }}
                >
                  Checking for recent updates...
                </p>
              )}


              {/* ==================================
                  ERROR
              ================================== */}

              {!isLoading &&
                error && (

                <div
                  style={{
                    textAlign:
                      'left',
                  }}
                >

                  <strong
                    className="ui-font"

                    style={{
                      display:
                        'block',

                      margin:
                        '0 0 10px',

                      color:
                        '#000000',
                    }}
                  >
                    Unable to load updates.
                  </strong>


                  <p
                    className="reading-font"

                    style={{
                      margin: 0,

                      padding: 0,

                      color:
                        '#000000',

                      textAlign:
                        'left',
                    }}
                  >
                    GitHub could not be reached
                    right now. You can still view
                    the complete development history
                    using the button below.
                  </p>

                </div>
              )}


              {/* ==================================
                  EMPTY STATE
              ================================== */}

              {!isLoading &&
                !error &&
                groupedCommits.length === 0 && (

                <p
                  className="ui-font"

                  style={{
                    margin: 0,

                    padding: 0,

                    color:
                      '#000000',

                    textAlign:
                      'left',
                  }}
                >
                  No recent updates found.
                </p>
              )}


              {/* ==================================
                  CHANGELOG GROUPS
              ================================== */}

              {!isLoading &&
                !error &&
                groupedCommits.map(
                  (
                    group,
                    groupIndex
                  ) => (

                  <div
                    key={
                      group.date
                    }

                    style={{
                      margin:
                        groupIndex === 0
                          ? 0
                          : '22px 0 0',

                      padding:
                        groupIndex === 0
                          ? 0
                          : '20px 0 0',

                      borderTop:
                        groupIndex === 0
                          ? 'none'
                          : '1px solid #c0c0c0',

                      textAlign:
                        'left',
                    }}
                  >


                    {/* ==================================
                        DATE
                    ================================== */}

                    <strong
                      className="ui-font"

                      style={{
                        display:
                          'block',

                        margin:
                          '0 0 12px',

                        padding: 0,

                        color:
                          '#000000',

                        fontWeight:
                          700,

                        textAlign:
                          'left',
                      }}
                    >
                      {group.date}
                    </strong>


                    {/* ==================================
                        COMMITS
                    ================================== */}

                    <ul
                      className="reading-font"

                      style={{
                        margin: 0,

                        padding:
                          '0 0 0 18px',

                        color:
                          '#000000',

                        textAlign:
                          'left',
                      }}
                    >

                      {group.commits.map(
                        (
                          commit,
                          commitIndex
                        ) => (

                        <li
                          key={
                            commit.sha
                          }

                          style={{
                            margin:
                              commitIndex ===
                              group.commits.length - 1
                                ? 0
                                : '0 0 10px',

                            padding: 0,

                            textAlign:
                              'left',
                          }}
                        >
                          {formatCommitMessage(
                            commit
                              ?.commit
                              ?.message
                          )}
                        </li>
                      ))}

                    </ul>

                  </div>
                ))}


              {/* ==================================
                  FOOT NOTE
              ================================== */}

              {!isLoading &&
                !error &&
                groupedCommits.length > 0 && (

                <div
                  style={{
                    marginTop:
                      26,

                    paddingTop:
                      16,

                    borderTop:
                      '1px solid #c0c0c0',

                    textAlign:
                      'left',
                  }}
                >

                  <p
                    className="ui-font"

                    style={{
                      margin: 0,

                      padding: 0,

                      color:
                        '#808080',

                      textAlign:
                        'left',
                    }}
                  >
                    Updates are generated from
                    recent GitHub commits.
                  </p>

                </div>
              )}

            </section>

          </div>


          {/* ==================================
              FOOTER
          ================================== */}

          <div
            className="ui-font"

            style={{
              flexShrink: 0,

              width:
                '100%',

              padding:
                '10px 12px 12px',

              boxSizing:
                'border-box',

              backgroundColor:
                '#c0c0c0',
            }}
          >


            {/* ==================================
                SEPARATOR
            ================================== */}

            <div
              aria-hidden="true"

              style={{
                width:
                  '100%',

                height: 2,

                margin:
                  '0 0 9px',

                borderTop:
                  '1px solid #808080',

                borderBottom:
                  '1px solid #ffffff',

                boxSizing:
                  'border-box',
              }}
            />


            {/* ==================================
                BUTTON ROW
            ================================== */}

            <div
              style={{
                display:
                  'flex',

                justifyContent:
                  'flex-end',

                alignItems:
                  'center',

                gap: 8,

                width:
                  '100%',

                flexWrap:
                  isMobile
                    ? 'wrap'
                    : 'nowrap',
              }}
            >

              <Button
                onClick={
                  handleViewGitHub
                }
              >
                View GitHub
              </Button>


<Button
  onClick={onClose}
  style={{
    width: 90,
  }}
>
  Exit
</Button>

            </div>

          </div>

        </article>

      </article>
  );
}