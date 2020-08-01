import { rgb, rgba } from 'csx'
import * as antTheme from './theme.json'

const fromAnt = {
  primary: antTheme['@primary-color'],
  primary5: antTheme['@primary-5'],
  normal: antTheme['@normal-color'],
  bodyBackground: '#fff',
  componentBackground: '#fff'
}

const transparentBackground = {
  darkTransparentBg: rgba(0, 0, 0, 0.4).toString()
}

export const palette = {
  ...fromAnt,
  ...transparentBackground,
  lightGreen: '#60ccbe',
  greenHover: '#4edecb',
  green: '#28d1c1',
  darkPrimaryGreen: '#21a99c',
  darkGreen: '#47968c',
  availableGreen: '#5cb85c',
  yellow: '#ffd92c',
  pink: '#ff9ab7',
  orange: '#ffaf26',
  darkGray: '#3e3e3e',
  gray: '#bdc3c7',
  ultraLightGreen: '#e4fffc',
  mediumGray: 'gray',
  ultraLightGray: '#efefef',
  lightGray: '#cecece',
  blackGray: '#3a3a3a',
  thinGray: '#ededed',
  whiteGray: '#fbfbfb',
  lightBlue: '#f0fbff',
  mediumBlue: '#5bc0de',
  red: '#f5222d',
  blue: '#6fb5de',
  blueMultiDay: '#9eedff',
  blueHotel: rgb(43, 134, 188).toString()
}

export const availabilityPalette = {
  loading: palette.lightGray,
  onRequest: palette.orange,
  available: palette.primary,
  unavailable: palette.red,
  unknown: palette.gray,
  unsuitable: palette.darkGray
}

export const bookingStatusPalette = {
  booked: palette.green,
  bookRequested: palette.orange
}
