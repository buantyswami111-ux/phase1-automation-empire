# Integration Points & API Reference

## Webhook API

### Endpoint: Apps Script Web App

**URL Format**: `https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

---

### POST /exec

Receive and log automation activity from Tab A9.

**Request Headers**:
```http
Content-Type: application/json
```

**Request Body**:
```json
{
  "source": "Tab A9",
  "action": "string",
  "status": "success|error|pending",
  "details": "string (optional)",
  "timestamp": "ISO 8601 timestamp (optional)",
  "metadata": {
    "any": "additional data"
  }
}
```

**Response (Success)**:
```json
{
  "status": "success",
  "message": "Data logged successfully",
  "timestamp": "2024-10-29T12:30:00.000Z"
}
```

**Response (Error)**:
```json
{
  "status": "error",
  "message": "Error description",
  "timestamp": "2024-10-29T12:30:00.000Z"
}
```

**Status Codes**:
- `200 OK` - Request processed successfully
- `400 Bad Request` - Invalid JSON or missing required fields
- `500 Internal Server Error` - Apps Script error

---

### GET /exec

Health check endpoint.

**Response**:
```json
{
  "status": "active",
  "message": "Phase 1 Automation Empire Webhook",
  "version": "1.0.0",
  "endpoints": {
    "POST": "Send JSON payload from Tab A9",
    "GET": "Health check"
  }
}
```

---

## Google Gemini API

### Endpoint: Generate Content

**URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}`

**Method**: POST

**Request Headers**:
```http
Content-Type: application/json
```

**Request Body**:
```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Your prompt text here"
        }
      ]
    }
  ]
}
```

**Response**:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Generated text response"
          }
        ]
      }
    }
  ]
}
```

**Used By**: `gemini-digest.js` for daily summary generation

---

## GitHub API

### Endpoint: Repository Contents

**Base URL**: `https://api.github.com`

---

### GET /repos/{owner}/{repo}/contents/{path}

Check if file exists and get current SHA.

**Request Headers**:
```http
Authorization: Bearer {GITHUB_TOKEN}
Accept: application/vnd.github.v3+json
```

**Query Parameters**:
- `ref` - Branch name (default: `main`)

**Response**:
```json
{
  "name": "29-empire-summary.md",
  "path": "daily-digests/2024-10/29-empire-summary.md",
  "sha": "abc123...",
  "size": 1234,
  "url": "...",
  "html_url": "...",
  "download_url": "..."
}
```

---

### PUT /repos/{owner}/{repo}/contents/{path}

Create or update file in repository.

**Request Headers**:
```http
Authorization: Bearer {GITHUB_TOKEN}
Accept: application/vnd.github.v3+json
Content-Type: application/json
```

**Request Body (Create)**:
```json
{
  "message": "Commit message",
  "content": "base64 encoded content",
  "branch": "main"
}
```

**Request Body (Update)**:
```json
{
  "message": "Commit message",
  "content": "base64 encoded content",
  "sha": "current file SHA",
  "branch": "main"
}
```

**Response**:
```json
{
  "content": {
    "name": "29-empire-summary.md",
    "path": "daily-digests/2024-10/29-empire-summary.md",
    "sha": "new_sha...",
    "size": 1234
  },
  "commit": {
    "sha": "commit_sha...",
    "message": "Commit message"
  }
}
```

---

## Apps Script Internal APIs

### SpreadsheetApp

Used for logging to Google Sheets.

**Get Active Spreadsheet**:
```javascript
const ss = SpreadsheetApp.getActiveSpreadsheet();
```

**Get or Create Sheet**:
```javascript
let sheet = ss.getSheetByName('Automation Log');
if (!sheet) {
  sheet = ss.insertSheet('Automation Log');
}
```

**Append Row**:
```javascript
sheet.appendRow([timestamp, source, action, status, details, rawJson]);
```

---

### PropertiesService

Used for storing API keys and configuration.

**Get Script Properties**:
```javascript
const props = PropertiesService.getScriptProperties();
const apiKey = props.getProperty('GEMINI_API_KEY');
const githubToken = props.getProperty('GITHUB_TOKEN');
```

