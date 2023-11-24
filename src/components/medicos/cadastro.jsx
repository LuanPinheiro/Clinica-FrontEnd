import { useEffect, useState } from "react"
import "./cadastro.css"
import API from "../../apis/API";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../apis/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

function CadastrarMedico(){
    const [medico, setMedico] = useState({})
    const navigate = useNavigate();
    
    function onChange(e){
        let medicoAlterado = medico;
        medicoAlterado[e.target.name] = e.target.value;

        setMedico(medicoAlterado);
    }

    async function enviarMedicoApi(e){
        let url = "medico-ms/medicos"
        let data = {
            "dadosPessoais": {
                "nome": medico.nome,
                "email": medico.email,
                "telefone": medico.telefone,
                "endereco": {
                    "bairro": medico.bairro,
                    "cep": medico.cep,
                    "cidade": medico.cidade,
                    "complemento": medico.complemento,
                    "logradouro": medico.logradouro,
                    "numero": medico.numero,
                    "uf": medico.uf
                }
            },
            "crm": medico.crm,
            "especialidade": medico.especialidade
        }
        return new Promise(async (resolve, reject)=>{
            return await API.post(url, data)
            .then(()=>{
                navigate("/")
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message);
            })
        })
    }

    function enviarMedico(e){
        toast.promise(enviarMedicoApi(e),
        {
            pending: "Por favor aguarde...",
            error: {
                // Mensagem de erro vindo do backend
                render({data}){
                  return data
                },
              },
            success: `Médico ${medico.nome} cadastrado com sucesso`
        })
    }

    async function firebaseCreate(e){
        e.preventDefault()
        
        await createUserWithEmailAndPassword(auth ,medico.email,medico.crm)
        .then(()=> enviarMedico(e))
        .catch((error)=> {
            console.log("erro")
            if(error.code==='auth/weak-password'){
                toast.error('Senha Fraca');
            }else if(error.code==='auth/email-already-in-use'){
                toast.error('Email já em uso');
            }
        });
    }

    

    return (<div>
    <div className="testboxcadastro">
        <h1>Cadastro de Médico</h1>
    
        <form onSubmit={(e)=>firebaseCreate(e)}>
        <hr></hr>
            {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
            <input type="text" value={medico.nome} name="nome" placeholder="Nome" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.email} name="email" placeholder="Email" required onChange={(e)=>onChange(e)}/> *
        <hr></hr>
            <input type="text" value={medico.crm} name="crm" placeholder="CRM" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.telefone} name="telefone" placeholder="Telefone" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.especialidade} name="especialidade" placeholder="Especialidade" required onChange={(e)=>onChange(e)}/> *

        <br></br>
        <hr></hr>
        <h3>Endereço:</h3>

            <input type="text" value={medico.uf} name="uf" placeholder="UF" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.cep} name="cep" placeholder="CEP" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.cidade} name="cidade" placeholder="Cidade" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.bairro} name="bairro" placeholder="Bairro" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.logradouro} name="logradouro" placeholder="Logradouro" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.complemento} name="complemento" placeholder="Complemento" onChange={(e)=>onChange(e)}/>
            <input type="text" value={medico.numero} name="numero" placeholder="Numero" onChange={(e)=>onChange(e)}/>

        <br></br>
        <button type="submit" className="button">Cadastrar</button>
        </form>
        <ToastContainer/>
  </div>
  </div>)
}
export default CadastrarMedico