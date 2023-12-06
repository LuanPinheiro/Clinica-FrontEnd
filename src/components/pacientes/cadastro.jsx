import { useEffect, useState } from "react"
import "./cadastro.css"
import API from "../../apis/API";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./backButton.css"

function CadastrarPaciente(){
    const [paciente, setPaciente] = useState({});
    const navigate = useNavigate();

    useEffect(()=> {
        setPaciente({})
    }, [])
    
    function onChange(e){
        let pacienteAlterado = paciente;
        pacienteAlterado[e.target.name] = e.target.value;

        setPaciente(pacienteAlterado);
    }

    async function enviarPacienteApi(){
        let url = "paciente-ms/pacientes"
        let data = {
            "cpf": paciente.cpf,
            "dadosPessoais": {
                "nome": paciente.nome,
                "email": sessionStorage.getItem("userEmail"),
                "telefone": paciente.telefone,
                "endereco": {
                    "bairro": paciente.bairro,
                    "cep": paciente.cep,
                    "cidade": paciente.cidade,
                    "complemento": paciente.complemento,
                    "logradouro": paciente.logradouro,
                    "numero": paciente.numero,
                    "uf": paciente.uf
                }
            }
        }
        
        return new Promise(async (resolve, reject)=>{
            return await API.post(url, data)
            .then(() =>{
                setTimeout(()=>{
                    navigate("/pacientes");
                }, 4000);
                toast.loading("Aguarde um pouco...");
                return resolve();
            })
            .catch(async (error)=>{
                let errorMessage = "";
                for(let key in error.response.data){
                    errorMessage += error.response.data[key] + "\n"
                }
                return reject(errorMessage);
            })
        })
    }

    async function enviarPaciente(e){
        e.preventDefault();

        toast.promise(enviarPacienteApi(),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Paciente ${paciente.nome} cadastrado com sucesso`
        })
    }

    return (<div>
    <button onClick={()=> navigate("/pacientes")} className='button-back'>Voltar</button>
    <div className="boxcadastropaciente">
        <h1>Cadastro de Paciente</h1>
    
        <form onSubmit={(e)=>enviarPaciente(e)}>
        <hr></hr>
            {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
            <input type="text" value={paciente.nome} name="nome" placeholder="Nome" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.cpf} name="cpf" placeholder="CPF" required onChange={(e)=>onChange(e)}/> *
            <input type="tel" value={paciente.telefone} name="telefone" placeholder="Telefone" required onChange={(e)=>onChange(e)}/> *

        <br></br>
        <hr></hr>
        <h3>Endereço:</h3>

            <input type="text" value={paciente.uf} name="uf" placeholder="UF" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.cep} name="cep" placeholder="CEP" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.cidade} name="cidade" placeholder="Cidade" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.bairro} name="bairro" placeholder="Bairro" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.logradouro} name="logradouro" placeholder="Logradouro" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={paciente.complemento} name="complemento" placeholder="Complemento" onChange={(e)=>onChange(e)}/>
            <input type="text" value={paciente.numero} name="numero" placeholder="Numero" onChange={(e)=>onChange(e)}/>

        <br></br>
        <br></br>
        <button type="submit" className="button">Cadastrar</button>
        </form>
        <ToastContainer/>
  </div>
  </div>)
}
export default CadastrarPaciente