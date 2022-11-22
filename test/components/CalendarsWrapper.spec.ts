import {CalendarsWrapper} from '../../src/components'



import { mount } from '@vue/test-utils'



describe('', () => {
    const wrapper = mount(CalendarsWrapper as any, {
        props: {
            date: new Date(),
            dateInterval: {
                from: new Date(),
                to: new Date()
            },
            calendarFromShowingDate: new Date(),
            calendarToShowingDate: new Date(),
        }
    })

    it('', () => {
        expect(wrapper)

    })

    it('', ()=> {
        // const el = wrapper.get('[data-test="calendar-from"]')
        // el.trigger('click')
        expect(wrapper.emitted('updateDateInterval'))
    })    
})



