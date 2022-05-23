import React, { useEffect, useState } from "react";
import base64 from 'base-64';
import superagent from 'superagent';
import jwt from 'jwt-decode';
import cookie from 'react-cookies';


const API = `https://mohammad-auth-api.herokuapp.com`;
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});


    const login = async (username, password) => {
       
        const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        console.log('inside login >> response', response);//userInfo + token
        validateMyUser(response.body)
    }



    const validateMyUser = (data) => {
        if (data) {
            const validUser = jwt(data.token);
            if (validUser) {
                setLoginstate(true, data);
                cookie.save('userData', data);
            } else {
                setLoginstate(false, {})
            }
        } else {
            setLoginstate(false, {})
        }

    }
    async function signUp(userName,passWord,role){
       await superagent.post(`${API}/signup`).send({username:userName,password:passWord,role});
    }
  
    const setLoginstate = (isLogged, userData) => {
        setLoggedIn(isLogged);
        setUser(userData);
    }

    const logout = () => {
        setLoggedIn(false);
        setUser({});
        cookie.remove('userData');
    }

    useEffect(() => {
        const myUserInfo = cookie.load('userData');
        validateMyUser(myUserInfo);
    }, [])


    const canDo = (capability) => {
        // optional chaining 
        return user?.actions?.includes(capability);
    }

    const state = {
      signUp:signUp,
        loggedIn: loggedIn,
        user: user,
        login: login,
        logout: logout,
        canDo: canDo
    }


    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}
