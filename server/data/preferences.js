const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "preferences.json"
);

const loadPreferences = () => {
  try {
    const data = fs.readFileSync(
      filePath,
      "utf-8"
    );

    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const savePreferences = (preferences) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(preferences, null, 2)
  );
};

const userPreferences = loadPreferences();

module.exports = {
  userPreferences,
  savePreferences,
};