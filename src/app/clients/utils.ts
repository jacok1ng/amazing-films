import { ModeEdit, Delete } from "@mui/icons-material"
import { format } from "date-fns"
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/navigation"
import { RowConfig, User, SetState } from "@/types"
import { useMemo } from "react"

export const useTableConfiguration = (
  setRefetch: SetState<boolean>,
  data?: User[]
) => {
  const router = useRouter()
  const columns = [
    "Imie",
    "Nazwisko",
    "Adres",
    "Telefon",
    "Data rejestracji",
    "Akcje",
  ]

  const onDelete = async (id: string) => {
    const response = await axios.delete("http://localhost:3001/users", {
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
            ({ _id, address, name, phone, registerAt, surname }) => ({
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
                  value: address,
                },
                {
                  type: "text-cell",
                  value: phone,
                },
                {
                  type: "text-cell",
                  value: format(new Date(registerAt), "dd-MM-yyyy"),
                },
                {
                  type: "buttons-cell",
                  buttons: [
                    {
                      Icon: ModeEdit,
                      label: "Edytuj",
                      onClick: () =>
                        router.push(`/clients/add-client?id=${_id}`),
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
    [data, router]
  )

  return { columns, rows }
}
