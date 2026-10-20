"use strict";(()=>{var zn=.016666666666666666,di={radius:10,points:56,seed:7},Qc={hp:100,speed:6.2,radius:.5},eh={hp:100,speed:5,radius:.5},fo=.5,wa=.8,po=.25,fi={shots:3,interval:.08,cooldown:.5,speed:24,range:9,radius:.22,dmg:6,autoAimRange:10},Ju=3,$t={windup:.3,cooldown:6,speed:26,range:11,radius:.45,dmg:12,slow:1.6},Kt={windup:.12,recover:.2,cooldown:7,range:3.2,halfAngle:40*Math.PI/180,dmg:10},$n={base:2.4,lowHpBonus:5.6,slowedBonus:1,knockTime:.35,dashCancelAfter:.1,edgeGrace:.12},Pn={distance:3.6,time:.16,cooldown:3.5},ju=.15,th={duration:1.2,gravity:30},Bt={hold:.8,protect:.2,climb:.2,landInset:1.2,lock:4,inputKeep:.15,hangOut:.45,catch:.08,landMargin:.35,searchAlong:.6,minInset:.6},Qu=2.5,hn={windup:.3,shots:2,interval:.12,speed:15,range:9,radius:.25,dmg:6,cooldownMin:1.4,cooldownMax:2.1},an={windup:.65,recover:.6,cooldown:6,range:3,halfAngle:45*Math.PI/180,dmg:14},en={think:.15,preferMin:4.5,preferMax:7.5,edgeDanger:2.2,dodgeChance:.35,dodgeReactMin:.22,dodgeReactMax:.4,dodgeCooldown:4,edgeSaveChance:.5,edgeSaveReact:.25,strafeSwitchMin:1.5,strafeSwitchMax:2.5},Ta={basic:.025,control:.06,push:.09,enemyBasic:.03,enemyHeavy:.09,melee1:.04,melee2:.04,melee3:.07,charge:.09,counterBash:.09,counterMelee:.04},ks=Math.PI/180,Me={player:{hp:100,speed:6.2,radius:.5},edgeMargin:.35,melee:[{shape:"line",range:2.2,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"line",range:2.4,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"fan",range:2,width:0,halfAngle:70*ks,windup:.18,recover:.3,dmg:12,stun:0,knock:1.6,step:0}],meleeActive:.05,comboWindow:.35,attackMoveMult:.35,target:{keep:3.5,autoRange:3,autoHalfAngle:90*ks},recoil:.25,charge:{windup:.1,time:.22,distance:4,cooldown:6,contact:1,autoRange:6,dmg:6,breakDur:1.2,bounce:1,bounceStun:.35,archerStun:.4,hitRecover:.15,missRecover:.3,bounceTime:.12},guard:{moveMult:.4,maxHold:2,lock:1,turnRate:720*ks,blockHalfAngle:70*ks,perfect:.2,perfectBreak:1,chipDmg:3,pushback:.6,arrowScan:6,threatDrop:8,pushbackTime:.1},counter:{dur:.8,bash:{range:3.2,halfAngle:40*ks,dmg:14,knockMult:1.5,aimRange:3.7,recover:.2},melee:{step:.8,aimRange:3.5}},bearer:{hp:90,speed:4,frontHalfAngle:60*ks,turnRate:100*ks,heavyArmor:.25,approach:2.5},archer:{hp:60,speed:4.5,preferMin:6,preferMax:8,backstepTrigger:2.5,backstep:3,backstepCooldown:4,backstepTime:.25},stack:{window:1.5,hits:3,armor:.8},revive:{count:1,delay:1.5,hpFrac:.5,protect:1.5,edge:1.5,enemyClear:3,grid:.25},waves:{list:[["archer","archer"],["shieldbearer","archer"],["shieldbearer","shieldbearer","archer"]],gap:1.5,markLead:.8,minPlayerDist:5,minEdge:1.5,spacing:1.5,grid:.5},killEdge:2,inputBuffer:.15},dt={islands:[{seed:21,waves:[["archer","archer"],["shieldbearer","archer"]]},{seed:13,waves:[["shieldbearer","archer","archer"],["shieldbearer","shieldbearer","archer"]]},{seed:37,waves:[["shieldbearer","shieldbearer","archer"],["shieldbearer","shieldbearer","archer","archer"]]}],exit:{delay:1,minDist:3,hold:.6,ring:1,apart:4},stages:[{kind:"battle",island:1},{kind:"altar",altar:"A"},{kind:"battle",island:2},{kind:"battle",island:3},{kind:"altar",altar:"B"}],reward:{islands:[1,2],coins:3,healFrac:.3},coin:{pickup:1.5,inset:.6,edge:.3,radius:.2,grid:.1},altar:{seed:901,radius:7,shape:[{k:3,amp:.035,phase:.6},{k:5,amp:.02,phase:2.2}],statueR:.6,spots:[{kind:"athena",pos:{x:-3,z:-1.8}},{kind:"hermes",pos:{x:0,z:-3.4}},{kind:"poseidon",pos:{x:3,z:-1.8}},{kind:"convert",pos:{x:-5.2,z:.6}},{kind:"revive",pos:{x:5.2,z:.6}}],exitAngle:Math.PI/3,exitFromLanding:3,exitFromSpot:2.5,reach:1.5,maxBlessings:2,price:{bless:10,convert:7,revive:8}},jump:{air:1.5,protect:1,swapAt:.75},gen:{terms:[{k:2,amp:[.04,.07]},{k:3,amp:[.05,.08]},{k:5,amp:[.03,.05]},{k:9,amp:[.02,.03]}],rockR:[.8,1.3],rockDist:[2.8,6.5],rockEdge:1.5,rockGap:1.2,rockTries:400,keepOut:[{x:0,z:0,r:2},{x:0,z:3.5,r:1.5}]}},ps="v0.6.0";var Xe=(s,e)=>({x:s.x+e.x,z:s.z+e.z}),rt=(s,e)=>({x:s.x-e.x,z:s.z-e.z}),ce=(s,e)=>({x:s.x*e,z:s.z*e}),ct=s=>Math.hypot(s.x,s.z),ot=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z),Zt=(s,e)=>s.x*e.x+s.z*e.z;function Se(s){let e=Math.hypot(s.x,s.z);return e>1e-9?{x:s.x/e,z:s.z/e}:{x:0,z:0}}var Vi=s=>({x:Math.cos(s),z:Math.sin(s)}),En=s=>Math.atan2(s.z,s.x),Ln=s=>({x:-s.z,z:s.x});function sr(s,e){let t=Math.cos(e),n=Math.sin(e);return{x:s.x*t-s.z*n,z:s.x*n+s.z*t}}function Aa(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ms(s){return s===void 0||s===di.seed?mm():s===dt.altar.seed?Ra():gm(s)}function Ra(){let s=dt.altar,e=di.points,t=[];for(let r=0;r<e;r++){let o=r/e*Math.PI*2,a=1;for(let l of s.shape)a+=l.amp*Math.sin(l.k*o+l.phase);t.push({x:Math.cos(o)*a*s.radius,z:Math.sin(o)*a*s.radius})}let n=s.spots.map(r=>({kind:r.kind,pos:{...r.pos},facing:Math.atan2(-r.pos.z,-r.pos.x)})),i=n.filter(r=>r.kind==="athena"||r.kind==="hermes"||r.kind==="poseidon").map(r=>({pos:{...r.pos},r:s.statueR}));return{poly:t,radius:s.radius,rocks:i,seed:s.seed,kind:"altar",spots:n}}function mm(){let s=di.points,e=di.radius,t=di.seed,n=[];for(let i=0;i<s;i++){let r=i/s*Math.PI*2,o=e*(1+.07*Math.sin(3*r+t)+.05*Math.sin(5*r+t*2.1)+.03*Math.sin(9*r+t*.7));n.push({x:Math.cos(r)*o,z:Math.sin(r)*o})}return{poly:n,radius:e,rocks:[{pos:{x:-2.6,z:-3},r:1.3},{pos:{x:3.6,z:2.6},r:.85}]}}function gm(s){let e=dt.gen,t=Aa(s),n=h=>h[0]+(h[1]-h[0])*t(),i=e.terms.map(h=>({k:h.k,amp:n(h.amp),phase:t()*Math.PI*2})),r=di.points,o=di.radius,a=[];for(let h=0;h<r;h++){let u=h/r*Math.PI*2,d=1;for(let f of i)d+=f.amp*Math.sin(f.k*u+f.phase);a.push({x:Math.cos(u)*d*o,z:Math.sin(u)*d*o})}let l=t()<.5?2:3,c=[];for(let h=0;h<e.rockTries&&c.length<l;h++){let u=n(e.rockR),d=t()*Math.PI*2,f=n(e.rockDist),m={x:Math.cos(d)*f,z:Math.sin(d)*f};vm(m,u,a,c)&&c.push({pos:m,r:u})}return{poly:a,radius:o,rocks:c,seed:s}}function vm(s,e,t,n){let i=dt.gen;return Ft(s,t)-e<i.rockEdge||n.some(r=>Math.hypot(r.pos.x-s.x,r.pos.z-s.z)<r.r+e+i.rockGap)?!1:i.keepOut.every(r=>Math.hypot(r.x-s.x,r.z-s.z)>=e+r.r)}function nh(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let r=e[n],o=e[i];r.z>s.z!=o.z>s.z&&s.x<(o.x-r.x)*(s.z-r.z)/(o.z-r.z)+r.x&&(t=!t)}return t}function Ft(s,e){let t=1/0;for(let n=0,i=e.length-1;n<e.length;i=n++)t=Math.min(t,Ri(s,e[i],e[n]));return nh(s,e)?t:-t}function Ri(s,e,t){let n=t.x-e.x,i=t.z-e.z,r=n*n+i*i,o=r===0?0:Math.max(0,Math.min(1,((s.x-e.x)*n+(s.z-e.z)*i)/r)),a=e.x+n*o-s.x,l=e.z+i*o-s.z;return Math.hypot(a,l)}function rr(s,e,t,n){return Ri(t,s,e)<n}function nd(s,e){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0},wantHeavy:!1,seen:new Set,dodge:null,edgeSaveAt:null,edgeSaveRolled:!1,aggression:e==="1v2"?.18:.28}}var xm=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null});function ed(s,e,t,n){let i=Se(Ln(t)),r=Xe(e.pos,ce(i,n)),o=Xe(e.pos,ce(i,-n)),a=s.edgeDistance(r),l=s.edgeDistance(o);return Math.max(a,l)<1.2?Se(ce(e.pos,-1)):a>=l?i:ce(i,-1)}function id(s,e,t,n){let i=xm(),r=s.state,o=s.player,a=r.time;if(!o||o.state==="dead"||o.state==="falling")return i;if(e.state==="knocked")return t.edgeSaveRolled||(t.edgeSaveRolled=!0,Zt(Se(e.knockVel),Se(e.pos))>.3&&t.rng()<en.edgeSaveChance&&(t.edgeSaveAt=a+en.edgeSaveReact)),t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&s.edgeDistance(e.pos)<2.5&&(t.edgeSaveAt=null,i.dash=!0,i.dashDir=Se(ce(e.pos,-1))),i;t.edgeSaveRolled=!1,t.edgeSaveAt=null;for(let d of s.pendingProjectiles()){if(d.team===e.team)continue;let f=`p${d.id}`;if(t.seen.has(f))continue;t.seen.add(f);let m=rt(e.pos,d.pos),x=Zt(m,d.dir);x<=0||x>8||Math.abs(m.x*d.dir.z-m.z*d.dir.x)>e.radius+d.radius+.3||td(s,e,t,d.dir,d.kind==="control"?.9:.35)}if(o.windup&&o.windup.skill==="control"){let d=`w${o.id}:${(a-o.windup.t).toFixed(2)}`;if(!t.seen.has(d)){t.seen.add(d);let f=rt(e.pos,o.pos),m=Zt(f,o.windup.dir),x=Math.abs(f.x*o.windup.dir.z-f.z*o.windup.dir.x);m>0&&m<$t.range&&x<e.radius+$t.radius+.3&&td(s,e,t,o.windup.dir,1)}}if(t.seen.size>400&&t.seen.clear(),t.dodge&&a>=t.dodge.at){if(t.dodge.dash)return e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup")&&(i.dash=!0,i.dashDir=t.dodge.dir),t.dodge=null,i;if(a<t.dodge.until)return i.move=t.dodge.dir,i;t.dodge=null}if(e.state!=="idle")return i.move=ce(t.move,.5),i;t.thinkT-=n,t.strafeT-=n;let l=rt(o.pos,e.pos),c=ct(l),h=Se(l),u=s.edgeDistance(e.pos);if(t.thinkT<=0){t.thinkT=en.think,t.strafeT<=0&&(t.strafeT=en.strafeSwitchMin+(en.strafeSwitchMax-en.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1)),!t.wantHeavy&&e.cooldowns.push<=0&&s.heavyOwner===null&&t.rng()<t.aggression&&(t.wantHeavy=!0);let d,f=ce(Ln(h),t.strafeDir);if(u<en.edgeDanger)d=Se(Xe(ce(Se(ce(e.pos,-1)),1.4),ce(f,.5)));else if(t.wantHeavy)d=h;else if(c>en.preferMax)d=Se(Xe(h,ce(f,.4)));else if(c<en.preferMin){let m=ce(h,-1);d=s.edgeDistance(Xe(e.pos,ce(m,2)))<en.edgeDanger+.5?f:Se(Xe(m,ce(f,.5)))}else d=f;s.edgeDistance(Xe(e.pos,ce(d,1.5)))<en.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,d=Se(ce(e.pos,-1)));for(let m of r.island.rocks){let x=Xe(e.pos,ce(d,1.2));ot(x,m.pos)<m.r+e.radius+.3&&(d=Se(Xe(d,ce(Ln(Se(rt(m.pos,e.pos))),t.strafeDir*1.5))))}t.move=d}if(i.move=t.move,t.wantHeavy){if(s.heavyOwner!==null&&s.heavyOwner!==e.id)t.wantHeavy=!1;else if(c<an.range-.4&&e.cooldowns.push<=0)return t.wantHeavy=!1,i.cast={skill:"push",dir:h},i}else if(e.cooldowns.basic<=0&&c<hn.range-.5&&s.lineOfSight(e.pos,o.pos)){let d=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=sr(h,d)}return i}function td(s,e,t,n,i){if(t.dodge)return;let r=en.dodgeReactMin+(en.dodgeReactMax-en.dodgeReactMin)*t.rng(),o=t.rng(),a=s.state.time;o<en.dodgeChance*i&&e.cooldowns.dash<=0?t.dodge={at:a+r,dir:ed(s,e,n,Pn.distance),dash:!0,until:0}:o<(en.dodgeChance+.3)*i&&(t.dodge={at:a+r,dir:ed(s,e,n,1.5),dash:!1,until:a+r+.35})}function od(s){return{rng:s,delay:.3,cursor:0,cdEst:{push:null,control:null,dash:null},strategy:"kite",until:0,reason:"start",distErr:1,risky:!1,preDashed:!1,myControlHitT:-99,edgeSaveAt:null,knockSeenT:-99,lastPerceived:null,moveDir:null,climbAt:null,lastEngageT:0,rockShots:0,stalls:[],decisions:[]}}var ym=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null}),mo=Kt.range+.5,bm=.5;function ad(s,e,t){let n=ym(),i=s.state,r=e,o=s.player,a=i.time,l=t.rng,c=a-t.delay;for(let{t:k,e:P}of s.log)if(!(k<=t.cursor||k>c)){if("ownerId"in P&&P.ownerId===o.id){let V=(l()*2-1)*bm;P.type==="cast"&&P.skill==="push"?t.cdEst.push=k+Kt.cooldown+V:P.type==="shoot"&&P.kind==="control"?t.cdEst.control=k+$t.cooldown+V:P.type==="dash"&&(t.cdEst.dash=k+Pn.cooldown+V,t.lastEngageT=a)}P.type==="hit"&&(P.sourceId===r.id&&P.kind==="control"&&(t.myControlHitT=k),(P.sourceId===r.id||P.targetId===r.id)&&(t.lastEngageT=a)),P.type==="blocked"&&P.ownerId===r.id&&t.rockShots++}if(t.cursor=Math.max(t.cursor,c),r.state==="ledge")return t.climbAt===null&&(t.climbAt=a-r.stateT+.2+l()*.15),a>=t.climbAt&&(t.climbAt=null,n.dash=!0),n;if(t.climbAt=null,r.state==="climb")return n;let h=s.snapshotAt(c);if(!h)return n;t.lastPerceived=h.pos;let u=s.snapshotAt(c-.1),d=u&&h.t-u.t>.05?ce(rt(h.pos,u.pos),1/(h.t-u.t)):{x:0,z:0},f=k=>{let P=ce(d,t.delay+k);return ct(P)>3&&(P=ce(Se(P),3)),Xe(h.pos,P)};if(h.state==="falling"||h.state==="dead")return n;if(r.state==="knocked"){if(t.knockSeenT!==r.stateT&&r.stateT<.02){t.knockSeenT=r.stateT;let k=Zt(Se(r.knockVel),Se(r.pos))>.2&&s.edgeDistance(r.pos)<4;t.edgeSaveAt=k&&r.cooldowns.dash<=0?a+.18+l()*.17:null}return t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&(t.edgeSaveAt=null,n.dash=!0,n.dashDir=Se(ce(r.pos,-1))),n}if(t.edgeSaveAt=null,r.state!=="idle"&&r.state!=="windup"&&r.state!=="recover")return n;let m=ot(r.pos,h.pos),x=m*t.distErr,g=Se(rt(h.pos,r.pos)),p=s.lineOfSight(r.pos,h.pos),y=s.edgeDistance(r.pos),E=t.cdEst.push===null||a>=t.cdEst.push,v=r.cooldowns.push<=0,S=r.cooldowns.control<=0,R=r.cooldowns.dash<=0;if(h.state==="ledge"&&(r.state==="idle"||r.state==="recover"))return n.move=rd(s,r,t,sd(s,r,g),6),v&&x<=mo-.3&&r.state==="idle"?(n.cast={skill:"push",dir:go(r.pos,h.pos,l,4,r.facing)},t.lastEngageT=a):p&&r.state==="idle"&&(n.fire=!0,n.fireDir=go(r.pos,h.pos,l,8,r.facing)),n;let A="";y<1.5&&(A="edge");let C=h.windup;if(C&&(C.skill==="push"||C.skill==="control")&&h.t-C.startT<C.dur+.05){let k=rt(r.pos,h.pos),P=Zt(k,C.dir),V=Math.abs(k.x*C.dir.z-k.z*C.dir.x),W=C.skill==="push"?mo:$t.range;P>0&&P<W&&V<(C.skill==="push"?2.2:1.2)&&(A="threat")}if(A==="threat"&&R&&l()<.6){let k=Se(Ln(C.dir)),P=Xe(r.pos,ce(k,Pn.distance)),V=Xe(r.pos,ce(k,-Pn.distance));return n.dash=!0,n.dashDir=s.edgeDistance(P)>=s.edgeDistance(V)?k:ce(k,-1),t.lastEngageT=a,n}if(a>=t.until||A==="edge"&&t.strategy!=="retreat"){t.delay=.25+l()*.15,t.distErr=1+(l()*2-1)*.08,t.risky=l()<.25,t.preDashed=!1;let k=a-t.myControlHitT<1.5,P={approach:.35+(E?0:.45)+(v?.15:-.4)+(h.slowed?.3:0)+(k?.4:0)+(t.risky?.5:0),kite:.45+(x<3.5?.2:0)+(E?.15:0),flank:.25+(p?0:.35),retreat:A==="edge"?5:y<2.5?.6:0},V="kite",W=-1/0;for(let X of Object.keys(P)){let se=P[X]+l()*.35;se>W&&(W=se,V=X)}t.strategy=V,t.until=a+1+l()*1,t.reason=A==="edge"?"\u9760\u8FD1\u5CF6\u7DE3":`\u5C0D\u624B\u9707\u64CA${E?"\u53EF\u80FD\u53EF\u7528":"\u4F30\u8A08\u51B7\u537B\u4E2D"}${t.risky?"\uFF08\u5192\u96AA\uFF09":""}${k?"\u3001\u525B\u675F\u7E1B\u547D\u4E2D":""}`,t.decisions.push({t:a,strategy:V,reason:t.reason}),t.decisions.length>400&&t.decisions.shift()}let b={x:0,z:0},_=Se(ce(r.pos,-1));switch(t.strategy){case"approach":b=g,v&&x<=mo-.3&&r.state==="idle"&&(n.cast={skill:"push",dir:go(r.pos,f(Kt.windup),l,4,r.facing)},t.lastEngageT=a);break;case"kite":{let k=x<5?ce(g,-1):x>7?g:{x:0,z:0};if(b=Se(Xe(k,ce(Ln(g),.8))),!t.preDashed&&R&&E&&x<mo+.4&&l()<.3)return t.preDashed=!0,n.dash=!0,n.dashDir=Se(Xe(ce(g,-1),ce(_,.5))),t.lastEngageT=a,n;break}case"flank":b=Se(Xe(ce(Ln(g),1),ce(g,.3)));break;case"retreat":b=_;break}b=sd(s,r,b);let D=t.decisions.length>0&&t.decisions[t.decisions.length-1].t===a;return b=rd(s,r,t,b,D?1/0:m<mo+1?6:1),n.move=b,r.state==="idle"&&!n.cast&&p&&(S&&x>4&&x<$t.range-1&&t.strategy!=="retreat"&&l()<.02?(n.cast={skill:"control",dir:go(r.pos,f($t.windup+x/$t.speed),l,8,r.facing)},t.lastEngageT=a):x<fi.range-.5&&(n.fire=!0,n.fireDir=go(r.pos,f(x/fi.speed),l,8,r.facing),x<fi.range-1&&(t.lastEngageT=a))),a-t.lastEngageT>8&&(t.stalls.push({t:a,strategy:t.strategy,reason:t.reason,dist:Math.round(m*10)/10,los:p,rockShots:t.rockShots}),t.lastEngageT=a,t.rockShots=0),n}function go(s,e,t,n,i){let r=(t()*2-1)*(n*Math.PI)/180,o=rt(e,s);return sr(ct(o)>1e-6?Se(o):{x:Math.cos(i),z:Math.sin(i)},r)}function sd(s,e,t){if(ct(t)<.01)return t;let n=Se(t);s.edgeDistance(Xe(e.pos,ce(n,1.5)))<1.6&&(n=Se(Xe(n,ce(Se(ce(e.pos,-1)),1.5))));for(let i of s.state.island.rocks)if(ot(Xe(e.pos,ce(n,1.2)),i.pos)<i.r+e.radius+.3){let r=Ln(Se(rt(i.pos,e.pos)));n=Se(Xe(n,ce(Zt(r,n)>=0?r:ce(r,-1),1.5)))}return n}var _m=420*Math.PI/180/60;function rd(s,e,t,n,i){if(ct(n)<.01)return n;let r=Se(n);if(!t.moveDir)return t.moveDir=r,r;let o=Math.atan2(t.moveDir.z,t.moveDir.x),l=Math.atan2(r.z,r.x)-o;for(;l>Math.PI;)l-=2*Math.PI;for(;l<-Math.PI;)l+=2*Math.PI;let c=s.edgeDistance(Xe(e.pos,ce(t.moveDir,1.2)))<1.2,h=_m*Math.max(i,c?3:1),u=o+Math.max(-h,Math.min(h,l));return t.moveDir={x:Math.cos(u),z:Math.sin(u)},t.moveDir}var Ds={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null},kt=class s{constructor(e,t=1,n="s0",i=2.6){this.aiEnabled=!0;this.hitstop=0;this.coverOverride=null;this.heavyOwner=null;this.events=[];this.nextId=1;this.bursts=new Map;this.ai=new Map;this.mirror=new Map;this.outsideT=new Map;this.dashMoved=new Map;this.dashBuf=new Map;this.outSource=new Map;this.ledge=new Map;this.ledgeLock=new Map;this.edgeRec=new Map;this.fallVel=new Map;this.lastHitKind=new Map;this.controlMark=new Map;this.ended=!1;this.log=[];this.history=[];this.rng=Aa(t);let r=ms(),o=n!=="s0"?"hunter":"s0enemy",a=[this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"hunter")];e==="1v1"?a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:.5,z:-4.5},Math.PI/2,o)):e!=="waves"&&e!=="run"&&(a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:-3.8,z:-4.2},Math.PI/2,o)),a.push(this.makeFighter("enemy",2,"\u6A58\u7375\u624B",{x:4.6,z:-3},Math.PI/2,o)));for(let l of a)l.team==="enemy"&&(l.kit==="hunter"?this.mirror.set(l.id,od(this.rng)):this.ai.set(l.id,nd(this.rng,e)));this.state={time:0,mode:e,variant:n,island:r,fighters:a,projectiles:[],playerId:a[0].id,result:null,loseText:null,ledgeDepth:n==="v3"?i:null,edgeLog:[],stats:{shotsFired:0,shotsHit:0,combos:0,kills:{fall:0,hp:0}}}}makeFighter(e,t,n,i,r,o){let a=o==="hunter",l=a?Qc:eh,c=a?{basic:fi.cooldown,control:$t.cooldown,push:Kt.cooldown,dash:Pn.cooldown}:{basic:hn.cooldownMax,control:0,push:an.cooldown,dash:en.dodgeCooldown};return{id:this.nextId++,team:e,variant:t,kit:o,name:n,pos:{...i},y:0,facing:r,moveVel:{x:0,z:0},radius:l.radius,hp:l.hp,maxHp:l.hp,state:"idle",stateT:0,windup:null,burstLeft:0,cooldowns:{basic:0,control:0,push:a?0:2.5,dash:0},cooldownMax:c,slowT:0,invulnT:0,hitFlashT:0,sinceShotT:99,knockVel:{x:0,z:0},deathCause:null,lastHitBy:null,lastHitAt:-99}}get player(){return this.state.fighters[0]}fighter(e){return this.state.fighters.find(t=>t.id===e)}drainEvents(){let e=this.events;return this.events=[],e}emit(e){this.events.push(e),this.log.push({t:this.state?this.state.time:0,e})}recordHistory(){let e=this.player,t=this.state.time;for(this.history.push({t,pos:{...e.pos},facing:e.facing,state:e.state,windup:e.windup?{skill:e.windup.skill,dir:{...e.windup.dir},startT:t-e.windup.t,dur:e.windup.dur}:null,slowed:e.slowT>0});this.history.length&&this.history[0].t<t-1.5;)this.history.shift();for(;this.log.length&&this.log[0].t<t-3;)this.log.shift()}snapshotAt(e){for(let t=this.history.length-1;t>=0;t--)if(this.history[t].t<=e+1e-9)return this.history[t];return null}static alive(e){return e.state!=="dead"&&e.state!=="falling"&&e.state!=="reviving"}canLedge(e){return this.state.variant==="v3"}suspended(e){return!1}step(e){let t=this.state,n=zn;t.time+=n;for(let i of t.fighters)this.tickTimers(i,n);for(let i of t.fighters){if(!s.alive(i))continue;let r;this.ended?r=Ds:i.team==="player"?r=e:this.aiEnabled?i.kit==="hunter"?r=ad(this,i,this.mirror.get(i.id)):r=id(this,i,this.ai.get(i.id),n):r=Ds,this.control(i,r)}for(let i of t.fighters)this.advance(i,n);this.separate(),this.moveProjectiles(n),this.checkEnd(),this.recordHistory()}tickTimers(e,t){e.stateT+=t;for(let n of["basic","control","push","dash"])e.cooldowns[n]=Math.max(0,e.cooldowns[n]-t);e.slowT=Math.max(0,e.slowT-t),e.invulnT=Math.max(0,e.invulnT-t),e.hitFlashT=Math.max(0,e.hitFlashT-t),e.sinceShotT+=t}setState(e,t){e.state=t,e.stateT=0}facingDir(e){return Vi(e.facing)}autoTarget(e,t){let n=null,i=1/0;for(let r of this.state.fighters){if(r.team===e.team||!s.alive(r))continue;let o=ot(e.pos,r.pos);if(o>t)continue;let a=o+(this.lineOfSight(e.pos,r.pos)?0:6);a<i&&(i=a,n=r)}return n}lineOfSight(e,t){return!this.state.island.rocks.some(n=>rr(e,t,n.pos,n.r))}aimOrAuto(e,t,n){if(t&&ct(t)>.01)return Se(t);if(e.team==="enemy"&&e.kit==="hunter")return this.facingDir(e);let i=this.autoTarget(e,n);return i?Se(rt(i.pos,e.pos)):this.facingDir(e)}control(e,t){if(e.state==="ledge"){e.moveVel={x:0,z:0},t.dash&&this.startClimb(e,"accepted@"+this.state.time.toFixed(2));return}if(e.state==="climb"){e.moveVel={x:0,z:0};return}if(this.state.variant!=="s0"){if(this.controlDashBuffered(e,t))return}else if(t.dash&&e.cooldowns.dash<=0&&this.canDash(e)){this.startDash(e,t);return}if(e.state==="idle"&&t.cast){if(e.kit==="hunter"){let n=t.cast.skill;if(e.cooldowns[n]<=0){let i=n==="control"?$t.range:Kt.range+2;this.startWindup(e,n,this.aimOrAuto(e,t.cast.dir,i),n==="control"?$t.windup:Kt.windup);return}}else if(t.cast.skill==="push"&&e.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===e.id)){this.heavyOwner=e.id,this.startWindup(e,"enemyHeavy",this.aimOrAuto(e,t.cast.dir,6),an.windup);return}}if(e.state==="idle"&&t.fire&&e.burstLeft===0&&e.cooldowns.basic<=0)if(e.kit==="hunter"){let n=this.aimOrAuto(e,t.fireDir,fi.autoAimRange);e.burstLeft=fi.shots,e.cooldowns.basic=fi.cooldown,this.bursts.set(e.id,{dir:n,timer:0,kind:"basic"}),e.facing=En(n)}else{this.startWindup(e,"enemyBasic",this.aimOrAuto(e,t.fireDir,hn.range),hn.windup);return}if(e.state==="idle"||e.state==="windup"||e.state==="recover"){let n=t.move,i=ct(n);i>1&&(n=ce(n,1/i));let r=e.kit==="hunter"?Qc.speed:eh.speed;e.slowT>0&&(r*=fo),e.burstLeft>0&&(r*=wa),e.state==="windup"&&(r*=po),e.state==="recover"&&(r*=.3),e.moveVel=ce(n,r);let o=e.team==="enemy"&&e.kit==="hunter"&&e.sinceShotT<.6;e.state==="idle"&&e.burstLeft===0&&i>.1&&!o&&(e.facing=En(n))}else e.moveVel={x:0,z:0}}canDash(e){return e.state==="idle"||e.state==="windup"||e.state==="knocked"&&e.stateT>=$n.dashCancelAfter}controlDashBuffered(e,t){if(t.dash){let i=t.dashDir&&ct(t.dashDir)>.01?Se(t.dashDir):ct(t.move)>.2?Se(t.move):this.facingDir(e);e.cooldowns.dash>0?this.canLedge(e)?this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!1}):this.dashBuf.delete(e.id):this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!0})}let n=this.dashBuf.get(e.id);return n?this.state.time-n.at>ju+1e-9?(this.dashBuf.delete(e.id),!1):e.state==="knocked"&&e.stateT<$n.dashCancelAfter||!n.dashOk?!1:e.cooldowns.dash>0||!this.canDash(e)?(this.canLedge(e)?n.dashOk=!1:this.dashBuf.delete(e.id),!1):(this.dashBuf.delete(e.id),this.startDash(e,{...Ds,dashDir:n.dir}),!0):!1}predictedKnockStop(e){let t={...e.pos},n=e.stateT;for(;n<$n.knockTime-1e-9;){n+=zn;let i=1-Math.min(1,n/$n.knockTime);t=Xe(t,ce(e.knockVel,zn*i))}return t}nearestEdgePoint(e){let t=this.state.island.poly,n=t[0],i=1/0;for(let r=0,o=t.length-1;r<t.length;o=r++){let a=t[o],l=t[r],c=rt(l,a),h=Zt(c,c),u=h===0?0:Math.max(0,Math.min(1,Zt(rt(e,a),c)/h)),d=Xe(a,ce(c,u)),f=ot(e,d);f<i&&(i=f,n=d)}return n}climbPathOk(e,t,n){return Ft(n,this.state.island.poly)>=Bt.landMargin&&this.state.island.rocks.every(i=>ot(n,i.pos)>=i.r+e.radius&&Ri(i.pos,t,n)>=i.r+e.radius)}findLanding(e,t,n,i){let r={x:-n.z,z:n.x},o=(a,l)=>this.climbPathOk(e,i??a,l);for(let a of[Bt.landInset,(Bt.landInset+Bt.minInset)/2,Bt.minInset])for(let l of[0,.2,-.2,.4,-.4,Bt.searchAlong,-Bt.searchAlong]){let c=t,h=n;if(l!==0){let f=Xe(Xe(t,ce(r,l)),ce(n,-.5));c=this.nearestEdgePoint(f);let m=rt(c,f);if(ct(m)<1e-6)continue;h=Se(m)}let u=Xe(c,ce(h,-Bt.hangOut)),d=Xe(c,ce(h,a));if(o(u,d))return{edge:c,inward:h,land:d}}return null}tryLedge(e,t){let n=this.state,i=n.ledgeDepth??2.6,r=this.edgeRec.get(e.id),o=this.outSource.get(e.id)??"knock";r||(r={t:Math.round(n.time*100)/100,who:e.name,source:o,depth:null,basis:null,eligible:!1,reason:null,input:"none",outcome:"pending"},this.edgeRec.set(e.id,r),n.edgeLog.push(r),n.edgeLog.length>20&&n.edgeLog.shift());let a=r,l=y=>(a.eligible=!1,a.reason=y,!1);if(o==="dash")return l("dash-out");let c=t==="predicted"?this.predictedKnockStop(e):e.pos,h=-Ft(c,n.island.poly);a.depth=h,a.basis=t;let u=this.ledgeLock.get(e.id);if(u&&(n.time<u.until-1e-9||!u.landed))return l("locked");if(h>i)return l("too-deep");let d=this.nearestEdgePoint(e.pos),f=rt(d,e.pos),m=ct(f)>1e-6?Se(f):Se(ce(e.pos,-1)),x=this.findLanding(e,d,m);if(!x)return l("no-landing");a.eligible=!0,a.reason=null;let g=Xe(x.edge,ce(x.inward,-Bt.hangOut));this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel={x:0,z:0},e.moveVel={x:0,z:0},e.facing=En(x.inward),e.invulnT=Math.max(e.invulnT,Bt.protect),this.outsideT.set(e.id,0),this.ledge.set(e.id,{start:{...e.pos},hang:g,edge:x.edge,inward:x.inward,land:x.land,climbFrom:null,climbQueued:!1,rec:a}),this.ledgeLock.set(e.id,{until:n.time+Bt.lock,landed:!1}),this.setState(e,"ledge"),this.emit({type:"ledgeGrab",ownerId:e.id,pos:g,edge:x.edge,inward:x.inward,depth:h});let p=this.dashBuf.get(e.id);return this.dashBuf.delete(e.id),p&&n.time-p.at<=Bt.inputKeep+1e-9&&this.startClimb(e,"buffered@"+p.at.toFixed(2)),!0}startClimb(e,t){let n=this.ledge.get(e.id);if(!n||n.climbQueued)return;n.rec.input=t;let i={...e.pos};if(!this.climbPathOk(e,i,n.land)){let r=this.findLanding(e,n.edge,n.inward,i);if(r)n.land=r.land;else{n.climbQueued=!0;return}}this.beginClimb(e,i)}beginClimb(e,t){let n=this.ledge.get(e.id);n.climbFrom={...t},this.setState(e,"climb"),this.emit({type:"ledgeClimb",ownerId:e.id,from:{...t},to:{...n.land}})}dropLedge(e,t,n){let i=this.ledge.get(e.id);i&&(i.rec.outcome=t),this.edgeRec.delete(e.id),this.emit({type:"ledgeDrop",ownerId:e.id,reason:t}),this.startFall(e,ce(Se(n),2))}onBackOnIsland(e){let t=this.edgeRec.get(e.id);t&&t.outcome==="pending"&&(t.outcome="rescue"),this.edgeRec.delete(e.id),this.outSource.delete(e.id)}startWindup(e,t,n,i){e.windup={skill:t,t:0,dur:i,dir:n},e.facing=En(n),this.setState(e,"windup"),this.emit({type:"windupStart",ownerId:e.id,skill:t,dir:n,dur:i})}cancelWindup(e){e.windup&&(this.emit({type:"cancel",ownerId:e.id,skill:e.windup.skill}),e.windup.skill==="enemyHeavy"&&this.heavyOwner===e.id&&(this.heavyOwner=null),e.windup=null)}startDash(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id);let n=t.dashDir&&ct(t.dashDir)>.01?Se(t.dashDir):null;!n&&ct(t.move)>.2&&(n=Se(t.move)),n||(n=this.facingDir(e)),e.state==="knocked"&&Ft(e.pos,this.state.island.poly)<2.5&&this.emit({type:"edgeSave",ownerId:e.id}),this.outSource.set(e.id,e.state==="knocked"?"knock":"dash"),e.knockVel=ce(n,Pn.distance/Pn.time),e.facing=En(n),e.cooldowns.dash=e.cooldownMax.dash,e.invulnT=Pn.time+.04,this.dashMoved.set(e.id,0),this.outsideT.set(e.id,0),this.setState(e,"dash"),this.emit({type:"dash",ownerId:e.id,from:{...e.pos},dir:n})}advance(e,t){let n=this.state.island.poly;switch(e.state){case"dead":return;case"falling":{let i=this.fallVel.get(e.id)??{x:0,z:0};e.pos=Xe(e.pos,ce(i,t)),e.y=-.5*th.gravity*e.stateT*e.stateT,e.stateT>=th.duration&&this.die(e,"fall");return}case"windup":{let i=e.windup;i.t+=t,this.walk(e,t),i.t>=i.dur&&this.releaseWindup(e);break}case"recover":this.walk(e,t),e.stateT>=(e.kit==="hunter"?Kt.recover:an.recover)&&this.setState(e,"idle");break;case"dash":{let i=this.dashMoved.get(e.id)??0,r=Math.min(t,Pn.time-i);if(e.pos=Xe(e.pos,ce(e.knockVel,r)),this.dashMoved.set(e.id,i+r),this.pushOutOfRocks(e),i+r>=Pn.time-1e-9){let o=Se(e.knockVel);if(e.knockVel={x:0,z:0},Ft(e.pos,n)<0){if(this.canLedge(e)&&this.tryLedge(e,"actual"))return;this.startFall(e,ce(o,2));return}this.onBackOnIsland(e),this.setState(e,"idle")}break}case"knocked":{let i=1-Math.min(1,e.stateT/$n.knockTime);if(e.pos=Xe(e.pos,ce(e.knockVel,t*i)),this.pushOutOfRocks(e),Ft(e.pos,n)<0){if(this.canLedge(e)&&(this.outsideT.get(e.id)??0)===0&&this.tryLedge(e,"predicted"))return;let r=(this.outsideT.get(e.id)??0)+t;if(this.outsideT.set(e.id,r),r>$n.edgeGrace){this.startFall(e,ce(e.knockVel,.5*Math.max(i,.3)));return}}else this.outsideT.set(e.id,0);if(e.stateT>=$n.knockTime){if(Ft(e.pos,n)<0){this.startFall(e,ce(Se(e.knockVel),1.5));return}e.knockVel={x:0,z:0},this.onBackOnIsland(e),this.setState(e,"idle")}break}case"ledge":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Bt.catch);if(e.pos=Xe(i.start,ce(rt(i.hang,i.start),r)),i.climbQueued&&r>=1){i.climbQueued=!1,this.beginClimb(e,i.hang);return}e.stateT>=Bt.hold-1e-9&&this.dropLedge(e,"timeout",ce(i.inward,-1));return}case"climb":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/Bt.climb);e.pos=Xe(i.climbFrom,ce(rt(i.land,i.climbFrom),r)),r>=1-1e-9&&(this.ledgeLock.get(e.id).landed=!0,i.rec.outcome="climbed",this.ledge.delete(e.id),this.outSource.delete(e.id),this.edgeRec.delete(e.id),this.setState(e,"idle"));return}case"idle":this.walk(e,t);break}if((e.state==="idle"||e.state==="windup"||e.state==="recover")&&Ft(e.pos,n)<0){this.startFall(e,{x:0,z:0});return}this.tickBurst(e,t)}walk(e,t){let n=this.state.island.poly,i=.35,r=Ft(e.pos,n),o=c=>{let h=Ft(c,n);return h>=i||h>=r},a=ce(e.moveVel,t);if(a.x===0&&a.z===0)return;let l=Xe(e.pos,a);if(o(l))e.pos=l;else{let c={x:e.pos.x+a.x,z:e.pos.z},h={x:e.pos.x,z:e.pos.z+a.z};o(c)?e.pos=c:o(h)&&(e.pos=h)}this.pushOutOfRocks(e)}pushOutOfRocks(e){for(let t of this.state.island.rocks){let n=rt(e.pos,t.pos),i=ct(n),r=t.r+e.radius;i<r&&(e.pos=Xe(t.pos,ce(i>1e-6?ce(n,1/i):{x:1,z:0},r)))}}separate(){let e=this.state.fighters.filter(t=>s.alive(t)&&t.state!=="dash"&&t.state!=="ledge"&&t.state!=="climb"&&!this.suspended(t));for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],r=e[n],o=rt(r.pos,i.pos),a=ct(o),l=i.radius+r.radius;if(a<l&&a>1e-6){let c=ce(o,(l-a)/a/2),h=this.state.island.poly,u=(m,x)=>{let g=Ft(x,h);return g>=.35||g>=Ft(m.pos,h)},d=rt(i.pos,c),f=Xe(r.pos,c);i.state!=="knocked"&&u(i,d)&&(i.pos=d),r.state!=="knocked"&&u(r,f)&&(r.pos=f)}}for(let t of e)this.pushOutOfRocks(t)}tickBurst(e,t){if(e.burstLeft<=0||!s.alive(e))return;let n=this.bursts.get(e.id);if(!n){e.burstLeft=0;return}if(n.timer-=t,n.timer>0)return;let i=n.kind==="basic"?fi:hn;this.spawnProjectile(e,n.kind,n.dir,i.speed,i.range,i.radius),e.team==="player"&&this.state.stats.shotsFired++,e.sinceShotT=0,e.burstLeft--,n.timer=i.interval,e.burstLeft<=0&&this.bursts.delete(e.id)}spawnProjectile(e,t,n,i,r,o){let a=Xe(e.pos,ce(n,e.radius+.15));this.state.projectiles.push({id:this.nextId++,kind:t,ownerId:e.id,team:e.team,pos:a,dir:{...n},speed:i,traveled:0,range:r,radius:o,alive:!0}),this.emit({type:"shoot",ownerId:e.id,kind:t,pos:{...a},dir:{...n}})}releaseWindup(e){let t=e.windup;switch(e.windup=null,t.skill){case"control":this.spawnProjectile(e,"control",t.dir,$t.speed,$t.range,$t.radius),e.sinceShotT=0,e.cooldowns.control=$t.cooldown,this.setState(e,"idle");break;case"push":this.coneStrike(e,t.dir,Kt.range,Kt.halfAngle,Kt.dmg,"push"),e.cooldowns.push=Kt.cooldown,this.setState(e,"recover");break;case"enemyBasic":{let n=hn.cooldownMin+(hn.cooldownMax-hn.cooldownMin)*this.rng();e.cooldowns.basic=this.state.mode==="1v2"?n*1.4:n,e.burstLeft=hn.shots,this.bursts.set(e.id,{dir:t.dir,timer:0,kind:"enemyBasic"}),this.setState(e,"idle");break}case"enemyHeavy":this.coneStrike(e,t.dir,an.range,an.halfAngle,an.dmg,"enemyHeavy"),e.cooldowns.push=an.cooldown,this.heavyOwner===e.id&&(this.heavyOwner=null),this.setState(e,"recover");break}}coneStrike(e,t,n,i,r,o){this.emit({type:"cast",ownerId:e.id,skill:o,pos:{...e.pos},dir:{...t}});for(let a of this.state.fighters){if(a.team===e.team||!s.alive(a))continue;let l=rt(a.pos,e.pos),c=ct(l);if(!(c>n+a.radius||!(c<.6||Zt(ce(l,1/c),t)>=Math.cos(i)))){if(this.coverOverride??this.state.variant!=="s0"){let u=this.rockOnSegment(e.pos,a.pos);if(u){this.emit({type:"blockedStrike",ownerId:e.id,targetId:a.id,skill:o,pos:u,dir:{...t}});continue}}this.damage(a,e,o,r,t)}}}rockOnSegment(e,t){let i=1/0,r=null,o=rt(t,e),a=Zt(o,o);for(let l of this.state.island.rocks){if(Ri(l.pos,e,t)>=l.r-1e-6)continue;let c=rt(e,l.pos),h=2*Zt(c,o),u=Zt(c,c)-l.r*l.r,d=Math.max(0,h*h-4*a*u),f=a>0?Math.max(0,(-h-Math.sqrt(d))/(2*a)):0;f<i&&(i=f,r=Xe(e,ce(o,f)))}return r}static knockDistance(e,t,n){return $n.base+$n.lowHpBonus*(1-Math.max(0,e)/t)+(n?$n.slowedBonus:0)}damage(e,t,n,i,r){if(!s.alive(e)||e.invulnT>0)return!1;let o=this.state,a=e.slowT>0;e.hp=Math.max(0,e.hp-i),e.hitFlashT=.12,e.lastHitBy=t.id,e.lastHitAt=o.time,this.lastHitKind.set(e.id,n),this.state.variant!=="s0"&&n==="basic"||(this.hitstop=Math.max(this.hitstop,Ta[n])),n==="control"&&(e.slowT=$t.slow,t.team==="player"&&this.controlMark.set(e.id,o.time));let l=0;if(r&&e.hp>0&&e.state==="ledge")return this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:{...r},dmg:i,knock:0}),this.dropLedge(e,"knocked",r),!0;if(r&&e.hp>0){if(e.state==="climb"){let c=this.ledge.get(e.id);c&&(c.rec.outcome="knocked",this.ledge.delete(e.id),this.edgeRec.delete(e.id))}this.outSource.set(e.id,"knock"),l=s.knockDistance(e.hp,e.maxHp,a),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel=ce(r,2*l/$n.knockTime),e.facing=En(ce(r,-1)),this.outsideT.set(e.id,0),this.setState(e,"knocked")}if(this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:r?{...r}:Se(rt(e.pos,t.pos)),dmg:i,knock:l}),n==="push"&&t.team==="player"){let c=this.controlMark.get(e.id);c!==void 0&&o.time-c<=Qu&&(o.stats.combos++,this.controlMark.delete(e.id),this.emit({type:"combo",ownerId:t.id,targetId:e.id}))}return e.hp<=0&&(this.cancelWindup(e),this.die(e,"hp")),!0}startFall(e,t){this.dashBuf.delete(e.id);let n=this.edgeRec.get(e.id);n&&n.outcome==="pending"&&(n.outcome="fall"),this.edgeRec.delete(e.id),this.ledge.delete(e.id),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),this.fallVel.set(e.id,t),e.moveVel={x:0,z:0},this.setState(e,"falling"),this.emit({type:"fall",ownerId:e.id,pos:{...e.pos}})}die(e,t){if(this.dashBuf.delete(e.id),t==="hp"){let r=this.ledge.get(e.id);r&&r.rec.outcome==="pending"&&(r.rec.outcome="hp");let o=this.edgeRec.get(e.id);o&&o.outcome==="pending"&&(o.outcome="hp"),this.ledge.delete(e.id),this.edgeRec.delete(e.id)}let n=this.state;e.deathCause=t,e.knockVel={x:0,z:0},this.setState(e,"dead");let i=e.lastHitBy!==null&&n.time-e.lastHitAt<4?e.lastHitBy:null;e.team==="enemy"&&i===n.playerId&&n.stats.kills[t]++,this.emit({type:"death",ownerId:e.id,cause:t,pos:{...e.pos},killerId:i})}moveProjectiles(e){let t=this.state;for(let n of t.projectiles){if(!n.alive)continue;let i=n.pos,r=n.speed*e,o=Xe(i,ce(n.dir,r));if(n.traveled+=r,t.island.rocks.some(c=>rr(i,o,c.pos,c.r+n.radius*.5))){n.alive=!1,this.emit({type:"blocked",pos:o,kind:n.kind,ownerId:n.ownerId});continue}let a=null,l=1/0;for(let c of t.fighters)if(!(c.team===n.team||!s.alive(c)||c.invulnT>0)&&Ri(c.pos,i,o)<c.radius+n.radius){let h=ot(i,c.pos);h<l&&(l=h,a=c)}if(n.pos=o,a){n.alive=!1;let c=this.fighter(n.ownerId),h=n.kind,u=this.state.variant!=="s0"?Ju:fi.dmg,d=n.kind==="basic"?u:n.kind==="control"?$t.dmg:hn.dmg;this.damage(a,c,h,d,null)&&n.team==="player"&&n.kind==="basic"&&t.stats.shotsHit++;continue}n.traveled>=n.range&&(n.alive=!1,this.emit({type:"expire",pos:o,kind:n.kind}))}t.projectiles=t.projectiles.filter(n=>n.alive)}checkEnd(){if(this.ended)return;let e=this.state,t=this.player;t.state==="dead"?(e.result="lose",e.loseText=this.loseText(t)):e.fighters.every(n=>n.team==="player"||n.state==="dead")&&(e.result="win"),e.result&&(this.ended=!0,this.dashBuf.clear(),this.emit({type:"roundEnd",result:e.result}))}loseText(e){let t=this.state,n=e.lastHitBy!==null&&t.time-e.lastHitAt<4?this.fighter(e.lastHitBy):void 0,i=this.lastHitKind.get(e.id);return e.deathCause==="fall"?n?i==="enemyHeavy"?`\u88AB${n.name}\u7684\u91CD\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u770B\u5230\u7D05\u8272\u6247\u5F62\u5C31\u5F80\u5074\u908A\u9583\uFF0C\u6216\u7528\u885D\u523A\u8EB2\u958B`:i==="push"?`\u88AB${n.name}\u7684\u9707\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u6CE8\u610F\u7260\u9760\u8FD1\u7684\u8DDD\u96E2\uFF0C\u6216\u9810\u5224\u885D\u523A\uFF1B\u88AB\u64CA\u98DB\u6642\u63D0\u65E9\u6309\u885D\u523A\u6709\u6A5F\u6703\u6551\u56DE`:`\u88AB${n.name}\u903C\u4E0B\u61F8\u5D16\u2014\u2014\u88AB\u64CA\u98DB\u6642\u53EF\u4EE5\u99AC\u4E0A\u885D\u523A\u56DE\u5CF6\u4E0A`:"\u4F60\u81EA\u5DF1\u885D\u51FA\u4E86\u61F8\u5D16\u2014\u2014\u885D\u523A\u524D\u5148\u770B\u8173\u4E0B":n?`\u751F\u547D\u88AB${n.name}\u6253\u5230\u6B78\u96F6\u2014\u2014\u5728\u7260\u51FA\u62DB\u5F8C\u7684\u7A7A\u6A94\u53CD\u64CA\uFF0C\u5225\u786C\u62DA`:"\u751F\u547D\u6B78\u96F6"}edgeDistance(e){return Ft(e,this.state.island.poly)}pendingProjectiles(){return this.state.projectiles}place(e,t,n){let i=this.fighter(e);i&&(i.pos={...t},n!==void 0&&(i.facing=n))}debugKill(e,t){let n=this.fighter(e);!n||!s.alive(n)||(t==="hp"?(n.hp=0,this.die(n,"hp")):this.startFall(n,{x:0,z:0}))}debugDamage(e,t,n,i,r){let o=this.fighter(e),a=this.fighter(t);return o&&a?this.damage(o,a,n,i,r):!1}};function ld(s){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0}}}var cd=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null,face:null});function hd(s){return s.state!=="dead"&&s.state!=="falling"&&s.state!=="reviving"}function ud(s,e,t,n){let i=t;for(let r of s.state.island.rocks){let o=Xe(e.pos,ce(i,1.2));if(ot(o,r.pos)>=r.r+e.radius+.3)continue;let a=Ln(Se(rt(r.pos,e.pos))),l=Zt(i,a);i=Se(Xe(i,ce(a,(Math.abs(l)>.001?Math.sign(l):n)*1.5)))}return i}function dd(s,e,t,n){let i=cd(),r=s.player;if(!hd(r))return i;let o=rt(r.pos,e.pos),a=ct(o),l=a>1e-6?ce(o,1/a):{x:Math.cos(e.facing),z:Math.sin(e.facing)};if(i.face=l,e.state!=="idle")return i;if(a<=Me.bearer.approach&&e.cooldowns.push<=0&&(s.heavyOwner===null||s.heavyOwner===e.id)&&(e.breakT??0)<=0)return i.cast={skill:"push",dir:null},i;let c=a>1.4?l:{x:0,z:0};return ct(c)>0&&(c=ud(s,e,c,t.strafeDir),s.edgeDistance(Xe(e.pos,ce(c,1.2)))<.8&&(c=Se(Xe(c,ce(Se(ce(e.pos,-1)),.8))))),i.move=c,i}function fd(s,e,t,n){let i=cd(),r=s.player;if(!hd(r))return i;let o=rt(r.pos,e.pos),a=ct(o),l=a>1e-6?ce(o,1/a):{x:1,z:0};if(e.state!=="idle")return i.move=ce(t.move,.5),i;if(a<Me.archer.backstepTrigger&&e.cooldowns.dash<=0)return i.dash=!0,i.dashDir=Mm(s,e,l),i;if(t.thinkT-=n,t.strafeT-=n,t.thinkT<=0){t.thinkT=en.think,t.strafeT<=0&&(t.strafeT=en.strafeSwitchMin+(en.strafeSwitchMax-en.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1));let c=ce(Ln(l),t.strafeDir),h,u=Me.archer;if(r.state==="guard"&&r.shieldDir){let d=Se(Ln(r.shieldDir)),f=ce(d,-1),m=Xe(r.pos,ce(d,(u.preferMin+u.preferMax)/2)),x=Xe(r.pos,ce(f,(u.preferMin+u.preferMax)/2)),g=s.edgeDistance(m)>1.5?ot(m,e.pos):1/0,p=s.edgeDistance(x)>1.5?ot(x,e.pos):1/0,y=g<=p?m:x;h=ot(y,e.pos)>.6?Se(rt(y,e.pos)):c}else if(a>u.preferMax)h=Se(Xe(l,ce(c,.4)));else if(a<u.preferMin){let d=ce(l,-1);h=s.edgeDistance(Xe(e.pos,ce(d,2)))<en.edgeDanger+.5?c:Se(Xe(d,ce(c,.5)))}else h=c;s.edgeDistance(Xe(e.pos,ce(h,1.5)))<en.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,h=Se(ce(e.pos,-1))),t.move=ud(s,e,h,t.strafeDir)}if(i.move=t.move,e.cooldowns.basic<=0&&a<hn.range-.5&&s.lineOfSight(e.pos,r.pos)){let c=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=sr(l,c)}return i}function Mm(s,e,t){let n=ce(t,-1),i=[n,Se(Xe(n,Ln(t))),Se(rt(n,Ln(t))),Se(Ln(t)),ce(Se(Ln(t)),-1)],r=n,o=-1/0;for(let a of i){let l=s.edgeDistance(Xe(e.pos,ce(a,Me.archer.backstep)));if(a===n&&l>=1)return n;l>o&&(o=l,r=a)}return r}var Pt=1e-9;function pd(s,e){let t=ct(s),n=ct(e);return t<1e-12||n<1e-12?Math.PI:Math.acos(Math.max(-1,Math.min(1,Zt(s,e)/(t*n))))}function Sm(s,e,t){let n=Math.atan2(s.x*e.z-s.z*e.x,Zt(s,e));return Math.abs(n)<=t+Pt?Se(e):Vi(En(s)+Math.sign(n)*t)}function Em(s,e,t){let n=e-s;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return Math.abs(n)<=t?e:s+Math.sign(n)*t}var md={dash:0,bash:1,counterMelee:1,guard:2,throw:3,charge:3,push:3,fire:4},gd={1:"melee1",2:"melee2",3:"melee3"},ih=s=>s==="melee1"||s==="melee2"||s==="melee3",or=class extends kt{constructor(t=1,n="ares",i){super(i?.mode??"waves",t,i?.variant??"v4");this.scripted=new Map;this.fxMap=new Map;this.aiV4=new Map;this.buf=null;this.combo=null;this.comboManualDir=null;this.lastMeleeTarget=null;this.guardSt=null;this.counter=null;this.threat=null;this.waveIdx=0;this.wavePhase="fight";this.waveClearAt=0;this.waveMembers=[];this.pendingSpawns=[];this.waveList=Me.waves.list;this.droppedPresses=0;i&&(this.state.island=i.island,this.waveList=i.waves),this.nextId=1;let r=this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"guardian");r.hp=r.maxHp=Me.player.hp,r.radius=Me.player.radius,r.cooldowns={basic:0,control:0,push:0,dash:0},r.cooldownMax={basic:0,control:$t.cooldown,push:n==="ares"?Me.charge.cooldown:n==="none"?Kt.cooldown:Me.guard.lock,dash:Pn.cooldown},r.path=n,this.initV4Fields(r),r.shieldDir=n==="mars"?Vi(r.facing):null,this.state.fighters=[r],this.state.playerId=r.id,this.state.ledgeDepth=2.6,this.state.v4={path:n,wave:{index:0,total:this.waveList.length,remaining:0},revivesLeft:Me.revive.count,kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0}},this.spawnWave(1,this.chooseSpawns(this.waveList[0].length)),this.sync(r)}untouchable(t){return t.invulnT>0||(t.protectT??0)>0}wonNow(){return this.wavePhase==="done"}onDamaged(t,n,i,r){}beginWaves(t){this.waveList=t,this.waveIdx=0,this.waveMembers=[],this.pendingSpawns=[],this.spawnWave(1,this.chooseSpawns(t[0].length))}calmPlayer(t){let n=this.fx(t);this.cancelWindup(t),n.act=null,n.slide=null,n.hitstunT=0,n.stunKind=null,n.heavyArmor=!1,this.clearPlayer(t),t.burstLeft=0,this.bursts.delete(t.id),this.dashBuf.delete(t.id),t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.breakT=0,this.setState(t,"idle")}initV4Fields(t){t.breakT=0,t.armorT=0,t.armorKind=null,t.shieldDir=null,t.shieldUp=!1,t.guard=null,t.counterT=0,t.counterTargetId=null,t.meleeStep=0,t.protectT=0}fx(t){let n=this.fxMap.get(t.id);return n||(n={hitstunT:0,stunKind:null,heavyArmor:!1,stackArmorT:0,stackHits:[],act:null,slide:null,noTurnUntil:-1},this.fxMap.set(t.id,n)),n}canLedge(t){return t.team==="player"}enemies(){return this.state.fighters.filter(t=>t.team==="enemy"&&kt.alive(t))}armored(t){let n=this.fx(t);return n.heavyArmor||n.stackArmorT>0}coverOn(){return this.coverOverride??!0}step(t){let n=this.state,i=zn;n.time+=i;for(let r of n.fighters)this.tickTimers(r,i);for(let r of n.fighters)kt.alive(r)&&!this.suspended(r)&&this.settle(r);for(let r of n.fighters){if(!kt.alive(r)||this.suspended(r))continue;let o;if(this.ended)o=Ds;else if(r.team==="player")o=t;else{let a=this.scripted.get(r.id);a?(o=a,this.scripted.delete(r.id)):this.aiEnabled?o=this.aiFor(r):o=Ds}this.control(r,o)}for(let r of n.fighters)this.suspended(r)||this.advance(r,i);this.separate(),this.moveProjectiles(i),this.tickWaves(),this.checkEnd();for(let r of n.fighters)this.sync(r);this.recordHistory()}aiFor(t){let n=this.aiV4.get(t.id);return n||(n=ld(this.rng),this.aiV4.set(t.id,n)),t.kit==="shieldbearer"?dd(this,t,n,zn):fd(this,t,n,zn)}tickTimers(t,n){super.tickTimers(t,n);let i=this.fx(t);i.hitstunT=Math.max(0,i.hitstunT-n),i.stackArmorT=Math.max(0,i.stackArmorT-n),t.breakT=Math.max(0,(t.breakT??0)-n),t.protectT=Math.max(0,(t.protectT??0)-n),t.guard&&(t.guard.since+=n),(t.counterT??0)>0&&(t.counterT=Math.max(0,(t.counterT??0)-n))}settle(t){let n=this.fx(t),i=this.state.time;t.state==="hitstun"&&n.hitstunT<=Pt&&(n.stunKind=null,this.setState(t,"idle")),t.state==="recover"&&n.act&&(n.act.kind==="melee"||n.act.kind==="recover")&&t.stateT>=n.act.recDur-Pt?this.endRecover(t):t.state==="recover"&&(!n.act||n.act.kind!=="melee"&&n.act.kind!=="recover")&&this.endRecover(t),t.state==="idle"&&n.hitstunT>Pt&&this.setState(t,"hitstun"),t.team==="player"&&(t.state==="guard"&&this.guardSt&&i-this.guardSt.raisedAt>=Me.guard.maxHold-Pt&&this.lowerGuard(t,"timeout",!0),this.counter&&(t.counterT??0)<=Pt&&this.loseCounter(t,this.counter.released?"timeout":"held"),this.combo&&t.state==="idle"&&i>this.combo.until+Pt&&this.resetCombo(t))}endRecover(t){let n=this.fx(t),i=n.act;n.act=null,this.setState(t,"idle"),i&&i.kind==="melee"&&(i.struck||(this.lastMeleeTarget=null),this.combo&&(this.combo.until=this.state.time+Me.comboWindow))}sync(t){let n=this.fx(t);n.heavyArmor&&t.windup?(t.armorT=Math.max(0,t.windup.dur-t.windup.t),t.armorKind="heavy"):n.stackArmorT>0?(t.armorT=n.stackArmorT,t.armorKind="stack"):(t.armorT=0,t.armorKind=null),t.kit==="shieldbearer"&&(t.shieldDir=Vi(t.facing),t.shieldUp=kt.alive(t)&&(t.breakT??0)<=0),t.team==="player"&&(t.guard&&(t.guard.perfect=t.guard.since<=Me.guard.perfect+Pt),t.counterTargetId=this.counter?this.counter.targetId:null,this.counter||(t.counterT=0))}control(t,n){t.team==="player"?this.controlPlayer(t,n):this.controlEnemy(t,n)}controlPlayer(t,n){let i=this.state.time;if(t.path==="mars"&&(this.counter&&!this.counter.released&&!n.guardHeld?(this.counter.released=!0,t.state==="guard"&&this.lowerGuard(t,"release",!1)):t.state==="guard"&&!n.guardHeld&&this.lowerGuard(t,"release",!0)),n.dash&&this.counter&&this.loseCounter(t,"dash"),t.state==="ledge"||t.state==="climb"||t.state==="knocked"){this.dropBuf(),this.droppedPresses+=(n.firePressed?1:0)+(n.cast?1:0)+(t.path==="mars"&&n.guardPressed?1:0),super.control(t,n);return}let r=n.dashDir&&ct(n.dashDir)>.01?Se(n.dashDir):ct(n.move)>.2?Se(n.move):this.facingDir(t);n.dash&&this.dashBuf.set(t.id,{at:i,dir:r,dashOk:!1});let o=[],a=this.counterUsable(t);if(n.dash&&o.push({type:"dash",at:i,dir:r,untilRecEnd:!1}),t.path==="mars"&&n.guardPressed&&o.push({type:a?"bash":"guard",at:i,dir:n.guardDir??null,untilRecEnd:!1}),n.cast){let h=n.cast.skill==="control"?"throw":t.path==="ares"?"charge":t.path==="none"?"push":null;h&&o.push({type:h,at:i,dir:n.cast.dir,untilRecEnd:!1})}n.firePressed&&o.push({type:a?"counterMelee":"fire",at:i,dir:n.fireDir,untilRecEnd:!1}),o.sort((c,h)=>md[c.type]-md[h.type]);let l=!1;for(let c of o){if(l){this.droppedPresses++;continue}if(this.onCooldown(t,c)){this.droppedPresses++;continue}let h=this.pressRule(t,c);if(h==="drop"){this.droppedPresses++;continue}this.dropBuf(),this.buf={...c,untilRecEnd:h==="recEnd"},l=!0}if(this.buf&&!this.buf.untilRecEnd&&i-this.buf.at>Me.inputBuffer+Pt&&this.dropBuf(),this.buf){let c=this.pressRule(t,this.buf);if(c==="now"){let h=this.buf;if(this.buf=null,this.execute(t,h,n)){this.playerMove(t,n),this.updateGuardDir(t,n);return}this.droppedPresses++}else c==="drop"&&this.dropBuf()}!this.buf&&n.fire&&this.activity(t)==="free"&&this.startMelee(t,n,null),this.playerMove(t,n),this.updateGuardDir(t,n)}dropBuf(){this.buf&&this.droppedPresses++,this.buf=null}onCooldown(t,n){switch(n.type){case"dash":return t.cooldowns.dash>0;case"throw":return t.cooldowns.control>0;case"charge":case"push":case"guard":return t.cooldowns.push>0;default:return!1}}activity(t){let n=this.fx(t);switch(t.state){case"idle":return(t.breakT??0)>0||n.hitstunT>Pt?"stun":"free";case"hitstun":return"stun";case"windup":{let i=t.windup?.skill;return ih(i)?"meleeWindup":i==="charge"?"charge":"castWindup"}case"recover":{let i=n.act;return i&&i.kind==="recover"&&(i.tag==="chargeHit"||i.tag==="chargeMiss")?"charge":"meleeRecover"}case"charge":return"charge";case"guard":return"guard";case"dash":return"dash";default:return"other"}}pressRule(t,n){let i=n.type==="fire"||n.type==="counterMelee";switch(this.activity(t)){case"free":return"now";case"meleeWindup":case"castWindup":return n.type==="dash"?"now":"drop";case"meleeRecover":{if(n.type!=="dash")return"buffer";let r=this.fx(t).act;return(r&&(r.kind==="melee"||r.kind==="recover")?r.recDur:0)-t.stateT<=Me.inputBuffer+Pt?"recEnd":"drop"}case"charge":return i?"buffer":"drop";case"guard":return n.type==="dash"?"now":"drop";case"dash":case"stun":return n.type==="dash"?"drop":"buffer";default:return"drop"}}execute(t,n,i){switch(n.type){case"dash":return this.doDash(t,n.dir??this.facingDir(t));case"bash":return this.counterUsable(t)?this.doCounterBash(t,i):i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"counterMelee":return this.counterUsable(t)?this.doCounterMelee(t,i):this.startMelee(t,i,n.dir);case"guard":return i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"throw":return t.cooldowns.control>0?!1:(this.resetCombo(t),this.startWindup(t,"control",this.aimOrAuto(t,n.dir,$t.range),$t.windup),!0);case"charge":return this.startCharge(t,i,n);case"push":return t.cooldowns.push>0?!1:(this.resetCombo(t),this.startWindup(t,"push",this.aimOrAuto(t,n.dir,Kt.range+2),Kt.windup),!0);case"fire":return this.startMelee(t,i,n.dir)}}playerMove(t,n){let i=this.fx(t),r=0;switch(t.state){case"idle":r=(t.breakT??0)>0?.5:1;break;case"windup":r=ih(t.windup?.skill)?Me.attackMoveMult:t.windup?.skill==="charge"?0:po;break;case"recover":{let c=i.act;r=c&&c.kind==="melee"?Me.attackMoveMult:c&&c.kind==="recover"&&(c.tag==="chargeHit"||c.tag==="chargeMiss")?0:.3;break}case"guard":r=Me.guard.moveMult;break;default:r=0}if(r<=0){t.moveVel={x:0,z:0};return}let o=n.move,a=ct(o);a>1&&(o=ce(o,1/a));let l=Me.player.speed*r*(t.slowT>0?fo:1);t.moveVel=ce(o,l),t.state==="idle"&&a>.1&&(t.facing=En(o))}doDash(t,n){return t.cooldowns.dash>0?!1:(t.state==="guard"&&this.lowerGuard(t,"dash",!0),this.resetCombo(t),this.fx(t).act=null,this.fx(t).slide=null,this.dashBuf.delete(t.id),this.startDash(t,{...Ds,dashDir:n}),!0)}comboNext(){return this.combo&&this.state.time<=this.combo.until+Pt?this.combo.next:1}resetCombo(t){t.team==="player"&&(this.combo=null,this.comboManualDir=null,this.lastMeleeTarget=null,t.meleeStep=0)}meleeDir(t,n){if(this.comboManualDir)return this.comboManualDir;let i=this.lastMeleeTarget!==null?this.fighter(this.lastMeleeTarget):void 0;if(i&&kt.alive(i)&&ot(i.pos,t.pos)<=Me.target.keep+Pt&&ot(i.pos,t.pos)>1e-6)return Se(rt(i.pos,t.pos));let r=this.facingDir(t),o=null,a=1/0;for(let l of this.enemies()){let c=ot(l.pos,t.pos);c>Me.target.autoRange+Pt||c<1e-6||Zt(Se(rt(l.pos,t.pos)),r)<Math.cos(Me.target.autoHalfAngle)-Pt||c<a&&(a=c,o=l)}return o?Se(rt(o.pos,t.pos)):ct(n.move)>.2?Se(n.move):r}startMelee(t,n,i){let r=this.comboNext();r===1&&(this.comboManualDir=null);let o=n.fireDir&&ct(n.fireDir)>.01?Se(n.fireDir):i&&ct(i)>.01?Se(i):null;o&&(this.comboManualDir=o);let a=this.meleeDir(t,n),l=Me.melee[r-1];return this.fx(t).act={kind:"melee",step:r,counter:!1,dir:a,hitIds:new Set,stepLeft:l.step,stepSpeed:l.step/l.windup,recDur:l.recover,struck:!1,bestD:1/0},this.combo={next:r===3?1:r+1,until:1/0},t.meleeStep=r,this.startWindup(t,gd[r],a,l.windup),!0}releaseMelee(t){let n=this.fx(t).act;t.windup=null,this.setState(t,"recover"),n&&n.kind==="melee"&&this.strikeMelee(t,n,!0)}meleeGeom(t,n,i,r){let o=Me.melee[r-1],a=rt(n.pos,t.pos),l=ct(a);if(l>o.range+n.radius+Pt)return!1;if(l<.6)return!0;if(o.shape==="fan")return Zt(ce(a,1/l),i)>=Math.cos(o.halfAngle)-Pt;let c=Zt(a,i),h=Math.abs(a.x*i.z-a.z*i.x);return c>=0&&h<=o.width/2+n.radius+Pt}strikeMelee(t,n,i){let r=Me.melee[n.step-1],o=n.counter?"counterMelee":gd[n.step],a=!1,l=null;for(let c of[...this.state.fighters]){if(c.team===t.team||!kt.alive(c)||n.hitIds.has(c.id)||!this.meleeGeom(t,c,n.dir,n.step)||this.coverOn()&&this.rockOnSegment(t.pos,c.pos))continue;n.hitIds.add(c.id);let h=ot(t.pos,c.pos),u=this.resolveHit(t,c,{kind:o,dmg:r.dmg,fromDir:Se(rt(t.pos,c.pos)),melee:!0,stun:r.stun>0?r.stun:void 0,knock:r.knock>0?{dir:n.dir,dist:r.knock}:null});u==="bearer"?l=c:(u==="hit"||u==="armored")&&(a=!0,n.struck=!0,h<n.bestD&&(n.bestD=h,this.lastMeleeTarget=c.id))}i&&this.emit({type:"melee",ownerId:t.id,step:n.step,pos:{...t.pos},dir:{...n.dir},hit:a,counter:n.counter}),l&&kt.alive(t)&&this.recoil(t,l)}recoil(t,n){let i=this.fx(t);i.act=null,this.cancelWindup(t),this.resetCombo(t),i.hitstunT=Math.max(i.hitstunT,Me.recoil),i.stunKind="recoil",t.state!=="knocked"&&this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:Se(rt(t.pos,n.pos)),dur:Me.recoil})}startCharge(t,n,i){if(t.cooldowns.push>0)return!1;let r=i.dir&&ct(i.dir)>.01?Se(i.dir):null;if(!r&&ct(n.move)>.2&&(r=Se(n.move)),!r){let o=null,a=1/0;for(let l of this.enemies()){let c=ot(l.pos,t.pos);c<=Me.charge.autoRange+Pt&&c>1e-6&&c<a&&(a=c,o=l)}r=o?Se(rt(o.pos,t.pos)):this.facingDir(t)}return this.resetCombo(t),t.cooldowns.push=Math.max(0,Me.charge.cooldown-(this.state.time-i.at)),this.fx(t).act={kind:"charge",dir:r,moved:0},this.startWindup(t,"charge",r,Me.charge.windup),!0}advanceCharge(t,n){let i=this.fx(t),r=i.act;if(!r||r.kind!=="charge"){this.setState(t,"idle");return}let o=Me.charge,a=Math.min(o.distance-r.moved,o.distance/o.time*n),l=this.activeMove(t,ce(r.dir,a),"contact");if(r.moved+=l.moved,l.enemy){this.chargeImpact(t,l.enemy,r);return}(l.blocked||r.moved>=o.distance-1e-6)&&(i.act={kind:"recover",tag:"chargeMiss",recDur:o.missRecover},this.setState(t,"recover"))}chargeImpact(t,n,i){let r=this.fx(t),o=Me.charge,a=n.kit==="shieldbearer"?{knock:{dir:i.dir},breakDur:o.breakDur}:{knock:{dir:i.dir},stun:o.archerStun},l=this.resolveHit(t,n,{kind:"charge",dmg:o.dmg,fromDir:Se(rt(t.pos,n.pos)),melee:!0,...a});if(kt.alive(t)){if(l==="bearer"){r.act=null,r.hitstunT=Math.max(r.hitstunT,o.bounceStun),r.stunKind="bounce",r.slide={dir:ce(i.dir,-1),left:o.bounce,speed:o.bounce/o.bounceTime},this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:ce(i.dir,-1),dur:o.bounceStun});return}r.act={kind:"recover",tag:"chargeHit",recDur:o.hitRecover},this.setState(t,"recover")}}raiseGuard(t,n,i){if(t.path!=="mars"||t.cooldowns.push>0)return!1;let r=this.state.time;this.resetCombo(t),this.fx(t).act=null,this.guardSt={pressAt:i,raisedAt:r,counterMade:!1},t.guard={since:r-i,perfect:r-i<=Me.guard.perfect+Pt},t.shieldUp=!0,this.threat=null;let a=(n.guardDir&&ct(n.guardDir)>.01?Se(n.guardDir):null)??this.autoGuardDir(t)??this.facingDir(t);return t.shieldDir=a,t.facing=En(a),this.setState(t,"guard"),this.emit({type:"guardUp",ownerId:t.id}),!0}lowerGuard(t,n,i){t.state==="guard"&&this.setState(t,"idle"),t.guard=null,t.shieldUp=!1,this.guardSt=null,this.threat=null,i&&(t.cooldowns.push=Me.guard.lock),this.emit({type:"guardDown",ownerId:t.id,reason:n})}updateGuardDir(t,n){if(t.state!=="guard"||!t.shieldDir)return;let i=n.guardDir&&ct(n.guardDir)>.01?Se(n.guardDir):null;i&&(this.threat=null);let r=i??this.autoGuardDir(t);r&&(t.shieldDir=Sm(t.shieldDir,r,Me.guard.turnRate*zn)),t.facing=En(t.shieldDir)}heavyCovers(t,n){let i=t.windup;if(!i||i.skill!=="enemyHeavy"||t.state!=="windup")return!1;let r=rt(n.pos,t.pos),o=ct(r);return o>an.range+n.radius||!(o<.6||Zt(ce(r,1/o),i.dir)>=Math.cos(an.halfAngle))?!1:!this.rockOnSegment(t.pos,n.pos)}arrowHeading(t,n){let i=rt(n.pos,t.pos),r=Zt(i,t.dir);if(r<=0||Math.abs(i.x*t.dir.z-i.z*t.dir.x)>n.radius+t.radius||t.range-t.traveled<r-n.radius)return null;let a=Xe(t.pos,ce(t.dir,r));return this.state.island.rocks.some(l=>rr(t.pos,a,l.pos,l.r+t.radius*.5))?null:r}threatValid(t,n){if(n.kind==="heavy"){let r=this.fighter(n.id);return!r||!kt.alive(r)||r.windup!==n.w||ot(r.pos,t.pos)>Me.guard.threatDrop?!1:this.heavyCovers(r,t)}let i=this.state.projectiles.find(r=>r.id===n.id);return!i||!i.alive||ot(i.pos,t.pos)>Me.guard.threatDrop?!1:this.arrowHeading(i,t)!==null}autoGuardDir(t){if(this.threat&&!this.threatValid(t,this.threat)&&(this.threat=null),!this.threat){let r=null,o=1/0;for(let a of this.enemies()){if(!this.heavyCovers(a,t))continue;let l=a.windup,c=l.dur-l.t;c<o&&(o=c,r={kind:"heavy",id:a.id,w:l})}for(let a of this.state.projectiles){if(!a.alive||a.team===t.team||a.kind!=="enemyBasic")continue;let l=ot(a.pos,t.pos);if(l>Me.guard.arrowScan||this.arrowHeading(a,t)===null)continue;let c=l/a.speed;c<o&&(o=c,r={kind:"arrow",id:a.id})}this.threat=r}let n=this.threat;if(!n)return null;if(n.kind==="heavy"){let r=this.fighter(n.id);return Se(rt(r.pos,t.pos))}let i=this.state.projectiles.find(r=>r.id===n.id);return ce(i.dir,-1)}counterUsable(t){return this.counter!==null&&this.counter.released&&(t.counterT??0)>Pt}loseCounter(t,n){this.counter&&(this.counter=null,t.counterT=0,t.counterTargetId=null,this.emit({type:"counterLost",ownerId:t.id,reason:n}))}useCounter(t,n){this.counter=null,t.counterT=0,t.counterTargetId=null,this.state.v4.counters[n]++,this.emit({type:"counterUsed",ownerId:t.id,kind:n})}counterAim(t,n,i,r){let o=this.counter?this.fighter(this.counter.targetId):void 0;return o&&kt.alive(o)&&ot(o.pos,t.pos)<=n+Pt&&ot(o.pos,t.pos)>1e-6?Se(rt(o.pos,t.pos)):i&&ct(i)>.01?Se(i):this.meleeDir(t,r)}doCounterBash(t,n){let i=Me.counter.bash;this.resetCombo(t);let r=this.counterAim(t,i.aimRange,n.guardDir,n);this.useCounter(t,"bash"),t.facing=En(r);for(let o of[...this.state.fighters]){if(o.team===t.team||!kt.alive(o))continue;let a=rt(o.pos,t.pos),l=ct(a);l>i.range+o.radius||(l<.6||Zt(ce(a,1/l),r)>=Math.cos(i.halfAngle)-Pt)&&(this.coverOn()&&this.rockOnSegment(t.pos,o.pos)||this.resolveHit(t,o,{kind:"counterBash",dmg:i.dmg,fromDir:Se(rt(t.pos,o.pos)),melee:!0,knock:{dir:r,mult:i.knockMult}}))}return t.cooldowns.push=Me.guard.lock,kt.alive(t)&&t.state!=="knocked"&&(this.fx(t).act={kind:"recover",tag:"bash",recDur:i.recover},this.setState(t,"recover")),!0}doCounterMelee(t,n){let i=Me.counter.melee;this.resetCombo(t);let r=n.fireDir&&ct(n.fireDir)>.01?Se(n.fireDir):null,o=this.counterAim(t,i.aimRange,r,n);r&&(this.comboManualDir=r),this.useCounter(t,"melee"),t.facing=En(o),this.activeMove(t,ce(o,i.step),"stop");let a=Me.melee[0],l={kind:"melee",step:1,counter:!0,dir:o,hitIds:new Set,stepLeft:0,stepSpeed:0,recDur:a.recover,struck:!1,bestD:1/0};return this.fx(t).act=l,this.combo={next:2,until:1/0},t.meleeStep=1,this.setState(t,"recover"),this.strikeMelee(t,l,!0),!0}canTurn(t){return t.state==="idle"&&this.state.time>=this.fx(t).noTurnUntil-Pt}controlEnemy(t,n){let i=this.fx(t),r=(t.breakT??0)>0;if(t.kit==="shieldbearer"&&n.face&&ct(n.face)>.01&&this.canTurn(t)&&(t.facing=Em(t.facing,En(n.face),Me.bearer.turnRate*zn)),t.state==="idle"&&!r&&i.hitstunT<=Pt){if(t.kit==="shieldbearer"&&n.cast&&n.cast.skill==="push"&&t.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===t.id)){this.heavyOwner=t.id,this.startWindup(t,"enemyHeavy",this.facingDir(t),an.windup),t.moveVel={x:0,z:0};return}if(t.kit==="archer"){if(n.dash&&n.dashDir&&ct(n.dashDir)>.01&&t.cooldowns.dash<=0){this.startBackstep(t,Se(n.dashDir));return}if(n.fire&&t.burstLeft===0&&t.cooldowns.basic<=0){this.startWindup(t,"enemyBasic",this.aimOrAuto(t,n.fireDir,hn.range),hn.windup);return}}}if(t.state==="idle"||t.state==="windup"||t.state==="recover"){let o=n.move,a=ct(o);a>1&&(o=ce(o,1/a));let l=t.kit==="shieldbearer"?Me.bearer.speed:Me.archer.speed;t.slowT>0&&(l*=fo),r&&(l*=.5),t.burstLeft>0&&(l*=wa),t.state==="windup"&&(l*=po),t.state==="recover"&&(l*=.3),t.moveVel=ce(o,l),t.kit==="archer"&&t.state==="idle"&&t.burstLeft===0&&a>.1&&(t.facing=En(o))}else t.moveVel={x:0,z:0}}startBackstep(t,n){t.cooldowns.dash=Me.archer.backstepCooldown,this.fx(t).act={kind:"backstep",dir:n,left:Me.archer.backstep},t.moveVel={x:0,z:0},this.setState(t,"dash"),this.emit({type:"dash",ownerId:t.id,from:{...t.pos},dir:{...n}})}advance(t,n){let i=this.fx(t);switch(t.state){case"dead":case"falling":case"knocked":case"ledge":case"climb":super.advance(t,n);return;case"dash":if(i.act&&i.act.kind==="backstep"){this.advanceBackstep(t,i.act,n);break}super.advance(t,n);return;case"reviving":t.stateT>=Me.revive.delay-Pt&&this.revive(t);return;case"windup":this.advanceWindup(t,n);break;case"recover":this.walk(t,n),i.act&&i.act.kind==="melee"&&t.stateT<=Me.meleeActive+Pt&&this.strikeMelee(t,i.act,!1);break;case"charge":this.advanceCharge(t,n);break;case"idle":case"guard":this.walk(t,n);break;case"hitstun":t.moveVel={x:0,z:0};break}if(i.slide&&(t.state==="idle"||t.state==="hitstun"||t.state==="guard"||t.state==="recover"||t.state==="windup")){let o=Math.min(i.slide.left,i.slide.speed*n),a=this.activeMove(t,ce(i.slide.dir,o),"stop");i.slide.left-=o,(a.blocked||i.slide.left<=1e-6)&&(i.slide=null)}if((t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&Ft(t.pos,this.state.island.poly)<0){this.startFall(t,{x:0,z:0});return}this.tickBurst(t,n)}advanceBackstep(t,n,i){let r=Math.min(n.left,Me.archer.backstep/Me.archer.backstepTime*i),o=this.activeMove(t,ce(n.dir,r),"none");n.left-=r,(o.blocked||n.left<=1e-6)&&(this.fx(t).act=null,this.setState(t,"idle"))}advanceWindup(t,n){let i=t.windup,r=this.fx(t);i.t+=n;let o=r.act;if(ih(i.skill)&&o&&o.kind==="melee"&&o.stepLeft>0){let a=Math.min(o.stepLeft,o.stepSpeed*n),l=this.activeMove(t,ce(o.dir,a),"stop");o.stepLeft=l.blocked?0:o.stepLeft-a}i.skill==="enemyHeavy"&&!r.heavyArmor&&i.t>=i.dur-Me.bearer.heavyArmor-Pt&&(r.heavyArmor=!0,this.emit({type:"armor",ownerId:t.id,kind:"heavy",dur:Me.bearer.heavyArmor})),i.skill!=="charge"&&this.walk(t,n),i.t>=i.dur-Pt&&this.releaseV4(t)}releaseV4(t){let n=t.windup,i=this.fx(t);switch(n.skill){case"melee1":case"melee2":case"melee3":this.releaseMelee(t);return;case"charge":t.windup=null,this.setState(t,"charge"),this.emit({type:"charge",ownerId:t.id,from:{...t.pos},dir:{...n.dir}});return;case"enemyHeavy":this.releaseWindup(t),i.heavyArmor=!1,i.noTurnUntil=this.state.time+an.recover,t.state==="recover"&&(i.act={kind:"recover",tag:"heavy",recDur:an.recover});return;case"push":this.releaseWindup(t),t.state==="recover"&&(i.act={kind:"recover",tag:"push",recDur:Kt.recover});return;default:this.releaseWindup(t)}}activeMove(t,n,i){if(i==="contact"){let h=this.contactAt(t,t.pos);if(h)return{moved:0,blocked:"enemy",enemy:h}}let r=ct(n);if(r<1e-12)return{moved:0,blocked:null,enemy:null};let o=Math.max(1,Math.ceil(r/.02)),a=ce(n,1/o),l=r/o,c=0;for(let h=0;h<o;h++){let u=Xe(t.pos,a),d=this.moveBlock(t,t.pos,u,i);if(d){let f=0,m=1;for(let x=0;x<30;x++){let g=(f+m)/2;this.moveBlock(t,t.pos,Xe(t.pos,ce(a,g)),i)?m=g:f=g}return t.pos=Xe(t.pos,ce(a,f)),c+=l*f,{moved:c,blocked:d.kind,enemy:d.enemy}}t.pos=u,c+=l}return{moved:c,blocked:null,enemy:null}}contactAt(t,n){let i=null,r=1/0;for(let o of this.state.fighters){if(o.team===t.team||!kt.alive(o))continue;let a=ot(n,o.pos);a<=Me.charge.contact+Pt&&a<r&&(r=a,i=o)}return i}moveBlock(t,n,i,r){let o=this.state.island.poly,a=Ft(i,o);if(a<Me.edgeMargin&&a<Ft(n,o)-1e-12)return{kind:"edge",enemy:null};for(let l of this.state.island.rocks){let c=ot(i,l.pos),h=l.r+t.radius;if(c<h&&c<ot(n,l.pos)-1e-12)return{kind:"rock",enemy:null}}if(r==="contact"){let l=this.contactAt(t,i);if(l)return{kind:"enemy",enemy:l}}else if(r==="stop")for(let l of this.state.fighters){if(l.team===t.team||!kt.alive(l))continue;let c=ot(i,l.pos),h=t.radius+l.radius;if(c<h&&c<ot(n,l.pos)-1e-12)return{kind:"enemy",enemy:l}}return null}cancelWindup(t){if(t.windup){let n=this.fx(t);n.heavyArmor=!1,n.act&&(n.act.kind==="melee"||n.act.kind==="charge")&&(n.act=null)}super.cancelWindup(t)}resolveHit(t,n,i){let r=this.state;if(this.untouchable(n))return"invuln";if(n.kit==="shieldbearer"&&(n.breakT??0)<=0&&pd(i.fromDir,this.facingDir(n))<=Me.bearer.frontHalfAngle+1e-7)return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:"bearer",skill:i.kind,pos:Xe(n.pos,ce(i.fromDir,n.radius)),dir:ce(i.fromDir,-1)}),"bearer";if(n.state==="guard"&&n.shieldUp&&n.shieldDir&&n.guard&&pd(i.fromDir,n.shieldDir)<=Me.guard.blockHalfAngle+1e-7)return this.guardBlock(t,n,i);let o=n.slowT>0,a=n.hp;n.hp=Math.max(0,n.hp-i.dmg),this.onDamaged(t,n,i.kind,a-n.hp),n.hitFlashT=.12,n.lastHitBy=t.id,n.lastHitAt=r.time,this.lastHitKind.set(n.id,i.kind),this.hitstop=Math.max(this.hitstop,Ta[i.kind]),i.slow&&(n.slowT=i.slow),n.team==="player"&&this.loseCounter(n,"hit");let l=this.armored(n),c=0,h=!1,u=!1;if(n.hp>0&&!l&&(i.breakDur&&this.applyBreak(t,n,i.breakDur),i.knock&&(c=i.knock.dist??kt.knockDistance(n.hp,n.maxHp,o)*(i.knock.mult??1),u=this.applyKnock(n,i.knock.dir,c,t,i.kind),h=!0),i.stun&&!u&&(this.applyStun(n,i.stun),h=!0)),u||this.emit({type:"hit",targetId:n.id,sourceId:t.id,kind:i.kind,pos:{...n.pos},dir:i.knock?Se(i.knock.dir):ce(i.fromDir,-1),dmg:i.dmg,knock:c}),n.hp<=0)return this.cancelWindup(n),this.die(n,"hp"),"hit";if(l)return"armored";if(h){let d=this.fx(n),f=r.time;d.stackHits=d.stackHits.filter(m=>f-m<=Me.stack.window+Pt),d.stackHits.push(f),d.stackHits.length>=Me.stack.hits&&(d.stackHits=[],d.stackArmorT=Me.stack.armor,this.emit({type:"armor",ownerId:n.id,kind:"stack",dur:Me.stack.armor}))}return"hit"}guardBlock(t,n,i){let r=Me.guard,o=n.guard.since<=r.perfect+Pt;if(this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:o?"perfect":"guard",skill:i.kind,pos:Xe(n.pos,ce(i.fromDir,n.radius)),dir:ce(i.fromDir,-1)}),o)return this.state.v4.perfectBlocks++,i.melee&&(this.applyBreak(n,t,r.perfectBreak),this.guardSt&&!this.guardSt.counterMade&&(this.guardSt.counterMade=!0,this.counter={targetId:t.id,released:!1},n.counterT=Me.counter.dur,n.counterTargetId=t.id,this.emit({type:"counterReady",ownerId:n.id,targetId:t.id,dur:Me.counter.dur}))),"perfect";if(i.melee){let a=n.hp;n.hp=Math.max(0,n.hp-r.chipDmg),this.onDamaged(t,n,i.kind,a-n.hp),n.lastHitBy=t.id,n.lastHitAt=this.state.time,this.lastHitKind.set(n.id,i.kind),this.fx(n).slide={dir:ce(i.fromDir,-1),left:r.pushback,speed:r.pushback/r.pushbackTime},n.hp<=0&&this.die(n,"hp")}return"guard"}applyBreak(t,n,i){let r=this.fx(n);n.breakT=Math.max(n.breakT??0,i),n.state==="windup"&&(this.cancelWindup(n),r.act=null,this.setState(n,"idle")),n.burstLeft=0,this.bursts.delete(n.id),this.emit({type:"guardBreak",targetId:n.id,sourceId:t.id,dur:i,pos:{...n.pos}}),n.team==="enemy"&&this.state.v4.breaks++}applyStun(t,n){let i=this.fx(t);i.hitstunT=Math.max(i.hitstunT,n),i.stunKind="hit",t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.dropBuf()),(t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&(this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),i.act=null,i.slide=null,this.setState(t,"hitstun"))}applyKnock(t,n,i,r,o){let a=Se(n);if(t.state==="ledge")return this.emit({type:"hit",targetId:t.id,sourceId:r.id,kind:o,pos:{...t.pos},dir:{...a},dmg:0,knock:0}),this.dropLedge(t,"knocked",a),!0;if(t.state==="climb"){let c=this.ledge.get(t.id);c&&(c.rec.outcome="knocked",this.ledge.delete(t.id),this.edgeRec.delete(t.id))}t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.dropBuf());let l=this.fx(t);return l.act=null,l.slide=null,this.outSource.set(t.id,"knock"),this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),t.knockVel=ce(a,2*i/$n.knockTime),t.kit!=="shieldbearer"&&(t.facing=En(ce(a,-1))),this.outsideT.set(t.id,0),this.setState(t,"knocked"),!1}coneStrike(t,n,i,r,o,a){this.emit({type:"cast",ownerId:t.id,skill:a,pos:{...t.pos},dir:{...n}});for(let l of[...this.state.fighters]){if(l.team===t.team||!kt.alive(l))continue;let c=rt(l.pos,t.pos),h=ct(c);if(!(h>i+l.radius)&&(h<.6||Zt(ce(c,1/h),n)>=Math.cos(r))){if(this.coverOn()){let u=this.rockOnSegment(t.pos,l.pos);if(u){this.emit({type:"blockedStrike",ownerId:t.id,targetId:l.id,skill:a,pos:u,dir:{...n}});continue}}this.resolveHit(t,l,{kind:a,dmg:o,fromDir:Se(rt(t.pos,l.pos)),melee:a==="enemyHeavy",knock:{dir:n}})}}}moveProjectiles(t){let n=this.state;for(let i of n.projectiles){if(!i.alive)continue;let r=i.pos,o=i.speed*t,a=Xe(r,ce(i.dir,o));if(i.traveled+=o,n.island.rocks.some(h=>rr(r,a,h.pos,h.r+i.radius*.5))){i.alive=!1,this.emit({type:"blocked",pos:a,kind:i.kind,ownerId:i.ownerId});continue}let l=null,c=1/0;for(let h of n.fighters)if(!(h.team===i.team||!kt.alive(h)||this.untouchable(h))&&Ri(h.pos,r,a)<h.radius+i.radius){let u=ot(r,h.pos);u<c&&(c=u,l=h)}if(i.pos=a,l){i.alive=!1;let h=this.fighter(i.ownerId);if(h){let u=ce(i.dir,-1);i.kind==="control"?this.resolveHit(h,l,{kind:"control",dmg:$t.dmg,fromDir:u,slow:$t.slow,melee:!1}):this.resolveHit(h,l,{kind:i.kind,dmg:i.kind==="enemyBasic"?hn.dmg:3,fromDir:u,melee:!1})}continue}i.traveled>=i.range&&(i.alive=!1,this.emit({type:"expire",pos:a,kind:i.kind}))}n.projectiles=n.projectiles.filter(i=>i.alive)}clearPlayer(t){t.team==="player"&&((t.guard||t.shieldUp)&&(t.guard=null,t.shieldUp=!1,this.guardSt=null),this.counter&&this.loseCounter(t,"hit"),this.resetCombo(t),this.dropBuf(),this.threat=null)}startFall(t,n){let i=this.fx(t);i.act=null,i.slide=null,i.hitstunT=0,i.heavyArmor=!1,this.clearPlayer(t),super.startFall(t,n)}die(t,n){let i=this.state,r=i.v4,o=this.fx(t);if(this.cancelWindup(t),o.act=null,o.slide=null,o.hitstunT=0,o.heavyArmor=!1,o.stackArmorT=0,o.stackHits=[],t.burstLeft=0,this.bursts.delete(t.id),t.team==="player"&&r.revivesLeft>0){if(r.revivesLeft--,this.clearPlayer(t),this.dashBuf.delete(t.id),n==="hp"){let a=this.ledge.get(t.id);a&&a.rec.outcome==="pending"&&(a.rec.outcome="hp");let l=this.edgeRec.get(t.id);l&&l.outcome==="pending"&&(l.outcome="hp"),this.ledge.delete(t.id),this.edgeRec.delete(t.id)}t.hp=0,t.breakT=0,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},this.setState(t,"reviving"),this.emit({type:"reviveStart",ownerId:t.id,delay:Me.revive.delay});return}if(t.team==="enemy"){let a=t.lastHitBy!==null&&i.time-t.lastHitAt<4?t.lastHitBy:null;r.kills.push({t:Math.round(i.time*1e3)/1e3,how:n,where:Ft(t.pos,i.island.poly)<=Me.killEdge?"edge":"center",by:a!==null?this.lastHitKind.get(t.id)??null:null,victim:t.kit})}super.die(t,n)}legalRevivePoints(){let t=this.state,n=Me.revive.grid,i=Me.player.radius,r=t.island.poly.map(l=>l.x),o=t.island.poly.map(l=>l.z),a=[];for(let l=Math.floor(Math.min(...r)/n);l<=Math.ceil(Math.max(...r)/n);l++)for(let c=Math.floor(Math.min(...o)/n);c<=Math.ceil(Math.max(...o)/n);c++){let h={x:l*n,z:c*n};Ft(h,t.island.poly)<Me.revive.edge||t.island.rocks.some(u=>ot(h,u.pos)<u.r+i)||a.push(h)}return a}revivePoint(){let t=this.legalRevivePoints(),n=this.enemies(),i=c=>n.reduce((h,u)=>Math.min(h,ot(c,u.pos)),1/0),r=null,o=1/0;for(let c of t){if(i(c)<Me.revive.enemyClear)continue;let h=ct(c);h<o-Pt&&(o=h,r=c)}if(r)return{...r};let a=t[0],l=-1/0;for(let c of t){let h=i(c);h>l+Pt&&(l=h,a=c)}return{...a}}revive(t){let n=this.revivePoint();t.pos=n,t.y=0,t.hp=t.maxHp*Me.revive.hpFrac,t.protectT=Me.revive.protect,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.deathCause=null,t.slowT=0,t.invulnT=0,this.fallVel.delete(t.id),this.outSource.delete(t.id),this.setState(t,"idle"),this.emit({type:"revive",ownerId:t.id,pos:{...n},protect:Me.revive.protect})}spawnCandidates(){let t=this.state,n=Me.waves,i=n.grid,r=this.player,o=t.island.poly.map(c=>c.x),a=t.island.poly.map(c=>c.z),l=[];for(let c=Math.floor(Math.min(...o)/i);c<=Math.ceil(Math.max(...o)/i);c++)for(let h=Math.floor(Math.min(...a)/i);h<=Math.ceil(Math.max(...a)/i);h++){let u={x:c*i,z:h*i};Ft(u,t.island.poly)<n.minEdge||t.island.rocks.some(d=>ot(u,d.pos)<d.r+.5)||ot(u,r.pos)<n.minPlayerDist||l.push(u)}return l}chooseSpawns(t){let n=Me.waves,i=this.spawnCandidates(),r=[];for(let o=0;o<t;o++){let a=i.filter(c=>r.every(h=>ot(h,c)>=n.spacing)&&this.enemies().every(h=>ot(h.pos,c)>=n.spacing)),l=a.length?a:i;r.push({...l[Math.floor(this.rng()*l.length)%l.length]})}return r}spawnWave(t,n){let i=this.waveList[t-1],r=this.player;this.waveIdx=t,this.waveMembers=[],i.forEach((o,a)=>{let l=n[a],c=o==="shieldbearer",h=this.makeFighter("enemy",c?1:2,c?"\u76FE\u5175":"\u5F13\u624B",l,En(rt(r.pos,l)),o);h.hp=h.maxHp=c?Me.bearer.hp:Me.archer.hp,h.cooldownMax=c?{basic:0,control:0,push:an.cooldown,dash:0}:{basic:hn.cooldownMax,control:0,push:0,dash:Me.archer.backstepCooldown},h.cooldowns={basic:0,control:0,push:c?2.5:0,dash:0},this.initV4Fields(h),this.state.fighters.push(h),this.waveMembers.push(h.id),this.sync(h)}),this.wavePhase="fight",this.emit({type:"waveStart",index:t,total:this.waveList.length}),this.updateWaveState()}updateWaveState(){let t=this.state.v4.wave;t.index=this.waveIdx,t.total=this.waveList.length,t.remaining=this.waveMembers.filter(n=>{let i=this.fighter(n);return i!==void 0&&kt.alive(i)}).length}tickWaves(){let t=this.state.time,n=Me.waves;if(this.wavePhase==="fight"&&this.waveMembers.every(i=>this.fighter(i)?.state==="dead")&&(this.emit({type:"waveClear",index:this.waveIdx}),this.waveIdx>=this.waveList.length?this.wavePhase="done":(this.wavePhase="gap",this.waveClearAt=t)),this.wavePhase==="gap"&&t>=this.waveClearAt+n.gap-n.markLead-Pt){let i=this.waveList[this.waveIdx],r=this.chooseSpawns(i.length);this.pendingSpawns=i.map((o,a)=>({kit:o,pos:r[a]}));for(let o of this.pendingSpawns)this.emit({type:"spawnMark",pos:{...o.pos},lead:n.markLead});this.wavePhase="marked"}this.wavePhase==="marked"&&t>=this.waveClearAt+n.gap-Pt&&!this.ended&&(this.spawnWave(this.waveIdx+1,this.pendingSpawns.map(i=>i.pos)),this.pendingSpawns=[]),this.updateWaveState()}checkEnd(){if(this.ended)return;let t=this.state,n=this.player;n.state==="dead"?(t.result="lose",t.loseText=this.loseText(n)):this.wonNow()&&(t.result="win"),t.result&&(this.ended=!0,this.dashBuf.clear(),this.dropBuf(),this.emit({type:"roundEnd",result:t.result}))}get wave(){return{index:this.waveIdx,phase:this.wavePhase}}debugPlayer(){let t=this.fx(this.player);return{buffered:this.buf?this.buf.type:null,counter:this.counter?{...this.counter}:null,combo:this.combo?{...this.combo}:null,lastTarget:this.lastMeleeTarget,stunKind:t.stunKind,hitstunT:t.hitstunT}}debugFx(t){let n=this.fighter(t),i=this.fx(n);return{hitstunT:i.hitstunT,heavyArmor:i.heavyArmor,stackArmorT:i.stackArmorT,stackCount:i.stackHits.length}}debugDamage(t,n,i,r,o){let a=this.fighter(t),l=this.fighter(n);if(!a||!l||!kt.alive(a)||this.untouchable(a))return!1;let c=a.slowT>0;if(a.hp=Math.max(0,a.hp-r),a.lastHitBy=l.id,a.lastHitAt=this.state.time,this.lastHitKind.set(a.id,i),a.hp<=0)return this.die(a,"hp"),!0;let h=0;return o&&(h=kt.knockDistance(a.hp,a.maxHp,c),this.applyKnock(a,o,h,l,i))||this.emit({type:"hit",targetId:a.id,sourceId:l.id,kind:i,pos:{...a.pos},dir:o?Se(o):Se(rt(a.pos,l.pos)),dmg:r,knock:h}),!0}debugSpawn(t,n,i){let r=t==="shieldbearer",o=this.makeFighter("enemy",r?1:2,r?"\u76FE\u5175":"\u5F13\u624B",n,i??0,t);return o.hp=o.maxHp=r?Me.bearer.hp:Me.archer.hp,o.cooldownMax=r?{basic:0,control:0,push:an.cooldown,dash:0}:{basic:hn.cooldownMax,control:0,push:0,dash:Me.archer.backstepCooldown},o.cooldowns={basic:0,control:0,push:0,dash:0},this.initV4Fields(o),this.state.fighters.push(o),this.sync(o),o}debugClearWave(){let t=new Set(this.waveMembers);this.state.fighters=this.state.fighters.filter(n=>!t.has(n.id)),this.waveMembers=[],this.wavePhase="off",this.updateWaveState()}};var tn=1e-9,Gi=s=>Math.round(s*1e3)/1e3;function wm(s,e=Me.revive.edge,t=Me.revive.grid,n=Me.player.radius){let i=s.poly.map(a=>a.x),r=s.poly.map(a=>a.z),o=[];for(let a=Math.floor(Math.min(...i)/t);a<=Math.ceil(Math.max(...i)/t);a++)for(let l=Math.floor(Math.min(...r)/t);l<=Math.ceil(Math.max(...r)/t);l++){let c={x:a*t,z:l*t};Ft(c,s.poly)<e||s.rocks.some(h=>ot(c,h.pos)<h.r+n)||o.push(c)}return o}function sh(s){let e=wm(s),t=e[0],n=1/0;for(let i of e){let r=ct(i);r<n-tn&&(n=r,t=i)}return{...t}}function rh(s){let e=s.poly.filter(t=>s.rocks.every(n=>ot(t,n.pos)-n.r>=dt.exit.ring-tn));return e.length?e:s.poly}function oh(s,e,t=dt.exit.minDist){let n=rh(s),i=null,r=1/0;for(let o of n){let a=ot(o,e);a>=t-tn&&a<r-tn&&(r=a,i=o)}return i||(i=xd(n,e)),i?{...i}:null}function xd(s,e){let t=null,n=-1/0;for(let i of s){let r=ot(i,e);r>n+tn&&(n=r,t=i)}return t}function Tm(s,e,t=dt.exit.minDist,n=dt.exit.apart){let i=oh(s,e,t);if(!i)return[];let r=rh(s),o=r.filter(c=>ot(c,i)>=n-tn),a=null,l=1/0;for(let c of o){let h=ot(c,e);h>=t-tn&&h<l-tn&&(l=h,a=c)}return a||(a=xd(o,e)),a?[i,{...a}]:Am(r)??[i]}function Am(s){let e=null,t=-1/0;for(let n=0;n<s.length;n++)for(let i=n+1;i<s.length;i++){let r=ot(s[n],s[i]);r>t+tn&&(t=r,e=[{...s[n]},{...s[i]}])}return e}function Rm(s){let e=dt.altar,t=sh(s),n=Vi(e.exitAngle),i=rh(s).filter(a=>ot(a,t)>=e.exitFromLanding-tn&&(s.spots??[]).every(l=>ot(a,l.pos)>=e.exitFromSpot-tn)),r=null,o=-1/0;for(let a of i){let l=(a.x*n.x+a.z*n.z)/Math.max(ct(a),tn);l>o+tn&&(o=l,r=a)}return r?{...r}:oh(s,t)}function Cm(s,e){let t=null,n=1/0;for(let i of s.spots??[]){let r=ot(e,i.pos);r<dt.altar.reach-tn&&r<n-tn&&(n=r,t=i)}return t}function vd(s,e){return Ft(e,s.poly)>=dt.coin.edge-tn&&s.rocks.every(t=>ot(e,t.pos)>=t.r+dt.coin.radius-tn)}function Im(s,e,t){let n={...e};if(t){let c=s.poly,h=0,u=1/0;for(let E=0,v=c.length-1;E<c.length;v=E++){let S=Ri(e,c[v],c[E]);S<u-tn&&(u=S,h=E)}let d=c[(h+c.length-1)%c.length],f=c[h],m=rt(f,d),x=m.x*m.x+m.z*m.z,g=x===0?0:Math.max(0,Math.min(1,((e.x-d.x)*m.x+(e.z-d.z)*m.z)/x)),p=Xe(d,ce(m,g)),y=Se({x:-m.z,z:m.x});n=Xe(p,ce(y,dt.coin.inset))}if(vd(s,n))return n;let i=dt.coin.grid,r=s.poly.map(c=>c.x),o=s.poly.map(c=>c.z),a=n,l=1/0;for(let c=Math.floor(Math.min(...r)/i);c<=Math.ceil(Math.max(...r)/i);c++)for(let h=Math.floor(Math.min(...o)/i);h<=Math.ceil(Math.max(...o)/i);h++){let u={x:c*i,z:h*i},d=ot(u,n);d<l-tn&&vd(s,u)&&(l=d,a=u)}return a}function Pm(s){return{path:s,result:null,reached:{island:1,wave:1},islandTimes:[],waveTimes:[],downs:[],damageTaken:[],kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0},droppedPresses:0,again:!1,shortcuts:[],reachedStage:1,coins:{fromKills:0,fromJumps:0,spent:[],end:0},jumps:[],altars:[],blessings:[],converts:[],revivesBought:[]}}var Lm=(s,e)=>s.kind!==e.kind?!1:s.kind==="bless"&&e.kind==="bless"?s.blessing===e.blessing&&(s.replace??null)===(e.replace??null):!0,Ca=s=>s.kind==="bless"?s.replace?{kind:"bless",blessing:s.blessing,replace:s.replace}:{kind:"bless",blessing:s.blessing}:{kind:s.kind},gs=class extends or{constructor(t=1,n="ares"){let i=dt.islands[0];super(t,n,{mode:"run",variant:"s1",island:ms(i.seed),waves:i.waves});this.clearAt=0;this.ringT=0;this.ringAt=-1;this.jump=null;this.arriveAt=0;this.stageOpen=!0;this.fallFrom=null;this.victory=!1;this.nextCoinId=1;this.blessCount={A:0,B:0};this.convertUsed=new Set;let r=Pm(n);r.waveTimes.push({island:1,wave:1,t:0}),this.state.s1={islandIndex:1,islandTotal:dt.islands.length,phase:"fight",exits:[],phaseT:0,record:r,stageIndex:1,stageTotal:dt.stages.length,stage:{kind:"battle"},coins:0,drops:[],blessings:[],offers:[]},this.events.unshift({type:"islandStart",index:1,total:dt.islands.length,seed:i.seed,kind:"battle"}),this.syncRecord()}get s1(){return this.state.s1}get stageCfg(){return dt.stages[this.s1.stageIndex-1]}altarHere(){let t=this.stageCfg;return t.kind==="altar"?t.altar:null}suspended(t){return t.team==="player"&&this.state.s1?.phase==="air"}untouchable(t){return t.team==="player"&&this.state.s1?.phase==="air"?!0:super.untouchable(t)}wonNow(){return this.victory}emit(t){super.emit(t);let n=this.state?.s1;n&&t.type==="waveStart"&&n.record.waveTimes.push({island:n.islandIndex,wave:t.index,t:Gi(this.state.time)})}onDamaged(t,n,i,r){let o=this.state.s1;if(!o||n.team!=="player"||r<=0)return;let a=o.record.damageTaken.find(l=>l.byKit===t.kit&&l.skill===i);a||(a={byKit:t.kit,skill:i,total:0,count:0},o.record.damageTaken.push(a)),a.total=Gi(a.total+r),a.count++}startFall(t,n){t.team==="player"&&(this.fallFrom={t:this.state.time,pos:{...t.pos}}),super.startFall(t,n),t.team==="enemy"&&this.state.s1&&this.dropCoin(t.pos,!0)}die(t,n){let i=this.state,r=i.s1,o=i.v4;if(!r){super.die(t,n);return}if(t.team==="player"){let l=t.lastHitBy!==null&&i.time-t.lastHitAt<4?this.fighter(t.lastHitBy):void 0,c=n==="fall"&&this.fallFrom?this.fallFrom:{t:i.time,pos:t.pos};r.record.downs.push({t:Gi(c.t),island:r.islandIndex,wave:o.wave.index,pos:{...c.pos},cause:n,byKit:l&&l.team==="enemy"?l.kit:null,revived:o.revivesLeft>0}),this.fallFrom=null,super.die(t,n);return}let a=o.kills.length;super.die(t,n);for(let l=a;l<o.kills.length;l++)r.record.kills.push({...o.kills[l],island:r.islandIndex});t.team==="enemy"&&n==="hp"&&this.dropCoin(t.pos,!1)}step(t){super.step(t),this.tickS1(t.altar??null)}tickS1(t){let n=this.state,i=this.s1,r=n.time;if(this.ended&&i.phase!=="done")this.finish();else switch(i.phase){case"fight":this.wavePhase==="done"&&(i.phase="cleared",this.clearAt=r,i.phaseT=dt.exit.delay);break;case"cleared":i.phaseT=Math.max(0,this.clearAt+dt.exit.delay-r),r>=this.clearAt+dt.exit.delay-tn&&this.openExit();break;case"exit":this.tickExit();break;case"air":this.tickAir();break;case"landed":i.phaseT=this.player.protectT??0,i.phaseT<=tn&&(i.phaseT=0,this.altarHere()?this.openExit():i.phase="fight");break;case"done":break}this.tickCoins(),t&&this.altarAct(t),i.offers=this.currentOffers(),this.syncRecord()}openExit(){let t=this.s1,n=this.state.island,i=this.stageCfg,r,o;if(i.kind==="altar")r=[Rm(n)],o=["none"];else if(dt.reward.islands.includes(i.island))r=Tm(n,this.player.pos),o=["coins","heal"];else{let a=oh(n,this.player.pos);r=a?[a]:[],o=["none"]}t.exits=r.map((a,l)=>({pos:a,progress:0,reward:o[l]??"none"})),t.phase="exit",t.phaseT=0,this.ringT=0,this.ringAt=-1,this.emit({type:"exitOpen",pos:t.exits.map(a=>({...a.pos}))})}tickExit(){let t=this.s1.exits;if(!t.length)return;let n=this.player,r=kt.alive(n)&&n.state!=="ledge"&&n.state!=="climb"?t.findIndex(a=>ot(n.pos,a.pos)<=dt.exit.ring+tn):-1,o=r>=0;o&&r!==this.ringAt&&(this.ringT=0,this.ringAt=r),o?this.ringT+=zn:this.ringT=0,t.forEach((a,l)=>{a.progress=l===this.ringAt?Math.min(1,this.ringT/dt.exit.hold):0}),o&&this.ringT>=dt.exit.hold-tn&&this.startJump(t[r].reward)}startJump(t){let n=this.s1,i=this.player,r=this.state.time,o={...i.pos};if(this.calmPlayer(i),n.record.jumps.push({t:Gi(r),from:n.stageIndex,reward:t}),this.leaveStage(r),this.ringT=0,this.emit({type:"jumpStart",ownerId:i.id,from:o}),this.collectDrops(),n.stageIndex>=n.stageTotal){this.victory=!0,this.checkEnd(),this.finish();return}let a=dt.stages[n.stageIndex],l=a.kind==="altar"?Ra():ms(dt.islands[a.island-1].seed);this.jump={at:r,from:o,to:sh(l),island:l,swapped:!1,reward:t},n.phase="air",n.phaseT=dt.jump.air}tickAir(){let t=this.s1,n=this.player,i=this.jump,r=this.state.time-i.at;t.phaseT=Math.max(0,dt.jump.air-r),!i.swapped&&r>=dt.jump.swapAt-tn&&this.swapIsland(),n.pos=i.swapped?{...i.to}:{...i.from},n.moveVel={x:0,z:0},r>=dt.jump.air-tn&&this.land()}swapIsland(){let t=this.state,n=this.s1,i=this.jump;i.swapped=!0,n.stageIndex++;let r=this.stageCfg;r.kind==="battle"&&(n.islandIndex=r.island),n.stage=r.kind==="battle"?{kind:"battle"}:{kind:"altar",altar:r.altar},t.island=i.island,t.fighters=t.fighters.filter(o=>o.team==="player"),t.projectiles=[],this.heavyOwner=null,this.wavePhase="off",this.waveMembers=[],this.pendingSpawns=[],n.exits=[],n.drops=[],this.emitIslandStart()}emitIslandStart(){let t=this.s1,n=this.stageCfg,i=this.state.island.seed??0;n.kind==="altar"?this.emit({type:"islandStart",index:t.islandIndex,total:t.islandTotal,seed:i,kind:"altar",altar:n.altar}):this.emit({type:"islandStart",index:t.islandIndex,total:t.islandTotal,seed:i,kind:"battle"})}land(){let t=this.s1,n=this.player,i=this.jump;this.jump=null,n.pos={...i.to},n.y=0,n.moveVel={x:0,z:0},n.knockVel={x:0,z:0},n.protectT=dt.jump.protect,t.phase="landed",t.phaseT=dt.jump.protect,this.arriveAt=this.state.time,this.stageOpen=!0,this.emit({type:"land",ownerId:n.id,pos:{...i.to},index:t.islandIndex}),i.reward!=="none"&&this.grantReward(i.reward,i.to);let r=this.stageCfg;r.kind==="altar"?t.record.altars.push({altar:r.altar,arrive:Gi(this.state.time),leave:null}):this.beginWaves(dt.islands[r.island-1].waves)}grantReward(t,n){let i=this.s1,r=this.player;if(t==="coins"){let o=dt.reward.coins;i.coins+=o,i.record.coins.fromJumps+=o,this.emit({type:"reward",kind:"coins",amount:o,pos:{...n}})}else if(t==="heal"){let o=Math.min(r.maxHp*dt.reward.healFrac,r.maxHp-r.hp);r.hp+=o,this.emit({type:"reward",kind:"heal",amount:o,pos:{...n}})}}finish(){let t=this.s1;t.phase="done",t.phaseT=0,t.offers=[],t.record.result=this.state.result,this.stageOpen&&this.leaveStage(this.state.time)}leaveStage(t){let n=this.s1,i=this.stageCfg;if(this.stageOpen=!1,i.kind==="battle"){this.addIslandTime(n.islandIndex,t-this.arriveAt);return}let r=n.record.altars,o=r[r.length-1];o&&o.altar===i.altar&&o.leave===null&&(o.leave=Gi(t))}addIslandTime(t,n){let i=this.s1.record.islandTimes;for(;i.length<t;)i.push(0);i[t-1]=Gi(i[t-1]+n)}syncRecord(){let t=this.s1,n=this.state.v4,i=t.record;i.reached={island:t.islandIndex,wave:n.wave.index},i.reachedStage=t.stageIndex,i.coins.end=t.coins,i.breaks=n.breaks,i.perfectBlocks=n.perfectBlocks,i.counters={...n.counters},i.droppedPresses=this.droppedPresses}dropCoin(t,n){let i=this.s1,r=Im(this.state.island,t,n),o=this.nextCoinId++;i.drops.push({id:o,pos:r}),this.emit({type:"coinDrop",id:o,pos:{...r}})}tickCoins(){let t=this.s1,n=this.player;if(t.phase==="air"||t.phase==="done"||!kt.alive(n)||!t.drops.length)return;let i=[];for(let r of t.drops)ot(n.pos,r.pos)<dt.coin.pickup-tn?(t.coins++,t.record.coins.fromKills++,this.emit({type:"coinPickup",id:r.id,pos:{...r.pos},coins:t.coins})):i.push(r);t.drops=i}collectDrops(){let t=this.s1,n=t.drops.map(i=>i.id);n.length&&(t.coins+=n.length,t.record.coins.fromKills+=n.length,t.drops=[],this.emit({type:"coinsCollected",ids:n,coins:t.coins}))}currentOffers(){let t=this.s1,n=this.altarHere(),i=this.player;if(!n||t.phase==="air"||t.phase==="done"||!kt.alive(i))return[];let r=Cm(this.state.island,i.pos);return r?this.offersFor(r.kind,n):[]}offersFor(t,n){let i=this.s1,r=this.state.v4,o=dt.altar.price,a=i.blessings,l=i.coins,c=(u,d,f)=>{let m=l>=d,x=f??(m?void 0:"coins");return x?{spot:t,action:u,price:d,ok:!1,reason:x}:{spot:t,action:u,price:d,ok:!0}};if(t==="convert"){let d=(this.player.path??r.path)==="none"?"noPath":this.convertUsed.has(n)?"convertUsed":void 0;return[c({kind:"convert"},o.convert,d)]}if(t==="revive")return[c({kind:"revive"},o.revive,r.revivesLeft>0?"hasRevive":void 0)];let h=n==="A"&&this.blessCount.A===0?0:o.bless;return a.includes(t)?[c({kind:"bless",blessing:t},h,"held")]:a.length<dt.altar.maxBlessings?[c({kind:"bless",blessing:t},h)]:a.map(u=>c({kind:"bless",blessing:t,replace:u},h))}altarAct(t){let n=this.s1.phase==="done"?void 0:this.currentOffers().find(i=>Lm(i.action,t));if(!n){this.emit({type:"altarDenied",action:Ca(t),reason:"notHere"});return}if(!n.ok){this.emit({type:"altarDenied",action:Ca(t),reason:n.reason});return}this.buy(n)}buy(t){let n=this.s1,i=this.state.v4,r=this.player,o=n.record,a=Gi(this.state.time),l=this.altarHere(),c=t.action;if(n.coins-=t.price,t.price>0&&o.coins.spent.push({t:a,altar:l,action:Ca(c),price:t.price}),c.kind==="bless"){let h=n.blessings,u=c.replace??null;u&&h.splice(h.indexOf(u),1),h.push(c.blessing),this.blessCount[l]++,o.blessings.push({t:a,altar:l,blessing:c.blessing,replaced:u,price:t.price})}else if(c.kind==="convert"){let h=r.path??i.path,u=h==="ares"?"mars":"ares";this.setPath(u),this.convertUsed.add(l),o.converts.push({t:a,altar:l,from:h,to:u})}else i.revivesLeft=Me.revive.count,o.revivesBought.push({t:a,altar:l});this.emit({type:"altarBuy",action:Ca(c),price:t.price,coins:n.coins})}setPath(t){let n=this.player;this.calmPlayer(n),n.path=t,this.state.v4.path=t,n.cooldownMax.push=t==="ares"?Me.charge.cooldown:t==="none"?Kt.cooldown:Me.guard.lock,n.cooldowns.push=0,n.shieldDir=t==="mars"?Vi(n.facing):null}debugClearIsland(){let t=this.state,n=this.s1;this.ended||this.altarHere()||n.phase!=="fight"&&n.phase!=="landed"||(t.fighters=t.fighters.filter(i=>i.team==="player"),t.projectiles=t.projectiles.filter(i=>i.team==="player"),this.waveMembers=[],this.pendingSpawns=[],this.wavePhase="done",this.heavyOwner=null,n.record.shortcuts.push(`clear@${n.islandIndex}`))}debugGotoIsland(t){let n=this.s1,i=dt.islands[t-1];this.ended||!Number.isInteger(t)||t<1||t>n.islandTotal||!kt.alive(this.player)||(this.gotoStage(dt.stages.findIndex(r=>r.kind==="battle"&&r.island===t)+1,ms(i.seed)),n.phase="fight",n.record.shortcuts.push(`goto@${t}`),this.emitIslandStart(),this.beginWaves(i.waves),this.syncRecord())}debugGotoAltar(t){let n=this.s1,i=dt.stages.findIndex(r=>r.kind==="altar"&&r.altar===t)+1;this.ended||i<1||!kt.alive(this.player)||(this.gotoStage(i,Ra()),this.wavePhase="off",this.waveMembers=[],this.pendingSpawns=[],n.phase="landed",n.record.altars.push({altar:t,arrive:Gi(this.state.time),leave:null}),n.record.shortcuts.push(`altar@${t}`),this.emitIslandStart(),this.syncRecord())}debugSetCoins(t){!Number.isInteger(t)||t<0||(this.s1.coins=t,this.s1.record.shortcuts.push(`coins@${t}`),this.syncRecord())}gotoStage(t,n){let i=this.state,r=this.s1,o=this.player;this.stageOpen&&this.leaveStage(i.time),this.collectDrops();let a=dt.stages[t-1];this.calmPlayer(o),this.jump=null,this.ringT=0,this.ringAt=-1,r.stageIndex=t,a.kind==="battle"?r.islandIndex=a.island:r.islandIndex=dt.stages.slice(0,t).filter(l=>l.kind==="battle").length,r.stage=a.kind==="battle"?{kind:"battle"}:{kind:"altar",altar:a.altar},i.island=n,i.fighters=i.fighters.filter(l=>l.team==="player"),i.projectiles=[],this.heavyOwner=null,r.exits=[],r.drops=[],r.phaseT=0,o.pos=sh(i.island),o.y=0,this.arriveAt=i.time,this.stageOpen=!0}};var $d=0,Xh=1,Kd=2;var qh=1,kl=2,Ui=3,ji=0,Fn=1,Cn=2,is=0,Qi=1,Mi=2,Yh=3,$h=4,Zd=5,Es=100,Jd=101,jd=102,Qd=103,ef=104,tf=200,nf=201,sf=202,rf=203,nl=204,il=205,of=206,af=207,lf=208,cf=209,hf=210,uf=211,df=212,ff=213,pf=214,Dl=0,Fl=1,Ul=2,Bs=3,zl=4,Nl=5,Vr=6,Bl=7,Ol=0,mf=1,gf=2,Si=0,vf=1,xf=2,yf=3,Hl=4,bf=5,_f=6,Mf=7;var Kh=300,Ws=301,Xs=302,Vl=303,Gl=304,ra=306,Os=1e3,Ss=1001,sl=1002,Kn=1003,Sf=1004;var oa=1005;var yi=1006,Wl=1007;var Cs=1008;var Ei=1009,Zh=1010,Jh=1011,Gr=1012,Xl=1013,Is=1014,wi=1015,Wr=1016,ql=1017,Yl=1018,Xr=1020,jh=35902,Qh=35899,eu=1021,tu=1022,li=1023,Tr=1026,qr=1027,$l=1028,Kl=1029,nu=1030,Zl=1031;var Jl=1033,aa=33776,la=33777,ca=33778,ha=33779,jl=35840,Ql=35841,ec=35842,tc=35843,nc=36196,ic=37492,sc=37496,rc=37808,oc=37809,ac=37810,lc=37811,cc=37812,hc=37813,uc=37814,dc=37815,fc=37816,pc=37817,mc=37818,gc=37819,vc=37820,xc=37821,yc=36492,bc=36494,_c=36495,Mc=36283,Sc=36284,Ec=36285,wc=36286;var Io=2300,rl=2301,tl=2302,Uh=2400,zh=2401,Nh=2402;var Ef=3200,wf=3201;var Tc=0,Tf=1,ss="",Vt="srgb",Hs="srgb-linear",Po="linear",Gt="srgb";var vi=7680,Ac=7681;var iu=517;var Ar=519,Af=512,Rf=513,Cf=514,su=515,If=516,Pf=517,Lf=518,kf=519,ol=35044,Rc=35048;var ru="300 es",xi=2e3,Lo=2001;var es=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ah=Math.PI/180,al=180/Math.PI;function Zi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nn[s&255]+Nn[s>>8&255]+Nn[s>>16&255]+Nn[s>>24&255]+"-"+Nn[e&255]+Nn[e>>8&255]+"-"+Nn[e>>16&15|64]+Nn[e>>24&255]+"-"+Nn[t&63|128]+Nn[t>>8&255]+"-"+Nn[t>>16&255]+Nn[t>>24&255]+Nn[n&255]+Nn[n>>8&255]+Nn[n>>16&255]+Nn[n>>24&255]).toLowerCase()}function Ct(s,e,t){return Math.max(e,Math.min(t,s))}function km(s,e){return(s%e+e)%e}function lh(s,e,t){return(1-t)*s+t*e}function Ii(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Wt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Pe=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},An=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=1-a,p=l*d+c*f+h*m+u*x,y=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){let S=Math.sqrt(E),R=Math.atan2(S,p*y);g=Math.sin(g*R)/S,a=Math.sin(a*R)/S}let v=a*y;if(l=l*g+d*v,c=c*g+f*v,h=h*g+m*v,u=u*g+x*v,g===1-a){let S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-a*f,e[t+2]=c*m+h*f+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ch.copy(this).projectOnVector(e),this.sub(ch)}reflect(e){return this.sub(ch.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ch=new O,yd=new An,yt=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],y=i[1],E=i[4],v=i[7],S=i[2],R=i[5],A=i[8];return r[0]=o*x+a*y+l*S,r[3]=o*g+a*E+l*R,r[6]=o*p+a*v+l*A,r[1]=c*x+h*y+u*S,r[4]=c*g+h*E+u*R,r[7]=c*p+h*v+u*A,r[2]=d*x+f*y+m*S,r[5]=d*g+f*E+m*R,r[8]=d*p+f*v+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(hh.makeScale(e,t)),this}rotate(e){return this.premultiply(hh.makeRotation(-e)),this}translate(e,t){return this.premultiply(hh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},hh=new yt;function ou(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ko(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Df(){let s=ko("canvas");return s.style.display="block",s}var bd={};function Rr(s){s in bd||(bd[s]=!0,console.warn(s))}function Ff(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var _d=new yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Md=new yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dm(){let s={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Gt&&(i.r=Ji(i.r),i.g=Ji(i.g),i.b=Ji(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Gt&&(i.r=Er(i.r),i.g=Er(i.g),i.b=Er(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ss?Po:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Rr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Rr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Hs]:{primaries:e,whitePoint:n,transfer:Po,toXYZ:_d,fromXYZ:Md,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:n,transfer:Gt,toXYZ:_d,fromXYZ:Md,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),s}var Dt=Dm();function Ji(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Er(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ar,ll=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ar===void 0&&(ar=ko("canvas")),ar.width=e.width,ar.height=e.height;let i=ar.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ar}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ko("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ji(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ji(t[n]/255)*255):t[n]=Ji(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fm=0,Cr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(uh(i[o].image)):r.push(uh(i[o]))}else r=uh(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function uh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ll.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Um=0,dh=new O,qn=class s extends es{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Ss,i=Ss,r=yi,o=Cs,a=li,l=Ei,c=s.DEFAULT_ANISOTROPY,h=ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=Zi(),this.name="",this.source=new Cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(dh).x}get height(){return this.source.getSize(dh).y}get depth(){return this.source.getSize(dh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case Ss:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case Ss:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=Kh;qn.DEFAULT_ANISOTROPY=1;var Ot=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,v=(f+1)/2,S=(p+1)/2,R=(h+d)/4,A=(u+x)/4,C=(m+g)/4;return E>v&&E>S?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=R/n,r=A/n):v>S?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=R/i,r=C/i):S<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(S),n=A/r,i=C/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this.w=Ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this.w=Ct(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cl=class extends es{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ot(0,0,e,t),this.scissorTest=!1,this.viewport=new Ot(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new qn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:yi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Cr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pi=class extends cl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Do=class extends qn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kn,this.minFilter=Kn,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var hl=class extends qn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Kn,this.minFilter=Kn,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zn=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,pi):pi.fromBufferAttribute(r,o),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ia.copy(n.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vo),Pa.subVectors(this.max,vo),lr.subVectors(e.a,vo),cr.subVectors(e.b,vo),hr.subVectors(e.c,vo),vs.subVectors(cr,lr),xs.subVectors(hr,cr),Fs.subVectors(lr,hr);let t=[0,-vs.z,vs.y,0,-xs.z,xs.y,0,-Fs.z,Fs.y,vs.z,0,-vs.x,xs.z,0,-xs.x,Fs.z,0,-Fs.x,-vs.y,vs.x,0,-xs.y,xs.x,0,-Fs.y,Fs.x,0];return!fh(t,lr,cr,hr,Pa)||(t=[1,0,0,0,1,0,0,0,1],!fh(t,lr,cr,hr,Pa))?!1:(La.crossVectors(vs,xs),t=[La.x,La.y,La.z],fh(t,lr,cr,hr,Pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wi=[new O,new O,new O,new O,new O,new O,new O,new O],pi=new O,Ia=new Zn,lr=new O,cr=new O,hr=new O,vs=new O,xs=new O,Fs=new O,vo=new O,Pa=new O,La=new O,Us=new O;function fh(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Us.fromArray(s,r);let a=i.x*Math.abs(Us.x)+i.y*Math.abs(Us.y)+i.z*Math.abs(Us.z),l=e.dot(Us),c=t.dot(Us),h=n.dot(Us);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var zm=new Zn,xo=new O,ph=new O,ws=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):zm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xo.subVectors(e,this.center);let t=xo.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(xo,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ph.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xo.copy(e.center).add(ph)),this.expandByPoint(xo.copy(e.center).sub(ph))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Xi=new O,mh=new O,ka=new O,ys=new O,gh=new O,Da=new O,vh=new O,Ir=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xi.copy(this.origin).addScaledVector(this.direction,t),Xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mh.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),ys.copy(this.origin).sub(mh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ka),a=ys.dot(this.direction),l=-ys.dot(ka),c=ys.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(mh).addScaledVector(ka,d),f}intersectSphere(e,t){Xi.subVectors(e.center,this.origin);let n=Xi.dot(this.direction),i=Xi.dot(Xi)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Xi)!==null}intersectTriangle(e,t,n,i,r){gh.subVectors(t,e),Da.subVectors(n,e),vh.crossVectors(gh,Da);let o=this.direction.dot(vh),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ys.subVectors(this.origin,e);let l=a*this.direction.dot(Da.crossVectors(ys,Da));if(l<0)return null;let c=a*this.direction.dot(gh.cross(ys));if(c<0||l+c>o)return null;let h=-a*ys.dot(vh);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/ur.setFromMatrixColumn(e,0).length(),r=1/ur.setFromMatrixColumn(e,1).length(),o=1/ur.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d+x*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,m=a*h,x=a*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nm,e,Bm)}lookAt(e,t,n){let i=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),bs.crossVectors(n,ti),bs.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),bs.crossVectors(n,ti)),bs.normalize(),Fa.crossVectors(ti,bs),i[0]=bs.x,i[4]=Fa.x,i[8]=ti.x,i[1]=bs.y,i[5]=Fa.y,i[9]=ti.y,i[2]=bs.z,i[6]=Fa.z,i[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],y=n[3],E=n[7],v=n[11],S=n[15],R=i[0],A=i[4],C=i[8],b=i[12],_=i[1],D=i[5],k=i[9],P=i[13],V=i[2],W=i[6],X=i[10],se=i[14],$=i[3],oe=i[7],he=i[11],_e=i[15];return r[0]=o*R+a*_+l*V+c*$,r[4]=o*A+a*D+l*W+c*oe,r[8]=o*C+a*k+l*X+c*he,r[12]=o*b+a*P+l*se+c*_e,r[1]=h*R+u*_+d*V+f*$,r[5]=h*A+u*D+d*W+f*oe,r[9]=h*C+u*k+d*X+f*he,r[13]=h*b+u*P+d*se+f*_e,r[2]=m*R+x*_+g*V+p*$,r[6]=m*A+x*D+g*W+p*oe,r[10]=m*C+x*k+g*X+p*he,r[14]=m*b+x*P+g*se+p*_e,r[3]=y*R+E*_+v*V+S*$,r[7]=y*A+E*D+v*W+S*oe,r[11]=y*C+E*k+v*X+S*he,r[15]=y*b+E*P+v*se+S*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],y=u*g*c-x*d*c+x*l*f-a*g*f-u*l*p+a*d*p,E=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,v=h*x*c-m*u*c+m*a*f-o*x*f-h*a*p+o*u*p,S=m*u*l-h*x*l-m*a*d+o*x*d+h*a*g-o*u*g,R=t*y+n*E+i*v+r*S;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/R;return e[0]=y*A,e[1]=(x*d*r-u*g*r-x*i*f+n*g*f+u*i*p-n*d*p)*A,e[2]=(a*g*r-x*l*r+x*i*c-n*g*c-a*i*p+n*l*p)*A,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=E*A,e[5]=(h*g*r-m*d*r+m*i*f-t*g*f-h*i*p+t*d*p)*A,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*A,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*A,e[8]=v*A,e[9]=(m*u*r-h*x*r-m*n*f+t*x*f+h*n*p-t*u*p)*A,e[10]=(o*x*r-m*a*r+m*n*c-t*x*c-o*n*p+t*a*p)*A,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=S*A,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*g+t*u*g)*A,e[14]=(m*a*i-o*x*i-m*n*l+t*x*l+o*n*g-t*a*g)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,x=o*h,g=o*u,p=a*u,y=l*c,E=l*h,v=l*u,S=n.x,R=n.y,A=n.z;return i[0]=(1-(x+p))*S,i[1]=(f+v)*S,i[2]=(m-E)*S,i[3]=0,i[4]=(f-v)*R,i[5]=(1-(d+p))*R,i[6]=(g+y)*R,i[7]=0,i[8]=(m+E)*A,i[9]=(g-y)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=ur.set(i[0],i[1],i[2]).length(),o=ur.set(i[4],i[5],i[6]).length(),a=ur.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],mi.copy(this);let c=1/r,h=1/o,u=1/a;return mi.elements[0]*=c,mi.elements[1]*=c,mi.elements[2]*=c,mi.elements[4]*=h,mi.elements[5]*=h,mi.elements[6]*=h,mi.elements[8]*=u,mi.elements[9]*=u,mi.elements[10]*=u,t.setFromRotationMatrix(mi),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=xi,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),m,x;if(l)m=r/(o-r),x=o*r/(o-r);else if(a===xi)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Lo)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=xi,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),m,x;if(l)m=1/(o-r),x=o/(o-r);else if(a===xi)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===Lo)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ur=new O,mi=new Et,Nm=new O(0,0,0),Bm=new O(1,1,1),bs=new O,Fa=new O,ti=new O,Sd=new Et,Ed=new An,Jn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ed.setFromEuler(this),this.setFromQuaternion(Ed,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var Fo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Om=0,wd=new O,dr=new An,qi=new Et,Ua=new O,yo=new O,Hm=new O,Vm=new An,Td=new O(1,0,0),Ad=new O(0,1,0),Rd=new O(0,0,1),Cd={type:"added"},Gm={type:"removed"},fr={type:"childadded",child:null},xh={type:"childremoved",child:null},yn=class s extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new O,t=new Jn,n=new An,i=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Et},normalMatrix:{value:new yt}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.multiply(dr),this}rotateOnWorldAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.premultiply(dr),this}rotateX(e){return this.rotateOnAxis(Td,e)}rotateY(e){return this.rotateOnAxis(Ad,e)}rotateZ(e){return this.rotateOnAxis(Rd,e)}translateOnAxis(e,t){return wd.copy(e).applyQuaternion(this.quaternion),this.position.add(wd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Td,e)}translateY(e){return this.translateOnAxis(Ad,e)}translateZ(e){return this.translateOnAxis(Rd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ua.copy(e):Ua.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qi.lookAt(yo,Ua,this.up):qi.lookAt(Ua,yo,this.up),this.quaternion.setFromRotationMatrix(qi),i&&(qi.extractRotation(i.matrixWorld),dr.setFromRotationMatrix(qi),this.quaternion.premultiply(dr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cd),fr.child=e,this.dispatchEvent(fr),fr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gm),xh.child=e,this.dispatchEvent(xh),xh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qi.multiply(e.parent.matrixWorld)),e.applyMatrix4(qi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cd),fr.child=e,this.dispatchEvent(fr),fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,e,Hm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,Vm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};yn.DEFAULT_UP=new O(0,1,0);yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gi=new O,Yi=new O,yh=new O,$i=new O,pr=new O,mr=new O,Id=new O,bh=new O,_h=new O,Mh=new O,Sh=new Ot,Eh=new Ot,wh=new Ot,Ki=class s{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),gi.subVectors(e,t),i.cross(gi);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){gi.subVectors(i,t),Yi.subVectors(n,t),yh.subVectors(e,t);let o=gi.dot(gi),a=gi.dot(Yi),l=gi.dot(yh),c=Yi.dot(Yi),h=Yi.dot(yh),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,$i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$i.x),l.addScaledVector(o,$i.y),l.addScaledVector(a,$i.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Sh.setScalar(0),Eh.setScalar(0),wh.setScalar(0),Sh.fromBufferAttribute(e,t),Eh.fromBufferAttribute(e,n),wh.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Sh,r.x),o.addScaledVector(Eh,r.y),o.addScaledVector(wh,r.z),o}static isFrontFacing(e,t,n,i){return gi.subVectors(n,t),Yi.subVectors(e,t),gi.cross(Yi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gi.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),gi.cross(Yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;pr.subVectors(i,n),mr.subVectors(r,n),bh.subVectors(e,n);let l=pr.dot(bh),c=mr.dot(bh);if(l<=0&&c<=0)return t.copy(n);_h.subVectors(e,i);let h=pr.dot(_h),u=mr.dot(_h);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(pr,o);Mh.subVectors(e,r);let f=pr.dot(Mh),m=mr.dot(Mh);if(m>=0&&f<=m)return t.copy(r);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(mr,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Id.subVectors(r,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Id,a);let p=1/(g+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(pr,o).addScaledVector(mr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_s={h:0,s:0,l:0},za={h:0,s:0,l:0};function Th(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var at=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Dt.workingColorSpace){if(e=km(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Th(o,r,e+1/3),this.g=Th(o,r,e),this.b=Th(o,r,e-1/3)}return Dt.colorSpaceToWorking(this,i),this}setStyle(e,t=Vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){let n=Uf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=Er(e.r),this.g=Er(e.g),this.b=Er(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return Dt.workingToColorSpace(Bn.copy(this),e),Math.round(Ct(Bn.r*255,0,255))*65536+Math.round(Ct(Bn.g*255,0,255))*256+Math.round(Ct(Bn.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(Bn.copy(this),t);let n=Bn.r,i=Bn.g,r=Bn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(Bn.copy(this),t),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=Vt){Dt.workingToColorSpace(Bn.copy(this),e);let t=Bn.r,n=Bn.g,i=Bn.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(_s),this.setHSL(_s.h+e,_s.s+t,_s.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_s),e.getHSL(za);let n=lh(_s.h,za.h,t),i=lh(_s.s,za.s,t),r=lh(_s.l,za.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Bn=new at;at.NAMES=Uf;var Wm=0,Li=class extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Qi,this.side=ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nl,this.blendDst=il,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ar,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==ji&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nl&&(n.blendSrc=this.blendSrc),this.blendDst!==il&&(n.blendDst=this.blendDst),this.blendEquation!==Es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ar&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},jt=class extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var mn=new O,Na=new Pe,Xm=0,kn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ol,this.updateRanges=[],this.gpuType=wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix3(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ol&&(e.usage=this.usage),e}};var Uo=class extends kn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var zo=class extends kn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var xt=class extends kn{constructor(e,t,n){super(new Float32Array(e),t,n)}},qm=0,oi=new Et,Ah=new yn,gr=new O,ni=new Zn,bo=new Zn,wn=new O,Qt=class s extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ou(e)?zo:Uo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new yt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,n){return oi.makeTranslation(e,t,n),this.applyMatrix4(oi),this}scale(e,t,n){return oi.makeScale(e,t,n),this.applyMatrix4(oi),this}lookAt(e){return Ah.lookAt(e),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];ni.setFromBufferAttribute(r),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ws);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];bo.setFromBufferAttribute(a),this.morphTargetsRelative?(wn.addVectors(ni.min,bo.min),ni.expandByPoint(wn),wn.addVectors(ni.max,bo.max),ni.expandByPoint(wn)):(ni.expandByPoint(bo.min),ni.expandByPoint(bo.max))}ni.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)wn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(wn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)wn.fromBufferAttribute(a,c),l&&(gr.fromBufferAttribute(e,c),wn.add(gr)),i=Math.max(i,n.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new O,l[C]=new O;let c=new O,h=new O,u=new O,d=new Pe,f=new Pe,m=new Pe,x=new O,g=new O;function p(C,b,_){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,_),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,_),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(D),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(D),a[C].add(x),a[b].add(x),a[_].add(x),l[C].add(g),l[b].add(g),l[_].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,b=y.length;C<b;++C){let _=y[C],D=_.start,k=_.count;for(let P=D,V=D+k;P<V;P+=3)p(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let E=new O,v=new O,S=new O,R=new O;function A(C){S.fromBufferAttribute(i,C),R.copy(S);let b=a[C];E.copy(b),E.sub(S.multiplyScalar(S.dot(b))).normalize(),v.crossVectors(R,b);let D=v.dot(l[C])<0?-1:1;o.setXYZW(C,E.x,E.y,E.z,D)}for(let C=0,b=y.length;C<b;++C){let _=y[C],D=_.start,k=_.count;for(let P=D,V=D+k;P<V;P+=3)A(e.getX(P+0)),A(e.getX(P+1)),A(e.getX(P+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new O,r=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wn.fromBufferAttribute(e,t),wn.normalize(),e.setXYZ(t,wn.x,wn.y,wn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new kn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pd=new Et,zs=new Ir,Ba=new ws,Ld=new O,Oa=new O,Ha=new O,Va=new O,Rh=new O,Ga=new O,kd=new O,Wa=new O,Ye=class extends yn{constructor(e=new Qt,t=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Rh.fromBufferAttribute(u,e),o?Ga.addScaledVector(Rh,h):Ga.addScaledVector(Rh.sub(t),h))}t.add(Ga)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ba.copy(n.boundingSphere),Ba.applyMatrix4(r),zs.copy(e.ray).recast(e.near),!(Ba.containsPoint(zs.origin)===!1&&(zs.intersectSphere(Ba,Ld)===null||zs.origin.distanceToSquared(Ld)>(e.far-e.near)**2))&&(Pd.copy(r).invert(),zs.copy(e.ray).applyMatrix4(Pd),!(n.boundingBox!==null&&zs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zs)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,S=E;v<S;v+=3){let R=a.getX(v),A=a.getX(v+1),C=a.getX(v+2);i=Xa(this,p,e,n,c,h,u,R,A,C),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let y=a.getX(g),E=a.getX(g+1),v=a.getX(g+2);i=Xa(this,o,e,n,c,h,u,y,E,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,S=E;v<S;v+=3){let R=v,A=v+1,C=v+2;i=Xa(this,p,e,n,c,h,u,R,A,C),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let y=g,E=g+1,v=g+2;i=Xa(this,o,e,n,c,h,u,y,E,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function Ym(s,e,t,n,i,r,o,a){let l;if(e.side===Fn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===ji,a),l===null)return null;Wa.copy(a),Wa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Wa);return c<t.near||c>t.far?null:{distance:c,point:Wa.clone(),object:s}}function Xa(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Oa),s.getVertexPosition(l,Ha),s.getVertexPosition(c,Va);let h=Ym(s,e,t,n,Oa,Ha,Va,kd);if(h){let u=new O;Ki.getBarycoord(kd,Oa,Ha,Va,u),i&&(h.uv=Ki.getInterpolatedAttribute(i,a,l,c,u,new Pe)),r&&(h.uv1=Ki.getInterpolatedAttribute(r,a,l,c,u,new Pe)),o&&(h.normal=Ki.getInterpolatedAttribute(o,a,l,c,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new O,materialIndex:0};Ki.getNormal(Oa,Ha,Va,d.normal),h.face=d,h.barycoord=u}return h}var ft=class s extends Qt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(u,2));function m(x,g,p,y,E,v,S,R,A,C,b){let _=v/A,D=S/C,k=v/2,P=S/2,V=R/2,W=A+1,X=C+1,se=0,$=0,oe=new O;for(let he=0;he<X;he++){let _e=he*D-P;for(let Be=0;Be<W;Be++){let nt=Be*_-k;oe[x]=nt*y,oe[g]=_e*E,oe[p]=V,c.push(oe.x,oe.y,oe.z),oe[x]=0,oe[g]=0,oe[p]=R>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Be/A),u.push(1-he/C),se+=1}}for(let he=0;he<C;he++)for(let _e=0;_e<A;_e++){let Be=d+_e+W*he,nt=d+_e+W*(he+1),Fe=d+(_e+1)+W*(he+1),Je=d+(_e+1)+W*he;l.push(Be,nt,Je),l.push(nt,Fe,Je),$+=6}a.addGroup(f,$,b),f+=$,d+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function qs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vn(s){let e={};for(let t=0;t<s.length;t++){let n=qs(s[t]);for(let i in n)e[i]=n[i]}return e}function $m(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function au(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}var zf={clone:qs,merge:Vn},Km=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gn=class extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Km,this.fragmentShader=Zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=$m(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},No=class extends yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ms=new O,Dd=new Pe,Fd=new Pe,Tn=class extends No{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=al*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ah*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return al*2*Math.atan(Math.tan(ah*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ms.x,Ms.y).multiplyScalar(-e/Ms.z),Ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ms.x,Ms.y).multiplyScalar(-e/Ms.z)}getViewSize(e,t){return this.getViewBounds(e,Dd,Fd),t.subVectors(Fd,Dd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ah*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vr=-90,xr=1,ul=class extends yn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Tn(vr,xr,e,t);i.layers=this.layers,this.add(i);let r=new Tn(vr,xr,e,t);r.layers=this.layers,this.add(r);let o=new Tn(vr,xr,e,t);o.layers=this.layers,this.add(o);let a=new Tn(vr,xr,e,t);a.layers=this.layers,this.add(a);let l=new Tn(vr,xr,e,t);l.layers=this.layers,this.add(l);let c=new Tn(vr,xr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===xi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Bo=class extends qn{constructor(e=[],t=Ws,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},dl=class extends Pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bo(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ft(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:is});r.uniforms.tEquirect.value=t;let o=new Ye(i,r),a=t.minFilter;return t.minFilter===Cs&&(t.minFilter=yi),new ul(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Jt=class extends yn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jm={type:"move"},Pr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Oo=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new at(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ki=class extends yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ho=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ol,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xn=new O,Lr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix4(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyNormalMatrix(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.transformDirection(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ii(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),i=Wt(i,this.array),r=Wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new kn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},bi=class extends Li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yr,_o=new O,br=new O,_r=new O,Mr=new Pe,Mo=new Pe,Nf=new Et,qa=new O,So=new O,Ya=new O,Ud=new Pe,Ch=new Pe,zd=new Pe,ts=class extends yn{constructor(e=new bi){if(super(),this.isSprite=!0,this.type="Sprite",yr===void 0){yr=new Qt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ho(t,5);yr.setIndex([0,1,2,0,2,3]),yr.setAttribute("position",new Lr(n,3,0,!1)),yr.setAttribute("uv",new Lr(n,2,3,!1))}this.geometry=yr,this.material=e,this.center=new Pe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),br.setFromMatrixScale(this.matrixWorld),Nf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),_r.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&br.multiplyScalar(-_r.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;$a(qa.set(-.5,-.5,0),_r,o,br,i,r),$a(So.set(.5,-.5,0),_r,o,br,i,r),$a(Ya.set(.5,.5,0),_r,o,br,i,r),Ud.set(0,0),Ch.set(1,0),zd.set(1,1);let a=e.ray.intersectTriangle(qa,So,Ya,!1,_o);if(a===null&&($a(So.set(-.5,.5,0),_r,o,br,i,r),Ch.set(0,1),a=e.ray.intersectTriangle(qa,Ya,So,!1,_o),a===null))return;let l=e.ray.origin.distanceTo(_o);l<e.near||l>e.far||t.push({distance:l,point:_o.clone(),uv:Ki.getInterpolation(_o,qa,So,Ya,Ud,Ch,zd,new Pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function $a(s,e,t,n,i,r){Mr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Mo.x=r*Mr.x-i*Mr.y,Mo.y=i*Mr.x+r*Mr.y):Mo.copy(Mr),s.copy(e),s.x+=Mo.x,s.y+=Mo.y,s.applyMatrix4(Nf)}var fl=class extends qn{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Kn,h=Kn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Di=class extends kn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Sr=new Et,Nd=new Et,Ka=[],Bd=new Zn,jm=new Et,Eo=new Ye,wo=new ws,Dn=class extends Ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Di(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),Bd.copy(e.boundingBox).applyMatrix4(Sr),this.boundingBox.union(Bd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ws),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),wo.copy(e.boundingSphere).applyMatrix4(Sr),this.boundingSphere.union(wo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Eo.geometry=this.geometry,Eo.material=this.material,Eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(n),e.ray.intersectsSphere(wo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Sr),Nd.multiplyMatrices(n,Sr),Eo.matrixWorld=Nd,Eo.raycast(e,Ka);for(let o=0,a=Ka.length;o<a;o++){let l=Ka[o];l.instanceId=r,l.object=this,t.push(l)}Ka.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Di(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new fl(new Float32Array(i*this.count),i,this.count,$l,wi));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ih=new O,Qm=new O,e0=new yt,Ci=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ih.subVectors(n,t).cross(Qm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ih),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||e0.getNormalMatrix(e),i=this.coplanarPoint(Ih).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ns=new ws,t0=new Pe(.5,.5),Za=new O,kr=class{constructor(e=new Ci,t=new Ci,n=new Ci,i=new Ci,r=new Ci,o=new Ci){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xi,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],x=r[9],g=r[10],p=r[11],y=r[12],E=r[13],v=r[14],S=r[15];if(i[0].setComponents(c-o,f-h,p-m,S-y).normalize(),i[1].setComponents(c+o,f+h,p+m,S+y).normalize(),i[2].setComponents(c+a,f+u,p+x,S+E).normalize(),i[3].setComponents(c-a,f-u,p-x,S-E).normalize(),n)i[4].setComponents(l,d,g,v).normalize(),i[5].setComponents(c-l,f-d,p-g,S-v).normalize();else if(i[4].setComponents(c-l,f-d,p-g,S-v).normalize(),t===xi)i[5].setComponents(c+l,f+d,p+g,S+v).normalize();else if(t===Lo)i[5].setComponents(l,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(e){Ns.center.set(0,0,0);let t=t0.distanceTo(e.center);return Ns.radius=.7071067811865476+t,Ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Za.x=i.normal.x>0?e.max.x:e.min.x,Za.y=i.normal.y>0?e.max.y:e.min.y,Za.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ns=class extends qn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vo=class extends qn{constructor(e,t,n=Is,i,r,o,a=Kn,l=Kn,c,h=Tr,u=1){if(h!==Tr&&h!==qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Go=class extends qn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Dr=class s extends Qt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,m=n*2+r,x=i+1,g=new O,p=new O;for(let y=0;y<=m;y++){let E=0,v=0,S=0,R=0;if(y<=n){let b=y/n,_=b*Math.PI/2;v=-h-e*Math.cos(_),S=e*Math.sin(_),R=-e*Math.cos(_),E=b*u}else if(y<=n+r){let b=(y-n)/r;v=-h+b*t,S=e,R=0,E=u+b*d}else{let b=(y-n-r)/n,_=b*Math.PI/2;v=h+e*Math.sin(_),S=e*Math.cos(_),R=e*Math.sin(_),E=u+d+b*u}let A=Math.max(0,Math.min(1,E/f)),C=0;y===0?C=.5/i:y===m&&(C=-.5/i);for(let b=0;b<=i;b++){let _=b/i,D=_*Math.PI*2,k=Math.sin(D),P=Math.cos(D);p.x=-S*P,p.y=v,p.z=S*k,a.push(p.x,p.y,p.z),g.set(-S*P,R,S*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(_+C,A)}if(y>0){let b=(y-1)*x;for(let _=0;_<i;_++){let D=b+_,k=b+_+1,P=y*x+_,V=y*x+_+1;o.push(D,k,P),o.push(k,V,P)}}}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Wo=class s extends Qt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new O,h=new Pe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new xt(o,3)),this.setAttribute("normal",new xt(a,3)),this.setAttribute("uv",new xt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},mt=class s extends Qt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,x=[],g=n/2,p=0;y(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(f,2));function y(){let v=new O,S=new O,R=0,A=(t-e)/n;for(let C=0;C<=r;C++){let b=[],_=C/r,D=_*(t-e)+e;for(let k=0;k<=i;k++){let P=k/i,V=P*l+a,W=Math.sin(V),X=Math.cos(V);S.x=D*W,S.y=-_*n+g,S.z=D*X,u.push(S.x,S.y,S.z),v.set(W,A,X).normalize(),d.push(v.x,v.y,v.z),f.push(P,1-_),b.push(m++)}x.push(b)}for(let C=0;C<i;C++)for(let b=0;b<r;b++){let _=x[b][C],D=x[b+1][C],k=x[b+1][C+1],P=x[b][C+1];(e>0||b!==0)&&(h.push(_,D,P),R+=3),(t>0||b!==r-1)&&(h.push(D,k,P),R+=3)}c.addGroup(p,R,0),p+=R}function E(v){let S=m,R=new Pe,A=new O,C=0,b=v===!0?e:t,_=v===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,g*_,0),d.push(0,_,0),f.push(.5,.5),m++;let D=m;for(let k=0;k<=i;k++){let V=k/i*l+a,W=Math.cos(V),X=Math.sin(V);A.x=b*X,A.y=g*_,A.z=b*W,u.push(A.x,A.y,A.z),d.push(0,_,0),R.x=W*.5+.5,R.y=X*.5*_+.5,f.push(R.x,R.y),m++}for(let k=0;k<i;k++){let P=S+k,V=D+k;v===!0?h.push(V,V+1,P):h.push(V+1,V,P),C+=3}c.addGroup(p,C,v===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},On=class s extends mt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xo=class s extends Qt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new xt(r,3)),this.setAttribute("normal",new xt(r.slice(),3)),this.setAttribute("uv",new xt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let E=new O,v=new O,S=new O;for(let R=0;R<t.length;R+=3)f(t[R+0],E),f(t[R+1],v),f(t[R+2],S),l(E,v,S,y)}function l(y,E,v,S){let R=S+1,A=[];for(let C=0;C<=R;C++){A[C]=[];let b=y.clone().lerp(v,C/R),_=E.clone().lerp(v,C/R),D=R-C;for(let k=0;k<=D;k++)k===0&&C===R?A[C][k]=b:A[C][k]=b.clone().lerp(_,k/D)}for(let C=0;C<R;C++)for(let b=0;b<2*(R-C)-1;b++){let _=Math.floor(b/2);b%2===0?(d(A[C][_+1]),d(A[C+1][_]),d(A[C][_])):(d(A[C][_+1]),d(A[C+1][_+1]),d(A[C+1][_]))}}function c(y){let E=new O;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(y),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let y=new O;for(let E=0;E<r.length;E+=3){y.x=r[E+0],y.y=r[E+1],y.z=r[E+2];let v=g(y)/2/Math.PI+.5,S=p(y)/Math.PI+.5;o.push(v,1-S)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){let E=o[y+0],v=o[y+2],S=o[y+4],R=Math.max(E,v,S),A=Math.min(E,v,S);R>.9&&A<.1&&(E<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),S<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,E){let v=y*3;E.x=e[v+0],E.y=e[v+1],E.z=e[v+2]}function m(){let y=new O,E=new O,v=new O,S=new O,R=new Pe,A=new Pe,C=new Pe;for(let b=0,_=0;b<r.length;b+=9,_+=6){y.set(r[b+0],r[b+1],r[b+2]),E.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),R.set(o[_+0],o[_+1]),A.set(o[_+2],o[_+3]),C.set(o[_+4],o[_+5]),S.copy(y).add(E).add(v).divideScalar(3);let D=g(S);x(R,_+0,y,D),x(A,_+2,E,D),x(C,_+4,v,D)}}function x(y,E,v,S){S<0&&y.x===1&&(o[E]=y.x-1),v.x===0&&v.z===0&&(o[E]=S/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var ii=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Pe:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new O,i=[],r=[],o=[],a=new O,l=new Et;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new O)}r[0]=new O,o[0]=new O;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Ct(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ct(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Fr=class extends ii{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Pe){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},pl=class extends Fr{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function lu(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Ja=new O,Ph=new lu,Lh=new lu,kh=new lu,ml=class extends ii{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new O){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Ja.subVectors(i[0],i[1]).add(i[0]),c=Ja);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Ja.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ja),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Ph.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),Lh.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),kh.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Ph.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Lh.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),kh.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ph.calc(l),Lh.calc(l),kh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new O().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Od(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function n0(s,e){let t=1-s;return t*t*e}function i0(s,e){return 2*(1-s)*s*e}function s0(s,e){return s*s*e}function Ro(s,e,t,n){return n0(s,e)+i0(s,t)+s0(s,n)}function r0(s,e){let t=1-s;return t*t*t*e}function o0(s,e){let t=1-s;return 3*t*t*s*e}function a0(s,e){return 3*(1-s)*s*s*e}function l0(s,e){return s*s*s*e}function Co(s,e,t,n,i){return r0(s,e)+o0(s,t)+a0(s,n)+l0(s,i)}var qo=class extends ii{constructor(e=new Pe,t=new Pe,n=new Pe,i=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Pe){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Co(e,i.x,r.x,o.x,a.x),Co(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},gl=class extends ii{constructor(e=new O,t=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new O){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Co(e,i.x,r.x,o.x,a.x),Co(e,i.y,r.y,o.y,a.y),Co(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yo=class extends ii{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vl=class extends ii{constructor(e=new O,t=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new O){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new O){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$o=class extends ii{constructor(e=new Pe,t=new Pe,n=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Pe){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(e,i.x,r.x,o.x),Ro(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xl=class extends ii{constructor(e=new O,t=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new O){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(e,i.x,r.x,o.x),Ro(e,i.y,r.y,o.y),Ro(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ko=class extends ii{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Od(a,l.x,c.x,h.x,u.x),Od(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Pe().fromArray(i))}return this}},Hd=Object.freeze({__proto__:null,ArcCurve:pl,CatmullRomCurve3:ml,CubicBezierCurve:qo,CubicBezierCurve3:gl,EllipseCurve:Fr,LineCurve:Yo,LineCurve3:vl,QuadraticBezierCurve:$o,QuadraticBezierCurve3:xl,SplineCurve:Ko}),yl=class extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hd[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Hd[i.type]().fromJSON(i))}return this}},Zo=class extends yl{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Yo(this.currentPoint.clone(),new Pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new $o(this.currentPoint.clone(),new Pe(e,t),new Pe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new qo(this.currentPoint.clone(),new Pe(e,t),new Pe(n,i),new Pe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ko(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new Fr(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ur=class extends Zo{constructor(e){super(e),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Zo().fromJSON(i))}return this}};function c0(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Bf(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=p0(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=s[d],m=s[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Jo(r,o,t,a,l,c,0),o}function Bf(s,e,t,n,i){let r;if(i===w0(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Vd(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Vd(o/n|0,s[o],s[o+1],r);return r&&zr(r,r.next)&&(Qo(r),r=r.next),r}function Vs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(zr(t,t.next)||ln(t.prev,t,t.next)===0)){if(Qo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Jo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&y0(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?u0(s,n,i,r):h0(s)){e.push(l.i,s.i,c.i),Qo(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=d0(Vs(s),e),Jo(s,e,t,n,i,r,2)):o===2&&f0(s,e,t,n,i,r):Jo(Vs(s),e,t,n,i,r,1);break}}}function h0(s){let e=s.prev,t=s,n=s.next;if(ln(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ao(i,a,r,l,o,c,m.x,m.y)&&ln(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function u0(s,e,t,n){let i=s.prev,r=s,o=s.next;if(ln(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),x=Math.max(a,l,c),g=Math.max(h,u,d),p=Bh(f,m,e,t,n),y=Bh(x,g,e,t,n),E=s.prevZ,v=s.nextZ;for(;E&&E.z>=p&&v&&v.z<=y;){if(E.x>=f&&E.x<=x&&E.y>=m&&E.y<=g&&E!==i&&E!==o&&Ao(a,h,l,u,c,d,E.x,E.y)&&ln(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Ao(a,h,l,u,c,d,v.x,v.y)&&ln(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=x&&E.y>=m&&E.y<=g&&E!==i&&E!==o&&Ao(a,h,l,u,c,d,E.x,E.y)&&ln(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Ao(a,h,l,u,c,d,v.x,v.y)&&ln(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function d0(s,e){let t=s;do{let n=t.prev,i=t.next.next;!zr(n,i)&&Hf(n,t,t.next,i)&&jo(n,i)&&jo(i,n)&&(e.push(n.i,t.i,i.i),Qo(t),Qo(t.next),t=s=i),t=t.next}while(t!==s);return Vs(t)}function f0(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&M0(o,a)){let l=Vf(o,a);o=Vs(o,o.next),l=Vs(l,l.next),Jo(o,e,t,n,i,r,0),Jo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function p0(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Bf(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(_0(c))}i.sort(m0);for(let r=0;r<i.length;r++)t=g0(i[r],t);return t}function m0(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function g0(s,e){let t=v0(s,e);if(!t)return e;let n=Vf(t,s);return Vs(n,n.next),Vs(t,t.next)}function v0(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(zr(s,t))return t;do{if(zr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Of(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);jo(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&x0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function x0(s,e){return ln(s.prev,s,e.prev)<0&&ln(e.next,s,s.next)<0}function y0(s,e,t,n){let i=s;do i.z===0&&(i.z=Bh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,b0(i)}function b0(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function Bh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function _0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Of(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Ao(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Of(s,e,t,n,i,r,o,a)}function M0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!S0(s,e)&&(jo(s,e)&&jo(e,s)&&E0(s,e)&&(ln(s.prev,s,e.prev)||ln(s,e.prev,e))||zr(s,e)&&ln(s.prev,s,s.next)>0&&ln(e.prev,e,e.next)>0)}function ln(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function zr(s,e){return s.x===e.x&&s.y===e.y}function Hf(s,e,t,n){let i=Qa(ln(s,e,t)),r=Qa(ln(s,e,n)),o=Qa(ln(t,n,s)),a=Qa(ln(t,n,e));return!!(i!==r&&o!==a||i===0&&ja(s,t,e)||r===0&&ja(s,n,e)||o===0&&ja(t,s,n)||a===0&&ja(t,e,n))}function ja(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Qa(s){return s>0?1:s<0?-1:0}function S0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Hf(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function jo(s,e){return ln(s.prev,s,s.next)<0?ln(s,e,s.next)>=0&&ln(s,s.prev,e)>=0:ln(s,e,s.prev)<0||ln(s,s.next,e)<0}function E0(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Vf(s,e){let t=Oh(s.i,s.x,s.y),n=Oh(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Vd(s,e,t,n){let i=Oh(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Qo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Oh(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function w0(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Hh=class{static triangulate(e,t,n=2){return c0(e,t,n)}},wr=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Gd(e),Wd(n,e);let o=e.length;t.forEach(Gd);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Wd(n,t[l]);let a=Hh.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Gd(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Wd(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Ts=class s extends Xo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Nr=class s extends Xo{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Hn=class s extends Qt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let y=p*d-o;for(let E=0;E<c;E++){let v=E*u-r;m.push(v,-y,0),x.push(0,0,1),g.push(E/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){let E=y+c*p,v=y+c*(p+1),S=y+1+c*(p+1),R=y+1+c*p;f.push(E,v,R),f.push(v,S,R)}this.setIndex(f),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(x,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},ai=class s extends Qt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new O,m=new Pe;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<i;x++){let g=x*(n+1);for(let p=0;p<n;p++){let y=p+g,E=y,v=y+n+1,S=y+n+2,R=y+1;a.push(E,v,R),a.push(v,S,R)}}this.setIndex(a),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(c,3)),this.setAttribute("uv",new xt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ea=class s extends Qt{constructor(e=new Ur([new Pe(0,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new xt(i,3)),this.setAttribute("normal",new xt(r,3)),this.setAttribute("uv",new xt(o,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,m=d.holes;wr.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let y=m[g];wr.isClockWise(y)===!0&&(m[g]=y.reverse())}let x=wr.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){let y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=x.length;g<p;g++){let y=x[g],E=y[0]+u,v=y[1]+u,S=y[2]+u;n.push(E,v,S),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return T0(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function T0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var Rn=class s extends Qt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new O,d=new O,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let y=[],E=p/n,v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let S=0;S<=t;S++){let R=S/t;u.x=-e*Math.cos(i+R*r)*Math.sin(o+E*a),u.y=e*Math.cos(o+E*a),u.z=e*Math.sin(i+R*r)*Math.sin(o+E*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(R+v,1-E),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){let E=h[p][y+1],v=h[p][y],S=h[p+1][y],R=h[p+1][y+1];(p!==0||o>0)&&f.push(E,v,R),(p!==n-1||l<Math.PI)&&f.push(v,S,R)}this.setIndex(f),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(x,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var _i=class s extends Qt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new O,u=new O,d=new O;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){let x=m/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){let x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;o.push(x,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Fi=class extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var sn=class extends Li{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bl=class extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_l=class extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function el(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function A0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Gs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ml=class extends Gs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uh,endingEnd:Uh}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zh:r=e,a=2*t-n;break;case Nh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zh:o=e,l=2*n-t;break;case Nh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,y=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,E=(-1-f)*g+(1.5+f)*x+.5*m,v=f*g-f*x;for(let S=0;S!==a;++S)r[S]=p*o[h+S]+y*o[c+S]+E*o[l+S]+v*o[u+S];return r}},Sl=class extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},El=class extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},si=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=el(t,this.TimeBufferType),this.values=el(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:el(e.times,Array),values:el(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new El(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ml(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Io:t=this.InterpolantFactoryMethodDiscrete;break;case rl:t=this.InterpolantFactoryMethodLinear;break;case tl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Io;case this.InterpolantFactoryMethodLinear:return rl;case this.InterpolantFactoryMethodSmooth:return tl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&A0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===tl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let x=t[u+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=rl;var As=class extends si{constructor(e,t,n){super(e,t,n)}};As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=Io;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var wl=class extends si{constructor(e,t,n,i){super(e,t,n,i)}};wl.prototype.ValueTypeName="color";var Tl=class extends si{constructor(e,t,n,i){super(e,t,n,i)}};Tl.prototype.ValueTypeName="number";var Al=class extends Gs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)An.slerpFlat(r,0,o,c-a,o,c,l);return r}},ta=class extends si{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Al(this.times,this.values,this.getValueSize(),e)}};ta.prototype.ValueTypeName="quaternion";ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends si{constructor(e,t,n){super(e,t,n)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=Io;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var Rl=class extends si{constructor(e,t,n,i){super(e,t,n,i)}};Rl.prototype.ValueTypeName="vector";var Cl=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Gf=new Cl,Il=class{constructor(e){this.manager=e!==void 0?e:Gf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Il.DEFAULT_MATERIAL_NAME="__DEFAULT";var Br=class extends yn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new at(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Or=class extends Br{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Dh=new Et,Xd=new O,qd=new O,Pl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=Ei,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kr,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Xd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xd),qd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qd),t.updateMatrixWorld(),Dh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dh,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Yd=new Et,To=new O,Fh=new O,Vh=class extends Pl{constructor(){super(new Tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Ot(2,1,1,1),new Ot(0,1,1,1),new Ot(3,1,1,1),new Ot(1,1,1,1),new Ot(3,0,1,1),new Ot(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),To.setFromMatrixPosition(e.matrixWorld),n.position.copy(To),Fh.copy(n.position),Fh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fh),n.updateMatrixWorld(),i.makeTranslation(-To.x,-To.y,-To.z),Yd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yd,n.coordinateSystem,n.reversedDepth)}},na=class extends Br{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ia=class extends No{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Gh=class extends Pl{constructor(){super(new ia(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hr=class extends Br{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.target=new yn,this.shadow=new Gh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var sa=class extends Qt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ll=class extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cu="\\[\\]\\.:\\/",R0=new RegExp("["+cu+"]","g"),hu="[^"+cu+"]",C0="[^"+cu.replace("\\.","")+"]",I0=/((?:WC+[\/:])*)/.source.replace("WC",hu),P0=/(WCOD+)?/.source.replace("WCOD",C0),L0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hu),k0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hu),D0=new RegExp("^"+I0+P0+L0+k0+"$"),F0=["material","materials","bones","map"],Wh=class{constructor(e,t,n){let i=n||nn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},nn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(R0,"")}static parseTrackName(e){let t=D0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);F0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};nn.Composite=Wh;nn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nn.prototype.GetterByBindingType=[nn.prototype._getValue_direct,nn.prototype._getValue_array,nn.prototype._getValue_arrayElement,nn.prototype._getValue_toArray];nn.prototype.SetterByBindingTypeAndVersioning=[[nn.prototype._setValue_direct,nn.prototype._setValue_direct_setNeedsUpdate,nn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_array,nn.prototype._setValue_array_setNeedsUpdate,nn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_arrayElement,nn.prototype._setValue_arrayElement_setNeedsUpdate,nn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_fromArray,nn.prototype._setValue_fromArray_setNeedsUpdate,nn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Z_=new Float32Array(1);function uu(s,e,t,n){let i=U0(n);switch(t){case eu:return s*e;case $l:return s*e/i.components*i.byteLength;case Kl:return s*e/i.components*i.byteLength;case nu:return s*e*2/i.components*i.byteLength;case Zl:return s*e*2/i.components*i.byteLength;case tu:return s*e*3/i.components*i.byteLength;case li:return s*e*4/i.components*i.byteLength;case Jl:return s*e*4/i.components*i.byteLength;case aa:case la:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ca:case ha:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ql:case tc:return Math.max(s,16)*Math.max(e,8)/4;case jl:case ec:return Math.max(s,8)*Math.max(e,8)/2;case nc:case ic:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case rc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case oc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ac:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case lc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case cc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case hc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case uc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case dc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case fc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case pc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case mc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case gc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case vc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case xc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case yc:case bc:case _c:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Mc:case Sc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ec:case wc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function U0(s){switch(s){case Ei:case Zh:return{byteLength:1,components:1};case Gr:case Jh:case Wr:return{byteLength:2,components:1};case ql:case Yl:return{byteLength:2,components:4};case Is:case Xl:case wi:return{byteLength:4,components:1};case jh:case Qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function fp(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function H0(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var V0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,G0=`#ifdef USE_ALPHAHASH
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
#endif`,W0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,X0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Y0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$0=`#ifdef USE_AOMAP
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
#endif`,K0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Z0=`#ifdef USE_BATCHING
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
#endif`,J0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Q0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tg=`#ifdef USE_IRIDESCENCE
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
#endif`,ng=`#ifdef USE_BUMPMAP
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
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ug=`#define PI 3.141592653589793
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
} // validated`,dg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fg=`vec3 transformedNormal = objectNormal;
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
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",yg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bg=`#ifdef USE_ENVMAP
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
#endif`,_g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Mg=`#ifdef USE_ENVMAP
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
#endif`,Sg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eg=`#ifdef USE_ENVMAP
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
#endif`,wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cg=`#ifdef USE_GRADIENTMAP
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
}`,Ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kg=`uniform bool receiveShadow;
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
#endif`,Dg=`#ifdef USE_ENVMAP
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
#endif`,Fg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bg=`PhysicalMaterial material;
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
#endif`,Og=`struct PhysicalMaterial {
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
}`,Hg=`
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
#endif`,Vg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jg=`#if defined( USE_POINTS_UV )
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
#endif`,jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ev=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iv=`#ifdef USE_MORPHTARGETS
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
#endif`,sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ov=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hv=`#ifdef USE_NORMALMAP
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
#endif`,uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_v=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ev=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tv=`float getShadowMask() {
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
}`,Av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rv=`#ifdef USE_SKINNING
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
#endif`,Cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iv=`#ifdef USE_SKINNING
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
#endif`,Pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fv=`#ifdef USE_TRANSMISSION
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
#endif`,Uv=`#ifdef USE_TRANSMISSION
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
#endif`,zv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ov=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vv=`uniform sampler2D t2D;
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
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yv=`#include <common>
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
}`,$v=`#if DEPTH_PACKING == 3200
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
}`,Kv=`#define DISTANCE
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
}`,Zv=`#define DISTANCE
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
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qv=`uniform float scale;
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
}`,ex=`uniform vec3 diffuse;
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
}`,tx=`#include <common>
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
}`,nx=`uniform vec3 diffuse;
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
}`,ix=`#define LAMBERT
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
}`,sx=`#define LAMBERT
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
}`,rx=`#define MATCAP
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
}`,ox=`#define MATCAP
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
}`,ax=`#define NORMAL
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
}`,lx=`#define NORMAL
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
}`,cx=`#define PHONG
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
}`,hx=`#define PHONG
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
}`,ux=`#define STANDARD
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
}`,dx=`#define STANDARD
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
}`,fx=`#define TOON
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
}`,px=`#define TOON
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
}`,mx=`uniform float size;
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
}`,gx=`uniform vec3 diffuse;
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
}`,vx=`#include <common>
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
}`,xx=`uniform vec3 color;
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
}`,yx=`uniform float rotation;
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
}`,bx=`uniform vec3 diffuse;
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
}`,bt={alphahash_fragment:V0,alphahash_pars_fragment:G0,alphamap_fragment:W0,alphamap_pars_fragment:X0,alphatest_fragment:q0,alphatest_pars_fragment:Y0,aomap_fragment:$0,aomap_pars_fragment:K0,batching_pars_vertex:Z0,batching_vertex:J0,begin_vertex:j0,beginnormal_vertex:Q0,bsdfs:eg,iridescence_fragment:tg,bumpmap_pars_fragment:ng,clipping_planes_fragment:ig,clipping_planes_pars_fragment:sg,clipping_planes_pars_vertex:rg,clipping_planes_vertex:og,color_fragment:ag,color_pars_fragment:lg,color_pars_vertex:cg,color_vertex:hg,common:ug,cube_uv_reflection_fragment:dg,defaultnormal_vertex:fg,displacementmap_pars_vertex:pg,displacementmap_vertex:mg,emissivemap_fragment:gg,emissivemap_pars_fragment:vg,colorspace_fragment:xg,colorspace_pars_fragment:yg,envmap_fragment:bg,envmap_common_pars_fragment:_g,envmap_pars_fragment:Mg,envmap_pars_vertex:Sg,envmap_physical_pars_fragment:Dg,envmap_vertex:Eg,fog_vertex:wg,fog_pars_vertex:Tg,fog_fragment:Ag,fog_pars_fragment:Rg,gradientmap_pars_fragment:Cg,lightmap_pars_fragment:Ig,lights_lambert_fragment:Pg,lights_lambert_pars_fragment:Lg,lights_pars_begin:kg,lights_toon_fragment:Fg,lights_toon_pars_fragment:Ug,lights_phong_fragment:zg,lights_phong_pars_fragment:Ng,lights_physical_fragment:Bg,lights_physical_pars_fragment:Og,lights_fragment_begin:Hg,lights_fragment_maps:Vg,lights_fragment_end:Gg,logdepthbuf_fragment:Wg,logdepthbuf_pars_fragment:Xg,logdepthbuf_pars_vertex:qg,logdepthbuf_vertex:Yg,map_fragment:$g,map_pars_fragment:Kg,map_particle_fragment:Zg,map_particle_pars_fragment:Jg,metalnessmap_fragment:jg,metalnessmap_pars_fragment:Qg,morphinstance_vertex:ev,morphcolor_vertex:tv,morphnormal_vertex:nv,morphtarget_pars_vertex:iv,morphtarget_vertex:sv,normal_fragment_begin:rv,normal_fragment_maps:ov,normal_pars_fragment:av,normal_pars_vertex:lv,normal_vertex:cv,normalmap_pars_fragment:hv,clearcoat_normal_fragment_begin:uv,clearcoat_normal_fragment_maps:dv,clearcoat_pars_fragment:fv,iridescence_pars_fragment:pv,opaque_fragment:mv,packing:gv,premultiplied_alpha_fragment:vv,project_vertex:xv,dithering_fragment:yv,dithering_pars_fragment:bv,roughnessmap_fragment:_v,roughnessmap_pars_fragment:Mv,shadowmap_pars_fragment:Sv,shadowmap_pars_vertex:Ev,shadowmap_vertex:wv,shadowmask_pars_fragment:Tv,skinbase_vertex:Av,skinning_pars_vertex:Rv,skinning_vertex:Cv,skinnormal_vertex:Iv,specularmap_fragment:Pv,specularmap_pars_fragment:Lv,tonemapping_fragment:kv,tonemapping_pars_fragment:Dv,transmission_fragment:Fv,transmission_pars_fragment:Uv,uv_pars_fragment:zv,uv_pars_vertex:Nv,uv_vertex:Bv,worldpos_vertex:Ov,background_vert:Hv,background_frag:Vv,backgroundCube_vert:Gv,backgroundCube_frag:Wv,cube_vert:Xv,cube_frag:qv,depth_vert:Yv,depth_frag:$v,distanceRGBA_vert:Kv,distanceRGBA_frag:Zv,equirect_vert:Jv,equirect_frag:jv,linedashed_vert:Qv,linedashed_frag:ex,meshbasic_vert:tx,meshbasic_frag:nx,meshlambert_vert:ix,meshlambert_frag:sx,meshmatcap_vert:rx,meshmatcap_frag:ox,meshnormal_vert:ax,meshnormal_frag:lx,meshphong_vert:cx,meshphong_frag:hx,meshphysical_vert:ux,meshphysical_frag:dx,meshtoon_vert:fx,meshtoon_frag:px,points_vert:mx,points_frag:gx,shadow_vert:vx,shadow_frag:xx,sprite_vert:yx,sprite_frag:bx},Ue={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new yt},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new yt}},envmap:{envMap:{value:null},envMapRotation:{value:new yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new yt},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0},uvTransform:{value:new yt}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new yt},alphaMap:{value:null},alphaMapTransform:{value:new yt},alphaTest:{value:0}}},zi={basic:{uniforms:Vn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:Vn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new at(0)}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:Vn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:Vn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:Vn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new at(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:Vn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:Vn([Ue.points,Ue.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:Vn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:Vn([Ue.common,Ue.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:Vn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:Vn([Ue.sprite,Ue.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new yt}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distanceRGBA:{uniforms:Vn([Ue.common,Ue.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distanceRGBA_vert,fragmentShader:bt.distanceRGBA_frag},shadow:{uniforms:Vn([Ue.lights,Ue.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};zi.physical={uniforms:Vn([zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new yt},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new yt},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new yt},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new yt},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new yt},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new yt}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};var Cc={r:0,b:0,g:0},Ys=new Jn,_x=new Et;function Mx(s,e,t,n,i,r,o){let a=new at(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?t:e).get(v)),v}function x(E){let v=!1,S=m(E);S===null?p(a,l):S&&S.isColor&&(p(S,1),v=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(E,v){let S=m(v);S&&(S.isCubeTexture||S.mapping===ra)?(h===void 0&&(h=new Ye(new ft(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:qs(zi.backgroundCube.uniforms),vertexShader:zi.backgroundCube.vertexShader,fragmentShader:zi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ys.copy(v.backgroundRotation),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(_x.makeRotationFromEuler(Ys)),h.material.toneMapped=Dt.getTransfer(S.colorSpace)!==Gt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Ye(new Hn(2,2),new gn({name:"BackgroundMaterial",uniforms:qs(zi.background.uniforms),vertexShader:zi.background.vertexShader,fragmentShader:zi.background.fragmentShader,side:ji,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Dt.getTransfer(S.colorSpace)!==Gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,v){E.getRGB(Cc,au(s)),n.buffers.color.setClear(Cc.r,Cc.g,Cc.b,v,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:x,addToRenderList:g,dispose:y}}function Sx(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(_,D,k,P,V){let W=!1,X=u(P,k,D);r!==X&&(r=X,c(r.object)),W=f(_,P,k,V),W&&m(_,P,k,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(_,D,k,P),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return s.createVertexArray()}function c(_){return s.bindVertexArray(_)}function h(_){return s.deleteVertexArray(_)}function u(_,D,k){let P=k.wireframe===!0,V=n[_.id];V===void 0&&(V={},n[_.id]=V);let W=V[D.id];W===void 0&&(W={},V[D.id]=W);let X=W[P];return X===void 0&&(X=d(l()),W[P]=X),X}function d(_){let D=[],k=[],P=[];for(let V=0;V<t;V++)D[V]=0,k[V]=0,P[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:P,object:_,attributes:{},index:null}}function f(_,D,k,P){let V=r.attributes,W=D.attributes,X=0,se=k.getAttributes();for(let $ in se)if(se[$].location>=0){let he=V[$],_e=W[$];if(_e===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(_e=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(_e=_.instanceColor)),he===void 0||he.attribute!==_e||_e&&he.data!==_e.data)return!0;X++}return r.attributesNum!==X||r.index!==P}function m(_,D,k,P){let V={},W=D.attributes,X=0,se=k.getAttributes();for(let $ in se)if(se[$].location>=0){let he=W[$];he===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(he=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(he=_.instanceColor));let _e={};_e.attribute=he,he&&he.data&&(_e.data=he.data),V[$]=_e,X++}r.attributes=V,r.attributesNum=X,r.index=P}function x(){let _=r.newAttributes;for(let D=0,k=_.length;D<k;D++)_[D]=0}function g(_){p(_,0)}function p(_,D){let k=r.newAttributes,P=r.enabledAttributes,V=r.attributeDivisors;k[_]=1,P[_]===0&&(s.enableVertexAttribArray(_),P[_]=1),V[_]!==D&&(s.vertexAttribDivisor(_,D),V[_]=D)}function y(){let _=r.newAttributes,D=r.enabledAttributes;for(let k=0,P=D.length;k<P;k++)D[k]!==_[k]&&(s.disableVertexAttribArray(k),D[k]=0)}function E(_,D,k,P,V,W,X){X===!0?s.vertexAttribIPointer(_,D,k,V,W):s.vertexAttribPointer(_,D,k,P,V,W)}function v(_,D,k,P){x();let V=P.attributes,W=k.getAttributes(),X=D.defaultAttributeValues;for(let se in W){let $=W[se];if($.location>=0){let oe=V[se];if(oe===void 0&&(se==="instanceMatrix"&&_.instanceMatrix&&(oe=_.instanceMatrix),se==="instanceColor"&&_.instanceColor&&(oe=_.instanceColor)),oe!==void 0){let he=oe.normalized,_e=oe.itemSize,Be=e.get(oe);if(Be===void 0)continue;let nt=Be.buffer,Fe=Be.type,Je=Be.bytesPerElement,te=Fe===s.INT||Fe===s.UNSIGNED_INT||oe.gpuType===Xl;if(oe.isInterleavedBufferAttribute){let Q=oe.data,xe=Q.stride,we=oe.offset;if(Q.isInstancedInterleavedBuffer){for(let de=0;de<$.locationSize;de++)p($.location+de,Q.meshPerAttribute);_.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let de=0;de<$.locationSize;de++)g($.location+de);s.bindBuffer(s.ARRAY_BUFFER,nt);for(let de=0;de<$.locationSize;de++)E($.location+de,_e/$.locationSize,Fe,he,xe*Je,(we+_e/$.locationSize*de)*Je,te)}else{if(oe.isInstancedBufferAttribute){for(let Q=0;Q<$.locationSize;Q++)p($.location+Q,oe.meshPerAttribute);_.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Q=0;Q<$.locationSize;Q++)g($.location+Q);s.bindBuffer(s.ARRAY_BUFFER,nt);for(let Q=0;Q<$.locationSize;Q++)E($.location+Q,_e/$.locationSize,Fe,he,_e*Je,_e/$.locationSize*Q*Je,te)}}else if(X!==void 0){let he=X[se];if(he!==void 0)switch(he.length){case 2:s.vertexAttrib2fv($.location,he);break;case 3:s.vertexAttrib3fv($.location,he);break;case 4:s.vertexAttrib4fv($.location,he);break;default:s.vertexAttrib1fv($.location,he)}}}}y()}function S(){C();for(let _ in n){let D=n[_];for(let k in D){let P=D[k];for(let V in P)h(P[V].object),delete P[V];delete D[k]}delete n[_]}}function R(_){if(n[_.id]===void 0)return;let D=n[_.id];for(let k in D){let P=D[k];for(let V in P)h(P[V].object),delete P[V];delete D[k]}delete n[_.id]}function A(_){for(let D in n){let k=n[D];if(k[_.id]===void 0)continue;let P=k[_.id];for(let V in P)h(P[V].object),delete P[V];delete k[_.id]}}function C(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:b,dispose:S,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function Ex(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function wx(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==li&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let C=A===Wr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ei&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==wi&&!C)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=m>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:S,maxSamples:R}}function Tx(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Ci,a=new yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{let y=r?0:n,E=y*4,v=p.clippingState||null;l.value=v,v=h(m,d,E,f);for(let S=0;S!==E;++S)v[S]=t[S];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,v=f;E!==x;++E,v+=4)o.copy(u[E]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Ax(s){let e=new WeakMap;function t(o,a){return a===Vl?o.mapping=Ws:a===Gl&&(o.mapping=Xs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Vl||a===Gl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new dl(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var $r=4,Wf=[.125,.215,.35,.446,.526,.582],Zs=20,du=new ia,Xf=new at,fu=null,pu=0,mu=0,gu=!1,Ks=(1+Math.sqrt(5))/2,Yr=1/Ks,qf=[new O(-Ks,Yr,0),new O(Ks,Yr,0),new O(-Yr,0,Ks),new O(Yr,0,Ks),new O(0,Ks,-Yr),new O(0,Ks,Yr),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Rx=new O,Zr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=Rx}=r;fu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$f(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fu,pu,mu),this._renderer.xr.enabled=gu,e.scissorTest=!1,Ic(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ws||e.mapping===Xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),gu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:yi,minFilter:yi,generateMipmaps:!1,type:Wr,format:li,colorSpace:Hs,depthBuffer:!1},i=Yf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cx(r)),this._blurMaterial=Ix(r,e,t)}return i}_compileMaterial(e){let t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,du)}_sceneToCubeUV(e,t,n,i,r){let l=new Tn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xf),u.toneMapping=Si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let x=new jt({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),g=new Ye(new ft,x),p=!1,y=e.background;y?y.isColor&&(x.color.copy(y),e.background=null,p=!0):(x.color.copy(Xf),p=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let S=this._cubeSize;Ic(i,v*S,E>2?S:0,S,S),u.setRenderTarget(i),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ws||e.mapping===Xs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$f());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Ic(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,du)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qf[(i-r-1)%qf.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ye(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zs-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):Zs;g>Zs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Zs}`);let p=[],y=0;for(let A=0;A<Zs;++A){let C=A/x,b=Math.exp(-C*C/2);p.push(b),A===0?y+=b:A<g&&(y+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:E}=this;d.dTheta.value=m,d.mipInt.value=E-n;let v=this._sizeLods[i],S=3*v*(i>E-$r?i-E+$r:0),R=4*(this._cubeSize-v);Ic(t,S,R,3*v,2*v),l.setRenderTarget(t),l.render(u,du)}};function Cx(s){let e=[],t=[],n=[],i=s,r=s-$r+1+Wf.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-$r?l=Wf[o-s+$r-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*f),E=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let R=0;R<f;R++){let A=R%3*2/3-1,C=R>2?0:-1,b=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];y.set(b,x*m*R),E.set(d,g*m*R);let _=[R,R,R,R,R,R];v.set(_,p*m*R)}let S=new Qt;S.setAttribute("position",new kn(y,x)),S.setAttribute("uv",new kn(E,g)),S.setAttribute("faceIndex",new kn(v,p)),e.push(S),i>$r&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yf(s,e,t){let n=new Pi(s,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ic(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Ix(s,e,t){let n=new Float32Array(Zs),i=new O(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Tu(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function $f(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tu(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function Kf(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function Tu(){return`

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
	`}function Px(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Vl||l===Gl,h=l===Ws||l===Xs;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Zr(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Zr(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Lx(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function kx(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,m=u.attributes.position,x=0;if(f!==null){let y=f.array;x=f.version;for(let E=0,v=y.length;E<v;E+=3){let S=y[E+0],R=y[E+1],A=y[E+2];d.push(S,R,R,A,A,S)}}else if(m!==void 0){let y=m.array;x=m.version;for(let E=0,v=y.length/3-1;E<v;E+=3){let S=E+0,R=E+1,A=E+2;d.push(S,R,R,A,A,S)}}else return;let g=new(ou(d)?zo:Uo)(d,1);g.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Dx(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*x[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Fx(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ux(s,e,t){let n=new WeakMap,i=new Ot;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],E=0;f===!0&&(E=1),m===!0&&(E=2),x===!0&&(E=3);let v=a.attributes.position.count*E,S=1;v>e.maxTextureSize&&(S=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*S*4*u),A=new Do(R,v,S,u);A.type=wi,A.needsUpdate=!0;let C=E*4;for(let _=0;_<u;_++){let D=g[_],k=p[_],P=y[_],V=v*S*4*_;for(let W=0;W<D.count;W++){let X=W*C;f===!0&&(i.fromBufferAttribute(D,W),R[V+X+0]=i.x,R[V+X+1]=i.y,R[V+X+2]=i.z,R[V+X+3]=0),m===!0&&(i.fromBufferAttribute(k,W),R[V+X+4]=i.x,R[V+X+5]=i.y,R[V+X+6]=i.z,R[V+X+7]=0),x===!0&&(i.fromBufferAttribute(P,W),R[V+X+8]=i.x,R[V+X+9]=i.y,R[V+X+10]=i.z,R[V+X+11]=P.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new Pe(v,S)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function zx(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var pp=new qn,Zf=new Vo(1,1),mp=new Do,gp=new hl,vp=new Bo,Jf=[],jf=[],Qf=new Float32Array(16),ep=new Float32Array(9),tp=new Float32Array(4);function Jr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Jf[i];if(r===void 0&&(r=new Float32Array(i),Jf[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function bn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _n(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function kc(s,e){let t=jf[e];t===void 0&&(t=new Int32Array(e),jf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Nx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Bx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2fv(this.addr,e),_n(t,e)}}function Ox(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bn(t,e))return;s.uniform3fv(this.addr,e),_n(t,e)}}function Hx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4fv(this.addr,e),_n(t,e)}}function Vx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_n(t,e)}else{if(bn(t,n))return;tp.set(n),s.uniformMatrix2fv(this.addr,!1,tp),_n(t,n)}}function Gx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_n(t,e)}else{if(bn(t,n))return;ep.set(n),s.uniformMatrix3fv(this.addr,!1,ep),_n(t,n)}}function Wx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_n(t,e)}else{if(bn(t,n))return;Qf.set(n),s.uniformMatrix4fv(this.addr,!1,Qf),_n(t,n)}}function Xx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function qx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2iv(this.addr,e),_n(t,e)}}function Yx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;s.uniform3iv(this.addr,e),_n(t,e)}}function $x(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4iv(this.addr,e),_n(t,e)}}function Kx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Zx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2uiv(this.addr,e),_n(t,e)}}function Jx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;s.uniform3uiv(this.addr,e),_n(t,e)}}function jx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4uiv(this.addr,e),_n(t,e)}}function Qx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Zf.compareFunction=su,r=Zf):r=pp,t.setTexture2D(e||r,i)}function ey(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gp,i)}function ty(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||vp,i)}function ny(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mp,i)}function iy(s){switch(s){case 5126:return Nx;case 35664:return Bx;case 35665:return Ox;case 35666:return Hx;case 35674:return Vx;case 35675:return Gx;case 35676:return Wx;case 5124:case 35670:return Xx;case 35667:case 35671:return qx;case 35668:case 35672:return Yx;case 35669:case 35673:return $x;case 5125:return Kx;case 36294:return Zx;case 36295:return Jx;case 36296:return jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Qx;case 35679:case 36299:case 36307:return ey;case 35680:case 36300:case 36308:case 36293:return ty;case 36289:case 36303:case 36311:case 36292:return ny}}function sy(s,e){s.uniform1fv(this.addr,e)}function ry(s,e){let t=Jr(e,this.size,2);s.uniform2fv(this.addr,t)}function oy(s,e){let t=Jr(e,this.size,3);s.uniform3fv(this.addr,t)}function ay(s,e){let t=Jr(e,this.size,4);s.uniform4fv(this.addr,t)}function ly(s,e){let t=Jr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function cy(s,e){let t=Jr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function hy(s,e){let t=Jr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function uy(s,e){s.uniform1iv(this.addr,e)}function dy(s,e){s.uniform2iv(this.addr,e)}function fy(s,e){s.uniform3iv(this.addr,e)}function py(s,e){s.uniform4iv(this.addr,e)}function my(s,e){s.uniform1uiv(this.addr,e)}function gy(s,e){s.uniform2uiv(this.addr,e)}function vy(s,e){s.uniform3uiv(this.addr,e)}function xy(s,e){s.uniform4uiv(this.addr,e)}function yy(s,e,t){let n=this.cache,i=e.length,r=kc(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||pp,r[o])}function by(s,e,t){let n=this.cache,i=e.length,r=kc(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||gp,r[o])}function _y(s,e,t){let n=this.cache,i=e.length,r=kc(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||vp,r[o])}function My(s,e,t){let n=this.cache,i=e.length,r=kc(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||mp,r[o])}function Sy(s){switch(s){case 5126:return sy;case 35664:return ry;case 35665:return oy;case 35666:return ay;case 35674:return ly;case 35675:return cy;case 35676:return hy;case 5124:case 35670:return uy;case 35667:case 35671:return dy;case 35668:case 35672:return fy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return vy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return yy;case 35679:case 36299:case 36307:return by;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return My}}var xu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iy(t.type)}},yu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sy(t.type)}},bu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},vu=/(\w+)(\])?(\[|\.)?/g;function np(s,e){s.seq.push(e),s.map[e.id]=e}function Ey(s,e,t){let n=s.name,i=n.length;for(vu.lastIndex=0;;){let r=vu.exec(n),o=vu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){np(t,c===void 0?new xu(a,s,e):new yu(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new bu(a),np(t,u)),t=u}}}var Kr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Ey(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function ip(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var wy=37297,Ty=0;function Ay(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var sp=new yt;function Ry(s){Dt._getMatrix(sp,Dt.workingColorSpace,s);let e=`mat3( ${sp.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(s)){case Po:return[e,"LinearTransferOETF"];case Gt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function rp(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Ay(s.getShaderSource(e),a)}else return r}function Cy(s,e){let t=Ry(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Iy(s,e){let t;switch(e){case vf:t="Linear";break;case xf:t="Reinhard";break;case yf:t="Cineon";break;case Hl:t="ACESFilmic";break;case _f:t="AgX";break;case Mf:t="Neutral";break;case bf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Pc=new O;function Py(){Dt.getLuminanceCoefficients(Pc);let s=Pc.x.toFixed(4),e=Pc.y.toFixed(4),t=Pc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ly(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function ky(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Dy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function ua(s){return s!==""}function op(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ap(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function _u(s){return s.replace(Fy,zy)}var Uy=new Map;function zy(s,e){let t=bt[e];if(t===void 0){let n=Uy.get(e);if(n!==void 0)t=bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return _u(t)}var Ny=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lp(s){return s.replace(Ny,By)}function By(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function cp(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Oy(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===qh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ui&&(e="SHADOWMAP_TYPE_VSM"),e}function Hy(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ws:case Xs:e="ENVMAP_TYPE_CUBE";break;case ra:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Vy(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Xs&&(e="ENVMAP_MODE_REFRACTION"),e}function Gy(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ol:e="ENVMAP_BLENDING_MULTIPLY";break;case mf:e="ENVMAP_BLENDING_MIX";break;case gf:e="ENVMAP_BLENDING_ADD";break}return e}function Wy(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xy(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Oy(t),c=Hy(t),h=Vy(t),u=Gy(t),d=Wy(t),f=Ly(t),m=ky(r),x=i.createProgram(),g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ua).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ua).join(`
`),p.length>0&&(p+=`
`)):(g=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),p=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?bt.tonemapping_pars_fragment:"",t.toneMapping!==Si?Iy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),Py(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ua).join(`
`)),o=_u(o),o=op(o,t),o=ap(o,t),a=_u(a),a=op(a,t),a=ap(a,t),o=lp(o),a=lp(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ru?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ru?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=y+g+o,v=y+p+a,S=ip(i,i.VERTEX_SHADER,E),R=ip(i,i.FRAGMENT_SHADER,v);i.attachShader(x,S),i.attachShader(x,R),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(D){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(x)||"",P=i.getShaderInfoLog(S)||"",V=i.getShaderInfoLog(R)||"",W=k.trim(),X=P.trim(),se=V.trim(),$=!0,oe=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,S,R);else{let he=rp(i,S,"vertex"),_e=rp(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+he+`
`+_e)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(X===""||se==="")&&(oe=!1);oe&&(D.diagnostics={runnable:$,programLog:W,vertexShader:{log:X,prefix:g},fragmentShader:{log:se,prefix:p}})}i.deleteShader(S),i.deleteShader(R),C=new Kr(i,x),b=Dy(i,x)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(x,wy)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=R,this}var qy=0,Mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Su(e),t.set(e,n)),n}},Su=class{constructor(e){this.id=qy++,this.code=e,this.usedTimes=0}};function Yy(s,e,t,n,i,r,o){let a=new Fo,l=new Mu,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,_,D,k,P){let V=k.fog,W=P.geometry,X=b.isMeshStandardMaterial?k.environment:null,se=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),$=se&&se.mapping===ra?se.image.height:null,oe=m[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let he=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_e=he!==void 0?he.length:0,Be=0;W.morphAttributes.position!==void 0&&(Be=1),W.morphAttributes.normal!==void 0&&(Be=2),W.morphAttributes.color!==void 0&&(Be=3);let nt,Fe,Je,te;if(oe){let At=zi[oe];nt=At.vertexShader,Fe=At.fragmentShader}else nt=b.vertexShader,Fe=b.fragmentShader,l.update(b),Je=l.getVertexShaderID(b),te=l.getFragmentShaderID(b);let Q=s.getRenderTarget(),xe=s.state.buffers.depth.getReversed(),we=P.isInstancedMesh===!0,de=P.isBatchedMesh===!0,be=!!b.map,qe=!!b.matcap,B=!!se,vt=!!b.aoMap,$e=!!b.lightMap,Ge=!!b.bumpMap,De=!!b.normalMap,We=!!b.displacementMap,ze=!!b.emissiveMap,tt=!!b.metalnessMap,Tt=!!b.roughnessMap,Xt=b.anisotropy>0,z=b.clearcoat>0,T=b.dispersion>0,j=b.iridescence>0,le=b.sheen>0,ue=b.transmission>0,ae=Xt&&!!b.anisotropyMap,Ke=z&&!!b.clearcoatMap,me=z&&!!b.clearcoatNormalMap,Ae=z&&!!b.clearcoatRoughnessMap,Ie=j&&!!b.iridescenceMap,ge=j&&!!b.iridescenceThicknessMap,Re=le&&!!b.sheenColorMap,et=le&&!!b.sheenRoughnessMap,Ze=!!b.specularMap,Te=!!b.specularColorMap,ht=!!b.specularIntensityMap,G=ue&&!!b.transmissionMap,q=ue&&!!b.thicknessMap,ye=!!b.gradientMap,Ce=!!b.alphaMap,fe=b.alphaTest>0,re=!!b.alphaHash,Oe=!!b.extensions,Qe=Si;b.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Qe=s.toneMapping);let St={shaderID:oe,shaderType:b.type,shaderName:b.name,vertexShader:nt,fragmentShader:Fe,defines:b.defines,customVertexShaderID:Je,customFragmentShaderID:te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:de,batchingColor:de&&P._colorsTexture!==null,instancing:we,instancingColor:we&&P.instanceColor!==null,instancingMorph:we&&P.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Hs,alphaToCoverage:!!b.alphaToCoverage,map:be,matcap:qe,envMap:B,envMapMode:B&&se.mapping,envMapCubeUVHeight:$,aoMap:vt,lightMap:$e,bumpMap:Ge,normalMap:De,displacementMap:d&&We,emissiveMap:ze,normalMapObjectSpace:De&&b.normalMapType===Tf,normalMapTangentSpace:De&&b.normalMapType===Tc,metalnessMap:tt,roughnessMap:Tt,anisotropy:Xt,anisotropyMap:ae,clearcoat:z,clearcoatMap:Ke,clearcoatNormalMap:me,clearcoatRoughnessMap:Ae,dispersion:T,iridescence:j,iridescenceMap:Ie,iridescenceThicknessMap:ge,sheen:le,sheenColorMap:Re,sheenRoughnessMap:et,specularMap:Ze,specularColorMap:Te,specularIntensityMap:ht,transmission:ue,transmissionMap:G,thicknessMap:q,gradientMap:ye,opaque:b.transparent===!1&&b.blending===Qi&&b.alphaToCoverage===!1,alphaMap:Ce,alphaTest:fe,alphaHash:re,combine:b.combine,mapUv:be&&x(b.map.channel),aoMapUv:vt&&x(b.aoMap.channel),lightMapUv:$e&&x(b.lightMap.channel),bumpMapUv:Ge&&x(b.bumpMap.channel),normalMapUv:De&&x(b.normalMap.channel),displacementMapUv:We&&x(b.displacementMap.channel),emissiveMapUv:ze&&x(b.emissiveMap.channel),metalnessMapUv:tt&&x(b.metalnessMap.channel),roughnessMapUv:Tt&&x(b.roughnessMap.channel),anisotropyMapUv:ae&&x(b.anisotropyMap.channel),clearcoatMapUv:Ke&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:me&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:et&&x(b.sheenRoughnessMap.channel),specularMapUv:Ze&&x(b.specularMap.channel),specularColorMapUv:Te&&x(b.specularColorMap.channel),specularIntensityMapUv:ht&&x(b.specularIntensityMap.channel),transmissionMapUv:G&&x(b.transmissionMap.channel),thicknessMapUv:q&&x(b.thicknessMap.channel),alphaMapUv:Ce&&x(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(De||Xt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!W.attributes.uv&&(be||Ce),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xe,skinning:P.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Be,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Qe,decodeVideoTexture:be&&b.map.isVideoTexture===!0&&Dt.getTransfer(b.map.colorSpace)===Gt,decodeVideoTextureEmissive:ze&&b.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(b.emissiveMap.colorSpace)===Gt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Cn,flipSided:b.side===Fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Oe&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&b.extensions.multiDraw===!0||de)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return St.vertexUv1s=c.has(1),St.vertexUv2s=c.has(2),St.vertexUv3s=c.has(3),c.clear(),St}function p(b){let _=[];if(b.shaderID?_.push(b.shaderID):(_.push(b.customVertexShaderID),_.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)_.push(D),_.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(y(_,b),E(_,b),_.push(s.outputColorSpace)),_.push(b.customProgramCacheKey),_.join()}function y(b,_){b.push(_.precision),b.push(_.outputColorSpace),b.push(_.envMapMode),b.push(_.envMapCubeUVHeight),b.push(_.mapUv),b.push(_.alphaMapUv),b.push(_.lightMapUv),b.push(_.aoMapUv),b.push(_.bumpMapUv),b.push(_.normalMapUv),b.push(_.displacementMapUv),b.push(_.emissiveMapUv),b.push(_.metalnessMapUv),b.push(_.roughnessMapUv),b.push(_.anisotropyMapUv),b.push(_.clearcoatMapUv),b.push(_.clearcoatNormalMapUv),b.push(_.clearcoatRoughnessMapUv),b.push(_.iridescenceMapUv),b.push(_.iridescenceThicknessMapUv),b.push(_.sheenColorMapUv),b.push(_.sheenRoughnessMapUv),b.push(_.specularMapUv),b.push(_.specularColorMapUv),b.push(_.specularIntensityMapUv),b.push(_.transmissionMapUv),b.push(_.thicknessMapUv),b.push(_.combine),b.push(_.fogExp2),b.push(_.sizeAttenuation),b.push(_.morphTargetsCount),b.push(_.morphAttributeCount),b.push(_.numDirLights),b.push(_.numPointLights),b.push(_.numSpotLights),b.push(_.numSpotLightMaps),b.push(_.numHemiLights),b.push(_.numRectAreaLights),b.push(_.numDirLightShadows),b.push(_.numPointLightShadows),b.push(_.numSpotLightShadows),b.push(_.numSpotLightShadowsWithMaps),b.push(_.numLightProbes),b.push(_.shadowMapType),b.push(_.toneMapping),b.push(_.numClippingPlanes),b.push(_.numClipIntersection),b.push(_.depthPacking)}function E(b,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){let _=m[b.type],D;if(_){let k=zi[_];D=zf.clone(k.uniforms)}else D=b.uniforms;return D}function S(b,_){let D;for(let k=0,P=h.length;k<P;k++){let V=h[k];if(V.cacheKey===_){D=V,++D.usedTimes;break}}return D===void 0&&(D=new Xy(s,_,b,r),h.push(D)),D}function R(b){if(--b.usedTimes===0){let _=h.indexOf(b);h[_]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:S,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:C}}function $y(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Ky(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function hp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function up(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,m,x,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function a(u,d,f,m,x,g){let p=o(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,x,g){let p=o(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Ky),n.length>1&&n.sort(d||hp),i.length>1&&i.sort(d||hp)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Zy(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new up,s.set(n,[o])):i>=r.length?(o=new up,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Jy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new at};break;case"SpotLight":t={position:new O,direction:new O,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new O,halfWidth:new O,halfHeight:new O};break}return s[e.id]=t,t}}}function jy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Qy=0;function eb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function tb(s){let e=new Jy,t=jy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);let i=new O,r=new Et,o=new Et;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,y=0,E=0,v=0,S=0,R=0,A=0;c.sort(eb);for(let b=0,_=c.length;b<_;b++){let D=c[b],k=D.color,P=D.intensity,V=D.distance,W=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=k.r*P,u+=k.g*P,d+=k.b*P;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],P);A++}else if(D.isDirectionalLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,$=t.get(D);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=D.shadow.matrix,y++}n.directional[f]=X,f++}else if(D.isSpotLight){let X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(k).multiplyScalar(P),X.distance=V,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[x]=X;let se=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,se.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[x]=se.matrix,D.castShadow){let $=t.get(D);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=W,v++}x++}else if(D.isRectAreaLight){let X=e.get(D);X.color.copy(k).multiplyScalar(P),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=X,g++}else if(D.isPointLight){let X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let se=D.shadow,$=t.get(D);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,$.shadowCameraNear=se.camera.near,$.shadowCameraFar=se.camera.far,n.pointShadow[m]=$,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=D.shadow.matrix,E++}n.point[m]=X,m++}else if(D.isHemisphereLight){let X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(P),X.groundColor.copy(D.groundColor).multiplyScalar(P),n.hemi[p]=X,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==m||C.spotLength!==x||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==E||C.numSpotShadows!==v||C.numSpotMaps!==S||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+S-R,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,C.directionalLength=f,C.pointLength=m,C.spotLength=x,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=E,C.numSpotShadows=v,C.numSpotMaps=S,C.numLightProbes=A,n.version=Qy++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0,g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){let E=c[p];if(E.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),u++}else if(E.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(E.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),d++}else if(E.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function dp(s){let e=new tb(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function nb(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new dp(s),e.set(i,[a])):r>=o.length?(a=new dp(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var ib=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sb=`uniform sampler2D shadow_pass;
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
}`;function rb(s,e,t){let n=new kr,i=new Pe,r=new Pe,o=new Ot,a=new bl({depthPacking:wf}),l=new _l,c={},h=t.maxTextureSize,u={[ji]:Fn,[Fn]:ji,[Cn]:Cn},d=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:ib,fragmentShader:sb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Qt;m.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ye(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qh;let p=this.type;this.render=function(R,A,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let b=s.getRenderTarget(),_=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),k=s.state;k.setBlending(is),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let P=p!==Ui&&this.type===Ui,V=p===Ui&&this.type!==Ui;for(let W=0,X=R.length;W<X;W++){let se=R[W],$=se.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);let oe=$.getFrameExtents();if(i.multiply(oe),r.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/oe.x),i.x=r.x*oe.x,$.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/oe.y),i.y=r.y*oe.y,$.mapSize.y=r.y)),$.map===null||P===!0||V===!0){let _e=this.type!==Ui?{minFilter:Kn,magFilter:Kn}:{};$.map!==null&&$.map.dispose(),$.map=new Pi(i.x,i.y,_e),$.map.texture.name=se.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();let he=$.getViewportCount();for(let _e=0;_e<he;_e++){let Be=$.getViewport(_e);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),k.viewport(o),$.updateMatrices(se,_e),n=$.getFrustum(),v(A,C,$.camera,se,this.type)}$.isPointLightShadow!==!0&&this.type===Ui&&y($,C),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(b,_,D)};function y(R,A){let C=e.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Pi(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,C,d,x,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,C,f,x,null)}function E(R,A,C,b){let _=null,D=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)_=D;else if(_=C.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let k=_.uuid,P=A.uuid,V=c[k];V===void 0&&(V={},c[k]=V);let W=V[P];W===void 0&&(W=_.clone(),V[P]=W,A.addEventListener("dispose",S)),_=W}if(_.visible=A.visible,_.wireframe=A.wireframe,b===Ui?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:u[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let k=s.properties.get(_);k.light=C}return _}function v(R,A,C,b,_){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&_===Ui)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);let P=e.update(R),V=R.material;if(Array.isArray(V)){let W=P.groups;for(let X=0,se=W.length;X<se;X++){let $=W[X],oe=V[$.materialIndex];if(oe&&oe.visible){let he=E(R,oe,b,_);R.onBeforeShadow(s,R,A,C,P,he,$),s.renderBufferDirect(C,null,P,he,R,$),R.onAfterShadow(s,R,A,C,P,he,$)}}}else if(V.visible){let W=E(R,V,b,_);R.onBeforeShadow(s,R,A,C,P,W,null),s.renderBufferDirect(C,null,P,W,R,null),R.onAfterShadow(s,R,A,C,P,W,null)}}let k=R.children;for(let P=0,V=k.length;P<V;P++)v(k[P],A,C,b,_)}function S(R){R.target.removeEventListener("dispose",S);for(let C in c){let b=c[C],_=R.target.uuid;_ in b&&(b[_].dispose(),delete b[_])}}}var ob={[Dl]:Fl,[Ul]:Vr,[zl]:Bl,[Bs]:Nl,[Fl]:Dl,[Vr]:Ul,[Bl]:zl,[Nl]:Bs};function ab(s,e){function t(){let G=!1,q=new Ot,ye=null,Ce=new Ot(0,0,0,0);return{setMask:function(fe){ye!==fe&&!G&&(s.colorMask(fe,fe,fe,fe),ye=fe)},setLocked:function(fe){G=fe},setClear:function(fe,re,Oe,Qe,St){St===!0&&(fe*=Qe,re*=Qe,Oe*=Qe),q.set(fe,re,Oe,Qe),Ce.equals(q)===!1&&(s.clearColor(fe,re,Oe,Qe),Ce.copy(q))},reset:function(){G=!1,ye=null,Ce.set(-1,0,0,0)}}}function n(){let G=!1,q=!1,ye=null,Ce=null,fe=null;return{setReversed:function(re){if(q!==re){let Oe=e.get("EXT_clip_control");re?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),q=re;let Qe=fe;fe=null,this.setClear(Qe)}},getReversed:function(){return q},setTest:function(re){re?Q(s.DEPTH_TEST):xe(s.DEPTH_TEST)},setMask:function(re){ye!==re&&!G&&(s.depthMask(re),ye=re)},setFunc:function(re){if(q&&(re=ob[re]),Ce!==re){switch(re){case Dl:s.depthFunc(s.NEVER);break;case Fl:s.depthFunc(s.ALWAYS);break;case Ul:s.depthFunc(s.LESS);break;case Bs:s.depthFunc(s.LEQUAL);break;case zl:s.depthFunc(s.EQUAL);break;case Nl:s.depthFunc(s.GEQUAL);break;case Vr:s.depthFunc(s.GREATER);break;case Bl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ce=re}},setLocked:function(re){G=re},setClear:function(re){fe!==re&&(q&&(re=1-re),s.clearDepth(re),fe=re)},reset:function(){G=!1,ye=null,Ce=null,fe=null,q=!1}}}function i(){let G=!1,q=null,ye=null,Ce=null,fe=null,re=null,Oe=null,Qe=null,St=null;return{setTest:function(At){G||(At?Q(s.STENCIL_TEST):xe(s.STENCIL_TEST))},setMask:function(At){q!==At&&!G&&(s.stencilMask(At),q=At)},setFunc:function(At,In,Un){(ye!==At||Ce!==In||fe!==Un)&&(s.stencilFunc(At,In,Un),ye=At,Ce=In,fe=Un)},setOp:function(At,In,Un){(re!==At||Oe!==In||Qe!==Un)&&(s.stencilOp(At,In,Un),re=At,Oe=In,Qe=Un)},setLocked:function(At){G=At},setClear:function(At){St!==At&&(s.clearStencil(At),St=At)},reset:function(){G=!1,q=null,ye=null,Ce=null,fe=null,re=null,Oe=null,Qe=null,St=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,y=null,E=null,v=null,S=null,R=null,A=new at(0,0,0),C=0,b=!1,_=null,D=null,k=null,P=null,V=null,W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,se=0,$=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec($)[1]),X=se>=1):$.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=se>=2);let oe=null,he={},_e=s.getParameter(s.SCISSOR_BOX),Be=s.getParameter(s.VIEWPORT),nt=new Ot().fromArray(_e),Fe=new Ot().fromArray(Be);function Je(G,q,ye,Ce){let fe=new Uint8Array(4),re=s.createTexture();s.bindTexture(G,re),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Oe=0;Oe<ye;Oe++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(q,0,s.RGBA,1,1,Ce,0,s.RGBA,s.UNSIGNED_BYTE,fe):s.texImage2D(q+Oe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,fe);return re}let te={};te[s.TEXTURE_2D]=Je(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=Je(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=Je(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=Je(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(s.DEPTH_TEST),o.setFunc(Bs),Ge(!1),De(Xh),Q(s.CULL_FACE),vt(is);function Q(G){h[G]!==!0&&(s.enable(G),h[G]=!0)}function xe(G){h[G]!==!1&&(s.disable(G),h[G]=!1)}function we(G,q){return u[G]!==q?(s.bindFramebuffer(G,q),u[G]=q,G===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=q),G===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=q),!0):!1}function de(G,q){let ye=f,Ce=!1;if(G){ye=d.get(q),ye===void 0&&(ye=[],d.set(q,ye));let fe=G.textures;if(ye.length!==fe.length||ye[0]!==s.COLOR_ATTACHMENT0){for(let re=0,Oe=fe.length;re<Oe;re++)ye[re]=s.COLOR_ATTACHMENT0+re;ye.length=fe.length,Ce=!0}}else ye[0]!==s.BACK&&(ye[0]=s.BACK,Ce=!0);Ce&&s.drawBuffers(ye)}function be(G){return m!==G?(s.useProgram(G),m=G,!0):!1}let qe={[Es]:s.FUNC_ADD,[Jd]:s.FUNC_SUBTRACT,[jd]:s.FUNC_REVERSE_SUBTRACT};qe[Qd]=s.MIN,qe[ef]=s.MAX;let B={[tf]:s.ZERO,[nf]:s.ONE,[sf]:s.SRC_COLOR,[nl]:s.SRC_ALPHA,[hf]:s.SRC_ALPHA_SATURATE,[lf]:s.DST_COLOR,[of]:s.DST_ALPHA,[rf]:s.ONE_MINUS_SRC_COLOR,[il]:s.ONE_MINUS_SRC_ALPHA,[cf]:s.ONE_MINUS_DST_COLOR,[af]:s.ONE_MINUS_DST_ALPHA,[uf]:s.CONSTANT_COLOR,[df]:s.ONE_MINUS_CONSTANT_COLOR,[ff]:s.CONSTANT_ALPHA,[pf]:s.ONE_MINUS_CONSTANT_ALPHA};function vt(G,q,ye,Ce,fe,re,Oe,Qe,St,At){if(G===is){x===!0&&(xe(s.BLEND),x=!1);return}if(x===!1&&(Q(s.BLEND),x=!0),G!==Zd){if(G!==g||At!==b){if((p!==Es||v!==Es)&&(s.blendEquation(s.FUNC_ADD),p=Es,v=Es),At)switch(G){case Qi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mi:s.blendFunc(s.ONE,s.ONE);break;case Yh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $h:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Qi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Yh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $h:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}y=null,E=null,S=null,R=null,A.set(0,0,0),C=0,g=G,b=At}return}fe=fe||q,re=re||ye,Oe=Oe||Ce,(q!==p||fe!==v)&&(s.blendEquationSeparate(qe[q],qe[fe]),p=q,v=fe),(ye!==y||Ce!==E||re!==S||Oe!==R)&&(s.blendFuncSeparate(B[ye],B[Ce],B[re],B[Oe]),y=ye,E=Ce,S=re,R=Oe),(Qe.equals(A)===!1||St!==C)&&(s.blendColor(Qe.r,Qe.g,Qe.b,St),A.copy(Qe),C=St),g=G,b=!1}function $e(G,q){G.side===Cn?xe(s.CULL_FACE):Q(s.CULL_FACE);let ye=G.side===Fn;q&&(ye=!ye),Ge(ye),G.blending===Qi&&G.transparent===!1?vt(is):vt(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);let Ce=G.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ze(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):xe(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(G){_!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),_=G)}function De(G){G!==$d?(Q(s.CULL_FACE),G!==D&&(G===Xh?s.cullFace(s.BACK):G===Kd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xe(s.CULL_FACE),D=G}function We(G){G!==k&&(X&&s.lineWidth(G),k=G)}function ze(G,q,ye){G?(Q(s.POLYGON_OFFSET_FILL),(P!==q||V!==ye)&&(s.polygonOffset(q,ye),P=q,V=ye)):xe(s.POLYGON_OFFSET_FILL)}function tt(G){G?Q(s.SCISSOR_TEST):xe(s.SCISSOR_TEST)}function Tt(G){G===void 0&&(G=s.TEXTURE0+W-1),oe!==G&&(s.activeTexture(G),oe=G)}function Xt(G,q,ye){ye===void 0&&(oe===null?ye=s.TEXTURE0+W-1:ye=oe);let Ce=he[ye];Ce===void 0&&(Ce={type:void 0,texture:void 0},he[ye]=Ce),(Ce.type!==G||Ce.texture!==q)&&(oe!==ye&&(s.activeTexture(ye),oe=ye),s.bindTexture(G,q||te[G]),Ce.type=G,Ce.texture=q)}function z(){let G=he[oe];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function T(){try{s.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function j(){try{s.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function le(){try{s.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ue(){try{s.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ae(){try{s.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ke(){try{s.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{s.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ae(){try{s.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ie(){try{s.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ge(){try{s.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Re(G){nt.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),nt.copy(G))}function et(G){Fe.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),Fe.copy(G))}function Ze(G,q){let ye=c.get(q);ye===void 0&&(ye=new WeakMap,c.set(q,ye));let Ce=ye.get(G);Ce===void 0&&(Ce=s.getUniformBlockIndex(q,G.name),ye.set(G,Ce))}function Te(G,q){let Ce=c.get(q).get(G);l.get(q)!==Ce&&(s.uniformBlockBinding(q,Ce,G.__bindingPointIndex),l.set(q,Ce))}function ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},oe=null,he={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,y=null,E=null,v=null,S=null,R=null,A=new at(0,0,0),C=0,b=!1,_=null,D=null,k=null,P=null,V=null,nt.set(0,0,s.canvas.width,s.canvas.height),Fe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:xe,bindFramebuffer:we,drawBuffers:de,useProgram:be,setBlending:vt,setMaterial:$e,setFlipSided:Ge,setCullFace:De,setLineWidth:We,setPolygonOffset:ze,setScissorTest:tt,activeTexture:Tt,bindTexture:Xt,unbindTexture:z,compressedTexImage2D:T,compressedTexImage3D:j,texImage2D:Ie,texImage3D:ge,updateUBOMapping:Ze,uniformBlockBinding:Te,texStorage2D:me,texStorage3D:Ae,texSubImage2D:le,texSubImage3D:ue,compressedTexSubImage2D:ae,compressedTexSubImage3D:Ke,scissor:Re,viewport:et,reset:ht}}function lb(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(z,T){return f?new OffscreenCanvas(z,T):ko("canvas")}function x(z,T,j){let le=1,ue=Xt(z);if((ue.width>j||ue.height>j)&&(le=j/Math.max(ue.width,ue.height)),le<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){let ae=Math.floor(le*ue.width),Ke=Math.floor(le*ue.height);u===void 0&&(u=m(ae,Ke));let me=T?m(ae,Ke):u;return me.width=ae,me.height=Ke,me.getContext("2d").drawImage(z,0,0,ae,Ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+ae+"x"+Ke+")."),me}else return"data"in z&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),z;return z}function g(z){return z.generateMipmaps}function p(z){s.generateMipmap(z)}function y(z){return z.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?s.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(z,T,j,le,ue=!1){if(z!==null){if(s[z]!==void 0)return s[z];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let ae=T;if(T===s.RED&&(j===s.FLOAT&&(ae=s.R32F),j===s.HALF_FLOAT&&(ae=s.R16F),j===s.UNSIGNED_BYTE&&(ae=s.R8)),T===s.RED_INTEGER&&(j===s.UNSIGNED_BYTE&&(ae=s.R8UI),j===s.UNSIGNED_SHORT&&(ae=s.R16UI),j===s.UNSIGNED_INT&&(ae=s.R32UI),j===s.BYTE&&(ae=s.R8I),j===s.SHORT&&(ae=s.R16I),j===s.INT&&(ae=s.R32I)),T===s.RG&&(j===s.FLOAT&&(ae=s.RG32F),j===s.HALF_FLOAT&&(ae=s.RG16F),j===s.UNSIGNED_BYTE&&(ae=s.RG8)),T===s.RG_INTEGER&&(j===s.UNSIGNED_BYTE&&(ae=s.RG8UI),j===s.UNSIGNED_SHORT&&(ae=s.RG16UI),j===s.UNSIGNED_INT&&(ae=s.RG32UI),j===s.BYTE&&(ae=s.RG8I),j===s.SHORT&&(ae=s.RG16I),j===s.INT&&(ae=s.RG32I)),T===s.RGB_INTEGER&&(j===s.UNSIGNED_BYTE&&(ae=s.RGB8UI),j===s.UNSIGNED_SHORT&&(ae=s.RGB16UI),j===s.UNSIGNED_INT&&(ae=s.RGB32UI),j===s.BYTE&&(ae=s.RGB8I),j===s.SHORT&&(ae=s.RGB16I),j===s.INT&&(ae=s.RGB32I)),T===s.RGBA_INTEGER&&(j===s.UNSIGNED_BYTE&&(ae=s.RGBA8UI),j===s.UNSIGNED_SHORT&&(ae=s.RGBA16UI),j===s.UNSIGNED_INT&&(ae=s.RGBA32UI),j===s.BYTE&&(ae=s.RGBA8I),j===s.SHORT&&(ae=s.RGBA16I),j===s.INT&&(ae=s.RGBA32I)),T===s.RGB&&(j===s.UNSIGNED_INT_5_9_9_9_REV&&(ae=s.RGB9_E5),j===s.UNSIGNED_INT_10F_11F_11F_REV&&(ae=s.R11F_G11F_B10F)),T===s.RGBA){let Ke=ue?Po:Dt.getTransfer(le);j===s.FLOAT&&(ae=s.RGBA32F),j===s.HALF_FLOAT&&(ae=s.RGBA16F),j===s.UNSIGNED_BYTE&&(ae=Ke===Gt?s.SRGB8_ALPHA8:s.RGBA8),j===s.UNSIGNED_SHORT_4_4_4_4&&(ae=s.RGBA4),j===s.UNSIGNED_SHORT_5_5_5_1&&(ae=s.RGB5_A1)}return(ae===s.R16F||ae===s.R32F||ae===s.RG16F||ae===s.RG32F||ae===s.RGBA16F||ae===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function v(z,T){let j;return z?T===null||T===Is||T===Xr?j=s.DEPTH24_STENCIL8:T===wi?j=s.DEPTH32F_STENCIL8:T===Gr&&(j=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Is||T===Xr?j=s.DEPTH_COMPONENT24:T===wi?j=s.DEPTH_COMPONENT32F:T===Gr&&(j=s.DEPTH_COMPONENT16),j}function S(z,T){return g(z)===!0||z.isFramebufferTexture&&z.minFilter!==Kn&&z.minFilter!==yi?Math.log2(Math.max(T.width,T.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?T.mipmaps.length:1}function R(z){let T=z.target;T.removeEventListener("dispose",R),C(T),T.isVideoTexture&&h.delete(T)}function A(z){let T=z.target;T.removeEventListener("dispose",A),_(T)}function C(z){let T=n.get(z);if(T.__webglInit===void 0)return;let j=z.source,le=d.get(j);if(le){let ue=le[T.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&b(z),Object.keys(le).length===0&&d.delete(j)}n.remove(z)}function b(z){let T=n.get(z);s.deleteTexture(T.__webglTexture);let j=z.source,le=d.get(j);delete le[T.__cacheKey],o.memory.textures--}function _(z){let T=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(T.__webglFramebuffer[le]))for(let ue=0;ue<T.__webglFramebuffer[le].length;ue++)s.deleteFramebuffer(T.__webglFramebuffer[le][ue]);else s.deleteFramebuffer(T.__webglFramebuffer[le]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[le])}else{if(Array.isArray(T.__webglFramebuffer))for(let le=0;le<T.__webglFramebuffer.length;le++)s.deleteFramebuffer(T.__webglFramebuffer[le]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let le=0;le<T.__webglColorRenderbuffer.length;le++)T.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[le]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let j=z.textures;for(let le=0,ue=j.length;le<ue;le++){let ae=n.get(j[le]);ae.__webglTexture&&(s.deleteTexture(ae.__webglTexture),o.memory.textures--),n.remove(j[le])}n.remove(z)}let D=0;function k(){D=0}function P(){let z=D;return z>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+i.maxTextures),D+=1,z}function V(z){let T=[];return T.push(z.wrapS),T.push(z.wrapT),T.push(z.wrapR||0),T.push(z.magFilter),T.push(z.minFilter),T.push(z.anisotropy),T.push(z.internalFormat),T.push(z.format),T.push(z.type),T.push(z.generateMipmaps),T.push(z.premultiplyAlpha),T.push(z.flipY),T.push(z.unpackAlignment),T.push(z.colorSpace),T.join()}function W(z,T){let j=n.get(z);if(z.isVideoTexture&&tt(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&j.__version!==z.version){let le=z.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(j,z,T);return}}else z.isExternalTexture&&(j.__webglTexture=z.sourceTexture?z.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,j.__webglTexture,s.TEXTURE0+T)}function X(z,T){let j=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&j.__version!==z.version){te(j,z,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,j.__webglTexture,s.TEXTURE0+T)}function se(z,T){let j=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&j.__version!==z.version){te(j,z,T);return}t.bindTexture(s.TEXTURE_3D,j.__webglTexture,s.TEXTURE0+T)}function $(z,T){let j=n.get(z);if(z.version>0&&j.__version!==z.version){Q(j,z,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture,s.TEXTURE0+T)}let oe={[Os]:s.REPEAT,[Ss]:s.CLAMP_TO_EDGE,[sl]:s.MIRRORED_REPEAT},he={[Kn]:s.NEAREST,[Sf]:s.NEAREST_MIPMAP_NEAREST,[oa]:s.NEAREST_MIPMAP_LINEAR,[yi]:s.LINEAR,[Wl]:s.LINEAR_MIPMAP_NEAREST,[Cs]:s.LINEAR_MIPMAP_LINEAR},_e={[Af]:s.NEVER,[kf]:s.ALWAYS,[Rf]:s.LESS,[su]:s.LEQUAL,[Cf]:s.EQUAL,[Lf]:s.GEQUAL,[If]:s.GREATER,[Pf]:s.NOTEQUAL};function Be(z,T){if(T.type===wi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===yi||T.magFilter===Wl||T.magFilter===oa||T.magFilter===Cs||T.minFilter===yi||T.minFilter===Wl||T.minFilter===oa||T.minFilter===Cs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(z,s.TEXTURE_WRAP_S,oe[T.wrapS]),s.texParameteri(z,s.TEXTURE_WRAP_T,oe[T.wrapT]),(z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY)&&s.texParameteri(z,s.TEXTURE_WRAP_R,oe[T.wrapR]),s.texParameteri(z,s.TEXTURE_MAG_FILTER,he[T.magFilter]),s.texParameteri(z,s.TEXTURE_MIN_FILTER,he[T.minFilter]),T.compareFunction&&(s.texParameteri(z,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(z,s.TEXTURE_COMPARE_FUNC,_e[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Kn||T.minFilter!==oa&&T.minFilter!==Cs||T.type===wi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let j=e.get("EXT_texture_filter_anisotropic");s.texParameterf(z,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function nt(z,T){let j=!1;z.__webglInit===void 0&&(z.__webglInit=!0,T.addEventListener("dispose",R));let le=T.source,ue=d.get(le);ue===void 0&&(ue={},d.set(le,ue));let ae=V(T);if(ae!==z.__cacheKey){ue[ae]===void 0&&(ue[ae]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,j=!0),ue[ae].usedTimes++;let Ke=ue[z.__cacheKey];Ke!==void 0&&(ue[z.__cacheKey].usedTimes--,Ke.usedTimes===0&&b(T)),z.__cacheKey=ae,z.__webglTexture=ue[ae].texture}return j}function Fe(z,T,j){return Math.floor(Math.floor(z/j)/T)}function Je(z,T,j,le){let ae=z.updateRanges;if(ae.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,T.width,T.height,j,le,T.data);else{ae.sort((ge,Re)=>ge.start-Re.start);let Ke=0;for(let ge=1;ge<ae.length;ge++){let Re=ae[Ke],et=ae[ge],Ze=Re.start+Re.count,Te=Fe(et.start,T.width,4),ht=Fe(Re.start,T.width,4);et.start<=Ze+1&&Te===ht&&Fe(et.start+et.count-1,T.width,4)===Te?Re.count=Math.max(Re.count,et.start+et.count-Re.start):(++Ke,ae[Ke]=et)}ae.length=Ke+1;let me=s.getParameter(s.UNPACK_ROW_LENGTH),Ae=s.getParameter(s.UNPACK_SKIP_PIXELS),Ie=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,T.width);for(let ge=0,Re=ae.length;ge<Re;ge++){let et=ae[ge],Ze=Math.floor(et.start/4),Te=Math.ceil(et.count/4),ht=Ze%T.width,G=Math.floor(Ze/T.width),q=Te,ye=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),s.pixelStorei(s.UNPACK_SKIP_ROWS,G),t.texSubImage2D(s.TEXTURE_2D,0,ht,G,q,ye,j,le,T.data)}z.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,me),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ae),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ie)}}function te(z,T,j){let le=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(le=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(le=s.TEXTURE_3D);let ue=nt(z,T),ae=T.source;t.bindTexture(le,z.__webglTexture,s.TEXTURE0+j);let Ke=n.get(ae);if(ae.version!==Ke.__version||ue===!0){t.activeTexture(s.TEXTURE0+j);let me=Dt.getPrimaries(Dt.workingColorSpace),Ae=T.colorSpace===ss?null:Dt.getPrimaries(T.colorSpace),Ie=T.colorSpace===ss||me===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let ge=x(T.image,!1,i.maxTextureSize);ge=Tt(T,ge);let Re=r.convert(T.format,T.colorSpace),et=r.convert(T.type),Ze=E(T.internalFormat,Re,et,T.colorSpace,T.isVideoTexture);Be(le,T);let Te,ht=T.mipmaps,G=T.isVideoTexture!==!0,q=Ke.__version===void 0||ue===!0,ye=ae.dataReady,Ce=S(T,ge);if(T.isDepthTexture)Ze=v(T.format===qr,T.type),q&&(G?t.texStorage2D(s.TEXTURE_2D,1,Ze,ge.width,ge.height):t.texImage2D(s.TEXTURE_2D,0,Ze,ge.width,ge.height,0,Re,et,null));else if(T.isDataTexture)if(ht.length>0){G&&q&&t.texStorage2D(s.TEXTURE_2D,Ce,Ze,ht[0].width,ht[0].height);for(let fe=0,re=ht.length;fe<re;fe++)Te=ht[fe],G?ye&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Re,et,Te.data):t.texImage2D(s.TEXTURE_2D,fe,Ze,Te.width,Te.height,0,Re,et,Te.data);T.generateMipmaps=!1}else G?(q&&t.texStorage2D(s.TEXTURE_2D,Ce,Ze,ge.width,ge.height),ye&&Je(T,ge,Re,et)):t.texImage2D(s.TEXTURE_2D,0,Ze,ge.width,ge.height,0,Re,et,ge.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){G&&q&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Ze,ht[0].width,ht[0].height,ge.depth);for(let fe=0,re=ht.length;fe<re;fe++)if(Te=ht[fe],T.format!==li)if(Re!==null)if(G){if(ye)if(T.layerUpdates.size>0){let Oe=uu(Te.width,Te.height,T.format,T.type);for(let Qe of T.layerUpdates){let St=Te.data.subarray(Qe*Oe/Te.data.BYTES_PER_ELEMENT,(Qe+1)*Oe/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,Qe,Te.width,Te.height,1,Re,St)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Te.width,Te.height,ge.depth,Re,Te.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,fe,Ze,Te.width,Te.height,ge.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?ye&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Te.width,Te.height,ge.depth,Re,et,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,fe,Ze,Te.width,Te.height,ge.depth,0,Re,et,Te.data)}else{G&&q&&t.texStorage2D(s.TEXTURE_2D,Ce,Ze,ht[0].width,ht[0].height);for(let fe=0,re=ht.length;fe<re;fe++)Te=ht[fe],T.format!==li?Re!==null?G?ye&&t.compressedTexSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Re,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,fe,Ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?ye&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Re,et,Te.data):t.texImage2D(s.TEXTURE_2D,fe,Ze,Te.width,Te.height,0,Re,et,Te.data)}else if(T.isDataArrayTexture)if(G){if(q&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Ze,ge.width,ge.height,ge.depth),ye)if(T.layerUpdates.size>0){let fe=uu(ge.width,ge.height,T.format,T.type);for(let re of T.layerUpdates){let Oe=ge.data.subarray(re*fe/ge.data.BYTES_PER_ELEMENT,(re+1)*fe/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,re,ge.width,ge.height,1,Re,et,Oe)}T.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Re,et,ge.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ze,ge.width,ge.height,ge.depth,0,Re,et,ge.data);else if(T.isData3DTexture)G?(q&&t.texStorage3D(s.TEXTURE_3D,Ce,Ze,ge.width,ge.height,ge.depth),ye&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Re,et,ge.data)):t.texImage3D(s.TEXTURE_3D,0,Ze,ge.width,ge.height,ge.depth,0,Re,et,ge.data);else if(T.isFramebufferTexture){if(q)if(G)t.texStorage2D(s.TEXTURE_2D,Ce,Ze,ge.width,ge.height);else{let fe=ge.width,re=ge.height;for(let Oe=0;Oe<Ce;Oe++)t.texImage2D(s.TEXTURE_2D,Oe,Ze,fe,re,0,Re,et,null),fe>>=1,re>>=1}}else if(ht.length>0){if(G&&q){let fe=Xt(ht[0]);t.texStorage2D(s.TEXTURE_2D,Ce,Ze,fe.width,fe.height)}for(let fe=0,re=ht.length;fe<re;fe++)Te=ht[fe],G?ye&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Re,et,Te):t.texImage2D(s.TEXTURE_2D,fe,Ze,Re,et,Te);T.generateMipmaps=!1}else if(G){if(q){let fe=Xt(ge);t.texStorage2D(s.TEXTURE_2D,Ce,Ze,fe.width,fe.height)}ye&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Re,et,ge)}else t.texImage2D(s.TEXTURE_2D,0,Ze,Re,et,ge);g(T)&&p(le),Ke.__version=ae.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function Q(z,T,j){if(T.image.length!==6)return;let le=nt(z,T),ue=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+j);let ae=n.get(ue);if(ue.version!==ae.__version||le===!0){t.activeTexture(s.TEXTURE0+j);let Ke=Dt.getPrimaries(Dt.workingColorSpace),me=T.colorSpace===ss?null:Dt.getPrimaries(T.colorSpace),Ae=T.colorSpace===ss||Ke===me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Ie=T.isCompressedTexture||T.image[0].isCompressedTexture,ge=T.image[0]&&T.image[0].isDataTexture,Re=[];for(let re=0;re<6;re++)!Ie&&!ge?Re[re]=x(T.image[re],!0,i.maxCubemapSize):Re[re]=ge?T.image[re].image:T.image[re],Re[re]=Tt(T,Re[re]);let et=Re[0],Ze=r.convert(T.format,T.colorSpace),Te=r.convert(T.type),ht=E(T.internalFormat,Ze,Te,T.colorSpace),G=T.isVideoTexture!==!0,q=ae.__version===void 0||le===!0,ye=ue.dataReady,Ce=S(T,et);Be(s.TEXTURE_CUBE_MAP,T);let fe;if(Ie){G&&q&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,ht,et.width,et.height);for(let re=0;re<6;re++){fe=Re[re].mipmaps;for(let Oe=0;Oe<fe.length;Oe++){let Qe=fe[Oe];T.format!==li?Ze!==null?G?ye&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,Qe.width,Qe.height,Ze,Qe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,ht,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ye&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,Qe.width,Qe.height,Ze,Te,Qe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,ht,Qe.width,Qe.height,0,Ze,Te,Qe.data)}}}else{if(fe=T.mipmaps,G&&q){fe.length>0&&Ce++;let re=Xt(Re[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,ht,re.width,re.height)}for(let re=0;re<6;re++)if(ge){G?ye&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Re[re].width,Re[re].height,Ze,Te,Re[re].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ht,Re[re].width,Re[re].height,0,Ze,Te,Re[re].data);for(let Oe=0;Oe<fe.length;Oe++){let St=fe[Oe].image[re].image;G?ye&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,St.width,St.height,Ze,Te,St.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,ht,St.width,St.height,0,Ze,Te,St.data)}}else{G?ye&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ze,Te,Re[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ht,Ze,Te,Re[re]);for(let Oe=0;Oe<fe.length;Oe++){let Qe=fe[Oe];G?ye&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,Ze,Te,Qe.image[re]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,ht,Ze,Te,Qe.image[re])}}}g(T)&&p(s.TEXTURE_CUBE_MAP),ae.__version=ue.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function xe(z,T,j,le,ue,ae){let Ke=r.convert(j.format,j.colorSpace),me=r.convert(j.type),Ae=E(j.internalFormat,Ke,me,j.colorSpace),Ie=n.get(T),ge=n.get(j);if(ge.__renderTarget=T,!Ie.__hasExternalTextures){let Re=Math.max(1,T.width>>ae),et=Math.max(1,T.height>>ae);ue===s.TEXTURE_3D||ue===s.TEXTURE_2D_ARRAY?t.texImage3D(ue,ae,Ae,Re,et,T.depth,0,Ke,me,null):t.texImage2D(ue,ae,Ae,Re,et,0,Ke,me,null)}t.bindFramebuffer(s.FRAMEBUFFER,z),ze(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ue,ge.__webglTexture,0,We(T)):(ue===s.TEXTURE_2D||ue>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,le,ue,ge.__webglTexture,ae),t.bindFramebuffer(s.FRAMEBUFFER,null)}function we(z,T,j){if(s.bindRenderbuffer(s.RENDERBUFFER,z),T.depthBuffer){let le=T.depthTexture,ue=le&&le.isDepthTexture?le.type:null,ae=v(T.stencilBuffer,ue),Ke=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,me=We(T);ze(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,me,ae,T.width,T.height):j?s.renderbufferStorageMultisample(s.RENDERBUFFER,me,ae,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ae,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ke,s.RENDERBUFFER,z)}else{let le=T.textures;for(let ue=0;ue<le.length;ue++){let ae=le[ue],Ke=r.convert(ae.format,ae.colorSpace),me=r.convert(ae.type),Ae=E(ae.internalFormat,Ke,me,ae.colorSpace),Ie=We(T);j&&ze(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,Ae,T.width,T.height):ze(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ie,Ae,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function de(z,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,z),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let le=n.get(T.depthTexture);le.__renderTarget=T,(!le.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),W(T.depthTexture,0);let ue=le.__webglTexture,ae=We(T);if(T.depthTexture.format===Tr)ze(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ue,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ue,0);else if(T.depthTexture.format===qr)ze(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ue,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ue,0);else throw new Error("Unknown depthTexture format")}function be(z){let T=n.get(z),j=z.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==z.depthTexture){let le=z.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),le){let ue=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,le.removeEventListener("dispose",ue)};le.addEventListener("dispose",ue),T.__depthDisposeCallback=ue}T.__boundDepthTexture=le}if(z.depthTexture&&!T.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");let le=z.texture.mipmaps;le&&le.length>0?de(T.__webglFramebuffer[0],z):de(T.__webglFramebuffer,z)}else if(j){T.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[le]),T.__webglDepthbuffer[le]===void 0)T.__webglDepthbuffer[le]=s.createRenderbuffer(),we(T.__webglDepthbuffer[le],z,!1);else{let ue=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=T.__webglDepthbuffer[le];s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,ue,s.RENDERBUFFER,ae)}}else{let le=z.texture.mipmaps;if(le&&le.length>0?t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),we(T.__webglDepthbuffer,z,!1);else{let ue=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ae),s.framebufferRenderbuffer(s.FRAMEBUFFER,ue,s.RENDERBUFFER,ae)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function qe(z,T,j){let le=n.get(z);T!==void 0&&xe(le.__webglFramebuffer,z,z.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),j!==void 0&&be(z)}function B(z){let T=z.texture,j=n.get(z),le=n.get(T);z.addEventListener("dispose",A);let ue=z.textures,ae=z.isWebGLCubeRenderTarget===!0,Ke=ue.length>1;if(Ke||(le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture()),le.__version=T.version,o.memory.textures++),ae){j.__webglFramebuffer=[];for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer[me]=[];for(let Ae=0;Ae<T.mipmaps.length;Ae++)j.__webglFramebuffer[me][Ae]=s.createFramebuffer()}else j.__webglFramebuffer[me]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){j.__webglFramebuffer=[];for(let me=0;me<T.mipmaps.length;me++)j.__webglFramebuffer[me]=s.createFramebuffer()}else j.__webglFramebuffer=s.createFramebuffer();if(Ke)for(let me=0,Ae=ue.length;me<Ae;me++){let Ie=n.get(ue[me]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=s.createTexture(),o.memory.textures++)}if(z.samples>0&&ze(z)===!1){j.__webglMultisampledFramebuffer=s.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let me=0;me<ue.length;me++){let Ae=ue[me];j.__webglColorRenderbuffer[me]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,j.__webglColorRenderbuffer[me]);let Ie=r.convert(Ae.format,Ae.colorSpace),ge=r.convert(Ae.type),Re=E(Ae.internalFormat,Ie,ge,Ae.colorSpace,z.isXRRenderTarget===!0),et=We(z);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,Re,z.width,z.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,j.__webglColorRenderbuffer[me])}s.bindRenderbuffer(s.RENDERBUFFER,null),z.depthBuffer&&(j.__webglDepthRenderbuffer=s.createRenderbuffer(),we(j.__webglDepthRenderbuffer,z,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ae){t.bindTexture(s.TEXTURE_CUBE_MAP,le.__webglTexture),Be(s.TEXTURE_CUBE_MAP,T);for(let me=0;me<6;me++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ae=0;Ae<T.mipmaps.length;Ae++)xe(j.__webglFramebuffer[me][Ae],z,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ae);else xe(j.__webglFramebuffer[me],z,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(T)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ke){for(let me=0,Ae=ue.length;me<Ae;me++){let Ie=ue[me],ge=n.get(Ie),Re=s.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Re=z.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Re,ge.__webglTexture),Be(Re,Ie),xe(j.__webglFramebuffer,z,Ie,s.COLOR_ATTACHMENT0+me,Re,0),g(Ie)&&p(Re)}t.unbindTexture()}else{let me=s.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(me=z.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(me,le.__webglTexture),Be(me,T),T.mipmaps&&T.mipmaps.length>0)for(let Ae=0;Ae<T.mipmaps.length;Ae++)xe(j.__webglFramebuffer[Ae],z,T,s.COLOR_ATTACHMENT0,me,Ae);else xe(j.__webglFramebuffer,z,T,s.COLOR_ATTACHMENT0,me,0);g(T)&&p(me),t.unbindTexture()}z.depthBuffer&&be(z)}function vt(z){let T=z.textures;for(let j=0,le=T.length;j<le;j++){let ue=T[j];if(g(ue)){let ae=y(z),Ke=n.get(ue).__webglTexture;t.bindTexture(ae,Ke),p(ae),t.unbindTexture()}}}let $e=[],Ge=[];function De(z){if(z.samples>0){if(ze(z)===!1){let T=z.textures,j=z.width,le=z.height,ue=s.COLOR_BUFFER_BIT,ae=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ke=n.get(z),me=T.length>1;if(me)for(let Ie=0;Ie<T.length;Ie++)t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer);let Ae=z.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer);for(let Ie=0;Ie<T.length;Ie++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(ue|=s.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(ue|=s.STENCIL_BUFFER_BIT)),me){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[Ie]);let ge=n.get(T[Ie]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ge,0)}s.blitFramebuffer(0,0,j,le,0,0,j,le,ue,s.NEAREST),l===!0&&($e.length=0,Ge.length=0,$e.push(s.COLOR_ATTACHMENT0+Ie),z.depthBuffer&&z.resolveDepthBuffer===!1&&($e.push(ae),Ge.push(ae),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ge)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,$e))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),me)for(let Ie=0;Ie<T.length;Ie++){t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[Ie]);let ge=n.get(T[Ie]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,ge,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&l){let T=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function We(z){return Math.min(i.maxSamples,z.samples)}function ze(z){let T=n.get(z);return z.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function tt(z){let T=o.render.frame;h.get(z)!==T&&(h.set(z,T),z.update())}function Tt(z,T){let j=z.colorSpace,le=z.format,ue=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||j!==Hs&&j!==ss&&(Dt.getTransfer(j)===Gt?(le!==li||ue!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),T}function Xt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(c.width=z.naturalWidth||z.width,c.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(c.width=z.displayWidth,c.height=z.displayHeight):(c.width=z.width,c.height=z.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=k,this.setTexture2D=W,this.setTexture2DArray=X,this.setTexture3D=se,this.setTextureCube=$,this.rebindTextures=qe,this.setupRenderTarget=B,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ze}function cb(s,e){function t(n,i=ss){let r,o=Dt.getTransfer(i);if(n===Ei)return s.UNSIGNED_BYTE;if(n===ql)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===jh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Qh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Zh)return s.BYTE;if(n===Jh)return s.SHORT;if(n===Gr)return s.UNSIGNED_SHORT;if(n===Xl)return s.INT;if(n===Is)return s.UNSIGNED_INT;if(n===wi)return s.FLOAT;if(n===Wr)return s.HALF_FLOAT;if(n===eu)return s.ALPHA;if(n===tu)return s.RGB;if(n===li)return s.RGBA;if(n===Tr)return s.DEPTH_COMPONENT;if(n===qr)return s.DEPTH_STENCIL;if(n===$l)return s.RED;if(n===Kl)return s.RED_INTEGER;if(n===nu)return s.RG;if(n===Zl)return s.RG_INTEGER;if(n===Jl)return s.RGBA_INTEGER;if(n===aa||n===la||n===ca||n===ha)if(o===Gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jl||n===Ql||n===ec||n===tc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ql)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nc||n===ic||n===sc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nc||n===ic)return o===Gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rc||n===oc||n===ac||n===lc||n===cc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===vc||n===xc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===rc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ac)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xc)return o===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yc||n===bc||n===_c)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yc)return o===Gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mc||n===Sc||n===Ec||n===wc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Mc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ec)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var hb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ub=`
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

}`,Eu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Go(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gn({vertexShader:hb,fragmentShader:ub,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Hn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wu=class extends es{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,x=typeof XRWebGLBinding<"u",g=new Eu,p={},y=t.getContextAttributes(),E=null,v=null,S=[],R=[],A=new Pe,C=null,b=new Tn;b.viewport=new Ot;let _=new Tn;_.viewport=new Ot;let D=[b,_],k=new Ll,P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Q=S[te];return Q===void 0&&(Q=new Pr,S[te]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(te){let Q=S[te];return Q===void 0&&(Q=new Pr,S[te]=Q),Q.getGripSpace()},this.getHand=function(te){let Q=S[te];return Q===void 0&&(Q=new Pr,S[te]=Q),Q.getHandSpace()};function W(te){let Q=R.indexOf(te.inputSource);if(Q===-1)return;let xe=S[Q];xe!==void 0&&(xe.update(te.inputSource,te.frame,c||o),xe.dispatchEvent({type:te.type,data:te.inputSource}))}function X(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",se);for(let te=0;te<S.length;te++){let Q=R[te];Q!==null&&(R[te]=null,S[te].disconnect(Q))}P=null,V=null,g.reset();for(let te in p)delete p[te];e.setRenderTarget(E),f=null,d=null,u=null,i=null,v=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(E=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",X),i.addEventListener("inputsourceschange",se),y.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,we=null,de=null;y.depth&&(de=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=y.stencil?qr:Tr,we=y.stencil?Xr:Is);let be={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(be),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Pi(d.textureWidth,d.textureHeight,{format:li,type:Ei,depthTexture:new Vo(d.textureWidth,d.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let xe={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Pi(f.framebufferWidth,f.framebufferHeight,{format:li,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Je.setContext(i),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function se(te){for(let Q=0;Q<te.removed.length;Q++){let xe=te.removed[Q],we=R.indexOf(xe);we>=0&&(R[we]=null,S[we].disconnect(xe))}for(let Q=0;Q<te.added.length;Q++){let xe=te.added[Q],we=R.indexOf(xe);if(we===-1){for(let be=0;be<S.length;be++)if(be>=R.length){R.push(xe),we=be;break}else if(R[be]===null){R[be]=xe,we=be;break}if(we===-1)break}let de=S[we];de&&de.connect(xe)}}let $=new O,oe=new O;function he(te,Q,xe){$.setFromMatrixPosition(Q.matrixWorld),oe.setFromMatrixPosition(xe.matrixWorld);let we=$.distanceTo(oe),de=Q.projectionMatrix.elements,be=xe.projectionMatrix.elements,qe=de[14]/(de[10]-1),B=de[14]/(de[10]+1),vt=(de[9]+1)/de[5],$e=(de[9]-1)/de[5],Ge=(de[8]-1)/de[0],De=(be[8]+1)/be[0],We=qe*Ge,ze=qe*De,tt=we/(-Ge+De),Tt=tt*-Ge;if(Q.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Tt),te.translateZ(tt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),de[10]===-1)te.projectionMatrix.copy(Q.projectionMatrix),te.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let Xt=qe+tt,z=B+tt,T=We-Tt,j=ze+(we-Tt),le=vt*B/z*Xt,ue=$e*B/z*Xt;te.projectionMatrix.makePerspective(T,j,le,ue,Xt,z),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function _e(te,Q){Q===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Q.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let Q=te.near,xe=te.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),k.near=_.near=b.near=Q,k.far=_.far=b.far=xe,(P!==k.near||V!==k.far)&&(i.updateRenderState({depthNear:k.near,depthFar:k.far}),P=k.near,V=k.far),k.layers.mask=te.layers.mask|6,b.layers.mask=k.layers.mask&3,_.layers.mask=k.layers.mask&5;let we=te.parent,de=k.cameras;_e(k,we);for(let be=0;be<de.length;be++)_e(de[be],we);de.length===2?he(k,b,_):k.projectionMatrix.copy(b.projectionMatrix),Be(te,k,we)};function Be(te,Q,xe){xe===null?te.matrix.copy(Q.matrixWorld):(te.matrix.copy(xe.matrixWorld),te.matrix.invert(),te.matrix.multiply(Q.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Q.projectionMatrix),te.projectionMatrixInverse.copy(Q.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=al*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(te){return p[te]};let nt=null;function Fe(te,Q){if(h=Q.getViewerPose(c||o),m=Q,h!==null){let xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let we=!1;xe.length!==k.cameras.length&&(k.cameras.length=0,we=!0);for(let B=0;B<xe.length;B++){let vt=xe[B],$e=null;if(f!==null)$e=f.getViewport(vt);else{let De=u.getViewSubImage(d,vt);$e=De.viewport,B===0&&(e.setRenderTargetTextures(v,De.colorTexture,De.depthStencilTexture),e.setRenderTarget(v))}let Ge=D[B];Ge===void 0&&(Ge=new Tn,Ge.layers.enable(B),Ge.viewport=new Ot,D[B]=Ge),Ge.matrix.fromArray(vt.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(vt.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set($e.x,$e.y,$e.width,$e.height),B===0&&(k.matrix.copy(Ge.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),we===!0&&k.cameras.push(Ge)}let de=i.enabledFeatures;if(de&&de.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let B=u.getDepthInformation(xe[0]);B&&B.isValid&&B.texture&&g.init(B,i.renderState)}if(de&&de.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let B=0;B<xe.length;B++){let vt=xe[B].camera;if(vt){let $e=p[vt];$e||($e=new Go,p[vt]=$e);let Ge=u.getCameraImage(vt);$e.sourceTexture=Ge}}}}for(let xe=0;xe<S.length;xe++){let we=R[xe],de=S[xe];we!==null&&de!==void 0&&de.update(we,Q,c||o)}nt&&nt(te,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),m=null}let Je=new fp;Je.setAnimationLoop(Fe),this.setAnimationLoop=function(te){nt=te},this.dispose=function(){}}},$s=new Jn,db=new Et;function fb(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,au(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,E,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,E):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Fn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Fn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let y=e.get(p),E=y.envMap,v=y.envMapRotation;E&&(g.envMap.value=E,$s.copy(v),$s.x*=-1,$s.y*=-1,$s.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),g.envMapRotation.value.setFromMatrix4(db.makeRotationFromEuler($s)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function pb(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){let v=E.program;n.uniformBlockBinding(y,v)}function c(y,E){let v=i[y.id];v===void 0&&(m(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",g));let S=E.program;n.updateUBOMapping(y,S);let R=e.render.frame;r[y.id]!==R&&(d(y),r[y.id]=R)}function h(y){let E=u();y.__bindingPointIndex=E;let v=s.createBuffer(),S=y.__size,R=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,S,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let E=i[y.id],v=y.uniforms,S=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let R=0,A=v.length;R<A;R++){let C=Array.isArray(v[R])?v[R]:[v[R]];for(let b=0,_=C.length;b<_;b++){let D=C[b];if(f(D,R,b,S)===!0){let k=D.__offset,P=Array.isArray(D.value)?D.value:[D.value],V=0;for(let W=0;W<P.length;W++){let X=P[W],se=x(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,k+V,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,V),V+=se.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,E,v,S){let R=y.value,A=E+"_"+v;if(S[A]===void 0)return typeof R=="number"||typeof R=="boolean"?S[A]=R:S[A]=R.clone(),!0;{let C=S[A];if(typeof R=="number"||typeof R=="boolean"){if(C!==R)return S[A]=R,!0}else if(C.equals(R)===!1)return C.copy(R),!0}return!1}function m(y){let E=y.uniforms,v=0,S=16;for(let A=0,C=E.length;A<C;A++){let b=Array.isArray(E[A])?E[A]:[E[A]];for(let _=0,D=b.length;_<D;_++){let k=b[_],P=Array.isArray(k.value)?k.value:[k.value];for(let V=0,W=P.length;V<W;V++){let X=P[V],se=x(X),$=v%S,oe=$%se.boundary,he=$+oe;v+=oe,he!==0&&S-he<se.storage&&(v+=S-he),k.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=se.storage}}}let R=v%S;return R>0&&(v+=S-R),y.__size=v,y.__cache={},this}function x(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),E}function g(y){let E=y.target;E.removeEventListener("dispose",g);let v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function p(){for(let y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Lc=class{constructor(e={}){let{canvas:t=Df(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,y=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,S=!1;this._outputColorSpace=Vt;let R=0,A=0,C=null,b=-1,_=null,D=new Ot,k=new Ot,P=null,V=new at(0),W=0,X=t.width,se=t.height,$=1,oe=null,he=null,_e=new Ot(0,0,X,se),Be=new Ot(0,0,X,se),nt=!1,Fe=new kr,Je=!1,te=!1,Q=new Et,xe=new O,we=new Ot,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function qe(){return C===null?$:1}let B=n;function vt(L,J){return t.getContext(L,J)}try{let L={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",fe,!1),B===null){let J="webgl2";if(B=vt(J,L),B===null)throw vt(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let $e,Ge,De,We,ze,tt,Tt,Xt,z,T,j,le,ue,ae,Ke,me,Ae,Ie,ge,Re,et,Ze,Te,ht;function G(){$e=new Lx(B),$e.init(),Ze=new cb(B,$e),Ge=new wx(B,$e,e,Ze),De=new ab(B,$e),Ge.reversedDepthBuffer&&d&&De.buffers.depth.setReversed(!0),We=new Fx(B),ze=new $y,tt=new lb(B,$e,De,ze,Ge,Ze,We),Tt=new Ax(v),Xt=new Px(v),z=new H0(B),Te=new Sx(B,z),T=new kx(B,z,We,Te),j=new zx(B,T,z,We),ge=new Ux(B,Ge,tt),me=new Tx(ze),le=new Yy(v,Tt,Xt,$e,Ge,Te,me),ue=new fb(v,ze),ae=new Zy,Ke=new nb($e),Ie=new Mx(v,Tt,Xt,De,j,f,l),Ae=new rb(v,j,Ge),ht=new pb(B,We,Ge,De),Re=new Ex(B,$e,We),et=new Dx(B,$e,We),We.programs=le.programs,v.capabilities=Ge,v.extensions=$e,v.properties=ze,v.renderLists=ae,v.shadowMap=Ae,v.state=De,v.info=We}G();let q=new wu(v,B);this.xr=q,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let L=$e.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){let L=$e.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(L){L!==void 0&&($=L,this.setSize(X,se,!1))},this.getSize=function(L){return L.set(X,se)},this.setSize=function(L,J,ne=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=L,se=J,t.width=Math.floor(L*$),t.height=Math.floor(J*$),ne===!0&&(t.style.width=L+"px",t.style.height=J+"px"),this.setViewport(0,0,L,J)},this.getDrawingBufferSize=function(L){return L.set(X*$,se*$).floor()},this.setDrawingBufferSize=function(L,J,ne){X=L,se=J,$=ne,t.width=Math.floor(L*ne),t.height=Math.floor(J*ne),this.setViewport(0,0,L,J)},this.getCurrentViewport=function(L){return L.copy(D)},this.getViewport=function(L){return L.copy(_e)},this.setViewport=function(L,J,ne,ie){L.isVector4?_e.set(L.x,L.y,L.z,L.w):_e.set(L,J,ne,ie),De.viewport(D.copy(_e).multiplyScalar($).round())},this.getScissor=function(L){return L.copy(Be)},this.setScissor=function(L,J,ne,ie){L.isVector4?Be.set(L.x,L.y,L.z,L.w):Be.set(L,J,ne,ie),De.scissor(k.copy(Be).multiplyScalar($).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(L){De.setScissorTest(nt=L)},this.setOpaqueSort=function(L){oe=L},this.setTransparentSort=function(L){he=L},this.getClearColor=function(L){return L.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(L=!0,J=!0,ne=!0){let ie=0;if(L){let Z=!1;if(C!==null){let ve=C.texture.format;Z=ve===Jl||ve===Zl||ve===Kl}if(Z){let ve=C.texture.type,Le=ve===Ei||ve===Is||ve===Gr||ve===Xr||ve===ql||ve===Yl,Ne=Ie.getClearColor(),Ve=Ie.getClearAlpha(),st=Ne.r,lt=Ne.g,je=Ne.b;Le?(m[0]=st,m[1]=lt,m[2]=je,m[3]=Ve,B.clearBufferuiv(B.COLOR,0,m)):(x[0]=st,x[1]=lt,x[2]=je,x[3]=Ve,B.clearBufferiv(B.COLOR,0,x))}else ie|=B.COLOR_BUFFER_BIT}J&&(ie|=B.DEPTH_BUFFER_BIT),ne&&(ie|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),Ie.dispose(),ae.dispose(),Ke.dispose(),ze.dispose(),Tt.dispose(),Xt.dispose(),j.dispose(),Te.dispose(),ht.dispose(),le.dispose(),q.dispose(),q.removeEventListener("sessionstart",Un),q.removeEventListener("sessionend",rn),jn.stop()};function ye(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let L=We.autoReset,J=Ae.enabled,ne=Ae.autoUpdate,ie=Ae.needsUpdate,Z=Ae.type;G(),We.autoReset=L,Ae.enabled=J,Ae.autoUpdate=ne,Ae.needsUpdate=ie,Ae.type=Z}function fe(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function re(L){let J=L.target;J.removeEventListener("dispose",re),Oe(J)}function Oe(L){Qe(L),ze.remove(L)}function Qe(L){let J=ze.get(L).programs;J!==void 0&&(J.forEach(function(ne){le.releaseProgram(ne)}),L.isShaderMaterial&&le.releaseShaderCache(L))}this.renderBufferDirect=function(L,J,ne,ie,Z,ve){J===null&&(J=de);let Le=Z.isMesh&&Z.matrixWorld.determinant()<0,Ne=ao(L,J,ne,ie,Z);De.setMaterial(ie,Le);let Ve=ne.index,st=1;if(ie.wireframe===!0){if(Ve=T.getWireframeAttribute(ne),Ve===void 0)return;st=2}let lt=ne.drawRange,je=ne.attributes.position,gt=lt.start*st,Lt=(lt.start+lt.count)*st;ve!==null&&(gt=Math.max(gt,ve.start*st),Lt=Math.min(Lt,(ve.start+ve.count)*st)),Ve!==null?(gt=Math.max(gt,0),Lt=Math.min(Lt,Ve.count)):je!=null&&(gt=Math.max(gt,0),Lt=Math.min(Lt,je.count));let qt=Lt-gt;if(qt<0||qt===1/0)return;Te.setup(Z,ie,Ne,ne,Ve);let Ht,Ut=Re;if(Ve!==null&&(Ht=z.get(Ve),Ut=et,Ut.setIndex(Ht)),Z.isMesh)ie.wireframe===!0?(De.setLineWidth(ie.wireframeLinewidth*qe()),Ut.setMode(B.LINES)):Ut.setMode(B.TRIANGLES);else if(Z.isLine){let it=ie.linewidth;it===void 0&&(it=1),De.setLineWidth(it*qe()),Z.isLineSegments?Ut.setMode(B.LINES):Z.isLineLoop?Ut.setMode(B.LINE_LOOP):Ut.setMode(B.LINE_STRIP)}else Z.isPoints?Ut.setMode(B.POINTS):Z.isSprite&&Ut.setMode(B.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Rr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ut.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))Ut.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let it=Z._multiDrawStarts,zt=Z._multiDrawCounts,It=Z._multiDrawCount,fn=Ve?z.get(Ve).bytesPerElement:1,Qn=ze.get(ie).currentProgram.getUniforms();for(let pn=0;pn<It;pn++)Qn.setValue(B,"_gl_DrawID",pn),Ut.render(it[pn]/fn,zt[pn])}else if(Z.isInstancedMesh)Ut.renderInstances(gt,qt,Z.count);else if(ne.isInstancedBufferGeometry){let it=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,zt=Math.min(ne.instanceCount,it);Ut.renderInstances(gt,qt,zt)}else Ut.render(gt,qt)};function St(L,J,ne){L.transparent===!0&&L.side===Cn&&L.forceSinglePass===!1?(L.side=Fn,L.needsUpdate=!0,ds(L,J,ne),L.side=ji,L.needsUpdate=!0,ds(L,J,ne),L.side=Cn):ds(L,J,ne)}this.compile=function(L,J,ne=null){ne===null&&(ne=L),p=Ke.get(ne),p.init(J),E.push(p),ne.traverseVisible(function(Z){Z.isLight&&Z.layers.test(J.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),L!==ne&&L.traverseVisible(function(Z){Z.isLight&&Z.layers.test(J.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),p.setupLights();let ie=new Set;return L.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let ve=Z.material;if(ve)if(Array.isArray(ve))for(let Le=0;Le<ve.length;Le++){let Ne=ve[Le];St(Ne,ne,Z),ie.add(Ne)}else St(ve,ne,Z),ie.add(ve)}),p=E.pop(),ie},this.compileAsync=function(L,J,ne=null){let ie=this.compile(L,J,ne);return new Promise(Z=>{function ve(){if(ie.forEach(function(Le){ze.get(Le).currentProgram.isReady()&&ie.delete(Le)}),ie.size===0){Z(L);return}setTimeout(ve,10)}$e.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let At=null;function In(L){At&&At(L)}function Un(){jn.stop()}function rn(){jn.start()}let jn=new fp;jn.setAnimationLoop(In),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(L){At=L,q.setAnimationLoop(L),L===null?jn.stop():jn.start()},q.addEventListener("sessionstart",Un),q.addEventListener("sessionend",rn),this.render=function(L,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(J),J=q.getCamera()),L.isScene===!0&&L.onBeforeRender(v,L,J,C),p=Ke.get(L,E.length),p.init(J),E.push(p),Q.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Fe.setFromProjectionMatrix(Q,xi,J.reversedDepth),te=this.localClippingEnabled,Je=me.init(this.clippingPlanes,te),g=ae.get(L,y.length),g.init(),y.push(g),q.enabled===!0&&q.isPresenting===!0){let ve=v.xr.getDepthSensingMesh();ve!==null&&Oi(ve,J,-1/0,v.sortObjects)}Oi(L,J,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(oe,he),be=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,be&&Ie.addToRenderList(g,L),this.info.render.frame++,Je===!0&&me.beginShadows();let ne=p.state.shadowsArray;Ae.render(ne,L,J),Je===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();let ie=g.opaque,Z=g.transmissive;if(p.setupLights(),J.isArrayCamera){let ve=J.cameras;if(Z.length>0)for(let Le=0,Ne=ve.length;Le<Ne;Le++){let Ve=ve[Le];us(ie,Z,L,Ve)}be&&Ie.render(L);for(let Le=0,Ne=ve.length;Le<Ne;Le++){let Ve=ve[Le];Ls(g,L,Ve,Ve.viewport)}}else Z.length>0&&us(ie,Z,L,J),be&&Ie.render(L),Ls(g,L,J);C!==null&&A===0&&(tt.updateMultisampleRenderTarget(C),tt.updateRenderTargetMipmap(C)),L.isScene===!0&&L.onAfterRender(v,L,J),Te.resetDefaultState(),b=-1,_=null,E.pop(),E.length>0?(p=E[E.length-1],Je===!0&&me.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Oi(L,J,ne,ie){if(L.visible===!1)return;if(L.layers.test(J.layers)){if(L.isGroup)ne=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(J);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||Fe.intersectsSprite(L)){ie&&we.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Q);let Le=j.update(L),Ne=L.material;Ne.visible&&g.push(L,Le,Ne,ne,we.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||Fe.intersectsObject(L))){let Le=j.update(L),Ne=L.material;if(ie&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),we.copy(L.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),we.copy(Le.boundingSphere.center)),we.applyMatrix4(L.matrixWorld).applyMatrix4(Q)),Array.isArray(Ne)){let Ve=Le.groups;for(let st=0,lt=Ve.length;st<lt;st++){let je=Ve[st],gt=Ne[je.materialIndex];gt&&gt.visible&&g.push(L,Le,gt,ne,we.z,je)}}else Ne.visible&&g.push(L,Le,Ne,ne,we.z,null)}}let ve=L.children;for(let Le=0,Ne=ve.length;Le<Ne;Le++)Oi(ve[Le],J,ne,ie)}function Ls(L,J,ne,ie){let Z=L.opaque,ve=L.transmissive,Le=L.transparent;p.setupLightsView(ne),Je===!0&&me.setGlobalState(v.clippingPlanes,ne),ie&&De.viewport(D.copy(ie)),Z.length>0&&Hi(Z,J,ne),ve.length>0&&Hi(ve,J,ne),Le.length>0&&Hi(Le,J,ne),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function us(L,J,ne,ie){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ie.id]===void 0&&(p.state.transmissionRenderTarget[ie.id]=new Pi(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?Wr:Ei,minFilter:Cs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace}));let ve=p.state.transmissionRenderTarget[ie.id],Le=ie.viewport||D;ve.setSize(Le.z*v.transmissionResolutionScale,Le.w*v.transmissionResolutionScale);let Ne=v.getRenderTarget(),Ve=v.getActiveCubeFace(),st=v.getActiveMipmapLevel();v.setRenderTarget(ve),v.getClearColor(V),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),be&&Ie.render(ne);let lt=v.toneMapping;v.toneMapping=Si;let je=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),p.setupLightsView(ie),Je===!0&&me.setGlobalState(v.clippingPlanes,ie),Hi(L,ne,ie),tt.updateMultisampleRenderTarget(ve),tt.updateRenderTargetMipmap(ve),$e.has("WEBGL_multisampled_render_to_texture")===!1){let gt=!1;for(let Lt=0,qt=J.length;Lt<qt;Lt++){let Ht=J[Lt],Ut=Ht.object,it=Ht.geometry,zt=Ht.material,It=Ht.group;if(zt.side===Cn&&Ut.layers.test(ie.layers)){let fn=zt.side;zt.side=Fn,zt.needsUpdate=!0,tr(Ut,ne,ie,it,zt,It),zt.side=fn,zt.needsUpdate=!0,gt=!0}}gt===!0&&(tt.updateMultisampleRenderTarget(ve),tt.updateRenderTargetMipmap(ve))}v.setRenderTarget(Ne,Ve,st),v.setClearColor(V,W),je!==void 0&&(ie.viewport=je),v.toneMapping=lt}function Hi(L,J,ne){let ie=J.isScene===!0?J.overrideMaterial:null;for(let Z=0,ve=L.length;Z<ve;Z++){let Le=L[Z],Ne=Le.object,Ve=Le.geometry,st=Le.group,lt=Le.material;lt.allowOverride===!0&&ie!==null&&(lt=ie),Ne.layers.test(ne.layers)&&tr(Ne,J,ne,Ve,lt,st)}}function tr(L,J,ne,ie,Z,ve){L.onBeforeRender(v,J,ne,ie,Z,ve),L.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Z.onBeforeRender(v,J,ne,ie,L,ve),Z.transparent===!0&&Z.side===Cn&&Z.forceSinglePass===!1?(Z.side=Fn,Z.needsUpdate=!0,v.renderBufferDirect(ne,J,ie,Z,L,ve),Z.side=ji,Z.needsUpdate=!0,v.renderBufferDirect(ne,J,ie,Z,L,ve),Z.side=Cn):v.renderBufferDirect(ne,J,ie,Z,L,ve),L.onAfterRender(v,J,ne,ie,Z,ve)}function ds(L,J,ne){J.isScene!==!0&&(J=de);let ie=ze.get(L),Z=p.state.lights,ve=p.state.shadowsArray,Le=Z.state.version,Ne=le.getParameters(L,Z.state,ve,J,ne),Ve=le.getProgramCacheKey(Ne),st=ie.programs;ie.environment=L.isMeshStandardMaterial?J.environment:null,ie.fog=J.fog,ie.envMap=(L.isMeshStandardMaterial?Xt:Tt).get(L.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&L.envMap===null?J.environmentRotation:L.envMapRotation,st===void 0&&(L.addEventListener("dispose",re),st=new Map,ie.programs=st);let lt=st.get(Ve);if(lt!==void 0){if(ie.currentProgram===lt&&ie.lightsStateVersion===Le)return nr(L,Ne),lt}else Ne.uniforms=le.getUniforms(L),L.onBeforeCompile(Ne,v),lt=le.acquireProgram(Ne,Ve),st.set(Ve,lt),ie.uniforms=Ne.uniforms;let je=ie.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(je.clippingPlanes=me.uniform),nr(L,Ne),ie.needsLights=co(L),ie.lightsStateVersion=Le,ie.needsLights&&(je.ambientLightColor.value=Z.state.ambient,je.lightProbe.value=Z.state.probe,je.directionalLights.value=Z.state.directional,je.directionalLightShadows.value=Z.state.directionalShadow,je.spotLights.value=Z.state.spot,je.spotLightShadows.value=Z.state.spotShadow,je.rectAreaLights.value=Z.state.rectArea,je.ltc_1.value=Z.state.rectAreaLTC1,je.ltc_2.value=Z.state.rectAreaLTC2,je.pointLights.value=Z.state.point,je.pointLightShadows.value=Z.state.pointShadow,je.hemisphereLights.value=Z.state.hemi,je.directionalShadowMap.value=Z.state.directionalShadowMap,je.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,je.spotShadowMap.value=Z.state.spotShadowMap,je.spotLightMatrix.value=Z.state.spotLightMatrix,je.spotLightMap.value=Z.state.spotLightMap,je.pointShadowMap.value=Z.state.pointShadowMap,je.pointShadowMatrix.value=Z.state.pointShadowMatrix),ie.currentProgram=lt,ie.uniformsList=null,lt}function un(L){if(L.uniformsList===null){let J=L.currentProgram.getUniforms();L.uniformsList=Kr.seqWithValue(J.seq,L.uniforms)}return L.uniformsList}function nr(L,J){let ne=ze.get(L);ne.outputColorSpace=J.outputColorSpace,ne.batching=J.batching,ne.batchingColor=J.batchingColor,ne.instancing=J.instancing,ne.instancingColor=J.instancingColor,ne.instancingMorph=J.instancingMorph,ne.skinning=J.skinning,ne.morphTargets=J.morphTargets,ne.morphNormals=J.morphNormals,ne.morphColors=J.morphColors,ne.morphTargetsCount=J.morphTargetsCount,ne.numClippingPlanes=J.numClippingPlanes,ne.numIntersection=J.numClipIntersection,ne.vertexAlphas=J.vertexAlphas,ne.vertexTangents=J.vertexTangents,ne.toneMapping=J.toneMapping}function ao(L,J,ne,ie,Z){J.isScene!==!0&&(J=de),tt.resetTextureUnits();let ve=J.fog,Le=ie.isMeshStandardMaterial?J.environment:null,Ne=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Hs,Ve=(ie.isMeshStandardMaterial?Xt:Tt).get(ie.envMap||Le),st=ie.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,lt=!!ne.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),je=!!ne.morphAttributes.position,gt=!!ne.morphAttributes.normal,Lt=!!ne.morphAttributes.color,qt=Si;ie.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(qt=v.toneMapping);let Ht=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Ut=Ht!==void 0?Ht.length:0,it=ze.get(ie),zt=p.state.lights;if(Je===!0&&(te===!0||L!==_)){let w=L===_&&ie.id===b;me.setState(ie,L,w)}let It=!1;ie.version===it.__version?(it.needsLights&&it.lightsStateVersion!==zt.state.version||it.outputColorSpace!==Ne||Z.isBatchedMesh&&it.batching===!1||!Z.isBatchedMesh&&it.batching===!0||Z.isBatchedMesh&&it.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&it.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&it.instancing===!1||!Z.isInstancedMesh&&it.instancing===!0||Z.isSkinnedMesh&&it.skinning===!1||!Z.isSkinnedMesh&&it.skinning===!0||Z.isInstancedMesh&&it.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&it.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&it.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&it.instancingMorph===!1&&Z.morphTexture!==null||it.envMap!==Ve||ie.fog===!0&&it.fog!==ve||it.numClippingPlanes!==void 0&&(it.numClippingPlanes!==me.numPlanes||it.numIntersection!==me.numIntersection)||it.vertexAlphas!==st||it.vertexTangents!==lt||it.morphTargets!==je||it.morphNormals!==gt||it.morphColors!==Lt||it.toneMapping!==qt||it.morphTargetsCount!==Ut)&&(It=!0):(It=!0,it.__version=ie.version);let fn=it.currentProgram;It===!0&&(fn=ds(ie,J,Z));let Qn=!1,pn=!1,ri=!1,Yt=fn.getUniforms(),cn=it.uniforms;if(De.useProgram(fn.program)&&(Qn=!0,pn=!0,ri=!0),ie.id!==b&&(b=ie.id,pn=!0),Qn||_!==L){De.buffers.depth.getReversed()&&L.reversedDepth!==!0&&(L._reversedDepth=!0,L.updateProjectionMatrix()),Yt.setValue(B,"projectionMatrix",L.projectionMatrix),Yt.setValue(B,"viewMatrix",L.matrixWorldInverse);let F=Yt.map.cameraPosition;F!==void 0&&F.setValue(B,xe.setFromMatrixPosition(L.matrixWorld)),Ge.logarithmicDepthBuffer&&Yt.setValue(B,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Yt.setValue(B,"isOrthographic",L.isOrthographicCamera===!0),_!==L&&(_=L,pn=!0,ri=!0)}if(Z.isSkinnedMesh){Yt.setOptional(B,Z,"bindMatrix"),Yt.setOptional(B,Z,"bindMatrixInverse");let w=Z.skeleton;w&&(w.boneTexture===null&&w.computeBoneTexture(),Yt.setValue(B,"boneTexture",w.boneTexture,tt))}Z.isBatchedMesh&&(Yt.setOptional(B,Z,"batchingTexture"),Yt.setValue(B,"batchingTexture",Z._matricesTexture,tt),Yt.setOptional(B,Z,"batchingIdTexture"),Yt.setValue(B,"batchingIdTexture",Z._indirectTexture,tt),Yt.setOptional(B,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Yt.setValue(B,"batchingColorTexture",Z._colorsTexture,tt));let U=ne.morphAttributes;if((U.position!==void 0||U.normal!==void 0||U.color!==void 0)&&ge.update(Z,ne,fn),(pn||it.receiveShadow!==Z.receiveShadow)&&(it.receiveShadow=Z.receiveShadow,Yt.setValue(B,"receiveShadow",Z.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(cn.envMap.value=Ve,cn.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&J.environment!==null&&(cn.envMapIntensity.value=J.environmentIntensity),pn&&(Yt.setValue(B,"toneMappingExposure",v.toneMappingExposure),it.needsLights&&lo(cn,ri),ve&&ie.fog===!0&&ue.refreshFogUniforms(cn,ve),ue.refreshMaterialUniforms(cn,ie,$,se,p.state.transmissionRenderTarget[L.id]),Kr.upload(B,un(it),cn,tt)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Kr.upload(B,un(it),cn,tt),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Yt.setValue(B,"center",Z.center),Yt.setValue(B,"modelViewMatrix",Z.modelViewMatrix),Yt.setValue(B,"normalMatrix",Z.normalMatrix),Yt.setValue(B,"modelMatrix",Z.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){let w=ie.uniformsGroups;for(let F=0,N=w.length;F<N;F++){let M=w[F];ht.update(M,fn),ht.bind(M,fn)}}return fn}function lo(L,J){L.ambientLightColor.needsUpdate=J,L.lightProbe.needsUpdate=J,L.directionalLights.needsUpdate=J,L.directionalLightShadows.needsUpdate=J,L.pointLights.needsUpdate=J,L.pointLightShadows.needsUpdate=J,L.spotLights.needsUpdate=J,L.spotLightShadows.needsUpdate=J,L.rectAreaLights.needsUpdate=J,L.hemisphereLights.needsUpdate=J}function co(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(L,J,ne){let ie=ze.get(L);ie.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),ze.get(L.texture).__webglTexture=J,ze.get(L.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:ne,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,J){let ne=ze.get(L);ne.__webglFramebuffer=J,ne.__useDefaultFramebuffer=J===void 0};let ho=B.createFramebuffer();this.setRenderTarget=function(L,J=0,ne=0){C=L,R=J,A=ne;let ie=!0,Z=null,ve=!1,Le=!1;if(L){let Ve=ze.get(L);if(Ve.__useDefaultFramebuffer!==void 0)De.bindFramebuffer(B.FRAMEBUFFER,null),ie=!1;else if(Ve.__webglFramebuffer===void 0)tt.setupRenderTarget(L);else if(Ve.__hasExternalTextures)tt.rebindTextures(L,ze.get(L.texture).__webglTexture,ze.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){let je=L.depthTexture;if(Ve.__boundDepthTexture!==je){if(je!==null&&ze.has(je)&&(L.width!==je.image.width||L.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");tt.setupDepthRenderbuffer(L)}}let st=L.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Le=!0);let lt=ze.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(lt[J])?Z=lt[J][ne]:Z=lt[J],ve=!0):L.samples>0&&tt.useMultisampledRTT(L)===!1?Z=ze.get(L).__webglMultisampledFramebuffer:Array.isArray(lt)?Z=lt[ne]:Z=lt,D.copy(L.viewport),k.copy(L.scissor),P=L.scissorTest}else D.copy(_e).multiplyScalar($).floor(),k.copy(Be).multiplyScalar($).floor(),P=nt;if(ne!==0&&(Z=ho),De.bindFramebuffer(B.FRAMEBUFFER,Z)&&ie&&De.drawBuffers(L,Z),De.viewport(D),De.scissor(k),De.setScissorTest(P),ve){let Ve=ze.get(L.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ve.__webglTexture,ne)}else if(Le){let Ve=J;for(let st=0;st<L.textures.length;st++){let lt=ze.get(L.textures[st]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+st,lt.__webglTexture,ne,Ve)}}else if(L!==null&&ne!==0){let Ve=ze.get(L.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ve.__webglTexture,ne)}b=-1},this.readRenderTargetPixels=function(L,J,ne,ie,Z,ve,Le,Ne=0){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=ze.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Le!==void 0&&(Ve=Ve[Le]),Ve){De.bindFramebuffer(B.FRAMEBUFFER,Ve);try{let st=L.textures[Ne],lt=st.format,je=st.type;if(!Ge.textureFormatReadable(lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=L.width-ie&&ne>=0&&ne<=L.height-Z&&(L.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ne),B.readPixels(J,ne,ie,Z,Ze.convert(lt),Ze.convert(je),ve))}finally{let st=C!==null?ze.get(C).__webglFramebuffer:null;De.bindFramebuffer(B.FRAMEBUFFER,st)}}},this.readRenderTargetPixelsAsync=async function(L,J,ne,ie,Z,ve,Le,Ne=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=ze.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Le!==void 0&&(Ve=Ve[Le]),Ve)if(J>=0&&J<=L.width-ie&&ne>=0&&ne<=L.height-Z){De.bindFramebuffer(B.FRAMEBUFFER,Ve);let st=L.textures[Ne],lt=st.format,je=st.type;if(!Ge.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let gt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,gt),B.bufferData(B.PIXEL_PACK_BUFFER,ve.byteLength,B.STREAM_READ),L.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ne),B.readPixels(J,ne,ie,Z,Ze.convert(lt),Ze.convert(je),0);let Lt=C!==null?ze.get(C).__webglFramebuffer:null;De.bindFramebuffer(B.FRAMEBUFFER,Lt);let qt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Ff(B,qt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,gt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ve),B.deleteBuffer(gt),B.deleteSync(qt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,J=null,ne=0){let ie=Math.pow(2,-ne),Z=Math.floor(L.image.width*ie),ve=Math.floor(L.image.height*ie),Le=J!==null?J.x:0,Ne=J!==null?J.y:0;tt.setTexture2D(L,0),B.copyTexSubImage2D(B.TEXTURE_2D,ne,0,0,Le,Ne,Z,ve),De.unbindTexture()};let uo=B.createFramebuffer(),Ai=B.createFramebuffer();this.copyTextureToTexture=function(L,J,ne=null,ie=null,Z=0,ve=null){ve===null&&(Z!==0?(Rr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=Z,Z=0):ve=0);let Le,Ne,Ve,st,lt,je,gt,Lt,qt,Ht=L.isCompressedTexture?L.mipmaps[ve]:L.image;if(ne!==null)Le=ne.max.x-ne.min.x,Ne=ne.max.y-ne.min.y,Ve=ne.isBox3?ne.max.z-ne.min.z:1,st=ne.min.x,lt=ne.min.y,je=ne.isBox3?ne.min.z:0;else{let U=Math.pow(2,-Z);Le=Math.floor(Ht.width*U),Ne=Math.floor(Ht.height*U),L.isDataArrayTexture?Ve=Ht.depth:L.isData3DTexture?Ve=Math.floor(Ht.depth*U):Ve=1,st=0,lt=0,je=0}ie!==null?(gt=ie.x,Lt=ie.y,qt=ie.z):(gt=0,Lt=0,qt=0);let Ut=Ze.convert(J.format),it=Ze.convert(J.type),zt;J.isData3DTexture?(tt.setTexture3D(J,0),zt=B.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(tt.setTexture2DArray(J,0),zt=B.TEXTURE_2D_ARRAY):(tt.setTexture2D(J,0),zt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,J.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,J.unpackAlignment);let It=B.getParameter(B.UNPACK_ROW_LENGTH),fn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Qn=B.getParameter(B.UNPACK_SKIP_PIXELS),pn=B.getParameter(B.UNPACK_SKIP_ROWS),ri=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ht.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ht.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,st),B.pixelStorei(B.UNPACK_SKIP_ROWS,lt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,je);let Yt=L.isDataArrayTexture||L.isData3DTexture,cn=J.isDataArrayTexture||J.isData3DTexture;if(L.isDepthTexture){let U=ze.get(L),w=ze.get(J),F=ze.get(U.__renderTarget),N=ze.get(w.__renderTarget);De.bindFramebuffer(B.READ_FRAMEBUFFER,F.__webglFramebuffer),De.bindFramebuffer(B.DRAW_FRAMEBUFFER,N.__webglFramebuffer);for(let M=0;M<Ve;M++)Yt&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ze.get(L).__webglTexture,Z,je+M),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ze.get(J).__webglTexture,ve,qt+M)),B.blitFramebuffer(st,lt,Le,Ne,gt,Lt,Le,Ne,B.DEPTH_BUFFER_BIT,B.NEAREST);De.bindFramebuffer(B.READ_FRAMEBUFFER,null),De.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Z!==0||L.isRenderTargetTexture||ze.has(L)){let U=ze.get(L),w=ze.get(J);De.bindFramebuffer(B.READ_FRAMEBUFFER,uo),De.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ai);for(let F=0;F<Ve;F++)Yt?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,U.__webglTexture,Z,je+F):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,U.__webglTexture,Z),cn?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,w.__webglTexture,ve,qt+F):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,w.__webglTexture,ve),Z!==0?B.blitFramebuffer(st,lt,Le,Ne,gt,Lt,Le,Ne,B.COLOR_BUFFER_BIT,B.NEAREST):cn?B.copyTexSubImage3D(zt,ve,gt,Lt,qt+F,st,lt,Le,Ne):B.copyTexSubImage2D(zt,ve,gt,Lt,st,lt,Le,Ne);De.bindFramebuffer(B.READ_FRAMEBUFFER,null),De.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else cn?L.isDataTexture||L.isData3DTexture?B.texSubImage3D(zt,ve,gt,Lt,qt,Le,Ne,Ve,Ut,it,Ht.data):J.isCompressedArrayTexture?B.compressedTexSubImage3D(zt,ve,gt,Lt,qt,Le,Ne,Ve,Ut,Ht.data):B.texSubImage3D(zt,ve,gt,Lt,qt,Le,Ne,Ve,Ut,it,Ht):L.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ve,gt,Lt,Le,Ne,Ut,it,Ht.data):L.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ve,gt,Lt,Ht.width,Ht.height,Ut,Ht.data):B.texSubImage2D(B.TEXTURE_2D,ve,gt,Lt,Le,Ne,Ut,it,Ht);B.pixelStorei(B.UNPACK_ROW_LENGTH,It),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,fn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Qn),B.pixelStorei(B.UNPACK_SKIP_ROWS,pn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ri),ve===0&&J.generateMipmaps&&B.generateMipmap(zt),De.unbindTexture()},this.initRenderTarget=function(L){ze.get(L).__webglFramebuffer===void 0&&tt.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?tt.setTextureCube(L,0):L.isData3DTexture?tt.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?tt.setTexture2DArray(L,0):tt.setTexture2D(L,0),De.unbindTexture()},this.resetState=function(){R=0,A=0,C=null,De.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}};function Mn(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var wt=(s,e,t)=>s<e?e:s>t?t:s,Gn=(s,e,t)=>s+(e-s)*t,Ti=(s,e,t)=>{let n=wt((t-s)/(e-s||1e-6),0,1);return n*n*(3-2*n)},jr=(s,e)=>1-Math.exp(-s*e);function dn(s){return[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255]}function Au(s){return"#"+s.toString(16).padStart(6,"0")}function rs(s,e){let t=document.createElement("canvas");t.width=s,t.height=e;let n=t.getContext("2d");return{c:t,g:n}}function os(s,e={}){let t=new ns(s);return e.srgb!==!1&&(t.colorSpace=Vt),e.repeat&&(t.wrapS=Os,t.wrapT=Os),t.anisotropy=4,t}var Yn=11;function da(s,e){let t=wt(Math.round(s[0]*e),0,255),n=wt(Math.round(s[1]*e),0,255),i=wt(Math.round(s[2]*e),0,255);return`rgb(${t},${n},${i})`}function Ru(s,e,t=!1){let{c:n,g:i}=rs(e,e),r=Mn(11),o=Mn(12),a=g=>(g+Yn)/(Yn*2)*e,l=e/(Yn*2),c=(g,p)=>t?.15+.85*Ti(4.5,7,Math.hypot(g,p)):1,h=g=>g/e*Yn*2-Yn;i.fillStyle="#9b7c59",i.fillRect(0,0,e,e);for(let g=0;g<2600;g++){let p=r()*e,y=r()*e,E=(2+r()*16)*(e/1024),v=c(h(p),h(y));i.fillStyle=r()<.5?`rgba(70,48,28,${(.04+r()*.07)*v})`:`rgba(206,170,128,${(.04+r()*.07)*v})`,i.beginPath(),i.arc(p,y,E,0,Math.PI*2),i.fill()}let u=1.9,d=[166,140,108];for(let g=-Yn;g<Yn;g+=u)for(let p=-Yn;p<Yn;p+=u){let y=g+u/2+(r()-.5)*u*.5,E=p+u/2+(r()-.5)*u*.5;if(Ft({x:y,z:E},s.poly)<.2)continue;let v=Math.hypot(y,E)/s.radius,S=6+Math.floor(r()*2),R=u*(.42+r()*.1),A=r()*Math.PI;i.beginPath();for(let b=0;b<S;b++){let _=A+b/S*Math.PI*2+(r()-.5)*.35,D=R*(.85+r()*.3),k=a(y+Math.cos(_)*D),P=a(E+Math.sin(_)*D);b===0?i.moveTo(k,P):i.lineTo(k,P)}i.closePath(),i.fillStyle=da(d,.88+r()*.22+(1-v)*-.03);let C=c(y,E);i.globalAlpha=(.42+v*.4)*C,i.fill(),i.globalAlpha=.5*C,i.strokeStyle="rgba(62,44,28,0.75)",i.lineWidth=2.2*(e/1024),i.stroke(),i.globalAlpha=1}for(let g=0;g<160;g++){let p=(r()*2-1)*s.radius,y=(r()*2-1)*s.radius;if(Ft({x:p,z:y},s.poly)<.6)continue;let E=(.08+r()*.16)*l,v=E*(.6+r()*.3),S=r()*3,R=da([150,142,130],.8+r()*.4),A=r()*3;t&&Math.hypot(p,y)<6&&o()<.9||(i.fillStyle="rgba(40,28,18,0.35)",i.beginPath(),i.ellipse(a(p)+E*.25,a(y)+v*.45,E,v,S,0,Math.PI*2),i.fill(),i.fillStyle=R,i.beginPath(),i.ellipse(a(p),a(y),E,v,A,0,Math.PI*2),i.fill())}let f=[96,116,52],m=(g,p,y)=>{let E=5+Math.floor(r()*6);for(let v=0;v<E;v++){let S=(r()-.5)*y*2,R=(r()-.5)*y*2,A=(.07+r()*.2)*l;i.fillStyle=da(f,.7+r()*.45),i.globalAlpha=.55+r()*.3,i.beginPath(),i.arc(a(g+S),a(p+R),A,0,Math.PI*2),i.fill()}i.globalAlpha=1};for(let g=0;g<2600;g++){let p=(r()*2-1)*s.radius*1.1,y=(r()*2-1)*s.radius*1.1,E=Ft({x:p,z:y},s.poly);if(E<0)continue;let v=E<2.6?Math.pow(1-E/2.6,1.4):.015;r()<v*.5&&m(p,y,.4)}for(let g of s.rocks){for(let p=0;p<22;p++){let y=r()*Math.PI*2,E=g.r*(.7+r()*.9);m(g.pos.x+Math.cos(y)*E,g.pos.z+Math.sin(y)*E,.35)}i.fillStyle="rgba(30,22,14,0.28)",i.beginPath(),i.arc(a(g.pos.x),a(g.pos.z),g.r*1.15*l,0,Math.PI*2),i.fill()}for(let g=0;g<70;g++){let p=(r()*2-1)*s.radius,y=(r()*2-1)*s.radius,E=Ft({x:p,z:y},s.poly);E<.4||E>3.2||(i.fillStyle="#f4f1e6",i.beginPath(),i.arc(a(p),a(y),.06*l,0,Math.PI*2),i.fill(),i.fillStyle="#e8c85a",i.beginPath(),i.arc(a(p),a(y),.025*l,0,Math.PI*2),i.fill())}i.save(),i.beginPath(),s.poly.forEach((g,p)=>p===0?i.moveTo(a(g.x),a(g.z)):i.lineTo(a(g.x),a(g.z))),i.closePath(),i.clip(),i.lineJoin="round";for(let[g,p]of[[1.4,.05],[1,.06],[.65,.08],[.35,.1]])i.strokeStyle=`rgba(34,24,14,${p})`,i.lineWidth=g*2*l,i.stroke();i.restore();let x=os(n);return x.anisotropy=8,x}function xp(){let{c:e,g:t}=rs(256,256),n=Mn(23);t.fillStyle="#c2bbb0",t.fillRect(0,0,256,256);for(let i=0;i<900;i++){let r=n()*256,o=n()*256,a=2+n()*14;t.fillStyle=n()<.5?`rgba(40,36,34,${.04+n()*.1})`:`rgba(210,200,185,${.03+n()*.08})`;for(let l of[-256,0,256])t.beginPath(),t.arc(r+l,o,a,0,Math.PI*2),t.fill()}for(let i=0;i<26;i++){let r=n()*256;t.strokeStyle=`rgba(30,26,24,${.16+n()*.2})`,t.lineWidth=1+n()*2,t.beginPath();let o=r;t.moveTo(o,0);for(let a=0;a<=256;a+=16)o+=(n()-.5)*5,t.lineTo(o,a);t.stroke()}return os(e,{repeat:!0})}function yp(){let{c:e,g:t}=rs(512,512),n=Mn(31);for(let i=0;i<70;i++){let r=n()*512,o=n()*512,a=30+n()*90;for(let l of[-512,0,512])for(let c of[-512,0,512]){let h=t.createRadialGradient(r+l,o+c,0,r+l,o+c,a);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=h,t.fillRect(r+l-a,o+c-a,a*2,a*2)}}return os(e,{repeat:!0})}function Dc(){let{c:e,g:t}=rs(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),os(e)}function bp(){let{c:t,g:n}=rs(256,64),i=n.createLinearGradient(0,0,256,0);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.65,"rgba(255,255,255,0.35)"),i.addColorStop(1,"rgba(255,255,255,1)");for(let o=0;o<64;o++){let a=Math.abs((o+.5)/64-.5)*2,l=Math.pow(1-a,1.6);n.globalAlpha=l,n.fillStyle=i,n.fillRect(0,o,256,1)}n.globalAlpha=1;let r=n.createLinearGradient(0,0,256,0);return r.addColorStop(.5,"rgba(255,255,255,0)"),r.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=r,n.fillRect(0,64/2-4,256,8),os(t)}function _p(){let{c:t,g:n}=rs(256,64),i=n.createLinearGradient(0,0,256,0);return i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.8,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=i,n.globalAlpha=.28,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.82,64/2-14),n.lineTo(256*.82,64/2+14),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle=i,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.84,64/2-4),n.lineTo(256*.84,64/2+4),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(254,64/2),n.lineTo(256*.78,64/2-22),n.lineTo(256*.83,64/2),n.lineTo(256*.78,64/2+22),n.closePath(),n.fill(),n.globalAlpha=.5,n.fillRect(256*.55,64/2-1.5,256*.3,3),os(t)}function Mp(s,e){let{c:t,g:n}=rs(e,e),i=Mn(41),r=Yn,o=u=>(u+r)/(r*2)*e,a=e/(r*2);n.fillStyle="#e2d2b2",n.fillRect(0,0,e,e);for(let u=0;u<90;u++){let d=i()*e,f=i()*e,m=(40+i()*120)*(e/1024),x=n.createRadialGradient(d,f,0,d,f,m);x.addColorStop(0,i()<.5?"rgba(232,220,196,0.22)":"rgba(196,180,152,0.18)"),x.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=x,n.fillRect(d-m,f-m,m*2,m*2)}let l=Math.max(1.5,2.2*(e/1024)),c=-r;for(;c<r;){let u=1.6+i()*1,d=-r-i()*2;for(;d<r;){let f=1.8+i()*1.4,m=()=>(i()-.5)*.08,x=[[d+m(),c+m()],[d+f+m(),c+m()],[d+f+m(),c+u+m()],[d+m(),c+u+m()]],g=.93+i()*.11;if(n.beginPath(),x.forEach(([p,y],E)=>E===0?n.moveTo(o(p),o(y)):n.lineTo(o(p),o(y))),n.closePath(),n.fillStyle=da([236,221,192],g),n.fill(),n.strokeStyle="rgba(255,248,232,0.35)",n.lineWidth=l*.8,n.beginPath(),n.moveTo(o(x[3][0]),o(x[3][1])),n.lineTo(o(x[0][0]),o(x[0][1])),n.lineTo(o(x[1][0]),o(x[1][1])),n.stroke(),n.strokeStyle="rgba(122,104,80,0.6)",n.lineWidth=l,n.beginPath(),x.forEach(([p,y],E)=>E===0?n.moveTo(o(p),o(y)):n.lineTo(o(p),o(y))),n.closePath(),n.stroke(),i()<.35){n.strokeStyle="rgba(110,94,72,0.45)",n.lineWidth=l*.55;let p=d+f*(.2+i()*.6),y=c+u*(.1+i()*.2);n.beginPath(),n.moveTo(o(p),o(y));for(let E=0;E<4;E++)p+=(i()-.5)*.5,y+=u*.2,n.lineTo(o(p),o(y));n.stroke()}if(i()<.2){let p=d+(i()<.5?0:f),y=c+(i()<.5?0:u),E=.18+i()*.2;n.fillStyle="rgba(150,132,104,0.45)",n.beginPath(),n.moveTo(o(p),o(y)),n.lineTo(o(p+(p===d?E:-E)),o(y)),n.lineTo(o(p),o(y+(y===c?E:-E))),n.closePath(),n.fill()}d+=f}c+=u}for(let u=0;u<1800;u++){let d=(i()*2-1)*s.radius*1.1,f=(i()*2-1)*s.radius*1.1,m=Ft({x:d,z:f},s.poly);if(m<0||m>1.3||i()>Math.pow(1-m/1.3,1.5)*.7)continue;let x=(.06+i()*.16)*a;n.fillStyle=da([112,126,70],.75+i()*.4),n.globalAlpha=.6+i()*.3,n.beginPath(),n.arc(o(d),o(f),x,0,Math.PI*2),n.fill(),n.globalAlpha=1,i()<.12&&(n.fillStyle="#e8c44a",n.beginPath(),n.arc(o(d+.1),o(f),.05*a,0,Math.PI*2),n.fill())}for(let u of s.rocks)n.fillStyle="rgba(80,66,48,0.18)",n.beginPath(),n.arc(o(u.pos.x),o(u.pos.z),u.r*1.12*a,0,Math.PI*2),n.fill();n.save(),n.beginPath(),s.poly.forEach((u,d)=>d===0?n.moveTo(o(u.x),o(u.z)):n.lineTo(o(u.x),o(u.z))),n.closePath(),n.clip(),n.lineJoin="round";for(let[u,d]of[[.9,.05],[.5,.07],[.22,.09]])n.strokeStyle=`rgba(70,56,40,${d})`,n.lineWidth=u*2*a,n.stroke();n.restore();let h=os(t);return h.anisotropy=8,h}function Sp(){let{c:e,g:t}=rs(256,256),n=Mn(43);t.fillStyle="#e9e1d0",t.fillRect(0,0,256,256);for(let i=0;i<18;i++){t.strokeStyle=`rgba(140,128,112,${.12+n()*.18})`,t.lineWidth=.8+n()*1.6;let r=n()*256,o=0;for(t.beginPath(),t.moveTo(r,o);o<256;)r+=(n()-.5)*18,o+=10+n()*20,t.lineTo(r,o);t.stroke()}for(let i=0;i<400;i++)t.fillStyle=`rgba(${n()<.5?"120,110,96":"255,250,240"},${.03+n()*.05})`,t.beginPath(),t.arc(n()*256,n()*256,2+n()*8,0,Math.PI*2),t.fill();return os(e,{repeat:!0})}var Ep=typeof location<"u"?new URLSearchParams(location.search):new URLSearchParams,Cu=Ep.get("art"),pt={myth:Cu==="myth",near:Ep.get("cam")==="near"};function Iu(s){return Cu==="myth"?!0:Cu==="base"?!1:s==="v4"||s==="s1"}function Pu(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new Qt,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=wp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let m=wp(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function wp(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new kn(o,t,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){let x=h.getComponent(d,m);a.setComponent(d+u,m,x)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}var Tp=new Et,Ap=new An,mb=new O,gb=new O;function _t(s,e,t,n,i=0,r=0,o=0,a=1){return Ap.setFromEuler(new Jn(i,r,o)),Tp.compose(gb.set(e,t,n),Ap,mb.set(a,a,a)),s.applyMatrix4(Tp)}function as(s,e,t,n){let i=s.map(a=>{let l=a.index?a.toNonIndexed():a;for(let c of Object.keys(l.attributes))c!=="position"&&c!=="normal"&&l.deleteAttribute(c);return l}),r=t(Pu(i,!1));r.computeVertexNormals();for(let a of s)a.dispose();let o=new Ye(r,e);return o.name=n,o.castShadow=!0,o.receiveShadow=!0,o}var Fc={athena:10406399,hermes:16765786,poseidon:6222032},Lu={athena:{fill:["M12 2.5l7.5 2.8v6.2c0 4.5-3 8-7.5 10-4.5-2-7.5-5.5-7.5-10V5.3z"],inner:["M12 6.5v11M7.5 11h9"]},hermes:{fill:["M5 9h6v6h6.5a2.5 2.5 0 0 1 2.5 2.5V19H5z"],stroke:["M11 7.5c1.8-3.2 5-4.2 9-3.2-2.5.8-3.8 2-4.5 3.8M11 9c1.5-2.2 3.8-3 6.5-2.5"]},poseidon:{stroke:["M12 21.5V6.5M5 4.5v4.5a7 7 0 0 0 14 0V4.5M12 2.5L10.2 5.5M12 2.5l1.8 3M5 4.5L3.5 6.8M5 4.5l1.5 2.3M19 4.5l-1.5 2.3M19 4.5l1.5 2.3"]}},Cp=.35,Ip=(()=>{let s=e=>'<svg viewBox="0 0 24 24">'+(e.fill??[]).map(t=>`<path d="${t}" fill="currentColor"/>`).join("")+(e.stroke??[]).map(t=>`<path d="${t}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`).join("")+(e.inner??[]).map(t=>`<path d="${t}" fill="none" stroke="#0b1a2b" stroke-width="1.8" stroke-linecap="round"/>`).join("")+"</svg>";return{athena:{text:"\u96C5\u5178\u5A1C",color:Fc.athena,svg:s(Lu.athena),front:.55},hermes:{text:"\u8D6B\u8033\u58A8\u65AF",color:Fc.hermes,svg:s(Lu.hermes),front:.55},poseidon:{text:"\u6CE2\u8CFD\u9813",color:Fc.poseidon,svg:s(Lu.poseidon),front:.55},convert:{text:"\u6230\u795E\u796D\u58C7",color:16747098,svg:s({stroke:["M5 5l14 14M19 5L5 19M3.5 8.5l5-5M15.5 20.5l5-5"]}),front:.8},revive:{text:"\u5361\u620E\u7684\u5C0F\u8239",color:10479871,svg:s({fill:["M2.5 14h19l-3.5 5.5H6z"],stroke:["M12 3.5v10.5M12 4.5l5.5 7H12"]}),front:0}}})(),Ee=.6,He=(s,e,t)=>new O(s,e,t),vb=new O(0,1,0);function Sn(s,e,t,n,i=6){let r=new mt(n,t,s.distanceTo(e),i,1),o=new An().setFromUnitVectors(vb,e.clone().sub(s).normalize());return r.applyMatrix4(new Et().compose(s.clone().add(e).multiplyScalar(.5),o,He(1,1,1)))}var ci=(s,e,t=1,n=1,i=1)=>new Ts(e,1).applyMatrix4(new Et().compose(s,new An,He(t,n,i)));function ku(){let s=(e,t,n,i)=>_t(new mt(e,t,n,8),0,i,0,0,Math.PI/8,0);return[s(.66,.72,.24,.12),s(.58,.62,.2,.34),s(.5,.54,.16,.52)]}function Du(s){let e=s.broad??1,t=s.chest.clone().lerp(s.head,.45),n=(i,r=.16)=>_t(new ft(.3,.09,.13),i.x+r*.5,i.y-.05,i.z);return[_t(new ft(.34,.3,.42*e),s.pelvis.x,s.pelvis.y,s.pelvis.z),Sn(s.pelvis,s.chest,.2*e,.27*e,7),_t(new ft(.34,.36,.66*e),s.chest.x,s.chest.y-.02,s.chest.z),Sn(s.chest,t,.09,.08,6),ci(s.head,s.headR,.95,1.12,.9),Sn(s.shL,s.elL,.085*e,.07*e),Sn(s.elL,s.haL,.07*e,.055),Sn(s.shR,s.elR,.085*e,.07*e),Sn(s.elR,s.haR,.07*e,.055),ci(s.shL,.11*e),ci(s.shR,.11*e),ci(s.haL,.075),ci(s.haR,.075),Sn(s.hipL,s.knL,.13,.095),Sn(s.knL,s.anL,.095,.065),Sn(s.hipR,s.knR,.13,.095),Sn(s.knR,s.anR,.095,.065),n(s.anL),n(s.anR)]}var Uc=(s,e,t,n,i,r=0,o=9)=>_t(new mt(n,i,e-t,o,1),s,(e+t)/2,r);function xb(){let s={pelvis:He(0,Ee+1.75,0),chest:He(.02,Ee+2.42,0),head:He(.04,Ee+2.98,0),headR:.21,shL:He(0,Ee+2.62,-.36),elL:He(.2,Ee+2.2,-.5),haL:He(.36,Ee+2.05,-.42),shR:He(0,Ee+2.62,.36),elR:He(.14,Ee+2.28,.52),haR:He(.3,Ee+2.42,.56),hipL:He(0,Ee+1.65,-.13),knL:He(.04,Ee+.9,-.15),anL:He(.02,Ee+.1,-.16),hipR:He(0,Ee+1.65,.13),knR:He(.08,Ee+.9,.16),anR:He(.1,Ee+.1,.17)},e=[...ku(),...Du(s),Uc(0,Ee+1.95,Ee+.12,.3,.56),Uc(.01,Ee+2.5,Ee+1.7,.27,.36,0,8),ci(He(.03,Ee+3.04,0),.24,1,.95,.95),_t(new ft(.06,.26,.34),.25,Ee+2.94,0),Sn(He(.3,Ee+.05,.56),He(.3,Ee+3.75,.56),.035,.035),_t(new mt(.62,.62,.08,14),.5,Ee+1.95,-.5,0,0,Math.PI/2)],t=[_t(new mt(.46,.46,.08,10,1,!1,0,Math.PI),-.04,Ee+3.18,0,Math.PI/2,0,0),_t(new Nr(.16),.3,Ee+3.95,.56).scale(1,1,1),_t(new mt(.5,.5,.06,14),.55,Ee+1.95,-.5,0,0,Math.PI/2),ci(He(.6,Ee+1.95,-.5),.1)];return{body:e,accent:t}}function yb(){let s={pelvis:He(0,Ee+1.85,0),chest:He(.24,Ee+2.45,0),head:He(.38,Ee+2.95,0),headR:.2,shL:He(.2,Ee+2.62,-.35),elL:He(-.12,Ee+2.4,-.5),haL:He(-.38,Ee+2.3,-.56),shR:He(.26,Ee+2.62,.35),elR:He(.5,Ee+2.82,.44),haR:He(.66,Ee+3.08,.44),hipL:He(.02,Ee+1.76,-.13),knL:He(.5,Ee+1.55,-.14),anL:He(.42,Ee+.98,-.14),hipR:He(-.02,Ee+1.76,.13),knR:He(-.22,Ee+1.08,.14),anR:He(-.4,Ee+.62,.14)},e=new Ts(.42,0),t=e.getAttribute("position");for(let a=0;a<t.count;a++)t.setY(a,t.getY(a)*.75);let n=[...Du(s),_t(e,-.32,Ee+.28,.12),Uc(.06,Ee+2.05,Ee+1.6,.27,.38,0,8),_t(new ft(.06,.75,.2),.3,Ee+2.25,0,0,0,.9),_t(new ft(.05,.22,.75),-.45,Ee+2.05,-.3,.2,.5,.25),_t(new ft(.05,.18,.6),-.85,Ee+2.15,-.45,.1,.4,.35)],i=(a,l,c,h,u)=>[_t(new ft(.05,.26*u,.1*u),a-.04,l+.06*u,c+h*.08*u,h*.9,0,-.5),_t(new ft(.05,.2*u,.09*u),a-.1,l+.04*u,c+h*.13*u,h*1.2,0,-.6)],r=[ci(He(.39,Ee+3.08,0),.21,1,.7,1),_t(new mt(.3,.3,.04,10),.39,Ee+3.02,0),...i(.36,Ee+3.08,.2,1,1.4),...i(.36,Ee+3.08,-.2,-1,1.4),Sn(He(.66,Ee+2.35,.44),He(.66,Ee+3.85,.44),.032,.032),ci(He(.66,Ee+3.9,.44),.08),...i(.66,Ee+3.72,.5,1,1.5),...i(.66,Ee+3.72,.38,-1,1.5),_t(new _i(.09,.025,4,8),.66,Ee+3.3,.44,Math.PI/2,0,0),_t(new _i(.09,.025,4,8),.66,Ee+3.05,.44,Math.PI/2,0,0),...i(s.anL.x,s.anL.y,s.anL.z-.08,-1,1.3),...i(s.anR.x,s.anR.y,s.anR.z+.08,1,1.3),_t(new ft(.2,.05,.15),s.anL.x+.04,s.anL.y-.02,s.anL.z),_t(new ft(.2,.05,.15),s.anR.x+.04,s.anR.y-.02,s.anR.z)],o=new Et().makeRotationY(-1.22);for(let a of[...n,...r])a.applyMatrix4(o);return{body:[...ku(),...n],accent:r}}function bb(){let s={pelvis:He(0,Ee+1.78,0),chest:He(.02,Ee+2.45,0),head:He(.05,Ee+3.02,0),headR:.22,broad:1.18,shL:He(0,Ee+2.66,-.44),elL:He(.04,Ee+2.2,-.56),haL:He(.08,Ee+1.75,-.56),shR:He(0,Ee+2.66,.44),elR:He(.14,Ee+2.26,.6),haR:He(.26,Ee+2.45,.62),hipL:He(0,Ee+1.68,-.14),knL:He(.04,Ee+.92,-.16),anL:He(.04,Ee+.1,-.18),hipR:He(0,Ee+1.68,.14),knR:He(.06,Ee+.92,.17),anR:He(.08,Ee+.1,.19)},e=[...ku(),...Du(s),Uc(0,Ee+1.9,Ee+.12,.33,.58),ci(s.haL,.1),_t(new On(.17,.48,6),.17,Ee+2.76,0,Math.PI,0,0),ci(He(-.08,Ee+2.95,0),.22,.8,1.2,1.05),Sn(He(.28,Ee+.05,.62),He(.28,Ee+3.5,.62),.04,.04)],t=[_t(new mt(.24,.25,.1,9),.05,Ee+3.17,0),...[0,1,2,3,4].map(n=>{let i=n/5*Math.PI*2;return _t(new On(.05,.24,4),.05+Math.cos(i)*.21,Ee+3.32,Math.sin(i)*.21)}),_t(new ft(.09,.09,.72),.28,Ee+3.52,.62),Sn(He(.28,Ee+3.52,.28),He(.28,Ee+3.95,.28),.04,.02),Sn(He(.28,Ee+3.52,.62),He(.28,Ee+4.08,.62),.05,.02),Sn(He(.28,Ee+3.52,.96),He(.28,Ee+3.95,.96),.04,.02),_t(new Nr(.09),.28,Ee+3.3,.62)];return{body:e,accent:t}}function _b(){let e=document.createElement("canvas");e.width=512,e.height=512;let t=e.getContext("2d"),n=512/2,i=(a,l,c)=>{t.beginPath(),t.arc(n,n,l,0,Math.PI*2),t.arc(n,n,a,0,Math.PI*2,!0),t.fillStyle=c,t.fill("evenodd")};t.fillStyle="#e6d6b6",t.fillRect(0,0,512,512),i(n*.9,n*.98,"#b98a52"),i(n*.84,n*.9,"#efe2c6"),i(n*.78,n*.84,"#9a6a3c");for(let a=0;a<48;a++){let l=a/48*Math.PI*2;t.save(),t.translate(n+Math.cos(l)*n*.94,n+Math.sin(l)*n*.94),t.rotate(l),t.fillStyle=a%2?"#7d5530":"#d9b67a",t.fillRect(-6,-6,12,12),t.restore()}i(n*.5,n*.78,"rgba(226,208,176,0.55)"),i(n*.46,n*.5,"#9a6a3c");let r=(a,l,c,h,u)=>{t.beginPath();for(let d=0;d<c*2;d++){let f=h+d/(c*2)*Math.PI*2,m=d%2?a:l;t.lineTo(n+Math.cos(f)*m,n+Math.sin(f)*m)}t.closePath(),t.fillStyle=u,t.fill()};r(n*.16,n*.44,8,-Math.PI/2,"#c9965a"),r(n*.12,n*.34,4,-Math.PI/2,"#efe2c6"),i(0,n*.09,"#7d5530");let o=new ns(e);return o.colorSpace=Vt,o.anisotropy=4,o}function Rp(s,e){let t={at:s[0],n:{x:1,z:0},t:{x:0,z:1}},n=1/0;for(let i=0;i<s.length;i++){let r=s[i],o=s[(i+1)%s.length],a=o.x-r.x,l=o.z-r.z,c=a*a+l*l,h=c?Math.max(0,Math.min(1,((e.x-r.x)*a+(e.z-r.z)*l)/c)):0,u={x:r.x+a*h,z:r.z+l*h},d=Math.hypot(u.x-e.x,u.z-e.z);if(d<n){n=d;let f=Math.sqrt(c)||1;t={at:u,n:{x:l/f,z:-a/f},t:{x:a/f,z:l/f}}}}return t.n.x*t.at.x+t.n.z*t.at.z<0&&(t.n={x:-t.n.x,z:-t.n.z}),t}function Pp(s,e,t,n){let i=new Map,r=t(new sn({map:n,color:15920352})),o=D=>t(new sn({map:n,color:D})),a=o(6965808),l=o(2762546),c=o(12617792),h=o(11544606),u=t(new jt({color:16756810,fog:!1})),d=t(new jt({color:10479871,fog:!1})),f=null;for(let D of e.spots??[]){let k=new Jt;if(k.position.set(D.pos.x,0,D.pos.z),k.rotation.y=-D.facing,D.kind==="athena"||D.kind==="hermes"||D.kind==="poseidon"){let P=D.kind==="athena"?xb():D.kind==="hermes"?yb():bb();k.add(as(P.body,r,t,`statue-${D.kind}-mesh`)),k.add(as(P.accent,o(Fc[D.kind]),t,`statue-${D.kind}-accent`)),k.name=`statue-${D.kind}`}else if(D.kind==="convert"){k.add(as([_t(new ft(1,.85,.75),0,.425,0),_t(new ft(1.15,.1,.9),0,.9,0)],r,t,"altar-convert-stone")),k.add(as([_t(new mt(.32,.18,.22,10),0,1.06,0)],c,t,"altar-convert-bowl"));let P=new Ye(t(new On(.2,.5,6)),u);P.position.set(0,1.4,0),P.name="altar-convert-fire",k.add(P),k.add(as([_t(new mt(.03,.03,2.3,5),-.45,1.15,0,.5,0,0),_t(new mt(.03,.03,2.3,5),-.45,1.15,0,-.5,0,0),_t(new mt(.03,.03,2.4,5),-.6,1.2,.55)],a,t,"altar-convert-spears"));let V=new Ye(t(new ft(.55,.85,.03)),h);V.position.set(-.6,1.85,.27),V.rotation.y=Math.PI/2,V.name="altar-convert-banner",k.add(V),k.name="altar-convert"}else if(D.kind==="revive"){let P=Rp(e.poly,D.pos),V=P.t.z<=0?P.t:{x:-P.t.x,z:-P.t.z},W=Rp(e.poly,{x:D.pos.x+P.n.x*2+V.x*1.5,z:D.pos.z+P.n.z*2+V.z*1.5}),X=W.t.z<=0?W.t:{x:-W.t.x,z:-W.t.z},se={x:W.at.x+W.n.x*.55,z:W.at.z+W.n.z*.55},$=se.x-D.pos.x,oe=se.z-D.pos.z,he=Math.hypot($,oe)||1,_e=$/he,Be=oe/he,nt=-Math.atan2(Be,_e),Fe=[];for(let qe=.12;qe<he;qe+=.27)Fe.push(_t(new ft(.22,.05,1.05),D.pos.x+_e*qe,.035,D.pos.z+Be*qe,0,nt,0));for(let qe of[-1,1])Fe.push(_t(new ft(he,.07,.08),D.pos.x+_e*he/2-Be*qe*.5,.03,D.pos.z+Be*he/2+_e*qe*.5,0,nt,0));for(let qe of[-1,1])Fe.push(Sn(He(se.x-Be*qe*.42,.02,se.z+_e*qe*.42),He(se.x-Be*qe*.42,-1.6,se.z+_e*qe*.42),.07,.06));let Je=as(Fe,a,t,"altar-revive-dock");s.add(Je);let te={x:D.pos.x-Be*.45,z:D.pos.z+_e*.45},Q={x:W.at.x+W.n.x*.85+X.x*1,z:W.at.z+W.n.z*.85+X.z*1},xe={x:Q.x-X.x*1.35,z:Q.z-X.z*1.35};s.add(as([Sn(He(te.x,0,te.z),He(te.x,.5,te.z),.1,.09,8),ci(He(te.x,.52,te.z),.12,1,.6,1),Sn(He(te.x,.42,te.z),He(xe.x,.25,xe.z),.02,.02,4)],l,t,"altar-revive-bollard")),k.position.set(Q.x,0,Q.z),k.rotation.y=-Math.atan2(-X.z,-X.x);let we=new ft(2.7,.42,1,6,1,1),de=we.getAttribute("position");for(let qe=0;qe<de.count;qe++){let B=de.getX(qe),vt=de.getY(qe),$e=de.getZ(qe),Ge=Math.abs(B)/1.35;de.setXYZ(qe,B,vt+Ge*Ge*.35,$e*(1-Ge*Ge*.85)*(vt<0?.7:1))}k.add(as([_t(we,0,-.3,0)],a,t,"altar-revive-hull")),k.add(as([_t(new On(.32,1.45,7),-.55,.6,0),_t(new Rn(.17,8,6),-.55,1.3,0),_t(new mt(.025,.025,1.9,5),-.15,.8,0)],l,t,"altar-revive-charon"));let be=new Ye(t(new Rn(.11,8,6)),d);be.position.set(-.15,1.8,0),be.name="altar-revive-lantern",k.add(be),k.name="altar-revive",f=W.at}s.add(k),i.set(D.kind,k)}let m=new Ye(t(new Wo(3.4,64).rotateX(-Math.PI/2)),t(new sn({map:t(_b()),polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})));m.position.set(0,.012,0),m.receiveShadow=!0,m.name="altar-mosaic",s.add(m);let x=[],g=e.poly,p=g.map((D,k)=>{let P=g[(k+1)%g.length];return Math.hypot(P.x-D.x,P.z-D.z)}),y=p.reduce((D,k)=>D+k,0),E=Math.max(8,Math.round(y/1.05));for(let D=0,k=0,P=0;D<E;D++){let V=D/E*y;for(;P+p[k]<V;)P+=p[k],k++;let W=g[k],X=g[(k+1)%g.length],se=(V-P)/(p[k]||1),$={x:W.x+(X.x-W.x)*se,z:W.z+(X.z-W.z)*se},oe=Math.hypot($.x,$.z)||1;x.push({x:$.x-$.x/oe*.3,z:$.z-$.z/oe*.3})}let v=f,S=x.map(D=>!v||Math.hypot(D.x-v.x,D.z-v.z)>1),R=.62,A=.6,C=new Ye(new Qt,r);C.name="altar-rail",C.castShadow=!0,C.receiveShadow=!0;let b=null,_=()=>{let D=[];for(let V=0;V<x.length;V++){let W=x[V],X=x[(V+1)%x.length];if(S[V]&&D.push(_t(new ft(.13,R,.13),W.x,R/2,W.z)),S[V]&&S[(V+1)%x.length]){let se=Math.hypot(X.x-W.x,X.z-W.z);D.push(_t(new ft(se,.09,.15),(W.x+X.x)/2,A,(W.z+X.z)/2,0,-Math.atan2(X.z-W.z,X.x-W.x),0))}}let k=D.map(V=>{let W=V.toNonIndexed();V.dispose();for(let X of Object.keys(W.attributes))X!=="position"&&X!=="normal"&&W.deleteAttribute(X);return W}),P=Pu(k,!1);for(let V of k)V.dispose();b?.dispose(),b=P,C.geometry=P};return _(),s.add(C),t({dispose:()=>b?.dispose()}),{spots:i,mosaic:m,rail:[C],railPosts:()=>S.filter(Boolean).length,openRailAt(D,k){let P=!1;for(let V=0;V<x.length;V++)S[V]&&Math.hypot(x[V].x-D.x,x[V].z-D.z)<k&&(S[V]=!1,P=!0);P&&_()}}}function Lp(s,e){return(s.spots??[]).some(t=>Math.hypot(t.pos.x-e.pos.x,t.pos.z-e.pos.z)<Math.max(.3,e.r*.5))}var kp=()=>pt.myth?2829386:6984904,Mb=40,Sb=110,Dp=-18;function Eb(){let s=Mn(77),e=[],t=[[-21.2,-10.2,-3,7,1.6],[-17.9,-10.4,-5,6,1.3],[-24.2,-8.8,-8,3.5,1.4],[23.6,-12.5,-6,4.5,1.5],[21.5,-13.5,-9,4,1.1]];for(let[r,o,a,l,c]of t)e.push({x:r,z:o,top:a,len:l,w:c,capH:.25+s()*.15,haze:.14,tier:0});for(let r=0;r<14;r++){let o=r%2===0?-1:1;e.push({x:o*(28+s()*8),z:-26+s()*14,top:-9-s()*5,len:0,w:1.6+s()*1.4,capH:.3+s()*.2,haze:.5,tier:1})}for(let r=0;r<16;r++){let o,a,l,c=2.6+s()*3;if(r<10)o=(r%2===0?-1:1)*(36+s()*14),a=-36+s()*20,l=-12-s()*4,c=2+s()*1.6;else{let h=Math.PI*(1.2+s()*.6),u=55+s()*20;o=Math.cos(h)*u,a=Math.sin(h)*u,l=-7+s()*15}e.push({x:o,z:a,top:l,len:0,w:c,capH:.4+s()*.3,haze:.66,tier:2})}let n=[],i=[[-27.9,-21.3,-9,1.6],[-31.1,-16.8,-13,1.3],[27.5,-20.7,-9,1.5],[32.2,-17.9,-13,1.2],[-36,-28,-10,2],[37,-30,-11,1.9]];for(let[r,o,a,l]of i)n.push({x:r,z:o,y:a,s:l,haze:.5});return{pillars:e,islets:n}}var Fp=Eb(),zc=new at,ls=(s,e,t)=>(zc.setRGB(s,e,t,Vt),[zc.r,zc.g,zc.b]);function Oc(s,e){let t=e.x-s.x,n=e.z-s.z,i=Math.hypot(t,n)||1;return{x:n/i,z:-t/i}}function Up(s){let e=s.length;return s.map((t,n)=>{let i=Oc(s[(n+e-1)%e],s[n]),r=Oc(s[n],s[(n+1)%e]),o=i.x+r.x,a=i.z+r.z,l=Math.hypot(o,a)||1;return{x:o/l,z:a/l}})}var fa=class{constructor(){this.pos=[];this.col=[];this.uv=[]}tri(e,t,n,i,r,o,a,l,c){this.pos.push(...e,...t,...n),this.col.push(...i,...r,...o),this.uv.push(...a,...l,...c)}quad(e,t,n){this.tri(e[0],e[1],e[2],t[0],t[1],t[2],n[0],n[1],n[2]),this.tri(e[0],e[2],e[3],t[0],t[2],t[3],n[0],n[2],n[3])}build(){let e=new Qt;return e.setAttribute("position",new xt(this.pos,3)),e.setAttribute("color",new xt(this.col,3)),e.setAttribute("uv",new xt(this.uv,2)),e.computeVertexNormals(),e}};function wb(s){let e=new Ur(s.poly.map(r=>new Pe(r.x,-r.z))),t=new ea(e,1);t.rotateX(-Math.PI/2);let n=t.getAttribute("position"),i=t.getAttribute("uv");for(let r=0;r<n.count;r++)i.setXY(r,(n.getX(r)+Yn)/(Yn*2),1-(n.getZ(r)+Yn)/(Yn*2));return t.computeVertexNormals(),t}function Tb(s,e=!1){let t=Mn(5),n=s.poly,i=n.length,r=new fa,o=e?[.45,.41,.4]:[.74,.71,.67],a=e?[.5,.55,.32]:[.43,.52,.24],l=e?[.1,.09,.17]:[.28,.3,.36],c=e?.3:1,h=[{yTop:0,yBot:-5,sTop:1,sBot:.975},{yTop:-5,yBot:-13,sTop:.975,sBot:.58}],u=0,d=[];for(let g=0;g<i;g++)d.push(u),u+=Math.hypot(n[(g+1)%i].x-n[g].x,n[(g+1)%i].z-n[g].z);let f=[];h.forEach((g,p)=>{let y=[],E=[],v=[],S=[],R=[];for(let A=0;A<i;){let C=2+Math.floor(t()*2),b=.15+t()*.6,_=(g.yBot-g.yTop)*(p===0?1:.75+t()*.3),D=g.sBot*(.94+t()*.08),k=.8+t()*.32;for(let P=0;P<C&&A<i;P++,A++)E.push(b),v.push(_),S.push(D),R.push(k*(.97+t()*.06))}for(let A=0;A<i;A++){let C=n[A],b=n[(A+1)%i],_=Oc(C,b),D=p===0?E[A]:f[A]-.05-t()*.4;p===0&&f.push(D);let k=g.yTop+v[A],P=S[A],V=p===0?0:D,W=[C.x*g.sTop+_.x*V,g.yTop,C.z*g.sTop+_.z*V],X=[b.x*g.sTop+_.x*V,g.yTop,b.z*g.sTop+_.z*V],se=[b.x*P+_.x*D,k,b.z*P+_.z*D],$=[C.x*P+_.x*D,k,C.z*P+_.z*D];y.push([W,X,se,$]);let oe=R[A],he=t()*.06,_e=[o[0]*oe+he,o[1]*oe,o[2]*oe-he*.5],Be=(p===0?.25+t()*.4:.06*t())*c,nt=_e.map((de,be)=>Gn(de,a[be],Be)),Fe=_e.map((de,be)=>Gn(de*(p===0?.85:.7),l[be],e?p===0?.35:.85:p===0?.1:.45)),Je=Math.hypot(b.x-C.x,b.z-C.z),te=d[A]/3.2,Q=te+Je/3.2,xe=-g.yTop/3.2,we=-k/3.2;r.quad([W,X,se,$],[ls(nt[0],nt[1],nt[2]),ls(nt[0],nt[1],nt[2]),ls(Fe[0],Fe[1],Fe[2]),ls(Fe[0],Fe[1],Fe[2])],[[te,xe],[Q,xe],[Q,we],[te,we]])}for(let A=0;A<i;A++){let C=y[A],b=y[(A+1)%i],_=ls(o[0]*.7,o[1]*.7,o[2]*.7),D=ls(l[0],l[1],l[2]);r.quad([C[1],b[0],b[3],C[2]],[_,_,D,D],[[0,0],[.3,0],[.3,1],[0,1]])}});let m=n.map(g=>[g.x*.58,-12,g.z*.58]),x=ls(.2,.22,.28);for(let g=0;g<i;g++){let p=m[g],y=m[(g+1)%i];r.tri(p,y,[0,-17,0],x,x,x,[0,0],[0,0],[0,0])}return r.build()}function Ab(s,e=!1){let t=Mn(9),n=s.poly,i=n.length,r=Up(n),o=new fa,a=e?[1,.97,.9]:[.84,.8,.72],l=[.45,.56,.25],c=[];for(let h=0;h<i;h++){let u=.28+t()*.6,d=.03+t()*.09,f=(p,y)=>[n[h].x-r[h].x*p,y,n[h].z-r[h].z*p],m=wt(.5+.5*Math.sin(h*.61+1.7)*Math.cos(h*.23)+(t()-.5)*.5,0,1),x=.9+t()*.16,g=a.map((p,y)=>Gn(p*x,l[y],m*(e?.2:.75)));c.push({inner:f(u,.012),crest:f(u*.42,d),outer:f(0,0),c:g})}for(let h=0;h<i;h++){let u=c[h],d=c[(h+1)%i],f=(m,x)=>ls(m[0]*x,m[1]*x,m[2]*x);o.quad([u.inner,d.inner,d.crest,u.crest],[f(u.c,.95),f(d.c,.95),f(d.c,1.06),f(u.c,1.06)],[[0,0],[0,0],[0,0],[0,0]]),o.quad([u.crest,d.crest,d.outer,u.outer],[f(u.c,1.06),f(d.c,1.06),f(d.c,.88),f(u.c,.88)],[[0,0],[0,0],[0,0],[0,0]])}return o.build()}var Rb=()=>pt.myth?"mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), smoothstep(-30.0, 20.0, vHazeZ))":"mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), smoothstep(-30.0, 20.0, vHazeZ))";function Nc(s,e,t,n,i,r=!1){s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <project_vertex>",`#include <project_vertex>
  vec4 hazeW = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
  vHazeZ = hazeW.z;
  vHazeY = `+(r?"transformed.y;":"hazeW.y;")),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <fog_fragment>",["float hazeF = max(smoothstep(fogNear, fogFar, vFogDepth), smoothstep("+t.toFixed(2)+", "+n.toFixed(2)+", vHazeY) * "+i.toFixed(2)+");","gl_FragColor.rgb = mix(gl_FragColor.rgb, "+Rb()+", 1.0 - (1.0 - "+e.toFixed(2)+") * (1.0 - hazeF));"].join(`
`))};let o=pt.myth;return s.customProgramCacheKey=()=>`haze${e}_${t}_${n}_${i}_${r}_${o}`,s}function Bc(s){let e=Mn(s),t=new Ts(1,1),n=t.getAttribute("position"),i=new Map;for(let r=0;r<n.count;r++){let o=`${n.getX(r).toFixed(3)},${n.getY(r).toFixed(3)},${n.getZ(r).toFixed(3)}`,a=i.get(o);a===void 0&&(a=.8+e()*.38,i.set(o,a)),n.setXYZ(r,n.getX(r)*a,n.getY(r)*a,n.getZ(r)*a)}return t.computeVertexNormals(),t}function Cb(s){let e=Mn(61),t=s.poly,n=t.length,i=new fa,r=[.97,.92,.82],o=[.16,.14,.23],a=11,l=.05,c=u=>u>-5?1-.005*-u:.975-(-u-5)/8*.395,h=(u,d,f)=>{let m=Math.min(1,-d/a),x=r.map((g,p)=>Gn(g*u,o[p],Math.pow(m,1.4)*.85)*f);return ls(x[0],x[1],x[2])};for(let u=0;u<n;){let d=e()<.55?1:2,f=t[u],m=t[(u+d)%n],x=Oc(f,m),g=Math.hypot(m.x-f.x,m.z-f.z),p=l/g,y=1-l/g,E=-.03-e()*.05,v=0;for(;E>-a;){let S=.8+e()*.7,R=Math.max(-a,E-S),A=v===0?e()*.06:.08+e()*.32+Math.min(.2,v*.02),C=.85+e()*.2,b=(V,W,X)=>{let se=c(W),$=(f.x+(m.x-f.x)*V)*se+x.x*X,oe=(f.z+(m.z-f.z)*V)*se+x.z*X;return[$,W,oe]},_=E-l,D=R+l,k=[b(p,_,A),b(y,_,A),b(y,D,A),b(p,D,A)];i.quad(k,[h(C,_,1),h(C,_,1),h(C,D,1),h(C,D,1)],[[0,0],[g/3,0],[g/3,S/3],[0,S/3]]);let P=[b(p,_,0),b(y,_,0),b(y,_,A),b(p,_,A)];i.quad(P,[h(C,_,1.12),h(C,_,1.12),h(C,_,1.12),h(C,_,1.12)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([b(p,_,0),b(p,_,A),b(p,D,A),b(p,D,0)],[h(C,_,.7),h(C,_,.7),h(C,D,.7),h(C,D,.7)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([b(y,_,A),b(y,_,0),b(y,D,0),b(y,D,A)],[h(C,_,.7),h(C,_,.7),h(C,D,.7),h(C,D,.7)],[[0,0],[0,0],[0,0],[0,0]]),E=R,v++}u+=d}return i.build()}function Ib(s,e,t,n,i,r){let o=Mn(500+t),a=e.r*(1.7+o()*.4),l=new mt(e.r*.9,e.r*.98,a,48,4),c=l.getAttribute("position");for(let f=0;f<c.count;f++){let m=c.getX(f),x=c.getY(f),g=c.getZ(f),p=Math.atan2(g,m);if(Math.hypot(m,g)<1e-4)continue;let E=1-.05*Math.pow(.5+.5*Math.cos(p*24),3),v=x;x>a/2-.001&&(v=x-(.5+.5*Math.sin(p*3+t))*e.r*.35-o()*e.r*.05),c.setXYZ(f,m*E,v,g*E)}l.computeVertexNormals(),l.translate(0,a/2,0),i(l);let h=i(new sn({map:n,color:15920352})),u=new Ye(l,h);u.castShadow=!0,u.receiveShadow=!0,u.position.set(e.pos.x,0,e.pos.z),u.rotation.y=o()*6,u.name="rock-column",s.add(u);let d=new Ye(i(new mt(e.r*1.08,e.r*1.08,.18,32).translate(0,.09,0)),h);d.position.copy(u.position),d.receiveShadow=!0,d.castShadow=!0,s.add(d),r.push({x:e.pos.x,z:e.pos.z,mat:h,k:0})}function Hc(s,e,t){let n=new Jt;s.add(n);let i=[],r=k=>(i.push(k),k);s.background=new at(kp()),s.fog=new Oo(kp(),Mb,Sb);let o=pt.myth?new Or(10791124,8019008,1.3):new Or(13624063,9072210,1.7);n.add(o);let a=pt.myth?new Hr(16765594,4):new Hr(16773590,2.7);pt.myth?a.position.set(-15,8,7):a.position.set(-9,17,4),a.target.position.set(0,0,0),a.castShadow=!0,a.shadow.mapSize.set(t.shadowSize,t.shadowSize);let l=a.shadow.camera;l.left=-13.5,l.right=13.5,l.top=13.5,l.bottom=-13.5,l.near=4,l.far=48,pt.myth&&(l.left=-16,l.right=16,l.top=16,l.bottom=-16,l.far=60),a.shadow.bias=-4e-4,a.shadow.normalBias=.04,n.add(a,a.target);let c=r(pt.myth?Mp(e,t.groundTexSize):Ru(e,t.groundTexSize)),h=r(xp()),u=r(new sn({map:c})),d=null,f=r(new sn({vertexColors:!0,map:h,side:Cn,emissive:pt.myth?1381148:3946805})),m=r(new sn({vertexColors:!0,side:Cn,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),x=new Ye(r(wb(e)),u);x.receiveShadow=!0,n.add(x);let g=new Ye(r(Tb(e,pt.myth)),f);if(pt.myth){let k=new Ye(r(Cb(e)),r(new sn({vertexColors:!0})));k.receiveShadow=!0,n.add(k)}n.add(g);let p=new Ye(r(Ab(e,pt.myth)),m);p.receiveShadow=!0,n.add(p);{let k=Mn(13),P=e.poly,V=P.length,W=Up(P),X=70,se=r(new On(.09,.34,5).translate(0,.17,0)),$=r(new sn({flatShading:!0})),oe=new Dn(se,$,X),he=new Et,_e=new An,Be=new O,nt=new O,Fe=new at,Je=new O(0,1,0);for(let te=0;te<X;te++){let Q=Math.floor(k()*V),xe=.15+k()*1.1;nt.set(P[Q].x-W[Q].x*xe,.01,P[Q].z-W[Q].z*xe);let we=.55+k()*.6;Be.set(we,we*(.7+k()*.7),we),_e.setFromAxisAngle(Je,k()*6),he.compose(nt,_e,Be),oe.setMatrixAt(te,he);let de=.75+k()*.5;Fe.setRGB(.4*de,.55*de,.2*de,Vt),oe.setColorAt(te,Fe)}oe.receiveShadow=!0,n.add(oe)}let y=[],E=new at(16767392),v=pt.myth?r(Sp()):null;e.rocks.forEach((k,P)=>{if(e.kind==="altar"&&Lp(e,k))return;if(v){Ib(n,k,P,v,r,y);return}let V=Mn(100+P),W=new Jt,X=r(new sn({map:h,color:14867666,flatShading:!0}));y.push({x:k.pos.x,z:k.pos.z,mat:X,k:0});let se=r(new sn({color:7311164,flatShading:!0})),$=r(Bc(200+P)),oe=new Ye($,X);oe.scale.set(k.r*1,k.r*1.05,k.r*.95),oe.position.y=k.r*.62,oe.rotation.y=V()*6,oe.castShadow=!0,oe.receiveShadow=!0,W.add(oe);let he=new Ye($,se);he.scale.set(k.r*.72,k.r*.2,k.r*.7),he.position.y=k.r*1.5,he.rotation.y=V()*6,he.castShadow=!0,W.add(he);for(let _e=0;_e<4;_e++){let Be=_e/4*Math.PI*2+V(),nt=k.r*(.85+V()*.5),Fe=new Ye(r(Bc(300+P*10+_e)),X),Je=k.r*(.22+V()*.2);Fe.scale.set(Je,Je*.8,Je),Fe.position.set(Math.cos(Be)*nt,Je*.45,Math.sin(Be)*nt),Fe.rotation.y=V()*6,Fe.castShadow=!0,Fe.receiveShadow=!0,W.add(Fe)}W.position.set(k.pos.x,0,k.pos.z),n.add(W)});{let k=r(new mt(.8,1,1,6,1).translate(0,.5,0)),P=new mt(1,.7,1,6,3).translate(0,-.5,0);{let be=Mn(902),qe=P.getAttribute("position");for(let B=0;B<qe.count;B++){let vt=qe.getY(B);if(vt<-.05&&vt>-.95){let $e=.82+be()*.36;qe.setXYZ(B,qe.getX(B)*$e,vt,qe.getZ(B)*$e)}}P.computeVertexNormals()}r(P);let V=r(Bc(901)),W=Mn(78),X=new Et,se=new An,$=new O,oe=new O,he=new O(0,1,0),_e=new at;for(let be of[0,1,2]){let qe=Fp.pillars.filter((We,ze)=>We.tier===be&&(!pt.myth||ze%2===0)),B=qe[0].haze,vt=r(Nc(new sn({map:h,flatShading:!0,color:pt.myth?6972536:13683391}),B,be===0?-.15:-4,be===0?-.95:-17,be===0?1:.92,be===0)),$e=r(Nc(new sn({flatShading:!0,color:pt.myth?4608570:6982202}),B,-4,-17,.92)),Ge=new Dn(be===0?P:k,vt,qe.length),De=new Dn(V,$e,qe.length);qe.forEach((We,ze)=>{if(se.setFromAxisAngle(he,W()*3),We.len>0)oe.set(We.x,We.top,We.z),$.set(We.w,We.len,We.w);else{let Tt=Dp-22;oe.set(We.x,Tt,We.z),$.set(We.w,We.top-Tt,We.w)}X.compose(oe,se,$),Ge.setMatrixAt(ze,X);let tt=.82+W()*.3;Ge.setColorAt(ze,_e.setRGB(tt,tt*.98,tt*.95,Vt)),oe.set(We.x,We.top,We.z),$.set(We.w*.92,We.capH,We.w*.92),X.compose(oe,se,$),De.setMatrixAt(ze,X)}),Ge.frustumCulled=!1,De.frustumCulled=!1,n.add(Ge,De)}let Be=Fp.islets,nt=Be[0].haze,Fe=r(Bc(950)),Je=r(new On(1,1.9,7).rotateX(Math.PI).translate(0,-.95,0)),te=r(Nc(new sn({color:9077626,flatShading:!0}),nt,-6,-17,.9)),Q=r(Nc(new sn({color:6982202,flatShading:!0}),nt,-6,-17,.9)),xe=new Dn(Je,te,Be.length),we=new Dn(Fe,te,Be.length),de=new Dn(Fe,Q,Be.length);Be.forEach((be,qe)=>{se.setFromAxisAngle(he,W()*6),oe.set(be.x,be.y,be.z),$.set(be.s,be.s*.3,be.s),X.compose(oe,se,$),we.setMatrixAt(qe,X),oe.set(be.x,be.y+be.s*.12,be.z),$.set(be.s*.82,be.s*.16,be.s*.82),X.compose(oe,se,$),de.setMatrixAt(qe,X),oe.set(be.x,be.y-be.s*.05,be.z),$.set(be.s*.95,be.s,be.s*.95),X.compose(oe,se,$),xe.setMatrixAt(qe,X)});for(let be of[xe,we,de])be.frustumCulled=!1,n.add(be)}let S=r(yp());S.repeat.set(2.4,2.4);let R=[],A=new Ye(r(new Hn(400,400).rotateX(-Math.PI/2)),r(new gn({fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:pt.myth?"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), t); gl_FragColor = vec4(c, 1.0); }":"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), t); gl_FragColor = vec4(c, 1.0); }"})));A.position.y=Dp,n.add(A),[[-14,.12]].forEach(([k,P])=>{let V=r(new jt({map:S,transparent:!0,opacity:pt.myth?.07:P,depthWrite:!1,color:pt.myth?6973088:13229298})),W=new Ye(r(new Hn(260,260).rotateX(-Math.PI/2)),V);W.position.y=k,W.renderOrder=-5,n.add(W),R.push(W)});let C=r(Dc()),b=[];{let k=Mn(55);for(let P=0;P<(pt.myth?0:12);P++){let V=r(new bi({map:C,transparent:!0,opacity:.12+k()*.1,depthWrite:!1,color:14017782})),W=new ts(V),X=k()*Math.PI*2,se=15+k()*28;W.position.set(Math.cos(X)*se,-7-k()*9,Math.sin(X)*se);let $=14+k()*16;W.scale.set($,$*.55,1),n.add(W),b.push(W)}}let _=0,D=e.kind==="altar"?Pp(n,e,r,v):null;return{hitRock(k,P){let V=y[0],W=1/0;for(let X of y){let se=(X.x-k)**2+(X.z-P)**2;se<W&&(W=se,V=X)}V&&(V.k=1)},setVariant(k){if(pt.myth)return;let P=k==="v2"?d??(d=r(Ru(e,t.groundTexSize,!0))):c;u.map!==P&&(u.map=P,u.needsUpdate=!0)},update(k){_+=k;for(let P of y)P.k<=0||(P.k=Math.max(0,P.k-k/.35),P.mat.emissive.copy(E).multiplyScalar(.75*P.k*P.k));S.offset.set(_*.004,_*.002),R[R.length-1].position.x=Math.sin(_*.05)*4;for(let P=0;P<b.length;P++)b[P].position.x+=k*(.25+P%3*.12),b[P].position.x>48&&(b[P].position.x=-48)},root:n,altar:D,dispose(){for(let k of i)k.dispose();n.removeFromParent()}}}var Pb=new at(16777215),Lb=1.32,kb=1.18,Vc=1.55,Db=.55,Gc={0:{ring:3729663,armor:15134194,trim:2854822,cloth:3126728,skin:15122330,hair:16054008,dark:2765888,glow:5894399},1:{ring:16730685,armor:10234406,trim:4855060,cloth:8003356,skin:3811880,hair:8003356,dark:2824986,glow:16734780},2:{ring:16751150,armor:12740124,trim:5911572,cloth:9062932,skin:9067068,hair:3810322,dark:3023382,glow:16754746}},Fu=16730685,zp=2054758;function Np(s){return pt.myth&&s!==0?Fu:Gc[s].ring}function Bp(s){return pt.myth&&s!==0?Gc[1].glow:Gc[s].glow}var pa=class{constructor(e,t,n="default"){this.root=new Jt;this.ground=new Jt;this.pivot=new Jt;this.rig=new Jt;this.wpn=new Jt;this.legL=new Jt;this.legR=new Jt;this.cape=null;this.tail=null;this.halo=null;this.rim={uRimK:{value:0},uRimC:{value:new at}};this.identityMat=null;this.mats=[];this.ringMats=[];this.shadowMeshes=[];this.phase=0;this.lean=0;this.side=0;this.raise=0;this.crouch=0;this.lunge=0;this.bob=0;this.castT=99;this.castSkill=null;this.dustT=0;this.wasShadow=!0;this.pulseT=0;this.prevState="idle";this.weaponParts=[];this.xrayMat=null;this.xray=[];this.xrayOn=!1;this.fromLedge=!1;this.dropReason=null;this.ledgeEdge=null;this.shieldPivot=null;this.shieldMesh=null;this.shieldRest={x:0,y:0,z:0,rz:0};this.shieldMats=[];this.blockT=99;this.recoilT=99;this.airK=null;this.meleeT=99;this.meleeStep=1;this._gc=null;this.variant=t,this.look=n;let i=Gc[n!=="default"&&t===2?1:t];if(this.palette=i,this.rim.uRimC.value.setHex(i.ring),n!=="default"){this.buildMyth(e,n);return}let r=C=>{let b=new sn({color:C});return b.stencilWrite=!0,b.stencilRef=1,b.stencilFunc=Ar,b.stencilZPass=Ac,b.onBeforeCompile=_=>{_.uniforms.uRimK=this.rim.uRimK,_.uniforms.uRimC=this.rim.uRimC,_.fragmentShader=_.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},b.customProgramCacheKey=()=>"fighter-rim",this.mats.push(b),b},o=r(i.armor),a=r(i.trim),l=r(i.cloth),c=r(i.skin),h=r(i.hair),u=r(i.dark);this.glowMat=new jt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let d=(C,b,_,D,k,P,V=!0)=>{let W=new Ye(b,_);return W.position.set(D,k,P),W.castShadow=V,V&&this.shadowMeshes.push(W),C.add(W),W};for(let[C,b]of[[this.legL,-.13],[this.legR,.13]])C.position.set(0,.86,b),d(C,new mt(.085,.065,.66,8),u,0,-.33,0),d(C,new ft(.26,.12,.15),a,.05,-.74,0),this.rig.add(C);d(this.rig,new Dr(.2,.36,4,10),o,0,1.2,0).scale.set(.8,1,1.25),d(this.rig,new mt(.215,.215,.09,12),a,0,.96,0).scale.set(.82,1,1.28);for(let C of[-.27,.27])d(this.rig,new Rn(.14,10,8),a,0,1.46,C).scale.set(.9,.7,1);if(d(this.rig,new Rn(.17,14,12),c,.03,1.66,0),t===0){d(this.rig,new Rn(.2,14,12),h,-.03,1.7,0).scale.set(1,.92,1.04);let b=d(this.rig,new On(.1,.45,8),h,-.27,1.55,0);b.rotation.z=Math.PI/2+.5,this.tail=b,d(this.rig,new ft(.08,.06,.26),r(2808046),.14,1.67,0,!1)}else{d(this.rig,new Rn(.22,14,12),l,-.03,1.69,0).scale.set(1.05,.95,1.02);let b=d(this.rig,new On(.14,.4,8),l,-.25,1.6,0);b.rotation.z=Math.PI/2+.7,d(this.rig,new Rn(.12,10,8),u,.1,1.64,0,!1).scale.set(.8,1,1.15),d(this.rig,new ft(.06,.04,.16),this.glowMat,.17,1.66,0,!1)}let m=new Jt;m.position.set(-.17,1.5,0);let x=new mt(.22,.4,.95,4,1).rotateY(Math.PI/4);d(m,x,t===0?r(2340812):l,0,-.45,0).scale.set(.12,1,1),this.rig.add(m),this.cape=m,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let p=[];for(let C of[-.26,.26]){let b=d(this.wpn,new mt(.06,.05,.44,8),o,.17,-.05,C*.7);b.rotation.z=-Math.PI/2+.25,b.rotation.x=C>0?-.35:.35,p.push(b)}if(this.glowTip=new Ye(new Rn(.1,10,8),this.glowMat),t===0)d(this.wpn,new ft(.95,.13,.11),u,.62,-.08,.05),d(this.wpn,new ft(.3,.2,.09),a,.25,-.12,.05),d(this.wpn,new mt(.05,.05,.5,8),u,1.25,-.08,.05).rotation.z=Math.PI/2,d(this.wpn,new ft(.2,.05,.05),r(5894399),.72,0,.05,!1),this.glowTip.position.set(1.52,-.08,.05);else if(t===1){d(this.wpn,new mt(.035,.035,1.9,6),r(5913380),.65,-.07,.05).rotation.z=Math.PI/2;let C=d(this.wpn,new On(.1,.5,4),r(2763312),1.82,-.07,.05);C.rotation.z=-Math.PI/2,d(this.wpn,new _i(.08,.025,6,10),a,1.55,-.07,.05).rotation.y=Math.PI/2,this.glowTip.position.set(2.1,-.07,.05)}else d(this.wpn,new mt(.045,.045,1.4,6),r(4862496),.5,-.07,.05).rotation.z=Math.PI/2,d(this.wpn,new ft(.38,.34,.5),r(3747882),1.25,-.07,.05),d(this.wpn,new ft(.42,.1,.54),o,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);this.wpn.add(this.glowTip);for(let C of this.wpn.children)p.includes(C)||this.weaponParts.push(C);let y=new jt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),E=new jt({color:i.ring,transparent:!0,opacity:.2,depthWrite:!1,fog:!1});this.ringMats.push(y,E);let v=new Ye(new ai(.6,.7,40).rotateX(-Math.PI/2),y),S=new Ye(new ai(.7,.86,40).rotateX(-Math.PI/2),E);this.halo=S;let R=new Qt;R.setAttribute("position",new xt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),R.setIndex([0,2,1]),R.computeVertexNormals();let A=new Ye(R,new jt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,side:Cn,fog:!1}));this.ringMats.push(A.material);for(let C of[v,S,A])C.renderOrder=6,this.ground.add(C);e.add(this.root,this.ground)}buildMyth(e,t){let n=this.variant===0,i=this.palette,r=n?i.ring:Fu;this.rim.uRimC.value.setHex(r);let o=P=>(P.stencilWrite=!0,P.stencilRef=1,P.stencilFunc=Ar,P.stencilZPass=Ac,P.onBeforeCompile=V=>{V.uniforms.uRimK=this.rim.uRimK,V.uniforms.uRimC=this.rim.uRimC,V.fragmentShader=V.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},P.customProgramCacheKey=()=>"fighter-rim",this.mats.push(P),P),a=P=>o(new sn({color:P})),l=(P,V,W)=>o(new Fi({color:P,metalness:V,roughness:W})),c=n?l(13144383,.85,.32):l(4935512,.75,.45),h=n?l(8411178,.8,.45):l(2829619,.7,.55),u=new jt({color:n?1696754:16720916,fog:!1});this.identityMat=u;let d=a(n?38068:3025968),f=a(n?14264706:7228474),m=a(n?5913894:2366487),x=a(n?zp:13904416),g=a(n?zp:2762281),p=a(n?8018490:3812386);this.glowMat=new jt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let y=(P,V,W,X,se,$,oe=!0)=>{let he=new Ye(V,W);return he.position.set(X,se,$),he.castShadow=oe,oe&&this.shadowMeshes.push(he),P.add(he),he};for(let[P,V]of[[this.legL,-.13],[this.legR,.13]])P.position.set(0,.86,V),y(P,new mt(.085,.07,.66,8),n?f:h,0,-.33,0),y(P,new mt(.075,.08,.3,8),c,.01,-.5,0),y(P,new ft(.26,.12,.15),m,.05,-.74,0),this.rig.add(P);y(this.rig,new Dr(.2,.36,4,10),c,0,1.2,0).scale.set(.82,1,1.25),y(this.rig,new mt(.24,.3,.28,10),d,0,.94,0).scale.set(.85,1,1.2),y(this.rig,new mt(.225,.225,.09,12),u,0,1.04,0,!1).scale.set(.84,1,1.28);for(let P of[-.27,.27])y(this.rig,new Rn(.14,10,8),n?u:a(13114900),0,1.46,P).scale.set(.95,.7,1);y(this.rig,new Rn(.16,12,10),f,.04,1.65,0),y(this.rig,new Rn(.2,14,12,0,Math.PI*2,0,Math.PI*.62),n?l(1489104,.5,.35):c,-.01,1.66,0).scale.set(1.05,1,1.05),y(this.rig,new ft(.05,.14,.05),c,.19,1.64,0,!1),y(this.rig,new _i(.2,.055,6,14,Math.PI),n?x:u,-.01,1.78,0).scale.set(1.1,.9,.7);let v=new Jt;v.position.set(-.18,1.5,0),y(v,new mt(n?.24:.2,n?.46:.32,n?1.05:.7,4,1).rotateY(Math.PI/4),g,0,n?-.5:-.35,0).scale.set(.12,1,1),this.rig.add(v),this.cape=v,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let R=[];for(let P of[-.26,.26]){let V=y(this.wpn,new mt(.06,.05,.44,8),n?d:h,.17,-.05,P*.7);V.rotation.z=-Math.PI/2+.25,V.rotation.x=P>0?-.35:.35,R.push(V)}if(this.glowTip=new Ye(new Rn(.1,10,8),this.glowMat),t==="myth-archer"){let P=new Jt;P.name="bow",P.position.set(.5,-.02,.05);let V=y(P,new _i(.55,.03,6,20,Math.PI*.9),p,0,0,0);V.rotation.z=-Math.PI*.45,y(P,new mt(.008,.008,1.08,4),a(14209216),.55*Math.cos(Math.PI*.45),0,0,!1),y(P,new mt(.018,.018,.8,5),p,.25,0,0,!1).rotation.z=Math.PI/2,this.wpn.add(P),this.glowTip.position.set(.95,-.02,.05)}else if(this.variant===2&&t==="myth")y(this.wpn,new mt(.045,.045,1.4,6),p,.5,-.07,.05).rotation.z=Math.PI/2,y(this.wpn,new ft(.38,.34,.5),h,1.25,-.07,.05),y(this.wpn,new ft(.42,.1,.54),x,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);else{let P=t==="myth-shield"?1.5:2.2,V=y(this.wpn,new mt(.03,.03,P,6),p,P/2-.35,-.07,.05);V.rotation.z=Math.PI/2,V.name="spear";let W=y(this.wpn,new On(.075,.34,4),n?c:h,P-.18,-.07,.05);W.rotation.z=-Math.PI/2,this.glowTip.position.set(P+.02,-.07,.05)}this.wpn.add(this.glowTip);for(let P of this.wpn.children)R.includes(P)||this.weaponParts.push(P);if(n||t==="myth-shield"){let P=new Jt;if(P.name=n?"round-shield":"tower-shield",n)P.position.set(.3,1.18,-.2),P.rotation.z=.55,y(P,new mt(.5,.5,.05,28).rotateZ(Math.PI/2),c,0,0,0),y(P,new _i(.5,.05,6,28).rotateY(Math.PI/2),u,0,0,0,!1),y(P,new Rn(.1,10,8),u,.04,0,0,!1);else{P.position.set(.36,1.02,-.1),P.rotation.z=.25;let W=l(2829619,.7,.55),X=l(4935512,.75,.45),se=a(13904416);this.shieldMats.push(W,X,se),y(P,new ft(.07,1.25,.82),W,0,0,0),y(P,new ft(.08,1.31,.06),X,0,0,.41,!1),y(P,new ft(.08,1.31,.06),X,0,0,-.41,!1),y(P,new ft(.085,.86,.12),se,0,0,0,!1)}let V=new Jt;V.add(P),this.rig.add(V),this.shieldPivot=V,this.shieldMesh=P,this.shieldRest={x:P.position.x,y:P.position.y,z:P.position.z,rz:P.rotation.z},this.weaponParts.push(P)}let A=new jt({color:r,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),C=new jt({color:r,transparent:!0,opacity:.38,depthWrite:!1,fog:!1});this.ringMats.push(A,C);let b=new Ye(new ai(.55,.75,40).rotateX(-Math.PI/2),A),_=new Ye(new ai(.75,.95,40).rotateX(-Math.PI/2),C);this.halo=_;let D=new Qt;D.setAttribute("position",new xt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),D.setIndex([0,2,1]),D.computeVertexNormals();let k=new Ye(D,new jt({color:r,transparent:!0,opacity:.95,depthWrite:!1,side:Cn,fog:!1}));this.ringMats.push(k.material);for(let P of[b,_,k])P.renderOrder=6,this.ground.add(P);e.add(this.root,this.ground)}buildXray(){let e=new jt({color:this.look!=="default"&&this.variant!==0?Fu:this.palette.ring,transparent:!0,opacity:Db,depthFunc:Vr,depthWrite:!1,fog:!1,stencilWrite:!0,stencilRef:1,stencilFunc:iu,stencilFail:vi,stencilZFail:vi,stencilZPass:vi});this.xrayMat=e;let t=[];this.root.traverse(n=>{let i=n;i.isMesh&&!this.weaponParts.includes(i)&&t.push(i)});for(let n of t){let i=new Ye(n.geometry,e);i.visible=!1,i.renderOrder=30,n.add(i),this.xray.push(i)}}onMelee(e){this.meleeT=0,this.meleeStep=e}setAir(e){this.airK=e}onShieldBlock(){this.blockT=0}onRecoil(){this.recoilT=0}onLedgeDrop(e){this.fromLedge=!0,this.dropReason=e}update(e,t,n=!1){let i=this.palette,r=Math.hypot(e.moveVel.x,e.moveVel.z),o=e.state==="falling",a=e.state==="dead",l=e.state==="knocked",c=e.state==="ledge",h=e.state==="climb";c?(this.fromLedge=!0,this.dropReason=null):!o&&!l&&!a&&!h&&(this.fromLedge=!1),h&&e.stateT>=Bt.climb*.999&&(this.fromLedge=!1);let u=h?Ti(0,Bt.climb,e.stateT):0;this.root.position.set(e.pos.x,e.y,e.pos.z);let d=n&&e.state==="windup"&&e.windup?Math.atan2(e.windup.dir.z,e.windup.dir.x):e.facing;this.root.rotation.y=-d,this.ground.position.set(e.pos.x,.035,e.pos.z),this.ground.rotation.y=-d,this.ground.scale.setScalar(n?e.radius/.6:kb),this.halo&&this.halo.scale.setScalar(n?1.3:1),this.tail&&(this.tail.scale.setScalar(n?.55:1),this.tail.position.x=n?-.22:-.27),this.rim.uRimK.value=n?this.look!=="default"?this.variant===0?.5:.4:.9:0,this.castT+=t;let f=1;a&&(f=1-Ti(1,1.5,e.stateT)),e.y<-16&&(f=0),this.root.visible=f>.01,this.ground.visible=!o&&!a&&e.y>-.2&&!c&&!(h&&u<.6)&&!(l&&this.fromLedge),this.root.scale.setScalar(Math.max(f,.001)*Lb);let m=!o&&e.y>-.4&&!c&&!h&&!this.fromLedge;if(m!==this.wasShadow){for(let Q of this.shadowMeshes)Q.castShadow=m;this.wasShadow=m}let x=0,g=0,p=.05,y=0,E=0,v=0,S=e.windup,R=S?wt(S.t/Math.max(S.dur,.01),0,1):0,A=this.castT<.3?this.castT/.3:1;if(e.state==="windup"&&S&&(v=n?Math.max(.45,R):R,S.skill==="enemyHeavy"?(p=Gn(.05,2,Ti(0,.85,R)),x=Gn(0,.28,R),y=.04):S.skill==="enemyBasic"?(p=Gn(.05,.35,R),E=-.16*R,x=.1*R):S.skill==="control"?(p=Gn(.05,.22,R),E=-.1*R,x=.12*R,y=.05*R):(p=.3,E=-.12,x=.18)),this.castSkill&&this.castT<.45){let Q=1-A;this.castSkill==="enemyHeavy"?(p=Gn(-.45,2,Q*Q),x=Gn(-.35,.1,Q),E=.28*(1-Q)):(p=Gn(.05,.4,Q),E=.42*(1-Q),x=Gn(-.3,0,Q))}e.state==="recover"&&(x=Math.max(x,-.12)),this.blockT+=t,this.recoilT+=t,e.state==="hitstun"&&(this.recoilT<.35?(x=-.75,p=.9,y=0,E=-.25):(x=-.3,p=-.35,y=.05)),(e.state==="charge"||e.state==="windup"&&S?.skill==="charge")&&(x=.5,y=.12,E=.15,p=-.2),e.state==="guard"&&(p=-.3,x=.06,y=.06);let C=e.state==="windup"&&S&&(S.skill==="melee1"||S.skill==="melee2"||S.skill==="melee3")?S.skill:null;(C==="melee1"||C==="melee2")&&(E=-.12*R,p=.05);let b=(e.breakT??0)>0;if(b&&(x=.18,p=-.5),e.state==="dash"&&(x=-.42,y=.1,E=.12,p=.2),l){let Q=Math.hypot(e.knockVel.x,e.knockVel.z)||1,xe=(e.knockVel.x*Math.cos(e.facing)+e.knockVel.z*Math.sin(e.facing))/Q,we=(-e.knockVel.x*Math.sin(e.facing)+e.knockVel.z*Math.cos(e.facing))/Q,de=.62*Ti(0,.08,e.stateT);x=-de*xe,g=de*we,p=-.9,y=.06}let _=e.sinceShotT<.4?Math.exp(-e.sinceShotT*18):0;E-=_*.2,p+=_*.14,e.burstLeft>0&&(p=Math.max(p,.1),x=Math.max(x,.06));let D=n&&e.state==="windup"&&this.prevState!=="windup";this.prevState=e.state;let k=D?1:jr(e.state==="windup"||this.castT<.45||l?30:16,t);this.lean+=(x-this.lean)*k,this.side+=(g-this.side)*k,this.raise+=(p-this.raise)*k,this.crouch+=(y-this.crouch)*k,this.lunge+=(E-this.lunge)*k;let P=!o&&!a&&!l&&r>.15&&e.state!=="dash";P&&(this.phase+=t*(6+r*1.7));let V=P?wt(r/5,.25,1)*.75:0,W=Math.sin(this.phase)*V,X=P?Math.abs(Math.sin(this.phase))*.05:0;this.bob+=(X-this.bob)*jr(20,t);let se=o?Math.sin(e.stateT*22)*.6:l?.55:e.state==="dash"?.9:0;if(this.legL.rotation.z=P?W:se,this.legR.rotation.z=P?-W:-se*(o?1:-.4),this.pivot.position.set(this.lunge,.9-this.crouch+this.bob,0),this.pivot.rotation.set(0,0,0),this.pivot.rotation.z=-this.lean,this.pivot.rotation.x=this.side,this.wpn.rotation.z=this.raise,this.wpn.position.x=.04+(_>0?-_*.12:0)+(e.state==="windup"&&S&&S.skill!=="enemyHeavy"?-.08*R:0),this.meleeT+=t,this.wpn.rotation.y=0,C==="melee3"&&(this.wpn.rotation.y=.9*R),this.meleeT<.2&&(this.meleeStep===3?this.wpn.rotation.y=Gn(.9,-.9,wt(this.meleeT/.14,0,1)):this.wpn.position.x+=.42*(1-wt(this.meleeT/.18,0,1))),b&&(this.pivot.rotation.x+=Math.sin(this.pulseT*14)*.12,this.pivot.rotation.z+=Math.cos(this.pulseT*11)*.08),c){let Q=Ti(Bt.protect,Bt.hold,e.stateT),xe=e.stateT;this.pivot.position.set(-.04+Math.sin(xe*38)*.025*Q,.9-Vc,0),this.pivot.rotation.set(Math.sin(xe*3.2)*.05,0,-.12),this.wpn.rotation.z=1.35+Math.sin(xe*30)*.06*Q,this.wpn.position.x=.04,this.legL.rotation.z=.12+Math.sin(xe*5)*(.1+.25*Q),this.legR.rotation.z=-.08+Math.sin(xe*5+1.4)*(.1+.25*Q)}else if(h){let Q=Math.sin(u*Math.PI);this.pivot.position.set(.06*Q,.9-Vc*(1-u)+Q*.22,0),this.pivot.rotation.set(0,0,-.5*Q),this.wpn.rotation.z=Gn(1.35,.05,u),this.legL.rotation.z=-.9*Q,this.legR.rotation.z=-.7*Q}else if(o&&this.fromLedge)this.pivot.position.y=.9-Vc,this.dropReason==="timeout"?(this.pivot.rotation.set(e.stateT*1.2,0,e.stateT*.5),this.wpn.rotation.z=1.5,this.legL.rotation.z=.2,this.legR.rotation.z=-.2):this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(l&&this.fromLedge)this.pivot.position.y=.9-Vc;else if(o)this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(a){let Q=Ti(0,.3,e.stateT);this.pivot.rotation.set(0,0,Q*(Math.PI/2)),this.pivot.position.y=.9-Q*.6,this.legL.rotation.z=Q*.3,this.legR.rotation.z=Q*-.2,this.wpn.rotation.z=-.4*Q}if(this.shieldPivot&&this.shieldMesh){let Q=e.shieldDir,xe=e.state==="guard"&&e.shieldUp!==!1,we=Q?Math.atan2(Q.z,Q.x)-d:0,de=this.shieldMesh;this.shieldPivot.rotation.y=Q&&(xe||this.look==="myth-shield")?-we:0,xe?(de.position.set(.58,1.25,0),de.rotation.z=.3):b?(de.position.set(this.shieldRest.x+.12,.5,this.shieldRest.z-.12),de.rotation.z=-1):e.state==="charge"&&this.variant===0?(de.position.set(.42,1.15,0),de.rotation.z=.2):(de.position.set(this.shieldRest.x,this.shieldRest.y,this.shieldRest.z),de.rotation.z=this.shieldRest.rz)}let $=c||h&&u<.8||this.fromLedge;for(let Q of this.weaponParts)Q.visible=!$;let oe=c||h;if(oe&&!this.xrayMat&&this.buildXray(),oe!==this.xrayOn){for(let Q of this.xray)Q.visible=oe;this.xrayOn=oe}if(this.cape){let Q=Math.sin(this.phase*.9+1.3)*.06*wt(r/5,0,1);this.cape.rotation.z=-(.12+wt(r/6,0,1)*.42+(e.state==="dash"?.45:0)+Q+(o?.7:0)),this.cape.rotation.x=Math.sin(this.phase*.5)*.04,c&&(this.cape.rotation.z=-.05,this.cape.rotation.x=Math.sin(e.stateT*3.2)*.06)}let he=wt(e.hitFlashT*10,0,1),_e=v*.2,Be=this.glowColor(i.glow),nt=c&&e.stateT<Bt.protect?.22*(1-Ti(Bt.protect*.7,Bt.protect,e.stateT)):(e.protectT??0)>0?.3:0,Fe=(e.armorT??0)>0?.22+.12*Math.sin(this.pulseT*20):0;for(let Q of this.mats)Q.emissive.setRGB(he*.95+Be[0]*_e+nt+Fe,he*.95+Be[1]*_e+nt*.9+Fe*.35,he*.95+Be[2]*_e+nt*.6+Fe*.1);if(this.blockT<.15){let Q=1.1*(1-this.blockT/.15);for(let xe of this.shieldMats)xe.emissive.setRGB(xe.emissive.r+Q,xe.emissive.g+Q,xe.emissive.b+Q)}let Je=wt(v+_*1.2+(this.castT<.25?.8:0),0,1);this.glowMat.opacity=.35+Je*.65,this.glowTip.scale.setScalar(.7+Je*1.5),this.glowMat.color.setHex(i.glow).lerp(Pb,Je*.5),this.pulseT+=t;let te=e.state==="windup"?.7+.3*Math.sin(this.pulseT*30):1;if(this.ringMats[0].opacity=.95*te,this.airK!==null){let Q=this.airK;Q<.5?(this.pivot.rotation.set(0,0,-1.2*Ti(.05,.35,Q)),this.wpn.rotation.z=1.1):(this.pivot.rotation.set(0,0,.12),this.legL.rotation.z=.35,this.legR.rotation.z=-.35,this.wpn.rotation.z=.9),this.ground.visible=!1}if(e.state==="reviving")this.root.visible=!1,this.ground.visible=!1;else if((e.protectT??0)>0&&this.root.visible){let Q=Math.floor(this.pulseT*12)%2===0;this.root.visible=Q}}glowColor(e){if(!this._gc){let t=new at(e);this._gc=[t.r,t.g,t.b]}return this._gc}wantDust(e,t){return e.state!=="knocked"?(this.dustT=0,!1):(this.dustT-=t,this.dustT<=0?(this.dustT=.045,!0):!1)}tipWorld(e){return this.root.updateMatrixWorld(!0),this.glowTip.getWorldPosition(e)}dispose(){for(let e of[this.root,this.ground])e.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose()});for(let e of this.mats)e.dispose();this.glowMat.dispose(),this.xrayMat?.dispose(),this.identityMat?.dispose();for(let e of this.ringMats)e.dispose();this.root.removeFromParent(),this.ground.removeFromParent()}};var Fb=`
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
}`,Ub=`
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
}`,ma=class{constructor(e,t){this.n=0;this.cap=e,this.p=new Float32Array(e*3),this.v=new Float32Array(e*3),this.s=new Float32Array(e*4),this.c=new Float32Array(e*4),this.l=new Float32Array(e*4),this.fl=new Uint8Array(e);let n=new Hn(1,1);this.geo=new sa,this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.geo.setAttribute("uv",n.getAttribute("uv")),this.aPosSize=new Di(new Float32Array(e*4),4),this.aColor=new Di(new Float32Array(e*4),4),this.aShape=new Di(new Float32Array(e*2),2);for(let i of[this.aPosSize,this.aColor,this.aShape])i.setUsage(Rc);this.geo.setAttribute("aPosSize",this.aPosSize),this.geo.setAttribute("aColor",this.aColor),this.geo.setAttribute("aShape",this.aShape),this.geo.instanceCount=0,this.mat=new gn({vertexShader:Fb,fragmentShader:Ub,transparent:!0,depthWrite:!1,blending:t?Mi:Qi,fog:!1}),this.mesh=new Ye(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:15}get count(){return this.n}spawn(e){if(this.n>=this.cap)return;let t=this.n++;this.p[t*3]=e.x,this.p[t*3+1]=e.y,this.p[t*3+2]=e.z,this.v[t*3]=e.vx??0,this.v[t*3+1]=e.vy??0,this.v[t*3+2]=e.vz??0,this.s[t*4]=e.size,this.s[t*4+1]=e.size1??e.size,this.s[t*4+2]=e.aspect??1,this.s[t*4+3]=e.crisp??0,this.c[t*4]=e.color[0],this.c[t*4+1]=e.color[1],this.c[t*4+2]=e.color[2],this.c[t*4+3]=e.alpha??1,this.l[t*4]=0,this.l[t*4+1]=e.life,this.l[t*4+2]=e.gravity??0,this.l[t*4+3]=e.drag??0,this.fl[t]=e.floor===!1?0:1}update(e){let t=0;for(;t<this.n;){let o=t*4,a=t*3;if(this.l[o]+=e,this.l[o]>=this.l[o+1]){this.remove(t);continue}let l=Math.exp(-this.l[o+3]*e);this.v[a]*=l,this.v[a+1]=this.v[a+1]*l-this.l[o+2]*e,this.v[a+2]*=l,this.p[a]+=this.v[a]*e,this.p[a+1]+=this.v[a+1]*e,this.p[a+2]+=this.v[a+2]*e,this.fl[t]&&this.p[a+1]<.03&&this.l[o+2]>0&&this.p[a+1]>-1&&(this.p[a+1]=.03,this.v[a+1]*=-.25,this.v[a]*=.6,this.v[a+2]*=.6),t++}let n=this.aPosSize.array,i=this.aColor.array,r=this.aShape.array;for(let o=0;o<this.n;o++){let a=this.l[o*4]/this.l[o*4+1];n[o*4]=this.p[o*3],n[o*4+1]=this.p[o*3+1],n[o*4+2]=this.p[o*3+2],n[o*4+3]=this.s[o*4]+(this.s[o*4+1]-this.s[o*4])*a,i[o*4]=this.c[o*4],i[o*4+1]=this.c[o*4+1],i[o*4+2]=this.c[o*4+2];let l=1-a;i[o*4+3]=this.c[o*4+3]*l*(a<.08?a/.08+.2:1),r[o*2]=this.s[o*4+2],r[o*2+1]=this.s[o*4+3]}this.aPosSize.needsUpdate=!0,this.aColor.needsUpdate=!0,this.aShape.needsUpdate=!0,this.geo.instanceCount=this.n}clear(){this.n=0,this.geo.instanceCount=0}remove(e){let t=--this.n;e!==t&&(this.p.copyWithin(e*3,t*3,t*3+3),this.v.copyWithin(e*3,t*3,t*3+3),this.s.copyWithin(e*4,t*4,t*4+4),this.c.copyWithin(e*4,t*4,t*4+4),this.l.copyWithin(e*4,t*4,t*4+4),this.fl[e]=this.fl[t])}dispose(){this.geo.dispose(),this.mat.dispose()}},ga=class{constructor(e,t){this.n=0;this.m=new Et;this.col=new at;this.X=new O;this.Y=new O;this.Z=new O;this.P=new O;this.view=new O(0,-1,-1).normalize();this.cap=e;let n=new jt({map:t,transparent:!0,depthWrite:!1,blending:Mi,fog:!1});this.mesh=new Dn(new Hn(1,1),n,e),this.mesh.instanceMatrix.setUsage(Rc),this.mesh.frustumCulled=!1,this.mesh.renderOrder=22,this.mesh.count=0,this.mesh.setColorAt(0,this.col.setRGB(1,1,1))}begin(){this.n=0}push(e,t,n,i,r,o){if(this.n>=this.cap||o<=.003)return;this.X.copy(t).normalize(),this.Y.crossVectors(this.X,this.view),this.Y.lengthSq()<1e-6&&this.Y.set(0,1,0),this.Y.normalize(),this.Z.crossVectors(this.X,this.Y).normalize(),this.P.copy(e).addScaledVector(this.X,-n/2),this.m.makeBasis(this.X.multiplyScalar(n),this.Y.multiplyScalar(i),this.Z),this.m.setPosition(this.P),this.mesh.setMatrixAt(this.n,this.m),this.col.setRGB(r[0],r[1],r[2],Vt).multiplyScalar(o);let a=this.mesh.instanceColor.array;a[this.n*3]=this.col.r,a[this.n*3+1]=this.col.g,a[this.n*3+2]=this.col.b,this.n++}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};var zu=.05,Hp=`
varying vec2 vP;
void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,zb=`
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
}`,Nb=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Bb=`
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
}`,Ob=`
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
}`,Wc=class{constructor(e,t){this.items=[];this.used=0;let n=new Hn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uHalf:{value:.8},uProgress:{value:1},uAlpha:{value:1},uTime:{value:0},uBase:{value:.16},uEdge:{value:0}},o=new gn({vertexShader:Hp,fragmentShader:zb,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ye(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=.16,h=0){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e,zu,t),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,i),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uHalf.value=r,u.u.uProgress.value=o,u.u.uAlpha.value=l,u.u.uBase.value=c,u.u.uEdge.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Uu=class{constructor(e,t){this.items=[];this.used=0;let n=new Hn(1,1).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uAlpha:{value:1},uFill:{value:1},uSoft:{value:1},uBase:{value:.2}},o=new gn({vertexShader:Nb,fragmentShader:Bb,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ye(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=1,h=.2){if(this.used>=this.items.length)return;let u=this.items[this.used++];u.mesh.visible=!0,u.mesh.position.set(e+Math.cos(n)*i*.5,zu,t+Math.sin(n)*i*.5),u.mesh.rotation.y=-n,u.mesh.scale.set(i,1,r),u.u.uColor.value.set(a[0],a[1],a[2]),u.u.uFill.value=o,u.u.uAlpha.value=l,u.u.uSoft.value=c,u.u.uBase.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},va=class{constructor(e,t){this.items=[];this.used=0;let n=new Hn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,0,0)},uProgress:{value:0},uAlpha:{value:1}},o=new gn({vertexShader:Hp,fragmentShader:Ob,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ye(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o){if(this.used>=this.items.length)return;let a=this.items[this.used++];a.mesh.visible=!0,a.mesh.position.set(e,zu,t),a.mesh.scale.set(n,1,n),a.u.uColor.value.set(r[0],r[1],r[2]),a.u.uProgress.value=i,a.u.uAlpha.value=o}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Hb=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Vb=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uTime;
varying vec2 vUv;
void main() {
  float x = abs(vUv.x - 0.5) * 2.0;
  float core = pow(max(1.0 - x, 0.0), 3.0);
  float halo = pow(max(1.0 - x, 0.0), 1.1) * 0.6;
  float fadeTop = pow(1.0 - vUv.y, 1.3);
  float band = 0.8 + 0.2 * sin((vUv.y * 7.0 - uTime * 1.6) * 6.2831);
  float a = (core + halo) * fadeTop * band * uAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.6), a);
}`;function Op(s){let t=document.createElement("canvas");t.width=128,t.height=128;let n=t.getContext("2d");n.fillStyle="rgba(20,16,30,0.72)",n.beginPath(),n.arc(128/2,128/2,128*.46,0,Math.PI*2),n.fill(),n.lineWidth=5,n.strokeStyle=s==="coins"?"#ffd25a":"#ff6b6b",n.stroke(),s==="coins"?(n.fillStyle="#ffc83d",n.beginPath(),n.arc(128/2,128*.4,128*.2,0,Math.PI*2),n.fill(),n.lineWidth=4,n.strokeStyle="#a8761c",n.beginPath(),n.arc(128/2,128*.4,128*.13,0,Math.PI*2),n.stroke()):(n.fillStyle="#ff4d5e",n.beginPath(),n.moveTo(64,53.76+15.36*1.6),n.bezierCurveTo(64-15.36*2.2,53.76+15.36*.2,64-15.36*1.2,53.76-15.36*1.6,64,53.76-15.36*.5),n.bezierCurveTo(64+15.36*1.2,53.76-15.36*1.6,64+15.36*2.2,53.76+15.36*.2,64,53.76+15.36*1.6),n.fill()),n.fillStyle="#fff6e0",n.font=`800 ${128*.2}px "Segoe UI",system-ui,sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(s==="coins"?"+3":"+30%",128/2,128*.76);let i=new ns(t);return i.colorSpace=Vt,i}var xa=class{constructor(e,t){this.beams=[];this.icons=[];this.time=0;let n=new Hn(2.6,10).translate(0,5,0);for(let i=0;i<t;i++){let r={uColor:{value:new O(1,.94,.78)},uAlpha:{value:1},uTime:{value:0}},o=new gn({vertexShader:Hb,fragmentShader:Vb,uniforms:r,transparent:!0,depthWrite:!1,blending:Mi,fog:!1,side:Cn}),a=new Ye(n,o);a.visible=!1,a.renderOrder=7,a.frustumCulled=!1,e.add(a),this.beams.push({mesh:a,u:r})}this.rings=new va(e,t),this.iconMats={coins:new bi({map:Op("coins"),depthTest:!1,transparent:!0,fog:!1}),heal:new bi({map:Op("heal"),depthTest:!1,transparent:!0,fog:!1})};for(let i=0;i<t;i++){let r=new ts(this.iconMats.coins);r.visible=!1,r.renderOrder=9,r.scale.setScalar(1.5),e.add(r),this.icons.push(r)}}iconOf(e){let t=this.icons[e];return t&&t.visible?t.name==="icon-heal"?"heal":"coins":"none"}update(e,t,n){this.time+=n,this.rings.begin();for(let i=0;i<this.beams.length;i++){let r=this.beams[i],o=e[i];r.mesh.visible=!!o;let a=this.icons[i],l=o&&(o.reward==="coins"||o.reward==="heal")?o.reward:null;if(a.visible=!!l,l&&(a.material=this.iconMats[l],a.name=`icon-${l}`,a.position.set(o.pos.x,3+Math.sin(this.time*2+i)*.12,o.pos.z)),!o)continue;r.mesh.position.set(o.pos.x,0,o.pos.z),r.mesh.rotation.y=Math.atan2(t.position.x-o.pos.x,t.position.z-o.pos.z);let c=Math.max(0,Math.min(1,o.progress));r.u.uTime.value=this.time*(1+c*2),r.u.uAlpha.value=.75+.25*c+.1*Math.sin(this.time*4),this.rings.push(o.pos.x,o.pos.z,1,c,[1,.86+.14*c,.55+.45*c],.85+.15*c)}this.rings.end()}},Xc=class{constructor(e){this.sectors=new Wc(e,5),this.flashes=new Wc(e,4),this.strips=new Uu(e,8)}};var Nu=48,Gb=40,ya=class{constructor(e){this.parent=e;this.flyPool=[];this.flying=[];this.m=new Et;this.q=new An;this.s=new O;this.p=new O;this.up=new O(0,1,0);this.t=0;this.last=new Map;this.coinGeo=new mt(.34,.34,.08,20).rotateZ(Math.PI/2),this.coinMat=new Fi({color:16762941,metalness:.75,roughness:.28,emissive:9066496}),this.coins=new Dn(this.coinGeo,this.coinMat,Nu),this.coins.name="coins",this.coins.castShadow=!0,this.coins.frustumCulled=!1,this.ringMat=new jt({color:16765530,transparent:!0,opacity:.85,depthWrite:!1,fog:!1}),this.rings=new Dn(new ai(.38,.56,24).rotateX(-Math.PI/2),this.ringMat,Nu),this.rings.name="coin-rings",this.rings.renderOrder=6,this.rings.frustumCulled=!1,this.coins.count=0,this.rings.count=0,e.add(this.coins,this.rings)}flyMesh(e){let t=this.flyPool.find(n=>!n.visible);return t||(this.flyPool.length>=Gb?t=this.flyPool[0]:(t=new Ye(this.coinGeo,this.coinMat),t.frustumCulled=!1,this.parent.add(t),this.flyPool.push(t))),t.name=e,t.visible=!0,t}pickup(e){let t=this.flyMesh("fx-coin-pickup");this.flying.push({mesh:t,from:new O(e.x,.45,e.z),age:0,dur:.25,delay:0})}collect(e){e.forEach((t,n)=>{let i=this.last.get(t);if(!i)return;let r=this.flyMesh("fx-coin-collect");this.flying.push({mesh:r,from:new O(i.x,.45,i.z),age:0,dur:.45,delay:n*.04})})}update(e,t,n){this.t+=n;let i=Math.min(e.length,Nu);this.last.clear();for(let r=0;r<i;r++){let o=e[r];this.last.set(o.id,{x:o.pos.x,z:o.pos.z});let a=.45+Math.sin(this.t*3+o.id)*.08;this.q.setFromAxisAngle(this.up,this.t*2.6+o.id),this.m.compose(this.p.set(o.pos.x,a,o.pos.z),this.q,this.s.set(1,1,1)),this.coins.setMatrixAt(r,this.m);let l=1+Math.sin(this.t*4+o.id)*.08;this.m.compose(this.p.set(o.pos.x,.04,o.pos.z),this.q.identity(),this.s.set(l,1,l)),this.rings.setMatrixAt(r,this.m)}this.coins.count=i,this.rings.count=i,this.coins.instanceMatrix.needsUpdate=!0,this.rings.instanceMatrix.needsUpdate=!0;for(let r=this.flying.length-1;r>=0;r--){let o=this.flying[r];o.age+=n;let a=Math.min(1,Math.max(0,(o.age-o.delay)/o.dur)),l=t??{x:o.from.x,y:o.from.y+6,z:o.from.z},c=a*a;o.mesh.position.set(o.from.x+(l.x-o.from.x)*c,o.from.y+(l.y-o.from.y)*c+Math.sin(a*Math.PI)*.8,o.from.z+(l.z-o.from.z)*c),o.mesh.rotation.y=this.t*10,o.mesh.scale.setScalar(1-.5*a),a>=1&&(o.mesh.visible=!1,this.flying.splice(r,1))}}get shown(){return this.coins.count}clear(){this.coins.count=0,this.rings.count=0;for(let e of this.flying)e.mesh.visible=!1;this.flying.length=0,this.last.clear()}};var Vp=2*Math.PI*15,Wb="#ffe6a3",Gp="render-overlay-style",qc=class{constructor(e){this.root=e;this.bars=new Map;this.arrows=new Map;this.ledgeRings=new Map;this.breakMarks=new Map;this.cloud=null;this.labels=new Map;this.rewards=[];this.clock=0;this.nums=[];this.w=852;this.h=393;if(e.style.pointerEvents="none",e.style.overflow="hidden",!document.getElementById(Gp)){let t=document.createElement("style");t.id=Gp,t.textContent=`
        .ro-abs{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
        .ro-bar{background:rgba(6,12,20,.78);border:1px solid rgba(0,0,0,.55);border-radius:3px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.45)}
        .ro-bar>div{position:absolute;left:0;top:0;bottom:0;display:block;transform-origin:0 50%}
        .ro-num{font:800 16px/1 "Segoe UI",system-ui,-apple-system,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.5);white-space:nowrap}
        .ro-arrow{width:0;height:0}
        .ro-ledge{width:0;height:0}
        .ro-ledge>svg{position:absolute;overflow:visible;filter:drop-shadow(0 0 2px rgba(0,0,0,.85))}
        .ro-arrow>i{position:absolute;left:-13px;top:-11px;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:20px solid #ff4a3d;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}
      `,document.head.appendChild(t)}for(let t=0;t<18;t++){let n=document.createElement("div");n.className="ro-abs ro-num",n.style.opacity="0",e.appendChild(n),this.nums.push({el:n,x:0,z:0,y:0,age:0,life:.8,active:!1,drift:0,ox:0,oy:0,rise:46})}}resize(e,t){this.w=e,this.h=t}spawnNumber(e,t,n,i,r,o){let a=this.nums.find(l=>!l.active)??this.nums.reduce((l,c)=>l.age>c.age?l:c);a.active=!0,a.age=0,a.life=.85,a.x=e.x,a.z=e.z,a.y=t,o?(a.drift=0,a.ox=o.x,a.oy=o.y,a.rise=14):(a.ox=0,a.oy=0,a.rise=46,a.drift=(Math.random()-.5)*22),a.el.textContent=n,a.el.style.color=Au(i),a.el.style.fontSize=`${Math.round(r)}px`}makeBar(e){let t=document.createElement("div");t.className="ro-abs ro-bar";let n=document.createElement("div"),i=document.createElement("div");return n.style.background="#fff",n.style.opacity="0.85",i.style.background=e==="player"?"linear-gradient(#7ff6ff,#27c6dc)":"linear-gradient(#ff6a5c,#d12c26)",t.appendChild(n),t.appendChild(i),this.root.appendChild(t),{el:t,fill:i,lag:n,lagV:1,team:e}}makeArrow(){let e=document.createElement("div");return e.className="ro-abs ro-arrow",e.appendChild(document.createElement("i")),this.root.appendChild(e),e}makeLedgeRing(){let e=document.createElement("div");e.className="ro-abs ro-ledge";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-20 -20 40 40");let i=document.createElementNS(t,"circle"),r=document.createElementNS(t,"circle");for(let o of[i,r])o.setAttribute("r","15"),o.setAttribute("fill","none");return i.setAttribute("stroke","rgba(0,0,0,0.45)"),i.setAttribute("stroke-width","6"),r.setAttribute("stroke-width","4"),r.setAttribute("stroke-linecap","round"),r.setAttribute("transform","rotate(-90)"),r.setAttribute("stroke-dasharray",String(Vp)),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,arc:r,base:i}}updateLedge(e,t,n){this.clock+=n;let i=new Set,r=Math.round(wt(this.h*.095,30,72));for(let o of e){if(o.state!=="ledge")continue;i.add(o.id);let a=this.ledgeRings.get(o.id);a||(a=this.makeLedgeRing(),this.ledgeRings.set(o.id,a));let l=wt(1-o.stateT/Bt.hold,0,1),c=o.stateT<Bt.protect,h=!c&&l<.375,u=c?Wb:Au(Np(o.variant));a.arc.setAttribute("stroke",u),a.arc.setAttribute("stroke-dashoffset",(Vp*(1-l)).toFixed(2)),a.arc.setAttribute("stroke-width",h?"5.5":"4"),a.arc.dataset.left=l.toFixed(4),a.arc.dataset.phase=c?"protect":"hold";let d=h?1+.12*Math.abs(Math.sin(this.clock*26)):1,f=t(o.pos,.15),m=a.el.firstChild;m.setAttribute("width",String(r)),m.setAttribute("height",String(r)),m.style.left=`${-r/2}px`,m.style.top=`${-r/2}px`,a.el.style.opacity="1",a.el.style.transform=`translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[o,a]of this.ledgeRings)i.has(o)||(a.el.remove(),this.ledgeRings.delete(o))}makeBreakMark(){let e=document.createElement("div");e.className="ro-abs ro-break",e.style.width="0",e.style.height="0";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-12 -13 24 26"),n.style.position="absolute",n.style.overflow="visible",n.style.filter="drop-shadow(0 0 2px rgba(0,0,0,.9))";let i=document.createElementNS(t,"path");i.setAttribute("d","M0 -11 L10 -7 L9 3 Q6 9 0 12 Q-6 9 -9 3 L-10 -7 Z"),i.setAttribute("stroke","rgba(0,0,0,.6)"),i.setAttribute("stroke-width","1.5");let r=document.createElementNS(t,"path");return r.setAttribute("d","M1 -11 L-2 -4 L3 0 L-1 5 L1 12"),r.setAttribute("fill","none"),r.setAttribute("stroke","rgba(20,16,24,.95)"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linejoin","round"),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,svg:n}}updateBreakMarks(e,t,n){let i=null;for(let a of e)(a.counterT??0)>0&&a.counterTargetId!=null&&(i=a.counterTargetId);let r=new Set,o=Math.round(wt(this.h*.06,18,44));for(let a of e){if(!((a.breakT??0)>0)||a.state==="dead"||a.state==="falling")continue;r.add(a.id);let l=this.breakMarks.get(a.id);l||(l=this.makeBreakMark(),this.breakMarks.set(a.id,l));let c=a.id===i,h=t(a.pos,n?n(a):2.25),u=Math.round(wt(this.h*.11,38,92)),d=c?1+.18*Math.abs(Math.sin(this.clock*12)):1;l.svg.firstChild.setAttribute("fill",c?"#ffc23a":"#e9e6df"),l.el.dataset.mark=c?"counter":"break",l.svg.setAttribute("width",String(o)),l.svg.setAttribute("height",String(Math.round(o*1.08))),l.svg.style.left=`${-o/2}px`,l.svg.style.top=`${-o*.54}px`,l.el.style.opacity=h.visible?"1":"0",l.el.style.transform=`translate3d(${(h.x-u/2-o*.55).toFixed(1)}px,${h.y.toFixed(1)}px,0) scale(${d.toFixed(3)})`}for(let[a,l]of this.breakMarks)r.has(a)||(l.el.remove(),this.breakMarks.delete(a))}setClouds(e,t){if(e<=.001){this.cloud&&(this.cloud.style.opacity="0");return}if(!this.cloud){let i=document.createElement("div");i.className="ro-cloud",i.style.cssText="position:absolute;inset:0;z-index:5;pointer-events:none;will-change:opacity,background-position;background-color:#d9d3e6;background-image:radial-gradient(ellipse 38% 20% at 30% 40%,rgba(246,243,250,.95),rgba(246,243,250,0) 70%),radial-gradient(ellipse 34% 18% at 72% 58%,rgba(240,236,247,.9),rgba(240,236,247,0) 70%),radial-gradient(ellipse 46% 20% at 52% 50%,rgba(196,188,214,.7),rgba(196,188,214,0) 70%),radial-gradient(ellipse 40% 20% at 18% 55%,rgba(250,248,252,.85),rgba(250,248,252,0) 70%);background-size:100% 160%,100% 140%,100% 180%,100% 150%;background-repeat:repeat-y;",this.root.appendChild(i),this.cloud=i}let n=Math.max(0,t)*this.h*2.2;this.cloud.style.opacity=e.toFixed(3),this.cloud.style.backgroundPosition=`0 ${(-n).toFixed(1)}px,0 ${(-n*1.4).toFixed(1)}px,0 ${(-n*.8).toFixed(1)}px,0 ${(-n*1.8).toFixed(1)}px`}spawnReward(e,t,n){let i=this.rewards.find(o=>!o.active);if(!i){let o=document.createElement("div");o.className="ro-abs ro-reward",o.style.cssText+=';z-index:4;font:900 22px/1 "Segoe UI",system-ui,-apple-system,sans-serif;white-space:nowrap;text-shadow:0 1px 0 #000,0 0 4px #000,0 0 8px rgba(0,0,0,.6);opacity:0',this.root.appendChild(o),i={el:o,x:0,z:0,age:0,life:1.4,active:!1},this.rewards.push(i)}i.active=!0,i.age=0,i.x=e.x,i.z=e.z;let r='<i style="display:inline-block;width:.8em;height:.8em;border-radius:50%;margin-right:.18em;vertical-align:-.06em;background:radial-gradient(circle at 40% 35%,#fff0a8,#e2a226 70%);box-shadow:0 0 0 2px #7a4e0e"></i>';i.el.innerHTML=t==="coins"?`${r}+${n}`:`<b style="color:#ff5d6c;margin-right:.12em">\u2665</b>+${n}`,i.el.style.color=t==="coins"?"#ffd65a":"#8dff9a",i.el.style.fontSize=`${Math.round(wt(this.h*.065,20,44))}px`,i.el.dataset.fx=`reward-${t}`,i.el.dataset.active="1"}setLabels(e,t){let n=new Set,i=Math.round(wt(this.h*.032,11,22));for(let r of e){n.add(r.key);let o=this.labels.get(r.key);if(!o){o=document.createElement("div"),o.className="ro-abs ro-label",o.dataset.label=r.key,o.style.cssText+=';display:flex;align-items:center;gap:.3em;padding:.22em .55em .22em .35em;border-radius:.5em;background:rgba(11,20,34,.78);border:1px solid rgba(255,255,255,.22);color:#f2f4f8;font:700 13px/1 "Segoe UI",system-ui,-apple-system,sans-serif;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.45)',o.innerHTML=`<i style="display:block;width:1.25em;height:1.25em;color:${r.color}">${r.svg}</i><span>${r.text}</span>`;let l=o.querySelector("svg");l&&(l.style.width="100%",l.style.height="100%",l.style.display="block"),this.root.appendChild(o),this.labels.set(r.key,o)}o.style.fontSize=`${i}px`,o.style.opacity=r.visible?"1":"0",o.dataset.active=r.visible?"1":"0";let a=r.x;if(t){let l=o.offsetWidth/2+4;a=wt(a,t.left+l,this.w-t.right-l)}o.style.transform=`translate3d(${a.toFixed(1)}px,${r.y.toFixed(1)}px,0) translate(-50%,-50%)`}for(let[r,o]of this.labels)n.has(r)||(o.style.opacity="0",o.dataset.active="0")}updateRewards(e,t){for(let n of this.rewards){if(!n.active)continue;if(n.age+=t,n.age>=n.life){n.active=!1,n.el.style.opacity="0",n.el.dataset.active="0";continue}let i=n.age/n.life,r=e({x:n.x,z:n.z},2.6),o=i<.1?.6+i/.1*.6:1.2-Math.min(.2,i-.1);n.el.style.opacity=String(i<.65?1:1-(i-.65)/.35),n.el.style.transform=`translate3d(${r.x.toFixed(1)}px,${(r.y-50*(1-Math.pow(1-i,2))).toFixed(1)}px,0) translate(-50%,-50%) scale(${o.toFixed(2)})`}}update(e,t,n,i){this.rewards.length&&this.updateRewards(t,n),this.updateLedge(e,t,n),(this.breakMarks.size||e.some(l=>(l.breakT??0)>0))&&this.updateBreakMarks(e,t,i);let r=new Set,o=Math.round(wt(this.h*.11,38,92)),a=Math.round(wt(this.h*.017,5,9));for(let l of e){r.add(l.id);let c=this.bars.get(l.id);c||(c=this.makeBar(l.team),this.bars.set(l.id,c));let h=l.state!=="dead"&&l.state!=="falling"&&l.state!=="reviving"&&l.hp>0,u=t(l.pos,i?i(l):2.25),d=h&&u.visible;if(c.el.style.opacity=d?"1":"0",d){let f=wt(l.hp/l.maxHp,0,1);c.lagV=f>=c.lagV?f:Math.max(f,c.lagV-n*.7),c.el.style.width=`${o}px`,c.el.style.height=`${a}px`,c.el.style.transform=`translate3d(${Math.round(u.x-o/2)}px,${Math.round(u.y-a/2)}px,0)`,c.fill.style.width=`${(f*100).toFixed(1)}%`,c.lag.style.width=`${(c.lagV*100).toFixed(1)}%`}if(l.team==="enemy"){let f=this.arrows.get(l.id);f||(f={el:this.makeArrow(),id:l.id},this.arrows.set(l.id,f));let m=t(l.pos,1),x=10;if(h&&(m.x<x||m.x>this.w-x||m.y<x||m.y>this.h-x||!m.visible)){let p=this.w/2,y=this.h/2,E=m.x-p,v=m.y-y;Math.abs(E)<.001&&Math.abs(v)<.001&&(v=-1);let S=26,R=Math.min((p-S)/Math.max(Math.abs(E),.001),(y-S)/Math.max(Math.abs(v),.001)),A=p+E*R,C=y+v*R,b=Math.atan2(v,E);f.el.style.opacity="1",f.el.style.transform=`translate3d(${A.toFixed(1)}px,${C.toFixed(1)}px,0) rotate(${b}rad)`}else f.el.style.opacity="0"}}for(let[l,c]of this.bars)r.has(l)||(c.el.remove(),this.bars.delete(l));for(let[l,c]of this.arrows)r.has(l)||(c.el.remove(),this.arrows.delete(l));for(let l of this.nums){if(!l.active)continue;if(l.age+=n,l.age>=l.life){l.active=!1,l.el.style.opacity="0";continue}let c=l.age/l.life,h=t({x:l.x,z:l.z},l.y),u=l.rise*(1-Math.pow(1-c,2)),d=c<.12?.7+c/.12*.6:1.3-Math.min(.3,(c-.12)*.7);l.el.style.opacity=String(c<.6?1:1-(c-.6)/.4),l.el.style.transform=`translate3d(${(h.x+l.drift*c+l.ox).toFixed(1)}px,${(h.y-u+l.oy).toFixed(1)}px,0) translate(-50%,-50%) scale(${d.toFixed(2)})`}}clear(){for(let e of this.ledgeRings.values())e.el.remove();this.ledgeRings.clear();for(let e of this.breakMarks.values())e.el.remove();this.breakMarks.clear();for(let e of this.rewards)e.active=!1,e.el.style.opacity="0",e.el.dataset.active="0";for(let e of this.nums)e.active=!1,e.el.style.opacity="0";for(let e of this.bars.values())e.el.remove();for(let e of this.arrows.values())e.el.remove();this.bars.clear(),this.arrows.clear()}dispose(){this.clear();for(let e of this.nums)e.el.remove()}};var Yc=class extends ki{constructor(){super();let e=new ft;e.deleteAttribute("uv");let t=new Fi({side:Fn}),n=new Fi,i=new na(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new Ye(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Dn(e,n,6),a=new yn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Ye(e,Qr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Ye(e,Qr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Ye(e,Qr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new Ye(e,Qr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Ye(e,Qr(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Ye(e,Qr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Qr(s){return new sn({color:0,emissive:16777215,emissiveIntensity:s})}var $c=38,cs=51*Math.PI/180,Xb=pt.near?12.5:15.3,qb=pt.near?22.1*(12.5/15.3):22.1,Wp=.6,Yb=2.6,Yp=218,$p=154,$b=(Yp-$p)/2,Js=dn(5239039),vn=[1,1,1],js=dn(16726832),Wn=dn(16747050),Kb=[.72,.74,.78],Xp=dn(12098936),eo=dn(9077624),Qs=[.86,.87,.9],Zb=dn(16773572),Jb=dn(15260868),Ni=dn(16758062),jb=dn(16773824),Qb=dn(16764774),qp=dn(16765530),e_=dn(9306010),Bu=dn(16773320),t_=dn(5922408),Bi={melee:[2.2,2.4,2],sweepHalf:70*Math.PI/180,charge:4,bash:3.2,bashHalf:40*Math.PI/180,guardHalf:70*Math.PI/180};function to(s,e,t,n,i,r){let o=r;for(let a of s){let l=e-a.pos.x,c=t-a.pos.z,h=l*n+c*i,u=l*l+c*c-a.r*a.r,d=h*h-u;if(d<0)continue;let f=-h-Math.sqrt(d);f>0&&f<o&&(o=f)}return o}function Kp(s,e,t){let n=t,i=0,r=Math.min(window.devicePixelRatio||1,2),o=new Lc({canvas:s,antialias:r<2,powerPreference:"high-performance",alpha:!1,stencil:!0});o.setPixelRatio(r),o.shadowMap.enabled=!0,o.shadowMap.type=kl,o.outputColorSpace=Vt;let a=()=>{o.toneMapping=pt.myth?Hl:Si,o.toneMappingExposure=pt.myth?1.22:1};pt.myth&&a(),typeof window<"u"&&(window.__THREE_GAME_DIAGNOSTICS__={renderer:o.info});let l=new ki,c=/iPhone|iPad|Android/i.test(navigator.userAgent),h={shadowSize:c?1536:2048,groundTexSize:c?1024:2048},u=Hc(l,n,h),d=new Map,f=w=>`${w.poly.length}:${w.poly[0].x.toFixed(3)},${w.poly[0].z.toFixed(3)}:${w.rocks.map(F=>`${F.pos.x.toFixed(2)},${F.pos.z.toFixed(2)},${F.r}`).join(";")}`,m=f(t),x=(w,F)=>`${w?"m":"b"}|${f(F)}`;d.set(x(pt.myth,n),{world:u,background:l.background,fog:l.fog});let g=null,p=()=>{if(!g){let w=new Zr(o);g=w.fromScene(new Yc,.04).texture,w.dispose()}return g},y=()=>{l.environment=pt.myth?p():null,l.environmentIntensity=.7};pt.myth&&y();function E(w){let F=new ki;return{world:Hc(F,w,h),background:F.background,fog:F.fog}}function v(w,F){if(w.world===u){n=F;return}let N=u;u.root.removeFromParent(),l.add(w.world.root),l.background=w.background,l.fog=w.fog,u=w.world,n=F,L.clear();for(let[M,I]of d)I.world===N&&!M.endsWith(`|${m}`)&&(N.dispose(),d.delete(M))}function S(w){pt.myth=w;let F=x(w,n),N=d.get(F);N||(N=E(n),d.set(F,N)),v(N,n),a(),y();for(let M of We.values())M.dispose();We.clear()}let R=null,A=[],C=null,b=null,_=0;function D(w){if(f(w)===f(n)){n=w,R=null;return}R&&f(R.isl)===f(w)||(R={isl:w,stage:0,slot:null})}function k(w){let F=R;if(!F)return;let N=x(pt.myth,F.isl);for(;;){if(F.stage===0)F.slot=d.get(N)??null,F.slot||(F.slot=E(F.isl),d.set(N,F.slot)),F.stage=1;else if(F.stage===1){let M=new ki;M.add(F.slot.world.root),M.environment=l.environment,M.environmentIntensity=l.environmentIntensity,M.fog=F.slot.fog,o.compile(M,Fe),F.slot.world.root.traverse(I=>{let H=I.material;for(let Y of Array.isArray(H)?H:H?[H]:[])for(let ee of Object.values(Y))ee&&ee.isTexture&&o.initTexture(ee)}),F.slot.world.root.removeFromParent(),F.stage=2}else{if(w&&_<.95)return;A.push({inAir:w,cover:_}),v(F.slot,F.isl),R=null;return}if(w)return}}let P=w=>w<.3?V(.08,.3,w):1-V(.68,.92,w);function V(w,F,N){let M=wt((N-w)/(F-w),0,1);return M*M*(3-2*M)}function W(w,F,N){if(F<.5){let H=N??w.pos,Y=Math.hypot(H.x,H.z)||1,ee=2.2*V(0,.5,F),K=F<.2?1.1*Math.sin(F/.2*(Math.PI/2)):1.1-Math.pow((F-.2)/.3,2)*9;return{pos:{x:H.x+H.x/Y*ee,z:H.z+H.z/Y*ee},y:K}}let M=nh(w.pos,n.poly)&&Ft(w.pos,n.poly)>2,I=(1-F)/.5;return{pos:M?w.pos:{x:0,z:0},y:9*I*I}}let X=new Map,se=w=>{if(!pt.myth)return"default";let F=X.get(w.id);return F||(w.kit==="shieldbearer"?"myth-shield":w.kit==="archer"?"myth-archer":"myth")},$=[],oe=new Map,he=[],_e=null,Be=new Map,nt=!0,Fe=new Tn($c,16/9,1,220);Fe.rotation.set(-cs,0,0);let Je=new Tn($c,16/9,1,220);Je.rotation.set(-cs,0,0);let te=new O(0,-Math.sin(cs),-Math.cos(cs)),Q=new O(1,0,0),xe=new O(0,Math.cos(cs),-Math.sin(cs)),we=new ma(900,!0),de=new ma(520,!1),be=new ga(200,bp()),qe=new ga(40,_p());be.view.copy(te),qe.view.copy(te);let B=new Xc(l);l.add(de.mesh,we.mesh,be.mesh,qe.mesh);let vt=[];{let w=new ai(.86,1,56).rotateX(-Math.PI/2);for(let F=0;F<10;F++){let N=new jt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:Mi,fog:!1}),M=new Ye(w,N);M.visible=!1,M.renderOrder=7,M.frustumCulled=!1,l.add(M),vt.push({mesh:M,mat:N,age:0,life:1,r0:0,r1:1,alpha:1,on:!1})}}let $e=[],Ge=[],De=new qc(e),We=new Map,ze=new Map,tt=s.clientWidth||window.innerWidth||852,Tt=s.clientHeight||window.innerHeight||393,Xt=-.8,z=new Pe(0,Xt),T=0,j=0,le=0,ue=new Pe,ae=0,Ke=1,me=0,Ae=new O,Ie=new O,ge=new O;function Re(w){let F=Math.tan($c*Math.PI/360);return Math.max(Xb/2/F,qb/2/(w*F))}function et(w,F,N,M,I=0,H=0){w.position.set(F+I,M*Math.sin(cs)+H,N+M*Math.cos(cs)),w.updateMatrixWorld(!0)}function Ze(w,F){tt=Math.max(1,w),Tt=Math.max(1,F),o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),o.setSize(tt,Tt,!1);for(let M of[Fe,Je])M.aspect=tt/Tt,M.updateProjectionMatrix();De.resize(tt,Tt);let N=Re(tt/Tt);et(Fe,z.x,z.y,N),et(Je,z.x,z.y,N)}function Te(w,F=0){return ge.set(w.x,F,w.z).project(Fe),{x:(ge.x*.5+.5)*tt,y:(-ge.y*.5+.5)*Tt,visible:ge.z<1&&ge.x>=-1&&ge.x<=1&&ge.y>=-1&&ge.y<=1}}function ht(w,F){let N=w/tt*2-1,M=-(F/Tt)*2+1;if(Ae.set(N,M,.5).unproject(Je),Ie.copy(Ae).sub(Je.position),Ie.y>-1e-6)return null;let I=-Je.position.y/Ie.y;return I>0?{x:Je.position.x+Ie.x*I,z:Je.position.z+Ie.z*I}:null}let G=()=>Math.random(),q=(w,F)=>w+(F-w)*G();function ye(w,F,N,M,I,H,Y){let ee=vt.find(K=>!K.on)??vt[0];ee.on=!0,ee.age=0,ee.life=I,ee.r0=N,ee.r1=M,ee.alpha=Y,ee.mesh.position.set(w,.09,F),ee.mat.color.setRGB(H[0],H[1],H[2],Vt),ee.mesh.visible=!0}function Ce(w,F,N,M,I,H=.1,Y=1){we.spawn({x:w,y:F,z:N,size:M,size1:M*.25,color:I,life:H,alpha:Y})}function fe(w,F,N,M,I,H,Y,ee){for(let K=0;K<M;K++){let pe;Y?pe=Math.atan2(-Y.z,-Y.x)+(G()-.5)*ee:pe=G()*Math.PI*2;let ke=I*q(.4,1);we.spawn({x:w,y:F,z:N,vx:Math.cos(pe)*ke,vy:q(.5,4),vz:Math.sin(pe)*ke,size:q(.07,.16),size1:.02,color:G()<.35?vn:H,life:q(.18,.42),gravity:9,drag:2.5})}}function re(w,F,N,M,I,H=1.2){for(let Y=0;Y<N;Y++){let ee=G()*Math.PI*2,K=q(.3,1)*M;de.spawn({x:w+Math.cos(ee)*.15,y:.12,z:F+Math.sin(ee)*.15,vx:Math.cos(ee)*K,vy:q(.2,1)*H,vz:Math.sin(ee)*K,size:I*q(.5,.9),size1:I*q(1.4,2),color:Xp,alpha:.55,life:q(.4,.8),drag:3.2})}}function Oe(w,F,N,M,I,H){for(let Y=0;Y<M;Y++){let ee=G()*Math.PI*2,K=H*q(.3,1);de.spawn({x:w,y:F,z:N,vx:Math.cos(ee)*K,vy:q(2,6),vz:Math.sin(ee)*K,size:q(.06,.13),size1:.05,color:I.map(pe=>pe*q(.6,1.1)),alpha:1,life:q(.5,.9),gravity:16,drag:.6,crisp:1})}}function Qe(w,F,N,M,I,H,Y,ee,K=.2){let pe=Y?Math.atan2(-Y.z*Math.sin(cs),-Y.x):0;for(let ke=0;ke<M;ke++){let ut=Y?pe+(G()-.5)*ee:ke/M*Math.PI*2+G()*.5,Rt=new O().copy(Q).multiplyScalar(Math.cos(ut)).addScaledVector(xe,Math.sin(ut));$e.push({x:w,y:F,z:N,dir:Rt,r1:I*q(.7,1.2),len0:I*.3,len1:I*q(.6,1),width:q(.1,.2),age:0,life:K*q(.8,1.2),color:H})}}function St(w,F,N,M){de.spawn({x:w,y:1.05,z:F,size:N*1.4,size1:N*.6,color:Ni,alpha:.95,life:.2});for(let I=0;I<M;I++){let H=G()*Math.PI*2,Y=q(3,8);de.spawn({x:w,y:q(.7,1.4),z:F,vx:Math.cos(H)*Y,vy:q(.5,3.5),vz:Math.sin(H)*Y,size:q(.12,.24),size1:.05,color:Ni,alpha:1,life:q(.22,.36),gravity:9,drag:3,crisp:1})}}function At(w,F,N,M){for(let I=0;I<M;I++){let H=q(.6,2.2);de.spawn({x:w-N.x*q(0,.25),y:q(-.05,.1),z:F-N.z*q(0,.25),vx:-N.x*H+q(-.6,.6),vy:q(.5,2.5),vz:-N.z*H+q(-.6,.6),size:q(.06,.12),size1:.05,color:eo.map(Y=>Y*q(.7,1.1)),alpha:1,life:q(.6,1),gravity:16,drag:.4,crisp:1,floor:!1})}}function In(w){return w.state==="ledge"?1.25:w.state==="climb"?1.25+(2.25-1.25)*wt(w.stateT/Bt.climb,0,1):2.25}function Un(w){return w?dn(Bp(w.variant)):Js}function rn(w){return!w||w.team==="player"?Js:pt.myth?js:w.variant===2?Wn:js}let jn=[];function Oi(w,F){let N=null,M=1/0;for(let I of jn){if(I.kind!==w)continue;let H=(I.x-F.x)**2+(I.z-F.z)**2;H<M&&(M=H,N=I.ownerId)}return N}function Ls(w,F,N){let M=w.targetId===F.playerId,{x:I,z:H}=w.pos,Y=1,ee=w.dir,K=0,pe=14678783,ke=rn(N.get(w.sourceId));switch(w.kind){case"basic":Ce(I,Y,H,.7,ke,.09),fe(I,Y,H,6,6,ke,ee,2.4),Qe(I,Y,H,4,.9,ke,ee,2.2,.16),K=.07,pe=13629951;break;case"control":Ce(I,Y,H,1.3,ke,.14),fe(I,Y,H,12,8,ke,ee,3.4),Qe(I,Y,H,7,1.7,ke,ee,3.6,.22),ye(I,H,.3,1.2,.26,ke,.6),K=.2,pe=8057599;break;case"push":Ce(I,Y,H,1.9,vn,.16),fe(I,Y,H,16,9,ke,null,6.3),Qe(I,Y,H,10,2.4,ke,null,6.3,.26),ye(I,H,.4,2.2,.32,ke,.7),re(I,H,9,3.2,.7),K=.42,pe=16777215;break;case"enemyBasic":Ce(I,Y,H,.8,Wn,.1),fe(I,Y,H,8,6,Wn,ee,2.6),Qe(I,Y,H,5,1.1,Wn,ee,2.4,.18),K=M?.14:0,pe=16739162;break;case"enemyHeavy":Ce(I,Y,H,2,Wn,.16),fe(I,Y,H,16,9,Wn,null,6.3),Qe(I,Y,H,10,2.5,Wn,null,6.3,.26),ye(I,H,.4,2.9,.38,Wn,.95),re(I,H,10,3.4,.75),Oe(I,.5,H,6,eo,4),K=M?.6:.3,pe=16739162;break;case"melee1":case"melee2":Ce(I,Y,H,.8,vn,.09),fe(I,Y,H,7,6,ke,ee,2.4),Qe(I,Y,H,5,1,ke,ee,2.2,.16),K=.08;break;case"melee3":Ce(I,Y,H,1.2,vn,.11),fe(I,Y,H,11,7,ke,ee,3),Qe(I,Y,H,7,1.5,ke,ee,3,.2),K=.16;break;case"charge":Ce(I,Y,H,1.7,vn,.14),fe(I,Y,H,14,8,ke,ee,3.6),Qe(I,Y,H,9,2,ke,ee,3.6,.24),ye(I,H,.4,1.8,.3,ke,.7),re(I,H,8,2.6,.65),K=.3;break;case"counterBash":case"counterMelee":{let xn=w.kind==="counterBash";Ce(I,Y,H,xn?1.8:1.1,vn,.12),fe(I,Y,H,xn?14:9,8,Ni,ee,3.2),Qe(I,Y,H,xn?9:6,xn?2:1.4,Ni,ee,3.2,.22),St(I,H,xn?1.2:.8,xn?18:10),K=xn?.34:.16,pe=16769162;break}}w.knock>.2&&re(I,H,4,1.6,.55,.6),T=Math.min(1,T+K),M&&(pe=16739162);let ut=wt(Tt/393,.9,1.8),Rt=N.get(w.targetId);if(pt.myth&&Rt){let xn=N.get(w.sourceId),ei=xn&&Math.sign(Te(Rt.pos).x-Te(xn.pos).x)||1,ui=wt(Tt*.04,14,30);De.spawnNumber(Rt.pos,In(Rt),String(Math.round(w.dmg)),pe,wt(14+w.dmg*.9,15,30)*ut*.62,{x:ei*ui*1.2,y:-ui*1.6})}else De.spawnNumber(w.pos,1.9,String(Math.round(w.dmg)),pe,wt(14+w.dmg*.9,15,30)*ut)}function us(w,F,N){for(let M of w)switch(M.type){case"shoot":{let I=N.get(M.ownerId),H=Un(I),Y=M.pos.x+M.dir.x*.15,ee=M.pos.z+M.dir.z*.15;Ce(Y,1.1,ee,.6,H,.07);for(let K=0;K<3;K++){let pe=Math.atan2(M.dir.z,M.dir.x)+(G()-.5)*.7,ke=q(3,7);we.spawn({x:Y,y:1.1,z:ee,vx:Math.cos(pe)*ke,vy:q(-.5,1),vz:Math.sin(pe)*ke,size:.09,size1:.02,color:H,life:.14,drag:3})}break}case"hit":Ls(M,F,N),pt.myth&&M.knock>.2&&Be.set(M.targetId,{x:M.pos.x,z:M.pos.z,age:0,color:rn(N.get(M.sourceId))});break;case"cast":{let I=N.get(M.ownerId),H=We.get(M.ownerId);H&&(H.castT=0,H.castSkill=M.skill);let Y=M.skill==="enemyHeavy",ee=Y?an.range:Kt.range,K=Y?an.halfAngle:Kt.halfAngle,pe=Math.atan2(M.dir.z,M.dir.x),ke=I?I.pos.x:M.pos.x,ut=I?I.pos.z:M.pos.z;Ge.push({x:ke,z:ut,angle:pe,range:ee,half:K,color:Y?Wn:rn(I),age:0,life:.22});for(let Rt=0;Rt<7;Rt++){let xn=pe+(G()-.5)*K*1.8,ei=ee*q(.5,.95);re(ke+Math.cos(xn)*ei,ut+Math.sin(xn)*ei,1,1,Y?.7:.5,.5)}Y&&(ye(ke+Math.cos(pe)*ee*.55,ut+Math.sin(pe)*ee*.55,.3,ee*.8,.3,Wn,.6),T=Math.min(1,T+.12));break}case"dash":{let I=N.get(M.ownerId),H=Un(I),Y=5;for(let ee=0;ee<Y;ee++){let K=ee/(Y-1)*Pn.distance;we.spawn({x:M.from.x+M.dir.x*K,y:.95,z:M.from.z+M.dir.z*K,size:.62,size1:.5,aspect:2.7,color:H,alpha:.5-ee*.04,life:.26+ee*.045})}re(M.from.x,M.from.z,6,2.2,.5,.4);break}case"blocked":{let{x:I,z:H}=M.pos,Y=M.kind==="enemyBasic"?Wn:rn(N.get(Oi(M.kind,M.pos)??-1));Ce(I,.9,H,.5,Y,.08),Oe(I,.9,H,10,eo,4.5),re(I,H,3,1.2,.45,.6),fe(I,.9,H,5,5,Y,null,6.3);break}case"blockedStrike":{let I=M.skill==="enemyHeavy"?Wn:rn(N.get(M.ownerId)),{x:H,z:Y}=M.pos;u.hitRock(H,Y),Ce(H,1.15,Y,2.2,vn,.14),Ce(H,1.15,Y,1.4,I,.24,.85),fe(H,1.15,Y,22,8,I,M.dir,3.4),Qe(H,1.15,Y,10,2.1,Zb,M.dir,3.8,.4),Oe(H,1,Y,22,eo,6),re(H,Y,7,2,.7,.9);break}case"expire":{let I=M.kind==="enemyBasic"?Wn:rn(N.get(Oi(M.kind,M.pos)??-1));fe(M.pos.x,.95,M.pos.z,4,2.2,I,null,6.3);break}case"ledgeGrab":{let I=We.get(M.ownerId);I&&(I.ledgeEdge={x:M.edge.x,z:M.edge.z});let H=M.inward.z,Y=-M.inward.x;for(let ee=0;ee<10;ee++){let K=(ee%2?1:-1)*q(.35,1.3),pe=M.edge.x+H*K,ke=M.edge.z+Y*K;de.spawn({x:pe,y:.1,z:ke,vx:H*Math.sign(K)*q(.6,1.6)-M.inward.x*.4,vy:q(.4,1.2),vz:Y*Math.sign(K)*q(.6,1.6)-M.inward.z*.4,size:q(.35,.6),size1:q(.8,1.2),color:Jb,alpha:.75,life:q(.45,.8),drag:3})}At(M.edge.x,M.edge.z,M.inward,14);for(let ee of[-1,1])fe(M.edge.x+H*ee*.3,.12,M.edge.z+Y*ee*.3,4,3,vn,null,6.3);break}case"ledgeClimb":{let I=M.to.x-M.from.x,H=M.to.z-M.from.z,Y=Math.hypot(I,H)||1;re(M.from.x+I/Y*Bt.hangOut,M.from.z+H/Y*Bt.hangOut,5,1.2,.5,.6);break}case"ledgeDrop":{let I=We.get(M.ownerId);I?.onLedgeDrop(M.reason);let H=I?.ledgeEdge,Y=N.get(M.ownerId);if(H&&Y){let ee=H.x-Y.pos.x,K=H.z-Y.pos.z,pe=Math.hypot(ee,K)||1;At(H.x,H.z,{x:ee/pe,z:K/pe},M.reason==="knocked"?12:7),M.reason==="timeout"&&re(H.x,H.z,4,.8,.4,.3)}break}case"melee":{We.get(M.ownerId)?.onMelee(M.step);let I=N.get(M.ownerId),H=M.counter?Ni:rn(I),Y=Math.atan2(M.dir.z,M.dir.x),ee=I?I.pos.x:M.pos.x,K=I?I.pos.z:M.pos.z;M.step===3?Ge.push({x:ee,z:K,angle:Y,range:Bi.melee[2],half:Bi.sweepHalf,color:H,age:0,life:.16}):$.push({x:ee,z:K,dx:M.dir.x,dz:M.dir.z,len:Bi.melee[M.step-1],age:0,life:.13,color:H});break}case"shieldBlock":{let{x:I,z:H}=M.pos;if(M.kind==="bearer")We.get(M.targetId)?.onShieldBlock(),gt(M.pos,M.dir),T=Math.min(1,T+.12);else if(M.kind==="perfect")St(I,H,1.3,30),Qe(I,1.1,H,10,1.9,Ni,null,6.3,.26),ye(I,H,.3,1.6,.28,Ni,.8),T=Math.min(1,T+.12);else for(let Y=0;Y<9;Y++){let ee=Math.atan2(-M.dir.z,-M.dir.x)+(G()-.5)*2.4,K=q(2.5,6);de.spawn({x:I,y:q(.8,1.3),z:H,vx:Math.cos(ee)*K,vy:q(.5,2.5),vz:Math.sin(ee)*K,size:q(.09,.16),size1:.04,color:Qs,alpha:1,life:q(.16,.26),gravity:9,drag:3,crisp:1})}break}case"recoil":{We.get(M.ownerId)?.onRecoil();let I=N.get(M.ownerId);I&&(re(I.pos.x,I.pos.z,5,1.6,.5,.5),Qe(I.pos.x,1.3,I.pos.z,4,.8,Qs,M.dir,1.2,.2));break}case"guardBreak":{let I=N.get(M.targetId),H=I?I.pos.x:M.pos.x,Y=I?I.pos.z:M.pos.z;Ce(M.pos.x,1,M.pos.z,1.2,vn,.12),Oe(M.pos.x,1,M.pos.z,12,t_,5);for(let ee=0;ee<6;ee++){let K=ee/6*Math.PI*2+G()*.4;de.spawn({x:H+Math.cos(K)*.2,y:2,z:Y+Math.sin(K)*.2,vx:Math.cos(K)*1.6,vy:q(2,3),vz:Math.sin(K)*1.6,size:.14,size1:.08,color:[.8,.93,1],alpha:.95,life:.5,gravity:9,drag:.8,crisp:1,floor:!1})}T=Math.min(1,T+.16);break}case"armor":{let I=N.get(M.ownerId);I&&ye(I.pos.x,I.pos.z,.5,1.3,.25,Wn,.8);break}case"charge":{oe.set(M.ownerId,{x:M.from.x,z:M.from.z,age:0,lx:M.from.x,lz:M.from.z}),re(M.from.x,M.from.z,6,2,.55,.5);break}case"counterReady":{let I=N.get(M.ownerId);I&&(ye(I.pos.x,I.pos.z,.5,1.6,.3,Ni,.9),St(I.pos.x,I.pos.z,.7,8));break}case"counterUsed":{let I=N.get(M.ownerId);I&&M.kind==="bash"&&Ge.push({x:I.pos.x,z:I.pos.z,angle:I.facing,range:Bi.bash,half:Bi.bashHalf,color:Ni,age:0,life:.2});break}case"revive":{let{x:I,z:H}=M.pos;ye(I,H,.3,1.8,.4,Js,.9);for(let Y=0;Y<24;Y++){let ee=G()*Math.PI*2,K=q(.1,.5);we.spawn({x:I+Math.cos(ee)*K,y:q(0,.6),z:H+Math.sin(ee)*K,vy:q(2,5),size:q(.12,.26),size1:.03,color:G()<.5?Js:vn,alpha:.9,life:q(.5,.9),gravity:-1,drag:1.2})}re(I,H,8,2.2,.55,.5);break}case"jumpStart":{b={x:M.from.x,z:M.from.z},re(M.from.x,M.from.z,8,2.2,.6,.8);let I=Math.hypot(M.from.x,M.from.z)||1;At(M.from.x,M.from.z,{x:-M.from.x/I,z:-M.from.z/I},10);break}case"exitOpen":{for(let I of M.pos){ye(I.x,I.z,.3,1.8,.5,Bu,.9);for(let H=0;H<18;H++){let Y=G()*Math.PI*2,ee=q(.1,.8);we.spawn({x:I.x+Math.cos(Y)*ee,y:q(0,.8),z:I.z+Math.sin(Y)*ee,vy:q(2,5),size:q(.12,.24),size1:.03,color:Bu,alpha:.9,life:q(.6,1.1),gravity:-1,drag:1})}}break}case"coinDrop":{for(let I=0;I<8;I++){let H=G()*Math.PI*2;we.spawn({x:M.pos.x,y:.5,z:M.pos.z,vx:Math.cos(H)*2,vy:q(1,3),vz:Math.sin(H)*2,size:q(.1,.18),size1:.02,color:qp,alpha:.9,life:q(.3,.5),gravity:6,drag:2})}break}case"coinPickup":ve().pickup(M.pos);break;case"coinsCollected":ve().collect(M.ids);break;case"reward":{De.spawnReward(M.pos,M.kind,M.amount),ye(M.pos.x,M.pos.z,.4,2,.45,M.kind==="coins"?qp:e_,.9);break}case"altarBuy":st(M.action);break;case"land":{let{x:I,z:H}=M.pos;re(I,H,18,3.6,.85,.9),Oe(I,.2,H,10,eo,4),ye(I,H,.4,2.6,.4,vn,.8),T=Math.min(1,T+.3);break}case"spawnMark":{he.push({x:M.pos.x,z:M.pos.z,age:0,lead:Math.max(.1,M.lead)});break}case"edgeSave":{let I=N.get(M.ownerId);I&&(ye(I.pos.x,I.pos.z,.5,1.5,.3,vn,.9),fe(I.pos.x,.9,I.pos.z,8,4,vn,null,6.3));break}case"fall":{let{x:I,z:H}=M.pos;re(I,H,14,3.2,.8,1.8),Oe(I,.3,H,8,eo,3),ae=.7,j=1,le=1,ue.set(I,H),T=Math.min(1,T+.18);break}case"death":{if(M.cause==="fall")break;let I=N.get(M.ownerId),H=Un(I),{x:Y,z:ee}=M.pos;for(let K=0;K<40;K++){let pe=G()*Math.PI*2,ke=q(.2,1.6);we.spawn({x:Y+Math.cos(pe)*.25,y:q(.2,1.8),z:ee+Math.sin(pe)*.25,vx:Math.cos(pe)*ke,vy:q(.8,3.2),vz:Math.sin(pe)*ke,size:q(.12,.3),size1:.02,color:G()<.5?H:vn,alpha:.9,life:q(.6,1.2),gravity:-1.2,drag:1.4})}ye(Y,ee,.4,2.4,.5,H,.8),Ce(Y,1,ee,2.2,H,.2,.8),ae=.35,T=Math.min(1,T+.2);break}default:break}}function Hi(w){B.flashes.begin();for(let F=Ge.length-1;F>=0;F--){let N=Ge[F];if(N.age+=w,N.age>=N.life){Ge.splice(F,1);continue}let M=N.age/N.life;B.flashes.push(N.x,N.z,N.angle,N.range*(.85+.15*M),N.half,1,N.color,(1-M)*1.2)}B.flashes.end()}function tr(w){for(let F=$e.length-1;F>=0;F--){let N=$e[F];N.age+=w,N.age>=N.life&&$e.splice(F,1)}for(let F of $e){let N=F.age/F.life,M=1-Math.pow(1-N,2.2),I=F.r1*M,H=Math.min(F.len0+(F.len1-F.len0)*N,I+.15);Ae.set(F.x+F.dir.x*I,F.y+F.dir.y*I,F.z+F.dir.z*I),be.push(Ae,F.dir,H,F.width*(1-N*.6),F.color,1-N*N)}}function ds(w){for(let F of vt){if(!F.on)continue;if(F.age+=w,F.age>=F.life){F.on=!1,F.mesh.visible=!1;continue}let N=F.age/F.life,M=1-Math.pow(1-N,2.4),I=F.r0+(F.r1-F.r0)*M;F.mesh.scale.set(I,1,I),F.mat.opacity=F.alpha*(1-N)}}let un=new O;function nr(w,F){let N=new Set;jn.length=0;for(let M of w.projectiles){if(!M.alive)continue;N.add(M.id),jn.push({kind:M.kind,x:M.pos.x,z:M.pos.z,ownerId:M.ownerId});let I=M.team==="player"?Js:F.get(M.ownerId)?rn(F.get(M.ownerId)):js;un.set(M.dir.x,0,M.dir.z),Ae.set(M.pos.x,.95,M.pos.z);let H=M.kind==="basic"?1.4:.7,Y=Math.floor(M.traveled/H),ee=ze.get(M.id);if(ee===void 0||Y>ee){ze.set(M.id,Y);let K=M.kind==="enemyBasic"?Wn:I,pe=M.kind==="basic"?.9:1.6;we.spawn({x:M.pos.x-M.dir.x*pe+q(-.08,.08),y:.95+q(-.1,.1),z:M.pos.z-M.dir.z*pe+q(-.08,.08),size:M.kind==="basic"?.1:.16,size1:.02,color:K,alpha:.9,life:.38,vx:q(-.3,.3),vz:q(-.3,.3),vy:q(0,.4)})}M.kind==="basic"?(be.push(Ae,un,2.2,.5,I,1),be.push(Ae,un,.9,.24,vn,1)):M.kind==="control"?(qe.push(Ae,un,3.8,1.1,I,1),be.push(Ae,un,2.4,.8,I,.7)):(qe.push(Ae,un,3.1,1.4,Wn,1),be.push(Ae,un,2.3,.95,js,.75))}for(let M of ze.keys())N.has(M)||ze.delete(M)}function ao(w,F){B.sectors.begin(),B.strips.begin();let N=n.rocks,M=.55+.45*Math.sin(me*48),I=w.variant!=="s0",H=I?.55:.16,Y=I?.34:.2,ee=I?.8+.2*M:.5+.5*M;for(let K of w.fighters){if(K.state==="guard"&&K.shieldDir&&K.shieldUp!==!1){let Rt=K.guard?.perfect===!0;B.sectors.push(K.pos.x,K.pos.z,Math.atan2(K.shieldDir.z,K.shieldDir.x),1.6,Bi.guardHalf,1,Rt?Ni:Js,Rt?.9:.6,.1)}let pe=K.windup;if(!pe||K.state!=="windup")continue;let ke=Math.atan2(pe.dir.z,pe.dir.x),ut=wt(pe.t/Math.max(pe.dur,.001),0,1);switch(pe.skill){case"enemyHeavy":{let Rt=K.armorKind==="heavy"&&(K.armorT??0)>0?1:0;B.sectors.push(K.pos.x,K.pos.z,ke,an.range,an.halfAngle,ut,js,1,H,Rt);break}case"melee1":case"melee2":{let Rt=to(N,K.pos.x,K.pos.z,pe.dir.x,pe.dir.z,Bi.melee[pe.skill==="melee1"?0:1]);B.strips.push(K.pos.x,K.pos.z,ke,Rt,.6,ut,rn(K),.6,.7,.18);break}case"melee3":B.sectors.push(K.pos.x,K.pos.z,ke,Bi.melee[2],Bi.sweepHalf,ut,rn(K),.7,.25);break;case"charge":{let Rt=to(N,K.pos.x,K.pos.z,pe.dir.x,pe.dir.z,Bi.charge);B.strips.push(K.pos.x,K.pos.z,ke,Rt,1,ut,rn(K),.85,.5,Y);break}case"enemyBasic":{let Rt=to(N,K.pos.x,K.pos.z,pe.dir.x,pe.dir.z,hn.range);B.strips.push(K.pos.x,K.pos.z,ke,Rt,.11,1,js,ee,.5,Y);break}case"control":{let Rt=to(N,K.pos.x,K.pos.z,pe.dir.x,pe.dir.z,$t.range);B.strips.push(K.pos.x,K.pos.z,ke,Rt,.95,ut,rn(K),.9,.6,Y);break}case"push":B.sectors.push(K.pos.x,K.pos.z,ke,Kt.range,Kt.halfAngle,ut,rn(K),.9,H);break}}if(F){let K=w.fighters.find(pe=>pe.id===w.playerId);if(K&&K.state!=="dead"&&K.state!=="falling"){let pe=F.cancel?Kb:Js,ke=Math.atan2(F.dir.z,F.dir.x);if(F.skill==="basic"){let ut=to(N,K.pos.x,K.pos.z,F.dir.x,F.dir.z,9);B.strips.push(K.pos.x,K.pos.z,ke,ut,.09,1,pe,F.cancel?.55:.85,.7)}else if(F.skill==="control"){let ut=to(N,K.pos.x,K.pos.z,F.dir.x,F.dir.z,11);B.strips.push(K.pos.x,K.pos.z,ke,ut,.9,0,pe,F.cancel?.5:.8,.8)}else B.sectors.push(K.pos.x,K.pos.z,ke,Kt.range,Kt.halfAngle,1,pe,F.cancel?.6:.8)}}B.sectors.end(),B.strips.end()}function lo(w,F,N,M,I){let H=wt(I,0,.1);me+=H,ae=Math.max(0,ae-H),Ke+=((ae>0?.32:1)-Ke)*jr(14,H);let Y=H*Ke,ee=Iu(w.variant);ee!==pt.myth&&S(ee),w.island&&f(w.island)!==f(n)&&(!R||f(R.isl)!==f(w.island))&&D(w.island);let K=w.s1;K&&K.phase==="air"?C||(C={dur:Math.max(.1,K.phaseT),from:b}):C=null;let pe=C&&K?wt(1-K.phaseT/C.dur,0,1):-1;_=pe>=0?P(pe):0,De.setClouds(_,pe),R&&k(pe>=0);let ke=new Map;for(let Nt of w.fighters)ke.set(Nt.id,Nt);for(let Nt of w.fighters){let on=We.get(Nt.id);on&&(on.variant!==Nt.variant||on.look!==se(Nt))&&(on.dispose(),We.delete(Nt.id),on=void 0),on||(on=new pa(l,Nt.variant,se(Nt)),We.set(Nt.id,on))}for(let[Nt,on]of We)ke.has(Nt)||(on.dispose(),We.delete(Nt));us(F,w,ke);let ut=new Map;if(K){let Nt=ke.get(w.playerId);if(Nt&&pe>=0){let on=W(Nt,pe,C.from);ut.set(Nt.id,{...Nt,pos:on.pos,y:on.y,state:"idle",moveVel:{x:0,z:0}})}else Nt&&K.phase==="landed"&&!((Nt.protectT??0)>0)&&ut.set(Nt.id,{...Nt,protectT:Math.max(.01,K.phaseT)})}let Rt=ut.get(w.playerId)??ke.get(w.playerId),xn=2*Re(tt/Tt)*Math.tan($c*Math.PI/360)/Tt,ui=(w.variant!=="s0"?$b*xn:0)+(Rt?Rt.pos.x:0)*Wp,fs=Xt+(Rt?Rt.pos.z:0)*Wp,ir=jr(Yb,H);z.x+=(ui-z.x)*ir,z.y+=(fs-z.y)*ir,le=Math.max(0,le-H*1.1),j=Math.max(0,j-H*1.5);let Yu=z.x+(ue.x*.5-z.x)*.4*le*le,$u=z.y+(ue.y*.5-z.y)*.4*le*le,Ku=Re(tt/Tt)*(1-.1*Math.sin(j*Math.PI*.5));et(Je,Yu,$u,Ku),T=Math.max(0,T-H*2.4);let Zu=T*T*.55,fm=(Math.sin(me*53.1)+Math.sin(me*31.7+1.3))*.5*Zu,pm=(Math.sin(me*47.3+2.1)+Math.sin(me*29.1))*.5*Zu;et(Fe,Yu,$u,Ku,fm,pm),Fe.rotation.z=Math.sin(me*41)*T*T*.012,Fe.updateMatrixWorld(!0);for(let Nt of w.fighters){let on=ut.get(Nt.id)??Nt,jc=We.get(on.id);jc.setAir(Nt.id===w.playerId&&pe>=0?pe:null),jc.update(on,M,w.variant!=="s0"),jc.wantDust(on,Y)&&re(on.pos.x,on.pos.z,2,1,.45,.4),on.state==="falling"&&G()<.9&&we.spawn({x:on.pos.x+q(-.15,.15),y:on.y+.9,z:on.pos.z+q(-.15,.15),size:.28,size1:.1,aspect:2.8,color:[.9,.95,1],alpha:.4,life:.4,vy:3})}if(be.begin(),qe.begin(),nr(w,ke),tr(Y),pt.myth&&nt&&co(ke,Y),$.length&&ho(Y),oe.size&&uo(ke,Y),be.end(),qe.end(),ao(w,N),(he.length||_e)&&je(Y),(Ai||K&&K.phase==="exit")&&J(K,H),Z||K?.drops&&K.drops.length){let Nt=ut.get(w.playerId)??ke.get(w.playerId);ve().update(K?.drops??[],Nt?{x:Nt.pos.x,y:Nt.y+1.3,z:Nt.pos.z}:null,Y)}Ne.length&&lt(Y),i=w.playerId,Hi(Y),ds(Y),we.update(Y),de.update(Y),u.setVariant(w.variant==="s0"?"s0":"v2"),u.update(H),_<.999&&o.render(l,Fe),(u.altar||ne)&&ie(),De.update(w.fighters,Te,H,In)}function co(w,F){for(let[N,M]of Be){M.age+=F;let I=w.get(N);if(!I||M.age>=.2){Be.delete(N);continue}let H=I.pos.x-M.x,Y=I.pos.z-M.z,ee=Math.hypot(H,Y);if(ee<.05)continue;let K=1-M.age/.2;Ae.set(I.pos.x,.9,I.pos.z),Ie.set(H/ee,0,Y/ee),be.push(Ae,Ie,ee,.55*K+.1,M.color,.9*K),be.push(Ae,Ie,ee*.8,.2*K+.05,vn,.8*K)}}function ho(w){for(let F=$.length-1;F>=0;F--){let N=$[F];if(N.age+=w,N.age>=N.life){$.splice(F,1);continue}let M=N.age/N.life,I=N.len*(.55+.45*(1-Math.pow(1-M,3)));Ae.set(N.x+N.dx*I,1.05,N.z+N.dz*I),Ie.set(N.dx,0,N.dz),be.push(Ae,Ie,I*.8,.42*(1-M*.5),N.color,.9*(1-M)),be.push(Ae,Ie,I*.5,.16,vn,.9*(1-M))}}function uo(w,F){for(let[N,M]of oe){let I=w.get(N);if(!I){oe.delete(N);continue}if(I.state!=="charge"&&(M.age+=F),M.age>=.25){oe.delete(N);continue}let H=I.pos.x-M.x,Y=I.pos.z-M.z,ee=Math.hypot(H,Y);if(ee<.05)continue;let K=1-M.age/.25,pe=rn(I);if(Ae.set(I.pos.x,.9,I.pos.z),Ie.set(H/ee,0,Y/ee),be.push(Ae,Ie,ee,.95*K+.1,pe,.85*K),be.push(Ae,Ie,ee*.85,.35*K+.05,vn,.85*K),I.state==="charge"){let ke=I.pos.x-M.lx,ut=I.pos.z-M.lz,Rt=Math.hypot(ke,ut),xn=Math.max(1,Math.ceil(Rt/.15));for(let ei=0;ei<xn;ei++){let ui=(ei+.5)/xn;de.spawn({x:M.lx+ke*ui,y:q(.6,1.2),z:M.lz+ut*ui,size:.75,size1:.35,color:pe,alpha:.55,life:.28,drag:2})}de.spawn({x:I.pos.x,y:.12,z:I.pos.z,vx:-H/ee*2,vy:q(.3,1),vz:-Y/ee*2,size:.4,size1:.9,color:Xp,alpha:.5,life:.4,drag:3})}M.lx=I.pos.x,M.lz=I.pos.z}}let Ai=null,L=new Set;function J(w,F){Ai||(Ai=new xa(l,2));let N=w&&w.phase==="exit"?w.exits:[];if(Ai.update(N,Fe,F),u.altar)for(let M of N){let I=`${M.pos.x.toFixed(2)},${M.pos.z.toFixed(2)}`;L.has(I)||(L.add(I),u.altar.openRailAt(M.pos,1.7))}for(let M of N)if(G()<.25){let I=G()*Math.PI*2,H=q(.2,1);we.spawn({x:M.pos.x+Math.cos(I)*H,y:q(0,.4),z:M.pos.z+Math.sin(I)*H,vy:q(1.5,3.5),size:q(.1,.2),size1:.03,color:Bu,alpha:.8,life:q(.7,1.2),gravity:-.5,drag:.8})}}let ne=!1;function ie(){let w=u.altar;if(!w){De.setLabels([]),ne=!1;return}let F=[];for(let N of n.spots??[]){let M=N.kind;if(!w.spots.has(M))continue;let I=Ip[M],H=Te({x:N.pos.x+Math.cos(N.facing)*I.front,z:N.pos.z+Math.sin(N.facing)*I.front},Cp);F.push({key:M,text:I.text,svg:I.svg,color:"#"+I.color.toString(16).padStart(6,"0"),x:H.x,y:H.y,visible:H.visible})}De.setLabels(F,{left:$p,right:Yp}),ne=!0}let Z=null,ve=()=>Z??(Z=new ya(l)),Le=null,Ne=[],Ve={athena:dn(16770984),hermes:dn(14218495),poseidon:dn(10478335),convert:dn(16747098),revive:dn(10479871)};function st(w){let F=w.kind==="bless"?w.blessing:w.kind,N=u.altar?.spots.get(F),M=(n.spots??[]).find(K=>K.kind===F),I=N?N.getWorldPosition(new O):M?new O(M.pos.x,0,M.pos.z):null;if(!I)return;let H=Ve[F];Le??(Le=Dc());let Y=new Jt;Y.name=`fx-altar-${F}`;let ee=new ts(new bi({map:Le,color:new at().setRGB(H[0],H[1],H[2],Vt),blending:Mi,depthWrite:!1,transparent:!0,fog:!1}));ee.position.set(0,F==="revive"?1.2:2.2,0),Y.add(ee),Y.position.copy(I),l.add(Y),Ne.push({grp:Y,sprite:ee,age:0,life:1}),ye(I.x,I.z,.6,2.6,.7,H,.9);for(let K=0;K<26;K++){let pe=G()*Math.PI*2,ke=q(.2,1);we.spawn({x:I.x+Math.cos(pe)*ke,y:q(.2,2.6),z:I.z+Math.sin(pe)*ke,vy:q(1.5,4),size:q(.12,.26),size1:.03,color:G()<.4?vn:H,alpha:.9,life:q(.6,1),gravity:-.6,drag:1})}}function lt(w){for(let F=Ne.length-1;F>=0;F--){let N=Ne[F];if(N.age+=w,N.age>=N.life){N.grp.removeFromParent(),N.sprite.material.dispose(),Ne.splice(F,1);continue}let M=N.age/N.life;N.sprite.scale.setScalar(1.5+3.5*Math.sin(Math.min(1,M*1.6)*Math.PI*.5)),N.sprite.material.opacity=(M<.15?M/.15:1-(M-.15)/.85)*.95}}function je(w){_e||(_e=new va(l,4)),_e.begin();for(let F=he.length-1;F>=0;F--){let N=he[F];if(N.age+=w,N.age>=N.lead+.2){he.splice(F,1);continue}let M=wt(N.age/N.lead,0,1),I=N.age>N.lead?1-(N.age-N.lead)/.2:1,H=.85+.15*Math.sin(N.age*18);_e.push(N.x,N.z,1.1,M,js,I*H)}_e.end()}function gt(w,F){let N=Math.atan2(-F.z,-F.x);de.spawn({x:w.x,y:1,z:w.z,size:2.6,size1:.9,color:Qs,alpha:.95,life:.2}),de.spawn({x:w.x,y:1,z:w.z,size:1.2,size1:2.4,color:vn,alpha:.7,life:.16});for(let M=0;M<70;M++){let I=N+(G()-.5)*3.2,H=q(5,13);de.spawn({x:w.x,y:q(.5,1.6),z:w.z,vx:Math.cos(I)*H,vy:q(.8,4.5),vz:Math.sin(I)*H,size:q(.16,.32),size1:.06,color:Qs,alpha:1,life:q(.24,.4),gravity:9,drag:2.6,crisp:1})}Qe(w.x,1,w.z,10,1.8,Qs,F,3.4,.24);for(let M=0;M<14;M++){let I=N+(G()-.5)*2.6,H=q(10,17),Y=Math.cos(I)*H,ee=q(1.5,5),K=Math.sin(I)*H,pe=q(.8,1.3),ke=q(.26,.38);for(let ut=0;ut<6;ut++){let Rt=ut*.014;de.spawn({x:w.x-Y*Rt,y:pe-ee*Rt,z:w.z-K*Rt,vx:Y,vy:ee,vz:K,size:.2-ut*.026,size1:.04,color:ut<2?jb:Qb,alpha:1,life:ke-Rt,gravity:14,drag:1.2,crisp:1})}}}function Lt(w,F){de.spawn({x:w.x,y:1,z:w.z,size:1.4,size1:.5,color:Qs,alpha:.9,life:.16});for(let N=0;N<36;N++){let M=Math.atan2(-F.z,-F.x)+(G()-.5)*2.8,I=q(4,10);de.spawn({x:w.x,y:q(.6,1.5),z:w.z,vx:Math.cos(M)*I,vy:q(.5,3.5),vz:Math.sin(M)*I,size:q(.13,.25),size1:.05,color:Qs,alpha:1,life:q(.2,.32),gravity:9,drag:3,crisp:1})}}function qt(){for(let w of We.values())w.dispose();We.clear(),ze.clear(),we.clear(),de.clear(),$e.length=0,Ge.length=0,Be.clear(),$.length=0,oe.clear(),he.length=0,C=null,b=null,_=0,De.setClouds(0,-1),Z?.clear(),L.clear();for(let w of Ne)w.grp.removeFromParent(),w.sprite.material.dispose();Ne.length=0;for(let w of vt)w.on=!1,w.mesh.visible=!1;De.clear(),T=0,j=0,le=0,ae=0,Ke=1}Ze(tt,Tt);let Ht=[],Ut=[];function it(){if(pt.myth||!Iu("v4"))return;let w=Math.random,F=625341585;Math.random=()=>{F=F+1831565813>>>0;let I=F;return I=Math.imul(I^I>>>15,I|1),I^=I+Math.imul(I^I>>>7,I|61),((I^I>>>14)>>>0)/4294967296};let N=o.getRenderTarget(),M=new Ot;try{pt.myth=!0;let I=new ki,H=Hc(I,n,h);d.set(x(!0,n),{world:H,background:I.background,fog:I.fog}),I.environment=p(),I.environmentIntensity=.7;for(let[K,pe]of[[0,"myth"],[1,"myth-shield"],[2,"myth-archer"]])Ht.push(new pa(I,K,pe));let Y=new xa(I,2);Y.update([{pos:{x:1,z:0},progress:.5,reward:"coins"},{pos:{x:-1,z:0},progress:.5,reward:"heal"}],Fe,.016);let ee=new ya(I);ee.update([{id:1,pos:{x:0,z:1}}],null,.016),Ut.push(Y,ee),a(),o.compile(I,Fe);for(let K of[...l.children])K!==u.root&&o.compile(K,Fe,I);I.traverse(K=>{let pe=K.material;for(let ke of Array.isArray(pe)?pe:pe?[pe]:[])for(let ut of Object.values(ke))ut&&ut.isTexture&&o.initTexture(ut)}),o.setRenderTarget(null),o.getViewport(M),o.setViewport(0,0,4,4),o.render(I,Fe)}finally{pt.myth=!1,a(),o.setRenderTarget(N),M.z>0&&o.setViewport(M),Math.random=w}}it();let zt=w=>{X.clear();for(let[F,N]of Object.entries(w))X.set(Number(F),N)},It=w=>{nt=w},fn=w=>We.get(w)?.look??null,Qn=w=>We.get(w)?.root.visible??!1,pn=()=>{let w=new Zn,F=ee=>(w.setFromObject(ee),{min:w.min.toArray().map(K=>+K.toFixed(3)),max:w.max.toArray().map(K=>+K.toFixed(3)),height:+w.max.y.toFixed(3)}),N=We.get(i),M=null;N&&(w.setFromObject(N.root),M=+(w.max.y-N.root.position.y).toFixed(3));let I=u.altar,H=[];l.traverseVisible(ee=>{ee.name.startsWith("fx-")&&H.push(ee.name)});for(let ee of e.querySelectorAll("[data-fx]"))ee.dataset.active==="1"&&H.push(ee.dataset.fx);let Y=[];return u.root.traverse(ee=>{ee.name.startsWith("altar-mosaic")&&Y.push(ee.name)}),{island:n.kind??"battle",playerHeight:M,spots:I?[...I.spots].map(([ee,K])=>({kind:ee,name:K.name,...F(K)})):[],rail:I?{top:+Math.max(...I.rail.map(ee=>(w.setFromObject(ee),w.max.y))).toFixed(3),posts:I.railPosts()}:null,mosaic:Y,columns:cn().length,labels:[...e.querySelectorAll(".ro-label")].filter(ee=>ee.dataset.active==="1").map(ee=>({kind:ee.dataset.label,text:ee.textContent})),coins:Z?Z.shown:0,beacons:Ai?[0,1].map(ee=>({icon:Ai.iconOf(ee)})):[],fx:H}},ri=(w,F)=>{let M=new O(w.x,F,w.z).clone().sub(Fe.position),I=M.length(),H=new Ir(Fe.position.clone(),M.normalize()),Y=[],ee=new Zn,K=new O;for(let[pe,ke]of u.altar?.spots??[])pe!=="athena"&&pe!=="hermes"&&pe!=="poseidon"||(ee.setFromObject(ke),H.intersectBox(ee,K)&&K.distanceTo(Fe.position)<I&&Y.push(pe));return{hits:Y,dist:+I.toFixed(2)}},Yt=w=>{let F=u.root.getObjectByName(w);if(!F)return null;let N=new Zn().setFromObject(F),M=1e9,I=1e9,H=-1e9,Y=-1e9;for(let ee of[N.min.x,N.max.x])for(let K of[N.min.y,N.max.y])for(let pe of[N.min.z,N.max.z]){let ke=Te({x:ee,z:pe},K);M=Math.min(M,ke.x),I=Math.min(I,ke.y),H=Math.max(H,ke.x),Y=Math.max(Y,ke.y)}return{x0:Math.round(M),y0:Math.round(I),x1:Math.round(H),y1:Math.round(Y)}},cn=()=>{let w=[];return u.root.traverse(F=>{F.name==="rock-column"&&w.push({x:F.position.x,z:F.position.z})}),w};return{render:lo,resize:Ze,worldToScreen:Te,screenToGround:ht,reset:qt,setIsland:D,setDemoLooks:zt,blockSpark:Lt,setKnockTrails:It,lookOf:fn,drawn:Qn,rockColumns:cn,swapLog:()=>A.splice(0),s1bDebug:pn,raycastToBeamTop:ri,screenRect:Yt}}var no=62,Ou=50,Hu=.14,n_=14,i_=1.1,Kc=.8,er={basic:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v10M24 34v10M4 24h10M34 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',control:'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="21" r="2.5" fill="currentColor"/><path d="M21 4v8M21 30v8M4 21h8M30 21h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="8" fill="#0b1a2b" stroke="currentColor" stroke-width="2.5"/><path d="M36 31v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',push:'<svg viewBox="0 0 48 48"><path d="M8 24l12-10v7h8v6h-8v7z" fill="currentColor"/><path d="M32 10l6 6M34 24h8M32 38l6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',dash:'<svg viewBox="0 0 48 48"><path d="M8 12l12 12-12 12M22 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ba={basic:'<svg viewBox="0 0 48 48"><path d="M6 42L31 17" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M27.5 13.5L42 6l-7.5 14.5z" fill="currentColor"/><path d="M4 32l8-8M14 44l8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/></svg>',control:'<svg viewBox="0 0 48 48"><path d="M6 38Q18 10 40 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 5" opacity="0.65"/><path d="M12 36l24-12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M34 17l11 6-11 7z" fill="currentColor"/></svg>',push:'<svg viewBox="0 0 48 48"><circle cx="21" cy="24" r="15" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="21" cy="24" r="2.5" fill="currentColor"/><path d="M40 15l6 9-6 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'},Zc={athena:"\u96C5\u5178\u5A1C",hermes:"\u8D6B\u8033\u58A8\u65AF",poseidon:"\u6CE2\u8CFD\u9813"},s_={athena:'<svg viewBox="0 0 24 24"><path d="M12 2.500l7.500 2.800v6.200c0 4.500-3 8-7.500 10-4.500-2-7.500-5.500-7.500-10V5.300z" fill="currentColor"/><path d="M12 6.500v11M7.500 11h9" stroke="#0b1a2b" stroke-width="1.800" stroke-linecap="round"/></svg>',hermes:'<svg viewBox="0 0 24 24"><path d="M5 9h6v6h6.500a2.500 2.500 0 0 1 2.500 2.500V19H5z" fill="currentColor"/><path d="M11 7.500c1.800-3.200 5-4.200 9-3.200-2.500.8-3.800 2-4.500 3.800M11 9c1.500-2.200 3.800-3 6.500-2.500" fill="none" stroke="currentColor" stroke-width="1.600" stroke-linecap="round"/></svg>',poseidon:'<svg viewBox="0 0 24 24"><path d="M12 21.500V6.500M5 4.500v4.500a7 7 0 0 0 14 0V4.500M12 2.500L10.200 5.500M12 2.500l1.800 3M5 4.500L3.500 6.800M5 4.500l1.500 2.300M19 4.500l-1.500 2.300M19 4.500l1.500 2.300" fill="none" stroke="currentColor" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"/></svg>'},r_={...Zc,convert:"\u6230\u795E\u796D\u58C7",revive:"\u5361\u620E\u7684\u5C0F\u8239"},o_='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#ffd35a" stroke="#b8860b" stroke-width="1.5"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#b8860b" stroke-width="1.5"/></svg>',a_={coins:"\u9322\u4E0D\u5920",held:"\u5DF2\u6301\u6709",convertUsed:"\u9019\u5EA7\u5DF2\u6539\u5949",hasRevive:"\u5FA9\u6D3B\u9084\u5728",noPath:"\u7121\u9053\u8DEF\u4E0D\u80FD\u6539\u5949",notHere:""},l_='<svg viewBox="0 0 48 48"><path d="M4 14h12M2 24h16M4 34h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/><path d="M20 10l14 14-14 14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8v32" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',Qp=new URLSearchParams(location.search),hs=Qp.get("art")==="myth",Gu=Qp.get("cam")==="near",Zp=()=>`${hs?" \xB7 \u795E\u8A71":""}${Gu?" \xB7 \u62C9\u8FD1":""}`;function Jp(s,e){let t=new URLSearchParams(location.search);t.get(s)===e?t.delete(s):t.set(s,e);let n=t.toString();history.replaceState(null,"",`${location.pathname}${n?`?${n}`:""}${location.hash}`),location.reload()}var Vu=[{id:"basic",label:"\u57FA\u790E\u653B\u64CA",cls:"big"},{id:"dash",label:"\u4F4D\u79FB",cls:""},{id:"control",label:"\u63A7\u5236",cls:""},{id:"push",label:"\u64CA\u9000",cls:""}],c_=(s,e)=>`
<div class="hud" hidden>
  <div class="hp" data-box="hp"><div class="hp-fill"></div><span class="hp-text">100 / 100</span></div>
  <div class="timer" data-box="timer">00:00</div>
  <button class="pause" data-box="pause" aria-label="\u66AB\u505C"><svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></button>
  <div class="ver" data-box="ver"></div>
  <div class="coins s1only" title="\u9280\u5E63"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#ffd35a" stroke="#b8860b" stroke-width="1.5"/><circle cx="12" cy="12" r="5.5" fill="none" stroke="#b8860b" stroke-width="1.5"/></svg><span class="coins-n">0</span></div>
  <div class="hudrow">
    <div class="revive v4only" title="\u5269\u9918\u5FA9\u6D3B\u6B21\u6578"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z" fill="currentColor"/></svg><span class="revive-n">\xD71</span></div>
    <div class="blessings s1only"></div>
  </div>
  <div class="wave v4only">\u7B2C 1 \u6CE2</div>
  <div class="protect">\u4FDD\u8B77\u4E2D</div>
  <div class="exit-hint">\u6E05\u5834\uFF01\u8D70\u9032\u51FA\u53E3\u5149\u5708</div>
  <div class="reviving"><b>\u5361\u620E\u6E21\u4F60\u56DE\u4F86</b><i class="reviving-t"></i></div>
</div>
<div class="controls" hidden>
  <div class="stick-zone"></div>
  <div class="offers" hidden></div>
  <div class="stick" data-box="stick"><div class="knob"></div></div>
  ${Vu.map(t=>`<div class="skill ${t.id} ${t.cls}" data-skill="${t.id}" data-box="skill-${t.id}" data-icon="${e&&t.id!=="dash"?"myth":"default"}" aria-label="${t.label}">${s[t.id]}${t.id==="dash"?'<u class="lbl">\u7FFB\u56DE</u>':""}<i class="cd"></i><b class="cdt"></b><em class="cancel">\u53D6\u6D88</em><em class="auto">\u81EA\u52D5</em></div>`).join("")}
</div>
<div class="banner" aria-live="polite"></div>
<div class="menu menu-title" hidden>
  <div class="panel">
    <h1>\u6D6E\u5CF6\u7375\u4EBA S0</h1>
    <p class="sub">\u4FEF\u8996\u89D2\u7375\u4EBA\u6230\u9B25\u539F\u578B</p>
    <p class="title-ver"></p>
    <div class="modes entries">
      <section class="mode main v4row">
        <h3>\u5019\u9078 v0.4 \u8FD1\u6230\uFF08\u9078\u9053\u8DEF\uFF09</h3>
        <div class="btns row"><div class="tbtn main" role="button" data-act="v4-ares">\u963F\u745E\u65AF</div><div class="tbtn main" role="button" data-act="v4-mars">\u746A\u723E\u65AF</div><div class="tbtn" role="button" data-act="v4-none">\u7121\u9053\u8DEF\uFF08\u5C0D\u7167\uFF09</div></div>
      </section>
      <section class="mode main v4row">
        <h3>\u5019\u9078 S1\uFF08\u5B8C\u6574\u4E00\u5C40\uFF09</h3>
        <div class="btns row"><div class="tbtn main" role="button" data-act="s1-ares">\u963F\u745E\u65AF</div><div class="tbtn main" role="button" data-act="s1-mars">\u746A\u723E\u65AF</div><div class="tbtn" role="button" data-act="s1-none">\u7121\u9053\u8DEF\uFF08\u5C0D\u7167\uFF09</div></div>
      </section>
    </div>
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
    <div class="btns row"><div class="tbtn" role="button" data-act="art-toggle">\u756B\u9762\uFF1A${e?"\u795E\u8A71\u907A\u8DE1\uFF08\u5019\u9078\uFF09":"\u73FE\u884C"}</div><div class="tbtn" role="button" data-act="cam-toggle">\u93E1\u982D\uFF1A${Gu?"\u62C9\u8FD1":"\u5168\u5CF6"}</div><button class="ghost small" data-act="howto">\u64CD\u4F5C\u8AAA\u660E</button></div>
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
    <div class="s1res" hidden><p class="s1where"></p><p class="s1death"></p><p class="s1coins"></p></div>
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
      <div class="tbtn" role="button" data-act="copy-record" hidden>\u8907\u88FD\u7D00\u9304</div>
      <div class="tbtn" role="button" data-act="clear-record" hidden>\u6E05\u9664\u7D00\u9304</div>
    </div>
    <p class="clear-confirm" hidden>\u78BA\u5B9A\u6E05\u9664\u5168\u90E8 <b class="clear-n">0</b> \u5C40\u7D00\u9304\uFF1F<span class="tbtn tiny danger" role="button" data-act="clear-yes">\u78BA\u5B9A</span><span class="tbtn tiny" role="button" data-act="clear-no">\u53D6\u6D88</span></p>
    <p class="copy-status" hidden></p>
    <textarea class="copybox" readonly hidden aria-label="\u8A66\u73A9\u7D00\u9304 JSON"></textarea>
  </div>
</div>
<div class="rotate"><div>\u8ACB\u628A\u624B\u6A5F\u8F49\u6210\u6A6B\u5F0F</div></div>
`,jp=(s,e)=>{let t=Math.hypot(s,e);return t<1e-6?null:{x:s/t,z:e/t}};function em(s,e){s.innerHTML=c_(hs?{...er,...ba}:er,hs),s.classList.toggle("art-myth",hs);let t=U=>s.querySelector(U),n=t(".hud"),i=t(".controls"),r={title:t(".menu-title"),howto:t(".menu-howto"),pause:t(".menu-pause"),result:t(".menu-result")},o=t(".stick-zone"),a=t(".stick"),l=t(".knob"),c=t(".hp-fill"),h=t(".hp-text"),u=t(".timer"),d=t(".ver"),f=t(".banner"),m=Object.fromEntries(Vu.map(U=>[U.id,t(`.skill.${U.id}`)])),x=Object.fromEntries(Vu.map(U=>[U.id,{ring:m[U.id].querySelector(".cd"),text:m[U.id].querySelector(".cdt")}])),g=document.querySelector('meta[name="build-sha"]')?.getAttribute("content")??"",p=`${ps} \xB7 ${g&&!g.startsWith("__")?g:"dev"}${Zp()}`;d.textContent=p,t(".title-ver").textContent=`${ps}${Zp()}`;let y=!1,E=!1,v=!1,S="1v1",R="s0",A=2.6,C="ares",b=!1,_=null,D={basic:null,control:null,push:null},k=null,P=!1,V=!1,W=!1,X=!1,se=!1,$=new Set,oe=null,he=!1,_e=!1,Be=!1,nt=0,Fe=0,Je=null,te=()=>y&&!E,Q={basic:0,control:0,push:0,dash:0};function xe(U){if(U==="basic"||!(Q[U]>.05))return;let w=m[U];w.classList.remove("denied"),w.offsetWidth,w.classList.add("denied"),window.setTimeout(()=>w.classList.remove("denied"),300)}let we=()=>R==="v4"||R==="s1",de=()=>we()&&C==="mars";function be(U,w){return w!=="basic"&&U.dragged&&Math.hypot(U.x-U.cx,U.y-U.cy)<U.r*Kc}function qe(U){let w=jp(U.x-U.cx,U.y-U.cy);return w&&Math.hypot(U.x-U.cx,U.y-U.cy)>=U.r*Kc&&(U.lastDir=w),U.lastDir}function B(){if(!Be)return null;let U=e.getPlayerPos(),w=U&&e.screenToGround(nt,Fe);return!U||!w||(Je=jp(w.x-U.x,w.z-U.z)??Je),Je}function vt(){a.classList.remove("active"),a.style.left=a.style.top=a.style.bottom="",l.style.transform=""}function $e(){_=null,vt();for(let U of["basic","control","push"])D[U]=null;for(let U of Object.keys(m))m[U].classList.remove("pressed","aiming","cancelling","autoaim","denied");k=null,P=!1,V=!1,W=!1,$.clear(),oe=null,he=!1,_e=!1,X=!1,se=!1}o.addEventListener("pointerdown",U=>{if(U.pointerType==="mouse"||_||!te())return;U.preventDefault(),o.setPointerCapture(U.pointerId);let w=Math.min(Math.max(U.clientX,no+4),window.innerWidth-no-4),F=Math.min(Math.max(U.clientY,no+4),window.innerHeight-no-4);_={pid:U.pointerId,cx:w,cy:F,move:{x:0,z:0}},a.classList.add("active"),a.style.left=`${w-no}px`,a.style.top=`${F-no}px`,a.style.bottom="auto",Ge(U)});function Ge(U){if(!_||U.pointerId!==_.pid)return;let w=U.clientX-_.cx,F=U.clientY-_.cy,N=Math.hypot(w,F),M=N>Ou?Ou/N:1;l.style.transform=`translate(${w*M}px, ${F*M}px)`;let I=Math.min(N/Ou,1);if(I<=Hu)_.move={x:0,z:0};else{let H=(I-Hu)/(1-Hu);_.move={x:w/N*H,z:F/N*H}}}function De(U){!_||U.pointerId!==_.pid||(_=null,vt())}o.addEventListener("pointermove",Ge),o.addEventListener("pointerup",De),o.addEventListener("pointercancel",De);for(let U of["basic","control","push"]){let w=m[U];w.addEventListener("pointerdown",N=>{if(D[U]||!te())return;N.preventDefault(),w.setPointerCapture(N.pointerId);let M=w.getBoundingClientRect();D[U]={pid:N.pointerId,cx:M.left+M.width/2,cy:M.top+M.height/2,r:M.width/2,sx:N.clientX,sy:N.clientY,x:N.clientX,y:N.clientY,dragged:!1,lastDir:null},w.classList.add("pressed"),xe(U),U==="basic"&&we()&&(V=!0),U==="push"&&de()&&(W=!0,w.classList.add("autoaim"))}),w.addEventListener("pointermove",N=>{let M=D[U];if(!(!M||N.pointerId!==M.pid)){if(M.x=N.clientX,M.y=N.clientY,!M.dragged&&Math.hypot(M.x-M.sx,M.y-M.sy)>=n_&&Math.hypot(M.x-M.cx,M.y-M.cy)>M.r*i_&&(M.dragged=!0),U==="push"&&de()){let I=!M.dragged||Math.hypot(M.x-M.cx,M.y-M.cy)<M.r*Kc;w.classList.toggle("aiming",!I),w.classList.toggle("autoaim",I);return}w.classList.toggle("aiming",M.dragged),w.classList.toggle("cancelling",be(M,U))}});let F=(N,M)=>{let I=D[U];!I||N.pointerId!==I.pid||(I.x=N.clientX,I.y=N.clientY,D[U]=null,w.classList.remove("pressed","aiming","cancelling","autoaim"),!(U==="basic"||M||!te())&&(U==="push"&&de()||(I.dragged?be(I,U)||(k={skill:U,dir:qe(I)}):k={skill:U,dir:null})))};w.addEventListener("pointerup",N=>F(N,!1)),w.addEventListener("pointercancel",N=>F(N,!0))}m.dash.addEventListener("pointerdown",U=>{te()&&(U.preventDefault(),P=!0,xe("dash"),m.dash.classList.add("pressed"))});let We=()=>m.dash.classList.remove("pressed");m.dash.addEventListener("pointerup",We),m.dash.addEventListener("pointercancel",We);let ze=U=>{oe||(oe=U,he=!1)};window.addEventListener("keydown",U=>{if(Xt(),U.code==="Escape"){if(U.repeat)return;oe&&!he?he=!0:te()&&Oe();return}if(te()){if(U.repeat){U.code==="Space"&&U.preventDefault();return}switch(U.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":$.add(U.code);break;case"KeyQ":xe("control"),ze("control");break;case"KeyE":xe("push"),de()?X||(X=!0,W=!0,m.push.classList.add("pressed","autoaim")):ze("push");break;case"KeyJ":we()&&!se&&(se=!0,V=!0,m.basic.classList.add("pressed"));break;case"Space":U.preventDefault(),P=!0,xe("dash");break;case"ShiftLeft":case"ShiftRight":P=!0,xe("dash");break}}}),window.addEventListener("keyup",U=>{$.delete(U.code),U.code==="KeyE"&&X&&(X=!1,m.push.classList.remove("pressed","autoaim")),U.code==="KeyJ"&&se&&(se=!1,m.basic.classList.remove("pressed"));let w=U.code==="KeyQ"?"control":U.code==="KeyE"?"push":null;w&&oe===w&&(!he&&te()&&(k={skill:w,dir:B()}),oe=null,he=!1)});let tt=U=>!U.target.closest(".skill, .pause, .menu, .stick, .offers");window.addEventListener("pointerdown",U=>{if(U.pointerType==="mouse"){if(Be=!0,nt=U.clientX,Fe=U.clientY,U.button===2){oe&&(he=!0);return}U.button===0&&te()&&tt(U)&&(_e=!0,we()&&(V=!0))}}),window.addEventListener("pointermove",U=>{U.pointerType==="mouse"&&(Be=!0,nt=U.clientX,Fe=U.clientY)}),window.addEventListener("pointerup",U=>{U.pointerType==="mouse"&&U.button===0&&(_e=!1)}),window.addEventListener("blur",$e),document.addEventListener("visibilitychange",()=>{document.hidden&&($e(),te()&&Oe())});let Tt=U=>U.preventDefault();for(let U of["gesturestart","gesturechange","gestureend","dblclick","contextmenu","selectstart","dragstart"])document.addEventListener(U,Tt);document.addEventListener("touchmove",U=>{U.target.closest?.(".edge-list, .copybox")||U.preventDefault()},{passive:!1});function Xt(){b||(b=!0,e.onFirstGesture())}window.addEventListener("pointerup",Xt,!0);let z=new Date().toISOString(),T="s1-run-log/v1",j="s1-run-log/v1-live",le=30,ue={get(U){try{return localStorage.getItem(U)}catch{return null}},set(U,w){try{localStorage.setItem(U,w)}catch{}},remove(U){try{localStorage.removeItem(U)}catch{}}},ae=U=>{let w=U;return!!w&&typeof w=="object"&&typeof w.index=="number"&&typeof w.endedAt=="string"&&!!w.record&&typeof w.record=="object"};function Ke(){let U=[];try{let F=ue.get(T),N=F?JSON.parse(F):[];Array.isArray(N)&&(U=N.filter(ae))}catch{U=[]}try{let F=ue.get(j);if(F){let N=JSON.parse(F);N&&typeof N=="object"&&U.push({index:(U.length?U[U.length-1].index:0)+1,endedAt:new Date().toISOString(),endedBy:"abandoned",next:"reload",rematch:!1,record:N}),ue.remove(j)}}catch{ue.remove(j)}let w=U[U.length-1];return w&&w.next===null&&(w.next="reload",w.rematch=!1),U.slice(-le)}let me=Ke(),Ae=()=>ue.set(T,JSON.stringify(me));Ae();let Ie=me[me.length-1]??null,ge=-1/0,Re=!1,et=null;function Ze(U,w){Ie={index:(me.length?me[me.length-1].index:0)+1,endedAt:new Date().toISOString(),endedBy:w,next:null,rematch:!1,record:JSON.parse(JSON.stringify(U))},me.push(Ie),me.length>le&&me.splice(0,me.length-le),Ae(),ue.remove(j)}function Te(U){Re&&et&&Ze(et,"abandoned"),Re=!1,Ie&&Ie.next===null&&(Ie.next=U,Ie.rematch=U==="again",Ae()),ue.remove(j)}function ht(U){t(".clear-confirm").hidden=!U,t(".clear-n").textContent=String(me.length),r.result.classList.toggle("confirming",U),U&&(t(".copy-status").hidden=!0)}function G(){me.length=0,Ie=null,ue.remove(T),ue.remove(j),ht(!1),t(".copy-status").hidden=!1,t(".copy-status").textContent="\u5DF2\u6E05\u9664\u5168\u90E8\u7D00\u9304\uFF080 \u5C40\uFF09"}let q=()=>({schema:"s1-run-log/1",copiedAt:new Date().toISOString(),pageOpenedAt:z,build:{version:ps,sha:g&&!g.startsWith("__")?g:"dev",art:hs?"myth":"default",cam:Gu?"near":"far"},note:"rematch\uFF1D\u8A72\u5C40\u7D50\u675F\u5F8C\u6709\u6C92\u6709\u6309\u300C\u518D\u4E00\u5834\u300D\uFF1Bnext\uFF1D\u7D50\u675F\u5F8C\u7684\u7B2C\u4E00\u500B\u52D5\u4F5C\uFF08again\uFF0Frestart\uFF0Ftitle\uFF0Fother-entry\uFF0Fnull\uFF1D\u9084\u6C92\u52D5\u4F5C\uFF09\uFF1BendedBy\uFF1Dresult \u6253\u5B8C\u3001abandoned \u4E2D\u9014\u96E2\u958B",runs:me});async function ye(){let U=JSON.stringify(q(),null,2),w=t(".copy-status"),F=t(".copybox");w.hidden=!1,F.hidden=!0;try{if(!navigator.clipboard?.writeText)throw new Error("no clipboard");await navigator.clipboard.writeText(U),w.textContent=`\u5DF2\u8907\u88FD\uFF08${me.length} \u5C40\uFF09`}catch{r.result.classList.add("copying"),F.value=U,F.hidden=!1,F.focus(),F.select(),F.setSelectionRange(0,U.length),F.scrollTop=0;let N=!1;try{N=document.execCommand("copy")}catch{N=!1}w.textContent=N?`\u5DF2\u8907\u88FD\uFF08${me.length} \u5C40\uFF09`:"\u7121\u6CD5\u81EA\u52D5\u8907\u88FD\uFF1A\u5167\u5BB9\u5DF2\u5168\u9078\uFF0C\u8ACB\u624B\u52D5\u62F7\u8C9D\uFF08\u9577\u6309\u2192\u62F7\u8C9D\uFF09"}}let Ce={s0enemy:"\u6575\u4EBA",hunter:"\u7375\u624B",guardian:"\u76FE\u77DB\u885B\u58EB",shieldbearer:"\u76FE\u5175",archer:"\u5F13\u624B"},fe=()=>{for(let U of Object.values(r))U.hidden=!0};function re(U,w,F){S=U,R=w,F&&(C=F),Re=w==="s1",et=null,ge=-1/0,ue.remove(j),At(),w==="v3"?e.onStart(U,w,{ledgeDepth:A}):w==="v4"||w==="s1"?e.onStart(U,w,{path:C}):e.onStart(U,w),cn.showPlaying()}function Oe(){$e(),E=!0,e.onPause(),r.pause.hidden=!1}let Qe=t('[data-act="mute"]');s.addEventListener("click",U=>{let w=U.target.closest("[data-act]")?.getAttribute("data-act");if(w){if(/^(start-|v4-|s1-)/.test(w)&&Te("other-entry"),w==="altar"){It(Number(U.target.closest("[data-idx]")?.getAttribute("data-idx")));return}switch(w){case"start-v2-1v1":re("1v1","v2");break;case"art-toggle":Jp("art","myth");break;case"cam-toggle":Jp("cam","near");break;case"start-v3-1v1":re("1v1","v3");break;case"s1-ares":re("run","s1","ares");break;case"s1-mars":re("run","s1","mars");break;case"s1-none":re("run","s1","none");break;case"copy-record":ht(!1),ye();break;case"clear-record":ht(!0);break;case"clear-no":ht(!1);break;case"clear-yes":G();break;case"v4-ares":re("waves","v4","ares");break;case"v4-mars":re("waves","v4","mars");break;case"v4-none":re("waves","v4","none");break;case"ledge-depth":A=A===2.6?1.5:2.6,U.target.closest("[data-act]").textContent=`\u6500\u9644\u9580\u6ABB\uFF1A${A}`;break;case"start-s0-1v1":re("1v1","s0");break;case"start-s0-1v2":re("1v2","s0");break;case"again":Te("again"),re(S,R,C);break;case"restart":Te("restart"),re(S,R,C);break;case"howto":r.title.hidden=!0,r.howto.hidden=!1;break;case"back":r.howto.hidden=!0,r.title.hidden=!1;break;case"resume":E=!1,r.pause.hidden=!0,e.onResume();break;case"title":Te("title"),cn.showTitle();break;case"mute":v=!v,Qe.textContent=`\u97F3\u6548\uFF1A${v?"\u95DC":"\u958B"}`,e.setMuted(v);break}}}),t(".pause").addEventListener("click",()=>{te()&&Oe()});let St={basic:"",control:"",push:"",dash:""};function At(){let U=we(),w={basic:U||hs?{tag:"myth",svg:ba.basic}:{tag:"default",svg:er.basic},control:U||hs?{tag:"myth",svg:ba.control}:{tag:"default",svg:er.control},push:U&&C==="ares"?{tag:"charge",svg:l_}:U?C==="mars"?{tag:"myth",svg:ba.push}:{tag:"default",svg:er.push}:hs?{tag:"myth",svg:ba.push}:{tag:"default",svg:er.push},dash:{tag:"default",svg:er.dash}};for(let F of Object.keys(w))St[F]!==w[F].tag&&(St[F]=w[F].tag,m[F].dataset.icon=w[F].tag,m[F].querySelector("svg").outerHTML=w[F].svg)}St.basic=hs?"myth":"default",St.control=St.basic,St.push=St.basic,St.dash="default";let In={ares:"\u963F\u745E\u65AF",mars:"\u746A\u723E\u65AF",none:"\u7121\u9053\u8DEF"},Un=1.5,rn="",jn=t(".revive-n"),Oi=t(".revive"),Ls=t(".wave"),us=t(".protect"),Hi=t(".reviving"),tr=t(".reviving-t"),ds=U=>U.variant==="s1"?`\u5019\u9078 S1\uFF08${In[U.s1?.record.path??U.v4?.path??C]}\uFF09`:U.variant==="v4"?`\u5019\u9078 v0.4\uFF08${In[U.v4?.path??C]}\uFF09`:U.variant==="v3"?`\u5019\u9078 v0.3\uFF08\u6500\u9644 ${U.ledgeDepth??2.6}\uFF09`:U.variant==="v2"?"\u5019\u9078 v0.2":"S0 \u57FA\u6E96",un={ver:"",hp:"",fill:"",time:"",low:!1},nr={basic:{ring:"",text:"",cooling:!1},control:{ring:"",text:"",cooling:!1},push:{ring:"",text:"",cooling:!1},dash:{ring:"",text:"",cooling:!1}},ao={knock:"\u64CA\u9000",dash:"\u885D\u523A"},lo={predicted:"\u9810\u8A08",actual:"\u5BE6\u969B"},co={"dash-out":"\u4E3B\u52D5\u885D\u523A","too-deep":"\u592A\u6DF1",locked:"\u9396\u5B9A\u4E2D","no-landing":"\u7121\u843D\u9EDE"},ho={pending:"\u9032\u884C\u4E2D",rescue:"\u6551\u56DE",climbed:"\u7FFB\u56DE",knocked:"\u88AB\u6253\u843D",timeout:"\u6642\u9593\u5230",hp:"\u8840\u76E1",fall:"\u589C\u843D"},uo=U=>U.startsWith("accepted")?`\u5DF2\u6309${U.slice(8)}`:U.startsWith("buffered")?`\u63D0\u65E9\u6309${U.slice(8)}`:U==="none"?"\u6C92\u6309":U,Ai=U=>[`${U.t.toFixed(1)}s`,U.who,ao[U.source]??U.source,U.depth===null?"\u2014":`${U.depth.toFixed(1)}${U.basis?` ${lo[U.basis]}`:""}`,U.eligible?"\u53EF\u6500\u9644":`\u4E0D\u53EF\uFF08${U.reason?co[U.reason]??U.reason:"\u2014"}\uFF09`,uo(U.input),ho[U.outcome]??U.outcome],L=t(".edge"),J=t(".edge-list");L.addEventListener("toggle",()=>r.result.classList.toggle("edge-open",L.open));function ne(U){let w=U.edgeLog??[];L.hidden=w.length===0&&U.variant!=="v3",L.open=!1,r.result.classList.remove("edge-open"),t(".edge-n").textContent=String(w.length);let F=document.createElement("table"),N=F.insertRow();for(let M of["\u6642\u9593","\u8AB0","\u4F86\u6E90","\u6DF1\u5EA6","\u53EF\u5426\u6500\u9644","\u7FFB\u56DE\u9375","\u7D50\u679C"]){let I=document.createElement("th");I.textContent=M,N.appendChild(I)}for(let M of w){let I=F.insertRow();for(let H of Ai(M))I.insertCell().textContent=H}if(w.length===0){let M=F.insertRow().insertCell();M.colSpan=7,M.textContent="\u672C\u5834\u6C92\u6709\u51FA\u754C"}J.replaceChildren(F)}function ie(U){let w=U.s1,F=t(".s1res"),N=t('[data-act="copy-record"]');if(F.hidden=!w,N.hidden=!w,t('[data-act="clear-record"]').hidden=!w,ht(!1),t(".copy-status").hidden=!0,t(".copybox").hidden=!0,r.result.classList.remove("copying"),!w)return;let M=w.record;Re=!1,Ze(M,"result"),t(".s1where").textContent=`${U.result==="win"?"\u901A\u95DC":"\u6B62\u6B65"}\uFF1A\u5CF6 ${M.reached.island}\uFF0F${w.islandTotal} \xB7 \u7B2C ${M.reached.wave} \u6CE2 \xB7 ${In[M.path]}`;let I=M.coins;t(".s1coins").textContent=I?`\u9280\u5E63\uFF1A\u6536\u5165 ${I.fromKills+I.fromJumps}\uFF08\u64CA\u6BBA ${I.fromKills}\uFF0B\u8DF3\u9EDE ${I.fromJumps}\uFF09\u3001\u82B1\u8CBB ${I.spent.reduce((Y,ee)=>Y+ee.price,0)}\u3001\u9918\u984D ${I.end}`:"";let H=[...M.downs].reverse().find(Y=>!Y.revived)??M.downs[M.downs.length-1];t(".s1death").textContent=U.result==="win"||!H?"":`\u6B7B\u56E0\uFF1A${H.cause==="fall"?"\u589C\u843D":"\u8840\u91CF\u6B78\u96F6"}${H.byKit?`\uFF08${Ce[H.byKit]}\uFF09`:""}\uFF08\u5CF6 ${H.island}\uFF0F\u7B2C ${H.wave} \u6CE2\uFF0C${H.t.toFixed(1)} \u79D2\uFF09`}function Z(U){let w=t(".v4res"),F=U.v4;if(w.hidden=!F,!F)return;let N=(I,H)=>F.kills.filter(Y=>Y.how===I&&Y.where===H).length,M=(I,H)=>`${H} ${N(I,"center")+N(I,"edge")}\uFF08\u4E2D\u592E ${N(I,"center")}\uFF0F\u5D16\u908A ${N(I,"edge")}\uFF09`;t(".v4kills").textContent=`${M("hp","\u6253\u6B7B")}\u3000${M("fall","\u64CA\u843D")}`,t(".v4meta").textContent=`${In[F.path]} \xB7 \u7B2C ${F.wave.index}\uFF0F${F.wave.total} \u6CE2 \xB7 \u7834\u9632 ${F.breaks} \xB7 \u5B8C\u7F8E\u683C\u64CB ${F.perfectBlocks} \xB7 \u53CD\u64CA \u76FE\u64CA ${F.counters.bash}\uFF0F\u8FD1\u8EAB ${F.counters.melee}`}let ve=null;function Le(U,w){let F=U.v4,N=U.s1,M=F?.revivesLeft;Oi.style.display=M===void 0?"none":"",jn.textContent=`\xD7${M??0}`,Oi.classList.toggle("spent",(M??0)<=0);let I=F?.wave.index??N?.record.reached.wave;if(N?.stage?.kind==="altar"){let K=`\u796D\u58C7 ${N.stage.altar}`;Ls.textContent=K;let pe=`altar-${N.stage.altar}`;pe!==rn&&(rn=pe,cn.banner(K,"info"))}else if(I!==void 0){let K=N?`\u5CF6 ${N.islandIndex}\uFF0F${N.islandTotal} \xB7 \u7B2C ${I} \u6CE2`:`\u7B2C ${I} \u6CE2`;Ls.textContent=K;let pe=`${N?.islandIndex??0}-${I}`;if(pe!==rn){let ke=!!N&&rn.split("-")[0]!==String(N.islandIndex);rn=pe,I>0&&cn.banner(ke?K:`\u7B2C ${I} \u6CE2`,"info")}}let H=w.protectT??0;us.classList.toggle("on",H>0),H>0&&(us.textContent=`\u4FDD\u8B77\u4E2D ${H.toFixed(1)}`),c.parentElement.classList.toggle("protected",H>0);let Y=w.state==="reviving";Hi.classList.toggle("on",Y),Y&&(tr.textContent=Math.max(0,Un-w.stateT).toFixed(1));let ee=(w.counterT??0)>0;m.basic.classList.toggle("counter",ee),m.push.classList.toggle("counter",ee)}let Ne=t(".coins"),Ve=t(".coins-n"),st=t(".blessings"),lt=t(".offers"),je=null,gt="",Lt="",qt=[];function Ht(U){let w=U.s1;if(U.variant!=="s1"||!w){je=null,gt="",zt([]);return}w.coins!==void 0&&(Ve.textContent=String(w.coins),je!==null&&w.coins!==je&&(Ne.classList.remove("pop"),Ne.offsetWidth,Ne.classList.add("pop")),je=w.coins);let F=(w.blessings??[]).slice(0,2),N=F.join(",");N!==gt&&(gt=N,st.replaceChildren(...F.map(M=>{let I=document.createElement("div");return I.className=`bless ${M}`,I.dataset.blessing=M,I.title=Zc[M],I.innerHTML=s_[M],I}))),zt((w.offers??[]).filter(M=>M.reason!=="notHere"))}let Ut=()=>C==="mars"?"\u963F\u745E\u65AF":"\u746A\u723E\u65AF",it=U=>{let w=U.action;return w.kind==="bless"?w.replace?`\u63DB\u6389 ${Zc[w.replace]}`:Zc[w.blessing]:w.kind==="convert"?`\u6539\u5949 ${Ut()}`:"\u7948\u6C42\u5FA9\u6D3B"};function zt(U){let w=JSON.stringify([U.map(M=>[M.spot,M.action,M.price,M.ok,M.reason]),C]);if(w===Lt)return;Lt=w,qt=U,lt.hidden=U.length===0;let F=document.createElement("div");F.className="offers-target",F.textContent=U.length?r_[U[0].spot]:"";let N=document.createElement("div");N.className="offers-row",N.append(...U.map((M,I)=>{let H=document.createElement("div");H.className=`offer ${M.price===0?"free":"paid"}${M.ok?"":" off"}`,H.setAttribute("role","button"),H.setAttribute("aria-disabled",M.ok?"false":"true"),H.dataset.act="altar",H.dataset.idx=String(I);let Y=document.createElement("b");Y.className="offer-name",Y.textContent=it(M);let ee=document.createElement("span");if(ee.className="offer-price",M.price===0?ee.textContent="\u514D\u8CBB":(ee.innerHTML=`${o_}<i></i>`,ee.querySelector("i").textContent=String(M.price)),H.append(Y,ee),!M.ok){let K=document.createElement("em");K.className="offer-reason",K.textContent=M.reason?a_[M.reason]:"\u4E0D\u80FD\u8CB7",H.append(K)}return H})),lt.replaceChildren(F,N)}function It(U){let w=qt[U];!w||!w.ok||e.onAltar?.(w.action)}let fn=t(".exit-hint"),Qn=!1,pn=[];function ri(){for(let U of pn)window.clearTimeout(U);pn=[],fn.classList.remove("on","fade"),s.classList.remove("hint-on")}function Yt(U){let w=U.s1?.phase==="exit";w&&!Qn?(ri(),fn.textContent=U.s1?.stage?.kind==="altar"?"\u8D70\u9032\u51FA\u53E3\u5149\u5708":"\u6E05\u5834\uFF01\u8D70\u9032\u51FA\u53E3\u5149\u5708",fn.classList.add("on"),s.classList.add("hint-on"),pn.push(window.setTimeout(()=>fn.classList.add("fade"),2500)),pn.push(window.setTimeout(ri,3e3))):!w&&Qn&&ri(),Qn=w}let cn={readIntent(){let U={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null};if(!te())return k=null,P=!1,V=!1,W=!1,U;let w;if(_)w=_.move;else{let Y=($.has("KeyD")?1:0)-($.has("KeyA")?1:0),ee=($.has("KeyS")?1:0)-($.has("KeyW")?1:0);Y&&ee&&(Y*=Math.SQRT1_2,ee*=Math.SQRT1_2),w={x:Y,z:ee}}let F=D.basic,N=we(),M=!!F||_e||se||N&&V,I=null;F&&F.dragged?I=qe(F):!F&&_e&&(I=B());let H={move:{x:w.x,z:w.z},fire:M,fireDir:I,cast:k,dash:P,dashDir:null};if(N&&(H.firePressed=V),de()){let Y=D.push;H.guardHeld=!!Y||X||W,H.guardPressed=W,H.guardDir=Y&&Y.dragged&&Math.hypot(Y.x-Y.cx,Y.y-Y.cy)>=Y.r*Kc?qe(Y):null}return k=null,P=!1,V=!1,W=!1,H},aimPreview(){if(!te())return null;for(let w of["control","push"]){if(w==="push"&&de())continue;let F=D[w];if(F&&F.dragged){let N=be(F,w),M=qe(F);if(M)return{skill:w,dir:M,cancel:N}}}if(oe)return{skill:oe,dir:B()??{x:1,z:0},cancel:he};let U=D.basic;if(U&&U.dragged){let w=qe(U);if(w)return{skill:"basic",dir:w,cancel:!1}}if(!U&&_e){let w=B();if(w)return{skill:"basic",dir:w,cancel:!1}}return null},update(U){let w=`${ds(U)} \xB7 ${p}`;w!==un.ver&&(un.ver=w,d.textContent=w);let F=U.fighters.find(pe=>pe.id===U.playerId);if(!F)return;let M=`${Math.max(0,Math.ceil(F.hp))} / ${Math.ceil(F.maxHp)}`;M!==un.hp&&(un.hp=M,h.textContent=M);let I=`${Math.max(0,Math.min(1,F.hp/F.maxHp))*100}%`;I!==un.fill&&(un.fill=I,c.style.width=I);let H=F.hp/F.maxHp<.3;H!==un.low&&(un.low=H,c.classList.toggle("low",H));let Y=Math.max(0,Math.floor(U.time)),ee=`${String(Math.floor(Y/60)).padStart(2,"0")}:${String(Y%60).padStart(2,"0")}`;ee!==un.time&&(un.time=ee,u.textContent=ee),U.s1&&(et=U.s1.record,Re&&performance.now()-ge>=2e3&&(ge=performance.now(),ue.set(j,JSON.stringify(U.s1.record)))),(U.variant!==R||(U.variant==="v4"||U.variant==="s1")&&F.path&&F.path!==C)&&(R=U.variant,S=U.mode,F.path&&(C=F.path),At());let K=U.variant==="v4"||U.variant==="s1";n.classList.toggle("v4",K),K&&Le(U,F),n.classList.toggle("s1",U.variant==="s1"),Ht(U),Yt(U),m.dash.classList.toggle("ledge",F.state==="ledge"),m.dash.classList.toggle("climbing",F.state==="climb");for(let pe of Object.keys(x)){let ut=pe==="dash"&&(F.state==="ledge"||F.state==="climb")?0:F.cooldowns[pe]??0,Rt=F.cooldownMax[pe]??0;Q[pe]=ut;let ei=`${((Rt>0?Math.max(0,Math.min(1,ut/Rt)):0)*360).toFixed(0)}deg`,ui=pe!=="basic"&&ut>.05?ut>=10?ut.toFixed(0):ut.toFixed(1):"",fs=nr[pe];ei!==fs.ring&&(fs.ring=ei,x[pe].ring.style.setProperty("--cd",ei)),ui!==fs.text&&(fs.text=ui,x[pe].text.textContent=ui);let ir=ut>.05;ir!==fs.cooling&&(fs.cooling=ir,m[pe].classList.toggle("cooling",ir))}},showTitle(){ve?.cancel(),zt([]),$e(),y=!1,E=!1,fe(),n.hidden=!0,i.hidden=!0,r.title.hidden=!1},showResult(U){ve?.cancel(),zt([]),$e(),y=!1,E=!1,S=U.mode,R=U.variant,U.ledgeDepth&&(A=U.ledgeDepth),U.v4&&(C=U.v4.path),fe(),n.hidden=!0,i.hidden=!0;let w=U.result==="win",F=r.result;F.classList.toggle("win",w),F.classList.toggle("lose",!w),F.classList.toggle("no-stats",U.variant==="v4"||U.variant==="s1"),F.querySelector(".res-title").textContent=w?"\u52DD\u5229":"\u5931\u6557",F.querySelector(".res-text").textContent=w?"":U.loseText??"";let N=U.stats,M=(I,H)=>{F.querySelector(`[data-stat="${I}"]`).textContent=H};M("acc",N.shotsFired>0?`${Math.round(N.shotsHit*100/N.shotsFired)}%\uFF08${N.shotsHit}/${N.shotsFired}\uFF09`:"\u2014"),M("combos",String(N.combos)),M("fall",String(N.kills.fall)),M("hp",String(N.kills.hp)),ne(U),Z(U),ie(U),F.hidden=!1},showPlaying(){$e(),y=!0,E=!1,fe(),n.hidden=!1,i.hidden=!1,rn="";for(let U of[us,Hi])U.classList.remove("on");m.basic.classList.remove("counter"),m.push.classList.remove("counter"),n.classList.toggle("v4",we()),n.classList.toggle("s1",R==="s1"),ri(),Qn=!1,je=null,gt="",zt([]),st.replaceChildren()},banner(U,w){f.textContent=U,f.className=`banner ${w}`,ve?.cancel(),typeof f.animate=="function"&&(ve=f.animate([{opacity:0,transform:"translate(-50%, 0) scale(0.7)"},{opacity:1,transform:"translate(-50%, 0) scale(1.05)",offset:.15},{opacity:1,transform:"translate(-50%, 0) scale(1)",offset:.65},{opacity:0,transform:"translate(-50%, -14px) scale(1)"}],{duration:1200,easing:"ease-out",fill:"both"}))}};return cn.showTitle(),cn}var h_={shootP:.05,shootE:.14,hitP:.05,hitE:.07,hurt:.12,windupH:.4,windupB:.25,windupP:.2,windupEP:.35,windupEC:.3,shootEC:.2,strikeBlocked:.2,ledgeGrabP:.3,ledgeGrabE:.3,ledgeRdy:.1,ledgeClimbP:.2,ledgeClimbE:.2,ledgeDropP:.3,ledgeDropE:.3,meleeP:.08,meleeE:.15,blockB:.12,blockG:.1,blockPf:.2,recoilP:.15,recoilE:.2,gBreak:.5,armorP:.4,armorE:.4,chargeP:.3,chargeE:.3,cReady:.3,cUsed:.15,cLost:.3,reviveS:.5,reviveG:.5,wave:.6,exitOpen:1,jump:1.5,land:1,coinPick:.05,coinsAll:.5,rewardC:.5,rewardH:.5,buyBless:.3,buyConv:.3,buyRev:.3,denied:.15,windupM:.2,cast:.1,dash:.1,blocked:.07,fall:.3,combo:.15};function tm(){let s=null,e=null,t=null,n=!1,i=0,r={},o=0,a=-9,l=new Map,c=.2;function h(v){let S=l.get(v);S!==void 0&&(clearTimeout(S),l.delete(v))}function u(){if(s)return s;let v=window,S=v.AudioContext||v.webkitAudioContext;if(!S)return null;try{s=new S}catch{return null}e=s.createGain(),e.gain.value=n?0:.5;let R=s.createDynamicsCompressor();R.threshold.value=-18,R.ratio.value=6,R.attack.value=.003,R.release.value=.15,e.connect(R),R.connect(s.destination),t=s.createBuffer(1,s.sampleRate,s.sampleRate);let A=t.getChannelData(0);for(let C=0;C<A.length;C++)A[C]=Math.random()*2-1;return s}function d(v){return i>=28?!1:(i++,setTimeout(()=>{i=Math.max(0,i-1)},(v+.1)*1e3),!0)}function f(v,S,R,A,C=.004){v.gain.setValueAtTime(1e-4,S),v.gain.linearRampToValueAtTime(R,S+C),v.gain.exponentialRampToValueAtTime(1e-4,S+A)}function m(v,S,R,A,C,b,_=0){if(!e||!d(C+_))return;let D=v.currentTime+_,k=v.createOscillator(),P=v.createGain();k.type=S,k.frequency.setValueAtTime(R,D),A!==R&&k.frequency.exponentialRampToValueAtTime(Math.max(20,A),D+C),f(P,D,b,C),k.connect(P),P.connect(e),k.start(D),k.stop(D+C+.02)}function x(v,S,R,A,C,b,_,D=0){if(!e||!t||!d(b+D))return;let k=v.currentTime+D,P=v.createBufferSource();P.buffer=t,P.loop=!0;let V=v.createBiquadFilter();V.type=S,V.Q.value=C,V.frequency.setValueAtTime(R,k),A!==R&&V.frequency.exponentialRampToValueAtTime(Math.max(20,A),k+b);let W=v.createGain();f(W,k,_,b,.006),P.connect(V),V.connect(W),W.connect(e),P.start(k,Math.random()*.5),P.stop(k+b+.02)}function g(v,S){let R=v.currentTime;return R-(r[S]??-1)<(h_[S]??.05)?!1:(r[S]=R,!0)}function p(v,S,R){let A=S==="melee3"||S==="charge"||S==="counterBash",C=R?1.15:1;m(v,"sine",A?130:160,A?48:70,A?.3:.18,(A?.55:.42)*C),x(v,"lowpass",A?1100:1500,200,.7,A?.2:.11,(A?.3:.22)*C),(S==="counterBash"||S==="counterMelee")&&m(v,"triangle",880,660,.1,.12,.02),R&&m(v,"triangle",300,200,.1,.1)}function y(v,S,R){if(S==="melee1"||S==="melee2"||S==="melee3"||S==="charge"||S==="counterBash"||S==="counterMelee"){p(v,S,R);return}let A=S==="push"||S==="enemyHeavy";R?(m(v,"sine",A?150:200,A?55:90,A?.32:.2,A?.5:.36),x(v,"lowpass",1400,300,.7,A?.26:.14,A?.3:.2),m(v,"triangle",330,220,.12,.12)):A?(m(v,"sine",170,60,.28,.42),x(v,"bandpass",900,250,.9,.22,.26)):S==="control"?(m(v,"triangle",520,300,.12,.2),x(v,"bandpass",2400,1400,1.2,.09,.14)):(m(v,"square",760,520,.05,.07),x(v,"highpass",3e3,3e3,.7,.05,.1))}function E(v,S,R){switch(S.type){case"shoot":{let A=S.ownerId===R;if(!g(v,A?"shootP":S.kind==="control"?"shootEC":"shootE"))return;if(!A&&S.kind==="control")m(v,"sawtooth",240,150,.14,.09),x(v,"bandpass",700,350,2,.12,.09);else if(A){let C=S.kind==="control";m(v,"square",C?520:900,C?260:380,.07,.07),x(v,"bandpass",2600,1200,1.4,.05,.08)}else m(v,"sine",300,150,.09,.1),x(v,"lowpass",900,400,.8,.06,.08);return}case"hit":{let A=S.targetId===R;if(!A&&S.sourceId!==R||!g(v,A?"hurt":"hitP"))return;y(v,S.kind,A);return}case"windupStart":{if(S.skill==="enemyHeavy"){if(!g(v,"windupH"))return;m(v,"triangle",392,440,.16,.26),m(v,"triangle",523,587,.2,.28,.15),m(v,"sine",196,262,Math.min(.5,S.dur),.18)}else if(S.skill==="enemyBasic"){if(!g(v,"windupB"))return;m(v,"sine",620,700,.06,.07)}else if(S.skill==="melee1"||S.skill==="melee2"||S.skill==="melee3"||S.skill==="charge"){if(S.ownerId===R||!g(v,"windupM"))return;S.skill==="charge"?(m(v,"sawtooth",80,140,Math.min(.4,S.dur),.14),x(v,"lowpass",300,700,.8,.25,.1)):m(v,"sine",330,S.skill==="melee3"?420:380,.08,.09)}else if(S.ownerId!==R&&S.skill==="push"){if(!g(v,"windupEP"))return;m(v,"sine",90,190,.2,.3),x(v,"lowpass",300,1100,.9,.18,.16)}else if(S.ownerId!==R&&S.skill==="control"){if(!g(v,"windupEC"))return;m(v,"sawtooth",700,1500,.14,.1),x(v,"bandpass",2400,4200,3,.1,.1)}else if(S.ownerId===R){if(!g(v,"windupP"))return;m(v,"sine",240,380,Math.min(.3,S.dur),.09)}return}case"cast":{if(!g(v,"cast"))return;let A=S.skill==="enemyHeavy";m(v,"sine",A?120:140,40,.38,A?.55:.5),x(v,"lowpass",1800,150,.8,.3,.3);return}case"dash":{if(!g(v,"dash"))return;let A=S.ownerId===R;x(v,"bandpass",600,3800,1.1,.22,A?.26:.14);return}case"blocked":{if(!g(v,"blocked"))return;m(v,"triangle",190,110,.07,.2),x(v,"bandpass",1500,900,2,.06,.2);return}case"fall":{if(!g(v,"fall"))return;let C=S.ownerId===R?.3:.2;x(v,"bandpass",1800,220,1.6,.9,C),m(v,"sine",700,120,.9,C*.45);return}case"blockedStrike":{if(!g(v,"strikeBlocked"))return;let A=S.ownerId===R||S.targetId===R?1:.5;m(v,"sine",110,45,.3,.5*A),x(v,"lowpass",700,120,.8,.22,.3*A);return}case"ledgeGrab":{let A=S.ownerId===R;if(!g(v,A?"ledgeGrabP":"ledgeGrabE"))return;m(v,"sine",95,50,.26,A?.5:.28),x(v,"bandpass",1800,500,1.1,.2,A?.26:.16),x(v,"highpass",4200,2600,.7,.07,A?.1:.06,.05),A||(m(v,"square",740,740,.06,.1,.04),m(v,"square",988,988,.08,.1,.13)),h(S.ownerId),l.set(S.ownerId,setTimeout(()=>{l.delete(S.ownerId),!(n||!s||s.state!=="running"||!g(s,"ledgeRdy"))&&(A?m(s,"sine",1040,1040,.05,.1):m(s,"sawtooth",1480,1480,.07,.09))},c*1e3));return}case"ledgeClimb":{h(S.ownerId);let A=S.ownerId===R;if(!g(v,A?"ledgeClimbP":"ledgeClimbE"))return;x(v,"bandpass",500,2200,1,.18,A?.22:.12),m(v,"triangle",A?220:300,A?420:600,.16,A?.16:.09),m(v,"sine",A?120:160,A?70:100,.12,A?.3:.16,.17);return}case"ledgeDrop":{h(S.ownerId);let A=S.ownerId===R;if(!g(v,A?"ledgeDropP":"ledgeDropE"))return;let C=A?1:.6;S.reason==="knocked"?(m(v,"sine",180,55,.3,.45*C),x(v,"lowpass",1600,250,.8,.24,.26*C)):(x(v,"bandpass",3e3,700,1.6,.3,.2*C),m(v,"sine",420,130,.32,.18*C));return}case"melee":{let A=S.ownerId===R;if(!g(v,A?"meleeP":"meleeE"))return;let C=A?1:.55;S.hit?x(v,"bandpass",1500,700,1.2,.07,.07*C):(x(v,"bandpass",S.counter?3200:2400,S.counter?900:600,1.3,.16,.2*C),m(v,"sine",S.step===3?260:340,140,.12,.08*C));return}case"shieldBlock":{if(S.attackerId!==R&&S.targetId!==R)return;if(S.kind==="bearer"){if(!g(v,"blockB"))return;m(v,"sine",410,380,.28,.26),m(v,"sine",655,610,.2,.2),x(v,"highpass",2500,2500,.8,.1,.18)}else if(S.kind==="perfect"){if(!g(v,"blockPf"))return;m(v,"sine",1568,1568,.45,.28),m(v,"sine",2349,2349,.35,.2,.01),m(v,"triangle",3136,3136,.2,.08,.02),x(v,"highpass",6e3,6e3,.7,.08,.12)}else{if(!g(v,"blockG"))return;m(v,"square",1200,900,.07,.1),x(v,"bandpass",3200,2200,1.8,.06,.14)}return}case"recoil":{let A=S.ownerId===R;if(!g(v,A?"recoilP":"recoilE"))return;m(v,"sine",300,110,.12,A?.3:.16);return}case"guardBreak":{if(!g(v,"gBreak"))return;let A=S.targetId===R?1:.8;m(v,"sawtooth",700,520,.09,.14*A),m(v,"sawtooth",820,430,.09,.12*A,.1),m(v,"sawtooth",620,300,.12,.09*A,.2),x(v,"bandpass",2800,500,1.4,.3,.18*A),m(v,"sine",150,60,.25,.3*A,.02);return}case"armor":{let A=S.ownerId===R;if(!g(v,A?"armorP":"armorE"))return;m(v,"sine",70,95,Math.min(.35,S.dur),A?.22:.14),x(v,"lowpass",260,520,.9,.2,A?.1:.06);return}case"charge":{let A=S.ownerId===R;if(!g(v,A?"chargeP":"chargeE"))return;let C=A?1:.6;x(v,"lowpass",350,1100,.9,.4,.3*C),m(v,"sawtooth",70,130,.35,.16*C);return}case"counterReady":{if(S.ownerId!==R||!g(v,"cReady"))return;m(v,"triangle",1175,1175,.12,.18),m(v,"triangle",1568,1568,.2,.2,.09),x(v,"highpass",6500,6500,.7,.1,.06,.09);return}case"counterUsed":{if(S.ownerId!==R||!g(v,"cUsed"))return;S.kind==="bash"?(m(v,"square",700,260,.08,.14),m(v,"sine",110,55,.14,.3)):(x(v,"bandpass",3e3,900,1.3,.1,.16),m(v,"triangle",1318,1318,.08,.12,.02));return}case"counterLost":{if(S.ownerId!==R||!g(v,"cLost"))return;m(v,"sine",880,440,.14,.1);return}case"reviveStart":{if(S.ownerId!==R||!g(v,"reviveS"))return;m(v,"sine",196,165,.5,.2),m(v,"sine",196,165,.45,.1,.28),x(v,"lowpass",500,200,.7,.6,.08);return}case"revive":{if(S.ownerId!==R||!g(v,"reviveG"))return;[392,523.25,659.25,783.99].forEach((A,C)=>m(v,"triangle",A,A,C===3?.45:.14,.2,C*.09));return}case"waveStart":{if(!g(v,"wave"))return;m(v,"sawtooth",220,220,.4,.1),m(v,"sawtooth",330,330,.4,.1,.18),S.index>=S.total-1&&m(v,"sawtooth",440,440,.5,.1,.36);return}case"exitOpen":{if(!g(v,"exitOpen"))return;m(v,"sine",784,784,.35,.16),m(v,"sine",1175,1175,.5,.14,.12),m(v,"triangle",1568,1568,.45,.07,.24),x(v,"highpass",6e3,6e3,.7,.2,.05,.12);return}case"jumpStart":{if(S.ownerId!==R||!g(v,"jump"))return;m(v,"sine",160,70,.14,.3),x(v,"bandpass",600,2600,.9,.35,.18,.05),x(v,"bandpass",2600,500,.8,1.2,.22,.35);return}case"land":{if(S.ownerId!==R||!g(v,"land"))return;m(v,"sine",90,38,.45,.6),x(v,"lowpass",900,120,.8,.4,.4),x(v,"highpass",3500,2200,.7,.18,.12,.06);return}case"coinPickup":{if(!g(v,"coinPick"))return;let A=v.currentTime;o=A-a<.5?Math.min(o+1,7):0,a=A;let C=Math.round(1320*Math.pow(2,o/12));m(v,"sine",C,C,.09,.09),m(v,"triangle",C*2,C*2,.05,.025);return}case"coinsCollected":{if(!g(v,"coinsAll"))return;[1047,1319,1568,2093].forEach((A,C)=>m(v,"sine",A,A,.16,.1,C*.045)),x(v,"highpass",6500,6500,.7,.2,.05,.05);return}case"reward":{if(S.kind==="coins"){if(!g(v,"rewardC"))return;m(v,"sine",1568,1568,.3,.2),m(v,"sine",2093,2093,.4,.2,.1),m(v,"triangle",3136,3136,.2,.06,.1)}else{if(!g(v,"rewardH"))return;m(v,"sine",392,523,.55,.16),m(v,"sine",494,659,.55,.12,.05),m(v,"triangle",196,262,.6,.12)}return}case"altarBuy":{let A=S.action.kind;if(A==="bless"){if(!g(v,"buyBless"))return;[261.63,329.63,392,523.25].forEach((C,b)=>m(v,"sine",C,C,.9,.14,b*.04)),x(v,"highpass",7e3,7e3,.7,.4,.05,.2),S.price===0&&m(v,"sine",1046.5,1046.5,.6,.08,.3)}else if(A==="convert"){if(!g(v,"buyConv"))return;m(v,"sawtooth",330,330,.12,.1),m(v,"sawtooth",440,440,.16,.1,.1),x(v,"bandpass",2800,1400,1.6,.2,.16),m(v,"sine",880,880,.35,.1,.18)}else{if(!g(v,"buyRev"))return;m(v,"sine",196,294,.8,.2),m(v,"sine",196,294,.7,.1,.3),x(v,"lowpass",600,250,.7,.7,.08)}return}case"altarDenied":{if(!g(v,"denied"))return;m(v,"square",180,140,.1,.1),m(v,"square",160,120,.12,.1,.12);return}case"combo":{if(!g(v,"combo"))return;m(v,"sine",988,988,.14,.2),m(v,"sine",1319,1319,.22,.2,.08),m(v,"triangle",1976,1976,.2,.06,.08);return}case"roundEnd":{let A=S.result==="win",C=A?[523.25,659.25,783.99,1046.5]:[392,349.23,311.13,233.08];C.forEach((b,_)=>{let D=_===C.length-1;m(v,A?"triangle":"sine",b,b,D?.7:.2,.28,_*.17),A&&D&&m(v,"sine",b*1.5,b*1.5,.7,.1,_*.17)});return}default:return}}return{unlock(){let v=u();if(v)try{v.resume();let S=v.createBuffer(1,1,22050),R=v.createBufferSource();R.buffer=S,R.connect(v.destination),R.start(0)}catch{}},play(v,S){if(!(n||!s||!e||v.length===0)){if(s.state!=="running"){s.resume().catch(()=>{});return}for(let R of v)try{E(s,R,S)}catch{}}},setMuted(v){n=v,e&&s&&e.gain.setTargetAtTime(v?0:.5,s.currentTime,.01)}}}function u_(s){let e=/v(\d+(?:\.\d+)*)/.exec(s);return e?e[1]:"0"}function d_(s,e){let t=s.split(".").map(Number),n=e.split(".").map(Number);for(let i=0;i<Math.max(t.length,n.length);i++){let r=(t[i]||0)-(n[i]||0);if(r)return r}return 0}function nm(s){if(!/^https?:/.test(location.protocol))return;let e=u_(ps),t=document.createElement("button");t.id="updBar",s.appendChild(t);let n=0,i=null;t.addEventListener("click",()=>{i&&location.replace(`${location.pathname}?v=${i}`)});let r=o=>{let a=Date.now();if(!o&&a-n<6e4)return;n=a;let l=`${location.pathname.replace(/[^/]*$/,"")}index.html?upd=${a}`;fetch(l,{cache:"no-store"}).then(c=>c.ok?c.text():"").then(c=>{let h=/<meta name="app-version" content="([\d.]+)"/.exec(c);!h||d_(h[1],e)<=0||(i=h[1],t.textContent=`\u{1F195} \u6709\u65B0\u7248 v${i}\uFF0C\u9EDE\u9019\u88E1\u66F4\u65B0`,t.classList.add("on"))}).catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&r(!1)}),addEventListener("pageshow",()=>r(!1)),setTimeout(()=>r(!0),1500)}var om=new URLSearchParams(location.search),f_=document.getElementById("game"),p_=document.getElementById("overlay"),am=document.getElementById("ui"),m_=ms(),oo=Kp(f_,p_,m_),Xu=tm(),Mt=null,ro=!1,lm=om.get("ai")!=="0",io=0,_a=0,Sa=0,so=-1,Ma=[],im=di.seed,cm=()=>JSON.parse(JSON.stringify(Ma)),Ea=null,hm=s=>{Ea=s},hi=em(am,{onStart:(s,e,t)=>um(s,void 0,e,t),onPause:()=>{ro=!0},onResume:()=>{ro=!1},getPlayerPos:()=>Mt?Mt.player.pos:null,screenToGround:(s,e)=>oo.screenToGround(s,e),onFirstGesture:()=>Xu.unlock(),setMuted:s=>Xu.setMuted(s),runLog:cm,onAltar:hm});function Jc(){if(!Mt)return;let s=Mt.state.island.seed??di.seed;s!==im&&(im=s,oo.setIsland?.(Mt.state.island))}function um(s,e,t="s0",n={}){let i=e??(Number(om.get("seed"))||Date.now()%1e9);if(t==="s1"){n.again&&Ma.length&&(Ma[Ma.length-1].again=!0);let r=new gs(i,n.path??"ares");Ma.push(r.state.s1.record),Mt=r}else Mt=t==="v4"?new or(i,n.path??"ares"):new kt(s,i,t,n.ledgeDepth??2.6);Mt.aiEnabled=lm,oo.reset(),Jc(),hi.showPlaying(),ro=!1,io=0,_a=0,Sa=0,so=-1,Ea=null}var sm=new Map;function Wu(s,e,t){let n=performance.now();n-(sm.get(s)??-1e9)<1200||(sm.set(s,n),hi.banner(e,t))}function g_(s){if(!Mt)return;let e=Mt.state.playerId;for(let t of s)t.type==="combo"?hi.banner("\u9023\u62DB\uFF01","good"):t.type==="fall"?t.ownerId===e?hi.banner("\u589C\u843D\u2026\u2026","bad"):(hi.banner("\u64CA\u843D\uFF01","good"),Sa=.6):t.type==="death"&&t.ownerId!==e&&t.cause==="hp"?hi.banner("\u64CA\u5012\uFF01","good"):t.type==="edgeSave"&&t.ownerId===e?hi.banner("\u9A5A\u96AA\u6551\u56DE\uFF01","info"):t.type==="shieldBlock"?t.kind==="bearer"&&t.attackerId===e?Wu("bearer","\u683C\u64CB","bad"):t.kind==="guard"&&t.targetId===e&&t.skill==="enemyHeavy"?Wu("early","\u592A\u65E9","info"):t.kind==="perfect"&&t.targetId===e&&Wu("perfect","\u5B8C\u7F8E\u683C\u64CB\uFF01","good"):t.type==="roundEnd"?so=1.3:t.type==="islandStart"&&Jc()}var rm=performance.now();function dm(s){let e=Math.min(.1,(s-rm)/1e3);rm=s;let t=[],n=0;if(Mt&&!ro){if(_a>0)_a-=e;else{let i=Sa>0?.35:1;Sa=Math.max(0,Sa-e),io+=e*i;let r=0;for(;io>=zn&&r<6;){let o=hi.readIntent();Ea?(Mt.step({...o,altar:Ea}),Ea=null):Mt.step(o);for(let a of Mt.drainEvents())t.push(a);if(io-=zn,n+=zn,r++,Mt.hitstop>0){_a=Math.max(_a,Mt.hitstop),Mt.hitstop=0,io=0;break}}r>=6&&(io=0)}g_(t),Xu.play(t,Mt.state.playerId),so>0&&(so-=e,so<=0&&(so=-1,hi.showResult(Mt.state)))}Mt&&(oo.render(Mt.state,t,ro?null:hi.aimPreview(),n,e),hi.update(Mt.state)),requestAnimationFrame(dm)}function qu(){let s=window.visualViewport;oo.resize(s?s.width:innerWidth,s?s.height:innerHeight)}addEventListener("resize",qu);window.visualViewport?.addEventListener("resize",qu);qu();Mt=new kt("1v1",1);Mt.aiEnabled=!1;hi.showTitle();var v_={state:()=>JSON.parse(JSON.stringify(Mt.state)),start:(s,e,t,n)=>um(s,e,t,n),setAI:s=>{lm=s,Mt&&(Mt.aiEnabled=s)},place:(s,e,t)=>Mt?.place(s,e,t),kill:(s,e)=>Mt?.debugKill(s,e),freeze:s=>{ro=s},knock:(s,e,t)=>{if(!Mt)return;let n=Mt.state.fighters.find(i=>i.id!==s);n&&Mt.debugDamage(s,n.id,"push",t??0,e)},project:(s,e)=>oo.worldToScreen(s,e),version:`${ps} (8cac042)`,s1Clear:()=>{Mt instanceof gs&&Mt.debugClearIsland()},s1Goto:s=>{Mt instanceof gs&&(Mt.debugGotoIsland(s),Jc())},runLog:cm,s1GotoAltar:s=>{Mt instanceof gs&&(Mt.debugGotoAltar(s),Jc())},s1Coins:s=>{Mt instanceof gs&&Mt.debugSetCoins(s)},s1Altar:hm};window.__hunter=v_;nm(am);requestAnimationFrame(dm);})();
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
