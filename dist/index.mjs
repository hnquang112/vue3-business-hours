import g from "moment";
import { withDirectives as m, openBlock as r, createElementBlock as a, createElementVNode as p, toDisplayString as f, vShow as V, Fragment as I, renderList as T, vModelSelect as S, normalizeClass as P, createCommentVNode as d, resolveComponent as H, resolveDirective as R, createBlock as y, createVNode as b, Transition as _, withCtx as N, createTextVNode as M, normalizeStyle as q, createStaticVNode as L } from "vue";
import A from "@vueform/toggle";
import k from "uniqid";
const E = {
  props: {
    localization: {
      type: Object
    }
  },
  methods: {
    titleCase: function(e) {
      return e.split("-").map(function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }).join(" ");
    },
    frontendTimeFormat: function(e) {
      return g(e, "HHmm").format(
        this.hourFormat24 ? "HH:mm" : "hh:mm A"
      );
    },
    backendTimeFormat: function(e) {
      return g(e, "hh:mm A").format("HHmm");
    },
    isValidFrontendTime: function(e) {
      return g(
        e,
        this.hourFormat24 ? "HH:mm" : "hh:mm A",
        !0
      ).isValid();
    },
    isValidBackendTime: function(e) {
      return g(e, "HHmm", !0).isValid();
    },
    frontendInputFormat: function(e) {
      return e === "24hrs" ? e = this.localization.t24hours : e === "2400" ? e = this.localization.midnight : this.isValidBackendTime(e) ? e = this.frontendTimeFormat(e) : e === "" && (e = ""), e;
    },
    backendInputFormat: function(e) {
      return e === this.localization.midnight || e === this.localization.midnight.toLowerCase() ? "2400" : e.toLowerCase() === this.localization.t24hours.toLowerCase() ? "24hrs" : this.isValidFrontendTime(e) ? this.backendTimeFormat(e) : e;
    },
    isEven: function(e) {
      return e % 2 == 0;
    },
    isFirstInput: function(e) {
      return e === 1;
    },
    isLastInput: function(e, i) {
      return e === i;
    },
    isFirstRow: function(e) {
      return e === 0;
    },
    isLastRow: function(e, i) {
      return e === i.length - 1;
    },
    isMiddleRow: function(e, i) {
      return !this.isFirstRow(e) && !this.isLastRow(e, i);
    },
    onlyOneRow: function(e) {
      return e.length === 1;
    },
    getPrevious: function(e, i, t) {
      if (t !== 1)
        return this.isEven(t) ? e[i].open : e[i - 1].close;
    },
    getNext: function(e, i, t, o) {
      if (t !== o)
        return this.isEven(t) ? e[i + 1].open : e[i].close;
    }
  }
}, B = {
  data() {
    return {
      selected: this.selectedTime,
      times: []
    };
  },
  props: {
    name: {
      type: String,
      required: !0
    },
    day: {
      type: String,
      required: !0
    },
    hours: {
      type: Array,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    inputNum: {
      type: Number,
      required: !0
    },
    totalInputs: {
      type: Number,
      required: !0
    },
    selectedTime: {
      type: String,
      required: !0
    },
    timeIncrement: {
      type: Number,
      required: !0
    },
    localization: {
      type: Object
    },
    hourFormat24: {
      type: Boolean
    }
  },
  created() {
    this.times = this.generateTimes(this.timeIncrement);
  },
  watch: {
    selectedTime: function() {
      this.selected = this.selectedTime;
    }
  },
  computed: {
    whichTime: function() {
      return this.isEven(this.inputNum) ? "close" : "open";
    },
    defaultText: function() {
      return this.whichTime === "open" ? this.localization.placeholderOpens : this.localization.placeholderCloses;
    },
    optionName: function() {
      return this.name + "[" + this.day + "][" + this.index + "][" + this.whichTime + "]";
    },
    filteredTimes: function() {
      let e = this.getPrevious(this.hours, this.index, this.inputNum), i = this.getNext(
        this.hours,
        this.index,
        this.inputNum,
        this.totalInputs
      ), t = this.times;
      return !this.isFirstRow(this.index) && e === "" && (e = this.getPrevious(this.hours, this.index, this.inputNum - 1)), this.isFirstInput(this.inputNum) ? t = this.getFiltered("before", i, t) : this.isLastInput(this.inputNum, this.totalInputs) ? t = this.getFiltered("after", e, t) : (t = this.getFiltered("before", i, t), t = this.getFiltered("after", e, t)), t;
    },
    showMidnightOption: function() {
      return this.isLastRow(this.index, this.hours) && this.whichTime === "close" && this.hours[this.index].close !== "24hrs";
    }
  },
  methods: {
    formatTime: function(e, i) {
      return g(e, "HHmm").format(i ? "HH:mm" : "hh:mm A");
    },
    inputEventHandler: function(e) {
      this.$emit("input-change", e.target.value);
    },
    generateTimes: function(e) {
      let i = "0000", t = [];
      do
        t.push(i), i = g(i, "HHmm").add(e, "minutes").format("HHmm");
      while (i !== "0000");
      return t;
    },
    getFiltered: function(e, i, t) {
      return this.isLastInput(this.inputNum, this.totalInputs) && this.hours[this.index].open === "" ? (t = t.filter((o) => o > i), t.shift(), t) : (i === "" || (e === "before" ? t = t.filter((o) => o < i) : e === "after" && (t = t.filter((o) => o > i))), t);
    }
  }
}, C = (e, i) => {
  const t = e.__vccOpts || e;
  for (const [o, l] of i)
    t[o] = l;
  return t;
}, j = {
  name: "BusinessHoursSelect",
  mixins: [E, B]
}, G = ["name"], Y = ["value", "selected"];
function J(e, i, t, o, l, n) {
  return m((r(), a("select", {
    name: e.optionName,
    onChange: i[0] || (i[0] = (...s) => e.inputEventHandler && e.inputEventHandler(...s)),
    "onUpdate:modelValue": i[1] || (i[1] = (s) => e.selected = s)
  }, [
    m(p("option", { value: "" }, f(e.defaultText), 513), [
      [V, e.isFirstRow(e.index) && e.onlyOneRow(e.hours)]
    ]),
    m(p("option", { value: "24hrs" }, f(e.localization.t24hours), 513), [
      [V, e.isFirstRow(e.index)]
    ]),
    (r(!0), a(I, null, T(e.filteredTimes, (s) => (r(), a("option", {
      key: s,
      value: s,
      selected: s == e.selected
    }, f(e.formatTime(s, e.hourFormat24)), 9, Y))), 128)),
    m(p("option", { value: "2400" }, f(e.localization.midnight), 513), [
      [V, e.showMidnightOption]
    ])
  ], 40, G)), [
    [S, e.selected]
  ]);
}
const W = /* @__PURE__ */ C(j, [["render", J]]), U = {
  name: "BusinessHoursDatalist",
  mixins: [E, B],
  props: {
    anyError: {
      type: Boolean,
      required: !0
    }
  },
  computed: {
    formattedTime: function() {
      return this.frontendInputFormat(this.selected);
    },
    datalistID: function() {
      return this.name.replace("_", "-") + "-" + this.day + "-" + this.index + "-" + this.whichTime;
    }
  }
}, K = ["list", "placeholder", "value"], Z = ["id"], Q = { key: 0 }, X = { key: 1 }, x = ["name", "value"];
function $(e, i, t, o, l, n) {
  return r(), a("div", null, [
    p("input", {
      class: P(["time-input", [t.anyError ? "has-error" : ""]]),
      type: "text",
      list: n.datalistID,
      placeholder: e.defaultText,
      onChange: i[0] || (i[0] = (...s) => e.inputEventHandler && e.inputEventHandler(...s)),
      value: n.formattedTime
    }, null, 42, K),
    p("datalist", { id: n.datalistID }, [
      e.isFirstRow(e.index) ? (r(), a("option", Q, f(e.localization.t24hours), 1)) : d("", !0),
      (r(!0), a(I, null, T(e.filteredTimes, (s) => (r(), a("option", { key: s }, f(e.formatTime(s, e.hourFormat24)), 1))), 128)),
      e.showMidnightOption ? (r(), a("option", X, f(e.localization.midnight), 1)) : d("", !0)
    ], 8, Z),
    p("input", {
      name: e.optionName,
      type: "hidden",
      value: e.selected
    }, null, 8, x)
  ]);
}
const ee = /* @__PURE__ */ C(U, [["render", $], ["__scopeId", "data-v-d30967ab"]]), te = {
  data() {
    return {
      validations: [],
      errors: {
        open: {
          invalidInput: this.localization.open.invalidInput,
          greaterThanNext: this.localization.open.greaterThanNext,
          lessThanPrevious: this.localization.open.lessThanPrevious,
          midnightNotLast: this.localization.open.midnightNotLast
        },
        close: {
          invalidInput: this.localization.close.invalidInput,
          lessThanPrevious: this.localization.close.lessThanPrevious,
          greaterThanNext: this.localization.close.greaterThanNext,
          midnightNotLast: this.localization.close.midnightNotLast
        }
      }
    };
  },
  created() {
    this.runValidations();
  },
  computed: {},
  methods: {
    defaultValidation: function() {
      return {
        invalidInput: !1,
        greaterThanNext: !1,
        lessThanPrevious: !1,
        midnightNotLast: !1
      };
    },
    defaultValidations: function() {
      return {
        anyErrors: !1,
        open: this.defaultValidation(),
        close: this.defaultValidation()
      };
    },
    isValidInput: function(e) {
      return this.isValidBackendTime(e) || e === "2400" || e === "24hrs" || e === "";
    },
    resetValidations: function() {
      let e = [];
      this.hours.forEach((i, t) => {
        e[t] = this.defaultValidations();
      }), this.validations = e;
    },
    runValidations: function() {
      let e = 1;
      this.resetValidations(), this.hours.forEach((i, t) => {
        this.runValidation(i.open, t, e, "open"), e++, this.runValidation(i.close, t, e, "close"), e++;
      }), this.updateAnyErrors();
    },
    runValidation: function(e, i, t, o) {
      this.isValidBackendTime(e) && (this.validations[i][o] = this.runInputValidation(
        e,
        i,
        t,
        this.totalInputs
      )), this.validations[i][o].invalidInput = !this.isValidInput(
        e
      ), this.updateAdjacentValidations(i, o, t);
    },
    runInputValidation: function(e, i, t, o) {
      const l = this.getPrevious(this.hours, i, t), n = this.getNext(this.hours, i, t, o);
      let s = this.defaultValidation();
      return s.midnightNotLast = e === "2400" && !this.isLastInput(t, o), l === void 0 ? s.greaterThanNext = e >= n && n !== "" : n === void 0 ? s.lessThanPrevious = e <= l && l !== "" : (s.lessThanPrevious = e <= l && l !== "", s.greaterThanNext = e >= n && n !== ""), s;
    },
    updateAdjacentValidations: function(e, i, t) {
      const o = e - 1, l = e + 1, n = this.validations[e][i];
      let s = this.getPrevious(this.validations, e, t), c = this.getNext(
        this.validations,
        e,
        t,
        this.totalInputs
      );
      s !== void 0 && (n.lessThanPrevious ? s.greaterThanNext = !0 : n.lessThanPrevious || (s.greaterThanNext = !1)), c !== void 0 && (n.greaterThanNext ? c.lessThanPrevious = !0 : n.greaterThanNext || (c.lessThanPrevious = !1)), !this.isFirstInput(t) && i === "open" ? this.validations[o].close = s : i === "close" && (this.validations[e].open = s), !this.isLastInput(t, this.totalInputs) && i === "close" ? this.validations[l].open = c : i === "open" && (this.validations[e].close = c);
    },
    updateAnyErrors: function() {
      this.validations.forEach(
        (e, i) => this.validations[i].anyErrors = this.anyErrors(e)
      );
    },
    anyErrors: function(e) {
      return !!(this.anyError(e.open) || this.anyError(e.close));
    },
    anyError: function(e) {
      return Object.keys(e).some((i) => e[i] === !0);
    },
    activeErrors: function(e) {
      const i = this.validations[e];
      let t = [];
      return Object.keys(i).forEach((o) => {
        if (typeof i[o] == "object") {
          let l = i[o];
          Object.keys(l).filter((n) => l[n] === !0).forEach((n) => {
            t.push({
              whichTime: o,
              error: n
            });
          });
        }
      }), t;
    },
    errorMessage: function(e, i) {
      return this.errors[e][i];
    }
  }
}, ie = {
  name: "BusinessHoursDay",
  components: {
    BusinessHoursSelect: W,
    BusinessHoursDatalist: ee,
    Toggle: A
  },
  mixins: [E, te],
  props: {
    day: {
      type: String,
      required: !0
    },
    hours: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    timeIncrement: {
      type: Number,
      required: !0
    },
    type: {
      type: String,
      required: !0
    },
    color: {
      type: String,
      required: !0
    },
    localization: {
      type: Object
    },
    switchWidth: {
      type: Number
    },
    hourFormat24: {
      type: Boolean
    }
  },
  computed: {
    totalInputs: function() {
      return this.hours.length * 2;
    },
    isOpenToday: function() {
      return this.hours[0].isOpen;
    },
    anyOpen: function() {
      return this.hours.some((e) => e.isOpen === !0);
    },
    uniqId: function() {
      return k();
    }
  },
  directives: {
    visible: function(e, i) {
      e.style.visibility = i.value ? "visible" : "hidden";
    }
  },
  methods: {
    onChangeEventHandler: function(e, i, t) {
      if (t = this.backendInputFormat(t), this.hours[0].id = this.hours[0].id || k(), t == "24hrs") {
        this.hours.splice(1), this.hours[0].open = this.hours[0].close = t, this.runValidations(), this.updateHours();
        return;
      }
      if ((this.hours[i].open == "24hrs" || this.hours[i].close == "24hrs") && t == "") {
        this.hours[i].open = this.hours[i].close = t, this.runValidations(), this.updateHours();
        return;
      }
      if (!this.onlyOneRow(this.hours) && t === "" && (e === "open" && this.hours[i].close === "" || e === "close" && this.hours[i].open === "")) {
        this.removeRow(i), this.runValidations(), this.updateHours();
        return;
      }
      this.hours[i][e] = t, this.runValidations(), this.updateHours();
    },
    inputNum: function(e, i) {
      if (e === "open")
        return i * 2 + 1;
      if (e === "close")
        return i * 2 + 2;
    },
    toggleOpen: function() {
      this.hours[0].isOpen = !this.hours[0].isOpen;
    },
    resetHours: function() {
      this.hours.splice(1), this.hours[0].open = this.hours[0].close = "", this.updateHours();
    },
    addRow: function() {
      this.hours.push({
        id: k(),
        open: "",
        close: "",
        isOpen: !0
      }), this.runValidations(), this.updateHours();
    },
    removeRow: function(e) {
      this.hours.splice(e, 1), this.runValidations(), this.updateHours();
    },
    showDay: function(e) {
      return !(e > 0);
    },
    showRemoveButton: function() {
      return this.hours.length > 1;
    },
    showAddButton: function(e) {
      return this.hours.length === e + 1 && this.hours[e].open !== "" && this.hours[e].close !== "" && this.hours[e].open !== "24hrs" && this.hours[e].close !== "24hrs" && !(this.type === "select" && this.timeIncrement === 15 && this.hours[e].close === "2345") && !(this.type === "select" && this.timeIncrement === 30 && this.hours[e].close === "2330") && !(this.type === "select" && this.timeIncrement === 60 && this.hours[e].close === "2300") && this.hours[e].close !== "2400" && this.validations[e].anyErrors === !1;
    },
    updateHours: function() {
      const e = { [this.day]: this.hours };
      this.$emit("hours-change", e);
    }
  }
}, ne = {
  is: "transition-group",
  name: "fade"
}, se = {
  class: "flex-table row",
  role: "rowgroup"
}, re = {
  class: "flex-row day",
  role: "cell"
}, oe = { key: 0 }, ae = {
  class: "flex-row switch",
  role: "cell"
}, ue = {
  class: "flex-row hours open",
  role: "cell"
}, le = {
  class: "flex-row dash",
  role: "cell"
}, he = {
  class: "flex-row hours close",
  role: "cell"
}, de = {
  class: "flex-row remove",
  role: "cell"
}, ce = ["onClick"], me = /* @__PURE__ */ L('<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3d4852" stroke-width="1.2" data-v-ec1a3203><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-ec1a3203></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-ec1a3203></g><g id="SVGRepo_iconCarrier" data-v-ec1a3203><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#3d4852" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#3d4852;" data-v-ec1a3203></path></g></svg>', 1), fe = [
  me
], pe = {
  class: "flex-row add",
  role: "cell"
}, ye = /* @__PURE__ */ L('<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-ec1a3203><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-ec1a3203></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-ec1a3203></g><g id="SVGRepo_iconCarrier" data-v-ec1a3203><path d="M6 12H18M12 6V18" stroke="#3d4852" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ec1a3203></path></g></svg>', 1), ge = [
  ye
], ve = {
  key: 0,
  class: "time-errors"
};
function we(e, i, t, o, l, n) {
  const s = H("Toggle"), c = H("BusinessHoursSelect"), v = H("BusinessHoursDatalist"), w = R("visible");
  return r(), a("div", ne, [
    (r(!0), a(I, null, T(t.hours, ({ open: z, close: O, id: F, isOpen: Ve }, u) => (r(), a("div", {
      key: F || n.uniqId
    }, [
      p("div", se, [
        p("div", re, [
          n.showDay(u) ? (r(), a("div", oe, f(t.localization.days[t.day]), 1)) : d("", !0)
        ]),
        p("div", ae, [
          n.showDay(u) ? (r(), y(s, {
            key: 0,
            id: "toggle-" + F || n.uniqId,
            modelValue: n.anyOpen,
            "onUpdate:modelValue": i[0] || (i[0] = (h) => n.anyOpen = h),
            onChange: i[1] || (i[1] = (h) => {
              n.toggleOpen(), n.resetHours(), e.runValidations();
            })
          }, null, 8, ["id", "modelValue"])) : d("", !0)
        ]),
        b(_, { name: "fade" }, {
          default: N(() => [
            m((r(), a("div", ue, [
              t.type === "select" ? (r(), y(c, {
                key: 0,
                name: t.name,
                "input-num": n.inputNum("open", u),
                "total-inputs": n.totalInputs,
                day: t.day,
                hours: t.hours,
                "time-increment": t.timeIncrement,
                index: u,
                "selected-time": z,
                localization: t.localization,
                "hour-format24": t.hourFormat24,
                onInputChange: (h) => n.onChangeEventHandler("open", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "selected-time", "localization", "hour-format24", "onInputChange"])) : d("", !0),
              t.type === "datalist" ? (r(), y(v, {
                key: 1,
                name: t.name,
                "input-num": n.inputNum("open", u),
                "total-inputs": n.totalInputs,
                day: t.day,
                hours: t.hours,
                "time-increment": t.timeIncrement,
                index: u,
                "selected-time": z,
                "any-error": e.anyError(e.validations[u].open),
                localization: t.localization,
                "hour-format24": t.hourFormat24,
                onInputChange: (h) => n.onChangeEventHandler("open", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "selected-time", "any-error", "localization", "hour-format24", "onInputChange"])) : d("", !0)
            ])), [
              [w, n.isOpenToday]
            ])
          ]),
          _: 2
        }, 1024),
        b(_, { name: "fade" }, {
          default: N(() => [
            m((r(), a("div", le, [
              M("-")
            ])), [
              [w, n.isOpenToday]
            ])
          ]),
          _: 1
        }),
        b(_, { name: "fade" }, {
          default: N(() => [
            m((r(), a("div", he, [
              t.type === "select" ? (r(), y(c, {
                key: 0,
                name: t.name,
                "input-num": n.inputNum("close", u),
                "total-inputs": n.totalInputs,
                day: t.day,
                hours: t.hours,
                "time-increment": t.timeIncrement,
                index: u,
                "selected-time": O,
                localization: t.localization,
                "hour-format24": t.hourFormat24,
                onInputChange: (h) => n.onChangeEventHandler("close", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "selected-time", "localization", "hour-format24", "onInputChange"])) : d("", !0),
              t.type === "datalist" ? (r(), y(v, {
                key: 1,
                name: t.name,
                "input-num": n.inputNum("close", u),
                "total-inputs": n.totalInputs,
                day: t.day,
                hours: t.hours,
                "time-increment": t.timeIncrement,
                index: u,
                "any-error": e.anyError(e.validations[u].close),
                "updated-validations": e.validations[u].close,
                "selected-time": O,
                "hour-format24": t.hourFormat24,
                localization: t.localization,
                onInputChange: (h) => n.onChangeEventHandler("close", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "any-error", "updated-validations", "selected-time", "hour-format24", "localization", "onInputChange"])) : d("", !0)
            ])), [
              [w, n.isOpenToday]
            ])
          ]),
          _: 2
        }, 1024),
        m((r(), a("div", de, [
          n.showRemoveButton() ? (r(), a("button", {
            key: 0,
            type: "button",
            class: "font-awesome-button",
            onClick: (h) => n.removeRow(u)
          }, fe, 8, ce)) : d("", !0)
        ])), [
          [w, n.isOpenToday]
        ]),
        m((r(), a("div", pe, [
          n.showAddButton(u) ? (r(), a("button", {
            key: 0,
            type: "button",
            style: q({ color: t.color }),
            class: "add-hours",
            onClick: i[2] || (i[2] = (h) => n.addRow())
          }, ge, 4)) : d("", !0)
        ])), [
          [w, n.isOpenToday]
        ])
      ]),
      e.validations[u].anyErrors ? (r(), a("ul", ve, [
        (r(!0), a(I, null, T(e.activeErrors(u), ({ whichTime: h, error: D }) => (r(), a("li", {
          key: h + "." + D
        }, f(e.errorMessage(h, D)), 1))), 128))
      ])) : d("", !0)
    ]))), 128))
  ]);
}
const Ie = /* @__PURE__ */ C(ie, [["render", we], ["__scopeId", "data-v-ec1a3203"]]), Te = {
  name: "BusinessHours",
  components: {
    BusinessHoursDay: Ie
  },
  props: {
    days: {
      type: Object,
      required: !0
    },
    name: {
      type: String,
      default: "businessHours"
    },
    type: {
      type: String,
      default: "datalist",
      validator: function(e) {
        return ["datalist", "select"].indexOf(e) !== -1;
      }
    },
    timeIncrement: {
      type: Number,
      default: 30,
      validator: function(e) {
        return [15, 30, 60].indexOf(e) !== -1;
      }
    },
    color: {
      type: String,
      default: "#2779bd",
      validator: function(e) {
        return e.charAt(0) === "#";
      }
    },
    localization: {
      type: Object,
      default: () => ({
        switchOpen: "Open",
        switchClosed: "Closed",
        placeholderOpens: "Opens",
        placeholderCloses: "Closes",
        addHours: "Add hours",
        open: {
          invalidInput: 'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
          greaterThanNext: "Please enter an opening time that is before the closing time.",
          lessThanPrevious: "Please enter an opening time that is after the previous closing time.",
          midnightNotLast: "Midnight can only be selected for the day's last closing time."
        },
        close: {
          invalidInput: 'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
          greaterThanNext: "Please enter a closing time that is after the opening time.",
          lessThanPrevious: "Please enter a closing time that is before the next opening time.",
          midnightNotLast: "Midnight can only be selected for the day's last closing time."
        },
        t24hours: "24 hours",
        midnight: "Midnight",
        days: {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday",
          newYearsEve: "New Year's Eve",
          // prettier-ignore
          newYearsDay: "New Year's Day",
          // prettier-ignore
          martinLutherKingJrDay: "Martin Luther King, Jr. Day",
          presidentsDay: "Presidents' Day",
          // prettier-ignore
          easter: "Easter",
          memorialDay: "Memorial Day",
          independenceDay: "Independence Day",
          fourthOfJuly: "4th of July",
          laborDay: "Labor Day",
          columbusDay: "Columbus Day",
          veteransDay: "Veterans Day",
          thanksgiving: "Thanksgiving",
          christmasEve: "Christmas Eve",
          christmas: "Christmas"
        }
      })
    },
    switchWidth: {
      type: Number,
      default: 90
    },
    hourFormat24: {
      type: Boolean,
      default: !1
    }
  },
  methods: {
    hoursChange: function(e) {
      this.$emit("updated-hours", e);
    }
  }
}, He = { class: "business-hours-container" };
function Ce(e, i, t, o, l, n) {
  const s = H("business-hours-day");
  return r(), a("div", He, [
    (r(!0), a(I, null, T(t.days, (c, v) => (r(), y(s, {
      onHoursChange: n.hoursChange,
      key: v,
      day: v,
      hours: c,
      name: t.name,
      "time-increment": t.timeIncrement,
      type: t.type,
      color: t.color,
      localization: t.localization,
      "switch-width": t.switchWidth,
      "hour-format24": t.hourFormat24
    }, null, 8, ["onHoursChange", "day", "hours", "name", "time-increment", "type", "color", "localization", "switch-width", "hour-format24"]))), 128))
  ]);
}
const Ee = /* @__PURE__ */ C(Te, [["render", Ce], ["__scopeId", "data-v-615046f5"]]);
export {
  Ee as default
};
