mailgun = require("mailgun")
mailgun.initialize("mg.onereminder.co", "key-1d18d71a2638337f57f73259704aa420")

Parse.Cloud.afterSave "Contact", (request) ->

  email = request.object.get 'email'

  mailgun.sendEmail({
    to: "leo@onereminder.co"
    from: "beta@onereminder.co"
    subject: email + " has just registered for Sorted Beta!"
    text: "Their email is: " + email
  }, {
    success: (httpResponse) ->
      console.log httpResponse
      console.log email
      console.log "Email sent successfully"
    error: (httpResponse) ->
      console.error httpResponse
      console.log email
      console.error "Uh oh, something went wrong"
  })
