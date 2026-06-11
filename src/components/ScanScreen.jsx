import { motion } from "motion/react";
import scaleBase from "../assets/scale-base.png";

export default function ScanScreen({ muralImage, stencilType }) {
  return (
    <motion.div
      key="scan-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen-content scan-bg"
    >
      {/* Background container displaying the live camera simulator frame */}
      <img src={muralImage} className="camera-feed-mural" alt="Mural Target" />

      {/* Stencil overlay */}
      {/* If looking at the butterfly scale mural, show the neon green base of the balance */}
      {stencilType === "silhouette" && (
        <motion.img
          src={scaleBase}
          className="stencil-silhouette"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* If looking at the hands mural, bring up the 4 corners layout frame */}
      {stencilType === "viewfinder" && (
        <motion.div
          className="ar-target-box"
          animate={{ borderColor: ["#00ffcc", "#00ffcc22", "#00ffcc"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="corner-bracket top-left"></div>
          <div className="corner-bracket top-right"></div>
          <div className="corner-bracket bottom-left"></div>
          <div className="corner-bracket bottom-right"></div>
          <span className="scan-indicator-text">HOLD STEADY</span>
        </motion.div>
      )}
    </motion.div>
  );
}
