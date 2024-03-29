import { Client } from './Client';
import { Status } from './Status';

/**
 * Abstract stream which can receive data.
 */
export class OutputStream {
    /**
     * @param client The client owning this stream.
     * @param index The index of this stream.
     */
    constructor(client: Client, index: number);

    /**
     * The index of this stream.
     */
    readonly index: number;

    /**
     * Fired whenever an acknowledgement is received from the server, indicating
     * that a stream operation has completed, or an error has occurred.
     * @event
     * @param status The status of the operation.
     */
    onack: null | ((status: Status) => void);

    /**
     * Writes the given base64-encoded data to this stream as a blob.
     * @param data The base64-encoded data to send.
     */
    sendBlob(data: string): void;

    /**
     * Closes this stream.
     */
    sendEnd(): void;
}
