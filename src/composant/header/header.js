import logo from '../../assets/logo_sportsee.png'
import '../header/header.css'

function Header(){

    return(
        <header className="header">
            <ul>
                <li><img src={logo} alt="logo sportsee" /></li>
                <li><a href="/Accueil">Accueil</a></li>
                <li><a href="/profil">Profil</a></li>
                <li><a href="/reglages">Réglages</a></li>
                <li><a href="/Communauté">Communauté</a></li>
            </ul>
        </header>
    );
}

export default Header