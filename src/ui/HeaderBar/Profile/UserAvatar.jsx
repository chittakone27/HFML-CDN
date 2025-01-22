import cx from "classnames";
import React from "react";
import ImageAvatar from "./ImageAvatar";
import TextAvatar from "./TextAvatar";

/**
An avatar is a visual icon that represents a user.

Use an avatar to give extra information when a user is mentioned or displayed in DHIS2. The avatar shows a user uploaded photograph or initials. The avatar is intended to give context and help to identify different users. An avatar is usually shown alongside the user name, but can be used alone to show a visual hint of a user.

See specification: [Design System](https://github.com/dhis2/design-system/blob/master/atoms/avatar.md)

```js
import { UserAvatar } from '@dhis2/ui'
```
*/

const UserAvatar = ({ name, avatarId, className, dataTest, extralarge, extrasmall, large, medium, small, baseUrl }) => (
  <div
    className={cx("headerbar-useravatar", {
      extrasmall,
      small,
      medium,
      large,
      extralarge
    })}
  >
    {avatarId ? (
      <ImageAvatar avatarId={avatarId} dataTest={`${dataTest}-image`} baseUrl={baseUrl} />
    ) : (
      <TextAvatar
        name={name}
        dataTest={`${dataTest}-text`}
        extrasmall={extrasmall}
        small={small}
        medium={medium}
        large={large}
        extralarge={extralarge}
      />
    )}
  </div>
);

export default UserAvatar;
