<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow" @closed="rest">
      <el-form :model="form">
        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" type="password" show-password clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵名" prop="nickname" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
  import {
    vipup,
    vipinfo,
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],

    data() {
      return {
        formLabelWidth: '100px',
        form: {
          uid: '',
          phone: '',
          nickname: '',
          password: '',
          status: 2,
        },
      };
    },
    mounted() {

    },
    methods: {
      formempty() {
        this.form = {
          uid: "",
          phone: '',
          nickname: '',
          password: '',
          status: 2,
        }
      },
      add() {

        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
          vipup(this.form).then(res => {
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
        }
      },
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      getad(uid) {
        vipinfo(uid).then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            this.form.uid = uid;
          }
        })
      }
    },
  };
</script>

<style lang="less" scoped>

</style>