const graphql = require("graphql");
const { GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: GraphQLString },
        tokenLength: { type: GraphQLInt }
    })
});

function makeToken(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        isLogin: {
            type: UserType,
            args: {
                login: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const users = [
                    { login: "admin", password: "admin" },
                    { login: "admin", password: "123456" }
                ];
                let isUser = [];

                isUser = users.filter(user => user.login === args.login && user.password === args.password);

                if(isUser.length > 0) {
                    const generate = makeToken(32);

                    console.log(`User ${args.login} is correct!`);

                    return {
                        token: generate,
                        tokenLength: generate.length
                    };
                }

                console.error(`User ${args.login} is in-correct!`);
                throw new Error("Login or Password incorrect!");
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
});