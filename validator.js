/**
 * 应用于dim(develop in modularization)框架的数据校验组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.13
 */
var Poptips = require('poptips');
var Poplayer = require('poplayer');

var Validator = {
	/*var validateOptions = {
		container: this.doms.attributeContainer,//校验容器
		auto: false//是否自动校验
	};*/
	init: function (validateOptions) {
		this.validateOptions = validateOptions;
		this.tipsType = validateOptions.tipsType || 'poplayer';//默认采用poplayer的提示样式，如果把tipsType设置为poptips则采用Poptips的提示样式

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
					if(_this.tipsType == 'poptips') {
						options.action = 'remove';
						Poptips.init(options);
					}
				}).on('blur', function() {
					_this.executeValidate(options);	
				});
			}
		});
	},
	executeValidate: function(options) {
		var _this = this;
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
					if(_this.tipsType == 'poplayer') {
						Poplayer.showAlert({msg: options.msg});
						$this.focus();
					} else {
						Poptips.init(options);
					}
					return false;
				} else {
					$this.attr('data-status', 'true');
				}
			});
		} else if ($this.attr('data-necessary') == 'true') {
			var validateTitle = $this.attr('data-validateTitle');
			$this.attr('data-status', 'false');
			options.action = 'show';
			options.status = 'error';
			options.msg = validateTitle ? validateTitle + '不能为空' : '该字段不能为空';
			if(_this.tipsType == 'poplayer') {
				Poplayer.showAlert({msg: options.msg});
				$this.focus();
			} else {
				Poptips.init(options);
			}
		}
	} 
};

module.exports = Validator;