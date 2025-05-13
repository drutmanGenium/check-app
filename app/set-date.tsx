import { useState } from 'react';
import SelectDate from '@/components/SetDateComponents/SelectDate';
import SelectReportLocation from '@/components/SetDateComponents/SelectReportLocation';
import SelectHallLocation from '@/components/SetDateComponents/SelectHallLocation';
import SelectEvent from '@/components/SetDateComponents/SelectEvent';
import { useRouter } from 'expo-router';
import { useModal } from '@/context/modal-context';

export default function SetDatePage() {
  const [step, setStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedReportLocation, setSelectedReportLocation] = useState(0);
  const [selectedHallLocation, setSelectedHallLocation] = useState(0);
  const { setSuccessVisible } = useModal();
  const router = useRouter();   

  const handleNext = () => {
    if (step === 0 && selectedEvent !== null) setStep(1);
    else if (step === 1 && selectedDate !== null) setStep(2);
    else if (step === 2 && selectedReportLocation !== null) setStep(3);
    else if (step === 3 && selectedHallLocation !== null) setSuccessVisible(true);
  };

  const handleBack = () => {
    if (step === 1) setStep(0);
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <>
      {step === 0 && (
        <SelectEvent selected={selectedEvent} setSelected={setSelectedEvent} onNext={handleNext} />
      )}
      {step === 1 && (
        <SelectDate
          selected={selectedDate}
          onSelect={setSelectedDate}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <SelectReportLocation
          selected={selectedReportLocation}
          onSelect={setSelectedReportLocation}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <SelectHallLocation
          selected={selectedHallLocation}
          onSelect={setSelectedHallLocation}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </>
  );
}
