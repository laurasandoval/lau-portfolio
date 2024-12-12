import { getEarliestYear } from '../../lib/posts';

export default function handler(req, res) {
    const earliestYear = getEarliestYear();
    res.status(200).json({ earliestYear });
} 