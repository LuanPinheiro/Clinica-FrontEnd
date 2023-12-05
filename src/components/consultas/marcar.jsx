import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../apis/API";

function MarcarConsulta(){
    const location = useLocation();
    const [registros, setRegistros] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getRegistros(){
            let url = `${location.state.tipobusca.slice(0, -1)}-ms/${location.state.tipobusca}?page=0`
            API.get(url).then((response) => {
                let registros = response.data;
                setRegistros(registros.content);
            })
        }
        getRegistros();
    }, []);

    function registroListado(item){
        let campoEspecifico = location.state.tipoBusca == "medicos" ? "Especialidade" : "Email";
        let crmCpf = location.state.tipo == "crm" ? "cpf" : "crm";
        return (<div>
            <hr></hr>
            <h2>{crmCpf.toUpperCase()}: {item[crmCpf.toLowerCase()]}</h2>
            <h2>Nome: {item.nome}</h2>
            {campoEspecifico}: {item[campoEspecifico.toLowerCase()]}
            <br></br>
            <button onClick={()=> navigate("/consultas/marcar/form", {state: {
                "crm": location.state.tipo == "crm" ? location.state.id : item[crmCpf.toLowerCase()],
                "cpf": location.state.tipo == "cpf" ? location.state.id : item[crmCpf.toLowerCase()],
                "especialidade": location.state.tipo == "crm" ? location.state.especialidade : item.especialidade
            }})} className="button">Selecionar</button>
        </div>)
    }

    return (<div>
        <h1>Escolha um {location.state.tipobusca.slice(0, -1)}</h1>
        {registros.length != 0 ? registros.map((item) =><div key={item.crm || item.cpf}>{registroListado(item)}</div>) : <h1>Não há {location.state.tipobusca} cadastrados no sistema</h1>}
    </div>)
}
export default MarcarConsulta;