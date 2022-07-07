import { Error, Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { _axios } from "../_config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../_config"
import './Login.css'

const SignupPage = () => {
  const navigator = useNavigate()
  
  const [userInfo, setUserInfo] = useState({
    fullName: {
      value: '',
      error: null
    },
    username: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    },
    email: {
      value: '',
      error: null
    },
    showPassword: false,
    formError: null
  })
  const inputHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: { ...[e.target.name], value: e.target.value } })
  }
  const passwordVisibilityHandler = () => {
    setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword })
  }
  const submitHandler = () => {
    /* Check if the info entered is valid */
    let emptyFields = {};
    ["fullName", "username", "email", "password"].map(x => {
      if (userInfo[x].value.trim() === '') emptyFields[x] = "can not be empty"
      return x
    })

    if (Object.keys(emptyFields).length) {
      setUserInfo(prev => {
        for (let key of Object.keys(prev)) {
          if (Object.keys(emptyFields).includes(key)) {
            prev[key].error = emptyFields[key]
          }
        }
        return { ...prev }
      })
      return
    }
    _axios.post(`${BASE_URL}/user/signup`, {
      fullName: userInfo.fullName.value,
      username: userInfo.username.value,
      email: userInfo.email.value,
      password: userInfo.password.value,
    })
      .then((response) => {
        let { data: res } = response
        if (res.code === "#Success") {
          navigator('/login');
        } else {
          setUserInfo({ ...userInfo, formError: res.message })
        }
      })
      .catch((e) => {
        console.log(e)
      })


  }
  return (
    <div className="SignupPage h-[100vh] w-full bg-[mainbg.jpg]">
      <nav className="px-4 py-6 flex flex-row items-center justify-between fixed w-full top-0 left-0 h-20">
        <img src="Vector.svg" alt="TheLogo" className="h-9" />
        <Button className="testBut" sx={{
          color: "white",
          backgroundColor: "red",
          textTransform: "capitalize",
          padding: "7px 17px",
          fontSize: "1rem",
          borderRadiues: "2px"
        }} variant="solid" href="/login">Login</Button>
      </nav>
      <div className="main grid place-items-center h-full w-full px-4">
        <div className="form w-full md:min-w-fit md:w-[30rem] bg-[#00000090] text-white py-5 px-10 flex flex-col gap-2 rounded">
          <h1 className="text-[2em] font-bold">Signup</h1>
          {userInfo.formError && <p className="text-[#fff] p-3 bg-[#6b1a1a] flex flex-row items-center gap-2">
            <Error />
            <span>{userInfo.formError}</span>
          </p>}
          <TextField
            InputProps={{
              onChange: inputHandler,
              sx: {
                color: "white"
              }
            }}
            variant="filled"
            required={true}
            name="fullName"
            error={userInfo["fullName"].error ? true : false}
            helperText={userInfo["fullName"].error}
            type={'text'}
            label="Your names"
            placeholder="Full Name"
            value={userInfo.fullName.value}
            sx={{
              '& .MuiInputLabel-root': {
                color: "#ffffffB0"
              },
              '& .css-16jznpq-MuiInputBase-root-MuiFilledInput-root:after': {
                borderBottomColor: "#ffffff90"
              },
              color: "white",
            }} />
          <TextField

            InputProps={{
              onChange: inputHandler,
              sx: {
                color: "white"
              }
            }}
            variant="filled"
            required={true}
            name="username"
            error={userInfo["username"].error ? true : false}
            helperText={userInfo["username"].error}
            type={'text'}
            label="Your username"
            placeholder="Not John Doe"
            value={userInfo.username.value}
            sx={{
              '& .MuiInputLabel-root': {
                color: "#ffffffB0"
              },
              '& .css-16jznpq-MuiInputBase-root-MuiFilledInput-root:after': {
                borderBottomColor: "#ffffff90"
              },
              color: "white",
            }} />
          <TextField

            InputProps={{
              onChange: inputHandler,
              sx: {
                color: "white"
              }
            }}
            variant="filled"
            required={true}
            name="email"
            error={userInfo["email"].error ? true : false}
            helperText={userInfo["email"].error}
            type={'text'}
            label="Your email"
            placeholder="notjohn@jomail.com"
            value={userInfo.email.value}
            sx={{
              '& .MuiInputLabel-root': {
                color: "#ffffffB0"
              },
              '& .css-16jznpq-MuiInputBase-root-MuiFilledInput-root:after': {
                borderBottomColor: "#ffffff90"
              },
              color: "white",
            }} />
          <TextField


            InputProps={{
              onChange: inputHandler,
              sx: {
                color: "white"
              },
              endAdornment: <InputAdornment position="end"><IconButton onClick={passwordVisibilityHandler}>{userInfo.showPassword ? <Visibility className="cursor-pointer" sx={{ fill: "#ffffffb0" }} /> : <VisibilityOff className="cursor-pointer" sx={{ fill: "#ffffffb0" }} />}</IconButton></InputAdornment>
            }}
            variant="filled"
            required={true}
            name="password"
            error={userInfo["password"].error ? true : false}
            helperText={userInfo["password"].error}
            type={userInfo.showPassword ? 'text' : 'password'}
            label="Your password"
            value={userInfo.password.value}
            sx={{
              '& .MuiInputLabel-root': {
                color: "#ffffffB0"
              },
              '& .css-16jznpq-MuiInputBase-root-MuiFilledInput-root:after': {
                borderBottomColor: "#ffffff90"
              },
              color: "white",
              // backgroundColor: "rgba(255, 255, 255, 0.2)"
            }}
          />

          <Button className='testBut' sx={{
            background: 'red',
            color: "white",
          }} onClick={submitHandler}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage