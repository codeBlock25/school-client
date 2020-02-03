import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/admin_dashboard';
import Register from './pages/register';
import { Provider } from 'react-redux';
import store from "./redux/store"
import Add from './pages/add';
import Header from "./components/header"
import Question from './pages/question';
import TakeQuestion from './pages/takeQuestion';
import Anwser from './pages/anwser';

class RE extends Component {
  componentDidMount(){
    this.props.history.push("/login")
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Add/>
          <Question/>
          <Route 
            component={RE}
            path="/"
            exact={true}
          />
          <Route
            component={Signup}
            path="/login"
            exact={true}
          />
          <Route
            component={Register}
            path="/register"
            exact={true}
          />
          <Route 
            component={Dashboard}
            path="/dashboard"
            exact={true}
          />
          <Route 
            component={AdminDashboard}
            path="/admin/dashboard"
            exact={true}
          />
          <Route 
            component={TakeQuestion}
            path="/take"
            exact={false}
          />
          <Route 
            component={Anwser}
            path="/take/exam"
            exact
          />
          <Route 
            component={Anwser}
            path="/take/test"
            exact
          />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App