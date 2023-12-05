import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import ListarPacientes from "./listar";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../apis/firebase";
import { signOut } from "firebase/auth";

function Pacientes(){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    async function logout(){
        await signOut(auth).then(()=>{
            navigate("/")
        });
    }

    return (
    <div>
        <button onClick={()=> logout()} className='button'>Logout</button>
        <h1>Menu de Pacientes</h1>
        <Link to={"/pacientes/cadastrar"}> <button className="button">+Paciente</button> </Link>
        {ListarPacientes()}
    </div>
    );
}

export default Pacientes;