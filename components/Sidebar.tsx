import { View, Pressable, Image, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSegments, useRouter } from 'expo-router';

import CalendarIcon from '../assets/icons/Icon=CalendarEvents.svg'
import CheckInIcon from '../assets/icons/Icon=CheckIn.svg'
import ReportIcon from '../assets/icons/Icon=Report.svg'
import LogoutIcon from '../assets/icons/Icon=Logout.svg'

const icons = [
  { Icon: CalendarIcon, path: '/set-date' },
  { Icon: CheckInIcon, path: '/check-in' },
  { Icon: ReportIcon, path: '/report' },
]

export default function Sidebar() {
  const segments = useSegments()
  const pathname = '/' + segments.join('/')
  const insets = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()

  const isLandscape = width > height
  const baseWidth = 74
  const sidebarWidth = isLandscape ? baseWidth + insets.left : baseWidth

  return (
    <View
    className="h-full bg-white border-r border-gray-100 flex flex-col justify-between items-center"
    style={{
      width: sidebarWidth,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: isLandscape ? insets.left : 0, // opcional, si querés respetar notch lateral
    }}
  >
      <View className="items-center gap-4 mt-4">
      {icons.map(({ Icon, path }, index) => {
  const isActive = pathname.includes(path) || (pathname === '/' && index === 0)

  return (
    <View
      key={path}
      className={`p-3 rounded-2xl items-center justify-center ${
        isActive ? 'bg-light-blue-100  bg-[#E5F6FF]' : ''
      }`}
    >
      <Icon
        width={32}
        height={32}
        className={isActive ? 'text-[#0097EE]' : 'text-[#323334]'}
      />
    </View>
  )
})}


      </View>

      <View className="items-center gap-6 mb-6">
        <Pressable onPress={() => console.log('Logout pressed')}>
          <LogoutIcon width={32} height={32} fill="#323334" />
        </Pressable>
        <Pressable onPress={() => console.log('Profile pressed')}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              overflow: 'hidden',
              backgroundColor: '#ccc',
            }}
          >
            <Image
              source={require('@/assets/NotProfile.webp')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </Pressable>
      </View>
    </View>
  )
}