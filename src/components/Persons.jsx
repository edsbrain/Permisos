import React, { useEffect, useState } from "react";
import db from "../fb";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

  

  const transfDate=(objDate)=>{
    let fecha = new Date(objDate.seconds*1000)
    let dato = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
    return dato
  }

  const contDias = (array)=>{
    let diasTotales = 0;
    let dias = {
      goz : 0,
      sub : 0,
    }

    array.forEach((obj)=>{
      diasTotales = diasTotales + obj.dias
    })

    if(diasTotales <= 20 ){
      dias.goz = diasTotales
    }else if(diasTotales > 20){
      dias.goz=20;
      dias.sub = diasTotales-20
    }


    return dias

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
                  

                    <h5>Dias con goze: {contDias(dat.exp).goz}</h5>
                    <h5>Dias de subsidio: {contDias(dat.exp).sub}</h5>
                    <Link to={`/createExp/${dat.id}`}>
                      <button type="button" className="btn btn-warning btn-sm">
                        Agregar Nuevo Expediente
                      </button>
                    </Link>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Numero Expediente</th>
                          <th scope="col">Servicio</th>
                          <th scope="col">Motivo</th>
                          <th scope="col">Fecha inicial</th>
                          <th scope="col">fecha final</th>
                          <th scope="col">cantidad de dias</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dat.exp.map((obj) => {

                          return (
                            <tr key={obj.nroExp}>
                              <td>{obj.nroExp}</td>
                              <td>{obj.selServ}</td>
                              <td>{obj.selMotiv}</td>
                              <td>{transfDate(obj.diaI)}</td>
                              <td>{transfDate(obj.diaF)}</td>
                              <td>{obj.dias}</td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  
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
