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

interface FieldProps {
  label: string
  name: string
  extraOptions?: TextFieldProps
}

export default function Page() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    await axios.post("http://localhost:3001/movies", data)
    router.push("/movies")
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Field label="Tytuł" name="title" />
          <Field label="Opis" name="description" />
          <Field label="Gatunek" name="genre" />
          <Field label="Reżyser" name="director" />
          <Field label="Czas trwania (np. 1h30min)" name="duration" />
          <Field
            label="Ocena (x/10)"
            name="rating"
            extraOptions={{
              InputProps: { inputProps: { min: 0, max: 10 } },
              type: "number",
            }}
          />
          <Field
            label="Aktorzy (Przedziel aktorów przecinkiem np. Tom Hanks,Meryl Streep"
            name="actors"
          />
          <Button type="submit">Dodaj</Button>
        </Stack>
      </form>
    </CardWrapper>
  )
}
