import { motion } from "framer-motion"
import { useState } from "react"
import Data from '../components/Data.js'
function ProjectCard({ setCurrentProjectIndex }) {
  const [ project, setProjectOpen ] = useState(false)
  console.log(Data)
  const handleProjectOpen = () =>{
    setProjectOpen(!project)
}

    
    
    const handleProjectClick = (index) => {
      setCurrentProjectIndex(index);
      setProjectOpen(!project)
    };


  return (
    <motion.div 
    animate={ project ? {height: 'auto'} : {height:'300px'}}
    className="fixed bottom-0  border w-full bg-black ">
      <div onClick={handleProjectOpen} className="cursor-pointer py-4 px-2 w-full uppercase text-base border-b flex justify-between relative" >
        <span>work</span>
        <div className="h-1 rounded-full w-10 bg-white absolute top-4 left-1/2 translate-x-[-60%] translate-y-[-50%]"></div>
        <span  className="flex gap-1">
          <span> {project ? 'Open' : 'Close'} </span>
        <motion.svg 
        animate={project ? {rotate: 45} : {rotate: 0}}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></motion.svg>
        </span>
      </div>
      <motion.div 
      animate={project ? {height: 0} : {height:'auto'}}
      className={`overflow-hidden`}>
        {Data[0].director.projects.map((projects, index) => (
          <div onClick={() => handleProjectClick(index)} key={projects.title} className="py-4 px-2 w-full uppercase border-b flex justify-between cursor-pointer text-sm font-extralight">
            <motion.a
              href="#"
              className="flex flex-col items-center justify-center overflow-hidden h-6"
              style={{
                perspective: '15px', // Enables the 3D effect
                textDecoration: 'none', // Removes underline from the link
              }}
              whileHover="hover"
            >
              {/* First text with perspective animation */}
              <motion.span
                initial={{ y: 10 }}
                variants={{
                  hover: {
                    y: -10,
                    rotateX: 20,  // Perspective tilt on hover
                    transition: { type: 'spring', stiffness: 200 },
                  },
                }}
                className=""
              >
                {projects.title}
              </motion.span>

              {/* Second text just moving up */}
              <motion.span
                initial={{ y: 10 }}
                variants={{
                  hover: {
                    y: -10,  // Moves up on hover
                    transition: { type: 'spring', stiffness: 200 },
                  },
                }}
                className=""
              >
                {projects.title}
              </motion.span>
            </motion.a>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard