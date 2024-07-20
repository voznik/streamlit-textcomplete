(()=>{var e={344:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Completer=void 0;var a=n(248),s=n(134),c=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(f,e);var t,n,a,c,u,l=(t=f,n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r,i,a=o(t);return i=n?Reflect.construct(a,arguments,o(this).constructor):a.apply(this,arguments),e=this,(r=i)&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(r)||"function"==typeof r)?r:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)});function f(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,f),(t=l.call(this)).handleQueryResult=function(e){t.emit("hit",{searchResults:e})},t.strategies=e.map(function(e){return new s.Strategy(e)}),t}return a=f,c=[{key:"destroy",value:function(){return this.strategies.forEach(function(e){return e.destroy()}),this}},{key:"run",value:function(e){var t=!0,n=!1,r=void 0;try{for(var o,i=this.strategies[Symbol.iterator]();!(t=(o=i.next()).done);t=!0)if(o.value.execute(e,this.handleQueryResult))return}catch(e){n=!0,r=e}finally{try{!t&&null!=i.return&&i.return()}finally{if(n)throw r}}this.handleQueryResult([])}}],r(a.prototype,c),f}(a.EventEmitter);t.Completer=c},329:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Dropdown=t.DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME=t.DEFAULT_DROPDOWN_ITEM_CLASS_NAME=t.DEFAULT_DROPDOWN_CLASS_NAME=t.DEFAULT_DROPDOWN_PLACEMENT=t.DEFAULT_DROPDOWN_MAX_COUNT=void 0;var c=n(248),u=n(125);t.DEFAULT_DROPDOWN_MAX_COUNT=10,t.DEFAULT_DROPDOWN_PLACEMENT="auto",t.DEFAULT_DROPDOWN_CLASS_NAME="dropdown-menu textcomplete-dropdown",t.DEFAULT_DROPDOWN_ITEM_CLASS_NAME="textcomplete-item",t.DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME="".concat(t.DEFAULT_DROPDOWN_ITEM_CLASS_NAME," active");var l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(l,e);var n,o,c=(n=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,t,r,i=a(n);return r=o?Reflect.construct(i,arguments,a(this).constructor):i.apply(this,arguments),e=this,(t=r)&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)});function l(e,t){var n;return r(this,l),(n=c.call(this)).el=e,n.option=t,n.shown=!1,n.items=[],n.activeIndex=null,n}return i(l,[{key:"render",value:function(e,n){var r=this,o=(0,u.createCustomEvent)("render",{cancelable:!0});return(this.emit("render",o),o.defaultPrevented)?this:(this.clear(),0===e.length)?this.hide():(this.items=e.slice(0,this.option.maxCount||t.DEFAULT_DROPDOWN_MAX_COUNT).map(function(e,t){var n;return new f(r,t,e,(null===(n=r.option)||void 0===n?void 0:n.item)||{})}),this.setStrategyId(e[0]).renderEdge(e,"header").renderItems().renderEdge(e,"footer").show().setOffset(n).activate(0),this.emit("rendered",(0,u.createCustomEvent)("rendered")),this)}},{key:"destroy",value:function(){var e;return this.clear(),null===(e=this.el.parentNode)||void 0===e||e.removeChild(this.el),this}},{key:"select",value:function(e){var t={searchResult:e.searchResult},n=(0,u.createCustomEvent)("select",{cancelable:!0,detail:t});return(this.emit("select",n),n.defaultPrevented)?this:(this.hide(),this.emit("selected",(0,u.createCustomEvent)("selected",{detail:t})),this)}},{key:"show",value:function(){if(!this.shown){var e=(0,u.createCustomEvent)("show",{cancelable:!0});if(this.emit("show",e),e.defaultPrevented)return this;this.el.style.display="block",this.shown=!0,this.emit("shown",(0,u.createCustomEvent)("shown"))}return this}},{key:"hide",value:function(){if(this.shown){var e=(0,u.createCustomEvent)("hide",{cancelable:!0});if(this.emit("hide",e),e.defaultPrevented)return this;this.el.style.display="none",this.shown=!1,this.clear(),this.emit("hidden",(0,u.createCustomEvent)("hidden"))}return this}},{key:"clear",value:function(){return this.items.forEach(function(e){return e.destroy()}),this.items=[],this.el.innerHTML="",this.activeIndex=null,this}},{key:"up",value:function(e){return this.shown?this.moveActiveItem("prev",e):this}},{key:"down",value:function(e){return this.shown?this.moveActiveItem("next",e):this}},{key:"moveActiveItem",value:function(e,t){if(null!=this.activeIndex){var n="next"===e?this.getNextActiveIndex():this.getPrevActiveIndex();null!=n&&(this.activate(n),t.preventDefault())}return this}},{key:"activate",value:function(e){return this.activeIndex!==e&&(null!=this.activeIndex&&this.items[this.activeIndex].deactivate(),this.activeIndex=e,this.items[e].activate()),this}},{key:"isShown",value:function(){return this.shown}},{key:"getActiveItem",value:function(){return null!=this.activeIndex?this.items[this.activeIndex]:null}},{key:"setOffset",value:function(e){var n=document.documentElement;if(n){var r=this.el.offsetWidth;if(e.left){var o=this.option.dynamicWidth?n.scrollWidth:n.clientWidth;e.left+r>o&&(e.left=o-r),this.el.style.left="".concat(e.left,"px")}else e.right&&(e.right-r<0&&(e.right=0),this.el.style.right="".concat(e.right,"px"));var i=!1,a=this.option.placement||t.DEFAULT_DROPDOWN_PLACEMENT;if("auto"===a){var s=this.items.length*e.lineHeight;i=null!=e.clientTop&&e.clientTop+s>n.clientHeight}"top"===a||i?(this.el.style.bottom="".concat(n.clientHeight-e.top+e.lineHeight,"px"),this.el.style.top="auto"):(this.el.style.top="".concat(e.top,"px"),this.el.style.bottom="auto")}return this}},{key:"getNextActiveIndex",value:function(){if(null==this.activeIndex)throw Error();return this.activeIndex<this.items.length-1?this.activeIndex+1:this.option.rotate?0:null}},{key:"getPrevActiveIndex",value:function(){if(null==this.activeIndex)throw Error();return 0!==this.activeIndex?this.activeIndex-1:this.option.rotate?this.items.length-1:null}},{key:"renderItems",value:function(){var e=document.createDocumentFragment(),t=!0,n=!1,r=void 0;try{for(var o,i=this.items[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;e.appendChild(a.el)}}catch(e){n=!0,r=e}finally{try{!t&&null!=i.return&&i.return()}finally{if(n)throw r}}return this.el.appendChild(e),this}},{key:"setStrategyId",value:function(e){var t=e.getStrategyId();return t&&(this.el.dataset.strategy=t),this}},{key:"renderEdge",value:function(e,t){var n=this.option[t],r=document.createElement("li");return r.className="textcomplete-".concat(t),r.innerHTML="function"==typeof n?n(e.map(function(e){return e.data})):n||"",this.el.appendChild(r),this}}],[{key:"create",value:function(e){var n=document.createElement("ul");n.className=e.className||t.DEFAULT_DROPDOWN_CLASS_NAME,Object.assign(n.style,{display:"none",position:"absolute",zIndex:"1000"},e.style);var r=e.parent||document.body;return null==r||r.appendChild(n),new l(n,e)}}]),l}(c.EventEmitter);t.Dropdown=l;var f=function(){function e(n,o,i,a){var s=this;r(this,e),this.dropdown=n,this.index=o,this.searchResult=i,this.props=a,this.active=!1,this.onClick=function(e){e.preventDefault(),s.dropdown.select(s)},this.className=this.props.className||t.DEFAULT_DROPDOWN_ITEM_CLASS_NAME,this.activeClassName=this.props.activeClassName||t.DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME;var c=document.createElement("li");c.className=this.active?this.activeClassName:this.className;var u=document.createElement("span");u.tabIndex=-1,u.innerHTML=this.searchResult.render(),c.appendChild(u),c.addEventListener("click",this.onClick),this.el=c}return i(e,[{key:"destroy",value:function(){var e,t=this.el;return null===(e=t.parentNode)||void 0===e||e.removeChild(t),t.removeEventListener("click",this.onClick,!1),this}},{key:"activate",value:function(){return!this.active&&(this.active=!0,this.el.className=this.activeClassName,this.dropdown.el.scrollTop=this.el.offsetTop),this}},{key:"deactivate",value:function(){return this.active&&(this.active=!1,this.el.className=this.className),this}}]),e}()},937:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Editor=void 0;var a=n(248),s=n(125),c=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(f,e);var t,n,a,c,u,l=(t=f,n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r,i,a=o(t);return i=n?Reflect.construct(a,arguments,o(this).constructor):a.apply(this,arguments),e=this,(r=i)&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(r)||"function"==typeof r)?r:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)});function f(){return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,f),l.apply(this,arguments)}return a=f,c=[{key:"destroy",value:function(){return this}},{key:"applySearchResult",value:function(e){throw Error("Not implemented.")}},{key:"getCursorOffset",value:function(){throw Error("Not implemented.")}},{key:"getBeforeCursor",value:function(){throw Error("Not implemented.")}},{key:"emitMoveEvent",value:function(e){var t=(0,s.createCustomEvent)("move",{cancelable:!0,detail:{code:e}});return this.emit("move",t),t}},{key:"emitEnterEvent",value:function(){var e=(0,s.createCustomEvent)("enter",{cancelable:!0});return this.emit("enter",e),e}},{key:"emitChangeEvent",value:function(){var e=(0,s.createCustomEvent)("change",{detail:{beforeCursor:this.getBeforeCursor()}});return this.emit("change",e),e}},{key:"emitEscEvent",value:function(){var e=(0,s.createCustomEvent)("esc",{cancelable:!0});return this.emit("esc",e),e}},{key:"getCode",value:function(e){switch(e.keyCode){case 9:case 13:return"ENTER";case 27:return"ESC";case 38:return"UP";case 40:return"DOWN";case 78:if(e.ctrlKey)return"DOWN";break;case 80:if(e.ctrlKey)return"UP"}return"OTHER"}}],r(a.prototype,c),f}(a.EventEmitter);t.Editor=c},363:function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.SearchResult=void 0;var r=/\$&/g,o=/\$(\d)/g,i=function(){var e,t,i;function a(e,t,n){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,a),this.data=e,this.term=t,this.strategy=n}return e=a,t=[{key:"getReplacementData",value:function(e){var t=this.strategy.replace(this.data);if(null==t)return null;var n="";Array.isArray(t)&&(n=t[1],t=t[0]);var i=this.strategy.match(e);if(null==i||null==i.index)return null;var a=t.replace(r,i[0]).replace(o,function(e,t){return i[parseInt(t)]});return{start:i.index,end:i.index+i[0].length,beforeCursor:a,afterCursor:n}}},{key:"replace",value:function(e,t){var n=this.getReplacementData(e);if(null!==n)return t=n.afterCursor+t,[[e.slice(0,n.start),n.beforeCursor,e.slice(n.end)].join(""),t]}},{key:"render",value:function(){return this.strategy.renderTemplate(this.data,this.term)}},{key:"getStrategyId",value:function(){return this.strategy.getId()}}],n(e.prototype,t),a}();t.SearchResult=i},134:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.Strategy=t.DEFAULT_INDEX=void 0;var o=n(363);t.DEFAULT_INDEX=1;var i=function(){var e,n,i;function a(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,a),this.props=e,this.cache={}}return e=a,n=[{key:"destroy",value:function(){return this.cache={},this}},{key:"replace",value:function(e){return this.props.replace(e)}},{key:"execute",value:function(e,n){var r,i=this,a=this.matchWithContext(e);if(!a)return!1;var s=a[null!==(r=this.props.index)&&void 0!==r?r:t.DEFAULT_INDEX];return this.search(s,function(e){n(e.map(function(e){return new o.SearchResult(e,s,i)}))},a),!0}},{key:"renderTemplate",value:function(e,t){var n;if(this.props.template)return this.props.template(e,t);if("string"==typeof e)return e;throw Error("Unexpected render data type: ".concat(void 0===e?"undefined":(n=e)&&"undefined"!=typeof Symbol&&n.constructor===Symbol?"symbol":typeof n,". Please implement template parameter by yourself"))}},{key:"getId",value:function(){return this.props.id||null}},{key:"match",value:function(e){return"function"==typeof this.props.match?this.props.match(e):e.match(this.props.match)}},{key:"search",value:function(e,t,n){this.props.cache?this.searchWithCach(e,t,n):this.props.search(e,t,n)}},{key:"matchWithContext",value:function(e){var t=this.context(e);return!1===t?null:this.match(!0===t?e:t)}},{key:"context",value:function(e){return!this.props.context||this.props.context(e)}},{key:"searchWithCach",value:function(e,t,n){var r=this;null!=this.cache[e]?t(this.cache[e]):this.props.search(e,function(n){r.cache[e]=n,t(n)},n)}}],r(e.prototype,n),a}();t.Strategy=i},946:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Textcomplete=void 0;var a=n(248),s=n(329),c=n(344),u=["show","shown","render","rendered","selected","hidden","hide"],l=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(h,e);var t,n,a,l,f,d=(t=h,n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r,i,a=o(t);return i=n?Reflect.construct(a,arguments,o(this).constructor):a.apply(this,arguments),e=this,(r=i)&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(r)||"function"==typeof r)?r:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)});function h(e,t,n){var r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,h),(r=d.call(this)).editor=e,r.isQueryInFlight=!1,r.nextPendingQuery=null,r.handleHit=function(e){var t=e.searchResults;t.length?r.dropdown.render(t,r.editor.getCursorOffset()):r.dropdown.hide(),r.isQueryInFlight=!1,null!==r.nextPendingQuery&&r.trigger(r.nextPendingQuery)},r.handleMove=function(e){"UP"===e.detail.code?r.dropdown.up(e):r.dropdown.down(e)},r.handleEnter=function(e){var t=r.dropdown.getActiveItem();t?(r.dropdown.select(t),e.preventDefault()):r.dropdown.hide()},r.handleEsc=function(e){r.dropdown.isShown()&&(r.dropdown.hide(),e.preventDefault())},r.handleChange=function(e){null!=e.detail.beforeCursor?r.trigger(e.detail.beforeCursor):r.dropdown.hide()},r.handleSelect=function(e){r.emit("select",e),!e.defaultPrevented&&r.editor.applySearchResult(e.detail.searchResult)},r.handleResize=function(){r.dropdown.isShown()&&r.dropdown.setOffset(r.editor.getCursorOffset())},r.completer=new c.Completer(t),r.dropdown=s.Dropdown.create((null==n?void 0:n.dropdown)||{}),r.startListening(),r}return a=h,l=[{key:"destroy",value:function(){var e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];return this.completer.destroy(),this.dropdown.destroy(),e&&this.editor.destroy(),this.stopListening(),this}},{key:"isShown",value:function(){return this.dropdown.isShown()}},{key:"hide",value:function(){return this.dropdown.hide(),this}},{key:"trigger",value:function(e){return this.isQueryInFlight?this.nextPendingQuery=e:(this.isQueryInFlight=!0,this.nextPendingQuery=null,this.completer.run(e)),this}},{key:"startListening",value:function(){var e=this;this.editor.on("move",this.handleMove).on("enter",this.handleEnter).on("esc",this.handleEsc).on("change",this.handleChange),this.dropdown.on("select",this.handleSelect);var t=!0,n=!1,r=void 0;try{for(var o,i,a,s=u[Symbol.iterator]();!(t=(a=s.next()).done);t=!0)i=this,function(){var t=a.value;i.dropdown.on(t,function(n){return e.emit(t,n)})}()}catch(e){n=!0,r=e}finally{try{!t&&null!=s.return&&s.return()}finally{if(n)throw r}}this.completer.on("hit",this.handleHit),null===(o=this.dropdown.el.ownerDocument.defaultView)||void 0===o||o.addEventListener("resize",this.handleResize)}},{key:"stopListening",value:function(){var e;null===(e=this.dropdown.el.ownerDocument.defaultView)||void 0===e||e.removeEventListener("resize",this.handleResize),this.completer.removeAllListeners(),this.dropdown.removeAllListeners(),this.editor.removeListener("move",this.handleMove).removeListener("enter",this.handleEnter).removeListener("esc",this.handleEsc).removeListener("change",this.handleChange)}}],r(a.prototype,l),h}(a.EventEmitter);t.Textcomplete=l},973:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"!==n&&!Object.prototype.hasOwnProperty.call(t,n)&&r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(344),t),o(n(329),t),o(n(937),t),o(n(363),t),o(n(134),t),o(n(946),t),o(n(125),t)},125:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createCustomEvent=void 0;var n="undefined"!=typeof window&&!!window.CustomEvent;t.createCustomEvent=function(e,t){if(n)return new CustomEvent(e,t);var r=document.createEvent("CustomEvent");return r.initCustomEvent(e,!1,(null==t?void 0:t.cancelable)||!1,(null==t?void 0:t.detail)||void 0),r}},248:function(e){"use strict";var t=Object.prototype.hasOwnProperty,n="~";function r(){}function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(e,t,r,i,a){if("function"!=typeof r)throw TypeError("The listener must be a function");var s=new o(r,i||e,a),c=n?n+t:t;return e._events[c]?e._events[c].fn?e._events[c]=[e._events[c],s]:e._events[c].push(s):(e._events[c]=s,e._eventsCount++),e}function a(e,t){0==--e._eventsCount?e._events=new r:delete e._events[t]}function s(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),!new r().__proto__&&(n=!1)),s.prototype.eventNames=function(){var e,r,o=[];if(0===this._eventsCount)return o;for(r in e=this._events)t.call(e,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},s.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,i=r.length,a=Array(i);o<i;o++)a[o]=r[o].fn;return a},s.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},s.prototype.emit=function(e,t,r,o,i,a){var s=n?n+e:e;if(!this._events[s])return!1;var c,u,l=this._events[s],f=arguments.length;if(l.fn){switch(l.once&&this.removeListener(e,l.fn,void 0,!0),f){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,t),!0;case 3:return l.fn.call(l.context,t,r),!0;case 4:return l.fn.call(l.context,t,r,o),!0;case 5:return l.fn.call(l.context,t,r,o,i),!0;case 6:return l.fn.call(l.context,t,r,o,i,a),!0}for(u=1,c=Array(f-1);u<f;u++)c[u-1]=arguments[u];l.fn.apply(l.context,c)}else{var d,h=l.length;for(u=0;u<h;u++)switch(l[u].once&&this.removeListener(e,l[u].fn,void 0,!0),f){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,t);break;case 3:l[u].fn.call(l[u].context,t,r);break;case 4:l[u].fn.call(l[u].context,t,r,o);break;default:if(!c)for(d=1,c=Array(f-1);d<f;d++)c[d-1]=arguments[d];l[u].fn.apply(l[u].context,c)}}return!0},s.prototype.on=function(e,t,n){return i(this,e,t,n,!1)},s.prototype.once=function(e,t,n){return i(this,e,t,n,!0)},s.prototype.removeListener=function(e,t,r,o){var i=n?n+e:e;if(!this._events[i])return this;if(!t)return a(this,i),this;var s=this._events[i];if(s.fn)s.fn===t&&(!o||s.once)&&(!r||s.context===r)&&a(this,i);else{for(var c=0,u=[],l=s.length;c<l;c++)(s[c].fn!==t||o&&!s[c].once||r&&s[c].context!==r)&&u.push(s[c]);u.length?this._events[i]=1===u.length?u[0]:u:a(this,i)}return this},s.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&a(this,t)):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=n,s.EventEmitter=s;e.exports=s},796:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=i(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n||e):o.value}})(e,t,n||e)}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TextareaEditor=void 0;var c=n(471),u=s(n(713)),l=n(973),f=n(847),d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(v,e);var t,n,s,d,h,p=(t=v,n=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r,o,a=i(t);return o=n?Reflect.construct(a,arguments,i(this).constructor):a.apply(this,arguments),e=this,(r=o)&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(r)||"function"==typeof r)?r:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)});function v(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,v),(t=p.call(this)).el=e,t.onInput=function(){t.emitChangeEvent()},t.onKeydown=function(n){var r,o=t.getCode(n);"UP"===o||"DOWN"===o?r=t.emitMoveEvent(o):"ENTER"===o?(r=t.emitEnterEvent(),"true"===e.dataset.textcompleteStopenterpropagation&&n.stopImmediatePropagation()):"ESC"===o&&(r=t.emitEscEvent()),r&&r.defaultPrevented&&n.preventDefault()},t.startListening(),t}return s=v,d=[{key:"destroy",value:function(){return o(i(v.prototype),"destroy",this).call(this),this.stopListening(),this}},{key:"applySearchResult",value:function(e){var t=this.getBeforeCursor();if(null!=t){var n=e.replace(t,this.getAfterCursor());this.el.focus(),Array.isArray(n)&&((0,c.update)(this.el,n[0],n[1]),this.el&&this.el.dispatchEvent((0,l.createCustomEvent)("input")))}}},{key:"getCursorOffset",value:function(){var e=(0,f.calculateElementOffset)(this.el),t=this.getElScroll(),n=this.getCursorPosition(),r=(0,f.getLineHeightPx)(this.el),o=e.top-t.top+n.top+r,i=e.left-t.left+n.left,a=this.el.getBoundingClientRect().top;return"rtl"!==this.el.dir?{top:o,left:i,lineHeight:r,clientTop:a}:{top:o,right:document.documentElement?document.documentElement.clientWidth-i:0,lineHeight:r,clientTop:a}}},{key:"getBeforeCursor",value:function(){return this.el.selectionStart!==this.el.selectionEnd?null:this.el.value.substring(0,this.el.selectionEnd)}},{key:"getAfterCursor",value:function(){return this.el.value.substring(this.el.selectionEnd)}},{key:"getElScroll",value:function(){return{top:this.el.scrollTop,left:this.el.scrollLeft}}},{key:"getCursorPosition",value:function(){return(0,u.default)(this.el,this.el.selectionEnd)}},{key:"startListening",value:function(){this.el.addEventListener("input",this.onInput),this.el.addEventListener("keydown",this.onKeydown)}},{key:"stopListening",value:function(){this.el.removeEventListener("input",this.onInput),this.el.removeEventListener("keydown",this.onKeydown)}}],r(s.prototype,d),v}(l.Editor);t.TextareaEditor=d},790:function(e,t,n){"use strict";t.TextareaEditor=void 0;var r=n(796);Object.defineProperty(t,"TextareaEditor",{enumerable:!0,get:function(){return r.TextareaEditor}})},746:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.calculateElementOffset=void 0;t.calculateElementOffset=function(e){var t=e.getBoundingClientRect(),n=e.ownerDocument;if(null==n)throw Error("Given element does not belong to document");var r=n.defaultView,o=n.documentElement;if(null==r)throw Error("Given element does not belong to window");var i={top:t.top+r.pageYOffset,left:t.left+r.pageXOffset};return o&&(i.top-=o.clientTop,i.left-=o.clientLeft),i}},837:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getLineHeightPx=void 0;var n=function(e){return 48<=e&&e<=57};t.getLineHeightPx=function(e){var t=getComputedStyle(e),o=t.lineHeight;if(n(o.charCodeAt(0))){var i=parseFloat(o);return n(o.charCodeAt(o.length-1))?i*parseFloat(t.fontSize):i}return r(e.nodeName,t)};var r=function(e,t){var n,r,o=document.body;if(!o)return 0;var i=document.createElement(e);if(i.innerHTML="&nbsp;",Object.assign(i.style,{fontSize:t.fontSize,fontFamily:t.fontFamily,padding:"0"}),o.appendChild(i),n=i,null!=(r=HTMLTextAreaElement)&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?!!r[Symbol.hasInstance](n):n instanceof r)i.rows=1;var a=i.offsetHeight;return o.removeChild(i),a}},847:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"!==n&&!Object.prototype.hasOwnProperty.call(t,n)&&r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(746),t),o(n(837),t),o(n(711),t)},711:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isSafari=void 0;t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}},713:function(e){!function(){var t=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],n="undefined"!=typeof window,r=n&&null!=window.mozInnerScreenX;function o(e,o,i){if(!n)throw Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");var a=i&&i.debug||!1;if(a){var s=document.querySelector("#input-textarea-caret-position-mirror-div");s&&s.parentNode.removeChild(s)}var c=document.createElement("div");c.id="input-textarea-caret-position-mirror-div",document.body.appendChild(c);var u=c.style,l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,f="INPUT"===e.nodeName;u.whiteSpace="pre-wrap",!f&&(u.wordWrap="break-word"),u.position="absolute",!a&&(u.visibility="hidden"),t.forEach(function(e){f&&"lineHeight"===e?u.lineHeight=l.height:u[e]=l[e]}),r?e.scrollHeight>parseInt(l.height)&&(u.overflowY="scroll"):u.overflow="hidden",c.textContent=e.value.substring(0,o),f&&(c.textContent=c.textContent.replace(/\s/g,"\xa0"));var d=document.createElement("span");d.textContent=e.value.substring(o)||".",c.appendChild(d);var h={top:d.offsetTop+parseInt(l.borderTopWidth),left:d.offsetLeft+parseInt(l.borderLeftWidth),height:parseInt(l.lineHeight)};return a?d.style.backgroundColor="#aaa":document.body.removeChild(c),h}void 0!==e.exports?e.exports=o:n&&(window.getCaretCoordinates=o)}()},460:function(e,t,n){"use strict";function r(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}n.d(t,{l:function(){return s}});var o,i,a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};(o=i||(i={})).COMPONENT_READY="streamlit:componentReady",o.SET_COMPONENT_VALUE="streamlit:setComponentValue",o.SET_FRAME_HEIGHT="streamlit:setFrameHeight";var s=function(){function e(){}return e.API_VERSION=1,e.RENDER_EVENT="streamlit:render",e.events=new EventTarget,e.registeredMessageListener=!1,e.setComponentReady=function(){!e.registeredMessageListener&&(window.addEventListener("message",e.onMessageEvent),e.registeredMessageListener=!0),e.sendBackMsg(i.COMPONENT_READY,{apiVersion:e.API_VERSION})},e.setFrameHeight=function(t){if(void 0===t&&(t=document.body.scrollHeight),t!==e.lastFrameHeight)e.lastFrameHeight=t,e.sendBackMsg(i.SET_FRAME_HEIGHT,{height:t})},e.setComponentValue=function(t){var n;(function(e){var t=!1;try{t=r(e,BigInt64Array)||r(e,BigUint64Array)}catch(e){}return r(e,Int8Array)||r(e,Uint8Array)||r(e,Uint8ClampedArray)||r(e,Int16Array)||r(e,Uint16Array)||r(e,Int32Array)||r(e,Uint32Array)||r(e,Float32Array)||r(e,Float64Array)||t})(t)?(n="bytes",t=new Uint8Array(t.buffer)):r(t,ArrayBuffer)?(n="bytes",t=new Uint8Array(t)):n="json",e.sendBackMsg(i.SET_COMPONENT_VALUE,{value:t,dataType:n})},e.onMessageEvent=function(t){if(t.data.type===e.RENDER_EVENT)e.onRenderMessage(t.data)},e.onRenderMessage=function(t){var n=t.args;null==n&&(console.error("Got null args in onRenderMessage. This should never happen"),n={});var r=t.dfs&&t.dfs.length>0?e.argsDataframeToObject(t.dfs):{};n=a(a({},n),r);var o=!!t.disabled,i=t.theme;i&&c(i);var s={disabled:o,args:n,theme:i},u=new CustomEvent(e.RENDER_EVENT,{detail:s});e.events.dispatchEvent(u)},e.argsDataframeToObject=function(e){return null},e.toArrowTable=function(e){return null},e.sendBackMsg=function(e,t){window.parent.postMessage(a({isStreamlitMessage:!0,type:e},t),"*")},e}(),c=function(e){var t=document.createElement("style");document.head.appendChild(t),t.innerHTML="\n    :root {\n      --primary-color: ".concat(e.primaryColor,";\n      --background-color: ").concat(e.backgroundColor,";\n      --secondary-background-color: ").concat(e.secondaryBackgroundColor,";\n      --text-color: ").concat(e.textColor,";\n      --font: ").concat(e.font,";\n    }\n\n    body {\n      background-color: var(--background-color);\n      color: var(--text-color);\n    }\n  ")}},471:function(e,t,n){"use strict";function r(e,t,n){let r=e.value,o=t+(n||""),i=document.activeElement,a=0,s=0;for(;a<r.length&&a<o.length&&r[a]===o[a];)a++;for(;r.length-s-1>=0&&o.length-s-1>=0&&r[r.length-s-1]===o[o.length-s-1];)s++;a=Math.min(a,Math.min(r.length,o.length)-s),e.setSelectionRange(a,r.length-s);let c=o.substring(a,o.length-s);if(e.focus(),!document.execCommand("insertText",!1,c)){e.value=o;let t=document.createEvent("Event");t.initEvent("input",!0,!0),e.dispatchEvent(t)}return e.setSelectionRange(t.length,t.length),i.focus(),e}function o(e,t,n){let o=e.selectionEnd,i=e.value.substr(0,e.selectionStart)+t,a=e.value.substring(e.selectionStart,o)+(n||"")+e.value.substr(o);return r(e,i,a),e.selectionEnd=o+t.length,e}n.r(t),n.d(t,{update:function(){return r},wrapCursor:function(){return o}})}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};(()=>{"use strict";var e=n(460),t=n(973);var r=n(790),o=n(847);function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var a=function(e){var t,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=(t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,s=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,r=e}finally{try{!a&&null!=o.return&&o.return()}finally{if(s)throw r}}return i}}(t,2)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}}(t,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],s=o[1],c=Function("return "+e.search)(),u=Function("return "+e.replace)(),l=e.template&&Function("return "+e.template)(),f=e.context&&Function("return "+e.context)();return Array.isArray(r)&&r.length&&a&&s&&(c=function(e,t,n){t(r.filter(function(t){return"".concat(t[a]).toLowerCase().includes(e.toLowerCase())}))},u=function(e){return"".concat(e[s])}),{id:e.id,index:e.index,cache:e.cache,match:new RegExp(e.match),search:c,replace:u,template:l,context:f}},s=function(e,t){if(!e.area_label)throw Error("Textcomplete: No label provided.");var n=e.area_label,r=e.stop_enter_propagation||!1;if(!e.strategies||!Array.isArray(e.strategies))throw Error("Textcomplete: No strategies provided.");var o=e.strategies.map(function(e){return a(e,e.data,e.comparatorKeys)});!o.length&&console.warn("Textcomplete: No strategies provided. There will be no autocomplete.");var i={dropdown:Object.assign({},e.dropdown_option)},s="\n  :root {\n    --background-color: ".concat(t.backgroundColor,";\n    --secondary-background-color: ").concat(t.secondaryBackgroundColor,";\n    --text-color: ").concat(t.textColor,";\n    --primary-color: ").concat(t.primaryColor,";\n  };\n  ");return{label:n,strategies:o,option:i,stopEnterPropagation:r,css:s}};e.l.events.addEventListener(e.l.RENDER_EVENT,function(n){var o=s(n.detail.args,n.detail.theme),i=o.label,a=o.strategies,c=o.option,u=o.stopEnterPropagation,l=o.css,f=window.parent.document.querySelector('textarea[aria-label="'.concat(i,'"]'));if(f.textcompleteInitialized){console.warn("Textcomplete already initialized for this textarea.");return}var d=document.createElement("style");d.innerHTML=document.querySelector("style").innerHTML+"\n"+l,window.parent.document.head.appendChild(d),c.dropdown.parent=f.parentElement||window.parent.document.querySelector("#root");var h=new r.TextareaEditor(f),p=new t.Textcomplete(h,a,c);f.textcompleteInitialized=!0,f.setAttribute("data-textcomplete",JSON.stringify(n.detail.args.dropdown_option)),u&&f.setAttribute("data-textcomplete-stopenterpropagation",!0),p.on("rendered",function(){f.parentElement.querySelector(".textcomplete-dropdown").style.top="4px"}),p.on("selected",function(e){var t=e.detail.searchResult,n=f.value;delete t.strategy,console.log("Textcomplete selected",t),console.log("Text value",n)}),e.l.setFrameHeight()}),e.l.setComponentReady()})()})();
//# sourceMappingURL=index.js.map