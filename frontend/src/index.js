import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Post from './components/Post'
import NewPost from './components/NewPost'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

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
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/new-post" component={NewPost}/>
          <Route exact path="/:category/:post" component={Post}/>
          <Route exact path="/:category" component={App}/>
        </Switch>

      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
