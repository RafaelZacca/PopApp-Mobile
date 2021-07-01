import { apiPost } from "../supports/helpers/ApiConnection.Helper";
import UserModel from "../models/User.Model";
import AuthenticationModel from "../models/Authentication.Model";

export default function login(credential: UserModel, abortSignal: AbortSignal): Promise<AuthenticationModel> {
    return apiPost<AuthenticationModel>('/auth', credential, abortSignal);
}