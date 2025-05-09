import { View, Text, Pressable } from 'react-native'
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
  return (
    <View className="flex-1 px-4 pt-6 pb-4 justify-between">
      <View className="w-full max-w-[768px] self-center">
        <Stepper totalSteps={4} currentStep={3} />
        <View className="mt-4 items-center">
          <Title
            title="Select hall location"
            subtitle="This information will be used to preload the data associated to the hall location"
          />
        </View>
      </View>

      <View className="w-full max-w-[768px] self-center flex-1 justify-center mt-4">
        <View className="flex flex-col gap-3">
          {options.map((option, index) => {
            const isSelected = selected === index
            return (
              <Pressable
                key={option}
                onPress={() => onSelect(index)}
                className={`w-full py-4 rounded-md items-center ${
                  isSelected
                    ? 'bg-blue-50 border-2 border-[#0097EE]'
                    : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-xl font-light ${
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

      <View className="w-full max-w-[768px] self-center">
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Finish" />
      </View>
    </View>
  )
}
