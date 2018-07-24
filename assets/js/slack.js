var settings = {
    'execute_api_domain' : 'tulxzrb5g3.execute-api.us-east-1.amazonaws.com',
    // execute_api_domain example: fbcwperrgh.execute-api.eu-west-1.amazonaws.com
    'submit_button_selector' : '#button',
    'email_input_selector' : '#email',
    'return_message_container_selector' : '#return_message'
};

function handle_success( message ) { handle( 'success', message ); }
function handle_error( message ) { handle( 'error', message ); }
function handle( message_type, message ) {
    var $return_message_containers = $( settings.return_message_container_selector );
    if ( $return_message_containers.length ) {
        $return_message_containers.removeClass( 'success error' );
        $return_message_containers.addClass( message_type );
        $return_message_containers.text( message );
    }
    else {
        alert( message_type + ': ' + message );
    }
};

$( document ).ready( function() {
    $( settings.submit_button_selector ).click( function() {
        var email_value = $( settings.email_input_selector ).val()
        if ( ! email_value ) {
            return setTimeout( function() { handle_error( 'Missing email' ); }, 10 );
        }
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
    } );
} );
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGFjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2V0dGluZ3MgPSB7XG4gICAgJ2V4ZWN1dGVfYXBpX2RvbWFpbicgOiAndHVseHpyYjVnMy5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbScsXG4gICAgLy8gZXhlY3V0ZV9hcGlfZG9tYWluIGV4YW1wbGU6IGZiY3dwZXJyZ2guZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cbiAgICAnc3VibWl0X2J1dHRvbl9zZWxlY3RvcicgOiAnI2J1dHRvbicsXG4gICAgJ2VtYWlsX2lucHV0X3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdyZXR1cm5fbWVzc2FnZV9jb250YWluZXJfc2VsZWN0b3InIDogJyNyZXR1cm5fbWVzc2FnZSdcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZV9zdWNjZXNzKCBtZXNzYWdlICkgeyBoYW5kbGUoICdzdWNjZXNzJywgbWVzc2FnZSApOyB9XG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IoIG1lc3NhZ2UgKSB7IGhhbmRsZSggJ2Vycm9yJywgbWVzc2FnZSApOyB9XG5mdW5jdGlvbiBoYW5kbGUoIG1lc3NhZ2VfdHlwZSwgbWVzc2FnZSApIHtcbiAgICB2YXIgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMgPSAkKCBzZXR0aW5ncy5yZXR1cm5fbWVzc2FnZV9jb250YWluZXJfc2VsZWN0b3IgKTtcbiAgICBpZiAoICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLmxlbmd0aCApIHtcbiAgICAgICAgJHJldHVybl9tZXNzYWdlX2NvbnRhaW5lcnMucmVtb3ZlQ2xhc3MoICdzdWNjZXNzIGVycm9yJyApO1xuICAgICAgICAkcmV0dXJuX21lc3NhZ2VfY29udGFpbmVycy5hZGRDbGFzcyggbWVzc2FnZV90eXBlICk7XG4gICAgICAgICRyZXR1cm5fbWVzc2FnZV9jb250YWluZXJzLnRleHQoIG1lc3NhZ2UgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KCBtZXNzYWdlX3R5cGUgKyAnOiAnICsgbWVzc2FnZSApO1xuICAgIH1cbn07XG5cbiQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgICQoIHNldHRpbmdzLnN1Ym1pdF9idXR0b25fc2VsZWN0b3IgKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbWFpbF92YWx1ZSA9ICQoIHNldHRpbmdzLmVtYWlsX2lucHV0X3NlbGVjdG9yICkudmFsKClcbiAgICAgICAgaWYgKCAhIGVtYWlsX3ZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkgeyBoYW5kbGVfZXJyb3IoICdNaXNzaW5nIGVtYWlsJyApOyB9LCAxMCApO1xuICAgICAgICB9XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vJyArIHNldHRpbmdzLmV4ZWN1dGVfYXBpX2RvbWFpbiArICcvZGV2L2ludml0ZScsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoIHsgZW1haWwgOiBlbWFpbF92YWx1ZSB9ICksXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGRhdGEub2sgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfc3VjY2VzcyggJ1N1Y2Nlc3MnICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCB4aHIsIHN0YXR1cywgZXJyb3IgKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKCAnVW5rbm93biB0cmFuc3BvcnQgZXJyb3I6ICcgKyBzdGF0dXMgKyAoIGVycm9yID8gJyAnICsgZXJyb3IgOiAnJyApICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gKTtcbn0gKTsiXSwiZmlsZSI6InNsYWNrLmpzIn0=
