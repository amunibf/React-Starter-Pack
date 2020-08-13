import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import './App.css'
import { Provider } from "react-redux";
import store from './store'
import { Container } from "reactstrap";
import ItemModal from './components/ItemModal';
import { loadUser } from "./actions/authActions";


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  
  render() {
    return (
      <div className="App">
      <Provider store={store}>
      <AppNavbar/>
      <Container>
        <ItemModal/>
        <ShoppingList/>
      </Container>
      </Provider>
      </div>
    );
  }
}

export default App;