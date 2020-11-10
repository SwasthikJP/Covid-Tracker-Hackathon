import react from "react"
import axios from "axios"

class World extends react.Component{
    constructor(props){
        super(props);
        this.state={
            world:{}
        }
    }

    componentDidMount(){
        axios.get("https://api.covid19api.com/summary").then(response=>{
            this.setState({world:response.data.Global})
        })
    }

    render(){
        return <div>
            <h3>Today's Global Stats</h3>
              <table>
        
        <tr>
            <td>Confirmed</td>
    <td>{this.state.world.NewConfirmed}</td>
            </tr>
          
        <tr>
            <td>Deaths</td>
               <td>{this.state.world.NewDeaths}</td> 
        </tr>
       
        <tr>
            <td>Recovered</td>
               <td>{this.state.world.NewRecovered}</td> 
        </tr>

       
    </table>
    <h3>Total Cases</h3>
    <table>
       
            <tr>
            <td>Confirmed</td>
               <td>{this.state.world.TotalConfirmed}</td> 
        </tr>
        
        <tr>
            <td>Deaths</td>
               <td>{this.state.world.TotalDeaths}</td> 
        </tr>
        

        <tr>
            <td>Recovered</td>
               <td>{this.state.world.TotalRecovered}</td> 
        </tr>
    </table>
            </div>

    }
}


export default World;