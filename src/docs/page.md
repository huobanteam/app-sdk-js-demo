## openWebPage
`client.openWebPage(url)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenwebpageurl-title "API-openWebPage")

### 参数
| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| url    | 页面地址 | string    |   —         |    —    |


## closeWebPage
`client.closeWebPage()` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientclosewebpage "API-closeWebPage")

在由 `openWebPage` 打开的页面中可以使用此方法关闭该页

:::demo {jsons} 在由 `openWebPage` 打开的页面中可以 `closeWebPage` 关闭该页
```html
<template>
  <p>
    <el-button type="primary" @click="toggleAction">{{isInOpen ? '关闭当前' : '打开新'}}窗口</el-button>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      isInOpen: this.$route.query.in_open
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.closeWebPage()
      } else {
        this.client.openWebPage(location.origin + this.$route.path + '?in_open=1#closewebpage')
      }
    }
  },
  mounted() {
    this.client = HuobanAppSDK.client()
  }
}
</script>
```
:::

<script>
export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      isInOpen: this.$route.query.in_open
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.closeWebPage()
      } else {
        this.client.openWebPage(location.origin + this.$route.path + '?in_open=1#closewebpage')
      }
    }
  },
  watch: {
    client(val, oldVal) {
      if (!oldVal && val && this.isInOpen) {
        val.setTitle('SDK: client.closeWebPage()')
      }
    }
  }
}
</script>