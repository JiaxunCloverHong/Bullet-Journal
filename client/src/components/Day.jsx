import React from "react";
import axios from 'axios';
import Add from './Add';
import Entry from './Entry';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      data: [],
    };
    this.getData = this.getData.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  getData() {
    axios.get(`/bulletJournal/${this.props.date}`)
    .then((res) => {
      this.setState({data: res.data});
    })
    .catch(console.log);
  }
  toggleAdd() {
    this.setState({adding: !this.state.adding});
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {adding, data} = this.state;
    return (
      <div>
        <h3>{this.props.day}</h3>
        {data.map(entry =>
          <Entry data={entry} key={entry._id} getData={this.getData}/>
        )}
        {!adding && <button type="submit" onClick={this.toggleAdd}>+</button>}
        {adding && <Add getData={this.getData} toggleAdd={this.toggleAdd} date={this.props.date}/>}
      </div>
    )
  }
}

export default Day;