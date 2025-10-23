import { useState, useEffect, useRef } from 'react';

import styles from "./InstallPrompt.module.css";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const promptRef = useRef(null);

    useEffect(() => {

        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);

        const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone === true;
        setIsStandalone(standalone);

        if (standalone) {
            return;
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("The user installed the app!");
        } else {
            console.log("The user declined the installation!");
        }

        setDeferredPrompt(null);
        setShowBanner(false);
    };

    const handleDismiss = () => {
        setShowBanner(false);
    };

    // Touch handlers for swipe gestures
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
        setDragOffset(0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        
        const currentX = e.targetTouches[0].clientX;
        const offset = currentX - touchStart;
        setDragOffset(offset);
        setTouchEnd(currentX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        
        if (!touchStart || !touchEnd) {
            setDragOffset(0);
            return;
        }
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe || isRightSwipe) {
            // Animate out
            const direction = isLeftSwipe ? -window.innerWidth : window.innerWidth;
            setDragOffset(direction);
            
            setTimeout(() => {
                handleDismiss();
            }, 300);
        } else {
            // Snap back to center
            setDragOffset(0);
        }
    };

    if (isStandalone) return null;

    // For iOS, show different message
    if (isIOS && !showBanner) {
        return (
            <div 
                ref={promptRef}
                className={`${styles.prompt} ${isDragging ? styles.promptDragging : ''}`}
                style={{ 
                    '--drag-offset': `${dragOffset}px`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <span>Install Cinema Tickets!</span>
                <div className={styles.iosInstructions}>
                    <p>Tap the share button and select "Add to Home Screen"</p>
                </div>
            </div>
        );
    }

    if (!showBanner) return null;

    return (
        <div 
            ref={promptRef}
            className={`${styles.prompt} ${isDragging ? styles.promptDragging : ''}`}
            style={{ 
                '--drag-offset': `${dragOffset}px`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <span>Install Cinema Tickets!</span>
            <button 
                className={styles.installBtn}
                onClick={handleInstallClick}
            >
                Install
            </button>
        </div>
    );
}