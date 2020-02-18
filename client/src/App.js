import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './scenes/Home';
import Register from './scenes/Register';
import Alert from './components/layout/Alert';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Alert></Alert>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
