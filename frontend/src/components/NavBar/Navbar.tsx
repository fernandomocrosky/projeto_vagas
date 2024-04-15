import './styles.css';
import useUserStore from '../../stores/useUserStore';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from 'typescript-cookie';

function MyNavBar() {
  const { user, setAuth, setUser } = useUserStore((state) => ({
    user: state.user,
    setAuth: state.setAuth,
    setUser: state.setUser,
  }));

  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch(process.env.REACT_APP_API + '/logout', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('token'),
        'content-type': 'application/json',
      },
    });

    const data = await response.json();
    removeCookie('token');
    setAuth(false);
    setUser({
      email: '',
      name: '',
      role: '',
      id: '',
    });
    navigate('/login');
  }

  return (
    <div>
      <Navbar
        variant="dark"
        bg="dark"
        expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link
              to="/"
              className="brand">
              Vagas
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav style={{ marginLeft: 'auto' }}>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.name}
                menuVariant="dark"
                drop="start">
                <NavDropdown.Item>
                  {user.role === 'Empresa' ? (
                    <Link to={`/usuarios/empresas/${user.id}`}>
                      Editar Dados Empresa
                    </Link>
                  ) : (
                    <Link to={`/usuarios/candidatos/${user.id}`}>
                      Editar Dados Candidato
                    </Link>
                  )}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavBar;
