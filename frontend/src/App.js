import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuthRedirect from './hoc/AuthRedirect';
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
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          )}
        />
        <Route
          path="login"
          element={(
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          )}
        />
        <Route
          path="signup"
          element={(
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
