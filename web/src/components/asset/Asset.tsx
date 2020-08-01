// import { externalProductUnion } from '@libertrip/business/services/magellan/models'
// import { objectKeys } from '@libertrip/prelude/fp/object'
// import * as as from '@libertrip/prelude/io-ts/as'
// import { ReactComponent as Activity } from '@libertrip/react-extensions/asset/activity.svg'
// import { ReactComponent as AddUser } from '@libertrip/react-extensions/assets/add-user.svg'
// import { ReactComponent as ArrowPlus } from '@libertrip/react-extensions/assets/arrow-plus.svg'
// import { ReactComponent as Balloon } from '@libertrip/react-extensions/assets/balloon.svg'
// import { ReactComponent as Basket } from '@libertrip/react-extensions/assets/basket.svg'
// import { ReactComponent as Bed } from '@libertrip/react-extensions/assets/bed.svg'
// import { ReactComponent as Building } from '@libertrip/react-extensions/assets/building.svg'
// import { ReactComponent as BusAirport } from '@libertrip/react-extensions/assets/bus-airport.svg'
// import { ReactComponent as BusFilled } from '@libertrip/react-extensions/assets/bus-filled.svg'
// import { ReactComponent as Bus } from '@libertrip/react-extensions/assets/bus.svg'
// import { ReactComponent as Calendar } from '@libertrip/react-extensions/assets/calendar.svg'
// import { ReactComponent as CarSide } from '@libertrip/react-extensions/assets/car-side.svg'
// import { ReactComponent as Car } from '@libertrip/react-extensions/assets/car.svg'
// import { ReactComponent as Other } from '@libertrip/react-extensions/assets/casino.svg'
// import { ReactComponent as Climatisation } from '@libertrip/react-extensions/assets/climatisation.svg'
// import { ReactComponent as Crash } from '@libertrip/react-extensions/assets/crash.svg'
// import { ReactComponent as Dawn } from '@libertrip/react-extensions/assets/dawn.svg'
// import { ReactComponent as Destination } from '@libertrip/react-extensions/assets/destination.svg'
// import { ReactComponent as Fitness } from '@libertrip/react-extensions/assets/fitness.svg'
// import { ReactComponent as Flag } from '@libertrip/react-extensions/assets/flag.svg'
// import { ReactComponent as Guide } from '@libertrip/react-extensions/assets/guide.svg'
// import { ReactComponent as Handicap } from '@libertrip/react-extensions/assets/handicap.svg'
// import { ReactComponent as Home } from '@libertrip/react-extensions/assets/home.svg'
// import { ReactComponent as Hotel } from '@libertrip/react-extensions/assets/hotel.svg'
// import { ReactComponent as Internet } from '@libertrip/react-extensions/assets/internet.svg'
// import { ReactComponent as Location } from '@libertrip/react-extensions/assets/location.svg'
// import { ReactComponent as Lock } from '@libertrip/react-extensions/assets/lock.svg'
// import { ReactComponent as Login } from '@libertrip/react-extensions/assets/login.svg'
// import { ReactComponent as Motorbike } from '@libertrip/react-extensions/assets/moto.svg'
// import { ReactComponent as MultiDay } from '@libertrip/react-extensions/assets/multi-days.svg'
// import { ReactComponent as OtherTransport } from '@libertrip/react-extensions/assets/paper-plane.svg'
// import { ReactComponent as Parking } from '@libertrip/react-extensions/assets/parking.svg'
// import { ReactComponent as Pet } from '@libertrip/react-extensions/assets/pet.svg'
// import { ReactComponent as Generic } from '@libertrip/react-extensions/assets/picture.svg'
// import { ReactComponent as PlaneFront } from '@libertrip/react-extensions/assets/plane-front.svg'
// import { ReactComponent as Plane } from '@libertrip/react-extensions/assets/plane.svg'
// import { ReactComponent as Plus } from '@libertrip/react-extensions/assets/plus.svg'
// import { ReactComponent as Pool } from '@libertrip/react-extensions/assets/pool.svg'
// import { ReactComponent as Resort } from '@libertrip/react-extensions/assets/resort.svg'
// import { ReactComponent as Restaurant } from '@libertrip/react-extensions/assets/restaurant.svg'
// import { ReactComponent as RoomService } from '@libertrip/react-extensions/assets/room-service.svg'
// import { ReactComponent as SaveDisk } from '@libertrip/react-extensions/assets/save-disk.svg'
// import { ReactComponent as Saved } from '@libertrip/react-extensions/assets/saved.svg'
// import { ReactComponent as Ship } from '@libertrip/react-extensions/assets/ship.svg'
// import { ReactComponent as Spa } from '@libertrip/react-extensions/assets/spa.svg'
// import { ReactComponent as Station } from '@libertrip/react-extensions/assets/station.svg'
// import { ReactComponent as Television } from '@libertrip/react-extensions/assets/television.svg'
// import { ReactComponent as Template } from '@libertrip/react-extensions/assets/template.svg'
// import { ReactComponent as Thermal } from '@libertrip/react-extensions/assets/thermal.svg'
// import { ReactComponent as ThinMoon } from '@libertrip/react-extensions/assets/thin-moon.svg'
// import { ReactComponent as TrainFilled } from '@libertrip/react-extensions/assets/train-filled.svg'
// import { ReactComponent as TrainPlane } from '@libertrip/react-extensions/assets/train-plane.svg'
// import { ReactComponent as Train } from '@libertrip/react-extensions/assets/train.svg'
// import { ReactComponent as Transfer } from '@libertrip/react-extensions/assets/travel.svg'
// import { ReactComponent as TripAdvisor } from '@libertrip/react-extensions/assets/tripadvisor.svg'
// import { ReactComponent as User1 } from '@libertrip/react-extensions/assets/user-1.svg'
// import { ReactComponent as User2 } from '@libertrip/react-extensions/assets/user-2.svg'
// import { ReactComponent as User3Plus } from '@libertrip/react-extensions/assets/user-3-plus.svg'
// import { ReactComponent as User3 } from '@libertrip/react-extensions/assets/user-3.svg'
// import { ReactComponent as Walk } from '@libertrip/react-extensions/assets/walk.svg'
// import { fontSizedSvg, SVGProps } from '@libertrip/react-extensions/framework/asset/Asset'
// import * as t from 'io-ts'
// import * as React from 'react'

