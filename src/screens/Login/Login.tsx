import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';
import { AnimatedBackground } from '@/components/AnimatedBackground';

import { login } from '@/api';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/actions/authActions';
import { RootState } from '@/types/store';

interface LoginProps {
  navigation: any;
}

function Login({ navigation }: LoginProps) {
  const { fonts, layout, colors, gutters, components } = useTheme();
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigatePostAppLogin = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  };

  const doLogin = async () => {
    try {
      dispatch(loginRequest());
      const response = await login();
      
      if (!response?.tokens || !response?.user) {
        throw new Error('Invalid login response');
      }
      dispatch(loginSuccess(response.user, response.tokens));
      navigatePostAppLogin();
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <SafeScreen>
      <AnimatedBackground />
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
          gutters.paddingHorizontal_16,
        ]}
      >
        <View
          style={[
            layout.itemsCenter,
            components.card,
            {
              width: '85%',
              maxWidth: 400,
            },
          ]}
        >
          <View style={[layout.itemsCenter, gutters.marginBottom_24]}>
            <Text
              style={[
                fonts.size_32,
                fonts.gray800,
                fonts.bold,
                { textAlign: 'center' },
              ]}
            >
              Welcome
            </Text>
            
            {userName && (
              <Text
                style={[
                  fonts.size_16,
                  fonts.gray800,
                  { textAlign: 'center' },
                  gutters.marginTop_16,
                ]}
              >
                {userName}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              layout.fullWidth,
              layout.itemsCenter,
              gutters.paddingVertical_16,
              gutters.paddingHorizontal_24,
              {
                backgroundColor: colors.purple500,
                borderRadius: 12,
              },
            ]}
            onPress={doLogin}
            activeOpacity={0.8}
          >
            <Text
              style={[
                fonts.size_16,
                fonts.gray100,
                fonts.bold,
              ]}
            >
              {isLoggedIn ? 'Continue to Dashboard' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}

export default Login;
