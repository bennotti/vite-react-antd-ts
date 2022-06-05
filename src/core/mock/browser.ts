// src/mocks/browser.js
import { RequestHandler, setupWorker, SetupWorkerApi } from 'msw'
import { defaultHandlers } from './defaults.handler'

export function createWorker(handlers: RequestHandler[]): SetupWorkerApi {
    return setupWorker(
        ...handlers,
        ...defaultHandlers
    );
};
