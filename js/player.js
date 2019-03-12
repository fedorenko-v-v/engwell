$.widget( "custom.audio_player_plugin", {
	options: {
		volume_val: 0.5
	},

	_create: function() {
		var self = this,
			element = self.element,
			opts = self.options;

		var pl = element.children('#audio_player_block').get(0);
		var volume = element.children('.volume_block');
		var progress = element.children('.music_block');

		volume.children('.volume_line_second').css('width', opts.volume_val*100+'%');
		volume.children('.run').css('left', opts.volume_val*40+'px');
		pl.volume = opts.volume_val;


		element.on('click', '.btn_play' , function(){
			$(this).toggleClass('pause');
			$(this).attr('class').split(' ')[1] == 'pause' ? pl.play() : pl.pause();
	    });

		$(init);

		function init() {
			volume.children('.run').draggable({
				containment: volume,
				cursor: 'default',
				stop: handleDragStop,
				drag: handleDrag
			});
		}

		function handleDragStop( event, elem ) {
		}

		function handleDrag( event, elem ) {
			volume.children('.volume_line_second').css('width', elem.position.left);
			pl.volume = (elem.position.left*(100/40))/100;
		}


		pl.ontimeupdate = function() {progress_f()};

		function progress_f() {
			progress.children('.music_line_second').css('width', (pl.currentTime/pl.duration)*170+'px');
			if (pl.currentTime == pl.duration){
				progress.children('.music_line_second').css('width', '0px');
				element.children('.btn_play').removeClass('pause');
			}
			element.children('.time_block').html(moment.unix(pl.currentTime).utc().format('mm:ss'));
			//var ct = Math.floor(pl.currentTime);
			//var hours = ct/3600;
			//console.log(moment(pl.currentTime*1000).format('hh:mm:ss'));
		}

		element.on('click', '.music_block' , function(e){
			var relativeX = (e.pageX - $(this).offset().left);
			pl.currentTime = (relativeX*pl.duration)/170;
			progress.children('.music_line_second').css('width', relativeX+'px');
			//console.log(pl.currentTime);
	    });

	}
});
