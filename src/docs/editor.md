## 打开富文本编辑器
`client.openRichEditor(options, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenricheditoropts-fn "API-openRichEditor") _(native only)_


### 参数
| 参数        | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| options   | 组件配置 | object    |   —         |    —    |
| fn        | 回调函数, 接收2个参数 (data, err), 参见 <router-link to="/component/define#hui-diao">回调</router-link> | function  |   —   |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| value     | 默认值   | string    |   |   |
| title     | 编辑器的标题     | string    |   |    |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{value: '<p>hey!</p>'}` |
| err       | 失败时回调的错误     | object   | `{message: "错误消息"}`   |
