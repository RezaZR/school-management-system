<script setup lang="ts">
import { ref } from 'vue';

import { AVAILABILITY_WEEK_LIST, LOCALE_DATESTRING_OPTIONS, VISIT_DURATION_LIST } from '@/models/constants';
import ModalComponent from '@/components/ModalComponent.vue';
import type { Available } from '@/models/types';

const currentDate = new Date;
const first = currentDate.getDate() - currentDate.getDay(); // First day is the day of the month - the day of the week
const last = first + 6; // last day is the first day + 6

const firstDayOfWeek = new Date(currentDate.setDate(first)).toUTCString();
const lastDayOfWeek = new Date(currentDate.setDate(last)).toUTCString();

const isModalOpen = ref(false);

const selectedIndex = ref(-1);
// { is_available: true, times: [['10:00', '11:00']] }
const availabilityList = ref<Available[]>([]);
AVAILABILITY_WEEK_LIST.forEach(() => (
  availabilityList.value.push({
    is_available: false,
    times: [[]],
  })
));

function handleToggleCheckbox(index: number) {
  if (availabilityList.value[index].is_available) {
    availabilityList.value[index].is_available = true;
  } else {
    availabilityList.value[index].is_available = false;
  }
}

function handleToggleModal(index = -1) {
  isModalOpen.value = !isModalOpen.value;
  selectedIndex.value = index;
}

function transformDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", LOCALE_DATESTRING_OPTIONS);
}
</script>

<template>
  <ModalComponent
    :is-open="isModalOpen"
    :selected-index="selectedIndex"
    :availability-list="availabilityList"
    :on-toggle="handleToggleModal"
  />

  <div class="w-3/4 mx-auto bg-white p-4 border-gray-300 border-2 rounded-lg">
    <div class="flex items-center gap-4">
      <RouterLink to="/">
        <button title="Back">
          &#9664;
        </button>
      </RouterLink>
      <h2 class="text-3xl">Availability on {{ transformDate(firstDayOfWeek) }} - {{ transformDate(lastDayOfWeek) }}</h2>
    </div>
    <p class="text-neutral-400 text-sm mt-1 mb-4">Set your weekly recurring schedule</p>

    <div v-for="(availability, index) in AVAILABILITY_WEEK_LIST" :key="availability.value">
      <div class="flex items-start justify-between min-h-11 mb-3">
        <input :id="`is_available_${availability.value}`" v-model="availabilityList[index].is_available" class="my-2.5" type="checkbox" :style="{ flex: '0 0 13px' }" @change="handleToggleCheckbox(index)">
        <p class="mt-1 mx-4" :style="{ flex: '0 0 36px' }">{{ availability.label }}</p>
        <div
          v-if="availabilityList[index].is_available"
          :style="{ flex: '0 1 calc(100% - 13px - 36px)' }"
        >
          <div
            v-for="(time, indexTime) in availabilityList[index].times"
            :key="indexTime"
            class="flex items-center justify-between mb-1"
          >
            <input :id="`start_time_${availability.value}`" v-model="time[0]" class="shadow appearance-none border rounded-lg w-full py-1 px-3 text-gray-700 leading-tight h-10 focus:outline-none focus:shadow-outline" type="time" min="7" max="19">
            <span class="mx-2">-</span>
            <input :id="`end_time_${availability.value}`" v-model="time[1]" class="shadow appearance-none border rounded-lg w-full py-1 px-3 text-gray-700 leading-tight h-10 focus:outline-none focus:shadow-outline" type="time">
            <button class="py-1 px-3 h-10 mx-2 rounded-lg border-gray-300 border-2">Remove</button>
            <button class="py-1 px-3 h-10 rounded-lg bg-blue-600 text-white" @click="handleToggleModal(index)">Add</button>
          </div>
        </div>
        <div v-else class="text-neutral-400 italic text-sm mt-1.5" :style="{ flex: '0 1 calc(100% - 13px - 35px)' }">
          <span>Unavailable</span>
        </div>  
      </div>
    </div>
  </div>
</template>

<style>
</style>
