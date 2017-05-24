<template>
  <div class="side-nav">
    <ul>
      <li class="nav-item">
        <a>使用指南</a>
        <ul class="pure-menu-list sub-nav">
          <li class="nav-item">
            <router-link to="/component/install">安装</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/component/quickstart">快速开始</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item" v-show="false">
        <router-link to="/component/changelog">更新日志</router-link>
      </li>
      <li class="nav-item">
        <a>客户端方法</a>
        <div class="nav-group">
          <div class="nav-group__title">基本</div>
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/init">Init 初始化</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-group">
          <div class="nav-group__title">用户</div>
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/user" exact>Picker 选人</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/user#cha-kan-yong-hu-ka-pian" exact>Profile 卡片</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/members" exact>Members 成员列表</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-group">
          <div class="nav-group__title">数据</div>
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/filters">Filter 筛选器</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/item" exact>Detail 详情</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/item#cha-kan-dan-tiao-shu-ju-bian-geng" exact>Diff 变更</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/item#cha-kan-fu-jian" exact>Attach 附件</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/item#cha-kan-shu-ju-lie-biao" exact>List 列表</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-group">
          <div class="nav-group__title">其他</div>
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/date">DatePicker 选日期</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/editor">Editor 富文本编辑</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/share">OpenShare 分享</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/page">OpenPage 打开页面</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/location">Location 定位</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/qrcode">QRCode 扫码</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/others#she-zhi-biao-ti">SetTitle 设置标题</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-group">
          <div class="nav-group__title">底层</div>
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/event">Event 事件机制</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/broadcast">Broadcast 广播</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <router-link to="/component/constant">其他</router-link>
        <div class="nav-group">
          <ul class="pure-menu-list">
            <li class="nav-item">
              <router-link to="/component/constant#huan-jing-chang-liang" exact>环境常量</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/constant#staticmethod" exact>静态方法</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/component/define#hui-diao" exact>回调方法</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'side',
  props: {
    data: Array
  },
  components: {
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  },
  watch: {
    '$route.path': function routeChange() {
      // console.log('$route.path changed', this.$route)
    }
  }
}
</script>
<style>
  .side-nav {
    width: 100%;
    box-sizing: border-box;
    padding-right: 30px;

    li {
      list-style: none;
    }
    ul {
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

    .nav-item {
      a {
        font-size: 16px;
        color: #5e6d82;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        display: block;
        position: relative;
        transition: all .3s;

        &.active {
          color: #20a0ff;
        }
      }
      .nav-item {
        a {
          display: block;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          padding-left: 24px;


          &:hover {
            color: #20a0ff;
          }
        }
      }
    }
    .nav-group__title {
      font-size: 12px;
      color: #99a9bf;
      padding-left: 8px;
      line-height: 26px;
      margin-top: 10px;
    }
  }
</style>