import React from 'react'
import './Home.css'
import Rec from '../Rec/Rec'
import History from '../History/History'
function Home() {
  return (
    <div className="home">
      <div className="vid">
        <video
          className="background-video"
          src="/104932068_free.mp4"
          autoPlay
          muted
          playsInline
        />
      </div>
      <Rec />
      <History />
    </div>
  )
}

export default Home
