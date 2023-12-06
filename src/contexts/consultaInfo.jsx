import { createContext, useState } from "react";

export const ConsultaInfoContext = createContext({});

function ConsultaInfoProvider({children}){

    const [consultaInfo, setConsultaInfo] = useState({})

    return(
        <ConsultaInfoContext.Provider value={{consultaInfo,setConsultaInfo}}>
            {children}
        </ConsultaInfoContext.Provider>
    );
}

export default ConsultaInfoProvider;