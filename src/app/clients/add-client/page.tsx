"use client"

import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import axios from "axios"
import {
  Stack,
  TextField,
  Typography,
  Button,
  TextFieldProps,
} from "@mui/material"
import { CardWrapper } from "@/components"
import { useRouter, useSearchParams } from "next/navigation"

interface FieldProps {
  label: string
  name: string
  extraOptions?: TextFieldProps
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("id")
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data: any) => {
    if (userId) {
      await axios.patch("http://localhost:3001/users", data)
    } else {
      await axios.post("http://localhost:3001/users", data)
    }

    router.push("/clients")
  }

  const Field = useCallback(
    ({ label, name, extraOptions }: FieldProps) => (
      <Stack gap={1}>
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
        <TextField {...register(name)} {...extraOptions} />
      </Stack>
    ),
    [register]
  )

  useEffect(() => {
    if (!userId) return
    const getUser = async () => {
      const response = await axios.get(`http://localhost:3001/users/${userId}`)
      reset(response.data?.user)
    }

    getUser()
  }, [userId])

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Field label="Login" name="login" />
          {!userId && (
            <Field
              label="Hasło"
              name="password"
              extraOptions={{
                type: "password",
              }}
            />
          )}
          <Field label="Imię" name="name" extraOptions={{ required: true }} />
          <Field
            label="Nazwisko"
            name="surname"
            extraOptions={{ required: true }}
          />
          <Field label="Adres" name="address" />
          <Field
            label="Numer telefonu"
            name="phone"
            extraOptions={{
              type: "number",
            }}
          />
          <Button type="submit">{userId ? "Edytuj" : "Dodaj"}</Button>
        </Stack>
      </form>
    </CardWrapper>
  )
}
