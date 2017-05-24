
## 环境常量

### SDK.isClient
是否在伙伴客户端宿主环境内

### SDK.isClientIOS
是否在伙伴iOS客户端宿主环境内

### SDK.isClientAndroid
是否在伙伴安卓客户端宿主环境内

### SDK.isPC
是否当前在伙伴网页版宿主环境内 (https://app.huoban.com/)

### SDK.isWap
是否当前在伙伴移动版宿主环境内 (https://m.huoban.com/)


## 静态方法

### SDK.client()
初始化一个客户端, 用于和宿主通讯

```javascript
import {client as HuobanClient} from 'huoban-app-sdk'

const client = HuobanClient()
```
