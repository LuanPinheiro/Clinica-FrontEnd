import { useEffect, useState } from "react"
import "./cadastro.css"
import API from "../../apis/API";
import { ToastContainer, toast } from "react-toastify";

function CadastrarMedico(){
    const [medico, setMedico] = useState({})

    useEffect(()=> {
        setMedico({})
    }, [])
    
    function onChange(e){
        let medicoAlterado = medico;
        medicoAlterado[e.target.name] = e.target.value;

        setMedico(medicoAlterado);
    }

    async function enviarMedicoApi(){
        let url = "medico-ms/medicos"
        let data = {
            "crm": medico.crm,
            "especialidade": medico.especialidade,
            "dadosPessoais": {
                "nome": medico.nome,
                "email": sessionStorage.getItem("userEmail"),
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
            }
        }
        return new Promise(async (resolve, reject)=>{
            return await API.post(url, data)
            .then(()=>{
                return resolve();
            })
            .catch(async (error)=>{
                return reject(error.response.data.message);
            })
        })
    }

    async function enviarMedico(e){
        e.preventDefault();

        toast.promise(enviarMedicoApi(),
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

    return (
    <div className="boxcadastromedico">
        <h1>Cadastro de Médico</h1>
    
        <form onSubmit={(e)=>enviarMedico(e)}>
        <hr></hr>
            {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
            <input type="text" value={medico.nome} name="nome" placeholder="Nome" required onChange={(e)=>onChange(e)}/> *
            <input type="text" value={medico.crm} name="crm" placeholder="CRM" required onChange={(e)=>onChange(e)}/> *
            <input type="tel" value={medico.telefone} name="telefone" placeholder="Telefone" required onChange={(e)=>onChange(e)}/> *
            <br></br><br></br>
            <label>Especialidade:</label>
            <select className="combobox" name="especialidade" value={medico.especialidade} onChange={(e)=>onChange(e)}>
                <option value="Ortopedia">Ortopedia</option>
                <option value="Cardiologia">Cardiologia</option>
                <option value="Ginecologia">Ginecologia</option>
                <option value="Dermatologia">Dermatologia</option>
                </select>

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
        <br></br>
        <button type="submit" className="button">Cadastrar</button>
        </form>
        <ToastContainer/>
  </div>)
}
export default CadastrarMedico