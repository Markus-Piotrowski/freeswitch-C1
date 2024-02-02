// This works : https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Client-and-Developer-Interfaces/JavaScript/JavaScript-API-Reference/Run_13173558/

const from_trunk = session.getVariable('from_trunk');
const caller_id = session.getVariable('caller_id_number');
const destination_number = session.getVariable('sip_to_user');
const domain_name = session.getVariable('domain_name');
const uuid = session.getVariable('uuid');

session.execute('set', 'landing_number=' + destination_number);

console_log('console', caller_id + ' called ' + destination_number + '\n');
console_log('console', 'From Trunk:' + from_trunk + '\n');
// const recordings_dir = '/usr/local/freeswitch/recordings';
// const record_file_name = `${recordings_dir}/${destination_number}_${uuid}.wav inline = 'true'`;
// session.execute('export', `execute_on_answer=record_session ${record_file_name}`);

// session.execute('socket', '$${middleware_ip}:$${esl_port} async full');

if (from_trunk === 'true') {
    session.execute('javascript', 'FromTrunkToInternal.js');
    // session.execute("javascript", "ExternalCall.js");
} else if (/^(\d{3,4})$/.test(destination_number)) {
    session.execute('javascript', 'InternalCall.js');
} else if (/^123456$/.test(destination_number)) {
    session.execute('javascript', 'IVR.Test.js');
} else if (/^10000$/.test(destination_number)) {
    session.execute('bridge', 'user/5000@' + domain_name);
} else if (/^\+?\d{10,11}$/.test(destination_number)) {
    session.execute('javascript', 'ExternalCall.js');
}

exit();
