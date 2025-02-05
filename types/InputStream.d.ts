import { Client } from './Client';
import { Status } from './Status';

/**
 * An input stream abstraction used by the Guacamole client to facilitate
 * transfer of files or other binary data.
 */
export class InputStream {
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
     * Called when a blob of data is received.
     * @event
     * @param data The received base64 data.
     */
    onblob: null | ((data64: string) => void);

    /**
     * Called when this stream is closed.
     * @event
     */
    onend: null | (() => void);

    /**
     * Acknowledges the receipt of a blob.
     * @param message A human-readable message describing the error or status.
     * @param code The error code, if any, or 0 for success.
     */
    sendAck(message: string, code: Status.Code): void;

    /**
     * Creates a new ReadableStream that receives the data sent to this stream
     * by the Guacamole server. This function may be invoked at most once per
     * stream, and invoking this function will overwrite any installed event
     * handlers on this stream.
     *
     * A ReadableStream is a JavaScript object defined in the "Streams" standard.
     * It is supported by most browsers, but not necessarily all browsers.
     * The caller should verify this support is present before invoking this
     * function. The behavior of this function when the browser does not
     * support ReadableStream is not defined.
     *
     * @see {@link https://streams.spec.whatwg.org/#rs-class}
     *
     * @returns
     *     A new ReadableStream that receives the bytes sent along this stream
     *     by the Guacamole server.
     */
    toReadableStream(): ReadableStream;
}
