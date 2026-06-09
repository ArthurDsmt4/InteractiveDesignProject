import { useState } from "react";
// RACE taught us to import motion from 'motion/react'
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

// IMPORT YOUR PIECES
import scaleBase from "./assets/scale-base.png";
import scaleCrossbar from "./assets/horizontal-bar.png";
import leftBasket from "./assets/left-basket.png";
import rightBasket from "./assets/right-basket.png";

export default function App() {
  // "SCAN" = camera stencil screen | "ANIMATION" = continuous cinematic loop screen
  const [appState, setAppState] = useState("SCAN");

  return (
    <main className="stage">
      <div className="app-container">
        {/* HEADER SECTION */}
        <header className="app-header">
          <h1>Living Walls</h1>
          <p>
            {appState === "SCAN"
              ? "Align the scale inside the stencil"
              : "Mural Unlocked! Enjoy the living artwork."}
          </p>
        </header>

        {/* VIEWPORT BOX */}
        <div className="viewscreen">
          <AnimatePresence mode="wait">
            {appState === "SCAN" ? (
              /* ====== SCREEN 1: CAMERA SCAN STATE ====== */
              <motion.div
                key="scan-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="screen-content scan-bg"
              >
                {/* Neon alignment silhouette guide */}
                <motion.img
                  src={scaleBase}
                  className="stencil-silhouette"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ) : (
              /* ====== SCREEN 2: AUTOMATIC CINEMATIC LOOP ====== */
              <motion.div
                key="animation-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="screen-content interactive-wall"
              >
                <div className="scale-assembly">
                  {/* LAYER 1: THE STATIONARY VERTICAL PILLAR */}
                  <img
                    src={scaleBase}
                    className="layer-base-pillar"
                    alt="Scale Pillar"
                  />

                  {/* LAYER 2: THE AUTOMATIC SEESAW CROSSBAR */}
                  {/* We use an array [-4, 6, -4] to make the bar constantly tilt on its own forever */}
                  <motion.div
                    className="layer-crossbar-wrapper"
                    style={{ backgroundImage: `url(${scaleCrossbar})` }}
                    animate={{ rotate: [-4, 6, -4] }}
                    transition={{
                      repeat: Infinity, // Continuous loop
                      duration: 4, // Takes 4 seconds per complete cycle (slow & graceful)
                      ease: "easeInOut", // Smooth braking curves at the tips
                    }}
                  >
                    {/* LAYER 3: LEFT BASKET (Nested child element) */}
                    <motion.img
                      src={leftBasket}
                      className="nested-basket-left"
                      // Counter-rotation array mirrors the crossbar exactly in reverse [4, -6, 4]
                      // This keeps the wires vertical while the main frame swings!
                      animate={{ rotate: [4, -6, 4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    />

                    {/* LAYER 4: RIGHT BASKET (Nested child element) */}
                    <motion.img
                      src={rightBasket}
                      className="nested-basket-right"
                      // Counter-rotation array
                      animate={{ rotate: [4, -6, 4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM TOGGLE BUTTON */}
        <motion.button
          className={`action-button ${appState === "ANIMATION" ? "btn-reset" : ""}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            setAppState(appState === "SCAN" ? "ANIMATION" : "SCAN")
          }
        >
          {appState === "SCAN" ? "TRIGGER PHOTO MATCH" : "RESET APP"}
        </motion.button>
      </div>
    </main>
  );
}
