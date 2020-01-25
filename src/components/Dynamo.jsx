import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const API_INVOKE_URL  = ' https://olrs4lxvi4.execute-api.us-east-1.amazonaws.com/prod';

const styles = { margin: "6%"}
const divider = {marginBottom: "2%"}

class Dynamo extends React.Component { 
    constructor() {
        super();
        this.state = { 
          students: [],
           render: true, 
           singularCall: null, 
           renderSingular: true,
           batchStudents: [], 
           renderBatch: true, 
           response: null, 
           renderResponse: true
          };

        fetch(API_INVOKE_URL+'/students')
            .then(response => response.json())
            .then(data => {
              this.setState({students: JSON.parse(data.body),  render: false});
            });
    }

    
    renderStudentsTable(studentState){
      return (          
        <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
            {studentState.map(student =>
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
              </tr>
          )}
        </tbody>
      </table>  
      );
    }
      

    renderStudent(student){
      return (
        <div>     
          <h1> ID: {student.id}</h1>
          <span>First Name:  {student.firstName} </span>
          <span> Last Name: {student.lastName} </span>
        </div>
      )
    }


    getById = _ => {
      fetch(API_INVOKE_URL+'/students/id')
      .then(response => response.json())
      .then(data => {
        this.setState({singularCall: JSON.parse(data.body).Item,  renderSingular: false});
      });
    }


    batchStudents = _ => {
      fetch(API_INVOKE_URL+'/students/batch')
      .then(response => response.json())
      .then(data => {
         this.setState({batchStudents: JSON.parse(data.body).Responses.Student,  renderBatch: false});
      });
    }

    postAPI = async () => {
      const response = await fetch(API_INVOKE_URL+'/students', {
        method: 'POST'
      })
      const myJson = await response.json(); //extract JSON from the http response
      console.log(myJson)
       this.setState({response: myJson.statusCode,  renderResponse: false});
    }
    

    renderResponse(response){
      return(<div>
        <h3>posted to the endpoint successfully, status: {response} </h3>
      </div>)
    }


    render() {
      let contents = this.state.render
      ? <p><em>Loading...</em></p>
        : this.renderStudentsTable(this.state.students);

      let singularContents = this.state.renderSingular
      ? ""
        : this.renderStudent(this.state.singularCall);

      let batchContents = this.state.renderBatch
      ? ""
       : this.renderStudentsTable(this.state.batchStudents);
  

       let responseContents = this.state.renderResponse
       ? ""
        : this.renderResponse(this.state.response);
   

        return (
          <div style={styles}>
            <div style={divider}>
            <h1>Students from the NoSQL Dynamo  table: </h1>
            {contents}
            </div>

            <div style={divider}>
           <button onClick={this.getById}>
             Click to get the student by the first ID
           </button>
           {singularContents}
           </div>

           <div style={divider}>
           <button onClick={this.batchStudents}>
             Click to try the Batch Get lambda method
           </button>
           {batchContents}
           </div>

           <div style={divider}>
           <button onClick={this.postAPI} style={divider}>
               Click here to POST to the Dynamo endpoint
            </button>
            {responseContents}
            </div>

           <Button variant="primary"> <NavLink to="/" exact>  Go back </NavLink> </Button>
          </div>
        );
    }
}

export default Dynamo