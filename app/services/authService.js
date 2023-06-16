const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const ApplicationError = require("../errors/ApplicationError");

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const checkPassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
}

const createToken = (payload) => {
  return jwt.sign(payload, "secret");
}

const generateOTP = () => {
  let OTP = ""
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}

const register = async (req) => {
  const { name, email, phone_number, password } = req.body;
  if (!name || !email || !phone_number || !password) {
    throw new ApplicationError(422, "Nama, email, nomor telepon, dan password wajib diisi.");
  }

  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    throw new ApplicationError(422, "Email telah terdaftar.")
  }

  const encryptedPassword = encryptPassword(password);
  const otp = generateOTP();
  const user = await userRepository.createUser({
    name,
    email,
    phone_number,
    password: encryptedPassword,
    role: "User",
    otp,
    is_verified: false
  });

  return user; 
}

const login = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApplicationError(422, "Email dan password wajib diisi.");
  }

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new ApplicationError(401, "Identitas tersebut tidak sesuai dengan data kami.");
  }

  const isPasswordCorrect = checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApplicationError(401, "Identitas tersebut tidak sesuai dengan data kami.");
  }

  const token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number
  });

  return { token }; 
}

module.exports = {
  register,
  login
}