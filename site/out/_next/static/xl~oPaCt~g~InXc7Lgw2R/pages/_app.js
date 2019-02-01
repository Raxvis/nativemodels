(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{415(e,t,n){__NEXT_REGISTER_PAGE("/_app",() => e.exports=n(416),{page:e.exports.default})},416(e,t,n){e.exports=n(417)},417(e,t,n){e.exports=n(418)},418(e,t,n){const r=n(17),u=n(4);

Object.defineProperty(t,"__esModule",{value:!0}),t.createUrl=x,t.Container=t.default=void 0;const a=u(n(45)),o=u(n(46)),i=u(n(419)),l=u(n(7)),c=u(n(8)),p=u(n(23)),s=u(n(24)),f=u(n(25)),d=u(n(14)),h=r(n(0)),v=u(n(38)),y=n(22),m=n(50),g=function(e){function t(){return(0,l.default)(this,t),(0,p.default)(this,(0,s.default)(t).apply(this,arguments))}let n;

return(0,f.default)(t,e),(0,c.default)(t,[{key:"getChildContext",value(){return{headManager:this.props.headManager,router:(0,m.makePublicRouterInstance)(this.props.router)}}},{key:"componentDidCatch",value(e){throw e}},{key:"render",value(){const e=this.props,t=e.router,n=e.Component,r=e.pageProps,u=x(t);

return h.default.createElement(k,null,h.default.createElement(n,(0,i.default)({},r,{url:u})))}}],[{key:"getInitialProps",value:(n=(0,o.default)(a.default.mark(function e(t){let n,r,u;

return a.default.wrap((e) => {for(;;)switch(e.prev=e.next){case 0:return n=t.Component,t.router,r=t.ctx,e.next=3,(0,y.loadGetInitialProps)(n,r);case 3:return u=e.sent,e.abrupt("return",{pageProps:u});case 5:case"end":return e.stop()}},e,this)})),function(e){return n.apply(this,arguments)})}]),t}(h.Component);

t.default=g,(0,d.default)(g,"childContextTypes",{headManager:v.default.object,router:v.default.object});var k=function(e){function t(){return(0,l.default)(this,t),(0,p.default)(this,(0,s.default)(t).apply(this,arguments))}return(0,f.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value(){this.scrollToHash()}},{key:"componentDidUpdate",value(){this.scrollToHash()}},{key:"scrollToHash",value(){let e=window.location.hash;

if(e=Boolean(e)&&e.substring(1)){const t=document.getElementById(e);

t&&setTimeout(() => t.scrollIntoView(),0)}}},{key:"render",value(){return this.props.children}}]),t}(h.Component);

t.Container=k;const w=(0,y.execOnce)(() => {0});

function x(e){const t=e.pathname,n=e.asPath,r=e.query;

return{get query(){return w(),r},get pathname(){return w(),t},get asPath(){return w(),n},back(){w(),e.back()},push(t,n){return w(),e.push(t,n)},pushTo(t,n){w();const r=n?t:null,u=n||t;

return e.push(r,u)},replace(t,n){return w(),e.replace(t,n)},replaceTo(t,n){w();const r=n?t:null,u=n||t;

return e.replace(r,u)}}}},419(e,t,n){const r=n(80);

function u(){return e.exports=u=r||function(e){for(let t=1;t<arguments.length;t++){const n=arguments[t];

for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}e.exports=u}},[[415,1,0]]]);