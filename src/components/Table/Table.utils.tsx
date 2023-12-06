import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { StyledChip } from "./Table.styles"
import { TableCell } from "@/types"
import { assertUnreachable } from "@/utils"

export const getCell = (cell: TableCell) => {
  switch (cell.type) {
    case "labeled-chip": {
      const { chipColor, text, textColor } = cell
      return (
        <StyledChip
          label={text}
          backgroundColor={chipColor}
          textColor={textColor}
        />
      )
    }
    case "text-cell": {
      const { value } = cell
      return <Typography>{value}</Typography>
    }
    case "buttons-cell": {
      const { buttons } = cell
      return (
        <Stack direction="row" gap={1}>
          {buttons.map((button, index) => {
            if (!button) return <></>
            const { Icon, label, onClick } = button

            return (
              <Tooltip key={`${label}-${index}`} title={label}>
                <IconButton onClick={onClick} sx={{ padding: 1 }}>
                  <Icon />
                </IconButton>
              </Tooltip>
            )
          })}
        </Stack>
      )
    }
    default:
      return assertUnreachable(cell)
  }
}
