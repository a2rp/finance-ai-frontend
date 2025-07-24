import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Styled } from './styled';
import { useAuth } from '../context/AuthContext';
import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { MdDashboardCustomize } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { CiLogout } from 'react-icons/ci';

// const Layout = ({ children }) => {
//     const [menuActive, setMenuActive] = useState(false);
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
//     const menuRef = useRef();


//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const handleMenuClick = () => {
//         setMenuActive(prev => !prev);
//     };

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (menuRef.current && !menuRef.current.contains(e.target)) {
//                 setMenuActive(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <>
//             <Styled.Wrapper>
//                 <Styled.Header>
//                     <Styled.AppName>Finance AI</Styled.AppName>
//                     <Styled.UserMenu onClick={handleMenuClick} ref={menuRef}>
//                         <Styled.User>{user?.name}</Styled.User>
//                         <Styled.Menu>
//                             <FaChevronDown
//                                 className={`icon ${menuActive ? "active" : ""}`}
//                             />
//                         </Styled.Menu>
//                     </Styled.UserMenu>
//                 </Styled.Header>

//                 {menuActive && (
//                     <Styled.DropdownMenuWrapper>
//                         <div className="menuWrapper">
//                             <nav>
//                                 <ul>
//                                     <li>
//                                         <NavLink to="/">
//                                             <MdDashboardCustomize className="icon" /> Dashboard
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/profile">
//                                             <CgProfile className="icon" /> Profile
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <div
//                                             onClick={handleLogout}
//                                             className='logout'
//                                         ><CiLogout className='icon' /> Logout</div>
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </Styled.DropdownMenuWrapper>
//                 )}

//                 {/* <Styled.Sidebar>
//                     <nav>
//                         <a href="/">Dashboard</a>
//                         <Link to="/profile">Profile</Link>

//                         <button onClick={handleLogout}>Logout</button>
//                     </nav>
//                 </Styled.Sidebar> */}
//                 <Styled.RoutesWrapper>{children}</Styled.RoutesWrapper>
//             </Styled.Wrapper>
//         </>
//     );
// };

const Layout = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMenuClick = () => {
        setMenuActive(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuActive(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.AppName>Finance AI</Styled.AppName>
                <Styled.UserMenu onClick={handleMenuClick}>
                    <Styled.User>{user?.name}</Styled.User>
                    <Styled.Menu>
                        <FaChevronDown className={`icon ${menuActive ? "active" : ""}`} />
                    </Styled.Menu>
                </Styled.UserMenu>
            </Styled.Header>

            {menuActive && (
                <Styled.DropdownMenuWrapper ref={menuRef}>
                    <div className="menuWrapper">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/" onClick={() => setMenuActive(false)}>
                                        <MdDashboardCustomize className="icon" /> Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile" onClick={() => setMenuActive(false)}>
                                        <CgProfile className="icon" /> Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <div
                                        onClick={() => {
                                            setMenuActive(false);
                                            handleLogout();
                                        }}
                                        className="logout"
                                    >
                                        <CiLogout className="icon" /> Logout
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Styled.DropdownMenuWrapper>
            )}

            <Styled.RoutesWrapper>{children}</Styled.RoutesWrapper>
        </Styled.Wrapper>
    );
};


export default Layout;

