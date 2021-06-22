export interface Response {
  status?: number;
  statusMessage?: string;
  data?: string;
  headers: Record<string, string>;
  responseTime: number;
}

export type SendRequestCallback = (requestId: string) => Promise<Response>;

export interface InsomniaOptions {
  sendRequest?: SendRequestCallback;
  bail?: boolean;
  keepFile?: boolean;
  testFilter?: string;
}

/**
 * An instance of Insomnia will be exposed as a global variable during
 * tests, and will provide a bunch of utility functions for sending
 * requests, etc.
 */
export default class Insomnia {
  activeRequestId: string | null;
  activeEnvironmentId: string | null = null;
  sendRequest: SendRequestCallback | null;

  constructor(options: Pick<InsomniaOptions, 'sendRequest'>) {
    this.sendRequest = options.sendRequest || null; // Things that are set per test

    this.activeRequestId = null;
  }

  setActiveRequestId(id: string): void {
    this.activeRequestId = id;
  }

  clearActiveRequest(): void {
    this.activeRequestId = null;
  }

  /**
   *
   * @param reqId - request ID to send. Specifying nothing will send the active request
   * @returns {Promise<{headers: *, data: *, statusText: (string|string), status: *}>}
   */
  async send(reqId: string | null = null): Promise<Response> {
    // Default to active request if nothing is specified
    reqId = reqId || this.activeRequestId;
    const { sendRequest } = this;

    if (typeof sendRequest === 'function' && typeof reqId === 'string') {
      return sendRequest(reqId);
    }

    throw new Error('Send request callback not set');
  }
}
