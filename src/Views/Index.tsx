import React  from 'react';
import { RouteComponentProps} from 'react-router-dom';

const Index: React.FC<RouteComponentProps> = (props) => {
  
  return ( 
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white  text-2xl">
        <p className="py-20 text-6xl">
          Currence
        </p>
      <div className="container flex  mx-auto">
          <div className="container flex justify-center mx-5">
              <button 
                className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 mx-5 rounded focus:outline-none focus:shadow-outline" 
                onClick={() => {
                  props.history.push("/signup")
                }}>
                  Signup
              </button>
              <button 
                className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 mx-5 rounded focus:outline-none focus:shadow-outline" 
                onClick={() => {
                  props.history.push("/signin")
                }}>
                  Signin
              </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Index;