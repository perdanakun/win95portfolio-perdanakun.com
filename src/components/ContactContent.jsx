import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Frame } from '@react95/core';
import { Wangimg128, Files } from '@react95/icons';
import closeIcon from '../assets/close.svg';
import messageSentSound from '../assets/sounds/message_sent.wav';



export default function ContactContent({
  isMobile,
  onSendSuccess,
  onSendError,
  onOpenCamera,
  cameraAttachment,
  onRemoveAttachment,
  onAttachmentTooLarge
}) {
  // ================= STATE =================

  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('❤️ Personal Note');
  const [message, setMessage] = useState('');
  const [fromFocused, setFromFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

// ================= FILE ATTACHMENT =================

const fileInputRef = useRef(null);

const [fileAttachment, setFileAttachment] = useState(null);
const [fileAttachmentUrl, setFileAttachmentUrl] = useState(null);

// ================= FILE SIZE SETTINGS =================

const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5 MB


// ================= HELPER FILE SIZE =================

const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


// ================= FILE TOO LARGE ALERT =================

const showFileTooLargeAlert = (file) => {
  if (onAttachmentTooLarge) {
    onAttachmentTooLarge(file);
  }
};

// ================= FILE SELECT =================

const handleFileSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  // ================= CHECK FILE SIZE =================

  if (file.size > MAX_FILE_SIZE) {
    showFileTooLargeAlert(file);

    // Memungkinkan memilih file yang sama lagi
    e.target.value = '';

    return;
  }

  // ================= SAVE FILE =================

  setFileAttachment(file);

  const url = URL.createObjectURL(file);

  setFileAttachmentUrl(url);

  // Memungkinkan memilih file yang sama lagi
  e.target.value = '';
};

const handleRemoveFileAttachment = () => {
  if (fileAttachmentUrl) {
    URL.revokeObjectURL(fileAttachmentUrl);
  }

  setFileAttachment(null);
  setFileAttachmentUrl(null);
};


// ================= CAMERA ATTACHMENT =================

const [attachmentUrl, setAttachmentUrl] = useState(null);

useEffect(() => {
  if (!cameraAttachment) {
    setAttachmentUrl(null);
    return;
  }

  // ================= CHECK CAMERA FILE SIZE =================

  if (cameraAttachment.size > MAX_FILE_SIZE) {
    showFileTooLargeAlert(cameraAttachment);

    // Hapus camera attachment dari parent
    if (onRemoveAttachment) {
      onRemoveAttachment();
    }

    setAttachmentUrl(null);

    return;
  }

  // ================= CREATE CAMERA PREVIEW URL =================

  const url = URL.createObjectURL(cameraAttachment);

  setAttachmentUrl(url);

  return () => {
    URL.revokeObjectURL(url);
  };
}, [cameraAttachment]);

  // ================= FORM VALIDATION =================

  const isFormValid =
    from.trim() !== '' &&
    message.trim() !== '';

 // RESPONSIVE LABEL
const labelStyle = {
  width: isMobile ? 55 : 70,
  minWidth: isMobile ? 55 : 70,
  flexShrink: 0,
  fontSize: 12,
  color: '#000',
};



// ================= HELPER BASE SEND EMAIL =================
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      // result = "data:image/png;base64,AAAA..."
      // Kita hanya kirim bagian Base64-nya
      const base64 = result.split(',')[1];

      resolve(base64);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

// ================= SEND + SOUND =================
const handleSend = async () => {
  if (!isFormValid) {
    return;
  }

  try {
    // 1. Kumpulkan semua attachment
    const filesToSend = [];

    if (fileAttachment) {
      filesToSend.push(fileAttachment);
    }

    if (cameraAttachment) {
      filesToSend.push(cameraAttachment);
    }

    // 2. Convert SEMUA attachment ke Base64
    const attachments = [];

    for (const file of filesToSend) {
      const base64 = await fileToBase64(file);

      attachments.push({
        filename: file.name || 'attachment',
        content: base64,
      });
    }

    console.log('Attachments to send:', attachments);

    // 3. Kirim ke Vercel API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        subject,
        message,
        attachments,
      }),
    });

    // 4. Ambil response backend
    const result = await response.json();

    console.log('API response:', result);

    // 5. Kalau gagal, jangan anggap email terkirim
    if (!response.ok || !result.success) {
      throw new Error(
        result.error || 'Failed to send email'
      );
    }

    // 6. EMAIL BERHASIL → sound
    const audio = new Audio(messageSentSound);

    audio.currentTime = 0;

    audio.play().catch(() => {});

    // 7. EMAIL BERHASIL → alert
    if (onSendSuccess) {
      onSendSuccess();
    }

    // 8. Reset form
    setFrom('');
    setSubject('❤️ Personal Note');
    setMessage('');

    // 9. Reset file attachment
    handleRemoveFileAttachment();

    // 10. Reset camera attachment
    if (onRemoveAttachment) {
      onRemoveAttachment();
    }

    } catch (error) {
      console.error('Send email error:', error);

      if (onSendError) {
        onSendError();
      }
    }
};


  return (

    
    <Modal.Content
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
        background: '#c0c0c0'
      }}
    >
{/* =========================
    MENU BAR
========================= */}
<div
  style={{
    display: 'flex',
    gap: '6px',
    padding: '2px 6px',
    backgroundColor: '#c0c0c0',
    borderBottom: '1px solid #808080',
    fontSize: '11px',
    userSelect: 'none',
  }}
