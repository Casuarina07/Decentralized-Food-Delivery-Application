export function getCurrentTime() {
  let newDate = new Date();

  let time = newDate.getHours() + ":" + newDate.getMinutes();

  return `${time}`;
}
