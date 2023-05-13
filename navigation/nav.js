import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const StackDemo = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
          <StackDemo.Navigator  initialRouteName='Login'>
            <StackDemo.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <StackDemo.Screen name='Signup' component={Signup} options={{title: ""}}/>
        </StackDemo.Navigator>
      </NavigationContainer>
    );
}
export default MainNavigator
