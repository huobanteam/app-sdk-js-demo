## 选人+卡片展示

:::demo {jsons} `client.openUserPicker` 用于选取工作区的成员, 通常配合 `client.openUserProfile` 展示用户卡片
```html
<template>
  <p>
    <el-checkbox v-model="multi">多选</el-checkbox>
    <el-checkbox v-model="required">必选</el-checkbox>
    <el-select v-model="placement" placeholder="浮层位置" :style="{display: 'inline-block', width: '110px'}">
      <el-option
        v-for="(label, key) in placements"
        :label="label"
        :value="key">
      </el-option>
    </el-select>
    <el-button type="primary" @click="openUserPicker">选择用户</el-button>
  </p>
  <p v-if="users">已选择 {{users.length}} 位:
    <el-tag
      v-for="(user, index) in users"
      type="primary"
      :key="user.user_id"
      :closable="true"
      @click.native="openUserProfile(user, index, $event)"
      @close="handleRemove(user, $event)"
    >
    <img width="18" height="18" :src="user.avatar" style="position: relative; border-radius: 50%; top: 3px" />
    {{user.name}}
    </el-tag>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      users: null,
      multi: true,
      required: false,
      placement: 'left-bottom',
      placements: {
        'right-bottom': '右下',
        'right-top': '右上',
        'left-top': '左上',
        'left-bottom': '左下'
      }
    }
  },
  computed: {
    formatOptions() {
      return {
        values: this.users ? this.users.map(u => u.user_id) : [],
        multi: this.multi,
        placement: this.placement,
        required: this.required
      }
    }
  },
  methods: {
    openUserPicker(e) {
      this.client.openUserPicker(this.formatOptions, (data, err) => {
        if (data) {
          this.users = data.users
        }
      }, e)
    },
    openUserProfile(user, index, e) {
      this.client.openUserProfile(user.user_id, {placement: (index > 2 ? 'right-bottom' : 'left-bottom')}, e)
    },
    handleRemove(user, e) {
      e.stopPropagation()
      this.users.splice(this.users.indexOf(user), 1)
    }
  },
  mounted() {
    this.client = HuobanAppSDK.client()
  }
}
</script>
```
:::

## 用户选取
`client.openUserPicker(options, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenuserpickeropts-fn "API-openUserPicker")

### 参数
| 参数        | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| options   | 组件配置 | object    |   —         |    —    |
| fn        | 回调函数, 接收2个参数 (data, err), 参见 <router-link to="/component/define#hui-diao">回调</router-link> | function  |   —   |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| multi     | 多选     | boolean   | true, false  |  false   |
| required  | 必填     | boolean   | true, false  |  false  |
| values    | 默认选中用户的id数组  | array       |  —  | []   |
| title     | 浮层标题(仅web端有效) | string      |  —  | 选择用户 |
| width     | 浮层宽度(仅web端有效) | Number      |  —  | 300 |
| placement | 浮层位置(仅web端有效) | string      | left-top,left-bottom,right-top,right-bottom | right-bottom |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{users: [{user_id: 11001, name: 'test1'}, {user_id: 11003, name: 'test2'}, ...]}` |
| err       | 失败时回调的错误     | object   | `{"message": "错误消息"}`   |

***

## 查看用户卡片
`client.openUserProfile(userId, options, event)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopenuserprofileuserid-opts "API-openUserProfile")

### 参数
| 参数      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| userId    | 用户id   | Number    |   —         |    —    |
| options   | 组件配置 | object    |   —         |    —    |
| event     | DOM事件, 用于定位  | DOMEvent  |   —         |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|-------- |
| placement | 浮层位置(仅web端有效) | string      | left-top,left-bottom,right-top,right-bottom,bottom,top | bottom |


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
      users: null,
      multi: true,
      required: false,
      placement: '',
      placements: {
        'right-bottom': '右下',
        'right-top': '右上',
        'left-top': '左上',
        'left-bottom': '左下'
      }
    }
  },
  computed: {
    formatOptions() {
      return {
        values: this.users ? this.users.map(u => u.user_id) : [],
        multi: this.multi,
        placement: this.placement || 'left-bottom',
        required: this.required
      }
    }
  },
  methods: {
    openUserPicker(e) {
      this.$set(this.jsons, '调用参数 options', this.formatOptions)
      this.client.openUserPicker(this.formatOptions, (data, err) => {
        if (data) {
          this.users = data.users
          this.$set(this.jsons, '获取的用户数据 users', data.users)
        }
      }, e)
    },
    openUserProfile(user, index, e) {
      this.client.openUserProfile(user.user_id, {placement: (index > 2 ? 'right-bottom' : 'left-bottom')}, e)
    },
    handleRemove(user, e) {
      e.stopPropagation()
      this.users.splice(this.users.indexOf(user), 1)
    }
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