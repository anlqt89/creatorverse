import { useNavigate } from "react-router-dom"
import "./Card.css"

export const Card = ({id, name, url, description, imageURL, youtube, twitter, instagram}) => {
    const navigate = useNavigate();

    return(
        <div className="creator-card" style={{ backgroundImage: `url(${imageURL})` }}>
            <section className="name">
                <label>{name}</label>
                <div className="button-group">
                    <button className="view-creator" onClick={()=>{
                        navigate(`/viewCreator/${id}`)
                    }}>View</button>
                    <button className="edit-creator">Edit</button>
                </div>
            </section>
            <section className="social-medias">
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
            </section>
            <section className="description">
                {description}
            </section>
        </div>
        )
}