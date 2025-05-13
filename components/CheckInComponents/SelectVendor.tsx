import { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import Stepper from '@/components/Shared/Stepper';
import Title from '@/components/Shared/Title';
import Buttons from '@/components/Shared/Buttons';
import Info from '@/assets/icons/Icon=Info.svg';
import Search from '@/assets/icons/Icon=Search.svg';

type Vendor = {
  name: string;
  status: string;
};

const vendors: Vendor[] = [
  { name: 'Ace Express Coaches', status: '3/8' },
  { name: 'Adana Tours LLC', status: '5/10' },
  { name: 'Chino Valley Tours', status: '5/10' },
  { name: 'Fisher Bus Co MA', status: '2/5' },
  { name: 'Four Season Travel', status: '3/3' },
  { name: 'Greyline', status: '7/8' },
];

type Props = {
  selected: number | null;
  setSelected: (index: number) => void;
  onNext: () => void;
};

export default function SelectVendor({ selected, setSelected, onNext }: Props) {
  const [query, setQuery] = useState('');
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedVendorInfo, setSelectedVendorInfo] = useState<Vendor | null>(null);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <View
      className="flex-1 justify-between pb-4"
      style={{
        paddingTop: isLandscape ? 20 : 80,
        paddingHorizontal: isLandscape ? 64 : 16,
      }}>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-12 w-full max-w-[768px] self-center">
          <Stepper totalSteps={6} currentStep={0} />
          <View className="mt-4 items-center">
            <Title
              title="Select a vendor"
              subtitle="This information will be used to preload the data to the vendor"
            />
          </View>
        </View>

        <View className="w-full max-w-[768px] flex-1 self-center">
          <View className="relative mb-4 w-full">
            <Search width={20} height={20} fill="#323334" style={{ top: 38, left: 10 }} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search vendor..."
              className="w-full rounded-xl border border-gray-300 py-4 pl-14 pr-4 text-xl text-gray-800"
            />
          </View>

          <View className="flex flex-col gap-4">
            {filteredVendors.map((vendor) => {
              const index = vendors.findIndex((v) => v.name === vendor.name);
              const isSelected = index === selected;
              return (
                <View key={vendor.name} className="flex-row items-center gap-2">
                  <Pressable
                    onPress={() => setSelected(index)}
                    className={`flex-1 flex-row items-center justify-between rounded-xl px-6 py-4 text-xl ${
                      isSelected ? 'border border-[#0097EE] bg-blue-50' : 'bg-gray-100'
                    }`}>
                    <View className="flex-1 pr-2">
                      <Text
                        className={`text-base sm:text-lg md:text-xl ${
                          isSelected ? 'text-[#0097EE]' : 'text-gray-800'
                        }`}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {vendor.name}
                      </Text>
                    </View>
                    <View className="rounded-xl bg-white px-2 py-1">
                      <Text className="text-base text-gray-600 sm:text-lg">{vendor.status}</Text>
                    </View>
                  </Pressable>

                  <Pressable
                    className="rounded-xl bg-gray-100 p-2 px-6 py-6"
                    onPress={() => {
                      setSelectedVendorInfo(vendor);
                      setShowSidebar(true);
                    }}>
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
        <Buttons onNext={onNext} nextText="Next" />
      </View>

      {showSidebar && selectedVendorInfo && (
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
            <Text className="text-xl font-semibold text-[#0047AB]">{selectedVendorInfo.name}</Text>

            <View>
              <View className="mt-4">
                <Text className="text-xs text-gray-500">Contact</Text>
                <Text className="text-base text-gray-800">Jill LaCroix</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">Email</Text>
                <Text className="text-base text-gray-800">jlacroix@chinovalleytours.com</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">Phone</Text>
                <Text className="text-base text-gray-800">(303) 222-0981</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">State</Text>
                <Text className="text-base text-gray-800">NV</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">DOT #</Text>
                <Text className="text-base text-gray-800">2589674</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">COI Expiration</Text>
                <Text className="text-base text-gray-800">07-11-2025</Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">2.2 Contract</Text>
                <Text className="w-fit rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                  Yes
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
