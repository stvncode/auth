import { either, option, readerTaskEither } from 'fp-ts'
import { sequenceS } from 'fp-ts/lib/Apply'

export const adoEither = sequenceS(either.either)
export const adoOption = sequenceS(option.option)

export const adoReaderTaskEither = sequenceS(readerTaskEither.readerTaskEither)
