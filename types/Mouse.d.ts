import { Event as GuacamoleEvent } from './Event';
import { Position } from './Position';
import { MouseEventTarget } from './MouseEventTarget';

export {};

export namespace Mouse {
    export {};

    /**
     * Simple container for properties describing the state of a mouse.
     */
    export class State extends Position {
        /**
         * @param [template={}]
         *     The object whose properties should be copied within the new
         *     Guacamole.Mouse.State.
         */
        constructor(template?: State);

        /**
         * Whether the left mouse button is currently pressed.
         */
        left: boolean;

        /**
         * Whether the middle mouse button is currently pressed.
         */
        middle: boolean;

        /**
         * Whether the right mouse button is currently pressed.
         */
        right: boolean;

        /**
         * Whether the up mouse button is currently pressed. This is the fourth
         * mouse button, associated with upward scrolling of the mouse scroll
         * wheel.
         */
        up: boolean;

        /**
         * Whether the down mouse button is currently pressed. This is the fifth
         * mouse button, associated with downward scrolling of the mouse scroll
         * wheel.
         */
        down: boolean;
    }

    export namespace State {
        export enum Buttons {
            /**
             * The name of the {@link Mouse.State} property representing the
             * left mouse button.
             *
             * @constant
             * @type {!string}
             */
            LEFT = 'left',

            /**
             * The name of the {@link Mouse.State} property representing the
             * middle mouse button.
             *
             * @constant
             * @type {!string}
             */
            MIDDLE = 'middle',

            /**
             * The name of the {@link Mouse.State} property representing the
             * right mouse button.
             *
             * @constant
             * @type {!string}
             */
            RIGHT = 'right',

            /**
             * The name of the {@link Mouse.State} property representing the
             * up mouse button (the fourth mouse button, clicked when the mouse scroll
             * wheel is scrolled up).
             *
             * @constant
             * @type {!string}
             */
            UP = 'up',

            /**
             * The name of the {@link Mouse.State} property representing the
             * down mouse button (the fifth mouse button, clicked when the mouse scroll
             * wheel is scrolled up).
             *
             * @constant
             * @type {!string}
             */
            DOWN = 'down',
        }
    }

    /**
     * Base event type for all mouse events. The mouse producing the event may be
     * the user's local mouse (as with {@link Mouse}) or an emulated
     * mouse (as with {@link Mouse.Touchpad}).
     */
    export class Event extends GuacamoleEvent.DOMEvent {
        /**
         * @param type
         *     The type name of the event ("mousedown", "mouseup", etc.)
         *
         * @param state
         *     The current mouse state.
         *
         * @param [events=[]]
         *     The DOM events that are related to this event, if any.
         */
        constructor(type: string, state: State, events?: Event | Event[]);

        /**
         * The current mouse state at the time this event was fired.
         */
        state: State;
    }

    export namespace Event {
        export {};

        export type Target = typeof MouseEventTarget;
    }

    /**
     * Provides cross-browser relative touch event translation for a given element.
     *
     * Touch events are translated into mouse events as if the touches occurred
     * on a touchpad (drag to push the mouse pointer, tap to click).
     *
     * @example
     * var touchpad = new Guacamole.Mouse.Touchpad(client.getDisplay().getElement());
     *
     * // Emulate a mouse using touchpad-style gestures, forwarding all mouse
     * // interaction over Guacamole connection
     * touchpad.onEach(['mousedown', 'mousemove', 'mouseup'], function sendMouseEvent(e) {
     *
     *     // Re-show software mouse cursor if possibly hidden by a prior call to
     *     // showCursor(), such as a "mouseout" event handler that hides the
     *     // cursor
     *     client.getDisplay().showCursor(true);
     *
     *     client.sendMouseState(e.state, true);
     *
     * });
     */
    export class Touchpad extends MouseEventTarget {
        /**
         * @param element The Element to use to provide touch events.
         */
        constructor(element: HTMLElement);

        /**
         * The distance a two-finger touch must move per scrollwheel event, in
         * pixels.
         */
        scrollThreshold: number;

        /**
         * The maximum number of milliseconds to wait for a touch to end for the
         * gesture to be considered a click.
         */
        clickTimingThreshold: number;

        /**
         * The maximum number of pixels to allow a touch to move for the gesture to
         * be considered a click.
         */
        clickMoveThreshold: number;
    }

    /**
     * Provides cross-browser absolute touch event translation for a given element.
     *
     * Touch events are translated into mouse events as if the touches occurred
     * on a touchscreen (tapping anywhere on the screen clicks at that point,
     * long-press to right-click).
     *
     * @example
     * var touchscreen = new Guacamole.Mouse.Touchscreen(client.getDisplay().getElement());
     *
     * // Emulate a mouse using touchscreen-style gestures, forwarding all mouse
     * // interaction over Guacamole connection
     * touchscreen.onEach(['mousedown', 'mousemove', 'mouseup'], function sendMouseEvent(e) {
     *
     *     // Re-show software mouse cursor if possibly hidden by a prior call to
     *     // showCursor(), such as a "mouseout" event handler that hides the
     *     // cursor
     *     client.getDisplay().showCursor(true);
     *
     *     client.sendMouseState(e.state, true);
     *
     * });
     */
    export class Touchscreen extends Touchpad {
        /**
         * The amount of time a press must be held for long press to be
         * detected.
         */
        longPressThreshold: number;
    }
}

/**
 * Provides cross-browser mouse events for a given element. The events of
 * the given element are automatically populated with handlers that translate
 * mouse events into a non-browser-specific event provided by the
 * Guacamole.Mouse instance.
 *
 * @example
 * var mouse = new Guacamole.Mouse(client.getDisplay().getElement());
 *
 * // Forward all mouse interaction over Guacamole connection
 * mouse.onEach(['mousedown', 'mousemove', 'mouseup'], function sendMouseEvent(e) {
 *     client.sendMouseState(e.state, true);
 * });
 *
 * @example
 * // Hide software cursor when mouse leaves display
 * mouse.on('mouseout', function hideCursor() {
 *     client.getDisplay().showCursor(false);
 * });
 */
export class Mouse extends MouseEventTarget {
    /**
     * @param element The Element to use to provide mouse events.
     */
    constructor(element: HTMLDocument | HTMLElement);

    /**
     * The number of mousemove events to require before re-enabling mouse
     * event handling after receiving a touch event.
     */
    touchMouseThreshold: number;

    /**
     * The minimum amount of pixels scrolled required for a single scroll button
     * click.
     */
    scrollThreshold: number;

    /**
     * The number of pixels to scroll per line.
     */
    PIXELS_PER_LINE: number;

    /**
     * The number of pixels to scroll per page.
     */
    PIXELS_PER_PAGE: number;

    /**
     * Changes the local mouse cursor to the given canvas, having the given
     * hotspot coordinates. This affects styling of the element backing this
     * Guacamole.Mouse only, and may fail depending on browser support for
     * setting the mouse cursor.
     *
     * If setting the local cursor is desired, it is up to the implementation
     * to do something else, such as use the software cursor built into
     * Guacamole.Display, if the local cursor cannot be set.
     *
     * @param canvas
     *     The cursor image.
     *
     * @param x
     *     The X-coordinate of the cursor hotspot.
     *
     * @param y
     *     The Y-coordinate of the cursor hotspot.
     *
     * @return
     *     true if the cursor was successfully set, false if the cursor could
     *     not be set for any reason.
     */
    setCursor(canvas: HTMLCanvasElement, x: number, y: number): boolean;
}
