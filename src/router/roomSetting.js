const roomSetting = resolve => require(['@/components/roomSetting'], resolve)
const notice = resolve => require(['@/components/roomSetting/notice'], resolve)
const noticeIndex = resolve => require(['@/components/roomSetting/notice/noticeIndex'], resolve)
const Announcements = resolve => require(['@/components/roomSetting/notice/Announcements'], resolve)
const viewTheDetails = resolve => require(['@/components/roomSetting/notice/viewTheDetails'], resolve)
const cloudFile = resolve => require(['@/components/roomSetting/cloudFile'], resolve)
const cloudFileIndex = resolve => require(['@/components/roomSetting/cloudFile/cloudFileIndex'], resolve)
const openDir = resolve => require(['@/components/roomSetting/cloudFile/openDir'], resolve)
const create_dir = resolve => require(['@/components/roomSetting/cloudFile/create_dir'], resolve)
const video = resolve => require(['@/components/roomSetting/video'], resolve)
const videoIndex = resolve => require(['@/components/roomSetting/video/videoIndex'], resolve)
const videoComment = resolve => require(['@/components/roomSetting/video/videoComment'], resolve)
const meetings = resolve => require(['@/components/roomSetting/meetings'], resolve)
const meetingIndex = resolve => require(['@/components/roomSetting/meetings/meetingsIndex'], resolve)
const meetingLaunch = resolve => require(['@/components/roomSetting/meetings/meeting_launch'], resolve)
const meeting_info = resolve => require(['@/components/roomSetting/meetings/meeting_info'], resolve)
const template = resolve => require(['@/components/roomSetting/template'], resolve)
const fileTemplate = resolve => require(['@/components/roomSetting/template/fileTemplate'], resolve)
const open_common = resolve => require(['@/components/roomSetting/template/open_common'], resolve)
const myDownstream = resolve => require(['@/components/roomSetting/myDownstream'], resolve)
const room_set_mysub = resolve => require(['@/components/roomSetting/myDownstream/room_set_mysub'], resolve)
const room_set_shaer = resolve => require(['@/components/roomSetting/myDownstream/room_set_shaer'], resolve)

const roomSettingConfig = {
  path: '/static/newwebstatic',
  component: roomSetting,
  children: [
    {
      path: '/static/newwebstatic/gonggao/gonggao.html',
      component: notice,
      children:[
        {
          path: '',
          component: noticeIndex
        },
        {
          path: '/static/newwebstatic/gonggao/gonggao_sent.html',
          component: Announcements
        },
        {
          path: '/static/newwebstatic/gonggao/gonggao_detail.html',
          component: viewTheDetails
        },
      ],
    },
    {
      path: '/static/webstatic/dish/index.html',
      component: cloudFile,
      children:[
        {
          path: '',
          component: cloudFileIndex
        },
        {
          path: '/static/webstatic/dish/open_dir.html',
          component: openDir
        },
        {
          path: '/static/webstatic/dish/create_dir.html',
          component: create_dir
        },
      ]
    },
    {
      path: '/static/webstatic/community/community_main.html',
      component: video,
      children:[
        {
          path: '',
          component: videoIndex
        },
        {
          path: '/videoComment',
          component: videoComment
        },
      ]
    },
    {
      path: '/static/webstatic/meeting/meetings.html',
      component: meetings,
      children:[
        {
          path: '',
          component: meetingIndex
        },
        {
          path: '/static/webstatic/meeting/meeting_launch.html',
          component: meetingLaunch
        },
        {
          path: '/static/webstatic/meeting/meeting_info.html',
          component: meeting_info
        },
      ],
    },
    {
      path: '/static/webstatic/dish/common.html',
      component: template,
      children:[
        {
          path: '',
          component: fileTemplate
        },
        {
          path: '/static/webstatic/dish/open_common.html',
          component: open_common
        },
      ]
    },
    {
      path: '/static/webstatic/roomshare/room_set_mysub.html',
      component: myDownstream,
      children:[
        {
          path: '',
          component: room_set_mysub
        },
        {
          path: '/static/webstatic/roomshare/room_set_shaer.html',
          component: room_set_shaer
        },
      ]
    },
  ]
}

export default roomSettingConfig
 