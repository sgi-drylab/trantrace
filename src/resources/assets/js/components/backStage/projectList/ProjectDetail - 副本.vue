<template>
  <div id="projectDetailMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="backUrl">Overview</el-breadcrumb-item>
      <el-breadcrumb-item>Detail</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="projectDetailCon">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Setting" name="info">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Setting</span>
              <el-button class="operationBtn" size="large" type="text" @click="openEditProject">Edit</el-button>
              <el-button class="operationBtn" size="large" type="text" style="color:orange" @click="deleteProject">Delete</el-button>
            </div>
            <div class="infoItemCon">
              <div class="infoItem">Project Name: <span>{{currentProject.product}}</span></div>
              <div class="infoItem">Owner: <span>{{currentProject.users_name}}</span></div>
              <div class="infoItem">Priority: 
                <span v-if="currentProject.priority=='1'">Low</span>
                <span v-if="currentProject.priority=='2'">Normal</span>
                <span v-if="currentProject.priority=='3'" style="color:red">High</span>
              </div>
              <div class="infoItem">Visibility: <span>{{currentProject.attribute}}</span></div>
              <div class="infoItem">Creation Date: <span>{{currentProject.created_at&&(currentProject.created_at.split(" ")[1])?currentProject.created_at.split(" ")[0]:currentProject.created_at}}</span></div>
              <div class="infoItem">Deadline: <span>{{currentProject.deadline&&(currentProject.deadline.split(" ")[1])?currentProject.deadline.split(" ")[0]:currentProject.deadline}}</span></div>
              <div class="infoItem">Language: <span>{{currentProject.lang}}</span></div>
              <div class="infoItem">Description: <span>{{currentProject.product_desc}}</span></div>
            </div>
          </el-card>
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Add Member</span>
              <el-button class="operationBtn" size="large" type="text" v-if="!translatorMembersFlag&&!approverMembersFlag&&!viewerMembersFlag" @click="membersEdit">Edit</el-button>
              <el-button class="operationBtn submitBtn" size="large" type="text" v-if="translatorMembersFlag||approverMembersFlag||viewerMembersFlag" @click="allSubmitMembers">Submit All</el-button>
              <el-button class="operationBtn cancelBtn" size="large" type="text" v-if="translatorMembersFlag||approverMembersFlag||viewerMembersFlag" @click="memberCancel">Cancel</el-button>
            </div>
            <el-form :model="addMembersForm" ref="addMembersForm" label-position="left" label-width="100px">
              <el-form-item prop="translate_users" label="Translator">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.translatorName" :key="index" style="margin-right:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.translate_users" :disabled="!translatorMembersFlag" placeholder="select translator" multiple filterable @visible-change="visibleChange('t',$event)" @change="changeUser('t',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'Translator'+index" :label="item.name" :value="item.id" v-if="(item.status==='t'||item.status==='')||item.t_show"></el-option>
                  </el-select>
                  <el-button v-if="translatorMembersFlag" size="medium" type="warning" @click="submitMembers('translator')">Submit</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="approve_users" label="Reviewer">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.approverName" :key="index" style="margin:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.approve_users" :disabled="!approverMembersFlag" placeholder="select reviewer" multiple filterable @visible-change="visibleChange('a',$event)" @change="changeUser('a',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'approver'+index" :label="item.name" :value="item.id" v-if="(item.status==='a'||item.status==='')||item.a_show"></el-option>
                  </el-select>
                  <el-button v-if="approverMembersFlag" size="medium" type="warning" @click="submitMembers('reviewer')">Submit</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="viewed_users" label="Guest">
                <div class="membersInput">
                  <div><span v-for="(item,index) in currentProject.viewerName" :key="index" style="margin:6px;">{{item}}</span></div>
                  <el-select v-model="addMembersForm.viewed_users" :disabled="(currentProject.attribute==='public')||!viewerMembersFlag" placeholder="select guest" multiple filterable @visible-change="visibleChange('v',$event)" @change="changeUser('v',$event)">
                    <el-option v-for="(item,index) in currentProject.remainingUserList" :key="'Viewer'+index" :label="item.name" :value="item.id" v-if="(item.status==='v'||item.status==='')||item.v_show"></el-option>
                  </el-select>
                  <el-button v-if="(currentProject.attribute==='private')&&viewerMembersFlag" size="medium" type="warning" @click="submitMembers('viewer')">Submit</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Schedule" name="schedule">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Project Schedule</span>
              <el-button class="operationBtn" size="large" type="text" @click="viewAllocationList">Assignment</el-button>
              <el-button class="operationBtn" size="large" type="text" @click="viewObjectionList">Reply</el-button>
            </div>
            <div class="statisticsCon">
              <span style="margin-right:10px;">Total number of entries: {{statisticInfo.total_nums}}</span>
              <div>
                <span>Assignment:</span>
                <div>
                  <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="statisticInfo.allocationPercentage"></el-progress>
                  <span>{{$formatPercentage(statisticInfo.allocationPercentage)+'%'}}</span>
                </div>
              </div>
              <div>
                <span>Translation:</span>
                <div>
                  <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="statisticInfo.translationPercentage"></el-progress>
                  <span>{{$formatPercentage(statisticInfo.translationPercentage)+'%'}}</span>
                </div>
              </div>
              <div>
                <span>Review:</span>
                <div>
                  <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="statisticInfo.approvalPercentage"></el-progress>
                  <span>{{$formatPercentage(statisticInfo.approvalPercentage)+'%'}}</span>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Member Schedule</span>
            </div>
            <div class="statisticsCon">
              <div class="progressItem">
                <span>Owner:
                  <span style="font-size:14px; font-weight:bold;margin-left:10px">(Total: {{statisticInfo.total_nums?statisticInfo.total_nums:0}})</span>
                  <div style="margin:6px 20px;">
                    {{currentProject.users_name}}
                    <div>
                      <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="statisticInfo.allocationPercentage"></el-progress>
                      <span>{{$formatPercentage(statisticInfo.allocationPercentage)+'%'}}</span>
                    </div>
                    
                  </div>
                </span>
              </div>
              <div class="progressItem">
                <span>Translator:
                  <div v-for="(item,index) in currentProject.translatorName" :key="index" style="margin:6px 20px;">{{item}} <span style="font-size:14px; font-weight:bold;margin-left:10px">(Total: {{translatorsStatistics[item]?(translatorsStatistics[item].Qualified+translatorsStatistics[item]['Unretranslated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated):0}})</span>
                    <div>
                      <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="translatorsStatistics[item]&&(translatorsStatistics[item].Qualified+translatorsStatistics[item]['Unretranslated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated)?parseInt((translatorsStatistics[item].Qualified+translatorsStatistics[item].Unreviewed)*10000/(translatorsStatistics[item].Qualified+translatorsStatistics[item]['Unretranslated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated))/100:0" v-if='translatorsStatistics[item]'></el-progress>
                      <span v-if='translatorsStatistics[item]'>{{$formatPercentage(translatorsStatistics[item]&&(translatorsStatistics[item].Qualified+translatorsStatistics[item]['Unretranslated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated)?parseInt((translatorsStatistics[item].Qualified+translatorsStatistics[item].Unreviewed)*10000/(translatorsStatistics[item].Qualified+translatorsStatistics[item]['Unretranslated']+translatorsStatistics[item].Unreviewed+translatorsStatistics[item].Untranslated))/100:0)+'%'}}</span>
                      <!-- <span v-if='!translatorsStatistics[item]' style="color:#aaa;font-size:12px;margin-left:10px">[ Unassigned task ]</span> -->
                      <span v-if='!translatorsStatistics[item]'><el-progress :stroke-width="4" :percentage="0"></el-progress></span>
                    </div>
                    
                  </div>
                </span>
              </div>
              <div class="progressItem">
                <span>Reviewer:
                  <span style="font-size:14px; font-weight:bold;margin-left:10px">(Total: {{reviewerTotal}})</span>
                  <div v-for="(item,index) in currentProject.approverName" :key="index" style="margin:6px 20px;">{{item}}
                    <div>
                      <el-progress style="display:inline-block;width:90%" :stroke-width="4" text-inside :percentage="approversStatistics[item]&&reviewerTotal?parseInt((approversStatistics[item].Qualified)*10000/reviewerTotal)/100:0" v-if="JSON.stringify(approversStatistics)!='{}'"></el-progress>
                      <span v-if="JSON.stringify(approversStatistics)!='{}'">{{$formatPercentage(approversStatistics[item]&&reviewerTotal?parseInt((approversStatistics[item].Qualified)*10000/reviewerTotal)/100:0)+'%'}}</span>
                      <span v-if="JSON.stringify(approversStatistics)=='{}'"><el-progress :stroke-width="4" :percentage="0"></el-progress></span>
                    </div>
                    
                  </div>
                </span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Upload" name="upload">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Upload</span>
            </div>
            <div>
              <el-button type="primary" size="small" @click="downloadFileFormat">Download Template</el-button>
              <el-button type="primary" size="small" @click="openUploadModal">Upload File</el-button>
            </div>
            <div class="recordListCon">Upload history:
              <span style="color:#41babc" v-show="importVersionLoading">
                <i class="el-icon-loading"></i> Requesting...
              </span>
              <span style="color:#ccc;" v-if="!importVersionLoading&&importList.length===0">[ No Record ]</span>
              <div style="padding: 6px 30px;font-weight:bold;" v-if="importList.length>0">
                <span style="display:inline-block;width:200px;text-align:center;">Total Number of Entries</span>
                <span style="display:inline-block;width:260px;text-align:center;">Upload Time</span>
              </div>
              <div v-if="importList.length>0" v-for="(item,index) in importList" :key="index" class="versionHistoryItem" title="Click to download this file" @click="downloadImportFile(item)">
                <span style="display:inline-block;width:200px;text-align:center;">{{item.nums}}</span>
                <span style="display:inline-block;width:260px;text-align:center;">{{item.updated_at}}</span>
              </div>
              <el-pagination v-if="importList.length>0" :total="importTotal" @current-change="importCurrentChange" layout="prev, pager, next"></el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Release" name="export">
          <el-card class="box-card" shadow="always">
            <div slot="header">
              <span class="cardTitle">Release</span>
            </div>
            <div>
              <el-button size="small" type="primary" @click="openExportVersionModal">New Version</el-button>
            </div>
            <div class="recordListCon">Release history:
              <span style="color:#41babc" v-show="exportVersionLoading">
                <i class="el-icon-loading"></i> Requesting...
              </span>
              <span style="color:#ccc;" v-if="!exportVersionLoading&&!versionList[0].version_name">[ No Record ]</span>
              <div style="padding: 6px 30px;font-weight:bold;" v-if="!exportVersionLoading&&versionList[0].version_name">
                <span style="display:inline-block;width:100px;text-align:center;">Version</span>
                <span style="display:inline-block;width:200px;text-align:center;">Release Time</span>
              </div>
              <div v-if="!exportVersionLoading&&versionList[0].version_name" v-for="(item,index) in versionList" :key="index" class="versionHistoryItem" title="Click to download this version" @click="exportHistoryVersion(item.version_name)">
                <span style="display:inline-block;width:100px;text-align:center;">{{item.version_name}}</span>
                <span style="display:inline-block;width:200px;text-align:center;">{{item.version_created_at}}</span>
              </div>
              <el-pagination v-if="versionList[0].version_name" :total="versionsTotal" @current-change="versionCurrentChange" layout="prev, pager, next"></el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="Release New Version" :visible.sync="dialogVisible" width="30%">
        <span>Version ID: </span>
        <!--<el-input-number size="small" v-model="newVersionID" :step="0.1" :precision="1" :min="currentProject.version_name?Number(this.currentProject.version_name.substr(1))+0.1:0.1" :max="currentProject.version_name?Math.floor(Number(this.currentProject.version_name.substr(1))+1):1.0"></el-input-number>-->
        <el-input-number size="small" v-model="newVersionID" :step="0.1" :precision="1" :min="currentProject.version_name?(Number(this.currentProject.version_name.substr(1))*10+1)/10:0.1" :max="currentProject.version_name?Math.floor(Number(this.currentProject.version_name.substr(1))+1.0):1.0"></el-input-number>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="exportQualified">Yes</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Upload File" :visible.sync="dialogUploadVisible" @close="closeUploadModal" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="!uploadLoadingFlag">
          <div style="font-weight:bold;font-size:14px;">Tips: </div>
        <div style="font-size:12px;color:#ff3366;"> 
          <div style="padding-left:20px;">Supported file types:</div>
            <div style="padding-left:40px;">- comma-delimited or tab-delimited text file (.csv or .tsv).</div>
            <div style="padding-left:40px;">- Single-page spreadsheet from Microsoft Excel (.xls or .xlsx).</div>

          <div style="padding-left:20px;">File name:</div>
            <div style="padding-left:40px;">-  Only support letters (A-Za-z), numbers (0-9), dot (.), hypen (-), and underscore (_).</div>
            <div style="padding-left:40px;">-  Make sure the extension is correct.</div>

          <div style="padding-left:20px;">File size:</div>
            <div style="padding-left:40px;">- 10MB or less.</div>

          <div style="padding-left:20px;">Content:</div>
            <div style="padding-left:40px;">- The first line must be the header.</div>
            <div style="padding-left:40px;">- The first column must be unique.</div>
        </div>
        <div style="font-size:14px;padding:15px 0px;">Max filesize: 10MB</div>
        <el-button size="small" type="primary" @click="procductImport">Select File</el-button>
        <div style="font-size:14px;margin:8px 0;">File Name：
          <span style="font-weight:bold;">{{uploadFile.name?uploadFile.name:''}}</span>
          <span style="color:#41babc;font-size:12px;" v-show="uploadLoadingFlag"><i class="el-icon-loading"></i> Start uploading, please do not close it.</span>
        </div>
        <input type="file" id="translateUpload" style="visibility:hidden;" @change="changeImportFile" />
        <el-dialog width="40%" title="Upload Completed" :visible.sync="resultVisible" @close="closeResultModal" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
          <div style="max-height:500px;overflow:auto;">
            <div v-for="(item, index) in uploadResult.success_nums" style="margin-bottom:20px;">
              <span>counts of uploaded entries:</span>
              <span style="font-weight:bold;margin-left:5px;">{{item.success_nums}}</span>
            </div>
            <div v-show="uploadResult.error_row.length>0">
              <div style="margin-bottom:20px;font-wieght:bold;">
                <span style="font-weight:bold;display:inline-block;width:20%;">Rows</span>
                <span style="font-weight:bold;margin-left:5px;">Tip</span>
              </div>
              <div v-for="(item, index) in uploadResult.error_row" style="border-bottom:1px dashed #ccc;margin-bottom:20px;">
                <span style="display:inline-block;width:20%;">{{item.error_row}}:</span>
                <span style="font-weight:bold;margin-left:5px;">{{item.tips}}</span>
              </div>
            </div>
            <div v-show="uploadResult.row_key.length>0">
              <div style="margin-bottom:20px;font-wieght:bold;">
                <span style="font-weight:bold;display:inline-block;width:20%;">Rows</span>
                <span style="font-weight:bold;margin-left:5px;">Tip</span>
              </div>
              <div v-for="(item, index) in uploadResult.row_key" style="border-bottom:1px dashed #ccc;margin-bottom:20px;">
                <span style="display:inline-block;width:20%;">{{item.row_key}}:</span>
                <span style="font-weight:bold;margin-left:5px;">{{item.tips}}</span>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer" v-if="uploadResult.success_nums[0].success_nums>0">
            <el-button @click="$router.push('/assignment?name='+currentProject.product+'&is_done=1&page=1')">Go to Assign</el-button>
          </span>
        </el-dialog>
      </el-dialog>
      <el-dialog title="Edit" :visible.sync="editDialogVisible" width="40%">
        <el-form :model="editProjectForm" :rules="rules" ref="editProjectForm" class="demo-ruleForm" label-width="140px">
          <el-form-item prop="product" label="Project Name:">
            <el-input v-model.trim="editProjectForm.product" style="width:100%" placeholder="enter project name"></el-input>
          </el-form-item>
          <el-form-item prop="attribute" label="Visibility:">
            <el-radio-group v-model="editProjectForm.attribute">
              <el-radio label="public">Public</el-radio>
              <el-radio label="private" disabled>Private</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="priority" label="Priority:">
            <el-select v-model="editProjectForm.priority" style="width:100%" placeholder="select priority">
              <el-option label="High" :value="3"></el-option>
              <el-option label="Normal" :value="2"></el-option>
              <el-option label="Low" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="lang" label="Language:">
            <el-select v-model="editProjectForm.slang" style="width:49%" filterable remote :remote-method="remoteMethod1" @blur="blurMethod1" placeholder="source language">
              <el-option v-for="item in langList" :key="item.code" :label="item.language" :value="item.language">
                <span style="float: left">{{ item.language }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
              </el-option>
              <el-pagination small layout="prev, pager, next" :current-page="langCurrentPage" @current-change="handleCurrentPage" :page-size="langPageSize" :total="langTotal"></el-pagination>
            </el-select>
            <el-select v-model="editProjectForm.tlang" style="width:49%" filterable remote :remote-method="remoteMethod2" @blur="blurMethod2" placeholder="target language">
              <el-option v-for="item in langList2" :key="item.code" :label="item.language" :value="item.language">
                <span style="float: left">{{ item.language }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
              </el-option>
              <el-pagination small layout="prev, pager, next" :current-page="langCurrentPage2" @current-change="handleCurrentPage2" :page-size="langPageSize2" :total="langTotal2"></el-pagination>
            </el-select>
          </el-form-item>
          <el-form-item prop="deadline" label="Deadline:">
            <el-date-picker v-model.trim="editProjectForm.deadline" type="date" style="width:100%" :default-value="new Date()" value-format="yyyy-MM-dd" :picker-options="pickerOptions" placeholder="select deadline"></el-date-picker>
          </el-form-item>
          <el-form-item prop="product_desc" label="Description:">
            <el-input type="textarea" v-model.trim="editProjectForm.product_desc" style="width:100%" placeholder="enter description"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitProject('editProjectForm')">Yes</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    let obj = {}
    this.$route.query.name?obj.name = this.$route.query.name:null
    this.$route.query.priority?obj.priority = this.$route.query.priority:null
    this.$route.query.deadline?obj.deadline = this.$route.query.deadline:null
    this.$route.query.page?obj.page = this.$route.query.page:null
    // console.log(this.backUrl)
    this.backUrl = {path:'/projectlist',query:obj}
    
    switch (this.$route.query.pane){
      case 'info':
        this.activeName = 'info'
      break;
      case 'schedule':
        this.activeName = 'schedule'
      break;
      case 'upload':
        this.activeName = 'upload'
      break;
      case 'export':
        this.activeName = 'export'
      break;
    }
    // console.log(this)
    new Promise((resolve,reject)=>{
      this.$http.post("/api/user/list").then(response=>{
        // console.log(response.data);
        this.userList = response.data.data;
        resolve('success')
      }).catch(err=>{
        reject('Request failed!')
      })
    }).then(data=>{
      this.projectDetail()
    },error=>{
      // 这里的error是上面reject()里的值
      // console.log(error);
    })
    this.$http.post("/api/Statistic/ProductAccount",qs.stringify({product_id:this.$route.query.id})).then(response=>{
      // console.log((response.data.result.total_nums-response.data.result.Unassigned)/response.data.result.total_nums)
      response.data.result.allocationPercentage = response.data.result.total_nums?parseInt(((response.data.result.total_nums-response.data.result.Unassigned)/response.data.result.total_nums)*10000)/100:0
      response.data.result.translationPercentage = response.data.result.total_nums?parseInt(((response.data.result.Qualified+response.data.result.Unreviewed)/response.data.result.total_nums)*10000)/100:0
      response.data.result.approvalPercentage = response.data.result.total_nums?parseInt((response.data.result.Qualified/response.data.result.total_nums)*10000)/100:0
      this.statisticInfo = response.data.result

    })
    this.$http.post('/api/Statistic/Accout_task_p',qs.stringify({product_id:this.$route.query.id})).then(response=>{
      this.translatorsStatistics = response.data.result['static_t']
      let total = 0
      for(let k in response.data.result['static_a']){
        if(k!=="Unreviewed"){
          for(let aa in response.data.result['static_a'][k]){
            // console.log(response.data.result['static_a'][k][aa])
            if(aa==='Qualified'){

              total +=response.data.result['static_a'][k][aa]
            }
          }
          this.approversStatistics[k] = response.data.result['static_a'][k]
          // this.approversStatistics[k].Unreviewed = response.data.result.Unreviewed?response.data.result.Unreviewed:0
        }
      }
      total +=response.data.result['static_a'].Unreviewed?response.data.result['static_a'].Unreviewed:0
      this.reviewerTotal = total
      // console.log(this.approversStatistics)
    })
    this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id})).then(response=>{
      // console.log(response.data.data)
      this.importList = response.data.data
      this.importVersionLoading = false;

    })
    
  },
  data() {
    const validateProject = (rule,value,callback)=>{
      // console.log(this)
      let nameReg =  /^[A-Za-z0-9-_]{2,20}$/;
      if(!nameReg.test(value)){
        callback(new Error("Only letters (A-Za-z), numbers (0-9), underscore (_), hyphen (-) are supported."));
      }else if(value.length<2){
        callback(new Error("Cannot be less than two characters in length."));
      }else if(value.length>20){
        callback(new Error("Cannot exceed 20 characters in length."));
      }else{
        callback()
      }
    }
    const validateLang = (rule,value,callback)=>{
      // console.log(this)
      if(this.editProjectForm.slang===''){
        callback(new Error("Please select source language."));
      }else if(this.editProjectForm.tlang===''){
        callback(new Error("Please select target language."));
      }else if(this.editProjectForm.slang===this.editProjectForm.tlang){
        callback(new Error("Source and target language can't be the same."));
      }else{
        callback();
      }
    }
    return {
      pickerOptions:{
        disabledDate(date){
          // console.log(date)
          return date && date.valueOf() <= Date.now();
        }
      },
      backUrl:'',
      ownInfoObj:{},
      editDialogVisible:false,
      langList:[],
      langCurrentPage:1,
      langPageSize:30,
      langTotal:0,
      langList2:[],
      langCurrentPage2:1,
      langPageSize2:30,
      langTotal2:0,
      editProjectForm:{
        product:'',
        attribute:'',
        priority:'',
        deadline:'',
        lang:'',
        slang:'',
        tlang:'',
        product_desc:''
      },
      activeName: 'info',
      statisticsFlag:false,
      translatorsStatistics:{},
      approversStatistics:{},
      importVersionLoading:true,
      importList:[],
      importTotal:0,
      exportVersionLoading:true,
      versionList:[{version_name:''}],
      versionsTotal:0,
      currentProject:{},
      userList:[],
      // remainingUserList:[],
      statisticInfo:{
        allocationPercentage:0,
        translationPercentage:0,
        approvalPercentage:0
      },
      reviewerTotal:0,
      // translatorList:[],
      // approverList:[],
      // viewerList:[],
      translatorMembersFlag:false,
      approverMembersFlag:false,
      viewerMembersFlag:false,
      addMembersForm: {
        translate_users:[],
        approve_users:[],
        viewed_users:[]
      },
      dialogVisible:false,
      newVersionID:1.0,
      dialogUploadVisible:false,
      resultVisible: false,
      uploadLoadingFlag:false,
      uploadResult:{
        success_nums:[{success_nums:0}],
        error_row:[],
        row_key:[]
      },
      uploadProjectId:null,
      uploadFile:{},
      rules: {
        product: [
          {
            required: true,
            message: 'Please enter product name.'
          },
          {validator:validateProject,trigger:'blur'}
        ],
        attribute: [
          {
            required: true,
            message: 'Please enter attribute.'
          }
        ],
        priority: [
          {
            required: true,
            message: 'Please enter priority.'
          }
        ],
        lang: [
          {
            required: true,
            message: 'Please select language.'
          },
          {validator:validateLang,trigger:'blur'}
        ],
        deadline: [
          {
            required: true,
            message: 'Please select deadline.'
          }
        ]
      }
    }
  },
  watch:{
    'versionList':{
      handler(val){

      },
      deep:true
    },
    'currentProject':{
      handler(val){
        
      },
      deep:true
    },
    'editProjectForm.slang':{
      handler(val,oldVal){
        this.editProjectForm.lang = this.editProjectForm.slang+' -> '+this.editProjectForm.tlang
      },
      deep:true
    },
    'editProjectForm.tlang':{
      handler(val,oldVal){
        this.editProjectForm.lang = this.editProjectForm.slang+' -> '+this.editProjectForm.tlang
      },
      deep:true
    },
    'translatorsStatistics':{
      handler(val){
        
      },
      deep:true
    },
    'approversStatistics':{
      handler(val){
        
      },
      deep:true
    },
    'addMembersForm.translate_users':{
      handler(val,oldVal){
        // console.log(val,oldVal);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
            if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
              item.status='t'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.currentProject.remainingUserList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }
      },
      deep:true
    },
    'addMembersForm.approve_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
            if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
              item.status='a'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.currentProject.remainingUserList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }

      },
      deep:true
    },
    'addMembersForm.viewed_users':{
      handler(val,oldVal){
        // console.log(val);
        //增加
        if(val.length>oldVal.length){
          this.currentProject.remainingUserList.forEach(item=>{
            if((val[val.length-1]===item.id)&&(item.email!=this.$cookies.get('email'))){
              item.status='v'
            }
          })
        }else{ //减少
          //找出减少的哪个id
          let id ;
          oldVal.forEach((item,index)=>{
            val.indexOf(item)<0?id = item:null
          })
          // console.log(id);
          this.currentProject.remainingUserList.forEach(item=>{
            if(id===item.id){
              item.status=''
            }
          })
        }

      },
      deep:true
    }
  },
  methods: {
    projectDetail(){
      this.$http.post("/api/product/details",qs.stringify({product_id:this.$route.query.id})).then(response=>{
        // console.log(response.data.data;
        response.data.data.forEach(item=>{
          this.$set(item,'translatorName',[])
          this.$set(item,'approverName',[])
          this.$set(item,'viewerName',[])
          this.$set(item,'remainingUserList',[])
          // console.log(object);
          JSON.parse(item.translate_users).forEach(item1=>{
            this.userList.forEach(item2=>{
              item1===item2.id?item.translatorName.push(item2.name):null
            })
          })
          JSON.parse(item.approve_users).forEach(item11=>{
            this.userList.forEach(item22=>{
              item11===item22.id?item.approverName.push(item22.name):null
            })
          })
          if(!item.viewed_users){
            item.viewed_users='[]'
          }
          JSON.parse(item.viewed_users).forEach(item111=>{
            this.userList.forEach(item222=>{
              item111===item222.id?item.viewerName.push(item222.name):null
            })
          })

          this.userList.forEach(item00=>{
              // console.log(item00.email)
              //排除已存在
            let flag = false
            if(item00.email!=this.$cookies.get('email')){
              JSON.parse(item.translate_users).forEach(item11=>{
                // console.log(item11)
                item00.id === item11?flag = true:null
              })
              JSON.parse(item.approve_users).forEach(item11=>{
                item00.id === item11?flag = true:null
              })
              JSON.parse(item.viewed_users).forEach(item11=>{
                item00.id === item11?flag = true:null
              })
              if(!flag){
                item00.status = ''
                // 此时remainingUserList是没有own的，需要在visibleChange方法中判断要不要添加或者删除own
                item.remainingUserList.push(item00)
              }
            }else{
              item00.status = ''
              this.ownInfoObj=item00
            }
            
          })
        })

        this.versionList = response.data.data
        this.versionsTotal = response.data.total
        this.currentProject = response.data.data[0]
        this.exportVersionLoading = false
      })
    },
    handleClick(tab, event) {
      // console.log(tab.name);
      this.$router.push({path:'/projectdetail',query:{id:this.$route.query.id,pane:tab.name}})
    },
    deleteProject(){
      this.$confirm('Are you sure to delete this project?', {
        title:'Delete',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post("/api/product/delete_p",qs.stringify({
          id:this.$route.query.id,
        })).then(response=>{
          if(response.data.success){
            this.$router.push(this.backUrl)
          }else{
            this.$message('Failed to delete!')
          }
        })
      }).catch(() => {
        
      })
    },
    openEditProject(){
      this.editDialogVisible=true
      this.editProjectForm.product = this.currentProject.product
      this.editProjectForm.attribute = this.currentProject.attribute
      this.editProjectForm.priority = this.currentProject.priority
      this.editProjectForm.deadline = this.currentProject.deadline
      this.editProjectForm.product_desc = this.currentProject.product_desc
      this.editProjectForm.slang = this.currentProject.lang.split(' -> ')[0]
      this.editProjectForm.tlang = this.currentProject.lang.split(' -> ')[1]
      this.$http.post("/api/product/lang_list",qs.stringify({count:30})).then(response=>{
        this.langList = response.data.data
        this.langList2 = response.data.data
        this.langTotal = response.data.total
        this.langTotal2 = response.data.total
      })
    },
    handleCurrentPage(val){
      // console.log(val)
      this.langCurrentPage = val
      this.$http.post("/api/product/lang_list",qs.stringify({page:val,count:this.langPageSize})).then(response=>{
        this.langList = response.data.data
        this.langTotal = response.data.total
      })
    },
    handleCurrentPage2(val){
      // console.log(val)
      this.langCurrentPage2 = val
      this.$http.post("/api/product/lang_list",qs.stringify({page:val,count:this.langPageSize2})).then(response=>{
        this.langList2 = response.data.data
        this.langTotal2 = response.data.total
      })
    },
    remoteMethod1(query){
      // console.log(query)
      this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage,count:this.langPageSize,query_l:query})).then(response=>{
        this.langList = response.data.data
        this.langTotal = response.data.total
      })
    },
    blurMethod1(){
      this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage,count:this.langPageSize})).then(response=>{
        this.langList = response.data.data
        this.langTotal = response.data.total
      })
    },
    remoteMethod2(query){
      // console.log(query)
      this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage2,count:this.langPageSize2,query_l:query})).then(response=>{
        this.langList2 = response.data.data
        this.langTotal2 = response.data.total
      })
    },
    blurMethod2(){
      this.$http.post("/api/product/lang_list",qs.stringify({page:this.langCurrentPage2,count:this.langPageSize2})).then(response=>{
        this.langList2 = response.data.data
        this.langTotal2 = response.data.total
      })
    },
    submitProject(formName){
      this.$refs[formName].validate(valid => {
        // console.log(this.editProjectForm);
        if (valid) {
          let obj = {
            id:this.$route.query.id,
            product:this.editProjectForm.product,
            attribute:this.editProjectForm.attribute,
            priority:this.editProjectForm.priority,
            deadline:this.editProjectForm.deadline,
            product_desc:this.editProjectForm.product_desc,
            lang:this.editProjectForm.slang+' -> '+this.editProjectForm.tlang,
          }
          // console.log(obj);
          this.$http.post("/api/product/edit_product",qs.stringify(obj)).then(response=>{
            if(response.data.success){
              this.editDialogVisible=false
              this.projectDetail()
            }
          })
        }
      })
    },
    membersEdit(){
      this.translatorMembersFlag=true
      this.approverMembersFlag=true
      this.viewerMembersFlag=true
    },
    memberCancel(){
      this.translatorMembersFlag=false
      this.approverMembersFlag=false
      this.viewerMembersFlag=false
    },
    allSubmitMembers(){
      let arr = []
      let obj={}
      obj.id = this.$route.query.id
      if(this.addMembersForm.translate_users.length!==0){
        obj.users = JSON.stringify(this.addMembersForm.translate_users)
        obj.role = 'translator'
        arr.push(obj)
      }
      let obj1={}
      obj1.id = this.$route.query.id
      if(this.addMembersForm.approve_users.length!==0){
        obj1.users = JSON.stringify(this.addMembersForm.approve_users)
        obj1.role = 'reviewer'
        arr.push(obj1)
      }
      let obj2={}
      obj2.id = this.$route.query.id
      if(this.addMembersForm.viewed_users.length!==0){
        obj2.users = JSON.stringify(this.addMembersForm.viewed_users)
        obj2.role = 'viewer'
        arr.push(obj2)
      }
      if(arr.length===0){
        this.translatorMembersFlag=false
        this.approverMembersFlag=false
        this.viewerMembersFlag=false
      }else{
        arr.forEach((item,index)=>{
          this.$http.post('/api/product/add_t_ap',qs.stringify({id:this.$route.query.id,users:item.users,role:item.role})).then(response=>{
            // if(response.data.success){
            //   this.translatorMembersFlag=false
            //   this.approverMembersFlag=false
            //   this.viewerMembersFlag=false
            //   this.addMembersForm.translate_users=[]
            //   this.addMembersForm.approve_users=[]
            //   this.addMembersForm.viewed_users=[]
            //   this.projectDetail()
            // }
            if(response.data.success){
              switch (item.role){
                case 'translator':
                  this.translatorMembersFlag=false
                  this.addMembersForm.translate_users=[]
                break;
                case 'reviewer':
                  this.approverMembersFlag=false
                  this.addMembersForm.approve_users=[]
                break;
                case 'viewer':
                  this.viewerMembersFlag=false
                  this.addMembersForm.viewed_users=[]
                break;
              }
            if(index===arr.length-1){
              this.projectDetail()
            }
          }
          })
        })
      }
    },
    submitMembers(role){
      let obj={}
      obj.id = this.$route.query.id
      switch (role){
        case 'translator':
          if(this.addMembersForm.translate_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.translate_users)
            obj.role = role
          }
        break;
        case 'reviewer':
          if(this.addMembersForm.approve_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.approve_users)
            obj.role = role
          }
        break;
        case 'viewer':
          if(this.addMembersForm.viewed_users.length!==0){
            obj.users = JSON.stringify(this.addMembersForm.viewed_users)
            obj.role = role
          }
        break;
      }
      if(JSON.parse(obj.users).length!==0){
        this.$http.post('/api/product/add_t_ap',qs.stringify(obj)).then(response=>{
          if(response.data.success){
            switch (role){
              case 'translator':
                this.translatorMembersFlag=false
                this.addMembersForm.translate_users=[]
                this.projectDetail()
              break;
              case 'reviewer':
                this.approverMembersFlag=false
                this.addMembersForm.approve_users=[]
                this.projectDetail()
              break;
              case 'viewer':
                this.viewerMembersFlag=false
                this.addMembersForm.viewed_users=[]
                this.projectDetail()
              break;
            }
          }
        })
      }else{
        switch (role){
          case 'translator':
            this.translatorMembersFlag=false
            this.addMembersForm.translate_users=[]
            this.projectDetail()
          break;
          case 'reviewer':
            this.approverMembersFlag=false
            this.addMembersForm.approve_users=[]
            this.projectDetail()
          break;
          case 'viewer':
            this.viewerMembersFlag=false
            this.addMembersForm.viewed_users=[]
            this.projectDetail()
          break;
        }
        this.$message({
          message: 'No one is selected!',
          type: 'warning'
        });
      }
      
    },
    visibleChange(mode,event){
      // console.log(event)
      // 判断当前条目要不要添加或者删除own
      if(event){
        switch(mode){
          case 't':
            let flag1=false
            JSON.parse(this.currentProject.translate_users).forEach(item=>{
              Base64.decode(this.$cookies.get('id'))==item?flag1=true:null
            })
            flag1?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
          break;
          case 'a':
            let flag2=false
            JSON.parse(this.currentProject.approve_users).forEach(item=>{
              Base64.decode(this.$cookies.get('id'))==item?flag2=true:null
            })
            flag2?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
          break;
          case 'v':
            let flag3=false
            JSON.parse(this.currentProject.viewed_users).forEach(item=>{
              Base64.decode(this.$cookies.get('id'))==item?flag3=true:null
            })
            flag3?(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?this.currentProject.remainingUserList.splice(this.currentProject.remainingUserList.indexOf(this.ownInfoObj),1):null):(this.currentProject.remainingUserList.indexOf(this.ownInfoObj)>-1?null:this.currentProject.remainingUserList.push(this.ownInfoObj))
          break;
        }
      }

    },
    changeUser(mode,list){
      switch(mode){
        case 't':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
                item1.status='t'
              }
            })
          })
        break;
        case 'a':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
                item1.status='a'
              }
            })
          })
        break;
        case 'v':
          list.forEach(item=>{
            this.currentProject.remainingUserList.forEach(item1=>{
              if((item===item1.id)&&(item1.email!=this.$cookies.get('email'))){
                item1.status='v'
              }
            })
          })
        break;
      }
    },
    downloadImportFile(item){
      let winDowload = window.open('','_self')
      this.$confirm(`Are you sure to download this file uploaded at ${item.updated_at}?`, {
        title:'Download',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post("/api/Import/export_import",qs.stringify({id:item.id})).then(response=>{
          if(response.data.require){
            
            let timer = setTimeout(winDowload.location.href = response.data.require,800);
            clearTimeout(timer)
          }
          if(response.data.error){
            this.$message.warning("Download failed!" + response.data.error)
          }
        })
      })
    },
    openExportVersionModal(){
      if(this.currentProject.version_name){
        this.newVersionID = Number(this.currentProject.version_name.substr(1))+0.1
      }else{
        this.newVersionID = 1.0
      }
      this.dialogVisible = true
    },
    exportQualified(){
      let winDowload = window.open('','_self')
      this.$http.post("/api/export/qualifiedexport",qs.stringify({product_id:this.$route.query.id,version_name:Number.isInteger(this.newVersionID)?'V'+this.newVersionID+'.0':'V'+this.newVersionID})).then(response=>{
        // console.log(response.data.result.file)
        if(response.data.result.file){
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          // winDowload.location.href = response.data.require
          let timer = setTimeout(winDowload.location.href = response.data.result.file,800);
          clearTimeout(timer)
          this.versionList.unshift(response.data.result.getbyversion[0])
          if(this.versionList.length>10){
            this.versionList.splice(this.versionList.length-1,1)
          }
          this.versionsTotal = this.versionsTotal + 1
          this.currentProject = response.data.result.getbyversion[0]

          this.dialogVisible = false

        }
        if(response.data.error){
          this.$Message.warning("Export failed!" + response.data.error)
        }
      })
    },
    exportHistoryVersion(version_name){
      // console.log(version_name)
      let winDowload = window.open('','_self')
      this.$confirm('Are you sure to download '+version_name+'?', {
        title:'Download',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose:false
      }).then(() => {
        this.$http.post("/api/export/oldversion",qs.stringify({product_id:this.$route.query.id,version_name:version_name})).then(response=>{
          if(response.data.require){
            // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
            // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
            // window.open('','_self').location.href = response.data.require
            let timer = setTimeout(winDowload.location.href = response.data.require,800);
            clearTimeout(timer)
          }
          if(response.data.error){
            this.$message.warning("Export failed!" + response.data.error)
          }
        })
      })
      
    },
    importCurrentChange(val){
      this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id,page:val})).then(response=>{
        // console.log(response.data.data)
        this.importList = response.data.data
        this.importVersionLoading = false;
      })
    },
    versionCurrentChange(val){
      this.$http.post("/api/product/details",qs.stringify({product_id:this.$route.query.id,page:val})).then(response=>{
        // console.log(response.data.data;
        this.versionList = response.data.data
        this.versionsTotal = response.data.total
      })
    },
    downloadFileFormat(){
      this.$http.post("/api/translate/download").then(response=>{
        if(response.data.require){
          // 程序自动执行window.open('http://')，是会被浏览器拦截的。但是如果是用户手动触发就不会拦截。
          // 做法：先定义一个空的窗口或者在当前窗口，然后在赋值href
          window.open('','_self').location.href = response.data.require
        }else{
          this.$message.warning("Export failed, please try again later.")
        }
      })
    },
    openUploadModal(){
      this.dialogUploadVisible = true
      this.uploadProjectId = this.$route.query.id
    },
    closeResultModal(){
      this.resultVisible= false
      this.dialogUploadVisible = false
      this.uploadResult={
        success_nums:[{success_nums:0}],
        error_row:[],
        row_key:[]
      }
    },
    closeUploadModal(){
      this.uploadProjectId= null
      this.dialogUploadVisible=false
      $("#translateUpload").val("")
      this.uploadFile={}
    },
    viewAllocationList(){
      this.$router.push({path:'/assignment',query:{name:this.currentProject.product,page:1}})
    },
    viewObjectionList(){
      this.$router.push({path:'/feedback',query:{name:this.currentProject.product,is_done:'3',page:1}})
    },
    changeImportFile(event){
      // console.log(event.target.files[0]);
      if(/\.csv$|\.tsv$|\.xls$|\.xlsx$/.test(event.target.files[0].name)){
        if(/^[A-Za-z0-9-_.]/.test(event.target.files[0].name.split('.')[0])){
          this.uploadFile = event.target.files[0]
          this.uploadLoadingFlag = true
          this.submitUpload()
        }else{
        // 清除file的value
        this.uploadFile={}
        $("#translateUpload").val('')
        this.$message.warning("File name is limited to letters (A-Za-z), numbers (0-9), dot (.), hypen (-), and underscore (_).")
      }
      }else{
        // 清除file的value
        this.uploadFile={}
        $("#translateUpload").val('')
        this.$message.warning("File type is limited to .csv , .tsv , .xls , .xlsx.")
        
      }
      
    },
    procductImport(){
      $("#translateUpload").trigger("click")
    },
    submitUpload() {
      // this.$refs.upload.submit();
      // let formFileData = new FormData(document.getElementById("translateUpload"))
      // console.log(document.getElementById("translateUpload"))
      // console.log($("#translateUpload")[0])
      let formFileData = new FormData()
      formFileData.append("translate_import",this.uploadFile);
      formFileData.append("product_id",this.uploadProjectId);
      // console.log(formFileData.get('translate_import'));
      this.$http.post("/api/translate/import",formFileData,{headers: {
        'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
      }}).then(response=>{
        this.uploadLoadingFlag = false
        this.uploadFile = ''
        if(response.data.result){
          this.resultVisible = true
          this.uploadResult = response.data.result
            // 刷新导入历史列表
           this.$http.post("/api/Import/import_list",qs.stringify({product_id:this.$route.query.id,page:1})).then(response=>{
            // console.log(response.data.data)
            this.importList = response.data.data
            this.importVersionLoading = false;
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
