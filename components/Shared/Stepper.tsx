import { View } from 'react-native'

type StepperProps = {
  totalSteps: number
  currentStep: number
}

export default function Stepper({ totalSteps, currentStep }: StepperProps) {
  return (
    <View className="flex-row items-center ml-8 justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} className="flex-row items-center w-12">
          <View
            className={`w-3 h-3 rounded-full z-10 ${
              index <= currentStep
                ? 'bg-blue-800'
                : 'border border-blue-800 bg-white'
            }`}
          />
          {index < totalSteps - 1 && (
            <View className="flex-1 h-px bg-blue-800" />
          )}
        </View>
      ))}
    </View>
  )
}
