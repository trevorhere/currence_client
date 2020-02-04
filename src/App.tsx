import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './Views/Index'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Home from './Views/Home'
import Story from './Views/Story'
import auth from './Util/auth'
import Nav from './Components/Nav'
import { seedDB } from './DB/db_Builder';
 



const App: React.FC = () => {

  const [userID, setUserID] = useState< string | null>(null);

  seedDB();

  return (
    <div>
      <Nav props={userID}/>
      <Router>
        <Route path="/" exact component={Index}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/signin" 
          setUserIDCallback={setUserID}
          exact 
          render={(setUserIDCallback={setUserID}) => <Signin {...setUserIDCallback={setUserID}}/>}
        />
        <Route path="/home/:user_id" component={auth(Home)} />
        <Route path="/story/:user_id" component={auth(Story)} />
      </Router>
    </div>
  );
}

export default App;