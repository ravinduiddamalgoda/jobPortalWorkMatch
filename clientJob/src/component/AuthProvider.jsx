import axios from 'axios';
import React, { useEffect , useCallback, createContext ,createElement , useState } from 'react';


const Initialvalue = {
    life: 0,
    token: null,
    init: null,
    client: null,
  };


export const AuthContext = React.createContext(Initialvalue);

export function AuthProviderComponent({ children }){
    const [loading , setLoading] =  useState(false);
    const [authPayload , setAuthPayload] = useState(Initialvalue);

    const init = useCallback( async () => {
        try{
            setLoading(true);
            // console.log("Initalize Method..");
            const fromStorage = await localStorage.getItem('token');
            // console.log(fromStorage);
            if(fromStorage){
                const data = JSON.parse(fromStorage);
                const axiosClient = axios.create({
                    baseURL: 'http://localhost:3000',
                    headers: {
                        Authorization: 'Bearer ' + data.token,
                      },
                });
                axios.interceptors.response.use(
                    function (response) {
                      return response;
                    },
                    function (error) {
                      if (
                       ( error?.response?.data?.err &&
                        error?.response?.data?.err === 'Forbinded Resources1')||
                        ( error?.response?.data?.err &&
                          error?.response?.data?.err === 'Forbinded Resources2')
                      ) {
                        localStorage.removeItem('token');
                        console.log("error was here");
                        location.href = 'http://localhost:5173/login';
                      }
          
                      return Promise.reject(error);
                    }
                  );
          
                  setAuthPayload({ ...data, client: axiosClient });
            }

        }catch(err){
        }finally {
            setLoading(false);
        }
    } , []);

    useEffect(()=>{
        init();
    }, [init]);

    if (loading) return React.createElement('div', null, 'Loading....');

    // return createElement(AuthContext.Provider, { value: { ...authPayload, init } }, children);
    return <AuthContext.Provider value={{ ...authPayload, init }}>{children}</AuthContext.Provider>;

}
  