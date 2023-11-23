import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/home';
import Medicos from '../components/medicos';
import Error from '../components/error';
import Menu from '../components/menu';
import CadastrarMedico from '../components/medicos/cadastro';

function Rotas() {
    return (<BrowserRouter>
        <Menu/>
        <Routes>
            <Route exact path="/" element={<Home nome="Minha Clínica"/>} />
            <Route path="/medicos" element={<Medicos/>} />
            <Route path="/medicos/cadastrar" element={<CadastrarMedico/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>);
   } export default Rotas;
   