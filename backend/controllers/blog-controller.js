import mongoose from 'mongoose'
import Blog from '../model/Blog'
import User from '../model/User'

export const getAllBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find().populate('user')
  } catch (error) {
    console.log(error)
  }
  if (!blogs) {
    return res.status(404).json({
      message: 'No blogs found',
    })
  }
  return res.status(200).json({ blogs: blogs })
}

export const createBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body

  let existingUser

  try {
    existingUser = await User.findById(user)
  } catch (error) {
    return console.log(error)
  }
  if (!existingUser) {
    return res.status(400).json({
      message: 'User not found',
    })
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  })
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({ session })
    existingUser.blogs.push(blog)
    await existingUser.save({ session })
    await session.commitTransaction()
    // await newBlog.save()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error,
    })
  }
  return res.status(200).json({ blog })
}

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogID = req.params.id
  let blog

  try {
    blog = await Blog.findByIdAndUpdate(blogID, {
      title,
      description,
    })
  } catch (err) {
    return console.log(err)
  }
  if (!blog) {
    return res.status(500).json({
      message: 'No blog found',
    })
  }
  return res.status(200).json({ blog: blog })
}

export const getByID = async (req, res, next) => {
  const id = req.params.id
  let blog
  try {
    blog = await Blog.findById(id)
  } catch (error) {
    return console.log(error)
  }
  if (!blog) {
    return res.status(404).json({
      message: 'No blog found',
    })
  }
  return res.status(200).json({ blog: blog })
}

export const deleteBlog = async (req, res, next) => {
  const blogID = req.params.id
  let blog
  try {
    blog = await Blog.findByIdAndDelete(blogID).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
  } catch (error) {
    return console.log(error)
  }
  if (!blog) {
    return res.status(404).json({
      message: 'No blog found',
    })
  }
  return res.status(200).json({ message: 'Deleted Successfully', blog: blog })
}

export const getByUserID = async (req, res, next) => {
  const userID = req.params.id
  let userBlogs
  try {
    userBlogs = await User.findById(userID).populate('blogs')
  } catch (error) {
    return console.log(error)
  }
  if (!userBlogs) {
    return res.status(404).json({
      message: 'No blogs found',
    })
  }
  return res.status(200).json({ userBlogs: userBlogs })
}
