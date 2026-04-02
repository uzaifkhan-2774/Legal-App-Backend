import User from "../models/User.js";
import bcrypt from "bcrypt";
import token from "../utiles/generateJWT.js";
import LawyerProfile from "../models/LawyerProfile.js";

// first api logic for registration of users.

export const registration = async (req, res) => {
  // destructuring the object from req.body.

  let { name, email, password, phone, role } = req.body;

  try {
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: "all fields are required , please fill all the field",
        success: false,
      });
    }

    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "invalid email id , please enter right one.",
          succes: false,
        });
    }

    let newUser = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully..", newUser });
  } catch (error) {
    res.status(500).json({ massage: `${error} server error..` });
  }
};

// Login Api creations

export const login = async (req, res) => {
  // destructuring email and password.

  let { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required..",
        success: false,
      });
    }

    let existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        message: "Invalid Email, Please enter valid email",
        succes: false,
      });
    }

    if (existingUser?.role === "Lawyer") {

      let LawyerProfileLawyer = await LawyerProfile.findOne({UserId: existingUser?._id});
  
      

         if(!LawyerProfileLawyer) {
      
        return res.status(400).json({
          message: "Create Your Lawyer Profile First.",
          success: false,
        });
      }

      if (LawyerProfileLawyer?.Status !== "APPROVED") {
        return res.status(400).json({
          success: false,
          message:
            "Please Contact To Admin Panel As Your Request Is Not Approved.",
        });
      }
    }

    let isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "please enter correct password..",
      });
    }

    // let genToken = token(existingUser?._id, existingUser?.name);

    // console.log(genToken);

    res.status(302).json({
      message: "Loged in successfully.",
      token: token(existingUser?._id, existingUser?.name),
      result: {
        name: existingUser?.name,
        id: existingUser?._id,
        email: existingUser?.email,
        role: existingUser?.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `${error} server error...` });
  }
};
