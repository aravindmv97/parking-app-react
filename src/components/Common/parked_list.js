import React, { Component } from 'react';
import './parked_list.css';

class ParkedList extends Component {
constructor(props)
{
    super(props);
    this.state ={
        results:[]
    };
    this.getData();
    
}


    getData()
    {           
       fetch("http://localhost:4567/show_park_details/0/0/0/0/0/0/0/0")
      .then(res => res.json())
      .then((result) => { 
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

    delete = (e) =>
    {
        //console.log(e.target.id);
        fetch("http://localhost:4567/"+e.target.name+"/0/0/0/0/"+e.target.id)
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

  
    function TableData(props)
        {
            const Rows = props.rows.map((m)=>
                <tr>
        <td >
            <input key={m.id} className="form-control" placeholder={m.id}/>
        </td>
        <td >
            <input key={m.v_type} className="form-control" placeholder={m.v_type}/>
        </td>
        <td >
            <input key={m.v_number} className="form-control" placeholder={m.v_number}/>
        </td>
        <td >
            <input key={m.company_name} className="form-control" placeholder={m.company_name}/>
        </td>
        <td>
            <input  key={m.slot_number} className="form-control" placeholder={m.slot_number}/>
        </td>
        <td>
            <button onClick={props.delete} name="delete_parking_details" id={m.id} className="button">DELETE</button>
        </td>
        </tr>
     );
     return (
        <tbody>{Rows}</tbody>
     ); 
            
        }


    return (
     <div>
        <center>
            <h1>Parked List</h1>
            <div className="edit_delete">
                <h4>EDIT / DELETE COMPANY DETAILS</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>VEHICLE TYPE</td>
                            <td>VEHICLE NUMBER</td>
                            <td>COMPANY NAME</td>
                            <td>SLOT NUMBER</td>
                            <td>DELETE</td>
                        </tr>
                    </thead>
                  
                        <TableData rows={this.state.results} delete = {this.delete}/>
                   
                </table>
            </div>
        </center>
    </div>
    );
  }
}

export default ParkedList;
