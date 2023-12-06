import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../apis/API";
import "../pacientes/backButton.css"
import "../pacientes/moreButton.css"

function MarcarConsulta(){
    const location = useLocation();
    const [registros, setRegistros] = useState([]);
    const [page, setPage] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        async function getRegistros(){
            let url = `${location.state.tipoBusca.slice(0, -1)}-ms/${location.state.tipoBusca}?page=0`
            API.get(url).then((response) => {
                let page = response.data;
                setPage(page);
                setRegistros(page.content);
            })
        }
        getRegistros();
    }, []);

    async function proximaPage(){
        let url = `${location.state.tipoBusca.slice(0, -1)}-ms/${location.state.tipoBusca}?page=${page.pageable.pageNumber + 1}`
        API.get(url).then((response) => {
            let page = response.data;
            setPage(page)
            registros.push(...page.content);
            setRegistros(registros);
        })
    }

    function registroListado(item){
        let campoEspecifico = location.state.tipoBusca == "medicos" ? "Especialidade" : "Email";
        console.log(location.state.tipoBusca);
        let crmCpf = location.state.tipo == "crm" ? "cpf" : "crm";
        return(
            <div className="card">
                <div className="card-content">
                    <h2>{crmCpf.toUpperCase()}: {item[crmCpf.toLowerCase()]}</h2>
                    <h3>Nome: {item.nome}</h3>
                    {campoEspecifico}: {item[campoEspecifico.toLowerCase()]}
                    <br></br>
                    <button onClick={()=> navigate("/consultas/marcar/form", {state: {
                        "crm": location.state.tipo == "crm" ? location.state.id : item[crmCpf.toLowerCase()],
                        "cpf": location.state.tipo == "cpf" ? location.state.id : item[crmCpf.toLowerCase()],
                        "especialidade": location.state.tipo == "crm" ? location.state.especialidade : item.especialidade
                    }})} className="button">Selecionar</button>
                </div>
            </div>
        );
    }

    return (<div>
        <button onClick={()=> navigate("/consultas")} className='button-back'>Voltar</button>
        <h1>Escolha um {location.state.tipoBusca.slice(0, -1)}</h1>
        <div className="card-container">
        {registros.length != 0 ? registros.map((item) =><div key={item.crm || item.cpf}>{registroListado(item)}</div>) : <h1>Não há {location.state.tipobusca} cadastrados no sistema</h1>}
        {page.last == false ? <button className="button-more" onClick={()=>proximaPage()}>Ver mais</button> : <hr></hr>}
        </div>
    </div>)
}
export default MarcarConsulta;