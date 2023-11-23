import React from 'react';
import { Link } from 'react-router-dom';

function Home(props){

    return (<div>
        <h1>Bem vindo a {props.nome}</h1>
        <Link to="/medicos">
            <button>Médicos</button>
        </Link>

    </div>);
}

export default Home;