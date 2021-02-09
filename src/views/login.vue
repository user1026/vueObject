<template>
  <div id="login">
      <div class="form">
        <el-card class="box-card" shadow="hover">
          <h1>登录</h1>
          <el-form label-width="80px" :model="form">
            <el-form-item label="账户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login">登录</el-button>
        </el-card>
      </div>
   
  </div>
</template>

<script>
  import {
    reqlogin
  } from '../util/http.js';
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'login',
    data() {
      return {
        form: {
          username: '',
          password: '',
        }
      };
    },
    computed: {
      ...mapGetters({
        getuserinfo:"getuserinfo",
      })
    },
    methods: {
      ...mapActions({
        requserinfo:'requserinfo'
      }),
      login() {
        reqlogin(this.form).then(res => {
          if (res.data.code == 200) {
            localStorage.setItem('userinfo',JSON.stringify(res.data.list));
            this.requserinfo(res.data.list);
            this.$router.push("/index");
          }
        })
      }
    },
    mounted() {
     
    },
  };
</script>

<style lang="less" scoped>
  @import '../assets/css/login.css';

</style>