import { createContext, useContext } from 'react'

type ModalContextType = {
  successVisible: boolean
  setSuccessVisible: (v: boolean) => void
  summaryVisible: boolean
  setSummaryVisible: (v: boolean) => void
  summaryData: any
  setSummaryData: (data: any) => void
}

export const ModalContext = createContext<ModalContextType>({
  successVisible: false,
  setSuccessVisible: () => {},
  summaryVisible: false,
  setSummaryVisible: () => {},
  summaryData: null,
  setSummaryData: () => {},
})

export const useModal = () => useContext(ModalContext)
