import React from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../util/mongodb.js';

const Entity: React.FC<any> = ({ entity }): any => {
  console.log(entity, 'entity');
  return (
    <>
      <h1>{entity.full_name}</h1>
      <h2>{entity.birthday}</h2>
    </>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
  const { db } = await connectToDatabase();
  const response = await db.collection('users').find({}).limit(20).toArray();
  const users = JSON.parse(JSON.stringify(response));
  const paths = users.map(user => {
    return { params: { entityId: user._id } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}): Promise<GetStaticPropsResult<any>> {
  const { db } = await connectToDatabase();

  const entity = await db
    .collection('users')
    .findOne({ _id: ObjectId(params.entityId) });

  return {
    props: { entity: JSON.parse(JSON.stringify(entity)) },
  };
}

export default Entity;
