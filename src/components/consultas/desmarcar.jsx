import { useState } from "react";
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import API from "../../apis/API";

function DesmarcarConsulta(){

    const location = useLocation();
    const consulta = location.state.consulta;
    const [motivo, setMotivo] = useState("medico_cancelou");

    async function desmarcarConsultaApi(){
        let url = "consulta-ms/consultas"
        let dados = {
            "crmMedico": consulta.medico,
            "cpfPaciente": consulta.paciente,
            "data": consulta.data,
            "hora": consulta.hora.substring(0, consulta.hora.length -3),
            "motivo": motivo
        }

        return new Promise(async (resolve, reject)=>{
            return await API.delete(url, {data: dados})
            .then(()=>{
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message || "Erro ao se conectar com o servidor, tente novamente");
            })
        })
    }

    async function desmarcarConsulta(e){
        e.preventDefault();

        toast.promise(desmarcarConsultaApi(),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Consulta desmarcada com sucesso`
        })
    }

    return (<div>
        <div className="desmarcarformbox">
            <h1>Desmarcar consulta</h1>

            <form onSubmit={(e)=>desmarcarConsulta(e)}>
            <hr></hr>
                {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
                <h3>CRM do médico</h3>
                <input type="text" value={consulta.medico} name="crm" placeholder="CRM" readOnly={true}/>
                <br></br><br></br>
                <h3>CPF do paciente</h3>
                <input type="text" value={consulta.paciente} name="cpf" placeholder="CPF" readOnly={true}/>
                <br></br><br></br>
                <h3>Data da consulta</h3>
                <input type="date" value={consulta.data} name="data" readOnly={true}/>
                <br></br><br></br>
                <h3>Hora da consulta</h3>
                <select name="hour" value={consulta.hora.substring(0, consulta.hora.length -3)} readOnly={true} disabled={true}>
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

                <hr></hr>
                <select name="motivo" value={motivo} onChange={(e)=>setMotivo(e.target.value)}>
                <option value="medico_cancelou">Médico cancelou</option>
                <option value="paciente_desistiu">Paciente desistiu</option>
                <option value="outros">Outros</option>
                </select>
            <br></br>
            <br></br>
            <button type="submit" className="button">Desmarcar</button>
            </form>
            <ToastContainer/>
      </div>
      </div>)
}

export default DesmarcarConsulta