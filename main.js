video="";
Status="";
input="";
objects=[];

function setup(){
    canvas=createCanvas(360,360);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(360,360);
    video.hide();
}

function draw(){
   image(video,0,0,360,360);
   if(Status != ""){
    objectDetector.detect(video,gotResults);
    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML="Status: Object Detected";
        console.log(objects.length);
        fill("#FF0000");
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == input){
            video.stop();
            objectDetector.detect(gotResults)
            document.getElementById("object_detect").innerHTML=input+" "+"Found";
            var synth = window.speechSynthesis;
            var utterThis= new SpeechSynthesisUtterance(input+"Found");
            synth.speak(utterThis);
        }else{
            document.getElementById("object_detect").innerHTML=input+"Not Found";
        }
    }
   }
}

function start(){
    objectDetector= ml5.objectDetector('cocussd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
    input=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status=true;
}

function gotResults(error, results){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects=results;
}
}