export const getDate = () => {
  const d = new Date();
  return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getMonth()+1 < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1}.${d.getFullYear()+1 < 10 ? `0${d.getFullYear()+1}` : d.getFullYear()+1} | ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`
}