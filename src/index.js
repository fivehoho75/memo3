import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { App, Login, Register } from './containers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, 
    composeWithDevTools(
      applyMiddleware(thunk)
  ));

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Route exact path="/" component={ App } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
      </div>
    </BrowserRouter>
  </Provider>, rootElement
);
