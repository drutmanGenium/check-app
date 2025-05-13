import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'
import ChevronUp from '@/assets/icons/Icon=ChevronUp.svg'
import ChevronDown from '@/assets/icons/Icon=ChevronDown.svg'

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function ActualStartTime({ onNext, onBack }: Props) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  const [hour, setHour] = useState(8)
  const [minute, setMinute] = useState(15)
  const [ampm, setAmpm] = useState<'am' | 'pm'>('pm')
  const [comments, setComments] = useState('')
  const [noShow, setNoShow] = useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

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
          <Stepper totalSteps={6} currentStep={2} />

          <View className="mt-4 items-center">
            <Title
              title="Service actual start time"
              subtitle="Inform the actual start time and, if necessary, bring some details"
            />
          </View>

          <View className="flex-row justify-center gap-4 mt-10">
  {[{ value: hour, onChange: setHour },
    { value: minute, onChange: setMinute },
    { value: ampm, onChange: () => setAmpm(ampm === 'am' ? 'pm' : 'am') }]
    .map((item, index) => (
      <View
        key={index}
        className="w-[28%] aspect-square rounded-lg border-2 border-gray-200 bg-white items-center justify-center"
      >
        <Pressable
          onPress={() => {
            if (index === 0) setHour((prev) => (prev % 12) + 1)
            if (index === 1) setMinute((prev) => (prev + 1) % 60)
            if (index === 2) setAmpm(ampm === 'am' ? 'pm' : 'am')
          }}
          className="mb-2"
        >
          <ChevronUp width={18} height={18} fill="#353535" />
        </Pressable>

        <Text className="text-2xl font-semibold text-gray-800">
        {index === 1 && typeof item.value === 'number' && item.value < 10
  ? `0${item.value}`
  : item.value}

        </Text>

        <Pressable
          onPress={() => {
            if (index === 0) setHour((prev) => (prev - 2 + 12) % 12 + 1)
            if (index === 1) setMinute((prev) => (prev - 1 + 60) % 60)
            if (index === 2) setAmpm(ampm === 'am' ? 'pm' : 'am')
          }}
          className="mt-2"
        >
          <ChevronDown width={18} height={18} fill="#353535" />
        </Pressable>
      </View>
    ))}
</View>

          <TextInput
            value={comments}
            onChangeText={setComments}
            placeholder="Comments"
            multiline
            className="mt-6 w-full max-w-[768px] self-center rounded-xl border border-gray-300 text-base text-gray-800 p-4"
            style={{ minHeight: 100 }}
          />

          <Pressable
            onPress={() => setNoShow(!noShow)}
            className={`mt-6 w-full max-w-[768px] self-center rounded-lg border px-4 py-3 items-center ${
              noShow ? 'bg-red-100 border-red-500' : 'bg-red-100 border border-red-300'
            }`}
          >
            <Text className="text-base font-semibold text-red-600">No show</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className="w-full max-w-[768px] self-center" style={{ marginBottom: isLandscape ? 10 : 80 }}>
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Next" />
      </View>
    </View>
  )
}
