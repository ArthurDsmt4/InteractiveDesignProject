import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ScaleAssembly from "./ScaleAssembly";
import butterflyImg from "../assets/butterfly.png";
import handsOnlyImg from "../assets/HandsOnly.png";
import mermaidTattooImg from "../assets/MermaidTattoo.png";
import anchorTattooImg from "../assets/AnchorTattoo.png";
import oceanOnlyImg from "../assets/OceanOnly.png";

// Import the far perspective view
import handsMuralFar from "../assets/HandsMuralFar.png";

export default function AnimationScreen({ muralId, muralImage }) {
  const [startEffects, setStartEffects] = useState(false);

  // useState tracker to handle which slide/subtitle shows up in the story movie
  const [storyStep, setStoryStep] = useState(1);

  // Gamification states: Unlocks the quiz box and saves which button they click
  const [quizUnlocked, setQuizUnlocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // small delay so the screen settles before the transitions starts
  useEffect(() => {
    const timer = setTimeout(() => setStartEffects(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // The slideshow timeline
  useEffect(() => {
    if (muralId !== "hands" || !startEffects) return;

    const t2 = setTimeout(() => setStoryStep(2), 3000);
    const t3 = setTimeout(() => setStoryStep(3), 6000);
    const t4 = setTimeout(() => setStoryStep(4), 9000);
    const t5 = setTimeout(() => setStoryStep(5), 12000);
    const t6 = setTimeout(() => setStoryStep(6), 15000);
    const tQuiz = setTimeout(() => setQuizUnlocked(true), 18000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tQuiz);
    };
  }, [muralId, startEffects]);

  return (
    <motion.div
      key="animation-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen-content interactive-wall"
    >
      {/* Mural 1: Scale/balance */}
      {muralId === "scale" && (
        <>
          <motion.img
            src={muralImage}
            className="camera-feed-mural"
            alt="Canvas"
            initial={{ scale: 1.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <ScaleAssembly />
          {startEffects && (
            <motion.div
              className="butterfly-flight-path"
              initial={{ x: -160, y: 60, scale: 0.6, rotate: 45, opacity: 0 }}
              animate={{
                x: [-160, -80, 60, -30, 90, -60, 180],
                y: [60, -90, -160, -20, 60, -110, -260],
                scale: [0.6, 0.8, 1.1, 0.7, 0.9, 0.6, 0.4],
                rotate: [45, -20, 65, -45, 90, -15, -45],
                opacity: [0, 1, 1, 1, 1, 1, 1],
              }}
              transition={{ duration: 15, ease: "easeInOut" }}
            >
              <img
                src={butterflyImg}
                className="flapping-wings"
                alt="Butterfly"
              />
            </motion.div>
          )}
        </>
      )}

      {/* Mural 2: Right through my fingers */}
      {muralId === "hands" && (
        <div
          className="movie-stage-viewport"
          style={{ position: "relative", background: "#ffffff" }}
        >
          {/* Background white layout box behind everything */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#ffffff",
              zIndex: 0,
            }}
          />

          {/* 🏢 PERMANENT BUILDING ENVIRONMENT FRAME LAYER */}
          <div
            className="cinema-camera-lens"
            style={{
              zIndex: 5,
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {/* 🔒 STATIC BACKGROUND FRAME LAYER */}
            <img
              src={handsMuralFar}
              className="camera-feed-mural"
              alt="Static Building Frame"
              style={{
                objectFit: "contain",
                zIndex: 1,
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%, 0% 75%, 100% 75%, 100% 100%, 0% 100%)",
              }}
            />

            {/* ✂️ LEFT MOVING MURAL PIECE */}
            <motion.img
              src={handsMuralFar}
              className="split-mural-half"
              style={{
                objectFit: "contain",
                zIndex: 2,
                clipPath: "polygon(0% 30%, 50% 30%, 50% 75%, 0% 75%)",
              }}
              animate={{ x: storyStep >= 2 ? -60 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* ✂️ RIGHT MOVING MURAL PIECE */}
            <motion.img
              src={handsMuralFar}
              className="split-mural-half"
              style={{
                objectFit: "contain",
                zIndex: 2,
                clipPath: "polygon(50% 30%, 100% 30%, 100% 75%, 50% 75%)",
              }}
              animate={{ x: storyStep >= 2 ? 60 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* 👐 STEP 3: HANDS ONLY */}
          {storyStep === 3 && (
            <motion.img
              key="hands-only"
              src={handsOnlyImg}
              className="camera-feed-mural focus-display-asset"
              style={{
                zIndex: 3,
                objectFit: "contain",
                mixBlendMode: "darken", // ✨ SWAPPED TO DARKEN TO FILTER OUT OPAQUE GRAY VALUE CHANNELS
                filter: "contrast(1.1)", // Boosts white ceiling threshold values to clear edges
                clipPath: "polygon(0% 30%, 100% 30%, 100% 75%, 0% 75%)",
              }}
              initial={{ opacity: 0, y: 120, scale: 0.55 }}
              animate={{
                opacity: 1,
                y: [0, -6, 2, -4, 0],
                scale: 0.55,
              }}
              transition={{
                y: {
                  times: [0, 0.2, 0.6, 1],
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
                default: { duration: 1.2, ease: "easeOut" },
              }}
            />
          )}

          {/* 🌊 STEP 4: WATER ONLY */}
          {storyStep === 4 && (
            <motion.img
              key="ocean-only"
              src={oceanOnlyImg}
              className="camera-feed-mural focus-display-asset"
              style={{
                zIndex: 3,
                objectFit: "contain",
                mixBlendMode: "darken", // ✨ SWAPPED TO DARKEN
                filter: "contrast(1.1)",
                clipPath: "polygon(0% 30%, 100% 30%, 100% 75%, 0% 75%)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
            />
          )}

          {/* 🧜‍♀️ STEP 5: MERMAID TATTOO */}
          {storyStep === 5 && (
            <motion.img
              key="mermaid-close"
              src={mermaidTattooImg}
              className="camera-feed-mural focus-display-asset"
              style={{
                zIndex: 3,
                objectFit: "contain",
                mixBlendMode: "darken", // ✨ SWAPPED TO DARKEN
                filter: "contrast(1.1)",
                clipPath: "polygon(0% 30%, 100% 30%, 100% 75%, 0% 75%)",
              }}
              initial={{ opacity: 0, x: 120, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 0.85 }}
              transition={{ duration: 1.2, ease: "backOut" }}
            />
          )}

          {/* ⚓ STEP 6: ANCHOR TATTOO */}
          {storyStep === 6 && (
            <motion.img
              key="anchor-close"
              src={anchorTattooImg}
              className="camera-feed-mural focus-display-asset"
              style={{
                zIndex: 3,
                objectFit: "contain",
                mixBlendMode: "darken", // ✨ SWAPPED TO DARKEN
                filter: "contrast(1.1)",
                clipPath: "polygon(0% 30%, 100% 30%, 100% 75%, 0% 75%)",
              }}
              initial={{ opacity: 0, y: 140, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotate: 90, scale: 0.85 }}
              transition={{
                rotate: { delay: 0.6, duration: 1.2, ease: "backOut" },
                default: { duration: 1.0, ease: "easeOut" },
              }}
            />
          )}

          {/* 💬 SUBTITLES TRACK LAYER */}
          <div
            className="subtitle-overlay-track"
            style={{ zIndex: 10, bottom: "8px" }}
          >
            {storyStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
                style={{ padding: "8px 12px" }}
              >
                <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                  Right Through My Fingers
                </h3>
                <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                  This image shows a set of hands outstretched, submerged in
                  ocean waters.
                </p>
              </motion.div>
            )}

            {storyStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card dynamic-alert-border"
                style={{ padding: "8px 12px" }}
              >
                <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                  The Hands Splitting
                </h3>
                <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                  The hands split to show that more work must be done before all
                  humans come together.
                </p>
              </motion.div>
            )}

            {storyStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
                style={{ padding: "8px 12px" }}
              >
                <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                  The Subject
                </h3>
                <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                  Specifically, it is a portrait of my own hands... representing
                  cleansing, honest, and truthful intentions.
                </p>
              </motion.div>
            )}

            {storyStep === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
                style={{ padding: "8px 12px" }}
              >
                <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                  The Atlantic Connection
                </h3>
                <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                  Photographed on the shores of Miami Beach—across the Atlantic,
                  7,500 kilometers away from Denmark.
                </p>
              </motion.div>
            )}

            {storyStep === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
                style={{ padding: "8px 12px" }}
              >
                <span
                  className="tattoo-meta-badge"
                  style={{ marginBottom: "4px", padding: "1px 4px" }}
                >
                  RIGHT ARM
                </span>
                <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                  The Mermaid Tattoo
                </h3>
                <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                  A nod to Denmark, representing an intrinsic human connection
                  to the water across cultures.
                </p>
              </motion.div>
            )}

            {storyStep === 6 && (
              <>
                {!quizUnlocked ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="narrative-subtitle-card"
                    style={{ padding: "8px 12px" }}
                  >
                    <span
                      className="tattoo-meta-badge"
                      style={{ marginBottom: "4px", padding: "1px 4px" }}
                    >
                      LEFT ARM
                    </span>
                    <h3 style={{ fontSize: "0.85rem", marginBottom: "2px" }}>
                      The Anchor & Promise
                    </h3>
                    <p style={{ fontSize: "0.68rem", lineHeight: "1.3" }}>
                      First tattooed on sailors who crossed an ocean, it
                      represents commitment to preserving our children's future.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="narrative-subtitle-card dynamic-alert-border"
                    style={{ padding: "10px 12px" }}
                  >
                    <h3 style={{ fontSize: "0.88rem", marginBottom: "2px" }}>
                      SDG Guessing Game
                    </h3>
                    <p style={{ marginBottom: "8px", fontSize: "0.68rem" }}>
                      Which SDG does this mural protect?
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <button
                        onClick={() => setSelectedAnswer("wrong-6")}
                        style={{
                          background:
                            selectedAnswer === "wrong-6"
                              ? "#ff007f"
                              : "#1e293b",
                          color: "#fff",
                          border: "1px solid #334155",
                          padding: "6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.7rem",
                        }}
                      >
                        SDG 6: Clean Water & Sanitation
                      </button>
                      <button
                        onClick={() => setSelectedAnswer("wrong-13")}
                        style={{
                          background:
                            selectedAnswer === "wrong-13"
                              ? "#ff007f"
                              : "#1e293b",
                          color: "#fff",
                          border: "1px solid #334155",
                          padding: "6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.7rem",
                        }}
                      >
                        SDG 13: Climate Action
                      </button>
                      <button
                        onClick={() => setSelectedAnswer("correct")}
                        style={{
                          background:
                            selectedAnswer === "correct"
                              ? "#00ffcc"
                              : "#1e293b",
                          color:
                            selectedAnswer === "correct" ? "#08111f" : "#fff",
                          border: "1px solid #334155",
                          padding: "6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.7rem",
                          fontWeight:
                            selectedAnswer === "correct" ? "bold" : "normal",
                        }}
                      >
                        SDG 14: Life Below Water
                      </button>
                      <button
                        onClick={() => setSelectedAnswer("wrong-17")}
                        style={{
                          background:
                            selectedAnswer === "wrong-17"
                              ? "#ff007f"
                              : "#1e293b",
                          color: "#fff",
                          border: "1px solid #334155",
                          padding: "6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.7rem",
                        }}
                      >
                        SDG 17: Partnerships for the Goals
                      </button>
                    </div>

                    {selectedAnswer && selectedAnswer !== "correct" && (
                      <p
                        style={{
                          color: "#ff007f",
                          fontSize: "0.65rem",
                          marginTop: "6px",
                          marginBottom: 0,
                        }}
                      >
                        Hint: Think about the sea water connecting Miami Beach
                        to Denmark! Try again!
                      </p>
                    )}

                    {selectedAnswer === "correct" && (
                      <p
                        style={{
                          color: "#00ffcc",
                          fontSize: "0.65rem",
                          marginTop: "6px",
                          marginBottom: 0,
                        }}
                      >
                        CORRECT! You unlocked the Marine Protection Stamp for
                        your collection gallery!
                      </p>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
