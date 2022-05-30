
status="";
song="";
objects=[];

function preload(){
 song=loadSound("alarm.mp3")
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(370,370)
    video.hide();
    model=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        model.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            percent=Math.floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                song.stop();
            } 
            
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                song.play();
            }

            if(objects.legth<=0){
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                song.play();
            }
        }
    }
}

function modelLoaded(){
console.log("model loaded");
status="true";
}

function gotResults(error,results){

    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects=results;
    }
}
