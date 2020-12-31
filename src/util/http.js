import axios from 'axios';
import qs from 'qs';
let baseurl = '/api'

axios.interceptors.request.use(req=>{
    if(req.url!==baseurl+"/api/userlogin"){
       req.headers.authorization=JSON.parse(localStorage.getItem('userinfo')).token
    }
      return req;
})
axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    if (res.data.code !== 200) {
        alert(res.data.msg)
    }
    // if(res.data.msg=="登录已过期或访问权限受限"){
          
    // }
    if (!res.data.list) {
        res.data.list = [];
    }
    return res
})

export let menutree = () => {
    return axios({
        url: baseurl + '/api/menulist',
        method: "get",
        params: {
            istree: true
        }
    })
}
export let menuadd = (form) => {
    return axios({
        url: baseurl + '/api/menuadd',
        method: "post",
        data: form
    })
}
export let menudel = (id) => {
    return axios({
        url: baseurl + '/api/menudelete',
        method: "post",
        data: {
            id: id,
        }
    })
}
export let menuup = (form) => {
    return axios({
        url: baseurl + '/api/menuedit',
        method: "post",
        data: form
    })
}
export let menuinfo = (id) => {
    return axios({
        url: baseurl + '/api/menuinfo',
        method: "get",
        params: {
            id: id
        }
    })
}
export let personadd = (form) => {
    return axios({
        url: baseurl + '/api/roleadd',
        method: "post",
        data: form,
    })
}
export let personlist = () => {
    return axios({
        url: baseurl + '/api/rolelist',
        method: "get",
    })
}
export let personinfo = (id) => {
    return axios({
        url: baseurl + '/api/roleinfo',
        method: "get",
        params: {
            id: id
        }
    })
}
export let personup = (form) => {
    return axios({
        url: baseurl + '/api/roleedit',
        method: "post",
        data: form,
    })
}
export let persondel = (id) => {
    return axios({
        url: baseurl + '/api/roledelete',
        method: "post",
        data: {
            id: id
        },
    })
}
export let addel = (uid) => {
    return axios({
        url: baseurl + '/api/userdelete',
        method: "post",
        data: {
            uid: uid
        },
    })
}
export let adup = (form) => {
    return axios({
        url: baseurl + '/api/useredit',
        method: "post",
        data: form,
    })
}
export let adadd = (form) => {
    return axios({
        url: baseurl + '/api/useradd',
        method: "post",
        data: form,
    })
}
export let adlist = (txt) => {
    return axios({
        url: baseurl + '/api/userlist',
        method: "get",
        params: {
            size: txt.size,
            page: txt.page,
        },
    })
}
export let adinfo = (uid) => {
    return axios({
        url: baseurl + '/api/userinfo',
        method: "get",
        params: {
            uid: uid
        },
    })
}
export let adall=()=>{
    return axios({
        url:baseurl+'/api/usercount',
        method:"get",
    })
}
/******************************************************/
export let catelist=(pid)=>{
    let form;
    if(pid){
      form={istree:true,pid:pid}
    }else{
        form={istree:true}
    }
    return axios({
        url:baseurl+'/api/catelist',
        method:"get",
        params:form,
    })
} 
export let cateinfo=(id)=>{
    return axios({
        url:baseurl+'/api/cateinfo',
        method:"get",
        params:{
            id:id,
        }
    })
}
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}
export let cateadd=(form)=>{
    return axios({
        url:baseurl+'/api/cateadd',
        method:"post",
        data:dataToFormData(form),
    })
}
export let catedel=(id)=>{
    return axios({
        url:baseurl+'/api/catedelete',
        method:"post",
        data:{id:id},
    })
}
export let cateup=(form)=>{
    return axios({
        url:baseurl+'/api/cateedit',
        method:"post",
        data:dataToFormData(form),
    })
}
/*******************specs****************** */
export let specslist=(form)=>{
    return axios({
        url:baseurl+'/api/specslist',
        method:"get",
        params:{
            size:form.size,
            page:form.page,
        }
    })
} 
export let specsinfo=(id)=>{
    return axios({
        url:baseurl+'/api/specsinfo',
        method:"get",
        params:{
            id:id,
        }
    })
}
export let specsadd=(form)=>{
    return axios({
        url:baseurl+'/api/specsadd',
        method:"post",
        data:form,
    })
}
export let specsdel=(id)=>{
    return axios({
        url:baseurl+'/api/specsdelete',
        method:"post",
        data:{id:id},
    })
}
export let specsup=(form)=>{
    return axios({
        url:baseurl+'/api/specsedit',
        method:"post",
        data:form,
    })
}
export let specsall=()=>{
    return axios({
        url:baseurl+'/api/specscount',
        method:"get",
    })
}
/**************************************** */
export let viplist=()=>{
    return axios({
        url:baseurl+'/api/memberlist',
        method:"get",
    })
} 
export let vipinfo=(uid)=>{
    return axios({
        url:baseurl+'/api/memberinfo',
        method:"get",
        params:{
            uid:uid,
        }
    })
}
export let vipup=(form)=>{
    return axios({
        url:baseurl+'/api/memberedit',
        method:"post",
        data:form,
    })
}
/***************************************************** */
export let bannerlist=()=>{
    return axios({
        url:baseurl+'/api/bannerlist',
        method:"get",
    })
} 
export let bannerinfo=(id)=>{
    return axios({
        url:baseurl+'/api/bannerinfo',
        method:"get",
        params:{
            id:id,
        }
    })
}
export let banneradd=(form)=>{
    return axios({
        url:baseurl+'/api/banneradd',
        method:"post",
        data:dataToFormData(form),
    })
}
export let bannerdel=(id)=>{
    return axios({
        url:baseurl+'/api/bannerdelete',
        method:"post",
        data:{id:id},
    })
}
export let bannerup=(form)=>{
    return axios({
        url:baseurl+'/api/banneredit',
        method:"post",
        data:form,
    })
}
/********************************************* */
export let secklist=()=>{
    return axios({
        url:baseurl+'/api/secklist',
        method:"get",
    })
} 
export let seckinfo=(id)=>{
    return axios({
        url:baseurl+'/api/seckinfo',
        method:"get",
        params:{
            id:id,
        }
    })
}
export let seckadd=(form)=>{
    return axios({
        url:baseurl+'/api/seckadd',
        method:"post",
        data:form,
    })
}
export let seckdel=(id)=>{
    return axios({
        url:baseurl+'/api/seckdelete',
        method:"post",
        data:{id:id},
    })
}
export let seckup=(form)=>{
    return axios({
        url:baseurl+'/api/seckedit',
        method:"post",
        data:form,
    })
}
/*********************************************** */

export let goodslist=(form)=>{
    return axios({
        url:baseurl+'/api/goodslist',
        method:"get",
        params:form
    })
} 
export let goodsinfo=(id)=>{
    return axios({
        url:baseurl+'/api/goodsinfo',
        method:"get",
        params:{
            id:id,
        }
    })
}
export let goodstotal=()=>{
    return axios({
        url:baseurl+'/api/goodscount',
        method:"get",
    })
}
export let goodsadd=(form)=>{
    return axios({
        url:baseurl+'/api/goodsadd',
        method:"post",
        data:dataToFormData(form),
    })
}
export let goodsdel=(id)=>{
    return axios({
        url:baseurl+'/api/goodsdelete',
        method:"post",
        data:{id:id},
    })
}
export let goodsup=(form)=>{
    return axios({
        url:baseurl+'/api/goodsedit',
        method:"post",
        data:dataToFormData(form),
    })
}
/***************************** */
export let reqlogin=(user)=>{
    return axios({
        url:baseurl+'/api/userlogin',
        method:"post",
        data:qs.stringify(user),
    })
}