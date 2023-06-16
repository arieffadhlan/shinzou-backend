const authService = require('../../../services/authService')

module.exports = {
    async handleRegister(req, res) {
        try {
            const {
                username,
                email,
                password
            } = req.body;
            const role = "buyer"
            const user = await authService.register(username, email, password, role);

            if (user.code == 401) {
                return res.status(401).json({
                    status: "FAIL",
                    message: `User with email ${email} already exist, please login`
                })
            }
            res.status(201).json({
                status: "OK",
                data: user
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async handleLogin(req, res) {
        try {
            const {
                email,
                password
            } = req.body;
            const auth = await authService.login(email, password);
            if (auth.code === 401) {
                res.status(401).json({
                    status: "FAIL",
                    message: auth.message,
                })
                return;
            } else if (auth.code === 404) {
                res.status(404).json({
                    status: "FAIL",
                    message: auth.message,
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async authorize(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                res.status(403).json({
                    message: "WRONG BEARER TOKEN",
                })
                return;
            }
            const token = bearerToken.split('Bearer ')[1];

            const user = await authService.authorize(token)
            if (!user) {
                res.status(403).json({
                    message: "UNAUTHORIZED"
                })
                return;
            }

            req.user = user;
            next();

        } catch (err) {
            res.status(400).json({
                message: "NEED AUTHORIZATION",
            })
        }
    },

    async authorizeAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                res.status(403).json({
                    message: "WRONG BEARER TOKEN",
                })
                return;
            }

            const token = bearerToken.split('Bearer ')[1];
            const user = await authService.authorizeAdmin(token);
            if (!user) {
                res.status(403).json({
                    message: "Your not an admin"
                })
                return;
            }

            req.user = user;
            next()

        } catch (err) {
            res.status(400).json({
                message: "NEED AUTHORIZATION",
            });
        }
    },

    whoAmI(req, res) {
        const user = req.user;
        res.status(201).json({
            status: "OK",
            data: user
        })
        return;
    }

}