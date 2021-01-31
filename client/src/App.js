import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import 'materialize-css'
function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if(!ready) {
    return <Loader />
  }
  return (
  	<AuthContext.Provider value={{
  		token, userId, login, logout, isAuthenticated
  	}}>
	  	<Router>
	  	  {isAuthenticated && <Navbar />}
	      <div>
	        {routes}
	      </div>
	    </Router>
  	</AuthContext.Provider>
  );
}

export default App;
