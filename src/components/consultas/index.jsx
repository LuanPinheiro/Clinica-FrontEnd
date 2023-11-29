import { useEffect, useState } from "react"
import API from "../../apis/API"
import { ToastContainer, toast } from "react-toastify"
import auth from "../../apis/firebase"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"

function Consulta(){

    const [consultas, setConsultas] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
       API.get("consulta-ms/consultas")
       .then((response) => {
        let consultasApi = response.data;
        setConsultas(consultasApi);
       }) 
    },[])

    async function desmarcarConsultaApi(consulta){
        let url = `consulta-ms/consultas`
        const response = await API.delete(url, {
            data: {
                "crmMedico": consulta.medico,
                "cpfPaciente": consulta.paciente,
                "data": consulta.data,
                "hora": consulta.hora,
                "motivo": "outros"
            }
        });

        if(response.status == 202){
            for (let i = consultas.length - 1; i >= 0; i--) {
                if (consultas[i].medico == consulta.medico && 
                    consultas[i].paciente == consulta.paciente &&
                    consultas[i].data == consulta.data) {
                    consultas.splice(i, 1);
                }
            }
            setConsultas([...consultas]);
        }
    }

    function desmarcarConsulta(consulta){
        toast.promise(desmarcarConsultaApi(consulta),
        {
            pending: "Por favor aguarde...",
            error: "Erro ao desmarcar consulta, por favor tente novamente mais tarde",
            success: `Consulta desmarcada com sucesso`
        })
    }

    function consultaListada(consulta){
        return (<div>
            <hr></hr>
            <h2>Medico: {consulta.medico}</h2>
            <h2>Paciente: {consulta.paciente}</h2>
            Data: {consulta.data}
            <br></br>
            Hora: {consulta.hora}
            <br></br><br></br>
            <button onClick={()=>desmarcarConsulta(consulta)}>Desmarcar consulta</button>
            <hr></hr>
        </div>)
    }

    async function logout(){
        await signOut(auth).then(()=>{
            navigate("/")
        });
    }

    return (<div>
        <button onClick={()=> logout()} className='button'>Logout</button>
        {consultas.length != 0 ? consultas.map((consulta) =><a key={consulta.cpf+consulta.crm+consulta.data}>{consultaListada(consulta)}</a>) : <h1>Não há consultas cadastradas no sistema</h1>}
        <ToastContainer/>
    </div>)
}

export default Consulta