import { Event as GuacamoleEvent } from './Event';
import { Position } from './Position';
import { Mouse } from './Mouse';

export {};

/**
 * An object which can dispatch {@link Mouse.Event} objects
 * representing mouse events. These mouse events may be produced from an actual
 * mouse device (as with {@link Mouse}), from an emulated mouse
 * device (as with {@link Mouse.Touchpad}, or may be programmatically
 * generated (using functions like [dispatch()]{@link MouseEventTarget#dispatch},
 * [press()]{@link MouseEventTarget#press}, and
 * [release()]{@link MouseEventTarget#release}).
 */
export class MouseEventTarget extends GuacamoleEvent.Target {
    /**
     * The current mouse state. The properties of this state are updated when
     * mouse events fire. This state object is also passed in as a parameter to
     * the handler of any mouse events.
     */
    currentState: Mouse.State;

    /**
     * Presses the given mouse button, if it isn't already pressed. Valid
     * button names are defined by {@link Mouse.State.Buttons} and
     * correspond to the button-related properties of
     * {@link Mouse.State}.
     *
     * @fires MouseEventTarget#mousedown
     *
     * @param button
     *     The name of the mouse button to press, as defined by
     *     {@link Mouse.State.Buttons}.
     *
     * @param [events=[]]
     *     The DOM events that are related to the mouse button press, if any.
     */
    press(button: Mouse.State.Buttons, events?: Mouse.Event | Mouse.Event[]): void;

    /**
     * Releases the given mouse button, if it isn't already released. Valid
     * button names are defined by {@link Mouse.State.Buttons} and
     * correspond to the button-related properties of
     * {@link Mouse.State}.
     *
     * @fires MouseEventTarget#mouseup
     *
     * @param button
     *     The name of the mouse button to release, as defined by
     *     {@link Mouse.State.Buttons}.
     *
     * @param [events=[]]
     *     The DOM events related to the mouse button release, if any.
     */
    release(button: Mouse.State.Buttons, events?: Mouse.Event | Mouse.Event[]): void;

    /**
     * Clicks (presses and releases) the given mouse button. Valid button
     * names are defined by {@link Mouse.State.Buttons} and
     * correspond to the button-related properties of
     * {@link Mouse.State}.
     *
     * @fires MouseEventTarget#mousedown
     * @fires MouseEventTarget#mouseup
     *
     * @param button
     *     The name of the mouse button to click, as defined by
     *     {@link Mouse.State.Buttons}.
     *
     * @param [events=[]]
     *     The DOM events related to the click, if any.
     */
    click(button: Mouse.State.Buttons, events?: Mouse.Event | Mouse.Event[]): void;

    /**
     * Moves the mouse to the given coordinates.
     *
     * @fires MouseEventTarget#mousemove
     *
     * @param {!(Position|object)} position
     *     The new coordinates of the mouse pointer. This object may be a
     *     {@link Position} or any object with "x" and "y"
     *     properties.
     *
     * @param {Event|Event[]} [events=[]]
     *     The DOM events related to the mouse movement, if any.
     */
    move(position: Position | object, events?: Mouse.Event | Mouse.Event[]): void;

    /**
     * Notifies event listeners that the mouse pointer has left the boundaries
     * of the area being monitored for mouse events.
     *
     * @fires MouseEventTarget#mouseout
     *
     * @param [events=[]]
     *     The DOM events related to the mouse leaving the boundaries of the
     *     monitored object, if any.
     */
    out(events?: Mouse.Event | Mouse.Event[]): void;

    /**
     * Releases all mouse buttons that are currently pressed. If all mouse
     * buttons have already been released, this function has no effect.
     *
     * @fires MouseEventTarget#mouseup
     *
     * @param [events=[]]
     *     The DOM event related to all mouse buttons being released, if any.
     */
    reset(events?: Mouse.Event | Mouse.Event[]): void;
}
