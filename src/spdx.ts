import spdxParse from 'spdx-expression-parse'
import {satisfies as spdxSatisfies} from '@onebeyond/spdx-license-satisfies'

// TODO: we probably want to handle `OTHER` and `NOASSERTION` here too
export function satisfies(license: string, expr: string): boolean {
  return spdxSatisfies(license, expr)
}

export function isValid(license: string): boolean {
  try {
    spdxParse(license)
    return true
  } catch (e) {
    // make a note in the log if the exception
    // was caused by the expression parser, this
    // usually means a discrepancy in ESM/CJS.
    if (e instanceof TypeError) {
      throw new Error('spdx: invalid expression parser')
    }

    return false
  }
}
