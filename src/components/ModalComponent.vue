<script setup lang="ts">
import { ref, toRef } from 'vue';

import { VISIT_DURATION_LIST } from '@/models/constants';
import type { Available } from '@/models/types';

interface Props {
  isOpen: boolean;
  selectedIndex: number;
  availabilityList: Available[];
  onToggle: (index?: number) => void;
}

const selectedDuration = ref('');
const bookingCount = ref('');
const hasTourCall = ref(false);

const props = defineProps<Props>();
const selectedIndex = toRef(props, 'selectedIndex');
const availabilityList = toRef(props, 'availabilityList');

function resetForm() {
  selectedDuration.value = '';
  bookingCount.value = '';
  hasTourCall.value = false;
}

function handleClickAdd() {
  console.log({ bookingCount: bookingCount.value });
  [...Array(+bookingCount.value)].forEach(() => (
    availabilityList.value[selectedIndex.value].times.push([])
  ))
  console.log(availabilityList.value);
  resetForm();
  props.onToggle();
}

</script>

<template>
  <div v-if="isOpen" class="w-full h-screen absolute bg-stone-900/30 z-10">
    <form class="w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-lg">
      <div class="flex justify-end">
        <button @click="onToggle()">
          &#10006;
        </button>
      </div>

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
        <input id="booking_count" v-model="bookingCount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="has_tour_call">
          Allow video tour call
        </label>
        <input id="has_tour_call" v-model="hasTourCall" type="checkbox" >
      </div>

      <div class="flex justify-end gap-2">
        <button class="py-1 px-3 h-10 rounded-lg border-gray-300 border-2" type="button" @click="onToggle()">
          Cancel
        </button>
        <button class="py-1 px-3 h-10 rounded-lg bg-blue-600 text-white" type="button" @click="handleClickAdd()">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<style>
</style>