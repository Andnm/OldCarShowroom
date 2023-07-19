import moment from "moment-timezone";

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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


export { formatDateToYYYYMMDD, getMonthName, getDayNumber };

