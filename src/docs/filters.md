## 筛选器
`client.openFilter(filters, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenfiltertable-filters-fn "API-openFilter")

:::demo {jsons} 筛选组件一般用于获取筛选条件, 然后请求接口筛选数据列表. 在web端使用 `client.push('closeFilter')` 关闭筛选器
```html
<template>
  <el-button @click="toggleFilter">{{buttonText}}</el-button>
</template>
<script>
  import * as HuobanAppSDK from 'huoban-app-sdk'
  export default {
    data() {
      return {
        filters: null,
        opened: false
      }
    },
    methods: {
      toggleFilter() {
        this[this.opened ? 'closeFilter' : 'openFilter']()
      },
      openFilter() {
        this.opened = true
        this.client.openFilter(this.filters, (data, err) => {
          if (data) {
            this.filters = data.filters
          }
        })
      },
      closeFilter() {
        this.client.push('closeFilter')
        this.opened = false
      }
    },
    computed: {
      buttonText() {
        return this.opened ? '关闭筛选器' : '打开筛选器'
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
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|-------- |
| filters   | 默认条件 | object    |   —         |    —     |
| fn        | 回调函数 | function  | 参见 <router-link to="/component/define#hui-diao">回调</router-link> |     —    |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{filters: {and: [...]}}` |
| err       | 失败时回调的错误     | object   | `{message: "错误消息"}`   |

<script>
export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      jsons: {
        command: ''
      },
      filters: null,
      opened: false
    }
  },
  computed: {
    buttonText() {
      return this.opened ? '关闭筛选器' : '打开筛选器'
    }
  },
  methods: {
    toggleFilter() {
      this[this.opened ? 'closeFilter' : 'openFilter']()
    },
    openFilter() {
      this.opened = true
      // this.$set(this.jsons, 'command', `client.openFilter(${JSON.stringify(this.filters, null, 2)}, callback)`)
      this.client.openFilter(this.envData.table, this.filters, (data, err) => {
        if (data) {
          this.filters = data.filters
          this.$set(this.jsons, '获取到的筛选条件 filters', this.filters)
        } else {
          this.filters = err
        }
      })
    },
    closeFilter() {
      // this.$set(this.jsons, 'command', null)
      this.client.push('closeFilter')
      this.opened = false
    }
  },
  beforeDestroy(a, b, c) {
    this.closeFilter()
  }
}
</script>