import { DateCalendar } from "../../src/components"
import { mount } from '@vue/test-utils'


describe('test DateCalendar', ()=> {

    const from = new Date()
    from.setDate(from.getDate() - 1)

    const to = new Date()
    to.setDate(to.getDate() + 2)

    const wrapper = mount(DateCalendar as any , { 
        props: {
            dateInterval: {
                from,
                to
            }
        },
    })

    

    describe('test getDateClasses method',  () => {
        let data = new Date()
      
        describe('selected-date', ()=> {

            describe('when the provided day is the same day as dateInterval.from || dateInterval.to', ()=> {
                it('should return true', ()=> {
                    const classes = wrapper.vm.getDateClasses(from)
                    expect(classes['selected-date']).toBe(true)
                })
            })  

            describe('otherwise', ()=> {
                it('should return true', ()=> {
                    const classes = wrapper.vm.getDateClasses(new Date())
                    expect(classes['selected-date']).not.toBeDefined()
                })
            })  
        })


        describe('current-date', ()=> {
            describe('when the provided date is the same day as today', () => {
                it('should return true', ()=> {
                    const classes = wrapper.vm.getDateClasses(data)
                    expect(classes['current-date']).toBe(true)
                })
            })

            describe('otherwise', () => {
                it('should return false', ()=> {
                    const d = new Date()
                    d.setDate(d.getDate() + 1)
                    const classes = wrapper.vm.getDateClasses(d)
                    expect(classes['current-date']).toBe(false)
                })
            })
        })

        describe('range-date', ()=> {
            describe('when the provided date is between dateInterval.from and dateInterval.to', () => {
                it('should return true', ()=> {
                    const classes = wrapper.vm.getDateClasses(data)
                    expect(classes['range-date']).toBe(true)
                })
            })

            describe('otherwise', () => {
                const el = new Date()
                    el.setDate(from.getDate() - 1)
                it('should return false', ()=> {
                    const classes = wrapper.vm.getDateClasses(el)
                    expect(classes['range-date']).toBe(false)
                    
                })
            })
           
        })

        describe('not-current-month-day', ()=> {

            describe('when the provided date.getMonth() is different from current date.getMonth()', ()=> {
                it('should return true', ()=> {
                    let date = new Date()
                    date.setMonth(date.getMonth()-1)
                    const classes = wrapper.vm.getDateClasses(date)
                    expect(classes['not-current-month-day']).toBe(true)
                })
            })

            describe('otherwhise', ()=> {
                it('should return false', ()=> {
                    const classes = wrapper.vm.getDateClasses(new Date())
                    expect(classes['not-current-month-day']).toBe(false)
                })
            })
        }) 
    })

    describe('test event emitters', () => {
        let day = wrapper.find('[data-test="day"]')

        describe('click event should emit update-date',()=> {
            it('should return true', ()=> {
                day.trigger('click')
                expect(wrapper.emitted()).toHaveProperty('update-date')
            })
        })

        describe('mouseenter event should emit handleMouseEnter',()=> {
            it('should return true', ()=> {
                day.trigger('mouseenter')
                expect(wrapper.emitted()).toHaveProperty('handleMouseEnter')
            })
        })

        describe('mousedown event should emit handleMouseDown',()=> {
            it('should return true', ()=> {
                day.trigger('mousedown')
                expect(wrapper.emitted()).toHaveProperty('handleMouseDown')
            })
        })

    })

    describe('test button event emit', ()=> {

        describe(' emit moveBack', () => {
          
            it('should return true',async ()=> {
                await wrapper.setProps({leftArrow: true})

                let btn = wrapper.find('[data-test="back-button"]')
                btn.trigger('click') 
                expect(wrapper.emitted()).toHaveProperty('moveBack')
            })
        })

        describe('emit moveNext', () => {
          
            it('should  return true',async ()=> {
                await wrapper.setProps({rightArrow: true})
                
                let btn = wrapper.find('[data-test="next-button"]')
                btn.trigger('click') 
                expect(wrapper.emitted()).toHaveProperty('moveNext')
            })
        })
    })
})