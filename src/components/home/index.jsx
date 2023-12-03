import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../apis/firebase';
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../contexts/user';

function Home(){

    const [isLogged, setIsLogged]= useState(false);
    const [loggedUser, setLoggedUser]=useState({});
    const [rotaLogin, setRotaLogin ] = useState("pacientes");
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        async function checkLogin(){
            onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsLogged(true);
                setLoggedUser({
                    email:user.email
                })
            }else{
                setIsLogged(false);
                setLoggedUser({});
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
            toast.success("Logado com sucesso");
            navigate(`/${rotaLogin}`);
        })
        .catch((error)=>{
            toast.error(error.message);
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

    return (<div className="loginbox">
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
            <input type="text" value={user.email} name="email" id="email" placeholder="Email" required onChange={(e)=>onChange(e)}/>
            <input type="password" value={user.senha} name="senha" id="senha" placeholder="Senha" required onChange={(e)=>onChange(e)}/>
            <br></br>
            <button className="button" type='submit'>Entrar</button>
            <br></br>
            <Link to={`/cadastrar`}><button className="button">Cadastrar</button></Link>
            </form>
            <ToastContainer/>
        </div>)
}

export default Home;