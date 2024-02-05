export {};

export namespace KeyEventInterpreter {
    export {};

    /**
     * A definition for a known key.
     */
    export class KeyDefinition {
        /**
         * A definition for a known key.
         *
         * @constructor
         * @param [template={}]
         *     The object whose properties should be copied within the new
         *     KeyDefinition.
         */
        constructor(template?: KeyDefinition);

        /**
         * The X11 keysym of the key.
         */
        keysym: number;

        /**
         * A human-readable name for the key.
         */
        name: string;

        /**
         * The value which would be typed in a typical text editor, if any. If the
         * key is not associated with any typeable value, this will be undefined.
         */
        value: string;
    }

    /**
     * A granular description of an extracted key event, including a human-readable
     * text representation of the event, whether the event is directly typed or not,
     * and the timestamp when the event occured.
     */
    export class KeyEvent {
        /**
         * @param [template={}]
         *     The object whose properties should be copied within the new
         *     KeyEvent.
         */
        constructor(template?: KeyEvent);

        /**
         * The key definition for the pressed key.
         */
        definition: KeyDefinition;

        /**
         * True if the key was pressed to create this event, or false if it was
         * released.
         */
        pressed: boolean;

        /**
         * The timestamp from the recording when this event occurred.
         */
        timestamp: number;
    }
}

/**
 * An object that will accept raw key events and produce a chronologically
 * ordered array of key event objects. These events can be obtained by
 * calling getEvents().
 */
export class KeyEventInterpreter {
    /**
     * @param [startTimestamp=0]
     *     The starting timestamp for the recording being intepreted. If provided,
     *     the timestamp of each intepreted event will be relative to this timestamp.
     *     If not provided, the raw recording timestamp will be used.
     */
    constructor(startTimestamp?: number);

    /**
     * Handles a raw key event, appending a new key event object for every
     * handled raw event.
     *
     * @param args
     *     The arguments of the key event.
     */
    handleKeyEvent(args: string[]): void;

    /**
     * Return the current batch of typed text. Note that the batch may be
     * incomplete, as more key events might be processed before the next
     * batch starts.
     *
     * @returns
     *     The current batch of text.
     */
    getEvents(): KeyEventInterpreter.KeyEvent[];
}
