import news from '@/components/news'
import newsIndex from '@/components/news/newsIndex'

const newsConfig = {
  path: '/news',
  component: news,
  children: [
    {
      path: '',
      component: newsIndex
    }
  ]
}

export default newsConfig
