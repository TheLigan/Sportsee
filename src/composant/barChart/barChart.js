import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import './barChart.css'
import { USER_ACTIVITY} from '../../data/data'; 


function CustomTick(props) {
  const { x, y, payload } = props;

  // Convertir la date en un objet Date
  const date = new Date(payload.value);

  // Obtenir le jour
  const day = date.getDate();

  return <text x={x} y={y} dy={16} textAnchor="middle" style={{color:'gray', fontSize:"10px"}} >{day}</text>;
}

class MyBarChart extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
        data: {},
    }
  }

  componentDidMount() {
    const { id, storeDataIsOn } = this.props;
    console.log(storeDataIsOn)
    console.log(id)
    if (storeDataIsOn === true) {
      // Fetch les données depuis l'API si storeDataIsOn est true
      fetch(`http://localhost:3000/user/${id}/activity`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          this.setState({ data: jsonResponse?.data.sessions });
        });
        console.log("je passe ici")
    } else {
      // Utilisez les données depuis USER_ACTIVITY si storeDataIsOn est false
      let data2 = USER_ACTIVITY.find(user => user.userId === parseInt(id,10)).sessions;
      this.setState({ data: data2 });
      console.log(data2)
    }
  }

  render() {
    const { data } = this.state;
    //const {day, kilograms, calories} = data

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${payload[0].value}kg`}</p>
              <p className="label">{`${payload[1].value}Kcal`}</p>
            </div>
          );
        }
    }

    if (!data) {
      // Gérez le cas où data est null ou non défini, par exemple, en affichant un message d'erreur ou en rendant un composant vide.
      return <div>Données non disponibles</div>;
    }
    
    return (
      <div style={{ width: '90%', height: '250px', display: 'flex', position:"relative", justifyContent: 'center', alignItems: 'flex-start', backgroundColor:"#F4F6F6",padding:"20px",marginBottom:"10px",borderRadius:"8px"}}>
        <p className='soustitre'>Activité Quotidienne</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" horizontal={true}
              vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={<CustomTick />}/>
            <YAxis orientation="right" axisLine={false} tickLine={false} />

            <Tooltip
              offset={40}
              wrapperStyle={{ outline: "none", fontWeight: 600 }}
              content={<CustomTooltip />}
            />
            <Legend 
            height={"40px"}
            align="right" 
            verticalAlign="top"
            margin={{bottom:"20px"}}
            payload={[
                {
                  value: 'Poids (kg)',
                  type: 'circle',
                  color: 'black',
                },
                {
                  value: 'Calories brulées (kcal)',
                  type: 'circle',
                  color: 'red',
                },
              ]}
            />
            <Bar dataKey="kilogram" name="kg" fill="black" radius={[10, 10, 0, 0]}
              barSize={10} />
            <Bar dataKey="calories" name="kCal" fill="red" radius={[10, 10, 0, 0]}
              barSize={10} />
          </BarChart>
			  </ResponsiveContainer>
      </div>
    );
  }
}

export default MyBarChart;


