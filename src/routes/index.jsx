import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/home';
import Error from '../components/error';
import CadastrarMedico from '../components/medicos/cadastro';
import Consulta from '../components/consultas';
import Cadastro from '../components/cadastro';
import Medicos from '../components/medicos';
import EditarMedico from '../components/medicos/editar';
import MarcarConsulta from '../components/consultas/marcar';
import MarcarForm from '../components/consultas/marcarform';
import DesmarcarConsulta from '../components/consultas/desmarcar';
import Pacientes from '../components/pacientes';
import CadastrarPaciente from '../components/pacientes/cadastro';
import EditarPaciente from '../components/pacientes/editar';

function Rotas() {
    return (<BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home nome="Clínica PWEB"/>}/>
            <Route path="/cadastrar" element={<Cadastro nome="Clínica PWEB"/>}/>
            <Route path="/medicos" element={<Medicos/>}/>
            <Route path="/medicos/cadastrar" element={<CadastrarMedico/>}/>
            <Route path="/medicos/editar" element={<EditarMedico/>}/>
            <Route path="/pacientes" element={<Pacientes/>}/>
            <Route path="/pacientes/cadastrar" element={<CadastrarPaciente/>}/>
            <Route path="/pacientes/editar" element={<EditarPaciente/>}/>
            <Route path="/consultas" element={<Consulta/>}/>
            <Route path="/consultas/marcar" element={<MarcarConsulta/>}/>
            <Route path="/consultas/desmarcar" element={<DesmarcarConsulta/>}/>
            <Route path="/consultas/marcar/form" element={<MarcarForm/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>);
   } export default Rotas;
   