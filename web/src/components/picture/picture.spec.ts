// import { none, some } from 'fp-ts/lib/Option'
// import { shouldResize } from './picture.utils'

// describe('Picture spec', () => {
//   it('Should resize', () => {
//     expect(shouldResize(none, { width: 100, height: 100 })).toBe(true)
//     expect(shouldResize(some({ width: 50, height: 50 }), { width: 100, height: 100 })).toBe(true)
//     expect(shouldResize(some({ width: 80, height: 50 }), { width: 100, height: 100 })).toBe(true)
//   })
//   it('Should not resize', () => {
//     expect(shouldResize(none, { width: 0, height: 0 })).toBe(false)
//     expect(shouldResize(some({ width: 50, height: 50 }), { width: 0, height: 0 })).toBe(false)
//     expect(shouldResize(some({ width: 80, height: 80 }), { width: 100, height: 100 })).toBe(false)
//     expect(shouldResize(some({ width: 100, height: 100 }), { width: 80, height: 80 })).toBe(false)
//   })
// })
