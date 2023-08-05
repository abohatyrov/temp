export default function isEmpty(str) {
  return !str || str.length === 0;
}

export function getPropertyName(name, lng) {
  switch (lng) {
    case "ua":
      return name;
    case "en":
      return `${name}_en`;
    default:
      return name;
  }
}

export function getCategoryName(code) {
  switch (code) {
    case "sushi":
      return "Суші";
    case "sets":
      return "Сети";
    case "rols":
      return "Роли";
    case "drinks":
      return "Напої";
    case "desserts":
      return "Десерти";
    case "sauces":
      return "Соуси";
    default:
      return code;
  }
}

export function getCategoryCode(name) {
  switch (name) {
    case "Суші":
      return "sushi";
    case "Сети":
      return "sets";
    case "Роли":
      return "rols";
    case "Напої":
      return "drinks";
    case "Десерти":
      return "desserts";
    case "Соуси":
      return "sauces";
    default:
      return name;
  }
}

export const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
