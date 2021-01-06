import React from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from 'react-responsive'

function TextWrapper(props) {
    return <div className="w-full">{props.children}</div>;
}
export default function PokemonSkeleton() {
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })

    const textWidth = isMobile ? 250 : 100;
    return <div className="overflow-hidden rounded-lg w-full sm:w-full md:w-1/3 lg:w-2/12 p-2">
        <article className="m-2 shadow hover:shadow-lg">
            {/* @ts-ignore */}
            <center>
                <Skeleton circle width={75} height={75} duration={0.5}
                    className="w-full text-center"
                />
                {/* @ts-ignore */}
            </center>
            {/* @ts-ignore */}
            <center className="mb-3 p-2">
                <Skeleton className="w-full" width={textWidth} height={25} duration={0.5} wrapper={
                    TextWrapper
                } />
                {/* @ts-ignore */}
            </center>

        </article>
    </div>
}