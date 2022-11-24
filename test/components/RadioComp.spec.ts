import { RadioComp } from "../../src/components";
import { mount } from '@vue/test-utils'


describe('test RadioComp', ()=> {

    const from = new Date()
    from.setDate(from.getDate() - 1)

    const to = new Date()
    to.setDate(to.getDate() + 2)

    const wrapper = mount(RadioComp as any , { 
        props: {
            dateInterval: {
                from,
                to
            }
        },
    })

    describe('', () => {
        let el = wrapper.find('input[data-test="inpt"]')
        it('', () => {

            el.trigger('click')
            console.log(el)


        })
    })


    

})