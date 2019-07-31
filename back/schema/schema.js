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

                isUser = users.filter(user => {
                    console.log("User is correct? - ",
                        user.login === args.login && user.password === args.password ? "Yes" : "No"
                    );

                    return user.login === args.login && user.password === args.password
                });

                if(isUser.length > 0) {
                    const generate = makeToken(32);

                    return {
                        token: generate,
                        tokenLength: generate.length
                    };
                }

                throw new Error("Login or Password incorrect!");
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
});