name = argv[0];
realm = argv[1];
proxy = argv[2];
username = argv[3];
password = argv[4];
register = argv[5];
context = argv[6];
caller_id_in_from = argv[7];

for (let index = 0; index < argv.length; index++) {
    const element = argv[index];
    console_log('CONSOLE', 'Arg:' + index + 'Value:' + element + '\n');
}

fd = new FileIO('usr/local/freeswitch/conf/sip_profiles/gateways/' + name + '.xml', 'wc');

fd.write(`<gateway name="${name}">\n`);
fd.write(`	<param name="realm" value="${realm}"/>\n`);
fd.write(`	<param name="proxy" value="${proxy}"/>\n`);
fd.write(`	<param name="username" value="${username}"/>\n`);
fd.write(`	<param name="password" value="${password}"/>\n`);
fd.write(`	<param name="register" value="${register}"/>\n`);
fd.write(`	<param name="context" value="${context}"/>\n`);
fd.write(`	<param name="caller-id-in-from" value="${caller_id_in_from}"/>\n`);
fd.write(`</gateway>\n`);

apiExecute('sofia', 'profile external rescan');
