import {useState, useContext, createContext, useEffect} from 'react';
import { fetchLogout, fetchMe } from '../api';
import { Flex, Spinner } from '@chakra-ui/react';

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)



    useEffect(()=> {
        (async ()=> {                                            //anonim fonksiyon kullandık.
            try {
                const me = await fetchMe();
                setLoggedIn(true);
                setUser(me);
                setLoading(false);
                
            } catch (error) {
                setLoading(false)
                console.log("user is not logged in!");
            }
        })()
    },[])

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);
        console.log(data);

        localStorage.setItem("access-token" , data.token)
        localStorage.setItem("refresh-token" , data.refreshToken)
        localStorage.setItem('userid', data.user._id);
    }
    const logout = async () => {
        setLoggedIn(false);
        setUser(null);

        await fetchLogout();
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('userid');

    }


    const values = {
        user,
        loggedIn,
        login,
        logout
    }
    if (loading) {
        return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size="xl"></Spinner>
        </Flex>
        
    )};

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
    

    const useAuth = () => useContext(AuthContext)

    export {AuthProvider, useAuth}