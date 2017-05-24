## Event
client 内部实现了一个简单的事件机制, 可以用来订阅/发布消息

### 订阅一个事件/动作
`client.on(action, fn) : Object`

| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| action   | 事件名称 | string    |   —         |    —    |
| fn        | 回调函数 | function  |   —   |    —    |

### 返回的 Object 对象属性
| 属性      | 说明     | 类型      | 可选值       |
|---------- |--------- |---------- |:------------:|
| on     | on方法的引用, 便于链式调用     | function    |   |
| revoke     | 一个方法, 用于取消该次订阅     | function    |   |


### 取消订阅
`client.off(action, fn)`

| 参数        | 说明     | 类型      | 可选值     | 默认值   |
|---------- |--------- |---------- |:------------:|--------- |
| action   | 事件名称 | string    |   —         |    —    |
| fn        | 指定取消的回调函数, 如果省略则取消`action`下的所有回调 | function  |   —   |    —    |


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
      datetime: null,
      showClear: false,
      showToday: false,
      type: '',
      types: {
        datetime: '日期+时间',
        date: '仅日期',
        time: '仅时间'
      },
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
        type: this.type,
        value: this.datetime,
        showClear: this.showClear,
        showToday: this.showToday,
        placement: this.placement || 'right-bottom'
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