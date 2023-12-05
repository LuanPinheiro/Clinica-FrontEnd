import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../apis/firebase';
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';

function Home(props){

    const [rotaLogin, setRotaLogin ] = useState("pacientes");
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        setUser({})
        async function checkLogin(){
            onAuthStateChanged(auth, (logged)=>{
            if(logged){
                sessionStorage.setItem("userEmail", user.email);
            }else{
                setUser({});
            }
            })
        }
        checkLogin();
       },[]);

    async function tryLogin(e){
        e.preventDefault();

        await signInWithEmailAndPassword(auth, user.email, user.senha)
        .then(async ()=>{
            let usuario = user;
            usuario.senha = null;
            setUser(usuario);
            sessionStorage.setItem("userEmail", user.email);
            toast.success("Logado com sucesso");
            navigate(`/${rotaLogin}`);
        })
        .catch((error)=>{
            setUser({})
            if(error.code==='auth/invalid-login-credentials'){
                toast.error("Email ou senha inválida")
            }
            else{
                toast.error(error.message);
            }
        })
        
    }

    function onChange(e){
        let form = user;
        form[e.target.name] = e.target.value;

        setUser(form);
    }

    function RadioValue(e){
        setRotaLogin(e.target.value);
    }

    return (<div>
        <h1>Bem vindo a {props.nome}</h1>
        <br></br>
    <div className="loginbox">
        <h1>Login</h1>
            <form onSubmit={(e)=>tryLogin(e)}>
                <hr></hr>
            <div className="accounttype" onChange={(e)=>RadioValue(e)}>
                <input type="radio" value="pacientes" id="radioOne" name="account" defaultChecked/>
                <label htmlFor="radioOne" className="radio">Paciente</label>
                <input type="radio" value="medicos" id="radioTwo" name="account"/>
                <label htmlFor="radioTwo" className="radio">Médico</label>
            </div>
            <hr></hr>
            <input type="email" value={user.email} name="email" id="email" placeholder="Email" required onChange={(e)=>onChange(e)}/>
            <input type="password" value={user.senha} name="senha" id="senha" placeholder="Senha" required onChange={(e)=>onChange(e)}/>
            <br></br>
            <button className="button" type='submit'>Entrar</button>
            <br></br>
            <Link to={`/cadastrar`}><button className="button">Cadastrar</button></Link>
            </form>
            <ToastContainer/>
        </div>
        </div>)
}

export default Home;