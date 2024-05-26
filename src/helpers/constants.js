const PHONE_REGEX = /^\+38 \(0\d{2}\) \d{2}-\d{3}-\d{2}$/;
const PHONE_MASK = [
  "+",
  "3",
  "8",
  " ",
  "(",
  /[0-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const REQUIRED_FIELD = "Обов'язкове поле!";

export default { PHONE_MASK, PHONE_REGEX, REQUIRED_FIELD };
