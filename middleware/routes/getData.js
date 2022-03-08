const express = require("express");
const router = express.Router();

const ADODB = require("node-adodb");

const dbPath = "c:\\git\\AccessDemo\\DemoDatabase.accdb";

const connection = ADODB.open(
  "Provider=Microsoft.ACE.Oledb.12.0;Data Source=" + dbPath + ";",
  process.arch.includes("64")
);

router.get("/", async (req, res) => {
  try {
    // get data from access db
    let query = "SELECT * FROM Dokumente";

    // execute query
    let data = await connection.query(query);

    // return data to frontend
    res.status(200).json({
      status: "success",
      message: "Here is your data",
      data,
      date: new Date(),
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong",
      error: JSON.parse(JSON.stringify(error)),
    });
  }
});

module.exports = router;
