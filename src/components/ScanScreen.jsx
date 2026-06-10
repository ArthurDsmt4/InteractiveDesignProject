import { motion } from "motion/react";
import scaleBase from "../assets/scale-base.png";
import butterflyMural from "../assets/ButterflyMural.png"; // Your new brick wall mural!

export default function ScanScreen() {
  return (
    <motion.div
      key="scan-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen-content scan-bg"
    >
      {/* LAYER 1: The real-world mural painting acting as the camera feed background */}
      <img
        src={butterflyMural}
        className="camera-feed-mural"
        alt="Mural Target"
      />

      {/* LAYER 2: Your animated green stencil floating directly on top of the mural */}
      <motion.img
        src={scaleBase}
        className="stencil-silhouette"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
