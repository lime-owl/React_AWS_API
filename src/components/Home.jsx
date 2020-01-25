import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const styles = {display: "flex", justifyContent: "center", margin: "20%"}
const buttonStyle = {textDecoration: "none", padding: "8%"}
const divider = {marginLeft: "4%", borderRadius: "2%"}

const Home = () => (
        <div style={styles}>
             <Button style={divider} variant="primary">  <NavLink style={buttonStyle} to="/rds" exact>  Check out the RDS endpoint </NavLink> </Button>
             <Button style={divider} variant="primary"> <NavLink style={buttonStyle} to="/dynamo" exact> Check out the Dynamo endpoint </NavLink> </Button>
         </div>
);

export default Home;