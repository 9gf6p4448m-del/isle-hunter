"use strict";(()=>{var Vi=.016666666666666666,Wr={radius:10,points:56,seed:7},dl={hp:100,speed:6.2,radius:.5},fl={hp:100,speed:5,radius:.5},jc=.5,eh=.8,th=.25,vi={shots:3,interval:.08,cooldown:.5,speed:24,range:9,radius:.22,dmg:6,autoAimRange:10},zt={windup:.3,cooldown:6,speed:26,range:11,radius:.45,dmg:12,slow:1.6},Pt={windup:.12,recover:.2,cooldown:7,range:3.2,halfAngle:40*Math.PI/180,dmg:10},On={base:2.4,lowHpBonus:5.6,slowedBonus:1,knockTime:.35,dashCancelAfter:.1,edgeGrace:.12},gn={distance:3.6,time:.16,cooldown:3.5},pl={duration:1.2,gravity:30},nh=2.5,Zt={windup:.3,shots:2,interval:.12,speed:15,range:9,radius:.25,dmg:6,cooldownMin:1.4,cooldownMax:2.1},kt={windup:.65,recover:.6,cooldown:6,range:3,halfAngle:45*Math.PI/180,dmg:14},bt={think:.15,preferMin:4.5,preferMax:7.5,edgeDanger:2.2,dodgeChance:.35,dodgeReactMin:.22,dodgeReactMax:.4,dodgeCooldown:4,edgeSaveChance:.5,edgeSaveReact:.25,strafeSwitchMin:1.5,strafeSwitchMax:2.5},ih={basic:.025,control:.06,push:.09,enemyBasic:.03,enemyHeavy:.09},yi="S0 v0.1.0";function Xr(){let i=Wr.points,e=Wr.radius,t=Wr.seed,n=[];for(let s=0;s<i;s++){let r=s/i*Math.PI*2,o=e*(1+.07*Math.sin(3*r+t)+.05*Math.sin(5*r+t*2.1)+.03*Math.sin(9*r+t*.7));n.push({x:Math.cos(r)*o,z:Math.sin(r)*o})}return{poly:n,radius:e,rocks:[{pos:{x:-2.6,z:-3},r:1.3},{pos:{x:3.6,z:2.6},r:.85}]}}function Xd(i,e){let t=!1;for(let n=0,s=e.length-1;n<e.length;s=n++){let r=e[n],o=e[s];r.z>i.z!=o.z>i.z&&i.x<(o.x-r.x)*(i.z-r.z)/(o.z-r.z)+r.x&&(t=!t)}return t}function Lt(i,e){let t=1/0;for(let n=0,s=e.length-1;n<e.length;s=n++)t=Math.min(t,qr(i,e[s],e[n]));return Xd(i,e)?t:-t}function qr(i,e,t){let n=t.x-e.x,s=t.z-e.z,r=n*n+s*s,o=r===0?0:Math.max(0,Math.min(1,((i.x-e.x)*n+(i.z-e.z)*s)/r)),a=e.x+n*o-i.x,c=e.z+s*o-i.z;return Math.hypot(a,c)}function ml(i,e,t,n){return qr(t,i,e)<n}var St=(i,e)=>({x:i.x+e.x,z:i.z+e.z}),hn=(i,e)=>({x:i.x-e.x,z:i.z-e.z}),Ye=(i,e)=>({x:i.x*e,z:i.z*e}),An=i=>Math.hypot(i.x,i.z),Fs=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Gi=(i,e)=>i.x*e.x+i.z*e.z;function _t(i){let e=Math.hypot(i.x,i.z);return e>1e-9?{x:i.x/e,z:i.z/e}:{x:0,z:0}}var sh=i=>({x:Math.cos(i),z:Math.sin(i)}),Wi=i=>Math.atan2(i.z,i.x),Yr=i=>({x:-i.z,z:i.x});function rh(i,e){let t=Math.cos(e),n=Math.sin(e);return{x:i.x*t-i.z*n,z:i.x*n+i.z*t}}function oh(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ch(i,e){return{rng:i,thinkT:0,strafeDir:i()<.5?1:-1,strafeT:0,move:{x:0,z:0},wantHeavy:!1,seen:new Set,dodge:null,edgeSaveAt:null,edgeSaveRolled:!1,aggression:e==="1v2"?.18:.28}}var qd=()=>({move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null});function ah(i,e,t,n){let s=_t(Yr(t)),r=St(e.pos,Ye(s,n)),o=St(e.pos,Ye(s,-n)),a=i.edgeDistance(r),c=i.edgeDistance(o);return Math.max(a,c)<1.2?_t(Ye(e.pos,-1)):a>=c?s:Ye(s,-1)}function hh(i,e,t,n){let s=qd(),r=i.state,o=i.player,a=r.time;if(!o||o.state==="dead"||o.state==="falling")return s;if(e.state==="knocked")return t.edgeSaveRolled||(t.edgeSaveRolled=!0,Gi(_t(e.knockVel),_t(e.pos))>.3&&t.rng()<bt.edgeSaveChance&&(t.edgeSaveAt=a+bt.edgeSaveReact)),t.edgeSaveAt!==null&&a>=t.edgeSaveAt&&i.edgeDistance(e.pos)<2.5&&(t.edgeSaveAt=null,s.dash=!0,s.dashDir=_t(Ye(e.pos,-1))),s;t.edgeSaveRolled=!1,t.edgeSaveAt=null;for(let u of i.pendingProjectiles()){if(u.team===e.team)continue;let p=`p${u.id}`;if(t.seen.has(p))continue;t.seen.add(p);let m=hn(e.pos,u.pos),x=Gi(m,u.dir);x<=0||x>8||Math.abs(m.x*u.dir.z-m.z*u.dir.x)>e.radius+u.radius+.3||lh(i,e,t,u.dir,u.kind==="control"?.9:.35)}if(o.windup&&o.windup.skill==="control"){let u=`w${o.id}:${(a-o.windup.t).toFixed(2)}`;if(!t.seen.has(u)){t.seen.add(u);let p=hn(e.pos,o.pos),m=Gi(p,o.windup.dir),x=Math.abs(p.x*o.windup.dir.z-p.z*o.windup.dir.x);m>0&&m<zt.range&&x<e.radius+zt.radius+.3&&lh(i,e,t,o.windup.dir,1)}}if(t.seen.size>400&&t.seen.clear(),t.dodge&&a>=t.dodge.at){if(t.dodge.dash)return e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup")&&(s.dash=!0,s.dashDir=t.dodge.dir),t.dodge=null,s;if(a<t.dodge.until)return s.move=t.dodge.dir,s;t.dodge=null}if(e.state!=="idle")return s.move=Ye(t.move,.5),s;t.thinkT-=n,t.strafeT-=n;let c=hn(o.pos,e.pos),l=An(c),h=_t(c),d=i.edgeDistance(e.pos);if(t.thinkT<=0){t.thinkT=bt.think,t.strafeT<=0&&(t.strafeT=bt.strafeSwitchMin+(bt.strafeSwitchMax-bt.strafeSwitchMin)*t.rng(),t.rng()<.5&&(t.strafeDir=t.strafeDir===1?-1:1)),!t.wantHeavy&&e.cooldowns.push<=0&&i.heavyOwner===null&&t.rng()<t.aggression&&(t.wantHeavy=!0);let u,p=Ye(Yr(h),t.strafeDir);if(d<bt.edgeDanger)u=_t(St(Ye(_t(Ye(e.pos,-1)),1.4),Ye(p,.5)));else if(t.wantHeavy)u=h;else if(l>bt.preferMax)u=_t(St(h,Ye(p,.4)));else if(l<bt.preferMin){let m=Ye(h,-1);u=i.edgeDistance(St(e.pos,Ye(m,2)))<bt.edgeDanger+.5?p:_t(St(m,Ye(p,.5)))}else u=p;i.edgeDistance(St(e.pos,Ye(u,1.5)))<bt.edgeDanger*.6&&(t.strafeDir=t.strafeDir===1?-1:1,u=_t(Ye(e.pos,-1)));for(let m of r.island.rocks){let x=St(e.pos,Ye(u,1.2));Fs(x,m.pos)<m.r+e.radius+.3&&(u=_t(St(u,Ye(Yr(_t(hn(m.pos,e.pos))),t.strafeDir*1.5))))}t.move=u}if(s.move=t.move,t.wantHeavy){if(i.heavyOwner!==null&&i.heavyOwner!==e.id)t.wantHeavy=!1;else if(l<kt.range-.4&&e.cooldowns.push<=0)return t.wantHeavy=!1,s.cast={skill:"push",dir:h},s}else if(e.cooldowns.basic<=0&&l<Zt.range-.5&&i.lineOfSight(e.pos,o.pos)){let u=(t.rng()-.5)*2*(6*Math.PI/180);s.fire=!0,s.fireDir=rh(h,u)}return s}function lh(i,e,t,n,s){if(t.dodge)return;let r=bt.dodgeReactMin+(bt.dodgeReactMax-bt.dodgeReactMin)*t.rng(),o=t.rng(),a=i.state.time;o<bt.dodgeChance*s&&e.cooldowns.dash<=0?t.dodge={at:a+r,dir:ah(i,e,n,gn.distance),dash:!0,until:0}:o<(bt.dodgeChance+.3)*s&&(t.dodge={at:a+r,dir:ah(i,e,n,1.5),dash:!1,until:a+r+.35})}var uh={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null},Ns=class i{constructor(e,t=1){this.aiEnabled=!0;this.hitstop=0;this.heavyOwner=null;this.events=[];this.nextId=1;this.bursts=new Map;this.ai=new Map;this.outsideT=new Map;this.dashMoved=new Map;this.fallVel=new Map;this.lastHitKind=new Map;this.controlMark=new Map;this.ended=!1;this.rng=oh(t);let n=Xr(),s=[this.makeFighter("player",0,"\u4F60",{x:0,z:3.5},-Math.PI/2)];e==="1v1"?s.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:.5,z:-4.5},Math.PI/2)):(s.push(this.makeFighter("enemy",1,"\u7D05\u7375\u624B",{x:-3.8,z:-4.2},Math.PI/2)),s.push(this.makeFighter("enemy",2,"\u6A58\u7375\u624B",{x:4.6,z:-3},Math.PI/2)));for(let r of s)r.team==="enemy"&&this.ai.set(r.id,ch(this.rng,e));this.state={time:0,mode:e,island:n,fighters:s,projectiles:[],playerId:s[0].id,result:null,loseText:null,stats:{shotsFired:0,shotsHit:0,combos:0,kills:{fall:0,hp:0}}}}makeFighter(e,t,n,s,r){let o=e==="player"?dl:fl,a=e==="player"?{basic:vi.cooldown,control:zt.cooldown,push:Pt.cooldown,dash:gn.cooldown}:{basic:Zt.cooldownMax,control:0,push:kt.cooldown,dash:bt.dodgeCooldown};return{id:this.nextId++,team:e,variant:t,name:n,pos:{...s},y:0,facing:r,moveVel:{x:0,z:0},radius:o.radius,hp:o.hp,maxHp:o.hp,state:"idle",stateT:0,windup:null,burstLeft:0,cooldowns:{basic:0,control:0,push:e==="enemy"?2.5:0,dash:0},cooldownMax:a,slowT:0,invulnT:0,hitFlashT:0,sinceShotT:99,knockVel:{x:0,z:0},deathCause:null,lastHitBy:null,lastHitAt:-99}}get player(){return this.state.fighters[0]}fighter(e){return this.state.fighters.find(t=>t.id===e)}drainEvents(){let e=this.events;return this.events=[],e}emit(e){this.events.push(e)}static alive(e){return e.state!=="dead"&&e.state!=="falling"}step(e){let t=this.state,n=Vi;t.time+=n;for(let s of t.fighters)this.tickTimers(s,n);for(let s of t.fighters){if(!i.alive(s))continue;let r;this.ended?r=uh:s.team==="player"?r=e:r=this.aiEnabled?hh(this,s,this.ai.get(s.id),n):uh,this.control(s,r)}for(let s of t.fighters)this.advance(s,n);this.separate(),this.moveProjectiles(n),this.checkEnd()}tickTimers(e,t){e.stateT+=t;for(let n of["basic","control","push","dash"])e.cooldowns[n]=Math.max(0,e.cooldowns[n]-t);e.slowT=Math.max(0,e.slowT-t),e.invulnT=Math.max(0,e.invulnT-t),e.hitFlashT=Math.max(0,e.hitFlashT-t),e.sinceShotT+=t}setState(e,t){e.state=t,e.stateT=0}facingDir(e){return sh(e.facing)}autoTarget(e,t){let n=null,s=1/0;for(let r of this.state.fighters){if(r.team===e.team||!i.alive(r))continue;let o=Fs(e.pos,r.pos);if(o>t)continue;let a=o+(this.lineOfSight(e.pos,r.pos)?0:6);a<s&&(s=a,n=r)}return n}lineOfSight(e,t){return!this.state.island.rocks.some(n=>ml(e,t,n.pos,n.r))}aimOrAuto(e,t,n){if(t&&An(t)>.01)return _t(t);let s=this.autoTarget(e,n);return s?_t(hn(s.pos,e.pos)):this.facingDir(e)}control(e,t){if(t.dash&&e.cooldowns.dash<=0&&(e.state==="idle"||e.state==="windup"||e.state==="knocked"&&e.stateT>=On.dashCancelAfter)){this.startDash(e,t);return}if(e.state==="idle"&&t.cast){if(e.team==="player"){let n=t.cast.skill;if(e.cooldowns[n]<=0){let s=n==="control"?zt.range:Pt.range+2;this.startWindup(e,n,this.aimOrAuto(e,t.cast.dir,s),n==="control"?zt.windup:Pt.windup);return}}else if(t.cast.skill==="push"&&e.cooldowns.push<=0&&(this.heavyOwner===null||this.heavyOwner===e.id)){this.heavyOwner=e.id,this.startWindup(e,"enemyHeavy",this.aimOrAuto(e,t.cast.dir,6),kt.windup);return}}if(e.state==="idle"&&t.fire&&e.burstLeft===0&&e.cooldowns.basic<=0)if(e.team==="player"){let n=this.aimOrAuto(e,t.fireDir,vi.autoAimRange);e.burstLeft=vi.shots,e.cooldowns.basic=vi.cooldown,this.bursts.set(e.id,{dir:n,timer:0,kind:"basic"}),e.facing=Wi(n)}else{this.startWindup(e,"enemyBasic",this.aimOrAuto(e,t.fireDir,Zt.range),Zt.windup);return}if(e.state==="idle"||e.state==="windup"||e.state==="recover"){let n=t.move,s=An(n);s>1&&(n=Ye(n,1/s));let r=e.team==="player"?dl.speed:fl.speed;e.slowT>0&&(r*=jc),e.burstLeft>0&&(r*=eh),e.state==="windup"&&(r*=th),e.state==="recover"&&(r*=.3),e.moveVel=Ye(n,r),e.state==="idle"&&e.burstLeft===0&&s>.1&&(e.facing=Wi(n))}else e.moveVel={x:0,z:0}}startWindup(e,t,n,s){e.windup={skill:t,t:0,dur:s,dir:n},e.facing=Wi(n),this.setState(e,"windup"),this.emit({type:"windupStart",ownerId:e.id,skill:t,dir:n,dur:s})}cancelWindup(e){e.windup&&(this.emit({type:"cancel",ownerId:e.id,skill:e.windup.skill}),e.windup.skill==="enemyHeavy"&&this.heavyOwner===e.id&&(this.heavyOwner=null),e.windup=null)}startDash(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id);let n=t.dashDir&&An(t.dashDir)>.01?_t(t.dashDir):null;!n&&An(t.move)>.2&&(n=_t(t.move)),n||(n=this.facingDir(e)),e.state==="knocked"&&Lt(e.pos,this.state.island.poly)<2.5&&this.emit({type:"edgeSave",ownerId:e.id}),e.knockVel=Ye(n,gn.distance/gn.time),e.facing=Wi(n),e.cooldowns.dash=e.cooldownMax.dash,e.invulnT=gn.time+.04,this.dashMoved.set(e.id,0),this.outsideT.set(e.id,0),this.setState(e,"dash"),this.emit({type:"dash",ownerId:e.id,from:{...e.pos},dir:n})}advance(e,t){let n=this.state.island.poly;switch(e.state){case"dead":return;case"falling":{let s=this.fallVel.get(e.id)??{x:0,z:0};e.pos=St(e.pos,Ye(s,t)),e.y=-.5*pl.gravity*e.stateT*e.stateT,e.stateT>=pl.duration&&this.die(e,"fall");return}case"windup":{let s=e.windup;s.t+=t,this.walk(e,t),s.t>=s.dur&&this.releaseWindup(e);break}case"recover":this.walk(e,t),e.stateT>=(e.team==="player"?Pt.recover:kt.recover)&&this.setState(e,"idle");break;case"dash":{let s=this.dashMoved.get(e.id)??0,r=Math.min(t,gn.time-s);if(e.pos=St(e.pos,Ye(e.knockVel,r)),this.dashMoved.set(e.id,s+r),this.pushOutOfRocks(e),s+r>=gn.time-1e-9){let o=_t(e.knockVel);if(e.knockVel={x:0,z:0},Lt(e.pos,n)<0){this.startFall(e,Ye(o,2));return}this.setState(e,"idle")}break}case"knocked":{let s=1-Math.min(1,e.stateT/On.knockTime);if(e.pos=St(e.pos,Ye(e.knockVel,t*s)),this.pushOutOfRocks(e),Lt(e.pos,n)<0){let r=(this.outsideT.get(e.id)??0)+t;if(this.outsideT.set(e.id,r),r>On.edgeGrace){this.startFall(e,Ye(e.knockVel,.5*Math.max(s,.3)));return}}else this.outsideT.set(e.id,0);if(e.stateT>=On.knockTime){if(Lt(e.pos,n)<0){this.startFall(e,Ye(_t(e.knockVel),1.5));return}e.knockVel={x:0,z:0},this.setState(e,"idle")}break}case"idle":this.walk(e,t);break}if((e.state==="idle"||e.state==="windup"||e.state==="recover")&&Lt(e.pos,n)<0){this.startFall(e,{x:0,z:0});return}this.tickBurst(e,t)}walk(e,t){let n=this.state.island.poly,s=.35,r=Lt(e.pos,n),o=l=>{let h=Lt(l,n);return h>=s||h>=r},a=Ye(e.moveVel,t);if(a.x===0&&a.z===0)return;let c=St(e.pos,a);if(o(c))e.pos=c;else{let l={x:e.pos.x+a.x,z:e.pos.z},h={x:e.pos.x,z:e.pos.z+a.z};o(l)?e.pos=l:o(h)&&(e.pos=h)}this.pushOutOfRocks(e)}pushOutOfRocks(e){for(let t of this.state.island.rocks){let n=hn(e.pos,t.pos),s=An(n),r=t.r+e.radius;s<r&&(e.pos=St(t.pos,Ye(s>1e-6?Ye(n,1/s):{x:1,z:0},r)))}}separate(){let e=this.state.fighters.filter(t=>i.alive(t)&&t.state!=="dash");for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let s=e[t],r=e[n],o=hn(r.pos,s.pos),a=An(o),c=s.radius+r.radius;if(a<c&&a>1e-6){let l=Ye(o,(c-a)/a/2),h=this.state.island.poly,d=(m,x)=>{let g=Lt(x,h);return g>=.35||g>=Lt(m.pos,h)},u=hn(s.pos,l),p=St(r.pos,l);s.state!=="knocked"&&d(s,u)&&(s.pos=u),r.state!=="knocked"&&d(r,p)&&(r.pos=p)}}for(let t of e)this.pushOutOfRocks(t)}tickBurst(e,t){if(e.burstLeft<=0||!i.alive(e))return;let n=this.bursts.get(e.id);if(!n){e.burstLeft=0;return}if(n.timer-=t,n.timer>0)return;let s=n.kind==="basic"?vi:Zt;this.spawnProjectile(e,n.kind,n.dir,s.speed,s.range,s.radius),e.team==="player"&&this.state.stats.shotsFired++,e.sinceShotT=0,e.burstLeft--,n.timer=s.interval,e.burstLeft<=0&&this.bursts.delete(e.id)}spawnProjectile(e,t,n,s,r,o){let a=St(e.pos,Ye(n,e.radius+.15));this.state.projectiles.push({id:this.nextId++,kind:t,ownerId:e.id,team:e.team,pos:a,dir:{...n},speed:s,traveled:0,range:r,radius:o,alive:!0}),this.emit({type:"shoot",ownerId:e.id,kind:t,pos:{...a},dir:{...n}})}releaseWindup(e){let t=e.windup;switch(e.windup=null,t.skill){case"control":this.spawnProjectile(e,"control",t.dir,zt.speed,zt.range,zt.radius),e.sinceShotT=0,e.cooldowns.control=zt.cooldown,this.setState(e,"idle");break;case"push":this.coneStrike(e,t.dir,Pt.range,Pt.halfAngle,Pt.dmg,"push"),e.cooldowns.push=Pt.cooldown,this.setState(e,"recover");break;case"enemyBasic":{let n=Zt.cooldownMin+(Zt.cooldownMax-Zt.cooldownMin)*this.rng();e.cooldowns.basic=this.state.mode==="1v2"?n*1.4:n,e.burstLeft=Zt.shots,this.bursts.set(e.id,{dir:t.dir,timer:0,kind:"enemyBasic"}),this.setState(e,"idle");break}case"enemyHeavy":this.coneStrike(e,t.dir,kt.range,kt.halfAngle,kt.dmg,"enemyHeavy"),e.cooldowns.push=kt.cooldown,this.heavyOwner===e.id&&(this.heavyOwner=null),this.setState(e,"recover");break}}coneStrike(e,t,n,s,r,o){this.emit({type:"cast",ownerId:e.id,skill:o,pos:{...e.pos},dir:{...t}});for(let a of this.state.fighters){if(a.team===e.team||!i.alive(a))continue;let c=hn(a.pos,e.pos),l=An(c);l>n+a.radius||!(l<.6||Gi(Ye(c,1/l),t)>=Math.cos(s))||this.damage(a,e,o,r,t)}}static knockDistance(e,t,n){return On.base+On.lowHpBonus*(1-Math.max(0,e)/t)+(n?On.slowedBonus:0)}damage(e,t,n,s,r){if(!i.alive(e)||e.invulnT>0)return!1;let o=this.state,a=e.slowT>0;e.hp=Math.max(0,e.hp-s),e.hitFlashT=.12,e.lastHitBy=t.id,e.lastHitAt=o.time,this.lastHitKind.set(e.id,n),this.hitstop=Math.max(this.hitstop,ih[n]),n==="control"&&(e.slowT=zt.slow,t.team==="player"&&this.controlMark.set(e.id,o.time));let c=0;if(r&&e.hp>0&&(c=i.knockDistance(e.hp,e.maxHp,a),this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),e.knockVel=Ye(r,2*c/On.knockTime),e.facing=Wi(Ye(r,-1)),this.outsideT.set(e.id,0),this.setState(e,"knocked")),this.emit({type:"hit",targetId:e.id,sourceId:t.id,kind:n,pos:{...e.pos},dir:r?{...r}:_t(hn(e.pos,t.pos)),dmg:s,knock:c}),n==="push"&&t.team==="player"){let l=this.controlMark.get(e.id);l!==void 0&&o.time-l<=nh&&(o.stats.combos++,this.controlMark.delete(e.id),this.emit({type:"combo",ownerId:t.id,targetId:e.id}))}return e.hp<=0&&(this.cancelWindup(e),this.die(e,"hp")),!0}startFall(e,t){this.cancelWindup(e),e.burstLeft=0,this.bursts.delete(e.id),this.fallVel.set(e.id,t),e.moveVel={x:0,z:0},this.setState(e,"falling"),this.emit({type:"fall",ownerId:e.id,pos:{...e.pos}})}die(e,t){let n=this.state;e.deathCause=t,e.knockVel={x:0,z:0},this.setState(e,"dead");let s=e.lastHitBy!==null&&n.time-e.lastHitAt<4?e.lastHitBy:null;e.team==="enemy"&&s===n.playerId&&n.stats.kills[t]++,this.emit({type:"death",ownerId:e.id,cause:t,pos:{...e.pos},killerId:s})}moveProjectiles(e){let t=this.state;for(let n of t.projectiles){if(!n.alive)continue;let s=n.pos,r=n.speed*e,o=St(s,Ye(n.dir,r));if(n.traveled+=r,t.island.rocks.some(l=>ml(s,o,l.pos,l.r+n.radius*.5))){n.alive=!1,this.emit({type:"blocked",pos:o,kind:n.kind});continue}let a=null,c=1/0;for(let l of t.fighters)if(!(l.team===n.team||!i.alive(l)||l.invulnT>0)&&qr(l.pos,s,o)<l.radius+n.radius){let h=Fs(s,l.pos);h<c&&(c=h,a=l)}if(n.pos=o,a){n.alive=!1;let l=this.fighter(n.ownerId),h=n.kind,d=n.kind==="basic"?vi.dmg:n.kind==="control"?zt.dmg:Zt.dmg;this.damage(a,l,h,d,null)&&n.team==="player"&&n.kind==="basic"&&t.stats.shotsHit++;continue}n.traveled>=n.range&&(n.alive=!1,this.emit({type:"expire",pos:o,kind:n.kind}))}t.projectiles=t.projectiles.filter(n=>n.alive)}checkEnd(){if(this.ended)return;let e=this.state,t=this.player;t.state==="dead"?(e.result="lose",e.loseText=this.loseText(t)):e.fighters.every(n=>n.team==="player"||n.state==="dead")&&(e.result="win"),e.result&&(this.ended=!0,this.emit({type:"roundEnd",result:e.result}))}loseText(e){let t=this.state,n=e.lastHitBy!==null&&t.time-e.lastHitAt<4?this.fighter(e.lastHitBy):void 0,s=this.lastHitKind.get(e.id);return e.deathCause==="fall"?n?s==="enemyHeavy"?`\u88AB${n.name}\u7684\u91CD\u64CA\u63A8\u4E0B\u61F8\u5D16\u2014\u2014\u770B\u5230\u7D05\u8272\u6247\u5F62\u5C31\u5F80\u5074\u908A\u9583\uFF0C\u6216\u7528\u885D\u523A\u8EB2\u958B`:`\u88AB${n.name}\u903C\u4E0B\u61F8\u5D16\u2014\u2014\u88AB\u64CA\u98DB\u6642\u53EF\u4EE5\u99AC\u4E0A\u885D\u523A\u56DE\u5CF6\u4E0A`:"\u4F60\u81EA\u5DF1\u885D\u51FA\u4E86\u61F8\u5D16\u2014\u2014\u885D\u523A\u524D\u5148\u770B\u8173\u4E0B":n?`\u751F\u547D\u88AB${n.name}\u6253\u5230\u6B78\u96F6\u2014\u2014\u5728\u7260\u51FA\u62DB\u5F8C\u7684\u7A7A\u6A94\u53CD\u64CA\uFF0C\u5225\u786C\u62DA`:"\u751F\u547D\u6B78\u96F6"}edgeDistance(e){return Lt(e,this.state.island.poly)}pendingProjectiles(){return this.state.projectiles}place(e,t,n){let s=this.fighter(e);s&&(s.pos={...t},n!==void 0&&(s.facing=n))}debugKill(e,t){let n=this.fighter(e);!n||!i.alive(n)||(t==="hp"?(n.hp=0,this.die(n,"hp")):this.startFall(n,{x:0,z:0}))}debugDamage(e,t,n,s,r){let o=this.fighter(e),a=this.fighter(t);return o&&a?this.damage(o,a,n,s,r):!1}};var kh=0,ec=1,Hh=2;var tc=1,ea=2,Un=3,qn=0,qt=1,Yt=2,Kn=0,Yn=1,fi=2,nc=3,ic=4,Vh=5,li=100,Gh=101,Wh=102,Xh=103,qh=104,Yh=200,$h=201,Zh=202,Jh=203,Mo=204,bo=205,Kh=206,Qh=207,jh=208,eu=209,tu=210,nu=211,iu=212,su=213,ru=214,ta=0,na=1,ia=2,wi=3,sa=4,ra=5,oa=6,aa=7,la=0,ou=1,au=2,Qn=0,lu=1,cu=2,hu=3,uu=4,du=5,fu=6,pu=7;var sc=300,Pi=301,Li=302,ca=303,ha=304,Ir=306,Ai=1e3,ai=1001,So=1002,Jt=1003,mu=1004;var Pr=1005;var Mn=1006,ua=1007;var pi=1008;var Sn=1009,rc=1010,oc=1011,vs=1012,da=1013,mi=1014,En=1015,ys=1016,fa=1017,pa=1018,Ms=1020,ac=35902,lc=35899,cc=1021,hc=1022,pn=1023,hs=1026,bs=1027,ma=1028,ga=1029,uc=1030,xa=1031;var _a=1033,Lr=33776,Dr=33777,Ur=33778,Fr=33779,va=35840,ya=35841,Ma=35842,ba=35843,Sa=36196,Ea=37492,Ta=37496,wa=37808,Aa=37809,Ra=37810,Ca=37811,Ia=37812,Pa=37813,La=37814,Da=37815,Ua=37816,Fa=37817,Na=37818,Oa=37819,Ba=37820,za=37821,ka=36492,Ha=36494,Va=36495,Ga=36283,Wa=36284,Xa=36285,qa=36286;var Zs=2300,Eo=2301,yo=2302,Wl=2400,Xl=2401,ql=2402;var gu=3200,xu=3201;var dc=0,_u=1,jn="",ht="srgb",Ri="srgb-linear",Js="linear",it="srgb";var Ti=7680;var Yl=519,vu=512,yu=513,Mu=514,fc=515,bu=516,Su=517,Eu=518,Tu=519,To=35044,Ya=35048;var pc="300 es",yn=2e3,Ks=2001;var $n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var gl=Math.PI/180,wo=180/Math.PI;function Wn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function Yd(i,e){return(i%e+e)%e}function xl(i,e,t){return(1-t)*i+t*e}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var xe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],p=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=m,e[t+3]=x;return}if(d!==x||c!==u||l!==p||h!==m){let g=1-a,f=c*u+l*p+h*m+d*x,S=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){let R=Math.sqrt(E),b=Math.atan2(R,f*S);g=Math.sin(g*b)/R,a=Math.sin(a*b)/R}let v=a*S;if(c=c*g+u*v,l=l*g+p*v,h=h*g+m*v,d=d*g+x*v,g===1-a){let R=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=R,l*=R,h*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+h*d+c*p-l*u,e[t+1]=c*m+h*u+l*d-a*p,e[t+2]=l*m+h*p+a*u-c*d,e[t+3]=h*m-a*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),p=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*p*m,this._y=l*p*d-u*h*m,this._z=l*h*m+u*p*d,this._w=l*h*d-u*p*m;break;case"YXZ":this._x=u*h*d+l*p*m,this._y=l*p*d-u*h*m,this._z=l*h*m-u*p*d,this._w=l*h*d+u*p*m;break;case"ZXY":this._x=u*h*d-l*p*m,this._y=l*p*d+u*h*m,this._z=l*h*m+u*p*d,this._w=l*h*d-u*p*m;break;case"ZYX":this._x=u*h*d-l*p*m,this._y=l*p*d+u*h*m,this._z=l*h*m-u*p*d,this._w=l*h*d+u*p*m;break;case"YZX":this._x=u*h*d+l*p*m,this._y=l*p*d+u*h*m,this._z=l*h*m-u*p*d,this._w=l*h*d-u*p*m;break;case"XZY":this._x=u*h*d-l*p*m,this._y=l*p*d-u*h*m,this._z=l*h*m+u*p*d,this._w=l*h*d+u*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _l.copy(this).projectOnVector(e),this.sub(_l)}reflect(e){return this.sub(_l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_l=new U,dh=new dn,Ge=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],m=n[8],x=s[0],g=s[3],f=s[6],S=s[1],E=s[4],v=s[7],R=s[2],b=s[5],A=s[8];return r[0]=o*x+a*S+c*R,r[3]=o*g+a*E+c*b,r[6]=o*f+a*v+c*A,r[1]=l*x+h*S+d*R,r[4]=l*g+h*E+d*b,r[7]=l*f+h*v+d*A,r[2]=u*x+p*S+m*R,r[5]=u*g+p*E+m*b,r[8]=u*f+p*v+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,u=a*c-h*r,p=l*r-o*c,m=t*d+n*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=d*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=u*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(vl.makeScale(e,t)),this}rotate(e){return this.premultiply(vl.makeRotation(-e)),this}translate(e,t){return this.premultiply(vl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vl=new Ge;function mc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wu(){let i=Qs("canvas");return i.style.display="block",i}var fh={};function us(i){i in fh||(fh[i]=!0,console.warn(i))}function Au(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var ph=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mh=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $d(){let i={enabled:!0,workingColorSpace:Ri,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=Xn(s.r),s.g=Xn(s.g),s.b=Xn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?Js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return us("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return us("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ri]:{primaries:e,whitePoint:n,transfer:Js,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ht},outputColorSpaceConfig:{drawingBufferColorSpace:ht}},[ht]:{primaries:e,whitePoint:n,transfer:it,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ht}}}),i}var Qe=$d();function Xn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Xi,Ao=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xi===void 0&&(Xi=Qs("canvas")),Xi.width=e.width,Xi.height=e.height;let s=Xi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Xn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Zd=0,ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Wn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yl(s[o].image)):r.push(yl(s[o]))}else r=yl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function yl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ao.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Jd=0,Ml=new U,Gt=class i extends $n{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ai,s=ai,r=Mn,o=pi,a=pn,c=Sn,l=i.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Wn(),this.name="",this.source=new ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ml).x}get height(){return this.source.getSize(Ml).y}get depth(){return this.source.getSize(Ml).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ai:e.x=e.x-Math.floor(e.x);break;case ai:e.x=e.x<0?0:1;break;case So:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ai:e.y=e.y-Math.floor(e.y);break;case ai:e.y=e.y<0?0:1;break;case So:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=sc;Gt.DEFAULT_ANISOTROPY=1;var mt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],m=c[9],x=c[2],g=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,v=(p+1)/2,R=(f+1)/2,b=(h+u)/4,A=(d+x)/4,I=(m+g)/4;return E>v&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=b/n,r=A/n):v>R?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=I/r),this.set(n,s,r,t),this}let S=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-x)/S,this.z=(u-h)/S,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ro=class extends $n{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Gt(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ds(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends Ro{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},js=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$r.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$r.copy(n.boundingBox)),$r.applyMatrix4(e.matrixWorld),this.union($r)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Os),Zr.subVectors(this.max,Os),qi.subVectors(e.a,Os),Yi.subVectors(e.b,Os),$i.subVectors(e.c,Os),ti.subVectors(Yi,qi),ni.subVectors($i,Yi),Mi.subVectors(qi,$i);let t=[0,-ti.z,ti.y,0,-ni.z,ni.y,0,-Mi.z,Mi.y,ti.z,0,-ti.x,ni.z,0,-ni.x,Mi.z,0,-Mi.x,-ti.y,ti.x,0,-ni.y,ni.x,0,-Mi.y,Mi.x,0];return!bl(t,qi,Yi,$i,Zr)||(t=[1,0,0,0,1,0,0,0,1],!bl(t,qi,Yi,$i,Zr))?!1:(Jr.crossVectors(ti,ni),t=[Jr.x,Jr.y,Jr.z],bl(t,qi,Yi,$i,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Bn=[new U,new U,new U,new U,new U,new U,new U,new U],xn=new U,$r=new Pn,qi=new U,Yi=new U,$i=new U,ti=new U,ni=new U,Mi=new U,Os=new U,Zr=new U,Jr=new U,bi=new U;function bl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bi.fromArray(i,r);let a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),c=e.dot(bi),l=t.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Kd=new Pn,Bs=new U,Sl=new U,ci=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Kd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);let t=Bs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(Sl)),this.expandByPoint(Bs.copy(e.center).sub(Sl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},zn=new U,El=new U,Kr=new U,ii=new U,Tl=new U,Qr=new U,wl=new U,Io=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){El.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),ii.copy(this.origin).sub(El);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Kr),a=ii.dot(this.direction),c=-ii.dot(Kr),l=ii.lengthSq(),h=Math.abs(1-o*o),d,u,p,m;if(h>0)if(d=o*c-a,u=o*a-c,m=r*h,d>=0)if(u>=-m)if(u<=m){let x=1/h;d*=x,u*=x,p=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(El).addScaledVector(Kr,u),p}intersectSphere(e,t){zn.subVectors(e.center,this.origin);let n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,s,r){Tl.subVectors(t,e),Qr.subVectors(n,e),wl.crossVectors(Tl,Qr);let o=this.direction.dot(wl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,e);let c=a*this.direction.dot(Qr.crossVectors(ii,Qr));if(c<0)return null;let l=a*this.direction.dot(Tl.cross(ii));if(l<0||c+l>o)return null;let h=-a*ii.dot(wl);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},et=class i{constructor(e,t,n,s,r,o,a,c,l,h,d,u,p,m,x,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,d,u,p,m,x,g)}set(e,t,n,s,r,o,a,c,l,h,d,u,p,m,x,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=m,f[11]=x,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Zi.setFromMatrixColumn(e,0).length(),r=1/Zi.setFromMatrixColumn(e,1).length(),o=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,p=o*d,m=a*h,x=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+m*l,t[5]=u-x*l,t[9]=-a*c,t[2]=x-u*l,t[6]=m+p*l,t[10]=o*c}else if(e.order==="YXZ"){let u=c*h,p=c*d,m=l*h,x=l*d;t[0]=u+x*a,t[4]=m*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=x+u*a,t[10]=o*c}else if(e.order==="ZXY"){let u=c*h,p=c*d,m=l*h,x=l*d;t[0]=u-x*a,t[4]=-o*d,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let u=o*h,p=o*d,m=a*h,x=a*d;t[0]=c*h,t[4]=m*l-p,t[8]=u*l+x,t[1]=c*d,t[5]=x*l+u,t[9]=p*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=x-u*d,t[8]=m*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*d+m,t[10]=u-x*d}else if(e.order==="XZY"){let u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+x,t[5]=o*h,t[9]=p*d-m,t[2]=m*d-p,t[6]=a*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qd,e,jd)}lookAt(e,t,n){let s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),si.crossVectors(n,nn),si.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),si.crossVectors(n,nn)),si.normalize(),jr.crossVectors(nn,si),s[0]=si.x,s[4]=jr.x,s[8]=nn.x,s[1]=si.y,s[5]=jr.y,s[9]=nn.y,s[2]=si.z,s[6]=jr.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],m=n[2],x=n[6],g=n[10],f=n[14],S=n[3],E=n[7],v=n[11],R=n[15],b=s[0],A=s[4],I=s[8],y=s[12],M=s[1],C=s[5],L=s[9],z=s[13],Y=s[2],q=s[6],Z=s[10],se=s[14],W=s[3],oe=s[7],ue=s[11],pe=s[15];return r[0]=o*b+a*M+c*Y+l*W,r[4]=o*A+a*C+c*q+l*oe,r[8]=o*I+a*L+c*Z+l*ue,r[12]=o*y+a*z+c*se+l*pe,r[1]=h*b+d*M+u*Y+p*W,r[5]=h*A+d*C+u*q+p*oe,r[9]=h*I+d*L+u*Z+p*ue,r[13]=h*y+d*z+u*se+p*pe,r[2]=m*b+x*M+g*Y+f*W,r[6]=m*A+x*C+g*q+f*oe,r[10]=m*I+x*L+g*Z+f*ue,r[14]=m*y+x*z+g*se+f*pe,r[3]=S*b+E*M+v*Y+R*W,r[7]=S*A+E*C+v*q+R*oe,r[11]=S*I+E*L+v*Z+R*ue,r[15]=S*y+E*z+v*se+R*pe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],m=e[3],x=e[7],g=e[11],f=e[15];return m*(+r*c*d-s*l*d-r*a*u+n*l*u+s*a*p-n*c*p)+x*(+t*c*p-t*l*u+r*o*u-s*o*p+s*l*h-r*c*h)+g*(+t*l*d-t*a*p-r*o*d+n*o*p+r*a*h-n*l*h)+f*(-s*a*h-t*c*d+t*a*u+s*o*d-n*o*u+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],m=e[12],x=e[13],g=e[14],f=e[15],S=d*g*l-x*u*l+x*c*p-a*g*p-d*c*f+a*u*f,E=m*u*l-h*g*l-m*c*p+o*g*p+h*c*f-o*u*f,v=h*x*l-m*d*l+m*a*p-o*x*p-h*a*f+o*d*f,R=m*d*c-h*x*c-m*a*u+o*x*u+h*a*g-o*d*g,b=t*S+n*E+s*v+r*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/b;return e[0]=S*A,e[1]=(x*u*r-d*g*r-x*s*p+n*g*p+d*s*f-n*u*f)*A,e[2]=(a*g*r-x*c*r+x*s*l-n*g*l-a*s*f+n*c*f)*A,e[3]=(d*c*r-a*u*r-d*s*l+n*u*l+a*s*p-n*c*p)*A,e[4]=E*A,e[5]=(h*g*r-m*u*r+m*s*p-t*g*p-h*s*f+t*u*f)*A,e[6]=(m*c*r-o*g*r-m*s*l+t*g*l+o*s*f-t*c*f)*A,e[7]=(o*u*r-h*c*r+h*s*l-t*u*l-o*s*p+t*c*p)*A,e[8]=v*A,e[9]=(m*d*r-h*x*r-m*n*p+t*x*p+h*n*f-t*d*f)*A,e[10]=(o*x*r-m*a*r+m*n*l-t*x*l-o*n*f+t*a*f)*A,e[11]=(h*a*r-o*d*r-h*n*l+t*d*l+o*n*p-t*a*p)*A,e[12]=R*A,e[13]=(h*x*s-m*d*s+m*n*u-t*x*u-h*n*g+t*d*g)*A,e[14]=(m*a*s-o*x*s-m*n*c+t*x*c+o*n*g-t*a*g)*A,e[15]=(o*d*s-h*a*s+h*n*c-t*d*c-o*n*u+t*a*u)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,d=a+a,u=r*l,p=r*h,m=r*d,x=o*h,g=o*d,f=a*d,S=c*l,E=c*h,v=c*d,R=n.x,b=n.y,A=n.z;return s[0]=(1-(x+f))*R,s[1]=(p+v)*R,s[2]=(m-E)*R,s[3]=0,s[4]=(p-v)*b,s[5]=(1-(u+f))*b,s[6]=(g+S)*b,s[7]=0,s[8]=(m+E)*A,s[9]=(g-S)*A,s[10]=(1-(u+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Zi.set(s[0],s[1],s[2]).length(),o=Zi.set(s[4],s[5],s[6]).length(),a=Zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);let l=1/r,h=1/o,d=1/a;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=d,_n.elements[9]*=d,_n.elements[10]*=d,t.setFromRotationMatrix(_n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=yn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s),m,x;if(c)m=r/(o-r),x=o*r/(o-r);else if(a===yn)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Ks)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=yn,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s),m,x;if(c)m=1/(o-r),x=o/(o-r);else if(a===yn)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===Ks)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Zi=new U,_n=new et,Qd=new U(0,0,0),jd=new U(1,1,1),si=new U,jr=new U,nn=new U,gh=new et,xh=new dn,bn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xh.setFromEuler(this),this.setFromQuaternion(xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var er=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ef=0,_h=new U,Ji=new dn,kn=new et,eo=new U,zs=new U,tf=new U,nf=new dn,vh=new U(1,0,0),yh=new U(0,1,0),Mh=new U(0,0,1),bh={type:"added"},sf={type:"removed"},Ki={type:"childadded",child:null},Al={type:"childremoved",child:null},It=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new bn,n=new dn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new Ge}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(vh,e)}rotateY(e){return this.rotateOnAxis(yh,e)}rotateZ(e){return this.rotateOnAxis(Mh,e)}translateOnAxis(e,t){return _h.copy(e).applyQuaternion(this.quaternion),this.position.add(_h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vh,e)}translateY(e){return this.translateOnAxis(yh,e)}translateZ(e){return this.translateOnAxis(Mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?eo.copy(e):eo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(zs,eo,this.up):kn.lookAt(eo,zs,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),Ji.setFromRotationMatrix(kn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bh),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sf),Al.child=e,this.dispatchEvent(Al),Al.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bh),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,e,tf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,nf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};It.DEFAULT_UP=new U(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new U,Hn=new U,Rl=new U,Vn=new U,Qi=new U,ji=new U,Sh=new U,Cl=new U,Il=new U,Pl=new U,Ll=new mt,Dl=new mt,Ul=new mt,Gn=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),Hn.subVectors(n,t),Rl.subVectors(e,t);let o=vn.dot(vn),a=vn.dot(Hn),c=vn.dot(Rl),l=Hn.dot(Hn),h=Hn.dot(Rl),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(o,Vn.y),c.addScaledVector(a,Vn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ll.setScalar(0),Dl.setScalar(0),Ul.setScalar(0),Ll.fromBufferAttribute(e,t),Dl.fromBufferAttribute(e,n),Ul.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ll,r.x),o.addScaledVector(Dl,r.y),o.addScaledVector(Ul,r.z),o}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),Hn.subVectors(e,t),vn.cross(Hn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),vn.cross(Hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Qi.subVectors(s,n),ji.subVectors(r,n),Cl.subVectors(e,n);let c=Qi.dot(Cl),l=ji.dot(Cl);if(c<=0&&l<=0)return t.copy(n);Il.subVectors(e,s);let h=Qi.dot(Il),d=ji.dot(Il);if(h>=0&&d<=h)return t.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Qi,o);Pl.subVectors(e,r);let p=Qi.dot(Pl),m=ji.dot(Pl);if(m>=0&&p<=m)return t.copy(r);let x=p*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(ji,a);let g=h*m-p*d;if(g<=0&&d-h>=0&&p-m>=0)return Sh.subVectors(r,s),a=(d-h)/(d-h+(p-m)),t.copy(s).addScaledVector(Sh,a);let f=1/(g+x+u);return o=x*f,a=u*f,t.copy(n).addScaledVector(Qi,o).addScaledVector(ji,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},to={h:0,s:0,l:0};function Fl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var He=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=Yd(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Fl(o,r,e+1/3),this.g=Fl(o,r,e),this.b=Fl(o,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){let n=Ru[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return Qe.workingToColorSpace(Ut.copy(this),e),Math.round($e(Ut.r*255,0,255))*65536+Math.round($e(Ut.g*255,0,255))*256+Math.round($e(Ut.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Ut.copy(this),t);let n=Ut.r,s=Ut.g,r=Ut.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=ht){Qe.workingToColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,s=Ut.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(to);let n=xl(ri.h,to.h,t),s=xl(ri.s,to.s,t),r=xl(ri.l,to.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new He;He.NAMES=Ru;var rf=0,Zn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Wn(),this.name="",this.type="Material",this.blending=Yn,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mo,this.blendDst=bo,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yn&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ft=class extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=la,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Mt=new U,no=new xe,of=0,Vt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=To,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix3(e),this.setXY(t,no.x,no.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==To&&(e.usage=this.usage),e}};var tr=class extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var nr=class extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ze=class extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}},af=0,un=new et,Nl=new It,es=new U,sn=new Pn,ks=new Pn,wt=new U,yt=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mc(e)?nr:tr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return Nl.lookAt(e),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ze(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(sn.min,ks.min),sn.expandByPoint(wt),wt.addVectors(sn.max,ks.max),sn.expandByPoint(wt)):(sn.expandByPoint(ks.min),sn.expandByPoint(ks.max))}sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)wt.fromBufferAttribute(a,l),c&&(es.fromBufferAttribute(e,l),wt.add(es)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new U,c[I]=new U;let l=new U,h=new U,d=new U,u=new xe,p=new xe,m=new xe,x=new U,g=new U;function f(I,y,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,I),p.fromBufferAttribute(r,y),m.fromBufferAttribute(r,M),h.sub(l),d.sub(l),p.sub(u),m.sub(u);let C=1/(p.x*m.y-m.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(C),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(C),a[I].add(x),a[y].add(x),a[M].add(x),c[I].add(g),c[y].add(g),c[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let I=0,y=S.length;I<y;++I){let M=S[I],C=M.start,L=M.count;for(let z=C,Y=C+L;z<Y;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let E=new U,v=new U,R=new U,b=new U;function A(I){R.fromBufferAttribute(s,I),b.copy(R);let y=a[I];E.copy(y),E.sub(R.multiplyScalar(R.dot(y))).normalize(),v.crossVectors(b,y);let C=v.dot(c[I])<0?-1:1;o.setXYZW(I,E.x,E.y,E.z,C)}for(let I=0,y=S.length;I<y;++I){let M=S[I],C=M.start,L=M.count;for(let z=C,Y=C+L;z<Y;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,d=new U;if(e)for(let u=0,p=e.count;u<p;u+=3){let m=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),p=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let f=0;f<h;f++)u[m++]=l[p++]}return new Vt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Eh=new et,Si=new Io,io=new ci,Th=new U,so=new U,ro=new U,oo=new U,Ol=new U,ao=new U,wh=new U,lo=new U,Ke=class extends It{constructor(e=new yt,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ao.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Ol.fromBufferAttribute(d,e),o?ao.addScaledVector(Ol,h):ao.addScaledVector(Ol.sub(t),h))}t.add(ao)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),Si.copy(e.ray).recast(e.near),!(io.containsPoint(Si.origin)===!1&&(Si.intersectSphere(io,Th)===null||Si.origin.distanceToSquared(Th)>(e.far-e.near)**2))&&(Eh.copy(r).invert(),Si.copy(e.ray).applyMatrix4(Eh),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Si)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){let g=u[m],f=o[g.materialIndex],S=Math.max(g.start,p.start),E=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let v=S,R=E;v<R;v+=3){let b=a.getX(v),A=a.getX(v+1),I=a.getX(v+2);s=co(this,f,e,n,l,h,d,b,A,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=m,f=x;g<f;g+=3){let S=a.getX(g),E=a.getX(g+1),v=a.getX(g+2);s=co(this,o,e,n,l,h,d,S,E,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){let g=u[m],f=o[g.materialIndex],S=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let v=S,R=E;v<R;v+=3){let b=v,A=v+1,I=v+2;s=co(this,f,e,n,l,h,d,b,A,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=m,f=x;g<f;g+=3){let S=g,E=g+1,v=g+2;s=co(this,o,e,n,l,h,d,S,E,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function lf(i,e,t,n,s,r,o,a){let c;if(e.side===qt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===qn,a),c===null)return null;lo.copy(a),lo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(lo);return l<t.near||l>t.far?null:{distance:l,point:lo.clone(),object:i}}function co(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,so),i.getVertexPosition(c,ro),i.getVertexPosition(l,oo);let h=lf(i,e,t,n,so,ro,oo,wh);if(h){let d=new U;Gn.getBarycoord(wh,so,ro,oo,d),s&&(h.uv=Gn.getInterpolatedAttribute(s,a,c,l,d,new xe)),r&&(h.uv1=Gn.getInterpolatedAttribute(r,a,c,l,d,new xe)),o&&(h.normal=Gn.getInterpolatedAttribute(o,a,c,l,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new U,materialIndex:0};Gn.getNormal(so,ro,oo,u.normal),h.face=u,h.barycoord=d}return h}var Wt=class i extends yt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,p=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(d,2));function m(x,g,f,S,E,v,R,b,A,I,y){let M=v/A,C=R/I,L=v/2,z=R/2,Y=b/2,q=A+1,Z=I+1,se=0,W=0,oe=new U;for(let ue=0;ue<Z;ue++){let pe=ue*C-z;for(let Ie=0;Ie<q;Ie++){let ze=Ie*M-L;oe[x]=ze*S,oe[g]=pe*E,oe[f]=Y,l.push(oe.x,oe.y,oe.z),oe[x]=0,oe[g]=0,oe[f]=b>0?1:-1,h.push(oe.x,oe.y,oe.z),d.push(Ie/A),d.push(1-ue/I),se+=1}}for(let ue=0;ue<I;ue++)for(let pe=0;pe<A;pe++){let Ie=u+pe+q*ue,ze=u+pe+q*(ue+1),We=u+(pe+1)+q*(ue+1),ye=u+(pe+1)+q*ue;c.push(Ie,ze,ye),c.push(ze,We,ye),W+=6}a.addGroup(p,W,y),p+=W,u+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Di(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ot(i){let e={};for(let t=0;t<i.length;t++){let n=Di(i[t]);for(let s in n)e[s]=n[s]}return e}function cf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}var Cu={clone:Di,merge:Ot},hf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rt=class extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hf,this.fragmentShader=uf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=cf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ir=class extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},oi=new U,Ah=new xe,Rh=new xe,Ct=class extends ir{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(gl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wo*2*Math.atan(Math.tan(gl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,Ah,Rh),t.subVectors(Rh,Ah)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gl*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ts=-90,ns=1,Po=class extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ct(ts,ns,e,t);s.layers=this.layers,this.add(s);let r=new Ct(ts,ns,e,t);r.layers=this.layers,this.add(r);let o=new Ct(ts,ns,e,t);o.layers=this.layers,this.add(o);let a=new Ct(ts,ns,e,t);a.layers=this.layers,this.add(a);let c=new Ct(ts,ns,e,t);c.layers=this.layers,this.add(c);let l=new Ct(ts,ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},sr=class extends Gt{constructor(e=[],t=Pi,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Lo=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new sr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Wt(5,5,5),r=new Rt({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Kn});r.uniforms.tEquirect.value=t;let o=new Ke(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=Mn),new Po(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},At=class extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}},df={type:"move"},fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),f=this._getHandJoint(l,x);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,m=.005;l.inputState.pinching&&u>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(df)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var rr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},or=class extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Do=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=To,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ht=new U,ar=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ps=class extends Zn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},is,Hs=new U,ss=new U,rs=new U,os=new xe,Vs=new xe,Iu=new et,ho=new U,Gs=new U,uo=new U,Ch=new xe,Bl=new xe,Ih=new xe,lr=class extends It{constructor(e=new ps){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new yt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Do(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new ar(n,3,0,!1)),is.setAttribute("uv",new ar(n,2,3,!1))}this.geometry=is,this.material=e,this.center=new xe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),Iu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;fo(ho.set(-.5,-.5,0),rs,o,ss,s,r),fo(Gs.set(.5,-.5,0),rs,o,ss,s,r),fo(uo.set(.5,.5,0),rs,o,ss,s,r),Ch.set(0,0),Bl.set(1,0),Ih.set(1,1);let a=e.ray.intersectTriangle(ho,Gs,uo,!1,Hs);if(a===null&&(fo(Gs.set(-.5,.5,0),rs,o,ss,s,r),Bl.set(0,1),a=e.ray.intersectTriangle(ho,uo,Gs,!1,Hs),a===null))return;let c=e.ray.origin.distanceTo(Hs);c<e.near||c>e.far||t.push({distance:c,point:Hs.clone(),uv:Gn.getInterpolation(Hs,ho,Gs,uo,Ch,Bl,Ih,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function fo(i,e,t,n,s,r){os.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Vs.x=r*os.x-s*os.y,Vs.y=s*os.x+r*os.y):Vs.copy(os),i.copy(e),i.x+=Vs.x,i.y+=Vs.y,i.applyMatrix4(Iu)}var Uo=class extends Gt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Jt,h=Jt,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Jn=class extends Vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},as=new et,Ph=new et,po=[],Lh=new Pn,ff=new et,Ws=new Ke,Xs=new ci,fn=class extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ff)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),Lh.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(Lh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),Xs.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xs.copy(this.boundingSphere),Xs.applyMatrix4(n),e.ray.intersectsSphere(Xs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),Ph.multiplyMatrices(n,as),Ws.matrixWorld=Ph,Ws.raycast(e,po);for(let o=0,a=po.length;o<a;o++){let c=po[o];c.instanceId=r,c.object=this,t.push(c)}po.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Uo(new Float32Array(s*this.count),s,this.count,ma,En));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},zl=new U,pf=new U,mf=new Ge,Rn=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=zl.subVectors(n,t).cross(pf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(zl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||mf.getNormalMatrix(e),s=this.coplanarPoint(zl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ei=new ci,gf=new xe(.5,.5),mo=new U,ms=class{constructor(e=new Rn,t=new Rn,n=new Rn,s=new Rn,r=new Rn,o=new Rn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],m=r[8],x=r[9],g=r[10],f=r[11],S=r[12],E=r[13],v=r[14],R=r[15];if(s[0].setComponents(l-o,p-h,f-m,R-S).normalize(),s[1].setComponents(l+o,p+h,f+m,R+S).normalize(),s[2].setComponents(l+a,p+d,f+x,R+E).normalize(),s[3].setComponents(l-a,p-d,f-x,R-E).normalize(),n)s[4].setComponents(c,u,g,v).normalize(),s[5].setComponents(l-c,p-u,f-g,R-v).normalize();else if(s[4].setComponents(l-c,p-u,f-g,R-v).normalize(),t===yn)s[5].setComponents(l+c,p+u,f+g,R+v).normalize();else if(t===Ks)s[5].setComponents(c,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){Ei.center.set(0,0,0);let t=gf.distanceTo(e.center);return Ei.radius=.7071067811865476+t,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(mo.x=s.normal.x>0?e.max.x:e.min.x,mo.y=s.normal.y>0?e.max.y:e.min.y,mo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(mo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var cr=class extends Gt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},hr=class extends Gt{constructor(e,t,n=mi,s,r,o,a=Jt,c=Jt,l,h=hs,d=1){if(h!==hs&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ur=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},dr=class i extends yt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,d=Math.PI/2*e,u=t,p=2*d+u,m=n*2+r,x=s+1,g=new U,f=new U;for(let S=0;S<=m;S++){let E=0,v=0,R=0,b=0;if(S<=n){let y=S/n,M=y*Math.PI/2;v=-h-e*Math.cos(M),R=e*Math.sin(M),b=-e*Math.cos(M),E=y*d}else if(S<=n+r){let y=(S-n)/r;v=-h+y*t,R=e,b=0,E=d+y*u}else{let y=(S-n-r)/n,M=y*Math.PI/2;v=h+e*Math.sin(M),R=e*Math.cos(M),b=e*Math.sin(M),E=d+u+y*d}let A=Math.max(0,Math.min(1,E/p)),I=0;S===0?I=.5/s:S===m&&(I=-.5/s);for(let y=0;y<=s;y++){let M=y/s,C=M*Math.PI*2,L=Math.sin(C),z=Math.cos(C);f.x=-R*z,f.y=v,f.z=R*L,a.push(f.x,f.y,f.z),g.set(-R*z,b,R*L),g.normalize(),c.push(g.x,g.y,g.z),l.push(M+I,A)}if(S>0){let y=(S-1)*x;for(let M=0;M<s;M++){let C=y+M,L=y+M+1,z=S*x+M,Y=S*x+M+1;o.push(C,L,z),o.push(L,Y,z)}}}this.setIndex(o),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var Xt=class i extends yt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],m=0,x=[],g=n/2,f=0;S(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(p,2));function S(){let v=new U,R=new U,b=0,A=(t-e)/n;for(let I=0;I<=r;I++){let y=[],M=I/r,C=M*(t-e)+e;for(let L=0;L<=s;L++){let z=L/s,Y=z*c+a,q=Math.sin(Y),Z=Math.cos(Y);R.x=C*q,R.y=-M*n+g,R.z=C*Z,d.push(R.x,R.y,R.z),v.set(q,A,Z).normalize(),u.push(v.x,v.y,v.z),p.push(z,1-M),y.push(m++)}x.push(y)}for(let I=0;I<s;I++)for(let y=0;y<r;y++){let M=x[y][I],C=x[y+1][I],L=x[y+1][I+1],z=x[y][I+1];(e>0||y!==0)&&(h.push(M,C,z),b+=3),(t>0||y!==r-1)&&(h.push(C,L,z),b+=3)}l.addGroup(f,b,0),f+=b}function E(v){let R=m,b=new xe,A=new U,I=0,y=v===!0?e:t,M=v===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,g*M,0),u.push(0,M,0),p.push(.5,.5),m++;let C=m;for(let L=0;L<=s;L++){let Y=L/s*c+a,q=Math.cos(Y),Z=Math.sin(Y);A.x=y*Z,A.y=g*M,A.z=y*q,d.push(A.x,A.y,A.z),u.push(0,M,0),b.x=q*.5+.5,b.y=Z*.5*M+.5,p.push(b.x,b.y),m++}for(let L=0;L<s;L++){let z=R+L,Y=C+L;v===!0?h.push(Y,Y+1,z):h.push(Y+1,Y,z),I+=3}l.addGroup(f,I,v===!0?1:2),f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ln=class i extends Xt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Fo=class i extends yt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let E=new U,v=new U,R=new U;for(let b=0;b<t.length;b+=3)p(t[b+0],E),p(t[b+1],v),p(t[b+2],R),c(E,v,R,S)}function c(S,E,v,R){let b=R+1,A=[];for(let I=0;I<=b;I++){A[I]=[];let y=S.clone().lerp(v,I/b),M=E.clone().lerp(v,I/b),C=b-I;for(let L=0;L<=C;L++)L===0&&I===b?A[I][L]=y:A[I][L]=y.clone().lerp(M,L/C)}for(let I=0;I<b;I++)for(let y=0;y<2*(b-I)-1;y++){let M=Math.floor(y/2);y%2===0?(u(A[I][M+1]),u(A[I+1][M]),u(A[I][M])):(u(A[I][M+1]),u(A[I+1][M+1]),u(A[I+1][M]))}}function l(S){let E=new U;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(S),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function h(){let S=new U;for(let E=0;E<r.length;E+=3){S.x=r[E+0],S.y=r[E+1],S.z=r[E+2];let v=g(S)/2/Math.PI+.5,R=f(S)/Math.PI+.5;o.push(v,1-R)}m(),d()}function d(){for(let S=0;S<o.length;S+=6){let E=o[S+0],v=o[S+2],R=o[S+4],b=Math.max(E,v,R),A=Math.min(E,v,R);b>.9&&A<.1&&(E<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),R<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function p(S,E){let v=S*3;E.x=e[v+0],E.y=e[v+1],E.z=e[v+2]}function m(){let S=new U,E=new U,v=new U,R=new U,b=new xe,A=new xe,I=new xe;for(let y=0,M=0;y<r.length;y+=9,M+=6){S.set(r[y+0],r[y+1],r[y+2]),E.set(r[y+3],r[y+4],r[y+5]),v.set(r[y+6],r[y+7],r[y+8]),b.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),R.copy(S).add(E).add(v).divideScalar(3);let C=g(R);x(b,M+0,S,C),x(A,M+2,E,C),x(I,M+4,v,C)}}function x(S,E,v,R){R<0&&S.x===1&&(o[E]=S.x-1),v.x===0&&v.z===0&&(o[E]=R/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new xe:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,s=[],r=[],o=[],a=new U,c=new et;for(let p=0;p<=e;p++){let m=p/e;s[p]=this.getTangentAt(m,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos($e(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,m))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos($e(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],p*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},gs=class extends rn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new xe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*h-p*d+this.aX,l=u*d+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},No=class extends gs{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function xc(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,p*=h,s(o,a,u,p)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var go=new U,kl=new xc,Hl=new xc,Vl=new xc,Oo=class extends rn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(go.subVectors(s[0],s[1]).add(s[0]),l=go);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(go.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=go),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),kl.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,m,x,g),Hl.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,m,x,g),Vl.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(kl.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Hl.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Vl.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(kl.calc(c),Hl.calc(c),Vl.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Dh(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function xf(i,e){let t=1-i;return t*t*e}function _f(i,e){return 2*(1-i)*i*e}function vf(i,e){return i*i*e}function Ys(i,e,t,n){return xf(i,e)+_f(i,t)+vf(i,n)}function yf(i,e){let t=1-i;return t*t*t*e}function Mf(i,e){let t=1-i;return 3*t*t*i*e}function bf(i,e){return 3*(1-i)*i*i*e}function Sf(i,e){return i*i*i*e}function $s(i,e,t,n,s){return yf(i,e)+Mf(i,t)+bf(i,n)+Sf(i,s)}var fr=class extends rn{constructor(e=new xe,t=new xe,n=new xe,s=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new xe){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(e,s.x,r.x,o.x,a.x),$s(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bo=class extends rn{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(e,s.x,r.x,o.x,a.x),$s(e,s.y,r.y,o.y,a.y),$s(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pr=class extends rn{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zo=class extends rn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mr=class extends rn{constructor(e=new xe,t=new xe,n=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new xe){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ys(e,s.x,r.x,o.x),Ys(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ko=class extends rn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ys(e,s.x,r.x,o.x),Ys(e,s.y,r.y,o.y),Ys(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},gr=class extends rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Dh(a,c.x,l.x,h.x,d.x),Dh(a,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new xe().fromArray(s))}return this}},Uh=Object.freeze({__proto__:null,ArcCurve:No,CatmullRomCurve3:Oo,CubicBezierCurve:fr,CubicBezierCurve3:Bo,EllipseCurve:gs,LineCurve:pr,LineCurve3:zo,QuadraticBezierCurve:mr,QuadraticBezierCurve3:ko,SplineCurve:gr}),Ho=class extends rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Uh[s.type]().fromJSON(s))}return this}},xr=class extends Ho{constructor(e){super(),this.type="Path",this.currentPoint=new xe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new pr(this.currentPoint.clone(),new xe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new mr(this.currentPoint.clone(),new xe(e,t),new xe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new fr(this.currentPoint.clone(),new xe(e,t),new xe(n,s),new xe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new gr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new gs(e,t,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},xs=class extends xr{constructor(e){super(e),this.uuid=Wn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new xr().fromJSON(s))}return this}};function Ef(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Pu(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Cf(i,e,r,t)),i.length>80*t){a=1/0,c=1/0;let h=-1/0,d=-1/0;for(let u=t;u<s;u+=t){let p=i[u],m=i[u+1];p<a&&(a=p),m<c&&(c=m),p>h&&(h=p),m>d&&(d=m)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return _r(r,o,t,a,c,l,0),o}function Pu(i,e,t,n,s){let r;if(s===kf(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Fh(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Fh(o/n|0,i[o],i[o+1],r);return r&&_s(r,r.next)&&(yr(r),r=r.next),r}function Ci(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(_s(t,t.next)||pt(t.prev,t,t.next)===0)){if(yr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function _r(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Uf(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?wf(i,n,s,r):Tf(i)){e.push(c.i,i.i,l.i),yr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Af(Ci(i),e),_r(i,e,t,n,s,r,2)):o===2&&Rf(i,e,t,n,s,r):_r(Ci(i),e,t,n,s,r,1);break}}}function Tf(i){let e=i.prev,t=i,n=i.next;if(pt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(s,r,o),d=Math.min(a,c,l),u=Math.max(s,r,o),p=Math.max(a,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=p&&qs(s,a,r,c,o,l,m.x,m.y)&&pt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function wf(i,e,t,n){let s=i.prev,r=i,o=i.next;if(pt(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,d=r.y,u=o.y,p=Math.min(a,c,l),m=Math.min(h,d,u),x=Math.max(a,c,l),g=Math.max(h,d,u),f=$l(p,m,e,t,n),S=$l(x,g,e,t,n),E=i.prevZ,v=i.nextZ;for(;E&&E.z>=f&&v&&v.z<=S;){if(E.x>=p&&E.x<=x&&E.y>=m&&E.y<=g&&E!==s&&E!==o&&qs(a,h,c,d,l,u,E.x,E.y)&&pt(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=p&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&qs(a,h,c,d,l,u,v.x,v.y)&&pt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=f;){if(E.x>=p&&E.x<=x&&E.y>=m&&E.y<=g&&E!==s&&E!==o&&qs(a,h,c,d,l,u,E.x,E.y)&&pt(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=S;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&qs(a,h,c,d,l,u,v.x,v.y)&&pt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Af(i,e){let t=i;do{let n=t.prev,s=t.next.next;!_s(n,s)&&Du(n,t,t.next,s)&&vr(n,s)&&vr(s,n)&&(e.push(n.i,t.i,s.i),yr(t),yr(t.next),t=i=s),t=t.next}while(t!==i);return Ci(t)}function Rf(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Of(o,a)){let c=Uu(o,a);o=Ci(o,o.next),c=Ci(c,c.next),_r(o,e,t,n,s,r,0),_r(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Cf(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Pu(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Nf(l))}s.sort(If);for(let r=0;r<s.length;r++)t=Pf(s[r],t);return t}function If(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Pf(i,e){let t=Lf(i,e);if(!t)return e;let n=Uu(t,i);return Ci(n,n.next),Ci(t,t.next)}function Lf(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(_s(i,t))return t;do{if(_s(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Lu(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);vr(t,i)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&Df(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function Df(i,e){return pt(i.prev,i,e.prev)<0&&pt(e.next,i,i.next)<0}function Uf(i,e,t,n){let s=i;do s.z===0&&(s.z=$l(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ff(s)}function Ff(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function $l(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Nf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Lu(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function qs(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Lu(i,e,t,n,s,r,o,a)}function Of(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Bf(i,e)&&(vr(i,e)&&vr(e,i)&&zf(i,e)&&(pt(i.prev,i,e.prev)||pt(i,e.prev,e))||_s(i,e)&&pt(i.prev,i,i.next)>0&&pt(e.prev,e,e.next)>0)}function pt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function _s(i,e){return i.x===e.x&&i.y===e.y}function Du(i,e,t,n){let s=_o(pt(i,e,t)),r=_o(pt(i,e,n)),o=_o(pt(t,n,i)),a=_o(pt(t,n,e));return!!(s!==r&&o!==a||s===0&&xo(i,t,e)||r===0&&xo(i,n,e)||o===0&&xo(t,i,n)||a===0&&xo(t,e,n))}function xo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function _o(i){return i>0?1:i<0?-1:0}function Bf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Du(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function vr(i,e){return pt(i.prev,i,i.next)<0?pt(i,e,i.next)>=0&&pt(i,i.prev,e)>=0:pt(i,e,i.prev)<0||pt(i,i.next,e)<0}function zf(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Uu(i,e){let t=Zl(i.i,i.x,i.y),n=Zl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Fh(i,e,t,n){let s=Zl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function yr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Zl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kf(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Jl=class{static triangulate(e,t,n=2){return Ef(e,t,n)}},cs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Nh(e),Oh(n,e);let o=e.length;t.forEach(Nh);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Oh(n,t[c]);let a=Jl.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Nh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Oh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Mr=class i extends Fo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Kt=class i extends yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=e/a,u=t/c,p=[],m=[],x=[],g=[];for(let f=0;f<h;f++){let S=f*u-o;for(let E=0;E<l;E++){let v=E*d-r;m.push(v,-S,0),x.push(0,0,1),g.push(E/a),g.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){let E=S+l*f,v=S+l*(f+1),R=S+1+l*(f+1),b=S+1+l*f;p.push(E,v,b),p.push(v,R,b)}this.setIndex(p),this.setAttribute("position",new Ze(m,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},hi=class i extends yt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],d=e,u=(t-e)/s,p=new U,m=new xe;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let f=r+g/n*o;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let x=0;x<s;x++){let g=x*(n+1);for(let f=0;f<n;f++){let S=f+g,E=S,v=S+n+1,R=S+n+2,b=S+1;a.push(E,v,b),a.push(v,R,b)}}this.setIndex(a),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},br=class i extends yt{constructor(e=new xs([new xe(0,.5),new xe(-.5,-.5),new xe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ze(s,3)),this.setAttribute("normal",new Ze(r,3)),this.setAttribute("uv",new Ze(o,2));function l(h){let d=s.length/3,u=h.extractPoints(t),p=u.shape,m=u.holes;cs.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,f=m.length;g<f;g++){let S=m[g];cs.isClockWise(S)===!0&&(m[g]=S.reverse())}let x=cs.triangulateShape(p,m);for(let g=0,f=m.length;g<f;g++){let S=m[g];p=p.concat(S)}for(let g=0,f=p.length;g<f;g++){let S=p[g];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let g=0,f=x.length;g<f;g++){let S=x[g],E=S[0]+d,v=S[1]+d,R=S[2]+d;n.push(E,v,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Hf(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function Hf(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Dn=class i extends yt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new U,u=new U,p=[],m=[],x=[],g=[];for(let f=0;f<=n;f++){let S=[],E=f/n,v=0;f===0&&o===0?v=.5/t:f===n&&c===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let b=R/t;d.x=-e*Math.cos(s+b*r)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(s+b*r)*Math.sin(o+E*a),m.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(b+v,1-E),S.push(l++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<t;S++){let E=h[f][S+1],v=h[f][S],R=h[f+1][S],b=h[f+1][S+1];(f!==0||o>0)&&p.push(E,v,b),(f!==n-1||c<Math.PI)&&p.push(v,R,b)}this.setIndex(p),this.setAttribute("position",new Ze(m,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Sr=class i extends yt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new U,d=new U,u=new U;for(let p=0;p<=n;p++)for(let m=0;m<=s;m++){let x=m/s*r,g=p/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(x),d.y=(e+t*Math.cos(g))*Math.sin(x),d.z=t*Math.sin(g),a.push(d.x,d.y,d.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(m/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=s;m++){let x=(s+1)*p+m-1,g=(s+1)*(p-1)+m-1,f=(s+1)*(p-1)+m,S=(s+1)*p+m;o.push(x,g,S),o.push(g,f,S)}this.setIndex(o),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Nt=class extends Zn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=la,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vo=class extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Go=class extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function vo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Vf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ii=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Wo=class extends Ii{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wl,endingEnd:Wl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xl:r=e,a=2*t-n;break;case ql:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Xl:o=e,c=2*n-t;break;case ql:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(n-t)/(s-t),x=m*m,g=x*m,f=-u*g+2*u*x-u*m,S=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*m+1,E=(-1-p)*g+(1.5+p)*x+.5*m,v=p*g-p*x;for(let R=0;R!==a;++R)r[R]=f*o[h+R]+S*o[l+R]+E*o[c+R]+v*o[d+R];return r}},Xo=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},qo=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},on=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=vo(t,this.TimeBufferType),this.values=vo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:vo(e.times,Array),values:vo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Zs:t=this.InterpolantFactoryMethodDiscrete;break;case Eo:t=this.InterpolantFactoryMethodLinear;break;case yo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Zs;case this.InterpolantFactoryMethodLinear:return Eo;case this.InterpolantFactoryMethodSmooth:return yo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Vf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===yo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let d=a*n,u=d-n,p=d+n;for(let m=0;m!==n;++m){let x=t[d+m];if(x!==t[u+m]||x!==t[p+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let p=0;p!==n;++p)t[u+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};on.prototype.ValueTypeName="";on.prototype.TimeBufferType=Float32Array;on.prototype.ValueBufferType=Float32Array;on.prototype.DefaultInterpolation=Eo;var ui=class extends on{constructor(e,t,n){super(e,t,n)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Zs;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Yo=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};Yo.prototype.ValueTypeName="color";var $o=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};$o.prototype.ValueTypeName="number";var Zo=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)dn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Er=class extends on{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Zo(this.times,this.values,this.getValueSize(),e)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends on{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Zs;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var Jo=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};Jo.prototype.ValueTypeName="vector";var Ko=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let p=l[d],m=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Fu=new Ko,Qo=class{constructor(e){this.manager=e!==void 0?e:Fu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Tr=class extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},wr=class extends Tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Gl=new et,Bh=new U,zh=new U,Kl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ms,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bh),zh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zh),t.updateMatrixWorld(),Gl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ar=class extends ir{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ql=class extends Kl{constructor(){super(new Ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rr=class extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new Ql}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Cr=class extends yt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var jo=class extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var _c="\\[\\]\\.:\\/",Gf=new RegExp("["+_c+"]","g"),vc="[^"+_c+"]",Wf="[^"+_c.replace("\\.","")+"]",Xf=/((?:WC+[\/:])*)/.source.replace("WC",vc),qf=/(WCOD+)?/.source.replace("WCOD",Wf),Yf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vc),$f=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vc),Zf=new RegExp("^"+Xf+qf+Yf+$f+"$"),Jf=["material","materials","bones","map"],jl=class{constructor(e,t,n){let s=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Gf,"")}static parseTrackName(e){let t=Zf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Jf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ct.Composite=jl;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var __=new Float32Array(1);function yc(i,e,t,n){let s=Kf(n);switch(t){case cc:return i*e;case ma:return i*e/s.components*s.byteLength;case ga:return i*e/s.components*s.byteLength;case uc:return i*e*2/s.components*s.byteLength;case xa:return i*e*2/s.components*s.byteLength;case hc:return i*e*3/s.components*s.byteLength;case pn:return i*e*4/s.components*s.byteLength;case _a:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ur:case Fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ya:case ba:return Math.max(i,16)*Math.max(e,8)/4;case va:case Ma:return Math.max(i,8)*Math.max(e,8)/2;case Sa:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ka:case Ha:case Va:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ga:case Wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Xa:case qa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kf(i){switch(i){case Sn:case rc:return{byteLength:1,components:1};case vs:case oc:case ys:return{byteLength:2,components:1};case fa:case pa:return{byteLength:2,components:4};case mi:case da:case En:return{byteLength:4,components:1};case ac:case lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function rd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function jf(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<d.length;p++){let m=d[u],x=d[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,m=d.length;p<m;p++){let x=d[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tp=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,op=`#ifdef USE_AOMAP
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
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
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
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fp=`#ifdef USE_IRIDESCENCE
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
#endif`,pp=`#ifdef USE_BUMPMAP
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Sp=`#define PI 3.141592653589793
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
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tp=`vec3 transformedNormal = objectNormal;
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
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Dp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
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
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hp=`#ifdef USE_GRADIENTMAP
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
}`,Vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xp=`uniform bool receiveShadow;
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
#endif`,qp=`#ifdef USE_ENVMAP
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
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
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
#endif`,Qp=`struct PhysicalMaterial {
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
}`,jp=`
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
#endif`,em=`#if defined( RE_IndirectDiffuse )
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
#endif`,tm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cm=`#if defined( USE_POINTS_UV )
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
#endif`,hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,um=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
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
#endif`,gm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_m=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bm=`#ifdef USE_NORMALMAP
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
#endif`,Sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Am=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Im=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bm=`float getShadowMask() {
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
}`,zm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
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
#endif`,Hm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vm=`#ifdef USE_SKINNING
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
#endif`,Gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ym=`#ifdef USE_TRANSMISSION
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
#endif`,$m=`#ifdef USE_TRANSMISSION
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
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eg=`uniform sampler2D t2D;
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
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rg=`#include <common>
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
}`,og=`#if DEPTH_PACKING == 3200
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
}`,ag=`#define DISTANCE
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
}`,lg=`#define DISTANCE
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
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`uniform float scale;
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
}`,dg=`uniform vec3 diffuse;
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
}`,fg=`#include <common>
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
}`,pg=`uniform vec3 diffuse;
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
}`,mg=`#define LAMBERT
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
}`,gg=`#define LAMBERT
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
}`,xg=`#define MATCAP
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
}`,_g=`#define MATCAP
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
}`,vg=`#define NORMAL
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
}`,yg=`#define NORMAL
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
}`,Mg=`#define PHONG
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
}`,bg=`#define PHONG
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
}`,Sg=`#define STANDARD
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
}`,Eg=`#define STANDARD
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
}`,Tg=`#define TOON
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
}`,wg=`#define TOON
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
}`,Ag=`uniform float size;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Cg=`#include <common>
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
}`,Ig=`uniform vec3 color;
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
}`,Pg=`uniform float rotation;
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
}`,Lg=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:ep,alphahash_pars_fragment:tp,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:sp,alphatest_pars_fragment:rp,aomap_fragment:op,aomap_pars_fragment:ap,batching_pars_vertex:lp,batching_vertex:cp,begin_vertex:hp,beginnormal_vertex:up,bsdfs:dp,iridescence_fragment:fp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:gp,clipping_planes_pars_vertex:xp,clipping_planes_vertex:_p,color_fragment:vp,color_pars_fragment:yp,color_pars_vertex:Mp,color_vertex:bp,common:Sp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:Tp,displacementmap_pars_vertex:wp,displacementmap_vertex:Ap,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Ip,colorspace_pars_fragment:Pp,envmap_fragment:Lp,envmap_common_pars_fragment:Dp,envmap_pars_fragment:Up,envmap_pars_vertex:Fp,envmap_physical_pars_fragment:qp,envmap_vertex:Np,fog_vertex:Op,fog_pars_vertex:Bp,fog_fragment:zp,fog_pars_fragment:kp,gradientmap_pars_fragment:Hp,lightmap_pars_fragment:Vp,lights_lambert_fragment:Gp,lights_lambert_pars_fragment:Wp,lights_pars_begin:Xp,lights_toon_fragment:Yp,lights_toon_pars_fragment:$p,lights_phong_fragment:Zp,lights_phong_pars_fragment:Jp,lights_physical_fragment:Kp,lights_physical_pars_fragment:Qp,lights_fragment_begin:jp,lights_fragment_maps:em,lights_fragment_end:tm,logdepthbuf_fragment:nm,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:sm,logdepthbuf_vertex:rm,map_fragment:om,map_pars_fragment:am,map_particle_fragment:lm,map_particle_pars_fragment:cm,metalnessmap_fragment:hm,metalnessmap_pars_fragment:um,morphinstance_vertex:dm,morphcolor_vertex:fm,morphnormal_vertex:pm,morphtarget_pars_vertex:mm,morphtarget_vertex:gm,normal_fragment_begin:xm,normal_fragment_maps:_m,normal_pars_fragment:vm,normal_pars_vertex:ym,normal_vertex:Mm,normalmap_pars_fragment:bm,clearcoat_normal_fragment_begin:Sm,clearcoat_normal_fragment_maps:Em,clearcoat_pars_fragment:Tm,iridescence_pars_fragment:wm,opaque_fragment:Am,packing:Rm,premultiplied_alpha_fragment:Cm,project_vertex:Im,dithering_fragment:Pm,dithering_pars_fragment:Lm,roughnessmap_fragment:Dm,roughnessmap_pars_fragment:Um,shadowmap_pars_fragment:Fm,shadowmap_pars_vertex:Nm,shadowmap_vertex:Om,shadowmask_pars_fragment:Bm,skinbase_vertex:zm,skinning_pars_vertex:km,skinning_vertex:Hm,skinnormal_vertex:Vm,specularmap_fragment:Gm,specularmap_pars_fragment:Wm,tonemapping_fragment:Xm,tonemapping_pars_fragment:qm,transmission_fragment:Ym,transmission_pars_fragment:$m,uv_pars_fragment:Zm,uv_pars_vertex:Jm,uv_vertex:Km,worldpos_vertex:Qm,background_vert:jm,background_frag:eg,backgroundCube_vert:tg,backgroundCube_frag:ng,cube_vert:ig,cube_frag:sg,depth_vert:rg,depth_frag:og,distanceRGBA_vert:ag,distanceRGBA_frag:lg,equirect_vert:cg,equirect_frag:hg,linedashed_vert:ug,linedashed_frag:dg,meshbasic_vert:fg,meshbasic_frag:pg,meshlambert_vert:mg,meshlambert_frag:gg,meshmatcap_vert:xg,meshmatcap_frag:_g,meshnormal_vert:vg,meshnormal_frag:yg,meshphong_vert:Mg,meshphong_frag:bg,meshphysical_vert:Sg,meshphysical_frag:Eg,meshtoon_vert:Tg,meshtoon_frag:wg,points_vert:Ag,points_frag:Rg,shadow_vert:Cg,shadow_frag:Ig,sprite_vert:Pg,sprite_frag:Lg},_e={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Fn={basic:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ot([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ot([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ot([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new He(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ot([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ot([_e.points,_e.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ot([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ot([_e.common,_e.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ot([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ot([_e.sprite,_e.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Ot([_e.common,_e.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Ot([_e.lights,_e.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Fn.physical={uniforms:Ot([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var $a={r:0,b:0,g:0},Ui=new bn,Dg=new et;function Ug(i,e,t,n,s,r,o){let a=new He(0),c=r===!0?0:1,l,h,d=null,u=0,p=null;function m(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?t:e).get(v)),v}function x(E){let v=!1,R=m(E);R===null?f(a,c):R&&R.isColor&&(f(R,1),v=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(E,v){let R=m(v);R&&(R.isCubeTexture||R.mapping===Ir)?(h===void 0&&(h=new Ke(new Wt(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Di(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ui.copy(v.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(Ui)),h.material.toneMapped=Qe.getTransfer(R.colorSpace)!==it,(d!==R||u!==R.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=R,u=R.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Ke(new Kt(2,2),new Rt({name:"BackgroundMaterial",uniforms:Di(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(R.colorSpace)!==it,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||u!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=R,u=R.version,p=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function f(E,v){E.getRGB($a,gc(i)),n.buffers.color.setClear($a.r,$a.g,$a.b,v,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,f(a,c)},render:x,addToRenderList:g,dispose:S}}function Fg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(M,C,L,z,Y){let q=!1,Z=d(z,L,C);r!==Z&&(r=Z,l(r.object)),q=p(M,z,L,Y),q&&m(M,z,L,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(M,C,L,z),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,C,L){let z=L.wireframe===!0,Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let q=Y[C.id];q===void 0&&(q={},Y[C.id]=q);let Z=q[z];return Z===void 0&&(Z=u(c()),q[z]=Z),Z}function u(M){let C=[],L=[],z=[];for(let Y=0;Y<t;Y++)C[Y]=0,L[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:z,object:M,attributes:{},index:null}}function p(M,C,L,z){let Y=r.attributes,q=C.attributes,Z=0,se=L.getAttributes();for(let W in se)if(se[W].location>=0){let ue=Y[W],pe=q[W];if(pe===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor)),ue===void 0||ue.attribute!==pe||pe&&ue.data!==pe.data)return!0;Z++}return r.attributesNum!==Z||r.index!==z}function m(M,C,L,z){let Y={},q=C.attributes,Z=0,se=L.getAttributes();for(let W in se)if(se[W].location>=0){let ue=q[W];ue===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor));let pe={};pe.attribute=ue,ue&&ue.data&&(pe.data=ue.data),Y[W]=pe,Z++}r.attributes=Y,r.attributesNum=Z,r.index=z}function x(){let M=r.newAttributes;for(let C=0,L=M.length;C<L;C++)M[C]=0}function g(M){f(M,0)}function f(M,C){let L=r.newAttributes,z=r.enabledAttributes,Y=r.attributeDivisors;L[M]=1,z[M]===0&&(i.enableVertexAttribArray(M),z[M]=1),Y[M]!==C&&(i.vertexAttribDivisor(M,C),Y[M]=C)}function S(){let M=r.newAttributes,C=r.enabledAttributes;for(let L=0,z=C.length;L<z;L++)C[L]!==M[L]&&(i.disableVertexAttribArray(L),C[L]=0)}function E(M,C,L,z,Y,q,Z){Z===!0?i.vertexAttribIPointer(M,C,L,Y,q):i.vertexAttribPointer(M,C,L,z,Y,q)}function v(M,C,L,z){x();let Y=z.attributes,q=L.getAttributes(),Z=C.defaultAttributeValues;for(let se in q){let W=q[se];if(W.location>=0){let oe=Y[se];if(oe===void 0&&(se==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),se==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),oe!==void 0){let ue=oe.normalized,pe=oe.itemSize,Ie=e.get(oe);if(Ie===void 0)continue;let ze=Ie.buffer,We=Ie.type,ye=Ie.bytesPerElement,j=We===i.INT||We===i.UNSIGNED_INT||oe.gpuType===da;if(oe.isInterleavedBufferAttribute){let ne=oe.data,re=ne.stride,we=oe.offset;if(ne.isInstancedInterleavedBuffer){for(let Me=0;Me<W.locationSize;Me++)f(W.location+Me,ne.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Me=0;Me<W.locationSize;Me++)g(W.location+Me);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let Me=0;Me<W.locationSize;Me++)E(W.location+Me,pe/W.locationSize,We,ue,re*ye,(we+pe/W.locationSize*Me)*ye,j)}else{if(oe.isInstancedBufferAttribute){for(let ne=0;ne<W.locationSize;ne++)f(W.location+ne,oe.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ne=0;ne<W.locationSize;ne++)g(W.location+ne);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let ne=0;ne<W.locationSize;ne++)E(W.location+ne,pe/W.locationSize,We,ue,pe*ye,pe/W.locationSize*ne*ye,j)}}else if(Z!==void 0){let ue=Z[se];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(W.location,ue);break;case 3:i.vertexAttrib3fv(W.location,ue);break;case 4:i.vertexAttrib4fv(W.location,ue);break;default:i.vertexAttrib1fv(W.location,ue)}}}}S()}function R(){I();for(let M in n){let C=n[M];for(let L in C){let z=C[L];for(let Y in z)h(z[Y].object),delete z[Y];delete C[L]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let L in C){let z=C[L];for(let Y in z)h(z[Y].object),delete z[Y];delete C[L]}delete n[M.id]}function A(M){for(let C in n){let L=n[C];if(L[M.id]===void 0)continue;let z=L[M.id];for(let Y in z)h(z[Y].object),delete z[Y];delete L[M.id]}}function I(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:S}}function Ng(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function a(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let p=0;for(let m=0;m<d;m++)p+=h[m];t.update(p,n,1)}function c(l,h,d,u){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],h[m],u[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let m=0;for(let x=0;x<d;x++)m+=h[x]*u[x];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Og(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==pn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let I=A===ys&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Sn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==En&&!I)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:R,maxSamples:b}}function Bg(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Rn,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){let m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,f=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let S=r?0:n,E=S*4,v=f.clippingState||null;c.value=v,v=h(m,u,E,p);for(let R=0;R!==E;++R)v[R]=t[R];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,m){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let f=p+x*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<f)&&(g=new Float32Array(f));for(let E=0,v=p;E!==x;++E,v+=4)o.copy(d[E]).applyMatrix4(S,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function zg(i){let e=new WeakMap;function t(o,a){return a===ca?o.mapping=Pi:a===ha&&(o.mapping=Li),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ca||a===ha)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Lo(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Es=4,Nu=[.125,.215,.35,.446,.526,.582],Oi=20,Mc=new Ar,Ou=new He,bc=null,Sc=0,Ec=0,Tc=!1,Ni=(1+Math.sqrt(5))/2,Ss=1/Ni,Bu=[new U(-Ni,Ss,0),new U(Ni,Ss,0),new U(-Ss,0,Ni),new U(Ss,0,Ni),new U(0,Ni,-Ss),new U(0,Ni,Ss),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],kg=new U,Ka=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=kg}=r;bc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ku(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,Sc,Ec),this._renderer.xr.enabled=Tc,e.scissorTest=!1,Za(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:ys,format:pn,colorSpace:Ri,depthBuffer:!1},s=zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hg(r)),this._blurMaterial=Vg(r,e,t)}return s}_compileMaterial(e){let t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,Mc)}_sceneToCubeUV(e,t,n,s,r){let c=new Ct(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Ou),d.toneMapping=Qn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let x=new Ft({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),g=new Ke(new Wt,x),f=!1,S=e.background;S?S.isColor&&(x.color.copy(S),e.background=null,f=!0):(x.color.copy(Ou),f=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):v===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));let R=this._cubeSize;Za(s,v*R,E>2?R:0,R,R),d.setRenderTarget(s),f&&d.render(g,c),d.render(e,c)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=p,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Pi||e.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ku());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ke(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Za(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Mc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bu[(s-r-1)%Bu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Ke(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Oi-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):Oi;g>Oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Oi}`);let f=[],S=0;for(let A=0;A<Oi;++A){let I=A/x,y=Math.exp(-I*I/2);f.push(y),A===0?S+=y:A<g&&(S+=2*y)}for(let A=0;A<f.length;A++)f[A]=f[A]/S;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:E}=this;u.dTheta.value=m,u.mipInt.value=E-n;let v=this._sizeLods[s],R=3*v*(s>E-Es?s-E+Es:0),b=4*(this._cubeSize-v);Za(t,R,b,3*v,2*v),c.setRenderTarget(t),c.render(d,Mc)}};function Hg(i){let e=[],t=[],n=[],s=i,r=i-Es+1+Nu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Es?c=Nu[o-i+Es-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,m=6,x=3,g=2,f=1,S=new Float32Array(x*m*p),E=new Float32Array(g*m*p),v=new Float32Array(f*m*p);for(let b=0;b<p;b++){let A=b%3*2/3-1,I=b>2?0:-1,y=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];S.set(y,x*m*b),E.set(u,g*m*b);let M=[b,b,b,b,b,b];v.set(M,f*m*b)}let R=new yt;R.setAttribute("position",new Vt(S,x)),R.setAttribute("uv",new Vt(E,g)),R.setAttribute("faceIndex",new Vt(v,f)),e.push(R),s>Es&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function zu(i,e,t){let n=new In(i,e,t);return n.texture.mapping=Ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Za(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Vg(i,e,t){let n=new Float32Array(Oi),s=new U(0,1,0);return new Rt({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function ku(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Hu(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Fc(){return`

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
	`}function Gg(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ca||c===ha,h=c===Pi||c===Li;if(l||h){let d=e.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Ka(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ka(i)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Wg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&us("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xg(i,e,t,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function c(d){let u=d.attributes;for(let p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){let u=[],p=d.index,m=d.attributes.position,x=0;if(p!==null){let S=p.array;x=p.version;for(let E=0,v=S.length;E<v;E+=3){let R=S[E+0],b=S[E+1],A=S[E+2];u.push(R,b,b,A,A,R)}}else if(m!==void 0){let S=m.array;x=m.version;for(let E=0,v=S.length/3-1;E<v;E+=3){let R=E+0,b=E+1,A=E+2;u.push(R,b,b,A,A,R)}}else return;let g=new(mc(u)?nr:tr)(u,1);g.version=x;let f=r.get(d);f&&e.remove(f),r.set(d,g)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function qg(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,p){i.drawElements(n,p,r,u*o),t.update(p,n,1)}function l(u,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,u*o,m),t.update(p,n,m))}function h(u,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,m);let g=0;for(let f=0;f<m;f++)g+=p[f];t.update(g,n,1)}function d(u,p,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<u.length;f++)l(u[f]/o,p[f],x[f]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,m);let f=0;for(let S=0;S<m;S++)f+=p[S]*x[S];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Yg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function $g(i,e,t){let n=new WeakMap,s=new mt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let y=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",y)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],E=0;p===!0&&(E=1),m===!0&&(E=2),x===!0&&(E=3);let v=a.attributes.position.count*E,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let b=new Float32Array(v*R*4*d),A=new js(b,v,R,d);A.type=En,A.needsUpdate=!0;let I=E*4;for(let M=0;M<d;M++){let C=g[M],L=f[M],z=S[M],Y=v*R*4*M;for(let q=0;q<C.count;q++){let Z=q*I;p===!0&&(s.fromBufferAttribute(C,q),b[Y+Z+0]=s.x,b[Y+Z+1]=s.y,b[Y+Z+2]=s.z,b[Y+Z+3]=0),m===!0&&(s.fromBufferAttribute(L,q),b[Y+Z+4]=s.x,b[Y+Z+5]=s.y,b[Y+Z+6]=s.z,b[Y+Z+7]=0),x===!0&&(s.fromBufferAttribute(z,q),b[Y+Z+8]=s.x,b[Y+Z+9]=s.y,b[Y+Z+10]=s.z,b[Y+Z+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new xe(v,R)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let m=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Zg(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var od=new Gt,Vu=new hr(1,1),ad=new js,ld=new Co,cd=new sr,Gu=[],Wu=[],Xu=new Float32Array(16),qu=new Float32Array(9),Yu=new Float32Array(4);function ws(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Gu[s];if(r===void 0&&(r=new Float32Array(s),Gu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ja(i,e){let t=Wu[e];t===void 0&&(t=new Int32Array(e),Wu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Jg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Kg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Qg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function jg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function e0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Yu.set(n),i.uniformMatrix2fv(this.addr,!1,Yu),Tt(t,n)}}function t0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;qu.set(n),i.uniformMatrix3fv(this.addr,!1,qu),Tt(t,n)}}function n0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Xu.set(n),i.uniformMatrix4fv(this.addr,!1,Xu),Tt(t,n)}}function i0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function s0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function r0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function o0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function a0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function l0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function c0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function h0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function u0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vu.compareFunction=fc,r=Vu):r=od,t.setTexture2D(e||r,s)}function d0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ld,s)}function f0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cd,s)}function p0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ad,s)}function m0(i){switch(i){case 5126:return Jg;case 35664:return Kg;case 35665:return Qg;case 35666:return jg;case 35674:return e0;case 35675:return t0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return l0;case 36295:return c0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}function g0(i,e){i.uniform1fv(this.addr,e)}function x0(i,e){let t=ws(e,this.size,2);i.uniform2fv(this.addr,t)}function _0(i,e){let t=ws(e,this.size,3);i.uniform3fv(this.addr,t)}function v0(i,e){let t=ws(e,this.size,4);i.uniform4fv(this.addr,t)}function y0(i,e){let t=ws(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function M0(i,e){let t=ws(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function b0(i,e){let t=ws(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function S0(i,e){i.uniform1iv(this.addr,e)}function E0(i,e){i.uniform2iv(this.addr,e)}function T0(i,e){i.uniform3iv(this.addr,e)}function w0(i,e){i.uniform4iv(this.addr,e)}function A0(i,e){i.uniform1uiv(this.addr,e)}function R0(i,e){i.uniform2uiv(this.addr,e)}function C0(i,e){i.uniform3uiv(this.addr,e)}function I0(i,e){i.uniform4uiv(this.addr,e)}function P0(i,e,t){let n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||od,r[o])}function L0(i,e,t){let n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ld,r[o])}function D0(i,e,t){let n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||cd,r[o])}function U0(i,e,t){let n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ad,r[o])}function F0(i){switch(i){case 5126:return g0;case 35664:return x0;case 35665:return _0;case 35666:return v0;case 35674:return y0;case 35675:return M0;case 35676:return b0;case 5124:case 35670:return S0;case 35667:case 35671:return E0;case 35668:case 35672:return T0;case 35669:case 35673:return w0;case 5125:return A0;case 36294:return R0;case 36295:return C0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return P0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}var Ac=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=m0(t.type)}},Rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=F0(t.type)}},Cc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},wc=/(\w+)(\])?(\[|\.)?/g;function $u(i,e){i.seq.push(e),i.map[e.id]=e}function N0(i,e,t){let n=i.name,s=n.length;for(wc.lastIndex=0;;){let r=wc.exec(n),o=wc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){$u(t,l===void 0?new Ac(a,i,e):new Rc(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Cc(a),$u(t,d)),t=d}}}var Ts=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);N0(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Zu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var O0=37297,B0=0;function z0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ju=new Ge;function k0(i){Qe._getMatrix(Ju,Qe.workingColorSpace,i);let e=`mat3( ${Ju.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Js:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ku(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+z0(i.getShaderSource(e),a)}else return r}function H0(i,e){let t=k0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function V0(i,e){let t;switch(e){case lu:t="Linear";break;case cu:t="Reinhard";break;case hu:t="Cineon";break;case uu:t="ACESFilmic";break;case fu:t="AgX";break;case pu:t="Neutral";break;case du:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ja=new U;function G0(){Qe.getLuminanceCoefficients(Ja);let i=Ja.x.toFixed(4),e=Ja.y.toFixed(4),t=Ja.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}function X0(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function q0(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Nr(i){return i!==""}function Qu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ju(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ic(i){return i.replace(Y0,Z0)}var $0=new Map;function Z0(i,e){let t=Xe[e];if(t===void 0){let n=$0.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ic(t)}var J0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ed(i){return i.replace(J0,K0)}function K0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function td(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Q0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ea?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(e="SHADOWMAP_TYPE_VSM"),e}function j0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Pi:case Li:e="ENVMAP_TYPE_CUBE";break;case Ir:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ex(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Li&&(e="ENVMAP_MODE_REFRACTION"),e}function tx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case la:e="ENVMAP_BLENDING_MULTIPLY";break;case ou:e="ENVMAP_BLENDING_MIX";break;case au:e="ENVMAP_BLENDING_ADD";break}return e}function nx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ix(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Q0(t),l=j0(t),h=ex(t),d=tx(t),u=nx(t),p=W0(t),m=X0(r),x=s.createProgram(),g,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Nr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Nr).join(`
`),f.length>0&&(f+=`
`)):(g=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),f=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qn?"#define TONE_MAPPING":"",t.toneMapping!==Qn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Qn?V0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,H0("linearToOutputTexel",t.outputColorSpace),G0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Nr).join(`
`)),o=Ic(o),o=Qu(o,t),o=ju(o,t),a=Ic(a),a=Qu(a,t),a=ju(a,t),o=ed(o),a=ed(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=S+g+o,v=S+f+a,R=Zu(s,s.VERTEX_SHADER,E),b=Zu(s,s.FRAGMENT_SHADER,v);s.attachShader(x,R),s.attachShader(x,b),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(C){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(R)||"",Y=s.getShaderInfoLog(b)||"",q=L.trim(),Z=z.trim(),se=Y.trim(),W=!0,oe=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,b);else{let ue=Ku(s,R,"vertex"),pe=Ku(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+q+`
`+ue+`
`+pe)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(Z===""||se==="")&&(oe=!1);oe&&(C.diagnostics={runnable:W,programLog:q,vertexShader:{log:Z,prefix:g},fragmentShader:{log:se,prefix:f}})}s.deleteShader(R),s.deleteShader(b),I=new Ts(s,x),y=q0(s,x)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,O0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=b,this}var sx=0,Pc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Lc(e),t.set(e,n)),n}},Lc=class{constructor(e){this.id=sx++,this.code=e,this.usedTimes=0}};function rx(i,e,t,n,s,r,o){let a=new er,c=new Pc,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,p=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,M,C,L,z){let Y=L.fog,q=z.geometry,Z=y.isMeshStandardMaterial?L.environment:null,se=(y.isMeshStandardMaterial?t:e).get(y.envMap||Z),W=se&&se.mapping===Ir?se.image.height:null,oe=m[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));let ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,pe=ue!==void 0?ue.length:0,Ie=0;q.morphAttributes.position!==void 0&&(Ie=1),q.morphAttributes.normal!==void 0&&(Ie=2),q.morphAttributes.color!==void 0&&(Ie=3);let ze,We,ye,j;if(oe){let tt=Fn[oe];ze=tt.vertexShader,We=tt.fragmentShader}else ze=y.vertexShader,We=y.fragmentShader,c.update(y),ye=c.getVertexShaderID(y),j=c.getFragmentShaderID(y);let ne=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),we=z.isInstancedMesh===!0,Me=z.isBatchedMesh===!0,De=!!y.map,Be=!!y.matcap,P=!!se,qe=!!y.aoMap,Ue=!!y.lightMap,Ce=!!y.bumpMap,Ae=!!y.normalMap,nt=!!y.displacementMap,Se=!!y.emissiveMap,V=!!y.metalnessMap,ce=!!y.roughnessMap,Le=y.anisotropy>0,w=y.clearcoat>0,_=y.dispersion>0,k=y.iridescence>0,F=y.sheen>0,N=y.transmission>0,D=Le&&!!y.anisotropyMap,J=w&&!!y.clearcoatMap,O=w&&!!y.clearcoatNormalMap,$=w&&!!y.clearcoatRoughnessMap,ee=k&&!!y.iridescenceMap,X=k&&!!y.iridescenceThicknessMap,ie=F&&!!y.sheenColorMap,de=F&&!!y.sheenRoughnessMap,ge=!!y.specularMap,fe=!!y.specularColorMap,Ne=!!y.specularIntensityMap,B=N&&!!y.transmissionMap,ae=N&&!!y.thicknessMap,me=!!y.gradientMap,Ee=!!y.alphaMap,le=y.alphaTest>0,te=!!y.alphaHash,ve=!!y.extensions,Ve=Qn;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let at={shaderID:oe,shaderType:y.type,shaderName:y.name,vertexShader:ze,fragmentShader:We,defines:y.defines,customVertexShaderID:ye,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Me,batchingColor:Me&&z._colorsTexture!==null,instancing:we,instancingColor:we&&z.instanceColor!==null,instancingMorph:we&&z.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ri,alphaToCoverage:!!y.alphaToCoverage,map:De,matcap:Be,envMap:P,envMapMode:P&&se.mapping,envMapCubeUVHeight:W,aoMap:qe,lightMap:Ue,bumpMap:Ce,normalMap:Ae,displacementMap:u&&nt,emissiveMap:Se,normalMapObjectSpace:Ae&&y.normalMapType===_u,normalMapTangentSpace:Ae&&y.normalMapType===dc,metalnessMap:V,roughnessMap:ce,anisotropy:Le,anisotropyMap:D,clearcoat:w,clearcoatMap:J,clearcoatNormalMap:O,clearcoatRoughnessMap:$,dispersion:_,iridescence:k,iridescenceMap:ee,iridescenceThicknessMap:X,sheen:F,sheenColorMap:ie,sheenRoughnessMap:de,specularMap:ge,specularColorMap:fe,specularIntensityMap:Ne,transmission:N,transmissionMap:B,thicknessMap:ae,gradientMap:me,opaque:y.transparent===!1&&y.blending===Yn&&y.alphaToCoverage===!1,alphaMap:Ee,alphaTest:le,alphaHash:te,combine:y.combine,mapUv:De&&x(y.map.channel),aoMapUv:qe&&x(y.aoMap.channel),lightMapUv:Ue&&x(y.lightMap.channel),bumpMapUv:Ce&&x(y.bumpMap.channel),normalMapUv:Ae&&x(y.normalMap.channel),displacementMapUv:nt&&x(y.displacementMap.channel),emissiveMapUv:Se&&x(y.emissiveMap.channel),metalnessMapUv:V&&x(y.metalnessMap.channel),roughnessMapUv:ce&&x(y.roughnessMap.channel),anisotropyMapUv:D&&x(y.anisotropyMap.channel),clearcoatMapUv:J&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:O&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:X&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:de&&x(y.sheenRoughnessMap.channel),specularMapUv:ge&&x(y.specularMap.channel),specularColorMapUv:fe&&x(y.specularColorMap.channel),specularIntensityMapUv:Ne&&x(y.specularIntensityMap.channel),transmissionMapUv:B&&x(y.transmissionMap.channel),thicknessMapUv:ae&&x(y.thicknessMap.channel),alphaMapUv:Ee&&x(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ae||Le),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!q.attributes.uv&&(De||Ee),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:z.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ie,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:De&&y.map.isVideoTexture===!0&&Qe.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:Se&&y.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Yt,flipSided:y.side===qt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return at.vertexUv1s=l.has(1),at.vertexUv2s=l.has(2),at.vertexUv3s=l.has(3),l.clear(),at}function f(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let C in y.defines)M.push(C),M.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(S(M,y),E(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function S(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function E(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){let M=m[y.type],C;if(M){let L=Fn[M];C=Cu.clone(L.uniforms)}else C=y.uniforms;return C}function R(y,M){let C;for(let L=0,z=h.length;L<z;L++){let Y=h[L];if(Y.cacheKey===M){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new ix(i,M,y,r),h.push(C)),C}function b(y){if(--y.usedTimes===0){let M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function A(y){c.remove(y)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:v,acquireProgram:R,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:I}}function ox(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ax(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function nd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function id(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,u,p,m,x,g){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:m,renderOrder:d.renderOrder,z:x,group:g},i[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=m,f.renderOrder=d.renderOrder,f.z=x,f.group=g),e++,f}function a(d,u,p,m,x,g){let f=o(d,u,p,m,x,g);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(d,u,p,m,x,g){let f=o(d,u,p,m,x,g);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(d,u){t.length>1&&t.sort(d||ax),n.length>1&&n.sort(u||nd),s.length>1&&s.sort(u||nd)}function h(){for(let d=e,u=i.length;d<u;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function lx(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new id,i.set(n,[o])):s>=r.length?(o=new id,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function cx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new He};break;case"SpotLight":t={position:new U,direction:new U,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function hx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var ux=0;function dx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function fx(i){let e=new cx,t=hx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);let s=new U,r=new et,o=new et;function a(l){let h=0,d=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,m=0,x=0,g=0,f=0,S=0,E=0,v=0,R=0,b=0,A=0;l.sort(dx);for(let y=0,M=l.length;y<M;y++){let C=l[y],L=C.color,z=C.intensity,Y=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=L.r*z,d+=L.g*z,u+=L.b*z;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(C.sh.coefficients[Z],z);A++}else if(C.isDirectionalLight){let Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let se=C.shadow,W=t.get(C);W.shadowIntensity=se.intensity,W.shadowBias=se.bias,W.shadowNormalBias=se.normalBias,W.shadowRadius=se.radius,W.shadowMapSize=se.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=C.shadow.matrix,S++}n.directional[p]=Z,p++}else if(C.isSpotLight){let Z=e.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(L).multiplyScalar(z),Z.distance=Y,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,n.spot[x]=Z;let se=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,se.updateMatrices(C),C.castShadow&&b++),n.spotLightMatrix[x]=se.matrix,C.castShadow){let W=t.get(C);W.shadowIntensity=se.intensity,W.shadowBias=se.bias,W.shadowNormalBias=se.normalBias,W.shadowRadius=se.radius,W.shadowMapSize=se.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=q,v++}x++}else if(C.isRectAreaLight){let Z=e.get(C);Z.color.copy(L).multiplyScalar(z),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=Z,g++}else if(C.isPointLight){let Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){let se=C.shadow,W=t.get(C);W.shadowIntensity=se.intensity,W.shadowBias=se.bias,W.shadowNormalBias=se.normalBias,W.shadowRadius=se.radius,W.shadowMapSize=se.mapSize,W.shadowCameraNear=se.camera.near,W.shadowCameraFar=se.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=C.shadow.matrix,E++}n.point[m]=Z,m++}else if(C.isHemisphereLight){let Z=e.get(C);Z.skyColor.copy(C.color).multiplyScalar(z),Z.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[f]=Z,f++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.directionalLength!==p||I.pointLength!==m||I.spotLength!==x||I.rectAreaLength!==g||I.hemiLength!==f||I.numDirectionalShadows!==S||I.numPointShadows!==E||I.numSpotShadows!==v||I.numSpotMaps!==R||I.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+R-b,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,I.directionalLength=p,I.pointLength=m,I.spotLength=x,I.rectAreaLength=g,I.hemiLength=f,I.numDirectionalShadows=S,I.numPointShadows=E,I.numSpotShadows=v,I.numSpotMaps=R,I.numLightProbes=A,n.version=ux++)}function c(l,h){let d=0,u=0,p=0,m=0,x=0,g=h.matrixWorldInverse;for(let f=0,S=l.length;f<S;f++){let E=l[f];if(E.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(E.isSpotLight){let v=n.spot[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),p++}else if(E.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),u++}else if(E.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function sd(i){let e=new fx(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function px(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new sd(i),e.set(s,[a])):r>=o.length?(a=new sd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var mx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gx=`uniform sampler2D shadow_pass;
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
}`;function xx(i,e,t){let n=new ms,s=new xe,r=new xe,o=new mt,a=new Vo({depthPacking:xu}),c=new Go,l={},h=t.maxTextureSize,d={[qn]:qt,[qt]:qn,[Yt]:Yt},u=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:mx,fragmentShader:gx}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let m=new yt;m.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ke(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tc;let f=this.type;this.render=function(b,A,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;let y=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Kn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let z=f!==Un&&this.type===Un,Y=f===Un&&this.type!==Un;for(let q=0,Z=b.length;q<Z;q++){let se=b[q],W=se.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let oe=W.getFrameExtents();if(s.multiply(oe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,W.mapSize.y=r.y)),W.map===null||z===!0||Y===!0){let pe=this.type!==Un?{minFilter:Jt,magFilter:Jt}:{};W.map!==null&&W.map.dispose(),W.map=new In(s.x,s.y,pe),W.map.texture.name=se.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let ue=W.getViewportCount();for(let pe=0;pe<ue;pe++){let Ie=W.getViewport(pe);o.set(r.x*Ie.x,r.y*Ie.y,r.x*Ie.z,r.y*Ie.w),L.viewport(o),W.updateMatrices(se,pe),n=W.getFrustum(),v(A,I,W.camera,se,this.type)}W.isPointLightShadow!==!0&&this.type===Un&&S(W,I),W.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(y,M,C)};function S(b,A){let I=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new In(s.x,s.y)),u.uniforms.shadow_pass.value=b.map.texture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,I,u,x,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,I,p,x,null)}function E(b,A,I,y){let M=null,C=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)M=C;else if(M=I.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let L=M.uuid,z=A.uuid,Y=l[L];Y===void 0&&(Y={},l[L]=Y);let q=Y[z];q===void 0&&(q=M.clone(),Y[z]=q,A.addEventListener("dispose",R)),M=q}if(M.visible=A.visible,M.wireframe=A.wireframe,y===Un?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let L=i.properties.get(M);L.light=I}return M}function v(b,A,I,y,M){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Un)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);let z=e.update(b),Y=b.material;if(Array.isArray(Y)){let q=z.groups;for(let Z=0,se=q.length;Z<se;Z++){let W=q[Z],oe=Y[W.materialIndex];if(oe&&oe.visible){let ue=E(b,oe,y,M);b.onBeforeShadow(i,b,A,I,z,ue,W),i.renderBufferDirect(I,null,z,ue,b,W),b.onAfterShadow(i,b,A,I,z,ue,W)}}}else if(Y.visible){let q=E(b,Y,y,M);b.onBeforeShadow(i,b,A,I,z,q,null),i.renderBufferDirect(I,null,z,q,b,null),b.onAfterShadow(i,b,A,I,z,q,null)}}let L=b.children;for(let z=0,Y=L.length;z<Y;z++)v(L[z],A,I,y,M)}function R(b){b.target.removeEventListener("dispose",R);for(let I in l){let y=l[I],M=b.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}var _x={[ta]:na,[ia]:oa,[sa]:aa,[wi]:ra,[na]:ta,[oa]:ia,[aa]:sa,[ra]:wi};function vx(i,e){function t(){let B=!1,ae=new mt,me=null,Ee=new mt(0,0,0,0);return{setMask:function(le){me!==le&&!B&&(i.colorMask(le,le,le,le),me=le)},setLocked:function(le){B=le},setClear:function(le,te,ve,Ve,at){at===!0&&(le*=Ve,te*=Ve,ve*=Ve),ae.set(le,te,ve,Ve),Ee.equals(ae)===!1&&(i.clearColor(le,te,ve,Ve),Ee.copy(ae))},reset:function(){B=!1,me=null,Ee.set(-1,0,0,0)}}}function n(){let B=!1,ae=!1,me=null,Ee=null,le=null;return{setReversed:function(te){if(ae!==te){let ve=e.get("EXT_clip_control");te?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),ae=te;let Ve=le;le=null,this.setClear(Ve)}},getReversed:function(){return ae},setTest:function(te){te?ne(i.DEPTH_TEST):re(i.DEPTH_TEST)},setMask:function(te){me!==te&&!B&&(i.depthMask(te),me=te)},setFunc:function(te){if(ae&&(te=_x[te]),Ee!==te){switch(te){case ta:i.depthFunc(i.NEVER);break;case na:i.depthFunc(i.ALWAYS);break;case ia:i.depthFunc(i.LESS);break;case wi:i.depthFunc(i.LEQUAL);break;case sa:i.depthFunc(i.EQUAL);break;case ra:i.depthFunc(i.GEQUAL);break;case oa:i.depthFunc(i.GREATER);break;case aa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=te}},setLocked:function(te){B=te},setClear:function(te){le!==te&&(ae&&(te=1-te),i.clearDepth(te),le=te)},reset:function(){B=!1,me=null,Ee=null,le=null,ae=!1}}}function s(){let B=!1,ae=null,me=null,Ee=null,le=null,te=null,ve=null,Ve=null,at=null;return{setTest:function(tt){B||(tt?ne(i.STENCIL_TEST):re(i.STENCIL_TEST))},setMask:function(tt){ae!==tt&&!B&&(i.stencilMask(tt),ae=tt)},setFunc:function(tt,Nn,wn){(me!==tt||Ee!==Nn||le!==wn)&&(i.stencilFunc(tt,Nn,wn),me=tt,Ee=Nn,le=wn)},setOp:function(tt,Nn,wn){(te!==tt||ve!==Nn||Ve!==wn)&&(i.stencilOp(tt,Nn,wn),te=tt,ve=Nn,Ve=wn)},setLocked:function(tt){B=tt},setClear:function(tt){at!==tt&&(i.clearStencil(tt),at=tt)},reset:function(){B=!1,ae=null,me=null,Ee=null,le=null,te=null,ve=null,Ve=null,at=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u=new WeakMap,p=[],m=null,x=!1,g=null,f=null,S=null,E=null,v=null,R=null,b=null,A=new He(0,0,0),I=0,y=!1,M=null,C=null,L=null,z=null,Y=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,se=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=se>=1):W.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=se>=2);let oe=null,ue={},pe=i.getParameter(i.SCISSOR_BOX),Ie=i.getParameter(i.VIEWPORT),ze=new mt().fromArray(pe),We=new mt().fromArray(Ie);function ye(B,ae,me,Ee){let le=new Uint8Array(4),te=i.createTexture();i.bindTexture(B,te),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ve=0;ve<me;ve++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(ae+ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return te}let j={};j[i.TEXTURE_2D]=ye(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=ye(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=ye(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=ye(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(i.DEPTH_TEST),o.setFunc(wi),Ce(!1),Ae(ec),ne(i.CULL_FACE),qe(Kn);function ne(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function re(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function we(B,ae){return d[B]!==ae?(i.bindFramebuffer(B,ae),d[B]=ae,B===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ae),B===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Me(B,ae){let me=p,Ee=!1;if(B){me=u.get(ae),me===void 0&&(me=[],u.set(ae,me));let le=B.textures;if(me.length!==le.length||me[0]!==i.COLOR_ATTACHMENT0){for(let te=0,ve=le.length;te<ve;te++)me[te]=i.COLOR_ATTACHMENT0+te;me.length=le.length,Ee=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(me)}function De(B){return m!==B?(i.useProgram(B),m=B,!0):!1}let Be={[li]:i.FUNC_ADD,[Gh]:i.FUNC_SUBTRACT,[Wh]:i.FUNC_REVERSE_SUBTRACT};Be[Xh]=i.MIN,Be[qh]=i.MAX;let P={[Yh]:i.ZERO,[$h]:i.ONE,[Zh]:i.SRC_COLOR,[Mo]:i.SRC_ALPHA,[tu]:i.SRC_ALPHA_SATURATE,[jh]:i.DST_COLOR,[Kh]:i.DST_ALPHA,[Jh]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[eu]:i.ONE_MINUS_DST_COLOR,[Qh]:i.ONE_MINUS_DST_ALPHA,[nu]:i.CONSTANT_COLOR,[iu]:i.ONE_MINUS_CONSTANT_COLOR,[su]:i.CONSTANT_ALPHA,[ru]:i.ONE_MINUS_CONSTANT_ALPHA};function qe(B,ae,me,Ee,le,te,ve,Ve,at,tt){if(B===Kn){x===!0&&(re(i.BLEND),x=!1);return}if(x===!1&&(ne(i.BLEND),x=!0),B!==Vh){if(B!==g||tt!==y){if((f!==li||v!==li)&&(i.blendEquation(i.FUNC_ADD),f=li,v=li),tt)switch(B){case Yn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fi:i.blendFunc(i.ONE,i.ONE);break;case nc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ic:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Yn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ic:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}S=null,E=null,R=null,b=null,A.set(0,0,0),I=0,g=B,y=tt}return}le=le||ae,te=te||me,ve=ve||Ee,(ae!==f||le!==v)&&(i.blendEquationSeparate(Be[ae],Be[le]),f=ae,v=le),(me!==S||Ee!==E||te!==R||ve!==b)&&(i.blendFuncSeparate(P[me],P[Ee],P[te],P[ve]),S=me,E=Ee,R=te,b=ve),(Ve.equals(A)===!1||at!==I)&&(i.blendColor(Ve.r,Ve.g,Ve.b,at),A.copy(Ve),I=at),g=B,y=!1}function Ue(B,ae){B.side===Yt?re(i.CULL_FACE):ne(i.CULL_FACE);let me=B.side===qt;ae&&(me=!me),Ce(me),B.blending===Yn&&B.transparent===!1?qe(Kn):qe(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let Ee=B.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Se(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):re(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(B){M!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),M=B)}function Ae(B){B!==kh?(ne(i.CULL_FACE),B!==C&&(B===ec?i.cullFace(i.BACK):B===Hh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):re(i.CULL_FACE),C=B}function nt(B){B!==L&&(Z&&i.lineWidth(B),L=B)}function Se(B,ae,me){B?(ne(i.POLYGON_OFFSET_FILL),(z!==ae||Y!==me)&&(i.polygonOffset(ae,me),z=ae,Y=me)):re(i.POLYGON_OFFSET_FILL)}function V(B){B?ne(i.SCISSOR_TEST):re(i.SCISSOR_TEST)}function ce(B){B===void 0&&(B=i.TEXTURE0+q-1),oe!==B&&(i.activeTexture(B),oe=B)}function Le(B,ae,me){me===void 0&&(oe===null?me=i.TEXTURE0+q-1:me=oe);let Ee=ue[me];Ee===void 0&&(Ee={type:void 0,texture:void 0},ue[me]=Ee),(Ee.type!==B||Ee.texture!==ae)&&(oe!==me&&(i.activeTexture(me),oe=me),i.bindTexture(B,ae||j[B]),Ee.type=B,Ee.texture=ae)}function w(){let B=ue[oe];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function F(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function N(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function D(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function O(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ee(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function X(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ie(B){ze.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),ze.copy(B))}function de(B){We.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),We.copy(B))}function ge(B,ae){let me=l.get(ae);me===void 0&&(me=new WeakMap,l.set(ae,me));let Ee=me.get(B);Ee===void 0&&(Ee=i.getUniformBlockIndex(ae,B.name),me.set(B,Ee))}function fe(B,ae){let Ee=l.get(ae).get(B);c.get(ae)!==Ee&&(i.uniformBlockBinding(ae,Ee,B.__bindingPointIndex),c.set(ae,Ee))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,ue={},d={},u=new WeakMap,p=[],m=null,x=!1,g=null,f=null,S=null,E=null,v=null,R=null,b=null,A=new He(0,0,0),I=0,y=!1,M=null,C=null,L=null,z=null,Y=null,ze.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ne,disable:re,bindFramebuffer:we,drawBuffers:Me,useProgram:De,setBlending:qe,setMaterial:Ue,setFlipSided:Ce,setCullFace:Ae,setLineWidth:nt,setPolygonOffset:Se,setScissorTest:V,activeTexture:ce,bindTexture:Le,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:k,texImage2D:ee,texImage3D:X,updateUBOMapping:ge,uniformBlockBinding:fe,texStorage2D:O,texStorage3D:$,texSubImage2D:F,texSubImage3D:N,compressedTexSubImage2D:D,compressedTexSubImage3D:J,scissor:ie,viewport:de,reset:Ne}}function yx(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new xe,h=new WeakMap,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,_){return p?new OffscreenCanvas(w,_):Qs("canvas")}function x(w,_,k){let F=1,N=Le(w);if((N.width>k||N.height>k)&&(F=k/Math.max(N.width,N.height)),F<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let D=Math.floor(F*N.width),J=Math.floor(F*N.height);d===void 0&&(d=m(D,J));let O=_?m(D,J):d;return O.width=D,O.height=J,O.getContext("2d").drawImage(w,0,0,D,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+D+"x"+J+")."),O}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),w;return w}function g(w){return w.generateMipmaps}function f(w){i.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,k,F,N=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let D=_;if(_===i.RED&&(k===i.FLOAT&&(D=i.R32F),k===i.HALF_FLOAT&&(D=i.R16F),k===i.UNSIGNED_BYTE&&(D=i.R8)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(D=i.R8UI),k===i.UNSIGNED_SHORT&&(D=i.R16UI),k===i.UNSIGNED_INT&&(D=i.R32UI),k===i.BYTE&&(D=i.R8I),k===i.SHORT&&(D=i.R16I),k===i.INT&&(D=i.R32I)),_===i.RG&&(k===i.FLOAT&&(D=i.RG32F),k===i.HALF_FLOAT&&(D=i.RG16F),k===i.UNSIGNED_BYTE&&(D=i.RG8)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(D=i.RG8UI),k===i.UNSIGNED_SHORT&&(D=i.RG16UI),k===i.UNSIGNED_INT&&(D=i.RG32UI),k===i.BYTE&&(D=i.RG8I),k===i.SHORT&&(D=i.RG16I),k===i.INT&&(D=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(D=i.RGB8UI),k===i.UNSIGNED_SHORT&&(D=i.RGB16UI),k===i.UNSIGNED_INT&&(D=i.RGB32UI),k===i.BYTE&&(D=i.RGB8I),k===i.SHORT&&(D=i.RGB16I),k===i.INT&&(D=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(D=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(D=i.RGBA16UI),k===i.UNSIGNED_INT&&(D=i.RGBA32UI),k===i.BYTE&&(D=i.RGBA8I),k===i.SHORT&&(D=i.RGBA16I),k===i.INT&&(D=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(D=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(D=i.R11F_G11F_B10F)),_===i.RGBA){let J=N?Js:Qe.getTransfer(F);k===i.FLOAT&&(D=i.RGBA32F),k===i.HALF_FLOAT&&(D=i.RGBA16F),k===i.UNSIGNED_BYTE&&(D=J===it?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(D=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(D=i.RGB5_A1)}return(D===i.R16F||D===i.R32F||D===i.RG16F||D===i.RG32F||D===i.RGBA16F||D===i.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function v(w,_){let k;return w?_===null||_===mi||_===Ms?k=i.DEPTH24_STENCIL8:_===En?k=i.DEPTH32F_STENCIL8:_===vs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===mi||_===Ms?k=i.DEPTH_COMPONENT24:_===En?k=i.DEPTH_COMPONENT32F:_===vs&&(k=i.DEPTH_COMPONENT16),k}function R(w,_){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Jt&&w.minFilter!==Mn?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function b(w){let _=w.target;_.removeEventListener("dispose",b),I(_),_.isVideoTexture&&h.delete(_)}function A(w){let _=w.target;_.removeEventListener("dispose",A),M(_)}function I(w){let _=n.get(w);if(_.__webglInit===void 0)return;let k=w.source,F=u.get(k);if(F){let N=F[_.__cacheKey];N.usedTimes--,N.usedTimes===0&&y(w),Object.keys(F).length===0&&u.delete(k)}n.remove(w)}function y(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let k=w.source,F=u.get(k);delete F[_.__cacheKey],o.memory.textures--}function M(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let N=0;N<_.__webglFramebuffer[F].length;N++)i.deleteFramebuffer(_.__webglFramebuffer[F][N]);else i.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)i.deleteFramebuffer(_.__webglFramebuffer[F]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let k=w.textures;for(let F=0,N=k.length;F<N;F++){let D=n.get(k[F]);D.__webglTexture&&(i.deleteTexture(D.__webglTexture),o.memory.textures--),n.remove(k[F])}n.remove(w)}let C=0;function L(){C=0}function z(){let w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function Y(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function q(w,_){let k=n.get(w);if(w.isVideoTexture&&V(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){let F=w.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,w,_);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function Z(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){j(k,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function se(w,_){let k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){j(k,w,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function W(w,_){let k=n.get(w);if(w.version>0&&k.__version!==w.version){ne(k,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}let oe={[Ai]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[So]:i.MIRRORED_REPEAT},ue={[Jt]:i.NEAREST,[mu]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[ua]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},pe={[vu]:i.NEVER,[Tu]:i.ALWAYS,[yu]:i.LESS,[fc]:i.LEQUAL,[Mu]:i.EQUAL,[Eu]:i.GEQUAL,[bu]:i.GREATER,[Su]:i.NOTEQUAL};function Ie(w,_){if(_.type===En&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Mn||_.magFilter===ua||_.magFilter===Pr||_.magFilter===pi||_.minFilter===Mn||_.minFilter===ua||_.minFilter===Pr||_.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,oe[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,oe[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,oe[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ue[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,pe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Jt||_.minFilter!==Pr&&_.minFilter!==pi||_.type===En&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ze(w,_){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",b));let F=_.source,N=u.get(F);N===void 0&&(N={},u.set(F,N));let D=Y(_);if(D!==w.__cacheKey){N[D]===void 0&&(N[D]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),N[D].usedTimes++;let J=N[w.__cacheKey];J!==void 0&&(N[w.__cacheKey].usedTimes--,J.usedTimes===0&&y(_)),w.__cacheKey=D,w.__webglTexture=N[D].texture}return k}function We(w,_,k){return Math.floor(Math.floor(w/k)/_)}function ye(w,_,k,F){let D=w.updateRanges;if(D.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,F,_.data);else{D.sort((X,ie)=>X.start-ie.start);let J=0;for(let X=1;X<D.length;X++){let ie=D[J],de=D[X],ge=ie.start+ie.count,fe=We(de.start,_.width,4),Ne=We(ie.start,_.width,4);de.start<=ge+1&&fe===Ne&&We(de.start+de.count-1,_.width,4)===fe?ie.count=Math.max(ie.count,de.start+de.count-ie.start):(++J,D[J]=de)}D.length=J+1;let O=i.getParameter(i.UNPACK_ROW_LENGTH),$=i.getParameter(i.UNPACK_SKIP_PIXELS),ee=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let X=0,ie=D.length;X<ie;X++){let de=D[X],ge=Math.floor(de.start/4),fe=Math.ceil(de.count/4),Ne=ge%_.width,B=Math.floor(ge/_.width),ae=fe,me=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,Ne,B,ae,me,k,F,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,O),i.pixelStorei(i.UNPACK_SKIP_PIXELS,$),i.pixelStorei(i.UNPACK_SKIP_ROWS,ee)}}function j(w,_,k){let F=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=i.TEXTURE_3D);let N=ze(w,_),D=_.source;t.bindTexture(F,w.__webglTexture,i.TEXTURE0+k);let J=n.get(D);if(D.version!==J.__version||N===!0){t.activeTexture(i.TEXTURE0+k);let O=Qe.getPrimaries(Qe.workingColorSpace),$=_.colorSpace===jn?null:Qe.getPrimaries(_.colorSpace),ee=_.colorSpace===jn||O===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let X=x(_.image,!1,s.maxTextureSize);X=ce(_,X);let ie=r.convert(_.format,_.colorSpace),de=r.convert(_.type),ge=E(_.internalFormat,ie,de,_.colorSpace,_.isVideoTexture);Ie(F,_);let fe,Ne=_.mipmaps,B=_.isVideoTexture!==!0,ae=J.__version===void 0||N===!0,me=D.dataReady,Ee=R(_,X);if(_.isDepthTexture)ge=v(_.format===bs,_.type),ae&&(B?t.texStorage2D(i.TEXTURE_2D,1,ge,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,ge,X.width,X.height,0,ie,de,null));else if(_.isDataTexture)if(Ne.length>0){B&&ae&&t.texStorage2D(i.TEXTURE_2D,Ee,ge,Ne[0].width,Ne[0].height);for(let le=0,te=Ne.length;le<te;le++)fe=Ne[le],B?me&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,fe.width,fe.height,ie,de,fe.data):t.texImage2D(i.TEXTURE_2D,le,ge,fe.width,fe.height,0,ie,de,fe.data);_.generateMipmaps=!1}else B?(ae&&t.texStorage2D(i.TEXTURE_2D,Ee,ge,X.width,X.height),me&&ye(_,X,ie,de)):t.texImage2D(i.TEXTURE_2D,0,ge,X.width,X.height,0,ie,de,X.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){B&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,ge,Ne[0].width,Ne[0].height,X.depth);for(let le=0,te=Ne.length;le<te;le++)if(fe=Ne[le],_.format!==pn)if(ie!==null)if(B){if(me)if(_.layerUpdates.size>0){let ve=yc(fe.width,fe.height,_.format,_.type);for(let Ve of _.layerUpdates){let at=fe.data.subarray(Ve*ve/fe.data.BYTES_PER_ELEMENT,(Ve+1)*ve/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,Ve,fe.width,fe.height,1,ie,at)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,fe.width,fe.height,X.depth,ie,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,ge,fe.width,fe.height,X.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?me&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,fe.width,fe.height,X.depth,ie,de,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,ge,fe.width,fe.height,X.depth,0,ie,de,fe.data)}else{B&&ae&&t.texStorage2D(i.TEXTURE_2D,Ee,ge,Ne[0].width,Ne[0].height);for(let le=0,te=Ne.length;le<te;le++)fe=Ne[le],_.format!==pn?ie!==null?B?me&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,fe.width,fe.height,ie,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,le,ge,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?me&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,fe.width,fe.height,ie,de,fe.data):t.texImage2D(i.TEXTURE_2D,le,ge,fe.width,fe.height,0,ie,de,fe.data)}else if(_.isDataArrayTexture)if(B){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,ge,X.width,X.height,X.depth),me)if(_.layerUpdates.size>0){let le=yc(X.width,X.height,_.format,_.type);for(let te of _.layerUpdates){let ve=X.data.subarray(te*le/X.data.BYTES_PER_ELEMENT,(te+1)*le/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,X.width,X.height,1,ie,de,ve)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,ie,de,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,X.width,X.height,X.depth,0,ie,de,X.data);else if(_.isData3DTexture)B?(ae&&t.texStorage3D(i.TEXTURE_3D,Ee,ge,X.width,X.height,X.depth),me&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,ie,de,X.data)):t.texImage3D(i.TEXTURE_3D,0,ge,X.width,X.height,X.depth,0,ie,de,X.data);else if(_.isFramebufferTexture){if(ae)if(B)t.texStorage2D(i.TEXTURE_2D,Ee,ge,X.width,X.height);else{let le=X.width,te=X.height;for(let ve=0;ve<Ee;ve++)t.texImage2D(i.TEXTURE_2D,ve,ge,le,te,0,ie,de,null),le>>=1,te>>=1}}else if(Ne.length>0){if(B&&ae){let le=Le(Ne[0]);t.texStorage2D(i.TEXTURE_2D,Ee,ge,le.width,le.height)}for(let le=0,te=Ne.length;le<te;le++)fe=Ne[le],B?me&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,ie,de,fe):t.texImage2D(i.TEXTURE_2D,le,ge,ie,de,fe);_.generateMipmaps=!1}else if(B){if(ae){let le=Le(X);t.texStorage2D(i.TEXTURE_2D,Ee,ge,le.width,le.height)}me&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie,de,X)}else t.texImage2D(i.TEXTURE_2D,0,ge,ie,de,X);g(_)&&f(F),J.__version=D.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ne(w,_,k){if(_.image.length!==6)return;let F=ze(w,_),N=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);let D=n.get(N);if(N.version!==D.__version||F===!0){t.activeTexture(i.TEXTURE0+k);let J=Qe.getPrimaries(Qe.workingColorSpace),O=_.colorSpace===jn?null:Qe.getPrimaries(_.colorSpace),$=_.colorSpace===jn||J===O?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let ee=_.isCompressedTexture||_.image[0].isCompressedTexture,X=_.image[0]&&_.image[0].isDataTexture,ie=[];for(let te=0;te<6;te++)!ee&&!X?ie[te]=x(_.image[te],!0,s.maxCubemapSize):ie[te]=X?_.image[te].image:_.image[te],ie[te]=ce(_,ie[te]);let de=ie[0],ge=r.convert(_.format,_.colorSpace),fe=r.convert(_.type),Ne=E(_.internalFormat,ge,fe,_.colorSpace),B=_.isVideoTexture!==!0,ae=D.__version===void 0||F===!0,me=N.dataReady,Ee=R(_,de);Ie(i.TEXTURE_CUBE_MAP,_);let le;if(ee){B&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Ne,de.width,de.height);for(let te=0;te<6;te++){le=ie[te].mipmaps;for(let ve=0;ve<le.length;ve++){let Ve=le[ve];_.format!==pn?ge!==null?B?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,0,0,Ve.width,Ve.height,ge,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,Ne,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,0,0,Ve.width,Ve.height,ge,fe,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve,Ne,Ve.width,Ve.height,0,ge,fe,Ve.data)}}}else{if(le=_.mipmaps,B&&ae){le.length>0&&Ee++;let te=Le(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Ne,te.width,te.height)}for(let te=0;te<6;te++)if(X){B?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ie[te].width,ie[te].height,ge,fe,ie[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ne,ie[te].width,ie[te].height,0,ge,fe,ie[te].data);for(let ve=0;ve<le.length;ve++){let at=le[ve].image[te].image;B?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,0,0,at.width,at.height,ge,fe,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,Ne,at.width,at.height,0,ge,fe,at.data)}}else{B?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ge,fe,ie[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ne,ge,fe,ie[te]);for(let ve=0;ve<le.length;ve++){let Ve=le[ve];B?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,0,0,ge,fe,Ve.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ve+1,Ne,ge,fe,Ve.image[te])}}}g(_)&&f(i.TEXTURE_CUBE_MAP),D.__version=N.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function re(w,_,k,F,N,D){let J=r.convert(k.format,k.colorSpace),O=r.convert(k.type),$=E(k.internalFormat,J,O,k.colorSpace),ee=n.get(_),X=n.get(k);if(X.__renderTarget=_,!ee.__hasExternalTextures){let ie=Math.max(1,_.width>>D),de=Math.max(1,_.height>>D);N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?t.texImage3D(N,D,$,ie,de,_.depth,0,J,O,null):t.texImage2D(N,D,$,ie,de,0,J,O,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Se(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,F,N,X.__webglTexture,0,nt(_)):(N===i.TEXTURE_2D||N>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,F,N,X.__webglTexture,D),t.bindFramebuffer(i.FRAMEBUFFER,null)}function we(w,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let F=_.depthTexture,N=F&&F.isDepthTexture?F.type:null,D=v(_.stencilBuffer,N),J=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=nt(_);Se(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,O,D,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,O,D,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,D,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,w)}else{let F=_.textures;for(let N=0;N<F.length;N++){let D=F[N],J=r.convert(D.format,D.colorSpace),O=r.convert(D.type),$=E(D.internalFormat,J,O,D.colorSpace),ee=nt(_);k&&Se(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,$,_.width,_.height):Se(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,$,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,$,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let F=n.get(_.depthTexture);F.__renderTarget=_,(!F.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);let N=F.__webglTexture,D=nt(_);if(_.depthTexture.format===hs)Se(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,N,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,N,0);else if(_.depthTexture.format===bs)Se(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,N,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,N,0);else throw new Error("Unknown depthTexture format")}function De(w){let _=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let F=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),F){let N=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,F.removeEventListener("dispose",N)};F.addEventListener("dispose",N),_.__depthDisposeCallback=N}_.__boundDepthTexture=F}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");let F=w.texture.mipmaps;F&&F.length>0?Me(_.__webglFramebuffer[0],w):Me(_.__webglFramebuffer,w)}else if(k){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]===void 0)_.__webglDepthbuffer[F]=i.createRenderbuffer(),we(_.__webglDepthbuffer[F],w,!1);else{let N=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=_.__webglDepthbuffer[F];i.bindRenderbuffer(i.RENDERBUFFER,D),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,D)}}else{let F=w.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),we(_.__webglDepthbuffer,w,!1);else{let N=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,D),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,D)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(w,_,k){let F=n.get(w);_!==void 0&&re(F.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&De(w)}function P(w){let _=w.texture,k=n.get(w),F=n.get(_);w.addEventListener("dispose",A);let N=w.textures,D=w.isWebGLCubeRenderTarget===!0,J=N.length>1;if(J||(F.__webglTexture===void 0&&(F.__webglTexture=i.createTexture()),F.__version=_.version,o.memory.textures++),D){k.__webglFramebuffer=[];for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[O]=[];for(let $=0;$<_.mipmaps.length;$++)k.__webglFramebuffer[O][$]=i.createFramebuffer()}else k.__webglFramebuffer[O]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let O=0;O<_.mipmaps.length;O++)k.__webglFramebuffer[O]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(J)for(let O=0,$=N.length;O<$;O++){let ee=n.get(N[O]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&Se(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let O=0;O<N.length;O++){let $=N[O];k.__webglColorRenderbuffer[O]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[O]);let ee=r.convert($.format,$.colorSpace),X=r.convert($.type),ie=E($.internalFormat,ee,X,$.colorSpace,w.isXRRenderTarget===!0),de=nt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ie,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+O,i.RENDERBUFFER,k.__webglColorRenderbuffer[O])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),we(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(D){t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,_);for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)re(k.__webglFramebuffer[O][$],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+O,$);else re(k.__webglFramebuffer[O],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+O,0);g(_)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){for(let O=0,$=N.length;O<$;O++){let ee=N[O],X=n.get(ee),ie=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ie=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,X.__webglTexture),Ie(ie,ee),re(k.__webglFramebuffer,w,ee,i.COLOR_ATTACHMENT0+O,ie,0),g(ee)&&f(ie)}t.unbindTexture()}else{let O=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(O=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(O,F.__webglTexture),Ie(O,_),_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)re(k.__webglFramebuffer[$],w,_,i.COLOR_ATTACHMENT0,O,$);else re(k.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,O,0);g(_)&&f(O),t.unbindTexture()}w.depthBuffer&&De(w)}function qe(w){let _=w.textures;for(let k=0,F=_.length;k<F;k++){let N=_[k];if(g(N)){let D=S(w),J=n.get(N).__webglTexture;t.bindTexture(D,J),f(D),t.unbindTexture()}}}let Ue=[],Ce=[];function Ae(w){if(w.samples>0){if(Se(w)===!1){let _=w.textures,k=w.width,F=w.height,N=i.COLOR_BUFFER_BIT,D=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=n.get(w),O=_.length>1;if(O)for(let ee=0;ee<_.length;ee++)t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer);let $=w.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let ee=0;ee<_.length;ee++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(N|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(N|=i.STENCIL_BUFFER_BIT)),O){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,J.__webglColorRenderbuffer[ee]);let X=n.get(_[ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,X,0)}i.blitFramebuffer(0,0,k,F,0,0,k,F,N,i.NEAREST),c===!0&&(Ue.length=0,Ce.length=0,Ue.push(i.COLOR_ATTACHMENT0+ee),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ue.push(D),Ce.push(D),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),O)for(let ee=0;ee<_.length;ee++){t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,J.__webglColorRenderbuffer[ee]);let X=n.get(_[ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,X,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function nt(w){return Math.min(s.maxSamples,w.samples)}function Se(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function V(w){let _=o.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function ce(w,_){let k=w.colorSpace,F=w.format,N=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Ri&&k!==jn&&(Qe.getTransfer(k)===it?(F!==pn||N!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function Le(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=L,this.setTexture2D=q,this.setTexture2DArray=Z,this.setTexture3D=se,this.setTextureCube=W,this.rebindTextures=Be,this.setupRenderTarget=P,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Se}function Mx(i,e){function t(n,s=jn){let r,o=Qe.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ac)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rc)return i.BYTE;if(n===oc)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===da)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ys)return i.HALF_FLOAT;if(n===cc)return i.ALPHA;if(n===hc)return i.RGB;if(n===pn)return i.RGBA;if(n===hs)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===ma)return i.RED;if(n===ga)return i.RED_INTEGER;if(n===uc)return i.RG;if(n===xa)return i.RG_INTEGER;if(n===_a)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ur||n===Fr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===va||n===ya||n===Ma||n===ba)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sa||n===Ea||n===Ta)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sa||n===Ea)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ta)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wa||n===Aa||n===Ra||n===Ca||n===Ia||n===Pa||n===La||n===Da||n===Ua||n===Fa||n===Na||n===Oa||n===Ba||n===za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Aa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ra)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ca)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ia)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===La)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Da)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ua)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Na)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ba)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===za)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ka||n===Ha||n===Va)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ka)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ga||n===Wa||n===Xa||n===qa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ga)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var bx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sx=`
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

}`,Dc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ur(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Rt({vertexShader:bx,fragmentShader:Sx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new Kt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uc=class extends $n{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,m=null,x=typeof XRWebGLBinding<"u",g=new Dc,f={},S=t.getContextAttributes(),E=null,v=null,R=[],b=[],A=new xe,I=null,y=new Ct;y.viewport=new mt;let M=new Ct;M.viewport=new mt;let C=[y,M],L=new jo,z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=R[j];return ne===void 0&&(ne=new fs,R[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=R[j];return ne===void 0&&(ne=new fs,R[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=R[j];return ne===void 0&&(ne=new fs,R[j]=ne),ne.getHandSpace()};function q(j){let ne=b.indexOf(j.inputSource);if(ne===-1)return;let re=R[ne];re!==void 0&&(re.update(j.inputSource,j.frame,l||o),re.dispatchEvent({type:j.type,data:j.inputSource}))}function Z(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",se);for(let j=0;j<R.length;j++){let ne=b[j];ne!==null&&(b[j]=null,R[j].disconnect(ne))}z=null,Y=null,g.reset();for(let j in f)delete f[j];e.setRenderTarget(E),p=null,u=null,d=null,s=null,v=null,ye.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",se),S.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,we=null,Me=null;S.depth&&(Me=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=S.stencil?bs:hs,we=S.stencil?Ms:mi);let De={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(De),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new In(u.textureWidth,u.textureHeight,{format:pn,type:Sn,depthTexture:new hr(u.textureWidth,u.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let re={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new In(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ye.setContext(s),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function se(j){for(let ne=0;ne<j.removed.length;ne++){let re=j.removed[ne],we=b.indexOf(re);we>=0&&(b[we]=null,R[we].disconnect(re))}for(let ne=0;ne<j.added.length;ne++){let re=j.added[ne],we=b.indexOf(re);if(we===-1){for(let De=0;De<R.length;De++)if(De>=b.length){b.push(re),we=De;break}else if(b[De]===null){b[De]=re,we=De;break}if(we===-1)break}let Me=R[we];Me&&Me.connect(re)}}let W=new U,oe=new U;function ue(j,ne,re){W.setFromMatrixPosition(ne.matrixWorld),oe.setFromMatrixPosition(re.matrixWorld);let we=W.distanceTo(oe),Me=ne.projectionMatrix.elements,De=re.projectionMatrix.elements,Be=Me[14]/(Me[10]-1),P=Me[14]/(Me[10]+1),qe=(Me[9]+1)/Me[5],Ue=(Me[9]-1)/Me[5],Ce=(Me[8]-1)/Me[0],Ae=(De[8]+1)/De[0],nt=Be*Ce,Se=Be*Ae,V=we/(-Ce+Ae),ce=V*-Ce;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ce),j.translateZ(V),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Me[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let Le=Be+V,w=P+V,_=nt-ce,k=Se+(we-ce),F=qe*P/w*Le,N=Ue*P/w*Le;j.projectionMatrix.makePerspective(_,k,F,N,Le,w),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function pe(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ne=j.near,re=j.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(re=g.depthFar)),L.near=M.near=y.near=ne,L.far=M.far=y.far=re,(z!==L.near||Y!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,Y=L.far),L.layers.mask=j.layers.mask|6,y.layers.mask=L.layers.mask&3,M.layers.mask=L.layers.mask&5;let we=j.parent,Me=L.cameras;pe(L,we);for(let De=0;De<Me.length;De++)pe(Me[De],we);Me.length===2?ue(L,y,M):L.projectionMatrix.copy(y.projectionMatrix),Ie(j,L,we)};function Ie(j,ne,re){re===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(re.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=wo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(j){return f[j]};let ze=null;function We(j,ne){if(h=ne.getViewerPose(l||o),m=ne,h!==null){let re=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let we=!1;re.length!==L.cameras.length&&(L.cameras.length=0,we=!0);for(let P=0;P<re.length;P++){let qe=re[P],Ue=null;if(p!==null)Ue=p.getViewport(qe);else{let Ae=d.getViewSubImage(u,qe);Ue=Ae.viewport,P===0&&(e.setRenderTargetTextures(v,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(v))}let Ce=C[P];Ce===void 0&&(Ce=new Ct,Ce.layers.enable(P),Ce.viewport=new mt,C[P]=Ce),Ce.matrix.fromArray(qe.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(qe.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),P===0&&(L.matrix.copy(Ce.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),we===!0&&L.cameras.push(Ce)}let Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let P=d.getDepthInformation(re[0]);P&&P.isValid&&P.texture&&g.init(P,s.renderState)}if(Me&&Me.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let P=0;P<re.length;P++){let qe=re[P].camera;if(qe){let Ue=f[qe];Ue||(Ue=new ur,f[qe]=Ue);let Ce=d.getCameraImage(qe);Ue.sourceTexture=Ce}}}}for(let re=0;re<R.length;re++){let we=b[re],Me=R[re];we!==null&&Me!==void 0&&Me.update(we,ne,l||o)}ze&&ze(j,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),m=null}let ye=new rd;ye.setAnimationLoop(We),this.setAnimationLoop=function(j){ze=j},this.dispose=function(){}}},Fi=new bn,Ex=new et;function Tx(i,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,gc(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,S,E,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),d(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f)):f.isMeshStandardMaterial?(r(g,f),u(g,f),f.isMeshPhysicalMaterial&&p(g,f,v)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),x(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(o(g,f),f.isLineDashedMaterial&&a(g,f)):f.isPointsMaterial?c(g,f,S,E):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===qt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===qt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let S=e.get(f),E=S.envMap,v=S.envMapRotation;E&&(g.envMap.value=E,Fi.copy(v),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),g.envMapRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(Fi)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function o(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function a(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,S,E){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*S,g.scale.value=E*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,S){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function x(g,f){let S=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function wx(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,E){let v=E.program;n.uniformBlockBinding(S,v)}function l(S,E){let v=s[S.id];v===void 0&&(m(S),v=h(S),s[S.id]=v,S.addEventListener("dispose",g));let R=E.program;n.updateUBOMapping(S,R);let b=e.render.frame;r[S.id]!==b&&(u(S),r[S.id]=b)}function h(S){let E=d();S.__bindingPointIndex=E;let v=i.createBuffer(),R=S.__size,b=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){let E=s[S.id],v=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let b=0,A=v.length;b<A;b++){let I=Array.isArray(v[b])?v[b]:[v[b]];for(let y=0,M=I.length;y<M;y++){let C=I[y];if(p(C,b,y,R)===!0){let L=C.__offset,z=Array.isArray(C.value)?C.value:[C.value],Y=0;for(let q=0;q<z.length;q++){let Z=z[q],se=x(Z);typeof Z=="number"||typeof Z=="boolean"?(C.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,L+Y,C.__data)):Z.isMatrix3?(C.__data[0]=Z.elements[0],C.__data[1]=Z.elements[1],C.__data[2]=Z.elements[2],C.__data[3]=0,C.__data[4]=Z.elements[3],C.__data[5]=Z.elements[4],C.__data[6]=Z.elements[5],C.__data[7]=0,C.__data[8]=Z.elements[6],C.__data[9]=Z.elements[7],C.__data[10]=Z.elements[8],C.__data[11]=0):(Z.toArray(C.__data,Y),Y+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,E,v,R){let b=S.value,A=E+"_"+v;if(R[A]===void 0)return typeof b=="number"||typeof b=="boolean"?R[A]=b:R[A]=b.clone(),!0;{let I=R[A];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return R[A]=b,!0}else if(I.equals(b)===!1)return I.copy(b),!0}return!1}function m(S){let E=S.uniforms,v=0,R=16;for(let A=0,I=E.length;A<I;A++){let y=Array.isArray(E[A])?E[A]:[E[A]];for(let M=0,C=y.length;M<C;M++){let L=y[M],z=Array.isArray(L.value)?L.value:[L.value];for(let Y=0,q=z.length;Y<q;Y++){let Z=z[Y],se=x(Z),W=v%R,oe=W%se.boundary,ue=W+oe;v+=oe,ue!==0&&R-ue<se.storage&&(v+=R-ue),L.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=v,v+=se.storage}}}let b=v%R;return b>0&&(v+=R-b),S.__size=v,S.__cache={},this}function x(S){let E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),E}function g(S){let E=S.target;E.removeEventListener("dispose",g);let v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Qa=class{constructor(e={}){let{canvas:t=wu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,f=null,S=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,R=!1;this._outputColorSpace=ht;let b=0,A=0,I=null,y=-1,M=null,C=new mt,L=new mt,z=null,Y=new He(0),q=0,Z=t.width,se=t.height,W=1,oe=null,ue=null,pe=new mt(0,0,Z,se),Ie=new mt(0,0,Z,se),ze=!1,We=new ms,ye=!1,j=!1,ne=new et,re=new U,we=new mt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},De=!1;function Be(){return I===null?W:1}let P=n;function qe(T,H){return t.getContext(T,H)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",le,!1),P===null){let H="webgl2";if(P=qe(H,T),P===null)throw qe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ue,Ce,Ae,nt,Se,V,ce,Le,w,_,k,F,N,D,J,O,$,ee,X,ie,de,ge,fe,Ne;function B(){Ue=new Wg(P),Ue.init(),ge=new Mx(P,Ue),Ce=new Og(P,Ue,e,ge),Ae=new vx(P,Ue),Ce.reversedDepthBuffer&&u&&Ae.buffers.depth.setReversed(!0),nt=new Yg(P),Se=new ox,V=new yx(P,Ue,Ae,Se,Ce,ge,nt),ce=new zg(v),Le=new Gg(v),w=new jf(P),fe=new Fg(P,w),_=new Xg(P,w,nt,fe),k=new Zg(P,_,w,nt),X=new $g(P,Ce,V),O=new Bg(Se),F=new rx(v,ce,Le,Ue,Ce,fe,O),N=new Tx(v,Se),D=new lx,J=new px(Ue),ee=new Ug(v,ce,Le,Ae,k,p,c),$=new xx(v,k,Ce),Ne=new wx(P,nt,Ce,Ae),ie=new Ng(P,Ue,nt),de=new qg(P,Ue,nt),nt.programs=F.programs,v.capabilities=Ce,v.extensions=Ue,v.properties=Se,v.renderLists=D,v.shadowMap=$,v.state=Ae,v.info=nt}B();let ae=new Uc(v,P);this.xr=ae,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let T=Ue.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Ue.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(Z,se,!1))},this.getSize=function(T){return T.set(Z,se)},this.setSize=function(T,H,K=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=T,se=H,t.width=Math.floor(T*W),t.height=Math.floor(H*W),K===!0&&(t.style.width=T+"px",t.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(Z*W,se*W).floor()},this.setDrawingBufferSize=function(T,H,K){Z=T,se=H,W=K,t.width=Math.floor(T*K),t.height=Math.floor(H*K),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(pe)},this.setViewport=function(T,H,K,Q){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,H,K,Q),Ae.viewport(C.copy(pe).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Ie)},this.setScissor=function(T,H,K,Q){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,H,K,Q),Ae.scissor(L.copy(Ie).multiplyScalar(W).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(T){Ae.setScissorTest(ze=T)},this.setOpaqueSort=function(T){oe=T},this.setTransparentSort=function(T){ue=T},this.getClearColor=function(T){return T.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(T=!0,H=!0,K=!0){let Q=0;if(T){let G=!1;if(I!==null){let he=I.texture.format;G=he===_a||he===xa||he===ga}if(G){let he=I.texture.type,be=he===Sn||he===mi||he===vs||he===Ms||he===fa||he===pa,Re=ee.getClearColor(),Te=ee.getClearAlpha(),Oe=Re.r,ke=Re.g,Pe=Re.b;be?(m[0]=Oe,m[1]=ke,m[2]=Pe,m[3]=Te,P.clearBufferuiv(P.COLOR,0,m)):(x[0]=Oe,x[1]=ke,x[2]=Pe,x[3]=Te,P.clearBufferiv(P.COLOR,0,x))}else Q|=P.COLOR_BUFFER_BIT}H&&(Q|=P.DEPTH_BUFFER_BIT),K&&(Q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",le,!1),ee.dispose(),D.dispose(),J.dispose(),Se.dispose(),ce.dispose(),Le.dispose(),k.dispose(),fe.dispose(),Ne.dispose(),F.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",wn),ae.removeEventListener("sessionend",Yc),xi.stop()};function me(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let T=nt.autoReset,H=$.enabled,K=$.autoUpdate,Q=$.needsUpdate,G=$.type;B(),nt.autoReset=T,$.enabled=H,$.autoUpdate=K,$.needsUpdate=Q,$.type=G}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function te(T){let H=T.target;H.removeEventListener("dispose",te),ve(H)}function ve(T){Ve(T),Se.remove(T)}function Ve(T){let H=Se.get(T).programs;H!==void 0&&(H.forEach(function(K){F.releaseProgram(K)}),T.isShaderMaterial&&F.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,K,Q,G,he){H===null&&(H=Me);let be=G.isMesh&&G.matrixWorld.determinant()<0,Re=zd(T,H,K,Q,G);Ae.setMaterial(Q,be);let Te=K.index,Oe=1;if(Q.wireframe===!0){if(Te=_.getWireframeAttribute(K),Te===void 0)return;Oe=2}let ke=K.drawRange,Pe=K.attributes.position,Je=ke.start*Oe,st=(ke.start+ke.count)*Oe;he!==null&&(Je=Math.max(Je,he.start*Oe),st=Math.min(st,(he.start+he.count)*Oe)),Te!==null?(Je=Math.max(Je,0),st=Math.min(st,Te.count)):Pe!=null&&(Je=Math.max(Je,0),st=Math.min(st,Pe.count));let xt=st-Je;if(xt<0||xt===1/0)return;fe.setup(G,Q,Re,K,Te);let lt,ot=ie;if(Te!==null&&(lt=w.get(Te),ot=de,ot.setIndex(lt)),G.isMesh)Q.wireframe===!0?(Ae.setLineWidth(Q.wireframeLinewidth*Be()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(G.isLine){let Fe=Q.linewidth;Fe===void 0&&(Fe=1),Ae.setLineWidth(Fe*Be()),G.isLineSegments?ot.setMode(P.LINES):G.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else G.isPoints?ot.setMode(P.POINTS):G.isSprite&&ot.setMode(P.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)us("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))ot.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Fe=G._multiDrawStarts,dt=G._multiDrawCounts,je=G._multiDrawCount,en=Te?w.get(Te).bytesPerElement:1,Hi=Se.get(Q).currentProgram.getUniforms();for(let tn=0;tn<je;tn++)Hi.setValue(P,"_gl_DrawID",tn),ot.render(Fe[tn]/en,dt[tn])}else if(G.isInstancedMesh)ot.renderInstances(Je,xt,G.count);else if(K.isInstancedBufferGeometry){let Fe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,dt=Math.min(K.instanceCount,Fe);ot.renderInstances(Je,xt,dt)}else ot.render(Je,xt)};function at(T,H,K){T.transparent===!0&&T.side===Yt&&T.forceSinglePass===!1?(T.side=qt,T.needsUpdate=!0,Gr(T,H,K),T.side=qn,T.needsUpdate=!0,Gr(T,H,K),T.side=Yt):Gr(T,H,K)}this.compile=function(T,H,K=null){K===null&&(K=T),f=J.get(K),f.init(H),E.push(f),K.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),T!==K&&T.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),f.setupLights();let Q=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let he=G.material;if(he)if(Array.isArray(he))for(let be=0;be<he.length;be++){let Re=he[be];at(Re,K,G),Q.add(Re)}else at(he,K,G),Q.add(he)}),f=E.pop(),Q},this.compileAsync=function(T,H,K=null){let Q=this.compile(T,H,K);return new Promise(G=>{function he(){if(Q.forEach(function(be){Se.get(be).currentProgram.isReady()&&Q.delete(be)}),Q.size===0){G(T);return}setTimeout(he,10)}Ue.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let tt=null;function Nn(T){tt&&tt(T)}function wn(){xi.stop()}function Yc(){xi.start()}let xi=new rd;xi.setAnimationLoop(Nn),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(T){tt=T,ae.setAnimationLoop(T),T===null?xi.stop():xi.start()},ae.addEventListener("sessionstart",wn),ae.addEventListener("sessionend",Yc),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(H),H=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,H,I),f=J.get(T,E.length),f.init(H),E.push(f),ne.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),We.setFromProjectionMatrix(ne,yn,H.reversedDepth),j=this.localClippingEnabled,ye=O.init(this.clippingPlanes,j),g=D.get(T,S.length),g.init(),S.push(g),ae.enabled===!0&&ae.isPresenting===!0){let he=v.xr.getDepthSensingMesh();he!==null&&hl(he,H,-1/0,v.sortObjects)}hl(T,H,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(oe,ue),De=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,De&&ee.addToRenderList(g,T),this.info.render.frame++,ye===!0&&O.beginShadows();let K=f.state.shadowsArray;$.render(K,T,H),ye===!0&&O.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=g.opaque,G=g.transmissive;if(f.setupLights(),H.isArrayCamera){let he=H.cameras;if(G.length>0)for(let be=0,Re=he.length;be<Re;be++){let Te=he[be];Zc(Q,G,T,Te)}De&&ee.render(T);for(let be=0,Re=he.length;be<Re;be++){let Te=he[be];$c(g,T,Te,Te.viewport)}}else G.length>0&&Zc(Q,G,T,H),De&&ee.render(T),$c(g,T,H);I!==null&&A===0&&(V.updateMultisampleRenderTarget(I),V.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(v,T,H),fe.resetDefaultState(),y=-1,M=null,E.pop(),E.length>0?(f=E[E.length-1],ye===!0&&O.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function hl(T,H,K,Q){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||We.intersectsSprite(T)){Q&&we.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ne);let be=k.update(T),Re=T.material;Re.visible&&g.push(T,be,Re,K,we.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||We.intersectsObject(T))){let be=k.update(T),Re=T.material;if(Q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),we.copy(T.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),we.copy(be.boundingSphere.center)),we.applyMatrix4(T.matrixWorld).applyMatrix4(ne)),Array.isArray(Re)){let Te=be.groups;for(let Oe=0,ke=Te.length;Oe<ke;Oe++){let Pe=Te[Oe],Je=Re[Pe.materialIndex];Je&&Je.visible&&g.push(T,be,Je,K,we.z,Pe)}}else Re.visible&&g.push(T,be,Re,K,we.z,null)}}let he=T.children;for(let be=0,Re=he.length;be<Re;be++)hl(he[be],H,K,Q)}function $c(T,H,K,Q){let G=T.opaque,he=T.transmissive,be=T.transparent;f.setupLightsView(K),ye===!0&&O.setGlobalState(v.clippingPlanes,K),Q&&Ae.viewport(C.copy(Q)),G.length>0&&Vr(G,H,K),he.length>0&&Vr(he,H,K),be.length>0&&Vr(be,H,K),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Zc(T,H,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Q.id]===void 0&&(f.state.transmissionRenderTarget[Q.id]=new In(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?ys:Sn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));let he=f.state.transmissionRenderTarget[Q.id],be=Q.viewport||C;he.setSize(be.z*v.transmissionResolutionScale,be.w*v.transmissionResolutionScale);let Re=v.getRenderTarget(),Te=v.getActiveCubeFace(),Oe=v.getActiveMipmapLevel();v.setRenderTarget(he),v.getClearColor(Y),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),De&&ee.render(K);let ke=v.toneMapping;v.toneMapping=Qn;let Pe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),f.setupLightsView(Q),ye===!0&&O.setGlobalState(v.clippingPlanes,Q),Vr(T,K,Q),V.updateMultisampleRenderTarget(he),V.updateRenderTargetMipmap(he),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let st=0,xt=H.length;st<xt;st++){let lt=H[st],ot=lt.object,Fe=lt.geometry,dt=lt.material,je=lt.group;if(dt.side===Yt&&ot.layers.test(Q.layers)){let en=dt.side;dt.side=qt,dt.needsUpdate=!0,Jc(ot,K,Q,Fe,dt,je),dt.side=en,dt.needsUpdate=!0,Je=!0}}Je===!0&&(V.updateMultisampleRenderTarget(he),V.updateRenderTargetMipmap(he))}v.setRenderTarget(Re,Te,Oe),v.setClearColor(Y,q),Pe!==void 0&&(Q.viewport=Pe),v.toneMapping=ke}function Vr(T,H,K){let Q=H.isScene===!0?H.overrideMaterial:null;for(let G=0,he=T.length;G<he;G++){let be=T[G],Re=be.object,Te=be.geometry,Oe=be.group,ke=be.material;ke.allowOverride===!0&&Q!==null&&(ke=Q),Re.layers.test(K.layers)&&Jc(Re,H,K,Te,ke,Oe)}}function Jc(T,H,K,Q,G,he){T.onBeforeRender(v,H,K,Q,G,he),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(v,H,K,Q,T,he),G.transparent===!0&&G.side===Yt&&G.forceSinglePass===!1?(G.side=qt,G.needsUpdate=!0,v.renderBufferDirect(K,H,Q,G,T,he),G.side=qn,G.needsUpdate=!0,v.renderBufferDirect(K,H,Q,G,T,he),G.side=Yt):v.renderBufferDirect(K,H,Q,G,T,he),T.onAfterRender(v,H,K,Q,G,he)}function Gr(T,H,K){H.isScene!==!0&&(H=Me);let Q=Se.get(T),G=f.state.lights,he=f.state.shadowsArray,be=G.state.version,Re=F.getParameters(T,G.state,he,H,K),Te=F.getProgramCacheKey(Re),Oe=Q.programs;Q.environment=T.isMeshStandardMaterial?H.environment:null,Q.fog=H.fog,Q.envMap=(T.isMeshStandardMaterial?Le:ce).get(T.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Oe===void 0&&(T.addEventListener("dispose",te),Oe=new Map,Q.programs=Oe);let ke=Oe.get(Te);if(ke!==void 0){if(Q.currentProgram===ke&&Q.lightsStateVersion===be)return Qc(T,Re),ke}else Re.uniforms=F.getUniforms(T),T.onBeforeCompile(Re,v),ke=F.acquireProgram(Re,Te),Oe.set(Te,ke),Q.uniforms=Re.uniforms;let Pe=Q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Pe.clippingPlanes=O.uniform),Qc(T,Re),Q.needsLights=Hd(T),Q.lightsStateVersion=be,Q.needsLights&&(Pe.ambientLightColor.value=G.state.ambient,Pe.lightProbe.value=G.state.probe,Pe.directionalLights.value=G.state.directional,Pe.directionalLightShadows.value=G.state.directionalShadow,Pe.spotLights.value=G.state.spot,Pe.spotLightShadows.value=G.state.spotShadow,Pe.rectAreaLights.value=G.state.rectArea,Pe.ltc_1.value=G.state.rectAreaLTC1,Pe.ltc_2.value=G.state.rectAreaLTC2,Pe.pointLights.value=G.state.point,Pe.pointLightShadows.value=G.state.pointShadow,Pe.hemisphereLights.value=G.state.hemi,Pe.directionalShadowMap.value=G.state.directionalShadowMap,Pe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Pe.spotShadowMap.value=G.state.spotShadowMap,Pe.spotLightMatrix.value=G.state.spotLightMatrix,Pe.spotLightMap.value=G.state.spotLightMap,Pe.pointShadowMap.value=G.state.pointShadowMap,Pe.pointShadowMatrix.value=G.state.pointShadowMatrix),Q.currentProgram=ke,Q.uniformsList=null,ke}function Kc(T){if(T.uniformsList===null){let H=T.currentProgram.getUniforms();T.uniformsList=Ts.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function Qc(T,H){let K=Se.get(T);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function zd(T,H,K,Q,G){H.isScene!==!0&&(H=Me),V.resetTextureUnits();let he=H.fog,be=Q.isMeshStandardMaterial?H.environment:null,Re=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ri,Te=(Q.isMeshStandardMaterial?Le:ce).get(Q.envMap||be),Oe=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ke=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Pe=!!K.morphAttributes.position,Je=!!K.morphAttributes.normal,st=!!K.morphAttributes.color,xt=Qn;Q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(xt=v.toneMapping);let lt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ot=lt!==void 0?lt.length:0,Fe=Se.get(Q),dt=f.state.lights;if(ye===!0&&(j===!0||T!==M)){let Bt=T===M&&Q.id===y;O.setState(Q,T,Bt)}let je=!1;Q.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==dt.state.version||Fe.outputColorSpace!==Re||G.isBatchedMesh&&Fe.batching===!1||!G.isBatchedMesh&&Fe.batching===!0||G.isBatchedMesh&&Fe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Fe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Fe.instancing===!1||!G.isInstancedMesh&&Fe.instancing===!0||G.isSkinnedMesh&&Fe.skinning===!1||!G.isSkinnedMesh&&Fe.skinning===!0||G.isInstancedMesh&&Fe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Fe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Fe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Fe.instancingMorph===!1&&G.morphTexture!==null||Fe.envMap!==Te||Q.fog===!0&&Fe.fog!==he||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==O.numPlanes||Fe.numIntersection!==O.numIntersection)||Fe.vertexAlphas!==Oe||Fe.vertexTangents!==ke||Fe.morphTargets!==Pe||Fe.morphNormals!==Je||Fe.morphColors!==st||Fe.toneMapping!==xt||Fe.morphTargetsCount!==ot)&&(je=!0):(je=!0,Fe.__version=Q.version);let en=Fe.currentProgram;je===!0&&(en=Gr(Q,H,G));let Hi=!1,tn=!1,Us=!1,ft=en.getUniforms(),ln=Fe.uniforms;if(Ae.useProgram(en.program)&&(Hi=!0,tn=!0,Us=!0),Q.id!==y&&(y=Q.id,tn=!0),Hi||M!==T){Ae.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ft.setValue(P,"projectionMatrix",T.projectionMatrix),ft.setValue(P,"viewMatrix",T.matrixWorldInverse);let $t=ft.map.cameraPosition;$t!==void 0&&$t.setValue(P,re.setFromMatrixPosition(T.matrixWorld)),Ce.logarithmicDepthBuffer&&ft.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&ft.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,tn=!0,Us=!0)}if(G.isSkinnedMesh){ft.setOptional(P,G,"bindMatrix"),ft.setOptional(P,G,"bindMatrixInverse");let Bt=G.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),ft.setValue(P,"boneTexture",Bt.boneTexture,V))}G.isBatchedMesh&&(ft.setOptional(P,G,"batchingTexture"),ft.setValue(P,"batchingTexture",G._matricesTexture,V),ft.setOptional(P,G,"batchingIdTexture"),ft.setValue(P,"batchingIdTexture",G._indirectTexture,V),ft.setOptional(P,G,"batchingColorTexture"),G._colorsTexture!==null&&ft.setValue(P,"batchingColorTexture",G._colorsTexture,V));let cn=K.morphAttributes;if((cn.position!==void 0||cn.normal!==void 0||cn.color!==void 0)&&X.update(G,K,en),(tn||Fe.receiveShadow!==G.receiveShadow)&&(Fe.receiveShadow=G.receiveShadow,ft.setValue(P,"receiveShadow",G.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(ln.envMap.value=Te,ln.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&H.environment!==null&&(ln.envMapIntensity.value=H.environmentIntensity),tn&&(ft.setValue(P,"toneMappingExposure",v.toneMappingExposure),Fe.needsLights&&kd(ln,Us),he&&Q.fog===!0&&N.refreshFogUniforms(ln,he),N.refreshMaterialUniforms(ln,Q,W,se,f.state.transmissionRenderTarget[T.id]),Ts.upload(P,Kc(Fe),ln,V)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Ts.upload(P,Kc(Fe),ln,V),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&ft.setValue(P,"center",G.center),ft.setValue(P,"modelViewMatrix",G.modelViewMatrix),ft.setValue(P,"normalMatrix",G.normalMatrix),ft.setValue(P,"modelMatrix",G.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let Bt=Q.uniformsGroups;for(let $t=0,ul=Bt.length;$t<ul;$t++){let _i=Bt[$t];Ne.update(_i,en),Ne.bind(_i,en)}}return en}function kd(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function Hd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,H,K){let Q=Se.get(T);Q.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),Se.get(T.texture).__webglTexture=H,Se.get(T.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:K,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,H){let K=Se.get(T);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0};let Vd=P.createFramebuffer();this.setRenderTarget=function(T,H=0,K=0){I=T,b=H,A=K;let Q=!0,G=null,he=!1,be=!1;if(T){let Te=Se.get(T);if(Te.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(P.FRAMEBUFFER,null),Q=!1;else if(Te.__webglFramebuffer===void 0)V.setupRenderTarget(T);else if(Te.__hasExternalTextures)V.rebindTextures(T,Se.get(T.texture).__webglTexture,Se.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Pe=T.depthTexture;if(Te.__boundDepthTexture!==Pe){if(Pe!==null&&Se.has(Pe)&&(T.width!==Pe.image.width||T.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");V.setupDepthRenderbuffer(T)}}let Oe=T.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(be=!0);let ke=Se.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[H])?G=ke[H][K]:G=ke[H],he=!0):T.samples>0&&V.useMultisampledRTT(T)===!1?G=Se.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?G=ke[K]:G=ke,C.copy(T.viewport),L.copy(T.scissor),z=T.scissorTest}else C.copy(pe).multiplyScalar(W).floor(),L.copy(Ie).multiplyScalar(W).floor(),z=ze;if(K!==0&&(G=Vd),Ae.bindFramebuffer(P.FRAMEBUFFER,G)&&Q&&Ae.drawBuffers(T,G),Ae.viewport(C),Ae.scissor(L),Ae.setScissorTest(z),he){let Te=Se.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+H,Te.__webglTexture,K)}else if(be){let Te=H;for(let Oe=0;Oe<T.textures.length;Oe++){let ke=Se.get(T.textures[Oe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Oe,ke.__webglTexture,K,Te)}}else if(T!==null&&K!==0){let Te=Se.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Te.__webglTexture,K)}y=-1},this.readRenderTargetPixels=function(T,H,K,Q,G,he,be,Re=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){Ae.bindFramebuffer(P.FRAMEBUFFER,Te);try{let Oe=T.textures[Re],ke=Oe.format,Pe=Oe.type;if(!Ce.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-Q&&K>=0&&K<=T.height-G&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(H,K,Q,G,ge.convert(ke),ge.convert(Pe),he))}finally{let Oe=I!==null?Se.get(I).__webglFramebuffer:null;Ae.bindFramebuffer(P.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(T,H,K,Q,G,he,be,Re=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=Se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te)if(H>=0&&H<=T.width-Q&&K>=0&&K<=T.height-G){Ae.bindFramebuffer(P.FRAMEBUFFER,Te);let Oe=T.textures[Re],ke=Oe.format,Pe=Oe.type;if(!Ce.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Je=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Je),P.bufferData(P.PIXEL_PACK_BUFFER,he.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(H,K,Q,G,ge.convert(ke),ge.convert(Pe),0);let st=I!==null?Se.get(I).__webglFramebuffer:null;Ae.bindFramebuffer(P.FRAMEBUFFER,st);let xt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Au(P,xt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Je),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,he),P.deleteBuffer(Je),P.deleteSync(xt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,H=null,K=0){let Q=Math.pow(2,-K),G=Math.floor(T.image.width*Q),he=Math.floor(T.image.height*Q),be=H!==null?H.x:0,Re=H!==null?H.y:0;V.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,K,0,0,be,Re,G,he),Ae.unbindTexture()};let Gd=P.createFramebuffer(),Wd=P.createFramebuffer();this.copyTextureToTexture=function(T,H,K=null,Q=null,G=0,he=null){he===null&&(G!==0?(us("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=G,G=0):he=0);let be,Re,Te,Oe,ke,Pe,Je,st,xt,lt=T.isCompressedTexture?T.mipmaps[he]:T.image;if(K!==null)be=K.max.x-K.min.x,Re=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Oe=K.min.x,ke=K.min.y,Pe=K.isBox3?K.min.z:0;else{let cn=Math.pow(2,-G);be=Math.floor(lt.width*cn),Re=Math.floor(lt.height*cn),T.isDataArrayTexture?Te=lt.depth:T.isData3DTexture?Te=Math.floor(lt.depth*cn):Te=1,Oe=0,ke=0,Pe=0}Q!==null?(Je=Q.x,st=Q.y,xt=Q.z):(Je=0,st=0,xt=0);let ot=ge.convert(H.format),Fe=ge.convert(H.type),dt;H.isData3DTexture?(V.setTexture3D(H,0),dt=P.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(V.setTexture2DArray(H,0),dt=P.TEXTURE_2D_ARRAY):(V.setTexture2D(H,0),dt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment);let je=P.getParameter(P.UNPACK_ROW_LENGTH),en=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Hi=P.getParameter(P.UNPACK_SKIP_PIXELS),tn=P.getParameter(P.UNPACK_SKIP_ROWS),Us=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,lt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Oe),P.pixelStorei(P.UNPACK_SKIP_ROWS,ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pe);let ft=T.isDataArrayTexture||T.isData3DTexture,ln=H.isDataArrayTexture||H.isData3DTexture;if(T.isDepthTexture){let cn=Se.get(T),Bt=Se.get(H),$t=Se.get(cn.__renderTarget),ul=Se.get(Bt.__renderTarget);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,$t.__webglFramebuffer),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,ul.__webglFramebuffer);for(let _i=0;_i<Te;_i++)ft&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Se.get(T).__webglTexture,G,Pe+_i),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Se.get(H).__webglTexture,he,xt+_i)),P.blitFramebuffer(Oe,ke,be,Re,Je,st,be,Re,P.DEPTH_BUFFER_BIT,P.NEAREST);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||Se.has(T)){let cn=Se.get(T),Bt=Se.get(H);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,Gd),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,Wd);for(let $t=0;$t<Te;$t++)ft?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,cn.__webglTexture,G,Pe+$t):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,cn.__webglTexture,G),ln?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,he,xt+$t):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,he),G!==0?P.blitFramebuffer(Oe,ke,be,Re,Je,st,be,Re,P.COLOR_BUFFER_BIT,P.NEAREST):ln?P.copyTexSubImage3D(dt,he,Je,st,xt+$t,Oe,ke,be,Re):P.copyTexSubImage2D(dt,he,Je,st,Oe,ke,be,Re);Ae.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ln?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(dt,he,Je,st,xt,be,Re,Te,ot,Fe,lt.data):H.isCompressedArrayTexture?P.compressedTexSubImage3D(dt,he,Je,st,xt,be,Re,Te,ot,lt.data):P.texSubImage3D(dt,he,Je,st,xt,be,Re,Te,ot,Fe,lt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,he,Je,st,be,Re,ot,Fe,lt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,he,Je,st,lt.width,lt.height,ot,lt.data):P.texSubImage2D(P.TEXTURE_2D,he,Je,st,be,Re,ot,Fe,lt);P.pixelStorei(P.UNPACK_ROW_LENGTH,je),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,en),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Hi),P.pixelStorei(P.UNPACK_SKIP_ROWS,tn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Us),he===0&&H.generateMipmaps&&P.generateMipmap(dt),Ae.unbindTexture()},this.initRenderTarget=function(T){Se.get(T).__webglFramebuffer===void 0&&V.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?V.setTextureCube(T,0):T.isData3DTexture?V.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?V.setTexture2DArray(T,0):V.setTexture2D(T,0),Ae.unbindTexture()},this.resetState=function(){b=0,A=0,I=null,Ae.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}};function Qt(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var gt=(i,e,t)=>i<e?e:i>t?t:i,an=(i,e,t)=>i+(e-i)*t,Or=(i,e,t)=>{let n=gt((t-i)/(e-i||1e-6),0,1);return n*n*(3-2*n)},Rs=(i,e)=>1-Math.exp(-i*e);function Bi(i){return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}function hd(i){return"#"+i.toString(16).padStart(6,"0")}function zi(i,e){let t=document.createElement("canvas");t.width=i,t.height=e;let n=t.getContext("2d");return{c:t,g:n}}function ki(i,e={}){let t=new cr(i);return e.srgb!==!1&&(t.colorSpace=ht),e.repeat&&(t.wrapS=Ai,t.wrapT=Ai),t.anisotropy=4,t}var mn=11;function Nc(i,e){let t=gt(Math.round(i[0]*e),0,255),n=gt(Math.round(i[1]*e),0,255),s=gt(Math.round(i[2]*e),0,255);return`rgb(${t},${n},${s})`}function ud(i,e){let{c:t,g:n}=zi(e,e),s=Qt(11),r=u=>(u+mn)/(mn*2)*e,o=e/(mn*2);n.fillStyle="#9b7c59",n.fillRect(0,0,e,e);for(let u=0;u<2600;u++){let p=s()*e,m=s()*e,x=(2+s()*16)*(e/1024);n.fillStyle=s()<.5?`rgba(70,48,28,${.04+s()*.07})`:`rgba(206,170,128,${.04+s()*.07})`,n.beginPath(),n.arc(p,m,x,0,Math.PI*2),n.fill()}let a=1.9,c=[166,140,108];for(let u=-mn;u<mn;u+=a)for(let p=-mn;p<mn;p+=a){let m=u+a/2+(s()-.5)*a*.5,x=p+a/2+(s()-.5)*a*.5;if(Lt({x:m,z:x},i.poly)<.2)continue;let g=Math.hypot(m,x)/i.radius,f=6+Math.floor(s()*2),S=a*(.42+s()*.1),E=s()*Math.PI;n.beginPath();for(let v=0;v<f;v++){let R=E+v/f*Math.PI*2+(s()-.5)*.35,b=S*(.85+s()*.3),A=r(m+Math.cos(R)*b),I=r(x+Math.sin(R)*b);v===0?n.moveTo(A,I):n.lineTo(A,I)}n.closePath(),n.fillStyle=Nc(c,.88+s()*.22+(1-g)*-.03),n.globalAlpha=.42+g*.4,n.fill(),n.globalAlpha=.5,n.strokeStyle="rgba(62,44,28,0.75)",n.lineWidth=2.2*(e/1024),n.stroke(),n.globalAlpha=1}for(let u=0;u<160;u++){let p=(s()*2-1)*i.radius,m=(s()*2-1)*i.radius;if(Lt({x:p,z:m},i.poly)<.6)continue;let x=(.08+s()*.16)*o,g=x*(.6+s()*.3);n.fillStyle="rgba(40,28,18,0.35)",n.beginPath(),n.ellipse(r(p)+x*.25,r(m)+g*.45,x,g,s()*3,0,Math.PI*2),n.fill(),n.fillStyle=Nc([150,142,130],.8+s()*.4),n.beginPath(),n.ellipse(r(p),r(m),x,g,s()*3,0,Math.PI*2),n.fill()}let l=[96,116,52],h=(u,p,m)=>{let x=5+Math.floor(s()*6);for(let g=0;g<x;g++){let f=(s()-.5)*m*2,S=(s()-.5)*m*2,E=(.07+s()*.2)*o;n.fillStyle=Nc(l,.7+s()*.45),n.globalAlpha=.55+s()*.3,n.beginPath(),n.arc(r(u+f),r(p+S),E,0,Math.PI*2),n.fill()}n.globalAlpha=1};for(let u=0;u<2600;u++){let p=(s()*2-1)*i.radius*1.1,m=(s()*2-1)*i.radius*1.1,x=Lt({x:p,z:m},i.poly);if(x<0)continue;let g=x<2.6?Math.pow(1-x/2.6,1.4):.015;s()<g*.5&&h(p,m,.4)}for(let u of i.rocks){for(let p=0;p<22;p++){let m=s()*Math.PI*2,x=u.r*(.7+s()*.9);h(u.pos.x+Math.cos(m)*x,u.pos.z+Math.sin(m)*x,.35)}n.fillStyle="rgba(30,22,14,0.28)",n.beginPath(),n.arc(r(u.pos.x),r(u.pos.z),u.r*1.15*o,0,Math.PI*2),n.fill()}for(let u=0;u<70;u++){let p=(s()*2-1)*i.radius,m=(s()*2-1)*i.radius,x=Lt({x:p,z:m},i.poly);x<.4||x>3.2||(n.fillStyle="#f4f1e6",n.beginPath(),n.arc(r(p),r(m),.06*o,0,Math.PI*2),n.fill(),n.fillStyle="#e8c85a",n.beginPath(),n.arc(r(p),r(m),.025*o,0,Math.PI*2),n.fill())}n.save(),n.beginPath(),i.poly.forEach((u,p)=>p===0?n.moveTo(r(u.x),r(u.z)):n.lineTo(r(u.x),r(u.z))),n.closePath(),n.clip(),n.lineJoin="round";for(let[u,p]of[[1.4,.05],[1,.06],[.65,.08],[.35,.1]])n.strokeStyle=`rgba(34,24,14,${p})`,n.lineWidth=u*2*o,n.stroke();n.restore();let d=ki(t);return d.anisotropy=8,d}function dd(){let{c:e,g:t}=zi(256,256),n=Qt(23);t.fillStyle="#c2bbb0",t.fillRect(0,0,256,256);for(let s=0;s<900;s++){let r=n()*256,o=n()*256,a=2+n()*14;t.fillStyle=n()<.5?`rgba(40,36,34,${.04+n()*.1})`:`rgba(210,200,185,${.03+n()*.08})`;for(let c of[-256,0,256])t.beginPath(),t.arc(r+c,o,a,0,Math.PI*2),t.fill()}for(let s=0;s<26;s++){let r=n()*256;t.strokeStyle=`rgba(30,26,24,${.16+n()*.2})`,t.lineWidth=1+n()*2,t.beginPath();let o=r;t.moveTo(o,0);for(let a=0;a<=256;a+=16)o+=(n()-.5)*5,t.lineTo(o,a);t.stroke()}return ki(e,{repeat:!0})}function fd(){let{c:e,g:t}=zi(512,512),n=Qt(31);for(let s=0;s<70;s++){let r=n()*512,o=n()*512,a=30+n()*90;for(let c of[-512,0,512])for(let l of[-512,0,512]){let h=t.createRadialGradient(r+c,o+l,0,r+c,o+l,a);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=h,t.fillRect(r+c-a,o+l-a,a*2,a*2)}}return ki(e,{repeat:!0})}function pd(){let{c:e,g:t}=zi(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),ki(e)}function md(){let{c:t,g:n}=zi(256,64),s=n.createLinearGradient(0,0,256,0);s.addColorStop(0,"rgba(255,255,255,0)"),s.addColorStop(.65,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(255,255,255,1)");for(let o=0;o<64;o++){let a=Math.abs((o+.5)/64-.5)*2,c=Math.pow(1-a,1.6);n.globalAlpha=c,n.fillStyle=s,n.fillRect(0,o,256,1)}n.globalAlpha=1;let r=n.createLinearGradient(0,0,256,0);return r.addColorStop(.5,"rgba(255,255,255,0)"),r.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=r,n.fillRect(0,64/2-4,256,8),ki(t)}function gd(){let{c:t,g:n}=zi(256,64),s=n.createLinearGradient(0,0,256,0);return s.addColorStop(0,"rgba(255,255,255,0)"),s.addColorStop(.8,"rgba(255,255,255,0.7)"),s.addColorStop(1,"rgba(255,255,255,1)"),n.fillStyle=s,n.globalAlpha=.28,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.82,64/2-14),n.lineTo(256*.82,64/2+14),n.closePath(),n.fill(),n.globalAlpha=1,n.fillStyle=s,n.beginPath(),n.moveTo(0,64/2),n.lineTo(256*.84,64/2-4),n.lineTo(256*.84,64/2+4),n.closePath(),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(254,64/2),n.lineTo(256*.78,64/2-22),n.lineTo(256*.83,64/2),n.lineTo(256*.78,64/2+22),n.closePath(),n.fill(),n.globalAlpha=.5,n.fillRect(256*.55,64/2-1.5,256*.3,3),ki(t)}var xd=6984904,Ax=40,Rx=110,_d=-18;function Cx(){let i=Qt(77),e=[],t=[[-21.2,-10.2,-3,7,1.6],[-17.9,-10.4,-5,6,1.3],[-24.2,-8.8,-8,3.5,1.4],[23.6,-12.5,-6,4.5,1.5],[21.5,-13.5,-9,4,1.1]];for(let[r,o,a,c,l]of t)e.push({x:r,z:o,top:a,len:c,w:l,capH:.25+i()*.15,haze:.14,tier:0});for(let r=0;r<14;r++){let o=r%2===0?-1:1;e.push({x:o*(28+i()*8),z:-26+i()*14,top:-9-i()*5,len:0,w:1.6+i()*1.4,capH:.3+i()*.2,haze:.5,tier:1})}for(let r=0;r<16;r++){let o,a,c,l=2.6+i()*3;if(r<10)o=(r%2===0?-1:1)*(36+i()*14),a=-36+i()*20,c=-12-i()*4,l=2+i()*1.6;else{let h=Math.PI*(1.2+i()*.6),d=55+i()*20;o=Math.cos(h)*d,a=Math.sin(h)*d,c=-7+i()*15}e.push({x:o,z:a,top:c,len:0,w:l,capH:.4+i()*.3,haze:.66,tier:2})}let n=[],s=[[-27.9,-21.3,-9,1.6],[-31.1,-16.8,-13,1.3],[27.5,-20.7,-9,1.5],[32.2,-17.9,-13,1.2],[-36,-28,-10,2],[37,-30,-11,1.9]];for(let[r,o,a,c]of s)n.push({x:r,z:o,y:a,s:c,haze:.5});return{pillars:e,islets:n}}var vd=Cx(),el=new He,gi=(i,e,t)=>(el.setRGB(i,e,t,ht),[el.r,el.g,el.b]);function Oc(i,e){let t=e.x-i.x,n=e.z-i.z,s=Math.hypot(t,n)||1;return{x:n/s,z:-t/s}}function yd(i){let e=i.length;return i.map((t,n)=>{let s=Oc(i[(n+e-1)%e],i[n]),r=Oc(i[n],i[(n+1)%e]),o=s.x+r.x,a=s.z+r.z,c=Math.hypot(o,a)||1;return{x:o/c,z:a/c}})}var il=class{constructor(){this.pos=[];this.col=[];this.uv=[]}tri(e,t,n,s,r,o,a,c,l){this.pos.push(...e,...t,...n),this.col.push(...s,...r,...o),this.uv.push(...a,...c,...l)}quad(e,t,n){this.tri(e[0],e[1],e[2],t[0],t[1],t[2],n[0],n[1],n[2]),this.tri(e[0],e[2],e[3],t[0],t[2],t[3],n[0],n[2],n[3])}build(){let e=new yt;return e.setAttribute("position",new Ze(this.pos,3)),e.setAttribute("color",new Ze(this.col,3)),e.setAttribute("uv",new Ze(this.uv,2)),e.computeVertexNormals(),e}};function Ix(i){let e=new xs(i.poly.map(r=>new xe(r.x,-r.z))),t=new br(e,1);t.rotateX(-Math.PI/2);let n=t.getAttribute("position"),s=t.getAttribute("uv");for(let r=0;r<n.count;r++)s.setXY(r,(n.getX(r)+mn)/(mn*2),1-(n.getZ(r)+mn)/(mn*2));return t.computeVertexNormals(),t}function Px(i){let e=Qt(5),t=i.poly,n=t.length,s=new il,r=[.74,.71,.67],o=[.43,.52,.24],a=[.28,.3,.36],c=[{yTop:0,yBot:-5,sTop:1,sBot:.975},{yTop:-5,yBot:-13,sTop:.975,sBot:.58}],l=0,h=[];for(let m=0;m<n;m++)h.push(l),l+=Math.hypot(t[(m+1)%n].x-t[m].x,t[(m+1)%n].z-t[m].z);let d=[];c.forEach((m,x)=>{let g=[],f=[],S=[],E=[],v=[];for(let R=0;R<n;){let b=2+Math.floor(e()*2),A=.15+e()*.6,I=(m.yBot-m.yTop)*(x===0?1:.75+e()*.3),y=m.sBot*(.94+e()*.08),M=.8+e()*.32;for(let C=0;C<b&&R<n;C++,R++)f.push(A),S.push(I),E.push(y),v.push(M*(.97+e()*.06))}for(let R=0;R<n;R++){let b=t[R],A=t[(R+1)%n],I=Oc(b,A),y=x===0?f[R]:d[R]-.05-e()*.4;x===0&&d.push(y);let M=m.yTop+S[R],C=E[R],L=x===0?0:y,z=[b.x*m.sTop+I.x*L,m.yTop,b.z*m.sTop+I.z*L],Y=[A.x*m.sTop+I.x*L,m.yTop,A.z*m.sTop+I.z*L],q=[A.x*C+I.x*y,M,A.z*C+I.z*y],Z=[b.x*C+I.x*y,M,b.z*C+I.z*y];g.push([z,Y,q,Z]);let se=v[R],W=e()*.06,oe=[r[0]*se+W,r[1]*se,r[2]*se-W*.5],ue=x===0?.25+e()*.4:.06*e(),pe=oe.map((re,we)=>an(re,o[we],ue)),Ie=oe.map((re,we)=>an(re*(x===0?.85:.7),a[we],x===0?.1:.45)),ze=Math.hypot(A.x-b.x,A.z-b.z),We=h[R]/3.2,ye=We+ze/3.2,j=-m.yTop/3.2,ne=-M/3.2;s.quad([z,Y,q,Z],[gi(pe[0],pe[1],pe[2]),gi(pe[0],pe[1],pe[2]),gi(Ie[0],Ie[1],Ie[2]),gi(Ie[0],Ie[1],Ie[2])],[[We,j],[ye,j],[ye,ne],[We,ne]])}for(let R=0;R<n;R++){let b=g[R],A=g[(R+1)%n],I=gi(r[0]*.7,r[1]*.7,r[2]*.7),y=gi(a[0],a[1],a[2]);s.quad([b[1],A[0],A[3],b[2]],[I,I,y,y],[[0,0],[.3,0],[.3,1],[0,1]])}});let u=t.map(m=>[m.x*.58,-12,m.z*.58]),p=gi(.2,.22,.28);for(let m=0;m<n;m++){let x=u[m],g=u[(m+1)%n];s.tri(x,g,[0,-17,0],p,p,p,[0,0],[0,0],[0,0])}return s.build()}function Lx(i){let e=Qt(9),t=i.poly,n=t.length,s=yd(t),r=new il,o=[.84,.8,.72],a=[.45,.56,.25],c=[];for(let l=0;l<n;l++){let h=.28+e()*.6,d=.03+e()*.09,u=(g,f)=>[t[l].x-s[l].x*g,f,t[l].z-s[l].z*g],p=gt(.5+.5*Math.sin(l*.61+1.7)*Math.cos(l*.23)+(e()-.5)*.5,0,1),m=.9+e()*.16,x=o.map((g,f)=>an(g*m,a[f],p*.75));c.push({inner:u(h,.012),crest:u(h*.42,d),outer:u(0,0),c:x})}for(let l=0;l<n;l++){let h=c[l],d=c[(l+1)%n],u=(p,m)=>gi(p[0]*m,p[1]*m,p[2]*m);r.quad([h.inner,d.inner,d.crest,h.crest],[u(h.c,.95),u(d.c,.95),u(d.c,1.06),u(h.c,1.06)],[[0,0],[0,0],[0,0],[0,0]]),r.quad([h.crest,d.crest,d.outer,h.outer],[u(h.c,1.06),u(d.c,1.06),u(d.c,.88),u(h.c,.88)],[[0,0],[0,0],[0,0],[0,0]])}return r.build()}var Dx="mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), smoothstep(-30.0, 20.0, vHazeZ))";function tl(i,e,t,n,s,r=!1){return i.onBeforeCompile=o=>{o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <project_vertex>",`#include <project_vertex>
  vec4 hazeW = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
  vHazeZ = hazeW.z;
  vHazeY = `+(r?"transformed.y;":"hazeW.y;")),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
varying float vHazeY;
varying float vHazeZ;`).replace("#include <fog_fragment>",["float hazeF = max(smoothstep(fogNear, fogFar, vFogDepth), smoothstep("+t.toFixed(2)+", "+n.toFixed(2)+", vHazeY) * "+s.toFixed(2)+");","gl_FragColor.rgb = mix(gl_FragColor.rgb, "+Dx+", 1.0 - (1.0 - "+e.toFixed(2)+") * (1.0 - hazeF));"].join(`
`))},i.customProgramCacheKey=()=>`haze${e}_${t}_${n}_${s}_${r}`,i}function nl(i){let e=Qt(i),t=new Mr(1,1),n=t.getAttribute("position"),s=new Map;for(let r=0;r<n.count;r++){let o=`${n.getX(r).toFixed(3)},${n.getY(r).toFixed(3)},${n.getZ(r).toFixed(3)}`,a=s.get(o);a===void 0&&(a=.8+e()*.38,s.set(o,a)),n.setXYZ(r,n.getX(r)*a,n.getY(r)*a,n.getZ(r)*a)}return t.computeVertexNormals(),t}function Md(i,e,t){let n=[],s=b=>(n.push(b),b);i.background=new He(xd),i.fog=new rr(xd,Ax,Rx);let r=new wr(13624063,9072210,1.7);i.add(r);let o=new Rr(16773590,2.7);o.position.set(-9,17,4),o.target.position.set(0,0,0),o.castShadow=!0,o.shadow.mapSize.set(t.shadowSize,t.shadowSize);let a=o.shadow.camera;a.left=-13.5,a.right=13.5,a.top=13.5,a.bottom=-13.5,a.near=4,a.far=48,o.shadow.bias=-4e-4,o.shadow.normalBias=.04,i.add(o,o.target);let c=s(ud(e,t.groundTexSize)),l=s(dd()),h=s(new Nt({map:c})),d=s(new Nt({vertexColors:!0,map:l,side:Yt,emissive:3946805})),u=s(new Nt({vertexColors:!0,side:Yt,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),p=new Ke(s(Ix(e)),h);p.receiveShadow=!0,i.add(p);let m=new Ke(s(Px(e)),d);i.add(m);let x=new Ke(s(Lx(e)),u);x.receiveShadow=!0,i.add(x);{let b=Qt(13),A=e.poly,I=A.length,y=yd(A),M=70,C=s(new Ln(.09,.34,5).translate(0,.17,0)),L=s(new Nt({flatShading:!0})),z=new fn(C,L,M),Y=new et,q=new dn,Z=new U,se=new U,W=new He,oe=new U(0,1,0);for(let ue=0;ue<M;ue++){let pe=Math.floor(b()*I),Ie=.15+b()*1.1;se.set(A[pe].x-y[pe].x*Ie,.01,A[pe].z-y[pe].z*Ie);let ze=.55+b()*.6;Z.set(ze,ze*(.7+b()*.7),ze),q.setFromAxisAngle(oe,b()*6),Y.compose(se,q,Z),z.setMatrixAt(ue,Y);let We=.75+b()*.5;W.setRGB(.4*We,.55*We,.2*We,ht),z.setColorAt(ue,W)}z.receiveShadow=!0,i.add(z)}e.rocks.forEach((b,A)=>{let I=Qt(100+A),y=new At,M=s(new Nt({map:l,color:14867666,flatShading:!0})),C=s(new Nt({color:7311164,flatShading:!0})),L=s(nl(200+A)),z=new Ke(L,M);z.scale.set(b.r*1,b.r*1.05,b.r*.95),z.position.y=b.r*.62,z.rotation.y=I()*6,z.castShadow=!0,z.receiveShadow=!0,y.add(z);let Y=new Ke(L,C);Y.scale.set(b.r*.72,b.r*.2,b.r*.7),Y.position.y=b.r*1.5,Y.rotation.y=I()*6,Y.castShadow=!0,y.add(Y);for(let q=0;q<4;q++){let Z=q/4*Math.PI*2+I(),se=b.r*(.85+I()*.5),W=new Ke(s(nl(300+A*10+q)),M),oe=b.r*(.22+I()*.2);W.scale.set(oe,oe*.8,oe),W.position.set(Math.cos(Z)*se,oe*.45,Math.sin(Z)*se),W.rotation.y=I()*6,W.castShadow=!0,W.receiveShadow=!0,y.add(W)}y.position.set(b.pos.x,0,b.pos.z),i.add(y)});{let b=s(new Xt(.8,1,1,6,1).translate(0,.5,0)),A=new Xt(1,.7,1,6,3).translate(0,-.5,0);{let ye=Qt(902),j=A.getAttribute("position");for(let ne=0;ne<j.count;ne++){let re=j.getY(ne);if(re<-.05&&re>-.95){let we=.82+ye()*.36;j.setXYZ(ne,j.getX(ne)*we,re,j.getZ(ne)*we)}}A.computeVertexNormals()}s(A);let I=s(nl(901)),y=Qt(78),M=new et,C=new dn,L=new U,z=new U,Y=new U(0,1,0),q=new He;for(let ye of[0,1,2]){let j=vd.pillars.filter(Be=>Be.tier===ye),ne=j[0].haze,re=s(tl(new Nt({map:l,flatShading:!0,color:13683391}),ne,ye===0?-.15:-4,ye===0?-.95:-17,ye===0?1:.92,ye===0)),we=s(tl(new Nt({flatShading:!0,color:6982202}),ne,-4,-17,.92)),Me=new fn(ye===0?A:b,re,j.length),De=new fn(I,we,j.length);j.forEach((Be,P)=>{if(C.setFromAxisAngle(Y,y()*3),Be.len>0)z.set(Be.x,Be.top,Be.z),L.set(Be.w,Be.len,Be.w);else{let Ue=_d-22;z.set(Be.x,Ue,Be.z),L.set(Be.w,Be.top-Ue,Be.w)}M.compose(z,C,L),Me.setMatrixAt(P,M);let qe=.82+y()*.3;Me.setColorAt(P,q.setRGB(qe,qe*.98,qe*.95,ht)),z.set(Be.x,Be.top,Be.z),L.set(Be.w*.92,Be.capH,Be.w*.92),M.compose(z,C,L),De.setMatrixAt(P,M)}),Me.frustumCulled=!1,De.frustumCulled=!1,i.add(Me,De)}let Z=vd.islets,se=Z[0].haze,W=s(nl(950)),oe=s(new Ln(1,1.9,7).rotateX(Math.PI).translate(0,-.95,0)),ue=s(tl(new Nt({color:9077626,flatShading:!0}),se,-6,-17,.9)),pe=s(tl(new Nt({color:6982202,flatShading:!0}),se,-6,-17,.9)),Ie=new fn(oe,ue,Z.length),ze=new fn(W,ue,Z.length),We=new fn(W,pe,Z.length);Z.forEach((ye,j)=>{C.setFromAxisAngle(Y,y()*6),z.set(ye.x,ye.y,ye.z),L.set(ye.s,ye.s*.3,ye.s),M.compose(z,C,L),ze.setMatrixAt(j,M),z.set(ye.x,ye.y+ye.s*.12,ye.z),L.set(ye.s*.82,ye.s*.16,ye.s*.82),M.compose(z,C,L),We.setMatrixAt(j,M),z.set(ye.x,ye.y-ye.s*.05,ye.z),L.set(ye.s*.95,ye.s,ye.s*.95),M.compose(z,C,L),Ie.setMatrixAt(j,M)});for(let ye of[Ie,ze,We])ye.frustumCulled=!1,i.add(ye)}let g=s(fd());g.repeat.set(2.4,2.4);let f=[],S=new Ke(s(new Kt(400,400).rotateX(-Math.PI/2)),s(new Rt({fog:!1,vertexShader:"varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:"varying vec3 vW; void main(){ float t = smoothstep(-30.0, 20.0, vW.z); vec3 c = mix(vec3(0.561,0.714,0.878), vec3(0.247,0.435,0.659), t); gl_FragColor = vec4(c, 1.0); }"})));S.position.y=_d,i.add(S),[[-14,.12]].forEach(([b,A])=>{let I=s(new Ft({map:g,transparent:!0,opacity:A,depthWrite:!1,color:13229298})),y=new Ke(s(new Kt(260,260).rotateX(-Math.PI/2)),I);y.position.y=b,y.renderOrder=-5,i.add(y),f.push(y)});let E=s(pd()),v=[];{let b=Qt(55);for(let A=0;A<12;A++){let I=s(new ps({map:E,transparent:!0,opacity:.12+b()*.1,depthWrite:!1,color:14017782})),y=new lr(I),M=b()*Math.PI*2,C=15+b()*28;y.position.set(Math.cos(M)*C,-7-b()*9,Math.sin(M)*C);let L=14+b()*16;y.scale.set(L,L*.55,1),i.add(y),v.push(y)}}let R=0;return{update(b){R+=b,g.offset.set(R*.004,R*.002),f[f.length-1].position.x=Math.sin(R*.05)*4;for(let A=0;A<v.length;A++)v[A].position.x+=b*(.25+A%3*.12),v[A].position.x>48&&(v[A].position.x=-48)},dispose(){for(let b of n)b.dispose()}}}var Ux=new He(16777215),Fx=1.32,Nx=1.18,bd={0:{ring:3729663,armor:15134194,trim:2854822,cloth:3126728,skin:15122330,hair:16054008,dark:2765888,glow:5894399},1:{ring:16730685,armor:10234406,trim:4855060,cloth:8003356,skin:3811880,hair:8003356,dark:2824986,glow:16734780},2:{ring:16751150,armor:12740124,trim:5911572,cloth:9062932,skin:9067068,hair:3810322,dark:3023382,glow:16754746}};function Sd(i){return bd[i].glow}var sl=class{constructor(e,t){this.root=new At;this.ground=new At;this.pivot=new At;this.rig=new At;this.wpn=new At;this.legL=new At;this.legR=new At;this.cape=null;this.mats=[];this.ringMats=[];this.shadowMeshes=[];this.phase=0;this.lean=0;this.side=0;this.raise=0;this.crouch=0;this.lunge=0;this.bob=0;this.castT=99;this.castSkill=null;this.dustT=0;this.wasShadow=!0;this._gc=null;this.variant=t;let n=bd[t];this.palette=n;let s=b=>{let A=new Nt({color:b});return this.mats.push(A),A},r=s(n.armor),o=s(n.trim),a=s(n.cloth),c=s(n.skin),l=s(n.hair),h=s(n.dark);this.glowMat=new Ft({color:n.glow,transparent:!0,fog:!1}),this.root.add(this.pivot),this.pivot.position.y=.9,this.pivot.add(this.rig),this.rig.position.y=-.9;let d=(b,A,I,y,M,C,L=!0)=>{let z=new Ke(A,I);return z.position.set(y,M,C),z.castShadow=L,L&&this.shadowMeshes.push(z),b.add(z),z};for(let[b,A]of[[this.legL,-.13],[this.legR,.13]])b.position.set(0,.86,A),d(b,new Xt(.085,.065,.66,8),h,0,-.33,0),d(b,new Wt(.26,.12,.15),o,.05,-.74,0),this.rig.add(b);d(this.rig,new dr(.2,.36,4,10),r,0,1.2,0).scale.set(.8,1,1.25),d(this.rig,new Xt(.215,.215,.09,12),o,0,.96,0).scale.set(.82,1,1.28);for(let b of[-.27,.27])d(this.rig,new Dn(.14,10,8),o,0,1.46,b).scale.set(.9,.7,1);if(d(this.rig,new Dn(.17,14,12),c,.03,1.66,0),t===0){d(this.rig,new Dn(.2,14,12),l,-.03,1.7,0).scale.set(1,.92,1.04);let A=d(this.rig,new Ln(.1,.45,8),l,-.27,1.55,0);A.rotation.z=Math.PI/2+.5,d(this.rig,new Wt(.08,.06,.26),s(2808046),.14,1.67,0,!1)}else{d(this.rig,new Dn(.22,14,12),a,-.03,1.69,0).scale.set(1.05,.95,1.02);let A=d(this.rig,new Ln(.14,.4,8),a,-.25,1.6,0);A.rotation.z=Math.PI/2+.7,d(this.rig,new Dn(.12,10,8),h,.1,1.64,0,!1).scale.set(.8,1,1.15),d(this.rig,new Wt(.06,.04,.16),this.glowMat,.17,1.66,0,!1)}let p=new At;p.position.set(-.17,1.5,0);let m=new Xt(.22,.4,.95,4,1).rotateY(Math.PI/4);d(p,m,t===0?s(2340812):a,0,-.45,0).scale.set(.12,1,1),this.rig.add(p),this.cape=p,this.wpn.position.set(.04,1.34,0),this.rig.add(this.wpn);for(let b of[-.26,.26]){let A=d(this.wpn,new Xt(.06,.05,.44,8),r,.17,-.05,b*.7);A.rotation.z=-Math.PI/2+.25,A.rotation.x=b>0?-.35:.35}if(this.glowTip=new Ke(new Dn(.1,10,8),this.glowMat),t===0)d(this.wpn,new Wt(.95,.13,.11),h,.62,-.08,.05),d(this.wpn,new Wt(.3,.2,.09),o,.25,-.12,.05),d(this.wpn,new Xt(.05,.05,.5,8),h,1.25,-.08,.05).rotation.z=Math.PI/2,d(this.wpn,new Wt(.2,.05,.05),s(5894399),.72,0,.05,!1),this.glowTip.position.set(1.52,-.08,.05);else if(t===1){d(this.wpn,new Xt(.035,.035,1.9,6),s(5913380),.65,-.07,.05).rotation.z=Math.PI/2;let b=d(this.wpn,new Ln(.1,.5,4),s(2763312),1.82,-.07,.05);b.rotation.z=-Math.PI/2,d(this.wpn,new Sr(.08,.025,6,10),o,1.55,-.07,.05).rotation.y=Math.PI/2,this.glowTip.position.set(2.1,-.07,.05)}else d(this.wpn,new Xt(.045,.045,1.4,6),s(4862496),.5,-.07,.05).rotation.z=Math.PI/2,d(this.wpn,new Wt(.38,.34,.5),s(3747882),1.25,-.07,.05),d(this.wpn,new Wt(.42,.1,.54),r,1.25,-.07,.05,!1),this.glowTip.position.set(1.25,.18,.05);this.wpn.add(this.glowTip);let g=new Ft({color:n.ring,transparent:!0,opacity:.95,depthWrite:!1,fog:!1}),f=new Ft({color:n.ring,transparent:!0,opacity:.2,depthWrite:!1,fog:!1});this.ringMats.push(g,f);let S=new Ke(new hi(.6,.7,40).rotateX(-Math.PI/2),g),E=new Ke(new hi(.7,.86,40).rotateX(-Math.PI/2),f),v=new yt;v.setAttribute("position",new Ze([1.22,0,0,.82,0,.2,.82,0,-.2],3)),v.setIndex([0,2,1]),v.computeVertexNormals();let R=new Ke(v,new Ft({color:n.ring,transparent:!0,opacity:.95,depthWrite:!1,side:Yt,fog:!1}));this.ringMats.push(R.material);for(let b of[S,E,R])b.renderOrder=6,this.ground.add(b);e.add(this.root,this.ground)}update(e,t){let n=this.palette,s=Math.hypot(e.moveVel.x,e.moveVel.z),r=e.state==="falling",o=e.state==="dead",a=e.state==="knocked";this.root.position.set(e.pos.x,e.y,e.pos.z),this.root.rotation.y=-e.facing,this.ground.position.set(e.pos.x,.035,e.pos.z),this.ground.rotation.y=-e.facing,this.ground.scale.setScalar(Nx),this.castT+=t;let c=1;o&&(c=1-Or(1,1.5,e.stateT)),e.y<-16&&(c=0),this.root.visible=c>.01,this.ground.visible=!r&&!o&&e.y>-.2,this.root.scale.setScalar(Math.max(c,.001)*Fx);let l=!r&&e.y>-.4;if(l!==this.wasShadow){for(let q of this.shadowMeshes)q.castShadow=l;this.wasShadow=l}let h=0,d=0,u=.05,p=0,m=0,x=0,g=e.windup,f=g?gt(g.t/Math.max(g.dur,.01),0,1):0,S=this.castT<.3?this.castT/.3:1;if(e.state==="windup"&&g&&(x=f,g.skill==="enemyHeavy"?(u=an(.05,2,Or(0,.85,f)),h=an(0,.28,f),p=.04):g.skill==="enemyBasic"?(u=an(.05,.35,f),m=-.16*f,h=.1*f):g.skill==="control"?(u=an(.05,.22,f),m=-.1*f,h=.12*f,p=.05*f):(u=.3,m=-.12,h=.18)),this.castSkill&&this.castT<.45){let q=1-S;this.castSkill==="enemyHeavy"?(u=an(-.45,2,q*q),h=an(-.35,.1,q),m=.28*(1-q)):(u=an(.05,.4,q),m=.42*(1-q),h=an(-.3,0,q))}if(e.state==="recover"&&(h=Math.max(h,-.12)),e.state==="dash"&&(h=-.42,p=.1,m=.12,u=.2),a){let q=Math.hypot(e.knockVel.x,e.knockVel.z)||1,Z=(e.knockVel.x*Math.cos(e.facing)+e.knockVel.z*Math.sin(e.facing))/q,se=(-e.knockVel.x*Math.sin(e.facing)+e.knockVel.z*Math.cos(e.facing))/q,W=.62*Or(0,.08,e.stateT);h=-W*Z,d=W*se,u=-.9,p=.06}let E=e.sinceShotT<.4?Math.exp(-e.sinceShotT*18):0;m-=E*.2,u+=E*.14,e.burstLeft>0&&(u=Math.max(u,.1),h=Math.max(h,.06));let v=Rs(e.state==="windup"||this.castT<.45||a?30:16,t);this.lean+=(h-this.lean)*v,this.side+=(d-this.side)*v,this.raise+=(u-this.raise)*v,this.crouch+=(p-this.crouch)*v,this.lunge+=(m-this.lunge)*v;let R=!r&&!o&&!a&&s>.15&&e.state!=="dash";R&&(this.phase+=t*(6+s*1.7));let b=R?gt(s/5,.25,1)*.75:0,A=Math.sin(this.phase)*b,I=R?Math.abs(Math.sin(this.phase))*.05:0;this.bob+=(I-this.bob)*Rs(20,t);let y=r?Math.sin(e.stateT*22)*.6:a?.55:e.state==="dash"?.9:0;if(this.legL.rotation.z=R?A:y,this.legR.rotation.z=R?-A:-y*(r?1:-.4),this.pivot.position.set(this.lunge,.9-this.crouch+this.bob,0),this.pivot.rotation.set(0,0,0),this.pivot.rotation.z=-this.lean,this.pivot.rotation.x=this.side,this.wpn.rotation.z=this.raise,this.wpn.position.x=.04+(E>0?-E*.12:0)+(e.state==="windup"&&g&&g.skill!=="enemyHeavy"?-.08*f:0),r)this.pivot.rotation.set(e.stateT*6.5,0,e.stateT*3.2);else if(o){let q=Or(0,.3,e.stateT);this.pivot.rotation.set(0,0,q*(Math.PI/2)),this.pivot.position.y=.9-q*.6,this.legL.rotation.z=q*.3,this.legR.rotation.z=q*-.2,this.wpn.rotation.z=-.4*q}if(this.cape){let q=Math.sin(this.phase*.9+1.3)*.06*gt(s/5,0,1);this.cape.rotation.z=-(.12+gt(s/6,0,1)*.42+(e.state==="dash"?.45:0)+q+(r?.7:0)),this.cape.rotation.x=Math.sin(this.phase*.5)*.04}let M=gt(e.hitFlashT*10,0,1),C=x*.2,L=this.glowColor(n.glow);for(let q of this.mats)q.emissive.setRGB(M*.95+L[0]*C,M*.95+L[1]*C,M*.95+L[2]*C);let z=gt(x+E*1.2+(this.castT<.25?.8:0),0,1);this.glowMat.opacity=.35+z*.65,this.glowTip.scale.setScalar(.7+z*1.5),this.glowMat.color.setHex(n.glow).lerp(Ux,z*.5);let Y=e.state==="windup"?.7+.3*Math.sin(performance.now()*.03):1;this.ringMats[0].opacity=.95*Y}glowColor(e){if(!this._gc){let t=new He(e);this._gc=[t.r,t.g,t.b]}return this._gc}wantDust(e,t){return e.state!=="knocked"?(this.dustT=0,!1):(this.dustT-=t,this.dustT<=0?(this.dustT=.045,!0):!1)}tipWorld(e){return this.root.updateMatrixWorld(!0),this.glowTip.getWorldPosition(e)}dispose(){for(let e of[this.root,this.ground])e.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose()});for(let e of this.mats)e.dispose();this.glowMat.dispose();for(let e of this.ringMats)e.dispose();this.root.removeFromParent(),this.ground.removeFromParent()}};var Ox=`
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
}`,Bx=`
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
}`,Br=class{constructor(e,t){this.n=0;this.cap=e,this.p=new Float32Array(e*3),this.v=new Float32Array(e*3),this.s=new Float32Array(e*4),this.c=new Float32Array(e*4),this.l=new Float32Array(e*4);let n=new Kt(1,1);this.geo=new Cr,this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.geo.setAttribute("uv",n.getAttribute("uv")),this.aPosSize=new Jn(new Float32Array(e*4),4),this.aColor=new Jn(new Float32Array(e*4),4),this.aShape=new Jn(new Float32Array(e*2),2);for(let s of[this.aPosSize,this.aColor,this.aShape])s.setUsage(Ya);this.geo.setAttribute("aPosSize",this.aPosSize),this.geo.setAttribute("aColor",this.aColor),this.geo.setAttribute("aShape",this.aShape),this.geo.instanceCount=0,this.mat=new Rt({vertexShader:Ox,fragmentShader:Bx,transparent:!0,depthWrite:!1,blending:t?fi:Yn,fog:!1}),this.mesh=new Ke(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:15}get count(){return this.n}spawn(e){if(this.n>=this.cap)return;let t=this.n++;this.p[t*3]=e.x,this.p[t*3+1]=e.y,this.p[t*3+2]=e.z,this.v[t*3]=e.vx??0,this.v[t*3+1]=e.vy??0,this.v[t*3+2]=e.vz??0,this.s[t*4]=e.size,this.s[t*4+1]=e.size1??e.size,this.s[t*4+2]=e.aspect??1,this.s[t*4+3]=e.crisp??0,this.c[t*4]=e.color[0],this.c[t*4+1]=e.color[1],this.c[t*4+2]=e.color[2],this.c[t*4+3]=e.alpha??1,this.l[t*4]=0,this.l[t*4+1]=e.life,this.l[t*4+2]=e.gravity??0,this.l[t*4+3]=e.drag??0}update(e){let t=0;for(;t<this.n;){let o=t*4,a=t*3;if(this.l[o]+=e,this.l[o]>=this.l[o+1]){this.remove(t);continue}let c=Math.exp(-this.l[o+3]*e);this.v[a]*=c,this.v[a+1]=this.v[a+1]*c-this.l[o+2]*e,this.v[a+2]*=c,this.p[a]+=this.v[a]*e,this.p[a+1]+=this.v[a+1]*e,this.p[a+2]+=this.v[a+2]*e,this.p[a+1]<.03&&this.l[o+2]>0&&this.p[a+1]>-1&&(this.p[a+1]=.03,this.v[a+1]*=-.25,this.v[a]*=.6,this.v[a+2]*=.6),t++}let n=this.aPosSize.array,s=this.aColor.array,r=this.aShape.array;for(let o=0;o<this.n;o++){let a=this.l[o*4]/this.l[o*4+1];n[o*4]=this.p[o*3],n[o*4+1]=this.p[o*3+1],n[o*4+2]=this.p[o*3+2],n[o*4+3]=this.s[o*4]+(this.s[o*4+1]-this.s[o*4])*a,s[o*4]=this.c[o*4],s[o*4+1]=this.c[o*4+1],s[o*4+2]=this.c[o*4+2];let c=1-a;s[o*4+3]=this.c[o*4+3]*c*(a<.08?a/.08+.2:1),r[o*2]=this.s[o*4+2],r[o*2+1]=this.s[o*4+3]}this.aPosSize.needsUpdate=!0,this.aColor.needsUpdate=!0,this.aShape.needsUpdate=!0,this.geo.instanceCount=this.n}clear(){this.n=0,this.geo.instanceCount=0}remove(e){let t=--this.n;e!==t&&(this.p.copyWithin(e*3,t*3,t*3+3),this.v.copyWithin(e*3,t*3,t*3+3),this.s.copyWithin(e*4,t*4,t*4+4),this.c.copyWithin(e*4,t*4,t*4+4),this.l.copyWithin(e*4,t*4,t*4+4))}dispose(){this.geo.dispose(),this.mat.dispose()}},zr=class{constructor(e,t){this.n=0;this.m=new et;this.col=new He;this.X=new U;this.Y=new U;this.Z=new U;this.P=new U;this.view=new U(0,-1,-1).normalize();this.cap=e;let n=new Ft({map:t,transparent:!0,depthWrite:!1,blending:fi,fog:!1});this.mesh=new fn(new Kt(1,1),n,e),this.mesh.instanceMatrix.setUsage(Ya),this.mesh.frustumCulled=!1,this.mesh.renderOrder=22,this.mesh.count=0,this.mesh.setColorAt(0,this.col.setRGB(1,1,1))}begin(){this.n=0}push(e,t,n,s,r,o){if(this.n>=this.cap||o<=.003)return;this.X.copy(t).normalize(),this.Y.crossVectors(this.X,this.view),this.Y.lengthSq()<1e-6&&this.Y.set(0,1,0),this.Y.normalize(),this.Z.crossVectors(this.X,this.Y).normalize(),this.P.copy(e).addScaledVector(this.X,-n/2),this.m.makeBasis(this.X.multiplyScalar(n),this.Y.multiplyScalar(s),this.Z),this.m.setPosition(this.P),this.mesh.setMatrixAt(this.n,this.m),this.col.setRGB(r[0],r[1],r[2],ht).multiplyScalar(o);let a=this.mesh.instanceColor.array;a[this.n*3]=this.col.r,a[this.n*3+1]=this.col.g,a[this.n*3+2]=this.col.b,this.n++}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}};var Ed=.05,zx=`
varying vec2 vP;
void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,kx=`
uniform vec3 uColor;
uniform float uHalf;
uniform float uProgress;
uniform float uAlpha;
uniform float uTime;
varying vec2 vP;
void main() {
  float r = length(vP);
  float ang = abs(atan(vP.y, vP.x));
  float aa = fwidth(r) * 1.2;
  float aaA = fwidth(ang) * 1.2 + 1e-4;
  float inside = (1.0 - smoothstep(1.0 - aa, 1.0, r)) * (1.0 - smoothstep(uHalf - aaA, uHalf, ang));
  float fillMask = 1.0 - smoothstep(uProgress - aa * 2.0, uProgress + aa * 2.0, r);
  float rim = smoothstep(1.0 - aa * 5.0, 1.0 - aa * 2.0, r) * (1.0 - smoothstep(1.0 - aa * 2.0, 1.0, r));
  float side = smoothstep(uHalf - aaA * 6.0, uHalf - aaA * 2.0, ang);
  float front = smoothstep(uProgress - aa * 6.0, uProgress, r) * (1.0 - smoothstep(uProgress, uProgress + aa * 2.0, r)) * step(uProgress, 0.995);
  float a = inside * (0.16 + 0.46 * fillMask) + inside * (rim * 0.55 + side * 0.5 + front * 0.5);
  vec3 col = mix(uColor, vec3(1.0), clamp(rim * 0.35 + side * 0.3 + front * 0.5, 0.0, 0.7));
  a *= uAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(col, a);
}`,Hx=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Vx=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uFill;
uniform float uSoft;
varying vec2 vUv;
void main() {
  float v = abs(vUv.y - 0.5) * 2.0;
  float u = vUv.x;
  float edge = 1.0 - smoothstep(0.55, 1.0, v);
  float core = 1.0 - smoothstep(0.0, 0.45, v);
  float line = smoothstep(0.78, 0.9, v) * (1.0 - smoothstep(0.9, 1.0, v));
  float filled = 1.0 - smoothstep(uFill - 0.03, uFill + 0.03, u);
  float tailFade = mix(1.0, 1.0 - smoothstep(0.55, 1.0, u), uSoft);
  float a = (edge * (0.2 + 0.4 * filled) + core * 0.28 * (0.4 + filled) + line * 0.55) * tailFade * uAlpha;
  if (a < 0.003) discard;
  vec3 col = mix(uColor, vec3(1.0), core * 0.35 + line * 0.2);
  gl_FragColor = vec4(col, a);
}`,rl=class{constructor(e,t){this.items=[];this.used=0;let n=new Kt(2,2).rotateX(-Math.PI/2);for(let s=0;s<t;s++){let r={uColor:{value:new U(1,0,0)},uHalf:{value:.8},uProgress:{value:1},uAlpha:{value:1},uTime:{value:0}},o=new Rt({vertexShader:zx,fragmentShader:kx,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ke(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,s,r,o,a,c){if(this.used>=this.items.length)return;let l=this.items[this.used++];l.mesh.visible=!0,l.mesh.position.set(e,Ed,t),l.mesh.rotation.y=-n,l.mesh.scale.set(s,1,s),l.u.uColor.value.set(a[0],a[1],a[2]),l.u.uHalf.value=r,l.u.uProgress.value=o,l.u.uAlpha.value=c}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},Bc=class{constructor(e,t){this.items=[];this.used=0;let n=new Kt(1,1).rotateX(-Math.PI/2);for(let s=0;s<t;s++){let r={uColor:{value:new U(1,0,0)},uAlpha:{value:1},uFill:{value:1},uSoft:{value:1}},o=new Rt({vertexShader:Hx,fragmentShader:Vx,uniforms:r,transparent:!0,depthWrite:!1,fog:!1}),a=new Ke(n,o);a.visible=!1,a.renderOrder=5,a.frustumCulled=!1,e.add(a),this.items.push({mesh:a,u:r})}}begin(){this.used=0}push(e,t,n,s,r,o,a,c,l=1){if(this.used>=this.items.length)return;let h=this.items[this.used++];h.mesh.visible=!0,h.mesh.position.set(e+Math.cos(n)*s*.5,Ed,t+Math.sin(n)*s*.5),h.mesh.rotation.y=-n,h.mesh.scale.set(s,1,r),h.u.uColor.value.set(a[0],a[1],a[2]),h.u.uFill.value=o,h.u.uAlpha.value=c,h.u.uSoft.value=l}end(){for(let e=this.used;e<this.items.length;e++)this.items[e].mesh.visible=!1}},ol=class{constructor(e){this.sectors=new rl(e,5),this.flashes=new rl(e,4),this.strips=new Bc(e,8)}};var Td="render-overlay-style",al=class{constructor(e){this.root=e;this.bars=new Map;this.arrows=new Map;this.nums=[];this.w=852;this.h=393;if(e.style.pointerEvents="none",e.style.overflow="hidden",!document.getElementById(Td)){let t=document.createElement("style");t.id=Td,t.textContent=`
        .ro-abs{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
        .ro-bar{background:rgba(6,12,20,.78);border:1px solid rgba(0,0,0,.55);border-radius:3px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.45)}
        .ro-bar>div{position:absolute;left:0;top:0;bottom:0;display:block;transform-origin:0 50%}
        .ro-num{font:800 16px/1 "Segoe UI",system-ui,-apple-system,sans-serif;letter-spacing:.02em;text-shadow:0 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.5);white-space:nowrap}
        .ro-arrow{width:0;height:0}
        .ro-arrow>i{position:absolute;left:-13px;top:-11px;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:20px solid #ff4a3d;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}
      `,document.head.appendChild(t)}for(let t=0;t<18;t++){let n=document.createElement("div");n.className="ro-abs ro-num",n.style.opacity="0",e.appendChild(n),this.nums.push({el:n,x:0,z:0,y:0,age:0,life:.8,active:!1,drift:0})}}resize(e,t){this.w=e,this.h=t}spawnNumber(e,t,n,s,r){let o=this.nums.find(a=>!a.active)??this.nums.reduce((a,c)=>a.age>c.age?a:c);o.active=!0,o.age=0,o.life=.85,o.x=e.x,o.z=e.z,o.y=t,o.drift=(Math.random()-.5)*22,o.el.textContent=n,o.el.style.color=hd(s),o.el.style.fontSize=`${Math.round(r)}px`}makeBar(e){let t=document.createElement("div");t.className="ro-abs ro-bar";let n=document.createElement("div"),s=document.createElement("div");return n.style.background="#fff",n.style.opacity="0.85",s.style.background=e==="player"?"linear-gradient(#7ff6ff,#27c6dc)":"linear-gradient(#ff6a5c,#d12c26)",t.appendChild(n),t.appendChild(s),this.root.appendChild(t),{el:t,fill:s,lag:n,lagV:1,team:e}}makeArrow(){let e=document.createElement("div");return e.className="ro-abs ro-arrow",e.appendChild(document.createElement("i")),this.root.appendChild(e),e}update(e,t,n){let s=new Set,r=Math.round(gt(this.h*.11,38,92)),o=Math.round(gt(this.h*.017,5,9));for(let a of e){s.add(a.id);let c=this.bars.get(a.id);c||(c=this.makeBar(a.team),this.bars.set(a.id,c));let l=a.state!=="dead"&&a.state!=="falling"&&a.hp>0,h=t(a.pos,2.25),d=l&&h.visible;if(c.el.style.opacity=d?"1":"0",d){let u=gt(a.hp/a.maxHp,0,1);c.lagV=u>=c.lagV?u:Math.max(u,c.lagV-n*.7),c.el.style.width=`${r}px`,c.el.style.height=`${o}px`,c.el.style.transform=`translate3d(${Math.round(h.x-r/2)}px,${Math.round(h.y-o/2)}px,0)`,c.fill.style.width=`${(u*100).toFixed(1)}%`,c.lag.style.width=`${(c.lagV*100).toFixed(1)}%`}if(a.team==="enemy"){let u=this.arrows.get(a.id);u||(u={el:this.makeArrow(),id:a.id},this.arrows.set(a.id,u));let p=t(a.pos,1),m=10;if(l&&(p.x<m||p.x>this.w-m||p.y<m||p.y>this.h-m||!p.visible)){let g=this.w/2,f=this.h/2,S=p.x-g,E=p.y-f;Math.abs(S)<.001&&Math.abs(E)<.001&&(E=-1);let v=26,R=Math.min((g-v)/Math.max(Math.abs(S),.001),(f-v)/Math.max(Math.abs(E),.001)),b=g+S*R,A=f+E*R,I=Math.atan2(E,S);u.el.style.opacity="1",u.el.style.transform=`translate3d(${b.toFixed(1)}px,${A.toFixed(1)}px,0) rotate(${I}rad)`}else u.el.style.opacity="0"}}for(let[a,c]of this.bars)s.has(a)||(c.el.remove(),this.bars.delete(a));for(let[a,c]of this.arrows)s.has(a)||(c.el.remove(),this.arrows.delete(a));for(let a of this.nums){if(!a.active)continue;if(a.age+=n,a.age>=a.life){a.active=!1,a.el.style.opacity="0";continue}let c=a.age/a.life,l=t({x:a.x,z:a.z},a.y),h=46*(1-Math.pow(1-c,2)),d=c<.12?.7+c/.12*.6:1.3-Math.min(.3,(c-.12)*.7);a.el.style.opacity=String(c<.6?1:1-(c-.6)/.4),a.el.style.transform=`translate3d(${(l.x+a.drift*c).toFixed(1)}px,${(l.y-h).toFixed(1)}px,0) translate(-50%,-50%) scale(${d.toFixed(2)})`}}clear(){for(let e of this.nums)e.active=!1,e.el.style.opacity="0";for(let e of this.bars.values())e.el.remove();for(let e of this.arrows.values())e.el.remove();this.bars.clear(),this.arrows.clear()}dispose(){this.clear();for(let e of this.nums)e.el.remove()}};var zc=38,ei=51*Math.PI/180,Gx=15.3,Wx=22.1,wd=.6,Xx=2.6,vt=Bi(5239039),Cs=[1,1,1],kc=Bi(16726832),jt=Bi(16747050),qx=[.72,.74,.78],Yx=Bi(12098936),Hc=Bi(9077624);function ll(i,e,t,n,s,r){let o=r;for(let a of i){let c=e-a.pos.x,l=t-a.pos.z,h=c*n+l*s,d=c*c+l*l-a.r*a.r,u=h*h-d;if(u<0)continue;let p=-h-Math.sqrt(u);p>0&&p<o&&(o=p)}return o}function Ad(i,e,t){let n=Math.min(window.devicePixelRatio||1,2),s=new Qa({canvas:i,antialias:n<2,powerPreference:"high-performance",alpha:!1});s.setPixelRatio(n),s.shadowMap.enabled=!0,s.shadowMap.type=ea,s.outputColorSpace=ht;let r=new or,o=/iPhone|iPad|Android/i.test(navigator.userAgent),a=Md(r,t,{shadowSize:o?1536:2048,groundTexSize:o?1024:2048}),c=new Ct(zc,16/9,1,220);c.rotation.set(-ei,0,0);let l=new Ct(zc,16/9,1,220);l.rotation.set(-ei,0,0);let h=new U(0,-Math.sin(ei),-Math.cos(ei)),d=new U(1,0,0),u=new U(0,Math.cos(ei),-Math.sin(ei)),p=new Br(900,!0),m=new Br(520,!1),x=new zr(200,md()),g=new zr(40,gd());x.view.copy(h),g.view.copy(h);let f=new ol(r);r.add(m.mesh,p.mesh,x.mesh,g.mesh);let S=[];{let F=new hi(.86,1,56).rotateX(-Math.PI/2);for(let N=0;N<10;N++){let D=new Ft({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:fi,fog:!1}),J=new Ke(F,D);J.visible=!1,J.renderOrder=7,J.frustumCulled=!1,r.add(J),S.push({mesh:J,mat:D,age:0,life:1,r0:0,r1:1,alpha:1,on:!1})}}let E=[],v=[],R=new al(e),b=new Map,A=new Map,I=i.clientWidth||window.innerWidth||852,y=i.clientHeight||window.innerHeight||393,M=-.8,C=new xe(0,M),L=0,z=0,Y=0,q=new xe,Z=0,se=1,W=0,oe=new U,ue=new U,pe=new U;function Ie(F){let N=Math.tan(zc*Math.PI/360);return Math.max(Gx/2/N,Wx/2/(F*N))}function ze(F,N,D,J,O=0,$=0){F.position.set(N+O,J*Math.sin(ei)+$,D+J*Math.cos(ei)),F.updateMatrixWorld(!0)}function We(F,N){I=Math.max(1,F),y=Math.max(1,N),s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.setSize(I,y,!1);for(let J of[c,l])J.aspect=I/y,J.updateProjectionMatrix();R.resize(I,y);let D=Ie(I/y);ze(c,C.x,C.y,D),ze(l,C.x,C.y,D)}function ye(F,N=0){return pe.set(F.x,N,F.z).project(c),{x:(pe.x*.5+.5)*I,y:(-pe.y*.5+.5)*y,visible:pe.z<1&&pe.x>=-1&&pe.x<=1&&pe.y>=-1&&pe.y<=1}}function j(F,N){let D=F/I*2-1,J=-(N/y)*2+1;if(oe.set(D,J,.5).unproject(l),ue.copy(oe).sub(l.position),ue.y>-1e-6)return null;let O=-l.position.y/ue.y;return O>0?{x:l.position.x+ue.x*O,z:l.position.z+ue.z*O}:null}let ne=Math.random,re=(F,N)=>F+(N-F)*ne();function we(F,N,D,J,O,$,ee){let X=S.find(ie=>!ie.on)??S[0];X.on=!0,X.age=0,X.life=O,X.r0=D,X.r1=J,X.alpha=ee,X.mesh.position.set(F,.09,N),X.mat.color.setRGB($[0],$[1],$[2],ht),X.mesh.visible=!0}function Me(F,N,D,J,O,$=.1,ee=1){p.spawn({x:F,y:N,z:D,size:J,size1:J*.25,color:O,life:$,alpha:ee})}function De(F,N,D,J,O,$,ee,X){for(let ie=0;ie<J;ie++){let de;ee?de=Math.atan2(-ee.z,-ee.x)+(ne()-.5)*X:de=ne()*Math.PI*2;let ge=O*re(.4,1);p.spawn({x:F,y:N,z:D,vx:Math.cos(de)*ge,vy:re(.5,4),vz:Math.sin(de)*ge,size:re(.07,.16),size1:.02,color:ne()<.35?Cs:$,life:re(.18,.42),gravity:9,drag:2.5})}}function Be(F,N,D,J,O,$=1.2){for(let ee=0;ee<D;ee++){let X=ne()*Math.PI*2,ie=re(.3,1)*J;m.spawn({x:F+Math.cos(X)*.15,y:.12,z:N+Math.sin(X)*.15,vx:Math.cos(X)*ie,vy:re(.2,1)*$,vz:Math.sin(X)*ie,size:O*re(.5,.9),size1:O*re(1.4,2),color:Yx,alpha:.55,life:re(.4,.8),drag:3.2})}}function P(F,N,D,J,O,$){for(let ee=0;ee<J;ee++){let X=ne()*Math.PI*2,ie=$*re(.3,1);m.spawn({x:F,y:N,z:D,vx:Math.cos(X)*ie,vy:re(2,6),vz:Math.sin(X)*ie,size:re(.06,.13),size1:.05,color:O.map(de=>de*re(.6,1.1)),alpha:1,life:re(.5,.9),gravity:16,drag:.6,crisp:1})}}function qe(F,N,D,J,O,$,ee,X,ie=.2){let de=ee?Math.atan2(-ee.z*Math.sin(ei),-ee.x):0;for(let ge=0;ge<J;ge++){let fe=ee?de+(ne()-.5)*X:ge/J*Math.PI*2+ne()*.5,Ne=new U().copy(d).multiplyScalar(Math.cos(fe)).addScaledVector(u,Math.sin(fe));E.push({x:F,y:N,z:D,dir:Ne,r1:O*re(.7,1.2),len0:O*.3,len1:O*re(.6,1),width:re(.1,.2),age:0,life:ie*re(.8,1.2),color:$})}}function Ue(F){return F?Bi(Sd(F.variant)):vt}function Ce(F,N,D){let J=F.targetId===N.playerId,{x:O,z:$}=F.pos,ee=1,X=F.dir,ie=0,de=14678783;switch(F.kind){case"basic":Me(O,ee,$,.7,vt,.09),De(O,ee,$,6,6,vt,X,2.4),qe(O,ee,$,4,.9,vt,X,2.2,.16),ie=.07,de=13629951;break;case"control":Me(O,ee,$,1.3,vt,.14),De(O,ee,$,12,8,vt,X,3.4),qe(O,ee,$,7,1.7,vt,X,3.6,.22),we(O,$,.3,1.2,.26,vt,.6),ie=.2,de=8057599;break;case"push":Me(O,ee,$,1.9,Cs,.16),De(O,ee,$,16,9,vt,null,6.3),qe(O,ee,$,10,2.4,vt,null,6.3,.26),we(O,$,.4,2.2,.32,vt,.7),Be(O,$,9,3.2,.7),ie=.42,de=16777215;break;case"enemyBasic":Me(O,ee,$,.8,jt,.1),De(O,ee,$,8,6,jt,X,2.6),qe(O,ee,$,5,1.1,jt,X,2.4,.18),ie=J?.14:0,de=16739162;break;case"enemyHeavy":Me(O,ee,$,2,jt,.16),De(O,ee,$,16,9,jt,null,6.3),qe(O,ee,$,10,2.5,jt,null,6.3,.26),we(O,$,.4,2.9,.38,jt,.95),Be(O,$,10,3.4,.75),P(O,.5,$,6,Hc,4),ie=J?.6:.3,de=16739162;break}F.knock>.2&&Be(O,$,4,1.6,.55,.6),L=Math.min(1,L+ie),J&&(de=16739162);let ge=gt(y/393,.9,1.8);R.spawnNumber(F.pos,1.9,String(Math.round(F.dmg)),de,gt(14+F.dmg*.9,15,30)*ge)}function Ae(F,N,D){for(let J of F)switch(J.type){case"shoot":{let O=D.get(J.ownerId),$=Ue(O),ee=J.pos.x+J.dir.x*.15,X=J.pos.z+J.dir.z*.15;Me(ee,1.1,X,.6,$,.07);for(let ie=0;ie<3;ie++){let de=Math.atan2(J.dir.z,J.dir.x)+(ne()-.5)*.7,ge=re(3,7);p.spawn({x:ee,y:1.1,z:X,vx:Math.cos(de)*ge,vy:re(-.5,1),vz:Math.sin(de)*ge,size:.09,size1:.02,color:$,life:.14,drag:3})}break}case"hit":Ce(J,N,D);break;case"cast":{let O=D.get(J.ownerId),$=b.get(J.ownerId);$&&($.castT=0,$.castSkill=J.skill);let ee=J.skill==="enemyHeavy",X=ee?kt.range:Pt.range,ie=ee?kt.halfAngle:Pt.halfAngle,de=Math.atan2(J.dir.z,J.dir.x),ge=O?O.pos.x:J.pos.x,fe=O?O.pos.z:J.pos.z;v.push({x:ge,z:fe,angle:de,range:X,half:ie,color:ee?jt:vt,age:0,life:.22});for(let Ne=0;Ne<7;Ne++){let B=de+(ne()-.5)*ie*1.8,ae=X*re(.5,.95);Be(ge+Math.cos(B)*ae,fe+Math.sin(B)*ae,1,1,ee?.7:.5,.5)}ee&&(we(ge+Math.cos(de)*X*.55,fe+Math.sin(de)*X*.55,.3,X*.8,.3,jt,.6),L=Math.min(1,L+.12));break}case"dash":{let O=D.get(J.ownerId),$=Ue(O),ee=5;for(let X=0;X<ee;X++){let ie=X/(ee-1)*gn.distance;p.spawn({x:J.from.x+J.dir.x*ie,y:.95,z:J.from.z+J.dir.z*ie,size:.62,size1:.5,aspect:2.7,color:$,alpha:.5-X*.04,life:.26+X*.045})}Be(J.from.x,J.from.z,6,2.2,.5,.4);break}case"blocked":{let{x:O,z:$}=J.pos;Me(O,.9,$,.5,J.kind==="enemyBasic"?jt:vt,.08),P(O,.9,$,10,Hc,4.5),Be(O,$,3,1.2,.45,.6),De(O,.9,$,5,5,J.kind==="enemyBasic"?jt:vt,null,6.3);break}case"expire":{De(J.pos.x,.95,J.pos.z,4,2.2,J.kind==="enemyBasic"?jt:vt,null,6.3);break}case"edgeSave":{let O=D.get(J.ownerId);O&&(we(O.pos.x,O.pos.z,.5,1.5,.3,Cs,.9),De(O.pos.x,.9,O.pos.z,8,4,Cs,null,6.3));break}case"fall":{let{x:O,z:$}=J.pos;Be(O,$,14,3.2,.8,1.8),P(O,.3,$,8,Hc,3),Z=.7,z=1,Y=1,q.set(O,$),L=Math.min(1,L+.18);break}case"death":{if(J.cause==="fall")break;let O=D.get(J.ownerId),$=Ue(O),{x:ee,z:X}=J.pos;for(let ie=0;ie<40;ie++){let de=ne()*Math.PI*2,ge=re(.2,1.6);p.spawn({x:ee+Math.cos(de)*.25,y:re(.2,1.8),z:X+Math.sin(de)*.25,vx:Math.cos(de)*ge,vy:re(.8,3.2),vz:Math.sin(de)*ge,size:re(.12,.3),size1:.02,color:ne()<.5?$:Cs,alpha:.9,life:re(.6,1.2),gravity:-1.2,drag:1.4})}we(ee,X,.4,2.4,.5,$,.8),Me(ee,1,X,2.2,$,.2,.8),Z=.35,L=Math.min(1,L+.2);break}default:break}}function nt(F){f.flashes.begin();for(let N=v.length-1;N>=0;N--){let D=v[N];if(D.age+=F,D.age>=D.life){v.splice(N,1);continue}let J=D.age/D.life;f.flashes.push(D.x,D.z,D.angle,D.range*(.85+.15*J),D.half,1,D.color,(1-J)*1.2)}f.flashes.end()}function Se(F){for(let N=E.length-1;N>=0;N--){let D=E[N];D.age+=F,D.age>=D.life&&E.splice(N,1)}for(let N of E){let D=N.age/N.life,J=1-Math.pow(1-D,2.2),O=N.r1*J,$=Math.min(N.len0+(N.len1-N.len0)*D,O+.15);oe.set(N.x+N.dir.x*O,N.y+N.dir.y*O,N.z+N.dir.z*O),x.push(oe,N.dir,$,N.width*(1-D*.6),N.color,1-D*D)}}function V(F){for(let N of S){if(!N.on)continue;if(N.age+=F,N.age>=N.life){N.on=!1,N.mesh.visible=!1;continue}let D=N.age/N.life,J=1-Math.pow(1-D,2.4),O=N.r0+(N.r1-N.r0)*J;N.mesh.scale.set(O,1,O),N.mat.opacity=N.alpha*(1-D)}}let ce=new U;function Le(F){let N=new Set;for(let D of F.projectiles){if(!D.alive)continue;N.add(D.id),ce.set(D.dir.x,0,D.dir.z),oe.set(D.pos.x,.95,D.pos.z);let J=D.kind==="basic"?1.4:.7,O=Math.floor(D.traveled/J),$=A.get(D.id);if($===void 0||O>$){A.set(D.id,O);let ee=D.kind==="enemyBasic"?jt:vt,X=D.kind==="basic"?.9:1.6;p.spawn({x:D.pos.x-D.dir.x*X+re(-.08,.08),y:.95+re(-.1,.1),z:D.pos.z-D.dir.z*X+re(-.08,.08),size:D.kind==="basic"?.1:.16,size1:.02,color:ee,alpha:.9,life:.38,vx:re(-.3,.3),vz:re(-.3,.3),vy:re(0,.4)})}D.kind==="basic"?(x.push(oe,ce,2.2,.5,vt,1),x.push(oe,ce,.9,.24,Cs,1)):D.kind==="control"?(g.push(oe,ce,3.8,1.1,vt,1),x.push(oe,ce,2.4,.8,vt,.7)):(g.push(oe,ce,3.1,1.4,jt,1),x.push(oe,ce,2.3,.95,kc,.75))}for(let D of A.keys())N.has(D)||A.delete(D)}function w(F,N){f.sectors.begin(),f.strips.begin();let D=t.rocks,J=.55+.45*Math.sin(W*48);for(let O of F.fighters){let $=O.windup;if(!$||O.state!=="windup")continue;let ee=Math.atan2($.dir.z,$.dir.x),X=gt($.t/Math.max($.dur,.001),0,1);switch($.skill){case"enemyHeavy":f.sectors.push(O.pos.x,O.pos.z,ee,kt.range,kt.halfAngle,X,kc,1);break;case"enemyBasic":{let ie=ll(D,O.pos.x,O.pos.z,$.dir.x,$.dir.z,Zt.range);f.strips.push(O.pos.x,O.pos.z,ee,ie,.11,1,kc,.5+.5*J,.5);break}case"control":{let ie=ll(D,O.pos.x,O.pos.z,$.dir.x,$.dir.z,zt.range);f.strips.push(O.pos.x,O.pos.z,ee,ie,.95,X,vt,.9,.6);break}case"push":f.sectors.push(O.pos.x,O.pos.z,ee,Pt.range,Pt.halfAngle,X,vt,.9);break}}if(N){let O=F.fighters.find($=>$.id===F.playerId);if(O&&O.state!=="dead"&&O.state!=="falling"){let $=N.cancel?qx:vt,ee=Math.atan2(N.dir.z,N.dir.x);if(N.skill==="basic"){let X=ll(D,O.pos.x,O.pos.z,N.dir.x,N.dir.z,9);f.strips.push(O.pos.x,O.pos.z,ee,X,.09,1,$,N.cancel?.55:.85,.7)}else if(N.skill==="control"){let X=ll(D,O.pos.x,O.pos.z,N.dir.x,N.dir.z,11);f.strips.push(O.pos.x,O.pos.z,ee,X,.9,0,$,N.cancel?.5:.8,.8)}else f.sectors.push(O.pos.x,O.pos.z,ee,Pt.range,Pt.halfAngle,1,$,N.cancel?.6:.8)}}f.sectors.end(),f.strips.end()}function _(F,N,D,J,O){let $=gt(O,0,.1);W+=$,Z=Math.max(0,Z-$),se+=((Z>0?.32:1)-se)*Rs(14,$);let ee=$*se,X=new Map;for(let te of F.fighters)X.set(te.id,te);for(let te of F.fighters){let ve=b.get(te.id);ve&&ve.variant!==te.variant&&(ve.dispose(),b.delete(te.id),ve=void 0),ve||(ve=new sl(r,te.variant),b.set(te.id,ve))}for(let[te,ve]of b)X.has(te)||(ve.dispose(),b.delete(te));Ae(N,F,X);let ie=X.get(F.playerId),de=(ie?ie.pos.x:0)*wd,ge=M+(ie?ie.pos.z:0)*wd,fe=Rs(Xx,$);C.x+=(de-C.x)*fe,C.y+=(ge-C.y)*fe,Y=Math.max(0,Y-$*1.1),z=Math.max(0,z-$*1.5);let Ne=C.x+(q.x*.5-C.x)*.4*Y*Y,B=C.y+(q.y*.5-C.y)*.4*Y*Y,ae=Ie(I/y)*(1-.1*Math.sin(z*Math.PI*.5));ze(l,Ne,B,ae),L=Math.max(0,L-$*2.4);let me=L*L*.55,Ee=(Math.sin(W*53.1)+Math.sin(W*31.7+1.3))*.5*me,le=(Math.sin(W*47.3+2.1)+Math.sin(W*29.1))*.5*me;ze(c,Ne,B,ae,Ee,le),c.rotation.z=Math.sin(W*41)*L*L*.012,c.updateMatrixWorld(!0);for(let te of F.fighters){let ve=b.get(te.id);ve.update(te,J),ve.wantDust(te,ee)&&Be(te.pos.x,te.pos.z,2,1,.45,.4),te.state==="falling"&&ne()<.9&&p.spawn({x:te.pos.x+re(-.15,.15),y:te.y+.9,z:te.pos.z+re(-.15,.15),size:.28,size1:.1,aspect:2.8,color:[.9,.95,1],alpha:.4,life:.4,vy:3})}x.begin(),g.begin(),Le(F),Se(ee),x.end(),g.end(),w(F,D),nt(ee),V(ee),p.update(ee),m.update(ee),a.update($),s.render(r,c),R.update(F.fighters,ye,$)}function k(){for(let F of b.values())F.dispose();b.clear(),A.clear(),p.clear(),m.clear(),E.length=0,v.length=0;for(let F of S)F.on=!1,F.mesh.visible=!1;R.clear(),L=0,z=0,Y=0,Z=0,se=1}return We(I,y),{render:_,resize:We,worldToScreen:ye,screenToGround:j,reset:k}}var Is=62,Vc=50,Gc=.14,$x=14,Zx=1.1,Rd=.8,Jx={basic:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/><path d="M24 4v10M24 34v10M4 24h10M34 24h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',control:'<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="11" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="21" cy="21" r="2.5" fill="currentColor"/><path d="M21 4v8M21 30v8M4 21h8M30 21h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="8" fill="#0b1a2b" stroke="currentColor" stroke-width="2.5"/><path d="M36 31v5l3 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',push:'<svg viewBox="0 0 48 48"><path d="M8 24l12-10v7h8v6h-8v7z" fill="currentColor"/><path d="M32 10l6 6M34 24h8M32 38l6-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',dash:'<svg viewBox="0 0 48 48"><path d="M8 12l12 12-12 12M22 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},Wc=[{id:"basic",label:"\u57FA\u790E\u653B\u64CA",cls:"big"},{id:"dash",label:"\u4F4D\u79FB",cls:""},{id:"control",label:"\u63A7\u5236",cls:""},{id:"push",label:"\u64CA\u9000",cls:""}],Kx=`
<div class="hud" hidden>
  <div class="hp" data-box="hp"><div class="hp-fill"></div><span class="hp-text">100 / 100</span></div>
  <div class="timer" data-box="timer">00:00</div>
  <button class="pause" data-box="pause" aria-label="\u66AB\u505C"><svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg></button>
  <div class="ver" data-box="ver"></div>
</div>
<div class="controls" hidden>
  <div class="stick-zone"></div>
  <div class="stick" data-box="stick"><div class="knob"></div></div>
  ${Wc.map(i=>`<div class="skill ${i.id} ${i.cls}" data-skill="${i.id}" data-box="skill-${i.id}" aria-label="${i.label}">${Jx[i.id]}<i class="cd"></i><b class="cdt"></b><em class="cancel">\u53D6\u6D88</em></div>`).join("")}
</div>
<div class="banner" aria-live="polite"></div>
<div class="menu menu-title" hidden>
  <div class="panel">
    <h1>\u6D6E\u5CF6\u7375\u4EBA S0</h1>
    <p class="sub">\u4FEF\u8996\u89D2\u7375\u4EBA\u6230\u9B25\u539F\u578B</p>
    <p class="title-ver"></p>
    <div class="btns">
      <button data-act="start1">1 \u5C0D 1</button>
      <button data-act="start2">1 \u5C0D 2</button>
      <button class="ghost" data-act="howto">\u64CD\u4F5C\u8AAA\u660E</button>
    </div>
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
    <dl class="stats">
      <div><dt>\u547D\u4E2D\u7387</dt><dd data-stat="acc">\u2014</dd></div>
      <div><dt>\u9023\u62DB\u6578</dt><dd data-stat="combos">0</dd></div>
      <div><dt>\u64CA\u843D\u6578</dt><dd data-stat="fall">0</dd></div>
      <div><dt>\u64CA\u5012\u6578</dt><dd data-stat="hp">0</dd></div>
    </dl>
    <div class="btns row">
      <button data-act="again">\u518D\u4E00\u5834</button>
      <button data-act="start1">1 \u5C0D 1</button>
      <button data-act="start2">1 \u5C0D 2</button>
    </div>
  </div>
</div>
<div class="rotate"><div>\u8ACB\u628A\u624B\u6A5F\u8F49\u6210\u6A6B\u5F0F</div></div>
`,Cd=(i,e)=>{let t=Math.hypot(i,e);return t<1e-6?null:{x:i/t,z:e/t}};function Id(i,e){i.innerHTML=Kx;let t=V=>i.querySelector(V),n=t(".hud"),s=t(".controls"),r={title:t(".menu-title"),howto:t(".menu-howto"),pause:t(".menu-pause"),result:t(".menu-result")},o=t(".stick-zone"),a=t(".stick"),c=t(".knob"),l=t(".hp-fill"),h=t(".hp-text"),d=t(".timer"),u=t(".ver"),p=t(".banner"),m=Object.fromEntries(Wc.map(V=>[V.id,t(`.skill.${V.id}`)])),x=Object.fromEntries(Wc.map(V=>[V.id,{ring:m[V.id].querySelector(".cd"),text:m[V.id].querySelector(".cdt")}])),g=document.querySelector('meta[name="build-sha"]')?.getAttribute("content")??"";u.textContent=`${yi} \xB7 ${g&&!g.startsWith("__")?g:"dev"}`,t(".title-ver").textContent=yi;let f=!1,S=!1,E=!1,v="1v1",R=!1,b=null,A={basic:null,control:null,push:null},I=null,y=!1,M=new Set,C=null,L=!1,z=!1,Y=!1,q=0,Z=0,se=null,W=()=>f&&!S;function oe(V,ce){return ce!=="basic"&&V.dragged&&Math.hypot(V.x-V.cx,V.y-V.cy)<V.r*Rd}function ue(V){let ce=Cd(V.x-V.cx,V.y-V.cy);return ce&&Math.hypot(V.x-V.cx,V.y-V.cy)>=V.r*Rd&&(V.lastDir=ce),V.lastDir}function pe(){if(!Y)return null;let V=e.getPlayerPos(),ce=V&&e.screenToGround(q,Z);return!V||!ce||(se=Cd(ce.x-V.x,ce.z-V.z)??se),se}function Ie(){a.classList.remove("active"),a.style.left=a.style.top=a.style.bottom="",c.style.transform=""}function ze(){b=null,Ie();for(let V of["basic","control","push"])A[V]=null;for(let V of Object.keys(m))m[V].classList.remove("pressed","aiming","cancelling");I=null,y=!1,M.clear(),C=null,L=!1,z=!1}o.addEventListener("pointerdown",V=>{if(V.pointerType==="mouse"||b||!W())return;V.preventDefault(),o.setPointerCapture(V.pointerId);let ce=Math.min(Math.max(V.clientX,Is+4),window.innerWidth-Is-4),Le=Math.min(Math.max(V.clientY,Is+4),window.innerHeight-Is-4);b={pid:V.pointerId,cx:ce,cy:Le,move:{x:0,z:0}},a.classList.add("active"),a.style.left=`${ce-Is}px`,a.style.top=`${Le-Is}px`,a.style.bottom="auto",We(V)});function We(V){if(!b||V.pointerId!==b.pid)return;let ce=V.clientX-b.cx,Le=V.clientY-b.cy,w=Math.hypot(ce,Le),_=w>Vc?Vc/w:1;c.style.transform=`translate(${ce*_}px, ${Le*_}px)`;let k=Math.min(w/Vc,1);if(k<=Gc)b.move={x:0,z:0};else{let F=(k-Gc)/(1-Gc);b.move={x:ce/w*F,z:Le/w*F}}}function ye(V){!b||V.pointerId!==b.pid||(b=null,Ie())}o.addEventListener("pointermove",We),o.addEventListener("pointerup",ye),o.addEventListener("pointercancel",ye);for(let V of["basic","control","push"]){let ce=m[V];ce.addEventListener("pointerdown",w=>{if(A[V]||!W())return;w.preventDefault(),ce.setPointerCapture(w.pointerId);let _=ce.getBoundingClientRect();A[V]={pid:w.pointerId,cx:_.left+_.width/2,cy:_.top+_.height/2,r:_.width/2,sx:w.clientX,sy:w.clientY,x:w.clientX,y:w.clientY,dragged:!1,lastDir:null},ce.classList.add("pressed")}),ce.addEventListener("pointermove",w=>{let _=A[V];!_||w.pointerId!==_.pid||(_.x=w.clientX,_.y=w.clientY,!_.dragged&&Math.hypot(_.x-_.sx,_.y-_.sy)>=$x&&Math.hypot(_.x-_.cx,_.y-_.cy)>_.r*Zx&&(_.dragged=!0),ce.classList.toggle("aiming",_.dragged),ce.classList.toggle("cancelling",oe(_,V)))});let Le=(w,_)=>{let k=A[V];!k||w.pointerId!==k.pid||(k.x=w.clientX,k.y=w.clientY,A[V]=null,ce.classList.remove("pressed","aiming","cancelling"),!(V==="basic"||_||!W())&&(k.dragged?oe(k,V)||(I={skill:V,dir:ue(k)}):I={skill:V,dir:null}))};ce.addEventListener("pointerup",w=>Le(w,!1)),ce.addEventListener("pointercancel",w=>Le(w,!0))}m.dash.addEventListener("pointerdown",V=>{W()&&(V.preventDefault(),y=!0,m.dash.classList.add("pressed"))});let j=()=>m.dash.classList.remove("pressed");m.dash.addEventListener("pointerup",j),m.dash.addEventListener("pointercancel",j);let ne=V=>{C||(C=V,L=!1)};window.addEventListener("keydown",V=>{if(Me(),V.code==="Escape"){if(V.repeat)return;C&&!L?L=!0:W()&&qe();return}if(W()){if(V.repeat){V.code==="Space"&&V.preventDefault();return}switch(V.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":M.add(V.code);break;case"KeyQ":ne("control");break;case"KeyE":ne("push");break;case"Space":V.preventDefault(),y=!0;break;case"ShiftLeft":case"ShiftRight":y=!0;break}}}),window.addEventListener("keyup",V=>{M.delete(V.code);let ce=V.code==="KeyQ"?"control":V.code==="KeyE"?"push":null;ce&&C===ce&&(!L&&W()&&(I={skill:ce,dir:pe()}),C=null,L=!1)});let re=V=>!V.target.closest(".skill, .pause, .menu, .stick");window.addEventListener("pointerdown",V=>{if(V.pointerType==="mouse"){if(Y=!0,q=V.clientX,Z=V.clientY,V.button===2){C&&(L=!0);return}V.button===0&&W()&&re(V)&&(z=!0)}}),window.addEventListener("pointermove",V=>{V.pointerType==="mouse"&&(Y=!0,q=V.clientX,Z=V.clientY)}),window.addEventListener("pointerup",V=>{V.pointerType==="mouse"&&V.button===0&&(z=!1)}),window.addEventListener("blur",ze),document.addEventListener("visibilitychange",()=>{document.hidden&&(ze(),W()&&qe())});let we=V=>V.preventDefault();for(let V of["gesturestart","gesturechange","gestureend","dblclick","contextmenu","selectstart","dragstart"])document.addEventListener(V,we);document.addEventListener("touchmove",we,{passive:!1});function Me(){R||(R=!0,e.onFirstGesture())}window.addEventListener("pointerup",Me,!0);let De=()=>{for(let V of Object.values(r))V.hidden=!0};function Be(V){v=V}function P(V){Be(V),e.onStart(V),Se.showPlaying()}function qe(){ze(),S=!0,e.onPause(),r.pause.hidden=!1}let Ue=t('[data-act="mute"]');i.addEventListener("click",V=>{let ce=V.target.closest("[data-act]")?.getAttribute("data-act");if(ce)switch(ce){case"start1":P("1v1");break;case"start2":P("1v2");break;case"again":P(v);break;case"restart":P(v);break;case"howto":r.title.hidden=!0,r.howto.hidden=!1;break;case"back":r.howto.hidden=!0,r.title.hidden=!1;break;case"resume":S=!1,r.pause.hidden=!0,e.onResume();break;case"title":Se.showTitle();break;case"mute":E=!E,Ue.textContent=`\u97F3\u6548\uFF1A${E?"\u95DC":"\u958B"}`,e.setMuted(E);break}}),t(".pause").addEventListener("click",()=>{W()&&qe()});let Ce={hp:"",fill:"",time:"",low:!1},Ae={basic:{ring:"",text:"",cooling:!1},control:{ring:"",text:"",cooling:!1},push:{ring:"",text:"",cooling:!1},dash:{ring:"",text:"",cooling:!1}},nt=null,Se={readIntent(){let V={move:{x:0,z:0},fire:!1,fireDir:null,cast:null,dash:!1,dashDir:null};if(!W())return I=null,y=!1,V;let ce;if(b)ce=b.move;else{let F=(M.has("KeyD")?1:0)-(M.has("KeyA")?1:0),N=(M.has("KeyS")?1:0)-(M.has("KeyW")?1:0);F&&N&&(F*=Math.SQRT1_2,N*=Math.SQRT1_2),ce={x:F,z:N}}let Le=A.basic,w=!!Le||z,_=null;Le&&Le.dragged?_=ue(Le):!Le&&z&&(_=pe());let k={move:{x:ce.x,z:ce.z},fire:w,fireDir:_,cast:I,dash:y,dashDir:null};return I=null,y=!1,k},aimPreview(){if(!W())return null;for(let ce of["control","push"]){let Le=A[ce];if(Le&&Le.dragged){let w=oe(Le,ce),_=ue(Le);if(_)return{skill:ce,dir:_,cancel:w}}}if(C)return{skill:C,dir:pe()??{x:1,z:0},cancel:L};let V=A.basic;if(V&&V.dragged){let ce=ue(V);if(ce)return{skill:"basic",dir:ce,cancel:!1}}if(!V&&z){let ce=pe();if(ce)return{skill:"basic",dir:ce,cancel:!1}}return null},update(V){let ce=V.fighters.find(D=>D.id===V.playerId);if(!ce)return;let w=`${Math.max(0,Math.ceil(ce.hp))} / ${Math.ceil(ce.maxHp)}`;w!==Ce.hp&&(Ce.hp=w,h.textContent=w);let _=`${Math.max(0,Math.min(1,ce.hp/ce.maxHp))*100}%`;_!==Ce.fill&&(Ce.fill=_,l.style.width=_);let k=ce.hp/ce.maxHp<.3;k!==Ce.low&&(Ce.low=k,l.classList.toggle("low",k));let F=Math.max(0,Math.floor(V.time)),N=`${String(Math.floor(F/60)).padStart(2,"0")}:${String(F%60).padStart(2,"0")}`;N!==Ce.time&&(Ce.time=N,d.textContent=N);for(let D of Object.keys(x)){let J=ce.cooldowns[D]??0,O=ce.cooldownMax[D]??0,ee=`${((O>0?Math.max(0,Math.min(1,J/O)):0)*360).toFixed(0)}deg`,X=D!=="basic"&&J>.05?J>=10?J.toFixed(0):J.toFixed(1):"",ie=Ae[D];ee!==ie.ring&&(ie.ring=ee,x[D].ring.style.setProperty("--cd",ee)),X!==ie.text&&(ie.text=X,x[D].text.textContent=X);let de=J>.05;de!==ie.cooling&&(ie.cooling=de,m[D].classList.toggle("cooling",de))}},showTitle(){ze(),f=!1,S=!1,De(),n.hidden=!0,s.hidden=!0,r.title.hidden=!1},showResult(V){ze(),f=!1,S=!1,v=V.mode,De(),n.hidden=!0,s.hidden=!0;let ce=V.result==="win",Le=r.result;Le.classList.toggle("win",ce),Le.classList.toggle("lose",!ce),Le.querySelector(".res-title").textContent=ce?"\u52DD\u5229":"\u5931\u6557",Le.querySelector(".res-text").textContent=ce?"":V.loseText??"";let w=V.stats,_=(k,F)=>{Le.querySelector(`[data-stat="${k}"]`).textContent=F};_("acc",w.shotsFired>0?`${Math.round(w.shotsHit*100/w.shotsFired)}%\uFF08${w.shotsHit}/${w.shotsFired}\uFF09`:"\u2014"),_("combos",String(w.combos)),_("fall",String(w.kills.fall)),_("hp",String(w.kills.hp)),Le.hidden=!1},showPlaying(){ze(),f=!0,S=!1,De(),n.hidden=!1,s.hidden=!1},banner(V,ce){p.textContent=V,p.className=`banner ${ce}`,nt?.cancel(),typeof p.animate=="function"&&(nt=p.animate([{opacity:0,transform:"translate(-50%, 0) scale(0.7)"},{opacity:1,transform:"translate(-50%, 0) scale(1.05)",offset:.15},{opacity:1,transform:"translate(-50%, 0) scale(1)",offset:.65},{opacity:0,transform:"translate(-50%, -14px) scale(1)"}],{duration:1200,easing:"ease-out",fill:"both"}))}};return Se.showTitle(),Se}var Qx={shootP:.05,shootE:.14,hitP:.05,hitE:.07,hurt:.12,windupH:.4,windupB:.25,windupP:.2,cast:.1,dash:.1,blocked:.07,fall:.3,combo:.15};function Pd(){let i=null,e=null,t=null,n=!1,s=0,r={};function o(){if(i)return i;let m=window,x=m.AudioContext||m.webkitAudioContext;if(!x)return null;try{i=new x}catch{return null}e=i.createGain(),e.gain.value=n?0:.5;let g=i.createDynamicsCompressor();g.threshold.value=-18,g.ratio.value=6,g.attack.value=.003,g.release.value=.15,e.connect(g),g.connect(i.destination),t=i.createBuffer(1,i.sampleRate,i.sampleRate);let f=t.getChannelData(0);for(let S=0;S<f.length;S++)f[S]=Math.random()*2-1;return i}function a(m){return s>=28?!1:(s++,setTimeout(()=>{s=Math.max(0,s-1)},(m+.1)*1e3),!0)}function c(m,x,g,f,S=.004){m.gain.setValueAtTime(1e-4,x),m.gain.linearRampToValueAtTime(g,x+S),m.gain.exponentialRampToValueAtTime(1e-4,x+f)}function l(m,x,g,f,S,E,v=0){if(!e||!a(S+v))return;let R=m.currentTime+v,b=m.createOscillator(),A=m.createGain();b.type=x,b.frequency.setValueAtTime(g,R),f!==g&&b.frequency.exponentialRampToValueAtTime(Math.max(20,f),R+S),c(A,R,E,S),b.connect(A),A.connect(e),b.start(R),b.stop(R+S+.02)}function h(m,x,g,f,S,E,v,R=0){if(!e||!t||!a(E+R))return;let b=m.currentTime+R,A=m.createBufferSource();A.buffer=t,A.loop=!0;let I=m.createBiquadFilter();I.type=x,I.Q.value=S,I.frequency.setValueAtTime(g,b),f!==g&&I.frequency.exponentialRampToValueAtTime(Math.max(20,f),b+E);let y=m.createGain();c(y,b,v,E,.006),A.connect(I),I.connect(y),y.connect(e),A.start(b,Math.random()*.5),A.stop(b+E+.02)}function d(m,x){let g=m.currentTime;return g-(r[x]??-1)<(Qx[x]??.05)?!1:(r[x]=g,!0)}function u(m,x,g){let f=x==="push"||x==="enemyHeavy";g?(l(m,"sine",f?150:200,f?55:90,f?.32:.2,f?.5:.36),h(m,"lowpass",1400,300,.7,f?.26:.14,f?.3:.2),l(m,"triangle",330,220,.12,.12)):f?(l(m,"sine",170,60,.28,.42),h(m,"bandpass",900,250,.9,.22,.26)):x==="control"?(l(m,"triangle",520,300,.12,.2),h(m,"bandpass",2400,1400,1.2,.09,.14)):(l(m,"square",760,520,.05,.07),h(m,"highpass",3e3,3e3,.7,.05,.1))}function p(m,x,g){switch(x.type){case"shoot":{let f=x.ownerId===g;if(!d(m,f?"shootP":"shootE"))return;if(f){let S=x.kind==="control";l(m,"square",S?520:900,S?260:380,.07,.07),h(m,"bandpass",2600,1200,1.4,.05,.08)}else l(m,"sine",300,150,.09,.1),h(m,"lowpass",900,400,.8,.06,.08);return}case"hit":{let f=x.targetId===g;if(!f&&x.sourceId!==g||!d(m,f?"hurt":"hitP"))return;u(m,x.kind,f);return}case"windupStart":{if(x.skill==="enemyHeavy"){if(!d(m,"windupH"))return;l(m,"triangle",392,440,.16,.26),l(m,"triangle",523,587,.2,.28,.15),l(m,"sine",196,262,Math.min(.5,x.dur),.18)}else if(x.skill==="enemyBasic"){if(!d(m,"windupB"))return;l(m,"sine",620,700,.06,.07)}else if(x.ownerId===g){if(!d(m,"windupP"))return;l(m,"sine",240,380,Math.min(.3,x.dur),.09)}return}case"cast":{if(!d(m,"cast"))return;let f=x.skill==="enemyHeavy";l(m,"sine",f?120:140,40,.38,f?.55:.5),h(m,"lowpass",1800,150,.8,.3,.3);return}case"dash":{if(!d(m,"dash"))return;let f=x.ownerId===g;h(m,"bandpass",600,3800,1.1,.22,f?.26:.14);return}case"blocked":{if(!d(m,"blocked"))return;l(m,"triangle",190,110,.07,.2),h(m,"bandpass",1500,900,2,.06,.2);return}case"fall":{if(!d(m,"fall"))return;let S=x.ownerId===g?.3:.2;h(m,"bandpass",1800,220,1.6,.9,S),l(m,"sine",700,120,.9,S*.45);return}case"combo":{if(!d(m,"combo"))return;l(m,"sine",988,988,.14,.2),l(m,"sine",1319,1319,.22,.2,.08),l(m,"triangle",1976,1976,.2,.06,.08);return}case"roundEnd":{let f=x.result==="win",S=f?[523.25,659.25,783.99,1046.5]:[392,349.23,311.13,233.08];S.forEach((E,v)=>{let R=v===S.length-1;l(m,f?"triangle":"sine",E,E,R?.7:.2,.28,v*.17),f&&R&&l(m,"sine",E*1.5,E*1.5,.7,.1,v*.17)});return}default:return}}return{unlock(){let m=o();if(m)try{m.resume();let x=m.createBuffer(1,1,22050),g=m.createBufferSource();g.buffer=x,g.connect(m.destination),g.start(0)}catch{}},play(m,x){if(!(n||!i||!e||m.length===0)){if(i.state!=="running"){i.resume().catch(()=>{});return}for(let g of m)try{p(i,g,x)}catch{}}},setMuted(m){n=m,e&&i&&e.gain.setTargetAtTime(m?0:.5,i.currentTime,.01)}}}function jx(i){let e=/v(\d+(?:\.\d+)*)/.exec(i);return e?e[1]:"0"}function e_(i,e){let t=i.split(".").map(Number),n=e.split(".").map(Number);for(let s=0;s<Math.max(t.length,n.length);s++){let r=(t[s]||0)-(n[s]||0);if(r)return r}return 0}function Ld(i){if(!/^https?:/.test(location.protocol))return;let e=jx(yi),t=document.createElement("button");t.id="updBar",i.appendChild(t);let n=0,s=null;t.addEventListener("click",()=>{s&&location.replace(`${location.pathname}?v=${s}`)});let r=o=>{let a=Date.now();if(!o&&a-n<6e4)return;n=a;let c=`${location.pathname.replace(/[^/]*$/,"")}index.html?upd=${a}`;fetch(c,{cache:"no-store"}).then(l=>l.ok?l.text():"").then(l=>{let h=/<meta name="app-version" content="([\d.]+)"/.exec(l);!h||e_(h[1],e)<=0||(s=h[1],t.textContent=`\u{1F195} \u6709\u65B0\u7248 v${s}\uFF0C\u9EDE\u9019\u88E1\u66F4\u65B0`,t.classList.add("on"))}).catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&r(!1)}),addEventListener("pageshow",()=>r(!1)),setTimeout(()=>r(!0),1500)}var Ud=new URLSearchParams(location.search),t_=document.getElementById("game"),n_=document.getElementById("overlay"),Fd=document.getElementById("ui"),i_=Xr(),cl=Ad(t_,n_,i_),Xc=Pd(),ut=null,Ds=!1,Nd=Ud.get("ai")!=="0",Ps=0,kr=0,Hr=0,Ls=-1,Tn=Id(Fd,{onStart:i=>Od(i),onPause:()=>{Ds=!0},onResume:()=>{Ds=!1},getPlayerPos:()=>ut?ut.player.pos:null,screenToGround:(i,e)=>cl.screenToGround(i,e),onFirstGesture:()=>Xc.unlock(),setMuted:i=>Xc.setMuted(i)});function Od(i,e){let t=e??(Number(Ud.get("seed"))||Date.now()%1e9);ut=new Ns(i,t),ut.aiEnabled=Nd,cl.reset(),Tn.showPlaying(),Ds=!1,Ps=0,kr=0,Hr=0,Ls=-1}function s_(i){if(!ut)return;let e=ut.state.playerId;for(let t of i)t.type==="combo"?Tn.banner("\u9023\u62DB\uFF01","good"):t.type==="fall"?t.ownerId===e?Tn.banner("\u589C\u843D\u2026\u2026","bad"):(Tn.banner("\u64CA\u843D\uFF01","good"),Hr=.6):t.type==="death"&&t.ownerId!==e&&t.cause==="hp"?Tn.banner("\u64CA\u5012\uFF01","good"):t.type==="edgeSave"&&t.ownerId===e?Tn.banner("\u9A5A\u96AA\u6551\u56DE\uFF01","info"):t.type==="roundEnd"&&(Ls=1.3)}var Dd=performance.now();function Bd(i){let e=Math.min(.1,(i-Dd)/1e3);Dd=i;let t=[],n=0;if(ut&&!Ds){if(kr>0)kr-=e;else{let s=Hr>0?.35:1;Hr=Math.max(0,Hr-e),Ps+=e*s;let r=0;for(;Ps>=Vi&&r<6;){ut.step(Tn.readIntent());for(let o of ut.drainEvents())t.push(o);if(Ps-=Vi,n+=Vi,r++,ut.hitstop>0){kr=Math.max(kr,ut.hitstop),ut.hitstop=0,Ps=0;break}}r>=6&&(Ps=0)}s_(t),Xc.play(t,ut.state.playerId),Ls>0&&(Ls-=e,Ls<=0&&(Ls=-1,Tn.showResult(ut.state)))}ut&&(cl.render(ut.state,t,Ds?null:Tn.aimPreview(),n,e),Tn.update(ut.state)),requestAnimationFrame(Bd)}function qc(){let i=window.visualViewport;cl.resize(i?i.width:innerWidth,i?i.height:innerHeight)}addEventListener("resize",qc);window.visualViewport?.addEventListener("resize",qc);qc();ut=new Ns("1v1",1);ut.aiEnabled=!1;Tn.showTitle();var r_={state:()=>JSON.parse(JSON.stringify(ut.state)),start:(i,e)=>Od(i,e),setAI:i=>{Nd=i,ut&&(ut.aiEnabled=i)},place:(i,e,t)=>ut?.place(i,e,t),kill:(i,e)=>ut?.debugKill(i,e),freeze:i=>{Ds=i},version:`${yi} (ef5f182)`};window.__hunter=r_;Ld(Fd);requestAnimationFrame(Bd);})();
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
