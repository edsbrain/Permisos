import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../fb";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import { async } from "@firebase/util";

function CreateExp() {
  let params = useParams();
  let navigate = useNavigate();
  let initialState = {
    nroExp: "",
    selServ: "",
    selMotiv: "",
    nroRes: "",
  };

  let [client, setClient] = useState({});
  let [time, setTime] = useState(new Date());
  let [timeRes, setTimeRes] = useState(new Date());
  let [data, setData] = useState(initialState);
  
  let [servicios, setServicios] = useState({});
  let [motivos, setMotivos] = useState({});

  let dias = 0;
  const calcDays = (obj1, obj2) => {
    let milisegundosDia = 24 * 60 * 60 * 1000;
    let milisegundosTranscurridos = Math.abs(obj1.getTime() - obj2.getTime());
    let diasTranscurridos = Math.round(
      milisegundosTranscurridos / milisegundosDia
    );
    return diasTranscurridos;
  };

  const countDays = () => {
    try {
      if (time.length === 2) {
        dias = calcDays(time[0], time[1]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  countDays();

  const getName = async () => {
    const document = doc(db, "personas", params.id);
    const docSnap = await getDoc(document);
    const objPerson = docSnap.data();
    setClient(objPerson);
  };

  const getServicios = async () => {
    const docRef = doc(db, "varios", "servicios");
    const docSnap = await getDoc(docRef);
    setServicios(docSnap.data());
  };

  const addService = async () => {
    navigate("/createServ");
  };
  const addMotivo = async () => {
    navigate("/createMotiv");
  };

  const getMotivos = async () => {
    const docRef = doc(db, "varios", "motivos");
    const docSnap = await getDoc(docRef);
    setMotivos(docSnap.data());
  };

  const closeExp = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const saveExp = async() => {
    data.dias=dias
    data.diaI = time[0]
    data.diaF = time[1]
    data.fecha= timeRes
    data.year=timeRes.getFullYear()

   const docRef = doc(db,"personas",params.id)
   await updateDoc(docRef,{
    exp:arrayUnion(data)
   })

  
    navigate("/");
  };

  useEffect(() => {
    getName();
    getServicios();
    getMotivos();
  }, []);

  return (
    <div className="container mt-3 ">
      <div className="card">
        <h5 className="card-header text-bg-info h3">
          Agregando nuevo expediente : {client.name + " " + client.lastName}
        </h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Numero de Expediente</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa numero expediente"
              name="nroExp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Servicio</label>
            <div className="input-group mb-3">
              <select
                onChange={(e) => handleChange(e)}
                className="form-select"
                aria-label="Default select example"
                name="selServ"
              >
                <option selected disabled>
                  Seleccionar servicio
                </option>
                {servicios.serv &&
                  servicios.serv.map((service) => {
                    return (
                      <option
                        key={servicios.serv.indexOf(service)}
                        value={service}
                      >
                        {service}
                      </option>
                    );
                  })}
              </select>
              <button
                className="btn btn-outline-warning "
                type="button"
                onClick={addService}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Motivo</label>
            <div className="input-group mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="selMotiv"
                onChange={(e) => handleChange(e)}
              >
                <option selected disabled>
                  Seleccionar Motivo
                </option>
                {motivos.motiv &&
                  motivos.motiv.map((motives) => {
                    return (
                      <option
                        key={motivos.motiv.indexOf(motives)}
                        value={motives}
                      >
                        {motives}
                      </option>
                    );
                  })}
              </select>
              <button
                className="btn btn-outline-warning"
                type="button"
                onClick={addMotivo}
              >
                +
              </button>
            </div>
          </div>
          
          <hr />
          <div className="mb-3 row">
            <label className="form-label">Periodo</label>
            <div className="col-6">
              <label className="col-12 mb-0">Seleccionar Rango</label>
              <DatePicker
                locale="es-ES"
                selectRange={true}
                returnValue="range"
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
                clearIcon={null}
                format="dd-MM-y"
                onChange={setTime}
                value={time}
              />
            </div>
            <div className="col-6">
              <label className="col-12">Cantidad de dias Seleccionados</label>
              <fieldset disabled>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${dias} dias`}
                  name="diasCount"
                  onChange={(e) => handleChange(e)}
                />
              </fieldset>
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <label className="form-label">Numero de Resolucion</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa numero de resolucion"
              name="nroRes"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <hr />
          <div className="mb-3">
            <label className="form-label col-6">Fecha de Resolucion</label>
            <DatePicker
              className="col-6"
              locale="es-ES"
              returnValue="start"
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              clearIcon={null}
              format="dd-MM-y"
              onChange={setTimeRes}
              value={timeRes}
            />
          </div>

          <div className="row p-2">
            <button
              onClick={closeExp}
              type="button"
              className="btn btn-danger col-5 "
            >
              Cancelar
            </button>
            <div className="col-2"></div>
            <button
              onClick={saveExp}
              type="button"
              className="btn btn-success col-5 "
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateExp;
