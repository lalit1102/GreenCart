import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User ID not found" });
    }

    const { address } = req.body;
    if (!address) {
      return res.json({ success: false, message: "Address required" });
    }

    await Address.create({ ...address, userId });

    return res.json({ success: true, message: "address added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "User ID not found" });
    }

    const addresses = await Address.find({ userId });
    return res.json({ success: true, message: "address found successfully", addresses });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};