const express = require("express");
const router = express.Router();
const  auth  = require("../middlewares/auth");

const {
  getData,
  addToData,
  updateData,
  deleteData,
} = require("../controllers/user.controller");


// Route to get user details

router.get("/data",auth, getData);
router.post("/data",auth, addToData);
router.put("/data",auth, updateData);
router.delete("/data",auth, deleteData);

module.exports = router;
