const Data = require("../models/Data");
const User = require("../models/User");

const getData = async (req, res) => {
  try {
    const data = await Data.find({ userId: req.user.id });
    const userdetails =  await User.findById({_id: req.user.id});
    // if (!data || data.length === 0) {
    //   console.log("No data found for this user");
    //   return res.status(404).json({ message: "No data found for this user" });

    // }
    res.status(200).json({ data, userdetails });
  } catch (error) {
    // console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addToData = async (req, res) => {
  try {
    const { website, username, password } = req.body;
    if (!website || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newData = await Data.create({
      userId: req.user.id,
      website,
      username,
      password,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Data added successfully",
        data: newData,
      });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error.message}` });
  }
};

const updateData = async (req, res) => {
  try {
    const { id, website, username, password } = req.body;
    if (!id || !website || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedData = await Data.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { website, username, password },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const deletedData = await Data.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getData,
  addToData,
  updateData,
  deleteData,
};
