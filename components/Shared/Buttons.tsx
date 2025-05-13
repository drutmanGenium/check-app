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
  const isTablet = width >= 800

  const buttonPadding = isTablet ? 24 : 12
  const buttonMinWidth = isTablet ? 280 : 100
  const textSize = isTablet ? 20 : 16

  return (
    <View
      className="flex-row justify-center gap-4 mb-4"
      style={{ marginTop: isLandscape ? 16 : 40 }}
    >
      {onCancel && (
        <Pressable
          onPress={onCancel}
          className="bg-gray-100 rounded-lg items-center"
          style={{
            paddingHorizontal: buttonPadding,
            paddingVertical: buttonPadding / 1.5,
            minWidth: buttonMinWidth,
          }}
          android_ripple={{ color: '#e5e7eb' }}
        >
          <Text
            className="text-gray-600 font-light"
            style={{ fontSize: textSize }}
          >
            {cancelText}
          </Text>
        </Pressable>
      )}
      {onNext && (
        <Pressable
          onPress={onNext}
          className="bg-[#0097EE] rounded-lg items-center"
          style={{
            paddingHorizontal: buttonPadding,
            paddingVertical: buttonPadding / 1.5,
            minWidth: buttonMinWidth,
          }}
          android_ripple={{ color: '#0080cc' }}
        >
          <Text
            className="text-white font-light"
            style={{ fontSize: textSize }}
          >
            {nextText}
          </Text>
        </Pressable>
      )}
    </View>
  )
}
