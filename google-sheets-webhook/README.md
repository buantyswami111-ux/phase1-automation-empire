# 📊 Google Sheets Webhook

*Forum of Records - Apps Script Integration*

This directory contains the Apps Script code that powers your Google Sheets "Forum of Records" - the central logging and processing hub of your automation empire.

## Structure

- `webhook-handler.js` - Main webhook endpoint for Tab A9 JSON data
- - `gemini-digest.js` - Daily digest generation with Gemini API
  - - `clasp.json` - Clasp configuration for version control
    - - `appsscript.json` - Apps Script project configuration
     
      - ## Setup Instructions
     
      - ### 1. Install Clasp
      - ```bash
        npm install -g @google/clasp
        clasp login
        ```

        ### 2. Link to Google Sheets
        ```bash
        # In this directory
        clasp create --type webapp --title "Phase1-Webhook-Handler"
        clasp push
        clasp deploy
        ```

        ### 3. Configure Webhook URL
        - Get webapp URL from clasp deploy
        - - Configure in Tab A9 Automate flow
          - - Test with sample JSON payload
           
            - ## Webhook Flow
           
            - 1. **Tab A9** sends JSON → Webhook URL
              2. 2. **webhook-handler.js** → logs to Sheets row
                 3. 3. **Daily trigger** → gemini-digest.js → summarizes activity
                    4. 4. **Digest committed** → back to this GitHub repo
                      
                       5. ## Version Control with Clasp
                      
                       6. - `clasp pull` - Download latest from Apps Script
                          - - `clasp push` - Upload local changes to Apps Script
                            - - `clasp deploy` - Create new deployment version
                             
                              - ## Environment Variables
                             
                              - Set in Apps Script:
                              - - `GEMINI_API_KEY` - For daily digest generation
                                - - `GITHUB_TOKEN` - For committing digests back to repo
                                 
                                  - *"The Forum of Records - where all automation roads converge"* 🏛️
