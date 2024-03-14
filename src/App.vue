<template>
  <h2>Business Hours</h2>

  <BusinessHours
    :days="days"
    type="select"
    :hour-format24="true"
  ></BusinessHours>

  <pre>
    {{ days }}
  </pre>
</template>

<script setup>
import { ref } from 'vue';
import BusinessHours from './components/BusinessHours.vue';

const days = ref({
  monday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  tuesday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  wednesday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  thursday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  friday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  saturday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
  sunday: [
    {
      open: '',
      close: '',
      id: '',
      isOpen: false,
    },
  ],
});
</script>

<style lang="sass" scope>
pre
  text-align: left
</style>
