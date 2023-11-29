import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/home';
import Medicos from '../components/medicos';
import Error from '../components/error';
import Menu from '../components/menu';
import CadastrarMedico from '../components/medicos/cadastro';
import Consulta from '../components/consultas';

function Rotas() {
    return (<BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home nome="Clínica PWEB"/>} />
            <Route path="/medicos" element={<Medicos/>} />
            <Route path="/cadastrar/medicos" element={<CadastrarMedico/>}/>
            <Route path="/medicos/consultas" element={<Consulta/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>);
   } export default Rotas;
   