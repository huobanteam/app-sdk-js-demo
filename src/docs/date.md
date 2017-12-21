## 日期选取
`client.openDatePicker(options, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientopendatepickeropts-fn "API-openDatePicker")

:::demo {jsons} 使用 `client.openDatePicker` 可以方便得选取日期
```html
<template>
  <p>
    <el-checkbox v-model="showToday">“今天”按钮</el-checkbox>
    <el-checkbox v-model="showClear">“清除”按钮</el-checkbox>
    <el-select v-model="type" placeholder="类型" :style="{display: 'inline-block', width: '130px'}">
      <el-option
        v-for="(label, key) in types"
        :label="label"
        :value="key">
      </el-option>
    </el-select>
    <el-select v-model="placement" placeholder="浮层位置" :style="{display: 'inline-block', width: '120px'}">
      <el-option
        v-for="(label, key) in placements"
        :label="label"
        :value="key">
      </el-option>
    </el-select>
    <el-input style="display: inline-block; width: 180px;"
      placeholder="选择日期"
      icon="time"
      v-model="datetime"
      @focus="openDatePicker"
      @click="openDatePicker">
    </el-input>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      datetime: '',
      showClear: false,
      showToday: false,
      type: 'date',
      types: {
        date: '仅日期',
        time: '仅时间',
        datetime: '日期+时间'
      },
      placement: '',
      placements: {
        'top-left': '上侧左对齐',
        'top-right': '上侧右对齐',
        'bottom-left': '下侧左对齐',
        'bottom-right': '下侧右对齐',
        'left-top': '左侧上对齐',
        'left-bottom': '左侧下对齐',
        'right-top': '右侧上对齐',
        'right-bottom': '右侧下对齐',
      }
    }
  },
  computed: {
    defaultDatetime() {
      if (this.datetime.match(/^\d{2}:\d{2}:\d{2}$/)) {
        let td = new Date()
        return `${td.getFullYear()}-${td.getMonth() + 1}-${td.getDate()} ${this.datetime}`
      }

      return this.datetime
    },
    formatOptions() {
      return {
        type: this.type,
        value: this.defaultDatetime,
        showClear: this.showClear,
        showToday: this.showToday,
        placement: this.placement
      }
    }
  },
  methods: {
    openDatePicker(e) {
      this.client.openDatePicker(this.formatOptions, (data, err) => {
        if (data) {
          this.datetime = data[this.formatOptions.type]
        }
      }, e)
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
| options   | 组件配置 | object    |   —         |    —    |
| fn        | 回调函数, 接收2个参数 (data, err), 参见 <router-link to="/component/define#hui-diao">回调</router-link> | function  |   —   |    —    |

### options
| 属性      | 说明     | 类型      | 可选值       | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| value     | 默认值   | string    |   |   |
| type      | 类型     | string    | date, time, datetime  |  false  |
| showClear | 是否展示清除按钮用于清空已选日期  | boolean       |  —  | false   |
| showToday | 是否展示今天按钮用于选择当天日期 | boolean      |  —  | false |
| placement | 选择器相对于触发元素的位置(仅web端有效) | string      | top-left,top-right,bottom-left,bottom-right | bottom-right |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{datetime: '2016-07-28 12:33', date: '2016-07-28', time: '12:33'}` |
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
      jsons: {},
      datetime: '',
      showClear: false,
      showToday: false,
      type: 'date',
      types: {
        date: '仅日期',
        time: '仅时间',
        datetime: '日期+时间'
      },
      placement: '',
      placements: {
        'top-left': '上侧左对齐',
        'top-right': '上侧右对齐',
        'bottom-left': '下侧左对齐',
        'bottom-right': '下侧右对齐',
        'left-top': '左侧上对齐',
        'left-bottom': '左侧下对齐',
        'right-top': '右侧上对齐',
        'right-bottom': '右侧下对齐',
      }
    }
  },
  computed: {
    defaultDatetime() {
      if (this.datetime.match(/^\d{2}:\d{2}:\d{2}$/)) {
        let td = new Date()
        return `${td.getFullYear()}-${td.getMonth() + 1}-${td.getDate()} ${this.datetime}`
      }

      return this.datetime
    },
    formatOptions() {
      return {
        type: this.type,
        value: this.defaultDatetime,
        showClear: this.showClear,
        showToday: this.showToday,
        placement: this.placement || 'bottom-right'
      }
    }
  },
  watch: {
    showClear(val, oldVal) {
      if (val) {
        this.showToday = true
      }
    },
    showToday(val, oldVal) {
      if (!val) {
        this.showClear = false
      }
    }
  },
  methods: {
    openDatePicker(e) {
      this.$set(this.jsons, '调用参数 options', this.formatOptions)
      this.client.openDatePicker(this.formatOptions, (data, err) => {
        if (data) {
          this.datetime = data[this.formatOptions.type]
          this.$set(this.jsons, '获得数据', data)
        }
      }, e)
    }
  }
}
</script>