const args = argv;

const destinationQuery = args[0];
const displayNumber = args[1];
function hangup_function_name() {
    console_log('console', 'Hangup function called\n');
    exit();
}
console_log('console', 'Destination Query:' + destinationQuery + ' DisplayNumber ' + displayNumber + '\n');

session.execute('set', 'effective_caller_id_number=' + displayNumber);

const result = session.setHangupHook(hangup_function_name);
console_log('console', 'Result: ' + result + '\n');
session.execute('set', 'hangup_after_bridge=true');

session.execute('bridge', destinationQuery);
// Körs om ingen svarar
session.execute('playback', 'ivr/ivr-extension_number.wav');
session.execute('playback', 'voicemail/vm-not_available.wav');
session.execute('sleep', '2000');
