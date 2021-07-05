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

export const drawerOpenState = atom({
  key: 'drawerOpenState',
  default: false,
})

export const filterHomeState = atom({
  key: 'filterHomeState',
  default: {
    min_price: 0,
    max_price: 1500000,
    min_bedrooms: 1,
    max_bedrooms: 5,
    min_bathrooms: 1,
    max_bathrooms: 5,
    min_carparks: 1,
    max_carparks: 5,
  },
})

export const userDataState = atom({
  key: 'userDataState',
  default: {
    idToken: '',
    email: ''
  }
})