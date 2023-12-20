import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from './hoc/IntlProviderWrapper';
import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
import { createRoot } from 'react-dom/client'; // Sửa đổi ở đây

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(
    <Provider store={reduxStore}>
        <IntlProviderWrapper>
            <App persistor={persistor} />
        </IntlProviderWrapper>
    </Provider>,
);

// Bạn có thể bỏ hàm renderApp và ReactDOM.render sau khi đã chuyển sang React 18
// const renderApp = () => {
//     ReactDOM.render(
//         <Provider store={reduxStore}>
//             <IntlProviderWrapper>
//                 <App persistor={persistor}/>
//             </IntlProviderWrapper>
//         </Provider>,
//         document.getElementById('root')
//     );
// };

// renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
