
import { DateCalendar } from "../../src/components"

import { isSameDay } from "../../src/utils"

import { mount } from '@vue/test-utils'


describe('', ()=> {
    const from = new Date()
    from.setDate(from.getDate() - 1)

    const to = new Date()
    to.setDate(to.getDate() + 2)

    const wrapper = mount(DateCalendar as any , { 
        props: {
         
            dateInterval: {
                from,
                to
            },

            leftArrow: true,  
        },


    })

    it('', ()=> {

         wrapper.find('.calendar-card__buttons-wrapper_previous').trigger('click')

         expect(wrapper.emitted()).toHaveProperty('moveBack')
    })

    

    it('', async ()=> {
        const classes = wrapper.vm.getDateClasses(new Date())

        console.log(classes)

        expect(classes['current-date']).toBe(true)

        expect(classes['range-date']).toBe(true)

       
    })

    it('', ()=> {
        let date = new Date()
        date.setMonth(date.getMonth()-1)

        const classes = wrapper.vm.getDateClasses(date)

        expect(classes['not-current-month-day']).toBe(true)
    })


    it('', ()=> {
        let from = new Date()
        let  to = new Date()

        let date = new Date()
        const classes = wrapper.vm.getDateClasses(date)
        expect(classes['selected-date']).toBe(true)


    })

    describe('test emits of day element ', ()=> {

        let day = wrapper.find('.card-info__day')

        it('should return true', ()=> {
            day.trigger('click')
            
            const updateDate = wrapper.emitted('update-date')
            expect(updateDate).toHaveLength(1)

            
        })
        
        it('should return true', ()=> {
            day.trigger('mousedown')
            expect(wrapper.emitted()).toHaveProperty('handleMouseDown')
        })
    
    })

  

    describe('test attributes', ()=> {

        it('should return true ', ()=> {
            let header = wrapper.find('header')
            expect(header.attributes('class')).toBe('calendar-card__buttons-wrapper')
        })
    })





   

})