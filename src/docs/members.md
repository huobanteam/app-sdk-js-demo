## 获取工作区成员
`client.getSpaceMembers(options) : Promise` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientgetspacemembersopts--promise "API-getSpaceMembers")

:::demo {jsons} 获取工作区的成员列表数据
```html
<template>
  <el-select style="width: 60%"
    v-model="selected"
    multiple
    filterable
    remote
    placeholder="输入昵称/邮箱/电话筛选成员"
    :remote-method="remoteSearch"
    :loading="loading">
    <el-option
      v-for="m in members"
      :key="m.user_id"
      :label="m.name"
      :value="m.user_id">
      <span>
        <img width="18" height="18" :src="m.avatar" :alt="m.name" :title="m.name" style="position: relative; border-radius: 50%; top: 3px" />
      </span>
      <span>{{ m.name }}</span>
    </el-option>
  </el-select>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      loading: false,
      keyword: '',
      selected: [],
      members: []
    }
  },
  computed: {
    formatOptions() {
      return {
        keyword: this.keyword
      }
    }
  },
  methods: {
    remoteSearch(query = '') {
      this.keyword = query.trim()
      this.loading = true
      this.client.getSpaceMembers(this.formatOptions)
        .then(data => {
          this.loading = false
          this.members = data.members
        }).catch(err => {
          this.loading = false
          this.members = []
        })
    }
  },
  mounted() {
    this.client = HuobanAppSDK.client()
    this.remoteSearch('')
  }
}
</script>
```
:::

### 参数
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| options   | 组件配置 | object    |   —         |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|-------- |
| keyword   | 关键词(仅web端有效) | string      |  |  |

### 返回 Promise
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | resolve 时的数据    | object   | `{members: [{user_id: 11001, name: 'test1'}, ...]}` |
| err       | reject 时的错误     | object   | `{"message": "错误消息"}`   |


<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      jsons: {},
      loading: false,
      keyword: '',
      selected: [],
      members: []
    }
  },
  computed: {
    formatOptions() {
      return {
        keyword: this.keyword
      }
    }
  },
  methods: {
    remoteSearch(query = '') {
      this.keyword = query.trim()
      this.loading = true
      this.$set(this.jsons, '调用参数 options', this.formatOptions)
      this.client.getSpaceMembers(this.formatOptions)
        .then(data => {
          this.loading = false
          this.members = data.members
          this.$set(this.jsons, '获取的成员列表 members', data.members)
        }).catch(err => {
          this.loading = false
          this.members = []
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.remoteSearch('')
    })
  }
}
</script>
<style>
  .el-tag {
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    margin-left: 10px;
  }
  .el-select__input {
    margin: 4px 0 -3px 10px !important;
  }
</style>