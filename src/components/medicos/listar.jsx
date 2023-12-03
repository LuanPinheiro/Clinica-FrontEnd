import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import API from '../../apis/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../contexts/user';
import { Link, useNavigate } from 'react-router-dom';

function ListarMedicos(){

    const [listaMedicos, setListaMedicos] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    

    useEffect(() => {
        async function getMedicos(){
            let url = `medico-ms/medicos/email?page=0&email=${user.email}`
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
            Especialidade: {item.especialidade}

            <br></br>
            <Link to="/consultas"><button className='button'>Consultas</button></Link>
            <button className='button' onClick={()=> navigate("/medicos/editar", {state: item})}>Editar</button>
            <button className='button' onClick={() => deleteMedico(item.crm, item.nome)}>Desativar</button>
            <hr></hr>
        </div>)
    }

    return (<div>
        {listaMedicos.length != 0 ? listaMedicos.map((item) =><div key={item.crm}>{medicoListado(item)}</div>) : <h1>Não há médicos cadastrados nessa conta</h1>}
        <ToastContainer/>
    </div>);
}
export default ListarMedicos