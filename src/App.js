import React, {Component} from 'react';
import Todos from './components/Todos';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';

class App extends Component {
  state= {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false,
      },
      {
        id: 2,
        title: 'Dinner with wife',
        completed: false,
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false,
      }
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
    .then(res => this.setState({ todos: res.data}));
  }

  // Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map( todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
      })
    });
  }
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id)]}));
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id)]});
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}));
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <h3>My app</h3>
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
}
}

export default App;
