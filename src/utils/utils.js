import moment from "moment-timezone";

const formatCurrentDate = (optionDate) => {
  const targetDate = moment().tz("Asia/Ho_Chi_Minh");
  const date = targetDate.date() + optionDate;
  const month = targetDate.month() + 1;
  const year = targetDate.year();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${date
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
};

const convertDateFormat = (inputDate) => {
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!dateRegex.test(inputDate)) {
    throw new Error("Invalid date");
  }

  const [year, month, day] = inputDate.split("/");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const getMonthName = (date) => {
  const targetDate = moment().tz("Asia/Ho_Chi_Minh").add(date, "days");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[targetDate.month()];
};

const getDayNumber = (date) => {
  const targetDate = moment().tz("Asia/Ho_Chi_Minh").add(date, "days");

  return targetDate.date();
};

const getMonthNameAnotherDate = (dateString) => {
  const [year, month, day] = dateString?.split("-");

  const date = new Date(year, month - 1, day);

  const monthName = date.toLocaleString("default", { month: "long" });
  return monthName;
};

const getDayNumberAnotherDate = (dateString) => {
  const [year, month, day] = dateString?.split("-");

  return parseInt(day, 10);
};

const getCurrentTime = () => {
  const currentDate = moment().tz("Asia/Ho_Chi_Minh");
  const hour = currentDate.hour()
  return hour
}

export {
  convertDateFormat,
  formatCurrentDate,
  getMonthName,
  getDayNumber,
  getMonthNameAnotherDate,
  getDayNumberAnotherDate,
  getCurrentTime,
};
