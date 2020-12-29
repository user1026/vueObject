import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    component:()=>import('../views/login.vue'),
  },
  {
    path:'/index',
    component:()=>import('../views/index.vue'),
    children:[{
      path:'vmenu',
      name:'菜单管理',
      component:()=>import('../components/index/menu/vmenu.vue'),
    },{
      path:'admin',
      name:'管理员管理',
      component:()=>import('../components/index/admin/admin.vue'),
    },{
      path:'person',
      name:'角色管理',
      component:()=>import('../components/index/person/person.vue'),
    },
    {
      path:'cate',
      name:'商品分类',
      component:()=>import('../components/index/cate/cate.vue'),
    },{
      path:'banner',
      name:'轮播图管理',
      component:()=>import('../components/index/banner/banner.vue')
    },{
      path:'goods',
      name:'商品管理',
      component:()=>import('../components/index/goods/goods.vue')
    },{
      path:'seckill',
      name:'秒杀活动',
      component:()=>import('../components/index/seckill/seckill.vue')
    },{
      path:'specs',
      name:'商品规格',
      component:()=>import('../components/index/specifications/specs.vue')
    },{
      path:'vip',
      name:'会员管理',
      component:()=>import('../components/index/vip/vip.vue')
    },]
  },
];

const router = new VueRouter({
  routes
});

export default router;
