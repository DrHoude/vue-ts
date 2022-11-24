<script setup lang="ts">

    import { defineProps, PropType} from 'vue';
    import { DateInterval } from '../types';
    import { getMonths, isAfterMonth, isBeforeMonth, isSameMonth } from '../utils';


    const props = defineProps ({
     
      
        leftArrow: Boolean,
        rightArrow: Boolean,
    
        dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        },

        showingDate : {
            type: Date,
            default: new Date()
        }

        
 
    })


    const months = getMonths()

    function isRangeBoundaryMonth(dateInterval: DateInterval, date: Date ):boolean {
        return isSameMonth(dateInterval.from, date) || isSameMonth(dateInterval.to,date)
    }

    function isInRangeMonth(dateInterval: DateInterval, date: Date):boolean {
        return isAfterMonth(dateInterval.from, date) && isBeforeMonth(dateInterval.to, date)
    }

    function getMonthIndex(month: string) {
        return months.indexOf(month)
    }


    function getMonthClasses(month: number) {
        const now = new Date()
        const d = new Date()
        d.setFullYear(props.showingDate!.getFullYear())
        d.setMonth(month)

        if (isRangeBoundaryMonth(props.dateInterval, d)) {
            return { 'month-card__month_selected': true }
        
        }


        return {
            'month-card__month_current': isSameMonth(now,d),
            'month-card__month_in-range': isInRangeMonth(props.dateInterval,d)
        }

    }

    const emit = defineEmits<{
        (e: 'update-month', value: Date): Object
        (e:'updateDateInterval', dateInterval:DateInterval):void
        (e:'handleMouseDown', value:Date):void
        (e:'handleMouseEnter', value:Date):void
        // (e:'updateLast',value:boolean):void
    }>()

    const monthSelected = (month: number) => {
        let date = new Date()
        date.setFullYear(props.showingDate!.getFullYear())
        date.setMonth(month)
        emit('update-month', date )
    }


    function mouseDown(month:number) {
        let newDate = new Date()
        newDate.setFullYear(props.showingDate!.getFullYear())
        newDate.setMonth(month)

        emit('handleMouseDown', newDate )

    }

    function mouseEnter(month:number) {
     
            let newDate = new Date()
            newDate.setFullYear(props.showingDate!.getFullYear())
            newDate.setMonth(month)

            if(isAfterMonth(props.dateInterval.from, newDate)) {
                emit('handleMouseEnter', newDate)
            }
    }

</script>

<template>

    <div class="calendar-card">
       

        <div class="month-card">

            <header class="mont-card__buttons-wrapper">
                <button v-if="props.leftArrow" class="month-card__buttons-wrapper_previous" data-test="back-button" @click="$emit('moveBack')"></button>
                 
                <button v-if="props.rightArrow"  class="month-card__buttons-wrapper_next" data-test="next-button"  @click="$emit('moveNext')"></button>

            </header>

            <div>
                <div class="month-card__title">{{props.showingDate.getFullYear()}}</div> 
                <div class="month-card__months">
                    <div v-for="month in months" 
                        @mousedown = "mouseDown(getMonthIndex(month))"
                        @mouseenter = "mouseEnter(getMonthIndex(month))"
                        @click="monthSelected(getMonthIndex(month))"

                        :class="['month-card__month', getMonthClasses(getMonthIndex(month))]"  
                        data-test="month"
                    >{{month}}</div>
                </div>
            </div>

        </div>
    </div>

    
    
</template>

<style scoped lang="scss">



.month-card {
    position: relative;
    user-select: none;
    padding-bottom: 20px;

    &__buttons-wrapper {
        position: absolute;
        height: 20px;
        align-items: center;
        justify-content: center;
        margin: 15px 0;

        &_previous {
            background-image: url(../assets/2.png);
            background-size: cover;
            height: 20px;
            width: 20px;
            border: none;
            background-color: white;
            position: absolute;
            left: -25px; 
            top: -15px;
        }

        &_next {
            background-image: url(../assets/3.png);
            background-size: cover;
            height: 20px;
            width: 20px;
            border: none;
            background-color: white;
            position: absolute;
            right: -10px;
            top: -15px;
        }

    }

    &__title {
        margin: 20px 0 20px 100px;
    }

    &__months {
        display: flex ;
        flex-wrap: wrap;
        width: 250px;
    }

    &__month {
        border: 1px solid rgb(211, 201, 201);
        cursor: pointer;
        width: 25px;
        font-size: 14px;
        margin: 0 5px;
        margin-bottom: 15px;
        padding: 5px 20px;
        font-family: 'Courier New', Courier, monospace;

    }
}






.current-month {
    color: blue;
}

.selected-month {
    background-color: blue;
    color: white;
}

.range-month {
    background-color: rgba(52, 82, 255, 0.1);
}

</style>