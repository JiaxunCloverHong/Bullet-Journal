import React from "react";
import axios from 'axios';

import meaning from './meaning.js';
import symbols from './symbols.js';


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      entry_type: '',
    };
    this.symbol = this.symbol.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick() {
    axios.post('/bulletJournal', {
      entry_type: this.state.entry_type,
      body: this.state.body,
      date: this.props.date
    })
    .then(this.props.getData)
    .then(this.props.toggleAdd)
    .catch(console.log);
  }

  symbol() {

    return(
    <select name="entry_type" onChange={this.handleChange}>
      <option value="" key="empty"></option>
      {
      Object.keys(symbols).map(symbol =>
      <option value={symbol} key={symbol}>{meaning[symbol]}</option>
      )}
    </select>
    );
  }

  render() {
    return (
      <div>
        {this.symbol()}
        <input type="text" name="body" value={this.state.body} onChange={this.handleChange}></input>
        <button type="submit" onClick={this.handleClick}>Add</button>
      </div>

    )
  }
}

export default Add;