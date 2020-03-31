interface Person {
  name: string;
  role: string;
}
export default function(initialState: Person) {
  const { name, role } = initialState;
  return {
    admin: role == 'admin',
    user: role == 'user',
  };
}
