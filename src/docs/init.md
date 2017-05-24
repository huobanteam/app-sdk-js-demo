## 初始化
`client.init(applicationId) : Promise` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientinitapplicationid--promise "API-init")

__核心方法__, 应用初始化成功后, 可以拿到伙伴当前的用户、表格以及授权凭证(用于请求api.huoban.com接口).

:::demo `client.init(applicationId)` 是使用客户端方法前需要执行的第一个方法.
```html
<template>
  <p v-if="!envData">
    <el-button type="primary" :loading="isLoading" @click="initClient">执行初始化</el-button>
  </p>
  <div v-if="envData" style="margin: 10px 0;">
    <el-table
      :show-header="false"
      :data="tableData"
      style="width: 90%">
      <el-table-column
        prop="name"
        label="数据项"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
  <p v-if="envError">
    <el-alert
      :title="envError.message"
      type="error"
      :closable="false"
      show-icon>
    </el-alert>
  </p>
</template>
<script>
  import * as HuobanAppSDK from 'huoban-app-sdk'

  // 应用ID, 由伙伴开放平台申请后派发
  const applicationId = 1100001

  export default {
    data() {
      return {
        isLoading: false,
        envData: null,
        envError: null
      }
    },
    computed: {
      hostType() {
        switch(true) {
          case HuobanAppSDK.isPC:
            return 'web'
          case HuobanAppSDK.isWap:
            return 'wap'
          case HuobanAppSDK.isClient:
            return 'app'
          default:
            return 'unknown'
        }
      },
      tableData() {
        if (this.envData) {
          return [{
            name: '用户',
            value: this.envData.user.name
          }, {
            name: '表格',
            value: this.envData.table.name
          }, {
            name: '凭证',
            value: this.envData.ticket
          }, {
            name: '宿主',
            value: this.hostType + ', v' + this.envData.version
          }
          ]
        }

        return []
      }
    },
    methods: {
      initClient() {
        this.client.init(applicationId)
          .then(data => {
            this.envData = data
          })
          .catch(err => {
            this.envError = err
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
| 参数        | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| applicationId   | 应用ID, 由伙伴开放平台申请后派发 | Number    |   —         |    —    |

### 返回 Promise
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | resolve 时的数据    | object   | `{user: 伙伴用户, table: 当前表格, ticket: 授权凭证}` |
| err       | reject 时的错误     | object   | `{"message": "错误消息"}`   |

<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  props: {
    applicationId: Number,
    client: Object
  },
  data() {
    return {
      jsons: {},
      isLoading: false,
      envData: null,
      envError: null
    }
  },
  computed: {
    hostType() {
      switch(true) {
        case HuobanAppSDK.isPC:
          return 'web'
        case HuobanAppSDK.isWap:
          return 'wap'
        case HuobanAppSDK.isClient:
          return 'app'
        default:
          return 'unknown'
      }
    },
    tableData() {
      if (this.envData) {
        return [{
          name: '用户 (user)',
          value: this.envData.user.name
        }, {
          name: '表格 (table)',
          value: this.envData.table.name
        }, {
          name: '凭证 (ticket)',
          value: this.envData.ticket.split('').sort((a,b)=>Math.random()>0.5?1:-1).join('')
        }, {
          name: '宿主 (version)',
          value: this.hostType + ', v' + this.envData.version
        }
        ]
      }

      return []
    }
  },
  methods: {
    initClient() {
      this.isLoading = true
      setTimeout(() => {
        this.client.init(this.applicationId)
          .then(data => {
            this.envData = data
            this.$set(this.jsons, '授权凭证 ticket', data.ticket)
            this.$set(this.jsons, '当前伙伴用户 user', data.user)
            this.$set(this.jsons, '当前表格 table', data.table)
          })
          .catch(err => {
            this.isLoading = false
            this.envError = err
          })
      }, 400)
    }
  }
}
</script>