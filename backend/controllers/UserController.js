import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password do not match" });

  const hashedPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "Register berhasil" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, password, confirmPassword, role } = req.body;

  let hashedPassword = "";
  if (password === "" || password === null) {
    hashedPassword = user.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password do not match" });

  try {
    await User.update(
      {
        name,
        email,
        password: hashedPassword,
        role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "User berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
