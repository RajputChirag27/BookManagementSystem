import { Document } from "mongoose";

export default interface Author extends Document{
    name : string,
    biography : string,
    nationality : string,
    books : string[]
}