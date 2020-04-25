(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*settings reducers*/


/*logData Stuff*/


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _settings = require("./reducers/settings.js");

var _logData = require("./reducers/logData.js");

var _logData2 = _interopRequireDefault(_logData);

var _loadIcon = require("./jsx/loadIcon.jsx");

var _loadIcon2 = _interopRequireDefault(_loadIcon);

var _sidebar = require("./jsx/sidebar.jsx");

var _sidebar2 = _interopRequireDefault(_sidebar);

var _pageLogs = require("./jsx/pages/pageLogs.jsx");

var _pageLogs2 = _interopRequireDefault(_pageLogs);

var _pageSettings = require("./jsx/pages/pageSettings.jsx");

var _pageSettings2 = _interopRequireDefault(_pageSettings);

var _pageOthers = require("./jsx/pages/pageOthers.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*data loaded*/
var loadedRE = function loadedRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var action = arguments[1];

	if (action.type === 'LOADED') {
		state = action.val;
	}

	state = _extends({}, state);
	return state;
};
var elCombine = (0, _redux.combineReducers)({
	logData: _logData2.default,
	iconOpen: _settings.iconRE,

	activeTab: _settings.tabRE,

	logPageSettings: _settings.logPageRE,

	pass: _settings.passRE,

	loaded: loadedRE
});

var zStore = (0, _redux.createStore)(elCombine);
// zStore.subscribe(()=>{
// 	console.log(zStore.getState());
// });


// load storage data
chrome.storage.local.get(null, function (res) {
	console.log('Storage:', res);

	/*individual settings*/
	// if( res.hasOwnProperty('pass') ){
	// 	zStore.dispatch({type:'passInit',val:res.pass});
	// }
	if (res.hasOwnProperty('activeTab')) {
		zStore.dispatch({ type: 'TAB', val: res.activeTab });
	}
	if (res.hasOwnProperty('iconOpen')) {
		zStore.dispatch({ type: 'iconOpenInit', val: res.iconOpen });
	}
	if (res.hasOwnProperty('logPageSettings')) {
		zStore.dispatch({ type: 'logPageSettingsInit', val: res.logPageSettings });
	}

	zStore.dispatch({ type: 'LOADED', val: 1 });

	//make log data obj
	try {
		zStore.dispatch({ type: 'LogDataFilterChrome', val: res });
	} catch (e) {
		console.log('Error processing log data:', e);
	}
	//show goods
	zStore.dispatch({ type: 'LOADED', val: 2 });

	// setTimeout(()=>{


	// 			// setTimeout(()=>{
	// 			// 	var sLogs = require('./s.json');
	// 			// 	for (var i = 0; i < sLogs.length; i++) {
	// 			// 		var key = sLogs[i].timestamp.replace(' @ ','T');
	// 			// 		key = new Date(key).getTime();
	// 			// 		var nLog = {};

	// 			// 		var oldUrl = sLogs[i].url;
	// 			// 		nLog.url={
	// 			// 			proto:'',
	// 			// 			www:'',
	// 			// 			domain:'',
	// 			// 			tld:'',
	// 			// 			path:'',
	// 			// 			frag:'',
	// 			// 		}
	// 			// 		nLog.url.proto = oldUrl.substring(0,oldUrl.indexOf('://')+1);
	// 			// 		oldUrl = oldUrl.replace(nLog.url.proto+'//','');
	// 			// 		nLog.url.domain = oldUrl.substring(0,oldUrl.indexOf('/'));
	// 			// 		oldUrl = oldUrl.replace(nLog.url.domain,'');
	// 			// 		nLog.url.path = oldUrl;

	// 			// 		var domain = nLog.url.domain;
	// 			// 		if( domain.match(/^w(?:ww|ww?[0-9]{1,3})\w{0,5}\./) ){
	// 			// 			nLog.url.www = domain.substring(0,domain.indexOf('.')+1);
	// 			// 			nLog.url.domain = domain.substring(domain.indexOf('.')+1);
	// 			// 		}
	// 			// 		var hasDot = domain.lastIndexOf('.');
	// 			// 		if( ~hasDot ){
	// 			// 			nLog.url.domain = domain.slice(0,hasDot);
	// 			// 			nLog.url.tld = domain.substr(hasDot);
	// 			// 		}
	// 			// 		console.log(nLog.url);
	// 			// 		nLog.inputs = [];
	// 			// 		for( var ipt of sLogs[i].inputs ){
	// 			// 			var inputSet = {
	// 			// 				endValue: ipt,
	// 			// 				initvalue: '',
	// 			// 				segments:[]
	// 			// 			}
	// 			// 			nLog.inputs.push(inputSet);
	// 			// 		}
	// 			// 		var wrapper = {};
	// 			// 		wrapper[key] = nLog;
	// 			// 		//chrome.storage.local.set(wrapper);
	// 			// 	}
	// 			// },9);

	// },9);
});

//import Password from "./jsx/pass.jsx";

var App = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loaded: store.loaded,
		aTab: store.activeTab
	};
}), _dec(_class = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "render",
		value: function render() {

			var aTab = this.props.aTab || 'logs';
			var isActive = {};
			isActive[aTab] = 'active';

			if (this.props.loaded < 1) {
				return _react2.default.createElement(_loadIcon2.default, { size: "5em", ringColor: "rgba(0,123,144,0.9)" });
			}

			// if( true ){
			// 	return(
			// 		<Password/>
			// 	);
			// }

			return _react2.default.createElement(
				"div",
				{ id: "pageMain" },
				_react2.default.createElement(_sidebar2.default, null),
				_react2.default.createElement(
					"div",
					{ id: "content" },
					_react2.default.createElement(_pageLogs2.default, { className: isActive.logs }),
					_react2.default.createElement(_pageSettings2.default, { className: isActive.settings }),
					_react2.default.createElement(_pageOthers.Donate, { className: isActive.donate }),
					_react2.default.createElement(_pageOthers.About, { className: isActive.about })
				)
			);
		}
	}]);

	return App;
}(_react2.default.Component)) || _class);
exports.default = App;


_reactDom2.default.render(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: zStore },
	_react2.default.createElement(App, null)
), document.getElementById('umbrella'));

},{"./jsx/loadIcon.jsx":2,"./jsx/pages/pageLogs.jsx":4,"./jsx/pages/pageOthers.jsx":5,"./jsx/pages/pageSettings.jsx":6,"./jsx/sidebar.jsx":7,"./reducers/logData.js":8,"./reducers/settings.js":9,"react":"react","react-dom":"react-dom","react-redux":"react-redux","redux":"redux"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var container = function container(cv) {
	var inLine = {
		zIndex: cv.baseIndex + 0,
		position: "relative",
		width: cv.size,
		height: cv.size
	};

	return inLine;
};

var background = function background(cv) {
	var size = cv.size.replace(/[^0-9.]/g, '');
	size = size / 5;
	size += cv.size.replace(/[0-9.]/g, '');
	var inLine = {
		zIndex: cv.baseIndex + 1,
		position: "relative",
		overflow: 'visible',
		width: "100%",
		height: "100%",
		borderRadius: "100%",
		borderStyle: "solid",
		borderWidth: size,
		borderColor: cv.ringColor
	};

	return inLine;
};

var ballCon = function ballCon(cv) {
	var inLine = {
		zIndex: cv.baseIndex + 2,
		position: "absolute",
		width: "100%",
		height: "100%",
		animationName: cv.ballAnimation,
		animationDuration: cv.time,
		animationTimingFunction: 'linear',
		animationDelay: '0.0s',
		animationIterationCount: 'infinite',
		animationDirection: 'normal',
		animationFillMode: 'forwards'
	};

	return inLine;
};
var ball = function ball(cv) {
	var sNumb = cv.size.replace(/[^0-9.]/g, '');
	var sUnit = cv.size.replace(/[0-9.]/g, '');

	var size = sNumb / 6 + sUnit;
	var pad = (sNumb / 5 - sNumb / 6) / 2;
	var outline = pad / 2;
	pad += sUnit;
	var inLine = {
		zIndex: cv.baseIndex + 3,
		width: size,
		height: size,
		borderRadius: "100%",
		margin: pad,
		background: cv.ballColor
	};

	return inLine;
};

var DotSpin = function (_React$Component) {
	_inherits(DotSpin, _React$Component);

	function DotSpin(p) {
		_classCallCheck(this, DotSpin);

		var _this = _possibleConstructorReturn(this, (DotSpin.__proto__ || Object.getPrototypeOf(DotSpin)).call(this, p));

		var animationName = "animation" + Math.round(Math.random() * 99);
		var keyframes = "@keyframes " + animationName + " {\n\t\t\t100% {\n\t\t\t\ttransform:rotate(360deg);\n\t\t\t}\n\t\t}";
		var styleSheet = document.styleSheets[0];
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

		var controlValues = {
			ballAnimation: animationName,
			baseIndex: p.index || 99,
			size: p.size || "10em",
			time: p.time || "0.9s",
			ringColor: p.ringColor || "rgba(0,123,9,0.6)",
			ballColor: p.ballColor || "rgba(255,255,255,0.96)"
		};

		_this.state = controlValues;
		return _this;
	}

	_createClass(DotSpin, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ style: container(this.state) },
				_react2.default.createElement(
					"div",
					{ style: ballCon(this.state) },
					_react2.default.createElement("div", { style: ball(this.state) })
				),
				_react2.default.createElement("div", { style: background(this.state) })
			);
		}
	}]);

	return DotSpin;
}(_react2.default.Component);

exports.default = DotSpin;

},{"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _loadIcon = require("../loadIcon.jsx");

var _loadIcon2 = _interopRequireDefault(_loadIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require('moment');
var ListArea = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loaded: store.loaded,
		settings: store.logPageSettings,
		data: store.logData
	};
}), _dec(_class = function (_React$Component) {
	_inherits(ListArea, _React$Component);

	function ListArea() {
		_classCallCheck(this, ListArea);

		return _possibleConstructorReturn(this, (ListArea.__proto__ || Object.getPrototypeOf(ListArea)).apply(this, arguments));
	}

	_createClass(ListArea, [{
		key: "render",
		value: function render() {
			var settings = this.props.settings;
			var data = this.props.data;

			//loading stage
			if (this.props.loaded < 2 || !data) {
				return _react2.default.createElement(
					"div",
					{ id: "listArea" },
					_react2.default.createElement(_loadIcon2.default, { size: "4em", ringColor: "rgba(0,123,144,0.9)" }),
					_react2.default.createElement(
						"p",
						{ className: "loadingMsg" },
						"loading logs"
					)
				);
			}

			//error while processing data
			if ((typeof data === "undefined" ? "undefined" : _typeof(data)) != "object" || data instanceof Error) {
				return _react2.default.createElement(
					"div",
					{ id: "listArea" },
					_react2.default.createElement(
						"p",
						{ className: "loadingMsg" },
						"Malformed Data:"
					),
					_react2.default.createElement(
						"p",
						{ className: "errMsg" },
						JSON.stringify(data, Object.getOwnPropertyNames(data))
					)
				);
			}

			//no logs
			if (Object.keys(data).length < 1) {
				return _react2.default.createElement(
					"div",
					{ id: "listArea" },
					_react2.default.createElement(
						"p",
						{ className: "noLogs" },
						"-no logs-"
					)
				);
			}

			return _react2.default.createElement(
				"div",
				{ id: "listArea" },
				settings.viewType == 'site' && _react2.default.createElement(SiteList, null),
				settings.viewType == 'time' && _react2.default.createElement(
					"div",
					{ id: "scrollListCon", className: "flexScrollContain" },
					_react2.default.createElement(TimeList, { logs: Object.keys(data) })
				)
			);
		}
	}]);

	return ListArea;
}(_react2.default.Component)) || _class);
exports.default = ListArea;
var SiteList = (_dec2 = (0, _reactRedux.connect)(function (store) {
	return {
		data: store.logData,
		openedSite: store.logPageSettings.openedSite
	};
}), _dec2(_class2 = function (_React$Component2) {
	_inherits(SiteList, _React$Component2);

	function SiteList() {
		_classCallCheck(this, SiteList);

		var _this2 = _possibleConstructorReturn(this, (SiteList.__proto__ || Object.getPrototypeOf(SiteList)).call(this));

		_this2.open = _this2.open.bind(_this2);
		_this2.deleteSite = _this2.deleteSite.bind(_this2);
		return _this2;
	}

	_createClass(SiteList, [{
		key: "open",
		value: function open(site) {
			this.props.dispatch({ type: 'logPageSettingsOpenedSite', val: site });
		}
	}, {
		key: "deleteSite",
		value: function deleteSite(siteLogs) {
			this.props.dispatch({ type: 'LogDataDeleteSome', val: siteLogs });
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var data = this.props.data;

			var siteList = {};
			Object.keys(data).map(function (key) {
				var url = data[key].url;
				var site = url.domain + url.tld;

				if (!siteList.hasOwnProperty(site)) siteList[site] = [];

				siteList[site].push(key);
			});

			// single site
			var openSite = this.props.openedSite;
			if (openSite && siteList[openSite]) {
				return _react2.default.createElement(
					"div",
					{ id: "siteViewCon" },
					_react2.default.createElement(
						"div",
						{ className: "siteTop" },
						_react2.default.createElement(
							"div",
							{ className: "goBack", title: "back to sites view" },
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this3.open(null);
									} },
								"\u2190"
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "siteName" },
							openSite
						),
						_react2.default.createElement(
							"div",
							{ className: "deleteSite", title: "delete site's logs" },
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this3.deleteSite(siteList[openSite]);
									} },
								"X"
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "scrollListCon", className: "flexScrollContain" },
						_react2.default.createElement(
							"div",
							{ className: "flexScrollBody siteList" },
							_react2.default.createElement(TimeList, { logs: siteList[openSite] })
						)
					)
				);
			}

			// list of sites
			return _react2.default.createElement(
				"div",
				{ id: "scrollListCon", className: "flexScrollContain" },
				_react2.default.createElement(
					"div",
					{ className: "flexScrollBody siteList" },
					Object.keys(siteList).sort().map(function (sKey) {
						var siteLogs = siteList[sKey];
						return _react2.default.createElement(
							"div",
							{ className: "aSite", key: sKey },
							_react2.default.createElement(
								"div",
								{ className: "deleteSite", title: "delete site's logs" },
								_react2.default.createElement(
									"button",
									{ onClick: function onClick(e) {
											return _this3.deleteSite(siteList[sKey]);
										} },
									"X"
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "siteName", onClick: function onClick(e) {
										return _this3.open(sKey);
									}, title: "open logs" },
								_react2.default.createElement(
									"p",
									null,
									sKey
								),
								_react2.default.createElement(
									"span",
									null,
									siteList[sKey].length + ' ',
									" \u2192"
								)
							)
						);
					})
				)
			);
		}
	}]);

	return SiteList;
}(_react2.default.Component)) || _class2);

//import VirtualList from 'react-tiny-virtual-list';
// return(
// 	<VirtualList
// 		width='100%'
// 		height='100%'
// 		itemCount={logs.length}
// 		itemSize={70}
// 		overscanCount={60}
// 		renderItem={({index, style})=>
// 				<ALog key={index} id={logs[index]} log={data[logs[index]]} />
// 		}
// 	/>
// );

