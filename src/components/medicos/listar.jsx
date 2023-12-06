import { useState, useEffect } from "react";
import API from '../../apis/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ListarMedicos(){

    const [listaMedicos, setListaMedicos] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        async function getMedicos(){
            let url = `medico-ms/medicos/email?page=0&email=${sessionStorage.getItem("userEmail")}`
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

    function medicoListado(medico){
        return(
            <div className="card">
                <div className="card-content">
                    <h2>CRM: {medico.crm}</h2>
                    <h3>Nome: {medico.nome}</h3>
                    Especialidade: {medico.especialidade}
                    <br></br>
                    <button className='button' onClick={() => navigate("/consultas", {state: {
                        tipo: "crm",
                        id: medico.crm,
                        especialidade: medico.especialidade
                    }})}>Consultas</button>
                    <button className='button' onClick={() => navigate("/medicos/editar", {state: medico})}>Editar</button>
                    <button className='button' onClick={() => deleteMedico(medico.crm, medico.nome)}>Desativar</button>
                </div>
            </div>
        );
    }

    return (<div className="card-container">
        {listaMedicos.length != 0 ? listaMedicos.map((medico) =><div key={medico.crm}>{medicoListado(medico)}</div>) : <h1>Não há médicos cadastrados nessa conta</h1>}
        <ToastContainer/>
    </div>);
}
export default ListarMedicos