import React, { Component } from 'react';
import './user.css';
let vType=0;
class User extends Component {
	constructor(props)
	{
		super(props);
		this.state ={
		count:0,
		results:[],
		name:'',
		number:''
	};

	}

	checkCompanyName = () =>
	{
			if(vType===0)
			{
				alert("Please select vehicle type...");
			}
			else
			{
			fetch("http://localhost:4567/show_company_details_name/"+this.state.name+"/0/0/0/0/0/0/0")
      .then(res => res.json())
      .then((result) => {  
          this.setState({
             results: result[0].results
          });
         
          if((this.state.results.car_space ==0 && vType==1) || (this.state.results.bike_space ==0 && vType==2))
          	{
          		console.log("2");
          		this.setState({count:2});
          	}
          	else
          	{
          		this.setState({count:3});
          	}
        },
        (error) => {
          console.log(error);
        }
      )
   	}
		
	}

	handleChange = (e) =>
	{
		//console.log(e.target.value);
		this.setState({name:e.target.value});
	}

	park = ()=>
	{
		var arg1 = "bike"
		if(vType==1)
			arg1 = "car";
			fetch("http://localhost:4567/add_parking_details/"+this.state.name+"/0/0/0/"+arg1+"/"+this.state.number+"/0/0")
      .then(res => res.json())
      .then((result) => {         
          console.log(result);
           this.getData();
        },
        (error) => {
          console.log(error);
        }
      )	
	}

	handleNumber = (e) =>
	{
		this.setState({number:e.target.value});
		console.log(this.state.number);
	}

	vehicleType = (e) =>
	{
			(e.target.value==="car")?vType=1:vType=2;
	}

 render() {
 		
 		const notFound = 
 		<p>Not found</p>
 		;

 		function TableData(props)
 		{
 				const Rows = props.rows.map((m)=>
		 	 	<tr>
        <td key={m.id}>
        	{m.id}
        </td>
        <td key={m.company_name}>
        	{m.company_name}
        </td>
        <td key={m.tower_name}>
        	{m.tower_name}
        </td>
        <td key={m.car_space}>
        	{m.car_space}
        </td>
        <td key={m.bike_space}>
        	{m.bike_space}
       	</td>
        </tr>
     );
     return (
        <tbody>{Rows}</tbody>
     );		
 		}

 		function ParkForm (props)
 		{ 
 			return(
 				<div className="form-inline-block">
				 	<div className="container-fluid">
     				<div className="container1">  
			        <label >Vehicle Number : </label>
			        <input type="text" className="form-control" onChange = {props.handleNumber} name="number" />
			      </div>		   
			   	</div>
				  <button onClick={props.park} type="submit" className="btn btn-default">PARK</button>
				</div>
		)}

 		const vehicleEntry = 
			<div className="edit_delete">
		   <h4>ALLOTED DETAILS</h4>
			   <table className="table table-bordered">
			      <tr>
			         <td>ID</td>
			         <td>COMPANY NAME</td>
			         <td>TOWER NAME</td>
			         <td>BIKE PARKING SPACE</td>
			         <td>CAR PARKING SPACE</td>
			      </tr>
			     
			         <TableData rows = {this.state.results}/>
			     
			   </table>

			  <ParkForm park = {this.park} change = {this.handleChange}/>

			</div>
 		;

 		const none =  null;

 		const spaceFull = <p>Sorry..! Parking is full...</p>

    return (
    	<div>
    		<center>
     			<h1>User</h1>
     					<div className="container-fluid">
     					<div className="container1">
     					<p>Select your vehicle type</p>
     					<div className="btn-group">
     						<button onClick={this.vehicleType} className ="v_type" value="car">Car</button>
     						<button onClick={this.vehicleType} className ="v_type" value="bike">Bike</button>
     					<p></p>
     					
     					</div>
			      	<p></p> 
			      	Company Name 
			      	
			      	<input type="text" onChange={this.handleChange} className="form-control" name="name"/>
			      	</div>
							</div>
		   		<button onClick={this.checkCompanyName} className="button">GET PARKING DETAILS</button>

	   			{this.state.count===1 ? notFound:none}
	   			{this.state.count===2 ? spaceFull:none}
	   			{this.state.count===3 ? vehicleEntry:none}

				</center>
		    	</div>
    );
  }
}

export default User;
