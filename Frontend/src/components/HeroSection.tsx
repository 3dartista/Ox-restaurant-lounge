import video from "../assets/hero.mp4"
import logo from "../assets/logo.png"
import hero from "../assets/hero.jpg"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative flex h-screen items-center justify-center">
      {/* Background video */}
      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
        <video 
          src={video} 
          className="h-full w-full object-cover" 
          muted 
          autoPlay 
          loop 
          playsInline 
          poster={hero}
        ></video>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>

      {/* Foreground content */}
      <div className="relative z-20 flex h-screen flex-col justify-end pb-20">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={logo}
            alt="Ox Restaurant & Lounge"
            className="p-4"   // keep full logo size
          />
          {/* Text directly beneath logo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg tracking-tighter text-white -mt-2"
          >
            Lagos
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
