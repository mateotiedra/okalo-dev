import { ReactComponent as Deskop1 } from './deskop/blob-scene-1.svg';
import { ReactComponent as Deskop2 } from './deskop/blob-scene-2.svg';
import { ReactComponent as Deskop3 } from './deskop/blob-scene-3.svg';

import { ReactComponent as Mobile1 } from './mobile/blob-scene-1.svg';
import { ReactComponent as Mobile2 } from './mobile/blob-scene-2.svg';
import { ReactComponent as Mobile3 } from './mobile/blob-scene-3.svg';

const BlobSceneSvg = (name) => {
  const svg = {
    deskop1: Deskop1,
    deskop2: Deskop2,
    deskop3: Deskop3,
    deskop4: Deskop4,
    deskop5: Deskop5,
    mobile1: Mobile1,
    mobile2: Mobile2,
    mobile3: Mobile3,
    mobile4: Mobile4,
    mobile5: Mobile5,
  };

  return svg[name];
};

export default BlobSceneSvg;
