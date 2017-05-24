
## 快速开始
<div style="margin-top: 16px;">
  <el-steps :active="step" direction="vertical" :space="140">
    <el-step>
      <span slot="title">获取client实例</span>
      <div slot="description">
        <p />
        <p>
          <code>const client = HuobanAppSDK.client()</code>
        </p>
        <el-button @click="getClient" v-if="step == 1">执行</el-button>
      </div>
    </el-step>
    <el-step v-show="step > 1">
      <span slot="title">client实例初始化</span>
      <div slot="description">
        <p />
        <p>
          <code>client.init(applicationId).then(initSuccess).catch(initFail)</code>
          <p>
            <code>applicationId</code> 是伙伴开放平台统一申请派发的应用ID
          </p>
        </p>
        <el-button @click="initClient" v-if="step == 2">执行</el-button>
      </div>
    </el-step>
    <el-step v-show="step > 2">
      <span slot="title">{{envError ? '出错了 :(' : '准备就绪~'}}</span>
      <div slot="description">
        <p />
        <p v-if="!envError">
          使用 <code>client</code> 实例, 可以愉快的调用客户端方法了, <router-link to="/component/init">去试试</router-link>.
        </p>
        <p v-if="envError">
          <el-alert
            :title="envError.message"
            type="error"
            :closable="false"
            show-icon>
          </el-alert>
        </p>
      </div>
    </el-step>
  </el-steps>
</div>

<script>
import * as HuobanAppSDK from 'huoban-app-sdk'

export default {
  props: {
    applicationId: Number
  },
  data() {
    return {
      step: 1,
      envError: null
    }
  },
  methods: {
    getClient() {
      this.client = HuobanAppSDK.client()
      this.step ++
    },
    initClient() {
      this.client.init(this.applicationId)
        .then(data => {
          this.step ++
        })
        .catch(err => {
          this.step ++
          this.envError = err
        })
    }
  }
};
</script>