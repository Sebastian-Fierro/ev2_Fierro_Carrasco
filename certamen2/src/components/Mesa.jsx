import React, { Fragment, useState } from "react";
import { Carta } from "./Carta";
import { AnimatePresence, motion } from "framer-motion";
import "../css/style.css";

export function Mesa() {
  const [manoPoker, setMano] = useState([
    { id: 1, numero: "A", palo: "♦" },
    { id: 2, numero: 2, palo: "♦" },
    { id: 3, numero: 3, palo: "♦" },
    { id: 4, numero: 4, palo: "♦" },
    { id: 5, numero: 5, palo: "♦" },
  ]);

  const eliminarCarta = (id) => {
    setMano((prev) => prev.filter((carta) => carta.id !== id));
  };

  // 👉 Inician ocultas
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="titulo">Mano de Póker</h1>
        <hr />

        <div className="d-flex gap-3 justify-content-center mt-3">

          {/* Botón que muestra cartas con animación */}
          <motion.button
                className="btn btn-primary"
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {isVisible ? "Repartir" : "Repartir"}
            </motion.button>

          <button className="btn btn-primary">Evaluar jugada</button>

        </div>

        <hr />

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <AnimatePresence>
            {isVisible &&
              manoPoker.map((carta, index) => (
                <motion.div
                  key={carta.id}
                  initial={{ opacity: 0, y: -30, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                >
                  <Carta
                    cartaprops={carta}
                    funcionEnviada={() => eliminarCarta(carta.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Fragment>
  );
}
