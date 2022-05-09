import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { store } from './redux/store/index';
import { Provider } from 'react-redux';
import Router from './Routes/Router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
