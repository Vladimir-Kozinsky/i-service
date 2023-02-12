import { calcTime } from "./AddLegForm";

describe('calcTime func', ()=> {
    test('main', () => {
        expect(calcTime('2023-02-02','11:11', '11:12')).toBe('00:01')
    })
    test('check if endTime is on next date', () => {
        expect(calcTime('2023-02-02','23:11', '00:10')).toBe('00:59')
    })
    test('check if time period 0', () => {
        expect(calcTime('2022-01-02','23:11', '23:11')).toBe('00:00')
    })
})


describe('calcTime func', ()=> {
    test('main', () => {
        expect(calcTime('2023-02-02','11:11', '11:12')).toBe('00:01')
    })
    test('check if endTime is on next date', () => {
        expect(calcTime('2023-02-02','23:11', '00:10')).toBe('00:59')
    })
    test('check if time period 0', () => {
        expect(calcTime('2022-01-02','23:11', '23:11')).toBe('00:00')
    })
})