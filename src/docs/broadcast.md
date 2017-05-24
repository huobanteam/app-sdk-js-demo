## Broadcast
广播是基于事件机制, 实现 __同一应用__ 的多个页面间通讯的方式

:::demo
```html
<template>
  <p>
    <el-input v-if="isInOpen" ref="titleInput" autofocus v-model="title" placeholder="输入文字" style="display: inline-block;width: 200px;"></el-input>
    <el-button type="primary" @click="toggleAction">{{isInOpen ? '向其他页发送广播' : '在新窗口查看示例'}}</el-button>
    <el-button v-if="isInOpen" @click="client.closeWebPage()">关闭当前页</el-button>
  </p>
  <p v-if="!isInOpen && messages.length">
    收到的广播数据:
    <ol>
      <li v-for="m in messages">{{JSON.stringify(m)}}</li>
    </ol>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      title: '',
      messages: [],
      isInOpen: this.$route.query.in_open
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.broadcast('sample', {title: this.title, random: Math.random()})
        this.title = ''
      } else {
        this.client.openWebPage(location.origin + this.$route.path +'?in_open=1#broadcast')
      }
    },
    onBroadcast({action, data}) {
      if (action == 'sample') {
        this.messages.push(data)
      }
    }
  },
  mounted() {
    this.client = HuobanAppSDK.client()
    if (!this.isInOpen) {
      this.client.on('broadcast', this.onBroadcast)
    }
  }
}
</script>
```
:::

### 广播消息
`client.broadcast(action, data)`

| 参数      | 说明     | 类型      |   可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| action    | 广播的事件名称 | string    |   —         |    —    |
| data      | 广播的数据 | any  |   —   |    —    |

### 订阅一个广播
`client.on('broadcast', fn)`

| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| fn        | 回调函数, fn(data) | function  |   —   |    —    |

### 回调参数
| 属性      | 说明     | 类型      | 示例       |
|---------- |--------- |---------- |:------------:|
| data      | 广播接收到的数据, 包含`action`动作, `data`数据     | object    | `{action: "refresh", data: "hello"}`  |


<script>
export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      title: '',
      messages: [],
      isInOpen: this.$route.query.in_open
    }
  },
  methods: {
    toggleAction() {
      if (this.isInOpen) {
        this.client.broadcast('sample', {title: this.title, random: Math.random()})
        this.title = ''
        this.$refs.titleInput.$refs.input.focus()
      } else {
        this.client.openWebPage(location.origin + this.$route.path +'?in_open=1#broadcast')
      }
    },
    onBroadcast({action, data}) {
      if (action == 'sample') {
        this.messages.push(data)
      }
    }
  },
  watch: {
    client(val, oldVal) {
      if (!oldVal && val) {
        if (this.isInOpen) {
          val.setTitle('SDK: client.broadcast()')
        } else {
          val.on('broadcast', this.onBroadcast)
        }
      }
    }
  },
  mounted() {
    if (this.client) {
      this.client.on('broadcast', this.onBroadcast)
    }
  },
  destroyed() {
    if (this.client) {
      this.client.off('broadcast')
    }
  }
}
</script>