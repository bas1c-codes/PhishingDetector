// content.js

console.log("🚀 Scam/Phishing Detector Loaded");

// ⚠️ NEVER expose API key in production (move to backend later)
const API_KEY = "AIzaSyBIzmbwk8EY4AWLfkH__cGvK9lj6C1Grj0";

// 👀 Observe Gmail DOM
const observer = new MutationObserver(() => {
    const emailBodies = document.querySelectorAll(".a3s");

    emailBodies.forEach(emailBody => {
        if (!emailBody.dataset.scanned) {
            emailBody.dataset.scanned = "true";

            const text = emailBody.innerText;

            const links = emailBody.querySelectorAll("a");
            const linkArray = Array.from(links).map(l => l.href);

            console.log("📩 Email:", text);
            console.log("🔗 Links:", linkArray);

            checkWithGemini(text, linkArray, links);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


// 🔥 MAIN AI CHECK FUNCTION
async function checkWithGemini(text, linkArray, linksNodeList) {
    const prompt = `
You are an advanced cybersecurity AI.

Your job is to detect:
1. Phishing emails
2. Scam / fraud emails

STRICT RULES:
- If email asks for password, OTP, bank details → SCAM
- If email has suspicious or fake links → PHISHING
- Urgency + threats (24 hours, account blocked) → SCAM
- Unknown domains pretending to be banks → PHISHING

Analyze carefully.

Email:
${text}

Links:
${linkArray.join("\n")}

Return ONLY JSON:
{
  "isPhishing": true or false,
  "isScam": true or false,
  "reason": "short explanation",
  "suspiciousLinks": ["exact_link1", "exact_link2"]
}
`;

    try {
        console.log("📡 Calling Gemini...");

        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

        const data = await res.json();
        console.log("📦 RAW RESPONSE:", data);

        let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            console.log("❌ No AI response");
            return;
        }

        // 🧠 Extract JSON safely
        const match = textResponse.match(/\{[\s\S]*\}/);
        if (!match) {
            console.log("❌ No JSON found");
            return;
        }

        const result = JSON.parse(match[0]);

        console.log("🤖 AI Result:", result);

        // 🎯 ACTIONS
        handleDetection(result, linksNodeList);

    } catch (err) {
        console.error("❌ Gemini error:", err);
    }
}


// 🚨 HANDLE DETECTION RESULT
function handleDetection(result, linksNodeList) {

    if (!result) return;

    // 🔴 Highlight links if phishing
    if (result.isPhishing) {
        linksNodeList.forEach(link => {
            link.style.border = "3px solid red";
            link.style.backgroundColor = "#ff000033";
        });
    }

    // 🟠 Highlight text if scam
    if (result.isScam) {
        document.body.style.boxShadow = "inset 0 0 0 5px orange";
    }

    // 🚨 ALERT USER
    if (result.isPhishing || result.isScam) {
        showAlert(result);
    }
}


// 🚨 UI ALERT
function showAlert(result) {

    const alertBox = document.createElement("div");

    alertBox.innerText =
        `⚠️ WARNING!\n\n` +
        `Phishing: ${result.isPhishing}\n` +
        `Scam: ${result.isScam}\n\n` +
        `Reason: ${result.reason}`;

    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.padding = "15px";
    alertBox.style.backgroundColor = "#ff4444";
    alertBox.style.color = "white";
    alertBox.style.zIndex = "999999";
    alertBox.style.fontSize = "14px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    alertBox.style.whiteSpace = "pre-line";

    document.body.appendChild(alertBox);

    // ⏳ Auto remove after 6 sec
    setTimeout(() => {
        alertBox.remove();
    }, 15000);
}