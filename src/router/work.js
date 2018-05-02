import work from '@/components/work'
import workIndex from '@/components/work/workIndex'
import user from '@/components/work/user'
import frr from '@/components/work/user/frr'
import cli from '@/components/work/user/cli'

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
    }
  ]
}

export default workConfig
