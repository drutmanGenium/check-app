import { useState, useEffect } from 'react';
import { View, useWindowDimensions, StatusBar, Platform } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import Sidebar from 'components/Sidebar';
import SuccessModal from 'components/SetDateComponents/SuccessModal';
import SummaryModal from '@/components/CheckInComponents/SummeryModal';
import { ModalContext } from '@/context/modal-context';
import '../global.css';

export default function Layout() {
  const [successVisible, setSuccessVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(isLandscape);
    }
  }, [isLandscape]);

  return (
    <ModalContext.Provider
      value={{
        successVisible,
        setSuccessVisible,
        summaryVisible,
        setSummaryVisible,
        summaryData,
        setSummaryData,
      }}>
      <View className="relative h-full w-full flex-row bg-white">
        <View className="w-24">
          <Sidebar />
        </View>
        <View className="relative flex-1">
          <Slot />
        </View>
        <SuccessModal
          visible={successVisible}
          onClose={() => {
            setSuccessVisible(false);
            router.push('/check-in');
          }}
        />

        {summaryVisible && summaryData && (
          <SummaryModal
            visible={summaryVisible}
            onClose={() => setSummaryVisible(false)}
            data={summaryData}
          />
        )}
      </View>
    </ModalContext.Provider>
  );
}
