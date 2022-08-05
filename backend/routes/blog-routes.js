import express from 'express'
import { getAllBlogs, createBlog, updateBlog, getByID, deleteBlog } from '../controllers/blog-controller'

const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs)
blogRouter.post('/create', createBlog)
blogRouter.put('/update/:id', updateBlog)
blogRouter.get('/:id', getByID)
blogRouter.get('/delete/:id', deleteBlog)

export default blogRouter
