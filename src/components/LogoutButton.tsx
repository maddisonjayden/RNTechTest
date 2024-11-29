import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { Paths } from '@/navigation/paths';

import { resetAccount } from '@/api';
import { queryClient } from '@/App';
import { logoutUser } from '@/redux/actions/userActions';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const handleLogout = async () => {
    await resetAccount();
    await queryClient.clear();
    await dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Login }],
    });
  };
  return <Button title="Logout" onPress={handleLogout} />;
}
