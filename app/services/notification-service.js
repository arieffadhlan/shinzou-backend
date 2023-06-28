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

const getNotification = async (id) => {
  try {
    const notification = await notificationRepository.getNotification(id);
    if (!notification) {
      throw new ApplicationError(404, "Notifikasi tidak ditemukan.");
    } 
    
    return notification;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const addNotification = async (req) => {
  try {
    const { message } = req.body;
    const { id } = req.user;
    
    if (!message) {
      throw new ApplicationError(404, "Pesan wajib diisi.");
    }

    const notification = await notificationRepository.addNotification({
      user_id: id,
      message,
    });
    
    return notification;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const updateNotification = async (req) => {
  try {
    const { message, mark_as_read } = req.body;
    const { id } = req.params;

    if (!message) {
      throw new ApplicationError(404, "Pesan wajib diisi.");
    }

    const notification = await getNotification(id);
    return await notificationRepository.updateNotification(notification.id, {
      user_id: id,
      message,
      mark_as_read: mark_as_read ? mark_as_read : false
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const deleteNotification = async (id) => {
  try {
    const notification = await getNotification(id);
    
    return await notificationRepository.deleteNotification(notification.id);
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
  getNotification,
  addNotification,
  updateNotification,
  deleteNotification
}