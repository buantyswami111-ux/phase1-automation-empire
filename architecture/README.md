# 🏗️ Architecture Documentation

*Imperial Engineering - System Design & Documentation*

This directory contains system architecture diagrams, documentation, and technical specifications for the Phase 1 Automation Empire.

## Contents

- `system-overview.md` - High-level architecture overview
- `data-flow.md` - Data flow diagrams and explanations
- `integration-points.md` - API endpoints and integration details
- `diagrams/` - Visual architecture diagrams (Mermaid, PlantUML, etc.)

## System Architecture Overview

### Core Components

1. **Tab A9 (Mobile Hub)**
   - LlamaLab Automate flows
   - Voice command processing
   - JSON payload generation

2. **Google Sheets (Forum of Records)**
   - Apps Script webhook handler
   - Activity logging
   - Gemini digest generation

3. **GitHub (Archives)**
   - Version control for all components
   - Daily digest storage
   - Flow and script backups

4. **PC Federation**
   - AutoHotkey macros
   - Power Automate Desktop flows
   - Synchronized automation scripts

### Data Flow

```
Tab A9 Voice Command
    ↓
Speech to Text
    ↓
Intent Extraction
    ↓
JSON Payload
    ↓
Google Sheets Webhook (POST)
    ↓
Log to Sheet + Process
    ↓
Daily Trigger (23:30 UTC)
    ↓
Gemini AI Summary
    ↓
GitHub Commit (Daily Digest)
```

### Integration Points

| Component | Protocol | Authentication | Purpose |
|-----------|----------|----------------|---------|
| Tab A9 → Sheets | HTTPS POST | None (public webhook) | Activity logging |
| Sheets → Gemini | HTTPS POST | API Key | Digest generation |
| Sheets → GitHub | HTTPS (GitHub API) | Personal Access Token | Commit digests |
| PC → GitHub | Git/HTTPS | Credentials | Sync scripts |

## Adding Documentation

When adding new components or features:

1. Update system diagrams
2. Document API endpoints
3. Add integration examples
4. Update this README

---

*"Good architecture is the foundation of any empire!"* 🏛️
