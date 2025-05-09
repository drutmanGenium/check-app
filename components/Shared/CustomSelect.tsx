import { useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
  StyleSheet,
  Platform
} from 'react-native'
import ChevronUp from '@/assets/icons/Icon=ChevronUp.svg'
import ChevronDown from '@/assets/icons/Icon=ChevronDown.svg'

type CustomSelectProps = {
  iconSrc: any
  options: string[]
  selected: string
  onChange: (value: string) => void
  open: boolean
  setOpen: (value: boolean) => void
}

export default function CustomSelect({
  iconSrc,
  options,
  selected,
  onChange,
  open,
  setOpen,
}: CustomSelectProps) {
  const inputRef = useRef<TextInput>(null)
  const containerRef = useRef<View>(null)

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(selected.toLowerCase())
  )

  const handleSelect = (option: string) => {
    onChange(option)
    setOpen(false)
    Keyboard.dismiss()
  }

  return (
    <View ref={containerRef} className="relative w-full px-4">
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
              setOpen(false)
              Keyboard.dismiss()
            }}
          />
        </View>
      )}

      <Pressable
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white flex-row justify-between items-center z-20"
        onPress={() => {
          setOpen(!open)
          inputRef.current?.focus()
        }}
      >
        <View className="flex-row items-center gap-2 flex-1">
          <Image source={iconSrc} className="w-5 h-5" resizeMode="contain" />
          <TextInput
            ref={inputRef}
            value={selected}
            onChangeText={onChange}
            placeholder="Select or type..."
            className="flex-1 text-base text-gray-800"
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
          className="absolute z-50 mt-12 w-full bg-white border border-gray-200 rounded-xl shadow max-h-60"
          keyboardShouldPersistTaps="handled"
          style={{ zIndex: 30 }}
        >
          {filteredOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              className={`px-4 py-3 flex-row items-center gap-2 ${
                selected === option ? 'bg-blue-50' : ''
              }`}
            >
              <Image source={iconSrc} className="w-5 h-5" resizeMode="contain" />
              <Text
                className={`text-base font-light ${
                  selected === option ? 'text-[#0097EE]' : 'text-gray-800'
                }`}
              >
                {option}
              </Text>
            </Pressable>
          ))}
          {filteredOptions.length === 0 && (
            <Text className="px-4 py-3 text-gray-400 text-sm">No results</Text>
          )}
        </ScrollView>
      )}
    </View>
  )
}