>
  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>F</u>ile
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>E</u>dit
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>V</u>iew
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>I</u>nsert
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    F<u>o</u>rmat
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>T</u>ools
  </span>

  <span
    style={{
      padding: '1px 4px',
    }}
  >
    <u>H</u>elp
  </span>
</div>


      {/* ================= MAIL BODY ================= */}

      <Frame
        bgColor="#c0c0c0"
        boxShadow="$in"
        style={{
          flex: 1,
          margin: 2,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          minHeight: 0
        }}
      >

        {/* ================= FROM ================= */}

        <div style={rowStyle}>

          <label style={labelStyle}>
            From:
          </label>

        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          onFocus={() => setFromFocused(true)}
          onBlur={() => setFromFocused(false)}
          placeholder={
            fromFocused
              ? ''
              : 'your.email@mail.com'
          }
          style={inputStyle}
        />

        </div>


        {/* ================= SUBJECT ================= */}

        <div style={rowStyle}>

          <label style={labelStyle}>
            Subject:
          </label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={inputStyle}
          >
            <option>❤️ Personal Note</option>
            <option>💼 Job Opportunity</option>
            <option>🐣 Project Collaboration</option>
          </select>

        </div>

{/* ================= TO + ATTACHMENT + CAMERA + SEND ================= */}

<div
  style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    width: '100%',
    minWidth: 0,
    gap: isMobile ? 6 : 0,
  }}
>
  {/* ================= TO ================= */}

  <div
    style={{
      ...rowStyle,
      flex: 1,
      minWidth: 0,
      width: '100%',
    }}
  >

    <label style={labelStyle}>
      To:
    </label>

    <input
      disabled
      value="Perdana Kurniawan Arta"
      style={{
        ...inputStyle,

        flex: 1,
        minWidth: 0,

        background: '#c5c4c4',
        color: '#555',
        boxSizing: 'border-box',
      }}
    />

  </div>


{/* ================= ACTION BUTTONS ================= */}

<div
  style={{
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 'auto',
    marginTop: 0,
    paddingTop: 0,
  }}
>

    {/* FILE INPUT */}

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*,.pdf,.doc,.docx,.txt"
      onChange={handleFileSelect}
      style={{
        display: 'none',
      }}
    />


    {/* ATTACHMENT */}

    <Button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      style={{
        width: 32,
        height: 28,
        minWidth: 32,
        padding: 0,
        marginLeft: isMobile ? 0 : 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexShrink: 0,
      }}
      title="Attach file"
    >
      📎
    </Button>


    {/* CAMERA */}

    <Button
      type="button"
      onClick={onOpenCamera}
      style={{
        width: 32,
        height: 28,
        minWidth: 32,
        padding: 0,
        marginLeft: 4,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexShrink: 0,
      }}
      title="Take photo"
    >
      📷
    </Button>


    {/* SEND */}

    <Button
      type="button"
      disabled={!isFormValid}
      onClick={isFormValid ? handleSend : undefined}
      style={{
        width: 90,
        minWidth: 90,
        height: 28,

        padding: 0,
        marginLeft: 4,

        color: isFormValid
          ? '#000'
          : '#808080',

        textShadow: isFormValid
          ? 'none'
          : '1px 1px 0 #fff',

        pointerEvents: isFormValid
          ? 'auto'
          : 'none',

        flexShrink: 0,
      }}
    >
      Send
    </Button>

  </div>

</div>



        {/* ================= MESSAGE ================= */}
<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onFocus={() => setMessageFocused(true)}
  onBlur={() => setMessageFocused(false)}
  placeholder={
    messageFocused
      ? ''
      : 'Write your message here...'
  }
  style={{
    flex: 1,
    minHeight: 0,
    resize: 'none',
    border: 'none',
    outline: 'none',
    padding: 10,
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: 12,
    background: '#fff',
    color: '#000',
    caretColor: '#000',
    boxShadow:
      'inset 1px 1px 0 #808080, inset -2px -2px 0 #ffffff'
  }}
/>




{/* =================  Parrent Attachement ================= */}

<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 0
  }}
>


<Frame
  bgColor="#c0c0c0"
  boxShadow="$in"
  style={{
    display: 'flex',
    flexDirection: 'column',
gap: '0',
padding: '0 6px',
    width: '100%',
    boxSizing: 'border-box'
  }}
>

