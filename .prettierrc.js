const fs = require('fs');
const path = require('path');

const prettierConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '.prettierrc'), 'utf8'));

module.exports = prettierConfigs;
