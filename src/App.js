import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { store } from './redux/store/index';
import { Provider, useDispatch } from 'react-redux';
import Router from './Routes/Router';
import { ToastContainer } from 'react-toastify';
import { request } from 'axios';
import { useCallback, useEffect } from 'react';
import { setCountryOptions } from './redux/action-creators';

function App() {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          fontFamily: 'Fira Sans',
        }}
      />
      <Router />
    </>
  );
}

export default App;
