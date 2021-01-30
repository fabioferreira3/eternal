import { GetStaticPropsResult } from 'next';
import { connectToDatabase } from '../util/mongodb.js';

export default function Home({ users }): any {
  return users.map(user => <h1 key={user._id}>{user.full_name}</h1>);
}

export async function getServerSideProps(): Promise<GetStaticPropsResult<any>> {
  const { db } = await connectToDatabase();

  const users = await db.collection('users').find({}).limit(20).toArray();

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}
