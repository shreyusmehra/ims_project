import { motion } from "framer-motion";

const StatItem = ({ count, title, icon, color, bcg, position }) => {
  return (
    <motion.div
      animate={{ x: [position, 0], opacity: 1 }}
      transition={{
        delay: 2,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 2 },
      }}
      style={{
        color: color,
        backgroundColor: bcg,
        minWidth: 300,
        minHeight: 60,
        textAlign: "center",
        borderRadius: "10px",
        margin: "10px 0px 10px 0px",
      }}
    >
      <div>
        <span>{count}</span>
        <span>{icon}</span>
      </div>
      <h3 style={{ textTransform: "capitalize" }}>{title} Products</h3>
    </motion.div>
  );
};
export default StatItem;
