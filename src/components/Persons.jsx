import React, { useEffect, useState } from "react";
import db from "../fb";

import { arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";


function Persons() {
  const [data, setData] = useState([]);

  function getPersons() {
    const personCol = onSnapshot(collection(db, "personas"), (doc) => {
      const dato = [];
      doc.forEach((dat) => {
        dato.push({ ...dat.data(), id: dat.id });
      });
      setData(dato);
      
    });
  }

  

  

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div className="container ">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        {data.length === 0 ? (
          <button className="btn btn-dark m-5" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando Trabajadores...
          </button>
        ) : (
          data.map((dat) => {
            return (
              <div className="accordion-item" key={dat.id}>
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panel-${dat.id}`}
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    {`${dat.name} ${dat.lastName} ( ${dat.phone} )`}
                  </button>
                
                </h2>
                <div
                  id={`panel-${dat.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">
                  <Link to={`/createExp/${dat.id}`}>
                  <button  type="button" className="btn btn-warning btn-sm">Agregar Nuevo Expediente</button>
                  </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Persons;
