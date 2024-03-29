import { AudioPlayer } from './AudioPlayer';
import { Display } from './Display';
import { Mimetype } from './GuacCommon';
import { InputStream } from './InputStream';
import { Mouse } from './Mouse';
import * as Guacamole from './Object';
import { OutputStream } from './OutputStream';
import { Status } from './Status';
import { Touch } from './Touch';
import { Tunnel } from './Tunnel';
import { VideoPlayer } from './VideoPlayer';
import { VisibleLayer } from './VisibleLayer';

export {};

export namespace Client {
    export {};

    /**
     * All possible Guacamole Client states.
     */
    export enum State {
        /**
         * Idle state
         *
         * @type {Number}
         */
        IDLE = 0,

        /**
         * The machine connection is being established.
         *
         * @type {Number}
         */
        CONNECTING = 1,

        /**
         * The machine connection has been successfully established, and the
         * client is now waiting for receipt of initial graphical data.
         *
         * @type {Number}
         */
        WAITING = 2,

        /**
         * Connected state
         *
         * @type {Number}
         */
        CONNECTED = 3,

        /**
         * Disconnecting state
         *
         * @type {Number}
         */
        DISCONNECTING = 4,

        /**
         * Disconnected state
         *
         * @type {Number}
         */
        DISCONNECTED = 5,
    }

    export enum Message {
        /**
         * A client message that indicates that a user has joined an existing
         * connection. This message expects a single additional argument - the
         * name of the user who has joined the connection.
         *
         * @type {!number}
         */
        USER_JOINED = 0x0001,

        /**
         * A client message that indicates that a user has left an existing
         * connection. This message expects a single additional argument - the
         * name of the user who has left the connection.
         *
         * @type {!number}
         */
        USER_LEFT = 0x0002,
    }

    interface ExportLayerBase {
        height: number;
        width: number;
        url?: string | undefined;
    }

    type ExportLayer =
        | ExportLayerBase
        | (ExportLayerBase & {
            x: number;
            y: number;
            z: number;
            alpha: number;
            matrix: unknown;
            parent: unknown;
        });

    export interface ExportedState {
        currentState: State;
        currentTimestamp: number;
        layers: { [key: number]: ExportLayer };
    }
}

/**
 * Guacamole protocol client. Given a Guacamole.Tunnel,
 * automatically handles incoming and outgoing Guacamole instructions via the
 * provided tunnel, updating its display using one or more canvas elements.
 */
export class Client {
    /**
     * @param tunnel The tunnel to use to send and receive Guacamole instructions.
     */
    constructor(tunnel: Tunnel);

    /**
     * Produces an opaque representation of Guacamole.Client state which can be
     * later imported through a call to importState(). This object is
     * effectively an independent, compressed snapshot of protocol and display
     * state. Invoking this function implicitly flushes the display.
     *
     * @param callback
     *     Callback which should be invoked once the state object is ready. The
     *     state object will be passed to the callback as the sole parameter.
     *     This callback may be invoked immediately, or later as the display
     */
    exportState(callback: (state: Client.ExportedState) => void): void;

    /**
     * Restores Guacamole.Client protocol and display state based on an opaque
     * object from a prior call to exportState(). The Guacamole.Client instance
     * used to export that state need not be the same as this instance.
     *
     * @param state An opaque representation of Guacamole.Client state from a prior call to exportState().
     *
     * @param callback The function to invoke when state has finished being imported. This
     * may happen immediately, or later as images within the provided state object are loaded.
     */
    importState(state: Client.ExportedState, callback?: () => void): void;

    /**
     * Returns the underlying display of this Guacamole.Client. The display
     * contains an Element which can be added to the DOM, causing the
     * display to become visible.
     *
     * @return The underlying display of this Guacamole.Client.
     */
    getDisplay(): Display;

    /**
     * Sends the current size of the screen.
     *
     * @param width The width of the screen.
     * @param height The height of the screen.
     */
    sendSize(width: number, height: number): void;

