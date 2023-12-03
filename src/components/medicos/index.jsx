import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import ListarMedicos from "./listar";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../apis/firebase";
import { signOut } from "firebase/auth";

function Medicos(){
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
        <h1>Menu de Médicos</h1>
        <Link to={"/medicos/cadastrar"}> <button className="button">+Médico</button> </Link>
        {ListarMedicos()}
    </div>
    );
}

export default Medicos;