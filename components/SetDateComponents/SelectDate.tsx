import { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import Stepper from '../Shared/Stepper'
import Title from '../Shared/Title'
import Buttons from '../Shared/Buttons'

type Props = {
  selected: number | null
  onSelect: (i: number) => void
  onNext: () => void
  onBack: () => void
}

const options = [
  { day: 'MON', date: 12, month: 'MAY' },
  { day: 'TUE', date: 13, month: 'MAY' },
]

export default function SelectDate({ selected, onSelect, onNext, onBack }: Props) {
  const screenWidth = Dimensions.get('window').width
  const getResponsiveText = (vw: number) => Math.round((screenWidth * vw) / 100)
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
          <Stepper totalSteps={4} currentStep={1} />
          <View className="mt-4 items-center">
            <Title
              title="Select the date"
              subtitle="This information will be used to preload the data associated to the date"
            />
          </View>
        </View>

        <View className="w-full max-w-[768px] self-center">
          <View
            className="flex flex-row justify-center gap-4 flex-wrap"
            style={{ marginTop: isLandscape ? 40 : 60, marginBottom: 40 }}
          >
            {options.map((option, index) => {
              const isSelected = selected === index
              return (
                <Pressable
                  key={index}
                  onPress={() => onSelect(index)}
                  className={`w-[45%] aspect-square max-w-[260px] items-center justify-center rounded-lg border 
                              ${isSelected ? 'border-[#0097EE] border-2 bg-blue-50' : 'bg-gray-100 border-transparent'}`}
                >
                  <Text
                    style={{ fontSize: getResponsiveText(4) }}
                    className={`${isSelected ? 'text-[#0097EE]' : 'text-gray-800'}`}
                  >
                    {option.day}
                  </Text>
                  <Text
                    style={{ fontSize: getResponsiveText(10) }}
                    className={`font-semibold leading-none ${isSelected ? 'text-[#0097EE]' : 'text-gray-800'}`}
                  >
                    {option.date}
                  </Text>
                  <Text
                    style={{ fontSize: getResponsiveText(4) }}
                    className={`${isSelected ? 'text-[#0097EE]' : 'text-gray-800'}`}
                  >
                    {option.month}
                  </Text>
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
        <Buttons onCancel={onBack} cancelText="Back" onNext={onNext} nextText="Next" />
      </View>
    </View>
  )
}