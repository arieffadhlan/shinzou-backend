const { Notification } = require("../models");

const getNotifications = () => {
  return Notification.findAll();
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

const deleteNotification = (id) => {
  return Notification.destroy({ where: { id } });
}

module.exports = {
  getNotifications,
  getNotification,
  addNotification,
  updateNotification,
  deleteNotification
}