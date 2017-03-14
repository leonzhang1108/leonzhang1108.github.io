var w = c.width = window.innerWidth,
	h = c.height = window.innerHeight,
	ctx = c.getContext('2d'),

	opts = {
		phrases: ["不要怕\n我又不会吃了你。。", 
		"你咋这么美", 
		"你是可能不需要别人保护\n但是我想保护的人", 
		"咋这晚才遇上你", 
		"继续拍马屁", 
		"鹅妹子嘤", 
		"情人节快乐", 
		"仔爷铲屎人受我一拜", 
		"侬好", 
		"此时一只雄性lobster向你伸出他的钳子"],
		balloons: 10,
		baseVelY: -1,
		addedVelY: -1,
		baseVelX: -.25,
		addedVelX: .5,
		baseSize: 20,
		addedSize: 10,
		baseSizeAdder: 2,
		addedSizeAdder: 2,
		baseIncrementer: .01,
		addedIncrementer: .03,
		baseHue: -10,
		addedHue: 30,
		font: '15px Verdana'
	},

	cycle = 0,
	balloons = [];

ctx.font = opts.font;

function Balloon() {
	this.reset();
}
Balloon.prototype.reset = function () {

	this.size = opts.baseSize + opts.addedSize * Math.random();
	this.sizeAdder = opts.baseSizeAdder + opts.addedSizeAdder * Math.random();
	this.incrementer = opts.baseIncrementer + opts.addedIncrementer * Math.random();

	this.tick = 0;

	this.x = Math.random() * w;
	this.y = h + this.size;

	this.vx = opts.baseVelX + opts.addedVelX * Math.random();
	this.vy = opts.baseVelY + opts.addedVelY * Math.random();

	this.color = 'hsla(hue,70%,60%,.8)'.replace('hue', opts.baseHue + opts.addedHue * Math.random());
	this.phrase = opts.phrases[++cycle % opts.phrases.length].split('\n');
	this.lengths = [];

	for (var i = 0; i < this.phrase.length; ++i)
		this.lengths.push(-ctx.measureText(this.phrase[i]).width / 2);
}
Balloon.prototype.step = function () {

	this.tick += this.incrementer;
	this.x += this.vx;
	this.y += this.vy;

	var size = this.size + this.sizeAdder * Math.sin(this.tick);

	ctx.lineWidth = size / 40;
	ctx.strokeStyle = '#eee';
	ctx.beginPath();
	ctx.moveTo(this.x, this.y - 2);
	ctx.lineTo(this.x, this.y + size);
	ctx.stroke();
	ctx.fillStyle = this.color;

	ctx.translate(this.x, this.y);
	ctx.rotate(Math.PI / 4);
	//ctx.fillRect( -size / 2, -size / 2, size / 2, size / 2 );
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.arc(-size / 2, -size / 2 + size / 4, size / 4, Math.PI / 2, Math.PI * 3 / 2);
	ctx.arc(-size / 2 + size / 4, -size / 2, size / 4, Math.PI, Math.PI * 2);
	ctx.lineTo(0, 0);
	ctx.fill();
	ctx.rotate(-Math.PI / 4);
	ctx.translate(-this.x, -this.y);

	ctx.translate(this.x, this.y + size + 15);
	ctx.scale(size / this.size, size / this.size);
	ctx.fillStyle = '#eee';
	for (var i = 0; i < this.phrase.length; ++i)
		ctx.fillText(this.phrase[i], this.lengths[i], i * 15);
	ctx.scale(this.size / size, this.size / size);
	ctx.translate(-this.x, -(this.y + size + 15));

	if (this.y < -size * 3)
		this.reset();

}

function anim() {

	window.requestAnimationFrame(anim);

	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, w, h);

	if (balloons.length < opts.balloons && Math.random() < .01)
		balloons.push(new Balloon);

	for (var i = 0; i < balloons.length; ++i)
		balloons[i].step();
}
anim();


if (window.console) {
    var cons = console;
    if (cons) {
        cons.log("%c\n", "font-size:41px;background:url('../img/lobster.jpg') no-repeat -135px -1px");
        cons.log('I may not be your fisrt love, first kiss, first sight or fisrt date, ');
        cons.log('but I jsut want to be you last everything.')
		cons.log('Your last boyfriend, your last OMG, your last fire in the hole, your last pain in the butt. ')
		cons.log('And finally, I want to be your last name. ')
    }
}