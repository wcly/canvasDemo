var oCvs = document.getElementById('cvs'); //获取canvas dom对象
var width = oCvs.width; //画布宽度
var height = oCvs.width; //画布高度
var radius = 180; //表盘半径

var ctx = oCvs.getContext("2d"); //获取一个上下文对象
ctx.translate(width / 2, height / 2); //平移坐标原点到画布中央

/**
 * 根据角度返回弧度
 * @param {number} angle 角度
 * @return {number} 弧度
 **/
function getRadian(angle) {
    return angle * Math.PI / 180;
}

/**
 * 画一个表盘
 */
function drawDials() {
    ctx.save(); //保存当前样式
    ctx.beginPath(); //开启一个路径，开始作画
    ctx.strokeStyle = '#fff'; //设置描边颜色
    ctx.lineWidth = '5'; //设置线条粗细
    ctx.arc(0, 0, radius, 0, getRadian(360)); //画一个圆
    ctx.stroke(); //描边
    ctx.restore(); //回复样式到上一个保存点
}

/**
 * 画刻度
 */
function drawDial() {
    ctx.save(); //保存当前样式
    ctx.lineWidth = '6'; //设置线条粗细
    ctx.strokeStyle = '#fff'; //设置描边颜色
    for (var i = 0; i < 60; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.rotate(getRadian(6 * i)); //旋转画布
        ctx.moveTo(0, -radius + 10); //移动画笔
        ctx.lineCap = 'round'; //线末端样式为圆形
        if (i % 5 === 0) {
            ctx.lineTo(0, -radius + 30); //画线
            ctx.strokeStyle = '#468629';
        } else {
            ctx.lineTo(0, -radius + 20); //画线
        }
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore(); //回复样式到上一个保存点
}

/**
 * 画线
 * @param {number} lineWidth 线的宽度
 * @param {string} color 线的颜色
 * @param {number} length 线的长度
 * @param {number} angle 画布的旋转角度
 */
function drawLine(lineWidth, color, length, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color; //设置颜色
    ctx.lineWidth = lineWidth; //设置颜色
    ctx.lineCap = "round"; //设置颜色
    ctx.rotate(getRadian(angle));
    ctx.moveTo(0, 0.1 * length);
    ctx.lineTo(0, -0.9 * length);
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ccc";
    ctx.stroke();
    ctx.restore();
}

/**
 * 画指针
 */
function drawNeedles() {
    var now = new Date(); //当前时间
    var dawn = new Date().setHours(0, 0, 0, 0); //当天凌晨的时间戳
    var milis = now.getTime() - dawn; //凌晨到现在的毫秒数
    var seconds = Math.floor(milis / 1000); //凌晨到现在的秒数
    var hAngle = seconds / 60 / 60 / 12 * 360; //小时数角度
    var mAngle = seconds / 60 / 60 * 360; //分钟数角度
    var sAngle = seconds / 60 * 360; //秒钟数角度
    drawLine(6, "#fff", 60, hAngle); //画时针
    drawLine(4, "#fff", 110, mAngle); //画分针
    drawLine(3, "#468629", 120, sAngle); //画秒针
}

/**
 * 画整个时钟
 */
function drawClock() {
    ctx.clearRect(-width / 2, -height / 2, width, height); //清空画布
    drawDials();
    drawDial();
    drawNeedles();
}

//不停的刷新页面
requestAnimationFrame(function timer(){
    drawClock(); //每次刷新画一个新的时钟
    requestAnimationFrame(timer);
})