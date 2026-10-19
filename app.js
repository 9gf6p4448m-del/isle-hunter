"use strict";(()=>{var Ln=.016666666666666666,Oo={radius:10,points:56,seed:7},uc={hp:100,speed:6.2,radius:.5},dc={hp:100,speed:5,radius:.5},Ar=.5,Bo=.8,Rr=.25,Kn={shots:3,interval:.08,cooldown:.5,speed:24,range:9,radius:.22,dmg:6,autoAimRange:10},$h=3,Nt={windup:.3,cooldown:6,speed:26,range:11,radius:.45,dmg:12,slow:1.6},Vt={windup:.12,recover:.2,cooldown:7,range:3.2,halfAngle:40*Math.PI/180,dmg:10},Dn={base:2.4,lowHpBonus:5.6,slowedBonus:1,knockTime:.35,dashCancelAfter:.1,edgeGrace:.12},dn={distance:3.6,time:.16,cooldown:3.5},Kh=.15,fc={duration:1.2,gravity:30},Tt={hold:.8,protect:.2,climb:.2,landInset:1.2,lock:4,inputKeep:.15,hangOut:.45,catch:.08,landMargin:.35,searchAlong:.6,minInset:.6},Zh=2.5,jt={windup:.3,shots:2,interval:.12,speed:15,range:9,radius:.25,dmg:6,cooldownMin:1.4,cooldownMax:2.1},Kt={windup:.65,recover:.6,cooldown:6,range:3,halfAngle:45*Math.PI/180,dmg:14},zt={think:.15,preferMin:4.5,preferMax:7.5,edgeDanger:2.2,dodgeChance:.35,dodgeReactMin:.22,dodgeReactMax:.4,dodgeCooldown:4,edgeSaveChance:.5,edgeSaveReact:.25,strafeSwitchMin:1.5,strafeSwitchMax:2.5},zo={basic:.025,control:.06,push:.09,enemyBasic:.03,enemyHeavy:.09,melee1:.04,melee2:.04,melee3:.07,charge:.09,counterBash:.09,counterMelee:.04},is=Math.PI/180,be={player:{hp:100,speed:6.2,radius:.5},edgeMargin:.35,melee:[{shape:"line",range:2.2,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"line",range:2.4,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"fan",range:2,width:0,halfAngle:70*is,windup:.18,recover:.3,dmg:12,stun:0,knock:1.6,step:0}],meleeActive:.05,comboWindow:.35,attackMoveMult:.35,target:{keep:3.5,autoRange:3,autoHalfAngle:90*is},recoil:.25,charge:{windup:.1,time:.22,distance:4,cooldown:6,contact:1,autoRange:6,dmg:6,breakDur:1.2,bounce:1,bounceStun:.35,archerStun:.4,hitRecover:.15,missRecover:.3,bounceTime:.12},guard:{moveMult:.4,maxHold:2,lock:1,turnRate:720*is,blockHalfAngle:70*is,perfect:.2,perfectBreak:1,chipDmg:3,pushback:.6,arrowScan:6,threatDrop:8,pushbackTime:.1},counter:{dur:.8,bash:{range:3.2,halfAngle:40*is,dmg:14,knockMult:1.5,aimRange:3.7,recover:.2},melee:{step:.8,aimRange:3.5}},bearer:{hp:90,speed:4,frontHalfAngle:60*is,turnRate:150*is,heavyArmor:.25,approach:2.5},archer:{hp:60,speed:4.5,preferMin:6,preferMax:8,backstepTrigger:2.5,backstep:3,backstepCooldown:4,backstepTime:.25},stack:{window:1.5,hits:3,armor:.8},revive:{count:1,delay:1.5,hpFrac:.5,protect:1.5,edge:1.5,enemyClear:3,grid:.25},waves:{list:[["archer","archer"],["shieldbearer","archer"],["shieldbearer","shieldbearer","archer"]],gap:1.5,markLead:.8,minPlayerDist:5,minEdge:1.5,spacing:1.5,grid:.5},killEdge:2,inputBuffer:.15},ss="v0.4.0";function Ho(){let s=Oo.points,e=Oo.radius,t=Oo.seed,n=[];for(let i=0;i<s;i++){let r=i/s*Math.PI*2,o=e*(1+.07*Math.sin(3*r+t)+.05*Math.sin(5*r+t*2.1)+.03*Math.sin(9*r+t*.7));n.push({x:Math.cos(r)*o,z:Math.sin(r)*o})}return{poly:n,radius:e,rocks:[{pos:{x:-2.6,z:-3},r:1.3},{pos:{x:3.6,z:2.6},r:.85}]}}function Kf(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let r=e[n],o=e[i];r.z>s.z!=o.z>s.z&&s.x<(o.x-r.x)*(s.z-r.z)/(o.z-r.z)+r.x&&(t=!t)}return t}function Ht(s,e){let t=1/0;for(let n=0,i=e.length-1;n<e.length;i=n++)t=Math.min(t,Oi(s,e[i],e[n]));return Kf(s,e)?t:-t}function Oi(s,e,t){let n=t.x-e.x,i=t.z-e.z,r=n*n+i*i,o=r===0?0:Math.max(0,Math.min(1,((s.x-e.x)*n+(s.z-e.z)*i)/r)),a=e.x+n*o-s.x,l=e.z+i*o-s.z;return Math.hypot(a,l)}function Ts(s,e,t,n){return Oi(t,s,e)<n}var Xe=(s,e)=>({x:s.x+e.x,z:s.z+e.z}),Qe=(s,e)=>({x:s.x-e.x,z:s.z-e.z}),se=(s,e)=>({x:s.x*e,z:s.z*e}),st=s=>Math.hypot(s.x,s.z),pt=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z),Gt=(s,e)=>s.x*e.x+s.z*e.z;function ye(s){let e=Math.hypot(s.x,s.z);return e>1e-9?{x:s.x/e,z:s.z/e}:{x:0,z:0}}var As=s=>({x:Math.cos(s),z:Math.sin(s)}),cn=s=>Math.atan2(s.z,s.x),fn=s=>({x:-s.z,z:s.x});function Rs(s,e){let t=Math.cos(e),n=Math.sin(e);return{x:s.x*t-s.z*n,z:s.x*n+s.z*t}}function Jh(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function eu(s,e){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0},wantHeavy:!1,seen:new Set,dodge:null,edgeSaveAt:null,edgeSaveRolled:!1,aggression:e==="1v2"?.18:.28}}var Zf=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null});function jh(s,e,t,n){let i=ye(fn(t)),r=Xe(e.pos,se(i,n)),o=Xe(e.pos,se(i,-n)),a=s.edgeDistance(r),l=s.edgeDistance(o);return Math.max(a,l)<1.2?ye(se(e.pos,-1)):a>=l?i:se(i,-1)}function tu(s,e,t,n){let i=Zf(),r=s.state,o=s.player,a=r.time;if(!o||o.state==="dead"||o.state==="falling")return i;if(e.state==="knocked")return t.edgeSaveRolled||(t.edgeSaveRolled=!0,Gt(ye(e.knockVel),ye(e.pos))>.3&&t.rng()<zt.edgeSaveChance&&(t.edgeSaveAt=a+zt.edgeSaveReact)),t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&s.edgeDistance(e.pos)<2.5&&(t.edgeSaveAt=null,i.dash=!0,i.dashDir=ye(se(e.pos,-1))),i;t.edgeSaveRolled=!1,t.edgeSaveAt=null;for(let d of s.pendingProjectiles()){if(d.team===e.team)continue;let f=`p${d.id}`;if(t.seen.has(f))continue;t.seen.add(f);let v=Qe(e.pos,d.pos),_=Gt(v,d.dir);_<=0||_>8||Math.abs(v.x*d.dir.z-v.z*d.dir.x)>e.radius+d.radius+.3||Qh(s,e,t,d.dir,d.kind==="control"?.9:.35)}if(o.windup&&o.windup.skill==="control"){let d=`w${o.id}:${(a-o.windup.t).toFixed(2)}`;if(!t.seen.has(d)){t.seen.add(d);let f=Qe(e.pos,o.pos),v=Gt(f,o.windup.dir),_=Math.abs(f.x*o.windup.dir.z-f.z*o.windup.dir.x);v>0&&v<Nt.range&&_<e.radius+Nt.radius+.3&&Qh(s,e,t,o.windup.dir,1)}}if(t.seen.size>400&&t.seen.clear(),t.dodge&&a>=t.dodge.at){if(t.dodge.dash)return e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup")&&(i.dash=!0,i.dashDir=t.dodge.dir),t.dodge=null,i;if(a<t.dodge.until)return i.move=t.dodge.dir,i;t.dodge=null}if(e.state!=="idle")return i.move=se(t.move,.5),i;t.thinkT-=n,t.strafeT-=n;let l=Qe(o.pos,e.pos),c=st(l),h=ye(l),u=s.edgeDistance(e.pos);if(t.thinkT<=0){t.thinkT=zt.think,t.strafeT<=0&&(t.strafeT=zt.strafeSwitchMin+(zt.strafeSwitchMax-zt.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1)),!t.wantHeavy&&e.cooldowns.push<=0&&s.heavyOwner===null&&t.rng()<t.aggression&&(t.wantHeavy=!0);let d,f=se(fn(h),t.strafeDir);if(u<zt.edgeDanger)d=ye(Xe(se(ye(se(e.pos,-1)),1.4),se(f,.5)));else if(t.wantHeavy)d=h;else if(c>zt.preferMax)d=ye(Xe(h,se(f,.4)));else if(c<zt.preferMin){let v=se(h,-1);d=s.edgeDistance(Xe(e.pos,se(v,2)))<zt.edgeDanger+.5?f:ye(Xe(v,se(f,.5)))}else d=f;s.edgeDistance(Xe(e.pos,se(d,1.5)))<zt.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,d=ye(se(e.pos,-1)));for(let v of r.island.rocks){let _=Xe(e.pos,se(d,1.2));pt(_,v.pos)<v.r+e.radius+.3&&(d=ye(Xe(d,se(fn(ye(Qe(v.pos,e.pos))),t.strafeDir*1.5))))}t.move=d}if(i.move=t.move,t.wantHeavy){if(s.heavyOwner!==null&&s.heavyOwner!==e.id)t.wantHeavy=!1;else if(c<Kt.range-.4&&e.cooldowns.push<=0)return t.wantHeavy=!1,i.cast={skill:"push",dir:h},i}else if(e.cooldowns.basic<=0&&c<jt.range-.5&&s.lineOfSight(e.pos,o.pos)){let d=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Rs(h,d)}return i}function Qh(s,e,t,n,i){if(t.dodge)return;let r=zt.dodgeReactMin+(zt.dodgeReactMax-zt.dodgeReactMin)*t.rng(),o=t.rng(),a=s.state.time;o<zt.dodgeChance*i&&e.cooldowns.dash<=0?t.dodge={at:a+r,dir:jh(s,e,n,dn.distance),dash:!0,until:0}:o<(zt.dodgeChance+.3)*i&&(t.dodge={at:a+r,dir:jh(s,e,n,1.5),dash:!1,until:a+r+.35})}function su(s){return{rng:s,delay:.3,cursor:0,cdEst:{push:null,control:null,dash:null},strategy:"kite",until:0,reason:"start",distErr:1,risky:!1,preDashed:!1,myControlHitT:-99,edgeSaveAt:null,knockSeenT:-99,lastPerceived:null,moveDir:null,climbAt:null,lastEngageT:0,rockShots:0,stalls:[],decisions:[]}}var Jf=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null}),Cr=Vt.range+.5,jf=.5;function ru(s,e,t){let n=Jf(),i=s.state,r=e,o=s.player,a=i.time,l=t.rng,c=a-t.delay;for(let{t:D,e:I}of s.log)if(!(D<=t.cursor||D>c)){if("ownerId"in I&&I.ownerId===o.id){let O=(l()*2-1)*jf;I.type==="cast"&&I.skill==="push"?t.cdEst.push=D+Vt.cooldown+O:I.type==="shoot"&&I.kind==="control"?t.cdEst.control=D+Nt.cooldown+O:I.type==="dash"&&(t.cdEst.dash=D+dn.cooldown+O,t.lastEngageT=a)}I.type==="hit"&&(I.sourceId===r.id&&I.kind==="control"&&(t.myControlHitT=D),(I.sourceId===r.id||I.targetId===r.id)&&(t.lastEngageT=a)),I.type==="blocked"&&I.ownerId===r.id&&t.rockShots++}if(t.cursor=Math.max(t.cursor,c),r.state==="ledge")return t.climbAt===null&&(t.climbAt=a-r.stateT+.2+l()*.15),a>=t.climbAt&&(t.climbAt=null,n.dash=!0),n;if(t.climbAt=null,r.state==="climb")return n;let h=s.snapshotAt(c);if(!h)return n;t.lastPerceived=h.pos;let u=s.snapshotAt(c-.1),d=u&&h.t-u.t>.05?se(Qe(h.pos,u.pos),1/(h.t-u.t)):{x:0,z:0},f=D=>{let I=se(d,t.delay+D);return st(I)>3&&(I=se(ye(I),3)),Xe(h.pos,I)};if(h.state==="falling"||h.state==="dead")return n;if(r.state==="knocked"){if(t.knockSeenT!==r.stateT&&r.stateT<.02){t.knockSeenT=r.stateT;let D=Gt(ye(r.knockVel),ye(r.pos))>.2&&s.edgeDistance(r.pos)<4;t.edgeSaveAt=D&&r.cooldowns.dash<=0?a+.18+l()*.17:null}return t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&(t.edgeSaveAt=null,n.dash=!0,n.dashDir=ye(se(r.pos,-1))),n}if(t.edgeSaveAt=null,r.state!=="idle"&&r.state!=="windup"&&r.state!=="recover")return n;let v=pt(r.pos,h.pos),_=v*t.distErr,g=ye(Qe(h.pos,r.pos)),p=s.lineOfSight(r.pos,h.pos),m=s.edgeDistance(r.pos),x=t.cdEst.push===null||a>=t.cdEst.push,y=r.cooldowns.push<=0,E=r.cooldowns.control<=0,T=r.cooldowns.dash<=0;if(h.state==="ledge"&&(r.state==="idle"||r.state==="recover"))return n.move=iu(s,r,t,nu(s,r,g),6),y&&_<=Cr-.3&&r.state==="idle"?(n.cast={skill:"push",dir:Ir(r.pos,h.pos,l,4,r.facing)},t.lastEngageT=a):p&&r.state==="idle"&&(n.fire=!0,n.fireDir=Ir(r.pos,h.pos,l,8,r.facing)),n;let P="";m<1.5&&(P="edge");let C=h.windup;if(C&&(C.skill==="push"||C.skill==="control")&&h.t-C.startT<C.dur+.05){let D=Qe(r.pos,h.pos),I=Gt(D,C.dir),O=Math.abs(D.x*C.dir.z-D.z*C.dir.x),W=C.skill==="push"?Cr:Nt.range;I>0&&I<W&&O<(C.skill==="push"?2.2:1.2)&&(P="threat")}if(P==="threat"&&T&&l()<.6){let D=ye(fn(C.dir)),I=Xe(r.pos,se(D,dn.distance)),O=Xe(r.pos,se(D,-dn.distance));return n.dash=!0,n.dashDir=s.edgeDistance(I)>=s.edgeDistance(O)?D:se(D,-1),t.lastEngageT=a,n}if(a>=t.until||P==="edge"&&t.strategy!=="retreat"){t.delay=.25+l()*.15,t.distErr=1+(l()*2-1)*.08,t.risky=l()<.25,t.preDashed=!1;let D=a-t.myControlHitT<1.5,I={approach:.35+(x?0:.45)+(y?.15:-.4)+(h.slowed?.3:0)+(D?.4:0)+(t.risky?.5:0),kite:.45+(_<3.5?.2:0)+(x?.15:0),flank:.25+(p?0:.35),retreat:P==="edge"?5:m<2.5?.6:0},O="kite",W=-1/0;for(let $ of Object.keys(I)){let Z=I[$]+l()*.35;Z>W&&(W=Z,O=$)}t.strategy=O,t.until=a+1+l()*1,t.reason=P==="edge"?"\u9760\u8FD1\u5CF6\u7DE3":`\u5C0D\u624B\u9707\u64CA${x?"\u53EF\u80FD\u53EF\u7528":"\u4F30\u8A08\u51B7\u537B\u4E2D"}${t.risky?"\uFF08\u5192\u96AA\uFF09":""}${D?"\u3001\u525B\u675F\u7E1B\u547D\u4E2D":""}`,t.decisions.push({t:a,strategy:O,reason:t.reason}),t.decisions.length>400&&t.decisions.shift()}let S={x:0,z:0},w=ye(se(r.pos,-1));switch(t.strategy){case"approach":S=g,y&&_<=Cr-.3&&r.state==="idle"&&(n.cast={skill:"push",dir:Ir(r.pos,f(Vt.windup),l,4,r.facing)},t.lastEngageT=a);break;case"kite":{let D=_<5?se(g,-1):_>7?g:{x:0,z:0};if(S=ye(Xe(D,se(fn(g),.8))),!t.preDashed&&T&&x&&_<Cr+.4&&l()<.3)return t.preDashed=!0,n.dash=!0,n.dashDir=ye(Xe(se(g,-1),se(w,.5))),t.lastEngageT=a,n;break}case"flank":S=ye(Xe(se(fn(g),1),se(g,.3)));break;case"retreat":S=w;break}S=nu(s,r,S);let R=t.decisions.length>0&&t.decisions[t.decisions.length-1].t===a;return S=iu(s,r,t,S,R?1/0:v<Cr+1?6:1),n.move=S,r.state==="idle"&&!n.cast&&p&&(E&&_>4&&_<Nt.range-1&&t.strategy!=="retreat"&&l()<.02?(n.cast={skill:"control",dir:Ir(r.pos,f(Nt.windup+_/Nt.speed),l,8,r.facing)},t.lastEngageT=a):_<Kn.range-.5&&(n.fire=!0,n.fireDir=Ir(r.pos,f(_/Kn.speed),l,8,r.facing),_<Kn.range-1&&(t.lastEngageT=a))),a-t.lastEngageT>8&&(t.stalls.push({t:a,strategy:t.strategy,reason:t.reason,dist:Math.round(v*10)/10,los:p,rockShots:t.rockShots}),t.lastEngageT=a,t.rockShots=0),n}function Ir(s,e,t,n,i){let r=(t()*2-1)*(n*Math.PI)/180,o=Qe(e,s);return Rs(st(o)>1e-6?ye(o):{x:Math.cos(i),z:Math.sin(i)},r)}function nu(s,e,t){if(st(t)<.01)return t;let n=ye(t);s.edgeDistance(Xe(e.pos,se(n,1.5)))<1.6&&(n=ye(Xe(n,se(ye(se(e.pos,-1)),1.5))));for(let i of s.state.island.rocks)if(pt(Xe(e.pos,se(n,1.2)),i.pos)<i.r+e.radius+.3){let r=fn(ye(Qe(i.pos,e.pos)));n=ye(Xe(n,se(Gt(r,n)>=0?r:se(r,-1),1.5)))}return n}var Qf=420*Math.PI/180/60;function iu(s,e,t,n,i){if(st(n)<.01)return n;let r=ye(n);if(!t.moveDir)return t.moveDir=r,r;let o=Math.atan2(t.moveDir.z,t.moveDir.x),l=Math.atan2(r.z,r.x)-o;for(;l>Math.PI;)l-=2*Math.PI;for(;l<-Math.PI;)l+=2*Math.PI;let c=s.edgeDistance(Xe(e.pos,se(t.moveDir,1.2)))<1.2,h=Qf*Math.max(i,c?3:1),u=o+Math.max(-h,Math.min(h,l));return t.moveDir={x:Math.cos(u),z:Math.sin(u)},t.moveDir}var rs={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null},Ot=class s{constructor(e,t=1,n="s0",i=2.6){this.aiEnabled=!0;this.hitstop=0;this.coverOverride=null;this.heavyOwner=null;this.events=[];this.nextId=1;this.bursts=new Map;this.ai=new Map;this.mirror=new Map;this.outsideT=new Map;this.dashMoved=new Map;this.dashBuf=new Map;this.outSource=new Map;this.ledge=new Map;this.ledgeLock=new Map;this.edgeRec=new Map;this.fallVel=new Map;this.lastHitKind=new Map;this.controlMark=new Map;this.ended=!1;this.log=[];this.history=[];this.rng=Jh(t);let r=Ho(),o=n!=="s0"?"hunter":"s0enemy",a=[this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"hunter")];e==="1v1"?a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:.5,z:-4.5},Math.PI/2,o)):e!=="waves"&&(a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:-3.8,z:-4.2},Math.PI/2,o)),a.push(this.makeFighter("enemy",2,"\u6A58\u7375\u624B",{x:4.6,z:-3},Math.PI/2,o)));for(let l of a)l.team==="enemy"&&(l.kit==="hunter"?this.mirror.set(l.id,su(this.rng)):this.ai.set(l.id,eu(this.rng,e)));this.state={time:0,mode:e,variant:n,island:r,fighters:a,projectiles:[],playerId:a[0].id,result:null,loseText:null,ledgeDepth:n==="v3"?i:null,edgeLog:[],stats:{shotsFired:0,shotsHit:0,combos:0,kills:{fall:0,hp:0}}}}makeFighter(e,t,n,i,r,o){let a=o==="hunter",l=a?uc:dc,c=a?{basic:Kn.cooldown,control:Nt.cooldown,push:Vt.cooldown,dash:dn.cooldown}:{basic:jt.cooldownMax,control:0,push:Kt.cooldown,dash:zt.dodgeCooldown};return{id:this.nextId++,team:e,variant:t,kit:o,name:n,pos:{...i},y:0,facing:r,moveVel:{x:0,z:0},radius:l.radius,hp:l.hp,maxHp:l.hp,state:"idle",stateT:0,windup:null,burstLeft:0,cooldowns:{basic:0,control:0,push:a?0:2.5,dash:0},cooldownMax:c,slowT:0,invulnT:0,hitFlashT:0,sinceShotT:99,knockVel:{x:0,z:0},deathCause:null,lastHitBy:null,lastHitAt:-99}}get player(){return this.state.fighters[0]}fighter(e){return this.state.fighters.find(t=>t.id===e)}drainEvents(){let e=this.events;return this.events=[],e}emit(e){this.events.push(e),this.log.push({t:this.state?this.state.time:0,e})}recordHistory(){let e=this.player,t=this.state.time;for(this.history.push({t,pos:{...e.pos},facing:e.facing,state:e.state,windup:e.windup?{skill:e.windup.skill,dir:{...e.windup.dir},startT:t-e.windup.t,dur:e.windup.dur}:null,slowed:e.slowT>0});this.history.length&&this.history[0].t<t-1.5;)this.history.shift();for(;this.log.length&&this.log[0].t<t-3;)this.log.shift()}snapshotAt(e){for(let t=this.history.length-1;t>=0;t--)if(this.history[t].t<=e+1e-9)return this.history[t];return null}static alive(e){return e.state!=="dead"&&e.state!=="falling"&&e.state!=="reviving"}canLedge(e){return this.state.variant==="v3"}step(e){let t=this.state,n=Ln;t.time+=n;for(let i of t.fighters)this.tickTimers(i,n);for(let i of t.fighters){if(!s.alive(i))continue;let r;this.ended?r=rs:i.team==="player"?r=e:this.aiEnabled?i.kit==="hunter"?r=ru(this,i,this.mirror.get(i.id)):r=tu(this,i,this.ai.get(i.id),n):r=rs,this.control(i,r)}for(let i of t.fighters)this.advance(i,n);this.separate(),this.moveProjectiles(n),this.checkEnd(),this.recordHistory()}tickTimers(e,t){e.stateT+=t;for(let n of["basic","control","push","dash"])e.cooldowns[n]=Math.max(0,e.cooldowns[n]-t);e.slowT=Math.max(0,e.slowT-t),e.invulnT=Math.max(0,e.invulnT-t),e.hitFlashT=Math.max(0,e.hitFlashT-t),e.sinceShotT+=t}setState(e,t){e.state=t,e.stateT=0}facingDir(e){return As(e.facing)}autoTarget(e,t){let n=null,i=1/0;for(let r of this.state.fighters){if(r.team===e.team||!s.alive(r))continue;let o=pt(e.pos,r.pos);if(o>t)continue;let a=o+(this.lineOfSight(e.pos,r.pos)?0:6);a<i&&(i=a,n=r)}return n}lineOfSight(e,t){return!this.state.island.rocks.some(n=>Ts(e,t,n.pos,n.r))}aimOrAuto(e,t,n){if(t&&st(t)>.01)return ye(t);if(e.team==="enemy"&&e.kit==="hunter")return this.facingDir(e);let i=this.autoTarget(e,n);return i?ye(Qe(i.pos,e.pos)):this.facingDir(e)}control(e,t){if(e.state==="ledge"){e.moveVel={x:0,z:0},t.dash&&this.startClimb(e,"accepted@"+this.state.time.toFixed(2));return}if(e.state==="climb"){e.moveVel={x:0,z:0};return}if(this.state.variant!=="s0"){if(this.controlDashBuffered(e,t))return}else if(t.dash&&e.cooldowns.dash<=0&&this.canDash(e)){this.startDash(e,t);return}if(e.state==="idle"&&t.cast){if(e.kit==="hunter"){let n=t.cast.skill;if(e.cooldowns[n]<=0){let i=n==="control"?Nt.range:Vt.range+2;this.startWindup(e,n,this.aimOrAuto(e,t.cast.dir,i),n==="control"?Nt.windup:Vt.windup);return}}else if(t.cast.skill==="push"&&e.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===e.id)){this.heavyOwner=e.id,this.startWindup(e,"enemyHeavy",this.aimOrAuto(e,t.cast.dir,6),Kt.windup);return}}if(e.state==="idle"&&t.fire&&e.burstLeft===0&&e.cooldowns.basic<=0)if(e.kit==="hunter"){let n=this.aimOrAuto(e,t.fireDir,Kn.autoAimRange);e.burstLeft=Kn.shots,e.cooldowns.basic=Kn.cooldown,this.bursts.set(e.id,{dir:n,timer:0,kind:"basic"}),e.facing=cn(n)}else{this.startWindup(e,"enemyBasic",this.aimOrAuto(e,t.fireDir,jt.range),jt.windup);return}if(e.state==="idle"||e.state==="windup"||e.state==="recover"){let n=t.move,i=st(n);i>1&&(n=se(n,1/i));let r=e.kit==="hunter"?uc.speed:dc.speed;e.slowT>0&&(r*=Ar),e.burstLeft>0&&(r*=Bo),e.state==="windup"&&(r*=Rr),e.state==="recover"&&(r*=.3),e.moveVel=se(n,r);let o=e.team==="enemy"&&e.kit==="hunter"&&e.sinceShotT<.6;e.state==="idle"&&e.burstLeft===0&&i>.1&&!o&&(e.facing=cn(n))}else e.moveVel={x:0,z:0}}canDash(e){return e.state==="idle"||e.state==="windup"||e.state==="knocked"&&e.stateT>=Dn.dashCancelAfter}controlDashBuffered(e,t){if(t.dash){let i=t.dashDir&&st(t.dashDir)>.01?ye(t.dashDir):st(t.move)>.2?ye(t.move):this.facingDir(e);e.cooldowns.dash>0?this.canLedge(e)?this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!1}):this.dashBuf.delete(e.id):this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!0})}let n=this.dashBuf.get(e.id);return n?this.state.time-n.at>Kh+1e-9?(this.dashBuf.delete(e.id),!1):e.state==="knocked"&&e.stateT<Dn.dashCancelAfter||!n.dashOk?!1:e.cooldowns.dash>0||!this.canDash(e)?(this.canLedge(e)?n.dashOk=!1:this.dashBuf.delete(e.id),!1):(this.dashBuf.delete(e.id),this.startDash(e,{...rs,dashDir:n.dir}),!0):!1}predictedKnockStop(e){let t={...e.pos},n=e.stateT;for(;n<Dn.knockTime-1e-9;){n+=Ln;let i=1-Math.min(1,n/Dn.knockTime);t=Xe(t,se(e.knockVel,Ln*i))}return t}nearestEdgePoint(e){let t=this.state.island.poly,n=t[0],i=1/0;for(let r=0,o=t.length-1;r<t.length;o=r++){let a=t[o],l=t[r],c=Qe(l,a),h=Gt(c,c),u=h===0?0:Math.max(0,Math.min(1,Gt(Qe(e,a),c)/h)),d=Xe(a,se(c,u)),f=pt(e,d);f<i&&(i=f,n=d)}return n}climbPathOk(e,t,n){return Ht(n,this.state.island.poly)>=Tt.landMargin&&this.state.island.rocks.every(i=>pt(n,i.pos)>=i.r+e.radius&&Oi(i.pos,t,n)>=i.r+e.radius)}findLanding(e,t,n,i){let r={x:-n.z,z:n.x},o=(a,l)=>this.climbPathOk(e,i??a,l);for(let a of[Tt.landInset,(Tt.landInset+Tt.minInset)/2,Tt.minInset])for(let l of[0,.2,-.2,.4,-.4,Tt.searchAlong,-Tt.searchAlong]){let c=t,h=n;if(l!==0){let f=Xe(Xe(t,se(r,l)),se(n,-.5));c=this.nearestEdgePoint(f);let v=Qe(c,f);if(st(v)<1e-6)continue;h=ye(v)}let u=Xe(c,se(h,-Tt.hangOut)),d=Xe(c,se(h,a));if(o(u,d))return{edge:c,inward:h,land:d}}return null}tryLedge(e,t){let n=this.state,i=n.ledgeDepth??2.6,r=this.edgeRec.get(e.id),o=this.outSource.get(e.id)??"knock";r||(r={t:Math.round(n.time*100)/100,who:e.name,source:o,depth:null,basis:null,eligible:!1,reason:null,input:"none",outcome:"pending"},this.edgeRec.set(e.id,r),n.edgeLog.push(r),n.edgeLog.length>20&&n.edgeLog.shift());let a=r,l=m=>(a.eligible=!1,a.reason=m,!1);if(o==="dash")return l("dash-out");let c=t==="predicted"?this.predictedKnockStop(e):e.pos,h=-Ht(c,n.island.poly);a.depth=h,a.basis=t;let u=this.ledgeLock.get(e.id);if(u&&(n.time<u.until-1e-9||!u.landed))return l("locked");if(h>i)return l("too-deep");let d=this.nearestEdgePoint(e.pos),f=Qe(d,e.pos),v=st(f)>1e-6?ye(f):ye(se(e.pos,-1)),_=this.findLanding(e,d,v);if(!_)return l("no-landing");a.eligible=!0,a.reason=null;let g=Xe(_.edge,se(_.inward,-Tt.hangOut));this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel={x:0,z:0},e.moveVel={x:0,z:0},e.facing=cn(_.inward),e.invulnT=Math.max(e.invulnT,Tt.protect),this.outsideT.set(e.id,0),this.ledge.set(e.id,{start:{...e.pos},hang:g,edge:_.edge,inward:_.inward,land:_.land,climbFrom:null,climbQueued:!1,rec:a}),this.ledgeLock.set(e.id,{until:n.time+Tt.lock,landed:!1}),this.setState(e,"ledge"),this.emit({type:"ledgeGrab",ownerId:e.id,pos:g,edge:_.edge,inward:_.inward,depth:h});let p=this.dashBuf.get(e.id);return this.dashBuf.delete(e.id),p&&n.time-p.at<=Tt.inputKeep+1e-9&&this.startClimb(e,"buffered@"+p.at.toFixed(2)),!0}startClimb(e,t){let n=this.ledge.get(e.id);if(!n||n.climbQueued)return;n.rec.input=t;let i={...e.pos};if(!this.climbPathOk(e,i,n.land)){let r=this.findLanding(e,n.edge,n.inward,i);if(r)n.land=r.land;else{n.climbQueued=!0;return}}this.beginClimb(e,i)}beginClimb(e,t){let n=this.ledge.get(e.id);n.climbFrom={...t},this.setState(e,"climb"),this.emit({type:"ledgeClimb",ownerId:e.id,from:{...t},to:{...n.land}})}dropLedge(e,t,n){let i=this.ledge.get(e.id);i&&(i.rec.outcome=t),this.edgeRec.delete(e.id),this.emit({type:"ledgeDrop",ownerId:e.id,reason:t}),this.startFall(e,se(ye(n),2))}onBackOnIsland(e){let t=this.edgeRec.get(e.id);t&&t.outcome==="pending"&&(t.outcome="rescue"),this.edgeRec.delete(e.id),this.outSource.delete(e.id)}startWindup(e,t,n,i){e.windup={skill:t,t:0,dur:i,dir:n},e.facing=cn(n),this.setState(e,"windup"),this.emit({type:"windupStart",ownerId:e.id,skill:t,dir:n,dur:i})}cancelWindup(e){e.windup&&(this.emit({type:"cancel",ownerId:e.id,skill:e.windup.skill}),e.windup.skill==="enemyHeavy"&&this.heavyOwner===e.id&&(this.heavyOwner=null),e.windup=null)}startDash(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id);let n=t.dashDir&&st(t.dashDir)>.01?ye(t.dashDir):null;!n&&st(t.move)>.2&&(n=ye(t.move)),n||(n=this.facingDir(e)),e.state==="knocked"&&Ht(e.pos,this.state.island.poly)<2.5&&this.emit({type:"edgeSave",ownerId:e.id}),this.outSource.set(e.id,e.state==="knocked"?"knock":"dash"),e.knockVel=se(n,dn.distance/dn.time),e.facing=cn(n),e.cooldowns.dash=e.cooldownMax.dash,e.invulnT=dn.time+.04,this.dashMoved.set(e.id,0),this.outsideT.set(e.id,0),this.setState(e,"dash"),this.emit({type:"dash",ownerId:e.id,from:{...e.pos},dir:n})}advance(e,t){let n=this.state.island.poly;switch(e.state){case"dead":return;case"falling":{let i=this.fallVel.get(e.id)??{x:0,z:0};e.pos=Xe(e.pos,se(i,t)),e.y=-.5*fc.gravity*e.stateT*e.stateT,e.stateT>=fc.duration&&this.die(e,"fall");return}case"windup":{let i=e.windup;i.t+=t,this.walk(e,t),i.t>=i.dur&&this.releaseWindup(e);break}case"recover":this.walk(e,t),e.stateT>=(e.kit==="hunter"?Vt.recover:Kt.recover)&&this.setState(e,"idle");break;case"dash":{let i=this.dashMoved.get(e.id)??0,r=Math.min(t,dn.time-i);if(e.pos=Xe(e.pos,se(e.knockVel,r)),this.dashMoved.set(e.id,i+r),this.pushOutOfRocks(e),i+r>=dn.time-1e-9){let o=ye(e.knockVel);if(e.knockVel={x:0,z:0},Ht(e.pos,n)<0){if(this.canLedge(e)&&this.tryLedge(e,"actual"))return;this.startFall(e,se(o,2));return}this.onBackOnIsland(e),this.setState(e,"idle")}break}case"knocked":{let i=1-Math.min(1,e.stateT/Dn.knockTime);if(e.pos=Xe(e.pos,se(e.knockVel,t*i)),this.pushOutOfRocks(e),Ht(e.pos,n)<0){if(this.canLedge(e)&&(this.outsideT.get(e.id)??0)===0&&this.tryLedge(e,"predicted"))return;let r=(this.outsideT.get(e.id)??0)+t;if(this.outsideT.set(e.id,r),r>Dn.edgeGrace){this.startFall(e,se(e.knockVel,.5*Math.max(i,.3)));return}}else this.outsideT.set(e.id,0);if(e.stateT>=Dn.knockTime){if(Ht(e.pos,n)<0){this.startFall(e,se(ye(e.knockVel),1.5));return}e.knockVel={x:0,z:0},this.onBackOnIsland(e),this.setState(e,"idle")}break}case"ledge":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Tt.catch);if(e.pos=Xe(i.start,se(Qe(i.hang,i.start),r)),i.climbQueued&&r>=1){i.climbQueued=!1,this.beginClimb(e,i.hang);return}e.stateT>=Tt.hold-1e-9&&this.dropLedge(e,"timeout",se(i.inward,-1));return}case"climb":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Tt.climb);e.pos=Xe(i.climbFrom,se(Qe(i.land,i.climbFrom),r)),r>=1-1e-9&&(this.ledgeLock.get(e.id).landed=!0,i.rec.outcome="climbed",this.ledge.delete(e.id),this.outSource.delete(e.id),this.edgeRec.delete(e.id),this.setState(e,"idle"));return}case"idle":this.walk(e,t);break}if((e.state==="idle"||e.state==="windup"||e.state==="recover")&&Ht(e.pos,n)<0){this.startFall(e,{x:0,z:0});return}this.tickBurst(e,t)}walk(e,t){let n=this.state.island.poly,i=.35,r=Ht(e.pos,n),o=c=>{let h=Ht(c,n);return h>=i||h>=r},a=se(e.moveVel,t);if(a.x===0&&a.z===0)return;let l=Xe(e.pos,a);if(o(l))e.pos=l;else{let c={x:e.pos.x+a.x,z:e.pos.z},h={x:e.pos.x,z:e.pos.z+a.z};o(c)?e.pos=c:o(h)&&(e.pos=h)}this.pushOutOfRocks(e)}pushOutOfRocks(e){for(let t of this.state.island.rocks){let n=Qe(e.pos,t.pos),i=st(n),r=t.r+e.radius;i<r&&(e.pos=Xe(t.pos,se(i>1e-6?se(n,1/i):{x:1,z:0},r)))}}separate(){let e=this.state.fighters.filter(t=>s.alive(t)&&t.state!=="dash"&&t.state!=="ledge"&&t.state!=="climb");for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],r=e[n],o=Qe(r.pos,i.pos),a=st(o),l=i.radius+r.radius;if(a<l&&a>1e-6){let c=se(o,(l-a)/a/2),h=this.state.island.poly,u=(v,_)=>{let g=Ht(_,h);return g>=.35||g>=Ht(v.pos,h)},d=Qe(i.pos,c),f=Xe(r.pos,c);i.state!=="knocked"&&u(i,d)&&(i.pos=d),r.state!=="knocked"&&u(r,f)&&(r.pos=f)}}for(let t of e)this.pushOutOfRocks(t)}tickBurst(e,t){if(e.burstLeft<=0||!s.alive(e))return;let n=this.bursts.get(e.id);if(!n){e.burstLeft=0;return}if(n.timer-=t,n.timer>0)return;let i=n.kind==="basic"?Kn:jt;this.spawnProjectile(e,n.kind,n.dir,i.speed,i.range,i.radius),e.team==="player"&&this.state.stats.shotsFired++,e.sinceShotT=0,e.burstLeft--,n.timer=i.interval,e.burstLeft<=0&&this.bursts.delete(e.id)}spawnProjectile(e,t,n,i,r,o){let a=Xe(e.pos,se(n,e.radius+.15));this.state.projectiles.push({id:this.nextId++,kind:t,ownerId:e.id,team:e.team,pos:a,dir:{...n},speed:i,traveled:0,range:r,radius:o,alive:!0}),this.emit({type:"shoot",ownerId:e.id,kind:t,pos:{...a},dir:{...n}})}releaseWindup(e){let t=e.windup;switch(e.windup=null,t.skill){case"control":this.spawnProjectile(e,"control",t.dir,Nt.speed,Nt.range,Nt.radius),e.sinceShotT=0,e.cooldowns.control=Nt.cooldown,this.setState(e,"idle");break;case"push":this.coneStrike(e,t.dir,Vt.range,Vt.halfAngle,Vt.dmg,"push"),e.cooldowns.push=Vt.cooldown,this.setState(e,"recover");break;case"enemyBasic":{let n=jt.cooldownMin+(jt.cooldownMax-jt.cooldownMin)*this.rng();e.cooldowns.basic=this.state.mode==="1v2"?n*1.4:n,e.burstLeft=jt.shots,this.bursts.set(e.id,{dir:t.dir,timer:0,kind:"enemyBasic"}),this.setState(e,"idle");break}case"enemyHeavy":this.coneStrike(e,t.dir,Kt.range,Kt.halfAngle,Kt.dmg,"enemyHeavy"),e.cooldowns.push=Kt.cooldown,this.heavyOwner===e.id&&(this.heavyOwner=null),this.setState(e,"recover");break}}coneStrike(e,t,n,i,r,o){this.emit({type:"cast",ownerId:e.id,skill:o,pos:{...e.pos},dir:{...t}});for(let a of this.state.fighters){if(a.team===e.team||!s.alive(a))continue;let l=Qe(a.pos,e.pos),c=st(l);if(!(c>n+a.radius||!(c<.6||Gt(se(l,1/c),t)>=Math.cos(i)))){if(this.coverOverride??this.state.variant!=="s0"){let u=this.rockOnSegment(e.pos,a.pos);if(u){this.emit({type:"blockedStrike",ownerId:e.id,targetId:a.id,skill:o,pos:u,dir:{...t}});continue}}this.damage(a,e,o,r,t)}}}rockOnSegment(e,t){let i=1/0,r=null,o=Qe(t,e),a=Gt(o,o);for(let l of this.state.island.rocks){if(Oi(l.pos,e,t)>=l.r-1e-6)continue;let c=Qe(e,l.pos),h=2*Gt(c,o),u=Gt(c,c)-l.r*l.r,d=Math.max(0,h*h-4*a*u),f=a>0?Math.max(0,(-h-Math.sqrt(d))/(2*a)):0;f<i&&(i=f,r=Xe(e,se(o,f)))}return r}static knockDistance(e,t,n){return Dn.base+Dn.lowHpBonus*(1-Math.max(0,e)/t)+(n?Dn.slowedBonus:0)}damage(e,t,n,i,r){if(!s.alive(e)||e.invulnT>0)return!1;let o=this.state,a=e.slowT>0;e.hp=Math.max(0,e.hp-i),e.hitFlashT=.12,e.lastHitBy=t.id,e.lastHitAt=o.time,this.lastHitKind.set(e.id,n),this.state.variant!=="s0"&&n==="basic"||(this.hitstop=Math.max(this.hitstop,zo[n])),n==="control"&&(e.slowT=Nt.slow,t.team==="player"&&this.controlMark.set(e.id,o.time));let l=0;if(r&&e.hp>0&&e.state==="ledge")return this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:{...r},dmg:i,knock:0}),this.dropLedge(e,"knocked",r),!0;if(r&&e.hp>0){if(e.state==="climb"){let c=this.ledge.get(e.id);c&&(c.rec.outcome="knocked",this.ledge.delete(e.id),this.edgeRec.delete(e.id))}this.outSource.set(e.id,"knock"),l=s.knockDistance(e.hp,e.maxHp,a),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel=se(r,2*l/Dn.knockTime),e.facing=cn(se(r,-1)),this.outsideT.set(e.id,0),this.setState(e,"knocked")}if(this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:r?{...r}:ye(Qe(e.pos,t.pos)),dmg:i,knock:l}),n==="push"&&t.team==="player"){let c=this.controlMark.get(e.id);c!==void 0&&o.time-c<=Zh&&(o.stats.combos++,this.controlMark.delete(e.id),this.emit({type:"combo",ownerId:t.id,targetId:e.id}))}return e.hp<=0&&(this.cancelWindup(e),this.die(e,"hp")),!0}startFall(e,t){this.dashBuf.delete(e.id);let n=this.edgeRec.get(e.id);n&&n.outcome==="pending"&&(n.outcome="fall"),this.edgeRec.delete(e.id),this.ledge.delete(e.id),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),this.fallVel.set(e.id,t),e.moveVel={x:0,z:0},this.setState(e,"falling"),this.emit({type:"fall",ownerId:e.id,pos:{...e.pos}})}die(e,t){if(this.dashBuf.delete(e.id),t==="hp"){let r=this.ledge.get(e.id);r&&r.rec.outcome==="pending"&&(r.rec.outcome="hp");let o=this.edgeRec.get(e.id);o&&o.outcome==="pending"&&(o.outcome="hp"),this.ledge.delete(e.id),this.edgeRec.delete(e.id)}let n=this.state;e.deathCause=t,e.knockVel={x:0,z:0},this.setState(e,"dead");let i=e.lastHitBy!==null&&n.time-e.lastHitAt<4?e.lastHitBy:null;e.team==="enemy"&&i===n.playerId&&n.stats.kills[t]++,this.emit({type:"death",ownerId:e.id,cause:t,pos:{...e.pos},killerId:i})}moveProjectiles(e){let t=this.state;for(let n of t.projectiles){if(!n.alive)continue;let i=n.pos,r=n.speed*e,o=Xe(i,se(n.dir,r));if(n.traveled+=r,t.island.rocks.some(c=>Ts(i,o,c.pos,c.r+n.radius*.5))){n.alive=!1,this.emit({type:"blocked",pos:o,kind:n.kind,ownerId:n.ownerId});continue}let a=null,l=1/0;for(let c of t.fighters)if(!(c.team===n.team||!s.alive(c)||c.invulnT>0)&&Oi(c.pos,i,o)<c.radius+n.radius){let h=pt(i,c.pos);h<l&&(l=h,a=c)}if(n.pos=o,a){n.alive=!1;let c=this.fighter(n.ownerId),h=n.kind,u=this.state.variant!=="s0"?$h:Kn.dmg,d=n.kind==="basic"?u:n.kind==="control"?Nt.dmg:jt.dmg;this.damage(a,c,h,d,null)&&n.team==="player"&&n.kind==="basic"&&t.stats.shotsHit++;continue}n.traveled>=n.range&&(n.alive=!1,this.emit({type:"expire",pos:o,kind:n.kind}))}t.projectiles=t.projectiles.filter(n=>n.alive)}checkEnd(){if(this.ended)return;let e=this.state,t=this.player;t.state==="dead"?(e.result="lose",e.loseText=this.loseText(t)):e.fighters.every(n=>n.team==="player"||n.state==="dead")&&(e.result="win"),e.result&&(this.ended=!0,this.dashBuf.clear(),this.emit({type:"roundEnd",result:e.result}))}loseText(e){let t=this.state,n=e.lastHitBy!==null&&t.time-e.lastHitAt<4?this.fighter(e.lastHitBy):void 0,i=this.lastHitKind.get(e.id);return e.deathCause==="fall"?n?i==="enemyHeavy"?`\u88AB${n.name}\u7684\u91CD\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u770B\u5230\u7D05\u8272\u6247\u5F62\u5C31\u5F80\u5074\u908A\u9583\uFF0C\u6216\u7528\u885D\u523A\u8EB2\u958B`:i==="push"?`\u88AB${n.name}\u7684\u9707\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u6CE8\u610F\u7260\u9760\u8FD1\u7684\u8DDD\u96E2\uFF0C\u6216\u9810\u5224\u885D\u523A\uFF1B\u88AB\u64CA\u98DB\u6642\u63D0\u65E9\u6309\u885D\u523A\u6709\u6A5F\u6703\u6551\u56DE`:`\u88AB${n.name}\u903C\u4E0B\u61F8\u5D16\u2014\u2014\u88AB\u64CA\u98DB\u6642\u53EF\u4EE5\u99AC\u4E0A\u885D\u523A\u56DE\u5CF6\u4E0A`:"\u4F60\u81EA\u5DF1\u885D\u51FA\u4E86\u61F8\u5D16\u2014\u2014\u885D\u523A\u524D\u5148\u770B\u8173\u4E0B":n?`\u751F\u547D\u88AB${n.name}\u6253\u5230\u6B78\u96F6\u2014\u2014\u5728\u7260\u51FA\u62DB\u5F8C\u7684\u7A7A\u6A94\u53CD\u64CA\uFF0C\u5225\u786C\u62DA`:"\u751F\u547D\u6B78\u96F6"}edgeDistance(e){return Ht(e,this.state.island.poly)}pendingProjectiles(){return this.state.projectiles}place(e,t,n){let i=this.fighter(e);i&&(i.pos={...t},n!==void 0&&(i.facing=n))}debugKill(e,t){let n=this.fighter(e);!n||!s.alive(n)||(t==="hp"?(n.hp=0,this.die(n,"hp")):this.startFall(n,{x:0,z:0}))}debugDamage(e,t,n,i,r){let o=this.fighter(e),a=this.fighter(t);return o&&a?this.damage(o,a,n,i,r):!1}};function ou(s){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0}}}var au=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null,face:null});function lu(s){return s.state!=="dead"&&s.state!=="falling"&&s.state!=="reviving"}function cu(s,e,t,n){let i=t;for(let r of s.state.island.rocks){let o=Xe(e.pos,se(i,1.2));pt(o,r.pos)<r.r+e.radius+.3&&(i=ye(Xe(i,se(fn(ye(Qe(r.pos,e.pos))),n*1.5))))}return i}function hu(s,e,t,n){let i=au(),r=s.player;if(!lu(r))return i;let o=Qe(r.pos,e.pos),a=st(o),l=a>1e-6?se(o,1/a):{x:Math.cos(e.facing),z:Math.sin(e.facing)};if(i.face=l,e.state!=="idle")return i;if(a<=be.bearer.approach&&e.cooldowns.push<=0&&(s.heavyOwner===null||s.heavyOwner===e.id)&&(e.breakT??0)<=0)return i.cast={skill:"push",dir:null},i;let c=a>1.4?l:{x:0,z:0};return st(c)>0&&(c=cu(s,e,c,t.strafeDir),s.edgeDistance(Xe(e.pos,se(c,1.2)))<.8&&(c=ye(Xe(c,se(ye(se(e.pos,-1)),.8))))),i.move=c,i}function uu(s,e,t,n){let i=au(),r=s.player;if(!lu(r))return i;let o=Qe(r.pos,e.pos),a=st(o),l=a>1e-6?se(o,1/a):{x:1,z:0};if(e.state!=="idle")return i.move=se(t.move,.5),i;if(a<be.archer.backstepTrigger&&e.cooldowns.dash<=0)return i.dash=!0,i.dashDir=ep(s,e,l),i;if(t.thinkT-=n,t.strafeT-=n,t.thinkT<=0){t.thinkT=zt.think,t.strafeT<=0&&(t.strafeT=zt.strafeSwitchMin+(zt.strafeSwitchMax-zt.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1));let c=se(fn(l),t.strafeDir),h,u=be.archer;if(r.state==="guard"&&r.shieldDir){let d=ye(fn(r.shieldDir)),f=se(d,-1),v=Xe(r.pos,se(d,(u.preferMin+u.preferMax)/2)),_=Xe(r.pos,se(f,(u.preferMin+u.preferMax)/2)),g=s.edgeDistance(v)>1.5?pt(v,e.pos):1/0,p=s.edgeDistance(_)>1.5?pt(_,e.pos):1/0,m=g<=p?v:_;h=pt(m,e.pos)>.6?ye(Qe(m,e.pos)):c}else if(a>u.preferMax)h=ye(Xe(l,se(c,.4)));else if(a<u.preferMin){let d=se(l,-1);h=s.edgeDistance(Xe(e.pos,se(d,2)))<zt.edgeDanger+.5?c:ye(Xe(d,se(c,.5)))}else h=c;s.edgeDistance(Xe(e.pos,se(h,1.5)))<zt.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,h=ye(se(e.pos,-1))),t.move=cu(s,e,h,t.strafeDir)}if(i.move=t.move,e.cooldowns.basic<=0&&a<jt.range-.5&&s.lineOfSight(e.pos,r.pos)){let c=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Rs(l,c)}return i}function ep(s,e,t){let n=se(t,-1),i=[n,ye(Xe(n,fn(t))),ye(Qe(n,fn(t))),ye(fn(t)),se(ye(fn(t)),-1)],r=n,o=-1/0;for(let a of i){let l=s.edgeDistance(Xe(e.pos,se(a,be.archer.backstep)));if(a===n&&l>=1)return n;l>o&&(o=l,r=a)}return r}var yt=1e-9;function du(s,e){let t=st(s),n=st(e);return t<1e-12||n<1e-12?Math.PI:Math.acos(Math.max(-1,Math.min(1,Gt(s,e)/(t*n))))}function tp(s,e,t){let n=Math.atan2(s.x*e.z-s.z*e.x,Gt(s,e));return Math.abs(n)<=t+yt?ye(e):As(cn(s)+Math.sign(n)*t)}function np(s,e,t){let n=e-s;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return Math.abs(n)<=t?e:s+Math.sign(n)*t}var fu={dash:0,bash:1,counterMelee:1,guard:2,throw:3,charge:3,push:3,fire:4},pu={1:"melee1",2:"melee2",3:"melee3"},pc=s=>s==="melee1"||s==="melee2"||s==="melee3",Vo=class extends Ot{constructor(t=1,n="ares"){super("waves",t,"v4");this.scripted=new Map;this.fxMap=new Map;this.aiV4=new Map;this.buf=null;this.combo=null;this.comboManualDir=null;this.lastMeleeTarget=null;this.guardSt=null;this.counter=null;this.threat=null;this.waveIdx=0;this.wavePhase="fight";this.waveClearAt=0;this.waveMembers=[];this.pendingSpawns=[];this.nextId=1;let i=this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"guardian");i.hp=i.maxHp=be.player.hp,i.radius=be.player.radius,i.cooldowns={basic:0,control:0,push:0,dash:0},i.cooldownMax={basic:0,control:Nt.cooldown,push:n==="ares"?be.charge.cooldown:n==="none"?Vt.cooldown:be.guard.lock,dash:dn.cooldown},i.path=n,this.initV4Fields(i),i.shieldDir=n==="mars"?As(i.facing):null,this.state.fighters=[i],this.state.playerId=i.id,this.state.ledgeDepth=2.6,this.state.v4={path:n,wave:{index:0,total:be.waves.list.length,remaining:0},revivesLeft:be.revive.count,kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0}},this.spawnWave(1,this.chooseSpawns(be.waves.list[0].length)),this.sync(i)}initV4Fields(t){t.breakT=0,t.armorT=0,t.armorKind=null,t.shieldDir=null,t.shieldUp=!1,t.guard=null,t.counterT=0,t.counterTargetId=null,t.meleeStep=0,t.protectT=0}fx(t){let n=this.fxMap.get(t.id);return n||(n={hitstunT:0,stunKind:null,heavyArmor:!1,stackArmorT:0,stackHits:[],act:null,slide:null,noTurnUntil:-1},this.fxMap.set(t.id,n)),n}canLedge(t){return t.team==="player"}enemies(){return this.state.fighters.filter(t=>t.team==="enemy"&&Ot.alive(t))}armored(t){let n=this.fx(t);return n.heavyArmor||n.stackArmorT>0}coverOn(){return this.coverOverride??!0}step(t){let n=this.state,i=Ln;n.time+=i;for(let r of n.fighters)this.tickTimers(r,i);for(let r of n.fighters)Ot.alive(r)&&this.settle(r);for(let r of n.fighters){if(!Ot.alive(r))continue;let o;if(this.ended)o=rs;else if(r.team==="player")o=t;else{let a=this.scripted.get(r.id);a?(o=a,this.scripted.delete(r.id)):this.aiEnabled?o=this.aiFor(r):o=rs}this.control(r,o)}for(let r of n.fighters)this.advance(r,i);this.separate(),this.moveProjectiles(i),this.tickWaves(),this.checkEnd();for(let r of n.fighters)this.sync(r);this.recordHistory()}aiFor(t){let n=this.aiV4.get(t.id);return n||(n=ou(this.rng),this.aiV4.set(t.id,n)),t.kit==="shieldbearer"?hu(this,t,n,Ln):uu(this,t,n,Ln)}tickTimers(t,n){super.tickTimers(t,n);let i=this.fx(t);i.hitstunT=Math.max(0,i.hitstunT-n),i.stackArmorT=Math.max(0,i.stackArmorT-n),t.breakT=Math.max(0,(t.breakT??0)-n),t.protectT=Math.max(0,(t.protectT??0)-n),t.guard&&(t.guard.since+=n),(t.counterT??0)>0&&(t.counterT=Math.max(0,(t.counterT??0)-n))}settle(t){let n=this.fx(t),i=this.state.time;t.state==="hitstun"&&n.hitstunT<=yt&&(n.stunKind=null,this.setState(t,"idle")),t.state==="recover"&&n.act&&(n.act.kind==="melee"||n.act.kind==="recover")&&t.stateT>=n.act.recDur-yt?this.endRecover(t):t.state==="recover"&&(!n.act||n.act.kind!=="melee"&&n.act.kind!=="recover")&&this.endRecover(t),t.state==="idle"&&n.hitstunT>yt&&this.setState(t,"hitstun"),t.team==="player"&&(t.state==="guard"&&this.guardSt&&i-this.guardSt.raisedAt>=be.guard.maxHold-yt&&this.lowerGuard(t,"timeout",!0),this.counter&&(t.counterT??0)<=yt&&this.loseCounter(t,this.counter.released?"timeout":"held"),this.combo&&t.state==="idle"&&i>this.combo.until+yt&&this.resetCombo(t))}endRecover(t){let n=this.fx(t),i=n.act;n.act=null,this.setState(t,"idle"),i&&i.kind==="melee"&&(i.struck||(this.lastMeleeTarget=null),this.combo&&(this.combo.until=this.state.time+be.comboWindow))}sync(t){let n=this.fx(t);n.heavyArmor&&t.windup?(t.armorT=Math.max(0,t.windup.dur-t.windup.t),t.armorKind="heavy"):n.stackArmorT>0?(t.armorT=n.stackArmorT,t.armorKind="stack"):(t.armorT=0,t.armorKind=null),t.kit==="shieldbearer"&&(t.shieldDir=As(t.facing),t.shieldUp=Ot.alive(t)&&(t.breakT??0)<=0),t.team==="player"&&(t.guard&&(t.guard.perfect=t.guard.since<=be.guard.perfect+yt),t.counterTargetId=this.counter?this.counter.targetId:null,this.counter||(t.counterT=0))}control(t,n){t.team==="player"?this.controlPlayer(t,n):this.controlEnemy(t,n)}controlPlayer(t,n){let i=this.state.time;if(t.path==="mars"&&(this.counter&&!this.counter.released&&!n.guardHeld?(this.counter.released=!0,t.state==="guard"&&this.lowerGuard(t,"release",!1)):t.state==="guard"&&!n.guardHeld&&this.lowerGuard(t,"release",!0)),n.dash&&this.counter&&this.loseCounter(t,"dash"),t.state==="ledge"||t.state==="climb"||t.state==="knocked"){this.buf=null,super.control(t,n);return}let r=n.dashDir&&st(n.dashDir)>.01?ye(n.dashDir):st(n.move)>.2?ye(n.move):this.facingDir(t);n.dash&&this.dashBuf.set(t.id,{at:i,dir:r,dashOk:!1});let o=[],a=this.counterUsable(t);if(n.dash&&o.push({type:"dash",at:i,dir:r,untilRecEnd:!1}),t.path==="mars"&&n.guardPressed&&o.push({type:a?"bash":"guard",at:i,dir:n.guardDir??null,untilRecEnd:!1}),n.cast){let c=n.cast.skill==="control"?"throw":t.path==="ares"?"charge":t.path==="none"?"push":null;c&&o.push({type:c,at:i,dir:n.cast.dir,untilRecEnd:!1})}n.firePressed&&o.push({type:a?"counterMelee":"fire",at:i,dir:n.fireDir,untilRecEnd:!1}),o.sort((l,c)=>fu[l.type]-fu[c.type]);for(let l of o){if(this.onCooldown(t,l))continue;let c=this.pressRule(t,l);if(c!=="drop"){this.buf={...l,untilRecEnd:c==="recEnd"};break}}if(this.buf&&!this.buf.untilRecEnd&&i-this.buf.at>be.inputBuffer+yt&&(this.buf=null),this.buf){let l=this.pressRule(t,this.buf);if(l==="now"){let c=this.buf;if(this.buf=null,this.execute(t,c,n)){this.playerMove(t,n),this.updateGuardDir(t,n);return}}else l==="drop"&&(this.buf=null)}!this.buf&&n.fire&&this.activity(t)==="free"&&this.startMelee(t,n,null),this.playerMove(t,n),this.updateGuardDir(t,n)}onCooldown(t,n){switch(n.type){case"dash":return t.cooldowns.dash>0;case"throw":return t.cooldowns.control>0;case"charge":case"push":case"guard":return t.cooldowns.push>0;default:return!1}}activity(t){let n=this.fx(t);switch(t.state){case"idle":return(t.breakT??0)>0||n.hitstunT>yt?"stun":"free";case"hitstun":return"stun";case"windup":{let i=t.windup?.skill;return pc(i)?"meleeWindup":i==="charge"?"charge":"castWindup"}case"recover":{let i=n.act;return i&&i.kind==="recover"&&(i.tag==="chargeHit"||i.tag==="chargeMiss")?"charge":"meleeRecover"}case"charge":return"charge";case"guard":return"guard";case"dash":return"dash";default:return"other"}}pressRule(t,n){let i=n.type==="fire"||n.type==="counterMelee";switch(this.activity(t)){case"free":return"now";case"meleeWindup":case"castWindup":return n.type==="dash"?"now":"drop";case"meleeRecover":{if(n.type!=="dash")return"buffer";let r=this.fx(t).act;return(r&&(r.kind==="melee"||r.kind==="recover")?r.recDur:0)-t.stateT<=be.inputBuffer+yt?"recEnd":"drop"}case"charge":return i?"buffer":"drop";case"guard":return n.type==="dash"?"now":"drop";case"dash":case"stun":return n.type==="dash"?"drop":"buffer";default:return"drop"}}execute(t,n,i){switch(n.type){case"dash":return this.doDash(t,n.dir??this.facingDir(t));case"bash":return this.counterUsable(t)?this.doCounterBash(t,i):i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"counterMelee":return this.counterUsable(t)?this.doCounterMelee(t,i):this.startMelee(t,i,n.dir);case"guard":return i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"throw":return t.cooldowns.control>0?!1:(this.resetCombo(t),this.startWindup(t,"control",this.aimOrAuto(t,n.dir,Nt.range),Nt.windup),!0);case"charge":return this.startCharge(t,i,n);case"push":return t.cooldowns.push>0?!1:(this.resetCombo(t),this.startWindup(t,"push",this.aimOrAuto(t,n.dir,Vt.range+2),Vt.windup),!0);case"fire":return this.startMelee(t,i,n.dir)}}playerMove(t,n){let i=this.fx(t),r=0;switch(t.state){case"idle":r=(t.breakT??0)>0?.5:1;break;case"windup":r=pc(t.windup?.skill)?be.attackMoveMult:t.windup?.skill==="charge"?0:Rr;break;case"recover":{let c=i.act;r=c&&c.kind==="melee"?be.attackMoveMult:c&&c.kind==="recover"&&(c.tag==="chargeHit"||c.tag==="chargeMiss")?0:.3;break}case"guard":r=be.guard.moveMult;break;default:r=0}if(r<=0){t.moveVel={x:0,z:0};return}let o=n.move,a=st(o);a>1&&(o=se(o,1/a));let l=be.player.speed*r*(t.slowT>0?Ar:1);t.moveVel=se(o,l),t.state==="idle"&&a>.1&&(t.facing=cn(o))}doDash(t,n){return t.cooldowns.dash>0?!1:(t.state==="guard"&&this.lowerGuard(t,"dash",!0),this.resetCombo(t),this.fx(t).act=null,this.fx(t).slide=null,this.dashBuf.delete(t.id),this.startDash(t,{...rs,dashDir:n}),!0)}comboNext(){return this.combo&&this.state.time<=this.combo.until+yt?this.combo.next:1}resetCombo(t){t.team==="player"&&(this.combo=null,this.comboManualDir=null,this.lastMeleeTarget=null,t.meleeStep=0)}meleeDir(t,n){if(this.comboManualDir)return this.comboManualDir;let i=this.lastMeleeTarget!==null?this.fighter(this.lastMeleeTarget):void 0;if(i&&Ot.alive(i)&&pt(i.pos,t.pos)<=be.target.keep+yt&&pt(i.pos,t.pos)>1e-6)return ye(Qe(i.pos,t.pos));let r=this.facingDir(t),o=null,a=1/0;for(let l of this.enemies()){let c=pt(l.pos,t.pos);c>be.target.autoRange+yt||c<1e-6||Gt(ye(Qe(l.pos,t.pos)),r)<Math.cos(be.target.autoHalfAngle)-yt||c<a&&(a=c,o=l)}return o?ye(Qe(o.pos,t.pos)):st(n.move)>.2?ye(n.move):r}startMelee(t,n,i){let r=this.comboNext();r===1&&(this.comboManualDir=null);let o=n.fireDir&&st(n.fireDir)>.01?ye(n.fireDir):i&&st(i)>.01?ye(i):null;o&&(this.comboManualDir=o);let a=this.meleeDir(t,n),l=be.melee[r-1];return this.fx(t).act={kind:"melee",step:r,counter:!1,dir:a,hitIds:new Set,stepLeft:l.step,stepSpeed:l.step/l.windup,recDur:l.recover,struck:!1,bestD:1/0},this.combo={next:r===3?1:r+1,until:1/0},t.meleeStep=r,this.startWindup(t,pu[r],a,l.windup),!0}releaseMelee(t){let n=this.fx(t).act;t.windup=null,this.setState(t,"recover"),n&&n.kind==="melee"&&this.strikeMelee(t,n,!0)}meleeGeom(t,n,i,r){let o=be.melee[r-1],a=Qe(n.pos,t.pos),l=st(a);if(l>o.range+n.radius+yt)return!1;if(l<.6)return!0;if(o.shape==="fan")return Gt(se(a,1/l),i)>=Math.cos(o.halfAngle)-yt;let c=Gt(a,i),h=Math.abs(a.x*i.z-a.z*i.x);return c>=0&&h<=o.width/2+n.radius+yt}strikeMelee(t,n,i){let r=be.melee[n.step-1],o=n.counter?"counterMelee":pu[n.step],a=!1,l=null;for(let c of[...this.state.fighters]){if(c.team===t.team||!Ot.alive(c)||n.hitIds.has(c.id)||!this.meleeGeom(t,c,n.dir,n.step)||this.coverOn()&&this.rockOnSegment(t.pos,c.pos))continue;n.hitIds.add(c.id);let h=pt(t.pos,c.pos),u=this.resolveHit(t,c,{kind:o,dmg:r.dmg,fromDir:ye(Qe(t.pos,c.pos)),melee:!0,stun:r.stun>0?r.stun:void 0,knock:r.knock>0?{dir:n.dir,dist:r.knock}:null});u==="bearer"?l=c:(u==="hit"||u==="armored")&&(a=!0,n.struck=!0,h<n.bestD&&(n.bestD=h,this.lastMeleeTarget=c.id))}i&&this.emit({type:"melee",ownerId:t.id,step:n.step,pos:{...t.pos},dir:{...n.dir},hit:a,counter:n.counter}),l&&Ot.alive(t)&&this.recoil(t,l)}recoil(t,n){let i=this.fx(t);i.act=null,this.cancelWindup(t),this.resetCombo(t),i.hitstunT=Math.max(i.hitstunT,be.recoil),i.stunKind="recoil",t.state!=="knocked"&&this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:ye(Qe(t.pos,n.pos)),dur:be.recoil})}startCharge(t,n,i){if(t.cooldowns.push>0)return!1;let r=i.dir&&st(i.dir)>.01?ye(i.dir):null;if(!r&&st(n.move)>.2&&(r=ye(n.move)),!r){let o=null,a=1/0;for(let l of this.enemies()){let c=pt(l.pos,t.pos);c<=be.charge.autoRange+yt&&c>1e-6&&c<a&&(a=c,o=l)}r=o?ye(Qe(o.pos,t.pos)):this.facingDir(t)}return this.resetCombo(t),t.cooldowns.push=Math.max(0,be.charge.cooldown-(this.state.time-i.at)),this.fx(t).act={kind:"charge",dir:r,moved:0},this.startWindup(t,"charge",r,be.charge.windup),!0}advanceCharge(t,n){let i=this.fx(t),r=i.act;if(!r||r.kind!=="charge"){this.setState(t,"idle");return}let o=be.charge,a=Math.min(o.distance-r.moved,o.distance/o.time*n),l=this.activeMove(t,se(r.dir,a),"contact");if(r.moved+=l.moved,l.enemy){this.chargeImpact(t,l.enemy,r);return}(l.blocked||r.moved>=o.distance-1e-6)&&(i.act={kind:"recover",tag:"chargeMiss",recDur:o.missRecover},this.setState(t,"recover"))}chargeImpact(t,n,i){let r=this.fx(t),o=be.charge,a=n.kit==="shieldbearer"?{knock:{dir:i.dir},breakDur:o.breakDur}:{knock:{dir:i.dir},stun:o.archerStun},l=this.resolveHit(t,n,{kind:"charge",dmg:o.dmg,fromDir:ye(Qe(t.pos,n.pos)),melee:!0,...a});if(Ot.alive(t)){if(l==="bearer"){r.act=null,r.hitstunT=Math.max(r.hitstunT,o.bounceStun),r.stunKind="bounce",r.slide={dir:se(i.dir,-1),left:o.bounce,speed:o.bounce/o.bounceTime},this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:se(i.dir,-1),dur:o.bounceStun});return}r.act={kind:"recover",tag:"chargeHit",recDur:o.hitRecover},this.setState(t,"recover")}}raiseGuard(t,n,i){if(t.path!=="mars"||t.cooldowns.push>0)return!1;let r=this.state.time;this.resetCombo(t),this.fx(t).act=null,this.guardSt={pressAt:i,raisedAt:r,counterMade:!1},t.guard={since:r-i,perfect:r-i<=be.guard.perfect+yt},t.shieldUp=!0,this.threat=null;let a=(n.guardDir&&st(n.guardDir)>.01?ye(n.guardDir):null)??this.autoGuardDir(t)??this.facingDir(t);return t.shieldDir=a,t.facing=cn(a),this.setState(t,"guard"),this.emit({type:"guardUp",ownerId:t.id}),!0}lowerGuard(t,n,i){t.state==="guard"&&this.setState(t,"idle"),t.guard=null,t.shieldUp=!1,this.guardSt=null,this.threat=null,i&&(t.cooldowns.push=be.guard.lock),this.emit({type:"guardDown",ownerId:t.id,reason:n})}updateGuardDir(t,n){if(t.state!=="guard"||!t.shieldDir)return;let i=n.guardDir&&st(n.guardDir)>.01?ye(n.guardDir):null;i&&(this.threat=null);let r=i??this.autoGuardDir(t);r&&(t.shieldDir=tp(t.shieldDir,r,be.guard.turnRate*Ln)),t.facing=cn(t.shieldDir)}heavyCovers(t,n){let i=t.windup;if(!i||i.skill!=="enemyHeavy"||t.state!=="windup")return!1;let r=Qe(n.pos,t.pos),o=st(r);return o>Kt.range+n.radius||!(o<.6||Gt(se(r,1/o),i.dir)>=Math.cos(Kt.halfAngle))?!1:!this.rockOnSegment(t.pos,n.pos)}arrowHeading(t,n){let i=Qe(n.pos,t.pos),r=Gt(i,t.dir);if(r<=0||Math.abs(i.x*t.dir.z-i.z*t.dir.x)>n.radius+t.radius||t.range-t.traveled<r-n.radius)return null;let a=Xe(t.pos,se(t.dir,r));return this.state.island.rocks.some(l=>Ts(t.pos,a,l.pos,l.r+t.radius*.5))?null:r}threatValid(t,n){if(n.kind==="heavy"){let r=this.fighter(n.id);return!r||!Ot.alive(r)||r.windup!==n.w||pt(r.pos,t.pos)>be.guard.threatDrop?!1:this.heavyCovers(r,t)}let i=this.state.projectiles.find(r=>r.id===n.id);return!i||!i.alive||pt(i.pos,t.pos)>be.guard.threatDrop?!1:this.arrowHeading(i,t)!==null}autoGuardDir(t){if(this.threat&&!this.threatValid(t,this.threat)&&(this.threat=null),!this.threat){let r=null,o=1/0;for(let a of this.enemies()){if(!this.heavyCovers(a,t))continue;let l=a.windup,c=l.dur-l.t;c<o&&(o=c,r={kind:"heavy",id:a.id,w:l})}for(let a of this.state.projectiles){if(!a.alive||a.team===t.team||a.kind!=="enemyBasic")continue;let l=pt(a.pos,t.pos);if(l>be.guard.arrowScan||this.arrowHeading(a,t)===null)continue;let c=l/a.speed;c<o&&(o=c,r={kind:"arrow",id:a.id})}this.threat=r}let n=this.threat;if(!n)return null;if(n.kind==="heavy"){let r=this.fighter(n.id);return ye(Qe(r.pos,t.pos))}let i=this.state.projectiles.find(r=>r.id===n.id);return se(i.dir,-1)}counterUsable(t){return this.counter!==null&&this.counter.released&&(t.counterT??0)>yt}loseCounter(t,n){this.counter&&(this.counter=null,t.counterT=0,t.counterTargetId=null,this.emit({type:"counterLost",ownerId:t.id,reason:n}))}useCounter(t,n){this.counter=null,t.counterT=0,t.counterTargetId=null,this.state.v4.counters[n]++,this.emit({type:"counterUsed",ownerId:t.id,kind:n})}counterAim(t,n,i,r){let o=this.counter?this.fighter(this.counter.targetId):void 0;return o&&Ot.alive(o)&&pt(o.pos,t.pos)<=n+yt&&pt(o.pos,t.pos)>1e-6?ye(Qe(o.pos,t.pos)):i&&st(i)>.01?ye(i):this.meleeDir(t,r)}doCounterBash(t,n){let i=be.counter.bash;this.resetCombo(t);let r=this.counterAim(t,i.aimRange,n.guardDir,n);this.useCounter(t,"bash"),t.facing=cn(r);for(let o of[...this.state.fighters]){if(o.team===t.team||!Ot.alive(o))continue;let a=Qe(o.pos,t.pos),l=st(a);l>i.range+o.radius||(l<.6||Gt(se(a,1/l),r)>=Math.cos(i.halfAngle)-yt)&&(this.coverOn()&&this.rockOnSegment(t.pos,o.pos)||this.resolveHit(t,o,{kind:"counterBash",dmg:i.dmg,fromDir:ye(Qe(t.pos,o.pos)),melee:!0,knock:{dir:r,mult:i.knockMult}}))}return t.cooldowns.push=be.guard.lock,Ot.alive(t)&&t.state!=="knocked"&&(this.fx(t).act={kind:"recover",tag:"bash",recDur:i.recover},this.setState(t,"recover")),!0}doCounterMelee(t,n){let i=be.counter.melee;this.resetCombo(t);let r=n.fireDir&&st(n.fireDir)>.01?ye(n.fireDir):null,o=this.counterAim(t,i.aimRange,r,n);r&&(this.comboManualDir=r),this.useCounter(t,"melee"),t.facing=cn(o),this.activeMove(t,se(o,i.step),"stop");let a=be.melee[0],l={kind:"melee",step:1,counter:!0,dir:o,hitIds:new Set,stepLeft:0,stepSpeed:0,recDur:a.recover,struck:!1,bestD:1/0};return this.fx(t).act=l,this.combo={next:2,until:1/0},t.meleeStep=1,this.setState(t,"recover"),this.strikeMelee(t,l,!0),!0}canTurn(t){return t.state==="idle"&&this.state.time>=this.fx(t).noTurnUntil-yt}controlEnemy(t,n){let i=this.fx(t),r=(t.breakT??0)>0;if(t.kit==="shieldbearer"&&n.face&&st(n.face)>.01&&this.canTurn(t)&&(t.facing=np(t.facing,cn(n.face),be.bearer.turnRate*Ln)),t.state==="idle"&&!r&&i.hitstunT<=yt){if(t.kit==="shieldbearer"&&n.cast&&n.cast.skill==="push"&&t.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===t.id)){this.heavyOwner=t.id,this.startWindup(t,"enemyHeavy",this.facingDir(t),Kt.windup),t.moveVel={x:0,z:0};return}if(t.kit==="archer"){if(n.dash&&n.dashDir&&st(n.dashDir)>.01&&t.cooldowns.dash<=0){this.startBackstep(t,ye(n.dashDir));return}if(n.fire&&t.burstLeft===0&&t.cooldowns.basic<=0){this.startWindup(t,"enemyBasic",this.aimOrAuto(t,n.fireDir,jt.range),jt.windup);return}}}if(t.state==="idle"||t.state==="windup"||t.state==="recover"){let o=n.move,a=st(o);a>1&&(o=se(o,1/a));let l=t.kit==="shieldbearer"?be.bearer.speed:be.archer.speed;t.slowT>0&&(l*=Ar),r&&(l*=.5),t.burstLeft>0&&(l*=Bo),t.state==="windup"&&(l*=Rr),t.state==="recover"&&(l*=.3),t.moveVel=se(o,l),t.kit==="archer"&&t.state==="idle"&&t.burstLeft===0&&a>.1&&(t.facing=cn(o))}else t.moveVel={x:0,z:0}}startBackstep(t,n){t.cooldowns.dash=be.archer.backstepCooldown,this.fx(t).act={kind:"backstep",dir:n,left:be.archer.backstep},t.moveVel={x:0,z:0},this.setState(t,"dash"),this.emit({type:"dash",ownerId:t.id,from:{...t.pos},dir:{...n}})}advance(t,n){let i=this.fx(t);switch(t.state){case"dead":case"falling":case"knocked":case"ledge":case"climb":super.advance(t,n);return;case"dash":if(i.act&&i.act.kind==="backstep"){this.advanceBackstep(t,i.act,n);break}super.advance(t,n);return;case"reviving":t.stateT>=be.revive.delay-yt&&this.revive(t);return;case"windup":this.advanceWindup(t,n);break;case"recover":this.walk(t,n),i.act&&i.act.kind==="melee"&&t.stateT<=be.meleeActive+yt&&this.strikeMelee(t,i.act,!1);break;case"charge":this.advanceCharge(t,n);break;case"idle":case"guard":this.walk(t,n);break;case"hitstun":t.moveVel={x:0,z:0};break}if(i.slide&&(t.state==="idle"||t.state==="hitstun"||t.state==="guard"||t.state==="recover"||t.state==="windup")){let o=Math.min(i.slide.left,i.slide.speed*n),a=this.activeMove(t,se(i.slide.dir,o),"stop");i.slide.left-=o,(a.blocked||i.slide.left<=1e-6)&&(i.slide=null)}if((t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&Ht(t.pos,this.state.island.poly)<0){this.startFall(t,{x:0,z:0});return}this.tickBurst(t,n)}advanceBackstep(t,n,i){let r=Math.min(n.left,be.archer.backstep/be.archer.backstepTime*i),o=this.activeMove(t,se(n.dir,r),"none");n.left-=r,(o.blocked||n.left<=1e-6)&&(this.fx(t).act=null,this.setState(t,"idle"))}advanceWindup(t,n){let i=t.windup,r=this.fx(t);i.t+=n;let o=r.act;if(pc(i.skill)&&o&&o.kind==="melee"&&o.stepLeft>0){let a=Math.min(o.stepLeft,o.stepSpeed*n),l=this.activeMove(t,se(o.dir,a),"stop");o.stepLeft=l.blocked?0:o.stepLeft-a}i.skill==="enemyHeavy"&&!r.heavyArmor&&i.t>=i.dur-be.bearer.heavyArmor-yt&&(r.heavyArmor=!0,this.emit({type:"armor",ownerId:t.id,kind:"heavy",dur:be.bearer.heavyArmor})),i.skill!=="charge"&&this.walk(t,n),i.t>=i.dur-yt&&this.releaseV4(t)}releaseV4(t){let n=t.windup,i=this.fx(t);switch(n.skill){case"melee1":case"melee2":case"melee3":this.releaseMelee(t);return;case"charge":t.windup=null,this.setState(t,"charge"),this.emit({type:"charge",ownerId:t.id,from:{...t.pos},dir:{...n.dir}});return;case"enemyHeavy":this.releaseWindup(t),i.heavyArmor=!1,i.noTurnUntil=this.state.time+Kt.recover,t.state==="recover"&&(i.act={kind:"recover",tag:"heavy",recDur:Kt.recover});return;case"push":this.releaseWindup(t),t.state==="recover"&&(i.act={kind:"recover",tag:"push",recDur:Vt.recover});return;default:this.releaseWindup(t)}}activeMove(t,n,i){if(i==="contact"){let h=this.contactAt(t,t.pos);if(h)return{moved:0,blocked:"enemy",enemy:h}}let r=st(n);if(r<1e-12)return{moved:0,blocked:null,enemy:null};let o=Math.max(1,Math.ceil(r/.02)),a=se(n,1/o),l=r/o,c=0;for(let h=0;h<o;h++){let u=Xe(t.pos,a),d=this.moveBlock(t,t.pos,u,i);if(d){let f=0,v=1;for(let _=0;_<30;_++){let g=(f+v)/2;this.moveBlock(t,t.pos,Xe(t.pos,se(a,g)),i)?v=g:f=g}return t.pos=Xe(t.pos,se(a,f)),c+=l*f,{moved:c,blocked:d.kind,enemy:d.enemy}}t.pos=u,c+=l}return{moved:c,blocked:null,enemy:null}}contactAt(t,n){let i=null,r=1/0;for(let o of this.state.fighters){if(o.team===t.team||!Ot.alive(o))continue;let a=pt(n,o.pos);a<=be.charge.contact+yt&&a<r&&(r=a,i=o)}return i}moveBlock(t,n,i,r){let o=this.state.island.poly,a=Ht(i,o);if(a<be.edgeMargin&&a<Ht(n,o)-1e-12)return{kind:"edge",enemy:null};for(let l of this.state.island.rocks){let c=pt(i,l.pos),h=l.r+t.radius;if(c<h&&c<pt(n,l.pos)-1e-12)return{kind:"rock",enemy:null}}if(r==="contact"){let l=this.contactAt(t,i);if(l)return{kind:"enemy",enemy:l}}else if(r==="stop")for(let l of this.state.fighters){if(l.team===t.team||!Ot.alive(l))continue;let c=pt(i,l.pos),h=t.radius+l.radius;if(c<h&&c<pt(n,l.pos)-1e-12)return{kind:"enemy",enemy:l}}return null}cancelWindup(t){if(t.windup){let n=this.fx(t);n.heavyArmor=!1,n.act&&(n.act.kind==="melee"||n.act.kind==="charge")&&(n.act=null)}super.cancelWindup(t)}resolveHit(t,n,i){let r=this.state;if(n.invulnT>0||(n.protectT??0)>0)return"invuln";if(n.kit==="shieldbearer"&&(n.breakT??0)<=0&&du(i.fromDir,this.facingDir(n))<=be.bearer.frontHalfAngle+1e-7)return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:"bearer",skill:i.kind,pos:Xe(n.pos,se(i.fromDir,n.radius)),dir:se(i.fromDir,-1)}),"bearer";if(n.state==="guard"&&n.shieldUp&&n.shieldDir&&n.guard&&du(i.fromDir,n.shieldDir)<=be.guard.blockHalfAngle+1e-7)return this.guardBlock(t,n,i);let o=n.slowT>0;n.hp=Math.max(0,n.hp-i.dmg),n.hitFlashT=.12,n.lastHitBy=t.id,n.lastHitAt=r.time,this.lastHitKind.set(n.id,i.kind),this.hitstop=Math.max(this.hitstop,zo[i.kind]),i.slow&&(n.slowT=i.slow),n.team==="player"&&this.loseCounter(n,"hit");let a=this.armored(n),l=0,c=!1,h=!1;if(n.hp>0&&!a&&(i.breakDur&&this.applyBreak(t,n,i.breakDur),i.knock&&(l=i.knock.dist??Ot.knockDistance(n.hp,n.maxHp,o)*(i.knock.mult??1),h=this.applyKnock(n,i.knock.dir,l,t,i.kind),c=!0),i.stun&&!h&&(this.applyStun(n,i.stun),c=!0)),h||this.emit({type:"hit",targetId:n.id,sourceId:t.id,kind:i.kind,pos:{...n.pos},dir:i.knock?ye(i.knock.dir):se(i.fromDir,-1),dmg:i.dmg,knock:l}),n.hp<=0)return this.cancelWindup(n),this.die(n,"hp"),"hit";if(a)return"armored";if(c){let u=this.fx(n),d=r.time;u.stackHits=u.stackHits.filter(f=>d-f<=be.stack.window+yt),u.stackHits.push(d),u.stackHits.length>=be.stack.hits&&(u.stackHits=[],u.stackArmorT=be.stack.armor,this.emit({type:"armor",ownerId:n.id,kind:"stack",dur:be.stack.armor}))}return"hit"}guardBlock(t,n,i){let r=be.guard,o=n.guard.since<=r.perfect+yt;return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:o?"perfect":"guard",skill:i.kind,pos:Xe(n.pos,se(i.fromDir,n.radius)),dir:se(i.fromDir,-1)}),o?(this.state.v4.perfectBlocks++,i.melee&&(this.applyBreak(n,t,r.perfectBreak),this.guardSt&&!this.guardSt.counterMade&&(this.guardSt.counterMade=!0,this.counter={targetId:t.id,released:!1},n.counterT=be.counter.dur,n.counterTargetId=t.id,this.emit({type:"counterReady",ownerId:n.id,targetId:t.id,dur:be.counter.dur}))),"perfect"):(i.melee&&(n.hp=Math.max(0,n.hp-r.chipDmg),n.lastHitBy=t.id,n.lastHitAt=this.state.time,this.lastHitKind.set(n.id,i.kind),this.fx(n).slide={dir:se(i.fromDir,-1),left:r.pushback,speed:r.pushback/r.pushbackTime},n.hp<=0&&this.die(n,"hp")),"guard")}applyBreak(t,n,i){let r=this.fx(n);n.breakT=Math.max(n.breakT??0,i),n.state==="windup"&&(this.cancelWindup(n),r.act=null,this.setState(n,"idle")),n.burstLeft=0,this.bursts.delete(n.id),this.emit({type:"guardBreak",targetId:n.id,sourceId:t.id,dur:i,pos:{...n.pos}}),n.team==="enemy"&&this.state.v4.breaks++}applyStun(t,n){let i=this.fx(t);i.hitstunT=Math.max(i.hitstunT,n),i.stunKind="hit",t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.buf=null),(t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&(this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),i.act=null,i.slide=null,this.setState(t,"hitstun"))}applyKnock(t,n,i,r,o){let a=ye(n);if(t.state==="ledge")return this.emit({type:"hit",targetId:t.id,sourceId:r.id,kind:o,pos:{...t.pos},dir:{...a},dmg:0,knock:0}),this.dropLedge(t,"knocked",a),!0;if(t.state==="climb"){let c=this.ledge.get(t.id);c&&(c.rec.outcome="knocked",this.ledge.delete(t.id),this.edgeRec.delete(t.id))}t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.buf=null);let l=this.fx(t);return l.act=null,l.slide=null,this.outSource.set(t.id,"knock"),this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),t.knockVel=se(a,2*i/Dn.knockTime),t.kit!=="shieldbearer"&&(t.facing=cn(se(a,-1))),this.outsideT.set(t.id,0),this.setState(t,"knocked"),!1}coneStrike(t,n,i,r,o,a){this.emit({type:"cast",ownerId:t.id,skill:a,pos:{...t.pos},dir:{...n}});for(let l of[...this.state.fighters]){if(l.team===t.team||!Ot.alive(l))continue;let c=Qe(l.pos,t.pos),h=st(c);if(!(h>i+l.radius)&&(h<.6||Gt(se(c,1/h),n)>=Math.cos(r))){if(this.coverOn()){let u=this.rockOnSegment(t.pos,l.pos);if(u){this.emit({type:"blockedStrike",ownerId:t.id,targetId:l.id,skill:a,pos:u,dir:{...n}});continue}}this.resolveHit(t,l,{kind:a,dmg:o,fromDir:ye(Qe(t.pos,l.pos)),melee:a==="enemyHeavy",knock:{dir:n}})}}}moveProjectiles(t){let n=this.state;for(let i of n.projectiles){if(!i.alive)continue;let r=i.pos,o=i.speed*t,a=Xe(r,se(i.dir,o));if(i.traveled+=o,n.island.rocks.some(h=>Ts(r,a,h.pos,h.r+i.radius*.5))){i.alive=!1,this.emit({type:"blocked",pos:a,kind:i.kind,ownerId:i.ownerId});continue}let l=null,c=1/0;for(let h of n.fighters)if(!(h.team===i.team||!Ot.alive(h)||h.invulnT>0||(h.protectT??0)>0)&&Oi(h.pos,r,a)<h.radius+i.radius){let u=pt(r,h.pos);u<c&&(c=u,l=h)}if(i.pos=a,l){i.alive=!1;let h=this.fighter(i.ownerId);if(h){let u=se(i.dir,-1);i.kind==="control"?this.resolveHit(h,l,{kind:"control",dmg:Nt.dmg,fromDir:u,slow:Nt.slow,melee:!1}):this.resolveHit(h,l,{kind:i.kind,dmg:i.kind==="enemyBasic"?jt.dmg:3,fromDir:u,melee:!1})}continue}i.traveled>=i.range&&(i.alive=!1,this.emit({type:"expire",pos:a,kind:i.kind}))}n.projectiles=n.projectiles.filter(i=>i.alive)}clearPlayer(t){t.team==="player"&&((t.guard||t.shieldUp)&&(t.guard=null,t.shieldUp=!1,this.guardSt=null),this.counter&&this.loseCounter(t,"hit"),this.resetCombo(t),this.buf=null,this.threat=null)}startFall(t,n){let i=this.fx(t);i.act=null,i.slide=null,i.hitstunT=0,i.heavyArmor=!1,this.clearPlayer(t),super.startFall(t,n)}die(t,n){let i=this.state,r=i.v4,o=this.fx(t);if(this.cancelWindup(t),o.act=null,o.slide=null,o.hitstunT=0,o.heavyArmor=!1,o.stackArmorT=0,o.stackHits=[],t.burstLeft=0,this.bursts.delete(t.id),t.team==="player"&&r.revivesLeft>0){if(r.revivesLeft--,this.clearPlayer(t),this.dashBuf.delete(t.id),n==="hp"){let a=this.ledge.get(t.id);a&&a.rec.outcome==="pending"&&(a.rec.outcome="hp");let l=this.edgeRec.get(t.id);l&&l.outcome==="pending"&&(l.outcome="hp"),this.ledge.delete(t.id),this.edgeRec.delete(t.id)}t.hp=0,t.breakT=0,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},this.setState(t,"reviving"),this.emit({type:"reviveStart",ownerId:t.id,delay:be.revive.delay});return}if(t.team==="enemy"){let a=t.lastHitBy!==null&&i.time-t.lastHitAt<4?t.lastHitBy:null;r.kills.push({t:Math.round(i.time*1e3)/1e3,how:n,where:Ht(t.pos,i.island.poly)<=be.killEdge?"edge":"center",by:a!==null?this.lastHitKind.get(t.id)??null:null,victim:t.kit})}super.die(t,n)}legalRevivePoints(){let t=this.state,n=be.revive.grid,i=be.player.radius,r=t.island.poly.map(l=>l.x),o=t.island.poly.map(l=>l.z),a=[];for(let l=Math.floor(Math.min(...r)/n);l<=Math.ceil(Math.max(...r)/n);l++)for(let c=Math.floor(Math.min(...o)/n);c<=Math.ceil(Math.max(...o)/n);c++){let h={x:l*n,z:c*n};Ht(h,t.island.poly)<be.revive.edge||t.island.rocks.some(u=>pt(h,u.pos)<u.r+i)||a.push(h)}return a}revivePoint(){let t=this.legalRevivePoints(),n=this.enemies(),i=c=>n.reduce((h,u)=>Math.min(h,pt(c,u.pos)),1/0),r=null,o=1/0;for(let c of t){if(i(c)<be.revive.enemyClear)continue;let h=st(c);h<o-yt&&(o=h,r=c)}if(r)return{...r};let a=t[0],l=-1/0;for(let c of t){let h=i(c);h>l+yt&&(l=h,a=c)}return{...a}}revive(t){let n=this.revivePoint();t.pos=n,t.y=0,t.hp=t.maxHp*be.revive.hpFrac,t.protectT=be.revive.protect,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.deathCause=null,t.slowT=0,t.invulnT=0,this.fallVel.delete(t.id),this.outSource.delete(t.id),this.setState(t,"idle"),this.emit({type:"revive",ownerId:t.id,pos:{...n},protect:be.revive.protect})}chooseSpawns(t){let n=this.state,i=be.waves,r=i.grid,o=this.player,a=n.island.poly.map(u=>u.x),l=n.island.poly.map(u=>u.z),c=[];for(let u=Math.floor(Math.min(...a)/r);u<=Math.ceil(Math.max(...a)/r);u++)for(let d=Math.floor(Math.min(...l)/r);d<=Math.ceil(Math.max(...l)/r);d++){let f={x:u*r,z:d*r};Ht(f,n.island.poly)<i.minEdge||n.island.rocks.some(v=>pt(f,v.pos)<v.r+.5)||pt(f,o.pos)<i.minPlayerDist||c.push(f)}let h=[];for(let u=0;u<t;u++){let d=c.filter(v=>h.every(_=>pt(_,v)>=i.spacing)&&this.enemies().every(_=>pt(_.pos,v)>=i.spacing)),f=d.length?d:c;h.push({...f[Math.floor(this.rng()*f.length)%f.length]})}return h}spawnWave(t,n){let i=be.waves.list[t-1],r=this.player;this.waveIdx=t,this.waveMembers=[],i.forEach((o,a)=>{let l=n[a],c=o==="shieldbearer",h=this.makeFighter("enemy",c?1:2,c?"\u76FE\u5175":"\u5F13\u624B",l,cn(Qe(r.pos,l)),o);h.hp=h.maxHp=c?be.bearer.hp:be.archer.hp,h.cooldownMax=c?{basic:0,control:0,push:Kt.cooldown,dash:0}:{basic:jt.cooldownMax,control:0,push:0,dash:be.archer.backstepCooldown},h.cooldowns={basic:0,control:0,push:c?2.5:0,dash:0},this.initV4Fields(h),this.state.fighters.push(h),this.waveMembers.push(h.id),this.sync(h)}),this.wavePhase="fight",this.emit({type:"waveStart",index:t,total:be.waves.list.length}),this.updateWaveState()}updateWaveState(){let t=this.state.v4.wave;t.index=this.waveIdx,t.total=be.waves.list.length,t.remaining=this.waveMembers.filter(n=>{let i=this.fighter(n);return i!==void 0&&Ot.alive(i)}).length}tickWaves(){let t=this.state.time,n=be.waves;if(this.wavePhase==="fight"&&this.waveMembers.every(i=>this.fighter(i)?.state==="dead")&&(this.emit({type:"waveClear",index:this.waveIdx}),this.waveIdx>=n.list.length?this.wavePhase="done":(this.wavePhase="gap",this.waveClearAt=t)),this.wavePhase==="gap"&&t>=this.waveClearAt+n.gap-n.markLead-yt){let i=n.list[this.waveIdx],r=this.chooseSpawns(i.length);this.pendingSpawns=i.map((o,a)=>({kit:o,pos:r[a]}));for(let o of this.pendingSpawns)this.emit({type:"spawnMark",pos:{...o.pos},lead:n.markLead});this.wavePhase="marked"}this.wavePhase==="marked"&&t>=this.waveClearAt+n.gap-yt&&!this.ended&&(this.spawnWave(this.waveIdx+1,this.pendingSpawns.map(i=>i.pos)),this.pendingSpawns=[]),this.updateWaveState()}checkEnd(){if(this.ended)return;let t=this.state,n=this.player;n.state==="dead"?(t.result="lose",t.loseText=this.loseText(n)):this.wavePhase==="done"&&(t.result="win"),t.result&&(this.ended=!0,this.dashBuf.clear(),this.buf=null,this.emit({type:"roundEnd",result:t.result}))}get wave(){return{index:this.waveIdx,phase:this.wavePhase}}debugPlayer(){let t=this.fx(this.player);return{buffered:this.buf?this.buf.type:null,counter:this.counter?{...this.counter}:null,combo:this.combo?{...this.combo}:null,lastTarget:this.lastMeleeTarget,stunKind:t.stunKind,hitstunT:t.hitstunT}}debugFx(t){let n=this.fighter(t),i=this.fx(n);return{hitstunT:i.hitstunT,heavyArmor:i.heavyArmor,stackArmorT:i.stackArmorT,stackCount:i.stackHits.length}}debugDamage(t,n,i,r,o){let a=this.fighter(t),l=this.fighter(n);if(!a||!l||!Ot.alive(a)||a.invulnT>0||(a.protectT??0)>0)return!1;let c=a.slowT>0;if(a.hp=Math.max(0,a.hp-r),a.lastHitBy=l.id,a.lastHitAt=this.state.time,this.lastHitKind.set(a.id,i),a.hp<=0)return this.die(a,"hp"),!0;let h=0;return o&&(h=Ot.knockDistance(a.hp,a.maxHp,c),this.applyKnock(a,o,h,l,i))||this.emit({type:"hit",targetId:a.id,sourceId:l.id,kind:i,pos:{...a.pos},dir:o?ye(o):ye(Qe(a.pos,l.pos)),dmg:r,knock:h}),!0}debugSpawn(t,n,i){let r=t==="shieldbearer",o=this.makeFighter("enemy",r?1:2,r?"\u76FE\u5175":"\u5F13\u624B",n,i??0,t);return o.hp=o.maxHp=r?be.bearer.hp:be.archer.hp,o.cooldownMax=r?{basic:0,control:0,push:Kt.cooldown,dash:0}:{basic:jt.cooldownMax,control:0,push:0,dash:be.archer.backstepCooldown},o.cooldowns={basic:0,control:0,push:0,dash:0},this.initV4Fields(o),this.state.fighters.push(o),this.sync(o),o}debugClearWave(){let t=new Set(this.waveMembers);this.state.fighters=this.state.fighters.filter(n=>!t.has(n.id)),this.waveMembers=[],this.wavePhase="off",this.updateWaveState()}};var Wu=0,Qc=1,Xu=2;var eh=1,Ka=2,pi=3,Ai=0,pn=1,xn=2,Li=0,Ri=1,ji=2,th=3,nh=4,qu=5,qi=100,Yu=101,$u=102,Ku=103,Zu=104,Ju=200,ju=201,Qu=202,ed=203,ma=204,ga=205,td=206,nd=207,id=208,sd=209,rd=210,od=211,ad=212,ld=213,cd=214,Za=0,Ja=1,ja=2,hs=3,Qa=4,el=5,lr=6,tl=7,nl=0,hd=1,ud=2,ii=0,dd=1,fd=2,pd=3,il=4,md=5,gd=6,vd=7;var ih=300,ms=301,gs=302,sl=303,rl=304,bo=306,us=1e3,Xi=1001,va=1002,kn=1003,xd=1004;var Mo=1005;var ti=1006,ol=1007;var Qi=1008;var si=1009,sh=1010,rh=1011,cr=1012,al=1013,es=1014,ri=1015,hr=1016,ll=1017,cl=1018,ur=1020,oh=35902,ah=35899,lh=1021,ch=1022,Yn=1023,$s=1026,dr=1027,hl=1028,ul=1029,hh=1030,dl=1031;var fl=1033,So=33776,wo=33777,Eo=33778,To=33779,pl=35840,ml=35841,gl=35842,vl=35843,xl=36196,yl=37492,_l=37496,bl=37808,Ml=37809,Sl=37810,wl=37811,El=37812,Tl=37813,Al=37814,Rl=37815,Cl=37816,Il=37817,Pl=37818,Ll=37819,Dl=37820,kl=37821,Fl=36492,Ul=36494,Nl=36495,Ol=36283,Bl=36284,zl=36285,Hl=36286;var Wr=2300,xa=2301,pa=2302,Wc=2400,Xc=2401,qc=2402;var yd=3200,_d=3201;var Vl=0,bd=1,Di="",qt="srgb",ds="srgb-linear",Xr="linear",Lt="srgb";var Qn=7680,Gl=7681;var uh=517;var Ks=519,Md=512,Sd=513,wd=514,dh=515,Ed=516,Td=517,Ad=518,Rd=519,ya=35044,Wl=35048;var fh="300 es",ei=2e3,qr=2001;var Ci=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var mc=Math.PI/180,_a=180/Math.PI;function Ei(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[s&255]+gn[s>>8&255]+gn[s>>16&255]+gn[s>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function gt(s,e,t){return Math.max(e,Math.min(t,s))}function ip(s,e){return(s%e+e)%e}function gc(s,e,t){return(1-t)*s+t*e}function ci(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Dt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Te=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],v=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=v,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==v){let g=1-a,p=l*d+c*f+h*v+u*_,m=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let E=Math.sqrt(x),T=Math.atan2(E,p*m);g=Math.sin(g*T)/E,a=Math.sin(a*T)/E}let y=a*m;if(l=l*g+d*y,c=c*g+f*y,h=h*g+v*y,u=u*g+_*y,g===1-a){let E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],v=r[o+3];return e[t]=a*v+h*u+l*f-c*d,e[t+1]=l*v+h*d+c*u-a*f,e[t+2]=c*v+h*f+a*d-l*u,e[t+3]=h*v-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),v=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u-d*f*v;break;case"YXZ":this._x=d*h*u+c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u+d*f*v;break;case"ZXY":this._x=d*h*u-c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u-d*f*v;break;case"ZYX":this._x=d*h*u-c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u+d*f*v;break;case"YZX":this._x=d*h*u+c*f*v,this._y=c*f*u+d*h*v,this._z=c*h*v-d*f*u,this._w=c*h*u-d*f*v;break;case"XZY":this._x=d*h*u-c*f*v,this._y=c*f*u-d*h*v,this._z=c*h*v+d*f*u,this._w=c*h*u+d*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vc.copy(this).projectOnVector(e),this.sub(vc)}reflect(e){return this.sub(vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},vc=new U,mu=new Xn,ct=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],v=n[8],_=i[0],g=i[3],p=i[6],m=i[1],x=i[4],y=i[7],E=i[2],T=i[5],P=i[8];return r[0]=o*_+a*m+l*E,r[3]=o*g+a*x+l*T,r[6]=o*p+a*y+l*P,r[1]=c*_+h*m+u*E,r[4]=c*g+h*x+u*T,r[7]=c*p+h*y+u*P,r[2]=d*_+f*m+v*E,r[5]=d*g+f*x+v*T,r[8]=d*p+f*y+v*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,v=t*u+n*d+i*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/v;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(xc.makeScale(e,t)),this}rotate(e){return this.premultiply(xc.makeRotation(-e)),this}translate(e,t){return this.premultiply(xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},xc=new ct;function ph(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Yr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cd(){let s=Yr("canvas");return s.style.display="block",s}var gu={};function Zs(s){s in gu||(gu[s]=!0,console.warn(s))}function Id(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var vu=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xu=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sp(){let s={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Lt&&(i.r=Ti(i.r),i.g=Ti(i.g),i.b=Ti(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Lt&&(i.r=qs(i.r),i.g=qs(i.g),i.b=qs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Di?Xr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Zs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Zs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ds]:{primaries:e,whitePoint:n,transfer:Xr,toXYZ:vu,fromXYZ:xu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:n,transfer:Lt,toXYZ:vu,fromXYZ:xu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),s}var bt=sp();function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function qs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Cs,ba=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Yr("canvas")),Cs.width=e.width,Cs.height=e.height;let i=Cs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Yr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},rp=0,Js=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(yc(i[o].image)):r.push(yc(i[o]))}else r=yc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function yc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ba.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var op=0,_c=new U,En=class s extends Ci{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Xi,i=Xi,r=ti,o=Qi,a=Yn,l=si,c=s.DEFAULT_ANISOTROPY,h=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Ei(),this.name="",this.source=new Js(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_c).x}get height(){return this.source.getSize(_c).y}get depth(){return this.source.getSize(_c).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ih)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case us:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case us:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=ih;En.DEFAULT_ANISOTROPY=1;var At=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],v=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(f+1)/2,E=(p+1)/2,T=(h+d)/4,P=(u+_)/4,C=(v+g)/4;return x>y&&x>E?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=T/n,r=P/n):y>E?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=C/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=P/r,i=C/r),this.set(n,i,r,t),this}let m=Math.sqrt((g-v)*(g-v)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(u-_)/m,this.z=(d-h)/m,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ma=class extends Ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new En(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ti,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Js(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},hi=class extends Ma{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$r=class extends En{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=kn,this.minFilter=kn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Sa=class extends En{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=kn,this.minFilter=kn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ui=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Zn):Zn.fromBufferAttribute(r,o),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Go.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Go.copy(n.boundingBox)),Go.applyMatrix4(e.matrixWorld),this.union(Go)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),Wo.subVectors(this.max,Pr),Is.subVectors(e.a,Pr),Ps.subVectors(e.b,Pr),Ls.subVectors(e.c,Pr),Bi.subVectors(Ps,Is),zi.subVectors(Ls,Ps),os.subVectors(Is,Ls);let t=[0,-Bi.z,Bi.y,0,-zi.z,zi.y,0,-os.z,os.y,Bi.z,0,-Bi.x,zi.z,0,-zi.x,os.z,0,-os.x,-Bi.y,Bi.x,0,-zi.y,zi.x,0,-os.y,os.x,0];return!bc(t,Is,Ps,Ls,Wo)||(t=[1,0,0,0,1,0,0,0,1],!bc(t,Is,Ps,Ls,Wo))?!1:(Xo.crossVectors(Bi,zi),t=[Xo.x,Xo.y,Xo.z],bc(t,Is,Ps,Ls,Wo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},yi=[new U,new U,new U,new U,new U,new U,new U,new U],Zn=new U,Go=new ui,Is=new U,Ps=new U,Ls=new U,Bi=new U,zi=new U,os=new U,Pr=new U,Wo=new U,Xo=new U,as=new U;function bc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){as.fromArray(s,r);let a=i.x*Math.abs(as.x)+i.y*Math.abs(as.y)+i.z*Math.abs(as.z),l=e.dot(as),c=t.dot(as),h=n.dot(as);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var ap=new ui,Lr=new U,Mc=new U,Yi=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ap.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Mc)),this.expandByPoint(Lr.copy(e.center).sub(Mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},_i=new U,Sc=new U,qo=new U,Hi=new U,wc=new U,Yo=new U,Ec=new U,wa=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Sc.copy(e).add(t).multiplyScalar(.5),qo.copy(t).sub(e).normalize(),Hi.copy(this.origin).sub(Sc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(qo),a=Hi.dot(this.direction),l=-Hi.dot(qo),c=Hi.lengthSq(),h=Math.abs(1-o*o),u,d,f,v;if(h>0)if(u=o*l-a,d=o*a-l,v=r*h,u>=0)if(d>=-v)if(d<=v){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-v?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=v?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Sc).addScaledVector(qo,d),f}intersectSphere(e,t){_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),i=_i.dot(_i)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,i,r){wc.subVectors(t,e),Yo.subVectors(n,e),Ec.crossVectors(wc,Yo);let o=this.direction.dot(Ec),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hi.subVectors(this.origin,e);let l=a*this.direction.dot(Yo.crossVectors(Hi,Yo));if(l<0)return null;let c=a*this.direction.dot(wc.cross(Hi));if(c<0||l+c>o)return null;let h=-a*Hi.dot(Ec);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,v,_,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,v,_,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,v,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=v,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Ds.setFromMatrixColumn(e,0).length(),r=1/Ds.setFromMatrixColumn(e,1).length(),o=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,v=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+v*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=v+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,v=c*h,_=c*u;t[0]=d+_*a,t[4]=v*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-v,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,v=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=v+f*a,t[1]=f+v*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,v=a*h,_=a*u;t[0]=l*h,t[4]=v*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,v=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=v*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+v,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*l,f=o*c,v=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-v,t[2]=v*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lp,e,cp)}lookAt(e,t,n){let i=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),Vi.crossVectors(n,On),Vi.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),Vi.crossVectors(n,On)),Vi.normalize(),$o.crossVectors(On,Vi),i[0]=Vi.x,i[4]=$o.x,i[8]=On.x,i[1]=Vi.y,i[5]=$o.y,i[9]=On.y,i[2]=Vi.z,i[6]=$o.z,i[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],v=n[2],_=n[6],g=n[10],p=n[14],m=n[3],x=n[7],y=n[11],E=n[15],T=i[0],P=i[4],C=i[8],S=i[12],w=i[1],R=i[5],D=i[9],I=i[13],O=i[2],W=i[6],$=i[10],Z=i[14],q=i[3],oe=i[7],ue=i[11],Me=i[15];return r[0]=o*T+a*w+l*O+c*q,r[4]=o*P+a*R+l*W+c*oe,r[8]=o*C+a*D+l*$+c*ue,r[12]=o*S+a*I+l*Z+c*Me,r[1]=h*T+u*w+d*O+f*q,r[5]=h*P+u*R+d*W+f*oe,r[9]=h*C+u*D+d*$+f*ue,r[13]=h*S+u*I+d*Z+f*Me,r[2]=v*T+_*w+g*O+p*q,r[6]=v*P+_*R+g*W+p*oe,r[10]=v*C+_*D+g*$+p*ue,r[14]=v*S+_*I+g*Z+p*Me,r[3]=m*T+x*w+y*O+E*q,r[7]=m*P+x*R+y*W+E*oe,r[11]=m*C+x*D+y*$+E*ue,r[15]=m*S+x*I+y*Z+E*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],v=e[3],_=e[7],g=e[11],p=e[15];return v*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],v=e[12],_=e[13],g=e[14],p=e[15],m=u*g*c-_*d*c+_*l*f-a*g*f-u*l*p+a*d*p,x=v*d*c-h*g*c-v*l*f+o*g*f+h*l*p-o*d*p,y=h*_*c-v*u*c+v*a*f-o*_*f-h*a*p+o*u*p,E=v*u*l-h*_*l-v*a*d+o*_*d+h*a*g-o*u*g,T=t*m+n*x+i*y+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/T;return e[0]=m*P,e[1]=(_*d*r-u*g*r-_*i*f+n*g*f+u*i*p-n*d*p)*P,e[2]=(a*g*r-_*l*r+_*i*c-n*g*c-a*i*p+n*l*p)*P,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*P,e[4]=x*P,e[5]=(h*g*r-v*d*r+v*i*f-t*g*f-h*i*p+t*d*p)*P,e[6]=(v*l*r-o*g*r-v*i*c+t*g*c+o*i*p-t*l*p)*P,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*P,e[8]=y*P,e[9]=(v*u*r-h*_*r-v*n*f+t*_*f+h*n*p-t*u*p)*P,e[10]=(o*_*r-v*a*r+v*n*c-t*_*c-o*n*p+t*a*p)*P,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*P,e[12]=E*P,e[13]=(h*_*i-v*u*i+v*n*d-t*_*d-h*n*g+t*u*g)*P,e[14]=(v*a*i-o*_*i-v*n*l+t*_*l+o*n*g-t*a*g)*P,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,v=r*u,_=o*h,g=o*u,p=a*u,m=l*c,x=l*h,y=l*u,E=n.x,T=n.y,P=n.z;return i[0]=(1-(_+p))*E,i[1]=(f+y)*E,i[2]=(v-x)*E,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+p))*T,i[6]=(g+m)*T,i[7]=0,i[8]=(v+x)*P,i[9]=(g-m)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Ds.set(i[0],i[1],i[2]).length(),o=Ds.set(i[4],i[5],i[6]).length(),a=Ds.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Jn.copy(this);let c=1/r,h=1/o,u=1/a;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=u,Jn.elements[9]*=u,Jn.elements[10]*=u,t.setFromRotationMatrix(Jn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ei,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),v,_;if(l)v=r/(o-r),_=o*r/(o-r);else if(a===ei)v=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===qr)v=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ei,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),v,_;if(l)v=1/(o-r),_=o/(o-r);else if(a===ei)v=-2/(o-r),_=-(o+r)/(o-r);else if(a===qr)v=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ds=new U,Jn=new Et,lp=new U(0,0,0),cp=new U(1,1,1),Vi=new U,$o=new U,On=new U,yu=new Et,_u=new Xn,qn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _u.setFromEuler(this),this.setFromQuaternion(_u,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},hp=0,bu=new U,ks=new Xn,bi=new Et,Ko=new U,Dr=new U,up=new U,dp=new Xn,Mu=new U(1,0,0),Su=new U(0,1,0),wu=new U(0,0,1),Eu={type:"added"},fp={type:"removed"},Fs={type:"childadded",child:null},Tc={type:"childremoved",child:null},sn=class s extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new U,t=new qn,n=new Xn,i=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Et},normalMatrix:{value:new ct}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Mu,e)}rotateY(e){return this.rotateOnAxis(Su,e)}rotateZ(e){return this.rotateOnAxis(wu,e)}translateOnAxis(e,t){return bu.copy(e).applyQuaternion(this.quaternion),this.position.add(bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mu,e)}translateY(e){return this.translateOnAxis(Su,e)}translateZ(e){return this.translateOnAxis(wu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ko.copy(e):Ko.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Dr,Ko,this.up):bi.lookAt(Ko,Dr,this.up),this.quaternion.setFromRotationMatrix(bi),i&&(bi.extractRotation(i.matrixWorld),ks.setFromRotationMatrix(bi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Eu),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fp),Tc.child=e,this.dispatchEvent(Tc),Tc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Eu),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,e,up),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Dr,dp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),v=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};sn.DEFAULT_UP=new U(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=new U,Mi=new U,Ac=new U,Si=new U,Us=new U,Ns=new U,Tu=new U,Rc=new U,Cc=new U,Ic=new U,Pc=new At,Lc=new At,Dc=new At,wi=class s{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),jn.subVectors(e,t),i.cross(jn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){jn.subVectors(i,t),Mi.subVectors(n,t),Ac.subVectors(e,t);let o=jn.dot(jn),a=jn.dot(Mi),l=jn.dot(Ac),c=Mi.dot(Mi),h=Mi.dot(Ac),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,v=(o*h-a*l)*d;return r.set(1-f-v,v,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Pc.setScalar(0),Lc.setScalar(0),Dc.setScalar(0),Pc.fromBufferAttribute(e,t),Lc.fromBufferAttribute(e,n),Dc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Pc,r.x),o.addScaledVector(Lc,r.y),o.addScaledVector(Dc,r.z),o}static isFrontFacing(e,t,n,i){return jn.subVectors(n,t),Mi.subVectors(e,t),jn.cross(Mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),jn.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Us.subVectors(i,n),Ns.subVectors(r,n),Rc.subVectors(e,n);let l=Us.dot(Rc),c=Ns.dot(Rc);if(l<=0&&c<=0)return t.copy(n);Cc.subVectors(e,i);let h=Us.dot(Cc),u=Ns.dot(Cc);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Us,o);Ic.subVectors(e,r);let f=Us.dot(Ic),v=Ns.dot(Ic);if(v>=0&&f<=v)return t.copy(r);let _=f*c-l*v;if(_<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(n).addScaledVector(Ns,a);let g=h*v-f*u;if(g<=0&&u-h>=0&&f-v>=0)return Tu.subVectors(r,i),a=(u-h)/(u-h+(f-v)),t.copy(i).addScaledVector(Tu,a);let p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Us,o).addScaledVector(Ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},Zo={h:0,s:0,l:0};function kc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var et=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,bt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=bt.workingColorSpace){if(e=ip(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=kc(o,r,e+1/3),this.g=kc(o,r,e),this.b=kc(o,r,e-1/3)}return bt.colorSpaceToWorking(this,i),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let n=Pd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return bt.workingToColorSpace(vn.copy(this),e),Math.round(gt(vn.r*255,0,255))*65536+Math.round(gt(vn.g*255,0,255))*256+Math.round(gt(vn.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.workingToColorSpace(vn.copy(this),t);let n=vn.r,i=vn.g,r=vn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=bt.workingColorSpace){return bt.workingToColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=qt){bt.workingToColorSpace(vn.copy(this),e);let t=vn.r,n=vn.g,i=vn.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(Zo);let n=gc(Gi.h,Zo.h,t),i=gc(Gi.s,Zo.s,t),r=gc(Gi.l,Zo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},vn=new et;et.NAMES=Pd;var pp=0,di=class extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Ei(),this.name="",this.type="Material",this.blending=Ri,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ks,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ks&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Qt=class extends di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var nn=new U,Jo=new Te,mp=0,wn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ya,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jo.fromBufferAttribute(this,t),Jo.applyMatrix3(e),this.setXY(t,Jo.x,Jo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ci(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ya&&(e.usage=this.usage),e}};var Zr=class extends wn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Jr=class extends wn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mt=class extends wn{constructor(e,t,n){super(new Float32Array(e),t,n)}},gp=0,Wn=new Et,Fc=new sn,Os=new U,Bn=new ui,kr=new ui,hn=new U,en=class s extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ph(e)?Jr:Zr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,t,n){return Wn.makeTranslation(e,t,n),this.applyMatrix4(Wn),this}scale(e,t,n){return Wn.makeScale(e,t,n),this.applyMatrix4(Wn),this}lookAt(e){return Fc.lookAt(e),Fc.updateMatrix(),this.applyMatrix4(Fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];kr.setFromBufferAttribute(a),this.morphTargetsRelative?(hn.addVectors(Bn.min,kr.min),Bn.expandByPoint(hn),hn.addVectors(Bn.max,kr.max),Bn.expandByPoint(hn)):(Bn.expandByPoint(kr.min),Bn.expandByPoint(kr.max))}Bn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)hn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(hn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)hn.fromBufferAttribute(a,c),l&&(Os.fromBufferAttribute(e,c),hn.add(Os)),i=Math.max(i,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new U,l[C]=new U;let c=new U,h=new U,u=new U,d=new Te,f=new Te,v=new Te,_=new U,g=new U;function p(C,S,w){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,w),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),v.fromBufferAttribute(r,w),h.sub(c),u.sub(c),f.sub(d),v.sub(d);let R=1/(f.x*v.y-v.x*f.y);isFinite(R)&&(_.copy(h).multiplyScalar(v.y).addScaledVector(u,-f.y).multiplyScalar(R),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-v.x).multiplyScalar(R),a[C].add(_),a[S].add(_),a[w].add(_),l[C].add(g),l[S].add(g),l[w].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let C=0,S=m.length;C<S;++C){let w=m[C],R=w.start,D=w.count;for(let I=R,O=R+D;I<O;I+=3)p(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let x=new U,y=new U,E=new U,T=new U;function P(C){E.fromBufferAttribute(i,C),T.copy(E);let S=a[C];x.copy(S),x.sub(E.multiplyScalar(E.dot(S))).normalize(),y.crossVectors(T,S);let R=y.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,R)}for(let C=0,S=m.length;C<S;++C){let w=m[C],R=w.start,D=w.count;for(let I=R,O=R+D;I<O;I+=3)P(e.getX(I+0)),P(e.getX(I+1)),P(e.getX(I+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let v=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,v),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,v=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[v++]=c[f++]}return new wn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Au=new Et,ls=new wa,jo=new Yi,Ru=new U,Qo=new U,ea=new U,ta=new U,Uc=new U,na=new U,Cu=new U,ia=new U,Ze=class extends sn{constructor(e=new en,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Uc.fromBufferAttribute(u,e),o?na.addScaledVector(Uc,h):na.addScaledVector(Uc.sub(t),h))}t.add(na)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(jo.containsPoint(ls.origin)===!1&&(ls.intersectSphere(jo,Ru)===null||ls.origin.distanceToSquared(Ru)>(e.far-e.near)**2))&&(Au.copy(r).invert(),ls.copy(e.ray).applyMatrix4(Au),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,_=d.length;v<_;v++){let g=d[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let T=a.getX(y),P=a.getX(y+1),C=a.getX(y+2);i=sa(this,p,e,n,c,h,u,T,P,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=v,p=_;g<p;g+=3){let m=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=sa(this,o,e,n,c,h,u,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,_=d.length;v<_;v++){let g=d[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let T=y,P=y+1,C=y+2;i=sa(this,p,e,n,c,h,u,T,P,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=v,p=_;g<p;g+=3){let m=g,x=g+1,y=g+2;i=sa(this,o,e,n,c,h,u,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function vp(s,e,t,n,i,r,o,a){let l;if(e.side===pn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Ai,a),l===null)return null;ia.copy(a),ia.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:s}}function sa(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Qo),s.getVertexPosition(l,ea),s.getVertexPosition(c,ta);let h=vp(s,e,t,n,Qo,ea,ta,Cu);if(h){let u=new U;wi.getBarycoord(Cu,Qo,ea,ta,u),i&&(h.uv=wi.getInterpolatedAttribute(i,a,l,c,u,new Te)),r&&(h.uv1=wi.getInterpolatedAttribute(r,a,l,c,u,new Te)),o&&(h.normal=wi.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new U,materialIndex:0};wi.getNormal(Qo,ea,ta,d.normal),h.face=d,h.barycoord=u}return h}var Xt=class s extends en{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;v("z","y","x",-1,-1,n,t,e,o,r,0),v("z","y","x",1,-1,n,t,-e,o,r,1),v("x","z","y",1,1,e,n,t,i,o,2),v("x","z","y",1,-1,e,n,-t,i,o,3),v("x","y","z",1,-1,e,t,n,i,r,4),v("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(u,2));function v(_,g,p,m,x,y,E,T,P,C,S){let w=y/P,R=E/C,D=y/2,I=E/2,O=T/2,W=P+1,$=C+1,Z=0,q=0,oe=new U;for(let ue=0;ue<$;ue++){let Me=ue*R-I;for(let Ce=0;Ce<W;Ce++){let qe=Ce*w-D;oe[_]=qe*m,oe[g]=Me*x,oe[p]=O,c.push(oe.x,oe.y,oe.z),oe[_]=0,oe[g]=0,oe[p]=T>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Ce/P),u.push(1-ue/C),Z+=1}}for(let ue=0;ue<C;ue++)for(let Me=0;Me<P;Me++){let Ce=d+Me+W*ue,qe=d+Me+W*(ue+1),Ye=d+(Me+1)+W*(ue+1),He=d+(Me+1)+W*ue;l.push(Ce,qe,He),l.push(qe,Ye,He),q+=6}a.addGroup(f,q,S),f+=q,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function vs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function yn(s){let e={};for(let t=0;t<s.length;t++){let n=vs(s[t]);for(let i in n)e[i]=n[i]}return e}function xp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function mh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}var Ld={clone:vs,merge:yn},yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_p=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yp,this.fragmentShader=_p,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vs(e.uniforms),this.uniformsGroups=xp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},jr=class extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Wi=new U,Iu=new Te,Pu=new Te,un=class extends jr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=_a*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(mc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _a*2*Math.atan(Math.tan(mc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,Iu,Pu),t.subVectors(Pu,Iu)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(mc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bs=-90,zs=1,Ea=class extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new un(Bs,zs,e,t);i.layers=this.layers,this.add(i);let r=new un(Bs,zs,e,t);r.layers=this.layers,this.add(r);let o=new un(Bs,zs,e,t);o.layers=this.layers,this.add(o);let a=new un(Bs,zs,e,t);a.layers=this.layers,this.add(a);let l=new un(Bs,zs,e,t);l.layers=this.layers,this.add(l);let c=new un(Bs,zs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ei)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},Qr=class extends En{constructor(e=[],t=ms,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ta=class extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Qr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xt(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:pn,blending:Li});r.uniforms.tEquirect.value=t;let o=new Ze(i,r),a=t.minFilter;return t.minFilter===Qi&&(t.minFilter=ti),new Ea(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Jt=class extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}},bp={type:"move"},js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,v=.005;c.inputState.pinching&&d>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bp)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var eo=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new et(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ii=class extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Aa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ya,this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Sn=new U,to=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ci(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ci(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ci(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ci(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ci(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),i=Dt(i,this.array),r=Dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Qs=class extends di{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hs,Fr=new U,Vs=new U,Gs=new U,Ws=new Te,Ur=new Te,Dd=new Et,ra=new U,Nr=new U,oa=new U,Lu=new Te,Nc=new Te,Du=new Te,no=class extends sn{constructor(e=new Qs){if(super(),this.isSprite=!0,this.type="Sprite",Hs===void 0){Hs=new en;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Aa(t,5);Hs.setIndex([0,1,2,0,2,3]),Hs.setAttribute("position",new to(n,3,0,!1)),Hs.setAttribute("uv",new to(n,2,3,!1))}this.geometry=Hs,this.material=e,this.center=new Te(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vs.setFromMatrixScale(this.matrixWorld),Dd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Gs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vs.multiplyScalar(-Gs.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;aa(ra.set(-.5,-.5,0),Gs,o,Vs,i,r),aa(Nr.set(.5,-.5,0),Gs,o,Vs,i,r),aa(oa.set(.5,.5,0),Gs,o,Vs,i,r),Lu.set(0,0),Nc.set(1,0),Du.set(1,1);let a=e.ray.intersectTriangle(ra,Nr,oa,!1,Fr);if(a===null&&(aa(Nr.set(-.5,.5,0),Gs,o,Vs,i,r),Nc.set(0,1),a=e.ray.intersectTriangle(ra,oa,Nr,!1,Fr),a===null))return;let l=e.ray.origin.distanceTo(Fr);l<e.near||l>e.far||t.push({distance:l,point:Fr.clone(),uv:wi.getInterpolation(Fr,ra,Nr,oa,Lu,Nc,Du,new Te),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function aa(s,e,t,n,i,r){Ws.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ur.x=r*Ws.x-i*Ws.y,Ur.y=i*Ws.x+r*Ws.y):Ur.copy(Ws),s.copy(e),s.x+=Ur.x,s.y+=Ur.y,s.applyMatrix4(Dd)}var Ra=class extends En{constructor(e=null,t=1,n=1,i,r,o,a,l,c=kn,h=kn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pi=class extends wn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Xs=new Et,ku=new Et,la=[],Fu=new ui,Mp=new Et,Or=new Ze,Br=new Yi,Fn=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Mp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Fu.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(Fu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Br.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Br)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(n),e.ray.intersectsSphere(Br)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Xs),ku.multiplyMatrices(n,Xs),Or.matrixWorld=ku,Or.raycast(e,la);for(let o=0,a=la.length;o<a;o++){let l=la[o];l.instanceId=r,l.object=this,t.push(l)}la.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ra(new Float32Array(i*this.count),i,this.count,hl,ri));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Oc=new U,Sp=new U,wp=new ct,li=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Oc.subVectors(n,t).cross(Sp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Oc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||wp.getNormalMatrix(e),i=this.coplanarPoint(Oc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},cs=new Yi,Ep=new Te(.5,.5),ca=new U,er=class{constructor(e=new li,t=new li,n=new li,i=new li,r=new li,o=new li){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ei,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],v=r[8],_=r[9],g=r[10],p=r[11],m=r[12],x=r[13],y=r[14],E=r[15];if(i[0].setComponents(c-o,f-h,p-v,E-m).normalize(),i[1].setComponents(c+o,f+h,p+v,E+m).normalize(),i[2].setComponents(c+a,f+u,p+_,E+x).normalize(),i[3].setComponents(c-a,f-u,p-_,E-x).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,p-g,E-y).normalize();else if(i[4].setComponents(c-l,f-d,p-g,E-y).normalize(),t===ei)i[5].setComponents(c+l,f+d,p+g,E+y).normalize();else if(t===qr)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){cs.center.set(0,0,0);let t=Ep.distanceTo(e.center);return cs.radius=.7071067811865476+t,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ca.x=i.normal.x>0?e.max.x:e.min.x,ca.y=i.normal.y>0?e.max.y:e.min.y,ca.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ca)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var io=class extends En{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},so=class extends En{constructor(e,t,n=es,i,r,o,a=kn,l=kn,c,h=$s,u=1){if(h!==$s&&h!==dr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Js(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ro=class extends En{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},tr=class s extends en{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,v=n*2+r,_=i+1,g=new U,p=new U;for(let m=0;m<=v;m++){let x=0,y=0,E=0,T=0;if(m<=n){let S=m/n,w=S*Math.PI/2;y=-h-e*Math.cos(w),E=e*Math.sin(w),T=-e*Math.cos(w),x=S*u}else if(m<=n+r){let S=(m-n)/r;y=-h+S*t,E=e,T=0,x=u+S*d}else{let S=(m-n-r)/n,w=S*Math.PI/2;y=h+e*Math.sin(w),E=e*Math.cos(w),T=e*Math.sin(w),x=u+d+S*u}let P=Math.max(0,Math.min(1,x/f)),C=0;m===0?C=.5/i:m===v&&(C=-.5/i);for(let S=0;S<=i;S++){let w=S/i,R=w*Math.PI*2,D=Math.sin(R),I=Math.cos(R);p.x=-E*I,p.y=y,p.z=E*D,a.push(p.x,p.y,p.z),g.set(-E*I,T,E*D),g.normalize(),l.push(g.x,g.y,g.z),c.push(w+C,P)}if(m>0){let S=(m-1)*_;for(let w=0;w<i;w++){let R=S+w,D=S+w+1,I=m*_+w,O=m*_+w+1;o.push(R,D,I),o.push(D,O,I)}}}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var kt=class s extends en{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],v=0,_=[],g=n/2,p=0;m(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new mt(u,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(f,2));function m(){let y=new U,E=new U,T=0,P=(t-e)/n;for(let C=0;C<=r;C++){let S=[],w=C/r,R=w*(t-e)+e;for(let D=0;D<=i;D++){let I=D/i,O=I*l+a,W=Math.sin(O),$=Math.cos(O);E.x=R*W,E.y=-w*n+g,E.z=R*$,u.push(E.x,E.y,E.z),y.set(W,P,$).normalize(),d.push(y.x,y.y,y.z),f.push(I,1-w),S.push(v++)}_.push(S)}for(let C=0;C<i;C++)for(let S=0;S<r;S++){let w=_[S][C],R=_[S+1][C],D=_[S+1][C+1],I=_[S][C+1];(e>0||S!==0)&&(h.push(w,R,I),T+=3),(t>0||S!==r-1)&&(h.push(R,D,I),T+=3)}c.addGroup(p,T,0),p+=T}function x(y){let E=v,T=new Te,P=new U,C=0,S=y===!0?e:t,w=y===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,g*w,0),d.push(0,w,0),f.push(.5,.5),v++;let R=v;for(let D=0;D<=i;D++){let O=D/i*l+a,W=Math.cos(O),$=Math.sin(O);P.x=S*$,P.y=g*w,P.z=S*W,u.push(P.x,P.y,P.z),d.push(0,w,0),T.x=W*.5+.5,T.y=$*.5*w+.5,f.push(T.x,T.y),v++}for(let D=0;D<i;D++){let I=E+D,O=R+D;y===!0?h.push(O,O+1,I):h.push(O+1,O,I),C+=3}c.addGroup(p,C,y===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ni=class s extends kt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ca=class s extends en{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new mt(r,3)),this.setAttribute("normal",new mt(r.slice(),3)),this.setAttribute("uv",new mt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(m){let x=new U,y=new U,E=new U;for(let T=0;T<t.length;T+=3)f(t[T+0],x),f(t[T+1],y),f(t[T+2],E),l(x,y,E,m)}function l(m,x,y,E){let T=E+1,P=[];for(let C=0;C<=T;C++){P[C]=[];let S=m.clone().lerp(y,C/T),w=x.clone().lerp(y,C/T),R=T-C;for(let D=0;D<=R;D++)D===0&&C===T?P[C][D]=S:P[C][D]=S.clone().lerp(w,D/R)}for(let C=0;C<T;C++)for(let S=0;S<2*(T-C)-1;S++){let w=Math.floor(S/2);S%2===0?(d(P[C][w+1]),d(P[C+1][w]),d(P[C][w])):(d(P[C][w+1]),d(P[C+1][w+1]),d(P[C+1][w]))}}function c(m){let x=new U;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(m),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){let m=new U;for(let x=0;x<r.length;x+=3){m.x=r[x+0],m.y=r[x+1],m.z=r[x+2];let y=g(m)/2/Math.PI+.5,E=p(m)/Math.PI+.5;o.push(y,1-E)}v(),u()}function u(){for(let m=0;m<o.length;m+=6){let x=o[m+0],y=o[m+2],E=o[m+4],T=Math.max(x,y,E),P=Math.min(x,y,E);T>.9&&P<.1&&(x<.2&&(o[m+0]+=1),y<.2&&(o[m+2]+=1),E<.2&&(o[m+4]+=1))}}function d(m){r.push(m.x,m.y,m.z)}function f(m,x){let y=m*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function v(){let m=new U,x=new U,y=new U,E=new U,T=new Te,P=new Te,C=new Te;for(let S=0,w=0;S<r.length;S+=9,w+=6){m.set(r[S+0],r[S+1],r[S+2]),x.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),T.set(o[w+0],o[w+1]),P.set(o[w+2],o[w+3]),C.set(o[w+4],o[w+5]),E.copy(m).add(x).add(y).divideScalar(3);let R=g(E);_(T,w+0,m,R),_(P,w+2,x,R),_(C,w+4,y,R)}}function _(m,x,y,E){E<0&&m.x===1&&(o[x]=m.x-1),y.x===0&&y.z===0&&(o[x]=E/2/Math.PI+.5)}function g(m){return Math.atan2(m.z,-m.x)}function p(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var zn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Te:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,i=[],r=[],o=[],a=new U,l=new Et;for(let f=0;f<=e;f++){let v=f/e;i[f]=this.getTangentAt(v,new U)}r[0]=new U,o[0]=new U;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(gt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,v))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(gt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(i[v],f*v)),o[v].crossVectors(i[v],r[v])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},nr=class extends zn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Te){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ia=class extends nr{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function gh(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var ha=new U,Bc=new gh,zc=new gh,Hc=new gh,Pa=class extends zn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new U){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(ha.subVectors(i[0],i[1]).add(i[0]),c=ha);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ha.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ha),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,v=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),v<1e-4&&(v=_),g<1e-4&&(g=_),Bc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,v,_,g),zc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,v,_,g),Hc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,v,_,g)}else this.curveType==="catmullrom"&&(Bc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),zc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Hc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Bc.calc(l),zc.calc(l),Hc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new U().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Uu(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Tp(s,e){let t=1-s;return t*t*e}function Ap(s,e){return 2*(1-s)*s*e}function Rp(s,e){return s*s*e}function Vr(s,e,t,n){return Tp(s,e)+Ap(s,t)+Rp(s,n)}function Cp(s,e){let t=1-s;return t*t*t*e}function Ip(s,e){let t=1-s;return 3*t*t*s*e}function Pp(s,e){return 3*(1-s)*s*s*e}function Lp(s,e){return s*s*s*e}function Gr(s,e,t,n,i){return Cp(s,e)+Ip(s,t)+Pp(s,n)+Lp(s,i)}var oo=class extends zn{constructor(e=new Te,t=new Te,n=new Te,i=new Te){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Te){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Gr(e,i.x,r.x,o.x,a.x),Gr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},La=class extends zn{constructor(e=new U,t=new U,n=new U,i=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new U){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Gr(e,i.x,r.x,o.x,a.x),Gr(e,i.y,r.y,o.y,a.y),Gr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ao=class extends zn{constructor(e=new Te,t=new Te){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Te){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Te){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends zn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends zn{constructor(e=new Te,t=new Te,n=new Te){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Te){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Vr(e,i.x,r.x,o.x),Vr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends zn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Vr(e,i.x,r.x,o.x),Vr(e,i.y,r.y,o.y),Vr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Te){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Uu(a,l.x,c.x,h.x,u.x),Uu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Te().fromArray(i))}return this}},Nu=Object.freeze({__proto__:null,ArcCurve:Ia,CatmullRomCurve3:Pa,CubicBezierCurve:oo,CubicBezierCurve3:La,EllipseCurve:nr,LineCurve:ao,LineCurve3:Da,QuadraticBezierCurve:lo,QuadraticBezierCurve3:ka,SplineCurve:co}),Fa=class extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Nu[i.type]().fromJSON(i))}return this}},ho=class extends Fa{constructor(e){super(),this.type="Path",this.currentPoint=new Te,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ao(this.currentPoint.clone(),new Te(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new lo(this.currentPoint.clone(),new Te(e,t),new Te(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new oo(this.currentPoint.clone(),new Te(e,t),new Te(n,i),new Te(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new co(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new nr(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ir=class extends ho{constructor(e){super(e),this.uuid=Ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new ho().fromJSON(i))}return this}};function Dp(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=kd(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Op(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=s[d],v=s[d+1];f<a&&(a=f),v<l&&(l=v),f>h&&(h=f),v>u&&(u=v)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return uo(r,o,t,a,l,c,0),o}function kd(s,e,t,n,i){let r;if(i===Kp(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Ou(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Ou(o/n|0,s[o],s[o+1],r);return r&&sr(r,r.next)&&(po(r),r=r.next),r}function fs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(sr(t,t.next)||Zt(t.prev,t,t.next)===0)){if(po(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function uo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Gp(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Fp(s,n,i,r):kp(s)){e.push(l.i,s.i,c.i),po(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Up(fs(s),e),uo(s,e,t,n,i,r,2)):o===2&&Np(s,e,t,n,i,r):uo(fs(s),e,t,n,i,r,1);break}}}function kp(s){let e=s.prev,t=s,n=s.next;if(Zt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),v=n.next;for(;v!==e;){if(v.x>=h&&v.x<=d&&v.y>=u&&v.y<=f&&Hr(i,a,r,l,o,c,v.x,v.y)&&Zt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Fp(s,e,t,n){let i=s.prev,r=s,o=s.next;if(Zt(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),v=Math.min(h,u,d),_=Math.max(a,l,c),g=Math.max(h,u,d),p=Yc(f,v,e,t,n),m=Yc(_,g,e,t,n),x=s.prevZ,y=s.nextZ;for(;x&&x.z>=p&&y&&y.z<=m;){if(x.x>=f&&x.x<=_&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&Hr(a,h,l,u,c,d,x.x,x.y)&&Zt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&Hr(a,h,l,u,c,d,y.x,y.y)&&Zt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&Hr(a,h,l,u,c,d,x.x,x.y)&&Zt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=m;){if(y.x>=f&&y.x<=_&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&Hr(a,h,l,u,c,d,y.x,y.y)&&Zt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Up(s,e){let t=s;do{let n=t.prev,i=t.next.next;!sr(n,i)&&Ud(n,t,t.next,i)&&fo(n,i)&&fo(i,n)&&(e.push(n.i,t.i,i.i),po(t),po(t.next),t=s=i),t=t.next}while(t!==s);return fs(t)}function Np(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&qp(o,a)){let l=Nd(o,a);o=fs(o,o.next),l=fs(l,l.next),uo(o,e,t,n,i,r,0),uo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Op(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=kd(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Xp(c))}i.sort(Bp);for(let r=0;r<i.length;r++)t=zp(i[r],t);return t}function Bp(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function zp(s,e){let t=Hp(s,e);if(!t)return e;let n=Nd(t,s);return fs(n,n.next),fs(t,t.next)}function Hp(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(sr(s,t))return t;do{if(sr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Fd(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);fo(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Vp(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Vp(s,e){return Zt(s.prev,s,e.prev)<0&&Zt(e.next,s,s.next)<0}function Gp(s,e,t,n){let i=s;do i.z===0&&(i.z=Yc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Wp(i)}function Wp(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function Yc(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Xp(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Fd(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Hr(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Fd(s,e,t,n,i,r,o,a)}function qp(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Yp(s,e)&&(fo(s,e)&&fo(e,s)&&$p(s,e)&&(Zt(s.prev,s,e.prev)||Zt(s,e.prev,e))||sr(s,e)&&Zt(s.prev,s,s.next)>0&&Zt(e.prev,e,e.next)>0)}function Zt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function sr(s,e){return s.x===e.x&&s.y===e.y}function Ud(s,e,t,n){let i=da(Zt(s,e,t)),r=da(Zt(s,e,n)),o=da(Zt(t,n,s)),a=da(Zt(t,n,e));return!!(i!==r&&o!==a||i===0&&ua(s,t,e)||r===0&&ua(s,n,e)||o===0&&ua(t,s,n)||a===0&&ua(t,e,n))}function ua(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function da(s){return s>0?1:s<0?-1:0}function Yp(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Ud(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function fo(s,e){return Zt(s.prev,s,s.next)<0?Zt(s,e,s.next)>=0&&Zt(s,s.prev,e)>=0:Zt(s,e,s.prev)<0||Zt(s,s.next,e)<0}function $p(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Nd(s,e){let t=$c(s.i,s.x,s.y),n=$c(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ou(s,e,t,n){let i=$c(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function po(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function $c(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Kp(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Kc=class{static triangulate(e,t,n=2){return Dp(e,t,n)}},Ys=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Bu(e),zu(n,e);let o=e.length;t.forEach(Bu);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,zu(n,t[l]);let a=Kc.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Bu(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function zu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var mo=class s extends Ca{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Tn=class s extends en{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],v=[],_=[],g=[];for(let p=0;p<h;p++){let m=p*d-o;for(let x=0;x<c;x++){let y=x*u-r;v.push(y,-m,0),_.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let m=0;m<a;m++){let x=m+c*p,y=m+c*(p+1),E=m+1+c*(p+1),T=m+1+c*p;f.push(x,y,T),f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},fi=class s extends en{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new U,v=new Te;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,h.push(v.x,v.y)}u+=d}for(let _=0;_<i;_++){let g=_*(n+1);for(let p=0;p<n;p++){let m=p+g,x=m,y=m+n+1,E=m+n+2,T=m+1;a.push(x,y,T),a.push(y,E,T)}}this.setIndex(a),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},go=class s extends en{constructor(e=new ir([new Te(0,.5),new Te(-.5,-.5),new Te(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new mt(i,3)),this.setAttribute("normal",new mt(r,3)),this.setAttribute("uv",new mt(o,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,v=d.holes;Ys.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=v.length;g<p;g++){let m=v[g];Ys.isClockWise(m)===!0&&(v[g]=m.reverse())}let _=Ys.triangulateShape(f,v);for(let g=0,p=v.length;g<p;g++){let m=v[g];f=f.concat(m)}for(let g=0,p=f.length;g<p;g++){let m=f[g];i.push(m.x,m.y,0),r.push(0,0,1),o.push(m.x,m.y)}for(let g=0,p=_.length;g<p;g++){let m=_[g],x=m[0]+u,y=m[1]+u,E=m[2]+u;n.push(x,y,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Zp(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Zp(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var An=class s extends en{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new U,d=new U,f=[],v=[],_=[],g=[];for(let p=0;p<=n;p++){let m=[],x=p/n,y=0;p===0&&o===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let T=E/t;u.x=-e*Math.cos(i+T*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+T*r)*Math.sin(o+x*a),v.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(T+y,1-x),m.push(c++)}h.push(m)}for(let p=0;p<n;p++)for(let m=0;m<t;m++){let x=h[p][m+1],y=h[p][m],E=h[p+1][m],T=h[p+1][m+1];(p!==0||o>0)&&f.push(x,y,T),(p!==n-1||l<Math.PI)&&f.push(y,E,T)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var $i=class s extends en{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new U,u=new U,d=new U;for(let f=0;f<=n;f++)for(let v=0;v<=i;v++){let _=v/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(v/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let v=1;v<=i;v++){let _=(i+1)*f+v-1,g=(i+1)*(f-1)+v-1,p=(i+1)*(f-1)+v,m=(i+1)*f+v;o.push(_,g,m),o.push(g,p,m)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ki=class extends di{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vl,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var tn=class extends di{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vl,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ua=class extends di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Na=class extends di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fa(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Jp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var ps=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Oa=class extends ps{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wc,endingEnd:Wc}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xc:r=e,a=2*t-n;break;case qc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Xc:o=e,l=2*n-t;break;case qc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,v=(n-t)/(i-t),_=v*v,g=_*v,p=-d*g+2*d*_-d*v,m=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*v+1,x=(-1-f)*g+(1.5+f)*_+.5*v,y=f*g-f*_;for(let E=0;E!==a;++E)r[E]=p*o[h+E]+m*o[c+E]+x*o[l+E]+y*o[u+E];return r}},Ba=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},za=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Hn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fa(t,this.TimeBufferType),this.values=fa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fa(e.times,Array),values:fa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Oa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Wr:t=this.InterpolantFactoryMethodDiscrete;break;case xa:t=this.InterpolantFactoryMethodLinear;break;case pa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wr;case this.InterpolantFactoryMethodLinear:return xa;case this.InterpolantFactoryMethodSmooth:return pa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Jp(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===pa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let v=0;v!==n;++v){let _=t[u+v];if(_!==t[d+v]||_!==t[f+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Hn.prototype.ValueTypeName="";Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=xa;var Zi=class extends Hn{constructor(e,t,n){super(e,t,n)}};Zi.prototype.ValueTypeName="bool";Zi.prototype.ValueBufferType=Array;Zi.prototype.DefaultInterpolation=Wr;Zi.prototype.InterpolantFactoryMethodLinear=void 0;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ha=class extends Hn{constructor(e,t,n,i){super(e,t,n,i)}};Ha.prototype.ValueTypeName="color";var Va=class extends Hn{constructor(e,t,n,i){super(e,t,n,i)}};Va.prototype.ValueTypeName="number";var Ga=class extends ps{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Xn.slerpFlat(r,0,o,c-a,o,c,l);return r}},vo=class extends Hn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ga(this.times,this.values,this.getValueSize(),e)}};vo.prototype.ValueTypeName="quaternion";vo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends Hn{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName="string";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Wr;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends Hn{constructor(e,t,n,i){super(e,t,n,i)}};Wa.prototype.ValueTypeName="vector";var Xa=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],v=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Od=new Xa,qa=class{constructor(e){this.manager=e!==void 0?e:Od,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};qa.DEFAULT_MATERIAL_NAME="__DEFAULT";var rr=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},or=class extends rr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new et(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Vc=new Et,Hu=new U,Vu=new U,Ya=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new er,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Hu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hu),Vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vu),t.updateMatrixWorld(),Vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Gu=new Et,zr=new U,Gc=new U,Zc=class extends Ya{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new At(2,1,1,1),new At(0,1,1,1),new At(3,1,1,1),new At(1,1,1,1),new At(3,0,1,1),new At(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),zr.setFromMatrixPosition(e.matrixWorld),n.position.copy(zr),Gc.copy(n.position),Gc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Gc),n.updateMatrixWorld(),i.makeTranslation(-zr.x,-zr.y,-zr.z),Gu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gu,n.coordinateSystem,n.reversedDepth)}},xo=class extends rr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Zc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},yo=class extends jr{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Jc=class extends Ya{constructor(){super(new yo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ar=class extends rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new Jc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var _o=class extends en{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var $a=class extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var vh="\\[\\]\\.:\\/",jp=new RegExp("["+vh+"]","g"),xh="[^"+vh+"]",Qp="[^"+vh.replace("\\.","")+"]",em=/((?:WC+[\/:])*)/.source.replace("WC",xh),tm=/(WCOD+)?/.source.replace("WCOD",Qp),nm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xh),im=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xh),sm=new RegExp("^"+em+tm+nm+im+"$"),rm=["material","materials","bones","map"],jc=class{constructor(e,t,n){let i=n||Wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Wt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(jp,"")}static parseTrackName(e){let t=sm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);rm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Wt.Composite=jc;Wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Wt.prototype.GetterByBindingType=[Wt.prototype._getValue_direct,Wt.prototype._getValue_array,Wt.prototype._getValue_arrayElement,Wt.prototype._getValue_toArray];Wt.prototype.SetterByBindingTypeAndVersioning=[[Wt.prototype._setValue_direct,Wt.prototype._setValue_direct_setNeedsUpdate,Wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_array,Wt.prototype._setValue_array_setNeedsUpdate,Wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_arrayElement,Wt.prototype._setValue_arrayElement_setNeedsUpdate,Wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_fromArray,Wt.prototype._setValue_fromArray_setNeedsUpdate,Wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ky=new Float32Array(1);function yh(s,e,t,n){let i=om(n);switch(t){case lh:return s*e;case hl:return s*e/i.components*i.byteLength;case ul:return s*e/i.components*i.byteLength;case hh:return s*e*2/i.components*i.byteLength;case dl:return s*e*2/i.components*i.byteLength;case ch:return s*e*3/i.components*i.byteLength;case Yn:return s*e*4/i.components*i.byteLength;case fl:return s*e*4/i.components*i.byteLength;case So:case wo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Eo:case To:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ml:case vl:return Math.max(s,16)*Math.max(e,8)/4;case pl:case gl:return Math.max(s,8)*Math.max(e,8)/2;case xl:case yl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case _l:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case wl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case El:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Tl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Al:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Cl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Il:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Dl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case kl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Fl:case Ul:case Nl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Ol:case Bl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case zl:case Hl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function om(s){switch(s){case si:case sh:return{byteLength:1,components:1};case cr:case rh:case hr:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case es:case al:case ri:return{byteLength:4,components:1};case oh:case ah:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function cf(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function lm(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,v)=>f.start-v.start);let d=0;for(let f=1;f<u.length;f++){let v=u[d],_=u[f];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,v=u.length;f<v;f++){let _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hm=`#ifdef USE_ALPHAHASH
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
#endif`,um=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mm=`#ifdef USE_AOMAP
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
#endif`,gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vm=`#ifdef USE_BATCHING
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
#endif`,xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_m=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mm=`#ifdef USE_IRIDESCENCE
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
#endif`,Sm=`#ifdef USE_BUMPMAP
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
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lm=`#define PI 3.141592653589793
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
} // validated`,Dm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,km=`vec3 transformedNormal = objectNormal;
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
#endif`,Fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bm="gl_FragColor = linearToOutputTexel( gl_FragColor );",zm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hm=`#ifdef USE_ENVMAP
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
#endif`,Vm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xm=`#ifdef USE_ENVMAP
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
#endif`,qm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Km=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zm=`#ifdef USE_GRADIENTMAP
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
}`,Jm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,e0=`uniform bool receiveShadow;
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
#endif`,t0=`#ifdef USE_ENVMAP
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
#endif`,n0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,s0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o0=`PhysicalMaterial material;
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
#endif`,a0=`struct PhysicalMaterial {
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
}`,l0=`
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
#endif`,c0=`#if defined( RE_IndirectDiffuse )
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
#endif`,h0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,d0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,m0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,g0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,v0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,x0=`#if defined( USE_POINTS_UV )
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
#endif`,y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,b0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`#ifdef USE_MORPHTARGETS
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
#endif`,E0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,A0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,R0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,P0=`#ifdef USE_NORMALMAP
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
#endif`,L0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,k0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,O0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,H0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,q0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Y0=`float getShadowMask() {
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
}`,$0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,K0=`#ifdef USE_SKINNING
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
#endif`,Z0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,J0=`#ifdef USE_SKINNING
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
#endif`,j0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ng=`#ifdef USE_TRANSMISSION
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
#endif`,ig=`#ifdef USE_TRANSMISSION
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
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cg=`uniform sampler2D t2D;
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
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`#include <common>
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
}`,mg=`#if DEPTH_PACKING == 3200
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
}`,gg=`#define DISTANCE
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
}`,vg=`#define DISTANCE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_g=`uniform float scale;
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
}`,bg=`uniform vec3 diffuse;
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
}`,Mg=`#include <common>
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
}`,Sg=`uniform vec3 diffuse;
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
}`,wg=`#define LAMBERT
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
}`,Eg=`#define LAMBERT
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
}`,Tg=`#define MATCAP
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
}`,Ag=`#define MATCAP
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
}`,Rg=`#define NORMAL
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
}`,Cg=`#define NORMAL
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
}`,Ig=`#define PHONG
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
}`,Pg=`#define PHONG
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
}`,Lg=`#define STANDARD
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
}`,Dg=`#define STANDARD
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
}`,kg=`#define TOON
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
}`,Fg=`#define TOON
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
}`,Ug=`uniform float size;
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
}`,Ng=`uniform vec3 diffuse;
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
}`,Og=`#include <common>
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
}`,Bg=`uniform vec3 color;
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
}`,zg=`uniform float rotation;
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
}`,Hg=`uniform vec3 diffuse;
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
}`,ut={alphahash_fragment:cm,alphahash_pars_fragment:hm,alphamap_fragment:um,alphamap_pars_fragment:dm,alphatest_fragment:fm,alphatest_pars_fragment:pm,aomap_fragment:mm,aomap_pars_fragment:gm,batching_pars_vertex:vm,batching_vertex:xm,begin_vertex:ym,beginnormal_vertex:_m,bsdfs:bm,iridescence_fragment:Mm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:wm,clipping_planes_pars_fragment:Em,clipping_planes_pars_vertex:Tm,clipping_planes_vertex:Am,color_fragment:Rm,color_pars_fragment:Cm,color_pars_vertex:Im,color_vertex:Pm,common:Lm,cube_uv_reflection_fragment:Dm,defaultnormal_vertex:km,displacementmap_pars_vertex:Fm,displacementmap_vertex:Um,emissivemap_fragment:Nm,emissivemap_pars_fragment:Om,colorspace_fragment:Bm,colorspace_pars_fragment:zm,envmap_fragment:Hm,envmap_common_pars_fragment:Vm,envmap_pars_fragment:Gm,envmap_pars_vertex:Wm,envmap_physical_pars_fragment:t0,envmap_vertex:Xm,fog_vertex:qm,fog_pars_vertex:Ym,fog_fragment:$m,fog_pars_fragment:Km,gradientmap_pars_fragment:Zm,lightmap_pars_fragment:Jm,lights_lambert_fragment:jm,lights_lambert_pars_fragment:Qm,lights_pars_begin:e0,lights_toon_fragment:n0,lights_toon_pars_fragment:i0,lights_phong_fragment:s0,lights_phong_pars_fragment:r0,lights_physical_fragment:o0,lights_physical_pars_fragment:a0,lights_fragment_begin:l0,lights_fragment_maps:c0,lights_fragment_end:h0,logdepthbuf_fragment:u0,logdepthbuf_pars_fragment:d0,logdepthbuf_pars_vertex:f0,logdepthbuf_vertex:p0,map_fragment:m0,map_pars_fragment:g0,map_particle_fragment:v0,map_particle_pars_fragment:x0,metalnessmap_fragment:y0,metalnessmap_pars_fragment:_0,morphinstance_vertex:b0,morphcolor_vertex:M0,morphnormal_vertex:S0,morphtarget_pars_vertex:w0,morphtarget_vertex:E0,normal_fragment_begin:T0,normal_fragment_maps:A0,normal_pars_fragment:R0,normal_pars_vertex:C0,normal_vertex:I0,normalmap_pars_fragment:P0,clearcoat_normal_fragment_begin:L0,clearcoat_normal_fragment_maps:D0,clearcoat_pars_fragment:k0,iridescence_pars_fragment:F0,opaque_fragment:U0,packing:N0,premultiplied_alpha_fragment:O0,project_vertex:B0,dithering_fragment:z0,dithering_pars_fragment:H0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:W0,shadowmap_pars_vertex:X0,shadowmap_vertex:q0,shadowmask_pars_fragment:Y0,skinbase_vertex:$0,skinning_pars_vertex:K0,skinning_vertex:Z0,skinnormal_vertex:J0,specularmap_fragment:j0,specularmap_pars_fragment:Q0,tonemapping_fragment:eg,tonemapping_pars_fragment:tg,transmission_fragment:ng,transmission_pars_fragment:ig,uv_pars_fragment:sg,uv_pars_vertex:rg,uv_vertex:og,worldpos_vertex:ag,background_vert:lg,background_frag:cg,backgroundCube_vert:hg,backgroundCube_frag:ug,cube_vert:dg,cube_frag:fg,depth_vert:pg,depth_frag:mg,distanceRGBA_vert:gg,distanceRGBA_frag:vg,equirect_vert:xg,equirect_frag:yg,linedashed_vert:_g,linedashed_frag:bg,meshbasic_vert:Mg,meshbasic_frag:Sg,meshlambert_vert:wg,meshlambert_frag:Eg,meshmatcap_vert:Tg,meshmatcap_frag:Ag,meshnormal_vert:Rg,meshnormal_frag:Cg,meshphong_vert:Ig,meshphong_frag:Pg,meshphysical_vert:Lg,meshphysical_frag:Dg,meshtoon_vert:kg,meshtoon_frag:Fg,points_vert:Ug,points_frag:Ng,shadow_vert:Og,shadow_frag:Bg,sprite_vert:zg,sprite_frag:Hg},Ae={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},mi={basic:{uniforms:yn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:yn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:yn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:yn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:yn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:yn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:yn([Ae.points,Ae.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:yn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:yn([Ae.common,Ae.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:yn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:yn([Ae.sprite,Ae.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:yn([Ae.common,Ae.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:yn([Ae.lights,Ae.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};mi.physical={uniforms:yn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var Xl={r:0,b:0,g:0},xs=new qn,Vg=new Et;function Gg(s,e,t,n,i,r,o){let a=new et(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function v(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1,E=v(x);E===null?p(a,l):E&&E.isColor&&(p(E,1),y=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,y){let E=v(y);E&&(E.isCubeTexture||E.mapping===bo)?(h===void 0&&(h=new Ze(new Xt(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:vs(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),xs.copy(y.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(xs)),h.material.toneMapped=bt.getTransfer(E.colorSpace)!==Lt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Ze(new Tn(2,2),new rn({name:"BackgroundMaterial",uniforms:vs(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=bt.getTransfer(E.colorSpace)!==Lt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(Xl,mh(s)),n.buffers.color.setClear(Xl.r,Xl.g,Xl.b,y,o)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:g,dispose:m}}function Wg(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(w,R,D,I,O){let W=!1,$=u(I,D,R);r!==$&&(r=$,c(r.object)),W=f(w,I,D,O),W&&v(w,I,D,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(w,R,D,I),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return s.createVertexArray()}function c(w){return s.bindVertexArray(w)}function h(w){return s.deleteVertexArray(w)}function u(w,R,D){let I=D.wireframe===!0,O=n[w.id];O===void 0&&(O={},n[w.id]=O);let W=O[R.id];W===void 0&&(W={},O[R.id]=W);let $=W[I];return $===void 0&&($=d(l()),W[I]=$),$}function d(w){let R=[],D=[],I=[];for(let O=0;O<t;O++)R[O]=0,D[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:I,object:w,attributes:{},index:null}}function f(w,R,D,I){let O=r.attributes,W=R.attributes,$=0,Z=D.getAttributes();for(let q in Z)if(Z[q].location>=0){let ue=O[q],Me=W[q];if(Me===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(Me=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(Me=w.instanceColor)),ue===void 0||ue.attribute!==Me||Me&&ue.data!==Me.data)return!0;$++}return r.attributesNum!==$||r.index!==I}function v(w,R,D,I){let O={},W=R.attributes,$=0,Z=D.getAttributes();for(let q in Z)if(Z[q].location>=0){let ue=W[q];ue===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(ue=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(ue=w.instanceColor));let Me={};Me.attribute=ue,ue&&ue.data&&(Me.data=ue.data),O[q]=Me,$++}r.attributes=O,r.attributesNum=$,r.index=I}function _(){let w=r.newAttributes;for(let R=0,D=w.length;R<D;R++)w[R]=0}function g(w){p(w,0)}function p(w,R){let D=r.newAttributes,I=r.enabledAttributes,O=r.attributeDivisors;D[w]=1,I[w]===0&&(s.enableVertexAttribArray(w),I[w]=1),O[w]!==R&&(s.vertexAttribDivisor(w,R),O[w]=R)}function m(){let w=r.newAttributes,R=r.enabledAttributes;for(let D=0,I=R.length;D<I;D++)R[D]!==w[D]&&(s.disableVertexAttribArray(D),R[D]=0)}function x(w,R,D,I,O,W,$){$===!0?s.vertexAttribIPointer(w,R,D,O,W):s.vertexAttribPointer(w,R,D,I,O,W)}function y(w,R,D,I){_();let O=I.attributes,W=D.getAttributes(),$=R.defaultAttributeValues;for(let Z in W){let q=W[Z];if(q.location>=0){let oe=O[Z];if(oe===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(oe=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(oe=w.instanceColor)),oe!==void 0){let ue=oe.normalized,Me=oe.itemSize,Ce=e.get(oe);if(Ce===void 0)continue;let qe=Ce.buffer,Ye=Ce.type,He=Ce.bytesPerElement,ee=Ye===s.INT||Ye===s.UNSIGNED_INT||oe.gpuType===al;if(oe.isInterleavedBufferAttribute){let Y=oe.data,he=Y.stride,De=oe.offset;if(Y.isInstancedInterleavedBuffer){for(let re=0;re<q.locationSize;re++)p(q.location+re,Y.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let re=0;re<q.locationSize;re++)g(q.location+re);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let re=0;re<q.locationSize;re++)x(q.location+re,Me/q.locationSize,Ye,ue,he*He,(De+Me/q.locationSize*re)*He,ee)}else{if(oe.isInstancedBufferAttribute){for(let Y=0;Y<q.locationSize;Y++)p(q.location+Y,oe.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Y=0;Y<q.locationSize;Y++)g(q.location+Y);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let Y=0;Y<q.locationSize;Y++)x(q.location+Y,Me/q.locationSize,Ye,ue,Me*He,Me/q.locationSize*Y*He,ee)}}else if($!==void 0){let ue=$[Z];if(ue!==void 0)switch(ue.length){case 2:s.vertexAttrib2fv(q.location,ue);break;case 3:s.vertexAttrib3fv(q.location,ue);break;case 4:s.vertexAttrib4fv(q.location,ue);break;default:s.vertexAttrib1fv(q.location,ue)}}}}m()}function E(){C();for(let w in n){let R=n[w];for(let D in R){let I=R[D];for(let O in I)h(I[O].object),delete I[O];delete R[D]}delete n[w]}}function T(w){if(n[w.id]===void 0)return;let R=n[w.id];for(let D in R){let I=R[D];for(let O in I)h(I[O].object),delete I[O];delete R[D]}delete n[w.id]}function P(w){for(let R in n){let D=n[R];if(D[w.id]===void 0)continue;let I=D[w.id];for(let O in I)h(I[O].object),delete I[O];delete D[w.id]}}function C(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:m}}function Xg(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let v=0;v<u;v++)f+=h[v];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)o(c[v],h[v],d[v]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let v=0;for(let _=0;_<u;_++)v+=h[_]*d[_];t.update(v,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function qg(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){return!(P!==Yn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let C=P===hr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==si&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ri&&!C)}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=v>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:E,maxSamples:T}}function Yg(s){let e=this,t=null,n=0,i=!1,r=!1,o=new li,a=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let v=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||v===null||v.length===0||r&&!g)r?h(null):c();else{let m=r?0:n,x=m*4,y=p.clippingState||null;l.value=y,y=h(v,d,x,f);for(let E=0;E!==x;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,v){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=l.value,v!==!0||g===null){let p=f+_*4,m=d.matrixWorldInverse;a.getNormalMatrix(m),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(m,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function $g(s){let e=new WeakMap;function t(o,a){return a===sl?o.mapping=ms:a===rl&&(o.mapping=gs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===sl||a===rl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Ta(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var pr=4,Bd=[.125,.215,.35,.446,.526,.582],bs=20,_h=new yo,zd=new et,bh=null,Mh=0,Sh=0,wh=!1,_s=(1+Math.sqrt(5))/2,fr=1/_s,Hd=[new U(-_s,fr,0),new U(_s,fr,0),new U(-fr,0,_s),new U(fr,0,_s),new U(0,_s,-fr),new U(0,_s,fr),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Kg=new U,gr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=Kg}=r;bh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bh,Mh,Sh),this._renderer.xr.enabled=wh,e.scissorTest=!1,ql(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ms||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),Sh=this._renderer.getActiveMipmapLevel(),wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ti,minFilter:ti,generateMipmaps:!1,type:hr,format:Yn,colorSpace:ds,depthBuffer:!1},i=Vd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zg(r)),this._blurMaterial=Jg(r,e,t)}return i}_compileMaterial(e){let t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,_h)}_sceneToCubeUV(e,t,n,i,r){let l=new un(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(zd),u.toneMapping=ii,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let _=new Qt({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),g=new Ze(new Xt,_),p=!1,m=e.background;m?m.isColor&&(_.color.copy(m),e.background=null,p=!0):(_.color.copy(zd),p=!0);for(let x=0;x<6;x++){let y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[x],r.y,r.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[x]));let E=this._cubeSize;ql(i,y*E,x>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ms||e.mapping===gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;ql(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_h)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hd[(i-r-1)%Hd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ze(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*bs-1),_=r/v,g=isFinite(r)?1+Math.floor(h*_):bs;g>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bs}`);let p=[],m=0;for(let P=0;P<bs;++P){let C=P/_,S=Math.exp(-C*C/2);p.push(S),P===0?m+=S:P<g&&(m+=2*S)}for(let P=0;P<p.length;P++)p[P]=p[P]/m;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:x}=this;d.dTheta.value=v,d.mipInt.value=x-n;let y=this._sizeLods[i],E=3*y*(i>x-pr?i-x+pr:0),T=4*(this._cubeSize-y);ql(t,E,T,3*y,2*y),l.setRenderTarget(t),l.render(u,_h)}};function Zg(s){let e=[],t=[],n=[],i=s,r=s-pr+1+Bd.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-pr?l=Bd[o-s+pr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,v=6,_=3,g=2,p=1,m=new Float32Array(_*v*f),x=new Float32Array(g*v*f),y=new Float32Array(p*v*f);for(let T=0;T<f;T++){let P=T%3*2/3-1,C=T>2?0:-1,S=[P,C,0,P+2/3,C,0,P+2/3,C+1,0,P,C,0,P+2/3,C+1,0,P,C+1,0];m.set(S,_*v*T),x.set(d,g*v*T);let w=[T,T,T,T,T,T];y.set(w,p*v*T)}let E=new en;E.setAttribute("position",new wn(m,_)),E.setAttribute("uv",new wn(x,g)),E.setAttribute("faceIndex",new wn(y,p)),e.push(E),i>pr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Vd(s,e,t){let n=new hi(s,e,t);return n.texture.mapping=bo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ql(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Jg(s,e,t){let n=new Float32Array(bs),i=new U(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:kh(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Gd(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kh(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Wd(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function kh(){return`

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
	`}function jg(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===sl||l===rl,h=l===ms||l===gs;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new gr(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new gr(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Qg(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Zs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ev(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,v=u.attributes.position,_=0;if(f!==null){let m=f.array;_=f.version;for(let x=0,y=m.length;x<y;x+=3){let E=m[x+0],T=m[x+1],P=m[x+2];d.push(E,T,T,P,P,E)}}else if(v!==void 0){let m=v.array;_=v.version;for(let x=0,y=m.length/3-1;x<y;x+=3){let E=x+0,T=x+1,P=x+2;d.push(E,T,T,P,P,E)}}else return;let g=new(ph(d)?Jr:Zr)(d,1);g.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function tv(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,v){v!==0&&(s.drawElementsInstanced(n,f,r,d*o,v),t.update(f,n,v))}function h(d,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,v);let g=0;for(let p=0;p<v;p++)g+=f[p];t.update(g,n,1)}function u(d,f,v,_){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,v);let p=0;for(let m=0;m<v;m++)p+=f[m]*_[m];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function nv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function iv(s,e,t){let n=new WeakMap,i=new At;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],m=a.morphAttributes.color||[],x=0;f===!0&&(x=1),v===!0&&(x=2),_===!0&&(x=3);let y=a.attributes.position.count*x,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*E*4*u),P=new $r(T,y,E,u);P.type=ri,P.needsUpdate=!0;let C=x*4;for(let w=0;w<u;w++){let R=g[w],D=p[w],I=m[w],O=y*E*4*w;for(let W=0;W<R.count;W++){let $=W*C;f===!0&&(i.fromBufferAttribute(R,W),T[O+$+0]=i.x,T[O+$+1]=i.y,T[O+$+2]=i.z,T[O+$+3]=0),v===!0&&(i.fromBufferAttribute(D,W),T[O+$+4]=i.x,T[O+$+5]=i.y,T[O+$+6]=i.z,T[O+$+7]=0),_===!0&&(i.fromBufferAttribute(I,W),T[O+$+8]=i.x,T[O+$+9]=i.y,T[O+$+10]=i.z,T[O+$+11]=I.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Te(y,E)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let v=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function sv(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var hf=new En,Xd=new so(1,1),uf=new $r,df=new Sa,ff=new Qr,qd=[],Yd=[],$d=new Float32Array(16),Kd=new Float32Array(9),Zd=new Float32Array(4);function vr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=qd[i];if(r===void 0&&(r=new Float32Array(i),qd[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function on(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function an(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Kl(s,e){let t=Yd[e];t===void 0&&(t=new Int32Array(e),Yd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function rv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ov(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2fv(this.addr,e),an(t,e)}}function av(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;s.uniform3fv(this.addr,e),an(t,e)}}function lv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4fv(this.addr,e),an(t,e)}}function cv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Zd.set(n),s.uniformMatrix2fv(this.addr,!1,Zd),an(t,n)}}function hv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Kd.set(n),s.uniformMatrix3fv(this.addr,!1,Kd),an(t,n)}}function uv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;$d.set(n),s.uniformMatrix4fv(this.addr,!1,$d),an(t,n)}}function dv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function fv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2iv(this.addr,e),an(t,e)}}function pv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3iv(this.addr,e),an(t,e)}}function mv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4iv(this.addr,e),an(t,e)}}function gv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;s.uniform2uiv(this.addr,e),an(t,e)}}function xv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;s.uniform3uiv(this.addr,e),an(t,e)}}function yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;s.uniform4uiv(this.addr,e),an(t,e)}}function _v(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Xd.compareFunction=dh,r=Xd):r=hf,t.setTexture2D(e||r,i)}function bv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||df,i)}function Mv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ff,i)}function Sv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||uf,i)}function wv(s){switch(s){case 5126:return rv;case 35664:return ov;case 35665:return av;case 35666:return lv;case 35674:return cv;case 35675:return hv;case 35676:return uv;case 5124:case 35670:return dv;case 35667:case 35671:return fv;case 35668:case 35672:return pv;case 35669:case 35673:return mv;case 5125:return gv;case 36294:return vv;case 36295:return xv;case 36296:return yv;case 35678:case 36198:case 36298:case 36306:case 35682:return _v;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return Sv}}function Ev(s,e){s.uniform1fv(this.addr,e)}function Tv(s,e){let t=vr(e,this.size,2);s.uniform2fv(this.addr,t)}function Av(s,e){let t=vr(e,this.size,3);s.uniform3fv(this.addr,t)}function Rv(s,e){let t=vr(e,this.size,4);s.uniform4fv(this.addr,t)}function Cv(s,e){let t=vr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Iv(s,e){let t=vr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Pv(s,e){let t=vr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Lv(s,e){s.uniform1iv(this.addr,e)}function Dv(s,e){s.uniform2iv(this.addr,e)}function kv(s,e){s.uniform3iv(this.addr,e)}function Fv(s,e){s.uniform4iv(this.addr,e)}function Uv(s,e){s.uniform1uiv(this.addr,e)}function Nv(s,e){s.uniform2uiv(this.addr,e)}function Ov(s,e){s.uniform3uiv(this.addr,e)}function Bv(s,e){s.uniform4uiv(this.addr,e)}function zv(s,e,t){let n=this.cache,i=e.length,r=Kl(t,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||hf,r[o])}function Hv(s,e,t){let n=this.cache,i=e.length,r=Kl(t,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||df,r[o])}function Vv(s,e,t){let n=this.cache,i=e.length,r=Kl(t,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ff,r[o])}function Gv(s,e,t){let n=this.cache,i=e.length,r=Kl(t,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||uf,r[o])}function Wv(s){switch(s){case 5126:return Ev;case 35664:return Tv;case 35665:return Av;case 35666:return Rv;case 35674:return Cv;case 35675:return Iv;case 35676:return Pv;case 5124:case 35670:return Lv;case 35667:case 35671:return Dv;case 35668:case 35672:return kv;case 35669:case 35673:return Fv;case 5125:return Uv;case 36294:return Nv;case 36295:return Ov;case 36296:return Bv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Vv;case 36289:case 36303:case 36311:case 36292:return Gv}}var Th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wv(t.type)}},Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wv(t.type)}},Rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function Jd(s,e){s.seq.push(e),s.map[e.id]=e}function Xv(s,e,t){let n=s.name,i=n.length;for(Eh.lastIndex=0;;){let r=Eh.exec(n),o=Eh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Jd(t,c===void 0?new Th(a,s,e):new Ah(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Rh(a),Jd(t,u)),t=u}}}var mr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Xv(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function jd(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var qv=37297,Yv=0;function $v(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Qd=new ct;function Kv(s){bt._getMatrix(Qd,bt.workingColorSpace,s);let e=`mat3( ${Qd.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(s)){case Xr:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function ef(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+$v(s.getShaderSource(e),a)}else return r}function Zv(s,e){let t=Kv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jv(s,e){let t;switch(e){case dd:t="Linear";break;case fd:t="Reinhard";break;case pd:t="Cineon";break;case il:t="ACESFilmic";break;case gd:t="AgX";break;case vd:t="Neutral";break;case md:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Yl=new U;function jv(){bt.getLuminanceCoefficients(Yl);let s=Yl.x.toFixed(4),e=Yl.y.toFixed(4),t=Yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ao).join(`
`)}function ex(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tx(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ao(s){return s!==""}function tf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var nx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(s){return s.replace(nx,sx)}var ix=new Map;function sx(s,e){let t=ut[e];if(t===void 0){let n=ix.get(e);if(n!==void 0)t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ch(t)}var rx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sf(s){return s.replace(rx,ox)}function ox(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function rf(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function ax(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===eh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ka?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function lx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ms:case gs:e="ENVMAP_TYPE_CUBE";break;case bo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cx(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===gs&&(e="ENVMAP_MODE_REFRACTION"),e}function hx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case nl:e="ENVMAP_BLENDING_MULTIPLY";break;case hd:e="ENVMAP_BLENDING_MIX";break;case ud:e="ENVMAP_BLENDING_ADD";break}return e}function ux(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function dx(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=ax(t),c=lx(t),h=cx(t),u=hx(t),d=ux(t),f=Qv(t),v=ex(r),_=i.createProgram(),g,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ao).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ao).join(`
`),p.length>0&&(p+=`
`)):(g=[rf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ao).join(`
`),p=[rf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?ut.tonemapping_pars_fragment:"",t.toneMapping!==ii?Jv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,Zv("linearToOutputTexel",t.outputColorSpace),jv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ao).join(`
`)),o=Ch(o),o=tf(o,t),o=nf(o,t),a=Ch(a),a=tf(a,t),a=nf(a,t),o=sf(o),a=sf(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=m+g+o,y=m+p+a,E=jd(i,i.VERTEX_SHADER,x),T=jd(i,i.FRAGMENT_SHADER,y);i.attachShader(_,E),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(R){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(_)||"",I=i.getShaderInfoLog(E)||"",O=i.getShaderInfoLog(T)||"",W=D.trim(),$=I.trim(),Z=O.trim(),q=!0,oe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,T);else{let ue=ef(i,E,"vertex"),Me=ef(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+ue+`
`+Me)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):($===""||Z==="")&&(oe=!1);oe&&(R.diagnostics={runnable:q,programLog:W,vertexShader:{log:$,prefix:g},fragmentShader:{log:Z,prefix:p}})}i.deleteShader(E),i.deleteShader(T),C=new mr(i,_),S=tx(i,_)}let C;this.getUniforms=function(){return C===void 0&&P(this),C};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(_,qv)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}var fx=0,Ih=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ph(e),t.set(e,n)),n}},Ph=class{constructor(e){this.id=fx++,this.code=e,this.usedTimes=0}};function px(s,e,t,n,i,r,o){let a=new Kr,l=new Ih,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,w,R,D,I){let O=D.fog,W=I.geometry,$=S.isMeshStandardMaterial?D.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||$),q=Z&&Z.mapping===bo?Z.image.height:null,oe=v[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ue=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Me=ue!==void 0?ue.length:0,Ce=0;W.morphAttributes.position!==void 0&&(Ce=1),W.morphAttributes.normal!==void 0&&(Ce=2),W.morphAttributes.color!==void 0&&(Ce=3);let qe,Ye,He,ee;if(oe){let _t=mi[oe];qe=_t.vertexShader,Ye=_t.fragmentShader}else qe=S.vertexShader,Ye=S.fragmentShader,l.update(S),He=l.getVertexShaderID(S),ee=l.getFragmentShaderID(S);let Y=s.getRenderTarget(),he=s.state.buffers.depth.getReversed(),De=I.isInstancedMesh===!0,re=I.isBatchedMesh===!0,Ge=!!S.map,vt=!!S.matcap,F=!!Z,ht=!!S.aoMap,Pe=!!S.lightMap,ke=!!S.bumpMap,ge=!!S.normalMap,xt=!!S.displacementMap,Le=!!S.emissiveMap,nt=!!S.metalnessMap,Ft=!!S.roughnessMap,St=S.anisotropy>0,L=S.clearcoat>0,M=S.dispersion>0,X=S.iridescence>0,ne=S.sheen>0,le=S.transmission>0,Q=St&&!!S.anisotropyMap,Oe=L&&!!S.clearcoatMap,fe=L&&!!S.clearcoatNormalMap,ze=L&&!!S.clearcoatRoughnessMap,We=X&&!!S.iridescenceMap,pe=X&&!!S.iridescenceThicknessMap,Ee=ne&&!!S.sheenColorMap,Be=ne&&!!S.sheenRoughnessMap,Ve=!!S.specularMap,_e=!!S.specularColorMap,ot=!!S.specularIntensityMap,H=le&&!!S.transmissionMap,ve=le&&!!S.thicknessMap,Se=!!S.gradientMap,Ue=!!S.alphaMap,de=S.alphaTest>0,ce=!!S.alphaHash,Ne=!!S.extensions,it=ii;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(it=s.toneMapping);let Rt={shaderID:oe,shaderType:S.type,shaderName:S.name,vertexShader:qe,fragmentShader:Ye,defines:S.defines,customVertexShaderID:He,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:re,batchingColor:re&&I._colorsTexture!==null,instancing:De,instancingColor:De&&I.instanceColor!==null,instancingMorph:De&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Y===null?s.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ds,alphaToCoverage:!!S.alphaToCoverage,map:Ge,matcap:vt,envMap:F,envMapMode:F&&Z.mapping,envMapCubeUVHeight:q,aoMap:ht,lightMap:Pe,bumpMap:ke,normalMap:ge,displacementMap:d&&xt,emissiveMap:Le,normalMapObjectSpace:ge&&S.normalMapType===bd,normalMapTangentSpace:ge&&S.normalMapType===Vl,metalnessMap:nt,roughnessMap:Ft,anisotropy:St,anisotropyMap:Q,clearcoat:L,clearcoatMap:Oe,clearcoatNormalMap:fe,clearcoatRoughnessMap:ze,dispersion:M,iridescence:X,iridescenceMap:We,iridescenceThicknessMap:pe,sheen:ne,sheenColorMap:Ee,sheenRoughnessMap:Be,specularMap:Ve,specularColorMap:_e,specularIntensityMap:ot,transmission:le,transmissionMap:H,thicknessMap:ve,gradientMap:Se,opaque:S.transparent===!1&&S.blending===Ri&&S.alphaToCoverage===!1,alphaMap:Ue,alphaTest:de,alphaHash:ce,combine:S.combine,mapUv:Ge&&_(S.map.channel),aoMapUv:ht&&_(S.aoMap.channel),lightMapUv:Pe&&_(S.lightMap.channel),bumpMapUv:ke&&_(S.bumpMap.channel),normalMapUv:ge&&_(S.normalMap.channel),displacementMapUv:xt&&_(S.displacementMap.channel),emissiveMapUv:Le&&_(S.emissiveMap.channel),metalnessMapUv:nt&&_(S.metalnessMap.channel),roughnessMapUv:Ft&&_(S.roughnessMap.channel),anisotropyMapUv:Q&&_(S.anisotropyMap.channel),clearcoatMapUv:Oe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:fe&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:We&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(S.sheenRoughnessMap.channel),specularMapUv:Ve&&_(S.specularMap.channel),specularColorMapUv:_e&&_(S.specularColorMap.channel),specularIntensityMapUv:ot&&_(S.specularIntensityMap.channel),transmissionMapUv:H&&_(S.transmissionMap.channel),thicknessMapUv:ve&&_(S.thicknessMap.channel),alphaMapUv:Ue&&_(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ge||St),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!W.attributes.uv&&(Ge||Ue),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:he,skinning:I.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ce,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:it,decodeVideoTexture:Ge&&S.map.isVideoTexture===!0&&bt.getTransfer(S.map.colorSpace)===Lt,decodeVideoTextureEmissive:Le&&S.emissiveMap.isVideoTexture===!0&&bt.getTransfer(S.emissiveMap.colorSpace)===Lt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xn,flipSided:S.side===pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ne&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&S.extensions.multiDraw===!0||re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function p(S){let w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(let R in S.defines)w.push(R),w.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(m(w,S),x(w,S),w.push(s.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function m(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function x(S,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),w.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let w=v[S.type],R;if(w){let D=mi[w];R=Ld.clone(D.uniforms)}else R=S.uniforms;return R}function E(S,w){let R;for(let D=0,I=h.length;D<I;D++){let O=h[D];if(O.cacheKey===w){R=O,++R.usedTimes;break}}return R===void 0&&(R=new dx(s,w,S,r),h.push(R)),R}function T(S){if(--S.usedTimes===0){let w=h.indexOf(S);h[w]=h[h.length-1],h.pop(),S.destroy()}}function P(S){l.remove(S)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:T,releaseShaderCache:P,programs:h,dispose:C}}function mx(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function gx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function of(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function af(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,v,_,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:v,renderOrder:u.renderOrder,z:_,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=v,p.renderOrder=u.renderOrder,p.z=_,p.group=g),e++,p}function a(u,d,f,v,_,g){let p=o(u,d,f,v,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,v,_,g){let p=o(u,d,f,v,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||gx),n.length>1&&n.sort(d||of),i.length>1&&i.sort(d||of)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function vx(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new af,s.set(n,[o])):i>=r.length?(o=new af,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function xx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new et};break;case"SpotLight":t={position:new U,direction:new U,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new U,halfWidth:new U,halfHeight:new U};break}return s[e.id]=t,t}}}function yx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var _x=0;function bx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Mx(s){let e=new xx,t=yx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let i=new U,r=new Et,o=new Et;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,v=0,_=0,g=0,p=0,m=0,x=0,y=0,E=0,T=0,P=0;c.sort(bx);for(let S=0,w=c.length;S<w;S++){let R=c[S],D=R.color,I=R.intensity,O=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=D.r*I,u+=D.g*I,d+=D.b*I;else if(R.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(R.sh.coefficients[$],I);P++}else if(R.isDirectionalLight){let $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let Z=R.shadow,q=t.get(R);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=R.shadow.matrix,m++}n.directional[f]=$,f++}else if(R.isSpotLight){let $=e.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(D).multiplyScalar(I),$.distance=O,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,n.spot[_]=$;let Z=R.shadow;if(R.map&&(n.spotLightMap[E]=R.map,E++,Z.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=Z.matrix,R.castShadow){let q=t.get(R);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,n.spotShadow[_]=q,n.spotShadowMap[_]=W,y++}_++}else if(R.isRectAreaLight){let $=e.get(R);$.color.copy(D).multiplyScalar(I),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=$,g++}else if(R.isPointLight){let $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){let Z=R.shadow,q=t.get(R);q.shadowIntensity=Z.intensity,q.shadowBias=Z.bias,q.shadowNormalBias=Z.normalBias,q.shadowRadius=Z.radius,q.shadowMapSize=Z.mapSize,q.shadowCameraNear=Z.camera.near,q.shadowCameraFar=Z.camera.far,n.pointShadow[v]=q,n.pointShadowMap[v]=W,n.pointShadowMatrix[v]=R.shadow.matrix,x++}n.point[v]=$,v++}else if(R.isHemisphereLight){let $=e.get(R);$.skyColor.copy(R.color).multiplyScalar(I),$.groundColor.copy(R.groundColor).multiplyScalar(I),n.hemi[p]=$,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==v||C.spotLength!==_||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==m||C.numPointShadows!==x||C.numSpotShadows!==y||C.numSpotMaps!==E||C.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,C.directionalLength=f,C.pointLength=v,C.spotLength=_,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=m,C.numPointShadows=x,C.numSpotShadows=y,C.numSpotMaps=E,C.numLightProbes=P,n.version=_x++)}function l(c,h){let u=0,d=0,f=0,v=0,_=0,g=h.matrixWorldInverse;for(let p=0,m=c.length;p<m;p++){let x=c[p];if(x.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let y=n.rectArea[v];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function lf(s){let e=new Mx(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Sx(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new lf(s),e.set(i,[a])):r>=o.length?(a=new lf(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ex=`uniform sampler2D shadow_pass;
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
}`;function Tx(s,e,t){let n=new er,i=new Te,r=new Te,o=new At,a=new Ua({depthPacking:_d}),l=new Na,c={},h=t.maxTextureSize,u={[Ai]:pn,[pn]:Ai,[xn]:xn},d=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:wx,fragmentShader:Ex}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let v=new en;v.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ze(v,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eh;let p=this.type;this.render=function(T,P,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let S=s.getRenderTarget(),w=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),D=s.state;D.setBlending(Li),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let I=p!==pi&&this.type===pi,O=p===pi&&this.type!==pi;for(let W=0,$=T.length;W<$;W++){let Z=T[W],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);let oe=q.getFrameExtents();if(i.multiply(oe),r.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/oe.x),i.x=r.x*oe.x,q.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/oe.y),i.y=r.y*oe.y,q.mapSize.y=r.y)),q.map===null||I===!0||O===!0){let Me=this.type!==pi?{minFilter:kn,magFilter:kn}:{};q.map!==null&&q.map.dispose(),q.map=new hi(i.x,i.y,Me),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}s.setRenderTarget(q.map),s.clear();let ue=q.getViewportCount();for(let Me=0;Me<ue;Me++){let Ce=q.getViewport(Me);o.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),D.viewport(o),q.updateMatrices(Z,Me),n=q.getFrustum(),y(P,C,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===pi&&m(q,C),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(S,w,R)};function m(T,P){let C=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new hi(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(P,null,C,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(P,null,C,f,_,null)}function x(T,P,C,S){let w=null,R=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)w=R;else if(w=C.isPointLight===!0?l:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let D=w.uuid,I=P.uuid,O=c[D];O===void 0&&(O={},c[D]=O);let W=O[I];W===void 0&&(W=w.clone(),O[I]=W,P.addEventListener("dispose",E)),w=W}if(w.visible=P.visible,w.wireframe=P.wireframe,S===pi?w.side=P.shadowSide!==null?P.shadowSide:P.side:w.side=P.shadowSide!==null?P.shadowSide:u[P.side],w.alphaMap=P.alphaMap,w.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,w.map=P.map,w.clipShadows=P.clipShadows,w.clippingPlanes=P.clippingPlanes,w.clipIntersection=P.clipIntersection,w.displacementMap=P.displacementMap,w.displacementScale=P.displacementScale,w.displacementBias=P.displacementBias,w.wireframeLinewidth=P.wireframeLinewidth,w.linewidth=P.linewidth,C.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let D=s.properties.get(w);D.light=C}return w}function y(T,P,C,S,w){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===pi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let I=e.update(T),O=T.material;if(Array.isArray(O)){let W=I.groups;for(let $=0,Z=W.length;$<Z;$++){let q=W[$],oe=O[q.materialIndex];if(oe&&oe.visible){let ue=x(T,oe,S,w);T.onBeforeShadow(s,T,P,C,I,ue,q),s.renderBufferDirect(C,null,I,ue,T,q),T.onAfterShadow(s,T,P,C,I,ue,q)}}}else if(O.visible){let W=x(T,O,S,w);T.onBeforeShadow(s,T,P,C,I,W,null),s.renderBufferDirect(C,null,I,W,T,null),T.onAfterShadow(s,T,P,C,I,W,null)}}let D=T.children;for(let I=0,O=D.length;I<O;I++)y(D[I],P,C,S,w)}function E(T){T.target.removeEventListener("dispose",E);for(let C in c){let S=c[C],w=T.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}var Ax={[Za]:Ja,[ja]:lr,[Qa]:tl,[hs]:el,[Ja]:Za,[lr]:ja,[tl]:Qa,[el]:hs};function Rx(s,e){function t(){let H=!1,ve=new At,Se=null,Ue=new At(0,0,0,0);return{setMask:function(de){Se!==de&&!H&&(s.colorMask(de,de,de,de),Se=de)},setLocked:function(de){H=de},setClear:function(de,ce,Ne,it,Rt){Rt===!0&&(de*=it,ce*=it,Ne*=it),ve.set(de,ce,Ne,it),Ue.equals(ve)===!1&&(s.clearColor(de,ce,Ne,it),Ue.copy(ve))},reset:function(){H=!1,Se=null,Ue.set(-1,0,0,0)}}}function n(){let H=!1,ve=!1,Se=null,Ue=null,de=null;return{setReversed:function(ce){if(ve!==ce){let Ne=e.get("EXT_clip_control");ce?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ve=ce;let it=de;de=null,this.setClear(it)}},getReversed:function(){return ve},setTest:function(ce){ce?Y(s.DEPTH_TEST):he(s.DEPTH_TEST)},setMask:function(ce){Se!==ce&&!H&&(s.depthMask(ce),Se=ce)},setFunc:function(ce){if(ve&&(ce=Ax[ce]),Ue!==ce){switch(ce){case Za:s.depthFunc(s.NEVER);break;case Ja:s.depthFunc(s.ALWAYS);break;case ja:s.depthFunc(s.LESS);break;case hs:s.depthFunc(s.LEQUAL);break;case Qa:s.depthFunc(s.EQUAL);break;case el:s.depthFunc(s.GEQUAL);break;case lr:s.depthFunc(s.GREATER);break;case tl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ue=ce}},setLocked:function(ce){H=ce},setClear:function(ce){de!==ce&&(ve&&(ce=1-ce),s.clearDepth(ce),de=ce)},reset:function(){H=!1,Se=null,Ue=null,de=null,ve=!1}}}function i(){let H=!1,ve=null,Se=null,Ue=null,de=null,ce=null,Ne=null,it=null,Rt=null;return{setTest:function(_t){H||(_t?Y(s.STENCIL_TEST):he(s.STENCIL_TEST))},setMask:function(_t){ve!==_t&&!H&&(s.stencilMask(_t),ve=_t)},setFunc:function(_t,Cn,In){(Se!==_t||Ue!==Cn||de!==In)&&(s.stencilFunc(_t,Cn,In),Se=_t,Ue=Cn,de=In)},setOp:function(_t,Cn,In){(ce!==_t||Ne!==Cn||it!==In)&&(s.stencilOp(_t,Cn,In),ce=_t,Ne=Cn,it=In)},setLocked:function(_t){H=_t},setClear:function(_t){Rt!==_t&&(s.clearStencil(_t),Rt=_t)},reset:function(){H=!1,ve=null,Se=null,Ue=null,de=null,ce=null,Ne=null,it=null,Rt=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],v=null,_=!1,g=null,p=null,m=null,x=null,y=null,E=null,T=null,P=new et(0,0,0),C=0,S=!1,w=null,R=null,D=null,I=null,O=null,W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,Z=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=Z>=2);let oe=null,ue={},Me=s.getParameter(s.SCISSOR_BOX),Ce=s.getParameter(s.VIEWPORT),qe=new At().fromArray(Me),Ye=new At().fromArray(Ce);function He(H,ve,Se,Ue){let de=new Uint8Array(4),ce=s.createTexture();s.bindTexture(H,ce),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ne=0;Ne<Se;Ne++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(ve,0,s.RGBA,1,1,Ue,0,s.RGBA,s.UNSIGNED_BYTE,de):s.texImage2D(ve+Ne,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,de);return ce}let ee={};ee[s.TEXTURE_2D]=He(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=He(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=He(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=He(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(s.DEPTH_TEST),o.setFunc(hs),ke(!1),ge(Qc),Y(s.CULL_FACE),ht(Li);function Y(H){h[H]!==!0&&(s.enable(H),h[H]=!0)}function he(H){h[H]!==!1&&(s.disable(H),h[H]=!1)}function De(H,ve){return u[H]!==ve?(s.bindFramebuffer(H,ve),u[H]=ve,H===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ve),H===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ve),!0):!1}function re(H,ve){let Se=f,Ue=!1;if(H){Se=d.get(ve),Se===void 0&&(Se=[],d.set(ve,Se));let de=H.textures;if(Se.length!==de.length||Se[0]!==s.COLOR_ATTACHMENT0){for(let ce=0,Ne=de.length;ce<Ne;ce++)Se[ce]=s.COLOR_ATTACHMENT0+ce;Se.length=de.length,Ue=!0}}else Se[0]!==s.BACK&&(Se[0]=s.BACK,Ue=!0);Ue&&s.drawBuffers(Se)}function Ge(H){return v!==H?(s.useProgram(H),v=H,!0):!1}let vt={[qi]:s.FUNC_ADD,[Yu]:s.FUNC_SUBTRACT,[$u]:s.FUNC_REVERSE_SUBTRACT};vt[Ku]=s.MIN,vt[Zu]=s.MAX;let F={[Ju]:s.ZERO,[ju]:s.ONE,[Qu]:s.SRC_COLOR,[ma]:s.SRC_ALPHA,[rd]:s.SRC_ALPHA_SATURATE,[id]:s.DST_COLOR,[td]:s.DST_ALPHA,[ed]:s.ONE_MINUS_SRC_COLOR,[ga]:s.ONE_MINUS_SRC_ALPHA,[sd]:s.ONE_MINUS_DST_COLOR,[nd]:s.ONE_MINUS_DST_ALPHA,[od]:s.CONSTANT_COLOR,[ad]:s.ONE_MINUS_CONSTANT_COLOR,[ld]:s.CONSTANT_ALPHA,[cd]:s.ONE_MINUS_CONSTANT_ALPHA};function ht(H,ve,Se,Ue,de,ce,Ne,it,Rt,_t){if(H===Li){_===!0&&(he(s.BLEND),_=!1);return}if(_===!1&&(Y(s.BLEND),_=!0),H!==qu){if(H!==g||_t!==S){if((p!==qi||y!==qi)&&(s.blendEquation(s.FUNC_ADD),p=qi,y=qi),_t)switch(H){case Ri:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ji:s.blendFunc(s.ONE,s.ONE);break;case th:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ri:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case th:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}m=null,x=null,E=null,T=null,P.set(0,0,0),C=0,g=H,S=_t}return}de=de||ve,ce=ce||Se,Ne=Ne||Ue,(ve!==p||de!==y)&&(s.blendEquationSeparate(vt[ve],vt[de]),p=ve,y=de),(Se!==m||Ue!==x||ce!==E||Ne!==T)&&(s.blendFuncSeparate(F[Se],F[Ue],F[ce],F[Ne]),m=Se,x=Ue,E=ce,T=Ne),(it.equals(P)===!1||Rt!==C)&&(s.blendColor(it.r,it.g,it.b,Rt),P.copy(it),C=Rt),g=H,S=!1}function Pe(H,ve){H.side===xn?he(s.CULL_FACE):Y(s.CULL_FACE);let Se=H.side===pn;ve&&(Se=!Se),ke(Se),H.blending===Ri&&H.transparent===!1?ht(Li):ht(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let Ue=H.stencilWrite;a.setTest(Ue),Ue&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Le(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Y(s.SAMPLE_ALPHA_TO_COVERAGE):he(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(H){w!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),w=H)}function ge(H){H!==Wu?(Y(s.CULL_FACE),H!==R&&(H===Qc?s.cullFace(s.BACK):H===Xu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):he(s.CULL_FACE),R=H}function xt(H){H!==D&&($&&s.lineWidth(H),D=H)}function Le(H,ve,Se){H?(Y(s.POLYGON_OFFSET_FILL),(I!==ve||O!==Se)&&(s.polygonOffset(ve,Se),I=ve,O=Se)):he(s.POLYGON_OFFSET_FILL)}function nt(H){H?Y(s.SCISSOR_TEST):he(s.SCISSOR_TEST)}function Ft(H){H===void 0&&(H=s.TEXTURE0+W-1),oe!==H&&(s.activeTexture(H),oe=H)}function St(H,ve,Se){Se===void 0&&(oe===null?Se=s.TEXTURE0+W-1:Se=oe);let Ue=ue[Se];Ue===void 0&&(Ue={type:void 0,texture:void 0},ue[Se]=Ue),(Ue.type!==H||Ue.texture!==ve)&&(oe!==Se&&(s.activeTexture(Se),oe=Se),s.bindTexture(H,ve||ee[H]),Ue.type=H,Ue.texture=ve)}function L(){let H=ue[oe];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function M(){try{s.compressedTexImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function X(){try{s.compressedTexImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ne(){try{s.texSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function le(){try{s.texSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Q(){try{s.compressedTexSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Oe(){try{s.compressedTexSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function fe(){try{s.texStorage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ze(){try{s.texStorage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function We(){try{s.texImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pe(){try{s.texImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ee(H){qe.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),qe.copy(H))}function Be(H){Ye.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Ye.copy(H))}function Ve(H,ve){let Se=c.get(ve);Se===void 0&&(Se=new WeakMap,c.set(ve,Se));let Ue=Se.get(H);Ue===void 0&&(Ue=s.getUniformBlockIndex(ve,H.name),Se.set(H,Ue))}function _e(H,ve){let Ue=c.get(ve).get(H);l.get(ve)!==Ue&&(s.uniformBlockBinding(ve,Ue,H.__bindingPointIndex),l.set(ve,Ue))}function ot(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},oe=null,ue={},u={},d=new WeakMap,f=[],v=null,_=!1,g=null,p=null,m=null,x=null,y=null,E=null,T=null,P=new et(0,0,0),C=0,S=!1,w=null,R=null,D=null,I=null,O=null,qe.set(0,0,s.canvas.width,s.canvas.height),Ye.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:he,bindFramebuffer:De,drawBuffers:re,useProgram:Ge,setBlending:ht,setMaterial:Pe,setFlipSided:ke,setCullFace:ge,setLineWidth:xt,setPolygonOffset:Le,setScissorTest:nt,activeTexture:Ft,bindTexture:St,unbindTexture:L,compressedTexImage2D:M,compressedTexImage3D:X,texImage2D:We,texImage3D:pe,updateUBOMapping:Ve,uniformBlockBinding:_e,texStorage2D:fe,texStorage3D:ze,texSubImage2D:ne,texSubImage3D:le,compressedTexSubImage2D:Q,compressedTexSubImage3D:Oe,scissor:Ee,viewport:Be,reset:ot}}function Cx(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Te,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,M){return f?new OffscreenCanvas(L,M):Yr("canvas")}function _(L,M,X){let ne=1,le=St(L);if((le.width>X||le.height>X)&&(ne=X/Math.max(le.width,le.height)),ne<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let Q=Math.floor(ne*le.width),Oe=Math.floor(ne*le.height);u===void 0&&(u=v(Q,Oe));let fe=M?v(Q,Oe):u;return fe.width=Q,fe.height=Oe,fe.getContext("2d").drawImage(L,0,0,Q,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+Q+"x"+Oe+")."),fe}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),L;return L}function g(L){return L.generateMipmaps}function p(L){s.generateMipmap(L)}function m(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(L,M,X,ne,le=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=M;if(M===s.RED&&(X===s.FLOAT&&(Q=s.R32F),X===s.HALF_FLOAT&&(Q=s.R16F),X===s.UNSIGNED_BYTE&&(Q=s.R8)),M===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(Q=s.R8UI),X===s.UNSIGNED_SHORT&&(Q=s.R16UI),X===s.UNSIGNED_INT&&(Q=s.R32UI),X===s.BYTE&&(Q=s.R8I),X===s.SHORT&&(Q=s.R16I),X===s.INT&&(Q=s.R32I)),M===s.RG&&(X===s.FLOAT&&(Q=s.RG32F),X===s.HALF_FLOAT&&(Q=s.RG16F),X===s.UNSIGNED_BYTE&&(Q=s.RG8)),M===s.RG_INTEGER&&(X===s.UNSIGNED_BYTE&&(Q=s.RG8UI),X===s.UNSIGNED_SHORT&&(Q=s.RG16UI),X===s.UNSIGNED_INT&&(Q=s.RG32UI),X===s.BYTE&&(Q=s.RG8I),X===s.SHORT&&(Q=s.RG16I),X===s.INT&&(Q=s.RG32I)),M===s.RGB_INTEGER&&(X===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),X===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),X===s.UNSIGNED_INT&&(Q=s.RGB32UI),X===s.BYTE&&(Q=s.RGB8I),X===s.SHORT&&(Q=s.RGB16I),X===s.INT&&(Q=s.RGB32I)),M===s.RGBA_INTEGER&&(X===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),X===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),X===s.UNSIGNED_INT&&(Q=s.RGBA32UI),X===s.BYTE&&(Q=s.RGBA8I),X===s.SHORT&&(Q=s.RGBA16I),X===s.INT&&(Q=s.RGBA32I)),M===s.RGB&&(X===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),X===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),M===s.RGBA){let Oe=le?Xr:bt.getTransfer(ne);X===s.FLOAT&&(Q=s.RGBA32F),X===s.HALF_FLOAT&&(Q=s.RGBA16F),X===s.UNSIGNED_BYTE&&(Q=Oe===Lt?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(L,M){let X;return L?M===null||M===es||M===ur?X=s.DEPTH24_STENCIL8:M===ri?X=s.DEPTH32F_STENCIL8:M===cr&&(X=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===es||M===ur?X=s.DEPTH_COMPONENT24:M===ri?X=s.DEPTH_COMPONENT32F:M===cr&&(X=s.DEPTH_COMPONENT16),X}function E(L,M){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==kn&&L.minFilter!==ti?Math.log2(Math.max(M.width,M.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?M.mipmaps.length:1}function T(L){let M=L.target;M.removeEventListener("dispose",T),C(M),M.isVideoTexture&&h.delete(M)}function P(L){let M=L.target;M.removeEventListener("dispose",P),w(M)}function C(L){let M=n.get(L);if(M.__webglInit===void 0)return;let X=L.source,ne=d.get(X);if(ne){let le=ne[M.__cacheKey];le.usedTimes--,le.usedTimes===0&&S(L),Object.keys(ne).length===0&&d.delete(X)}n.remove(L)}function S(L){let M=n.get(L);s.deleteTexture(M.__webglTexture);let X=L.source,ne=d.get(X);delete ne[M.__cacheKey],o.memory.textures--}function w(L){let M=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(M.__webglFramebuffer[ne]))for(let le=0;le<M.__webglFramebuffer[ne].length;le++)s.deleteFramebuffer(M.__webglFramebuffer[ne][le]);else s.deleteFramebuffer(M.__webglFramebuffer[ne]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ne])}else{if(Array.isArray(M.__webglFramebuffer))for(let ne=0;ne<M.__webglFramebuffer.length;ne++)s.deleteFramebuffer(M.__webglFramebuffer[ne]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ne=0;ne<M.__webglColorRenderbuffer.length;ne++)M.__webglColorRenderbuffer[ne]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ne]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let X=L.textures;for(let ne=0,le=X.length;ne<le;ne++){let Q=n.get(X[ne]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(X[ne])}n.remove(L)}let R=0;function D(){R=0}function I(){let L=R;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),R+=1,L}function O(L){let M=[];return M.push(L.wrapS),M.push(L.wrapT),M.push(L.wrapR||0),M.push(L.magFilter),M.push(L.minFilter),M.push(L.anisotropy),M.push(L.internalFormat),M.push(L.format),M.push(L.type),M.push(L.generateMipmaps),M.push(L.premultiplyAlpha),M.push(L.flipY),M.push(L.unpackAlignment),M.push(L.colorSpace),M.join()}function W(L,M){let X=n.get(L);if(L.isVideoTexture&&nt(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&X.__version!==L.version){let ne=L.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(X,L,M);return}}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+M)}function $(L,M){let X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){ee(X,L,M);return}t.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+M)}function Z(L,M){let X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){ee(X,L,M);return}t.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+M)}function q(L,M){let X=n.get(L);if(L.version>0&&X.__version!==L.version){Y(X,L,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+M)}let oe={[us]:s.REPEAT,[Xi]:s.CLAMP_TO_EDGE,[va]:s.MIRRORED_REPEAT},ue={[kn]:s.NEAREST,[xd]:s.NEAREST_MIPMAP_NEAREST,[Mo]:s.NEAREST_MIPMAP_LINEAR,[ti]:s.LINEAR,[ol]:s.LINEAR_MIPMAP_NEAREST,[Qi]:s.LINEAR_MIPMAP_LINEAR},Me={[Md]:s.NEVER,[Rd]:s.ALWAYS,[Sd]:s.LESS,[dh]:s.LEQUAL,[wd]:s.EQUAL,[Ad]:s.GEQUAL,[Ed]:s.GREATER,[Td]:s.NOTEQUAL};function Ce(L,M){if(M.type===ri&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===ti||M.magFilter===ol||M.magFilter===Mo||M.magFilter===Qi||M.minFilter===ti||M.minFilter===ol||M.minFilter===Mo||M.minFilter===Qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,oe[M.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,oe[M.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,oe[M.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,ue[M.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,ue[M.minFilter]),M.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,Me[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===kn||M.minFilter!==Mo&&M.minFilter!==Qi||M.type===ri&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");s.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function qe(L,M){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,M.addEventListener("dispose",T));let ne=M.source,le=d.get(ne);le===void 0&&(le={},d.set(ne,le));let Q=O(M);if(Q!==L.__cacheKey){le[Q]===void 0&&(le[Q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,X=!0),le[Q].usedTimes++;let Oe=le[L.__cacheKey];Oe!==void 0&&(le[L.__cacheKey].usedTimes--,Oe.usedTimes===0&&S(M)),L.__cacheKey=Q,L.__webglTexture=le[Q].texture}return X}function Ye(L,M,X){return Math.floor(Math.floor(L/X)/M)}function He(L,M,X,ne){let Q=L.updateRanges;if(Q.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,X,ne,M.data);else{Q.sort((pe,Ee)=>pe.start-Ee.start);let Oe=0;for(let pe=1;pe<Q.length;pe++){let Ee=Q[Oe],Be=Q[pe],Ve=Ee.start+Ee.count,_e=Ye(Be.start,M.width,4),ot=Ye(Ee.start,M.width,4);Be.start<=Ve+1&&_e===ot&&Ye(Be.start+Be.count-1,M.width,4)===_e?Ee.count=Math.max(Ee.count,Be.start+Be.count-Ee.start):(++Oe,Q[Oe]=Be)}Q.length=Oe+1;let fe=s.getParameter(s.UNPACK_ROW_LENGTH),ze=s.getParameter(s.UNPACK_SKIP_PIXELS),We=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let pe=0,Ee=Q.length;pe<Ee;pe++){let Be=Q[pe],Ve=Math.floor(Be.start/4),_e=Math.ceil(Be.count/4),ot=Ve%M.width,H=Math.floor(Ve/M.width),ve=_e,Se=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ot),s.pixelStorei(s.UNPACK_SKIP_ROWS,H),t.texSubImage2D(s.TEXTURE_2D,0,ot,H,ve,Se,X,ne,M.data)}L.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,fe),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ze),s.pixelStorei(s.UNPACK_SKIP_ROWS,We)}}function ee(L,M,X){let ne=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=s.TEXTURE_3D);let le=qe(L,M),Q=M.source;t.bindTexture(ne,L.__webglTexture,s.TEXTURE0+X);let Oe=n.get(Q);if(Q.version!==Oe.__version||le===!0){t.activeTexture(s.TEXTURE0+X);let fe=bt.getPrimaries(bt.workingColorSpace),ze=M.colorSpace===Di?null:bt.getPrimaries(M.colorSpace),We=M.colorSpace===Di||fe===ze?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let pe=_(M.image,!1,i.maxTextureSize);pe=Ft(M,pe);let Ee=r.convert(M.format,M.colorSpace),Be=r.convert(M.type),Ve=x(M.internalFormat,Ee,Be,M.colorSpace,M.isVideoTexture);Ce(ne,M);let _e,ot=M.mipmaps,H=M.isVideoTexture!==!0,ve=Oe.__version===void 0||le===!0,Se=Q.dataReady,Ue=E(M,pe);if(M.isDepthTexture)Ve=y(M.format===dr,M.type),ve&&(H?t.texStorage2D(s.TEXTURE_2D,1,Ve,pe.width,pe.height):t.texImage2D(s.TEXTURE_2D,0,Ve,pe.width,pe.height,0,Ee,Be,null));else if(M.isDataTexture)if(ot.length>0){H&&ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Ve,ot[0].width,ot[0].height);for(let de=0,ce=ot.length;de<ce;de++)_e=ot[de],H?Se&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,_e.width,_e.height,Ee,Be,_e.data):t.texImage2D(s.TEXTURE_2D,de,Ve,_e.width,_e.height,0,Ee,Be,_e.data);M.generateMipmaps=!1}else H?(ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Ve,pe.width,pe.height),Se&&He(M,pe,Ee,Be)):t.texImage2D(s.TEXTURE_2D,0,Ve,pe.width,pe.height,0,Ee,Be,pe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){H&&ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Ve,ot[0].width,ot[0].height,pe.depth);for(let de=0,ce=ot.length;de<ce;de++)if(_e=ot[de],M.format!==Yn)if(Ee!==null)if(H){if(Se)if(M.layerUpdates.size>0){let Ne=yh(_e.width,_e.height,M.format,M.type);for(let it of M.layerUpdates){let Rt=_e.data.subarray(it*Ne/_e.data.BYTES_PER_ELEMENT,(it+1)*Ne/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,it,_e.width,_e.height,1,Ee,Rt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,_e.width,_e.height,pe.depth,Ee,_e.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,de,Ve,_e.width,_e.height,pe.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?Se&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,_e.width,_e.height,pe.depth,Ee,Be,_e.data):t.texImage3D(s.TEXTURE_2D_ARRAY,de,Ve,_e.width,_e.height,pe.depth,0,Ee,Be,_e.data)}else{H&&ve&&t.texStorage2D(s.TEXTURE_2D,Ue,Ve,ot[0].width,ot[0].height);for(let de=0,ce=ot.length;de<ce;de++)_e=ot[de],M.format!==Yn?Ee!==null?H?Se&&t.compressedTexSubImage2D(s.TEXTURE_2D,de,0,0,_e.width,_e.height,Ee,_e.data):t.compressedTexImage2D(s.TEXTURE_2D,de,Ve,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?Se&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,_e.width,_e.height,Ee,Be,_e.data):t.texImage2D(s.TEXTURE_2D,de,Ve,_e.width,_e.height,0,Ee,Be,_e.data)}else if(M.isDataArrayTexture)if(H){if(ve&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,Ve,pe.width,pe.height,pe.depth),Se)if(M.layerUpdates.size>0){let de=yh(pe.width,pe.height,M.format,M.type);for(let ce of M.layerUpdates){let Ne=pe.data.subarray(ce*de/pe.data.BYTES_PER_ELEMENT,(ce+1)*de/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ce,pe.width,pe.height,1,Ee,Be,Ne)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Ee,Be,pe.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ve,pe.width,pe.height,pe.depth,0,Ee,Be,pe.data);else if(M.isData3DTexture)H?(ve&&t.texStorage3D(s.TEXTURE_3D,Ue,Ve,pe.width,pe.height,pe.depth),Se&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Ee,Be,pe.data)):t.texImage3D(s.TEXTURE_3D,0,Ve,pe.width,pe.height,pe.depth,0,Ee,Be,pe.data);else if(M.isFramebufferTexture){if(ve)if(H)t.texStorage2D(s.TEXTURE_2D,Ue,Ve,pe.width,pe.height);else{let de=pe.width,ce=pe.height;for(let Ne=0;Ne<Ue;Ne++)t.texImage2D(s.TEXTURE_2D,Ne,Ve,de,ce,0,Ee,Be,null),de>>=1,ce>>=1}}else if(ot.length>0){if(H&&ve){let de=St(ot[0]);t.texStorage2D(s.TEXTURE_2D,Ue,Ve,de.width,de.height)}for(let de=0,ce=ot.length;de<ce;de++)_e=ot[de],H?Se&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,Ee,Be,_e):t.texImage2D(s.TEXTURE_2D,de,Ve,Ee,Be,_e);M.generateMipmaps=!1}else if(H){if(ve){let de=St(pe);t.texStorage2D(s.TEXTURE_2D,Ue,Ve,de.width,de.height)}Se&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee,Be,pe)}else t.texImage2D(s.TEXTURE_2D,0,Ve,Ee,Be,pe);g(M)&&p(ne),Oe.__version=Q.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function Y(L,M,X){if(M.image.length!==6)return;let ne=qe(L,M),le=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+X);let Q=n.get(le);if(le.version!==Q.__version||ne===!0){t.activeTexture(s.TEXTURE0+X);let Oe=bt.getPrimaries(bt.workingColorSpace),fe=M.colorSpace===Di?null:bt.getPrimaries(M.colorSpace),ze=M.colorSpace===Di||Oe===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let We=M.isCompressedTexture||M.image[0].isCompressedTexture,pe=M.image[0]&&M.image[0].isDataTexture,Ee=[];for(let ce=0;ce<6;ce++)!We&&!pe?Ee[ce]=_(M.image[ce],!0,i.maxCubemapSize):Ee[ce]=pe?M.image[ce].image:M.image[ce],Ee[ce]=Ft(M,Ee[ce]);let Be=Ee[0],Ve=r.convert(M.format,M.colorSpace),_e=r.convert(M.type),ot=x(M.internalFormat,Ve,_e,M.colorSpace),H=M.isVideoTexture!==!0,ve=Q.__version===void 0||ne===!0,Se=le.dataReady,Ue=E(M,Be);Ce(s.TEXTURE_CUBE_MAP,M);let de;if(We){H&&ve&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,ot,Be.width,Be.height);for(let ce=0;ce<6;ce++){de=Ee[ce].mipmaps;for(let Ne=0;Ne<de.length;Ne++){let it=de[Ne];M.format!==Yn?Ve!==null?H?Se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,0,0,it.width,it.height,Ve,it.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,ot,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?Se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,0,0,it.width,it.height,Ve,_e,it.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne,ot,it.width,it.height,0,Ve,_e,it.data)}}}else{if(de=M.mipmaps,H&&ve){de.length>0&&Ue++;let ce=St(Ee[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,ot,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(pe){H?Se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ee[ce].width,Ee[ce].height,Ve,_e,Ee[ce].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ot,Ee[ce].width,Ee[ce].height,0,Ve,_e,Ee[ce].data);for(let Ne=0;Ne<de.length;Ne++){let Rt=de[Ne].image[ce].image;H?Se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,0,0,Rt.width,Rt.height,Ve,_e,Rt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,ot,Rt.width,Rt.height,0,Ve,_e,Rt.data)}}else{H?Se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ve,_e,Ee[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ot,Ve,_e,Ee[ce]);for(let Ne=0;Ne<de.length;Ne++){let it=de[Ne];H?Se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,0,0,Ve,_e,it.image[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ne+1,ot,Ve,_e,it.image[ce])}}}g(M)&&p(s.TEXTURE_CUBE_MAP),Q.__version=le.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function he(L,M,X,ne,le,Q){let Oe=r.convert(X.format,X.colorSpace),fe=r.convert(X.type),ze=x(X.internalFormat,Oe,fe,X.colorSpace),We=n.get(M),pe=n.get(X);if(pe.__renderTarget=M,!We.__hasExternalTextures){let Ee=Math.max(1,M.width>>Q),Be=Math.max(1,M.height>>Q);le===s.TEXTURE_3D||le===s.TEXTURE_2D_ARRAY?t.texImage3D(le,Q,ze,Ee,Be,M.depth,0,Oe,fe,null):t.texImage2D(le,Q,ze,Ee,Be,0,Oe,fe,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Le(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ne,le,pe.__webglTexture,0,xt(M)):(le===s.TEXTURE_2D||le>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ne,le,pe.__webglTexture,Q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function De(L,M,X){if(s.bindRenderbuffer(s.RENDERBUFFER,L),M.depthBuffer){let ne=M.depthTexture,le=ne&&ne.isDepthTexture?ne.type:null,Q=y(M.stencilBuffer,le),Oe=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=xt(M);Le(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe,Q,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe,Q,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Q,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Oe,s.RENDERBUFFER,L)}else{let ne=M.textures;for(let le=0;le<ne.length;le++){let Q=ne[le],Oe=r.convert(Q.format,Q.colorSpace),fe=r.convert(Q.type),ze=x(Q.internalFormat,Oe,fe,Q.colorSpace),We=xt(M);X&&Le(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,We,ze,M.width,M.height):Le(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,We,ze,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ze,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function re(L,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ne=n.get(M.depthTexture);ne.__renderTarget=M,(!ne.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);let le=ne.__webglTexture,Q=xt(M);if(M.depthTexture.format===$s)Le(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0);else if(M.depthTexture.format===dr)Le(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function Ge(L){let M=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==L.depthTexture){let ne=L.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ne){let le=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ne.removeEventListener("dispose",le)};ne.addEventListener("dispose",le),M.__depthDisposeCallback=le}M.__boundDepthTexture=ne}if(L.depthTexture&&!M.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");let ne=L.texture.mipmaps;ne&&ne.length>0?re(M.__webglFramebuffer[0],L):re(M.__webglFramebuffer,L)}else if(X){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]===void 0)M.__webglDepthbuffer[ne]=s.createRenderbuffer(),De(M.__webglDepthbuffer[ne],L,!1);else{let le=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer[ne];s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,le,s.RENDERBUFFER,Q)}}else{let ne=L.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),De(M.__webglDepthbuffer,L,!1);else{let le=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,le,s.RENDERBUFFER,Q)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function vt(L,M,X){let ne=n.get(L);M!==void 0&&he(ne.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&Ge(L)}function F(L){let M=L.texture,X=n.get(L),ne=n.get(M);L.addEventListener("dispose",P);let le=L.textures,Q=L.isWebGLCubeRenderTarget===!0,Oe=le.length>1;if(Oe||(ne.__webglTexture===void 0&&(ne.__webglTexture=s.createTexture()),ne.__version=M.version,o.memory.textures++),Q){X.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[fe]=[];for(let ze=0;ze<M.mipmaps.length;ze++)X.__webglFramebuffer[fe][ze]=s.createFramebuffer()}else X.__webglFramebuffer[fe]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)X.__webglFramebuffer[fe]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(Oe)for(let fe=0,ze=le.length;fe<ze;fe++){let We=n.get(le[fe]);We.__webglTexture===void 0&&(We.__webglTexture=s.createTexture(),o.memory.textures++)}if(L.samples>0&&Le(L)===!1){X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let fe=0;fe<le.length;fe++){let ze=le[fe];X.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[fe]);let We=r.convert(ze.format,ze.colorSpace),pe=r.convert(ze.type),Ee=x(ze.internalFormat,We,pe,ze.colorSpace,L.isXRRenderTarget===!0),Be=xt(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,Ee,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,X.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),De(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){t.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture),Ce(s.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let ze=0;ze<M.mipmaps.length;ze++)he(X.__webglFramebuffer[fe][ze],L,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze);else he(X.__webglFramebuffer[fe],L,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);g(M)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let fe=0,ze=le.length;fe<ze;fe++){let We=le[fe],pe=n.get(We),Ee=s.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ee=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ee,pe.__webglTexture),Ce(Ee,We),he(X.__webglFramebuffer,L,We,s.COLOR_ATTACHMENT0+fe,Ee,0),g(We)&&p(Ee)}t.unbindTexture()}else{let fe=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(fe=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Ce(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let ze=0;ze<M.mipmaps.length;ze++)he(X.__webglFramebuffer[ze],L,M,s.COLOR_ATTACHMENT0,fe,ze);else he(X.__webglFramebuffer,L,M,s.COLOR_ATTACHMENT0,fe,0);g(M)&&p(fe),t.unbindTexture()}L.depthBuffer&&Ge(L)}function ht(L){let M=L.textures;for(let X=0,ne=M.length;X<ne;X++){let le=M[X];if(g(le)){let Q=m(L),Oe=n.get(le).__webglTexture;t.bindTexture(Q,Oe),p(Q),t.unbindTexture()}}}let Pe=[],ke=[];function ge(L){if(L.samples>0){if(Le(L)===!1){let M=L.textures,X=L.width,ne=L.height,le=s.COLOR_BUFFER_BIT,Q=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Oe=n.get(L),fe=M.length>1;if(fe)for(let We=0;We<M.length;We++)t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+We,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+We,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);let ze=L.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let We=0;We<M.length;We++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(le|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(le|=s.STENCIL_BUFFER_BIT)),fe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[We]);let pe=n.get(M[We]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,pe,0)}s.blitFramebuffer(0,0,X,ne,0,0,X,ne,le,s.NEAREST),l===!0&&(Pe.length=0,ke.length=0,Pe.push(s.COLOR_ATTACHMENT0+We),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Pe.push(Q),ke.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ke)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let We=0;We<M.length;We++){t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+We,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[We]);let pe=n.get(M[We]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+We,s.TEXTURE_2D,pe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){let M=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function xt(L){return Math.min(i.maxSamples,L.samples)}function Le(L){let M=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function nt(L){let M=o.render.frame;h.get(L)!==M&&(h.set(L,M),L.update())}function Ft(L,M){let X=L.colorSpace,ne=L.format,le=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==ds&&X!==Di&&(bt.getTransfer(X)===Lt?(ne!==Yn||le!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),M}function St(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=D,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=vt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Le}function Ix(s,e){function t(n,i=Di){let r,o=bt.getTransfer(i);if(n===si)return s.UNSIGNED_BYTE;if(n===ll)return s.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===oh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ah)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===sh)return s.BYTE;if(n===rh)return s.SHORT;if(n===cr)return s.UNSIGNED_SHORT;if(n===al)return s.INT;if(n===es)return s.UNSIGNED_INT;if(n===ri)return s.FLOAT;if(n===hr)return s.HALF_FLOAT;if(n===lh)return s.ALPHA;if(n===ch)return s.RGB;if(n===Yn)return s.RGBA;if(n===$s)return s.DEPTH_COMPONENT;if(n===dr)return s.DEPTH_STENCIL;if(n===hl)return s.RED;if(n===ul)return s.RED_INTEGER;if(n===hh)return s.RG;if(n===dl)return s.RG_INTEGER;if(n===fl)return s.RGBA_INTEGER;if(n===So||n===wo||n===Eo||n===To)if(o===Lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===So)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===So)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pl||n===ml||n===gl||n===vl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xl||n===yl||n===_l)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xl||n===yl)return o===Lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_l)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bl||n===Ml||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ml)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===El)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Al)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Il)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ll)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===kl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fl||n===Ul||n===Nl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Fl)return o===Lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ol||n===Bl||n===zl||n===Hl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ol)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var Px=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lx=`
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

}`,Lh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ro(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rn({vertexShader:Px,fragmentShader:Lx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends Ci{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,v=null,_=typeof XRWebGLBinding<"u",g=new Lh,p={},m=t.getContextAttributes(),x=null,y=null,E=[],T=[],P=new Te,C=null,S=new un;S.viewport=new At;let w=new un;w.viewport=new At;let R=[S,w],D=new $a,I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Y=E[ee];return Y===void 0&&(Y=new js,E[ee]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(ee){let Y=E[ee];return Y===void 0&&(Y=new js,E[ee]=Y),Y.getGripSpace()},this.getHand=function(ee){let Y=E[ee];return Y===void 0&&(Y=new js,E[ee]=Y),Y.getHandSpace()};function W(ee){let Y=T.indexOf(ee.inputSource);if(Y===-1)return;let he=E[Y];he!==void 0&&(he.update(ee.inputSource,ee.frame,c||o),he.dispatchEvent({type:ee.type,data:ee.inputSource}))}function $(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",Z);for(let ee=0;ee<E.length;ee++){let Y=T[ee];Y!==null&&(T[ee]=null,E[ee].disconnect(Y))}I=null,O=null,g.reset();for(let ee in p)delete p[ee];e.setRenderTarget(x),f=null,d=null,u=null,i=null,y=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",$),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,De=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=m.stencil?dr:$s,De=m.stencil?ur:es);let Ge={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ge),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new hi(d.textureWidth,d.textureHeight,{format:Yn,type:si,depthTexture:new so(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let he={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,he),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new hi(f.framebufferWidth,f.framebufferHeight,{format:Yn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),He.setContext(i),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Z(ee){for(let Y=0;Y<ee.removed.length;Y++){let he=ee.removed[Y],De=T.indexOf(he);De>=0&&(T[De]=null,E[De].disconnect(he))}for(let Y=0;Y<ee.added.length;Y++){let he=ee.added[Y],De=T.indexOf(he);if(De===-1){for(let Ge=0;Ge<E.length;Ge++)if(Ge>=T.length){T.push(he),De=Ge;break}else if(T[Ge]===null){T[Ge]=he,De=Ge;break}if(De===-1)break}let re=E[De];re&&re.connect(he)}}let q=new U,oe=new U;function ue(ee,Y,he){q.setFromMatrixPosition(Y.matrixWorld),oe.setFromMatrixPosition(he.matrixWorld);let De=q.distanceTo(oe),re=Y.projectionMatrix.elements,Ge=he.projectionMatrix.elements,vt=re[14]/(re[10]-1),F=re[14]/(re[10]+1),ht=(re[9]+1)/re[5],Pe=(re[9]-1)/re[5],ke=(re[8]-1)/re[0],ge=(Ge[8]+1)/Ge[0],xt=vt*ke,Le=vt*ge,nt=De/(-ke+ge),Ft=nt*-ke;if(Y.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Ft),ee.translateZ(nt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),re[10]===-1)ee.projectionMatrix.copy(Y.projectionMatrix),ee.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let St=vt+nt,L=F+nt,M=xt-Ft,X=Le+(De-Ft),ne=ht*F/L*St,le=Pe*F/L*St;ee.projectionMatrix.makePerspective(M,X,ne,le,St,L),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function Me(ee,Y){Y===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Y.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let Y=ee.near,he=ee.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(he=g.depthFar)),D.near=w.near=S.near=Y,D.far=w.far=S.far=he,(I!==D.near||O!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,O=D.far),D.layers.mask=ee.layers.mask|6,S.layers.mask=D.layers.mask&3,w.layers.mask=D.layers.mask&5;let De=ee.parent,re=D.cameras;Me(D,De);for(let Ge=0;Ge<re.length;Ge++)Me(re[Ge],De);re.length===2?ue(D,S,w):D.projectionMatrix.copy(S.projectionMatrix),Ce(ee,D,De)};function Ce(ee,Y,he){he===null?ee.matrix.copy(Y.matrixWorld):(ee.matrix.copy(he.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Y.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Y.projectionMatrix),ee.projectionMatrixInverse.copy(Y.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=_a*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(ee){l=ee,d!==null&&(d.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(ee){return p[ee]};let qe=null;function Ye(ee,Y){if(h=Y.getViewerPose(c||o),v=Y,h!==null){let he=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let De=!1;he.length!==D.cameras.length&&(D.cameras.length=0,De=!0);for(let F=0;F<he.length;F++){let ht=he[F],Pe=null;if(f!==null)Pe=f.getViewport(ht);else{let ge=u.getViewSubImage(d,ht);Pe=ge.viewport,F===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let ke=R[F];ke===void 0&&(ke=new un,ke.layers.enable(F),ke.viewport=new At,R[F]=ke),ke.matrix.fromArray(ht.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(ht.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),F===0&&(D.matrix.copy(ke.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),De===!0&&D.cameras.push(ke)}let re=i.enabledFeatures;if(re&&re.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let F=u.getDepthInformation(he[0]);F&&F.isValid&&F.texture&&g.init(F,i.renderState)}if(re&&re.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let F=0;F<he.length;F++){let ht=he[F].camera;if(ht){let Pe=p[ht];Pe||(Pe=new ro,p[ht]=Pe);let ke=u.getCameraImage(ht);Pe.sourceTexture=ke}}}}for(let he=0;he<E.length;he++){let De=T[he],re=E[he];De!==null&&re!==void 0&&re.update(De,Y,c||o)}qe&&qe(ee,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),v=null}let He=new cf;He.setAnimationLoop(Ye),this.setAnimationLoop=function(ee){qe=ee},this.dispose=function(){}}},ys=new qn,Dx=new Et;function kx(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,mh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,m,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),v(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,m,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===pn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===pn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let m=e.get(p),x=m.envMap,y=m.envMapRotation;x&&(g.envMap.value=x,ys.copy(y),ys.x*=-1,ys.y*=-1,ys.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),g.envMapRotation.value.setFromMatrix4(Dx.makeRotationFromEuler(ys)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,m,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*m,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,m){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let m=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Fx(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,x){let y=x.program;n.uniformBlockBinding(m,y)}function c(m,x){let y=i[m.id];y===void 0&&(v(m),y=h(m),i[m.id]=y,m.addEventListener("dispose",g));let E=x.program;n.updateUBOMapping(m,E);let T=e.render.frame;r[m.id]!==T&&(d(m),r[m.id]=T)}function h(m){let x=u();m.__bindingPointIndex=x;let y=s.createBuffer(),E=m.__size,T=m.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,E,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,y),y}function u(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(m){let x=i[m.id],y=m.uniforms,E=m.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,P=y.length;T<P;T++){let C=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,w=C.length;S<w;S++){let R=C[S];if(f(R,T,S,E)===!0){let D=R.__offset,I=Array.isArray(R.value)?R.value:[R.value],O=0;for(let W=0;W<I.length;W++){let $=I[W],Z=_($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,s.bufferSubData(s.UNIFORM_BUFFER,D+O,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,O),O+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(m,x,y,E){let T=m.value,P=x+"_"+y;if(E[P]===void 0)return typeof T=="number"||typeof T=="boolean"?E[P]=T:E[P]=T.clone(),!0;{let C=E[P];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return E[P]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function v(m){let x=m.uniforms,y=0,E=16;for(let P=0,C=x.length;P<C;P++){let S=Array.isArray(x[P])?x[P]:[x[P]];for(let w=0,R=S.length;w<R;w++){let D=S[w],I=Array.isArray(D.value)?D.value:[D.value];for(let O=0,W=I.length;O<W;O++){let $=I[O],Z=_($),q=y%E,oe=q%Z.boundary,ue=q+oe;y+=oe,ue!==0&&E-ue<Z.storage&&(y+=E-ue),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=Z.storage}}}let T=y%E;return T>0&&(y+=E-T),m.__size=y,m.__cache={},this}function _(m){let x={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(x.boundary=4,x.storage=4):m.isVector2?(x.boundary=8,x.storage=8):m.isVector3||m.isColor?(x.boundary=16,x.storage=12):m.isVector4?(x.boundary=16,x.storage=16):m.isMatrix3?(x.boundary=48,x.storage=48):m.isMatrix4?(x.boundary=64,x.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),x}function g(m){let x=m.target;x.removeEventListener("dispose",g);let y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(let m in i)s.deleteBuffer(i[m]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var $l=class{constructor(e={}){let{canvas:t=Cd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let v=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,E=!1;this._outputColorSpace=qt;let T=0,P=0,C=null,S=-1,w=null,R=new At,D=new At,I=null,O=new et(0),W=0,$=t.width,Z=t.height,q=1,oe=null,ue=null,Me=new At(0,0,$,Z),Ce=new At(0,0,$,Z),qe=!1,Ye=new er,He=!1,ee=!1,Y=new Et,he=new U,De=new At,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function vt(){return C===null?q:1}let F=n;function ht(b,A){return t.getContext(b,A)}try{let b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",de,!1),F===null){let A="webgl2";if(F=ht(A,b),F===null)throw ht(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Pe,ke,ge,xt,Le,nt,Ft,St,L,M,X,ne,le,Q,Oe,fe,ze,We,pe,Ee,Be,Ve,_e,ot;function H(){Pe=new Qg(F),Pe.init(),Ve=new Ix(F,Pe),ke=new qg(F,Pe,e,Ve),ge=new Rx(F,Pe),ke.reversedDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),xt=new nv(F),Le=new mx,nt=new Cx(F,Pe,ge,Le,ke,Ve,xt),Ft=new $g(y),St=new jg(y),L=new lm(F),_e=new Wg(F,L),M=new ev(F,L,xt,_e),X=new sv(F,M,L,xt),pe=new iv(F,ke,nt),fe=new Yg(Le),ne=new px(y,Ft,St,Pe,ke,_e,fe),le=new kx(y,Le),Q=new vx,Oe=new Sx(Pe),We=new Gg(y,Ft,St,ge,X,f,l),ze=new Tx(y,X,ke),ot=new Fx(F,xt,ke,ge),Ee=new Xg(F,Pe,xt),Be=new tv(F,Pe,xt),xt.programs=ne.programs,y.capabilities=ke,y.extensions=Pe,y.properties=Le,y.renderLists=Q,y.shadowMap=ze,y.state=ge,y.info=xt}H();let ve=new Dh(y,F);this.xr=ve,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let b=Pe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Pe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize($,Z,!1))},this.getSize=function(b){return b.set($,Z)},this.setSize=function(b,A,B=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=b,Z=A,t.width=Math.floor(b*q),t.height=Math.floor(A*q),B===!0&&(t.style.width=b+"px",t.style.height=A+"px"),this.setViewport(0,0,b,A)},this.getDrawingBufferSize=function(b){return b.set($*q,Z*q).floor()},this.setDrawingBufferSize=function(b,A,B){$=b,Z=A,q=B,t.width=Math.floor(b*B),t.height=Math.floor(A*B),this.setViewport(0,0,b,A)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(Me)},this.setViewport=function(b,A,B,G){b.isVector4?Me.set(b.x,b.y,b.z,b.w):Me.set(b,A,B,G),ge.viewport(R.copy(Me).multiplyScalar(q).round())},this.getScissor=function(b){return b.copy(Ce)},this.setScissor=function(b,A,B,G){b.isVector4?Ce.set(b.x,b.y,b.z,b.w):Ce.set(b,A,B,G),ge.scissor(D.copy(Ce).multiplyScalar(q).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(b){ge.setScissorTest(qe=b)},this.setOpaqueSort=function(b){oe=b},this.setTransparentSort=function(b){ue=b},this.getClearColor=function(b){return b.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(b=!0,A=!0,B=!0){let G=0;if(b){let V=!1;if(C!==null){let ae=C.texture.format;V=ae===fl||ae===dl||ae===ul}if(V){let ae=C.texture.type,xe=ae===si||ae===es||ae===cr||ae===ur||ae===ll||ae===cl,Ie=We.getClearColor(),Re=We.getClearAlpha(),Je=Ie.r,tt=Ie.g,$e=Ie.b;xe?(v[0]=Je,v[1]=tt,v[2]=$e,v[3]=Re,F.clearBufferuiv(F.COLOR,0,v)):(_[0]=Je,_[1]=tt,_[2]=$e,_[3]=Re,F.clearBufferiv(F.COLOR,0,_))}else G|=F.COLOR_BUFFER_BIT}A&&(G|=F.DEPTH_BUFFER_BIT),B&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",de,!1),We.dispose(),Q.dispose(),Oe.dispose(),Le.dispose(),Ft.dispose(),St.dispose(),X.dispose(),_e.dispose(),ot.dispose(),ne.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",In),ve.removeEventListener("sessionend",$n),z.stop()};function Se(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ue(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let b=xt.autoReset,A=ze.enabled,B=ze.autoUpdate,G=ze.needsUpdate,V=ze.type;H(),xt.autoReset=b,ze.enabled=A,ze.autoUpdate=B,ze.needsUpdate=G,ze.type=V}function de(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ce(b){let A=b.target;A.removeEventListener("dispose",ce),Ne(A)}function Ne(b){it(b),Le.remove(b)}function it(b){let A=Le.get(b).programs;A!==void 0&&(A.forEach(function(B){ne.releaseProgram(B)}),b.isShaderMaterial&&ne.releaseShaderCache(b))}this.renderBufferDirect=function(b,A,B,G,V,ae){A===null&&(A=re);let xe=V.isMesh&&V.matrixWorld.determinant()<0,Ie=j(b,A,B,G,V);ge.setMaterial(G,xe);let Re=B.index,Je=1;if(G.wireframe===!0){if(Re=M.getWireframeAttribute(B),Re===void 0)return;Je=2}let tt=B.drawRange,$e=B.attributes.position,ft=tt.start*Je,Ct=(tt.start+tt.count)*Je;ae!==null&&(ft=Math.max(ft,ae.start*Je),Ct=Math.min(Ct,(ae.start+ae.count)*Je)),Re!==null?(ft=Math.max(ft,0),Ct=Math.min(Ct,Re.count)):$e!=null&&(ft=Math.max(ft,0),Ct=Math.min(Ct,$e.count));let rt=Ct-ft;if(rt<0||rt===1/0)return;_e.setup(V,G,Ie,B,Re);let dt,Ut=Ee;if(Re!==null&&(dt=L.get(Re),Ut=Be,Ut.setIndex(dt)),V.isMesh)G.wireframe===!0?(ge.setLineWidth(G.wireframeLinewidth*vt()),Ut.setMode(F.LINES)):Ut.setMode(F.TRIANGLES);else if(V.isLine){let je=G.linewidth;je===void 0&&(je=1),ge.setLineWidth(je*vt()),V.isLineSegments?Ut.setMode(F.LINES):V.isLineLoop?Ut.setMode(F.LINE_LOOP):Ut.setMode(F.LINE_STRIP)}else V.isPoints?Ut.setMode(F.POINTS):V.isSprite&&Ut.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Zs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ut.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Pe.get("WEBGL_multi_draw"))Ut.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let je=V._multiDrawStarts,Yt=V._multiDrawCounts,wt=V._multiDrawCount,Un=Re?L.get(Re).bytesPerElement:1,Es=Le.get(G).currentProgram.getUniforms();for(let Nn=0;Nn<wt;Nn++)Es.setValue(F,"_gl_DrawID",Nn),Ut.render(je[Nn]/Un,Yt[Nn])}else if(V.isInstancedMesh)Ut.renderInstances(ft,rt,V.count);else if(B.isInstancedBufferGeometry){let je=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Yt=Math.min(B.instanceCount,je);Ut.renderInstances(ft,rt,Yt)}else Ut.render(ft,rt)};function Rt(b,A,B){b.transparent===!0&&b.side===xn&&b.forceSinglePass===!1?(b.side=pn,b.needsUpdate=!0,It(b,A,B),b.side=Ai,b.needsUpdate=!0,It(b,A,B),b.side=xn):It(b,A,B)}this.compile=function(b,A,B=null){B===null&&(B=b),p=Oe.get(B),p.init(A),x.push(p),B.traverseVisible(function(V){V.isLight&&V.layers.test(A.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),b!==B&&b.traverseVisible(function(V){V.isLight&&V.layers.test(A.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();let G=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let ae=V.material;if(ae)if(Array.isArray(ae))for(let xe=0;xe<ae.length;xe++){let Ie=ae[xe];Rt(Ie,B,V),G.add(Ie)}else Rt(ae,B,V),G.add(ae)}),p=x.pop(),G},this.compileAsync=function(b,A,B=null){let G=this.compile(b,A,B);return new Promise(V=>{function ae(){if(G.forEach(function(xe){Le.get(xe).currentProgram.isReady()&&G.delete(xe)}),G.size===0){V(b);return}setTimeout(ae,10)}Pe.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let _t=null;function Cn(b){_t&&_t(b)}function In(){z.stop()}function $n(){z.start()}let z=new cf;z.setAnimationLoop(Cn),typeof self<"u"&&z.setContext(self),this.setAnimationLoop=function(b){_t=b,ve.setAnimationLoop(b),b===null?z.stop():z.start()},ve.addEventListener("sessionstart",In),ve.addEventListener("sessionend",$n),this.render=function(b,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(A),A=ve.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,A,C),p=Oe.get(b,x.length),p.init(A),x.push(p),Y.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),Ye.setFromProjectionMatrix(Y,ei,A.reversedDepth),ee=this.localClippingEnabled,He=fe.init(this.clippingPlanes,ee),g=Q.get(b,m.length),g.init(),m.push(g),ve.enabled===!0&&ve.isPresenting===!0){let ae=y.xr.getDepthSensingMesh();ae!==null&&me(ae,A,-1/0,y.sortObjects)}me(b,A,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(oe,ue),Ge=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,Ge&&We.addToRenderList(g,b),this.info.render.frame++,He===!0&&fe.beginShadows();let B=p.state.shadowsArray;ze.render(B,b,A),He===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,V=g.transmissive;if(p.setupLights(),A.isArrayCamera){let ae=A.cameras;if(V.length>0)for(let xe=0,Ie=ae.length;xe<Ie;xe++){let Re=ae[xe];Ke(G,V,b,Re)}Ge&&We.render(b);for(let xe=0,Ie=ae.length;xe<Ie;xe++){let Re=ae[xe];we(g,b,Re,Re.viewport)}}else V.length>0&&Ke(G,V,b,A),Ge&&We.render(b),we(g,b,A);C!==null&&P===0&&(nt.updateMultisampleRenderTarget(C),nt.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(y,b,A),_e.resetDefaultState(),S=-1,w=null,x.pop(),x.length>0?(p=x[x.length-1],He===!0&&fe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function me(b,A,B,G){if(b.visible===!1)return;if(b.layers.test(A.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(A);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ye.intersectsSprite(b)){G&&De.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Y);let xe=X.update(b),Ie=b.material;Ie.visible&&g.push(b,xe,Ie,B,De.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ye.intersectsObject(b))){let xe=X.update(b),Ie=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),De.copy(b.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),De.copy(xe.boundingSphere.center)),De.applyMatrix4(b.matrixWorld).applyMatrix4(Y)),Array.isArray(Ie)){let Re=xe.groups;for(let Je=0,tt=Re.length;Je<tt;Je++){let $e=Re[Je],ft=Ie[$e.materialIndex];ft&&ft.visible&&g.push(b,xe,ft,B,De.z,$e)}}else Ie.visible&&g.push(b,xe,Ie,B,De.z,null)}}let ae=b.children;for(let xe=0,Ie=ae.length;xe<Ie;xe++)me(ae[xe],A,B,G)}function we(b,A,B,G){let V=b.opaque,ae=b.transmissive,xe=b.transparent;p.setupLightsView(B),He===!0&&fe.setGlobalState(y.clippingPlanes,B),G&&ge.viewport(R.copy(G)),V.length>0&&Fe(V,A,B),ae.length>0&&Fe(ae,A,B),xe.length>0&&Fe(xe,A,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Ke(b,A,B,G){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new hi(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float")?hr:si,minFilter:Qi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace}));let ae=p.state.transmissionRenderTarget[G.id],xe=G.viewport||R;ae.setSize(xe.z*y.transmissionResolutionScale,xe.w*y.transmissionResolutionScale);let Ie=y.getRenderTarget(),Re=y.getActiveCubeFace(),Je=y.getActiveMipmapLevel();y.setRenderTarget(ae),y.getClearColor(O),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),Ge&&We.render(B);let tt=y.toneMapping;y.toneMapping=ii;let $e=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),He===!0&&fe.setGlobalState(y.clippingPlanes,G),Fe(b,B,G),nt.updateMultisampleRenderTarget(ae),nt.updateRenderTargetMipmap(ae),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let Ct=0,rt=A.length;Ct<rt;Ct++){let dt=A[Ct],Ut=dt.object,je=dt.geometry,Yt=dt.material,wt=dt.group;if(Yt.side===xn&&Ut.layers.test(G.layers)){let Un=Yt.side;Yt.side=pn,Yt.needsUpdate=!0,lt(Ut,B,G,je,Yt,wt),Yt.side=Un,Yt.needsUpdate=!0,ft=!0}}ft===!0&&(nt.updateMultisampleRenderTarget(ae),nt.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ie,Re,Je),y.setClearColor(O,W),$e!==void 0&&(G.viewport=$e),y.toneMapping=tt}function Fe(b,A,B){let G=A.isScene===!0?A.overrideMaterial:null;for(let V=0,ae=b.length;V<ae;V++){let xe=b[V],Ie=xe.object,Re=xe.geometry,Je=xe.group,tt=xe.material;tt.allowOverride===!0&&G!==null&&(tt=G),Ie.layers.test(B.layers)&&lt(Ie,A,B,Re,tt,Je)}}function lt(b,A,B,G,V,ae){b.onBeforeRender(y,A,B,G,V,ae),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(y,A,B,G,b,ae),V.transparent===!0&&V.side===xn&&V.forceSinglePass===!1?(V.side=pn,V.needsUpdate=!0,y.renderBufferDirect(B,A,G,V,b,ae),V.side=Ai,V.needsUpdate=!0,y.renderBufferDirect(B,A,G,V,b,ae),V.side=xn):y.renderBufferDirect(B,A,G,V,b,ae),b.onAfterRender(y,A,B,G,V,ae)}function It(b,A,B){A.isScene!==!0&&(A=re);let G=Le.get(b),V=p.state.lights,ae=p.state.shadowsArray,xe=V.state.version,Ie=ne.getParameters(b,V.state,ae,A,B),Re=ne.getProgramCacheKey(Ie),Je=G.programs;G.environment=b.isMeshStandardMaterial?A.environment:null,G.fog=A.fog,G.envMap=(b.isMeshStandardMaterial?St:Ft).get(b.envMap||G.environment),G.envMapRotation=G.environment!==null&&b.envMap===null?A.environmentRotation:b.envMapRotation,Je===void 0&&(b.addEventListener("dispose",ce),Je=new Map,G.programs=Je);let tt=Je.get(Re);if(tt!==void 0){if(G.currentProgram===tt&&G.lightsStateVersion===xe)return J(b,Ie),tt}else Ie.uniforms=ne.getUniforms(b),b.onBeforeCompile(Ie,y),tt=ne.acquireProgram(Ie,Re),Je.set(Re,tt),G.uniforms=Ie.uniforms;let $e=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&($e.clippingPlanes=fe.uniform),J(b,Ie),G.needsLights=k(b),G.lightsStateVersion=xe,G.needsLights&&($e.ambientLightColor.value=V.state.ambient,$e.lightProbe.value=V.state.probe,$e.directionalLights.value=V.state.directional,$e.directionalLightShadows.value=V.state.directionalShadow,$e.spotLights.value=V.state.spot,$e.spotLightShadows.value=V.state.spotShadow,$e.rectAreaLights.value=V.state.rectArea,$e.ltc_1.value=V.state.rectAreaLTC1,$e.ltc_2.value=V.state.rectAreaLTC2,$e.pointLights.value=V.state.point,$e.pointLightShadows.value=V.state.pointShadow,$e.hemisphereLights.value=V.state.hemi,$e.directionalShadowMap.value=V.state.directionalShadowMap,$e.directionalShadowMatrix.value=V.state.directionalShadowMatrix,$e.spotShadowMap.value=V.state.spotShadowMap,$e.spotLightMatrix.value=V.state.spotLightMatrix,$e.spotLightMap.value=V.state.spotLightMap,$e.pointShadowMap.value=V.state.pointShadowMap,$e.pointShadowMatrix.value=V.state.pointShadowMatrix),G.currentProgram=tt,G.uniformsList=null,tt}function Pt(b){if(b.uniformsList===null){let A=b.currentProgram.getUniforms();b.uniformsList=mr.seqWithValue(A.seq,b.uniforms)}return b.uniformsList}function J(b,A){let B=Le.get(b);B.outputColorSpace=A.outputColorSpace,B.batching=A.batching,B.batchingColor=A.batchingColor,B.instancing=A.instancing,B.instancingColor=A.instancingColor,B.instancingMorph=A.instancingMorph,B.skinning=A.skinning,B.morphTargets=A.morphTargets,B.morphNormals=A.morphNormals,B.morphColors=A.morphColors,B.morphTargetsCount=A.morphTargetsCount,B.numClippingPlanes=A.numClippingPlanes,B.numIntersection=A.numClipIntersection,B.vertexAlphas=A.vertexAlphas,B.vertexTangents=A.vertexTangents,B.toneMapping=A.toneMapping}function j(b,A,B,G,V){A.isScene!==!0&&(A=re),nt.resetTextureUnits();let ae=A.fog,xe=G.isMeshStandardMaterial?A.environment:null,Ie=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ds,Re=(G.isMeshStandardMaterial?St:Ft).get(G.envMap||xe),Je=G.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,tt=!!B.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),$e=!!B.morphAttributes.position,ft=!!B.morphAttributes.normal,Ct=!!B.morphAttributes.color,rt=ii;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(rt=y.toneMapping);let dt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ut=dt!==void 0?dt.length:0,je=Le.get(G),Yt=p.state.lights;if(He===!0&&(ee===!0||b!==w)){let Mn=b===w&&G.id===S;fe.setState(G,b,Mn)}let wt=!1;G.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Yt.state.version||je.outputColorSpace!==Ie||V.isBatchedMesh&&je.batching===!1||!V.isBatchedMesh&&je.batching===!0||V.isBatchedMesh&&je.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&je.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&je.instancing===!1||!V.isInstancedMesh&&je.instancing===!0||V.isSkinnedMesh&&je.skinning===!1||!V.isSkinnedMesh&&je.skinning===!0||V.isInstancedMesh&&je.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&je.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&je.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&je.instancingMorph===!1&&V.morphTexture!==null||je.envMap!==Re||G.fog===!0&&je.fog!==ae||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==fe.numPlanes||je.numIntersection!==fe.numIntersection)||je.vertexAlphas!==Je||je.vertexTangents!==tt||je.morphTargets!==$e||je.morphNormals!==ft||je.morphColors!==Ct||je.toneMapping!==rt||je.morphTargetsCount!==Ut)&&(wt=!0):(wt=!0,je.__version=G.version);let Un=je.currentProgram;wt===!0&&(Un=It(G,A,V));let Es=!1,Nn=!1,Tr=!1,$t=Un.getUniforms(),Vn=je.uniforms;if(ge.useProgram(Un.program)&&(Es=!0,Nn=!0,Tr=!0),G.id!==S&&(S=G.id,Nn=!0),Es||w!==b){ge.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),$t.setValue(F,"projectionMatrix",b.projectionMatrix),$t.setValue(F,"viewMatrix",b.matrixWorldInverse);let Pn=$t.map.cameraPosition;Pn!==void 0&&Pn.setValue(F,he.setFromMatrixPosition(b.matrixWorld)),ke.logarithmicDepthBuffer&&$t.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&$t.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),w!==b&&(w=b,Nn=!0,Tr=!0)}if(V.isSkinnedMesh){$t.setOptional(F,V,"bindMatrix"),$t.setOptional(F,V,"bindMatrixInverse");let Mn=V.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),$t.setValue(F,"boneTexture",Mn.boneTexture,nt))}V.isBatchedMesh&&($t.setOptional(F,V,"batchingTexture"),$t.setValue(F,"batchingTexture",V._matricesTexture,nt),$t.setOptional(F,V,"batchingIdTexture"),$t.setValue(F,"batchingIdTexture",V._indirectTexture,nt),$t.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&$t.setValue(F,"batchingColorTexture",V._colorsTexture,nt));let Gn=B.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&pe.update(V,B,Un),(Nn||je.receiveShadow!==V.receiveShadow)&&(je.receiveShadow=V.receiveShadow,$t.setValue(F,"receiveShadow",V.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Vn.envMap.value=Re,Vn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&A.environment!==null&&(Vn.envMapIntensity.value=A.environmentIntensity),Nn&&($t.setValue(F,"toneMappingExposure",y.toneMappingExposure),je.needsLights&&te(Vn,Tr),ae&&G.fog===!0&&le.refreshFogUniforms(Vn,ae),le.refreshMaterialUniforms(Vn,G,q,Z,p.state.transmissionRenderTarget[b.id]),mr.upload(F,Pt(je),Vn,nt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(mr.upload(F,Pt(je),Vn,nt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&$t.setValue(F,"center",V.center),$t.setValue(F,"modelViewMatrix",V.modelViewMatrix),$t.setValue(F,"normalMatrix",V.normalMatrix),$t.setValue(F,"modelMatrix",V.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Mn=G.uniformsGroups;for(let Pn=0,hc=Mn.length;Pn<hc;Pn++){let ns=Mn[Pn];ot.update(ns,Un),ot.bind(ns,Un)}}return Un}function te(b,A){b.ambientLightColor.needsUpdate=A,b.lightProbe.needsUpdate=A,b.directionalLights.needsUpdate=A,b.directionalLightShadows.needsUpdate=A,b.pointLights.needsUpdate=A,b.pointLightShadows.needsUpdate=A,b.spotLights.needsUpdate=A,b.spotLightShadows.needsUpdate=A,b.rectAreaLights.needsUpdate=A,b.hemisphereLights.needsUpdate=A}function k(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,A,B){let G=Le.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Le.get(b.texture).__webglTexture=A,Le.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:B,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,A){let B=Le.get(b);B.__webglFramebuffer=A,B.__useDefaultFramebuffer=A===void 0};let N=F.createFramebuffer();this.setRenderTarget=function(b,A=0,B=0){C=b,T=A,P=B;let G=!0,V=null,ae=!1,xe=!1;if(b){let Re=Le.get(b);if(Re.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(F.FRAMEBUFFER,null),G=!1;else if(Re.__webglFramebuffer===void 0)nt.setupRenderTarget(b);else if(Re.__hasExternalTextures)nt.rebindTextures(b,Le.get(b.texture).__webglTexture,Le.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let $e=b.depthTexture;if(Re.__boundDepthTexture!==$e){if($e!==null&&Le.has($e)&&(b.width!==$e.image.width||b.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");nt.setupDepthRenderbuffer(b)}}let Je=b.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(xe=!0);let tt=Le.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(tt[A])?V=tt[A][B]:V=tt[A],ae=!0):b.samples>0&&nt.useMultisampledRTT(b)===!1?V=Le.get(b).__webglMultisampledFramebuffer:Array.isArray(tt)?V=tt[B]:V=tt,R.copy(b.viewport),D.copy(b.scissor),I=b.scissorTest}else R.copy(Me).multiplyScalar(q).floor(),D.copy(Ce).multiplyScalar(q).floor(),I=qe;if(B!==0&&(V=N),ge.bindFramebuffer(F.FRAMEBUFFER,V)&&G&&ge.drawBuffers(b,V),ge.viewport(R),ge.scissor(D),ge.setScissorTest(I),ae){let Re=Le.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+A,Re.__webglTexture,B)}else if(xe){let Re=A;for(let Je=0;Je<b.textures.length;Je++){let tt=Le.get(b.textures[Je]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Je,tt.__webglTexture,B,Re)}}else if(b!==null&&B!==0){let Re=Le.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Re.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(b,A,B,G,V,ae,xe,Ie=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Re=Re[xe]),Re){ge.bindFramebuffer(F.FRAMEBUFFER,Re);try{let Je=b.textures[Ie],tt=Je.format,$e=Je.type;if(!ke.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=b.width-G&&B>=0&&B<=b.height-V&&(b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ie),F.readPixels(A,B,G,V,Ve.convert(tt),Ve.convert($e),ae))}finally{let Je=C!==null?Le.get(C).__webglFramebuffer:null;ge.bindFramebuffer(F.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(b,A,B,G,V,ae,xe,Ie=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Re=Re[xe]),Re)if(A>=0&&A<=b.width-G&&B>=0&&B<=b.height-V){ge.bindFramebuffer(F.FRAMEBUFFER,Re);let Je=b.textures[Ie],tt=Je.format,$e=Je.type;if(!ke.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ft),F.bufferData(F.PIXEL_PACK_BUFFER,ae.byteLength,F.STREAM_READ),b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ie),F.readPixels(A,B,G,V,Ve.convert(tt),Ve.convert($e),0);let Ct=C!==null?Le.get(C).__webglFramebuffer:null;ge.bindFramebuffer(F.FRAMEBUFFER,Ct);let rt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Id(F,rt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ft),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ae),F.deleteBuffer(ft),F.deleteSync(rt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,A=null,B=0){let G=Math.pow(2,-B),V=Math.floor(b.image.width*G),ae=Math.floor(b.image.height*G),xe=A!==null?A.x:0,Ie=A!==null?A.y:0;nt.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,B,0,0,xe,Ie,V,ae),ge.unbindTexture()};let K=F.createFramebuffer(),ie=F.createFramebuffer();this.copyTextureToTexture=function(b,A,B=null,G=null,V=0,ae=null){ae===null&&(V!==0?(Zs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=V,V=0):ae=0);let xe,Ie,Re,Je,tt,$e,ft,Ct,rt,dt=b.isCompressedTexture?b.mipmaps[ae]:b.image;if(B!==null)xe=B.max.x-B.min.x,Ie=B.max.y-B.min.y,Re=B.isBox3?B.max.z-B.min.z:1,Je=B.min.x,tt=B.min.y,$e=B.isBox3?B.min.z:0;else{let Gn=Math.pow(2,-V);xe=Math.floor(dt.width*Gn),Ie=Math.floor(dt.height*Gn),b.isDataArrayTexture?Re=dt.depth:b.isData3DTexture?Re=Math.floor(dt.depth*Gn):Re=1,Je=0,tt=0,$e=0}G!==null?(ft=G.x,Ct=G.y,rt=G.z):(ft=0,Ct=0,rt=0);let Ut=Ve.convert(A.format),je=Ve.convert(A.type),Yt;A.isData3DTexture?(nt.setTexture3D(A,0),Yt=F.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(nt.setTexture2DArray(A,0),Yt=F.TEXTURE_2D_ARRAY):(nt.setTexture2D(A,0),Yt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,A.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,A.unpackAlignment);let wt=F.getParameter(F.UNPACK_ROW_LENGTH),Un=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Es=F.getParameter(F.UNPACK_SKIP_PIXELS),Nn=F.getParameter(F.UNPACK_SKIP_ROWS),Tr=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,dt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,dt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Je),F.pixelStorei(F.UNPACK_SKIP_ROWS,tt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,$e);let $t=b.isDataArrayTexture||b.isData3DTexture,Vn=A.isDataArrayTexture||A.isData3DTexture;if(b.isDepthTexture){let Gn=Le.get(b),Mn=Le.get(A),Pn=Le.get(Gn.__renderTarget),hc=Le.get(Mn.__renderTarget);ge.bindFramebuffer(F.READ_FRAMEBUFFER,Pn.__webglFramebuffer),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,hc.__webglFramebuffer);for(let ns=0;ns<Re;ns++)$t&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.get(b).__webglTexture,V,$e+ns),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.get(A).__webglTexture,ae,rt+ns)),F.blitFramebuffer(Je,tt,xe,Ie,ft,Ct,xe,Ie,F.DEPTH_BUFFER_BIT,F.NEAREST);ge.bindFramebuffer(F.READ_FRAMEBUFFER,null),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||b.isRenderTargetTexture||Le.has(b)){let Gn=Le.get(b),Mn=Le.get(A);ge.bindFramebuffer(F.READ_FRAMEBUFFER,K),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,ie);for(let Pn=0;Pn<Re;Pn++)$t?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Gn.__webglTexture,V,$e+Pn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Gn.__webglTexture,V),Vn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Mn.__webglTexture,ae,rt+Pn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Mn.__webglTexture,ae),V!==0?F.blitFramebuffer(Je,tt,xe,Ie,ft,Ct,xe,Ie,F.COLOR_BUFFER_BIT,F.NEAREST):Vn?F.copyTexSubImage3D(Yt,ae,ft,Ct,rt+Pn,Je,tt,xe,Ie):F.copyTexSubImage2D(Yt,ae,ft,Ct,Je,tt,xe,Ie);ge.bindFramebuffer(F.READ_FRAMEBUFFER,null),ge.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Vn?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Yt,ae,ft,Ct,rt,xe,Ie,Re,Ut,je,dt.data):A.isCompressedArrayTexture?F.compressedTexSubImage3D(Yt,ae,ft,Ct,rt,xe,Ie,Re,Ut,dt.data):F.texSubImage3D(Yt,ae,ft,Ct,rt,xe,Ie,Re,Ut,je,dt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ae,ft,Ct,xe,Ie,Ut,je,dt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ae,ft,Ct,dt.width,dt.height,Ut,dt.data):F.texSubImage2D(F.TEXTURE_2D,ae,ft,Ct,xe,Ie,Ut,je,dt);F.pixelStorei(F.UNPACK_ROW_LENGTH,wt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Un),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Es),F.pixelStorei(F.UNPACK_SKIP_ROWS,Nn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Tr),ae===0&&A.generateMipmaps&&F.generateMipmap(Yt),ge.unbindTexture()},this.initRenderTarget=function(b){Le.get(b).__webglFramebuffer===void 0&&nt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?nt.setTextureCube(b,0):b.isData3DTexture?nt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?nt.setTexture2DArray(b,0):nt.setTexture2D(b,0),ge.unbindTexture()},this.resetState=function(){T=0,P=0,C=null,ge.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}};function ln(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var Mt=(s,e,t)=>s<e?e:s>t?t:s,_n=(s,e,t)=>s+(e-s)*t,gi=(s,e,t)=>{let n=Mt((t-s)/(e-s||1e-6),0,1);return n*n*(3-2*n)},yr=(s,e)=>1-Math.exp(-s*e);function oi(s){return[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255]}function Fh(s){return"#"+s.toString(16).padStart(6,"0")}function ki(s,e){let t=document.createElement("canvas");t.width=s,t.height=e;let n=t.getContext("2d");return{c:t,g:n}}function Fi(s,e={}){let t=new io(s);return e.srgb!==!1&&(t.colorSpace=qt),e.repeat&&(t.wrapS=us,t.wrapT=us),t.anisotropy=4,t}var Rn=11;function Ro(s,e){let t=Mt(Math.round(s[0]*e),0,255),n=Mt(Math.round(s[1]*e),0,255),i=Mt(Math.round(s[2]*e),0,255);return`rgb(${t},${n},${i})`}function Uh(s,e,t=!1){let{c:n,g:i}=ki(e,e),r=ln(11),o=ln(12),a=g=>(g+Rn)/(Rn*2)*e,l=e/(Rn*2),c=(g,p)=>t?.15+.85*gi(4.5,7,Math.hypot(g,p)):1,h=g=>g/e*Rn*2-Rn;i.fillStyle="#9b7c59",i.fillRect(0,0,e,e);for(let g=0;g<2600;g++){let p=r()*e,m=r()*e,x=(2+r()*16)*(e/1024),y=c(h(p),h(m));i.fillStyle=r()<.5?`rgba(70,48,28,${(.04+r()*.07)*y})`:`rgba(206,170,128,${(.04+r()*.07)*y})`,i.beginPath(),i.arc(p,m,x,0,Math.PI*2),i.fill()}let u=1.9,d=[166,140,108];for(let g=-Rn;g<Rn;g+=u)for(let p=-Rn;p<Rn;p+=u){let m=g+u/2+(r()-.5)*u*.5,x=p+u/2+(r()-.5)*u*.5;if(Ht({x:m,z:x},s.poly)<.2)continue;let y=Math.hypot(m,x)/s.radius,E=6+Math.floor(r()*2),T=u*(.42+r()*.1),P=r()*Math.PI;i.beginPath();for(let S=0;S<E;S++){let w=P+S/E*Math.PI*2+(r()-.5)*.35,R=T*(.85+r()*.3),D=a(m+Math.cos(w)*R),I=a(x+Math.sin(w)*R);S===0?i.moveTo(D,I):i.lineTo(D,I)}i.closePath(),i.fillStyle=Ro(d,.88+r()*.22+(1-y)*-.03);let C=c(m,x);i.globalAlpha=(.42+y*.4)*C,i.fill(),i.globalAlpha=.5*C,i.strokeStyle="rgba(62,44,28,0.75)",i.lineWidth=2.2*(e/1024),i.stroke(),i.globalAlpha=1}for(let g=0;g<160;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius;if(Ht({x:p,z:m},s.poly)<.6)continue;let x=(.08+r()*.16)*l,y=x*(.6+r()*.3),E=r()*3,T=Ro([150,142,130],.8+r()*.4),P=r()*3;t&&Math.hypot(p,m)<6&&o()<.9||(i.fillStyle="rgba(40,28,18,0.35)",i.beginPath(),i.ellipse(a(p)+x*.25,a(m)+y*.45,x,y,E,0,Math.PI*2),i.fill(),i.fillStyle=T,i.beginPath(),i.ellipse(a(p),a(m),x,y,P,0,Math.PI*2),i.fill())}let f=[96,116,52],v=(g,p,m)=>{let x=5+Math.floor(r()*6);for(let y=0;y<x;y++){let E=(r()-.5)*m*2,T=(r()-.5)*m*2,P=(.07+r()*.2)*l;i.fillStyle=Ro(f,.7+r()*.45),i.globalAlpha=.55+r()*.3,i.beginPath(),i.arc(a(g+E),a(p+T),P,0,Math.PI*2),i.fill()}i.globalAlpha=1};for(let g=0;g<2600;g++){let p=(r()*2-1)*s.radius*1.1,m=(r()*2-1)*s.radius*1.1,x=Ht({x:p,z:m},s.poly);if(x<0)continue;let y=x<2.6?Math.pow(1-x/2.6,1.4):.015;r()<y*.5&&v(p,m,.4)}for(let g of s.rocks){for(let p=0;p<22;p++){let m=r()*Math.PI*2,x=g.r*(.7+r()*.9);v(g.pos.x+Math.cos(m)*x,g.pos.z+Math.sin(m)*x,.35)}i.fillStyle="rgba(30,22,14,0.28)",i.beginPath(),i.arc(a(g.pos.x),a(g.pos.z),g.r*1.15*l,0,Math.PI*2),i.fill()}for(let g=0;g<70;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius,x=Ht({x:p,z:m},s.poly);x<.4||x>3.2||(i.fillStyle="#f4f1e6",i.beginPath(),i.arc(a(p),a(m),.06*l,0,Math.PI*2),i.fill(),i.fillStyle="#e8c85a",i.beginPath(),i.arc(a(p),a(m),.025*l,0,Math.PI*2),i.fill())}i.save(),i.beginPath(),s.poly.forEach((g,p)=>p===0?i.moveTo(a(g.x),a(g.z)):i.lineTo(a(g.x),a(g.z))),i.closePath(),i.clip(),i.lineJoin="round";for(let[g,p]of[[1.4,.05],[1,.06],[.65,.08],[.35,.1]])i.strokeStyle=`rgba(34,24,14,${p})`,i.lineWidth=g*2*l,i.stroke();i.restore();let _=Fi(n);return _.anisotropy=8,_}function pf(){let{c:e,g:t}=ki(256,256),n=ln(23);t.fillStyle="#c2bbb0",t.fillRect(0,0,256,256);for(let i=0;i<900;i++){let r=n()*256,o=n()*256,a=2+n()*14;t.fillStyle=n()<.5?`rgba(40,36,34,${.04+n()*.1})`:`rgba(210,200,185,${.03+n()*.08})`;for(let l of[-256,0,256])t.beginPath(),t.arc(r+l,o,a,0,Math.PI*2),t.fill()}for(let i=0;i<26;i++){let r=n()*256;t.strokeStyle=`rgba(30,26,24,${.16+n()*.2})`,t.lineWidth=1+n()*2,t.beginPath();let o=r;t.moveTo(o,0);for(let a=0;a<=256;a+=16)o+=(n()-.5)*5,t.lineTo(o,a);t.stroke()}return Fi(e,{repeat:!0})}function mf(){let{c:e,g:t}=ki(512,512),n=ln(31);for(let i=0;i<70;i++){let r=n()*512,o=n()*512,a=30+n()*90;for(let l of[-512,0,512])for(let c of[-512,0,512]){let h=t.createRadialGradient(r+l,o+c,0,r+l,o+c,a);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=h,t.fillRect(r+l-a,o+c-a,a*2,a*2)}}return Fi(e,{repeat:!0})}function gf(){let{c:e,g:t}=ki(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),Fi(e)}function vf(){let{c:t,g:n}=ki(256,64),i=n.createLinearGradient(0,0,256,0);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.65,"rgba(255,255,255,0.35)"),i.addColorStop(1,"rgba(255,255,255,1)");for(let o=0;o<64;o++){let a=Math.abs((o+.5)/64-.5)*2,l=Math.pow(1-a,1.6);n.globalAlpha=l,n.fillStyle=i,n.fillRect(0,o,256,1)}n.globalAlpha=1;let r=n.createLinearGradient(0,0,256,0);return r.addColorStop(.5,"rgba(255,255,255,0)"),r.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=r,n.fillRect(0,64/2-4,256,8),Fi(t)}function xf(){let{c:t,g:n}=ki(256,64),i=n.createLinearGradient(0,0,256,0);return i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.8,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=i,n.globalAlpha=.28,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.82,64/2-14),n.lineTo(256*.82,64/2+14),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle=i,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.84,64/2-4),n.lineTo(256*.84,64/2+4),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(254,64/2),n.lineTo(256*.78,64/2-22),n.lineTo(256*.83,64/2),n.lineTo(256*.78,64/2+22),n.closePath(),n.fill(),n.globalAlpha=.5,n.fillRect(256*.55,64/2-1.5,256*.3,3),Fi(t)}function yf(s,e){let{c:t,g:n}=ki(e,e),i=ln(41),r=Rn,o=u=>(u+r)/(r*2)*e,a=e/(r*2);n.fillStyle="#e2d2b2",n.fillRect(0,0,e,e);for(let u=0;u<90;u++){let d=i()*e,f=i()*e,v=(40+i()*120)*(e/1024),_=n.createRadialGradient(d,f,0,d,f,v);_.addColorStop(0,i()<.5?"rgba(232,220,196,0.22)":"rgba(196,180,152,0.18)"),_.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=_,n.fillRect(d-v,f-v,v*2,v*2)}let l=Math.max(1.5,2.2*(e/1024)),c=-r;for(;c<r;){let u=1.6+i()*1,d=-r-i()*2;for(;d<r;){let f=1.8+i()*1.4,v=()=>(i()-.5)*.08,_=[[d+v(),c+v()],[d+f+v(),c+v()],[d+f+v(),c+u+v()],[d+v(),c+u+v()]],g=.93+i()*.11;if(n.beginPath(),_.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.fillStyle=Ro([236,221,192],g),n.fill(),n.strokeStyle="rgba(255,248,232,0.35)",n.lineWidth=l*.8,n.beginPath(),n.moveTo(o(_[3][0]),o(_[3][1])),n.lineTo(o(_[0][0]),o(_[0][1])),n.lineTo(o(_[1][0]),o(_[1][1])),n.stroke(),n.strokeStyle="rgba(122,104,80,0.6)",n.lineWidth=l,n.beginPath(),_.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.stroke(),i()<.35){n.strokeStyle="rgba(110,94,72,0.45)",n.lineWidth=l*.55;let p=d+f*(.2+i()*.6),m=c+u*(.1+i()*.2);n.beginPath(),n.moveTo(o(p),o(m));for(let x=0;x<4;x++)p+=(i()-.5)*.5,m+=u*.2,n.lineTo(o(p),o(m));n.stroke()}if(i()<.2){let p=d+(i()<.5?0:f),m=c+(i()<.5?0:u),x=.18+i()*.2;n.fillStyle="rgba(150,132,104,0.45)",n.beginPath(),n.moveTo(o(p),o(m)),n.lineTo(o(p+(p===d?x:-x)),o(m)),n.lineTo(o(p),o(m+(m===c?x:-x))),n.closePath(),n.fill()}d+=f}c+=u}for(let u=0;u<1800;u++){let d=(i()*2-1)*s.radius*1.1,f=(i()*2-1)*s.radius*1.1,v=Ht({x:d,z:f},s.poly);if(v<0||v>1.3||i()>Math.pow(1-v/1.3,1.5)*.7)continue;let _=(.06+i()*.16)*a;n.fillStyle=Ro([112,126,70],.75+i()*.4),n.globalAlpha=.6+i()*.3,n.beginPath(),n.arc(o(d),o(f),_,0,Math.PI*2),n.fill(),n.globalAlpha=1,i()<.12&&(n.fillStyle="#e8c44a",n.beginPath(),n.arc(o(d+.1),o(f),.05*a,0,Math.PI*2),n.fill())}for(let u of s.rocks)n.fillStyle="rgba(80,66,48,0.18)",n.beginPath(),n.arc(o(u.pos.x),o(u.pos.z),u.r*1.12*a,0,Math.PI*2),n.fill();n.save(),n.beginPath(),s.poly.forEach((u,d)=>d===0?n.moveTo(o(u.x),o(u.z)):n.lineTo(o(u.x),o(u.z))),n.closePath(),n.clip(),n.lineJoin="round";for(let[u,d]of[[.9,.05],[.5,.07],[.22,.09]])n.strokeStyle=`rgba(70,56,40,${d})`,n.lineWidth=u*2*a,n.stroke();n.restore();let h=Fi(t);return h.anisotropy=8,h}function _f(){let{c:e,g:t}=ki(256,256),n=ln(43);t.fillStyle="#e9e1d0",t.fillRect(0,0,256,256);for(let i=0;i<18;i++){t.strokeStyle=`rgba(140,128,112,${.12+n()*.18})`,t.lineWidth=.8+n()*1.6;let r=n()*256,o=0;for(t.beginPath(),t.moveTo(r,o);o<256;)r+=(n()-.5)*18,o+=10+n()*20,t.lineTo(r,o);t.stroke()}for(let i=0;i<400;i++)t.fillStyle=`rgba(${n()<.5?"120,110,96":"255,250,240"},${.03+n()*.05})`,t.beginPath(),t.arc(n()*256,n()*256,2+n()*8,0,Math.PI*2),t.fill();return Fi(e,{repeat:!0})}var bf=typeof location<"u"?new URLSearchParams(location.search):new URLSearchParams,Nh=bf.get("art"),at={myth:Nh==="myth",near:bf.get("cam")==="near"};function Oh(s){return Nh==="myth"?!0:Nh==="base"?!1:s==="v4"}var Mf=()=>at.myth?2829386:6984904,Ux=40,Nx=110,Sf=-18;function Ox(){let s=ln(77),e=[],t=[[-21.2,-10.2,-3,7,1.6],[-17.9,-10.4,-5,6,1.3],[-24.2,-8.8,-8,3.5,1.4],[23.6,-12.5,-6,4.5,1.5],[21.5,-13.5,-9,4,1.1]];for(let[r,o,a,l,c]of t)e.push({x:r,z:o,top:a,len:l,w:c,capH:.25+s()*.15,haze:.14,tier:0});for(let r=0;r<14;r++){let o=r%2===0?-1:1;e.push({x:o*(28+s()*8),z:-26+s()*14,top:-9-s()*5,len:0,w:1.6+s()*1.4,capH:.3+s()*.2,haze:.5,tier:1})}for(let r=0;r<16;r++){let o,a,l,c=2.6+s()*3;if(r<10)o=(r%2===0?-1:1)*(36+s()*14),a=-36+s()*20,l=-12-s()*4,c=2+s()*1.6;else{let h=Math.PI*(1.2+s()*.6),u=55+s()*20;o=Math.cos(h)*u,a=Math.sin(h)*u,l=-7+s()*15}e.push({x:o,z:a,top:l,len:0,w:c,capH:.4+s()*.3,haze:.66,tier:2})}let n=[],i=[[-27.9,-21.3,-9,1.6],[-31.1,-16.8,-13,1.3],[27.5,-20.7,-9,1.5],[32.2,-17.9,-13,1.2],[-36,-28,-10,2],[37,-30,-11,1.9]];for(let[r,o,a,l]of i)n.push({x:r,z:o,y:a,s:l,haze:.5});return{pillars:e,islets:n}}var wf=Ox(),Zl=new et,Ui=(s,e,t)=>(Zl.setRGB(s,e,t,qt),[Zl.r,Zl.g,Zl.b]);function Ql(s,e){let t=e.x-s.x,n=e.z-s.z,i=Math.hypot(t,n)||1;return{x:n/i,z:-t/i}}function Ef(s){let e=s.length;return s.map((t,n)=>{let i=Ql(s[(n+e-1)%e],s[n]),r=Ql(s[n],s[(n+1)%e]),o=i.x+r.x,a=i.z+r.z,l=Math.hypot(o,a)||1;return{x:o/l,z:a/l}})}var Co=class{constructor(){this.pos=[];this.col=[];this.uv=[]}tri(e,t,n,i,r,o,a,l,c){this.pos.push(...e,...t,...n),this.col.push(...i,...r,...o),this.uv.push(...a,...l,...c)}quad(e,t,n){this.tri(e[0],e[1],e[2],t[0],t[1],t[2],n[0],n[1],n[2]),this.tri(e[0],e[2],e[3],t[0],t[2],t[3],n[0],n[2],n[3])}build(){let e=new en;return e.setAttribute("position",new mt(this.pos,3)),e.setAttribute("color",new mt(this.col,3)),e.setAttribute("uv",new mt(this.uv,2)),e.computeVertexNormals(),e}};function Bx(s){let e=new ir(s.poly.map(r=>new Te(r.x,-r.z))),t=new go(e,1);t.rotateX(-Math.PI/2);let n=t.getAttribute("position"),i=t.getAttribute("uv");for(let r=0;r<n.count;r++)i.setXY(r,(n.getX(r)+Rn)/(Rn*2),1-(n.getZ(r)+Rn)/(Rn*2));return t.computeVertexNormals(),t}function zx(s,e=!1){let t=ln(5),n=s.poly,i=n.length,r=new Co,o=e?[.45,.41,.4]:[.74,.71,.67],a=e?[.5,.55,.32]:[.43,.52,.24],l=e?[.1,.09,.17]:[.28,.3,.36],c=e?.3:1,h=[{yTop:0,yBot:-5,sTop:1,sBot:.975},{yTop:-5,yBot:-13,sTop:.975,sBot:.58}],u=0,d=[];for(let g=0;g<i;g++)d.push(u),u+=Math.hypot(n[(g+1)%i].x-n[g].x,n[(g+1)%i].z-n[g].z);let f=[];h.forEach((g,p)=>{let m=[],x=[],y=[],E=[],T=[];for(let P=0;P<i;){let C=2+Math.floor(t()*2),S=.15+t()*.6,w=(g.yBot-g.yTop)*(p===0?1:.75+t()*.3),R=g.sBot*(.94+t()*.08),D=.8+t()*.32;for(let I=0;I<C&&P<i;I++,P++)x.push(S),y.push(w),E.push(R),T.push(D*(.97+t()*.06))}for(let P=0;P<i;P++){let C=n[P],S=n[(P+1)%i],w=Ql(C,S),R=p===0?x[P]:f[P]-.05-t()*.4;p===0&&f.push(R);let D=g.yTop+y[P],I=E[P],O=p===0?0:R,W=[C.x*g.sTop+w.x*O,g.yTop,C.z*g.sTop+w.z*O],$=[S.x*g.sTop+w.x*O,g.yTop,S.z*g.sTop+w.z*O],Z=[S.x*I+w.x*R,D,S.z*I+w.z*R],q=[C.x*I+w.x*R,D,C.z*I+w.z*R];m.push([W,$,Z,q]);let oe=T[P],ue=t()*.06,Me=[o[0]*oe+ue,o[1]*oe,o[2]*oe-ue*.5],Ce=(p===0?.25+t()*.4:.06*t())*c,qe=Me.map((re,Ge)=>_n(re,a[Ge],Ce)),Ye=Me.map((re,Ge)=>_n(re*(p===0?.85:.7),l[Ge],e?p===0?.35:.85:p===0?.1:.45)),He=Math.hypot(S.x-C.x,S.z-C.z),ee=d[P]/3.2,Y=ee+He/3.2,he=-g.yTop/3.2,De=-D/3.2;r.quad([W,$,Z,q],[Ui(qe[0],qe[1],qe[2]),Ui(qe[0],qe[1],qe[2]),Ui(Ye[0],Ye[1],Ye[2]),Ui(Ye[0],Ye[1],Ye[2])],[[ee,he],[Y,he],[Y,De],[ee,De]])}for(let P=0;P<i;P++){let C=m[P],S=m[(P+1)%i],w=Ui(o[0]*.7,o[1]*.7,o[2]*.7),R=Ui(l[0],l[1],l[2]);r.quad([C[1],S[0],S[3],C[2]],[w,w,R,R],[[0,0],[.3,0],[.3,1],[0,1]])}});let v=n.map(g=>[g.x*.58,-12,g.z*.58]),_=Ui(.2,.22,.28);for(let g=0;g<i;g++){let p=v[g],m=v[(g+1)%i];r.tri(p,m,[0,-17,0],_,_,_,[0,0],[0,0],[0,0])}return r.build()}function Hx(s,e=!1){let t=ln(9),n=s.poly,i=n.length,r=Ef(n),o=new Co,a=e?[1,.97,.9]:[.84,.8,.72],l=[.45,.56,.25],c=[];for(let h=0;h<i;h++){let u=.28+t()*.6,d=.03+t()*.09,f=(p,m)=>[n[h].x-r[h].x*p,m,n[h].z-r[h].z*p],v=Mt(.5+.5*Math.sin(h*.61+1.7)*Math.cos(h*.23)+(t()-.5)*.5,0,1),_=.9+t()*.16,g=a.map((p,m)=>_n(p*_,l[m],v*(e?.2:.75)));c.push({inner:f(u,.012),crest:f(u*.42,d),outer:f(0,0),c:g})}for(let h=0;h<i;h++){let u=c[h],d=c[(h+1)%i],f=(v,_)=>Ui(v[0]*_,v[1]*_,v[2]*_);o.quad([u.inner,d.inner,d.crest,u.crest],[f(u.c,.95),f(d.c,.95),f(d.c,1.06),f(u.c,1.06)],[[0,0],[0,0],[0,0],[0,0]]),o.quad([u.crest,d.crest,d.outer,u.outer],[f(u.c,1.06),f(d.c,1.06),f(d.c,.88),f(u.c,.88)],[[0,0],[0,0],[0,0],[0,0]])}return o.build()}var Vx=()=>at.myth?"mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), smoothstep(-30.0, 20.0, vHazeZ))":"mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), smoothstep(-30.0, 20.0, vHazeZ))";function Jl(s,e,t,n,i,r=!1){s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <project_vertex>",`#include <project_vertex>
  vec4 hazeW = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
  vHazeZ = hazeW.z;
  vHazeY = `+(r?"transformed.y;":"hazeW.y;")),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <fog_fragment>",["float hazeF = max(smoothstep(fogNear, fogFar, vFogDepth), smoothstep("+t.toFixed(2)+", "+n.toFixed(2)+", vHazeY) * "+i.toFixed(2)+");","gl_FragColor.rgb = mix(gl_FragColor.rgb, "+Vx()+", 1.0 - (1.0 - "+e.toFixed(2)+") * (1.0 - hazeF));"].join(`
`))};let o=at.myth;return s.customProgramCacheKey=()=>`haze${e}_${t}_${n}_${i}_${r}_${o}`,s}function jl(s){let e=ln(s),t=new mo(1,1),n=t.getAttribute("position"),i=new Map;for(let r=0;r<n.count;r++){let o=`${n.getX(r).toFixed(3)},${n.getY(r).toFixed(3)},${n.getZ(r).toFixed(3)}`,a=i.get(o);a===void 0&&(a=.8+e()*.38,i.set(o,a)),n.setXYZ(r,n.getX(r)*a,n.getY(r)*a,n.getZ(r)*a)}return t.computeVertexNormals(),t}function Gx(s){let e=ln(61),t=s.poly,n=t.length,i=new Co,r=[.97,.92,.82],o=[.16,.14,.23],a=11,l=.05,c=u=>u>-5?1-.005*-u:.975-(-u-5)/8*.395,h=(u,d,f)=>{let v=Math.min(1,-d/a),_=r.map((g,p)=>_n(g*u,o[p],Math.pow(v,1.4)*.85)*f);return Ui(_[0],_[1],_[2])};for(let u=0;u<n;){let d=e()<.55?1:2,f=t[u],v=t[(u+d)%n],_=Ql(f,v),g=Math.hypot(v.x-f.x,v.z-f.z),p=l/g,m=1-l/g,x=-.03-e()*.05,y=0;for(;x>-a;){let E=.8+e()*.7,T=Math.max(-a,x-E),P=y===0?e()*.06:.08+e()*.32+Math.min(.2,y*.02),C=.85+e()*.2,S=(O,W,$)=>{let Z=c(W),q=(f.x+(v.x-f.x)*O)*Z+_.x*$,oe=(f.z+(v.z-f.z)*O)*Z+_.z*$;return[q,W,oe]},w=x-l,R=T+l,D=[S(p,w,P),S(m,w,P),S(m,R,P),S(p,R,P)];i.quad(D,[h(C,w,1),h(C,w,1),h(C,R,1),h(C,R,1)],[[0,0],[g/3,0],[g/3,E/3],[0,E/3]]);let I=[S(p,w,0),S(m,w,0),S(m,w,P),S(p,w,P)];i.quad(I,[h(C,w,1.12),h(C,w,1.12),h(C,w,1.12),h(C,w,1.12)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([S(p,w,0),S(p,w,P),S(p,R,P),S(p,R,0)],[h(C,w,.7),h(C,w,.7),h(C,R,.7),h(C,R,.7)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([S(m,w,P),S(m,w,0),S(m,R,0),S(m,R,P)],[h(C,w,.7),h(C,w,.7),h(C,R,.7),h(C,R,.7)],[[0,0],[0,0],[0,0],[0,0]]),x=T,y++}u+=d}return i.build()}function Wx(s,e,t,n,i,r){let o=ln(500+t),a=e.r*(1.7+o()*.4),l=new kt(e.r*.9,e.r*.98,a,48,4),c=l.getAttribute("position");for(let f=0;f<c.count;f++){let v=c.getX(f),_=c.getY(f),g=c.getZ(f),p=Math.atan2(g,v);if(Math.hypot(v,g)<1e-4)continue;let x=1-.05*Math.pow(.5+.5*Math.cos(p*24),3),y=_;_>a/2-.001&&(y=_-(.5+.5*Math.sin(p*3+t))*e.r*.35-o()*e.r*.05),c.setXYZ(f,v*x,y,g*x)}l.computeVertexNormals(),l.translate(0,a/2,0),i(l);let h=i(new tn({map:n,color:15920352})),u=new Ze(l,h);u.castShadow=!0,u.receiveShadow=!0,u.position.set(e.pos.x,0,e.pos.z),u.rotation.y=o()*6,s.add(u);let d=new Ze(i(new kt(e.r*1.08,e.r*1.08,.18,32).translate(0,.09,0)),h);d.position.copy(u.position),d.receiveShadow=!0,d.castShadow=!0,s.add(d),r.push({x:e.pos.x,z:e.pos.z,mat:h,k:0})}function ec(s,e,t){let n=new Jt;s.add(n);let i=[],r=R=>(i.push(R),R);s.background=new et(Mf()),s.fog=new eo(Mf(),Ux,Nx);let o=at.myth?new or(10791124,8019008,1.3):new or(13624063,9072210,1.7);n.add(o);let a=at.myth?new ar(16765594,4):new ar(16773590,2.7);at.myth?a.position.set(-15,8,7):a.position.set(-9,17,4),a.target.position.set(0,0,0),a.castShadow=!0,a.shadow.mapSize.set(t.shadowSize,t.shadowSize);let l=a.shadow.camera;l.left=-13.5,l.right=13.5,l.top=13.5,l.bottom=-13.5,l.near=4,l.far=48,at.myth&&(l.left=-16,l.right=16,l.top=16,l.bottom=-16,l.far=60),a.shadow.bias=-4e-4,a.shadow.normalBias=.04,n.add(a,a.target);let c=r(at.myth?yf(e,t.groundTexSize):Uh(e,t.groundTexSize)),h=r(pf()),u=r(new tn({map:c})),d=null,f=r(new tn({vertexColors:!0,map:h,side:xn,emissive:at.myth?1381148:3946805})),v=r(new tn({vertexColors:!0,side:xn,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),_=new Ze(r(Bx(e)),u);_.receiveShadow=!0,n.add(_);let g=new Ze(r(zx(e,at.myth)),f);if(at.myth){let R=new Ze(r(Gx(e)),r(new tn({vertexColors:!0})));R.receiveShadow=!0,n.add(R)}n.add(g);let p=new Ze(r(Hx(e,at.myth)),v);p.receiveShadow=!0,n.add(p);{let R=ln(13),D=e.poly,I=D.length,O=Ef(D),W=70,$=r(new ni(.09,.34,5).translate(0,.17,0)),Z=r(new tn({flatShading:!0})),q=new Fn($,Z,W),oe=new Et,ue=new Xn,Me=new U,Ce=new U,qe=new et,Ye=new U(0,1,0);for(let He=0;He<W;He++){let ee=Math.floor(R()*I),Y=.15+R()*1.1;Ce.set(D[ee].x-O[ee].x*Y,.01,D[ee].z-O[ee].z*Y);let he=.55+R()*.6;Me.set(he,he*(.7+R()*.7),he),ue.setFromAxisAngle(Ye,R()*6),oe.compose(Ce,ue,Me),q.setMatrixAt(He,oe);let De=.75+R()*.5;qe.setRGB(.4*De,.55*De,.2*De,qt),q.setColorAt(He,qe)}q.receiveShadow=!0,n.add(q)}let m=[],x=new et(16767392),y=at.myth?r(_f()):null;e.rocks.forEach((R,D)=>{if(y){Wx(n,R,D,y,r,m);return}let I=ln(100+D),O=new Jt,W=r(new tn({map:h,color:14867666,flatShading:!0}));m.push({x:R.pos.x,z:R.pos.z,mat:W,k:0});let $=r(new tn({color:7311164,flatShading:!0})),Z=r(jl(200+D)),q=new Ze(Z,W);q.scale.set(R.r*1,R.r*1.05,R.r*.95),q.position.y=R.r*.62,q.rotation.y=I()*6,q.castShadow=!0,q.receiveShadow=!0,O.add(q);let oe=new Ze(Z,$);oe.scale.set(R.r*.72,R.r*.2,R.r*.7),oe.position.y=R.r*1.5,oe.rotation.y=I()*6,oe.castShadow=!0,O.add(oe);for(let ue=0;ue<4;ue++){let Me=ue/4*Math.PI*2+I(),Ce=R.r*(.85+I()*.5),qe=new Ze(r(jl(300+D*10+ue)),W),Ye=R.r*(.22+I()*.2);qe.scale.set(Ye,Ye*.8,Ye),qe.position.set(Math.cos(Me)*Ce,Ye*.45,Math.sin(Me)*Ce),qe.rotation.y=I()*6,qe.castShadow=!0,qe.receiveShadow=!0,O.add(qe)}O.position.set(R.pos.x,0,R.pos.z),n.add(O)});{let R=r(new kt(.8,1,1,6,1).translate(0,.5,0)),D=new kt(1,.7,1,6,3).translate(0,-.5,0);{let re=ln(902),Ge=D.getAttribute("position");for(let vt=0;vt<Ge.count;vt++){let F=Ge.getY(vt);if(F<-.05&&F>-.95){let ht=.82+re()*.36;Ge.setXYZ(vt,Ge.getX(vt)*ht,F,Ge.getZ(vt)*ht)}}D.computeVertexNormals()}r(D);let I=r(jl(901)),O=ln(78),W=new Et,$=new Xn,Z=new U,q=new U,oe=new U(0,1,0),ue=new et;for(let re of[0,1,2]){let Ge=wf.pillars.filter((ge,xt)=>ge.tier===re&&(!at.myth||xt%2===0)),vt=Ge[0].haze,F=r(Jl(new tn({map:h,flatShading:!0,color:at.myth?6972536:13683391}),vt,re===0?-.15:-4,re===0?-.95:-17,re===0?1:.92,re===0)),ht=r(Jl(new tn({flatShading:!0,color:at.myth?4608570:6982202}),vt,-4,-17,.92)),Pe=new Fn(re===0?D:R,F,Ge.length),ke=new Fn(I,ht,Ge.length);Ge.forEach((ge,xt)=>{if($.setFromAxisAngle(oe,O()*3),ge.len>0)q.set(ge.x,ge.top,ge.z),Z.set(ge.w,ge.len,ge.w);else{let nt=Sf-22;q.set(ge.x,nt,ge.z),Z.set(ge.w,ge.top-nt,ge.w)}W.compose(q,$,Z),Pe.setMatrixAt(xt,W);let Le=.82+O()*.3;Pe.setColorAt(xt,ue.setRGB(Le,Le*.98,Le*.95,qt)),q.set(ge.x,ge.top,ge.z),Z.set(ge.w*.92,ge.capH,ge.w*.92),W.compose(q,$,Z),ke.setMatrixAt(xt,W)}),Pe.frustumCulled=!1,ke.frustumCulled=!1,n.add(Pe,ke)}let Me=wf.islets,Ce=Me[0].haze,qe=r(jl(950)),Ye=r(new ni(1,1.9,7).rotateX(Math.PI).translate(0,-.95,0)),He=r(Jl(new tn({color:9077626,flatShading:!0}),Ce,-6,-17,.9)),ee=r(Jl(new tn({color:6982202,flatShading:!0}),Ce,-6,-17,.9)),Y=new Fn(Ye,He,Me.length),he=new Fn(qe,He,Me.length),De=new Fn(qe,ee,Me.length);Me.forEach((re,Ge)=>{$.setFromAxisAngle(oe,O()*6),q.set(re.x,re.y,re.z),Z.set(re.s,re.s*.3,re.s),W.compose(q,$,Z),he.setMatrixAt(Ge,W),q.set(re.x,re.y+re.s*.12,re.z),Z.set(re.s*.82,re.s*.16,re.s*.82),W.compose(q,$,Z),De.setMatrixAt(Ge,W),q.set(re.x,re.y-re.s*.05,re.z),Z.set(re.s*.95,re.s,re.s*.95),W.compose(q,$,Z),Y.setMatrixAt(Ge,W)});for(let re of[Y,he,De])re.frustumCulled=!1,n.add(re)}let E=r(mf());E.repeat.set(2.4,2.4);let T=[],P=new Ze(r(new Tn(400,400).rotateX(-Math.PI/2)),r(new rn({fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:at.myth?"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), t); gl_FragColor = vec4(c, 1.0); }":"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), t); gl_FragColor = vec4(c, 1.0); }"})));P.position.y=Sf,n.add(P),[[-14,.12]].forEach(([R,D])=>{let I=r(new Qt({map:E,transparent:!0,opacity:at.myth?.07:D,depthWrite:!1,color:at.myth?6973088:13229298})),O=new Ze(r(new Tn(260,260).rotateX(-Math.PI/2)),I);O.position.y=R,O.renderOrder=-5,n.add(O),T.push(O)});let C=r(gf()),S=[];{let R=ln(55);for(let D=0;D<(at.myth?0:12);D++){let I=r(new Qs({map:C,transparent:!0,opacity:.12+R()*.1,depthWrite:!1,color:14017782})),O=new no(I),W=R()*Math.PI*2,$=15+R()*28;O.position.set(Math.cos(W)*$,-7-R()*9,Math.sin(W)*$);let Z=14+R()*16;O.scale.set(Z,Z*.55,1),n.add(O),S.push(O)}}let w=0;return{hitRock(R,D){let I=m[0],O=1/0;for(let W of m){let $=(W.x-R)**2+(W.z-D)**2;$<O&&(O=$,I=W)}I&&(I.k=1)},setVariant(R){if(at.myth)return;let D=R==="v2"?d??(d=r(Uh(e,t.groundTexSize,!0))):c;u.map!==D&&(u.map=D,u.needsUpdate=!0)},update(R){w+=R;for(let D of m)D.k<=0||(D.k=Math.max(0,D.k-R/.35),D.mat.emissive.copy(x).multiplyScalar(.75*D.k*D.k));E.offset.set(w*.004,w*.002),T[T.length-1].position.x=Math.sin(w*.05)*4;for(let D=0;D<S.length;D++)S[D].position.x+=R*(.25+D%3*.12),S[D].position.x>48&&(S[D].position.x=-48)},root:n,dispose(){for(let R of i)R.dispose();n.removeFromParent()}}}var Xx=new et(16777215),qx=1.32,Yx=1.18,tc=1.55,$x=.55,nc={0:{ring:3729663,armor:15134194,trim:2854822,cloth:3126728,skin:15122330,hair:16054008,dark:2765888,glow:5894399},1:{ring:16730685,armor:10234406,trim:4855060,cloth:8003356,skin:3811880,hair:8003356,dark:2824986,glow:16734780},2:{ring:16751150,armor:12740124,trim:5911572,cloth:9062932,skin:9067068,hair:3810322,dark:3023382,glow:16754746}},Bh=16730685,Tf=2054758;function Af(s){return at.myth&&s!==0?Bh:nc[s].ring}function Rf(s){return at.myth&&s!==0?nc[1].glow:nc[s].glow}var Io=class{constructor(e,t,n="default"){this.root=new Jt;this.ground=new Jt;this.pivot=new Jt;this.rig=new Jt;this.wpn=new Jt;this.legL=new Jt;this.legR=new Jt;this.cape=null;this.tail=null;this.halo=null;this.rim={uRimK:{value:0},uRimC:{value:new et}};this.identityMat=null;this.mats=[];this.ringMats=[];this.shadowMeshes=[];this.phase=0;this.lean=0;this.side=0;this.raise=0;this.crouch=0;this.lunge=0;this.bob=0;this.castT=99;this.castSkill=null;this.dustT=0;this.wasShadow=!0;this.pulseT=0;this.prevState="idle";this.weaponParts=[];this.xrayMat=null;this.xray=[];this.xrayOn=!1;this.fromLedge=!1;this.dropReason=null;this.ledgeEdge=null;this.shieldPivot=null;this.shieldMesh=null;this.shieldRest={x:0,y:0,z:0,rz:0};this.meleeT=99;this.meleeStep=1;this._gc=null;this.variant=t,this.look=n;let i=nc[n!=="default"&&t===2?1:t];if(this.palette=i,this.rim.uRimC.value.setHex(i.ring),n!=="default"){this.buildMyth(e,n);return}let r=C=>{let S=new tn({color:C});return S.stencilWrite=!0,S.stencilRef=1,S.stencilFunc=Ks,S.stencilZPass=Gl,S.onBeforeCompile=w=>{w.uniforms.uRimK=this.rim.uRimK,w.uniforms.uRimC=this.rim.uRimC,w.fragmentShader=w.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},S.customProgramCacheKey=()=>"fighter-rim",this.mats.push(S),S},o=r(i.armor),a=r(i.trim),l=r(i.cloth),c=r(i.skin),h=r(i.hair),u=r(i.dark);this.glowMat=new Qt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let d=(C,S,w,R,D,I,O=!0)=>{let W=new Ze(S,w);return W.position.set(R,D,I),W.castShadow=O,O&&this.shadowMeshes.push(W),C.add(W),W};for(let[C,S]of[[this.legL,-.13],[this.legR,.13]])C.position.set(0,.86,S),d(C,new kt(.085,.065,.66,8),u,0,-.33,0),d(C,new Xt(.26,.12,.15),a,.05,-.74,0),this.rig.add(C);d(this.rig,new tr(.2,.36,4,10),o,0,1.2,0).scale.set(.8,1,1.25),d(this.rig,new kt(.215,.215,.09,12),a,0,.96,0).scale.set(.82,1,1.28);for(let C of[-.27,.27])d(this.rig,new An(.14,10,8),a,0,1.46,C).scale.set(.9,.7,1);if(d(this.rig,new An(.17,14,12),c,.03,1.66,0),t===0){d(this.rig,new An(.2,14,12),h,-.03,1.7,0).scale.set(1,.92,1.04);let S=d(this.rig,new ni(.1,.45,8),h,-.27,1.55,0);S.rotation.z=Math.PI/2+.5,this.tail=S,d(this.rig,new Xt(.08,.06,.26),r(2808046),.14,1.67,0,!1)}else{d(this.rig,new An(.22,14,12),l,-.03,1.69,0).scale.set(1.05,.95,1.02);let S=d(this.rig,new ni(.14,.4,8),l,-.25,1.6,0);S.rotation.z=Math.PI/2+.7,d(this.rig,new An(.12,10,8),u,.1,1.64,0,!1).scale.set(.8,1,1.15),d(this.rig,new Xt(.06,.04,.16),this.glowMat,.17,1.66,0,!1)}let v=new Jt;v.position.set(-.17,1.5,0);let _=new kt(.22,.4,.95,4,1).rotateY(Math.PI/4);d(v,_,t===0?r(2340812):l,0,-.45,0).scale.set(.12,1,1),this.rig.add(v),this.cape=v,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let p=[];for(let C of[-.26,.26]){let S=d(this.wpn,new kt(.06,.05,.44,8),o,.17,-.05,C*.7);S.rotation.z=-Math.PI/2+.25,S.rotation.x=C>0?-.35:.35,p.push(S)}if(this.glowTip=new Ze(new An(.1,10,8),this.glowMat),t===0)d(this.wpn,new Xt(.95,.13,.11),u,.62,-.08,.05),d(this.wpn,new Xt(.3,.2,.09),a,.25,-.12,.05),d(this.wpn,new kt(.05,.05,.5,8),u,1.25,-.08,.05).rotation.z=Math.PI/2,d(this.wpn,new Xt(.2,.05,.05),r(5894399),.72,0,.05,!1),this.glowTip.position.set(1.52,-.08,.05);else if(t===1){d(this.wpn,new kt(.035,.035,1.9,6),r(5913380),.65,-.07,.05).rotation.z=Math.PI/2;let C=d(this.wpn,new ni(.1,.5,4),r(2763312),1.82,-.07,.05);C.rotation.z=-Math.PI/2,d(this.wpn,new $i(.08,.025,6,10),a,1.55,-.07,.05).rotation.y=Math.PI/2,this.glowTip.position.set(2.1,-.07,.05)}else d(this.wpn,new kt(.045,.045,1.4,6),r(4862496),.5,-.07,.05).rotation.z=Math.PI/2,d(this.wpn,new Xt(.38,.34,.5),r(3747882),1.25,-.07,.05),d(this.wpn,new Xt(.42,.1,.54),o,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);this.wpn.add(this.glowTip);for(let C of this.wpn.children)p.includes(C)||this.weaponParts.push(C);let m=new Qt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),x=new Qt({color:i.ring,transparent:!0,opacity:.2,depthWrite:!1,fog:!1});this.ringMats.push(m,x);let y=new Ze(new fi(.6,.7,40).rotateX(-Math.PI/2),m),E=new Ze(new fi(.7,.86,40).rotateX(-Math.PI/2),x);this.halo=E;let T=new en;T.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),T.setIndex([0,2,1]),T.computeVertexNormals();let P=new Ze(T,new Qt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,side:xn,fog:!1}));this.ringMats.push(P.material);for(let C of[y,E,P])C.renderOrder=6,this.ground.add(C);e.add(this.root,this.ground)}buildMyth(e,t){let n=this.variant===0,i=this.palette,r=n?i.ring:Bh;this.rim.uRimC.value.setHex(r);let o=I=>(I.stencilWrite=!0,I.stencilRef=1,I.stencilFunc=Ks,I.stencilZPass=Gl,I.onBeforeCompile=O=>{O.uniforms.uRimK=this.rim.uRimK,O.uniforms.uRimC=this.rim.uRimC,O.fragmentShader=O.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},I.customProgramCacheKey=()=>"fighter-rim",this.mats.push(I),I),a=I=>o(new tn({color:I})),l=(I,O,W)=>o(new Ki({color:I,metalness:O,roughness:W})),c=n?l(13144383,.85,.32):l(4935512,.75,.45),h=n?l(8411178,.8,.45):l(2829619,.7,.55),u=new Qt({color:n?1696754:16720916,fog:!1});this.identityMat=u;let d=a(n?38068:3025968),f=a(n?14264706:7228474),v=a(n?5913894:2366487),_=a(n?Tf:13904416),g=a(n?Tf:2762281),p=a(n?8018490:3812386);this.glowMat=new Qt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let m=(I,O,W,$,Z,q,oe=!0)=>{let ue=new Ze(O,W);return ue.position.set($,Z,q),ue.castShadow=oe,oe&&this.shadowMeshes.push(ue),I.add(ue),ue};for(let[I,O]of[[this.legL,-.13],[this.legR,.13]])I.position.set(0,.86,O),m(I,new kt(.085,.07,.66,8),n?f:h,0,-.33,0),m(I,new kt(.075,.08,.3,8),c,.01,-.5,0),m(I,new Xt(.26,.12,.15),v,.05,-.74,0),this.rig.add(I);m(this.rig,new tr(.2,.36,4,10),c,0,1.2,0).scale.set(.82,1,1.25),m(this.rig,new kt(.24,.3,.28,10),d,0,.94,0).scale.set(.85,1,1.2),m(this.rig,new kt(.225,.225,.09,12),u,0,1.04,0,!1).scale.set(.84,1,1.28);for(let I of[-.27,.27])m(this.rig,new An(.14,10,8),n?u:a(13114900),0,1.46,I).scale.set(.95,.7,1);m(this.rig,new An(.16,12,10),f,.04,1.65,0),m(this.rig,new An(.2,14,12,0,Math.PI*2,0,Math.PI*.62),n?l(1489104,.5,.35):c,-.01,1.66,0).scale.set(1.05,1,1.05),m(this.rig,new Xt(.05,.14,.05),c,.19,1.64,0,!1),m(this.rig,new $i(.2,.055,6,14,Math.PI),n?_:u,-.01,1.78,0).scale.set(1.1,.9,.7);let y=new Jt;y.position.set(-.18,1.5,0),m(y,new kt(n?.24:.2,n?.46:.32,n?1.05:.7,4,1).rotateY(Math.PI/4),g,0,n?-.5:-.35,0).scale.set(.12,1,1),this.rig.add(y),this.cape=y,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let T=[];for(let I of[-.26,.26]){let O=m(this.wpn,new kt(.06,.05,.44,8),n?d:h,.17,-.05,I*.7);O.rotation.z=-Math.PI/2+.25,O.rotation.x=I>0?-.35:.35,T.push(O)}if(this.glowTip=new Ze(new An(.1,10,8),this.glowMat),t==="myth-archer"){let I=new Jt;I.name="bow",I.position.set(.5,-.02,.05);let O=m(I,new $i(.55,.03,6,20,Math.PI*.9),p,0,0,0);O.rotation.z=-Math.PI*.45,m(I,new kt(.008,.008,1.08,4),a(14209216),.55*Math.cos(Math.PI*.45),0,0,!1),m(I,new kt(.018,.018,.8,5),p,.25,0,0,!1).rotation.z=Math.PI/2,this.wpn.add(I),this.glowTip.position.set(.95,-.02,.05)}else if(this.variant===2&&t==="myth")m(this.wpn,new kt(.045,.045,1.4,6),p,.5,-.07,.05).rotation.z=Math.PI/2,m(this.wpn,new Xt(.38,.34,.5),h,1.25,-.07,.05),m(this.wpn,new Xt(.42,.1,.54),_,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);else{let I=t==="myth-shield"?1.5:2.2,O=m(this.wpn,new kt(.03,.03,I,6),p,I/2-.35,-.07,.05);O.rotation.z=Math.PI/2,O.name="spear";let W=m(this.wpn,new ni(.075,.34,4),n?c:h,I-.18,-.07,.05);W.rotation.z=-Math.PI/2,this.glowTip.position.set(I+.02,-.07,.05)}this.wpn.add(this.glowTip);for(let I of this.wpn.children)T.includes(I)||this.weaponParts.push(I);if(n||t==="myth-shield"){let I=new Jt;I.name=n?"round-shield":"tower-shield",n?(I.position.set(.3,1.18,-.2),I.rotation.z=.55,m(I,new kt(.5,.5,.05,28).rotateZ(Math.PI/2),c,0,0,0),m(I,new $i(.5,.05,6,28).rotateY(Math.PI/2),u,0,0,0,!1),m(I,new An(.1,10,8),u,.04,0,0,!1)):(I.position.set(.36,1.02,-.1),I.rotation.z=.25,m(I,new Xt(.07,1.25,.82),h,0,0,0),m(I,new Xt(.08,1.31,.06),c,0,0,.41,!1),m(I,new Xt(.08,1.31,.06),c,0,0,-.41,!1),m(I,new Xt(.085,.86,.12),_,0,0,0,!1));let O=new Jt;O.add(I),this.rig.add(O),this.shieldPivot=O,this.shieldMesh=I,this.shieldRest={x:I.position.x,y:I.position.y,z:I.position.z,rz:I.rotation.z},this.weaponParts.push(I)}let P=new Qt({color:r,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),C=new Qt({color:r,transparent:!0,opacity:.38,depthWrite:!1,fog:!1});this.ringMats.push(P,C);let S=new Ze(new fi(.55,.75,40).rotateX(-Math.PI/2),P),w=new Ze(new fi(.75,.95,40).rotateX(-Math.PI/2),C);this.halo=w;let R=new en;R.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),R.setIndex([0,2,1]),R.computeVertexNormals();let D=new Ze(R,new Qt({color:r,transparent:!0,opacity:.95,depthWrite:!1,side:xn,fog:!1}));this.ringMats.push(D.material);for(let I of[S,w,D])I.renderOrder=6,this.ground.add(I);e.add(this.root,this.ground)}buildXray(){let e=new Qt({color:this.look!=="default"&&this.variant!==0?Bh:this.palette.ring,transparent:!0,opacity:$x,depthFunc:lr,depthWrite:!1,fog:!1,stencilWrite:!0,stencilRef:1,stencilFunc:uh,stencilFail:Qn,stencilZFail:Qn,stencilZPass:Qn});this.xrayMat=e;let t=[];this.root.traverse(n=>{let i=n;i.isMesh&&!this.weaponParts.includes(i)&&t.push(i)});for(let n of t){let i=new Ze(n.geometry,e);i.visible=!1,i.renderOrder=30,n.add(i),this.xray.push(i)}}onMelee(e){this.meleeT=0,this.meleeStep=e}onLedgeDrop(e){this.fromLedge=!0,this.dropReason=e}update(e,t,n=!1){let i=this.palette,r=Math.hypot(e.moveVel.x,e.moveVel.z),o=e.state==="falling",a=e.state==="dead",l=e.state==="knocked",c=e.state==="ledge",h=e.state==="climb";c?(this.fromLedge=!0,this.dropReason=null):!o&&!l&&!a&&!h&&(this.fromLedge=!1),h&&e.stateT>=Tt.climb*.999&&(this.fromLedge=!1);let u=h?gi(0,Tt.climb,e.stateT):0;this.root.position.set(e.pos.x,e.y,e.pos.z);let d=n&&e.state==="windup"&&e.windup?Math.atan2(e.windup.dir.z,e.windup.dir.x):e.facing;this.root.rotation.y=-d,this.ground.position.set(e.pos.x,.035,e.pos.z),this.ground.rotation.y=-d,this.ground.scale.setScalar(n?e.radius/.6:Yx),this.halo&&this.halo.scale.setScalar(n?1.3:1),this.tail&&(this.tail.scale.setScalar(n?.55:1),this.tail.position.x=n?-.22:-.27),this.rim.uRimK.value=n?this.look!=="default"?this.variant===0?.5:.4:.9:0,this.castT+=t;let f=1;a&&(f=1-gi(1,1.5,e.stateT)),e.y<-16&&(f=0),this.root.visible=f>.01,this.ground.visible=!o&&!a&&e.y>-.2&&!c&&!(h&&u<.6)&&!(l&&this.fromLedge),this.root.scale.setScalar(Math.max(f,.001)*qx);let v=!o&&e.y>-.4&&!c&&!h&&!this.fromLedge;if(v!==this.wasShadow){for(let Y of this.shadowMeshes)Y.castShadow=v;this.wasShadow=v}let _=0,g=0,p=.05,m=0,x=0,y=0,E=e.windup,T=E?Mt(E.t/Math.max(E.dur,.01),0,1):0,P=this.castT<.3?this.castT/.3:1;if(e.state==="windup"&&E&&(y=n?Math.max(.45,T):T,E.skill==="enemyHeavy"?(p=_n(.05,2,gi(0,.85,T)),_=_n(0,.28,T),m=.04):E.skill==="enemyBasic"?(p=_n(.05,.35,T),x=-.16*T,_=.1*T):E.skill==="control"?(p=_n(.05,.22,T),x=-.1*T,_=.12*T,m=.05*T):(p=.3,x=-.12,_=.18)),this.castSkill&&this.castT<.45){let Y=1-P;this.castSkill==="enemyHeavy"?(p=_n(-.45,2,Y*Y),_=_n(-.35,.1,Y),x=.28*(1-Y)):(p=_n(.05,.4,Y),x=.42*(1-Y),_=_n(-.3,0,Y))}e.state==="recover"&&(_=Math.max(_,-.12)),e.state==="hitstun"&&(_=.28,p=-.35,m=.05),(e.state==="charge"||e.state==="windup"&&E?.skill==="charge")&&(_=-.55,m=.12,x=.15,p=-.2),e.state==="guard"&&(p=-.3,_=.06,m=.06);let C=e.state==="windup"&&E&&(E.skill==="melee1"||E.skill==="melee2"||E.skill==="melee3")?E.skill:null;(C==="melee1"||C==="melee2")&&(x=-.12*T,p=.05);let S=(e.breakT??0)>0;if(S&&(_=.18,p=-.5),e.state==="dash"&&(_=-.42,m=.1,x=.12,p=.2),l){let Y=Math.hypot(e.knockVel.x,e.knockVel.z)||1,he=(e.knockVel.x*Math.cos(e.facing)+e.knockVel.z*Math.sin(e.facing))/Y,De=(-e.knockVel.x*Math.sin(e.facing)+e.knockVel.z*Math.cos(e.facing))/Y,re=.62*gi(0,.08,e.stateT);_=-re*he,g=re*De,p=-.9,m=.06}let w=e.sinceShotT<.4?Math.exp(-e.sinceShotT*18):0;x-=w*.2,p+=w*.14,e.burstLeft>0&&(p=Math.max(p,.1),_=Math.max(_,.06));let R=n&&e.state==="windup"&&this.prevState!=="windup";this.prevState=e.state;let D=R?1:yr(e.state==="windup"||this.castT<.45||l?30:16,t);this.lean+=(_-this.lean)*D,this.side+=(g-this.side)*D,this.raise+=(p-this.raise)*D,this.crouch+=(m-this.crouch)*D,this.lunge+=(x-this.lunge)*D;let I=!o&&!a&&!l&&r>.15&&e.state!=="dash";I&&(this.phase+=t*(6+r*1.7));let O=I?Mt(r/5,.25,1)*.75:0,W=Math.sin(this.phase)*O,$=I?Math.abs(Math.sin(this.phase))*.05:0;this.bob+=($-this.bob)*yr(20,t);let Z=o?Math.sin(e.stateT*22)*.6:l?.55:e.state==="dash"?.9:0;if(this.legL.rotation.z=I?W:Z,this.legR.rotation.z=I?-W:-Z*(o?1:-.4),this.pivot.position.set(this.lunge,.9-this.crouch+this.bob,0),this.pivot.rotation.set(0,0,0),this.pivot.rotation.z=-this.lean,this.pivot.rotation.x=this.side,this.wpn.rotation.z=this.raise,this.wpn.position.x=.04+(w>0?-w*.12:0)+(e.state==="windup"&&E&&E.skill!=="enemyHeavy"?-.08*T:0),this.meleeT+=t,this.wpn.rotation.y=0,C==="melee3"&&(this.wpn.rotation.y=.9*T),this.meleeT<.2&&(this.meleeStep===3?this.wpn.rotation.y=_n(.9,-.9,Mt(this.meleeT/.14,0,1)):this.wpn.position.x+=.42*(1-Mt(this.meleeT/.18,0,1))),S&&(this.pivot.rotation.x+=Math.sin(this.pulseT*14)*.12,this.pivot.rotation.z+=Math.cos(this.pulseT*11)*.08),c){let Y=gi(Tt.protect,Tt.hold,e.stateT),he=e.stateT;this.pivot.position.set(-.04+Math.sin(he*38)*.025*Y,.9-tc,0),this.pivot.rotation.set(Math.sin(he*3.2)*.05,0,-.12),this.wpn.rotation.z=1.35+Math.sin(he*30)*.06*Y,this.wpn.position.x=.04,this.legL.rotation.z=.12+Math.sin(he*5)*(.1+.25*Y),this.legR.rotation.z=-.08+Math.sin(he*5+1.4)*(.1+.25*Y)}else if(h){let Y=Math.sin(u*Math.PI);this.pivot.position.set(.06*Y,.9-tc*(1-u)+Y*.22,0),this.pivot.rotation.set(0,0,-.5*Y),this.wpn.rotation.z=_n(1.35,.05,u),this.legL.rotation.z=-.9*Y,this.legR.rotation.z=-.7*Y}else if(o&&this.fromLedge)this.pivot.position.y=.9-tc,this.dropReason==="timeout"?(this.pivot.rotation.set(e.stateT*1.2,0,e.stateT*.5),this.wpn.rotation.z=1.5,this.legL.rotation.z=.2,this.legR.rotation.z=-.2):this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(l&&this.fromLedge)this.pivot.position.y=.9-tc;else if(o)this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(a){let Y=gi(0,.3,e.stateT);this.pivot.rotation.set(0,0,Y*(Math.PI/2)),this.pivot.position.y=.9-Y*.6,this.legL.rotation.z=Y*.3,this.legR.rotation.z=Y*-.2,this.wpn.rotation.z=-.4*Y}if(this.shieldPivot&&this.shieldMesh){let Y=e.shieldDir,he=e.state==="guard"&&e.shieldUp!==!1,De=Y?Math.atan2(Y.z,Y.x)-d:0,re=this.shieldMesh;this.shieldPivot.rotation.y=Y&&(he||this.look==="myth-shield")?-De:0,he?(re.position.set(.58,1.25,0),re.rotation.z=.3):S?(re.position.set(this.shieldRest.x+.12,.5,this.shieldRest.z-.12),re.rotation.z=-1):e.state==="charge"&&this.variant===0?(re.position.set(.42,1.15,0),re.rotation.z=.2):(re.position.set(this.shieldRest.x,this.shieldRest.y,this.shieldRest.z),re.rotation.z=this.shieldRest.rz)}let q=c||h&&u<.8||this.fromLedge;for(let Y of this.weaponParts)Y.visible=!q;let oe=c||h;if(oe&&!this.xrayMat&&this.buildXray(),oe!==this.xrayOn){for(let Y of this.xray)Y.visible=oe;this.xrayOn=oe}if(this.cape){let Y=Math.sin(this.phase*.9+1.3)*.06*Mt(r/5,0,1);this.cape.rotation.z=-(.12+Mt(r/6,0,1)*.42+(e.state==="dash"?.45:0)+Y+(o?.7:0)),this.cape.rotation.x=Math.sin(this.phase*.5)*.04,c&&(this.cape.rotation.z=-.05,this.cape.rotation.x=Math.sin(e.stateT*3.2)*.06)}let ue=Mt(e.hitFlashT*10,0,1),Me=y*.2,Ce=this.glowColor(i.glow),qe=c&&e.stateT<Tt.protect?.22*(1-gi(Tt.protect*.7,Tt.protect,e.stateT)):(e.protectT??0)>0?.3:0,Ye=(e.armorT??0)>0?.22+.12*Math.sin(this.pulseT*20):0;for(let Y of this.mats)Y.emissive.setRGB(ue*.95+Ce[0]*Me+qe+Ye,ue*.95+Ce[1]*Me+qe*.9+Ye*.35,ue*.95+Ce[2]*Me+qe*.6+Ye*.1);let He=Mt(y+w*1.2+(this.castT<.25?.8:0),0,1);this.glowMat.opacity=.35+He*.65,this.glowTip.scale.setScalar(.7+He*1.5),this.glowMat.color.setHex(i.glow).lerp(Xx,He*.5),this.pulseT+=t;let ee=e.state==="windup"?.7+.3*Math.sin(this.pulseT*30):1;if(this.ringMats[0].opacity=.95*ee,e.state==="reviving")this.root.visible=!1,this.ground.visible=!1;else if((e.protectT??0)>0&&this.root.visible){let Y=Math.floor(this.pulseT*12)%2===0;this.root.visible=Y}}glowColor(e){if(!this._gc){let t=new et(e);this._gc=[t.r,t.g,t.b]}return this._gc}wantDust(e,t){return e.state!=="knocked"?(this.dustT=0,!1):(this.dustT-=t,this.dustT<=0?(this.dustT=.045,!0):!1)}tipWorld(e){return this.root.updateMatrixWorld(!0),this.glowTip.getWorldPosition(e)}dispose(){for(let e of[this.root,this.ground])e.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose()});for(let e of this.mats)e.dispose();this.glowMat.dispose(),this.xrayMat?.dispose(),this.identityMat?.dispose();for(let e of this.ringMats)e.dispose();this.root.removeFromParent(),this.ground.removeFromParent()}};var Kx=`
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
}`,Zx=`
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
}`,Po=class{constructor(e,t){this.n=0;this.cap=e,this.p=new Float32Array(e*3),this.v=new Float32Array(e*3),this.s=new Float32Array(e*4),this.c=new Float32Array(e*4),this.l=new Float32Array(e*4),this.fl=new Uint8Array(e);let n=new Tn(1,1);this.geo=new _o,this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.geo.setAttribute("uv",n.getAttribute("uv")),this.aPosSize=new Pi(new Float32Array(e*4),4),this.aColor=new Pi(new Float32Array(e*4),4),this.aShape=new Pi(new Float32Array(e*2),2);for(let i of[this.aPosSize,this.aColor,this.aShape])i.setUsage(Wl);this.geo.setAttribute("aPosSize",this.aPosSize),this.geo.setAttribute("aColor",this.aColor),this.geo.setAttribute("aShape",this.aShape),this.geo.instanceCount=0,this.mat=new rn({vertexShader:Kx,fragmentShader:Zx,transparent:!0,depthWrite:!1,blending:t?ji:Ri,fog:!1}),this.mesh=new Ze(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:15}get count(){return this.n}spawn(e){if(this.n>=this.cap)return;let t=this.n++;this.p[t*3]=e.x,this.p[t*3+1]=e.y,this.p[t*3+2]=e.z,this.v[t*3]=e.vx??0,this.v[t*3+1]=e.vy??0,this.v[t*3+2]=e.vz??0,this.s[t*4]=e.size,this.s[t*4+1]=e.size1??e.size,this.s[t*4+2]=e.aspect??1,this.s[t*4+3]=e.crisp??0,this.c[t*4]=e.color[0],this.c[t*4+1]=e.color[1],this.c[t*4+2]=e.color[2],this.c[t*4+3]=e.alpha??1,this.l[t*4]=0,this.l[t*4+1]=e.life,this.l[t*4+2]=e.gravity??0,this.l[t*4+3]=e.drag??0,this.fl[t]=e.floor===!1?0:1}update(e){let t=0;for(;t<this.n;){let o=t*4,a=t*3;if(this.l[o]+=e,this.l[o]>=this.l[o+1]){this.remove(t);continue}let l=Math.exp(-this.l[o+3]*e);this.v[a]*=l,this.v[a+1]=this.v[a+1]*l-this.l[o+2]*e,this.v[a+2]*=l,this.p[a]+=this.v[a]*e,this.p[a+1]+=this.v[a+1]*e,this.p[a+2]+=this.v[a+2]*e,this.fl[t]&&this.p[a+1]<.03&&this.l[o+2]>0&&this.p[a+1]>-1&&(this.p[a+1]=.03,this.v[a+1]*=-.25,this.v[a]*=.6,this.v[a+2]*=.6),t++}let n=this.aPosSize.array,i=this.aColor.array,r=this.aShape.array;for(let o=0;o<this.n;o++){let a=this.l[o*4]/this.l[o*4+1];n[o*4]=this.p[o*3],n[o*4+1]=this.p[o*3+1],n[o*4+2]=this.p[o*3+2],n[o*4+3]=this.s[o*4]+(this.s[o*4+1]-this.s[o*4])*a,i[o*4]=this.c[o*4],i[o*4+1]=this.c[o*4+1],i[o*4+2]=this.c[o*4+2];let l=1-a;i[o*4+3]=this.c[o*4+3]*l*(a<.08?a/.08+.2:1),r[o*2]=this.s[o*4+2],r[o*2+1]=this.s[o*4+3]}this.aPosSize.needsUpdate=!0,this.aColor.needsUpdate=!0,this.aShape.needsUpdate=!0,this.geo.instanceCount=this.n}clear(){this.n=0,this.geo.instanceCount=0}remove(e){let t=--this.n;e!==t&&(this.p.copyWithin(e*3,t*3,t*3+3),this.v.copyWithin(e*3,t*3,t*3+3),this.s.copyWithin(e*4,t*4,t*4+4),this.c.copyWithin(e*4,t*4,t*4+4),this.l.copyWithin(e*4,t*4,t*4+4),this.fl[e]=this.fl[t])}dispose(){this.geo.dispose(),this.mat.dispose()}},Lo=class{constructor(e,t){this.n=0;this.m=new Et;this.col=new et;this.X=new U;this.Y=new U;this.Z=new U;this.P=new U;this.view=new U(0,-1,-1).normalize();this.cap=e;let n=new Qt({map:t,transparent:!0,depthWrite:!1,blending:ji,fog:!1});this.mesh=new Fn(new Tn(1,1),n,e),this.mesh.instanceMatrix.setUsage(Wl),this.mesh.frustumCulled=!1,this.mesh.renderOrder=22,this.mesh.count=0,this.mesh.setColorAt(0,this.col.setRGB(1,1,1))}begin(){this.n=0}push(e,t,n,i,r,o){if(this.n>=this.cap||o<=.003)return;this.X.copy(t).normalize(),this.Y.crossVectors(this.X,this.view),this.Y.lengthSq()<1e-6&&this.Y.set(0,1,0),this.Y.normalize(),this.Z.crossVectors(this.X,this.Y).normalize(),this.P.copy(e).addScaledVector(this.X,-n/2),this.m.makeBasis(this.X.multiplyScalar(n),this.Y.multiplyScalar(i),this.Z),this.m.setPosition(this.P),this.mesh.setMatrixAt(this.n,this.m),this.col.setRGB(r[0],r[1],r[2],qt).multiplyScalar(o);let a=this.mesh.instanceColor.array;a[this.n*3]=this.col.r,a[this.n*3+1]=this.col.g,a[this.n*3+2]=this.col.b,this.n++}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};var Hh=.05,Cf=`
varying vec2 vP;
void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Jx=`
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
}`,jx=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Qx=`
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
}`,ey=`
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
}`,ic=class{constructor(e,t){this.items=[];this.used=0;let n=new Tn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new U(1,0,0)},uHalf:{value:.8},uProgress:{value:1},uAlpha:{value:1},uTime:{value:0},uBase:{value:.16},uEdge:{value:0}},o=new rn({vertexShader:Cf,fragmentShader:Jx,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=.16,h=0){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e,Hh,t),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,i),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uHalf.value=r,u.u.uProgress.value=o,u.u.uAlpha.value=l,u.u.uBase.value=c,u.u.uEdge.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},zh=class{constructor(e,t){this.items=[];this.used=0;let n=new Tn(1,1).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new U(1,0,0)},uAlpha:{value:1},uFill:{value:1},uSoft:{value:1},uBase:{value:.2}},o=new rn({vertexShader:jx,fragmentShader:Qx,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=1,h=.2){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e+Math.cos(n)*i*.5,Hh,t+Math.sin(n)*i*.5),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,r),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uFill.value=o,u.u.uAlpha.value=l,u.u.uSoft.value=c,u.u.uBase.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},sc=class{constructor(e,t){this.items=[];this.used=0;let n=new Tn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new U(1,0,0)},uProgress:{value:0},uAlpha:{value:1}},o=new rn({vertexShader:Cf,fragmentShader:ey,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ze(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o){if(this.used>=this.items.length)return;let a=this.items[this.used++];a.mesh.visible=!0,a.mesh.position.set(e,Hh,t),a.mesh.scale.set(n,1,n),a.u.uColor.value.set(r[0],r[1],r[2]),a.u.uProgress.value=i,a.u.uAlpha.value=o}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},rc=class{constructor(e){this.sectors=new ic(e,5),this.flashes=new ic(e,4),this.strips=new zh(e,8)}};var If=2*Math.PI*15,ty="#ffe6a3",Pf="render-overlay-style",oc=class{constructor(e){this.root=e;this.bars=new Map;this.arrows=new Map;this.ledgeRings=new Map;this.breakMarks=new Map;this.clock=0;this.nums=[];this.w=852;this.h=393;if(e.style.pointerEvents="none",e.style.overflow="hidden",!document.getElementById(Pf)){let t=document.createElement("style");t.id=Pf,t.textContent=`
        .ro-abs{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
        .ro-bar{background:rgba(6,12,20,.78);border:1px solid rgba(0,0,0,.55);border-radius:3px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.45)}
        .ro-bar>div{position:absolute;left:0;top:0;bottom:0;display:block;transform-origin:0 50%}
        .ro-num{font:800 16px/1 "Segoe UI",system-ui,-apple-system,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.5);white-space:nowrap}
        .ro-arrow{width:0;height:0}
        .ro-ledge{width:0;height:0}
        .ro-ledge>svg{position:absolute;overflow:visible;filter:drop-shadow(0 0 2px rgba(0,0,0,.85))}
        .ro-arrow>i{position:absolute;left:-13px;top:-11px;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:20px solid #ff4a3d;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}
      `,document.head.appendChild(t)}for(let t=0;t<18;t++){let n=document.createElement("div");n.className="ro-abs ro-num",n.style.opacity="0",e.appendChild(n),this.nums.push({el:n,x:0,z:0,y:0,age:0,life:.8,active:!1,drift:0,ox:0,oy:0,rise:46})}}resize(e,t){this.w=e,this.h=t}spawnNumber(e,t,n,i,r,o){let a=this.nums.find(l=>!l.active)??this.nums.reduce((l,c)=>l.age>c.age?l:c);a.active=!0,a.age=0,a.life=.85,a.x=e.x,a.z=e.z,a.y=t,o?(a.drift=0,a.ox=o.x,a.oy=o.y,a.rise=14):(a.ox=0,a.oy=0,a.rise=46,a.drift=(Math.random()-.5)*22),a.el.textContent=n,a.el.style.color=Fh(i),a.el.style.fontSize=`${Math.round(r)}px`}makeBar(e){let t=document.createElement("div");t.className="ro-abs ro-bar";let n=document.createElement("div"),i=document.createElement("div");return n.style.background="#fff",n.style.opacity="0.85",i.style.background=e==="player"?"linear-gradient(#7ff6ff,#27c6dc)":"linear-gradient(#ff6a5c,#d12c26)",t.appendChild(n),t.appendChild(i),this.root.appendChild(t),{el:t,fill:i,lag:n,lagV:1,team:e}}makeArrow(){let e=document.createElement("div");return e.className="ro-abs ro-arrow",e.appendChild(document.createElement("i")),this.root.appendChild(e),e}makeLedgeRing(){let e=document.createElement("div");e.className="ro-abs ro-ledge";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-20 -20 40 40");let i=document.createElementNS(t,"circle"),r=document.createElementNS(t,"circle");for(let o of[i,r])o.setAttribute("r","15"),o.setAttribute("fill","none");return i.setAttribute("stroke","rgba(0,0,0,0.45)"),i.setAttribute("stroke-width","6"),r.setAttribute("stroke-width","4"),r.setAttribute("stroke-linecap","round"),r.setAttribute("transform","rotate(-90)"),r.setAttribute("stroke-dasharray",String(If)),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,arc:r,base:i}}updateLedge(e,t,n){this.clock+=n;let i=new Set,r=Math.round(Mt(this.h*.095,30,72));for(let o of e){if(o.state!=="ledge")continue;i.add(o.id);let a=this.ledgeRings.get(o.id);a||(a=this.makeLedgeRing(),this.ledgeRings.set(o.id,a));let l=Mt(1-o.stateT/Tt.hold,0,1),c=o.stateT<Tt.protect,h=!c&&l<.375,u=c?ty:Fh(Af(o.variant));a.arc.setAttribute("stroke",u),a.arc.setAttribute("stroke-dashoffset",(If*(1-l)).toFixed(2)),a.arc.setAttribute("stroke-width",h?"5.5":"4"),a.arc.dataset.left=l.toFixed(4),a.arc.dataset.phase=c?"protect":"hold";let d=h?1+.12*Math.abs(Math.sin(this.clock*26)):1,f=t(o.pos,.15),v=a.el.firstChild;v.setAttribute("width",String(r)),v.setAttribute("height",String(r)),v.style.left=`${-r/2}px`,v.style.top=`${-r/2}px`,a.el.style.opacity="1",a.el.style.transform=`translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[o,a]of this.ledgeRings)i.has(o)||(a.el.remove(),this.ledgeRings.delete(o))}makeBreakMark(){let e=document.createElement("div");e.className="ro-abs ro-break",e.style.width="0",e.style.height="0";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-12 -13 24 26"),n.style.position="absolute",n.style.overflow="visible",n.style.filter="drop-shadow(0 0 2px rgba(0,0,0,.9))";let i=document.createElementNS(t,"path");i.setAttribute("d","M0 -11 L10 -7 L9 3 Q6 9 0 12 Q-6 9 -9 3 L-10 -7 Z"),i.setAttribute("stroke","rgba(0,0,0,.6)"),i.setAttribute("stroke-width","1.5");let r=document.createElementNS(t,"path");return r.setAttribute("d","M1 -11 L-2 -4 L3 0 L-1 5 L1 12"),r.setAttribute("fill","none"),r.setAttribute("stroke","rgba(20,16,24,.95)"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linejoin","round"),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,svg:n}}updateBreakMarks(e,t,n){let i=null;for(let a of e)(a.counterT??0)>0&&a.counterTargetId!=null&&(i=a.counterTargetId);let r=new Set,o=Math.round(Mt(this.h*.06,18,44));for(let a of e){if(!((a.breakT??0)>0)||a.state==="dead"||a.state==="falling")continue;r.add(a.id);let l=this.breakMarks.get(a.id);l||(l=this.makeBreakMark(),this.breakMarks.set(a.id,l));let c=a.id===i,h=t(a.pos,n?n(a):2.25),u=Math.round(Mt(this.h*.11,38,92)),d=c?1+.18*Math.abs(Math.sin(this.clock*12)):1;l.svg.firstChild.setAttribute("fill",c?"#ffc23a":"#e9e6df"),l.el.dataset.mark=c?"counter":"break",l.svg.setAttribute("width",String(o)),l.svg.setAttribute("height",String(Math.round(o*1.08))),l.svg.style.left=`${-o/2}px`,l.svg.style.top=`${-o*.54}px`,l.el.style.opacity=h.visible?"1":"0",l.el.style.transform=`translate3d(${(h.x-u/2-o*.55).toFixed(1)}px,${h.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[a,l]of this.breakMarks)r.has(a)||(l.el.remove(),this.breakMarks.delete(a))}update(e,t,n,i){this.updateLedge(e,t,n),(this.breakMarks.size||e.some(l=>(l.breakT??0)>0))&&this.updateBreakMarks(e,t,i);let r=new Set,o=Math.round(Mt(this.h*.11,38,92)),a=Math.round(Mt(this.h*.017,5,9));for(let l of e){r.add(l.id);let c=this.bars.get(l.id);c||(c=this.makeBar(l.team),this.bars.set(l.id,c));let h=l.state!=="dead"&&l.state!=="falling"&&l.state!=="reviving"&&l.hp>0,u=t(l.pos,i?i(l):2.25),d=h&&u.visible;if(c.el.style.opacity=d?"1":"0",d){let f=Mt(l.hp/l.maxHp,0,1);c.lagV=f>=c.lagV?f:Math.max(f,c.lagV-n*.7),c.el.style.width=`${o}px`,c.el.style.height=`${a}px`,c.el.style.transform=`translate3d(${Math.round(u.x-o/2)}px,${Math.round(u.y-a/2)}px,0)`,c.fill.style.width=`${(f*100).toFixed(1)}%`,c.lag.style.width=`${(c.lagV*100).toFixed(1)}%`}if(l.team==="enemy"){let f=this.arrows.get(l.id);f||(f={el:this.makeArrow(),id:l.id},this.arrows.set(l.id,f));let v=t(l.pos,1),_=10;if(h&&(v.x<_||v.x>this.w-_||v.y<_||v.y>this.h-_||!v.visible)){let p=this.w/2,m=this.h/2,x=v.x-p,y=v.y-m;Math.abs(x)<.001&&Math.abs(y)<.001&&(y=-1);let E=26,T=Math.min((p-E)/Math.max(Math.abs(x),.001),(m-E)/Math.max(Math.abs(y),.001)),P=p+x*T,C=m+y*T,S=Math.atan2(y,x);f.el.style.opacity="1",f.el.style.transform=`translate3d(${P.toFixed(1)}px,${C.toFixed(1)}px,0) rotate(${S}rad)`}else f.el.style.opacity="0"}}for(let[l,c]of this.bars)r.has(l)||(c.el.remove(),this.bars.delete(l));for(let[l,c]of this.arrows)r.has(l)||(c.el.remove(),this.arrows.delete(l));for(let l of this.nums){if(!l.active)continue;if(l.age+=n,l.age>=l.life){l.active=!1,l.el.style.opacity="0";continue}let c=l.age/l.life,h=t({x:l.x,z:l.z},l.y),u=l.rise*(1-Math.pow(1-c,2)),d=c<.12?.7+c/.12*.6:1.3-Math.min(.3,(c-.12)*.7);l.el.style.opacity=String(c<.6?1:1-(c-.6)/.4),l.el.style.transform=`translate3d(${(h.x+l.drift*c+l.ox).toFixed(1)}px,${(h.y-u+l.oy).toFixed(1)}px,0) translate(-50%,-50%) scale(${d.toFixed(2)})`}}clear(){for(let e of this.ledgeRings.values())e.el.remove();this.ledgeRings.clear();for(let e of this.breakMarks.values())e.el.remove();this.breakMarks.clear();for(let e of this.nums)e.active=!1,e.el.style.opacity="0";for(let e of this.bars.values())e.el.remove();for(let e of this.arrows.values())e.el.remove();this.bars.clear(),this.arrows.clear()}dispose(){this.clear();for(let e of this.nums)e.el.remove()}};var ac=class extends Ii{constructor(){super();let e=new Xt;e.deleteAttribute("uv");let t=new Ki({side:pn}),n=new Ki,i=new xo(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new Ze(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Fn(e,n,6),a=new sn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Ze(e,_r(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Ze(e,_r(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Ze(e,_r(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new Ze(e,_r(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Ze(e,_r(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Ze(e,_r(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function _r(s){return new tn({color:0,emissive:16777215,emissiveIntensity:s})}var lc=38,Ni=51*Math.PI/180,ny=at.near?12.5:15.3,iy=at.near?22.1*(12.5/15.3):22.1,Lf=.6,sy=2.6,ry=218,oy=154,ay=(ry-oy)/2,Ms=oi(5239039),mn=[1,1,1],Ss=oi(16726832),bn=oi(16747050),ly=[.72,.74,.78],Df=oi(12098936),Do=oi(9077624),Vh=[.86,.87,.9],cy=oi(16773572),hy=oi(15260868),vi=oi(16758062),uy=oi(5922408),xi={melee:[2.2,2.4,2],sweepHalf:70*Math.PI/180,charge:4,bash:3.2,bashHalf:40*Math.PI/180,guardHalf:70*Math.PI/180};function br(s,e,t,n,i,r){let o=r;for(let a of s){let l=e-a.pos.x,c=t-a.pos.z,h=l*n+c*i,u=l*l+c*c-a.r*a.r,d=h*h-u;if(d<0)continue;let f=-h-Math.sqrt(d);f>0&&f<o&&(o=f)}return o}function kf(s,e,t){let n=Math.min(window.devicePixelRatio||1,2),i=new $l({canvas:s,antialias:n<2,powerPreference:"high-performance",alpha:!1,stencil:!0});i.setPixelRatio(n),i.shadowMap.enabled=!0,i.shadowMap.type=Ka,i.outputColorSpace=qt;let r=()=>{i.toneMapping=at.myth?il:ii,i.toneMappingExposure=at.myth?1.22:1};at.myth&&r(),typeof window<"u"&&(window.__THREE_GAME_DIAGNOSTICS__={renderer:i.info});let o=new Ii,a=/iPhone|iPad|Android/i.test(navigator.userAgent),l={shadowSize:a?1536:2048,groundTexSize:a?1024:2048},c=ec(o,t,l),h={};h[at.myth?"myth":"base"]={world:c,background:o.background,fog:o.fog};let u=null,d=()=>{if(!u){let J=new gr(i);u=J.fromScene(new ac,.04).texture,J.dispose()}return u},f=()=>{o.environment=at.myth?d():null,o.environmentIntensity=.7};at.myth&&f();function v(){let J=new Ii;return{world:ec(J,t,l),background:J.background,fog:J.fog}}function _(J){at.myth=J;let j=J?"myth":"base",te=h[j]??(h[j]=v());c.root.removeFromParent(),o.add(te.world.root),o.background=te.background,o.fog=te.fog,c=te.world,r(),f();for(let k of Ce.values())k.dispose();Ce.clear()}let g=new Map,p=J=>{if(!at.myth)return"default";let j=g.get(J.id);return j||(J.kit==="shieldbearer"?"myth-shield":J.kit==="archer"?"myth-archer":"myth")},m=[],x=new Map,y=[],E=null,T=new Map,P=!0,C=new un(lc,16/9,1,220);C.rotation.set(-Ni,0,0);let S=new un(lc,16/9,1,220);S.rotation.set(-Ni,0,0);let w=new U(0,-Math.sin(Ni),-Math.cos(Ni)),R=new U(1,0,0),D=new U(0,Math.cos(Ni),-Math.sin(Ni)),I=new Po(900,!0),O=new Po(520,!1),W=new Lo(200,vf()),$=new Lo(40,xf());W.view.copy(w),$.view.copy(w);let Z=new rc(o);o.add(O.mesh,I.mesh,W.mesh,$.mesh);let q=[];{let J=new fi(.86,1,56).rotateX(-Math.PI/2);for(let j=0;j<10;j++){let te=new Qt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:ji,fog:!1}),k=new Ze(J,te);k.visible=!1,k.renderOrder=7,k.frustumCulled=!1,o.add(k),q.push({mesh:k,mat:te,age:0,life:1,r0:0,r1:1,alpha:1,on:!1})}}let oe=[],ue=[],Me=new oc(e),Ce=new Map,qe=new Map,Ye=s.clientWidth||window.innerWidth||852,He=s.clientHeight||window.innerHeight||393,ee=-.8,Y=new Te(0,ee),he=0,De=0,re=0,Ge=new Te,vt=0,F=1,ht=0,Pe=new U,ke=new U,ge=new U;function xt(J){let j=Math.tan(lc*Math.PI/360);return Math.max(ny/2/j,iy/2/(J*j))}function Le(J,j,te,k,N=0,K=0){J.position.set(j+N,k*Math.sin(Ni)+K,te+k*Math.cos(Ni)),J.updateMatrixWorld(!0)}function nt(J,j){Ye=Math.max(1,J),He=Math.max(1,j),i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.setSize(Ye,He,!1);for(let k of[C,S])k.aspect=Ye/He,k.updateProjectionMatrix();Me.resize(Ye,He);let te=xt(Ye/He);Le(C,Y.x,Y.y,te),Le(S,Y.x,Y.y,te)}function Ft(J,j=0){return ge.set(J.x,j,J.z).project(C),{x:(ge.x*.5+.5)*Ye,y:(-ge.y*.5+.5)*He,visible:ge.z<1&&ge.x>=-1&&ge.x<=1&&ge.y>=-1&&ge.y<=1}}function St(J,j){let te=J/Ye*2-1,k=-(j/He)*2+1;if(Pe.set(te,k,.5).unproject(S),ke.copy(Pe).sub(S.position),ke.y>-1e-6)return null;let N=-S.position.y/ke.y;return N>0?{x:S.position.x+ke.x*N,z:S.position.z+ke.z*N}:null}let L=()=>Math.random(),M=(J,j)=>J+(j-J)*L();function X(J,j,te,k,N,K,ie){let b=q.find(A=>!A.on)??q[0];b.on=!0,b.age=0,b.life=N,b.r0=te,b.r1=k,b.alpha=ie,b.mesh.position.set(J,.09,j),b.mat.color.setRGB(K[0],K[1],K[2],qt),b.mesh.visible=!0}function ne(J,j,te,k,N,K=.1,ie=1){I.spawn({x:J,y:j,z:te,size:k,size1:k*.25,color:N,life:K,alpha:ie})}function le(J,j,te,k,N,K,ie,b){for(let A=0;A<k;A++){let B;ie?B=Math.atan2(-ie.z,-ie.x)+(L()-.5)*b:B=L()*Math.PI*2;let G=N*M(.4,1);I.spawn({x:J,y:j,z:te,vx:Math.cos(B)*G,vy:M(.5,4),vz:Math.sin(B)*G,size:M(.07,.16),size1:.02,color:L()<.35?mn:K,life:M(.18,.42),gravity:9,drag:2.5})}}function Q(J,j,te,k,N,K=1.2){for(let ie=0;ie<te;ie++){let b=L()*Math.PI*2,A=M(.3,1)*k;O.spawn({x:J+Math.cos(b)*.15,y:.12,z:j+Math.sin(b)*.15,vx:Math.cos(b)*A,vy:M(.2,1)*K,vz:Math.sin(b)*A,size:N*M(.5,.9),size1:N*M(1.4,2),color:Df,alpha:.55,life:M(.4,.8),drag:3.2})}}function Oe(J,j,te,k,N,K){for(let ie=0;ie<k;ie++){let b=L()*Math.PI*2,A=K*M(.3,1);O.spawn({x:J,y:j,z:te,vx:Math.cos(b)*A,vy:M(2,6),vz:Math.sin(b)*A,size:M(.06,.13),size1:.05,color:N.map(B=>B*M(.6,1.1)),alpha:1,life:M(.5,.9),gravity:16,drag:.6,crisp:1})}}function fe(J,j,te,k,N,K,ie,b,A=.2){let B=ie?Math.atan2(-ie.z*Math.sin(Ni),-ie.x):0;for(let G=0;G<k;G++){let V=ie?B+(L()-.5)*b:G/k*Math.PI*2+L()*.5,ae=new U().copy(R).multiplyScalar(Math.cos(V)).addScaledVector(D,Math.sin(V));oe.push({x:J,y:j,z:te,dir:ae,r1:N*M(.7,1.2),len0:N*.3,len1:N*M(.6,1),width:M(.1,.2),age:0,life:A*M(.8,1.2),color:K})}}function ze(J,j,te,k){O.spawn({x:J,y:1.05,z:j,size:te*1.4,size1:te*.6,color:vi,alpha:.95,life:.2});for(let N=0;N<k;N++){let K=L()*Math.PI*2,ie=M(3,8);O.spawn({x:J,y:M(.7,1.4),z:j,vx:Math.cos(K)*ie,vy:M(.5,3.5),vz:Math.sin(K)*ie,size:M(.12,.24),size1:.05,color:vi,alpha:1,life:M(.22,.36),gravity:9,drag:3,crisp:1})}}function We(J,j,te,k){for(let N=0;N<k;N++){let K=M(.6,2.2);O.spawn({x:J-te.x*M(0,.25),y:M(-.05,.1),z:j-te.z*M(0,.25),vx:-te.x*K+M(-.6,.6),vy:M(.5,2.5),vz:-te.z*K+M(-.6,.6),size:M(.06,.12),size1:.05,color:Do.map(ie=>ie*M(.7,1.1)),alpha:1,life:M(.6,1),gravity:16,drag:.4,crisp:1,floor:!1})}}function pe(J){return J.state==="ledge"?1.25:J.state==="climb"?1.25+(2.25-1.25)*Mt(J.stateT/Tt.climb,0,1):2.25}function Ee(J){return J?oi(Rf(J.variant)):Ms}function Be(J){return!J||J.team==="player"?Ms:at.myth?Ss:J.variant===2?bn:Ss}let Ve=[];function _e(J,j){let te=null,k=1/0;for(let N of Ve){if(N.kind!==J)continue;let K=(N.x-j.x)**2+(N.z-j.z)**2;K<k&&(k=K,te=N.ownerId)}return te}function ot(J,j,te){let k=J.targetId===j.playerId,{x:N,z:K}=J.pos,ie=1,b=J.dir,A=0,B=14678783,G=Be(te.get(J.sourceId));switch(J.kind){case"basic":ne(N,ie,K,.7,G,.09),le(N,ie,K,6,6,G,b,2.4),fe(N,ie,K,4,.9,G,b,2.2,.16),A=.07,B=13629951;break;case"control":ne(N,ie,K,1.3,G,.14),le(N,ie,K,12,8,G,b,3.4),fe(N,ie,K,7,1.7,G,b,3.6,.22),X(N,K,.3,1.2,.26,G,.6),A=.2,B=8057599;break;case"push":ne(N,ie,K,1.9,mn,.16),le(N,ie,K,16,9,G,null,6.3),fe(N,ie,K,10,2.4,G,null,6.3,.26),X(N,K,.4,2.2,.32,G,.7),Q(N,K,9,3.2,.7),A=.42,B=16777215;break;case"enemyBasic":ne(N,ie,K,.8,bn,.1),le(N,ie,K,8,6,bn,b,2.6),fe(N,ie,K,5,1.1,bn,b,2.4,.18),A=k?.14:0,B=16739162;break;case"enemyHeavy":ne(N,ie,K,2,bn,.16),le(N,ie,K,16,9,bn,null,6.3),fe(N,ie,K,10,2.5,bn,null,6.3,.26),X(N,K,.4,2.9,.38,bn,.95),Q(N,K,10,3.4,.75),Oe(N,.5,K,6,Do,4),A=k?.6:.3,B=16739162;break;case"melee1":case"melee2":ne(N,ie,K,.8,mn,.09),le(N,ie,K,7,6,G,b,2.4),fe(N,ie,K,5,1,G,b,2.2,.16),A=.08;break;case"melee3":ne(N,ie,K,1.2,mn,.11),le(N,ie,K,11,7,G,b,3),fe(N,ie,K,7,1.5,G,b,3,.2),A=.16;break;case"charge":ne(N,ie,K,1.7,mn,.14),le(N,ie,K,14,8,G,b,3.6),fe(N,ie,K,9,2,G,b,3.6,.24),X(N,K,.4,1.8,.3,G,.7),Q(N,K,8,2.6,.65),A=.3;break;case"counterBash":case"counterMelee":{let xe=J.kind==="counterBash";ne(N,ie,K,xe?1.8:1.1,mn,.12),le(N,ie,K,xe?14:9,8,vi,b,3.2),fe(N,ie,K,xe?9:6,xe?2:1.4,vi,b,3.2,.22),ze(N,K,xe?1.2:.8,xe?18:10),A=xe?.34:.16,B=16769162;break}}J.knock>.2&&Q(N,K,4,1.6,.55,.6),he=Math.min(1,he+A),k&&(B=16739162);let V=Mt(He/393,.9,1.8),ae=te.get(J.targetId);if(at.myth&&ae){let xe=te.get(J.sourceId),Ie=xe&&Math.sign(Ft(ae.pos).x-Ft(xe.pos).x)||1,Re=Mt(He*.04,14,30);Me.spawnNumber(ae.pos,pe(ae),String(Math.round(J.dmg)),B,Mt(14+J.dmg*.9,15,30)*V*.62,{x:Ie*Re*1.2,y:-Re*1.6})}else Me.spawnNumber(J.pos,1.9,String(Math.round(J.dmg)),B,Mt(14+J.dmg*.9,15,30)*V)}function H(J,j,te){for(let k of J)switch(k.type){case"shoot":{let N=te.get(k.ownerId),K=Ee(N),ie=k.pos.x+k.dir.x*.15,b=k.pos.z+k.dir.z*.15;ne(ie,1.1,b,.6,K,.07);for(let A=0;A<3;A++){let B=Math.atan2(k.dir.z,k.dir.x)+(L()-.5)*.7,G=M(3,7);I.spawn({x:ie,y:1.1,z:b,vx:Math.cos(B)*G,vy:M(-.5,1),vz:Math.sin(B)*G,size:.09,size1:.02,color:K,life:.14,drag:3})}break}case"hit":ot(k,j,te),at.myth&&k.knock>.2&&T.set(k.targetId,{x:k.pos.x,z:k.pos.z,age:0,color:Be(te.get(k.sourceId))});break;case"cast":{let N=te.get(k.ownerId),K=Ce.get(k.ownerId);K&&(K.castT=0,K.castSkill=k.skill);let ie=k.skill==="enemyHeavy",b=ie?Kt.range:Vt.range,A=ie?Kt.halfAngle:Vt.halfAngle,B=Math.atan2(k.dir.z,k.dir.x),G=N?N.pos.x:k.pos.x,V=N?N.pos.z:k.pos.z;ue.push({x:G,z:V,angle:B,range:b,half:A,color:ie?bn:Be(N),age:0,life:.22});for(let ae=0;ae<7;ae++){let xe=B+(L()-.5)*A*1.8,Ie=b*M(.5,.95);Q(G+Math.cos(xe)*Ie,V+Math.sin(xe)*Ie,1,1,ie?.7:.5,.5)}ie&&(X(G+Math.cos(B)*b*.55,V+Math.sin(B)*b*.55,.3,b*.8,.3,bn,.6),he=Math.min(1,he+.12));break}case"dash":{let N=te.get(k.ownerId),K=Ee(N),ie=5;for(let b=0;b<ie;b++){let A=b/(ie-1)*dn.distance;I.spawn({x:k.from.x+k.dir.x*A,y:.95,z:k.from.z+k.dir.z*A,size:.62,size1:.5,aspect:2.7,color:K,alpha:.5-b*.04,life:.26+b*.045})}Q(k.from.x,k.from.z,6,2.2,.5,.4);break}case"blocked":{let{x:N,z:K}=k.pos,ie=k.kind==="enemyBasic"?bn:Be(te.get(_e(k.kind,k.pos)??-1));ne(N,.9,K,.5,ie,.08),Oe(N,.9,K,10,Do,4.5),Q(N,K,3,1.2,.45,.6),le(N,.9,K,5,5,ie,null,6.3);break}case"blockedStrike":{let N=k.skill==="enemyHeavy"?bn:Be(te.get(k.ownerId)),{x:K,z:ie}=k.pos;c.hitRock(K,ie),ne(K,1.15,ie,2.2,mn,.14),ne(K,1.15,ie,1.4,N,.24,.85),le(K,1.15,ie,22,8,N,k.dir,3.4),fe(K,1.15,ie,10,2.1,cy,k.dir,3.8,.4),Oe(K,1,ie,22,Do,6),Q(K,ie,7,2,.7,.9);break}case"expire":{let N=k.kind==="enemyBasic"?bn:Be(te.get(_e(k.kind,k.pos)??-1));le(k.pos.x,.95,k.pos.z,4,2.2,N,null,6.3);break}case"ledgeGrab":{let N=Ce.get(k.ownerId);N&&(N.ledgeEdge={x:k.edge.x,z:k.edge.z});let K=k.inward.z,ie=-k.inward.x;for(let b=0;b<10;b++){let A=(b%2?1:-1)*M(.35,1.3),B=k.edge.x+K*A,G=k.edge.z+ie*A;O.spawn({x:B,y:.1,z:G,vx:K*Math.sign(A)*M(.6,1.6)-k.inward.x*.4,vy:M(.4,1.2),vz:ie*Math.sign(A)*M(.6,1.6)-k.inward.z*.4,size:M(.35,.6),size1:M(.8,1.2),color:hy,alpha:.75,life:M(.45,.8),drag:3})}We(k.edge.x,k.edge.z,k.inward,14);for(let b of[-1,1])le(k.edge.x+K*b*.3,.12,k.edge.z+ie*b*.3,4,3,mn,null,6.3);break}case"ledgeClimb":{let N=k.to.x-k.from.x,K=k.to.z-k.from.z,ie=Math.hypot(N,K)||1;Q(k.from.x+N/ie*Tt.hangOut,k.from.z+K/ie*Tt.hangOut,5,1.2,.5,.6);break}case"ledgeDrop":{let N=Ce.get(k.ownerId);N?.onLedgeDrop(k.reason);let K=N?.ledgeEdge,ie=te.get(k.ownerId);if(K&&ie){let b=K.x-ie.pos.x,A=K.z-ie.pos.z,B=Math.hypot(b,A)||1;We(K.x,K.z,{x:b/B,z:A/B},k.reason==="knocked"?12:7),k.reason==="timeout"&&Q(K.x,K.z,4,.8,.4,.3)}break}case"melee":{Ce.get(k.ownerId)?.onMelee(k.step);let N=te.get(k.ownerId),K=k.counter?vi:Be(N),ie=Math.atan2(k.dir.z,k.dir.x),b=N?N.pos.x:k.pos.x,A=N?N.pos.z:k.pos.z;k.step===3?ue.push({x:b,z:A,angle:ie,range:xi.melee[2],half:xi.sweepHalf,color:K,age:0,life:.16}):m.push({x:b,z:A,dx:k.dir.x,dz:k.dir.z,len:xi.melee[k.step-1],age:0,life:.13,color:K});break}case"shieldBlock":{let{x:N,z:K}=k.pos;if(k.kind==="bearer")$n(k.pos,k.dir),he=Math.min(1,he+.06);else if(k.kind==="perfect")ze(N,K,1.3,30),fe(N,1.1,K,10,1.9,vi,null,6.3,.26),X(N,K,.3,1.6,.28,vi,.8),he=Math.min(1,he+.12);else for(let ie=0;ie<9;ie++){let b=Math.atan2(-k.dir.z,-k.dir.x)+(L()-.5)*2.4,A=M(2.5,6);O.spawn({x:N,y:M(.8,1.3),z:K,vx:Math.cos(b)*A,vy:M(.5,2.5),vz:Math.sin(b)*A,size:M(.09,.16),size1:.04,color:Vh,alpha:1,life:M(.16,.26),gravity:9,drag:3,crisp:1})}break}case"recoil":{let N=te.get(k.ownerId);N&&Q(N.pos.x,N.pos.z,3,1.2,.45,.4);break}case"guardBreak":{let N=te.get(k.targetId),K=N?N.pos.x:k.pos.x,ie=N?N.pos.z:k.pos.z;ne(k.pos.x,1,k.pos.z,1.2,mn,.12),Oe(k.pos.x,1,k.pos.z,12,uy,5);for(let b=0;b<6;b++){let A=b/6*Math.PI*2+L()*.4;O.spawn({x:K+Math.cos(A)*.2,y:2,z:ie+Math.sin(A)*.2,vx:Math.cos(A)*1.6,vy:M(2,3),vz:Math.sin(A)*1.6,size:.14,size1:.08,color:[.8,.93,1],alpha:.95,life:.5,gravity:9,drag:.8,crisp:1,floor:!1})}he=Math.min(1,he+.16);break}case"armor":{let N=te.get(k.ownerId);N&&X(N.pos.x,N.pos.z,.5,1.3,.25,bn,.8);break}case"charge":{x.set(k.ownerId,{x:k.from.x,z:k.from.z,age:0,lx:k.from.x,lz:k.from.z}),Q(k.from.x,k.from.z,6,2,.55,.5);break}case"counterReady":{let N=te.get(k.ownerId);N&&(X(N.pos.x,N.pos.z,.5,1.6,.3,vi,.9),ze(N.pos.x,N.pos.z,.7,8));break}case"counterUsed":{let N=te.get(k.ownerId);N&&k.kind==="bash"&&ue.push({x:N.pos.x,z:N.pos.z,angle:N.facing,range:xi.bash,half:xi.bashHalf,color:vi,age:0,life:.2});break}case"revive":{let{x:N,z:K}=k.pos;X(N,K,.3,1.8,.4,Ms,.9);for(let ie=0;ie<24;ie++){let b=L()*Math.PI*2,A=M(.1,.5);I.spawn({x:N+Math.cos(b)*A,y:M(0,.6),z:K+Math.sin(b)*A,vy:M(2,5),size:M(.12,.26),size1:.03,color:L()<.5?Ms:mn,alpha:.9,life:M(.5,.9),gravity:-1,drag:1.2})}Q(N,K,8,2.2,.55,.5);break}case"spawnMark":{y.push({x:k.pos.x,z:k.pos.z,age:0,lead:Math.max(.1,k.lead)});break}case"edgeSave":{let N=te.get(k.ownerId);N&&(X(N.pos.x,N.pos.z,.5,1.5,.3,mn,.9),le(N.pos.x,.9,N.pos.z,8,4,mn,null,6.3));break}case"fall":{let{x:N,z:K}=k.pos;Q(N,K,14,3.2,.8,1.8),Oe(N,.3,K,8,Do,3),vt=.7,De=1,re=1,Ge.set(N,K),he=Math.min(1,he+.18);break}case"death":{if(k.cause==="fall")break;let N=te.get(k.ownerId),K=Ee(N),{x:ie,z:b}=k.pos;for(let A=0;A<40;A++){let B=L()*Math.PI*2,G=M(.2,1.6);I.spawn({x:ie+Math.cos(B)*.25,y:M(.2,1.8),z:b+Math.sin(B)*.25,vx:Math.cos(B)*G,vy:M(.8,3.2),vz:Math.sin(B)*G,size:M(.12,.3),size1:.02,color:L()<.5?K:mn,alpha:.9,life:M(.6,1.2),gravity:-1.2,drag:1.4})}X(ie,b,.4,2.4,.5,K,.8),ne(ie,1,b,2.2,K,.2,.8),vt=.35,he=Math.min(1,he+.2);break}default:break}}function ve(J){Z.flashes.begin();for(let j=ue.length-1;j>=0;j--){let te=ue[j];if(te.age+=J,te.age>=te.life){ue.splice(j,1);continue}let k=te.age/te.life;Z.flashes.push(te.x,te.z,te.angle,te.range*(.85+.15*k),te.half,1,te.color,(1-k)*1.2)}Z.flashes.end()}function Se(J){for(let j=oe.length-1;j>=0;j--){let te=oe[j];te.age+=J,te.age>=te.life&&oe.splice(j,1)}for(let j of oe){let te=j.age/j.life,k=1-Math.pow(1-te,2.2),N=j.r1*k,K=Math.min(j.len0+(j.len1-j.len0)*te,N+.15);Pe.set(j.x+j.dir.x*N,j.y+j.dir.y*N,j.z+j.dir.z*N),W.push(Pe,j.dir,K,j.width*(1-te*.6),j.color,1-te*te)}}function Ue(J){for(let j of q){if(!j.on)continue;if(j.age+=J,j.age>=j.life){j.on=!1,j.mesh.visible=!1;continue}let te=j.age/j.life,k=1-Math.pow(1-te,2.4),N=j.r0+(j.r1-j.r0)*k;j.mesh.scale.set(N,1,N),j.mat.opacity=j.alpha*(1-te)}}let de=new U;function ce(J,j){let te=new Set;Ve.length=0;for(let k of J.projectiles){if(!k.alive)continue;te.add(k.id),Ve.push({kind:k.kind,x:k.pos.x,z:k.pos.z,ownerId:k.ownerId});let N=k.team==="player"?Ms:j.get(k.ownerId)?Be(j.get(k.ownerId)):Ss;de.set(k.dir.x,0,k.dir.z),Pe.set(k.pos.x,.95,k.pos.z);let K=k.kind==="basic"?1.4:.7,ie=Math.floor(k.traveled/K),b=qe.get(k.id);if(b===void 0||ie>b){qe.set(k.id,ie);let A=k.kind==="enemyBasic"?bn:N,B=k.kind==="basic"?.9:1.6;I.spawn({x:k.pos.x-k.dir.x*B+M(-.08,.08),y:.95+M(-.1,.1),z:k.pos.z-k.dir.z*B+M(-.08,.08),size:k.kind==="basic"?.1:.16,size1:.02,color:A,alpha:.9,life:.38,vx:M(-.3,.3),vz:M(-.3,.3),vy:M(0,.4)})}k.kind==="basic"?(W.push(Pe,de,2.2,.5,N,1),W.push(Pe,de,.9,.24,mn,1)):k.kind==="control"?($.push(Pe,de,3.8,1.1,N,1),W.push(Pe,de,2.4,.8,N,.7)):($.push(Pe,de,3.1,1.4,bn,1),W.push(Pe,de,2.3,.95,Ss,.75))}for(let k of qe.keys())te.has(k)||qe.delete(k)}function Ne(J,j){Z.sectors.begin(),Z.strips.begin();let te=t.rocks,k=.55+.45*Math.sin(ht*48),N=J.variant!=="s0",K=N?.55:.16,ie=N?.34:.2,b=N?.8+.2*k:.5+.5*k;for(let A of J.fighters){if(A.state==="guard"&&A.shieldDir&&A.shieldUp!==!1){let ae=A.guard?.perfect===!0;Z.sectors.push(A.pos.x,A.pos.z,Math.atan2(A.shieldDir.z,A.shieldDir.x),1.6,xi.guardHalf,1,ae?vi:Ms,ae?.9:.6,.1)}let B=A.windup;if(!B||A.state!=="windup")continue;let G=Math.atan2(B.dir.z,B.dir.x),V=Mt(B.t/Math.max(B.dur,.001),0,1);switch(B.skill){case"enemyHeavy":{let ae=A.armorKind==="heavy"&&(A.armorT??0)>0?1:0;Z.sectors.push(A.pos.x,A.pos.z,G,Kt.range,Kt.halfAngle,V,Ss,1,K,ae);break}case"melee1":case"melee2":{let ae=br(te,A.pos.x,A.pos.z,B.dir.x,B.dir.z,xi.melee[B.skill==="melee1"?0:1]);Z.strips.push(A.pos.x,A.pos.z,G,ae,.6,V,Be(A),.6,.7,.18);break}case"melee3":Z.sectors.push(A.pos.x,A.pos.z,G,xi.melee[2],xi.sweepHalf,V,Be(A),.7,.25);break;case"charge":{let ae=br(te,A.pos.x,A.pos.z,B.dir.x,B.dir.z,xi.charge);Z.strips.push(A.pos.x,A.pos.z,G,ae,1,V,Be(A),.85,.5,ie);break}case"enemyBasic":{let ae=br(te,A.pos.x,A.pos.z,B.dir.x,B.dir.z,jt.range);Z.strips.push(A.pos.x,A.pos.z,G,ae,.11,1,Ss,b,.5,ie);break}case"control":{let ae=br(te,A.pos.x,A.pos.z,B.dir.x,B.dir.z,Nt.range);Z.strips.push(A.pos.x,A.pos.z,G,ae,.95,V,Be(A),.9,.6,ie);break}case"push":Z.sectors.push(A.pos.x,A.pos.z,G,Vt.range,Vt.halfAngle,V,Be(A),.9,K);break}}if(j){let A=J.fighters.find(B=>B.id===J.playerId);if(A&&A.state!=="dead"&&A.state!=="falling"){let B=j.cancel?ly:Ms,G=Math.atan2(j.dir.z,j.dir.x);if(j.skill==="basic"){let V=br(te,A.pos.x,A.pos.z,j.dir.x,j.dir.z,9);Z.strips.push(A.pos.x,A.pos.z,G,V,.09,1,B,j.cancel?.55:.85,.7)}else if(j.skill==="control"){let V=br(te,A.pos.x,A.pos.z,j.dir.x,j.dir.z,11);Z.strips.push(A.pos.x,A.pos.z,G,V,.9,0,B,j.cancel?.5:.8,.8)}else Z.sectors.push(A.pos.x,A.pos.z,G,Vt.range,Vt.halfAngle,1,B,j.cancel?.6:.8)}}Z.sectors.end(),Z.strips.end()}function it(J,j,te,k,N){let K=Mt(N,0,.1);ht+=K,vt=Math.max(0,vt-K),F+=((vt>0?.32:1)-F)*yr(14,K);let ie=K*F,b=Oh(J.variant);b!==at.myth&&_(b);let A=new Map;for(let rt of J.fighters)A.set(rt.id,rt);for(let rt of J.fighters){let dt=Ce.get(rt.id);dt&&(dt.variant!==rt.variant||dt.look!==p(rt))&&(dt.dispose(),Ce.delete(rt.id),dt=void 0),dt||(dt=new Io(o,rt.variant,p(rt)),Ce.set(rt.id,dt))}for(let[rt,dt]of Ce)A.has(rt)||(dt.dispose(),Ce.delete(rt));H(j,J,A);let B=A.get(J.playerId),G=2*xt(Ye/He)*Math.tan(lc*Math.PI/360)/He,ae=(J.variant!=="s0"?ay*G:0)+(B?B.pos.x:0)*Lf,xe=ee+(B?B.pos.z:0)*Lf,Ie=yr(sy,K);Y.x+=(ae-Y.x)*Ie,Y.y+=(xe-Y.y)*Ie,re=Math.max(0,re-K*1.1),De=Math.max(0,De-K*1.5);let Re=Y.x+(Ge.x*.5-Y.x)*.4*re*re,Je=Y.y+(Ge.y*.5-Y.y)*.4*re*re,tt=xt(Ye/He)*(1-.1*Math.sin(De*Math.PI*.5));Le(S,Re,Je,tt),he=Math.max(0,he-K*2.4);let $e=he*he*.55,ft=(Math.sin(ht*53.1)+Math.sin(ht*31.7+1.3))*.5*$e,Ct=(Math.sin(ht*47.3+2.1)+Math.sin(ht*29.1))*.5*$e;Le(C,Re,Je,tt,ft,Ct),C.rotation.z=Math.sin(ht*41)*he*he*.012,C.updateMatrixWorld(!0);for(let rt of J.fighters){let dt=Ce.get(rt.id);dt.update(rt,k,J.variant!=="s0"),dt.wantDust(rt,ie)&&Q(rt.pos.x,rt.pos.z,2,1,.45,.4),rt.state==="falling"&&L()<.9&&I.spawn({x:rt.pos.x+M(-.15,.15),y:rt.y+.9,z:rt.pos.z+M(-.15,.15),size:.28,size1:.1,aspect:2.8,color:[.9,.95,1],alpha:.4,life:.4,vy:3})}W.begin(),$.begin(),ce(J,A),Se(ie),at.myth&&P&&Rt(A,ie),m.length&&_t(ie),x.size&&Cn(A,ie),W.end(),$.end(),Ne(J,te),(y.length||E)&&In(ie),ve(ie),Ue(ie),I.update(ie),O.update(ie),c.setVariant(J.variant==="s0"?"s0":"v2"),c.update(K),i.render(o,C),Me.update(J.fighters,Ft,K,pe)}function Rt(J,j){for(let[te,k]of T){k.age+=j;let N=J.get(te);if(!N||k.age>=.2){T.delete(te);continue}let K=N.pos.x-k.x,ie=N.pos.z-k.z,b=Math.hypot(K,ie);if(b<.05)continue;let A=1-k.age/.2;Pe.set(N.pos.x,.9,N.pos.z),ke.set(K/b,0,ie/b),W.push(Pe,ke,b,.55*A+.1,k.color,.9*A),W.push(Pe,ke,b*.8,.2*A+.05,mn,.8*A)}}function _t(J){for(let j=m.length-1;j>=0;j--){let te=m[j];if(te.age+=J,te.age>=te.life){m.splice(j,1);continue}let k=te.age/te.life,N=te.len*(.55+.45*(1-Math.pow(1-k,3)));Pe.set(te.x+te.dx*N,1.05,te.z+te.dz*N),ke.set(te.dx,0,te.dz),W.push(Pe,ke,N*.8,.42*(1-k*.5),te.color,.9*(1-k)),W.push(Pe,ke,N*.5,.16,mn,.9*(1-k))}}function Cn(J,j){for(let[te,k]of x){let N=J.get(te);if(!N){x.delete(te);continue}if(N.state!=="charge"&&(k.age+=j),k.age>=.25){x.delete(te);continue}let K=N.pos.x-k.x,ie=N.pos.z-k.z,b=Math.hypot(K,ie);if(b<.05)continue;let A=1-k.age/.25,B=Be(N);if(Pe.set(N.pos.x,.9,N.pos.z),ke.set(K/b,0,ie/b),W.push(Pe,ke,b,.95*A+.1,B,.85*A),W.push(Pe,ke,b*.85,.35*A+.05,mn,.85*A),N.state==="charge"){let G=N.pos.x-k.lx,V=N.pos.z-k.lz,ae=Math.hypot(G,V),xe=Math.max(1,Math.ceil(ae/.15));for(let Ie=0;Ie<xe;Ie++){let Re=(Ie+.5)/xe;O.spawn({x:k.lx+G*Re,y:M(.6,1.2),z:k.lz+V*Re,size:.75,size1:.35,color:B,alpha:.55,life:.28,drag:2})}O.spawn({x:N.pos.x,y:.12,z:N.pos.z,vx:-K/b*2,vy:M(.3,1),vz:-ie/b*2,size:.4,size1:.9,color:Df,alpha:.5,life:.4,drag:3})}k.lx=N.pos.x,k.lz=N.pos.z}}function In(J){E||(E=new sc(o,4)),E.begin();for(let j=y.length-1;j>=0;j--){let te=y[j];if(te.age+=J,te.age>=te.lead+.2){y.splice(j,1);continue}let k=Mt(te.age/te.lead,0,1),N=te.age>te.lead?1-(te.age-te.lead)/.2:1,K=.85+.15*Math.sin(te.age*18);E.push(te.x,te.z,1.1,k,Ss,N*K)}E.end()}function $n(J,j){O.spawn({x:J.x,y:1,z:J.z,size:1.4,size1:.5,color:Vh,alpha:.9,life:.16});for(let te=0;te<36;te++){let k=Math.atan2(-j.z,-j.x)+(L()-.5)*2.8,N=M(4,10);O.spawn({x:J.x,y:M(.6,1.5),z:J.z,vx:Math.cos(k)*N,vy:M(.5,3.5),vz:Math.sin(k)*N,size:M(.13,.25),size1:.05,color:Vh,alpha:1,life:M(.2,.32),gravity:9,drag:3,crisp:1})}}function z(){for(let J of Ce.values())J.dispose();Ce.clear(),qe.clear(),I.clear(),O.clear(),oe.length=0,ue.length=0,T.clear(),m.length=0,x.clear(),y.length=0;for(let J of q)J.on=!1,J.mesh.visible=!1;Me.clear(),he=0,De=0,re=0,vt=0,F=1}nt(Ye,He);let me=[];function we(){if(at.myth||!Oh("v4"))return;let J=Math.random,j=625341585;Math.random=()=>{j=j+1831565813>>>0;let N=j;return N=Math.imul(N^N>>>15,N|1),N^=N+Math.imul(N^N>>>7,N|61),((N^N>>>14)>>>0)/4294967296};let te=i.getRenderTarget(),k=new At;try{at.myth=!0;let N=new Ii,K=ec(N,t,l);h.myth={world:K,background:N.background,fog:N.fog},N.environment=d(),N.environmentIntensity=.7;for(let[ie,b]of[[0,"myth"],[1,"myth-shield"],[2,"myth-archer"]])me.push(new Io(N,ie,b));r(),i.compile(N,C);for(let ie of[...o.children])ie!==c.root&&i.compile(ie,C,N);N.traverse(ie=>{let b=ie.material;for(let A of Array.isArray(b)?b:b?[b]:[])for(let B of Object.values(A))B&&B.isTexture&&i.initTexture(B)}),i.setRenderTarget(null),i.getViewport(k),i.setViewport(0,0,4,4),i.render(N,C)}finally{at.myth=!1,r(),i.setRenderTarget(te),k.z>0&&i.setViewport(k),Math.random=J}}return we(),{render:it,resize:nt,worldToScreen:Ft,screenToGround:St,reset:z,setDemoLooks:J=>{g.clear();for(let[j,te]of Object.entries(J))g.set(Number(j),te)},blockSpark:$n,setKnockTrails:J=>{P=J},lookOf:J=>Ce.get(J)?.look??null,drawn:J=>Ce.get(J)?.root.visible??!1}}var Mr=62,Gh=50,Wh=.14,dy=14,fy=1.1,cc=.8,ws={basic:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v10M24 34v10M4 24h10M34 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',control:'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="21" r="2.5" fill="currentColor"/><path d="M21 4v8M21 30v8M4 21h8M30 21h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="8" fill="#0b1a2b" stroke="currentColor" stroke-width="2.5"/><path d="M36 31v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',push:'<svg viewBox="0 0 48 48"><path d="M8 24l12-10v7h8v6h-8v7z" fill="currentColor"/><path d="M32 10l6 6M34 24h8M32 38l6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',dash:'<svg viewBox="0 0 48 48"><path d="M8 12l12 12-12 12M22 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ko={basic:'<svg viewBox="0 0 48 48"><path d="M6 42L31 17" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M27.5 13.5L42 6l-7.5 14.5z" fill="currentColor"/><path d="M4 32l8-8M14 44l8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/></svg>',control:'<svg viewBox="0 0 48 48"><path d="M6 38Q18 10 40 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 5" opacity="0.65"/><path d="M12 36l24-12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M34 17l11 6-11 7z" fill="currentColor"/></svg>',push:'<svg viewBox="0 0 48 48"><circle cx="21" cy="24" r="15" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="21" cy="24" r="2.5" fill="currentColor"/><path d="M40 15l6 9-6 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'},py='<svg viewBox="0 0 48 48"><path d="M4 14h12M2 24h16M4 34h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/><path d="M20 10l14 14-14 14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8v32" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',Of=new URLSearchParams(location.search),ts=Of.get("art")==="myth",Bf=Of.get("cam")==="near",Ff=()=>`${ts?" \xB7 \u795E\u8A71":""}${Bf?" \xB7 \u62C9\u8FD1":""}`;function Uf(s,e){let t=new URLSearchParams(location.search);t.get(s)===e?t.delete(s):t.set(s,e);let n=t.toString();history.replaceState(null,"",`${location.pathname}${n?`?${n}`:""}${location.hash}`),location.reload()}var Xh=[{id:"basic",label:"\u57FA\u790E\u653B\u64CA",cls:"big"},{id:"dash",label:"\u4F4D\u79FB",cls:""},{id:"control",label:"\u63A7\u5236",cls:""},{id:"push",label:"\u64CA\u9000",cls:""}],my=(s,e)=>`
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
    <div class="btns row"><div class="tbtn" role="button" data-act="art-toggle">\u756B\u9762\uFF1A${e?"\u795E\u8A71\u907A\u8DE1\uFF08\u5019\u9078\uFF09":"\u73FE\u884C"}</div><div class="tbtn" role="button" data-act="cam-toggle">\u93E1\u982D\uFF1A${Bf?"\u62C9\u8FD1":"\u5168\u5CF6"}</div><button class="ghost small" data-act="howto">\u64CD\u4F5C\u8AAA\u660E</button></div>
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
`,Nf=(s,e)=>{let t=Math.hypot(s,e);return t<1e-6?null:{x:s/t,z:e/t}};function zf(s,e){s.innerHTML=my(ts?{...ws,...ko}:ws,ts),s.classList.toggle("art-myth",ts);let t=z=>s.querySelector(z),n=t(".hud"),i=t(".controls"),r={title:t(".menu-title"),howto:t(".menu-howto"),pause:t(".menu-pause"),result:t(".menu-result")},o=t(".stick-zone"),a=t(".stick"),l=t(".knob"),c=t(".hp-fill"),h=t(".hp-text"),u=t(".timer"),d=t(".ver"),f=t(".banner"),v=Object.fromEntries(Xh.map(z=>[z.id,t(`.skill.${z.id}`)])),_=Object.fromEntries(Xh.map(z=>[z.id,{ring:v[z.id].querySelector(".cd"),text:v[z.id].querySelector(".cdt")}])),g=document.querySelector('meta[name="build-sha"]')?.getAttribute("content")??"",p=`${ss} \xB7 ${g&&!g.startsWith("__")?g:"dev"}${Ff()}`;d.textContent=p,t(".title-ver").textContent=`${ss}${Ff()}`;let m=!1,x=!1,y=!1,E="1v1",T="s0",P=2.6,C="ares",S=!1,w=null,R={basic:null,control:null,push:null},D=null,I=!1,O=!1,W=!1,$=!1,Z=!1,q=new Set,oe=null,ue=!1,Me=!1,Ce=!1,qe=0,Ye=0,He=null,ee=()=>m&&!x,Y=()=>T==="v4",he=()=>T==="v4"&&C==="mars";function De(z,me){return me!=="basic"&&z.dragged&&Math.hypot(z.x-z.cx,z.y-z.cy)<z.r*cc}function re(z){let me=Nf(z.x-z.cx,z.y-z.cy);return me&&Math.hypot(z.x-z.cx,z.y-z.cy)>=z.r*cc&&(z.lastDir=me),z.lastDir}function Ge(){if(!Ce)return null;let z=e.getPlayerPos(),me=z&&e.screenToGround(qe,Ye);return!z||!me||(He=Nf(me.x-z.x,me.z-z.z)??He),He}function vt(){a.classList.remove("active"),a.style.left=a.style.top=a.style.bottom="",l.style.transform=""}function F(){w=null,vt();for(let z of["basic","control","push"])R[z]=null;for(let z of Object.keys(v))v[z].classList.remove("pressed","aiming","cancelling","autoaim");D=null,I=!1,O=!1,W=!1,q.clear(),oe=null,ue=!1,Me=!1,$=!1,Z=!1}o.addEventListener("pointerdown",z=>{if(z.pointerType==="mouse"||w||!ee())return;z.preventDefault(),o.setPointerCapture(z.pointerId);let me=Math.min(Math.max(z.clientX,Mr+4),window.innerWidth-Mr-4),we=Math.min(Math.max(z.clientY,Mr+4),window.innerHeight-Mr-4);w={pid:z.pointerId,cx:me,cy:we,move:{x:0,z:0}},a.classList.add("active"),a.style.left=`${me-Mr}px`,a.style.top=`${we-Mr}px`,a.style.bottom="auto",ht(z)});function ht(z){if(!w||z.pointerId!==w.pid)return;let me=z.clientX-w.cx,we=z.clientY-w.cy,Ke=Math.hypot(me,we),Fe=Ke>Gh?Gh/Ke:1;l.style.transform=`translate(${me*Fe}px, ${we*Fe}px)`;let lt=Math.min(Ke/Gh,1);if(lt<=Wh)w.move={x:0,z:0};else{let It=(lt-Wh)/(1-Wh);w.move={x:me/Ke*It,z:we/Ke*It}}}function Pe(z){!w||z.pointerId!==w.pid||(w=null,vt())}o.addEventListener("pointermove",ht),o.addEventListener("pointerup",Pe),o.addEventListener("pointercancel",Pe);for(let z of["basic","control","push"]){let me=v[z];me.addEventListener("pointerdown",Ke=>{if(R[z]||!ee())return;Ke.preventDefault(),me.setPointerCapture(Ke.pointerId);let Fe=me.getBoundingClientRect();R[z]={pid:Ke.pointerId,cx:Fe.left+Fe.width/2,cy:Fe.top+Fe.height/2,r:Fe.width/2,sx:Ke.clientX,sy:Ke.clientY,x:Ke.clientX,y:Ke.clientY,dragged:!1,lastDir:null},me.classList.add("pressed"),z==="basic"&&Y()&&(O=!0),z==="push"&&he()&&(W=!0,me.classList.add("autoaim"))}),me.addEventListener("pointermove",Ke=>{let Fe=R[z];if(!(!Fe||Ke.pointerId!==Fe.pid)){if(Fe.x=Ke.clientX,Fe.y=Ke.clientY,!Fe.dragged&&Math.hypot(Fe.x-Fe.sx,Fe.y-Fe.sy)>=dy&&Math.hypot(Fe.x-Fe.cx,Fe.y-Fe.cy)>Fe.r*fy&&(Fe.dragged=!0),z==="push"&&he()){let lt=!Fe.dragged||Math.hypot(Fe.x-Fe.cx,Fe.y-Fe.cy)<Fe.r*cc;me.classList.toggle("aiming",!lt),me.classList.toggle("autoaim",lt);return}me.classList.toggle("aiming",Fe.dragged),me.classList.toggle("cancelling",De(Fe,z))}});let we=(Ke,Fe)=>{let lt=R[z];!lt||Ke.pointerId!==lt.pid||(lt.x=Ke.clientX,lt.y=Ke.clientY,R[z]=null,me.classList.remove("pressed","aiming","cancelling","autoaim"),!(z==="basic"||Fe||!ee())&&(z==="push"&&he()||(lt.dragged?De(lt,z)||(D={skill:z,dir:re(lt)}):D={skill:z,dir:null})))};me.addEventListener("pointerup",Ke=>we(Ke,!1)),me.addEventListener("pointercancel",Ke=>we(Ke,!0))}v.dash.addEventListener("pointerdown",z=>{ee()&&(z.preventDefault(),I=!0,v.dash.classList.add("pressed"))});let ke=()=>v.dash.classList.remove("pressed");v.dash.addEventListener("pointerup",ke),v.dash.addEventListener("pointercancel",ke);let ge=z=>{oe||(oe=z,ue=!1)};window.addEventListener("keydown",z=>{if(nt(),z.code==="Escape"){if(z.repeat)return;oe&&!ue?ue=!0:ee()&&L();return}if(ee()){if(z.repeat){z.code==="Space"&&z.preventDefault();return}switch(z.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":q.add(z.code);break;case"KeyQ":ge("control");break;case"KeyE":he()?$||($=!0,W=!0,v.push.classList.add("pressed","autoaim")):ge("push");break;case"KeyJ":Y()&&!Z&&(Z=!0,O=!0,v.basic.classList.add("pressed"));break;case"Space":z.preventDefault(),I=!0;break;case"ShiftLeft":case"ShiftRight":I=!0;break}}}),window.addEventListener("keyup",z=>{q.delete(z.code),z.code==="KeyE"&&$&&($=!1,v.push.classList.remove("pressed","autoaim")),z.code==="KeyJ"&&Z&&(Z=!1,v.basic.classList.remove("pressed"));let me=z.code==="KeyQ"?"control":z.code==="KeyE"?"push":null;me&&oe===me&&(!ue&&ee()&&(D={skill:me,dir:Ge()}),oe=null,ue=!1)});let xt=z=>!z.target.closest(".skill, .pause, .menu, .stick");window.addEventListener("pointerdown",z=>{if(z.pointerType==="mouse"){if(Ce=!0,qe=z.clientX,Ye=z.clientY,z.button===2){oe&&(ue=!0);return}z.button===0&&ee()&&xt(z)&&(Me=!0,Y()&&(O=!0))}}),window.addEventListener("pointermove",z=>{z.pointerType==="mouse"&&(Ce=!0,qe=z.clientX,Ye=z.clientY)}),window.addEventListener("pointerup",z=>{z.pointerType==="mouse"&&z.button===0&&(Me=!1)}),window.addEventListener("blur",F),document.addEventListener("visibilitychange",()=>{document.hidden&&(F(),ee()&&L())});let Le=z=>z.preventDefault();for(let z of["gesturestart","gesturechange","gestureend","dblclick","contextmenu","selectstart","dragstart"])document.addEventListener(z,Le);document.addEventListener("touchmove",z=>{z.target.closest?.(".edge-list")||z.preventDefault()},{passive:!1});function nt(){S||(S=!0,e.onFirstGesture())}window.addEventListener("pointerup",nt,!0);let Ft=()=>{for(let z of Object.values(r))z.hidden=!0};function St(z,me,we){E=z,T=me,we&&(C=we),ne(),me==="v3"?e.onStart(z,me,{ledgeDepth:P}):me==="v4"?e.onStart(z,me,{path:C}):e.onStart(z,me),$n.showPlaying()}function L(){F(),x=!0,e.onPause(),r.pause.hidden=!1}let M=t('[data-act="mute"]');s.addEventListener("click",z=>{let me=z.target.closest("[data-act]")?.getAttribute("data-act");if(me)switch(me){case"start-v2-1v1":St("1v1","v2");break;case"art-toggle":Uf("art","myth");break;case"cam-toggle":Uf("cam","near");break;case"start-v3-1v1":St("1v1","v3");break;case"v4-ares":St("waves","v4","ares");break;case"v4-mars":St("waves","v4","mars");break;case"v4-none":St("waves","v4","none");break;case"ledge-depth":P=P===2.6?1.5:2.6,z.target.closest("[data-act]").textContent=`\u6500\u9644\u9580\u6ABB\uFF1A${P}`;break;case"start-s0-1v1":St("1v1","s0");break;case"start-s0-1v2":St("1v2","s0");break;case"again":case"restart":St(E,T,C);break;case"howto":r.title.hidden=!0,r.howto.hidden=!1;break;case"back":r.howto.hidden=!0,r.title.hidden=!1;break;case"resume":x=!1,r.pause.hidden=!0,e.onResume();break;case"title":$n.showTitle();break;case"mute":y=!y,M.textContent=`\u97F3\u6548\uFF1A${y?"\u95DC":"\u958B"}`,e.setMuted(y);break}}),t(".pause").addEventListener("click",()=>{ee()&&L()});let X={basic:"",control:"",push:"",dash:""};function ne(){let z=T==="v4",me={basic:z||ts?{tag:"myth",svg:ko.basic}:{tag:"default",svg:ws.basic},control:z||ts?{tag:"myth",svg:ko.control}:{tag:"default",svg:ws.control},push:z&&C==="ares"?{tag:"charge",svg:py}:z?C==="mars"?{tag:"myth",svg:ko.push}:{tag:"default",svg:ws.push}:ts?{tag:"myth",svg:ko.push}:{tag:"default",svg:ws.push},dash:{tag:"default",svg:ws.dash}};for(let we of Object.keys(me))X[we]!==me[we].tag&&(X[we]=me[we].tag,v[we].dataset.icon=me[we].tag,v[we].querySelector("svg").outerHTML=me[we].svg)}X.basic=ts?"myth":"default",X.control=X.basic,X.push=X.basic,X.dash="default";let le={ares:"\u963F\u745E\u65AF",mars:"\u746A\u723E\u65AF",none:"\u7121\u9053\u8DEF"},Q=1.5,Oe=-1,fe=t(".revive-n"),ze=t(".revive"),We=t(".wave"),pe=t(".protect"),Ee=t(".reviving"),Be=t(".reviving-t"),Ve=z=>z.variant==="v4"?`\u5019\u9078 v0.4\uFF08${le[z.v4?.path??C]}\uFF09`:z.variant==="v3"?`\u5019\u9078 v0.3\uFF08\u6500\u9644 ${z.ledgeDepth??2.6}\uFF09`:z.variant==="v2"?"\u5019\u9078 v0.2":"S0 \u57FA\u6E96",_e={ver:"",hp:"",fill:"",time:"",low:!1},ot={basic:{ring:"",text:"",cooling:!1},control:{ring:"",text:"",cooling:!1},push:{ring:"",text:"",cooling:!1},dash:{ring:"",text:"",cooling:!1}},H={knock:"\u64CA\u9000",dash:"\u885D\u523A"},ve={predicted:"\u9810\u8A08",actual:"\u5BE6\u969B"},Se={"dash-out":"\u4E3B\u52D5\u885D\u523A","too-deep":"\u592A\u6DF1",locked:"\u9396\u5B9A\u4E2D","no-landing":"\u7121\u843D\u9EDE"},Ue={pending:"\u9032\u884C\u4E2D",rescue:"\u6551\u56DE",climbed:"\u7FFB\u56DE",knocked:"\u88AB\u6253\u843D",timeout:"\u6642\u9593\u5230",hp:"\u8840\u76E1",fall:"\u589C\u843D"},de=z=>z.startsWith("accepted")?`\u5DF2\u6309${z.slice(8)}`:z.startsWith("buffered")?`\u63D0\u65E9\u6309${z.slice(8)}`:z==="none"?"\u6C92\u6309":z,ce=z=>[`${z.t.toFixed(1)}s`,z.who,H[z.source]??z.source,z.depth===null?"\u2014":`${z.depth.toFixed(1)}${z.basis?` ${ve[z.basis]}`:""}`,z.eligible?"\u53EF\u6500\u9644":`\u4E0D\u53EF\uFF08${z.reason?Se[z.reason]??z.reason:"\u2014"}\uFF09`,de(z.input),Ue[z.outcome]??z.outcome],Ne=t(".edge"),it=t(".edge-list");Ne.addEventListener("toggle",()=>r.result.classList.toggle("edge-open",Ne.open));function Rt(z){let me=z.edgeLog??[];Ne.hidden=me.length===0&&z.variant!=="v3",Ne.open=!1,r.result.classList.remove("edge-open"),t(".edge-n").textContent=String(me.length);let we=document.createElement("table"),Ke=we.insertRow();for(let Fe of["\u6642\u9593","\u8AB0","\u4F86\u6E90","\u6DF1\u5EA6","\u53EF\u5426\u6500\u9644","\u7FFB\u56DE\u9375","\u7D50\u679C"]){let lt=document.createElement("th");lt.textContent=Fe,Ke.appendChild(lt)}for(let Fe of me){let lt=we.insertRow();for(let It of ce(Fe))lt.insertCell().textContent=It}if(me.length===0){let Fe=we.insertRow().insertCell();Fe.colSpan=7,Fe.textContent="\u672C\u5834\u6C92\u6709\u51FA\u754C"}it.replaceChildren(we)}function _t(z){let me=t(".v4res"),we=z.v4;if(me.hidden=!we,!we)return;let Ke=(lt,It)=>we.kills.filter(Pt=>Pt.how===lt&&Pt.where===It).length,Fe=(lt,It)=>`${It} ${Ke(lt,"center")+Ke(lt,"edge")}\uFF08\u4E2D\u592E ${Ke(lt,"center")}\uFF0F\u5D16\u908A ${Ke(lt,"edge")}\uFF09`;t(".v4kills").textContent=`${Fe("hp","\u6253\u6B7B")}\u3000${Fe("fall","\u64CA\u843D")}`,t(".v4meta").textContent=`${le[we.path]} \xB7 \u7B2C ${we.wave.index}\uFF0F${we.wave.total} \u6CE2 \xB7 \u7834\u9632 ${we.breaks} \xB7 \u5B8C\u7F8E\u683C\u64CB ${we.perfectBlocks} \xB7 \u53CD\u64CA \u76FE\u64CA ${we.counters.bash}\uFF0F\u8FD1\u8EAB ${we.counters.melee}`}let Cn=null;function In(z,me){let we=z.v4,Ke=we?.revivesLeft??0;if(fe.textContent=`\xD7${Ke}`,ze.classList.toggle("spent",Ke<=0),we){let Pt=we.wave.index;We.textContent=`\u7B2C ${Pt} \u6CE2`,Pt!==Oe&&(Oe=Pt,Pt>0&&$n.banner(`\u7B2C ${Pt} \u6CE2`,"info"))}let Fe=me.protectT??0;pe.classList.toggle("on",Fe>0),Fe>0&&(pe.textContent=`\u4FDD\u8B77\u4E2D ${Fe.toFixed(1)}`),c.parentElement.classList.toggle("protected",Fe>0);let lt=me.state==="reviving";Ee.classList.toggle("on",lt),lt&&(Be.textContent=Math.max(0,Q-me.stateT).toFixed(1));let It=(me.counterT??0)>0;v.basic.classList.toggle("counter",It),v.push.classList.toggle("counter",It)}let $n={readIntent(){let z={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null};if(!ee())return D=null,I=!1,O=!1,W=!1,z;let me;if(w)me=w.move;else{let Pt=(q.has("KeyD")?1:0)-(q.has("KeyA")?1:0),J=(q.has("KeyS")?1:0)-(q.has("KeyW")?1:0);Pt&&J&&(Pt*=Math.SQRT1_2,J*=Math.SQRT1_2),me={x:Pt,z:J}}let we=R.basic,Ke=Y(),Fe=!!we||Me||Z||Ke&&O,lt=null;we&&we.dragged?lt=re(we):!we&&Me&&(lt=Ge());let It={move:{x:me.x,z:me.z},fire:Fe,fireDir:lt,cast:D,dash:I,dashDir:null};if(Ke&&(It.firePressed=O),he()){let Pt=R.push;It.guardHeld=!!Pt||$||W,It.guardPressed=W,It.guardDir=Pt&&Pt.dragged&&Math.hypot(Pt.x-Pt.cx,Pt.y-Pt.cy)>=Pt.r*cc?re(Pt):null}return D=null,I=!1,O=!1,W=!1,It},aimPreview(){if(!ee())return null;for(let me of["control","push"]){if(me==="push"&&he())continue;let we=R[me];if(we&&we.dragged){let Ke=De(we,me),Fe=re(we);if(Fe)return{skill:me,dir:Fe,cancel:Ke}}}if(oe)return{skill:oe,dir:Ge()??{x:1,z:0},cancel:ue};let z=R.basic;if(z&&z.dragged){let me=re(z);if(me)return{skill:"basic",dir:me,cancel:!1}}if(!z&&Me){let me=Ge();if(me)return{skill:"basic",dir:me,cancel:!1}}return null},update(z){let me=`${Ve(z)} \xB7 ${p}`;me!==_e.ver&&(_e.ver=me,d.textContent=me);let we=z.fighters.find(j=>j.id===z.playerId);if(!we)return;let Fe=`${Math.max(0,Math.ceil(we.hp))} / ${Math.ceil(we.maxHp)}`;Fe!==_e.hp&&(_e.hp=Fe,h.textContent=Fe);let lt=`${Math.max(0,Math.min(1,we.hp/we.maxHp))*100}%`;lt!==_e.fill&&(_e.fill=lt,c.style.width=lt);let It=we.hp/we.maxHp<.3;It!==_e.low&&(_e.low=It,c.classList.toggle("low",It));let Pt=Math.max(0,Math.floor(z.time)),J=`${String(Math.floor(Pt/60)).padStart(2,"0")}:${String(Pt%60).padStart(2,"0")}`;J!==_e.time&&(_e.time=J,u.textContent=J),(z.variant!==T||z.variant==="v4"&&we.path&&we.path!==C)&&(T=z.variant,E=z.mode,we.path&&(C=we.path),ne()),n.classList.toggle("v4",z.variant==="v4"),z.variant==="v4"&&In(z,we),v.dash.classList.toggle("ledge",we.state==="ledge"),v.dash.classList.toggle("climbing",we.state==="climb");for(let j of Object.keys(_)){let k=j==="dash"&&(we.state==="ledge"||we.state==="climb")?0:we.cooldowns[j]??0,N=we.cooldownMax[j]??0,ie=`${((N>0?Math.max(0,Math.min(1,k/N)):0)*360).toFixed(0)}deg`,b=j!=="basic"&&k>.05?k>=10?k.toFixed(0):k.toFixed(1):"",A=ot[j];ie!==A.ring&&(A.ring=ie,_[j].ring.style.setProperty("--cd",ie)),b!==A.text&&(A.text=b,_[j].text.textContent=b);let B=k>.05;B!==A.cooling&&(A.cooling=B,v[j].classList.toggle("cooling",B))}},showTitle(){F(),m=!1,x=!1,Ft(),n.hidden=!0,i.hidden=!0,r.title.hidden=!1},showResult(z){F(),m=!1,x=!1,E=z.mode,T=z.variant,z.ledgeDepth&&(P=z.ledgeDepth),z.v4&&(C=z.v4.path),Ft(),n.hidden=!0,i.hidden=!0;let me=z.result==="win",we=r.result;we.classList.toggle("win",me),we.classList.toggle("lose",!me),we.querySelector(".res-title").textContent=me?"\u52DD\u5229":"\u5931\u6557",we.querySelector(".res-text").textContent=me?"":z.loseText??"";let Ke=z.stats,Fe=(lt,It)=>{we.querySelector(`[data-stat="${lt}"]`).textContent=It};Fe("acc",Ke.shotsFired>0?`${Math.round(Ke.shotsHit*100/Ke.shotsFired)}%\uFF08${Ke.shotsHit}/${Ke.shotsFired}\uFF09`:"\u2014"),Fe("combos",String(Ke.combos)),Fe("fall",String(Ke.kills.fall)),Fe("hp",String(Ke.kills.hp)),Rt(z),_t(z),we.hidden=!1},showPlaying(){F(),m=!0,x=!1,Ft(),n.hidden=!1,i.hidden=!1,Oe=-1;for(let z of[pe,Ee])z.classList.remove("on");v.basic.classList.remove("counter"),v.push.classList.remove("counter"),n.classList.toggle("v4",T==="v4")},banner(z,me){f.textContent=z,f.className=`banner ${me}`,Cn?.cancel(),typeof f.animate=="function"&&(Cn=f.animate([{opacity:0,transform:"translate(-50%, 0) scale(0.7)"},{opacity:1,transform:"translate(-50%, 0) scale(1.05)",offset:.15},{opacity:1,transform:"translate(-50%, 0) scale(1)",offset:.65},{opacity:0,transform:"translate(-50%, -14px) scale(1)"}],{duration:1200,easing:"ease-out",fill:"both"}))}};return $n.showTitle(),$n}var gy={shootP:.05,shootE:.14,hitP:.05,hitE:.07,hurt:.12,windupH:.4,windupB:.25,windupP:.2,windupEP:.35,windupEC:.3,shootEC:.2,strikeBlocked:.2,ledgeGrabP:.3,ledgeGrabE:.3,ledgeRdy:.1,ledgeClimbP:.2,ledgeClimbE:.2,ledgeDropP:.3,ledgeDropE:.3,meleeP:.08,meleeE:.15,blockB:.12,blockG:.1,blockPf:.2,recoilP:.15,recoilE:.2,gBreak:.5,armorP:.4,armorE:.4,chargeP:.3,chargeE:.3,cReady:.3,cUsed:.15,cLost:.3,reviveS:.5,reviveG:.5,wave:.6,windupM:.2,cast:.1,dash:.1,blocked:.07,fall:.3,combo:.15};function Hf(){let s=null,e=null,t=null,n=!1,i=0,r={},o=new Map,a=.2;function l(m){let x=o.get(m);x!==void 0&&(clearTimeout(x),o.delete(m))}function c(){if(s)return s;let m=window,x=m.AudioContext||m.webkitAudioContext;if(!x)return null;try{s=new x}catch{return null}e=s.createGain(),e.gain.value=n?0:.5;let y=s.createDynamicsCompressor();y.threshold.value=-18,y.ratio.value=6,y.attack.value=.003,y.release.value=.15,e.connect(y),y.connect(s.destination),t=s.createBuffer(1,s.sampleRate,s.sampleRate);let E=t.getChannelData(0);for(let T=0;T<E.length;T++)E[T]=Math.random()*2-1;return s}function h(m){return i>=28?!1:(i++,setTimeout(()=>{i=Math.max(0,i-1)},(m+.1)*1e3),!0)}function u(m,x,y,E,T=.004){m.gain.setValueAtTime(1e-4,x),m.gain.linearRampToValueAtTime(y,x+T),m.gain.exponentialRampToValueAtTime(1e-4,x+E)}function d(m,x,y,E,T,P,C=0){if(!e||!h(T+C))return;let S=m.currentTime+C,w=m.createOscillator(),R=m.createGain();w.type=x,w.frequency.setValueAtTime(y,S),E!==y&&w.frequency.exponentialRampToValueAtTime(Math.max(20,E),S+T),u(R,S,P,T),w.connect(R),R.connect(e),w.start(S),w.stop(S+T+.02)}function f(m,x,y,E,T,P,C,S=0){if(!e||!t||!h(P+S))return;let w=m.currentTime+S,R=m.createBufferSource();R.buffer=t,R.loop=!0;let D=m.createBiquadFilter();D.type=x,D.Q.value=T,D.frequency.setValueAtTime(y,w),E!==y&&D.frequency.exponentialRampToValueAtTime(Math.max(20,E),w+P);let I=m.createGain();u(I,w,C,P,.006),R.connect(D),D.connect(I),I.connect(e),R.start(w,Math.random()*.5),R.stop(w+P+.02)}function v(m,x){let y=m.currentTime;return y-(r[x]??-1)<(gy[x]??.05)?!1:(r[x]=y,!0)}function _(m,x,y){let E=x==="melee3"||x==="charge"||x==="counterBash",T=y?1.15:1;d(m,"sine",E?130:160,E?48:70,E?.3:.18,(E?.55:.42)*T),f(m,"lowpass",E?1100:1500,200,.7,E?.2:.11,(E?.3:.22)*T),(x==="counterBash"||x==="counterMelee")&&d(m,"triangle",880,660,.1,.12,.02),y&&d(m,"triangle",300,200,.1,.1)}function g(m,x,y){if(x==="melee1"||x==="melee2"||x==="melee3"||x==="charge"||x==="counterBash"||x==="counterMelee"){_(m,x,y);return}let E=x==="push"||x==="enemyHeavy";y?(d(m,"sine",E?150:200,E?55:90,E?.32:.2,E?.5:.36),f(m,"lowpass",1400,300,.7,E?.26:.14,E?.3:.2),d(m,"triangle",330,220,.12,.12)):E?(d(m,"sine",170,60,.28,.42),f(m,"bandpass",900,250,.9,.22,.26)):x==="control"?(d(m,"triangle",520,300,.12,.2),f(m,"bandpass",2400,1400,1.2,.09,.14)):(d(m,"square",760,520,.05,.07),f(m,"highpass",3e3,3e3,.7,.05,.1))}function p(m,x,y){switch(x.type){case"shoot":{let E=x.ownerId===y;if(!v(m,E?"shootP":x.kind==="control"?"shootEC":"shootE"))return;if(!E&&x.kind==="control")d(m,"sawtooth",240,150,.14,.09),f(m,"bandpass",700,350,2,.12,.09);else if(E){let T=x.kind==="control";d(m,"square",T?520:900,T?260:380,.07,.07),f(m,"bandpass",2600,1200,1.4,.05,.08)}else d(m,"sine",300,150,.09,.1),f(m,"lowpass",900,400,.8,.06,.08);return}case"hit":{let E=x.targetId===y;if(!E&&x.sourceId!==y||!v(m,E?"hurt":"hitP"))return;g(m,x.kind,E);return}case"windupStart":{if(x.skill==="enemyHeavy"){if(!v(m,"windupH"))return;d(m,"triangle",392,440,.16,.26),d(m,"triangle",523,587,.2,.28,.15),d(m,"sine",196,262,Math.min(.5,x.dur),.18)}else if(x.skill==="enemyBasic"){if(!v(m,"windupB"))return;d(m,"sine",620,700,.06,.07)}else if(x.skill==="melee1"||x.skill==="melee2"||x.skill==="melee3"||x.skill==="charge"){if(x.ownerId===y||!v(m,"windupM"))return;x.skill==="charge"?(d(m,"sawtooth",80,140,Math.min(.4,x.dur),.14),f(m,"lowpass",300,700,.8,.25,.1)):d(m,"sine",330,x.skill==="melee3"?420:380,.08,.09)}else if(x.ownerId!==y&&x.skill==="push"){if(!v(m,"windupEP"))return;d(m,"sine",90,190,.2,.3),f(m,"lowpass",300,1100,.9,.18,.16)}else if(x.ownerId!==y&&x.skill==="control"){if(!v(m,"windupEC"))return;d(m,"sawtooth",700,1500,.14,.1),f(m,"bandpass",2400,4200,3,.1,.1)}else if(x.ownerId===y){if(!v(m,"windupP"))return;d(m,"sine",240,380,Math.min(.3,x.dur),.09)}return}case"cast":{if(!v(m,"cast"))return;let E=x.skill==="enemyHeavy";d(m,"sine",E?120:140,40,.38,E?.55:.5),f(m,"lowpass",1800,150,.8,.3,.3);return}case"dash":{if(!v(m,"dash"))return;let E=x.ownerId===y;f(m,"bandpass",600,3800,1.1,.22,E?.26:.14);return}case"blocked":{if(!v(m,"blocked"))return;d(m,"triangle",190,110,.07,.2),f(m,"bandpass",1500,900,2,.06,.2);return}case"fall":{if(!v(m,"fall"))return;let T=x.ownerId===y?.3:.2;f(m,"bandpass",1800,220,1.6,.9,T),d(m,"sine",700,120,.9,T*.45);return}case"blockedStrike":{if(!v(m,"strikeBlocked"))return;let E=x.ownerId===y||x.targetId===y?1:.5;d(m,"sine",110,45,.3,.5*E),f(m,"lowpass",700,120,.8,.22,.3*E);return}case"ledgeGrab":{let E=x.ownerId===y;if(!v(m,E?"ledgeGrabP":"ledgeGrabE"))return;d(m,"sine",95,50,.26,E?.5:.28),f(m,"bandpass",1800,500,1.1,.2,E?.26:.16),f(m,"highpass",4200,2600,.7,.07,E?.1:.06,.05),E||(d(m,"square",740,740,.06,.1,.04),d(m,"square",988,988,.08,.1,.13)),l(x.ownerId),o.set(x.ownerId,setTimeout(()=>{o.delete(x.ownerId),!(n||!s||s.state!=="running"||!v(s,"ledgeRdy"))&&(E?d(s,"sine",1040,1040,.05,.1):d(s,"sawtooth",1480,1480,.07,.09))},a*1e3));return}case"ledgeClimb":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeClimbP":"ledgeClimbE"))return;f(m,"bandpass",500,2200,1,.18,E?.22:.12),d(m,"triangle",E?220:300,E?420:600,.16,E?.16:.09),d(m,"sine",E?120:160,E?70:100,.12,E?.3:.16,.17);return}case"ledgeDrop":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeDropP":"ledgeDropE"))return;let T=E?1:.6;x.reason==="knocked"?(d(m,"sine",180,55,.3,.45*T),f(m,"lowpass",1600,250,.8,.24,.26*T)):(f(m,"bandpass",3e3,700,1.6,.3,.2*T),d(m,"sine",420,130,.32,.18*T));return}case"melee":{let E=x.ownerId===y;if(!v(m,E?"meleeP":"meleeE"))return;let T=E?1:.55;x.hit?f(m,"bandpass",1500,700,1.2,.07,.07*T):(f(m,"bandpass",x.counter?3200:2400,x.counter?900:600,1.3,.16,.2*T),d(m,"sine",x.step===3?260:340,140,.12,.08*T));return}case"shieldBlock":{if(x.attackerId!==y&&x.targetId!==y)return;if(x.kind==="bearer"){if(!v(m,"blockB"))return;d(m,"sine",410,380,.28,.26),d(m,"sine",655,610,.2,.2),f(m,"highpass",2500,2500,.8,.1,.18)}else if(x.kind==="perfect"){if(!v(m,"blockPf"))return;d(m,"sine",1568,1568,.45,.28),d(m,"sine",2349,2349,.35,.2,.01),d(m,"triangle",3136,3136,.2,.08,.02),f(m,"highpass",6e3,6e3,.7,.08,.12)}else{if(!v(m,"blockG"))return;d(m,"square",1200,900,.07,.1),f(m,"bandpass",3200,2200,1.8,.06,.14)}return}case"recoil":{let E=x.ownerId===y;if(!v(m,E?"recoilP":"recoilE"))return;d(m,"sine",300,110,.12,E?.3:.16);return}case"guardBreak":{if(!v(m,"gBreak"))return;let E=x.targetId===y?1:.8;d(m,"sawtooth",700,520,.09,.14*E),d(m,"sawtooth",820,430,.09,.12*E,.1),d(m,"sawtooth",620,300,.12,.09*E,.2),f(m,"bandpass",2800,500,1.4,.3,.18*E),d(m,"sine",150,60,.25,.3*E,.02);return}case"armor":{let E=x.ownerId===y;if(!v(m,E?"armorP":"armorE"))return;d(m,"sine",70,95,Math.min(.35,x.dur),E?.22:.14),f(m,"lowpass",260,520,.9,.2,E?.1:.06);return}case"charge":{let E=x.ownerId===y;if(!v(m,E?"chargeP":"chargeE"))return;let T=E?1:.6;f(m,"lowpass",350,1100,.9,.4,.3*T),d(m,"sawtooth",70,130,.35,.16*T);return}case"counterReady":{if(x.ownerId!==y||!v(m,"cReady"))return;d(m,"triangle",1175,1175,.12,.18),d(m,"triangle",1568,1568,.2,.2,.09),f(m,"highpass",6500,6500,.7,.1,.06,.09);return}case"counterUsed":{if(x.ownerId!==y||!v(m,"cUsed"))return;x.kind==="bash"?(d(m,"square",700,260,.08,.14),d(m,"sine",110,55,.14,.3)):(f(m,"bandpass",3e3,900,1.3,.1,.16),d(m,"triangle",1318,1318,.08,.12,.02));return}case"counterLost":{if(x.ownerId!==y||!v(m,"cLost"))return;d(m,"sine",880,440,.14,.1);return}case"reviveStart":{if(x.ownerId!==y||!v(m,"reviveS"))return;d(m,"sine",196,165,.5,.2),d(m,"sine",196,165,.45,.1,.28),f(m,"lowpass",500,200,.7,.6,.08);return}case"revive":{if(x.ownerId!==y||!v(m,"reviveG"))return;[392,523.25,659.25,783.99].forEach((E,T)=>d(m,"triangle",E,E,T===3?.45:.14,.2,T*.09));return}case"waveStart":{if(!v(m,"wave"))return;d(m,"sawtooth",220,220,.4,.1),d(m,"sawtooth",330,330,.4,.1,.18),x.index>=x.total-1&&d(m,"sawtooth",440,440,.5,.1,.36);return}case"combo":{if(!v(m,"combo"))return;d(m,"sine",988,988,.14,.2),d(m,"sine",1319,1319,.22,.2,.08),d(m,"triangle",1976,1976,.2,.06,.08);return}case"roundEnd":{let E=x.result==="win",T=E?[523.25,659.25,783.99,1046.5]:[392,349.23,311.13,233.08];T.forEach((P,C)=>{let S=C===T.length-1;d(m,E?"triangle":"sine",P,P,S?.7:.2,.28,C*.17),E&&S&&d(m,"sine",P*1.5,P*1.5,.7,.1,C*.17)});return}default:return}}return{unlock(){let m=c();if(m)try{m.resume();let x=m.createBuffer(1,1,22050),y=m.createBufferSource();y.buffer=x,y.connect(m.destination),y.start(0)}catch{}},play(m,x){if(!(n||!s||!e||m.length===0)){if(s.state!=="running"){s.resume().catch(()=>{});return}for(let y of m)try{p(s,y,x)}catch{}}},setMuted(m){n=m,e&&s&&e.gain.setTargetAtTime(m?0:.5,s.currentTime,.01)}}}function vy(s){let e=/v(\d+(?:\.\d+)*)/.exec(s);return e?e[1]:"0"}function xy(s,e){let t=s.split(".").map(Number),n=e.split(".").map(Number);for(let i=0;i<Math.max(t.length,n.length);i++){let r=(t[i]||0)-(n[i]||0);if(r)return r}return 0}function Vf(s){if(!/^https?:/.test(location.protocol))return;let e=vy(ss),t=document.createElement("button");t.id="updBar",s.appendChild(t);let n=0,i=null;t.addEventListener("click",()=>{i&&location.replace(`${location.pathname}?v=${i}`)});let r=o=>{let a=Date.now();if(!o&&a-n<6e4)return;n=a;let l=`${location.pathname.replace(/[^/]*$/,"")}index.html?upd=${a}`;fetch(l,{cache:"no-store"}).then(c=>c.ok?c.text():"").then(c=>{let h=/<meta name="app-version" content="([\d.]+)"/.exec(c);!h||xy(h[1],e)<=0||(i=h[1],t.textContent=`\u{1F195} \u6709\u65B0\u7248 v${i}\uFF0C\u9EDE\u9019\u88E1\u66F4\u65B0`,t.classList.add("on"))}).catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&r(!1)}),addEventListener("pageshow",()=>r(!1)),setTimeout(()=>r(!0),1500)}var Wf=new URLSearchParams(location.search),yy=document.getElementById("game"),_y=document.getElementById("overlay"),Xf=document.getElementById("ui"),by=Ho(),No=kf(yy,_y,by),qh=Hf(),Bt=null,Er=!1,qf=Wf.get("ai")!=="0",Sr=0,Fo=0,Uo=0,wr=-1,ai=zf(Xf,{onStart:(s,e,t)=>Yf(s,void 0,e,t),onPause:()=>{Er=!0},onResume:()=>{Er=!1},getPlayerPos:()=>Bt?Bt.player.pos:null,screenToGround:(s,e)=>No.screenToGround(s,e),onFirstGesture:()=>qh.unlock(),setMuted:s=>qh.setMuted(s)});function Yf(s,e,t="s0",n={}){let i=e??(Number(Wf.get("seed"))||Date.now()%1e9);Bt=t==="v4"?new Vo(i,n.path??"ares"):new Ot(s,i,t,n.ledgeDepth??2.6),Bt.aiEnabled=qf,No.reset(),ai.showPlaying(),Er=!1,Sr=0,Fo=0,Uo=0,wr=-1}function My(s){if(!Bt)return;let e=Bt.state.playerId;for(let t of s)t.type==="combo"?ai.banner("\u9023\u62DB\uFF01","good"):t.type==="fall"?t.ownerId===e?ai.banner("\u589C\u843D\u2026\u2026","bad"):(ai.banner("\u64CA\u843D\uFF01","good"),Uo=.6):t.type==="death"&&t.ownerId!==e&&t.cause==="hp"?ai.banner("\u64CA\u5012\uFF01","good"):t.type==="edgeSave"&&t.ownerId===e?ai.banner("\u9A5A\u96AA\u6551\u56DE\uFF01","info"):t.type==="roundEnd"&&(wr=1.3)}var Gf=performance.now();function $f(s){let e=Math.min(.1,(s-Gf)/1e3);Gf=s;let t=[],n=0;if(Bt&&!Er){if(Fo>0)Fo-=e;else{let i=Uo>0?.35:1;Uo=Math.max(0,Uo-e),Sr+=e*i;let r=0;for(;Sr>=Ln&&r<6;){Bt.step(ai.readIntent());for(let o of Bt.drainEvents())t.push(o);if(Sr-=Ln,n+=Ln,r++,Bt.hitstop>0){Fo=Math.max(Fo,Bt.hitstop),Bt.hitstop=0,Sr=0;break}}r>=6&&(Sr=0)}My(t),qh.play(t,Bt.state.playerId),wr>0&&(wr-=e,wr<=0&&(wr=-1,ai.showResult(Bt.state)))}Bt&&(No.render(Bt.state,t,Er?null:ai.aimPreview(),n,e),ai.update(Bt.state)),requestAnimationFrame($f)}function Yh(){let s=window.visualViewport;No.resize(s?s.width:innerWidth,s?s.height:innerHeight)}addEventListener("resize",Yh);window.visualViewport?.addEventListener("resize",Yh);Yh();Bt=new Ot("1v1",1);Bt.aiEnabled=!1;ai.showTitle();var Sy={state:()=>JSON.parse(JSON.stringify(Bt.state)),start:(s,e,t,n)=>Yf(s,e,t,n),setAI:s=>{qf=s,Bt&&(Bt.aiEnabled=s)},place:(s,e,t)=>Bt?.place(s,e,t),kill:(s,e)=>Bt?.debugKill(s,e),freeze:s=>{Er=s},knock:(s,e,t)=>{if(!Bt)return;let n=Bt.state.fighters.find(i=>i.id!==s);n&&Bt.debugDamage(s,n.id,"push",t??0,e)},project:(s,e)=>No.worldToScreen(s,e),version:`${ss} (8fdbd20)`};window.__hunter=Sy;Vf(Xf);requestAnimationFrame($f);})();
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
