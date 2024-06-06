// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Private from './components/Private';
import Home from './components/Home'




function App() {

  return (
    // fragment  is better than div because it is faster, it will not render like div
    <>
      <Provider store={store}>
        <Router>
          <div>
            {/* navbar top of routes */}
            <Navbar />
              
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Private component={Home} />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
