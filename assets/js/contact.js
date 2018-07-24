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
// function handle( message_type, message ) {
//     var $return_message_containers = $( settings.return_message_container_selector );
//     if ( $return_message_containers.length ) {
//         $return_message_containers.removeClass( 'success error' );
//         $return_message_containers.addClass( message_type );
//         $return_message_containers.text( message );
//     }
//     else {
//         alert(message_type + ': ' + message);
//     }
// };

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250YWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzZXR0aW5ncyA9IHtcbiAgICAnZXhlY3V0ZV9hcGlfZG9tYWluJyA6ICd6NnhicjI5bG8zLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tJyxcbiAgICAvLyBleGVjdXRlX2FwaV9kb21haW4gZXhhbXBsZTogZmJjd3BlcnJnaC5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVxuICAgICdzdWJtaXRfYnV0dG9uJyA6ICcjc3VibWl0JyxcbiAgICAnZW1haWxfZm9ybScgOiAnI2NvbnRhY3QtZm9ybScsXG4gICAgJ2FsZXJ0JyA6ICcjYWxlcnQnXG59O1xuXG5mdW5jdGlvbiBoYW5kbGVfc3VjY2VzcyggbWVzc2FnZSApIHtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmh0bWwoXCJNZXNzYWdlIFNlbnQuIFdlJ2xsIGdldCBiYWNrIHRvIHlvdSBBU0FQLlwiKTtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmZhZGVJbigzMDApLmFkZENsYXNzKCdzdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xufVxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yKCBtZXNzYWdlICkge1xuICAgICQoJyNhbGVydC1tZXNzYWdlJykuaHRtbChcIlNvcnJ5LiBBbiBlcnJvciBvY2N1cnJlZDogXCIgKyBtZXNzYWdlKTtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmZhZGVJbigzMDApLmFkZENsYXNzKCdlcnJvcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbn1cbi8vIGZ1bmN0aW9uIGhhbmRsZSggbWVzc2FnZV90eXBlLCBtZXNzYWdlICkge1xuLy8gICAgIHZhciAkcmV0dXJuX21lc3NhZ2VfY29udGFpbmVycyA9ICQoIHNldHRpbmdzLnJldHVybl9tZXNzYWdlX2NvbnRhaW5lcl9zZWxlY3RvciApO1xuLy8gICAgIGlmICggJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMubGVuZ3RoICkge1xuLy8gICAgICAgICAkcmV0dXJuX21lc3NhZ2VfY29udGFpbmVycy5yZW1vdmVDbGFzcyggJ3N1Y2Nlc3MgZXJyb3InICk7XG4vLyAgICAgICAgICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLmFkZENsYXNzKCBtZXNzYWdlX3R5cGUgKTtcbi8vICAgICAgICAgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMudGV4dCggbWVzc2FnZSApO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIHtcbi8vICAgICAgICAgYWxlcnQobWVzc2FnZV90eXBlICsgJzogJyArIG1lc3NhZ2UpO1xuLy8gICAgIH1cbi8vIH07XG5cbmZ1bmN0aW9uIGlzRW1wdHkoc3RyaW5nKSB7XG4gICAgdmFyIGlzRW1wdHkgPSAoIXN0cmluZyB8fCAwID09PSBzdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4gaXNFbXB0eVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUobmFtZSkge1xuICAgIHZhciBlbXB0eSA9IGlzRW1wdHkobmFtZSk7XG4gICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICQoJy5uYW1lLWVycm9yJykuZmFkZUluKDMwMCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5uYW1lLWVycm9yJykuZmFkZU91dCgzMDApLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICFlbXB0eVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XG4gICAgdmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICB2YXIgdmFsaWQgPSByZS50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICQoJy5lbWFpbC1lcnJvcicpLmZhZGVPdXQoMzAwKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmVtYWlsLWVycm9yJykuZmFkZUluKDMwMCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdmFyIGVtcHR5ID0gaXNFbXB0eShtZXNzYWdlKTtcbiAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgJCgnLm1lc3NhZ2UtZXJyb3InKS5mYWRlSW4oMzAwKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLm1lc3NhZ2UtZXJyb3InKS5mYWRlT3V0KDMwMCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICByZXR1cm4gIWVtcHR5XG59XG5cbmZ1bmN0aW9uIHJlc2V0QWxlcnRNZXNzYWdlKCkge1xuICAgICQoJyNhbGVydC1tZXNzYWdlJylcbiAgICAgICAgLmZhZGVPdXQoMTUwKVxuICAgICAgICAuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnZXJyb3Igc3VjY2VzcycpO1xufVxuXG4kKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAkKHNldHRpbmdzLnN1Ym1pdF9idXR0b24pLmNsaWNrKCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmVzZXRBbGVydE1lc3NhZ2UoKTtcblxuICAgICAgICAvLyBHZXQgZGF0YVxuICAgICAgICB2YXIgbmFtZSA9ICQoJyNuYW1lJykudmFsKCk7XG4gICAgICAgIHZhciBlbWFpbCA9ICQoJyNlbWFpbCcpLnZhbCgpO1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICQoJyNtZXNzYWdlJykudmFsKCk7XG5cbiAgICAgICAgLy8gVmFsaWRhdGVcbiAgICAgICAgdmFyIG5hbWVJc1ZhbGlkID0gdmFsaWRhdGVOYW1lKG5hbWUpO1xuICAgICAgICB2YXIgZW1haWxJc1ZhbGlkID0gdmFsaWRhdGVFbWFpbChlbWFpbCk7XG4gICAgICAgIHZhciBtZXNzYWdlSXNWYWxpZCA9IHZhbGlkYXRlTWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB2YXIgaXNWYWxpZCA9IG5hbWVJc1ZhbGlkICYmIGVtYWlsSXNWYWxpZCAmJiBtZXNzYWdlSXNWYWxpZDtcblxuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAvLyBQYWNrYWdlIGFzIEpTT05cbiAgICAgICAgICAgIHZhciBqc29uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogbmFtZSxcbiAgICAgICAgICAgICAgICBcImVtYWlsXCI6IGVtYWlsLFxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBtZXNzYWdlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb25EYXRhKTtcblxuICAgICAgICAgICAgLy8gU2VuZCBQT1NUIHRvIEFXUyBBUEkgR2F0ZXdheVxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovLycgKyBzZXR0aW5ncy5leGVjdXRlX2FwaV9kb21haW4gKyAnL0NvbnRhY3QnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGpzb25EYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGF0YS5vayApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfc3VjY2VzcygnU3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oIHhociwgc3RhdHVzLCBlcnJvciApIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKCAnVW5rbm93biB0cmFuc3BvcnQgZXJyb3I6ICcgKyBzdGF0dXMgKyAoIGVycm9yID8gJyAnICsgZXJyb3IgOiAnJyApICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufSk7Il0sImZpbGUiOiJjb250YWN0LmpzIn0=