    /**
     * Sends a key event having the given properties as if the user
     * pressed or released a key.
     *
     * @param pressed Whether the key is pressed (1) or released (0).
     * @param keysym The keysym of the key being pressed or released.
     */
    sendKeyEvent(pressed: 0 | 1, keysym: number): void;

    /**
     * Sends a mouse event having the properties provided by the given mouse state.
     *
     * @param mouseState The state of the mouse to send in the mouse event.
     * @param [applyDisplayScale=false] Whether the provided mouse state uses local
     * display units, rather than remote display units, and should be scaled to match
     * the {@link Display}.
     */
    sendMouseState(mouseState: Mouse.State, applyDisplayScale?: boolean): void;

    /**
     * Sends a touch event having the properties provided by the given touch
     * state.
     *
     * @param touchState The state of the touch contact to send in the touch event.
     *
     * @param [applyDisplayScale=false] Whether the provided touch state uses local display
     * units, rather than remote display units, and should be scaled to match the {@link Display}.
     */
    sendTouchState(touchState: Touch.State, applyDisplayScale?: boolean): void;

    /**
     * Allocates an available stream index and creates a new
     * Guacamole.OutputStream using that index, associating the resulting
     * stream with this Guacamole.Client. Note that this stream will not yet
     * exist as far as the other end of the Guacamole connection is concerned.
     * Streams exist within the Guacamole protocol only when referenced by an
     * instruction which creates the stream, such as a "clipboard", "file", or
     * "pipe" instruction.
     *
     * @returns A new Guacamole.OutputStream with a newly-allocated index and associated with this Guacamole.Client.
     */
    createOutputStream(): OutputStream;

    /**
     * Opens a new audio stream for writing, where audio data having the give
     * mimetype will be sent along the returned stream. The instruction
     * necessary to create this stream will automatically be sent.
     *
     * @param mimetype The mimetype of the audio data that will be sent along the returned stream.
     */
    createAudioStream(mimetype: Mimetype): OutputStream;

    /**
     * Opens a new file for writing, having the given index, mimetype and
     * filename. The instruction necessary to create this stream will
     * automatically be sent.
     *
     * @param mimetype The mimetype of the file being sent.
     * @param filename The filename of the file being sent.
     */
    createFileStream(mimetype: Mimetype, filename: string): OutputStream;

    /**
     * Opens a new pipe for writing, having the given name and mimetype. The
     * instruction necessary to create this stream will automatically be sent.
     *
     * @param mimetype The mimetype of the data being sent.
     * @param name The name of the pipe.
     */
    createPipeStream(mimetype: Mimetype, name: string): OutputStream;

    /**
     * Opens a new clipboard object for writing, having the given mimetype. The
     * instruction necessary to create this stream will automatically be sent.
     *
     * @param mimetype The mimetype of the data being sent.
     */
    createClipboardStream(mimetype: Mimetype): OutputStream;

    /**
     * Opens a new argument value stream for writing, having the given
     * parameter name and mimetype, requesting that the connection parameter
     * with the given name be updated to the value described by the contents
     * of the following stream. The instruction necessary to create this stream
     * will automatically be sent.
     *
     * @param mimetype The mimetype of the data being sent.
     * @param name The name of the connection parameter to attempt to update.
     */
    createArgumentValueStream(mimetype: Mimetype, name: string): OutputStream;

    /**
     * Creates a new output stream associated with the given object and having
     * the given mimetype and name. The legality of a mimetype and name is
     * dictated by the object itself. The instruction necessary to create this
     * stream will automatically be sent.
     *
     * @param index The index of the object for which the output stream is being created.
     * @param mimetype The mimetype of the data which will be sent to the output stream.
     * @param name The defined name of an output stream within the given object.
     * @returns An output stream which will write blobs to the named output stream of the given object.
     */
    createObjectOutputStream(index: number, mimetype: Mimetype, name: string): OutputStream;

