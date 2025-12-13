import { useNavigate } from "react-router-dom"
import "./Card.css"
import { FaInfoCircle, 
    FaEdit, 
    FaInstagram, 
    FaTwitter, 
    FaYoutube } from 'react-icons/fa';
export const Card = ({id, name, url, description, imageURL, youtube, twitter, instagram}) => {
    const navigate = useNavigate();

    return(
        <div className="creator-card" 
            style={{ 
                backgroundImage:  `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageURL || "../assets/profile.jpg"})` 
            }}
        >
            <section className="name">
                <label>{name}</label>
                <div className="button-group">
                    <button className="icon-btn" 
                        title="View"
                        onClick={()=>{
                        navigate(`/viewCreator/${id}`)

                    }}><FaInfoCircle size={25} /></button>
                    <button className="icon-btn" onClick={()=>{
                        navigate(`/editCreator/${id}`)
                    }}><FaEdit size={25} /></button>
                </div>
            </section>
            <section className="social-medias">
                {youtube && (
                <a href={`https://www.youtube.com/@${youtube}`} >
                     <FaYoutube size={30}></FaYoutube>
                </a>
                )}
                {twitter && (
                <a href={`https://x.com/${twitter}`} >
                    <FaTwitter size={30}></FaTwitter>
                </a>
                )}
                {instagram && (
                <a href={`https://www.instagram.com/${instagram}`} >
                    <FaInstagram size={30}></FaInstagram>
                </a>
                )}
            </section>
            <section className="description">
                {description}
            </section>
        </div>
        )
}