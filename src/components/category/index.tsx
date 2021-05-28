import { FC } from "react"

type Prop = {
  param?: boolean
}

const Category: FC<Prop> = (props) => {
  return (
    <>
      <h3>This is category</h3>
    </>
  )
}

export default Category
