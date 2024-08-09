const createInitials = (name = '') => {
  const split_name = name.split(' ')
  if (!split_name.length) return name

  if (split_name.length === 1) {
    return `${split_name[0].charAt(0)}${split_name[0].length > 1 ? split_name[0].charAt(1) : ''
      } `
  }

  if (split_name.length === 2) {
    return split_name[0].charAt(0) + split_name[1].charAt(0)
  }

  return (
    split_name[0].charAt(0) + split_name[1].charAt(0) + split_name[2].charAt(0)
  )
}

const validateObjectFields = (obj) => {
  for (let key in obj) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      return false;
    }
  }
  return true;
}

function compareTime(inputTime) {
  const [inputHours, inputMinutes] = inputTime.split(":").map(Number);
  const period = inputHours >= 12 ? "PM" : "AM";
  const hours12 = ((inputHours + 11) % 12) + 1;

  const formattedTime = `${hours12}:${
    inputMinutes < 10 ? "0" : ""
  }${inputMinutes} ${period}`;

  return formattedTime
}




export { createInitials, validateObjectFields, compareTime };