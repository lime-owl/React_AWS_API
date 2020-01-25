import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import Rds from './components/Rds';
import Dynamo from './components/Dynamo';

function App() {
  return (
<div>
  <Router>
	    <div>
				<Route path="/" exact> <Home /> </Route>
        <Route path="/rds"  component={Rds} /> 
        <Route path="/dynamo"  component={Dynamo} /> 
	    </div>
   </Router>
</div>
  );
}

export default App;