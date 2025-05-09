import { Slot } from "expo-router"
import { View, StyleSheet } from "react-native"
import Sidebar from "components/Sidebar"
import '../global.css'

export default function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar />
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  sidebar: {
    width: 96, // equivalente a w-24 (24 * 4 = 96)
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    overflow: 'hidden' // previene que el contenido se desborde
  }
})