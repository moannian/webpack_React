import IBase from "./base";

export default interface ILogin extends IBase {
    data: {
        token: string
    }
}