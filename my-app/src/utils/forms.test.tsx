import { checkFHFormat } from "./forms"

describe('checkFHFormat', () => {
    test('main', () => {
        expect(checkFHFormat('1000:23')).toBe(true)
    })
    test('Check mins length', () => {
        expect(checkFHFormat('1000:3')).toBe(false)
    })
    test('Check minimum hours lenght', () => {
        expect(checkFHFormat('1:30')).toBe(true)
    })
    test('Check null hours lenght ', () => {
        expect(checkFHFormat(':30')).toBe(false)
    })
    test('Check maximum hours lenth', () => {
        expect(checkFHFormat('1234567:30')).toBe(false)
    })
    test('Check valid number', () => {
        expect(checkFHFormat('12r567:30')).toBe(false)
    })
    test('Check colon exist', () => {
        expect(checkFHFormat('1256730')).toBe(false)
    })
})
