(function(){
  //and inject svgs
  var mySVGsToInject = document.querySelectorAll('img.svg');
  SVGInjector(mySVGsToInject);

  // cache question-type-name-label
  var questionTypeNameLabelEl = document.getElementById('question-type-name-label');

  window.addEventListener('resize', function(){
    setTimeout(resizeAceEditors, 50);
  });

  Reveal.addEventListener( 'ready', function( event ) {
    document.body.classList.add("on-"+event.currentSlide.id);
    resizeAceEditors();
  });

  Reveal.addEventListener( 'slidechanged', function( event ) {
    if (event.previousSlide) {
      document.body.classList.remove("on-"+event.previousSlide.id);
    }
    if (event.currentSlide) {
      document.body.classList.add("on-"+event.currentSlide.id);
    }
  });

  Reveal.addEventListener("fragmenthidden", function(evt){
    var ids=["s-sub", "q-sub", "a-sub"]
    var idx;

    if(! evt.fragment) return;

    // if(evt.fragment.id === 'hideSplashContent'){
    //   try{
    //     document.getElementById('splashAsqLogo').classList.remove('animate');
    //     document.getElementById('splashContent').classList.remove('hidden');
    //   }catch(err){
    //     console.log('Could not show splash content');
    //     console.log(err);
    //   }
    // }

    // asq explanation
    if((idx = ids.indexOf(evt.fragment.id)) >= 0){
      try{
        // document.getElementById(evt.target.id + '-expansion').classList.add(active);
        for(var i=0; i < ids.length; i++){
          if(i == idx){
            document.getElementById(ids[i] + '-expansion').classList.remove('active');
          }else{
            // document.getElementById(ids[i] + '-expansion').classList.remove('active');
          }
        }
      }catch(err){
        console.log('Could not find associated letter expansion')
      }
    }
  })

  Reveal.addEventListener("fragmentshown", function(evt){
    var ids=["s-sub", "q-sub", "a-sub"]
    var idx;

    if(! evt.fragment) return;

    // if(evt.fragment.id === "hideSplashContent"){
    //   try{
    //     document.getElementById('splashAsqLogo').classList.add('animate');
    //     document.getElementById("splashContent").classList.add('hidden');
    //   }catch(err){
    //     console.log("Could not hide splash content")
    //     console.log(err)
    //   }
    // }

    // asq explanation
    if((idx = ids.indexOf(evt.fragment.id)) >= 0){
      try{
        // document.getElementById(evt.target.id + "-expansion").classList.add(active);
        for(var i=0; i < ids.length; i++){
          if(i == idx){
            document.getElementById(ids[i] + "-expansion").classList.add("active");
          }else{
            // document.getElementById(ids[i] + "-expansion").classList.remove("active");
          }
        }
      }catch(err){
        console.log("Could not find associated letter expansion")
      }
    }
    // question types
    else if(evt.fragment.classList.contains('img-frame')){
      questionTypeNameLabelEl.textContent = evt.fragment.dataset.questionName;
    }
  });


  // Many question types

  document.getElementById('many-question-types').addEventListener('mouseover', function(evt){
    if(evt.target.classList.contains('img-frame')){
      questionTypeNameLabelEl.textContent = evt.target.dataset.questionName;
    }else if(evt.target.parentNode.classList.contains('img-frame')){
       questionTypeNameLabelEl.textContent = evt.target.parentNode.dataset.questionName;
    }else{
      questionTypeNameLabelEl.textContent = document.getElementById('img-message').dataset.questionName;
    }
  });

  var toggleButtonIds = ['recognitionTB', 'cuedFreeTB', 'liveProgrammingTB'];

  document.addEventListener('change', function(e){
    if (toggleButtonIds.indexOf(e.target.id) > -1){
      applyFilters();
    }
  })
  
  function applyFilters(){
    var filters = [];
    if (document.getElementById('recognitionTB').checked) filters.push('recognition');
    if (document.getElementById('cuedFreeTB').checked) filters.push('cued/free');
    if (document.getElementById('liveProgrammingTB').checked) filters.push('live');



    var divs = document.querySelectorAll('.img-frame');
    [].forEach.call(divs, function(div){
      div.style.display = 'none';

      if(filters.indexOf('recognition') > -1){
        if(div.classList.contains('recognition-format')){
           div.style.display = 'block';
         }
      }

      if(filters.indexOf('cued/free') > -1){
        if(div.classList.contains('cued-free-format')){
          div.style.display = 'block';
        }
      }

      if(filters.indexOf('live') > -1){
        if(div.classList.contains('live-programming')){
          div.style.display = 'block';
        }
      }
    })
  }
})();
