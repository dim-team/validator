/**
 * 应用于dim(develop in modularization)框架的数据校验组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.13
 */
var ValidatorTpl = __inline('validator.handlebars');

var Validator = {
	init: function (options) {
		if (!this.status) {
			this.options = options;
			this.render();
		}
		
	},
	render: function () {
		var ValidatorObj = $(ValidatorTpl()); 
		this.ValidatorObj = ValidatorObj;
		this.options.container.append(ValidatorObj);
		this.status = 1;
		this.bindEvents();
	},
	bindEvents: function() {
		
	} 
};

module.exports = Validator;