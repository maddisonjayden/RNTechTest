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
          <Text style={[fonts.size_16, fonts.gray800, gutters.marginBottom_16]}>
            {isPending ? 'Creating your account...' : 'Initiating account creation...'}
          </Text>
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View style={[layout.itemsStart, gutters.marginTop_16]}>
          <Text style={[fonts.size_16, { color: colors.red500 }, gutters.marginBottom_12]}>
            Failed to create account. Please try again.
          </Text>
          <Button 
            title="Retry" 
            onPress={handleCreateAccount}
            color={colors.purple500}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <SafeScreen testID="home-screen">
      <View style={[layout.row, layout.justifyBetween, gutters.paddingHorizontal_16, gutters.marginTop_16]}>
        <View style={[gutters.marginBottom_16]}>
          <Text style={[fonts.size_24, fonts.gray800, fonts.bold]}>Welcome back,</Text>
          <Text style={[fonts.size_24, fonts.gray800]}>{user?.name}</Text>
        </View>
        <LogoutButton />
      </View>

      <ScrollView style={[layout.flex_1]}>
        <View
          style={[
            layout.justifyCenter,
            layout.justifyBetween,
            gutters.paddingHorizontal_16,
            gutters.gap_24,
          ]}
        >
          {hasAccount ? (
            <View style={[gutters.gap_24]}>
              <View style={[
                backgrounds.gray100,
                gutters.padding_16,
                { borderRadius: 12 }
              ]}>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold, gutters.marginBottom_16]}>
                  Account Overview
                </Text>
                <Text style={[fonts.size_32, fonts.gray800, fonts.bold]}>
                  £{account?.balance}
                </Text>
              </View>

              <View style={[
                backgrounds.gray100,
                gutters.padding_16,
                { borderRadius: 12 }
              ]}>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold, gutters.marginBottom_16]}>
                  Breakdown
                </Text>
                <View style={[gutters.gap_12]}>
                  {[
                    { label: 'Monthly Interest', value: breakdown?.interest },
                    { label: 'Fees', value: breakdown?.fees },
                    { label: 'Taxes', value: breakdown?.taxes },
                    { label: 'Available Balance', value: breakdown?.availableBalance, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <View key={label} style={[layout.row, layout.justifyBetween]}>
                      <Text style={[
                        fonts.size_16,
                        highlight ? fonts.bold : null,
                        fonts.gray800
                      ]}>
                        {label}
                      </Text>
                      <Text style={[
                        fonts.size_16,
                        highlight ? fonts.bold : null,
                        fonts.gray800
                      ]}>
                        £{value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={[
              backgrounds.gray100,
              gutters.padding_16,
              { borderRadius: 12 }
            ]}>
              <Text style={[fonts.size_16, fonts.gray800, fonts.bold, gutters.marginBottom_16]}>
                Get Started
              </Text>
              <Text style={[fonts.size_16, fonts.gray800, gutters.marginBottom_16]}>
                Create an account to start managing your finances.
              </Text>
              {!isPending && (
                <Button
                  title="Create Account"
                  onPress={handleCreateAccount}
                  disabled={status === 'loading'}
                  color={colors.purple500}
                />
              )}
              {renderAccountCreationStatus()}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[gutters.padding_16]}>
        <Button
          title="Refresh Account"
          onPress={invalidateAccountQuery}
          color={colors.purple500}
        />
      </View>
    </SafeScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