{/* FILE INFO */}
{!fileAttachment && !cameraAttachment && (
  <div
    style={{
      height: 28,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',

      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: 10,
      color: '#555',

      padding: '0 0 0 0',
      lineHeight: '12px',
    }}
  >
    Accepted: Images, PDF, DOC, DOCX, TXT — max 1.5 MB per file
  </div>
)}


{/* ================= FILE ATTACHMENT ================= */}

{fileAttachment && (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',

      height: 28,
      boxSizing: 'border-box',

      width: '100%',
      minWidth: 0,
      gap: 6
    }}
  >

    {/* FILE INFO */}
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        overflow: 'hidden'
      }}
    >
      <Files variant="16x16_4" />

<a
  href={fileAttachmentUrl || '#'}
  target="_blank"
  rel="noopener noreferrer"
  title="Open file"
  style={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#0000ee',
    textDecoration: 'underline',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: 11,
    cursor: 'pointer',
    minWidth: 0,
  }}
>
  {fileAttachment.name}
</a>

<span
  style={{
    flexShrink: 0,
    color: '#666',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: 10,
  }}
>
  ({formatFileSize(fileAttachment.size)})
</span>
    </div>

    {/* REMOVE FILE */}
    <Button
      onClick={handleRemoveFileAttachment}
      title="Remove attachment"
      style={{
        width: 16,
        height: 16,
        minWidth: 16,
        maxWidth: 16,
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <img
        src={closeIcon}
        alt="Remove attachment"
        style={{
          width: 8,
          height: 8,
          pointerEvents: 'none'
        }}
      />
    </Button>

  </div>
)}


{/* ================= CAMERA ATTACHMENT ================= */}

{cameraAttachment && attachmentUrl && (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',

      height: 28,
      boxSizing: 'border-box',

      width: '100%',
      minWidth: 0,
      gap: 6
    }}
  >

    {/* CAMERA INFO */}
<div
  style={{
    flex: 1,
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
  }}
>
      <Wangimg128 variant="16x16_4" />
<a
  href={attachmentUrl}
  target="_blank"
  rel="noopener noreferrer"
  title="Open photo"
  style={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#0000ee',
    textDecoration: 'underline',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: 11,
    cursor: 'pointer',
    minWidth: 0,
  }}
>
  {cameraAttachment.name || 'Camera photo'}
</a>

<span
  style={{
    flexShrink: 0,
    color: '#666',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: 10,
  }}
>
  ({formatFileSize(cameraAttachment.size)})
</span>

    </div>

    {/* REMOVE CAMERA */}
    <Button
      onClick={onRemoveAttachment}
      title="Remove attachment"
      style={{
        width: 16,
        height: 16,
        minWidth: 16,
        maxWidth: 16,
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <img
        src={closeIcon}
        alt="Remove attachment"
        style={{
          width: 8,
          height: 8,
          pointerEvents: 'none'
        }}
      />
    </Button>

  </div>
)}
</Frame>
</div>

{/* ================= MOBILE ACTION BUTTONS ================= */}

{isMobile && (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 28,
      marginTop: -4,
      marginBottom: 0,
      gap: 4,
      boxSizing: 'border-box',
    }}
  >

    {/* FILE INPUT */}

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*,.pdf,.doc,.docx,.txt"
      onChange={handleFileSelect}
      style={{
        display: 'none',
      }}
    />


    {/* ATTACHMENT */}

    <Button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      style={{
        width: 32,
        minWidth: 32,
        height: 28,

        padding: 0,
        margin: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexShrink: 0,
      }}
      title="Attach file"
    >
      📎
    </Button>


    {/* CAMERA */}

    <Button
      type="button"
      onClick={onOpenCamera}
      style={{
        width: 32,
        minWidth: 32,
        height: 28,

        padding: 0,
        margin: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexShrink: 0,
      }}
      title="Take photo"
    >
      📷
    </Button>


    {/* SEND */}

    <Button
      type="button"
      disabled={!isFormValid}
      onClick={isFormValid ? handleSend : undefined}
      style={{
        flex: 1,
        minWidth: 0,
        height: 28,

        padding: 0,
        margin: 0,

        color: isFormValid
          ? '#000'
          : '#808080',

        textShadow: isFormValid
          ? 'none'
          : '1px 1px 0 #fff',

        pointerEvents: isFormValid
          ? 'auto'
          : 'none',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        boxSizing: 'border-box',
      }}
    >
      Send
    </Button>

  </div>
)}
      </Frame>
    </Modal.Content>
  );
}


/* ================= STYLES ================= */


const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
};


const inputStyle = {
  flex: 1,
  height: 28,
  padding: '0 8px',
  border: 'none',
  outline: 'none',
  fontFamily: 'MS Sans Serif, sans-serif',
  fontSize: 12,
  background: '#fff',
  color: '#000',
  caretColor: '#000',
  boxShadow:
    'inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff'
};