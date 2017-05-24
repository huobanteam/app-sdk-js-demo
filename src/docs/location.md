## 定位
`client.getLocation(options, fn)` [<i class="el-icon-document"></i>](https://github.com/huobanteam/app-sdk-js/blob/master/README_CN.md#clientgetlocationopts---fn "API-getLocation")

:::demo {jsons} 使用 `client.getLocation` 可以借助高德地图获取定位POI信息, 注: 定位时需要用户接受浏览器定位授权
```html
<template>
  <p>
    <el-checkbox v-model="enableHighAccuracy">高精度</el-checkbox>
    <el-checkbox v-model="convert">转化坐标为gcj02格式</el-checkbox>
    <el-select v-model="timeout" placeholder="超时(秒)" :style="{display: 'inline-block', width: '110px'}">
      <el-option
        v-for="(label, key) in timeouts"
        :label="label"
        :value="key">
      </el-option>
    </el-select>
  </p>
  <p>
    <el-input
      ref="locationInput"
      readonly
      placeholder="点击选择位置"
      icon="view"
      v-model="posInfo"
      @focus="openLocation"
      @click="openLocationByClickIcon">
    </el-input>
  </p>
</template>
<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  data() {
    return {
      posInfo: '',
      convert: true,
      enableHighAccuracy: true,
      timeout: '',
      timeouts: {
        '0': '不限制',
        '10': '10秒'
      }
    }
  },
  computed: {
    formatOptions() {
      return {
        timeout: this.timeout * 1000,
        title: '请选择位置',
        enableHighAccuracy: this.enableHighAccuracy,
        convert: this.convert
      }
    }
  },
  methods: {
    openLocation(e) {
      this.client.getLocation(this.formatOptions, (data, err) => {
        if (data) {
          this.posInfo = data.location.name + ' ' + data.location.address
        }
      }, e)
    },
    openLocationByClickIcon(e) {
      this.openLocation({target: this.$refs.locationInput.$el})
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
| options   | 组件配置 | object    |   —         |    —    |
| fn        | 回调函数, 接收2个参数 (data, err), 参见 <router-link to="/component/define#hui-diao">回调</router-link> | function  |   —   |    —    |

### options
| 属性      | 说明     | 类型      |  默认值   |
|---------- |--------- |---------- | ----------|
| enableHighAccuracy     | 是否高精度 (GPS)     | boolean    |  true |
| timeout     | 超时时间 (单位: 毫秒)     | number    | 10000 |
| convert     | 是否转化坐标 (wgs84 to gcj02)     | boolean    |  true |
| title     | 组件标题     | string    | |

### fn
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{location: {name: 'xx', address: 'xx', distance: 10, lng: 116.32, lat: 40.033}}` |
| err       | 失败时回调的错误     | object   | `{message: "错误消息"}`   |


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
      posInfo: '',
      convert: true,
      enableHighAccuracy: true,
      timeout: '',
      timeouts: {
        '0': '不限制',
        '10': '10秒'
      }
    }
  },
  computed: {
    formatOptions() {
      return {
        timeout: this.timeout * 1000,
        title: '请选择位置',
        enableHighAccuracy: this.enableHighAccuracy,
        convert: this.convert
      }
    }
  },
  methods: {
    openLocation(e) {
      this.$set(this.jsons, '调用参数 options', this.formatOptions)
      this.client.getLocation(this.formatOptions, (data, err) => {
        if (data) {
          this.posInfo = data.location.name + ' ' + data.location.address
          this.$set(this.jsons, '获得位置数据', data.location)
        }
      }, e)
    },
    openLocationByClickIcon(e) {
      this.openLocation({target: this.$refs.locationInput.$el})
    }
  }
}
</script>