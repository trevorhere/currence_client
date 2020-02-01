import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './Views/Index'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Home from './Views/Home'
import auth from './Util/auth'



const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Index}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/home" component={auth(Home)} />

    </Router>
  );
}

export default App;