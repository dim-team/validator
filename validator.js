/**
 * 应用于dim(develop in modularization)框架的数据校验组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.13
 */
var Poptips = require('poptips');

var Validator = {
	/*var validateOptions = {
		container: this.doms.attributeContainer,//校验容器
		auto: false//是否自动校验
	};*/
	init: function (validateOptions) {
		this.validateOptions = validateOptions;

		this.bindEvents();
	},
	bindEvents: function() {
		var _this = this;
		$('[data-validate="true"]', _this.validateOptions.container).each(function() {
			var $this = $(this);
			var validateInfo = $(this).attr('data-validateInfo');
			validateInfo = JSON.parse(validateInfo);
			var options = {
				container: $this,
				autoHide: true,
				validateInfo: validateInfo
			};

			if (_this.validateOptions.auto) {
				_this.executeValidate(options);
			} else {
				$this.on('focus', function() {
					options.action = 'remove';
					Poptips.init(options);
				}).on('blur', function() {
					_this.executeValidate(options);	
				});
			}
		});
	},
	executeValidate: function(options) {
		var $this = options.container;
		var validateInfo = options.validateInfo;
		var value = $this.val();
		if (value && value.length > 0) {
			$.each(validateInfo, function(i, n) {
				var regx = new RegExp(n.regx);
				var msg = n.msg;
				if(!regx.test(value)) {
					$this.attr('data-status', 'false');
					options.action = 'show';
					options.status = 'error';
					options.msg = msg;
					Poptips.init(options);
				} else {
					$this.attr('data-status', 'true');
				}
			});
		} else if ($this.attr('data-necessary') == 'true') {
			$this.attr('data-status', 'false');
			options.action = 'show';
			options.status = 'error';
			options.msg = '该字段不能为空';
			Poptips.init(options);
		}
	} 
};

module.exports = Validator;