# 🔧 Setup Guide - Phase 1 Automation Empire

*Complete installation and configuration instructions*

## Prerequisites

- Google Account (for Sheets and Apps Script)
- GitHub Account
- Android device (for Tab A9 automation)
- Windows PC (optional, for PC Federation)
- Node.js and npm (for Clasp)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/buantyswami111-ux/phase1-automation-empire.git
cd phase1-automation-empire
```

### 2. Setup Google Sheets

1. Create a new Google Sheet
2. Name it "Phase 1 Automation Empire - Forum of Records"
3. Note the Spreadsheet ID from the URL

### 3. Install and Configure Clasp

```bash
# Install Clasp globally
npm install -g @google/clasp

# Login to Google
clasp login

# Navigate to webhook directory
cd google-sheets-webhook

# Create new Apps Script project
clasp create --type webapp --title "Phase1-Webhook-Handler" --parentId YOUR_SPREADSHEET_ID

# Push code to Apps Script
clasp push

# Deploy as web app
clasp deploy --description "Initial deployment"
```

### 4. Configure Apps Script

1. Open Apps Script editor: `clasp open`
2. Go to Project Settings (⚙️ icon)
3. Add Script Properties:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token

**Getting Gemini API Key**:
1. Visit https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and save as `GEMINI_API_KEY`

**Getting GitHub Token**:
1. GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy and save as `GITHUB_TOKEN`

### 5. Deploy Web App

```bash
clasp deploy
```

Note the Web App URL - you'll need this for Tab A9.

### 6. Setup Daily Trigger

1. In Apps Script editor, open `gemini-digest.js`
2. Run function: `setupDailyTrigger()`
3. Authorize the permissions
4. Verify trigger in Triggers menu (⏰ icon)

### 7. Configure Tab A9 (LlamaLab Automate)

1. Install LlamaLab Automate from Google Play
2. Import `automate-flows/tab-a9-voice-flow.json`
3. Update webhook URL in flow with your deployment URL
4. Grant necessary permissions (Microphone, Network)
5. Enable the flow

### 8. Setup PC Federation (Optional)

**AutoHotkey**:
```bash
# Download from https://www.autohotkey.com/
# Install AutoHotkey
# Navigate to pc-federation/autohotkey-macros/
# Double-click example-empire-macro.ahk to run
```

**Power Automate Desktop**:
1. Install Power Automate Desktop (Windows 10/11)
2. Import flows from `pc-federation/power-automate-flows/`

### 9. Setup GitHub Actions (Optional)

1. Generate Clasp credentials: `clasp login --creds creds.json`
2. Add `CLASP_CREDENTIALS` secret to GitHub repository
3. Push changes to trigger auto-deployment

## Configuration Files

### `.clasp.json`

Update with your Script ID:
```json
{
  "scriptId": "YOUR_SCRIPT_ID_HERE",
  "rootDir": "."
}
```

### Webhook URL

Update in `tab-a9-voice-flow.json`:
```json
"url": "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

## Testing

### Test Webhook Endpoint

```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Test",
    "action": "test_command",
    "status": "success",
    "details": "Testing webhook integration"
  }'
```

Expected response:
```json
{
  "status": "success",
  "message": "Data logged successfully",
  "timestamp": "2024-10-29T..."
}
```

### Test Digest Generation

In Apps Script:
1. Run function: `testDigestGeneration()`
2. Check Execution log for results
3. Verify digest committed to GitHub

### Test Voice Command

1. Activate Tab A9 flow
2. Say: "Empire, log test activity"
3. Check Google Sheet for new row
4. Verify webhook response in Automate log

## Troubleshooting

### Webhook Returns Error

- Check Apps Script execution log
- Verify sheet name is "Automation Log"
- Ensure JSON payload is valid

### Daily Digest Not Generating

- Verify trigger is active
- Check `GEMINI_API_KEY` is set
- Check `GITHUB_TOKEN` has repo permissions
- Review Apps Script execution log

### Clasp Push Fails

- Run `clasp login` again
- Check `.clasp.json` has correct scriptId
- Verify you have edit permissions on the script

### Voice Commands Not Working

- Grant microphone permission to Automate
- Check network connectivity
- Verify webhook URL is correct
- Test with simple commands first

## Security Best Practices

1. **Never commit secrets**: Add to .gitignore
2. **Rotate keys**: Change API keys quarterly
3. **Limit permissions**: Use minimum required scopes
4. **Review logs**: Monitor for suspicious activity
5. **Backup data**: Keep local copies of important logs

## Maintenance

### Weekly
- Review automation logs for errors
- Check GitHub Actions status

### Monthly
- Review and archive old digests
- Update dependencies
- Check API usage quotas

### Quarterly
- Rotate API keys and tokens
- Review and optimize flows
- Update documentation

## Support

If you encounter issues:
1. Check execution logs in Apps Script
2. Review GitHub Actions workflow logs
3. Test components individually
4. Consult architecture documentation

---

*"A well-configured empire is an unstoppable empire!"* 🏛️

**Setup Guide Version**: 1.0.0  
**Last Updated**: 2024-10-29
