import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 25 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks cross-site scripting attacks
    sameSite: "strict", // csrf attacks cross site request frogery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
