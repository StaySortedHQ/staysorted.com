var settings = {
    'execute_api_domain' : 'z6xbr29lo3.execute-api.us-east-1.amazonaws.com',
    // execute_api_domain example: fbcwperrgh.execute-api.eu-west-1.amazonaws.com
    'submit_button' : '#submit',
    'email_form' : '#contact-form',
    'alert' : '#alert'
};

function handle_success( message ) {
    $('#alert-message').html("Message Sent. We'll get back to you ASAP.");
    $('#alert-message').fadeIn(300).addClass('success').removeClass('hidden');
}
function handle_error( message ) {
    $('#alert-message').html("Sorry. An error occurred: " + message);
    $('#alert-message').fadeIn(300).addClass('error').removeClass('hidden');
}

function isEmpty(string) {
    var isEmpty = (!string || 0 === string.length);
    return isEmpty
}

function validateName(name) {
    var empty = isEmpty(name);
    if (empty) {
        $('.name-error').fadeIn(300).removeClass('hidden');
    } else {
        $('.name-error').fadeOut(300).addClass('hidden');
    }
    return !empty
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(String(email).toLowerCase());
    if (valid) {
        $('.email-error').fadeOut(300).addClass('hidden');
    } else {
        $('.email-error').fadeIn(300).removeClass('hidden');
    }
    return valid;
}

function validateMessage(message) {
    var empty = isEmpty(message);
    if (empty) {
        $('.message-error').fadeIn(300).removeClass('hidden');
    } else {
        $('.message-error').fadeOut(300).addClass('hidden');
    }
    return !empty
}

function resetAlertMessage() {
    $('#alert-message')
        .fadeOut(150)
        .addClass('hidden')
        .removeClass('error success');
}

