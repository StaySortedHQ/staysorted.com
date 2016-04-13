$ ->

  video = $('#hero-video')[0]
  leavingOverlay = false

  # Helper function
  showReplayButton = (showReplay) ->
    if showReplay
      $('.play').removeClass("hide", 0, "easeInBack" )
      $('.resume').addClass("hide", 0, "easeInBack" )
    else
      $('.play').addClass("hide", 0, "easeInBack" )
      $('.resume').removeClass("hide", 0, "easeInBack" )

  # Click on playing video
  $('.hero').bind "click", ->
    if !video.paused and !leavingOverlay
      video.pause()
      showReplayButton(false)
      $('.overlay').fadeIn()
    else
      leavingOverlay = false

  # Click on resume button
  $('.resume').bind "click", (e) ->
    e.preventDefault()
    if video.paused
      video.play()
      $('.overlay').fadeOut()
      leavingOverlay = true

  # Click on replay button
  $('.play').bind "click", (e) ->
    e.preventDefault()
    video.play()
    $('.overlay').fadeOut()
    leavingOverlay = true

  # Video ends
  $(video).bind "timeupdate", (e) ->
    currentTime = video.currentTime
    if currentTime > 39
      $('.overlay').fadeIn()
      showReplayButton(true)

  $(window).scroll (e) ->
    offsetTop = $(window).scrollTop()
    if offsetTop > 500
      video.pause()
      showReplayButton(false)
      $('.overlay').fadeIn()


