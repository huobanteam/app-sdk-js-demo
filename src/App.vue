<template>
  <div id="app">
    <div class="main-cnt">
      <div class="page-container page-component">
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <side-nav></side-nav>
          </el-col>
          <el-col :span="18">
            <router-view class="content markdown-body"></router-view>
            <footer-nav></footer-nav>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from './views/side'
// import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'

export default {
  name: 'app',
  components: {
    SideNav,
    FooterNav
  },
  data() {
    return {
      navs: []
    }
  }
};
</script>

<style>
  @import 'assets/styles/github-markdown.css';
  @import 'highlight.js/styles/github.css';
  @import 'assets/styles/common.css';
  @import 'assets/styles/fonts/style.css';

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    height: 100%;
  }

  body {
    font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif !important;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #4078c0;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  /*.hljs {
    line-height: 1.8;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    font-size: 12px;
    padding: 18px 24px;
    background-color: #f9fafc;
    border: solid 1px #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
  }*/

  .main-cnt {
    margin-top: -80px;
    padding: 80px 0 120px;
    box-sizing: border-box;
    min-height: 100%;
  }

  .container,
  .page-container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto;
  }

  .page-container {
    padding-top: 55px;

    h2 {
      font-size: 28px;
      color: #1f2d3d;
      margin: 0;
    }
    h3 {
      font-size: 22px;
    }
    h2, h3, h4, h5 {
      font-weight: normal;
      color: #1f2f3d;

      &:hover a {
        opacity: .4;
      }

      a {
        float: left;
        margin-left: -20px;
        opacity: 0;
        cursor: pointer;

        &:hover {
          opacity: .4;
        }
      }
    }
    p {
      font-size: 14px;
      color: #5e6d82;
      margin-top: 10px;
    }
  }
  .demo {
    margin: 20px 0;
  }
  @media (max-width: 1140px) {
    .container,
    .page-container {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .container,
    .page-container {
      padding: 0 20px;
    }
  }

  .page-component {
    padding-bottom: 95px;
    box-sizing: border-box;
  }
  .page-component {
    .content {
      margin-left: -1px;

      > {
        h3 {
          /*margin: 45px 0 15px;*/
        }
        table {
          border-collapse: collapse;
          width: 100%;
          background-color: #fff;
          color: #5e6d82;
          font-size: 14px;
          margin-bottom: 45px;

          strong {
            font-weight: normal;
          }
          th {
            text-align: left;
            border-top: 1px solid #eaeefb;
            background-color: #EFF2F7;
          }
          td, th {
            border-bottom: 1px solid #eaeefb;
            padding: 10px;
          }
          th:first-child, td:first-child {
            padding-left: 10px;
          }
        }
      }
    }
  }
</style>
