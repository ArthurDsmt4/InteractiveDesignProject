import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ScaleAssembly from "./ScaleAssembly";
import butterflyImg from "../assets/butterfly.png";
import handsOnlyImg from "../assets/HandsOnly.png";
import mermaidTattooImg from "../assets/MermaidTattoo.png";
import anchorTattooImg from "../assets/AnchorTattoo.png";
import oceanOnlyImg from "../assets/OceanOnly.png";

export default function AnimationScreen({ muralId, muralImage }) {
  const [startEffects, setStartEffects] = useState(false);

  // useState tracker to handle which slide/subtitle shows up in the story movie
  const [storyStep, setStoryStep] = useState(1);

  // small delay so the screen settles before the transitions starts
  useEffect(() => {
    const timer = setTimeout(() => setStartEffects(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // The slideshow timeline
  // Using setTimeout chains to automatically advance the steps like a movie
  useEffect(() => {
    if (muralId !== "hands" || !startEffects) return;

    // Step 2: Make the original mural picture split open down the middle
    const t2 = setTimeout(() => setStoryStep(2), 4000);

    // Step 3: Switch to the image with only arms
    const t3 = setTimeout(() => setStoryStep(3), 8000);

    // Step 4: Hide the arms, show just the water image
    const t4 = setTimeout(() => setStoryStep(4), 14000);

    // Step 5: Mermaid tattoo close up appears
    const t5 = setTimeout(() => setStoryStep(5), 18000);

    // Step 6: Anchor tattoo close up appears
    const t6 = setTimeout(() => setStoryStep(6), 24000);

    // Cancels pending step timeouts if the user exists the screen early
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
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
        <div className="movie-stage-viewport">
          {/* Steps 1 and 2: Render the wall image twice, but slice them with CSS clip-paths so they slide apart */}
          {(storyStep === 1 || storyStep === 2) && (
            <div className="cinema-camera-lens">
              <motion.img
                src={muralImage}
                className="split-mural-half left-half-slice"
                animate={{ x: storyStep === 2 ? -45 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.img
                src={muralImage}
                className="split-mural-half right-half-slice"
                animate={{ x: storyStep === 2 ? 45 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          )}

          {/* Step 3: Arms only - Enters from the top, with a mirror loop so they bounce up and down slowly */}
          {storyStep === 3 && (
            <motion.img
              key="hands-only"
              src={handsOnlyImg}
              className="camera-feed-mural focus-display-asset"
              initial={{ opacity: 0, y: -60, scale: 0.95 }}
              animate={{ opacity: 1, y: [-60, 0, -10, 0], scale: 1 }}
              transition={{
                y: {
                  times: [0, 0.2, 0.6, 1],
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
                default: { duration: 0.8 },
              }}
            />
          )}

          {/* Step 4: Water only - Slides in from the left side */}
          {storyStep === 4 && (
            <motion.img
              key="ocean-only"
              src={oceanOnlyImg}
              className="camera-feed-mural focus-display-asset"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: [-80, 0, 8, 0] }}
              transition={{
                x: {
                  times: [0, 0.2, 0.6, 1],
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
                default: { duration: 0.8 },
              }}
            />
          )}

          {/* Step 5: Mermaid tattoo close up, slides in from the right, scales in size back and forth */}
          {storyStep === 5 && (
            <motion.img
              key="mermaid-close"
              src={mermaidTattooImg}
              className="camera-feed-mural focus-display-asset"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, scale: [1, 1.05, 0.98, 1] }}
              transition={{
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                default: { duration: 0.8, type: "spring", stiffness: 90 },
              }}
            />
          )}

          {/* Step 6: Anchor tattoo close up, slides up and then rotates 90 degrees so text reads flat */}
          {storyStep === 6 && (
            <motion.img
              key="anchor-close"
              src={anchorTattooImg}
              className="camera-feed-mural focus-display-asset"
              initial={{ opacity: 0, y: 100, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 90 }}
              transition={{
                rotate: { delay: 1.5, duration: 1.2, ease: "backOut" },
                default: { duration: 0.8, ease: "easeOut" },
              }}
            />
          )}

          {/* CONDITIONALLY RENDERING SUBTITLE TEXT BLOCKS MATCHING THE TIMELINE TRACK */}
          <div className="subtitle-overlay-track">
            {storyStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
              >
                <h3>Right Through My Fingers</h3>
                <p>
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
              >
                <h3>The Hands Splitting</h3>
                <p>
                  The hands are moving together, but split into two sections, to
                  show that while efforts are being made, there is still more
                  work to be done before all humans come together.
                </p>
              </motion.div>
            )}

            {storyStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
              >
                <h3>The Subject</h3>
                <p>
                  Specifically, it is a portrait of my own hands... Images of
                  hands positioned in this manner often represent cleansing,
                  honest, and truthful intentions.
                </p>
              </motion.div>
            )}

            {storyStep === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
              >
                <h3>The Atlantic Connection</h3>
                <p>
                  Photographed on the shores of Miami Beach—across the Atlantic,
                  7,500 kilometers away, we are connected to Denmark by the same
                  body of water.
                </p>
              </motion.div>
            )}

            {storyStep === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card" // Fixed class hook!
              >
                <span className="tattoo-meta-badge">RIGHT ARM</span>
                <h3>The Mermaid Tattoo</h3>
                <p>
                  A nod to Denmark, derived from Danish literature. The mermaid
                  represents an intrinsic human connection to the water,
                  relatable across cultures.
                </p>
              </motion.div>
            )}

            {storyStep === 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="narrative-subtitle-card"
              >
                <span className="tattoo-meta-badge">LEFT ARM</span>
                <h3>The Anchor & Promise</h3>
                <p>
                  First tattooed on sailors who crossed an ocean, it represents
                  commitment. The message 'Love you see you' represents
                  preserving what we have for our children's future.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
