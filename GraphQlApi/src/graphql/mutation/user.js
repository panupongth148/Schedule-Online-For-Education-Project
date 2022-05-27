import { schemaComposer } from "graphql-compose";

import { UserModel, UserTC } from "../../models/user";
import { generateUserToken } from '../../lib/generateUserToken'

export const createUser = UserTC.getResolver("createOne");

const LoginPayloadOTC = schemaComposer.createObjectTC({
    name: "LoginPayload",
    fields: {
        status: "String!",
        message: "String!",
        token: 'String'
    },
});

export const login = schemaComposer.createResolver({
    name: "login",
    kind: "mutation",
    type: LoginPayloadOTC,
    args: {
        username: "String!",
        password: "String!",
    },
    resolve: async ({ args }) => {
        const { username, password } = args;
        const user = await UserModel.findOne({ username: username.toLowerCase() });
        const validPassword = await user.verifyPassword(password);

        if (!user || !validPassword) {
            return {
                status: "failed",
                message: "Username or Password is incorrect",
                token: null
            };
        }

        const token = generateUserToken(user)
        return {
            status: 'success',
            message: 'Login success',
            token,
        }
    },
});

export const deleteUserId = UserTC.getResolver("removeById");
