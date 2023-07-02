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

module.exports = {
  getNotifications
}