<template>
    <div>
        <el-button type="primary" @click="add()">添加</el-button>
        <v-list :list="list" :childmenu="pmenu"></v-list>
        <v-alert :childmenu="pmenu" ref="al" :list="list"></v-alert>
        
    </div>
</template>

<script>
    import {
        goodslist,
        goodstotal
    } from '../../../util/http.js';
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import alert from './alert.vue';
    import list from './list.vue';
    export default {
        name: 'goods',
        components: {
            vList: list,
            vAlert: alert,
        },
        computed: {
            ...mapGetters({
                getfirst: 'cate/getcatelist',
                getspecslist: 'specs/getspecslist'
            })
        },
        data() {
            return {
                pmenu: {
                    isshow: false,
                    isup: false,
                    id: 0,
                },
                list: [],
                ad: {
                    size: 100,
                    page: 1,
                },
                total: 0,
            };
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
                specslist: 'specs/reqspecslist',
            }),
            add() {
                this.pmenu.isshow = true;
                this.$refs.al.formempty();
            },
            init() {
                this.getlist();
                this.gettotal();
            },
            sendlist(id) {
                this.pmenu.isup = true;
                this.pmenu.isshow = true;
                this.pmenu.id = id;
                this.$refs.al.upload(id);
            },
            getlist() {
                goodslist(this.ad).then(res => {
                    if (res.data.code == 200) {
                        if (res.data.list.length == 0 && this.ad.page > 1) {
                            this.ad.page--
                            this.getlist()
                            return
                        }
                        this.list = res.data.list
                        this.list.forEach(val=>{
                            val.img='http://localhost:3000'+ val.img
                        })
                    }
                })
            },
            gettotal() {
                goodstotal().then(res => {
                    if (res.data.code == 200) {
                        this.total = res.data.list[0].total
                    }
                })
            }
        },
    };
</script>

<style lang="less" scoped>

</style>