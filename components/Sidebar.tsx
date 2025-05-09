import { View, Pressable, Image } from 'react-native'
import { usePathname, useRouter } from 'expo-router'

import CalendarIcon from '@/assets/icons/Icon=CalendarEvents.svg'
import CheckInIcon from '@/assets/icons/Icon=CheckIn.svg'
import CheckOutIcon from '@/assets/icons/Icon=CheckOut.svg'
import LogoutIcon from '@/assets/icons/Icon=Logout.svg'

const icons = [
  { Icon: CalendarIcon, path: '/set-date' },
  { Icon: CheckInIcon, path: '/check-in' },
  { Icon: CheckOutIcon, path: '/check-out' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <View className="w-16 h-full bg-white border-r border-gray-100 flex flex-col justify-between items-center py-6">

      {/* Top section */}
      <View className="items-center gap-4">
        {icons.map(({ Icon, path }, index) => {
          const isActive = pathname === path || (pathname === '/' && index === 0)

          return (
            <Pressable
              key={path}
              onPress={() => router.push(path as any)}
              className={`p-3 rounded-2xl ${isActive ? 'bg-light-blue-100' : ''}`}
            >
              <Icon width={24} height={24} fill={isActive ? '#0097EE' : '#323334'} />
            </Pressable>
          )
        })}
      </View>

      {/* Bottom section */}
      <View className="items-center gap-6">
        <LogoutIcon width={24} height={24} fill="#323334" />

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
      </View>
    </View>
  )
}
