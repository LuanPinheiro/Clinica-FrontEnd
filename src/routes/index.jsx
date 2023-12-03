import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/home';
import Error from '../components/error';
import CadastrarMedico from '../components/medicos/cadastro';
import Consulta from '../components/consultas';
import Cadastro from '../components/cadastro';
import Medicos from '../components/medicos';
import EditarMedico from '../components/medicos/editar';

function Rotas() {
    return (<BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home nome="Clínica PWEB"/>}/>
            <Route path="/cadastrar" element={<Cadastro/>}/>
            <Route path="/medicos" element={<Medicos/>}/>
            <Route path="/medicos/cadastrar" element={<CadastrarMedico/>}/>
            <Route path="/medicos/editar" element={<EditarMedico/>}/>
            <Route path="/consultas" element={<Consulta/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>);
   } export default Rotas;
   