$( document ).ready( function() {
    $(settings.submit_button).click( function(e) {
        e.preventDefault();
        resetAlertMessage();

        // Get data
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Validate
        var nameIsValid = validateName(name);
        var emailIsValid = validateEmail(email);
        var messageIsValid = validateMessage(message);

        var isValid = nameIsValid && emailIsValid && messageIsValid;

        if (isValid) {
           // Package as JSON
            var jsonData = {
                "name": name,
                "email": email,
                "content": message
            }

            console.log(jsonData);

            // Send POST to AWS API Gateway
            $.ajax({
                type: "POST",
                url: 'https://' + settings.execute_api_domain + '/Contact',
                contentType: "application/json",
                dataType: 'json',
                data: jsonData,
                success: function(data) {
                    try {
                        if ( data.ok ) {
                            handle_success('Success');
                        }
                        else {
                            handle_error(data.error);
                        }
                    }
                    catch ( error ) {
                        handle_error(error);
                    }
                },
                error: function( xhr, status, error ) {
                    handle_error( 'Unknown transport error: ' + status + ( error ? ' ' + error : '' ) );
                }
            });
        }

    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250YWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzZXR0aW5ncyA9IHtcbiAgICAnZXhlY3V0ZV9hcGlfZG9tYWluJyA6ICd6NnhicjI5bG8zLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tJyxcbiAgICAvLyBleGVjdXRlX2FwaV9kb21haW4gZXhhbXBsZTogZmJjd3BlcnJnaC5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVxuICAgICdzdWJtaXRfYnV0dG9uJyA6ICcjc3VibWl0JyxcbiAgICAnZW1haWxfZm9ybScgOiAnI2NvbnRhY3QtZm9ybScsXG4gICAgJ2FsZXJ0JyA6ICcjYWxlcnQnXG59O1xuXG5mdW5jdGlvbiBoYW5kbGVfc3VjY2VzcyggbWVzc2FnZSApIHtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmh0bWwoXCJNZXNzYWdlIFNlbnQuIFdlJ2xsIGdldCBiYWNrIHRvIHlvdSBBU0FQLlwiKTtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmZhZGVJbigzMDApLmFkZENsYXNzKCdzdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xufVxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yKCBtZXNzYWdlICkge1xuICAgICQoJyNhbGVydC1tZXNzYWdlJykuaHRtbChcIlNvcnJ5LiBBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBtZXNzYWdlKTtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmZhZGVJbigzMDApLmFkZENsYXNzKCdlcnJvcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eShzdHJpbmcpIHtcbiAgICB2YXIgaXNFbXB0eSA9ICghc3RyaW5nIHx8IDAgPT09IHN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiBpc0VtcHR5XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG4gICAgdmFyIGVtcHR5ID0gaXNFbXB0eShuYW1lKTtcbiAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgJCgnLm5hbWUtZXJyb3InKS5mYWRlSW4oMzAwKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLm5hbWUtZXJyb3InKS5mYWRlT3V0KDMwMCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICByZXR1cm4gIWVtcHR5XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgIHZhciB2YWxpZCA9IHJlLnRlc3QoU3RyaW5nKGVtYWlsKS50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgJCgnLmVtYWlsLWVycm9yJykuZmFkZU91dCgzMDApLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuZW1haWwtZXJyb3InKS5mYWRlSW4oMzAwKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB2YXIgZW1wdHkgPSBpc0VtcHR5KG1lc3NhZ2UpO1xuICAgIGlmIChlbXB0eSkge1xuICAgICAgICAkKCcubWVzc2FnZS1lcnJvcicpLmZhZGVJbigzMDApLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcubWVzc2FnZS1lcnJvcicpLmZhZGVPdXQoMzAwKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIHJldHVybiAhZW1wdHlcbn1cblxuZnVuY3Rpb24gcmVzZXRBbGVydE1lc3NhZ2UoKSB7XG4gICAgJCgnI2FsZXJ0LW1lc3NhZ2UnKVxuICAgICAgICAuZmFkZU91dCgxNTApXG4gICAgICAgIC5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdlcnJvciBzdWNjZXNzJyk7XG59XG5cbiQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICQoc2V0dGluZ3Muc3VibWl0X2J1dHRvbikuY2xpY2soIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXNldEFsZXJ0TWVzc2FnZSgpO1xuXG4gICAgICAgIC8vIEdldCBkYXRhXG4gICAgICAgIHZhciBuYW1lID0gJCgnI25hbWUnKS52YWwoKTtcbiAgICAgICAgdmFyIGVtYWlsID0gJCgnI2VtYWlsJykudmFsKCk7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJCgnI21lc3NhZ2UnKS52YWwoKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZVxuICAgICAgICB2YXIgbmFtZUlzVmFsaWQgPSB2YWxpZGF0ZU5hbWUobmFtZSk7XG4gICAgICAgIHZhciBlbWFpbElzVmFsaWQgPSB2YWxpZGF0ZUVtYWlsKGVtYWlsKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VJc1ZhbGlkID0gdmFsaWRhdGVNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gbmFtZUlzVmFsaWQgJiYgZW1haWxJc1ZhbGlkICYmIG1lc3NhZ2VJc1ZhbGlkO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgIC8vIFBhY2thZ2UgYXMgSlNPTlxuICAgICAgICAgICAgdmFyIGpzb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxuICAgICAgICAgICAgICAgIFwiZW1haWxcIjogZW1haWwsXG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coanNvbkRhdGEpO1xuXG4gICAgICAgICAgICAvLyBTZW5kIFBPU1QgdG8gQVdTIEFQSSBHYXRld2F5XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vJyArIHNldHRpbmdzLmV4ZWN1dGVfYXBpX2RvbWFpbiArICcvQ29udGFjdCcsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YToganNvbkRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBkYXRhLm9rICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZV9zdWNjZXNzKCdTdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZV9lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiggeGhyLCBzdGF0dXMsIGVycm9yICkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoICdVbmtub3duIHRyYW5zcG9ydCBlcnJvcjogJyArIHN0YXR1cyArICggZXJyb3IgPyAnICcgKyBlcnJvciA6ICcnICkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59KTsiXSwiZmlsZSI6ImNvbnRhY3QuanMifQ==
