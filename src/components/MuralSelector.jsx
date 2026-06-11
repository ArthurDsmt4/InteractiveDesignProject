import { motion } from "motion/react";

export default function MuralSelector({ onSelectMural }) {
  // Menu setup
  const murals = [
    { id: "scale", title: "Life on the edge", location: "Frederiksgade 33" },
    {
      id: "hands",
      title: "Right through my fingers",
      location: "Europaplads 10 - Hotel Atlantic",
    },
    {
      id: "placeholder_2",
      title: "???",
      location: "???",
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
            onClick={() => onSelectMural(mural.id)}
          >
            {/* Status for the discoverable murals green/gray - active/inactive */}
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
