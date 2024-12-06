import { Button, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';
import useAccount from '@/hooks/useAccount';
import { useStatus } from '@/hooks/useStatus';

import { SafeScreen } from '@/components/templates';

import { createAccount } from '@/api';
import LogoutButton from '@/components/LogoutButton';
import { logoutUser } from '@/redux/actions/userActions';
import { calculateBreakdown } from '@/utils';
import { RootState } from '@/redux/reducers';

function Home({ user }: { user: any }) {
  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
  } = useTheme();

  const { data: account, isLoading, invalidateAccountQuery } = useAccount();
  const { status, setStatus } = useStatus();
  const hasAccount = !!account;

  const handleCreateAccount = async () => {
    try {
      setStatus({ status: 'loading' });
      const account = await createAccount();
      console.log({ account });
      setStatus({ status: 'idle' });
    } catch (e) {
      setStatus({ status: 'error' });
    }
  };

  const breakdown = calculateBreakdown(account?.balance || 0);

  return (
    <SafeScreen testID="home-screen">
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.justifyBetween,
            gutters.marginTop_80,
            gutters.paddingHorizontal_16,
            gutters.gap_12,
          ]}
        >
          <Text style={[fonts.size_16, fonts.gray800]}>{user?.name},</Text>
          {isLoading ? (
            <Text style={[fonts.size_16, fonts.gray800]}>...</Text>
          ) : null}

          {hasAccount ? (
            <View style={[gutters.gap_12]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                You account details:
              </Text>
              <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
                Balance: {account?.balance}
              </Text>
              <View style={[gutters.gap_12]}>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Breakdown:
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Monthly Interest: {breakdown?.interest}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Fees: {breakdown?.fees}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
                  Taxes: {breakdown?.taxes}
                </Text>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
                  Available balance: {breakdown?.availableBalance}
                </Text>
              </View>
            </View>
          ) : (
            <View style={[layout.itemsStart]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                You have no account, yet!
              </Text>
              <Button
                title={
                  status === 'loading'
                    ? 'Creating your account...'
                    : 'Create one'
                }
                onPress={handleCreateAccount}
              />
            </View>
          )}
          <Button
            title={'Refresh your account'}
            onPress={invalidateAccountQuery}
          />
          <LogoutButton />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
