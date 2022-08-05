import User from '../model/User'

import bcrypt from 'bcryptjs'

export const getAllUser = async (req, res, next) => {
  let users
  try {
    users = await User.find()
  } catch (err) {
    console.log(err)
  }
  if (!users) {
    return res.status(404).json({
      message: 'No users found',
    })
  }

  return res.status(200).json({ users: users })
}

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    console.log(error)
  }

  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists, Login Instead',
    })
  }
  const hashedPassword = bcrypt.hashSync(password)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
  } catch (error) {
    console.log(error)
  }
  return res.status(201).json({ newUser })
}
