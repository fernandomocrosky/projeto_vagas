import axios from 'axios';

async function createUser() {
  const data = {
    name: 'Fernando',
    email: 'fernan1doo@email.com',
    password: '12345678',
    password_confirmation: '12345678',
  };
  const response = await axios.post('http://localhost:8000/api/usuarios/candidatos', data);
  console.log(response);
  return response.data;
}

function Home() {
  const user = createUser();
  return <div>{user.name}</div>;
}

export default Home;
