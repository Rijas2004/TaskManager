import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import classes from "./Modal.module.css";

export default function Modal({ onClose, children }) {
  return createPortal(
    <>
      <motion.div className={classes.backdrop} onClick={onClose}  />
      <motion.dialog
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        open
        className={classes.modal}
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
