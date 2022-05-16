import React from 'react';
import moment from 'moment';
import Day from "./Day";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date(),
      update: '',

    };
    this.week = this.week.bind(this);
    this.update = this.update.bind(this);
    this.updated = this.updated.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  changeWeek(date) {
    this.setState({currDate: date});
  }

  update(date) {
    const {currDate} = this.state;
    console.log(date <= moment(currDate).endOf("week").format('MMDDYYYY'));
    if(date <= moment(currDate).endOf("week").add(1, 'days').format('MMDDYYYY') && date >= moment(currDate).startOf("week").add(1, 'days').format('MMDDYYYY')) {
      console.log(date);
      this.setState({update: date});
    }
  }

  updated(date) {
    console.log(date);
    if(this.state.update === date) {
      this.setState({update: ''});
    }
  }

  week() {
    const {currDate, update} = this.state;
    const weekdaysShort = moment.weekdaysShort();
    weekdaysShort.push(weekdaysShort.shift())
    const weekdays = weekdaysShort.slice(0, 5).map(day =>
      <Day
        id={day}
        key={day}
        updatedDay={update}
        update={this.update}
        updated={this.updated}
        day={day}
        date={moment(currDate).startOf("week").add(Number(moment().day(day).format('d')) || 7 ,'days').format('MMDDYYYY')}
      />
    );
    weekdays.push(
      <div className="weekend">
        <h3>Weekend</h3>
        <div className="weekend-body">
        {
          weekdaysShort.slice(5).map(day =>
            <Day
              id={day}
              key={day}
              updatedDay={update}
              update={this.update}
              updated={this.updated}
              day={day}
              date={moment(currDate).startOf("week").add(Number(moment().day(day).format('d')) || 7 ,'days').format('MMDDYYYY')}
            />
          )
        }
        </div>
      </div>
    )
    return weekdays;
  }

  componentDidMount() {
    this.setState({currDate: moment()});
  }

  render() {

    const {currDate} = this.state;
    console.log(currDate);
    return(
    <div className="journal">
      <h1 className="title">Bullet Journal</h1>
      <header className="header">
        <button className="big-button" type="submit" onClick={()=>{this.changeWeek(moment(new Date()))}}>⌂</button>
        <button className="big-button" type="submit" onClick={()=>{this.changeWeek(moment(currDate).subtract(7, 'days'))}} >«</button>
        <p>{moment(currDate).startOf("week").add(1, 'days').format('LL')} - {moment(currDate).endOf("week").add(1, 'days').format('LL')}</p>
        <button className="big-button" type="submit" onClick={()=>{this.changeWeek(moment(currDate).add(7, 'days'))}}>»</button>
        <p>Go to: <input type="date" name="currDate" onChange={this.handleChange}></input></p>
      </header>
      <div className="main">
        {this.week()}
      </div>
    </div>
    )
  }
}

export default App;