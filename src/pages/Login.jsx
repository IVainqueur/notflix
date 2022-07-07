import { Error, Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import { _axios } from "../_config"
import { BASE_URL } from "../_config"

const CommonSx = {
  '& .MuiInputLabel-root': {
    color: "#ffffffB0 !important"
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: "#ffffffB0"
  },
  '& .css-16jznpq-MuiInputBase-root-MuiFilledInput-root:after': {
    borderBottomColor: "#ffffff90"
  },
  color: "white",
}

const LoginPage = () => {
  /* Logout first */
  _axios.get(`${BASE_URL}/user/logout`, {withCredentials: true})

  const navigator = useNavigate()

  const [userInfo, setUserInfo] = useState({
    username: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    },
    showPassword: false
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
    ["username", "password"].map(x => {
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
    }
    /* If the inputs are not empty, then */
    _axios.post(`${BASE_URL}/user/login`, {
      username: userInfo.username.value,
      password: userInfo.password.value,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then((response) => {
        let { data: res } = response
        if (res.code === "#Success") {
          console.log(res);
        } else {
          return setUserInfo({ ...userInfo, formError: res.message ? res.message : "Something went wrong. Please try again" })
        }
        navigator('/profiles');

      })
      .catch((e) => {
        console.log(e)
      })

  }
  return (
    <div className="LoginPage h-[100vh] w-full bg-[mainbg.jpg]">
      <nav className="px-4 py-6 flex flex-row items-center justify-between fixed w-full top-0 left-0 h-20">
        <img src="Vector.svg" alt="TheLogo" className="h-9" />
        <Button className="testBut" sx={{
          color: "white",
          backgroundColor: "red",
          textTransform: "capitalize",
          padding: "7px 17px",
          fontSize: "1rem",
          borderRadiues: "2px"
        }} variant="solid" href="/signup">Sign Up</Button>
      </nav>
      <div className="main grid place-items-center h-full w-full px-4">
        <div className="form w-full md:min-w-fit md:w-[30rem] bg-[#00000090] text-white py-5 px-10 flex flex-col gap-2 rounded">
          <h1 className="text-[2em] font-bold">Login</h1>
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
            name="username"
            error={userInfo["username"].error ? true : false}
            helperText={userInfo["username"].error}
            type={'text'}
            label="Your username"
            placeholder="Not John Doe"
            value={userInfo.username.value}
            sx={CommonSx} />
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
            sx={CommonSx}
          />
          <FormControlLabel label="Remember Me" control={
            <Checkbox sx={{
              width: "fit-content",
              color: "#ffffffb0",
              '&.Mui-checked': {
                color: "white"
              }
            }} />} />
          <Button className='testBut' sx={{
            background: 'red',
            color: "white",
          }} onClick={submitHandler}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage