<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="demo-block-control" @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': true }]"></i>
      </transition>
      <transition name="text-slide">
        <span>{{ controlText }}</span>
      </transition>
    </div>
    <div class="meta">
      <div class="output" style="float: right; width: 40%">
        <template v-for="(code, label) in output">
          <div v-if="code" style="border-bottom: 1px solid #eaeefb;">
            <p style="cursor: default; margin: 0; background-color: #fff; color: #ccc; text-align: center; height: 30px; line-height: 30px;">{{label}}</p>
            <pre style="margin-top: 0; margin-bottom: 0; max-height: 450px;"><code class="hljs language-json">{{code}}</code></pre>
          </div>
        </template>
        <div v-if="$slots.description.length" class="description" style="width: 100%; float: none; border-left: 0 none;">
          <slot name="description"></slot>
        </div>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'demo-block',

    data() {
      return {
        hovering: false,
        isExpanded: false
      }
    },

    props: {
      output: {
        type: [Array, Object]
      }
    },

    methods: {
      autoHeight() {
        this.codeArea.style.height = this.isExpanded ? `${ Math.min(1500, this.codeAreaHeight + 1) }px` : '0'
        // this.codeArea.style.overflowY = val ? 'auto' : 'hidden'
      }
    },

    computed: {
      blockClass() {
        return `demo-${ this.$router.currentRoute.path.split('/').pop() }`
      },

      iconClass() {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
      },

      controlText() {
        return this.isExpanded ? '收起' : '展开'
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0]
      },

      codeAreaHeight() {
        if (this.$el.getElementsByClassName('output').length > 0) {
          return Math.max(this.$el.getElementsByClassName('output')[0].clientHeight, this.$el.getElementsByClassName('highlight')[0].clientHeight)
        }
        return this.$el.getElementsByClassName('highlight')[0].clientHeight
      }
    },

    watch: {
      isExpanded(val) {
        this.$nextTick(() => {
          this.autoHeight()
        })
      },
      output(val) {
        this.$nextTick(() => {
          this.autoHeight()
        })
      }
    },

    mounted() {
      this.$nextTick(() => {
        const highlight = this.$el.getElementsByClassName('highlight')[0]
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%'
          highlight.borderRight = 'none'
        }
      })
    }
  }
</script>

<style>
  .demo-block {
    border: solid 1px #eaeefb;
    border-radius: 4px;
    transition: .2s;
    margin-bottom: 16px;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    .demo-button {
      float: right;
    }
    .source {
      padding: 24px;
    }
    .meta {
      background-color: #f9fafc;
      border-top: solid 1px #eaeefb;
      clear: both;
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }
    .description {
      padding: 18px 24px;
      width: 40%;
      box-sizing: border-box;
      border-left: solid 1px #eaeefb;
      float: right;
      font-size: 14px;
      line-height: 1.8;
      color: #5e6d82;
      word-break: break-word;
      p {
        margin: 0 0 12px;
      }
      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        transform: translateY(-2px);
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
      }
    }
    .highlight {
      width: 60%;
      border-right: solid 1px #eaeefb;
      pre {
        margin: 0;
      }
      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        &::before {
          content: none;
        }
      }
    }
    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 36px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      transition: .2s;
      position: relative;
      i {
        font-size: 12px;
        line-height: 36px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }
      span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 36px;
        transition: .3s;
        display: inline-block;
      }
      &:hover {
        color: #20a0ff;
        background-color: #f9fafc;
      }
      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
    }
  }
</style>
