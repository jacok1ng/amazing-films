"use client"

import { useForm } from "react-hook-form"
import { useCallback } from "react"
import axios from "axios"
import {
  Stack,
  TextField,
  Typography,
  Button,
  TextFieldProps,
} from "@mui/material"
import { CardWrapper } from "@/components"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"

interface FieldProps {
  label: string
  name: string
  extraOptions?: TextFieldProps
}

export default function Page() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    const response = await axios.post("http://localhost:3001/rentals", data)
    if (response.data.status === "ERROR")
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

    router.push("/rentals")
  }
  const Field = useCallback(
    ({ label, name, extraOptions }: FieldProps) => (
      <Stack gap={1}>
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
        <TextField {...register(name)} required {...extraOptions} />
      </Stack>
    ),
    [register]
  )

  return (
    <CardWrapper>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Field label="Imie wypożyczającego" name="name" />
          <Field label="Nazwisko wypożyczającego" name="surname" />
          <Field label="Tytuł filmu" name="title" />
          <Button type="submit">Dodaj</Button>
        </Stack>
      </form>
    </CardWrapper>
  )
}
