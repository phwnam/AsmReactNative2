import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import SplashScreen from '../screens/splashScreen';
import SplashScreen1 from "../screens/splashScreen1";
const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Splash1" component={SplashScreen1} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;