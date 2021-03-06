song1 = "";
song2 = "";

function preload()
{
    song1 = loadSound("Saabashiyaan.mp3");
    song2 = loadSound("Best_Song_Ever-One_Direction.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

status_song1 = "";
status_song2 = "";

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
 if(results.length > 0)
 {
     console.log(results);
     scoreRightwrist = results[0].pose.keypoints[10].score;
     scoreLeftWrist = results[0].pose.keypoints[9].score;
     console.log("scoreRightWrist =" + scoreRightwrist + "scoreLeftWrist =" + scoreLeftwrist);

     leftWristX = results[0].pose.leftWrist.x;
     leftWristY = results[0].pose.leftWrist.y;
     console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

     rightWristX = results[0].pose.rightWrist.x;
     rightWristY = results[0].pose.rightWrist.y;
     console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
     
 }
}

function draw()
{
    image(video, 0, 0, 500, 600);

    fill("FF0000");
    stroke("FF0000");
    status_song1 = song1.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
       
       if(status_song1 = false)
       {
          song1.play();
          document.getElementById("song_name").innerHTML = song1;

       }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
       
       if(status_song2 = false)
       {
          song2.play();
          document.getElementById("song_name").innerHTML = song2;

       }
    }
}


