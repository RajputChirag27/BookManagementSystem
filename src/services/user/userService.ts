import { injectable } from "inversify";
import { User } from "../../interfaces";


@injectable()
export default class UserService {

    async signup(user : User) {
        return 0;
    }
}