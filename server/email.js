// We add this setting to tell nodemailer the host isn't secure during dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transport = nodemailer.createTransport({
  port: 1025,
  // other settings...
});

if (process.env.NODE_ENV !== 'development') {
  const MailDev = await import("maildev")
  const maildev = new MailDev()
  maildev.listen()
  maildev.on("new", function (email) {
    console.log('NEW EMAIL', email)
  })
}
