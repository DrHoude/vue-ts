import {CalendarsWrapper, DateCalendar} from '../../src/components'



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

    describe('test emitted events in a child component',  ()=>{

        describe('DateCalendar emit moveBack',() => {

            it('should return true',async ()=> {
                await wrapper.findComponent(DateCalendar as any).vm.$emit('moveBack')
                expect(wrapper.emitted()).toHaveProperty('moveBack')
            })
        })

        describe('DateCalendar emit update-date', ()=> {

            it('', async ()=> {
                await wrapper.findComponent(DateCalendar as any).vm.$emit('update-date')
                expect(wrapper.emitted()).toHaveProperty('update-date')
            })
        })

        describe('DateCalendar emit handleMouseDown',()=>{
            it('', async ()=> {
                const date = new Date()
                date.setDate(date.getDate() - 1)
                const interval = { from: date, to: date}
                await wrapper.findComponent(DateCalendar as any).vm.$emit('handleMouseDown', date)
               wrapper.vm.handleMouseDown()
               expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))

            })
        })
    })

    describe('test updateInterval method', ()=> {
       describe('called updateInterval method should emit updateDateInterval', () => {
            it('should return true', ()=>{
                wrapper.vm.updateInterval()
                expect(wrapper.emitted()).toHaveProperty('updateDateInterval')
            })
       })
    })
})



