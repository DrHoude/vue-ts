import {CalendarsWrapper, DateCalendar, MonthCalendar} from '../../src/components'



import { mount } from '@vue/test-utils'


describe('test SideBar', ()=> {
    let wrapper: any

    const from = new Date()
    from.setDate(from.getDate()-10)
    const to = new Date()

    beforeEach(() => {
        wrapper = mount(CalendarsWrapper as any, {
            props: {
                date: new Date(),
                dateInterval: {
                    from: from,
                    to: to
                },
                calendarFromShowingDate: new Date(),
                calendarToShowingDate: new Date(),
                showTypeDayMonth: false

              

                
            }
        })
    })
    describe('test emitted events in child component MonthCalendar', ()=>{
     



        
        // describe('MonthCalendar emit moveBack', ()=>{
        //     it('should return true', async ()=>{
        //         await wrapper.findComponent(MonthCalendar as any).vm.$emit('moveBack')
        //         expect(wrapper.emitted()).toHaveProperty('moveBack')
        //     })
        // })
    })



    describe('test emitted events in a child component DateCalendar',  ()=>{



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

    describe('test handleMouseDown method', () => {

        describe('should emit updateDateInterval', () => {

            it('should return true', async () => {

                const date = new Date()

                await wrapper.vm.handleMouseDown(date)
                const interval = { from: date, to: date }
        
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))
            })

        })
    })

    describe.skip(' test handleMouseEnterDay method ', () => {
        describe('should emit updateDateInterval', () => {
            it('should return true', async () => {
                let date = new Date()
                let lastDate = new Date()

                await wrapper.vm.handleMouseEnterDay(date,lastDate)

               
                expect(wrapper.emitted()).toHaveProperty('moveNext')

                expect(wrapper.emitted()).toHaveProperty('updateDateInterval')
                
            
            })
        })
    })



})



