import { useRef, useState, useEffect } from 'react';
import './index.scss'
import Image from 'next/image';

export default function SnappingFeedSlideVideo({
    asset,
    current,
    priority,
}) {
    return (
        <div
            className="asset_container"
            data-type="image"
            data-orientation={asset.width > asset.height ? "landscape" : "portrait"}
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
