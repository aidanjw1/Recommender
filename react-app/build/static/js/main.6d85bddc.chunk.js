(window.webpackJsonpreactapp=window.webpackJsonpreactapp||[]).push([[0],{42:function(e,t,n){e.exports=n(54)},54:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(16),o=n.n(r),i=n(26),l=n(21),u=n(23),s=n(10),m=n.n(s),p=n(20),f=n(4),d=n(77),h=n(78),E=n(72),g=n(73),b=n(80),v=n(79),y=n(55),j=function(e){var t=e.data,n=e.onSelect,r=Object(a.useState)(""),o=Object(f.a)(r,2),i=o[0],l=o[1],u=Object(a.useState)(!1),s=Object(f.a)(u,2),m=s[0],p=s[1];return t=i.length<3?[]:t.filter(function(e){return e.title.toLowerCase().includes(i.toLowerCase())}).slice(0,10),c.a.createElement("div",{style:{width:"50%",margin:"auto"}},c.a.createElement(b.a,{onClickAway:function(){l(""),p(!1)}},c.a.createElement(v.a,{type:"text",placeholder:"Search...",style:{width:"100%",fontSize:"1.5rem"},value:i,onChange:function(e){return l(e.target.value)},onFocus:function(){p(!0)}})),c.a.createElement(y.a,{style:{position:"absolute",display:m?"block":"none",zIndex:1e3}},c.a.createElement(E.a,null,t.map(function(e,t){return c.a.createElement(g.a,{key:t,onClick:function(){return n(e)},style:{cursor:"pointer"}},e.title)}))))},O=n(74),w=n(75),x=n(76),k="7cc441d4c80dc500e03786e94fd81402",S=function(e){var t=e.movie,n=e.remove,r=Object(a.useState)(""),o=Object(f.a)(r,2),l=o[0],u=o[1];return Object(a.useEffect)(function(){function e(){return(e=Object(p.a)(m.a.mark(function e(){var n,a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.themoviedb.org/3/movie/".concat(t.id,"?api_key=").concat(k,"&language=en-US"));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,u(a.poster_path);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),c.a.createElement(O.a,{style:{display:"flex",width:"100%"}},c.a.createElement(i.b,{to:"/movie/".concat(t.id)},c.a.createElement("img",{src:"https://image.tmdb.org/t/p/original/".concat(l),height:130,width:100})),c.a.createElement(w.a,null,c.a.createElement(i.b,{style:{width:"100%"},to:"/movie/".concat(t.id)},t.title," ",c.a.createElement("br",null)),n?c.a.createElement(x.a,{onClick:n,size:"small",style:{backgroundColor:"red",color:"white",margin:"1rem"}},"Remove"):null))},_=function(){var e=Object(a.useState)([]),t=Object(f.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(localStorage.getItem("_pickflix_storage")?JSON.parse(localStorage.getItem("_pickflix_storage")):[]),i=Object(f.a)(o,2),l=i[0],s=i[1],b=Object(a.useState)([]),v=Object(f.a)(b,2),y=v[0],O=v[1];Object(a.useEffect)(function(){function e(){return(e=Object(p.a)(m.a.mark(function e(){var t,n;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/movies");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,r(n);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()},[]),Object(a.useEffect)(function(){(function(){var e=Object(p.a)(m.a.mark(function e(){var t,n;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==l.length){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,fetch("/recommendations",{method:"POST",body:JSON.stringify({ids:l.map(function(e){return e.id})}),headers:{"Content-Type":"application/json"}});case 4:return t=e.sent,e.next=7,t.json();case 7:n=e.sent,O(n.recommendations);case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}})()()},[l]),Object(a.useEffect)(function(){localStorage.setItem("_pickflix_storage",JSON.stringify(l))},[l]);return 0==n.length?c.a.createElement("span",null,"Loading..."):c.a.createElement(d.a,{container:!0,spacing:2},c.a.createElement(d.a,{item:!0,xs:12},c.a.createElement(h.a,{style:{padding:"2rem"}},c.a.createElement(j,{data:n,onSelect:function(e){s([e].concat(Object(u.a)(l)))}}))),c.a.createElement(d.a,{item:!0,xs:12,md:6},c.a.createElement(h.a,null,c.a.createElement("h1",null,"My List"),c.a.createElement(E.a,null,l.map(function(e,t){return c.a.createElement(g.a,{key:t},c.a.createElement(S,{movie:e,remove:function(){return s(function(e,t){return t.filter(function(t){return t!=e})}(e,l))}}))})))),c.a.createElement(d.a,{item:!0,xs:12,md:6},c.a.createElement(h.a,null,c.a.createElement("h1",null,"Recommendations"),c.a.createElement(E.a,null,y.slice(0,10).map(function(e,t){return c.a.createElement(g.a,{key:t},c.a.createElement(S,{movie:e}))})))))},C=function(e){var t=e.match,n=Object(a.useState)([]),r=Object(f.a)(n,2),o=r[0],i=r[1],l=Object(a.useState)({}),u=Object(f.a)(l,2),s=u[0],d=u[1],E=Object(a.useState)(""),g=Object(f.a)(E,2),b=g[0],v=g[1],j=t.params.id;return Object(a.useEffect)(function(){function e(){return(e=Object(p.a)(m.a.mark(function e(){var t,n;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/recommendations/".concat(j));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,d(n.movie),i(n.recommendations);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function t(){return(t=Object(p.a)(m.a.mark(function e(){var t,n,a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.themoviedb.org/3/movie/".concat(j,"?api_key=").concat(k,"&language=en-US"));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,a=n.poster_path,v(a);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}(),function(){t.apply(this,arguments)}()},[]),0==o.length?c.a.createElement("span",null,"Loading..."):c.a.createElement("div",{style:{backgroundImage:'url("https://image.tmdb.org/t/p/original'.concat(b,"?api_key=").concat(k,'")'),height:"100vh",padding:0}},c.a.createElement(h.a,{maxWidth:"md"},c.a.createElement(y.a,{style:{padding:"1rem"}},c.a.createElement("h1",null,"Top Recommendations For: ",s.title),c.a.createElement("div",{style:{overflow:"scroll",height:"50vh"}},o.map(function(e,t){return c.a.createElement(S,{movie:e})})))))},I=function(e){var t=e.children;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{style:{backgroundColor:"black",width:"100%"}},c.a.createElement("img",{src:"/title.png",height:150,width:400})),t)},J=function(){return c.a.createElement(I,null,c.a.createElement(i.a,null,c.a.createElement(l.a,{path:"/",exact:!0,component:_}),c.a.createElement(l.a,{path:"/movie/:id",component:C})))};o.a.render(c.a.createElement(J,null),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.6d85bddc.chunk.js.map