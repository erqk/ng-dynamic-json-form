"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[5],{2005:(x,i,t)=>{t.r(i),t.d(i,{PageApiComponent:()=>S});var c=t(4755),p=t(3144),m=t(1121),g=t(2076),l=t(4351),u=t(7359),d=t(4482);const h=(a,o)=>(a.push(o),a);var y=t(4004),C=t(3900),A=t(7754),n=t(2223),$=t(5112),P=t(6782);let S=(()=>{class a{constructor(e,r,s){this.http=e,this.sideNavigationPaneService=r,this.languageDataService=s,this.markdownContent$=this.getContent$()}getContent$(){const r=(0,g.D)(["form-config","input-type","input-mask","options","css-grid","extra","form-array","validators","custom-validators","conditions","custom-component","custom-ui-component"]).pipe((0,l.b)(s=>this.http.get(`assets/docs/api/api-${s}/api-${s}_${this.languageDataService.language$.value}.md`,{responseType:"text"})),function f(){return(0,d.e)((a,o)=>{(function v(a,o){return(0,d.e)((0,u.U)(a,o,arguments.length>=2,!1,!0))})(h,[])(a).subscribe(o)})}(),(0,y.U)(s=>s.join("")));return this.languageDataService.language$.pipe((0,C.w)(()=>r))}onReady(){const e=document.querySelectorAll("markdown h2");this.sideNavigationPaneService.h2$.next(Array.from(e))}}return a.\u0275fac=function(e){return new(e||a)(n.Y36(p.eN),n.Y36($.x),n.Y36(P.x))},a.\u0275cmp=n.Xpm({type:a,selectors:[["app-page-api"]],standalone:!0,features:[n.jDz],decls:3,vars:3,consts:[[3,"data","ready"]],template:function(e,r){1&e&&(n.TgZ(0,"app-content-wrapper")(1,"markdown",0),n.NdJ("ready",function(){return r.onReady()}),n.ALo(2,"async"),n.qZA()()),2&e&&(n.xp6(1),n.Q6J("data",n.lcZ(2,1,r.markdownContent$)))},dependencies:[c.ez,c.Ov,p.JF,m.JP,m.lF,A.z]}),a})()}}]);