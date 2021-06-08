import { FC } from 'react';

import CategoryWithParam from '../category-with-param';

type Param = {
  [key: string]: string
}

type Prop = {
  param?: boolean,
  type: Param | null
}

const Category: FC<Prop> = ({type}) => {

  return (
    <>
      {
        type !== null ? <CategoryWithParam type={type.type} /> : <h2>Invalid! 404</h2> 
      }
    </>
  )
}

export default Category
