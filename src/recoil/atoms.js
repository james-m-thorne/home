import { atom } from 'recoil'
import { PEOPLE } from '../constants/constants'

export const themeState = atom({
    key: 'themeState',
    default: true,
})

export const homesState = atom({
    key: 'homesState',
    default: [],
})

export const peopleState = atom({
    key: 'peopleState',
    default: PEOPLE,
})

export const homeRoutesState = atom({
    key: 'homeRoutesState',
    default: [],
})

export const homeDetailsState = atom({
    key: 'homeDetailsState',
    default: {data: {}, url: ''},
})

export const selectedHomeState = atom({
    key: 'selectedHomeState',
    default: {url: ''},
})

export const mobileViewState = atom({
    key: 'mobileViewState',
    default: false,
})