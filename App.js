import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

const Stack = createStackNavigator();

import Login from './PAGES/Login';
import Registro from './PAGES/Registro';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
