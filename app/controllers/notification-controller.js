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

const getNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.getNotification(id);

    res.status(200).json({
      status: "Success",
      data: notification
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addNotification = async (req, res) => {
  try {
    const notification = await notificationService.addNotification(req);

    res.status(201).json({
      status: "Success",
      message: "Data notifikasi telah berhasil ditambahkan.",
      data: notification
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateNotification = async (req, res) => {
  try {
    await notificationService.updateNotification(req);

    res.status(200).json({
      status: "Success",
      message: "Data notifikasi telah berhasil diperbarui.",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await notificationService.deleteNotification(id);

    res.status(200).json({
      status: "Success",
      message: "Data notifikasi telah berhasil dihapus.",
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
  getNotification,
  addNotification,
  updateNotification,
  deleteNotification
}