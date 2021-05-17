import { atom } from 'recoil'

export const themeState = atom({
    key: 'themeState',
    default: true,
})

export const homeDetailsState = atom({
    key: 'homeDetailsState',
    default: {data: {}, people: [], url: ''},
})

export const selectedHomeState = atom({
    key: 'selectedHomeState',
    default: {url: ''},
})

export const mobileViewState = atom({
    key: 'mobileViewState',
    default: false,
})