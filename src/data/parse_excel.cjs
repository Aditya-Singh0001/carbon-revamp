const fs = require('fs');
const xlsx = require('xlsx');

try {
  const workbook = xlsx.readFile('c:/DATA/CarbonTatva/src/data/emission_factors.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  fs.writeFileSync('c:/DATA/CarbonTatva/src/data/esg_raw_dump.json', JSON.stringify(data, null, 2));
  console.log('Successfully wrote raw JSON dump!');
} catch (error) {
  console.error(error);
}
