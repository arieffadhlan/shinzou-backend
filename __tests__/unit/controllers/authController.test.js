const bcrypt = require("bcryptjs");
const { User } = require("../../../app/models");
const authController = require("../../../app/controllers/authController");

const mockUser = {
  id: 1,
  name: "user",
  email: "user@mail.com",
  phone_number: "08123456789",
  password: "password",
  role: "User",
  otp: "123456",
  is_verified: false
};

describe("handleRegister", () => {
  afterAll(async () => {
    await User.destroy({
      where: { email: mockUser.email },
    });
  });
  
  test("Response should return status code 201 with  if register has been successful.",
    async () => {
      const req = {
        body: {
          name: mockUser.name,
          email: mockUser.email,
          phone_number: mockUser.phone_number,
          password: mockUser.password
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    }
  );
});