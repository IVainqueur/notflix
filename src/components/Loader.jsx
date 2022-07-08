import React from 'react'

function Loader() {
  return (
    <div className="loader h-screen w-screen bg-[#141414] grid place-content-center">
      <div
        className="loader h-screen w-screen bg-[#141414] grid place-content-center"
      >
        <svg className="loadSVG" xmlns="https://www.w3.org/2000/svg" xlink="https://www.w3.org/1999/xlink" style={{
          'margin': 'auto', 'background': 'rgba(255, 255, 255, 0)', 'display': 'block'
        }} width="177px" height="177px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path d="M27 50A23 23 0 0 0 73 50A23 24.3 0 0 1 27 50" fill="#b9090b" stroke="none">
          </path>
        </svg>

      </div>
    </div>
  )
}

export default Loader