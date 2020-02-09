import React, { useState, useMemo} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Index from './Views/Index'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Home from './Views/Home'
import Story from './Views/Story'
import Nav from './Components/Nav'
import { seedDB } from './DB/db_Builder';
import { authContext } from "./Context/authContext";
import Feed from './Views/Feed';
import Followers from './Views/Followers';
import Following from './Views/Following';


const App: React.FC = () => {

  seedDB();

  const [authenticatedUserID, setAuthenticatedUserID] = useState(null);
  const value = useMemo(() => ({  authenticatedUserID, setAuthenticatedUserID }), [authenticatedUserID, setAuthenticatedUserID]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticatedUserID
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )


  return (
    <authContext.Provider value={value}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path='/story/:userID' exact component={Story} />
          <PrivateRoute path='/followers/:userID' component={Followers} />
          <PrivateRoute path='/following/:userID' component={Following} />
          <PrivateRoute path='/home' component={Feed} />
          <Route path="/" exact component={Index}/>
          <Route render={() => <Redirect to="/" />} />

        </Switch>
      </Router>
    </authContext.Provider>
  );
}

export default App;