import { Card } from "@mui/material"
import { PropsWithChildren } from "react"

const CardWrapper = ({ children }: PropsWithChildren) => (
  <Card sx={{ paddingX: 5, paddingY: 2 }}>{children}</Card>
)

export default CardWrapper
