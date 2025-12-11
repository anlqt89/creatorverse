import "../styles/Header.css";
export default function Header({id, name, url, description, imageURL, youtube, twitter, instagram}){
    return (
        <header> 
            <h1>CREATORVERSE</h1>
            <nav>
            <a href="/" role="button"> View All Creators</a>
            <a href="/AddCreator" role="button"> Add A Creators</a>
            </nav>
        </header>            
    )
}