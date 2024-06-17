// save obj code to json file
import fs from "fs";

async function saveJSON(json, path) {
  fs.writeFileSync(path, JSON.stringify(json));
  console.log(`JSON file saved to ${path}`);
}

export { saveJSON };
