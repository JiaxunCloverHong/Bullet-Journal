import React from 'react';
import axios from 'axios';
import moment from 'moment';
import meaning from './meaning';
import symbols from './symbols';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      status: this.props.data.status,
      body: this.props.data.body,
      clicks: [],
      entry_type: this.props.data.entry_type,
      showOptions: false,
      deleted: false,
      newDate: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.restore = this.restore.bind(this);
    this.delete = this.delete.bind(this);
    this.moveEntry = this.moveEntry.bind(this);
  }

  moveEntry() {
    const {entry_type, body, newDate} = this.state;
    axios.post('/bulletJournal',
      {
        entry_type,
        body,
        date: moment(newDate, 'YYYY-MM-DD').format('MMDDYYYY')
      })
      .then(()=> {this.props.update(moment(newDate, 'YYYY-MM-DD').format('MMDDYYYY'))})
      .catch(console.log);

      axios.put('/bulletJournal/move',
        {
          _id: this.props.data._id,
          moved: moment(newDate, 'YYYY-MM-DD').format('MMDDYYYY')
        })
        .then(this.props.getData)
        .catch(console.log)
  }

  handleClick() {
    const {clicks, status, entry_type} = this.state;
    const clickTime = new Date();
    const newStatus = symbols[entry_type][status].next.value;
    this.setState({status: newStatus});
    if(clicks.length >= 2 * Object.keys(symbols[entry_type]).length - 1) {
      if(clickTime - clicks[0] < 3000){
        const hints = Object.keys(symbols[entry_type]).slice(1).map((node) => {
          return meaning[node] + ': ' + node;
        })
        alert( 'hint:\n' + hints.join('\n'));
      }
      clicks.shift();
    }
    clicks.push(clickTime);

    axios.put('/bulletJournal', {_id: this.props.data._id, status: newStatus})
    .then(this.props.getData)
    .catch(console.log);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  editEntry() {
    this.setState({editing: true});
  }

  save() {
    const {entry_type, body} = this.state;
    this.setState({editing: false, status: 'new', showOptions: false});
    axios.patch('/bulletJournal', {_id: this.props.data._id, entry_type: entry_type, body: body})
    .then(this.props.getData)
    .catch(console.log);
  }

  restore() {
    const {body, entry_type} = this.props.data;
    this.setState({entry_type: entry_type, body: body, editing: false, showOptions: false});
  }

  delete() {
    axios.delete(`/bulletJournal/${this.props.data._id}`)
    .then(()=> {this.setState({deleted: true})})
    .catch(console.log)
  }


  render() {
    const {editing, status, showOptions, deleted, body, entry_type, newDate} = this.state;
    const {moved, date} = this.props.data;
    return(
      <ul>
        {!deleted &&
        (editing
        ? (
          <div>
            <select name="entry_type" value={entry_type} onChange={this.handleChange}>
              {
              Object.keys(symbols).map(symbol =>
              <option value={symbol} key={symbol}>{meaning[symbol]}</option>
              )}
            </select>
            <input type="text" name="body" value={body} onChange={this.handleChange}></input>
            <button type="submit" onClick={this.save}>save</button>
            <button type="submit" onClick={this.restore}>discard</button>
          </div>
        )
        : (
          <div>
            <div>{meaning[status]}</div>
            <button type="submit" onClick={this.handleClick} disabled={moved !== "none"}>{meaning[entry_type]}</button>
            <p onClick={()=> {(moved === "none") && this.setState({showOptions: !showOptions})}}>{body}</p>
            {status === 'move' && (moved==="none") &&
            (<div>
              <input type="date" name="newDate" min={moment(date, 'MMDDYYYY').format('YYYY-MM-DD')} onChange={this.handleChange}></input>
              <button type="submit" onClick={this.moveEntry} disabled={newDate === ''}>move</button>
            </div>)}
            {showOptions &&
            (<div>
            <button type="submit" onClick={this.editEntry}>✎</button>
            <button type="submit" onClick={this.delete}>🗑</button>
            </div>)}
          </div>
        ))}
      </ul>
    )
  }
}


export default Entry;