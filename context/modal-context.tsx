import { createContext, useContext } from 'react'

type ModalContextType = {
  successVisible: boolean
  setSuccessVisible: (v: boolean) => void
}

export const ModalContext = createContext<ModalContextType>({
  successVisible: false,
  setSuccessVisible: () => {},
})

export const useModal = () => useContext(ModalContext)
