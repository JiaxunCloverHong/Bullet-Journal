import React from "react";
import meaning from './meaning.js';
import axios from 'axios';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      status: '',
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
      status: this.state.status,
      body: this.state.body,
      date: this.props.date
    })
    .then(this.props.getData)
    .then(this.props.toggleAdd)
    .catch(console.log);
  }

  symbol() {
    const symbols = Object.keys(meaning).slice(0, 3).map(symbol =>
      <option value={meaning[symbol]} key={meaning[symbol]}>{symbol}</option>
    )
    return(
    <select name="status" onChange={this.handleChange}>
      {symbols}
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