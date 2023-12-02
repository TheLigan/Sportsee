import React, { useState, useEffect } from 'react';
import { USER_MAIN_DATA } from '../../data/data'; 
import Sidebar from '../../composant/sidebar/sidebar';
import '../profil/profil.css';
import MyBarChart from '../../composant/barChart/barChart';
import UsersInfo from '../../composant/info-users/info-users';
import MyAreaChart from '../../composant/areaChart/AreaChart';
import MyRadarChart from '../../composant/radarChart/radarChat';
import ChartScore from '../../composant/scoreChart/scoreChart';
import {getUserMainData} from '../../services/api'

function Profil() {
  const storedUserId = localStorage.getItem('selectedUserId');
  const storeDataIsOn = localStorage.getItem('isOn');
  var isAPI = true;
  console.log(storeDataIsOn);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Vérifiez si isOn est true avant d'appeler fetchUserData
    if (storeDataIsOn === 'true') {
      async function fetchUserDataMainData() {
        try {
          const dataTest = await getUserMainData(storedUserId);
          setUserData(dataTest.data); // Assurez-vous d'extraire les données correctement
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur', error);
        }
      }
      fetchUserDataMainData();
    }
  }, [storedUserId, storeDataIsOn]); 
  

  // Initialisez les variables pour stocker les données en fonction de storeDataIsOn
  let selectedUser;

  if (storeDataIsOn === "true" && userData ) {
    // Utilisez les données de l'API
    selectedUser = userData; 
    isAPI = true;
  } else if (storeDataIsOn === "true" && !userData) {
    return (
      <section className="dashboardBody">
        <h1>Impossible d'atteindre les données</h1>
      </section>
    )
  }
  else if(storeDataIsOn === "false"){
    // Mockez les données
    selectedUser = USER_MAIN_DATA.find(user => user.id === parseInt(storedUserId, 10));
    isAPI = false;
  }

  // Initialisation du score score en fonction de selectedUser
  //score = selectedUser ? (selectedUser.score != null ? selectedUser.score : selectedUser.todayScore) : 0;

  return (
    <section className="dashboardBody">
      <Sidebar />
      
      {selectedUser ? (
        // Info utilisateurs 
        <section className="dashboard">
          <h1 className="intro">
            Bonjour <span id="prenom">{selectedUser.userInfos.firstName} </span>
          </h1>
          <p className='intro'>Félicitations, vous avez explosé vos objectifs hier. { isAPI ? "Provenant de l'API" : "mock"}</p>

          <div className='gaph_users'>
            <section className='graph'>
              <div className='graph__haut'>
                <MyBarChart id={storedUserId} storeDataIsOn={storeDataIsOn}/>
              </div>
              <div className='graph__bas'>
                <MyAreaChart id={storedUserId} storeDataIsOn={storeDataIsOn}/>
                <MyRadarChart id={storedUserId} storeDataIsOn={storeDataIsOn}/>
                <ChartScore id={storedUserId} storeDataIsOn={storeDataIsOn}/>
              </div>
            </section>
            <section className='userInfos'>
              <UsersInfo icon="fa-solid fa-fire" value={selectedUser.keyData.calorieCount} sousTitre="Calories" unite="kCal" color="rgba(255, 0, 0, 1)" colorBackground="rgba(255, 0, 0, 0.1)"/>
              <UsersInfo icon="fa-solid fa-drumstick-bite" value={selectedUser.keyData.proteinCount} sousTitre="Protéines" unite="g" color="rgba(74, 184, 255, 1)" colorBackground="rgba(74, 184, 255, 0.1)"/>
              <UsersInfo icon="fa-brands fa-apple" value={selectedUser.keyData.carbohydrateCount} sousTitre="Glucides" unite="g" color="rgba(249, 206, 35, 1)" colorBackground="rgba(249, 206, 35, 0.1)"/>
              <UsersInfo icon="fa-solid fa-burger" value={selectedUser.keyData.lipidCount} sousTitre="Lipides" unite="g" color="rgba(253, 81, 129, 1)" colorBackground="rgba(253, 81, 129, 0.1)"/>                
            </section>
          </div>        
        </section>
      ) : (
        <div>Veuillez sélectionner un utilisateur dans les réglages</div>
      )}
    </section>
  );
}

export default Profil;
