import React, { Component } from 'react';
import './admin.css';
//import EditableInput from 'react-editable-input';
import ParkedList from "../Common/parked_list";
import {Link} from "react-router-dom";

let cname='',tname=''
class Admin extends Component {
constructor(props)
{
	super(props);
	this.state ={
		count:1,
		results:[],bike_space:"",
		cname:'',
		tname:'',
		cspace:'',
		bspace:''
	};
	this.getData();
	
}

handleView =(e)=>
{
		if((e.target.name==='edit'))
		{ 
			this.setState({count:1});
			this.getData();
		}
		else
		{
			this.setState({count:2});
		}
}
	
	handleInputs = (e) =>
	{
			console.log(e.target.value);
			if(e.target.name=="cname")
				 {
				 	this.setState({cname:e.target.value});
				 }
			else if(e.target.name=="tname")
				 {
				 	this.setState({tname:e.target.value});
				 }
			else if(e.target.name=="cspace")
				 {
				 	this.setState({cspace:e.target.value});
				 }
			else
				 {
				 	this.setState({bspace:e.target.value});
				 }
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

	addData = (e) =>
	{
			fetch("http://localhost:4567/add_company_details/"+this.state.cname+"/"+this.state.tname+"/"+this.state.cspace+"/"+this.state.bspace+"/0/0/0/0")
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

		const edit_view = 

		<div>
			<center>
			<h1>Edit page</h1> 				
				<div className="container">			
					<form onSubmit={this.park} className="form-container">	 
				    <div className="form-group">
				      <label><h3>Company Name</h3></label>
				      <input type="text" className="form-control"  placeholder="Company Name" name="cname" onChange={this.handleInputs}/>
				    </div>
				    <div className="form-group">
				      <label><h3>Tower Name</h3></label>
				      <input type="text" className="form-control" placeholder="Tower Name" name="tname" onChange={this.handleInputs}/>
				    </div>
				    <div className="form-group">
				      <label><h3>Car Space</h3></label>
				      <input type="text" className="form-control" placeholder="Car Space" name="cspace" onChange={this.handleInputs}/>
				    </div>
				    <div className="form-group">
				      <label><h3>Bike Space</h3></label>
				      <input type="text" className="form-control" placeholder="Bike Space	" name="bspace" onChange={this.handleInputs}/>
				    </div>
				    <button type="button" name="add_company_details" onClick={this.addData}>Add</button>
				  </form>
				</div>
			</center>
	</div>
		;

    return (
     <div>
     <center>
     				<h1>Admin</h1>
	     			<button  name="edit" onClick={this.handleView}>EDIT DETAILS</button>
	     			<button  name="details" onClick={this.handleView}>PARKING DETAILS</button>
	     			<button  name="company_edit"><Link to="add"> EDIT DETAILS</Link></button>
	   </center>
	  		{this.state.count===1 ? edit_view : <ParkedList/>}
     </div>
    );
  }
}

export default Admin;
