import { ComponentType, Dispatch, SetStateAction } from "react"
import { SvgIconProps } from "@mui/material"

export interface RowConfig {
  cells: TableCell[]
}

export interface TextCell {
  type: "text-cell"
  value: string | number
}

export interface LabeledChipCell {
  type: "labeled-chip"
  chipColor: string
  textColor: string
  text: string
}

interface CellButton {
  Icon: ComponentType<SvgIconProps>
  label: string
  onClick: () => void
}

export interface ButtonsCell {
  type: "buttons-cell"
  buttons: (CellButton | false)[]
}

export type TableCell = TextCell | LabeledChipCell | ButtonsCell

export type SetState<T> = Dispatch<SetStateAction<T>>

export interface User {
  _id: string
  name: string
  surname: string
  address: string
  phone: string
  registerAt: Date
  isAdmin: boolean
}

export interface Movie {
  _id: string
  title: string
  genre: string
  director: string
  duration: string
  rating: number
  description: string
  actors: string[]
  createdAt: Date
  isRented: boolean
}

export interface Rental {
  _id: string
  name: string
  surname: string
  movie: string
  rentedAt: Date
  realReturn?: Date
  shouldReturn: Date
}
