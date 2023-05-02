// parse the user attributes from the SSO response
export function parse_attributes(data) {
    const first_name_regex = /<strong>givenName<\/strong>:\s+([A-Za-z]+)\s*<strong>/;
    var found = data.match(first_name_regex);
    const first_name = found[1];

    const last_name_regex = /<strong>sn<\/strong>:\s+([A-Za-z]+)<\/pre>/;
    found = data.match(last_name_regex);
    const last_name = found[1];

    const mail_regex = /<strong>mail<\/strong>:\s+([\w@.]+)\s*<strong>/;
    found = data.match(mail_regex);
    const email = found[1];

    console.log("SSO Values:")
    console.log(first_name)
    console.log(last_name)
    console.log(email)

    return [first_name, last_name, email]
}
