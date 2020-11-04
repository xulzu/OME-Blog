const selfTheme = require('./theme/')
module.exports = {
  lang: 'zh-ch',
  title: 'The Blog of XuBug',
  theme: selfTheme,
  header: 'The Blog of XuBug',
  themeConfig: {
    nav: [
      {
        text: 'Article',
        link: '/',
        desc:'文章'
      },
      {
        text: 'Category',
        link: '/category',
        desc:'分类'

      },
      // {
      //   text: 'Search',
      //   link: '/search',
      //   desc:'搜索'

      // },
      {
        text: 'About',
        link: '/about',
        desc:'关于'

      }
    ],
    category:[{
      title:'Algorithm',
      key:['algorithm'],
      desc:'算法'
    },
    {
      title:'JavaScript',
      key:['JavaScript'],
      desc:'JavaScript'
    },{
      title:'Vue',
      key:['Vue','vue-router','vuex'],
      desc:'Vue家族'
    },{
      title:'Other',
      key:['Other'],
      desc:'其他'
    },{
      title:'CSS',
      key:['CSS'],
      desc:'css样式'
    },{
      title:'Webpack',
      key:['Webpack'],
      desc:'Webpack'
    },
  ],
    footer: 'lisence -_- @2020-01-23 XuBug'

  }
}