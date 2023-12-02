import React, { PureComponent } from "react";
import styled from "styled-components";
import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { USER_AVERAGE_SESSIONS} from '../../data/data'; 


class ChartLine extends PureComponent {

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
      fetch(`http://localhost:3000/user/${id}/average-sessions`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          this.setState({ data: jsonResponse?.data.sessions });
        });
    } else {
      // Utilisez les données depuis USER_ACTIVITY si storeDataIsOn est false
      const data2 = USER_AVERAGE_SESSIONS.find(user => user.userId === parseInt(id,10)).sessions;
      this.setState({ data: data2 });
    }
  }
  
  render(){
    const { data } = this.state;
    if (!data) {
      // Gérez le cas où data est null ou non défini, par exemple, en affichant un message d'erreur ou en rendant un composant vide.
      return <div>Données non disponibles</div>;
    }
  
    return (
      <div style={{ width: '27%', height: '250px', backgroundColor: 'red', borderRadius:'10px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'30px'}} >
        <CustomLine>
          <div className="title">
            Durée moyenne des sessions
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ bottom: 10 }} >
              <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF"
                strokeWidth={2.5} dot={false}
              />
  
              <XAxis dataKey="sessionLength" />
  
              <Tooltip cursor={false}
                wrapperStyle={{ outline: "none", fontWeight: 600 }}
                labelFormatter={value => `${value} min`}
              />
  
            </LineChart>
          </ResponsiveContainer>
          <div className="legend">
            <p>L</p>
            <p>M</p>
            <p>M</p>
            <p>J</p>
            <p>V</p>
            <p>S</p>
            <p>D</p>
          </div>
        </CustomLine>
      </div>
    )
  }
}


const CustomLine = styled.div`
		display:flex;
		flex-direction: column;
		position:relative;
		border-radius: 5px;
		width:100%;
    height : 250px;
		font-size: 12px; 

		.title {
			color: white;
			font-weight: 600;
			padding-top: 30px;
			padding-left: 30px;
			font-size: 15px;
			max-width: 200px;
			line-height: 24px;
		}
	
		.legend { 
      color:white;
			display: flex;
			padding-bottom: 25px;
			justify-content: space-between;	
		}

		.recharts-tooltip-item-list,.xAxis {
			display: none;
		}
`; 
export default ChartLine;