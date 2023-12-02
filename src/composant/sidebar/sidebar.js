import './sidebar.css'
import Icons from '../sportsIcon/sportsIcon'

function Sidebar(){

    return(
        <aside className='sidebar'>
            <Icons name='fa-solid fa-table-tennis-paddle-ball' />
            <Icons name='fa-solid fa-person-swimming' />
            <Icons name='fa-solid fa-person-biking' />
            <Icons name='fa-solid fa-dumbbell' />  
            <p className='copyright'>Copyright SportSee 2023</p>
        </aside>
    );
}

export default Sidebar