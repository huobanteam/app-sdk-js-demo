## 设置标题
`client.setTitle(title)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientsettitletitle "API-setTitle")

:::demo
```html
<template>
  <p>
    <el-input v-if="isInOpen" autofocus v-model="title" placeholder="输入标题" style="display: inline-block;width: 200px;"></el-input>
    <el-button type="primary" @click="toggleAction">{{isInOpen ? '设置标题' : '在新窗口查看示例'}}</el-button>
    <el-button v-if="isInOpen" @click="client.closeWebPage()">关闭当前页</el-button>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      isInOpen: this.$route.query.in_open,
      title: ''
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.setTitle(this.title)
      } else {
        this.client.openWebPage(location.origin + this.$route.path + '?in_open=1#she-zhi-biao-ti')
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

### 参数
| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| title   | 标题 | string    |   —         |    —    |


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
      isInOpen: this.$route.query.in_open,
      title: ''
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.setTitle(this.title)
      } else {
        this.client.openWebPage(location.origin + this.$route.path + '?in_open=1#she-zhi-biao-ti')
      }
    }
  },
  watch: {
    client(val, oldVal) {
      if (val && !oldVal) {
        val.setTitle('(标题显示在这里)')
      }
    }
  }
}
</script>