    /**
     * Requests read access to the input stream having the given name. If
     * successful, a new input stream will be created.
     *
     * @param index The index of the object from which the input stream is being requested.
     * @param name The name of the input stream to request.
     */
    requestObjectInputStream(index: number, name: string): OutputStream;

    /**
     * Acknowledge receipt of a blob on the stream with the given index.
     *
     * @param index The index of the stream associated with the received blob.
     * @param message A human-readable message describing the error or status.
     * @param code The error code, if any, or 0 for success.
     */
    sendAck(index: number, message: string, code: number): void;

    /**
     * Given the index of a file, writes a blob of data to that file.
     *
     * @param index The index of the file to write to.
     * @param data Base64-encoded data to write to the file.
     */
    sendBlob(index: number, data: string): void;

    /**
     * Marks a currently-open stream as complete. The other end of the
     * Guacamole connection will be notified via an "end" instruction that the
     * stream is closed, and the index will be made available for reuse in
     * future streams.
     *
     * @param index The index of the stream to end.
     */
    endStream(index: number): void;

    /**
     * Fired whenever the state of this Guacamole.Client changes.
     *
     * @event
     * @param state The new state of the client.
     */
    onstatechange: null | ((state: Client.State) => void);

    /**
     * Fired when the remote client sends a name update.
     *
     * @event
     * @param name The new name of this client.
     */
    onname: null | ((name: string) => void);

    /**
     * Fired when an error is reported by the remote client, and the connection
     * is being closed.
     *
     * @event
     * @param status A status object which describes the error.
     */
    onerror: null | ((status: Status) => void);

    /**
     * Fired when an arbitrary message is received from the tunnel that should
     * be processed by the client. By default, additional message-specific
     * events such as "onjoin" and "onleave" will fire for the received message
     * after this event has been processed. An event handler for "onmsg" need
     * not be supplied if "onjoin" and/or "onleave" will be used.
     *
     * @event
     * @param msgcode
     *     A status code sent by the remote server that indicates the nature of
     *     the message that is being sent to the client.
     *
     * @param args
     *     An array of arguments to be processed with the message sent to the
     *     client.
     *
     * @return
     *     true if message-specific events such as "onjoin" and
     *     "onleave" should be fired for this message, false otherwise. If
     *     no value is returned, message-specific events will be allowed to
     *     fire.
     */
    onmsg: null | ((msgcode: Client.Message, args: string[]) => boolean);

    /**
     * Fired when a user joins a shared connection.
     *
     * @event
     * @param userID A unique value representing this specific user's connection to the
     * shared connection. This value is generated by the server and is
     * guaranteed to be unique relative to other users of the connection.
     *
     * @param name A human-readable name representing the user that joined, such as
     * their username. This value is provided by the web application during
     * the connection handshake and is not necessarily unique relative to
     * other users of the connection.
     */
    onjoin: null | ((userID: string, name: string) => void);

    /**
     * Fired when a user leaves a shared connection.
     *
     * @event
     * @param userID
     *     A unique value representing this specific user's connection to the
     *     shared connection. This value is generated by the server and is
     *     guaranteed to be unique relative to other users of the connection.
     *
     * @param name
     *     A human-readable name representing the user that left, such as their
     *     username. This value is provided by the web application during the
     *     connection handshake and is not necessarily unique relative to other
     *     users of the connection.
     */
    onleave: null | ((userID: string, name: string) => void);

    /**
     * Fired when a audio stream is created. The stream provided to this event
     * handler will contain its own event handlers for received data.
     *
     * @event
     * @param audioStream The stream that will receive audio data from the server.
     * @param mimetype The mimetype of the audio data which will be received.
     * @return
     * An object which implements the Guacamole.AudioPlayer interface and
     * has been initialied to play the data in the provided stream, or null
     * if the built-in audio players of the Guacamole client should be used.
     */
    onaudio: null | ((audioStream: InputStream, mimetype: Mimetype) => AudioPlayer | null);

