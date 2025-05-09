// src/app/_layout.tsx
import { Slot } from "expo-router"
import { View } from "react-native"
import Sidebar from "components/Sidebar"
import '../global.css';

export default function Layout() {
  return (
    <View className="flex flex-row flex-1">
      <Sidebar />
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  )
}
