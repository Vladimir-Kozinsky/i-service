export interface IUser {
    _id: string | null,
    email: string | null,
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    position: string | null;
}

export interface IAuthState {
    user: IUser;
    isAuth: boolean;
    isAuthError: boolean;
    isSuccessMessage: boolean;
    isSignUpError: boolean;
    signUpErrorMessage: string;
}

export interface IEngine {
    _id?: string | null;
    type: string | null;
    msn: string | null;
    manufDate: string | null;
    tsn: string | null;
    csn: string | null;
    onAircraft: string | null;
    position: number | null;
    installDate: string | null;
    aircraftTsn: string | null;
    aircraftCsn: string | null;
    engTsn: string | null;
    engCsn: string | null;
    overhaulNum: number | null;
    lastOverhaulDate: string | null;
    tsnAtlastOverhaul: string | null;
    csnAtlastOverhaul: string | null;
    tlp: string | null;
    tlt: string | null;
    tlc: string | null;
    pbo: string | null;
    tbo: string | null;
    cbo: string | null;
}