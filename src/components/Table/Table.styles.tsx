"use client"

import {
  Chip,
  TableHead,
  styled,
  TableRow as BaseTableRow,
} from "@mui/material"

interface StyledChipProps {
  backgroundColor: string
  textColor?: string
}

export const StyledChip = styled(Chip)<StyledChipProps>(
  ({ backgroundColor, textColor }) => ({
    backgroundColor,
    color: textColor ?? "white",
    fontWeight: 600,
  })
)

export const TableWrapper = styled("div")(({ theme }) => ({
  borderRadius: 4,
  overflow: "hidden",
  border: `1px solid ${theme.palette.grey[300]}`,
}))

export const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,

  th: { color: theme.palette.primary.contrastText },
}))

export const TableRow = styled(BaseTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))
