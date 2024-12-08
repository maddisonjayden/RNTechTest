import { Button, ScrollView, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import { useTheme } from '@/theme';
import useAccount from '@/hooks/useAccount';

import { SafeScreen } from '@/components/templates';
import { AnimatedBackground } from '@/components/AnimatedBackground';

import { createAccount } from '@/api';
import LogoutButton from '@/components/LogoutButton';
import { calculateBreakdown } from '@/utils';
import { RootState } from '@/redux/reducers';

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    backgrounds,
    colors,
    components,
    fonts,
    gutters,
    layout,
  } = useTheme();

  const { data: account, isLoading, refetch, isRefetching } = useAccount();
  
  const hasAccount = account?.status === 'completed';
  const isPending = account?.status === 'pending';

  const handleCreateAccount = async () => {
    try {
      await createAccount();
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const breakdown = calculateBreakdown(account?.balance || 0);

  const showLoading = isLoading || (account?.status === 'pending');

  const renderAccountCreationStatus = () => {
    if (showLoading) {
      return (
        <View style={[layout.itemsCenter, gutters.marginTop_16]}>
          <ActivityIndicator size="large" color={colors.purple500} />
          <Text style={[fonts.size_16, fonts.gray800, gutters.marginBottom_16]}>
            {account?.status === 'pending' ? 'Creating your account...' : 'Checking account status...'}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeScreen testID="home-screen">
      <AnimatedBackground />
      <View style={[layout.row, layout.justifyBetween, gutters.paddingHorizontal_16, gutters.marginTop_16]}>
        <View style={[gutters.marginBottom_16]}>
          <Text style={[fonts.size_24, fonts.gray800, fonts.bold]}>Welcome back,</Text>
          <Text style={[fonts.size_24, fonts.gray800]}>{user?.name}</Text>
        </View>
        <LogoutButton />
      </View>

      <ScrollView 
        style={[layout.flex_1]}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[colors.purple500]}
            tintColor={colors.purple500}
          />
        }
      >
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
                components.card,
                backgrounds.purple500,
                gutters.padding_24,
              ]}>
                <Text style={[fonts.size_16, { color: '#FFFFFF' }, fonts.bold, gutters.marginBottom_16]}>
                  Account Overview
                </Text>
                <Text style={[components.balanceText, { color: '#FFFFFF' }, fonts.bold]}>
                  £{account?.balance?.toLocaleString()}
                </Text>
              </View>

              <View style={components.card}>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold, gutters.marginBottom_16]}>
                  Breakdown
                </Text>
                <View style={[gutters.gap_12]}>
                  {[
                    { label: 'Monthly Interest', value: breakdown?.interest },
                    { label: 'Fees', value: breakdown?.fees },
                    { label: 'Taxes', value: breakdown?.taxes },
                    { label: 'Available Balance', value: breakdown?.availableBalance, highlight: true },
                  ].map(({ label, value, highlight }, index, array) => (
                    <View 
                      key={label} 
                      style={[
                        components.breakdownRow,
                        index === array.length - 1 && components.breakdownRowLast
                      ]}
                    >
                      <Text style={[
                        fonts.size_16,
                        highlight ? fonts.bold : null,
                        { color: highlight ? colors.purple500 : colors.gray800 }
                      ]}>
                        {label}
                      </Text>
                      <Text style={[
                        fonts.size_16,
                        highlight ? fonts.bold : null,
                        { color: highlight ? colors.purple500 : colors.gray800 }
                      ]}>
                        £{value?.toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={[components.card, gutters.paddingVertical_32]}>
              <Text style={[fonts.size_16, fonts.gray800, fonts.bold, gutters.marginBottom_16]}>
                Get Started
              </Text>
              <Text style={[fonts.size_16, fonts.gray800, gutters.marginBottom_24]}>
                Create an account to start managing your finances.
              </Text>
              {!isLoading && !isPending && (
                <Button
                  title="Create Account"
                  onPress={handleCreateAccount}
                  disabled={isLoading}
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
          onPress={() => refetch()}
        />
      </View>
    </SafeScreen>
  );
}

export default Home;
