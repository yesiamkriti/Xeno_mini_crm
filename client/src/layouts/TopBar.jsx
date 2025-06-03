const Topbar = ({ user, onLogout }) => {
  return (
    <header className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Welcome, {user?.name || 'User'}</h1>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-1 rounded">
        Logout
      </button>
    </header>
  );
};

export default Topbar;
