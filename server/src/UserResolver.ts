import {Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx} from 'type-graphql'
import { User } from './entity/User'
import {hash, compare} from 'bcryptjs'
import { MyContext } from './MyContext'
import { createAccessToken, createRefreshToken } from './auth'

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return 'hi!'
    }

    @Query(() => [User] )
    users() {
        return User.find()
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {

        const user = await User.findOne({ where: {email}})

        if(!user) {
            throw new Error('could not find user')
        }

        const validPassword = await compare(password, user.password)

        if(!validPassword) {
            throw new Error('bad password')
        }
        
        //login successful

        res.cookie('jid', createRefreshToken(user) , {httpOnly: true})

        return {
            accessToken: createAccessToken(user)
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {

        const hashedPassword = await hash(password, 12)
        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        }
        catch (err) {
            console.log(err)
            return false
        }
            return true
    }
    
}