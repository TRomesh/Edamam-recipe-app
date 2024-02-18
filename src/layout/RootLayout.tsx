import { Grid, GridItem } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <Grid bg="grey.50" width="100vw">
            <GridItem as="main" >
                <Navigation />
                <Outlet />
            </GridItem>
        </Grid >
    )
}

export default RootLayout