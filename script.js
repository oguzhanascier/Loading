"use strict";

var startMotion = document.getElementById('motion1');
var stage = document.getElementById('wrapper');
var burst = document.getElementById('burst');
var speed = 0.12;
// Seçicileri değişkenlere atayın
const wrapper = document.querySelector('#wrapper');
const kongfu = document.querySelector('#kongfu');
const motions = document.querySelectorAll('.motion');
const motion1 = document.querySelector('#motion1');

// Timeline'larınızı tanımlayın
const motion1Play = gsap.timeline().to(motion1, {duration: 2, morphSVG:"#motion2"});

// Stil ayarları
gsap.set(wrapper, {position: "relative", width: "100vw", height: "100vh"});
gsap.set(kongfu, {overflow: "visible", position: "absolute", width: "300px", height: "300px", left: 0, right: 0, top: 0, bottom: 0, margin: "auto"});
gsap.set(motions, {strokeWidth: "4px", visibility: "hidden"});
gsap.set(motion1, {visibility: "visible"});

// Animasyonları tetikleyin
motion1Play.repeat(-1).yoyo(true);


var motionInit = {
  move: ['#motion1', '#motion2', '#motion3', '#motion5', '#motion4', '#motion1'],
  strokeClr: ['red', 'yellow', 'blue', 'purple', 'green', 'red'],
  fillClr: ['#401100', '#3a2803', '#05152b', '#17041f', '#0a1d03', '#401100'],
  bgClr: ['#ea4b4b', '#f9ea9d', '#4ba7ea', '#d191f1', '#98f17d', '#ea4b4b']
};
var stagePlay = new TimelineMax({
  repeat: -1
});
var masterPlay = new TimelineMax({
  repeat: -1
});
var burstCircle1Play = new TimelineMax();
var burstCircle2Play = new TimelineMax();

//StageBg ColorTween
var playStageBg = function playStageBg() {
  stagePlay.set(stage, {
    background: motionInit.bgClr[0]
  }).to(stage, speed, {
    background: motionInit.bgClr[1]
  }, "+=1").to(stage, speed, {
    background: motionInit.bgClr[2]
  }, "+=1").to(stage, speed, {
    background: motionInit.bgClr[3]
  }, "+=1").to(stage, speed, {
    background: motionInit.bgClr[4]
  }, "+=1").to(stage, speed, {
    background: motionInit.bgClr[5]
  }, "+=1");
};

//Burst Show
const playBurst = function() {
  const overlay = burst.querySelector('.overlay');
  const path = burst.querySelector('path');

  burstCircle1Play.set(overlay, {
    scale: 1,
    transformOrigin: "50% 50%",
    alpha: 1
  }).to(overlay, 1.1, {
    scale: 10,
    transformOrigin: "50% 50%",
    alpha: 0
  });
  burstCircle2Play.set(path, {
    scale: 0,
    transformOrigin: "50% 50%",
    alpha: 1
  }).to(path, 1.1, {
    scale: 2.5,
    transformOrigin: "50% 50%",
    alpha: 0
  });
}

//Master KongFu
var playMasterMotion = function playMasterMotion() {
  masterPlay.set(startMotion, {
    fill: motionInit.fillClr[0],
    stroke: motionInit.strokeClr[0]
  }).set(burst, {
    onComplete: replayBurst,
    x: 5,
    y: -100
  }) //set brust Position
  .to(startMotion, speed, {
    onComplete: replayBurst,
    morphSVG: motionInit.move[1],
    stroke: motionInit.strokeClr[1],
    fill: motionInit.fillClr[1]
  }, "+=1").set(burst, {
    x: 100,
    y: -50
  }) //set brust Position
  .to(startMotion, speed, {
    onComplete: replayBurst,
    morphSVG: motionInit.move[2],
    stroke: motionInit.strokeClr[2],
    fill: motionInit.fillClr[2]
  }, "+=1").set(burst, {
    x: -100,
    y: -90
  }) //set brust Position
  .to(startMotion, speed, {
    onComplete: replayBurst,
    morphSVG: motionInit.move[3],
    stroke: motionInit.strokeClr[3],
    fill: motionInit.fillClr[3]
  }, "+=1").set(burst, {
    x: -70,
    y: -15
  }) //set brust Position
  .to(startMotion, speed, {
    onComplete: replayBurst,
    morphSVG: motionInit.move[4],
    stroke: motionInit.strokeClr[4],
    fill: motionInit.fillClr[4]
  }, "+=1").set(burst, {
    x: 75,
    y: -110
  }) //set brust Position
  .to(startMotion, speed, {
    onComplete: replayBurst,
    morphSVG: motionInit.move[5],
    stroke: motionInit.strokeClr[5],
    fill: motionInit.fillClr[5]
  }, "+=1");
};

//Replay the Burst Animation
var replayBurst = function replayBurst() {
  burstCircle1Play.restart();
  burstCircle2Play.restart();
};

//OnStart
var startPlay = function startPlay() {
  playStageBg();
  playBurst();
  playMasterMotion();
};

//All Done, Play it!
startPlay();
