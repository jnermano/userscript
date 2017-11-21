// ==UserScript==
// @name         bitcofarm auto pilote
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://bitcofarm.com/account
// @include      http://www.bitcofarm.com/account
// @include      www.bitcofarm.com/account
// @include      https://bitcofarm.com/account
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	

      $.get('http://bitcofarm.com/ads',function(e){

		  setTimeout(function(){

			  var parser = new DOMParser();
			  var ads = parser.parseFromString(e, 'text/html');
			  var div = ads.getElementById('right');
			  var a = div.getElementsByTagName('a');
			  console.log(a.length);
			  var counter = 0;
    var win = null;
    var clicked = 0;
    var timer = 5;

    var n = [];

     for(var i = 0; i < a.length; i++){
         var divs = a[i].getElementsByTagName('div');
         //console.log(i + ' : ' + divs.length);
         if(divs.length > 0){
             if(divs[0].className != 'hap disabled_pbx'){
            n.push(a[i]);
        }
         }

    }

    a = n;
    console.log(a.length);
    counter = a.length-1;

    //hap disabled_pbx
    var elapsed_time = 0;

    var mInterval = setInterval(function(){
             try {

                 if(win !== null)
                 win.close();

		     var ad_time = 32;
		     var div_time = a[counter].getElementsByClassName('hap_title')[0];
             var div_bg_color = div_time.style.backgroundColor;

             //console.log('ad color : ' + div_bg_color);

		     if(div_bg_color === 'rgb(0, 102, 153)')
				 ad_time = 33;
             else if(div_time.style.background === 'rgb(255, 102, 0)')
				 ad_time = 20;
		     else
				 ad_time = 13;



		     if ( elapsed_time > (ad_time+5)){
				 console.log('elapsed t : ' + elapsed_time + ', ad_time : ' + ad_time);
				 elapsed_time = 0;

				 console.log(counter);

				 if(counter >= 0){
				 var mDiv = a[counter].getElementsByTagName('div')[0];

                 /*$('html,body').animate({
                     scrollTop: $(mDiv).offset().top
                 },'slow');*/

				 if(mDiv.className != 'hap disabled_pbx'){
					 //console.log(a[counter].href);
					 console.log(mDiv.id + ' : launched !');

					 $.get(a[counter].href, function(res){
						 console.log(mDiv.id + ' : anwsered !');
                         setTimeout(function(){

                             $.get('http://bitcofarm.com/modules/virtual_core.php','adv='+ mDiv.id + '&action=adv',function(e){

							 if(e=='Completed!'){
								 $('#' + mDiv.id).addClass('disabled_pbx');
								 clicked += 1;
								 console.log(mDiv.id + ' : ' + e);
							 }else{
								 console.log(mDiv.id + ' : ' + e);
							 }
						 });
                         }, 1000 * ad_time);


					 });



                 }else{
                     console.log('Already clicked');
                 }

             }
				 else if(counter <= -1){
					 console.log('clicked ' + clicked + ' / ' + a.length);
					 console.log('done... exit!');
					 if(win !== null)
						 win.close();
					 
					 clearInterval(mInterval);
                 }

				 counter -= 1;
				 window.focus();
			 }


             elapsed_time += timer;


             } catch (e) {
                 console.log(e.name + ": " + e.message);
                 counter -= 1;
                 if(counter <= -1){
					 console.log('clicked ' + clicked + ' / ' + a.length);
					 console.log('done... exit!');
					 if(win !== null)
						 win.close();
					 mSound.play();
					 clearInterval(mInterval);
                 }
             }


         },
         1000 * timer
    );

		  }, 1000 * 10);


	  });

    
})();
