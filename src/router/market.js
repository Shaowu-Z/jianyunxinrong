// import market from '@/components/market'
// import marketIndex from '@/components/market/marketIndex'

const market = resolve => require(['@/components/market'], resolve)
const marketIndex = resolve => require(['@/components/market/marketIndex'], resolve)

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
