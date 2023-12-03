import { useEffect, useState } from "react"
import API from "../../apis/API"
import { ToastContainer, toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

function Consulta(){

    const location = useLocation();
    const [consultas, setConsultas] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        async function getConsultas(){
            let url = `consulta-ms/consultas?${location.state.tipo}=${location.state.id}`;
            API.get(url)
            .then((response) => {
                let consultasApi = response.data;
                setConsultas(consultasApi.content);
            })
        }
        getConsultas();
    },[])

    function consultaListada(consulta){
        return (<div>
            <hr></hr>
            {location.state.tipo == "cpf" ? <h2>Medico: {consulta.medico}</h2> : <h2>Paciente: {consulta.paciente}</h2>}
            Data: {consulta.data}
            <br></br>
            Hora: {consulta.hora}
            <br></br><br></br>
            <button className="button" onClick={()=>navigate("/consultas/desmarcar", {state: {consulta}})}>Desmarcar</button>
            <hr></hr>
        </div>)
    }

    return (<div>
        <h1>Menu de Consultas</h1>
        <button onClick={()=>navigate("/consultas/marcar", {state: {
            tipobusca: location.state.tipo == "crm" ? "pacientes" : "medicos",
            especialidade: location.state.tipo == "crm" ? location.state.especialidade : null,
            tipo: location.state.tipo,
            id: location.state.id,
        }})} className="button">Marcar</button>
        {consultas.length != 0 ? consultas.map((consulta) =><div key={consulta.cpf+consulta.crm+consulta.data}>{consultaListada(consulta)}</div>) : <h1>Não há consultas cadastradas para você</h1>}
        <ToastContainer/>
    </div>)
}

export default Consulta