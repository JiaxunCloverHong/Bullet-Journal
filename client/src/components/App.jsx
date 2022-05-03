import React from 'react';
import moment from 'moment';
import Day from "./Day";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: moment(moment()).weekday(1),
    };
    this.week = this.week.bind(this);
  }

  week() {
    const weekdayshort = moment.weekdaysShort();
    return weekdayshort.map(day =>
      <Day key={day} day={day} date={this.state.firstDay.add(moment().day(day).format('d') - 1,'days').format('MMDDYYYY')}/>
    );
  }

  render() {
    console.log(moment.weekdays());
    return(
    <div>
      <h1>Bullet Journal</h1>
      <button type="submit">Previous Week</button>
      <h5>{this.state.firstDay.format('LL')} - {this.state.firstDay.add(6,'days').format('LL')}</h5>
      <button type="submit">Next Week</button>
      {this.week()}
    </div>
    )
  }
}

export default App;