import React, {useEffect, useState} from 'react'
import {withRouter, useParams} from 'react-router-dom'
import {getEspacioById} from "api/espacios"
import {Typography } from "@material-ui/core"

const DetalleEspacio = (props) => {
    const [espacio, setEspacio] = useState({})
    const {idEspacio}  = useParams();

    useEffect(()=> {
        async function fetchEspacio(){
             const result = await getEspacioById(idEspacio)
             if(result.status === "OK"){ 
                 setEspacio(result.data)
             } else {
                 alert("Error")
             }
        }

        if(props.location.state && props.location.state.espacio){
            setEspacio(props.location.state.espacio)
        } else {
            fetchEspacio();
        }

    }, [props])
    
    return (
        <div>
            <Typography variant="h2">{espacio.nombre}</Typography>
            <Typography>{espacio.descripcion}</Typography>
        </div>
    )

}

export default withRouter(DetalleEspacio);
