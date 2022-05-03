import React from 'react';
import meaning from './meaning';
import axios from 'axios';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      status: this.props.data.status,
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleClick() {
    this.setState({editing: true});
  }

  handleChangeStatus(e) {
    axios.put('/bulletJournal', {_id: this.props.data._id, status: e.target.value})
    .then(this.props.getData)
    .then(() => {
      this.setState({editing: false, status: e.target.value})
    })
    .catch(console.log);
  }

  changeStatus() {
    const symbols = Object.keys(meaning).slice(3,6).map(symbol =>
      <option value={meaning[symbol]} key={meaning[symbol]}>{symbol}</option>
    )
    return(
    <select name="status" onChange={this.handleChangeStatus}>
      <option value="" key="empty"></option>
      {symbols}
    </select>
    );
  }

  render() {
    console.log(this.props.data.status);
    const {editing} = this.state;
    return(
      <ul>
        {editing
        ? this.changeStatus()
        : <div onClick={this.handleClick}>{meaning[this.state.status]}</div>}
        <p>{this.props.data.body}</p>
      </ul>
    )
  }
}


export default Entry;