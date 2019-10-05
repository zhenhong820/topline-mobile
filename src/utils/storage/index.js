 //如果名字经常改动 
 const USER_KEY = 'userInfo'

 // 保存用户信息
 export const setUser = (data) => {
     //登录成功要保存token  localStorage 只保存字符串 stringify
     window.localStorage.setItem(USER_KEY, JSON.stringify(data))
 }

 //获取用户信息
 export const getUser = () => {
     //获取只写键 , 获取的是字符串, 所以转为 JSON 对象
     return JSON.parse(window.localStorage.getItem(USER_KEY))
 }

 //删除用户信息
 export const delUser = () => {

     //删除只写 键 就行
     window.localStorage.removeItem(USER_KEY)
 }