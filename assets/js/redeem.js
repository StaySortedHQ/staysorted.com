var settings = {
    'execute_api_domain' : 'q1gwf4du10.execute-api.us-east-1.amazonaws.com',
    // execute_api_domain example: fbcwperrgh.execute-api.eu-west-1.amazonaws.com
    'submit_button_selector' : '#button',
    'email_input_selector' : '#email',
    'source_input_selector' : '#source',
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
        var source_value = $(settings.source_input_selector).val();

        if (emailIsValid) {
            $.ajax({
                type: "POST",
                url: 'https://' + settings.execute_api_domain + '/dev/redeem',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify( { source: source_value, email : email_value } ),
                success: function( data ) {
                    try {
                        if ( data.ok ) {
                            switch (source_value) {
                                case 'producthunt':
                                    handle_success( 'Done. Please check your email.' );
                                    break;
                                case 'sspai':
                                    handle_success( '成功领取，请检查邮箱。' );
                                    break;
                                default:
                                    handle_success( 'Done. Please check your email.' );
                            }
                        }
                        else {
                            handle_error(data.error.message);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZWRlZW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHNldHRpbmdzID0ge1xuICAgICdleGVjdXRlX2FwaV9kb21haW4nIDogJ3ExZ3dmNGR1MTAuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20nLFxuICAgIC8vIGV4ZWN1dGVfYXBpX2RvbWFpbiBleGFtcGxlOiBmYmN3cGVycmdoLmV4ZWN1dGUtYXBpLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXG4gICAgJ3N1Ym1pdF9idXR0b25fc2VsZWN0b3InIDogJyNidXR0b24nLFxuICAgICdlbWFpbF9pbnB1dF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAnc291cmNlX2lucHV0X3NlbGVjdG9yJyA6ICcjc291cmNlJyxcbiAgICAncmV0dXJuX21lc3NhZ2VfY29udGFpbmVyX3NlbGVjdG9yJyA6ICcjYWxlcnQtbWVzc2FnZSdcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZV9zdWNjZXNzKCBtZXNzYWdlICkge1xuICAgICQoJyNhbGVydC1tZXNzYWdlJykuaHRtbChtZXNzYWdlKTtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpXG4gICAgICAgIC5mYWRlSW4oMzAwKVxuICAgICAgICAuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IoIG1lc3NhZ2UgKSB7XG4gICAgJCgnI2FsZXJ0LW1lc3NhZ2UnKS5odG1sKG1lc3NhZ2UpO1xuICAgICQoJyNhbGVydC1tZXNzYWdlJylcbiAgICAgICAgLmZhZGVJbigzMDApXG4gICAgICAgIC5hZGRDbGFzcygnZXJyb3InKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xufVxuZnVuY3Rpb24gaGFuZGxlKCBtZXNzYWdlX3R5cGUsIG1lc3NhZ2UgKSB7XG4gICAgdmFyICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzID0gJCggc2V0dGluZ3MucmV0dXJuX21lc3NhZ2VfY29udGFpbmVyX3NlbGVjdG9yICk7XG4gICAgaWYgKCAkcmV0dXJuX21lc3NhZ2VfY29udGFpbmVycy5sZW5ndGggKSB7XG4gICAgICAgICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLnJlbW92ZUNsYXNzKCdzdWNjZXNzIGVycm9yJyk7XG4gICAgICAgICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLmFkZENsYXNzKG1lc3NhZ2VfdHlwZSk7XG4gICAgICAgICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLmh0bWwobWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydCggbWVzc2FnZV90eXBlICsgJzogJyArIG1lc3NhZ2UgKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiByZXNldEFsZXJ0TWVzc2FnZSgpIHtcbiAgICAkKCcjYWxlcnQtbWVzc2FnZScpXG4gICAgICAgIC5mYWRlT3V0KDE1MClcbiAgICAgICAgLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Vycm9yIHN1Y2Nlc3MnKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgdmFyIHZhbGlkID0gcmUudGVzdChTdHJpbmcoZW1haWwpLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWxpZFxufVxuXG4kKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcbiAgICAkKCBzZXR0aW5ncy5zdWJtaXRfYnV0dG9uX3NlbGVjdG9yICkuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNldEFsZXJ0TWVzc2FnZSgpO1xuXG4gICAgICAgIHZhciBlbWFpbF92YWx1ZSA9ICQoc2V0dGluZ3MuZW1haWxfaW5wdXRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICB2YXIgZW1haWxJc1ZhbGlkID0gdmFsaWRhdGVFbWFpbChlbWFpbF92YWx1ZSk7XG4gICAgICAgIHZhciBzb3VyY2VfdmFsdWUgPSAkKHNldHRpbmdzLnNvdXJjZV9pbnB1dF9zZWxlY3RvcikudmFsKCk7XG5cbiAgICAgICAgaWYgKGVtYWlsSXNWYWxpZCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovLycgKyBzZXR0aW5ncy5leGVjdXRlX2FwaV9kb21haW4gKyAnL2Rldi9yZWRlZW0nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCB7IHNvdXJjZTogc291cmNlX3ZhbHVlLCBlbWFpbCA6IGVtYWlsX3ZhbHVlIH0gKSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGF0YS5vayApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNvdXJjZV92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9kdWN0aHVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfc3VjY2VzcyggJ0RvbmUuIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsLicgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzc3BhaSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfc3VjY2VzcyggJ+aIkOWKn+mihuWPlu+8jOivt+ajgOafpemCrueuseOAgicgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlX3N1Y2Nlc3MoICdEb25lLiBQbGVhc2UgY2hlY2sgeW91ciBlbWFpbC4nICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKGRhdGEuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZV9lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiggeGhyLCBzdGF0dXMsIGVycm9yICkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoICdVbmtub3duIHRyYW5zcG9ydCBlcnJvcjogJyArIHN0YXR1cyArICggZXJyb3IgPyAnICcgKyBlcnJvciA6ICcnICkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZV9lcnJvcignUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwnKTtcbiAgICAgICAgfVxuICAgIH0gKTtcbn0gKTsiXSwiZmlsZSI6InJlZGVlbS5qcyJ9
