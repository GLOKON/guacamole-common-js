import { AudioRecorder } from './AudioRecorder';
import { Mimetype } from './GuacCommon';
import { OutputStream } from './OutputStream';

/**
 * Implementation of Guacamole.AudioRecorder providing support for raw PCM
 * format audio. This recorder relies only on the Web Audio API and does not
 * require any browser-level support for its audio formats.
 */
export class RawAudioRecorder extends AudioRecorder {
    /**
     * @param stream The Guacamole.OutputStream to write audio data to.
     *
     * @param mimetype The mimetype of the audio data to send along the provided stream, which
     * must be a "audio/L8" or "audio/L16" mimetype with necessary parameters,
     * such as: "audio/L16;rate=44100,channels=2".
     */
    constructor(stream: OutputStream, mimetype: Mimetype);
}
