import {CalendartsWrapper} from '../../src/components'
import { mount } from '@vue/test-utils'

import { DateInterval } from '../../src/types'

describe('', () => {
    const wrapper = mount(CalendartsWrapper, {
        props: {
            dateInterval: {
                from: new Date(),
                to: new Date()
            },
            calendarFromShowingDate: new Date(),
            calendarToShowingDate: new Date(),
        }
    })

    it('', () => {
        expect(wrapper).toBeDefined()

    })

    it('', ()=> {
        expect(wrapper.emitted('updateDateInterval'))
    })



    
})

