const destination_number = session.getVariable('sip_to_user');

const headerValue = session.getVariable('sip_i_x_NumberToShow');
if (headerValue) {
    session.execute('set', 'effective_caller_id_number=' + headerValue);
}

session.execute('set', 'effective_caller_id_name=Customer First');
session.execute('bridge', 'sofia/gateway/Trunk/+' + destination_number);
