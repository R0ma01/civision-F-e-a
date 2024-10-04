'use client';

import Mapbox from '@/components/component/carte/Mapbox';

export default function Carte() {
    // global variables

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
        </div>
    );
}
