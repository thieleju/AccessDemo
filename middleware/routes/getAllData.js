const express = require("express");
const router = express.Router();

const db = require("../dbconnector");

router.get("/", async (req, res) => {
  try {
    // get data from access db
    let query = "SELECT * FROM Dokumente";

    // execute query
    let data = await db.query(query);

    // return data to frontend
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: JSON.parse(JSON.stringify(error)),
    });
  }
});

module.exports = router;
