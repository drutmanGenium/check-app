import { useState } from "react"
import SelectVendor from "@/components/CheckInComponents/SelectVendor"
import SelectStartTime from "@/components/CheckInComponents/SelectStartTime"
import ServiceStartTime from "@/components/CheckInComponents/ServiceStartTime"
import ActualStartTime from "@/components/CheckInComponents/ActualStartTime"
import DriverVehicleInfo from "@/components/CheckInComponents/DriverVehicleInfo"
import AssignRoute from "@/components/CheckInComponents/AssignRoute"

export default function CheckInPage() {
  const [step, setStep] = useState(0)
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null)
  const [selectedStartTime, setSelectedStartTime] = useState(0)
  const [serviceStart, setServiceStart] = useState<'yes' | 'no' | null>(null)
  const [showActualTime, setShowActualTime] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)

  const handleNext = () => {
    if (step === 0 && selectedVendor !== null) {
      setStep(1)
    } else if (step === 1 && selectedStartTime !== null) {
      setStep(2)
    } else if (step === 2) {
      if (serviceStart === 'yes') {
        setStep(3)
      } else if (serviceStart === 'no') {
        setShowActualTime(true)
      }
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4 && selectedRoute !== null) {
      setStep(5)
    }
  }

  const handleBack = () => {
    if (showActualTime) {
      setShowActualTime(false)
      return
    }

    if (step === 1) {
      setStep(0)
    } else if (step === 2) {
      setStep(1)
      if (serviceStart === 'no') {
        setShowActualTime(false)
      }
    } else if (step === 3) {
      setStep(2)
      if (serviceStart === 'no') {
        setShowActualTime(true)
      }
    } else if (step === 4) {
      setStep(3)
    }
  }

  return (
    <>
      {step === 0 && (
        <SelectVendor
          selected={selectedVendor}
          setSelected={setSelectedVendor}
          onNext={handleNext}
        />
      )}

      {step === 1 && (
        <SelectStartTime
          selected={selectedStartTime}
          setSelected={setSelectedStartTime}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {step === 2 && !showActualTime && (
        <ServiceStartTime
          selected={serviceStart}
          onSelect={setServiceStart}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {step === 2 && showActualTime && (
        <ActualStartTime
          onNext={() => {
            setShowActualTime(false)
            setStep(3)
          }}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <DriverVehicleInfo
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {step === 4 && (
        <AssignRoute
          selected={selectedRoute}
          setSelected={setSelectedRoute}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </>
  )
}
