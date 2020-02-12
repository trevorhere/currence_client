import React, { useContext}  from 'react';
import logo from '../Assets/logo.svg';
import { RouteComponentProps} from 'react-router-dom';
import { authContext } from "../Context/authContext";


const reRoute = (props):void =>{
    props?.history?.push("/signin")
}

const Home: React.FC<RouteComponentProps> = (props) => {
  const { authenticatedUserID } = useContext(authContext);
 
  return ( 
    <div>
      {(!authenticatedUserID)? reRoute(props) : <></> }
      <div className="m-auto antialiased font-sans font-serif font-mono text-center">
        <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            HUZZAH, this is your home page!!!!
          </p>
        </header>
      </div>
    </div>

  );
}

export default Home;