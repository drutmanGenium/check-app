import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'
import CustomSelect from '@/components/Shared/CustomSelect'
import IconGps from '@/assets/icons/Icon=GPS.svg'

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function AssignGps({ onNext, onBack }: Props) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const [gpsId, setGpsId] = useState('')
  const [open, setOpen] = useState(false)

  const gpsOptions = ['1000', '1001', '1004']

  const isCustomEntry =
    gpsId.trim().length > 0 &&
    !gpsOptions.some((opt) => opt.toLowerCase() === gpsId.trim().toLowerCase())

  const dropdownOptions = isCustomEntry
    ? [`Add ${gpsId.trim()}`, ...gpsOptions]
    : gpsOptions

  const handleSelectGps = (value: string) => {
    if (value.startsWith('Add ')) {
      const newValue = value.replace('Add ', '')
      setGpsId(newValue)
      return
    }
    setGpsId(value)
  }

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
          <Stepper totalSteps={6} currentStep={5} />
          <View className="mt-4 items-center">
            <Title title="Assign a GPS" subtitle="Complete the GPS ID number" />
          </View>

          <View className="mt-10">
            <Text className="mb-2 text-sm text-gray-700">GPS ID</Text>
            <CustomSelect
              iconSrc={IconGps}
              options={dropdownOptions}
              selected={gpsId}
              onChange={handleSelectGps}
              open={open}
              setOpen={setOpen}
            />
          </View>
        </View>
      </ScrollView>

      <View
        className="w-full max-w-[768px] self-center"
        style={{ marginBottom: isLandscape ? 10 : 80 }}
      >
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Finish" />
      </View>
    </View>
  )
}
