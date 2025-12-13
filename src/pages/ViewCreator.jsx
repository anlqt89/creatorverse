import { useEffect, useState } from "react";
import { supabase } from "../client";
import defaultProfile from "../assets/profile.jpg";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewCreator.css"
import Popup from "../components/Popup";
import {
    FaExclamationTriangle,
    FaInstagram, 
    FaTwitter, 
    FaYoutube } from 'react-icons/fa';

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
            console.log("Successfully get creator", data)
            setName(data.name);
            setImageUrl(data.imageURL);
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
            console.log("Successfully delete creator", data)
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
                        <h2>{name}</h2>
                        <p>{description}</p>
                        {youtube && (
                        <a href={`https://www.youtube.com/@${youtube}`} >
                             <FaYoutube size={20}></FaYoutube> {youtube}
                        </a>
                        )}
                        {twitter && (
                        <a href={`https://x.com/${twitter}`} >
                             <FaTwitter size={30}></FaTwitter> {twitter}
                        </a>
                        )}
                        {instagram && (
                        <a href={`https://www.instagram.com/${instagram}`} >
                             <FaInstagram size={30}></FaInstagram> {instagram}
                        </a>
                        
                        )}
                    </div>
                </section>
                <section className="view-button-group">
                    <button onClick={()=> navigate(`/editCreator/${id}`)}>Update</button>
                    <button className="delete-button" onClick = { () => {
                            setShowPopup(true);
                        }
                    }>Delete</button>
                    <Popup className="popup" open={showPopup} onClose={() => setShowPopup(false)}>
                        <h2><FaExclamationTriangle className="warning-icon" size={50} /> WAIT!!!! <FaExclamationTriangle className="warning-icon" size={50} /></h2>
                        <p>Are you sure you want to delete {name}???</p>
                        <button className="pop-cancel-button" type="button" onClick={()=> setShowPopup(false)}>NAH, NEVER MIND</button>
                        <button className="pop-delete-button" type="button" onClick={handleDelete}>YES!TOTALLY SURE</button>
                    </Popup>
                   
                </section>
                </div>
            </div>
        </>)
}

export default ViewCreator;