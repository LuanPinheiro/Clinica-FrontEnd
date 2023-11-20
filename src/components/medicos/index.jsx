import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";

function Medicos(){

    const [listaMedicos, setListaMedicos] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8084/medico-ms/medicos?page=0"
        axios.get(url).then((response) => {
            let medicos = response.data;
            setListaMedicos(medicos.content);
        })
    }, []);

    
        

    function deleteMedico(crm){
        let url = "localhost:8084/medico-ms/medicos?crm="+crm
        axios.delete(url).then((response) => {
            if(response.status == 200){
                // Atualizar a lista de médicos
            }
            
        })
    }

    function medicoListado(item){
        return (<div>
            <h1>Nome: {item.nome}</h1>
            <h2>CRM: {item.crm}</h2>
            <>Especialidade: {item.especialidade}</>
            <br></br><br></br>
            <button onClick={deleteMedico(item.crm)}>Desativar médico</button>
            <hr></hr>
        </div>)
    }

    return (<div>
            {listaMedicos.map((item) =><a key={item.crm}>{medicoListado(item)}</a>)}
    </div>);

}
export default Medicos