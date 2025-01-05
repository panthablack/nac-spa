import { camelCase, snakeCase } from 'lodash'

const CHANGE_CASE_FUNCTIONS = Object.freeze({
  CAMEL_CASE: camelCase,
  SNAKE_CASE: snakeCase,
})

export const canCasify = (o: any): boolean =>
  o && (Array.isArray(o) || typeof o === 'object') && !(o instanceof Blob)

const casifyArray = (a: any[], f: (s: string) => string) =>
  a.map((v: any): any => (canCasify(v) ? casify(v, f) : v))

const casifyObject = (o: any, f: (s: string) => string) =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]): [string, any] => [f(k), canCasify(v) ? casify(v, f) : v])
  )

export const casify = (o: any, f: (s: string) => string): any => {
  if (Array.isArray(o)) return casifyArray(o, f)
  else return casifyObject(o, f)
}

export const camelise = (o: any): any => casify(o, CHANGE_CASE_FUNCTIONS.CAMEL_CASE)

export const snakify = (o: any): any => casify(o, CHANGE_CASE_FUNCTIONS.SNAKE_CASE)
