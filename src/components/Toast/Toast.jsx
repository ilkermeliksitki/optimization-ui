import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const styleMap = {
    success: {
        container: 'bg-green-50 border-green-500 text-green-800',
        icon: 'text-green-500',
    },
    error: {
        container: 'bg-red-50 border-red-500 text-red-800',
        icon: 'text-red-600',
    },
    warning: {
        container: 'bg-yellow-50 border-yellow-500 text-yellow-800',
        icon: 'text-yellow-600',
    },
    info: {
        container: 'bg-blue-50 border-blue-500 text-blue-800',
        icon: 'text-blue-600',
    },
};

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
    const Icon = iconMap[type];
    const styles = styleMap[type];

    useEffect(() => {
        if (duration === null) return;
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div 
            data-testid="toast"
            className={`
                flex items-center gap-3 p-4 rounded-lg border-2 shadow-lg
                min-w-[300px] max-w-[500px]
                animate-slide-in
                ${styles.container}
            `}
        >
            <Icon
                data-testid="toast-icon"
                className={`w-5 h-5 flex-shrink-0 ${styles.icon}`}
            />
            <p className="flex-1 font-medium">{message}</p>
            <button
                data-testid="toast-close"
                onClick={onClose}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );

}
