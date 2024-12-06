import { Button, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/actions/authActions';

function Login({ navigation, user }: any) {
  const { fonts, layout } = useTheme();
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
        ]}
      >
        <Text style={[fonts.size_16, fonts.gray800]}>Hello, {user?.name}</Text>
        <Button
          title={user?.isLoggedIn ? 'Access your app' : 'Login'}
          onPress={doLogin}
        />
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
