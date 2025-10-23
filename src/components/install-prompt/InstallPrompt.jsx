import { useState, useEffect } from 'react';

import styles from "./InstallPrompt.module.css";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

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

    // Don't show banner if already installed
    if (isStandalone) return null;

    // For iOS, show different message
    if (isIOS && !showBanner) {
        return (
            <div className={styles.prompt}>
                <span>Install Cinema Tickets!</span>
                <div className={styles.iosInstructions}>
                    <p>Tap the share button and select "Add to Home Screen"</p>
                </div>
            </div>
        );
    }

    if (!showBanner) return null;

    return (
        <div className={styles.prompt}>
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