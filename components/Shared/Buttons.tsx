import { View, Text, Pressable, useWindowDimensions } from 'react-native'

type ButtonsProps = {
  onCancel?: () => void
  onNext?: () => void
  cancelText?: string
  nextText?: string
}

export default function Buttons({
  onCancel,
  onNext,
  cancelText = 'Cancel',
  nextText = 'Next',
}: ButtonsProps) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  return (
    <View
      className="flex-row justify-center gap-4 text-lg mb-4"
      style={{ marginTop: isLandscape ? 16 : 40 }} // mt-4 vs mt-10
    >
      {onCancel && (
        <Pressable
          onPress={onCancel}
          className="bg-gray-100 px-10 py-3 rounded-lg min-w-[100px] items-center"
          android_ripple={{ color: '#e5e7eb' }}
        >
          <Text className="text-gray-600 text-base">{cancelText}</Text>
        </Pressable>
      )}
      {onNext && (
        <Pressable
          onPress={onNext}
          className="bg-[#0097EE] px-10 py-3 rounded-lg min-w-[100px] items-center"
          android_ripple={{ color: '#0080cc' }}
        >
          <Text className="text-white text-base">{nextText}</Text>
        </Pressable>
      )}
    </View>
  )
}
