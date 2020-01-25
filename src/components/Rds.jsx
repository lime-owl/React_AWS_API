import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const API_INVOKE_URL  = ' https://olrs4lxvi4.execute-api.us-east-1.amazonaws.com/prod';

const styles = { margin: "6%"}
const divider = {marginBottom: "2%"}


class Rds extends React.Component { 
    constructor() {
        super();
        this.state = { 
            students: [],
            singularCall: [],
            render: true,
            renderSingular: true,
            response: null, 
           renderResponse: true
          };

         fetch(API_INVOKE_URL+'/profile')
             .then(response => response.json())
            .then(data => {
              this.setState({students: data,  render: false});
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
                  <td>{student.fname}</td>
                  <td>{student.lname}</td>
                </tr>
            )}
          </tbody>
        </table>  
        );
      }


      getById = _ => {
        fetch(API_INVOKE_URL+'/profile/id')
        .then(response => response.json())
        .then(data => {
          this.setState({singularCall: data,  renderSingular: false});
        });
      }
  

      postAPI = async () => {
        const response = await fetch(API_INVOKE_URL+'/profile', {
          method: 'POST'
        })
        const myJson = await response.json();
         this.setState({response: myJson.affectedRows,  renderResponse: false});
      }
      
      
      renderResponse(response){
        return(<div>
          <h3>posted to the endpoint successfully, rows affected: {response} </h3>
        </div>)
      }


    render(){
        let contents = this.state.render
      ? <p><em>Loading...</em></p>
        : this.renderStudentsTable(this.state.students);

        let singularContents = this.state.renderSingular
        ? ""
          : this.renderStudentsTable(this.state.singularCall);

       let responseContents = this.state.renderResponse
       ? ""
        : this.renderResponse(this.state.response);

        return(
          <div style={styles}>

                <div style={divider}>
                <h1>Students from the RDS MySQL table: </h1>
                {contents}
                </div>

                <div style={divider}>
                <button onClick={this.getById}>
                    Click to get student by the id of 1
                </button>
                {singularContents}
                </div>

                <div style={divider}>
                <button onClick={this.postAPI}>
                    Click here to POST to the RDS endpoint
                </button>
                {responseContents}
                </div>

            <Button variant="primary"> <NavLink to="/" exact>  Go back </NavLink> </Button>
            </div>
        )
    }
}

export default Rds