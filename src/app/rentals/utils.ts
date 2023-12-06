import { ModeEdit, Delete, Undo } from "@mui/icons-material"
import { format } from "date-fns"
import axios from "axios"
import { useMemo } from "react"
import { Rental, RowConfig, SetState } from "@/types"

export const useTableConfiguration = (
  setRefetch: SetState<boolean>,
  data?: Rental[]
) => {
  const columns = [
    "Imie",
    "Nazwisko",
    "Tytuł",
    "Data wypożyczonia",
    "Planowany zwrot",
    "Data zwrotu",
    "Akcje",
  ]

  const onDelete = async (id: string) => {
    await axios.delete("http://localhost:3001/rentals", { data: { id } })
    setRefetch(true)
  }

  const onReturn = async (id: string) => {
    await axios.post("http://localhost:3001/rentals/returnMovie", { id })
    setRefetch(true)
  }

  const rows = useMemo(
    () =>
      data
        ? data?.map<RowConfig>(
            ({
              _id,
              movie,
              name,
              rentedAt,
              shouldReturn,
              surname,
              realReturn,
            }) => ({
              cells: [
                {
                  type: "text-cell",
                  value: name,
                },
                {
                  type: "text-cell",
                  value: surname,
                },
                {
                  type: "text-cell",
                  value: movie,
                },
                {
                  type: "text-cell",
                  value: format(new Date(rentedAt), "dd-MM-yyyy"),
                },
                {
                  type: "text-cell",
                  value: format(new Date(shouldReturn), "dd-MM-yyyy"),
                },
                {
                  type: "text-cell",
                  value: realReturn
                    ? format(new Date(realReturn), "dd-MM-yyyy")
                    : "Nie zwrócono",
                },
                {
                  type: "buttons-cell",
                  buttons: [
                    !realReturn && {
                      Icon: Undo,
                      label: "Zwróć",
                      onClick: () => onReturn(_id),
                    },
                    {
                      Icon: Delete,
                      label: "Usuń",
                      onClick: () => onDelete(_id),
                    },
                  ],
                },
              ],
            })
          )
        : [],
    [data]
  )

  return { columns, rows }
}
