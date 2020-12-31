<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <v-list :list="list" :childmenu="pmenu"></v-list>
    <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
  </div>
</template>

<script>
  import {
    secklist
  } from '../../../util/http.js';
  import {
    mapGetters,
    mapActions,
  } from "vuex";
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
        pmenu: {
          isshow: false,
          isup: false,
          id: 0,
        },
        list: [],
      };
    },
    computed: {
      ...mapGetters({
        getfirst: 'cate/getcatelist',
        getspecslist: 'specs/getspecslist'
      })
    },
    mounted() {
      this.init();
      if (this.getfirst.length == 0) {
        this.cateList();
      }
      if (this.getspecslist.length == 0) {
        this.specslist();
      }
    },
    methods: {
      ...mapActions({
        cateList: 'cate/cateList',
        specslist: 'specs/reqspecslist'
      }),
      add() {
        this.pmenu.isshow = true;
        this.$refs.al.formempty();
      },
      init() {
        secklist().then(res => {
          if (res.data.code == 200) {
            this.list = res.data.list
          }
        })
      },
      sendlist(id) {
        this.pmenu.isup = true;
        this.pmenu.isshow = true;
        this.pmenu.id = id;
        this.$refs.al.upload(id);
      }
    },
  };
</script>

<style lang="less" scoped>

</style>