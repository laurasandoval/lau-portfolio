import { useRef, useState, useEffect } from 'react';
import './index.scss'
import Image from 'next/image';

export default function SnappingFeedSlideVideo({
    asset,
    current,
    priority,
    assetsContainerComputedHeight,
}) {
    return (
        <div
            className="asset_container"
            data-type="image"
            data-orientation={asset.width > asset.height ? "landscape" : asset.width < asset.height ? "portrait" : "square"}
        >
            <Image
                className="asset"
                src={`/assets/photography-work/${asset.src}`}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                priority={priority}
            />
        </div>
    )
}
