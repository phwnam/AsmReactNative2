import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import SplashScreen from '../screens/splashScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;