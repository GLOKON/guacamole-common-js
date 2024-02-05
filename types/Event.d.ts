export {};

/**
 * An arbitrary event, emitted by a {@link Event.Target}. This object
 * should normally serve as the base class for a different object that is more
 * specific to the event type.
 */
export abstract class Event {
    /**
     * @param type The unique name of this event type.
     */
    protected constructor(type: string);

    /**
     * The unique name of this event type.
     */
    type: string;

    /**
     * An arbitrary timestamp in milliseconds, indicating this event's
     * position in time relative to other events.
     */
    timestamp: number;

    /**
     * Returns the number of milliseconds elapsed since this event was created.
     *
     * @return
     *     The number of milliseconds elapsed since this event was created.
     */
    getAge(): number;

    /**
     * Requests that the legacy event handler associated with this event be
     * invoked on the given event target. This function will be invoked
     * automatically by implementations of {@link Event.Target}
     * whenever {@link Guacamole.Event.Target#emit emit()} is invoked.
     * <p>
     * Older versions of Guacamole relied on single event handlers with the
     * prefix "on", such as "onmousedown" or "onkeyup". If a Guacamole.Event
     * implementation is replacing the event previously represented by one of
     * these handlers, this function gives the implementation the opportunity
     * to provide backward compatibility with the old handler.
     * <p>
     * Unless overridden, this function does nothing.
     *
     * @param eventTarget
     *     The {@link Event.Target} that emitted this event.
     */
    invokeLegacyHandler(eventTarget: Event.Target): void;
}

export namespace Event {
    export {};

    /**
     * A {@link Event} that may relate to one or more DOM events.
     * Continued propagation and default behavior of the related DOM events may be
     * prevented with {@link Event.DOMEvent#stopPropagation stopPropagation()}
     * and {@link Event.DOMEvent#preventDefault preventDefault()}
     * respectively.
     */
    export class DOMEvent extends Event {
        /**
         * @param type The unique name of this event type.
         *
         * @param [events=[]] The DOM events that are related to this event, if any. Future calls to
         * {@link Event.DOMEvent#preventDefault preventDefault()} and
         * {@link Event.DOMEvent#stopPropagation stopPropagation()} will affect these events.
         */
        constructor(type: string, events?: Event | Event[]);

        /**
         * Requests that the default behavior of related DOM events be prevented.
         * Whether this request will be honored by the browser depends on the
         * nature of those events and the timing of the request.
         */
        preventDefault(): void;

        /**
         * Stops further propagation of related events through the DOM. Only events
         * that are directly related to this event will be stopped.
         */
        stopPropagation(): void;

        /**
         * Convenience function for cancelling all further processing of a given DOM
         * event. Invoking this function prevents the default behavior of the event and
         * stops any further propagation.
         *
         * @param {!Event} event
         *     The DOM event to cancel.
         */
        static cancelEvent(event: Event): void;
    }

    /**
     * A callback function which handles an event dispatched by an event
     * target.
     *
     * @param event The event that was dispatched.
     *
     * @param target The object that dispatched the event.
     */
    type TargetListener = (event: Event, target: Target) => void;

    /**
     * An object which can dispatch {@link Event} objects. Listeners
     * registered with {@link Event.Target#on on()} will automatically
     * be invoked based on the type of {@link Event} passed to
     * {@link Event.Target#dispatch dispatch()}. It is normally
     * subclasses of Event.Target that will dispatch events, and usages
     * of those subclasses that will catch dispatched events with on().
     */
    export class Target {
        constructor();

        /**
         * Registers a listener for events having the given type, as dictated by
         * the {@link Event#type type} property of {@link Event}
         * provided to {@link Event.Target#dispatch dispatch()}.
         *
         * @param type The unique name of this event type.
         *
         * @param listener The function to invoke when an event having the given type is dispatched.
         * The {@link Event} object provided to {@link Event.Target#dispatch dispatch()} will be passed to
         * this function, along with the dispatching Event.Target.
         */
        on(type: string, listener: TargetListener): void;

        /**
         * Registers a listener for events having the given types, as dictated by
         * the {@link Event#type type} property of {@link Event}
         * provided to {@link Event.Target#dispatch dispatch()}.
         * <p>
         * Invoking this function is equivalent to manually invoking
         * {@link Event.Target#on on()} for each of the provided types.
         *
         * @param types The unique names of the event types to associate with the given
         * listener.
         *
         * @param listener The function to invoke when an event having any of the given types is dispatched.
         * The {@link Event} object provided to {@link Event.Target#dispatch dispatch()} will be passed to
         * this function, along with the dispatching Event.Target.
         */
        onEach(types: string[], listener: TargetListener): void;

        /**
         * Dispatches the given event, invoking all event handlers registered with
         * this Guacamole.Event.Target for that event's
         * {@link Guacamole.Event#type type}.
         *
         * @param event
         *     The event to dispatch.
         */
        dispatch(event: Event): void;

        /**
         * Unregisters a listener that was previously registered with
         * {@link Guacamole.Event.Target#on on()} or
         * {@link Guacamole.Event.Target#onEach onEach()}. If no such listener was
         * registered, this function has no effect. If multiple copies of the same
         * listener were registered, the first listener still registered will be
         * removed.
         *
         * @param type
         *     The unique name of the event type handled by the listener being
         *     removed.
         *
         * @param listener
         *     The listener function previously provided to
         *     {@link Guacamole.Event.Target#on on()}or
         *     {@link Guacamole.Event.Target#onEach onEach()}.
         *
         * @returns {!boolean}
         *     true if the specified listener was removed, false otherwise.
         */
        off(type: string, listener: TargetListener): boolean;

        /**
         * Unregisters listeners that were previously registered with
         * {@link Guacamole.Event.Target#on on()} or
         * {@link Guacamole.Event.Target#onEach onEach()}. If no such listeners
         * were registered, this function has no effect. If multiple copies of the
         * same listener were registered for the same event type, the first
         * listener still registered will be removed.
         * <p>
         * Invoking this function is equivalent to manually invoking
         * {@link Guacamole.Event.Target#off off()} for each of the provided types.
         *
         * @param types
         *     The unique names of the event types handled by the listeners being
         *     removed.
         *
         * @param listener
         *     The listener function previously provided to
         *     {@link Guacamole.Event.Target#on on()} or
         *     {@link Guacamole.Event.Target#onEach onEach()}.
         *
         * @returns
         *     true if any of the specified listeners were removed, false
         *     otherwise.
         */
        offEach(types: string[], listener: TargetListener): boolean;
    }
}
