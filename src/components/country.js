import react from "react"
import axios from "axios"
import addSubtractDate from "add-subtract-date"

import names from "../files/country.json"

function printtable(all){
console.log(all[0].Date)

const tab=document.querySelector('#tofrom');
tab.innerHTML= 
` <tr>
<th>Date</th>
<th>Confirmed</th>
<th>Deaths</th>
<th>Recovered</th>
<th>Active</th>
</tr>`



+all.map(ele=>{
    return ` <tr>
    <td>${ele.Date.slice(0,10)}</td>
    <td>${ele.Confirmed}</td>
    <td>${ele.Deaths}</td>
    <td>${ele.Recovered}</td>
    <td>${ele.Active}</td>
</tr>`;
}).join('');


//     return  ( <table>
//            <td>
//                <th>Confirmed</th>
//                <th>Deaths</th>
//                <th>Recovered</th>
//                <th>Active</th>
//            </td>
//   { all.map((ele)=>{
      
//    <tr>
//        <td>{ele.Confirmed}</td>
//        <td>{ele.Deaths}</td>
//        <td>{ele.Recovered}</td>
//        <td>{ele.Active}</td>
//    </tr>
//    })
// }
//    </table>);

  
   }

   

class Country extends react.Component{

    
    constructor(props){
        super(props);
        this.state={
            today:{},
            all:{},
            from:"",
            to:""
        }
    }




    componentDidMount(){
    //   this.setState({
    //       from:'{new Date}'
    //   })
    const date=new Date;
    const date2=new Date;
    const year=date.getFullYear();
    const month=date.getMonth();
    var day=date.getDate();

    const from=document.querySelector(`[name="from"]`);
    const to =document.querySelector(`[name="to"]`);
    console.log(date.getMonth)
    to.value=`${year}-${month+1}-${day}`;
    
    from.value=`${year}-${month}-${addSubtractDate.subtract(date2, 10, "days").getDate()}`;
        axios.get("https://api.covid19api.com/country/vietnam?from="+from.value+"T00:00:00Z&to="+to.value+"T00:00:00Z").then(response=>{
            this.setState({today:response.data.slice(-1).pop(),
                all:response.data
            })
            console.log(this.state.today)
            printtable(this.state.all);
        });



    }


     submit = (e)=> {
             
e.preventDefault();
       
   
const country=document.querySelector("#selectcountry").value;

        const from=document.querySelector(`[name="from"]`);
        const to =document.querySelector(`[name="to"]`);

        const ele=document.querySelector('select').value;
        console.log(ele)
        const url="https://api.covid19api.com/country/"+country+"?from="+from.value+"T00:00:00Z&to="+to.value+"T00:00:00Z";
        console.log(url)
        axios.get("https://api.covid19api.com/country/"+country+"?from="+from.value+"T00:00:00Z&to="+to.value+"T00:00:00Z").then(response=>{
           
            this.setState({
            all:response.data})
            printtable(this.state.all);
        })




    }

    render(){
        return <div>
            
<form >
    <label for="countries">View by country</label>
    <select name="countries" id="selectcountry">
      {
          names.map(name=>{
              return <option value={name.Slug}>{name.Country} </option>
          })
      }
    </select>
    <input type="submit" onClick= {this.submit} value="Search"/>
</form>
<h3>Today's Stats</h3>
<table>
    
    <tr>
        <td>Confirmed</td>
        <td>{this.state.today.Confirmed}</td>
        </tr>
      
    <tr>
        <td>Deaths</td>
           <td>{this.state.today.Deaths}</td> 
    </tr>
   
    <tr>
        <td>Recovered</td>
           <td>{this.state.today.Recovered}</td> 
    </tr>

    <tr>
        <td>Active</td>
           <td>{this.state.today.Active}</td> 
    </tr>
   
</table>





<form >
    <label for="from">From:</label>
    <input type="date" name="from" id="date" />
    <label for="to">To</label>
    <input type="date" name="to" id="date"/>
    <input type="submit" value="Search" onClick={this.submit}/>
</form>

<h3>Total Cases</h3>
<table id="tofrom">
    
        <tr>
        <td>Confirmed</td>
           <td></td> 
    </tr>
    
    <tr>
        <td>Deaths</td>
           <td></td> 
    </tr>
    

    <tr>
        <td>Recovered</td>
           <td></td> 
    </tr>
</table>
  </div>
    }
}


export default Country;