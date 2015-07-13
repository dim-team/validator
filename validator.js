/**
 * 应用于dim(develop in modularization)框架的数据校验组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.13
 */
var Poptips = require('poptips');

var Validator = {
	init: function (container) {
		this.container = container;

		this.bindEvents();
	},
	bindEvents: function() {
		$('[data-validate="true"]', this.container).each(function() {
			var $this = $(this);
			var validateInfo = $(this).attr('data-validateInfo');
			validateInfo = JSON.parse(validateInfo);
			var options = {
				container: $this,
				autoHide: true
			};
			$this.on('focus', function() {
				options.action = 'remove';
				Poptips.init(options);
			}).on('blur', function() {
				var value = $this.val();
				if (value && value.length > 0) {
					$.each(validateInfo, function(i, n) {
						var regx = new RegExp(n.regx);
						var msg = n.msg;
						console.log(regx.test(value));
						if(!regx.test(value)) {
							options.action = 'show';
							options.status = 'error';
							options.msg = msg;
							Poptips.init(options);
						}
					});
				} else if ($this.attr('data-necessary') == 'true') {
					options.action = 'show';
					options.status = 'error';
					options.msg = '该字段不能为空';
					Poptips.init(options);
				}
				
			});

		});
	} 
};

module.exports = Validator;