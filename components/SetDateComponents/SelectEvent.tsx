import { useState } from 'react'
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'
import CustomSelect from '@/components/Shared/CustomSelect'
import iconCalendarEvent from '@/assets/icons/Icon=CalendarEvent.svg'

const eventOptions = [
  'PGA Championship Tech Dashboard 2025',
  'US Open Vendor Access 2024',
  'Super Bowl Logistics 2023',
]

type Props = {
  selected: string
  setSelected: (value: string) => void
  onNext: () => void
}

export default function SelectEvent({ selected, setSelected, onNext }: Props) {
  const [open, setOpen] = useState(false)
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
        setOpen(false)
      }}
      accessible={false}
    >
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
            <Stepper totalSteps={4} currentStep={0} />
            <View className="mt-4 items-center">
              <Title
                title="Select an event"
                subtitle="All the event-related information will be preloaded into the app"
              />
            </View>
          </View>

          <View
            className="w-full max-w-[768px] self-center mt-12"
            style={{ marginBottom: isLandscape ? 10 : 140 }}
          >
            <CustomSelect
              iconSrc={iconCalendarEvent}
              options={eventOptions}
              selected={selected}
              onChange={setSelected}
              open={open}
              setOpen={setOpen}
            />
          </View>
        </ScrollView>

        <View
          className="w-full max-w-[768px] self-center"
          style={{ marginBottom: isLandscape ? 10 : 80 }}
        >
          <Buttons onNext={onNext} nextText="Start" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}