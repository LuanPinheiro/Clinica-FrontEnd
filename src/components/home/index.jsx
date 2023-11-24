import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../apis/firebase';
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';

function Home(props){

    const [user, setUser]=useState(false);
    const [loggedUser, setLoggedUser]=useState({});
    const [rotaCadastro, setRotaCadastro ] = useState("pacientes");
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    useEffect(()=>{
        async function checkLogin(){
            onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(true);
                setLoggedUser({
                    uid:user.uid,
                    email:user.email
                })
            }else{
                setUser(false);
                setLoggedUser({});
            }
            })
        }
        checkLogin();
       },[]);
       

    async function logout(){
        await signOut(auth).then(()=>{
            toast.success("Usuário desconectado");
        });
    }

    async function getUser(){

    }

    async function tryLogin(e){
        e.preventDefault();

        await signInWithEmailAndPassword(auth, email,senha)
        .then(async ()=>{
            await getUser();
            toast.success("Logado com sucesso");
            
        })
        .catch((error)=>{
            toast.error(error.message);
        })
        
    }

    function renderHome(){
        console.log(rotaCadastro)
        return (rotaCadastro == "medicos" ? <div><Link to={"/medicos"}>
        <button className='button'>Médicos</button>
        </Link>
        
        <Link to={"/medicos"}>
            <button className='button'>Pacientes</button>
        </Link></div> : <h1>Paciente Screen</h1>)
    }

    function RadioValue(e){
        setRotaCadastro(e.target.value);
    }

    function loginScreen(){
        return (<div className="testbox">
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
        <input type="text" value={email} name="email" id="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" value={senha} name="password" id="password" placeholder="Senha" required onChange={(e)=>setSenha(e.target.value)}/>

        <br></br>
        <button className="button" type='submit'>Entrar</button>
        <br></br>
        <Link to={`/cadastrar/${rotaCadastro}`}><button className="button">Cadastrar</button></Link>
        
        </form>
    </div>);
    }

    return (<div>
        {user && (<div>
        <button onClick={()=> logout()} className='button'>Logout</button></div>)}

        <h1>{user && <h1>Olá {rotaCadastro == "medicos" ? "médico " : "paciente "}{loggedUser.email}</h1>}Bem vindo a {props.nome}</h1>

        {user ? renderHome() : loginScreen()}
        <ToastContainer/>
    </div>);
}

export default Home;