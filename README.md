## 安装

```shell
npm install 

npm run serve

npm run build
```



## 技术栈

Vue 2.x（axios，router， store）  

插件： 

1. swiper 轮播图
2. scrollview 滑动
3. fast-click 防止点击过快
4. velocity 动画
5. cookie 数据保存到本地

## 跨域问题解决

创建vue.config.js文件并写上

```javascript
module.exports = {
    configureWebpack: {
      module:{
        rules:[{
                test:/\.(html)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'html-loader',
                    options:{
                      minimize:true //压缩HTML文件
                    }
                }
            }
        ],
      } 
    },
    devServer:{
      host:'localhost',
      port:8080,
      proxy:{
        'server':{
          target:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy", //接口地址
          ws:true,
          changeOrigin:true,
          pathRewrite:{
            '^/server':'' //代替地址
          }
        }
      }
    }
  }
```

并且需要修改baseURL

```javascript
axios.defaults.baseURL = "/server"
```

## 目录结构

### 文件夹

1. api

   主要是运用axios，调用后端接口，获取后端数据

   ```javascript
   get: function(url,data){
           return new Promise(
               function(resolve,reject){
                   axios.get(url, {
                       params: {
                         ID: data
                       }
                     })
                     .then(function (response) {
                       resolve(response);
                     })
                     .catch(function (error) {
                       reject(error);
                     })
               }
           )
       }
   ```

   提供get，post方法，可以直接调用获取后端数据

2. store

   全局数据共享

   state.js    保存全局共享数据

   action.js  向外映射，修改state.js参数的方法

   getter.js  向外映射，获取state.js参数的方法

   mutation.js 对state.js参数进行操作的方法

3. router

   路由

   为View组件提供路由

   ```javascript
   const routes = [
     {path:'/', redirect: '/Home'},
     {path:'/Home',component: Home,},
     {path:'/Mood', component: Mood},
     {path: '/Ranker', component: Ranker},
     {path: '/Commend', component: Commend},
     {path: '/User', component: User}
   ]
   ```

4. views

   存放用来显示的Vue组件

   Commend 表彰墙组件

   Home         主页

   Mood          心情

   Ranker        排名

   User            用户界面

5. components

   单个Vue组件

   Banner  轮播图

   MyHabits 添加挑战组件

   Header     页面头部

   Scrollview  滚动插件

   Tabbar       选项卡

   SubHeader  用户的子头部

6. assets

   提供CSS和images

## 全局方法及插件

### 设置小图标

```html
<link rel="icon" href="./favicon.ico">
```

### 适配移动端

```javascript
let scale = 1.0 / window.devicePixelRatio;//devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率
      let text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
      document.write(text);
      document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px"; //根元素的字体大小
      document.documentElement.setAttribute('data-dpr', window.devicePixelRatio + ''); //自定义的属性，为了设置字体大小不变，不随屏幕大小变换而变化，屏幕放大，字体缩小
      document.documentElement.setAttribute('data-theme', 'theme'); 
```

### 共有参数的修改和调用

```javascript
...mapActions([
			'addHabitsList',  
			'setHabitsList',
    ]),
```

获取action.js方法

```javascript
computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
	  'getHabitsList',
      // ... 
	])},
```

获取state.js参数

### Cookie使用

1. cookie的设置

   ```javascript
   Vue.$cookies.config('7d')
   ```

   过期时间为7天

2. cookie的设置与调用

   ```javascript
   Vue.$cookies.get('mood')
   
   Vue.$cookies.set('mood',JSON.stringify(this.contents));
   ```

### 滚动的设置和方法

1. 滚动插件基本设置

   ```javascript
   this.iscroll = new IScroll(this.$refs.myscroll,{
   				mouseWheel: true,
   				scrollbars: false,
   				scrollX:false,
   				scrollY:true,
   				disableMouse: true,
   				disablePointer: true,
   				disableTouch:false,
   				preventDefault:false, // 防止手机端在iscroll点击事件失效
   				probeType:3,
   			})
   			// 1. 创建一个观察者对象
   			let observer = new MutationObserver((mutationList, observer)=>{
   				this.iscroll.refresh();
   			});
   			// 2. 告诉观察者对象需要观察什么内容
   			let observerOptions = {
   				childList: true,  // 观察目标子节点的变化，是否有添加或者删除
   				attributeFilter: ['height','offsetHeight'], // 观察属性变动
   				subtree: true     // 观察后代节点，默认为 false
   			};
   			// 3. 告诉观察者对象,第一个参数是观察谁，第二参数是观察内容
   			observer.observe(this.$refs.myscroll, observerOptions);
   ```

   

