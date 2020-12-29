<template>
    <div>
      <el-button type="primary" @click="add()">添加</el-button>
      <v-list :list="list" :childmenu="pmenu"></v-list>
      <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
    </div>
  </template>
  
  <script>
    import {secklist} from '../../../util/http.js'
  import alert from './alert.vue';
  import list from './list.vue';
  export default {
    name: 'vmenu',
    components: { 
      vList: list,
      vAlert: alert,
     },
    
    data() {
      return {
          pmenu:{
              isshow:false,
              isup:false,
              id:0,
          },
       list:[],
      };
    },
    watch: {
      
    },
    mounted() {
      this.init();
    },
    methods: {
      add(){
          this.pmenu.isshow=true;
          this.$refs.al.formempty();
      },
      init(){
       secklist().then(res=>{
          console.log(res);
          if(res.data.code==200){
            this.list=res.data.list
          }
        })
      },
      sendlist(id){
          this.pmenu.isup=true;
          this.pmenu.isshow=true;
          this.pmenu.id=id;
          this.$refs.al.upload(id);
      }
    },
  };
  </script>
  
  <style lang="less" scoped>
  
  </style>