    /**
     * Fired when a video stream is created. The stream provided to this event
     * handler will contain its own event handlers for received data.
     *
     * @event
     * @param videoStream The stream that will receive video data from the server.
     * @param layer
     * The destination layer on which the received video data should be
     * played. It is the responsibility of the Guacamole.VideoPlayer
     * implementation to play the received data within this layer.
     * @param mimetype
     * The mimetype of the video data which will be received.
     * @return
     * An object which implements the Guacamole.VideoPlayer interface and
     * has been initialied to play the data in the provided stream, or null
     * if the built-in video players of the Guacamole client should be used.
     */
    onvideo: null | ((videoStream: InputStream, layer: VisibleLayer, mimetype: Mimetype) => VideoPlayer | null);

    /**
     * Fired when the remote client is explicitly declaring the level of
     * multi-touch support provided by a particular display layer.
     *
     * @event
     * @param layer
     *     The layer whose multi-touch support level is being declared.
     *
     * @param touches
     *     The maximum number of simultaneous touches supported by the given
     *     layer, where 0 indicates that touch events are not supported at all.
     */
    onmultitouch: null | ((layer: Display.VisibleLayer, touches: number) => void);

    /**
     * Fired when the current value of a connection parameter is being exposed
     * by the server.
     *
     * @event
     * @param stream The stream that will receive connection parameter data from the server.
     * @param mimetype The mimetype of the data which will be received.
     * @param name The name of the connection parameter whose value is being exposed.
     */
    onargv: null | ((parameterStream: InputStream, mimetype: Mimetype, name: string) => void);

    /**
     * Fired when the clipboard of the remote client is changing.
     *
     * @event
     * @param stream The stream that will receive clipboard data from the server.
     * @param mimetype The mimetype of the data which will be received.
     */
    onclipboard: null | ((clipboardStream: InputStream, mimetype: Mimetype) => void);

    /**
     * Fired when a file stream is created. The stream provided to this event
     * handler will contain its own event handlers for received data.
     *
     * @event
     * @param stream The stream that will receive data from the server.
     * @param mimetype The mimetype of the file received.
     * @param filename The name of the file received.
     */
    onfile: null | ((fileStream: InputStream, mimetype: Mimetype, name: string) => void);

    /**
     * Fired when a filesystem object is created. The object provided to this
     * event handler will contain its own event handlers and functions for
     * requesting and handling data.
     *
     * @event
     * @param object The created filesystem object.
     * @param name The name of the filesystem.
     */
    onfilesystem: null | ((object: Guacamole.Object, name: string) => void);

    /**
     * Fired when a pipe stream is created. The stream provided to this event
     * handler will contain its own event handlers for received data;
     *
     * @event
     * @param stream The stream that will receive data from the server.
     * @param mimetype The mimetype of the data which will be received.
     * @param name The name of the pipe.
     */
    onpipe: null | ((pipeStream: InputStream, mimetype: Mimetype, name: string) => void);

    /**
     * Fired when a "required" instruction is received. A required instruction
     * indicates that additional parameters are required for the connection to
     * continue, such as user credentials.
     *
     * @event
     * @param parameters The names of the connection parameters that are required to be
     * provided for the connection to continue.
     */
    onrequired: null | ((parameters: string[]) => void);

    /**
     * Fired whenever a sync instruction is received from the server, indicating
     * that the server is finished processing any input from the client and
     * has sent any results.
     *
     * @event
     * @param timestamp The timestamp associated with the sync instruction.
     */
    onsync: null | ((timestamp: number) => void);

    /**
     * Sends a disconnect instruction to the server and closes the tunnel.
     */
    disconnect(): void;

    /**
     * @description
     * Connects the underlying tunnel of this Guacamole.Client, passing the
     * given arbitrary data to the tunnel during the connection process.
     *
     * @param data Arbitrary connection data to be sent to the underlying
     *             tunnel during the connection process.
     * @throws {Status} If an error occurs during connection.
     */
    connect(data?: any): void;
}
