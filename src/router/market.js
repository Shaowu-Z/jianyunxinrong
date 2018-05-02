import market from '@/components/market'
import marketIndex from '@/components/market/marketIndex'

const marketConfig = {
  path: '/market',
  component: market,
  children: [
    {
      path: '',
      component: marketIndex
    }
  ]
}

export default marketConfig
