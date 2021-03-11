import React, { useContext } from 'react';
import Image from 'next/image';

import { EntityContext } from '../../../pages/entity/[entityId]';

const ClassicProfile = () => {
  const { entity } = useContext(EntityContext);
  return (
    <div className="xl:mx-auto xs:p-8">
      <Image
        className="rounded-full"
        src={`/assets/img/profiles/${entity.profile_img}`}
        alt="Picture of the author"
        width={168}
        height={168}
      />
    </div>
  );
};

export default ClassicProfile;
