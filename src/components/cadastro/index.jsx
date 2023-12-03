import { ToastContainer, toast } from "react-toastify";
import auth from "../../apis/firebase";
import { useState } from "react";
import "./cadastro.css"
import { createUserWithEmailAndPassword } from "firebase/auth";

function Cadastro(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function firebaseCreate(e){
        e.preventDefault()
        
        await createUserWithEmailAndPassword(auth ,email, senha)
        .then(()=> toast.success("Conta criada com sucesso"))
        .catch((error)=> {
            if(error.code==='auth/weak-password'){
                toast.error('Senha Fraca');
            }else if(error.code==='auth/email-already-in-use'){
                toast.error('Email já em uso');
            }
        });
    }

    return (<div>
        <div className="boxcadastro">
            <h1>Cadastro</h1>
        
            <form onSubmit={(e)=>firebaseCreate(e)}>
            <hr></hr>
                {/* <label id="icon" for="name"><i class="icon-shield"></i></label> */}
                <input type="email" value={email} name="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/> *
                <input type="password" value={senha} name="senha" placeholder="Senha" required onChange={(e)=>setSenha(e.target.value)}/> *

            <br></br>
            <br></br>
            <button type="submit" className="button">Cadastrar</button>
            </form>
            <ToastContainer/>
      </div>
      </div>)
}

export default Cadastro;