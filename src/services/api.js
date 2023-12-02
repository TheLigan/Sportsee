// api.js
export async function getUserActivity(userId) {
    try {
      const url = `http://localhost:3000/user/${userId}/activity`; // Utilisation des backticks (`) pour insérer la variable dans la chaîne
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs depuis l\'API', error);
      throw error;
    }
  }

  export async function getUserAverageSession(userId) {
    try {
      const url = `http://localhost:3000/user/${userId}/average-sessions`; 
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de sessions', error);
      throw error;
    }
  }

  export async function getUserPerformance(userId) {
    try {
      const url = `http://localhost:3000/user/${userId}/performance`; 
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de performance', error);
      throw error;
    }
  }

  export async function getUserMainData(userId) {
    try {
      const url = `http://localhost:3000/user/${userId}`; 
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données base', error);
      throw error;
    }
  }

