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
    hsn: string | null;
    csn: string | null;
    overhaulNum: number | null;
    lastOverhaulDate: string | null;
    hsnAtlastOverhaul: string | null;
    csnAtlastOverhaul: string | null;
    totalLifeTime: string | null;
    totalLifeHours: string | null;
    totalLifeCycles: string | null;
    tbo: string | null;
    hbo: string | null;
    cbo: string | null;
}