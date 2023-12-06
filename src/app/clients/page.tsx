"use client"

import { useState, useEffect } from "react"
import { Button, Stack } from "@mui/material"
import Link from "next/link"
import { useTableConfiguration } from "./utils"
import { Table } from "@/components"

export default function Clients() {
  const [data, setData] = useState()
  const [refetchData, setRefetchData] = useState(true)
  const { columns, rows } = useTableConfiguration(setRefetchData, data)

  useEffect(() => {
    if (!refetchData) return
    const getData = async () => {
      const response = await fetch("http://localhost:3001/users")
      const data = await response.json()

      setData(data?.users)
      setRefetchData(false)
    }

    getData()
  }, [refetchData])

  return (
    <Stack gap={3}>
      <Link href="/clients/add-client" style={{ width: "fit-content" }}>
        <Button>Dodaj użytkownika</Button>
      </Link>
      <Table columns={columns} rows={rows} />
    </Stack>
  )
}
