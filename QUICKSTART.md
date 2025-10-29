# 🚀 Quick Start Guide

*Get your Automation Empire running in 15 minutes*

## Essential Setup (Required)

### 1. Setup Google Apps Script (5 mins)

```bash
# Install Clasp
npm install -g @google/clasp

# Login and create project
cd google-sheets-webhook
clasp login
clasp create --type webapp --title "Phase1-Webhook"

# Deploy
clasp push
clasp deploy
```

**Save the deployment URL** - you'll need it for Tab A9.

### 2. Configure Environment Variables (2 mins)

In Apps Script Editor (`clasp open`):

1. Project Settings ⚙️ → Script Properties
2. Add these properties:
   - **GEMINI_API_KEY**: Get from https://makersuite.google.com/app/apikey
   - **GITHUB_TOKEN**: Get from GitHub Settings → Developer settings → Tokens

### 3. Setup Daily Trigger (1 min)

In Apps Script Editor:
1. Open `gemini-digest.js`
2. Run function: `setupDailyTrigger`
3. Authorize permissions

✅ **Backend complete!**

## Optional Components

### Tab A9 Voice Commands (5 mins)

1. Install LlamaLab Automate on Android
2. Import `automate-flows/tab-a9-voice-flow.json`
3. Update webhook URL in flow
4. Grant permissions and enable

### PC Federation (2 mins)

**AutoHotkey** (Windows):
```bash
# Install from https://www.autohotkey.com/
# Run example script
cd pc-federation/autohotkey-macros
# Double-click example-empire-macro.ahk
```

**Power Automate Desktop**:
- Import flows from `pc-federation/power-automate-flows/`

## Test Your Setup

### Test Webhook
```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"source":"Test","action":"hello","status":"success"}'
```

### Test Digest
In Apps Script, run: `testDigestGeneration()`

### Test Voice
Say: *"Empire, log test activity"*

## What's Next?

- 📖 Read [SETUP.md](SETUP.md) for detailed instructions
- 🏗️ Check [architecture/](architecture/) for system design
- 🔍 Review [daily-digests/](daily-digests/) for example outputs

## Common Issues

**Webhook returns error?**
→ Check Apps Script execution log

**Digest not generating?**
→ Verify API keys are set in Script Properties

**Clasp fails?**
→ Run `clasp login` again

## Support

Full documentation: [SETUP.md](SETUP.md)

---

*"The fastest road to automation starts here!"* 🏛️
