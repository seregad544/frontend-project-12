import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './hoc/RequireAuth';
import Home from './pages/Home/Homepage';
import Login from './pages/Login/Loginpage';
import NotFound from './pages/NotFound/Notfoundpage';
import Register from './pages/Signup/Registerpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <RequireAuth>
              <Home />
            </RequireAuth>
          )}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
