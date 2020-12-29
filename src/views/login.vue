<template>
  <div class="login">
    <div class="form">
      <el-card class="box-card" shadow="hover">
        <h1>登录</h1>
        <el-form label-width="80px" :model="form">
          <el-form-item label="账户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登录</el-button>
      </el-card>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {
          name: '',
          password: '',
        }
      };
    },
    mounted() {

    },
    methods: {
      login() {

      }
    },
  };
</script>

<style lang="less" scoped>
  @import '../assets/css/login.css';
</style>