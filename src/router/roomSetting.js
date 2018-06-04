const roomSetting = resolve => require(['@/components/roomSetting'], resolve)
const notice = resolve => require(['@/components/roomSetting/notice'], resolve)
const noticeIndex = resolve => require(['@/components/roomSetting/notice/noticeIndex'], resolve)
const Announcements = resolve => require(['@/components/roomSetting/notice/Announcements'], resolve)
const viewTheDetails = resolve => require(['@/components/roomSetting/notice/viewTheDetails'], resolve)
const cloudFile = resolve => require(['@/components/roomSetting/cloudFile'], resolve)
const cloudFileIndex = resolve => require(['@/components/roomSetting/cloudFile/cloudFileIndex'], resolve)
const openDir = resolve => require(['@/components/roomSetting/cloudFile/openDir'], resolve)
const video = resolve => require(['@/components/roomSetting/video'], resolve)
const videoIndex = resolve => require(['@/components/roomSetting/video/videoIndex'], resolve)
const videoComment = resolve => require(['@/components/roomSetting/video/videoComment'], resolve)
const meetings = resolve => require(['@/components/roomSetting/meetings'], resolve)
const meetingIndex = resolve => require(['@/components/roomSetting/meetings/meetingsIndex'], resolve)
const meetingLaunch = resolve => require(['@/components/roomSetting/meetings/meeting_launch'], resolve)

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
      ]
    },
    {
      path: '/static/webstatic/community/community.html',
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
      ],
    }
  ]
}

export default roomSettingConfig
 