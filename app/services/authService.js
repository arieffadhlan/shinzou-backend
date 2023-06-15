const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken')


const SECRET_KEY = 'Secret'

async function encryptPassword(str) {
    try {
        const hash = await bcrypt.hash(str, 10);
        return hash;

    } catch (err) {
        console.log(err);
    }
}

async function comparePassword(password, encryptedPassword) {
    try {
        const isValid = await bcrypt.compare(password, encryptedPassword);
        return isValid
    } catch (err) {
        console.log(err);
    }
}


function createWebToken(payload) {
    return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}


module.exports = {
    encryptPassword,
    createWebToken,
    comparePassword,
    verifyToken,
    async register(username, email, password, role) {
        try {
            const encryptedPassword = await encryptPassword(password);

            const checkUser = await userRepository.findUser({
                email
            })
            if (checkUser) {
                return {
                    code: "401"
                }
            }

            const body = {
                username,
                email,
                password: encryptedPassword,
                role
            }
            const user = await userRepository.create(body);

            return user;

        } catch (err) {
            return err;
        }
    },

    async login(email, password) {
        try {
            const user = await userRepository.findUser({
                email
            });

            if (!user) {
                return {
                    code: 404,
                    message: "Email is not identified"
                }
            }

            const {
                password: encryptedPassword
            } = user;

            const isAuthenticated = await comparePassword(password, encryptedPassword);

            if (!isAuthenticated) {
                return {
                    code: 401,
                    status: "FAIL",
                    message: "WRONG PASSWORD"
                }
            }

            //generate token
            const token = createWebToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            const data = {
                ...user.dataValues,
                token
            }

            return data;

        } catch (err) {
            return err;
        }
    },

    async authorize(token) {
        try {
            const payload = verifyToken(token);

            const id = payload ? .id;

            const user = await userRepository.findUser(id);
            return user;

        } catch (err) {
            return err;
        }
    },

    async authorizeAdmin(token) {
        try {
            const payload = verifyToken(token);

            const id = payload ? .id;
            const role = payload ? .role;
            if (role == "admin") {
                const user = await userRepository.findUser(id);
                return user;
            }
            return false;
        } catch (err) {
            return err;
        }
    }


}