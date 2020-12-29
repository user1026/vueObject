<template>
    <div class="specs">
      <el-button type="primary" @click="add()">添加</el-button>
      <v-list :total="total" :list="list" :childmenu="pmenu"></v-list>
      <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" @current-change="changePage" :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
    import {specslist,specsall} from '../../../util/http.js'
  import alert from './alert.vue';
  import list from './list.vue';
  export default {
    name: 'specs',
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
          ad:{
              size:2,
              page:1,
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
      add(){
          this.pmenu.isshow=true;
          this.$refs.al.formempty();
      },
      init(){
        this.specsgetlist();
        this.specsgetall();
      
      },
      specsgetlist(){
        specslist(this.ad).then(res=>{
          if(res.data.code==200){
            if(res.data.list.length==0&&this.ad.page>1){
            this.ad.page--
            this.specsgetlist()
            return
          }
            this.list=res.data.list;
          }
        })
      },
      upload(id){
        this.pmenu.isup = true;
        this.pmenu.isshow = true;
        this.pmenu.id=id;
        this.$refs.al.getad(id);
      },
     specsgetall(){
        specsall().then(res=>{
        if(res.data.code==200){
          this.total=res.data.list[0].total;
        }
      })
      },
      changePage(e){
      this.ad.page=e;
     
      this.specsgetlist()
    },
    },
  };
  </script>
  
  <style lang="less" scoped>
  @import '../../../assets/css/menu.css';
  </style>