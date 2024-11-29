export const saveUser = (user: any) => ({
  type: 'SAVE_USER',
  payload: user,
});
export const logoutUser = () => ({
  type: 'LOGOUT',
});
