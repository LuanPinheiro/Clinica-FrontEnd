import { useState, useEffect } from "react";
import API from '../../apis/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ListarPacientes(){

    const [listaPacientes, setListaPacientes] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getPacientes(){
            let url = `paciente-ms/pacientes/email?page=0&email=${localStorage.getItem("userEmail")}`
            API.get(url).then((response) => {
                let pacientes = response.data;
                setListaPacientes(pacientes.content);
            })
        }
        getPacientes();
    }, []);

    async function deletePacienteApi(cpf){
        let url = `paciente-ms/pacientes?cpf=${cpf}`
        const response = await API.delete(url);

        if(response.status == 200){
            for (let i = listaPacientes.length - 1; i >= 0; i--) {
                if (listaPacientes[i].cpf == cpf) {
                    listaPacientes.splice(i, 1);
                }
            }
            setListaPacientes([...listaPacientes]);
        }
    }

    async function deletePaciente(cpf, nome){
        toast.promise(deletePacienteApi(cpf),
        {
            pending: "Por favor aguarde...",
            error: "Erro ao desativar paciente, por favor tente novamente mais tarde",
            success: `Paciente ${nome} desativado com sucesso`
        })
    }

    function pacienteListado(paciente){
        return (<div>
            <hr></hr>
            <h2>CPF: {paciente.cpf}</h2>
            <h2>Nome: {paciente.nome}</h2>
            Telefone: {paciente.telefone}
            <br></br>
            <button className='button' onClick={() => navigate("/consultas", {state: {
                tipo: "cpf",
                id: paciente.cpf
            }})}>Consultas</button>
            <button className='button' onClick={() => navigate("/pacientes/editar", {state: paciente})}>Editar</button>
            <button className='button' onClick={() => deletePaciente(paciente.cpf, paciente.nome)}>Desativar</button>
            <hr></hr>
        </div>)
    }

    return (<div>
        {listaPacientes.length != 0 ? listaPacientes.map((paciente) =><div key={paciente.cpf}>{pacienteListado(paciente)}</div>) : <h1>Não há pacientes cadastrados nessa conta</h1>}
        <ToastContainer/>
    </div>);
}
export default ListarPacientes;