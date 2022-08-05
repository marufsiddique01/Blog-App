import react from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { borderRadius } from '@mui/system'

const Header = () => {
  return (
    <AppBar sx={{ background: '#fff' }}>
      <Toolbar>
        <Typography variant='h4' sx={{ color: 'teal' }}>
          Blogs App
        </Typography>
        <Box display='flex' marginLeft='auto'>
          <Button sx={{ margin: '1' }} variant='contained' color='primary'>
            Login
          </Button>
          <Button sx={{ margin: '1', borderRadius: '10px' }} variant='outlined' color='primary'>
            SignUp
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
