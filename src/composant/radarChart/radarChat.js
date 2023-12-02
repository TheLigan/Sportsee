import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { USER_PERFORMANCE} from '../../data/data'; 


class MyRadarChart extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
        data: {},
    }
  }

  componentDidMount() {
    const { id, storeDataIsOn } = this.props;

    if (storeDataIsOn === true) {
      // Fetch les données depuis l'API si storeDataIsOn est true
      fetch(`http://localhost:3000/user/${id}/performance`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          this.setState({ data: jsonResponse?.data });
        });
    } else {
      // Utilisez les données depuis USER_ACTIVITY si storeDataIsOn est false
      const data2 = USER_PERFORMANCE.find(user => user.userId === parseInt(id,10));
      this.setState({ data: data2});
  }
}
  
    render(){
      const { data } = this.state;

      if (!data) {
        // Gérez le cas où data est null ou non défini, par exemple, en affichant un message d'erreur ou en rendant un composant vide.
        return <div>Données non disponibles</div>;
      }
    
      const formatKind = (kind) => {
        return data.kind[kind];
      };

    const polarGrid = false;

    if (!data) {
      // Gérez le cas où data est null ou non défini, par exemple, en affichant un message d'erreur ou en rendant un composant vide.
      return <div>Données non disponibles</div>;
    }
    
    return (
      <div style={{ width: '26%', height: '250px', backgroundColor: '#282D30', borderRadius:'10px', display: 'flex',padding:"5px", justifyContent: 'center', alignItems: 'center'}} >
          <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="50%" data={data.data}>
                  <PolarGrid radialLines={polarGrid}/>
                  <PolarAngleAxis dataKey="kind" tickFormatter={formatKind} fontSize={13}/>
                  <Radar name="performance" dataKey="value" stroke="red" fill="red" fillOpacity={0.6} />
              </RadarChart>
          </ResponsiveContainer>
      </div>
    );

  }
}

export default MyRadarChart;