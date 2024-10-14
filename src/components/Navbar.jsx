import { useState } from "react"
import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import ScrambleText from "./ScrambleText"
function Navbar() {

    const navLinks = [
        { path: '/', label: 'home' },
        { path: '/work', label: 'works' },
        { path: '/about', label: 'about me' },
        { path: '/contact', label: 'lets work' }
      ];

    const [ clicked, setClicked ] = useState(false)


    const handleClick = () =>{
        setClicked(!clicked)
    }


  return (
    <div className="">
        <nav className="w-full py-4 px-4 justify-between flex bg-transparent fixed top-0 z-50">
        <span 
            style={{
                mixBlendMode: 'difference',
                // filter: 'invert(1)',
                color: 'white',
            }}
        className={`uppercase pt-7  z-[100] ${ clicked ? 'pl-6 transition-all':'pl-0' } `}> <Link to='/' >gibson hazard</Link> </span>
            <ul className="uppercase font-thin hidden md:flex items-center flex-row gap-3 pt-5">
                <Link to='/'>
                    <li>home</li>
                </Link>
                <Link to='/work'>
                    <li>works</li>
                </Link>
                <Link to='/about'>
                    <li>about</li>
                </Link>
            </ul>
            <motion.div
            initial={{ width: '80px', height: '80px'}}
            animate={ clicked ? { width: 'calc(100vw - 32px)', height: '380px' } : { width: '80px', height: '80px' }}
             className="w-20 h-20  bg-white fixed right-4 z-50 overflow-hidden md:hidden">
                    <div
                    onClick={handleClick}
                        className={`w-9 h-10 cursor-pointer flex flex-col items-center justify-center absolute right-[23px] top-5`}
                    >
                        <div
                        className={`w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem]  ${clicked ? 'rotate-[-45deg]' : ''}`}
                        ></div>
                        <div
                        className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center   ${clicked ? 'hidden' : ''}`}
                        ></div>
                        <div
                        className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${clicked ? 'rotate-[45deg]' : ''}`}
                        ></div>
                    </div>
                <div className="absolute top-28 left-7">
                    <ul className="text-black uppercase font-semibold  text-2xl flex flex-col gap-5 ">
                    {navLinks.map((link, index) => (
                        <NavLink
                        key={index}
                        onClick={handleClick}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? 'text-red-700' : 'inactive-class'
                        }
                        >
                        <li><ScrambleText>{link.label}</ScrambleText></li>
                        </NavLink>
                    ))}
                    </ul>

                </div>
            </motion.div>
        </nav>
    </div>
  )
}

export default Navbar