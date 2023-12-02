import "../info-users/info-users.css"

function UsersInfo(props){
    const color = props.color;
    const icon = props.icon;
    const value = props.value;
    const sousTitre = props.sousTitre;
    const unite = props.unite;
    const colorBackground = props.colorBackground;
    
    return(
        <div className='infos'>
            <div className='icon' style={{backgroundColor:colorBackground}}><i className={icon} style={{color:color}}></i></div>
            <div className='infos-texte'>
                <p className="titre">{value}{unite}</p>
                <p className='sous-titre'>{sousTitre}</p>
            </div>
        </div>
    );
}

export default UsersInfo