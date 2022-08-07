import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isSignUp, setIsSignUp] = useState(false)

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const sendRequest = async (type = 'login') => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err))
    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    if (isSignUp) {
      sendRequest('signup')
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data))
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display={'flex'}
          flexDirection={'column'}
          alignItems='center'
          justifyContent='center'
          gap='10px'
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant='h2' padding={3} textAlign='center'>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Typography>
          {isSignUp && <TextField name='name' onChange={handleChange} value={inputs.name} margin='normal' placeholder='Name' />}
          <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} margin='normal' placeholder='Email' />
          <TextField name='password' onChange={handleChange} value={inputs.password} type={'password'} margin='normal' placeholder='Password' />
          <Button
            type='submit'
            // onSubmit={handleSubmit}
            sx={{
              borderRadius: 3,
              backgroundColor: '#00bcd4',
              marginTop: 3,
            }}
            color='warning'
            variant='contained'
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{
              borderRadius: 3,
              marginTop: 3,
            }}
          >
            Change to {isSignUp ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth
