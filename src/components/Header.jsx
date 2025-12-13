import "./Header.css";

export default function Header(){
    return (
        <header> 
            <h1>CREATORVERSE</h1>
            <nav>
            <a href="/" role="button"> View All Creators</a>
            <a href="/AddCreator" role="button"> Add A Creator</a>
            </nav>
        </header>            
    )
}