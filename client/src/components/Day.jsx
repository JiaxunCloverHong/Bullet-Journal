import React from "react";
import axios from 'axios';
import moment from 'moment';
import Add from './Add';
import Entry from './Entry';
import {IoIosAdd} from 'react-icons/io';
import {IoIosRemove} from 'react-icons/io';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      adding: false,
      data: [],
    };
    this.getData = this.getData.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  getData(callback) {
    axios.get(`/bulletJournal/${this.props.date}`)
    .then((res) => {
      this.setState({data: res.data});
    })
    .then(callback)
    .catch(console.log);
  }
  toggleAdd() {
    this.setState({adding: !this.state.adding});
  }

  componentDidUpdate(prev){
    console.log(prev.updatedDay, this.props.updatedDay)
    if(!prev.updatedDay && this.props.updatedDay) {
      this.getData(() => {this.props.updated(this.props.date)});
    }
    if(this.props.date !== prev.date) {
      this.setState({date: this.props.date, adding: false}, this.getData);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {adding, data} = this.state;
    return (
      <div className={`day ${this.props.day}`}>
        <h3>{this.props.day}</h3>
          <div className="day-body">
            <p>{moment(this.props.date, 'MMDDYYYY').format('DD')}</p>
            <div className="entries">
              {data.map(entry =>
                <Entry data={entry} key={entry._id} update={this.props.update} getData={this.getData}/>
              )}
              {adding ?<IoIosRemove size={24} className="huge-button" type="submit" onClick={this.toggleAdd}/> : <IoIosAdd size={24} className="huge-button" type="submit" onClick={this.toggleAdd}/>}
              {adding && <Add className="big-button" getData={this.getData} toggleAdd={this.toggleAdd} date={this.props.date}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default Day;