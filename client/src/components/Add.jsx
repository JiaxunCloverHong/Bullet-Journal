import React from "react";
import axios from 'axios';

import meaning from './meaning.js';
import symbols from './symbols.js';
import {TiDelete} from 'react-icons/ti';
import {BiCheck} from 'react-icons/bi';


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      entry_type: '',
      time: '',
    };
    this.symbol = this.symbol.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick() {
    if(this.state.entry_type !== '' && this.state.body !== ''){
      axios.post('/bulletJournal', {
        entry_type: this.state.entry_type,
        body: this.state.body,
        date: this.props.date,
        time: this.state.time === "" ? null : this.state.time,
      })
      .then(this.props.getData)
      .then(this.props.toggleAdd)
      .catch(console.log);
    }
  }

  symbol() {

    return(
    <select className="select-editing" name="entry_type" onChange={this.handleChange}>
      <option value="" key="empty"></option>
      {
      Object.keys(symbols).map(symbol =>
      <option value={symbol} key={symbol}>{meaning[symbol+'-text']}</option>
      )}
    </select>
    );
  }

  render() {
    return (
      <div className="individual-entry-editing">
        <div>
          <div className="entry-editing">
            {this.symbol()}
            <div className="entry-text-editing">
              <input className="input-body" type="text" name="body" value={this.state.body} onChange={this.handleChange}></input>
              <div className="input-time"><input type="time" name="time" value={this.state.time} onChange={this.handleChange} required={false}></input>
              <TiDelete className="tiny-button" type="submit" onClick={()=> {this.setState({time: ""})}}/></div>
            </div>
          </div>
          <div className="button-group">
            <BiCheck className="big-button" type="submit" onClick={this.handleClick}/>
          </div>
        </div>
      </div>

    )
  }
}

export default Add;