"use strict";(()=>{var Cn=.016666666666666666,Bo={radius:10,points:56,seed:7},dc={hp:100,speed:6.2,radius:.5},fc={hp:100,speed:5,radius:.5},Rr=.5,zo=.8,Cr=.25,Zn={shots:3,interval:.08,cooldown:.5,speed:24,range:9,radius:.22,dmg:6,autoAimRange:10},Kh=3,Lt={windup:.3,cooldown:6,speed:26,range:11,radius:.45,dmg:12,slow:1.6},Bt={windup:.12,recover:.2,cooldown:7,range:3.2,halfAngle:40*Math.PI/180,dmg:10},In={base:2.4,lowHpBonus:5.6,slowedBonus:1,knockTime:.35,dashCancelAfter:.1,edgeGrace:.12},un={distance:3.6,time:.16,cooldown:3.5},Zh=.15,pc={duration:1.2,gravity:30},Et={hold:.8,protect:.2,climb:.2,landInset:1.2,lock:4,inputKeep:.15,hangOut:.45,catch:.08,landMargin:.35,searchAlong:.6,minInset:.6},Jh=2.5,Zt={windup:.3,shots:2,interval:.12,speed:15,range:9,radius:.25,dmg:6,cooldownMin:1.4,cooldownMax:2.1},Yt={windup:.65,recover:.6,cooldown:6,range:3,halfAngle:45*Math.PI/180,dmg:14},Ut={think:.15,preferMin:4.5,preferMax:7.5,edgeDanger:2.2,dodgeChance:.35,dodgeReactMin:.22,dodgeReactMax:.4,dodgeCooldown:4,edgeSaveChance:.5,edgeSaveReact:.25,strafeSwitchMin:1.5,strafeSwitchMax:2.5},Ho={basic:.025,control:.06,push:.09,enemyBasic:.03,enemyHeavy:.09,melee1:.04,melee2:.04,melee3:.07,charge:.09,counterBash:.09,counterMelee:.04},is=Math.PI/180,ye={player:{hp:100,speed:6.2,radius:.5},edgeMargin:.35,melee:[{shape:"line",range:2.2,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"line",range:2.4,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"fan",range:2,width:0,halfAngle:70*is,windup:.18,recover:.3,dmg:12,stun:0,knock:1.6,step:0}],meleeActive:.05,comboWindow:.35,attackMoveMult:.35,target:{keep:3.5,autoRange:3,autoHalfAngle:90*is},recoil:.25,charge:{windup:.1,time:.22,distance:4,cooldown:6,contact:1,autoRange:6,dmg:6,breakDur:1.2,bounce:1,bounceStun:.35,archerStun:.4,hitRecover:.15,missRecover:.3,bounceTime:.12},guard:{moveMult:.4,maxHold:2,lock:1,turnRate:720*is,blockHalfAngle:70*is,perfect:.2,perfectBreak:1,chipDmg:3,pushback:.6,arrowScan:6,threatDrop:8,pushbackTime:.1},counter:{dur:.8,bash:{range:3.2,halfAngle:40*is,dmg:14,knockMult:1.5,aimRange:3.7,recover:.2},melee:{step:.8,aimRange:3.5}},bearer:{hp:90,speed:4,frontHalfAngle:60*is,turnRate:100*is,heavyArmor:.25,approach:2.5},archer:{hp:60,speed:4.5,preferMin:6,preferMax:8,backstepTrigger:2.5,backstep:3,backstepCooldown:4,backstepTime:.25},stack:{window:1.5,hits:3,armor:.8},revive:{count:1,delay:1.5,hpFrac:.5,protect:1.5,edge:1.5,enemyClear:3,grid:.25},waves:{list:[["archer","archer"],["shieldbearer","archer"],["shieldbearer","shieldbearer","archer"]],gap:1.5,markLead:.8,minPlayerDist:5,minEdge:1.5,spacing:1.5,grid:.5},killEdge:2,inputBuffer:.15},ss="v0.4.1";function Vo(){let s=Bo.points,e=Bo.radius,t=Bo.seed,n=[];for(let i=0;i<s;i++){let r=i/s*Math.PI*2,o=e*(1+.07*Math.sin(3*r+t)+.05*Math.sin(5*r+t*2.1)+.03*Math.sin(9*r+t*.7));n.push({x:Math.cos(r)*o,z:Math.sin(r)*o})}return{poly:n,radius:e,rocks:[{pos:{x:-2.6,z:-3},r:1.3},{pos:{x:3.6,z:2.6},r:.85}]}}function Jf(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let r=e[n],o=e[i];r.z>s.z!=o.z>s.z&&s.x<(o.x-r.x)*(s.z-r.z)/(o.z-r.z)+r.x&&(t=!t)}return t}function Nt(s,e){let t=1/0;for(let n=0,i=e.length-1;n<e.length;i=n++)t=Math.min(t,Ni(s,e[i],e[n]));return Jf(s,e)?t:-t}function Ni(s,e,t){let n=t.x-e.x,i=t.z-e.z,r=n*n+i*i,o=r===0?0:Math.max(0,Math.min(1,((s.x-e.x)*n+(s.z-e.z)*i)/r)),a=e.x+n*o-s.x,l=e.z+i*o-s.z;return Math.hypot(a,l)}function As(s,e,t,n){return Ni(t,s,e)<n}var Ge=(s,e)=>({x:s.x+e.x,z:s.z+e.z}),je=(s,e)=>({x:s.x-e.x,z:s.z-e.z}),ie=(s,e)=>({x:s.x*e,z:s.z*e}),st=s=>Math.hypot(s.x,s.z),pt=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z),zt=(s,e)=>s.x*e.x+s.z*e.z;function xe(s){let e=Math.hypot(s.x,s.z);return e>1e-9?{x:s.x/e,z:s.z/e}:{x:0,z:0}}var Rs=s=>({x:Math.cos(s),z:Math.sin(s)}),an=s=>Math.atan2(s.z,s.x),dn=s=>({x:-s.z,z:s.x});function Cs(s,e){let t=Math.cos(e),n=Math.sin(e);return{x:s.x*t-s.z*n,z:s.x*n+s.z*t}}function jh(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function tu(s,e){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0},wantHeavy:!1,seen:new Set,dodge:null,edgeSaveAt:null,edgeSaveRolled:!1,aggression:e==="1v2"?.18:.28}}var jf=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null});function Qh(s,e,t,n){let i=xe(dn(t)),r=Ge(e.pos,ie(i,n)),o=Ge(e.pos,ie(i,-n)),a=s.edgeDistance(r),l=s.edgeDistance(o);return Math.max(a,l)<1.2?xe(ie(e.pos,-1)):a>=l?i:ie(i,-1)}function nu(s,e,t,n){let i=jf(),r=s.state,o=s.player,a=r.time;if(!o||o.state==="dead"||o.state==="falling")return i;if(e.state==="knocked")return t.edgeSaveRolled||(t.edgeSaveRolled=!0,zt(xe(e.knockVel),xe(e.pos))>.3&&t.rng()<Ut.edgeSaveChance&&(t.edgeSaveAt=a+Ut.edgeSaveReact)),t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&s.edgeDistance(e.pos)<2.5&&(t.edgeSaveAt=null,i.dash=!0,i.dashDir=xe(ie(e.pos,-1))),i;t.edgeSaveRolled=!1,t.edgeSaveAt=null;for(let d of s.pendingProjectiles()){if(d.team===e.team)continue;let f=`p${d.id}`;if(t.seen.has(f))continue;t.seen.add(f);let v=je(e.pos,d.pos),b=zt(v,d.dir);b<=0||b>8||Math.abs(v.x*d.dir.z-v.z*d.dir.x)>e.radius+d.radius+.3||eu(s,e,t,d.dir,d.kind==="control"?.9:.35)}if(o.windup&&o.windup.skill==="control"){let d=`w${o.id}:${(a-o.windup.t).toFixed(2)}`;if(!t.seen.has(d)){t.seen.add(d);let f=je(e.pos,o.pos),v=zt(f,o.windup.dir),b=Math.abs(f.x*o.windup.dir.z-f.z*o.windup.dir.x);v>0&&v<Lt.range&&b<e.radius+Lt.radius+.3&&eu(s,e,t,o.windup.dir,1)}}if(t.seen.size>400&&t.seen.clear(),t.dodge&&a>=t.dodge.at){if(t.dodge.dash)return e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup")&&(i.dash=!0,i.dashDir=t.dodge.dir),t.dodge=null,i;if(a<t.dodge.until)return i.move=t.dodge.dir,i;t.dodge=null}if(e.state!=="idle")return i.move=ie(t.move,.5),i;t.thinkT-=n,t.strafeT-=n;let l=je(o.pos,e.pos),c=st(l),h=xe(l),u=s.edgeDistance(e.pos);if(t.thinkT<=0){t.thinkT=Ut.think,t.strafeT<=0&&(t.strafeT=Ut.strafeSwitchMin+(Ut.strafeSwitchMax-Ut.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1)),!t.wantHeavy&&e.cooldowns.push<=0&&s.heavyOwner===null&&t.rng()<t.aggression&&(t.wantHeavy=!0);let d,f=ie(dn(h),t.strafeDir);if(u<Ut.edgeDanger)d=xe(Ge(ie(xe(ie(e.pos,-1)),1.4),ie(f,.5)));else if(t.wantHeavy)d=h;else if(c>Ut.preferMax)d=xe(Ge(h,ie(f,.4)));else if(c<Ut.preferMin){let v=ie(h,-1);d=s.edgeDistance(Ge(e.pos,ie(v,2)))<Ut.edgeDanger+.5?f:xe(Ge(v,ie(f,.5)))}else d=f;s.edgeDistance(Ge(e.pos,ie(d,1.5)))<Ut.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,d=xe(ie(e.pos,-1)));for(let v of r.island.rocks){let b=Ge(e.pos,ie(d,1.2));pt(b,v.pos)<v.r+e.radius+.3&&(d=xe(Ge(d,ie(dn(xe(je(v.pos,e.pos))),t.strafeDir*1.5))))}t.move=d}if(i.move=t.move,t.wantHeavy){if(s.heavyOwner!==null&&s.heavyOwner!==e.id)t.wantHeavy=!1;else if(c<Yt.range-.4&&e.cooldowns.push<=0)return t.wantHeavy=!1,i.cast={skill:"push",dir:h},i}else if(e.cooldowns.basic<=0&&c<Zt.range-.5&&s.lineOfSight(e.pos,o.pos)){let d=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Cs(h,d)}return i}function eu(s,e,t,n,i){if(t.dodge)return;let r=Ut.dodgeReactMin+(Ut.dodgeReactMax-Ut.dodgeReactMin)*t.rng(),o=t.rng(),a=s.state.time;o<Ut.dodgeChance*i&&e.cooldowns.dash<=0?t.dodge={at:a+r,dir:Qh(s,e,n,un.distance),dash:!0,until:0}:o<(Ut.dodgeChance+.3)*i&&(t.dodge={at:a+r,dir:Qh(s,e,n,1.5),dash:!1,until:a+r+.35})}function ru(s){return{rng:s,delay:.3,cursor:0,cdEst:{push:null,control:null,dash:null},strategy:"kite",until:0,reason:"start",distErr:1,risky:!1,preDashed:!1,myControlHitT:-99,edgeSaveAt:null,knockSeenT:-99,lastPerceived:null,moveDir:null,climbAt:null,lastEngageT:0,rockShots:0,stalls:[],decisions:[]}}var Qf=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null}),Ir=Bt.range+.5,ep=.5;function ou(s,e,t){let n=Qf(),i=s.state,r=e,o=s.player,a=i.time,l=t.rng,c=a-t.delay;for(let{t:k,e:C}of s.log)if(!(k<=t.cursor||k>c)){if("ownerId"in C&&C.ownerId===o.id){let z=(l()*2-1)*ep;C.type==="cast"&&C.skill==="push"?t.cdEst.push=k+Bt.cooldown+z:C.type==="shoot"&&C.kind==="control"?t.cdEst.control=k+Lt.cooldown+z:C.type==="dash"&&(t.cdEst.dash=k+un.cooldown+z,t.lastEngageT=a)}C.type==="hit"&&(C.sourceId===r.id&&C.kind==="control"&&(t.myControlHitT=k),(C.sourceId===r.id||C.targetId===r.id)&&(t.lastEngageT=a)),C.type==="blocked"&&C.ownerId===r.id&&t.rockShots++}if(t.cursor=Math.max(t.cursor,c),r.state==="ledge")return t.climbAt===null&&(t.climbAt=a-r.stateT+.2+l()*.15),a>=t.climbAt&&(t.climbAt=null,n.dash=!0),n;if(t.climbAt=null,r.state==="climb")return n;let h=s.snapshotAt(c);if(!h)return n;t.lastPerceived=h.pos;let u=s.snapshotAt(c-.1),d=u&&h.t-u.t>.05?ie(je(h.pos,u.pos),1/(h.t-u.t)):{x:0,z:0},f=k=>{let C=ie(d,t.delay+k);return st(C)>3&&(C=ie(xe(C),3)),Ge(h.pos,C)};if(h.state==="falling"||h.state==="dead")return n;if(r.state==="knocked"){if(t.knockSeenT!==r.stateT&&r.stateT<.02){t.knockSeenT=r.stateT;let k=zt(xe(r.knockVel),xe(r.pos))>.2&&s.edgeDistance(r.pos)<4;t.edgeSaveAt=k&&r.cooldowns.dash<=0?a+.18+l()*.17:null}return t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&(t.edgeSaveAt=null,n.dash=!0,n.dashDir=xe(ie(r.pos,-1))),n}if(t.edgeSaveAt=null,r.state!=="idle"&&r.state!=="windup"&&r.state!=="recover")return n;let v=pt(r.pos,h.pos),b=v*t.distErr,g=xe(je(h.pos,r.pos)),p=s.lineOfSight(r.pos,h.pos),m=s.edgeDistance(r.pos),x=t.cdEst.push===null||a>=t.cdEst.push,y=r.cooldowns.push<=0,E=r.cooldowns.control<=0,T=r.cooldowns.dash<=0;if(h.state==="ledge"&&(r.state==="idle"||r.state==="recover"))return n.move=su(s,r,t,iu(s,r,g),6),y&&b<=Ir-.3&&r.state==="idle"?(n.cast={skill:"push",dir:Pr(r.pos,h.pos,l,4,r.facing)},t.lastEngageT=a):p&&r.state==="idle"&&(n.fire=!0,n.fireDir=Pr(r.pos,h.pos,l,8,r.facing)),n;let L="";m<1.5&&(L="edge");let R=h.windup;if(R&&(R.skill==="push"||R.skill==="control")&&h.t-R.startT<R.dur+.05){let k=je(r.pos,h.pos),C=zt(k,R.dir),z=Math.abs(k.x*R.dir.z-k.z*R.dir.x),W=R.skill==="push"?Ir:Lt.range;C>0&&C<W&&z<(R.skill==="push"?2.2:1.2)&&(L="threat")}if(L==="threat"&&T&&l()<.6){let k=xe(dn(R.dir)),C=Ge(r.pos,ie(k,un.distance)),z=Ge(r.pos,ie(k,-un.distance));return n.dash=!0,n.dashDir=s.edgeDistance(C)>=s.edgeDistance(z)?k:ie(k,-1),t.lastEngageT=a,n}if(a>=t.until||L==="edge"&&t.strategy!=="retreat"){t.delay=.25+l()*.15,t.distErr=1+(l()*2-1)*.08,t.risky=l()<.25,t.preDashed=!1;let k=a-t.myControlHitT<1.5,C={approach:.35+(x?0:.45)+(y?.15:-.4)+(h.slowed?.3:0)+(k?.4:0)+(t.risky?.5:0),kite:.45+(b<3.5?.2:0)+(x?.15:0),flank:.25+(p?0:.35),retreat:L==="edge"?5:m<2.5?.6:0},z="kite",W=-1/0;for(let K of Object.keys(C)){let j=C[K]+l()*.35;j>W&&(W=j,z=K)}t.strategy=z,t.until=a+1+l()*1,t.reason=L==="edge"?"\u9760\u8FD1\u5CF6\u7DE3":`\u5C0D\u624B\u9707\u64CA${x?"\u53EF\u80FD\u53EF\u7528":"\u4F30\u8A08\u51B7\u537B\u4E2D"}${t.risky?"\uFF08\u5192\u96AA\uFF09":""}${k?"\u3001\u525B\u675F\u7E1B\u547D\u4E2D":""}`,t.decisions.push({t:a,strategy:z,reason:t.reason}),t.decisions.length>400&&t.decisions.shift()}let S={x:0,z:0},w=xe(ie(r.pos,-1));switch(t.strategy){case"approach":S=g,y&&b<=Ir-.3&&r.state==="idle"&&(n.cast={skill:"push",dir:Pr(r.pos,f(Bt.windup),l,4,r.facing)},t.lastEngageT=a);break;case"kite":{let k=b<5?ie(g,-1):b>7?g:{x:0,z:0};if(S=xe(Ge(k,ie(dn(g),.8))),!t.preDashed&&T&&x&&b<Ir+.4&&l()<.3)return t.preDashed=!0,n.dash=!0,n.dashDir=xe(Ge(ie(g,-1),ie(w,.5))),t.lastEngageT=a,n;break}case"flank":S=xe(Ge(ie(dn(g),1),ie(g,.3)));break;case"retreat":S=w;break}S=iu(s,r,S);let A=t.decisions.length>0&&t.decisions[t.decisions.length-1].t===a;return S=su(s,r,t,S,A?1/0:v<Ir+1?6:1),n.move=S,r.state==="idle"&&!n.cast&&p&&(E&&b>4&&b<Lt.range-1&&t.strategy!=="retreat"&&l()<.02?(n.cast={skill:"control",dir:Pr(r.pos,f(Lt.windup+b/Lt.speed),l,8,r.facing)},t.lastEngageT=a):b<Zn.range-.5&&(n.fire=!0,n.fireDir=Pr(r.pos,f(b/Zn.speed),l,8,r.facing),b<Zn.range-1&&(t.lastEngageT=a))),a-t.lastEngageT>8&&(t.stalls.push({t:a,strategy:t.strategy,reason:t.reason,dist:Math.round(v*10)/10,los:p,rockShots:t.rockShots}),t.lastEngageT=a,t.rockShots=0),n}function Pr(s,e,t,n,i){let r=(t()*2-1)*(n*Math.PI)/180,o=je(e,s);return Cs(st(o)>1e-6?xe(o):{x:Math.cos(i),z:Math.sin(i)},r)}function iu(s,e,t){if(st(t)<.01)return t;let n=xe(t);s.edgeDistance(Ge(e.pos,ie(n,1.5)))<1.6&&(n=xe(Ge(n,ie(xe(ie(e.pos,-1)),1.5))));for(let i of s.state.island.rocks)if(pt(Ge(e.pos,ie(n,1.2)),i.pos)<i.r+e.radius+.3){let r=dn(xe(je(i.pos,e.pos)));n=xe(Ge(n,ie(zt(r,n)>=0?r:ie(r,-1),1.5)))}return n}var tp=420*Math.PI/180/60;function su(s,e,t,n,i){if(st(n)<.01)return n;let r=xe(n);if(!t.moveDir)return t.moveDir=r,r;let o=Math.atan2(t.moveDir.z,t.moveDir.x),l=Math.atan2(r.z,r.x)-o;for(;l>Math.PI;)l-=2*Math.PI;for(;l<-Math.PI;)l+=2*Math.PI;let c=s.edgeDistance(Ge(e.pos,ie(t.moveDir,1.2)))<1.2,h=tp*Math.max(i,c?3:1),u=o+Math.max(-h,Math.min(h,l));return t.moveDir={x:Math.cos(u),z:Math.sin(u)},t.moveDir}var rs={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null},Dt=class s{constructor(e,t=1,n="s0",i=2.6){this.aiEnabled=!0;this.hitstop=0;this.coverOverride=null;this.heavyOwner=null;this.events=[];this.nextId=1;this.bursts=new Map;this.ai=new Map;this.mirror=new Map;this.outsideT=new Map;this.dashMoved=new Map;this.dashBuf=new Map;this.outSource=new Map;this.ledge=new Map;this.ledgeLock=new Map;this.edgeRec=new Map;this.fallVel=new Map;this.lastHitKind=new Map;this.controlMark=new Map;this.ended=!1;this.log=[];this.history=[];this.rng=jh(t);let r=Vo(),o=n!=="s0"?"hunter":"s0enemy",a=[this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"hunter")];e==="1v1"?a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:.5,z:-4.5},Math.PI/2,o)):e!=="waves"&&(a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:-3.8,z:-4.2},Math.PI/2,o)),a.push(this.makeFighter("enemy",2,"\u6A58\u7375\u624B",{x:4.6,z:-3},Math.PI/2,o)));for(let l of a)l.team==="enemy"&&(l.kit==="hunter"?this.mirror.set(l.id,ru(this.rng)):this.ai.set(l.id,tu(this.rng,e)));this.state={time:0,mode:e,variant:n,island:r,fighters:a,projectiles:[],playerId:a[0].id,result:null,loseText:null,ledgeDepth:n==="v3"?i:null,edgeLog:[],stats:{shotsFired:0,shotsHit:0,combos:0,kills:{fall:0,hp:0}}}}makeFighter(e,t,n,i,r,o){let a=o==="hunter",l=a?dc:fc,c=a?{basic:Zn.cooldown,control:Lt.cooldown,push:Bt.cooldown,dash:un.cooldown}:{basic:Zt.cooldownMax,control:0,push:Yt.cooldown,dash:Ut.dodgeCooldown};return{id:this.nextId++,team:e,variant:t,kit:o,name:n,pos:{...i},y:0,facing:r,moveVel:{x:0,z:0},radius:l.radius,hp:l.hp,maxHp:l.hp,state:"idle",stateT:0,windup:null,burstLeft:0,cooldowns:{basic:0,control:0,push:a?0:2.5,dash:0},cooldownMax:c,slowT:0,invulnT:0,hitFlashT:0,sinceShotT:99,knockVel:{x:0,z:0},deathCause:null,lastHitBy:null,lastHitAt:-99}}get player(){return this.state.fighters[0]}fighter(e){return this.state.fighters.find(t=>t.id===e)}drainEvents(){let e=this.events;return this.events=[],e}emit(e){this.events.push(e),this.log.push({t:this.state?this.state.time:0,e})}recordHistory(){let e=this.player,t=this.state.time;for(this.history.push({t,pos:{...e.pos},facing:e.facing,state:e.state,windup:e.windup?{skill:e.windup.skill,dir:{...e.windup.dir},startT:t-e.windup.t,dur:e.windup.dur}:null,slowed:e.slowT>0});this.history.length&&this.history[0].t<t-1.5;)this.history.shift();for(;this.log.length&&this.log[0].t<t-3;)this.log.shift()}snapshotAt(e){for(let t=this.history.length-1;t>=0;t--)if(this.history[t].t<=e+1e-9)return this.history[t];return null}static alive(e){return e.state!=="dead"&&e.state!=="falling"&&e.state!=="reviving"}canLedge(e){return this.state.variant==="v3"}step(e){let t=this.state,n=Cn;t.time+=n;for(let i of t.fighters)this.tickTimers(i,n);for(let i of t.fighters){if(!s.alive(i))continue;let r;this.ended?r=rs:i.team==="player"?r=e:this.aiEnabled?i.kit==="hunter"?r=ou(this,i,this.mirror.get(i.id)):r=nu(this,i,this.ai.get(i.id),n):r=rs,this.control(i,r)}for(let i of t.fighters)this.advance(i,n);this.separate(),this.moveProjectiles(n),this.checkEnd(),this.recordHistory()}tickTimers(e,t){e.stateT+=t;for(let n of["basic","control","push","dash"])e.cooldowns[n]=Math.max(0,e.cooldowns[n]-t);e.slowT=Math.max(0,e.slowT-t),e.invulnT=Math.max(0,e.invulnT-t),e.hitFlashT=Math.max(0,e.hitFlashT-t),e.sinceShotT+=t}setState(e,t){e.state=t,e.stateT=0}facingDir(e){return Rs(e.facing)}autoTarget(e,t){let n=null,i=1/0;for(let r of this.state.fighters){if(r.team===e.team||!s.alive(r))continue;let o=pt(e.pos,r.pos);if(o>t)continue;let a=o+(this.lineOfSight(e.pos,r.pos)?0:6);a<i&&(i=a,n=r)}return n}lineOfSight(e,t){return!this.state.island.rocks.some(n=>As(e,t,n.pos,n.r))}aimOrAuto(e,t,n){if(t&&st(t)>.01)return xe(t);if(e.team==="enemy"&&e.kit==="hunter")return this.facingDir(e);let i=this.autoTarget(e,n);return i?xe(je(i.pos,e.pos)):this.facingDir(e)}control(e,t){if(e.state==="ledge"){e.moveVel={x:0,z:0},t.dash&&this.startClimb(e,"accepted@"+this.state.time.toFixed(2));return}if(e.state==="climb"){e.moveVel={x:0,z:0};return}if(this.state.variant!=="s0"){if(this.controlDashBuffered(e,t))return}else if(t.dash&&e.cooldowns.dash<=0&&this.canDash(e)){this.startDash(e,t);return}if(e.state==="idle"&&t.cast){if(e.kit==="hunter"){let n=t.cast.skill;if(e.cooldowns[n]<=0){let i=n==="control"?Lt.range:Bt.range+2;this.startWindup(e,n,this.aimOrAuto(e,t.cast.dir,i),n==="control"?Lt.windup:Bt.windup);return}}else if(t.cast.skill==="push"&&e.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===e.id)){this.heavyOwner=e.id,this.startWindup(e,"enemyHeavy",this.aimOrAuto(e,t.cast.dir,6),Yt.windup);return}}if(e.state==="idle"&&t.fire&&e.burstLeft===0&&e.cooldowns.basic<=0)if(e.kit==="hunter"){let n=this.aimOrAuto(e,t.fireDir,Zn.autoAimRange);e.burstLeft=Zn.shots,e.cooldowns.basic=Zn.cooldown,this.bursts.set(e.id,{dir:n,timer:0,kind:"basic"}),e.facing=an(n)}else{this.startWindup(e,"enemyBasic",this.aimOrAuto(e,t.fireDir,Zt.range),Zt.windup);return}if(e.state==="idle"||e.state==="windup"||e.state==="recover"){let n=t.move,i=st(n);i>1&&(n=ie(n,1/i));let r=e.kit==="hunter"?dc.speed:fc.speed;e.slowT>0&&(r*=Rr),e.burstLeft>0&&(r*=zo),e.state==="windup"&&(r*=Cr),e.state==="recover"&&(r*=.3),e.moveVel=ie(n,r);let o=e.team==="enemy"&&e.kit==="hunter"&&e.sinceShotT<.6;e.state==="idle"&&e.burstLeft===0&&i>.1&&!o&&(e.facing=an(n))}else e.moveVel={x:0,z:0}}canDash(e){return e.state==="idle"||e.state==="windup"||e.state==="knocked"&&e.stateT>=In.dashCancelAfter}controlDashBuffered(e,t){if(t.dash){let i=t.dashDir&&st(t.dashDir)>.01?xe(t.dashDir):st(t.move)>.2?xe(t.move):this.facingDir(e);e.cooldowns.dash>0?this.canLedge(e)?this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!1}):this.dashBuf.delete(e.id):this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!0})}let n=this.dashBuf.get(e.id);return n?this.state.time-n.at>Zh+1e-9?(this.dashBuf.delete(e.id),!1):e.state==="knocked"&&e.stateT<In.dashCancelAfter||!n.dashOk?!1:e.cooldowns.dash>0||!this.canDash(e)?(this.canLedge(e)?n.dashOk=!1:this.dashBuf.delete(e.id),!1):(this.dashBuf.delete(e.id),this.startDash(e,{...rs,dashDir:n.dir}),!0):!1}predictedKnockStop(e){let t={...e.pos},n=e.stateT;for(;n<In.knockTime-1e-9;){n+=Cn;let i=1-Math.min(1,n/In.knockTime);t=Ge(t,ie(e.knockVel,Cn*i))}return t}nearestEdgePoint(e){let t=this.state.island.poly,n=t[0],i=1/0;for(let r=0,o=t.length-1;r<t.length;o=r++){let a=t[o],l=t[r],c=je(l,a),h=zt(c,c),u=h===0?0:Math.max(0,Math.min(1,zt(je(e,a),c)/h)),d=Ge(a,ie(c,u)),f=pt(e,d);f<i&&(i=f,n=d)}return n}climbPathOk(e,t,n){return Nt(n,this.state.island.poly)>=Et.landMargin&&this.state.island.rocks.every(i=>pt(n,i.pos)>=i.r+e.radius&&Ni(i.pos,t,n)>=i.r+e.radius)}findLanding(e,t,n,i){let r={x:-n.z,z:n.x},o=(a,l)=>this.climbPathOk(e,i??a,l);for(let a of[Et.landInset,(Et.landInset+Et.minInset)/2,Et.minInset])for(let l of[0,.2,-.2,.4,-.4,Et.searchAlong,-Et.searchAlong]){let c=t,h=n;if(l!==0){let f=Ge(Ge(t,ie(r,l)),ie(n,-.5));c=this.nearestEdgePoint(f);let v=je(c,f);if(st(v)<1e-6)continue;h=xe(v)}let u=Ge(c,ie(h,-Et.hangOut)),d=Ge(c,ie(h,a));if(o(u,d))return{edge:c,inward:h,land:d}}return null}tryLedge(e,t){let n=this.state,i=n.ledgeDepth??2.6,r=this.edgeRec.get(e.id),o=this.outSource.get(e.id)??"knock";r||(r={t:Math.round(n.time*100)/100,who:e.name,source:o,depth:null,basis:null,eligible:!1,reason:null,input:"none",outcome:"pending"},this.edgeRec.set(e.id,r),n.edgeLog.push(r),n.edgeLog.length>20&&n.edgeLog.shift());let a=r,l=m=>(a.eligible=!1,a.reason=m,!1);if(o==="dash")return l("dash-out");let c=t==="predicted"?this.predictedKnockStop(e):e.pos,h=-Nt(c,n.island.poly);a.depth=h,a.basis=t;let u=this.ledgeLock.get(e.id);if(u&&(n.time<u.until-1e-9||!u.landed))return l("locked");if(h>i)return l("too-deep");let d=this.nearestEdgePoint(e.pos),f=je(d,e.pos),v=st(f)>1e-6?xe(f):xe(ie(e.pos,-1)),b=this.findLanding(e,d,v);if(!b)return l("no-landing");a.eligible=!0,a.reason=null;let g=Ge(b.edge,ie(b.inward,-Et.hangOut));this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel={x:0,z:0},e.moveVel={x:0,z:0},e.facing=an(b.inward),e.invulnT=Math.max(e.invulnT,Et.protect),this.outsideT.set(e.id,0),this.ledge.set(e.id,{start:{...e.pos},hang:g,edge:b.edge,inward:b.inward,land:b.land,climbFrom:null,climbQueued:!1,rec:a}),this.ledgeLock.set(e.id,{until:n.time+Et.lock,landed:!1}),this.setState(e,"ledge"),this.emit({type:"ledgeGrab",ownerId:e.id,pos:g,edge:b.edge,inward:b.inward,depth:h});let p=this.dashBuf.get(e.id);return this.dashBuf.delete(e.id),p&&n.time-p.at<=Et.inputKeep+1e-9&&this.startClimb(e,"buffered@"+p.at.toFixed(2)),!0}startClimb(e,t){let n=this.ledge.get(e.id);if(!n||n.climbQueued)return;n.rec.input=t;let i={...e.pos};if(!this.climbPathOk(e,i,n.land)){let r=this.findLanding(e,n.edge,n.inward,i);if(r)n.land=r.land;else{n.climbQueued=!0;return}}this.beginClimb(e,i)}beginClimb(e,t){let n=this.ledge.get(e.id);n.climbFrom={...t},this.setState(e,"climb"),this.emit({type:"ledgeClimb",ownerId:e.id,from:{...t},to:{...n.land}})}dropLedge(e,t,n){let i=this.ledge.get(e.id);i&&(i.rec.outcome=t),this.edgeRec.delete(e.id),this.emit({type:"ledgeDrop",ownerId:e.id,reason:t}),this.startFall(e,ie(xe(n),2))}onBackOnIsland(e){let t=this.edgeRec.get(e.id);t&&t.outcome==="pending"&&(t.outcome="rescue"),this.edgeRec.delete(e.id),this.outSource.delete(e.id)}startWindup(e,t,n,i){e.windup={skill:t,t:0,dur:i,dir:n},e.facing=an(n),this.setState(e,"windup"),this.emit({type:"windupStart",ownerId:e.id,skill:t,dir:n,dur:i})}cancelWindup(e){e.windup&&(this.emit({type:"cancel",ownerId:e.id,skill:e.windup.skill}),e.windup.skill==="enemyHeavy"&&this.heavyOwner===e.id&&(this.heavyOwner=null),e.windup=null)}startDash(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id);let n=t.dashDir&&st(t.dashDir)>.01?xe(t.dashDir):null;!n&&st(t.move)>.2&&(n=xe(t.move)),n||(n=this.facingDir(e)),e.state==="knocked"&&Nt(e.pos,this.state.island.poly)<2.5&&this.emit({type:"edgeSave",ownerId:e.id}),this.outSource.set(e.id,e.state==="knocked"?"knock":"dash"),e.knockVel=ie(n,un.distance/un.time),e.facing=an(n),e.cooldowns.dash=e.cooldownMax.dash,e.invulnT=un.time+.04,this.dashMoved.set(e.id,0),this.outsideT.set(e.id,0),this.setState(e,"dash"),this.emit({type:"dash",ownerId:e.id,from:{...e.pos},dir:n})}advance(e,t){let n=this.state.island.poly;switch(e.state){case"dead":return;case"falling":{let i=this.fallVel.get(e.id)??{x:0,z:0};e.pos=Ge(e.pos,ie(i,t)),e.y=-.5*pc.gravity*e.stateT*e.stateT,e.stateT>=pc.duration&&this.die(e,"fall");return}case"windup":{let i=e.windup;i.t+=t,this.walk(e,t),i.t>=i.dur&&this.releaseWindup(e);break}case"recover":this.walk(e,t),e.stateT>=(e.kit==="hunter"?Bt.recover:Yt.recover)&&this.setState(e,"idle");break;case"dash":{let i=this.dashMoved.get(e.id)??0,r=Math.min(t,un.time-i);if(e.pos=Ge(e.pos,ie(e.knockVel,r)),this.dashMoved.set(e.id,i+r),this.pushOutOfRocks(e),i+r>=un.time-1e-9){let o=xe(e.knockVel);if(e.knockVel={x:0,z:0},Nt(e.pos,n)<0){if(this.canLedge(e)&&this.tryLedge(e,"actual"))return;this.startFall(e,ie(o,2));return}this.onBackOnIsland(e),this.setState(e,"idle")}break}case"knocked":{let i=1-Math.min(1,e.stateT/In.knockTime);if(e.pos=Ge(e.pos,ie(e.knockVel,t*i)),this.pushOutOfRocks(e),Nt(e.pos,n)<0){if(this.canLedge(e)&&(this.outsideT.get(e.id)??0)===0&&this.tryLedge(e,"predicted"))return;let r=(this.outsideT.get(e.id)??0)+t;if(this.outsideT.set(e.id,r),r>In.edgeGrace){this.startFall(e,ie(e.knockVel,.5*Math.max(i,.3)));return}}else this.outsideT.set(e.id,0);if(e.stateT>=In.knockTime){if(Nt(e.pos,n)<0){this.startFall(e,ie(xe(e.knockVel),1.5));return}e.knockVel={x:0,z:0},this.onBackOnIsland(e),this.setState(e,"idle")}break}case"ledge":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Et.catch);if(e.pos=Ge(i.start,ie(je(i.hang,i.start),r)),i.climbQueued&&r>=1){i.climbQueued=!1,this.beginClimb(e,i.hang);return}e.stateT>=Et.hold-1e-9&&this.dropLedge(e,"timeout",ie(i.inward,-1));return}case"climb":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Et.climb);e.pos=Ge(i.climbFrom,ie(je(i.land,i.climbFrom),r)),r>=1-1e-9&&(this.ledgeLock.get(e.id).landed=!0,i.rec.outcome="climbed",this.ledge.delete(e.id),this.outSource.delete(e.id),this.edgeRec.delete(e.id),this.setState(e,"idle"));return}case"idle":this.walk(e,t);break}if((e.state==="idle"||e.state==="windup"||e.state==="recover")&&Nt(e.pos,n)<0){this.startFall(e,{x:0,z:0});return}this.tickBurst(e,t)}walk(e,t){let n=this.state.island.poly,i=.35,r=Nt(e.pos,n),o=c=>{let h=Nt(c,n);return h>=i||h>=r},a=ie(e.moveVel,t);if(a.x===0&&a.z===0)return;let l=Ge(e.pos,a);if(o(l))e.pos=l;else{let c={x:e.pos.x+a.x,z:e.pos.z},h={x:e.pos.x,z:e.pos.z+a.z};o(c)?e.pos=c:o(h)&&(e.pos=h)}this.pushOutOfRocks(e)}pushOutOfRocks(e){for(let t of this.state.island.rocks){let n=je(e.pos,t.pos),i=st(n),r=t.r+e.radius;i<r&&(e.pos=Ge(t.pos,ie(i>1e-6?ie(n,1/i):{x:1,z:0},r)))}}separate(){let e=this.state.fighters.filter(t=>s.alive(t)&&t.state!=="dash"&&t.state!=="ledge"&&t.state!=="climb");for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],r=e[n],o=je(r.pos,i.pos),a=st(o),l=i.radius+r.radius;if(a<l&&a>1e-6){let c=ie(o,(l-a)/a/2),h=this.state.island.poly,u=(v,b)=>{let g=Nt(b,h);return g>=.35||g>=Nt(v.pos,h)},d=je(i.pos,c),f=Ge(r.pos,c);i.state!=="knocked"&&u(i,d)&&(i.pos=d),r.state!=="knocked"&&u(r,f)&&(r.pos=f)}}for(let t of e)this.pushOutOfRocks(t)}tickBurst(e,t){if(e.burstLeft<=0||!s.alive(e))return;let n=this.bursts.get(e.id);if(!n){e.burstLeft=0;return}if(n.timer-=t,n.timer>0)return;let i=n.kind==="basic"?Zn:Zt;this.spawnProjectile(e,n.kind,n.dir,i.speed,i.range,i.radius),e.team==="player"&&this.state.stats.shotsFired++,e.sinceShotT=0,e.burstLeft--,n.timer=i.interval,e.burstLeft<=0&&this.bursts.delete(e.id)}spawnProjectile(e,t,n,i,r,o){let a=Ge(e.pos,ie(n,e.radius+.15));this.state.projectiles.push({id:this.nextId++,kind:t,ownerId:e.id,team:e.team,pos:a,dir:{...n},speed:i,traveled:0,range:r,radius:o,alive:!0}),this.emit({type:"shoot",ownerId:e.id,kind:t,pos:{...a},dir:{...n}})}releaseWindup(e){let t=e.windup;switch(e.windup=null,t.skill){case"control":this.spawnProjectile(e,"control",t.dir,Lt.speed,Lt.range,Lt.radius),e.sinceShotT=0,e.cooldowns.control=Lt.cooldown,this.setState(e,"idle");break;case"push":this.coneStrike(e,t.dir,Bt.range,Bt.halfAngle,Bt.dmg,"push"),e.cooldowns.push=Bt.cooldown,this.setState(e,"recover");break;case"enemyBasic":{let n=Zt.cooldownMin+(Zt.cooldownMax-Zt.cooldownMin)*this.rng();e.cooldowns.basic=this.state.mode==="1v2"?n*1.4:n,e.burstLeft=Zt.shots,this.bursts.set(e.id,{dir:t.dir,timer:0,kind:"enemyBasic"}),this.setState(e,"idle");break}case"enemyHeavy":this.coneStrike(e,t.dir,Yt.range,Yt.halfAngle,Yt.dmg,"enemyHeavy"),e.cooldowns.push=Yt.cooldown,this.heavyOwner===e.id&&(this.heavyOwner=null),this.setState(e,"recover");break}}coneStrike(e,t,n,i,r,o){this.emit({type:"cast",ownerId:e.id,skill:o,pos:{...e.pos},dir:{...t}});for(let a of this.state.fighters){if(a.team===e.team||!s.alive(a))continue;let l=je(a.pos,e.pos),c=st(l);if(!(c>n+a.radius||!(c<.6||zt(ie(l,1/c),t)>=Math.cos(i)))){if(this.coverOverride??this.state.variant!=="s0"){let u=this.rockOnSegment(e.pos,a.pos);if(u){this.emit({type:"blockedStrike",ownerId:e.id,targetId:a.id,skill:o,pos:u,dir:{...t}});continue}}this.damage(a,e,o,r,t)}}}rockOnSegment(e,t){let i=1/0,r=null,o=je(t,e),a=zt(o,o);for(let l of this.state.island.rocks){if(Ni(l.pos,e,t)>=l.r-1e-6)continue;let c=je(e,l.pos),h=2*zt(c,o),u=zt(c,c)-l.r*l.r,d=Math.max(0,h*h-4*a*u),f=a>0?Math.max(0,(-h-Math.sqrt(d))/(2*a)):0;f<i&&(i=f,r=Ge(e,ie(o,f)))}return r}static knockDistance(e,t,n){return In.base+In.lowHpBonus*(1-Math.max(0,e)/t)+(n?In.slowedBonus:0)}damage(e,t,n,i,r){if(!s.alive(e)||e.invulnT>0)return!1;let o=this.state,a=e.slowT>0;e.hp=Math.max(0,e.hp-i),e.hitFlashT=.12,e.lastHitBy=t.id,e.lastHitAt=o.time,this.lastHitKind.set(e.id,n),this.state.variant!=="s0"&&n==="basic"||(this.hitstop=Math.max(this.hitstop,Ho[n])),n==="control"&&(e.slowT=Lt.slow,t.team==="player"&&this.controlMark.set(e.id,o.time));let l=0;if(r&&e.hp>0&&e.state==="ledge")return this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:{...r},dmg:i,knock:0}),this.dropLedge(e,"knocked",r),!0;if(r&&e.hp>0){if(e.state==="climb"){let c=this.ledge.get(e.id);c&&(c.rec.outcome="knocked",this.ledge.delete(e.id),this.edgeRec.delete(e.id))}this.outSource.set(e.id,"knock"),l=s.knockDistance(e.hp,e.maxHp,a),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel=ie(r,2*l/In.knockTime),e.facing=an(ie(r,-1)),this.outsideT.set(e.id,0),this.setState(e,"knocked")}if(this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:r?{...r}:xe(je(e.pos,t.pos)),dmg:i,knock:l}),n==="push"&&t.team==="player"){let c=this.controlMark.get(e.id);c!==void 0&&o.time-c<=Jh&&(o.stats.combos++,this.controlMark.delete(e.id),this.emit({type:"combo",ownerId:t.id,targetId:e.id}))}return e.hp<=0&&(this.cancelWindup(e),this.die(e,"hp")),!0}startFall(e,t){this.dashBuf.delete(e.id);let n=this.edgeRec.get(e.id);n&&n.outcome==="pending"&&(n.outcome="fall"),this.edgeRec.delete(e.id),this.ledge.delete(e.id),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),this.fallVel.set(e.id,t),e.moveVel={x:0,z:0},this.setState(e,"falling"),this.emit({type:"fall",ownerId:e.id,pos:{...e.pos}})}die(e,t){if(this.dashBuf.delete(e.id),t==="hp"){let r=this.ledge.get(e.id);r&&r.rec.outcome==="pending"&&(r.rec.outcome="hp");let o=this.edgeRec.get(e.id);o&&o.outcome==="pending"&&(o.outcome="hp"),this.ledge.delete(e.id),this.edgeRec.delete(e.id)}let n=this.state;e.deathCause=t,e.knockVel={x:0,z:0},this.setState(e,"dead");let i=e.lastHitBy!==null&&n.time-e.lastHitAt<4?e.lastHitBy:null;e.team==="enemy"&&i===n.playerId&&n.stats.kills[t]++,this.emit({type:"death",ownerId:e.id,cause:t,pos:{...e.pos},killerId:i})}moveProjectiles(e){let t=this.state;for(let n of t.projectiles){if(!n.alive)continue;let i=n.pos,r=n.speed*e,o=Ge(i,ie(n.dir,r));if(n.traveled+=r,t.island.rocks.some(c=>As(i,o,c.pos,c.r+n.radius*.5))){n.alive=!1,this.emit({type:"blocked",pos:o,kind:n.kind,ownerId:n.ownerId});continue}let a=null,l=1/0;for(let c of t.fighters)if(!(c.team===n.team||!s.alive(c)||c.invulnT>0)&&Ni(c.pos,i,o)<c.radius+n.radius){let h=pt(i,c.pos);h<l&&(l=h,a=c)}if(n.pos=o,a){n.alive=!1;let c=this.fighter(n.ownerId),h=n.kind,u=this.state.variant!=="s0"?Kh:Zn.dmg,d=n.kind==="basic"?u:n.kind==="control"?Lt.dmg:Zt.dmg;this.damage(a,c,h,d,null)&&n.team==="player"&&n.kind==="basic"&&t.stats.shotsHit++;continue}n.traveled>=n.range&&(n.alive=!1,this.emit({type:"expire",pos:o,kind:n.kind}))}t.projectiles=t.projectiles.filter(n=>n.alive)}checkEnd(){if(this.ended)return;let e=this.state,t=this.player;t.state==="dead"?(e.result="lose",e.loseText=this.loseText(t)):e.fighters.every(n=>n.team==="player"||n.state==="dead")&&(e.result="win"),e.result&&(this.ended=!0,this.dashBuf.clear(),this.emit({type:"roundEnd",result:e.result}))}loseText(e){let t=this.state,n=e.lastHitBy!==null&&t.time-e.lastHitAt<4?this.fighter(e.lastHitBy):void 0,i=this.lastHitKind.get(e.id);return e.deathCause==="fall"?n?i==="enemyHeavy"?`\u88AB${n.name}\u7684\u91CD\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u770B\u5230\u7D05\u8272\u6247\u5F62\u5C31\u5F80\u5074\u908A\u9583\uFF0C\u6216\u7528\u885D\u523A\u8EB2\u958B`:i==="push"?`\u88AB${n.name}\u7684\u9707\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u6CE8\u610F\u7260\u9760\u8FD1\u7684\u8DDD\u96E2\uFF0C\u6216\u9810\u5224\u885D\u523A\uFF1B\u88AB\u64CA\u98DB\u6642\u63D0\u65E9\u6309\u885D\u523A\u6709\u6A5F\u6703\u6551\u56DE`:`\u88AB${n.name}\u903C\u4E0B\u61F8\u5D16\u2014\u2014\u88AB\u64CA\u98DB\u6642\u53EF\u4EE5\u99AC\u4E0A\u885D\u523A\u56DE\u5CF6\u4E0A`:"\u4F60\u81EA\u5DF1\u885D\u51FA\u4E86\u61F8\u5D16\u2014\u2014\u885D\u523A\u524D\u5148\u770B\u8173\u4E0B":n?`\u751F\u547D\u88AB${n.name}\u6253\u5230\u6B78\u96F6\u2014\u2014\u5728\u7260\u51FA\u62DB\u5F8C\u7684\u7A7A\u6A94\u53CD\u64CA\uFF0C\u5225\u786C\u62DA`:"\u751F\u547D\u6B78\u96F6"}edgeDistance(e){return Nt(e,this.state.island.poly)}pendingProjectiles(){return this.state.projectiles}place(e,t,n){let i=this.fighter(e);i&&(i.pos={...t},n!==void 0&&(i.facing=n))}debugKill(e,t){let n=this.fighter(e);!n||!s.alive(n)||(t==="hp"?(n.hp=0,this.die(n,"hp")):this.startFall(n,{x:0,z:0}))}debugDamage(e,t,n,i,r){let o=this.fighter(e),a=this.fighter(t);return o&&a?this.damage(o,a,n,i,r):!1}};function au(s){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0}}}var lu=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null,face:null});function cu(s){return s.state!=="dead"&&s.state!=="falling"&&s.state!=="reviving"}function hu(s,e,t,n){let i=t;for(let r of s.state.island.rocks){let o=Ge(e.pos,ie(i,1.2));pt(o,r.pos)<r.r+e.radius+.3&&(i=xe(Ge(i,ie(dn(xe(je(r.pos,e.pos))),n*1.5))))}return i}function uu(s,e,t,n){let i=lu(),r=s.player;if(!cu(r))return i;let o=je(r.pos,e.pos),a=st(o),l=a>1e-6?ie(o,1/a):{x:Math.cos(e.facing),z:Math.sin(e.facing)};if(i.face=l,e.state!=="idle")return i;if(a<=ye.bearer.approach&&e.cooldowns.push<=0&&(s.heavyOwner===null||s.heavyOwner===e.id)&&(e.breakT??0)<=0)return i.cast={skill:"push",dir:null},i;let c=a>1.4?l:{x:0,z:0};return st(c)>0&&(c=hu(s,e,c,t.strafeDir),s.edgeDistance(Ge(e.pos,ie(c,1.2)))<.8&&(c=xe(Ge(c,ie(xe(ie(e.pos,-1)),.8))))),i.move=c,i}function du(s,e,t,n){let i=lu(),r=s.player;if(!cu(r))return i;let o=je(r.pos,e.pos),a=st(o),l=a>1e-6?ie(o,1/a):{x:1,z:0};if(e.state!=="idle")return i.move=ie(t.move,.5),i;if(a<ye.archer.backstepTrigger&&e.cooldowns.dash<=0)return i.dash=!0,i.dashDir=np(s,e,l),i;if(t.thinkT-=n,t.strafeT-=n,t.thinkT<=0){t.thinkT=Ut.think,t.strafeT<=0&&(t.strafeT=Ut.strafeSwitchMin+(Ut.strafeSwitchMax-Ut.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1));let c=ie(dn(l),t.strafeDir),h,u=ye.archer;if(r.state==="guard"&&r.shieldDir){let d=xe(dn(r.shieldDir)),f=ie(d,-1),v=Ge(r.pos,ie(d,(u.preferMin+u.preferMax)/2)),b=Ge(r.pos,ie(f,(u.preferMin+u.preferMax)/2)),g=s.edgeDistance(v)>1.5?pt(v,e.pos):1/0,p=s.edgeDistance(b)>1.5?pt(b,e.pos):1/0,m=g<=p?v:b;h=pt(m,e.pos)>.6?xe(je(m,e.pos)):c}else if(a>u.preferMax)h=xe(Ge(l,ie(c,.4)));else if(a<u.preferMin){let d=ie(l,-1);h=s.edgeDistance(Ge(e.pos,ie(d,2)))<Ut.edgeDanger+.5?c:xe(Ge(d,ie(c,.5)))}else h=c;s.edgeDistance(Ge(e.pos,ie(h,1.5)))<Ut.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,h=xe(ie(e.pos,-1))),t.move=hu(s,e,h,t.strafeDir)}if(i.move=t.move,e.cooldowns.basic<=0&&a<Zt.range-.5&&s.lineOfSight(e.pos,r.pos)){let c=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Cs(l,c)}return i}function np(s,e,t){let n=ie(t,-1),i=[n,xe(Ge(n,dn(t))),xe(je(n,dn(t))),xe(dn(t)),ie(xe(dn(t)),-1)],r=n,o=-1/0;for(let a of i){let l=s.edgeDistance(Ge(e.pos,ie(a,ye.archer.backstep)));if(a===n&&l>=1)return n;l>o&&(o=l,r=a)}return r}var xt=1e-9;function fu(s,e){let t=st(s),n=st(e);return t<1e-12||n<1e-12?Math.PI:Math.acos(Math.max(-1,Math.min(1,zt(s,e)/(t*n))))}function ip(s,e,t){let n=Math.atan2(s.x*e.z-s.z*e.x,zt(s,e));return Math.abs(n)<=t+xt?xe(e):Rs(an(s)+Math.sign(n)*t)}function sp(s,e,t){let n=e-s;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return Math.abs(n)<=t?e:s+Math.sign(n)*t}var pu={dash:0,bash:1,counterMelee:1,guard:2,throw:3,charge:3,push:3,fire:4},mu={1:"melee1",2:"melee2",3:"melee3"},mc=s=>s==="melee1"||s==="melee2"||s==="melee3",Go=class extends Dt{constructor(t=1,n="ares"){super("waves",t,"v4");this.scripted=new Map;this.fxMap=new Map;this.aiV4=new Map;this.buf=null;this.combo=null;this.comboManualDir=null;this.lastMeleeTarget=null;this.guardSt=null;this.counter=null;this.threat=null;this.waveIdx=0;this.wavePhase="fight";this.waveClearAt=0;this.waveMembers=[];this.pendingSpawns=[];this.nextId=1;let i=this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"guardian");i.hp=i.maxHp=ye.player.hp,i.radius=ye.player.radius,i.cooldowns={basic:0,control:0,push:0,dash:0},i.cooldownMax={basic:0,control:Lt.cooldown,push:n==="ares"?ye.charge.cooldown:n==="none"?Bt.cooldown:ye.guard.lock,dash:un.cooldown},i.path=n,this.initV4Fields(i),i.shieldDir=n==="mars"?Rs(i.facing):null,this.state.fighters=[i],this.state.playerId=i.id,this.state.ledgeDepth=2.6,this.state.v4={path:n,wave:{index:0,total:ye.waves.list.length,remaining:0},revivesLeft:ye.revive.count,kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0}},this.spawnWave(1,this.chooseSpawns(ye.waves.list[0].length)),this.sync(i)}initV4Fields(t){t.breakT=0,t.armorT=0,t.armorKind=null,t.shieldDir=null,t.shieldUp=!1,t.guard=null,t.counterT=0,t.counterTargetId=null,t.meleeStep=0,t.protectT=0}fx(t){let n=this.fxMap.get(t.id);return n||(n={hitstunT:0,stunKind:null,heavyArmor:!1,stackArmorT:0,stackHits:[],act:null,slide:null,noTurnUntil:-1},this.fxMap.set(t.id,n)),n}canLedge(t){return t.team==="player"}enemies(){return this.state.fighters.filter(t=>t.team==="enemy"&&Dt.alive(t))}armored(t){let n=this.fx(t);return n.heavyArmor||n.stackArmorT>0}coverOn(){return this.coverOverride??!0}step(t){let n=this.state,i=Cn;n.time+=i;for(let r of n.fighters)this.tickTimers(r,i);for(let r of n.fighters)Dt.alive(r)&&this.settle(r);for(let r of n.fighters){if(!Dt.alive(r))continue;let o;if(this.ended)o=rs;else if(r.team==="player")o=t;else{let a=this.scripted.get(r.id);a?(o=a,this.scripted.delete(r.id)):this.aiEnabled?o=this.aiFor(r):o=rs}this.control(r,o)}for(let r of n.fighters)this.advance(r,i);this.separate(),this.moveProjectiles(i),this.tickWaves(),this.checkEnd();for(let r of n.fighters)this.sync(r);this.recordHistory()}aiFor(t){let n=this.aiV4.get(t.id);return n||(n=au(this.rng),this.aiV4.set(t.id,n)),t.kit==="shieldbearer"?uu(this,t,n,Cn):du(this,t,n,Cn)}tickTimers(t,n){super.tickTimers(t,n);let i=this.fx(t);i.hitstunT=Math.max(0,i.hitstunT-n),i.stackArmorT=Math.max(0,i.stackArmorT-n),t.breakT=Math.max(0,(t.breakT??0)-n),t.protectT=Math.max(0,(t.protectT??0)-n),t.guard&&(t.guard.since+=n),(t.counterT??0)>0&&(t.counterT=Math.max(0,(t.counterT??0)-n))}settle(t){let n=this.fx(t),i=this.state.time;t.state==="hitstun"&&n.hitstunT<=xt&&(n.stunKind=null,this.setState(t,"idle")),t.state==="recover"&&n.act&&(n.act.kind==="melee"||n.act.kind==="recover")&&t.stateT>=n.act.recDur-xt?this.endRecover(t):t.state==="recover"&&(!n.act||n.act.kind!=="melee"&&n.act.kind!=="recover")&&this.endRecover(t),t.state==="idle"&&n.hitstunT>xt&&this.setState(t,"hitstun"),t.team==="player"&&(t.state==="guard"&&this.guardSt&&i-this.guardSt.raisedAt>=ye.guard.maxHold-xt&&this.lowerGuard(t,"timeout",!0),this.counter&&(t.counterT??0)<=xt&&this.loseCounter(t,this.counter.released?"timeout":"held"),this.combo&&t.state==="idle"&&i>this.combo.until+xt&&this.resetCombo(t))}endRecover(t){let n=this.fx(t),i=n.act;n.act=null,this.setState(t,"idle"),i&&i.kind==="melee"&&(i.struck||(this.lastMeleeTarget=null),this.combo&&(this.combo.until=this.state.time+ye.comboWindow))}sync(t){let n=this.fx(t);n.heavyArmor&&t.windup?(t.armorT=Math.max(0,t.windup.dur-t.windup.t),t.armorKind="heavy"):n.stackArmorT>0?(t.armorT=n.stackArmorT,t.armorKind="stack"):(t.armorT=0,t.armorKind=null),t.kit==="shieldbearer"&&(t.shieldDir=Rs(t.facing),t.shieldUp=Dt.alive(t)&&(t.breakT??0)<=0),t.team==="player"&&(t.guard&&(t.guard.perfect=t.guard.since<=ye.guard.perfect+xt),t.counterTargetId=this.counter?this.counter.targetId:null,this.counter||(t.counterT=0))}control(t,n){t.team==="player"?this.controlPlayer(t,n):this.controlEnemy(t,n)}controlPlayer(t,n){let i=this.state.time;if(t.path==="mars"&&(this.counter&&!this.counter.released&&!n.guardHeld?(this.counter.released=!0,t.state==="guard"&&this.lowerGuard(t,"release",!1)):t.state==="guard"&&!n.guardHeld&&this.lowerGuard(t,"release",!0)),n.dash&&this.counter&&this.loseCounter(t,"dash"),t.state==="ledge"||t.state==="climb"||t.state==="knocked"){this.buf=null,super.control(t,n);return}let r=n.dashDir&&st(n.dashDir)>.01?xe(n.dashDir):st(n.move)>.2?xe(n.move):this.facingDir(t);n.dash&&this.dashBuf.set(t.id,{at:i,dir:r,dashOk:!1});let o=[],a=this.counterUsable(t);if(n.dash&&o.push({type:"dash",at:i,dir:r,untilRecEnd:!1}),t.path==="mars"&&n.guardPressed&&o.push({type:a?"bash":"guard",at:i,dir:n.guardDir??null,untilRecEnd:!1}),n.cast){let c=n.cast.skill==="control"?"throw":t.path==="ares"?"charge":t.path==="none"?"push":null;c&&o.push({type:c,at:i,dir:n.cast.dir,untilRecEnd:!1})}n.firePressed&&o.push({type:a?"counterMelee":"fire",at:i,dir:n.fireDir,untilRecEnd:!1}),o.sort((l,c)=>pu[l.type]-pu[c.type]);for(let l of o){if(this.onCooldown(t,l))continue;let c=this.pressRule(t,l);if(c!=="drop"){this.buf={...l,untilRecEnd:c==="recEnd"};break}}if(this.buf&&!this.buf.untilRecEnd&&i-this.buf.at>ye.inputBuffer+xt&&(this.buf=null),this.buf){let l=this.pressRule(t,this.buf);if(l==="now"){let c=this.buf;if(this.buf=null,this.execute(t,c,n)){this.playerMove(t,n),this.updateGuardDir(t,n);return}}else l==="drop"&&(this.buf=null)}!this.buf&&n.fire&&this.activity(t)==="free"&&this.startMelee(t,n,null),this.playerMove(t,n),this.updateGuardDir(t,n)}onCooldown(t,n){switch(n.type){case"dash":return t.cooldowns.dash>0;case"throw":return t.cooldowns.control>0;case"charge":case"push":case"guard":return t.cooldowns.push>0;default:return!1}}activity(t){let n=this.fx(t);switch(t.state){case"idle":return(t.breakT??0)>0||n.hitstunT>xt?"stun":"free";case"hitstun":return"stun";case"windup":{let i=t.windup?.skill;return mc(i)?"meleeWindup":i==="charge"?"charge":"castWindup"}case"recover":{let i=n.act;return i&&i.kind==="recover"&&(i.tag==="chargeHit"||i.tag==="chargeMiss")?"charge":"meleeRecover"}case"charge":return"charge";case"guard":return"guard";case"dash":return"dash";default:return"other"}}pressRule(t,n){let i=n.type==="fire"||n.type==="counterMelee";switch(this.activity(t)){case"free":return"now";case"meleeWindup":case"castWindup":return n.type==="dash"?"now":"drop";case"meleeRecover":{if(n.type!=="dash")return"buffer";let r=this.fx(t).act;return(r&&(r.kind==="melee"||r.kind==="recover")?r.recDur:0)-t.stateT<=ye.inputBuffer+xt?"recEnd":"drop"}case"charge":return i?"buffer":"drop";case"guard":return n.type==="dash"?"now":"drop";case"dash":case"stun":return n.type==="dash"?"drop":"buffer";default:return"drop"}}execute(t,n,i){switch(n.type){case"dash":return this.doDash(t,n.dir??this.facingDir(t));case"bash":return this.counterUsable(t)?this.doCounterBash(t,i):i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"counterMelee":return this.counterUsable(t)?this.doCounterMelee(t,i):this.startMelee(t,i,n.dir);case"guard":return i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"throw":return t.cooldowns.control>0?!1:(this.resetCombo(t),this.startWindup(t,"control",this.aimOrAuto(t,n.dir,Lt.range),Lt.windup),!0);case"charge":return this.startCharge(t,i,n);case"push":return t.cooldowns.push>0?!1:(this.resetCombo(t),this.startWindup(t,"push",this.aimOrAuto(t,n.dir,Bt.range+2),Bt.windup),!0);case"fire":return this.startMelee(t,i,n.dir)}}playerMove(t,n){let i=this.fx(t),r=0;switch(t.state){case"idle":r=(t.breakT??0)>0?.5:1;break;case"windup":r=mc(t.windup?.skill)?ye.attackMoveMult:t.windup?.skill==="charge"?0:Cr;break;case"recover":{let c=i.act;r=c&&c.kind==="melee"?ye.attackMoveMult:c&&c.kind==="recover"&&(c.tag==="chargeHit"||c.tag==="chargeMiss")?0:.3;break}case"guard":r=ye.guard.moveMult;break;default:r=0}if(r<=0){t.moveVel={x:0,z:0};return}let o=n.move,a=st(o);a>1&&(o=ie(o,1/a));let l=ye.player.speed*r*(t.slowT>0?Rr:1);t.moveVel=ie(o,l),t.state==="idle"&&a>.1&&(t.facing=an(o))}doDash(t,n){return t.cooldowns.dash>0?!1:(t.state==="guard"&&this.lowerGuard(t,"dash",!0),this.resetCombo(t),this.fx(t).act=null,this.fx(t).slide=null,this.dashBuf.delete(t.id),this.startDash(t,{...rs,dashDir:n}),!0)}comboNext(){return this.combo&&this.state.time<=this.combo.until+xt?this.combo.next:1}resetCombo(t){t.team==="player"&&(this.combo=null,this.comboManualDir=null,this.lastMeleeTarget=null,t.meleeStep=0)}meleeDir(t,n){if(this.comboManualDir)return this.comboManualDir;let i=this.lastMeleeTarget!==null?this.fighter(this.lastMeleeTarget):void 0;if(i&&Dt.alive(i)&&pt(i.pos,t.pos)<=ye.target.keep+xt&&pt(i.pos,t.pos)>1e-6)return xe(je(i.pos,t.pos));let r=this.facingDir(t),o=null,a=1/0;for(let l of this.enemies()){let c=pt(l.pos,t.pos);c>ye.target.autoRange+xt||c<1e-6||zt(xe(je(l.pos,t.pos)),r)<Math.cos(ye.target.autoHalfAngle)-xt||c<a&&(a=c,o=l)}return o?xe(je(o.pos,t.pos)):st(n.move)>.2?xe(n.move):r}startMelee(t,n,i){let r=this.comboNext();r===1&&(this.comboManualDir=null);let o=n.fireDir&&st(n.fireDir)>.01?xe(n.fireDir):i&&st(i)>.01?xe(i):null;o&&(this.comboManualDir=o);let a=this.meleeDir(t,n),l=ye.melee[r-1];return this.fx(t).act={kind:"melee",step:r,counter:!1,dir:a,hitIds:new Set,stepLeft:l.step,stepSpeed:l.step/l.windup,recDur:l.recover,struck:!1,bestD:1/0},this.combo={next:r===3?1:r+1,until:1/0},t.meleeStep=r,this.startWindup(t,mu[r],a,l.windup),!0}releaseMelee(t){let n=this.fx(t).act;t.windup=null,this.setState(t,"recover"),n&&n.kind==="melee"&&this.strikeMelee(t,n,!0)}meleeGeom(t,n,i,r){let o=ye.melee[r-1],a=je(n.pos,t.pos),l=st(a);if(l>o.range+n.radius+xt)return!1;if(l<.6)return!0;if(o.shape==="fan")return zt(ie(a,1/l),i)>=Math.cos(o.halfAngle)-xt;let c=zt(a,i),h=Math.abs(a.x*i.z-a.z*i.x);return c>=0&&h<=o.width/2+n.radius+xt}strikeMelee(t,n,i){let r=ye.melee[n.step-1],o=n.counter?"counterMelee":mu[n.step],a=!1,l=null;for(let c of[...this.state.fighters]){if(c.team===t.team||!Dt.alive(c)||n.hitIds.has(c.id)||!this.meleeGeom(t,c,n.dir,n.step)||this.coverOn()&&this.rockOnSegment(t.pos,c.pos))continue;n.hitIds.add(c.id);let h=pt(t.pos,c.pos),u=this.resolveHit(t,c,{kind:o,dmg:r.dmg,fromDir:xe(je(t.pos,c.pos)),melee:!0,stun:r.stun>0?r.stun:void 0,knock:r.knock>0?{dir:n.dir,dist:r.knock}:null});u==="bearer"?l=c:(u==="hit"||u==="armored")&&(a=!0,n.struck=!0,h<n.bestD&&(n.bestD=h,this.lastMeleeTarget=c.id))}i&&this.emit({type:"melee",ownerId:t.id,step:n.step,pos:{...t.pos},dir:{...n.dir},hit:a,counter:n.counter}),l&&Dt.alive(t)&&this.recoil(t,l)}recoil(t,n){let i=this.fx(t);i.act=null,this.cancelWindup(t),this.resetCombo(t),i.hitstunT=Math.max(i.hitstunT,ye.recoil),i.stunKind="recoil",t.state!=="knocked"&&this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:xe(je(t.pos,n.pos)),dur:ye.recoil})}startCharge(t,n,i){if(t.cooldowns.push>0)return!1;let r=i.dir&&st(i.dir)>.01?xe(i.dir):null;if(!r&&st(n.move)>.2&&(r=xe(n.move)),!r){let o=null,a=1/0;for(let l of this.enemies()){let c=pt(l.pos,t.pos);c<=ye.charge.autoRange+xt&&c>1e-6&&c<a&&(a=c,o=l)}r=o?xe(je(o.pos,t.pos)):this.facingDir(t)}return this.resetCombo(t),t.cooldowns.push=Math.max(0,ye.charge.cooldown-(this.state.time-i.at)),this.fx(t).act={kind:"charge",dir:r,moved:0},this.startWindup(t,"charge",r,ye.charge.windup),!0}advanceCharge(t,n){let i=this.fx(t),r=i.act;if(!r||r.kind!=="charge"){this.setState(t,"idle");return}let o=ye.charge,a=Math.min(o.distance-r.moved,o.distance/o.time*n),l=this.activeMove(t,ie(r.dir,a),"contact");if(r.moved+=l.moved,l.enemy){this.chargeImpact(t,l.enemy,r);return}(l.blocked||r.moved>=o.distance-1e-6)&&(i.act={kind:"recover",tag:"chargeMiss",recDur:o.missRecover},this.setState(t,"recover"))}chargeImpact(t,n,i){let r=this.fx(t),o=ye.charge,a=n.kit==="shieldbearer"?{knock:{dir:i.dir},breakDur:o.breakDur}:{knock:{dir:i.dir},stun:o.archerStun},l=this.resolveHit(t,n,{kind:"charge",dmg:o.dmg,fromDir:xe(je(t.pos,n.pos)),melee:!0,...a});if(Dt.alive(t)){if(l==="bearer"){r.act=null,r.hitstunT=Math.max(r.hitstunT,o.bounceStun),r.stunKind="bounce",r.slide={dir:ie(i.dir,-1),left:o.bounce,speed:o.bounce/o.bounceTime},this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:ie(i.dir,-1),dur:o.bounceStun});return}r.act={kind:"recover",tag:"chargeHit",recDur:o.hitRecover},this.setState(t,"recover")}}raiseGuard(t,n,i){if(t.path!=="mars"||t.cooldowns.push>0)return!1;let r=this.state.time;this.resetCombo(t),this.fx(t).act=null,this.guardSt={pressAt:i,raisedAt:r,counterMade:!1},t.guard={since:r-i,perfect:r-i<=ye.guard.perfect+xt},t.shieldUp=!0,this.threat=null;let a=(n.guardDir&&st(n.guardDir)>.01?xe(n.guardDir):null)??this.autoGuardDir(t)??this.facingDir(t);return t.shieldDir=a,t.facing=an(a),this.setState(t,"guard"),this.emit({type:"guardUp",ownerId:t.id}),!0}lowerGuard(t,n,i){t.state==="guard"&&this.setState(t,"idle"),t.guard=null,t.shieldUp=!1,this.guardSt=null,this.threat=null,i&&(t.cooldowns.push=ye.guard.lock),this.emit({type:"guardDown",ownerId:t.id,reason:n})}updateGuardDir(t,n){if(t.state!=="guard"||!t.shieldDir)return;let i=n.guardDir&&st(n.guardDir)>.01?xe(n.guardDir):null;i&&(this.threat=null);let r=i??this.autoGuardDir(t);r&&(t.shieldDir=ip(t.shieldDir,r,ye.guard.turnRate*Cn)),t.facing=an(t.shieldDir)}heavyCovers(t,n){let i=t.windup;if(!i||i.skill!=="enemyHeavy"||t.state!=="windup")return!1;let r=je(n.pos,t.pos),o=st(r);return o>Yt.range+n.radius||!(o<.6||zt(ie(r,1/o),i.dir)>=Math.cos(Yt.halfAngle))?!1:!this.rockOnSegment(t.pos,n.pos)}arrowHeading(t,n){let i=je(n.pos,t.pos),r=zt(i,t.dir);if(r<=0||Math.abs(i.x*t.dir.z-i.z*t.dir.x)>n.radius+t.radius||t.range-t.traveled<r-n.radius)return null;let a=Ge(t.pos,ie(t.dir,r));return this.state.island.rocks.some(l=>As(t.pos,a,l.pos,l.r+t.radius*.5))?null:r}threatValid(t,n){if(n.kind==="heavy"){let r=this.fighter(n.id);return!r||!Dt.alive(r)||r.windup!==n.w||pt(r.pos,t.pos)>ye.guard.threatDrop?!1:this.heavyCovers(r,t)}let i=this.state.projectiles.find(r=>r.id===n.id);return!i||!i.alive||pt(i.pos,t.pos)>ye.guard.threatDrop?!1:this.arrowHeading(i,t)!==null}autoGuardDir(t){if(this.threat&&!this.threatValid(t,this.threat)&&(this.threat=null),!this.threat){let r=null,o=1/0;for(let a of this.enemies()){if(!this.heavyCovers(a,t))continue;let l=a.windup,c=l.dur-l.t;c<o&&(o=c,r={kind:"heavy",id:a.id,w:l})}for(let a of this.state.projectiles){if(!a.alive||a.team===t.team||a.kind!=="enemyBasic")continue;let l=pt(a.pos,t.pos);if(l>ye.guard.arrowScan||this.arrowHeading(a,t)===null)continue;let c=l/a.speed;c<o&&(o=c,r={kind:"arrow",id:a.id})}this.threat=r}let n=this.threat;if(!n)return null;if(n.kind==="heavy"){let r=this.fighter(n.id);return xe(je(r.pos,t.pos))}let i=this.state.projectiles.find(r=>r.id===n.id);return ie(i.dir,-1)}counterUsable(t){return this.counter!==null&&this.counter.released&&(t.counterT??0)>xt}loseCounter(t,n){this.counter&&(this.counter=null,t.counterT=0,t.counterTargetId=null,this.emit({type:"counterLost",ownerId:t.id,reason:n}))}useCounter(t,n){this.counter=null,t.counterT=0,t.counterTargetId=null,this.state.v4.counters[n]++,this.emit({type:"counterUsed",ownerId:t.id,kind:n})}counterAim(t,n,i,r){let o=this.counter?this.fighter(this.counter.targetId):void 0;return o&&Dt.alive(o)&&pt(o.pos,t.pos)<=n+xt&&pt(o.pos,t.pos)>1e-6?xe(je(o.pos,t.pos)):i&&st(i)>.01?xe(i):this.meleeDir(t,r)}doCounterBash(t,n){let i=ye.counter.bash;this.resetCombo(t);let r=this.counterAim(t,i.aimRange,n.guardDir,n);this.useCounter(t,"bash"),t.facing=an(r);for(let o of[...this.state.fighters]){if(o.team===t.team||!Dt.alive(o))continue;let a=je(o.pos,t.pos),l=st(a);l>i.range+o.radius||(l<.6||zt(ie(a,1/l),r)>=Math.cos(i.halfAngle)-xt)&&(this.coverOn()&&this.rockOnSegment(t.pos,o.pos)||this.resolveHit(t,o,{kind:"counterBash",dmg:i.dmg,fromDir:xe(je(t.pos,o.pos)),melee:!0,knock:{dir:r,mult:i.knockMult}}))}return t.cooldowns.push=ye.guard.lock,Dt.alive(t)&&t.state!=="knocked"&&(this.fx(t).act={kind:"recover",tag:"bash",recDur:i.recover},this.setState(t,"recover")),!0}doCounterMelee(t,n){let i=ye.counter.melee;this.resetCombo(t);let r=n.fireDir&&st(n.fireDir)>.01?xe(n.fireDir):null,o=this.counterAim(t,i.aimRange,r,n);r&&(this.comboManualDir=r),this.useCounter(t,"melee"),t.facing=an(o),this.activeMove(t,ie(o,i.step),"stop");let a=ye.melee[0],l={kind:"melee",step:1,counter:!0,dir:o,hitIds:new Set,stepLeft:0,stepSpeed:0,recDur:a.recover,struck:!1,bestD:1/0};return this.fx(t).act=l,this.combo={next:2,until:1/0},t.meleeStep=1,this.setState(t,"recover"),this.strikeMelee(t,l,!0),!0}canTurn(t){return t.state==="idle"&&this.state.time>=this.fx(t).noTurnUntil-xt}controlEnemy(t,n){let i=this.fx(t),r=(t.breakT??0)>0;if(t.kit==="shieldbearer"&&n.face&&st(n.face)>.01&&this.canTurn(t)&&(t.facing=sp(t.facing,an(n.face),ye.bearer.turnRate*Cn)),t.state==="idle"&&!r&&i.hitstunT<=xt){if(t.kit==="shieldbearer"&&n.cast&&n.cast.skill==="push"&&t.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===t.id)){this.heavyOwner=t.id,this.startWindup(t,"enemyHeavy",this.facingDir(t),Yt.windup),t.moveVel={x:0,z:0};return}if(t.kit==="archer"){if(n.dash&&n.dashDir&&st(n.dashDir)>.01&&t.cooldowns.dash<=0){this.startBackstep(t,xe(n.dashDir));return}if(n.fire&&t.burstLeft===0&&t.cooldowns.basic<=0){this.startWindup(t,"enemyBasic",this.aimOrAuto(t,n.fireDir,Zt.range),Zt.windup);return}}}if(t.state==="idle"||t.state==="windup"||t.state==="recover"){let o=n.move,a=st(o);a>1&&(o=ie(o,1/a));let l=t.kit==="shieldbearer"?ye.bearer.speed:ye.archer.speed;t.slowT>0&&(l*=Rr),r&&(l*=.5),t.burstLeft>0&&(l*=zo),t.state==="windup"&&(l*=Cr),t.state==="recover"&&(l*=.3),t.moveVel=ie(o,l),t.kit==="archer"&&t.state==="idle"&&t.burstLeft===0&&a>.1&&(t.facing=an(o))}else t.moveVel={x:0,z:0}}startBackstep(t,n){t.cooldowns.dash=ye.archer.backstepCooldown,this.fx(t).act={kind:"backstep",dir:n,left:ye.archer.backstep},t.moveVel={x:0,z:0},this.setState(t,"dash"),this.emit({type:"dash",ownerId:t.id,from:{...t.pos},dir:{...n}})}advance(t,n){let i=this.fx(t);switch(t.state){case"dead":case"falling":case"knocked":case"ledge":case"climb":super.advance(t,n);return;case"dash":if(i.act&&i.act.kind==="backstep"){this.advanceBackstep(t,i.act,n);break}super.advance(t,n);return;case"reviving":t.stateT>=ye.revive.delay-xt&&this.revive(t);return;case"windup":this.advanceWindup(t,n);break;case"recover":this.walk(t,n),i.act&&i.act.kind==="melee"&&t.stateT<=ye.meleeActive+xt&&this.strikeMelee(t,i.act,!1);break;case"charge":this.advanceCharge(t,n);break;case"idle":case"guard":this.walk(t,n);break;case"hitstun":t.moveVel={x:0,z:0};break}if(i.slide&&(t.state==="idle"||t.state==="hitstun"||t.state==="guard"||t.state==="recover"||t.state==="windup")){let o=Math.min(i.slide.left,i.slide.speed*n),a=this.activeMove(t,ie(i.slide.dir,o),"stop");i.slide.left-=o,(a.blocked||i.slide.left<=1e-6)&&(i.slide=null)}if((t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&Nt(t.pos,this.state.island.poly)<0){this.startFall(t,{x:0,z:0});return}this.tickBurst(t,n)}advanceBackstep(t,n,i){let r=Math.min(n.left,ye.archer.backstep/ye.archer.backstepTime*i),o=this.activeMove(t,ie(n.dir,r),"none");n.left-=r,(o.blocked||n.left<=1e-6)&&(this.fx(t).act=null,this.setState(t,"idle"))}advanceWindup(t,n){let i=t.windup,r=this.fx(t);i.t+=n;let o=r.act;if(mc(i.skill)&&o&&o.kind==="melee"&&o.stepLeft>0){let a=Math.min(o.stepLeft,o.stepSpeed*n),l=this.activeMove(t,ie(o.dir,a),"stop");o.stepLeft=l.blocked?0:o.stepLeft-a}i.skill==="enemyHeavy"&&!r.heavyArmor&&i.t>=i.dur-ye.bearer.heavyArmor-xt&&(r.heavyArmor=!0,this.emit({type:"armor",ownerId:t.id,kind:"heavy",dur:ye.bearer.heavyArmor})),i.skill!=="charge"&&this.walk(t,n),i.t>=i.dur-xt&&this.releaseV4(t)}releaseV4(t){let n=t.windup,i=this.fx(t);switch(n.skill){case"melee1":case"melee2":case"melee3":this.releaseMelee(t);return;case"charge":t.windup=null,this.setState(t,"charge"),this.emit({type:"charge",ownerId:t.id,from:{...t.pos},dir:{...n.dir}});return;case"enemyHeavy":this.releaseWindup(t),i.heavyArmor=!1,i.noTurnUntil=this.state.time+Yt.recover,t.state==="recover"&&(i.act={kind:"recover",tag:"heavy",recDur:Yt.recover});return;case"push":this.releaseWindup(t),t.state==="recover"&&(i.act={kind:"recover",tag:"push",recDur:Bt.recover});return;default:this.releaseWindup(t)}}activeMove(t,n,i){if(i==="contact"){let h=this.contactAt(t,t.pos);if(h)return{moved:0,blocked:"enemy",enemy:h}}let r=st(n);if(r<1e-12)return{moved:0,blocked:null,enemy:null};let o=Math.max(1,Math.ceil(r/.02)),a=ie(n,1/o),l=r/o,c=0;for(let h=0;h<o;h++){let u=Ge(t.pos,a),d=this.moveBlock(t,t.pos,u,i);if(d){let f=0,v=1;for(let b=0;b<30;b++){let g=(f+v)/2;this.moveBlock(t,t.pos,Ge(t.pos,ie(a,g)),i)?v=g:f=g}return t.pos=Ge(t.pos,ie(a,f)),c+=l*f,{moved:c,blocked:d.kind,enemy:d.enemy}}t.pos=u,c+=l}return{moved:c,blocked:null,enemy:null}}contactAt(t,n){let i=null,r=1/0;for(let o of this.state.fighters){if(o.team===t.team||!Dt.alive(o))continue;let a=pt(n,o.pos);a<=ye.charge.contact+xt&&a<r&&(r=a,i=o)}return i}moveBlock(t,n,i,r){let o=this.state.island.poly,a=Nt(i,o);if(a<ye.edgeMargin&&a<Nt(n,o)-1e-12)return{kind:"edge",enemy:null};for(let l of this.state.island.rocks){let c=pt(i,l.pos),h=l.r+t.radius;if(c<h&&c<pt(n,l.pos)-1e-12)return{kind:"rock",enemy:null}}if(r==="contact"){let l=this.contactAt(t,i);if(l)return{kind:"enemy",enemy:l}}else if(r==="stop")for(let l of this.state.fighters){if(l.team===t.team||!Dt.alive(l))continue;let c=pt(i,l.pos),h=t.radius+l.radius;if(c<h&&c<pt(n,l.pos)-1e-12)return{kind:"enemy",enemy:l}}return null}cancelWindup(t){if(t.windup){let n=this.fx(t);n.heavyArmor=!1,n.act&&(n.act.kind==="melee"||n.act.kind==="charge")&&(n.act=null)}super.cancelWindup(t)}resolveHit(t,n,i){let r=this.state;if(n.invulnT>0||(n.protectT??0)>0)return"invuln";if(n.kit==="shieldbearer"&&(n.breakT??0)<=0&&fu(i.fromDir,this.facingDir(n))<=ye.bearer.frontHalfAngle+1e-7)return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:"bearer",skill:i.kind,pos:Ge(n.pos,ie(i.fromDir,n.radius)),dir:ie(i.fromDir,-1)}),"bearer";if(n.state==="guard"&&n.shieldUp&&n.shieldDir&&n.guard&&fu(i.fromDir,n.shieldDir)<=ye.guard.blockHalfAngle+1e-7)return this.guardBlock(t,n,i);let o=n.slowT>0;n.hp=Math.max(0,n.hp-i.dmg),n.hitFlashT=.12,n.lastHitBy=t.id,n.lastHitAt=r.time,this.lastHitKind.set(n.id,i.kind),this.hitstop=Math.max(this.hitstop,Ho[i.kind]),i.slow&&(n.slowT=i.slow),n.team==="player"&&this.loseCounter(n,"hit");let a=this.armored(n),l=0,c=!1,h=!1;if(n.hp>0&&!a&&(i.breakDur&&this.applyBreak(t,n,i.breakDur),i.knock&&(l=i.knock.dist??Dt.knockDistance(n.hp,n.maxHp,o)*(i.knock.mult??1),h=this.applyKnock(n,i.knock.dir,l,t,i.kind),c=!0),i.stun&&!h&&(this.applyStun(n,i.stun),c=!0)),h||this.emit({type:"hit",targetId:n.id,sourceId:t.id,kind:i.kind,pos:{...n.pos},dir:i.knock?xe(i.knock.dir):ie(i.fromDir,-1),dmg:i.dmg,knock:l}),n.hp<=0)return this.cancelWindup(n),this.die(n,"hp"),"hit";if(a)return"armored";if(c){let u=this.fx(n),d=r.time;u.stackHits=u.stackHits.filter(f=>d-f<=ye.stack.window+xt),u.stackHits.push(d),u.stackHits.length>=ye.stack.hits&&(u.stackHits=[],u.stackArmorT=ye.stack.armor,this.emit({type:"armor",ownerId:n.id,kind:"stack",dur:ye.stack.armor}))}return"hit"}guardBlock(t,n,i){let r=ye.guard,o=n.guard.since<=r.perfect+xt;return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:o?"perfect":"guard",skill:i.kind,pos:Ge(n.pos,ie(i.fromDir,n.radius)),dir:ie(i.fromDir,-1)}),o?(this.state.v4.perfectBlocks++,i.melee&&(this.applyBreak(n,t,r.perfectBreak),this.guardSt&&!this.guardSt.counterMade&&(this.guardSt.counterMade=!0,this.counter={targetId:t.id,released:!1},n.counterT=ye.counter.dur,n.counterTargetId=t.id,this.emit({type:"counterReady",ownerId:n.id,targetId:t.id,dur:ye.counter.dur}))),"perfect"):(i.melee&&(n.hp=Math.max(0,n.hp-r.chipDmg),n.lastHitBy=t.id,n.lastHitAt=this.state.time,this.lastHitKind.set(n.id,i.kind),this.fx(n).slide={dir:ie(i.fromDir,-1),left:r.pushback,speed:r.pushback/r.pushbackTime},n.hp<=0&&this.die(n,"hp")),"guard")}applyBreak(t,n,i){let r=this.fx(n);n.breakT=Math.max(n.breakT??0,i),n.state==="windup"&&(this.cancelWindup(n),r.act=null,this.setState(n,"idle")),n.burstLeft=0,this.bursts.delete(n.id),this.emit({type:"guardBreak",targetId:n.id,sourceId:t.id,dur:i,pos:{...n.pos}}),n.team==="enemy"&&this.state.v4.breaks++}applyStun(t,n){let i=this.fx(t);i.hitstunT=Math.max(i.hitstunT,n),i.stunKind="hit",t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.buf=null),(t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&(this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),i.act=null,i.slide=null,this.setState(t,"hitstun"))}applyKnock(t,n,i,r,o){let a=xe(n);if(t.state==="ledge")return this.emit({type:"hit",targetId:t.id,sourceId:r.id,kind:o,pos:{...t.pos},dir:{...a},dmg:0,knock:0}),this.dropLedge(t,"knocked",a),!0;if(t.state==="climb"){let c=this.ledge.get(t.id);c&&(c.rec.outcome="knocked",this.ledge.delete(t.id),this.edgeRec.delete(t.id))}t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.buf=null);let l=this.fx(t);return l.act=null,l.slide=null,this.outSource.set(t.id,"knock"),this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),t.knockVel=ie(a,2*i/In.knockTime),t.kit!=="shieldbearer"&&(t.facing=an(ie(a,-1))),this.outsideT.set(t.id,0),this.setState(t,"knocked"),!1}coneStrike(t,n,i,r,o,a){this.emit({type:"cast",ownerId:t.id,skill:a,pos:{...t.pos},dir:{...n}});for(let l of[...this.state.fighters]){if(l.team===t.team||!Dt.alive(l))continue;let c=je(l.pos,t.pos),h=st(c);if(!(h>i+l.radius)&&(h<.6||zt(ie(c,1/h),n)>=Math.cos(r))){if(this.coverOn()){let u=this.rockOnSegment(t.pos,l.pos);if(u){this.emit({type:"blockedStrike",ownerId:t.id,targetId:l.id,skill:a,pos:u,dir:{...n}});continue}}this.resolveHit(t,l,{kind:a,dmg:o,fromDir:xe(je(t.pos,l.pos)),melee:a==="enemyHeavy",knock:{dir:n}})}}}moveProjectiles(t){let n=this.state;for(let i of n.projectiles){if(!i.alive)continue;let r=i.pos,o=i.speed*t,a=Ge(r,ie(i.dir,o));if(i.traveled+=o,n.island.rocks.some(h=>As(r,a,h.pos,h.r+i.radius*.5))){i.alive=!1,this.emit({type:"blocked",pos:a,kind:i.kind,ownerId:i.ownerId});continue}let l=null,c=1/0;for(let h of n.fighters)if(!(h.team===i.team||!Dt.alive(h)||h.invulnT>0||(h.protectT??0)>0)&&Ni(h.pos,r,a)<h.radius+i.radius){let u=pt(r,h.pos);u<c&&(c=u,l=h)}if(i.pos=a,l){i.alive=!1;let h=this.fighter(i.ownerId);if(h){let u=ie(i.dir,-1);i.kind==="control"?this.resolveHit(h,l,{kind:"control",dmg:Lt.dmg,fromDir:u,slow:Lt.slow,melee:!1}):this.resolveHit(h,l,{kind:i.kind,dmg:i.kind==="enemyBasic"?Zt.dmg:3,fromDir:u,melee:!1})}continue}i.traveled>=i.range&&(i.alive=!1,this.emit({type:"expire",pos:a,kind:i.kind}))}n.projectiles=n.projectiles.filter(i=>i.alive)}clearPlayer(t){t.team==="player"&&((t.guard||t.shieldUp)&&(t.guard=null,t.shieldUp=!1,this.guardSt=null),this.counter&&this.loseCounter(t,"hit"),this.resetCombo(t),this.buf=null,this.threat=null)}startFall(t,n){let i=this.fx(t);i.act=null,i.slide=null,i.hitstunT=0,i.heavyArmor=!1,this.clearPlayer(t),super.startFall(t,n)}die(t,n){let i=this.state,r=i.v4,o=this.fx(t);if(this.cancelWindup(t),o.act=null,o.slide=null,o.hitstunT=0,o.heavyArmor=!1,o.stackArmorT=0,o.stackHits=[],t.burstLeft=0,this.bursts.delete(t.id),t.team==="player"&&r.revivesLeft>0){if(r.revivesLeft--,this.clearPlayer(t),this.dashBuf.delete(t.id),n==="hp"){let a=this.ledge.get(t.id);a&&a.rec.outcome==="pending"&&(a.rec.outcome="hp");let l=this.edgeRec.get(t.id);l&&l.outcome==="pending"&&(l.outcome="hp"),this.ledge.delete(t.id),this.edgeRec.delete(t.id)}t.hp=0,t.breakT=0,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},this.setState(t,"reviving"),this.emit({type:"reviveStart",ownerId:t.id,delay:ye.revive.delay});return}if(t.team==="enemy"){let a=t.lastHitBy!==null&&i.time-t.lastHitAt<4?t.lastHitBy:null;r.kills.push({t:Math.round(i.time*1e3)/1e3,how:n,where:Nt(t.pos,i.island.poly)<=ye.killEdge?"edge":"center",by:a!==null?this.lastHitKind.get(t.id)??null:null,victim:t.kit})}super.die(t,n)}legalRevivePoints(){let t=this.state,n=ye.revive.grid,i=ye.player.radius,r=t.island.poly.map(l=>l.x),o=t.island.poly.map(l=>l.z),a=[];for(let l=Math.floor(Math.min(...r)/n);l<=Math.ceil(Math.max(...r)/n);l++)for(let c=Math.floor(Math.min(...o)/n);c<=Math.ceil(Math.max(...o)/n);c++){let h={x:l*n,z:c*n};Nt(h,t.island.poly)<ye.revive.edge||t.island.rocks.some(u=>pt(h,u.pos)<u.r+i)||a.push(h)}return a}revivePoint(){let t=this.legalRevivePoints(),n=this.enemies(),i=c=>n.reduce((h,u)=>Math.min(h,pt(c,u.pos)),1/0),r=null,o=1/0;for(let c of t){if(i(c)<ye.revive.enemyClear)continue;let h=st(c);h<o-xt&&(o=h,r=c)}if(r)return{...r};let a=t[0],l=-1/0;for(let c of t){let h=i(c);h>l+xt&&(l=h,a=c)}return{...a}}revive(t){let n=this.revivePoint();t.pos=n,t.y=0,t.hp=t.maxHp*ye.revive.hpFrac,t.protectT=ye.revive.protect,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.deathCause=null,t.slowT=0,t.invulnT=0,this.fallVel.delete(t.id),this.outSource.delete(t.id),this.setState(t,"idle"),this.emit({type:"revive",ownerId:t.id,pos:{...n},protect:ye.revive.protect})}chooseSpawns(t){let n=this.state,i=ye.waves,r=i.grid,o=this.player,a=n.island.poly.map(u=>u.x),l=n.island.poly.map(u=>u.z),c=[];for(let u=Math.floor(Math.min(...a)/r);u<=Math.ceil(Math.max(...a)/r);u++)for(let d=Math.floor(Math.min(...l)/r);d<=Math.ceil(Math.max(...l)/r);d++){let f={x:u*r,z:d*r};Nt(f,n.island.poly)<i.minEdge||n.island.rocks.some(v=>pt(f,v.pos)<v.r+.5)||pt(f,o.pos)<i.minPlayerDist||c.push(f)}let h=[];for(let u=0;u<t;u++){let d=c.filter(v=>h.every(b=>pt(b,v)>=i.spacing)&&this.enemies().every(b=>pt(b.pos,v)>=i.spacing)),f=d.length?d:c;h.push({...f[Math.floor(this.rng()*f.length)%f.length]})}return h}spawnWave(t,n){let i=ye.waves.list[t-1],r=this.player;this.waveIdx=t,this.waveMembers=[],i.forEach((o,a)=>{let l=n[a],c=o==="shieldbearer",h=this.makeFighter("enemy",c?1:2,c?"\u76FE\u5175":"\u5F13\u624B",l,an(je(r.pos,l)),o);h.hp=h.maxHp=c?ye.bearer.hp:ye.archer.hp,h.cooldownMax=c?{basic:0,control:0,push:Yt.cooldown,dash:0}:{basic:Zt.cooldownMax,control:0,push:0,dash:ye.archer.backstepCooldown},h.cooldowns={basic:0,control:0,push:c?2.5:0,dash:0},this.initV4Fields(h),this.state.fighters.push(h),this.waveMembers.push(h.id),this.sync(h)}),this.wavePhase="fight",this.emit({type:"waveStart",index:t,total:ye.waves.list.length}),this.updateWaveState()}updateWaveState(){let t=this.state.v4.wave;t.index=this.waveIdx,t.total=ye.waves.list.length,t.remaining=this.waveMembers.filter(n=>{let i=this.fighter(n);return i!==void 0&&Dt.alive(i)}).length}tickWaves(){let t=this.state.time,n=ye.waves;if(this.wavePhase==="fight"&&this.waveMembers.every(i=>this.fighter(i)?.state==="dead")&&(this.emit({type:"waveClear",index:this.waveIdx}),this.waveIdx>=n.list.length?this.wavePhase="done":(this.wavePhase="gap",this.waveClearAt=t)),this.wavePhase==="gap"&&t>=this.waveClearAt+n.gap-n.markLead-xt){let i=n.list[this.waveIdx],r=this.chooseSpawns(i.length);this.pendingSpawns=i.map((o,a)=>({kit:o,pos:r[a]}));for(let o of this.pendingSpawns)this.emit({type:"spawnMark",pos:{...o.pos},lead:n.markLead});this.wavePhase="marked"}this.wavePhase==="marked"&&t>=this.waveClearAt+n.gap-xt&&!this.ended&&(this.spawnWave(this.waveIdx+1,this.pendingSpawns.map(i=>i.pos)),this.pendingSpawns=[]),this.updateWaveState()}checkEnd(){if(this.ended)return;let t=this.state,n=this.player;n.state==="dead"?(t.result="lose",t.loseText=this.loseText(n)):this.wavePhase==="done"&&(t.result="win"),t.result&&(this.ended=!0,this.dashBuf.clear(),this.buf=null,this.emit({type:"roundEnd",result:t.result}))}get wave(){return{index:this.waveIdx,phase:this.wavePhase}}debugPlayer(){let t=this.fx(this.player);return{buffered:this.buf?this.buf.type:null,counter:this.counter?{...this.counter}:null,combo:this.combo?{...this.combo}:null,lastTarget:this.lastMeleeTarget,stunKind:t.stunKind,hitstunT:t.hitstunT}}debugFx(t){let n=this.fighter(t),i=this.fx(n);return{hitstunT:i.hitstunT,heavyArmor:i.heavyArmor,stackArmorT:i.stackArmorT,stackCount:i.stackHits.length}}debugDamage(t,n,i,r,o){let a=this.fighter(t),l=this.fighter(n);if(!a||!l||!Dt.alive(a)||a.invulnT>0||(a.protectT??0)>0)return!1;let c=a.slowT>0;if(a.hp=Math.max(0,a.hp-r),a.lastHitBy=l.id,a.lastHitAt=this.state.time,this.lastHitKind.set(a.id,i),a.hp<=0)return this.die(a,"hp"),!0;let h=0;return o&&(h=Dt.knockDistance(a.hp,a.maxHp,c),this.applyKnock(a,o,h,l,i))||this.emit({type:"hit",targetId:a.id,sourceId:l.id,kind:i,pos:{...a.pos},dir:o?xe(o):xe(je(a.pos,l.pos)),dmg:r,knock:h}),!0}debugSpawn(t,n,i){let r=t==="shieldbearer",o=this.makeFighter("enemy",r?1:2,r?"\u76FE\u5175":"\u5F13\u624B",n,i??0,t);return o.hp=o.maxHp=r?ye.bearer.hp:ye.archer.hp,o.cooldownMax=r?{basic:0,control:0,push:Yt.cooldown,dash:0}:{basic:Zt.cooldownMax,control:0,push:0,dash:ye.archer.backstepCooldown},o.cooldowns={basic:0,control:0,push:0,dash:0},this.initV4Fields(o),this.state.fighters.push(o),this.sync(o),o}debugClearWave(){let t=new Set(this.waveMembers);this.state.fighters=this.state.fighters.filter(n=>!t.has(n.id)),this.waveMembers=[],this.wavePhase="off",this.updateWaveState()}};var Xu=0,eh=1,qu=2;var th=1,Za=2,fi=3,Ti=0,fn=1,gn=2,Pi=0,Ai=1,Ji=2,nh=3,ih=4,Yu=5,Xi=100,$u=101,Ku=102,Zu=103,Ju=104,ju=200,Qu=201,ed=202,td=203,ga=204,va=205,nd=206,id=207,sd=208,rd=209,od=210,ad=211,ld=212,cd=213,hd=214,Ja=0,ja=1,Qa=2,hs=3,el=4,tl=5,cr=6,nl=7,il=0,ud=1,dd=2,si=0,fd=1,pd=2,md=3,sl=4,gd=5,vd=6,xd=7;var sh=300,ms=301,gs=302,rl=303,ol=304,Mo=306,us=1e3,Wi=1001,xa=1002,Pn=1003,yd=1004;var So=1005;var ni=1006,al=1007;var ji=1008;var ri=1009,rh=1010,oh=1011,hr=1012,ll=1013,Qi=1014,oi=1015,ur=1016,cl=1017,hl=1018,dr=1020,ah=35902,lh=35899,ch=1021,hh=1022,qn=1023,Ks=1026,fr=1027,ul=1028,dl=1029,uh=1030,fl=1031;var pl=1033,wo=33776,Eo=33777,To=33778,Ao=33779,ml=35840,gl=35841,vl=35842,xl=35843,yl=36196,_l=37492,bl=37496,Ml=37808,Sl=37809,wl=37810,El=37811,Tl=37812,Al=37813,Rl=37814,Cl=37815,Il=37816,Pl=37817,Ll=37818,Dl=37819,kl=37820,Fl=37821,Ul=36492,Nl=36494,Ol=36495,Bl=36283,zl=36284,Hl=36285,Vl=36286;var Xr=2300,ya=2301,ma=2302,Xc=2400,qc=2401,Yc=2402;var _d=3200,bd=3201;var Gl=0,Md=1,Li="",Wt="srgb",ds="srgb-linear",qr="linear",Rt="srgb";var ei=7680,Wl=7681;var dh=517;var Zs=519,Sd=512,wd=513,Ed=514,fh=515,Td=516,Ad=517,Rd=518,Cd=519,_a=35044,Xl=35048;var ph="300 es",ti=2e3,Yr=2001;var Ri=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var gc=Math.PI/180,ba=180/Math.PI;function wi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[s&255]+pn[s>>8&255]+pn[s>>16&255]+pn[s>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function vt(s,e,t){return Math.max(e,Math.min(t,s))}function rp(s,e){return(s%e+e)%e}function vc(s,e,t){return(1-t)*s+t*e}function li(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ct(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ee=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],v=r[o+2],b=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=v,e[t+3]=b;return}if(u!==b||l!==d||c!==f||h!==v){let g=1-a,p=l*d+c*f+h*v+u*b,m=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let E=Math.sqrt(x),T=Math.atan2(E,p*m);g=Math.sin(g*T)/E,a=Math.sin(a*T)/E}let y=a*m;if(l=l*g+d*y,c=c*g+f*y,h=h*g+v*y,u=u*g+b*y,g===1-a){let E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],v=r[o+3];return e[t]=a*v+h*u+l*f-c*d,e[t+1]=l*v+h*d+c*u-a*f,e[t+2]=c*v+h*f+a*d-l*u,e[t+3]=h*v-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),v=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u-d*f*v;break;case"YXZ":this._x=d*h*u+c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u+d*f*v;break;case"ZXY":this._x=d*h*u-c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u-d*f*v;break;case"ZYX":this._x=d*h*u-c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u+d*f*v;break;case"YZX":this._x=d*h*u+c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u-d*f*v;break;case"XZY":this._x=d*h*u-c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u+d*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xc.copy(this).projectOnVector(e),this.sub(xc)}reflect(e){return this.sub(xc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xc=new O,gu=new Wn,lt=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],v=n[8],b=i[0],g=i[3],p=i[6],m=i[1],x=i[4],y=i[7],E=i[2],T=i[5],L=i[8];return r[0]=o*b+a*m+l*E,r[3]=o*g+a*x+l*T,r[6]=o*p+a*y+l*L,r[1]=c*b+h*m+u*E,r[4]=c*g+h*x+u*T,r[7]=c*p+h*y+u*L,r[2]=d*b+f*m+v*E,r[5]=d*g+f*x+v*T,r[8]=d*p+f*y+v*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,v=t*u+n*d+i*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return e[0]=u*b,e[1]=(i*c-h*n)*b,e[2]=(a*n-i*o)*b,e[3]=d*b,e[4]=(h*t-i*l)*b,e[5]=(i*r-a*t)*b,e[6]=f*b,e[7]=(n*l-c*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(yc.makeScale(e,t)),this}rotate(e){return this.premultiply(yc.makeRotation(-e)),this}translate(e,t){return this.premultiply(yc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},yc=new lt;function mh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function $r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Id(){let s=$r("canvas");return s.style.display="block",s}var vu={};function Js(s){s in vu||(vu[s]=!0,console.warn(s))}function Pd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var xu=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yu=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function op(){let s={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Rt&&(i.r=Ei(i.r),i.g=Ei(i.g),i.b=Ei(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Rt&&(i.r=Ys(i.r),i.g=Ys(i.g),i.b=Ys(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Li?qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Js("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Js("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ds]:{primaries:e,whitePoint:n,transfer:qr,toXYZ:xu,fromXYZ:yu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:xu,fromXYZ:yu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),s}var bt=op();function Ei(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ys(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Is,Ma=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Is===void 0&&(Is=$r("canvas")),Is.width=e.width,Is.height=e.height;let i=Is.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Is}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=$r("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ei(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ap=0,js=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(_c(i[o].image)):r.push(_c(i[o]))}else r=_c(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function _c(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ma.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var lp=0,bc=new O,Sn=class s extends Ri{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Wi,i=Wi,r=ni,o=ji,a=qn,l=ri,c=s.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=wi(),this.name="",this.source=new js(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(bc).x}get height(){return this.source.getSize(bc).y}get depth(){return this.source.getSize(bc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case us:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case us:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=sh;Sn.DEFAULT_ANISOTROPY=1;var Tt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],v=l[9],b=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(f+1)/2,E=(p+1)/2,T=(h+d)/4,L=(u+b)/4,R=(v+g)/4;return x>y&&x>E?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=T/n,r=L/n):y>E?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=R/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=L/r,i=R/r),this.set(n,i,r,t),this}let m=Math.sqrt((g-v)*(g-v)+(u-b)*(u-b)+(d-h)*(d-h));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(u-b)/m,this.z=(d-h)/m,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this.w=vt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this.w=vt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sa=class extends Ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new Sn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new js(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Sa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kr=class extends Sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var wa=class extends Sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hi=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jn):Jn.fromBufferAttribute(r,o),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wo.copy(n.boundingBox)),Wo.applyMatrix4(e.matrixWorld),this.union(Wo)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),Xo.subVectors(this.max,Lr),Ps.subVectors(e.a,Lr),Ls.subVectors(e.b,Lr),Ds.subVectors(e.c,Lr),Oi.subVectors(Ls,Ps),Bi.subVectors(Ds,Ls),os.subVectors(Ps,Ds);let t=[0,-Oi.z,Oi.y,0,-Bi.z,Bi.y,0,-os.z,os.y,Oi.z,0,-Oi.x,Bi.z,0,-Bi.x,os.z,0,-os.x,-Oi.y,Oi.x,0,-Bi.y,Bi.x,0,-os.y,os.x,0];return!Mc(t,Ps,Ls,Ds,Xo)||(t=[1,0,0,0,1,0,0,0,1],!Mc(t,Ps,Ls,Ds,Xo))?!1:(qo.crossVectors(Oi,Bi),t=[qo.x,qo.y,qo.z],Mc(t,Ps,Ls,Ds,Xo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},xi=[new O,new O,new O,new O,new O,new O,new O,new O],Jn=new O,Wo=new hi,Ps=new O,Ls=new O,Ds=new O,Oi=new O,Bi=new O,os=new O,Lr=new O,Xo=new O,qo=new O,as=new O;function Mc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){as.fromArray(s,r);let a=i.x*Math.abs(as.x)+i.y*Math.abs(as.y)+i.z*Math.abs(as.z),l=e.dot(as),c=t.dot(as),h=n.dot(as);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var cp=new hi,Dr=new O,Sc=new O,qi=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):cp.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);let t=Dr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Dr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(Sc)),this.expandByPoint(Dr.copy(e.center).sub(Sc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yi=new O,wc=new O,Yo=new O,zi=new O,Ec=new O,$o=new O,Tc=new O,Ea=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){wc.copy(e).add(t).multiplyScalar(.5),Yo.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(wc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Yo),a=zi.dot(this.direction),l=-zi.dot(Yo),c=zi.lengthSq(),h=Math.abs(1-o*o),u,d,f,v;if(h>0)if(u=o*l-a,d=o*a-l,v=r*h,u>=0)if(d>=-v)if(d<=v){let b=1/h;u*=b,d*=b,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-v?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=v?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(wc).addScaledVector(Yo,d),f}intersectSphere(e,t){yi.subVectors(e.center,this.origin);let n=yi.dot(this.direction),i=yi.dot(yi)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,n,i,r){Ec.subVectors(t,e),$o.subVectors(n,e),Tc.crossVectors(Ec,$o);let o=this.direction.dot(Tc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zi.subVectors(this.origin,e);let l=a*this.direction.dot($o.crossVectors(zi,$o));if(l<0)return null;let c=a*this.direction.dot(Ec.cross(zi));if(c<0||l+c>o)return null;let h=-a*zi.dot(Tc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wt=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,v,b,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,v,b,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,v,b,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=v,p[11]=b,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),o=1/ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,v=a*h,b=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+v*c,t[5]=d-b*c,t[9]=-a*l,t[2]=b-d*c,t[6]=v+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,v=c*h,b=c*u;t[0]=d+b*a,t[4]=v*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-v,t[6]=b+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,v=c*h,b=c*u;t[0]=d-b*a,t[4]=-o*u,t[8]=v+f*a,t[1]=f+v*a,t[5]=o*h,t[9]=b-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,v=a*h,b=a*u;t[0]=l*h,t[4]=v*c-f,t[8]=d*c+b,t[1]=l*u,t[5]=b*c+d,t[9]=f*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,v=a*l,b=a*c;t[0]=l*h,t[4]=b-d*u,t[8]=v*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+v,t[10]=d-b*u}else if(e.order==="XZY"){let d=o*l,f=o*c,v=a*l,b=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+b,t[5]=o*h,t[9]=f*u-v,t[2]=v*u-f,t[6]=a*h,t[10]=b*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hp,e,up)}lookAt(e,t,n){let i=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Hi.crossVectors(n,Un),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Hi.crossVectors(n,Un)),Hi.normalize(),Ko.crossVectors(Un,Hi),i[0]=Hi.x,i[4]=Ko.x,i[8]=Un.x,i[1]=Hi.y,i[5]=Ko.y,i[9]=Un.y,i[2]=Hi.z,i[6]=Ko.z,i[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],v=n[2],b=n[6],g=n[10],p=n[14],m=n[3],x=n[7],y=n[11],E=n[15],T=i[0],L=i[4],R=i[8],S=i[12],w=i[1],A=i[5],k=i[9],C=i[13],z=i[2],W=i[6],K=i[10],j=i[14],X=i[3],ae=i[7],he=i[11],_e=i[15];return r[0]=o*T+a*w+l*z+c*X,r[4]=o*L+a*A+l*W+c*ae,r[8]=o*R+a*k+l*K+c*he,r[12]=o*S+a*C+l*j+c*_e,r[1]=h*T+u*w+d*z+f*X,r[5]=h*L+u*A+d*W+f*ae,r[9]=h*R+u*k+d*K+f*he,r[13]=h*S+u*C+d*j+f*_e,r[2]=v*T+b*w+g*z+p*X,r[6]=v*L+b*A+g*W+p*ae,r[10]=v*R+b*k+g*K+p*he,r[14]=v*S+b*C+g*j+p*_e,r[3]=m*T+x*w+y*z+E*X,r[7]=m*L+x*A+y*W+E*ae,r[11]=m*R+x*k+y*K+E*he,r[15]=m*S+x*C+y*j+E*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],v=e[3],b=e[7],g=e[11],p=e[15];return v*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+b*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],v=e[12],b=e[13],g=e[14],p=e[15],m=u*g*c-b*d*c+b*l*f-a*g*f-u*l*p+a*d*p,x=v*d*c-h*g*c-v*l*f+o*g*f+h*l*p-o*d*p,y=h*b*c-v*u*c+v*a*f-o*b*f-h*a*p+o*u*p,E=v*u*l-h*b*l-v*a*d+o*b*d+h*a*g-o*u*g,T=t*m+n*x+i*y+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/T;return e[0]=m*L,e[1]=(b*d*r-u*g*r-b*i*f+n*g*f+u*i*p-n*d*p)*L,e[2]=(a*g*r-b*l*r+b*i*c-n*g*c-a*i*p+n*l*p)*L,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*L,e[4]=x*L,e[5]=(h*g*r-v*d*r+v*i*f-t*g*f-h*i*p+t*d*p)*L,e[6]=(v*l*r-o*g*r-v*i*c+t*g*c+o*i*p-t*l*p)*L,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*L,e[8]=y*L,e[9]=(v*u*r-h*b*r-v*n*f+t*b*f+h*n*p-t*u*p)*L,e[10]=(o*b*r-v*a*r+v*n*c-t*b*c-o*n*p+t*a*p)*L,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*L,e[12]=E*L,e[13]=(h*b*i-v*u*i+v*n*d-t*b*d-h*n*g+t*u*g)*L,e[14]=(v*a*i-o*b*i-v*n*l+t*b*l+o*n*g-t*a*g)*L,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*L,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,v=r*u,b=o*h,g=o*u,p=a*u,m=l*c,x=l*h,y=l*u,E=n.x,T=n.y,L=n.z;return i[0]=(1-(b+p))*E,i[1]=(f+y)*E,i[2]=(v-x)*E,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+p))*T,i[6]=(g+m)*T,i[7]=0,i[8]=(v+x)*L,i[9]=(g-m)*L,i[10]=(1-(d+b))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=ks.set(i[0],i[1],i[2]).length(),o=ks.set(i[4],i[5],i[6]).length(),a=ks.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],jn.copy(this);let c=1/r,h=1/o,u=1/a;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=h,jn.elements[5]*=h,jn.elements[6]*=h,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,t.setFromRotationMatrix(jn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ti,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),v,b;if(l)v=r/(o-r),b=o*r/(o-r);else if(a===ti)v=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===Yr)v=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ti,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),v,b;if(l)v=1/(o-r),b=o/(o-r);else if(a===ti)v=-2/(o-r),b=-(o+r)/(o-r);else if(a===Yr)v=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ks=new O,jn=new wt,hp=new O(0,0,0),up=new O(1,1,1),Hi=new O,Ko=new O,Un=new O,_u=new wt,bu=new Wn,Xn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _u.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_u,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bu.setFromEuler(this),this.setFromQuaternion(bu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xn.DEFAULT_ORDER="XYZ";var Zr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},dp=0,Mu=new O,Fs=new Wn,_i=new wt,Zo=new O,kr=new O,fp=new O,pp=new Wn,Su=new O(1,0,0),wu=new O(0,1,0),Eu=new O(0,0,1),Tu={type:"added"},mp={type:"removed"},Us={type:"childadded",child:null},Ac={type:"childremoved",child:null},tn=class s extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new O,t=new Xn,n=new Wn,i=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new wt},normalMatrix:{value:new lt}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.premultiply(Fs),this}rotateX(e){return this.rotateOnAxis(Su,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Eu,e)}translateOnAxis(e,t){return Mu.copy(e).applyQuaternion(this.quaternion),this.position.add(Mu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Su,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Eu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Zo.copy(e):Zo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(kr,Zo,this.up):_i.lookAt(Zo,kr,this.up),this.quaternion.setFromRotationMatrix(_i),i&&(_i.extractRotation(i.matrixWorld),Fs.setFromRotationMatrix(_i),this.quaternion.premultiply(Fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tu),Us.child=e,this.dispatchEvent(Us),Us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mp),Ac.child=e,this.dispatchEvent(Ac),Ac.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tu),Us.child=e,this.dispatchEvent(Us),Us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e,fp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,pp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),v=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};tn.DEFAULT_UP=new O(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qn=new O,bi=new O,Rc=new O,Mi=new O,Ns=new O,Os=new O,Au=new O,Cc=new O,Ic=new O,Pc=new O,Lc=new Tt,Dc=new Tt,kc=new Tt,Si=class s{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Qn.subVectors(e,t),i.cross(Qn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Qn.subVectors(i,t),bi.subVectors(n,t),Rc.subVectors(e,t);let o=Qn.dot(Qn),a=Qn.dot(bi),l=Qn.dot(Rc),c=bi.dot(bi),h=bi.dot(Rc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,v=(o*h-a*l)*d;return r.set(1-f-v,v,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mi.x),l.addScaledVector(o,Mi.y),l.addScaledVector(a,Mi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Lc.setScalar(0),Dc.setScalar(0),kc.setScalar(0),Lc.fromBufferAttribute(e,t),Dc.fromBufferAttribute(e,n),kc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Lc,r.x),o.addScaledVector(Dc,r.y),o.addScaledVector(kc,r.z),o}static isFrontFacing(e,t,n,i){return Qn.subVectors(n,t),bi.subVectors(e,t),Qn.cross(bi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Qn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Ns.subVectors(i,n),Os.subVectors(r,n),Cc.subVectors(e,n);let l=Ns.dot(Cc),c=Os.dot(Cc);if(l<=0&&c<=0)return t.copy(n);Ic.subVectors(e,i);let h=Ns.dot(Ic),u=Os.dot(Ic);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ns,o);Pc.subVectors(e,r);let f=Ns.dot(Pc),v=Os.dot(Pc);if(v>=0&&f<=v)return t.copy(r);let b=f*c-l*v;if(b<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(n).addScaledVector(Os,a);let g=h*v-f*u;if(g<=0&&u-h>=0&&f-v>=0)return Au.subVectors(r,i),a=(u-h)/(u-h+(f-v)),t.copy(i).addScaledVector(Au,a);let p=1/(g+b+d);return o=b*p,a=d*p,t.copy(n).addScaledVector(Ns,o).addScaledVector(Os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Jo={h:0,s:0,l:0};function Fc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,bt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=bt.workingColorSpace){if(e=rp(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Fc(o,r,e+1/3),this.g=Fc(o,r,e),this.b=Fc(o,r,e-1/3)}return bt.colorSpaceToWorking(this,i),this}setStyle(e,t=Wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){let n=Ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return bt.workingToColorSpace(mn.copy(this),e),Math.round(vt(mn.r*255,0,255))*65536+Math.round(vt(mn.g*255,0,255))*256+Math.round(vt(mn.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.workingToColorSpace(mn.copy(this),t);let n=mn.r,i=mn.g,r=mn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=bt.workingColorSpace){return bt.workingToColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=Wt){bt.workingToColorSpace(mn.copy(this),e);let t=mn.r,n=mn.g,i=mn.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(Jo);let n=vc(Vi.h,Jo.h,t),i=vc(Vi.s,Jo.s,t),r=vc(Vi.l,Jo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},mn=new Qe;Qe.NAMES=Ld;var gp=0,ui=class extends Ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=Ai,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=va,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zs,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==Ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ga&&(n.blendSrc=this.blendSrc),this.blendDst!==va&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zs&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Jt=class extends ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var en=new O,jo=new Ee,vp=0,Mn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_a,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)jo.fromBufferAttribute(this,t),jo.applyMatrix3(e),this.setXY(t,jo.x,jo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_a&&(e.usage=this.usage),e}};var Jr=class extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var jr=class extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mt=class extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}},xp=0,Gn=new wt,Uc=new tn,Bs=new O,Nn=new hi,Fr=new hi,ln=new O,jt=class s extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mh(e)?jr:Jr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,n){return Gn.makeTranslation(e,t,n),this.applyMatrix4(Gn),this}scale(e,t,n){return Gn.makeScale(e,t,n),this.applyMatrix4(Gn),this}lookAt(e){return Uc.lookAt(e),Uc.updateMatrix(),this.applyMatrix4(Uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Nn.min,Fr.min),Nn.expandByPoint(ln),ln.addVectors(Nn.max,Fr.max),Nn.expandByPoint(ln)):(Nn.expandByPoint(Fr.min),Nn.expandByPoint(Fr.max))}Nn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)ln.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(ln));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ln.fromBufferAttribute(a,c),l&&(Bs.fromBufferAttribute(e,c),ln.add(Bs)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new O,l[R]=new O;let c=new O,h=new O,u=new O,d=new Ee,f=new Ee,v=new Ee,b=new O,g=new O;function p(R,S,w){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,w),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),v.fromBufferAttribute(r,w),h.sub(c),u.sub(c),f.sub(d),v.sub(d);let A=1/(f.x*v.y-v.x*f.y);isFinite(A)&&(b.copy(h).multiplyScalar(v.y).addScaledVector(u,-f.y).multiplyScalar(A),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-v.x).multiplyScalar(A),a[R].add(b),a[S].add(b),a[w].add(b),l[R].add(g),l[S].add(g),l[w].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let R=0,S=m.length;R<S;++R){let w=m[R],A=w.start,k=w.count;for(let C=A,z=A+k;C<z;C+=3)p(e.getX(C+0),e.getX(C+1),e.getX(C+2))}let x=new O,y=new O,E=new O,T=new O;function L(R){E.fromBufferAttribute(i,R),T.copy(E);let S=a[R];x.copy(S),x.sub(E.multiplyScalar(E.dot(S))).normalize(),y.crossVectors(T,S);let A=y.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,A)}for(let R=0,S=m.length;R<S;++R){let w=m[R],A=w.start,k=w.count;for(let C=A,z=A+k;C<z;C+=3)L(e.getX(C+0)),L(e.getX(C+1)),L(e.getX(C+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new O,r=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let d=0,f=e.count;d<f;d+=3){let v=e.getX(d+0),b=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,v),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,v=0;for(let b=0,g=l.length;b<g;b++){a.isInterleavedBufferAttribute?f=l[b]*a.data.stride+a.offset:f=l[b]*h;for(let p=0;p<h;p++)d[v++]=c[f++]}return new Mn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ru=new wt,ls=new Ea,Qo=new qi,Cu=new O,ea=new O,ta=new O,na=new O,Nc=new O,ia=new O,Iu=new O,sa=new O,Ze=class extends tn{constructor(e=new jt,t=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){ia.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Nc.fromBufferAttribute(u,e),o?ia.addScaledVector(Nc,h):ia.addScaledVector(Nc.sub(t),h))}t.add(ia)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qo.copy(n.boundingSphere),Qo.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(Qo.containsPoint(ls.origin)===!1&&(ls.intersectSphere(Qo,Cu)===null||ls.origin.distanceToSquared(Cu)>(e.far-e.near)**2))&&(Ru.copy(r).invert(),ls.copy(e.ray).applyMatrix4(Ru),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,b=d.length;v<b;v++){let g=d[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let T=a.getX(y),L=a.getX(y+1),R=a.getX(y+2);i=ra(this,p,e,n,c,h,u,T,L,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),b=Math.min(a.count,f.start+f.count);for(let g=v,p=b;g<p;g+=3){let m=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=ra(this,o,e,n,c,h,u,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,b=d.length;v<b;v++){let g=d[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let T=y,L=y+1,R=y+2;i=ra(this,p,e,n,c,h,u,T,L,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let g=v,p=b;g<p;g+=3){let m=g,x=g+1,y=g+2;i=ra(this,o,e,n,c,h,u,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function yp(s,e,t,n,i,r,o,a){let l;if(e.side===fn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Ti,a),l===null)return null;sa.copy(a),sa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(sa);return c<t.near||c>t.far?null:{distance:c,point:sa.clone(),object:s}}function ra(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,ea),s.getVertexPosition(l,ta),s.getVertexPosition(c,na);let h=yp(s,e,t,n,ea,ta,na,Iu);if(h){let u=new O;Si.getBarycoord(Iu,ea,ta,na,u),i&&(h.uv=Si.getInterpolatedAttribute(i,a,l,c,u,new Ee)),r&&(h.uv1=Si.getInterpolatedAttribute(r,a,l,c,u,new Ee)),o&&(h.normal=Si.getInterpolatedAttribute(o,a,l,c,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new O,materialIndex:0};Si.getNormal(ea,ta,na,d.normal),h.face=d,h.barycoord=u}return h}var Vt=class s extends jt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;v("z","y","x",-1,-1,n,t,e,o,r,0),v("z","y","x",1,-1,n,t,-e,o,r,1),v("x","z","y",1,1,e,n,t,i,o,2),v("x","z","y",1,-1,e,n,-t,i,o,3),v("x","y","z",1,-1,e,t,n,i,r,4),v("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(u,2));function v(b,g,p,m,x,y,E,T,L,R,S){let w=y/L,A=E/R,k=y/2,C=E/2,z=T/2,W=L+1,K=R+1,j=0,X=0,ae=new O;for(let he=0;he<K;he++){let _e=he*A-C;for(let Re=0;Re<W;Re++){let Xe=Re*w-k;ae[b]=Xe*m,ae[g]=_e*x,ae[p]=z,c.push(ae.x,ae.y,ae.z),ae[b]=0,ae[g]=0,ae[p]=T>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(Re/L),u.push(1-he/R),j+=1}}for(let he=0;he<R;he++)for(let _e=0;_e<L;_e++){let Re=d+_e+W*he,Xe=d+_e+W*(he+1),qe=d+(_e+1)+W*(he+1),He=d+(_e+1)+W*he;l.push(Re,Xe,He),l.push(Xe,qe,He),X+=6}a.addGroup(f,X,S),f+=X,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function vs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function vn(s){let e={};for(let t=0;t<s.length;t++){let n=vs(s[t]);for(let i in n)e[i]=n[i]}return e}function _p(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function gh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}var Dd={clone:vs,merge:vn},bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nn=class extends ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bp,this.fragmentShader=Mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vs(e.uniforms),this.uniformsGroups=_p(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Qr=class extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Gi=new O,Pu=new Ee,Lu=new Ee,cn=class extends Qr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(gc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ba*2*Math.atan(Math.tan(gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,Pu,Lu),t.subVectors(Lu,Pu)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},zs=-90,Hs=1,Ta=class extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new cn(zs,Hs,e,t);i.layers=this.layers,this.add(i);let r=new cn(zs,Hs,e,t);r.layers=this.layers,this.add(r);let o=new cn(zs,Hs,e,t);o.layers=this.layers,this.add(o);let a=new cn(zs,Hs,e,t);a.layers=this.layers,this.add(a);let l=new cn(zs,Hs,e,t);l.layers=this.layers,this.add(l);let c=new cn(zs,Hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},eo=class extends Sn{constructor(e=[],t=ms,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Aa=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new eo(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Vt(5,5,5),r=new nn({name:"CubemapFromEquirect",uniforms:vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:Pi});r.uniforms.tEquirect.value=t;let o=new Ze(i,r),a=t.minFilter;return t.minFilter===ji&&(t.minFilter=ni),new Ta(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Kt=class extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Sp={type:"move"},Qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let b of e.hand.values()){let g=t.getJointPose(b,n),p=this._getHandJoint(c,b);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,v=.005;c.inputState.pinching&&d>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sp)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var to=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ci=class extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_a,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},bn=new O,no=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},er=class extends ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vs,Ur=new O,Gs=new O,Ws=new O,Xs=new Ee,Nr=new Ee,kd=new wt,oa=new O,Or=new O,aa=new O,Du=new Ee,Oc=new Ee,ku=new Ee,io=class extends tn{constructor(e=new er){if(super(),this.isSprite=!0,this.type="Sprite",Vs===void 0){Vs=new jt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ra(t,5);Vs.setIndex([0,1,2,0,2,3]),Vs.setAttribute("position",new no(n,3,0,!1)),Vs.setAttribute("uv",new no(n,2,3,!1))}this.geometry=Vs,this.material=e,this.center=new Ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gs.setFromMatrixScale(this.matrixWorld),kd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gs.multiplyScalar(-Ws.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;la(oa.set(-.5,-.5,0),Ws,o,Gs,i,r),la(Or.set(.5,-.5,0),Ws,o,Gs,i,r),la(aa.set(.5,.5,0),Ws,o,Gs,i,r),Du.set(0,0),Oc.set(1,0),ku.set(1,1);let a=e.ray.intersectTriangle(oa,Or,aa,!1,Ur);if(a===null&&(la(Or.set(-.5,.5,0),Ws,o,Gs,i,r),Oc.set(0,1),a=e.ray.intersectTriangle(oa,aa,Or,!1,Ur),a===null))return;let l=e.ray.origin.distanceTo(Ur);l<e.near||l>e.far||t.push({distance:l,point:Ur.clone(),uv:Si.getInterpolation(Ur,oa,Or,aa,Du,Oc,ku,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function la(s,e,t,n,i,r){Xs.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Nr.x=r*Xs.x-i*Xs.y,Nr.y=i*Xs.x+r*Xs.y):Nr.copy(Xs),s.copy(e),s.x+=Nr.x,s.y+=Nr.y,s.applyMatrix4(kd)}var Ca=class extends Sn{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Pn,h=Pn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ii=class extends Mn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},qs=new wt,Fu=new wt,ca=[],Uu=new hi,wp=new wt,Br=new Ze,zr=new qi,Ln=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ii(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,wp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),Uu.copy(e.boundingBox).applyMatrix4(qs),this.boundingBox.union(Uu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qs),zr.copy(e.boundingSphere).applyMatrix4(qs),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,qs),Fu.multiplyMatrices(n,qs),Br.matrixWorld=Fu,Br.raycast(e,ca);for(let o=0,a=ca.length;o<a;o++){let l=ca[o];l.instanceId=r,l.object=this,t.push(l)}ca.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ii(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ca(new Float32Array(i*this.count),i,this.count,ul,oi));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Bc=new O,Ep=new O,Tp=new lt,ai=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Bc.subVectors(n,t).cross(Ep.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Bc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Tp.getNormalMatrix(e),i=this.coplanarPoint(Bc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},cs=new qi,Ap=new Ee(.5,.5),ha=new O,tr=class{constructor(e=new ai,t=new ai,n=new ai,i=new ai,r=new ai,o=new ai){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],v=r[8],b=r[9],g=r[10],p=r[11],m=r[12],x=r[13],y=r[14],E=r[15];if(i[0].setComponents(c-o,f-h,p-v,E-m).normalize(),i[1].setComponents(c+o,f+h,p+v,E+m).normalize(),i[2].setComponents(c+a,f+u,p+b,E+x).normalize(),i[3].setComponents(c-a,f-u,p-b,E-x).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,p-g,E-y).normalize();else if(i[4].setComponents(c-l,f-d,p-g,E-y).normalize(),t===ti)i[5].setComponents(c+l,f+d,p+g,E+y).normalize();else if(t===Yr)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){cs.center.set(0,0,0);let t=Ap.distanceTo(e.center);return cs.radius=.7071067811865476+t,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ha.x=i.normal.x>0?e.max.x:e.min.x,ha.y=i.normal.y>0?e.max.y:e.min.y,ha.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ha)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var so=class extends Sn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ro=class extends Sn{constructor(e,t,n=Qi,i,r,o,a=Pn,l=Pn,c,h=Ks,u=1){if(h!==Ks&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new js(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},oo=class extends Sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},nr=class s extends jt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,v=n*2+r,b=i+1,g=new O,p=new O;for(let m=0;m<=v;m++){let x=0,y=0,E=0,T=0;if(m<=n){let S=m/n,w=S*Math.PI/2;y=-h-e*Math.cos(w),E=e*Math.sin(w),T=-e*Math.cos(w),x=S*u}else if(m<=n+r){let S=(m-n)/r;y=-h+S*t,E=e,T=0,x=u+S*d}else{let S=(m-n-r)/n,w=S*Math.PI/2;y=h+e*Math.sin(w),E=e*Math.cos(w),T=e*Math.sin(w),x=u+d+S*u}let L=Math.max(0,Math.min(1,x/f)),R=0;m===0?R=.5/i:m===v&&(R=-.5/i);for(let S=0;S<=i;S++){let w=S/i,A=w*Math.PI*2,k=Math.sin(A),C=Math.cos(A);p.x=-E*C,p.y=y,p.z=E*k,a.push(p.x,p.y,p.z),g.set(-E*C,T,E*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(w+R,L)}if(m>0){let S=(m-1)*b;for(let w=0;w<i;w++){let A=S+w,k=S+w+1,C=m*b+w,z=m*b+w+1;o.push(A,k,C),o.push(k,z,C)}}}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var It=class s extends jt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],v=0,b=[],g=n/2,p=0;m(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new mt(u,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(f,2));function m(){let y=new O,E=new O,T=0,L=(t-e)/n;for(let R=0;R<=r;R++){let S=[],w=R/r,A=w*(t-e)+e;for(let k=0;k<=i;k++){let C=k/i,z=C*l+a,W=Math.sin(z),K=Math.cos(z);E.x=A*W,E.y=-w*n+g,E.z=A*K,u.push(E.x,E.y,E.z),y.set(W,L,K).normalize(),d.push(y.x,y.y,y.z),f.push(C,1-w),S.push(v++)}b.push(S)}for(let R=0;R<i;R++)for(let S=0;S<r;S++){let w=b[S][R],A=b[S+1][R],k=b[S+1][R+1],C=b[S][R+1];(e>0||S!==0)&&(h.push(w,A,C),T+=3),(t>0||S!==r-1)&&(h.push(A,k,C),T+=3)}c.addGroup(p,T,0),p+=T}function x(y){let E=v,T=new Ee,L=new O,R=0,S=y===!0?e:t,w=y===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,g*w,0),d.push(0,w,0),f.push(.5,.5),v++;let A=v;for(let k=0;k<=i;k++){let z=k/i*l+a,W=Math.cos(z),K=Math.sin(z);L.x=S*K,L.y=g*w,L.z=S*W,u.push(L.x,L.y,L.z),d.push(0,w,0),T.x=W*.5+.5,T.y=K*.5*w+.5,f.push(T.x,T.y),v++}for(let k=0;k<i;k++){let C=E+k,z=A+k;y===!0?h.push(z,z+1,C):h.push(z+1,z,C),R+=3}c.addGroup(p,R,y===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ii=class s extends It{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ia=class s extends jt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new mt(r,3)),this.setAttribute("normal",new mt(r.slice(),3)),this.setAttribute("uv",new mt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(m){let x=new O,y=new O,E=new O;for(let T=0;T<t.length;T+=3)f(t[T+0],x),f(t[T+1],y),f(t[T+2],E),l(x,y,E,m)}function l(m,x,y,E){let T=E+1,L=[];for(let R=0;R<=T;R++){L[R]=[];let S=m.clone().lerp(y,R/T),w=x.clone().lerp(y,R/T),A=T-R;for(let k=0;k<=A;k++)k===0&&R===T?L[R][k]=S:L[R][k]=S.clone().lerp(w,k/A)}for(let R=0;R<T;R++)for(let S=0;S<2*(T-R)-1;S++){let w=Math.floor(S/2);S%2===0?(d(L[R][w+1]),d(L[R+1][w]),d(L[R][w])):(d(L[R][w+1]),d(L[R+1][w+1]),d(L[R+1][w]))}}function c(m){let x=new O;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(m),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){let m=new O;for(let x=0;x<r.length;x+=3){m.x=r[x+0],m.y=r[x+1],m.z=r[x+2];let y=g(m)/2/Math.PI+.5,E=p(m)/Math.PI+.5;o.push(y,1-E)}v(),u()}function u(){for(let m=0;m<o.length;m+=6){let x=o[m+0],y=o[m+2],E=o[m+4],T=Math.max(x,y,E),L=Math.min(x,y,E);T>.9&&L<.1&&(x<.2&&(o[m+0]+=1),y<.2&&(o[m+2]+=1),E<.2&&(o[m+4]+=1))}}function d(m){r.push(m.x,m.y,m.z)}function f(m,x){let y=m*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function v(){let m=new O,x=new O,y=new O,E=new O,T=new Ee,L=new Ee,R=new Ee;for(let S=0,w=0;S<r.length;S+=9,w+=6){m.set(r[S+0],r[S+1],r[S+2]),x.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),T.set(o[w+0],o[w+1]),L.set(o[w+2],o[w+3]),R.set(o[w+4],o[w+5]),E.copy(m).add(x).add(y).divideScalar(3);let A=g(E);b(T,w+0,m,A),b(L,w+2,x,A),b(R,w+4,y,A)}}function b(m,x,y,E){E<0&&m.x===1&&(o[x]=m.x-1),y.x===0&&y.z===0&&(o[x]=E/2/Math.PI+.5)}function g(m){return Math.atan2(m.z,-m.x)}function p(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var On=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Ee:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new O,i=[],r=[],o=[],a=new O,l=new wt;for(let f=0;f<=e;f++){let v=f/e;i[f]=this.getTangentAt(v,new O)}r[0]=new O,o[0]=new O;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(vt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,v))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(vt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(i[v],f*v)),o[v].crossVectors(i[v],r[v])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ir=class extends On{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ee){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Pa=class extends ir{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function vh(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var ua=new O,zc=new vh,Hc=new vh,Vc=new vh,La=class extends On{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new O){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(ua.subVectors(i[0],i[1]).add(i[0]),c=ua);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ua.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ua),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,v=Math.pow(c.distanceToSquared(u),f),b=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);b<1e-4&&(b=1),v<1e-4&&(v=b),g<1e-4&&(g=b),zc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,v,b,g),Hc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,v,b,g),Vc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,v,b,g)}else this.curveType==="catmullrom"&&(zc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Hc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Vc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(zc.calc(l),Hc.calc(l),Vc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new O().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Nu(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Rp(s,e){let t=1-s;return t*t*e}function Cp(s,e){return 2*(1-s)*s*e}function Ip(s,e){return s*s*e}function Gr(s,e,t,n){return Rp(s,e)+Cp(s,t)+Ip(s,n)}function Pp(s,e){let t=1-s;return t*t*t*e}function Lp(s,e){let t=1-s;return 3*t*t*s*e}function Dp(s,e){return 3*(1-s)*s*s*e}function kp(s,e){return s*s*s*e}function Wr(s,e,t,n,i){return Pp(s,e)+Lp(s,t)+Dp(s,n)+kp(s,i)}var ao=class extends On{constructor(e=new Ee,t=new Ee,n=new Ee,i=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Ee){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Wr(e,i.x,r.x,o.x,a.x),Wr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Da=class extends On{constructor(e=new O,t=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new O){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Wr(e,i.x,r.x,o.x,a.x),Wr(e,i.y,r.y,o.y,a.y),Wr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},lo=class extends On{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends On{constructor(e=new O,t=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new O){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new O){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends On{constructor(e=new Ee,t=new Ee,n=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ee){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Gr(e,i.x,r.x,o.x),Gr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends On{constructor(e=new O,t=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new O){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Gr(e,i.x,r.x,o.x),Gr(e,i.y,r.y,o.y),Gr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Nu(a,l.x,c.x,h.x,u.x),Nu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Ee().fromArray(i))}return this}},Ou=Object.freeze({__proto__:null,ArcCurve:Pa,CatmullRomCurve3:La,CubicBezierCurve:ao,CubicBezierCurve3:Da,EllipseCurve:ir,LineCurve:lo,LineCurve3:ka,QuadraticBezierCurve:co,QuadraticBezierCurve3:Fa,SplineCurve:ho}),Ua=class extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ou[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ou[i.type]().fromJSON(i))}return this}},uo=class extends Ua{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new lo(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new co(this.currentPoint.clone(),new Ee(e,t),new Ee(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new ao(this.currentPoint.clone(),new Ee(e,t),new Ee(n,i),new Ee(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ho(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new ir(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},sr=class extends uo{constructor(e){super(e),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new uo().fromJSON(i))}return this}};function Fp(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Fd(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=zp(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=s[d],v=s[d+1];f<a&&(a=f),v<l&&(l=v),f>h&&(h=f),v>u&&(u=v)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return fo(r,o,t,a,l,c,0),o}function Fd(s,e,t,n,i){let r;if(i===Jp(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Bu(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Bu(o/n|0,s[o],s[o+1],r);return r&&rr(r,r.next)&&(mo(r),r=r.next),r}function fs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(rr(t,t.next)||$t(t.prev,t,t.next)===0)){if(mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Xp(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Np(s,n,i,r):Up(s)){e.push(l.i,s.i,c.i),mo(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Op(fs(s),e),fo(s,e,t,n,i,r,2)):o===2&&Bp(s,e,t,n,i,r):fo(fs(s),e,t,n,i,r,1);break}}}function Up(s){let e=s.prev,t=s,n=s.next;if($t(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),v=n.next;for(;v!==e;){if(v.x>=h&&v.x<=d&&v.y>=u&&v.y<=f&&Vr(i,a,r,l,o,c,v.x,v.y)&&$t(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Np(s,e,t,n){let i=s.prev,r=s,o=s.next;if($t(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),v=Math.min(h,u,d),b=Math.max(a,l,c),g=Math.max(h,u,d),p=$c(f,v,e,t,n),m=$c(b,g,e,t,n),x=s.prevZ,y=s.nextZ;for(;x&&x.z>=p&&y&&y.z<=m;){if(x.x>=f&&x.x<=b&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&Vr(a,h,l,u,c,d,x.x,x.y)&&$t(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=b&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&Vr(a,h,l,u,c,d,y.x,y.y)&&$t(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=b&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&Vr(a,h,l,u,c,d,x.x,x.y)&&$t(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=m;){if(y.x>=f&&y.x<=b&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&Vr(a,h,l,u,c,d,y.x,y.y)&&$t(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Op(s,e){let t=s;do{let n=t.prev,i=t.next.next;!rr(n,i)&&Nd(n,t,t.next,i)&&po(n,i)&&po(i,n)&&(e.push(n.i,t.i,i.i),mo(t),mo(t.next),t=s=i),t=t.next}while(t!==s);return fs(t)}function Bp(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$p(o,a)){let l=Od(o,a);o=fs(o,o.next),l=fs(l,l.next),fo(o,e,t,n,i,r,0),fo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function zp(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Fd(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Yp(c))}i.sort(Hp);for(let r=0;r<i.length;r++)t=Vp(i[r],t);return t}function Hp(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Vp(s,e){let t=Gp(s,e);if(!t)return e;let n=Od(t,s);return fs(n,n.next),fs(t,t.next)}function Gp(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(rr(s,t))return t;do{if(rr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ud(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);po(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Wp(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Wp(s,e){return $t(s.prev,s,e.prev)<0&&$t(e.next,s,s.next)<0}function Xp(s,e,t,n){let i=s;do i.z===0&&(i.z=$c(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,qp(i)}function qp(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function $c(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Yp(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Ud(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Vr(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Ud(s,e,t,n,i,r,o,a)}function $p(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Kp(s,e)&&(po(s,e)&&po(e,s)&&Zp(s,e)&&($t(s.prev,s,e.prev)||$t(s,e.prev,e))||rr(s,e)&&$t(s.prev,s,s.next)>0&&$t(e.prev,e,e.next)>0)}function $t(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function rr(s,e){return s.x===e.x&&s.y===e.y}function Nd(s,e,t,n){let i=fa($t(s,e,t)),r=fa($t(s,e,n)),o=fa($t(t,n,s)),a=fa($t(t,n,e));return!!(i!==r&&o!==a||i===0&&da(s,t,e)||r===0&&da(s,n,e)||o===0&&da(t,s,n)||a===0&&da(t,e,n))}function da(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function fa(s){return s>0?1:s<0?-1:0}function Kp(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Nd(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function po(s,e){return $t(s.prev,s,s.next)<0?$t(s,e,s.next)>=0&&$t(s,s.prev,e)>=0:$t(s,e,s.prev)<0||$t(s,s.next,e)<0}function Zp(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Od(s,e){let t=Kc(s.i,s.x,s.y),n=Kc(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Bu(s,e,t,n){let i=Kc(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Kc(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Jp(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Zc=class{static triangulate(e,t,n=2){return Fp(e,t,n)}},$s=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];zu(e),Hu(n,e);let o=e.length;t.forEach(zu);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Hu(n,t[l]);let a=Zc.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function zu(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Hu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var go=class s extends Ia{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var wn=class s extends jt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],v=[],b=[],g=[];for(let p=0;p<h;p++){let m=p*d-o;for(let x=0;x<c;x++){let y=x*u-r;v.push(y,-m,0),b.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let m=0;m<a;m++){let x=m+c*p,y=m+c*(p+1),E=m+1+c*(p+1),T=m+1+c*p;f.push(x,y,T),f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(b,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},di=class s extends jt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new O,v=new Ee;for(let b=0;b<=i;b++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,h.push(v.x,v.y)}u+=d}for(let b=0;b<i;b++){let g=b*(n+1);for(let p=0;p<n;p++){let m=p+g,x=m,y=m+n+1,E=m+n+2,T=m+1;a.push(x,y,T),a.push(y,E,T)}}this.setIndex(a),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},vo=class s extends jt{constructor(e=new sr([new Ee(0,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new mt(i,3)),this.setAttribute("normal",new mt(r,3)),this.setAttribute("uv",new mt(o,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,v=d.holes;$s.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=v.length;g<p;g++){let m=v[g];$s.isClockWise(m)===!0&&(v[g]=m.reverse())}let b=$s.triangulateShape(f,v);for(let g=0,p=v.length;g<p;g++){let m=v[g];f=f.concat(m)}for(let g=0,p=f.length;g<p;g++){let m=f[g];i.push(m.x,m.y,0),r.push(0,0,1),o.push(m.x,m.y)}for(let g=0,p=b.length;g<p;g++){let m=b[g],x=m[0]+u,y=m[1]+u,E=m[2]+u;n.push(x,y,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return jp(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function jp(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var En=class s extends jt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new O,d=new O,f=[],v=[],b=[],g=[];for(let p=0;p<=n;p++){let m=[],x=p/n,y=0;p===0&&o===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let T=E/t;u.x=-e*Math.cos(i+T*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+T*r)*Math.sin(o+x*a),v.push(u.x,u.y,u.z),d.copy(u).normalize(),b.push(d.x,d.y,d.z),g.push(T+y,1-x),m.push(c++)}h.push(m)}for(let p=0;p<n;p++)for(let m=0;m<t;m++){let x=h[p][m+1],y=h[p][m],E=h[p+1][m],T=h[p+1][m+1];(p!==0||o>0)&&f.push(x,y,T),(p!==n-1||l<Math.PI)&&f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(b,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Yi=class s extends jt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new O,u=new O,d=new O;for(let f=0;f<=n;f++)for(let v=0;v<=i;v++){let b=v/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(b),u.y=(e+t*Math.cos(g))*Math.sin(b),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(v/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let v=1;v<=i;v++){let b=(i+1)*f+v-1,g=(i+1)*(f-1)+v-1,p=(i+1)*(f-1)+v,m=(i+1)*f+v;o.push(b,g,m),o.push(g,p,m)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var $i=class extends ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gl,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Qt=class extends ui{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gl,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Na=class extends ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_d,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Oa=class extends ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function pa(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Qp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var ps=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ba=class extends ps{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xc,endingEnd:Xc}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case qc:r=e,a=2*t-n;break;case Yc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case qc:o=e,l=2*n-t;break;case Yc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,v=(n-t)/(i-t),b=v*v,g=b*v,p=-d*g+2*d*b-d*v,m=(1+d)*g+(-1.5-2*d)*b+(-.5+d)*v+1,x=(-1-f)*g+(1.5+f)*b+.5*v,y=f*g-f*b;for(let E=0;E!==a;++E)r[E]=p*o[h+E]+m*o[c+E]+x*o[l+E]+y*o[u+E];return r}},za=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Ha=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Bn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=pa(t,this.TimeBufferType),this.values=pa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:pa(e.times,Array),values:pa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ba(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Xr:t=this.InterpolantFactoryMethodDiscrete;break;case ya:t=this.InterpolantFactoryMethodLinear;break;case ma:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xr;case this.InterpolantFactoryMethodLinear:return ya;case this.InterpolantFactoryMethodSmooth:return ma}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Qp(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ma,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let v=0;v!==n;++v){let b=t[u+v];if(b!==t[d+v]||b!==t[f+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=ya;var Ki=class extends Bn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Xr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Va=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}};Va.prototype.ValueTypeName="color";var Ga=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}};Ga.prototype.ValueTypeName="number";var Wa=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Wn.slerpFlat(r,0,o,c-a,o,c,l);return r}},xo=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Wa(this.times,this.values,this.getValueSize(),e)}};xo.prototype.ValueTypeName="quaternion";xo.prototype.InterpolantFactoryMethodSmooth=void 0;var Zi=class extends Bn{constructor(e,t,n){super(e,t,n)}};Zi.prototype.ValueTypeName="string";Zi.prototype.ValueBufferType=Array;Zi.prototype.DefaultInterpolation=Xr;Zi.prototype.InterpolantFactoryMethodLinear=void 0;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Xa=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}};Xa.prototype.ValueTypeName="vector";var qa=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],v=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Bd=new qa,Ya=class{constructor(e){this.manager=e!==void 0?e:Bd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ya.DEFAULT_MATERIAL_NAME="__DEFAULT";var or=class extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ar=class extends or{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Gc=new wt,Vu=new O,Gu=new O,$a=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Vu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vu),Gu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gu),t.updateMatrixWorld(),Gc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Wu=new wt,Hr=new O,Wc=new O,Jc=class extends $a{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hr),Wc.copy(n.position),Wc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wc),n.updateMatrixWorld(),i.makeTranslation(-Hr.x,-Hr.y,-Hr.z),Wu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wu,n.coordinateSystem,n.reversedDepth)}},yo=class extends or{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Jc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},_o=class extends Qr{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},jc=class extends $a{constructor(){super(new _o(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},lr=class extends or{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new jc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var bo=class extends jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ka=class extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var xh="\\[\\]\\.:\\/",em=new RegExp("["+xh+"]","g"),yh="[^"+xh+"]",tm="[^"+xh.replace("\\.","")+"]",nm=/((?:WC+[\/:])*)/.source.replace("WC",yh),im=/(WCOD+)?/.source.replace("WCOD",tm),sm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yh),rm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yh),om=new RegExp("^"+nm+im+sm+rm+"$"),am=["material","materials","bones","map"],Qc=class{constructor(e,t,n){let i=n||Ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ht=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(em,"")}static parseTrackName(e){let t=om.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);am.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ht.Composite=Qc;Ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ht.prototype.GetterByBindingType=[Ht.prototype._getValue_direct,Ht.prototype._getValue_array,Ht.prototype._getValue_arrayElement,Ht.prototype._getValue_toArray];Ht.prototype.SetterByBindingTypeAndVersioning=[[Ht.prototype._setValue_direct,Ht.prototype._setValue_direct_setNeedsUpdate,Ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_array,Ht.prototype._setValue_array_setNeedsUpdate,Ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_arrayElement,Ht.prototype._setValue_arrayElement_setNeedsUpdate,Ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_fromArray,Ht.prototype._setValue_fromArray_setNeedsUpdate,Ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Qy=new Float32Array(1);function _h(s,e,t,n){let i=lm(n);switch(t){case ch:return s*e;case ul:return s*e/i.components*i.byteLength;case dl:return s*e/i.components*i.byteLength;case uh:return s*e*2/i.components*i.byteLength;case fl:return s*e*2/i.components*i.byteLength;case hh:return s*e*3/i.components*i.byteLength;case qn:return s*e*4/i.components*i.byteLength;case pl:return s*e*4/i.components*i.byteLength;case wo:case Eo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case To:case Ao:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gl:case xl:return Math.max(s,16)*Math.max(e,8)/4;case ml:case vl:return Math.max(s,8)*Math.max(e,8)/2;case yl:case _l:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case El:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Al:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Dl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case kl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ul:case Nl:case Ol:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Bl:case zl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Hl:case Vl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lm(s){switch(s){case ri:case rh:return{byteLength:1,components:1};case hr:case oh:case ur:return{byteLength:2,components:1};case cl:case hl:return{byteLength:2,components:4};case Qi:case ll:case oi:return{byteLength:4,components:1};case ah:case lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function hf(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function hm(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,v)=>f.start-v.start);let d=0;for(let f=1;f<u.length;f++){let v=u[d],b=u[f];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++d,u[d]=b)}u.length=d+1;for(let f=0,v=u.length;f<v;f++){let b=u[f];s.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ym=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,_m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Em=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,km=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Um=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Om=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,e0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,i0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,s0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,l0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,c0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,h0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,d0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,f0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,x0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,M0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,S0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,w0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,A0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,C0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,D0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,k0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,F0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,U0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,O0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,z0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,H0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,W0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Y0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,K0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Z0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,J0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,j0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ig=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,hg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ug=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ag=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ug=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:um,alphahash_pars_fragment:dm,alphamap_fragment:fm,alphamap_pars_fragment:pm,alphatest_fragment:mm,alphatest_pars_fragment:gm,aomap_fragment:vm,aomap_pars_fragment:xm,batching_pars_vertex:ym,batching_vertex:_m,begin_vertex:bm,beginnormal_vertex:Mm,bsdfs:Sm,iridescence_fragment:wm,bumpmap_pars_fragment:Em,clipping_planes_fragment:Tm,clipping_planes_pars_fragment:Am,clipping_planes_pars_vertex:Rm,clipping_planes_vertex:Cm,color_fragment:Im,color_pars_fragment:Pm,color_pars_vertex:Lm,color_vertex:Dm,common:km,cube_uv_reflection_fragment:Fm,defaultnormal_vertex:Um,displacementmap_pars_vertex:Nm,displacementmap_vertex:Om,emissivemap_fragment:Bm,emissivemap_pars_fragment:zm,colorspace_fragment:Hm,colorspace_pars_fragment:Vm,envmap_fragment:Gm,envmap_common_pars_fragment:Wm,envmap_pars_fragment:Xm,envmap_pars_vertex:qm,envmap_physical_pars_fragment:i0,envmap_vertex:Ym,fog_vertex:$m,fog_pars_vertex:Km,fog_fragment:Zm,fog_pars_fragment:Jm,gradientmap_pars_fragment:jm,lightmap_pars_fragment:Qm,lights_lambert_fragment:e0,lights_lambert_pars_fragment:t0,lights_pars_begin:n0,lights_toon_fragment:s0,lights_toon_pars_fragment:r0,lights_phong_fragment:o0,lights_phong_pars_fragment:a0,lights_physical_fragment:l0,lights_physical_pars_fragment:c0,lights_fragment_begin:h0,lights_fragment_maps:u0,lights_fragment_end:d0,logdepthbuf_fragment:f0,logdepthbuf_pars_fragment:p0,logdepthbuf_pars_vertex:m0,logdepthbuf_vertex:g0,map_fragment:v0,map_pars_fragment:x0,map_particle_fragment:y0,map_particle_pars_fragment:_0,metalnessmap_fragment:b0,metalnessmap_pars_fragment:M0,morphinstance_vertex:S0,morphcolor_vertex:w0,morphnormal_vertex:E0,morphtarget_pars_vertex:T0,morphtarget_vertex:A0,normal_fragment_begin:R0,normal_fragment_maps:C0,normal_pars_fragment:I0,normal_pars_vertex:P0,normal_vertex:L0,normalmap_pars_fragment:D0,clearcoat_normal_fragment_begin:k0,clearcoat_normal_fragment_maps:F0,clearcoat_pars_fragment:U0,iridescence_pars_fragment:N0,opaque_fragment:O0,packing:B0,premultiplied_alpha_fragment:z0,project_vertex:H0,dithering_fragment:V0,dithering_pars_fragment:G0,roughnessmap_fragment:W0,roughnessmap_pars_fragment:X0,shadowmap_pars_fragment:q0,shadowmap_pars_vertex:Y0,shadowmap_vertex:$0,shadowmask_pars_fragment:K0,skinbase_vertex:Z0,skinning_pars_vertex:J0,skinning_vertex:j0,skinnormal_vertex:Q0,specularmap_fragment:eg,specularmap_pars_fragment:tg,tonemapping_fragment:ng,tonemapping_pars_fragment:ig,transmission_fragment:sg,transmission_pars_fragment:rg,uv_pars_fragment:og,uv_pars_vertex:ag,uv_vertex:lg,worldpos_vertex:cg,background_vert:hg,background_frag:ug,backgroundCube_vert:dg,backgroundCube_frag:fg,cube_vert:pg,cube_frag:mg,depth_vert:gg,depth_frag:vg,distanceRGBA_vert:xg,distanceRGBA_frag:yg,equirect_vert:_g,equirect_frag:bg,linedashed_vert:Mg,linedashed_frag:Sg,meshbasic_vert:wg,meshbasic_frag:Eg,meshlambert_vert:Tg,meshlambert_frag:Ag,meshmatcap_vert:Rg,meshmatcap_frag:Cg,meshnormal_vert:Ig,meshnormal_frag:Pg,meshphong_vert:Lg,meshphong_frag:Dg,meshphysical_vert:kg,meshphysical_frag:Fg,meshtoon_vert:Ug,meshtoon_frag:Ng,points_vert:Og,points_frag:Bg,shadow_vert:zg,shadow_frag:Hg,sprite_vert:Vg,sprite_frag:Gg},Ie={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},pi={basic:{uniforms:vn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:vn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Qe(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:vn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:vn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:vn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Qe(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:vn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:vn([Ie.points,Ie.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:vn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:vn([Ie.common,Ie.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:vn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:vn([Ie.sprite,Ie.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:vn([Ie.common,Ie.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:vn([Ie.lights,Ie.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};pi.physical={uniforms:vn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var ql={r:0,b:0,g:0},xs=new Xn,Wg=new wt;function Xg(s,e,t,n,i,r,o){let a=new Qe(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function v(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function b(x){let y=!1,E=v(x);E===null?p(a,l):E&&E.isColor&&(p(E,1),y=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,y){let E=v(y);E&&(E.isCubeTexture||E.mapping===Mo)?(h===void 0&&(h=new Ze(new Vt(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:vs(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,L,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),xs.copy(y.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Wg.makeRotationFromEuler(xs)),h.material.toneMapped=bt.getTransfer(E.colorSpace)!==Rt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Ze(new wn(2,2),new nn({name:"BackgroundMaterial",uniforms:vs(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=bt.getTransfer(E.colorSpace)!==Rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(ql,gh(s)),n.buffers.color.setClear(ql.r,ql.g,ql.b,y,o)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:b,addToRenderList:g,dispose:m}}function qg(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(w,A,k,C,z){let W=!1,K=u(C,k,A);r!==K&&(r=K,c(r.object)),W=f(w,C,k,z),W&&v(w,C,k,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(w,A,k,C),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(w){return s.bindVertexArray(w)}function h(w){return s.deleteVertexArray(w)}function u(w,A,k){let C=k.wireframe===!0,z=n[w.id];z===void 0&&(z={},n[w.id]=z);let W=z[A.id];W===void 0&&(W={},z[A.id]=W);let K=W[C];return K===void 0&&(K=d(l()),W[C]=K),K}function d(w){let A=[],k=[],C=[];for(let z=0;z<t;z++)A[z]=0,k[z]=0,C[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:k,attributeDivisors:C,object:w,attributes:{},index:null}}function f(w,A,k,C){let z=r.attributes,W=A.attributes,K=0,j=k.getAttributes();for(let X in j)if(j[X].location>=0){let he=z[X],_e=W[X];if(_e===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(_e=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(_e=w.instanceColor)),he===void 0||he.attribute!==_e||_e&&he.data!==_e.data)return!0;K++}return r.attributesNum!==K||r.index!==C}function v(w,A,k,C){let z={},W=A.attributes,K=0,j=k.getAttributes();for(let X in j)if(j[X].location>=0){let he=W[X];he===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(he=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(he=w.instanceColor));let _e={};_e.attribute=he,he&&he.data&&(_e.data=he.data),z[X]=_e,K++}r.attributes=z,r.attributesNum=K,r.index=C}function b(){let w=r.newAttributes;for(let A=0,k=w.length;A<k;A++)w[A]=0}function g(w){p(w,0)}function p(w,A){let k=r.newAttributes,C=r.enabledAttributes,z=r.attributeDivisors;k[w]=1,C[w]===0&&(s.enableVertexAttribArray(w),C[w]=1),z[w]!==A&&(s.vertexAttribDivisor(w,A),z[w]=A)}function m(){let w=r.newAttributes,A=r.enabledAttributes;for(let k=0,C=A.length;k<C;k++)A[k]!==w[k]&&(s.disableVertexAttribArray(k),A[k]=0)}function x(w,A,k,C,z,W,K){K===!0?s.vertexAttribIPointer(w,A,k,z,W):s.vertexAttribPointer(w,A,k,C,z,W)}function y(w,A,k,C){b();let z=C.attributes,W=k.getAttributes(),K=A.defaultAttributeValues;for(let j in W){let X=W[j];if(X.location>=0){let ae=z[j];if(ae===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(ae=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(ae=w.instanceColor)),ae!==void 0){let he=ae.normalized,_e=ae.itemSize,Re=e.get(ae);if(Re===void 0)continue;let Xe=Re.buffer,qe=Re.type,He=Re.bytesPerElement,te=qe===s.INT||qe===s.UNSIGNED_INT||ae.gpuType===ll;if(ae.isInterleavedBufferAttribute){let q=ae.data,le=q.stride,Le=ae.offset;if(q.isInstancedInterleavedBuffer){for(let oe=0;oe<X.locationSize;oe++)p(X.location+oe,q.meshPerAttribute);w.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let oe=0;oe<X.locationSize;oe++)g(X.location+oe);s.bindBuffer(s.ARRAY_BUFFER,Xe);for(let oe=0;oe<X.locationSize;oe++)x(X.location+oe,_e/X.locationSize,qe,he,le*He,(Le+_e/X.locationSize*oe)*He,te)}else{if(ae.isInstancedBufferAttribute){for(let q=0;q<X.locationSize;q++)p(X.location+q,ae.meshPerAttribute);w.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let q=0;q<X.locationSize;q++)g(X.location+q);s.bindBuffer(s.ARRAY_BUFFER,Xe);for(let q=0;q<X.locationSize;q++)x(X.location+q,_e/X.locationSize,qe,he,_e*He,_e/X.locationSize*q*He,te)}}else if(K!==void 0){let he=K[j];if(he!==void 0)switch(he.length){case 2:s.vertexAttrib2fv(X.location,he);break;case 3:s.vertexAttrib3fv(X.location,he);break;case 4:s.vertexAttrib4fv(X.location,he);break;default:s.vertexAttrib1fv(X.location,he)}}}}m()}function E(){R();for(let w in n){let A=n[w];for(let k in A){let C=A[k];for(let z in C)h(C[z].object),delete C[z];delete A[k]}delete n[w]}}function T(w){if(n[w.id]===void 0)return;let A=n[w.id];for(let k in A){let C=A[k];for(let z in C)h(C[z].object),delete C[z];delete A[k]}delete n[w.id]}function L(w){for(let A in n){let k=n[A];if(k[w.id]===void 0)continue;let C=k[w.id];for(let z in C)h(C[z].object),delete C[z];delete k[w.id]}}function R(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:L,initAttributes:b,enableAttribute:g,disableUnusedAttributes:m}}function Yg(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let v=0;v<u;v++)f+=h[v];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)o(c[v],h[v],d[v]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let v=0;for(let b=0;b<u;b++)v+=h[b]*d[b];t.update(v,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $g(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(L){return!(L!==qn&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let R=L===ur&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==ri&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==oi&&!R)}function l(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=v>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:E,maxSamples:T}}function Kg(s){let e=this,t=null,n=0,i=!1,r=!1,o=new ai,a=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let v=u.clippingPlanes,b=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||v===null||v.length===0||r&&!g)r?h(null):c();else{let m=r?0:n,x=m*4,y=p.clippingState||null;l.value=y,y=h(v,d,x,f);for(let E=0;E!==x;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,v){let b=u!==null?u.length:0,g=null;if(b!==0){if(g=l.value,v!==!0||g===null){let p=f+b*4,m=d.matrixWorldInverse;a.getNormalMatrix(m),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=f;x!==b;++x,y+=4)o.copy(u[x]).applyMatrix4(m,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,g}}function Zg(s){let e=new WeakMap;function t(o,a){return a===rl?o.mapping=ms:a===ol&&(o.mapping=gs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===rl||a===ol)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Aa(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var mr=4,zd=[.125,.215,.35,.446,.526,.582],bs=20,bh=new _o,Hd=new Qe,Mh=null,Sh=0,wh=0,Eh=!1,_s=(1+Math.sqrt(5))/2,pr=1/_s,Vd=[new O(-_s,pr,0),new O(_s,pr,0),new O(-pr,0,_s),new O(pr,0,_s),new O(0,_s,-pr),new O(0,_s,pr),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Jg=new O,vr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=Jg}=r;Mh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Mh,Sh,wh),this._renderer.xr.enabled=Eh,e.scissorTest=!1,Yl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ms||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mh=this._renderer.getRenderTarget(),Sh=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:ur,format:qn,colorSpace:ds,depthBuffer:!1},i=Gd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jg(r)),this._blurMaterial=Qg(r,e,t)}return i}_compileMaterial(e){let t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,bh)}_sceneToCubeUV(e,t,n,i,r){let l=new cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Hd),u.toneMapping=si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let b=new Jt({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),g=new Ze(new Vt,b),p=!1,m=e.background;m?m.isColor&&(b.color.copy(m),e.background=null,p=!0):(b.color.copy(Hd),p=!0);for(let x=0;x<6;x++){let y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[x],r.y,r.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[x]));let E=this._cubeSize;Yl(i,y*E,x>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ms||e.mapping===gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Yl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,bh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Vd[(i-r-1)%Vd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ze(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*bs-1),b=r/v,g=isFinite(r)?1+Math.floor(h*b):bs;g>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bs}`);let p=[],m=0;for(let L=0;L<bs;++L){let R=L/b,S=Math.exp(-R*R/2);p.push(S),L===0?m+=S:L<g&&(m+=2*S)}for(let L=0;L<p.length;L++)p[L]=p[L]/m;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:x}=this;d.dTheta.value=v,d.mipInt.value=x-n;let y=this._sizeLods[i],E=3*y*(i>x-mr?i-x+mr:0),T=4*(this._cubeSize-y);Yl(t,E,T,3*y,2*y),l.setRenderTarget(t),l.render(u,bh)}};function jg(s){let e=[],t=[],n=[],i=s,r=s-mr+1+zd.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-mr?l=zd[o-s+mr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,v=6,b=3,g=2,p=1,m=new Float32Array(b*v*f),x=new Float32Array(g*v*f),y=new Float32Array(p*v*f);for(let T=0;T<f;T++){let L=T%3*2/3-1,R=T>2?0:-1,S=[L,R,0,L+2/3,R,0,L+2/3,R+1,0,L,R,0,L+2/3,R+1,0,L,R+1,0];m.set(S,b*v*T),x.set(d,g*v*T);let w=[T,T,T,T,T,T];y.set(w,p*v*T)}let E=new jt;E.setAttribute("position",new Mn(m,b)),E.setAttribute("uv",new Mn(x,g)),E.setAttribute("faceIndex",new Mn(y,p)),e.push(E),i>mr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gd(s,e,t){let n=new ci(s,e,t);return n.texture.mapping=Mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yl(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Qg(s,e,t){let n=new Float32Array(bs),i=new O(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Wd(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Xd(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Fh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ev(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===rl||l===ol,h=l===ms||l===gs;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new vr(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new vr(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function tv(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Js("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function nv(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,v=u.attributes.position,b=0;if(f!==null){let m=f.array;b=f.version;for(let x=0,y=m.length;x<y;x+=3){let E=m[x+0],T=m[x+1],L=m[x+2];d.push(E,T,T,L,L,E)}}else if(v!==void 0){let m=v.array;b=v.version;for(let x=0,y=m.length/3-1;x<y;x+=3){let E=x+0,T=x+1,L=x+2;d.push(E,T,T,L,L,E)}}else return;let g=new(mh(d)?jr:Jr)(d,1);g.version=b;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function iv(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,v){v!==0&&(s.drawElementsInstanced(n,f,r,d*o,v),t.update(f,n,v))}function h(d,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,v);let g=0;for(let p=0;p<v;p++)g+=f[p];t.update(g,n,1)}function u(d,f,v,b){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],b[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,b,0,v);let p=0;for(let m=0;m<v;m++)p+=f[m]*b[m];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function sv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function rv(s,e,t){let n=new WeakMap,i=new Tt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],m=a.morphAttributes.color||[],x=0;f===!0&&(x=1),v===!0&&(x=2),b===!0&&(x=3);let y=a.attributes.position.count*x,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*E*4*u),L=new Kr(T,y,E,u);L.type=oi,L.needsUpdate=!0;let R=x*4;for(let w=0;w<u;w++){let A=g[w],k=p[w],C=m[w],z=y*E*4*w;for(let W=0;W<A.count;W++){let K=W*R;f===!0&&(i.fromBufferAttribute(A,W),T[z+K+0]=i.x,T[z+K+1]=i.y,T[z+K+2]=i.z,T[z+K+3]=0),v===!0&&(i.fromBufferAttribute(k,W),T[z+K+4]=i.x,T[z+K+5]=i.y,T[z+K+6]=i.z,T[z+K+7]=0),b===!0&&(i.fromBufferAttribute(C,W),T[z+K+8]=i.x,T[z+K+9]=i.y,T[z+K+10]=i.z,T[z+K+11]=C.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new Ee(y,E)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let v=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function ov(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var uf=new Sn,qd=new ro(1,1),df=new Kr,ff=new wa,pf=new eo,Yd=[],$d=[],Kd=new Float32Array(16),Zd=new Float32Array(9),Jd=new Float32Array(4);function xr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Yd[i];if(r===void 0&&(r=new Float32Array(i),Yd[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function sn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function rn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Zl(s,e){let t=$d[e];t===void 0&&(t=new Int32Array(e),$d[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function av(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function lv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2fv(this.addr,e),rn(t,e)}}function cv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;s.uniform3fv(this.addr,e),rn(t,e)}}function hv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4fv(this.addr,e),rn(t,e)}}function uv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;Jd.set(n),s.uniformMatrix2fv(this.addr,!1,Jd),rn(t,n)}}function dv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;Zd.set(n),s.uniformMatrix3fv(this.addr,!1,Zd),rn(t,n)}}function fv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,n))return;Kd.set(n),s.uniformMatrix4fv(this.addr,!1,Kd),rn(t,n)}}function pv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function mv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2iv(this.addr,e),rn(t,e)}}function gv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3iv(this.addr,e),rn(t,e)}}function vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4iv(this.addr,e),rn(t,e)}}function xv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;s.uniform2uiv(this.addr,e),rn(t,e)}}function _v(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;s.uniform3uiv(this.addr,e),rn(t,e)}}function bv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;s.uniform4uiv(this.addr,e),rn(t,e)}}function Mv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(qd.compareFunction=fh,r=qd):r=uf,t.setTexture2D(e||r,i)}function Sv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ff,i)}function wv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||pf,i)}function Ev(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||df,i)}function Tv(s){switch(s){case 5126:return av;case 35664:return lv;case 35665:return cv;case 35666:return hv;case 35674:return uv;case 35675:return dv;case 35676:return fv;case 5124:case 35670:return pv;case 35667:case 35671:return mv;case 35668:case 35672:return gv;case 35669:case 35673:return vv;case 5125:return xv;case 36294:return yv;case 36295:return _v;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return Mv;case 35679:case 36299:case 36307:return Sv;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Ev}}function Av(s,e){s.uniform1fv(this.addr,e)}function Rv(s,e){let t=xr(e,this.size,2);s.uniform2fv(this.addr,t)}function Cv(s,e){let t=xr(e,this.size,3);s.uniform3fv(this.addr,t)}function Iv(s,e){let t=xr(e,this.size,4);s.uniform4fv(this.addr,t)}function Pv(s,e){let t=xr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Lv(s,e){let t=xr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Dv(s,e){let t=xr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function kv(s,e){s.uniform1iv(this.addr,e)}function Fv(s,e){s.uniform2iv(this.addr,e)}function Uv(s,e){s.uniform3iv(this.addr,e)}function Nv(s,e){s.uniform4iv(this.addr,e)}function Ov(s,e){s.uniform1uiv(this.addr,e)}function Bv(s,e){s.uniform2uiv(this.addr,e)}function zv(s,e){s.uniform3uiv(this.addr,e)}function Hv(s,e){s.uniform4uiv(this.addr,e)}function Vv(s,e,t){let n=this.cache,i=e.length,r=Zl(t,i);sn(n,r)||(s.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||uf,r[o])}function Gv(s,e,t){let n=this.cache,i=e.length,r=Zl(t,i);sn(n,r)||(s.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ff,r[o])}function Wv(s,e,t){let n=this.cache,i=e.length,r=Zl(t,i);sn(n,r)||(s.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||pf,r[o])}function Xv(s,e,t){let n=this.cache,i=e.length,r=Zl(t,i);sn(n,r)||(s.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||df,r[o])}function qv(s){switch(s){case 5126:return Av;case 35664:return Rv;case 35665:return Cv;case 35666:return Iv;case 35674:return Pv;case 35675:return Lv;case 35676:return Dv;case 5124:case 35670:return kv;case 35667:case 35671:return Fv;case 35668:case 35672:return Uv;case 35669:case 35673:return Nv;case 5125:return Ov;case 36294:return Bv;case 36295:return zv;case 36296:return Hv;case 35678:case 36198:case 36298:case 36306:case 35682:return Vv;case 35679:case 36299:case 36307:return Gv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Xv}}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Tv(t.type)}},Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qv(t.type)}},Ch=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Th=/(\w+)(\])?(\[|\.)?/g;function jd(s,e){s.seq.push(e),s.map[e.id]=e}function Yv(s,e,t){let n=s.name,i=n.length;for(Th.lastIndex=0;;){let r=Th.exec(n),o=Th.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){jd(t,c===void 0?new Ah(a,s,e):new Rh(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Ch(a),jd(t,u)),t=u}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Yv(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Qd(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var $v=37297,Kv=0;function Zv(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var ef=new lt;function Jv(s){bt._getMatrix(ef,bt.workingColorSpace,s);let e=`mat3( ${ef.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(s)){case qr:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function tf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Zv(s.getShaderSource(e),a)}else return r}function jv(s,e){let t=Jv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Qv(s,e){let t;switch(e){case fd:t="Linear";break;case pd:t="Reinhard";break;case md:t="Cineon";break;case sl:t="ACESFilmic";break;case vd:t="AgX";break;case xd:t="Neutral";break;case gd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $l=new O;function ex(){bt.getLuminanceCoefficients($l);let s=$l.x.toFixed(4),e=$l.y.toFixed(4),t=$l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ro).join(`
`)}function nx(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ix(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ro(s){return s!==""}function nf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var sx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(s){return s.replace(sx,ox)}var rx=new Map;function ox(s,e){let t=ut[e];if(t===void 0){let n=rx.get(e);if(n!==void 0)t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ih(t)}var ax=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rf(s){return s.replace(ax,lx)}function lx(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function of(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cx(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===th?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Za?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fi&&(e="SHADOWMAP_TYPE_VSM"),e}function hx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ms:case gs:e="ENVMAP_TYPE_CUBE";break;case Mo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ux(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===gs&&(e="ENVMAP_MODE_REFRACTION"),e}function dx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case il:e="ENVMAP_BLENDING_MULTIPLY";break;case ud:e="ENVMAP_BLENDING_MIX";break;case dd:e="ENVMAP_BLENDING_ADD";break}return e}function fx(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function px(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=cx(t),c=hx(t),h=ux(t),u=dx(t),d=fx(t),f=tx(t),v=nx(r),b=i.createProgram(),g,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ro).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ro).join(`
`),p.length>0&&(p+=`
`)):(g=[of(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ro).join(`
`),p=[of(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?ut.tonemapping_pars_fragment:"",t.toneMapping!==si?Qv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,jv("linearToOutputTexel",t.outputColorSpace),ex(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ro).join(`
`)),o=Ih(o),o=nf(o,t),o=sf(o,t),a=Ih(a),a=nf(a,t),a=sf(a,t),o=rf(o),a=rf(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=m+g+o,y=m+p+a,E=Qd(i,i.VERTEX_SHADER,x),T=Qd(i,i.FRAGMENT_SHADER,y);i.attachShader(b,E),i.attachShader(b,T),t.index0AttributeName!==void 0?i.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function L(A){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(b)||"",C=i.getShaderInfoLog(E)||"",z=i.getShaderInfoLog(T)||"",W=k.trim(),K=C.trim(),j=z.trim(),X=!0,ae=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,b,E,T);else{let he=tf(i,E,"vertex"),_e=tf(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+W+`
`+he+`
`+_e)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(K===""||j==="")&&(ae=!1);ae&&(A.diagnostics={runnable:X,programLog:W,vertexShader:{log:K,prefix:g},fragmentShader:{log:j,prefix:p}})}i.deleteShader(E),i.deleteShader(T),R=new gr(i,b),S=ix(i,b)}let R;this.getUniforms=function(){return R===void 0&&L(this),R};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(b,$v)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kv++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=T,this}var mx=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Lh(e),t.set(e,n)),n}},Lh=class{constructor(e){this.id=mx++,this.code=e,this.usedTimes=0}};function gx(s,e,t,n,i,r,o){let a=new Zr,l=new Ph,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,w,A,k,C){let z=k.fog,W=C.geometry,K=S.isMeshStandardMaterial?k.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||K),X=j&&j.mapping===Mo?j.image.height:null,ae=v[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let he=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_e=he!==void 0?he.length:0,Re=0;W.morphAttributes.position!==void 0&&(Re=1),W.morphAttributes.normal!==void 0&&(Re=2),W.morphAttributes.color!==void 0&&(Re=3);let Xe,qe,He,te;if(ae){let yt=pi[ae];Xe=yt.vertexShader,qe=yt.fragmentShader}else Xe=S.vertexShader,qe=S.fragmentShader,l.update(S),He=l.getVertexShaderID(S),te=l.getFragmentShaderID(S);let q=s.getRenderTarget(),le=s.state.buffers.depth.getReversed(),Le=C.isInstancedMesh===!0,oe=C.isBatchedMesh===!0,We=!!S.map,dt=!!S.matcap,N=!!j,ht=!!S.aoMap,Ce=!!S.lightMap,De=!!S.bumpMap,ge=!!S.normalMap,gt=!!S.displacementMap,Pe=!!S.emissiveMap,nt=!!S.metalnessMap,Ot=!!S.roughnessMap,Ft=S.anisotropy>0,P=S.clearcoat>0,M=S.dispersion>0,Y=S.iridescence>0,ne=S.sheen>0,se=S.transmission>0,ee=Ft&&!!S.anisotropyMap,Oe=P&&!!S.clearcoatMap,fe=P&&!!S.clearcoatNormalMap,Ne=P&&!!S.clearcoatRoughnessMap,Ve=Y&&!!S.iridescenceMap,me=Y&&!!S.iridescenceThicknessMap,Te=ne&&!!S.sheenColorMap,Fe=ne&&!!S.sheenRoughnessMap,Be=!!S.specularMap,we=!!S.specularColorMap,rt=!!S.specularIntensityMap,V=se&&!!S.transmissionMap,ve=se&&!!S.thicknessMap,Me=!!S.gradientMap,Ue=!!S.alphaMap,de=S.alphaTest>0,ce=!!S.alphaHash,ze=!!S.extensions,it=si;S.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(it=s.toneMapping);let _t={shaderID:ae,shaderType:S.type,shaderName:S.name,vertexShader:Xe,fragmentShader:qe,defines:S.defines,customVertexShaderID:He,customFragmentShaderID:te,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:oe,batchingColor:oe&&C._colorsTexture!==null,instancing:Le,instancingColor:Le&&C.instanceColor!==null,instancingMorph:Le&&C.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:q===null?s.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ds,alphaToCoverage:!!S.alphaToCoverage,map:We,matcap:dt,envMap:N,envMapMode:N&&j.mapping,envMapCubeUVHeight:X,aoMap:ht,lightMap:Ce,bumpMap:De,normalMap:ge,displacementMap:d&&gt,emissiveMap:Pe,normalMapObjectSpace:ge&&S.normalMapType===Md,normalMapTangentSpace:ge&&S.normalMapType===Gl,metalnessMap:nt,roughnessMap:Ot,anisotropy:Ft,anisotropyMap:ee,clearcoat:P,clearcoatMap:Oe,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ne,dispersion:M,iridescence:Y,iridescenceMap:Ve,iridescenceThicknessMap:me,sheen:ne,sheenColorMap:Te,sheenRoughnessMap:Fe,specularMap:Be,specularColorMap:we,specularIntensityMap:rt,transmission:se,transmissionMap:V,thicknessMap:ve,gradientMap:Me,opaque:S.transparent===!1&&S.blending===Ai&&S.alphaToCoverage===!1,alphaMap:Ue,alphaTest:de,alphaHash:ce,combine:S.combine,mapUv:We&&b(S.map.channel),aoMapUv:ht&&b(S.aoMap.channel),lightMapUv:Ce&&b(S.lightMap.channel),bumpMapUv:De&&b(S.bumpMap.channel),normalMapUv:ge&&b(S.normalMap.channel),displacementMapUv:gt&&b(S.displacementMap.channel),emissiveMapUv:Pe&&b(S.emissiveMap.channel),metalnessMapUv:nt&&b(S.metalnessMap.channel),roughnessMapUv:Ot&&b(S.roughnessMap.channel),anisotropyMapUv:ee&&b(S.anisotropyMap.channel),clearcoatMapUv:Oe&&b(S.clearcoatMap.channel),clearcoatNormalMapUv:fe&&b(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&b(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&b(S.iridescenceMap.channel),iridescenceThicknessMapUv:me&&b(S.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&b(S.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&b(S.sheenRoughnessMap.channel),specularMapUv:Be&&b(S.specularMap.channel),specularColorMapUv:we&&b(S.specularColorMap.channel),specularIntensityMapUv:rt&&b(S.specularIntensityMap.channel),transmissionMapUv:V&&b(S.transmissionMap.channel),thicknessMapUv:ve&&b(S.thicknessMap.channel),alphaMapUv:Ue&&b(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ge||Ft),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!W.attributes.uv&&(We||Ue),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:le,skinning:C.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Re,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:it,decodeVideoTexture:We&&S.map.isVideoTexture===!0&&bt.getTransfer(S.map.colorSpace)===Rt,decodeVideoTextureEmissive:Pe&&S.emissiveMap.isVideoTexture===!0&&bt.getTransfer(S.emissiveMap.colorSpace)===Rt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===gn,flipSided:S.side===fn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ze&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&S.extensions.multiDraw===!0||oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return _t.vertexUv1s=c.has(1),_t.vertexUv2s=c.has(2),_t.vertexUv3s=c.has(3),c.clear(),_t}function p(S){let w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(let A in S.defines)w.push(A),w.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(m(w,S),x(w,S),w.push(s.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function m(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function x(S,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),w.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let w=v[S.type],A;if(w){let k=pi[w];A=Dd.clone(k.uniforms)}else A=S.uniforms;return A}function E(S,w){let A;for(let k=0,C=h.length;k<C;k++){let z=h[k];if(z.cacheKey===w){A=z,++A.usedTimes;break}}return A===void 0&&(A=new px(s,w,S,r),h.push(A)),A}function T(S){if(--S.usedTimes===0){let w=h.indexOf(S);h[w]=h[h.length-1],h.pop(),S.destroy()}}function L(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:T,releaseShaderCache:L,programs:h,dispose:R}}function vx(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function xx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function af(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function lf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,v,b,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:v,renderOrder:u.renderOrder,z:b,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=v,p.renderOrder=u.renderOrder,p.z=b,p.group=g),e++,p}function a(u,d,f,v,b,g){let p=o(u,d,f,v,b,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,v,b,g){let p=o(u,d,f,v,b,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||xx),n.length>1&&n.sort(d||af),i.length>1&&i.sort(d||af)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function yx(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new lf,s.set(n,[o])):i>=r.length?(o=new lf,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function _x(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Qe};break;case"SpotLight":t={position:new O,direction:new O,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new O,halfWidth:new O,halfHeight:new O};break}return s[e.id]=t,t}}}function bx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Mx=0;function Sx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function wx(s){let e=new _x,t=bx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);let i=new O,r=new wt,o=new wt;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,v=0,b=0,g=0,p=0,m=0,x=0,y=0,E=0,T=0,L=0;c.sort(Sx);for(let S=0,w=c.length;S<w;S++){let A=c[S],k=A.color,C=A.intensity,z=A.distance,W=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=k.r*C,u+=k.g*C,d+=k.b*C;else if(A.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(A.sh.coefficients[K],C);L++}else if(A.isDirectionalLight){let K=e.get(A);if(K.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let j=A.shadow,X=t.get(A);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=A.shadow.matrix,m++}n.directional[f]=K,f++}else if(A.isSpotLight){let K=e.get(A);K.position.setFromMatrixPosition(A.matrixWorld),K.color.copy(k).multiplyScalar(C),K.distance=z,K.coneCos=Math.cos(A.angle),K.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),K.decay=A.decay,n.spot[b]=K;let j=A.shadow;if(A.map&&(n.spotLightMap[E]=A.map,E++,j.updateMatrices(A),A.castShadow&&T++),n.spotLightMatrix[b]=j.matrix,A.castShadow){let X=t.get(A);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,n.spotShadow[b]=X,n.spotShadowMap[b]=W,y++}b++}else if(A.isRectAreaLight){let K=e.get(A);K.color.copy(k).multiplyScalar(C),K.halfWidth.set(A.width*.5,0,0),K.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=K,g++}else if(A.isPointLight){let K=e.get(A);if(K.color.copy(A.color).multiplyScalar(A.intensity),K.distance=A.distance,K.decay=A.decay,A.castShadow){let j=A.shadow,X=t.get(A);X.shadowIntensity=j.intensity,X.shadowBias=j.bias,X.shadowNormalBias=j.normalBias,X.shadowRadius=j.radius,X.shadowMapSize=j.mapSize,X.shadowCameraNear=j.camera.near,X.shadowCameraFar=j.camera.far,n.pointShadow[v]=X,n.pointShadowMap[v]=W,n.pointShadowMatrix[v]=A.shadow.matrix,x++}n.point[v]=K,v++}else if(A.isHemisphereLight){let K=e.get(A);K.skyColor.copy(A.color).multiplyScalar(C),K.groundColor.copy(A.groundColor).multiplyScalar(C),n.hemi[p]=K,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==v||R.spotLength!==b||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==m||R.numPointShadows!==x||R.numSpotShadows!==y||R.numSpotMaps!==E||R.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=b,n.rectArea.length=g,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,R.directionalLength=f,R.pointLength=v,R.spotLength=b,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=m,R.numPointShadows=x,R.numSpotShadows=y,R.numSpotMaps=E,R.numLightProbes=L,n.version=Mx++)}function l(c,h){let u=0,d=0,f=0,v=0,b=0,g=h.matrixWorldInverse;for(let p=0,m=c.length;p<m;p++){let x=c[p];if(x.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let y=n.rectArea[v];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){let y=n.hemi[b];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),b++}}}return{setup:a,setupView:l,state:n}}function cf(s){let e=new wx(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ex(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new cf(s),e.set(i,[a])):r>=o.length?(a=new cf(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rx(s,e,t){let n=new tr,i=new Ee,r=new Ee,o=new Tt,a=new Na({depthPacking:bd}),l=new Oa,c={},h=t.maxTextureSize,u={[Ti]:fn,[fn]:Ti,[gn]:gn},d=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:Tx,fragmentShader:Ax}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let v=new jt;v.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Ze(v,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=th;let p=this.type;this.render=function(T,L,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let S=s.getRenderTarget(),w=s.getActiveCubeFace(),A=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Pi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let C=p!==fi&&this.type===fi,z=p===fi&&this.type!==fi;for(let W=0,K=T.length;W<K;W++){let j=T[W],X=j.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let ae=X.getFrameExtents();if(i.multiply(ae),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ae.x),i.x=r.x*ae.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ae.y),i.y=r.y*ae.y,X.mapSize.y=r.y)),X.map===null||C===!0||z===!0){let _e=this.type!==fi?{minFilter:Pn,magFilter:Pn}:{};X.map!==null&&X.map.dispose(),X.map=new ci(i.x,i.y,_e),X.map.texture.name=j.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();let he=X.getViewportCount();for(let _e=0;_e<he;_e++){let Re=X.getViewport(_e);o.set(r.x*Re.x,r.y*Re.y,r.x*Re.z,r.y*Re.w),k.viewport(o),X.updateMatrices(j,_e),n=X.getFrustum(),y(L,R,X.camera,j,this.type)}X.isPointLightShadow!==!0&&this.type===fi&&m(X,R),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(S,w,A)};function m(T,L){let R=e.update(b);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ci(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(L,null,R,d,b,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(L,null,R,f,b,null)}function x(T,L,R,S){let w=null,A=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)w=A;else if(w=R.isPointLight===!0?l:a,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let k=w.uuid,C=L.uuid,z=c[k];z===void 0&&(z={},c[k]=z);let W=z[C];W===void 0&&(W=w.clone(),z[C]=W,L.addEventListener("dispose",E)),w=W}if(w.visible=L.visible,w.wireframe=L.wireframe,S===fi?w.side=L.shadowSide!==null?L.shadowSide:L.side:w.side=L.shadowSide!==null?L.shadowSide:u[L.side],w.alphaMap=L.alphaMap,w.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,w.map=L.map,w.clipShadows=L.clipShadows,w.clippingPlanes=L.clippingPlanes,w.clipIntersection=L.clipIntersection,w.displacementMap=L.displacementMap,w.displacementScale=L.displacementScale,w.displacementBias=L.displacementBias,w.wireframeLinewidth=L.wireframeLinewidth,w.linewidth=L.linewidth,R.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let k=s.properties.get(w);k.light=R}return w}function y(T,L,R,S,w){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===fi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);let C=e.update(T),z=T.material;if(Array.isArray(z)){let W=C.groups;for(let K=0,j=W.length;K<j;K++){let X=W[K],ae=z[X.materialIndex];if(ae&&ae.visible){let he=x(T,ae,S,w);T.onBeforeShadow(s,T,L,R,C,he,X),s.renderBufferDirect(R,null,C,he,T,X),T.onAfterShadow(s,T,L,R,C,he,X)}}}else if(z.visible){let W=x(T,z,S,w);T.onBeforeShadow(s,T,L,R,C,W,null),s.renderBufferDirect(R,null,C,W,T,null),T.onAfterShadow(s,T,L,R,C,W,null)}}let k=T.children;for(let C=0,z=k.length;C<z;C++)y(k[C],L,R,S,w)}function E(T){T.target.removeEventListener("dispose",E);for(let R in c){let S=c[R],w=T.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}var Cx={[Ja]:ja,[Qa]:cr,[el]:nl,[hs]:tl,[ja]:Ja,[cr]:Qa,[nl]:el,[tl]:hs};function Ix(s,e){function t(){let V=!1,ve=new Tt,Me=null,Ue=new Tt(0,0,0,0);return{setMask:function(de){Me!==de&&!V&&(s.colorMask(de,de,de,de),Me=de)},setLocked:function(de){V=de},setClear:function(de,ce,ze,it,_t){_t===!0&&(de*=it,ce*=it,ze*=it),ve.set(de,ce,ze,it),Ue.equals(ve)===!1&&(s.clearColor(de,ce,ze,it),Ue.copy(ve))},reset:function(){V=!1,Me=null,Ue.set(-1,0,0,0)}}}function n(){let V=!1,ve=!1,Me=null,Ue=null,de=null;return{setReversed:function(ce){if(ve!==ce){let ze=e.get("EXT_clip_control");ce?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),ve=ce;let it=de;de=null,this.setClear(it)}},getReversed:function(){return ve},setTest:function(ce){ce?q(s.DEPTH_TEST):le(s.DEPTH_TEST)},setMask:function(ce){Me!==ce&&!V&&(s.depthMask(ce),Me=ce)},setFunc:function(ce){if(ve&&(ce=Cx[ce]),Ue!==ce){switch(ce){case Ja:s.depthFunc(s.NEVER);break;case ja:s.depthFunc(s.ALWAYS);break;case Qa:s.depthFunc(s.LESS);break;case hs:s.depthFunc(s.LEQUAL);break;case el:s.depthFunc(s.EQUAL);break;case tl:s.depthFunc(s.GEQUAL);break;case cr:s.depthFunc(s.GREATER);break;case nl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ue=ce}},setLocked:function(ce){V=ce},setClear:function(ce){de!==ce&&(ve&&(ce=1-ce),s.clearDepth(ce),de=ce)},reset:function(){V=!1,Me=null,Ue=null,de=null,ve=!1}}}function i(){let V=!1,ve=null,Me=null,Ue=null,de=null,ce=null,ze=null,it=null,_t=null;return{setTest:function(yt){V||(yt?q(s.STENCIL_TEST):le(s.STENCIL_TEST))},setMask:function(yt){ve!==yt&&!V&&(s.stencilMask(yt),ve=yt)},setFunc:function(yt,Dn,An){(Me!==yt||Ue!==Dn||de!==An)&&(s.stencilFunc(yt,Dn,An),Me=yt,Ue=Dn,de=An)},setOp:function(yt,Dn,An){(ce!==yt||ze!==Dn||it!==An)&&(s.stencilOp(yt,Dn,An),ce=yt,ze=Dn,it=An)},setLocked:function(yt){V=yt},setClear:function(yt){_t!==yt&&(s.clearStencil(yt),_t=yt)},reset:function(){V=!1,ve=null,Me=null,Ue=null,de=null,ce=null,ze=null,it=null,_t=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],v=null,b=!1,g=null,p=null,m=null,x=null,y=null,E=null,T=null,L=new Qe(0,0,0),R=0,S=!1,w=null,A=null,k=null,C=null,z=null,W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,j=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),K=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),K=j>=2);let ae=null,he={},_e=s.getParameter(s.SCISSOR_BOX),Re=s.getParameter(s.VIEWPORT),Xe=new Tt().fromArray(_e),qe=new Tt().fromArray(Re);function He(V,ve,Me,Ue){let de=new Uint8Array(4),ce=s.createTexture();s.bindTexture(V,ce),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ze=0;ze<Me;ze++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(ve,0,s.RGBA,1,1,Ue,0,s.RGBA,s.UNSIGNED_BYTE,de):s.texImage2D(ve+ze,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,de);return ce}let te={};te[s.TEXTURE_2D]=He(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=He(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=He(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=He(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(s.DEPTH_TEST),o.setFunc(hs),De(!1),ge(eh),q(s.CULL_FACE),ht(Pi);function q(V){h[V]!==!0&&(s.enable(V),h[V]=!0)}function le(V){h[V]!==!1&&(s.disable(V),h[V]=!1)}function Le(V,ve){return u[V]!==ve?(s.bindFramebuffer(V,ve),u[V]=ve,V===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ve),V===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ve),!0):!1}function oe(V,ve){let Me=f,Ue=!1;if(V){Me=d.get(ve),Me===void 0&&(Me=[],d.set(ve,Me));let de=V.textures;if(Me.length!==de.length||Me[0]!==s.COLOR_ATTACHMENT0){for(let ce=0,ze=de.length;ce<ze;ce++)Me[ce]=s.COLOR_ATTACHMENT0+ce;Me.length=de.length,Ue=!0}}else Me[0]!==s.BACK&&(Me[0]=s.BACK,Ue=!0);Ue&&s.drawBuffers(Me)}function We(V){return v!==V?(s.useProgram(V),v=V,!0):!1}let dt={[Xi]:s.FUNC_ADD,[$u]:s.FUNC_SUBTRACT,[Ku]:s.FUNC_REVERSE_SUBTRACT};dt[Zu]=s.MIN,dt[Ju]=s.MAX;let N={[ju]:s.ZERO,[Qu]:s.ONE,[ed]:s.SRC_COLOR,[ga]:s.SRC_ALPHA,[od]:s.SRC_ALPHA_SATURATE,[sd]:s.DST_COLOR,[nd]:s.DST_ALPHA,[td]:s.ONE_MINUS_SRC_COLOR,[va]:s.ONE_MINUS_SRC_ALPHA,[rd]:s.ONE_MINUS_DST_COLOR,[id]:s.ONE_MINUS_DST_ALPHA,[ad]:s.CONSTANT_COLOR,[ld]:s.ONE_MINUS_CONSTANT_COLOR,[cd]:s.CONSTANT_ALPHA,[hd]:s.ONE_MINUS_CONSTANT_ALPHA};function ht(V,ve,Me,Ue,de,ce,ze,it,_t,yt){if(V===Pi){b===!0&&(le(s.BLEND),b=!1);return}if(b===!1&&(q(s.BLEND),b=!0),V!==Yu){if(V!==g||yt!==S){if((p!==Xi||y!==Xi)&&(s.blendEquation(s.FUNC_ADD),p=Xi,y=Xi),yt)switch(V){case Ai:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ji:s.blendFunc(s.ONE,s.ONE);break;case nh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ih:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Ai:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case nh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ih:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}m=null,x=null,E=null,T=null,L.set(0,0,0),R=0,g=V,S=yt}return}de=de||ve,ce=ce||Me,ze=ze||Ue,(ve!==p||de!==y)&&(s.blendEquationSeparate(dt[ve],dt[de]),p=ve,y=de),(Me!==m||Ue!==x||ce!==E||ze!==T)&&(s.blendFuncSeparate(N[Me],N[Ue],N[ce],N[ze]),m=Me,x=Ue,E=ce,T=ze),(it.equals(L)===!1||_t!==R)&&(s.blendColor(it.r,it.g,it.b,_t),L.copy(it),R=_t),g=V,S=!1}function Ce(V,ve){V.side===gn?le(s.CULL_FACE):q(s.CULL_FACE);let Me=V.side===fn;ve&&(Me=!Me),De(Me),V.blending===Ai&&V.transparent===!1?ht(Pi):ht(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);let Ue=V.stencilWrite;a.setTest(Ue),Ue&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Pe(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?q(s.SAMPLE_ALPHA_TO_COVERAGE):le(s.SAMPLE_ALPHA_TO_COVERAGE)}function De(V){w!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),w=V)}function ge(V){V!==Xu?(q(s.CULL_FACE),V!==A&&(V===eh?s.cullFace(s.BACK):V===qu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):le(s.CULL_FACE),A=V}function gt(V){V!==k&&(K&&s.lineWidth(V),k=V)}function Pe(V,ve,Me){V?(q(s.POLYGON_OFFSET_FILL),(C!==ve||z!==Me)&&(s.polygonOffset(ve,Me),C=ve,z=Me)):le(s.POLYGON_OFFSET_FILL)}function nt(V){V?q(s.SCISSOR_TEST):le(s.SCISSOR_TEST)}function Ot(V){V===void 0&&(V=s.TEXTURE0+W-1),ae!==V&&(s.activeTexture(V),ae=V)}function Ft(V,ve,Me){Me===void 0&&(ae===null?Me=s.TEXTURE0+W-1:Me=ae);let Ue=he[Me];Ue===void 0&&(Ue={type:void 0,texture:void 0},he[Me]=Ue),(Ue.type!==V||Ue.texture!==ve)&&(ae!==Me&&(s.activeTexture(Me),ae=Me),s.bindTexture(V,ve||te[V]),Ue.type=V,Ue.texture=ve)}function P(){let V=he[ae];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Y(){try{s.compressedTexImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ne(){try{s.texSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function se(){try{s.texSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ee(){try{s.compressedTexSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(){try{s.compressedTexSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function fe(){try{s.texStorage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ne(){try{s.texStorage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ve(){try{s.texImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function me(){try{s.texImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Te(V){Xe.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),Xe.copy(V))}function Fe(V){qe.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),qe.copy(V))}function Be(V,ve){let Me=c.get(ve);Me===void 0&&(Me=new WeakMap,c.set(ve,Me));let Ue=Me.get(V);Ue===void 0&&(Ue=s.getUniformBlockIndex(ve,V.name),Me.set(V,Ue))}function we(V,ve){let Ue=c.get(ve).get(V);l.get(ve)!==Ue&&(s.uniformBlockBinding(ve,Ue,V.__bindingPointIndex),l.set(ve,Ue))}function rt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ae=null,he={},u={},d=new WeakMap,f=[],v=null,b=!1,g=null,p=null,m=null,x=null,y=null,E=null,T=null,L=new Qe(0,0,0),R=0,S=!1,w=null,A=null,k=null,C=null,z=null,Xe.set(0,0,s.canvas.width,s.canvas.height),qe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:le,bindFramebuffer:Le,drawBuffers:oe,useProgram:We,setBlending:ht,setMaterial:Ce,setFlipSided:De,setCullFace:ge,setLineWidth:gt,setPolygonOffset:Pe,setScissorTest:nt,activeTexture:Ot,bindTexture:Ft,unbindTexture:P,compressedTexImage2D:M,compressedTexImage3D:Y,texImage2D:Ve,texImage3D:me,updateUBOMapping:Be,uniformBlockBinding:we,texStorage2D:fe,texStorage3D:Ne,texSubImage2D:ne,texSubImage3D:se,compressedTexSubImage2D:ee,compressedTexSubImage3D:Oe,scissor:Te,viewport:Fe,reset:rt}}function Px(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ee,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(P,M){return f?new OffscreenCanvas(P,M):$r("canvas")}function b(P,M,Y){let ne=1,se=Ft(P);if((se.width>Y||se.height>Y)&&(ne=Y/Math.max(se.width,se.height)),ne<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ee=Math.floor(ne*se.width),Oe=Math.floor(ne*se.height);u===void 0&&(u=v(ee,Oe));let fe=M?v(ee,Oe):u;return fe.width=ee,fe.height=Oe,fe.getContext("2d").drawImage(P,0,0,ee,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ee+"x"+Oe+")."),fe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function m(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(P,M,Y,ne,se=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=M;if(M===s.RED&&(Y===s.FLOAT&&(ee=s.R32F),Y===s.HALF_FLOAT&&(ee=s.R16F),Y===s.UNSIGNED_BYTE&&(ee=s.R8)),M===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.R8UI),Y===s.UNSIGNED_SHORT&&(ee=s.R16UI),Y===s.UNSIGNED_INT&&(ee=s.R32UI),Y===s.BYTE&&(ee=s.R8I),Y===s.SHORT&&(ee=s.R16I),Y===s.INT&&(ee=s.R32I)),M===s.RG&&(Y===s.FLOAT&&(ee=s.RG32F),Y===s.HALF_FLOAT&&(ee=s.RG16F),Y===s.UNSIGNED_BYTE&&(ee=s.RG8)),M===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RG8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RG16UI),Y===s.UNSIGNED_INT&&(ee=s.RG32UI),Y===s.BYTE&&(ee=s.RG8I),Y===s.SHORT&&(ee=s.RG16I),Y===s.INT&&(ee=s.RG32I)),M===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),Y===s.UNSIGNED_INT&&(ee=s.RGB32UI),Y===s.BYTE&&(ee=s.RGB8I),Y===s.SHORT&&(ee=s.RGB16I),Y===s.INT&&(ee=s.RGB32I)),M===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),Y===s.UNSIGNED_INT&&(ee=s.RGBA32UI),Y===s.BYTE&&(ee=s.RGBA8I),Y===s.SHORT&&(ee=s.RGBA16I),Y===s.INT&&(ee=s.RGBA32I)),M===s.RGB&&(Y===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),Y===s.UNSIGNED_INT_10F_11F_11F_REV&&(ee=s.R11F_G11F_B10F)),M===s.RGBA){let Oe=se?qr:bt.getTransfer(ne);Y===s.FLOAT&&(ee=s.RGBA32F),Y===s.HALF_FLOAT&&(ee=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(ee=Oe===Rt?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function y(P,M){let Y;return P?M===null||M===Qi||M===dr?Y=s.DEPTH24_STENCIL8:M===oi?Y=s.DEPTH32F_STENCIL8:M===hr&&(Y=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Qi||M===dr?Y=s.DEPTH_COMPONENT24:M===oi?Y=s.DEPTH_COMPONENT32F:M===hr&&(Y=s.DEPTH_COMPONENT16),Y}function E(P,M){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Pn&&P.minFilter!==ni?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function T(P){let M=P.target;M.removeEventListener("dispose",T),R(M),M.isVideoTexture&&h.delete(M)}function L(P){let M=P.target;M.removeEventListener("dispose",L),w(M)}function R(P){let M=n.get(P);if(M.__webglInit===void 0)return;let Y=P.source,ne=d.get(Y);if(ne){let se=ne[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&S(P),Object.keys(ne).length===0&&d.delete(Y)}n.remove(P)}function S(P){let M=n.get(P);s.deleteTexture(M.__webglTexture);let Y=P.source,ne=d.get(Y);delete ne[M.__cacheKey],o.memory.textures--}function w(P){let M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(M.__webglFramebuffer[ne]))for(let se=0;se<M.__webglFramebuffer[ne].length;se++)s.deleteFramebuffer(M.__webglFramebuffer[ne][se]);else s.deleteFramebuffer(M.__webglFramebuffer[ne]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ne])}else{if(Array.isArray(M.__webglFramebuffer))for(let ne=0;ne<M.__webglFramebuffer.length;ne++)s.deleteFramebuffer(M.__webglFramebuffer[ne]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ne=0;ne<M.__webglColorRenderbuffer.length;ne++)M.__webglColorRenderbuffer[ne]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ne]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let Y=P.textures;for(let ne=0,se=Y.length;ne<se;ne++){let ee=n.get(Y[ne]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(Y[ne])}n.remove(P)}let A=0;function k(){A=0}function C(){let P=A;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),A+=1,P}function z(P){let M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function W(P,M){let Y=n.get(P);if(P.isVideoTexture&&nt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Y.__version!==P.version){let ne=P.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(Y,P,M);return}}else P.isExternalTexture&&(Y.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+M)}function K(P,M){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){te(Y,P,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+M)}function j(P,M){let Y=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){te(Y,P,M);return}t.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+M)}function X(P,M){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){q(Y,P,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+M)}let ae={[us]:s.REPEAT,[Wi]:s.CLAMP_TO_EDGE,[xa]:s.MIRRORED_REPEAT},he={[Pn]:s.NEAREST,[yd]:s.NEAREST_MIPMAP_NEAREST,[So]:s.NEAREST_MIPMAP_LINEAR,[ni]:s.LINEAR,[al]:s.LINEAR_MIPMAP_NEAREST,[ji]:s.LINEAR_MIPMAP_LINEAR},_e={[Sd]:s.NEVER,[Cd]:s.ALWAYS,[wd]:s.LESS,[fh]:s.LEQUAL,[Ed]:s.EQUAL,[Rd]:s.GEQUAL,[Td]:s.GREATER,[Ad]:s.NOTEQUAL};function Re(P,M){if(M.type===oi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===ni||M.magFilter===al||M.magFilter===So||M.magFilter===ji||M.minFilter===ni||M.minFilter===al||M.minFilter===So||M.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ae[M.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ae[M.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ae[M.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,he[M.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,he[M.minFilter]),M.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,_e[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Pn||M.minFilter!==So&&M.minFilter!==ji||M.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Xe(P,M){let Y=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",T));let ne=M.source,se=d.get(ne);se===void 0&&(se={},d.set(ne,se));let ee=z(M);if(ee!==P.__cacheKey){se[ee]===void 0&&(se[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),se[ee].usedTimes++;let Oe=se[P.__cacheKey];Oe!==void 0&&(se[P.__cacheKey].usedTimes--,Oe.usedTimes===0&&S(M)),P.__cacheKey=ee,P.__webglTexture=se[ee].texture}return Y}function qe(P,M,Y){return Math.floor(Math.floor(P/Y)/M)}function He(P,M,Y,ne){let ee=P.updateRanges;if(ee.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,Y,ne,M.data);else{ee.sort((me,Te)=>me.start-Te.start);let Oe=0;for(let me=1;me<ee.length;me++){let Te=ee[Oe],Fe=ee[me],Be=Te.start+Te.count,we=qe(Fe.start,M.width,4),rt=qe(Te.start,M.width,4);Fe.start<=Be+1&&we===rt&&qe(Fe.start+Fe.count-1,M.width,4)===we?Te.count=Math.max(Te.count,Fe.start+Fe.count-Te.start):(++Oe,ee[Oe]=Fe)}ee.length=Oe+1;let fe=s.getParameter(s.UNPACK_ROW_LENGTH),Ne=s.getParameter(s.UNPACK_SKIP_PIXELS),Ve=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let me=0,Te=ee.length;me<Te;me++){let Fe=ee[me],Be=Math.floor(Fe.start/4),we=Math.ceil(Fe.count/4),rt=Be%M.width,V=Math.floor(Be/M.width),ve=we,Me=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),s.pixelStorei(s.UNPACK_SKIP_ROWS,V),t.texSubImage2D(s.TEXTURE_2D,0,rt,V,ve,Me,Y,ne,M.data)}P.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,fe),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ne),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ve)}}function te(P,M,Y){let ne=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=s.TEXTURE_3D);let se=Xe(P,M),ee=M.source;t.bindTexture(ne,P.__webglTexture,s.TEXTURE0+Y);let Oe=n.get(ee);if(ee.version!==Oe.__version||se===!0){t.activeTexture(s.TEXTURE0+Y);let fe=bt.getPrimaries(bt.workingColorSpace),Ne=M.colorSpace===Li?null:bt.getPrimaries(M.colorSpace),Ve=M.colorSpace===Li||fe===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let me=b(M.image,!1,i.maxTextureSize);me=Ot(M,me);let Te=r.convert(M.format,M.colorSpace),Fe=r.convert(M.type),Be=x(M.internalFormat,Te,Fe,M.colorSpace,M.isVideoTexture);Re(ne,M);let we,rt=M.mipmaps,V=M.isVideoTexture!==!0,ve=Oe.__version===void 0||se===!0,Me=ee.dataReady,Ue=E(M,me);if(M.isDepthTexture)Be=y(M.format===fr,M.type),ve&&(V?t.texStorage2D(s.TEXTURE_2D,1,Be,me.width,me.height):t.texImage2D(s.TEXTURE_2D,0,Be,me.width,me.height,0,Te,Fe,null));else if(M.isDataTexture)if(rt.length>0){V&&ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Be,rt[0].width,rt[0].height);for(let de=0,ce=rt.length;de<ce;de++)we=rt[de],V?Me&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,we.width,we.height,Te,Fe,we.data):t.texImage2D(s.TEXTURE_2D,de,Be,we.width,we.height,0,Te,Fe,we.data);M.generateMipmaps=!1}else V?(ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Be,me.width,me.height),Me&&He(M,me,Te,Fe)):t.texImage2D(s.TEXTURE_2D,0,Be,me.width,me.height,0,Te,Fe,me.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){V&&ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Be,rt[0].width,rt[0].height,me.depth);for(let de=0,ce=rt.length;de<ce;de++)if(we=rt[de],M.format!==qn)if(Te!==null)if(V){if(Me)if(M.layerUpdates.size>0){let ze=_h(we.width,we.height,M.format,M.type);for(let it of M.layerUpdates){let _t=we.data.subarray(it*ze/we.data.BYTES_PER_ELEMENT,(it+1)*ze/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,it,we.width,we.height,1,Te,_t)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,me.depth,Te,we.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,de,Be,we.width,we.height,me.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else V?Me&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,me.depth,Te,Fe,we.data):t.texImage3D(s.TEXTURE_2D_ARRAY,de,Be,we.width,we.height,me.depth,0,Te,Fe,we.data)}else{V&&ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Be,rt[0].width,rt[0].height);for(let de=0,ce=rt.length;de<ce;de++)we=rt[de],M.format!==qn?Te!==null?V?Me&&t.compressedTexSubImage2D(s.TEXTURE_2D,de,0,0,we.width,we.height,Te,we.data):t.compressedTexImage2D(s.TEXTURE_2D,de,Be,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):V?Me&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,we.width,we.height,Te,Fe,we.data):t.texImage2D(s.TEXTURE_2D,de,Be,we.width,we.height,0,Te,Fe,we.data)}else if(M.isDataArrayTexture)if(V){if(ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Be,me.width,me.height,me.depth),Me)if(M.layerUpdates.size>0){let de=_h(me.width,me.height,M.format,M.type);for(let ce of M.layerUpdates){let ze=me.data.subarray(ce*de/me.data.BYTES_PER_ELEMENT,(ce+1)*de/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ce,me.width,me.height,1,Te,Fe,ze)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Te,Fe,me.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Be,me.width,me.height,me.depth,0,Te,Fe,me.data);else if(M.isData3DTexture)V?(ve&&t.texStorage3D(s.TEXTURE_3D,Ue,Be,me.width,me.height,me.depth),Me&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Te,Fe,me.data)):t.texImage3D(s.TEXTURE_3D,0,Be,me.width,me.height,me.depth,0,Te,Fe,me.data);else if(M.isFramebufferTexture){if(ve)if(V)t.texStorage2D(s.TEXTURE_2D,Ue,Be,me.width,me.height);else{let de=me.width,ce=me.height;for(let ze=0;ze<Ue;ze++)t.texImage2D(s.TEXTURE_2D,ze,Be,de,ce,0,Te,Fe,null),de>>=1,ce>>=1}}else if(rt.length>0){if(V&&ve){let de=Ft(rt[0]);t.texStorage2D(s.TEXTURE_2D,Ue,Be,de.width,de.height)}for(let de=0,ce=rt.length;de<ce;de++)we=rt[de],V?Me&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,Te,Fe,we):t.texImage2D(s.TEXTURE_2D,de,Be,Te,Fe,we);M.generateMipmaps=!1}else if(V){if(ve){let de=Ft(me);t.texStorage2D(s.TEXTURE_2D,Ue,Be,de.width,de.height)}Me&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Te,Fe,me)}else t.texImage2D(s.TEXTURE_2D,0,Be,Te,Fe,me);g(M)&&p(ne),Oe.__version=ee.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function q(P,M,Y){if(M.image.length!==6)return;let ne=Xe(P,M),se=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+Y);let ee=n.get(se);if(se.version!==ee.__version||ne===!0){t.activeTexture(s.TEXTURE0+Y);let Oe=bt.getPrimaries(bt.workingColorSpace),fe=M.colorSpace===Li?null:bt.getPrimaries(M.colorSpace),Ne=M.colorSpace===Li||Oe===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let Ve=M.isCompressedTexture||M.image[0].isCompressedTexture,me=M.image[0]&&M.image[0].isDataTexture,Te=[];for(let ce=0;ce<6;ce++)!Ve&&!me?Te[ce]=b(M.image[ce],!0,i.maxCubemapSize):Te[ce]=me?M.image[ce].image:M.image[ce],Te[ce]=Ot(M,Te[ce]);let Fe=Te[0],Be=r.convert(M.format,M.colorSpace),we=r.convert(M.type),rt=x(M.internalFormat,Be,we,M.colorSpace),V=M.isVideoTexture!==!0,ve=ee.__version===void 0||ne===!0,Me=se.dataReady,Ue=E(M,Fe);Re(s.TEXTURE_CUBE_MAP,M);let de;if(Ve){V&&ve&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,rt,Fe.width,Fe.height);for(let ce=0;ce<6;ce++){de=Te[ce].mipmaps;for(let ze=0;ze<de.length;ze++){let it=de[ze];M.format!==qn?Be!==null?V?Me&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,0,0,it.width,it.height,Be,it.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,rt,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?Me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,0,0,it.width,it.height,Be,we,it.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze,rt,it.width,it.height,0,Be,we,it.data)}}}else{if(de=M.mipmaps,V&&ve){de.length>0&&Ue++;let ce=Ft(Te[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,rt,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(me){V?Me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Te[ce].width,Te[ce].height,Be,we,Te[ce].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,rt,Te[ce].width,Te[ce].height,0,Be,we,Te[ce].data);for(let ze=0;ze<de.length;ze++){let _t=de[ze].image[ce].image;V?Me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,0,0,_t.width,_t.height,Be,we,_t.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,rt,_t.width,_t.height,0,Be,we,_t.data)}}else{V?Me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Be,we,Te[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,rt,Be,we,Te[ce]);for(let ze=0;ze<de.length;ze++){let it=de[ze];V?Me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,0,0,Be,we,it.image[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ze+1,rt,Be,we,it.image[ce])}}}g(M)&&p(s.TEXTURE_CUBE_MAP),ee.__version=se.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function le(P,M,Y,ne,se,ee){let Oe=r.convert(Y.format,Y.colorSpace),fe=r.convert(Y.type),Ne=x(Y.internalFormat,Oe,fe,Y.colorSpace),Ve=n.get(M),me=n.get(Y);if(me.__renderTarget=M,!Ve.__hasExternalTextures){let Te=Math.max(1,M.width>>ee),Fe=Math.max(1,M.height>>ee);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,ee,Ne,Te,Fe,M.depth,0,Oe,fe,null):t.texImage2D(se,ee,Ne,Te,Fe,0,Oe,fe,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Pe(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ne,se,me.__webglTexture,0,gt(M)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ne,se,me.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(P,M,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,P),M.depthBuffer){let ne=M.depthTexture,se=ne&&ne.isDepthTexture?ne.type:null,ee=y(M.stencilBuffer,se),Oe=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=gt(M);Pe(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,ee,M.width,M.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,ee,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ee,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Oe,s.RENDERBUFFER,P)}else{let ne=M.textures;for(let se=0;se<ne.length;se++){let ee=ne[se],Oe=r.convert(ee.format,ee.colorSpace),fe=r.convert(ee.type),Ne=x(ee.internalFormat,Oe,fe,ee.colorSpace),Ve=gt(M);Y&&Pe(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ve,Ne,M.width,M.height):Pe(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ve,Ne,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Ne,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function oe(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ne=n.get(M.depthTexture);ne.__renderTarget=M,(!ne.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);let se=ne.__webglTexture,ee=gt(M);if(M.depthTexture.format===Ks)Pe(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(M.depthTexture.format===fr)Pe(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function We(P){let M=n.get(P),Y=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){let ne=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ne){let se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ne.removeEventListener("dispose",se)};ne.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=ne}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");let ne=P.texture.mipmaps;ne&&ne.length>0?oe(M.__webglFramebuffer[0],P):oe(M.__webglFramebuffer,P)}else if(Y){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]===void 0)M.__webglDepthbuffer[ne]=s.createRenderbuffer(),Le(M.__webglDepthbuffer[ne],P,!1);else{let se=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[ne];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ee)}}else{let ne=P.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Le(M.__webglDepthbuffer,P,!1);else{let se=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ee)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(P,M,Y){let ne=n.get(P);M!==void 0&&le(ne.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&We(P)}function N(P){let M=P.texture,Y=n.get(P),ne=n.get(M);P.addEventListener("dispose",L);let se=P.textures,ee=P.isWebGLCubeRenderTarget===!0,Oe=se.length>1;if(Oe||(ne.__webglTexture===void 0&&(ne.__webglTexture=s.createTexture()),ne.__version=M.version,o.memory.textures++),ee){Y.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer[fe]=[];for(let Ne=0;Ne<M.mipmaps.length;Ne++)Y.__webglFramebuffer[fe][Ne]=s.createFramebuffer()}else Y.__webglFramebuffer[fe]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)Y.__webglFramebuffer[fe]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(Oe)for(let fe=0,Ne=se.length;fe<Ne;fe++){let Ve=n.get(se[fe]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&Pe(P)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let fe=0;fe<se.length;fe++){let Ne=se[fe];Y.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[fe]);let Ve=r.convert(Ne.format,Ne.colorSpace),me=r.convert(Ne.type),Te=x(Ne.internalFormat,Ve,me,Ne.colorSpace,P.isXRRenderTarget===!0),Fe=gt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Te,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,Y.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),Le(Y.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture),Re(s.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ne=0;Ne<M.mipmaps.length;Ne++)le(Y.__webglFramebuffer[fe][Ne],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ne);else le(Y.__webglFramebuffer[fe],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);g(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let fe=0,Ne=se.length;fe<Ne;fe++){let Ve=se[fe],me=n.get(Ve),Te=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Te=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Te,me.__webglTexture),Re(Te,Ve),le(Y.__webglFramebuffer,P,Ve,s.COLOR_ATTACHMENT0+fe,Te,0),g(Ve)&&p(Te)}t.unbindTexture()}else{let fe=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(fe=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Re(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let Ne=0;Ne<M.mipmaps.length;Ne++)le(Y.__webglFramebuffer[Ne],P,M,s.COLOR_ATTACHMENT0,fe,Ne);else le(Y.__webglFramebuffer,P,M,s.COLOR_ATTACHMENT0,fe,0);g(M)&&p(fe),t.unbindTexture()}P.depthBuffer&&We(P)}function ht(P){let M=P.textures;for(let Y=0,ne=M.length;Y<ne;Y++){let se=M[Y];if(g(se)){let ee=m(P),Oe=n.get(se).__webglTexture;t.bindTexture(ee,Oe),p(ee),t.unbindTexture()}}}let Ce=[],De=[];function ge(P){if(P.samples>0){if(Pe(P)===!1){let M=P.textures,Y=P.width,ne=P.height,se=s.COLOR_BUFFER_BIT,ee=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Oe=n.get(P),fe=M.length>1;if(fe)for(let Ve=0;Ve<M.length;Ve++)t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ve,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ve,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);let Ne=P.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Ve=0;Ve<M.length;Ve++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),fe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[Ve]);let me=n.get(M[Ve]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,me,0)}s.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,se,s.NEAREST),l===!0&&(Ce.length=0,De.length=0,Ce.push(s.COLOR_ATTACHMENT0+Ve),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ce.push(ee),De.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,De)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ce))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let Ve=0;Ve<M.length;Ve++){t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ve,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[Ve]);let me=n.get(M[Ve]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ve,s.TEXTURE_2D,me,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let M=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function gt(P){return Math.min(i.maxSamples,P.samples)}function Pe(P){let M=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function nt(P){let M=o.render.frame;h.get(P)!==M&&(h.set(P,M),P.update())}function Ot(P,M){let Y=P.colorSpace,ne=P.format,se=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Y!==ds&&Y!==Li&&(bt.getTransfer(Y)===Rt?(ne!==qn||se!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),M}function Ft(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=C,this.resetTextureUnits=k,this.setTexture2D=W,this.setTexture2DArray=K,this.setTexture3D=j,this.setTextureCube=X,this.rebindTextures=dt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Pe}function Lx(s,e){function t(n,i=Li){let r,o=bt.getTransfer(i);if(n===ri)return s.UNSIGNED_BYTE;if(n===cl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===hl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ah)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===lh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===rh)return s.BYTE;if(n===oh)return s.SHORT;if(n===hr)return s.UNSIGNED_SHORT;if(n===ll)return s.INT;if(n===Qi)return s.UNSIGNED_INT;if(n===oi)return s.FLOAT;if(n===ur)return s.HALF_FLOAT;if(n===ch)return s.ALPHA;if(n===hh)return s.RGB;if(n===qn)return s.RGBA;if(n===Ks)return s.DEPTH_COMPONENT;if(n===fr)return s.DEPTH_STENCIL;if(n===ul)return s.RED;if(n===dl)return s.RED_INTEGER;if(n===uh)return s.RG;if(n===fl)return s.RG_INTEGER;if(n===pl)return s.RGBA_INTEGER;if(n===wo||n===Eo||n===To||n===Ao)if(o===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ml||n===gl||n===vl||n===xl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yl||n===_l||n===bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yl||n===_l)return o===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===bl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ml||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===kl||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ml)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===El)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Al)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ll)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===kl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ul||n===Nl||n===Ol)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ul)return o===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ol)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bl||n===zl||n===Hl||n===Vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Bl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===zl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var Dx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new nn({vertexShader:Dx,fragmentShader:kx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new wn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kh=class extends Ri{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,v=null,b=typeof XRWebGLBinding<"u",g=new Dh,p={},m=t.getContextAttributes(),x=null,y=null,E=[],T=[],L=new Ee,R=null,S=new cn;S.viewport=new Tt;let w=new cn;w.viewport=new Tt;let A=[S,w],k=new Ka,C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let q=E[te];return q===void 0&&(q=new Qs,E[te]=q),q.getTargetRaySpace()},this.getControllerGrip=function(te){let q=E[te];return q===void 0&&(q=new Qs,E[te]=q),q.getGripSpace()},this.getHand=function(te){let q=E[te];return q===void 0&&(q=new Qs,E[te]=q),q.getHandSpace()};function W(te){let q=T.indexOf(te.inputSource);if(q===-1)return;let le=E[q];le!==void 0&&(le.update(te.inputSource,te.frame,c||o),le.dispatchEvent({type:te.type,data:te.inputSource}))}function K(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",j);for(let te=0;te<E.length;te++){let q=T[te];q!==null&&(T[te]=null,E[te].disconnect(q))}C=null,z=null,g.reset();for(let te in p)delete p[te];e.setRenderTarget(x),f=null,d=null,u=null,i=null,y=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&b&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",K),i.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(L),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,Le=null,oe=null;m.depth&&(oe=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=m.stencil?fr:Ks,Le=m.stencil?dr:Qi);let We={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(We),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new ci(d.textureWidth,d.textureHeight,{format:qn,type:ri,depthTexture:new ro(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let le={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,le),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ci(f.framebufferWidth,f.framebufferHeight,{format:qn,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),He.setContext(i),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(te){for(let q=0;q<te.removed.length;q++){let le=te.removed[q],Le=T.indexOf(le);Le>=0&&(T[Le]=null,E[Le].disconnect(le))}for(let q=0;q<te.added.length;q++){let le=te.added[q],Le=T.indexOf(le);if(Le===-1){for(let We=0;We<E.length;We++)if(We>=T.length){T.push(le),Le=We;break}else if(T[We]===null){T[We]=le,Le=We;break}if(Le===-1)break}let oe=E[Le];oe&&oe.connect(le)}}let X=new O,ae=new O;function he(te,q,le){X.setFromMatrixPosition(q.matrixWorld),ae.setFromMatrixPosition(le.matrixWorld);let Le=X.distanceTo(ae),oe=q.projectionMatrix.elements,We=le.projectionMatrix.elements,dt=oe[14]/(oe[10]-1),N=oe[14]/(oe[10]+1),ht=(oe[9]+1)/oe[5],Ce=(oe[9]-1)/oe[5],De=(oe[8]-1)/oe[0],ge=(We[8]+1)/We[0],gt=dt*De,Pe=dt*ge,nt=Le/(-De+ge),Ot=nt*-De;if(q.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Ot),te.translateZ(nt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),oe[10]===-1)te.projectionMatrix.copy(q.projectionMatrix),te.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{let Ft=dt+nt,P=N+nt,M=gt-Ot,Y=Pe+(Le-Ot),ne=ht*N/P*Ft,se=Ce*N/P*Ft;te.projectionMatrix.makePerspective(M,Y,ne,se,Ft,P),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function _e(te,q){q===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(q.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let q=te.near,le=te.far;g.texture!==null&&(g.depthNear>0&&(q=g.depthNear),g.depthFar>0&&(le=g.depthFar)),k.near=w.near=S.near=q,k.far=w.far=S.far=le,(C!==k.near||z!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),C=k.near,z=k.far),k.layers.mask=te.layers.mask|6,S.layers.mask=k.layers.mask&3,w.layers.mask=k.layers.mask&5;let Le=te.parent,oe=k.cameras;_e(k,Le);for(let We=0;We<oe.length;We++)_e(oe[We],Le);oe.length===2?he(k,S,w):k.projectionMatrix.copy(S.projectionMatrix),Re(te,k,Le)};function Re(te,q,le){le===null?te.matrix.copy(q.matrixWorld):(te.matrix.copy(le.matrixWorld),te.matrix.invert(),te.matrix.multiply(q.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(q.projectionMatrix),te.projectionMatrixInverse.copy(q.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=ba*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(te){return p[te]};let Xe=null;function qe(te,q){if(h=q.getViewerPose(c||o),v=q,h!==null){let le=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Le=!1;le.length!==k.cameras.length&&(k.cameras.length=0,Le=!0);for(let N=0;N<le.length;N++){let ht=le[N],Ce=null;if(f!==null)Ce=f.getViewport(ht);else{let ge=u.getViewSubImage(d,ht);Ce=ge.viewport,N===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let De=A[N];De===void 0&&(De=new cn,De.layers.enable(N),De.viewport=new Tt,A[N]=De),De.matrix.fromArray(ht.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(ht.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),N===0&&(k.matrix.copy(De.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Le===!0&&k.cameras.push(De)}let oe=i.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&b){u=n.getBinding();let N=u.getDepthInformation(le[0]);N&&N.isValid&&N.texture&&g.init(N,i.renderState)}if(oe&&oe.includes("camera-access")&&b){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<le.length;N++){let ht=le[N].camera;if(ht){let Ce=p[ht];Ce||(Ce=new oo,p[ht]=Ce);let De=u.getCameraImage(ht);Ce.sourceTexture=De}}}}for(let le=0;le<E.length;le++){let Le=T[le],oe=E[le];Le!==null&&oe!==void 0&&oe.update(Le,q,c||o)}Xe&&Xe(te,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),v=null}let He=new hf;He.setAnimationLoop(qe),this.setAnimationLoop=function(te){Xe=te},this.dispose=function(){}}},ys=new Xn,Fx=new wt;function Ux(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,gh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,m,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),v(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),b(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,m,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===fn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===fn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let m=e.get(p),x=m.envMap,y=m.envMapRotation;x&&(g.envMap.value=x,ys.copy(y),ys.x*=-1,ys.y*=-1,ys.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),g.envMapRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(ys)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,m,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*m,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,m){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,p){p.matcap&&(g.matcap.value=p.matcap)}function b(g,p){let m=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Nx(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,x){let y=x.program;n.uniformBlockBinding(m,y)}function c(m,x){let y=i[m.id];y===void 0&&(v(m),y=h(m),i[m.id]=y,m.addEventListener("dispose",g));let E=x.program;n.updateUBOMapping(m,E);let T=e.render.frame;r[m.id]!==T&&(d(m),r[m.id]=T)}function h(m){let x=u();m.__bindingPointIndex=x;let y=s.createBuffer(),E=m.__size,T=m.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,E,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,y),y}function u(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(m){let x=i[m.id],y=m.uniforms,E=m.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,L=y.length;T<L;T++){let R=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,w=R.length;S<w;S++){let A=R[S];if(f(A,T,S,E)===!0){let k=A.__offset,C=Array.isArray(A.value)?A.value:[A.value],z=0;for(let W=0;W<C.length;W++){let K=C[W],j=b(K);typeof K=="number"||typeof K=="boolean"?(A.__data[0]=K,s.bufferSubData(s.UNIFORM_BUFFER,k+z,A.__data)):K.isMatrix3?(A.__data[0]=K.elements[0],A.__data[1]=K.elements[1],A.__data[2]=K.elements[2],A.__data[3]=0,A.__data[4]=K.elements[3],A.__data[5]=K.elements[4],A.__data[6]=K.elements[5],A.__data[7]=0,A.__data[8]=K.elements[6],A.__data[9]=K.elements[7],A.__data[10]=K.elements[8],A.__data[11]=0):(K.toArray(A.__data,z),z+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,A.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(m,x,y,E){let T=m.value,L=x+"_"+y;if(E[L]===void 0)return typeof T=="number"||typeof T=="boolean"?E[L]=T:E[L]=T.clone(),!0;{let R=E[L];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return E[L]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function v(m){let x=m.uniforms,y=0,E=16;for(let L=0,R=x.length;L<R;L++){let S=Array.isArray(x[L])?x[L]:[x[L]];for(let w=0,A=S.length;w<A;w++){let k=S[w],C=Array.isArray(k.value)?k.value:[k.value];for(let z=0,W=C.length;z<W;z++){let K=C[z],j=b(K),X=y%E,ae=X%j.boundary,he=X+ae;y+=ae,he!==0&&E-he<j.storage&&(y+=E-he),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=j.storage}}}let T=y%E;return T>0&&(y+=E-T),m.__size=y,m.__cache={},this}function b(m){let x={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(x.boundary=4,x.storage=4):m.isVector2?(x.boundary=8,x.storage=8):m.isVector3||m.isColor?(x.boundary=16,x.storage=12):m.isVector4?(x.boundary=16,x.storage=16):m.isMatrix3?(x.boundary=48,x.storage=48):m.isMatrix4?(x.boundary=64,x.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),x}function g(m){let x=m.target;x.removeEventListener("dispose",g);let y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(let m in i)s.deleteBuffer(i[m]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Kl=class{constructor(e={}){let{canvas:t=Id(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let v=new Uint32Array(4),b=new Int32Array(4),g=null,p=null,m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,E=!1;this._outputColorSpace=Wt;let T=0,L=0,R=null,S=-1,w=null,A=new Tt,k=new Tt,C=null,z=new Qe(0),W=0,K=t.width,j=t.height,X=1,ae=null,he=null,_e=new Tt(0,0,K,j),Re=new Tt(0,0,K,j),Xe=!1,qe=new tr,He=!1,te=!1,q=new wt,le=new O,Le=new Tt,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function dt(){return R===null?X:1}let N=n;function ht(_,I){return t.getContext(_,I)}try{let _={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",de,!1),N===null){let I="webgl2";if(N=ht(I,_),N===null)throw ht(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Ce,De,ge,gt,Pe,nt,Ot,Ft,P,M,Y,ne,se,ee,Oe,fe,Ne,Ve,me,Te,Fe,Be,we,rt;function V(){Ce=new tv(N),Ce.init(),Be=new Lx(N,Ce),De=new $g(N,Ce,e,Be),ge=new Ix(N,Ce),De.reversedDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),gt=new sv(N),Pe=new vx,nt=new Px(N,Ce,ge,Pe,De,Be,gt),Ot=new Zg(y),Ft=new ev(y),P=new hm(N),we=new qg(N,P),M=new nv(N,P,gt,we),Y=new ov(N,M,P,gt),me=new rv(N,De,nt),fe=new Kg(Pe),ne=new gx(y,Ot,Ft,Ce,De,we,fe),se=new Ux(y,Pe),ee=new yx,Oe=new Ex(Ce),Ve=new Xg(y,Ot,Ft,ge,Y,f,l),Ne=new Rx(y,Y,De),rt=new Nx(N,gt,De,ge),Te=new Yg(N,Ce,gt),Fe=new iv(N,Ce,gt),gt.programs=ne.programs,y.capabilities=De,y.extensions=Ce,y.properties=Pe,y.renderLists=ee,y.shadowMap=Ne,y.state=ge,y.info=gt}V();let ve=new kh(y,N);this.xr=ve,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let _=Ce.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Ce.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(_){_!==void 0&&(X=_,this.setSize(K,j,!1))},this.getSize=function(_){return _.set(K,j)},this.setSize=function(_,I,D=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=_,j=I,t.width=Math.floor(_*X),t.height=Math.floor(I*X),D===!0&&(t.style.width=_+"px",t.style.height=I+"px"),this.setViewport(0,0,_,I)},this.getDrawingBufferSize=function(_){return _.set(K*X,j*X).floor()},this.setDrawingBufferSize=function(_,I,D){K=_,j=I,X=D,t.width=Math.floor(_*D),t.height=Math.floor(I*D),this.setViewport(0,0,_,I)},this.getCurrentViewport=function(_){return _.copy(A)},this.getViewport=function(_){return _.copy(_e)},this.setViewport=function(_,I,D,H){_.isVector4?_e.set(_.x,_.y,_.z,_.w):_e.set(_,I,D,H),ge.viewport(A.copy(_e).multiplyScalar(X).round())},this.getScissor=function(_){return _.copy(Re)},this.setScissor=function(_,I,D,H){_.isVector4?Re.set(_.x,_.y,_.z,_.w):Re.set(_,I,D,H),ge.scissor(k.copy(Re).multiplyScalar(X).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(_){ge.setScissorTest(Xe=_)},this.setOpaqueSort=function(_){ae=_},this.setTransparentSort=function(_){he=_},this.getClearColor=function(_){return _.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(_=!0,I=!0,D=!0){let H=0;if(_){let B=!1;if(R!==null){let re=R.texture.format;B=re===pl||re===fl||re===dl}if(B){let re=R.texture.type,ue=re===ri||re===Qi||re===hr||re===dr||re===cl||re===hl,Se=Ve.getClearColor(),Ae=Ve.getClearAlpha(),Ye=Se.r,et=Se.g,$e=Se.b;ue?(v[0]=Ye,v[1]=et,v[2]=$e,v[3]=Ae,N.clearBufferuiv(N.COLOR,0,v)):(b[0]=Ye,b[1]=et,b[2]=$e,b[3]=Ae,N.clearBufferiv(N.COLOR,0,b))}else H|=N.COLOR_BUFFER_BIT}I&&(H|=N.DEPTH_BUFFER_BIT),D&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Ve.dispose(),ee.dispose(),Oe.dispose(),Pe.dispose(),Ot.dispose(),Ft.dispose(),Y.dispose(),we.dispose(),rt.dispose(),ne.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",An),ve.removeEventListener("sessionend",ts),$n.stop()};function Me(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let _=gt.autoReset,I=Ne.enabled,D=Ne.autoUpdate,H=Ne.needsUpdate,B=Ne.type;V(),gt.autoReset=_,Ne.enabled=I,Ne.autoUpdate=D,Ne.needsUpdate=H,Ne.type=B}function de(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ce(_){let I=_.target;I.removeEventListener("dispose",ce),ze(I)}function ze(_){it(_),Pe.remove(_)}function it(_){let I=Pe.get(_).programs;I!==void 0&&(I.forEach(function(D){ne.releaseProgram(D)}),_.isShaderMaterial&&ne.releaseShaderCache(_))}this.renderBufferDirect=function(_,I,D,H,B,re){I===null&&(I=oe);let ue=B.isMesh&&B.matrixWorld.determinant()<0,Se=$(_,I,D,H,B);ge.setMaterial(H,ue);let Ae=D.index,Ye=1;if(H.wireframe===!0){if(Ae=M.getWireframeAttribute(D),Ae===void 0)return;Ye=2}let et=D.drawRange,$e=D.attributes.position,ft=et.start*Ye,At=(et.start+et.count)*Ye;re!==null&&(ft=Math.max(ft,re.start*Ye),At=Math.min(At,(re.start+re.count)*Ye)),Ae!==null?(ft=Math.max(ft,0),At=Math.min(At,Ae.count)):$e!=null&&(ft=Math.max(ft,0),At=Math.min(At,$e.count));let Gt=At-ft;if(Gt<0||Gt===1/0)return;we.setup(B,H,Se,D,Ae);let tt,ct=Te;if(Ae!==null&&(tt=P.get(Ae),ct=Fe,ct.setIndex(tt)),B.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*dt()),ct.setMode(N.LINES)):ct.setMode(N.TRIANGLES);else if(B.isLine){let Je=H.linewidth;Je===void 0&&(Je=1),ge.setLineWidth(Je*dt()),B.isLineSegments?ct.setMode(N.LINES):B.isLineLoop?ct.setMode(N.LINE_LOOP):ct.setMode(N.LINE_STRIP)}else B.isPoints?ct.setMode(N.POINTS):B.isSprite&&ct.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Js("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ce.get("WEBGL_multi_draw"))ct.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Je=B._multiDrawStarts,Xt=B._multiDrawCounts,St=B._multiDrawCount,kn=Ae?P.get(Ae).bytesPerElement:1,Ts=Pe.get(H).currentProgram.getUniforms();for(let Fn=0;Fn<St;Fn++)Ts.setValue(N,"_gl_DrawID",Fn),ct.render(Je[Fn]/kn,Xt[Fn])}else if(B.isInstancedMesh)ct.renderInstances(ft,Gt,B.count);else if(D.isInstancedBufferGeometry){let Je=D._maxInstanceCount!==void 0?D._maxInstanceCount:1/0,Xt=Math.min(D.instanceCount,Je);ct.renderInstances(ft,Gt,Xt)}else ct.render(ft,Gt)};function _t(_,I,D){_.transparent===!0&&_.side===gn&&_.forceSinglePass===!1?(_.side=fn,_.needsUpdate=!0,ke(_,I,D),_.side=Ti,_.needsUpdate=!0,ke(_,I,D),_.side=gn):ke(_,I,D)}this.compile=function(_,I,D=null){D===null&&(D=_),p=Oe.get(D),p.init(I),x.push(p),D.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),_!==D&&_.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let H=new Set;return _.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let re=B.material;if(re)if(Array.isArray(re))for(let ue=0;ue<re.length;ue++){let Se=re[ue];_t(Se,D,B),H.add(Se)}else _t(re,D,B),H.add(re)}),p=x.pop(),H},this.compileAsync=function(_,I,D=null){let H=this.compile(_,I,D);return new Promise(B=>{function re(){if(H.forEach(function(ue){Pe.get(ue).currentProgram.isReady()&&H.delete(ue)}),H.size===0){B(_);return}setTimeout(re,10)}Ce.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let yt=null;function Dn(_){yt&&yt(_)}function An(){$n.stop()}function ts(){$n.start()}let $n=new hf;$n.setAnimationLoop(Dn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(_){yt=_,ve.setAnimationLoop(_),_===null?$n.stop():$n.start()},ve.addEventListener("sessionstart",An),ve.addEventListener("sessionend",ts),this.render=function(_,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(I),I=ve.getCamera()),_.isScene===!0&&_.onBeforeRender(y,_,I,R),p=Oe.get(_,x.length),p.init(I),x.push(p),q.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),qe.setFromProjectionMatrix(q,ti,I.reversedDepth),te=this.localClippingEnabled,He=fe.init(this.clippingPlanes,te),g=ee.get(_,m.length),g.init(),m.push(g),ve.enabled===!0&&ve.isPresenting===!0){let re=y.xr.getDepthSensingMesh();re!==null&&Kn(re,I,-1/0,y.sortObjects)}Kn(_,I,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ae,he),We=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,We&&Ve.addToRenderList(g,_),this.info.render.frame++,He===!0&&fe.beginShadows();let D=p.state.shadowsArray;Ne.render(D,_,I),He===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,B=g.transmissive;if(p.setupLights(),I.isArrayCamera){let re=I.cameras;if(B.length>0)for(let ue=0,Se=re.length;ue<Se;ue++){let Ae=re[ue];pe(H,B,_,Ae)}We&&Ve.render(_);for(let ue=0,Se=re.length;ue<Se;ue++){let Ae=re[ue];G(g,_,Ae,Ae.viewport)}}else B.length>0&&pe(H,B,_,I),We&&Ve.render(_),G(g,_,I);R!==null&&L===0&&(nt.updateMultisampleRenderTarget(R),nt.updateRenderTargetMipmap(R)),_.isScene===!0&&_.onAfterRender(y,_,I),we.resetDefaultState(),S=-1,w=null,x.pop(),x.length>0?(p=x[x.length-1],He===!0&&fe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Kn(_,I,D,H){if(_.visible===!1)return;if(_.layers.test(I.layers)){if(_.isGroup)D=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(I);else if(_.isLight)p.pushLight(_),_.castShadow&&p.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||qe.intersectsSprite(_)){H&&Le.setFromMatrixPosition(_.matrixWorld).applyMatrix4(q);let ue=Y.update(_),Se=_.material;Se.visible&&g.push(_,ue,Se,D,Le.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||qe.intersectsObject(_))){let ue=Y.update(_),Se=_.material;if(H&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Le.copy(_.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Le.copy(ue.boundingSphere.center)),Le.applyMatrix4(_.matrixWorld).applyMatrix4(q)),Array.isArray(Se)){let Ae=ue.groups;for(let Ye=0,et=Ae.length;Ye<et;Ye++){let $e=Ae[Ye],ft=Se[$e.materialIndex];ft&&ft.visible&&g.push(_,ue,ft,D,Le.z,$e)}}else Se.visible&&g.push(_,ue,Se,D,Le.z,null)}}let re=_.children;for(let ue=0,Se=re.length;ue<Se;ue++)Kn(re[ue],I,D,H)}function G(_,I,D,H){let B=_.opaque,re=_.transmissive,ue=_.transparent;p.setupLightsView(D),He===!0&&fe.setGlobalState(y.clippingPlanes,D),H&&ge.viewport(A.copy(H)),B.length>0&&be(B,I,D),re.length>0&&be(re,I,D),ue.length>0&&be(ue,I,D),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function pe(_,I,D,H){if((D.isScene===!0?D.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new ci(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float")?ur:ri,minFilter:ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace}));let re=p.state.transmissionRenderTarget[H.id],ue=H.viewport||A;re.setSize(ue.z*y.transmissionResolutionScale,ue.w*y.transmissionResolutionScale);let Se=y.getRenderTarget(),Ae=y.getActiveCubeFace(),Ye=y.getActiveMipmapLevel();y.setRenderTarget(re),y.getClearColor(z),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),We&&Ve.render(D);let et=y.toneMapping;y.toneMapping=si;let $e=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),He===!0&&fe.setGlobalState(y.clippingPlanes,H),be(_,D,H),nt.updateMultisampleRenderTarget(re),nt.updateRenderTargetMipmap(re),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let At=0,Gt=I.length;At<Gt;At++){let tt=I[At],ct=tt.object,Je=tt.geometry,Xt=tt.material,St=tt.group;if(Xt.side===gn&&ct.layers.test(H.layers)){let kn=Xt.side;Xt.side=fn,Xt.needsUpdate=!0,Ke(ct,D,H,Je,Xt,St),Xt.side=kn,Xt.needsUpdate=!0,ft=!0}}ft===!0&&(nt.updateMultisampleRenderTarget(re),nt.updateRenderTargetMipmap(re))}y.setRenderTarget(Se,Ae,Ye),y.setClearColor(z,W),$e!==void 0&&(H.viewport=$e),y.toneMapping=et}function be(_,I,D){let H=I.isScene===!0?I.overrideMaterial:null;for(let B=0,re=_.length;B<re;B++){let ue=_[B],Se=ue.object,Ae=ue.geometry,Ye=ue.group,et=ue.material;et.allowOverride===!0&&H!==null&&(et=H),Se.layers.test(D.layers)&&Ke(Se,I,D,Ae,et,Ye)}}function Ke(_,I,D,H,B,re){_.onBeforeRender(y,I,D,H,B,re),_.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),B.onBeforeRender(y,I,D,H,_,re),B.transparent===!0&&B.side===gn&&B.forceSinglePass===!1?(B.side=fn,B.needsUpdate=!0,y.renderBufferDirect(D,I,H,B,_,re),B.side=Ti,B.needsUpdate=!0,y.renderBufferDirect(D,I,H,B,_,re),B.side=gn):y.renderBufferDirect(D,I,H,B,_,re),_.onAfterRender(y,I,D,H,B,re)}function ke(_,I,D){I.isScene!==!0&&(I=oe);let H=Pe.get(_),B=p.state.lights,re=p.state.shadowsArray,ue=B.state.version,Se=ne.getParameters(_,B.state,re,I,D),Ae=ne.getProgramCacheKey(Se),Ye=H.programs;H.environment=_.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(_.isMeshStandardMaterial?Ft:Ot).get(_.envMap||H.environment),H.envMapRotation=H.environment!==null&&_.envMap===null?I.environmentRotation:_.envMapRotation,Ye===void 0&&(_.addEventListener("dispose",ce),Ye=new Map,H.programs=Ye);let et=Ye.get(Ae);if(et!==void 0){if(H.currentProgram===et&&H.lightsStateVersion===ue)return Pt(_,Se),et}else Se.uniforms=ne.getUniforms(_),_.onBeforeCompile(Se,y),et=ne.acquireProgram(Se,Ae),Ye.set(Ae,et),H.uniforms=Se.uniforms;let $e=H.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&($e.clippingPlanes=fe.uniform),Pt(_,Se),H.needsLights=J(_),H.lightsStateVersion=ue,H.needsLights&&($e.ambientLightColor.value=B.state.ambient,$e.lightProbe.value=B.state.probe,$e.directionalLights.value=B.state.directional,$e.directionalLightShadows.value=B.state.directionalShadow,$e.spotLights.value=B.state.spot,$e.spotLightShadows.value=B.state.spotShadow,$e.rectAreaLights.value=B.state.rectArea,$e.ltc_1.value=B.state.rectAreaLTC1,$e.ltc_2.value=B.state.rectAreaLTC2,$e.pointLights.value=B.state.point,$e.pointLightShadows.value=B.state.pointShadow,$e.hemisphereLights.value=B.state.hemi,$e.directionalShadowMap.value=B.state.directionalShadowMap,$e.directionalShadowMatrix.value=B.state.directionalShadowMatrix,$e.spotShadowMap.value=B.state.spotShadowMap,$e.spotLightMatrix.value=B.state.spotLightMatrix,$e.spotLightMap.value=B.state.spotLightMap,$e.pointShadowMap.value=B.state.pointShadowMap,$e.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=et,H.uniformsList=null,et}function at(_){if(_.uniformsList===null){let I=_.currentProgram.getUniforms();_.uniformsList=gr.seqWithValue(I.seq,_.uniforms)}return _.uniformsList}function Pt(_,I){let D=Pe.get(_);D.outputColorSpace=I.outputColorSpace,D.batching=I.batching,D.batchingColor=I.batchingColor,D.instancing=I.instancing,D.instancingColor=I.instancingColor,D.instancingMorph=I.instancingMorph,D.skinning=I.skinning,D.morphTargets=I.morphTargets,D.morphNormals=I.morphNormals,D.morphColors=I.morphColors,D.morphTargetsCount=I.morphTargetsCount,D.numClippingPlanes=I.numClippingPlanes,D.numIntersection=I.numClipIntersection,D.vertexAlphas=I.vertexAlphas,D.vertexTangents=I.vertexTangents,D.toneMapping=I.toneMapping}function $(_,I,D,H,B){I.isScene!==!0&&(I=oe),nt.resetTextureUnits();let re=I.fog,ue=H.isMeshStandardMaterial?I.environment:null,Se=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ds,Ae=(H.isMeshStandardMaterial?Ft:Ot).get(H.envMap||ue),Ye=H.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,et=!!D.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),$e=!!D.morphAttributes.position,ft=!!D.morphAttributes.normal,At=!!D.morphAttributes.color,Gt=si;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Gt=y.toneMapping);let tt=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ct=tt!==void 0?tt.length:0,Je=Pe.get(H),Xt=p.state.lights;if(He===!0&&(te===!0||_!==w)){let _n=_===w&&H.id===S;fe.setState(H,_,_n)}let St=!1;H.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Xt.state.version||Je.outputColorSpace!==Se||B.isBatchedMesh&&Je.batching===!1||!B.isBatchedMesh&&Je.batching===!0||B.isBatchedMesh&&Je.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Je.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Je.instancing===!1||!B.isInstancedMesh&&Je.instancing===!0||B.isSkinnedMesh&&Je.skinning===!1||!B.isSkinnedMesh&&Je.skinning===!0||B.isInstancedMesh&&Je.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Je.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Je.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Je.instancingMorph===!1&&B.morphTexture!==null||Je.envMap!==Ae||H.fog===!0&&Je.fog!==re||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==fe.numPlanes||Je.numIntersection!==fe.numIntersection)||Je.vertexAlphas!==Ye||Je.vertexTangents!==et||Je.morphTargets!==$e||Je.morphNormals!==ft||Je.morphColors!==At||Je.toneMapping!==Gt||Je.morphTargetsCount!==ct)&&(St=!0):(St=!0,Je.__version=H.version);let kn=Je.currentProgram;St===!0&&(kn=ke(H,I,B));let Ts=!1,Fn=!1,Ar=!1,qt=kn.getUniforms(),Hn=Je.uniforms;if(ge.useProgram(kn.program)&&(Ts=!0,Fn=!0,Ar=!0),H.id!==S&&(S=H.id,Fn=!0),Ts||w!==_){ge.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),qt.setValue(N,"projectionMatrix",_.projectionMatrix),qt.setValue(N,"viewMatrix",_.matrixWorldInverse);let Rn=qt.map.cameraPosition;Rn!==void 0&&Rn.setValue(N,le.setFromMatrixPosition(_.matrixWorld)),De.logarithmicDepthBuffer&&qt.setValue(N,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&qt.setValue(N,"isOrthographic",_.isOrthographicCamera===!0),w!==_&&(w=_,Fn=!0,Ar=!0)}if(B.isSkinnedMesh){qt.setOptional(N,B,"bindMatrix"),qt.setOptional(N,B,"bindMatrixInverse");let _n=B.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),qt.setValue(N,"boneTexture",_n.boneTexture,nt))}B.isBatchedMesh&&(qt.setOptional(N,B,"batchingTexture"),qt.setValue(N,"batchingTexture",B._matricesTexture,nt),qt.setOptional(N,B,"batchingIdTexture"),qt.setValue(N,"batchingIdTexture",B._indirectTexture,nt),qt.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&qt.setValue(N,"batchingColorTexture",B._colorsTexture,nt));let Vn=D.morphAttributes;if((Vn.position!==void 0||Vn.normal!==void 0||Vn.color!==void 0)&&me.update(B,D,kn),(Fn||Je.receiveShadow!==B.receiveShadow)&&(Je.receiveShadow=B.receiveShadow,qt.setValue(N,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Hn.envMap.value=Ae,Hn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&I.environment!==null&&(Hn.envMapIntensity.value=I.environmentIntensity),Fn&&(qt.setValue(N,"toneMappingExposure",y.toneMappingExposure),Je.needsLights&&Q(Hn,Ar),re&&H.fog===!0&&se.refreshFogUniforms(Hn,re),se.refreshMaterialUniforms(Hn,H,X,j,p.state.transmissionRenderTarget[_.id]),gr.upload(N,at(Je),Hn,nt)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(gr.upload(N,at(Je),Hn,nt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&qt.setValue(N,"center",B.center),qt.setValue(N,"modelViewMatrix",B.modelViewMatrix),qt.setValue(N,"normalMatrix",B.normalMatrix),qt.setValue(N,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let _n=H.uniformsGroups;for(let Rn=0,uc=_n.length;Rn<uc;Rn++){let ns=_n[Rn];rt.update(ns,kn),rt.bind(ns,kn)}}return kn}function Q(_,I){_.ambientLightColor.needsUpdate=I,_.lightProbe.needsUpdate=I,_.directionalLights.needsUpdate=I,_.directionalLightShadows.needsUpdate=I,_.pointLights.needsUpdate=I,_.pointLightShadows.needsUpdate=I,_.spotLights.needsUpdate=I,_.spotLightShadows.needsUpdate=I,_.rectAreaLights.needsUpdate=I,_.hemisphereLights.needsUpdate=I}function J(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(_,I,D){let H=Pe.get(_);H.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Pe.get(_.texture).__webglTexture=I,Pe.get(_.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:D,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,I){let D=Pe.get(_);D.__webglFramebuffer=I,D.__useDefaultFramebuffer=I===void 0};let F=N.createFramebuffer();this.setRenderTarget=function(_,I=0,D=0){R=_,T=I,L=D;let H=!0,B=null,re=!1,ue=!1;if(_){let Ae=Pe.get(_);if(Ae.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(Ae.__webglFramebuffer===void 0)nt.setupRenderTarget(_);else if(Ae.__hasExternalTextures)nt.rebindTextures(_,Pe.get(_.texture).__webglTexture,Pe.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let $e=_.depthTexture;if(Ae.__boundDepthTexture!==$e){if($e!==null&&Pe.has($e)&&(_.width!==$e.image.width||_.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");nt.setupDepthRenderbuffer(_)}}let Ye=_.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(ue=!0);let et=Pe.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(et[I])?B=et[I][D]:B=et[I],re=!0):_.samples>0&&nt.useMultisampledRTT(_)===!1?B=Pe.get(_).__webglMultisampledFramebuffer:Array.isArray(et)?B=et[D]:B=et,A.copy(_.viewport),k.copy(_.scissor),C=_.scissorTest}else A.copy(_e).multiplyScalar(X).floor(),k.copy(Re).multiplyScalar(X).floor(),C=Xe;if(D!==0&&(B=F),ge.bindFramebuffer(N.FRAMEBUFFER,B)&&H&&ge.drawBuffers(_,B),ge.viewport(A),ge.scissor(k),ge.setScissorTest(C),re){let Ae=Pe.get(_.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ae.__webglTexture,D)}else if(ue){let Ae=I;for(let Ye=0;Ye<_.textures.length;Ye++){let et=Pe.get(_.textures[Ye]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ye,et.__webglTexture,D,Ae)}}else if(_!==null&&D!==0){let Ae=Pe.get(_.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ae.__webglTexture,D)}S=-1},this.readRenderTargetPixels=function(_,I,D,H,B,re,ue,Se=0){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Pe.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ue!==void 0&&(Ae=Ae[ue]),Ae){ge.bindFramebuffer(N.FRAMEBUFFER,Ae);try{let Ye=_.textures[Se],et=Ye.format,$e=Ye.type;if(!De.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=_.width-H&&D>=0&&D<=_.height-B&&(_.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(I,D,H,B,Be.convert(et),Be.convert($e),re))}finally{let Ye=R!==null?Pe.get(R).__webglFramebuffer:null;ge.bindFramebuffer(N.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(_,I,D,H,B,re,ue,Se=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=Pe.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ue!==void 0&&(Ae=Ae[ue]),Ae)if(I>=0&&I<=_.width-H&&D>=0&&D<=_.height-B){ge.bindFramebuffer(N.FRAMEBUFFER,Ae);let Ye=_.textures[Se],et=Ye.format,$e=Ye.type;if(!De.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ft),N.bufferData(N.PIXEL_PACK_BUFFER,re.byteLength,N.STREAM_READ),_.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(I,D,H,B,Be.convert(et),Be.convert($e),0);let At=R!==null?Pe.get(R).__webglFramebuffer:null;ge.bindFramebuffer(N.FRAMEBUFFER,At);let Gt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pd(N,Gt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ft),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,re),N.deleteBuffer(ft),N.deleteSync(Gt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,I=null,D=0){let H=Math.pow(2,-D),B=Math.floor(_.image.width*H),re=Math.floor(_.image.height*H),ue=I!==null?I.x:0,Se=I!==null?I.y:0;nt.setTexture2D(_,0),N.copyTexSubImage2D(N.TEXTURE_2D,D,0,0,ue,Se,B,re),ge.unbindTexture()};let U=N.createFramebuffer(),Z=N.createFramebuffer();this.copyTextureToTexture=function(_,I,D=null,H=null,B=0,re=null){re===null&&(B!==0?(Js("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=B,B=0):re=0);let ue,Se,Ae,Ye,et,$e,ft,At,Gt,tt=_.isCompressedTexture?_.mipmaps[re]:_.image;if(D!==null)ue=D.max.x-D.min.x,Se=D.max.y-D.min.y,Ae=D.isBox3?D.max.z-D.min.z:1,Ye=D.min.x,et=D.min.y,$e=D.isBox3?D.min.z:0;else{let Vn=Math.pow(2,-B);ue=Math.floor(tt.width*Vn),Se=Math.floor(tt.height*Vn),_.isDataArrayTexture?Ae=tt.depth:_.isData3DTexture?Ae=Math.floor(tt.depth*Vn):Ae=1,Ye=0,et=0,$e=0}H!==null?(ft=H.x,At=H.y,Gt=H.z):(ft=0,At=0,Gt=0);let ct=Be.convert(I.format),Je=Be.convert(I.type),Xt;I.isData3DTexture?(nt.setTexture3D(I,0),Xt=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(nt.setTexture2DArray(I,0),Xt=N.TEXTURE_2D_ARRAY):(nt.setTexture2D(I,0),Xt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);let St=N.getParameter(N.UNPACK_ROW_LENGTH),kn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ts=N.getParameter(N.UNPACK_SKIP_PIXELS),Fn=N.getParameter(N.UNPACK_SKIP_ROWS),Ar=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,tt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,tt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ye),N.pixelStorei(N.UNPACK_SKIP_ROWS,et),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$e);let qt=_.isDataArrayTexture||_.isData3DTexture,Hn=I.isDataArrayTexture||I.isData3DTexture;if(_.isDepthTexture){let Vn=Pe.get(_),_n=Pe.get(I),Rn=Pe.get(Vn.__renderTarget),uc=Pe.get(_n.__renderTarget);ge.bindFramebuffer(N.READ_FRAMEBUFFER,Rn.__webglFramebuffer),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,uc.__webglFramebuffer);for(let ns=0;ns<Ae;ns++)qt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(_).__webglTexture,B,$e+ns),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(I).__webglTexture,re,Gt+ns)),N.blitFramebuffer(Ye,et,ue,Se,ft,At,ue,Se,N.DEPTH_BUFFER_BIT,N.NEAREST);ge.bindFramebuffer(N.READ_FRAMEBUFFER,null),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||_.isRenderTargetTexture||Pe.has(_)){let Vn=Pe.get(_),_n=Pe.get(I);ge.bindFramebuffer(N.READ_FRAMEBUFFER,U),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,Z);for(let Rn=0;Rn<Ae;Rn++)qt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Vn.__webglTexture,B,$e+Rn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Vn.__webglTexture,B),Hn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_n.__webglTexture,re,Gt+Rn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_n.__webglTexture,re),B!==0?N.blitFramebuffer(Ye,et,ue,Se,ft,At,ue,Se,N.COLOR_BUFFER_BIT,N.NEAREST):Hn?N.copyTexSubImage3D(Xt,re,ft,At,Gt+Rn,Ye,et,ue,Se):N.copyTexSubImage2D(Xt,re,ft,At,Ye,et,ue,Se);ge.bindFramebuffer(N.READ_FRAMEBUFFER,null),ge.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Hn?_.isDataTexture||_.isData3DTexture?N.texSubImage3D(Xt,re,ft,At,Gt,ue,Se,Ae,ct,Je,tt.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Xt,re,ft,At,Gt,ue,Se,Ae,ct,tt.data):N.texSubImage3D(Xt,re,ft,At,Gt,ue,Se,Ae,ct,Je,tt):_.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,re,ft,At,ue,Se,ct,Je,tt.data):_.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,re,ft,At,tt.width,tt.height,ct,tt.data):N.texSubImage2D(N.TEXTURE_2D,re,ft,At,ue,Se,ct,Je,tt);N.pixelStorei(N.UNPACK_ROW_LENGTH,St),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,kn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ts),N.pixelStorei(N.UNPACK_SKIP_ROWS,Fn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ar),re===0&&I.generateMipmaps&&N.generateMipmap(Xt),ge.unbindTexture()},this.initRenderTarget=function(_){Pe.get(_).__webglFramebuffer===void 0&&nt.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?nt.setTextureCube(_,0):_.isData3DTexture?nt.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?nt.setTexture2DArray(_,0):nt.setTexture2D(_,0),ge.unbindTexture()},this.resetState=function(){T=0,L=0,R=null,ge.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}};function on(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var Mt=(s,e,t)=>s<e?e:s>t?t:s,xn=(s,e,t)=>s+(e-s)*t,mi=(s,e,t)=>{let n=Mt((t-s)/(e-s||1e-6),0,1);return n*n*(3-2*n)},_r=(s,e)=>1-Math.exp(-s*e);function zn(s){return[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255]}function Uh(s){return"#"+s.toString(16).padStart(6,"0")}function Di(s,e){let t=document.createElement("canvas");t.width=s,t.height=e;let n=t.getContext("2d");return{c:t,g:n}}function ki(s,e={}){let t=new so(s);return e.srgb!==!1&&(t.colorSpace=Wt),e.repeat&&(t.wrapS=us,t.wrapT=us),t.anisotropy=4,t}var Tn=11;function Co(s,e){let t=Mt(Math.round(s[0]*e),0,255),n=Mt(Math.round(s[1]*e),0,255),i=Mt(Math.round(s[2]*e),0,255);return`rgb(${t},${n},${i})`}function Nh(s,e,t=!1){let{c:n,g:i}=Di(e,e),r=on(11),o=on(12),a=g=>(g+Tn)/(Tn*2)*e,l=e/(Tn*2),c=(g,p)=>t?.15+.85*mi(4.5,7,Math.hypot(g,p)):1,h=g=>g/e*Tn*2-Tn;i.fillStyle="#9b7c59",i.fillRect(0,0,e,e);for(let g=0;g<2600;g++){let p=r()*e,m=r()*e,x=(2+r()*16)*(e/1024),y=c(h(p),h(m));i.fillStyle=r()<.5?`rgba(70,48,28,${(.04+r()*.07)*y})`:`rgba(206,170,128,${(.04+r()*.07)*y})`,i.beginPath(),i.arc(p,m,x,0,Math.PI*2),i.fill()}let u=1.9,d=[166,140,108];for(let g=-Tn;g<Tn;g+=u)for(let p=-Tn;p<Tn;p+=u){let m=g+u/2+(r()-.5)*u*.5,x=p+u/2+(r()-.5)*u*.5;if(Nt({x:m,z:x},s.poly)<.2)continue;let y=Math.hypot(m,x)/s.radius,E=6+Math.floor(r()*2),T=u*(.42+r()*.1),L=r()*Math.PI;i.beginPath();for(let S=0;S<E;S++){let w=L+S/E*Math.PI*2+(r()-.5)*.35,A=T*(.85+r()*.3),k=a(m+Math.cos(w)*A),C=a(x+Math.sin(w)*A);S===0?i.moveTo(k,C):i.lineTo(k,C)}i.closePath(),i.fillStyle=Co(d,.88+r()*.22+(1-y)*-.03);let R=c(m,x);i.globalAlpha=(.42+y*.4)*R,i.fill(),i.globalAlpha=.5*R,i.strokeStyle="rgba(62,44,28,0.75)",i.lineWidth=2.2*(e/1024),i.stroke(),i.globalAlpha=1}for(let g=0;g<160;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius;if(Nt({x:p,z:m},s.poly)<.6)continue;let x=(.08+r()*.16)*l,y=x*(.6+r()*.3),E=r()*3,T=Co([150,142,130],.8+r()*.4),L=r()*3;t&&Math.hypot(p,m)<6&&o()<.9||(i.fillStyle="rgba(40,28,18,0.35)",i.beginPath(),i.ellipse(a(p)+x*.25,a(m)+y*.45,x,y,E,0,Math.PI*2),i.fill(),i.fillStyle=T,i.beginPath(),i.ellipse(a(p),a(m),x,y,L,0,Math.PI*2),i.fill())}let f=[96,116,52],v=(g,p,m)=>{let x=5+Math.floor(r()*6);for(let y=0;y<x;y++){let E=(r()-.5)*m*2,T=(r()-.5)*m*2,L=(.07+r()*.2)*l;i.fillStyle=Co(f,.7+r()*.45),i.globalAlpha=.55+r()*.3,i.beginPath(),i.arc(a(g+E),a(p+T),L,0,Math.PI*2),i.fill()}i.globalAlpha=1};for(let g=0;g<2600;g++){let p=(r()*2-1)*s.radius*1.1,m=(r()*2-1)*s.radius*1.1,x=Nt({x:p,z:m},s.poly);if(x<0)continue;let y=x<2.6?Math.pow(1-x/2.6,1.4):.015;r()<y*.5&&v(p,m,.4)}for(let g of s.rocks){for(let p=0;p<22;p++){let m=r()*Math.PI*2,x=g.r*(.7+r()*.9);v(g.pos.x+Math.cos(m)*x,g.pos.z+Math.sin(m)*x,.35)}i.fillStyle="rgba(30,22,14,0.28)",i.beginPath(),i.arc(a(g.pos.x),a(g.pos.z),g.r*1.15*l,0,Math.PI*2),i.fill()}for(let g=0;g<70;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius,x=Nt({x:p,z:m},s.poly);x<.4||x>3.2||(i.fillStyle="#f4f1e6",i.beginPath(),i.arc(a(p),a(m),.06*l,0,Math.PI*2),i.fill(),i.fillStyle="#e8c85a",i.beginPath(),i.arc(a(p),a(m),.025*l,0,Math.PI*2),i.fill())}i.save(),i.beginPath(),s.poly.forEach((g,p)=>p===0?i.moveTo(a(g.x),a(g.z)):i.lineTo(a(g.x),a(g.z))),i.closePath(),i.clip(),i.lineJoin="round";for(let[g,p]of[[1.4,.05],[1,.06],[.65,.08],[.35,.1]])i.strokeStyle=`rgba(34,24,14,${p})`,i.lineWidth=g*2*l,i.stroke();i.restore();let b=ki(n);return b.anisotropy=8,b}function mf(){let{c:e,g:t}=Di(256,256),n=on(23);t.fillStyle="#c2bbb0",t.fillRect(0,0,256,256);for(let i=0;i<900;i++){let r=n()*256,o=n()*256,a=2+n()*14;t.fillStyle=n()<.5?`rgba(40,36,34,${.04+n()*.1})`:`rgba(210,200,185,${.03+n()*.08})`;for(let l of[-256,0,256])t.beginPath(),t.arc(r+l,o,a,0,Math.PI*2),t.fill()}for(let i=0;i<26;i++){let r=n()*256;t.strokeStyle=`rgba(30,26,24,${.16+n()*.2})`,t.lineWidth=1+n()*2,t.beginPath();let o=r;t.moveTo(o,0);for(let a=0;a<=256;a+=16)o+=(n()-.5)*5,t.lineTo(o,a);t.stroke()}return ki(e,{repeat:!0})}function gf(){let{c:e,g:t}=Di(512,512),n=on(31);for(let i=0;i<70;i++){let r=n()*512,o=n()*512,a=30+n()*90;for(let l of[-512,0,512])for(let c of[-512,0,512]){let h=t.createRadialGradient(r+l,o+c,0,r+l,o+c,a);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=h,t.fillRect(r+l-a,o+c-a,a*2,a*2)}}return ki(e,{repeat:!0})}function vf(){let{c:e,g:t}=Di(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),ki(e)}function xf(){let{c:t,g:n}=Di(256,64),i=n.createLinearGradient(0,0,256,0);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.65,"rgba(255,255,255,0.35)"),i.addColorStop(1,"rgba(255,255,255,1)");for(let o=0;o<64;o++){let a=Math.abs((o+.5)/64-.5)*2,l=Math.pow(1-a,1.6);n.globalAlpha=l,n.fillStyle=i,n.fillRect(0,o,256,1)}n.globalAlpha=1;let r=n.createLinearGradient(0,0,256,0);return r.addColorStop(.5,"rgba(255,255,255,0)"),r.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=r,n.fillRect(0,64/2-4,256,8),ki(t)}function yf(){let{c:t,g:n}=Di(256,64),i=n.createLinearGradient(0,0,256,0);return i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.8,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=i,n.globalAlpha=.28,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.82,64/2-14),n.lineTo(256*.82,64/2+14),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle=i,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.84,64/2-4),n.lineTo(256*.84,64/2+4),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(254,64/2),n.lineTo(256*.78,64/2-22),n.lineTo(256*.83,64/2),n.lineTo(256*.78,64/2+22),n.closePath(),n.fill(),n.globalAlpha=.5,n.fillRect(256*.55,64/2-1.5,256*.3,3),ki(t)}function _f(s,e){let{c:t,g:n}=Di(e,e),i=on(41),r=Tn,o=u=>(u+r)/(r*2)*e,a=e/(r*2);n.fillStyle="#e2d2b2",n.fillRect(0,0,e,e);for(let u=0;u<90;u++){let d=i()*e,f=i()*e,v=(40+i()*120)*(e/1024),b=n.createRadialGradient(d,f,0,d,f,v);b.addColorStop(0,i()<.5?"rgba(232,220,196,0.22)":"rgba(196,180,152,0.18)"),b.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=b,n.fillRect(d-v,f-v,v*2,v*2)}let l=Math.max(1.5,2.2*(e/1024)),c=-r;for(;c<r;){let u=1.6+i()*1,d=-r-i()*2;for(;d<r;){let f=1.8+i()*1.4,v=()=>(i()-.5)*.08,b=[[d+v(),c+v()],[d+f+v(),c+v()],[d+f+v(),c+u+v()],[d+v(),c+u+v()]],g=.93+i()*.11;if(n.beginPath(),b.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.fillStyle=Co([236,221,192],g),n.fill(),n.strokeStyle="rgba(255,248,232,0.35)",n.lineWidth=l*.8,n.beginPath(),n.moveTo(o(b[3][0]),o(b[3][1])),n.lineTo(o(b[0][0]),o(b[0][1])),n.lineTo(o(b[1][0]),o(b[1][1])),n.stroke(),n.strokeStyle="rgba(122,104,80,0.6)",n.lineWidth=l,n.beginPath(),b.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.stroke(),i()<.35){n.strokeStyle="rgba(110,94,72,0.45)",n.lineWidth=l*.55;let p=d+f*(.2+i()*.6),m=c+u*(.1+i()*.2);n.beginPath(),n.moveTo(o(p),o(m));for(let x=0;x<4;x++)p+=(i()-.5)*.5,m+=u*.2,n.lineTo(o(p),o(m));n.stroke()}if(i()<.2){let p=d+(i()<.5?0:f),m=c+(i()<.5?0:u),x=.18+i()*.2;n.fillStyle="rgba(150,132,104,0.45)",n.beginPath(),n.moveTo(o(p),o(m)),n.lineTo(o(p+(p===d?x:-x)),o(m)),n.lineTo(o(p),o(m+(m===c?x:-x))),n.closePath(),n.fill()}d+=f}c+=u}for(let u=0;u<1800;u++){let d=(i()*2-1)*s.radius*1.1,f=(i()*2-1)*s.radius*1.1,v=Nt({x:d,z:f},s.poly);if(v<0||v>1.3||i()>Math.pow(1-v/1.3,1.5)*.7)continue;let b=(.06+i()*.16)*a;n.fillStyle=Co([112,126,70],.75+i()*.4),n.globalAlpha=.6+i()*.3,n.beginPath(),n.arc(o(d),o(f),b,0,Math.PI*2),n.fill(),n.globalAlpha=1,i()<.12&&(n.fillStyle="#e8c44a",n.beginPath(),n.arc(o(d+.1),o(f),.05*a,0,Math.PI*2),n.fill())}for(let u of s.rocks)n.fillStyle="rgba(80,66,48,0.18)",n.beginPath(),n.arc(o(u.pos.x),o(u.pos.z),u.r*1.12*a,0,Math.PI*2),n.fill();n.save(),n.beginPath(),s.poly.forEach((u,d)=>d===0?n.moveTo(o(u.x),o(u.z)):n.lineTo(o(u.x),o(u.z))),n.closePath(),n.clip(),n.lineJoin="round";for(let[u,d]of[[.9,.05],[.5,.07],[.22,.09]])n.strokeStyle=`rgba(70,56,40,${d})`,n.lineWidth=u*2*a,n.stroke();n.restore();let h=ki(t);return h.anisotropy=8,h}function bf(){let{c:e,g:t}=Di(256,256),n=on(43);t.fillStyle="#e9e1d0",t.fillRect(0,0,256,256);for(let i=0;i<18;i++){t.strokeStyle=`rgba(140,128,112,${.12+n()*.18})`,t.lineWidth=.8+n()*1.6;let r=n()*256,o=0;for(t.beginPath(),t.moveTo(r,o);o<256;)r+=(n()-.5)*18,o+=10+n()*20,t.lineTo(r,o);t.stroke()}for(let i=0;i<400;i++)t.fillStyle=`rgba(${n()<.5?"120,110,96":"255,250,240"},${.03+n()*.05})`,t.beginPath(),t.arc(n()*256,n()*256,2+n()*8,0,Math.PI*2),t.fill();return ki(e,{repeat:!0})}var Mf=typeof location<"u"?new URLSearchParams(location.search):new URLSearchParams,Oh=Mf.get("art"),ot={myth:Oh==="myth",near:Mf.get("cam")==="near"};function Bh(s){return Oh==="myth"?!0:Oh==="base"?!1:s==="v4"}var Sf=()=>ot.myth?2829386:6984904,Ox=40,Bx=110,wf=-18;function zx(){let s=on(77),e=[],t=[[-21.2,-10.2,-3,7,1.6],[-17.9,-10.4,-5,6,1.3],[-24.2,-8.8,-8,3.5,1.4],[23.6,-12.5,-6,4.5,1.5],[21.5,-13.5,-9,4,1.1]];for(let[r,o,a,l,c]of t)e.push({x:r,z:o,top:a,len:l,w:c,capH:.25+s()*.15,haze:.14,tier:0});for(let r=0;r<14;r++){let o=r%2===0?-1:1;e.push({x:o*(28+s()*8),z:-26+s()*14,top:-9-s()*5,len:0,w:1.6+s()*1.4,capH:.3+s()*.2,haze:.5,tier:1})}for(let r=0;r<16;r++){let o,a,l,c=2.6+s()*3;if(r<10)o=(r%2===0?-1:1)*(36+s()*14),a=-36+s()*20,l=-12-s()*4,c=2+s()*1.6;else{let h=Math.PI*(1.2+s()*.6),u=55+s()*20;o=Math.cos(h)*u,a=Math.sin(h)*u,l=-7+s()*15}e.push({x:o,z:a,top:l,len:0,w:c,capH:.4+s()*.3,haze:.66,tier:2})}let n=[],i=[[-27.9,-21.3,-9,1.6],[-31.1,-16.8,-13,1.3],[27.5,-20.7,-9,1.5],[32.2,-17.9,-13,1.2],[-36,-28,-10,2],[37,-30,-11,1.9]];for(let[r,o,a,l]of i)n.push({x:r,z:o,y:a,s:l,haze:.5});return{pillars:e,islets:n}}var Ef=zx(),Jl=new Qe,Fi=(s,e,t)=>(Jl.setRGB(s,e,t,Wt),[Jl.r,Jl.g,Jl.b]);function ec(s,e){let t=e.x-s.x,n=e.z-s.z,i=Math.hypot(t,n)||1;return{x:n/i,z:-t/i}}function Tf(s){let e=s.length;return s.map((t,n)=>{let i=ec(s[(n+e-1)%e],s[n]),r=ec(s[n],s[(n+1)%e]),o=i.x+r.x,a=i.z+r.z,l=Math.hypot(o,a)||1;return{x:o/l,z:a/l}})}var Io=class{constructor(){this.pos=[];this.col=[];this.uv=[]}tri(e,t,n,i,r,o,a,l,c){this.pos.push(...e,...t,...n),this.col.push(...i,...r,...o),this.uv.push(...a,...l,...c)}quad(e,t,n){this.tri(e[0],e[1],e[2],t[0],t[1],t[2],n[0],n[1],n[2]),this.tri(e[0],e[2],e[3],t[0],t[2],t[3],n[0],n[2],n[3])}build(){let e=new jt;return e.setAttribute("position",new mt(this.pos,3)),e.setAttribute("color",new mt(this.col,3)),e.setAttribute("uv",new mt(this.uv,2)),e.computeVertexNormals(),e}};function Hx(s){let e=new sr(s.poly.map(r=>new Ee(r.x,-r.z))),t=new vo(e,1);t.rotateX(-Math.PI/2);let n=t.getAttribute("position"),i=t.getAttribute("uv");for(let r=0;r<n.count;r++)i.setXY(r,(n.getX(r)+Tn)/(Tn*2),1-(n.getZ(r)+Tn)/(Tn*2));return t.computeVertexNormals(),t}function Vx(s,e=!1){let t=on(5),n=s.poly,i=n.length,r=new Io,o=e?[.45,.41,.4]:[.74,.71,.67],a=e?[.5,.55,.32]:[.43,.52,.24],l=e?[.1,.09,.17]:[.28,.3,.36],c=e?.3:1,h=[{yTop:0,yBot:-5,sTop:1,sBot:.975},{yTop:-5,yBot:-13,sTop:.975,sBot:.58}],u=0,d=[];for(let g=0;g<i;g++)d.push(u),u+=Math.hypot(n[(g+1)%i].x-n[g].x,n[(g+1)%i].z-n[g].z);let f=[];h.forEach((g,p)=>{let m=[],x=[],y=[],E=[],T=[];for(let L=0;L<i;){let R=2+Math.floor(t()*2),S=.15+t()*.6,w=(g.yBot-g.yTop)*(p===0?1:.75+t()*.3),A=g.sBot*(.94+t()*.08),k=.8+t()*.32;for(let C=0;C<R&&L<i;C++,L++)x.push(S),y.push(w),E.push(A),T.push(k*(.97+t()*.06))}for(let L=0;L<i;L++){let R=n[L],S=n[(L+1)%i],w=ec(R,S),A=p===0?x[L]:f[L]-.05-t()*.4;p===0&&f.push(A);let k=g.yTop+y[L],C=E[L],z=p===0?0:A,W=[R.x*g.sTop+w.x*z,g.yTop,R.z*g.sTop+w.z*z],K=[S.x*g.sTop+w.x*z,g.yTop,S.z*g.sTop+w.z*z],j=[S.x*C+w.x*A,k,S.z*C+w.z*A],X=[R.x*C+w.x*A,k,R.z*C+w.z*A];m.push([W,K,j,X]);let ae=T[L],he=t()*.06,_e=[o[0]*ae+he,o[1]*ae,o[2]*ae-he*.5],Re=(p===0?.25+t()*.4:.06*t())*c,Xe=_e.map((oe,We)=>xn(oe,a[We],Re)),qe=_e.map((oe,We)=>xn(oe*(p===0?.85:.7),l[We],e?p===0?.35:.85:p===0?.1:.45)),He=Math.hypot(S.x-R.x,S.z-R.z),te=d[L]/3.2,q=te+He/3.2,le=-g.yTop/3.2,Le=-k/3.2;r.quad([W,K,j,X],[Fi(Xe[0],Xe[1],Xe[2]),Fi(Xe[0],Xe[1],Xe[2]),Fi(qe[0],qe[1],qe[2]),Fi(qe[0],qe[1],qe[2])],[[te,le],[q,le],[q,Le],[te,Le]])}for(let L=0;L<i;L++){let R=m[L],S=m[(L+1)%i],w=Fi(o[0]*.7,o[1]*.7,o[2]*.7),A=Fi(l[0],l[1],l[2]);r.quad([R[1],S[0],S[3],R[2]],[w,w,A,A],[[0,0],[.3,0],[.3,1],[0,1]])}});let v=n.map(g=>[g.x*.58,-12,g.z*.58]),b=Fi(.2,.22,.28);for(let g=0;g<i;g++){let p=v[g],m=v[(g+1)%i];r.tri(p,m,[0,-17,0],b,b,b,[0,0],[0,0],[0,0])}return r.build()}function Gx(s,e=!1){let t=on(9),n=s.poly,i=n.length,r=Tf(n),o=new Io,a=e?[1,.97,.9]:[.84,.8,.72],l=[.45,.56,.25],c=[];for(let h=0;h<i;h++){let u=.28+t()*.6,d=.03+t()*.09,f=(p,m)=>[n[h].x-r[h].x*p,m,n[h].z-r[h].z*p],v=Mt(.5+.5*Math.sin(h*.61+1.7)*Math.cos(h*.23)+(t()-.5)*.5,0,1),b=.9+t()*.16,g=a.map((p,m)=>xn(p*b,l[m],v*(e?.2:.75)));c.push({inner:f(u,.012),crest:f(u*.42,d),outer:f(0,0),c:g})}for(let h=0;h<i;h++){let u=c[h],d=c[(h+1)%i],f=(v,b)=>Fi(v[0]*b,v[1]*b,v[2]*b);o.quad([u.inner,d.inner,d.crest,u.crest],[f(u.c,.95),f(d.c,.95),f(d.c,1.06),f(u.c,1.06)],[[0,0],[0,0],[0,0],[0,0]]),o.quad([u.crest,d.crest,d.outer,u.outer],[f(u.c,1.06),f(d.c,1.06),f(d.c,.88),f(u.c,.88)],[[0,0],[0,0],[0,0],[0,0]])}return o.build()}var Wx=()=>ot.myth?"mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), smoothstep(-30.0, 20.0, vHazeZ))":"mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), smoothstep(-30.0, 20.0, vHazeZ))";function jl(s,e,t,n,i,r=!1){s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <project_vertex>",`#include <project_vertex>
  vec4 hazeW = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
  vHazeZ = hazeW.z;
  vHazeY = `+(r?"transformed.y;":"hazeW.y;")),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <fog_fragment>",["float hazeF = max(smoothstep(fogNear, fogFar, vFogDepth), smoothstep("+t.toFixed(2)+", "+n.toFixed(2)+", vHazeY) * "+i.toFixed(2)+");","gl_FragColor.rgb = mix(gl_FragColor.rgb, "+Wx()+", 1.0 - (1.0 - "+e.toFixed(2)+") * (1.0 - hazeF));"].join(`
`))};let o=ot.myth;return s.customProgramCacheKey=()=>`haze${e}_${t}_${n}_${i}_${r}_${o}`,s}function Ql(s){let e=on(s),t=new go(1,1),n=t.getAttribute("position"),i=new Map;for(let r=0;r<n.count;r++){let o=`${n.getX(r).toFixed(3)},${n.getY(r).toFixed(3)},${n.getZ(r).toFixed(3)}`,a=i.get(o);a===void 0&&(a=.8+e()*.38,i.set(o,a)),n.setXYZ(r,n.getX(r)*a,n.getY(r)*a,n.getZ(r)*a)}return t.computeVertexNormals(),t}function Xx(s){let e=on(61),t=s.poly,n=t.length,i=new Io,r=[.97,.92,.82],o=[.16,.14,.23],a=11,l=.05,c=u=>u>-5?1-.005*-u:.975-(-u-5)/8*.395,h=(u,d,f)=>{let v=Math.min(1,-d/a),b=r.map((g,p)=>xn(g*u,o[p],Math.pow(v,1.4)*.85)*f);return Fi(b[0],b[1],b[2])};for(let u=0;u<n;){let d=e()<.55?1:2,f=t[u],v=t[(u+d)%n],b=ec(f,v),g=Math.hypot(v.x-f.x,v.z-f.z),p=l/g,m=1-l/g,x=-.03-e()*.05,y=0;for(;x>-a;){let E=.8+e()*.7,T=Math.max(-a,x-E),L=y===0?e()*.06:.08+e()*.32+Math.min(.2,y*.02),R=.85+e()*.2,S=(z,W,K)=>{let j=c(W),X=(f.x+(v.x-f.x)*z)*j+b.x*K,ae=(f.z+(v.z-f.z)*z)*j+b.z*K;return[X,W,ae]},w=x-l,A=T+l,k=[S(p,w,L),S(m,w,L),S(m,A,L),S(p,A,L)];i.quad(k,[h(R,w,1),h(R,w,1),h(R,A,1),h(R,A,1)],[[0,0],[g/3,0],[g/3,E/3],[0,E/3]]);let C=[S(p,w,0),S(m,w,0),S(m,w,L),S(p,w,L)];i.quad(C,[h(R,w,1.12),h(R,w,1.12),h(R,w,1.12),h(R,w,1.12)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([S(p,w,0),S(p,w,L),S(p,A,L),S(p,A,0)],[h(R,w,.7),h(R,w,.7),h(R,A,.7),h(R,A,.7)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([S(m,w,L),S(m,w,0),S(m,A,0),S(m,A,L)],[h(R,w,.7),h(R,w,.7),h(R,A,.7),h(R,A,.7)],[[0,0],[0,0],[0,0],[0,0]]),x=T,y++}u+=d}return i.build()}function qx(s,e,t,n,i,r){let o=on(500+t),a=e.r*(1.7+o()*.4),l=new It(e.r*.9,e.r*.98,a,48,4),c=l.getAttribute("position");for(let f=0;f<c.count;f++){let v=c.getX(f),b=c.getY(f),g=c.getZ(f),p=Math.atan2(g,v);if(Math.hypot(v,g)<1e-4)continue;let x=1-.05*Math.pow(.5+.5*Math.cos(p*24),3),y=b;b>a/2-.001&&(y=b-(.5+.5*Math.sin(p*3+t))*e.r*.35-o()*e.r*.05),c.setXYZ(f,v*x,y,g*x)}l.computeVertexNormals(),l.translate(0,a/2,0),i(l);let h=i(new Qt({map:n,color:15920352})),u=new Ze(l,h);u.castShadow=!0,u.receiveShadow=!0,u.position.set(e.pos.x,0,e.pos.z),u.rotation.y=o()*6,s.add(u);let d=new Ze(i(new It(e.r*1.08,e.r*1.08,.18,32).translate(0,.09,0)),h);d.position.copy(u.position),d.receiveShadow=!0,d.castShadow=!0,s.add(d),r.push({x:e.pos.x,z:e.pos.z,mat:h,k:0})}function tc(s,e,t){let n=new Kt;s.add(n);let i=[],r=A=>(i.push(A),A);s.background=new Qe(Sf()),s.fog=new to(Sf(),Ox,Bx);let o=ot.myth?new ar(10791124,8019008,1.3):new ar(13624063,9072210,1.7);n.add(o);let a=ot.myth?new lr(16765594,4):new lr(16773590,2.7);ot.myth?a.position.set(-15,8,7):a.position.set(-9,17,4),a.target.position.set(0,0,0),a.castShadow=!0,a.shadow.mapSize.set(t.shadowSize,t.shadowSize);let l=a.shadow.camera;l.left=-13.5,l.right=13.5,l.top=13.5,l.bottom=-13.5,l.near=4,l.far=48,ot.myth&&(l.left=-16,l.right=16,l.top=16,l.bottom=-16,l.far=60),a.shadow.bias=-4e-4,a.shadow.normalBias=.04,n.add(a,a.target);let c=r(ot.myth?_f(e,t.groundTexSize):Nh(e,t.groundTexSize)),h=r(mf()),u=r(new Qt({map:c})),d=null,f=r(new Qt({vertexColors:!0,map:h,side:gn,emissive:ot.myth?1381148:3946805})),v=r(new Qt({vertexColors:!0,side:gn,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),b=new Ze(r(Hx(e)),u);b.receiveShadow=!0,n.add(b);let g=new Ze(r(Vx(e,ot.myth)),f);if(ot.myth){let A=new Ze(r(Xx(e)),r(new Qt({vertexColors:!0})));A.receiveShadow=!0,n.add(A)}n.add(g);let p=new Ze(r(Gx(e,ot.myth)),v);p.receiveShadow=!0,n.add(p);{let A=on(13),k=e.poly,C=k.length,z=Tf(k),W=70,K=r(new ii(.09,.34,5).translate(0,.17,0)),j=r(new Qt({flatShading:!0})),X=new Ln(K,j,W),ae=new wt,he=new Wn,_e=new O,Re=new O,Xe=new Qe,qe=new O(0,1,0);for(let He=0;He<W;He++){let te=Math.floor(A()*C),q=.15+A()*1.1;Re.set(k[te].x-z[te].x*q,.01,k[te].z-z[te].z*q);let le=.55+A()*.6;_e.set(le,le*(.7+A()*.7),le),he.setFromAxisAngle(qe,A()*6),ae.compose(Re,he,_e),X.setMatrixAt(He,ae);let Le=.75+A()*.5;Xe.setRGB(.4*Le,.55*Le,.2*Le,Wt),X.setColorAt(He,Xe)}X.receiveShadow=!0,n.add(X)}let m=[],x=new Qe(16767392),y=ot.myth?r(bf()):null;e.rocks.forEach((A,k)=>{if(y){qx(n,A,k,y,r,m);return}let C=on(100+k),z=new Kt,W=r(new Qt({map:h,color:14867666,flatShading:!0}));m.push({x:A.pos.x,z:A.pos.z,mat:W,k:0});let K=r(new Qt({color:7311164,flatShading:!0})),j=r(Ql(200+k)),X=new Ze(j,W);X.scale.set(A.r*1,A.r*1.05,A.r*.95),X.position.y=A.r*.62,X.rotation.y=C()*6,X.castShadow=!0,X.receiveShadow=!0,z.add(X);let ae=new Ze(j,K);ae.scale.set(A.r*.72,A.r*.2,A.r*.7),ae.position.y=A.r*1.5,ae.rotation.y=C()*6,ae.castShadow=!0,z.add(ae);for(let he=0;he<4;he++){let _e=he/4*Math.PI*2+C(),Re=A.r*(.85+C()*.5),Xe=new Ze(r(Ql(300+k*10+he)),W),qe=A.r*(.22+C()*.2);Xe.scale.set(qe,qe*.8,qe),Xe.position.set(Math.cos(_e)*Re,qe*.45,Math.sin(_e)*Re),Xe.rotation.y=C()*6,Xe.castShadow=!0,Xe.receiveShadow=!0,z.add(Xe)}z.position.set(A.pos.x,0,A.pos.z),n.add(z)});{let A=r(new It(.8,1,1,6,1).translate(0,.5,0)),k=new It(1,.7,1,6,3).translate(0,-.5,0);{let oe=on(902),We=k.getAttribute("position");for(let dt=0;dt<We.count;dt++){let N=We.getY(dt);if(N<-.05&&N>-.95){let ht=.82+oe()*.36;We.setXYZ(dt,We.getX(dt)*ht,N,We.getZ(dt)*ht)}}k.computeVertexNormals()}r(k);let C=r(Ql(901)),z=on(78),W=new wt,K=new Wn,j=new O,X=new O,ae=new O(0,1,0),he=new Qe;for(let oe of[0,1,2]){let We=Ef.pillars.filter((ge,gt)=>ge.tier===oe&&(!ot.myth||gt%2===0)),dt=We[0].haze,N=r(jl(new Qt({map:h,flatShading:!0,color:ot.myth?6972536:13683391}),dt,oe===0?-.15:-4,oe===0?-.95:-17,oe===0?1:.92,oe===0)),ht=r(jl(new Qt({flatShading:!0,color:ot.myth?4608570:6982202}),dt,-4,-17,.92)),Ce=new Ln(oe===0?k:A,N,We.length),De=new Ln(C,ht,We.length);We.forEach((ge,gt)=>{if(K.setFromAxisAngle(ae,z()*3),ge.len>0)X.set(ge.x,ge.top,ge.z),j.set(ge.w,ge.len,ge.w);else{let nt=wf-22;X.set(ge.x,nt,ge.z),j.set(ge.w,ge.top-nt,ge.w)}W.compose(X,K,j),Ce.setMatrixAt(gt,W);let Pe=.82+z()*.3;Ce.setColorAt(gt,he.setRGB(Pe,Pe*.98,Pe*.95,Wt)),X.set(ge.x,ge.top,ge.z),j.set(ge.w*.92,ge.capH,ge.w*.92),W.compose(X,K,j),De.setMatrixAt(gt,W)}),Ce.frustumCulled=!1,De.frustumCulled=!1,n.add(Ce,De)}let _e=Ef.islets,Re=_e[0].haze,Xe=r(Ql(950)),qe=r(new ii(1,1.9,7).rotateX(Math.PI).translate(0,-.95,0)),He=r(jl(new Qt({color:9077626,flatShading:!0}),Re,-6,-17,.9)),te=r(jl(new Qt({color:6982202,flatShading:!0}),Re,-6,-17,.9)),q=new Ln(qe,He,_e.length),le=new Ln(Xe,He,_e.length),Le=new Ln(Xe,te,_e.length);_e.forEach((oe,We)=>{K.setFromAxisAngle(ae,z()*6),X.set(oe.x,oe.y,oe.z),j.set(oe.s,oe.s*.3,oe.s),W.compose(X,K,j),le.setMatrixAt(We,W),X.set(oe.x,oe.y+oe.s*.12,oe.z),j.set(oe.s*.82,oe.s*.16,oe.s*.82),W.compose(X,K,j),Le.setMatrixAt(We,W),X.set(oe.x,oe.y-oe.s*.05,oe.z),j.set(oe.s*.95,oe.s,oe.s*.95),W.compose(X,K,j),q.setMatrixAt(We,W)});for(let oe of[q,le,Le])oe.frustumCulled=!1,n.add(oe)}let E=r(gf());E.repeat.set(2.4,2.4);let T=[],L=new Ze(r(new wn(400,400).rotateX(-Math.PI/2)),r(new nn({fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:ot.myth?"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), t); gl_FragColor = vec4(c, 1.0); }":"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), t); gl_FragColor = vec4(c, 1.0); }"})));L.position.y=wf,n.add(L),[[-14,.12]].forEach(([A,k])=>{let C=r(new Jt({map:E,transparent:!0,opacity:ot.myth?.07:k,depthWrite:!1,color:ot.myth?6973088:13229298})),z=new Ze(r(new wn(260,260).rotateX(-Math.PI/2)),C);z.position.y=A,z.renderOrder=-5,n.add(z),T.push(z)});let R=r(vf()),S=[];{let A=on(55);for(let k=0;k<(ot.myth?0:12);k++){let C=r(new er({map:R,transparent:!0,opacity:.12+A()*.1,depthWrite:!1,color:14017782})),z=new io(C),W=A()*Math.PI*2,K=15+A()*28;z.position.set(Math.cos(W)*K,-7-A()*9,Math.sin(W)*K);let j=14+A()*16;z.scale.set(j,j*.55,1),n.add(z),S.push(z)}}let w=0;return{hitRock(A,k){let C=m[0],z=1/0;for(let W of m){let K=(W.x-A)**2+(W.z-k)**2;K<z&&(z=K,C=W)}C&&(C.k=1)},setVariant(A){if(ot.myth)return;let k=A==="v2"?d??(d=r(Nh(e,t.groundTexSize,!0))):c;u.map!==k&&(u.map=k,u.needsUpdate=!0)},update(A){w+=A;for(let k of m)k.k<=0||(k.k=Math.max(0,k.k-A/.35),k.mat.emissive.copy(x).multiplyScalar(.75*k.k*k.k));E.offset.set(w*.004,w*.002),T[T.length-1].position.x=Math.sin(w*.05)*4;for(let k=0;k<S.length;k++)S[k].position.x+=A*(.25+k%3*.12),S[k].position.x>48&&(S[k].position.x=-48)},root:n,dispose(){for(let A of i)A.dispose();n.removeFromParent()}}}var Yx=new Qe(16777215),$x=1.32,Kx=1.18,nc=1.55,Zx=.55,ic={0:{ring:3729663,armor:15134194,trim:2854822,cloth:3126728,skin:15122330,hair:16054008,dark:2765888,glow:5894399},1:{ring:16730685,armor:10234406,trim:4855060,cloth:8003356,skin:3811880,hair:8003356,dark:2824986,glow:16734780},2:{ring:16751150,armor:12740124,trim:5911572,cloth:9062932,skin:9067068,hair:3810322,dark:3023382,glow:16754746}},zh=16730685,Af=2054758;function Rf(s){return ot.myth&&s!==0?zh:ic[s].ring}function Cf(s){return ot.myth&&s!==0?ic[1].glow:ic[s].glow}var Po=class{constructor(e,t,n="default"){this.root=new Kt;this.ground=new Kt;this.pivot=new Kt;this.rig=new Kt;this.wpn=new Kt;this.legL=new Kt;this.legR=new Kt;this.cape=null;this.tail=null;this.halo=null;this.rim={uRimK:{value:0},uRimC:{value:new Qe}};this.identityMat=null;this.mats=[];this.ringMats=[];this.shadowMeshes=[];this.phase=0;this.lean=0;this.side=0;this.raise=0;this.crouch=0;this.lunge=0;this.bob=0;this.castT=99;this.castSkill=null;this.dustT=0;this.wasShadow=!0;this.pulseT=0;this.prevState="idle";this.weaponParts=[];this.xrayMat=null;this.xray=[];this.xrayOn=!1;this.fromLedge=!1;this.dropReason=null;this.ledgeEdge=null;this.shieldPivot=null;this.shieldMesh=null;this.shieldRest={x:0,y:0,z:0,rz:0};this.shieldMats=[];this.blockT=99;this.recoilT=99;this.meleeT=99;this.meleeStep=1;this._gc=null;this.variant=t,this.look=n;let i=ic[n!=="default"&&t===2?1:t];if(this.palette=i,this.rim.uRimC.value.setHex(i.ring),n!=="default"){this.buildMyth(e,n);return}let r=R=>{let S=new Qt({color:R});return S.stencilWrite=!0,S.stencilRef=1,S.stencilFunc=Zs,S.stencilZPass=Wl,S.onBeforeCompile=w=>{w.uniforms.uRimK=this.rim.uRimK,w.uniforms.uRimC=this.rim.uRimC,w.fragmentShader=w.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},S.customProgramCacheKey=()=>"fighter-rim",this.mats.push(S),S},o=r(i.armor),a=r(i.trim),l=r(i.cloth),c=r(i.skin),h=r(i.hair),u=r(i.dark);this.glowMat=new Jt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let d=(R,S,w,A,k,C,z=!0)=>{let W=new Ze(S,w);return W.position.set(A,k,C),W.castShadow=z,z&&this.shadowMeshes.push(W),R.add(W),W};for(let[R,S]of[[this.legL,-.13],[this.legR,.13]])R.position.set(0,.86,S),d(R,new It(.085,.065,.66,8),u,0,-.33,0),d(R,new Vt(.26,.12,.15),a,.05,-.74,0),this.rig.add(R);d(this.rig,new nr(.2,.36,4,10),o,0,1.2,0).scale.set(.8,1,1.25),d(this.rig,new It(.215,.215,.09,12),a,0,.96,0).scale.set(.82,1,1.28);for(let R of[-.27,.27])d(this.rig,new En(.14,10,8),a,0,1.46,R).scale.set(.9,.7,1);if(d(this.rig,new En(.17,14,12),c,.03,1.66,0),t===0){d(this.rig,new En(.2,14,12),h,-.03,1.7,0).scale.set(1,.92,1.04);let S=d(this.rig,new ii(.1,.45,8),h,-.27,1.55,0);S.rotation.z=Math.PI/2+.5,this.tail=S,d(this.rig,new Vt(.08,.06,.26),r(2808046),.14,1.67,0,!1)}else{d(this.rig,new En(.22,14,12),l,-.03,1.69,0).scale.set(1.05,.95,1.02);let S=d(this.rig,new ii(.14,.4,8),l,-.25,1.6,0);S.rotation.z=Math.PI/2+.7,d(this.rig,new En(.12,10,8),u,.1,1.64,0,!1).scale.set(.8,1,1.15),d(this.rig,new Vt(.06,.04,.16),this.glowMat,.17,1.66,0,!1)}let v=new Kt;v.position.set(-.17,1.5,0);let b=new It(.22,.4,.95,4,1).rotateY(Math.PI/4);d(v,b,t===0?r(2340812):l,0,-.45,0).scale.set(.12,1,1),this.rig.add(v),this.cape=v,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let p=[];for(let R of[-.26,.26]){let S=d(this.wpn,new It(.06,.05,.44,8),o,.17,-.05,R*.7);S.rotation.z=-Math.PI/2+.25,S.rotation.x=R>0?-.35:.35,p.push(S)}if(this.glowTip=new Ze(new En(.1,10,8),this.glowMat),t===0)d(this.wpn,new Vt(.95,.13,.11),u,.62,-.08,.05),d(this.wpn,new Vt(.3,.2,.09),a,.25,-.12,.05),d(this.wpn,new It(.05,.05,.5,8),u,1.25,-.08,.05).rotation.z=Math.PI/2,d(this.wpn,new Vt(.2,.05,.05),r(5894399),.72,0,.05,!1),this.glowTip.position.set(1.52,-.08,.05);else if(t===1){d(this.wpn,new It(.035,.035,1.9,6),r(5913380),.65,-.07,.05).rotation.z=Math.PI/2;let R=d(this.wpn,new ii(.1,.5,4),r(2763312),1.82,-.07,.05);R.rotation.z=-Math.PI/2,d(this.wpn,new Yi(.08,.025,6,10),a,1.55,-.07,.05).rotation.y=Math.PI/2,this.glowTip.position.set(2.1,-.07,.05)}else d(this.wpn,new It(.045,.045,1.4,6),r(4862496),.5,-.07,.05).rotation.z=Math.PI/2,d(this.wpn,new Vt(.38,.34,.5),r(3747882),1.25,-.07,.05),d(this.wpn,new Vt(.42,.1,.54),o,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);this.wpn.add(this.glowTip);for(let R of this.wpn.children)p.includes(R)||this.weaponParts.push(R);let m=new Jt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),x=new Jt({color:i.ring,transparent:!0,opacity:.2,depthWrite:!1,fog:!1});this.ringMats.push(m,x);let y=new Ze(new di(.6,.7,40).rotateX(-Math.PI/2),m),E=new Ze(new di(.7,.86,40).rotateX(-Math.PI/2),x);this.halo=E;let T=new jt;T.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),T.setIndex([0,2,1]),T.computeVertexNormals();let L=new Ze(T,new Jt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,side:gn,fog:!1}));this.ringMats.push(L.material);for(let R of[y,E,L])R.renderOrder=6,this.ground.add(R);e.add(this.root,this.ground)}buildMyth(e,t){let n=this.variant===0,i=this.palette,r=n?i.ring:zh;this.rim.uRimC.value.setHex(r);let o=C=>(C.stencilWrite=!0,C.stencilRef=1,C.stencilFunc=Zs,C.stencilZPass=Wl,C.onBeforeCompile=z=>{z.uniforms.uRimK=this.rim.uRimK,z.uniforms.uRimC=this.rim.uRimC,z.fragmentShader=z.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},C.customProgramCacheKey=()=>"fighter-rim",this.mats.push(C),C),a=C=>o(new Qt({color:C})),l=(C,z,W)=>o(new $i({color:C,metalness:z,roughness:W})),c=n?l(13144383,.85,.32):l(4935512,.75,.45),h=n?l(8411178,.8,.45):l(2829619,.7,.55),u=new Jt({color:n?1696754:16720916,fog:!1});this.identityMat=u;let d=a(n?38068:3025968),f=a(n?14264706:7228474),v=a(n?5913894:2366487),b=a(n?Af:13904416),g=a(n?Af:2762281),p=a(n?8018490:3812386);this.glowMat=new Jt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let m=(C,z,W,K,j,X,ae=!0)=>{let he=new Ze(z,W);return he.position.set(K,j,X),he.castShadow=ae,ae&&this.shadowMeshes.push(he),C.add(he),he};for(let[C,z]of[[this.legL,-.13],[this.legR,.13]])C.position.set(0,.86,z),m(C,new It(.085,.07,.66,8),n?f:h,0,-.33,0),m(C,new It(.075,.08,.3,8),c,.01,-.5,0),m(C,new Vt(.26,.12,.15),v,.05,-.74,0),this.rig.add(C);m(this.rig,new nr(.2,.36,4,10),c,0,1.2,0).scale.set(.82,1,1.25),m(this.rig,new It(.24,.3,.28,10),d,0,.94,0).scale.set(.85,1,1.2),m(this.rig,new It(.225,.225,.09,12),u,0,1.04,0,!1).scale.set(.84,1,1.28);for(let C of[-.27,.27])m(this.rig,new En(.14,10,8),n?u:a(13114900),0,1.46,C).scale.set(.95,.7,1);m(this.rig,new En(.16,12,10),f,.04,1.65,0),m(this.rig,new En(.2,14,12,0,Math.PI*2,0,Math.PI*.62),n?l(1489104,.5,.35):c,-.01,1.66,0).scale.set(1.05,1,1.05),m(this.rig,new Vt(.05,.14,.05),c,.19,1.64,0,!1),m(this.rig,new Yi(.2,.055,6,14,Math.PI),n?b:u,-.01,1.78,0).scale.set(1.1,.9,.7);let y=new Kt;y.position.set(-.18,1.5,0),m(y,new It(n?.24:.2,n?.46:.32,n?1.05:.7,4,1).rotateY(Math.PI/4),g,0,n?-.5:-.35,0).scale.set(.12,1,1),this.rig.add(y),this.cape=y,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let T=[];for(let C of[-.26,.26]){let z=m(this.wpn,new It(.06,.05,.44,8),n?d:h,.17,-.05,C*.7);z.rotation.z=-Math.PI/2+.25,z.rotation.x=C>0?-.35:.35,T.push(z)}if(this.glowTip=new Ze(new En(.1,10,8),this.glowMat),t==="myth-archer"){let C=new Kt;C.name="bow",C.position.set(.5,-.02,.05);let z=m(C,new Yi(.55,.03,6,20,Math.PI*.9),p,0,0,0);z.rotation.z=-Math.PI*.45,m(C,new It(.008,.008,1.08,4),a(14209216),.55*Math.cos(Math.PI*.45),0,0,!1),m(C,new It(.018,.018,.8,5),p,.25,0,0,!1).rotation.z=Math.PI/2,this.wpn.add(C),this.glowTip.position.set(.95,-.02,.05)}else if(this.variant===2&&t==="myth")m(this.wpn,new It(.045,.045,1.4,6),p,.5,-.07,.05).rotation.z=Math.PI/2,m(this.wpn,new Vt(.38,.34,.5),h,1.25,-.07,.05),m(this.wpn,new Vt(.42,.1,.54),b,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);else{let C=t==="myth-shield"?1.5:2.2,z=m(this.wpn,new It(.03,.03,C,6),p,C/2-.35,-.07,.05);z.rotation.z=Math.PI/2,z.name="spear";let W=m(this.wpn,new ii(.075,.34,4),n?c:h,C-.18,-.07,.05);W.rotation.z=-Math.PI/2,this.glowTip.position.set(C+.02,-.07,.05)}this.wpn.add(this.glowTip);for(let C of this.wpn.children)T.includes(C)||this.weaponParts.push(C);if(n||t==="myth-shield"){let C=new Kt;if(C.name=n?"round-shield":"tower-shield",n)C.position.set(.3,1.18,-.2),C.rotation.z=.55,m(C,new It(.5,.5,.05,28).rotateZ(Math.PI/2),c,0,0,0),m(C,new Yi(.5,.05,6,28).rotateY(Math.PI/2),u,0,0,0,!1),m(C,new En(.1,10,8),u,.04,0,0,!1);else{C.position.set(.36,1.02,-.1),C.rotation.z=.25;let W=l(2829619,.7,.55),K=l(4935512,.75,.45),j=a(13904416);this.shieldMats.push(W,K,j),m(C,new Vt(.07,1.25,.82),W,0,0,0),m(C,new Vt(.08,1.31,.06),K,0,0,.41,!1),m(C,new Vt(.08,1.31,.06),K,0,0,-.41,!1),m(C,new Vt(.085,.86,.12),j,0,0,0,!1)}let z=new Kt;z.add(C),this.rig.add(z),this.shieldPivot=z,this.shieldMesh=C,this.shieldRest={x:C.position.x,y:C.position.y,z:C.position.z,rz:C.rotation.z},this.weaponParts.push(C)}let L=new Jt({color:r,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),R=new Jt({color:r,transparent:!0,opacity:.38,depthWrite:!1,fog:!1});this.ringMats.push(L,R);let S=new Ze(new di(.55,.75,40).rotateX(-Math.PI/2),L),w=new Ze(new di(.75,.95,40).rotateX(-Math.PI/2),R);this.halo=w;let A=new jt;A.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),A.setIndex([0,2,1]),A.computeVertexNormals();let k=new Ze(A,new Jt({color:r,transparent:!0,opacity:.95,depthWrite:!1,side:gn,fog:!1}));this.ringMats.push(k.material);for(let C of[S,w,k])C.renderOrder=6,this.ground.add(C);e.add(this.root,this.ground)}buildXray(){let e=new Jt({color:this.look!=="default"&&this.variant!==0?zh:this.palette.ring,transparent:!0,opacity:Zx,depthFunc:cr,depthWrite:!1,fog:!1,stencilWrite:!0,stencilRef:1,stencilFunc:dh,stencilFail:ei,stencilZFail:ei,stencilZPass:ei});this.xrayMat=e;let t=[];this.root.traverse(n=>{let i=n;i.isMesh&&!this.weaponParts.includes(i)&&t.push(i)});for(let n of t){let i=new Ze(n.geometry,e);i.visible=!1,i.renderOrder=30,n.add(i),this.xray.push(i)}}onMelee(e){this.meleeT=0,this.meleeStep=e}onShieldBlock(){this.blockT=0}onRecoil(){this.recoilT=0}onLedgeDrop(e){this.fromLedge=!0,this.dropReason=e}update(e,t,n=!1){let i=this.palette,r=Math.hypot(e.moveVel.x,e.moveVel.z),o=e.state==="falling",a=e.state==="dead",l=e.state==="knocked",c=e.state==="ledge",h=e.state==="climb";c?(this.fromLedge=!0,this.dropReason=null):!o&&!l&&!a&&!h&&(this.fromLedge=!1),h&&e.stateT>=Et.climb*.999&&(this.fromLedge=!1);let u=h?mi(0,Et.climb,e.stateT):0;this.root.position.set(e.pos.x,e.y,e.pos.z);let d=n&&e.state==="windup"&&e.windup?Math.atan2(e.windup.dir.z,e.windup.dir.x):e.facing;this.root.rotation.y=-d,this.ground.position.set(e.pos.x,.035,e.pos.z),this.ground.rotation.y=-d,this.ground.scale.setScalar(n?e.radius/.6:Kx),this.halo&&this.halo.scale.setScalar(n?1.3:1),this.tail&&(this.tail.scale.setScalar(n?.55:1),this.tail.position.x=n?-.22:-.27),this.rim.uRimK.value=n?this.look!=="default"?this.variant===0?.5:.4:.9:0,this.castT+=t;let f=1;a&&(f=1-mi(1,1.5,e.stateT)),e.y<-16&&(f=0),this.root.visible=f>.01,this.ground.visible=!o&&!a&&e.y>-.2&&!c&&!(h&&u<.6)&&!(l&&this.fromLedge),this.root.scale.setScalar(Math.max(f,.001)*$x);let v=!o&&e.y>-.4&&!c&&!h&&!this.fromLedge;if(v!==this.wasShadow){for(let q of this.shadowMeshes)q.castShadow=v;this.wasShadow=v}let b=0,g=0,p=.05,m=0,x=0,y=0,E=e.windup,T=E?Mt(E.t/Math.max(E.dur,.01),0,1):0,L=this.castT<.3?this.castT/.3:1;if(e.state==="windup"&&E&&(y=n?Math.max(.45,T):T,E.skill==="enemyHeavy"?(p=xn(.05,2,mi(0,.85,T)),b=xn(0,.28,T),m=.04):E.skill==="enemyBasic"?(p=xn(.05,.35,T),x=-.16*T,b=.1*T):E.skill==="control"?(p=xn(.05,.22,T),x=-.1*T,b=.12*T,m=.05*T):(p=.3,x=-.12,b=.18)),this.castSkill&&this.castT<.45){let q=1-L;this.castSkill==="enemyHeavy"?(p=xn(-.45,2,q*q),b=xn(-.35,.1,q),x=.28*(1-q)):(p=xn(.05,.4,q),x=.42*(1-q),b=xn(-.3,0,q))}e.state==="recover"&&(b=Math.max(b,-.12)),this.blockT+=t,this.recoilT+=t,e.state==="hitstun"&&(this.recoilT<.35?(b=-.75,p=.9,m=0,x=-.25):(b=-.3,p=-.35,m=.05)),(e.state==="charge"||e.state==="windup"&&E?.skill==="charge")&&(b=.5,m=.12,x=.15,p=-.2),e.state==="guard"&&(p=-.3,b=.06,m=.06);let R=e.state==="windup"&&E&&(E.skill==="melee1"||E.skill==="melee2"||E.skill==="melee3")?E.skill:null;(R==="melee1"||R==="melee2")&&(x=-.12*T,p=.05);let S=(e.breakT??0)>0;if(S&&(b=.18,p=-.5),e.state==="dash"&&(b=-.42,m=.1,x=.12,p=.2),l){let q=Math.hypot(e.knockVel.x,e.knockVel.z)||1,le=(e.knockVel.x*Math.cos(e.facing)+e.knockVel.z*Math.sin(e.facing))/q,Le=(-e.knockVel.x*Math.sin(e.facing)+e.knockVel.z*Math.cos(e.facing))/q,oe=.62*mi(0,.08,e.stateT);b=-oe*le,g=oe*Le,p=-.9,m=.06}let w=e.sinceShotT<.4?Math.exp(-e.sinceShotT*18):0;x-=w*.2,p+=w*.14,e.burstLeft>0&&(p=Math.max(p,.1),b=Math.max(b,.06));let A=n&&e.state==="windup"&&this.prevState!=="windup";this.prevState=e.state;let k=A?1:_r(e.state==="windup"||this.castT<.45||l?30:16,t);this.lean+=(b-this.lean)*k,this.side+=(g-this.side)*k,this.raise+=(p-this.raise)*k,this.crouch+=(m-this.crouch)*k,this.lunge+=(x-this.lunge)*k;let C=!o&&!a&&!l&&r>.15&&e.state!=="dash";C&&(this.phase+=t*(6+r*1.7));let z=C?Mt(r/5,.25,1)*.75:0,W=Math.sin(this.phase)*z,K=C?Math.abs(Math.sin(this.phase))*.05:0;this.bob+=(K-this.bob)*_r(20,t);let j=o?Math.sin(e.stateT*22)*.6:l?.55:e.state==="dash"?.9:0;if(this.legL.rotation.z=C?W:j,this.legR.rotation.z=C?-W:-j*(o?1:-.4),this.pivot.position.set(this.lunge,.9-this.crouch+this.bob,0),this.pivot.rotation.set(0,0,0),this.pivot.rotation.z=-this.lean,this.pivot.rotation.x=this.side,this.wpn.rotation.z=this.raise,this.wpn.position.x=.04+(w>0?-w*.12:0)+(e.state==="windup"&&E&&E.skill!=="enemyHeavy"?-.08*T:0),this.meleeT+=t,this.wpn.rotation.y=0,R==="melee3"&&(this.wpn.rotation.y=.9*T),this.meleeT<.2&&(this.meleeStep===3?this.wpn.rotation.y=xn(.9,-.9,Mt(this.meleeT/.14,0,1)):this.wpn.position.x+=.42*(1-Mt(this.meleeT/.18,0,1))),S&&(this.pivot.rotation.x+=Math.sin(this.pulseT*14)*.12,this.pivot.rotation.z+=Math.cos(this.pulseT*11)*.08),c){let q=mi(Et.protect,Et.hold,e.stateT),le=e.stateT;this.pivot.position.set(-.04+Math.sin(le*38)*.025*q,.9-nc,0),this.pivot.rotation.set(Math.sin(le*3.2)*.05,0,-.12),this.wpn.rotation.z=1.35+Math.sin(le*30)*.06*q,this.wpn.position.x=.04,this.legL.rotation.z=.12+Math.sin(le*5)*(.1+.25*q),this.legR.rotation.z=-.08+Math.sin(le*5+1.4)*(.1+.25*q)}else if(h){let q=Math.sin(u*Math.PI);this.pivot.position.set(.06*q,.9-nc*(1-u)+q*.22,0),this.pivot.rotation.set(0,0,-.5*q),this.wpn.rotation.z=xn(1.35,.05,u),this.legL.rotation.z=-.9*q,this.legR.rotation.z=-.7*q}else if(o&&this.fromLedge)this.pivot.position.y=.9-nc,this.dropReason==="timeout"?(this.pivot.rotation.set(e.stateT*1.2,0,e.stateT*.5),this.wpn.rotation.z=1.5,this.legL.rotation.z=.2,this.legR.rotation.z=-.2):this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(l&&this.fromLedge)this.pivot.position.y=.9-nc;else if(o)this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(a){let q=mi(0,.3,e.stateT);this.pivot.rotation.set(0,0,q*(Math.PI/2)),this.pivot.position.y=.9-q*.6,this.legL.rotation.z=q*.3,this.legR.rotation.z=q*-.2,this.wpn.rotation.z=-.4*q}if(this.shieldPivot&&this.shieldMesh){let q=e.shieldDir,le=e.state==="guard"&&e.shieldUp!==!1,Le=q?Math.atan2(q.z,q.x)-d:0,oe=this.shieldMesh;this.shieldPivot.rotation.y=q&&(le||this.look==="myth-shield")?-Le:0,le?(oe.position.set(.58,1.25,0),oe.rotation.z=.3):S?(oe.position.set(this.shieldRest.x+.12,.5,this.shieldRest.z-.12),oe.rotation.z=-1):e.state==="charge"&&this.variant===0?(oe.position.set(.42,1.15,0),oe.rotation.z=.2):(oe.position.set(this.shieldRest.x,this.shieldRest.y,this.shieldRest.z),oe.rotation.z=this.shieldRest.rz)}let X=c||h&&u<.8||this.fromLedge;for(let q of this.weaponParts)q.visible=!X;let ae=c||h;if(ae&&!this.xrayMat&&this.buildXray(),ae!==this.xrayOn){for(let q of this.xray)q.visible=ae;this.xrayOn=ae}if(this.cape){let q=Math.sin(this.phase*.9+1.3)*.06*Mt(r/5,0,1);this.cape.rotation.z=-(.12+Mt(r/6,0,1)*.42+(e.state==="dash"?.45:0)+q+(o?.7:0)),this.cape.rotation.x=Math.sin(this.phase*.5)*.04,c&&(this.cape.rotation.z=-.05,this.cape.rotation.x=Math.sin(e.stateT*3.2)*.06)}let he=Mt(e.hitFlashT*10,0,1),_e=y*.2,Re=this.glowColor(i.glow),Xe=c&&e.stateT<Et.protect?.22*(1-mi(Et.protect*.7,Et.protect,e.stateT)):(e.protectT??0)>0?.3:0,qe=(e.armorT??0)>0?.22+.12*Math.sin(this.pulseT*20):0;for(let q of this.mats)q.emissive.setRGB(he*.95+Re[0]*_e+Xe+qe,he*.95+Re[1]*_e+Xe*.9+qe*.35,he*.95+Re[2]*_e+Xe*.6+qe*.1);if(this.blockT<.15){let q=1.1*(1-this.blockT/.15);for(let le of this.shieldMats)le.emissive.setRGB(le.emissive.r+q,le.emissive.g+q,le.emissive.b+q)}let He=Mt(y+w*1.2+(this.castT<.25?.8:0),0,1);this.glowMat.opacity=.35+He*.65,this.glowTip.scale.setScalar(.7+He*1.5),this.glowMat.color.setHex(i.glow).lerp(Yx,He*.5),this.pulseT+=t;let te=e.state==="windup"?.7+.3*Math.sin(this.pulseT*30):1;if(this.ringMats[0].opacity=.95*te,e.state==="reviving")this.root.visible=!1,this.ground.visible=!1;else if((e.protectT??0)>0&&this.root.visible){let q=Math.floor(this.pulseT*12)%2===0;this.root.visible=q}}glowColor(e){if(!this._gc){let t=new Qe(e);this._gc=[t.r,t.g,t.b]}return this._gc}wantDust(e,t){return e.state!=="knocked"?(this.dustT=0,!1):(this.dustT-=t,this.dustT<=0?(this.dustT=.045,!0):!1)}tipWorld(e){return this.root.updateMatrixWorld(!0),this.glowTip.getWorldPosition(e)}dispose(){for(let e of[this.root,this.ground])e.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose()});for(let e of this.mats)e.dispose();this.glowMat.dispose(),this.xrayMat?.dispose(),this.identityMat?.dispose();for(let e of this.ringMats)e.dispose();this.root.removeFromParent(),this.ground.removeFromParent()}};var Jx=`
attribute vec4 aPosSize;
attribute vec4 aColor;
attribute vec2 aShape;
varying vec2 vUv;
varying vec4 vColor;
varying float vCrisp;
void main() {
  vUv = uv;
  vColor = aColor;
  vCrisp = aShape.y;
  vec4 mv = viewMatrix * vec4(aPosSize.xyz, 1.0);
  mv.xy += position.xy * vec2(aPosSize.w, aPosSize.w * aShape.x);
  gl_Position = projectionMatrix * mv;
}`,jx=`
varying vec2 vUv;
varying vec4 vColor;
varying float vCrisp;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float soft = pow(clamp(1.0 - d, 0.0, 1.0), 1.6);
  float crisp = 1.0 - smoothstep(0.82, 1.0, d);
  float a = mix(soft, crisp, vCrisp) * vColor.a;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor.rgb, a);
}`,Lo=class{constructor(e,t){this.n=0;this.cap=e,this.p=new Float32Array(e*3),this.v=new Float32Array(e*3),this.s=new Float32Array(e*4),this.c=new Float32Array(e*4),this.l=new Float32Array(e*4),this.fl=new Uint8Array(e);let n=new wn(1,1);this.geo=new bo,this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.geo.setAttribute("uv",n.getAttribute("uv")),this.aPosSize=new Ii(new Float32Array(e*4),4),this.aColor=new Ii(new Float32Array(e*4),4),this.aShape=new Ii(new Float32Array(e*2),2);for(let i of[this.aPosSize,this.aColor,this.aShape])i.setUsage(Xl);this.geo.setAttribute("aPosSize",this.aPosSize),this.geo.setAttribute("aColor",this.aColor),this.geo.setAttribute("aShape",this.aShape),this.geo.instanceCount=0,this.mat=new nn({vertexShader:Jx,fragmentShader:jx,transparent:!0,depthWrite:!1,blending:t?Ji:Ai,fog:!1}),this.mesh=new Ze(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:15}get count(){return this.n}spawn(e){if(this.n>=this.cap)return;let t=this.n++;this.p[t*3]=e.x,this.p[t*3+1]=e.y,this.p[t*3+2]=e.z,this.v[t*3]=e.vx??0,this.v[t*3+1]=e.vy??0,this.v[t*3+2]=e.vz??0,this.s[t*4]=e.size,this.s[t*4+1]=e.size1??e.size,this.s[t*4+2]=e.aspect??1,this.s[t*4+3]=e.crisp??0,this.c[t*4]=e.color[0],this.c[t*4+1]=e.color[1],this.c[t*4+2]=e.color[2],this.c[t*4+3]=e.alpha??1,this.l[t*4]=0,this.l[t*4+1]=e.life,this.l[t*4+2]=e.gravity??0,this.l[t*4+3]=e.drag??0,this.fl[t]=e.floor===!1?0:1}update(e){let t=0;for(;t<this.n;){let o=t*4,a=t*3;if(this.l[o]+=e,this.l[o]>=this.l[o+1]){this.remove(t);continue}let l=Math.exp(-this.l[o+3]*e);this.v[a]*=l,this.v[a+1]=this.v[a+1]*l-this.l[o+2]*e,this.v[a+2]*=l,this.p[a]+=this.v[a]*e,this.p[a+1]+=this.v[a+1]*e,this.p[a+2]+=this.v[a+2]*e,this.fl[t]&&this.p[a+1]<.03&&this.l[o+2]>0&&this.p[a+1]>-1&&(this.p[a+1]=.03,this.v[a+1]*=-.25,this.v[a]*=.6,this.v[a+2]*=.6),t++}let n=this.aPosSize.array,i=this.aColor.array,r=this.aShape.array;for(let o=0;o<this.n;o++){let a=this.l[o*4]/this.l[o*4+1];n[o*4]=this.p[o*3],n[o*4+1]=this.p[o*3+1],n[o*4+2]=this.p[o*3+2],n[o*4+3]=this.s[o*4]+(this.s[o*4+1]-this.s[o*4])*a,i[o*4]=this.c[o*4],i[o*4+1]=this.c[o*4+1],i[o*4+2]=this.c[o*4+2];let l=1-a;i[o*4+3]=this.c[o*4+3]*l*(a<.08?a/.08+.2:1),r[o*2]=this.s[o*4+2],r[o*2+1]=this.s[o*4+3]}this.aPosSize.needsUpdate=!0,this.aColor.needsUpdate=!0,this.aShape.needsUpdate=!0,this.geo.instanceCount=this.n}clear(){this.n=0,this.geo.instanceCount=0}remove(e){let t=--this.n;e!==t&&(this.p.copyWithin(e*3,t*3,t*3+3),this.v.copyWithin(e*3,t*3,t*3+3),this.s.copyWithin(e*4,t*4,t*4+4),this.c.copyWithin(e*4,t*4,t*4+4),this.l.copyWithin(e*4,t*4,t*4+4),this.fl[e]=this.fl[t])}dispose(){this.geo.dispose(),this.mat.dispose()}},Do=class{constructor(e,t){this.n=0;this.m=new wt;this.col=new Qe;this.X=new O;this.Y=new O;this.Z=new O;this.P=new O;this.view=new O(0,-1,-1).normalize();this.cap=e;let n=new Jt({map:t,transparent:!0,depthWrite:!1,blending:Ji,fog:!1});this.mesh=new Ln(new wn(1,1),n,e),this.mesh.instanceMatrix.setUsage(Xl),this.mesh.frustumCulled=!1,this.mesh.renderOrder=22,this.mesh.count=0,this.mesh.setColorAt(0,this.col.setRGB(1,1,1))}begin(){this.n=0}push(e,t,n,i,r,o){if(this.n>=this.cap||o<=.003)return;this.X.copy(t).normalize(),this.Y.crossVectors(this.X,this.view),this.Y.lengthSq()<1e-6&&this.Y.set(0,1,0),this.Y.normalize(),this.Z.crossVectors(this.X,this.Y).normalize(),this.P.copy(e).addScaledVector(this.X,-n/2),this.m.makeBasis(this.X.multiplyScalar(n),this.Y.multiplyScalar(i),this.Z),this.m.setPosition(this.P),this.mesh.setMatrixAt(this.n,this.m),this.col.setRGB(r[0],r[1],r[2],Wt).multiplyScalar(o);let a=this.mesh.instanceColor.array;a[this.n*3]=this.col.r,a[this.n*3+1]=this.col.g,a[this.n*3+2]=this.col.b,this.n++}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};var Vh=.05,If=`
varying vec2 vP;
void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Qx=`
uniform vec3 uColor;
uniform float uHalf;
uniform float uProgress;
uniform float uAlpha;
uniform float uTime;
uniform float uBase;
uniform float uEdge;
varying vec2 vP;
void main() {
  float r = length(vP);
  float ang = abs(atan(vP.y, vP.x));
  float aa = fwidth(r) * 1.2;
  float aaA = fwidth(ang) * 1.2 + 1e-4;
  float inside = (1.0 - smoothstep(1.0 - aa, 1.0, r)) * (1.0 - smoothstep(uHalf - aaA, uHalf, ang));
  float fillMask = 1.0 - smoothstep(uProgress - aa * 2.0, uProgress + aa * 2.0, r);
  float rimW = mix(5.0, 10.0, uEdge);
  float rim = smoothstep(1.0 - aa * rimW, 1.0 - aa * (rimW - 3.0), r) * (1.0 - smoothstep(1.0 - aa * 2.0, 1.0, r));
  float sideW = mix(6.0, 12.0, uEdge);
  float side = smoothstep(uHalf - aaA * sideW, uHalf - aaA * (sideW - 4.0), ang);
  float front = smoothstep(uProgress - aa * 6.0, uProgress, r) * (1.0 - smoothstep(uProgress, uProgress + aa * 2.0, r)) * step(uProgress, 0.995);
  // uEdge\uFF1D1\uFF1A\u5916\u7DE3\u8207\u5169\u5074\u6539\u6210\u4E0D\u900F\u660E\u7684\u5BE6\u7DDA\u4EAE\u908A\uFF08v4 \u5C3E\u6BB5\u9738\u9AD4\u3001\u6CE2\u6B21\u843D\u9EDE\uFF09\uFF1B0\uFF1D\u73FE\u884C
  float edge = uEdge * clamp(rim + side, 0.0, 1.0);
  float a = inside * (uBase + 0.46 * fillMask) + inside * (rim * 0.55 + side * 0.5 + front * 0.5) + inside * edge;
  vec3 col = mix(uColor, vec3(1.0), clamp(rim * 0.35 + side * 0.3 + front * 0.5, 0.0, 0.7));
  col = mix(col, vec3(1.0, 0.93, 0.62), edge * 0.85);
  a *= uAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(col, a);
}`,ey=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,ty=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uFill;
uniform float uSoft;
uniform float uBase;
varying vec2 vUv;
void main() {
  float v = abs(vUv.y - 0.5) * 2.0;
  float u = vUv.x;
  float edge = 1.0 - smoothstep(0.55, 1.0, v);
  float core = 1.0 - smoothstep(0.0, 0.45, v);
  float line = smoothstep(0.78, 0.9, v) * (1.0 - smoothstep(0.9, 1.0, v));
  float filled = 1.0 - smoothstep(uFill - 0.03, uFill + 0.03, u);
  float tailFade = mix(1.0, 1.0 - smoothstep(0.55, 1.0, u), uSoft);
  float a = (edge * (uBase + 0.4 * filled) + core * 0.28 * (0.4 + filled) + line * 0.55) * tailFade * uAlpha;
  if (a < 0.003) discard;
  vec3 col = mix(uColor, vec3(1.0), core * 0.35 + line * 0.2);
  gl_FragColor = vec4(col, a);
}`,ny=`
uniform vec3 uColor;
uniform float uProgress;
uniform float uAlpha;
varying vec2 vP;
void main() {
  // \u56FA\u5B9A\u5BEC\u5EA6\u7684\u5E73\u6ED1\uFF08\u4E0D\u7528 fwidth\uFF1A\u6A19\u8A18\u5728\u87A2\u5E55\u4E0A\u53EA\u6709\u5E7E\u5341\u50CF\u7D20\uFF0Cfwidth \u7684 L1 \u7BC4\u6578\u6703\u628A\u5713\u908A\u78E8\u6210\u83F1\u5F62\uFF09
  float r = length(vP);
  float inside = 1.0 - smoothstep(0.97, 1.0, r);
  float rim = smoothstep(0.8, 0.86, r) * inside;
  float fill = 1.0 - smoothstep(uProgress - 0.04, uProgress + 0.04, r);
  float core = 1.0 - smoothstep(0.16, 0.22, r);
  float a = (0.3 * inside + 0.4 * fill * inside + 0.5 * core + rim) * uAlpha;
  if (a < 0.003) discard;
  vec3 col = mix(uColor, vec3(1.0, 0.93, 0.8), rim * 0.35);
  gl_FragColor = vec4(col, min(a, 1.0));
}`,sc=class{constructor(e,t){this.items=[];this.used=0;let n=new wn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uHalf:{value:.8},uProgress:{value:1},uAlpha:{value:1},uTime:{value:0},uBase:{value:.16},uEdge:{value:0}},o=new nn({vertexShader:If,fragmentShader:Qx,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=.16,h=0){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e,Vh,t),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,i),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uHalf.value=r,u.u.uProgress.value=o,u.u.uAlpha.value=l,u.u.uBase.value=c,u.u.uEdge.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Hh=class{constructor(e,t){this.items=[];this.used=0;let n=new wn(1,1).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uAlpha:{value:1},uFill:{value:1},uSoft:{value:1},uBase:{value:.2}},o=new nn({vertexShader:ey,fragmentShader:ty,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=1,h=.2){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e+Math.cos(n)*i*.5,Vh,t+Math.sin(n)*i*.5),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,r),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uFill.value=o,u.u.uAlpha.value=l,u.u.uSoft.value=c,u.u.uBase.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},rc=class{constructor(e,t){this.items=[];this.used=0;let n=new wn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uProgress:{value:0},uAlpha:{value:1}},o=new nn({vertexShader:If,fragmentShader:ny,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o){if(this.used>=this.items.length)return;let a=this.items[this.used++];a.mesh.visible=!0,a.mesh.position.set(e,Vh,t),a.mesh.scale.set(n,1,n),a.u.uColor.value.set(r[0],r[1],r[2]),a.u.uProgress.value=i,a.u.uAlpha.value=o}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},oc=class{constructor(e){this.sectors=new sc(e,5),this.flashes=new sc(e,4),this.strips=new Hh(e,8)}};var Pf=2*Math.PI*15,iy="#ffe6a3",Lf="render-overlay-style",ac=class{constructor(e){this.root=e;this.bars=new Map;this.arrows=new Map;this.ledgeRings=new Map;this.breakMarks=new Map;this.clock=0;this.nums=[];this.w=852;this.h=393;if(e.style.pointerEvents="none",e.style.overflow="hidden",!document.getElementById(Lf)){let t=document.createElement("style");t.id=Lf,t.textContent=`
        .ro-abs{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
        .ro-bar{background:rgba(6,12,20,.78);border:1px solid rgba(0,0,0,.55);border-radius:3px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.45)}
        .ro-bar>div{position:absolute;left:0;top:0;bottom:0;display:block;transform-origin:0 50%}
        .ro-num{font:800 16px/1 "Segoe UI",system-ui,-apple-system,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.5);white-space:nowrap}
        .ro-arrow{width:0;height:0}
        .ro-ledge{width:0;height:0}
        .ro-ledge>svg{position:absolute;overflow:visible;filter:drop-shadow(0 0 2px rgba(0,0,0,.85))}
        .ro-arrow>i{position:absolute;left:-13px;top:-11px;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:20px solid #ff4a3d;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}
      `,document.head.appendChild(t)}for(let t=0;t<18;t++){let n=document.createElement("div");n.className="ro-abs ro-num",n.style.opacity="0",e.appendChild(n),this.nums.push({el:n,x:0,z:0,y:0,age:0,life:.8,active:!1,drift:0,ox:0,oy:0,rise:46})}}resize(e,t){this.w=e,this.h=t}spawnNumber(e,t,n,i,r,o){let a=this.nums.find(l=>!l.active)??this.nums.reduce((l,c)=>l.age>c.age?l:c);a.active=!0,a.age=0,a.life=.85,a.x=e.x,a.z=e.z,a.y=t,o?(a.drift=0,a.ox=o.x,a.oy=o.y,a.rise=14):(a.ox=0,a.oy=0,a.rise=46,a.drift=(Math.random()-.5)*22),a.el.textContent=n,a.el.style.color=Uh(i),a.el.style.fontSize=`${Math.round(r)}px`}makeBar(e){let t=document.createElement("div");t.className="ro-abs ro-bar";let n=document.createElement("div"),i=document.createElement("div");return n.style.background="#fff",n.style.opacity="0.85",i.style.background=e==="player"?"linear-gradient(#7ff6ff,#27c6dc)":"linear-gradient(#ff6a5c,#d12c26)",t.appendChild(n),t.appendChild(i),this.root.appendChild(t),{el:t,fill:i,lag:n,lagV:1,team:e}}makeArrow(){let e=document.createElement("div");return e.className="ro-abs ro-arrow",e.appendChild(document.createElement("i")),this.root.appendChild(e),e}makeLedgeRing(){let e=document.createElement("div");e.className="ro-abs ro-ledge";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-20 -20 40 40");let i=document.createElementNS(t,"circle"),r=document.createElementNS(t,"circle");for(let o of[i,r])o.setAttribute("r","15"),o.setAttribute("fill","none");return i.setAttribute("stroke","rgba(0,0,0,0.45)"),i.setAttribute("stroke-width","6"),r.setAttribute("stroke-width","4"),r.setAttribute("stroke-linecap","round"),r.setAttribute("transform","rotate(-90)"),r.setAttribute("stroke-dasharray",String(Pf)),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,arc:r,base:i}}updateLedge(e,t,n){this.clock+=n;let i=new Set,r=Math.round(Mt(this.h*.095,30,72));for(let o of e){if(o.state!=="ledge")continue;i.add(o.id);let a=this.ledgeRings.get(o.id);a||(a=this.makeLedgeRing(),this.ledgeRings.set(o.id,a));let l=Mt(1-o.stateT/Et.hold,0,1),c=o.stateT<Et.protect,h=!c&&l<.375,u=c?iy:Uh(Rf(o.variant));a.arc.setAttribute("stroke",u),a.arc.setAttribute("stroke-dashoffset",(Pf*(1-l)).toFixed(2)),a.arc.setAttribute("stroke-width",h?"5.5":"4"),a.arc.dataset.left=l.toFixed(4),a.arc.dataset.phase=c?"protect":"hold";let d=h?1+.12*Math.abs(Math.sin(this.clock*26)):1,f=t(o.pos,.15),v=a.el.firstChild;v.setAttribute("width",String(r)),v.setAttribute("height",String(r)),v.style.left=`${-r/2}px`,v.style.top=`${-r/2}px`,a.el.style.opacity="1",a.el.style.transform=`translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[o,a]of this.ledgeRings)i.has(o)||(a.el.remove(),this.ledgeRings.delete(o))}makeBreakMark(){let e=document.createElement("div");e.className="ro-abs ro-break",e.style.width="0",e.style.height="0";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-12 -13 24 26"),n.style.position="absolute",n.style.overflow="visible",n.style.filter="drop-shadow(0 0 2px rgba(0,0,0,.9))";let i=document.createElementNS(t,"path");i.setAttribute("d","M0 -11 L10 -7 L9 3 Q6 9 0 12 Q-6 9 -9 3 L-10 -7 Z"),i.setAttribute("stroke","rgba(0,0,0,.6)"),i.setAttribute("stroke-width","1.5");let r=document.createElementNS(t,"path");return r.setAttribute("d","M1 -11 L-2 -4 L3 0 L-1 5 L1 12"),r.setAttribute("fill","none"),r.setAttribute("stroke","rgba(20,16,24,.95)"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linejoin","round"),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,svg:n}}updateBreakMarks(e,t,n){let i=null;for(let a of e)(a.counterT??0)>0&&a.counterTargetId!=null&&(i=a.counterTargetId);let r=new Set,o=Math.round(Mt(this.h*.06,18,44));for(let a of e){if(!((a.breakT??0)>0)||a.state==="dead"||a.state==="falling")continue;r.add(a.id);let l=this.breakMarks.get(a.id);l||(l=this.makeBreakMark(),this.breakMarks.set(a.id,l));let c=a.id===i,h=t(a.pos,n?n(a):2.25),u=Math.round(Mt(this.h*.11,38,92)),d=c?1+.18*Math.abs(Math.sin(this.clock*12)):1;l.svg.firstChild.setAttribute("fill",c?"#ffc23a":"#e9e6df"),l.el.dataset.mark=c?"counter":"break",l.svg.setAttribute("width",String(o)),l.svg.setAttribute("height",String(Math.round(o*1.08))),l.svg.style.left=`${-o/2}px`,l.svg.style.top=`${-o*.54}px`,l.el.style.opacity=h.visible?"1":"0",l.el.style.transform=`translate3d(${(h.x-u/2-o*.55).toFixed(1)}px,${h.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[a,l]of this.breakMarks)r.has(a)||(l.el.remove(),this.breakMarks.delete(a))}update(e,t,n,i){this.updateLedge(e,t,n),(this.breakMarks.size||e.some(l=>(l.breakT??0)>0))&&this.updateBreakMarks(e,t,i);let r=new Set,o=Math.round(Mt(this.h*.11,38,92)),a=Math.round(Mt(this.h*.017,5,9));for(let l of e){r.add(l.id);let c=this.bars.get(l.id);c||(c=this.makeBar(l.team),this.bars.set(l.id,c));let h=l.state!=="dead"&&l.state!=="falling"&&l.state!=="reviving"&&l.hp>0,u=t(l.pos,i?i(l):2.25),d=h&&u.visible;if(c.el.style.opacity=d?"1":"0",d){let f=Mt(l.hp/l.maxHp,0,1);c.lagV=f>=c.lagV?f:Math.max(f,c.lagV-n*.7),c.el.style.width=`${o}px`,c.el.style.height=`${a}px`,c.el.style.transform=`translate3d(${Math.round(u.x-o/2)}px,${Math.round(u.y-a/2)}px,0)`,c.fill.style.width=`${(f*100).toFixed(1)}%`,c.lag.style.width=`${(c.lagV*100).toFixed(1)}%`}if(l.team==="enemy"){let f=this.arrows.get(l.id);f||(f={el:this.makeArrow(),id:l.id},this.arrows.set(l.id,f));let v=t(l.pos,1),b=10;if(h&&(v.x<b||v.x>this.w-b||v.y<b||v.y>this.h-b||!v.visible)){let p=this.w/2,m=this.h/2,x=v.x-p,y=v.y-m;Math.abs(x)<.001&&Math.abs(y)<.001&&(y=-1);let E=26,T=Math.min((p-E)/Math.max(Math.abs(x),.001),(m-E)/Math.max(Math.abs(y),.001)),L=p+x*T,R=m+y*T,S=Math.atan2(y,x);f.el.style.opacity="1",f.el.style.transform=`translate3d(${L.toFixed(1)}px,${R.toFixed(1)}px,0) rotate(${S}rad)`}else f.el.style.opacity="0"}}for(let[l,c]of this.bars)r.has(l)||(c.el.remove(),this.bars.delete(l));for(let[l,c]of this.arrows)r.has(l)||(c.el.remove(),this.arrows.delete(l));for(let l of this.nums){if(!l.active)continue;if(l.age+=n,l.age>=l.life){l.active=!1,l.el.style.opacity="0";continue}let c=l.age/l.life,h=t({x:l.x,z:l.z},l.y),u=l.rise*(1-Math.pow(1-c,2)),d=c<.12?.7+c/.12*.6:1.3-Math.min(.3,(c-.12)*.7);l.el.style.opacity=String(c<.6?1:1-(c-.6)/.4),l.el.style.transform=`translate3d(${(h.x+l.drift*c+l.ox).toFixed(1)}px,${(h.y-u+l.oy).toFixed(1)}px,0) translate(-50%,-50%) scale(${d.toFixed(2)})`}}clear(){for(let e of this.ledgeRings.values())e.el.remove();this.ledgeRings.clear();for(let e of this.breakMarks.values())e.el.remove();this.breakMarks.clear();for(let e of this.nums)e.active=!1,e.el.style.opacity="0";for(let e of this.bars.values())e.el.remove();for(let e of this.arrows.values())e.el.remove();this.bars.clear(),this.arrows.clear()}dispose(){this.clear();for(let e of this.nums)e.el.remove()}};var lc=class extends Ci{constructor(){super();let e=new Vt;e.deleteAttribute("uv");let t=new $i({side:fn}),n=new $i,i=new yo(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new Ze(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ln(e,n,6),a=new tn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Ze(e,br(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Ze(e,br(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Ze(e,br(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new Ze(e,br(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Ze(e,br(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Ze(e,br(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function br(s){return new Qt({color:0,emissive:16777215,emissiveIntensity:s})}var cc=38,Ui=51*Math.PI/180,sy=ot.near?12.5:15.3,ry=ot.near?22.1*(12.5/15.3):22.1,Df=.6,oy=2.6,ay=218,ly=154,cy=(ay-ly)/2,Ms=zn(5239039),hn=[1,1,1],Ss=zn(16726832),yn=zn(16747050),hy=[.72,.74,.78],kf=zn(12098936),ko=zn(9077624),ws=[.86,.87,.9],uy=zn(16773572),dy=zn(15260868),gi=zn(16758062),fy=zn(16773824),py=zn(16764774),my=zn(5922408),vi={melee:[2.2,2.4,2],sweepHalf:70*Math.PI/180,charge:4,bash:3.2,bashHalf:40*Math.PI/180,guardHalf:70*Math.PI/180};function Mr(s,e,t,n,i,r){let o=r;for(let a of s){let l=e-a.pos.x,c=t-a.pos.z,h=l*n+c*i,u=l*l+c*c-a.r*a.r,d=h*h-u;if(d<0)continue;let f=-h-Math.sqrt(d);f>0&&f<o&&(o=f)}return o}function Ff(s,e,t){let n=Math.min(window.devicePixelRatio||1,2),i=new Kl({canvas:s,antialias:n<2,powerPreference:"high-performance",alpha:!1,stencil:!0});i.setPixelRatio(n),i.shadowMap.enabled=!0,i.shadowMap.type=Za,i.outputColorSpace=Wt;let r=()=>{i.toneMapping=ot.myth?sl:si,i.toneMappingExposure=ot.myth?1.22:1};ot.myth&&r(),typeof window<"u"&&(window.__THREE_GAME_DIAGNOSTICS__={renderer:i.info});let o=new Ci,a=/iPhone|iPad|Android/i.test(navigator.userAgent),l={shadowSize:a?1536:2048,groundTexSize:a?1024:2048},c=tc(o,t,l),h={};h[ot.myth?"myth":"base"]={world:c,background:o.background,fog:o.fog};let u=null,d=()=>{if(!u){let $=new vr(i);u=$.fromScene(new lc,.04).texture,$.dispose()}return u},f=()=>{o.environment=ot.myth?d():null,o.environmentIntensity=.7};ot.myth&&f();function v(){let $=new Ci;return{world:tc($,t,l),background:$.background,fog:$.fog}}function b($){ot.myth=$;let Q=$?"myth":"base",J=h[Q]??(h[Q]=v());c.root.removeFromParent(),o.add(J.world.root),o.background=J.background,o.fog=J.fog,c=J.world,r(),f();for(let F of Re.values())F.dispose();Re.clear()}let g=new Map,p=$=>{if(!ot.myth)return"default";let Q=g.get($.id);return Q||($.kit==="shieldbearer"?"myth-shield":$.kit==="archer"?"myth-archer":"myth")},m=[],x=new Map,y=[],E=null,T=new Map,L=!0,R=new cn(cc,16/9,1,220);R.rotation.set(-Ui,0,0);let S=new cn(cc,16/9,1,220);S.rotation.set(-Ui,0,0);let w=new O(0,-Math.sin(Ui),-Math.cos(Ui)),A=new O(1,0,0),k=new O(0,Math.cos(Ui),-Math.sin(Ui)),C=new Lo(900,!0),z=new Lo(520,!1),W=new Do(200,xf()),K=new Do(40,yf());W.view.copy(w),K.view.copy(w);let j=new oc(o);o.add(z.mesh,C.mesh,W.mesh,K.mesh);let X=[];{let $=new di(.86,1,56).rotateX(-Math.PI/2);for(let Q=0;Q<10;Q++){let J=new Jt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:Ji,fog:!1}),F=new Ze($,J);F.visible=!1,F.renderOrder=7,F.frustumCulled=!1,o.add(F),X.push({mesh:F,mat:J,age:0,life:1,r0:0,r1:1,alpha:1,on:!1})}}let ae=[],he=[],_e=new ac(e),Re=new Map,Xe=new Map,qe=s.clientWidth||window.innerWidth||852,He=s.clientHeight||window.innerHeight||393,te=-.8,q=new Ee(0,te),le=0,Le=0,oe=0,We=new Ee,dt=0,N=1,ht=0,Ce=new O,De=new O,ge=new O;function gt($){let Q=Math.tan(cc*Math.PI/360);return Math.max(sy/2/Q,ry/2/($*Q))}function Pe($,Q,J,F,U=0,Z=0){$.position.set(Q+U,F*Math.sin(Ui)+Z,J+F*Math.cos(Ui)),$.updateMatrixWorld(!0)}function nt($,Q){qe=Math.max(1,$),He=Math.max(1,Q),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.setSize(qe,He,!1);for(let F of[R,S])F.aspect=qe/He,F.updateProjectionMatrix();_e.resize(qe,He);let J=gt(qe/He);Pe(R,q.x,q.y,J),Pe(S,q.x,q.y,J)}function Ot($,Q=0){return ge.set($.x,Q,$.z).project(R),{x:(ge.x*.5+.5)*qe,y:(-ge.y*.5+.5)*He,visible:ge.z<1&&ge.x>=-1&&ge.x<=1&&ge.y>=-1&&ge.y<=1}}function Ft($,Q){let J=$/qe*2-1,F=-(Q/He)*2+1;if(Ce.set(J,F,.5).unproject(S),De.copy(Ce).sub(S.position),De.y>-1e-6)return null;let U=-S.position.y/De.y;return U>0?{x:S.position.x+De.x*U,z:S.position.z+De.z*U}:null}let P=()=>Math.random(),M=($,Q)=>$+(Q-$)*P();function Y($,Q,J,F,U,Z,_){let I=X.find(D=>!D.on)??X[0];I.on=!0,I.age=0,I.life=U,I.r0=J,I.r1=F,I.alpha=_,I.mesh.position.set($,.09,Q),I.mat.color.setRGB(Z[0],Z[1],Z[2],Wt),I.mesh.visible=!0}function ne($,Q,J,F,U,Z=.1,_=1){C.spawn({x:$,y:Q,z:J,size:F,size1:F*.25,color:U,life:Z,alpha:_})}function se($,Q,J,F,U,Z,_,I){for(let D=0;D<F;D++){let H;_?H=Math.atan2(-_.z,-_.x)+(P()-.5)*I:H=P()*Math.PI*2;let B=U*M(.4,1);C.spawn({x:$,y:Q,z:J,vx:Math.cos(H)*B,vy:M(.5,4),vz:Math.sin(H)*B,size:M(.07,.16),size1:.02,color:P()<.35?hn:Z,life:M(.18,.42),gravity:9,drag:2.5})}}function ee($,Q,J,F,U,Z=1.2){for(let _=0;_<J;_++){let I=P()*Math.PI*2,D=M(.3,1)*F;z.spawn({x:$+Math.cos(I)*.15,y:.12,z:Q+Math.sin(I)*.15,vx:Math.cos(I)*D,vy:M(.2,1)*Z,vz:Math.sin(I)*D,size:U*M(.5,.9),size1:U*M(1.4,2),color:kf,alpha:.55,life:M(.4,.8),drag:3.2})}}function Oe($,Q,J,F,U,Z){for(let _=0;_<F;_++){let I=P()*Math.PI*2,D=Z*M(.3,1);z.spawn({x:$,y:Q,z:J,vx:Math.cos(I)*D,vy:M(2,6),vz:Math.sin(I)*D,size:M(.06,.13),size1:.05,color:U.map(H=>H*M(.6,1.1)),alpha:1,life:M(.5,.9),gravity:16,drag:.6,crisp:1})}}function fe($,Q,J,F,U,Z,_,I,D=.2){let H=_?Math.atan2(-_.z*Math.sin(Ui),-_.x):0;for(let B=0;B<F;B++){let re=_?H+(P()-.5)*I:B/F*Math.PI*2+P()*.5,ue=new O().copy(A).multiplyScalar(Math.cos(re)).addScaledVector(k,Math.sin(re));ae.push({x:$,y:Q,z:J,dir:ue,r1:U*M(.7,1.2),len0:U*.3,len1:U*M(.6,1),width:M(.1,.2),age:0,life:D*M(.8,1.2),color:Z})}}function Ne($,Q,J,F){z.spawn({x:$,y:1.05,z:Q,size:J*1.4,size1:J*.6,color:gi,alpha:.95,life:.2});for(let U=0;U<F;U++){let Z=P()*Math.PI*2,_=M(3,8);z.spawn({x:$,y:M(.7,1.4),z:Q,vx:Math.cos(Z)*_,vy:M(.5,3.5),vz:Math.sin(Z)*_,size:M(.12,.24),size1:.05,color:gi,alpha:1,life:M(.22,.36),gravity:9,drag:3,crisp:1})}}function Ve($,Q,J,F){for(let U=0;U<F;U++){let Z=M(.6,2.2);z.spawn({x:$-J.x*M(0,.25),y:M(-.05,.1),z:Q-J.z*M(0,.25),vx:-J.x*Z+M(-.6,.6),vy:M(.5,2.5),vz:-J.z*Z+M(-.6,.6),size:M(.06,.12),size1:.05,color:ko.map(_=>_*M(.7,1.1)),alpha:1,life:M(.6,1),gravity:16,drag:.4,crisp:1,floor:!1})}}function me($){return $.state==="ledge"?1.25:$.state==="climb"?1.25+(2.25-1.25)*Mt($.stateT/Et.climb,0,1):2.25}function Te($){return $?zn(Cf($.variant)):Ms}function Fe($){return!$||$.team==="player"?Ms:ot.myth?Ss:$.variant===2?yn:Ss}let Be=[];function we($,Q){let J=null,F=1/0;for(let U of Be){if(U.kind!==$)continue;let Z=(U.x-Q.x)**2+(U.z-Q.z)**2;Z<F&&(F=Z,J=U.ownerId)}return J}function rt($,Q,J){let F=$.targetId===Q.playerId,{x:U,z:Z}=$.pos,_=1,I=$.dir,D=0,H=14678783,B=Fe(J.get($.sourceId));switch($.kind){case"basic":ne(U,_,Z,.7,B,.09),se(U,_,Z,6,6,B,I,2.4),fe(U,_,Z,4,.9,B,I,2.2,.16),D=.07,H=13629951;break;case"control":ne(U,_,Z,1.3,B,.14),se(U,_,Z,12,8,B,I,3.4),fe(U,_,Z,7,1.7,B,I,3.6,.22),Y(U,Z,.3,1.2,.26,B,.6),D=.2,H=8057599;break;case"push":ne(U,_,Z,1.9,hn,.16),se(U,_,Z,16,9,B,null,6.3),fe(U,_,Z,10,2.4,B,null,6.3,.26),Y(U,Z,.4,2.2,.32,B,.7),ee(U,Z,9,3.2,.7),D=.42,H=16777215;break;case"enemyBasic":ne(U,_,Z,.8,yn,.1),se(U,_,Z,8,6,yn,I,2.6),fe(U,_,Z,5,1.1,yn,I,2.4,.18),D=F?.14:0,H=16739162;break;case"enemyHeavy":ne(U,_,Z,2,yn,.16),se(U,_,Z,16,9,yn,null,6.3),fe(U,_,Z,10,2.5,yn,null,6.3,.26),Y(U,Z,.4,2.9,.38,yn,.95),ee(U,Z,10,3.4,.75),Oe(U,.5,Z,6,ko,4),D=F?.6:.3,H=16739162;break;case"melee1":case"melee2":ne(U,_,Z,.8,hn,.09),se(U,_,Z,7,6,B,I,2.4),fe(U,_,Z,5,1,B,I,2.2,.16),D=.08;break;case"melee3":ne(U,_,Z,1.2,hn,.11),se(U,_,Z,11,7,B,I,3),fe(U,_,Z,7,1.5,B,I,3,.2),D=.16;break;case"charge":ne(U,_,Z,1.7,hn,.14),se(U,_,Z,14,8,B,I,3.6),fe(U,_,Z,9,2,B,I,3.6,.24),Y(U,Z,.4,1.8,.3,B,.7),ee(U,Z,8,2.6,.65),D=.3;break;case"counterBash":case"counterMelee":{let Se=$.kind==="counterBash";ne(U,_,Z,Se?1.8:1.1,hn,.12),se(U,_,Z,Se?14:9,8,gi,I,3.2),fe(U,_,Z,Se?9:6,Se?2:1.4,gi,I,3.2,.22),Ne(U,Z,Se?1.2:.8,Se?18:10),D=Se?.34:.16,H=16769162;break}}$.knock>.2&&ee(U,Z,4,1.6,.55,.6),le=Math.min(1,le+D),F&&(H=16739162);let re=Mt(He/393,.9,1.8),ue=J.get($.targetId);if(ot.myth&&ue){let Se=J.get($.sourceId),Ae=Se&&Math.sign(Ot(ue.pos).x-Ot(Se.pos).x)||1,Ye=Mt(He*.04,14,30);_e.spawnNumber(ue.pos,me(ue),String(Math.round($.dmg)),H,Mt(14+$.dmg*.9,15,30)*re*.62,{x:Ae*Ye*1.2,y:-Ye*1.6})}else _e.spawnNumber($.pos,1.9,String(Math.round($.dmg)),H,Mt(14+$.dmg*.9,15,30)*re)}function V($,Q,J){for(let F of $)switch(F.type){case"shoot":{let U=J.get(F.ownerId),Z=Te(U),_=F.pos.x+F.dir.x*.15,I=F.pos.z+F.dir.z*.15;ne(_,1.1,I,.6,Z,.07);for(let D=0;D<3;D++){let H=Math.atan2(F.dir.z,F.dir.x)+(P()-.5)*.7,B=M(3,7);C.spawn({x:_,y:1.1,z:I,vx:Math.cos(H)*B,vy:M(-.5,1),vz:Math.sin(H)*B,size:.09,size1:.02,color:Z,life:.14,drag:3})}break}case"hit":rt(F,Q,J),ot.myth&&F.knock>.2&&T.set(F.targetId,{x:F.pos.x,z:F.pos.z,age:0,color:Fe(J.get(F.sourceId))});break;case"cast":{let U=J.get(F.ownerId),Z=Re.get(F.ownerId);Z&&(Z.castT=0,Z.castSkill=F.skill);let _=F.skill==="enemyHeavy",I=_?Yt.range:Bt.range,D=_?Yt.halfAngle:Bt.halfAngle,H=Math.atan2(F.dir.z,F.dir.x),B=U?U.pos.x:F.pos.x,re=U?U.pos.z:F.pos.z;he.push({x:B,z:re,angle:H,range:I,half:D,color:_?yn:Fe(U),age:0,life:.22});for(let ue=0;ue<7;ue++){let Se=H+(P()-.5)*D*1.8,Ae=I*M(.5,.95);ee(B+Math.cos(Se)*Ae,re+Math.sin(Se)*Ae,1,1,_?.7:.5,.5)}_&&(Y(B+Math.cos(H)*I*.55,re+Math.sin(H)*I*.55,.3,I*.8,.3,yn,.6),le=Math.min(1,le+.12));break}case"dash":{let U=J.get(F.ownerId),Z=Te(U),_=5;for(let I=0;I<_;I++){let D=I/(_-1)*un.distance;C.spawn({x:F.from.x+F.dir.x*D,y:.95,z:F.from.z+F.dir.z*D,size:.62,size1:.5,aspect:2.7,color:Z,alpha:.5-I*.04,life:.26+I*.045})}ee(F.from.x,F.from.z,6,2.2,.5,.4);break}case"blocked":{let{x:U,z:Z}=F.pos,_=F.kind==="enemyBasic"?yn:Fe(J.get(we(F.kind,F.pos)??-1));ne(U,.9,Z,.5,_,.08),Oe(U,.9,Z,10,ko,4.5),ee(U,Z,3,1.2,.45,.6),se(U,.9,Z,5,5,_,null,6.3);break}case"blockedStrike":{let U=F.skill==="enemyHeavy"?yn:Fe(J.get(F.ownerId)),{x:Z,z:_}=F.pos;c.hitRock(Z,_),ne(Z,1.15,_,2.2,hn,.14),ne(Z,1.15,_,1.4,U,.24,.85),se(Z,1.15,_,22,8,U,F.dir,3.4),fe(Z,1.15,_,10,2.1,uy,F.dir,3.8,.4),Oe(Z,1,_,22,ko,6),ee(Z,_,7,2,.7,.9);break}case"expire":{let U=F.kind==="enemyBasic"?yn:Fe(J.get(we(F.kind,F.pos)??-1));se(F.pos.x,.95,F.pos.z,4,2.2,U,null,6.3);break}case"ledgeGrab":{let U=Re.get(F.ownerId);U&&(U.ledgeEdge={x:F.edge.x,z:F.edge.z});let Z=F.inward.z,_=-F.inward.x;for(let I=0;I<10;I++){let D=(I%2?1:-1)*M(.35,1.3),H=F.edge.x+Z*D,B=F.edge.z+_*D;z.spawn({x:H,y:.1,z:B,vx:Z*Math.sign(D)*M(.6,1.6)-F.inward.x*.4,vy:M(.4,1.2),vz:_*Math.sign(D)*M(.6,1.6)-F.inward.z*.4,size:M(.35,.6),size1:M(.8,1.2),color:dy,alpha:.75,life:M(.45,.8),drag:3})}Ve(F.edge.x,F.edge.z,F.inward,14);for(let I of[-1,1])se(F.edge.x+Z*I*.3,.12,F.edge.z+_*I*.3,4,3,hn,null,6.3);break}case"ledgeClimb":{let U=F.to.x-F.from.x,Z=F.to.z-F.from.z,_=Math.hypot(U,Z)||1;ee(F.from.x+U/_*Et.hangOut,F.from.z+Z/_*Et.hangOut,5,1.2,.5,.6);break}case"ledgeDrop":{let U=Re.get(F.ownerId);U?.onLedgeDrop(F.reason);let Z=U?.ledgeEdge,_=J.get(F.ownerId);if(Z&&_){let I=Z.x-_.pos.x,D=Z.z-_.pos.z,H=Math.hypot(I,D)||1;Ve(Z.x,Z.z,{x:I/H,z:D/H},F.reason==="knocked"?12:7),F.reason==="timeout"&&ee(Z.x,Z.z,4,.8,.4,.3)}break}case"melee":{Re.get(F.ownerId)?.onMelee(F.step);let U=J.get(F.ownerId),Z=F.counter?gi:Fe(U),_=Math.atan2(F.dir.z,F.dir.x),I=U?U.pos.x:F.pos.x,D=U?U.pos.z:F.pos.z;F.step===3?he.push({x:I,z:D,angle:_,range:vi.melee[2],half:vi.sweepHalf,color:Z,age:0,life:.16}):m.push({x:I,z:D,dx:F.dir.x,dz:F.dir.z,len:vi.melee[F.step-1],age:0,life:.13,color:Z});break}case"shieldBlock":{let{x:U,z:Z}=F.pos;if(F.kind==="bearer")Re.get(F.targetId)?.onShieldBlock(),ts(F.pos,F.dir),le=Math.min(1,le+.12);else if(F.kind==="perfect")Ne(U,Z,1.3,30),fe(U,1.1,Z,10,1.9,gi,null,6.3,.26),Y(U,Z,.3,1.6,.28,gi,.8),le=Math.min(1,le+.12);else for(let _=0;_<9;_++){let I=Math.atan2(-F.dir.z,-F.dir.x)+(P()-.5)*2.4,D=M(2.5,6);z.spawn({x:U,y:M(.8,1.3),z:Z,vx:Math.cos(I)*D,vy:M(.5,2.5),vz:Math.sin(I)*D,size:M(.09,.16),size1:.04,color:ws,alpha:1,life:M(.16,.26),gravity:9,drag:3,crisp:1})}break}case"recoil":{Re.get(F.ownerId)?.onRecoil();let U=J.get(F.ownerId);U&&(ee(U.pos.x,U.pos.z,5,1.6,.5,.5),fe(U.pos.x,1.3,U.pos.z,4,.8,ws,F.dir,1.2,.2));break}case"guardBreak":{let U=J.get(F.targetId),Z=U?U.pos.x:F.pos.x,_=U?U.pos.z:F.pos.z;ne(F.pos.x,1,F.pos.z,1.2,hn,.12),Oe(F.pos.x,1,F.pos.z,12,my,5);for(let I=0;I<6;I++){let D=I/6*Math.PI*2+P()*.4;z.spawn({x:Z+Math.cos(D)*.2,y:2,z:_+Math.sin(D)*.2,vx:Math.cos(D)*1.6,vy:M(2,3),vz:Math.sin(D)*1.6,size:.14,size1:.08,color:[.8,.93,1],alpha:.95,life:.5,gravity:9,drag:.8,crisp:1,floor:!1})}le=Math.min(1,le+.16);break}case"armor":{let U=J.get(F.ownerId);U&&Y(U.pos.x,U.pos.z,.5,1.3,.25,yn,.8);break}case"charge":{x.set(F.ownerId,{x:F.from.x,z:F.from.z,age:0,lx:F.from.x,lz:F.from.z}),ee(F.from.x,F.from.z,6,2,.55,.5);break}case"counterReady":{let U=J.get(F.ownerId);U&&(Y(U.pos.x,U.pos.z,.5,1.6,.3,gi,.9),Ne(U.pos.x,U.pos.z,.7,8));break}case"counterUsed":{let U=J.get(F.ownerId);U&&F.kind==="bash"&&he.push({x:U.pos.x,z:U.pos.z,angle:U.facing,range:vi.bash,half:vi.bashHalf,color:gi,age:0,life:.2});break}case"revive":{let{x:U,z:Z}=F.pos;Y(U,Z,.3,1.8,.4,Ms,.9);for(let _=0;_<24;_++){let I=P()*Math.PI*2,D=M(.1,.5);C.spawn({x:U+Math.cos(I)*D,y:M(0,.6),z:Z+Math.sin(I)*D,vy:M(2,5),size:M(.12,.26),size1:.03,color:P()<.5?Ms:hn,alpha:.9,life:M(.5,.9),gravity:-1,drag:1.2})}ee(U,Z,8,2.2,.55,.5);break}case"spawnMark":{y.push({x:F.pos.x,z:F.pos.z,age:0,lead:Math.max(.1,F.lead)});break}case"edgeSave":{let U=J.get(F.ownerId);U&&(Y(U.pos.x,U.pos.z,.5,1.5,.3,hn,.9),se(U.pos.x,.9,U.pos.z,8,4,hn,null,6.3));break}case"fall":{let{x:U,z:Z}=F.pos;ee(U,Z,14,3.2,.8,1.8),Oe(U,.3,Z,8,ko,3),dt=.7,Le=1,oe=1,We.set(U,Z),le=Math.min(1,le+.18);break}case"death":{if(F.cause==="fall")break;let U=J.get(F.ownerId),Z=Te(U),{x:_,z:I}=F.pos;for(let D=0;D<40;D++){let H=P()*Math.PI*2,B=M(.2,1.6);C.spawn({x:_+Math.cos(H)*.25,y:M(.2,1.8),z:I+Math.sin(H)*.25,vx:Math.cos(H)*B,vy:M(.8,3.2),vz:Math.sin(H)*B,size:M(.12,.3),size1:.02,color:P()<.5?Z:hn,alpha:.9,life:M(.6,1.2),gravity:-1.2,drag:1.4})}Y(_,I,.4,2.4,.5,Z,.8),ne(_,1,I,2.2,Z,.2,.8),dt=.35,le=Math.min(1,le+.2);break}default:break}}function ve($){j.flashes.begin();for(let Q=he.length-1;Q>=0;Q--){let J=he[Q];if(J.age+=$,J.age>=J.life){he.splice(Q,1);continue}let F=J.age/J.life;j.flashes.push(J.x,J.z,J.angle,J.range*(.85+.15*F),J.half,1,J.color,(1-F)*1.2)}j.flashes.end()}function Me($){for(let Q=ae.length-1;Q>=0;Q--){let J=ae[Q];J.age+=$,J.age>=J.life&&ae.splice(Q,1)}for(let Q of ae){let J=Q.age/Q.life,F=1-Math.pow(1-J,2.2),U=Q.r1*F,Z=Math.min(Q.len0+(Q.len1-Q.len0)*J,U+.15);Ce.set(Q.x+Q.dir.x*U,Q.y+Q.dir.y*U,Q.z+Q.dir.z*U),W.push(Ce,Q.dir,Z,Q.width*(1-J*.6),Q.color,1-J*J)}}function Ue($){for(let Q of X){if(!Q.on)continue;if(Q.age+=$,Q.age>=Q.life){Q.on=!1,Q.mesh.visible=!1;continue}let J=Q.age/Q.life,F=1-Math.pow(1-J,2.4),U=Q.r0+(Q.r1-Q.r0)*F;Q.mesh.scale.set(U,1,U),Q.mat.opacity=Q.alpha*(1-J)}}let de=new O;function ce($,Q){let J=new Set;Be.length=0;for(let F of $.projectiles){if(!F.alive)continue;J.add(F.id),Be.push({kind:F.kind,x:F.pos.x,z:F.pos.z,ownerId:F.ownerId});let U=F.team==="player"?Ms:Q.get(F.ownerId)?Fe(Q.get(F.ownerId)):Ss;de.set(F.dir.x,0,F.dir.z),Ce.set(F.pos.x,.95,F.pos.z);let Z=F.kind==="basic"?1.4:.7,_=Math.floor(F.traveled/Z),I=Xe.get(F.id);if(I===void 0||_>I){Xe.set(F.id,_);let D=F.kind==="enemyBasic"?yn:U,H=F.kind==="basic"?.9:1.6;C.spawn({x:F.pos.x-F.dir.x*H+M(-.08,.08),y:.95+M(-.1,.1),z:F.pos.z-F.dir.z*H+M(-.08,.08),size:F.kind==="basic"?.1:.16,size1:.02,color:D,alpha:.9,life:.38,vx:M(-.3,.3),vz:M(-.3,.3),vy:M(0,.4)})}F.kind==="basic"?(W.push(Ce,de,2.2,.5,U,1),W.push(Ce,de,.9,.24,hn,1)):F.kind==="control"?(K.push(Ce,de,3.8,1.1,U,1),W.push(Ce,de,2.4,.8,U,.7)):(K.push(Ce,de,3.1,1.4,yn,1),W.push(Ce,de,2.3,.95,Ss,.75))}for(let F of Xe.keys())J.has(F)||Xe.delete(F)}function ze($,Q){j.sectors.begin(),j.strips.begin();let J=t.rocks,F=.55+.45*Math.sin(ht*48),U=$.variant!=="s0",Z=U?.55:.16,_=U?.34:.2,I=U?.8+.2*F:.5+.5*F;for(let D of $.fighters){if(D.state==="guard"&&D.shieldDir&&D.shieldUp!==!1){let ue=D.guard?.perfect===!0;j.sectors.push(D.pos.x,D.pos.z,Math.atan2(D.shieldDir.z,D.shieldDir.x),1.6,vi.guardHalf,1,ue?gi:Ms,ue?.9:.6,.1)}let H=D.windup;if(!H||D.state!=="windup")continue;let B=Math.atan2(H.dir.z,H.dir.x),re=Mt(H.t/Math.max(H.dur,.001),0,1);switch(H.skill){case"enemyHeavy":{let ue=D.armorKind==="heavy"&&(D.armorT??0)>0?1:0;j.sectors.push(D.pos.x,D.pos.z,B,Yt.range,Yt.halfAngle,re,Ss,1,Z,ue);break}case"melee1":case"melee2":{let ue=Mr(J,D.pos.x,D.pos.z,H.dir.x,H.dir.z,vi.melee[H.skill==="melee1"?0:1]);j.strips.push(D.pos.x,D.pos.z,B,ue,.6,re,Fe(D),.6,.7,.18);break}case"melee3":j.sectors.push(D.pos.x,D.pos.z,B,vi.melee[2],vi.sweepHalf,re,Fe(D),.7,.25);break;case"charge":{let ue=Mr(J,D.pos.x,D.pos.z,H.dir.x,H.dir.z,vi.charge);j.strips.push(D.pos.x,D.pos.z,B,ue,1,re,Fe(D),.85,.5,_);break}case"enemyBasic":{let ue=Mr(J,D.pos.x,D.pos.z,H.dir.x,H.dir.z,Zt.range);j.strips.push(D.pos.x,D.pos.z,B,ue,.11,1,Ss,I,.5,_);break}case"control":{let ue=Mr(J,D.pos.x,D.pos.z,H.dir.x,H.dir.z,Lt.range);j.strips.push(D.pos.x,D.pos.z,B,ue,.95,re,Fe(D),.9,.6,_);break}case"push":j.sectors.push(D.pos.x,D.pos.z,B,Bt.range,Bt.halfAngle,re,Fe(D),.9,Z);break}}if(Q){let D=$.fighters.find(H=>H.id===$.playerId);if(D&&D.state!=="dead"&&D.state!=="falling"){let H=Q.cancel?hy:Ms,B=Math.atan2(Q.dir.z,Q.dir.x);if(Q.skill==="basic"){let re=Mr(J,D.pos.x,D.pos.z,Q.dir.x,Q.dir.z,9);j.strips.push(D.pos.x,D.pos.z,B,re,.09,1,H,Q.cancel?.55:.85,.7)}else if(Q.skill==="control"){let re=Mr(J,D.pos.x,D.pos.z,Q.dir.x,Q.dir.z,11);j.strips.push(D.pos.x,D.pos.z,B,re,.9,0,H,Q.cancel?.5:.8,.8)}else j.sectors.push(D.pos.x,D.pos.z,B,Bt.range,Bt.halfAngle,1,H,Q.cancel?.6:.8)}}j.sectors.end(),j.strips.end()}function it($,Q,J,F,U){let Z=Mt(U,0,.1);ht+=Z,dt=Math.max(0,dt-Z),N+=((dt>0?.32:1)-N)*_r(14,Z);let _=Z*N,I=Bh($.variant);I!==ot.myth&&b(I);let D=new Map;for(let tt of $.fighters)D.set(tt.id,tt);for(let tt of $.fighters){let ct=Re.get(tt.id);ct&&(ct.variant!==tt.variant||ct.look!==p(tt))&&(ct.dispose(),Re.delete(tt.id),ct=void 0),ct||(ct=new Po(o,tt.variant,p(tt)),Re.set(tt.id,ct))}for(let[tt,ct]of Re)D.has(tt)||(ct.dispose(),Re.delete(tt));V(Q,$,D);let H=D.get($.playerId),B=2*gt(qe/He)*Math.tan(cc*Math.PI/360)/He,ue=($.variant!=="s0"?cy*B:0)+(H?H.pos.x:0)*Df,Se=te+(H?H.pos.z:0)*Df,Ae=_r(oy,Z);q.x+=(ue-q.x)*Ae,q.y+=(Se-q.y)*Ae,oe=Math.max(0,oe-Z*1.1),Le=Math.max(0,Le-Z*1.5);let Ye=q.x+(We.x*.5-q.x)*.4*oe*oe,et=q.y+(We.y*.5-q.y)*.4*oe*oe,$e=gt(qe/He)*(1-.1*Math.sin(Le*Math.PI*.5));Pe(S,Ye,et,$e),le=Math.max(0,le-Z*2.4);let ft=le*le*.55,At=(Math.sin(ht*53.1)+Math.sin(ht*31.7+1.3))*.5*ft,Gt=(Math.sin(ht*47.3+2.1)+Math.sin(ht*29.1))*.5*ft;Pe(R,Ye,et,$e,At,Gt),R.rotation.z=Math.sin(ht*41)*le*le*.012,R.updateMatrixWorld(!0);for(let tt of $.fighters){let ct=Re.get(tt.id);ct.update(tt,F,$.variant!=="s0"),ct.wantDust(tt,_)&&ee(tt.pos.x,tt.pos.z,2,1,.45,.4),tt.state==="falling"&&P()<.9&&C.spawn({x:tt.pos.x+M(-.15,.15),y:tt.y+.9,z:tt.pos.z+M(-.15,.15),size:.28,size1:.1,aspect:2.8,color:[.9,.95,1],alpha:.4,life:.4,vy:3})}W.begin(),K.begin(),ce($,D),Me(_),ot.myth&&L&&_t(D,_),m.length&&yt(_),x.size&&Dn(D,_),W.end(),K.end(),ze($,J),(y.length||E)&&An(_),ve(_),Ue(_),C.update(_),z.update(_),c.setVariant($.variant==="s0"?"s0":"v2"),c.update(Z),i.render(o,R),_e.update($.fighters,Ot,Z,me)}function _t($,Q){for(let[J,F]of T){F.age+=Q;let U=$.get(J);if(!U||F.age>=.2){T.delete(J);continue}let Z=U.pos.x-F.x,_=U.pos.z-F.z,I=Math.hypot(Z,_);if(I<.05)continue;let D=1-F.age/.2;Ce.set(U.pos.x,.9,U.pos.z),De.set(Z/I,0,_/I),W.push(Ce,De,I,.55*D+.1,F.color,.9*D),W.push(Ce,De,I*.8,.2*D+.05,hn,.8*D)}}function yt($){for(let Q=m.length-1;Q>=0;Q--){let J=m[Q];if(J.age+=$,J.age>=J.life){m.splice(Q,1);continue}let F=J.age/J.life,U=J.len*(.55+.45*(1-Math.pow(1-F,3)));Ce.set(J.x+J.dx*U,1.05,J.z+J.dz*U),De.set(J.dx,0,J.dz),W.push(Ce,De,U*.8,.42*(1-F*.5),J.color,.9*(1-F)),W.push(Ce,De,U*.5,.16,hn,.9*(1-F))}}function Dn($,Q){for(let[J,F]of x){let U=$.get(J);if(!U){x.delete(J);continue}if(U.state!=="charge"&&(F.age+=Q),F.age>=.25){x.delete(J);continue}let Z=U.pos.x-F.x,_=U.pos.z-F.z,I=Math.hypot(Z,_);if(I<.05)continue;let D=1-F.age/.25,H=Fe(U);if(Ce.set(U.pos.x,.9,U.pos.z),De.set(Z/I,0,_/I),W.push(Ce,De,I,.95*D+.1,H,.85*D),W.push(Ce,De,I*.85,.35*D+.05,hn,.85*D),U.state==="charge"){let B=U.pos.x-F.lx,re=U.pos.z-F.lz,ue=Math.hypot(B,re),Se=Math.max(1,Math.ceil(ue/.15));for(let Ae=0;Ae<Se;Ae++){let Ye=(Ae+.5)/Se;z.spawn({x:F.lx+B*Ye,y:M(.6,1.2),z:F.lz+re*Ye,size:.75,size1:.35,color:H,alpha:.55,life:.28,drag:2})}z.spawn({x:U.pos.x,y:.12,z:U.pos.z,vx:-Z/I*2,vy:M(.3,1),vz:-_/I*2,size:.4,size1:.9,color:kf,alpha:.5,life:.4,drag:3})}F.lx=U.pos.x,F.lz=U.pos.z}}function An($){E||(E=new rc(o,4)),E.begin();for(let Q=y.length-1;Q>=0;Q--){let J=y[Q];if(J.age+=$,J.age>=J.lead+.2){y.splice(Q,1);continue}let F=Mt(J.age/J.lead,0,1),U=J.age>J.lead?1-(J.age-J.lead)/.2:1,Z=.85+.15*Math.sin(J.age*18);E.push(J.x,J.z,1.1,F,Ss,U*Z)}E.end()}function ts($,Q){let J=Math.atan2(-Q.z,-Q.x);z.spawn({x:$.x,y:1,z:$.z,size:2.6,size1:.9,color:ws,alpha:.95,life:.2}),z.spawn({x:$.x,y:1,z:$.z,size:1.2,size1:2.4,color:hn,alpha:.7,life:.16});for(let F=0;F<70;F++){let U=J+(P()-.5)*3.2,Z=M(5,13);z.spawn({x:$.x,y:M(.5,1.6),z:$.z,vx:Math.cos(U)*Z,vy:M(.8,4.5),vz:Math.sin(U)*Z,size:M(.16,.32),size1:.06,color:ws,alpha:1,life:M(.24,.4),gravity:9,drag:2.6,crisp:1})}fe($.x,1,$.z,10,1.8,ws,Q,3.4,.24);for(let F=0;F<14;F++){let U=J+(P()-.5)*2.6,Z=M(10,17),_=Math.cos(U)*Z,I=M(1.5,5),D=Math.sin(U)*Z,H=M(.8,1.3),B=M(.26,.38);for(let re=0;re<6;re++){let ue=re*.014;z.spawn({x:$.x-_*ue,y:H-I*ue,z:$.z-D*ue,vx:_,vy:I,vz:D,size:.2-re*.026,size1:.04,color:re<2?fy:py,alpha:1,life:B-ue,gravity:14,drag:1.2,crisp:1})}}}function $n($,Q){z.spawn({x:$.x,y:1,z:$.z,size:1.4,size1:.5,color:ws,alpha:.9,life:.16});for(let J=0;J<36;J++){let F=Math.atan2(-Q.z,-Q.x)+(P()-.5)*2.8,U=M(4,10);z.spawn({x:$.x,y:M(.6,1.5),z:$.z,vx:Math.cos(F)*U,vy:M(.5,3.5),vz:Math.sin(F)*U,size:M(.13,.25),size1:.05,color:ws,alpha:1,life:M(.2,.32),gravity:9,drag:3,crisp:1})}}function Kn(){for(let $ of Re.values())$.dispose();Re.clear(),Xe.clear(),C.clear(),z.clear(),ae.length=0,he.length=0,T.clear(),m.length=0,x.clear(),y.length=0;for(let $ of X)$.on=!1,$.mesh.visible=!1;_e.clear(),le=0,Le=0,oe=0,dt=0,N=1}nt(qe,He);let G=[];function pe(){if(ot.myth||!Bh("v4"))return;let $=Math.random,Q=625341585;Math.random=()=>{Q=Q+1831565813>>>0;let U=Q;return U=Math.imul(U^U>>>15,U|1),U^=U+Math.imul(U^U>>>7,U|61),((U^U>>>14)>>>0)/4294967296};let J=i.getRenderTarget(),F=new Tt;try{ot.myth=!0;let U=new Ci,Z=tc(U,t,l);h.myth={world:Z,background:U.background,fog:U.fog},U.environment=d(),U.environmentIntensity=.7;for(let[_,I]of[[0,"myth"],[1,"myth-shield"],[2,"myth-archer"]])G.push(new Po(U,_,I));r(),i.compile(U,R);for(let _ of[...o.children])_!==c.root&&i.compile(_,R,U);U.traverse(_=>{let I=_.material;for(let D of Array.isArray(I)?I:I?[I]:[])for(let H of Object.values(D))H&&H.isTexture&&i.initTexture(H)}),i.setRenderTarget(null),i.getViewport(F),i.setViewport(0,0,4,4),i.render(U,R)}finally{ot.myth=!1,r(),i.setRenderTarget(J),F.z>0&&i.setViewport(F),Math.random=$}}return pe(),{render:it,resize:nt,worldToScreen:Ot,screenToGround:Ft,reset:Kn,setDemoLooks:$=>{g.clear();for(let[Q,J]of Object.entries($))g.set(Number(Q),J)},blockSpark:$n,setKnockTrails:$=>{L=$},lookOf:$=>Re.get($)?.look??null,drawn:$=>Re.get($)?.root.visible??!1}}var Sr=62,Gh=50,Wh=.14,gy=14,vy=1.1,hc=.8,Es={basic:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v10M24 34v10M4 24h10M34 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',control:'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="21" r="2.5" fill="currentColor"/><path d="M21 4v8M21 30v8M4 21h8M30 21h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="8" fill="#0b1a2b" stroke="currentColor" stroke-width="2.5"/><path d="M36 31v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',push:'<svg viewBox="0 0 48 48"><path d="M8 24l12-10v7h8v6h-8v7z" fill="currentColor"/><path d="M32 10l6 6M34 24h8M32 38l6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',dash:'<svg viewBox="0 0 48 48"><path d="M8 12l12 12-12 12M22 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},Fo={basic:'<svg viewBox="0 0 48 48"><path d="M6 42L31 17" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M27.5 13.5L42 6l-7.5 14.5z" fill="currentColor"/><path d="M4 32l8-8M14 44l8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/></svg>',control:'<svg viewBox="0 0 48 48"><path d="M6 38Q18 10 40 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 5" opacity="0.65"/><path d="M12 36l24-12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M34 17l11 6-11 7z" fill="currentColor"/></svg>',push:'<svg viewBox="0 0 48 48"><circle cx="21" cy="24" r="15" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="21" cy="24" r="2.5" fill="currentColor"/><path d="M40 15l6 9-6 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'},xy='<svg viewBox="0 0 48 48"><path d="M4 14h12M2 24h16M4 34h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/><path d="M20 10l14 14-14 14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8v32" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',Bf=new URLSearchParams(location.search),es=Bf.get("art")==="myth",zf=Bf.get("cam")==="near",Uf=()=>`${es?" \xB7 \u795E\u8A71":""}${zf?" \xB7 \u62C9\u8FD1":""}`;function Nf(s,e){let t=new URLSearchParams(location.search);t.get(s)===e?t.delete(s):t.set(s,e);let n=t.toString();history.replaceState(null,"",`${location.pathname}${n?`?${n}`:""}${location.hash}`),location.reload()}var Xh=[{id:"basic",label:"\u57FA\u790E\u653B\u64CA",cls:"big"},{id:"dash",label:"\u4F4D\u79FB",cls:""},{id:"control",label:"\u63A7\u5236",cls:""},{id:"push",label:"\u64CA\u9000",cls:""}],yy=(s,e)=>`
<div class="hud" hidden>
  <div class="hp" data-box="hp"><div class="hp-fill"></div><span class="hp-text">100 / 100</span></div>
  <div class="timer" data-box="timer">00:00</div>
  <button class="pause" data-box="pause" aria-label="\u66AB\u505C"><svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></button>
  <div class="ver" data-box="ver"></div>
  <div class="revive v4only" title="\u5269\u9918\u5FA9\u6D3B\u6B21\u6578"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z" fill="currentColor"/></svg><span class="revive-n">\xD71</span></div>
  <div class="wave v4only">\u7B2C 1 \u6CE2</div>
  <div class="protect">\u4FDD\u8B77\u4E2D</div>
  <div class="reviving"><b>\u5361\u620E\u6E21\u4F60\u56DE\u4F86</b><i class="reviving-t"></i></div>
</div>
<div class="controls" hidden>
  <div class="stick-zone"></div>
  <div class="stick" data-box="stick"><div class="knob"></div></div>
  ${Xh.map(t=>`<div class="skill ${t.id} ${t.cls}" data-skill="${t.id}" data-box="skill-${t.id}" data-icon="${e&&t.id!=="dash"?"myth":"default"}" aria-label="${t.label}">${s[t.id]}${t.id==="dash"?'<u class="lbl">\u7FFB\u56DE</u>':""}<i class="cd"></i><b class="cdt"></b><em class="cancel">\u53D6\u6D88</em><em class="auto">\u81EA\u52D5</em></div>`).join("")}
</div>
<div class="banner" aria-live="polite"></div>
<div class="menu menu-title" hidden>
  <div class="panel">
    <h1>\u6D6E\u5CF6\u7375\u4EBA S0</h1>
    <p class="sub">\u4FEF\u8996\u89D2\u7375\u4EBA\u6230\u9B25\u539F\u578B</p>
    <p class="title-ver"></p>
    <section class="mode main v4row">
      <h3>\u5019\u9078 v0.4 \u8FD1\u6230\uFF08\u9078\u9053\u8DEF\uFF09</h3>
      <div class="btns row"><div class="tbtn main" role="button" data-act="v4-ares">\u963F\u745E\u65AF</div><div class="tbtn main" role="button" data-act="v4-mars">\u746A\u723E\u65AF</div><div class="tbtn" role="button" data-act="v4-none">\u7121\u9053\u8DEF\uFF08\u5C0D\u7167\uFF09</div></div>
    </section>
    <div class="modes">
      <section class="mode main">
        <h3>\u5019\u9078 v0.2\uFF08\u93E1\u50CF\u7375\u4EBA\uFF09</h3>
        <div class="btns row"><button data-act="start-v2-1v1">1 \u5C0D 1</button></div>
      </section>
      <section class="mode main">
        <h3>\u5019\u9078 v0.3 \u6500\u9644</h3>
        <div class="btns row"><button data-act="start-v3-1v1">1 \u5C0D 1</button></div>
        <button class="depth" data-act="ledge-depth">\u6500\u9644\u9580\u6ABB\uFF1A2.6</button>
      </section>
      <section class="mode alt">
        <h3>S0 \u57FA\u6E96</h3>
        <div class="btns row"><button class="ghost" data-act="start-s0-1v1">1 \u5C0D 1</button><button class="ghost" data-act="start-s0-1v2">1 \u5C0D 2</button></div>
      </section>
    </div>
    <div class="btns row"><div class="tbtn" role="button" data-act="art-toggle">\u756B\u9762\uFF1A${e?"\u795E\u8A71\u907A\u8DE1\uFF08\u5019\u9078\uFF09":"\u73FE\u884C"}</div><div class="tbtn" role="button" data-act="cam-toggle">\u93E1\u982D\uFF1A${zf?"\u62C9\u8FD1":"\u5168\u5CF6"}</div><button class="ghost small" data-act="howto">\u64CD\u4F5C\u8AAA\u660E</button></div>
  </div>
</div>
<div class="menu menu-howto" hidden>
  <div class="panel wide">
    <h2>\u64CD\u4F5C\u8AAA\u660E</h2>
    <div class="cols">
      <div><h3>\u89F8\u63A7</h3><ul>
        <li>\u5DE6\u624B\u62D6\u66F3\uFF1D\u79FB\u52D5\uFF08\u6416\u687F\u51FA\u73FE\u5728\u6309\u4E0B\u7684\u4F4D\u7F6E\uFF09</li>
        <li>\u5927\u9375\uFF1D\u57FA\u790E\u653B\u64CA\uFF1A\u6309\u4F4F\u9023\u5C04\uFF1B\u9EDE\u4E00\u4E0B\u81EA\u52D5\u7784\u6E96\uFF0C\u62D6\u66F3\u624B\u52D5\u7784\u6E96</li>
        <li>\u63A7\u5236\uFF0F\u64CA\u9000\u9375\uFF1A\u9EDE\u4E00\u4E0B\u81EA\u52D5\u7784\u6E96\uFF1B\u62D6\u66F3\u7784\u6E96\u5F8C\u653E\u958B\u65BD\u653E</li>
        <li>\u62D6\u96E2\u518D\u62D6\u56DE\u6309\u9375\u4E2D\u5FC3\u653E\u958B\uFF1D\u53D6\u6D88\u65BD\u653E</li>
        <li>\u4F4D\u79FB\u9375\uFF1A\u6CBF\u6416\u687F\u65B9\u5411\u885D\u523A</li>
      </ul></div>
      <div><h3>\u684C\u9762</h3><ul>
        <li>WASD \u79FB\u52D5\u3001\u6ED1\u9F20\u7784\u6E96\u3001\u5DE6\u9375\u6309\u4F4F\u5C04\u64CA</li>
        <li>Q\uFF1D\u63A7\u5236\u3001E\uFF1D\u64CA\u9000\uFF1A\u6309\u4F4F\u986F\u793A\u6307\u793A\u5668\uFF0C\u653E\u958B\u65BD\u653E</li>
        <li>\u6309\u4F4F\u671F\u9593\u6309\u53F3\u9375\u6216 Esc\uFF1D\u53D6\u6D88</li>
        <li>\u7A7A\u767D\u9375\uFF0FShift\uFF1D\u885D\u523A\uFF1BEsc\uFF1D\u66AB\u505C</li>
      </ul></div>
    </div>
    <p class="note">\u5019\u9078 v0.4\uFF1A\u666E\u653B\u6309\u4F4F\u9023\u64CA\u4E09\u6BB5\u3002\u963F\u745E\u65AF\uFF1D\u9EDE\u9053\u8DEF\u9375\u885D\u649E\uFF1B\u746A\u723E\u65AF\uFF1D\u6309\u4F4F\u9053\u8DEF\u9375\u8209\u76FE\uFF08\u62D6\u66F3\u6307\u5B9A\u76FE\u5411\uFF0C\u62D6\u56DE\u4E2D\u5FC3\uFF1D\u81EA\u52D5\uFF09\uFF0C\u5B8C\u7F8E\u683C\u64CB\u5F8C\u51FA\u73FE\u91D1\u5149\u53CD\u64CA\u6A5F\u6703\uFF0C\u6309\u666E\u653B\u6216\u9053\u8DEF\u9375\u53CD\u64CA\u3002\u9375\u76E4\uFF1AJ\uFF1D\u666E\u653B\uFF08\u6309\u4F4F\u9023\u64CA\uFF09\u3001E\uFF1D\u9053\u8DEF\u9375\uFF08\u746A\u723E\u65AF\u6309\u4F4F\u8209\u76FE\uFF09\u3001Q\uFF1D\u64F2\u77DB\u3002</p>
    <p class="note">\u5019\u9078 v0.3\uFF1A\u88AB\u64CA\u9000\u51FA\u754C\u6642\u6703\u6293\u4F4F\u5D16\u908A 0.8 \u79D2\uFF0C\u6309\u885D\u523A\u9375\u7FFB\u56DE\uFF1B\u88AB\u9707\u64CA\u6253\u4E2D\u6703\u9B06\u624B\u3002</p>
    <p class="note">\u5019\u9078\u7248\uFF1A\u5CA9\u77F3\u6703\u64CB\u5B50\u5F48\u548C\u9707\u64CA\uFF1B\u88AB\u64CA\u98DB\u6642\u63D0\u65E9\u6309\u885D\u523A\uFF0C\u6703\u5728\u53EF\u4EE5\u885D\u523A\u7684\u77AC\u9593\u81EA\u52D5\u767C\u52D5\uFF08\u7D04 0.15 \u79D2\u5167\uFF09\u3002</p>
    <div class="btns"><button data-act="back">\u8FD4\u56DE</button></div>
  </div>
</div>
<div class="menu menu-pause" hidden>
  <div class="panel">
    <h2>\u66AB\u505C</h2>
    <div class="btns">
      <button data-act="resume">\u7E7C\u7E8C</button>
      <button data-act="restart">\u91CD\u65B0\u958B\u59CB</button>
      <button data-act="title">\u56DE\u6A19\u984C</button>
      <button class="ghost" data-act="mute">\u97F3\u6548\uFF1A\u958B</button>
    </div>
  </div>
</div>
<div class="menu menu-result" hidden>
  <div class="panel">
    <h2 class="res-title">\u52DD\u5229</h2>
    <p class="res-text"></p>
    <details class="edge" hidden>
      <summary>\u51FA\u754C\u7D00\u9304\uFF08<span class="edge-n">0</span>\uFF09</summary>
      <div class="edge-list"></div>
    </details>
    <div class="v4res" hidden><p class="v4kills"></p><p class="v4meta"></p></div>
    <dl class="stats">
      <div><dt>\u547D\u4E2D\u7387</dt><dd data-stat="acc">\u2014</dd></div>
      <div><dt>\u9023\u62DB\u6578</dt><dd data-stat="combos">0</dd></div>
      <div><dt>\u64CA\u843D\u6578</dt><dd data-stat="fall">0</dd></div>
      <div><dt>\u64CA\u5012\u6578</dt><dd data-stat="hp">0</dd></div>
    </dl>
    <div class="btns row">
      <button data-act="again">\u518D\u4E00\u5834</button>
      <button class="ghost" data-act="title">\u56DE\u6A19\u984C</button>
    </div>
  </div>
</div>
<div class="rotate"><div>\u8ACB\u628A\u624B\u6A5F\u8F49\u6210\u6A6B\u5F0F</div></div>
`,Of=(s,e)=>{let t=Math.hypot(s,e);return t<1e-6?null:{x:s/t,z:e/t}};function Hf(s,e){s.innerHTML=yy(es?{...Es,...Fo}:Es,es),s.classList.toggle("art-myth",es);let t=G=>s.querySelector(G),n=t(".hud"),i=t(".controls"),r={title:t(".menu-title"),howto:t(".menu-howto"),pause:t(".menu-pause"),result:t(".menu-result")},o=t(".stick-zone"),a=t(".stick"),l=t(".knob"),c=t(".hp-fill"),h=t(".hp-text"),u=t(".timer"),d=t(".ver"),f=t(".banner"),v=Object.fromEntries(Xh.map(G=>[G.id,t(`.skill.${G.id}`)])),b=Object.fromEntries(Xh.map(G=>[G.id,{ring:v[G.id].querySelector(".cd"),text:v[G.id].querySelector(".cdt")}])),g=document.querySelector('meta[name="build-sha"]')?.getAttribute("content")??"",p=`${ss} \xB7 ${g&&!g.startsWith("__")?g:"dev"}${Uf()}`;d.textContent=p,t(".title-ver").textContent=`${ss}${Uf()}`;let m=!1,x=!1,y=!1,E="1v1",T="s0",L=2.6,R="ares",S=!1,w=null,A={basic:null,control:null,push:null},k=null,C=!1,z=!1,W=!1,K=!1,j=!1,X=new Set,ae=null,he=!1,_e=!1,Re=!1,Xe=0,qe=0,He=null,te=()=>m&&!x,q={basic:0,control:0,push:0,dash:0};function le(G){if(G==="basic"||!(q[G]>.05))return;let pe=v[G];pe.classList.remove("denied"),pe.offsetWidth,pe.classList.add("denied"),window.setTimeout(()=>pe.classList.remove("denied"),300)}let Le=()=>T==="v4",oe=()=>T==="v4"&&R==="mars";function We(G,pe){return pe!=="basic"&&G.dragged&&Math.hypot(G.x-G.cx,G.y-G.cy)<G.r*hc}function dt(G){let pe=Of(G.x-G.cx,G.y-G.cy);return pe&&Math.hypot(G.x-G.cx,G.y-G.cy)>=G.r*hc&&(G.lastDir=pe),G.lastDir}function N(){if(!Re)return null;let G=e.getPlayerPos(),pe=G&&e.screenToGround(Xe,qe);return!G||!pe||(He=Of(pe.x-G.x,pe.z-G.z)??He),He}function ht(){a.classList.remove("active"),a.style.left=a.style.top=a.style.bottom="",l.style.transform=""}function Ce(){w=null,ht();for(let G of["basic","control","push"])A[G]=null;for(let G of Object.keys(v))v[G].classList.remove("pressed","aiming","cancelling","autoaim","denied");k=null,C=!1,z=!1,W=!1,X.clear(),ae=null,he=!1,_e=!1,K=!1,j=!1}o.addEventListener("pointerdown",G=>{if(G.pointerType==="mouse"||w||!te())return;G.preventDefault(),o.setPointerCapture(G.pointerId);let pe=Math.min(Math.max(G.clientX,Sr+4),window.innerWidth-Sr-4),be=Math.min(Math.max(G.clientY,Sr+4),window.innerHeight-Sr-4);w={pid:G.pointerId,cx:pe,cy:be,move:{x:0,z:0}},a.classList.add("active"),a.style.left=`${pe-Sr}px`,a.style.top=`${be-Sr}px`,a.style.bottom="auto",De(G)});function De(G){if(!w||G.pointerId!==w.pid)return;let pe=G.clientX-w.cx,be=G.clientY-w.cy,Ke=Math.hypot(pe,be),ke=Ke>Gh?Gh/Ke:1;l.style.transform=`translate(${pe*ke}px, ${be*ke}px)`;let at=Math.min(Ke/Gh,1);if(at<=Wh)w.move={x:0,z:0};else{let Pt=(at-Wh)/(1-Wh);w.move={x:pe/Ke*Pt,z:be/Ke*Pt}}}function ge(G){!w||G.pointerId!==w.pid||(w=null,ht())}o.addEventListener("pointermove",De),o.addEventListener("pointerup",ge),o.addEventListener("pointercancel",ge);for(let G of["basic","control","push"]){let pe=v[G];pe.addEventListener("pointerdown",Ke=>{if(A[G]||!te())return;Ke.preventDefault(),pe.setPointerCapture(Ke.pointerId);let ke=pe.getBoundingClientRect();A[G]={pid:Ke.pointerId,cx:ke.left+ke.width/2,cy:ke.top+ke.height/2,r:ke.width/2,sx:Ke.clientX,sy:Ke.clientY,x:Ke.clientX,y:Ke.clientY,dragged:!1,lastDir:null},pe.classList.add("pressed"),le(G),G==="basic"&&Le()&&(z=!0),G==="push"&&oe()&&(W=!0,pe.classList.add("autoaim"))}),pe.addEventListener("pointermove",Ke=>{let ke=A[G];if(!(!ke||Ke.pointerId!==ke.pid)){if(ke.x=Ke.clientX,ke.y=Ke.clientY,!ke.dragged&&Math.hypot(ke.x-ke.sx,ke.y-ke.sy)>=gy&&Math.hypot(ke.x-ke.cx,ke.y-ke.cy)>ke.r*vy&&(ke.dragged=!0),G==="push"&&oe()){let at=!ke.dragged||Math.hypot(ke.x-ke.cx,ke.y-ke.cy)<ke.r*hc;pe.classList.toggle("aiming",!at),pe.classList.toggle("autoaim",at);return}pe.classList.toggle("aiming",ke.dragged),pe.classList.toggle("cancelling",We(ke,G))}});let be=(Ke,ke)=>{let at=A[G];!at||Ke.pointerId!==at.pid||(at.x=Ke.clientX,at.y=Ke.clientY,A[G]=null,pe.classList.remove("pressed","aiming","cancelling","autoaim"),!(G==="basic"||ke||!te())&&(G==="push"&&oe()||(at.dragged?We(at,G)||(k={skill:G,dir:dt(at)}):k={skill:G,dir:null})))};pe.addEventListener("pointerup",Ke=>be(Ke,!1)),pe.addEventListener("pointercancel",Ke=>be(Ke,!0))}v.dash.addEventListener("pointerdown",G=>{te()&&(G.preventDefault(),C=!0,le("dash"),v.dash.classList.add("pressed"))});let gt=()=>v.dash.classList.remove("pressed");v.dash.addEventListener("pointerup",gt),v.dash.addEventListener("pointercancel",gt);let Pe=G=>{ae||(ae=G,he=!1)};window.addEventListener("keydown",G=>{if(Ft(),G.code==="Escape"){if(G.repeat)return;ae&&!he?he=!0:te()&&Y();return}if(te()){if(G.repeat){G.code==="Space"&&G.preventDefault();return}switch(G.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":X.add(G.code);break;case"KeyQ":le("control"),Pe("control");break;case"KeyE":le("push"),oe()?K||(K=!0,W=!0,v.push.classList.add("pressed","autoaim")):Pe("push");break;case"KeyJ":Le()&&!j&&(j=!0,z=!0,v.basic.classList.add("pressed"));break;case"Space":G.preventDefault(),C=!0,le("dash");break;case"ShiftLeft":case"ShiftRight":C=!0,le("dash");break}}}),window.addEventListener("keyup",G=>{X.delete(G.code),G.code==="KeyE"&&K&&(K=!1,v.push.classList.remove("pressed","autoaim")),G.code==="KeyJ"&&j&&(j=!1,v.basic.classList.remove("pressed"));let pe=G.code==="KeyQ"?"control":G.code==="KeyE"?"push":null;pe&&ae===pe&&(!he&&te()&&(k={skill:pe,dir:N()}),ae=null,he=!1)});let nt=G=>!G.target.closest(".skill, .pause, .menu, .stick");window.addEventListener("pointerdown",G=>{if(G.pointerType==="mouse"){if(Re=!0,Xe=G.clientX,qe=G.clientY,G.button===2){ae&&(he=!0);return}G.button===0&&te()&&nt(G)&&(_e=!0,Le()&&(z=!0))}}),window.addEventListener("pointermove",G=>{G.pointerType==="mouse"&&(Re=!0,Xe=G.clientX,qe=G.clientY)}),window.addEventListener("pointerup",G=>{G.pointerType==="mouse"&&G.button===0&&(_e=!1)}),window.addEventListener("blur",Ce),document.addEventListener("visibilitychange",()=>{document.hidden&&(Ce(),te()&&Y())});let Ot=G=>G.preventDefault();for(let G of["gesturestart","gesturechange","gestureend","dblclick","contextmenu","selectstart","dragstart"])document.addEventListener(G,Ot);document.addEventListener("touchmove",G=>{G.target.closest?.(".edge-list")||G.preventDefault()},{passive:!1});function Ft(){S||(S=!0,e.onFirstGesture())}window.addEventListener("pointerup",Ft,!0);let P=()=>{for(let G of Object.values(r))G.hidden=!0};function M(G,pe,be){E=G,T=pe,be&&(R=be),ee(),pe==="v3"?e.onStart(G,pe,{ledgeDepth:L}):pe==="v4"?e.onStart(G,pe,{path:R}):e.onStart(G,pe),Kn.showPlaying()}function Y(){Ce(),x=!0,e.onPause(),r.pause.hidden=!1}let ne=t('[data-act="mute"]');s.addEventListener("click",G=>{let pe=G.target.closest("[data-act]")?.getAttribute("data-act");if(pe)switch(pe){case"start-v2-1v1":M("1v1","v2");break;case"art-toggle":Nf("art","myth");break;case"cam-toggle":Nf("cam","near");break;case"start-v3-1v1":M("1v1","v3");break;case"v4-ares":M("waves","v4","ares");break;case"v4-mars":M("waves","v4","mars");break;case"v4-none":M("waves","v4","none");break;case"ledge-depth":L=L===2.6?1.5:2.6,G.target.closest("[data-act]").textContent=`\u6500\u9644\u9580\u6ABB\uFF1A${L}`;break;case"start-s0-1v1":M("1v1","s0");break;case"start-s0-1v2":M("1v2","s0");break;case"again":case"restart":M(E,T,R);break;case"howto":r.title.hidden=!0,r.howto.hidden=!1;break;case"back":r.howto.hidden=!0,r.title.hidden=!1;break;case"resume":x=!1,r.pause.hidden=!0,e.onResume();break;case"title":Kn.showTitle();break;case"mute":y=!y,ne.textContent=`\u97F3\u6548\uFF1A${y?"\u95DC":"\u958B"}`,e.setMuted(y);break}}),t(".pause").addEventListener("click",()=>{te()&&Y()});let se={basic:"",control:"",push:"",dash:""};function ee(){let G=T==="v4",pe={basic:G||es?{tag:"myth",svg:Fo.basic}:{tag:"default",svg:Es.basic},control:G||es?{tag:"myth",svg:Fo.control}:{tag:"default",svg:Es.control},push:G&&R==="ares"?{tag:"charge",svg:xy}:G?R==="mars"?{tag:"myth",svg:Fo.push}:{tag:"default",svg:Es.push}:es?{tag:"myth",svg:Fo.push}:{tag:"default",svg:Es.push},dash:{tag:"default",svg:Es.dash}};for(let be of Object.keys(pe))se[be]!==pe[be].tag&&(se[be]=pe[be].tag,v[be].dataset.icon=pe[be].tag,v[be].querySelector("svg").outerHTML=pe[be].svg)}se.basic=es?"myth":"default",se.control=se.basic,se.push=se.basic,se.dash="default";let Oe={ares:"\u963F\u745E\u65AF",mars:"\u746A\u723E\u65AF",none:"\u7121\u9053\u8DEF"},fe=1.5,Ne=-1,Ve=t(".revive-n"),me=t(".revive"),Te=t(".wave"),Fe=t(".protect"),Be=t(".reviving"),we=t(".reviving-t"),rt=G=>G.variant==="v4"?`\u5019\u9078 v0.4\uFF08${Oe[G.v4?.path??R]}\uFF09`:G.variant==="v3"?`\u5019\u9078 v0.3\uFF08\u6500\u9644 ${G.ledgeDepth??2.6}\uFF09`:G.variant==="v2"?"\u5019\u9078 v0.2":"S0 \u57FA\u6E96",V={ver:"",hp:"",fill:"",time:"",low:!1},ve={basic:{ring:"",text:"",cooling:!1},control:{ring:"",text:"",cooling:!1},push:{ring:"",text:"",cooling:!1},dash:{ring:"",text:"",cooling:!1}},Me={knock:"\u64CA\u9000",dash:"\u885D\u523A"},Ue={predicted:"\u9810\u8A08",actual:"\u5BE6\u969B"},de={"dash-out":"\u4E3B\u52D5\u885D\u523A","too-deep":"\u592A\u6DF1",locked:"\u9396\u5B9A\u4E2D","no-landing":"\u7121\u843D\u9EDE"},ce={pending:"\u9032\u884C\u4E2D",rescue:"\u6551\u56DE",climbed:"\u7FFB\u56DE",knocked:"\u88AB\u6253\u843D",timeout:"\u6642\u9593\u5230",hp:"\u8840\u76E1",fall:"\u589C\u843D"},ze=G=>G.startsWith("accepted")?`\u5DF2\u6309${G.slice(8)}`:G.startsWith("buffered")?`\u63D0\u65E9\u6309${G.slice(8)}`:G==="none"?"\u6C92\u6309":G,it=G=>[`${G.t.toFixed(1)}s`,G.who,Me[G.source]??G.source,G.depth===null?"\u2014":`${G.depth.toFixed(1)}${G.basis?` ${Ue[G.basis]}`:""}`,G.eligible?"\u53EF\u6500\u9644":`\u4E0D\u53EF\uFF08${G.reason?de[G.reason]??G.reason:"\u2014"}\uFF09`,ze(G.input),ce[G.outcome]??G.outcome],_t=t(".edge"),yt=t(".edge-list");_t.addEventListener("toggle",()=>r.result.classList.toggle("edge-open",_t.open));function Dn(G){let pe=G.edgeLog??[];_t.hidden=pe.length===0&&G.variant!=="v3",_t.open=!1,r.result.classList.remove("edge-open"),t(".edge-n").textContent=String(pe.length);let be=document.createElement("table"),Ke=be.insertRow();for(let ke of["\u6642\u9593","\u8AB0","\u4F86\u6E90","\u6DF1\u5EA6","\u53EF\u5426\u6500\u9644","\u7FFB\u56DE\u9375","\u7D50\u679C"]){let at=document.createElement("th");at.textContent=ke,Ke.appendChild(at)}for(let ke of pe){let at=be.insertRow();for(let Pt of it(ke))at.insertCell().textContent=Pt}if(pe.length===0){let ke=be.insertRow().insertCell();ke.colSpan=7,ke.textContent="\u672C\u5834\u6C92\u6709\u51FA\u754C"}yt.replaceChildren(be)}function An(G){let pe=t(".v4res"),be=G.v4;if(pe.hidden=!be,!be)return;let Ke=(at,Pt)=>be.kills.filter($=>$.how===at&&$.where===Pt).length,ke=(at,Pt)=>`${Pt} ${Ke(at,"center")+Ke(at,"edge")}\uFF08\u4E2D\u592E ${Ke(at,"center")}\uFF0F\u5D16\u908A ${Ke(at,"edge")}\uFF09`;t(".v4kills").textContent=`${ke("hp","\u6253\u6B7B")}\u3000${ke("fall","\u64CA\u843D")}`,t(".v4meta").textContent=`${Oe[be.path]} \xB7 \u7B2C ${be.wave.index}\uFF0F${be.wave.total} \u6CE2 \xB7 \u7834\u9632 ${be.breaks} \xB7 \u5B8C\u7F8E\u683C\u64CB ${be.perfectBlocks} \xB7 \u53CD\u64CA \u76FE\u64CA ${be.counters.bash}\uFF0F\u8FD1\u8EAB ${be.counters.melee}`}let ts=null;function $n(G,pe){let be=G.v4,Ke=be?.revivesLeft??0;if(Ve.textContent=`\xD7${Ke}`,me.classList.toggle("spent",Ke<=0),be){let $=be.wave.index;Te.textContent=`\u7B2C ${$} \u6CE2`,$!==Ne&&(Ne=$,$>0&&Kn.banner(`\u7B2C ${$} \u6CE2`,"info"))}let ke=pe.protectT??0;Fe.classList.toggle("on",ke>0),ke>0&&(Fe.textContent=`\u4FDD\u8B77\u4E2D ${ke.toFixed(1)}`),c.parentElement.classList.toggle("protected",ke>0);let at=pe.state==="reviving";Be.classList.toggle("on",at),at&&(we.textContent=Math.max(0,fe-pe.stateT).toFixed(1));let Pt=(pe.counterT??0)>0;v.basic.classList.toggle("counter",Pt),v.push.classList.toggle("counter",Pt)}let Kn={readIntent(){let G={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null};if(!te())return k=null,C=!1,z=!1,W=!1,G;let pe;if(w)pe=w.move;else{let $=(X.has("KeyD")?1:0)-(X.has("KeyA")?1:0),Q=(X.has("KeyS")?1:0)-(X.has("KeyW")?1:0);$&&Q&&($*=Math.SQRT1_2,Q*=Math.SQRT1_2),pe={x:$,z:Q}}let be=A.basic,Ke=Le(),ke=!!be||_e||j||Ke&&z,at=null;be&&be.dragged?at=dt(be):!be&&_e&&(at=N());let Pt={move:{x:pe.x,z:pe.z},fire:ke,fireDir:at,cast:k,dash:C,dashDir:null};if(Ke&&(Pt.firePressed=z),oe()){let $=A.push;Pt.guardHeld=!!$||K||W,Pt.guardPressed=W,Pt.guardDir=$&&$.dragged&&Math.hypot($.x-$.cx,$.y-$.cy)>=$.r*hc?dt($):null}return k=null,C=!1,z=!1,W=!1,Pt},aimPreview(){if(!te())return null;for(let pe of["control","push"]){if(pe==="push"&&oe())continue;let be=A[pe];if(be&&be.dragged){let Ke=We(be,pe),ke=dt(be);if(ke)return{skill:pe,dir:ke,cancel:Ke}}}if(ae)return{skill:ae,dir:N()??{x:1,z:0},cancel:he};let G=A.basic;if(G&&G.dragged){let pe=dt(G);if(pe)return{skill:"basic",dir:pe,cancel:!1}}if(!G&&_e){let pe=N();if(pe)return{skill:"basic",dir:pe,cancel:!1}}return null},update(G){let pe=`${rt(G)} \xB7 ${p}`;pe!==V.ver&&(V.ver=pe,d.textContent=pe);let be=G.fighters.find(J=>J.id===G.playerId);if(!be)return;let ke=`${Math.max(0,Math.ceil(be.hp))} / ${Math.ceil(be.maxHp)}`;ke!==V.hp&&(V.hp=ke,h.textContent=ke);let at=`${Math.max(0,Math.min(1,be.hp/be.maxHp))*100}%`;at!==V.fill&&(V.fill=at,c.style.width=at);let Pt=be.hp/be.maxHp<.3;Pt!==V.low&&(V.low=Pt,c.classList.toggle("low",Pt));let $=Math.max(0,Math.floor(G.time)),Q=`${String(Math.floor($/60)).padStart(2,"0")}:${String($%60).padStart(2,"0")}`;Q!==V.time&&(V.time=Q,u.textContent=Q),(G.variant!==T||G.variant==="v4"&&be.path&&be.path!==R)&&(T=G.variant,E=G.mode,be.path&&(R=be.path),ee()),n.classList.toggle("v4",G.variant==="v4"),G.variant==="v4"&&$n(G,be),v.dash.classList.toggle("ledge",be.state==="ledge"),v.dash.classList.toggle("climbing",be.state==="climb");for(let J of Object.keys(b)){let U=J==="dash"&&(be.state==="ledge"||be.state==="climb")?0:be.cooldowns[J]??0,Z=be.cooldownMax[J]??0;q[J]=U;let I=`${((Z>0?Math.max(0,Math.min(1,U/Z)):0)*360).toFixed(0)}deg`,D=J!=="basic"&&U>.05?U>=10?U.toFixed(0):U.toFixed(1):"",H=ve[J];I!==H.ring&&(H.ring=I,b[J].ring.style.setProperty("--cd",I)),D!==H.text&&(H.text=D,b[J].text.textContent=D);let B=U>.05;B!==H.cooling&&(H.cooling=B,v[J].classList.toggle("cooling",B))}},showTitle(){Ce(),m=!1,x=!1,P(),n.hidden=!0,i.hidden=!0,r.title.hidden=!1},showResult(G){Ce(),m=!1,x=!1,E=G.mode,T=G.variant,G.ledgeDepth&&(L=G.ledgeDepth),G.v4&&(R=G.v4.path),P(),n.hidden=!0,i.hidden=!0;let pe=G.result==="win",be=r.result;be.classList.toggle("win",pe),be.classList.toggle("lose",!pe),be.querySelector(".res-title").textContent=pe?"\u52DD\u5229":"\u5931\u6557",be.querySelector(".res-text").textContent=pe?"":G.loseText??"";let Ke=G.stats,ke=(at,Pt)=>{be.querySelector(`[data-stat="${at}"]`).textContent=Pt};ke("acc",Ke.shotsFired>0?`${Math.round(Ke.shotsHit*100/Ke.shotsFired)}%\uFF08${Ke.shotsHit}/${Ke.shotsFired}\uFF09`:"\u2014"),ke("combos",String(Ke.combos)),ke("fall",String(Ke.kills.fall)),ke("hp",String(Ke.kills.hp)),Dn(G),An(G),be.hidden=!1},showPlaying(){Ce(),m=!0,x=!1,P(),n.hidden=!1,i.hidden=!1,Ne=-1;for(let G of[Fe,Be])G.classList.remove("on");v.basic.classList.remove("counter"),v.push.classList.remove("counter"),n.classList.toggle("v4",T==="v4")},banner(G,pe){f.textContent=G,f.className=`banner ${pe}`,ts?.cancel(),typeof f.animate=="function"&&(ts=f.animate([{opacity:0,transform:"translate(-50%, 0) scale(0.7)"},{opacity:1,transform:"translate(-50%, 0) scale(1.05)",offset:.15},{opacity:1,transform:"translate(-50%, 0) scale(1)",offset:.65},{opacity:0,transform:"translate(-50%, -14px) scale(1)"}],{duration:1200,easing:"ease-out",fill:"both"}))}};return Kn.showTitle(),Kn}var _y={shootP:.05,shootE:.14,hitP:.05,hitE:.07,hurt:.12,windupH:.4,windupB:.25,windupP:.2,windupEP:.35,windupEC:.3,shootEC:.2,strikeBlocked:.2,ledgeGrabP:.3,ledgeGrabE:.3,ledgeRdy:.1,ledgeClimbP:.2,ledgeClimbE:.2,ledgeDropP:.3,ledgeDropE:.3,meleeP:.08,meleeE:.15,blockB:.12,blockG:.1,blockPf:.2,recoilP:.15,recoilE:.2,gBreak:.5,armorP:.4,armorE:.4,chargeP:.3,chargeE:.3,cReady:.3,cUsed:.15,cLost:.3,reviveS:.5,reviveG:.5,wave:.6,windupM:.2,cast:.1,dash:.1,blocked:.07,fall:.3,combo:.15};function Vf(){let s=null,e=null,t=null,n=!1,i=0,r={},o=new Map,a=.2;function l(m){let x=o.get(m);x!==void 0&&(clearTimeout(x),o.delete(m))}function c(){if(s)return s;let m=window,x=m.AudioContext||m.webkitAudioContext;if(!x)return null;try{s=new x}catch{return null}e=s.createGain(),e.gain.value=n?0:.5;let y=s.createDynamicsCompressor();y.threshold.value=-18,y.ratio.value=6,y.attack.value=.003,y.release.value=.15,e.connect(y),y.connect(s.destination),t=s.createBuffer(1,s.sampleRate,s.sampleRate);let E=t.getChannelData(0);for(let T=0;T<E.length;T++)E[T]=Math.random()*2-1;return s}function h(m){return i>=28?!1:(i++,setTimeout(()=>{i=Math.max(0,i-1)},(m+.1)*1e3),!0)}function u(m,x,y,E,T=.004){m.gain.setValueAtTime(1e-4,x),m.gain.linearRampToValueAtTime(y,x+T),m.gain.exponentialRampToValueAtTime(1e-4,x+E)}function d(m,x,y,E,T,L,R=0){if(!e||!h(T+R))return;let S=m.currentTime+R,w=m.createOscillator(),A=m.createGain();w.type=x,w.frequency.setValueAtTime(y,S),E!==y&&w.frequency.exponentialRampToValueAtTime(Math.max(20,E),S+T),u(A,S,L,T),w.connect(A),A.connect(e),w.start(S),w.stop(S+T+.02)}function f(m,x,y,E,T,L,R,S=0){if(!e||!t||!h(L+S))return;let w=m.currentTime+S,A=m.createBufferSource();A.buffer=t,A.loop=!0;let k=m.createBiquadFilter();k.type=x,k.Q.value=T,k.frequency.setValueAtTime(y,w),E!==y&&k.frequency.exponentialRampToValueAtTime(Math.max(20,E),w+L);let C=m.createGain();u(C,w,R,L,.006),A.connect(k),k.connect(C),C.connect(e),A.start(w,Math.random()*.5),A.stop(w+L+.02)}function v(m,x){let y=m.currentTime;return y-(r[x]??-1)<(_y[x]??.05)?!1:(r[x]=y,!0)}function b(m,x,y){let E=x==="melee3"||x==="charge"||x==="counterBash",T=y?1.15:1;d(m,"sine",E?130:160,E?48:70,E?.3:.18,(E?.55:.42)*T),f(m,"lowpass",E?1100:1500,200,.7,E?.2:.11,(E?.3:.22)*T),(x==="counterBash"||x==="counterMelee")&&d(m,"triangle",880,660,.1,.12,.02),y&&d(m,"triangle",300,200,.1,.1)}function g(m,x,y){if(x==="melee1"||x==="melee2"||x==="melee3"||x==="charge"||x==="counterBash"||x==="counterMelee"){b(m,x,y);return}let E=x==="push"||x==="enemyHeavy";y?(d(m,"sine",E?150:200,E?55:90,E?.32:.2,E?.5:.36),f(m,"lowpass",1400,300,.7,E?.26:.14,E?.3:.2),d(m,"triangle",330,220,.12,.12)):E?(d(m,"sine",170,60,.28,.42),f(m,"bandpass",900,250,.9,.22,.26)):x==="control"?(d(m,"triangle",520,300,.12,.2),f(m,"bandpass",2400,1400,1.2,.09,.14)):(d(m,"square",760,520,.05,.07),f(m,"highpass",3e3,3e3,.7,.05,.1))}function p(m,x,y){switch(x.type){case"shoot":{let E=x.ownerId===y;if(!v(m,E?"shootP":x.kind==="control"?"shootEC":"shootE"))return;if(!E&&x.kind==="control")d(m,"sawtooth",240,150,.14,.09),f(m,"bandpass",700,350,2,.12,.09);else if(E){let T=x.kind==="control";d(m,"square",T?520:900,T?260:380,.07,.07),f(m,"bandpass",2600,1200,1.4,.05,.08)}else d(m,"sine",300,150,.09,.1),f(m,"lowpass",900,400,.8,.06,.08);return}case"hit":{let E=x.targetId===y;if(!E&&x.sourceId!==y||!v(m,E?"hurt":"hitP"))return;g(m,x.kind,E);return}case"windupStart":{if(x.skill==="enemyHeavy"){if(!v(m,"windupH"))return;d(m,"triangle",392,440,.16,.26),d(m,"triangle",523,587,.2,.28,.15),d(m,"sine",196,262,Math.min(.5,x.dur),.18)}else if(x.skill==="enemyBasic"){if(!v(m,"windupB"))return;d(m,"sine",620,700,.06,.07)}else if(x.skill==="melee1"||x.skill==="melee2"||x.skill==="melee3"||x.skill==="charge"){if(x.ownerId===y||!v(m,"windupM"))return;x.skill==="charge"?(d(m,"sawtooth",80,140,Math.min(.4,x.dur),.14),f(m,"lowpass",300,700,.8,.25,.1)):d(m,"sine",330,x.skill==="melee3"?420:380,.08,.09)}else if(x.ownerId!==y&&x.skill==="push"){if(!v(m,"windupEP"))return;d(m,"sine",90,190,.2,.3),f(m,"lowpass",300,1100,.9,.18,.16)}else if(x.ownerId!==y&&x.skill==="control"){if(!v(m,"windupEC"))return;d(m,"sawtooth",700,1500,.14,.1),f(m,"bandpass",2400,4200,3,.1,.1)}else if(x.ownerId===y){if(!v(m,"windupP"))return;d(m,"sine",240,380,Math.min(.3,x.dur),.09)}return}case"cast":{if(!v(m,"cast"))return;let E=x.skill==="enemyHeavy";d(m,"sine",E?120:140,40,.38,E?.55:.5),f(m,"lowpass",1800,150,.8,.3,.3);return}case"dash":{if(!v(m,"dash"))return;let E=x.ownerId===y;f(m,"bandpass",600,3800,1.1,.22,E?.26:.14);return}case"blocked":{if(!v(m,"blocked"))return;d(m,"triangle",190,110,.07,.2),f(m,"bandpass",1500,900,2,.06,.2);return}case"fall":{if(!v(m,"fall"))return;let T=x.ownerId===y?.3:.2;f(m,"bandpass",1800,220,1.6,.9,T),d(m,"sine",700,120,.9,T*.45);return}case"blockedStrike":{if(!v(m,"strikeBlocked"))return;let E=x.ownerId===y||x.targetId===y?1:.5;d(m,"sine",110,45,.3,.5*E),f(m,"lowpass",700,120,.8,.22,.3*E);return}case"ledgeGrab":{let E=x.ownerId===y;if(!v(m,E?"ledgeGrabP":"ledgeGrabE"))return;d(m,"sine",95,50,.26,E?.5:.28),f(m,"bandpass",1800,500,1.1,.2,E?.26:.16),f(m,"highpass",4200,2600,.7,.07,E?.1:.06,.05),E||(d(m,"square",740,740,.06,.1,.04),d(m,"square",988,988,.08,.1,.13)),l(x.ownerId),o.set(x.ownerId,setTimeout(()=>{o.delete(x.ownerId),!(n||!s||s.state!=="running"||!v(s,"ledgeRdy"))&&(E?d(s,"sine",1040,1040,.05,.1):d(s,"sawtooth",1480,1480,.07,.09))},a*1e3));return}case"ledgeClimb":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeClimbP":"ledgeClimbE"))return;f(m,"bandpass",500,2200,1,.18,E?.22:.12),d(m,"triangle",E?220:300,E?420:600,.16,E?.16:.09),d(m,"sine",E?120:160,E?70:100,.12,E?.3:.16,.17);return}case"ledgeDrop":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeDropP":"ledgeDropE"))return;let T=E?1:.6;x.reason==="knocked"?(d(m,"sine",180,55,.3,.45*T),f(m,"lowpass",1600,250,.8,.24,.26*T)):(f(m,"bandpass",3e3,700,1.6,.3,.2*T),d(m,"sine",420,130,.32,.18*T));return}case"melee":{let E=x.ownerId===y;if(!v(m,E?"meleeP":"meleeE"))return;let T=E?1:.55;x.hit?f(m,"bandpass",1500,700,1.2,.07,.07*T):(f(m,"bandpass",x.counter?3200:2400,x.counter?900:600,1.3,.16,.2*T),d(m,"sine",x.step===3?260:340,140,.12,.08*T));return}case"shieldBlock":{if(x.attackerId!==y&&x.targetId!==y)return;if(x.kind==="bearer"){if(!v(m,"blockB"))return;d(m,"sine",410,380,.28,.26),d(m,"sine",655,610,.2,.2),f(m,"highpass",2500,2500,.8,.1,.18)}else if(x.kind==="perfect"){if(!v(m,"blockPf"))return;d(m,"sine",1568,1568,.45,.28),d(m,"sine",2349,2349,.35,.2,.01),d(m,"triangle",3136,3136,.2,.08,.02),f(m,"highpass",6e3,6e3,.7,.08,.12)}else{if(!v(m,"blockG"))return;d(m,"square",1200,900,.07,.1),f(m,"bandpass",3200,2200,1.8,.06,.14)}return}case"recoil":{let E=x.ownerId===y;if(!v(m,E?"recoilP":"recoilE"))return;d(m,"sine",300,110,.12,E?.3:.16);return}case"guardBreak":{if(!v(m,"gBreak"))return;let E=x.targetId===y?1:.8;d(m,"sawtooth",700,520,.09,.14*E),d(m,"sawtooth",820,430,.09,.12*E,.1),d(m,"sawtooth",620,300,.12,.09*E,.2),f(m,"bandpass",2800,500,1.4,.3,.18*E),d(m,"sine",150,60,.25,.3*E,.02);return}case"armor":{let E=x.ownerId===y;if(!v(m,E?"armorP":"armorE"))return;d(m,"sine",70,95,Math.min(.35,x.dur),E?.22:.14),f(m,"lowpass",260,520,.9,.2,E?.1:.06);return}case"charge":{let E=x.ownerId===y;if(!v(m,E?"chargeP":"chargeE"))return;let T=E?1:.6;f(m,"lowpass",350,1100,.9,.4,.3*T),d(m,"sawtooth",70,130,.35,.16*T);return}case"counterReady":{if(x.ownerId!==y||!v(m,"cReady"))return;d(m,"triangle",1175,1175,.12,.18),d(m,"triangle",1568,1568,.2,.2,.09),f(m,"highpass",6500,6500,.7,.1,.06,.09);return}case"counterUsed":{if(x.ownerId!==y||!v(m,"cUsed"))return;x.kind==="bash"?(d(m,"square",700,260,.08,.14),d(m,"sine",110,55,.14,.3)):(f(m,"bandpass",3e3,900,1.3,.1,.16),d(m,"triangle",1318,1318,.08,.12,.02));return}case"counterLost":{if(x.ownerId!==y||!v(m,"cLost"))return;d(m,"sine",880,440,.14,.1);return}case"reviveStart":{if(x.ownerId!==y||!v(m,"reviveS"))return;d(m,"sine",196,165,.5,.2),d(m,"sine",196,165,.45,.1,.28),f(m,"lowpass",500,200,.7,.6,.08);return}case"revive":{if(x.ownerId!==y||!v(m,"reviveG"))return;[392,523.25,659.25,783.99].forEach((E,T)=>d(m,"triangle",E,E,T===3?.45:.14,.2,T*.09));return}case"waveStart":{if(!v(m,"wave"))return;d(m,"sawtooth",220,220,.4,.1),d(m,"sawtooth",330,330,.4,.1,.18),x.index>=x.total-1&&d(m,"sawtooth",440,440,.5,.1,.36);return}case"combo":{if(!v(m,"combo"))return;d(m,"sine",988,988,.14,.2),d(m,"sine",1319,1319,.22,.2,.08),d(m,"triangle",1976,1976,.2,.06,.08);return}case"roundEnd":{let E=x.result==="win",T=E?[523.25,659.25,783.99,1046.5]:[392,349.23,311.13,233.08];T.forEach((L,R)=>{let S=R===T.length-1;d(m,E?"triangle":"sine",L,L,S?.7:.2,.28,R*.17),E&&S&&d(m,"sine",L*1.5,L*1.5,.7,.1,R*.17)});return}default:return}}return{unlock(){let m=c();if(m)try{m.resume();let x=m.createBuffer(1,1,22050),y=m.createBufferSource();y.buffer=x,y.connect(m.destination),y.start(0)}catch{}},play(m,x){if(!(n||!s||!e||m.length===0)){if(s.state!=="running"){s.resume().catch(()=>{});return}for(let y of m)try{p(s,y,x)}catch{}}},setMuted(m){n=m,e&&s&&e.gain.setTargetAtTime(m?0:.5,s.currentTime,.01)}}}function by(s){let e=/v(\d+(?:\.\d+)*)/.exec(s);return e?e[1]:"0"}function My(s,e){let t=s.split(".").map(Number),n=e.split(".").map(Number);for(let i=0;i<Math.max(t.length,n.length);i++){let r=(t[i]||0)-(n[i]||0);if(r)return r}return 0}function Gf(s){if(!/^https?:/.test(location.protocol))return;let e=by(ss),t=document.createElement("button");t.id="updBar",s.appendChild(t);let n=0,i=null;t.addEventListener("click",()=>{i&&location.replace(`${location.pathname}?v=${i}`)});let r=o=>{let a=Date.now();if(!o&&a-n<6e4)return;n=a;let l=`${location.pathname.replace(/[^/]*$/,"")}index.html?upd=${a}`;fetch(l,{cache:"no-store"}).then(c=>c.ok?c.text():"").then(c=>{let h=/<meta name="app-version" content="([\d.]+)"/.exec(c);!h||My(h[1],e)<=0||(i=h[1],t.textContent=`\u{1F195} \u6709\u65B0\u7248 v${i}\uFF0C\u9EDE\u9019\u88E1\u66F4\u65B0`,t.classList.add("on"))}).catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&r(!1)}),addEventListener("pageshow",()=>r(!1)),setTimeout(()=>r(!0),1500)}var qf=new URLSearchParams(location.search),Sy=document.getElementById("game"),wy=document.getElementById("overlay"),Yf=document.getElementById("ui"),Ey=Vo(),Oo=Ff(Sy,wy,Ey),Yh=Vf(),kt=null,Tr=!1,$f=qf.get("ai")!=="0",wr=0,Uo=0,No=0,Er=-1,Yn=Hf(Yf,{onStart:(s,e,t)=>Kf(s,void 0,e,t),onPause:()=>{Tr=!0},onResume:()=>{Tr=!1},getPlayerPos:()=>kt?kt.player.pos:null,screenToGround:(s,e)=>Oo.screenToGround(s,e),onFirstGesture:()=>Yh.unlock(),setMuted:s=>Yh.setMuted(s)});function Kf(s,e,t="s0",n={}){let i=e??(Number(qf.get("seed"))||Date.now()%1e9);kt=t==="v4"?new Go(i,n.path??"ares"):new Dt(s,i,t,n.ledgeDepth??2.6),kt.aiEnabled=$f,Oo.reset(),Yn.showPlaying(),Tr=!1,wr=0,Uo=0,No=0,Er=-1}var Wf=new Map;function qh(s,e,t){let n=performance.now();n-(Wf.get(s)??-1e9)<1200||(Wf.set(s,n),Yn.banner(e,t))}function Ty(s){if(!kt)return;let e=kt.state.playerId;for(let t of s)t.type==="combo"?Yn.banner("\u9023\u62DB\uFF01","good"):t.type==="fall"?t.ownerId===e?Yn.banner("\u589C\u843D\u2026\u2026","bad"):(Yn.banner("\u64CA\u843D\uFF01","good"),No=.6):t.type==="death"&&t.ownerId!==e&&t.cause==="hp"?Yn.banner("\u64CA\u5012\uFF01","good"):t.type==="edgeSave"&&t.ownerId===e?Yn.banner("\u9A5A\u96AA\u6551\u56DE\uFF01","info"):t.type==="shieldBlock"?t.kind==="bearer"&&t.attackerId===e?qh("bearer","\u683C\u64CB","bad"):t.kind==="guard"&&t.targetId===e&&t.skill==="enemyHeavy"?qh("early","\u592A\u65E9","info"):t.kind==="perfect"&&t.targetId===e&&qh("perfect","\u5B8C\u7F8E\u683C\u64CB\uFF01","good"):t.type==="roundEnd"&&(Er=1.3)}var Xf=performance.now();function Zf(s){let e=Math.min(.1,(s-Xf)/1e3);Xf=s;let t=[],n=0;if(kt&&!Tr){if(Uo>0)Uo-=e;else{let i=No>0?.35:1;No=Math.max(0,No-e),wr+=e*i;let r=0;for(;wr>=Cn&&r<6;){kt.step(Yn.readIntent());for(let o of kt.drainEvents())t.push(o);if(wr-=Cn,n+=Cn,r++,kt.hitstop>0){Uo=Math.max(Uo,kt.hitstop),kt.hitstop=0,wr=0;break}}r>=6&&(wr=0)}Ty(t),Yh.play(t,kt.state.playerId),Er>0&&(Er-=e,Er<=0&&(Er=-1,Yn.showResult(kt.state)))}kt&&(Oo.render(kt.state,t,Tr?null:Yn.aimPreview(),n,e),Yn.update(kt.state)),requestAnimationFrame(Zf)}function $h(){let s=window.visualViewport;Oo.resize(s?s.width:innerWidth,s?s.height:innerHeight)}addEventListener("resize",$h);window.visualViewport?.addEventListener("resize",$h);$h();kt=new Dt("1v1",1);kt.aiEnabled=!1;Yn.showTitle();var Ay={state:()=>JSON.parse(JSON.stringify(kt.state)),start:(s,e,t,n)=>Kf(s,e,t,n),setAI:s=>{$f=s,kt&&(kt.aiEnabled=s)},place:(s,e,t)=>kt?.place(s,e,t),kill:(s,e)=>kt?.debugKill(s,e),freeze:s=>{Tr=s},knock:(s,e,t)=>{if(!kt)return;let n=kt.state.fighters.find(i=>i.id!==s);n&&kt.debugDamage(s,n.id,"push",t??0,e)},project:(s,e)=>Oo.worldToScreen(s,e),version:`${ss} (ac97a08)`};window.__hunter=Ay;Gf(Yf);requestAnimationFrame(Zf);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=app.js.map
