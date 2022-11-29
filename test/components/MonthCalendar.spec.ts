import { MonthCalendar  } from "../../src/components"
import { mount } from '@vue/test-utils'


describe('test MonthCalendar', () => {
    const from = new Date()
  
    const to = new Date()

    const dateInterval = {
        from,
        to
    }
    to.setMonth(to.getMonth() + 2)

    const wrapper = mount(MonthCalendar as any , { 
        props: {
            dateInterval,
        }
    })

    describe('test getMonthClasses method', ()=> {
        let date = new Date()
        let month = date.getMonth()
    
        describe('month-card__month_selected', ()=> {
    
            describe('when the provided day.getTime() is the same  as dateInterval.from.getTime() || dateInterval.to.getTime()', ()=> {
                it('should return true', () => {
                    const classes = wrapper.vm.getMonthClasses(month)
                    expect(classes['month-card__month_selected']).toBe(true)
                })
            })

            describe('otherwise', ()=> {
                let date = new Date(2022,0,1)
                let month = date.getMonth()
                it('should return true', () => {
                    const classes = wrapper.vm.getMonthClasses(month)
                    expect(classes['month-card__month_selected']).not.toBeDefined()
                })
            })

           
        })

        describe('month-card__month_current', ()=> {
            
           
      
            describe('when the provided date is the same day as today', () => {
                it ('should return true', async ()=> {

                    const from = new Date()
                    from.setMonth(from.getMonth() - 1)
                    await wrapper.setProps({ dateInterval: {...dateInterval, from }})
                    const classes = wrapper.vm.getMonthClasses(month)
                    expect(classes['month-card__month_current']).toBe(true)
                 
                })
            })

            describe('otherwise', () => {
                it('should return false', () => {

                    let date = new Date(2022,2,1)
                    let  month = date.getMonth()
                    const classes = wrapper.vm.getMonthClasses(month)

                    expect(classes['month-card__month_current']).toBe(false)
                })

            })

        })

        describe('month-card__month_in-range', ()=> {

            describe('when the current date.getTime() is between dateInterval.from.getTime() && dateInterval.to.getTime()',()=> {
                it('should return true',()=> {
                    let d = new Date()
                    d.setMonth(d.getMonth()+1)
                    let month = d.getMonth()
                    const classes = wrapper.vm.getMonthClasses(month)
                    expect(classes['month-card__month_in-range']).toBe(true)
                })
            })           
        })

    })

    describe('test event emitters', ()=> {
     
        let month = wrapper.find('[data-test = "month"]')

        describe('click event should emit update-month', ()=> {
            it('should return true', ()=> {
                month.trigger('click')
                expect(wrapper.emitted()).toHaveProperty('update-month')
            })
        })

        describe('mousedown event should emit handleMouseDown', ()=> {
            it('should return true', ()=> {
                month.trigger('mousedown')
                expect(wrapper.emitted()).toHaveProperty('handleMouseDown')
            })
        })

        describe('mouseenter event should emit handleMouseEnter', ()=> {

           
           
            it('should return true', async ()=> {
                let months = wrapper.findAll('[data-test = "month"]')

                let from = new Date()
                from.setMonth(from.getMonth()-1)
                await wrapper.setProps({ dateInterval: {...dateInterval, from: from} })
               
                months[months.length - 1].trigger('mouseenter')
                expect(wrapper.emitted()).toHaveProperty('handleMouseEnter')
                expect(new Date((wrapper.emitted()['handleMouseEnter'][0]! as string[])[0]).getTime()).toBeGreaterThan(from.getTime())
            })
        })    
    })

    describe('test button event emit', ()=> {

        describe('click on previous button ', ()=> {
            it('should emit moveBack', async () => {

                await wrapper.setProps({leftArrow: true})
                let btn = wrapper.find('[data-test="back-button"]')
                btn.trigger('click') 

                expect(wrapper.emitted()).toHaveProperty('moveBack')
            })
        })

        describe('click on next button ', ()=> {
            it('should emit moveNext', async () => {

                await wrapper.setProps({rightArrow: true})
                let btn = wrapper.find('[data-test="next-button"]')
                btn.trigger('click') 

                expect(wrapper.emitted()).toHaveProperty('moveNext')
            })
        })

    })

  
        
    



})

