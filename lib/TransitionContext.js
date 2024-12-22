import { createContext, useContext, useState, useMemo } from 'react';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionData, setTransitionData] = useState(null);

    const value = useMemo(() => ({
        isTransitioning,
        setIsTransitioning,
        transitionData,
        setTransitionData
    }), [isTransitioning, transitionData]);

    return (
        <TransitionContext.Provider value={value}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (context === undefined) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
} 