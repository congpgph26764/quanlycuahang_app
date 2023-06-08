import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Feedback from '../screens/Feedback';
import User from '../screens/User';
import Detail from '../screens/Detail';
import Cart from '../screens/Cart';
import Info from '../screens/Info';
import Notification from '../screens/Notification';
import OrderStatus from '../screens/OrderStatus';
import History from '../screens/History';
import Password from '../screens/Password';
import HomeSale from '../screens/HomeSale';
import DetailSale from '../screens/DetailSale';
import OderStatusSale from '../screens/OderStatusSale';
import ProfileSale from '../screens/ProfileSale';
import OderSale from '../screens/OderSale';
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
            <StackDemo.Screen name='Info' component={Info} options={{headerShown: false}}/>
            <StackDemo.Screen name='Notification' component={Notification} options={{headerShown: false}}/>
            <StackDemo.Screen name='OrderStatus' component={OrderStatus} options={{headerShown: false}}/>
            <StackDemo.Screen name='History' component={History} options={{headerShown: false}}/>
            <StackDemo.Screen name='Password' component={Password} options={{headerShown: false}}/>
            <StackDemo.Screen name='HomeSale' component={HomeSale} options={{headerShown: false}}/>
            <StackDemo.Screen name='DetailSale' component={DetailSale} options={{headerShown: false}}/>
            <StackDemo.Screen name='OderStatusSale' component={OderStatusSale} options={{headerShown: false}}/>
            <StackDemo.Screen name='ProfileSale' component={ProfileSale} options={{headerShown: false}}/>
            <StackDemo.Screen name='OrderSale' component={OderSale} options={{headerShown: false}}/>
        </StackDemo.Navigator>
      </NavigationContainer>
    );
}
export default MainNavigator
