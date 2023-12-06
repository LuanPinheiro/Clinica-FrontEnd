import { useContext, useEffect, useState } from "react"
import API from "../../apis/API"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { ConsultaInfoContext } from "../../contexts/consultaInfo";
import "../pacientes/backButton.css";

function Consulta(){

    const {consultaInfo, setConsultaInfo} = useContext(ConsultaInfoContext);
    const [consultas, setConsultas] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        async function getConsultas(){
            let url = `consulta-ms/consultas?${consultaInfo.tipo}=${consultaInfo.id}`;
            API.get(url)
            .then((response) => {
                let consultasApi = response.data;
                setConsultas(consultasApi.content);
            })
        }
        getConsultas();
    },[])

    function consultaListada(consulta){
        return(
            <div className="card">
                <div className="card-content">
                    {consultaInfo.tipo == "cpf" ? <h2>Medico: {consulta.medico}</h2> : <h2>Paciente: {consulta.paciente}</h2>}
                    <h3>Data: {consulta.data}</h3>
                    <h3>Data: {consulta.hora}</h3>
                    <br></br>
                    <button className="button" onClick={()=>navigate("/consultas/desmarcar", {state: {consulta}})}>Desmarcar</button>
                </div>
            </div>
        );
    }

    return (<div>
        <button onClick={()=> navigate(`/${consultaInfo.tipo == "cpf" ? "pacientes" : "medicos"}`)} className='button-back'>Voltar</button>
        <h1>Menu de Consultas</h1>
        <button onClick={()=>navigate("/consultas/marcar", {state: {
            tipoBusca: consultaInfo.tipo == "crm" ? "pacientes" : "medicos",
            especialidade: consultaInfo.tipo == "crm" ? consultaInfo.especialidade : null,
            tipo: consultaInfo.tipo,
            id: consultaInfo.id,
        }})} className="button-add">Marcar</button>

        <div className="card-container">
        {consultas.length != 0 ? consultas.map((consulta) =><div key={consulta.cpf+consulta.crm+consulta.data}>{consultaListada(consulta)}</div>) : <h1>Não há consultas cadastradas para você</h1>}
        </div>
        <ToastContainer/>
    </div>)
}

export default Consulta