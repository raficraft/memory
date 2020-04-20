<?php
extract($_POST);
$tabReturn = json_decode($_POST['json'],true);
switch  ($tabReturn['action']) {
    
   case 'getTree' :

$nbFile = 0;

   $dir = '../../../img/data/'.$tabReturn['rep'].'/';
        
    if(is_dir($dir)){
        if($dossier = opendir($dir)){
            while(false !== ($fichier = readdir($dossier))){
                if($fichier != '.' && $fichier != '..' && $fichier != 'index.php'){

                   // On incrémente le compteur de 1
                    $tabReturn['file'][$nbFile] = $fichier;
                     $nbFile++; 
                 }
             }
             $tabReturn['nbFile'] = $nbFile;
        }
    }
        
    break;
    
    
       case 'getFile' :

$nbFile = 0;

   $dir = '../../../img/data/'.$tabReturn['rep'].'/';
        
    if(is_dir($dir)){
        if($dossier = opendir($dir)){
            while(false !== ($fichier = readdir($dossier))){
                if($fichier != '.' && $fichier != '..' && $fichier != 'index.php'){

                   // On incrémente le compteur de 1
                    // on crée le tableau global de toutes les carte;
                    $tabReturn['file'][$nbFile] = $fichier;
                     $nbFile++; 
                 }
             }
             //On tire au hasard le nombre de carte souhaiter
                        
             $tabReturn['nbFile'] = $nbFile;
             $randCard = array_rand($tabReturn['file'], $tabReturn['nbSep']);
             
             
             $nbCarte = $tabReturn['nbSep'];  
             $nbMulti = $tabReturn['nbCard'];  
             $tabReturn['randCard'] = $randCard;
             
            $tabTemp = array();
              $y=0;
             for($x=0;$x<$nbMulti;$x++){
                
                 
                for($i=0;$i<$nbCarte;$i++){  
                    
                    $k = $tabReturn['randCard'][$i];
                    $nameFile = $tabReturn['file'][$k];
                    $rep = $tabReturn['rep'];

                   $tabTemp[$y] ='<div class="0'.$k.' carte cache" id="c0'.$k.'" ><img src="img/data/'.$rep.'/'.$nameFile.'" style="display : none;"></div>';
                   $y++;
                } 
             }   
             shuffle($tabTemp);
             $myHtml = implode($tabTemp, '');
             
             $tabReturn['englob'] = $myHtml;
             closedir($dossier);
        }
    }
        
    break;

}

  
  
 echo json_encode($tabReturn);
