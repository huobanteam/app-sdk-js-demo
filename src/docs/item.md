
:::demo item相关的查看、对比变更、跳转列表
```html
<template>
  <el-button type="primary" @click="openItemDetail">查看单条数据详情</el-button>
  <el-button type="info" @click="openItemDiff">查看单条数据变更</el-button>
  <el-button @click="openItemList">查看数据列表</el-button>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'
import reqwest from 'reqwest'

export default {
  data() {
    return {
      itemId: 3826056,
      diff: {
        from_revision_id: 6383243,
        to_revision_id: 6383246,
        field_id: 64778
      }
    }
  },
  methods: {
    openItemList() {
      this.client.openItemList()
    },
    openItemDetail() {
      this.client.openItemDetail(this.itemId)
    },
    openItemDiff() {
      this.client.openItemDiff(this.itemId, this.diff)
    }
  }
}
</script>
```
:::

## 查看单条数据详情
`client.openItemDetail(itemId)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenitemdetailitemid "API-openItemDetail")

### 参数
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| itemId    | 数据ID   | Number    |   —         |    —    |


## 查看单条数据变更
`client.openItemDiff(itemId, options)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenitemdiffitemid-fromrevid-torevid-opts-- "API-openItemDiff")

### 参数
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| itemId    | 数据ID   | Number    |   —         |    —    |
| options   | 组件配置 | object    |   —         |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|-------- |


## 查看附件
`client.openAttachment(fileInfo)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenattachmentfileinfo "API-openAttachment")

### 参数
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| fileInfo  | 附件对象 | Object    |   —         |    —    |


## 查看数据列表
`client.openItemList()`

<script>
import * as HuobanAppSDK from 'huoban-app-sdk'
import reqwest from 'reqwest'

export default {
  props: {
    applicationId: Number,
    envData: Object,
    client: Object
  },
  data() {
    return {
      jsons: {},
      items: [],
      diffStream: null
    }
  },
  watch: {
    envData: function(val, oldVal) {
      if (val && !oldVal) {
        this.findItems()
      }
    }
  },
  methods: {
    openItemList() {
      this.client.openItemList()
    },
    openItemDetail() {
      if (!this.items.length) {
        this.$message({
          message: '当前表格暂无数据',
          type: 'error'
        })
        return
      }

      this.client.openItemDetail(this.items[0].item_id)
    },
    openItemDiff() {
      if (!this.diffStream) {
        this.$message({
          message: '暂无diff数据可查看',
          type: 'error'
        })
        return
      }
      let diffStreamData = this.diffStream.data[0]
      let diffField = diffStreamData.item_diff.find(df => df.field_config_type == 'rich')
      let opts = {
        from_revision_id: diffField.old_revision_id,
        to_revision_id: diffField.revision_id,
        field_id: diffField.field_id,
        field_name: diffField.field_name,
        created_by: this.diffStream.created_by,
        updated_on: diffStreamData.created_on
      }
      this.$set(this.jsons, 'openItemDiff options', opts)
      this.client.openItemDiff(diffStreamData.item_id, diffField.old_revision_id, diffField.revision_id, opts)
    },
    findItems() {
      let _this = this
      reqwest({
        url: 'https:/api.huoban.com/v2/item/table/' + this.envData.table.table_id+ '/find'
      , method: 'post'
      , data: { order_by: [{field: 'updated_on', sort: 'desc'}], offset: 0, limit: 5 }
      , type: 'json'
      , crossOrigin: true
      , withCredentials: true
      , headers: {
          'X-Huoban-Ticket': this.envData.ticket
        }
      , error: function (err) {
          console.log(err.response)
        }
      , success: function (resp) {
          _this.items = resp.items
          _this.findDiffItem(resp.items)
        }
      })
    },
    findDiffItem(items) {
      let _this = this
      let item
      items.forEach(it => {
        if (it.created_on != it.updated_on) {
          item = it
          return false
        }
      })
      if (item) {
        reqwest({
          url: `https:/api.huoban.com/v2/streams/item/${item.item_id}?limit=10`
        , type: 'json'
        , crossOrigin: true
        , withCredentials: true
        , headers: {
            'X-Huoban-Ticket': this.envData.ticket
          }
        , error: function (err) {
            console.log(err.response)
          }
        , success: function (resp) {
            _this.findDiffStream(resp)
          }
        })
      }
    },
    findDiffStream(streams) {
      this.diffStream = streams.find(st => {
        if (st.object_action == 'item_updated' && st.data[0].from_revision_id && st.data[0].to_revision_id && st.content.join('|').indexOf('内容有修改') > 0) {
          return true
        }
      })
    }
  },
  mounted() {
    if (this.envData) {
      this.findItems()
    }
  }
}
</script>