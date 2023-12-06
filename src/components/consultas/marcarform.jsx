import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./marcarform.css"
import { useState } from "react";
import API from "../../apis/API";
import "../home/login.css"

function MarcarForm(){

    const location = useLocation();
    const [data, setData] = useState("")
    const [hora, setHora] = useState("07:00")

    async function marcarConsultaApi(){
        let url = "consulta-ms/consultas"
        let dados = {
            "crmMedico": location.state.crm,
            "cpfPaciente": location.state.cpf,
            "data": data,
            "hora": hora,
            "especialidade": location.state.especialidade
        }
        console.log(dados)
        return new Promise(async (resolve, reject)=>{
            return await API.post(url, dados)
            .then(()=>{
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message || "Erro ao se conectar com o servidor, tente novamente");
            })
        })
    }

    async function marcarConsulta(e){
        e.preventDefault();

        toast.promise(marcarConsultaApi(),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Consulta marcada com sucesso`
        })
    }

    return (<div>
        <div className="marcarformbox">
            <h1>Marcação de consulta</h1>
        
            <form onSubmit={(e)=>marcarConsulta(e)}>
            <hr></hr>
                {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
                <h3>CRM do médico</h3>
                <input type="text" value={location.state.crm} name="crm" placeholder="CRM" readOnly={true}/>
                <br></br><br></br>
                <h3>CPF do paciente</h3>
                <input type="text" value={location.state.cpf} name="cpf" placeholder="CPF" readOnly={true}/>
                <hr></hr>
                <h3>Data da consulta</h3>
                <input type="date" className="combobox" value={data} name="data" required onChange={(e)=>setData(e.target.value)}/>
                <br></br><br></br>
                <h3>Hora da consulta</h3>
                <select name="hour" className="combobox" value={hora} onChange={(e)=>setHora(e.target.value)}>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                </select>
            <br></br>
            <br></br>
            <button type="submit" className="button">Confirmar</button>
            </form>
            <ToastContainer/>
      </div>
      </div>)
}

export default MarcarForm;