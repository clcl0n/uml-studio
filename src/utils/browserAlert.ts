export const browserAlert = (message: string, onConfirm?: (confirmed: boolean) => void) => {
    const confirmed = confirm(message);
    onConfirm?.(confirmed);
};