const API_KEY = "AIzaSyBIzmbwk8EY4AWLfkH__cGvK9lj6C1Grj0";
console.log("✅ script loaded");

//const API_KEY = "PASTE_YOUR_API_KEY_HERE";

const button = document.querySelector("button");
const textarea = document.querySelector("textarea");
const resultDiv = document.querySelector(".result");

button.addEventListener("click", async () => {
    console.log("🖱 Button clicked");

    const text = textarea.value.trim();
    console.log("📩 Input:", text);

    if (!text) {
        resultDiv.innerText = "⚠ Enter text";
        resultDiv.className = "result danger";
        return;
    }

    resultDiv.innerText = "🔍 Scanning...";

    const prompt = `
Check if this text is unsafe (phishing or scam).

Text:
${text}

Return ONLY JSON:
{
  "unsafe": true or false
}
`;

    try {
        console.log("📡 Sending request...");

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

        console.log("📡 Response status:", res.status);

        const data = await res.json();
        console.log("📦 Full response:", data);

        let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        console.log("🤖 Raw AI text:", textResponse);

        if (!textResponse) {
            resultDiv.innerText = "❌ No AI response";
            return;
        }

        const match = textResponse.match(/\{[\s\S]*\}/);

        if (!match) {
            resultDiv.innerText = "❌ JSON not found";
            return;
        }

        const result = JSON.parse(match[0]);

        console.log("✅ Parsed:", result);

        if (result.unsafe) {
            resultDiv.innerText = "⚠ Unsafe Content";
            resultDiv.className = "result danger";
        } else {
            resultDiv.innerText = "✔ Safe Content";
            resultDiv.className = "result safe";
        }

    } catch (err) {
        console.error("❌ ERROR:", err);
        resultDiv.innerText = "❌ Failed";
    }
});