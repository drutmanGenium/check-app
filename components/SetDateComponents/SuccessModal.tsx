import { View, Text, Pressable } from 'react-native'

type Props = {
  visible: boolean
  onClose: () => void
}

export default function SuccessModal({ visible, onClose }: Props) {
  if (!visible) return null

  return (
    <View className="absolute inset-0 bg-black/20 items-center justify-center z-50 px-4">
      <View className="bg-white rounded-xl p-16 max-w-xl w-full relative items-center">
        <Pressable
          onPress={onClose}
          className="absolute top-4 right-6"
        >
          <Text className="text-5xl text-gray-400">×</Text>
        </Pressable>

        <View className="bg-green-100 rounded-xl p-3 mb-6">
          <View className="w-12 h-12 items-center justify-center">
            <View className="w-12 h-12 rounded-full border-2 border-green-600 items-center justify-center">
              <Text className="text-green-600 text-2xl">✓</Text>
            </View>
          </View>
        </View>

        <Text className="text-2xl font-semibold text-gray-900 mb-2">All done!</Text>
        <Text className="text-gray-500 text-base text-center">
          Your event information has been successfully set
        </Text>
      </View>
    </View>
  )
}
