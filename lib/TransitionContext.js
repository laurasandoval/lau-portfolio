import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionData, setTransitionData] = useState(null);

    return (
        <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning, transitionData, setTransitionData }}>
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