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


    describe.skip('', () => {
        let input = wrapper.find('[data-test="input"]')

        it('', () => {

           

            input.trigger('change')

            expect(wrapper.emitted()).toHaveProperty('updateDateInterval')

            
        })
    })

})