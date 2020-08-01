import { Monoid } from 'fp-ts/lib/Monoid'

export interface SheetSize {
  /** Absolute width of a sheet in millimeter */
  width: number
  /** Absolute height of a sheet in millimeter */
  height: number
}

interface PictureSizeByRelativeWidth {
  /** Represents a percentage of a reference width */
  width: number
  /** A strictly positive number representing the picture aspect ratio */
  ratio: number
}
interface PictureSizeByRelativeHeight {
  /** Represents a percentage of a reference height */
  height: number
  /** A strictly positive number representing the picture aspect ratio */
  ratio: number
}
interface PictureSizeByRelativeSize {
  /** Represents a percentage of a reference width */
  width: number
  /** Represents a percentage of a reference height */
  height: number
}

export type PictureSize =
  | PictureSizeByRelativeWidth
  | PictureSizeByRelativeHeight
  | PictureSizeByRelativeSize

const isPictureSizeByRelativeSize = (ps: PictureSize): ps is PictureSizeByRelativeSize =>
  !ps.hasOwnProperty('ratio')

const isPictureSizeByRelativeWidth = (ps: PictureSize): ps is PictureSizeByRelativeWidth =>
  ps.hasOwnProperty('width') && ps.hasOwnProperty('ratio')

export const optimizePictureUrl = (ss: SheetSize) => (
  pictureUrl: string,
  ps: PictureSize
): string => {
  if (isPictureSizeByRelativeSize(ps)) {
    return toUrl(toPixelSize(ss, ps), pictureUrl)
  } else {
    if (isPictureSizeByRelativeWidth(ps)) {
      return toUrl(
        toPixelSizeFromBaseLength(ss.width, { width: ps.width, height: ps.width / ps.ratio }),
        pictureUrl
      )
    } else {
      return toUrl(
        toPixelSizeFromBaseLength(ss.height, { height: ps.height, width: ps.height * ps.ratio }),
        pictureUrl
      )
    }
  }
}

const toPixelSizeFromBaseLength = (baseLength: number, ps: PictureSizeByRelativeSize): Size => ({
  width: Math.round(scaleToPixel(baseLength, ps.width)),
  height: Math.round(scaleToPixel(baseLength, ps.height))
})

const toPixelSize = (ss: SheetSize, ps: PictureSizeByRelativeSize): Size => ({
  width: Math.round(scaleToPixel(ss.width, ps.width)),
  height: Math.round(scaleToPixel(ss.height, ps.height))
})

/**
 * @param sheetLength in millimeter
 * @param pictureLength a percentage of sheetLength
 */
export const scaleToPixel = (sheetLength: number, pictureLength: number) =>
  (toPixelLength(sheetLength) * pictureLength) / 100

/**
 * @param length in millimeter
 */
export const toPixelLength = (length: number): number => (length * 960) / 254

export interface Size {
  width: number
  height: number
}
export const monoidSize: Monoid<Size> = {
  empty: { width: 0, height: 0 },
  concat: (x, y) => ({ width: x.width + y.width, height: x.height + y.height })
}

// const toUrl = (_ps: Size, pictureUrl: string): string => pictureUrl

export const toUrl = (ps: Size, pictureUrl: string): string =>
  `https://res.cloudinary.com/libertrip/image/fetch/f_auto,q_auto,g_auto,dpr_2.0/if_w_gt_${ps.width -
    ps.width / 2}/w_${ps.width},h_${ps.height},c_fill/if_else/w_${ps.width},h_${
    ps.height
  },c_pad/if_end/${encodeURIComponent(pictureUrl)}`

const regexToUrl = /^http(s)?:\/\/res.cloudinary.com\/djvactfsk\/image\/upload\/.*\/v1\//i
export const toUrlMagellan = (ps: Size, pictureUrl: string): string => {
  const artifactRatio = Math.round(ps.width / 1.2)
  const optimization = `f_auto,dpr_auto/if_w_gt_${artifactRatio}/w_${ps.width},h_${ps.height},c_fill,q_auto:best,g_auto/if_else/w_${ps.width},h_${ps.height},c_mpad,b_auto:border,q_auto:best/if_end`

  if (pictureUrl.match(regexToUrl)) {
    return pictureUrl.replace(
      regexToUrl,
      `//res.cloudinary.com/djvactfsk/image/upload/${optimization}/v1\/`
    )
  } else {
    return `//res.cloudinary.com/libertrip/image/fetch/${optimization}/${pictureUrl}`
  }
}

const PRECISION = 100

export const standardizeSize = ({ width, height }: Size): Size => {
  if (width === 0 || height === 0) {
    return monoidSize.empty
  } else {
    const ratio = width / height
    const upperWidth = Math.ceil(width / PRECISION) * PRECISION
    const upperHeight = Math.round(upperWidth / ratio)
    return { width: upperWidth, height: upperHeight }
  }
}
