import { Status } from "./Status";
export {};

export namespace Tunnel {
    export {};

    /**
     * All possible tunnel states.
     */
    export enum State {
        /**
         * A connection is in pending. It is not yet known whether connection was
         * successful.
         *
         * @type {Number}
         */
        CONNECTING = 0,

        /**
         * Connection was successful, and data is being received.
         *
         * @type {Number}
         */
        OPEN = 1,

        /**
         * The connection is closed. Connection may not have been successful, the
         * tunnel may have been explicitly closed by either side, or an error may
         * have occurred.
         *
         * @type {Number}
         */
        CLOSED = 2,

        /**
         * The connection is open, but communication through the tunnel appears to
         * be disrupted, and the connection may close as a result.
         *
         * @type {Number}
         */
        UNSTABLE = 3
    }
}

export abstract class Tunnel {
    static readonly INTERNAL_DATA_OPCODE: '';

    /**
     * Connect to the tunnel with the given optional data. This data is
     * typically used for authentication. The format of data accepted is
     * up to the tunnel implementation.
     *
     * @param data The data to send to the tunnel when connecting.
     */
    connect(data: string): void;

    /**
     * Disconnect from the tunnel.
     */
    disconnect(): void;

    /**
     * Send the given message through the tunnel to the service on the other
     * side. All messages are guaranteed to be received in the order sent.
     *
     * @param {...*} elements
     *     The elements of the message to send to the service on the other side
     *     of the tunnel.
     */
    sendMessage(...elements: any[]): void;

    /**
     * Changes the stored numeric state of this tunnel, firing the onstatechange
     * event if the new state is different and a handler has been defined.
     *
     * @param {!number} state
     *     The new state of this tunnel.
     */
    protected setState(state: Tunnel.State): void;

    /**
     * Changes the stored UUID that uniquely identifies this tunnel, firing the
     * onuuid event if a handler has been defined.
     *
     * @param {string} uuid
     *     The new state of this tunnel.
     */
    protected setUUID(uuid: string): void;

    /**
     * Returns whether this tunnel is currently connected.
     * @returns true if this tunnel is currently connected, false otherwise.
     */
    isConnected(): boolean;

    /**
     * The current state of this tunnel.
     */
    state: Tunnel.State;

    /**
     * The maximum amount of time to wait for data to be received, in
     * milliseconds. If data is not received within this amount of time,
     * the tunnel is closed with an error. The default value is 15000.
     */
    receiveTimeout: number;

    /**
     * The amount of time to wait for data to be received before considering
     * the connection to be unstable, in milliseconds. If data is not received
     * within this amount of time, the tunnel status is updated to warn that
     * the connection appears unresponsive and may close. The default value is
     * 1500.
     */
    unstableThreshold: number;

    /**
     * The UUID uniquely identifying this tunnel. If not yet known, this will
     * be null.
     */
    uuid: string | null;

    /**
     * Fired when the UUID that uniquely identifies this tunnel is known.
     *
     * @event
     * @param uuid
     *     The UUID uniquely identifying this tunnel.
     */
    onuuid: null | ((uuid: string) => void);

    /**
     * Fired whenever an error is encountered by the tunnel.
     * @event
     * @param status A status object which describes the error.
     */
    onerror: null | ((status: Status) => void);

    /**
     * Fired whenever the state of the tunnel changes.
     * @event
     * @param state The new state of the client.
     */
    onstatechange: null | ((state: Tunnel.State) => void);

    /**
     * Fired once for every complete Guacamole instruction received, in order.
     * @event
     * @param opcode The Guacamole instruction opcode.
     * @param parameters The parameters provided for the instruction, if any.
     */
    oninstruction: null | ((opcode: string, args: string[]) => void);
}
