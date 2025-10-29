# 💻 PC Federation

*Desktop Automation Scripts - Windows Empire Outpost*

This directory contains desktop automation scripts that sync from GitHub and extend your automation empire to your PC.

## Structure

- `autohotkey-macros/` - AutoHotkey (AHK) scripts for Windows keyboard/mouse automation
- `power-automate-flows/` - Microsoft Power Automate Desktop flows (exported)

## Setup Instructions

### AutoHotkey Installation
```bash
# Download and install AutoHotkey from https://www.autohotkey.com/
# Clone this repository
git clone https://github.com/buantyswami111-ux/phase1-automation-empire.git
cd phase1-automation-empire/pc-federation/autohotkey-macros
```

### Running AHK Scripts
1. Double-click any `.ahk` file to run it
2. Right-click → "Edit Script" to modify
3. Compile to `.exe` for standalone distribution

### Power Automate Desktop
1. Export flows from Power Automate Desktop
2. Save exported files to `power-automate-flows/`
3. Import on other PCs by opening in Power Automate Desktop

## Synchronization

The PC Federation automatically syncs with GitHub:

```bash
# Update local scripts from GitHub
cd phase1-automation-empire
git pull origin main

# Your scripts are now up-to-date!
```

## Creating New Macros

### AutoHotkey Example
```ahk
; Save as my-macro.ahk in autohotkey-macros/
^!e::  ; Ctrl+Alt+E hotkey
    MsgBox, Empire automation triggered!
return
```

### Power Automate
1. Create flow in Power Automate Desktop
2. File → Export → Save to `power-automate-flows/`
3. Commit to GitHub for version control

## Security Notes

- Never commit sensitive credentials or API keys
- Use environment variables for secrets
- Review all scripts before running on production PC

---

*"Rome's automation extends to every corner of the empire!"* 🏛️
