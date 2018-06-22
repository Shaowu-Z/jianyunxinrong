// import work from '@/components/work'
// import workIndex from '@/components/work/workIndex'
// import user from '@/components/work/user'
// import frr from '@/components/work/user/frr'
// import cli from '@/components/work/user/cli'

const work = resolve => require(['@/components/work'], resolve)
const workIndex = resolve => require(['@/components/work/workIndex'], resolve)
const user = resolve => require(['@/components/work/user'], resolve)
const frr = resolve => require(['@/components/work/user/frr'], resolve)
const cli = resolve => require(['@/components/work/user/cli'], resolve)
const simplify = resolve => require(['@/components/work/simplify'], resolve)
/**
 * 组合查询
 */
const  chengnuo = resolve => require(['@/components/work/simplify/simplifyChengnuo'], resolve)
const contract = resolve => require(['@/components/work/simplify/simplifyContract'], resolve)
const contractMingxi = resolve => require(['@/components/work/simplify/simplifyContractMingxi'], resolve)
const fapiao = resolve => require(['@/components/work/simplify/simplifyFapiao'], resolve)
const fapiaoMingxi = resolve => require(['@/components/work/simplify/simplifyFapiaoMingxi'], resolve)
const gongzuolianxidan = resolve => require(['@/components/work/simplify/simplifyGongzuolianxidan'], resolve)
const huiyijiyao = resolve => require(['@/components/work/simplify/simplifyHuiyijiyao'], resolve)
const jindujian = resolve => require(['@/components/work/simplify/simplifyJindujian'], resolve)
const laowubaoliang = resolve => require(['@/components/work/simplify/simplifyLaowubaoliang'], resolve)
const laowubaoliangMingxi = resolve => require(['@/components/work/simplify/simplifyLaowubaoliangMingxi'], resolve)
const paigongdan = resolve => require(['@/components/work/simplify/simplifyPaigongdan'], resolve)
const paigongdanMingxi = resolve => require(['@/components/work/simplify/simplifyPaigongdanMingxi'], resolve)
const shoufukuan = resolve => require(['@/components/work/simplify/simplifyShoufukuan'], resolve)
const shouliao = resolve => require(['@/components/work/simplify/simplifyShouliao'], resolve)
const shouliaoMingxi = resolve => require(['@/components/work/simplify/simplifyShouliaoMingxi'], resolve)

const workConfig = {
  path: '/work',
  component: work,
  children: [
    {
      path: '',
      component: workIndex
    },
    {
      path: '/',
      component: user
    },
    {
      path: '/',
      component: simplify
    },
    {
      path: '/user',
      component: user,
      children: [
        {
          path: 'frr',
          component: frr
        },
        {
          path: 'cli',
          component: cli
        }
      ]
    },
    {
      path: '/simplify',
      component: simplify,
      children: [
        {
          path: '/static/webstatic/work/simplify/simplify_chengnuo.html',
          component: chengnuo
        },
        {
          path: '/static/webstatic/work/simplify/simplify_contract.html',
          component: contract
        },
        {
          path: '/static/webstatic/work/simplify/simplify_contract_mingxi.html',
          component: contractMingxi
        },
        {
          path: '/static/webstatic/work/simplify/simplify_fapiao.html',
          component: fapiao
        },
        {
          path: '/static/webstatic/work/simplify/simplify_fapiao_mingxi.html',
          component: fapiaoMingxi
        },
        {
          path: '/static/webstatic/work/simplify/simplify_gongzuolianxidan.html',
          component: gongzuolianxidan
        },
        {
          path: '/static/webstatic/work/simplify/simplify_huiyijiyao.html',
          component: huiyijiyao
        },
        {
          path: '/static/webstatic/work/simplify/simplify_jindujian.html',
          component: jindujian
        },
        {
          path: '/static/webstatic/work/simplify/simplify_laowubaoliang.html',
          component: laowubaoliang
        },
        {
          path: '/static/webstatic/work/simplify/simplify_laowubaoliang_mingxi.html',
          component: laowubaoliangMingxi
        },
        {
          path: '/static/webstatic/work/simplify/simplify_paigongdan.html',
          component: paigongdan
        },
        {
          path: '/static/webstatic/work/simplify/simplify_paigongdan_mingxi.html',
          component: paigongdanMingxi
        },
        {
          path: '/static/webstatic/work/simplify/simplify_shoufukuan.html',
          component: shoufukuan
        },
        {
          path: '/static/webstatic/work/simplify/simplify_shouliao.html',
          component: shouliao
        },
        {
          path: '/static/webstatic/work/simplify/simplify_shouliao_mingxi.html',
          component: shouliaoMingxi
        }

      ]
    }
  ]
}

export default workConfig
