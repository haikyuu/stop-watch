//@flow
export const twoDigits = (num: number): string => {
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
    return "00:00.00";
  } else {
    let milliseconds = parseInt(elapsedMilliseconds % 1000 / 10, 10);
    let hours = parseInt(elapsedMilliseconds / 3600000, 10);
    let minutes = parseInt(elapsedMilliseconds / 60000 % 60, 10);
    let seconds = parseInt(elapsedMilliseconds / 1000 % 60, 10);

    if (hours) {
      return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}.${twoDigits(milliseconds)}`;
    } else {
      return `${twoDigits(minutes)}:${twoDigits(seconds)}.${twoDigits(milliseconds)}`;
    }
  }
};
export { formatElapsedTime };
