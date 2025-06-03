import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Create Campaign', path: '/create' },
    { name: 'Campaign History', path: '/history' },
  ];

  return (
    <aside className="w-64 h-screen bg-indigo-700 text-white p-4">
      <h2 className="text-xl font-bold mb-8">Xeno CRM</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-2 py-1 rounded hover:bg-indigo-500 ${pathname === item.path ? 'bg-indigo-600' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
