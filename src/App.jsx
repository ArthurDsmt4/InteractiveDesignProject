import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MuralSelector from "./components/MuralSelector";
import ScanScreen from "./components/ScanScreen";
import AnimationScreen from "./components/AnimationScreen";
import "./App.css";

export default function App() {
  // Application State flow Tracker: "HUB" -> "SCAN" -> "ANIMATION"
  const [appState, setAppState] = useState("HUB");
  const [selectedMuralId, setSelectedMuralId] = useState(null);

  // Triggered when a card button inside MuralSelector is pushed
  const handleMuralSelection = (muralId) => {
    setSelectedMuralId(muralId);

    if (muralId === "scale") {
      setAppState("SCAN"); // Proceeds to your working scale workflow!
    } else {
      // Alert system for your placeholders until your group cuts their graphics
      alert(
        `You selected a placeholder slot (${muralId}). Drop your next graphic asset workflow here later!`,
      );
    }
  };

  return (
    <main className="stage">
      <div className="app-container">
        {/* DYNAMIC HEADER STRIP */}
        <header className="app-header">
          <h1>Living Walls</h1>
          <p>
            {appState === "HUB" && "AR Installation Navigator"}
            {appState === "SCAN" && "Align the scale inside the stencil"}
            {appState === "ANIMATION" &&
              "Mural Unlocked! Enjoy the living artwork."}
          </p>
        </header>

        {/* INTERACTIVE VIEWPORT VIEWBOX */}
        <div className="viewview-box viewscreen">
          <AnimatePresence mode="wait">
            {appState === "HUB" && (
              <MuralSelector key="hub" onSelectMural={handleMuralSelection} />
            )}

            {appState === "SCAN" && <ScanScreen key="scan" />}

            {appState === "ANIMATION" && <AnimationScreen key="animation" />}
          </AnimatePresence>
        </div>

        {/* CONDITIONAL BACK / TRIGGER ACTION FOOTER BUTTONS */}
        {appState !== "HUB" && (
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {/* 1. LEFT BUTTON: Always lets you retreat safely to the Hub selection menu */}
            <motion.button
              className="action-button btn-reset"
              style={{ margin: 0, background: "#334155", color: "#f8fafc" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAppState("HUB")}
            >
              ← MENU
            </motion.button>

            {/* 2. RIGHT BUTTON: Forwards you to the next phase of the experience */}
            <motion.button
              className="action-button"
              style={{ margin: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (appState === "SCAN") {
                  setAppState("ANIMATION"); // Enters the mechanical loop screen!
                } else {
                  setAppState("SCAN"); // Resets back to stencil mode if clicked on screen 3
                }
              }}
            >
              {appState === "SCAN" ? "MATCH PHOTO" : "RESET ALIGN"}
            </motion.button>
          </div>
        )}
      </div>
    </main>
  );
}
