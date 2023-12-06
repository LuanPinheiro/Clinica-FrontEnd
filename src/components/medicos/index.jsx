import ListarMedicos from "./listar";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../apis/firebase";
import { signOut } from "firebase/auth";

function Medicos(){
    const navigate = useNavigate();

    async function logout(){
        await signOut(auth).then(()=>{
            navigate("/")
        });
    }

    return (
    <div>
        <button onClick={()=> logout()} className='button-logout'>Logout</button>
        <h1>Menu de Médicos</h1>
        <Link to={"/medicos/cadastrar"}> <button className="button-add">+Médico</button> </Link>
        {ListarMedicos()}
    </div>
    );
}

export default Medicos;