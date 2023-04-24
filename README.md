# vue-ts-mall-demo

本仓库是我学习了b站上一个项目实战项目的源码

视频名称: 一行行代码带你敲，Vue3+TS电商后台系统项目实战

视频地址:https://www.bilibili.com/video/BV1nr4y1G73d?p=1 

## 简单说下

不知道b站 up主使用的node是什么版本, 我使用的node版本是v14.17.0

up主使用的IDE是VsCode, 而我使用的是IDEA

## 下载使用

首先复制仓库链接, 下载仓库到本地

```xml
git clone https://github.com/chenbozhi/vue-ts-mall-demo.git
```

cmd命令(每个人知识储备程度不同,我就这样尽可能详细讲吧, 希望能帮到你) 进入到vue-ts-mall-demo文件夹

执行下面命令, 下载项目所需要的依赖

```
npm install
```

然后执行下面命令来启动项目

```xml
npm run serve
```

每个人网速或者npm的镜像不同, 可能需要等待一会儿, 如果没有什么问题, 会显示下面内容

![image-20220625153132677](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220625153132677.png)

打开浏览器输入地址

```xml
http://localhost:8081/
```

就可以进入系统

## 界面展示

输入http://localhost:8081/, 如果是首次进入, 会跳转到登录页面

登录页面展示

![image-20220625153342646](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220625153342646.png)

**用户名是 admin  密码是 123456**

登录成功后会进入系统主页面

系统主页面

商品列表

![image-20220625153447006](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220625153447006.png)

用户列表页面

![image-20220625153517445](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220625153517445.png)

角色列表

![image-20220625153535530](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220625153535530.png)

## 编写流程(可代替看视频)

> 想学别的,没有想法再去完善了, 就先这样吧

这是我学习该视频时边看边敲的过程,进行记录

### 项目搭建

### 登录页面

### 登录逻辑

在登录成功之后, 会跳转到首页

![image-20220622162821112](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220622162821112.png)

同时, 可以查看本地localStorage, 保存了token信息

![image-20220622162531334](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com/cbz_book_images/image-20220622162531334.png)

## 关于fastmock

已经有几个小伙伴询问我关于fastmock的问题, 在这里想简单说一下

由于这个项目本身只是一个前端项目,是没有后端的, 但是前端又想要展示数据,于是用fastmock这个网站提供的模拟接口的功能

### 简单使用

首先进入fastmock的官网

fastmock网站地址: https://www.fastmock.site

点击导航栏 的**立即使用**

![image-20220812110820696](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812110820696.png)

如果没有账号,要先创建一个账号, 我是用github登录的



![image-20220812110921841](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812110921841.png)

登录后, 可以创建项目, 也有使用文档, 文档是最好的学习方式

![image-20220812111155715](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812111155715.png)



进入创建的项目



![image-20220812111321487](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812111321487.png)



关于上面接口根地址, 它将作为请求的根路径

可以看到在这个项目代码`request/index.ts`文件中,关于axios的配置(下面是up主配的, 上面是我自己的)

![image-20220812111800684](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812111800684.png)



新建一个接口



![image-20220812111442866](https://firstbucket-1300448090.cos.ap-chengdu.myqcloud.com//cbz_book_imagesimage-20220812111442866.png)



可以看到, 数据是写在一个`json`字符串中, 它是写死的, 前端请求的数据, 就是这里设置的



目前我也没有使用除了get以外的请求测试

fastmock经常不稳定，我已经改使用easymock

~~原视频项目中的up主定义的mock接口依然可以用~~



> 更新于2022-08-12 11:16

## 关于easymock

最近不少小伙伴说登录一直登不进去，有结果无法页面跳转等问题，我排查了一下，的确是有些问题，一方面有墙的原因，还有代码的原因，已经过了比较久了，弄了半天，现在我这里不再使用fastmock，毕竟国外的不稳定，改为使用easymock，本人调试无问题，可以使用

已经拉取过代码的小伙伴再pull一下即可

> 更新日期：2022-10-25

## 还是关于mock的说明

有几个小伙伴还是说mock接口没有放开，想直接看看响应的json，今天我自测是没有问题的，还是把响应的mock接口的响应报文整理了个文件，在根目录的 **mock说明.txt** 这个文件，大家可以自行配置自己的mock。

需要注意的是，登录的接口mock返回有成功和失败两种情况，自己配置mock可能需要看看相关文档。

> 更新日期：2023-04-24

## 最后

花了两天时间来敲这个项目demo, 收获还是很多的, 关于vue3的新特性,与vue2不同的用法, 还有使用ts

本来想顺着把这个页面完善好, 但是比较懒, 这个项目代码基本上是从0跟着一步一步敲出来的, 但是视频中有些命名和少部分代码我觉得可以优化,所以我就自己改了
绝大部分的内容和视频是相同的


感谢自己坚持下来, 看过好多b站以及各种渠道的知识, 这是第一个完整坚持下来的, 虽然它很简单

继续加油吧
