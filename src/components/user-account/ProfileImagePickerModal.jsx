import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ProfileImagePickerModal.module.css';

export default function ProfileImagePickerModal({
    isOpen,
    onClose,
    onConfirm,
    currentImageUrl,
}) {
    const [isWorking, setIsWorking] = useState(false);
    const [selectedType, setSelectedType] = useState(null); // 'preset' | 'file'
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const [fileError, setFileError] = useState(null);
    const inputRef = useRef(null);
    const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

    const presetImages = useMemo(() => {
        const names = Array.from({ length: 9 }, (_, i) => `/images/profile-avatars/profile_${i + 1}.png`);
        return names;
    }, []);

    const resetSelection = () => {
        if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
        }
        setSelectedType(null);
        setSelectedPreset(null);
        setSelectedFile(null);
        setFilePreviewUrl(null);
        setFileError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (filePreviewUrl) {
                URL.revokeObjectURL(filePreviewUrl);
            }
        };
    }, [filePreviewUrl]);

    useEffect(() => {
        if (!isOpen) {
            resetSelection();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            resetSelection();
            onClose?.();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedType('file');
        setSelectedFile(file);
        const preview = URL.createObjectURL(file);
        setFilePreviewUrl(preview);
        if (file.size > MAX_SIZE_BYTES) {
            setFileError('Selected image must not be larger than 2MB.');
        } else {
            setFileError(null);
        }
    };

    const handleSelectPreset = (src) => {
        setSelectedType('preset');
        setSelectedPreset(src);
        setSelectedFile(null);
        setFileError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleConfirm = async () => {
        if (!selectedType || fileError) return;
        try {
            setIsWorking(true);
            if (selectedType === 'preset' && selectedPreset) {
                await onConfirm?.({ type: 'preset', value: selectedPreset });
            } else if (selectedType === 'file' && selectedFile) {
                await onConfirm?.({ type: 'file', value: selectedFile });
            }
        } finally {
            setIsWorking(false);
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Choose profile image">
                <div className={styles.header}>
                    <h3 className={styles.title}>Choose profile image</h3>
                    <button className={styles.closeBtn} onClick={() => { resetSelection(); onClose?.(); }} aria-label="Close">×</button>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Presets</h4>
                    <div className={styles.grid}>
                        {presetImages.map((src) => (
                            <button
                                key={src}
                                type="button"
                                className={`${styles.avatarBtn} ${(selectedType === 'preset' && selectedPreset === src) || (!selectedType && currentImageUrl === src) ? styles.selected : ''}`}
                                onClick={() => handleSelectPreset(src)}
                            >
                                <img src={src} alt="Preset avatar" className={styles.avatarImg} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Upload from device</h4>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                        disabled={isWorking}
                    />
                    {selectedType === 'file' && selectedFile && (
                        <div className={styles.previewRow}>
                            {filePreviewUrl && <img src={filePreviewUrl} alt="Preview" className={styles.previewImg} />}
                            <span className={styles.previewName}>{selectedFile.name}</span>
                        </div>
                    )}
                    {fileError && <div className={styles.errorText}>{fileError}</div>}
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} type="button" onClick={() => { resetSelection(); onClose?.(); }} disabled={isWorking}>Close</button>
                    <button
                        className={styles.confirmBtn}
                        type="button"
                        onClick={handleConfirm}
                        disabled={!selectedType || isWorking || !!fileError}
                    >
                        {isWorking ? 'Saving...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}


