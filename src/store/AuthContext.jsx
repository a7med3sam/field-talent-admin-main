import { createContext, useContext,useState } from "react";
export const userSchema = {
    id:"",
    name: "",
    email: "",
    token: "",
    isUserLoggedIn: false,
  };
  

const AuthContext = createContext(userSchema);


const AuthContextProvider = AuthContext.Provider;
    
export default  function  AuthProvider({children}){
    const [user, setUser] = useState(
        () => {
            const savedUser = localStorage.getItem("admin");
            return savedUser ? JSON.parse(savedUser) : userSchema;
          }
    ); 


    return <AuthContextProvider value={[user,setUser]}>{children}</AuthContextProvider>

};

export function useAuthContext(){

   // const [userContext,setUserContext] =  useContext(AuthContext);
    const userContext =  useContext(AuthContext);

    if(userContext===undefined)
       { throw new Error("To use AuthContext You must be wrapped in AuthProvider");}
        
    return userContext; 
}
