import { useEffect, useState } from "react";
import { supabase } from "../client";
import defaultProfile from "../assets/profile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewCreator.css"
import Popup from "../components/Popup";
function ViewCreator(){ 
    const [showPopup, setShowPopup] = useState(false);
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
    
    const navigate = useNavigate();
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
    const handleDelete = async (e)=>{
        e.preventDefault();
        const {data, error} = await supabase.from("creators").delete().eq("id", parseInt(id.trim()));
        if (error) console.log("Fail to delete creator")
        else{
            console.log("Successfully delete creator")
            setShowPopup(false);
            navigate("/");
        }
    }
    return(
        <>
           <div className="view-creator-full">
            <div className="section-container">
                <section className="info">
                    <div className="image-container">
                        <img src={imageUrl || defaultProfile} alt="creator" />
                    </div>
                    <div className="info-detail-container">
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
                    <button onClick={()=> navigate(`/editNavigate/${id}`)}>Update</button>
                    <button onClick = { () => {
                            setShowPopup(true);
                        }
                    }>Delete</button>
                    <Popup open={showPopup} onClose={() => setShowPopup(false)}>
                        <h2>WAIT!!!!</h2>
                        <p>Are you sure you want to Delete {name}???</p>
                        <button type="button" onClick={()=> setShowPopup(false)}>NAH, NEVER MIND</button>
                        <button type="button" onClick={handleDelete}>YES!TOTALLY SURE</button>
                    </Popup>
                </section>
                </div>
            </div>
        </>)
}

export default ViewCreator;