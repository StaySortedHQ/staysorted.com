(function() {
  $(function() {
    return $('video').click(function() {
      if (this.paused) {
        return this.play();
      } else {
        return this.pause();
      }
    });
  });

}).call(this);
