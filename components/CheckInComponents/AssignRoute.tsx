import { useState } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import Stepper from '@/components/Shared/Stepper';
import Title from '@/components/Shared/Title';
import Buttons from '@/components/Shared/Buttons';
import Info from '@/assets/icons/Icon=Info.svg';
import Recomended from '@/assets/icons/Icon=Recommended.svg';

type Route = {
  title: string;
  subtitle: string;
  status: string;
  recommended?: any;
  disabled?: boolean;
};

const routes: Route[] = [
  {
    title: 'Route 1',
    subtitle: 'Hilton Boston Park Plaza, Moxy Boston Downtown',
    status: '3/7',
  },
  {
    title: 'Route 2',
    subtitle: 'Boston Marriott Copley Place, Westin Copley Place Boston',
    status: '3/6',
  },
  { title: 'Route 3', subtitle: 'Sheraton Boston Hotel', status: '2/5', recommended: true },
  { title: 'Route 4', subtitle: 'InterContinental Boston', status: '2/2', disabled: true },
];

type Props = {
  selected: number | null;
  setSelected: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function AssignRoute({ selected, setSelected, onNext, onBack }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedRouteInfo, setSelectedRouteInfo] = useState<Route | null>(null);

  return (
    <View
      className="flex-1 justify-between pb-4"
      style={{ paddingTop: isLandscape ? 20 : 80, paddingHorizontal: isLandscape ? 64 : 16 }}>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-12 w-full max-w-[768px] self-center">
          <Stepper totalSteps={6} currentStep={5} />
          <View className="mt-4 items-center">
            <Title title="Assign a route" subtitle="Select the route and corresponding stops" />
          </View>
        </View>

        <View className="mt-8 w-full max-w-[768px] self-center">
          <View className="flex flex-col gap-4">
            {routes.map((route, index) => {
              const isSelected = selected === index;
              const isDisabled = route.disabled;

              return (
                <View key={route.title} className="flex-row items-center gap-2">
                  <Pressable
                    onPress={() => !isDisabled && setSelected(index)}
                    disabled={isDisabled}
                    className={`flex-1 flex-row items-center justify-between rounded-xl px-6 py-4 ${
                      isDisabled
                        ? 'bg-gray-100 opacity-50'
                        : isSelected
                          ? 'border border-[#0097EE] bg-blue-50'
                          : 'bg-gray-100'
                    }`}>
                    <View className="flex-1 pr-2">
                      <Text
                        className={`text-base font-semibold ${isDisabled ? 'text-gray-400' : isSelected ? 'text-[#0097EE]' : 'text-gray-800'}`}>
                        {route.title}
                      </Text>
                      <Text
                        className={`text-sm ${isDisabled ? 'text-gray-400' : isSelected ? 'text-[#0097EE]' : 'text-gray-800'}`}>
                        {route.subtitle}
                      </Text>
                    </View>
                    {route.recommended && <Recomended width={16} height={16}/>}
                    <View className="flex-row items-center gap-1 rounded-xl bg-white px-2 py-1">
                      <Text className="text-base text-gray-600 sm:text-lg">{route.status}</Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setSelectedRouteInfo(route);
                      setShowSidebar(true);
                    }}
                    className="rounded-xl bg-gray-100 p-2 px-6 py-6">
                    <Info width={20} height={20} fill="#323334" />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        className="w-full max-w-[768px] self-center"
        style={{ marginBottom: isLandscape ? 10 : 80 }}>
        <Buttons onCancel={onBack} onNext={onNext} cancelText="Back" nextText="Next" />
      </View>

      {showSidebar && selectedRouteInfo && (
        <View
          className="absolute bottom-0 right-0 top-0 z-50 bg-white p-6"
          style={{ width: isLandscape ? '50%' : '90%' }}>
          <Pressable
            className="absolute right-8"
            style={{ marginTop: isLandscape ? 20 : 80 }}
            onPress={() => setShowSidebar(false)}>
            <Text className="text-4xl text-gray-700">×</Text>
          </Pressable>

          <ScrollView style={{ marginTop: isLandscape ? 20 : 128 }}>
            <Text className="text-2xl font-bold text-[#0047AB]">{selectedRouteInfo.title}</Text>

            <View className="mt-6">
              <Text className="text-xs font-medium text-gray-500">STOPS</Text>
              <Text className="mt-1 text-lg text-gray-900">{selectedRouteInfo.subtitle}</Text>
            </View>

            <View className="mt-6">
              <Text className="text-xs font-medium text-gray-500">ONE WAY TIME (MINS)</Text>
              <Text className="mt-1 text-lg text-gray-900">25.5</Text>
            </View>

            <View className="mt-6">
              <Text className="text-xs font-medium text-gray-500">ROUND TRIP (MINS)</Text>
              <Text className="mt-1 text-lg text-gray-900">60:00</Text>
            </View>

            <View className="mt-6">
              <Text className="text-xs font-medium text-gray-500">TOTAL ROOM BLOCK</Text>
              <Text className="mt-1 text-lg text-gray-900">925</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
