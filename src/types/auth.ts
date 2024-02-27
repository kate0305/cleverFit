import { UserReq } from "./service";

export type SingInFormData = UserReq & {
    remember: boolean;
};
