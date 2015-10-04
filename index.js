var postcss = require('postcss');
var parser  = require('postcss-selector-parser');

module.exports = postcss.plugin('postcss-unnot', function (opts) {
	var method = opts && /^(move|pseudo|warn)$/.test(opts.method) ? opts.method : 'remove';

	return function (css, result) {
		css.walkRules(function (rule) {
			var cloneSelectors = [];

			if (rule.selector.indexOf(':not') !== -1) {
				var parsedSelector = parser(function (selectors) {
					selectors.each(function (selector) {
						selector.eachPseudo(function (pseudo) {
							if (pseudo.value === ':not') {
								if (method === 'move') cloneSelectors.push(String(selector));

								if (method === 'remove' || method === 'move') return selector.removeSelf() && false;
								else if (method === 'pseudo') pseudo.removeSelf();
								else if (method === 'warn') result.warn(':not detected', { node: rule });
							}
						});
					});
				}).process(rule.selector).result;

				if (parsedSelector !== rule.selector) {
					if (cloneSelectors.length) rule.parent.insertBefore(rule, rule.clone({ selector: String(cloneSelectors).trim() }));

					rule.selector = parsedSelector;
				}
			}
		});
	};
});
