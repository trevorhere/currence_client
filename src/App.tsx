import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './Views/Index'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Home from './Views/Home'
import Story from './Views/Story'
import auth from './Util/auth'
import { seedDB } from './DB/db_Builder';
 


const App: React.FC = () => {

  seedDB();

  return (
    <Router>
      <Route path="/" exact component={Index}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/home" component={auth(Home)} />
      <Route path="/story/:user_id" component={auth(Story)} />
    </Router>
  );
}

export default App;