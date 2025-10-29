# 📋 Audit Logs

*Optional PC-Side Backup Logs*

This directory can store backup logs from PC-side automation activities.

## Purpose

While the main logging happens in Google Sheets via the webhook, you may want to:
- Keep local backup logs on your PC
- Log PC-specific automation activities
- Maintain offline audit trail
- Debug automation issues

## Structure

```
audit-logs/
├── pc-activities/     - Logs from AutoHotkey and Power Automate
├── sync-history/      - Git sync timestamps
└── error-logs/        - Error and exception logs
```

## Local Logging Example

### From AutoHotkey
```ahk
; Log to local audit file
timestamp := A_Now
logEntry := timestamp . " | Action: " . action . " | Status: " . status
FileAppend, %logEntry%`n, audit-logs\pc-activities\activity.log
```

### From Power Automate
Use "Write to text file" action to append to log files in this directory.

## Best Practices

1. **Daily Rotation**: Create new log file each day
2. **Size Limits**: Archive logs larger than 10MB
3. **Sensitive Data**: Never log passwords or API keys
4. **Git Ignore**: Consider adding `audit-logs/*` to `.gitignore` if logs contain sensitive info

## Log Format

Recommended format for consistency:

```
[YYYY-MM-DD HH:MM:SS] | Source: {PC/AHK/PAD} | Action: {action_name} | Status: {success/error} | Details: {description}
```

Example:
```
[2024-10-29 14:30:00] | Source: AHK | Action: backup_completed | Status: success | Details: 1,234 files backed up
```

## Syncing Logs to Cloud

If you want to sync logs to Google Sheets:

1. Configure AutoHotkey to send HTTP POST to webhook
2. Use Power Automate Desktop to upload log files
3. Schedule periodic sync tasks

---

*"An empire without records is an empire without history!"* 🏛️
