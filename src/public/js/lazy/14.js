webpackJsonp([14],{"2m/C":function(t,e,r){var a=r("r4Fz");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("f0e51348",a,!0,{})},"71hn":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"approvalItemMain"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:t.backUrl}},[t._v("Review")]),t._v(" "),r("el-breadcrumb-item",[t._v("View")])],1),t._v(" "),r("div",{attrs:{id:"approvalItemCon"}},[r("div",[r("el-tag",{attrs:{type:"info"}},[t._v("Project Name:"+t._s(t.currentItem.product))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Priority:\n        "),"1"==t.currentItem.priority?r("span",[t._v("Low")]):t._e(),t._v(" "),"2"==t.currentItem.priority?r("span",[t._v("Normal")]):t._e(),t._v(" "),"3"==t.currentItem.priority?r("span",{staticStyle:{color:"red"}},[t._v("High")]):t._e()]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Language:"+t._s(t.currentItem.lang))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Owner:"+t._s(t.currentItem.allocate_users_name))]),t._v(" "),r("el-tag",{attrs:{type:"info"}},[t._v("Deadline:"+t._s(t.currentItem.deadline&&t.currentItem.deadline.split(" ")[1]?t.currentItem.deadline.split(" ")[0]:t.currentItem.deadline))]),t._v(" "),"Unreviewed"===t.currentItem.status?r("el-button",{attrs:{type:"success",size:"small",id:"agreeBtn"},on:{click:function(e){t.openAgreeModal(1)}}},[t._v("Pass")]):t._e(),t._v(" "),"Unreviewed"===t.currentItem.status?r("el-button",{attrs:{type:"danger",size:"small",id:"refuseBtn"},on:{click:function(e){t.openAgreeModal(0)}}},[t._v("Fail")]):t._e()],1),t._v(" "),r("div",{attrs:{id:"approvalItemBox"}},[t._m(0),t._v(" "),r("div",{staticClass:"st_con"},[r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(Object.keys(JSON.parse(t.currentItem.key)[0])[0]))])]),t._v(" "),r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(JSON.parse(t.currentItem.key)[0][Object.keys(JSON.parse(t.currentItem.key)[0])[0]]))])])],1),t._v(" "),t._l(JSON.parse(t.currentItem.translate),function(e,a){return r("div",{key:a,staticClass:"st_con",attrs:{name:a+2}},[r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText"+(a+2)}},[t._v(t._s(Object.keys(e)[0]))])]),t._v(" "),r("el-card",{staticClass:"boxCard"},[r("div",{staticClass:"rawDataText",attrs:{id:"rawDataText1"}},[t._v(t._s(e[Object.keys(e)[0]]))])])],1)})],2),t._v(" "),r("el-dialog",{attrs:{title:1===t.agreeFlag?"Pass Review":"Fail Review",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("div",{directives:[{name:"show",rawName:"v-show",value:1===t.agreeFlag,expression:"agreeFlag===1"}],staticClass:"dialog_warning_text"},[r("i",{staticClass:"el-message__icon el-icon-warning"}),t._v(" "),r("span",[t._v("Is this translation correct?")])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:0===t.agreeFlag,expression:"agreeFlag===0"}],staticClass:"dialog_warning_text"},[r("i",{staticClass:"el-message__icon el-icon-warning"}),t._v(" "),r("span",[t._v("Is this translation wrong?")])]),t._v(" "),r("el-form",{directives:[{name:"show",rawName:"v-show",value:0===t.agreeFlag,expression:"agreeFlag===0"}],ref:"tipsForm",staticClass:"demo-ruleForm",attrs:{model:t.tipsForm,rules:t.rules}},[r("el-form-item",{attrs:{prop:"tips",label:"Please enter your reason:"}},[r("el-input",{attrs:{placeholder:""},model:{value:t.tipsForm.tips,callback:function(e){t.$set(t.tipsForm,"tips",e)},expression:"tipsForm.tips"}})],1)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("Cancel")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("Yes")])],1)],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"boxTitleCon"},[e("p",[this._v("Source")]),this._v(" "),e("p",[this._v("Translation")])])}]}},C0qk:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this,e={};this.$route.query.name&&(e.name=this.$route.query.name),this.$route.query.key&&(e.key=this.$route.query.key),this.$route.query.priority&&(e.priority=this.$route.query.priority),this.$route.query.deadline&&(e.deadline=this.$route.query.deadline),this.$route.query.page&&(e.page=this.$route.query.page),this.backUrl={path:"/review",query:e},this.$http.post("/api/approve/list",qs.stringify({status:"Unreviewed",id:this.$route.query.id})).then(function(e){t.currentItem=e.data.data[0]})},data:function(){return{backUrl:"",currentItem:{key:"[{}]",translate:"[{}]"},agreeFlag:null,tipsForm:{tips:""},dialogVisible:!1,rules:{tips:[{required:!0,message:"Please enter your reason."}]}}},methods:{openAgreeModal:function(t){this.dialogVisible=!0,this.agreeFlag=t},submit:function(){var t=this;0===this.agreeFlag&&this.$refs.tipsForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$http.post("/api/approve/approve",qs.stringify({translate_approve_id:t.$route.query.id,approved:t.agreeFlag,tips:t.tipsForm.tips.trim()})).then(function(e){setTimeout(function(){t.$store.state.taskList.Approve_nums-=1,t.$router.push(t.backUrl)},500)})}),1===this.agreeFlag&&this.$http.post("/api/approve/approve",qs.stringify({translate_approve_id:this.$route.query.id,approved:this.agreeFlag,tips:this.tipsForm.tips})).then(function(e){setTimeout(function(){t.$store.state.taskList.Approve_nums-=1,t.$router.push(t.backUrl)},500)})}}}},"S+Ou":function(t,e,r){var a=r("VU/8")(r("C0qk"),r("71hn"),!1,function(t){r("2m/C")},"data-v-518b4e30",null);t.exports=a.exports},r4Fz:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"",""])}});