const ADODB = require("node-adodb");

const dbPath = "c:\\git\\AccessDemo\\DemoDatabase.accdb";

const connection = ADODB.open(
  "Provider=Microsoft.ACE.Oledb.12.0;Data Source=" + dbPath + ";",
  process.arch.includes("64")
);

module.exports = connection;
