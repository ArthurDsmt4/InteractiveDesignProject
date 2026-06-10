import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ScaleAssembly from "./ScaleAssembly";
import butterflyImg from "../assets/butterfly.png";

export default function AnimationScreen() {
  const [showButterfly, setShowButterfly] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButterfly(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="animation-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen-content interactive-wall"
    >
      <ScaleAssembly />

      {/* 🦋 THE SEPARATED FLYING CONTAINER */}
      {showButterfly && (
        <motion.div
          className="butterfly-flight-path"
          // Framer Motion strictly controls the coordinate position map
          initial={{ x: -160, y: 60, scale: 0.6, rotate: 45, opacity: 0 }}
          animate={{
            x: [-160, -80, 60, -30, 90, -60, 180],
            y: [60, -90, -160, -20, 60, -110, -260],
            scale: [0.6, 0.8, 1.1, 0.7, 0.9, 0.6, 0.4],
            rotate: [45, -20, 65, -45, 90, -15, -45],
            opacity: [0, 1, 1, 1, 1, 1, 1],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
          }}
        >
          {/* CSS strictly controls the independent wing flap graphic inside */}
          <img src={butterflyImg} className="flapping-wings" alt="Butterfly" />
        </motion.div>
      )}
    </motion.div>
  );
}
