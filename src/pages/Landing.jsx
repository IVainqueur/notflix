import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import './Landing.css'

const Landing = () => {
  const navigator = useNavigate()
  return (
    <div className="LandingPage h-[100vh] w-full bg-[mainbg.jpg]">
      <nav className="px-4 py-6 flex flex-row items-center justify-between fixed w-full top-0 left-0 h-20">
        <img src="Vector.svg" alt="TheLogo" className="h-9" />
        <Button className="testBut" sx={{
          color: "white",
          backgroundColor: "red",
          textTransform: "capitalize",
          padding: "7px 17px",
          fontSize: "1rem",
          borderRadiues: "2px"
        }} variant="solid" onClick={() => navigator('/signup')}>Sign In</Button>
      </nav>
      <div className="main h-full pt-20 grid place-content-center">
        <div className="First mx-auto -mt-40 w-fit text-white text-center">
          <h1 className=" text-[1.5em] md:text-[2em] lg:text-[3em] md:font-black font-bold outlined">Limited movies, TV shows, and more.</h1>
          <p className="text-[1.2em] md:text-[1.5em] md:font-bold mt-1 md:mt-3">Watch Anywhere. Can't Cancel.</p>
          <p className="text-[1.5em] font-bold mt-1">Ready to watch? Get on with it then.</p>
          <Button className="testBut" sx={{
            color: "white",
            backgroundColor: "red",
            textTransform: "capitalize",
            padding: "7px 40px",
            fontSize: "1rem",
            marginTop: "10px",
            borderRadius: "2px"
          }} onClick={() => navigator('/login')}>GET IN</Button>
        </div>
      </div>
    </div>
  )
}

export default Landing