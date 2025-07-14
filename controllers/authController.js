import fs from "fs/promises";
import path from "path";
import User from "../models/user.js"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import {registerSchema, loginSchema } from "../schemas/authSchemas.js"; 
import gravatar from "gravatar";

const avatarsDir = path.resolve("public", "avatars");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";


export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

    const newUser = await User.create({ email, password: hashPassword, avatarURL });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    try {
     
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
      user.token = token;
      await user.save();
  
      res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
      user.token = null;
      await user.save();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
};

export const getCurrent = async (req, res, next) => {
    try {
      const { email, subscription, avatarURL } = req.user;
      res.status(200).json({ email, subscription, avatarURL });
    } catch (error) {
      next(error);
    }
};

export const updateAvatar = async (req, res, next) => {
    try {
      const { path: tempPath, originalname } = req.file;
      const { id } = req.user;
      const ext = path.extname(originalname);
      const filename = `${id}_${Date.now()}${ext}`;
      const finalPath = path.join(avatarsDir, filename);
  
      await fs.rename(tempPath, finalPath);
  
      const avatarURL = `/avatars/${filename}`;
  
      req.user.avatarURL = avatarURL;
      await req.user.save();
  
      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  };