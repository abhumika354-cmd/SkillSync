const Message = require("../models/Message");

// =========================
// Send Message
// =========================
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    // Check message
    if (!receiver || !message) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message are required",
      });
    }

    // Create message
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message,
    });

    // Populate sender & receiver details
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "fullName email")
      .populate("receiver", "fullName email");

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage,
    });

  } catch (error) {
    console.log("Send Message Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =========================
// Get My Messages
// =========================
exports.getMyMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    })
      .populate("sender", "fullName email")
      .populate("receiver", "fullName email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {
    console.log("Get Messages Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =========================
// Mark Message As Read
// =========================
exports.markAsRead = async (req, res) => {
  try {

    const message = await Message.findOne({
      _id: req.params.id,
      receiver: req.user._id,
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    message.isRead = true;

    await message.save();

    res.status(200).json({
      success: true,
      message: "Message marked as read",
    });

  } catch (error) {
    console.log("Mark Read Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};