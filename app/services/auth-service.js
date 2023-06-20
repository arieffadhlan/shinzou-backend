const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const mailService = require("./mail-service");
const userRepository = require("../repositories/user-repository");
const ApplicationError = require("../errors/ApplicationError");
const { JWT_SIGNATURE_KEY } = require("../../config/application");

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const checkPassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
}

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SIGNATURE_KEY, { expiresIn: "24h" });
}

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

const generateUUIDToken = () => {
  return uuidv4();
}

const register = async (req) => {
  try {
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      throw new ApplicationError(422, "Nama, email, nomor telepon, dan password wajib diisi.");
    }
  
    const isUserExist = await userRepository.getUserByEmail(email);
    if (isUserExist) {
      throw new ApplicationError(422, "Email telah terdaftar.");
    }
  
    const encryptedPassword = encryptPassword(password);
    const otp = generateOTP();
    const user = await userRepository.createUser({
      name,
      email,
      phone_number,
      password: encryptedPassword,
      otp,
    });
  
    // Send otp to email
    await mailService.sendMail(email, "Verifikasi Akun",
      `
        <div style="font-size: 14px;">
          <span>Hai ${name},</span> <br /> <br />
          <span>
            Terima kasih telah memilih <strong>Shinzou</strong>. 
            Sebelum lanjut, Anda harus verifikasi akun terlebih dahulu. Untuk menyelesaikan tahap registrasi, silakan masukkan kode OTP di bawah ini:
          </span>
          <br /> <br />
          <span>Kode OTP: <strong>${otp}</strong></span> <br /> <br />
          <span>Jika Anda tidak membuat akun, maka Anda tidak perlu melakukan apapun dan silakan abaikan email ini.</span> <br /> <br />
          <span>Terima kasih,</span> <br />
          <span>Tim Shinzou</span>
        </div>
      `
    );
  
    return user; 
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const verifyOTP = async (req) => {
  try {
    const { otp } = req.body;
    
    const user = await userRepository.getUserByOTP(otp);
    if (!user) {
      throw new ApplicationError(401, "Maaf, Kode OTP Salah.");
    }
  
    const newOTP = generateOTP();
    return await userRepository.updateUser(user.id, {
      is_verified: true,
      otp: newOTP,
    }); 
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const login = async (req) => {
  try {
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
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const forgotPassword = async (req) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApplicationError(422, "Email wajib diisi.");
    }
  
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new ApplicationError(404, "Alamat email tidak ditemukan.");
    }
  
    // Send password reset link to email
    return await mailService.sendMail(email, "Reset Password",
      `
        <div style="font-size: 14px;">
          <span>Hai ${user.name},</span> <br /> <br />
          <span>Anda menerima email ini karena kami menerima permintan untuk mengatur ulang password akun Anda. Silakan klik link di bawah untuk mengatur ulang password Anda.</span> <br /> <br />
          <a href="http://localhost:3000/auth/reset-password/${user.token}" style="color: #222">Reset Password</a> <br /> <br />
          <span>Jika Anda tidak meminta pengaturan ulang password, maka Anda tidak perlu melakukan apapun dan silakan abaikan email ini.</span> <br /> <br />
          <span>Terima kasih,</span> <br />
          <span>Tim Shinzou</span>
        </div>
      `
    );
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const resetPassword = async (req) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
      throw new ApplicationError(422, "Password wajib diisi.");
    }
    
    const user = await userRepository.getUserByToken(token);
    if (!user) {
      throw new ApplicationError(401, "Terjadi kesalahan, silakan coba lagi.");
    }
  
    const newPassword = encryptPassword(password);
    const newToken = generateUUIDToken();
    return await userRepository.updateUser(user.id, {
      password: newPassword,
      token: newToken
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
  register,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword
}