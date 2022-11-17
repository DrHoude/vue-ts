<script setup lang="ts">

    import { defineProps, PropType} from 'vue';
    import { DateInterval } from '../types';
    import { getMonths, isAfterMonth, isBeforeMonth, isSameMonth } from '../utils';

  



    const props = defineProps ({
     
        showingDate: Date,
        leftArrow: Boolean,
        rightArrow: Boolean,
    
        dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
 
    })

    console.log(props.dateInterval.to)
   


    const months = getMonths()

    function isRangeBoundaryMonth(dateInterval: DateInterval, date: Date ):boolean {
        return isSameMonth(dateInterval.from, date) || isSameMonth(dateInterval.to,date)
    }

    function isInRangeMonth(dateInterval: DateInterval, date: Date):boolean {
        return isAfterMonth(dateInterval.from, date) && isBeforeMonth(dateInterval.to, date)
    }


    function getMonthClasses(month:any) {
        const now = new Date()
        const d = new Date()
        d.setFullYear(props.showingDate!.getFullYear())
        d.setMonth(months.indexOf(month))

        if (isRangeBoundaryMonth(props.dateInterval, d)) {
            return 'selected-month'
        }
        return {
            'current-month': isSameMonth(now,d),
            'range-month': isInRangeMonth(props.dateInterval,d)
        }

    }

    const emit = defineEmits<{
        (e: 'update-month', value: Date): Object
        (e:'updateDateInterval', dateInterval:DateInterval):void
        (e:'handleMouseDown', value:Date):void
        (e:'handleMouseEnter', value:Date):void
        (e:'updateLast',value:boolean):void
        
    }>()

    const monthSelected = (month: string) => {
        let date = new Date()
        date.setFullYear(props.showingDate!.getFullYear())
        date.setMonth(months.indexOf(month))
        emit('update-month', date )
    }





    // let isMouseDown = false;

    // function updateDateInterval(dateInterval:DateInterval) {
    //     emit('updateDateInterval', dateInterval)
    // }

    // function handleMouseUp() {
    //     console.log('mouseUp')
    //     removeEventListener('mouseup', handleMouseUp)
    //     isMouseDown = false;
        

    // }

    // function handleMouseDown(month:string) {
    //     console.log(month)

    //     console.log(props.showingDate)

    //     let newDate = new Date()
    //     newDate.setFullYear(props.showingDate!.getFullYear())
    //     newDate.setMonth(months.indexOf(month))
    //     updateDateInterval({from: newDate, to: newDate})
    //    addEventListener('mouseup', handleMouseUp)
    //    isMouseDown = true;
    // }

    function mouseDown(month:string) {
        let newDate = new Date()
        newDate.setFullYear(props.showingDate!.getFullYear())
        newDate.setMonth(months.indexOf(month))

        emit('handleMouseDown', newDate )



    }

    function mouseEnter(month:string) {
     
            let newDate = new Date()
            newDate.setFullYear(props.showingDate!.getFullYear())
            newDate.setMonth(months.indexOf(month))

            if(isAfterMonth(props.dateInterval.from, newDate)) {
                emit('handleMouseEnter', newDate)
            }
    }

</script>

<template>

    <div class="calendar-wrapper">
       

        <div class="calendar">

            <header>
                <button v-if="props.leftArrow" class="btnPrevious" @click="$emit('moveBack')"></button>
                 
                <button v-if="props.rightArrow"  class="btnNext" @click="$emit('moveNext')"></button>

            </header>

            <div>
                <div class="month-title">{{props.showingDate?.getFullYear()}}</div> 
                <div class="calendar-months">
                    <div v-for="month in months" 
                        @mousedown = "mouseDown(month)"
                        @mouseenter = "mouseEnter(month)"
                    :class="['calendar-month' , getMonthClasses(month)]"  @click="monthSelected(month)">{{month}}</div>
                </div>
            </div>

        </div>
    </div>

    
    
</template>

<style scoped>



.calendar {
    width: 200px;
    position: relative;

    user-select: none;
}

header {
   position: relative;
   height: 20px;
   align-items: center;
   justify-content: center;
   margin: 15px 0;
}

.btnNext {
    background-image: url(../assets/3.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    right: -25px;
       
}

.btnPrevious  {
    background-image: url(../assets/2.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    left: -25px; 
} 

.calendar-months {
    display: flex ;
    flex-wrap: wrap;
    width: 250px;
    margin-top: 15px;
}

.calendar-month {
    border: 1px solid rgb(168, 163, 163);
    cursor: pointer;
    width: 25px;
    font-size: 14px;
    margin: 0 5px;
    margin-bottom: 15px;
    padding: 5px 20px;
}

.month-title {
    position: absolute;
    top: 5px;
    left: 50%;
}
.current-month {
    color: blue;
}

.selected-month {
    background-color: blue;
    color: white;
}

.range-month {
    background-color: aqua;
}

</style>