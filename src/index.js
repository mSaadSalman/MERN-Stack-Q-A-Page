import React, { useState, useEffect} from "react";
import {createRoot} from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm";
import ErrorCard from "./components/ErrorCard";

function App(){
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        async function go(){
            const response = await Axios.get("/api/errors")
            setErrors(response.data)
        }
        go()
    },[])

    return (
        <div className="container">
            <p><a href="/">&laquo; Back to public homepage</a></p>
            <h1>Testing</h1>
            <CreateNewForm setErrors={setErrors}/>
            <div className="error-grid">
            {errors.map(function (error){
                return <ErrorCard key={errors._id} Name={error.Name} Details={error.Details} photo={error.photo} id={error._id} setErrors={setErrors}/>
            })}
            </div>
        </div>
    )
}



const root = createRoot(document.querySelector("#app"))
root.render(<App />)