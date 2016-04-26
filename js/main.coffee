setupEmailModal = ->

  Parse.initialize("PJrCjZ1mqVIqBhYwdv2DxMZj8kAqAntfMaYozqRY", "sUQonoF8Y2O3YFtuweJ8V0uaPwS4sbDKsSAtQK9R")

  # Hide email modal on clicking background
  $('#email-modal').on 'click', (e) ->
    $(@).fadeOut()

  # Show email modal on click
  $('.beta-sign-up-text').on 'click', (e) ->
    e.preventDefault()
    $('#email-modal').fadeIn()

  # Prevent closing email modal when tapping on fields
  $('input').on 'click', (e) ->
    e.stopImmediatePropagation()

  # Prevent closing email modal when tapping on button
  $('button').on 'click', (e) ->
    e.stopImmediatePropagation()

  # Handle email form submit
  $('.email-form').submit (e) ->

    # prevent default
    e.preventDefault()

    # get values
    form = $(@)
    action = form.attr('action')
    email = $.trim(form.find('input[name=email]')[0].value)

    successField = $(form.find('.form-message'))
    errorField = $(form.find('.form-error'))

    spinner = $(form.find('.loader'))
    join = $(form.find('.join'))
    checkmark = $(form.find('.done'))

    successField.html('').fadeOut(0)
    errorField.html('').fadeOut(0)

    # check if email is valid
    if emailIsValid(email)

      join.hide()
      checkmark.hide()
      spinner.fadeIn()

      formData = {
        'email' : email
      }

      Contact = Parse.Object.extend("Contact")
      contact = new Contact()
      contact.save({
        email: email
      }).then (object) ->
        successField.html('Thank you. You will receive an email soon.').fadeIn()
        spinner.hide()
        checkmark.fadeIn()

    else
      errorField.html('Please check your email again. Thanks.').fadeIn()

# Email validation helper
emailIsValid = (email) ->
  emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
  return emailReg.test email

setupFullPage = ->
  $('mediumDevice').hide()

  $('#fullpage').fullpage
    navigation: true
    fitToSectionDelay: 9999999
    paddingTop: '50px'
    fixedElements: '.phone'
    afterRender: ->
      $('mediumDevice').fadeIn(1000)
    onLeave: (index, nextIndex, direction) ->

      $('#screen').removeClass()
      $('.down-arrow').removeClass('hide')

      # Fade next index in and set background color class
      if nextIndex == 1
        $('#screen').addClass('one')
      else if nextIndex == 2
        $('#screen').addClass('two')
      else if nextIndex == 3
        $('#screen').addClass('three')
      else if nextIndex == 4
        $('#screen').addClass('four')
      else if nextIndex == 5
        $('#screen').addClass('five')
      else if nextIndex == 6
        $('#screen').addClass('six')
      else if nextIndex == 7
        $('#screen').addClass('seven')
        $('.down-arrow').addClass('hide')

playerInstantiated = false
fullPageInstantiated = false

$ ->

  # Mark .rotate class with an additional class of mobile for use
  # with max-height media query
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    $('.rotate').addClass('mobile')
  else
    $('#promoVideo').on 'click', (e) ->
      $('#promoVideo').fadeOut()
      $('#promoVideo video').get(0).pause()

  $('#promoVideo video').on 'stop', (e) ->
    $('#promoVideo').fadeOut()

  $('#promoVideo video').on 'ended', (e) ->
    $('#promoVideo').fadeOut()

  $('video').get(0).addEventListener 'webkitendfullscreen', (e) ->
    $(this).get(0).stop()
    $('#promoVideo').fadeOut()

  $('.promoVideoButton').on 'click', (e) ->
    $('#promoVideo').fadeIn()
    $('#promoVideo video').get(0).play()
    e.preventDefault()

  setupEmailModal()

  # CSS Media Query check: Medium Up
  mediaCheck
    media: '(min-width: 40.063em)'
    entry: ->
      if !fullPageInstantiated
        setupFullPage()
        fullPageInstantiated = true

    exit: ->
      if fullPageInstantiated
        $.fn.fullpage.destroy('all')
        fullPageInstantiated = false
