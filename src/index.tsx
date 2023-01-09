import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './firebase';
import 'firebase/auth';
import 'firebase/firestore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <CssVarsProvider> */}
      <App />
      {/* </CssVarsProvider> */}
    </BrowserRouter>
  </Provider>,
);
