import React from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../util/mongodb.js';

const Entity: React.FC<any> = ({ entity }): any => {
  const renderOptionalFields = (): [] => {
    const fields: any = [];
    Object.keys(entity.optional_fields).forEach(function (key) {
      Object.keys(entity.optional_fields[key]).forEach(function (fieldName) {
        fields.push(
          <>
            <h3>
              {`${fieldName} : ${entity.optional_fields[key][fieldName]}`}
            </h3>
          </>
        );
      });
    });
    return fields;
  };

  return (
    <>
      {/* <Image */}
      {/*  src={`/assets/img/profiles/${entity.background_top_img}`} */}
      {/*  alt="Picture of the author" */}
      {/*  width={400} */}
      {/*  height={500} */}
      {/* /> */}
      <div className="flex flex-col items-center">
        <Image
          className="rounded-full"
          src={`/assets/img/profiles/${entity.profile_img}`}
          alt="Picture of the author"
          width={168}
          height={168}
        />
        <h1>{entity.full_name}</h1>
      </div>

      <h2>Birthday: {dayjs(entity.birthday).format('DD/MM/YYYY')}</h2>
      <h2>Death: {dayjs(entity.death_date).format('DD/MM/YYYY')}</h2>
      <h2>Who was {entity.first_name}?</h2>
      <span>{entity.who_was}</span>
      {entity.optional_fields.length > 0 && renderOptionalFields()}
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
