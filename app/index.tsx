import { View } from 'react-native';
import SetDatePage from './set-date/page';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SetDatePage />
    </View>
  );
}