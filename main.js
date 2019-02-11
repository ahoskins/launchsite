class Sun {
    constructor() {
      this.$sun = $('.sun');
      this.$beams = this.$sun.find('.beams');
      this.size = this.$sun.width();
      
      this.beamAmount = 10;
      this.indRotation = 360 / this.beamAmount;
      this.path = [
        { x: -15, y: 0}, 
        {x: 75, y: -90}, 
        {x: 165, y: 0},
        {x: 75, y: 90}, 
        {x: -15, y: 0}
      ];
      
      this.location = { x: this.path[0].x, y: this.path[0].y};
      this.tn1 = TweenMax.to(this.location, this.beamAmount, { bezier: {curviness: 1.5, values: this.path}, ease: Linear.easeNone});
      
      this.tn2 = TweenMax.to(this.$beams, 60, { rotation: 360, repeat: -1, ease: Linear.easeNone});
      this.tn2.play();
      
      let i,
          element;
      
      for(i = 0; i < this.beamAmount; i++)
      {
          this.tn1.time(i);
          element = '<span class="beam" id="beam-' + i + '"></span>';
          this.$beams.append(element);
        
          TweenMax.set($("#beam-" + i), {x: this.location.x - 5, y: this.location.y + 45, rotation: ((this.indRotation * i ) - 90)})
      }
    }
  }
  
  $(() => {
    let sun = new Sun();  

    $('.cta-submit').click(function() {
        let user_phone_number = $('.cta-input').val();
        fetch(`https://takeawalk.appspot.com/api/send-welcome/${user_phone_number}`).then(function(response) {
            if (response.status === 200) {
                // popup saying sent you welcome
            } else {
                // popup saying uh oh failed try again later
            }
        })
    })
  });