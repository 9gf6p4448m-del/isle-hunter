"use strict";(()=>{var gn=.016666666666666666,ri={radius:10,points:56,seed:7},Sc={hp:100,speed:6.2,radius:.5},wc={hp:100,speed:5,radius:.5},zr=.5,Jo=.8,Hr=.25,Xn={shots:3,interval:.08,cooldown:.5,speed:24,range:9,radius:.22,dmg:6,autoAimRange:10},du=3,Lt={windup:.3,cooldown:6,speed:26,range:11,radius:.45,dmg:12,slow:1.6},Nt={windup:.12,recover:.2,cooldown:7,range:3.2,halfAngle:40*Math.PI/180,dmg:10},In={base:2.4,lowHpBonus:5.6,slowedBonus:1,knockTime:.35,dashCancelAfter:.1,edgeGrace:.12},fn={distance:3.6,time:.16,cooldown:3.5},fu=.15,Ec={duration:1.2,gravity:30},wt={hold:.8,protect:.2,climb:.2,landInset:1.2,lock:4,inputKeep:.15,hangOut:.45,catch:.08,landMargin:.35,searchAlong:.6,minInset:.6},pu=2.5,$t={windup:.3,shots:2,interval:.12,speed:15,range:9,radius:.25,dmg:6,cooldownMin:1.4,cooldownMax:2.1},Xt={windup:.65,recover:.6,cooldown:6,range:3,halfAngle:45*Math.PI/180,dmg:14},Ft={think:.15,preferMin:4.5,preferMax:7.5,edgeDanger:2.2,dodgeChance:.35,dodgeReactMin:.22,dodgeReactMax:.4,dodgeCooldown:4,edgeSaveChance:.5,edgeSaveReact:.25,strafeSwitchMin:1.5,strafeSwitchMax:2.5},jo={basic:.025,control:.06,push:.09,enemyBasic:.03,enemyHeavy:.09,melee1:.04,melee2:.04,melee3:.07,charge:.09,counterBash:.09,counterMelee:.04},rs=Math.PI/180,be={player:{hp:100,speed:6.2,radius:.5},edgeMargin:.35,melee:[{shape:"line",range:2.2,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"line",range:2.4,width:.6,halfAngle:0,windup:.1,recover:.12,dmg:8,stun:.18,knock:0,step:.3},{shape:"fan",range:2,width:0,halfAngle:70*rs,windup:.18,recover:.3,dmg:12,stun:0,knock:1.6,step:0}],meleeActive:.05,comboWindow:.35,attackMoveMult:.35,target:{keep:3.5,autoRange:3,autoHalfAngle:90*rs},recoil:.25,charge:{windup:.1,time:.22,distance:4,cooldown:6,contact:1,autoRange:6,dmg:6,breakDur:1.2,bounce:1,bounceStun:.35,archerStun:.4,hitRecover:.15,missRecover:.3,bounceTime:.12},guard:{moveMult:.4,maxHold:2,lock:1,turnRate:720*rs,blockHalfAngle:70*rs,perfect:.2,perfectBreak:1,chipDmg:3,pushback:.6,arrowScan:6,threatDrop:8,pushbackTime:.1},counter:{dur:.8,bash:{range:3.2,halfAngle:40*rs,dmg:14,knockMult:1.5,aimRange:3.7,recover:.2},melee:{step:.8,aimRange:3.5}},bearer:{hp:90,speed:4,frontHalfAngle:60*rs,turnRate:100*rs,heavyArmor:.25,approach:2.5},archer:{hp:60,speed:4.5,preferMin:6,preferMax:8,backstepTrigger:2.5,backstep:3,backstepCooldown:4,backstepTime:.25},stack:{window:1.5,hits:3,armor:.8},revive:{count:1,delay:1.5,hpFrac:.5,protect:1.5,edge:1.5,enemyClear:3,grid:.25},waves:{list:[["archer","archer"],["shieldbearer","archer"],["shieldbearer","shieldbearer","archer"]],gap:1.5,markLead:.8,minPlayerDist:5,minEdge:1.5,spacing:1.5,grid:.5},killEdge:2,inputBuffer:.15},Ot={islands:[{seed:21,waves:[["archer","archer"],["shieldbearer","archer"]]},{seed:13,waves:[["shieldbearer","archer","archer"],["shieldbearer","shieldbearer","archer"]]},{seed:37,waves:[["shieldbearer","shieldbearer","archer"],["shieldbearer","shieldbearer","archer","archer"]]}],exit:{delay:1,minDist:3,hold:.6,ring:1},jump:{air:1.5,protect:1,swapAt:.75},gen:{terms:[{k:2,amp:[.04,.07]},{k:3,amp:[.05,.08]},{k:5,amp:[.03,.05]},{k:9,amp:[.02,.03]}],rockR:[.8,1.3],rockDist:[2.8,6.5],rockEdge:1.5,rockGap:1.2,rockTries:400,keepOut:[{x:0,z:0,r:2},{x:0,z:3.5,r:1.5}]}},Hi="v0.5.1";var We=(s,e)=>({x:s.x+e.x,z:s.z+e.z}),it=(s,e)=>({x:s.x-e.x,z:s.z-e.z}),ae=(s,e)=>({x:s.x*e,z:s.z*e}),ot=s=>Math.hypot(s.x,s.z),lt=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z),Dt=(s,e)=>s.x*e.x+s.z*e.z;function _e(s){let e=Math.hypot(s.x,s.z);return e>1e-9?{x:s.x/e,z:s.z/e}:{x:0,z:0}}var Ps=s=>({x:Math.cos(s),z:Math.sin(s)}),ln=s=>Math.atan2(s.z,s.x),pn=s=>({x:-s.z,z:s.x});function Ls(s,e){let t=Math.cos(e),n=Math.sin(e);return{x:s.x*t-s.z*n,z:s.x*n+s.z*t}}function Qo(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Vi(s){return s===void 0||s===ri.seed?vp():xp(s)}function vp(){let s=ri.points,e=ri.radius,t=ri.seed,n=[];for(let i=0;i<s;i++){let r=i/s*Math.PI*2,o=e*(1+.07*Math.sin(3*r+t)+.05*Math.sin(5*r+t*2.1)+.03*Math.sin(9*r+t*.7));n.push({x:Math.cos(r)*o,z:Math.sin(r)*o})}return{poly:n,radius:e,rocks:[{pos:{x:-2.6,z:-3},r:1.3},{pos:{x:3.6,z:2.6},r:.85}]}}function xp(s){let e=Ot.gen,t=Qo(s),n=h=>h[0]+(h[1]-h[0])*t(),i=e.terms.map(h=>({k:h.k,amp:n(h.amp),phase:t()*Math.PI*2})),r=ri.points,o=ri.radius,a=[];for(let h=0;h<r;h++){let d=h/r*Math.PI*2,u=1;for(let f of i)u+=f.amp*Math.sin(f.k*d+f.phase);a.push({x:Math.cos(d)*u*o,z:Math.sin(d)*u*o})}let l=t()<.5?2:3,c=[];for(let h=0;h<e.rockTries&&c.length<l;h++){let d=n(e.rockR),u=t()*Math.PI*2,f=n(e.rockDist),v={x:Math.cos(u)*f,z:Math.sin(u)*f};yp(v,d,a,c)&&c.push({pos:v,r:d})}return{poly:a,radius:o,rocks:c,seed:s}}function yp(s,e,t,n){let i=Ot.gen;return Et(s,t)-e<i.rockEdge||n.some(r=>Math.hypot(r.pos.x-s.x,r.pos.z-s.z)<r.r+e+i.rockGap)?!1:i.keepOut.every(r=>Math.hypot(r.x-s.x,r.z-s.z)>=e+r.r)}function Tc(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let r=e[n],o=e[i];r.z>s.z!=o.z>s.z&&s.x<(o.x-r.x)*(s.z-r.z)/(o.z-r.z)+r.x&&(t=!t)}return t}function Et(s,e){let t=1/0;for(let n=0,i=e.length-1;n<e.length;i=n++)t=Math.min(t,Gi(s,e[i],e[n]));return Tc(s,e)?t:-t}function Gi(s,e,t){let n=t.x-e.x,i=t.z-e.z,r=n*n+i*i,o=r===0?0:Math.max(0,Math.min(1,((s.x-e.x)*n+(s.z-e.z)*i)/r)),a=e.x+n*o-s.x,l=e.z+i*o-s.z;return Math.hypot(a,l)}function Ds(s,e,t,n){return Gi(t,s,e)<n}function vu(s,e){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0},wantHeavy:!1,seen:new Set,dodge:null,edgeSaveAt:null,edgeSaveRolled:!1,aggression:e==="1v2"?.18:.28}}var _p=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null});function mu(s,e,t,n){let i=_e(pn(t)),r=We(e.pos,ae(i,n)),o=We(e.pos,ae(i,-n)),a=s.edgeDistance(r),l=s.edgeDistance(o);return Math.max(a,l)<1.2?_e(ae(e.pos,-1)):a>=l?i:ae(i,-1)}function xu(s,e,t,n){let i=_p(),r=s.state,o=s.player,a=r.time;if(!o||o.state==="dead"||o.state==="falling")return i;if(e.state==="knocked")return t.edgeSaveRolled||(t.edgeSaveRolled=!0,Dt(_e(e.knockVel),_e(e.pos))>.3&&t.rng()<Ft.edgeSaveChance&&(t.edgeSaveAt=a+Ft.edgeSaveReact)),t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&s.edgeDistance(e.pos)<2.5&&(t.edgeSaveAt=null,i.dash=!0,i.dashDir=_e(ae(e.pos,-1))),i;t.edgeSaveRolled=!1,t.edgeSaveAt=null;for(let u of s.pendingProjectiles()){if(u.team===e.team)continue;let f=`p${u.id}`;if(t.seen.has(f))continue;t.seen.add(f);let v=it(e.pos,u.pos),b=Dt(v,u.dir);b<=0||b>8||Math.abs(v.x*u.dir.z-v.z*u.dir.x)>e.radius+u.radius+.3||gu(s,e,t,u.dir,u.kind==="control"?.9:.35)}if(o.windup&&o.windup.skill==="control"){let u=`w${o.id}:${(a-o.windup.t).toFixed(2)}`;if(!t.seen.has(u)){t.seen.add(u);let f=it(e.pos,o.pos),v=Dt(f,o.windup.dir),b=Math.abs(f.x*o.windup.dir.z-f.z*o.windup.dir.x);v>0&&v<Lt.range&&b<e.radius+Lt.radius+.3&&gu(s,e,t,o.windup.dir,1)}}if(t.seen.size>400&&t.seen.clear(),t.dodge&&a>=t.dodge.at){if(t.dodge.dash)return e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup")&&(i.dash=!0,i.dashDir=t.dodge.dir),t.dodge=null,i;if(a<t.dodge.until)return i.move=t.dodge.dir,i;t.dodge=null}if(e.state!=="idle")return i.move=ae(t.move,.5),i;t.thinkT-=n,t.strafeT-=n;let l=it(o.pos,e.pos),c=ot(l),h=_e(l),d=s.edgeDistance(e.pos);if(t.thinkT<=0){t.thinkT=Ft.think,t.strafeT<=0&&(t.strafeT=Ft.strafeSwitchMin+(Ft.strafeSwitchMax-Ft.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1)),!t.wantHeavy&&e.cooldowns.push<=0&&s.heavyOwner===null&&t.rng()<t.aggression&&(t.wantHeavy=!0);let u,f=ae(pn(h),t.strafeDir);if(d<Ft.edgeDanger)u=_e(We(ae(_e(ae(e.pos,-1)),1.4),ae(f,.5)));else if(t.wantHeavy)u=h;else if(c>Ft.preferMax)u=_e(We(h,ae(f,.4)));else if(c<Ft.preferMin){let v=ae(h,-1);u=s.edgeDistance(We(e.pos,ae(v,2)))<Ft.edgeDanger+.5?f:_e(We(v,ae(f,.5)))}else u=f;s.edgeDistance(We(e.pos,ae(u,1.5)))<Ft.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,u=_e(ae(e.pos,-1)));for(let v of r.island.rocks){let b=We(e.pos,ae(u,1.2));lt(b,v.pos)<v.r+e.radius+.3&&(u=_e(We(u,ae(pn(_e(it(v.pos,e.pos))),t.strafeDir*1.5))))}t.move=u}if(i.move=t.move,t.wantHeavy){if(s.heavyOwner!==null&&s.heavyOwner!==e.id)t.wantHeavy=!1;else if(c<Xt.range-.4&&e.cooldowns.push<=0)return t.wantHeavy=!1,i.cast={skill:"push",dir:h},i}else if(e.cooldowns.basic<=0&&c<$t.range-.5&&s.lineOfSight(e.pos,o.pos)){let u=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Ls(h,u)}return i}function gu(s,e,t,n,i){if(t.dodge)return;let r=Ft.dodgeReactMin+(Ft.dodgeReactMax-Ft.dodgeReactMin)*t.rng(),o=t.rng(),a=s.state.time;o<Ft.dodgeChance*i&&e.cooldowns.dash<=0?t.dodge={at:a+r,dir:mu(s,e,n,fn.distance),dash:!0,until:0}:o<(Ft.dodgeChance+.3)*i&&(t.dodge={at:a+r,dir:mu(s,e,n,1.5),dash:!1,until:a+r+.35})}function bu(s){return{rng:s,delay:.3,cursor:0,cdEst:{push:null,control:null,dash:null},strategy:"kite",until:0,reason:"start",distErr:1,risky:!1,preDashed:!1,myControlHitT:-99,edgeSaveAt:null,knockSeenT:-99,lastPerceived:null,moveDir:null,climbAt:null,lastEngageT:0,rockShots:0,stalls:[],decisions:[]}}var bp=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null}),Vr=Nt.range+.5,Mp=.5;function Mu(s,e,t){let n=bp(),i=s.state,r=e,o=s.player,a=i.time,l=t.rng,c=a-t.delay;for(let{t:O,e:U}of s.log)if(!(O<=t.cursor||O>c)){if("ownerId"in U&&U.ownerId===o.id){let G=(l()*2-1)*Mp;U.type==="cast"&&U.skill==="push"?t.cdEst.push=O+Nt.cooldown+G:U.type==="shoot"&&U.kind==="control"?t.cdEst.control=O+Lt.cooldown+G:U.type==="dash"&&(t.cdEst.dash=O+fn.cooldown+G,t.lastEngageT=a)}U.type==="hit"&&(U.sourceId===r.id&&U.kind==="control"&&(t.myControlHitT=O),(U.sourceId===r.id||U.targetId===r.id)&&(t.lastEngageT=a)),U.type==="blocked"&&U.ownerId===r.id&&t.rockShots++}if(t.cursor=Math.max(t.cursor,c),r.state==="ledge")return t.climbAt===null&&(t.climbAt=a-r.stateT+.2+l()*.15),a>=t.climbAt&&(t.climbAt=null,n.dash=!0),n;if(t.climbAt=null,r.state==="climb")return n;let h=s.snapshotAt(c);if(!h)return n;t.lastPerceived=h.pos;let d=s.snapshotAt(c-.1),u=d&&h.t-d.t>.05?ae(it(h.pos,d.pos),1/(h.t-d.t)):{x:0,z:0},f=O=>{let U=ae(u,t.delay+O);return ot(U)>3&&(U=ae(_e(U),3)),We(h.pos,U)};if(h.state==="falling"||h.state==="dead")return n;if(r.state==="knocked"){if(t.knockSeenT!==r.stateT&&r.stateT<.02){t.knockSeenT=r.stateT;let O=Dt(_e(r.knockVel),_e(r.pos))>.2&&s.edgeDistance(r.pos)<4;t.edgeSaveAt=O&&r.cooldowns.dash<=0?a+.18+l()*.17:null}return t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&(t.edgeSaveAt=null,n.dash=!0,n.dashDir=_e(ae(r.pos,-1))),n}if(t.edgeSaveAt=null,r.state!=="idle"&&r.state!=="windup"&&r.state!=="recover")return n;let v=lt(r.pos,h.pos),b=v*t.distErr,g=_e(it(h.pos,r.pos)),p=s.lineOfSight(r.pos,h.pos),m=s.edgeDistance(r.pos),x=t.cdEst.push===null||a>=t.cdEst.push,y=r.cooldowns.push<=0,E=r.cooldowns.control<=0,R=r.cooldowns.dash<=0;if(h.state==="ledge"&&(r.state==="idle"||r.state==="recover"))return n.move=_u(s,r,t,yu(s,r,g),6),y&&b<=Vr-.3&&r.state==="idle"?(n.cast={skill:"push",dir:Gr(r.pos,h.pos,l,4,r.facing)},t.lastEngageT=a):p&&r.state==="idle"&&(n.fire=!0,n.fireDir=Gr(r.pos,h.pos,l,8,r.facing)),n;let k="";m<1.5&&(k="edge");let D=h.windup;if(D&&(D.skill==="push"||D.skill==="control")&&h.t-D.startT<D.dur+.05){let O=it(r.pos,h.pos),U=Dt(O,D.dir),G=Math.abs(O.x*D.dir.z-O.z*D.dir.x),q=D.skill==="push"?Vr:Lt.range;U>0&&U<q&&G<(D.skill==="push"?2.2:1.2)&&(k="threat")}if(k==="threat"&&R&&l()<.6){let O=_e(pn(D.dir)),U=We(r.pos,ae(O,fn.distance)),G=We(r.pos,ae(O,-fn.distance));return n.dash=!0,n.dashDir=s.edgeDistance(U)>=s.edgeDistance(G)?O:ae(O,-1),t.lastEngageT=a,n}if(a>=t.until||k==="edge"&&t.strategy!=="retreat"){t.delay=.25+l()*.15,t.distErr=1+(l()*2-1)*.08,t.risky=l()<.25,t.preDashed=!1;let O=a-t.myControlHitT<1.5,U={approach:.35+(x?0:.45)+(y?.15:-.4)+(h.slowed?.3:0)+(O?.4:0)+(t.risky?.5:0),kite:.45+(b<3.5?.2:0)+(x?.15:0),flank:.25+(p?0:.35),retreat:k==="edge"?5:m<2.5?.6:0},G="kite",q=-1/0;for(let J of Object.keys(U)){let ne=U[J]+l()*.35;ne>q&&(q=ne,G=J)}t.strategy=G,t.until=a+1+l()*1,t.reason=k==="edge"?"\u9760\u8FD1\u5CF6\u7DE3":`\u5C0D\u624B\u9707\u64CA${x?"\u53EF\u80FD\u53EF\u7528":"\u4F30\u8A08\u51B7\u537B\u4E2D"}${t.risky?"\uFF08\u5192\u96AA\uFF09":""}${O?"\u3001\u525B\u675F\u7E1B\u547D\u4E2D":""}`,t.decisions.push({t:a,strategy:G,reason:t.reason}),t.decisions.length>400&&t.decisions.shift()}let M={x:0,z:0},S=_e(ae(r.pos,-1));switch(t.strategy){case"approach":M=g,y&&b<=Vr-.3&&r.state==="idle"&&(n.cast={skill:"push",dir:Gr(r.pos,f(Nt.windup),l,4,r.facing)},t.lastEngageT=a);break;case"kite":{let O=b<5?ae(g,-1):b>7?g:{x:0,z:0};if(M=_e(We(O,ae(pn(g),.8))),!t.preDashed&&R&&x&&b<Vr+.4&&l()<.3)return t.preDashed=!0,n.dash=!0,n.dashDir=_e(We(ae(g,-1),ae(S,.5))),t.lastEngageT=a,n;break}case"flank":M=_e(We(ae(pn(g),1),ae(g,.3)));break;case"retreat":M=S;break}M=yu(s,r,M);let I=t.decisions.length>0&&t.decisions[t.decisions.length-1].t===a;return M=_u(s,r,t,M,I?1/0:v<Vr+1?6:1),n.move=M,r.state==="idle"&&!n.cast&&p&&(E&&b>4&&b<Lt.range-1&&t.strategy!=="retreat"&&l()<.02?(n.cast={skill:"control",dir:Gr(r.pos,f(Lt.windup+b/Lt.speed),l,8,r.facing)},t.lastEngageT=a):b<Xn.range-.5&&(n.fire=!0,n.fireDir=Gr(r.pos,f(b/Xn.speed),l,8,r.facing),b<Xn.range-1&&(t.lastEngageT=a))),a-t.lastEngageT>8&&(t.stalls.push({t:a,strategy:t.strategy,reason:t.reason,dist:Math.round(v*10)/10,los:p,rockShots:t.rockShots}),t.lastEngageT=a,t.rockShots=0),n}function Gr(s,e,t,n,i){let r=(t()*2-1)*(n*Math.PI)/180,o=it(e,s);return Ls(ot(o)>1e-6?_e(o):{x:Math.cos(i),z:Math.sin(i)},r)}function yu(s,e,t){if(ot(t)<.01)return t;let n=_e(t);s.edgeDistance(We(e.pos,ae(n,1.5)))<1.6&&(n=_e(We(n,ae(_e(ae(e.pos,-1)),1.5))));for(let i of s.state.island.rocks)if(lt(We(e.pos,ae(n,1.2)),i.pos)<i.r+e.radius+.3){let r=pn(_e(it(i.pos,e.pos)));n=_e(We(n,ae(Dt(r,n)>=0?r:ae(r,-1),1.5)))}return n}var Sp=420*Math.PI/180/60;function _u(s,e,t,n,i){if(ot(n)<.01)return n;let r=_e(n);if(!t.moveDir)return t.moveDir=r,r;let o=Math.atan2(t.moveDir.z,t.moveDir.x),l=Math.atan2(r.z,r.x)-o;for(;l>Math.PI;)l-=2*Math.PI;for(;l<-Math.PI;)l+=2*Math.PI;let c=s.edgeDistance(We(e.pos,ae(t.moveDir,1.2)))<1.2,h=Sp*Math.max(i,c?3:1),d=o+Math.max(-h,Math.min(h,l));return t.moveDir={x:Math.cos(d),z:Math.sin(d)},t.moveDir}var os={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null},At=class s{constructor(e,t=1,n="s0",i=2.6){this.aiEnabled=!0;this.hitstop=0;this.coverOverride=null;this.heavyOwner=null;this.events=[];this.nextId=1;this.bursts=new Map;this.ai=new Map;this.mirror=new Map;this.outsideT=new Map;this.dashMoved=new Map;this.dashBuf=new Map;this.outSource=new Map;this.ledge=new Map;this.ledgeLock=new Map;this.edgeRec=new Map;this.fallVel=new Map;this.lastHitKind=new Map;this.controlMark=new Map;this.ended=!1;this.log=[];this.history=[];this.rng=Qo(t);let r=Vi(),o=n!=="s0"?"hunter":"s0enemy",a=[this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"hunter")];e==="1v1"?a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:.5,z:-4.5},Math.PI/2,o)):e!=="waves"&&e!=="run"&&(a.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:-3.8,z:-4.2},Math.PI/2,o)),a.push(this.makeFighter("enemy",2,"\u6A58\u7375\u624B",{x:4.6,z:-3},Math.PI/2,o)));for(let l of a)l.team==="enemy"&&(l.kit==="hunter"?this.mirror.set(l.id,bu(this.rng)):this.ai.set(l.id,vu(this.rng,e)));this.state={time:0,mode:e,variant:n,island:r,fighters:a,projectiles:[],playerId:a[0].id,result:null,loseText:null,ledgeDepth:n==="v3"?i:null,edgeLog:[],stats:{shotsFired:0,shotsHit:0,combos:0,kills:{fall:0,hp:0}}}}makeFighter(e,t,n,i,r,o){let a=o==="hunter",l=a?Sc:wc,c=a?{basic:Xn.cooldown,control:Lt.cooldown,push:Nt.cooldown,dash:fn.cooldown}:{basic:$t.cooldownMax,control:0,push:Xt.cooldown,dash:Ft.dodgeCooldown};return{id:this.nextId++,team:e,variant:t,kit:o,name:n,pos:{...i},y:0,facing:r,moveVel:{x:0,z:0},radius:l.radius,hp:l.hp,maxHp:l.hp,state:"idle",stateT:0,windup:null,burstLeft:0,cooldowns:{basic:0,control:0,push:a?0:2.5,dash:0},cooldownMax:c,slowT:0,invulnT:0,hitFlashT:0,sinceShotT:99,knockVel:{x:0,z:0},deathCause:null,lastHitBy:null,lastHitAt:-99}}get player(){return this.state.fighters[0]}fighter(e){return this.state.fighters.find(t=>t.id===e)}drainEvents(){let e=this.events;return this.events=[],e}emit(e){this.events.push(e),this.log.push({t:this.state?this.state.time:0,e})}recordHistory(){let e=this.player,t=this.state.time;for(this.history.push({t,pos:{...e.pos},facing:e.facing,state:e.state,windup:e.windup?{skill:e.windup.skill,dir:{...e.windup.dir},startT:t-e.windup.t,dur:e.windup.dur}:null,slowed:e.slowT>0});this.history.length&&this.history[0].t<t-1.5;)this.history.shift();for(;this.log.length&&this.log[0].t<t-3;)this.log.shift()}snapshotAt(e){for(let t=this.history.length-1;t>=0;t--)if(this.history[t].t<=e+1e-9)return this.history[t];return null}static alive(e){return e.state!=="dead"&&e.state!=="falling"&&e.state!=="reviving"}canLedge(e){return this.state.variant==="v3"}suspended(e){return!1}step(e){let t=this.state,n=gn;t.time+=n;for(let i of t.fighters)this.tickTimers(i,n);for(let i of t.fighters){if(!s.alive(i))continue;let r;this.ended?r=os:i.team==="player"?r=e:this.aiEnabled?i.kit==="hunter"?r=Mu(this,i,this.mirror.get(i.id)):r=xu(this,i,this.ai.get(i.id),n):r=os,this.control(i,r)}for(let i of t.fighters)this.advance(i,n);this.separate(),this.moveProjectiles(n),this.checkEnd(),this.recordHistory()}tickTimers(e,t){e.stateT+=t;for(let n of["basic","control","push","dash"])e.cooldowns[n]=Math.max(0,e.cooldowns[n]-t);e.slowT=Math.max(0,e.slowT-t),e.invulnT=Math.max(0,e.invulnT-t),e.hitFlashT=Math.max(0,e.hitFlashT-t),e.sinceShotT+=t}setState(e,t){e.state=t,e.stateT=0}facingDir(e){return Ps(e.facing)}autoTarget(e,t){let n=null,i=1/0;for(let r of this.state.fighters){if(r.team===e.team||!s.alive(r))continue;let o=lt(e.pos,r.pos);if(o>t)continue;let a=o+(this.lineOfSight(e.pos,r.pos)?0:6);a<i&&(i=a,n=r)}return n}lineOfSight(e,t){return!this.state.island.rocks.some(n=>Ds(e,t,n.pos,n.r))}aimOrAuto(e,t,n){if(t&&ot(t)>.01)return _e(t);if(e.team==="enemy"&&e.kit==="hunter")return this.facingDir(e);let i=this.autoTarget(e,n);return i?_e(it(i.pos,e.pos)):this.facingDir(e)}control(e,t){if(e.state==="ledge"){e.moveVel={x:0,z:0},t.dash&&this.startClimb(e,"accepted@"+this.state.time.toFixed(2));return}if(e.state==="climb"){e.moveVel={x:0,z:0};return}if(this.state.variant!=="s0"){if(this.controlDashBuffered(e,t))return}else if(t.dash&&e.cooldowns.dash<=0&&this.canDash(e)){this.startDash(e,t);return}if(e.state==="idle"&&t.cast){if(e.kit==="hunter"){let n=t.cast.skill;if(e.cooldowns[n]<=0){let i=n==="control"?Lt.range:Nt.range+2;this.startWindup(e,n,this.aimOrAuto(e,t.cast.dir,i),n==="control"?Lt.windup:Nt.windup);return}}else if(t.cast.skill==="push"&&e.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===e.id)){this.heavyOwner=e.id,this.startWindup(e,"enemyHeavy",this.aimOrAuto(e,t.cast.dir,6),Xt.windup);return}}if(e.state==="idle"&&t.fire&&e.burstLeft===0&&e.cooldowns.basic<=0)if(e.kit==="hunter"){let n=this.aimOrAuto(e,t.fireDir,Xn.autoAimRange);e.burstLeft=Xn.shots,e.cooldowns.basic=Xn.cooldown,this.bursts.set(e.id,{dir:n,timer:0,kind:"basic"}),e.facing=ln(n)}else{this.startWindup(e,"enemyBasic",this.aimOrAuto(e,t.fireDir,$t.range),$t.windup);return}if(e.state==="idle"||e.state==="windup"||e.state==="recover"){let n=t.move,i=ot(n);i>1&&(n=ae(n,1/i));let r=e.kit==="hunter"?Sc.speed:wc.speed;e.slowT>0&&(r*=zr),e.burstLeft>0&&(r*=Jo),e.state==="windup"&&(r*=Hr),e.state==="recover"&&(r*=.3),e.moveVel=ae(n,r);let o=e.team==="enemy"&&e.kit==="hunter"&&e.sinceShotT<.6;e.state==="idle"&&e.burstLeft===0&&i>.1&&!o&&(e.facing=ln(n))}else e.moveVel={x:0,z:0}}canDash(e){return e.state==="idle"||e.state==="windup"||e.state==="knocked"&&e.stateT>=In.dashCancelAfter}controlDashBuffered(e,t){if(t.dash){let i=t.dashDir&&ot(t.dashDir)>.01?_e(t.dashDir):ot(t.move)>.2?_e(t.move):this.facingDir(e);e.cooldowns.dash>0?this.canLedge(e)?this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!1}):this.dashBuf.delete(e.id):this.dashBuf.set(e.id,{at:this.state.time,dir:i,dashOk:!0})}let n=this.dashBuf.get(e.id);return n?this.state.time-n.at>fu+1e-9?(this.dashBuf.delete(e.id),!1):e.state==="knocked"&&e.stateT<In.dashCancelAfter||!n.dashOk?!1:e.cooldowns.dash>0||!this.canDash(e)?(this.canLedge(e)?n.dashOk=!1:this.dashBuf.delete(e.id),!1):(this.dashBuf.delete(e.id),this.startDash(e,{...os,dashDir:n.dir}),!0):!1}predictedKnockStop(e){let t={...e.pos},n=e.stateT;for(;n<In.knockTime-1e-9;){n+=gn;let i=1-Math.min(1,n/In.knockTime);t=We(t,ae(e.knockVel,gn*i))}return t}nearestEdgePoint(e){let t=this.state.island.poly,n=t[0],i=1/0;for(let r=0,o=t.length-1;r<t.length;o=r++){let a=t[o],l=t[r],c=it(l,a),h=Dt(c,c),d=h===0?0:Math.max(0,Math.min(1,Dt(it(e,a),c)/h)),u=We(a,ae(c,d)),f=lt(e,u);f<i&&(i=f,n=u)}return n}climbPathOk(e,t,n){return Et(n,this.state.island.poly)>=wt.landMargin&&this.state.island.rocks.every(i=>lt(n,i.pos)>=i.r+e.radius&&Gi(i.pos,t,n)>=i.r+e.radius)}findLanding(e,t,n,i){let r={x:-n.z,z:n.x},o=(a,l)=>this.climbPathOk(e,i??a,l);for(let a of[wt.landInset,(wt.landInset+wt.minInset)/2,wt.minInset])for(let l of[0,.2,-.2,.4,-.4,wt.searchAlong,-wt.searchAlong]){let c=t,h=n;if(l!==0){let f=We(We(t,ae(r,l)),ae(n,-.5));c=this.nearestEdgePoint(f);let v=it(c,f);if(ot(v)<1e-6)continue;h=_e(v)}let d=We(c,ae(h,-wt.hangOut)),u=We(c,ae(h,a));if(o(d,u))return{edge:c,inward:h,land:u}}return null}tryLedge(e,t){let n=this.state,i=n.ledgeDepth??2.6,r=this.edgeRec.get(e.id),o=this.outSource.get(e.id)??"knock";r||(r={t:Math.round(n.time*100)/100,who:e.name,source:o,depth:null,basis:null,eligible:!1,reason:null,input:"none",outcome:"pending"},this.edgeRec.set(e.id,r),n.edgeLog.push(r),n.edgeLog.length>20&&n.edgeLog.shift());let a=r,l=m=>(a.eligible=!1,a.reason=m,!1);if(o==="dash")return l("dash-out");let c=t==="predicted"?this.predictedKnockStop(e):e.pos,h=-Et(c,n.island.poly);a.depth=h,a.basis=t;let d=this.ledgeLock.get(e.id);if(d&&(n.time<d.until-1e-9||!d.landed))return l("locked");if(h>i)return l("too-deep");let u=this.nearestEdgePoint(e.pos),f=it(u,e.pos),v=ot(f)>1e-6?_e(f):_e(ae(e.pos,-1)),b=this.findLanding(e,u,v);if(!b)return l("no-landing");a.eligible=!0,a.reason=null;let g=We(b.edge,ae(b.inward,-wt.hangOut));this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel={x:0,z:0},e.moveVel={x:0,z:0},e.facing=ln(b.inward),e.invulnT=Math.max(e.invulnT,wt.protect),this.outsideT.set(e.id,0),this.ledge.set(e.id,{start:{...e.pos},hang:g,edge:b.edge,inward:b.inward,land:b.land,climbFrom:null,climbQueued:!1,rec:a}),this.ledgeLock.set(e.id,{until:n.time+wt.lock,landed:!1}),this.setState(e,"ledge"),this.emit({type:"ledgeGrab",ownerId:e.id,pos:g,edge:b.edge,inward:b.inward,depth:h});let p=this.dashBuf.get(e.id);return this.dashBuf.delete(e.id),p&&n.time-p.at<=wt.inputKeep+1e-9&&this.startClimb(e,"buffered@"+p.at.toFixed(2)),!0}startClimb(e,t){let n=this.ledge.get(e.id);if(!n||n.climbQueued)return;n.rec.input=t;let i={...e.pos};if(!this.climbPathOk(e,i,n.land)){let r=this.findLanding(e,n.edge,n.inward,i);if(r)n.land=r.land;else{n.climbQueued=!0;return}}this.beginClimb(e,i)}beginClimb(e,t){let n=this.ledge.get(e.id);n.climbFrom={...t},this.setState(e,"climb"),this.emit({type:"ledgeClimb",ownerId:e.id,from:{...t},to:{...n.land}})}dropLedge(e,t,n){let i=this.ledge.get(e.id);i&&(i.rec.outcome=t),this.edgeRec.delete(e.id),this.emit({type:"ledgeDrop",ownerId:e.id,reason:t}),this.startFall(e,ae(_e(n),2))}onBackOnIsland(e){let t=this.edgeRec.get(e.id);t&&t.outcome==="pending"&&(t.outcome="rescue"),this.edgeRec.delete(e.id),this.outSource.delete(e.id)}startWindup(e,t,n,i){e.windup={skill:t,t:0,dur:i,dir:n},e.facing=ln(n),this.setState(e,"windup"),this.emit({type:"windupStart",ownerId:e.id,skill:t,dir:n,dur:i})}cancelWindup(e){e.windup&&(this.emit({type:"cancel",ownerId:e.id,skill:e.windup.skill}),e.windup.skill==="enemyHeavy"&&this.heavyOwner===e.id&&(this.heavyOwner=null),e.windup=null)}startDash(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id);let n=t.dashDir&&ot(t.dashDir)>.01?_e(t.dashDir):null;!n&&ot(t.move)>.2&&(n=_e(t.move)),n||(n=this.facingDir(e)),e.state==="knocked"&&Et(e.pos,this.state.island.poly)<2.5&&this.emit({type:"edgeSave",ownerId:e.id}),this.outSource.set(e.id,e.state==="knocked"?"knock":"dash"),e.knockVel=ae(n,fn.distance/fn.time),e.facing=ln(n),e.cooldowns.dash=e.cooldownMax.dash,e.invulnT=fn.time+.04,this.dashMoved.set(e.id,0),this.outsideT.set(e.id,0),this.setState(e,"dash"),this.emit({type:"dash",ownerId:e.id,from:{...e.pos},dir:n})}advance(e,t){let n=this.state.island.poly;switch(e.state){case"dead":return;case"falling":{let i=this.fallVel.get(e.id)??{x:0,z:0};e.pos=We(e.pos,ae(i,t)),e.y=-.5*Ec.gravity*e.stateT*e.stateT,e.stateT>=Ec.duration&&this.die(e,"fall");return}case"windup":{let i=e.windup;i.t+=t,this.walk(e,t),i.t>=i.dur&&this.releaseWindup(e);break}case"recover":this.walk(e,t),e.stateT>=(e.kit==="hunter"?Nt.recover:Xt.recover)&&this.setState(e,"idle");break;case"dash":{let i=this.dashMoved.get(e.id)??0,r=Math.min(t,fn.time-i);if(e.pos=We(e.pos,ae(e.knockVel,r)),this.dashMoved.set(e.id,i+r),this.pushOutOfRocks(e),i+r>=fn.time-1e-9){let o=_e(e.knockVel);if(e.knockVel={x:0,z:0},Et(e.pos,n)<0){if(this.canLedge(e)&&this.tryLedge(e,"actual"))return;this.startFall(e,ae(o,2));return}this.onBackOnIsland(e),this.setState(e,"idle")}break}case"knocked":{let i=1-Math.min(1,e.stateT/In.knockTime);if(e.pos=We(e.pos,ae(e.knockVel,t*i)),this.pushOutOfRocks(e),Et(e.pos,n)<0){if(this.canLedge(e)&&(this.outsideT.get(e.id)??0)===0&&this.tryLedge(e,"predicted"))return;let r=(this.outsideT.get(e.id)??0)+t;if(this.outsideT.set(e.id,r),r>In.edgeGrace){this.startFall(e,ae(e.knockVel,.5*Math.max(i,.3)));return}}else this.outsideT.set(e.id,0);if(e.stateT>=In.knockTime){if(Et(e.pos,n)<0){this.startFall(e,ae(_e(e.knockVel),1.5));return}e.knockVel={x:0,z:0},this.onBackOnIsland(e),this.setState(e,"idle")}break}case"ledge":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/wt.catch);if(e.pos=We(i.start,ae(it(i.hang,i.start),r)),i.climbQueued&&r>=1){i.climbQueued=!1,this.beginClimb(e,i.hang);return}e.stateT>=wt.hold-1e-9&&this.dropLedge(e,"timeout",ae(i.inward,-1));return}case"climb":{let i=this.ledge.get(e.id),r=Math.min(1,e.stateT/wt.climb);e.pos=We(i.climbFrom,ae(it(i.land,i.climbFrom),r)),r>=1-1e-9&&(this.ledgeLock.get(e.id).landed=!0,i.rec.outcome="climbed",this.ledge.delete(e.id),this.outSource.delete(e.id),this.edgeRec.delete(e.id),this.setState(e,"idle"));return}case"idle":this.walk(e,t);break}if((e.state==="idle"||e.state==="windup"||e.state==="recover")&&Et(e.pos,n)<0){this.startFall(e,{x:0,z:0});return}this.tickBurst(e,t)}walk(e,t){let n=this.state.island.poly,i=.35,r=Et(e.pos,n),o=c=>{let h=Et(c,n);return h>=i||h>=r},a=ae(e.moveVel,t);if(a.x===0&&a.z===0)return;let l=We(e.pos,a);if(o(l))e.pos=l;else{let c={x:e.pos.x+a.x,z:e.pos.z},h={x:e.pos.x,z:e.pos.z+a.z};o(c)?e.pos=c:o(h)&&(e.pos=h)}this.pushOutOfRocks(e)}pushOutOfRocks(e){for(let t of this.state.island.rocks){let n=it(e.pos,t.pos),i=ot(n),r=t.r+e.radius;i<r&&(e.pos=We(t.pos,ae(i>1e-6?ae(n,1/i):{x:1,z:0},r)))}}separate(){let e=this.state.fighters.filter(t=>s.alive(t)&&t.state!=="dash"&&t.state!=="ledge"&&t.state!=="climb"&&!this.suspended(t));for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],r=e[n],o=it(r.pos,i.pos),a=ot(o),l=i.radius+r.radius;if(a<l&&a>1e-6){let c=ae(o,(l-a)/a/2),h=this.state.island.poly,d=(v,b)=>{let g=Et(b,h);return g>=.35||g>=Et(v.pos,h)},u=it(i.pos,c),f=We(r.pos,c);i.state!=="knocked"&&d(i,u)&&(i.pos=u),r.state!=="knocked"&&d(r,f)&&(r.pos=f)}}for(let t of e)this.pushOutOfRocks(t)}tickBurst(e,t){if(e.burstLeft<=0||!s.alive(e))return;let n=this.bursts.get(e.id);if(!n){e.burstLeft=0;return}if(n.timer-=t,n.timer>0)return;let i=n.kind==="basic"?Xn:$t;this.spawnProjectile(e,n.kind,n.dir,i.speed,i.range,i.radius),e.team==="player"&&this.state.stats.shotsFired++,e.sinceShotT=0,e.burstLeft--,n.timer=i.interval,e.burstLeft<=0&&this.bursts.delete(e.id)}spawnProjectile(e,t,n,i,r,o){let a=We(e.pos,ae(n,e.radius+.15));this.state.projectiles.push({id:this.nextId++,kind:t,ownerId:e.id,team:e.team,pos:a,dir:{...n},speed:i,traveled:0,range:r,radius:o,alive:!0}),this.emit({type:"shoot",ownerId:e.id,kind:t,pos:{...a},dir:{...n}})}releaseWindup(e){let t=e.windup;switch(e.windup=null,t.skill){case"control":this.spawnProjectile(e,"control",t.dir,Lt.speed,Lt.range,Lt.radius),e.sinceShotT=0,e.cooldowns.control=Lt.cooldown,this.setState(e,"idle");break;case"push":this.coneStrike(e,t.dir,Nt.range,Nt.halfAngle,Nt.dmg,"push"),e.cooldowns.push=Nt.cooldown,this.setState(e,"recover");break;case"enemyBasic":{let n=$t.cooldownMin+($t.cooldownMax-$t.cooldownMin)*this.rng();e.cooldowns.basic=this.state.mode==="1v2"?n*1.4:n,e.burstLeft=$t.shots,this.bursts.set(e.id,{dir:t.dir,timer:0,kind:"enemyBasic"}),this.setState(e,"idle");break}case"enemyHeavy":this.coneStrike(e,t.dir,Xt.range,Xt.halfAngle,Xt.dmg,"enemyHeavy"),e.cooldowns.push=Xt.cooldown,this.heavyOwner===e.id&&(this.heavyOwner=null),this.setState(e,"recover");break}}coneStrike(e,t,n,i,r,o){this.emit({type:"cast",ownerId:e.id,skill:o,pos:{...e.pos},dir:{...t}});for(let a of this.state.fighters){if(a.team===e.team||!s.alive(a))continue;let l=it(a.pos,e.pos),c=ot(l);if(!(c>n+a.radius||!(c<.6||Dt(ae(l,1/c),t)>=Math.cos(i)))){if(this.coverOverride??this.state.variant!=="s0"){let d=this.rockOnSegment(e.pos,a.pos);if(d){this.emit({type:"blockedStrike",ownerId:e.id,targetId:a.id,skill:o,pos:d,dir:{...t}});continue}}this.damage(a,e,o,r,t)}}}rockOnSegment(e,t){let i=1/0,r=null,o=it(t,e),a=Dt(o,o);for(let l of this.state.island.rocks){if(Gi(l.pos,e,t)>=l.r-1e-6)continue;let c=it(e,l.pos),h=2*Dt(c,o),d=Dt(c,c)-l.r*l.r,u=Math.max(0,h*h-4*a*d),f=a>0?Math.max(0,(-h-Math.sqrt(u))/(2*a)):0;f<i&&(i=f,r=We(e,ae(o,f)))}return r}static knockDistance(e,t,n){return In.base+In.lowHpBonus*(1-Math.max(0,e)/t)+(n?In.slowedBonus:0)}damage(e,t,n,i,r){if(!s.alive(e)||e.invulnT>0)return!1;let o=this.state,a=e.slowT>0;e.hp=Math.max(0,e.hp-i),e.hitFlashT=.12,e.lastHitBy=t.id,e.lastHitAt=o.time,this.lastHitKind.set(e.id,n),this.state.variant!=="s0"&&n==="basic"||(this.hitstop=Math.max(this.hitstop,jo[n])),n==="control"&&(e.slowT=Lt.slow,t.team==="player"&&this.controlMark.set(e.id,o.time));let l=0;if(r&&e.hp>0&&e.state==="ledge")return this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:{...r},dmg:i,knock:0}),this.dropLedge(e,"knocked",r),!0;if(r&&e.hp>0){if(e.state==="climb"){let c=this.ledge.get(e.id);c&&(c.rec.outcome="knocked",this.ledge.delete(e.id),this.edgeRec.delete(e.id))}this.outSource.set(e.id,"knock"),l=s.knockDistance(e.hp,e.maxHp,a),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel=ae(r,2*l/In.knockTime),e.facing=ln(ae(r,-1)),this.outsideT.set(e.id,0),this.setState(e,"knocked")}if(this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:r?{...r}:_e(it(e.pos,t.pos)),dmg:i,knock:l}),n==="push"&&t.team==="player"){let c=this.controlMark.get(e.id);c!==void 0&&o.time-c<=pu&&(o.stats.combos++,this.controlMark.delete(e.id),this.emit({type:"combo",ownerId:t.id,targetId:e.id}))}return e.hp<=0&&(this.cancelWindup(e),this.die(e,"hp")),!0}startFall(e,t){this.dashBuf.delete(e.id);let n=this.edgeRec.get(e.id);n&&n.outcome==="pending"&&(n.outcome="fall"),this.edgeRec.delete(e.id),this.ledge.delete(e.id),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),this.fallVel.set(e.id,t),e.moveVel={x:0,z:0},this.setState(e,"falling"),this.emit({type:"fall",ownerId:e.id,pos:{...e.pos}})}die(e,t){if(this.dashBuf.delete(e.id),t==="hp"){let r=this.ledge.get(e.id);r&&r.rec.outcome==="pending"&&(r.rec.outcome="hp");let o=this.edgeRec.get(e.id);o&&o.outcome==="pending"&&(o.outcome="hp"),this.ledge.delete(e.id),this.edgeRec.delete(e.id)}let n=this.state;e.deathCause=t,e.knockVel={x:0,z:0},this.setState(e,"dead");let i=e.lastHitBy!==null&&n.time-e.lastHitAt<4?e.lastHitBy:null;e.team==="enemy"&&i===n.playerId&&n.stats.kills[t]++,this.emit({type:"death",ownerId:e.id,cause:t,pos:{...e.pos},killerId:i})}moveProjectiles(e){let t=this.state;for(let n of t.projectiles){if(!n.alive)continue;let i=n.pos,r=n.speed*e,o=We(i,ae(n.dir,r));if(n.traveled+=r,t.island.rocks.some(c=>Ds(i,o,c.pos,c.r+n.radius*.5))){n.alive=!1,this.emit({type:"blocked",pos:o,kind:n.kind,ownerId:n.ownerId});continue}let a=null,l=1/0;for(let c of t.fighters)if(!(c.team===n.team||!s.alive(c)||c.invulnT>0)&&Gi(c.pos,i,o)<c.radius+n.radius){let h=lt(i,c.pos);h<l&&(l=h,a=c)}if(n.pos=o,a){n.alive=!1;let c=this.fighter(n.ownerId),h=n.kind,d=this.state.variant!=="s0"?du:Xn.dmg,u=n.kind==="basic"?d:n.kind==="control"?Lt.dmg:$t.dmg;this.damage(a,c,h,u,null)&&n.team==="player"&&n.kind==="basic"&&t.stats.shotsHit++;continue}n.traveled>=n.range&&(n.alive=!1,this.emit({type:"expire",pos:o,kind:n.kind}))}t.projectiles=t.projectiles.filter(n=>n.alive)}checkEnd(){if(this.ended)return;let e=this.state,t=this.player;t.state==="dead"?(e.result="lose",e.loseText=this.loseText(t)):e.fighters.every(n=>n.team==="player"||n.state==="dead")&&(e.result="win"),e.result&&(this.ended=!0,this.dashBuf.clear(),this.emit({type:"roundEnd",result:e.result}))}loseText(e){let t=this.state,n=e.lastHitBy!==null&&t.time-e.lastHitAt<4?this.fighter(e.lastHitBy):void 0,i=this.lastHitKind.get(e.id);return e.deathCause==="fall"?n?i==="enemyHeavy"?`\u88AB${n.name}\u7684\u91CD\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u770B\u5230\u7D05\u8272\u6247\u5F62\u5C31\u5F80\u5074\u908A\u9583\uFF0C\u6216\u7528\u885D\u523A\u8EB2\u958B`:i==="push"?`\u88AB${n.name}\u7684\u9707\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u6CE8\u610F\u7260\u9760\u8FD1\u7684\u8DDD\u96E2\uFF0C\u6216\u9810\u5224\u885D\u523A\uFF1B\u88AB\u64CA\u98DB\u6642\u63D0\u65E9\u6309\u885D\u523A\u6709\u6A5F\u6703\u6551\u56DE`:`\u88AB${n.name}\u903C\u4E0B\u61F8\u5D16\u2014\u2014\u88AB\u64CA\u98DB\u6642\u53EF\u4EE5\u99AC\u4E0A\u885D\u523A\u56DE\u5CF6\u4E0A`:"\u4F60\u81EA\u5DF1\u885D\u51FA\u4E86\u61F8\u5D16\u2014\u2014\u885D\u523A\u524D\u5148\u770B\u8173\u4E0B":n?`\u751F\u547D\u88AB${n.name}\u6253\u5230\u6B78\u96F6\u2014\u2014\u5728\u7260\u51FA\u62DB\u5F8C\u7684\u7A7A\u6A94\u53CD\u64CA\uFF0C\u5225\u786C\u62DA`:"\u751F\u547D\u6B78\u96F6"}edgeDistance(e){return Et(e,this.state.island.poly)}pendingProjectiles(){return this.state.projectiles}place(e,t,n){let i=this.fighter(e);i&&(i.pos={...t},n!==void 0&&(i.facing=n))}debugKill(e,t){let n=this.fighter(e);!n||!s.alive(n)||(t==="hp"?(n.hp=0,this.die(n,"hp")):this.startFall(n,{x:0,z:0}))}debugDamage(e,t,n,i,r){let o=this.fighter(e),a=this.fighter(t);return o&&a?this.damage(o,a,n,i,r):!1}};function Su(s){return{rng:s,thinkT:0,strafeDir:s()<.5?1:-1,strafeT:0,move:{x:0,z:0}}}var wu=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null,face:null});function Eu(s){return s.state!=="dead"&&s.state!=="falling"&&s.state!=="reviving"}function Tu(s,e,t,n){let i=t;for(let r of s.state.island.rocks){let o=We(e.pos,ae(i,1.2));if(lt(o,r.pos)>=r.r+e.radius+.3)continue;let a=pn(_e(it(r.pos,e.pos))),l=Dt(i,a);i=_e(We(i,ae(a,(Math.abs(l)>.001?Math.sign(l):n)*1.5)))}return i}function Au(s,e,t,n){let i=wu(),r=s.player;if(!Eu(r))return i;let o=it(r.pos,e.pos),a=ot(o),l=a>1e-6?ae(o,1/a):{x:Math.cos(e.facing),z:Math.sin(e.facing)};if(i.face=l,e.state!=="idle")return i;if(a<=be.bearer.approach&&e.cooldowns.push<=0&&(s.heavyOwner===null||s.heavyOwner===e.id)&&(e.breakT??0)<=0)return i.cast={skill:"push",dir:null},i;let c=a>1.4?l:{x:0,z:0};return ot(c)>0&&(c=Tu(s,e,c,t.strafeDir),s.edgeDistance(We(e.pos,ae(c,1.2)))<.8&&(c=_e(We(c,ae(_e(ae(e.pos,-1)),.8))))),i.move=c,i}function Ru(s,e,t,n){let i=wu(),r=s.player;if(!Eu(r))return i;let o=it(r.pos,e.pos),a=ot(o),l=a>1e-6?ae(o,1/a):{x:1,z:0};if(e.state!=="idle")return i.move=ae(t.move,.5),i;if(a<be.archer.backstepTrigger&&e.cooldowns.dash<=0)return i.dash=!0,i.dashDir=wp(s,e,l),i;if(t.thinkT-=n,t.strafeT-=n,t.thinkT<=0){t.thinkT=Ft.think,t.strafeT<=0&&(t.strafeT=Ft.strafeSwitchMin+(Ft.strafeSwitchMax-Ft.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1));let c=ae(pn(l),t.strafeDir),h,d=be.archer;if(r.state==="guard"&&r.shieldDir){let u=_e(pn(r.shieldDir)),f=ae(u,-1),v=We(r.pos,ae(u,(d.preferMin+d.preferMax)/2)),b=We(r.pos,ae(f,(d.preferMin+d.preferMax)/2)),g=s.edgeDistance(v)>1.5?lt(v,e.pos):1/0,p=s.edgeDistance(b)>1.5?lt(b,e.pos):1/0,m=g<=p?v:b;h=lt(m,e.pos)>.6?_e(it(m,e.pos)):c}else if(a>d.preferMax)h=_e(We(l,ae(c,.4)));else if(a<d.preferMin){let u=ae(l,-1);h=s.edgeDistance(We(e.pos,ae(u,2)))<Ft.edgeDanger+.5?c:_e(We(u,ae(c,.5)))}else h=c;s.edgeDistance(We(e.pos,ae(h,1.5)))<Ft.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,h=_e(ae(e.pos,-1))),t.move=Tu(s,e,h,t.strafeDir)}if(i.move=t.move,e.cooldowns.basic<=0&&a<$t.range-.5&&s.lineOfSight(e.pos,r.pos)){let c=(t.rng()-.5)*2*(6*Math.PI/180);i.fire=!0,i.fireDir=Ls(l,c)}return i}function wp(s,e,t){let n=ae(t,-1),i=[n,_e(We(n,pn(t))),_e(it(n,pn(t))),_e(pn(t)),ae(_e(pn(t)),-1)],r=n,o=-1/0;for(let a of i){let l=s.edgeDistance(We(e.pos,ae(a,be.archer.backstep)));if(a===n&&l>=1)return n;l>o&&(o=l,r=a)}return r}var yt=1e-9;function Cu(s,e){let t=ot(s),n=ot(e);return t<1e-12||n<1e-12?Math.PI:Math.acos(Math.max(-1,Math.min(1,Dt(s,e)/(t*n))))}function Ep(s,e,t){let n=Math.atan2(s.x*e.z-s.z*e.x,Dt(s,e));return Math.abs(n)<=t+yt?_e(e):Ps(ln(s)+Math.sign(n)*t)}function Tp(s,e,t){let n=e-s;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return Math.abs(n)<=t?e:s+Math.sign(n)*t}var Iu={dash:0,bash:1,counterMelee:1,guard:2,throw:3,charge:3,push:3,fire:4},Pu={1:"melee1",2:"melee2",3:"melee3"},Ac=s=>s==="melee1"||s==="melee2"||s==="melee3",ks=class extends At{constructor(t=1,n="ares",i){super(i?.mode??"waves",t,i?.variant??"v4");this.scripted=new Map;this.fxMap=new Map;this.aiV4=new Map;this.buf=null;this.combo=null;this.comboManualDir=null;this.lastMeleeTarget=null;this.guardSt=null;this.counter=null;this.threat=null;this.waveIdx=0;this.wavePhase="fight";this.waveClearAt=0;this.waveMembers=[];this.pendingSpawns=[];this.waveList=be.waves.list;this.droppedPresses=0;i&&(this.state.island=i.island,this.waveList=i.waves),this.nextId=1;let r=this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2,"guardian");r.hp=r.maxHp=be.player.hp,r.radius=be.player.radius,r.cooldowns={basic:0,control:0,push:0,dash:0},r.cooldownMax={basic:0,control:Lt.cooldown,push:n==="ares"?be.charge.cooldown:n==="none"?Nt.cooldown:be.guard.lock,dash:fn.cooldown},r.path=n,this.initV4Fields(r),r.shieldDir=n==="mars"?Ps(r.facing):null,this.state.fighters=[r],this.state.playerId=r.id,this.state.ledgeDepth=2.6,this.state.v4={path:n,wave:{index:0,total:this.waveList.length,remaining:0},revivesLeft:be.revive.count,kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0}},this.spawnWave(1,this.chooseSpawns(this.waveList[0].length)),this.sync(r)}untouchable(t){return t.invulnT>0||(t.protectT??0)>0}wonNow(){return this.wavePhase==="done"}onDamaged(t,n,i,r){}beginWaves(t){this.waveList=t,this.waveIdx=0,this.waveMembers=[],this.pendingSpawns=[],this.spawnWave(1,this.chooseSpawns(t[0].length))}calmPlayer(t){let n=this.fx(t);this.cancelWindup(t),n.act=null,n.slide=null,n.hitstunT=0,n.stunKind=null,n.heavyArmor=!1,this.clearPlayer(t),t.burstLeft=0,this.bursts.delete(t.id),this.dashBuf.delete(t.id),t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.breakT=0,this.setState(t,"idle")}initV4Fields(t){t.breakT=0,t.armorT=0,t.armorKind=null,t.shieldDir=null,t.shieldUp=!1,t.guard=null,t.counterT=0,t.counterTargetId=null,t.meleeStep=0,t.protectT=0}fx(t){let n=this.fxMap.get(t.id);return n||(n={hitstunT:0,stunKind:null,heavyArmor:!1,stackArmorT:0,stackHits:[],act:null,slide:null,noTurnUntil:-1},this.fxMap.set(t.id,n)),n}canLedge(t){return t.team==="player"}enemies(){return this.state.fighters.filter(t=>t.team==="enemy"&&At.alive(t))}armored(t){let n=this.fx(t);return n.heavyArmor||n.stackArmorT>0}coverOn(){return this.coverOverride??!0}step(t){let n=this.state,i=gn;n.time+=i;for(let r of n.fighters)this.tickTimers(r,i);for(let r of n.fighters)At.alive(r)&&!this.suspended(r)&&this.settle(r);for(let r of n.fighters){if(!At.alive(r)||this.suspended(r))continue;let o;if(this.ended)o=os;else if(r.team==="player")o=t;else{let a=this.scripted.get(r.id);a?(o=a,this.scripted.delete(r.id)):this.aiEnabled?o=this.aiFor(r):o=os}this.control(r,o)}for(let r of n.fighters)this.suspended(r)||this.advance(r,i);this.separate(),this.moveProjectiles(i),this.tickWaves(),this.checkEnd();for(let r of n.fighters)this.sync(r);this.recordHistory()}aiFor(t){let n=this.aiV4.get(t.id);return n||(n=Su(this.rng),this.aiV4.set(t.id,n)),t.kit==="shieldbearer"?Au(this,t,n,gn):Ru(this,t,n,gn)}tickTimers(t,n){super.tickTimers(t,n);let i=this.fx(t);i.hitstunT=Math.max(0,i.hitstunT-n),i.stackArmorT=Math.max(0,i.stackArmorT-n),t.breakT=Math.max(0,(t.breakT??0)-n),t.protectT=Math.max(0,(t.protectT??0)-n),t.guard&&(t.guard.since+=n),(t.counterT??0)>0&&(t.counterT=Math.max(0,(t.counterT??0)-n))}settle(t){let n=this.fx(t),i=this.state.time;t.state==="hitstun"&&n.hitstunT<=yt&&(n.stunKind=null,this.setState(t,"idle")),t.state==="recover"&&n.act&&(n.act.kind==="melee"||n.act.kind==="recover")&&t.stateT>=n.act.recDur-yt?this.endRecover(t):t.state==="recover"&&(!n.act||n.act.kind!=="melee"&&n.act.kind!=="recover")&&this.endRecover(t),t.state==="idle"&&n.hitstunT>yt&&this.setState(t,"hitstun"),t.team==="player"&&(t.state==="guard"&&this.guardSt&&i-this.guardSt.raisedAt>=be.guard.maxHold-yt&&this.lowerGuard(t,"timeout",!0),this.counter&&(t.counterT??0)<=yt&&this.loseCounter(t,this.counter.released?"timeout":"held"),this.combo&&t.state==="idle"&&i>this.combo.until+yt&&this.resetCombo(t))}endRecover(t){let n=this.fx(t),i=n.act;n.act=null,this.setState(t,"idle"),i&&i.kind==="melee"&&(i.struck||(this.lastMeleeTarget=null),this.combo&&(this.combo.until=this.state.time+be.comboWindow))}sync(t){let n=this.fx(t);n.heavyArmor&&t.windup?(t.armorT=Math.max(0,t.windup.dur-t.windup.t),t.armorKind="heavy"):n.stackArmorT>0?(t.armorT=n.stackArmorT,t.armorKind="stack"):(t.armorT=0,t.armorKind=null),t.kit==="shieldbearer"&&(t.shieldDir=Ps(t.facing),t.shieldUp=At.alive(t)&&(t.breakT??0)<=0),t.team==="player"&&(t.guard&&(t.guard.perfect=t.guard.since<=be.guard.perfect+yt),t.counterTargetId=this.counter?this.counter.targetId:null,this.counter||(t.counterT=0))}control(t,n){t.team==="player"?this.controlPlayer(t,n):this.controlEnemy(t,n)}controlPlayer(t,n){let i=this.state.time;if(t.path==="mars"&&(this.counter&&!this.counter.released&&!n.guardHeld?(this.counter.released=!0,t.state==="guard"&&this.lowerGuard(t,"release",!1)):t.state==="guard"&&!n.guardHeld&&this.lowerGuard(t,"release",!0)),n.dash&&this.counter&&this.loseCounter(t,"dash"),t.state==="ledge"||t.state==="climb"||t.state==="knocked"){this.dropBuf(),this.droppedPresses+=(n.firePressed?1:0)+(n.cast?1:0)+(t.path==="mars"&&n.guardPressed?1:0),super.control(t,n);return}let r=n.dashDir&&ot(n.dashDir)>.01?_e(n.dashDir):ot(n.move)>.2?_e(n.move):this.facingDir(t);n.dash&&this.dashBuf.set(t.id,{at:i,dir:r,dashOk:!1});let o=[],a=this.counterUsable(t);if(n.dash&&o.push({type:"dash",at:i,dir:r,untilRecEnd:!1}),t.path==="mars"&&n.guardPressed&&o.push({type:a?"bash":"guard",at:i,dir:n.guardDir??null,untilRecEnd:!1}),n.cast){let h=n.cast.skill==="control"?"throw":t.path==="ares"?"charge":t.path==="none"?"push":null;h&&o.push({type:h,at:i,dir:n.cast.dir,untilRecEnd:!1})}n.firePressed&&o.push({type:a?"counterMelee":"fire",at:i,dir:n.fireDir,untilRecEnd:!1}),o.sort((c,h)=>Iu[c.type]-Iu[h.type]);let l=!1;for(let c of o){if(l){this.droppedPresses++;continue}if(this.onCooldown(t,c)){this.droppedPresses++;continue}let h=this.pressRule(t,c);if(h==="drop"){this.droppedPresses++;continue}this.dropBuf(),this.buf={...c,untilRecEnd:h==="recEnd"},l=!0}if(this.buf&&!this.buf.untilRecEnd&&i-this.buf.at>be.inputBuffer+yt&&this.dropBuf(),this.buf){let c=this.pressRule(t,this.buf);if(c==="now"){let h=this.buf;if(this.buf=null,this.execute(t,h,n)){this.playerMove(t,n),this.updateGuardDir(t,n);return}this.droppedPresses++}else c==="drop"&&this.dropBuf()}!this.buf&&n.fire&&this.activity(t)==="free"&&this.startMelee(t,n,null),this.playerMove(t,n),this.updateGuardDir(t,n)}dropBuf(){this.buf&&this.droppedPresses++,this.buf=null}onCooldown(t,n){switch(n.type){case"dash":return t.cooldowns.dash>0;case"throw":return t.cooldowns.control>0;case"charge":case"push":case"guard":return t.cooldowns.push>0;default:return!1}}activity(t){let n=this.fx(t);switch(t.state){case"idle":return(t.breakT??0)>0||n.hitstunT>yt?"stun":"free";case"hitstun":return"stun";case"windup":{let i=t.windup?.skill;return Ac(i)?"meleeWindup":i==="charge"?"charge":"castWindup"}case"recover":{let i=n.act;return i&&i.kind==="recover"&&(i.tag==="chargeHit"||i.tag==="chargeMiss")?"charge":"meleeRecover"}case"charge":return"charge";case"guard":return"guard";case"dash":return"dash";default:return"other"}}pressRule(t,n){let i=n.type==="fire"||n.type==="counterMelee";switch(this.activity(t)){case"free":return"now";case"meleeWindup":case"castWindup":return n.type==="dash"?"now":"drop";case"meleeRecover":{if(n.type!=="dash")return"buffer";let r=this.fx(t).act;return(r&&(r.kind==="melee"||r.kind==="recover")?r.recDur:0)-t.stateT<=be.inputBuffer+yt?"recEnd":"drop"}case"charge":return i?"buffer":"drop";case"guard":return n.type==="dash"?"now":"drop";case"dash":case"stun":return n.type==="dash"?"drop":"buffer";default:return"drop"}}execute(t,n,i){switch(n.type){case"dash":return this.doDash(t,n.dir??this.facingDir(t));case"bash":return this.counterUsable(t)?this.doCounterBash(t,i):i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"counterMelee":return this.counterUsable(t)?this.doCounterMelee(t,i):this.startMelee(t,i,n.dir);case"guard":return i.guardHeld?this.raiseGuard(t,i,n.at):!1;case"throw":return t.cooldowns.control>0?!1:(this.resetCombo(t),this.startWindup(t,"control",this.aimOrAuto(t,n.dir,Lt.range),Lt.windup),!0);case"charge":return this.startCharge(t,i,n);case"push":return t.cooldowns.push>0?!1:(this.resetCombo(t),this.startWindup(t,"push",this.aimOrAuto(t,n.dir,Nt.range+2),Nt.windup),!0);case"fire":return this.startMelee(t,i,n.dir)}}playerMove(t,n){let i=this.fx(t),r=0;switch(t.state){case"idle":r=(t.breakT??0)>0?.5:1;break;case"windup":r=Ac(t.windup?.skill)?be.attackMoveMult:t.windup?.skill==="charge"?0:Hr;break;case"recover":{let c=i.act;r=c&&c.kind==="melee"?be.attackMoveMult:c&&c.kind==="recover"&&(c.tag==="chargeHit"||c.tag==="chargeMiss")?0:.3;break}case"guard":r=be.guard.moveMult;break;default:r=0}if(r<=0){t.moveVel={x:0,z:0};return}let o=n.move,a=ot(o);a>1&&(o=ae(o,1/a));let l=be.player.speed*r*(t.slowT>0?zr:1);t.moveVel=ae(o,l),t.state==="idle"&&a>.1&&(t.facing=ln(o))}doDash(t,n){return t.cooldowns.dash>0?!1:(t.state==="guard"&&this.lowerGuard(t,"dash",!0),this.resetCombo(t),this.fx(t).act=null,this.fx(t).slide=null,this.dashBuf.delete(t.id),this.startDash(t,{...os,dashDir:n}),!0)}comboNext(){return this.combo&&this.state.time<=this.combo.until+yt?this.combo.next:1}resetCombo(t){t.team==="player"&&(this.combo=null,this.comboManualDir=null,this.lastMeleeTarget=null,t.meleeStep=0)}meleeDir(t,n){if(this.comboManualDir)return this.comboManualDir;let i=this.lastMeleeTarget!==null?this.fighter(this.lastMeleeTarget):void 0;if(i&&At.alive(i)&&lt(i.pos,t.pos)<=be.target.keep+yt&&lt(i.pos,t.pos)>1e-6)return _e(it(i.pos,t.pos));let r=this.facingDir(t),o=null,a=1/0;for(let l of this.enemies()){let c=lt(l.pos,t.pos);c>be.target.autoRange+yt||c<1e-6||Dt(_e(it(l.pos,t.pos)),r)<Math.cos(be.target.autoHalfAngle)-yt||c<a&&(a=c,o=l)}return o?_e(it(o.pos,t.pos)):ot(n.move)>.2?_e(n.move):r}startMelee(t,n,i){let r=this.comboNext();r===1&&(this.comboManualDir=null);let o=n.fireDir&&ot(n.fireDir)>.01?_e(n.fireDir):i&&ot(i)>.01?_e(i):null;o&&(this.comboManualDir=o);let a=this.meleeDir(t,n),l=be.melee[r-1];return this.fx(t).act={kind:"melee",step:r,counter:!1,dir:a,hitIds:new Set,stepLeft:l.step,stepSpeed:l.step/l.windup,recDur:l.recover,struck:!1,bestD:1/0},this.combo={next:r===3?1:r+1,until:1/0},t.meleeStep=r,this.startWindup(t,Pu[r],a,l.windup),!0}releaseMelee(t){let n=this.fx(t).act;t.windup=null,this.setState(t,"recover"),n&&n.kind==="melee"&&this.strikeMelee(t,n,!0)}meleeGeom(t,n,i,r){let o=be.melee[r-1],a=it(n.pos,t.pos),l=ot(a);if(l>o.range+n.radius+yt)return!1;if(l<.6)return!0;if(o.shape==="fan")return Dt(ae(a,1/l),i)>=Math.cos(o.halfAngle)-yt;let c=Dt(a,i),h=Math.abs(a.x*i.z-a.z*i.x);return c>=0&&h<=o.width/2+n.radius+yt}strikeMelee(t,n,i){let r=be.melee[n.step-1],o=n.counter?"counterMelee":Pu[n.step],a=!1,l=null;for(let c of[...this.state.fighters]){if(c.team===t.team||!At.alive(c)||n.hitIds.has(c.id)||!this.meleeGeom(t,c,n.dir,n.step)||this.coverOn()&&this.rockOnSegment(t.pos,c.pos))continue;n.hitIds.add(c.id);let h=lt(t.pos,c.pos),d=this.resolveHit(t,c,{kind:o,dmg:r.dmg,fromDir:_e(it(t.pos,c.pos)),melee:!0,stun:r.stun>0?r.stun:void 0,knock:r.knock>0?{dir:n.dir,dist:r.knock}:null});d==="bearer"?l=c:(d==="hit"||d==="armored")&&(a=!0,n.struck=!0,h<n.bestD&&(n.bestD=h,this.lastMeleeTarget=c.id))}i&&this.emit({type:"melee",ownerId:t.id,step:n.step,pos:{...t.pos},dir:{...n.dir},hit:a,counter:n.counter}),l&&At.alive(t)&&this.recoil(t,l)}recoil(t,n){let i=this.fx(t);i.act=null,this.cancelWindup(t),this.resetCombo(t),i.hitstunT=Math.max(i.hitstunT,be.recoil),i.stunKind="recoil",t.state!=="knocked"&&this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:_e(it(t.pos,n.pos)),dur:be.recoil})}startCharge(t,n,i){if(t.cooldowns.push>0)return!1;let r=i.dir&&ot(i.dir)>.01?_e(i.dir):null;if(!r&&ot(n.move)>.2&&(r=_e(n.move)),!r){let o=null,a=1/0;for(let l of this.enemies()){let c=lt(l.pos,t.pos);c<=be.charge.autoRange+yt&&c>1e-6&&c<a&&(a=c,o=l)}r=o?_e(it(o.pos,t.pos)):this.facingDir(t)}return this.resetCombo(t),t.cooldowns.push=Math.max(0,be.charge.cooldown-(this.state.time-i.at)),this.fx(t).act={kind:"charge",dir:r,moved:0},this.startWindup(t,"charge",r,be.charge.windup),!0}advanceCharge(t,n){let i=this.fx(t),r=i.act;if(!r||r.kind!=="charge"){this.setState(t,"idle");return}let o=be.charge,a=Math.min(o.distance-r.moved,o.distance/o.time*n),l=this.activeMove(t,ae(r.dir,a),"contact");if(r.moved+=l.moved,l.enemy){this.chargeImpact(t,l.enemy,r);return}(l.blocked||r.moved>=o.distance-1e-6)&&(i.act={kind:"recover",tag:"chargeMiss",recDur:o.missRecover},this.setState(t,"recover"))}chargeImpact(t,n,i){let r=this.fx(t),o=be.charge,a=n.kit==="shieldbearer"?{knock:{dir:i.dir},breakDur:o.breakDur}:{knock:{dir:i.dir},stun:o.archerStun},l=this.resolveHit(t,n,{kind:"charge",dmg:o.dmg,fromDir:_e(it(t.pos,n.pos)),melee:!0,...a});if(At.alive(t)){if(l==="bearer"){r.act=null,r.hitstunT=Math.max(r.hitstunT,o.bounceStun),r.stunKind="bounce",r.slide={dir:ae(i.dir,-1),left:o.bounce,speed:o.bounce/o.bounceTime},this.setState(t,"hitstun"),this.emit({type:"recoil",ownerId:t.id,dir:ae(i.dir,-1),dur:o.bounceStun});return}r.act={kind:"recover",tag:"chargeHit",recDur:o.hitRecover},this.setState(t,"recover")}}raiseGuard(t,n,i){if(t.path!=="mars"||t.cooldowns.push>0)return!1;let r=this.state.time;this.resetCombo(t),this.fx(t).act=null,this.guardSt={pressAt:i,raisedAt:r,counterMade:!1},t.guard={since:r-i,perfect:r-i<=be.guard.perfect+yt},t.shieldUp=!0,this.threat=null;let a=(n.guardDir&&ot(n.guardDir)>.01?_e(n.guardDir):null)??this.autoGuardDir(t)??this.facingDir(t);return t.shieldDir=a,t.facing=ln(a),this.setState(t,"guard"),this.emit({type:"guardUp",ownerId:t.id}),!0}lowerGuard(t,n,i){t.state==="guard"&&this.setState(t,"idle"),t.guard=null,t.shieldUp=!1,this.guardSt=null,this.threat=null,i&&(t.cooldowns.push=be.guard.lock),this.emit({type:"guardDown",ownerId:t.id,reason:n})}updateGuardDir(t,n){if(t.state!=="guard"||!t.shieldDir)return;let i=n.guardDir&&ot(n.guardDir)>.01?_e(n.guardDir):null;i&&(this.threat=null);let r=i??this.autoGuardDir(t);r&&(t.shieldDir=Ep(t.shieldDir,r,be.guard.turnRate*gn)),t.facing=ln(t.shieldDir)}heavyCovers(t,n){let i=t.windup;if(!i||i.skill!=="enemyHeavy"||t.state!=="windup")return!1;let r=it(n.pos,t.pos),o=ot(r);return o>Xt.range+n.radius||!(o<.6||Dt(ae(r,1/o),i.dir)>=Math.cos(Xt.halfAngle))?!1:!this.rockOnSegment(t.pos,n.pos)}arrowHeading(t,n){let i=it(n.pos,t.pos),r=Dt(i,t.dir);if(r<=0||Math.abs(i.x*t.dir.z-i.z*t.dir.x)>n.radius+t.radius||t.range-t.traveled<r-n.radius)return null;let a=We(t.pos,ae(t.dir,r));return this.state.island.rocks.some(l=>Ds(t.pos,a,l.pos,l.r+t.radius*.5))?null:r}threatValid(t,n){if(n.kind==="heavy"){let r=this.fighter(n.id);return!r||!At.alive(r)||r.windup!==n.w||lt(r.pos,t.pos)>be.guard.threatDrop?!1:this.heavyCovers(r,t)}let i=this.state.projectiles.find(r=>r.id===n.id);return!i||!i.alive||lt(i.pos,t.pos)>be.guard.threatDrop?!1:this.arrowHeading(i,t)!==null}autoGuardDir(t){if(this.threat&&!this.threatValid(t,this.threat)&&(this.threat=null),!this.threat){let r=null,o=1/0;for(let a of this.enemies()){if(!this.heavyCovers(a,t))continue;let l=a.windup,c=l.dur-l.t;c<o&&(o=c,r={kind:"heavy",id:a.id,w:l})}for(let a of this.state.projectiles){if(!a.alive||a.team===t.team||a.kind!=="enemyBasic")continue;let l=lt(a.pos,t.pos);if(l>be.guard.arrowScan||this.arrowHeading(a,t)===null)continue;let c=l/a.speed;c<o&&(o=c,r={kind:"arrow",id:a.id})}this.threat=r}let n=this.threat;if(!n)return null;if(n.kind==="heavy"){let r=this.fighter(n.id);return _e(it(r.pos,t.pos))}let i=this.state.projectiles.find(r=>r.id===n.id);return ae(i.dir,-1)}counterUsable(t){return this.counter!==null&&this.counter.released&&(t.counterT??0)>yt}loseCounter(t,n){this.counter&&(this.counter=null,t.counterT=0,t.counterTargetId=null,this.emit({type:"counterLost",ownerId:t.id,reason:n}))}useCounter(t,n){this.counter=null,t.counterT=0,t.counterTargetId=null,this.state.v4.counters[n]++,this.emit({type:"counterUsed",ownerId:t.id,kind:n})}counterAim(t,n,i,r){let o=this.counter?this.fighter(this.counter.targetId):void 0;return o&&At.alive(o)&&lt(o.pos,t.pos)<=n+yt&&lt(o.pos,t.pos)>1e-6?_e(it(o.pos,t.pos)):i&&ot(i)>.01?_e(i):this.meleeDir(t,r)}doCounterBash(t,n){let i=be.counter.bash;this.resetCombo(t);let r=this.counterAim(t,i.aimRange,n.guardDir,n);this.useCounter(t,"bash"),t.facing=ln(r);for(let o of[...this.state.fighters]){if(o.team===t.team||!At.alive(o))continue;let a=it(o.pos,t.pos),l=ot(a);l>i.range+o.radius||(l<.6||Dt(ae(a,1/l),r)>=Math.cos(i.halfAngle)-yt)&&(this.coverOn()&&this.rockOnSegment(t.pos,o.pos)||this.resolveHit(t,o,{kind:"counterBash",dmg:i.dmg,fromDir:_e(it(t.pos,o.pos)),melee:!0,knock:{dir:r,mult:i.knockMult}}))}return t.cooldowns.push=be.guard.lock,At.alive(t)&&t.state!=="knocked"&&(this.fx(t).act={kind:"recover",tag:"bash",recDur:i.recover},this.setState(t,"recover")),!0}doCounterMelee(t,n){let i=be.counter.melee;this.resetCombo(t);let r=n.fireDir&&ot(n.fireDir)>.01?_e(n.fireDir):null,o=this.counterAim(t,i.aimRange,r,n);r&&(this.comboManualDir=r),this.useCounter(t,"melee"),t.facing=ln(o),this.activeMove(t,ae(o,i.step),"stop");let a=be.melee[0],l={kind:"melee",step:1,counter:!0,dir:o,hitIds:new Set,stepLeft:0,stepSpeed:0,recDur:a.recover,struck:!1,bestD:1/0};return this.fx(t).act=l,this.combo={next:2,until:1/0},t.meleeStep=1,this.setState(t,"recover"),this.strikeMelee(t,l,!0),!0}canTurn(t){return t.state==="idle"&&this.state.time>=this.fx(t).noTurnUntil-yt}controlEnemy(t,n){let i=this.fx(t),r=(t.breakT??0)>0;if(t.kit==="shieldbearer"&&n.face&&ot(n.face)>.01&&this.canTurn(t)&&(t.facing=Tp(t.facing,ln(n.face),be.bearer.turnRate*gn)),t.state==="idle"&&!r&&i.hitstunT<=yt){if(t.kit==="shieldbearer"&&n.cast&&n.cast.skill==="push"&&t.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===t.id)){this.heavyOwner=t.id,this.startWindup(t,"enemyHeavy",this.facingDir(t),Xt.windup),t.moveVel={x:0,z:0};return}if(t.kit==="archer"){if(n.dash&&n.dashDir&&ot(n.dashDir)>.01&&t.cooldowns.dash<=0){this.startBackstep(t,_e(n.dashDir));return}if(n.fire&&t.burstLeft===0&&t.cooldowns.basic<=0){this.startWindup(t,"enemyBasic",this.aimOrAuto(t,n.fireDir,$t.range),$t.windup);return}}}if(t.state==="idle"||t.state==="windup"||t.state==="recover"){let o=n.move,a=ot(o);a>1&&(o=ae(o,1/a));let l=t.kit==="shieldbearer"?be.bearer.speed:be.archer.speed;t.slowT>0&&(l*=zr),r&&(l*=.5),t.burstLeft>0&&(l*=Jo),t.state==="windup"&&(l*=Hr),t.state==="recover"&&(l*=.3),t.moveVel=ae(o,l),t.kit==="archer"&&t.state==="idle"&&t.burstLeft===0&&a>.1&&(t.facing=ln(o))}else t.moveVel={x:0,z:0}}startBackstep(t,n){t.cooldowns.dash=be.archer.backstepCooldown,this.fx(t).act={kind:"backstep",dir:n,left:be.archer.backstep},t.moveVel={x:0,z:0},this.setState(t,"dash"),this.emit({type:"dash",ownerId:t.id,from:{...t.pos},dir:{...n}})}advance(t,n){let i=this.fx(t);switch(t.state){case"dead":case"falling":case"knocked":case"ledge":case"climb":super.advance(t,n);return;case"dash":if(i.act&&i.act.kind==="backstep"){this.advanceBackstep(t,i.act,n);break}super.advance(t,n);return;case"reviving":t.stateT>=be.revive.delay-yt&&this.revive(t);return;case"windup":this.advanceWindup(t,n);break;case"recover":this.walk(t,n),i.act&&i.act.kind==="melee"&&t.stateT<=be.meleeActive+yt&&this.strikeMelee(t,i.act,!1);break;case"charge":this.advanceCharge(t,n);break;case"idle":case"guard":this.walk(t,n);break;case"hitstun":t.moveVel={x:0,z:0};break}if(i.slide&&(t.state==="idle"||t.state==="hitstun"||t.state==="guard"||t.state==="recover"||t.state==="windup")){let o=Math.min(i.slide.left,i.slide.speed*n),a=this.activeMove(t,ae(i.slide.dir,o),"stop");i.slide.left-=o,(a.blocked||i.slide.left<=1e-6)&&(i.slide=null)}if((t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&Et(t.pos,this.state.island.poly)<0){this.startFall(t,{x:0,z:0});return}this.tickBurst(t,n)}advanceBackstep(t,n,i){let r=Math.min(n.left,be.archer.backstep/be.archer.backstepTime*i),o=this.activeMove(t,ae(n.dir,r),"none");n.left-=r,(o.blocked||n.left<=1e-6)&&(this.fx(t).act=null,this.setState(t,"idle"))}advanceWindup(t,n){let i=t.windup,r=this.fx(t);i.t+=n;let o=r.act;if(Ac(i.skill)&&o&&o.kind==="melee"&&o.stepLeft>0){let a=Math.min(o.stepLeft,o.stepSpeed*n),l=this.activeMove(t,ae(o.dir,a),"stop");o.stepLeft=l.blocked?0:o.stepLeft-a}i.skill==="enemyHeavy"&&!r.heavyArmor&&i.t>=i.dur-be.bearer.heavyArmor-yt&&(r.heavyArmor=!0,this.emit({type:"armor",ownerId:t.id,kind:"heavy",dur:be.bearer.heavyArmor})),i.skill!=="charge"&&this.walk(t,n),i.t>=i.dur-yt&&this.releaseV4(t)}releaseV4(t){let n=t.windup,i=this.fx(t);switch(n.skill){case"melee1":case"melee2":case"melee3":this.releaseMelee(t);return;case"charge":t.windup=null,this.setState(t,"charge"),this.emit({type:"charge",ownerId:t.id,from:{...t.pos},dir:{...n.dir}});return;case"enemyHeavy":this.releaseWindup(t),i.heavyArmor=!1,i.noTurnUntil=this.state.time+Xt.recover,t.state==="recover"&&(i.act={kind:"recover",tag:"heavy",recDur:Xt.recover});return;case"push":this.releaseWindup(t),t.state==="recover"&&(i.act={kind:"recover",tag:"push",recDur:Nt.recover});return;default:this.releaseWindup(t)}}activeMove(t,n,i){if(i==="contact"){let h=this.contactAt(t,t.pos);if(h)return{moved:0,blocked:"enemy",enemy:h}}let r=ot(n);if(r<1e-12)return{moved:0,blocked:null,enemy:null};let o=Math.max(1,Math.ceil(r/.02)),a=ae(n,1/o),l=r/o,c=0;for(let h=0;h<o;h++){let d=We(t.pos,a),u=this.moveBlock(t,t.pos,d,i);if(u){let f=0,v=1;for(let b=0;b<30;b++){let g=(f+v)/2;this.moveBlock(t,t.pos,We(t.pos,ae(a,g)),i)?v=g:f=g}return t.pos=We(t.pos,ae(a,f)),c+=l*f,{moved:c,blocked:u.kind,enemy:u.enemy}}t.pos=d,c+=l}return{moved:c,blocked:null,enemy:null}}contactAt(t,n){let i=null,r=1/0;for(let o of this.state.fighters){if(o.team===t.team||!At.alive(o))continue;let a=lt(n,o.pos);a<=be.charge.contact+yt&&a<r&&(r=a,i=o)}return i}moveBlock(t,n,i,r){let o=this.state.island.poly,a=Et(i,o);if(a<be.edgeMargin&&a<Et(n,o)-1e-12)return{kind:"edge",enemy:null};for(let l of this.state.island.rocks){let c=lt(i,l.pos),h=l.r+t.radius;if(c<h&&c<lt(n,l.pos)-1e-12)return{kind:"rock",enemy:null}}if(r==="contact"){let l=this.contactAt(t,i);if(l)return{kind:"enemy",enemy:l}}else if(r==="stop")for(let l of this.state.fighters){if(l.team===t.team||!At.alive(l))continue;let c=lt(i,l.pos),h=t.radius+l.radius;if(c<h&&c<lt(n,l.pos)-1e-12)return{kind:"enemy",enemy:l}}return null}cancelWindup(t){if(t.windup){let n=this.fx(t);n.heavyArmor=!1,n.act&&(n.act.kind==="melee"||n.act.kind==="charge")&&(n.act=null)}super.cancelWindup(t)}resolveHit(t,n,i){let r=this.state;if(this.untouchable(n))return"invuln";if(n.kit==="shieldbearer"&&(n.breakT??0)<=0&&Cu(i.fromDir,this.facingDir(n))<=be.bearer.frontHalfAngle+1e-7)return this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:"bearer",skill:i.kind,pos:We(n.pos,ae(i.fromDir,n.radius)),dir:ae(i.fromDir,-1)}),"bearer";if(n.state==="guard"&&n.shieldUp&&n.shieldDir&&n.guard&&Cu(i.fromDir,n.shieldDir)<=be.guard.blockHalfAngle+1e-7)return this.guardBlock(t,n,i);let o=n.slowT>0,a=n.hp;n.hp=Math.max(0,n.hp-i.dmg),this.onDamaged(t,n,i.kind,a-n.hp),n.hitFlashT=.12,n.lastHitBy=t.id,n.lastHitAt=r.time,this.lastHitKind.set(n.id,i.kind),this.hitstop=Math.max(this.hitstop,jo[i.kind]),i.slow&&(n.slowT=i.slow),n.team==="player"&&this.loseCounter(n,"hit");let l=this.armored(n),c=0,h=!1,d=!1;if(n.hp>0&&!l&&(i.breakDur&&this.applyBreak(t,n,i.breakDur),i.knock&&(c=i.knock.dist??At.knockDistance(n.hp,n.maxHp,o)*(i.knock.mult??1),d=this.applyKnock(n,i.knock.dir,c,t,i.kind),h=!0),i.stun&&!d&&(this.applyStun(n,i.stun),h=!0)),d||this.emit({type:"hit",targetId:n.id,sourceId:t.id,kind:i.kind,pos:{...n.pos},dir:i.knock?_e(i.knock.dir):ae(i.fromDir,-1),dmg:i.dmg,knock:c}),n.hp<=0)return this.cancelWindup(n),this.die(n,"hp"),"hit";if(l)return"armored";if(h){let u=this.fx(n),f=r.time;u.stackHits=u.stackHits.filter(v=>f-v<=be.stack.window+yt),u.stackHits.push(f),u.stackHits.length>=be.stack.hits&&(u.stackHits=[],u.stackArmorT=be.stack.armor,this.emit({type:"armor",ownerId:n.id,kind:"stack",dur:be.stack.armor}))}return"hit"}guardBlock(t,n,i){let r=be.guard,o=n.guard.since<=r.perfect+yt;if(this.emit({type:"shieldBlock",attackerId:t.id,targetId:n.id,kind:o?"perfect":"guard",skill:i.kind,pos:We(n.pos,ae(i.fromDir,n.radius)),dir:ae(i.fromDir,-1)}),o)return this.state.v4.perfectBlocks++,i.melee&&(this.applyBreak(n,t,r.perfectBreak),this.guardSt&&!this.guardSt.counterMade&&(this.guardSt.counterMade=!0,this.counter={targetId:t.id,released:!1},n.counterT=be.counter.dur,n.counterTargetId=t.id,this.emit({type:"counterReady",ownerId:n.id,targetId:t.id,dur:be.counter.dur}))),"perfect";if(i.melee){let a=n.hp;n.hp=Math.max(0,n.hp-r.chipDmg),this.onDamaged(t,n,i.kind,a-n.hp),n.lastHitBy=t.id,n.lastHitAt=this.state.time,this.lastHitKind.set(n.id,i.kind),this.fx(n).slide={dir:ae(i.fromDir,-1),left:r.pushback,speed:r.pushback/r.pushbackTime},n.hp<=0&&this.die(n,"hp")}return"guard"}applyBreak(t,n,i){let r=this.fx(n);n.breakT=Math.max(n.breakT??0,i),n.state==="windup"&&(this.cancelWindup(n),r.act=null,this.setState(n,"idle")),n.burstLeft=0,this.bursts.delete(n.id),this.emit({type:"guardBreak",targetId:n.id,sourceId:t.id,dur:i,pos:{...n.pos}}),n.team==="enemy"&&this.state.v4.breaks++}applyStun(t,n){let i=this.fx(t);i.hitstunT=Math.max(i.hitstunT,n),i.stunKind="hit",t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.dropBuf()),(t.state==="idle"||t.state==="windup"||t.state==="recover"||t.state==="hitstun"||t.state==="guard"||t.state==="charge"||t.state==="dash")&&(this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),i.act=null,i.slide=null,this.setState(t,"hitstun"))}applyKnock(t,n,i,r,o){let a=_e(n);if(t.state==="ledge")return this.emit({type:"hit",targetId:t.id,sourceId:r.id,kind:o,pos:{...t.pos},dir:{...a},dmg:0,knock:0}),this.dropLedge(t,"knocked",a),!0;if(t.state==="climb"){let c=this.ledge.get(t.id);c&&(c.rec.outcome="knocked",this.ledge.delete(t.id),this.edgeRec.delete(t.id))}t.team==="player"&&(t.state==="guard"&&this.lowerGuard(t,"hit",!0),this.resetCombo(t),this.dropBuf());let l=this.fx(t);return l.act=null,l.slide=null,this.outSource.set(t.id,"knock"),this.cancelWindup(t),t.burstLeft=0,this.bursts.delete(t.id),t.knockVel=ae(a,2*i/In.knockTime),t.kit!=="shieldbearer"&&(t.facing=ln(ae(a,-1))),this.outsideT.set(t.id,0),this.setState(t,"knocked"),!1}coneStrike(t,n,i,r,o,a){this.emit({type:"cast",ownerId:t.id,skill:a,pos:{...t.pos},dir:{...n}});for(let l of[...this.state.fighters]){if(l.team===t.team||!At.alive(l))continue;let c=it(l.pos,t.pos),h=ot(c);if(!(h>i+l.radius)&&(h<.6||Dt(ae(c,1/h),n)>=Math.cos(r))){if(this.coverOn()){let d=this.rockOnSegment(t.pos,l.pos);if(d){this.emit({type:"blockedStrike",ownerId:t.id,targetId:l.id,skill:a,pos:d,dir:{...n}});continue}}this.resolveHit(t,l,{kind:a,dmg:o,fromDir:_e(it(t.pos,l.pos)),melee:a==="enemyHeavy",knock:{dir:n}})}}}moveProjectiles(t){let n=this.state;for(let i of n.projectiles){if(!i.alive)continue;let r=i.pos,o=i.speed*t,a=We(r,ae(i.dir,o));if(i.traveled+=o,n.island.rocks.some(h=>Ds(r,a,h.pos,h.r+i.radius*.5))){i.alive=!1,this.emit({type:"blocked",pos:a,kind:i.kind,ownerId:i.ownerId});continue}let l=null,c=1/0;for(let h of n.fighters)if(!(h.team===i.team||!At.alive(h)||this.untouchable(h))&&Gi(h.pos,r,a)<h.radius+i.radius){let d=lt(r,h.pos);d<c&&(c=d,l=h)}if(i.pos=a,l){i.alive=!1;let h=this.fighter(i.ownerId);if(h){let d=ae(i.dir,-1);i.kind==="control"?this.resolveHit(h,l,{kind:"control",dmg:Lt.dmg,fromDir:d,slow:Lt.slow,melee:!1}):this.resolveHit(h,l,{kind:i.kind,dmg:i.kind==="enemyBasic"?$t.dmg:3,fromDir:d,melee:!1})}continue}i.traveled>=i.range&&(i.alive=!1,this.emit({type:"expire",pos:a,kind:i.kind}))}n.projectiles=n.projectiles.filter(i=>i.alive)}clearPlayer(t){t.team==="player"&&((t.guard||t.shieldUp)&&(t.guard=null,t.shieldUp=!1,this.guardSt=null),this.counter&&this.loseCounter(t,"hit"),this.resetCombo(t),this.dropBuf(),this.threat=null)}startFall(t,n){let i=this.fx(t);i.act=null,i.slide=null,i.hitstunT=0,i.heavyArmor=!1,this.clearPlayer(t),super.startFall(t,n)}die(t,n){let i=this.state,r=i.v4,o=this.fx(t);if(this.cancelWindup(t),o.act=null,o.slide=null,o.hitstunT=0,o.heavyArmor=!1,o.stackArmorT=0,o.stackHits=[],t.burstLeft=0,this.bursts.delete(t.id),t.team==="player"&&r.revivesLeft>0){if(r.revivesLeft--,this.clearPlayer(t),this.dashBuf.delete(t.id),n==="hp"){let a=this.ledge.get(t.id);a&&a.rec.outcome==="pending"&&(a.rec.outcome="hp");let l=this.edgeRec.get(t.id);l&&l.outcome==="pending"&&(l.outcome="hp"),this.ledge.delete(t.id),this.edgeRec.delete(t.id)}t.hp=0,t.breakT=0,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},this.setState(t,"reviving"),this.emit({type:"reviveStart",ownerId:t.id,delay:be.revive.delay});return}if(t.team==="enemy"){let a=t.lastHitBy!==null&&i.time-t.lastHitAt<4?t.lastHitBy:null;r.kills.push({t:Math.round(i.time*1e3)/1e3,how:n,where:Et(t.pos,i.island.poly)<=be.killEdge?"edge":"center",by:a!==null?this.lastHitKind.get(t.id)??null:null,victim:t.kit})}super.die(t,n)}legalRevivePoints(){let t=this.state,n=be.revive.grid,i=be.player.radius,r=t.island.poly.map(l=>l.x),o=t.island.poly.map(l=>l.z),a=[];for(let l=Math.floor(Math.min(...r)/n);l<=Math.ceil(Math.max(...r)/n);l++)for(let c=Math.floor(Math.min(...o)/n);c<=Math.ceil(Math.max(...o)/n);c++){let h={x:l*n,z:c*n};Et(h,t.island.poly)<be.revive.edge||t.island.rocks.some(d=>lt(h,d.pos)<d.r+i)||a.push(h)}return a}revivePoint(){let t=this.legalRevivePoints(),n=this.enemies(),i=c=>n.reduce((h,d)=>Math.min(h,lt(c,d.pos)),1/0),r=null,o=1/0;for(let c of t){if(i(c)<be.revive.enemyClear)continue;let h=ot(c);h<o-yt&&(o=h,r=c)}if(r)return{...r};let a=t[0],l=-1/0;for(let c of t){let h=i(c);h>l+yt&&(l=h,a=c)}return{...a}}revive(t){let n=this.revivePoint();t.pos=n,t.y=0,t.hp=t.maxHp*be.revive.hpFrac,t.protectT=be.revive.protect,t.knockVel={x:0,z:0},t.moveVel={x:0,z:0},t.deathCause=null,t.slowT=0,t.invulnT=0,this.fallVel.delete(t.id),this.outSource.delete(t.id),this.setState(t,"idle"),this.emit({type:"revive",ownerId:t.id,pos:{...n},protect:be.revive.protect})}spawnCandidates(){let t=this.state,n=be.waves,i=n.grid,r=this.player,o=t.island.poly.map(c=>c.x),a=t.island.poly.map(c=>c.z),l=[];for(let c=Math.floor(Math.min(...o)/i);c<=Math.ceil(Math.max(...o)/i);c++)for(let h=Math.floor(Math.min(...a)/i);h<=Math.ceil(Math.max(...a)/i);h++){let d={x:c*i,z:h*i};Et(d,t.island.poly)<n.minEdge||t.island.rocks.some(u=>lt(d,u.pos)<u.r+.5)||lt(d,r.pos)<n.minPlayerDist||l.push(d)}return l}chooseSpawns(t){let n=be.waves,i=this.spawnCandidates(),r=[];for(let o=0;o<t;o++){let a=i.filter(c=>r.every(h=>lt(h,c)>=n.spacing)&&this.enemies().every(h=>lt(h.pos,c)>=n.spacing)),l=a.length?a:i;r.push({...l[Math.floor(this.rng()*l.length)%l.length]})}return r}spawnWave(t,n){let i=this.waveList[t-1],r=this.player;this.waveIdx=t,this.waveMembers=[],i.forEach((o,a)=>{let l=n[a],c=o==="shieldbearer",h=this.makeFighter("enemy",c?1:2,c?"\u76FE\u5175":"\u5F13\u624B",l,ln(it(r.pos,l)),o);h.hp=h.maxHp=c?be.bearer.hp:be.archer.hp,h.cooldownMax=c?{basic:0,control:0,push:Xt.cooldown,dash:0}:{basic:$t.cooldownMax,control:0,push:0,dash:be.archer.backstepCooldown},h.cooldowns={basic:0,control:0,push:c?2.5:0,dash:0},this.initV4Fields(h),this.state.fighters.push(h),this.waveMembers.push(h.id),this.sync(h)}),this.wavePhase="fight",this.emit({type:"waveStart",index:t,total:this.waveList.length}),this.updateWaveState()}updateWaveState(){let t=this.state.v4.wave;t.index=this.waveIdx,t.total=this.waveList.length,t.remaining=this.waveMembers.filter(n=>{let i=this.fighter(n);return i!==void 0&&At.alive(i)}).length}tickWaves(){let t=this.state.time,n=be.waves;if(this.wavePhase==="fight"&&this.waveMembers.every(i=>this.fighter(i)?.state==="dead")&&(this.emit({type:"waveClear",index:this.waveIdx}),this.waveIdx>=this.waveList.length?this.wavePhase="done":(this.wavePhase="gap",this.waveClearAt=t)),this.wavePhase==="gap"&&t>=this.waveClearAt+n.gap-n.markLead-yt){let i=this.waveList[this.waveIdx],r=this.chooseSpawns(i.length);this.pendingSpawns=i.map((o,a)=>({kit:o,pos:r[a]}));for(let o of this.pendingSpawns)this.emit({type:"spawnMark",pos:{...o.pos},lead:n.markLead});this.wavePhase="marked"}this.wavePhase==="marked"&&t>=this.waveClearAt+n.gap-yt&&!this.ended&&(this.spawnWave(this.waveIdx+1,this.pendingSpawns.map(i=>i.pos)),this.pendingSpawns=[]),this.updateWaveState()}checkEnd(){if(this.ended)return;let t=this.state,n=this.player;n.state==="dead"?(t.result="lose",t.loseText=this.loseText(n)):this.wonNow()&&(t.result="win"),t.result&&(this.ended=!0,this.dashBuf.clear(),this.dropBuf(),this.emit({type:"roundEnd",result:t.result}))}get wave(){return{index:this.waveIdx,phase:this.wavePhase}}debugPlayer(){let t=this.fx(this.player);return{buffered:this.buf?this.buf.type:null,counter:this.counter?{...this.counter}:null,combo:this.combo?{...this.combo}:null,lastTarget:this.lastMeleeTarget,stunKind:t.stunKind,hitstunT:t.hitstunT}}debugFx(t){let n=this.fighter(t),i=this.fx(n);return{hitstunT:i.hitstunT,heavyArmor:i.heavyArmor,stackArmorT:i.stackArmorT,stackCount:i.stackHits.length}}debugDamage(t,n,i,r,o){let a=this.fighter(t),l=this.fighter(n);if(!a||!l||!At.alive(a)||this.untouchable(a))return!1;let c=a.slowT>0;if(a.hp=Math.max(0,a.hp-r),a.lastHitBy=l.id,a.lastHitAt=this.state.time,this.lastHitKind.set(a.id,i),a.hp<=0)return this.die(a,"hp"),!0;let h=0;return o&&(h=At.knockDistance(a.hp,a.maxHp,c),this.applyKnock(a,o,h,l,i))||this.emit({type:"hit",targetId:a.id,sourceId:l.id,kind:i,pos:{...a.pos},dir:o?_e(o):_e(it(a.pos,l.pos)),dmg:r,knock:h}),!0}debugSpawn(t,n,i){let r=t==="shieldbearer",o=this.makeFighter("enemy",r?1:2,r?"\u76FE\u5175":"\u5F13\u624B",n,i??0,t);return o.hp=o.maxHp=r?be.bearer.hp:be.archer.hp,o.cooldownMax=r?{basic:0,control:0,push:Xt.cooldown,dash:0}:{basic:$t.cooldownMax,control:0,push:0,dash:be.archer.backstepCooldown},o.cooldowns={basic:0,control:0,push:0,dash:0},this.initV4Fields(o),this.state.fighters.push(o),this.sync(o),o}debugClearWave(){let t=new Set(this.waveMembers);this.state.fighters=this.state.fighters.filter(n=>!t.has(n.id)),this.waveMembers=[],this.wavePhase="off",this.updateWaveState()}};var qn=1e-9,ea=s=>Math.round(s*1e3)/1e3;function Ap(s,e=be.revive.edge,t=be.revive.grid,n=be.player.radius){let i=s.poly.map(a=>a.x),r=s.poly.map(a=>a.z),o=[];for(let a=Math.floor(Math.min(...i)/t);a<=Math.ceil(Math.max(...i)/t);a++)for(let l=Math.floor(Math.min(...r)/t);l<=Math.ceil(Math.max(...r)/t);l++){let c={x:a*t,z:l*t};Et(c,s.poly)<e||s.rocks.some(h=>lt(c,h.pos)<h.r+n)||o.push(c)}return o}function Lu(s){let e=Ap(s),t=e[0],n=1/0;for(let i of e){let r=ot(i);r<n-qn&&(n=r,t=i)}return{...t}}function Rp(s){let e=s.poly.filter(t=>s.rocks.every(n=>lt(t,n.pos)-n.r>=Ot.exit.ring-qn));return e.length?e:s.poly}function Cp(s,e,t=Ot.exit.minDist){let n=Rp(s),i=null,r=1/0;for(let o of n){let a=lt(o,e);a>=t-qn&&a<r-qn&&(r=a,i=o)}return i||(i=Ip(n,e)),i?{...i}:null}function Ip(s,e){let t=null,n=-1/0;for(let i of s){let r=lt(i,e);r>n+qn&&(n=r,t=i)}return t}function Pp(s){return{path:s,result:null,reached:{island:1,wave:1},islandTimes:[],waveTimes:[],downs:[],damageTaken:[],kills:[],breaks:0,perfectBlocks:0,counters:{bash:0,melee:0},droppedPresses:0,again:!1,shortcuts:[]}}var Fs=class extends ks{constructor(t=1,n="ares"){let i=Ot.islands[0];super(t,n,{mode:"run",variant:"s1",island:Vi(i.seed),waves:i.waves});this.clearAt=0;this.ringT=0;this.jump=null;this.arriveAt=0;this.fallFrom=null;let r=Pp(n);r.waveTimes.push({island:1,wave:1,t:0}),this.state.s1={islandIndex:1,islandTotal:Ot.islands.length,phase:"fight",exits:[],phaseT:0,record:r},this.events.unshift({type:"islandStart",index:1,total:Ot.islands.length,seed:i.seed}),this.syncRecord()}get s1(){return this.state.s1}suspended(t){return t.team==="player"&&this.state.s1?.phase==="air"}untouchable(t){return t.team==="player"&&this.state.s1?.phase==="air"?!0:super.untouchable(t)}wonNow(){return super.wonNow()&&this.s1.islandIndex>=this.s1.islandTotal}emit(t){super.emit(t);let n=this.state?.s1;n&&t.type==="waveStart"&&n.record.waveTimes.push({island:n.islandIndex,wave:t.index,t:ea(this.state.time)})}onDamaged(t,n,i,r){let o=this.state.s1;if(!o||n.team!=="player"||r<=0)return;let a=o.record.damageTaken.find(l=>l.byKit===t.kit&&l.skill===i);a||(a={byKit:t.kit,skill:i,total:0,count:0},o.record.damageTaken.push(a)),a.total=ea(a.total+r),a.count++}startFall(t,n){t.team==="player"&&(this.fallFrom={t:this.state.time,pos:{...t.pos}}),super.startFall(t,n)}die(t,n){let i=this.state,r=i.s1,o=i.v4;if(!r){super.die(t,n);return}if(t.team==="player"){let l=t.lastHitBy!==null&&i.time-t.lastHitAt<4?this.fighter(t.lastHitBy):void 0,c=n==="fall"&&this.fallFrom?this.fallFrom:{t:i.time,pos:t.pos};r.record.downs.push({t:ea(c.t),island:r.islandIndex,wave:o.wave.index,pos:{...c.pos},cause:n,byKit:l&&l.team==="enemy"?l.kit:null,revived:o.revivesLeft>0}),this.fallFrom=null,super.die(t,n);return}let a=o.kills.length;super.die(t,n);for(let l=a;l<o.kills.length;l++)r.record.kills.push({...o.kills[l],island:r.islandIndex})}step(t){super.step(t),this.tickS1()}tickS1(){let t=this.state,n=this.s1,i=t.time;if(this.ended&&n.phase!=="done")this.finish();else switch(n.phase){case"fight":this.wavePhase==="done"&&(n.phase="cleared",this.clearAt=i,n.phaseT=Ot.exit.delay);break;case"cleared":n.phaseT=Math.max(0,this.clearAt+Ot.exit.delay-i),i>=this.clearAt+Ot.exit.delay-qn&&this.openExit();break;case"exit":this.tickExit();break;case"air":this.tickAir();break;case"landed":n.phaseT=this.player.protectT??0,n.phaseT<=qn&&(n.phase="fight",n.phaseT=0);break;case"done":break}this.syncRecord()}openExit(){let t=this.s1,n=Cp(this.state.island,this.player.pos);t.exits=n?[{pos:n,progress:0,reward:"none"}]:[],t.phase="exit",t.phaseT=0,this.ringT=0,this.emit({type:"exitOpen",pos:t.exits.map(i=>({...i.pos}))})}tickExit(){let t=this.s1.exits[0];if(!t)return;let n=this.player;At.alive(n)&&n.state!=="ledge"&&n.state!=="climb"&&lt(n.pos,t.pos)<=Ot.exit.ring+qn?this.ringT+=gn:this.ringT=0,t.progress=Math.min(1,this.ringT/Ot.exit.hold),this.ringT>=Ot.exit.hold-qn&&this.startJump()}startJump(){let t=this.s1,n=this.player,i=this.state.time,r=Vi(Ot.islands[t.islandIndex].seed),o={...n.pos};this.calmPlayer(n),this.jump={at:i,from:o,to:Lu(r),island:r,swapped:!1},this.addIslandTime(t.islandIndex,i-this.arriveAt),this.ringT=0,t.phase="air",t.phaseT=Ot.jump.air,this.emit({type:"jumpStart",ownerId:n.id,from:o})}tickAir(){let t=this.s1,n=this.player,i=this.jump,r=this.state.time-i.at;t.phaseT=Math.max(0,Ot.jump.air-r),!i.swapped&&r>=Ot.jump.swapAt-qn&&this.swapIsland(),n.pos=i.swapped?{...i.to}:{...i.from},n.moveVel={x:0,z:0},r>=Ot.jump.air-qn&&this.land()}swapIsland(){let t=this.state,n=this.s1,i=this.jump;i.swapped=!0,n.islandIndex++,t.island=i.island,t.fighters=t.fighters.filter(r=>r.team==="player"),t.projectiles=[],this.heavyOwner=null,this.wavePhase="off",this.waveMembers=[],this.pendingSpawns=[],n.exits=[],this.emit({type:"islandStart",index:n.islandIndex,total:n.islandTotal,seed:Ot.islands[n.islandIndex-1].seed})}land(){let t=this.s1,n=this.player,i=this.jump;this.jump=null,n.pos={...i.to},n.y=0,n.moveVel={x:0,z:0},n.knockVel={x:0,z:0},n.protectT=Ot.jump.protect,t.phase="landed",t.phaseT=Ot.jump.protect,this.arriveAt=this.state.time,this.emit({type:"land",ownerId:n.id,pos:{...i.to},index:t.islandIndex}),this.beginWaves(Ot.islands[t.islandIndex-1].waves)}finish(){let t=this.s1;t.phase="done",t.phaseT=0,t.record.result=this.state.result,this.addIslandTime(t.islandIndex,this.state.time-this.arriveAt)}addIslandTime(t,n){let i=this.s1.record.islandTimes;for(;i.length<t;)i.push(0);i[t-1]=ea(i[t-1]+n)}syncRecord(){let t=this.s1,n=this.state.v4,i=t.record;i.reached={island:t.islandIndex,wave:n.wave.index},i.breaks=n.breaks,i.perfectBlocks=n.perfectBlocks,i.counters={...n.counters},i.droppedPresses=this.droppedPresses}debugClearIsland(){let t=this.state,n=this.s1;this.ended||n.phase!=="fight"&&n.phase!=="landed"||(t.fighters=t.fighters.filter(i=>i.team==="player"),t.projectiles=t.projectiles.filter(i=>i.team==="player"),this.waveMembers=[],this.pendingSpawns=[],this.wavePhase="done",this.heavyOwner=null,n.record.shortcuts.push(`clear@${n.islandIndex}`))}debugGotoIsland(t){let n=this.state,i=this.s1,r=this.player;if(this.ended||!Number.isInteger(t)||t<1||t>i.islandTotal||!At.alive(r))return;this.addIslandTime(i.islandIndex,n.time-this.arriveAt);let o=Ot.islands[t-1];this.calmPlayer(r),this.jump=null,this.ringT=0,i.islandIndex=t,n.island=Vi(o.seed),n.fighters=n.fighters.filter(a=>a.team==="player"),n.projectiles=[],this.heavyOwner=null,i.exits=[],i.phase="fight",i.phaseT=0,r.pos=Lu(n.island),r.y=0,this.arriveAt=n.time,i.record.shortcuts.push(`goto@${t}`),this.emit({type:"islandStart",index:t,total:i.islandTotal,seed:o.seed}),this.beginWaves(o.waves),this.syncRecord()}};var ld=0,dh=1,cd=2;var fh=1,al=2,fi=3,Ai=0,mn=1,un=2,Pi=0,Ri=1,pi=2,ph=3,mh=4,hd=5,Ji=100,ud=101,dd=102,fd=103,pd=104,md=200,gd=201,vd=202,xd=203,Aa=204,Ra=205,yd=206,_d=207,bd=208,Md=209,Sd=210,wd=211,Ed=212,Td=213,Ad=214,ll=0,cl=1,hl=2,us=3,ul=4,dl=5,mr=6,fl=7,pl=0,Rd=1,Cd=2,ei=0,Id=1,Pd=2,Ld=3,ml=4,Dd=5,kd=6,Fd=7;var gh=300,gs=301,vs=302,gl=303,vl=304,ko=306,ds=1e3,Zi=1001,Ca=1002,Pn=1003,Ud=1004;var Fo=1005;var jn=1006,xl=1007;var is=1008;var ti=1009,vh=1010,xh=1011,gr=1012,yl=1013,ss=1014,ni=1015,vr=1016,_l=1017,bl=1018,xr=1020,yh=35902,_h=35899,bh=1021,Mh=1022,Vn=1023,tr=1026,yr=1027,Ml=1028,Sl=1029,Sh=1030,wl=1031;var El=1033,Uo=33776,No=33777,Oo=33778,Bo=33779,Tl=35840,Al=35841,Rl=35842,Cl=35843,Il=36196,Pl=37492,Ll=37496,Dl=37808,kl=37809,Fl=37810,Ul=37811,Nl=37812,Ol=37813,Bl=37814,zl=37815,Hl=37816,Vl=37817,Gl=37818,Wl=37819,Xl=37820,ql=37821,Yl=36492,$l=36494,Kl=36495,Zl=36283,Jl=36284,jl=36285,Ql=36286;var io=2300,Ia=2301,Ta=2302,ih=2400,sh=2401,rh=2402;var Nd=3200,Od=3201;var ec=0,Bd=1,Li="",Vt="srgb",fs="srgb-linear",so="linear",Rt="srgb";var Zn=7680,tc=7681;var wh=517;var nr=519,zd=512,Hd=513,Vd=514,Eh=515,Gd=516,Wd=517,Xd=518,qd=519,Pa=35044,nc=35048;var Th="300 es",Jn=2e3,ro=2001;var Ci=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Rc=Math.PI/180,La=180/Math.PI;function Ei(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function vt(s,e,t){return Math.max(e,Math.min(t,s))}function Lp(s,e){return(s%e+e)%e}function Cc(s,e,t){return(1-t)*s+t*e}function ai(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ct(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ce=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],v=r[o+2],b=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=v,e[t+3]=b;return}if(d!==b||l!==u||c!==f||h!==v){let g=1-a,p=l*u+c*f+h*v+d*b,m=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let E=Math.sqrt(x),R=Math.atan2(E,p*m);g=Math.sin(g*R)/E,a=Math.sin(a*R)/E}let y=a*m;if(l=l*g+u*y,c=c*g+f*y,h=h*g+v*y,d=d*g+b*y,g===1-a){let E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],v=r[o+3];return e[t]=a*v+h*d+l*f-c*u,e[t+1]=l*v+h*u+c*d-a*f,e[t+2]=c*v+h*f+a*u-l*d,e[t+3]=h*v-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),v=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*v,this._y=c*f*d-u*h*v,this._z=c*h*v+u*f*d,this._w=c*h*d-u*f*v;break;case"YXZ":this._x=u*h*d+c*f*v,this._y=c*f*d-u*h*v,this._z=c*h*v-u*f*d,this._w=c*h*d+u*f*v;break;case"ZXY":this._x=u*h*d-c*f*v,this._y=c*f*d+u*h*v,this._z=c*h*v+u*f*d,this._w=c*h*d-u*f*v;break;case"ZYX":this._x=u*h*d-c*f*v,this._y=c*f*d+u*h*v,this._z=c*h*v-u*f*d,this._w=c*h*d+u*f*v;break;case"YZX":this._x=u*h*d+c*f*v,this._y=c*f*d+u*h*v,this._z=c*h*v-u*f*d,this._w=c*h*d-u*f*v;break;case"XZY":this._x=u*h*d-c*f*v,this._y=c*f*d-u*h*v,this._z=c*h*v+u*f*d,this._w=c*h*d+u*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Du.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Du.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ic.copy(this).projectOnVector(e),this.sub(Ic)}reflect(e){return this.sub(Ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ic=new H,Du=new zn,ct=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],v=n[8],b=i[0],g=i[3],p=i[6],m=i[1],x=i[4],y=i[7],E=i[2],R=i[5],k=i[8];return r[0]=o*b+a*m+l*E,r[3]=o*g+a*x+l*R,r[6]=o*p+a*y+l*k,r[1]=c*b+h*m+d*E,r[4]=c*g+h*x+d*R,r[7]=c*p+h*y+d*k,r[2]=u*b+f*m+v*E,r[5]=u*g+f*x+v*R,r[8]=u*p+f*y+v*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,v=t*d+n*u+i*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/v;return e[0]=d*b,e[1]=(i*c-h*n)*b,e[2]=(a*n-i*o)*b,e[3]=u*b,e[4]=(h*t-i*l)*b,e[5]=(i*r-a*t)*b,e[6]=f*b,e[7]=(n*l-c*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pc=new ct;function Ah(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function oo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Yd(){let s=oo("canvas");return s.style.display="block",s}var ku={};function ir(s){s in ku||(ku[s]=!0,console.warn(s))}function $d(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Fu=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uu=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dp(){let s={enabled:!0,workingColorSpace:fs,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Rt&&(i.r=Ti(i.r),i.g=Ti(i.g),i.b=Ti(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Rt&&(i.r=Qs(i.r),i.g=Qs(i.g),i.b=Qs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Li?so:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ir("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ir("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[fs]:{primaries:e,whitePoint:n,transfer:so,toXYZ:Fu,fromXYZ:Uu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:Fu,fromXYZ:Uu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),s}var Mt=Dp();function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Qs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Us,Da=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Us===void 0&&(Us=oo("canvas")),Us.width=e.width,Us.height=e.height;let i=Us.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=oo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},kp=0,sr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Lc(i[o].image)):r.push(Lc(i[o]))}else r=Lc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Lc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Da.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Fp=0,Dc=new H,Tn=class s extends Ci{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Zi,i=Zi,r=jn,o=is,a=Vn,l=ti,c=s.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=Ei(),this.name="",this.source=new sr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dc).x}get height(){return this.source.getSize(Dc).y}get depth(){return this.source.getSize(Dc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ds:e.x=e.x-Math.floor(e.x);break;case Zi:e.x=e.x<0?0:1;break;case Ca:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ds:e.y=e.y-Math.floor(e.y);break;case Zi:e.y=e.y<0?0:1;break;case Ca:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=gh;Tn.DEFAULT_ANISOTROPY=1;var Tt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],v=l[9],b=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-b)<.01&&Math.abs(v-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+b)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(f+1)/2,E=(p+1)/2,R=(h+u)/4,k=(d+b)/4,D=(v+g)/4;return x>y&&x>E?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=R/n,r=k/n):y>E?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=R/i,r=D/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=k/r,i=D/r),this.set(n,i,r,t),this}let m=Math.sqrt((g-v)*(g-v)+(d-b)*(d-b)+(u-h)*(u-h));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(d-b)/m,this.z=(u-h)/m,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this.w=vt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this.w=vt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ka=class extends Ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new Tn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new sr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},li=class extends ka{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ao=class extends Tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fa=class extends Tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ci=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(r,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ta.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ta.copy(n.boundingBox)),ta.applyMatrix4(e.matrixWorld),this.union(ta)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wr),na.subVectors(this.max,Wr),Ns.subVectors(e.a,Wr),Os.subVectors(e.b,Wr),Bs.subVectors(e.c,Wr),Wi.subVectors(Os,Ns),Xi.subVectors(Bs,Os),as.subVectors(Ns,Bs);let t=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-as.z,as.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,as.z,0,-as.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-as.y,as.x,0];return!kc(t,Ns,Os,Bs,na)||(t=[1,0,0,0,1,0,0,0,1],!kc(t,Ns,Os,Bs,na))?!1:(ia.crossVectors(Wi,Xi),t=[ia.x,ia.y,ia.z],kc(t,Ns,Os,Bs,na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},yi=[new H,new H,new H,new H,new H,new H,new H,new H],Yn=new H,ta=new ci,Ns=new H,Os=new H,Bs=new H,Wi=new H,Xi=new H,as=new H,Wr=new H,na=new H,ia=new H,ls=new H;function kc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ls.fromArray(s,r);let a=i.x*Math.abs(ls.x)+i.y*Math.abs(ls.y)+i.z*Math.abs(ls.z),l=e.dot(ls),c=t.dot(ls),h=n.dot(ls);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Up=new ci,Xr=new H,Fc=new H,ji=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Up.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);let t=Xr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Xr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(Fc)),this.expandByPoint(Xr.copy(e.center).sub(Fc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},_i=new H,Uc=new H,sa=new H,qi=new H,Nc=new H,ra=new H,Oc=new H,Ua=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Uc.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(Uc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(sa),a=qi.dot(this.direction),l=-qi.dot(sa),c=qi.lengthSq(),h=Math.abs(1-o*o),d,u,f,v;if(h>0)if(d=o*l-a,u=o*a-l,v=r*h,d>=0)if(u>=-v)if(u<=v){let b=1/h;d*=b,u*=b,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-v?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=v?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Uc).addScaledVector(sa,u),f}intersectSphere(e,t){_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),i=_i.dot(_i)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,i,r){Nc.subVectors(t,e),ra.subVectors(n,e),Oc.crossVectors(Nc,ra);let o=this.direction.dot(Oc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qi.subVectors(this.origin,e);let l=a*this.direction.dot(ra.crossVectors(qi,ra));if(l<0)return null;let c=a*this.direction.dot(Nc.cross(qi));if(c<0||l+c>o)return null;let h=-a*qi.dot(Oc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},St=class s{constructor(e,t,n,i,r,o,a,l,c,h,d,u,f,v,b,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,d,u,f,v,b,g)}set(e,t,n,i,r,o,a,l,c,h,d,u,f,v,b,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=v,p[11]=b,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),o=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,v=a*h,b=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+v*c,t[5]=u-b*c,t[9]=-a*l,t[2]=b-u*c,t[6]=v+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,v=c*h,b=c*d;t[0]=u+b*a,t[4]=v*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-v,t[6]=b+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,v=c*h,b=c*d;t[0]=u-b*a,t[4]=-o*d,t[8]=v+f*a,t[1]=f+v*a,t[5]=o*h,t[9]=b-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,v=a*h,b=a*d;t[0]=l*h,t[4]=v*c-f,t[8]=u*c+b,t[1]=l*d,t[5]=b*c+u,t[9]=f*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,v=a*l,b=a*c;t[0]=l*h,t[4]=b-u*d,t[8]=v*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+v,t[10]=u-b*d}else if(e.order==="XZY"){let u=o*l,f=o*c,v=a*l,b=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+b,t[5]=o*h,t[9]=f*d-v,t[2]=v*d-f,t[6]=a*h,t[10]=b*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Np,e,Op)}lookAt(e,t,n){let i=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Yi.crossVectors(n,kn),Yi.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Yi.crossVectors(n,kn)),Yi.normalize(),oa.crossVectors(kn,Yi),i[0]=Yi.x,i[4]=oa.x,i[8]=kn.x,i[1]=Yi.y,i[5]=oa.y,i[9]=kn.y,i[2]=Yi.z,i[6]=oa.z,i[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],v=n[2],b=n[6],g=n[10],p=n[14],m=n[3],x=n[7],y=n[11],E=n[15],R=i[0],k=i[4],D=i[8],M=i[12],S=i[1],I=i[5],O=i[9],U=i[13],G=i[2],q=i[6],J=i[10],ne=i[14],$=i[3],ce=i[7],fe=i[11],Se=i[15];return r[0]=o*R+a*S+l*G+c*$,r[4]=o*k+a*I+l*q+c*ce,r[8]=o*D+a*O+l*J+c*fe,r[12]=o*M+a*U+l*ne+c*Se,r[1]=h*R+d*S+u*G+f*$,r[5]=h*k+d*I+u*q+f*ce,r[9]=h*D+d*O+u*J+f*fe,r[13]=h*M+d*U+u*ne+f*Se,r[2]=v*R+b*S+g*G+p*$,r[6]=v*k+b*I+g*q+p*ce,r[10]=v*D+b*O+g*J+p*fe,r[14]=v*M+b*U+g*ne+p*Se,r[3]=m*R+x*S+y*G+E*$,r[7]=m*k+x*I+y*q+E*ce,r[11]=m*D+x*O+y*J+E*fe,r[15]=m*M+x*U+y*ne+E*Se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],v=e[3],b=e[7],g=e[11],p=e[15];return v*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+b*(+t*l*f-t*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+g*(+t*c*d-t*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*d+t*a*u+i*o*d-n*o*u+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],v=e[12],b=e[13],g=e[14],p=e[15],m=d*g*c-b*u*c+b*l*f-a*g*f-d*l*p+a*u*p,x=v*u*c-h*g*c-v*l*f+o*g*f+h*l*p-o*u*p,y=h*b*c-v*d*c+v*a*f-o*b*f-h*a*p+o*d*p,E=v*d*l-h*b*l-v*a*u+o*b*u+h*a*g-o*d*g,R=t*m+n*x+i*y+r*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/R;return e[0]=m*k,e[1]=(b*u*r-d*g*r-b*i*f+n*g*f+d*i*p-n*u*p)*k,e[2]=(a*g*r-b*l*r+b*i*c-n*g*c-a*i*p+n*l*p)*k,e[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*k,e[4]=x*k,e[5]=(h*g*r-v*u*r+v*i*f-t*g*f-h*i*p+t*u*p)*k,e[6]=(v*l*r-o*g*r-v*i*c+t*g*c+o*i*p-t*l*p)*k,e[7]=(o*u*r-h*l*r+h*i*c-t*u*c-o*i*f+t*l*f)*k,e[8]=y*k,e[9]=(v*d*r-h*b*r-v*n*f+t*b*f+h*n*p-t*d*p)*k,e[10]=(o*b*r-v*a*r+v*n*c-t*b*c-o*n*p+t*a*p)*k,e[11]=(h*a*r-o*d*r-h*n*c+t*d*c+o*n*f-t*a*f)*k,e[12]=E*k,e[13]=(h*b*i-v*d*i+v*n*u-t*b*u-h*n*g+t*d*g)*k,e[14]=(v*a*i-o*b*i-v*n*l+t*b*l+o*n*g-t*a*g)*k,e[15]=(o*d*i-h*a*i+h*n*l-t*d*l-o*n*u+t*a*u)*k,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,v=r*d,b=o*h,g=o*d,p=a*d,m=l*c,x=l*h,y=l*d,E=n.x,R=n.y,k=n.z;return i[0]=(1-(b+p))*E,i[1]=(f+y)*E,i[2]=(v-x)*E,i[3]=0,i[4]=(f-y)*R,i[5]=(1-(u+p))*R,i[6]=(g+m)*R,i[7]=0,i[8]=(v+x)*k,i[9]=(g-m)*k,i[10]=(1-(u+b))*k,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=zs.set(i[0],i[1],i[2]).length(),o=zs.set(i[4],i[5],i[6]).length(),a=zs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],$n.copy(this);let c=1/r,h=1/o,d=1/a;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=h,$n.elements[5]*=h,$n.elements[6]*=h,$n.elements[8]*=d,$n.elements[9]*=d,$n.elements[10]*=d,t.setFromRotationMatrix($n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Jn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),v,b;if(l)v=r/(o-r),b=o*r/(o-r);else if(a===Jn)v=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===ro)v=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Jn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),v,b;if(l)v=1/(o-r),b=o/(o-r);else if(a===Jn)v=-2/(o-r),b=-(o+r)/(o-r);else if(a===ro)v=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},zs=new H,$n=new St,Np=new H(0,0,0),Op=new H(1,1,1),Yi=new H,oa=new H,kn=new H,Nu=new St,Ou=new zn,Hn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ou.setFromEuler(this),this.setFromQuaternion(Ou,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var lo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bp=0,Bu=new H,Hs=new zn,bi=new St,aa=new H,qr=new H,zp=new H,Hp=new zn,zu=new H(1,0,0),Hu=new H(0,1,0),Vu=new H(0,0,1),Gu={type:"added"},Vp={type:"removed"},Vs={type:"childadded",child:null},Bc={type:"childremoved",child:null},tn=class s extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new H,t=new Hn,n=new zn,i=new H(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new St},normalMatrix:{value:new ct}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(e,t){return Hs.setFromAxisAngle(e,t),this.quaternion.premultiply(Hs),this}rotateX(e){return this.rotateOnAxis(zu,e)}rotateY(e){return this.rotateOnAxis(Hu,e)}rotateZ(e){return this.rotateOnAxis(Vu,e)}translateOnAxis(e,t){return Bu.copy(e).applyQuaternion(this.quaternion),this.position.add(Bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zu,e)}translateY(e){return this.translateOnAxis(Hu,e)}translateZ(e){return this.translateOnAxis(Vu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?aa.copy(e):aa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(qr,aa,this.up):bi.lookAt(aa,qr,this.up),this.quaternion.setFromRotationMatrix(bi),i&&(bi.extractRotation(i.matrixWorld),Hs.setFromRotationMatrix(bi),this.quaternion.premultiply(Hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vp),Bc.child=e,this.dispatchEvent(Bc),Bc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gu),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,e,zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,Hp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),v=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};tn.DEFAULT_UP=new H(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kn=new H,Mi=new H,zc=new H,Si=new H,Gs=new H,Ws=new H,Wu=new H,Hc=new H,Vc=new H,Gc=new H,Wc=new Tt,Xc=new Tt,qc=new Tt,wi=class s{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Kn.subVectors(e,t),i.cross(Kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Kn.subVectors(i,t),Mi.subVectors(n,t),zc.subVectors(e,t);let o=Kn.dot(Kn),a=Kn.dot(Mi),l=Kn.dot(zc),c=Mi.dot(Mi),h=Mi.dot(zc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,v=(o*h-a*l)*u;return r.set(1-f-v,v,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Wc.setScalar(0),Xc.setScalar(0),qc.setScalar(0),Wc.fromBufferAttribute(e,t),Xc.fromBufferAttribute(e,n),qc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Wc,r.x),o.addScaledVector(Xc,r.y),o.addScaledVector(qc,r.z),o}static isFrontFacing(e,t,n,i){return Kn.subVectors(n,t),Mi.subVectors(e,t),Kn.cross(Mi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Kn.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Gs.subVectors(i,n),Ws.subVectors(r,n),Hc.subVectors(e,n);let l=Gs.dot(Hc),c=Ws.dot(Hc);if(l<=0&&c<=0)return t.copy(n);Vc.subVectors(e,i);let h=Gs.dot(Vc),d=Ws.dot(Vc);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Gs,o);Gc.subVectors(e,r);let f=Gs.dot(Gc),v=Ws.dot(Gc);if(v>=0&&f<=v)return t.copy(r);let b=f*c-l*v;if(b<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(n).addScaledVector(Ws,a);let g=h*v-f*d;if(g<=0&&d-h>=0&&f-v>=0)return Wu.subVectors(r,i),a=(d-h)/(d-h+(f-v)),t.copy(i).addScaledVector(Wu,a);let p=1/(g+b+u);return o=b*p,a=u*p,t.copy(n).addScaledVector(Gs,o).addScaledVector(Ws,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},la={h:0,s:0,l:0};function Yc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var st=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=Lp(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Yc(o,r,e+1/3),this.g=Yc(o,r,e),this.b=Yc(o,r,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=Vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){let n=Kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return Mt.workingToColorSpace(xn.copy(this),e),Math.round(vt(xn.r*255,0,255))*65536+Math.round(vt(xn.g*255,0,255))*256+Math.round(vt(xn.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(xn.copy(this),t);let n=xn.r,i=xn.g,r=xn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Vt){Mt.workingToColorSpace(xn.copy(this),e);let t=xn.r,n=xn.g,i=xn.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(la);let n=Cc($i.h,la.h,t),i=Cc($i.s,la.s,t),r=Cc($i.l,la.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xn=new st;st.NAMES=Kd;var Gp=0,hi=class extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Ei(),this.name="",this.type="Material",this.blending=Ri,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ra,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nr,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==Ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==Ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nr&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Kt=class extends hi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Qt=new H,ca=new Ce,Wp=0,En=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pa,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix3(e),this.setXY(t,ca.x,ca.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pa&&(e.usage=this.usage),e}};var co=class extends En{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ho=class extends En{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var mt=class extends En{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xp=0,Bn=new St,$c=new tn,Xs=new H,Fn=new ci,Yr=new ci,cn=new H,Zt=class s extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ah(e)?ho:co)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,t,n){return Bn.makeTranslation(e,t,n),this.applyMatrix4(Bn),this}scale(e,t,n){return Bn.makeScale(e,t,n),this.applyMatrix4(Bn),this}lookAt(e){return $c.lookAt(e),$c.updateMatrix(),this.applyMatrix4($c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xs).negate(),this.translate(Xs.x,Xs.y,Xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Fn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){let n=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Yr.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Fn.min,Yr.min),Fn.expandByPoint(cn),cn.addVectors(Fn.max,Yr.max),Fn.expandByPoint(cn)):(Fn.expandByPoint(Yr.min),Fn.expandByPoint(Yr.max))}Fn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)cn.fromBufferAttribute(a,c),l&&(Xs.fromBufferAttribute(e,c),cn.add(Xs)),i=Math.max(i,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new H,l[D]=new H;let c=new H,h=new H,d=new H,u=new Ce,f=new Ce,v=new Ce,b=new H,g=new H;function p(D,M,S){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,S),u.fromBufferAttribute(r,D),f.fromBufferAttribute(r,M),v.fromBufferAttribute(r,S),h.sub(c),d.sub(c),f.sub(u),v.sub(u);let I=1/(f.x*v.y-v.x*f.y);isFinite(I)&&(b.copy(h).multiplyScalar(v.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-v.x).multiplyScalar(I),a[D].add(b),a[M].add(b),a[S].add(b),l[D].add(g),l[M].add(g),l[S].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let D=0,M=m.length;D<M;++D){let S=m[D],I=S.start,O=S.count;for(let U=I,G=I+O;U<G;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let x=new H,y=new H,E=new H,R=new H;function k(D){E.fromBufferAttribute(i,D),R.copy(E);let M=a[D];x.copy(M),x.sub(E.multiplyScalar(E.dot(M))).normalize(),y.crossVectors(R,M);let I=y.dot(l[D])<0?-1:1;o.setXYZW(D,x.x,x.y,x.z,I)}for(let D=0,M=m.length;D<M;++D){let S=m[D],I=S.start,O=S.count;for(let U=I,G=I+O;U<G;U+=3)k(e.getX(U+0)),k(e.getX(U+1)),k(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new En(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new H,r=new H,o=new H,a=new H,l=new H,c=new H,h=new H,d=new H;if(e)for(let u=0,f=e.count;u<f;u+=3){let v=e.getX(u+0),b=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,v),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,v=0;for(let b=0,g=l.length;b<g;b++){a.isInterleavedBufferAttribute?f=l[b]*a.data.stride+a.offset:f=l[b]*h;for(let p=0;p<h;p++)u[v++]=c[f++]}return new En(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xu=new St,cs=new Ua,ha=new ji,qu=new H,ua=new H,da=new H,fa=new H,Kc=new H,pa=new H,Yu=new H,ma=new H,Qe=class extends tn{constructor(e=new Zt,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){pa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Kc.fromBufferAttribute(d,e),o?pa.addScaledVector(Kc,h):pa.addScaledVector(Kc.sub(t),h))}t.add(pa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(r),cs.copy(e.ray).recast(e.near),!(ha.containsPoint(cs.origin)===!1&&(cs.intersectSphere(ha,qu)===null||cs.origin.distanceToSquared(qu)>(e.far-e.near)**2))&&(Xu.copy(r).invert(),cs.copy(e.ray).applyMatrix4(Xu),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,b=u.length;v<b;v++){let g=u[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let R=a.getX(y),k=a.getX(y+1),D=a.getX(y+2);i=ga(this,p,e,n,c,h,d,R,k,D),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),b=Math.min(a.count,f.start+f.count);for(let g=v,p=b;g<p;g+=3){let m=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=ga(this,o,e,n,c,h,d,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,b=u.length;v<b;v++){let g=u[v],p=o[g.materialIndex],m=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=m,E=x;y<E;y+=3){let R=y,k=y+1,D=y+2;i=ga(this,p,e,n,c,h,d,R,k,D),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let v=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let g=v,p=b;g<p;g+=3){let m=g,x=g+1,y=g+2;i=ga(this,o,e,n,c,h,d,m,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function qp(s,e,t,n,i,r,o,a){let l;if(e.side===mn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Ai,a),l===null)return null;ma.copy(a),ma.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ma);return c<t.near||c>t.far?null:{distance:c,point:ma.clone(),object:s}}function ga(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,ua),s.getVertexPosition(l,da),s.getVertexPosition(c,fa);let h=qp(s,e,t,n,ua,da,fa,Yu);if(h){let d=new H;wi.getBarycoord(Yu,ua,da,fa,d),i&&(h.uv=wi.getInterpolatedAttribute(i,a,l,c,d,new Ce)),r&&(h.uv1=wi.getInterpolatedAttribute(r,a,l,c,d,new Ce)),o&&(h.normal=wi.getInterpolatedAttribute(o,a,l,c,d,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new H,materialIndex:0};wi.getNormal(ua,da,fa,u.normal),h.face=u,h.barycoord=d}return h}var zt=class s extends Zt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;v("z","y","x",-1,-1,n,t,e,o,r,0),v("z","y","x",1,-1,n,t,-e,o,r,1),v("x","z","y",1,1,e,n,t,i,o,2),v("x","z","y",1,-1,e,n,-t,i,o,3),v("x","y","z",1,-1,e,t,n,i,r,4),v("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(d,2));function v(b,g,p,m,x,y,E,R,k,D,M){let S=y/k,I=E/D,O=y/2,U=E/2,G=R/2,q=k+1,J=D+1,ne=0,$=0,ce=new H;for(let fe=0;fe<J;fe++){let Se=fe*I-U;for(let qe=0;qe<q;qe++){let Ne=qe*S-O;ce[b]=Ne*m,ce[g]=Se*x,ce[p]=G,c.push(ce.x,ce.y,ce.z),ce[b]=0,ce[g]=0,ce[p]=R>0?1:-1,h.push(ce.x,ce.y,ce.z),d.push(qe/k),d.push(1-fe/D),ne+=1}}for(let fe=0;fe<D;fe++)for(let Se=0;Se<k;Se++){let qe=u+Se+q*fe,Ne=u+Se+q*(fe+1),$e=u+(Se+1)+q*(fe+1),tt=u+(Se+1)+q*fe;l.push(qe,Ne,tt),l.push(Ne,$e,tt),$+=6}a.addGroup(f,$,M),f+=$,u+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function xs(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function _n(s){let e={};for(let t=0;t<s.length;t++){let n=xs(s[t]);for(let i in n)e[i]=n[i]}return e}function Yp(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Rh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}var Zd={clone:xs,merge:_n},$p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends hi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$p,this.fragmentShader=Kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xs(e.uniforms),this.uniformsGroups=Yp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},uo=class extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ki=new H,$u=new Ce,Ku=new Ce,hn=class extends uo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=La*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return La*2*Math.atan(Math.tan(Rc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ki.x,Ki.y).multiplyScalar(-e/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ki.x,Ki.y).multiplyScalar(-e/Ki.z)}getViewSize(e,t){return this.getViewBounds(e,$u,Ku),t.subVectors(Ku,$u)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qs=-90,Ys=1,Na=class extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new hn(qs,Ys,e,t);i.layers=this.layers,this.add(i);let r=new hn(qs,Ys,e,t);r.layers=this.layers,this.add(r);let o=new hn(qs,Ys,e,t);o.layers=this.layers,this.add(o);let a=new hn(qs,Ys,e,t);a.layers=this.layers,this.add(a);let l=new hn(qs,Ys,e,t);l.layers=this.layers,this.add(l);let c=new hn(qs,Ys,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},fo=class extends Tn{constructor(e=[],t=gs,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Oa=class extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new fo(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new zt(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:Pi});r.uniforms.tEquirect.value=t;let o=new Qe(i,r),a=t.minFilter;return t.minFilter===is&&(t.minFilter=jn),new Na(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Yt=class extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zp={type:"move"},rr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let b of e.hand.values()){let g=t.getJointPose(b,n),p=this._getHandJoint(c,b);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,v=.005;c.inputState.pinching&&u>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zp)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var po=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new st(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ui=class extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ba=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pa,this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},wn=new H,mo=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ai(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),i=Ct(i,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new En(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},or=class extends hi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$s,$r=new H,Ks=new H,Zs=new H,Js=new Ce,Kr=new Ce,Jd=new St,va=new H,Zr=new H,xa=new H,Zu=new Ce,Zc=new Ce,Ju=new Ce,go=class extends tn{constructor(e=new or){if(super(),this.isSprite=!0,this.type="Sprite",$s===void 0){$s=new Zt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ba(t,5);$s.setIndex([0,1,2,0,2,3]),$s.setAttribute("position",new mo(n,3,0,!1)),$s.setAttribute("uv",new mo(n,2,3,!1))}this.geometry=$s,this.material=e,this.center=new Ce(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ks.setFromMatrixScale(this.matrixWorld),Jd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ks.multiplyScalar(-Zs.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;ya(va.set(-.5,-.5,0),Zs,o,Ks,i,r),ya(Zr.set(.5,-.5,0),Zs,o,Ks,i,r),ya(xa.set(.5,.5,0),Zs,o,Ks,i,r),Zu.set(0,0),Zc.set(1,0),Ju.set(1,1);let a=e.ray.intersectTriangle(va,Zr,xa,!1,$r);if(a===null&&(ya(Zr.set(-.5,.5,0),Zs,o,Ks,i,r),Zc.set(0,1),a=e.ray.intersectTriangle(va,xa,Zr,!1,$r),a===null))return;let l=e.ray.origin.distanceTo($r);l<e.near||l>e.far||t.push({distance:l,point:$r.clone(),uv:wi.getInterpolation($r,va,Zr,xa,Zu,Zc,Ju,new Ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ya(s,e,t,n,i,r){Js.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Kr.x=r*Js.x-i*Js.y,Kr.y=i*Js.x+r*Js.y):Kr.copy(Js),s.copy(e),s.x+=Kr.x,s.y+=Kr.y,s.applyMatrix4(Jd)}var za=class extends Tn{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Pn,h=Pn,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ii=class extends En{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},js=new St,ju=new St,_a=[],Qu=new ci,Jp=new St,Jr=new Qe,jr=new ji,Ln=class extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ii(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ci),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,js),Qu.copy(e.boundingBox).applyMatrix4(js),this.boundingBox.union(Qu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ji),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,js),jr.copy(e.boundingSphere).applyMatrix4(js),this.boundingSphere.union(jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Jr.geometry=this.geometry,Jr.material=this.material,Jr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jr.copy(this.boundingSphere),jr.applyMatrix4(n),e.ray.intersectsSphere(jr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,js),ju.multiplyMatrices(n,js),Jr.matrixWorld=ju,Jr.raycast(e,_a);for(let o=0,a=_a.length;o<a;o++){let l=_a[o];l.instanceId=r,l.object=this,t.push(l)}_a.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ii(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new za(new Float32Array(i*this.count),i,this.count,Ml,ni));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Jc=new H,jp=new H,Qp=new ct,oi=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Jc.subVectors(n,t).cross(jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Jc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qp.getNormalMatrix(e),i=this.coplanarPoint(Jc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},hs=new ji,em=new Ce(.5,.5),ba=new H,ar=class{constructor(e=new oi,t=new oi,n=new oi,i=new oi,r=new oi,o=new oi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],v=r[8],b=r[9],g=r[10],p=r[11],m=r[12],x=r[13],y=r[14],E=r[15];if(i[0].setComponents(c-o,f-h,p-v,E-m).normalize(),i[1].setComponents(c+o,f+h,p+v,E+m).normalize(),i[2].setComponents(c+a,f+d,p+b,E+x).normalize(),i[3].setComponents(c-a,f-d,p-b,E-x).normalize(),n)i[4].setComponents(l,u,g,y).normalize(),i[5].setComponents(c-l,f-u,p-g,E-y).normalize();else if(i[4].setComponents(c-l,f-u,p-g,E-y).normalize(),t===Jn)i[5].setComponents(c+l,f+u,p+g,E+y).normalize();else if(t===ro)i[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(e){hs.center.set(0,0,0);let t=em.distanceTo(e.center);return hs.radius=.7071067811865476+t,hs.applyMatrix4(e.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ba.x=i.normal.x>0?e.max.x:e.min.x,ba.y=i.normal.y>0?e.max.y:e.min.y,ba.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vo=class extends Tn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},xo=class extends Tn{constructor(e,t,n=ss,i,r,o,a=Pn,l=Pn,c,h=tr,d=1){if(h!==tr&&h!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},yo=class extends Tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},lr=class s extends Zt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,v=n*2+r,b=i+1,g=new H,p=new H;for(let m=0;m<=v;m++){let x=0,y=0,E=0,R=0;if(m<=n){let M=m/n,S=M*Math.PI/2;y=-h-e*Math.cos(S),E=e*Math.sin(S),R=-e*Math.cos(S),x=M*d}else if(m<=n+r){let M=(m-n)/r;y=-h+M*t,E=e,R=0,x=d+M*u}else{let M=(m-n-r)/n,S=M*Math.PI/2;y=h+e*Math.sin(S),E=e*Math.cos(S),R=e*Math.sin(S),x=d+u+M*d}let k=Math.max(0,Math.min(1,x/f)),D=0;m===0?D=.5/i:m===v&&(D=-.5/i);for(let M=0;M<=i;M++){let S=M/i,I=S*Math.PI*2,O=Math.sin(I),U=Math.cos(I);p.x=-E*U,p.y=y,p.z=E*O,a.push(p.x,p.y,p.z),g.set(-E*U,R,E*O),g.normalize(),l.push(g.x,g.y,g.z),c.push(S+D,k)}if(m>0){let M=(m-1)*b;for(let S=0;S<i;S++){let I=M+S,O=M+S+1,U=m*b+S,G=m*b+S+1;o.push(I,O,U),o.push(O,G,U)}}}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var It=class s extends Zt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],v=0,b=[],g=n/2,p=0;m(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(f,2));function m(){let y=new H,E=new H,R=0,k=(t-e)/n;for(let D=0;D<=r;D++){let M=[],S=D/r,I=S*(t-e)+e;for(let O=0;O<=i;O++){let U=O/i,G=U*l+a,q=Math.sin(G),J=Math.cos(G);E.x=I*q,E.y=-S*n+g,E.z=I*J,d.push(E.x,E.y,E.z),y.set(q,k,J).normalize(),u.push(y.x,y.y,y.z),f.push(U,1-S),M.push(v++)}b.push(M)}for(let D=0;D<i;D++)for(let M=0;M<r;M++){let S=b[M][D],I=b[M+1][D],O=b[M+1][D+1],U=b[M][D+1];(e>0||M!==0)&&(h.push(S,I,U),R+=3),(t>0||M!==r-1)&&(h.push(I,O,U),R+=3)}c.addGroup(p,R,0),p+=R}function x(y){let E=v,R=new Ce,k=new H,D=0,M=y===!0?e:t,S=y===!0?1:-1;for(let O=1;O<=i;O++)d.push(0,g*S,0),u.push(0,S,0),f.push(.5,.5),v++;let I=v;for(let O=0;O<=i;O++){let G=O/i*l+a,q=Math.cos(G),J=Math.sin(G);k.x=M*J,k.y=g*S,k.z=M*q,d.push(k.x,k.y,k.z),u.push(0,S,0),R.x=q*.5+.5,R.y=J*.5*S+.5,f.push(R.x,R.y),v++}for(let O=0;O<i;O++){let U=E+O,G=I+O;y===!0?h.push(G,G+1,U):h.push(G+1,G,U),D+=3}c.addGroup(p,D,y===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qn=class s extends It{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ha=class s extends Zt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new mt(r,3)),this.setAttribute("normal",new mt(r.slice(),3)),this.setAttribute("uv",new mt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(m){let x=new H,y=new H,E=new H;for(let R=0;R<t.length;R+=3)f(t[R+0],x),f(t[R+1],y),f(t[R+2],E),l(x,y,E,m)}function l(m,x,y,E){let R=E+1,k=[];for(let D=0;D<=R;D++){k[D]=[];let M=m.clone().lerp(y,D/R),S=x.clone().lerp(y,D/R),I=R-D;for(let O=0;O<=I;O++)O===0&&D===R?k[D][O]=M:k[D][O]=M.clone().lerp(S,O/I)}for(let D=0;D<R;D++)for(let M=0;M<2*(R-D)-1;M++){let S=Math.floor(M/2);M%2===0?(u(k[D][S+1]),u(k[D+1][S]),u(k[D][S])):(u(k[D][S+1]),u(k[D+1][S+1]),u(k[D+1][S]))}}function c(m){let x=new H;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(m),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){let m=new H;for(let x=0;x<r.length;x+=3){m.x=r[x+0],m.y=r[x+1],m.z=r[x+2];let y=g(m)/2/Math.PI+.5,E=p(m)/Math.PI+.5;o.push(y,1-E)}v(),d()}function d(){for(let m=0;m<o.length;m+=6){let x=o[m+0],y=o[m+2],E=o[m+4],R=Math.max(x,y,E),k=Math.min(x,y,E);R>.9&&k<.1&&(x<.2&&(o[m+0]+=1),y<.2&&(o[m+2]+=1),E<.2&&(o[m+4]+=1))}}function u(m){r.push(m.x,m.y,m.z)}function f(m,x){let y=m*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function v(){let m=new H,x=new H,y=new H,E=new H,R=new Ce,k=new Ce,D=new Ce;for(let M=0,S=0;M<r.length;M+=9,S+=6){m.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),R.set(o[S+0],o[S+1]),k.set(o[S+2],o[S+3]),D.set(o[S+4],o[S+5]),E.copy(m).add(x).add(y).divideScalar(3);let I=g(E);b(R,S+0,m,I),b(k,S+2,x,I),b(D,S+4,y,I)}}function b(m,x,y,E){E<0&&m.x===1&&(o[x]=m.x-1),y.x===0&&y.z===0&&(o[x]=E/2/Math.PI+.5)}function g(m){return Math.atan2(m.z,-m.x)}function p(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var Un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Ce:new H);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new H,i=[],r=[],o=[],a=new H,l=new St;for(let f=0;f<=e;f++){let v=f/e;i[f]=this.getTangentAt(v,new H)}r[0]=new H,o[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(vt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,v))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(vt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(i[v],f*v)),o[v].crossVectors(i[v],r[v])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},cr=class extends Un{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ce){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Va=class extends cr{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Ch(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Ma=new H,jc=new Ch,Qc=new Ch,eh=new Ch,Ga=class extends Un{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new H){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Ma.subVectors(i[0],i[1]).add(i[0]),c=Ma);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Ma.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ma),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,v=Math.pow(c.distanceToSquared(d),f),b=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);b<1e-4&&(b=1),v<1e-4&&(v=b),g<1e-4&&(g=b),jc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,v,b,g),Qc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,v,b,g),eh.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,v,b,g)}else this.curveType==="catmullrom"&&(jc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Qc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),eh.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(jc.calc(l),Qc.calc(l),eh.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new H().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ed(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function tm(s,e){let t=1-s;return t*t*e}function nm(s,e){return 2*(1-s)*s*e}function im(s,e){return s*s*e}function to(s,e,t,n){return tm(s,e)+nm(s,t)+im(s,n)}function sm(s,e){let t=1-s;return t*t*t*e}function rm(s,e){let t=1-s;return 3*t*t*s*e}function om(s,e){return 3*(1-s)*s*s*e}function am(s,e){return s*s*s*e}function no(s,e,t,n,i){return sm(s,e)+rm(s,t)+om(s,n)+am(s,i)}var _o=class extends Un{constructor(e=new Ce,t=new Ce,n=new Ce,i=new Ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Ce){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(no(e,i.x,r.x,o.x,a.x),no(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Wa=class extends Un{constructor(e=new H,t=new H,n=new H,i=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new H){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(no(e,i.x,r.x,o.x,a.x),no(e,i.y,r.y,o.y,a.y),no(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},bo=class extends Un{constructor(e=new Ce,t=new Ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends Un{constructor(e=new H,t=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Mo=class extends Un{constructor(e=new Ce,t=new Ce,n=new Ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ce){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(to(e,i.x,r.x,o.x),to(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qa=class extends Un{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(to(e,i.x,r.x,o.x),to(e,i.y,r.y,o.y),to(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},So=class extends Un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ce){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(ed(a,l.x,c.x,h.x,d.x),ed(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Ce().fromArray(i))}return this}},td=Object.freeze({__proto__:null,ArcCurve:Va,CatmullRomCurve3:Ga,CubicBezierCurve:_o,CubicBezierCurve3:Wa,EllipseCurve:cr,LineCurve:bo,LineCurve3:Xa,QuadraticBezierCurve:Mo,QuadraticBezierCurve3:qa,SplineCurve:So}),Ya=class extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new td[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new td[i.type]().fromJSON(i))}return this}},wo=class extends Ya{constructor(e){super(),this.type="Path",this.currentPoint=new Ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new bo(this.currentPoint.clone(),new Ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Mo(this.currentPoint.clone(),new Ce(e,t),new Ce(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new _o(this.currentPoint.clone(),new Ce(e,t),new Ce(n,i),new Ce(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new So(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new cr(e,t,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},hr=class extends wo{constructor(e){super(e),this.uuid=Ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new wo().fromJSON(i))}return this}};function lm(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=jd(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=fm(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,d=-1/0;for(let u=t;u<i;u+=t){let f=s[u],v=s[u+1];f<a&&(a=f),v<l&&(l=v),f>h&&(h=f),v>d&&(d=v)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return Eo(r,o,t,a,l,c,0),o}function jd(s,e,t,n,i){let r;if(i===wm(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=nd(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=nd(o/n|0,s[o],s[o+1],r);return r&&ur(r,r.next)&&(Ao(r),r=r.next),r}function ps(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ur(t,t.next)||qt(t.prev,t,t.next)===0)){if(Ao(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Eo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&xm(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?hm(s,n,i,r):cm(s)){e.push(l.i,s.i,c.i),Ao(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=um(ps(s),e),Eo(s,e,t,n,i,r,2)):o===2&&dm(s,e,t,n,i,r):Eo(ps(s),e,t,n,i,r,1);break}}}function cm(s){let e=s.prev,t=s,n=s.next;if(qt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),v=n.next;for(;v!==e;){if(v.x>=h&&v.x<=u&&v.y>=d&&v.y<=f&&eo(i,a,r,l,o,c,v.x,v.y)&&qt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function hm(s,e,t,n){let i=s.prev,r=s,o=s.next;if(qt(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),v=Math.min(h,d,u),b=Math.max(a,l,c),g=Math.max(h,d,u),p=oh(f,v,e,t,n),m=oh(b,g,e,t,n),x=s.prevZ,y=s.nextZ;for(;x&&x.z>=p&&y&&y.z<=m;){if(x.x>=f&&x.x<=b&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&eo(a,h,l,d,c,u,x.x,x.y)&&qt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=b&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&eo(a,h,l,d,c,u,y.x,y.y)&&qt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=b&&x.y>=v&&x.y<=g&&x!==i&&x!==o&&eo(a,h,l,d,c,u,x.x,x.y)&&qt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=m;){if(y.x>=f&&y.x<=b&&y.y>=v&&y.y<=g&&y!==i&&y!==o&&eo(a,h,l,d,c,u,y.x,y.y)&&qt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function um(s,e){let t=s;do{let n=t.prev,i=t.next.next;!ur(n,i)&&ef(n,t,t.next,i)&&To(n,i)&&To(i,n)&&(e.push(n.i,t.i,i.i),Ao(t),Ao(t.next),t=s=i),t=t.next}while(t!==s);return ps(t)}function dm(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&bm(o,a)){let l=tf(o,a);o=ps(o,o.next),l=ps(l,l.next),Eo(o,e,t,n,i,r,0),Eo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function fm(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=jd(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(_m(c))}i.sort(pm);for(let r=0;r<i.length;r++)t=mm(i[r],t);return t}function pm(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function mm(s,e){let t=gm(s,e);if(!t)return e;let n=tf(t,s);return ps(n,n.next),ps(t,t.next)}function gm(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(ur(s,t))return t;do{if(ur(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Qd(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);To(t,s)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&vm(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function vm(s,e){return qt(s.prev,s,e.prev)<0&&qt(e.next,s,s.next)<0}function xm(s,e,t,n){let i=s;do i.z===0&&(i.z=oh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ym(i)}function ym(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function oh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function _m(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Qd(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function eo(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Qd(s,e,t,n,i,r,o,a)}function bm(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Mm(s,e)&&(To(s,e)&&To(e,s)&&Sm(s,e)&&(qt(s.prev,s,e.prev)||qt(s,e.prev,e))||ur(s,e)&&qt(s.prev,s,s.next)>0&&qt(e.prev,e,e.next)>0)}function qt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ur(s,e){return s.x===e.x&&s.y===e.y}function ef(s,e,t,n){let i=wa(qt(s,e,t)),r=wa(qt(s,e,n)),o=wa(qt(t,n,s)),a=wa(qt(t,n,e));return!!(i!==r&&o!==a||i===0&&Sa(s,t,e)||r===0&&Sa(s,n,e)||o===0&&Sa(t,s,n)||a===0&&Sa(t,e,n))}function Sa(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function wa(s){return s>0?1:s<0?-1:0}function Mm(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&ef(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function To(s,e){return qt(s.prev,s,s.next)<0?qt(s,e,s.next)>=0&&qt(s,s.prev,e)>=0:qt(s,e,s.prev)<0||qt(s,s.next,e)<0}function Sm(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function tf(s,e){let t=ah(s.i,s.x,s.y),n=ah(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function nd(s,e,t,n){let i=ah(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ao(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ah(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wm(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var lh=class{static triangulate(e,t,n=2){return lm(e,t,n)}},er=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];id(e),sd(n,e);let o=e.length;t.forEach(id);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,sd(n,t[l]);let a=lh.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function id(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function sd(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Ro=class s extends Ha{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var yn=class s extends Zt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],v=[],b=[],g=[];for(let p=0;p<h;p++){let m=p*u-o;for(let x=0;x<c;x++){let y=x*d-r;v.push(y,-m,0),b.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let m=0;m<a;m++){let x=m+c*p,y=m+c*(p+1),E=m+1+c*(p+1),R=m+1+c*p;f.push(x,y,R),f.push(y,E,R)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(b,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},di=class s extends Zt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],d=e,u=(t-e)/i,f=new H,v=new Ce;for(let b=0;b<=i;b++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,h.push(v.x,v.y)}d+=u}for(let b=0;b<i;b++){let g=b*(n+1);for(let p=0;p<n;p++){let m=p+g,x=m,y=m+n+1,E=m+n+2,R=m+1;a.push(x,y,R),a.push(y,E,R)}}this.setIndex(a),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Co=class s extends Zt{constructor(e=new hr([new Ce(0,.5),new Ce(-.5,-.5),new Ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new mt(i,3)),this.setAttribute("normal",new mt(r,3)),this.setAttribute("uv",new mt(o,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,v=u.holes;er.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=v.length;g<p;g++){let m=v[g];er.isClockWise(m)===!0&&(v[g]=m.reverse())}let b=er.triangulateShape(f,v);for(let g=0,p=v.length;g<p;g++){let m=v[g];f=f.concat(m)}for(let g=0,p=f.length;g<p;g++){let m=f[g];i.push(m.x,m.y,0),r.push(0,0,1),o.push(m.x,m.y)}for(let g=0,p=b.length;g<p;g++){let m=b[g],x=m[0]+d,y=m[1]+d,E=m[2]+d;n.push(x,y,E),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Em(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Em(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var An=class s extends Zt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new H,u=new H,f=[],v=[],b=[],g=[];for(let p=0;p<=n;p++){let m=[],x=p/n,y=0;p===0&&o===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let R=E/t;d.x=-e*Math.cos(i+R*r)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(i+R*r)*Math.sin(o+x*a),v.push(d.x,d.y,d.z),u.copy(d).normalize(),b.push(u.x,u.y,u.z),g.push(R+y,1-x),m.push(c++)}h.push(m)}for(let p=0;p<n;p++)for(let m=0;m<t;m++){let x=h[p][m+1],y=h[p][m],E=h[p+1][m],R=h[p+1][m+1];(p!==0||o>0)&&f.push(x,y,R),(p!==n-1||l<Math.PI)&&f.push(y,E,R)}this.setIndex(f),this.setAttribute("position",new mt(v,3)),this.setAttribute("normal",new mt(b,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Qi=class s extends Zt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new H,d=new H,u=new H;for(let f=0;f<=n;f++)for(let v=0;v<=i;v++){let b=v/i*r,g=f/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(b),d.y=(e+t*Math.cos(g))*Math.sin(b),d.z=t*Math.sin(g),a.push(d.x,d.y,d.z),h.x=e*Math.cos(b),h.y=e*Math.sin(b),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(v/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let v=1;v<=i;v++){let b=(i+1)*f+v-1,g=(i+1)*(f-1)+v-1,p=(i+1)*(f-1)+v,m=(i+1)*f+v;o.push(b,g,m),o.push(g,p,m)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var es=class extends hi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Jt=class extends hi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$a=class extends hi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ka=class extends hi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ea(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Tm(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var ms=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Za=class extends ms{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ih,endingEnd:ih}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case sh:r=e,a=2*t-n;break;case rh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case sh:o=e,l=2*n-t;break;case rh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,v=(n-t)/(i-t),b=v*v,g=b*v,p=-u*g+2*u*b-u*v,m=(1+u)*g+(-1.5-2*u)*b+(-.5+u)*v+1,x=(-1-f)*g+(1.5+f)*b+.5*v,y=f*g-f*b;for(let E=0;E!==a;++E)r[E]=p*o[h+E]+m*o[c+E]+x*o[l+E]+y*o[d+E];return r}},Ja=class extends ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},ja=class extends ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Nn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ea(t,this.TimeBufferType),this.values=Ea(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ea(e.times,Array),values:Ea(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Za(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case io:t=this.InterpolantFactoryMethodDiscrete;break;case Ia:t=this.InterpolantFactoryMethodLinear;break;case Ta:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return io;case this.InterpolantFactoryMethodLinear:return Ia;case this.InterpolantFactoryMethodSmooth:return Ta}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Tm(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ta,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let v=0;v!==n;++v){let b=t[d+v];if(b!==t[u+v]||b!==t[f+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Ia;var ts=class extends Nn{constructor(e,t,n){super(e,t,n)}};ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=io;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends Nn{constructor(e,t,n,i){super(e,t,n,i)}};Qa.prototype.ValueTypeName="color";var el=class extends Nn{constructor(e,t,n,i){super(e,t,n,i)}};el.prototype.ValueTypeName="number";var tl=class extends ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)zn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Io=class extends Nn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new tl(this.times,this.values,this.getValueSize(),e)}};Io.prototype.ValueTypeName="quaternion";Io.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends Nn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=io;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends Nn{constructor(e,t,n,i){super(e,t,n,i)}};nl.prototype.ValueTypeName="vector";var il=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],v=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},nf=new il,sl=class{constructor(e){this.manager=e!==void 0?e:nf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};sl.DEFAULT_MATERIAL_NAME="__DEFAULT";var dr=class extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},fr=class extends dr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},th=new St,rd=new H,od=new H,rl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=ti,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ar,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(rd),od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(od),t.updateMatrixWorld(),th.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(th,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(th)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ad=new St,Qr=new H,nh=new H,ch=class extends rl{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Qr),nh.copy(n.position),nh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(nh),n.updateMatrixWorld(),i.makeTranslation(-Qr.x,-Qr.y,-Qr.z),ad.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ad,n.coordinateSystem,n.reversedDepth)}},Po=class extends dr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ch}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Lo=class extends uo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hh=class extends rl{constructor(){super(new Lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},pr=class extends dr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new hh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Do=class extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var ol=class extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ih="\\[\\]\\.:\\/",Am=new RegExp("["+Ih+"]","g"),Ph="[^"+Ih+"]",Rm="[^"+Ih.replace("\\.","")+"]",Cm=/((?:WC+[\/:])*)/.source.replace("WC",Ph),Im=/(WCOD+)?/.source.replace("WCOD",Rm),Pm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ph),Lm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ph),Dm=new RegExp("^"+Cm+Im+Pm+Lm+"$"),km=["material","materials","bones","map"],uh=class{constructor(e,t,n){let i=n||Bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Am,"")}static parseTrackName(e){let t=Dm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);km.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bt.Composite=uh;Bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bt.prototype.GetterByBindingType=[Bt.prototype._getValue_direct,Bt.prototype._getValue_array,Bt.prototype._getValue_arrayElement,Bt.prototype._getValue_toArray];Bt.prototype.SetterByBindingTypeAndVersioning=[[Bt.prototype._setValue_direct,Bt.prototype._setValue_direct_setNeedsUpdate,Bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_array,Bt.prototype._setValue_array_setNeedsUpdate,Bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_arrayElement,Bt.prototype._setValue_arrayElement_setNeedsUpdate,Bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_fromArray,Bt.prototype._setValue_fromArray_setNeedsUpdate,Bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var O_=new Float32Array(1);function Lh(s,e,t,n){let i=Fm(n);switch(t){case bh:return s*e;case Ml:return s*e/i.components*i.byteLength;case Sl:return s*e/i.components*i.byteLength;case Sh:return s*e*2/i.components*i.byteLength;case wl:return s*e*2/i.components*i.byteLength;case Mh:return s*e*3/i.components*i.byteLength;case Vn:return s*e*4/i.components*i.byteLength;case El:return s*e*4/i.components*i.byteLength;case Uo:case No:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Oo:case Bo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Al:case Cl:return Math.max(s,16)*Math.max(e,8)/4;case Tl:case Rl:return Math.max(s,8)*Math.max(e,8)/2;case Il:case Pl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ol:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case zl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Hl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Xl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ql:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Yl:case $l:case Kl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Zl:case Jl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case jl:case Ql:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fm(s){switch(s){case ti:case vh:return{byteLength:1,components:1};case gr:case xh:case vr:return{byteLength:2,components:1};case _l:case bl:return{byteLength:2,components:4};case ss:case yl:case ni:return{byteLength:4,components:1};case yh:case _h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Af(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Nm(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,v)=>f.start-v.start);let u=0;for(let f=1;f<d.length;f++){let v=d[u],b=d[f];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++u,d[u]=b)}d.length=u+1;for(let f=0,v=d.length;f<v;f++){let b=d[f];s.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bm=`#ifdef USE_ALPHAHASH
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
#endif`,zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
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
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
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
#endif`,Ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jm=`#ifdef USE_IRIDESCENCE
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
#endif`,jm=`#ifdef USE_BUMPMAP
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,a0=`#define PI 3.141592653589793
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
} // validated`,l0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,c0=`vec3 transformedNormal = objectNormal;
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
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p0="gl_FragColor = linearToOutputTexel( gl_FragColor );",m0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,g0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
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
#endif`,b0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E0=`#ifdef USE_GRADIENTMAP
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
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,C0=`uniform bool receiveShadow;
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
#endif`,I0=`#ifdef USE_ENVMAP
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
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,D0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,F0=`PhysicalMaterial material;
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
#endif`,U0=`struct PhysicalMaterial {
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
}`,N0=`
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,W0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,q0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Y0=`#if defined( USE_POINTS_UV )
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
#endif`,$0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Z0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
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
#endif`,eg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ng=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,og=`#ifdef USE_NORMALMAP
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
#endif`,ag=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Eg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
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
#endif`,Ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ig=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Lg=`#ifdef USE_TRANSMISSION
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`#include <common>
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
}`,Wg=`#if DEPTH_PACKING == 3200
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
}`,Xg=`#define DISTANCE
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
}`,qg=`#define DISTANCE
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
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`uniform float scale;
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
}`,Zg=`uniform vec3 diffuse;
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
}`,Jg=`#include <common>
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
}`,jg=`uniform vec3 diffuse;
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
}`,Qg=`#define LAMBERT
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
}`,ev=`#define LAMBERT
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
}`,tv=`#define MATCAP
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
}`,nv=`#define MATCAP
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
}`,iv=`#define NORMAL
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
}`,sv=`#define NORMAL
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
}`,rv=`#define PHONG
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
}`,ov=`#define PHONG
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
}`,av=`#define STANDARD
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
}`,lv=`#define STANDARD
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
}`,cv=`#define TOON
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
}`,hv=`#define TOON
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
}`,uv=`uniform float size;
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
}`,dv=`uniform vec3 diffuse;
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
}`,fv=`#include <common>
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
}`,pv=`uniform vec3 color;
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
}`,mv=`uniform float rotation;
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
}`,gv=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:Om,alphahash_pars_fragment:Bm,alphamap_fragment:zm,alphamap_pars_fragment:Hm,alphatest_fragment:Vm,alphatest_pars_fragment:Gm,aomap_fragment:Wm,aomap_pars_fragment:Xm,batching_pars_vertex:qm,batching_vertex:Ym,begin_vertex:$m,beginnormal_vertex:Km,bsdfs:Zm,iridescence_fragment:Jm,bumpmap_pars_fragment:jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:e0,clipping_planes_pars_vertex:t0,clipping_planes_vertex:n0,color_fragment:i0,color_pars_fragment:s0,color_pars_vertex:r0,color_vertex:o0,common:a0,cube_uv_reflection_fragment:l0,defaultnormal_vertex:c0,displacementmap_pars_vertex:h0,displacementmap_vertex:u0,emissivemap_fragment:d0,emissivemap_pars_fragment:f0,colorspace_fragment:p0,colorspace_pars_fragment:m0,envmap_fragment:g0,envmap_common_pars_fragment:v0,envmap_pars_fragment:x0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:I0,envmap_vertex:_0,fog_vertex:b0,fog_pars_vertex:M0,fog_fragment:S0,fog_pars_fragment:w0,gradientmap_pars_fragment:E0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:R0,lights_pars_begin:C0,lights_toon_fragment:P0,lights_toon_pars_fragment:L0,lights_phong_fragment:D0,lights_phong_pars_fragment:k0,lights_physical_fragment:F0,lights_physical_pars_fragment:U0,lights_fragment_begin:N0,lights_fragment_maps:O0,lights_fragment_end:B0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:H0,logdepthbuf_pars_vertex:V0,logdepthbuf_vertex:G0,map_fragment:W0,map_pars_fragment:X0,map_particle_fragment:q0,map_particle_pars_fragment:Y0,metalnessmap_fragment:$0,metalnessmap_pars_fragment:K0,morphinstance_vertex:Z0,morphcolor_vertex:J0,morphnormal_vertex:j0,morphtarget_pars_vertex:Q0,morphtarget_vertex:eg,normal_fragment_begin:tg,normal_fragment_maps:ng,normal_pars_fragment:ig,normal_pars_vertex:sg,normal_vertex:rg,normalmap_pars_fragment:og,clearcoat_normal_fragment_begin:ag,clearcoat_normal_fragment_maps:lg,clearcoat_pars_fragment:cg,iridescence_pars_fragment:hg,opaque_fragment:ug,packing:dg,premultiplied_alpha_fragment:fg,project_vertex:pg,dithering_fragment:mg,dithering_pars_fragment:gg,roughnessmap_fragment:vg,roughnessmap_pars_fragment:xg,shadowmap_pars_fragment:yg,shadowmap_pars_vertex:_g,shadowmap_vertex:bg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:wg,skinning_vertex:Eg,skinnormal_vertex:Tg,specularmap_fragment:Ag,specularmap_pars_fragment:Rg,tonemapping_fragment:Cg,tonemapping_pars_fragment:Ig,transmission_fragment:Pg,transmission_pars_fragment:Lg,uv_pars_fragment:Dg,uv_pars_vertex:kg,uv_vertex:Fg,worldpos_vertex:Ug,background_vert:Ng,background_frag:Og,backgroundCube_vert:Bg,backgroundCube_frag:zg,cube_vert:Hg,cube_frag:Vg,depth_vert:Gg,depth_frag:Wg,distanceRGBA_vert:Xg,distanceRGBA_frag:qg,equirect_vert:Yg,equirect_frag:$g,linedashed_vert:Kg,linedashed_frag:Zg,meshbasic_vert:Jg,meshbasic_frag:jg,meshlambert_vert:Qg,meshlambert_frag:ev,meshmatcap_vert:tv,meshmatcap_frag:nv,meshnormal_vert:iv,meshnormal_frag:sv,meshphong_vert:rv,meshphong_frag:ov,meshphysical_vert:av,meshphysical_frag:lv,meshtoon_vert:cv,meshtoon_frag:hv,points_vert:uv,points_frag:dv,shadow_vert:fv,shadow_frag:pv,sprite_vert:mv,sprite_frag:gv},De={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},mi={basic:{uniforms:_n([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:_n([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new st(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:_n([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:_n([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:_n([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new st(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:_n([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:_n([De.points,De.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:_n([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:_n([De.common,De.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:_n([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:_n([De.sprite,De.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:_n([De.common,De.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:_n([De.lights,De.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};mi.physical={uniforms:_n([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var ic={r:0,b:0,g:0},ys=new Hn,vv=new St;function xv(s,e,t,n,i,r,o){let a=new st(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function v(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function b(x){let y=!1,E=v(x);E===null?p(a,l):E&&E.isColor&&(p(E,1),y=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,y){let E=v(y);E&&(E.isCubeTexture||E.mapping===ko)?(h===void 0&&(h=new Qe(new zt(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:xs(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,k,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ys.copy(y.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(vv.makeRotationFromEuler(ys)),h.material.toneMapped=Mt.getTransfer(E.colorSpace)!==Rt,(d!==E||u!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=E,u=E.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Qe(new yn(2,2),new en({name:"BackgroundMaterial",uniforms:xs(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(E.colorSpace)!==Rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||u!==E.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=E,u=E.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(ic,Rh(s)),n.buffers.color.setClear(ic.r,ic.g,ic.b,y,o)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:b,addToRenderList:g,dispose:m}}function yv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(S,I,O,U,G){let q=!1,J=d(U,O,I);r!==J&&(r=J,c(r.object)),q=f(S,U,O,G),q&&v(S,U,O,G),G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,y(S,I,O,U),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function d(S,I,O){let U=O.wireframe===!0,G=n[S.id];G===void 0&&(G={},n[S.id]=G);let q=G[I.id];q===void 0&&(q={},G[I.id]=q);let J=q[U];return J===void 0&&(J=u(l()),q[U]=J),J}function u(S){let I=[],O=[],U=[];for(let G=0;G<t;G++)I[G]=0,O[G]=0,U[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:U,object:S,attributes:{},index:null}}function f(S,I,O,U){let G=r.attributes,q=I.attributes,J=0,ne=O.getAttributes();for(let $ in ne)if(ne[$].location>=0){let fe=G[$],Se=q[$];if(Se===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(Se=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(Se=S.instanceColor)),fe===void 0||fe.attribute!==Se||Se&&fe.data!==Se.data)return!0;J++}return r.attributesNum!==J||r.index!==U}function v(S,I,O,U){let G={},q=I.attributes,J=0,ne=O.getAttributes();for(let $ in ne)if(ne[$].location>=0){let fe=q[$];fe===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor));let Se={};Se.attribute=fe,fe&&fe.data&&(Se.data=fe.data),G[$]=Se,J++}r.attributes=G,r.attributesNum=J,r.index=U}function b(){let S=r.newAttributes;for(let I=0,O=S.length;I<O;I++)S[I]=0}function g(S){p(S,0)}function p(S,I){let O=r.newAttributes,U=r.enabledAttributes,G=r.attributeDivisors;O[S]=1,U[S]===0&&(s.enableVertexAttribArray(S),U[S]=1),G[S]!==I&&(s.vertexAttribDivisor(S,I),G[S]=I)}function m(){let S=r.newAttributes,I=r.enabledAttributes;for(let O=0,U=I.length;O<U;O++)I[O]!==S[O]&&(s.disableVertexAttribArray(O),I[O]=0)}function x(S,I,O,U,G,q,J){J===!0?s.vertexAttribIPointer(S,I,O,G,q):s.vertexAttribPointer(S,I,O,U,G,q)}function y(S,I,O,U){b();let G=U.attributes,q=O.getAttributes(),J=I.defaultAttributeValues;for(let ne in q){let $=q[ne];if($.location>=0){let ce=G[ne];if(ce===void 0&&(ne==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),ne==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor)),ce!==void 0){let fe=ce.normalized,Se=ce.itemSize,qe=e.get(ce);if(qe===void 0)continue;let Ne=qe.buffer,$e=qe.type,tt=qe.bytesPerElement,te=$e===s.INT||$e===s.UNSIGNED_INT||ce.gpuType===yl;if(ce.isInterleavedBufferAttribute){let j=ce.data,de=j.stride,Me=ce.offset;if(j.isInstancedInterleavedBuffer){for(let re=0;re<$.locationSize;re++)p($.location+re,j.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let re=0;re<$.locationSize;re++)g($.location+re);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let re=0;re<$.locationSize;re++)x($.location+re,Se/$.locationSize,$e,fe,de*tt,(Me+Se/$.locationSize*re)*tt,te)}else{if(ce.isInstancedBufferAttribute){for(let j=0;j<$.locationSize;j++)p($.location+j,ce.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let j=0;j<$.locationSize;j++)g($.location+j);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let j=0;j<$.locationSize;j++)x($.location+j,Se/$.locationSize,$e,fe,Se*tt,Se/$.locationSize*j*tt,te)}}else if(J!==void 0){let fe=J[ne];if(fe!==void 0)switch(fe.length){case 2:s.vertexAttrib2fv($.location,fe);break;case 3:s.vertexAttrib3fv($.location,fe);break;case 4:s.vertexAttrib4fv($.location,fe);break;default:s.vertexAttrib1fv($.location,fe)}}}}m()}function E(){D();for(let S in n){let I=n[S];for(let O in I){let U=I[O];for(let G in U)h(U[G].object),delete U[G];delete I[O]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;let I=n[S.id];for(let O in I){let U=I[O];for(let G in U)h(U[G].object),delete U[G];delete I[O]}delete n[S.id]}function k(S){for(let I in n){let O=n[I];if(O[S.id]===void 0)continue;let U=O[S.id];for(let G in U)h(U[G].object),delete U[G];delete O[S.id]}}function D(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:R,releaseStatesOfProgram:k,initAttributes:b,enableAttribute:g,disableUnusedAttributes:m}}function _v(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let v=0;v<d;v++)f+=h[v];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)o(c[v],h[v],u[v]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let v=0;for(let b=0;b<d;b++)v+=h[b]*u[b];t.update(v,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function bv(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let k=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(k){return!(k!==Vn&&n.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(k){let D=k===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==ti&&n.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==ni&&!D)}function l(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=v>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:E,maxSamples:R}}function Mv(s){let e=this,t=null,n=0,i=!1,r=!1,o=new oi,a=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let v=d.clippingPlanes,b=d.clipIntersection,g=d.clipShadows,p=s.get(d);if(!i||v===null||v.length===0||r&&!g)r?h(null):c();else{let m=r?0:n,x=m*4,y=p.clippingState||null;l.value=y,y=h(v,u,x,f);for(let E=0;E!==x;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,v){let b=d!==null?d.length:0,g=null;if(b!==0){if(g=l.value,v!==!0||g===null){let p=f+b*4,m=u.matrixWorldInverse;a.getNormalMatrix(m),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=f;x!==b;++x,y+=4)o.copy(d[x]).applyMatrix4(m,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,g}}function Sv(s){let e=new WeakMap;function t(o,a){return a===gl?o.mapping=gs:a===vl&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===gl||a===vl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Oa(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var br=4,sf=[.125,.215,.35,.446,.526,.582],Ms=20,Dh=new Lo,rf=new st,kh=null,Fh=0,Uh=0,Nh=!1,bs=(1+Math.sqrt(5))/2,_r=1/bs,of=[new H(-bs,_r,0),new H(bs,_r,0),new H(-_r,0,bs),new H(_r,0,bs),new H(0,bs,-_r),new H(0,bs,_r),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],wv=new H,Sr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=wv}=r;kh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(kh,Fh,Uh),this._renderer.xr.enabled=Nh,e.scissorTest=!1,sc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:vr,format:Vn,colorSpace:fs,depthBuffer:!1},i=af(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=af(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ev(r)),this._blurMaterial=Tv(r,e,t)}return i}_compileMaterial(e){let t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,Dh)}_sceneToCubeUV(e,t,n,i,r){let l=new hn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(rf),d.toneMapping=ei,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));let b=new Kt({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new Qe(new zt,b),p=!1,m=e.background;m?m.isColor&&(b.color.copy(m),e.background=null,p=!0):(b.color.copy(rf),p=!0);for(let x=0;x<6;x++){let y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[x],r.y,r.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[x]));let E=this._cubeSize;sc(i,y*E,x>2?E:0,E,E),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===gs||e.mapping===vs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Qe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;sc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Dh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=of[(i-r-1)%of.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Qe(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ms-1),b=r/v,g=isFinite(r)?1+Math.floor(h*b):Ms;g>Ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ms}`);let p=[],m=0;for(let k=0;k<Ms;++k){let D=k/b,M=Math.exp(-D*D/2);p.push(M),k===0?m+=M:k<g&&(m+=2*M)}for(let k=0;k<p.length;k++)p[k]=p[k]/m;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:x}=this;u.dTheta.value=v,u.mipInt.value=x-n;let y=this._sizeLods[i],E=3*y*(i>x-br?i-x+br:0),R=4*(this._cubeSize-y);sc(t,E,R,3*y,2*y),l.setRenderTarget(t),l.render(d,Dh)}};function Ev(s){let e=[],t=[],n=[],i=s,r=s-br+1+sf.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-br?l=sf[o-s+br-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,v=6,b=3,g=2,p=1,m=new Float32Array(b*v*f),x=new Float32Array(g*v*f),y=new Float32Array(p*v*f);for(let R=0;R<f;R++){let k=R%3*2/3-1,D=R>2?0:-1,M=[k,D,0,k+2/3,D,0,k+2/3,D+1,0,k,D,0,k+2/3,D+1,0,k,D+1,0];m.set(M,b*v*R),x.set(u,g*v*R);let S=[R,R,R,R,R,R];y.set(S,p*v*R)}let E=new Zt;E.setAttribute("position",new En(m,b)),E.setAttribute("uv",new En(x,g)),E.setAttribute("faceIndex",new En(y,p)),e.push(E),i>br&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function af(s,e,t){let n=new li(s,e,t);return n.texture.mapping=ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Tv(s,e,t){let n=new Float32Array(Ms),i=new H(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function lf(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function cf(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Yh(){return`

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
	`}function Av(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===gl||l===vl,h=l===gs||l===vs;if(c||h){let d=e.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Sr(s)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Sr(s)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Rv(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ir("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Cv(s,e,t,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let v in u.attributes)e.remove(u.attributes[v]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,v=d.attributes.position,b=0;if(f!==null){let m=f.array;b=f.version;for(let x=0,y=m.length;x<y;x+=3){let E=m[x+0],R=m[x+1],k=m[x+2];u.push(E,R,R,k,k,E)}}else if(v!==void 0){let m=v.array;b=v.version;for(let x=0,y=m.length/3-1;x<y;x+=3){let E=x+0,R=x+1,k=x+2;u.push(E,R,R,k,k,E)}}else return;let g=new(Ah(u)?ho:co)(u,1);g.version=b;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Iv(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*o),t.update(f,n,1)}function c(u,f,v){v!==0&&(s.drawElementsInstanced(n,f,r,u*o,v),t.update(f,n,v))}function h(u,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,v);let g=0;for(let p=0;p<v;p++)g+=f[p];t.update(g,n,1)}function d(u,f,v,b){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],b[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,b,0,v);let p=0;for(let m=0;m<v;m++)p+=f[m]*b[m];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Pv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Lv(s,e,t){let n=new WeakMap,i=new Tt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let M=function(){k.dispose(),n.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],m=a.morphAttributes.color||[],x=0;f===!0&&(x=1),v===!0&&(x=2),b===!0&&(x=3);let y=a.attributes.position.count*x,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let R=new Float32Array(y*E*4*d),k=new ao(R,y,E,d);k.type=ni,k.needsUpdate=!0;let D=x*4;for(let S=0;S<d;S++){let I=g[S],O=p[S],U=m[S],G=y*E*4*S;for(let q=0;q<I.count;q++){let J=q*D;f===!0&&(i.fromBufferAttribute(I,q),R[G+J+0]=i.x,R[G+J+1]=i.y,R[G+J+2]=i.z,R[G+J+3]=0),v===!0&&(i.fromBufferAttribute(O,q),R[G+J+4]=i.x,R[G+J+5]=i.y,R[G+J+6]=i.z,R[G+J+7]=0),b===!0&&(i.fromBufferAttribute(U,q),R[G+J+8]=i.x,R[G+J+9]=i.y,R[G+J+10]=i.z,R[G+J+11]=U.itemSize===4?i.w:1)}}u={count:d,texture:k,size:new Ce(y,E)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let v=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Dv(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Rf=new Tn,hf=new xo(1,1),Cf=new ao,If=new Fa,Pf=new fo,uf=[],df=[],ff=new Float32Array(16),pf=new Float32Array(9),mf=new Float32Array(4);function wr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=uf[i];if(r===void 0&&(r=new Float32Array(i),uf[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function nn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function sn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ac(s,e){let t=df[e];t===void 0&&(t=new Int32Array(e),df[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function kv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Fv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2fv(this.addr,e),sn(t,e)}}function Uv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;s.uniform3fv(this.addr,e),sn(t,e)}}function Nv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4fv(this.addr,e),sn(t,e)}}function Ov(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;mf.set(n),s.uniformMatrix2fv(this.addr,!1,mf),sn(t,n)}}function Bv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;pf.set(n),s.uniformMatrix3fv(this.addr,!1,pf),sn(t,n)}}function zv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(nn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(nn(t,n))return;ff.set(n),s.uniformMatrix4fv(this.addr,!1,ff),sn(t,n)}}function Hv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2iv(this.addr,e),sn(t,e)}}function Gv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3iv(this.addr,e),sn(t,e)}}function Wv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4iv(this.addr,e),sn(t,e)}}function Xv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function qv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;s.uniform2uiv(this.addr,e),sn(t,e)}}function Yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;s.uniform3uiv(this.addr,e),sn(t,e)}}function $v(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;s.uniform4uiv(this.addr,e),sn(t,e)}}function Kv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(hf.compareFunction=Eh,r=hf):r=Rf,t.setTexture2D(e||r,i)}function Zv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||If,i)}function Jv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Pf,i)}function jv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Cf,i)}function Qv(s){switch(s){case 5126:return kv;case 35664:return Fv;case 35665:return Uv;case 35666:return Nv;case 35674:return Ov;case 35675:return Bv;case 35676:return zv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Gv;case 35669:case 35673:return Wv;case 5125:return Xv;case 36294:return qv;case 36295:return Yv;case 36296:return $v;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return Zv;case 35680:case 36300:case 36308:case 36293:return Jv;case 36289:case 36303:case 36311:case 36292:return jv}}function ex(s,e){s.uniform1fv(this.addr,e)}function tx(s,e){let t=wr(e,this.size,2);s.uniform2fv(this.addr,t)}function nx(s,e){let t=wr(e,this.size,3);s.uniform3fv(this.addr,t)}function ix(s,e){let t=wr(e,this.size,4);s.uniform4fv(this.addr,t)}function sx(s,e){let t=wr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function rx(s,e){let t=wr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function ox(s,e){let t=wr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ax(s,e){s.uniform1iv(this.addr,e)}function lx(s,e){s.uniform2iv(this.addr,e)}function cx(s,e){s.uniform3iv(this.addr,e)}function hx(s,e){s.uniform4iv(this.addr,e)}function ux(s,e){s.uniform1uiv(this.addr,e)}function dx(s,e){s.uniform2uiv(this.addr,e)}function fx(s,e){s.uniform3uiv(this.addr,e)}function px(s,e){s.uniform4uiv(this.addr,e)}function mx(s,e,t){let n=this.cache,i=e.length,r=ac(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Rf,r[o])}function gx(s,e,t){let n=this.cache,i=e.length,r=ac(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||If,r[o])}function vx(s,e,t){let n=this.cache,i=e.length,r=ac(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Pf,r[o])}function xx(s,e,t){let n=this.cache,i=e.length,r=ac(t,i);nn(n,r)||(s.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Cf,r[o])}function yx(s){switch(s){case 5126:return ex;case 35664:return tx;case 35665:return nx;case 35666:return ix;case 35674:return sx;case 35675:return rx;case 35676:return ox;case 5124:case 35670:return ax;case 35667:case 35671:return lx;case 35668:case 35672:return cx;case 35669:case 35673:return hx;case 5125:return ux;case 36294:return dx;case 36295:return fx;case 36296:return px;case 35678:case 36198:case 36298:case 36306:case 35682:return mx;case 35679:case 36299:case 36307:return gx;case 35680:case 36300:case 36308:case 36293:return vx;case 36289:case 36303:case 36311:case 36292:return xx}}var Bh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qv(t.type)}},zh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yx(t.type)}},Hh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Oh=/(\w+)(\])?(\[|\.)?/g;function gf(s,e){s.seq.push(e),s.map[e.id]=e}function _x(s,e,t){let n=s.name,i=n.length;for(Oh.lastIndex=0;;){let r=Oh.exec(n),o=Oh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){gf(t,c===void 0?new Bh(a,s,e):new zh(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new Hh(a),gf(t,d)),t=d}}}var Mr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);_x(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function vf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var bx=37297,Mx=0;function Sx(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var xf=new ct;function wx(s){Mt._getMatrix(xf,Mt.workingColorSpace,s);let e=`mat3( ${xf.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(s)){case so:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function yf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Sx(s.getShaderSource(e),a)}else return r}function Ex(s,e){let t=wx(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Tx(s,e){let t;switch(e){case Id:t="Linear";break;case Pd:t="Reinhard";break;case Ld:t="Cineon";break;case ml:t="ACESFilmic";break;case kd:t="AgX";break;case Fd:t="Neutral";break;case Dd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var rc=new H;function Ax(){Mt.getLuminanceCoefficients(rc);let s=rc.x.toFixed(4),e=rc.y.toFixed(4),t=rc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zo).join(`
`)}function Cx(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ix(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function zo(s){return s!==""}function _f(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Px=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vh(s){return s.replace(Px,Dx)}var Lx=new Map;function Dx(s,e){let t=ht[e];if(t===void 0){let n=Lx.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vh(t)}var kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(s){return s.replace(kx,Fx)}function Fx(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Sf(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Ux(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===fh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===al?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fi&&(e="SHADOWMAP_TYPE_VSM"),e}function Nx(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case gs:case vs:e="ENVMAP_TYPE_CUBE";break;case ko:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ox(s){let e="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===vs&&(e="ENVMAP_MODE_REFRACTION"),e}function Bx(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case pl:e="ENVMAP_BLENDING_MULTIPLY";break;case Rd:e="ENVMAP_BLENDING_MIX";break;case Cd:e="ENVMAP_BLENDING_ADD";break}return e}function zx(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Hx(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Ux(t),c=Nx(t),h=Ox(t),d=Bx(t),u=zx(t),f=Rx(t),v=Cx(r),b=i.createProgram(),g,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(zo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(zo).join(`
`),p.length>0&&(p+=`
`)):(g=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zo).join(`
`),p=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?ht.tonemapping_pars_fragment:"",t.toneMapping!==ei?Tx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Ex("linearToOutputTexel",t.outputColorSpace),Ax(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zo).join(`
`)),o=Vh(o),o=_f(o,t),o=bf(o,t),a=Vh(a),a=_f(a,t),a=bf(a,t),o=Mf(o),a=Mf(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Th?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=m+g+o,y=m+p+a,E=vf(i,i.VERTEX_SHADER,x),R=vf(i,i.FRAGMENT_SHADER,y);i.attachShader(b,E),i.attachShader(b,R),t.index0AttributeName!==void 0?i.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function k(I){if(s.debug.checkShaderErrors){let O=i.getProgramInfoLog(b)||"",U=i.getShaderInfoLog(E)||"",G=i.getShaderInfoLog(R)||"",q=O.trim(),J=U.trim(),ne=G.trim(),$=!0,ce=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,b,E,R);else{let fe=yf(i,E,"vertex"),Se=yf(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+q+`
`+fe+`
`+Se)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(J===""||ne==="")&&(ce=!1);ce&&(I.diagnostics={runnable:$,programLog:q,vertexShader:{log:J,prefix:g},fragmentShader:{log:ne,prefix:p}})}i.deleteShader(E),i.deleteShader(R),D=new Mr(i,b),M=Ix(i,b)}let D;this.getUniforms=function(){return D===void 0&&k(this),D};let M;this.getAttributes=function(){return M===void 0&&k(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(b,bx)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mx++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=R,this}var Vx=0,Gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Wh(e),t.set(e,n)),n}},Wh=class{constructor(e){this.id=Vx++,this.code=e,this.usedTimes=0}};function Gx(s,e,t,n,i,r,o){let a=new lo,l=new Gh,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,I,O,U){let G=O.fog,q=U.geometry,J=M.isMeshStandardMaterial?O.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||J),$=ne&&ne.mapping===ko?ne.image.height:null,ce=v[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let fe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Se=fe!==void 0?fe.length:0,qe=0;q.morphAttributes.position!==void 0&&(qe=1),q.morphAttributes.normal!==void 0&&(qe=2),q.morphAttributes.color!==void 0&&(qe=3);let Ne,$e,tt,te;if(ce){let xt=mi[ce];Ne=xt.vertexShader,$e=xt.fragmentShader}else Ne=M.vertexShader,$e=M.fragmentShader,l.update(M),tt=l.getVertexShaderID(M),te=l.getFragmentShaderID(M);let j=s.getRenderTarget(),de=s.state.buffers.depth.getReversed(),Me=U.isInstancedMesh===!0,re=U.isBatchedMesh===!0,He=!!M.map,nt=!!M.matcap,B=!!ne,ut=!!M.aoMap,Ve=!!M.lightMap,Ge=!!M.bumpMap,me=!!M.normalMap,dt=!!M.displacementMap,Ie=!!M.emissiveMap,Ye=!!M.metalnessMap,Gt=!!M.roughnessMap,gt=M.anisotropy>0,N=M.clearcoat>0,T=M.dispersion>0,K=M.iridescence>0,oe=M.sheen>0,he=M.transmission>0,ie=gt&&!!M.anisotropyMap,Oe=N&&!!M.clearcoatMap,le=N&&!!M.clearcoatNormalMap,Pe=N&&!!M.clearcoatRoughnessMap,ke=K&&!!M.iridescenceMap,ye=K&&!!M.iridescenceThicknessMap,we=oe&&!!M.sheenColorMap,Ke=oe&&!!M.sheenRoughnessMap,ze=!!M.specularMap,Te=!!M.specularColorMap,Fe=!!M.specularIntensityMap,F=he&&!!M.transmissionMap,pe=he&&!!M.thicknessMap,ge=!!M.gradientMap,Ae=!!M.alphaMap,ue=M.alphaTest>0,se=!!M.alphaHash,Re=!!M.extensions,rt=ei;M.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(rt=s.toneMapping);let ft={shaderID:ce,shaderType:M.type,shaderName:M.name,vertexShader:Ne,fragmentShader:$e,defines:M.defines,customVertexShaderID:tt,customFragmentShaderID:te,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:re,batchingColor:re&&U._colorsTexture!==null,instancing:Me,instancingColor:Me&&U.instanceColor!==null,instancingMorph:Me&&U.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:j===null?s.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:fs,alphaToCoverage:!!M.alphaToCoverage,map:He,matcap:nt,envMap:B,envMapMode:B&&ne.mapping,envMapCubeUVHeight:$,aoMap:ut,lightMap:Ve,bumpMap:Ge,normalMap:me,displacementMap:u&&dt,emissiveMap:Ie,normalMapObjectSpace:me&&M.normalMapType===Bd,normalMapTangentSpace:me&&M.normalMapType===ec,metalnessMap:Ye,roughnessMap:Gt,anisotropy:gt,anisotropyMap:ie,clearcoat:N,clearcoatMap:Oe,clearcoatNormalMap:le,clearcoatRoughnessMap:Pe,dispersion:T,iridescence:K,iridescenceMap:ke,iridescenceThicknessMap:ye,sheen:oe,sheenColorMap:we,sheenRoughnessMap:Ke,specularMap:ze,specularColorMap:Te,specularIntensityMap:Fe,transmission:he,transmissionMap:F,thicknessMap:pe,gradientMap:ge,opaque:M.transparent===!1&&M.blending===Ri&&M.alphaToCoverage===!1,alphaMap:Ae,alphaTest:ue,alphaHash:se,combine:M.combine,mapUv:He&&b(M.map.channel),aoMapUv:ut&&b(M.aoMap.channel),lightMapUv:Ve&&b(M.lightMap.channel),bumpMapUv:Ge&&b(M.bumpMap.channel),normalMapUv:me&&b(M.normalMap.channel),displacementMapUv:dt&&b(M.displacementMap.channel),emissiveMapUv:Ie&&b(M.emissiveMap.channel),metalnessMapUv:Ye&&b(M.metalnessMap.channel),roughnessMapUv:Gt&&b(M.roughnessMap.channel),anisotropyMapUv:ie&&b(M.anisotropyMap.channel),clearcoatMapUv:Oe&&b(M.clearcoatMap.channel),clearcoatNormalMapUv:le&&b(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&b(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&b(M.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&b(M.iridescenceThicknessMap.channel),sheenColorMapUv:we&&b(M.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&b(M.sheenRoughnessMap.channel),specularMapUv:ze&&b(M.specularMap.channel),specularColorMapUv:Te&&b(M.specularColorMap.channel),specularIntensityMapUv:Fe&&b(M.specularIntensityMap.channel),transmissionMapUv:F&&b(M.transmissionMap.channel),thicknessMapUv:pe&&b(M.thicknessMap.channel),alphaMapUv:Ae&&b(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(me||gt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!q.attributes.uv&&(He||Ae),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:de,skinning:U.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:qe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:rt,decodeVideoTexture:He&&M.map.isVideoTexture===!0&&Mt.getTransfer(M.map.colorSpace)===Rt,decodeVideoTextureEmissive:Ie&&M.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(M.emissiveMap.colorSpace)===Rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===un,flipSided:M.side===mn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Re&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&M.extensions.multiDraw===!0||re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)S.push(I),S.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(m(S,M),x(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function m(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function x(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){let S=v[M.type],I;if(S){let O=mi[S];I=Zd.clone(O.uniforms)}else I=M.uniforms;return I}function E(M,S){let I;for(let O=0,U=h.length;O<U;O++){let G=h[O];if(G.cacheKey===S){I=G,++I.usedTimes;break}}return I===void 0&&(I=new Hx(s,S,M,r),h.push(I)),I}function R(M){if(--M.usedTimes===0){let S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function k(M){l.remove(M)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:R,releaseShaderCache:k,programs:h,dispose:D}}function Wx(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Xx(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function wf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ef(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,f,v,b,g){let p=s[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:v,renderOrder:d.renderOrder,z:b,group:g},s[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=v,p.renderOrder=d.renderOrder,p.z=b,p.group=g),e++,p}function a(d,u,f,v,b,g){let p=o(d,u,f,v,b,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,u,f,v,b,g){let p=o(d,u,f,v,b,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||Xx),n.length>1&&n.sort(u||wf),i.length>1&&i.sort(u||wf)}function h(){for(let d=e,u=s.length;d<u;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function qx(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Ef,s.set(n,[o])):i>=r.length?(o=new Ef,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Yx(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new st};break;case"SpotLight":t={position:new H,direction:new H,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new H,halfWidth:new H,halfHeight:new H};break}return s[e.id]=t,t}}}function $x(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Kx=0;function Zx(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Jx(s){let e=new Yx,t=$x(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);let i=new H,r=new St,o=new St;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,v=0,b=0,g=0,p=0,m=0,x=0,y=0,E=0,R=0,k=0;c.sort(Zx);for(let M=0,S=c.length;M<S;M++){let I=c[M],O=I.color,U=I.intensity,G=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=O.r*U,d+=O.g*U,u+=O.b*U;else if(I.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(I.sh.coefficients[J],U);k++}else if(I.isDirectionalLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ne=I.shadow,$=t.get(I);$.shadowIntensity=ne.intensity,$.shadowBias=ne.bias,$.shadowNormalBias=ne.normalBias,$.shadowRadius=ne.radius,$.shadowMapSize=ne.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=I.shadow.matrix,m++}n.directional[f]=J,f++}else if(I.isSpotLight){let J=e.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(O).multiplyScalar(U),J.distance=G,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,n.spot[b]=J;let ne=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,ne.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[b]=ne.matrix,I.castShadow){let $=t.get(I);$.shadowIntensity=ne.intensity,$.shadowBias=ne.bias,$.shadowNormalBias=ne.normalBias,$.shadowRadius=ne.radius,$.shadowMapSize=ne.mapSize,n.spotShadow[b]=$,n.spotShadowMap[b]=q,y++}b++}else if(I.isRectAreaLight){let J=e.get(I);J.color.copy(O).multiplyScalar(U),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=J,g++}else if(I.isPointLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){let ne=I.shadow,$=t.get(I);$.shadowIntensity=ne.intensity,$.shadowBias=ne.bias,$.shadowNormalBias=ne.normalBias,$.shadowRadius=ne.radius,$.shadowMapSize=ne.mapSize,$.shadowCameraNear=ne.camera.near,$.shadowCameraFar=ne.camera.far,n.pointShadow[v]=$,n.pointShadowMap[v]=q,n.pointShadowMatrix[v]=I.shadow.matrix,x++}n.point[v]=J,v++}else if(I.isHemisphereLight){let J=e.get(I);J.skyColor.copy(I.color).multiplyScalar(U),J.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[p]=J,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let D=n.hash;(D.directionalLength!==f||D.pointLength!==v||D.spotLength!==b||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==m||D.numPointShadows!==x||D.numSpotShadows!==y||D.numSpotMaps!==E||D.numLightProbes!==k)&&(n.directional.length=f,n.spot.length=b,n.rectArea.length=g,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+E-R,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=k,D.directionalLength=f,D.pointLength=v,D.spotLength=b,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=m,D.numPointShadows=x,D.numSpotShadows=y,D.numSpotMaps=E,D.numLightProbes=k,n.version=Kx++)}function l(c,h){let d=0,u=0,f=0,v=0,b=0,g=h.matrixWorldInverse;for(let p=0,m=c.length;p<m;p++){let x=c[p];if(x.isDirectionalLight){let y=n.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(x.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let y=n.rectArea[v];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(x.isPointLight){let y=n.point[u];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){let y=n.hemi[b];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),b++}}}return{setup:a,setupView:l,state:n}}function Tf(s){let e=new Jx(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function jx(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Tf(s),e.set(i,[a])):r>=o.length?(a=new Tf(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Qx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ey=`uniform sampler2D shadow_pass;
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
}`;function ty(s,e,t){let n=new ar,i=new Ce,r=new Ce,o=new Tt,a=new $a({depthPacking:Od}),l=new Ka,c={},h=t.maxTextureSize,d={[Ai]:mn,[mn]:Ai,[un]:un},u=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:Qx,fragmentShader:ey}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let v=new Zt;v.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Qe(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fh;let p=this.type;this.render=function(R,k,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let M=s.getRenderTarget(),S=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),O=s.state;O.setBlending(Pi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let U=p!==fi&&this.type===fi,G=p===fi&&this.type!==fi;for(let q=0,J=R.length;q<J;q++){let ne=R[q],$=ne.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);let ce=$.getFrameExtents();if(i.multiply(ce),r.copy($.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ce.x),i.x=r.x*ce.x,$.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ce.y),i.y=r.y*ce.y,$.mapSize.y=r.y)),$.map===null||U===!0||G===!0){let Se=this.type!==fi?{minFilter:Pn,magFilter:Pn}:{};$.map!==null&&$.map.dispose(),$.map=new li(i.x,i.y,Se),$.map.texture.name=ne.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();let fe=$.getViewportCount();for(let Se=0;Se<fe;Se++){let qe=$.getViewport(Se);o.set(r.x*qe.x,r.y*qe.y,r.x*qe.z,r.y*qe.w),O.viewport(o),$.updateMatrices(ne,Se),n=$.getFrustum(),y(k,D,$.camera,ne,this.type)}$.isPointLightShadow!==!0&&this.type===fi&&m($,D),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(M,S,I)};function m(R,k){let D=e.update(b);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new li(i.x,i.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(k,null,D,u,b,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(k,null,D,f,b,null)}function x(R,k,D,M){let S=null,I=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)S=I;else if(S=D.isPointLight===!0?l:a,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){let O=S.uuid,U=k.uuid,G=c[O];G===void 0&&(G={},c[O]=G);let q=G[U];q===void 0&&(q=S.clone(),G[U]=q,k.addEventListener("dispose",E)),S=q}if(S.visible=k.visible,S.wireframe=k.wireframe,M===fi?S.side=k.shadowSide!==null?k.shadowSide:k.side:S.side=k.shadowSide!==null?k.shadowSide:d[k.side],S.alphaMap=k.alphaMap,S.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,S.map=k.map,S.clipShadows=k.clipShadows,S.clippingPlanes=k.clippingPlanes,S.clipIntersection=k.clipIntersection,S.displacementMap=k.displacementMap,S.displacementScale=k.displacementScale,S.displacementBias=k.displacementBias,S.wireframeLinewidth=k.wireframeLinewidth,S.linewidth=k.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let O=s.properties.get(S);O.light=D}return S}function y(R,k,D,M,S){if(R.visible===!1)return;if(R.layers.test(k.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===fi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);let U=e.update(R),G=R.material;if(Array.isArray(G)){let q=U.groups;for(let J=0,ne=q.length;J<ne;J++){let $=q[J],ce=G[$.materialIndex];if(ce&&ce.visible){let fe=x(R,ce,M,S);R.onBeforeShadow(s,R,k,D,U,fe,$),s.renderBufferDirect(D,null,U,fe,R,$),R.onAfterShadow(s,R,k,D,U,fe,$)}}}else if(G.visible){let q=x(R,G,M,S);R.onBeforeShadow(s,R,k,D,U,q,null),s.renderBufferDirect(D,null,U,q,R,null),R.onAfterShadow(s,R,k,D,U,q,null)}}let O=R.children;for(let U=0,G=O.length;U<G;U++)y(O[U],k,D,M,S)}function E(R){R.target.removeEventListener("dispose",E);for(let D in c){let M=c[D],S=R.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}var ny={[ll]:cl,[hl]:mr,[ul]:fl,[us]:dl,[cl]:ll,[mr]:hl,[fl]:ul,[dl]:us};function iy(s,e){function t(){let F=!1,pe=new Tt,ge=null,Ae=new Tt(0,0,0,0);return{setMask:function(ue){ge!==ue&&!F&&(s.colorMask(ue,ue,ue,ue),ge=ue)},setLocked:function(ue){F=ue},setClear:function(ue,se,Re,rt,ft){ft===!0&&(ue*=rt,se*=rt,Re*=rt),pe.set(ue,se,Re,rt),Ae.equals(pe)===!1&&(s.clearColor(ue,se,Re,rt),Ae.copy(pe))},reset:function(){F=!1,ge=null,Ae.set(-1,0,0,0)}}}function n(){let F=!1,pe=!1,ge=null,Ae=null,ue=null;return{setReversed:function(se){if(pe!==se){let Re=e.get("EXT_clip_control");se?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),pe=se;let rt=ue;ue=null,this.setClear(rt)}},getReversed:function(){return pe},setTest:function(se){se?j(s.DEPTH_TEST):de(s.DEPTH_TEST)},setMask:function(se){ge!==se&&!F&&(s.depthMask(se),ge=se)},setFunc:function(se){if(pe&&(se=ny[se]),Ae!==se){switch(se){case ll:s.depthFunc(s.NEVER);break;case cl:s.depthFunc(s.ALWAYS);break;case hl:s.depthFunc(s.LESS);break;case us:s.depthFunc(s.LEQUAL);break;case ul:s.depthFunc(s.EQUAL);break;case dl:s.depthFunc(s.GEQUAL);break;case mr:s.depthFunc(s.GREATER);break;case fl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ae=se}},setLocked:function(se){F=se},setClear:function(se){ue!==se&&(pe&&(se=1-se),s.clearDepth(se),ue=se)},reset:function(){F=!1,ge=null,Ae=null,ue=null,pe=!1}}}function i(){let F=!1,pe=null,ge=null,Ae=null,ue=null,se=null,Re=null,rt=null,ft=null;return{setTest:function(xt){F||(xt?j(s.STENCIL_TEST):de(s.STENCIL_TEST))},setMask:function(xt){pe!==xt&&!F&&(s.stencilMask(xt),pe=xt)},setFunc:function(xt,an,Pt){(ge!==xt||Ae!==an||ue!==Pt)&&(s.stencilFunc(xt,an,Pt),ge=xt,Ae=an,ue=Pt)},setOp:function(xt,an,Pt){(se!==xt||Re!==an||rt!==Pt)&&(s.stencilOp(xt,an,Pt),se=xt,Re=an,rt=Pt)},setLocked:function(xt){F=xt},setClear:function(xt){ft!==xt&&(s.clearStencil(xt),ft=xt)},reset:function(){F=!1,pe=null,ge=null,Ae=null,ue=null,se=null,Re=null,rt=null,ft=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],v=null,b=!1,g=null,p=null,m=null,x=null,y=null,E=null,R=null,k=new st(0,0,0),D=0,M=!1,S=null,I=null,O=null,U=null,G=null,q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,ne=0,$=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec($)[1]),J=ne>=1):$.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),J=ne>=2);let ce=null,fe={},Se=s.getParameter(s.SCISSOR_BOX),qe=s.getParameter(s.VIEWPORT),Ne=new Tt().fromArray(Se),$e=new Tt().fromArray(qe);function tt(F,pe,ge,Ae){let ue=new Uint8Array(4),se=s.createTexture();s.bindTexture(F,se),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Re=0;Re<ge;Re++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(pe,0,s.RGBA,1,1,Ae,0,s.RGBA,s.UNSIGNED_BYTE,ue):s.texImage2D(pe+Re,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ue);return se}let te={};te[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),te[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),te[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(s.DEPTH_TEST),o.setFunc(us),Ge(!1),me(dh),j(s.CULL_FACE),ut(Pi);function j(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function de(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Me(F,pe){return d[F]!==pe?(s.bindFramebuffer(F,pe),d[F]=pe,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=pe),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=pe),!0):!1}function re(F,pe){let ge=f,Ae=!1;if(F){ge=u.get(pe),ge===void 0&&(ge=[],u.set(pe,ge));let ue=F.textures;if(ge.length!==ue.length||ge[0]!==s.COLOR_ATTACHMENT0){for(let se=0,Re=ue.length;se<Re;se++)ge[se]=s.COLOR_ATTACHMENT0+se;ge.length=ue.length,Ae=!0}}else ge[0]!==s.BACK&&(ge[0]=s.BACK,Ae=!0);Ae&&s.drawBuffers(ge)}function He(F){return v!==F?(s.useProgram(F),v=F,!0):!1}let nt={[Ji]:s.FUNC_ADD,[ud]:s.FUNC_SUBTRACT,[dd]:s.FUNC_REVERSE_SUBTRACT};nt[fd]=s.MIN,nt[pd]=s.MAX;let B={[md]:s.ZERO,[gd]:s.ONE,[vd]:s.SRC_COLOR,[Aa]:s.SRC_ALPHA,[Sd]:s.SRC_ALPHA_SATURATE,[bd]:s.DST_COLOR,[yd]:s.DST_ALPHA,[xd]:s.ONE_MINUS_SRC_COLOR,[Ra]:s.ONE_MINUS_SRC_ALPHA,[Md]:s.ONE_MINUS_DST_COLOR,[_d]:s.ONE_MINUS_DST_ALPHA,[wd]:s.CONSTANT_COLOR,[Ed]:s.ONE_MINUS_CONSTANT_COLOR,[Td]:s.CONSTANT_ALPHA,[Ad]:s.ONE_MINUS_CONSTANT_ALPHA};function ut(F,pe,ge,Ae,ue,se,Re,rt,ft,xt){if(F===Pi){b===!0&&(de(s.BLEND),b=!1);return}if(b===!1&&(j(s.BLEND),b=!0),F!==hd){if(F!==g||xt!==M){if((p!==Ji||y!==Ji)&&(s.blendEquation(s.FUNC_ADD),p=Ji,y=Ji),xt)switch(F){case Ri:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pi:s.blendFunc(s.ONE,s.ONE);break;case ph:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case mh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ri:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ph:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}m=null,x=null,E=null,R=null,k.set(0,0,0),D=0,g=F,M=xt}return}ue=ue||pe,se=se||ge,Re=Re||Ae,(pe!==p||ue!==y)&&(s.blendEquationSeparate(nt[pe],nt[ue]),p=pe,y=ue),(ge!==m||Ae!==x||se!==E||Re!==R)&&(s.blendFuncSeparate(B[ge],B[Ae],B[se],B[Re]),m=ge,x=Ae,E=se,R=Re),(rt.equals(k)===!1||ft!==D)&&(s.blendColor(rt.r,rt.g,rt.b,ft),k.copy(rt),D=ft),g=F,M=!1}function Ve(F,pe){F.side===un?de(s.CULL_FACE):j(s.CULL_FACE);let ge=F.side===mn;pe&&(ge=!ge),Ge(ge),F.blending===Ri&&F.transparent===!1?ut(Pi):ut(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let Ae=F.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ie(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?j(s.SAMPLE_ALPHA_TO_COVERAGE):de(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(F){S!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),S=F)}function me(F){F!==ld?(j(s.CULL_FACE),F!==I&&(F===dh?s.cullFace(s.BACK):F===cd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):de(s.CULL_FACE),I=F}function dt(F){F!==O&&(J&&s.lineWidth(F),O=F)}function Ie(F,pe,ge){F?(j(s.POLYGON_OFFSET_FILL),(U!==pe||G!==ge)&&(s.polygonOffset(pe,ge),U=pe,G=ge)):de(s.POLYGON_OFFSET_FILL)}function Ye(F){F?j(s.SCISSOR_TEST):de(s.SCISSOR_TEST)}function Gt(F){F===void 0&&(F=s.TEXTURE0+q-1),ce!==F&&(s.activeTexture(F),ce=F)}function gt(F,pe,ge){ge===void 0&&(ce===null?ge=s.TEXTURE0+q-1:ge=ce);let Ae=fe[ge];Ae===void 0&&(Ae={type:void 0,texture:void 0},fe[ge]=Ae),(Ae.type!==F||Ae.texture!==pe)&&(ce!==ge&&(s.activeTexture(ge),ce=ge),s.bindTexture(F,pe||te[F]),Ae.type=F,Ae.texture=pe)}function N(){let F=fe[ce];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function T(){try{s.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function K(){try{s.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{s.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(){try{s.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{s.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Oe(){try{s.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{s.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{s.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ke(){try{s.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{s.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(F){Ne.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),Ne.copy(F))}function Ke(F){$e.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),$e.copy(F))}function ze(F,pe){let ge=c.get(pe);ge===void 0&&(ge=new WeakMap,c.set(pe,ge));let Ae=ge.get(F);Ae===void 0&&(Ae=s.getUniformBlockIndex(pe,F.name),ge.set(F,Ae))}function Te(F,pe){let Ae=c.get(pe).get(F);l.get(pe)!==Ae&&(s.uniformBlockBinding(pe,Ae,F.__bindingPointIndex),l.set(pe,Ae))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ce=null,fe={},d={},u=new WeakMap,f=[],v=null,b=!1,g=null,p=null,m=null,x=null,y=null,E=null,R=null,k=new st(0,0,0),D=0,M=!1,S=null,I=null,O=null,U=null,G=null,Ne.set(0,0,s.canvas.width,s.canvas.height),$e.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:de,bindFramebuffer:Me,drawBuffers:re,useProgram:He,setBlending:ut,setMaterial:Ve,setFlipSided:Ge,setCullFace:me,setLineWidth:dt,setPolygonOffset:Ie,setScissorTest:Ye,activeTexture:Gt,bindTexture:gt,unbindTexture:N,compressedTexImage2D:T,compressedTexImage3D:K,texImage2D:ke,texImage3D:ye,updateUBOMapping:ze,uniformBlockBinding:Te,texStorage2D:le,texStorage3D:Pe,texSubImage2D:oe,texSubImage3D:he,compressedTexSubImage2D:ie,compressedTexSubImage3D:Oe,scissor:we,viewport:Ke,reset:Fe}}function sy(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(N,T){return f?new OffscreenCanvas(N,T):oo("canvas")}function b(N,T,K){let oe=1,he=gt(N);if((he.width>K||he.height>K)&&(oe=K/Math.max(he.width,he.height)),oe<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){let ie=Math.floor(oe*he.width),Oe=Math.floor(oe*he.height);d===void 0&&(d=v(ie,Oe));let le=T?v(ie,Oe):d;return le.width=ie,le.height=Oe,le.getContext("2d").drawImage(N,0,0,ie,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+ie+"x"+Oe+")."),le}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),N;return N}function g(N){return N.generateMipmaps}function p(N){s.generateMipmap(N)}function m(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(N,T,K,oe,he=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ie=T;if(T===s.RED&&(K===s.FLOAT&&(ie=s.R32F),K===s.HALF_FLOAT&&(ie=s.R16F),K===s.UNSIGNED_BYTE&&(ie=s.R8)),T===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(ie=s.R8UI),K===s.UNSIGNED_SHORT&&(ie=s.R16UI),K===s.UNSIGNED_INT&&(ie=s.R32UI),K===s.BYTE&&(ie=s.R8I),K===s.SHORT&&(ie=s.R16I),K===s.INT&&(ie=s.R32I)),T===s.RG&&(K===s.FLOAT&&(ie=s.RG32F),K===s.HALF_FLOAT&&(ie=s.RG16F),K===s.UNSIGNED_BYTE&&(ie=s.RG8)),T===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(ie=s.RG8UI),K===s.UNSIGNED_SHORT&&(ie=s.RG16UI),K===s.UNSIGNED_INT&&(ie=s.RG32UI),K===s.BYTE&&(ie=s.RG8I),K===s.SHORT&&(ie=s.RG16I),K===s.INT&&(ie=s.RG32I)),T===s.RGB_INTEGER&&(K===s.UNSIGNED_BYTE&&(ie=s.RGB8UI),K===s.UNSIGNED_SHORT&&(ie=s.RGB16UI),K===s.UNSIGNED_INT&&(ie=s.RGB32UI),K===s.BYTE&&(ie=s.RGB8I),K===s.SHORT&&(ie=s.RGB16I),K===s.INT&&(ie=s.RGB32I)),T===s.RGBA_INTEGER&&(K===s.UNSIGNED_BYTE&&(ie=s.RGBA8UI),K===s.UNSIGNED_SHORT&&(ie=s.RGBA16UI),K===s.UNSIGNED_INT&&(ie=s.RGBA32UI),K===s.BYTE&&(ie=s.RGBA8I),K===s.SHORT&&(ie=s.RGBA16I),K===s.INT&&(ie=s.RGBA32I)),T===s.RGB&&(K===s.UNSIGNED_INT_5_9_9_9_REV&&(ie=s.RGB9_E5),K===s.UNSIGNED_INT_10F_11F_11F_REV&&(ie=s.R11F_G11F_B10F)),T===s.RGBA){let Oe=he?so:Mt.getTransfer(oe);K===s.FLOAT&&(ie=s.RGBA32F),K===s.HALF_FLOAT&&(ie=s.RGBA16F),K===s.UNSIGNED_BYTE&&(ie=Oe===Rt?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(ie=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(ie=s.RGB5_A1)}return(ie===s.R16F||ie===s.R32F||ie===s.RG16F||ie===s.RG32F||ie===s.RGBA16F||ie===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(N,T){let K;return N?T===null||T===ss||T===xr?K=s.DEPTH24_STENCIL8:T===ni?K=s.DEPTH32F_STENCIL8:T===gr&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ss||T===xr?K=s.DEPTH_COMPONENT24:T===ni?K=s.DEPTH_COMPONENT32F:T===gr&&(K=s.DEPTH_COMPONENT16),K}function E(N,T){return g(N)===!0||N.isFramebufferTexture&&N.minFilter!==Pn&&N.minFilter!==jn?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function R(N){let T=N.target;T.removeEventListener("dispose",R),D(T),T.isVideoTexture&&h.delete(T)}function k(N){let T=N.target;T.removeEventListener("dispose",k),S(T)}function D(N){let T=n.get(N);if(T.__webglInit===void 0)return;let K=N.source,oe=u.get(K);if(oe){let he=oe[T.__cacheKey];he.usedTimes--,he.usedTimes===0&&M(N),Object.keys(oe).length===0&&u.delete(K)}n.remove(N)}function M(N){let T=n.get(N);s.deleteTexture(T.__webglTexture);let K=N.source,oe=u.get(K);delete oe[T.__cacheKey],o.memory.textures--}function S(N){let T=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(T.__webglFramebuffer[oe]))for(let he=0;he<T.__webglFramebuffer[oe].length;he++)s.deleteFramebuffer(T.__webglFramebuffer[oe][he]);else s.deleteFramebuffer(T.__webglFramebuffer[oe]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[oe])}else{if(Array.isArray(T.__webglFramebuffer))for(let oe=0;oe<T.__webglFramebuffer.length;oe++)s.deleteFramebuffer(T.__webglFramebuffer[oe]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let oe=0;oe<T.__webglColorRenderbuffer.length;oe++)T.__webglColorRenderbuffer[oe]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[oe]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let K=N.textures;for(let oe=0,he=K.length;oe<he;oe++){let ie=n.get(K[oe]);ie.__webglTexture&&(s.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(K[oe])}n.remove(N)}let I=0;function O(){I=0}function U(){let N=I;return N>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+i.maxTextures),I+=1,N}function G(N){let T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function q(N,T){let K=n.get(N);if(N.isVideoTexture&&Ye(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&K.__version!==N.version){let oe=N.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(K,N,T);return}}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+T)}function J(N,T){let K=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){te(K,N,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+T)}function ne(N,T){let K=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){te(K,N,T);return}t.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+T)}function $(N,T){let K=n.get(N);if(N.version>0&&K.__version!==N.version){j(K,N,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+T)}let ce={[ds]:s.REPEAT,[Zi]:s.CLAMP_TO_EDGE,[Ca]:s.MIRRORED_REPEAT},fe={[Pn]:s.NEAREST,[Ud]:s.NEAREST_MIPMAP_NEAREST,[Fo]:s.NEAREST_MIPMAP_LINEAR,[jn]:s.LINEAR,[xl]:s.LINEAR_MIPMAP_NEAREST,[is]:s.LINEAR_MIPMAP_LINEAR},Se={[zd]:s.NEVER,[qd]:s.ALWAYS,[Hd]:s.LESS,[Eh]:s.LEQUAL,[Vd]:s.EQUAL,[Xd]:s.GEQUAL,[Gd]:s.GREATER,[Wd]:s.NOTEQUAL};function qe(N,T){if(T.type===ni&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===jn||T.magFilter===xl||T.magFilter===Fo||T.magFilter===is||T.minFilter===jn||T.minFilter===xl||T.minFilter===Fo||T.minFilter===is)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,ce[T.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,ce[T.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,ce[T.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,fe[T.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,fe[T.minFilter]),T.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,Se[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pn||T.minFilter!==Fo&&T.minFilter!==is||T.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let K=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ne(N,T){let K=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",R));let oe=T.source,he=u.get(oe);he===void 0&&(he={},u.set(oe,he));let ie=G(T);if(ie!==N.__cacheKey){he[ie]===void 0&&(he[ie]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,K=!0),he[ie].usedTimes++;let Oe=he[N.__cacheKey];Oe!==void 0&&(he[N.__cacheKey].usedTimes--,Oe.usedTimes===0&&M(T)),N.__cacheKey=ie,N.__webglTexture=he[ie].texture}return K}function $e(N,T,K){return Math.floor(Math.floor(N/K)/T)}function tt(N,T,K,oe){let ie=N.updateRanges;if(ie.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,T.width,T.height,K,oe,T.data);else{ie.sort((ye,we)=>ye.start-we.start);let Oe=0;for(let ye=1;ye<ie.length;ye++){let we=ie[Oe],Ke=ie[ye],ze=we.start+we.count,Te=$e(Ke.start,T.width,4),Fe=$e(we.start,T.width,4);Ke.start<=ze+1&&Te===Fe&&$e(Ke.start+Ke.count-1,T.width,4)===Te?we.count=Math.max(we.count,Ke.start+Ke.count-we.start):(++Oe,ie[Oe]=Ke)}ie.length=Oe+1;let le=s.getParameter(s.UNPACK_ROW_LENGTH),Pe=s.getParameter(s.UNPACK_SKIP_PIXELS),ke=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,T.width);for(let ye=0,we=ie.length;ye<we;ye++){let Ke=ie[ye],ze=Math.floor(Ke.start/4),Te=Math.ceil(Ke.count/4),Fe=ze%T.width,F=Math.floor(ze/T.width),pe=Te,ge=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),s.pixelStorei(s.UNPACK_SKIP_ROWS,F),t.texSubImage2D(s.TEXTURE_2D,0,Fe,F,pe,ge,K,oe,T.data)}N.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,le),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Pe),s.pixelStorei(s.UNPACK_SKIP_ROWS,ke)}}function te(N,T,K){let oe=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(oe=s.TEXTURE_3D);let he=Ne(N,T),ie=T.source;t.bindTexture(oe,N.__webglTexture,s.TEXTURE0+K);let Oe=n.get(ie);if(ie.version!==Oe.__version||he===!0){t.activeTexture(s.TEXTURE0+K);let le=Mt.getPrimaries(Mt.workingColorSpace),Pe=T.colorSpace===Li?null:Mt.getPrimaries(T.colorSpace),ke=T.colorSpace===Li||le===Pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let ye=b(T.image,!1,i.maxTextureSize);ye=Gt(T,ye);let we=r.convert(T.format,T.colorSpace),Ke=r.convert(T.type),ze=x(T.internalFormat,we,Ke,T.colorSpace,T.isVideoTexture);qe(oe,T);let Te,Fe=T.mipmaps,F=T.isVideoTexture!==!0,pe=Oe.__version===void 0||he===!0,ge=ie.dataReady,Ae=E(T,ye);if(T.isDepthTexture)ze=y(T.format===yr,T.type),pe&&(F?t.texStorage2D(s.TEXTURE_2D,1,ze,ye.width,ye.height):t.texImage2D(s.TEXTURE_2D,0,ze,ye.width,ye.height,0,we,Ke,null));else if(T.isDataTexture)if(Fe.length>0){F&&pe&&t.texStorage2D(s.TEXTURE_2D,Ae,ze,Fe[0].width,Fe[0].height);for(let ue=0,se=Fe.length;ue<se;ue++)Te=Fe[ue],F?ge&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Te.width,Te.height,we,Ke,Te.data):t.texImage2D(s.TEXTURE_2D,ue,ze,Te.width,Te.height,0,we,Ke,Te.data);T.generateMipmaps=!1}else F?(pe&&t.texStorage2D(s.TEXTURE_2D,Ae,ze,ye.width,ye.height),ge&&tt(T,ye,we,Ke)):t.texImage2D(s.TEXTURE_2D,0,ze,ye.width,ye.height,0,we,Ke,ye.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){F&&pe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ae,ze,Fe[0].width,Fe[0].height,ye.depth);for(let ue=0,se=Fe.length;ue<se;ue++)if(Te=Fe[ue],T.format!==Vn)if(we!==null)if(F){if(ge)if(T.layerUpdates.size>0){let Re=Lh(Te.width,Te.height,T.format,T.type);for(let rt of T.layerUpdates){let ft=Te.data.subarray(rt*Re/Te.data.BYTES_PER_ELEMENT,(rt+1)*Re/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,rt,Te.width,Te.height,1,we,ft)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Te.width,Te.height,ye.depth,we,Te.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ue,ze,Te.width,Te.height,ye.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ge&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Te.width,Te.height,ye.depth,we,Ke,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ue,ze,Te.width,Te.height,ye.depth,0,we,Ke,Te.data)}else{F&&pe&&t.texStorage2D(s.TEXTURE_2D,Ae,ze,Fe[0].width,Fe[0].height);for(let ue=0,se=Fe.length;ue<se;ue++)Te=Fe[ue],T.format!==Vn?we!==null?F?ge&&t.compressedTexSubImage2D(s.TEXTURE_2D,ue,0,0,Te.width,Te.height,we,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,ue,ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ge&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,Te.width,Te.height,we,Ke,Te.data):t.texImage2D(s.TEXTURE_2D,ue,ze,Te.width,Te.height,0,we,Ke,Te.data)}else if(T.isDataArrayTexture)if(F){if(pe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ae,ze,ye.width,ye.height,ye.depth),ge)if(T.layerUpdates.size>0){let ue=Lh(ye.width,ye.height,T.format,T.type);for(let se of T.layerUpdates){let Re=ye.data.subarray(se*ue/ye.data.BYTES_PER_ELEMENT,(se+1)*ue/ye.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,se,ye.width,ye.height,1,we,Ke,Re)}T.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,we,Ke,ye.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ze,ye.width,ye.height,ye.depth,0,we,Ke,ye.data);else if(T.isData3DTexture)F?(pe&&t.texStorage3D(s.TEXTURE_3D,Ae,ze,ye.width,ye.height,ye.depth),ge&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,we,Ke,ye.data)):t.texImage3D(s.TEXTURE_3D,0,ze,ye.width,ye.height,ye.depth,0,we,Ke,ye.data);else if(T.isFramebufferTexture){if(pe)if(F)t.texStorage2D(s.TEXTURE_2D,Ae,ze,ye.width,ye.height);else{let ue=ye.width,se=ye.height;for(let Re=0;Re<Ae;Re++)t.texImage2D(s.TEXTURE_2D,Re,ze,ue,se,0,we,Ke,null),ue>>=1,se>>=1}}else if(Fe.length>0){if(F&&pe){let ue=gt(Fe[0]);t.texStorage2D(s.TEXTURE_2D,Ae,ze,ue.width,ue.height)}for(let ue=0,se=Fe.length;ue<se;ue++)Te=Fe[ue],F?ge&&t.texSubImage2D(s.TEXTURE_2D,ue,0,0,we,Ke,Te):t.texImage2D(s.TEXTURE_2D,ue,ze,we,Ke,Te);T.generateMipmaps=!1}else if(F){if(pe){let ue=gt(ye);t.texStorage2D(s.TEXTURE_2D,Ae,ze,ue.width,ue.height)}ge&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,we,Ke,ye)}else t.texImage2D(s.TEXTURE_2D,0,ze,we,Ke,ye);g(T)&&p(oe),Oe.__version=ie.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function j(N,T,K){if(T.image.length!==6)return;let oe=Ne(N,T),he=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+K);let ie=n.get(he);if(he.version!==ie.__version||oe===!0){t.activeTexture(s.TEXTURE0+K);let Oe=Mt.getPrimaries(Mt.workingColorSpace),le=T.colorSpace===Li?null:Mt.getPrimaries(T.colorSpace),Pe=T.colorSpace===Li||Oe===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let ke=T.isCompressedTexture||T.image[0].isCompressedTexture,ye=T.image[0]&&T.image[0].isDataTexture,we=[];for(let se=0;se<6;se++)!ke&&!ye?we[se]=b(T.image[se],!0,i.maxCubemapSize):we[se]=ye?T.image[se].image:T.image[se],we[se]=Gt(T,we[se]);let Ke=we[0],ze=r.convert(T.format,T.colorSpace),Te=r.convert(T.type),Fe=x(T.internalFormat,ze,Te,T.colorSpace),F=T.isVideoTexture!==!0,pe=ie.__version===void 0||oe===!0,ge=he.dataReady,Ae=E(T,Ke);qe(s.TEXTURE_CUBE_MAP,T);let ue;if(ke){F&&pe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ae,Fe,Ke.width,Ke.height);for(let se=0;se<6;se++){ue=we[se].mipmaps;for(let Re=0;Re<ue.length;Re++){let rt=ue[Re];T.format!==Vn?ze!==null?F?ge&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re,0,0,rt.width,rt.height,ze,rt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re,Fe,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re,0,0,rt.width,rt.height,ze,Te,rt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re,Fe,rt.width,rt.height,0,ze,Te,rt.data)}}}else{if(ue=T.mipmaps,F&&pe){ue.length>0&&Ae++;let se=gt(we[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ae,Fe,se.width,se.height)}for(let se=0;se<6;se++)if(ye){F?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,we[se].width,we[se].height,ze,Te,we[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,we[se].width,we[se].height,0,ze,Te,we[se].data);for(let Re=0;Re<ue.length;Re++){let ft=ue[Re].image[se].image;F?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re+1,0,0,ft.width,ft.height,ze,Te,ft.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re+1,Fe,ft.width,ft.height,0,ze,Te,ft.data)}}else{F?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ze,Te,we[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,ze,Te,we[se]);for(let Re=0;Re<ue.length;Re++){let rt=ue[Re];F?ge&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re+1,0,0,ze,Te,rt.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re+1,Fe,ze,Te,rt.image[se])}}}g(T)&&p(s.TEXTURE_CUBE_MAP),ie.__version=he.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function de(N,T,K,oe,he,ie){let Oe=r.convert(K.format,K.colorSpace),le=r.convert(K.type),Pe=x(K.internalFormat,Oe,le,K.colorSpace),ke=n.get(T),ye=n.get(K);if(ye.__renderTarget=T,!ke.__hasExternalTextures){let we=Math.max(1,T.width>>ie),Ke=Math.max(1,T.height>>ie);he===s.TEXTURE_3D||he===s.TEXTURE_2D_ARRAY?t.texImage3D(he,ie,Pe,we,Ke,T.depth,0,Oe,le,null):t.texImage2D(he,ie,Pe,we,Ke,0,Oe,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,N),Ie(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,he,ye.__webglTexture,0,dt(T)):(he===s.TEXTURE_2D||he>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,he,ye.__webglTexture,ie),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Me(N,T,K){if(s.bindRenderbuffer(s.RENDERBUFFER,N),T.depthBuffer){let oe=T.depthTexture,he=oe&&oe.isDepthTexture?oe.type:null,ie=y(T.stencilBuffer,he),Oe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=dt(T);Ie(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,ie,T.width,T.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,ie,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,ie,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Oe,s.RENDERBUFFER,N)}else{let oe=T.textures;for(let he=0;he<oe.length;he++){let ie=oe[he],Oe=r.convert(ie.format,ie.colorSpace),le=r.convert(ie.type),Pe=x(ie.internalFormat,Oe,le,ie.colorSpace),ke=dt(T);K&&Ie(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Pe,T.width,T.height):Ie(T)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke,Pe,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Pe,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function re(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let oe=n.get(T.depthTexture);oe.__renderTarget=T,(!oe.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),q(T.depthTexture,0);let he=oe.__webglTexture,ie=dt(T);if(T.depthTexture.format===tr)Ie(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,he,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,he,0);else if(T.depthTexture.format===yr)Ie(T)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,he,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function He(N){let T=n.get(N),K=N.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==N.depthTexture){let oe=N.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),oe){let he=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,oe.removeEventListener("dispose",he)};oe.addEventListener("dispose",he),T.__depthDisposeCallback=he}T.__boundDepthTexture=oe}if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");let oe=N.texture.mipmaps;oe&&oe.length>0?re(T.__webglFramebuffer[0],N):re(T.__webglFramebuffer,N)}else if(K){T.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[oe]),T.__webglDepthbuffer[oe]===void 0)T.__webglDepthbuffer[oe]=s.createRenderbuffer(),Me(T.__webglDepthbuffer[oe],N,!1);else{let he=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=T.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,ie)}}else{let oe=N.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),Me(T.__webglDepthbuffer,N,!1);else{let he=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,ie)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(N,T,K){let oe=n.get(N);T!==void 0&&de(oe.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&He(N)}function B(N){let T=N.texture,K=n.get(N),oe=n.get(T);N.addEventListener("dispose",k);let he=N.textures,ie=N.isWebGLCubeRenderTarget===!0,Oe=he.length>1;if(Oe||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=T.version,o.memory.textures++),ie){K.__webglFramebuffer=[];for(let le=0;le<6;le++)if(T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer[le]=[];for(let Pe=0;Pe<T.mipmaps.length;Pe++)K.__webglFramebuffer[le][Pe]=s.createFramebuffer()}else K.__webglFramebuffer[le]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer=[];for(let le=0;le<T.mipmaps.length;le++)K.__webglFramebuffer[le]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(Oe)for(let le=0,Pe=he.length;le<Pe;le++){let ke=n.get(he[le]);ke.__webglTexture===void 0&&(ke.__webglTexture=s.createTexture(),o.memory.textures++)}if(N.samples>0&&Ie(N)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let le=0;le<he.length;le++){let Pe=he[le];K.__webglColorRenderbuffer[le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[le]);let ke=r.convert(Pe.format,Pe.colorSpace),ye=r.convert(Pe.type),we=x(Pe.internalFormat,ke,ye,Pe.colorSpace,N.isXRRenderTarget===!0),Ke=dt(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ke,we,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,K.__webglColorRenderbuffer[le])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),Me(K.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),qe(s.TEXTURE_CUBE_MAP,T);for(let le=0;le<6;le++)if(T.mipmaps&&T.mipmaps.length>0)for(let Pe=0;Pe<T.mipmaps.length;Pe++)de(K.__webglFramebuffer[le][Pe],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,Pe);else de(K.__webglFramebuffer[le],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(T)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let le=0,Pe=he.length;le<Pe;le++){let ke=he[le],ye=n.get(ke),we=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(we=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(we,ye.__webglTexture),qe(we,ke),de(K.__webglFramebuffer,N,ke,s.COLOR_ATTACHMENT0+le,we,0),g(ke)&&p(we)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(le=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(le,oe.__webglTexture),qe(le,T),T.mipmaps&&T.mipmaps.length>0)for(let Pe=0;Pe<T.mipmaps.length;Pe++)de(K.__webglFramebuffer[Pe],N,T,s.COLOR_ATTACHMENT0,le,Pe);else de(K.__webglFramebuffer,N,T,s.COLOR_ATTACHMENT0,le,0);g(T)&&p(le),t.unbindTexture()}N.depthBuffer&&He(N)}function ut(N){let T=N.textures;for(let K=0,oe=T.length;K<oe;K++){let he=T[K];if(g(he)){let ie=m(N),Oe=n.get(he).__webglTexture;t.bindTexture(ie,Oe),p(ie),t.unbindTexture()}}}let Ve=[],Ge=[];function me(N){if(N.samples>0){if(Ie(N)===!1){let T=N.textures,K=N.width,oe=N.height,he=s.COLOR_BUFFER_BIT,ie=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Oe=n.get(N),le=T.length>1;if(le)for(let ke=0;ke<T.length;ke++)t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);let Pe=N.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let ke=0;ke<T.length;ke++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(he|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(he|=s.STENCIL_BUFFER_BIT)),le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[ke]);let ye=n.get(T[ke]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ye,0)}s.blitFramebuffer(0,0,K,oe,0,0,K,oe,he,s.NEAREST),l===!0&&(Ve.length=0,Ge.length=0,Ve.push(s.COLOR_ATTACHMENT0+ke),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ve.push(ie),Ge.push(ie),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ge)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),le)for(let ke=0;ke<T.length;ke++){t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.RENDERBUFFER,Oe.__webglColorRenderbuffer[ke]);let ye=n.get(T[ke]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ke,s.TEXTURE_2D,ye,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&l){let T=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function dt(N){return Math.min(i.maxSamples,N.samples)}function Ie(N){let T=n.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ye(N){let T=o.render.frame;h.get(N)!==T&&(h.set(N,T),N.update())}function Gt(N,T){let K=N.colorSpace,oe=N.format,he=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||K!==fs&&K!==Li&&(Mt.getTransfer(K)===Rt?(oe!==Vn||he!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),T}function gt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=J,this.setTexture3D=ne,this.setTextureCube=$,this.rebindTextures=nt,this.setupRenderTarget=B,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Ie}function ry(s,e){function t(n,i=Li){let r,o=Mt.getTransfer(i);if(n===ti)return s.UNSIGNED_BYTE;if(n===_l)return s.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===yh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===vh)return s.BYTE;if(n===xh)return s.SHORT;if(n===gr)return s.UNSIGNED_SHORT;if(n===yl)return s.INT;if(n===ss)return s.UNSIGNED_INT;if(n===ni)return s.FLOAT;if(n===vr)return s.HALF_FLOAT;if(n===bh)return s.ALPHA;if(n===Mh)return s.RGB;if(n===Vn)return s.RGBA;if(n===tr)return s.DEPTH_COMPONENT;if(n===yr)return s.DEPTH_STENCIL;if(n===Ml)return s.RED;if(n===Sl)return s.RED_INTEGER;if(n===Sh)return s.RG;if(n===wl)return s.RG_INTEGER;if(n===El)return s.RGBA_INTEGER;if(n===Uo||n===No||n===Oo||n===Bo)if(o===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Tl||n===Al||n===Rl||n===Cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Il||n===Pl||n===Ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Il||n===Pl)return o===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ll)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dl||n===kl||n===Fl||n===Ul||n===Nl||n===Ol||n===Bl||n===zl||n===Hl||n===Vl||n===Gl||n===Wl||n===Xl||n===ql)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Dl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ul)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ol)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ql)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yl||n===$l||n===Kl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Yl)return o===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$l)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Kl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zl||n===Jl||n===jl||n===Ql)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ql)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var oy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ay=`
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

}`,Xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new yo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new en({vertexShader:oy,fragmentShader:ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends Ci{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,v=null,b=typeof XRWebGLBinding<"u",g=new Xh,p={},m=t.getContextAttributes(),x=null,y=null,E=[],R=[],k=new Ce,D=null,M=new hn;M.viewport=new Tt;let S=new hn;S.viewport=new Tt;let I=[M,S],O=new ol,U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let j=E[te];return j===void 0&&(j=new rr,E[te]=j),j.getTargetRaySpace()},this.getControllerGrip=function(te){let j=E[te];return j===void 0&&(j=new rr,E[te]=j),j.getGripSpace()},this.getHand=function(te){let j=E[te];return j===void 0&&(j=new rr,E[te]=j),j.getHandSpace()};function q(te){let j=R.indexOf(te.inputSource);if(j===-1)return;let de=E[j];de!==void 0&&(de.update(te.inputSource,te.frame,c||o),de.dispatchEvent({type:te.type,data:te.inputSource}))}function J(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",ne);for(let te=0;te<E.length;te++){let j=R[te];j!==null&&(R[te]=null,E[te].disconnect(j))}U=null,G=null,g.reset();for(let te in p)delete p[te];e.setRenderTarget(x),f=null,u=null,d=null,i=null,y=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&b&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",J),i.addEventListener("inputsourceschange",ne),m.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(k),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Me=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=m.stencil?yr:tr,Me=m.stencil?xr:ss);let He={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(He),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new li(u.textureWidth,u.textureHeight,{format:Vn,type:ti,depthTexture:new xo(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let de={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new li(f.framebufferWidth,f.framebufferHeight,{format:Vn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(te){for(let j=0;j<te.removed.length;j++){let de=te.removed[j],Me=R.indexOf(de);Me>=0&&(R[Me]=null,E[Me].disconnect(de))}for(let j=0;j<te.added.length;j++){let de=te.added[j],Me=R.indexOf(de);if(Me===-1){for(let He=0;He<E.length;He++)if(He>=R.length){R.push(de),Me=He;break}else if(R[He]===null){R[He]=de,Me=He;break}if(Me===-1)break}let re=E[Me];re&&re.connect(de)}}let $=new H,ce=new H;function fe(te,j,de){$.setFromMatrixPosition(j.matrixWorld),ce.setFromMatrixPosition(de.matrixWorld);let Me=$.distanceTo(ce),re=j.projectionMatrix.elements,He=de.projectionMatrix.elements,nt=re[14]/(re[10]-1),B=re[14]/(re[10]+1),ut=(re[9]+1)/re[5],Ve=(re[9]-1)/re[5],Ge=(re[8]-1)/re[0],me=(He[8]+1)/He[0],dt=nt*Ge,Ie=nt*me,Ye=Me/(-Ge+me),Gt=Ye*-Ge;if(j.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Gt),te.translateZ(Ye),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),re[10]===-1)te.projectionMatrix.copy(j.projectionMatrix),te.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let gt=nt+Ye,N=B+Ye,T=dt-Gt,K=Ie+(Me-Gt),oe=ut*B/N*gt,he=Ve*B/N*gt;te.projectionMatrix.makePerspective(T,K,oe,he,gt,N),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function Se(te,j){j===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(j.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let j=te.near,de=te.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(de=g.depthFar)),O.near=S.near=M.near=j,O.far=S.far=M.far=de,(U!==O.near||G!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),U=O.near,G=O.far),O.layers.mask=te.layers.mask|6,M.layers.mask=O.layers.mask&3,S.layers.mask=O.layers.mask&5;let Me=te.parent,re=O.cameras;Se(O,Me);for(let He=0;He<re.length;He++)Se(re[He],Me);re.length===2?fe(O,M,S):O.projectionMatrix.copy(M.projectionMatrix),qe(te,O,Me)};function qe(te,j,de){de===null?te.matrix.copy(j.matrixWorld):(te.matrix.copy(de.matrixWorld),te.matrix.invert(),te.matrix.multiply(j.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(j.projectionMatrix),te.projectionMatrixInverse.copy(j.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=La*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(te){l=te,u!==null&&(u.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(te){return p[te]};let Ne=null;function $e(te,j){if(h=j.getViewerPose(c||o),v=j,h!==null){let de=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Me=!1;de.length!==O.cameras.length&&(O.cameras.length=0,Me=!0);for(let B=0;B<de.length;B++){let ut=de[B],Ve=null;if(f!==null)Ve=f.getViewport(ut);else{let me=d.getViewSubImage(u,ut);Ve=me.viewport,B===0&&(e.setRenderTargetTextures(y,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(y))}let Ge=I[B];Ge===void 0&&(Ge=new hn,Ge.layers.enable(B),Ge.viewport=new Tt,I[B]=Ge),Ge.matrix.fromArray(ut.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(ut.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),B===0&&(O.matrix.copy(Ge.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Me===!0&&O.cameras.push(Ge)}let re=i.enabledFeatures;if(re&&re.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&b){d=n.getBinding();let B=d.getDepthInformation(de[0]);B&&B.isValid&&B.texture&&g.init(B,i.renderState)}if(re&&re.includes("camera-access")&&b){e.state.unbindTexture(),d=n.getBinding();for(let B=0;B<de.length;B++){let ut=de[B].camera;if(ut){let Ve=p[ut];Ve||(Ve=new yo,p[ut]=Ve);let Ge=d.getCameraImage(ut);Ve.sourceTexture=Ge}}}}for(let de=0;de<E.length;de++){let Me=R[de],re=E[de];Me!==null&&re!==void 0&&re.update(Me,j,c||o)}Ne&&Ne(te,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),v=null}let tt=new Af;tt.setAnimationLoop($e),this.setAnimationLoop=function(te){Ne=te},this.dispose=function(){}}},_s=new Hn,ly=new St;function cy(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Rh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,m,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),v(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),b(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,m,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===mn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===mn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let m=e.get(p),x=m.envMap,y=m.envMapRotation;x&&(g.envMap.value=x,_s.copy(y),_s.x*=-1,_s.y*=-1,_s.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(_s.y*=-1,_s.z*=-1),g.envMapRotation.value.setFromMatrix4(ly.makeRotationFromEuler(_s)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,m,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*m,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,m){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===mn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,p){p.matcap&&(g.matcap.value=p.matcap)}function b(g,p){let m=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hy(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,x){let y=x.program;n.uniformBlockBinding(m,y)}function c(m,x){let y=i[m.id];y===void 0&&(v(m),y=h(m),i[m.id]=y,m.addEventListener("dispose",g));let E=x.program;n.updateUBOMapping(m,E);let R=e.render.frame;r[m.id]!==R&&(u(m),r[m.id]=R)}function h(m){let x=d();m.__bindingPointIndex=x;let y=s.createBuffer(),E=m.__size,R=m.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,E,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,y),y}function d(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let x=i[m.id],y=m.uniforms,E=m.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let R=0,k=y.length;R<k;R++){let D=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,S=D.length;M<S;M++){let I=D[M];if(f(I,R,M,E)===!0){let O=I.__offset,U=Array.isArray(I.value)?I.value:[I.value],G=0;for(let q=0;q<U.length;q++){let J=U[q],ne=b(J);typeof J=="number"||typeof J=="boolean"?(I.__data[0]=J,s.bufferSubData(s.UNIFORM_BUFFER,O+G,I.__data)):J.isMatrix3?(I.__data[0]=J.elements[0],I.__data[1]=J.elements[1],I.__data[2]=J.elements[2],I.__data[3]=0,I.__data[4]=J.elements[3],I.__data[5]=J.elements[4],I.__data[6]=J.elements[5],I.__data[7]=0,I.__data[8]=J.elements[6],I.__data[9]=J.elements[7],I.__data[10]=J.elements[8],I.__data[11]=0):(J.toArray(I.__data,G),G+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(m,x,y,E){let R=m.value,k=x+"_"+y;if(E[k]===void 0)return typeof R=="number"||typeof R=="boolean"?E[k]=R:E[k]=R.clone(),!0;{let D=E[k];if(typeof R=="number"||typeof R=="boolean"){if(D!==R)return E[k]=R,!0}else if(D.equals(R)===!1)return D.copy(R),!0}return!1}function v(m){let x=m.uniforms,y=0,E=16;for(let k=0,D=x.length;k<D;k++){let M=Array.isArray(x[k])?x[k]:[x[k]];for(let S=0,I=M.length;S<I;S++){let O=M[S],U=Array.isArray(O.value)?O.value:[O.value];for(let G=0,q=U.length;G<q;G++){let J=U[G],ne=b(J),$=y%E,ce=$%ne.boundary,fe=$+ce;y+=ce,fe!==0&&E-fe<ne.storage&&(y+=E-fe),O.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=ne.storage}}}let R=y%E;return R>0&&(y+=E-R),m.__size=y,m.__cache={},this}function b(m){let x={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(x.boundary=4,x.storage=4):m.isVector2?(x.boundary=8,x.storage=8):m.isVector3||m.isColor?(x.boundary=16,x.storage=12):m.isVector4?(x.boundary=16,x.storage=16):m.isMatrix3?(x.boundary=48,x.storage=48):m.isMatrix4?(x.boundary=64,x.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),x}function g(m){let x=m.target;x.removeEventListener("dispose",g);let y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(let m in i)s.deleteBuffer(i[m]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var oc=class{constructor(e={}){let{canvas:t=Yd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let v=new Uint32Array(4),b=new Int32Array(4),g=null,p=null,m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,E=!1;this._outputColorSpace=Vt;let R=0,k=0,D=null,M=-1,S=null,I=new Tt,O=new Tt,U=null,G=new st(0),q=0,J=t.width,ne=t.height,$=1,ce=null,fe=null,Se=new Tt(0,0,J,ne),qe=new Tt(0,0,J,ne),Ne=!1,$e=new ar,tt=!1,te=!1,j=new St,de=new H,Me=new Tt,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function nt(){return D===null?$:1}let B=n;function ut(C,Y){return t.getContext(C,Y)}try{let C={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",ue,!1),B===null){let Y="webgl2";if(B=ut(Y,C),B===null)throw ut(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ve,Ge,me,dt,Ie,Ye,Gt,gt,N,T,K,oe,he,ie,Oe,le,Pe,ke,ye,we,Ke,ze,Te,Fe;function F(){Ve=new Rv(B),Ve.init(),ze=new ry(B,Ve),Ge=new bv(B,Ve,e,ze),me=new iy(B,Ve),Ge.reversedDepthBuffer&&u&&me.buffers.depth.setReversed(!0),dt=new Pv(B),Ie=new Wx,Ye=new sy(B,Ve,me,Ie,Ge,ze,dt),Gt=new Sv(y),gt=new Av(y),N=new Nm(B),Te=new yv(B,N),T=new Cv(B,N,dt,Te),K=new Dv(B,T,N,dt),ye=new Lv(B,Ge,Ye),le=new Mv(Ie),oe=new Gx(y,Gt,gt,Ve,Ge,Te,le),he=new cy(y,Ie),ie=new qx,Oe=new jx(Ve),ke=new xv(y,Gt,gt,me,K,f,l),Pe=new ty(y,K,Ge),Fe=new hy(B,dt,Ge,me),we=new _v(B,Ve,dt),Ke=new Iv(B,Ve,dt),dt.programs=oe.programs,y.capabilities=Ge,y.extensions=Ve,y.properties=Ie,y.renderLists=ie,y.shadowMap=Pe,y.state=me,y.info=dt}F();let pe=new qh(y,B);this.xr=pe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let C=Ve.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Ve.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(C){C!==void 0&&($=C,this.setSize(J,ne,!1))},this.getSize=function(C){return C.set(J,ne)},this.setSize=function(C,Y,Q=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=C,ne=Y,t.width=Math.floor(C*$),t.height=Math.floor(Y*$),Q===!0&&(t.style.width=C+"px",t.style.height=Y+"px"),this.setViewport(0,0,C,Y)},this.getDrawingBufferSize=function(C){return C.set(J*$,ne*$).floor()},this.setDrawingBufferSize=function(C,Y,Q){J=C,ne=Y,$=Q,t.width=Math.floor(C*Q),t.height=Math.floor(Y*Q),this.setViewport(0,0,C,Y)},this.getCurrentViewport=function(C){return C.copy(I)},this.getViewport=function(C){return C.copy(Se)},this.setViewport=function(C,Y,Q,ee){C.isVector4?Se.set(C.x,C.y,C.z,C.w):Se.set(C,Y,Q,ee),me.viewport(I.copy(Se).multiplyScalar($).round())},this.getScissor=function(C){return C.copy(qe)},this.setScissor=function(C,Y,Q,ee){C.isVector4?qe.set(C.x,C.y,C.z,C.w):qe.set(C,Y,Q,ee),me.scissor(O.copy(qe).multiplyScalar($).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(C){me.setScissorTest(Ne=C)},this.setOpaqueSort=function(C){ce=C},this.setTransparentSort=function(C){fe=C},this.getClearColor=function(C){return C.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(C=!0,Y=!0,Q=!0){let ee=0;if(C){let Z=!1;if(D!==null){let ve=D.texture.format;Z=ve===El||ve===wl||ve===Sl}if(Z){let ve=D.texture.type,Le=ve===ti||ve===ss||ve===gr||ve===xr||ve===_l||ve===bl,Be=ke.getClearColor(),Ue=ke.getClearAlpha(),Je=Be.r,et=Be.g,Ze=Be.b;Le?(v[0]=Je,v[1]=et,v[2]=Ze,v[3]=Ue,B.clearBufferuiv(B.COLOR,0,v)):(b[0]=Je,b[1]=et,b[2]=Ze,b[3]=Ue,B.clearBufferiv(B.COLOR,0,b))}else ee|=B.COLOR_BUFFER_BIT}Y&&(ee|=B.DEPTH_BUFFER_BIT),Q&&(ee|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),ke.dispose(),ie.dispose(),Oe.dispose(),Ie.dispose(),Gt.dispose(),gt.dispose(),K.dispose(),Te.dispose(),Fe.dispose(),oe.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",Pt),pe.removeEventListener("sessionend",Wn),On.stop()};function ge(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let C=dt.autoReset,Y=Pe.enabled,Q=Pe.autoUpdate,ee=Pe.needsUpdate,Z=Pe.type;F(),dt.autoReset=C,Pe.enabled=Y,Pe.autoUpdate=Q,Pe.needsUpdate=ee,Pe.type=Z}function ue(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function se(C){let Y=C.target;Y.removeEventListener("dispose",se),Re(Y)}function Re(C){rt(C),Ie.remove(C)}function rt(C){let Y=Ie.get(C).programs;Y!==void 0&&(Y.forEach(function(Q){oe.releaseProgram(Q)}),C.isShaderMaterial&&oe.releaseShaderCache(C))}this.renderBufferDirect=function(C,Y,Q,ee,Z,ve){Y===null&&(Y=re);let Le=Z.isMesh&&Z.matrixWorld.determinant()<0,Be=Fr(C,Y,Q,ee,Z);me.setMaterial(ee,Le);let Ue=Q.index,Je=1;if(ee.wireframe===!0){if(Ue=T.getWireframeAttribute(Q),Ue===void 0)return;Je=2}let et=Q.drawRange,Ze=Q.attributes.position,z=et.start*Je,_=(et.start+et.count)*Je;ve!==null&&(z=Math.max(z,ve.start*Je),_=Math.min(_,(ve.start+ve.count)*Je)),Ue!==null?(z=Math.max(z,0),_=Math.min(_,Ue.count)):Ze!=null&&(z=Math.max(z,0),_=Math.min(_,Ze.count));let P=_-z;if(P<0||P===1/0)return;Te.setup(Z,ee,Be,Q,Ue);let w,A=we;if(Ue!==null&&(w=N.get(Ue),A=Ke,A.setIndex(w)),Z.isMesh)ee.wireframe===!0?(me.setLineWidth(ee.wireframeLinewidth*nt()),A.setMode(B.LINES)):A.setMode(B.TRIANGLES);else if(Z.isLine){let L=ee.linewidth;L===void 0&&(L=1),me.setLineWidth(L*nt()),Z.isLineSegments?A.setMode(B.LINES):Z.isLineLoop?A.setMode(B.LINE_LOOP):A.setMode(B.LINE_STRIP)}else Z.isPoints?A.setMode(B.POINTS):Z.isSprite&&A.setMode(B.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)ir("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),A.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))A.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let L=Z._multiDrawStarts,V=Z._multiDrawCounts,W=Z._multiDrawCount,X=Ue?N.get(Ue).bytesPerElement:1,xe=Ie.get(ee).currentProgram.getUniforms();for(let Ee=0;Ee<W;Ee++)xe.setValue(B,"_gl_DrawID",Ee),A.render(L[Ee]/X,V[Ee])}else if(Z.isInstancedMesh)A.renderInstances(z,P,Z.count);else if(Q.isInstancedBufferGeometry){let L=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,V=Math.min(Q.instanceCount,L);A.renderInstances(z,P,V)}else A.render(z,P)};function ft(C,Y,Q){C.transparent===!0&&C.side===un&&C.forceSinglePass===!1?(C.side=mn,C.needsUpdate=!0,Cn(C,Y,Q),C.side=Ai,C.needsUpdate=!0,Cn(C,Y,Q),C.side=un):Cn(C,Y,Q)}this.compile=function(C,Y,Q=null){Q===null&&(Q=C),p=Oe.get(Q),p.init(Y),x.push(p),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Y.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),C!==Q&&C.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Y.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),p.setupLights();let ee=new Set;return C.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let ve=Z.material;if(ve)if(Array.isArray(ve))for(let Le=0;Le<ve.length;Le++){let Be=ve[Le];ft(Be,Q,Z),ee.add(Be)}else ft(ve,Q,Z),ee.add(ve)}),p=x.pop(),ee},this.compileAsync=function(C,Y,Q=null){let ee=this.compile(C,Y,Q);return new Promise(Z=>{function ve(){if(ee.forEach(function(Le){Ie.get(Le).currentProgram.isReady()&&ee.delete(Le)}),ee.size===0){Z(C);return}setTimeout(ve,10)}Ve.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let xt=null;function an(C){xt&&xt(C)}function Pt(){On.stop()}function Wn(){On.start()}let On=new Af;On.setAnimationLoop(an),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(C){xt=C,pe.setAnimationLoop(C),C===null?On.stop():On.start()},pe.addEventListener("sessionstart",Pt),pe.addEventListener("sessionend",Wn),this.render=function(C,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(Y),Y=pe.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,Y,D),p=Oe.get(C,x.length),p.init(Y),x.push(p),j.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),$e.setFromProjectionMatrix(j,Jn,Y.reversedDepth),te=this.localClippingEnabled,tt=le.init(this.clippingPlanes,te),g=ie.get(C,m.length),g.init(),m.push(g),pe.enabled===!0&&pe.isPresenting===!0){let ve=y.xr.getDepthSensingMesh();ve!==null&&Oi(ve,Y,-1/0,y.sortObjects)}Oi(C,Y,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ce,fe),He=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,He&&ke.addToRenderList(g,C),this.info.render.frame++,tt===!0&&le.beginShadows();let Q=p.state.shadowsArray;Pe.render(Q,C,Y),tt===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();let ee=g.opaque,Z=g.transmissive;if(p.setupLights(),Y.isArrayCamera){let ve=Y.cameras;if(Z.length>0)for(let Le=0,Be=ve.length;Le<Be;Le++){let Ue=ve[Le];Bi(ee,Z,C,Ue)}He&&ke.render(C);for(let Le=0,Be=ve.length;Le<Be;Le++){let Ue=ve[Le];As(g,C,Ue,Ue.viewport)}}else Z.length>0&&Bi(ee,Z,C,Y),He&&ke.render(C),As(g,C,Y);D!==null&&k===0&&(Ye.updateMultisampleRenderTarget(D),Ye.updateRenderTargetMipmap(D)),C.isScene===!0&&C.onAfterRender(y,C,Y),Te.resetDefaultState(),M=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],tt===!0&&le.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Oi(C,Y,Q,ee){if(C.visible===!1)return;if(C.layers.test(Y.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Y);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||$e.intersectsSprite(C)){ee&&Me.setFromMatrixPosition(C.matrixWorld).applyMatrix4(j);let Le=K.update(C),Be=C.material;Be.visible&&g.push(C,Le,Be,Q,Me.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||$e.intersectsObject(C))){let Le=K.update(C),Be=C.material;if(ee&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Me.copy(C.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Me.copy(Le.boundingSphere.center)),Me.applyMatrix4(C.matrixWorld).applyMatrix4(j)),Array.isArray(Be)){let Ue=Le.groups;for(let Je=0,et=Ue.length;Je<et;Je++){let Ze=Ue[Je],z=Be[Ze.materialIndex];z&&z.visible&&g.push(C,Le,z,Q,Me.z,Ze)}}else Be.visible&&g.push(C,Le,Be,Q,Me.z,null)}}let ve=C.children;for(let Le=0,Be=ve.length;Le<Be;Le++)Oi(ve[Le],Y,Q,ee)}function As(C,Y,Q,ee){let Z=C.opaque,ve=C.transmissive,Le=C.transparent;p.setupLightsView(Q),tt===!0&&le.setGlobalState(y.clippingPlanes,Q),ee&&me.viewport(I.copy(ee)),Z.length>0&&xi(Z,Y,Q),ve.length>0&&xi(ve,Y,Q),Le.length>0&&xi(Le,Y,Q),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Bi(C,Y,Q,ee){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ee.id]===void 0&&(p.state.transmissionRenderTarget[ee.id]=new li(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?vr:ti,minFilter:is,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace}));let ve=p.state.transmissionRenderTarget[ee.id],Le=ee.viewport||I;ve.setSize(Le.z*y.transmissionResolutionScale,Le.w*y.transmissionResolutionScale);let Be=y.getRenderTarget(),Ue=y.getActiveCubeFace(),Je=y.getActiveMipmapLevel();y.setRenderTarget(ve),y.getClearColor(G),q=y.getClearAlpha(),q<1&&y.setClearColor(16777215,.5),y.clear(),He&&ke.render(Q);let et=y.toneMapping;y.toneMapping=ei;let Ze=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),p.setupLightsView(ee),tt===!0&&le.setGlobalState(y.clippingPlanes,ee),xi(C,Q,ee),Ye.updateMultisampleRenderTarget(ve),Ye.updateRenderTargetMipmap(ve),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let z=!1;for(let _=0,P=Y.length;_<P;_++){let w=Y[_],A=w.object,L=w.geometry,V=w.material,W=w.group;if(V.side===un&&A.layers.test(ee.layers)){let X=V.side;V.side=mn,V.needsUpdate=!0,Rs(A,Q,ee,L,V,W),V.side=X,V.needsUpdate=!0,z=!0}}z===!0&&(Ye.updateMultisampleRenderTarget(ve),Ye.updateRenderTargetMipmap(ve))}y.setRenderTarget(Be,Ue,Je),y.setClearColor(G,q),Ze!==void 0&&(ee.viewport=Ze),y.toneMapping=et}function xi(C,Y,Q){let ee=Y.isScene===!0?Y.overrideMaterial:null;for(let Z=0,ve=C.length;Z<ve;Z++){let Le=C[Z],Be=Le.object,Ue=Le.geometry,Je=Le.group,et=Le.material;et.allowOverride===!0&&ee!==null&&(et=ee),Be.layers.test(Q.layers)&&Rs(Be,Y,Q,Ue,et,Je)}}function Rs(C,Y,Q,ee,Z,ve){C.onBeforeRender(y,Y,Q,ee,Z,ve),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Z.onBeforeRender(y,Y,Q,ee,C,ve),Z.transparent===!0&&Z.side===un&&Z.forceSinglePass===!1?(Z.side=mn,Z.needsUpdate=!0,y.renderBufferDirect(Q,Y,ee,Z,C,ve),Z.side=Ai,Z.needsUpdate=!0,y.renderBufferDirect(Q,Y,ee,Z,C,ve),Z.side=un):y.renderBufferDirect(Q,Y,ee,Z,C,ve),C.onAfterRender(y,Y,Q,ee,Z,ve)}function Cn(C,Y,Q){Y.isScene!==!0&&(Y=re);let ee=Ie.get(C),Z=p.state.lights,ve=p.state.shadowsArray,Le=Z.state.version,Be=oe.getParameters(C,Z.state,ve,Y,Q),Ue=oe.getProgramCacheKey(Be),Je=ee.programs;ee.environment=C.isMeshStandardMaterial?Y.environment:null,ee.fog=Y.fog,ee.envMap=(C.isMeshStandardMaterial?gt:Gt).get(C.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&C.envMap===null?Y.environmentRotation:C.envMapRotation,Je===void 0&&(C.addEventListener("dispose",se),Je=new Map,ee.programs=Je);let et=Je.get(Ue);if(et!==void 0){if(ee.currentProgram===et&&ee.lightsStateVersion===Le)return Cs(C,Be),et}else Be.uniforms=oe.getUniforms(C),C.onBeforeCompile(Be,y),et=oe.acquireProgram(Be,Ue),Je.set(Ue,et),ee.uniforms=Be.uniforms;let Ze=ee.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ze.clippingPlanes=le.uniform),Cs(C,Be),ee.needsLights=Nr(C),ee.lightsStateVersion=Le,ee.needsLights&&(Ze.ambientLightColor.value=Z.state.ambient,Ze.lightProbe.value=Z.state.probe,Ze.directionalLights.value=Z.state.directional,Ze.directionalLightShadows.value=Z.state.directionalShadow,Ze.spotLights.value=Z.state.spot,Ze.spotLightShadows.value=Z.state.spotShadow,Ze.rectAreaLights.value=Z.state.rectArea,Ze.ltc_1.value=Z.state.rectAreaLTC1,Ze.ltc_2.value=Z.state.rectAreaLTC2,Ze.pointLights.value=Z.state.point,Ze.pointLightShadows.value=Z.state.pointShadow,Ze.hemisphereLights.value=Z.state.hemi,Ze.directionalShadowMap.value=Z.state.directionalShadowMap,Ze.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ze.spotShadowMap.value=Z.state.spotShadowMap,Ze.spotLightMatrix.value=Z.state.spotLightMatrix,Ze.spotLightMap.value=Z.state.spotLightMap,Ze.pointShadowMap.value=Z.state.pointShadowMap,Ze.pointShadowMatrix.value=Z.state.pointShadowMatrix),ee.currentProgram=et,ee.uniformsList=null,et}function Sn(C){if(C.uniformsList===null){let Y=C.currentProgram.getUniforms();C.uniformsList=Mr.seqWithValue(Y.seq,C.uniforms)}return C.uniformsList}function Cs(C,Y){let Q=Ie.get(C);Q.outputColorSpace=Y.outputColorSpace,Q.batching=Y.batching,Q.batchingColor=Y.batchingColor,Q.instancing=Y.instancing,Q.instancingColor=Y.instancingColor,Q.instancingMorph=Y.instancingMorph,Q.skinning=Y.skinning,Q.morphTargets=Y.morphTargets,Q.morphNormals=Y.morphNormals,Q.morphColors=Y.morphColors,Q.morphTargetsCount=Y.morphTargetsCount,Q.numClippingPlanes=Y.numClippingPlanes,Q.numIntersection=Y.numClipIntersection,Q.vertexAlphas=Y.vertexAlphas,Q.vertexTangents=Y.vertexTangents,Q.toneMapping=Y.toneMapping}function Fr(C,Y,Q,ee,Z){Y.isScene!==!0&&(Y=re),Ye.resetTextureUnits();let ve=Y.fog,Le=ee.isMeshStandardMaterial?Y.environment:null,Be=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:fs,Ue=(ee.isMeshStandardMaterial?gt:Gt).get(ee.envMap||Le),Je=ee.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,et=!!Q.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Ze=!!Q.morphAttributes.position,z=!!Q.morphAttributes.normal,_=!!Q.morphAttributes.color,P=ei;ee.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(P=y.toneMapping);let w=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,A=w!==void 0?w.length:0,L=Ie.get(ee),V=p.state.lights;if(tt===!0&&(te===!0||C!==S)){let Ht=C===S&&ee.id===M;le.setState(ee,C,Ht)}let W=!1;ee.version===L.__version?(L.needsLights&&L.lightsStateVersion!==V.state.version||L.outputColorSpace!==Be||Z.isBatchedMesh&&L.batching===!1||!Z.isBatchedMesh&&L.batching===!0||Z.isBatchedMesh&&L.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&L.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&L.instancing===!1||!Z.isInstancedMesh&&L.instancing===!0||Z.isSkinnedMesh&&L.skinning===!1||!Z.isSkinnedMesh&&L.skinning===!0||Z.isInstancedMesh&&L.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&L.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&L.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&L.instancingMorph===!1&&Z.morphTexture!==null||L.envMap!==Ue||ee.fog===!0&&L.fog!==ve||L.numClippingPlanes!==void 0&&(L.numClippingPlanes!==le.numPlanes||L.numIntersection!==le.numIntersection)||L.vertexAlphas!==Je||L.vertexTangents!==et||L.morphTargets!==Ze||L.morphNormals!==z||L.morphColors!==_||L.toneMapping!==P||L.morphTargetsCount!==A)&&(W=!0):(W=!0,L.__version=ee.version);let X=L.currentProgram;W===!0&&(X=Cn(ee,Y,Z));let xe=!1,Ee=!1,je=!1,Xe=X.getUniforms(),pt=L.uniforms;if(me.useProgram(X.program)&&(xe=!0,Ee=!0,je=!0),ee.id!==M&&(M=ee.id,Ee=!0),xe||S!==C){me.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Xe.setValue(B,"projectionMatrix",C.projectionMatrix),Xe.setValue(B,"viewMatrix",C.matrixWorldInverse);let jt=Xe.map.cameraPosition;jt!==void 0&&jt.setValue(B,de.setFromMatrixPosition(C.matrixWorld)),Ge.logarithmicDepthBuffer&&Xe.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Xe.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,Ee=!0,je=!0)}if(Z.isSkinnedMesh){Xe.setOptional(B,Z,"bindMatrix"),Xe.setOptional(B,Z,"bindMatrixInverse");let Ht=Z.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Xe.setValue(B,"boneTexture",Ht.boneTexture,Ye))}Z.isBatchedMesh&&(Xe.setOptional(B,Z,"batchingTexture"),Xe.setValue(B,"batchingTexture",Z._matricesTexture,Ye),Xe.setOptional(B,Z,"batchingIdTexture"),Xe.setValue(B,"batchingIdTexture",Z._indirectTexture,Ye),Xe.setOptional(B,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Xe.setValue(B,"batchingColorTexture",Z._colorsTexture,Ye));let Ut=Q.morphAttributes;if((Ut.position!==void 0||Ut.normal!==void 0||Ut.color!==void 0)&&ye.update(Z,Q,X),(Ee||L.receiveShadow!==Z.receiveShadow)&&(L.receiveShadow=Z.receiveShadow,Xe.setValue(B,"receiveShadow",Z.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(pt.envMap.value=Ue,pt.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&Y.environment!==null&&(pt.envMapIntensity.value=Y.environmentIntensity),Ee&&(Xe.setValue(B,"toneMappingExposure",y.toneMappingExposure),L.needsLights&&Ur(pt,je),ve&&ee.fog===!0&&he.refreshFogUniforms(pt,ve),he.refreshMaterialUniforms(pt,ee,$,ne,p.state.transmissionRenderTarget[C.id]),Mr.upload(B,Sn(L),pt,Ye)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Mr.upload(B,Sn(L),pt,Ye),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Xe.setValue(B,"center",Z.center),Xe.setValue(B,"modelViewMatrix",Z.modelViewMatrix),Xe.setValue(B,"normalMatrix",Z.normalMatrix),Xe.setValue(B,"modelMatrix",Z.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){let Ht=ee.uniformsGroups;for(let jt=0,si=Ht.length;jt<si;jt++){let dn=Ht[jt];Fe.update(dn,X),Fe.bind(dn,X)}}return X}function Ur(C,Y){C.ambientLightColor.needsUpdate=Y,C.lightProbe.needsUpdate=Y,C.directionalLights.needsUpdate=Y,C.directionalLightShadows.needsUpdate=Y,C.pointLights.needsUpdate=Y,C.pointLightShadows.needsUpdate=Y,C.spotLights.needsUpdate=Y,C.spotLightShadows.needsUpdate=Y,C.rectAreaLights.needsUpdate=Y,C.hemisphereLights.needsUpdate=Y}function Nr(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(C,Y,Q){let ee=Ie.get(C);ee.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),Ie.get(C.texture).__webglTexture=Y,Ie.get(C.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:Q,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,Y){let Q=Ie.get(C);Q.__webglFramebuffer=Y,Q.__useDefaultFramebuffer=Y===void 0};let Or=B.createFramebuffer();this.setRenderTarget=function(C,Y=0,Q=0){D=C,R=Y,k=Q;let ee=!0,Z=null,ve=!1,Le=!1;if(C){let Ue=Ie.get(C);if(Ue.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(B.FRAMEBUFFER,null),ee=!1;else if(Ue.__webglFramebuffer===void 0)Ye.setupRenderTarget(C);else if(Ue.__hasExternalTextures)Ye.rebindTextures(C,Ie.get(C.texture).__webglTexture,Ie.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Ze=C.depthTexture;if(Ue.__boundDepthTexture!==Ze){if(Ze!==null&&Ie.has(Ze)&&(C.width!==Ze.image.width||C.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(C)}}let Je=C.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Le=!0);let et=Ie.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(et[Y])?Z=et[Y][Q]:Z=et[Y],ve=!0):C.samples>0&&Ye.useMultisampledRTT(C)===!1?Z=Ie.get(C).__webglMultisampledFramebuffer:Array.isArray(et)?Z=et[Q]:Z=et,I.copy(C.viewport),O.copy(C.scissor),U=C.scissorTest}else I.copy(Se).multiplyScalar($).floor(),O.copy(qe).multiplyScalar($).floor(),U=Ne;if(Q!==0&&(Z=Or),me.bindFramebuffer(B.FRAMEBUFFER,Z)&&ee&&me.drawBuffers(C,Z),me.viewport(I),me.scissor(O),me.setScissorTest(U),ve){let Ue=Ie.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ue.__webglTexture,Q)}else if(Le){let Ue=Y;for(let Je=0;Je<C.textures.length;Je++){let et=Ie.get(C.textures[Je]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Je,et.__webglTexture,Q,Ue)}}else if(C!==null&&Q!==0){let Ue=Ie.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ue.__webglTexture,Q)}M=-1},this.readRenderTargetPixels=function(C,Y,Q,ee,Z,ve,Le,Be=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Ie.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){me.bindFramebuffer(B.FRAMEBUFFER,Ue);try{let Je=C.textures[Be],et=Je.format,Ze=Je.type;if(!Ge.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=C.width-ee&&Q>=0&&Q<=C.height-Z&&(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Be),B.readPixels(Y,Q,ee,Z,ze.convert(et),ze.convert(Ze),ve))}finally{let Je=D!==null?Ie.get(D).__webglFramebuffer:null;me.bindFramebuffer(B.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(C,Y,Q,ee,Z,ve,Le,Be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Ie.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue)if(Y>=0&&Y<=C.width-ee&&Q>=0&&Q<=C.height-Z){me.bindFramebuffer(B.FRAMEBUFFER,Ue);let Je=C.textures[Be],et=Je.format,Ze=Je.type;if(!Ge.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let z=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,z),B.bufferData(B.PIXEL_PACK_BUFFER,ve.byteLength,B.STREAM_READ),C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Be),B.readPixels(Y,Q,ee,Z,ze.convert(et),ze.convert(Ze),0);let _=D!==null?Ie.get(D).__webglFramebuffer:null;me.bindFramebuffer(B.FRAMEBUFFER,_);let P=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await $d(B,P,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,z),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ve),B.deleteBuffer(z),B.deleteSync(P),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,Y=null,Q=0){let ee=Math.pow(2,-Q),Z=Math.floor(C.image.width*ee),ve=Math.floor(C.image.height*ee),Le=Y!==null?Y.x:0,Be=Y!==null?Y.y:0;Ye.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,Q,0,0,Le,Be,Z,ve),me.unbindTexture()};let zi=B.createFramebuffer(),Br=B.createFramebuffer();this.copyTextureToTexture=function(C,Y,Q=null,ee=null,Z=0,ve=null){ve===null&&(Z!==0?(ir("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=Z,Z=0):ve=0);let Le,Be,Ue,Je,et,Ze,z,_,P,w=C.isCompressedTexture?C.mipmaps[ve]:C.image;if(Q!==null)Le=Q.max.x-Q.min.x,Be=Q.max.y-Q.min.y,Ue=Q.isBox3?Q.max.z-Q.min.z:1,Je=Q.min.x,et=Q.min.y,Ze=Q.isBox3?Q.min.z:0;else{let Ut=Math.pow(2,-Z);Le=Math.floor(w.width*Ut),Be=Math.floor(w.height*Ut),C.isDataArrayTexture?Ue=w.depth:C.isData3DTexture?Ue=Math.floor(w.depth*Ut):Ue=1,Je=0,et=0,Ze=0}ee!==null?(z=ee.x,_=ee.y,P=ee.z):(z=0,_=0,P=0);let A=ze.convert(Y.format),L=ze.convert(Y.type),V;Y.isData3DTexture?(Ye.setTexture3D(Y,0),V=B.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(Ye.setTexture2DArray(Y,0),V=B.TEXTURE_2D_ARRAY):(Ye.setTexture2D(Y,0),V=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Y.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,Y.unpackAlignment);let W=B.getParameter(B.UNPACK_ROW_LENGTH),X=B.getParameter(B.UNPACK_IMAGE_HEIGHT),xe=B.getParameter(B.UNPACK_SKIP_PIXELS),Ee=B.getParameter(B.UNPACK_SKIP_ROWS),je=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,w.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,w.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Je),B.pixelStorei(B.UNPACK_SKIP_ROWS,et),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ze);let Xe=C.isDataArrayTexture||C.isData3DTexture,pt=Y.isDataArrayTexture||Y.isData3DTexture;if(C.isDepthTexture){let Ut=Ie.get(C),Ht=Ie.get(Y),jt=Ie.get(Ut.__renderTarget),si=Ie.get(Ht.__renderTarget);me.bindFramebuffer(B.READ_FRAMEBUFFER,jt.__webglFramebuffer),me.bindFramebuffer(B.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let dn=0;dn<Ue;dn++)Xe&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ie.get(C).__webglTexture,Z,Ze+dn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ie.get(Y).__webglTexture,ve,P+dn)),B.blitFramebuffer(Je,et,Le,Be,z,_,Le,Be,B.DEPTH_BUFFER_BIT,B.NEAREST);me.bindFramebuffer(B.READ_FRAMEBUFFER,null),me.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Z!==0||C.isRenderTargetTexture||Ie.has(C)){let Ut=Ie.get(C),Ht=Ie.get(Y);me.bindFramebuffer(B.READ_FRAMEBUFFER,zi),me.bindFramebuffer(B.DRAW_FRAMEBUFFER,Br);for(let jt=0;jt<Ue;jt++)Xe?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ut.__webglTexture,Z,Ze+jt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ut.__webglTexture,Z),pt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ht.__webglTexture,ve,P+jt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ht.__webglTexture,ve),Z!==0?B.blitFramebuffer(Je,et,Le,Be,z,_,Le,Be,B.COLOR_BUFFER_BIT,B.NEAREST):pt?B.copyTexSubImage3D(V,ve,z,_,P+jt,Je,et,Le,Be):B.copyTexSubImage2D(V,ve,z,_,Je,et,Le,Be);me.bindFramebuffer(B.READ_FRAMEBUFFER,null),me.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else pt?C.isDataTexture||C.isData3DTexture?B.texSubImage3D(V,ve,z,_,P,Le,Be,Ue,A,L,w.data):Y.isCompressedArrayTexture?B.compressedTexSubImage3D(V,ve,z,_,P,Le,Be,Ue,A,w.data):B.texSubImage3D(V,ve,z,_,P,Le,Be,Ue,A,L,w):C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ve,z,_,Le,Be,A,L,w.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ve,z,_,w.width,w.height,A,w.data):B.texSubImage2D(B.TEXTURE_2D,ve,z,_,Le,Be,A,L,w);B.pixelStorei(B.UNPACK_ROW_LENGTH,W),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,X),B.pixelStorei(B.UNPACK_SKIP_PIXELS,xe),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ee),B.pixelStorei(B.UNPACK_SKIP_IMAGES,je),ve===0&&Y.generateMipmaps&&B.generateMipmap(V),me.unbindTexture()},this.initRenderTarget=function(C){Ie.get(C).__webglFramebuffer===void 0&&Ye.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Ye.setTextureCube(C,0):C.isData3DTexture?Ye.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Ye.setTexture2DArray(C,0):Ye.setTexture2D(C,0),me.unbindTexture()},this.resetState=function(){R=0,k=0,D=null,me.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};function rn(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var _t=(s,e,t)=>s<e?e:s>t?t:s,bn=(s,e,t)=>s+(e-s)*t,ii=(s,e,t)=>{let n=_t((t-s)/(e-s||1e-6),0,1);return n*n*(3-2*n)},Tr=(s,e)=>1-Math.exp(-s*e);function Dn(s){return[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255]}function $h(s){return"#"+s.toString(16).padStart(6,"0")}function Di(s,e){let t=document.createElement("canvas");t.width=s,t.height=e;let n=t.getContext("2d");return{c:t,g:n}}function ki(s,e={}){let t=new vo(s);return e.srgb!==!1&&(t.colorSpace=Vt),e.repeat&&(t.wrapS=ds,t.wrapT=ds),t.anisotropy=4,t}var Rn=11;function Ho(s,e){let t=_t(Math.round(s[0]*e),0,255),n=_t(Math.round(s[1]*e),0,255),i=_t(Math.round(s[2]*e),0,255);return`rgb(${t},${n},${i})`}function Kh(s,e,t=!1){let{c:n,g:i}=Di(e,e),r=rn(11),o=rn(12),a=g=>(g+Rn)/(Rn*2)*e,l=e/(Rn*2),c=(g,p)=>t?.15+.85*ii(4.5,7,Math.hypot(g,p)):1,h=g=>g/e*Rn*2-Rn;i.fillStyle="#9b7c59",i.fillRect(0,0,e,e);for(let g=0;g<2600;g++){let p=r()*e,m=r()*e,x=(2+r()*16)*(e/1024),y=c(h(p),h(m));i.fillStyle=r()<.5?`rgba(70,48,28,${(.04+r()*.07)*y})`:`rgba(206,170,128,${(.04+r()*.07)*y})`,i.beginPath(),i.arc(p,m,x,0,Math.PI*2),i.fill()}let d=1.9,u=[166,140,108];for(let g=-Rn;g<Rn;g+=d)for(let p=-Rn;p<Rn;p+=d){let m=g+d/2+(r()-.5)*d*.5,x=p+d/2+(r()-.5)*d*.5;if(Et({x:m,z:x},s.poly)<.2)continue;let y=Math.hypot(m,x)/s.radius,E=6+Math.floor(r()*2),R=d*(.42+r()*.1),k=r()*Math.PI;i.beginPath();for(let M=0;M<E;M++){let S=k+M/E*Math.PI*2+(r()-.5)*.35,I=R*(.85+r()*.3),O=a(m+Math.cos(S)*I),U=a(x+Math.sin(S)*I);M===0?i.moveTo(O,U):i.lineTo(O,U)}i.closePath(),i.fillStyle=Ho(u,.88+r()*.22+(1-y)*-.03);let D=c(m,x);i.globalAlpha=(.42+y*.4)*D,i.fill(),i.globalAlpha=.5*D,i.strokeStyle="rgba(62,44,28,0.75)",i.lineWidth=2.2*(e/1024),i.stroke(),i.globalAlpha=1}for(let g=0;g<160;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius;if(Et({x:p,z:m},s.poly)<.6)continue;let x=(.08+r()*.16)*l,y=x*(.6+r()*.3),E=r()*3,R=Ho([150,142,130],.8+r()*.4),k=r()*3;t&&Math.hypot(p,m)<6&&o()<.9||(i.fillStyle="rgba(40,28,18,0.35)",i.beginPath(),i.ellipse(a(p)+x*.25,a(m)+y*.45,x,y,E,0,Math.PI*2),i.fill(),i.fillStyle=R,i.beginPath(),i.ellipse(a(p),a(m),x,y,k,0,Math.PI*2),i.fill())}let f=[96,116,52],v=(g,p,m)=>{let x=5+Math.floor(r()*6);for(let y=0;y<x;y++){let E=(r()-.5)*m*2,R=(r()-.5)*m*2,k=(.07+r()*.2)*l;i.fillStyle=Ho(f,.7+r()*.45),i.globalAlpha=.55+r()*.3,i.beginPath(),i.arc(a(g+E),a(p+R),k,0,Math.PI*2),i.fill()}i.globalAlpha=1};for(let g=0;g<2600;g++){let p=(r()*2-1)*s.radius*1.1,m=(r()*2-1)*s.radius*1.1,x=Et({x:p,z:m},s.poly);if(x<0)continue;let y=x<2.6?Math.pow(1-x/2.6,1.4):.015;r()<y*.5&&v(p,m,.4)}for(let g of s.rocks){for(let p=0;p<22;p++){let m=r()*Math.PI*2,x=g.r*(.7+r()*.9);v(g.pos.x+Math.cos(m)*x,g.pos.z+Math.sin(m)*x,.35)}i.fillStyle="rgba(30,22,14,0.28)",i.beginPath(),i.arc(a(g.pos.x),a(g.pos.z),g.r*1.15*l,0,Math.PI*2),i.fill()}for(let g=0;g<70;g++){let p=(r()*2-1)*s.radius,m=(r()*2-1)*s.radius,x=Et({x:p,z:m},s.poly);x<.4||x>3.2||(i.fillStyle="#f4f1e6",i.beginPath(),i.arc(a(p),a(m),.06*l,0,Math.PI*2),i.fill(),i.fillStyle="#e8c85a",i.beginPath(),i.arc(a(p),a(m),.025*l,0,Math.PI*2),i.fill())}i.save(),i.beginPath(),s.poly.forEach((g,p)=>p===0?i.moveTo(a(g.x),a(g.z)):i.lineTo(a(g.x),a(g.z))),i.closePath(),i.clip(),i.lineJoin="round";for(let[g,p]of[[1.4,.05],[1,.06],[.65,.08],[.35,.1]])i.strokeStyle=`rgba(34,24,14,${p})`,i.lineWidth=g*2*l,i.stroke();i.restore();let b=ki(n);return b.anisotropy=8,b}function Lf(){let{c:e,g:t}=Di(256,256),n=rn(23);t.fillStyle="#c2bbb0",t.fillRect(0,0,256,256);for(let i=0;i<900;i++){let r=n()*256,o=n()*256,a=2+n()*14;t.fillStyle=n()<.5?`rgba(40,36,34,${.04+n()*.1})`:`rgba(210,200,185,${.03+n()*.08})`;for(let l of[-256,0,256])t.beginPath(),t.arc(r+l,o,a,0,Math.PI*2),t.fill()}for(let i=0;i<26;i++){let r=n()*256;t.strokeStyle=`rgba(30,26,24,${.16+n()*.2})`,t.lineWidth=1+n()*2,t.beginPath();let o=r;t.moveTo(o,0);for(let a=0;a<=256;a+=16)o+=(n()-.5)*5,t.lineTo(o,a);t.stroke()}return ki(e,{repeat:!0})}function Df(){let{c:e,g:t}=Di(512,512),n=rn(31);for(let i=0;i<70;i++){let r=n()*512,o=n()*512,a=30+n()*90;for(let l of[-512,0,512])for(let c of[-512,0,512]){let h=t.createRadialGradient(r+l,o+c,0,r+l,o+c,a);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=h,t.fillRect(r+l-a,o+c-a,a*2,a*2)}}return ki(e,{repeat:!0})}function kf(){let{c:e,g:t}=Di(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),ki(e)}function Ff(){let{c:t,g:n}=Di(256,64),i=n.createLinearGradient(0,0,256,0);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.65,"rgba(255,255,255,0.35)"),i.addColorStop(1,"rgba(255,255,255,1)");for(let o=0;o<64;o++){let a=Math.abs((o+.5)/64-.5)*2,l=Math.pow(1-a,1.6);n.globalAlpha=l,n.fillStyle=i,n.fillRect(0,o,256,1)}n.globalAlpha=1;let r=n.createLinearGradient(0,0,256,0);return r.addColorStop(.5,"rgba(255,255,255,0)"),r.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=r,n.fillRect(0,64/2-4,256,8),ki(t)}function Uf(){let{c:t,g:n}=Di(256,64),i=n.createLinearGradient(0,0,256,0);return i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.8,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=i,n.globalAlpha=.28,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.82,64/2-14),n.lineTo(256*.82,64/2+14),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle=i,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.84,64/2-4),n.lineTo(256*.84,64/2+4),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(254,64/2),n.lineTo(256*.78,64/2-22),n.lineTo(256*.83,64/2),n.lineTo(256*.78,64/2+22),n.closePath(),n.fill(),n.globalAlpha=.5,n.fillRect(256*.55,64/2-1.5,256*.3,3),ki(t)}function Nf(s,e){let{c:t,g:n}=Di(e,e),i=rn(41),r=Rn,o=d=>(d+r)/(r*2)*e,a=e/(r*2);n.fillStyle="#e2d2b2",n.fillRect(0,0,e,e);for(let d=0;d<90;d++){let u=i()*e,f=i()*e,v=(40+i()*120)*(e/1024),b=n.createRadialGradient(u,f,0,u,f,v);b.addColorStop(0,i()<.5?"rgba(232,220,196,0.22)":"rgba(196,180,152,0.18)"),b.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=b,n.fillRect(u-v,f-v,v*2,v*2)}let l=Math.max(1.5,2.2*(e/1024)),c=-r;for(;c<r;){let d=1.6+i()*1,u=-r-i()*2;for(;u<r;){let f=1.8+i()*1.4,v=()=>(i()-.5)*.08,b=[[u+v(),c+v()],[u+f+v(),c+v()],[u+f+v(),c+d+v()],[u+v(),c+d+v()]],g=.93+i()*.11;if(n.beginPath(),b.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.fillStyle=Ho([236,221,192],g),n.fill(),n.strokeStyle="rgba(255,248,232,0.35)",n.lineWidth=l*.8,n.beginPath(),n.moveTo(o(b[3][0]),o(b[3][1])),n.lineTo(o(b[0][0]),o(b[0][1])),n.lineTo(o(b[1][0]),o(b[1][1])),n.stroke(),n.strokeStyle="rgba(122,104,80,0.6)",n.lineWidth=l,n.beginPath(),b.forEach(([p,m],x)=>x===0?n.moveTo(o(p),o(m)):n.lineTo(o(p),o(m))),n.closePath(),n.stroke(),i()<.35){n.strokeStyle="rgba(110,94,72,0.45)",n.lineWidth=l*.55;let p=u+f*(.2+i()*.6),m=c+d*(.1+i()*.2);n.beginPath(),n.moveTo(o(p),o(m));for(let x=0;x<4;x++)p+=(i()-.5)*.5,m+=d*.2,n.lineTo(o(p),o(m));n.stroke()}if(i()<.2){let p=u+(i()<.5?0:f),m=c+(i()<.5?0:d),x=.18+i()*.2;n.fillStyle="rgba(150,132,104,0.45)",n.beginPath(),n.moveTo(o(p),o(m)),n.lineTo(o(p+(p===u?x:-x)),o(m)),n.lineTo(o(p),o(m+(m===c?x:-x))),n.closePath(),n.fill()}u+=f}c+=d}for(let d=0;d<1800;d++){let u=(i()*2-1)*s.radius*1.1,f=(i()*2-1)*s.radius*1.1,v=Et({x:u,z:f},s.poly);if(v<0||v>1.3||i()>Math.pow(1-v/1.3,1.5)*.7)continue;let b=(.06+i()*.16)*a;n.fillStyle=Ho([112,126,70],.75+i()*.4),n.globalAlpha=.6+i()*.3,n.beginPath(),n.arc(o(u),o(f),b,0,Math.PI*2),n.fill(),n.globalAlpha=1,i()<.12&&(n.fillStyle="#e8c44a",n.beginPath(),n.arc(o(u+.1),o(f),.05*a,0,Math.PI*2),n.fill())}for(let d of s.rocks)n.fillStyle="rgba(80,66,48,0.18)",n.beginPath(),n.arc(o(d.pos.x),o(d.pos.z),d.r*1.12*a,0,Math.PI*2),n.fill();n.save(),n.beginPath(),s.poly.forEach((d,u)=>u===0?n.moveTo(o(d.x),o(d.z)):n.lineTo(o(d.x),o(d.z))),n.closePath(),n.clip(),n.lineJoin="round";for(let[d,u]of[[.9,.05],[.5,.07],[.22,.09]])n.strokeStyle=`rgba(70,56,40,${u})`,n.lineWidth=d*2*a,n.stroke();n.restore();let h=ki(t);return h.anisotropy=8,h}function Of(){let{c:e,g:t}=Di(256,256),n=rn(43);t.fillStyle="#e9e1d0",t.fillRect(0,0,256,256);for(let i=0;i<18;i++){t.strokeStyle=`rgba(140,128,112,${.12+n()*.18})`,t.lineWidth=.8+n()*1.6;let r=n()*256,o=0;for(t.beginPath(),t.moveTo(r,o);o<256;)r+=(n()-.5)*18,o+=10+n()*20,t.lineTo(r,o);t.stroke()}for(let i=0;i<400;i++)t.fillStyle=`rgba(${n()<.5?"120,110,96":"255,250,240"},${.03+n()*.05})`,t.beginPath(),t.arc(n()*256,n()*256,2+n()*8,0,Math.PI*2),t.fill();return ki(e,{repeat:!0})}var Bf=typeof location<"u"?new URLSearchParams(location.search):new URLSearchParams,Zh=Bf.get("art"),at={myth:Zh==="myth",near:Bf.get("cam")==="near"};function Jh(s){return Zh==="myth"?!0:Zh==="base"?!1:s==="v4"||s==="s1"}var zf=()=>at.myth?2829386:6984904,uy=40,dy=110,Hf=-18;function fy(){let s=rn(77),e=[],t=[[-21.2,-10.2,-3,7,1.6],[-17.9,-10.4,-5,6,1.3],[-24.2,-8.8,-8,3.5,1.4],[23.6,-12.5,-6,4.5,1.5],[21.5,-13.5,-9,4,1.1]];for(let[r,o,a,l,c]of t)e.push({x:r,z:o,top:a,len:l,w:c,capH:.25+s()*.15,haze:.14,tier:0});for(let r=0;r<14;r++){let o=r%2===0?-1:1;e.push({x:o*(28+s()*8),z:-26+s()*14,top:-9-s()*5,len:0,w:1.6+s()*1.4,capH:.3+s()*.2,haze:.5,tier:1})}for(let r=0;r<16;r++){let o,a,l,c=2.6+s()*3;if(r<10)o=(r%2===0?-1:1)*(36+s()*14),a=-36+s()*20,l=-12-s()*4,c=2+s()*1.6;else{let h=Math.PI*(1.2+s()*.6),d=55+s()*20;o=Math.cos(h)*d,a=Math.sin(h)*d,l=-7+s()*15}e.push({x:o,z:a,top:l,len:0,w:c,capH:.4+s()*.3,haze:.66,tier:2})}let n=[],i=[[-27.9,-21.3,-9,1.6],[-31.1,-16.8,-13,1.3],[27.5,-20.7,-9,1.5],[32.2,-17.9,-13,1.2],[-36,-28,-10,2],[37,-30,-11,1.9]];for(let[r,o,a,l]of i)n.push({x:r,z:o,y:a,s:l,haze:.5});return{pillars:e,islets:n}}var Vf=fy(),lc=new st,Fi=(s,e,t)=>(lc.setRGB(s,e,t,Vt),[lc.r,lc.g,lc.b]);function uc(s,e){let t=e.x-s.x,n=e.z-s.z,i=Math.hypot(t,n)||1;return{x:n/i,z:-t/i}}function Gf(s){let e=s.length;return s.map((t,n)=>{let i=uc(s[(n+e-1)%e],s[n]),r=uc(s[n],s[(n+1)%e]),o=i.x+r.x,a=i.z+r.z,l=Math.hypot(o,a)||1;return{x:o/l,z:a/l}})}var Vo=class{constructor(){this.pos=[];this.col=[];this.uv=[]}tri(e,t,n,i,r,o,a,l,c){this.pos.push(...e,...t,...n),this.col.push(...i,...r,...o),this.uv.push(...a,...l,...c)}quad(e,t,n){this.tri(e[0],e[1],e[2],t[0],t[1],t[2],n[0],n[1],n[2]),this.tri(e[0],e[2],e[3],t[0],t[2],t[3],n[0],n[2],n[3])}build(){let e=new Zt;return e.setAttribute("position",new mt(this.pos,3)),e.setAttribute("color",new mt(this.col,3)),e.setAttribute("uv",new mt(this.uv,2)),e.computeVertexNormals(),e}};function py(s){let e=new hr(s.poly.map(r=>new Ce(r.x,-r.z))),t=new Co(e,1);t.rotateX(-Math.PI/2);let n=t.getAttribute("position"),i=t.getAttribute("uv");for(let r=0;r<n.count;r++)i.setXY(r,(n.getX(r)+Rn)/(Rn*2),1-(n.getZ(r)+Rn)/(Rn*2));return t.computeVertexNormals(),t}function my(s,e=!1){let t=rn(5),n=s.poly,i=n.length,r=new Vo,o=e?[.45,.41,.4]:[.74,.71,.67],a=e?[.5,.55,.32]:[.43,.52,.24],l=e?[.1,.09,.17]:[.28,.3,.36],c=e?.3:1,h=[{yTop:0,yBot:-5,sTop:1,sBot:.975},{yTop:-5,yBot:-13,sTop:.975,sBot:.58}],d=0,u=[];for(let g=0;g<i;g++)u.push(d),d+=Math.hypot(n[(g+1)%i].x-n[g].x,n[(g+1)%i].z-n[g].z);let f=[];h.forEach((g,p)=>{let m=[],x=[],y=[],E=[],R=[];for(let k=0;k<i;){let D=2+Math.floor(t()*2),M=.15+t()*.6,S=(g.yBot-g.yTop)*(p===0?1:.75+t()*.3),I=g.sBot*(.94+t()*.08),O=.8+t()*.32;for(let U=0;U<D&&k<i;U++,k++)x.push(M),y.push(S),E.push(I),R.push(O*(.97+t()*.06))}for(let k=0;k<i;k++){let D=n[k],M=n[(k+1)%i],S=uc(D,M),I=p===0?x[k]:f[k]-.05-t()*.4;p===0&&f.push(I);let O=g.yTop+y[k],U=E[k],G=p===0?0:I,q=[D.x*g.sTop+S.x*G,g.yTop,D.z*g.sTop+S.z*G],J=[M.x*g.sTop+S.x*G,g.yTop,M.z*g.sTop+S.z*G],ne=[M.x*U+S.x*I,O,M.z*U+S.z*I],$=[D.x*U+S.x*I,O,D.z*U+S.z*I];m.push([q,J,ne,$]);let ce=R[k],fe=t()*.06,Se=[o[0]*ce+fe,o[1]*ce,o[2]*ce-fe*.5],qe=(p===0?.25+t()*.4:.06*t())*c,Ne=Se.map((re,He)=>bn(re,a[He],qe)),$e=Se.map((re,He)=>bn(re*(p===0?.85:.7),l[He],e?p===0?.35:.85:p===0?.1:.45)),tt=Math.hypot(M.x-D.x,M.z-D.z),te=u[k]/3.2,j=te+tt/3.2,de=-g.yTop/3.2,Me=-O/3.2;r.quad([q,J,ne,$],[Fi(Ne[0],Ne[1],Ne[2]),Fi(Ne[0],Ne[1],Ne[2]),Fi($e[0],$e[1],$e[2]),Fi($e[0],$e[1],$e[2])],[[te,de],[j,de],[j,Me],[te,Me]])}for(let k=0;k<i;k++){let D=m[k],M=m[(k+1)%i],S=Fi(o[0]*.7,o[1]*.7,o[2]*.7),I=Fi(l[0],l[1],l[2]);r.quad([D[1],M[0],M[3],D[2]],[S,S,I,I],[[0,0],[.3,0],[.3,1],[0,1]])}});let v=n.map(g=>[g.x*.58,-12,g.z*.58]),b=Fi(.2,.22,.28);for(let g=0;g<i;g++){let p=v[g],m=v[(g+1)%i];r.tri(p,m,[0,-17,0],b,b,b,[0,0],[0,0],[0,0])}return r.build()}function gy(s,e=!1){let t=rn(9),n=s.poly,i=n.length,r=Gf(n),o=new Vo,a=e?[1,.97,.9]:[.84,.8,.72],l=[.45,.56,.25],c=[];for(let h=0;h<i;h++){let d=.28+t()*.6,u=.03+t()*.09,f=(p,m)=>[n[h].x-r[h].x*p,m,n[h].z-r[h].z*p],v=_t(.5+.5*Math.sin(h*.61+1.7)*Math.cos(h*.23)+(t()-.5)*.5,0,1),b=.9+t()*.16,g=a.map((p,m)=>bn(p*b,l[m],v*(e?.2:.75)));c.push({inner:f(d,.012),crest:f(d*.42,u),outer:f(0,0),c:g})}for(let h=0;h<i;h++){let d=c[h],u=c[(h+1)%i],f=(v,b)=>Fi(v[0]*b,v[1]*b,v[2]*b);o.quad([d.inner,u.inner,u.crest,d.crest],[f(d.c,.95),f(u.c,.95),f(u.c,1.06),f(d.c,1.06)],[[0,0],[0,0],[0,0],[0,0]]),o.quad([d.crest,u.crest,u.outer,d.outer],[f(d.c,1.06),f(u.c,1.06),f(u.c,.88),f(d.c,.88)],[[0,0],[0,0],[0,0],[0,0]])}return o.build()}var vy=()=>at.myth?"mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), smoothstep(-30.0, 20.0, vHazeZ))":"mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), smoothstep(-30.0, 20.0, vHazeZ))";function cc(s,e,t,n,i,r=!1){s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <project_vertex>",`#include <project_vertex>
  vec4 hazeW = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
  vHazeZ = hazeW.z;
  vHazeY = `+(r?"transformed.y;":"hazeW.y;")),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <fog_fragment>",["float hazeF = max(smoothstep(fogNear, fogFar, vFogDepth), smoothstep("+t.toFixed(2)+", "+n.toFixed(2)+", vHazeY) * "+i.toFixed(2)+");","gl_FragColor.rgb = mix(gl_FragColor.rgb, "+vy()+", 1.0 - (1.0 - "+e.toFixed(2)+") * (1.0 - hazeF));"].join(`
`))};let o=at.myth;return s.customProgramCacheKey=()=>`haze${e}_${t}_${n}_${i}_${r}_${o}`,s}function hc(s){let e=rn(s),t=new Ro(1,1),n=t.getAttribute("position"),i=new Map;for(let r=0;r<n.count;r++){let o=`${n.getX(r).toFixed(3)},${n.getY(r).toFixed(3)},${n.getZ(r).toFixed(3)}`,a=i.get(o);a===void 0&&(a=.8+e()*.38,i.set(o,a)),n.setXYZ(r,n.getX(r)*a,n.getY(r)*a,n.getZ(r)*a)}return t.computeVertexNormals(),t}function xy(s){let e=rn(61),t=s.poly,n=t.length,i=new Vo,r=[.97,.92,.82],o=[.16,.14,.23],a=11,l=.05,c=d=>d>-5?1-.005*-d:.975-(-d-5)/8*.395,h=(d,u,f)=>{let v=Math.min(1,-u/a),b=r.map((g,p)=>bn(g*d,o[p],Math.pow(v,1.4)*.85)*f);return Fi(b[0],b[1],b[2])};for(let d=0;d<n;){let u=e()<.55?1:2,f=t[d],v=t[(d+u)%n],b=uc(f,v),g=Math.hypot(v.x-f.x,v.z-f.z),p=l/g,m=1-l/g,x=-.03-e()*.05,y=0;for(;x>-a;){let E=.8+e()*.7,R=Math.max(-a,x-E),k=y===0?e()*.06:.08+e()*.32+Math.min(.2,y*.02),D=.85+e()*.2,M=(G,q,J)=>{let ne=c(q),$=(f.x+(v.x-f.x)*G)*ne+b.x*J,ce=(f.z+(v.z-f.z)*G)*ne+b.z*J;return[$,q,ce]},S=x-l,I=R+l,O=[M(p,S,k),M(m,S,k),M(m,I,k),M(p,I,k)];i.quad(O,[h(D,S,1),h(D,S,1),h(D,I,1),h(D,I,1)],[[0,0],[g/3,0],[g/3,E/3],[0,E/3]]);let U=[M(p,S,0),M(m,S,0),M(m,S,k),M(p,S,k)];i.quad(U,[h(D,S,1.12),h(D,S,1.12),h(D,S,1.12),h(D,S,1.12)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([M(p,S,0),M(p,S,k),M(p,I,k),M(p,I,0)],[h(D,S,.7),h(D,S,.7),h(D,I,.7),h(D,I,.7)],[[0,0],[0,0],[0,0],[0,0]]),i.quad([M(m,S,k),M(m,S,0),M(m,I,0),M(m,I,k)],[h(D,S,.7),h(D,S,.7),h(D,I,.7),h(D,I,.7)],[[0,0],[0,0],[0,0],[0,0]]),x=R,y++}d+=u}return i.build()}function yy(s,e,t,n,i,r){let o=rn(500+t),a=e.r*(1.7+o()*.4),l=new It(e.r*.9,e.r*.98,a,48,4),c=l.getAttribute("position");for(let f=0;f<c.count;f++){let v=c.getX(f),b=c.getY(f),g=c.getZ(f),p=Math.atan2(g,v);if(Math.hypot(v,g)<1e-4)continue;let x=1-.05*Math.pow(.5+.5*Math.cos(p*24),3),y=b;b>a/2-.001&&(y=b-(.5+.5*Math.sin(p*3+t))*e.r*.35-o()*e.r*.05),c.setXYZ(f,v*x,y,g*x)}l.computeVertexNormals(),l.translate(0,a/2,0),i(l);let h=i(new Jt({map:n,color:15920352})),d=new Qe(l,h);d.castShadow=!0,d.receiveShadow=!0,d.position.set(e.pos.x,0,e.pos.z),d.rotation.y=o()*6,d.name="rock-column",s.add(d);let u=new Qe(i(new It(e.r*1.08,e.r*1.08,.18,32).translate(0,.09,0)),h);u.position.copy(d.position),u.receiveShadow=!0,u.castShadow=!0,s.add(u),r.push({x:e.pos.x,z:e.pos.z,mat:h,k:0})}function dc(s,e,t){let n=new Yt;s.add(n);let i=[],r=I=>(i.push(I),I);s.background=new st(zf()),s.fog=new po(zf(),uy,dy);let o=at.myth?new fr(10791124,8019008,1.3):new fr(13624063,9072210,1.7);n.add(o);let a=at.myth?new pr(16765594,4):new pr(16773590,2.7);at.myth?a.position.set(-15,8,7):a.position.set(-9,17,4),a.target.position.set(0,0,0),a.castShadow=!0,a.shadow.mapSize.set(t.shadowSize,t.shadowSize);let l=a.shadow.camera;l.left=-13.5,l.right=13.5,l.top=13.5,l.bottom=-13.5,l.near=4,l.far=48,at.myth&&(l.left=-16,l.right=16,l.top=16,l.bottom=-16,l.far=60),a.shadow.bias=-4e-4,a.shadow.normalBias=.04,n.add(a,a.target);let c=r(at.myth?Nf(e,t.groundTexSize):Kh(e,t.groundTexSize)),h=r(Lf()),d=r(new Jt({map:c})),u=null,f=r(new Jt({vertexColors:!0,map:h,side:un,emissive:at.myth?1381148:3946805})),v=r(new Jt({vertexColors:!0,side:un,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),b=new Qe(r(py(e)),d);b.receiveShadow=!0,n.add(b);let g=new Qe(r(my(e,at.myth)),f);if(at.myth){let I=new Qe(r(xy(e)),r(new Jt({vertexColors:!0})));I.receiveShadow=!0,n.add(I)}n.add(g);let p=new Qe(r(gy(e,at.myth)),v);p.receiveShadow=!0,n.add(p);{let I=rn(13),O=e.poly,U=O.length,G=Gf(O),q=70,J=r(new Qn(.09,.34,5).translate(0,.17,0)),ne=r(new Jt({flatShading:!0})),$=new Ln(J,ne,q),ce=new St,fe=new zn,Se=new H,qe=new H,Ne=new st,$e=new H(0,1,0);for(let tt=0;tt<q;tt++){let te=Math.floor(I()*U),j=.15+I()*1.1;qe.set(O[te].x-G[te].x*j,.01,O[te].z-G[te].z*j);let de=.55+I()*.6;Se.set(de,de*(.7+I()*.7),de),fe.setFromAxisAngle($e,I()*6),ce.compose(qe,fe,Se),$.setMatrixAt(tt,ce);let Me=.75+I()*.5;Ne.setRGB(.4*Me,.55*Me,.2*Me,Vt),$.setColorAt(tt,Ne)}$.receiveShadow=!0,n.add($)}let m=[],x=new st(16767392),y=at.myth?r(Of()):null;e.rocks.forEach((I,O)=>{if(y){yy(n,I,O,y,r,m);return}let U=rn(100+O),G=new Yt,q=r(new Jt({map:h,color:14867666,flatShading:!0}));m.push({x:I.pos.x,z:I.pos.z,mat:q,k:0});let J=r(new Jt({color:7311164,flatShading:!0})),ne=r(hc(200+O)),$=new Qe(ne,q);$.scale.set(I.r*1,I.r*1.05,I.r*.95),$.position.y=I.r*.62,$.rotation.y=U()*6,$.castShadow=!0,$.receiveShadow=!0,G.add($);let ce=new Qe(ne,J);ce.scale.set(I.r*.72,I.r*.2,I.r*.7),ce.position.y=I.r*1.5,ce.rotation.y=U()*6,ce.castShadow=!0,G.add(ce);for(let fe=0;fe<4;fe++){let Se=fe/4*Math.PI*2+U(),qe=I.r*(.85+U()*.5),Ne=new Qe(r(hc(300+O*10+fe)),q),$e=I.r*(.22+U()*.2);Ne.scale.set($e,$e*.8,$e),Ne.position.set(Math.cos(Se)*qe,$e*.45,Math.sin(Se)*qe),Ne.rotation.y=U()*6,Ne.castShadow=!0,Ne.receiveShadow=!0,G.add(Ne)}G.position.set(I.pos.x,0,I.pos.z),n.add(G)});{let I=r(new It(.8,1,1,6,1).translate(0,.5,0)),O=new It(1,.7,1,6,3).translate(0,-.5,0);{let re=rn(902),He=O.getAttribute("position");for(let nt=0;nt<He.count;nt++){let B=He.getY(nt);if(B<-.05&&B>-.95){let ut=.82+re()*.36;He.setXYZ(nt,He.getX(nt)*ut,B,He.getZ(nt)*ut)}}O.computeVertexNormals()}r(O);let U=r(hc(901)),G=rn(78),q=new St,J=new zn,ne=new H,$=new H,ce=new H(0,1,0),fe=new st;for(let re of[0,1,2]){let He=Vf.pillars.filter((me,dt)=>me.tier===re&&(!at.myth||dt%2===0)),nt=He[0].haze,B=r(cc(new Jt({map:h,flatShading:!0,color:at.myth?6972536:13683391}),nt,re===0?-.15:-4,re===0?-.95:-17,re===0?1:.92,re===0)),ut=r(cc(new Jt({flatShading:!0,color:at.myth?4608570:6982202}),nt,-4,-17,.92)),Ve=new Ln(re===0?O:I,B,He.length),Ge=new Ln(U,ut,He.length);He.forEach((me,dt)=>{if(J.setFromAxisAngle(ce,G()*3),me.len>0)$.set(me.x,me.top,me.z),ne.set(me.w,me.len,me.w);else{let Ye=Hf-22;$.set(me.x,Ye,me.z),ne.set(me.w,me.top-Ye,me.w)}q.compose($,J,ne),Ve.setMatrixAt(dt,q);let Ie=.82+G()*.3;Ve.setColorAt(dt,fe.setRGB(Ie,Ie*.98,Ie*.95,Vt)),$.set(me.x,me.top,me.z),ne.set(me.w*.92,me.capH,me.w*.92),q.compose($,J,ne),Ge.setMatrixAt(dt,q)}),Ve.frustumCulled=!1,Ge.frustumCulled=!1,n.add(Ve,Ge)}let Se=Vf.islets,qe=Se[0].haze,Ne=r(hc(950)),$e=r(new Qn(1,1.9,7).rotateX(Math.PI).translate(0,-.95,0)),tt=r(cc(new Jt({color:9077626,flatShading:!0}),qe,-6,-17,.9)),te=r(cc(new Jt({color:6982202,flatShading:!0}),qe,-6,-17,.9)),j=new Ln($e,tt,Se.length),de=new Ln(Ne,tt,Se.length),Me=new Ln(Ne,te,Se.length);Se.forEach((re,He)=>{J.setFromAxisAngle(ce,G()*6),$.set(re.x,re.y,re.z),ne.set(re.s,re.s*.3,re.s),q.compose($,J,ne),de.setMatrixAt(He,q),$.set(re.x,re.y+re.s*.12,re.z),ne.set(re.s*.82,re.s*.16,re.s*.82),q.compose($,J,ne),Me.setMatrixAt(He,q),$.set(re.x,re.y-re.s*.05,re.z),ne.set(re.s*.95,re.s,re.s*.95),q.compose($,J,ne),j.setMatrixAt(He,q)});for(let re of[j,de,Me])re.frustumCulled=!1,n.add(re)}let E=r(Df());E.repeat.set(2.4,2.4);let R=[],k=new Qe(r(new yn(400,400).rotateX(-Math.PI/2)),r(new en({fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:at.myth?"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.290,0.300,0.460), vec3(0.040,0.040,0.090), t); gl_FragColor = vec4(c, 1.0); }":"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), t); gl_FragColor = vec4(c, 1.0); }"})));k.position.y=Hf,n.add(k),[[-14,.12]].forEach(([I,O])=>{let U=r(new Kt({map:E,transparent:!0,opacity:at.myth?.07:O,depthWrite:!1,color:at.myth?6973088:13229298})),G=new Qe(r(new yn(260,260).rotateX(-Math.PI/2)),U);G.position.y=I,G.renderOrder=-5,n.add(G),R.push(G)});let D=r(kf()),M=[];{let I=rn(55);for(let O=0;O<(at.myth?0:12);O++){let U=r(new or({map:D,transparent:!0,opacity:.12+I()*.1,depthWrite:!1,color:14017782})),G=new go(U),q=I()*Math.PI*2,J=15+I()*28;G.position.set(Math.cos(q)*J,-7-I()*9,Math.sin(q)*J);let ne=14+I()*16;G.scale.set(ne,ne*.55,1),n.add(G),M.push(G)}}let S=0;return{hitRock(I,O){let U=m[0],G=1/0;for(let q of m){let J=(q.x-I)**2+(q.z-O)**2;J<G&&(G=J,U=q)}U&&(U.k=1)},setVariant(I){if(at.myth)return;let O=I==="v2"?u??(u=r(Kh(e,t.groundTexSize,!0))):c;d.map!==O&&(d.map=O,d.needsUpdate=!0)},update(I){S+=I;for(let O of m)O.k<=0||(O.k=Math.max(0,O.k-I/.35),O.mat.emissive.copy(x).multiplyScalar(.75*O.k*O.k));E.offset.set(S*.004,S*.002),R[R.length-1].position.x=Math.sin(S*.05)*4;for(let O=0;O<M.length;O++)M[O].position.x+=I*(.25+O%3*.12),M[O].position.x>48&&(M[O].position.x=-48)},root:n,dispose(){for(let I of i)I.dispose();n.removeFromParent()}}}var _y=new st(16777215),by=1.32,My=1.18,fc=1.55,Sy=.55,pc={0:{ring:3729663,armor:15134194,trim:2854822,cloth:3126728,skin:15122330,hair:16054008,dark:2765888,glow:5894399},1:{ring:16730685,armor:10234406,trim:4855060,cloth:8003356,skin:3811880,hair:8003356,dark:2824986,glow:16734780},2:{ring:16751150,armor:12740124,trim:5911572,cloth:9062932,skin:9067068,hair:3810322,dark:3023382,glow:16754746}},jh=16730685,Wf=2054758;function Xf(s){return at.myth&&s!==0?jh:pc[s].ring}function qf(s){return at.myth&&s!==0?pc[1].glow:pc[s].glow}var Go=class{constructor(e,t,n="default"){this.root=new Yt;this.ground=new Yt;this.pivot=new Yt;this.rig=new Yt;this.wpn=new Yt;this.legL=new Yt;this.legR=new Yt;this.cape=null;this.tail=null;this.halo=null;this.rim={uRimK:{value:0},uRimC:{value:new st}};this.identityMat=null;this.mats=[];this.ringMats=[];this.shadowMeshes=[];this.phase=0;this.lean=0;this.side=0;this.raise=0;this.crouch=0;this.lunge=0;this.bob=0;this.castT=99;this.castSkill=null;this.dustT=0;this.wasShadow=!0;this.pulseT=0;this.prevState="idle";this.weaponParts=[];this.xrayMat=null;this.xray=[];this.xrayOn=!1;this.fromLedge=!1;this.dropReason=null;this.ledgeEdge=null;this.shieldPivot=null;this.shieldMesh=null;this.shieldRest={x:0,y:0,z:0,rz:0};this.shieldMats=[];this.blockT=99;this.recoilT=99;this.airK=null;this.meleeT=99;this.meleeStep=1;this._gc=null;this.variant=t,this.look=n;let i=pc[n!=="default"&&t===2?1:t];if(this.palette=i,this.rim.uRimC.value.setHex(i.ring),n!=="default"){this.buildMyth(e,n);return}let r=D=>{let M=new Jt({color:D});return M.stencilWrite=!0,M.stencilRef=1,M.stencilFunc=nr,M.stencilZPass=tc,M.onBeforeCompile=S=>{S.uniforms.uRimK=this.rim.uRimK,S.uniforms.uRimC=this.rim.uRimC,S.fragmentShader=S.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},M.customProgramCacheKey=()=>"fighter-rim",this.mats.push(M),M},o=r(i.armor),a=r(i.trim),l=r(i.cloth),c=r(i.skin),h=r(i.hair),d=r(i.dark);this.glowMat=new Kt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let u=(D,M,S,I,O,U,G=!0)=>{let q=new Qe(M,S);return q.position.set(I,O,U),q.castShadow=G,G&&this.shadowMeshes.push(q),D.add(q),q};for(let[D,M]of[[this.legL,-.13],[this.legR,.13]])D.position.set(0,.86,M),u(D,new It(.085,.065,.66,8),d,0,-.33,0),u(D,new zt(.26,.12,.15),a,.05,-.74,0),this.rig.add(D);u(this.rig,new lr(.2,.36,4,10),o,0,1.2,0).scale.set(.8,1,1.25),u(this.rig,new It(.215,.215,.09,12),a,0,.96,0).scale.set(.82,1,1.28);for(let D of[-.27,.27])u(this.rig,new An(.14,10,8),a,0,1.46,D).scale.set(.9,.7,1);if(u(this.rig,new An(.17,14,12),c,.03,1.66,0),t===0){u(this.rig,new An(.2,14,12),h,-.03,1.7,0).scale.set(1,.92,1.04);let M=u(this.rig,new Qn(.1,.45,8),h,-.27,1.55,0);M.rotation.z=Math.PI/2+.5,this.tail=M,u(this.rig,new zt(.08,.06,.26),r(2808046),.14,1.67,0,!1)}else{u(this.rig,new An(.22,14,12),l,-.03,1.69,0).scale.set(1.05,.95,1.02);let M=u(this.rig,new Qn(.14,.4,8),l,-.25,1.6,0);M.rotation.z=Math.PI/2+.7,u(this.rig,new An(.12,10,8),d,.1,1.64,0,!1).scale.set(.8,1,1.15),u(this.rig,new zt(.06,.04,.16),this.glowMat,.17,1.66,0,!1)}let v=new Yt;v.position.set(-.17,1.5,0);let b=new It(.22,.4,.95,4,1).rotateY(Math.PI/4);u(v,b,t===0?r(2340812):l,0,-.45,0).scale.set(.12,1,1),this.rig.add(v),this.cape=v,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let p=[];for(let D of[-.26,.26]){let M=u(this.wpn,new It(.06,.05,.44,8),o,.17,-.05,D*.7);M.rotation.z=-Math.PI/2+.25,M.rotation.x=D>0?-.35:.35,p.push(M)}if(this.glowTip=new Qe(new An(.1,10,8),this.glowMat),t===0)u(this.wpn,new zt(.95,.13,.11),d,.62,-.08,.05),u(this.wpn,new zt(.3,.2,.09),a,.25,-.12,.05),u(this.wpn,new It(.05,.05,.5,8),d,1.25,-.08,.05).rotation.z=Math.PI/2,u(this.wpn,new zt(.2,.05,.05),r(5894399),.72,0,.05,!1),this.glowTip.position.set(1.52,-.08,.05);else if(t===1){u(this.wpn,new It(.035,.035,1.9,6),r(5913380),.65,-.07,.05).rotation.z=Math.PI/2;let D=u(this.wpn,new Qn(.1,.5,4),r(2763312),1.82,-.07,.05);D.rotation.z=-Math.PI/2,u(this.wpn,new Qi(.08,.025,6,10),a,1.55,-.07,.05).rotation.y=Math.PI/2,this.glowTip.position.set(2.1,-.07,.05)}else u(this.wpn,new It(.045,.045,1.4,6),r(4862496),.5,-.07,.05).rotation.z=Math.PI/2,u(this.wpn,new zt(.38,.34,.5),r(3747882),1.25,-.07,.05),u(this.wpn,new zt(.42,.1,.54),o,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);this.wpn.add(this.glowTip);for(let D of this.wpn.children)p.includes(D)||this.weaponParts.push(D);let m=new Kt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),x=new Kt({color:i.ring,transparent:!0,opacity:.2,depthWrite:!1,fog:!1});this.ringMats.push(m,x);let y=new Qe(new di(.6,.7,40).rotateX(-Math.PI/2),m),E=new Qe(new di(.7,.86,40).rotateX(-Math.PI/2),x);this.halo=E;let R=new Zt;R.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),R.setIndex([0,2,1]),R.computeVertexNormals();let k=new Qe(R,new Kt({color:i.ring,transparent:!0,opacity:.95,depthWrite:!1,side:un,fog:!1}));this.ringMats.push(k.material);for(let D of[y,E,k])D.renderOrder=6,this.ground.add(D);e.add(this.root,this.ground)}buildMyth(e,t){let n=this.variant===0,i=this.palette,r=n?i.ring:jh;this.rim.uRimC.value.setHex(r);let o=U=>(U.stencilWrite=!0,U.stencilRef=1,U.stencilFunc=nr,U.stencilZPass=tc,U.onBeforeCompile=G=>{G.uniforms.uRimK=this.rim.uRimK,G.uniforms.uRimC=this.rim.uRimC,G.fragmentShader=G.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRimK;
uniform vec3 uRimC;`).replace("#include <opaque_fragment>",`outgoingLight += uRimC * uRimK * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.0);
#include <opaque_fragment>`)},U.customProgramCacheKey=()=>"fighter-rim",this.mats.push(U),U),a=U=>o(new Jt({color:U})),l=(U,G,q)=>o(new es({color:U,metalness:G,roughness:q})),c=n?l(13144383,.85,.32):l(4935512,.75,.45),h=n?l(8411178,.8,.45):l(2829619,.7,.55),d=new Kt({color:n?1696754:16720916,fog:!1});this.identityMat=d;let u=a(n?38068:3025968),f=a(n?14264706:7228474),v=a(n?5913894:2366487),b=a(n?Wf:13904416),g=a(n?Wf:2762281),p=a(n?8018490:3812386);this.glowMat=new Kt({color:i.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let m=(U,G,q,J,ne,$,ce=!0)=>{let fe=new Qe(G,q);return fe.position.set(J,ne,$),fe.castShadow=ce,ce&&this.shadowMeshes.push(fe),U.add(fe),fe};for(let[U,G]of[[this.legL,-.13],[this.legR,.13]])U.position.set(0,.86,G),m(U,new It(.085,.07,.66,8),n?f:h,0,-.33,0),m(U,new It(.075,.08,.3,8),c,.01,-.5,0),m(U,new zt(.26,.12,.15),v,.05,-.74,0),this.rig.add(U);m(this.rig,new lr(.2,.36,4,10),c,0,1.2,0).scale.set(.82,1,1.25),m(this.rig,new It(.24,.3,.28,10),u,0,.94,0).scale.set(.85,1,1.2),m(this.rig,new It(.225,.225,.09,12),d,0,1.04,0,!1).scale.set(.84,1,1.28);for(let U of[-.27,.27])m(this.rig,new An(.14,10,8),n?d:a(13114900),0,1.46,U).scale.set(.95,.7,1);m(this.rig,new An(.16,12,10),f,.04,1.65,0),m(this.rig,new An(.2,14,12,0,Math.PI*2,0,Math.PI*.62),n?l(1489104,.5,.35):c,-.01,1.66,0).scale.set(1.05,1,1.05),m(this.rig,new zt(.05,.14,.05),c,.19,1.64,0,!1),m(this.rig,new Qi(.2,.055,6,14,Math.PI),n?b:d,-.01,1.78,0).scale.set(1.1,.9,.7);let y=new Yt;y.position.set(-.18,1.5,0),m(y,new It(n?.24:.2,n?.46:.32,n?1.05:.7,4,1).rotateY(Math.PI/4),g,0,n?-.5:-.35,0).scale.set(.12,1,1),this.rig.add(y),this.cape=y,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);let R=[];for(let U of[-.26,.26]){let G=m(this.wpn,new It(.06,.05,.44,8),n?u:h,.17,-.05,U*.7);G.rotation.z=-Math.PI/2+.25,G.rotation.x=U>0?-.35:.35,R.push(G)}if(this.glowTip=new Qe(new An(.1,10,8),this.glowMat),t==="myth-archer"){let U=new Yt;U.name="bow",U.position.set(.5,-.02,.05);let G=m(U,new Qi(.55,.03,6,20,Math.PI*.9),p,0,0,0);G.rotation.z=-Math.PI*.45,m(U,new It(.008,.008,1.08,4),a(14209216),.55*Math.cos(Math.PI*.45),0,0,!1),m(U,new It(.018,.018,.8,5),p,.25,0,0,!1).rotation.z=Math.PI/2,this.wpn.add(U),this.glowTip.position.set(.95,-.02,.05)}else if(this.variant===2&&t==="myth")m(this.wpn,new It(.045,.045,1.4,6),p,.5,-.07,.05).rotation.z=Math.PI/2,m(this.wpn,new zt(.38,.34,.5),h,1.25,-.07,.05),m(this.wpn,new zt(.42,.1,.54),b,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);else{let U=t==="myth-shield"?1.5:2.2,G=m(this.wpn,new It(.03,.03,U,6),p,U/2-.35,-.07,.05);G.rotation.z=Math.PI/2,G.name="spear";let q=m(this.wpn,new Qn(.075,.34,4),n?c:h,U-.18,-.07,.05);q.rotation.z=-Math.PI/2,this.glowTip.position.set(U+.02,-.07,.05)}this.wpn.add(this.glowTip);for(let U of this.wpn.children)R.includes(U)||this.weaponParts.push(U);if(n||t==="myth-shield"){let U=new Yt;if(U.name=n?"round-shield":"tower-shield",n)U.position.set(.3,1.18,-.2),U.rotation.z=.55,m(U,new It(.5,.5,.05,28).rotateZ(Math.PI/2),c,0,0,0),m(U,new Qi(.5,.05,6,28).rotateY(Math.PI/2),d,0,0,0,!1),m(U,new An(.1,10,8),d,.04,0,0,!1);else{U.position.set(.36,1.02,-.1),U.rotation.z=.25;let q=l(2829619,.7,.55),J=l(4935512,.75,.45),ne=a(13904416);this.shieldMats.push(q,J,ne),m(U,new zt(.07,1.25,.82),q,0,0,0),m(U,new zt(.08,1.31,.06),J,0,0,.41,!1),m(U,new zt(.08,1.31,.06),J,0,0,-.41,!1),m(U,new zt(.085,.86,.12),ne,0,0,0,!1)}let G=new Yt;G.add(U),this.rig.add(G),this.shieldPivot=G,this.shieldMesh=U,this.shieldRest={x:U.position.x,y:U.position.y,z:U.position.z,rz:U.rotation.z},this.weaponParts.push(U)}let k=new Kt({color:r,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),D=new Kt({color:r,transparent:!0,opacity:.38,depthWrite:!1,fog:!1});this.ringMats.push(k,D);let M=new Qe(new di(.55,.75,40).rotateX(-Math.PI/2),k),S=new Qe(new di(.75,.95,40).rotateX(-Math.PI/2),D);this.halo=S;let I=new Zt;I.setAttribute("position",new mt([1.22,0,0,.82,0,.2,.82,0,-.2],3)),I.setIndex([0,2,1]),I.computeVertexNormals();let O=new Qe(I,new Kt({color:r,transparent:!0,opacity:.95,depthWrite:!1,side:un,fog:!1}));this.ringMats.push(O.material);for(let U of[M,S,O])U.renderOrder=6,this.ground.add(U);e.add(this.root,this.ground)}buildXray(){let e=new Kt({color:this.look!=="default"&&this.variant!==0?jh:this.palette.ring,transparent:!0,opacity:Sy,depthFunc:mr,depthWrite:!1,fog:!1,stencilWrite:!0,stencilRef:1,stencilFunc:wh,stencilFail:Zn,stencilZFail:Zn,stencilZPass:Zn});this.xrayMat=e;let t=[];this.root.traverse(n=>{let i=n;i.isMesh&&!this.weaponParts.includes(i)&&t.push(i)});for(let n of t){let i=new Qe(n.geometry,e);i.visible=!1,i.renderOrder=30,n.add(i),this.xray.push(i)}}onMelee(e){this.meleeT=0,this.meleeStep=e}setAir(e){this.airK=e}onShieldBlock(){this.blockT=0}onRecoil(){this.recoilT=0}onLedgeDrop(e){this.fromLedge=!0,this.dropReason=e}update(e,t,n=!1){let i=this.palette,r=Math.hypot(e.moveVel.x,e.moveVel.z),o=e.state==="falling",a=e.state==="dead",l=e.state==="knocked",c=e.state==="ledge",h=e.state==="climb";c?(this.fromLedge=!0,this.dropReason=null):!o&&!l&&!a&&!h&&(this.fromLedge=!1),h&&e.stateT>=wt.climb*.999&&(this.fromLedge=!1);let d=h?ii(0,wt.climb,e.stateT):0;this.root.position.set(e.pos.x,e.y,e.pos.z);let u=n&&e.state==="windup"&&e.windup?Math.atan2(e.windup.dir.z,e.windup.dir.x):e.facing;this.root.rotation.y=-u,this.ground.position.set(e.pos.x,.035,e.pos.z),this.ground.rotation.y=-u,this.ground.scale.setScalar(n?e.radius/.6:My),this.halo&&this.halo.scale.setScalar(n?1.3:1),this.tail&&(this.tail.scale.setScalar(n?.55:1),this.tail.position.x=n?-.22:-.27),this.rim.uRimK.value=n?this.look!=="default"?this.variant===0?.5:.4:.9:0,this.castT+=t;let f=1;a&&(f=1-ii(1,1.5,e.stateT)),e.y<-16&&(f=0),this.root.visible=f>.01,this.ground.visible=!o&&!a&&e.y>-.2&&!c&&!(h&&d<.6)&&!(l&&this.fromLedge),this.root.scale.setScalar(Math.max(f,.001)*by);let v=!o&&e.y>-.4&&!c&&!h&&!this.fromLedge;if(v!==this.wasShadow){for(let j of this.shadowMeshes)j.castShadow=v;this.wasShadow=v}let b=0,g=0,p=.05,m=0,x=0,y=0,E=e.windup,R=E?_t(E.t/Math.max(E.dur,.01),0,1):0,k=this.castT<.3?this.castT/.3:1;if(e.state==="windup"&&E&&(y=n?Math.max(.45,R):R,E.skill==="enemyHeavy"?(p=bn(.05,2,ii(0,.85,R)),b=bn(0,.28,R),m=.04):E.skill==="enemyBasic"?(p=bn(.05,.35,R),x=-.16*R,b=.1*R):E.skill==="control"?(p=bn(.05,.22,R),x=-.1*R,b=.12*R,m=.05*R):(p=.3,x=-.12,b=.18)),this.castSkill&&this.castT<.45){let j=1-k;this.castSkill==="enemyHeavy"?(p=bn(-.45,2,j*j),b=bn(-.35,.1,j),x=.28*(1-j)):(p=bn(.05,.4,j),x=.42*(1-j),b=bn(-.3,0,j))}e.state==="recover"&&(b=Math.max(b,-.12)),this.blockT+=t,this.recoilT+=t,e.state==="hitstun"&&(this.recoilT<.35?(b=-.75,p=.9,m=0,x=-.25):(b=-.3,p=-.35,m=.05)),(e.state==="charge"||e.state==="windup"&&E?.skill==="charge")&&(b=.5,m=.12,x=.15,p=-.2),e.state==="guard"&&(p=-.3,b=.06,m=.06);let D=e.state==="windup"&&E&&(E.skill==="melee1"||E.skill==="melee2"||E.skill==="melee3")?E.skill:null;(D==="melee1"||D==="melee2")&&(x=-.12*R,p=.05);let M=(e.breakT??0)>0;if(M&&(b=.18,p=-.5),e.state==="dash"&&(b=-.42,m=.1,x=.12,p=.2),l){let j=Math.hypot(e.knockVel.x,e.knockVel.z)||1,de=(e.knockVel.x*Math.cos(e.facing)+e.knockVel.z*Math.sin(e.facing))/j,Me=(-e.knockVel.x*Math.sin(e.facing)+e.knockVel.z*Math.cos(e.facing))/j,re=.62*ii(0,.08,e.stateT);b=-re*de,g=re*Me,p=-.9,m=.06}let S=e.sinceShotT<.4?Math.exp(-e.sinceShotT*18):0;x-=S*.2,p+=S*.14,e.burstLeft>0&&(p=Math.max(p,.1),b=Math.max(b,.06));let I=n&&e.state==="windup"&&this.prevState!=="windup";this.prevState=e.state;let O=I?1:Tr(e.state==="windup"||this.castT<.45||l?30:16,t);this.lean+=(b-this.lean)*O,this.side+=(g-this.side)*O,this.raise+=(p-this.raise)*O,this.crouch+=(m-this.crouch)*O,this.lunge+=(x-this.lunge)*O;let U=!o&&!a&&!l&&r>.15&&e.state!=="dash";U&&(this.phase+=t*(6+r*1.7));let G=U?_t(r/5,.25,1)*.75:0,q=Math.sin(this.phase)*G,J=U?Math.abs(Math.sin(this.phase))*.05:0;this.bob+=(J-this.bob)*Tr(20,t);let ne=o?Math.sin(e.stateT*22)*.6:l?.55:e.state==="dash"?.9:0;if(this.legL.rotation.z=U?q:ne,this.legR.rotation.z=U?-q:-ne*(o?1:-.4),this.pivot.position.set(this.lunge,.9-this.crouch+this.bob,0),this.pivot.rotation.set(0,0,0),this.pivot.rotation.z=-this.lean,this.pivot.rotation.x=this.side,this.wpn.rotation.z=this.raise,this.wpn.position.x=.04+(S>0?-S*.12:0)+(e.state==="windup"&&E&&E.skill!=="enemyHeavy"?-.08*R:0),this.meleeT+=t,this.wpn.rotation.y=0,D==="melee3"&&(this.wpn.rotation.y=.9*R),this.meleeT<.2&&(this.meleeStep===3?this.wpn.rotation.y=bn(.9,-.9,_t(this.meleeT/.14,0,1)):this.wpn.position.x+=.42*(1-_t(this.meleeT/.18,0,1))),M&&(this.pivot.rotation.x+=Math.sin(this.pulseT*14)*.12,this.pivot.rotation.z+=Math.cos(this.pulseT*11)*.08),c){let j=ii(wt.protect,wt.hold,e.stateT),de=e.stateT;this.pivot.position.set(-.04+Math.sin(de*38)*.025*j,.9-fc,0),this.pivot.rotation.set(Math.sin(de*3.2)*.05,0,-.12),this.wpn.rotation.z=1.35+Math.sin(de*30)*.06*j,this.wpn.position.x=.04,this.legL.rotation.z=.12+Math.sin(de*5)*(.1+.25*j),this.legR.rotation.z=-.08+Math.sin(de*5+1.4)*(.1+.25*j)}else if(h){let j=Math.sin(d*Math.PI);this.pivot.position.set(.06*j,.9-fc*(1-d)+j*.22,0),this.pivot.rotation.set(0,0,-.5*j),this.wpn.rotation.z=bn(1.35,.05,d),this.legL.rotation.z=-.9*j,this.legR.rotation.z=-.7*j}else if(o&&this.fromLedge)this.pivot.position.y=.9-fc,this.dropReason==="timeout"?(this.pivot.rotation.set(e.stateT*1.2,0,e.stateT*.5),this.wpn.rotation.z=1.5,this.legL.rotation.z=.2,this.legR.rotation.z=-.2):this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(l&&this.fromLedge)this.pivot.position.y=.9-fc;else if(o)this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(a){let j=ii(0,.3,e.stateT);this.pivot.rotation.set(0,0,j*(Math.PI/2)),this.pivot.position.y=.9-j*.6,this.legL.rotation.z=j*.3,this.legR.rotation.z=j*-.2,this.wpn.rotation.z=-.4*j}if(this.shieldPivot&&this.shieldMesh){let j=e.shieldDir,de=e.state==="guard"&&e.shieldUp!==!1,Me=j?Math.atan2(j.z,j.x)-u:0,re=this.shieldMesh;this.shieldPivot.rotation.y=j&&(de||this.look==="myth-shield")?-Me:0,de?(re.position.set(.58,1.25,0),re.rotation.z=.3):M?(re.position.set(this.shieldRest.x+.12,.5,this.shieldRest.z-.12),re.rotation.z=-1):e.state==="charge"&&this.variant===0?(re.position.set(.42,1.15,0),re.rotation.z=.2):(re.position.set(this.shieldRest.x,this.shieldRest.y,this.shieldRest.z),re.rotation.z=this.shieldRest.rz)}let $=c||h&&d<.8||this.fromLedge;for(let j of this.weaponParts)j.visible=!$;let ce=c||h;if(ce&&!this.xrayMat&&this.buildXray(),ce!==this.xrayOn){for(let j of this.xray)j.visible=ce;this.xrayOn=ce}if(this.cape){let j=Math.sin(this.phase*.9+1.3)*.06*_t(r/5,0,1);this.cape.rotation.z=-(.12+_t(r/6,0,1)*.42+(e.state==="dash"?.45:0)+j+(o?.7:0)),this.cape.rotation.x=Math.sin(this.phase*.5)*.04,c&&(this.cape.rotation.z=-.05,this.cape.rotation.x=Math.sin(e.stateT*3.2)*.06)}let fe=_t(e.hitFlashT*10,0,1),Se=y*.2,qe=this.glowColor(i.glow),Ne=c&&e.stateT<wt.protect?.22*(1-ii(wt.protect*.7,wt.protect,e.stateT)):(e.protectT??0)>0?.3:0,$e=(e.armorT??0)>0?.22+.12*Math.sin(this.pulseT*20):0;for(let j of this.mats)j.emissive.setRGB(fe*.95+qe[0]*Se+Ne+$e,fe*.95+qe[1]*Se+Ne*.9+$e*.35,fe*.95+qe[2]*Se+Ne*.6+$e*.1);if(this.blockT<.15){let j=1.1*(1-this.blockT/.15);for(let de of this.shieldMats)de.emissive.setRGB(de.emissive.r+j,de.emissive.g+j,de.emissive.b+j)}let tt=_t(y+S*1.2+(this.castT<.25?.8:0),0,1);this.glowMat.opacity=.35+tt*.65,this.glowTip.scale.setScalar(.7+tt*1.5),this.glowMat.color.setHex(i.glow).lerp(_y,tt*.5),this.pulseT+=t;let te=e.state==="windup"?.7+.3*Math.sin(this.pulseT*30):1;if(this.ringMats[0].opacity=.95*te,this.airK!==null){let j=this.airK;j<.5?(this.pivot.rotation.set(0,0,-1.2*ii(.05,.35,j)),this.wpn.rotation.z=1.1):(this.pivot.rotation.set(0,0,.12),this.legL.rotation.z=.35,this.legR.rotation.z=-.35,this.wpn.rotation.z=.9),this.ground.visible=!1}if(e.state==="reviving")this.root.visible=!1,this.ground.visible=!1;else if((e.protectT??0)>0&&this.root.visible){let j=Math.floor(this.pulseT*12)%2===0;this.root.visible=j}}glowColor(e){if(!this._gc){let t=new st(e);this._gc=[t.r,t.g,t.b]}return this._gc}wantDust(e,t){return e.state!=="knocked"?(this.dustT=0,!1):(this.dustT-=t,this.dustT<=0?(this.dustT=.045,!0):!1)}tipWorld(e){return this.root.updateMatrixWorld(!0),this.glowTip.getWorldPosition(e)}dispose(){for(let e of[this.root,this.ground])e.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose()});for(let e of this.mats)e.dispose();this.glowMat.dispose(),this.xrayMat?.dispose(),this.identityMat?.dispose();for(let e of this.ringMats)e.dispose();this.root.removeFromParent(),this.ground.removeFromParent()}};var wy=`
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
}`,Ey=`
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
}`,Wo=class{constructor(e,t){this.n=0;this.cap=e,this.p=new Float32Array(e*3),this.v=new Float32Array(e*3),this.s=new Float32Array(e*4),this.c=new Float32Array(e*4),this.l=new Float32Array(e*4),this.fl=new Uint8Array(e);let n=new yn(1,1);this.geo=new Do,this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.geo.setAttribute("uv",n.getAttribute("uv")),this.aPosSize=new Ii(new Float32Array(e*4),4),this.aColor=new Ii(new Float32Array(e*4),4),this.aShape=new Ii(new Float32Array(e*2),2);for(let i of[this.aPosSize,this.aColor,this.aShape])i.setUsage(nc);this.geo.setAttribute("aPosSize",this.aPosSize),this.geo.setAttribute("aColor",this.aColor),this.geo.setAttribute("aShape",this.aShape),this.geo.instanceCount=0,this.mat=new en({vertexShader:wy,fragmentShader:Ey,transparent:!0,depthWrite:!1,blending:t?pi:Ri,fog:!1}),this.mesh=new Qe(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:15}get count(){return this.n}spawn(e){if(this.n>=this.cap)return;let t=this.n++;this.p[t*3]=e.x,this.p[t*3+1]=e.y,this.p[t*3+2]=e.z,this.v[t*3]=e.vx??0,this.v[t*3+1]=e.vy??0,this.v[t*3+2]=e.vz??0,this.s[t*4]=e.size,this.s[t*4+1]=e.size1??e.size,this.s[t*4+2]=e.aspect??1,this.s[t*4+3]=e.crisp??0,this.c[t*4]=e.color[0],this.c[t*4+1]=e.color[1],this.c[t*4+2]=e.color[2],this.c[t*4+3]=e.alpha??1,this.l[t*4]=0,this.l[t*4+1]=e.life,this.l[t*4+2]=e.gravity??0,this.l[t*4+3]=e.drag??0,this.fl[t]=e.floor===!1?0:1}update(e){let t=0;for(;t<this.n;){let o=t*4,a=t*3;if(this.l[o]+=e,this.l[o]>=this.l[o+1]){this.remove(t);continue}let l=Math.exp(-this.l[o+3]*e);this.v[a]*=l,this.v[a+1]=this.v[a+1]*l-this.l[o+2]*e,this.v[a+2]*=l,this.p[a]+=this.v[a]*e,this.p[a+1]+=this.v[a+1]*e,this.p[a+2]+=this.v[a+2]*e,this.fl[t]&&this.p[a+1]<.03&&this.l[o+2]>0&&this.p[a+1]>-1&&(this.p[a+1]=.03,this.v[a+1]*=-.25,this.v[a]*=.6,this.v[a+2]*=.6),t++}let n=this.aPosSize.array,i=this.aColor.array,r=this.aShape.array;for(let o=0;o<this.n;o++){let a=this.l[o*4]/this.l[o*4+1];n[o*4]=this.p[o*3],n[o*4+1]=this.p[o*3+1],n[o*4+2]=this.p[o*3+2],n[o*4+3]=this.s[o*4]+(this.s[o*4+1]-this.s[o*4])*a,i[o*4]=this.c[o*4],i[o*4+1]=this.c[o*4+1],i[o*4+2]=this.c[o*4+2];let l=1-a;i[o*4+3]=this.c[o*4+3]*l*(a<.08?a/.08+.2:1),r[o*2]=this.s[o*4+2],r[o*2+1]=this.s[o*4+3]}this.aPosSize.needsUpdate=!0,this.aColor.needsUpdate=!0,this.aShape.needsUpdate=!0,this.geo.instanceCount=this.n}clear(){this.n=0,this.geo.instanceCount=0}remove(e){let t=--this.n;e!==t&&(this.p.copyWithin(e*3,t*3,t*3+3),this.v.copyWithin(e*3,t*3,t*3+3),this.s.copyWithin(e*4,t*4,t*4+4),this.c.copyWithin(e*4,t*4,t*4+4),this.l.copyWithin(e*4,t*4,t*4+4),this.fl[e]=this.fl[t])}dispose(){this.geo.dispose(),this.mat.dispose()}},Xo=class{constructor(e,t){this.n=0;this.m=new St;this.col=new st;this.X=new H;this.Y=new H;this.Z=new H;this.P=new H;this.view=new H(0,-1,-1).normalize();this.cap=e;let n=new Kt({map:t,transparent:!0,depthWrite:!1,blending:pi,fog:!1});this.mesh=new Ln(new yn(1,1),n,e),this.mesh.instanceMatrix.setUsage(nc),this.mesh.frustumCulled=!1,this.mesh.renderOrder=22,this.mesh.count=0,this.mesh.setColorAt(0,this.col.setRGB(1,1,1))}begin(){this.n=0}push(e,t,n,i,r,o){if(this.n>=this.cap||o<=.003)return;this.X.copy(t).normalize(),this.Y.crossVectors(this.X,this.view),this.Y.lengthSq()<1e-6&&this.Y.set(0,1,0),this.Y.normalize(),this.Z.crossVectors(this.X,this.Y).normalize(),this.P.copy(e).addScaledVector(this.X,-n/2),this.m.makeBasis(this.X.multiplyScalar(n),this.Y.multiplyScalar(i),this.Z),this.m.setPosition(this.P),this.mesh.setMatrixAt(this.n,this.m),this.col.setRGB(r[0],r[1],r[2],Vt).multiplyScalar(o);let a=this.mesh.instanceColor.array;a[this.n*3]=this.col.r,a[this.n*3+1]=this.col.g,a[this.n*3+2]=this.col.b,this.n++}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};var eu=.05,Yf=`
varying vec2 vP;
void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ty=`
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
}`,Ay=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ry=`
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
}`,Cy=`
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
}`,mc=class{constructor(e,t){this.items=[];this.used=0;let n=new yn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new H(1,0,0)},uHalf:{value:.8},uProgress:{value:1},uAlpha:{value:1},uTime:{value:0},uBase:{value:.16},uEdge:{value:0}},o=new en({vertexShader:Yf,fragmentShader:Ty,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Qe(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=.16,h=0){if(this.used>=this.items.length)return;let d=this.items[this.used++];d.mesh.visible=!0,d.mesh.position.set(e,eu,t),d.mesh.rotation.y=-n,d.mesh.scale.set(i,1,i),d.u.uColor.value.set(a[0],a[1],a[2]),d.u.uHalf.value=r,d.u.uProgress.value=o,d.u.uAlpha.value=l,d.u.uBase.value=c,d.u.uEdge.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Qh=class{constructor(e,t){this.items=[];this.used=0;let n=new yn(1,1).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new H(1,0,0)},uAlpha:{value:1},uFill:{value:1},uSoft:{value:1},uBase:{value:.2}},o=new en({vertexShader:Ay,fragmentShader:Ry,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Qe(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o,a,l,c=1,h=.2){if(this.used>=this.items.length)return;let d=this.items[this.used++];d.mesh.visible=!0,d.mesh.position.set(e+Math.cos(n)*i*.5,eu,t+Math.sin(n)*i*.5),d.mesh.rotation.y=-n,d.mesh.scale.set(i,1,r),d.u.uColor.value.set(a[0],a[1],a[2]),d.u.uFill.value=o,d.u.uAlpha.value=l,d.u.uSoft.value=c,d.u.uBase.value=h}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},qo=class{constructor(e,t){this.items=[];this.used=0;let n=new yn(2,2).rotateX(-Math.PI/2);for(let i=0;i<t;i++){let r={uColor:{value:new H(1,0,0)},uProgress:{value:0},uAlpha:{value:1}},o=new en({vertexShader:Yf,fragmentShader:Cy,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Qe(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,i,r,o){if(this.used>=this.items.length)return;let a=this.items[this.used++];a.mesh.visible=!0,a.mesh.position.set(e,eu,t),a.mesh.scale.set(n,1,n),a.u.uColor.value.set(r[0],r[1],r[2]),a.u.uProgress.value=i,a.u.uAlpha.value=o}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Iy=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Py=`
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
}`,gc=class{constructor(e,t){this.beams=[];this.time=0;let n=new yn(2.6,10).translate(0,5,0);for(let i=0;i<t;i++){let r={uColor:{value:new H(1,.94,.78)},uAlpha:{value:1},uTime:{value:0}},o=new en({vertexShader:Iy,fragmentShader:Py,uniforms:r,transparent:!0,depthWrite:!1,blending:pi,fog:!1,side:un}),a=new Qe(n,o);a.visible=!1,a.renderOrder=7,a.frustumCulled=!1,e.add(a),this.beams.push({mesh:a,u:r})}this.rings=new qo(e,t)}update(e,t,n){this.time+=n,this.rings.begin();for(let i=0;i<this.beams.length;i++){let r=this.beams[i],o=e[i];if(r.mesh.visible=!!o,!o)continue;r.mesh.position.set(o.pos.x,0,o.pos.z),r.mesh.rotation.y=Math.atan2(t.position.x-o.pos.x,t.position.z-o.pos.z);let a=Math.max(0,Math.min(1,o.progress));r.u.uTime.value=this.time*(1+a*2),r.u.uAlpha.value=.75+.25*a+.1*Math.sin(this.time*4),this.rings.push(o.pos.x,o.pos.z,1,a,[1,.86+.14*a,.55+.45*a],.85+.15*a)}this.rings.end()}},vc=class{constructor(e){this.sectors=new mc(e,5),this.flashes=new mc(e,4),this.strips=new Qh(e,8)}};var $f=2*Math.PI*15,Ly="#ffe6a3",Kf="render-overlay-style",xc=class{constructor(e){this.root=e;this.bars=new Map;this.arrows=new Map;this.ledgeRings=new Map;this.breakMarks=new Map;this.cloud=null;this.clock=0;this.nums=[];this.w=852;this.h=393;if(e.style.pointerEvents="none",e.style.overflow="hidden",!document.getElementById(Kf)){let t=document.createElement("style");t.id=Kf,t.textContent=`
        .ro-abs{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
        .ro-bar{background:rgba(6,12,20,.78);border:1px solid rgba(0,0,0,.55);border-radius:3px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.45)}
        .ro-bar>div{position:absolute;left:0;top:0;bottom:0;display:block;transform-origin:0 50%}
        .ro-num{font:800 16px/1 "Segoe UI",system-ui,-apple-system,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.5);white-space:nowrap}
        .ro-arrow{width:0;height:0}
        .ro-ledge{width:0;height:0}
        .ro-ledge>svg{position:absolute;overflow:visible;filter:drop-shadow(0 0 2px rgba(0,0,0,.85))}
        .ro-arrow>i{position:absolute;left:-13px;top:-11px;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:20px solid #ff4a3d;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}
      `,document.head.appendChild(t)}for(let t=0;t<18;t++){let n=document.createElement("div");n.className="ro-abs ro-num",n.style.opacity="0",e.appendChild(n),this.nums.push({el:n,x:0,z:0,y:0,age:0,life:.8,active:!1,drift:0,ox:0,oy:0,rise:46})}}resize(e,t){this.w=e,this.h=t}spawnNumber(e,t,n,i,r,o){let a=this.nums.find(l=>!l.active)??this.nums.reduce((l,c)=>l.age>c.age?l:c);a.active=!0,a.age=0,a.life=.85,a.x=e.x,a.z=e.z,a.y=t,o?(a.drift=0,a.ox=o.x,a.oy=o.y,a.rise=14):(a.ox=0,a.oy=0,a.rise=46,a.drift=(Math.random()-.5)*22),a.el.textContent=n,a.el.style.color=$h(i),a.el.style.fontSize=`${Math.round(r)}px`}makeBar(e){let t=document.createElement("div");t.className="ro-abs ro-bar";let n=document.createElement("div"),i=document.createElement("div");return n.style.background="#fff",n.style.opacity="0.85",i.style.background=e==="player"?"linear-gradient(#7ff6ff,#27c6dc)":"linear-gradient(#ff6a5c,#d12c26)",t.appendChild(n),t.appendChild(i),this.root.appendChild(t),{el:t,fill:i,lag:n,lagV:1,team:e}}makeArrow(){let e=document.createElement("div");return e.className="ro-abs ro-arrow",e.appendChild(document.createElement("i")),this.root.appendChild(e),e}makeLedgeRing(){let e=document.createElement("div");e.className="ro-abs ro-ledge";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-20 -20 40 40");let i=document.createElementNS(t,"circle"),r=document.createElementNS(t,"circle");for(let o of[i,r])o.setAttribute("r","15"),o.setAttribute("fill","none");return i.setAttribute("stroke","rgba(0,0,0,0.45)"),i.setAttribute("stroke-width","6"),r.setAttribute("stroke-width","4"),r.setAttribute("stroke-linecap","round"),r.setAttribute("transform","rotate(-90)"),r.setAttribute("stroke-dasharray",String($f)),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,arc:r,base:i}}updateLedge(e,t,n){this.clock+=n;let i=new Set,r=Math.round(_t(this.h*.095,30,72));for(let o of e){if(o.state!=="ledge")continue;i.add(o.id);let a=this.ledgeRings.get(o.id);a||(a=this.makeLedgeRing(),this.ledgeRings.set(o.id,a));let l=_t(1-o.stateT/wt.hold,0,1),c=o.stateT<wt.protect,h=!c&&l<.375,d=c?Ly:$h(Xf(o.variant));a.arc.setAttribute("stroke",d),a.arc.setAttribute("stroke-dashoffset",($f*(1-l)).toFixed(2)),a.arc.setAttribute("stroke-width",h?"5.5":"4"),a.arc.dataset.left=l.toFixed(4),a.arc.dataset.phase=c?"protect":"hold";let u=h?1+.12*Math.abs(Math.sin(this.clock*26)):1,f=t(o.pos,.15),v=a.el.firstChild;v.setAttribute("width",String(r)),v.setAttribute("height",String(r)),v.style.left=`${-r/2}px`,v.style.top=`${-r/2}px`,a.el.style.opacity="1",a.el.style.transform=`translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px,0) scale(${u.toFixed(3)})`}for(let[o,a]of this.ledgeRings)i.has(o)||(a.el.remove(),this.ledgeRings.delete(o))}makeBreakMark(){let e=document.createElement("div");e.className="ro-abs ro-break",e.style.width="0",e.style.height="0";let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("viewBox","-12 -13 24 26"),n.style.position="absolute",n.style.overflow="visible",n.style.filter="drop-shadow(0 0 2px rgba(0,0,0,.9))";let i=document.createElementNS(t,"path");i.setAttribute("d","M0 -11 L10 -7 L9 3 Q6 9 0 12 Q-6 9 -9 3 L-10 -7 Z"),i.setAttribute("stroke","rgba(0,0,0,.6)"),i.setAttribute("stroke-width","1.5");let r=document.createElementNS(t,"path");return r.setAttribute("d","M1 -11 L-2 -4 L3 0 L-1 5 L1 12"),r.setAttribute("fill","none"),r.setAttribute("stroke","rgba(20,16,24,.95)"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linejoin","round"),n.appendChild(i),n.appendChild(r),e.appendChild(n),this.root.appendChild(e),{el:e,svg:n}}updateBreakMarks(e,t,n){let i=null;for(let a of e)(a.counterT??0)>0&&a.counterTargetId!=null&&(i=a.counterTargetId);let r=new Set,o=Math.round(_t(this.h*.06,18,44));for(let a of e){if(!((a.breakT??0)>0)||a.state==="dead"||a.state==="falling")continue;r.add(a.id);let l=this.breakMarks.get(a.id);l||(l=this.makeBreakMark(),this.breakMarks.set(a.id,l));let c=a.id===i,h=t(a.pos,n?n(a):2.25),d=Math.round(_t(this.h*.11,38,92)),u=c?1+.18*Math.abs(Math.sin(this.clock*12)):1;l.svg.firstChild.setAttribute("fill",c?"#ffc23a":"#e9e6df"),l.el.dataset.mark=c?"counter":"break",l.svg.setAttribute("width",String(o)),l.svg.setAttribute("height",String(Math.round(o*1.08))),l.svg.style.left=`${-o/2}px`,l.svg.style.top=`${-o*.54}px`,l.el.style.opacity=h.visible?"1":"0",l.el.style.transform=`translate3d(${(h.x-d/2-o*.55).toFixed(1)}px,${h.y.toFixed(1)}px,0) scale(${u.toFixed(3)})`}for(let[a,l]of this.breakMarks)r.has(a)||(l.el.remove(),this.breakMarks.delete(a))}setClouds(e,t){if(e<=.001){this.cloud&&(this.cloud.style.opacity="0");return}if(!this.cloud){let i=document.createElement("div");i.className="ro-cloud",i.style.cssText="position:absolute;inset:0;z-index:5;pointer-events:none;will-change:opacity,background-position;background-color:#d9d3e6;background-image:radial-gradient(ellipse 38% 20% at 30% 40%,rgba(246,243,250,.95),rgba(246,243,250,0) 70%),radial-gradient(ellipse 34% 18% at 72% 58%,rgba(240,236,247,.9),rgba(240,236,247,0) 70%),radial-gradient(ellipse 46% 20% at 52% 50%,rgba(196,188,214,.7),rgba(196,188,214,0) 70%),radial-gradient(ellipse 40% 20% at 18% 55%,rgba(250,248,252,.85),rgba(250,248,252,0) 70%);background-size:100% 160%,100% 140%,100% 180%,100% 150%;background-repeat:repeat-y;",this.root.appendChild(i),this.cloud=i}let n=Math.max(0,t)*this.h*2.2;this.cloud.style.opacity=e.toFixed(3),this.cloud.style.backgroundPosition=`0 ${(-n).toFixed(1)}px,0 ${(-n*1.4).toFixed(1)}px,0 ${(-n*.8).toFixed(1)}px,0 ${(-n*1.8).toFixed(1)}px`}update(e,t,n,i){this.updateLedge(e,t,n),(this.breakMarks.size||e.some(l=>(l.breakT??0)>0))&&this.updateBreakMarks(e,t,i);let r=new Set,o=Math.round(_t(this.h*.11,38,92)),a=Math.round(_t(this.h*.017,5,9));for(let l of e){r.add(l.id);let c=this.bars.get(l.id);c||(c=this.makeBar(l.team),this.bars.set(l.id,c));let h=l.state!=="dead"&&l.state!=="falling"&&l.state!=="reviving"&&l.hp>0,d=t(l.pos,i?i(l):2.25),u=h&&d.visible;if(c.el.style.opacity=u?"1":"0",u){let f=_t(l.hp/l.maxHp,0,1);c.lagV=f>=c.lagV?f:Math.max(f,c.lagV-n*.7),c.el.style.width=`${o}px`,c.el.style.height=`${a}px`,c.el.style.transform=`translate3d(${Math.round(d.x-o/2)}px,${Math.round(d.y-a/2)}px,0)`,c.fill.style.width=`${(f*100).toFixed(1)}%`,c.lag.style.width=`${(c.lagV*100).toFixed(1)}%`}if(l.team==="enemy"){let f=this.arrows.get(l.id);f||(f={el:this.makeArrow(),id:l.id},this.arrows.set(l.id,f));let v=t(l.pos,1),b=10;if(h&&(v.x<b||v.x>this.w-b||v.y<b||v.y>this.h-b||!v.visible)){let p=this.w/2,m=this.h/2,x=v.x-p,y=v.y-m;Math.abs(x)<.001&&Math.abs(y)<.001&&(y=-1);let E=26,R=Math.min((p-E)/Math.max(Math.abs(x),.001),(m-E)/Math.max(Math.abs(y),.001)),k=p+x*R,D=m+y*R,M=Math.atan2(y,x);f.el.style.opacity="1",f.el.style.transform=`translate3d(${k.toFixed(1)}px,${D.toFixed(1)}px,0) rotate(${M}rad)`}else f.el.style.opacity="0"}}for(let[l,c]of this.bars)r.has(l)||(c.el.remove(),this.bars.delete(l));for(let[l,c]of this.arrows)r.has(l)||(c.el.remove(),this.arrows.delete(l));for(let l of this.nums){if(!l.active)continue;if(l.age+=n,l.age>=l.life){l.active=!1,l.el.style.opacity="0";continue}let c=l.age/l.life,h=t({x:l.x,z:l.z},l.y),d=l.rise*(1-Math.pow(1-c,2)),u=c<.12?.7+c/.12*.6:1.3-Math.min(.3,(c-.12)*.7);l.el.style.opacity=String(c<.6?1:1-(c-.6)/.4),l.el.style.transform=`translate3d(${(h.x+l.drift*c+l.ox).toFixed(1)}px,${(h.y-d+l.oy).toFixed(1)}px,0) translate(-50%,-50%) scale(${u.toFixed(2)})`}}clear(){for(let e of this.ledgeRings.values())e.el.remove();this.ledgeRings.clear();for(let e of this.breakMarks.values())e.el.remove();this.breakMarks.clear();for(let e of this.nums)e.active=!1,e.el.style.opacity="0";for(let e of this.bars.values())e.el.remove();for(let e of this.arrows.values())e.el.remove();this.bars.clear(),this.arrows.clear()}dispose(){this.clear();for(let e of this.nums)e.el.remove()}};var yc=class extends ui{constructor(){super();let e=new zt;e.deleteAttribute("uv");let t=new es({side:mn}),n=new es,i=new Po(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new Qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ln(e,n,6),a=new tn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Qe(e,Ar(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Qe(e,Ar(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Qe(e,Ar(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Qe(e,Ar(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Qe(e,Ar(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Qe(e,Ar(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ar(s){return new Jt({color:0,emissive:16777215,emissiveIntensity:s})}var _c=38,Ui=51*Math.PI/180,Dy=at.near?12.5:15.3,ky=at.near?22.1*(12.5/15.3):22.1,Zf=.6,Fy=2.6,Uy=218,Ny=154,Oy=(Uy-Ny)/2,Ss=Dn(5239039),on=[1,1,1],ws=Dn(16726832),Mn=Dn(16747050),By=[.72,.74,.78],Jf=Dn(12098936),Rr=Dn(9077624),Es=[.86,.87,.9],zy=Dn(16773572),Hy=Dn(15260868),gi=Dn(16758062),Vy=Dn(16773824),Gy=Dn(16764774),tu=Dn(16773320),Wy=Dn(5922408),vi={melee:[2.2,2.4,2],sweepHalf:70*Math.PI/180,charge:4,bash:3.2,bashHalf:40*Math.PI/180,guardHalf:70*Math.PI/180};function Cr(s,e,t,n,i,r){let o=r;for(let a of s){let l=e-a.pos.x,c=t-a.pos.z,h=l*n+c*i,d=l*l+c*c-a.r*a.r,u=h*h-d;if(u<0)continue;let f=-h-Math.sqrt(u);f>0&&f<o&&(o=f)}return o}function jf(s,e,t){let n=t,i=Math.min(window.devicePixelRatio||1,2),r=new oc({canvas:s,antialias:i<2,powerPreference:"high-performance",alpha:!1,stencil:!0});r.setPixelRatio(i),r.shadowMap.enabled=!0,r.shadowMap.type=al,r.outputColorSpace=Vt;let o=()=>{r.toneMapping=at.myth?ml:ei,r.toneMappingExposure=at.myth?1.22:1};at.myth&&o(),typeof window<"u"&&(window.__THREE_GAME_DIAGNOSTICS__={renderer:r.info});let a=new ui,l=/iPhone|iPad|Android/i.test(navigator.userAgent),c={shadowSize:l?1536:2048,groundTexSize:l?1024:2048},h=dc(a,n,c),d=new Map,u=z=>`${z.poly.length}:${z.poly[0].x.toFixed(3)},${z.poly[0].z.toFixed(3)}:${z.rocks.map(_=>`${_.pos.x.toFixed(2)},${_.pos.z.toFixed(2)},${_.r}`).join(";")}`,f=u(t),v=(z,_)=>`${z?"m":"b"}|${u(_)}`;d.set(v(at.myth,n),{world:h,background:a.background,fog:a.fog});let b=null,g=()=>{if(!b){let z=new Sr(r);b=z.fromScene(new yc,.04).texture,z.dispose()}return b},p=()=>{a.environment=at.myth?g():null,a.environmentIntensity=.7};at.myth&&p();function m(z){let _=new ui;return{world:dc(_,z,c),background:_.background,fog:_.fog}}function x(z,_){if(z.world===h){n=_;return}let P=h;h.root.removeFromParent(),a.add(z.world.root),a.background=z.background,a.fog=z.fog,h=z.world,n=_;for(let[w,A]of d)A.world===P&&!w.endsWith(`|${f}`)&&(P.dispose(),d.delete(w))}function y(z){at.myth=z;let _=v(z,n),P=d.get(_);P||(P=m(n),d.set(_,P)),x(P,n),o(),p();for(let w of me.values())w.dispose();me.clear()}let E=null,R=[],k=null,D=null,M=0;function S(z){if(u(z)===u(n)){n=z,E=null;return}E&&u(E.isl)===u(z)||(E={isl:z,stage:0,slot:null})}function I(z){let _=E;if(!_)return;let P=v(at.myth,_.isl);for(;;){if(_.stage===0)_.slot=d.get(P)??null,_.slot||(_.slot=m(_.isl),d.set(P,_.slot)),_.stage=1;else if(_.stage===1){let w=new ui;w.add(_.slot.world.root),w.environment=a.environment,w.environmentIntensity=a.environmentIntensity,w.fog=_.slot.fog,r.compile(w,Ne),_.slot.world.root.traverse(A=>{let L=A.material;for(let V of Array.isArray(L)?L:L?[L]:[])for(let W of Object.values(V))W&&W.isTexture&&r.initTexture(W)}),_.slot.world.root.removeFromParent(),_.stage=2}else{if(z&&M<.95)return;R.push({inAir:z,cover:M}),x(_.slot,_.isl),E=null;return}if(z)return}}let O=z=>z<.3?U(.08,.3,z):1-U(.68,.92,z);function U(z,_,P){let w=_t((P-z)/(_-z),0,1);return w*w*(3-2*w)}function G(z,_,P){if(_<.5){let L=P??z.pos,V=Math.hypot(L.x,L.z)||1,W=2.2*U(0,.5,_),X=_<.2?1.1*Math.sin(_/.2*(Math.PI/2)):1.1-Math.pow((_-.2)/.3,2)*9;return{pos:{x:L.x+L.x/V*W,z:L.z+L.z/V*W},y:X}}let w=Tc(z.pos,n.poly)&&Et(z.pos,n.poly)>2,A=(1-_)/.5;return{pos:w?z.pos:{x:0,z:0},y:9*A*A}}let q=new Map,J=z=>{if(!at.myth)return"default";let _=q.get(z.id);return _||(z.kit==="shieldbearer"?"myth-shield":z.kit==="archer"?"myth-archer":"myth")},ne=[],$=new Map,ce=[],fe=null,Se=new Map,qe=!0,Ne=new hn(_c,16/9,1,220);Ne.rotation.set(-Ui,0,0);let $e=new hn(_c,16/9,1,220);$e.rotation.set(-Ui,0,0);let tt=new H(0,-Math.sin(Ui),-Math.cos(Ui)),te=new H(1,0,0),j=new H(0,Math.cos(Ui),-Math.sin(Ui)),de=new Wo(900,!0),Me=new Wo(520,!1),re=new Xo(200,Ff()),He=new Xo(40,Uf());re.view.copy(tt),He.view.copy(tt);let nt=new vc(a);a.add(Me.mesh,de.mesh,re.mesh,He.mesh);let B=[];{let z=new di(.86,1,56).rotateX(-Math.PI/2);for(let _=0;_<10;_++){let P=new Kt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:pi,fog:!1}),w=new Qe(z,P);w.visible=!1,w.renderOrder=7,w.frustumCulled=!1,a.add(w),B.push({mesh:w,mat:P,age:0,life:1,r0:0,r1:1,alpha:1,on:!1})}}let ut=[],Ve=[],Ge=new xc(e),me=new Map,dt=new Map,Ie=s.clientWidth||window.innerWidth||852,Ye=s.clientHeight||window.innerHeight||393,Gt=-.8,gt=new Ce(0,Gt),N=0,T=0,K=0,oe=new Ce,he=0,ie=1,Oe=0,le=new H,Pe=new H,ke=new H;function ye(z){let _=Math.tan(_c*Math.PI/360);return Math.max(Dy/2/_,ky/2/(z*_))}function we(z,_,P,w,A=0,L=0){z.position.set(_+A,w*Math.sin(Ui)+L,P+w*Math.cos(Ui)),z.updateMatrixWorld(!0)}function Ke(z,_){Ie=Math.max(1,z),Ye=Math.max(1,_),r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setSize(Ie,Ye,!1);for(let w of[Ne,$e])w.aspect=Ie/Ye,w.updateProjectionMatrix();Ge.resize(Ie,Ye);let P=ye(Ie/Ye);we(Ne,gt.x,gt.y,P),we($e,gt.x,gt.y,P)}function ze(z,_=0){return ke.set(z.x,_,z.z).project(Ne),{x:(ke.x*.5+.5)*Ie,y:(-ke.y*.5+.5)*Ye,visible:ke.z<1&&ke.x>=-1&&ke.x<=1&&ke.y>=-1&&ke.y<=1}}function Te(z,_){let P=z/Ie*2-1,w=-(_/Ye)*2+1;if(le.set(P,w,.5).unproject($e),Pe.copy(le).sub($e.position),Pe.y>-1e-6)return null;let A=-$e.position.y/Pe.y;return A>0?{x:$e.position.x+Pe.x*A,z:$e.position.z+Pe.z*A}:null}let Fe=()=>Math.random(),F=(z,_)=>z+(_-z)*Fe();function pe(z,_,P,w,A,L,V){let W=B.find(X=>!X.on)??B[0];W.on=!0,W.age=0,W.life=A,W.r0=P,W.r1=w,W.alpha=V,W.mesh.position.set(z,.09,_),W.mat.color.setRGB(L[0],L[1],L[2],Vt),W.mesh.visible=!0}function ge(z,_,P,w,A,L=.1,V=1){de.spawn({x:z,y:_,z:P,size:w,size1:w*.25,color:A,life:L,alpha:V})}function Ae(z,_,P,w,A,L,V,W){for(let X=0;X<w;X++){let xe;V?xe=Math.atan2(-V.z,-V.x)+(Fe()-.5)*W:xe=Fe()*Math.PI*2;let Ee=A*F(.4,1);de.spawn({x:z,y:_,z:P,vx:Math.cos(xe)*Ee,vy:F(.5,4),vz:Math.sin(xe)*Ee,size:F(.07,.16),size1:.02,color:Fe()<.35?on:L,life:F(.18,.42),gravity:9,drag:2.5})}}function ue(z,_,P,w,A,L=1.2){for(let V=0;V<P;V++){let W=Fe()*Math.PI*2,X=F(.3,1)*w;Me.spawn({x:z+Math.cos(W)*.15,y:.12,z:_+Math.sin(W)*.15,vx:Math.cos(W)*X,vy:F(.2,1)*L,vz:Math.sin(W)*X,size:A*F(.5,.9),size1:A*F(1.4,2),color:Jf,alpha:.55,life:F(.4,.8),drag:3.2})}}function se(z,_,P,w,A,L){for(let V=0;V<w;V++){let W=Fe()*Math.PI*2,X=L*F(.3,1);Me.spawn({x:z,y:_,z:P,vx:Math.cos(W)*X,vy:F(2,6),vz:Math.sin(W)*X,size:F(.06,.13),size1:.05,color:A.map(xe=>xe*F(.6,1.1)),alpha:1,life:F(.5,.9),gravity:16,drag:.6,crisp:1})}}function Re(z,_,P,w,A,L,V,W,X=.2){let xe=V?Math.atan2(-V.z*Math.sin(Ui),-V.x):0;for(let Ee=0;Ee<w;Ee++){let je=V?xe+(Fe()-.5)*W:Ee/w*Math.PI*2+Fe()*.5,Xe=new H().copy(te).multiplyScalar(Math.cos(je)).addScaledVector(j,Math.sin(je));ut.push({x:z,y:_,z:P,dir:Xe,r1:A*F(.7,1.2),len0:A*.3,len1:A*F(.6,1),width:F(.1,.2),age:0,life:X*F(.8,1.2),color:L})}}function rt(z,_,P,w){Me.spawn({x:z,y:1.05,z:_,size:P*1.4,size1:P*.6,color:gi,alpha:.95,life:.2});for(let A=0;A<w;A++){let L=Fe()*Math.PI*2,V=F(3,8);Me.spawn({x:z,y:F(.7,1.4),z:_,vx:Math.cos(L)*V,vy:F(.5,3.5),vz:Math.sin(L)*V,size:F(.12,.24),size1:.05,color:gi,alpha:1,life:F(.22,.36),gravity:9,drag:3,crisp:1})}}function ft(z,_,P,w){for(let A=0;A<w;A++){let L=F(.6,2.2);Me.spawn({x:z-P.x*F(0,.25),y:F(-.05,.1),z:_-P.z*F(0,.25),vx:-P.x*L+F(-.6,.6),vy:F(.5,2.5),vz:-P.z*L+F(-.6,.6),size:F(.06,.12),size1:.05,color:Rr.map(V=>V*F(.7,1.1)),alpha:1,life:F(.6,1),gravity:16,drag:.4,crisp:1,floor:!1})}}function xt(z){return z.state==="ledge"?1.25:z.state==="climb"?1.25+(2.25-1.25)*_t(z.stateT/wt.climb,0,1):2.25}function an(z){return z?Dn(qf(z.variant)):Ss}function Pt(z){return!z||z.team==="player"?Ss:at.myth?ws:z.variant===2?Mn:ws}let Wn=[];function On(z,_){let P=null,w=1/0;for(let A of Wn){if(A.kind!==z)continue;let L=(A.x-_.x)**2+(A.z-_.z)**2;L<w&&(w=L,P=A.ownerId)}return P}function Oi(z,_,P){let w=z.targetId===_.playerId,{x:A,z:L}=z.pos,V=1,W=z.dir,X=0,xe=14678783,Ee=Pt(P.get(z.sourceId));switch(z.kind){case"basic":ge(A,V,L,.7,Ee,.09),Ae(A,V,L,6,6,Ee,W,2.4),Re(A,V,L,4,.9,Ee,W,2.2,.16),X=.07,xe=13629951;break;case"control":ge(A,V,L,1.3,Ee,.14),Ae(A,V,L,12,8,Ee,W,3.4),Re(A,V,L,7,1.7,Ee,W,3.6,.22),pe(A,L,.3,1.2,.26,Ee,.6),X=.2,xe=8057599;break;case"push":ge(A,V,L,1.9,on,.16),Ae(A,V,L,16,9,Ee,null,6.3),Re(A,V,L,10,2.4,Ee,null,6.3,.26),pe(A,L,.4,2.2,.32,Ee,.7),ue(A,L,9,3.2,.7),X=.42,xe=16777215;break;case"enemyBasic":ge(A,V,L,.8,Mn,.1),Ae(A,V,L,8,6,Mn,W,2.6),Re(A,V,L,5,1.1,Mn,W,2.4,.18),X=w?.14:0,xe=16739162;break;case"enemyHeavy":ge(A,V,L,2,Mn,.16),Ae(A,V,L,16,9,Mn,null,6.3),Re(A,V,L,10,2.5,Mn,null,6.3,.26),pe(A,L,.4,2.9,.38,Mn,.95),ue(A,L,10,3.4,.75),se(A,.5,L,6,Rr,4),X=w?.6:.3,xe=16739162;break;case"melee1":case"melee2":ge(A,V,L,.8,on,.09),Ae(A,V,L,7,6,Ee,W,2.4),Re(A,V,L,5,1,Ee,W,2.2,.16),X=.08;break;case"melee3":ge(A,V,L,1.2,on,.11),Ae(A,V,L,11,7,Ee,W,3),Re(A,V,L,7,1.5,Ee,W,3,.2),X=.16;break;case"charge":ge(A,V,L,1.7,on,.14),Ae(A,V,L,14,8,Ee,W,3.6),Re(A,V,L,9,2,Ee,W,3.6,.24),pe(A,L,.4,1.8,.3,Ee,.7),ue(A,L,8,2.6,.65),X=.3;break;case"counterBash":case"counterMelee":{let pt=z.kind==="counterBash";ge(A,V,L,pt?1.8:1.1,on,.12),Ae(A,V,L,pt?14:9,8,gi,W,3.2),Re(A,V,L,pt?9:6,pt?2:1.4,gi,W,3.2,.22),rt(A,L,pt?1.2:.8,pt?18:10),X=pt?.34:.16,xe=16769162;break}}z.knock>.2&&ue(A,L,4,1.6,.55,.6),N=Math.min(1,N+X),w&&(xe=16739162);let je=_t(Ye/393,.9,1.8),Xe=P.get(z.targetId);if(at.myth&&Xe){let pt=P.get(z.sourceId),Ut=pt&&Math.sign(ze(Xe.pos).x-ze(pt.pos).x)||1,Ht=_t(Ye*.04,14,30);Ge.spawnNumber(Xe.pos,xt(Xe),String(Math.round(z.dmg)),xe,_t(14+z.dmg*.9,15,30)*je*.62,{x:Ut*Ht*1.2,y:-Ht*1.6})}else Ge.spawnNumber(z.pos,1.9,String(Math.round(z.dmg)),xe,_t(14+z.dmg*.9,15,30)*je)}function As(z,_,P){for(let w of z)switch(w.type){case"shoot":{let A=P.get(w.ownerId),L=an(A),V=w.pos.x+w.dir.x*.15,W=w.pos.z+w.dir.z*.15;ge(V,1.1,W,.6,L,.07);for(let X=0;X<3;X++){let xe=Math.atan2(w.dir.z,w.dir.x)+(Fe()-.5)*.7,Ee=F(3,7);de.spawn({x:V,y:1.1,z:W,vx:Math.cos(xe)*Ee,vy:F(-.5,1),vz:Math.sin(xe)*Ee,size:.09,size1:.02,color:L,life:.14,drag:3})}break}case"hit":Oi(w,_,P),at.myth&&w.knock>.2&&Se.set(w.targetId,{x:w.pos.x,z:w.pos.z,age:0,color:Pt(P.get(w.sourceId))});break;case"cast":{let A=P.get(w.ownerId),L=me.get(w.ownerId);L&&(L.castT=0,L.castSkill=w.skill);let V=w.skill==="enemyHeavy",W=V?Xt.range:Nt.range,X=V?Xt.halfAngle:Nt.halfAngle,xe=Math.atan2(w.dir.z,w.dir.x),Ee=A?A.pos.x:w.pos.x,je=A?A.pos.z:w.pos.z;Ve.push({x:Ee,z:je,angle:xe,range:W,half:X,color:V?Mn:Pt(A),age:0,life:.22});for(let Xe=0;Xe<7;Xe++){let pt=xe+(Fe()-.5)*X*1.8,Ut=W*F(.5,.95);ue(Ee+Math.cos(pt)*Ut,je+Math.sin(pt)*Ut,1,1,V?.7:.5,.5)}V&&(pe(Ee+Math.cos(xe)*W*.55,je+Math.sin(xe)*W*.55,.3,W*.8,.3,Mn,.6),N=Math.min(1,N+.12));break}case"dash":{let A=P.get(w.ownerId),L=an(A),V=5;for(let W=0;W<V;W++){let X=W/(V-1)*fn.distance;de.spawn({x:w.from.x+w.dir.x*X,y:.95,z:w.from.z+w.dir.z*X,size:.62,size1:.5,aspect:2.7,color:L,alpha:.5-W*.04,life:.26+W*.045})}ue(w.from.x,w.from.z,6,2.2,.5,.4);break}case"blocked":{let{x:A,z:L}=w.pos,V=w.kind==="enemyBasic"?Mn:Pt(P.get(On(w.kind,w.pos)??-1));ge(A,.9,L,.5,V,.08),se(A,.9,L,10,Rr,4.5),ue(A,L,3,1.2,.45,.6),Ae(A,.9,L,5,5,V,null,6.3);break}case"blockedStrike":{let A=w.skill==="enemyHeavy"?Mn:Pt(P.get(w.ownerId)),{x:L,z:V}=w.pos;h.hitRock(L,V),ge(L,1.15,V,2.2,on,.14),ge(L,1.15,V,1.4,A,.24,.85),Ae(L,1.15,V,22,8,A,w.dir,3.4),Re(L,1.15,V,10,2.1,zy,w.dir,3.8,.4),se(L,1,V,22,Rr,6),ue(L,V,7,2,.7,.9);break}case"expire":{let A=w.kind==="enemyBasic"?Mn:Pt(P.get(On(w.kind,w.pos)??-1));Ae(w.pos.x,.95,w.pos.z,4,2.2,A,null,6.3);break}case"ledgeGrab":{let A=me.get(w.ownerId);A&&(A.ledgeEdge={x:w.edge.x,z:w.edge.z});let L=w.inward.z,V=-w.inward.x;for(let W=0;W<10;W++){let X=(W%2?1:-1)*F(.35,1.3),xe=w.edge.x+L*X,Ee=w.edge.z+V*X;Me.spawn({x:xe,y:.1,z:Ee,vx:L*Math.sign(X)*F(.6,1.6)-w.inward.x*.4,vy:F(.4,1.2),vz:V*Math.sign(X)*F(.6,1.6)-w.inward.z*.4,size:F(.35,.6),size1:F(.8,1.2),color:Hy,alpha:.75,life:F(.45,.8),drag:3})}ft(w.edge.x,w.edge.z,w.inward,14);for(let W of[-1,1])Ae(w.edge.x+L*W*.3,.12,w.edge.z+V*W*.3,4,3,on,null,6.3);break}case"ledgeClimb":{let A=w.to.x-w.from.x,L=w.to.z-w.from.z,V=Math.hypot(A,L)||1;ue(w.from.x+A/V*wt.hangOut,w.from.z+L/V*wt.hangOut,5,1.2,.5,.6);break}case"ledgeDrop":{let A=me.get(w.ownerId);A?.onLedgeDrop(w.reason);let L=A?.ledgeEdge,V=P.get(w.ownerId);if(L&&V){let W=L.x-V.pos.x,X=L.z-V.pos.z,xe=Math.hypot(W,X)||1;ft(L.x,L.z,{x:W/xe,z:X/xe},w.reason==="knocked"?12:7),w.reason==="timeout"&&ue(L.x,L.z,4,.8,.4,.3)}break}case"melee":{me.get(w.ownerId)?.onMelee(w.step);let A=P.get(w.ownerId),L=w.counter?gi:Pt(A),V=Math.atan2(w.dir.z,w.dir.x),W=A?A.pos.x:w.pos.x,X=A?A.pos.z:w.pos.z;w.step===3?Ve.push({x:W,z:X,angle:V,range:vi.melee[2],half:vi.sweepHalf,color:L,age:0,life:.16}):ne.push({x:W,z:X,dx:w.dir.x,dz:w.dir.z,len:vi.melee[w.step-1],age:0,life:.13,color:L});break}case"shieldBlock":{let{x:A,z:L}=w.pos;if(w.kind==="bearer")me.get(w.targetId)?.onShieldBlock(),Y(w.pos,w.dir),N=Math.min(1,N+.12);else if(w.kind==="perfect")rt(A,L,1.3,30),Re(A,1.1,L,10,1.9,gi,null,6.3,.26),pe(A,L,.3,1.6,.28,gi,.8),N=Math.min(1,N+.12);else for(let V=0;V<9;V++){let W=Math.atan2(-w.dir.z,-w.dir.x)+(Fe()-.5)*2.4,X=F(2.5,6);Me.spawn({x:A,y:F(.8,1.3),z:L,vx:Math.cos(W)*X,vy:F(.5,2.5),vz:Math.sin(W)*X,size:F(.09,.16),size1:.04,color:Es,alpha:1,life:F(.16,.26),gravity:9,drag:3,crisp:1})}break}case"recoil":{me.get(w.ownerId)?.onRecoil();let A=P.get(w.ownerId);A&&(ue(A.pos.x,A.pos.z,5,1.6,.5,.5),Re(A.pos.x,1.3,A.pos.z,4,.8,Es,w.dir,1.2,.2));break}case"guardBreak":{let A=P.get(w.targetId),L=A?A.pos.x:w.pos.x,V=A?A.pos.z:w.pos.z;ge(w.pos.x,1,w.pos.z,1.2,on,.12),se(w.pos.x,1,w.pos.z,12,Wy,5);for(let W=0;W<6;W++){let X=W/6*Math.PI*2+Fe()*.4;Me.spawn({x:L+Math.cos(X)*.2,y:2,z:V+Math.sin(X)*.2,vx:Math.cos(X)*1.6,vy:F(2,3),vz:Math.sin(X)*1.6,size:.14,size1:.08,color:[.8,.93,1],alpha:.95,life:.5,gravity:9,drag:.8,crisp:1,floor:!1})}N=Math.min(1,N+.16);break}case"armor":{let A=P.get(w.ownerId);A&&pe(A.pos.x,A.pos.z,.5,1.3,.25,Mn,.8);break}case"charge":{$.set(w.ownerId,{x:w.from.x,z:w.from.z,age:0,lx:w.from.x,lz:w.from.z}),ue(w.from.x,w.from.z,6,2,.55,.5);break}case"counterReady":{let A=P.get(w.ownerId);A&&(pe(A.pos.x,A.pos.z,.5,1.6,.3,gi,.9),rt(A.pos.x,A.pos.z,.7,8));break}case"counterUsed":{let A=P.get(w.ownerId);A&&w.kind==="bash"&&Ve.push({x:A.pos.x,z:A.pos.z,angle:A.facing,range:vi.bash,half:vi.bashHalf,color:gi,age:0,life:.2});break}case"revive":{let{x:A,z:L}=w.pos;pe(A,L,.3,1.8,.4,Ss,.9);for(let V=0;V<24;V++){let W=Fe()*Math.PI*2,X=F(.1,.5);de.spawn({x:A+Math.cos(W)*X,y:F(0,.6),z:L+Math.sin(W)*X,vy:F(2,5),size:F(.12,.26),size1:.03,color:Fe()<.5?Ss:on,alpha:.9,life:F(.5,.9),gravity:-1,drag:1.2})}ue(A,L,8,2.2,.55,.5);break}case"jumpStart":{D={x:w.from.x,z:w.from.z},ue(w.from.x,w.from.z,8,2.2,.6,.8);let A=Math.hypot(w.from.x,w.from.z)||1;ft(w.from.x,w.from.z,{x:-w.from.x/A,z:-w.from.z/A},10);break}case"exitOpen":{for(let A of w.pos){pe(A.x,A.z,.3,1.8,.5,tu,.9);for(let L=0;L<18;L++){let V=Fe()*Math.PI*2,W=F(.1,.8);de.spawn({x:A.x+Math.cos(V)*W,y:F(0,.8),z:A.z+Math.sin(V)*W,vy:F(2,5),size:F(.12,.24),size1:.03,color:tu,alpha:.9,life:F(.6,1.1),gravity:-1,drag:1})}}break}case"land":{let{x:A,z:L}=w.pos;ue(A,L,18,3.6,.85,.9),se(A,.2,L,10,Rr,4),pe(A,L,.4,2.6,.4,on,.8),N=Math.min(1,N+.3);break}case"spawnMark":{ce.push({x:w.pos.x,z:w.pos.z,age:0,lead:Math.max(.1,w.lead)});break}case"edgeSave":{let A=P.get(w.ownerId);A&&(pe(A.pos.x,A.pos.z,.5,1.5,.3,on,.9),Ae(A.pos.x,.9,A.pos.z,8,4,on,null,6.3));break}case"fall":{let{x:A,z:L}=w.pos;ue(A,L,14,3.2,.8,1.8),se(A,.3,L,8,Rr,3),he=.7,T=1,K=1,oe.set(A,L),N=Math.min(1,N+.18);break}case"death":{if(w.cause==="fall")break;let A=P.get(w.ownerId),L=an(A),{x:V,z:W}=w.pos;for(let X=0;X<40;X++){let xe=Fe()*Math.PI*2,Ee=F(.2,1.6);de.spawn({x:V+Math.cos(xe)*.25,y:F(.2,1.8),z:W+Math.sin(xe)*.25,vx:Math.cos(xe)*Ee,vy:F(.8,3.2),vz:Math.sin(xe)*Ee,size:F(.12,.3),size1:.02,color:Fe()<.5?L:on,alpha:.9,life:F(.6,1.2),gravity:-1.2,drag:1.4})}pe(V,W,.4,2.4,.5,L,.8),ge(V,1,W,2.2,L,.2,.8),he=.35,N=Math.min(1,N+.2);break}default:break}}function Bi(z){nt.flashes.begin();for(let _=Ve.length-1;_>=0;_--){let P=Ve[_];if(P.age+=z,P.age>=P.life){Ve.splice(_,1);continue}let w=P.age/P.life;nt.flashes.push(P.x,P.z,P.angle,P.range*(.85+.15*w),P.half,1,P.color,(1-w)*1.2)}nt.flashes.end()}function xi(z){for(let _=ut.length-1;_>=0;_--){let P=ut[_];P.age+=z,P.age>=P.life&&ut.splice(_,1)}for(let _ of ut){let P=_.age/_.life,w=1-Math.pow(1-P,2.2),A=_.r1*w,L=Math.min(_.len0+(_.len1-_.len0)*P,A+.15);le.set(_.x+_.dir.x*A,_.y+_.dir.y*A,_.z+_.dir.z*A),re.push(le,_.dir,L,_.width*(1-P*.6),_.color,1-P*P)}}function Rs(z){for(let _ of B){if(!_.on)continue;if(_.age+=z,_.age>=_.life){_.on=!1,_.mesh.visible=!1;continue}let P=_.age/_.life,w=1-Math.pow(1-P,2.4),A=_.r0+(_.r1-_.r0)*w;_.mesh.scale.set(A,1,A),_.mat.opacity=_.alpha*(1-P)}}let Cn=new H;function Sn(z,_){let P=new Set;Wn.length=0;for(let w of z.projectiles){if(!w.alive)continue;P.add(w.id),Wn.push({kind:w.kind,x:w.pos.x,z:w.pos.z,ownerId:w.ownerId});let A=w.team==="player"?Ss:_.get(w.ownerId)?Pt(_.get(w.ownerId)):ws;Cn.set(w.dir.x,0,w.dir.z),le.set(w.pos.x,.95,w.pos.z);let L=w.kind==="basic"?1.4:.7,V=Math.floor(w.traveled/L),W=dt.get(w.id);if(W===void 0||V>W){dt.set(w.id,V);let X=w.kind==="enemyBasic"?Mn:A,xe=w.kind==="basic"?.9:1.6;de.spawn({x:w.pos.x-w.dir.x*xe+F(-.08,.08),y:.95+F(-.1,.1),z:w.pos.z-w.dir.z*xe+F(-.08,.08),size:w.kind==="basic"?.1:.16,size1:.02,color:X,alpha:.9,life:.38,vx:F(-.3,.3),vz:F(-.3,.3),vy:F(0,.4)})}w.kind==="basic"?(re.push(le,Cn,2.2,.5,A,1),re.push(le,Cn,.9,.24,on,1)):w.kind==="control"?(He.push(le,Cn,3.8,1.1,A,1),re.push(le,Cn,2.4,.8,A,.7)):(He.push(le,Cn,3.1,1.4,Mn,1),re.push(le,Cn,2.3,.95,ws,.75))}for(let w of dt.keys())P.has(w)||dt.delete(w)}function Cs(z,_){nt.sectors.begin(),nt.strips.begin();let P=n.rocks,w=.55+.45*Math.sin(Oe*48),A=z.variant!=="s0",L=A?.55:.16,V=A?.34:.2,W=A?.8+.2*w:.5+.5*w;for(let X of z.fighters){if(X.state==="guard"&&X.shieldDir&&X.shieldUp!==!1){let Xe=X.guard?.perfect===!0;nt.sectors.push(X.pos.x,X.pos.z,Math.atan2(X.shieldDir.z,X.shieldDir.x),1.6,vi.guardHalf,1,Xe?gi:Ss,Xe?.9:.6,.1)}let xe=X.windup;if(!xe||X.state!=="windup")continue;let Ee=Math.atan2(xe.dir.z,xe.dir.x),je=_t(xe.t/Math.max(xe.dur,.001),0,1);switch(xe.skill){case"enemyHeavy":{let Xe=X.armorKind==="heavy"&&(X.armorT??0)>0?1:0;nt.sectors.push(X.pos.x,X.pos.z,Ee,Xt.range,Xt.halfAngle,je,ws,1,L,Xe);break}case"melee1":case"melee2":{let Xe=Cr(P,X.pos.x,X.pos.z,xe.dir.x,xe.dir.z,vi.melee[xe.skill==="melee1"?0:1]);nt.strips.push(X.pos.x,X.pos.z,Ee,Xe,.6,je,Pt(X),.6,.7,.18);break}case"melee3":nt.sectors.push(X.pos.x,X.pos.z,Ee,vi.melee[2],vi.sweepHalf,je,Pt(X),.7,.25);break;case"charge":{let Xe=Cr(P,X.pos.x,X.pos.z,xe.dir.x,xe.dir.z,vi.charge);nt.strips.push(X.pos.x,X.pos.z,Ee,Xe,1,je,Pt(X),.85,.5,V);break}case"enemyBasic":{let Xe=Cr(P,X.pos.x,X.pos.z,xe.dir.x,xe.dir.z,$t.range);nt.strips.push(X.pos.x,X.pos.z,Ee,Xe,.11,1,ws,W,.5,V);break}case"control":{let Xe=Cr(P,X.pos.x,X.pos.z,xe.dir.x,xe.dir.z,Lt.range);nt.strips.push(X.pos.x,X.pos.z,Ee,Xe,.95,je,Pt(X),.9,.6,V);break}case"push":nt.sectors.push(X.pos.x,X.pos.z,Ee,Nt.range,Nt.halfAngle,je,Pt(X),.9,L);break}}if(_){let X=z.fighters.find(xe=>xe.id===z.playerId);if(X&&X.state!=="dead"&&X.state!=="falling"){let xe=_.cancel?By:Ss,Ee=Math.atan2(_.dir.z,_.dir.x);if(_.skill==="basic"){let je=Cr(P,X.pos.x,X.pos.z,_.dir.x,_.dir.z,9);nt.strips.push(X.pos.x,X.pos.z,Ee,je,.09,1,xe,_.cancel?.55:.85,.7)}else if(_.skill==="control"){let je=Cr(P,X.pos.x,X.pos.z,_.dir.x,_.dir.z,11);nt.strips.push(X.pos.x,X.pos.z,Ee,je,.9,0,xe,_.cancel?.5:.8,.8)}else nt.sectors.push(X.pos.x,X.pos.z,Ee,Nt.range,Nt.halfAngle,1,xe,_.cancel?.6:.8)}}nt.sectors.end(),nt.strips.end()}function Fr(z,_,P,w,A){let L=_t(A,0,.1);Oe+=L,he=Math.max(0,he-L),ie+=((he>0?.32:1)-ie)*Tr(14,L);let V=L*ie,W=Jh(z.variant);W!==at.myth&&y(W),z.island&&u(z.island)!==u(n)&&(!E||u(E.isl)!==u(z.island))&&S(z.island);let X=z.s1;X&&X.phase==="air"?k||(k={dur:Math.max(.1,X.phaseT),from:D}):k=null;let xe=k&&X?_t(1-X.phaseT/k.dur,0,1):-1;M=xe>=0?O(xe):0,Ge.setClouds(M,xe),E&&I(xe>=0);let Ee=new Map;for(let kt of z.fighters)Ee.set(kt.id,kt);for(let kt of z.fighters){let Wt=me.get(kt.id);Wt&&(Wt.variant!==kt.variant||Wt.look!==J(kt))&&(Wt.dispose(),me.delete(kt.id),Wt=void 0),Wt||(Wt=new Go(a,kt.variant,J(kt)),me.set(kt.id,Wt))}for(let[kt,Wt]of me)Ee.has(kt)||(Wt.dispose(),me.delete(kt));As(_,z,Ee);let je=new Map;if(X){let kt=Ee.get(z.playerId);if(kt&&xe>=0){let Wt=G(kt,xe,k.from);je.set(kt.id,{...kt,pos:Wt.pos,y:Wt.y,state:"idle",moveVel:{x:0,z:0}})}else kt&&X.phase==="landed"&&!((kt.protectT??0)>0)&&je.set(kt.id,{...kt,protectT:Math.max(.01,X.phaseT)})}let Xe=je.get(z.playerId)??Ee.get(z.playerId),pt=2*ye(Ie/Ye)*Math.tan(_c*Math.PI/360)/Ye,Ht=(z.variant!=="s0"?Oy*pt:0)+(Xe?Xe.pos.x:0)*Zf,jt=Gt+(Xe?Xe.pos.z:0)*Zf,si=Tr(Fy,L);gt.x+=(Ht-gt.x)*si,gt.y+=(jt-gt.y)*si,K=Math.max(0,K-L*1.1),T=Math.max(0,T-L*1.5);let dn=gt.x+(oe.x*.5-gt.x)*.4*K*K,Is=gt.y+(oe.y*.5-gt.y)*.4*K*K,hu=ye(Ie/Ye)*(1-.1*Math.sin(T*Math.PI*.5));we($e,dn,Is,hu),N=Math.max(0,N-L*2.4);let uu=N*N*.55,mp=(Math.sin(Oe*53.1)+Math.sin(Oe*31.7+1.3))*.5*uu,gp=(Math.sin(Oe*47.3+2.1)+Math.sin(Oe*29.1))*.5*uu;we(Ne,dn,Is,hu,mp,gp),Ne.rotation.z=Math.sin(Oe*41)*N*N*.012,Ne.updateMatrixWorld(!0);for(let kt of z.fighters){let Wt=je.get(kt.id)??kt,Mc=me.get(Wt.id);Mc.setAir(kt.id===z.playerId&&xe>=0?xe:null),Mc.update(Wt,w,z.variant!=="s0"),Mc.wantDust(Wt,V)&&ue(Wt.pos.x,Wt.pos.z,2,1,.45,.4),Wt.state==="falling"&&Fe()<.9&&de.spawn({x:Wt.pos.x+F(-.15,.15),y:Wt.y+.9,z:Wt.pos.z+F(-.15,.15),size:.28,size1:.1,aspect:2.8,color:[.9,.95,1],alpha:.4,life:.4,vy:3})}re.begin(),He.begin(),Sn(z,Ee),xi(V),at.myth&&qe&&Ur(Ee,V),ne.length&&Nr(V),$.size&&Or(Ee,V),re.end(),He.end(),Cs(z,P),(ce.length||fe)&&C(V),(zi||X&&X.phase==="exit")&&Br(X,L),Bi(V),Rs(V),de.update(V),Me.update(V),h.setVariant(z.variant==="s0"?"s0":"v2"),h.update(L),M<.999&&r.render(a,Ne),Ge.update(z.fighters,ze,L,xt)}function Ur(z,_){for(let[P,w]of Se){w.age+=_;let A=z.get(P);if(!A||w.age>=.2){Se.delete(P);continue}let L=A.pos.x-w.x,V=A.pos.z-w.z,W=Math.hypot(L,V);if(W<.05)continue;let X=1-w.age/.2;le.set(A.pos.x,.9,A.pos.z),Pe.set(L/W,0,V/W),re.push(le,Pe,W,.55*X+.1,w.color,.9*X),re.push(le,Pe,W*.8,.2*X+.05,on,.8*X)}}function Nr(z){for(let _=ne.length-1;_>=0;_--){let P=ne[_];if(P.age+=z,P.age>=P.life){ne.splice(_,1);continue}let w=P.age/P.life,A=P.len*(.55+.45*(1-Math.pow(1-w,3)));le.set(P.x+P.dx*A,1.05,P.z+P.dz*A),Pe.set(P.dx,0,P.dz),re.push(le,Pe,A*.8,.42*(1-w*.5),P.color,.9*(1-w)),re.push(le,Pe,A*.5,.16,on,.9*(1-w))}}function Or(z,_){for(let[P,w]of $){let A=z.get(P);if(!A){$.delete(P);continue}if(A.state!=="charge"&&(w.age+=_),w.age>=.25){$.delete(P);continue}let L=A.pos.x-w.x,V=A.pos.z-w.z,W=Math.hypot(L,V);if(W<.05)continue;let X=1-w.age/.25,xe=Pt(A);if(le.set(A.pos.x,.9,A.pos.z),Pe.set(L/W,0,V/W),re.push(le,Pe,W,.95*X+.1,xe,.85*X),re.push(le,Pe,W*.85,.35*X+.05,on,.85*X),A.state==="charge"){let Ee=A.pos.x-w.lx,je=A.pos.z-w.lz,Xe=Math.hypot(Ee,je),pt=Math.max(1,Math.ceil(Xe/.15));for(let Ut=0;Ut<pt;Ut++){let Ht=(Ut+.5)/pt;Me.spawn({x:w.lx+Ee*Ht,y:F(.6,1.2),z:w.lz+je*Ht,size:.75,size1:.35,color:xe,alpha:.55,life:.28,drag:2})}Me.spawn({x:A.pos.x,y:.12,z:A.pos.z,vx:-L/W*2,vy:F(.3,1),vz:-V/W*2,size:.4,size1:.9,color:Jf,alpha:.5,life:.4,drag:3})}w.lx=A.pos.x,w.lz=A.pos.z}}let zi=null;function Br(z,_){zi||(zi=new gc(a,2));let P=z&&z.phase==="exit"?z.exits:[];zi.update(P,Ne,_);for(let w of P)if(Fe()<.25){let A=Fe()*Math.PI*2,L=F(.2,1);de.spawn({x:w.pos.x+Math.cos(A)*L,y:F(0,.4),z:w.pos.z+Math.sin(A)*L,vy:F(1.5,3.5),size:F(.1,.2),size1:.03,color:tu,alpha:.8,life:F(.7,1.2),gravity:-.5,drag:.8})}}function C(z){fe||(fe=new qo(a,4)),fe.begin();for(let _=ce.length-1;_>=0;_--){let P=ce[_];if(P.age+=z,P.age>=P.lead+.2){ce.splice(_,1);continue}let w=_t(P.age/P.lead,0,1),A=P.age>P.lead?1-(P.age-P.lead)/.2:1,L=.85+.15*Math.sin(P.age*18);fe.push(P.x,P.z,1.1,w,ws,A*L)}fe.end()}function Y(z,_){let P=Math.atan2(-_.z,-_.x);Me.spawn({x:z.x,y:1,z:z.z,size:2.6,size1:.9,color:Es,alpha:.95,life:.2}),Me.spawn({x:z.x,y:1,z:z.z,size:1.2,size1:2.4,color:on,alpha:.7,life:.16});for(let w=0;w<70;w++){let A=P+(Fe()-.5)*3.2,L=F(5,13);Me.spawn({x:z.x,y:F(.5,1.6),z:z.z,vx:Math.cos(A)*L,vy:F(.8,4.5),vz:Math.sin(A)*L,size:F(.16,.32),size1:.06,color:Es,alpha:1,life:F(.24,.4),gravity:9,drag:2.6,crisp:1})}Re(z.x,1,z.z,10,1.8,Es,_,3.4,.24);for(let w=0;w<14;w++){let A=P+(Fe()-.5)*2.6,L=F(10,17),V=Math.cos(A)*L,W=F(1.5,5),X=Math.sin(A)*L,xe=F(.8,1.3),Ee=F(.26,.38);for(let je=0;je<6;je++){let Xe=je*.014;Me.spawn({x:z.x-V*Xe,y:xe-W*Xe,z:z.z-X*Xe,vx:V,vy:W,vz:X,size:.2-je*.026,size1:.04,color:je<2?Vy:Gy,alpha:1,life:Ee-Xe,gravity:14,drag:1.2,crisp:1})}}}function Q(z,_){Me.spawn({x:z.x,y:1,z:z.z,size:1.4,size1:.5,color:Es,alpha:.9,life:.16});for(let P=0;P<36;P++){let w=Math.atan2(-_.z,-_.x)+(Fe()-.5)*2.8,A=F(4,10);Me.spawn({x:z.x,y:F(.6,1.5),z:z.z,vx:Math.cos(w)*A,vy:F(.5,3.5),vz:Math.sin(w)*A,size:F(.13,.25),size1:.05,color:Es,alpha:1,life:F(.2,.32),gravity:9,drag:3,crisp:1})}}function ee(){for(let z of me.values())z.dispose();me.clear(),dt.clear(),de.clear(),Me.clear(),ut.length=0,Ve.length=0,Se.clear(),ne.length=0,$.clear(),ce.length=0,k=null,D=null,M=0,Ge.setClouds(0,-1);for(let z of B)z.on=!1,z.mesh.visible=!1;Ge.clear(),N=0,T=0,K=0,he=0,ie=1}Ke(Ie,Ye);let Z=[];function ve(){if(at.myth||!Jh("v4"))return;let z=Math.random,_=625341585;Math.random=()=>{_=_+1831565813>>>0;let A=_;return A=Math.imul(A^A>>>15,A|1),A^=A+Math.imul(A^A>>>7,A|61),((A^A>>>14)>>>0)/4294967296};let P=r.getRenderTarget(),w=new Tt;try{at.myth=!0;let A=new ui,L=dc(A,n,c);d.set(v(!0,n),{world:L,background:A.background,fog:A.fog}),A.environment=g(),A.environmentIntensity=.7;for(let[V,W]of[[0,"myth"],[1,"myth-shield"],[2,"myth-archer"]])Z.push(new Go(A,V,W));o(),r.compile(A,Ne);for(let V of[...a.children])V!==h.root&&r.compile(V,Ne,A);A.traverse(V=>{let W=V.material;for(let X of Array.isArray(W)?W:W?[W]:[])for(let xe of Object.values(X))xe&&xe.isTexture&&r.initTexture(xe)}),r.setRenderTarget(null),r.getViewport(w),r.setViewport(0,0,4,4),r.render(A,Ne)}finally{at.myth=!1,o(),r.setRenderTarget(P),w.z>0&&r.setViewport(w),Math.random=z}}return ve(),{render:Fr,resize:Ke,worldToScreen:ze,screenToGround:Te,reset:ee,setIsland:S,setDemoLooks:z=>{q.clear();for(let[_,P]of Object.entries(z))q.set(Number(_),P)},blockSpark:Q,setKnockTrails:z=>{qe=z},lookOf:z=>me.get(z)?.look??null,drawn:z=>me.get(z)?.root.visible??!1,rockColumns:()=>{let z=[];return h.root.traverse(_=>{_.name==="rock-column"&&z.push({x:_.position.x,z:_.position.z})}),z},swapLog:()=>R.splice(0)}}var Ir=62,nu=50,iu=.14,Xy=14,qy=1.1,bc=.8,Ts={basic:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v10M24 34v10M4 24h10M34 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',control:'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="21" r="2.5" fill="currentColor"/><path d="M21 4v8M21 30v8M4 21h8M30 21h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="8" fill="#0b1a2b" stroke="currentColor" stroke-width="2.5"/><path d="M36 31v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',push:'<svg viewBox="0 0 48 48"><path d="M8 24l12-10v7h8v6h-8v7z" fill="currentColor"/><path d="M32 10l6 6M34 24h8M32 38l6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',dash:'<svg viewBox="0 0 48 48"><path d="M8 12l12 12-12 12M22 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},Yo={basic:'<svg viewBox="0 0 48 48"><path d="M6 42L31 17" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M27.5 13.5L42 6l-7.5 14.5z" fill="currentColor"/><path d="M4 32l8-8M14 44l8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/></svg>',control:'<svg viewBox="0 0 48 48"><path d="M6 38Q18 10 40 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 5" opacity="0.65"/><path d="M12 36l24-12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M34 17l11 6-11 7z" fill="currentColor"/></svg>',push:'<svg viewBox="0 0 48 48"><circle cx="21" cy="24" r="15" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="21" cy="24" r="2.5" fill="currentColor"/><path d="M40 15l6 9-6 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'},Yy='<svg viewBox="0 0 48 48"><path d="M4 14h12M2 24h16M4 34h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/><path d="M20 10l14 14-14 14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 8v32" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',np=new URLSearchParams(location.search),Ni=np.get("art")==="myth",ru=np.get("cam")==="near",Qf=()=>`${Ni?" \xB7 \u795E\u8A71":""}${ru?" \xB7 \u62C9\u8FD1":""}`;function ep(s,e){let t=new URLSearchParams(location.search);t.get(s)===e?t.delete(s):t.set(s,e);let n=t.toString();history.replaceState(null,"",`${location.pathname}${n?`?${n}`:""}${location.hash}`),location.reload()}var su=[{id:"basic",label:"\u57FA\u790E\u653B\u64CA",cls:"big"},{id:"dash",label:"\u4F4D\u79FB",cls:""},{id:"control",label:"\u63A7\u5236",cls:""},{id:"push",label:"\u64CA\u9000",cls:""}],$y=(s,e)=>`
<div class="hud" hidden>
  <div class="hp" data-box="hp"><div class="hp-fill"></div><span class="hp-text">100 / 100</span></div>
  <div class="timer" data-box="timer">00:00</div>
  <button class="pause" data-box="pause" aria-label="\u66AB\u505C"><svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></button>
  <div class="ver" data-box="ver"></div>
  <div class="revive v4only" title="\u5269\u9918\u5FA9\u6D3B\u6B21\u6578"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z" fill="currentColor"/></svg><span class="revive-n">\xD71</span></div>
  <div class="wave v4only">\u7B2C 1 \u6CE2</div>
  <div class="protect">\u4FDD\u8B77\u4E2D</div>
  <div class="exit-hint">\u6E05\u5834\uFF01\u8D70\u9032\u51FA\u53E3\u5149\u5708</div>
  <div class="reviving"><b>\u5361\u620E\u6E21\u4F60\u56DE\u4F86</b><i class="reviving-t"></i></div>
</div>
<div class="controls" hidden>
  <div class="stick-zone"></div>
  <div class="stick" data-box="stick"><div class="knob"></div></div>
  ${su.map(t=>`<div class="skill ${t.id} ${t.cls}" data-skill="${t.id}" data-box="skill-${t.id}" data-icon="${e&&t.id!=="dash"?"myth":"default"}" aria-label="${t.label}">${s[t.id]}${t.id==="dash"?'<u class="lbl">\u7FFB\u56DE</u>':""}<i class="cd"></i><b class="cdt"></b><em class="cancel">\u53D6\u6D88</em><em class="auto">\u81EA\u52D5</em></div>`).join("")}
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
    <div class="btns row"><div class="tbtn" role="button" data-act="art-toggle">\u756B\u9762\uFF1A${e?"\u795E\u8A71\u907A\u8DE1\uFF08\u5019\u9078\uFF09":"\u73FE\u884C"}</div><div class="tbtn" role="button" data-act="cam-toggle">\u93E1\u982D\uFF1A${ru?"\u62C9\u8FD1":"\u5168\u5CF6"}</div><button class="ghost small" data-act="howto">\u64CD\u4F5C\u8AAA\u660E</button></div>
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
    <div class="s1res" hidden><p class="s1where"></p><p class="s1death"></p></div>
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
`,tp=(s,e)=>{let t=Math.hypot(s,e);return t<1e-6?null:{x:s/t,z:e/t}};function ip(s,e){s.innerHTML=$y(Ni?{...Ts,...Yo}:Ts,Ni),s.classList.toggle("art-myth",Ni);let t=_=>s.querySelector(_),n=t(".hud"),i=t(".controls"),r={title:t(".menu-title"),howto:t(".menu-howto"),pause:t(".menu-pause"),result:t(".menu-result")},o=t(".stick-zone"),a=t(".stick"),l=t(".knob"),c=t(".hp-fill"),h=t(".hp-text"),d=t(".timer"),u=t(".ver"),f=t(".banner"),v=Object.fromEntries(su.map(_=>[_.id,t(`.skill.${_.id}`)])),b=Object.fromEntries(su.map(_=>[_.id,{ring:v[_.id].querySelector(".cd"),text:v[_.id].querySelector(".cdt")}])),g=document.querySelector('meta[name="build-sha"]')?.getAttribute("content")??"",p=`${Hi} \xB7 ${g&&!g.startsWith("__")?g:"dev"}${Qf()}`;u.textContent=p,t(".title-ver").textContent=`${Hi}${Qf()}`;let m=!1,x=!1,y=!1,E="1v1",R="s0",k=2.6,D="ares",M=!1,S=null,I={basic:null,control:null,push:null},O=null,U=!1,G=!1,q=!1,J=!1,ne=!1,$=new Set,ce=null,fe=!1,Se=!1,qe=!1,Ne=0,$e=0,tt=null,te=()=>m&&!x,j={basic:0,control:0,push:0,dash:0};function de(_){if(_==="basic"||!(j[_]>.05))return;let P=v[_];P.classList.remove("denied"),P.offsetWidth,P.classList.add("denied"),window.setTimeout(()=>P.classList.remove("denied"),300)}let Me=()=>R==="v4"||R==="s1",re=()=>Me()&&D==="mars";function He(_,P){return P!=="basic"&&_.dragged&&Math.hypot(_.x-_.cx,_.y-_.cy)<_.r*bc}function nt(_){let P=tp(_.x-_.cx,_.y-_.cy);return P&&Math.hypot(_.x-_.cx,_.y-_.cy)>=_.r*bc&&(_.lastDir=P),_.lastDir}function B(){if(!qe)return null;let _=e.getPlayerPos(),P=_&&e.screenToGround(Ne,$e);return!_||!P||(tt=tp(P.x-_.x,P.z-_.z)??tt),tt}function ut(){a.classList.remove("active"),a.style.left=a.style.top=a.style.bottom="",l.style.transform=""}function Ve(){S=null,ut();for(let _ of["basic","control","push"])I[_]=null;for(let _ of Object.keys(v))v[_].classList.remove("pressed","aiming","cancelling","autoaim","denied");O=null,U=!1,G=!1,q=!1,$.clear(),ce=null,fe=!1,Se=!1,J=!1,ne=!1}o.addEventListener("pointerdown",_=>{if(_.pointerType==="mouse"||S||!te())return;_.preventDefault(),o.setPointerCapture(_.pointerId);let P=Math.min(Math.max(_.clientX,Ir+4),window.innerWidth-Ir-4),w=Math.min(Math.max(_.clientY,Ir+4),window.innerHeight-Ir-4);S={pid:_.pointerId,cx:P,cy:w,move:{x:0,z:0}},a.classList.add("active"),a.style.left=`${P-Ir}px`,a.style.top=`${w-Ir}px`,a.style.bottom="auto",Ge(_)});function Ge(_){if(!S||_.pointerId!==S.pid)return;let P=_.clientX-S.cx,w=_.clientY-S.cy,A=Math.hypot(P,w),L=A>nu?nu/A:1;l.style.transform=`translate(${P*L}px, ${w*L}px)`;let V=Math.min(A/nu,1);if(V<=iu)S.move={x:0,z:0};else{let W=(V-iu)/(1-iu);S.move={x:P/A*W,z:w/A*W}}}function me(_){!S||_.pointerId!==S.pid||(S=null,ut())}o.addEventListener("pointermove",Ge),o.addEventListener("pointerup",me),o.addEventListener("pointercancel",me);for(let _ of["basic","control","push"]){let P=v[_];P.addEventListener("pointerdown",A=>{if(I[_]||!te())return;A.preventDefault(),P.setPointerCapture(A.pointerId);let L=P.getBoundingClientRect();I[_]={pid:A.pointerId,cx:L.left+L.width/2,cy:L.top+L.height/2,r:L.width/2,sx:A.clientX,sy:A.clientY,x:A.clientX,y:A.clientY,dragged:!1,lastDir:null},P.classList.add("pressed"),de(_),_==="basic"&&Me()&&(G=!0),_==="push"&&re()&&(q=!0,P.classList.add("autoaim"))}),P.addEventListener("pointermove",A=>{let L=I[_];if(!(!L||A.pointerId!==L.pid)){if(L.x=A.clientX,L.y=A.clientY,!L.dragged&&Math.hypot(L.x-L.sx,L.y-L.sy)>=Xy&&Math.hypot(L.x-L.cx,L.y-L.cy)>L.r*qy&&(L.dragged=!0),_==="push"&&re()){let V=!L.dragged||Math.hypot(L.x-L.cx,L.y-L.cy)<L.r*bc;P.classList.toggle("aiming",!V),P.classList.toggle("autoaim",V);return}P.classList.toggle("aiming",L.dragged),P.classList.toggle("cancelling",He(L,_))}});let w=(A,L)=>{let V=I[_];!V||A.pointerId!==V.pid||(V.x=A.clientX,V.y=A.clientY,I[_]=null,P.classList.remove("pressed","aiming","cancelling","autoaim"),!(_==="basic"||L||!te())&&(_==="push"&&re()||(V.dragged?He(V,_)||(O={skill:_,dir:nt(V)}):O={skill:_,dir:null})))};P.addEventListener("pointerup",A=>w(A,!1)),P.addEventListener("pointercancel",A=>w(A,!0))}v.dash.addEventListener("pointerdown",_=>{te()&&(_.preventDefault(),U=!0,de("dash"),v.dash.classList.add("pressed"))});let dt=()=>v.dash.classList.remove("pressed");v.dash.addEventListener("pointerup",dt),v.dash.addEventListener("pointercancel",dt);let Ie=_=>{ce||(ce=_,fe=!1)};window.addEventListener("keydown",_=>{if(gt(),_.code==="Escape"){if(_.repeat)return;ce&&!fe?fe=!0:te()&&Re();return}if(te()){if(_.repeat){_.code==="Space"&&_.preventDefault();return}switch(_.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":$.add(_.code);break;case"KeyQ":de("control"),Ie("control");break;case"KeyE":de("push"),re()?J||(J=!0,q=!0,v.push.classList.add("pressed","autoaim")):Ie("push");break;case"KeyJ":Me()&&!ne&&(ne=!0,G=!0,v.basic.classList.add("pressed"));break;case"Space":_.preventDefault(),U=!0,de("dash");break;case"ShiftLeft":case"ShiftRight":U=!0,de("dash");break}}}),window.addEventListener("keyup",_=>{$.delete(_.code),_.code==="KeyE"&&J&&(J=!1,v.push.classList.remove("pressed","autoaim")),_.code==="KeyJ"&&ne&&(ne=!1,v.basic.classList.remove("pressed"));let P=_.code==="KeyQ"?"control":_.code==="KeyE"?"push":null;P&&ce===P&&(!fe&&te()&&(O={skill:P,dir:B()}),ce=null,fe=!1)});let Ye=_=>!_.target.closest(".skill, .pause, .menu, .stick");window.addEventListener("pointerdown",_=>{if(_.pointerType==="mouse"){if(qe=!0,Ne=_.clientX,$e=_.clientY,_.button===2){ce&&(fe=!0);return}_.button===0&&te()&&Ye(_)&&(Se=!0,Me()&&(G=!0))}}),window.addEventListener("pointermove",_=>{_.pointerType==="mouse"&&(qe=!0,Ne=_.clientX,$e=_.clientY)}),window.addEventListener("pointerup",_=>{_.pointerType==="mouse"&&_.button===0&&(Se=!1)}),window.addEventListener("blur",Ve),document.addEventListener("visibilitychange",()=>{document.hidden&&(Ve(),te()&&Re())});let Gt=_=>_.preventDefault();for(let _ of["gesturestart","gesturechange","gestureend","dblclick","contextmenu","selectstart","dragstart"])document.addEventListener(_,Gt);document.addEventListener("touchmove",_=>{_.target.closest?.(".edge-list, .copybox")||_.preventDefault()},{passive:!1});function gt(){M||(M=!0,e.onFirstGesture())}window.addEventListener("pointerup",gt,!0);let N=new Date().toISOString(),T="s1-run-log/v1",K="s1-run-log/v1-live",oe=30,he={get(_){try{return localStorage.getItem(_)}catch{return null}},set(_,P){try{localStorage.setItem(_,P)}catch{}},remove(_){try{localStorage.removeItem(_)}catch{}}},ie=_=>{let P=_;return!!P&&typeof P=="object"&&typeof P.index=="number"&&typeof P.endedAt=="string"&&!!P.record&&typeof P.record=="object"};function Oe(){let _=[];try{let w=he.get(T),A=w?JSON.parse(w):[];Array.isArray(A)&&(_=A.filter(ie))}catch{_=[]}try{let w=he.get(K);if(w){let A=JSON.parse(w);A&&typeof A=="object"&&_.push({index:(_.length?_[_.length-1].index:0)+1,endedAt:new Date().toISOString(),endedBy:"abandoned",next:"reload",rematch:!1,record:A}),he.remove(K)}}catch{he.remove(K)}let P=_[_.length-1];return P&&P.next===null&&(P.next="reload",P.rematch=!1),_.slice(-oe)}let le=Oe(),Pe=()=>he.set(T,JSON.stringify(le));Pe();let ke=le[le.length-1]??null,ye=-1/0,we=!1,Ke=null;function ze(_,P){ke={index:(le.length?le[le.length-1].index:0)+1,endedAt:new Date().toISOString(),endedBy:P,next:null,rematch:!1,record:JSON.parse(JSON.stringify(_))},le.push(ke),le.length>oe&&le.splice(0,le.length-oe),Pe(),he.remove(K)}function Te(_){we&&Ke&&ze(Ke,"abandoned"),we=!1,ke&&ke.next===null&&(ke.next=_,ke.rematch=_==="again",Pe()),he.remove(K)}function Fe(_){t(".clear-confirm").hidden=!_,t(".clear-n").textContent=String(le.length),r.result.classList.toggle("confirming",_),_&&(t(".copy-status").hidden=!0)}function F(){le.length=0,ke=null,he.remove(T),he.remove(K),Fe(!1),t(".copy-status").hidden=!1,t(".copy-status").textContent="\u5DF2\u6E05\u9664\u5168\u90E8\u7D00\u9304\uFF080 \u5C40\uFF09"}let pe=()=>({schema:"s1-run-log/1",copiedAt:new Date().toISOString(),pageOpenedAt:N,build:{version:Hi,sha:g&&!g.startsWith("__")?g:"dev",art:Ni?"myth":"default",cam:ru?"near":"far"},note:"rematch\uFF1D\u8A72\u5C40\u7D50\u675F\u5F8C\u6709\u6C92\u6709\u6309\u300C\u518D\u4E00\u5834\u300D\uFF1Bnext\uFF1D\u7D50\u675F\u5F8C\u7684\u7B2C\u4E00\u500B\u52D5\u4F5C\uFF08again\uFF0Frestart\uFF0Ftitle\uFF0Fother-entry\uFF0Fnull\uFF1D\u9084\u6C92\u52D5\u4F5C\uFF09\uFF1BendedBy\uFF1Dresult \u6253\u5B8C\u3001abandoned \u4E2D\u9014\u96E2\u958B",runs:le});async function ge(){let _=JSON.stringify(pe(),null,2),P=t(".copy-status"),w=t(".copybox");P.hidden=!1,w.hidden=!0;try{if(!navigator.clipboard?.writeText)throw new Error("no clipboard");await navigator.clipboard.writeText(_),P.textContent=`\u5DF2\u8907\u88FD\uFF08${le.length} \u5C40\uFF09`}catch{r.result.classList.add("copying"),w.value=_,w.hidden=!1,w.focus(),w.select(),w.setSelectionRange(0,_.length),w.scrollTop=0;let A=!1;try{A=document.execCommand("copy")}catch{A=!1}P.textContent=A?`\u5DF2\u8907\u88FD\uFF08${le.length} \u5C40\uFF09`:"\u7121\u6CD5\u81EA\u52D5\u8907\u88FD\uFF1A\u5167\u5BB9\u5DF2\u5168\u9078\uFF0C\u8ACB\u624B\u52D5\u62F7\u8C9D\uFF08\u9577\u6309\u2192\u62F7\u8C9D\uFF09"}}let Ae={s0enemy:"\u6575\u4EBA",hunter:"\u7375\u624B",guardian:"\u76FE\u77DB\u885B\u58EB",shieldbearer:"\u76FE\u5175",archer:"\u5F13\u624B"},ue=()=>{for(let _ of Object.values(r))_.hidden=!0};function se(_,P,w){E=_,R=P,w&&(D=w),we=P==="s1",Ke=null,ye=-1/0,he.remove(K),xt(),P==="v3"?e.onStart(_,P,{ledgeDepth:k}):P==="v4"||P==="s1"?e.onStart(_,P,{path:D}):e.onStart(_,P),z.showPlaying()}function Re(){Ve(),x=!0,e.onPause(),r.pause.hidden=!1}let rt=t('[data-act="mute"]');s.addEventListener("click",_=>{let P=_.target.closest("[data-act]")?.getAttribute("data-act");if(P)switch(/^(start-|v4-|s1-)/.test(P)&&Te("other-entry"),P){case"start-v2-1v1":se("1v1","v2");break;case"art-toggle":ep("art","myth");break;case"cam-toggle":ep("cam","near");break;case"start-v3-1v1":se("1v1","v3");break;case"s1-ares":se("run","s1","ares");break;case"s1-mars":se("run","s1","mars");break;case"s1-none":se("run","s1","none");break;case"copy-record":Fe(!1),ge();break;case"clear-record":Fe(!0);break;case"clear-no":Fe(!1);break;case"clear-yes":F();break;case"v4-ares":se("waves","v4","ares");break;case"v4-mars":se("waves","v4","mars");break;case"v4-none":se("waves","v4","none");break;case"ledge-depth":k=k===2.6?1.5:2.6,_.target.closest("[data-act]").textContent=`\u6500\u9644\u9580\u6ABB\uFF1A${k}`;break;case"start-s0-1v1":se("1v1","s0");break;case"start-s0-1v2":se("1v2","s0");break;case"again":Te("again"),se(E,R,D);break;case"restart":Te("restart"),se(E,R,D);break;case"howto":r.title.hidden=!0,r.howto.hidden=!1;break;case"back":r.howto.hidden=!0,r.title.hidden=!1;break;case"resume":x=!1,r.pause.hidden=!0,e.onResume();break;case"title":Te("title"),z.showTitle();break;case"mute":y=!y,rt.textContent=`\u97F3\u6548\uFF1A${y?"\u95DC":"\u958B"}`,e.setMuted(y);break}}),t(".pause").addEventListener("click",()=>{te()&&Re()});let ft={basic:"",control:"",push:"",dash:""};function xt(){let _=Me(),P={basic:_||Ni?{tag:"myth",svg:Yo.basic}:{tag:"default",svg:Ts.basic},control:_||Ni?{tag:"myth",svg:Yo.control}:{tag:"default",svg:Ts.control},push:_&&D==="ares"?{tag:"charge",svg:Yy}:_?D==="mars"?{tag:"myth",svg:Yo.push}:{tag:"default",svg:Ts.push}:Ni?{tag:"myth",svg:Yo.push}:{tag:"default",svg:Ts.push},dash:{tag:"default",svg:Ts.dash}};for(let w of Object.keys(P))ft[w]!==P[w].tag&&(ft[w]=P[w].tag,v[w].dataset.icon=P[w].tag,v[w].querySelector("svg").outerHTML=P[w].svg)}ft.basic=Ni?"myth":"default",ft.control=ft.basic,ft.push=ft.basic,ft.dash="default";let an={ares:"\u963F\u745E\u65AF",mars:"\u746A\u723E\u65AF",none:"\u7121\u9053\u8DEF"},Pt=1.5,Wn="",On=t(".revive-n"),Oi=t(".revive"),As=t(".wave"),Bi=t(".protect"),xi=t(".reviving"),Rs=t(".reviving-t"),Cn=_=>_.variant==="s1"?`\u5019\u9078 S1\uFF08${an[_.s1?.record.path??_.v4?.path??D]}\uFF09`:_.variant==="v4"?`\u5019\u9078 v0.4\uFF08${an[_.v4?.path??D]}\uFF09`:_.variant==="v3"?`\u5019\u9078 v0.3\uFF08\u6500\u9644 ${_.ledgeDepth??2.6}\uFF09`:_.variant==="v2"?"\u5019\u9078 v0.2":"S0 \u57FA\u6E96",Sn={ver:"",hp:"",fill:"",time:"",low:!1},Cs={basic:{ring:"",text:"",cooling:!1},control:{ring:"",text:"",cooling:!1},push:{ring:"",text:"",cooling:!1},dash:{ring:"",text:"",cooling:!1}},Fr={knock:"\u64CA\u9000",dash:"\u885D\u523A"},Ur={predicted:"\u9810\u8A08",actual:"\u5BE6\u969B"},Nr={"dash-out":"\u4E3B\u52D5\u885D\u523A","too-deep":"\u592A\u6DF1",locked:"\u9396\u5B9A\u4E2D","no-landing":"\u7121\u843D\u9EDE"},Or={pending:"\u9032\u884C\u4E2D",rescue:"\u6551\u56DE",climbed:"\u7FFB\u56DE",knocked:"\u88AB\u6253\u843D",timeout:"\u6642\u9593\u5230",hp:"\u8840\u76E1",fall:"\u589C\u843D"},zi=_=>_.startsWith("accepted")?`\u5DF2\u6309${_.slice(8)}`:_.startsWith("buffered")?`\u63D0\u65E9\u6309${_.slice(8)}`:_==="none"?"\u6C92\u6309":_,Br=_=>[`${_.t.toFixed(1)}s`,_.who,Fr[_.source]??_.source,_.depth===null?"\u2014":`${_.depth.toFixed(1)}${_.basis?` ${Ur[_.basis]}`:""}`,_.eligible?"\u53EF\u6500\u9644":`\u4E0D\u53EF\uFF08${_.reason?Nr[_.reason]??_.reason:"\u2014"}\uFF09`,zi(_.input),Or[_.outcome]??_.outcome],C=t(".edge"),Y=t(".edge-list");C.addEventListener("toggle",()=>r.result.classList.toggle("edge-open",C.open));function Q(_){let P=_.edgeLog??[];C.hidden=P.length===0&&_.variant!=="v3",C.open=!1,r.result.classList.remove("edge-open"),t(".edge-n").textContent=String(P.length);let w=document.createElement("table"),A=w.insertRow();for(let L of["\u6642\u9593","\u8AB0","\u4F86\u6E90","\u6DF1\u5EA6","\u53EF\u5426\u6500\u9644","\u7FFB\u56DE\u9375","\u7D50\u679C"]){let V=document.createElement("th");V.textContent=L,A.appendChild(V)}for(let L of P){let V=w.insertRow();for(let W of Br(L))V.insertCell().textContent=W}if(P.length===0){let L=w.insertRow().insertCell();L.colSpan=7,L.textContent="\u672C\u5834\u6C92\u6709\u51FA\u754C"}Y.replaceChildren(w)}function ee(_){let P=_.s1,w=t(".s1res"),A=t('[data-act="copy-record"]');if(w.hidden=!P,A.hidden=!P,t('[data-act="clear-record"]').hidden=!P,Fe(!1),t(".copy-status").hidden=!0,t(".copybox").hidden=!0,r.result.classList.remove("copying"),!P)return;let L=P.record;we=!1,ze(L,"result"),t(".s1where").textContent=`${_.result==="win"?"\u901A\u95DC":"\u6B62\u6B65"}\uFF1A\u5CF6 ${L.reached.island}\uFF0F${P.islandTotal} \xB7 \u7B2C ${L.reached.wave} \u6CE2 \xB7 ${an[L.path]}`;let V=[...L.downs].reverse().find(W=>!W.revived)??L.downs[L.downs.length-1];t(".s1death").textContent=_.result==="win"||!V?"":`\u6B7B\u56E0\uFF1A${V.cause==="fall"?"\u589C\u843D":"\u8840\u91CF\u6B78\u96F6"}${V.byKit?`\uFF08${Ae[V.byKit]}\uFF09`:""}\uFF08\u5CF6 ${V.island}\uFF0F\u7B2C ${V.wave} \u6CE2\uFF0C${V.t.toFixed(1)} \u79D2\uFF09`}function Z(_){let P=t(".v4res"),w=_.v4;if(P.hidden=!w,!w)return;let A=(V,W)=>w.kills.filter(X=>X.how===V&&X.where===W).length,L=(V,W)=>`${W} ${A(V,"center")+A(V,"edge")}\uFF08\u4E2D\u592E ${A(V,"center")}\uFF0F\u5D16\u908A ${A(V,"edge")}\uFF09`;t(".v4kills").textContent=`${L("hp","\u6253\u6B7B")}\u3000${L("fall","\u64CA\u843D")}`,t(".v4meta").textContent=`${an[w.path]} \xB7 \u7B2C ${w.wave.index}\uFF0F${w.wave.total} \u6CE2 \xB7 \u7834\u9632 ${w.breaks} \xB7 \u5B8C\u7F8E\u683C\u64CB ${w.perfectBlocks} \xB7 \u53CD\u64CA \u76FE\u64CA ${w.counters.bash}\uFF0F\u8FD1\u8EAB ${w.counters.melee}`}let ve=null;function Le(_,P){let w=_.v4,A=_.s1,L=w?.revivesLeft;Oi.style.display=L===void 0?"none":"",On.textContent=`\xD7${L??0}`,Oi.classList.toggle("spent",(L??0)<=0);let V=w?.wave.index??A?.record.reached.wave;if(V!==void 0){let Ee=A?`\u5CF6 ${A.islandIndex}\uFF0F${A.islandTotal} \xB7 \u7B2C ${V} \u6CE2`:`\u7B2C ${V} \u6CE2`;As.textContent=Ee;let je=`${A?.islandIndex??0}-${V}`;if(je!==Wn){let Xe=!!A&&Wn.split("-")[0]!==String(A.islandIndex);Wn=je,V>0&&z.banner(Xe?Ee:`\u7B2C ${V} \u6CE2`,"info")}}let W=P.protectT??0;Bi.classList.toggle("on",W>0),W>0&&(Bi.textContent=`\u4FDD\u8B77\u4E2D ${W.toFixed(1)}`),c.parentElement.classList.toggle("protected",W>0);let X=P.state==="reviving";xi.classList.toggle("on",X),X&&(Rs.textContent=Math.max(0,Pt-P.stateT).toFixed(1));let xe=(P.counterT??0)>0;v.basic.classList.toggle("counter",xe),v.push.classList.toggle("counter",xe)}let Be=t(".exit-hint"),Ue=!1,Je=[];function et(){for(let _ of Je)window.clearTimeout(_);Je=[],Be.classList.remove("on","fade"),s.classList.remove("hint-on")}function Ze(_){let P=_.s1?.phase==="exit";P&&!Ue?(et(),Be.classList.add("on"),s.classList.add("hint-on"),Je.push(window.setTimeout(()=>Be.classList.add("fade"),2500)),Je.push(window.setTimeout(et,3e3))):!P&&Ue&&et(),Ue=P}let z={readIntent(){let _={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null};if(!te())return O=null,U=!1,G=!1,q=!1,_;let P;if(S)P=S.move;else{let X=($.has("KeyD")?1:0)-($.has("KeyA")?1:0),xe=($.has("KeyS")?1:0)-($.has("KeyW")?1:0);X&&xe&&(X*=Math.SQRT1_2,xe*=Math.SQRT1_2),P={x:X,z:xe}}let w=I.basic,A=Me(),L=!!w||Se||ne||A&&G,V=null;w&&w.dragged?V=nt(w):!w&&Se&&(V=B());let W={move:{x:P.x,z:P.z},fire:L,fireDir:V,cast:O,dash:U,dashDir:null};if(A&&(W.firePressed=G),re()){let X=I.push;W.guardHeld=!!X||J||q,W.guardPressed=q,W.guardDir=X&&X.dragged&&Math.hypot(X.x-X.cx,X.y-X.cy)>=X.r*bc?nt(X):null}return O=null,U=!1,G=!1,q=!1,W},aimPreview(){if(!te())return null;for(let P of["control","push"]){if(P==="push"&&re())continue;let w=I[P];if(w&&w.dragged){let A=He(w,P),L=nt(w);if(L)return{skill:P,dir:L,cancel:A}}}if(ce)return{skill:ce,dir:B()??{x:1,z:0},cancel:fe};let _=I.basic;if(_&&_.dragged){let P=nt(_);if(P)return{skill:"basic",dir:P,cancel:!1}}if(!_&&Se){let P=B();if(P)return{skill:"basic",dir:P,cancel:!1}}return null},update(_){let P=`${Cn(_)} \xB7 ${p}`;P!==Sn.ver&&(Sn.ver=P,u.textContent=P);let w=_.fighters.find(je=>je.id===_.playerId);if(!w)return;let L=`${Math.max(0,Math.ceil(w.hp))} / ${Math.ceil(w.maxHp)}`;L!==Sn.hp&&(Sn.hp=L,h.textContent=L);let V=`${Math.max(0,Math.min(1,w.hp/w.maxHp))*100}%`;V!==Sn.fill&&(Sn.fill=V,c.style.width=V);let W=w.hp/w.maxHp<.3;W!==Sn.low&&(Sn.low=W,c.classList.toggle("low",W));let X=Math.max(0,Math.floor(_.time)),xe=`${String(Math.floor(X/60)).padStart(2,"0")}:${String(X%60).padStart(2,"0")}`;xe!==Sn.time&&(Sn.time=xe,d.textContent=xe),_.s1&&(Ke=_.s1.record,we&&performance.now()-ye>=2e3&&(ye=performance.now(),he.set(K,JSON.stringify(_.s1.record)))),(_.variant!==R||(_.variant==="v4"||_.variant==="s1")&&w.path&&w.path!==D)&&(R=_.variant,E=_.mode,w.path&&(D=w.path),xt());let Ee=_.variant==="v4"||_.variant==="s1";n.classList.toggle("v4",Ee),Ee&&Le(_,w),Ze(_),v.dash.classList.toggle("ledge",w.state==="ledge"),v.dash.classList.toggle("climbing",w.state==="climb");for(let je of Object.keys(b)){let pt=je==="dash"&&(w.state==="ledge"||w.state==="climb")?0:w.cooldowns[je]??0,Ut=w.cooldownMax[je]??0;j[je]=pt;let jt=`${((Ut>0?Math.max(0,Math.min(1,pt/Ut)):0)*360).toFixed(0)}deg`,si=je!=="basic"&&pt>.05?pt>=10?pt.toFixed(0):pt.toFixed(1):"",dn=Cs[je];jt!==dn.ring&&(dn.ring=jt,b[je].ring.style.setProperty("--cd",jt)),si!==dn.text&&(dn.text=si,b[je].text.textContent=si);let Is=pt>.05;Is!==dn.cooling&&(dn.cooling=Is,v[je].classList.toggle("cooling",Is))}},showTitle(){ve?.cancel(),Ve(),m=!1,x=!1,ue(),n.hidden=!0,i.hidden=!0,r.title.hidden=!1},showResult(_){ve?.cancel(),Ve(),m=!1,x=!1,E=_.mode,R=_.variant,_.ledgeDepth&&(k=_.ledgeDepth),_.v4&&(D=_.v4.path),ue(),n.hidden=!0,i.hidden=!0;let P=_.result==="win",w=r.result;w.classList.toggle("win",P),w.classList.toggle("lose",!P),w.classList.toggle("no-stats",_.variant==="v4"||_.variant==="s1"),w.querySelector(".res-title").textContent=P?"\u52DD\u5229":"\u5931\u6557",w.querySelector(".res-text").textContent=P?"":_.loseText??"";let A=_.stats,L=(V,W)=>{w.querySelector(`[data-stat="${V}"]`).textContent=W};L("acc",A.shotsFired>0?`${Math.round(A.shotsHit*100/A.shotsFired)}%\uFF08${A.shotsHit}/${A.shotsFired}\uFF09`:"\u2014"),L("combos",String(A.combos)),L("fall",String(A.kills.fall)),L("hp",String(A.kills.hp)),Q(_),Z(_),ee(_),w.hidden=!1},showPlaying(){Ve(),m=!0,x=!1,ue(),n.hidden=!1,i.hidden=!1,Wn="";for(let _ of[Bi,xi])_.classList.remove("on");v.basic.classList.remove("counter"),v.push.classList.remove("counter"),n.classList.toggle("v4",Me()),et(),Ue=!1},banner(_,P){f.textContent=_,f.className=`banner ${P}`,ve?.cancel(),typeof f.animate=="function"&&(ve=f.animate([{opacity:0,transform:"translate(-50%, 0) scale(0.7)"},{opacity:1,transform:"translate(-50%, 0) scale(1.05)",offset:.15},{opacity:1,transform:"translate(-50%, 0) scale(1)",offset:.65},{opacity:0,transform:"translate(-50%, -14px) scale(1)"}],{duration:1200,easing:"ease-out",fill:"both"}))}};return z.showTitle(),z}var Ky={shootP:.05,shootE:.14,hitP:.05,hitE:.07,hurt:.12,windupH:.4,windupB:.25,windupP:.2,windupEP:.35,windupEC:.3,shootEC:.2,strikeBlocked:.2,ledgeGrabP:.3,ledgeGrabE:.3,ledgeRdy:.1,ledgeClimbP:.2,ledgeClimbE:.2,ledgeDropP:.3,ledgeDropE:.3,meleeP:.08,meleeE:.15,blockB:.12,blockG:.1,blockPf:.2,recoilP:.15,recoilE:.2,gBreak:.5,armorP:.4,armorE:.4,chargeP:.3,chargeE:.3,cReady:.3,cUsed:.15,cLost:.3,reviveS:.5,reviveG:.5,wave:.6,exitOpen:1,jump:1.5,land:1,windupM:.2,cast:.1,dash:.1,blocked:.07,fall:.3,combo:.15};function sp(){let s=null,e=null,t=null,n=!1,i=0,r={},o=new Map,a=.2;function l(m){let x=o.get(m);x!==void 0&&(clearTimeout(x),o.delete(m))}function c(){if(s)return s;let m=window,x=m.AudioContext||m.webkitAudioContext;if(!x)return null;try{s=new x}catch{return null}e=s.createGain(),e.gain.value=n?0:.5;let y=s.createDynamicsCompressor();y.threshold.value=-18,y.ratio.value=6,y.attack.value=.003,y.release.value=.15,e.connect(y),y.connect(s.destination),t=s.createBuffer(1,s.sampleRate,s.sampleRate);let E=t.getChannelData(0);for(let R=0;R<E.length;R++)E[R]=Math.random()*2-1;return s}function h(m){return i>=28?!1:(i++,setTimeout(()=>{i=Math.max(0,i-1)},(m+.1)*1e3),!0)}function d(m,x,y,E,R=.004){m.gain.setValueAtTime(1e-4,x),m.gain.linearRampToValueAtTime(y,x+R),m.gain.exponentialRampToValueAtTime(1e-4,x+E)}function u(m,x,y,E,R,k,D=0){if(!e||!h(R+D))return;let M=m.currentTime+D,S=m.createOscillator(),I=m.createGain();S.type=x,S.frequency.setValueAtTime(y,M),E!==y&&S.frequency.exponentialRampToValueAtTime(Math.max(20,E),M+R),d(I,M,k,R),S.connect(I),I.connect(e),S.start(M),S.stop(M+R+.02)}function f(m,x,y,E,R,k,D,M=0){if(!e||!t||!h(k+M))return;let S=m.currentTime+M,I=m.createBufferSource();I.buffer=t,I.loop=!0;let O=m.createBiquadFilter();O.type=x,O.Q.value=R,O.frequency.setValueAtTime(y,S),E!==y&&O.frequency.exponentialRampToValueAtTime(Math.max(20,E),S+k);let U=m.createGain();d(U,S,D,k,.006),I.connect(O),O.connect(U),U.connect(e),I.start(S,Math.random()*.5),I.stop(S+k+.02)}function v(m,x){let y=m.currentTime;return y-(r[x]??-1)<(Ky[x]??.05)?!1:(r[x]=y,!0)}function b(m,x,y){let E=x==="melee3"||x==="charge"||x==="counterBash",R=y?1.15:1;u(m,"sine",E?130:160,E?48:70,E?.3:.18,(E?.55:.42)*R),f(m,"lowpass",E?1100:1500,200,.7,E?.2:.11,(E?.3:.22)*R),(x==="counterBash"||x==="counterMelee")&&u(m,"triangle",880,660,.1,.12,.02),y&&u(m,"triangle",300,200,.1,.1)}function g(m,x,y){if(x==="melee1"||x==="melee2"||x==="melee3"||x==="charge"||x==="counterBash"||x==="counterMelee"){b(m,x,y);return}let E=x==="push"||x==="enemyHeavy";y?(u(m,"sine",E?150:200,E?55:90,E?.32:.2,E?.5:.36),f(m,"lowpass",1400,300,.7,E?.26:.14,E?.3:.2),u(m,"triangle",330,220,.12,.12)):E?(u(m,"sine",170,60,.28,.42),f(m,"bandpass",900,250,.9,.22,.26)):x==="control"?(u(m,"triangle",520,300,.12,.2),f(m,"bandpass",2400,1400,1.2,.09,.14)):(u(m,"square",760,520,.05,.07),f(m,"highpass",3e3,3e3,.7,.05,.1))}function p(m,x,y){switch(x.type){case"shoot":{let E=x.ownerId===y;if(!v(m,E?"shootP":x.kind==="control"?"shootEC":"shootE"))return;if(!E&&x.kind==="control")u(m,"sawtooth",240,150,.14,.09),f(m,"bandpass",700,350,2,.12,.09);else if(E){let R=x.kind==="control";u(m,"square",R?520:900,R?260:380,.07,.07),f(m,"bandpass",2600,1200,1.4,.05,.08)}else u(m,"sine",300,150,.09,.1),f(m,"lowpass",900,400,.8,.06,.08);return}case"hit":{let E=x.targetId===y;if(!E&&x.sourceId!==y||!v(m,E?"hurt":"hitP"))return;g(m,x.kind,E);return}case"windupStart":{if(x.skill==="enemyHeavy"){if(!v(m,"windupH"))return;u(m,"triangle",392,440,.16,.26),u(m,"triangle",523,587,.2,.28,.15),u(m,"sine",196,262,Math.min(.5,x.dur),.18)}else if(x.skill==="enemyBasic"){if(!v(m,"windupB"))return;u(m,"sine",620,700,.06,.07)}else if(x.skill==="melee1"||x.skill==="melee2"||x.skill==="melee3"||x.skill==="charge"){if(x.ownerId===y||!v(m,"windupM"))return;x.skill==="charge"?(u(m,"sawtooth",80,140,Math.min(.4,x.dur),.14),f(m,"lowpass",300,700,.8,.25,.1)):u(m,"sine",330,x.skill==="melee3"?420:380,.08,.09)}else if(x.ownerId!==y&&x.skill==="push"){if(!v(m,"windupEP"))return;u(m,"sine",90,190,.2,.3),f(m,"lowpass",300,1100,.9,.18,.16)}else if(x.ownerId!==y&&x.skill==="control"){if(!v(m,"windupEC"))return;u(m,"sawtooth",700,1500,.14,.1),f(m,"bandpass",2400,4200,3,.1,.1)}else if(x.ownerId===y){if(!v(m,"windupP"))return;u(m,"sine",240,380,Math.min(.3,x.dur),.09)}return}case"cast":{if(!v(m,"cast"))return;let E=x.skill==="enemyHeavy";u(m,"sine",E?120:140,40,.38,E?.55:.5),f(m,"lowpass",1800,150,.8,.3,.3);return}case"dash":{if(!v(m,"dash"))return;let E=x.ownerId===y;f(m,"bandpass",600,3800,1.1,.22,E?.26:.14);return}case"blocked":{if(!v(m,"blocked"))return;u(m,"triangle",190,110,.07,.2),f(m,"bandpass",1500,900,2,.06,.2);return}case"fall":{if(!v(m,"fall"))return;let R=x.ownerId===y?.3:.2;f(m,"bandpass",1800,220,1.6,.9,R),u(m,"sine",700,120,.9,R*.45);return}case"blockedStrike":{if(!v(m,"strikeBlocked"))return;let E=x.ownerId===y||x.targetId===y?1:.5;u(m,"sine",110,45,.3,.5*E),f(m,"lowpass",700,120,.8,.22,.3*E);return}case"ledgeGrab":{let E=x.ownerId===y;if(!v(m,E?"ledgeGrabP":"ledgeGrabE"))return;u(m,"sine",95,50,.26,E?.5:.28),f(m,"bandpass",1800,500,1.1,.2,E?.26:.16),f(m,"highpass",4200,2600,.7,.07,E?.1:.06,.05),E||(u(m,"square",740,740,.06,.1,.04),u(m,"square",988,988,.08,.1,.13)),l(x.ownerId),o.set(x.ownerId,setTimeout(()=>{o.delete(x.ownerId),!(n||!s||s.state!=="running"||!v(s,"ledgeRdy"))&&(E?u(s,"sine",1040,1040,.05,.1):u(s,"sawtooth",1480,1480,.07,.09))},a*1e3));return}case"ledgeClimb":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeClimbP":"ledgeClimbE"))return;f(m,"bandpass",500,2200,1,.18,E?.22:.12),u(m,"triangle",E?220:300,E?420:600,.16,E?.16:.09),u(m,"sine",E?120:160,E?70:100,.12,E?.3:.16,.17);return}case"ledgeDrop":{l(x.ownerId);let E=x.ownerId===y;if(!v(m,E?"ledgeDropP":"ledgeDropE"))return;let R=E?1:.6;x.reason==="knocked"?(u(m,"sine",180,55,.3,.45*R),f(m,"lowpass",1600,250,.8,.24,.26*R)):(f(m,"bandpass",3e3,700,1.6,.3,.2*R),u(m,"sine",420,130,.32,.18*R));return}case"melee":{let E=x.ownerId===y;if(!v(m,E?"meleeP":"meleeE"))return;let R=E?1:.55;x.hit?f(m,"bandpass",1500,700,1.2,.07,.07*R):(f(m,"bandpass",x.counter?3200:2400,x.counter?900:600,1.3,.16,.2*R),u(m,"sine",x.step===3?260:340,140,.12,.08*R));return}case"shieldBlock":{if(x.attackerId!==y&&x.targetId!==y)return;if(x.kind==="bearer"){if(!v(m,"blockB"))return;u(m,"sine",410,380,.28,.26),u(m,"sine",655,610,.2,.2),f(m,"highpass",2500,2500,.8,.1,.18)}else if(x.kind==="perfect"){if(!v(m,"blockPf"))return;u(m,"sine",1568,1568,.45,.28),u(m,"sine",2349,2349,.35,.2,.01),u(m,"triangle",3136,3136,.2,.08,.02),f(m,"highpass",6e3,6e3,.7,.08,.12)}else{if(!v(m,"blockG"))return;u(m,"square",1200,900,.07,.1),f(m,"bandpass",3200,2200,1.8,.06,.14)}return}case"recoil":{let E=x.ownerId===y;if(!v(m,E?"recoilP":"recoilE"))return;u(m,"sine",300,110,.12,E?.3:.16);return}case"guardBreak":{if(!v(m,"gBreak"))return;let E=x.targetId===y?1:.8;u(m,"sawtooth",700,520,.09,.14*E),u(m,"sawtooth",820,430,.09,.12*E,.1),u(m,"sawtooth",620,300,.12,.09*E,.2),f(m,"bandpass",2800,500,1.4,.3,.18*E),u(m,"sine",150,60,.25,.3*E,.02);return}case"armor":{let E=x.ownerId===y;if(!v(m,E?"armorP":"armorE"))return;u(m,"sine",70,95,Math.min(.35,x.dur),E?.22:.14),f(m,"lowpass",260,520,.9,.2,E?.1:.06);return}case"charge":{let E=x.ownerId===y;if(!v(m,E?"chargeP":"chargeE"))return;let R=E?1:.6;f(m,"lowpass",350,1100,.9,.4,.3*R),u(m,"sawtooth",70,130,.35,.16*R);return}case"counterReady":{if(x.ownerId!==y||!v(m,"cReady"))return;u(m,"triangle",1175,1175,.12,.18),u(m,"triangle",1568,1568,.2,.2,.09),f(m,"highpass",6500,6500,.7,.1,.06,.09);return}case"counterUsed":{if(x.ownerId!==y||!v(m,"cUsed"))return;x.kind==="bash"?(u(m,"square",700,260,.08,.14),u(m,"sine",110,55,.14,.3)):(f(m,"bandpass",3e3,900,1.3,.1,.16),u(m,"triangle",1318,1318,.08,.12,.02));return}case"counterLost":{if(x.ownerId!==y||!v(m,"cLost"))return;u(m,"sine",880,440,.14,.1);return}case"reviveStart":{if(x.ownerId!==y||!v(m,"reviveS"))return;u(m,"sine",196,165,.5,.2),u(m,"sine",196,165,.45,.1,.28),f(m,"lowpass",500,200,.7,.6,.08);return}case"revive":{if(x.ownerId!==y||!v(m,"reviveG"))return;[392,523.25,659.25,783.99].forEach((E,R)=>u(m,"triangle",E,E,R===3?.45:.14,.2,R*.09));return}case"waveStart":{if(!v(m,"wave"))return;u(m,"sawtooth",220,220,.4,.1),u(m,"sawtooth",330,330,.4,.1,.18),x.index>=x.total-1&&u(m,"sawtooth",440,440,.5,.1,.36);return}case"exitOpen":{if(!v(m,"exitOpen"))return;u(m,"sine",784,784,.35,.16),u(m,"sine",1175,1175,.5,.14,.12),u(m,"triangle",1568,1568,.45,.07,.24),f(m,"highpass",6e3,6e3,.7,.2,.05,.12);return}case"jumpStart":{if(x.ownerId!==y||!v(m,"jump"))return;u(m,"sine",160,70,.14,.3),f(m,"bandpass",600,2600,.9,.35,.18,.05),f(m,"bandpass",2600,500,.8,1.2,.22,.35);return}case"land":{if(x.ownerId!==y||!v(m,"land"))return;u(m,"sine",90,38,.45,.6),f(m,"lowpass",900,120,.8,.4,.4),f(m,"highpass",3500,2200,.7,.18,.12,.06);return}case"combo":{if(!v(m,"combo"))return;u(m,"sine",988,988,.14,.2),u(m,"sine",1319,1319,.22,.2,.08),u(m,"triangle",1976,1976,.2,.06,.08);return}case"roundEnd":{let E=x.result==="win",R=E?[523.25,659.25,783.99,1046.5]:[392,349.23,311.13,233.08];R.forEach((k,D)=>{let M=D===R.length-1;u(m,E?"triangle":"sine",k,k,M?.7:.2,.28,D*.17),E&&M&&u(m,"sine",k*1.5,k*1.5,.7,.1,D*.17)});return}default:return}}return{unlock(){let m=c();if(m)try{m.resume();let x=m.createBuffer(1,1,22050),y=m.createBufferSource();y.buffer=x,y.connect(m.destination),y.start(0)}catch{}},play(m,x){if(!(n||!s||!e||m.length===0)){if(s.state!=="running"){s.resume().catch(()=>{});return}for(let y of m)try{p(s,y,x)}catch{}}},setMuted(m){n=m,e&&s&&e.gain.setTargetAtTime(m?0:.5,s.currentTime,.01)}}}function Zy(s){let e=/v(\d+(?:\.\d+)*)/.exec(s);return e?e[1]:"0"}function Jy(s,e){let t=s.split(".").map(Number),n=e.split(".").map(Number);for(let i=0;i<Math.max(t.length,n.length);i++){let r=(t[i]||0)-(n[i]||0);if(r)return r}return 0}function rp(s){if(!/^https?:/.test(location.protocol))return;let e=Zy(Hi),t=document.createElement("button");t.id="updBar",s.appendChild(t);let n=0,i=null;t.addEventListener("click",()=>{i&&location.replace(`${location.pathname}?v=${i}`)});let r=o=>{let a=Date.now();if(!o&&a-n<6e4)return;n=a;let l=`${location.pathname.replace(/[^/]*$/,"")}index.html?upd=${a}`;fetch(l,{cache:"no-store"}).then(c=>c.ok?c.text():"").then(c=>{let h=/<meta name="app-version" content="([\d.]+)"/.exec(c);!h||Jy(h[1],e)<=0||(i=h[1],t.textContent=`\u{1F195} \u6709\u65B0\u7248 v${i}\uFF0C\u9EDE\u9019\u88E1\u66F4\u65B0`,t.classList.add("on"))}).catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&r(!1)}),addEventListener("pageshow",()=>r(!1)),setTimeout(()=>r(!0),1500)}var cp=new URLSearchParams(location.search),jy=document.getElementById("game"),Qy=document.getElementById("overlay"),hp=document.getElementById("ui"),e_=Vi(),kr=jf(jy,Qy,e_),au=sp(),bt=null,Dr=!1,up=cp.get("ai")!=="0",Pr=0,$o=0,Zo=0,Lr=-1,Ko=[],op=ri.seed,dp=()=>JSON.parse(JSON.stringify(Ko)),Gn=ip(hp,{onStart:(s,e,t)=>fp(s,void 0,e,t),onPause:()=>{Dr=!0},onResume:()=>{Dr=!1},getPlayerPos:()=>bt?bt.player.pos:null,screenToGround:(s,e)=>kr.screenToGround(s,e),onFirstGesture:()=>au.unlock(),setMuted:s=>au.setMuted(s),runLog:dp});function lu(){if(!bt)return;let s=bt.state.island.seed??ri.seed;s!==op&&(op=s,kr.setIsland?.(bt.state.island))}function fp(s,e,t="s0",n={}){let i=e??(Number(cp.get("seed"))||Date.now()%1e9);if(t==="s1"){n.again&&Ko.length&&(Ko[Ko.length-1].again=!0);let r=new Fs(i,n.path??"ares");Ko.push(r.state.s1.record),bt=r}else bt=t==="v4"?new ks(i,n.path??"ares"):new At(s,i,t,n.ledgeDepth??2.6);bt.aiEnabled=up,kr.reset(),lu(),Gn.showPlaying(),Dr=!1,Pr=0,$o=0,Zo=0,Lr=-1}var ap=new Map;function ou(s,e,t){let n=performance.now();n-(ap.get(s)??-1e9)<1200||(ap.set(s,n),Gn.banner(e,t))}function t_(s){if(!bt)return;let e=bt.state.playerId;for(let t of s)t.type==="combo"?Gn.banner("\u9023\u62DB\uFF01","good"):t.type==="fall"?t.ownerId===e?Gn.banner("\u589C\u843D\u2026\u2026","bad"):(Gn.banner("\u64CA\u843D\uFF01","good"),Zo=.6):t.type==="death"&&t.ownerId!==e&&t.cause==="hp"?Gn.banner("\u64CA\u5012\uFF01","good"):t.type==="edgeSave"&&t.ownerId===e?Gn.banner("\u9A5A\u96AA\u6551\u56DE\uFF01","info"):t.type==="shieldBlock"?t.kind==="bearer"&&t.attackerId===e?ou("bearer","\u683C\u64CB","bad"):t.kind==="guard"&&t.targetId===e&&t.skill==="enemyHeavy"?ou("early","\u592A\u65E9","info"):t.kind==="perfect"&&t.targetId===e&&ou("perfect","\u5B8C\u7F8E\u683C\u64CB\uFF01","good"):t.type==="roundEnd"?Lr=1.3:t.type==="islandStart"&&lu()}var lp=performance.now();function pp(s){let e=Math.min(.1,(s-lp)/1e3);lp=s;let t=[],n=0;if(bt&&!Dr){if($o>0)$o-=e;else{let i=Zo>0?.35:1;Zo=Math.max(0,Zo-e),Pr+=e*i;let r=0;for(;Pr>=gn&&r<6;){bt.step(Gn.readIntent());for(let o of bt.drainEvents())t.push(o);if(Pr-=gn,n+=gn,r++,bt.hitstop>0){$o=Math.max($o,bt.hitstop),bt.hitstop=0,Pr=0;break}}r>=6&&(Pr=0)}t_(t),au.play(t,bt.state.playerId),Lr>0&&(Lr-=e,Lr<=0&&(Lr=-1,Gn.showResult(bt.state)))}bt&&(kr.render(bt.state,t,Dr?null:Gn.aimPreview(),n,e),Gn.update(bt.state)),requestAnimationFrame(pp)}function cu(){let s=window.visualViewport;kr.resize(s?s.width:innerWidth,s?s.height:innerHeight)}addEventListener("resize",cu);window.visualViewport?.addEventListener("resize",cu);cu();bt=new At("1v1",1);bt.aiEnabled=!1;Gn.showTitle();var n_={state:()=>JSON.parse(JSON.stringify(bt.state)),start:(s,e,t,n)=>fp(s,e,t,n),setAI:s=>{up=s,bt&&(bt.aiEnabled=s)},place:(s,e,t)=>bt?.place(s,e,t),kill:(s,e)=>bt?.debugKill(s,e),freeze:s=>{Dr=s},knock:(s,e,t)=>{if(!bt)return;let n=bt.state.fighters.find(i=>i.id!==s);n&&bt.debugDamage(s,n.id,"push",t??0,e)},project:(s,e)=>kr.worldToScreen(s,e),version:`${Hi} (cb4f125)`,s1Clear:()=>{bt instanceof Fs&&bt.debugClearIsland()},s1Goto:s=>{bt instanceof Fs&&(bt.debugGotoIsland(s),lu())},runLog:dp};window.__hunter=n_;rp(hp);requestAnimationFrame(pp);})();
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
