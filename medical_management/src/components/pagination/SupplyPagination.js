import MediaQuery from 'react-responsive'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import {SuppliesList} from "../../layouts/medical_supplies/SuppliesList";

const Example = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return <div>
        <h1>Device Test!</h1>
        {isDesktopOrLaptop && <SuppliesList />}
        {isBigScreen && <SuppliesList />}
        {isTabletOrMobile && <SuppliesList />}
        {isRetina && <SuppliesList />}
    </div>
}

export default Example;
