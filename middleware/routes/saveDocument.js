const express = require("express");
const router = express.Router({ mergeParams: true });

const db = require("../dbconnector");

router.post("/:dokumentenID", async (req, res) => {
  try {
    let id = req.params.dokumentenID;
    let form = req.body;
    let query = "UPDATE Dokumente SET ";

    // generate query
    for (const [key, value] of Object.entries(form)) {
      query += key + " = '" + value + "', ";
    }

    // remove last , and add document identificaiton
    query = query.slice(0, -2) + " WHERE DokumentenID = " + id + ";";

    await db.query(query);

    // return data to frontend
    res.status(200).json({
      status: "success",
      message: "Updated document",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: JSON.parse(JSON.stringify(error)),
      message: error.toString(),
    });
  }
});

module.exports = router;
