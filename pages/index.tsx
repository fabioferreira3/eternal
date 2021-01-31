import React from 'react';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { connectToDatabase } from '../util/mongodb.js';

const Home: React.FC<any> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <Link key={user._id} href={`/entity/${user._id}`}>
          <li>
            <button type="button">{user.full_name}</button>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export async function getServerSideProps(): Promise<GetStaticPropsResult<any>> {
  const { db } = await connectToDatabase();

  const users = await db.collection('users').find({}).limit(20).toArray();

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}

export default Home;
