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
:root
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
  /* line-height: 1.5; */
  font-weight: 400

  // color-scheme: light dark
  color: rgba(255, 255, 255, 0.87)
  background-color: #242424

  font-synthesis: none
  text-rendering: optimizeLegibility
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

body
  margin: 0
  display: flex
  place-items: center
  min-width: 320px
  min-height: 100vh

#app
  max-width: 1280px
  margin: 0 auto
  padding: 2rem
  text-align: center

pre
  text-align: left

@media (prefers-color-scheme: light)
  :root
    color: #213547
    background-color: #ffffff

  a:hover
    color: #747bff

  button
    background-color: #f9f9f9
</style>
