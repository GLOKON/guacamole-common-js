import { AudioPlayer } from './AudioPlayer';
import { Mimetype } from './GuacCommon';
import { InputStream } from './InputStream';
export {};

/**
 * Implementation of Guacamole.AudioPlayer providing support for raw PCM format
 * audio. This player relies only on the Web Audio API and does not require any
 * browser-level support for its audio formats.
 */
export class RawAudioPlayer extends AudioPlayer {
    /**
     * @param stream The Guacamole.InputStream to read audio data from.
     *
     * @param mimetype The mimetype of the audio data in the provided stream, which must be a
     * "audio/L8" or "audio/L16" mimetype with necessary parameters, such as: "audio/L16;rate=44100,channels=2".
     */
    constructor(stream: InputStream, mimetype: Mimetype);
}
