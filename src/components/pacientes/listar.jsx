import { useState, useEffect, useContext } from "react";
import API from '../../apis/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "../home/card.css"
import "../pacientes/moreButton.css"
import { ConsultaInfoContext } from "../../contexts/consultaInfo";

function ListarPacientes(){

    const [listaPacientes, setListaPacientes] = useState([]);
    const [page, setPage] = useState({});
    const {consultaInfo, setConsultaInfo} = useContext(ConsultaInfoContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getPacientes(){
            let url = `paciente-ms/pacientes/email?page=0&email=${sessionStorage.getItem("userEmail")}`
            API.get(url).then((response) => {
                let page = response.data;
                setPage(page)
                setListaPacientes(page.content);
            })
        }
        getPacientes();
    }, []);

    async function proximaPage(){
        let url = `paciente-ms/pacientes/email?page=${page.pageable.pageNumber + 1}&email=${sessionStorage.getItem("userEmail")}`
        API.get(url).then((response) => {
            let page = response.data;
            setPage(page)
            listaPacientes.push(...page.content);
            setListaMedicos(listaPacientes);
        })
    }

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
        return(
            <div className="card">
                <div className="card-content">
                    <h2>CPF: {paciente.cpf}</h2>
                    <h3>Nome: {paciente.nome}</h3>
                    Telefone: {paciente.telefone}
                    <br></br>
                    <button className='button' onClick={() => {
                        setConsultaInfo({
                            tipo: "cpf",
                            id: paciente.cpf
                       });
                       navigate("/consultas");
                    }}>Consultas</button>
                    <button className='button' onClick={() => navigate("/pacientes/editar", {state: paciente})}>Editar</button>
                    <button className='button' onClick={() => deletePaciente(paciente.cpf, paciente.nome)}>Desativar</button>
                </div>
            </div>
        )
    }

    return (<div className="card-container">
        <hr></hr>
        {listaPacientes.length != 0 ? listaPacientes.map((paciente) =><div key={paciente.cpf}>{pacienteListado(paciente)}</div>) : <h1>Não há pacientes cadastrados nessa conta</h1>}
        {page.last == false ? <button className="button-more" onClick={()=>proximaPage()}>Ver mais</button> : <hr></hr>}
        <ToastContainer/>
    </div>);
}
export default ListarPacientes;