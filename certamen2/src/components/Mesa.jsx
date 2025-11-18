import React, { Fragment, useState } from "react";
import { Carta } from "./Carta";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../css/style.css";

export function Mesa() {
  const [jugadaCarioca, setJugada] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [numeroInput, setNumeroInput] = useState("");
  const [paloInput, setPaloInput] = useState("♦");
  const [evaluacion, setEvaluacion] = useState(null);

  const eliminarCarta = (id) => {
    setJugada((prev) => prev.filter((carta) => carta.id !== id));
  };

  const agregarCarta = () => {
    if (jugadaCarioca.length >= 12) {
      setEvaluacion("No se pueden agregar más de 12 cartas");
      return;
    }

    const numero = numeroInput.toString().trim();
    const palo = paloInput;
    if (!numero) return alert("Ingrese el número de la carta.");

    const nueva = { id: nextId, numero, palo };
    setJugada((prev) => [...prev, nueva]);
    setNextId((v) => v + 1);
    setNumeroInput("");
    setEvaluacion(null);
  };

  const evaluarCuatroTrios = () => {
    // Validación mínima: deben ser 12 cartas
    if (jugadaCarioca.length < 12) {
      setEvaluacion("La jugada no es válida: menos de 12 cartas");
      return false;
    }

    // Contar cuantos tríos se pueden formar por número
    const counts = {};
    jugadaCarioca.forEach((c) => {
      const n = c.numero.toString();
      counts[n] = (counts[n] || 0) + 1;
    });

    let trios = 0;
    Object.values(counts).forEach((c) => {
      trios += Math.floor(c / 3);
    });

    const esCuatroTrios = trios >= 4;
    const mensaje = esCuatroTrios ? "FORMA JUEGO :)" : "NO FORMA JUEGO :C";
    setEvaluacion(mensaje);

    if (esCuatroTrios) {
      // Subir a Firestore
      (async () => {
        try {
          await addDoc(collection(db, "jugadascarioca"), {
            jugada: jugadaCarioca,
          });
          setEvaluacion("Jugada válida subida a la base de datos.");
        } catch (error) {
          console.error("Error subiendo jugada:", error);
          setEvaluacion("Error al subir la jugada. Ver consola.");
        }
      })();
    }

    return esCuatroTrios;
  };

  const borrarTodas = () => {
    if (jugadaCarioca.length === 0) {
      setEvaluacion("No hay cartas para borrar.");
      return;
    }
    setJugada([]);
    setNextId(1);
    setEvaluacion("Mesa vaciada.");
  };

  const [isVisible] = useState(true);

  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="titulo">Jugada carioca</h1>
        <hr />

        <div className="d-flex gap-3 justify-content-center mt-3">
          <div className="d-flex gap-2 align-items-center">
            <input
              className="form-control"
              style={{ width: 120 }}
              placeholder="Número (A,2..K)"
              value={numeroInput}
              onChange={(e) => setNumeroInput(e.target.value)}
            />

            <select
              className="form-select"
              style={{ width: 100 }}
              value={paloInput}
              onChange={(e) => setPaloInput(e.target.value)}
            >
              <option value="♦">♦</option>
              <option value="♥">♥</option>
              <option value="♣">♣</option>
              <option value="♠">♠</option>
            </select>

            <button className="btn btn-success" onClick={agregarCarta}>
              Agregar
            </button>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              evaluarCuatroTrios();
            }}
          >
            Evaluar jugada
          </button>
          <button className="btn btn-danger" onClick={borrarTodas}>
            Borrar todo
          </button>
        </div>

        <hr />

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <AnimatePresence>
            {isVisible &&
              jugadaCarioca.map((carta, index) => (
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
        <div className="text-center mt-3">
          {evaluacion && (
            <div className="alert alert-info" role="alert">
              {evaluacion}
            </div>
          )}
          <div>
            <strong>Cartas en mesa:</strong> {jugadaCarioca.length}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
