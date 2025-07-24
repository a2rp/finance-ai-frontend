import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <Wrapper>
                <Sidebar>
                    <h2>FinanceAI</h2>
                    <p>{user?.name}</p>
                    <nav>
                        <a href="/">Dashboard</a>
                        <Link to="/profile">Profile</Link>

                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                </Sidebar>
                <Main>{children}</Main>
            </Wrapper>
        </>
    );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #111;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  nav a, nav button {
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 30px;
  background: #f4f4f4;
`;
