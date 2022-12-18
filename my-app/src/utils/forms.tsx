import { IInstEngine } from "../store/reducers/aircraftReducer";

export const checkFHFormat = (str = ''): boolean => {
    const num = parseInt(str.replace(/[^\d]/g, ''))
    if (num.toString().length !== str.length-1) return false
    if (str[str.length - 3] !== ':') return false;
    if (str[str.length - 2] > '5') return false;
    if (str.length < 4) return false
    if (typeof +str[str.length - 4] !== "number") return false
    if (str.length > 9) return false;
    return true
}

export const subtractFH = (from: string | null | undefined, to: string | null | undefined): string => {
    const strToMM = (timeStr: string): number => {
        const tempArr = timeStr.split(":");
        const hh: number = +tempArr[0] * 60;
        const mm: number = +tempArr[1];
        return hh + mm
    }
    const mmToStr = (value: number): string => {
        const hh: number = Math.floor(value / 60);
        const mm: number = Math.abs(value % 60);
        return `${hh}:${mm}`
    }
    if (from && to) {
        const tsnNum = strToMM(from);
        const tsnAtlastOverhaulNum = strToMM(to);
        return mmToStr(tsnNum - tsnAtlastOverhaulNum);
    } else {
        return '';
    }
}

export const summFH = (value1: string | null | undefined, value2: string | null | undefined): string => {
    const strToMM = (timeStr: string): number => {
        const tempArr = timeStr.split(":");
        const hh: number = +tempArr[0] * 60;
        const mm: number = +tempArr[1];
        return hh + mm
    }
    const mmToStr = (value: number): string => {
        const hh: number = Math.floor(value / 60);
        const mm: number = Math.abs(value % 60);
        return `${hh}:${mm}`
    }

    if (value1 && value2) {
        const value1MM = strToMM(value1);
        const value2MM = strToMM(value2);
        return mmToStr(value1MM + value2MM);
    }
    return '';
}

export const summFC = (value1: string | null, value2: string | null) => {
    if (value1 && value2) {
        return (+value1 + +value2).toString();
    }
    return '';
}

export const subtractFC = (from: string | null | undefined, to: string | null | undefined): string => {
    if (from && to) {
        return `${+from - +to}`
    }
    return '';
}

export const subtractDatesFromNow = (from: string | null | undefined): string => {
    if (from) {
        const fromDate = new Date(from);
        const currentDate = new Date();
        const ms = +fromDate - +currentDate;
        const days = Math.ceil(ms / 1000 / 3600 / 24);
        return `${days}`;
    }
    return '';
}
export const subtractDatesNowFrom = (from: string | null | undefined): string => {
    if (from) {
        const fromDate = new Date(from);
        const currentDate = new Date();
        const ms = +currentDate - +fromDate;
        const days = Math.ceil(ms / 1000 / 3600 / 24);
        return `${days}`;
    }
    return '';
}
export const subtractDatesFromTo = (from: string | null | undefined, to: string | null | undefined): string => {
    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const ms = +fromDate - +toDate;
        const days = Math.ceil(ms / 1000 / 3600 / 24);
        return `${days}`;
    }
    return '';
}

export const setEngine = (pos: number, engines: IInstEngine[]): string | undefined => {
    if (pos && engines.length > 0) {
        const eng = engines.find(e => e.pos === pos);
        if (eng) return eng.msn.toString();
    }
    return undefined;
}

