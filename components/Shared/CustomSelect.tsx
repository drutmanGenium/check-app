import { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import ChevronUp from '@/assets/icons/Icon=ChevronUp.svg';
import ChevronDown from '@/assets/icons/Icon=ChevronDown.svg';

type CustomSelectProps = {
  iconSrc: any;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function CustomSelect({
  iconSrc,
  options,
  selected,
  onChange,
  open,
  setOpen,
}: CustomSelectProps) {
  const inputRef = useRef<TextInput>(null);
  const containerRef = useRef<View>(null);
  const { width, height } = useWindowDimensions();
  const isTabletLandscape = width > 800 && width > height;
  const Icon = iconSrc;
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(selected.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
    Keyboard.dismiss();
  };

  return (
    <View ref={containerRef} className="relative">
      {open && (
        <View style={StyleSheet.absoluteFillObject}>
          <Pressable
            style={{
              flex: 1,
              zIndex: 1000,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onPress={() => {
              setOpen(false);
              Keyboard.dismiss();
            }}
          />
        </View>
      )}

      <Pressable
        className="z-20 mb-4 w-full flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3"
        onPress={() => setOpen(!open)}>
        <View className="flex-1 flex-row items-center gap-2 p-2">
          <Icon width={20} height={20} fill="#999" />
          <TextInput
            ref={inputRef}
            value={selected}
            onChangeText={onChange}
            placeholder="Select or type..."
            className={`flex-1 text-gray-800 ${isTabletLandscape ? 'text-xl' : 'text-base'}`}
            style={{ padding: 0 }}
            onFocus={() => setOpen(true)}
          />
        </View>
        {open ? (
          <ChevronUp width={20} height={20} fill="#323334" />
        ) : (
          <ChevronDown width={20} height={20} fill="#323334" />
        )}
      </Pressable>

      {open && (
        <ScrollView
          className="absolute z-50 mt-16 max-h-60 w-full rounded-xl border border-gray-200 bg-white shadow"
          keyboardShouldPersistTaps="handled"
          style={{ zIndex: 30 }}>
          {filteredOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              className={`flex-row items-center gap-2 px-4 py-3 ${
                selected === option ? 'bg-blue-50' : ''
              }`}>
              <Image source={iconSrc} className="h-5 w-5" resizeMode="contain" />
              <Text
                className={`font-light ${
                  selected === option ? 'text-[#0097EE]' : 'text-gray-800'
                } ${isTabletLandscape ? 'text-2xl' : 'text-lg'}`}>
                {option}
              </Text>
            </Pressable>
          ))}
          {filteredOptions.length === 0 && (
            <Text
              className={`px-4 py-3 text-gray-400 ${isTabletLandscape ? 'text-xl' : 'text-base'}`}>
              No results
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
