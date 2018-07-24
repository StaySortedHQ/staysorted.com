var settings = {
    'execute_api_domain' : 'tulxzrb5g3.execute-api.us-east-1.amazonaws.com',
    // execute_api_domain example: fbcwperrgh.execute-api.eu-west-1.amazonaws.com
    'submit_button_selector' : '#button',
    'email_input_selector' : '#email',
    'return_message_container_selector' : '#alert-message'
};

function handle_success( message ) {
    $('#alert-message').html(message);
    $('#alert-message')
        .fadeIn(300)
        .addClass('success')
        .removeClass('hidden');
}

function handle_error( message ) {
    $('#alert-message').html(message);
    $('#alert-message')
        .fadeIn(300)
        .addClass('error')
        .removeClass('hidden');
}
function handle( message_type, message ) {
    var $return_message_containers = $( settings.return_message_container_selector );
    if ( $return_message_containers.length ) {
        $return_message_containers.removeClass('success error');
        $return_message_containers.addClass(message_type);
        $return_message_containers.html(message);
    }
    else {
        alert( message_type + ': ' + message );
    }
};

function resetAlertMessage() {
    $('#alert-message')
        .fadeOut(150)
        .addClass('hidden')
        .removeClass('error success');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(String(email).toLowerCase());
    return valid
}

$( document ).ready( function() {
    $( settings.submit_button_selector ).click( function() {
        resetAlertMessage();

        var email_value = $(settings.email_input_selector).val();
        var emailIsValid = validateEmail(email_value);

        if (emailIsValid) {
            $.ajax({
                type: "POST",
                url: 'https://' + settings.execute_api_domain + '/dev/invite',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify( { email : email_value } ),
                success: function( data ) {
                    try {
                        if ( data.ok ) {
                            handle_success( 'Success' );
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
        } else {
            handle_error('Please enter a valid email');
        }
    } );
} );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGFjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2V0dGluZ3MgPSB7XG4gICAgJ2V4ZWN1dGVfYXBpX2RvbWFpbicgOiAndHVseHpyYjVnMy5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbScsXG4gICAgLy8gZXhlY3V0ZV9hcGlfZG9tYWluIGV4YW1wbGU6IGZiY3dwZXJyZ2guZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cbiAgICAnc3VibWl0X2J1dHRvbl9zZWxlY3RvcicgOiAnI2J1dHRvbicsXG4gICAgJ2VtYWlsX2lucHV0X3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdyZXR1cm5fbWVzc2FnZV9jb250YWluZXJfc2VsZWN0b3InIDogJyNhbGVydC1tZXNzYWdlJ1xufTtcblxuZnVuY3Rpb24gaGFuZGxlX3N1Y2Nlc3MoIG1lc3NhZ2UgKSB7XG4gICAgJCgnI2FsZXJ0LW1lc3NhZ2UnKS5odG1sKG1lc3NhZ2UpO1xuICAgICQoJyNhbGVydC1tZXNzYWdlJylcbiAgICAgICAgLmZhZGVJbigzMDApXG4gICAgICAgIC5hZGRDbGFzcygnc3VjY2VzcycpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciggbWVzc2FnZSApIHtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpLmh0bWwobWVzc2FnZSk7XG4gICAgJCgnI2FsZXJ0LW1lc3NhZ2UnKVxuICAgICAgICAuZmFkZUluKDMwMClcbiAgICAgICAgLmFkZENsYXNzKCdlcnJvcicpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG59XG5mdW5jdGlvbiBoYW5kbGUoIG1lc3NhZ2VfdHlwZSwgbWVzc2FnZSApIHtcbiAgICB2YXIgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMgPSAkKCBzZXR0aW5ncy5yZXR1cm5fbWVzc2FnZV9jb250YWluZXJfc2VsZWN0b3IgKTtcbiAgICBpZiAoICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLmxlbmd0aCApIHtcbiAgICAgICAgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MgZXJyb3InKTtcbiAgICAgICAgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMuYWRkQ2xhc3MobWVzc2FnZV90eXBlKTtcbiAgICAgICAgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMuaHRtbChtZXNzYWdlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KCBtZXNzYWdlX3R5cGUgKyAnOiAnICsgbWVzc2FnZSApO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHJlc2V0QWxlcnRNZXNzYWdlKCkge1xuICAgICQoJyNhbGVydC1tZXNzYWdlJylcbiAgICAgICAgLmZhZGVPdXQoMTUwKVxuICAgICAgICAuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnZXJyb3Igc3VjY2VzcycpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XG4gICAgdmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICB2YXIgdmFsaWQgPSByZS50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbGlkXG59XG5cbiQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICQoIHNldHRpbmdzLnN1Ym1pdF9idXR0b25fc2VsZWN0b3IgKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc2V0QWxlcnRNZXNzYWdlKCk7XG5cbiAgICAgICAgdmFyIGVtYWlsX3ZhbHVlID0gJChzZXR0aW5ncy5lbWFpbF9pbnB1dF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIHZhciBlbWFpbElzVmFsaWQgPSB2YWxpZGF0ZUVtYWlsKGVtYWlsX3ZhbHVlKTtcblxuICAgICAgICBpZiAoZW1haWxJc1ZhbGlkKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vJyArIHNldHRpbmdzLmV4ZWN1dGVfYXBpX2RvbWFpbiArICcvZGV2L2ludml0ZScsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoIHsgZW1haWwgOiBlbWFpbF92YWx1ZSB9ICksXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRhdGEub2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlX3N1Y2Nlc3MoICdTdWNjZXNzJyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oIHhociwgc3RhdHVzLCBlcnJvciApIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKCAnVW5rbm93biB0cmFuc3BvcnQgZXJyb3I6ICcgKyBzdGF0dXMgKyAoIGVycm9yID8gJyAnICsgZXJyb3IgOiAnJyApICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVfZXJyb3IoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsJyk7XG4gICAgICAgIH1cbiAgICB9ICk7XG59ICk7Il0sImZpbGUiOiJzbGFjay5qcyJ9
