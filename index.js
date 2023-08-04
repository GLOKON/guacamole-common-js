require('./src/ArrayBufferReader');
require('./src/ArrayBufferWriter');
require('./src/AudioContextFactory');
require('./src/AudioPlayer');
require('./src/AudioRecorder');
require('./src/BlobReader');
require('./src/BlobWriter');
require('./src/Client');
require('./src/DataURIReader');
require('./src/Display');
require('./src/Event');
require('./src/InputSink');
require('./src/InputStream');
require('./src/IntegerPool');
require('./src/JSONReader');
require('./src/Keyboard');
require('./src/KeyEventInterpreter');
require('./src/Layer');
require('./src/Mouse');
require('./src/Namespace');
require('./src/Object');
require('./src/OnScreenKeyboard');
require('./src/OutputStream');
require('./src/Parser');
require('./src/Position');
require('./src/RawAudioFormat');
require('./src/SessionRecording');
require('./src/Status');
require('./src/StringReader');
require('./src/StringWriter');
require('./src/Touch');
require('./src/Tunnel');
require('./src/UTF8Parser');
require('./src/Version');
require('./src/VideoPlayer');

if(module && module.exports) {
    module.exports = Guacamole;
} else {
    window.Guacamole = Guacamole;
}
