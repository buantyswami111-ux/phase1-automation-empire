# System Overview - Phase 1 Automation Empire

## Vision

The Phase 1 Automation Empire is a comprehensive, version-controlled automation infrastructure that integrates mobile automation (Tab A9), cloud processing (Google Sheets/Apps Script), AI intelligence (Gemini), and desktop automation (PC Federation) into a cohesive system.

## Architecture Philosophy

**"All roads lead to automation"** - Every component is designed to work independently yet integrate seamlessly through well-defined interfaces.

### Design Principles

1. **Version Control First**: Everything is tracked in GitHub
2. **Declarative Configuration**: JSON/code-based definitions
3. **API-Driven**: REST APIs and webhooks for integration
4. **Automated Documentation**: Self-documenting through code and daily digests
5. **Incremental Enhancement**: Start simple, grow complex

## Component Details

### 1. Tab A9 (Mobile Automation Hub)

**Technology**: LlamaLab Automate (Android)

**Responsibilities**:
- Voice command capture and processing
- Speech-to-text conversion
- Intent extraction from natural language
- JSON payload construction
- HTTP webhook delivery

**Key Files**:
- `/automate-flows/tab-a9-voice-flow.json` - Main voice processing flow

**Configuration**:
```json
{
  "webhook_url": "https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec",
  "retry_attempts": 3,
  "timeout_seconds": 30
}
```

### 2. Google Sheets (Forum of Records)

**Technology**: Google Apps Script + Google Sheets

**Responsibilities**:
- Receive and validate webhook payloads
- Log all automation activities
- Aggregate daily statistics
- Generate AI-powered digests
- Commit digests to GitHub

**Key Files**:
- `/google-sheets-webhook/webhook-handler.js` - Webhook endpoint
- `/google-sheets-webhook/gemini-digest.js` - Digest generation
- `/google-sheets-webhook/appsscript.json` - Configuration

**Required Permissions**:
- `spreadsheets` - Read/write sheet data
- `script.external_request` - Call external APIs (Gemini, GitHub)
- `script.scriptapp` - Manage triggers

**Environment Variables**:
```
GEMINI_API_KEY - Google AI API key for digest generation
GITHUB_TOKEN - Personal access token for repository commits
```

### 3. GitHub (Eternal Archives)

**Technology**: GitHub Repository + GitHub API

**Responsibilities**:
- Version control for all automation code
- Store daily digests chronologically
- Distribute updates to PC Federation
- Track flow evolution

**Repository Structure**:
```
/automate-flows/        - Mobile automation flows
/google-sheets-webhook/ - Apps Script code
/daily-digests/         - AI-generated summaries
/pc-federation/         - Desktop automation
/architecture/          - System documentation
/audit-logs/            - Optional PC-side logs
```

### 4. PC Federation (Desktop Outpost)

**Technology**: AutoHotkey + Power Automate Desktop

**Responsibilities**:
- Desktop macro execution
- Local automation tasks
- Git-based synchronization
- Extended automation capabilities

**Key Files**:
- `/pc-federation/autohotkey-macros/*.ahk` - AHK scripts
- `/pc-federation/power-automate-flows/*.txt` - PAD exports

## Data Flow Scenarios

### Scenario 1: Voice Command Logging

1. User speaks: *"Empire, log workout completed"*
2. Tab A9 Automate:
   - Captures voice via trigger
   - Converts to text: "log workout completed"
   - Extracts intent: `{action: "log", type: "workout", status: "completed"}`
   - Builds JSON payload
3. Webhook POST to Google Sheets
4. Apps Script receives and validates
5. New row appended to "Automation Log" sheet
6. Success response sent back to Tab A9
7. Tab A9 speaks: "Workout logged successfully"

### Scenario 2: Daily Digest Generation

1. Time trigger fires at 23:30 UTC
2. Apps Script queries previous day's data
3. Aggregates activity statistics
4. Calls Gemini API with context
5. Gemini generates markdown summary
6. Apps Script formats digest
7. GitHub API called to commit file
8. File saved to `/daily-digests/{YYYY-MM}/{DD}-empire-summary.md`
9. Digest is now part of eternal archives

### Scenario 3: PC Script Synchronization

1. User opens terminal on PC
2. Runs: `git pull origin main`
3. Latest AutoHotkey scripts downloaded
4. User double-clicks updated `.ahk` file
5. New macro hotkeys become active
6. Automation empire extended to desktop

## Integration APIs

### Webhook Endpoint (Tab A9 → Sheets)

**URL**: `https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

**Method**: POST

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "source": "Tab A9",
  "action": "log_activity",
  "status": "success",
  "details": "Workout completed",
  "timestamp": "2024-10-29T12:30:00Z"
}
```

**Response** (Success):
```json
{
  "status": "success",
  "message": "Data logged successfully",
  "timestamp": "2024-10-29T12:30:05Z"
}
```

### Gemini API (Sheets → Gemini)

**URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

**Method**: POST

**Headers**:
```
Authorization: Bearer {GEMINI_API_KEY}
Content-Type: application/json
```

**Request Body**:
```json
{
  "contents": [{
    "parts": [{
      "text": "Generate summary for..."
    }]
  }]
}
```

### GitHub API (Sheets → GitHub)

**URL**: `https://api.github.com/repos/{owner}/{repo}/contents/{path}`

**Method**: PUT

**Headers**:
```
Authorization: Bearer {GITHUB_TOKEN}
Accept: application/vnd.github.v3+json
```

**Request Body**:
```json
{
  "message": "Daily Digest: 2024-10-29",
  "content": "{base64_encoded_content}",
  "branch": "main"
}
```

## Security Considerations

1. **Webhook Security**: 
   - Consider adding authentication header
   - Validate payload structure
   - Rate limiting

2. **Secrets Management**:
   - Store API keys in Apps Script Properties
   - Never commit tokens to repository
   - Rotate keys periodically

3. **Access Control**:
   - GitHub: Use fine-grained PATs
   - Gemini: Restrict API key to specific domains
   - Sheets: Review OAuth scopes

## Monitoring & Maintenance

### Health Checks

- Webhook response times
- Daily digest generation success
- GitHub commit success rate
- Script execution logs

### Maintenance Tasks

- Monthly: Review and archive old logs
- Quarterly: Update dependencies
- Annually: Rotate API keys
- Continuous: Monitor error rates

## Future Enhancements

- [ ] Add authentication to webhook
- [ ] Implement retry logic for failed digests
- [ ] Create web dashboard for empire overview
- [ ] Add mobile app for remote monitoring
- [ ] Integrate with more automation platforms
- [ ] Machine learning for pattern detection

---

*"An empire built on solid architecture stands the test of time!"* 🏛️

**Document Version**: 1.0.0  
**Last Updated**: 2024-10-29  
**Maintained By**: Automation Empire Engineering Team
