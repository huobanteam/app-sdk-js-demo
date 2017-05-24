## 扫码
`client.scanQRCode(options) : Promise` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientscanqrcodeopts--promise "API-scanQRCode") _(native only)_

:::demo {jsons} 使用 `client.scanQRCode` 可以在伙伴客户端内使用原生扫描二维码功能
```html
<template>
  <p>
    <el-checkbox v-model="needResult">将扫描结果返回</el-checkbox>
    <el-button type="primary" @click="scanQRCode">开始扫码</el-button>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      needResult: true
    }
  },
  computed: {
    formatOptions() {
      return {
        needResult: this.needResult
      }
    }
  },
  methods: {
    scanQRCode(e) {
      this.client.scanQRCode(this.formatOptions)
        .then(data => {
          this.$message.success(`扫描成功: ${data.result}`)
        }).catch(err => {
          this.$message.error(err.message)
        })
    }
  },
  mounted() {
    this.client = HuobanAppSDK.client()
  }
}
</script>
```
:::

### 参数
| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| options   | 组件配置 | object    |   —         |    —    |

### options
| 属性      | 说明     | 类型      |  默认值   |
|---------- |--------- |---------- | ----------|
| needResult     | 是否返回扫描结果     | boolean    |  false |

### 返回 Promise
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | resolve 时的数据    | object   | `{result: "hello world"}` |
| err       | reject 时的错误     | object   | `{"message": "错误消息"}`   |


<script>
export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      jsons: {},
      needResult: true
    }
  },
  computed: {
    formatOptions() {
      return {
        needResult: this.needResult
      }
    }
  },
  methods: {
    scanQRCode(e) {
      this.$set(this.jsons, '调用参数 options', this.formatOptions)
      this.client.scanQRCode(this.formatOptions)
        .then(data => {
          this.$message.success(`扫描成功: ${data.result}`)
          this.$set(this.jsons, '获得扫描结果', data.result)
        }).catch(err => {
          this.$message.error(err.message)
          this.$set(this.jsons, '扫描失败', err)
        })
    }
  }
}
</script>