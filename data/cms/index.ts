import landingPageData from './pages/landing.json'
import settingsData from './settings.json'
import shopData from './pages/shop.json'

export const landing = landingPageData
export const settings = settingsData
export const shop = shopData

export type Settings = typeof settings
export type Landing = typeof landing
export type Shop = typeof shop
