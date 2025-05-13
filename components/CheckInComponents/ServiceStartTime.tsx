import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native'
import Stepper from '@/components/Shared/Stepper'
import Title from '@/components/Shared/Title'
import Buttons from '@/components/Shared/Buttons'

type Props = {
  selected: 'yes' | 'no' | null
  onSelect: (value: 'yes' | 'no') => void
  onNext: () => void
  onBack: () => void
}

export default function ServiceStartTime({ selected, onSelect, onNext, onBack }: Props) {
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
          <Stepper totalSteps={6} currentStep={2} />

          <View className="mt-4 items-center">
            <Title
              title="Service start time"
              subtitle="¿Does the service start on time?"
            />
          </View>

          <View
            className="flex flex-row justify-center gap-4 flex-wrap"
            style={{ 
              marginTop: isLandscape ? 40 : 60, 
              marginBottom: 40,
              paddingVertical: 20 // Añadido para igualar espaciado
            }}
          >
            <Pressable
              onPress={() => onSelect('yes')}
              className={`w-[45%] aspect-square max-w-[260px] rounded-lg border-2 
                          ${selected === 'yes' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-green-50'}`}
            >
              <View className="flex-1 justify-center items-center py-6">
                <Text 
                  className="text-4xl font-semibold text-green-600"
                  style={{ 
                    lineHeight: 48,
                    marginTop: -10 // Compensa el espacio natural de los textos múltiples
                  }}
                >
                  Yes
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => onSelect('no')}
              className={`w-[45%] aspect-square max-w-[260px] rounded-lg border-2 
                          ${selected === 'no' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-red-50'}`}
            >
              <View className="flex-1 justify-center items-center py-6">
                <Text 
                  className="text-4xl font-semibold text-red-600"
                  style={{ 
                    lineHeight: 48,
                    marginTop: -10 // Mismo ajuste que "Yes"
                  }}
                >
                  No
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className="w-full max-w-[768px] self-center" style={{ marginBottom: isLandscape ? 10 : 80 }}>
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Next" />
      </View>
    </View>
  )
}