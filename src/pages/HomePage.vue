<script setup lang="ts">
import { ref } from 'vue';

import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
 
const calendarApp = createCalendar({
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  // change
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2024-09-08 12:00',
      end: '2024-09-08 13:00',
    },
  ],
})

</script>

<template>
  <nav>
    <RouterLink to="/create">Create New Schedule</RouterLink>
  </nav>
  
  <ScheduleXCalendar :calendar-app="calendarApp" />
</template>

<style>
</style>
