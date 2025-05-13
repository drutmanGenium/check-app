import { View, Text, Pressable, ScrollView } from 'react-native'

type Props = {
  visible: boolean
  onClose: () => void
  data: {
    vendor: string
    dot: string
    startTime: string
    vehicleType: string
    driverHotel: string
    driverName: string
    phoneNumber: string
    vehicleNumber: string
    route: string
    gpsId: string
  }
}

export default function SummaryModal({ visible, onClose, data }: Props) {
  if (!visible) return null

  return (
    <View className="absolute inset-0 bg-black/20 items-center justify-center z-50 px-4">
      <View className="bg-white rounded-xl pt-12 pb-6 px-6 max-w-xl w-full max-h-[80vh] relative">
        <Pressable onPress={onClose} className="absolute top-4 right-6 z-10">
          <Text className="text-5xl text-gray-400">×</Text>
        </Pressable>

        <Text className="text-2xl font-semibold text-gray-900 mb-6 text-center">Summary</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between gap-6 flex-wrap">
            <View className="flex-1 gap-3">
              <Item label="Vendor" value={data.vendor} />
              <Item label="DOT #" value={data.dot} />
              <Item label="Start Time" value={data.startTime} />
              <Item label="Vehicle Type" value={data.vehicleType} />
              <Item label="Driver Hotel" value={data.driverHotel} />
            </View>

            <View className="flex-1 gap-3">
              <Item label="Driver’s Full Name" value={data.driverName} />
              <Item label="Driver’s Phone Number" value={data.phoneNumber} />
              <Item label="Vehicle Number" value={data.vehicleNumber} />
              <Item label="Route" value={data.route} />
              <Item label="GPS ID" value={data.gpsId} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-4">
      <Text className="text-gray-400 text-sm">{label}</Text>
      <Text className="text-gray-800 text-base">{value}</Text>
    </View>
  )
}
