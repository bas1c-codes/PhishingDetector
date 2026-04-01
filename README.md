\# Project Name



\## Problem Statement

Online scams and phishing attacks are increasing rapidly. Users often receive emails, messages, or links that look legitimate but are designed to steal sensitive information such as passwords, OTPs, and bank details.



Most users cannot easily identify malicious content, which leads to financial loss and privacy breaches.



\## Project Description

This project is an AI-powered Scam \& Phishing Detection System that analyzes text (emails, messages, or links) and determines whether it is safe or malicious.

⚙️ How it works:

User pastes text into the input box (email/message/link)

On clicking "Scan with AI", the system sends the text to an AI model

The AI analyzes:

Suspicious links

Urgency/threat language

Requests for sensitive data (OTP, password, bank info)

The system returns:

✔ Safe Content

⚠ Unsafe Content

🔥 Key Features:

Real-time scam detection

Phishing link identification

Clean UI with instant results

Can be extended into a browser extension (Gmail protection)



\---



\## Google AI Usage

\### Tools / Models Used

Google Gemini 2.5 Flash

Google AI API

\- 



\### How Google AI Was Used

Google Gemini API is used as the core intelligence engine of the project.



The user input text is sent to Gemini

A structured prompt is used to guide the AI to detect:

Phishing attempts

Scam patterns

Malicious intent

Gemini returns a JSON response indicating whether the content is unsafe

The frontend parses this response and displays the result



This allows the system to understand context, not just keywords — making it far more powerful than traditional rule-based filters.



\---



\## Proof of Google AI Usage

Attach screenshots in a `/proof` folder:



!\[AI Proof](./ss1.png)



\---



\## Screenshots 

Add project screenshots:



!\[Screenshot1](./ss2.png)  

!\[Screenshot2](./ss3.png)



\---



\## Demo Video

Upload your demo video to Google Drive and paste the shareable link here(max 3 minutes).

\[Watch Demo](#)



\---



\## Installation Steps



```bash

\# Clone the repository

git clone <your-repo-link>



\# Go to project folder

cd project-name





