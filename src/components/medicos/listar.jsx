import { useState, useEffect, useContext } from "react";
import API from '../../apis/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "../pacientes/moreButton.css"
import { ConsultaInfoContext } from "../../contexts/consultaInfo";

function ListarMedicos(){

    const [listaMedicos, setListaMedicos] = useState([]);
    const [page, setPage] = useState({});
    const {consultaInfo, setConsultaInfo} = useContext(ConsultaInfoContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getMedicos(){
            let url = `medico-ms/medicos/email?page=0&email=${sessionStorage.getItem("userEmail")}`
            API.get(url).then((response) => {
                let page = response.data;
                setPage(page)
                setListaMedicos(page.content);
            })
        }
        getMedicos();
    }, []);

    async function proximaPage(){
        let url = `medico-ms/medicos/email?page=${page.pageable.pageNumber + 1}&email=${sessionStorage.getItem("userEmail")}`
        API.get(url).then((response) => {
            let page = response.data;
            setPage(page)
            listaMedicos.push(...page.content);
            setListaMedicos(listaMedicos);
        })
    }

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
                    <button className='button' onClick={() => {
                        setConsultaInfo({
                            tipo: "crm",
                            id: medico.crm,
                            especialidade: medico.especialidade
                       });
                       navigate("/consultas");
                    }}>Consultas</button>
                    <button className='button' onClick={() => navigate("/medicos/editar", {state: medico})}>Editar</button>
                    <button className='button' onClick={() => deleteMedico(medico.crm, medico.nome)}>Desativar</button>
                </div>
            </div>
        );
    }

    return (<div className="card-container">
        <hr></hr>
        {listaMedicos.length != 0 ? listaMedicos.map((medico) =><div key={medico.crm}>{medicoListado(medico)}</div>) : <h1>Não há médicos cadastrados nessa conta</h1>}
        {page.last == false ? <button className="button-more" onClick={()=>proximaPage()}>Ver mais</button> : <hr></hr>}
        <ToastContainer/>
    </div>);
}
export default ListarMedicos