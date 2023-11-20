import React from 'react';

function Home(props){

    function getMedicos(){
        
    }

    return (<div>
        <h1>Bem vindo a {props.nome}</h1>
        <button onClick={getMedicos}>Médicos</button>

    </div>);
}

export default Home;