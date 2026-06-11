import { motion } from "motion/react";
import scaleBase from "../assets/scale-base.png";
import scaleCrossbar from "../assets/horizontal-bar.png";
import leftBasket from "../assets/left-basket.png";
import rightBasket from "../assets/right-basket.png";

// This handles the infinity looping rotation for the scale.
// The child baskets counter rotate against the parent wrapper so they don't tilt sideways.

export default function ScaleAssembly() {
  return (
    <div className="scale-assembly">
      <img src={scaleBase} className="layer-base-pillar" alt="Scale Pillar" />

      <motion.div
        className="layer-crossbar-wrapper"
        style={{ backgroundImage: `url(${scaleCrossbar})` }}
        animate={{ rotate: [-4, 6, -4] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={leftBasket}
          className="nested-basket-left"
          animate={{ rotate: [4, -6, 4] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src={rightBasket}
          className="nested-basket-right"
          animate={{ rotate: [4, -6, 4] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
