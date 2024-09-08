<script setup lang="ts">
import { ref } from 'vue';

import { AVAILABILITY_WEEK_LIST, VISIT_DURATION_LIST } from '@/models/constants';
import type { Available } from '@/models/types';

const currentDate = new Date;
const first = currentDate.getDate() - currentDate.getDay(); // First day is the day of the month - the day of the week
const last = first + 6; // last day is the first day + 6

const firstDayOfWeek = new Date(currentDate.setDate(first)).toUTCString();
const lastDayOfWeek = new Date(currentDate.setDate(last)).toUTCString();

const isModalOpen = ref(false);
const selectedDuration = ref('');
const hasTourCall = ref(false);
// { is_available: true, times: [['10:00', '11:00']] }
const availabilityList = ref<Available[]>([]);
AVAILABILITY_WEEK_LIST.forEach(() => (
  availabilityList.value.push({
    is_available: false,
    times: [],
  })
));

function handleClickCheckbox(index: number) {
  console.log(index);
  if (availabilityList.value[index].is_available) {
    availabilityList.value[index].is_available = true;
    return;
  }
  availabilityList.value[index].is_available = false;
  return;
}

function handleClickAdd(index: number) {
  isModalOpen.value = true;
}
</script>

<template>
  <div v-if="isModalOpen" class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="duration">
          Visit Duration
        </label>
        <select id="duration" v-model="selectedDuration" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option v-for="duration in VISIT_DURATION_LIST" :key="duration.value">
            {{ duration.label }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="booking_count">
          No. of Booking / Session
        </label>
        <input id="booking_count" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="has_tour_call">
          Allow video tour call
        </label>
        <input id="has_tour_call" v-model="hasTourCall" type="checkbox" >
      </div>
    </form>
  </div>

  <div class="w-2/4 bg-white p-4 border-slate-300 border-2 rounded-lg">
    <h2 class="text-3xl">Availability</h2>
    <p>Set your weekly recurring schedule</p>

    <div v-for="(availability, index) in AVAILABILITY_WEEK_LIST" :key="availability.value">
      <div class="flex items-center justify-between mb-2">
        <input :id="`is_available_${availability.value}`" v-model="availabilityList[index].is_available" type="checkbox" @change="handleClickCheckbox(index)" >
        <p class="m-0 mx-4" :style="{ flex: '0 0 35px' }">{{ availability.label }}</p>
        <div v-if="availabilityList[index].is_available" class="flex items-center justify-between">
          <input :id="`start_time_${availability.value}`" v-model="availabilityList[index].times[0]" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="time" min="7" max="19">
          <span class="mx-2">-</span>
          <input :id="`end_time_${availability.value}`" v-model="availabilityList[index].times[1]" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="time">
          <button class="py-1 px-3 mx-2 rounded-full border-gray-300 border-2">x</button>
          <button class="py-1 px-3 rounded-full border-gray-300 border-2" @click="handleClickAdd(index)">+</button>
        </div>
        <div v-else>
          <span class="">Unavailable</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
