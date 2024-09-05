import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './component/Sidebar';
import UserTable from './pages/users/UserTable';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import { AuthProvider, useAuth } from './component/authcontext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

const MainContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAuthPage = ['/', '/signin'].includes(location.pathname);

  return (
    <div className='main'>
      {!isAuthPage && isAuthenticated && (
        <div className='side_container'>
          <Sidebar />
        </div>
      )}
      <div className='body_container'>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route
            path='/users'
            element={isAuthenticated ? <UserTable /> : <Navigate to='/' />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
