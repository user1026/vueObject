<template>
    <div>
      <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow" @closed="rest">
        <el-form :model="form">
          
          <el-form-item label="所属角色" :label-width="formLabelWidth">
            <el-select v-model="form.roleid" placeholder="请选择上级菜单" @change="changePid()">
              <el-option :label="item.rolename" :value="item.id" v-for="item in rolelist" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input v-model="form.password" type="password" show-password clearable autocomplete="off"></el-input>
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
    // import {
    //   mapGetters
    // } from "vuex";
    import {
      adadd,
      adup,
      adinfo,
      personlist
    } from '../../../util/http.js';
    export default {
      name: 'alert',
      props: ["childmenu", 'list'],
     
      data() {
        return {
          formLabelWidth: '100px',
          form: {
            roleid:0,
            title: "",
           username:'',
           password:'',
            status: 2,
          },
          rolelist:[],
        };
      },
      created(){
       
      },
      mounted() {
        this.url = this.$router.options.routes[1].children;
        
        personlist(this.childmenu).then(res=>{
            if(res.data.code==200){
               this.rolelist=res.data.list;
            }
          })
        if (this.childmenu.isup == true) {
          
          adinfo(this.childmenu.id).then(res => {
            if (res.data.code == 200) {
              this.form = res.data.list;
            }
          })
        }
      },
      methods: {
        formempty() {
          this.form = {
           roleid: 0,
           username:'',
           password:'',
            status: 2,
          }
        },
        add() {
         
          if (this.childmenu.isup == true) {
             this.form.id=this.childmenu.id;
            adup(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$parent.init();
                this.rest();
                this.formempty();
              }
            })
          } else {
            adadd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$parent.init();
                this.rest();
                this.formempty();
              }
            })
          }
        },
        changePid() {
          this.form.pid == 0 ? this.form.type = 1 : this.form.type = 2;
        },
        rest() {
          this.childmenu.isshow = false;
          this.childmenu.isup = false;
        },
        getad(uid){
           adinfo(uid).then(res=>{
             if(res.data.code==200){
                this.form=res.data.list;
                this.form.uid=uid;
               
             }
           })
        }
      },
    };
  </script>
  
  <style lang="less" scoped>
  
  </style>