export const dateformat = (date) => {
  console.log(date)
  let i = date.split('/')
  console.log(i[2] + '-' + i[1] + '-' + i[0])
  return i[2] + '-' + i[1] + '-' + i[0]
}