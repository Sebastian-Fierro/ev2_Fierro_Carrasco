import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/StyleV2.css";

export function Carta({ cartaprops }) {
  const [volteada, setVolteada] = useState(true); // inicia boca abajo

  return (
    <div 
      className={`flip-card ${volteada ? "volteada" : ""}`}
      onClick={() => setVolteada(!volteada)}
    >
      <div className="flip-inner">

        {/* CARA FRONTAL (carta boca arriba) */}
        <div className="flip-front">
          <div className="carta">
            
            {/* Header con botón eliminar (si lo quieres aquí) */}
            <div className="card-header">
              <button className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </div>

            {/* Esquina superior */}
            <div className="corner corner-top">
              <span>{cartaprops.numero}</span>
              <span>{cartaprops.palo}</span>
            </div>

            {/* Símbolo grande */}
            <div className="symbol-center">
              {cartaprops.palo}
            </div>

            {/* Esquina inferior */}
            <div className="corner corner-bottom">
              <span>{cartaprops.numero}</span>
              <span>{cartaprops.palo}</span>
            </div>

          </div>
        </div>

        {/* CARA TRASERA (dorso) */}
        <div className="flip-back">
        </div>

      </div>
    </div>
  );
}
