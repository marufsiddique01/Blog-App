import react, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log(isLoggedIn)
  const [value, setvalue] = useState(0)
  return (
    <AppBar sx={{ background: '#fff' }} position='sticky'>
      <Toolbar>
        <Typography variant='h4' sx={{ color: 'teal' }}>
          Blogs App
        </Typography>
        {isLoggedIn && (
          <Box display='flex' marginLeft='auto' marginRight='auto'>
            <Tabs value={value} onChange={(e, val) => setvalue(val)}>
              <Tab LinkComponent={Link} to='/blogs' label='All blogs' />
              <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs' />
            </Tabs>
          </Box>
        )}
        <Box display='flex' marginLeft='auto' gap='10px'>
          {!isLoggedIn && (
            <>
              <Button LinkComponent={Link} to='/auth' sx={{ margin: '1' }} variant='contained' color='primary'>
                Login
              </Button>
              <Button LinkComponent={Link} to='/auth' variant='contained' color='primary'>
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button LinkComponent={Link} to='/auth' variant='contained' color='primary'>
              LogOut
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
