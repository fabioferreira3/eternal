import React, { useContext } from 'react';

import { EntityContext } from '../../pages/entity/[entityId]';
import { profileThemes } from '../../store/states/profileImgThemes';

const Profile = () => {
  const { entity } = useContext(EntityContext);
  const Component = profileThemes[entity.settings.profile_theme];
  return <Component />;
};

export default Profile;