// interface Props extends SVGProps {
//   name: AssetType
// }

// export type TransportPickerIcons = 'PlaneFront' | 'Transfer' | 'Car' | 'Ship' | 'Train'

// export type UserIcons = 'User1' | 'User2' | 'User3' | 'User3Plus'

// const AmenityCodes = {
//   CLIM: true,
//   HANDICAP: true,
//   INTERNET: true,
//   PARKING: true,
//   RESTAURANT: true,
//   POOL: true,
//   TELEVISION: true,
//   ROOM_SERVICE: true,
//   THERMAL: true,
//   SPA: true,
//   FITNESS: true,
//   PET: true
// }
// export const amenityCodes: Array<AmenityCode> = objectKeys(AmenityCodes)

// type AmenityCodes = typeof AmenityCodes
// export type AmenityCode = keyof AmenityCodes

// export const AmenityCode = as.asMixed<AmenityCode>(t.keyof(AmenityCodes))

// export type AmenityIcons =
//   | 'Climatisation'
//   | 'Pet'
//   | 'Pool'
//   | 'Restaurant'
//   | 'Internet'
//   | 'Handicap'
//   | 'Parking'
//   | 'Spa'
//   | 'Television'
//   | 'Thermal'
//   | 'Fitness'
//   | 'RoomService'

// export const amenityCodeToAssetName = (p: AmenityCode): AmenityIcons => {
//   switch (p) {
//     case 'CLIM':
//       return 'Climatisation'
//     case 'PET':
//       return 'Pet'
//     case 'POOL':
//       return 'Pool'
//     case 'RESTAURANT':
//       return 'Restaurant'
//     case 'INTERNET':
//       return 'Internet'
//     case 'HANDICAP':
//       return 'Handicap'
//     case 'PARKING':
//       return 'Parking'
//     case 'SPA':
//       return 'Spa'
//     case 'TELEVISION':
//       return 'Television'
//     case 'THERMAL':
//       return 'Thermal'
//     case 'FITNESS':
//       return 'Fitness'
//     case 'ROOM_SERVICE':
//       return 'RoomService'
//   }
// }

// const icons = {
//   Activity,
//   AddUser,
//   Basket,
//   Calendar,
//   Destination,
//   Hotel,
//   Location,
//   Lock,
//   SaveDisk,
//   Saved,
//   ThinMoon,
//   User1,
//   User2,
//   User3,
//   User3Plus,
//   Walk,
//   TripAdvisor,
//   Climatisation,
//   Pet,
//   Pool,
//   Restaurant,
//   Internet,
//   Handicap,
//   Parking,
//   Spa,
//   Television,
//   Thermal,
//   Fitness,
//   RoomService,
//   Car,
//   Train,
//   Transfer,
//   Ship,
//   Plane,
//   PlaneFront,
//   Guide,
//   Motorbike,
//   Generic,
//   Other,
//   OtherTransport,
//   TrainPlane,
//   Bed,
//   Balloon,
//   BusAirport,
//   Flag,
//   Station,
//   Home,
//   Dawn,
//   CarSide,
//   ArrowPlus,
//   Plus,
//   Building,
//   MultiDay,
//   TrainFilled,
//   Bus,
//   BusFilled,
//   Resort,
//   Template,
//   Crash,
//   Login
// }

// export type AssetType = keyof typeof icons

// const apply = <O extends {}>(o: O) => (f: (v: O[keyof typeof o]) => O[keyof typeof o]): O => {
//   const res = {} as O
//   for (const key in o) {
//     if (o.hasOwnProperty(key)) {
//       res[key] = f(o[key]) as O[Extract<keyof O, string>]
//     }
//   }
//   return res
// }

// const fontSizedIcons = apply(icons)(fontSizedSvg)

// export const Asset: React.FC<Props> = props => {
//   const { name, ...rest } = props
//   const Val = icons[name]
//   return <Val {...rest} />
// }

// export const AssetIcon: React.FC<Props> = props => {
//   const { name, ...rest } = props
//   const Val = fontSizedIcons[name]
//   return <Val {...rest} />
// }

// export const getExternalProductAsset = externalProductUnion.match<AssetType>({
//   Activity: _ => 'Activity',
//   Boat: _ => 'Ship',
//   Bus: _ => 'Bus',
//   Ferry: _ => 'Ship',
//   Flight: _ => 'PlaneFront',
//   FlightWithTrain: _ => 'TrainPlane',
//   Guide: _ => 'Guide',
//   Hotel: _ => 'Hotel',
//   Other: _ => 'Other',
//   OtherTransportation: _ => 'Walk',
//   RentalCar: _ => 'Car',
//   RentalMotorbike: _ => 'Motorbike',
//   Train: _ => 'Train',
//   Transfer: _ => 'Transfer'
// })

import * as React from 'react'

interface Props {
  name: string
}

export const AssetIcon: React.FC<Props> = ({ name }) => {
  void name
  return <div></div>
}

// TODO: Arrange AssetIcon (svg import doesn't work)
