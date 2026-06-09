import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

export default function App() {
  // State 1: "SCAN" (Stencil overlay view)
  // State 2: "ANIMATION" (The living mural payoff view)
  const [appState, setAppState] = useState("SCAN");

  return (
    <main className="stage">
      <div className="app-container">
        <header className="app-header">
          <h1>Living Walls</h1>
          <p>
            {appState === "SCAN"
              ? "Align the graffiti inside the stencil"
              : "Mural Unlocked! Tap elements to interact."}
          </p>
        </header>

        {/* The screen view area */}
        <div className="viewscreen">
          <AnimatePresence mode="wait">
            {appState === "SCAN" ? (
              /* SCREEN 1: SCANNER STENCIL OVERLAY */
              <motion.div
                key="scan-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="screen-content scan-bg"
              >
                {/* Glowing neon alignment guide using Motion */}
                <motion.div
                  className="stencil-shape"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="skateboard-stencil" />
              </motion.div>
            ) : (
              /* SCREEN 2: LIVING ANIMATED PAYOFF */
              <motion.div
                key="animation-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="screen-content mural-bg"
              >
                {/* LAYER 1: The Graffiti Character (Draggable & Interactive!) */}
                <motion.div
                  className="mural-character"
                  drag
                  dragConstraints={{
                    left: -30,
                    right: 30,
                    top: -20,
                    bottom: 20,
                  }}
                  whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                />

                {/* LAYER 2: The Skateboard (Reacts separately to touch/hover!) */}
                <motion.div
                  className="mural-skateboard"
                  whileHover={{ rotate: 3 }}
                  whileTap={{ scale: 0.9, y: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button that switches our React state */}
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
