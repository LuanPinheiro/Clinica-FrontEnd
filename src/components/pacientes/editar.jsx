import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./editar.css"
import "./backButton.css"
import API from "../../apis/API";

function EditarPaciente(){
    const location = useLocation();
    const [paciente, setPaciente] = useState({});
    const pacienteOriginal = location.state;
    const navigate = useNavigate();

    async function atualizarPacienteApi(){
        let url = `paciente-ms/pacientes`
        
        let data = {
            "nome": paciente.nome ?? pacienteOriginal.nome,
            "telefone": paciente.telefone ?? pacienteOriginal.telefone,
            "cpf": pacienteOriginal.cpf,
            "endereco": {
                "bairro": paciente.bairro ?? pacienteOriginal.endereco.bairro,
                "cep": paciente.cep ?? pacienteOriginal.endereco.cep,
                "cidade": paciente.cidade ?? pacienteOriginal.endereco.cidade,
                "complemento": paciente.complemento ?? pacienteOriginal.endereco.complemento,
                "logradouro": paciente.logradouro ?? pacienteOriginal.endereco.logradouro,
                "numero": paciente.numero ?? pacienteOriginal.endereco.numero,
                "uf": paciente.uf ?? pacienteOriginal.endereco.uf
            }
        }
        
        return new Promise(async (resolve, reject)=>{
            return await API.put(url, data)
            .then(()=>{
                setTimeout(()=>{
                    navigate("/pacientes");
                }, 4000);
                toast.loading("Aguarde um pouco...");
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message);
            })
        })
    }

    async function atualizarPaciente(e){
        e.preventDefault();

        toast.promise(atualizarPacienteApi(),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Médico ${paciente.nome ?? pacienteOriginal.nome} atualizado com sucesso`
        })
    }

    function onChange(e){
        let pacienteAlterado = paciente;
        pacienteAlterado[e.target.name] = e.target.value;

        setPaciente(pacienteAlterado);
    }

    return (<div>
        <button onClick={()=> navigate("/pacientes")} className='button-back'>Voltar</button>
        <div className="boxeditarpaciente">
            <h1>Editar Paciente</h1>
        
            <form onSubmit={(e)=>atualizarPaciente(e)}>
            <hr></hr>
                {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
                <input type="text" value={paciente.nome} name="nome" placeholder="Nome" required defaultValue={pacienteOriginal.nome} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.telefone} name="telefone" placeholder="Telefone" required defaultValue={pacienteOriginal.telefone} onChange={(e)=>onChange(e)}/> *
            
            <br></br>
            <hr></hr>
            <h3>Endereço:</h3>
                <input type="text" value={paciente.uf} name="uf" placeholder="UF" required defaultValue={pacienteOriginal.endereco.uf} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.cep} name="cep" placeholder="CEP" required defaultValue={pacienteOriginal.endereco.cep} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.cidade} name="cidade" placeholder="Cidade" required defaultValue={pacienteOriginal.endereco.cidade} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.bairro} name="bairro" placeholder="Bairro" required defaultValue={pacienteOriginal.endereco.bairro} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.logradouro} name="logradouro" placeholder="Logradouro" required defaultValue={pacienteOriginal.endereco.logradouro} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={paciente.complemento} name="complemento" placeholder="Complemento" defaultValue={pacienteOriginal.endereco.complemento} onChange={(e)=>onChange(e)}/>
                <input type="text" value={paciente.numero} name="numero" placeholder="Numero" defaultValue={pacienteOriginal.endereco.numero} onChange={(e)=>onChange(e)}/>
    
            <br></br>
            <br></br>
            <button type="submit" className="button">Editar</button>
            </form>
            <ToastContainer/>
      </div>
      </div>)
}

export default EditarPaciente;