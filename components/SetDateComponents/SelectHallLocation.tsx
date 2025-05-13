import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'

type Props = {
  selected: number | null
  onSelect: (i: number) => void
  onNext: () => void
  onBack: () => void
}

const options = ['Central/South hall', 'West hall']

export default function SelectHallLocation({ selected, onSelect, onNext, onBack }: Props) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  return (
    <View
      className="flex-1 justify-between pb-4"
      style={{
        paddingTop: isLandscape ? 20 : 80,
        paddingHorizontal: isLandscape ? 64 : 16,
      }}
    >
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[768px] self-center mt-12">
          <Stepper totalSteps={4} currentStep={3} />
          <View className="mt-4 items-center">
            <Title
              title="Select hall location"
              subtitle="This information will be used to preload the data associated to the hall location"
            />
          </View>
        </View>

        <View className="w-full max-w-[768px] self-center flex-1 justify-center mb-8">
          <View className="flex flex-col gap-4">
            {options.map((option, index) => {
              const isSelected = selected === index
              return (
                <Pressable
                  key={option}
                  onPress={() => onSelect(index)}
                  className={`w-full py-5 rounded-xl items-center ${
                    isSelected
                      ? 'bg-blue-50 border-2 border-[#0097EE]'
                      : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`text-lg font-light ${
                      isSelected ? 'text-[#0097EE]' : 'text-gray-800'
                    }`}
                  >
                    {option}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </ScrollView>

      <View className="w-full max-w-[768px] self-center" style={{ marginBottom: isLandscape ? 10 : 80 }}>
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Finish" />
      </View>
    </View>
  )
}
