### 起步

```shell
npm install

npm run serve

npm run build
```

### 网易云API下载与安装

百度“网易云API”，下载安装包解压。

在解压后的文件夹目录下，敲CMD，命令行输入：

```shell
npm install  把项目中依赖的插件下载到本地

node app.js  运行
```

以上API文档中有。

### 遇到的坑总结

1. Vue 2.X 与 swiper 6.X不兼容，导致显示不了分页器以及无法自动轮播

2. 安卓手机(ios,电脑正常)在iscroll中点击时，点击失效。iscroll外部可以进行点击。

   解决方法：

   ```javascript
   this.iscroll = new IScroll(this.$refs.myscroll,{
   				mouseWheel: false,
   				scrollbars: false,
   				scrollX:false,
   				scrollY:true,
   				disableMouse: true,
   				disablePointer: true,
   				disableTouch:false,
   				preventDefault:false, // 防止手机端在iscroll点击事件失效
   				probeType:3,
   			})
   ```

   iscroll的高要小于需要滚动的内容的高

3. ``event.target``在层叠的元素中，拿到的元素每次可能不一样。
4. 点击事件注意冒泡或者捕获带来的影响

5. 如果在函数中用到了this，要考虑this是啥，要不要用箭头函数

### 初始化HTML中的代码

​	1. 可以让部分国产浏览器默认采用高速模式渲染页面

```html
<meta name="renderer" content="webkit">
```

​	2.为了让 IE 浏览器运行最新的渲染模式下

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

3. SEO(title keywords description)

   ```html
   <title>网易云音乐</title>
   <meta name="keywords" content="">
   <meta name="description" content="">
   ```

4. 苹果私有的图标

   ```html
   <!-- apple-touch-icon: 是苹果私有的属性
       作用: 指定将网页保存到主屏幕上的时候的图标 -->   
   <link rel="apple-touch-icon"  href="./apple-touch-icon.png">
   <link rel="apple-touch-icon" sizes="114x114" href="./apple-touch-icon114.png">
   <link rel="apple-touch-icon" sizes="152x152" href="./apple-touch-icon152.png">
   <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon180.png">
   ```

5. 网页快捷图标(favicon.ico)可以百度在线生成ico文件

   ```html
   <link rel="icon" href="./favicon.ico">
   <!-- 将图标文件都放在public文件夹下，webpack不会处理public文件夹 -->
   ```

#### 利用rem+视口释放的方式来适配移动端

```javascript
let scale = 1.0 / window.devicePixelRatio;//devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率
      let text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
      document.write(text);
      document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px"; //根元素的字体大小
      document.documentElement.setAttribute('data-dpr', window.devicePixelRatio + ''); //自定义的属性，为了设置字体大小不变，不随屏幕大小变换而变化，屏幕放大，字体缩小
      document.documentElement.setAttribute('data-theme', 'theme'); 
```

注意点: 如果在HTML文件中用到了<字符串模板, 字符串模板>中用到了变量, 那么html-plugin是无法处理的, 所以会报错

​    如果想解决这个问题, 那么我们需要再借助一个loader, html-loader(npm官网可以搜索进行安装，

​    使用html-loader需要修改webpack的配置，可以查看cli配置参考-configureWebpack)

```javascript
//调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
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
        ]
      } 
    }
 }
```

1. 借助postcss-pxtorem（插件）实现自动将px转换成rem，需要进行配置，创建postcss.config.js

```shell
npm i -D postcss-pxtorem
```

2. 借助webpack实现CSS3/ES678语法的兼容

 使用.browserslistrc文件配置,或者package.josn

3. 借助fastclick解决移动端100~300ms的点击事件延迟问题

```shell
npm install fastclick
```

4. 初始化默认的全局样式

注意点: 在移动端开发中, 一般情况下我们不需要让字体大小随着屏幕尺寸的变化而变化

​    由于我们是通过视口缩放来适配移动端的, 所以我们不能直接设置字体大小, 否则字体大小就会随着屏幕尺寸的变化而变化

``` scss
@mixin font_dpr($font-size){
  font-size: $font-size;
  [data-dpr="2"] & { font-size: $font-size * 2;}
  [data-dpr="3"] & { font-size: $font-size * 3;}
}//设置字体大小
// 不换行
@mixin no-wrap(){
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
// 限制行数
@mixin clamp($row){
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:$row;
}
```

### 自定义指令

节流函数(可以查看vue教程里 自定义指令)

```javascript
directives: {
      tortoise: {
        // 指令的定义 节流函数
        inserted: function (el,obj) {
          let flag = true;
          let timerid = null;
          el.addEventListener('input',function(){
            if(!flag) return 
            flag == false;
            timerid && clearInterval(timerid);
            timerid = setTimeout(() => {
              flag = true;
              obj.value(); // 调用v-tortoise等于的值
            }, 500);
          })
        }
      }
    },
```

