import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.alert for all tests
global.alert = vi.fn();

global.ResizeObserver = class ResizeObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        // Mock observe - do nothing
    }
    unobserve() {
        // Mock unobserve - do nothing
    }
    disconnect() {
        // Mock disconnect - do nothing
    }
};
