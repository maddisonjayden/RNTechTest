import { Button, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/actions/authActions';

function Login({ navigation, user }: any) {
  const { fonts, layout, colors, gutters, backgrounds } = useTheme();
  const dispatch = useDispatch();

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
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
          gutters.paddingHorizontal_24,
        ]}
      >
        <View style={[
          backgrounds.gray100,
          gutters.padding_24,
          layout.itemsCenter,
          { borderRadius: 16, width: '100%' }
        ]}>
          <Text style={[
            fonts.size_24,
            fonts.gray800,
            fonts.bold,
            gutters.marginBottom_16
          ]}>
            Welcome
          </Text>
          
          {user?.name && (
            <Text style={[
              fonts.size_16,
              fonts.gray800,
              gutters.marginBottom_24,
            ]}>
              {user.name}
            </Text>
          )}

          <Button
            title={user?.isLoggedIn ? 'Continue to Dashboard' : 'Sign In'}
            onPress={doLogin}
            color={colors.purple500}
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginRequest,
  loginSuccess,
  loginFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
