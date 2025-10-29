/**
 * Phase 1 Automation Empire - Webhook Handler
 * 
 * This Apps Script webhook receives JSON payloads from Tab A9 (LlamaLab Automate)
 * and logs them to the "Forum of Records" Google Sheet.
 * 
 * Deploy as Web App: Execute as "Me", Access "Anyone"
 */

/**
 * Handle HTTP POST requests from Tab A9 Automate
 * @param {Object} e - The event parameter containing postData
 * @return {TextOutput} JSON response
 */
function doPost(e) {
  try {
    // Parse incoming JSON payload
    const payload = JSON.parse(e.postData.contents);
    
    // Log to Google Sheet
    logToSheet(payload);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Data logged successfully',
        timestamp: new Date().toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error processing webhook: ' + error.toString());
    
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle HTTP GET requests (for testing)
 * @param {Object} e - The event parameter
 * @return {TextOutput} JSON response
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      message: 'Phase 1 Automation Empire Webhook',
      version: '1.0.0',
      endpoints: {
        POST: 'Send JSON payload from Tab A9',
        GET: 'Health check'
      }
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Log automation data to the Google Sheet
 * @param {Object} data - The automation payload from Tab A9
 */
function logToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Automation Log');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Automation Log');
    // Add headers
    sheet.appendRow([
      'Timestamp',
      'Source',
      'Action',
      'Status',
      'Details',
      'Raw JSON'
    ]);
  }
  
  // Extract relevant fields from payload
  const timestamp = new Date();
  const source = data.source || 'Tab A9';
  const action = data.action || 'unknown';
  const status = data.status || 'completed';
  const details = data.details || '';
  const rawJson = JSON.stringify(data);
  
  // Append new row
  sheet.appendRow([
    timestamp,
    source,
    action,
    status,
    details,
    rawJson
  ]);
  
  Logger.log('Logged entry: ' + action + ' at ' + timestamp);
}

/**
 * Manual test function for local development
 */
function testWebhook() {
  const testPayload = {
    source: 'Tab A9',
    action: 'voice_command_executed',
    status: 'success',
    details: 'Test automation command',
    timestamp: new Date().toISOString()
  };
  
  logToSheet(testPayload);
  Logger.log('Test webhook executed successfully');
}
