import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Post from './components/Post'
import CategoryList from './components/CategoryList';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory()

const middleware = routerMiddleware(history)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, composeEnhancers(
  applyMiddleware(thunk, middleware)
));




ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/:post" component={Post}/>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
