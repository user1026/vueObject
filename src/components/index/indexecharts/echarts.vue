<template>
    <div id="tu">

    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import {
        catelist
    } from "../../../util/http.js"
    export default {
        name: 'echarts',
        computed: {
            // ...mapGetters({
            //     list: 'cate/getcatelist',
            // })
        },
        watch: {
            list(newValue) {

            },
        },
        created() {


        },
        data() {
            return {
                option: {
                    title: {
                        text: '商品分类'
                    },
                    tooltip: {},
                    legend: {
                        data: ['二级分类个数']
                    },
                    xAxis: {
                        title: '一级分类',
                        data: []
                    },
                    yAxis: {
                        //title: '二级分类个数'
                    },
                    series: [{
                        name: '二级分类个数',
                        type: 'bar',
                        data: []
                    }]
                }
            };
        },
        mounted() {
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('tu'));
            catelist().then(res => {
                this.init(res.data.list)
                myChart.setOption(this.option);
            })
        },
        methods: {
            // ...mapActions({
            //     catelist: 'cate/cateList'
            // }),
            init(list) {
                this.option.xAxis.data = list.map(val => {
                    return val.catename;
                })
                 this.option.series[0].data = list.map(val => {
                     return val.children.length;
                 })
            }
        },
    };
</script>

<style lang="less" scoped>
    #tu {
        width: 100%;
        height: 90%;
    }
</style>