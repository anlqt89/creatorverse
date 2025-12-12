import { supabase } from "../client"
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function AddCreator(){
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    const navigate = useNavigate();

    const  handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HANDLE SUBMIT CALLED");
        const newCreator = {
            name: name,
            url: url,
            description: description,
            imageURL: image,
            youtube: youtube,
            twitter: twitter,
            instagram: instagram
          };

        
        const { data, error } = await supabase
          .from("creators")
          .insert([newCreator]);
    
        if (error) {
          console.error("Error:", error);
          alert("Failed to add creator.");
        } else {
          alert("Creator added!");
          console.error("Creator added: ", newCreator);
          navigate("/ViewCreator/"); 
        }
    }

    return(
        <>
          <Header></Header>
          <div className="content" id="add-creator">
             <form onSubmit={handleSubmit}>
                <div className="creator-form-group">
                    <label>Name</label>
                    <input type="text" onChange={(e) => {setName(e.target.value); setUrl("http://localhost:5173/" + e.target.value)}} required /> 
                </div>
                <div className="creator-form-group">
                    <label>Imamge</label>
                    <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                    <input type="text" onChange={(e) => setImage(e.target.value)} /> 
                </div>
                <div className="creator-form-group">
                    <label>Description</label>
                    <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} rows={4} />
                </div>
                <div className="creator-form-group">
                    <h3>Social Media Links</h3>
                    <p>Provide at least one of the creator's social media links.</p>
                    
                </div>
                <div className="creator-form-group">
                    <label>YouTube</label>
                    <p>The creator's YouTube handle (without the @)</p>
                    <input type="text" onChange={(e) => setYoutube(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <label>Twitter</label>
                    <p>The creator's Twitter handle (without the @)</p>
                    <input type="text" onChange={(e) => setTwitter(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <label>Instagram</label>
                    <p>The creator's Instagram handle (without the @)</p>
                    <input type="text" onChange={(e) => setInstagram(e.target.value)}  /> 
                </div>
                <div className="creator-form-group">
                    <button className="button">Submit</button>
                </div>
            </form>
          </div>
        </>)
}


export default AddCreator;