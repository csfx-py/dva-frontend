import { AcUnit } from "@mui/icons-material";
import { motion } from "framer-motion";

import "../loading.css";

function Loading() {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <AcUnit
        component={motion.svg}
        sx={{ fontSize: 100 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="spin"
        color="info"
      />
    </motion.div>
  );
}

export default Loading;
