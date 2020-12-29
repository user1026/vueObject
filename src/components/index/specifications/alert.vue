<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow">
      {{form}}{{domains}}
      <el-form :model="form">
        <el-form-item label="规格名称" prop="specsname" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="(domain, index) in domains" :label="'规格属性' + index" :key="domain.key" :label-width="formLabelWidth">
          <el-input v-model="domain.value"></el-input>
          <el-button type="primary" @click="addDomain" v-if="index==0">新增属性</el-button>
          <el-button type="danger" @click.prevent="removeDomain(domain)" v-else>删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rest">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
   specsadd,
   specsup,
   specsinfo,
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],

    data() {
      return {
        formLabelWidth: '100px',
        form: {
          specsname: '',
          attrs: '',
          status: 2,
        },
        rolelist: [],
          domains: [{
            value: ''
          }],
      };
    },
    created() {

    },
    mounted() {
     
    },
    methods: {
      formempty() {
        this.form = {
          specsname: '',
          attrs: '',
          status: 2,
        }
        this.domains=[{value:''}];
      },
      add() {
        let _this = this;
        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
          specsup(this.form).then(res => {
            if (res.data.code == 200) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.$parent.init();
            }
          })
        } else {
          this.domains.forEach(val=>{
            this.form.attrs+=val.value+',';
          })
          this.form.attrs=this.form.attrs.substr(0,this.form.attrs.length-1);
          specsadd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$parent.init();
              this.childmenu.isshow = false;
              this.formempty();
            }
          })
        }
      },
      
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      getad(uid) {
        specsinfo(uid).then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list[0];
            this.domains=  res.data.list[0].attrs.map(val=>({value:val}));
            this.form.uid = uid;
          }
        })
      },
      removeDomain(item) {
        var index = this.domains.indexOf(item)
        if (index !== 0) {
          this.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.domains.push({
          value: '',
          key: Date.now()
        });
      }
    },
  };
</script>

<style lang="less" scoped>
.el-input{
  width: 40%;
}
</style>