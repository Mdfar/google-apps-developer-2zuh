/**

Daily Admin Pulse Report

To be triggered by AppSheet Automation or Scheduled Script */

function generateDailyAdminReport() { const ss = SpreadsheetApp.getActiveSpreadsheet(); const taskSheet = ss.getSheetByName("Tasks"); const data = taskSheet.getDataRange().getValues(); const today = new Date().setHours(0,0,0,0);

let reportData = { completed: [], overdue: [], counts: { due: 0, overdue: 0, done: 0 } };

// Skip header row for (let i = 1; i < data.length; i++) { let [id, contact, sub, type, due, status, assigned, doneBy, doneAt] = data[i]; let dueDate = new Date(due).setHours(0,0,0,0);

if (status === "Done" && new Date(doneAt).setHours(0,0,0,0) === today) {
  reportData.completed.push({user: assigned, type: type, time: doneAt});
  reportData.counts.done++;
} else if (status !== "Done" && status !== "Skipped" && dueDate < today) {
  reportData.overdue.push({user: assigned, type: type, due: due});
  reportData.counts.overdue++;
} else if (dueDate === today) {
  reportData.counts.due++;
}


}

sendEmail(reportData); }

function sendEmail(report) { const adminEmail = "admin@example.com"; const subject = Daily Ops Report - ${new Date().toLocaleDateString()}; let body = Summary:\n- Due Today: ${report.counts.due}\n- Completed: ${report.counts.done}\n- Overdue: ${report.counts.overdue}\n\n;

body += "Detailed Overdue List:\n" + report.overdue.map(t => ${t.user}: ${t.type} (Due: ${t.due})).join("\n");

MailApp.sendEmail(adminEmail, subject, body); }