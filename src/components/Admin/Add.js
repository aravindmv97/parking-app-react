import React, { Component } from 'react';
import './admin.css';
import {Link} from "react-router-dom";

export class Add extends Component {
constructor() {
  super();
  this.state={
  	results:[],
  	t_cname:'',t_tname:'',t_cspace:'',t_bspace:''
  };
  this.getData();
}

getData()
	{		
	   fetch("http://localhost:4567/show_company_details/0/0/0/0/0/0/0/0")
      .then(res => res.json())
      .then((result) => { 
      		console.log(result[0].results)
          this.setState({
            results: result[0].results
          });          
          console.log(this.state.results);
        },
        (error) => {
          console.log(error);
        }
      )				
	}

	handleTableInputs = (e) =>
	{
			console.log("input");
			if(e.target.name=="t_cname")
				 {
				 	this.setState({t_cname:e.target.value});
				 }
			else if(e.target.name=="t_tname")
				 {
				 	this.setState({t_tname:e.target.value});
				 }
			else if(e.target.name=="t_cspace")
				 {
				 	this.setState({t_cspace:e.target.value});
				 }
			else
				 {
				 	this.setState({t_bspace:e.target.value});
				 }
			
	}


	saveData = (e) =>
	{
		console.log(this.state.t_cname);
		console.log(this.state.t_tname);
		console.log(this.state.t_cspace);
		console.log(this.state.t_bspace);

			let arg1=0,arg2=0,arg3=0,arg4=0;

			fetch("http://localhost:4567/update_company_details/"+this.state.t_cname+"/"+this.state.t_tname+"/"+this.state.t_cspace+"/"+this.state.t_bspace+"/"+e.target.id+"/0/0/0")
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

	deleteData = (e) =>
	{
		fetch("http://localhost:4567/"+e.target.name+"/0/0/0/0/"+e.target.id+"/0/0/0")
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


 render() {


	const TableData = () =>
		{
			const Rows = this.state.results.map((m)=>
			<tr >
        <td key={m.id}>
        {m.id}
        </td>
        <td>
        	<input key={m.company_name} className="form-control" name="t_cname" placeholder={m.company_name} onBlur={this.handleTableInputs} />
        </td>
        <td>
        	<input key={m.tower_name} className="form-control"  name="t_tname" placeholder={m.tower_name} onBlur={this.handleTableInputs}/>
        </td>
        <td >
        	<input key={m.car_space} className="form-control"  name="t_cspace" placeholder={m.car_space} onBlur={this.handleTableInputs}/>
        </td>
        <td>
        	<input  key={m.bike_space} className="form-control"  name="t_bspace"  placeholder={m.bike_space} onBlur={this.handleTableInputs}/>
        </td>
        <td>
        	<button onClick={this.saveData} type="submit" id={m.id} name="update_company_details"  className="button">SAVE</button>
        </td>
        <td>
        	<button onClick={this.deleteData} id={m.id}  name="delete_company_details" className="button">DELETE</button>
        </td>
        </tr>
     );
     return (
        <tbody>{Rows}</tbody>
     );	
			
		}



    return (
    	<div>
    <div className="container">
			<center>		<button ><Link to="admin"> BACK</Link></button>  </center>
			<p></p>
			<table className="table table-bordered">
				<thead>
				<tr>
						<td>ID</td>
						<td>COMPANY NAME</td>
						<td>TOWER NAME</td>
						<td>CAR SPACE</td>
						<td>BIKE SPACE</td>
						<td>SAVE</td>
						<td>DELETE</td>
				</tr>
				</thead>

					<TableData />	
			</table>

			</div>

		</div>
    
    );
  }
}

export default Add;
