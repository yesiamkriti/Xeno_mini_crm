import Sidebar from './SideBar';
import Topbar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const decoded = JSON.parse(localStorage.getItem('user'));
    if (!decoded) navigate('/login');
    else setUser(decoded);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar user={user} onLogout={handleLogout} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
