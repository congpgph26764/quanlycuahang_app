import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Feedback from '../screens/Feedback';
import User from '../screens/User';
import Detail from '../screens/Detail';
import Cart from '../screens/Cart';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const StackDemo = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
          <StackDemo.Navigator  initialRouteName='Login'>
            <StackDemo.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <StackDemo.Screen name='Signup' component={Signup} options={{title: ""}}/>
            <StackDemo.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <StackDemo.Screen name='Search' component={Search} options={{headerShown: false}}/>
            <StackDemo.Screen name='Feedback' component={Feedback} options={{headerShown: false}}/>
            <StackDemo.Screen name='User' component={User} options={{headerShown: false}}/>
            <StackDemo.Screen name='Detail' component={Detail} options={{headerShown: false}}/>
            <StackDemo.Screen name='Cart' component={Cart} options={{headerShown: false}}/>
        </StackDemo.Navigator>
      </NavigationContainer>
    );
}
export default MainNavigator