import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokensSetCookie from "../utils/generateTokenSetCookie.js";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      userEmail,
      password,
      confirmPassword,
      userRole,
      state,
      city,
      street,
      houseNumber,
      postalCode,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !userEmail ||
      !password ||
      !confirmPassword ||
      !state ||
      !city ||
      !street ||
      !houseNumber ||
      !postalCode
    ) {
      return res.status(400).json({ error: "All fields need to be filled" });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user email already exists
    const findUserEmail = await User.findOne({ userEmail });
    if (findUserEmail) {
      return res.status(400).json({ error: "User email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullName,
      userEmail,
      password: hashedPassword,
      userRole: userRole || "customer",
      userAddress: {
        state,
        city,
        street,
        houseNumber,
        postalCode,
      },
    });

    // Save the user
    const savedUser = await newUser.save();

    if (savedUser) {
      // Generate tokens and set cookie
      await generateTokensSetCookie(newUser._id, res);

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        userEmail: savedUser.userEmail,
        userRole: savedUser.userRole,
        userAddress: savedUser.userAddress,
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAccount = async (req, res) => {
  try {
    const {
      fullName,
      userEmail,
      password,
      confirmPassword,
      userRole,
      state,
      city,
      street,
      houseNumber,
      postalCode,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !userEmail ||
      !password ||
      !confirmPassword ||
      !userRole ||
      !state ||
      !city ||
      !street ||
      !houseNumber ||
      !postalCode
    ) {
      return res.status(400).json({ error: "All fields need to be filled" });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user email already exists
    const findUserEmail = await User.findOne({ userEmail });
    if (findUserEmail) {
      return res.status(400).json({ error: "User email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullName,
      userEmail,
      password: hashedPassword,
      userRole: userRole || "user",
      userAddress: {
        state,
        city,
        street,
        houseNumber,
        postalCode,
      },
    });

    // Save the user
    const savedUser = await newUser.save();

    if (savedUser) {
      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        userEmail: savedUser.userEmail,
        userRole: savedUser.userRole,
        userAddress: savedUser.userAddress,
      });
    }
  } catch (error) {
    console.log("error in createAccount controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ userEmail });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid username or password" });
    }

    await generateTokensSetCookie(user._id, res);

    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      userEmail: user.userEmail,
      userRole: user.userRole,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout sucessful" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ error: "User Id not found" });
    }

    const userDetails = await User.findById(userId);

    res.status(200).json({
      fullName: userDetails.fullName,
      email: userDetails.userEmail,
      state: userDetails.userAddress.state,
      city: userDetails.userAddress.city,
      street: userDetails.userAddress.street,
      postalCode: userDetails.userAddress.postalCode,
      houseNumber: userDetails.userAddress.houseNumber,
    });
  } catch (error) {
    console.log("error in get user details controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { state, city, postalCode, street, houseNumber } = req.body;

    if (!userId) {
      res.status(401).json({ error: "User Id not found" });
    }

    if (!state || !city || !postalCode || !street || !houseNumber) {
      res.status(400).json({ erro: "Please fill in all the field" });
    }
    const updateAddress = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "userAddress.state": state,
          "userAddress.city": city,
          "userAddress.postalCode": postalCode,
          "userAddress.street": street,
          "userAddress.houseNumber": houseNumber,
        },
      },
      { new: true } // Return the updated user
    );

    res.status(200).json({
      message: "User address updated successfully",
      user: updateAddress.userAddress,
    });
  } catch (error) {
    console.log("error in update user Address controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Check if userId exists
    if (!userId) {
      return res.status(401).json({ error: "User ID not found" });
    }

    // Validate required fields
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password matches
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Your old password does not match" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    // Respond with success message
    res.status(200).json({
      message: "Password updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email, // Include relevant user information
      },
    });
  } catch (error) {
    console.error("Error in updatePassword controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
