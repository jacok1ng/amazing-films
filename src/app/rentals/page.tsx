"use client"

import { useState, useEffect } from "react"
import { Button, Stack } from "@mui/material"
import { useTableConfiguration } from "./utils"
import Link from "next/link"
import { Table } from "@/components"

export default function Page() {
  const [data, setData] = useState()
  const [refetchData, setRefetchData] = useState(true)
  const { columns, rows } = useTableConfiguration(setRefetchData, data)

  useEffect(() => {
    if (!refetchData) return
    const getData = async () => {
      const response = await fetch("http://localhost:3001/rentals")
      const data = await response.json()

      setData(data?.rentals)
      setRefetchData(false)
    }

    getData()
  }, [refetchData])

  return (
    <Stack gap={3}>
      <Link href="/rentals/add-rental" style={{ width: "fit-content" }}>
        <Button>Dodaj wypożyczenie</Button>
      </Link>
      <Table columns={columns} rows={rows} />
    </Stack>
  )
}
