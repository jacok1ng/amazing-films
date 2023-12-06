import {
  AppBar as BaseAppBar,
  Container,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material"
import Link from "next/link"

interface NavElementProps {
  label: string
  path: string
}

const NavElement = ({ label, path }: NavElementProps) => (
  <Link href={path}>
    <Button variant="contained" sx={{ color: "#fff", boxShadow: "none" }}>
      {label}
    </Button>
  </Link>
)

const AppBar = () => {
  return (
    <BaseAppBar position="static" sx={{ paddingY: 2 }}>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Typography variant="h5" fontWeight="bold" mr={10}>
          Amazing movies
        </Typography>
        <Stack gap={3} direction="row">
          <NavElement label="Filmy" path="/movies" />
          <NavElement label="Wypożyczenia" path="/rentals" />
          <NavElement label="Klienci" path="/clients" />
        </Stack>
      </Container>
    </BaseAppBar>
  )
}

export default AppBar
