import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog'

const UserBlogs = () => {
  const [blogs, setBlogs] = useState()
  const id = localStorage.getItem('userId')

  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err) => console.log(err))
    // console.log(res)
    const data = await res.data
    return data
  }

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.userBlogs.blogs))
  }, [])
  console.log(blogs)

  return <div>{blogs && blogs.map((blog, index) => <Blog title={blog.title} description={blog.description} image={blog.imageURL} userName={blog.user.user} time={blog.updatedAt} />)}</div>
}

export default UserBlogs
