import fs from "fs";
import json2csv from "json2csv";

async function JSONtoCSV(json, path) {
  const csv = json2csv.parse(json, { header: true });
  fs.writeFileSync(path, csv);
  console.log(`CSV file saved to ${path}`);
}

export { JSONtoCSV };
