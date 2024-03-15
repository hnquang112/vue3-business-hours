<template>
  <div is="transition-group" name="fade">
    <div
      v-for="({ open, close, id, isOpen }, index) in hours"
      :key="id || uniqId"
    >
      <div class="flex-table row" role="rowgroup">
        <div class="flex-row day" role="cell">
          <div v-if="showDay(index)">{{ localization.days[day] }}</div>
        </div>
        <div class="flex-row switch" role="cell">
          <Toggle
            :id="'toggle-' + id || uniqId"
            v-if="showDay(index)"
            v-model="anyOpen"
            @change="
              toggleOpen();
              resetHours();
              runValidations();
            "
          ></Toggle>
        </div>
        <transition name="fade">
          <div class="flex-row hours open" role="cell" v-visible="isOpenToday">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              :any-error="anyError(validations[index].open)"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursDatalist>
          </div>
        </transition>
        <transition name="fade">
          <div class="flex-row dash" role="cell" v-visible="isOpenToday">-</div>
        </transition>
        <transition name="fade">
          <div class="flex-row hours close" role="cell" v-visible="isOpenToday">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="close"
              :localization="localization"
              :hour-format24="hourFormat24"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :any-error="anyError(validations[index].close)"
              :updated-validations="validations[index].close"
              :selected-time="close"
              :hour-format24="hourFormat24"
              :localization="localization"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursDatalist>
          </div>
        </transition>
        <div class="flex-row remove" role="cell" v-visible="isOpenToday">
          <button
            type="button"
            class="font-awesome-button"
            v-if="showRemoveButton()"
            @click="removeRow(index)"
          >
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#3d4852"
              stroke-width="1.2"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                  fill="#3d4852"
                  data-darkreader-inline-fill=""
                  style="--darkreader-inline-fill: #3d4852"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div class="flex-row add" role="cell" v-visible="isOpenToday">
          <button
            type="button"
            :style="{ color: color }"
            class="add-hours"
            v-if="showAddButton(index)"
            @click="addRow()"
          >
            <svg
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 12H18M12 6V18"
                  stroke="#3d4852"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <!-- {{ localization.addHours }} -->
          </button>
        </div>
      </div>
      <ul class="time-errors" v-if="validations[index].anyErrors">
        <li
          v-for="{ whichTime, error } in activeErrors(index)"
          :key="whichTime + '.' + error"
        >
          {{ errorMessage(whichTime, error) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BusinessHoursSelect from './BusinessHoursSelect.vue';
import BusinessHoursDatalist from './BusinessHoursDatalist.vue';
import Toggle from '@vueform/toggle';
import uniqid from 'uniqid';
import { helperMixin } from '../mixins/helperMixin';
import { validationMixin } from '../mixins/validationMixin';
import '@vueform/toggle/themes/default.css';

export default {
  name: 'BusinessHoursDay',
  components: {
    BusinessHoursSelect,
    BusinessHoursDatalist,
    Toggle,
  },
  mixins: [helperMixin, validationMixin],
  props: {
    day: {
      type: String,
      required: true,
    },
    hours: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    timeIncrement: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    localization: {
      type: Object,
    },
    switchWidth: {
      type: Number,
    },
    hourFormat24: {
      type: Boolean,
    },
  },
  computed: {
    totalInputs: function () {
      return this.hours.length * 2;
    },
    isOpenToday: function () {
      return this.hours[0].isOpen;
    },
    anyOpen: function () {
      return this.hours.some((hour) => {
        return hour.isOpen === true;
      });
    },
    uniqId: function () {
      return uniqid();
    },
  },
  directives: {
    visible: function (el, binding) {
      el.style.visibility = binding.value ? 'visible' : 'hidden';
    },
  },
  methods: {
    onChangeEventHandler: function (whichTime, index, value) {
      value = this.backendInputFormat(value);

      this.hours[0].id = this.hours[0].id || uniqid();

      if (value == '24hrs') {
        this.hours.splice(1);
        this.hours[0].open = this.hours[0].close = value;
        this.runValidations();
        this.updateHours();
        return;
      }

      if (
        (this.hours[index].open == '24hrs' ||
          this.hours[index].close == '24hrs') &&
        value == ''
      ) {
        this.hours[index].open = this.hours[index].close = value;
        this.runValidations();
        this.updateHours();
        return;
      }

      if (
        !this.onlyOneRow(this.hours) &&
        value === '' &&
        ((whichTime === 'open' && this.hours[index].close === '') ||
          (whichTime === 'close' && this.hours[index].open === ''))
      ) {
        this.removeRow(index);
        this.runValidations();
        this.updateHours();
        return;
      }

      this.hours[index][whichTime] = value;
      this.runValidations();
      this.updateHours();
    },
    inputNum: function (whichTime, index) {
      if (whichTime === 'open') {
        return index * 2 + 1;
      } else if (whichTime === 'close') {
        return index * 2 + 2;
      }
    },
    toggleOpen: function () {
      this.hours[0].isOpen = this.hours[0].isOpen ? false : true;
    },
    resetHours: function () {
      this.hours.splice(1);
      this.hours[0].open = this.hours[0].close = '';
      this.updateHours();
    },
    addRow: function () {
      this.hours.push({
        id: uniqid(),
        open: '',
        close: '',
        isOpen: true,
      });
      this.runValidations();
      this.updateHours();
    },
    removeRow: function (index) {
      this.hours.splice(index, 1);
      this.runValidations();
      this.updateHours();
    },
    showDay: function (index) {
      return index > 0 ? false : true;
    },
    showRemoveButton: function () {
      return this.hours.length > 1 ? true : false;
    },
    showAddButton: function (index) {
      return this.hours.length === index + 1 &&
        this.hours[index].open !== '' &&
        this.hours[index].close !== '' &&
        this.hours[index].open !== '24hrs' &&
        this.hours[index].close !== '24hrs' &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 15 &&
          this.hours[index].close === '2345'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 30 &&
          this.hours[index].close === '2330'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 60 &&
          this.hours[index].close === '2300'
        ) &&
        this.hours[index].close !== '2400' &&
        this.validations[index].anyErrors === false
        ? true
        : false;
    },
    updateHours: function () {
      const updatedHours = { [this.day]: this.hours };
      this.$emit('hours-change', updatedHours);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  // margin: 0.75em 0;
  height: 45px;
  width: 100%;
}

.flex-row {
  width: 20%;
}

.flex-row :deep(input),
.flex-row :deep(select) {
  margin: 1px;
  padding: 3px 5px;
  width: 110px;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  vertical-align: middle;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
}

.flex-row.day {
  width: 130px;
}

.flex-row.hours {
  width: 110px;
}

.flex-row.dash {
  margin: 0 7px;
  width: 4px;
}

.row-container {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.remove {
  display: flex;
  justify-content: center;
  width: 50px;
}

label.vue-js-switch {
  margin-bottom: 0;
}

button.add-hours,
button.font-awesome-button {
  height: 30px;
  background-color: transparent;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  padding: 0;
  cursor: pointer;
}

button.add-hours:focus,
button.font-awesome-button:focus {
  outline: none;
}

button.font-awesome-button {
  width: 30px;
  font-size: 24px;
}

button.add-hours {
  font-size: 14px;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.time-errors {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #e3342f;
  list-style: none;
}

.time-errors li {
  margin-bottom: 6px;
}
</style>
