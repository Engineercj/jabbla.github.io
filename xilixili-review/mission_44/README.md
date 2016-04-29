# 使用说明
滚动加载
### 文件结构
falls.js,fallsLayouts.js,ImageAgent.js,myFuncs.js
**入口文件**
falls.js
```javascript
//创建布局实例
var test = fallsLayout()
//实例传参初始化
testDom = test.init(cols,margin,blockNums)
//cols列数 margin间距 blockNums模块数量
test.add([imgs])
//传入图片地址数组
```
**模块文件**
fallsLayouts.js
**提供add,和init接口**
```javascript
waterFalls.prototype.init()
waterFalls.prototype.generateLayout()
waterFalls.prototype.generateWraper()
waterFalls.prototype.generateBlack()
waterFalls.prototype.addImage()
waterFalls.prototype.addEvent()
```
**图片代理**
ImageAgent.js
**滚动加载**

**一些封装**
myFuncs.js








