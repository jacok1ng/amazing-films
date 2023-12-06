import { ModeEdit, Delete } from "@mui/icons-material"
import { toast } from "react-toastify"
import { format } from "date-fns"
import axios from "axios"
import { useMemo } from "react"
import { Movie, RowConfig, SetState } from "@/types"

export const useTableConfiguration = (
  setRefetch: SetState<boolean>,
  data?: Movie[]
) => {
  const columns = [
    "Status",
    "Tytuł",
    "Gatunek",
    "Rezyser",
    "Czas trwania",
    "Ocena",
    "Opis",
    "Aktorzy",
    "Dodany",
    "Akcje",
  ]

  const onDelete = async (id: string) => {
    const response = await axios.delete("http://localhost:3001/movies", {
      data: { id },
    })
    setRefetch(true)

    if (response.data?.status === "ERROR") {
      return toast.error(`Błąd: ${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const rows = useMemo(
    () =>
      data
        ? data?.map<RowConfig>(
            ({
              _id,
              title,
              genre,
              director,
              duration,
              rating,
              description,
              actors,
              createdAt,
              isRented,
            }) => ({
              cells: [
                isRented
                  ? {
                      type: "labeled-chip",
                      chipColor: "red",
                      text: "Niedostępny",
                      textColor: "white",
                    }
                  : {
                      type: "labeled-chip",
                      chipColor: "green",
                      text: "Dostępny",
                      textColor: "white",
                    },
                {
                  type: "text-cell",
                  value: title,
                },
                {
                  type: "text-cell",
                  value: genre,
                },
                {
                  type: "text-cell",
                  value: director,
                },
                {
                  type: "text-cell",
                  value: duration,
                },
                {
                  type: "text-cell",
                  value: `${rating}/10`,
                },
                {
                  type: "text-cell",
                  value: description,
                },
                {
                  type: "text-cell",
                  value: actors.join(", "),
                },
                {
                  type: "text-cell",
                  value: format(new Date(createdAt), "dd-MM-yyyy"),
                },
                {
                  type: "buttons-cell",
                  buttons: [
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
