export function getCurrentTime() {
  let newDate = new Date();

  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();

  return `${hour}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}

export function getCurrentTimePlusLeadTime(leadTime) {
  var d1 = new Date(),
    d2 = new Date(d1),
    d3 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + leadTime + 15);
  d3.setMinutes(d1.getMinutes() + leadTime + 25);

  let d2Hour = d2.getHours();
  let d2Min = d2.getMinutes();
  let d3Hour = d2.getHours();
  let d3Min = d3.getMinutes();

  // return (
  //   d2.getHours() +
  //   ":" +
  //   d2.getMinutes() +
  //   "-" +
  //   d3.getHours() +
  //   ":" +
  //   d3.getMinutes()
  // );
  return `${d2Hour}:${d2Min < 10 ? `0${d2Min}` : `${d2Min}`} - ${d3Hour}:${
    d3Min < 10 ? `0${d3Min}` : `${d3Min}`
  }`;
}
