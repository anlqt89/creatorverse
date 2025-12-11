import { useEffect, useState } from "react";
import { supabase } from "../client";
import defaultProfile from "../assets/profile.jpg";
import { useParams } from "react-router-dom";
import "../ViewCreator.css"

function ViewCreator(){ 

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const { id } = useParams();

    useEffect(()=>{
        getCreator();
    }, [])
   
    const getCreator = async ()=>{

        console.log("URL param id =", JSON.stringify(id));
        console.log("Clean ID =", parseInt(id.trim()), "type =", typeof parseInt(id.trim()));

        const {data, error} = await supabase.from("creators").select("*").eq("id", parseInt(id.trim())).single();
        if (error) {
            console.log("Fail to get creator");
            
        }else{
            setName(data.name);
            setImageUrl(data.imageUrl);
            setUrl(data.url);
            setDescription(data.description);
            setYoutube(data.youtube);
            setTwitter(data.twitter);
            setInstagram(data.instagram);
        }
    }
    return(
        <>
           <div className=".view-creator">
                <section className="info">
                    <div>
                    <img src={imageUrl || defaultProfile} alt="creator" />
                    </div>
                    <div>
                        <label>{name}</label>
                        <p>{description}</p>
                        {youtube && (
                        <a href={`https://www.youtube.com/@${youtube}`} >
                            YouTube
                        </a>
                        )}
                        {twitter && (
                        <a href={`https://x.com/${twitter}`} >
                            X
                        </a>
                        )}
                        {instagram && (
                        <a href={`https://www.instagram.com/${instagram}`} >
                            instagram
                        </a>
                        )}
                    </div>
                </section>
                <section className="button-group">
                    <button>Update</button>
                    <button>Delete</button>
                </section>
            </div>
        </>)
}

export default ViewCreator;