## 通过`Nodejs`进行跨域
### 跨域简介
> CORS需要浏览器和服务器同时支持。目前，所有浏览器支持该功能，**IE浏览器不能低于ie10**

`CORS`是一个W3C的标准，全称：跨域资源共享(Cross-origin resource sharing)  
同源：
* 协议相同
* 域名相同
* 端口相同

如果网址和请求地址不同源，那么就会出现跨域的情况，而`CORS`是一种常用的跨域解决方法

整个`CORS`通信过程，都是浏览器自动完成，不需要用户参与。对于前端开发者来说，`CORS`通信与同源的`ajax`通信没有差别，
代码完全一样。浏览器一旦发现`ajax`请求，就会自动添加一些附加的头信息，有时还会多出一些附加的请求，但用户不会有感觉。

**实现`CORS`通信的关键是服务器。只要服务器实现了`CORS`接口，就可以跨源通信**






