const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb')
var q = faunadb.query;

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Mutation{
    addBookmark(title:String!,url:String!):Bookmark
  }
  type Bookmark {
    id: ID!
    title: String!
    url: String!
  }
`

const authors = [
  { id: 1, name: 'Terry Pratchett', married: false },
  { id: 2, name: 'Stephen King', married: true },
  { id: 3, name: 'JK Rowling', married: false },
]

const resolvers = {
  Query: {
    bookmarks: async() => {
      try{
        var adminClient = new faunadb.Client({ secret: 'fnAEsBKNBBACSZyiWM4mY4u6771eSZIN9dUxpx_0' });
        const result=await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('url'))),
            q.Lambda(x=>q.Get(x))
          )
        )
        return result.data.map(d=>{
          return {
            id:d.ts,
            title:d.data.title,
            url:d.data.url
          }
        })
        return [{
          id:1,
          title:"fddf",
          url:"dfdf"
        }]
      }
      catch(err){
        console.log(err)
      }
    },
  },
  Mutation:{
    addBookmark:async(_,{title,url})=>{
      const adminClient=new faunadb.Client({ secret: 'fnAEsBKNBBACSZyiWM4mY4u6771eSZIN9dUxpx_0' });
      const result=await adminClient.query(
        q.Create(
          q.Collection('bookmarks'),
          {data:{title:title,url:url}}
        )
      )
      console.log(result)
      return result.ref.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
