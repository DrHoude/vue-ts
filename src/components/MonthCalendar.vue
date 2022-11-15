<script setup lang="ts">

    import { defineProps,computed,ref, PropType,Ref } from 'vue';
    import { DateInterval } from '../types';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';

  



    const props = defineProps ({
     
        showingDate: Date,
   
        leftArrow: Boolean,
        rightArrow: Boolean,
    
        dateInterval: {
            type: Object as PropType<DateInterval>,
            required: true
        }
 
    })
   


    const months = getMonths()

    function isSameMonth(date:Date, month:string):boolean {
        return  new Date(date.getFullYear(), date.getMonth()).getTime() === new Date(props.showingDate!.getFullYear(), months.indexOf(month)).getTime()  
    }
     

    function isRangeBoundaryMonth(dateInterval: DateInterval, month: string ):boolean {
        return isSameMonth(dateInterval.from, month) || isSameMonth(dateInterval.to,month)
    }

    function isInRangeMonth(dateInterval: DateInterval, month: string):boolean {
        return isAfterMonth(dateInterval.from, month) && isBeforeMonth(dateInterval.to, month)
    }

    function isBeforeMonth(date: Date, month:string):boolean {
        return  new Date(date.getFullYear(), date.getMonth()).getTime() > new Date(props.showingDate!.getFullYear(), months.indexOf(month)).getTime()
    }

    function isAfterMonth(date: Date, month:string): boolean {
        return new Date(date.getFullYear(), date.getMonth()).getTime() < new Date(props.showingDate!.getFullYear(), months.indexOf(month)).getTime()
    }



    function getMonthClasses(month:any) {
        const now = new Date()

        if (isRangeBoundaryMonth(props.dateInterval, month)) {
            return 'selected-month'
        }
        return {
            'current-month': isSameMonth(now,month),
            'range-month': isInRangeMonth(props.dateInterval,month)
        }

    }

    const emit = defineEmits<{
        (e: 'update-month', value: Date): Object
        
    }>()

    const monthSelected = (month: string) => {
        let date = new Date()
        date.setFullYear(props.showingDate!.getFullYear())
        date.setMonth(months.indexOf(month))
        emit('update-month', date )
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