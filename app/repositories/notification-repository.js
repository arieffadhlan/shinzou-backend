const { Notification } = require("../models");

const getNotifications = () => {
  return Notification.findAll({
    order: [["createdAt", "DESC"]]
  });
}

const getNotification = (id) => {
  return Notification.findByPk(id);
}

const addNotification = (data) => {
  return Notification.create(data);
}

const updateNotification = (id, data) => {
  return Notification.update(data, 
    { where: { id } 
  });
}

const markAsRead = (data) => {
  return Notification.update(data, { 
    where: {
      mark_as_read: false
    } 
  });
}

const deleteNotification = (id) => {
  return Notification.destroy({ where: { id } });
}

module.exports = {
  getNotifications,
  getNotification,
  addNotification,
  updateNotification,
  markAsRead,
  deleteNotification
}