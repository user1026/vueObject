import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
Vue.use(VueRouter);

function checkEnter(path, next) {
  if (JSON.parse(localStorage.getItem('userinfo')).menus_url.includes(path)) {
    next()
  } else {
    next("/index")
  }
}
const routes = [{
    path: '/login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/index',
    component: () => import('../views/index.vue'),
    children: [{
      path: '',
      name: '图表',
      component: () => import('../components/index/indexecharts/echarts.vue'),
    },{
        path: 'vmenu',
        name: '菜单管理',
        component: () => import('../components/index/menu/vmenu.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/vmenu', next)
        }
      }, {
        path: 'admin',
        name: '管理员管理',
        component: () => import('../components/index/admin/admin.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/admin', next)
        }
      }, {
        path: 'person',
        name: '角色管理',
        component: () => import('../components/index/person/person.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/person', next)
        }
      },
      {
        path: 'cate',
        name: '商品分类',
        component: () => import('../components/index/cate/cate.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/cate', next)
        }
      }, {
        path: 'banner',
        name: '轮播图管理',
        component: () => import('../components/index/banner/banner.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/banner', next)
        }
      }, {
        path: 'goods',
        name: '商品管理',
        component: () => import('../components/index/goods/goods.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/goods', next)
        }
      }, {
        path: 'seckill',
        name: '秒杀活动',
        component: () => import('../components/index/seckill/seckill.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/seckill', next)
        }
      }, {
        path: 'specs',
        name: '商品规格',
        component: () => import('../components/index/specifications/specs.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/specs', next)
        }
      }, {
        path: 'vip',
        name: '会员管理',
        component: () => import('../components/index/vip/vip.vue'),
        beforeEnter(to, from, next) {
          checkEnter('/vip', next)
        }
      }
    ]
   }, {
     path: '*',
     redirect: '/login'
   }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
    return
  }
  if (JSON.parse(localStorage.getItem('userinfo')).id) {
    next()
    return;
  }

  next("/login")
})
export default router;