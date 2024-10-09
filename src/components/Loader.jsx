import { motion, spring } from "framer-motion"

function Loader() {
  return (
    <motion.div 
    initial={{display: 'flex'}}
    animate={{display: 'none'}}
    transition={{ delay: 2.5, duration: 3 }}
    className="w-full items-center justify-center h-screen overflow-hidden bg-black">
        <div className="flex flex-col gap-3 relative">
            <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: 100 }}
            transition={{ delay: 2, type:spring, duration: 8 }}
            className="bg-white w-10 h-10 absolute left-[50%] transform translate-x-[-50%] -z-10"
            ></motion.span>
            <motion.span 
            className="uppercase bg-white text-black py-2 px-2 font-semibold text-lg">gibson hazard</motion.span>
            <div className="flex justify-between text-sm font-light">
                <span className="uppercase ">
                    director
                </span>
                <span>
                    01%
                </span>
            </div>
        </div>
    </motion.div>
  )
}

export default Loader