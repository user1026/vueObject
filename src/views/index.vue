<template>
    <div class="index">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="2" class="el-menu-vertical-demo" router background-color="#545c64"
                    unique-opened text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/index">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-tools"></i>
                            <span>系统设置</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/vmenu"> <i class="el-icon-menu"></i>菜单管理</el-menu-item>
                            <el-menu-item index="/index/person"> <i class="el-icon-menu"></i>角色管理</el-menu-item>
                            <el-menu-item index="/index/admin"> <i class="el-icon-menu"></i>管理员管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商城管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/cate">商品分类</el-menu-item>
                            <el-menu-item index="/index/specs">商品规格</el-menu-item>
                            <el-menu-item index="/index/goods">商品管理</el-menu-item>
                            <el-menu-item index="/index/vip">会员管理</el-menu-item>
                            <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
                            <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>{{username}}</el-header>
                <el-main>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                username: '',
            };
        },
        mounted() {
            this.username = JSON.parse(localStorage.getItem('userinfo')).username;
           
        },
        methods: {

        },
    };
</script>

<style lang="less" scoped>
    @import '../assets/css/index.css';
</style>