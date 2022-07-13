import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../fb";


function CreateMot() {
    const navigate=useNavigate()
    const close =()=>{
        navigate(-1)
    }
    const [value , setValue]=useState("")

    const handleInput =(e)=>{
        setValue(e.target.value)
    }

    const saveChange=async()=>{
        let docRef = doc(db,"varios","motivos");
        await updateDoc(docRef,{
            motiv : arrayUnion(value)
        })
        navigate(-1)
    }
  return (
    <div className="container">
      <div className="card text-center m-3">
        <div className="card-header text-bg-warning h3">
          Creacion de Nuevo Motivo
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Motivo</label>
              <div className="col-sm-10">
                <input onChange={(e)=>handleInput(e)} type="text" className="form-control" name="name" />
              </div>
            </div>

            <button onClick={close} type="button" className="btn btn-outline-danger m-3">
              cancelar
            </button>
            <button onClick={saveChange} type="button" className="btn btn-outline-success m-3">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMot;