**Set Script Properties** (via UI or script):
```javascript
PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', 'your_key');
```

---

### ScriptApp

Used for managing time-based triggers.

**Create Daily Trigger**:
```javascript
ScriptApp.newTrigger('runDailyDigest')
  .timeBased()
  .atHour(23)
  .nearMinute(30)
  .everyDays(1)
  .create();
```

**List Triggers**:
```javascript
const triggers = ScriptApp.getProjectTriggers();
```

**Delete Trigger**:
```javascript
ScriptApp.deleteTrigger(trigger);
```

---

## Example Integrations

### cURL Examples

**Test Webhook**:
```bash
curl -X POST https://script.google.com/macros/s/YOUR_ID/exec \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Test",
    "action": "test_command",
    "status": "success",
    "details": "Testing webhook"
  }'
```

**Check GitHub File**:
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/buantyswami111-ux/phase1-automation-empire/contents/daily-digests/2024-10/29-empire-summary.md
```

---

### JavaScript/Automate Examples

**LlamaLab Automate HTTP Request**:
```javascript
// In Automate flow
const payload = {
  source: "Tab A9",
  action: flowbAction,
  status: "success",
  details: flowbDetails,
  timestamp: new Date().toISOString()
};

// Send POST request
httpPost(webhookUrl, JSON.stringify(payload), "application/json");
```

---

### AutoHotkey Example

**Send Webhook from AHK**:
```ahk
SendWebhook(action, status, details) {
    url := "YOUR_WEBHOOK_URL"
    
    ; Build JSON payload
    json := "{"
    json .= """source"":""AutoHotkey"","
    json .= """action"":""" . action . ""","
    json .= """status"":""" . status . ""","
    json .= """details"":""" . details . """"
    json .= "}"
    
    ; Create HTTP request
    http := ComObjCreate("WinHttp.WinHttpRequest.5.1")
    http.Open("POST", url, false)
    http.SetRequestHeader("Content-Type", "application/json")
    http.Send(json)
    
    return http.ResponseText
}
```

---

## Rate Limits & Quotas

### Apps Script
- **Trigger Executions**: 90 minutes/day (Google Workspace), 6 minutes/day (Consumer)
- **URL Fetch**: 20,000 calls/day
- **Script Runtime**: 6 minutes max per execution

### GitHub API
- **Authenticated**: 5,000 requests/hour
- **Content API**: 1,000 pushes/hour

### Gemini API
- Varies by plan
- Free tier: Limited requests per minute
- Check: https://ai.google.dev/pricing

---

## Error Codes Reference

### Webhook Errors
- **Invalid JSON**: `SyntaxError: Unexpected token`
- **Missing Sheet**: Creates new sheet automatically
- **Write Failure**: Check sheet permissions

### GitHub API Errors
- **401 Unauthorized**: Invalid or expired token
- **404 Not Found**: Repository or file doesn't exist
- **409 Conflict**: SHA mismatch (file changed)
- **422 Unprocessable**: Invalid content or path

### Gemini API Errors
- **400 Bad Request**: Invalid prompt format
- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Server Error**: Gemini service issue

---

## Authentication Setup

### GitHub Token Permissions

Required scopes for the GitHub Personal Access Token:
- `repo` - Full repository access
  - `repo:status` - Commit status access
  - `repo_deployment` - Deployment status access
  - `public_repo` - Public repository access

**Generate Token**:
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select `repo` scope
5. Copy and save token (shown once!)

---

### Gemini API Key

**Get API Key**:
1. Visit https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and save

**Important**: Keep keys secure, never commit to repository!

---

## Webhook Security (Future Enhancement)

### Add Authentication Header

**Modify webhook-handler.js**:
```javascript
function doPost(e) {
  const authHeader = e.parameter.auth || e.headers.Authorization;
  const expectedAuth = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
  
  if (authHeader !== expectedAuth) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Unauthorized' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Continue with normal processing...
}
```

**Update Automate Flow**:
Add header: `Authorization: YOUR_SECRET_KEY`

---

*"Well-documented APIs are the roads of the automation empire!"* 🏛️

**Version**: 1.0.0  
**Last Updated**: 2024-10-29
