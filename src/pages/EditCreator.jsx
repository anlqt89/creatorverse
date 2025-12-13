import { supabase } from "../client"
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/Popup";
import {FaExclamationTriangle // <-- Add this icon here
} from 'react-icons/fa';
function EditCreator(){
    //Get ID from params:
    const {id} = useParams();

    //Popup when deleting
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    //Get Creator
    useEffect(() => {
        getCreator();
    }, []);

    const navigate = useNavigate();
    const getCreator = async ()=>{

        console.log("URL param id =", JSON.stringify(id));
        console.log("Clean ID =", parseInt(id.trim()), "type =", typeof parseInt(id.trim()));

        const {data, error} = await supabase.from("creators").select("*").eq("id",parseInt(id.trim())).single();

        if (error){
            console.log("Get creator fails");
        }else{
            console.log("Successully get creator", data);
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
            console.log("Successfully delete creator")
            setShowPopup(false);
            navigate("/");
        }
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {data, error} = await supabase.from("creators").update(
            {
                name: name,
                description: description,
                imageURL: imageUrl,
                youtube: youtube,
                twitter: twitter,
                instagram: instagram
            }
        ).eq("id", parseInt(id.trim()));

        if (error) {
            console.log("Fail to update creators");
        }else{
            console.log("Succesfully update creators: ", data);
            getCreator();
        }
        
    }

    return(
        <>
          <Header></Header>
          <div className="content" id="add-creator">
             <form className="modify-creator-form" onSubmit={handleSubmit}>
                <div className="creator-form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value); setUrl("http://localhost:5173/" + e.target.value)}} required /> 
                </div>
                <div className="creator-form-group">
                    <label>Imamge</label>
                    <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                    <input type="text" value={imageUrl} onChange={(e) => setImage(e.target.value)} /> 
                </div>
                <div className="creator-form-group">
                    <label>Description</label>
                    <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                </div>
                <div className="creator-form-group">
                    <h3>Social Media Links</h3>
                    <p>Provide at least one of the creator's social media links.</p>
                </div>
                <div className="creator-form-group">
                    <label>YouTube</label>
                    <p>The creator's YouTube handle (without the @)</p>
                    <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <label>Twitter</label>
                    <p>The creator's Twitter handle (without the @)</p>
                    <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <label>Instagram</label>
                    <p>The creator's Instagram handle (without the @)</p>
                    <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <div className="edit-button-group">
                        <button type="submit" >Submit</button>
                        <button className="delete-button" type="button" onClick={() =>{
                            setShowPopup(true);
                        }}>Delete</button>
                        <Popup className="popup" open={showPopup} onClose={() => setShowPopup(false)}>
                            <h2><FaExclamationTriangle className="warning-icon" size={50} /> WAIT!!!! <FaExclamationTriangle className="warning-icon" size={50} /></h2>
                            <p>Are you sure you want to delete {name}???</p>
                            <button className="pop-cancel-button" type="button" onClick={()=> setShowPopup(false)}>NAH, NEVER MIND</button>
                            <button className="pop-delete-button" type="button" onClick={handleDelete}>YES!TOTALLY SURE</button>
                        </Popup>
                    </div>
                </div>
            </form>
          </div>
        </>)
}


export default EditCreator;