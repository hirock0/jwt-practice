import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export async function LoggedUser(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "not logged", success: false });
    }
    return res.status(200).json({ message: "logged", success: true, decoded });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export async function Register(req, res) {
  try {
    const { name, email, password } = await req.body;
    const tokendData = {
      email: email,
      name: name,
    };
    const token = await jwt.sign(tokendData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({ message: "Register", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function LogOut(req, res) {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "LogOut", success: true });
  } catch (error) {
    return res.status(500).json({ message: "LogOut", success: true });
  }
}

export async function Products(req, res) {
  try {
    return res.status(200).json({ message: "Products", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
