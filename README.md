# GlobalProtect 1Password login automation script

This is a script to automate logging into a GlobalProtect VPN on macOS using credentials including an MFA code stored in 1Password.

## Preparation

- Install the [1Password CLI](https://developer.1password.com/docs/cli/)
- [Enable the 1Password app integration](https://developer.1password.com/docs/cli/about-biometric-unlock/#turn-on-the-1password-app-integration)

## Installation

Clone this repo or download [`vpn.js`](/vpn.js) and make it executable.

Note: this doesn't require Node.js since it uses the `osascript` interpreter built in to macOS.

## Usage

Supply the name of the 1Password item containing the credentials as an argument to the script: 

```sh
$ ./vpn.js "My VPN login"
```

You can also specify the 1Password account subdomain to use as the second argument (defaults to `my` if not given):

```sh
$ ./vpn.js "My VPN login" "company-account"
```

## Future improvements

- Sometimes the GlobalProtect UI can get into a weird state which the script doesn't know how to handle, it could be made more resilient
- It just connects to whatever portal and gateway is already selected, it could automate selecting these and using different credential depending on the selection
