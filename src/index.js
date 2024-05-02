import { createRoot } from 'react-dom/client';

// third party
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
import ErrorBoundary from 'components/ErrorBoundary';
import ToastProvider from 'components/ToastProvider';



const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <Provider store={store}>
    <HashRouter basename={config.basename}>
      <ErrorBoundary>
        <ToastProvider>    
          <App />
        </ToastProvider>
      </ErrorBoundary>
    </HashRouter>
  </Provider>
);


// serviceWorker.unregister();
