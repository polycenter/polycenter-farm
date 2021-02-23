import { createContext } from 'react'

const NightModeContext = createContext({})

export const NightModeProvider = NightModeContext.Provider
export const NightModeConsumer = NightModeContext.Consumer

export default NightModeContext
