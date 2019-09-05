webpackJsonp([8],{"0Wi5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={mounted:function(){var e=this;this.addProjectForm.product=this.$route.query.name||"",this.$http.post("/api/product/lang_list",qs.stringify({count:30})).then(function(t){e.langList=t.data.data,e.langList2=t.data.data,e.langTotal=t.data.total,e.langTotal2=t.data.total}),this.$http.post("/api/user/list").then(function(t){t.data.data.forEach(function(t){t.status="",e.userList.push(t)})})},data:function(){var e=this;return{pickerOptions:{disabledDate:function(e){return e&&e.valueOf()<=Date.now()}},langList:[],langCurrentPage:1,langPageSize:30,langTotal:0,langList2:[],langCurrentPage2:1,langPageSize2:30,langTotal2:0,userList:[],addProjectForm:{product:"",attribute:"public",priority:"",deadline:"",lang:"",slang:"",tlang:"",translate_users:[],approve_users:[],viewed_users:[],product_desc:""},rules:{product:[{required:!0,message:"Please enter project name."},{validator:function(e,t,a){/^[A-Za-z0-9-_]{2,20}$/.test(t)?t.length<2?a(new Error("Cannot be less than two characters in length.")):t.length>20?a(new Error("Cannot exceed 20 characters in length.")):a():a(new Error("Only letters (A-Za-z), numbers (0-9), underscore (_), hyphen (-) are supported."))},trigger:"blur"}],attribute:[{required:!0,message:"Please enter attribute."}],priority:[{required:!0,message:"Please enter priority."}],lang:[{required:!0,message:"Please select language."},{validator:function(t,a,r){""===e.addProjectForm.slang?r(new Error("Please select source language.")):""===e.addProjectForm.tlang?r(new Error("Please select target language.")):e.addProjectForm.slang===e.addProjectForm.tlang?r(new Error("Source and target language can't be the same.")):r()},trigger:"blur"}],deadline:[{required:!0,message:"Please select deadline."}],translate_users:[{required:!0,message:"Please enter translator."}],approve_users:[{required:!0,message:"Please enter reviewer."}],viewed_users:[{required:!0,message:"Please enter viewer."}]}}},watch:{"addProjectForm.slang":{handler:function(e,t){this.addProjectForm.lang=this.addProjectForm.slang+" -> "+this.addProjectForm.tlang},deep:!0},"addProjectForm.tlang":{handler:function(e,t){this.addProjectForm.lang=this.addProjectForm.slang+" -> "+this.addProjectForm.tlang},deep:!0}},methods:{handleCurrentPage:function(e){var t=this;this.langCurrentPage=e,this.$http.post("/api/product/lang_list",qs.stringify({page:e,count:this.langPageSize})).then(function(e){t.langList=e.data.data,t.langTotal=e.data.total})},handleCurrentPage2:function(e){var t=this;this.langCurrentPage2=e,this.$http.post("/api/product/lang_list",qs.stringify({page:e,count:this.langPageSize2})).then(function(e){t.langList2=e.data.data,t.langTotal2=e.data.total})},remoteMethod1:function(e){var t=this;this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage,count:this.langPageSize,query_l:e})).then(function(e){t.langList=e.data.data,t.langTotal=e.data.total})},blurMethod1:function(){var e=this;this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage,count:this.langPageSize})).then(function(t){e.langList=t.data.data,e.langTotal=t.data.total})},remoteMethod2:function(e){var t=this;this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage2,count:this.langPageSize2,query_l:e})).then(function(e){t.langList2=e.data.data,t.langTotal2=e.data.total})},blurMethod2:function(){var e=this;this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage2,count:this.langPageSize2})).then(function(t){e.langList2=t.data.data,e.langTotal2=t.data.total})},changeUser:function(e,t){},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var a={product:t.addProjectForm.product.trim(),attribute:t.addProjectForm.attribute,priority:t.addProjectForm.priority,lang:t.addProjectForm.slang+" -> "+t.addProjectForm.tlang,translate_users:JSON.stringify(t.addProjectForm.translate_users),approve_users:JSON.stringify(t.addProjectForm.approve_users),viewed_users:"public"===t.addProjectForm.attribute?JSON.stringify([]):JSON.stringify(t.addProjectForm.viewed_users),deadline:t.addProjectForm.deadline,product_desc:t.addProjectForm.product_desc.trim()};t.$http.post("/api/product/create",qs.stringify(a)).then(function(e){e.data.result.status&&"Successful"===e.data.result.status?t.$router.push("/projectdetail?id="+e.data.result.product_id+"&pane=upload"):t.$message.warning("Add failed!")})}})},resetForm:function(e){this.$refs[e].resetFields()}}}},"1aM1":function(e,t,a){var r=a("F9Sv");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("3d440dfa",r,!0,{})},F9Sv:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"",""])},JZsY:function(e,t,a){var r=a("VU/8")(a("0Wi5"),a("aFRf"),!1,function(e){a("1aM1")},"data-v-3980d0f4",null);e.exports=r.exports},aFRf:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"addProjectMain"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[e._v("Add New Project")])],1),e._v(" "),a("div",{staticClass:"clearfix",attrs:{id:"addProjectDetail"}},[a("el-form",{ref:"addProjectForm",attrs:{model:e.addProjectForm,rules:e.rules,"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{prop:"product",label:"Project Name"}},[a("div",{staticClass:"namePwdInp"},[a("el-input",{attrs:{placeholder:"enter project name"},model:{value:e.addProjectForm.product,callback:function(t){e.$set(e.addProjectForm,"product",t)},expression:"addProjectForm.product"}})],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"attribute",label:"Visibility"}},[a("div",{staticClass:"namePwdInp"},[a("el-radio-group",{model:{value:e.addProjectForm.attribute,callback:function(t){e.$set(e.addProjectForm,"attribute",t)},expression:"addProjectForm.attribute"}},[a("el-radio",{attrs:{label:"public"}},[e._v("Public")]),e._v(" "),a("el-radio",{attrs:{label:"private"}},[e._v("Private")])],1)],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"priority",label:"Priority"}},[a("div",{staticClass:"namePwdInp"},[a("el-select",{attrs:{placeholder:"select priority"},model:{value:e.addProjectForm.priority,callback:function(t){e.$set(e.addProjectForm,"priority",t)},expression:"addProjectForm.priority"}},[a("el-option",{attrs:{label:"High",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"Normal",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"Low",value:"1"}})],1)],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"lang",label:"Language"}},[a("div",{staticClass:"namePwdInp"},[a("el-select",{staticStyle:{width:"49%"},attrs:{filterable:"",remote:"","remote-method":e.remoteMethod1,placeholder:"source language"},on:{blur:e.blurMethod1},model:{value:e.addProjectForm.slang,callback:function(t){e.$set(e.addProjectForm,"slang",t)},expression:"addProjectForm.slang"}},[e._l(e.langList,function(t){return a("el-option",{key:t.code,attrs:{label:t.language,value:t.language}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.language))]),e._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.code))])])}),e._v(" "),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next","current-page":e.langCurrentPage,"page-size":e.langPageSize,total:e.langTotal},on:{"current-change":e.handleCurrentPage}})],2),e._v(" "),a("el-select",{staticStyle:{width:"49%"},attrs:{filterable:"",remote:"","remote-method":e.remoteMethod2,placeholder:"target language"},on:{blur:e.blurMethod2},model:{value:e.addProjectForm.tlang,callback:function(t){e.$set(e.addProjectForm,"tlang",t)},expression:"addProjectForm.tlang"}},[e._l(e.langList2,function(t){return a("el-option",{key:t.code,attrs:{label:t.language,value:t.language}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.language))]),e._v(" "),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.code))])])}),e._v(" "),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next","current-page":e.langCurrentPage2,"page-size":e.langPageSize2,total:e.langTotal2},on:{"current-change":e.handleCurrentPage2}})],2)],1)]),e._v(" "),a("el-form-item",{attrs:{label:"Deadline",prop:"deadline"}},[a("div",{staticClass:"namePwdInp"},[a("el-date-picker",{attrs:{type:"date","default-value":new Date,"value-format":"yyyy-MM-dd","picker-options":e.pickerOptions,placeholder:"select deadline"},model:{value:e.addProjectForm.deadline,callback:function(t){e.$set(e.addProjectForm,"deadline",t)},expression:"addProjectForm.deadline"}})],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"translate_users",label:"Translator"}},[a("div",{staticClass:"namePwdInp"},[a("el-select",{attrs:{placeholder:"select translator",multiple:"",filterable:""},on:{change:function(t){e.changeUser("t",t)}},model:{value:e.addProjectForm.translate_users,callback:function(t){e.$set(e.addProjectForm,"translate_users",t)},expression:"addProjectForm.translate_users"}},e._l(e.userList,function(t,r){return"t"===t.status||""===t.status?a("el-option",{key:"Translator"+r,attrs:{label:t.name,value:t.id}}):e._e()}))],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"approve_users",label:"Reviewer"}},[a("div",{staticClass:"namePwdInp"},[a("el-select",{attrs:{placeholder:"select reviewer",multiple:"",filterable:""},on:{change:function(t){e.changeUser("a",t)}},model:{value:e.addProjectForm.approve_users,callback:function(t){e.$set(e.addProjectForm,"approve_users",t)},expression:"addProjectForm.approve_users"}},e._l(e.userList,function(t,r){return"a"===t.status||""===t.status?a("el-option",{key:"approver"+r,attrs:{label:t.name,value:t.id}}):e._e()}))],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"public"===e.addProjectForm.attribute?"":"viewed_users",label:"Guest"}},[a("div",{staticClass:"namePwdInp"},[a("el-select",{attrs:{placeholder:"select guest",multiple:"",filterable:"",disabled:"public"===e.addProjectForm.attribute},on:{change:function(t){e.changeUser("v",t)}},model:{value:e.addProjectForm.viewed_users,callback:function(t){e.$set(e.addProjectForm,"viewed_users",t)},expression:"addProjectForm.viewed_users"}},e._l(e.userList,function(t,r){return"v"===t.status||""===t.status?a("el-option",{key:"Viewer"+r,attrs:{label:t.name,value:t.id}}):e._e()}))],1)]),e._v(" "),a("el-form-item",{attrs:{prop:"product_desc",label:"Description"}},[a("div",{staticClass:"namePwdInp"},[a("el-input",{attrs:{type:"textarea",placeholder:"enter description"},model:{value:e.addProjectForm.product_desc,callback:function(t){e.$set(e.addProjectForm,"product_desc",t)},expression:"addProjectForm.product_desc"}})],1)]),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("addProjectForm")}}},[e._v("Add")]),e._v(" "),a("el-button",{on:{click:function(t){e.resetForm("addProjectForm")}}},[e._v("Reset")])],1)],1)],1)],1)},staticRenderFns:[]}}});