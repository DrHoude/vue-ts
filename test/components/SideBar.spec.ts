import {SideBar} from '../../src/components'
import { mount } from '@vue/test-utils'


describe('test SideBar', ()=> {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(SideBar as any, {})
    
    })
    describe('test updateDate method', ()=> {

        describe('emit update-date', ()=> {
            it('should return true', ()=> {
                wrapper.vm.updateDate(new Date())
                expect(wrapper.emitted()).toHaveProperty('update-date')
                expect(wrapper.emitted()['update-date']).toHaveLength(1)

            })
        })
    })

    describe('test updateDateByOption method', ()=> {

        describe('case option === showToday', ()=> {

            it('should return true', async ()=> {
                const date = new Date()
                await wrapper.vm.updateDateByOption('showToday')
                const interval = { from:date, to:date }
        
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))

                console.log(wrapper.emitted('updateDateInterval'))
            })

        })

        describe('case option === showYesterday', ()=> {

            it('should return true', async ()=> {
                const date = new Date()
                date.setDate(date.getDate()-1)
                const interval = { from:date, to:date }

                await wrapper.vm.updateDateByOption('showYesterday')
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))
            })
        })

        describe('case option === showWeek', () => {
            it('should return true', async ()=> {
                const date = new Date()
                date.setDate(date.getDate()-7)
                const interval = {from: date, to: new Date()}

                await wrapper.vm.updateDateByOption('showWeek')
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))


            })
        })
        describe('case option === show14Days', ()=> {
            it('should return true', async ()=> {
                const date = new Date()
                date.setDate(date.getDate()-14)
                const interval = {from: date, to: new Date()}

                await wrapper.vm.updateDateByOption('show14Days')
               
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))

            })
        })

        describe('case option === showMonth', ()=> {
            it('should return true', async ()=> {

                const date = new Date()
                date.setDate(date.getDate()-30)
                const interval = {from: date, to: new Date()}
                await wrapper.vm.updateDateByOption('showMonth')

                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))
            })
        })

        describe('case option === showWholePeriod', ()=> {
            it('should return true', async () => {

               const date = new Date(2022,3)
               const interval = {from: date, to: new Date()}

               await wrapper.vm.updateDateByOption('showWholePeriod')
               
               expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))
            })
        })

        describe('case option === showThisMonth', ()=> {
            it('should return true', async ()=> {
                
                await wrapper.vm.updateDateByOption('showThisMonth')
                expect((wrapper.emitted('update-date') as any)[0]![0]).toEqual(expect.objectContaining(new Date()))

                console.log(wrapper.emitted('update-date'))

            })
        })

        describe('case option === showLastMonth', ()=> {
            it('should return true', async ()=>{
                const date = new Date()
                date.setMonth(date.getMonth()-1)
                await wrapper.vm.updateDateByOption('showLastMonth')

                console.log(wrapper.emitted('update-date'))

                expect((wrapper.emitted('update-date') as any)[0]![0]).toEqual(expect.objectContaining(date))
            })
        })

        describe('case option === showThreeMonths', ()=> {
            it('should return true', async ()=> {
                const d = new Date()
                d.setMonth(d.getMonth()-3)

                const interval = {from: d, to: new Date()}

                await wrapper.vm.updateDateByOption('showThreeMonths')

                console.log(wrapper.emitted('updateDateInterval'))
               
                expect((wrapper.emitted('updateDateInterval') as any)[0]![0]).toEqual(expect.objectContaining(interval))
            })
        })

        describe('case option === showSixMonths', ()=>{
            it('should return true', async ()=> {
                let from = new Date()
                from.setMonth(from.getMonth()-6)
                await wrapper.vm.updateDateByOption('showSixMonths')
                expect(wrapper.vm.updateInterval({from: from, to: new Date()})) 
            })
        })

        describe('case option === showYear', ()=> {
            it('should return true', async ()=> {
                let from = new Date()
                from.setMonth(from.getMonth()-12)
                await wrapper.vm.updateDateByOption('showYear')
                expect(wrapper.vm.updateInterval({from: from, to: new Date()})) 

            })
        })
    })

    describe('test getOptionClass', () => {

        describe(' when option != undefined && props.selectedOption != undefined ', ()=> {

            it('should return true', async ()=> {
                await(wrapper.setProps({selectedOption: 'showToday'}))
                let option = 'showToday'
                const classes = wrapper.vm.getOptionClass(option)
                expect(classes['calendar-sideBar__item_selected']).toBe(true)
            })
        })

        describe(' when option === undefined && props.selectedOption === undefined ',()=>{

            it('should return true',async()=>{
                await(wrapper.setProps({selectedOption: 'showToday'}))
                const classes = wrapper.vm.getOptionClass(undefined)
                expect(classes['calendar-sideBar__item_selected']).toBe(false)

            })
        })

    })

    describe('test click on optionElement',  ()=>{
        describe('on click element should emit updateSelectedOption event', () => {
            it('should return true',  async () => {
                let el = wrapper.find('[data-test="optionElement"]')

                await el.trigger('click')

                expect(wrapper.emitted()).toHaveProperty('updateSelectedOption')
            })
        })
    })
})