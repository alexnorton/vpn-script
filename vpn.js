#!/usr/bin/env osascript -l JavaScript

function run(args) {
  const itemName = args[0];
  const account = args[1] || "my";

  if (!itemName || args.includes('--help')) {
    return 'Usage: vpn.js [item name] [account]';
  }

  const currentApp = Application.currentApplication();
  currentApp.includeStandardAdditions = true;

  console.log("Getting credentials");

  const itemJson = currentApp.doShellScript(
    `/usr/local/bin/op item get "${itemName}" --account ${account} --format json`
  );
  const item = JSON.parse(itemJson);

  const username = getField(item, "username").value;
  const password = getField(item, "password").value;
  const otp = getField(item, "one-time password").totp;

  console.log("Got credentials");

  const systemEvents = Application("System Events");
  const globalProtect = systemEvents.processes.byName("GlobalProtect");

  console.log("Opening GlobalProtect");

  globalProtect.menuBars[1].menuBarItems[0].click();

  console.log("Opened GlobalProtect");

  const window = globalProtect.windows[0];

  console.log("Initiating connection");

  waitForButton(window, "Connect").click();

  const signInButton = waitForButton(window, "Sign In");

  console.log("Initiated connection");

  console.log("Filling login");

  window.textFields[0].value = username;
  window.textFields[1].value = password;

  console.log("Submitting login");

  signInButton.click();

  const okButton = waitForButton(window, "OK");

  console.log("Filling one-time password");

  window.textFields[0].value = otp;

  console.log("Submitting one-time password");

  okButton.click();

  console.log("Done");
}

function getField(item, label) {
  return item.fields.find((field) => field.label === label);
}

function waitForButton(window, name) {
  let button = null;

  while (!button) {
    for (let i = 0; i < window.buttons.length; i++) {
      if (window.buttons[i].name() === name) {
        button = window.buttons[i];
        break;
      }
    }

    delay(0.1);
  }

  return button;
}
