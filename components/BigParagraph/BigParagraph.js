import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import './BigParagraph.scss'
import { Balancer } from 'react-wrap-balancer';
import { useEffect, useState } from 'react';

export default function BigParagraph({
    statement,
}) {
    // Terrible hack…
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    return (
        <p className="big_statement">
            <Balancer>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{statement}</ReactMarkdown>
            </Balancer>
        </p>
    )
}
