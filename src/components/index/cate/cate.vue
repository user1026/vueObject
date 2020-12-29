<template>
    <div class="cate">
      <el-button type="primary" @click="add()">添加</el-button>
      <v-list :list="list" ></v-list>
      <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
    </div>
  </template>
  
  <script>
    import {
      catelist
      
    } from '../../../util/http.js'
  import alert from './alert.vue';
  import list from './list.vue';
  export default {
    name: 'cate',
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
       baseurl:'http://localhost:3000'
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
        catelist().then(res=>{
          if(res.data.code==200){
            this.list=res.data.list
            this.list.forEach(val=>{
              val.children.forEach(item=>{
                item.img=this.baseurl+item.img;
              })
            })
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
  @import '../../../assets/css/menu.css';
  </style>