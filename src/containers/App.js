import React, { Component } from 'react';
import './style.css'
import { connect } from 'react-redux'
import Counter from '../components/counter'
import { increment, decrement } from '../actions/actions'

const mapStateToProps = (number) => {
  return {
    state: number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: number => {
      dispatch(increment(number))
    },
    onDecrement: number => {
      dispatch(decrement(number))
    }
  }
}

class App extends Component {
  render() {
    const { state, onIncrement, onDecrement} = this.props;
    
    return (
      <div className="App">
        <Counter 
          state={state} 
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
