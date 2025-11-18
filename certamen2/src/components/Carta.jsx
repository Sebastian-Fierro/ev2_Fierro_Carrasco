import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from "framer-motion";
import "../css/style.css";


export function Carta({ cartaprops, funcionEnviada }) {
  return (
    <motion.div
      className="carta"

      whileHover={{ scale: 1.05, rotate: 3 }}

      transition={{ duration: 0.4 }}
    >
      <div className="card-header header-eliminar">
        <button className="btn btn-danger btn-sm" onClick={funcionEnviada}>
          <i className="bi bi-trash"></i>
        </button>
      </div>

      <div className="corner corner-top">
        <span>{cartaprops.numero}</span>
        <span>{cartaprops.palo}</span>
      </div>

      <div className="symbol-center">{cartaprops.palo}</div>

      <div className="corner corner-bottom">
        <span>{cartaprops.numero}</span>
        <span>{cartaprops.palo}</span>
      </div>
    </motion.div>
  );
}