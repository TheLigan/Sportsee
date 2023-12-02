import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USER_MAIN_DATA } from '../../data/data'; 
import Sidebar from '../../composant/sidebar/sidebar'
import '../profil/profil.css'


function Reglages() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOn, setIsOn] = useState(() => {
    const savedState = localStorage.getItem('isOn');
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isOn', JSON.stringify(isOn));
  }, [isOn]);

  const handleToggle = () => {
    setIsOn(prevState => !prevState);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('selectedUserId');
    if (storedUserId) {
      setSelectedUser(parseInt(storedUserId, 10));
    }
  }, []);

  const handleUserChange = (event) => {
    const userId = parseInt(event.target.value, 10);
    setSelectedUser(userId);
    localStorage.setItem('selectedUserId', userId.toString());
  };

  return (
    <section className="dashboardBody">
      <Sidebar />
      <section className="dashboard">
      <h1>Réglages</h1>
      <label htmlFor="selectUser">Sélectionnez un utilisateur :</label>
      <select id="selectUser" onChange={handleUserChange} value={selectedUser || ''}>
        <option value="">Sélectionnez un utilisateur</option>
        {USER_MAIN_DATA.map(user => (
          <option key={user.id} value={user.id}>
            {user.userInfos.firstName} {user.userInfos.lastName}
          </option>
        ))}
      </select>



      {selectedUser ? (
        <Link to="/profil">Voir le profil</Link> 
      ): <div></div>
      }

      <div>
        <label className="switch">
          <input type="checkbox" checked={isOn} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <p> {isOn ? 'Les données proviennent de l\'API' : 'Les données sont mockées'}</p>
      </div>

      </section>

    </section>
  );
}

export default Reglages;