const notificationRepository = require("../repositories/notification-repository");
const ApplicationError = require("../errors/ApplicationError");

const getNotifications = async () => {
  try {
    const notifications = await notificationRepository.getNotifications();
    if (!notifications) {
      throw new ApplicationError(404, "Notifikasi tidak ditemukan.");
    } 
    
    return notifications;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const markAsRead = async (req) => {
  try {
    const { id } = req.params;

    await notificationRepository.markAsRead({
      mark_as_read: true
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getNotifications,
  markAsRead
}