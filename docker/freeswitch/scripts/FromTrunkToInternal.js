use('CURL');

const curl = new CURL();
const middleware_ip = getGlobalVariable('middleware_ip');
const destination_number = session.getVariable('sip_to_user');
const domain_name = session.getVariable('domain_name');
const numberRegex = /^\d+$/;
function userInternalNumber(data) {
    console_log('console', data + '\n');

    if (!data || !numberRegex.test(data)) {
        return 'noData';
    }

    return data;
}

let res = curl.run(
    'GET',
    `http://${middleware_ip}:3000/user/external-to-internal`,
    'destinationNumber=' + destination_number,
    userInternalNumber,
    '',
    ''
);

session.execute('set', 'hangup_after_bridge=true');
if (res !== 'noData') {
    session.execute('bridge', 'user/' + res + '-webb@' + domain_name + ',user/' + res + '-phone@' + domain_name);
}
session.answer();
session.execute('playback', 'ivr/ivr-extension_number.wav');
session.execute('playback', 'voicemail/vm-not_available.wav');
session.execute('sleep', '2000');
session.hangup();
