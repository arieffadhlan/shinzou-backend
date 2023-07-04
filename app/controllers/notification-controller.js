const notificationService = require("../services/notification-service");

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();

    res.status(200).json({
      status: "Success",
      data: notifications
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const markAsRead = async (req, res) => {
  try {
    const notifications = await notificationService.markAsRead();

    res.status(200).json({
      status: "Success",
      message: "Data notifikasi telah berhasil diperbarui.",
      data: notifications
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getNotifications,
  markAsRead
}