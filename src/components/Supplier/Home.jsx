import React, { Component } from "react";
import "./Supp.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastEvents: [],
    };
  }

  render() {
    let events;
    //get all previous events
    this.props.marketplace.getPastEvents(
      "allEvents",
      { fromBlock: 0, toBlock: "latest" },
      function (err, results) {
        if (!err) {
          console.log("res HOme: ", results);
        }
        // this.pastEvents = results;
        // events = results;
        // var time_to_show = results[0].returnValues.date; // unix timestamp in seconds
        // console.log("DATE TIME : ", new Date(time_to_show * 1000));
        // console.log("Size: ", this.pastEvents.length);
      }
    );
    console.log("DOES THIS WORK : ", this.props.pastEvents);
    return (
      <div>
        <h1 className="header">Supplier's Home</h1>
        {/* {console.log(this.props.pastEvents[0].returnValues.date)} */}
        {this.props.pastEvents.map((event, key) => {
          return <h2>{event.returnValues.date}</h2>;
        })}
      </div>
    );
  }
}

export default Home;
