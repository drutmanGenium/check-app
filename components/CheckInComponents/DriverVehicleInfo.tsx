import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'
import CustomSelect from '@/components/Shared/CustomSelect'
import IconUser from '@/assets/icons/Icon=User.svg'
import IconPhone from '@/assets/icons/Icon=Phone.svg'
import IconBus from '@/assets/icons/Icon=Vehicle.svg'

type Props = {
  onNext: () => void
  onBack: () => void
}

export default function DriverVehicleInfo({ onNext, onBack }: Props) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  const [driverName, setDriverName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [open, setOpen] = useState(false)

  const driverData: Record<string, { phone: string; vehicle: string }> = {
    'John Smith': { phone: '(123) 456-7890', vehicle: 'AB1234' },
    'Sarah Gomez': { phone: '(234) 567-8901', vehicle: 'CD5678' },
    'Luis Mendoza': { phone: '(345) 678-9012', vehicle: 'EF9012' },
  }

  const baseOptions = Object.keys(driverData)

  const isCustomEntry =
    driverName.trim().length > 0 &&
    !baseOptions.some((opt) => opt.toLowerCase() === driverName.trim().toLowerCase())

    const dropdownOptions = isCustomEntry
    ? [`Add "${driverName.trim()}"`, ...baseOptions]
    : baseOptions
  
  const handleSelectDriver = (value: string) => {
    if (value.startsWith('Add "')) {
      const name = value.replace(/^Add "|\"$/g, '')
      setDriverName(name)
      setPhoneNumber('')
      setVehicleNumber('')
      return
    }

    setDriverName(value)
    const data = driverData[value]
    if (data) {
      setPhoneNumber(data.phone)
      setVehicleNumber(data.vehicle)
    } else {
      setPhoneNumber('')
      setVehicleNumber('')
    }
  }

  const isKnownDriver = !!driverData[driverName]

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
          <Stepper totalSteps={6} currentStep={3} />

          <View className="mt-4 items-center">
            <Title
              title="Fill in driver and vehicle’s information"
              subtitle="Complete the details for easy contact"
            />
          </View>

          <View className="mt-10 flex gap-6">
            <View>
              <Text className="mb-2 text-sm text-gray-700">Driver's Full Name</Text>
              <CustomSelect
                iconSrc={IconUser}
                options={dropdownOptions}
                selected={driverName}
                onChange={handleSelectDriver}
                open={open}
                setOpen={setOpen}
              />
            </View>

            <View>
              <Text className="mb-2 text-sm text-gray-700">Driver's Phone Number</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 bg-white">
                <IconPhone width={18} height={18} fill="#999" />
                <TextInput
                  placeholder="(303) 222-0981"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!isKnownDriver}
                  selectTextOnFocus={!isKnownDriver}
                  className="ml-3 flex-1 text-base text-gray-800"
                />
              </View>
            </View>

            <View>
              <Text className="mb-2 text-sm text-gray-700">Vehicle Number</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 bg-white">
                <IconBus width={18} height={18} fill="#999" />
                <TextInput
                  placeholder="10101"
                  placeholderTextColor="#999"
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                  editable={!isKnownDriver}
                  selectTextOnFocus={!isKnownDriver}
                  className="ml-3 flex-1 text-base text-gray-800"
                />
              </View>
            </View>
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
