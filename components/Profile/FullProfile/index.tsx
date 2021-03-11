import React, { useContext } from 'react';
import Image from 'next/image';

import { EntityContext } from '../../../pages/entity/[entityId]';

const FullProfile = () => {
  const { entity } = useContext(EntityContext);
  return (
    <div className="flex flex-col">
      <div className="mb-4 h-80 position: relative">
        <Image
          src={`/assets/img/profiles/${entity.profile_img}`}
          alt="Picture of the author"
          layout="fill"
        />
      </div>
      <div className="mb-4">
        <h1 className="text-lg">{entity.full_name}</h1>
      </div>
    </div>
  );
};

export default FullProfile;
