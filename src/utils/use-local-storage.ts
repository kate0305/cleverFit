import { useCallback, useEffect, useState } from 'react';

export const getLocalStorageValue = <T>(key: string, value: T) => {
    const localStorageValue = localStorage.getItem(key);

    return (localStorageValue && JSON.parse(localStorageValue)) ?? value;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [localStorageValue, setValue] = useState<T | undefined>(() =>
        getLocalStorageValue(key, initialValue),
    );

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === key) {
                const newValue = (e.newValue && JSON.parse(e.newValue)) ?? undefined;

                setValue(newValue);
            }
        };

        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('storage', onStorage);
        };
    }, [key]);

    const setLocalStorageItem = useCallback(
        (newValue: T) => {
            try {
                setValue(newValue);

                if (typeof newValue === 'undefined') {
                    localStorage.removeItem(key);
                } else {
                    localStorage.setItem(key, JSON.stringify(newValue));
                }
            } catch {
                /* empty */
            }
        },
        [key],
    );

    const removeLocalStorageItem = useCallback(() => {
        try {
            setValue(undefined);
            localStorage.removeItem(key);
        } catch {
            /* empty */
        }
    }, [key]);

    return [localStorageValue, setLocalStorageItem, removeLocalStorageItem] as const;
};
