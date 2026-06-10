import { motion } from "motion/react";

export default function MuralSelector({ onSelectMural }) {
  // Array array array matrix list for the menu setup. Slot 1 and 2 open screens, 3 is just filler text.
  const murals = [
    { id: "scale", title: "The Cosmic Scale", location: "North Wall - Lane 4" },
    {
      id: "hands",
      title: "Right Through My Fingers",
      location: "East Wing Facade",
    }, // active target link
    {
      id: "placeholder_2",
      title: "Mural Discovery C",
      location: "Main Plaza Archway",
    },
  ];

  return (
    <motion.div
      key="mural-hub"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="hub-layout"
    >
      <div className="hub-intro">
        <h2>Select Your Mural</h2>
        <p>
          Stand directly in front of the artwork and select your matching target
          below:
        </p>
      </div>

      <div className="mural-grid">
        {murals.map((mural) => (
          <motion.button
            key={mural.id}
            className="mural-card-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMural(mural.id)} // Fires selection function up to parent state container
          >
            {/* Status dot turns gray for placeholder strings using conditional inline styling checks */}
            <div
              className="card-status-dot"
              style={{
                background: mural.id.startsWith("placeholder")
                  ? "#64748b"
                  : "#00ffcc",
                boxShadow: mural.id.startsWith("placeholder")
                  ? "none"
                  : "0 0 8px #00ffcc",
              }}
            ></div>
            <div className="card-info">
              <h3>{mural.title}</h3>
              <span>{mural.location}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
