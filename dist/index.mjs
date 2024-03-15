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
    titleCase: function(t) {
      return t.split("-").map(function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }).join(" ");
    },
    frontendTimeFormat: function(t) {
      return g(t, "HHmm").format(
        this.hourFormat24 ? "HH:mm" : "hh:mm A"
      );
    },
    backendTimeFormat: function(t) {
      return g(t, "hh:mm A").format("HHmm");
    },
    isValidFrontendTime: function(t) {
      return g(
        t,
        this.hourFormat24 ? "HH:mm" : "hh:mm A",
        !0
      ).isValid();
    },
    isValidBackendTime: function(t) {
      return g(t, "HHmm", !0).isValid();
    },
    frontendInputFormat: function(t) {
      return t === "24hrs" ? t = this.localization.t24hours : t === "2400" ? t = this.localization.midnight : this.isValidBackendTime(t) ? t = this.frontendTimeFormat(t) : t === "" && (t = ""), t;
    },
    backendInputFormat: function(t) {
      return t === this.localization.midnight || t === this.localization.midnight.toLowerCase() ? "2400" : t.toLowerCase() === this.localization.t24hours.toLowerCase() ? "24hrs" : this.isValidFrontendTime(t) ? this.backendTimeFormat(t) : t;
    },
    isEven: function(t) {
      return t % 2 == 0;
    },
    isFirstInput: function(t) {
      return t === 1;
    },
    isLastInput: function(t, i) {
      return t === i;
    },
    isFirstRow: function(t) {
      return t === 0;
    },
    isLastRow: function(t, i) {
      return t === i.length - 1;
    },
    isMiddleRow: function(t, i) {
      return !this.isFirstRow(t) && !this.isLastRow(t, i);
    },
    onlyOneRow: function(t) {
      return t.length === 1;
    },
    getPrevious: function(t, i, e) {
      if (e !== 1)
        return this.isEven(e) ? t[i].open : t[i - 1].close;
    },
    getNext: function(t, i, e, o) {
      if (e !== o)
        return this.isEven(e) ? t[i + 1].open : t[i].close;
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
      let t = this.getPrevious(this.hours, this.index, this.inputNum), i = this.getNext(
        this.hours,
        this.index,
        this.inputNum,
        this.totalInputs
      ), e = this.times;
      return !this.isFirstRow(this.index) && t === "" && (t = this.getPrevious(this.hours, this.index, this.inputNum - 1)), this.isFirstInput(this.inputNum) ? e = this.getFiltered("before", i, e) : this.isLastInput(this.inputNum, this.totalInputs) ? e = this.getFiltered("after", t, e) : (e = this.getFiltered("before", i, e), e = this.getFiltered("after", t, e)), e;
    },
    showMidnightOption: function() {
      return this.isLastRow(this.index, this.hours) && this.whichTime === "close" && this.hours[this.index].close !== "24hrs";
    }
  },
  methods: {
    formatTime: function(t, i) {
      return g(t, "HHmm").format(i ? "HH:mm" : "hh:mm A");
    },
    inputEventHandler: function(t) {
      this.$emit("input-change", t.target.value);
    },
    generateTimes: function(t) {
      let i = "0000", e = [];
      do
        e.push(i), i = g(i, "HHmm").add(t, "minutes").format("HHmm");
      while (i !== "0000");
      return e;
    },
    getFiltered: function(t, i, e) {
      return this.isLastInput(this.inputNum, this.totalInputs) && this.hours[this.index].open === "" ? (e = e.filter((o) => o > i), e.shift(), e) : (i === "" || (t === "before" ? e = e.filter((o) => o < i) : t === "after" && (e = e.filter((o) => o > i))), e);
    }
  }
}, C = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [o, l] of i)
    e[o] = l;
  return e;
}, j = {
  name: "BusinessHoursSelect",
  mixins: [E, B]
}, G = ["name"], Y = ["value", "selected"];
function J(t, i, e, o, l, n) {
  return m((r(), a("select", {
    name: t.optionName,
    onChange: i[0] || (i[0] = (...s) => t.inputEventHandler && t.inputEventHandler(...s)),
    "onUpdate:modelValue": i[1] || (i[1] = (s) => t.selected = s)
  }, [
    m(p("option", { value: "" }, f(t.defaultText), 513), [
      [V, t.isFirstRow(t.index) && t.onlyOneRow(t.hours)]
    ]),
    m(p("option", { value: "24hrs" }, f(t.localization.t24hours), 513), [
      [V, t.isFirstRow(t.index)]
    ]),
    (r(!0), a(I, null, T(t.filteredTimes, (s) => (r(), a("option", {
      key: s,
      value: s,
      selected: s == t.selected
    }, f(t.formatTime(s, t.hourFormat24)), 9, Y))), 128)),
    m(p("option", { value: "2400" }, f(t.localization.midnight), 513), [
      [V, t.showMidnightOption]
    ])
  ], 40, G)), [
    [S, t.selected]
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
function $(t, i, e, o, l, n) {
  return r(), a("div", null, [
    p("input", {
      class: P(["time-input", [e.anyError ? "has-error" : ""]]),
      type: "text",
      list: n.datalistID,
      placeholder: t.defaultText,
      onChange: i[0] || (i[0] = (...s) => t.inputEventHandler && t.inputEventHandler(...s)),
      value: n.formattedTime
    }, null, 42, K),
    p("datalist", { id: n.datalistID }, [
      t.isFirstRow(t.index) ? (r(), a("option", Q, f(t.localization.t24hours), 1)) : d("", !0),
      (r(!0), a(I, null, T(t.filteredTimes, (s) => (r(), a("option", { key: s }, f(t.formatTime(s, t.hourFormat24)), 1))), 128)),
      t.showMidnightOption ? (r(), a("option", X, f(t.localization.midnight), 1)) : d("", !0)
    ], 8, Z),
    p("input", {
      name: t.optionName,
      type: "hidden",
      value: t.selected
    }, null, 8, x)
  ]);
}
const tt = /* @__PURE__ */ C(U, [["render", $], ["__scopeId", "data-v-d30967ab"]]), et = {
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
    isValidInput: function(t) {
      return this.isValidBackendTime(t) || t === "2400" || t === "24hrs" || t === "";
    },
    resetValidations: function() {
      let t = [];
      this.hours.forEach((i, e) => {
        t[e] = this.defaultValidations();
      }), this.validations = t;
    },
    runValidations: function() {
      let t = 1;
      this.resetValidations(), this.hours.forEach((i, e) => {
        this.runValidation(i.open, e, t, "open"), t++, this.runValidation(i.close, e, t, "close"), t++;
      }), this.updateAnyErrors();
    },
    runValidation: function(t, i, e, o) {
      this.isValidBackendTime(t) && (this.validations[i][o] = this.runInputValidation(
        t,
        i,
        e,
        this.totalInputs
      )), this.validations[i][o].invalidInput = !this.isValidInput(
        t
      ), this.updateAdjacentValidations(i, o, e);
    },
    runInputValidation: function(t, i, e, o) {
      const l = this.getPrevious(this.hours, i, e), n = this.getNext(this.hours, i, e, o);
      let s = this.defaultValidation();
      return s.midnightNotLast = t === "2400" && !this.isLastInput(e, o), l === void 0 ? s.greaterThanNext = t >= n && n !== "" : n === void 0 ? s.lessThanPrevious = t <= l && l !== "" : (s.lessThanPrevious = t <= l && l !== "", s.greaterThanNext = t >= n && n !== ""), s;
    },
    updateAdjacentValidations: function(t, i, e) {
      const o = t - 1, l = t + 1, n = this.validations[t][i];
      let s = this.getPrevious(this.validations, t, e), c = this.getNext(
        this.validations,
        t,
        e,
        this.totalInputs
      );
      s !== void 0 && (n.lessThanPrevious ? s.greaterThanNext = !0 : n.lessThanPrevious || (s.greaterThanNext = !1)), c !== void 0 && (n.greaterThanNext ? c.lessThanPrevious = !0 : n.greaterThanNext || (c.lessThanPrevious = !1)), !this.isFirstInput(e) && i === "open" ? this.validations[o].close = s : i === "close" && (this.validations[t].open = s), !this.isLastInput(e, this.totalInputs) && i === "close" ? this.validations[l].open = c : i === "open" && (this.validations[t].close = c);
    },
    updateAnyErrors: function() {
      this.validations.forEach(
        (t, i) => this.validations[i].anyErrors = this.anyErrors(t)
      );
    },
    anyErrors: function(t) {
      return !!(this.anyError(t.open) || this.anyError(t.close));
    },
    anyError: function(t) {
      return Object.keys(t).some((i) => t[i] === !0);
    },
    activeErrors: function(t) {
      const i = this.validations[t];
      let e = [];
      return Object.keys(i).forEach((o) => {
        if (typeof i[o] == "object") {
          let l = i[o];
          Object.keys(l).filter((n) => l[n] === !0).forEach((n) => {
            e.push({
              whichTime: o,
              error: n
            });
          });
        }
      }), e;
    },
    errorMessage: function(t, i) {
      return this.errors[t][i];
    }
  }
}, it = {
  name: "BusinessHoursDay",
  components: {
    BusinessHoursSelect: W,
    BusinessHoursDatalist: tt,
    Toggle: A
  },
  mixins: [E, et],
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
      return this.hours.some((t) => t.isOpen === !0);
    },
    uniqId: function() {
      return k();
    }
  },
  directives: {
    visible: function(t, i) {
      t.style.visibility = i.value ? "visible" : "hidden";
    }
  },
  methods: {
    onChangeEventHandler: function(t, i, e) {
      if (e = this.backendInputFormat(e), this.hours[0].id = this.hours[0].id || k(), e == "24hrs") {
        this.hours.splice(1), this.hours[0].open = this.hours[0].close = e, this.runValidations(), this.updateHours();
        return;
      }
      if ((this.hours[i].open == "24hrs" || this.hours[i].close == "24hrs") && e == "") {
        this.hours[i].open = this.hours[i].close = e, this.runValidations(), this.updateHours();
        return;
      }
      if (!this.onlyOneRow(this.hours) && e === "" && (t === "open" && this.hours[i].close === "" || t === "close" && this.hours[i].open === "")) {
        this.removeRow(i), this.runValidations(), this.updateHours();
        return;
      }
      this.hours[i][t] = e, this.runValidations(), this.updateHours();
    },
    inputNum: function(t, i) {
      if (t === "open")
        return i * 2 + 1;
      if (t === "close")
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
    removeRow: function(t) {
      this.hours.splice(t, 1), this.runValidations(), this.updateHours();
    },
    showDay: function(t) {
      return !(t > 0);
    },
    showRemoveButton: function() {
      return this.hours.length > 1;
    },
    showAddButton: function(t) {
      return this.hours.length === t + 1 && this.hours[t].open !== "" && this.hours[t].close !== "" && this.hours[t].open !== "24hrs" && this.hours[t].close !== "24hrs" && !(this.type === "select" && this.timeIncrement === 15 && this.hours[t].close === "2345") && !(this.type === "select" && this.timeIncrement === 30 && this.hours[t].close === "2330") && !(this.type === "select" && this.timeIncrement === 60 && this.hours[t].close === "2300") && this.hours[t].close !== "2400" && this.validations[t].anyErrors === !1;
    },
    updateHours: function() {
      const t = { [this.day]: this.hours };
      this.$emit("hours-change", t);
    }
  }
}, nt = {
  is: "transition-group",
  name: "fade"
}, st = {
  class: "flex-table row",
  role: "rowgroup"
}, rt = {
  class: "flex-row day",
  role: "cell"
}, ot = { key: 0 }, at = {
  class: "flex-row switch",
  role: "cell"
}, ut = {
  class: "flex-row hours open",
  role: "cell"
}, lt = {
  class: "flex-row dash",
  role: "cell"
}, ht = {
  class: "flex-row hours close",
  role: "cell"
}, dt = {
  class: "flex-row remove",
  role: "cell"
}, ct = ["onClick"], mt = /* @__PURE__ */ L('<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2" data-v-c0607a0c><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-c0607a0c></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></g><g id="SVGRepo_iconCarrier" data-v-c0607a0c><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#0b0c0d;" data-v-c0607a0c></path></g></svg>', 1), ft = [
  mt
], pt = {
  class: "flex-row add",
  role: "cell"
}, yt = /* @__PURE__ */ L('<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c0607a0c><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-c0607a0c></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></g><g id="SVGRepo_iconCarrier" data-v-c0607a0c><path d="M6 12H18M12 6V18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></path></g></svg>', 1), gt = [
  yt
], vt = {
  key: 0,
  class: "time-errors"
};
function wt(t, i, e, o, l, n) {
  const s = H("Toggle"), c = H("BusinessHoursSelect"), v = H("BusinessHoursDatalist"), w = R("visible");
  return r(), a("div", nt, [
    (r(!0), a(I, null, T(e.hours, ({ open: z, close: F, id: O, isOpen: Vt }, u) => (r(), a("div", {
      key: O || n.uniqId
    }, [
      p("div", st, [
        p("div", rt, [
          n.showDay(u) ? (r(), a("div", ot, f(e.localization.days[e.day]), 1)) : d("", !0)
        ]),
        p("div", at, [
          n.showDay(u) ? (r(), y(s, {
            key: 0,
            id: "toggle-" + O || n.uniqId,
            modelValue: n.anyOpen,
            "onUpdate:modelValue": i[0] || (i[0] = (h) => n.anyOpen = h),
            onChange: i[1] || (i[1] = (h) => {
              n.toggleOpen(), n.resetHours(), t.runValidations();
            })
          }, null, 8, ["id", "modelValue"])) : d("", !0)
        ]),
        b(_, { name: "fade" }, {
          default: N(() => [
            m((r(), a("div", ut, [
              e.type === "select" ? (r(), y(c, {
                key: 0,
                name: e.name,
                "input-num": n.inputNum("open", u),
                "total-inputs": n.totalInputs,
                day: e.day,
                hours: e.hours,
                "time-increment": e.timeIncrement,
                index: u,
                "selected-time": z,
                localization: e.localization,
                "hour-format24": e.hourFormat24,
                onInputChange: (h) => n.onChangeEventHandler("open", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "selected-time", "localization", "hour-format24", "onInputChange"])) : d("", !0),
              e.type === "datalist" ? (r(), y(v, {
                key: 1,
                name: e.name,
                "input-num": n.inputNum("open", u),
                "total-inputs": n.totalInputs,
                day: e.day,
                hours: e.hours,
                "time-increment": e.timeIncrement,
                index: u,
                "selected-time": z,
                "any-error": t.anyError(t.validations[u].open),
                localization: e.localization,
                "hour-format24": e.hourFormat24,
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
            m((r(), a("div", lt, [
              M("-")
            ])), [
              [w, n.isOpenToday]
            ])
          ]),
          _: 1
        }),
        b(_, { name: "fade" }, {
          default: N(() => [
            m((r(), a("div", ht, [
              e.type === "select" ? (r(), y(c, {
                key: 0,
                name: e.name,
                "input-num": n.inputNum("close", u),
                "total-inputs": n.totalInputs,
                day: e.day,
                hours: e.hours,
                "time-increment": e.timeIncrement,
                index: u,
                "selected-time": F,
                localization: e.localization,
                "hour-format24": e.hourFormat24,
                onInputChange: (h) => n.onChangeEventHandler("close", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "selected-time", "localization", "hour-format24", "onInputChange"])) : d("", !0),
              e.type === "datalist" ? (r(), y(v, {
                key: 1,
                name: e.name,
                "input-num": n.inputNum("close", u),
                "total-inputs": n.totalInputs,
                day: e.day,
                hours: e.hours,
                "time-increment": e.timeIncrement,
                index: u,
                "any-error": t.anyError(t.validations[u].close),
                "updated-validations": t.validations[u].close,
                "selected-time": F,
                "hour-format24": e.hourFormat24,
                localization: e.localization,
                onInputChange: (h) => n.onChangeEventHandler("close", u, h)
              }, null, 8, ["name", "input-num", "total-inputs", "day", "hours", "time-increment", "index", "any-error", "updated-validations", "selected-time", "hour-format24", "localization", "onInputChange"])) : d("", !0)
            ])), [
              [w, n.isOpenToday]
            ])
          ]),
          _: 2
        }, 1024),
        m((r(), a("div", dt, [
          n.showRemoveButton() ? (r(), a("button", {
            key: 0,
            type: "button",
            class: "font-awesome-button",
            onClick: (h) => n.removeRow(u)
          }, ft, 8, ct)) : d("", !0)
        ])), [
          [w, n.isOpenToday]
        ]),
        m((r(), a("div", pt, [
          n.showAddButton(u) ? (r(), a("button", {
            key: 0,
            type: "button",
            style: q({ color: e.color }),
            class: "add-hours",
            onClick: i[2] || (i[2] = (h) => n.addRow())
          }, gt, 4)) : d("", !0)
        ])), [
          [w, n.isOpenToday]
        ])
      ]),
      t.validations[u].anyErrors ? (r(), a("ul", vt, [
        (r(!0), a(I, null, T(t.activeErrors(u), ({ whichTime: h, error: D }) => (r(), a("li", {
          key: h + "." + D
        }, f(t.errorMessage(h, D)), 1))), 128))
      ])) : d("", !0)
    ]))), 128))
  ]);
}
const It = /* @__PURE__ */ C(it, [["render", wt], ["__scopeId", "data-v-c0607a0c"]]), Tt = {
  name: "BusinessHours",
  components: {
    BusinessHoursDay: It
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
      validator: function(t) {
        return ["datalist", "select"].indexOf(t) !== -1;
      }
    },
    timeIncrement: {
      type: Number,
      default: 30,
      validator: function(t) {
        return [15, 30, 60].indexOf(t) !== -1;
      }
    },
    color: {
      type: String,
      default: "#2779bd",
      validator: function(t) {
        return t.charAt(0) === "#";
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
    hoursChange: function(t) {
      this.$emit("updated-hours", t);
    }
  }
}, Ht = { class: "business-hours-container" };
function Ct(t, i, e, o, l, n) {
  const s = H("business-hours-day");
  return r(), a("div", Ht, [
    (r(!0), a(I, null, T(e.days, (c, v) => (r(), y(s, {
      onHoursChange: n.hoursChange,
      key: v,
      day: v,
      hours: c,
      name: e.name,
      "time-increment": e.timeIncrement,
      type: e.type,
      color: e.color,
      localization: e.localization,
      "switch-width": e.switchWidth,
      "hour-format24": e.hourFormat24
    }, null, 8, ["onHoursChange", "day", "hours", "name", "time-increment", "type", "color", "localization", "switch-width", "hour-format24"]))), 128))
  ]);
}
const Et = /* @__PURE__ */ C(Tt, [["render", Ct], ["__scopeId", "data-v-c1580f11"]]);
export {
  Et as default
};
