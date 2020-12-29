<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <v-list :list="list" :childmenu="pmenu"></v-list>
    <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
  </div>
</template>

<script>
  import {
      personlist
    } from '../../../util/http.js'
import alert from './alert.vue';
import list from './list.vue';
export default {
  name: 'person',
  components: { 
    vAlert:alert,
    vList:list,
   },
  data() {
    return {
      pmenu:{
        isshow:false,
        isup:false,
      },
      list:[],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    add(){
      this.pmenu.isshow=true;
    },
    init(){
      personlist().then(res=>{
      if(res.data.code==200){
        if(res.data.list=='null'){
          return ;
        }
        this.list=res.data.list;
      }
    })
    },
    sendlist(id){
this.pmenu.isshow=true;
this.pmenu.isup=true;
this.$refs.al.upload(id);
    }
  },
};
</script>

<style lang="less" scoped>

</style>