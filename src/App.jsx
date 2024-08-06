import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import Employees from './pages/Employees';
import UserInfo from './pages/UserInfo';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Tickets />} />
            <Route path="employees" element={<Employees />} />
            <Route path="userinfo" element={<UserInfo />} />
          </Route>
          {/* Otras rutas */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
