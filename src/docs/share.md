## 分享
`client.openShare(options, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenshareopts-fn "API-openShare") _(native only)_


### 参数
| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| options   | 组件配置 | object    |   —         |    —    |
| fn        | 回调函数, 接收2个参数 (data, err), 参见 <router-link to="/component/define#hui-diao">回调</router-link> | function  |   —   |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       |
|---------- |--------- |---------- |:------------:|
| title     | 分享的标题     | string    |   |
| content     | 分享的描述     | string    |   |
| image     | 指定显示的图片url     | string    |   |
| url     | 分享的链接     | string    |   |
| via     | 指定分享方式     | string    |  wechat(微信聊天)/wechat_timeline(微信朋友圈)/qq(腾讯QQ)/weibo(微博)/clipboard(系统剪切板)/browser(浏览器)/tongren(同仁app) |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{via: 'wechat'}` |
| err       | 失败时回调的错误     | object   | `{message: "错误消息"}`   |

