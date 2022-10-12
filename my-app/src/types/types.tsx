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