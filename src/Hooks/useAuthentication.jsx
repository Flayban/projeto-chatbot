import {db} from "../FireBase/config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

//Realiza a Criação do User no FireBase
export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
        return;
        }
    }

    const creatUser = async (data) =>{
        checkIfIsCancelled()
        setError(null)
        setLoading(true)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)   
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)  
            
            let systenErrorMessage

            if(error.message.includes("Password")){
                systenErrorMessage = "A senha precias de pelo menos 6 caracteres."                
            }else if(error.message.includes("email-already")){
                systenErrorMessage = "Email já cadastrado."  
            }else{
                systenErrorMessage = "Ocorreu algum erro, por favor tente mais tarde."
            }
            setLoading(false)
            setError(systenErrorMessage)
        }        
    }

    const logout = () => {
        checkIfIsCancelled();
    
        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCancelled();
    
        setLoading(true);
        setError(false);
    
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
            console.log(error.message.includes("user-not"))
        
            let systemErrorMessage;
        
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado."
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde."
            }        
            console.log(systemErrorMessage)        
            setError(systemErrorMessage)
        }
    
        console.log(error);    
        setLoading(false);
    };

    useEffect(() =>{
        return () => setCancelled(true);
    }, [])

    return{
        auth,
        creatUser,
        error,
        loading,
        logout,
        login
    }

}