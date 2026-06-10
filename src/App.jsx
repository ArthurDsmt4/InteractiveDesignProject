import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MuralSelector from "./components/MuralSelector";
import ScanScreen from "./components/ScanScreen";
import AnimationScreen from "./components/AnimationScreen";
import "./App.css";

// Importing the assets so Vite links our local image library files smoothly
import butterflyMural from "./assets/ButterflyMural.png";
import handsMural from "./assets/HandsMural.png";
import handsMuralFar from "./assets/HandsMuralFar.png";

export default function App() {
  // App state variables: 'HUB' (Main Grid), 'SCAN' (Viewfinder Mode), 'ANIMATION' (Exhibition Slide Deck)
  const [appState, setAppState] = useState("HUB");
  const [selectedMuralId, setSelectedMuralId] = useState(null);

  // Configuration mapping table setup to swap image props depending on selection index
  const muralConfig = {
    scale: {
      scanImage: butterflyMural,
      animationImage: butterflyMural,
      stencilType: "silhouette",
    },
    hands: {
      scanImage: handsMuralFar, // Far shot for scanning mode
      animationImage: handsMural, // Close up crop for the story mode
      stencilType: "viewfinder",
    },
  };

  const handleMuralSelection = (muralId) => {
    if (muralConfig[muralId]) {
      setSelectedMuralId(muralId);
      setAppState("SCAN");
    } else {
      alert(`You selected a placeholder slot (${muralId}).`);
    }
  };

  return (
    <main className="stage">
      <div className="app-container">
        {/* Dynamic header tracker changes sub-copy depending on which step index is current */}
        <header className="app-header">
          <h1>Living Walls</h1>
          <p>
            {appState === "HUB" && "AR Installation Navigator"}
            {appState === "SCAN" &&
              (selectedMuralId === "hands"
                ? "Center the camera view over the hands"
                : "Align the scale inside the stencil")}
            {appState === "ANIMATION" &&
              "Mural Unlocked! Enjoy the living artwork."}
          </p>
        </header>

        {/* Viewport container box wrapper framework */}
        <div className="viewview-box viewscreen">
          <AnimatePresence mode="wait">
            {appState === "HUB" && (
              <MuralSelector key="hub" onSelectMural={handleMuralSelection} />
            )}
            {appState === "SCAN" && (
              <ScanScreen
                key="scan"
                muralImage={muralConfig[selectedMuralId].scanImage}
                stencilType={muralConfig[selectedMuralId].stencilType}
              />
            )}
            {appState === "ANIMATION" && (
              <AnimationScreen
                key="animation"
                muralId={selectedMuralId}
                muralImage={muralConfig[selectedMuralId].animationImage}
              />
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER BUTTON CODES: Swaps view states back and forth */}
        {appState !== "HUB" && (
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <motion.button
              className="action-button btn-reset"
              style={{ margin: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAppState("HUB")}
            >
              ← MENU
            </motion.button>

            <motion.button
              className="action-button"
              style={{ margin: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setAppState(appState === "SCAN" ? "ANIMATION" : "SCAN")
              }
            >
              {appState === "SCAN" ? "MATCH PHOTO" : "RESET ALIGN"}
            </motion.button>
          </div>
        )}
      </div>
    </main>
  );
}
