import React, { Component } from 'react';
import './style.css'
import { connect } from 'react-redux'
import Counter from '../components/counter'
import UserTable from '../components/userTable'
import { increment, decrement } from '../actions/counterAction'
import { fetchUsers } from '../actions/userAction'

const mapStateToProps = state => {
  return {
    counter: state.counter,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: number => {
      dispatch(increment(number))
    },
    onDecrement: number => {
      dispatch(decrement(number))
    },
    onFetchUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

class App extends Component {
  render() {
    const { counter, users, onIncrement, onDecrement, onFetchUsers} = this.props;
    
    return (
      <div className="App">
        <Counter 
          state={counter} 
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />

        <button 
          className='fetch-user'
          onClick={onFetchUsers}
        >
          Fetch users
        </button>
        <UserTable users={users} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
