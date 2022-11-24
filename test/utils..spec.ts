import { isSameDay, isBeforeDay, getMonths,formatDateFull, formatDateTitle, isAfterMonth, isSameMonth, isBeforeMonth, isSameDate } from '../src/utils'


describe('utils file', () => {
    const d1 = new Date()
    const d2 = new Date(2012,2,2)

    describe('isSameDay', () => {
        
        it('should return false', () => {
            expect(isSameDay(d1, d2)).toBe(false)
        })
    })

    describe('getMonths', () => {
        const expected = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        it('should return true', () => {
            expect(getMonths()).toEqual(expect.arrayContaining(expected))
        })
    })

    describe('isBeforeDay', ()=> {
        it('should return true', ()=> {
            expect(isBeforeDay(d1,d2)).toBe(true)
        })
    })

    describe('formateDateFull', ()=> {
      
        it('should return string of date, hideTime: true', ()=> {
            expect (formatDateFull(d1,{hideTime: true})).toBe(`Nov 24, 2022`)
        })

        it('should return string of date,  hour > 0 && minutes > 0', ()=> {
            let date = new Date(2022,10,23,11,11)
            expect (formatDateFull(date,{hideTime:false})).toBe(`Nov 23, 2022, 11:11`)
        })

        it('should return string with time 00:00,  hour < 0 && minutes < 0',()=> {
            let date = new Date(2022,10,1,0,0)
           
            expect (formatDateFull(date,{hideTime:false})).toBe(`Nov 1, 2022, 00:00`)
        })
    })

    describe('formateDateTitle', ()=> {
      
        it('should return string of date', ()=> {
            expect(formatDateTitle(d1)).toBe(`November 2022`)
        })
    })

    describe('isAfterMonth', ()=> {
      
        it('should return false', ()=> {
            expect(isAfterMonth(d1,d2)).toBe(false)
        })
    })


    describe('isSameMonth', ()=> {
        const d3= new Date()
      
        it('should return true', ()=> {
            expect(isSameMonth(d1,d3)).toBe(true)
        })
    })

    describe('isBeforeMonth', ()=> {

        it('should return true', ()=>{
            expect(isBeforeMonth(d1,d2)).toBe(true)
        })
    })

    describe('isSameDate', ()=> {
        const d4 = new Date()
        const d5 = new Date(2001)

        describe('test default case, d1.getTime() === d2.getTime()', ()=> {
            it('should return false', ()=>{
                expect(isSameDate(d1,d4)).toBe(false)
            })
        })

        describe('case "day": d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()', ()=> {
            it('should return  true', ()=>{
                expect(isSameDate(d1,d4, 'day')).toBe(true)
            })
        })

        describe('case "month": d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()', ()=> {
            it('should return true', ()=> {
                expect(isSameDate(d1,d4, 'month')).toBe(true)
            })
        })

        describe('case "year": d1.getFullYear() === d2.getFullYear()', ()=> {
            it('should return false', ()=> {
                expect(isSameDate(d1,d5, 'year')).toBe(false)
            })
        })
    })

    



})


