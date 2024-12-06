import { Button, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';
import useAccount from '@/hooks/useAccount';
import { useStatus } from '@/hooks/useStatus';

import { SafeScreen } from '@/components/templates';

import { createAccount } from '@/api';
import LogoutButton from '@/components/LogoutButton';
import { calculateBreakdown } from '@/utils';
import { RootState } from '@/redux/reducers';

function Home({ user }: { user: any }) {
  const {
    backgrounds,
    colors,
    components,
    fonts,
    gutters,
    layout,
  } = useTheme();

  const { data: account, isLoading, invalidateAccountQuery } = useAccount();
  const { status, setStatus } = useStatus();
  
  // Only show account if it's completed
  const hasAccount = account?.status === 'completed';
  const isPending = account?.status === 'pending';

  const handleCreateAccount = async () => {
    try {
      setStatus({ status: 'loading' });
      await createAccount();
      // Immediately refetch to get the pending state
      invalidateAccountQuery();
      setStatus({ status: 'success' });
    } catch (e) {
      setStatus({ status: 'error', data: e });
    }
  };

  const breakdown = calculateBreakdown(account?.balance || 0);

  const renderAccountCreationStatus = () => {
    if (status === 'loading' || isPending) {
      return (
        <View style={[layout.itemsCenter, gutters.marginTop_16]}>
          <ActivityIndicator size="large" color={colors.purple500} />
          <Text style={[fonts.size_16, fonts.gray800, { marginTop: 8 }]}>
            {isPending ? 'Creating your account...' : 'Initiating account creation...'}
          </Text>
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View style={[layout.itemsStart, gutters.marginTop_16]}>
          <Text style={[fonts.size_16, { color: colors.red500 }]}>
            Failed to create account. Please try again.
          </Text>
          <Button title="Retry" onPress={handleCreateAccount} />
        </View>
      );
    }

    return null;
  };

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

          {hasAccount ? (
            <View style={[gutters.gap_12]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                Your account details:
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
                You have no account yet!
              </Text>
              {!isPending && (
                <Button
                  title="Create Account"
                  onPress={handleCreateAccount}
                  disabled={status === 'loading'}
                />
              )}
              {renderAccountCreationStatus()}
            </View>
          )}
          
          <Button
            title="Refresh your account"
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

export default connect(mapStateToProps)(Home);