var pageSize = 99;
//var renderTime;
var TimeList = (_dec3 = (0, _reactRedux.connect)(function (store) {
	return {
		data: store.logData
	};
}), _dec3(_class3 = function (_React$Component3) {
	_inherits(TimeList, _React$Component3);

	function TimeList(p) {
		_classCallCheck(this, TimeList);

		var _this4 = _possibleConstructorReturn(this, (TimeList.__proto__ || Object.getPrototypeOf(TimeList)).call(this, p));

		_this4.state = {
			pagesLoaded: 1,
			sHeight: 0
		};
		_this4.addPage = _this4.addPage.bind(_this4);
		return _this4;
	}

	_createClass(TimeList, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			//renderTime = (new Date()).getTime();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this);
			this.setState({ sHeight: node.scrollHeight });
		}
	}, {
		key: "addPage",
		value: function addPage() {
			this.setState({ pagesLoaded: this.state.pagesLoaded + 1 });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(oldP, oldS) {
			var node = _reactDom2.default.findDOMNode(this);
			if (oldS.pagesLoaded && this.state.pagesLoaded > oldS.pagesLoaded) {
				var t = node.parentNode.getBoundingClientRect().height;
				node.parentNode.scrollTo(0, this.state.sHeight - t);
				this.setState({ sHeight: node.scrollHeight });
			}
		}
	}, {
		key: "render",
		value: function render() {

			var data = this.props.data;
			var logs = this.props.logs;
			if (!logs || logs.length < 1) {
				console.log('No Logs Detected in TimeList: ', logs);
				return _react2.default.createElement(
					"p",
					{ className: "noLogs" },
					"-no logs-"
				);
			}

			var pagesLoaded = this.state.pagesLoaded;
			var toLoad = pagesLoaded * pageSize;
			//console.log(toLoad);

			return _react2.default.createElement(
				"div",
				{ className: "flexScrollBody timeList" },
				_react2.default.createElement(
					"div",
					{ className: "listEnd" },
					"latest"
				),
				logs.slice(0).reverse().map(function (key, idx) {
					if (idx > toLoad) {
						return null;
					}
					return _react2.default.createElement(ALog, { key: key, id: key, log: data[key] });
				}),
				logs.length > pagesLoaded * pageSize && _react2.default.createElement(
					"button",
					{ onClick: this.addPage, className: "loadMore" },
					"load more"
				),
				_react2.default.createElement(
					"div",
					{ className: "listEnd" },
					"earliest"
				)
			);
		}
	}]);

	return TimeList;
}(_react2.default.Component)) || _class3);
var ALog = (_dec4 = (0, _reactRedux.connect)(function (store) {
	return {
		settings: store.logPageSettings
	};
}), _dec4(_class4 = function (_React$Component4) {
	_inherits(ALog, _React$Component4);

	function ALog() {
		_classCallCheck(this, ALog);

		var _this5 = _possibleConstructorReturn(this, (ALog.__proto__ || Object.getPrototypeOf(ALog)).call(this));

		_this5.deleteOne = _this5.deleteOne.bind(_this5);
		return _this5;
	}

	_createClass(ALog, [{
		key: "deleteOne",
		value: function deleteOne(logID) {
			this.props.dispatch({ type: 'LogDataDeleteSome', val: [logID] });
		}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			var key = this.props.id;
			var log = this.props.log;
			return _react2.default.createElement(
				"div",
				{ className: "aLog" },
				_react2.default.createElement(
					"div",
					{ className: "top" },
					_react2.default.createElement(
						"div",
						{ className: "deleteOne", title: "delete this log set" },
						_react2.default.createElement(
							"button",
							{ onClick: function onClick(e) {
									return _this6.deleteOne(key);
								} },
							"X"
						)
					),
					_react2.default.createElement(TimeStamp, { time: key }),
					_react2.default.createElement(URL, { url: log.url })
				),
				_react2.default.createElement(InputSet, { data: log.inputs })
			);
		}
	}]);

	return ALog;
}(_react2.default.Component)) || _class4);
var TimeStamp = (_dec5 = (0, _reactRedux.connect)(function (store) {
	return {
		mTime: store.logPageSettings.mTime
	};
}), _dec5(_class5 = function (_React$Component5) {
	_inherits(TimeStamp, _React$Component5);

	function TimeStamp() {
		_classCallCheck(this, TimeStamp);

		return _possibleConstructorReturn(this, (TimeStamp.__proto__ || Object.getPrototypeOf(TimeStamp)).apply(this, arguments));
	}

	_createClass(TimeStamp, [{
		key: "render",
		value: function render() {
			var mTime = this.props.mTime;
			var time = moment(parseInt(this.props.time));
			return _react2.default.createElement(
				"div",
				{ className: "timestamp" },
				_react2.default.createElement(
					"p",
					{ className: "date" },
					time.format('YYYY-MM-DD')
				),
				_react2.default.createElement(
					"p",
					{ className: "time", title: time.format('HH:mm:ss') },
					mTime ? time.format('HH:mm') : time.format('hh:mm a')
				)
			);
		}
	}]);

	return TimeStamp;
}(_react2.default.Component)) || _class5);
var URL = (_dec6 = (0, _reactRedux.connect)(function (store) {
	return {
		viewType: store.logPageSettings.viewType
	};
}), _dec6(_class6 = function (_React$Component6) {
	_inherits(URL, _React$Component6);

	function URL() {
		_classCallCheck(this, URL);

		return _possibleConstructorReturn(this, (URL.__proto__ || Object.getPrototypeOf(URL)).apply(this, arguments));
	}

	_createClass(URL, [{
		key: "render",
		value: function render() {
			var u = this.props.url;
			var viewType = this.props.viewType;
			return _react2.default.createElement(
				"div",
				{ className: 'urlCon' },
				_react2.default.createElement(
					"a",
					{ href: u.proto + '//' + u.www + u.domain + u.tld + u.path + u.frag, target: "_blank", title: u.domain + u.tld + u.path + u.frag },
					_react2.default.createElement(
						"span",
						{ className: "domain" },
						u.domain
					),
					_react2.default.createElement(
						"span",
						{ className: "tld" },
						u.tld
					),
					viewType == 'site' && _react2.default.createElement(
						"span",
						{ className: "path" },
						u.path
					)
				)
			);
		}
	}]);

	return URL;
}(_react2.default.Component)) || _class6);

var InputSet = function (_React$Component7) {
	_inherits(InputSet, _React$Component7);

	function InputSet() {
		_classCallCheck(this, InputSet);

		return _possibleConstructorReturn(this, (InputSet.__proto__ || Object.getPrototypeOf(InputSet)).apply(this, arguments));
	}

	_createClass(InputSet, [{
		key: "render",
		value: function render() {
			var data = this.props.data;
			return _react2.default.createElement(
				"div",
				{ className: "inputSet" },
				data.map(function (input, idx) {
					return _react2.default.createElement(Values, { key: idx, data: input });
				})
			);
		}
	}]);

	return InputSet;
}(_react2.default.Component);

// @connect((store)=>{
// 	return {};
// })


var Values = function (_React$Component8) {
	_inherits(Values, _React$Component8);

	function Values() {
		_classCallCheck(this, Values);

		return _possibleConstructorReturn(this, (Values.__proto__ || Object.getPrototypeOf(Values)).apply(this, arguments));
	}

	_createClass(Values, [{
		key: "render",
		value: function render() {
			var data = this.props.data;

			var values = [];

			if (data.endValue && data.endValue !== '') {
				values.push(data.endValue);
			}
			if (data.initValue && data.initValue !== '') {
				values.push(data.initValue);
			}
			data.segments.forEach(function (seg) {
				values.push(seg);
			});

			// check for empty input sets
			if (values.length < 1) {
				//console.log('Empty Data: ',data);
				//this.props.dispatch({type:'LogDataClearEmpty',val:1});
				return null;
			}

			return _react2.default.createElement(
				"div",
				{ className: "valueSet" },
				values.map(function (v, idx) {
					return _react2.default.createElement(
						"p",
						{ className: "aValue", key: idx + v },
						v
					);
				})
			);
		}
	}]);

	return Values;
}(_react2.default.Component);

},{"../loadIcon.jsx":2,"moment":"moment","react":"react","react-dom":"react-dom","react-redux":"react-redux"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2, _dec3, _class3;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _fileSaver = require("file-saver");

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _loadIcon = require("../loadIcon.jsx");

var _loadIcon2 = _interopRequireDefault(_loadIcon);

var _logLists = require("./logLists.jsx");

var _logLists2 = _interopRequireDefault(_logLists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require('moment');
var LogsPage = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loaded: store.loaded,
		settings: store.logPageSettings
	};
}), _dec(_class = function (_React$Component) {
	_inherits(LogsPage, _React$Component);

	function LogsPage() {
		_classCallCheck(this, LogsPage);

		var _this = _possibleConstructorReturn(this, (LogsPage.__proto__ || Object.getPrototypeOf(LogsPage)).call(this));

		_this.state = {
			dialog: false
		};
		_this.dvTime = _this.dvTime.bind(_this);
		_this.dvSite = _this.dvSite.bind(_this);
		_this.mTime = _this.mTime.bind(_this);
		_this.confirmDelete = _this.confirmDelete.bind(_this);

		_this.openDialog = _this.openDialog.bind(_this);
		_this.closeDialog = _this.closeDialog.bind(_this);
		return _this;
	}

	_createClass(LogsPage, [{
		key: "dvTime",
		value: function dvTime(e) {
			this.props.dispatch({ type: 'logPageSettingsTime', val: true });
		}
	}, {
		key: "dvSite",
		value: function dvSite(e) {
			this.props.dispatch({ type: 'logPageSettingsSite', val: true });
		}
	}, {
		key: "confirmDelete",
		value: function confirmDelete() {
			this.props.dispatch({ type: 'logPageSettingsConfirmDelete', val: !this.props.settings.confirmDelete });
		}
	}, {
		key: "mTime",
		value: function mTime(t) {
			this.props.dispatch({ type: 'logPageSettingsmTime', val: t });
		}
	}, {
		key: "openDialog",
		value: function openDialog(d) {
			this.setState({ dialog: d });
		}
	}, {
		key: "closeDialog",
		value: function closeDialog() {
			this.setState({ dialog: false });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var settings = this.props.settings;
			var active = {};
			active[settings.viewType] = 'selected';
			if (settings.mTime) active.mTimeOn = 'selected';else active.mTimeOff = 'selected';

			return _react2.default.createElement(
				"div",
				{ id: "logs", className: this.props.className },
				_react2.default.createElement(
					"div",
					{ className: "pageMeat" },
					_react2.default.createElement(_logLists2.default, null),
					_react2.default.createElement(
						"div",
						{ id: "logControls" },
						_react2.default.createElement(
							"div",
							{ className: "controlSet displayView" },
							_react2.default.createElement(
								"p",
								{ className: "setTitle" },
								"Display View"
							),
							_react2.default.createElement(
								"div",
								{ className: 'selectButt ' + (active.time || ''), onClick: function onClick(e) {
										return _this2.dvTime();
									} },
								_react2.default.createElement("div", { className: "lightBar" }),
								_react2.default.createElement(
									"p",
									null,
									"time"
								)
							),
							_react2.default.createElement(
								"div",
								{ className: 'selectButt ' + (active.site || ''), onClick: function onClick(e) {
										return _this2.dvSite();
									} },
								_react2.default.createElement("div", { className: "lightBar" }),
								_react2.default.createElement(
									"p",
									null,
									"site"
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "controlSet mTime" },
							_react2.default.createElement(
								"p",
								{ className: "setTitle" },
								"Time Format"
							),
							_react2.default.createElement(
								"div",
								{ className: 'selectButt ' + (active.mTimeOn || ''), onClick: function onClick(e) {
										return _this2.mTime(true);
									} },
								_react2.default.createElement("div", { className: "lightBar" }),
								_react2.default.createElement(
									"p",
									null,
									"24 hour"
								)
							),
							_react2.default.createElement(
								"div",
								{ className: 'selectButt ' + (active.mTimeOff || ''), onClick: function onClick(e) {
										return _this2.mTime(false);
									} },
								_react2.default.createElement("div", { className: "lightBar" }),
								_react2.default.createElement(
									"p",
									null,
									"am | pm"
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "controlSet export" },
							_react2.default.createElement(
								"div",
								{ className: "lButt", onClick: function onClick(e) {
										return _this2.openDialog('export');
									} },
								_react2.default.createElement(
									"p",
									{ className: "buttTitle" },
									"export"
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "controlSet deleteAll" },
							_react2.default.createElement(
								"div",
								{ className: "lButt", onClick: function onClick(e) {
										return _this2.openDialog('deleteAll');
									} },
								_react2.default.createElement(
									"p",
									{ className: "buttTitle" },
									"delete all"
								)
							)
						)
					)
				),
				this.state.dialog == 'deleteAll' && _react2.default.createElement(DeleteAllScreen, { close: function close() {
						return _this2.closeDialog();
					} }),
				this.state.dialog == 'export' && _react2.default.createElement(ExportLogs, { close: function close() {
						return _this2.closeDialog();
					} })
			);
		}
	}]);

	return LogsPage;
}(_react2.default.Component)) || _class);
// <div className='controlSet confirmDeletes'>
// 	<div className='lButt' onClick={this.confirmDelete}>
// 		<p className='buttTitle'>confirm delete</p>
// 		<input type="checkbox" checked={settings.confirmDelete} readOnly/>
// 	</div>
// </div>


exports.default = LogsPage;
var DeleteAllScreen = (_dec2 = (0, _reactRedux.connect)(function (store) {
	return {};
}), _dec2(_class2 = function (_React$Component2) {
	_inherits(DeleteAllScreen, _React$Component2);

	function DeleteAllScreen() {
		_classCallCheck(this, DeleteAllScreen);

		var _this3 = _possibleConstructorReturn(this, (DeleteAllScreen.__proto__ || Object.getPrototypeOf(DeleteAllScreen)).call(this));

		_this3.deleteAll = _this3.deleteAll.bind(_this3);
		return _this3;
	}

	_createClass(DeleteAllScreen, [{
		key: "deleteAll",
		value: function deleteAll() {
			this.props.dispatch({ type: 'LogDataDeleteAll', val: true });
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(
				"div",
				{ className: "overlay", onClick: function onClick(e) {
						return _this4.props.close();
					} },
				_react2.default.createElement(
					"div",
					{ className: "box" },
					_react2.default.createElement(
						"div",
						{ className: "meat" },
						_react2.default.createElement(
							"p",
							{ className: "msg" },
							"confirm delete all logs command"
						),
						_react2.default.createElement(
							"div",
							{ className: "buttSet" },
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this4.deleteAll();
									} },
								"Yes"
							),
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this4.props.close();
									} },
								"No"
							)
						)
					)
				)
			);
		}
	}]);

	return DeleteAllScreen;
}(_react2.default.Component)) || _class2);
var ExportLogs = (_dec3 = (0, _reactRedux.connect)(function (store) {
	return {
		logData: store.logData,
		settings: store.logPageSettings
	};
}), _dec3(_class3 = function (_React$Component3) {
	_inherits(ExportLogs, _React$Component3);

	function ExportLogs(p) {
		_classCallCheck(this, ExportLogs);

		var _this5 = _possibleConstructorReturn(this, (ExportLogs.__proto__ || Object.getPrototypeOf(ExportLogs)).call(this, p));

		_this5.state = {
			viewType: _this5.props.settings.viewType
		};
		_this5.export = _this5.export.bind(_this5);
		return _this5;
	}

	_createClass(ExportLogs, [{
		key: "render",
		value: function render() {
			var _this6 = this;

			var viewType = this.state.viewType;
			return _react2.default.createElement(
				"div",
				{ className: "overlay", onClick: function onClick(e) {
						return _this6.props.close();
					} },
				_react2.default.createElement(
					"div",
					{ className: "box" },
					_react2.default.createElement(
						"div",
						{ className: "meat" },
						_react2.default.createElement(
							"p",
							{ className: "msg" },
							"export logs"
						),
						_react2.default.createElement(
							"div",
							{ className: "buttSet" },
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this6.export();
									} },
								"Export"
							),
							_react2.default.createElement(
								"button",
								{ onClick: function onClick(e) {
										return _this6.props.close();
									} },
								"Close"
							)
						)
					)
				)
			);
		}
	}, {
		key: "export",
		value: function _export() {
			var data = this.props.logData;
			var type = 'time'; //this.state.viewType;

			var res;
			if (type === 'site') {
				res = {};
			} else {
				res = [];
			}

			Object.keys(data).map(function (key) {
				var url = data[key].url;
				var temp = {
					timestamp: moment(parseInt(key)).format('YYYY-MM-DD @ HH:mm:ss'),
					url: url, //(url.proto+'//'+url.www+url.domain+url.tld+url.path+url.frag),
					inputs: []
				};
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = data[key].inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var input = _step.value;

						if (input.endValue && input.endValue !== '') {
							temp.inputs.push(input.endValue);
						}
						if (input.initValue && input.initValue !== '') {
							temp.inputs.push(input.initValue);
						}
						input.segments.forEach(function (seg) {
							temp.inputs.push(seg);
						});
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (type === 'site') {
					var site = url.domain + url.tld;

					if (!res.hasOwnProperty(site)) res[site] = [];

					res[site].push(temp);
				} else {
					res.push(temp);
				}
			});

			var blob = new Blob([JSON.stringify(res, null, '\t')], { type: "application/json;charset=utf-8" });
			_fileSaver2.default.saveAs(blob, 'feaLog.' + new Date().toJSON() + '.json.txt');
		}
	}]);

	return ExportLogs;
}(_react2.default.Component)) || _class3);

},{"../loadIcon.jsx":2,"./logLists.jsx":3,"file-saver":"file-saver","moment":"moment","react":"react","react-dom":"react-dom","react-redux":"react-redux"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.About = exports.Donate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Donate = exports.Donate = function (_React$Component) {
	_inherits(Donate, _React$Component);

	function Donate() {
		_classCallCheck(this, Donate);

		return _possibleConstructorReturn(this, (Donate.__proto__ || Object.getPrototypeOf(Donate)).apply(this, arguments));
	}

	_createClass(Donate, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "donate", className: this.props.className },
				_react2.default.createElement(
					"div",
					{ className: "pageHeading" },
					_react2.default.createElement(
						"p",
						null,
						"Support Me ^_^"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "pageMeat" },
					_react2.default.createElement(
						"div",
						{ id: "paypalCon" },
						_react2.default.createElement(
							"a",
							{ href: "https://paypal.me/hakanonymos", target: "_blank", title: "paypal.me" },
							_react2.default.createElement(
								"span",
								{ className: "db" },
								"Pay"
							),
							_react2.default.createElement(
								"span",
								{ className: "lb" },
								"Pal"
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "bitcoinCon" },
						_react2.default.createElement(
							"div",
							null,
							"Bitcoin Address:"
						),
						_react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(
								"a",
								{ href: "https://blockchain.info/address/3CnBHkCP7F9PDADuhzH1WLiqH6BqJAXxNn", target: "_blank" },
								"3CnBHkCP7F9PDADuhzH1WLiqH6BqJAXxNn"
							)
						)
					)
				)
			);
		}
	}]);

	return Donate;
}(_react2.default.Component);

