import Blog from '../model/Blog'

export const getAllBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find()
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
  const newBlog = new Blog({
    title,
    description,
    image,
    user,
  })
  try {
    await newBlog.save()
  } catch (error) {
    return console.log(error)
  }
  return res.status(201).json({ newBlog })
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
    blog = await Blog.findByIdAndDelete(blogID)
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
