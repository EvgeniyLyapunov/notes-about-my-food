import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';
import store from './redux/store';

import './style/normalize.scss';
import './style/fonts.scss';
import './style/base.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
