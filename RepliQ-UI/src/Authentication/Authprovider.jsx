import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import auth from "../../firebase.config"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [loading, setLoading] =useState(true)
    const [user, setUser] =useState(null)
    const [month, setMonth] =useState('january')

    const createUser = ( email, password) =>{
        setLoading(true)
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInPop = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{  
            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
          unSubscribe()  
        }
    },[user?.email, user?.displayName])

    const authInfo = { user,loading,month, setMonth, createUser, signInUser,signInPop, logOut }

return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
)
}

export default AuthProvider;