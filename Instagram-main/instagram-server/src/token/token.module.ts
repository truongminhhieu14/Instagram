import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    controllers: [],
    providers: [TokenService]
})
export class TokenModule{

}