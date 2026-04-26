# mailspring-reply-to-from

> A [Mailspring](https://getmailspring.com/) plugin that adds a **Reply-To** field to the email composer.

Mailspring has no built-in UI for setting a `Reply-To` header when composing emails. This plugin adds a **↩ Reply-To** button to the composer toolbar that lets you set one with a single click.

---

## Installing

1. __[Grab the latest release](../../releases)__
2. Extract the `zip` somewhere
3. From the Mailspring menu, select `Developer > Install a Plugin...`. In the dialog, choose the folder that was extracted from the zip file to install the plugin
4. Reopen Mailspring

---

## Usage

1. Open a new compose window
2. Click the **↩ Reply-To** button in the bottom toolbar
3. Type the reply-to address (supports comma-separated multiple addresses)
4. Press **Save BTN** or hit Enter

The button label updates to show the current Reply-To address so you can see at a glance when one is set. Click it again to change or clear it.

---

## How it works

Mailspring's `Message` model already has a `replyTo` field — it just isn't exposed in the composer UI. This plugin writes to that field via the draft session, which Mailspring's sync engine then includes as a `Reply-To:` header when the message is sent.

No build step or `npm install` required. The plugin is plain JavaScript.

---

## Contributing

PRs and issues welcome! If Mailspring exposes a proper header injection slot in a future version, the goal would be to migrate to a native inline field row (like Cc/Bcc) rather than a toolbar button.
