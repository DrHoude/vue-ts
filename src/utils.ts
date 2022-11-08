const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

console.log(monthsFull.indexOf('November'))

interface Options {
    hideTime?: boolean,
    nextTime?: boolean,
    previuosTime?: boolean

}

export function getMonths() {
    let arr = [];

    arr = [...months]

    return arr
}

export function getAllDaysInMonth(date: Date) {

    let first = new Date(date.getFullYear(), date.getMonth(), 1)
    first.setDate(1 - first.getDay()) 

    let last = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const lastDate = last.getDate()
    last.setDate(lastDate + (7 - last.getDay())) 

    

    let arr = [];

     while(first < last) {
        first.setDate(first.getDate() + 1)
        arr.push(new Date(first))
     }

    return arr
}



export function formatDateFull(dateObj: Date, options: Options = {}): string {
    const { hideTime } = options
    let message = ''
    
    let year, date, month, hour, minutes

    year = dateObj.getFullYear()
    month = months[dateObj.getMonth()]
    date = dateObj.getDate()

    message += `${month} ${date}, ${year}`

    if (!hideTime) {
        hour = dateObj.getHours()
        minutes = dateObj.getMinutes()

        message += `, ${hour}:${minutes}`
    }
  
    return message
}

export function formatDateTitle(dateObj:Date, options: Options= {}): string {
   const {nextTime} = options
   const {previuosTime} = options
    let year, month
    let message = ''

        year = dateObj.getFullYear()
        month = monthsFull[dateObj.getMonth()]
        message = `${month} ${year}`
  
    return message

}




