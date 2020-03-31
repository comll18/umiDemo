export default function(initialState) {
  const { name, role } = initialState;
  return {
    admin: role == 'admin',
    user: role == 'user',
  };
}
