import { View, Text } from 'react-native'

type TitleProps = {
  title: string
  subtitle: string
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <View className="px-4 mr-4 items-center text-center">
      <Text className="text-3xl text-gray-800 mb-2 font-semibold text-center">
        {title}
      </Text>
      <Text className="text-lg text-gray-500 text-center">
        {subtitle}
      </Text>
    </View>
  )
}
