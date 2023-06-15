const {
    User
} = require('../models')

module.exports = {
    create(body) {
        return User.create(body)
    },

    findUser(condition) {
        return User.findOne({
            where: condition
        })
    },

    update(id, update) {
        return User.update(update, {
            where: {
                id
            }
        })
    },

    destroy(id) {
        return User.destroy({
            where: {
                id
            }
        })
    },

    findAll(condition) {
        return User.findAll({
            where: condition
        });
    },

    getTotalUser(condition) {
        return User.count({
            where: condition
        });
    },



}