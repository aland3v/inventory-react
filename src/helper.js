function getDate() {
  let dateFormat = '';
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minit = date.getMinutes();
  let seconds = date.getSeconds();

  if (month < 10) {
    dateFormat = `${day}-0${month}-${year}-${hour}-${minit}-${seconds}`;
  } else {
    dateFormat = `${day}-${month}-${year}-${hour}-${minit}-${seconds}`;
  }
  return dateFormat;
}

export { getDate };
