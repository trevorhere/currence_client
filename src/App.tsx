import React, { useState, useMemo} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Index from './Views/Index'
import Signin from './Views/Signin'
import Signup from './Views/Signup'
import Story from './Views/Story'
import Nav from './Views/Components/Nav'
import { authContext } from "./Context/authContext";
import Feed from './Views/Feed';
import Followers from './Views/Followers';
import Following from './Views/Following';


const App: React.FC = () => {

  const [authenticationToken, setAuthenticationToken] = useState(null);
  const value = useMemo(() => ({  authenticationToken, setAuthenticationToken }), [authenticationToken, setAuthenticationToken]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      authenticationToken
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )

  return (
    <div className="w-full overflow-x-hidden" title="currence">
    <authContext.Provider value={value}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path='/story/:alias' exact component={Story} />
          <PrivateRoute path='/followers/:alias' component={Followers} />
          <PrivateRoute path='/following/:alias' component={Following} />
          <PrivateRoute path='/home' component={Feed} />
          <Route path="/" exact component={Index}/>
          <Route render={() => <Redirect to="/" />} />

        </Switch>
      </Router>
    </authContext.Provider>
    </div>
  );
}

export default App;