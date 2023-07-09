import {Outlet, Navigate} from 'react-router-dom'

import {useAuth} from '../context/AuthContext'

function ProtectedRoute({admin}) {
    const {loggedIn} = useAuth();
    
  const auth = {'token':loggedIn}
  

  return(
    auth.token ? <Outlet/> : <Navigate to="/signin"/>
    // // if(admin && user._id !== "647b2ade54d21524ae1d9374") {
    // //   return <Redirect to={{pathname: "/"}}/>
    // }
  )
}

export default ProtectedRoute