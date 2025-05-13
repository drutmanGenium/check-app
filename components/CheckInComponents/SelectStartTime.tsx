import { View, Text, Pressable, useWindowDimensions, ScrollView } from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'

type TimeOption = {
  time: string
  label: string
  status: string
  disabled?: boolean
}

const options: TimeOption[] = [
  { time: '7:30 pm', label: 'Mini Buses 24-29 pax', status: '1/5' },
  { time: '9:00 am', label: 'Motor Coaches - Full Size', status: '2/5', disabled: true },
]

type Props = {
  selected: number | null
  setSelected: (index: number) => void
  onNext: () => void
  onBack: () => void
}

export default function SelectStartTime({
  selected,
  setSelected,
  onNext,
  onBack,
}: Props) {
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
        <View className="mt-12 w-full max-w-[768px] self-center">
          <Stepper totalSteps={6} currentStep={1} />
          <View className="mt-4 items-center">
            <Title
              title="Select a start time"
              subtitle="This information will be used to preload the data to the service"
            />
          </View>

          <View className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <View className="flex-1 border border-gray-200 rounded-xl py-1 px-4 items-start min-h-[60px] justify-center">
              <Text className="text-sm text-gray-400">DOT #</Text>
              <Text className="text-xl font-semibold">2589674</Text>
              <Text className="text-base text-gray-600">Chino Valley Tours</Text>
            </View>

            <View className="flex-1 border border-gray-200 rounded-xl py-1 px-4 items-start min-h-[60px] justify-center">
              <Text className="text-sm text-gray-400">DRIVER’S HOTEL</Text>
              <Text className="text-xl font-semibold">Comfort Suites</Text>
              <Text className="text-sm text-gray-600 leading-tight">
                4755 Castleton Way, Castle Rock, CO
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-4 mt-10">
            {options.map((option, index) => {
              const isSelected = selected === index
              const isDisabled = option.disabled

              return (
                <Pressable
                  key={option.time}
                  onPress={() => !isDisabled && setSelected(index)}
                  disabled={isDisabled}
                  className={`
                    flex-row justify-between items-center w-full px-2 py-4 rounded-xl text-xl border
                    ${isDisabled
                      ? 'bg-gray-100 text-gray-400 border-gray-200'
                      : isSelected
                      ? 'bg-blue-50 text-[#0097EE] border-[#0097EE]'
                      : 'bg-white text-[#0097EE] border-gray-300'}
                  `}
                >
                  <Text className='text-sm mr-2'>{option.time}</Text>
                  <View className="flex-row items-center gap-4">
                  <Text
                      className={`py-1 px-1 rounded-xl text-sm ${
                        isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-white text-[#0097EE]'
                      }`}
                    >
                      {option.label}
                    </Text>
                    <Text
                      className={`py-1 px-1 rounded-xl text-sm ${
                        isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-white text-[#0097EE]'
                      }`}
                    >
                      {option.status}
                    </Text>
                  </View>
                </Pressable>
              )
            })}
          </View>
        </View>
      </ScrollView>

      <View
        className="w-full max-w-[768px] self-center"
        style={{ marginBottom: isLandscape ? 10 : 80 }}
      >
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Next" />
      </View>
    </View>
  )
}
