import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Header from "../components/Header";
import "./ShowCreators.css"
import { supabase } from "../client";
function ShowCreators(){
    const [creators, setCreators] = useState([]);
    useEffect(() =>
    {
        fetchCreators();
    }, []); 

    const fetchCreators = async () =>{
        const {data, error} = await supabase.from("creators").select("*");
        if (error){
            console.log("Errors to load creators:", error)
        }else{
            console.log("Fetch creators successfully")
            setCreators(data)
            console.log(data)
        }
    }
    return(
    <>
        <Header></Header>
        <div className="bottom-container">
            <div className="card-container">
                {creators.length == 0 && <p>No Creator yet</p>}
                {creators.map((creator) => (
                    <Card 
                    key={creator.id}
                    id={creator.id}
                    name={creator.name}
                    url={creator.url}
                    description={creator.description}
                    imageURL={creator.imageURL}
                    youtube={creator.youtube}
                    twitter={creator.twitter}
                    instagram={creator.instagram}></Card>
                ))}
            </div>
        </div>
    </>)
}


export default ShowCreators;