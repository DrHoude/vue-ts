import {Footer} from '../../src/components'
import { mount } from '@vue/test-utils'


describe('test Footer', ()=> {

    const from = new Date()
    const to = new Date()

    const wrapper = mount(Footer as any, {

        props: {
            date: new Date(),

            dateInterval: {
                from,
                to
            },
        }
    })

    describe('test change event, should emit updateDateInterval event', () => {
        it('should return true', () => {
            let input = wrapper.find('[data-test="input"]')
            input.trigger('change')
            expect(wrapper.emitted()).toHaveProperty('updateDateInterval')
        })
    })

    describe('test formatTimeValue method', () => {

        describe('value < 10 should return with zero before', ()=>{

        })

        it('should return true ',() => {
            const value = wrapper.vm.formatTimeValue(9)
            expect(value).toBe('09')
        })
    })

})