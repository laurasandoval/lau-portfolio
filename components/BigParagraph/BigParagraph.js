import ReactMarkdown from 'react-markdown';
import './BigParagraph.scss'
import { Balancer } from 'react-wrap-balancer';
import { useEffect, useState } from 'react';

export default function BigParagraph({
    statement,
    centered,
}) {
    // Terrible hack…
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    return (
        <div className="big_statement" data-centered={centered}>
            <Balancer>
                <ReactMarkdown>{statement}</ReactMarkdown>
            </Balancer>
        </div>
    )
}
