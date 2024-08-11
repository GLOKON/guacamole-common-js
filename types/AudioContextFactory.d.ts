/**
 * Maintains a singleton instance of the Web Audio API AudioContext class,
 * instantiating the AudioContext only in response to the first call to
 * getAudioContext(), and only if no existing AudioContext instance has been
 * provided via the singleton property. Subsequent calls to getAudioContext()
 * will return the same instance.
 */
export class AudioContextFactory {
    /**
     * A singleton instance of a Web Audio API AudioContext object, or null if
     * no instance has yes been created. This property may be manually set if
     * you wish to supply your own AudioContext instance, but care must be
     * taken to do so as early as possible. Assignments to this property will
     * not retroactively affect the value returned by previous calls to
     * getAudioContext().
     */
    static singleton: AudioContext | null;

    /**
     * Returns a singleton instance of a Web Audio API AudioContext object.
     *
     * @return A singleton instance of a Web Audio API AudioContext object, or null
     * if the Web Audio API is not supported.
     */
    static getAudioContext(): AudioContext | null;
}
