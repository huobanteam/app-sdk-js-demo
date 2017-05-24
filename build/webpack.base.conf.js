var path = require('path')
var md = require('markdown-it')()
var transliteration = require('transliteration')
var hljs = require('highlight.js')
var config = require('../config')
var utils = require('./utils')
var striptags = require('./strip-tags')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var wrap = function(render) {
  return function() {
    // return render.apply(this, arguments)
    //   .replace('<code class="', '<code class="hljs ')
    //   .replace('<code>', '<code class="hljs">')

    return render.apply(this, arguments)
      .replace('<pre class="', '<pre class="hljs ')
      .replace('<pre>', '<pre class="hljs">')
  }
}

var convert = function(str) {
  str = str.replace(/(&#x)(\w{4})/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

var demoBlockName = 'demo'

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  externals: {
    'zepto': 'Zepto',
    'lodash': '_',
    'wx': 'jWeixin',
    'vue': 'Vue',
    'vue-router': 'VueRouter'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.md'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      // 'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md/,
        loader: 'vue-markdown-loader'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      // require('postcss-cssnext')({
      //   browsers: ['ie > 8', 'last 2 versions']
      // }),
      require('postcss-salad')({
        browsers: ['ie > 8', 'last 2 versions'],
        features: {
          bem: {
            shortcuts: {
              component: 'b',
              modifier: 'm',
              descendent: 'e'
            },
            separators: {
              descendent: '__',
              modifier: '--'
            }
          }
        }
      })
    ]
  },
  vueMarkdown: {
    // markdown-it config
    preset: 'default',
    breaks: true,
    html: true,
    xhtmlOut: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,

    preprocess: function(markdownIt, source) {
      markdownIt.renderer.rules.table_open = function() {
        return '<table class="table">'
      }
      markdownIt.renderer.rules.fence = wrap(markdownIt.renderer.rules.fence)

      var prefix = ''
      var fChar = source.substr(0, 1)
      if (fChar != '<' && fChar != '\n') {
        prefix = '> 所有客户端方法均为client实例的方法, 需通过 `HuobanAppSDK.client()` 获取client实例'
      }

      if (prefix) {
        return `${prefix}\n${source}`
      }

      return source
    },

    highlight1: function (str, lang) {
      var replaceDelimiters = function (str) {
        return str.replace(/({{|}})/g, '<span>$1</span>')
      }
      var result = ''

      try {
        if (lang && hljs.getLanguage(lang)) {
          result = replaceDelimiters(hljs.highlight(lang, str, true).value)
        } else {
          result = replaceDelimiters(hljs.highlightAuto(str, ['javascript', 'html', 'css', 'bash', 'php']).value)
        }
      } catch (err) {}

      return result
    },

    use: [
      require('markdown-it-attrs'),
      // [require('markdown-it-highlightjs'), {auto: true, code: true}],
      [require('markdown-it-anchor'), {
        level: 2,
        permalink: true,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '¶',
        permalinkBefore: true,
        // renderPermalink: function(slug, opts, state, idx) {
        //   console.log('renderPermalink', slug)
        // },
        slugify: function(title) {
          var slug = transliteration.slugify(title.trim(), {
            lowercase: true,
            separator: '-',
            replace: [['引入', 'import'], ['安装', 'install'], ['静态', 'static'], ['参数', 'params'], ['方法', 'method'], ['卡片', 'ka-pian'], ['返回', 'return']],
            ignore: []
          })
          // console.log('slugify:', title, slug)

          return slug
        }
      }],
      [require('markdown-it-container'), demoBlockName, {

        validate: function(params) {
          return params.trim().match(new RegExp(`^${demoBlockName}\\s*(.*)` + '$'))
        },

        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(new RegExp(`^${demoBlockName}\\s*(.*)` + '$'))

          var outputVarName = 'jsons'
          tokens[idx].info = tokens[idx].info.trim().replace(new RegExp(`^(${demoBlockName}\\s*)(\\{([a-z_-]+)\\})`, 'i'), function(m2, p1, p2, p3, p4) {
            outputVarName = p3
            return p1.trim()
          })

          if (tokens[idx].nesting === 1) {
            var description = (m && m.length > 1) ? m[1].replace(`{${outputVarName}}`, '').trim() : ''
            var content = tokens[idx + 1].content
            var exec = striptags.fetch(content, 'exec')
            // var script = striptags.fetch(content, 'script')
            var template = striptags.fetch(content, 'template')

            tokens[idx + 1].content = striptags.strip(content, ['exec']).trim()

            var html = convert(exec || template || tokens[idx + 1].content).replace(/(<[^>]*)=""(?=.*>)/g, '$1')

            var descriptionHTML = description ? md.render(description) : ''

            // console.log(`mic.${demoBlockName}.render`, outputVarName, '\n', tokens[idx + 1].content)

            return `<${demoBlockName}-block class="${demoBlockName}-box" :output="${outputVarName}">
                      <template slot="source">${html}</template>
                      <template slot="description">${descriptionHTML}</template>
                      <template slot="highlight">`
          }
          return `</template></${demoBlockName}-block>\n`
        }
      }]
    ]
  }
}
