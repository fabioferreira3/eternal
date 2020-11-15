import { connectToDatabase } from '../util/mongodb'

export default function Home({ users }) {

  return (
    users.map((user) => <h1>{user.name}</h1>)
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  const users = await db.collection("users").find({}).limit(20).toArray();

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  }
}
