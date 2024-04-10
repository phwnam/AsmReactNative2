import { NavigationContainer } from "@react-navigation/native"
import { useEffect, useState } from "react"
import StackNav from "./stack"
import auth from '@react-native-firebase/auth'
import AuthNavigator from "./authNavigator"

export default AppContainer = () => {
    const [initializing, setinitializing] = useState(true)
    const [user, setuser] = useState()

    function onAuthStateChanged(user) {
        setuser(user)
        if(initializing) setinitializing(false)
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
    },[])    
    if(initializing){
        return null;
    }
    return(
        <NavigationContainer>
            
            {user ? <StackNav/> : <AuthNavigator/>}
            
        </NavigationContainer>
    )
}