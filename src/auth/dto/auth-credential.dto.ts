import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto{

    @IsString()
    @MinLength(4)
    @MaxLength(8)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Password is too weak"})
    password: string;
}