var About = exports.About = function (_React$Component2) {
	_inherits(About, _React$Component2);

	function About() {
		_classCallCheck(this, About);

		return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
	}

	_createClass(About, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "about", className: this.props.className },
				_react2.default.createElement(
					"div",
					{ className: "pageHeading" },
					_react2.default.createElement(
						"p",
						null,
						"About this Extension"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "pageMeat" },
					_react2.default.createElement(
						"div",
						{ className: "bulletList" },
						_react2.default.createElement(
							"p",
							null,
							"monitors and logs text inputs"
						),
						_react2.default.createElement(
							"p",
							null,
							"all collected data is stored in Chrome"
						),
						_react2.default.createElement(
							"p",
							null,
							"this extension contains no advertisements or analytics"
						),
						_react2.default.createElement(
							"p",
							null,
							"may not work properly on sites with unconventional inputs setups like jsfiddle.net"
						)
					)
				)
			);
		}
	}]);

	return About;
}(_react2.default.Component);

},{"react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Settings = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		iconOpen: store.iconOpen
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Settings, _React$Component);

	function Settings() {
		_classCallCheck(this, Settings);

		var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));

		_this.iconChange = _this.iconChange.bind(_this);
		return _this;
	}

	_createClass(Settings, [{
		key: "iconChange",
		value: function iconChange() {
			this.props.dispatch({ type: 'iconOpenChange', val: !this.props.iconOpen });
		}
	}, {
		key: "render",
		value: function render() {
			var iconOpen = this.props.iconOpen;
			return _react2.default.createElement(
				"div",
				{ id: "options", className: this.props.className },
				_react2.default.createElement(
					"div",
					{ className: "pageHeading" },
					_react2.default.createElement(
						"p",
						null,
						"KeyLogger Settings"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "pageMeat" },
					_react2.default.createElement(
						"div",
						{ className: "optionSet" },
						_react2.default.createElement(
							"div",
							{ className: "optionButt" },
							_react2.default.createElement("input", { type: "checkbox", checked: iconOpen, onChange: this.iconChange }),
							_react2.default.createElement(
								"p",
								null,
								"icon click opens this page"
							)
						)
					)
				)
			);
		}
	}]);

	return Settings;
}(_react2.default.Component)) || _class);

// <div className='optionSet'>
// 	<p className='title'>Set Password</p>
// </div>
// <div className='optionSet'>
// 	<p className='title'>Auto Uninstall</p>
// </div>

exports.default = Settings;

},{"react":"react","react-dom":"react-dom","react-redux":"react-redux"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _dec, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_React$Component) {
	_inherits(Sidebar, _React$Component);

	function Sidebar() {
		_classCallCheck(this, Sidebar);

		return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
	}

	_createClass(Sidebar, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "barCon" },
				_react2.default.createElement(
					"div",
					{ id: "heading" },
					_react2.default.createElement(
						"p",
						{ title: "KeyLogger" },
						"Simple"
					),
					_react2.default.createElement(
						"p",
						{ title: "Fea KeyLogger" },
						"KeyLogger"
					)
				),
				_react2.default.createElement(Tabs, null),
				_react2.default.createElement(
					"div",
					{ id: "foot" },
					_react2.default.createElement(
						"span",
						{ title: "legal crap" },
						"\xA9 Frosation"
					)
				)
			);
		}
	}]);

	return Sidebar;
}(_react2.default.Component);

exports.default = Sidebar;


var tabIDs = ['logs', 'settings', 'donate', 'about'];
var Tabs = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		aTab: store.activeTab
	};
}), _dec(_class = function (_React$Component2) {
	_inherits(Tabs, _React$Component2);

	function Tabs() {
		_classCallCheck(this, Tabs);

		var _this2 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

		_this2.tabClick = _this2.tabClick.bind(_this2);
		return _this2;
	}

	_createClass(Tabs, [{
		key: "tabClick",
		value: function tabClick(tab) {
			this.props.dispatch({ type: 'TAB', val: tab });
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var aTab = this.props.aTab || 'logs';
			var tabClasses = {};
			tabClasses[aTab] = 'activeTab';
			return _react2.default.createElement(
				"div",
				{ id: "navCon" },
				tabIDs.map(function (i) {
					return _react2.default.createElement(
						"div",
						{ className: 'tButt ' + (tabClasses[i] || ''), key: i, onClick: function onClick(e) {
								return _this3.tabClick(i);
							} },
						_react2.default.createElement(
							"p",
							null,
							i
						),
						_react2.default.createElement("div", { className: "selected" })
					);
				})
			);
		}
	}]);

	return Tabs;
}(_react2.default.Component)) || _class);

},{"react":"react","react-dom":"react-dom","react-redux":"react-redux"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = logDataRE;
/*log data is Array for now*/

function logDataRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];


	if (action.type === 'LogDataFilterChrome') {
		try {
			state = filterChromeObj(action.val);
		} catch (e) {
			console.log('Error filtering log data:', e);
			state = e;
		}
	}

	if (action.type === 'LogDataDeleteAll') {
		//clear chrome
		chrome.storage.local.remove(Object.keys(state));
		// clear redux
		state = {};
	}

	if (action.type === 'LogDataDeleteSome') {
		var logIDs = action.val;

		// delete from chrome
		chrome.storage.local.remove(logIDs);

		// delete from redux
		for (var i = 0; i < logIDs.length; i++) {
			delete state[logIDs[i]];
		}
		state = _extends({}, state);
	}

	return state;
}

/* parse object of logs from Chrome */
function filterChromeObj(logs) {
	var res = {};

	var detected = 0;
	var processed = 0;

	console.log('filtering log data...');

	for (var key in logs) {
		if (/[^0-9]/.test(key)) //only numbered keys
			continue;
		detected++;
		//console.log(JSON.stringify(logs[key],null));

		var aLog = logs[key];

		// legacy: remove incognito:0's
		if (aLog.hasOwnProperty('incog') && aLog.incog === 0) {
			delete aLog.incog;
			var update = {};
			update[key] = aLog;
			chrome.storage.local.set(update);
		}

		//legacy: check uri array
		if (aLog.uri && Array.isArray(aLog.uri) && aLog.uri.length === 4) {
			console.log('uri');
			var uri = aLog.uri;
			aLog.url = {
				proto: uri[0],
				www: '',
				domain: uri[1], //.slice(0,uri[1].lastIndexOf(".")),
				tld: '', //uri[1].slice(uri[1].lastIndexOf(".")),
				path: uri[2],
				frag: uri[3]
			};

			//separate www.
			var u = aLog.url;
			if (u.domain.match(/^w(?:ww|ww?[0-9]{1,3})\w{0,5}\./)) {
				u.www = u.domain.substring(0, u.domain.indexOf('.') + 1);
				u.domain = u.domain.substring(u.domain.indexOf('.') + 1);
			}
			// separate .tld
			var hasDot = u.domain.lastIndexOf('.');
			if (~hasDot) {
				u.tld = u.domain.substring(hasDot);
				u.domain.slice(0, hasDot);
			}

			//delete old format
			delete aLog.uri;
			// update
			var update = {};
			update[key] = aLog;
			chrome.storage.local.set(update);
		}

		//check url's
		if (!aLog.url || !aLog.url.domain) {
			//chrome.storage.local.remove(key);
			continue;
		}

		//check inputs
		var inputs = aLog.inputs;
		if (!inputs || !Array.isArray(inputs)) {
			continue;
		}
		// remove empty entries
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].endValue == '' && inputs[i].initValue == '' && inputs[i].segments.length < 1) {
				//console.log('SPLICED: ', JSON.stringify(inputs));
				inputs.splice(i, 1);
			}
		}
		if (inputs.length < 1) {
			//chrome.storage.local.remove(key);
			//delete logs[key];
			console.log('Empty Log Detected:', key, logs[key]);
			continue;
		}

		res[key] = aLog;
		processed++;
	}

	console.log(processed + ' Entries Successfully Processed');
	//if( detected-processed>0 ){
	console.log(detected - processed + ' Entries Malformatted');
	return res;
}

// /* parse object of logs from Chrome */
// function filterChromeObj(logs){
// 	console.log('filtering log data...');

// 	var res = {};
// 	var detected = 0;
// 	var processed = 0;

// 	for (var key in logs) {
// 		if( /[^0-9]/.test(key) ) //only numbered keys
// 			continue;
// 		detected++;

// 		var aLog;
// 		try{
// 			aLog = processLog(logs[key],key);
// 		}
// 		catch(e){
// 			console.log('Error filtering log #'+key+':',e);
// 			continue;			
// 		}

// 		if( !aLog || typeof aLog!="object" ){
// 			console.log('data error: log #'+key,logs[key]);
// 			continue;
// 		}
// 		res[key] = aLog;
// 		processed++;
// 	}


// 	console.log(processed + ' Entries Successfully Processed');
// 	//if( detected-processed>0 ){
// 		console.log(detected-processed + ' Entries Malformatted');
// 	return res;
// }


// function processLog(aLog,key){

// 	// legacy: remove incognito:0's
// 	if( aLog.hasOwnProperty('incog') && aLog.incog===0 ){
// 		delete aLog.incog;
// 		var update = {};
// 		update[key] = aLog;
// 		chrome.storage.local.set(update);
// 	}
// 	//legacy: check uri array
// 	if( aLog.uri && Array.isArray(aLog.uri) ){
// 		var uri = aLog.uri;
// 		aLog.url = {
// 			proto: uri[0],
// 			www: '',
// 			domain: uri[1],//.slice(0,uri[1].lastIndexOf(".")),
// 			tld: '',//uri[1].slice(uri[1].lastIndexOf(".")),
// 			path: uri[2],
// 			frag: uri[3]
// 		};
// 		//delete old
// 		delete aLog.uri;

// 		//separate www
// 		var u = aLog.url;
// 		if( u.domain.match(/^w(?:ww|ww?[0-9]{1,3})\w{0,5}\./) ){
// 			u.www = u.domain.substring(0,u.domain.indexOf('.')+1);
// 			u.domain = u.domain.substring(u.domain.indexOf('.')+1);
// 		}
// 		// separate .tld's
// 		var hasDot = u.domain.lastIndexOf('.');
// 		if( ~hasDot ){
// 			u.tld = url.domain.substr(hasDot);
// 			u.domain = url.domain.slice(0,hasDot);
// 		}
// 		// update
// 		var update = {};
// 		update[key] = aLog;
// 		chrome.storage.local.set(update);
// 	}


// 	//check url's
// 	if( !aLog.url || !aLog.url.domain || !aLog.url.tld ){
// 		//chrome.storage.local.remove(key);
// 		return null;
// 	}


// 	//check inputs
// 	var inputs = aLog.inputs;
// 	if( !inputs || !Array.isArray(inputs) ){
// 		return null;
// 	}
// 	// remove empty entries
// 	for( var i = 0; i < inputs.length; i++ ){
// 		if( inputs[i].endValue=='' && inputs[i].initValue=='' && inputs[i].segments.length<1){
// 			//console.log('SPLICED: ', JSON.stringify(inputs));
// 			inputs.splice(i,1);
// 		}
// 	}
// 	if( inputs.length<1 ){
// 		//chrome.storage.local.remove(key);
// 		//delete logs[key];
// 		//console.log(aLog);
// 		return null;
// 	}

// 	return aLog;
// }


// var zzz = {
// 	'z':{
// 		a:[
// 			'adslfk',
// 			'adsfa'
// 		]
// 	},
// 	'y':{
// 		b:[
// 			'bdjk'
// 		]
// 	},
// 	// 'x':{
// 	// 	'c':[]
// 	// }
// };
// check(zzz, ['z','b'], [] );
// //zzz.x.c.push('win');
// console.log(zzz);

// function make( obj={}, keyPath, type ){
// 	var lastKeyIndex = keyPath.length-1;
// 	for (var i = 0; i < lastKeyIndex; ++ i) {
// 		var key = keyPath[i];
// 		if (!(key in obj))
// 			obj[key] = {}
// 		obj = obj[key];
// 	}
// 	if( !obj[keyPath[lastKeyIndex]] )
// 		obj[keyPath[lastKeyIndex]] = type;
// 	return obj[keyPath[lastKeyIndex]];
// }


// function assign( obj, keyPath, value ){
// 	var lastKeyIndex = keyPath.length-1;
// 	for (var i = 0; i < lastKeyIndex; ++ i) {
// 		var key = keyPath[i];
// 		if (!(key in obj))
// 			obj[key] = {}
// 		obj = obj[key];
// 	}
// 	obj[keyPath[lastKeyIndex]] = value;
// }

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.tabRE = tabRE;
exports.iconRE = iconRE;
exports.logPageRE = logPageRE;
exports.passRE = passRE;


/*tab switching*/
function tabRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'logs';
	var action = arguments[1];

	if (action.type === 'TAB') {
		if (action.val && action.val !== state) {
			state = action.val;
			chrome.storage.local.set({ activeTab: state });
		}
	}
	return state;
}

/*icon behavior*/
function iconRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	var action = arguments[1];

	if (action.type === 'iconOpenInit') {
		state = Boolean(action.val);
	}
	if (action.type === 'iconOpenChange') {
		state = Boolean(action.val);
		chrome.storage.local.set({ iconOpen: state });
	}
	return state;
}

/*log page settings*/
function logPageRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		viewType: 'time',
		confirmDelete: true,
		mTime: true,
		openedSite: null
	};
	var action = arguments[1];

	if (action.type === 'logPageSettingsInit') {
		state = Object.assign(state, action.val);
	}
	if (action.type === 'logPageSettingsTime') {
		state = _extends({}, state, { viewType: 'time' });
		chrome.storage.local.set({ logPageSettings: state });
	}
	if (action.type === 'logPageSettingsSite') {
		state = _extends({}, state, { viewType: 'site' });
		chrome.storage.local.set({ logPageSettings: state });
	}
	if (action.type === 'logPageSettingsmTime') {
		state = _extends({}, state, { mTime: Boolean(action.val) });
		chrome.storage.local.set({ logPageSettings: state });
	}

	if (action.type === 'logPageSettingsOpenedSite') {
		state = _extends({}, state, { openedSite: action.val });
		chrome.storage.local.set({ logPageSettings: state });
	}

	if (action.type === 'logPageSettingsConfirmDelete') {
		state = _extends({}, state, { confirmDelete: Boolean(action.val) });
		chrome.storage.local.set({ logPageSettings: state });
	}
	return state;
}

