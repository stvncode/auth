import { makeLogger } from '../prelude/logger/logger'

export const logger = makeLogger(process.env.NODE_ENV !== 'production')
