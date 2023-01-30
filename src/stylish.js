export default function objToString(obj) {
  let str = '{\n';
  const arrayPropertyObj = Object.entries(obj);
  arrayPropertyObj.forEach((property) => {
    str += `  ${property[0]}: ${property[1]}\n`;
  });

  str += '}';

  return str;
}
