import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Components/Auth'
import Header from './Components/Header'
import Blogs from './Components/Blogs'
import UserBlogs from './Components/UserBlogs'
import BlogDetails from './Components/BlogDetails'
import AddBlog from './Components/AddBlog'
import { useSelector } from 'react-redux'

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log(isLoggedIn)
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/add' element={<AddBlog />} />
          <Route path='/myBlogs' element={<UserBlogs />} />
          <Route path='/myBlogs/:id' element={<BlogDetails />} />
        </Routes>
      </main>
    </React.Fragment>
    // <div className='App'>
    //   {/* <Header /> */}
    // </div>
  )
}

export default App
