import { motion } from "motion/react";

export default function MuralSelector({ onSelectMural }) {
  // A clean data array representing the options your group is designing
  const murals = [
    { id: "scale", title: "The Cosmic Scale", location: "North Wall - Lane 4" },
    {
      id: "placeholder_1",
      title: "Mural Discovery B",
      location: "East Wing Corridor",
    },
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
          Stand directly in front of the wall art artwork and select your match
          target below:
        </p>
      </div>

      <div className="mural-grid">
        {murals.map((mural) => (
          <motion.button
            key={mural.id}
            className="mural-card-button"
            whileHover={{ scale: 1.02, borderColor: "#00ffcc" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMural(mural.id)}
          >
            <div className="card-status-dot"></div>
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
