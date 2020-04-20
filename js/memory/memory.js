jQuery().ready(function(){ 

/************************ Fonction utilitaire */////////////////////////
    console.log($.cookie());
  firstGame = false;
  var myVal ='';

$.fn.constructForm=function(){    
    var tabData = [];
     tabData[0] = 'planes';
     tabData[1] = 'number';        
     tabData[2] = 'alphabet';   
    
    /*Construction de l'element Form**/
    var myHtml = '<p class="myInput"><label>Jeux de carte</label><select id="mySelect"><option value="none">Aucun</option>';    
    for(i=0;i<tabData.length;i++){  myHtml += '<option value="'+tabData[i]+'">'+tabData[i]+'</option>'; }    
        myHtml +='</select></p>';
    myHtml +='<p class="myInput"><label style="display : none;>Nombre carte identiques</label>\n\
              </p>';    
    $('#selecteur').append(myHtml);
};

$(document).on('change','#selecteur',function(){
    $('.opt').remove();
    tabData = { 
        rep :($('#mySelect').val()),
        nbCard :2,
        action : 'getTree'
     };  
   console.log(tabData.rep);
                                function getTree(tabData){
                                 /* * Requêtes Ajax
                                  * On compte le nombre de carte dans le repertoire
                                  * et on affiche le select pour le choix du nombre d'images maximum-minimum::3
                                  * */

                                   var url = 'js/memory/Ajax/Ajax.php';
                                   json =JSON.stringify(tabData);  
                                  $.post(url,{json:json},function(retour){ 

                                  myHtml = '<div id="secondSelect"><p class="myInput"><label class="opt">Nombre de carte</label>\n\
                                            <select id="nbSep" class="opt">';
                                     for(i=2;i<retour.nbFile;i++){             
                                         x = i+1;
                                      myHtml += '<option value="'+x+'">'+x+'</option>';
                                     }  
                                   myHtml += '</select></p>\n\
                                   <p class="myInput"> <input type="submit" value="Tirage au sort" id="playGame" class="opt"></p></div>';
                                   $('#selecteur').after(myHtml);

                                  /*
                                     for(i=0;i<retour.nbFile;i++){
                                         console.log(retour.file[i]);
                                     } 
                                 */

                                    },"json"); 
                                }    
   
     getTree(tabData);
     
     
}).on('click','#playGame',function(){
 
   $('.victoire').remove();
   $('.carte').remove();
   $('#count').text(00);
   var calc = $('#resize').val()+'px';
   
   
  
  
    tabData = { 
        rep :($('#mySelect').val()),
        nbCard :2,
        nbSep :($('#nbSep').val()),
        action : 'getFile'
     };  
     
     function getFile(tabData){
         
         tabTemp= [];
            var url = 'js/memory/Ajax/Ajax.php';
            json =JSON.stringify(tabData);  
            $.post(url,{json:json},function(retour){ 
        
        console.log(retour);
        $('#main').append(retour.englob);
            /**reecriture des ID**/
   
           var x=1;    
         $('.carte').each(function(){
         $(this).attr('id','c0'+x);
         x++;
          $('.carte').css({'width' : '140px','height' : '140px'});
           $('.carte IMG').css({'width' : '140px','height' : '140px','border-radius' : '50%'});
           $('.carte').css({'background-size' : '140px 140px'});
        });
        
         },"json");
         
     };
     
        var totalCard = tabData.nbCard*tabData.nbSep;
        /*Global*/
        
        scoreMin = totalCard * 2;
        var min = scoreMin-tabData.nbSep;
        var good = (scoreMin+2);
       var minMax = ((totalCard * 2)+(parseInt(tabData.nbSep)*2));
        
        console.log(scoreMin);
        $('.indice').remove();
        var myHtml = '<p class="indice">Magic  < '+min+'  points.</p>';
         myHtml += '<p class="indice">Excellent  [ '+min+' - '+scoreMin+' ] points.</p>';
         myHtml += '<p class="indice">Trés Bien  = '+scoreMin+' points.</p>';
         myHtml += '<p class="indice">Bien  [ '+good+' - '+minMax+' ] points.</p>';
         myHtml += '<p class="indice">Peut Mieux faire  > '+minMax+' points.</p>';
 
   $('#view-record').append(myHtml);
     
     getFile(tabData);
     
     
     
  
     
    
     
 
  

});



$.fn.constructForm();




/**************************************************************************************/


var table = [];



function doubleCard(carte){
   
        console.log(firstGame);
        
        
            function gagner(){
        if($('.carte').hasClass('cache')){}else{
          
          
          var score = $('#count').text();
          
       
         
              $('.victoire').remove();
                myHtml =   '<p class="victoire alert">Victoire</p>';
                $('#view-record').append(myHtml);
         
          
          
        }
       
    }
        
    
    if(table.length<2){
        table.push(carte);
    }
    
    if(table.length===2){
        
    if(table[0]!==table[1]){
        var id1 = "#"+table[0];
        var id2 = "#"+table[1];

                if($(id1).attr("class")===$(id2).attr('class')){
                   $(id1).removeClass('cache');
                   $(id2).removeClass('cache');
                }else {
                    $('img','.cache').fadeOut(1200);
                }
        table = [];
         setTimeout(function() { gagner(); },2200);
    }else{
        table = [];
      $('img','.cache').fadeOut(1200);   
    }


    
   
    }
}


$(document).on('click','.cache',function(){
 
    $('img',this).fadeIn();
    doubleCard($(this).attr("id"));
    
    /*On affiche et mets à jour le compteur de coup.*/
    count = $('#count').text();
    majCount = parseInt(count)+1;
     $('#count').text(majCount);    
     
     
});


});
