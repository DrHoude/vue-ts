<script setup lang="ts">

    import { defineProps,computed,ref } from 'vue';
    import { formatDateTitle, getAllDaysInMonth, getMonths } from '../utils';


    const props = defineProps ({
        showingDate: Date,
        showMonths: Boolean,
        leftArrow: Boolean,
        rightArrow: Boolean
       
       
    })

    console.log(props.showMonths)

    const selectedDateObj = ref(new Date())

    const showDateObj = computed(()=> {
        return formatDateTitle(props.showingDate!)
    })

    const dateObjs = computed(() => {
        return getAllDaysInMonth(props.showingDate!)
    })

    const week = ref(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])

    const months = getMonths()


    function getDateClasses(dateObj: Date) {
        return {
            'selected-date': selectedDateObj.value.toString()===dateObj.toString(), 
            'not-current-month-day': props.showingDate?.getMonth() !== dateObj.getMonth()
        }
    }

    const emit = defineEmits<
    (e: 'update-date', value: Date) => {}>()

    const daySelected = (day: Date) => {
        console.log(day)
        selectedDateObj.value = new Date(day)
        emit('update-date', selectedDateObj.value )
    }

</script>

<template>

    <div>

        <div class="calendar">

            <header>
                <button v-if="props.leftArrow" class="btnPrevious"></button>
                <div>{{showDateObj}}</div>    
                <button v-if="props.rightArrow"  class="btnNext"></button>

            </header>

            <div v-if ="!props.showMonths">

                <div class="calendar-week">
                    <div v-for="item in week" class="week-day">{{ item }}</div>
                </div>

                <div class="calendar-days">
                    <div 
                        v-for="dateObj in dateObjs" @click="daySelected(dateObj)"
                        :class="getDateClasses(dateObj)">
                        {{ dateObj.getDate() }}
                    </div>
                </div>

            </div>

            <div v-else>
                <div class="calendar-months">
                <div v-for="month in months" class="calendar-month">{{month}}</div>
            </div>
            </div>

           

        <!--

         
                
            
        -->

        </div>
    </div>

    
    
</template>

<style scoped>
header {
   
   position: relative;
   height: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 15px;

}
.btnNext {
    background-image: url(../assets/3.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    right: 0;
       
}

.btnPrevious  {
    background-image: url(../assets/2.png);
    background-size: cover;
    height: 20px;
    width: 20px;
    border: none;
    background-color: white;
    position: absolute;
    left: 0;
   
} 

    .calendar {
        width: 200px;
    }

    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        row-gap: 10px;
        background-color: white;   
    }

    .calendar-week {
        display: flex;
        margin-bottom: 10px;
        background-color: white;
    }

    .week-day {
        display: flex;
        flex: 1 1 auto;
    }

    .selected-date{
        background-color: blue;
        border-radius: 100%;
    } 
    .not-current-month-day {
        color: grey;
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
    margin-left: 15px;
    margin-bottom: 15px;
    padding: 5px 20px;
}



  
</style>