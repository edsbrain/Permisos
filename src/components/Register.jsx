import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../fb";
import {useNavigate } from "react-router-dom";


  //TODO hacer verificacion de imput
  //TODO hacer boton de Cancelar

function Register() {
  const initialValue = {
    name: "",
    lastName: "",
    phone: "",
    dgoze:0,
    subsid:0,
  };

  const [info, setInfo] = useState(initialValue);
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
      exp:[]
    });
  };


  const savePerson = async () => {
    await addDoc(collection(db, "personas"), info);
    setInfo(initialValue);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card text-center m-3">
        <div className="card-header text-bg-info h3">Agregando Nuevo Trabajador</div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <label  className="col-sm-2 col-form-label">
                Nombre
              </label>
              <div className="col-sm-10">
                <input onChange={(e)=>handleInputChange(e)} type="text" className="form-control" name="name"/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">
                Apellido
              </label>
              <div className="col-sm-10">
                <input onChange={(e)=>handleInputChange(e)} type="text" className="form-control" name="lastName" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">
                Numero
              </label>
              <div className="col-sm-10">
                <input onChange={(e)=>handleInputChange(e)} type="text" className="form-control" name="phone"  />
              </div>
            </div>
            <button onClick={savePerson} type="button" className="btn btn-outline-success">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
