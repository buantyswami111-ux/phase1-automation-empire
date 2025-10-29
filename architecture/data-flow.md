# Data Flow Diagrams

## End-to-End Automation Flow

### Voice Command to GitHub Archive

```
┌─────────────────┐
│  Tab A9 Device  │
│  (Android)      │
└────────┬────────┘
         │
         │ 1. Voice Command: "Empire, log activity"
         │
         ▼
┌─────────────────────────┐
│ LlamaLab Automate Flow  │
│ - Speech to Text        │
│ - Intent Extraction     │
│ - JSON Builder          │
└────────┬────────────────┘
         │
         │ 2. HTTP POST
         │    {
         │      "source": "Tab A9",
         │      "action": "log_activity",
         │      "status": "success",
         │      "details": "..."
         │    }
         │
         ▼
┌────────────────────────────┐
│  Google Apps Script        │
│  webhook-handler.js        │
│  - Validate payload        │
│  - Log to Google Sheets    │
└────────┬───────────────────┘
         │
         │ 3. Append Row
         │
         ▼
┌────────────────────────────┐
│  Google Sheet              │
│  "Automation Log"          │
│  [Timestamp│Action│Status] │
└────────┬───────────────────┘
         │
         │ 4. Daily Trigger (23:30 UTC)
         │
         ▼
┌────────────────────────────┐
│  Apps Script               │
│  gemini-digest.js          │
│  - Query day's data        │
│  - Aggregate statistics    │
└────────┬───────────────────┘
         │
         │ 5. API Call
         │    POST /generateContent
         │
         ▼
┌────────────────────────────┐
│  Google Gemini API         │
│  - Analyze activity        │
│  - Generate summary        │
│  - Return markdown         │
└────────┬───────────────────┘
         │
         │ 6. Digest Content
         │
         ▼
┌────────────────────────────┐
│  Apps Script               │
│  - Format digest           │
│  - Encode to base64        │
└────────┬───────────────────┘
         │
         │ 7. GitHub API PUT
         │    /repos/.../contents/daily-digests/...
         │
         ▼
┌────────────────────────────┐
│  GitHub Repository         │
│  phase1-automation-empire  │
│  /daily-digests/2024-10/   │
│  29-empire-summary.md      │
└────────────────────────────┘
```

## PC Federation Sync Flow

```
┌─────────────────┐
│  Windows PC     │
└────────┬────────┘
         │
         │ git pull origin main
         │
         ▼
┌────────────────────────────┐
│  GitHub Repository         │
│  /pc-federation/           │
│  - autohotkey-macros/      │
│  - power-automate-flows/   │
└────────┬───────────────────┘
         │
         │ Download latest scripts
         │
         ▼
┌────────────────────────────┐
│  Local PC Directory        │
│  phase1-automation-empire/ │
└────────┬───────────────────┘
         │
         │ Execute scripts
         │
         ▼
┌────────────────────────────┐
│  AutoHotkey Runtime        │
│  - Load .ahk files         │
│  - Register hotkeys        │
│  - Run macros              │
└────────────────────────────┘
```

## Webhook Data Flow

### Request Flow
```
Tab A9 → HTTPS → Apps Script → Google Sheets
  │                  │               │
  │                  │               └─→ New Row Added
  │                  │
  │                  └─→ Validation, Error Handling
  │
  └─→ JSON Payload
```

### Response Flow
```
Google Sheets ← Apps Script ← Tab A9
                    │
                    └─→ JSON Response
                         {
                           "status": "success",
                           "timestamp": "..."
                         }
```

## GitHub Integration Flow

### Daily Digest Commit

```
Apps Script
    │
    ├─→ Check if file exists
    │   GET /repos/{owner}/{repo}/contents/{path}
    │   
    │   If exists:
    │   └─→ Get SHA for update
    │
    └─→ Create/Update file
        PUT /repos/{owner}/{repo}/contents/{path}
        {
          "message": "Daily Digest: 2024-10-29",
          "content": "<base64>",
          "sha": "..." (if updating)
        }
```

## Time-Based Triggers

### Daily Digest Schedule

```
23:30 UTC Daily
    │
    ▼
Apps Script Trigger
    │
    ├─→ Query previous day's data
    │   (00:00 - 23:59 previous day)
    │
    ├─→ Call Gemini API
    │   Generate summary
    │
    └─→ Commit to GitHub
        Save to /daily-digests/YYYY-MM/DD-empire-summary.md
```

## Error Handling Flow

### Webhook Error Handling

```
Incoming Request
    │
    ├─→ Try
    │   ├─→ Parse JSON
    │   ├─→ Validate structure
    │   ├─→ Log to sheet
    │   └─→ Return success
    │
    └─→ Catch
        ├─→ Log error
        └─→ Return error response
            {
              "status": "error",
              "message": "..."
            }
```

### Digest Generation Error Handling

```
Generate Digest
    │
    ├─→ Try
    │   ├─→ Get data
    │   ├─→ Call Gemini API
    │   ├─→ Commit to GitHub
    │   └─→ Success
    │
    └─→ Catch
        ├─→ Log error
        └─→ Fallback: Generate basic digest
            (Statistics only, no AI summary)
```

## Integration Points Summary

| Source | Target | Protocol | Auth | Data Format |
|--------|--------|----------|------|-------------|
| Tab A9 | Apps Script | HTTPS POST | None | JSON |
| Apps Script | Gemini | HTTPS POST | API Key | JSON |
| Apps Script | GitHub | HTTPS PUT | Token | JSON (base64) |
| PC | GitHub | Git/HTTPS | Credentials | Files |
| Apps Script | Sheets | Internal API | OAuth | Structured |

## Security Layers

```
┌──────────────────────────────────────────┐
│  Public Layer (No Auth)                   │
│  - Webhook endpoint (consider adding auth)│
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Application Layer (API Keys)             │
│  - Gemini API Key (Script Properties)     │
│  - GitHub Token (Script Properties)       │
└──────────────┬───────────────────────────┘
               │
┌──────────────▼───────────────────────────┐
│  Data Layer (OAuth)                       │
│  - Google Sheets access                   │
│  - Apps Script permissions                │
└───────────────────────────────────────────┘
```

## Scalability Considerations

### Current Architecture
- **Webhook**: Apps Script has quotas (~20,000 invocations/day)
- **Sheets**: 10M cells max per spreadsheet
- **GitHub**: 5,000 API requests/hour
- **Gemini**: API quota-based (varies by plan)

### Scaling Strategies
1. **High Volume Logging**: Archive old sheets monthly
2. **Many Requests**: Implement request batching
3. **Large Digests**: Compress or split by month
4. **API Limits**: Add retry logic with exponential backoff

---

*"Understanding the flow is the first step to mastering the empire!"* 🏛️
