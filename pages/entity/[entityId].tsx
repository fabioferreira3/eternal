import React, { createContext, useCallback } from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../util/mongodb.js';
import { profileThemes } from '../../store/states/profileImgThemes';
import { entityFields } from '../../store/states/entityFields';
import Profile from '../../components/Profile';
import {
  OptionalField,
  OptionalFieldComponent,
} from '../../store/types/entityFields';

export const EntityContext = createContext<any>({});

const Entity = ({ entity }): any => {
  const renderOptionalFields = useCallback(() => {
    const fieldComponents: OptionalFieldComponent[] = [];
    entity.optional_fields.forEach((field: OptionalField) => {
      fieldComponents.push({
        element: entityFields[field.type || 'attribute'],
        ...field,
      });
    });
    return (
      <>
        {fieldComponents.map(fieldComponentData => {
          const FieldComponent = fieldComponentData.element;
          return (
            <FieldComponent
              key={fieldComponentData.id}
              title={fieldComponentData.title}
              value={fieldComponentData.value}
            />
          );
        })}
      </>
    );
  }, [entity.optional_fields]);

  return (
    <EntityContext.Provider value={{ entity }}>
      <Profile />

      <div className="w-2/3 m-auto">
        <div className="flex flex-row justify-between">
          <span className="font-bold">Birthday</span>
          <span>{dayjs(entity.birthday).format('DD/MM/YYYY')}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-bold">Death</span>
          <span>{dayjs(entity.birthday).format('DD/MM/YYYY')}</span>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <h2 className="text-xl font-bold">Who was {entity.first_name}?</h2>
        <span>{entity.who_was}</span>
      </div>

      {entity.optional_fields.length > 0 && renderOptionalFields()}
    </EntityContext.Provider>
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
