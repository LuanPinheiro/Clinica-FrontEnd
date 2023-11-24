import React from 'react'
import { useState, useEffect } from "react";
import API from '../../apis/API';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Medicos(){

    const [listaMedicos, setListaMedicos] = useState([]);

    useEffect(() => {
        async function getMedicos(){
            let url = "medico-ms/medicos?page=0"
            API.get(url).then((response) => {
                let medicos = response.data;
                setListaMedicos(medicos.content);
            })
        }
        getMedicos();
    }, []);

    async function deleteMedicoApi(crm){
        let url = `medico-ms/medicos?crm=${crm}`
        const response = await API.delete(url);

        if(response.status == 200){
            for (let i = listaMedicos.length - 1; i >= 0; i--) {
                if (listaMedicos[i].crm == crm) {
                    listaMedicos.splice(i, 1);
                }
            }
            setListaMedicos([...listaMedicos]);
        }
    }

    async function deleteMedico(crm, nome){
        toast.promise(deleteMedicoApi(crm),
        {
            pending: "Por favor aguarde...",
            error: "Erro ao desativar médico, por favor tente novamente mais tarde",
            success: `Médico ${nome} desativado com sucesso`
        })
    }

    function medicoListado(item){
        return (<div>
            <hr></hr>
            <h2>Nome: {item.nome}</h2>
            <h2>CRM: {item.crm}</h2>
            <>Especialidade: {item.especialidade}</>
            <br></br><br></br>
            <button onClick={() => deleteMedico(item.crm, item.nome)}>Desativar médico</button>
            <hr></hr>
        </div>)
    }

    return (<div>
            {listaMedicos.length != 0 ? listaMedicos.map((item) =><a key={item.crm}>{medicoListado(item)}</a>) : <h1>Não há médicos cadastrados no sistema</h1>}
            <ToastContainer/>
    </div>);
}
export default Medicos