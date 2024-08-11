import QRCode from 'react-qr-code'
import './MobileRedirect.scss'
import { useEffect } from 'react';

export default function MobileRedirect({
    title,
    body,
    url,
}) {
    useEffect(() => {
        document.body.classList.add("mobile_redirect_body");

        return () => {
            document.body.classList.remove("mobile_redirect_body");
        }
    }, [])

    return (
        <div className="mobile_redirect">
            <QRCode value={url} />
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    )
}