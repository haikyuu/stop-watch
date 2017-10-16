//@flow
const twoDigits = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
};
const formatElapsedTime = (elapsedMilliseconds: number): string => {
  if (
    elapsedMilliseconds === null ||
    elapsedMilliseconds === undefined ||
    Object.prototype.toString.call(elapsedMilliseconds).slice(8, -1) !==
      "Number"
  ) {
    return "00:00:00";
  } else {
    let milliseconds = parseInt((elapsedMilliseconds % 1000) / 10);
    let hours = parseInt(elapsedMilliseconds / 3600000);
    let minutes = parseInt((elapsedMilliseconds / 60000) % 60);
    let seconds = parseInt((elapsedMilliseconds / 1000) % 60);
    // let seconds = (elapsedMilliseconds - milliseconds) %
    // , seconds, minutes, hours;
    if (hours) {
      return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(
        seconds,
      )}.${twoDigits(milliseconds)}`;
    } else if (minutes) {
      return `${twoDigits(minutes)}:${twoDigits(seconds)}.${twoDigits(
        milliseconds,
      )}`;
    } else {
      return `${twoDigits(seconds)}.${twoDigits(milliseconds)}`;
    }
  }
};
export { formatElapsedTime };