/*password stuff*/
function passRE() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		val: null,
		fails: [],
		selfDestructAfter: -1
	};
	var action = arguments[1];

	if (action.type === 'passInit') {
		state = Object.assign(state, action.val);
	}
	return state;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcmNcXG9wdGlvbnNcXHNjcmlwdHNcXGFscGhhLmpzeCIsImFyY1xcb3B0aW9uc1xcc2NyaXB0c1xcanN4XFxsb2FkSWNvbi5qc3giLCJhcmNcXG9wdGlvbnNcXHNjcmlwdHNcXGpzeFxccGFnZXNcXGxvZ0xpc3RzLmpzeCIsImFyY1xcb3B0aW9uc1xcc2NyaXB0c1xcanN4XFxwYWdlc1xccGFnZUxvZ3MuanN4IiwiYXJjXFxvcHRpb25zXFxzY3JpcHRzXFxqc3hcXHBhZ2VzXFxwYWdlT3RoZXJzLmpzeCIsImFyY1xcb3B0aW9uc1xcc2NyaXB0c1xcanN4XFxwYWdlc1xccGFnZVNldHRpbmdzLmpzeCIsImFyY1xcb3B0aW9uc1xcc2NyaXB0c1xcanN4XFxzaWRlYmFyLmpzeCIsImFyY1xcb3B0aW9uc1xcc2NyaXB0c1xccmVkdWNlcnNcXGxvZ0RhdGEuanMiLCJhcmNcXG9wdGlvbnNcXHNjcmlwdHNcXHJlZHVjZXJzXFxzZXR0aW5ncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNVQTs7O0FBR0E7OztBQVpBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7QUFLQTs7QUFHQTs7OztBQXlIQTs7OztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBOUhBO0FBQ0EsSUFBTSxXQUFXLFNBQVgsUUFBVyxHQUFrQjtBQUFBLEtBQWpCLEtBQWlCLHVFQUFYLENBQVc7QUFBQSxLQUFULE1BQVM7O0FBQ2xDLEtBQUksT0FBTyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzdCLFVBQVEsT0FBTyxHQUFmO0FBQ0E7O0FBRUQsc0JBQVksS0FBWjtBQUNBLFFBQU8sS0FBUDtBQUNBLENBUEQ7QUFRQSxJQUFNLFlBQVksNEJBQWdCO0FBQ2pDLDJCQURpQztBQUVqQywyQkFGaUM7O0FBSWpDLDJCQUppQzs7QUFNakMscUNBTmlDOztBQVFqQyx1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LFNBQVMsTUFBVCxHQUlFO0FBQUEsS0FKYyxLQUlkLHVFQUpvQjtBQUM1QixPQUFJLElBRHdCO0FBRTVCLFNBQU0sRUFGc0I7QUFHNUIscUJBQWtCLENBQUM7QUFIUyxFQUlwQjtBQUFBLEtBQVAsTUFBTzs7QUFDUixLQUFJLE9BQU8sSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUMvQixVQUFRLE9BQU8sTUFBUCxDQUFjLEtBQWQsRUFBb0IsT0FBTyxHQUEzQixDQUFSO0FBQ0E7QUFDRCxRQUFPLEtBQVA7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5cclxuXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCB7IFByb3ZpZGVyLGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuXHJcblxyXG5cclxuLypzZXR0aW5ncyByZWR1Y2VycyovXHJcbmltcG9ydCB7dGFiUkUsaWNvblJFLGxvZ1BhZ2VSRSxwYXNzUkV9IGZyb20gXCIuL3JlZHVjZXJzL3NldHRpbmdzLmpzXCJcclxuXHJcbi8qbG9nRGF0YSBTdHVmZiovXHJcbmltcG9ydCBsb2dEYXRhUkUgZnJvbSBcIi4vcmVkdWNlcnMvbG9nRGF0YS5qc1wiXHJcblxyXG4vKmRhdGEgbG9hZGVkKi9cclxuY29uc3QgbG9hZGVkUkUgPSAoc3RhdGU9MCxhY3Rpb24pPT57XHJcblx0aWYoIGFjdGlvbi50eXBlID09PSAnTE9BREVEJyApe1xyXG5cdFx0c3RhdGUgPSBhY3Rpb24udmFsO1xyXG5cdH1cclxuXHJcblx0c3RhdGUgPSB7Li4uc3RhdGUgfTtcclxuXHRyZXR1cm4gc3RhdGU7XHJcbn1cclxuY29uc3QgZWxDb21iaW5lID0gY29tYmluZVJlZHVjZXJzKHtcclxuXHRsb2dEYXRhOmxvZ0RhdGFSRSxcclxuXHRpY29uT3BlbjppY29uUkUsXHJcblxyXG5cdGFjdGl2ZVRhYjp0YWJSRSxcclxuXHRcclxuXHRsb2dQYWdlU2V0dGluZ3M6bG9nUGFnZVJFLFxyXG5cclxuXHRwYXNzOnBhc3NSRSxcclxuXHJcblx0bG9hZGVkOmxvYWRlZFJFLFxyXG59KTtcclxuXHJcbnZhciB6U3RvcmUgPSBjcmVhdGVTdG9yZShlbENvbWJpbmUpO1xyXG4vLyB6U3RvcmUuc3Vic2NyaWJlKCgpPT57XHJcbi8vIFx0Y29uc29sZS5sb2coelN0b3JlLmdldFN0YXRlKCkpO1xyXG4vLyB9KTtcclxuXHJcblxyXG4vLyBsb2FkIHN0b3JhZ2UgZGF0YVxyXG5jaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQobnVsbCxmdW5jdGlvbihyZXMpe1xyXG5cdGNvbnNvbGUubG9nKCdTdG9yYWdlOicscmVzKTtcclxuXHJcblx0LyppbmRpdmlkdWFsIHNldHRpbmdzKi9cclxuXHQvLyBpZiggcmVzLmhhc093blByb3BlcnR5KCdwYXNzJykgKXtcclxuXHQvLyBcdHpTdG9yZS5kaXNwYXRjaCh7dHlwZToncGFzc0luaXQnLHZhbDpyZXMucGFzc30pO1xyXG5cdC8vIH1cclxuXHRpZiggcmVzLmhhc093blByb3BlcnR5KCdhY3RpdmVUYWInKSApe1xyXG5cdFx0elN0b3JlLmRpc3BhdGNoKHt0eXBlOidUQUInLHZhbDpyZXMuYWN0aXZlVGFifSk7XHJcblx0fVxyXG5cdGlmKCByZXMuaGFzT3duUHJvcGVydHkoJ2ljb25PcGVuJykgKXtcclxuXHRcdHpTdG9yZS5kaXNwYXRjaCh7dHlwZTonaWNvbk9wZW5Jbml0Jyx2YWw6cmVzLmljb25PcGVufSk7XHJcblx0fVxyXG5cdGlmKCByZXMuaGFzT3duUHJvcGVydHkoJ2xvZ1BhZ2VTZXR0aW5ncycpICl7XHJcblx0XHR6U3RvcmUuZGlzcGF0Y2goe3R5cGU6J2xvZ1BhZ2VTZXR0aW5nc0luaXQnLHZhbDpyZXMubG9nUGFnZVNldHRpbmdzfSk7XHJcblx0fVxyXG5cclxuXHR6U3RvcmUuZGlzcGF0Y2goe3R5cGU6J0xPQURFRCcsdmFsOjF9KTtcclxuXHJcblx0Ly9tYWtlIGxvZyBkYXRhIG9ialxyXG5cdHRyeXtcclxuXHRcdHpTdG9yZS5kaXNwYXRjaCh7dHlwZTonTG9nRGF0YUZpbHRlckNocm9tZScsdmFsOnJlc30pO1xyXG5cdH1cclxuXHRjYXRjaChlKXtcclxuXHRcdGNvbnNvbGUubG9nKCdFcnJvciBwcm9jZXNzaW5nIGxvZyBkYXRhOicsZSk7XHJcblx0fVxyXG5cdC8vc2hvdyBnb29kc1xyXG5cdHpTdG9yZS5kaXNwYXRjaCh7dHlwZTonTE9BREVEJyx2YWw6Mn0pO1xyXG5cdFxyXG5cdC8vIHNldFRpbWVvdXQoKCk9PntcclxuXHJcblxyXG5cdC8vIFx0XHRcdC8vIHNldFRpbWVvdXQoKCk9PntcclxuXHQvLyBcdFx0XHQvLyBcdHZhciBzTG9ncyA9IHJlcXVpcmUoJy4vcy5qc29uJyk7XHJcblx0Ly8gXHRcdFx0Ly8gXHRmb3IgKHZhciBpID0gMDsgaSA8IHNMb2dzLmxlbmd0aDsgaSsrKSB7XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdHZhciBrZXkgPSBzTG9nc1tpXS50aW1lc3RhbXAucmVwbGFjZSgnIEAgJywnVCcpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRrZXkgPSBuZXcgRGF0ZShrZXkpLmdldFRpbWUoKTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0dmFyIG5Mb2cgPSB7fTtcclxuXHJcblx0Ly8gXHRcdFx0Ly8gXHRcdHZhciBvbGRVcmwgPSBzTG9nc1tpXS51cmw7XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdG5Mb2cudXJsPXtcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHRwcm90bzonJyxcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHR3d3c6JycsXHJcblx0Ly8gXHRcdFx0Ly8gXHRcdFx0ZG9tYWluOicnLFxyXG5cdC8vIFx0XHRcdC8vIFx0XHRcdHRsZDonJyxcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHRwYXRoOicnLFxyXG5cdC8vIFx0XHRcdC8vIFx0XHRcdGZyYWc6JycsXHJcblx0Ly8gXHRcdFx0Ly8gXHRcdH1cclxuXHQvLyBcdFx0XHQvLyBcdFx0bkxvZy51cmwucHJvdG8gPSBvbGRVcmwuc3Vic3RyaW5nKDAsb2xkVXJsLmluZGV4T2YoJzovLycpKzEpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRvbGRVcmwgPSBvbGRVcmwucmVwbGFjZShuTG9nLnVybC5wcm90bysnLy8nLCcnKTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0bkxvZy51cmwuZG9tYWluID0gb2xkVXJsLnN1YnN0cmluZygwLG9sZFVybC5pbmRleE9mKCcvJykpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRvbGRVcmwgPSBvbGRVcmwucmVwbGFjZShuTG9nLnVybC5kb21haW4sJycpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRuTG9nLnVybC5wYXRoID0gb2xkVXJsO1xyXG5cclxuXHQvLyBcdFx0XHQvLyBcdFx0dmFyIGRvbWFpbiA9IG5Mb2cudXJsLmRvbWFpbjtcclxuXHQvLyBcdFx0XHQvLyBcdFx0aWYoIGRvbWFpbi5tYXRjaCgvXncoPzp3d3x3dz9bMC05XXsxLDN9KVxcd3swLDV9XFwuLykgKXtcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHRuTG9nLnVybC53d3cgPSBkb21haW4uc3Vic3RyaW5nKDAsZG9tYWluLmluZGV4T2YoJy4nKSsxKTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHRuTG9nLnVybC5kb21haW4gPSBkb21haW4uc3Vic3RyaW5nKGRvbWFpbi5pbmRleE9mKCcuJykrMSk7XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdH1cclxuXHQvLyBcdFx0XHQvLyBcdFx0dmFyIGhhc0RvdCA9IGRvbWFpbi5sYXN0SW5kZXhPZignLicpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRpZiggfmhhc0RvdCApe1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRcdG5Mb2cudXJsLmRvbWFpbiA9IGRvbWFpbi5zbGljZSgwLGhhc0RvdCk7XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdFx0bkxvZy51cmwudGxkID0gZG9tYWluLnN1YnN0cihoYXNEb3QpO1xyXG5cdC8vIFx0XHRcdC8vIFx0XHR9XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdGNvbnNvbGUubG9nKG5Mb2cudXJsKTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0bkxvZy5pbnB1dHMgPSBbXTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0Zm9yKCB2YXIgaXB0IG9mIHNMb2dzW2ldLmlucHV0cyApe1xyXG5cdC8vIFx0XHRcdC8vIFx0XHRcdHZhciBpbnB1dFNldCA9IHtcclxuXHQvLyBcdFx0XHQvLyBcdFx0XHRcdGVuZFZhbHVlOiBpcHQsXHJcblx0Ly8gXHRcdFx0Ly8gXHRcdFx0XHRpbml0dmFsdWU6ICcnLFxyXG5cdC8vIFx0XHRcdC8vIFx0XHRcdFx0c2VnbWVudHM6W11cclxuXHQvLyBcdFx0XHQvLyBcdFx0XHR9XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdFx0bkxvZy5pbnB1dHMucHVzaChpbnB1dFNldCk7XHJcblx0Ly8gXHRcdFx0Ly8gXHRcdH1cclxuXHQvLyBcdFx0XHQvLyBcdFx0dmFyIHdyYXBwZXIgPSB7fTtcclxuXHQvLyBcdFx0XHQvLyBcdFx0d3JhcHBlcltrZXldID0gbkxvZztcclxuXHQvLyBcdFx0XHQvLyBcdFx0Ly9jaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQod3JhcHBlcik7XHJcblx0Ly8gXHRcdFx0Ly8gXHR9XHJcblx0Ly8gXHRcdFx0Ly8gfSw5KTtcclxuXHJcblx0Ly8gfSw5KTtcclxuXHRcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQgRG90U3BpbiBmcm9tIFwiLi9qc3gvbG9hZEljb24uanN4XCI7XHJcbmltcG9ydCBTaWRlYmFyIGZyb20gXCIuL2pzeC9zaWRlYmFyLmpzeFwiO1xyXG5cclxuLy9pbXBvcnQgUGFzc3dvcmQgZnJvbSBcIi4vanN4L3Bhc3MuanN4XCI7XHJcblxyXG5pbXBvcnQgTG9ncyBmcm9tIFwiLi9qc3gvcGFnZXMvcGFnZUxvZ3MuanN4XCI7XHJcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9qc3gvcGFnZXMvcGFnZVNldHRpbmdzLmpzeFwiO1xyXG5pbXBvcnQge0RvbmF0ZSwgQWJvdXR9IGZyb20gXCIuL2pzeC9wYWdlcy9wYWdlT3RoZXJzLmpzeFwiO1xyXG5cclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdGxvYWRlZDpzdG9yZS5sb2FkZWQsXHJcblx0XHRhVGFiOnN0b3JlLmFjdGl2ZVRhYixcclxuXHR9O1xyXG59KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdHJlbmRlcigpe1xyXG5cclxuXHRcdHZhciBhVGFiID0gdGhpcy5wcm9wcy5hVGFifHwnbG9ncyc7XHJcblx0XHR2YXIgaXNBY3RpdmUgPSB7fTtcclxuXHRcdGlzQWN0aXZlW2FUYWJdID0gJ2FjdGl2ZSc7XHJcblxyXG5cdFx0aWYoIHRoaXMucHJvcHMubG9hZGVkPDEgKXtcclxuXHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdDxEb3RTcGluIHNpemU9XCI1ZW1cIiByaW5nQ29sb3I9XCJyZ2JhKDAsMTIzLDE0NCwwLjkpXCIvPlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmKCB0cnVlICl7XHJcblx0XHQvLyBcdHJldHVybihcclxuXHRcdC8vIFx0XHQ8UGFzc3dvcmQvPlxyXG5cdFx0Ly8gXHQpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD0ncGFnZU1haW4nPlxyXG5cdFx0XHRcdDxTaWRlYmFyLz5cclxuXHRcdFx0XHQ8ZGl2IGlkPSdjb250ZW50Jz5cclxuXHRcdFx0XHRcdDxMb2dzIGNsYXNzTmFtZT17aXNBY3RpdmUubG9nc30vPlxyXG5cdFx0XHRcdFx0PFNldHRpbmdzIGNsYXNzTmFtZT17aXNBY3RpdmUuc2V0dGluZ3N9Lz5cclxuXHRcdFx0XHRcdDxEb25hdGUgY2xhc3NOYW1lPXtpc0FjdGl2ZS5kb25hdGV9Lz5cclxuXHRcdFx0XHRcdDxBYm91dCBjbGFzc05hbWU9e2lzQWN0aXZlLmFib3V0fS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuXHQ8UHJvdmlkZXIgc3RvcmU9e3pTdG9yZX0+XHJcblx0XHQ8QXBwLz5cclxuICA8L1Byb3ZpZGVyPixcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW1icmVsbGEnKVxyXG4pO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IChjdik9PntcclxuXHR2YXIgaW5MaW5lID0ge1xyXG5cdFx0ekluZGV4OmN2LmJhc2VJbmRleCswLFxyXG5cdFx0cG9zaXRpb246XCJyZWxhdGl2ZVwiLFxyXG5cdFx0d2lkdGg6Y3Yuc2l6ZSxcclxuXHRcdGhlaWdodDpjdi5zaXplXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIGluTGluZTtcclxufTtcclxuXHJcbmNvbnN0IGJhY2tncm91bmQgPSAoY3YpPT57XHJcblx0dmFyIHNpemUgPSBjdi5zaXplLnJlcGxhY2UoL1teMC05Ll0vZywnJyk7XHJcblx0c2l6ZSA9IHNpemUgLyA1O1xyXG5cdHNpemUgKz0gY3Yuc2l6ZS5yZXBsYWNlKC9bMC05Ll0vZywnJyk7XHJcblx0dmFyIGluTGluZSA9IHtcclxuXHRcdHpJbmRleDpjdi5iYXNlSW5kZXgrMSxcclxuXHRcdHBvc2l0aW9uOlwicmVsYXRpdmVcIixcclxuXHRcdG92ZXJmbG93Oid2aXNpYmxlJyxcclxuXHRcdHdpZHRoOlwiMTAwJVwiLFxyXG5cdFx0aGVpZ2h0OlwiMTAwJVwiLFxyXG5cdFx0Ym9yZGVyUmFkaXVzOlwiMTAwJVwiLFxyXG5cdFx0Ym9yZGVyU3R5bGU6XCJzb2xpZFwiLFxyXG5cdFx0Ym9yZGVyV2lkdGg6c2l6ZSxcclxuXHRcdGJvcmRlckNvbG9yOmN2LnJpbmdDb2xvcixcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gaW5MaW5lO1xyXG59O1xyXG5cclxuY29uc3QgYmFsbENvbiA9IChjdik9PntcclxuXHR2YXIgaW5MaW5lID0ge1xyXG5cdFx0ekluZGV4OmN2LmJhc2VJbmRleCsyLFxyXG5cdFx0cG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG5cdFx0d2lkdGg6XCIxMDAlXCIsXHJcblx0XHRoZWlnaHQ6XCIxMDAlXCIsXHJcblx0XHRhbmltYXRpb25OYW1lOiBjdi5iYWxsQW5pbWF0aW9uLFxyXG5cdFx0YW5pbWF0aW9uRHVyYXRpb246IGN2LnRpbWUsXHJcblx0XHRhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2xpbmVhcicsXHJcblx0XHRhbmltYXRpb25EZWxheTogJzAuMHMnLFxyXG5cdFx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdpbmZpbml0ZScsXHJcblx0XHRhbmltYXRpb25EaXJlY3Rpb246ICdub3JtYWwnLFxyXG5cdFx0YW5pbWF0aW9uRmlsbE1vZGU6ICdmb3J3YXJkcydcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gaW5MaW5lO1xyXG59O1xyXG5jb25zdCBiYWxsID0gKGN2KT0+e1xyXG5cdHZhciBzTnVtYiA9IGN2LnNpemUucmVwbGFjZSgvW14wLTkuXS9nLCcnKTtcclxuXHR2YXIgc1VuaXQgPSBjdi5zaXplLnJlcGxhY2UoL1swLTkuXS9nLCcnKTtcclxuXHJcblx0dmFyIHNpemUgPSAoc051bWIvNikrc1VuaXQ7XHJcblx0dmFyIHBhZCA9ICggKHNOdW1iLzUpIC0gKHNOdW1iLzYpICkgLyAyO1xyXG5cdHZhciBvdXRsaW5lID0gcGFkLzI7XHJcblx0cGFkICs9IHNVbml0O1xyXG5cdHZhciBpbkxpbmUgPSB7XHJcblx0XHR6SW5kZXg6IGN2LmJhc2VJbmRleCszLFxyXG5cdFx0d2lkdGg6IHNpemUsXHJcblx0XHRoZWlnaHQ6IHNpemUsXHJcblx0XHRib3JkZXJSYWRpdXM6XCIxMDAlXCIsXHJcblx0XHRtYXJnaW46IHBhZCxcclxuXHRcdGJhY2tncm91bmQ6IGN2LmJhbGxDb2xvcixcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gaW5MaW5lO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG90U3BpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHApIHtcclxuXHRcdHN1cGVyKHApO1xyXG5cclxuXHRcdGxldCBhbmltYXRpb25OYW1lID0gYGFuaW1hdGlvbiR7TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjk5KX1gO1xyXG5cdFx0bGV0IGtleWZyYW1lcyA9XHJcblx0XHRgQGtleWZyYW1lcyAke2FuaW1hdGlvbk5hbWV9IHtcclxuXHRcdFx0MTAwJSB7XHJcblx0XHRcdFx0dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO1xyXG5cdFx0XHR9XHJcblx0XHR9YDtcclxuXHRcdGxldCBzdHlsZVNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbMF07XHJcblx0XHRzdHlsZVNoZWV0Lmluc2VydFJ1bGUoa2V5ZnJhbWVzLCBzdHlsZVNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XHJcblxyXG5cclxuXHRcdHZhciBjb250cm9sVmFsdWVzID0ge1xyXG5cdFx0XHRiYWxsQW5pbWF0aW9uOiBhbmltYXRpb25OYW1lLFxyXG5cdFx0XHRiYXNlSW5kZXg6IHAuaW5kZXggfHwgOTksXHJcblx0XHRcdHNpemU6IHAuc2l6ZSB8fCBcIjEwZW1cIixcclxuXHRcdFx0dGltZTogcC50aW1lIHx8IFwiMC45c1wiLFxyXG5cdFx0XHRyaW5nQ29sb3I6IHAucmluZ0NvbG9yIHx8IFwicmdiYSgwLDEyMyw5LDAuNilcIixcclxuXHRcdFx0YmFsbENvbG9yOiBwLmJhbGxDb2xvciB8fCBcInJnYmEoMjU1LDI1NSwyNTUsMC45NilcIixcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5zdGF0ZSA9IGNvbnRyb2xWYWx1ZXM7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBzdHlsZT17Y29udGFpbmVyKHRoaXMuc3RhdGUpfSA+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17YmFsbENvbih0aGlzLnN0YXRlKX0+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXtiYWxsKHRoaXMuc3RhdGUpfT48L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXtiYWNrZ3JvdW5kKHRoaXMuc3RhdGUpfT48L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuIiwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG5pbXBvcnQgRG90U3BpbiBmcm9tIFwiLi4vbG9hZEljb24uanN4XCI7XHJcblxyXG5cclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdGxvYWRlZDpzdG9yZS5sb2FkZWQsXHJcblx0XHRzZXR0aW5nczpzdG9yZS5sb2dQYWdlU2V0dGluZ3MsXHJcblx0XHRkYXRhOnN0b3JlLmxvZ0RhdGEsXHJcblx0fTtcclxufSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEFyZWEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHZhciBzZXR0aW5ncyA9IHRoaXMucHJvcHMuc2V0dGluZ3M7XHJcblx0XHR2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuXHJcblx0XHQvL2xvYWRpbmcgc3RhZ2VcclxuXHRcdGlmKCB0aGlzLnByb3BzLmxvYWRlZDwyIHx8ICFkYXRhICl7XHJcblx0XHRcdHJldHVybihcclxuXHRcdFx0XHQ8ZGl2IGlkPSdsaXN0QXJlYSc+XHJcblx0XHRcdFx0XHRcdDxEb3RTcGluIHNpemU9XCI0ZW1cIiByaW5nQ29sb3I9XCJyZ2JhKDAsMTIzLDE0NCwwLjkpXCIvPlxyXG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9J2xvYWRpbmdNc2cnPmxvYWRpbmcgbG9nczwvcD5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2Vycm9yIHdoaWxlIHByb2Nlc3NpbmcgZGF0YVxyXG5cdFx0aWYoIHR5cGVvZiBkYXRhIT1cIm9iamVjdFwiIHx8IGRhdGEgaW5zdGFuY2VvZiBFcnJvciApe1xyXG5cdFx0XHRyZXR1cm4oXHJcblx0XHRcdFx0PGRpdiBpZD0nbGlzdEFyZWEnPlxyXG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9J2xvYWRpbmdNc2cnPk1hbGZvcm1lZCBEYXRhOjwvcD5cclxuXHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPSdlcnJNc2cnPntKU09OLnN0cmluZ2lmeShkYXRhLCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKSl9PC9wPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vbm8gbG9nc1xyXG5cdFx0aWYoIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aDwxICl7XHJcblx0XHRcdHJldHVybihcclxuXHRcdFx0XHQ8ZGl2IGlkPSdsaXN0QXJlYSc+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT0nbm9Mb2dzJz4tbm8gbG9ncy08L3A+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD0nbGlzdEFyZWEnPlxyXG5cdFx0XHRcdFx0e3NldHRpbmdzLnZpZXdUeXBlPT0nc2l0ZScgJiYgXHJcblx0XHRcdFx0XHRcdDxTaXRlTGlzdC8+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR7c2V0dGluZ3Mudmlld1R5cGU9PSd0aW1lJyAmJiBcclxuXHRcdFx0XHRcdDxkaXYgaWQ9J3Njcm9sbExpc3RDb24nIGNsYXNzTmFtZT0nZmxleFNjcm9sbENvbnRhaW4nPlxyXG5cdFx0XHRcdFx0XHQ8VGltZUxpc3QgbG9ncz17T2JqZWN0LmtleXMoZGF0YSl9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuQGNvbm5lY3QoKHN0b3JlKT0+e1x0cmV0dXJuIHtcclxuXHRkYXRhOnN0b3JlLmxvZ0RhdGEsXHJcblx0b3BlbmVkU2l0ZTpzdG9yZS5sb2dQYWdlU2V0dGluZ3Mub3BlbmVkU2l0ZSxcclxufX0pXHJcbmNsYXNzIFNpdGVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMub3BlbiA9IHRoaXMub3Blbi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5kZWxldGVTaXRlID0gdGhpcy5kZWxldGVTaXRlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdG9wZW4oc2l0ZSl7XHJcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOidsb2dQYWdlU2V0dGluZ3NPcGVuZWRTaXRlJyx2YWw6c2l0ZX0pO1xyXG5cdH1cclxuXHRkZWxldGVTaXRlKHNpdGVMb2dzKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6J0xvZ0RhdGFEZWxldGVTb21lJyx2YWw6c2l0ZUxvZ3N9KTtcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuXHJcblx0XHR2YXIgc2l0ZUxpc3QgPSB7fTtcclxuXHRcdE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KT0+e1xyXG5cdFx0XHR2YXIgdXJsID0gZGF0YVtrZXldLnVybDtcclxuXHRcdFx0dmFyIHNpdGUgPSB1cmwuZG9tYWluK3VybC50bGQ7XHJcblxyXG5cdFx0XHRpZiggIXNpdGVMaXN0Lmhhc093blByb3BlcnR5KHNpdGUpIClcclxuXHRcdFx0XHRzaXRlTGlzdFtzaXRlXT1bXTtcclxuXHJcblx0XHRcdHNpdGVMaXN0W3NpdGVdLnB1c2goa2V5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHNpbmdsZSBzaXRlXHJcblx0XHR2YXIgb3BlblNpdGUgPSAodGhpcy5wcm9wcy5vcGVuZWRTaXRlKTtcclxuXHRcdGlmKCBvcGVuU2l0ZSAmJiBzaXRlTGlzdFtvcGVuU2l0ZV0gKXtcclxuXHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdDxkaXYgaWQ9J3NpdGVWaWV3Q29uJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdzaXRlVG9wJz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2dvQmFjaycgdGl0bGU9XCJiYWNrIHRvIHNpdGVzIHZpZXdcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9eyhlKT0+dGhpcy5vcGVuKG51bGwpfT4mbGFycjs8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdzaXRlTmFtZSc+e29wZW5TaXRlfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGVsZXRlU2l0ZScgdGl0bGU9XCJkZWxldGUgc2l0ZSdzIGxvZ3NcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9eyhlKT0+dGhpcy5kZWxldGVTaXRlKHNpdGVMaXN0W29wZW5TaXRlXSl9Plg8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGlkPSdzY3JvbGxMaXN0Q29uJyBjbGFzc05hbWU9J2ZsZXhTY3JvbGxDb250YWluJz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2ZsZXhTY3JvbGxCb2R5IHNpdGVMaXN0Jz5cclxuXHRcdFx0XHRcdFx0XHQ8VGltZUxpc3QgbG9ncz17c2l0ZUxpc3Rbb3BlblNpdGVdfS8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vIGxpc3Qgb2Ygc2l0ZXNcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD0nc2Nyb2xsTGlzdENvbicgY2xhc3NOYW1lPSdmbGV4U2Nyb2xsQ29udGFpbic+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2ZsZXhTY3JvbGxCb2R5IHNpdGVMaXN0Jz5cclxuXHRcdFx0XHRcdHsgT2JqZWN0LmtleXMoc2l0ZUxpc3QpLnNvcnQoKS5tYXAoKHNLZXkpPT57XHJcblx0XHRcdFx0XHRcdHZhciBzaXRlTG9ncyA9IHNpdGVMaXN0W3NLZXldO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2FTaXRlJyBrZXk9e3NLZXl9ID5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2RlbGV0ZVNpdGUnIHRpdGxlPVwiZGVsZXRlIHNpdGUncyBsb2dzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoZSk9PnRoaXMuZGVsZXRlU2l0ZShzaXRlTGlzdFtzS2V5XSl9Plg8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdzaXRlTmFtZScgb25DbGljaz17KGUpPT50aGlzLm9wZW4oc0tleSl9IHRpdGxlPSdvcGVuIGxvZ3MnID5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHA+e3NLZXl9PC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj57c2l0ZUxpc3Rbc0tleV0ubGVuZ3RoKycgJ30gJnJhcnI7PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4gXHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9KX1cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vL2ltcG9ydCBWaXJ0dWFsTGlzdCBmcm9tICdyZWFjdC10aW55LXZpcnR1YWwtbGlzdCc7XHJcblx0XHQvLyByZXR1cm4oXHJcblx0XHQvLyBcdDxWaXJ0dWFsTGlzdFxyXG5cdFx0Ly8gXHRcdHdpZHRoPScxMDAlJ1xyXG5cdFx0Ly8gXHRcdGhlaWdodD0nMTAwJSdcclxuXHRcdC8vIFx0XHRpdGVtQ291bnQ9e2xvZ3MubGVuZ3RofVxyXG5cdFx0Ly8gXHRcdGl0ZW1TaXplPXs3MH1cclxuXHRcdC8vIFx0XHRvdmVyc2NhbkNvdW50PXs2MH1cclxuXHRcdC8vIFx0XHRyZW5kZXJJdGVtPXsoe2luZGV4LCBzdHlsZX0pPT5cclxuXHRcdC8vIFx0XHRcdFx0PEFMb2cga2V5PXtpbmRleH0gaWQ9e2xvZ3NbaW5kZXhdfSBsb2c9e2RhdGFbbG9nc1tpbmRleF1dfSAvPlxyXG5cdFx0Ly8gXHRcdH1cclxuXHRcdC8vIFx0Lz5cclxuXHRcdC8vICk7XHJcbnZhciBwYWdlU2l6ZSA9IDk5O1xyXG4vL3ZhciByZW5kZXJUaW1lO1xyXG5AY29ubmVjdCgoc3RvcmUpPT57IHJldHVybiB7XHJcblx0ZGF0YTpzdG9yZS5sb2dEYXRhLFxyXG59fSlcclxuY2xhc3MgVGltZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKHApe1xyXG5cdFx0c3VwZXIocCk7XHJcblx0XHR0aGlzLnN0YXRlID0ge1xyXG5cdFx0XHRwYWdlc0xvYWRlZDoxLFxyXG5cdFx0XHRzSGVpZ2h0OjAsXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5hZGRQYWdlID0gdGhpcy5hZGRQYWdlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpe1xyXG5cdFx0Ly9yZW5kZXJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHZhciBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtzSGVpZ2h0OiBub2RlLnNjcm9sbEhlaWdodCB9KTtcclxuXHR9XHJcblx0YWRkUGFnZSgpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGFnZXNMb2FkZWQ6dGhpcy5zdGF0ZS5wYWdlc0xvYWRlZCsxfSk7XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZShvbGRQLG9sZFMpe1xyXG5cdFx0dmFyIG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuXHRcdGlmKCBvbGRTLnBhZ2VzTG9hZGVkICYmIHRoaXMuc3RhdGUucGFnZXNMb2FkZWQ+b2xkUy5wYWdlc0xvYWRlZCApe1xyXG5cdFx0XHR2YXIgdCA9IG5vZGUucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblx0XHRcdG5vZGUucGFyZW50Tm9kZS5zY3JvbGxUbygwLHRoaXMuc3RhdGUuc0hlaWdodC10KTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7c0hlaWdodDogbm9kZS5zY3JvbGxIZWlnaHQgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHJcblx0XHR2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuXHRcdHZhciBsb2dzID0gdGhpcy5wcm9wcy5sb2dzO1xyXG5cdFx0aWYoICFsb2dzIHx8IGxvZ3MubGVuZ3RoPDEgKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ05vIExvZ3MgRGV0ZWN0ZWQgaW4gVGltZUxpc3Q6ICcsbG9ncyk7XHJcblx0XHRcdHJldHVybiggPHAgY2xhc3NOYW1lPSdub0xvZ3MnPi1ubyBsb2dzLTwvcD4gKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcGFnZXNMb2FkZWQgPSB0aGlzLnN0YXRlLnBhZ2VzTG9hZGVkO1xyXG5cdFx0dmFyIHRvTG9hZCA9IHBhZ2VzTG9hZGVkKnBhZ2VTaXplO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyh0b0xvYWQpO1xyXG5cclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2ZsZXhTY3JvbGxCb2R5IHRpbWVMaXN0Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbGlzdEVuZCc+bGF0ZXN0PC9kaXY+XHJcblx0XHRcdFx0eyBsb2dzLnNsaWNlKDApLnJldmVyc2UoKS5tYXAoKGtleSxpZHgpPT57XHJcblx0XHRcdFx0XHRpZiggaWR4PnRvTG9hZCApe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybihcclxuXHRcdFx0XHRcdFx0PEFMb2cga2V5PXtrZXl9IGlkPXtrZXl9IGxvZz17ZGF0YVtrZXldfSAvPlxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9KX1cclxuXHRcdFx0XHR7IGxvZ3MubGVuZ3RoPnBhZ2VzTG9hZGVkKnBhZ2VTaXplICYmXHJcblx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkUGFnZX0gY2xhc3NOYW1lPSdsb2FkTW9yZSc+bG9hZCBtb3JlPC9idXR0b24+XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdsaXN0RW5kJz5lYXJsaWVzdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdHNldHRpbmdzOnN0b3JlLmxvZ1BhZ2VTZXR0aW5ncyxcclxuXHR9O1xyXG59KVxyXG5jbGFzcyBBTG9nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuZGVsZXRlT25lID0gdGhpcy5kZWxldGVPbmUuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0ZGVsZXRlT25lKGxvZ0lEKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6J0xvZ0RhdGFEZWxldGVTb21lJyx2YWw6W2xvZ0lEXX0pO1xyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdHZhciBrZXkgPSB0aGlzLnByb3BzLmlkO1xyXG5cdFx0dmFyIGxvZyA9IHRoaXMucHJvcHMubG9nO1xyXG5cdFx0cmV0dXJuKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYUxvZyc+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0b3AnPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGVsZXRlT25lJyB0aXRsZT0nZGVsZXRlIHRoaXMgbG9nIHNldCc+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoZSk9PnRoaXMuZGVsZXRlT25lKGtleSl9Plg8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxUaW1lU3RhbXAgdGltZT17a2V5fS8+XHJcblx0XHRcdFx0XHRcdDxVUkwgdXJsPXtsb2cudXJsfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxJbnB1dFNldCBkYXRhPXtsb2cuaW5wdXRzfS8+XHJcblxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcbkBjb25uZWN0KChzdG9yZSk9PntcclxuXHRyZXR1cm4ge1xyXG5cdFx0bVRpbWU6c3RvcmUubG9nUGFnZVNldHRpbmdzLm1UaW1lLFxyXG5cdH07XHJcbn0pXHJcbmNsYXNzIFRpbWVTdGFtcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgbVRpbWUgPSAodGhpcy5wcm9wcy5tVGltZSk7XHJcblx0XHR2YXIgdGltZSA9IG1vbWVudChwYXJzZUludCh0aGlzLnByb3BzLnRpbWUpKTtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J3RpbWVzdGFtcCc+XHJcblx0XHRcdFx0PHAgY2xhc3NOYW1lPSdkYXRlJz57IHRpbWUuZm9ybWF0KCdZWVlZLU1NLUREJykgfTwvcD5cclxuXHRcdFx0XHQ8cCBjbGFzc05hbWU9J3RpbWUnIHRpdGxlPXt0aW1lLmZvcm1hdCgnSEg6bW06c3MnKX0gPlxyXG5cdFx0XHRcdFx0eyAobVRpbWUpP1xyXG5cdFx0XHRcdFx0XHR0aW1lLmZvcm1hdCgnSEg6bW0nKVxyXG5cdFx0XHRcdFx0XHQ6XHJcblx0XHRcdFx0XHRcdHRpbWUuZm9ybWF0KCdoaDptbSBhJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L3A+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuQGNvbm5lY3QoKHN0b3JlKT0+e1xyXG5cdHJldHVybiB7XHJcblx0XHR2aWV3VHlwZTpzdG9yZS5sb2dQYWdlU2V0dGluZ3Mudmlld1R5cGUsXHJcblx0fTtcclxufSlcclxuY2xhc3MgVVJMIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHZhciB1ID0gdGhpcy5wcm9wcy51cmw7XHJcblx0XHR2YXIgdmlld1R5cGUgPSB0aGlzLnByb3BzLnZpZXdUeXBlO1xyXG5cdFx0cmV0dXJuKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J3VybENvbid9PlxyXG5cdFx0XHRcdDxhIGhyZWY9e3UucHJvdG8rJy8vJyt1Lnd3dyt1LmRvbWFpbit1LnRsZCt1LnBhdGgrdS5mcmFnfSB0YXJnZXQ9J19ibGFuaycgdGl0bGU9e3UuZG9tYWluK3UudGxkK3UucGF0aCt1LmZyYWd9ID5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nZG9tYWluJz57dS5kb21haW59PC9zcGFuPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSd0bGQnPnt1LnRsZH08L3NwYW4+XHJcblx0XHRcdFx0XHR7dmlld1R5cGU9PSdzaXRlJyYmXHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3BhdGgnPnt1LnBhdGh9PC9zcGFuPlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBJbnB1dFNldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2lucHV0U2V0Jz5cclxuXHRcdFx0XHR7IChkYXRhKS5tYXAoKGlucHV0LGlkeCk9PlxyXG5cdFx0XHRcdFx0PFZhbHVlcyBrZXk9e2lkeH0gZGF0YT17aW5wdXR9IC8+XHJcblx0XHRcdFx0KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG4vLyBAY29ubmVjdCgoc3RvcmUpPT57XHJcbi8vIFx0cmV0dXJuIHt9O1xyXG4vLyB9KVxyXG5jbGFzcyBWYWx1ZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0dmFyIGRhdGEgPSB0aGlzLnByb3BzLmRhdGE7XHJcblxyXG5cdFx0dmFyIHZhbHVlcz1bXTtcclxuXHRcdFxyXG5cdFx0aWYoIGRhdGEuZW5kVmFsdWUgJiYgZGF0YS5lbmRWYWx1ZSE9PScnICl7XHJcblx0XHRcdHZhbHVlcy5wdXNoKGRhdGEuZW5kVmFsdWUpO1xyXG5cdFx0fVxyXG5cdFx0aWYoIGRhdGEuaW5pdFZhbHVlICYmIGRhdGEuaW5pdFZhbHVlIT09JycgKXtcclxuXHRcdFx0dmFsdWVzLnB1c2goZGF0YS5pbml0VmFsdWUpO1xyXG5cdFx0fVxyXG5cdFx0ZGF0YS5zZWdtZW50cy5mb3JFYWNoKChzZWcpPT57XHJcblx0XHRcdHZhbHVlcy5wdXNoKHNlZyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBjaGVjayBmb3IgZW1wdHkgaW5wdXQgc2V0c1xyXG5cdFx0aWYoIHZhbHVlcy5sZW5ndGg8MSApe1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCdFbXB0eSBEYXRhOiAnLGRhdGEpO1xyXG5cdFx0XHQvL3RoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6J0xvZ0RhdGFDbGVhckVtcHR5Jyx2YWw6MX0pO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndmFsdWVTZXQnID5cclxuXHRcdFx0XHR7IHZhbHVlcy5tYXAoKHYsaWR4KT0+XHJcblx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9J2FWYWx1ZScga2V5PXtpZHgrdn0+e3Z9PC9wPlxyXG5cdFx0XHRcdCl9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIiwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG5pbXBvcnQgRmlsZVNhdmVyIGZyb20gJ2ZpbGUtc2F2ZXInO1xyXG5pbXBvcnQgRG90U3BpbiBmcm9tIFwiLi4vbG9hZEljb24uanN4XCI7XHJcblxyXG5pbXBvcnQgTGlzdEFyZWEgZnJvbSBcIi4vbG9nTGlzdHMuanN4XCI7XHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdGxvYWRlZDpzdG9yZS5sb2FkZWQsXHJcblx0XHRzZXR0aW5nczpzdG9yZS5sb2dQYWdlU2V0dGluZ3MsXHJcblx0fTtcclxufSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nc1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0ZGlhbG9nOmZhbHNlXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5kdlRpbWUgPSB0aGlzLmR2VGltZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5kdlNpdGUgPSB0aGlzLmR2U2l0ZS5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5tVGltZSA9IHRoaXMubVRpbWUuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY29uZmlybURlbGV0ZSA9IHRoaXMuY29uZmlybURlbGV0ZS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMub3BlbkRpYWxvZyA9IHRoaXMub3BlbkRpYWxvZy5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jbG9zZURpYWxvZyA9IHRoaXMuY2xvc2VEaWFsb2cuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0ZHZUaW1lKGUpe1xyXG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTonbG9nUGFnZVNldHRpbmdzVGltZScsdmFsOnRydWV9KTtcclxuXHR9XHJcblx0ZHZTaXRlKGUpe1xyXG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTonbG9nUGFnZVNldHRpbmdzU2l0ZScsdmFsOnRydWV9KTtcclxuXHR9XHJcblx0Y29uZmlybURlbGV0ZSgpe1xyXG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTonbG9nUGFnZVNldHRpbmdzQ29uZmlybURlbGV0ZScsdmFsOiF0aGlzLnByb3BzLnNldHRpbmdzLmNvbmZpcm1EZWxldGV9KTtcclxuXHR9XHJcblx0bVRpbWUodCl7XHJcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOidsb2dQYWdlU2V0dGluZ3NtVGltZScsdmFsOnR9KTtcclxuXHR9XHJcblxyXG5cclxuXHRvcGVuRGlhbG9nKGQpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7ZGlhbG9nOmR9KTtcclxuXHR9XHJcblx0Y2xvc2VEaWFsb2coKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2RpYWxvZzpmYWxzZX0pO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgc2V0dGluZ3MgPSB0aGlzLnByb3BzLnNldHRpbmdzO1xyXG5cdFx0dmFyIGFjdGl2ZSA9IHt9O1xyXG5cdFx0YWN0aXZlW3NldHRpbmdzLnZpZXdUeXBlXSA9ICdzZWxlY3RlZCc7XHJcblx0XHRpZiggc2V0dGluZ3MubVRpbWUgKVxyXG5cdFx0XHRhY3RpdmUubVRpbWVPbiA9ICdzZWxlY3RlZCc7XHJcblx0XHRlbHNlXHJcblx0XHRcdGFjdGl2ZS5tVGltZU9mZiA9ICdzZWxlY3RlZCc7XHJcblxyXG5cclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD0nbG9ncycgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlTWVhdFwiPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdDxMaXN0QXJlYS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPSdsb2dDb250cm9scyc+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb250cm9sU2V0IGRpc3BsYXlWaWV3Jz5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT0nc2V0VGl0bGUnPkRpc3BsYXkgVmlldzwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnc2VsZWN0QnV0dCAnKyhhY3RpdmUudGltZXx8JycpfSBvbkNsaWNrPXsoZSk9PnRoaXMuZHZUaW1lKCl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbGlnaHRCYXInPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD50aW1lPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J3NlbGVjdEJ1dHQgJysoYWN0aXZlLnNpdGV8fCcnKX0gb25DbGljaz17KGUpPT50aGlzLmR2U2l0ZSgpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2xpZ2h0QmFyJz48L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHA+c2l0ZTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29udHJvbFNldCBtVGltZSc+XHJcblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9J3NldFRpdGxlJz5UaW1lIEZvcm1hdDwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnc2VsZWN0QnV0dCAnKyhhY3RpdmUubVRpbWVPbnx8JycpfSBvbkNsaWNrPXsoZSk9PnRoaXMubVRpbWUodHJ1ZSl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbGlnaHRCYXInPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD4yNCBob3VyPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17J3NlbGVjdEJ1dHQgJysoYWN0aXZlLm1UaW1lT2ZmfHwnJyl9IG9uQ2xpY2s9eyhlKT0+dGhpcy5tVGltZShmYWxzZSl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbGlnaHRCYXInPjwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD5hbSB8IHBtPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29udHJvbFNldCBleHBvcnQnPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2xCdXR0JyBvbkNsaWNrPXsoZSk9PnRoaXMub3BlbkRpYWxvZygnZXhwb3J0Jyl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9J2J1dHRUaXRsZSc+ZXhwb3J0PC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb250cm9sU2V0IGRlbGV0ZUFsbCc+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbEJ1dHQnIG9uQ2xpY2s9eyhlKT0+dGhpcy5vcGVuRGlhbG9nKCdkZWxldGVBbGwnKX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT0nYnV0dFRpdGxlJz5kZWxldGUgYWxsPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdHsgdGhpcy5zdGF0ZS5kaWFsb2c9PSdkZWxldGVBbGwnICYmIFxyXG5cdFx0XHRcdDxEZWxldGVBbGxTY3JlZW4gY2xvc2U9eygpPT50aGlzLmNsb3NlRGlhbG9nKCl9IC8+IFxyXG5cdFx0XHR9XHJcblx0XHRcdHsgdGhpcy5zdGF0ZS5kaWFsb2c9PSdleHBvcnQnICYmIFxyXG5cdFx0XHRcdDxFeHBvcnRMb2dzIGNsb3NlPXsoKT0+dGhpcy5jbG9zZURpYWxvZygpfSAvPiBcclxuXHRcdFx0fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblx0XHRcdFx0XHRcdFx0Ly8gPGRpdiBjbGFzc05hbWU9J2NvbnRyb2xTZXQgY29uZmlybURlbGV0ZXMnPlxyXG5cdFx0XHRcdFx0XHRcdC8vIFx0PGRpdiBjbGFzc05hbWU9J2xCdXR0JyBvbkNsaWNrPXt0aGlzLmNvbmZpcm1EZWxldGV9PlxyXG5cdFx0XHRcdFx0XHRcdC8vIFx0XHQ8cCBjbGFzc05hbWU9J2J1dHRUaXRsZSc+Y29uZmlybSBkZWxldGU8L3A+XHJcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzZXR0aW5ncy5jb25maXJtRGVsZXRlfSByZWFkT25seS8+XHJcblx0XHRcdFx0XHRcdFx0Ly8gXHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQvLyA8L2Rpdj5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHt9O1xyXG59KVxyXG5jbGFzcyBEZWxldGVBbGxTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5kZWxldGVBbGwgPSB0aGlzLmRlbGV0ZUFsbC5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRkZWxldGVBbGwoKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6J0xvZ0RhdGFEZWxldGVBbGwnLHZhbDp0cnVlfSk7XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nb3ZlcmxheScgb25DbGljaz17KGUpPT50aGlzLnByb3BzLmNsb3NlKCl9ID5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYm94Jz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdtZWF0Jz5cclxuXHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPSdtc2cnPmNvbmZpcm0gZGVsZXRlIGFsbCBsb2dzIGNvbW1hbmQ8L3A+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdidXR0U2V0Jz5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9eyhlKT0+dGhpcy5kZWxldGVBbGwoKX0gPlllczwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17KGUpPT50aGlzLnByb3BzLmNsb3NlKCl9ID5ObzwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdGxvZ0RhdGE6c3RvcmUubG9nRGF0YSxcclxuXHRcdHNldHRpbmdzOnN0b3JlLmxvZ1BhZ2VTZXR0aW5ncyxcclxuXHR9O1xyXG59KVxyXG5jbGFzcyBFeHBvcnRMb2dzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvcihwKXtcclxuXHRcdHN1cGVyKHApO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0dmlld1R5cGU6dGhpcy5wcm9wcy5zZXR0aW5ncy52aWV3VHlwZVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuZXhwb3J0ID0gdGhpcy5leHBvcnQuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0dmFyIHZpZXdUeXBlID0gdGhpcy5zdGF0ZS52aWV3VHlwZTtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J292ZXJsYXknIG9uQ2xpY2s9eyhlKT0+dGhpcy5wcm9wcy5jbG9zZSgpfSA+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JveCc+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbWVhdCc+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT0nbXNnJz5leHBvcnQgbG9nczwvcD5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2J1dHRTZXQnPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17KGUpPT50aGlzLmV4cG9ydCgpfSA+RXhwb3J0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoZSk9PnRoaXMucHJvcHMuY2xvc2UoKX0gPkNsb3NlPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCgpe1xyXG5cdFx0dmFyIGRhdGEgPSB0aGlzLnByb3BzLmxvZ0RhdGE7XHJcblx0XHR2YXIgdHlwZSA9ICd0aW1lJzsvL3RoaXMuc3RhdGUudmlld1R5cGU7XHJcblxyXG5cdFx0dmFyIHJlcztcclxuXHRcdGlmKCB0eXBlPT09J3NpdGUnICl7XHJcblx0XHRcdHJlcyA9IHt9O1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJlcyA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KT0+e1xyXG5cdFx0XHR2YXIgdXJsID0gZGF0YVtrZXldLnVybDtcclxuXHRcdFx0dmFyIHRlbXAgPSB7XHJcblx0XHRcdFx0dGltZXN0YW1wOm1vbWVudChwYXJzZUludChrZXkpKS5mb3JtYXQoJ1lZWVktTU0tREQgQCBISDptbTpzcycpLFxyXG5cdFx0XHRcdHVybDp1cmwsLy8odXJsLnByb3RvKycvLycrdXJsLnd3dyt1cmwuZG9tYWluK3VybC50bGQrdXJsLnBhdGgrdXJsLmZyYWcpLFxyXG5cdFx0XHRcdGlucHV0czpbXSxcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKCB2YXIgaW5wdXQgb2YgZGF0YVtrZXldLmlucHV0cyApe1xyXG5cdFx0XHRcdGlmKCBpbnB1dC5lbmRWYWx1ZSAmJiBpbnB1dC5lbmRWYWx1ZSE9PScnICl7XHJcblx0XHRcdFx0XHR0ZW1wLmlucHV0cy5wdXNoKGlucHV0LmVuZFZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoIGlucHV0LmluaXRWYWx1ZSAmJiBpbnB1dC5pbml0VmFsdWUhPT0nJyApe1xyXG5cdFx0XHRcdFx0dGVtcC5pbnB1dHMucHVzaChpbnB1dC5pbml0VmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnB1dC5zZWdtZW50cy5mb3JFYWNoKChzZWcpPT57XHJcblx0XHRcdFx0XHR0ZW1wLmlucHV0cy5wdXNoKHNlZyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZiggdHlwZT09PSdzaXRlJyApe1xyXG5cdFx0XHRcdHZhciBzaXRlID0gdXJsLmRvbWFpbit1cmwudGxkO1xyXG5cclxuXHRcdFx0XHRpZiggIXJlcy5oYXNPd25Qcm9wZXJ0eShzaXRlKSApXHJcblx0XHRcdFx0XHRyZXNbc2l0ZV09W107XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmVzW3NpdGVdLnB1c2godGVtcCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJlcy5wdXNoKHRlbXApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcblx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShyZXMsbnVsbCwnXFx0JyldLHt0eXBlOlwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCJ9KTtcclxuXHRcdEZpbGVTYXZlci5zYXZlQXMoYmxvYiwnZmVhTG9nLicrKG5ldyBEYXRlKCkpLnRvSlNPTigpKycuanNvbi50eHQnKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIERvbmF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4oXHJcblx0XHRcdDxkaXYgaWQ9J2RvbmF0ZScgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VIZWFkaW5nXCI+XHJcblx0XHRcdFx0XHRcdDxwPlN1cHBvcnQgTWUgXl9ePC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VNZWF0XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJwYXlwYWxDb25cIj5cclxuXHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiaHR0cHM6Ly9wYXlwYWwubWUvZnJvc2F0aW9uXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJwYXlwYWwubWVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2RiJz5QYXk8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPSdsYic+UGFsPC9zcGFuPjwvYT5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJiaXRjb2luQ29uXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5CaXRjb2luIEFkZHJlc3M6PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJodHRwczovL2Jsb2NrY2hhaW4uaW5mby9hZGRyZXNzLzFMdHdxVVRxQ28yTEhtYUpxZTJCbTJGM0N1dFZ0dWYxRkdcIiB0YXJnZXQ9J19ibGFuayc+MUx0d3FVVHFDbzJMSG1hSnFlMkJtMkYzQ3V0VnR1ZjFGRzwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBYm91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4oXHJcblx0XHRcdDxkaXYgaWQ9J2Fib3V0JyBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZUhlYWRpbmdcIj5cclxuXHRcdFx0XHRcdFx0PHA+QWJvdXQgdGhpcyBFeHRlbnNpb248L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZU1lYXRcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2J1bGxldExpc3QnPlxyXG5cdFx0XHRcdFx0XHRcdDxwPm1vbml0b3JzIGFuZCBsb2dzIHRleHQgaW5wdXRzPC9wPlxyXG5cdFx0XHRcdFx0XHRcdDxwPmFsbCBjb2xsZWN0ZWQgZGF0YSBpcyBzdG9yZWQgaW4gQ2hyb21lPC9wPlxyXG5cdFx0XHRcdFx0XHRcdDxwPnRoaXMgZXh0ZW5zaW9uIGNvbnRhaW5zIG5vIGFkdmVydGlzZW1lbnRzIG9yIGFuYWx5dGljczwvcD5cclxuXHRcdFx0XHRcdFx0XHQ8cD5tYXkgbm90IHdvcmsgcHJvcGVybHkgb24gc2l0ZXMgd2l0aCB1bmNvbnZlbnRpb25hbCBpbnB1dHMgc2V0dXBzIGxpa2UganNmaWRkbGUubmV0PC9wPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuXHJcblxyXG5AY29ubmVjdCgoc3RvcmUpPT57XHJcblx0cmV0dXJuIHtcclxuXHRcdGljb25PcGVuOnN0b3JlLmljb25PcGVuXHJcblx0fTtcclxufSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5pY29uQ2hhbmdlID0gdGhpcy5pY29uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdGljb25DaGFuZ2UoKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6J2ljb25PcGVuQ2hhbmdlJyx2YWw6IXRoaXMucHJvcHMuaWNvbk9wZW59KTtcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgaWNvbk9wZW4gPSB0aGlzLnByb3BzLmljb25PcGVuO1xyXG5cdFx0cmV0dXJuKFxyXG5cdFx0XHQ8ZGl2IGlkPSdvcHRpb25zJyBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZUhlYWRpbmdcIj5cclxuXHRcdFx0XHRcdFx0PHA+S2V5TG9nZ2VyIFNldHRpbmdzPC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VNZWF0XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdvcHRpb25TZXQnPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdvcHRpb25CdXR0Jz5cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtpY29uT3Blbn0gb25DaGFuZ2U9e3RoaXMuaWNvbkNoYW5nZX0vPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHA+aWNvbiBjbGljayBvcGVucyB0aGlzIHBhZ2U8L3A+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0Ly8gPGRpdiBjbGFzc05hbWU9J29wdGlvblNldCc+XHJcblx0XHRcdFx0XHRcdC8vIFx0PHAgY2xhc3NOYW1lPSd0aXRsZSc+U2V0IFBhc3N3b3JkPC9wPlxyXG5cdFx0XHRcdFx0XHQvLyA8L2Rpdj5cclxuXHRcdFx0XHRcdFx0Ly8gPGRpdiBjbGFzc05hbWU9J29wdGlvblNldCc+XHJcblx0XHRcdFx0XHRcdC8vIFx0PHAgY2xhc3NOYW1lPSd0aXRsZSc+QXV0byBVbmluc3RhbGw8L3A+XHJcblx0XHRcdFx0XHRcdC8vIDwvZGl2PiIsIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD1cImJhckNvblwiPlx0XHJcblx0XHRcdFx0PGRpdiBpZD1cImhlYWRpbmdcIj5cclxuXHRcdFx0XHRcdDxwIHRpdGxlPVwiRmVhIEtleUxvZ2dlclwiPkZlYTwvcD5cclxuXHRcdFx0XHRcdDxwIHRpdGxlPVwiRmVhIEtleUxvZ2dlclwiPktleUxvZ2dlcjwvcD5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8VGFicy8+XHJcblx0XHRcdFx0PGRpdiBpZD1cImZvb3RcIj48c3BhbiB0aXRsZT1cImxlZ2FsIGNyYXBcIj7CqSBGcm9zYXRpb248L3NwYW4+PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jb25zdCB0YWJJRHMgPSBbJ2xvZ3MnLCdzZXR0aW5ncycsJ2RvbmF0ZScsJ2Fib3V0J107XHJcbkBjb25uZWN0KChzdG9yZSk9PntcclxuXHRyZXR1cm4ge1xyXG5cdFx0YVRhYjpzdG9yZS5hY3RpdmVUYWJcclxuXHR9O1xyXG59KVxyXG5jbGFzcyBUYWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMudGFiQ2xpY2sgPSB0aGlzLnRhYkNsaWNrLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdHRhYkNsaWNrKHRhYil7XHJcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOidUQUInLHZhbDp0YWJ9KTtcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgYVRhYiA9IHRoaXMucHJvcHMuYVRhYnx8J2xvZ3MnO1xyXG5cdFx0dmFyIHRhYkNsYXNzZXMgPSB7fTtcclxuXHRcdHRhYkNsYXNzZXNbYVRhYl0gPSAnYWN0aXZlVGFiJztcclxuXHRcdHJldHVybihcclxuXHRcdFx0PGRpdiBpZD1cIm5hdkNvblwiPlxyXG5cdFx0XHRcdHsgdGFiSURzLm1hcCgoaSk9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9eyd0QnV0dCAnKyh0YWJDbGFzc2VzW2ldfHwnJyl9IGtleT17aX0gb25DbGljaz17KGUpPT50aGlzLnRhYkNsaWNrKGkpfT5cclxuXHRcdFx0XHRcdFx0PHA+e2l9PC9wPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nc2VsZWN0ZWQnPjwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSIsIi8qbG9nIGRhdGEgaXMgQXJyYXkgZm9yIG5vdyovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2dEYXRhUkUoc3RhdGU9ZmFsc2UsYWN0aW9uKXtcclxuXHJcblx0aWYoIGFjdGlvbi50eXBlID09PSAnTG9nRGF0YUZpbHRlckNocm9tZScgKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0c3RhdGUgPSBmaWx0ZXJDaHJvbWVPYmooYWN0aW9uLnZhbCk7XHJcblx0XHR9XHJcblx0XHRjYXRjaChlKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yIGZpbHRlcmluZyBsb2cgZGF0YTonLGUpO1xyXG5cdFx0XHRzdGF0ZSA9IGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiggYWN0aW9uLnR5cGUgPT09ICdMb2dEYXRhRGVsZXRlQWxsJyApe1xyXG5cdFx0Ly9jbGVhciBjaHJvbWVcclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShPYmplY3Qua2V5cyhzdGF0ZSkpO1xyXG5cdFx0Ly8gY2xlYXIgcmVkdXhcclxuXHRcdHN0YXRlID0ge307XHJcblx0fVxyXG5cdFxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ0xvZ0RhdGFEZWxldGVTb21lJyApe1xyXG5cdFx0dmFyIGxvZ0lEcyA9IGFjdGlvbi52YWw7XHJcblxyXG5cdFx0Ly8gZGVsZXRlIGZyb20gY2hyb21lXHJcblx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUobG9nSURzKTtcclxuXHJcblx0XHQvLyBkZWxldGUgZnJvbSByZWR1eFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsb2dJRHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZGVsZXRlIHN0YXRlW2xvZ0lEc1tpXV07XHJcblx0XHR9XHJcblx0XHRzdGF0ZSA9IHsuLi5zdGF0ZSB9O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5cclxuLyogcGFyc2Ugb2JqZWN0IG9mIGxvZ3MgZnJvbSBDaHJvbWUgKi9cclxuZnVuY3Rpb24gZmlsdGVyQ2hyb21lT2JqKGxvZ3Mpe1xyXG5cdHZhciByZXMgPSB7fTtcclxuXHJcblx0dmFyIGRldGVjdGVkID0gMDtcclxuXHR2YXIgcHJvY2Vzc2VkID0gMDtcclxuXHJcblx0Y29uc29sZS5sb2coJ2ZpbHRlcmluZyBsb2cgZGF0YS4uLicpO1xyXG5cclxuXHRmb3IgKHZhciBrZXkgaW4gbG9ncykge1xyXG5cdFx0aWYoIC9bXjAtOV0vLnRlc3Qoa2V5KSApIC8vb25seSBudW1iZXJlZCBrZXlzXHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0ZGV0ZWN0ZWQrKztcclxuXHRcdC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobG9nc1trZXldLG51bGwpKTtcclxuXHJcblx0XHR2YXIgYUxvZyA9IGxvZ3Nba2V5XTtcclxuXHJcblxyXG5cdFx0Ly8gbGVnYWN5OiByZW1vdmUgaW5jb2duaXRvOjAnc1xyXG5cdFx0aWYoIGFMb2cuaGFzT3duUHJvcGVydHkoJ2luY29nJykgJiYgYUxvZy5pbmNvZz09PTAgKXtcclxuXHRcdFx0ZGVsZXRlIGFMb2cuaW5jb2c7XHJcblx0XHRcdHZhciB1cGRhdGUgPSB7fTtcclxuXHRcdFx0dXBkYXRlW2tleV0gPSBhTG9nO1xyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQodXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2xlZ2FjeTogY2hlY2sgdXJpIGFycmF5XHJcblx0XHRpZiggYUxvZy51cmkgJiYgQXJyYXkuaXNBcnJheShhTG9nLnVyaSkgJiYgYUxvZy51cmkubGVuZ3RoPT09NCApe1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXJpJyk7XHJcblx0XHRcdHZhciB1cmkgPSBhTG9nLnVyaTtcclxuXHRcdFx0YUxvZy51cmwgPSB7XHJcblx0XHRcdFx0cHJvdG86IHVyaVswXSxcclxuXHRcdFx0XHR3d3c6ICcnLFxyXG5cdFx0XHRcdGRvbWFpbjogdXJpWzFdLC8vLnNsaWNlKDAsdXJpWzFdLmxhc3RJbmRleE9mKFwiLlwiKSksXHJcblx0XHRcdFx0dGxkOiAnJywvL3VyaVsxXS5zbGljZSh1cmlbMV0ubGFzdEluZGV4T2YoXCIuXCIpKSxcclxuXHRcdFx0XHRwYXRoOiB1cmlbMl0sXHJcblx0XHRcdFx0ZnJhZzogdXJpWzNdXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvL3NlcGFyYXRlIHd3dy5cclxuXHRcdFx0dmFyIHUgPSBhTG9nLnVybDtcclxuXHRcdFx0aWYoIHUuZG9tYWluLm1hdGNoKC9edyg/Ond3fHd3P1swLTldezEsM30pXFx3ezAsNX1cXC4vKSApe1xyXG5cdFx0XHRcdHUud3d3ID0gdS5kb21haW4uc3Vic3RyaW5nKDAsdS5kb21haW4uaW5kZXhPZignLicpKzEpO1xyXG5cdFx0XHRcdHUuZG9tYWluID0gdS5kb21haW4uc3Vic3RyaW5nKHUuZG9tYWluLmluZGV4T2YoJy4nKSsxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBzZXBhcmF0ZSAudGxkXHJcblx0XHRcdHZhciBoYXNEb3QgPSB1LmRvbWFpbi5sYXN0SW5kZXhPZignLicpO1xyXG5cdFx0XHRpZiggfmhhc0RvdCApe1xyXG5cdFx0XHRcdHUudGxkID0gdS5kb21haW4uc3Vic3RyaW5nKGhhc0RvdCk7XHJcblx0XHRcdFx0dS5kb21haW4uc2xpY2UoMCxoYXNEb3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL2RlbGV0ZSBvbGQgZm9ybWF0XHJcblx0XHRcdGRlbGV0ZSBhTG9nLnVyaTtcclxuXHRcdFx0Ly8gdXBkYXRlXHJcblx0XHRcdHZhciB1cGRhdGUgPSB7fTtcclxuXHRcdFx0dXBkYXRlW2tleV0gPSBhTG9nO1xyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQodXBkYXRlKTtcclxuXHRcdH1cdFx0XHJcblxyXG5cdFx0Ly9jaGVjayB1cmwnc1xyXG5cdFx0aWYoICFhTG9nLnVybCB8fCAhYUxvZy51cmwuZG9tYWluICl7XHJcblx0XHRcdC8vY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKGtleSk7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvL2NoZWNrIGlucHV0c1xyXG5cdFx0dmFyIGlucHV0cyA9IGFMb2cuaW5wdXRzO1xyXG5cdFx0aWYoICFpbnB1dHMgfHwgIUFycmF5LmlzQXJyYXkoaW5wdXRzKSApe1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHRcdC8vIHJlbW92ZSBlbXB0eSBlbnRyaWVzXHJcblx0XHRmb3IoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKyApe1xyXG5cdFx0XHRpZiggaW5wdXRzW2ldLmVuZFZhbHVlPT0nJyAmJiBpbnB1dHNbaV0uaW5pdFZhbHVlPT0nJyAmJiBpbnB1dHNbaV0uc2VnbWVudHMubGVuZ3RoPDEpe1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ1NQTElDRUQ6ICcsIEpTT04uc3RyaW5naWZ5KGlucHV0cykpO1xyXG5cdFx0XHRcdGlucHV0cy5zcGxpY2UoaSwxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYoIGlucHV0cy5sZW5ndGg8MSApe1xyXG5cdFx0XHQvL2Nocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShrZXkpO1xyXG5cdFx0XHQvL2RlbGV0ZSBsb2dzW2tleV07XHJcblx0XHRcdGNvbnNvbGUubG9nKCdFbXB0eSBMb2cgRGV0ZWN0ZWQ6JyxrZXksbG9nc1trZXldKTtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRyZXNba2V5XSA9IGFMb2c7XHJcblx0XHRwcm9jZXNzZWQrKztcclxuXHR9XHJcblxyXG5cdFxyXG5cdGNvbnNvbGUubG9nKHByb2Nlc3NlZCArICcgRW50cmllcyBTdWNjZXNzZnVsbHkgUHJvY2Vzc2VkJyk7XHJcblx0Ly9pZiggZGV0ZWN0ZWQtcHJvY2Vzc2VkPjAgKXtcclxuXHRcdGNvbnNvbGUubG9nKGRldGVjdGVkLXByb2Nlc3NlZCArICcgRW50cmllcyBNYWxmb3JtYXR0ZWQnKTtcclxuXHRyZXR1cm4gcmVzO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyAvKiBwYXJzZSBvYmplY3Qgb2YgbG9ncyBmcm9tIENocm9tZSAqL1xyXG4vLyBmdW5jdGlvbiBmaWx0ZXJDaHJvbWVPYmoobG9ncyl7XHJcbi8vIFx0Y29uc29sZS5sb2coJ2ZpbHRlcmluZyBsb2cgZGF0YS4uLicpO1xyXG5cclxuLy8gXHR2YXIgcmVzID0ge307XHJcbi8vIFx0dmFyIGRldGVjdGVkID0gMDtcclxuLy8gXHR2YXIgcHJvY2Vzc2VkID0gMDtcclxuXHJcbi8vIFx0Zm9yICh2YXIga2V5IGluIGxvZ3MpIHtcclxuLy8gXHRcdGlmKCAvW14wLTldLy50ZXN0KGtleSkgKSAvL29ubHkgbnVtYmVyZWQga2V5c1xyXG4vLyBcdFx0XHRjb250aW51ZTtcclxuLy8gXHRcdGRldGVjdGVkKys7XHJcblxyXG4vLyBcdFx0dmFyIGFMb2c7XHJcbi8vIFx0XHR0cnl7XHJcbi8vIFx0XHRcdGFMb2cgPSBwcm9jZXNzTG9nKGxvZ3Nba2V5XSxrZXkpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0Y2F0Y2goZSl7XHJcbi8vIFx0XHRcdGNvbnNvbGUubG9nKCdFcnJvciBmaWx0ZXJpbmcgbG9nICMnK2tleSsnOicsZSk7XHJcbi8vIFx0XHRcdGNvbnRpbnVlO1x0XHRcdFxyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHRcdGlmKCAhYUxvZyB8fCB0eXBlb2YgYUxvZyE9XCJvYmplY3RcIiApe1xyXG4vLyBcdFx0XHRjb25zb2xlLmxvZygnZGF0YSBlcnJvcjogbG9nICMnK2tleSxsb2dzW2tleV0pO1xyXG4vLyBcdFx0XHRjb250aW51ZTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdHJlc1trZXldID0gYUxvZztcclxuLy8gXHRcdHByb2Nlc3NlZCsrO1xyXG4vLyBcdH1cclxuXHJcblx0XHJcbi8vIFx0Y29uc29sZS5sb2cocHJvY2Vzc2VkICsgJyBFbnRyaWVzIFN1Y2Nlc3NmdWxseSBQcm9jZXNzZWQnKTtcclxuLy8gXHQvL2lmKCBkZXRlY3RlZC1wcm9jZXNzZWQ+MCApe1xyXG4vLyBcdFx0Y29uc29sZS5sb2coZGV0ZWN0ZWQtcHJvY2Vzc2VkICsgJyBFbnRyaWVzIE1hbGZvcm1hdHRlZCcpO1xyXG4vLyBcdHJldHVybiByZXM7XHJcbi8vIH1cclxuXHJcblxyXG4vLyBmdW5jdGlvbiBwcm9jZXNzTG9nKGFMb2csa2V5KXtcclxuXHJcbi8vIFx0Ly8gbGVnYWN5OiByZW1vdmUgaW5jb2duaXRvOjAnc1xyXG4vLyBcdGlmKCBhTG9nLmhhc093blByb3BlcnR5KCdpbmNvZycpICYmIGFMb2cuaW5jb2c9PT0wICl7XHJcbi8vIFx0XHRkZWxldGUgYUxvZy5pbmNvZztcclxuLy8gXHRcdHZhciB1cGRhdGUgPSB7fTtcclxuLy8gXHRcdHVwZGF0ZVtrZXldID0gYUxvZztcclxuLy8gXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh1cGRhdGUpO1xyXG4vLyBcdH1cclxuLy8gXHQvL2xlZ2FjeTogY2hlY2sgdXJpIGFycmF5XHJcbi8vIFx0aWYoIGFMb2cudXJpICYmIEFycmF5LmlzQXJyYXkoYUxvZy51cmkpICl7XHJcbi8vIFx0XHR2YXIgdXJpID0gYUxvZy51cmk7XHJcbi8vIFx0XHRhTG9nLnVybCA9IHtcclxuLy8gXHRcdFx0cHJvdG86IHVyaVswXSxcclxuLy8gXHRcdFx0d3d3OiAnJyxcclxuLy8gXHRcdFx0ZG9tYWluOiB1cmlbMV0sLy8uc2xpY2UoMCx1cmlbMV0ubGFzdEluZGV4T2YoXCIuXCIpKSxcclxuLy8gXHRcdFx0dGxkOiAnJywvL3VyaVsxXS5zbGljZSh1cmlbMV0ubGFzdEluZGV4T2YoXCIuXCIpKSxcclxuLy8gXHRcdFx0cGF0aDogdXJpWzJdLFxyXG4vLyBcdFx0XHRmcmFnOiB1cmlbM11cclxuLy8gXHRcdH07XHJcbi8vIFx0XHQvL2RlbGV0ZSBvbGRcclxuLy8gXHRcdGRlbGV0ZSBhTG9nLnVyaTtcclxuXHJcbi8vIFx0XHQvL3NlcGFyYXRlIHd3d1xyXG4vLyBcdFx0dmFyIHUgPSBhTG9nLnVybDtcclxuLy8gXHRcdGlmKCB1LmRvbWFpbi5tYXRjaCgvXncoPzp3d3x3dz9bMC05XXsxLDN9KVxcd3swLDV9XFwuLykgKXtcclxuLy8gXHRcdFx0dS53d3cgPSB1LmRvbWFpbi5zdWJzdHJpbmcoMCx1LmRvbWFpbi5pbmRleE9mKCcuJykrMSk7XHJcbi8vIFx0XHRcdHUuZG9tYWluID0gdS5kb21haW4uc3Vic3RyaW5nKHUuZG9tYWluLmluZGV4T2YoJy4nKSsxKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdC8vIHNlcGFyYXRlIC50bGQnc1xyXG4vLyBcdFx0dmFyIGhhc0RvdCA9IHUuZG9tYWluLmxhc3RJbmRleE9mKCcuJyk7XHJcbi8vIFx0XHRpZiggfmhhc0RvdCApe1xyXG4vLyBcdFx0XHR1LnRsZCA9IHVybC5kb21haW4uc3Vic3RyKGhhc0RvdCk7XHJcbi8vIFx0XHRcdHUuZG9tYWluID0gdXJsLmRvbWFpbi5zbGljZSgwLGhhc0RvdCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHQvLyB1cGRhdGVcclxuLy8gXHRcdHZhciB1cGRhdGUgPSB7fTtcclxuLy8gXHRcdHVwZGF0ZVtrZXldID0gYUxvZztcclxuLy8gXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh1cGRhdGUpO1xyXG4vLyBcdH1cclxuXHRcclxuXHJcbi8vIFx0Ly9jaGVjayB1cmwnc1xyXG4vLyBcdGlmKCAhYUxvZy51cmwgfHwgIWFMb2cudXJsLmRvbWFpbiB8fCAhYUxvZy51cmwudGxkICl7XHJcbi8vIFx0XHQvL2Nocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShrZXkpO1xyXG4vLyBcdFx0cmV0dXJuIG51bGw7XHJcbi8vIFx0fVxyXG5cclxuXHJcbi8vIFx0Ly9jaGVjayBpbnB1dHNcclxuLy8gXHR2YXIgaW5wdXRzID0gYUxvZy5pbnB1dHM7XHJcbi8vIFx0aWYoICFpbnB1dHMgfHwgIUFycmF5LmlzQXJyYXkoaW5wdXRzKSApe1xyXG4vLyBcdFx0cmV0dXJuIG51bGw7XHJcbi8vIFx0fVxyXG4vLyBcdC8vIHJlbW92ZSBlbXB0eSBlbnRyaWVzXHJcbi8vIFx0Zm9yKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKysgKXtcclxuLy8gXHRcdGlmKCBpbnB1dHNbaV0uZW5kVmFsdWU9PScnICYmIGlucHV0c1tpXS5pbml0VmFsdWU9PScnICYmIGlucHV0c1tpXS5zZWdtZW50cy5sZW5ndGg8MSl7XHJcbi8vIFx0XHRcdC8vY29uc29sZS5sb2coJ1NQTElDRUQ6ICcsIEpTT04uc3RyaW5naWZ5KGlucHV0cykpO1xyXG4vLyBcdFx0XHRpbnB1dHMuc3BsaWNlKGksMSk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyBcdGlmKCBpbnB1dHMubGVuZ3RoPDEgKXtcclxuLy8gXHRcdC8vY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKGtleSk7XHJcbi8vIFx0XHQvL2RlbGV0ZSBsb2dzW2tleV07XHJcbi8vIFx0XHQvL2NvbnNvbGUubG9nKGFMb2cpO1xyXG4vLyBcdFx0cmV0dXJuIG51bGw7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRyZXR1cm4gYUxvZztcclxuLy8gfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyB2YXIgenp6ID0ge1xyXG4vLyBcdCd6Jzp7XHJcbi8vIFx0XHRhOltcclxuLy8gXHRcdFx0J2Fkc2xmaycsXHJcbi8vIFx0XHRcdCdhZHNmYSdcclxuLy8gXHRcdF1cclxuLy8gXHR9LFxyXG4vLyBcdCd5Jzp7XHJcbi8vIFx0XHRiOltcclxuLy8gXHRcdFx0J2JkamsnXHJcbi8vIFx0XHRdXHJcbi8vIFx0fSxcclxuLy8gXHQvLyAneCc6e1xyXG4vLyBcdC8vIFx0J2MnOltdXHJcbi8vIFx0Ly8gfVxyXG4vLyB9O1xyXG4vLyBjaGVjayh6enosIFsneicsJ2InXSwgW10gKTtcclxuLy8gLy96enoueC5jLnB1c2goJ3dpbicpO1xyXG4vLyBjb25zb2xlLmxvZyh6enopO1xyXG5cclxuLy8gZnVuY3Rpb24gbWFrZSggb2JqPXt9LCBrZXlQYXRoLCB0eXBlICl7XHJcbi8vIFx0dmFyIGxhc3RLZXlJbmRleCA9IGtleVBhdGgubGVuZ3RoLTE7XHJcbi8vIFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0S2V5SW5kZXg7ICsrIGkpIHtcclxuLy8gXHRcdHZhciBrZXkgPSBrZXlQYXRoW2ldO1xyXG4vLyBcdFx0aWYgKCEoa2V5IGluIG9iaikpXHJcbi8vIFx0XHRcdG9ialtrZXldID0ge31cclxuLy8gXHRcdG9iaiA9IG9ialtrZXldO1xyXG4vLyBcdH1cclxuLy8gXHRpZiggIW9ialtrZXlQYXRoW2xhc3RLZXlJbmRleF1dIClcclxuLy8gXHRcdG9ialtrZXlQYXRoW2xhc3RLZXlJbmRleF1dID0gdHlwZTtcclxuLy8gXHRyZXR1cm4gb2JqW2tleVBhdGhbbGFzdEtleUluZGV4XV07XHJcbi8vIH1cclxuXHJcblxyXG4vLyBmdW5jdGlvbiBhc3NpZ24oIG9iaiwga2V5UGF0aCwgdmFsdWUgKXtcclxuLy8gXHR2YXIgbGFzdEtleUluZGV4ID0ga2V5UGF0aC5sZW5ndGgtMTtcclxuLy8gXHRmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RLZXlJbmRleDsgKysgaSkge1xyXG4vLyBcdFx0dmFyIGtleSA9IGtleVBhdGhbaV07XHJcbi8vIFx0XHRpZiAoIShrZXkgaW4gb2JqKSlcclxuLy8gXHRcdFx0b2JqW2tleV0gPSB7fVxyXG4vLyBcdFx0b2JqID0gb2JqW2tleV07XHJcbi8vIFx0fVxyXG4vLyBcdG9ialtrZXlQYXRoW2xhc3RLZXlJbmRleF1dID0gdmFsdWU7XHJcbi8vIH1cclxuXHJcbiIsIlxyXG5cclxuXHJcbi8qdGFiIHN3aXRjaGluZyovXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWJSRShzdGF0ZT0nbG9ncycsYWN0aW9uKXtcclxuXHRpZiggYWN0aW9uLnR5cGUgPT09ICdUQUInICl7XHJcblx0XHRpZiggYWN0aW9uLnZhbCAmJiBhY3Rpb24udmFsICE9PSBzdGF0ZSApe1xyXG5cdFx0XHRzdGF0ZSA9IGFjdGlvbi52YWw7XHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7YWN0aXZlVGFiOnN0YXRlfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuXHJcblxyXG4vKmljb24gYmVoYXZpb3IqL1xyXG5leHBvcnQgZnVuY3Rpb24gaWNvblJFKHN0YXRlPXRydWUsYWN0aW9uKXtcclxuXHRpZiggYWN0aW9uLnR5cGUgPT09ICdpY29uT3BlbkluaXQnICl7XHJcblx0XHRzdGF0ZSA9IEJvb2xlYW4oYWN0aW9uLnZhbCk7XHJcblx0fVxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2ljb25PcGVuQ2hhbmdlJyApe1xyXG5cdFx0c3RhdGUgPSBCb29sZWFuKGFjdGlvbi52YWwpO1xyXG5cdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtpY29uT3BlbjpzdGF0ZX0pO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qbG9nIHBhZ2Ugc2V0dGluZ3MqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9nUGFnZVJFKHN0YXRlPXsgXHJcblx0dmlld1R5cGU6J3RpbWUnLFxyXG5cdGNvbmZpcm1EZWxldGU6dHJ1ZSxcclxuXHRtVGltZTp0cnVlLFxyXG5cdG9wZW5lZFNpdGU6bnVsbCxcclxufSxhY3Rpb24pe1xyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc0luaXQnICl7XHJcblx0XHRzdGF0ZSA9IE9iamVjdC5hc3NpZ24oc3RhdGUsYWN0aW9uLnZhbCk7XHJcblx0fVxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc1RpbWUnICl7XHJcblx0XHRzdGF0ZSA9IHsuLi5zdGF0ZSwgdmlld1R5cGU6J3RpbWUnIH1cclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7bG9nUGFnZVNldHRpbmdzOnN0YXRlfSk7XHJcblx0fVxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc1NpdGUnICl7XHJcblx0XHRzdGF0ZSA9IHsuLi5zdGF0ZSwgdmlld1R5cGU6J3NpdGUnIH1cclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7bG9nUGFnZVNldHRpbmdzOnN0YXRlfSk7XHJcblx0fVxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc21UaW1lJyApe1xyXG5cdFx0c3RhdGUgPSB7Li4uc3RhdGUsIG1UaW1lOkJvb2xlYW4oYWN0aW9uLnZhbCkgfVxyXG5cdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtsb2dQYWdlU2V0dGluZ3M6c3RhdGV9KTtcclxuXHR9XHJcblxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc09wZW5lZFNpdGUnICl7XHJcblx0XHRzdGF0ZSA9IHsuLi5zdGF0ZSwgb3BlbmVkU2l0ZTphY3Rpb24udmFsIH1cclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7bG9nUGFnZVNldHRpbmdzOnN0YXRlfSk7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdGlmKCBhY3Rpb24udHlwZSA9PT0gJ2xvZ1BhZ2VTZXR0aW5nc0NvbmZpcm1EZWxldGUnICl7XHJcblx0XHRzdGF0ZSA9IHsuLi5zdGF0ZSwgY29uZmlybURlbGV0ZTpCb29sZWFuKGFjdGlvbi52YWwpIH1cclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7bG9nUGFnZVNldHRpbmdzOnN0YXRlfSk7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qcGFzc3dvcmQgc3R1ZmYqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFzc1JFKHN0YXRlPXtcclxuXHR2YWw6bnVsbCxcclxuXHRmYWlsczpbXSxcclxuXHRzZWxmRGVzdHJ1Y3RBZnRlcjotMVxyXG59LGFjdGlvbil7XHJcblx0aWYoIGFjdGlvbi50eXBlID09PSAncGFzc0luaXQnICl7XHJcblx0XHRzdGF0ZSA9IE9iamVjdC5hc3NpZ24oc3RhdGUsYWN0aW9uLnZhbCk7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZTtcclxufVxyXG4iXX0=
