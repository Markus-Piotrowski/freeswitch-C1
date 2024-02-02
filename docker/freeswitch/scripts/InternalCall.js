const caller_id = session.getVariable('caller_id_number');
const destination_number = session.getVariable('sip_to_user');
const domain_name = session.getVariable('domain_name');

// Custom Header send during accept (store onAccept)
// session.execute("set", "sip_rh_X-Reason=" + destination_number);
// // Custom Header send during reject (store onReject)
// session.execute("set", "sip_bye_h_X-Reason=Not My problem");
// // Sends a custom headder !!! Needs to be sip_h_X-TheNameOfTheHeader
// session.setVariable("sip_h_X-TestHeadder", "Detta är ett test skickat från fs");

console_log('console', caller_id + ' called ' + destination_number + domain_name + '\n');

session.execute('set', 'hangup_after_bridge=true');
session.execute(
    'bridge',
    'user/' + destination_number + '-webb@' + domain_name + ', user/' + destination_number + '-phone@' + domain_name
);

session.execute('playback', 'ivr/ivr-extension_number.wav');
session.execute('phrase', 'voicemail_say_number,' + destination_number);
session.execute('playback', 'voicemail/vm-not_available.wav');
session.execute('sleep', '2000');
// console_log("ERR", "INFO NEXT \n");
// session.execute("info");
// !! Doesnt work
// let isInCall = session.getVariable("sip_bye_h_X-Redial") === "true";
// let delay = 1; // in seconds
// console_log("CONSOLE", "START LOOP " + Date.now() + " \n");
// while (isInCall) {
//   console_log("CONSOLE", "WHILE START " + " \n");
//   console_log("CONSOLE", "Before Delay" + " \n");
//   session.execute("sleep", delay * 1000 + "");
//   session.setVariable("sip_h_X-CallStatus", "AutoAnswer=true");
//   console_log("CONSOLE", "After Delay, Before Bridge" + " \n");
//   session.execute(
//     "bridge",
//     "user/" +
//       destination_number +
//       "-webb@" +
//       domain_name +
//       ", user/" +
//       destination_number +
//       "-phone@" +
//       domain_name
//   );
//   const statusS = session.getVariable("DIALSTATUS");
//   console_log("CONSOLE", "DIALSTATUS: " + statusS + " \n");

//   delay = delay += 5;
//   console_log("CONSOLE", "Delay: " + delay + " \n");
//   if (delay > 10) {
//     timedOut();
//     isInCall = false;
//   }
// }
// console_log("CONSOLE", "After While " + " \n");

// function timedOut() {
//   session.execute("playback", "C1/_waiting_for_you.wav");
//   session.execute("playback", "ivr/ivr-extension_number.wav");
//   session.execute("phrase", "voicemail_say_number," + destination_number);
//   session.execute("playback", "voicemail/vm-not_available.wav");
//   session.execute("sleep", "2000");
//   exit();
// }
