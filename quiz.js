var hasBegin = false;
var index = -1;
var totNum = 0;
var num2Letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var countdown;

function setTime() {
  var iniTime = document.getElementsByName('timconf')[0].value;
  if (!iniTime) {
    iniTime = 60;
  } else {
    iniTime = parseFloat(iniTime);
    iniTime = parseInt(iniTime) * 60 + (iniTime - parseInt(iniTime)) * 100;
  }
  var min = parseInt(iniTime / 60);
  var sec = iniTime - 60 * min;
  var timer = document.getElementById('tim');
  if (min < 10) min = '0' + String(min);
  if (sec < 10) sec = '0' + String(sec);
  timer.innerText = min + ":" + sec;
};

function updateTime() {
  var timer = document.getElementById('tim');
  var now = timer.innerText;
  var parsed = now.split(":");
  var sec = parseInt(parsed[1]);
  var min = parseInt(parsed[0]);
  if (sec == 0) {
    min -= 1;
    sec = 59;
  } else {
    sec -= 1;
  }
  if (min < 10) min = '0' + String(min);
  if (sec < 10) sec = '0' + String(sec);
  timer.innerText = min + ":" + sec;
  countdown = setTimeout(updateTime, 1000);
};

function getResultByNumber(i) {
  var questar = document.getElementsByClassName('quesCheck' + i);
  var res = "";
  for (var i = 0; i < questar.length; i++) {
    if (questar[i].checked) res += num2Letter[i];
  }
  return res;
};

function getAllResult() {
  var j = [];
  for (var i = 0; i < totNum; i++) {
    j[i] = getResultByNumber(i);
  }
  return j;
};

function visAllQues() {
  var quess = document.getElementsByClassName('ques');
  for (var i = 0; i < quess.length; i++) {
    quess[i].style.display = "block";
  }
};

function toNext() {
  var timer = document.getElementById('tim');
  if (!hasBegin) {
    hasBegin = true;
    updateTime();
  }
  if (index < totNum - 1) {
    var quesNow = document.getElementById('ques' + index);
    var quesNext = document.getElementById('ques' + (index + 1));
    quesNow.style.display = "none";
    quesNext.style.display = "block";
    index += 1;
  } else if (index = totNum - 1) {
    document.getElementById('ques' + index).style.display = "none";
    var anss = getAllResult();
    var res = document.createElement('div');
    var ansstr = "";
    for (var i = 0; i < anss.length; i++) {
      ansstr += i + ". " + anss[i] + "\n";
    }
    res.innerText = ansstr;
    res.className = "tmp";
    document.getElementById('quiz').appendChild(res);
    document.getElementById('lrbtn').style.display = "none";
    document.getElementById('checkAns').style.display = "block";
    clearTimeout(countdown);
  }
};

function toPrev() {
  if (index >= 0) {
    var quesNow = document.getElementById('ques' + index);
    var quesNext = document.getElementById('ques' + (index - 1));
    quesNow.style.display = "none";
    quesNext.style.display = "block";
    index -= 1;
  }
};

function newWordQues(cont, ans, ind) {
  var blk = document.createElement('div');
  blk.id = "ques" + ind;
  blk.className = "ques";
  blk.innerText = (ind + 1) + ". " + cont+"\n\n";
  for (var j = 0; j < ans.length; j++) {
    var tmpdv = document.createElement('div');
    tmpdv.innerText = ans[j];
    var ite = document.createElement('input');
    ite.type = "checkbox";
    ite.name = "ques" + ind + "check" + j;
    ite.value = num2Letter[j];
    ite.className = "quesCheck" + ind;
    tmpdv.appendChild(ite);
    blk.appendChild(tmpdv);
  }
  return blk;
};

function newReadQues(cont, ques, ans, ind) {
  var blk = document.createElement('div');
  blk.id = "ques" + ind;
  blk.className = "ques";
  var contblk = document.createElement('div');
  contblk.innerText = cont;
  contblk.className = "readCont";
  var quesblk = document.createElement('div');
  quesblk.innerText = (ind + 1) + ". " + ques+"\n\n";
  quesblk.className = "readQues";
  for (var j = 0; j < ans.length; j++) {
    var tmpdv = document.createElement('div');
    tmpdv.innerText = ans[j];
    var ite = document.createElement('input');
    ite.type = "checkbox";
    ite.name = "ques" + ind + "check" + j;
    ite.className = "quesCheck" + ind;
    ite.value = num2Letter[j];
    tmpdv.appendChild(ite);
    quesblk.appendChild(tmpdv);
  }
  blk.appendChild(contblk);
  blk.appendChild(quesblk);
  return blk;
}

var quizbody = {};

function ini() {
  quizbody = JSON.parse(data);
  var qz = document.getElementById('quiz');
  var num = 0;
  for(var i =0;i < quizbody.length;i++) {
    if (quizbody[i].type == "word") {
      qz.appendChild(newWordQues(quizbody[i].ques, quizbody[i].ans, num));
      totNum = totNum + 1;
      num = num+1;
    } else if (quizbody[i].type == "read") {
      for (var j = 0; j < quizbody[i].ques.length; j++) {
        qz.appendChild(newReadQues(quizbody[i].cont, quizbody[i].ques[j], quizbody[i].ans[j], num));
        totNum = totNum + 1;
        num = num+1
      }
    }
  }
};

function startCheck(){
  var ref = document.getElementsByName('refAns')[0].value.split(",");
  var mine = getAllResult();
  if(ref.length!=mine.length) {window.alert('Wrong ref answers')}
  else {
    var diff=[]
    for(var i=0;i<ref.length;i++){
      if (ref[i]!=mine[i]) diff.push(i);
    }
    var tmps = document.getElementsByClassName('tmp');
    for(var i = 0 ; i<tmps.length;i++){
      tmps[i].style.display="none";
    }
    document.getElementById('checkAns').style.display="none";
    document.getElementsByClassName('sideb')[0].style.display="none";
    for(var i=0;i<diff.length;i++){
      var tmp = document.getElementById('ques'+diff[i]);
      var tmpadd = document.createElement('div') ;
      tmpadd.innerText="True: "+ref[diff[i]]+"\nYours: "+mine[diff[i]];
      tmp.appendChild(tmpadd);
      tmp.style.display = "block";
    }
  }
};
