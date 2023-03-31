const path = require('path');
const AdmZip = require('adm-zip');

async function globalTeardown() {
    const reportPath = path.join(__dirname, 'playwright-report');
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath, './playwright-reportt');
    zip.writeZip('./playwright-report.zip');
}

module.exports = globalTeardown;