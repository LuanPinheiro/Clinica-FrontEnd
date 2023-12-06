import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./editar.css"
import "../pacientes/backButton.css";
import API from "../../apis/API";

function EditarMedico(){
    const location = useLocation();
    const [medico, setMedico] = useState({});
    const medicoOriginal = location.state;
    const navigate = useNavigate();

    useEffect(()=> {
        setMedico({})
    }, [])

    async function atualizarMedicoApi(){
        let url = `medico-ms/medicos`
        
        let data = {
            "nome": medico.nome ?? medicoOriginal.nome,
            "telefone": medico.telefone ?? medicoOriginal.telefone,
            "crm": medicoOriginal.crm,
            "endereco": {
                "bairro": medico.bairro ?? medicoOriginal.endereco.bairro,
                "cep": medico.cep ?? medicoOriginal.endereco.cep,
                "cidade": medico.cidade ?? medicoOriginal.endereco.cidade,
                "complemento": medico.complemento ?? medicoOriginal.endereco.complemento,
                "logradouro": medico.logradouro ?? medicoOriginal.endereco.logradouro,
                "numero": medico.numero ?? medicoOriginal.endereco.numero,
                "uf": medico.uf ?? medicoOriginal.endereco.uf
            }
        }
        
        return new Promise(async (resolve, reject)=>{
            return await API.put(url, data)
            .then(()=>{
                setTimeout(()=>{
                    navigate("/medicos");
                }, 4000);
                toast.loading("Aguarde um pouco...");
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message);
            })
        })
    }

    async function atualizarMedico(e){
        e.preventDefault();

        toast.promise(atualizarMedicoApi(),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Médico ${medico.nome ?? medicoOriginal.nome} atualizado com sucesso`
        })
    }

    function onChange(e){
        let medicoAlterado = medico;
        medicoAlterado[e.target.name] = e.target.value;

        setMedico(medicoAlterado);
    }

    return (<div>
        <button onClick={()=> navigate("/medicos")} className='button-back'>Voltar</button>
        <div className="boxeditar">
            <h1>Editar Médico</h1>
        
            <form onSubmit={(e)=>atualizarMedico(e)}>
            <hr></hr>
                {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
                <input type="text" value={medico.nome} name="nome" placeholder="Nome" required defaultValue={medicoOriginal.nome} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.telefone} name="telefone" placeholder="Telefone" required defaultValue={medicoOriginal.telefone} onChange={(e)=>onChange(e)}/> *
            
            <br></br>
            <hr></hr>
            <h3>Endereço:</h3>
                <input type="text" value={medico.uf} name="uf" placeholder="UF" required defaultValue={medicoOriginal.endereco.uf} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.cep} name="cep" placeholder="CEP" required defaultValue={medicoOriginal.endereco.cep} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.cidade} name="cidade" placeholder="Cidade" required defaultValue={medicoOriginal.endereco.cidade} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.bairro} name="bairro" placeholder="Bairro" required defaultValue={medicoOriginal.endereco.bairro} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.logradouro} name="logradouro" placeholder="Logradouro" required defaultValue={medicoOriginal.endereco.logradouro} onChange={(e)=>onChange(e)}/> *
                <input type="text" value={medico.complemento} name="complemento" placeholder="Complemento" defaultValue={medicoOriginal.endereco.complemento} onChange={(e)=>onChange(e)}/>
                <input type="text" value={medico.numero} name="numero" placeholder="Numero" defaultValue={medicoOriginal.endereco.numero} onChange={(e)=>onChange(e)}/>
    
            <br></br>
            <br></br>
            <button type="submit" className="button">Editar</button>
            </form>
            <ToastContainer/>
      </div>
      </div>)
}

export default EditarMedico;