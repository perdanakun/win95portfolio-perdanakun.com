import { chatbotTestCases } from "./api/data/testCases.js";

const ENDPOINT = "http://localhost:3000/api/chat";

async function runTests() {
  console.log("\n🧪 Testing Perdana's Computer AI...\n");

  let passed = 0;
  let failed = 0;

  for (const test of chatbotTestCases) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: test.question,
          history: [],
        }),
      });

      const data = await response.json();

      const answer = data?.text || "";
      const answerLower = answer.toLowerCase();

      const missingRequired = (test.mustInclude || []).filter(
        (item) => !answerLower.includes(item.toLowerCase())
      );

      const forbiddenFound = (test.mustNotInclude || []).filter(
        (item) => answerLower.includes(item.toLowerCase())
      );

      const isPassed =
        missingRequired.length === 0 &&
        forbiddenFound.length === 0;

      console.log("────────────────────────────────────────");

      if (isPassed) {
        passed++;

        console.log(`✅ PASS`);
      } else {
        failed++;

        console.log(`❌ FAIL`);
      }

      console.log(`Question: ${test.question}`);
      console.log(`Answer:   ${answer}`);

      if (missingRequired.length > 0) {
        console.log(
          `Missing:  ${missingRequired.join(", ")}`
        );
      }

      if (forbiddenFound.length > 0) {
        console.log(
          `Forbidden: ${forbiddenFound.join(", ")}`
        );
      }

      if (test.notes) {
        console.log(`Notes:    ${test.notes}`);
      }

      console.log("");
    } catch (error) {
      failed++;

      console.log("────────────────────────────────────────");
      console.log("❌ ERROR");
      console.log(`Question: ${test.question}`);
      console.log(error.message);
      console.log("");
    }
  }

  console.log("========================================");
  console.log("📊 TEST RESULTS");
  console.log("========================================");
  console.log(`✅ Passed : ${passed}`);
  console.log(`❌ Failed : ${failed}`);
  console.log(`🧪 Total  : ${chatbotTestCases.length}`);

  const percentage = Math.round(
    (passed / chatbotTestCases.length) * 100
  );

  console.log(`🎯 Score  : ${percentage}%`);
  console.log("========================================\n");
}

runTests();