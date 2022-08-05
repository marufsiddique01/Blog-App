import express from 'express'
import { getAllBlogs, createBlog, updateBlog } from '../controllers/blog-controller'

const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs)
blogRouter.post('/create', createBlog)
blogRouter.put('/update/:id', updateBlog)
// blogRouter.post('/login', deleteBlog)

export default blogRouter
