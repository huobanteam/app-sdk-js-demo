
## 安装

### npm 安装
```sh
npm i cnpm -g
cnpm i huoban-app-sdk -S
```

## 引入

```javascript
// ES6
import {client} from 'huoban-app-sdk'
// or
import * as HuobanAppSDK from 'huoban-app-sdk'

// CommonJS
var HuobanAppSDK = require('huoban-app-sdk')

// RequireJS
define(['huoban-app-sdk'], function (HuobanAppSDK) {/*...*/})
```

### CDN
可以通过 [unpkg.com/huoban-app-sdk](//unpkg.com/huoban-app-sdk/lib "https://unpkg.com/huoban-app-sdk") 获取到最新版本的资源。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div id="app"></div>
</body>
  <!-- 全局引入, 全局变量名为 `window.HuobanAppSDK` -->
  <script src="//unpkg.com/huoban-app-sdk/lib/HuobanAppSDK.min.js"></script>
  <script>
    var applicationId = 110001
    HuobanAppSDK.client().init(applicationId, function(data) {
      console.log('应用初始化成功')
      ['user', 'table', 'ticket'].forEach(function(key) {
        console.log(key + ':', data[key])
      })
    }).catch(function(err) {
      console.warn('应用初始化失败:', err.message)
    })
  </script>
</html>
```

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：<router-link to="/component/quickstart">快速开始</router-link>。
