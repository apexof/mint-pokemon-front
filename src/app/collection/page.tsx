import React, { FC } from "react";

type Props = { qwe?: string };

const Collection: FC<Props> = (props) => {
  const { qwe } = props;

  return <div>Collection</div>;
};

export default Collection;
