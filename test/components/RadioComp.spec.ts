import { RadioComp } from "../../src/components";
import { mount } from '@vue/test-utils'


describe('test RadioComp', ()=> {

 

    const wrapper = mount(RadioComp as any , { 
        props: {
            options: ['first'],
            value: ''
           

        }

    
    })

    describe('when the raion is clicked', () => {
        it('should emit the "radio-click" event', async () => {
            const el = wrapper.find('[data-test="input"]')
            el.trigger('change')
            expect(wrapper.emitted()).toHaveProperty('radio-click')
        })
    })

    describe('when the value mathes an option', () => {
        it('the option should be checked', async () => {
            await wrapper.setProps({
                value: 'first'
            })
            const el = wrapper.find('[data-test="input"]:checked')
            expect(el).toBeDefined()
        })
    })

  


    

})