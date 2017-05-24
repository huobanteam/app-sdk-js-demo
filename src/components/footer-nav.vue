<template>
  <div class="footer-nav">
    <span
      v-if="leftNav"
      class="footer-nav-link footer-nav-left"
      @click="handleNavClick('prev')">
      <i class="el-icon-arrow-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span
      v-if="rightNav"
      class="footer-nav-link footer-nav-right"
      @click="handleNavClick('next')">
      {{ rightNav.title || rightNav.name }}
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>

<script>
  import navConfig from '../nav.config.json'

  export default {
    data() {
      return {
        currentComponent: null,
        nav: [],
        currentIndex: -1,
        leftNav: null,
        rightNav: null
      }
    },

    watch: {
      '$route'() {
        this.updateNav()
      }
    },

    methods: {
      setNav() {
        this.nav = navConfig[0].children.concat(navConfig[1])
        navConfig[2].groups.map(group => group.list).forEach(list => {
          this.nav = this.nav.concat(list)
        })
      },

      updateNav() {
        this.currentComponent = `/${this.$route.params.name}${this.$route.hash}`
        for (let i = 0, len = this.nav.length; i < len; i++) {
          if (this.nav[i].path === this.currentComponent) {
            this.currentIndex = i
            break
          }
        }

        let cIndex = this.currentIndex
        do {
          this.leftNav = this.nav[--cIndex]
        } while (this.leftNav && (this.leftNav.path.split('#')[0] == this.currentComponent.split('#')[0] || this.leftNav.path.split('#')[1] || this.leftNav.disabled))
        // this.leftNav = this.nav[this.currentIndex - 1]

        cIndex = this.currentIndex
        do {
          this.rightNav = this.nav[++cIndex]
        } while (this.rightNav && (this.rightNav.path.split('#')[0] == this.currentComponent.split('#')[0] || this.rightNav.disabled))
        // this.rightNav = this.nav[this.currentIndex + 1]
      },

      handleNavClick(direction) {
        this.$router.push(`/component${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`)
      }
    },

    created() {
      this.setNav()
      this.updateNav()
    }
  };
</script>

<style>
  .footer-nav {
    padding: 24px 0;
    color: #99a9bf;
    font-size: 14px;

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    & i {
      transition: .3s;
      color: #d9def1;
      vertical-align: baseline;
    }
  }

  .footer-nav-link {
    cursor: pointer;
    transition: .3s;

    &:hover {
      color: #20a0ff;

      & i {
        color: #20a0ff;
      }
    }
  }

  .footer-nav-left {
    float: left;
    margin-left: -4px;
  }

  .footer-nav-right {
    float: right;
    margin-right: -4px;
  }
</style>
