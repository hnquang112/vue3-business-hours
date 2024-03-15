(function(u,t){typeof exports=="object"&&typeof module<"u"?module.exports=t(require("moment"),require("vue"),require("@vueform/toggle"),require("uniqid")):typeof define=="function"&&define.amd?define(["moment","vue","@vueform/toggle","uniqid"],t):(u=typeof globalThis<"u"?globalThis:u||self,u["@hnquang/vue3-business-hours"]=t(u.moment,u.vue,u.Toggle,u.uniqid))})(this,function(u,t,E,p){"use strict";const y={props:{localization:{type:Object}},methods:{titleCase:function(e){return e.split("-").map(function(i){return i.charAt(0).toUpperCase()+i.slice(1)}).join(" ")},frontendTimeFormat:function(e){return u(e,"HHmm").format(this.hourFormat24?"HH:mm":"hh:mm A")},backendTimeFormat:function(e){return u(e,"hh:mm A").format("HHmm")},isValidFrontendTime:function(e){return u(e,this.hourFormat24?"HH:mm":"hh:mm A",!0).isValid()},isValidBackendTime:function(e){return u(e,"HHmm",!0).isValid()},frontendInputFormat:function(e){return e==="24hrs"?e=this.localization.t24hours:e==="2400"?e=this.localization.midnight:this.isValidBackendTime(e)?e=this.frontendTimeFormat(e):e===""&&(e=""),e},backendInputFormat:function(e){return e===this.localization.midnight||e===this.localization.midnight.toLowerCase()?"2400":e.toLowerCase()===this.localization.t24hours.toLowerCase()?"24hrs":this.isValidFrontendTime(e)?this.backendTimeFormat(e):e},isEven:function(e){return e%2==0},isFirstInput:function(e){return e===1},isLastInput:function(e,n){return e===n},isFirstRow:function(e){return e===0},isLastRow:function(e,n){return e===n.length-1},isMiddleRow:function(e,n){return!this.isFirstRow(e)&&!this.isLastRow(e,n)},onlyOneRow:function(e){return e.length===1},getPrevious:function(e,n,i){if(i!==1)return this.isEven(i)?e[n].open:e[n-1].close},getNext:function(e,n,i,r){if(i!==r)return this.isEven(i)?e[n+1].open:e[n].close}}},g={data(){return{selected:this.selectedTime,times:[]}},props:{name:{type:String,required:!0},day:{type:String,required:!0},hours:{type:Array,required:!0},index:{type:Number,required:!0},inputNum:{type:Number,required:!0},totalInputs:{type:Number,required:!0},selectedTime:{type:String,required:!0},timeIncrement:{type:Number,required:!0},localization:{type:Object},hourFormat24:{type:Boolean}},created(){this.times=this.generateTimes(this.timeIncrement)},watch:{selectedTime:function(){this.selected=this.selectedTime}},computed:{whichTime:function(){return this.isEven(this.inputNum)?"close":"open"},defaultText:function(){return this.whichTime==="open"?this.localization.placeholderOpens:this.localization.placeholderCloses},optionName:function(){return this.name+"["+this.day+"]["+this.index+"]["+this.whichTime+"]"},filteredTimes:function(){let e=this.getPrevious(this.hours,this.index,this.inputNum),n=this.getNext(this.hours,this.index,this.inputNum,this.totalInputs),i=this.times;return!this.isFirstRow(this.index)&&e===""&&(e=this.getPrevious(this.hours,this.index,this.inputNum-1)),this.isFirstInput(this.inputNum)?i=this.getFiltered("before",n,i):this.isLastInput(this.inputNum,this.totalInputs)?i=this.getFiltered("after",e,i):(i=this.getFiltered("before",n,i),i=this.getFiltered("after",e,i)),i},showMidnightOption:function(){return this.isLastRow(this.index,this.hours)&&this.whichTime==="close"&&this.hours[this.index].close!=="24hrs"}},methods:{formatTime:function(e,n){return u(e,"HHmm").format(n?"HH:mm":"hh:mm A")},inputEventHandler:function(e){this.$emit("input-change",e.target.value)},generateTimes:function(e){let n="0000",i=[];do i.push(n),n=u(n,"HHmm").add(e,"minutes").format("HHmm");while(n!=="0000");return i},getFiltered:function(e,n,i){return this.isLastInput(this.inputNum,this.totalInputs)&&this.hours[this.index].open===""?(i=i.filter(r=>r>n),i.shift(),i):(n===""||(e==="before"?i=i.filter(r=>r<n):e==="after"&&(i=i.filter(r=>r>n))),i)}}},f=(e,n)=>{const i=e.__vccOpts||e;for(const[r,l]of n)i[r]=l;return i},N={name:"BusinessHoursSelect",mixins:[y,g]},T=["name"],C=["value","selected"];function I(e,n,i,r,l,s){return t.withDirectives((t.openBlock(),t.createElementBlock("select",{name:e.optionName,onChange:n[0]||(n[0]=(...o)=>e.inputEventHandler&&e.inputEventHandler(...o)),"onUpdate:modelValue":n[1]||(n[1]=o=>e.selected=o)},[t.withDirectives(t.createElementVNode("option",{value:""},t.toDisplayString(e.defaultText),513),[[t.vShow,e.isFirstRow(e.index)&&e.onlyOneRow(e.hours)]]),t.withDirectives(t.createElementVNode("option",{value:"24hrs"},t.toDisplayString(e.localization.t24hours),513),[[t.vShow,e.isFirstRow(e.index)]]),(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(e.filteredTimes,o=>(t.openBlock(),t.createElementBlock("option",{key:o,value:o,selected:o==e.selected},t.toDisplayString(e.formatTime(o,e.hourFormat24)),9,C))),128)),t.withDirectives(t.createElementVNode("option",{value:"2400"},t.toDisplayString(e.localization.midnight),513),[[t.vShow,e.showMidnightOption]])],40,T)),[[t.vModelSelect,e.selected]])}const H=f(N,[["render",I]]),_={name:"BusinessHoursDatalist",mixins:[y,g],props:{anyError:{type:Boolean,required:!0}},computed:{formattedTime:function(){return this.frontendInputFormat(this.selected)},datalistID:function(){return this.name.replace("_","-")+"-"+this.day+"-"+this.index+"-"+this.whichTime}}},b=["list","placeholder","value"],D=["id"],F={key:0},z={key:1},O=["name","value"];function S(e,n,i,r,l,s){return t.openBlock(),t.createElementBlock("div",null,[t.createElementVNode("input",{class:t.normalizeClass(["time-input",[i.anyError?"has-error":""]]),type:"text",list:s.datalistID,placeholder:e.defaultText,onChange:n[0]||(n[0]=(...o)=>e.inputEventHandler&&e.inputEventHandler(...o)),value:s.formattedTime},null,42,b),t.createElementVNode("datalist",{id:s.datalistID},[e.isFirstRow(e.index)?(t.openBlock(),t.createElementBlock("option",F,t.toDisplayString(e.localization.t24hours),1)):t.createCommentVNode("",!0),(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(e.filteredTimes,o=>(t.openBlock(),t.createElementBlock("option",{key:o},t.toDisplayString(e.formatTime(o,e.hourFormat24)),1))),128)),e.showMidnightOption?(t.openBlock(),t.createElementBlock("option",z,t.toDisplayString(e.localization.midnight),1)):t.createCommentVNode("",!0)],8,D),t.createElementVNode("input",{name:e.optionName,type:"hidden",value:e.selected},null,8,O)])}const L={name:"BusinessHoursDay",components:{BusinessHoursSelect:H,BusinessHoursDatalist:f(_,[["render",S],["__scopeId","data-v-d30967ab"]]),Toggle:E},mixins:[y,{data(){return{validations:[],errors:{open:{invalidInput:this.localization.open.invalidInput,greaterThanNext:this.localization.open.greaterThanNext,lessThanPrevious:this.localization.open.lessThanPrevious,midnightNotLast:this.localization.open.midnightNotLast},close:{invalidInput:this.localization.close.invalidInput,lessThanPrevious:this.localization.close.lessThanPrevious,greaterThanNext:this.localization.close.greaterThanNext,midnightNotLast:this.localization.close.midnightNotLast}}}},created(){this.runValidations()},computed:{},methods:{defaultValidation:function(){return{invalidInput:!1,greaterThanNext:!1,lessThanPrevious:!1,midnightNotLast:!1}},defaultValidations:function(){return{anyErrors:!1,open:this.defaultValidation(),close:this.defaultValidation()}},isValidInput:function(e){return this.isValidBackendTime(e)||e==="2400"||e==="24hrs"||e===""},resetValidations:function(){let e=[];this.hours.forEach((n,i)=>{e[i]=this.defaultValidations()}),this.validations=e},runValidations:function(){let e=1;this.resetValidations(),this.hours.forEach((n,i)=>{this.runValidation(n.open,i,e,"open"),e++,this.runValidation(n.close,i,e,"close"),e++}),this.updateAnyErrors()},runValidation:function(e,n,i,r){this.isValidBackendTime(e)&&(this.validations[n][r]=this.runInputValidation(e,n,i,this.totalInputs)),this.validations[n][r].invalidInput=!this.isValidInput(e),this.updateAdjacentValidations(n,r,i)},runInputValidation:function(e,n,i,r){const l=this.getPrevious(this.hours,n,i),s=this.getNext(this.hours,n,i,r);let o=this.defaultValidation();return o.midnightNotLast=e==="2400"&&!this.isLastInput(i,r),l===void 0?o.greaterThanNext=e>=s&&s!=="":s===void 0?o.lessThanPrevious=e<=l&&l!=="":(o.lessThanPrevious=e<=l&&l!=="",o.greaterThanNext=e>=s&&s!==""),o},updateAdjacentValidations:function(e,n,i){const r=e-1,l=e+1,s=this.validations[e][n];let o=this.getPrevious(this.validations,e,i),d=this.getNext(this.validations,e,i,this.totalInputs);o!==void 0&&(s.lessThanPrevious?o.greaterThanNext=!0:s.lessThanPrevious||(o.greaterThanNext=!1)),d!==void 0&&(s.greaterThanNext?d.lessThanPrevious=!0:s.greaterThanNext||(d.lessThanPrevious=!1)),!this.isFirstInput(i)&&n==="open"?this.validations[r].close=o:n==="close"&&(this.validations[e].open=o),!this.isLastInput(i,this.totalInputs)&&n==="close"?this.validations[l].open=d:n==="open"&&(this.validations[e].close=d)},updateAnyErrors:function(){this.validations.forEach((e,n)=>this.validations[n].anyErrors=this.anyErrors(e))},anyErrors:function(e){return!!(this.anyError(e.open)||this.anyError(e.close))},anyError:function(e){return Object.keys(e).some(n=>e[n]===!0)},activeErrors:function(e){const n=this.validations[e];let i=[];return Object.keys(n).forEach(r=>{if(typeof n[r]=="object"){let l=n[r];Object.keys(l).filter(s=>l[s]===!0).forEach(s=>{i.push({whichTime:r,error:s})})}}),i},errorMessage:function(e,n){return this.errors[e][n]}}}],props:{day:{type:String,required:!0},hours:{type:Array,required:!0},name:{type:String,required:!0},timeIncrement:{type:Number,required:!0},type:{type:String,required:!0},color:{type:String,required:!0},localization:{type:Object},switchWidth:{type:Number},hourFormat24:{type:Boolean}},computed:{totalInputs:function(){return this.hours.length*2},isOpenToday:function(){return this.hours[0].isOpen},anyOpen:function(){return this.hours.some(e=>e.isOpen===!0)},uniqId:function(){return p()}},directives:{visible:function(e,n){e.style.visibility=n.value?"visible":"hidden"}},methods:{onChangeEventHandler:function(e,n,i){if(i=this.backendInputFormat(i),this.hours[0].id=this.hours[0].id||p(),i=="24hrs"){this.hours.splice(1),this.hours[0].open=this.hours[0].close=i,this.runValidations(),this.updateHours();return}if((this.hours[n].open=="24hrs"||this.hours[n].close=="24hrs")&&i==""){this.hours[n].open=this.hours[n].close=i,this.runValidations(),this.updateHours();return}if(!this.onlyOneRow(this.hours)&&i===""&&(e==="open"&&this.hours[n].close===""||e==="close"&&this.hours[n].open==="")){this.removeRow(n),this.runValidations(),this.updateHours();return}this.hours[n][e]=i,this.runValidations(),this.updateHours()},inputNum:function(e,n){if(e==="open")return n*2+1;if(e==="close")return n*2+2},toggleOpen:function(){this.hours[0].isOpen=!this.hours[0].isOpen},resetHours:function(){this.hours.splice(1),this.hours[0].open=this.hours[0].close="",this.updateHours()},addRow:function(){this.hours.push({id:p(),open:"",close:"",isOpen:!0}),this.runValidations(),this.updateHours()},removeRow:function(e){this.hours.splice(e,1),this.runValidations(),this.updateHours()},showDay:function(e){return!(e>0)},showRemoveButton:function(){return this.hours.length>1},showAddButton:function(e){return this.hours.length===e+1&&this.hours[e].open!==""&&this.hours[e].close!==""&&this.hours[e].open!=="24hrs"&&this.hours[e].close!=="24hrs"&&!(this.type==="select"&&this.timeIncrement===15&&this.hours[e].close==="2345")&&!(this.type==="select"&&this.timeIncrement===30&&this.hours[e].close==="2330")&&!(this.type==="select"&&this.timeIncrement===60&&this.hours[e].close==="2300")&&this.hours[e].close!=="2400"&&this.validations[e].anyErrors===!1},updateHours:function(){const e={[this.day]:this.hours};this.$emit("hours-change",e)}}},P={is:"transition-group",name:"fade"},R={class:"flex-table row",role:"rowgroup"},q={class:"flex-row day",role:"cell"},M={key:0},A={class:"flex-row switch",role:"cell"},j={class:"flex-row hours open",role:"cell"},v={class:"flex-row dash",role:"cell"},G={class:"flex-row hours close",role:"cell"},Y={class:"flex-row remove",role:"cell"},J=["onClick"],W=[t.createStaticVNode('<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2" data-v-c0607a0c><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-c0607a0c></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></g><g id="SVGRepo_iconCarrier" data-v-c0607a0c><path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#0b0c0d;" data-v-c0607a0c></path></g></svg>',1)],U={class:"flex-row add",role:"cell"},K=[t.createStaticVNode('<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c0607a0c><g id="SVGRepo_bgCarrier" stroke-width="0" data-v-c0607a0c></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></g><g id="SVGRepo_iconCarrier" data-v-c0607a0c><path d="M6 12H18M12 6V18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c0607a0c></path></g></svg>',1)],Z={key:0,class:"time-errors"};function Q(e,n,i,r,l,s){const o=t.resolveComponent("Toggle"),d=t.resolveComponent("BusinessHoursSelect"),c=t.resolveComponent("BusinessHoursDatalist"),m=t.resolveDirective("visible");return t.openBlock(),t.createElementBlock("div",P,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(i.hours,({open:k,close:B,id:w,isOpen:re},a)=>(t.openBlock(),t.createElementBlock("div",{key:w||s.uniqId},[t.createElementVNode("div",R,[t.createElementVNode("div",q,[s.showDay(a)?(t.openBlock(),t.createElementBlock("div",M,t.toDisplayString(i.localization.days[i.day]),1)):t.createCommentVNode("",!0)]),t.createElementVNode("div",A,[s.showDay(a)?(t.openBlock(),t.createBlock(o,{key:0,id:"toggle-"+w||s.uniqId,modelValue:s.anyOpen,"onUpdate:modelValue":n[0]||(n[0]=h=>s.anyOpen=h),onChange:n[1]||(n[1]=h=>{s.toggleOpen(),s.resetHours(),e.runValidations()})},null,8,["id","modelValue"])):t.createCommentVNode("",!0)]),t.createVNode(t.Transition,{name:"fade"},{default:t.withCtx(()=>[t.withDirectives((t.openBlock(),t.createElementBlock("div",j,[i.type==="select"?(t.openBlock(),t.createBlock(d,{key:0,name:i.name,"input-num":s.inputNum("open",a),"total-inputs":s.totalInputs,day:i.day,hours:i.hours,"time-increment":i.timeIncrement,index:a,"selected-time":k,localization:i.localization,"hour-format24":i.hourFormat24,onInputChange:h=>s.onChangeEventHandler("open",a,h)},null,8,["name","input-num","total-inputs","day","hours","time-increment","index","selected-time","localization","hour-format24","onInputChange"])):t.createCommentVNode("",!0),i.type==="datalist"?(t.openBlock(),t.createBlock(c,{key:1,name:i.name,"input-num":s.inputNum("open",a),"total-inputs":s.totalInputs,day:i.day,hours:i.hours,"time-increment":i.timeIncrement,index:a,"selected-time":k,"any-error":e.anyError(e.validations[a].open),localization:i.localization,"hour-format24":i.hourFormat24,onInputChange:h=>s.onChangeEventHandler("open",a,h)},null,8,["name","input-num","total-inputs","day","hours","time-increment","index","selected-time","any-error","localization","hour-format24","onInputChange"])):t.createCommentVNode("",!0)])),[[m,s.isOpenToday]])]),_:2},1024),t.createVNode(t.Transition,{name:"fade"},{default:t.withCtx(()=>[t.withDirectives((t.openBlock(),t.createElementBlock("div",v,[t.createTextVNode("-")])),[[m,s.isOpenToday]])]),_:1}),t.createVNode(t.Transition,{name:"fade"},{default:t.withCtx(()=>[t.withDirectives((t.openBlock(),t.createElementBlock("div",G,[i.type==="select"?(t.openBlock(),t.createBlock(d,{key:0,name:i.name,"input-num":s.inputNum("close",a),"total-inputs":s.totalInputs,day:i.day,hours:i.hours,"time-increment":i.timeIncrement,index:a,"selected-time":B,localization:i.localization,"hour-format24":i.hourFormat24,onInputChange:h=>s.onChangeEventHandler("close",a,h)},null,8,["name","input-num","total-inputs","day","hours","time-increment","index","selected-time","localization","hour-format24","onInputChange"])):t.createCommentVNode("",!0),i.type==="datalist"?(t.openBlock(),t.createBlock(c,{key:1,name:i.name,"input-num":s.inputNum("close",a),"total-inputs":s.totalInputs,day:i.day,hours:i.hours,"time-increment":i.timeIncrement,index:a,"any-error":e.anyError(e.validations[a].close),"updated-validations":e.validations[a].close,"selected-time":B,"hour-format24":i.hourFormat24,localization:i.localization,onInputChange:h=>s.onChangeEventHandler("close",a,h)},null,8,["name","input-num","total-inputs","day","hours","time-increment","index","any-error","updated-validations","selected-time","hour-format24","localization","onInputChange"])):t.createCommentVNode("",!0)])),[[m,s.isOpenToday]])]),_:2},1024),t.withDirectives((t.openBlock(),t.createElementBlock("div",Y,[s.showRemoveButton()?(t.openBlock(),t.createElementBlock("button",{key:0,type:"button",class:"font-awesome-button",onClick:h=>s.removeRow(a)},W,8,J)):t.createCommentVNode("",!0)])),[[m,s.isOpenToday]]),t.withDirectives((t.openBlock(),t.createElementBlock("div",U,[s.showAddButton(a)?(t.openBlock(),t.createElementBlock("button",{key:0,type:"button",style:t.normalizeStyle({color:i.color}),class:"add-hours",onClick:n[2]||(n[2]=h=>s.addRow())},K,4)):t.createCommentVNode("",!0)])),[[m,s.isOpenToday]])]),e.validations[a].anyErrors?(t.openBlock(),t.createElementBlock("ul",Z,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(e.activeErrors(a),({whichTime:h,error:V})=>(t.openBlock(),t.createElementBlock("li",{key:h+"."+V},t.toDisplayString(e.errorMessage(h,V)),1))),128))])):t.createCommentVNode("",!0)]))),128))])}const X={name:"BusinessHours",components:{BusinessHoursDay:f(L,[["render",Q],["__scopeId","data-v-c0607a0c"]])},props:{days:{type:Object,required:!0},name:{type:String,default:"businessHours"},type:{type:String,default:"datalist",validator:function(e){return["datalist","select"].indexOf(e)!==-1}},timeIncrement:{type:Number,default:30,validator:function(e){return[15,30,60].indexOf(e)!==-1}},color:{type:String,default:"#2779bd",validator:function(e){return e.charAt(0)==="#"}},localization:{type:Object,default:()=>({switchOpen:"Open",switchClosed:"Closed",placeholderOpens:"Opens",placeholderCloses:"Closes",addHours:"Add hours",open:{invalidInput:'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',greaterThanNext:"Please enter an opening time that is before the closing time.",lessThanPrevious:"Please enter an opening time that is after the previous closing time.",midnightNotLast:"Midnight can only be selected for the day's last closing time."},close:{invalidInput:'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',greaterThanNext:"Please enter a closing time that is after the opening time.",lessThanPrevious:"Please enter a closing time that is before the next opening time.",midnightNotLast:"Midnight can only be selected for the day's last closing time."},t24hours:"24 hours",midnight:"Midnight",days:{monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",newYearsEve:"New Year's Eve",newYearsDay:"New Year's Day",martinLutherKingJrDay:"Martin Luther King, Jr. Day",presidentsDay:"Presidents' Day",easter:"Easter",memorialDay:"Memorial Day",independenceDay:"Independence Day",fourthOfJuly:"4th of July",laborDay:"Labor Day",columbusDay:"Columbus Day",veteransDay:"Veterans Day",thanksgiving:"Thanksgiving",christmasEve:"Christmas Eve",christmas:"Christmas"}})},switchWidth:{type:Number,default:90},hourFormat24:{type:Boolean,default:!1}},methods:{hoursChange:function(e){this.$emit("updated-hours",e)}}},x={class:"business-hours-container"};function $(e,n,i,r,l,s){const o=t.resolveComponent("business-hours-day");return t.openBlock(),t.createElementBlock("div",x,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(i.days,(d,c)=>(t.openBlock(),t.createBlock(o,{onHoursChange:s.hoursChange,key:c,day:c,hours:d,name:i.name,"time-increment":i.timeIncrement,type:i.type,color:i.color,localization:i.localization,"switch-width":i.switchWidth,"hour-format24":i.hourFormat24},null,8,["onHoursChange","day","hours","name","time-increment","type","color","localization","switch-width","hour-format24"]))),128))])}return f(X,[["render",$],["__scopeId","data-v-c1580f11"]])});
