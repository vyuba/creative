import { useRef, useEffect , useState, useCallback } from "react";
import { motion } from "framer-motion";
// import { useState } from "react";
import ScrambleText from "../components/ScrambleText";
// import PixelTransition from "../components/PixelTransition";

function Home() {
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   setPosition({ x: event.clientX, y: event.clientY });
  // };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX - 1000, y: e.clientY - 430 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.addEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const contentRef = useRef(null);

  const handleScrollContent = () => {
    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;
    const trackEle = trackRef.current;

    if (!thumbEle || !contentEle || !trackEle) return;

    const scrollRatio = contentEle.scrollLeft / (contentEle.scrollWidth - contentEle.clientWidth); // Calculate scroll progress (percentage)
    const thumbMaxPosition = trackEle.clientWidth - thumbEle.clientWidth; // Maximum position the thumb can move
    thumbEle.style.left = `${scrollRatio * thumbMaxPosition}px`; // Set thumb position based on scroll percentage
  };

  useEffect(() => {
    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;
    if (!thumbEle || !contentEle) return;
  
    // Set initial thumb height based on content size
    const scrollRatio = contentEle.clientWidth / contentEle.scrollWidth;
    thumbEle.style.width = `${scrollRatio * 100}%`;
  
    const handleResize = () => {
      const scrollRatio = contentEle.clientWidth / contentEle.scrollWidth;
      thumbEle.style.width = `${scrollRatio * 100}%`; // Update thumb size on window resize
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickTrack = (e) => {
    const trackEle = trackRef.current;
    const contentEle = contentRef.current;
    if (!trackEle || !contentEle) return;

    const bound = trackEle.getBoundingClientRect();
    const percentage = (e.clientX - bound.left) / bound.width; // Calculate clicked position as percentage
    contentEle.scrollLeft = percentage * (contentEle.scrollWidth - contentEle.clientWidth); // Scroll content to the correct position
  };

  const handleMouseDown = useCallback((e) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) return;

    const startPos = {
      left: contentEle.scrollLeft, // Starting scroll position
      x: e.clientX,
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x; // Calculate horizontal movement
      const scrollRatio = contentEle.clientWidth / contentEle.scrollWidth;
      contentEle.scrollLeft = startPos.left + dx / scrollRatio; // Change '-' to '+' for scrolling right
      updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      resetCursor(ele);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) return;

    const touch = e.touches[0];
    const startPos = {
      left: contentEle.scrollLeft, // Starting scroll position
      x: touch.clientX,
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x; // Calculate horizontal movement
      const scrollRatio = contentEle.clientWidth / contentEle.scrollWidth;
      contentEle.scrollLeft = startPos.left + dx / scrollRatio; // Change '-' to '+' for scrolling right
      updateCursor(ele);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      resetCursor(ele);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, []);

  // Convert vertical scrolling (deltaY) into horizontal scrolling
  const handleWheelScroll = (e) => {
    const contentEle = contentRef.current;
    if (!contentEle) return;

    contentEle.scrollLeft += e.deltaY; // Scroll horizontally based on vertical wheel movement
  };

  const updateCursor = (ele) => {
    ele.style.cursor = 'grabbing';
    ele.style.paddingInline = '10px';
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };
  
  const resetCursor = (ele) => {
    ele.style.cursor = 'grab';
    ele.style.paddingInline = '0px';
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    const contentEle = contentRef.current;
    if (!contentEle) return;

    // Add the wheel event listener for horizontal scrolling
    contentEle.addEventListener('wheel', handleWheelScroll);

    // Add the scroll event listener to update the thumb position
    contentEle.addEventListener('scroll', handleScrollContent);

    return () => {
      contentEle.removeEventListener('wheel', handleWheelScroll);
      contentEle.removeEventListener('scroll', handleScrollContent);
    };
  }, []);
  
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const videos = [
    {
      title: "punk",
      artist: "lil uzi vert",
      url: "/lil uzi.mp4",
    },
    {
      title: "Heroes & villians",
      artist: "future, metrobumming",
      url: "/heroes and villains.mp4",
    },
  ];
  // const timer = setTimeout(() => {
  //   // Toggle visibility once
  //   setIsVisible(!isVisible);
  // }, 1000);

  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // const handleNextVideo = () => {
  //   setCurrentVideoIndex(
  //     (prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0)
  //     // setIsVisible(!isVisible),
  //   );
  // };

  // const handlePreviousVideo = () => {
  //   setCurrentVideoIndex(
  //     (prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1)
  //     // setIsVisible(!isVisible)
  //   );
  // };

  return (
    <div className=" h-[calc(100dvh)] bg-blue-700 flex bg-cover items-center justify-center relative overflow-hidden">
       <div className="content-hero w-full h-dvh flex absolute overflow-x-auto overflow-y-hidden inset-0 object-cover" onScroll={handleScrollContent} ref={contentRef}>
        <video
            className="min-w-[100vw] h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            src={videos[currentVideoIndex].url}
        ></video>
        <video
            className="min-w-[100vw] h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            src={videos[currentVideoIndex].url}
        ></video>
        <video
            className="min-w-[100vw] h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            src={videos[currentVideoIndex].url}
        ></video>
        <video
            className="min-w-[100vw] h-full object-cover"
            autoPlay
            playsInline
            loop
            muted
            src={videos[currentVideoIndex].url}
        ></video>
    </div>
    <motion.div
      style={{
        mixBlendMode: 'difference',
        color: 'white',
      }}
      className=" cursor-pointer box z-10 uppercase text-sm py-1 px-2 bg-white"
      onClick={playSound}
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{
        // type: 'linear',
        stiffness: 100,
        damping: 0,
      }}
    >
      play sound
    </motion.div>
    <div className="absolute w-full h-[250px] bg-gradient-to-t from-black to-transparent bottom-0"></div>
      {/* <div className="w-full h-full flex gap-0 absolute inset-0"> */}
        {/* <PixelTransition isVisible={isVisible} /> */}
      {/* </div> */}
      {/* Audio element */}
      <audio ref={audioRef} src="/click sound.wav" />
      {/* <div className="relative w-full bg-black h-fit "> */}
      <div className="w-full flex flex-col gap-5 absolute bottom-7 px-2  py-1 overflow-hidden">
        <div className=" uppercase text-sm flex flex-col gap-3 w-full px-4 py-3">
          <ScrambleText>lil uzi vert</ScrambleText>
          <ScrambleText>kick start</ScrambleText>
        </div>
        <div className="relative">
          <motion.div ref={thumbRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} className=" bg-black box z-50 relative uppercase text-sm  transition-all ">
            <span className="bg-black w-full py-1 px-2">scroll</span>
          </motion.div>
          <div ref={trackRef} onClick={handleClickTrack} className="items-center justify-center absolute top-3 flex gap-3 cursor-pointer w-screen ">
            <div className="flex bg-transparent gap-9">
              {[...Array(10000)].map((_, i) => (
                <span key={i} className="inline-flex h-5 w-[2.5px] bg-zinc-700 rounded-full"></span>
              ))}

            </div>

        </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="video-controls absolute top-32 flex gap-10 ">
        <button className="uppercase text-sm" onClick={handlePreviousVideo}>
          Previous
        </button>
        <button className="uppercase text-sm" onClick={handleNextVideo}>
          Next
        </button>
      </div> */}
    </div>
  );
}

export default Home;

{/* {Array.from({ length: 20 }).map((_, index) => (
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
))} */}