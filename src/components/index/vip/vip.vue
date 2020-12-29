<template>
    <div class="vip">
      <v-list :total="total" :list="list" :childmenu="pmenu"></v-list>
      <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
    </div>
  </template>
  
  <script>
    import {viplist} from '../../../util/http.js'
  import alert from './alert.vue';
  import list from './list.vue';
  export default {
    name: 'vip',
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
          total:0,
          pageSize:2,
       list:[],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        this.vipgetlist();
      },
     vipgetlist(){
        viplist().then(res=>{
          if(res.data.code==200){
            this.list=res.data.list
          }
        })
      },
      upload(id){
        this.pmenu.isup = true;
        this.pmenu.isshow = true;
        this.pmenu.id=id;
        this.$refs.al.getad(id);
      },
    },
  };
  </script>
  
  <style lang="less" scoped>

  </style>