import { useRef } from "react";
import { motion } from "framer-motion";
// import { useState } from "react";
import ScrambleText from "../components/ScrambleText";

function Home() {

  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   setPosition({ x: event.clientX, y: event.clientY });
  // };
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div  className=" h-[calc(100vh)] bg-blue-700 flex bg-cover items-center justify-center relative overflow-hidden" >
      {/* <img className="w-full h-full absolute inset-0" src="/public/download.jpeg" alt="" /> */}
      <video className="w-full h-full absolute inset-0 object-cover" autoPlay playsInline loop muted src="/lil uzi.mp4"></video>
      <div className="w-full h-full flex gap-0 absolute inset-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
          
          key={index}
          className="w-10 h-full flex-1 bg-transparent"
          style={{
            perspective: '10px',
            backdropFilter: "blur(5px)",
            transform: "rotateY(10deg)",
            // transitionDuration: '1ms'
          }}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-0 uppercase text-sm flex justify-between items-center w-full px-2 py-3">
        {/* <span>lil uzi vert</span> */}
        <ScrambleText>lil uzi vert</ScrambleText>
        <span>kick start</span>
      </div>
      <motion.div
        className="absolute cursor-pointer box z-10 uppercase text-sm py-1 px-2 bg-white"
        onClick={playSound}
      >
        play sound
      </motion.div>
      {/* Audio element */}
      <audio ref={audioRef} src="/click sound.wav" />
      {/* <div className="relative w-full bg-black h-fit "> */}
        <div className="w-full absolute bottom-14 px-2  py-1 overflow-hidden">
          <motion.div 
          className=" bg-black box z-50 relative uppercase text-sm cursor-pointer "> 
            <span className="bg-black py-1 px-2">scroll</span>
          </motion.div>
          <div className="w- absolute top-3 flex gap-3 ">
          {[...Array(10000)].map((_, i) => (
            <span key={i} className="inline-flex h-6 w-[3px] bg-white"></span>
          ))}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
