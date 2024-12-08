import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';
import { Home, Login } from '@/screens';
import { authService } from '@/services/authService';
import { loginSuccess, logout } from '@/redux/actions/authActions';
import { RootState } from '@/redux/reducers';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      const tokens = authService.getTokens();
      const user = authService.getUser();
      
      if (tokens && user && !authService.isTokenExpired(tokens)) {
        dispatch(loginSuccess(user, tokens));
      } else {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          key={variant}
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? Paths.Home : Paths.Login}
        >
          <Stack.Screen name={Paths.Login} component={Login} />
          <Stack.Screen name={Paths.Home} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