2. 滚动插件中用到的方法

   - 提供监听滚动

     ```javascript
     scrolling(fn){
     				this.iscroll.on('scroll', function(){
     					fn(this.y);
     				});
     			}
     ```

     

   - 刷新

     ```javascript
     refresh(){
     				setTimeout(()=>{
     					this.iscroll.refresh();
     				},100);
     			}
     ```

     

   - 滚动到指定位置

     ```javascript
     Toscrolling(x, y, time){
     				this.iscroll.scrollTo(x, y, time);
     			}
     ```

     

   ### Swiper插件设置与使用

   1. Swiper设置

      ```javascript
      swiperOptions: {
      	      loop: true,
              // If we need pagination
              pagination: {
                el: '.swiper-pagination',
              },
              autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
                },
              observer: true,
              observeParents: true,
              observeSlideChildren: true
      			}
      ```

      

   2. 注意事项

      在Vue2.x中使用Swiper6.x无法显示分页和自动播放，不支持。

   

### 动画

各个界面之间切换的动画实现

1. 使用钩子函数

```html
<transition
  :css="false"
  @enter="enter"
  @leave="leave">
  ................   
 </transition>
```

​		运用Velocity插件

``` javascript
enter(e,done){
        Velocity(this.$refs.uloadin, "transition.fadeIn", { duration: 500 },function(){
          done();
        })
      },
      leave(e,done){
        Velocity(this.$refs.uloadin, "transition.fadeOut", { duration: 500 },function(){
          done();
        })
      }
```

2. 使用CSS

   ```html
   <transition name="fade">
   </transition> 
   ```

   ```css
   .fade-enter-active, .fade-leave-active {
     transition: all 0.5s;
   }
   .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
     transform: translateX(-100%);
     opacity: 0;
   }
   ```

### CSS 混合

1. 根据设备大小，选择图片大小

``` scss
@mixin bg_img($url){
  background-image: url($url + '_night.png');
  background-size: cover;
  background-repeat: no-repeat;
  [data-dpr='2'] & {
    background-image: url($url + '_night@2x.png');
  }
  [data-dpr='3'] & {
    background-image: url($url + '_night@3x.png');
  }
}
```

2. 为了设置字体大小不变，不随屏幕大小变换而变化，屏幕放大，字体缩小

``` scss
/*根据dpr计算font-size*/
@mixin font_dpr($font-size){
  font-size: $font-size;
  [data-dpr="2"] & { font-size: $font-size * 2;}
  [data-dpr="3"] & { font-size: $font-size * 3;}
}
```

3. 限制行数

```scss
@mixin clamp($row){
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:$row;
}
```

## 显示组件

### Home.vue

子组件

- Banner       导航条
- MyHabits    我的挑战
- Scrollview    滚动条

### Mood.vue

子组件

- Scrollview    滚动条

将数据转成JSON格式保存在cookie

``` javascript
Vue.$cookies.set('mood',JSON.stringify(this.contents));
```

获取当前时间

```javascript
let now = new Date();
let content = {};
content.id = now.getTime();
content.page = this.textpage;
let months = now.getMonth() + 1;
content.time = `${now.getFullYear()}-
${months.toString().padStart(2,'0')}-
${now.getDate().toString().padStart(2,'0')}  
${now.getHours().toString().padStart(2,'0')}:
${now.getMinutes().toString().padStart(2,'0')}:
${now.getSeconds().toString().padStart(2,'0')}`;
this.contents.unshift(content);
```

### Ranker.vue

子组件

- Scrollview    滚动条

```javascript
this.$refs.scrollview.Toscrolling(0,this.topList[index],100);
```

调用滚动条滚动到指定位置

```javascript
this.$nextTick(()=>{
        let list = this.$refs.group
        for(let i = 0; i < list.length;i++){
            this.topList.push(-list[i].offsetTop);
        }
    });
```

获取元素距顶部高度

### User.vue

子组件

- Scrollview    滚动条
- SubHeader  头部

账号信息，创建时导入。用来判断账号是否正确及是否被注册。

提交数据判断的方法

```javascript
submitForm() {
        if (this.username == null || this.username == '') {
          alert('用户名不能为空!');
        }
        if (this.password == null || this.password == '') {
          alert('密码不能为空!');
        }
        if(this.flag){
          if(this.accounts.length==0){
            alert('账号未注册!');
          }else{
            for(let i = 0; i < this.accounts.length;i++){
              if(this.accounts[i].user == this.username && this.accounts[i].password == this.password){
                alert('登录成功!');
                this.success = true;
                Vue.$cookies.set('success',1);
                this.$router.push('/');
                return;
              }
            }
            alert('账号或密码错误，登录失败!');
          }
        }
        else {
          for(let i = 0; i < this.accounts.length;i++){
            if(this.accounts[i].user == this.username){
              alert('账号已注册!');
              return
            }
          }
          this.accounts.push({
            user:this.username,
            password:this.password,
          });
          this.success = true;
          Vue.$cookies.set('success',1);
          this.$router.push('/');
          Vue.$cookies.set('accounts',JSON.stringify(this.accounts));
          alert('账号注册成功，欢迎'+this.username);
        }
      }
```









