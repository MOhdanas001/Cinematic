import React from 'react'
import ReactPlayer from 'react-player';

const Player = () => {
  return (
    <div><video
    src="./videoplayback.webm"
    controls
    className="rounded-t-md object-cover "
  /></div>
  )
}

export default Player

