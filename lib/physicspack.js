goo.PhysicsMaterial=function(){"use strict";function t(t){t=t||{},this.friction=void 0!==t.friction?t.friction:.3,this.restitution=void 0!==t.restitution?t.restitution:0}return t}(),goo.Collider=function(){"use strict";function t(){}return t.prototype.clone=function(){return new t},t.prototype.transform=function(){},t}(),goo.BoxCollider=function(t,o){"use strict";function e(e){e=e||{},this.halfExtents=e.halfExtents?new t(e.halfExtents):new t(.5,.5,.5),o.call(this)}return e.prototype=Object.create(o.prototype),e.prototype.constructor=e,e.prototype.transform=function(t,o){o.halfExtents.setVector(t.scale).mulVector(this.halfExtents)},e.prototype.clone=function(){return new e({halfExtents:this.halfExtents})},e}(goo.Vector3,goo.Collider),goo.CylinderCollider=function(t){"use strict";function o(o){o=o||{},this.radius=void 0!==o.radius?o.radius:.5,this.height=void 0!==o.height?o.height:1,t.call(this)}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.transform=function(t,o){var e=t.scale;o.radius=Math.max(e[0],e[1])*this.radius,o.height=e[2]*this.height},o.prototype.clone=function(){return new o({radius:this.radius,height:this.height})},o}(goo.Collider),goo.MeshCollider=function(t,o){"use strict";function e(e){e=e||{},this.meshData=e.meshData,this.scale=void 0!==e.scale?new o(e.scale):new o(1,1,1),t.call(this)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.prototype.transform=function(t,o){o.scale.setVector(this.scale).mulVector(t.scale)},e.prototype.clone=function(){return new e({meshData:this.meshData,scale:this.scale})},e}(goo.Collider,goo.Vector3),goo.PlaneCollider=function(t){"use strict";function o(){t.call(this)}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.transform=function(){},o.prototype.clone=function(){return new o},o}(goo.Collider),goo.SphereCollider=function(t){"use strict";function o(o){o=o||{},this.radius=void 0!==o.radius?o.radius:.5,t.call(this)}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.transform=function(t,o){var e=t.scale.data;o.radius=this.radius*Math.max(Math.abs(e[0]),Math.abs(e[1]),Math.abs(e[2]))},o.prototype.clone=function(){return new o({radius:this.radius})},o}(goo.Collider),goo.PhysicsJoint=function(){"use strict";function t(t){t=t||{},this.connectedEntity=t.connectedEntity||null,this.collideConnected=void 0!==t.collideConnected?t.collideConnected:!1}return t}(),goo.BallJoint=function(t,o){"use strict";function e(e){e=e||{},t.call(this,e),this.localPivot=e.localPivot?new o(e.localPivot):new o(0,.5,0),this.autoConfigureConnectedPivot=e.autoConfigureConnectedPivot?e.autoConfigureConnectedPivot:!0,this.connectedLocalPivot=e.connectedLocalPivot?new o(e.connectedLocalPivot):new o(0,.5,0)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}(goo.PhysicsJoint,goo.Vector3),goo.HingeJoint=function(t,o){"use strict";function e(e){e=e||{},t.call(this,e),this.localPivot=e.localPivot?new o(e.localPivot):new o(0,.5,0),this.autoConfigureConnectedPivot=e.autoConfigureConnectedPivot?e.autoConfigureConnectedPivot:!0,this.connectedLocalPivot=e.connectedLocalPivot?new o(e.connectedLocalPivot):new o,this.localAxis=e.localAxis?new o(e.localAxis):new o(1,0,0)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}(goo.PhysicsJoint,goo.Vector3),goo.AbstractPhysicsSystem=function(t,o){"use strict";function e(){t.apply(this,arguments),this.priority=-1,this._activeColliderEntities=[],this._colliderInsertedListener=function(t){this._activeColliderEntities.push(t.entity),this._colliderInserted(t.entity)}.bind(this),this._colliderDeletedListener=function(t){var o=this._activeColliderEntities,e=o.indexOf(t.entity);-1!==e&&this._activeColliderEntities.splice(e,1),this._colliderDeleted(t.entity)}.bind(this),this._colliderDeletedComponentListener=function(t){this._colliderDeletedComponent(t.entity,t.component)}.bind(this),o.addListener("goo.collider.inserted",this._colliderInsertedListener),o.addListener("goo.collider.deleted",this._colliderDeletedListener),o.addListener("goo.collider.deletedComponent",this._colliderDeletedComponentListener)}e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.prototype.setGravity=function(){};var n={entityA:null,entityB:null};return e.prototype.emitSubStepEvent=function(){o.emit("goo.physics.substep")},e.prototype.emitBeginContact=function(t,o){this._emitEvent("goo.physics.beginContact",t,o)},e.prototype.emitDuringContact=function(t,o){this._emitEvent("goo.physics.duringContact",t,o)},e.prototype.emitEndContact=function(t,o){this._emitEvent("goo.physics.endContact",t,o)},e.prototype._emitEvent=function(t,e,i){n.entityA=e,n.entityB=i,o.emit(t,n),n.entityA=null,n.entityB=null},e.prototype._colliderInserted=function(){},e.prototype._colliderDeleted=function(){},e.prototype._colliderDeletedComponent=function(){},e}(goo.System,goo.SystemBus),goo.PhysicsPlaneDebugShape=function(t){"use strict";function o(){var o=t.defaultMap([t.POSITION]);t.call(this,o,10,14),this.indexModes[0]="Lines",this.rebuild()}return o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype.buildWireframeData=function(){return new o},o.prototype.rebuild=function(){var o=[],e=[];return o.push(-1,-1,0,1,-1,0,1,1,0,-1,1,0,-2,0,0,2,0,0,0,-2,0,0,2,0,0,0,0,0,0,1),e.push(0,1,1,2,2,3,3,0,4,5,6,7,8,9),this.getAttributeBuffer(t.POSITION).set(o),this.getIndexBuffer().set(e),this},o}(goo.MeshData),goo.Pool=function(){"use strict";function t(t){t=t||{},this._objects=[],this._init=t.init||function(){},this._create=t.create||function(){},this._destroy=t.destroy||function(){}}return t.prototype.resize=function(t){for(var o=this._objects;o.length>t;)this._destroy(o.pop());for(;o.length<t;)o.push(this._create());return this},t.prototype.get=function(){var t=this._objects,o=t.length?t.pop():this._create();return this._init.apply(o,arguments),o},t.prototype.release=function(t){return this._destroy(t),this._objects.push(t),this},t}(),goo.PhysicsDebugRenderSystem=function(t,o,e,n,i,s,r,a,c,l,p,d,h,y,u,g,f,m){"use strict";function C(){o.call(this,"PhysicsDebugRenderSystem",["TransformComponent"]),this.priority=3,this.renderList=[],this.camera=null,e.addListener("goo.setCurrentCamera",function(t){this.camera=t.camera}.bind(this)),this.renderAll=!0,this.selection=new t,this.sphereMeshData=new n(8,8,1),this.boxMeshData=new i(1,1,1),this.cylinderMeshData=new s(10,1,1,1),this.planeMeshData=new r,this.material=new g(f.simpleColored),this.material.uniforms.color=[0,1,0],this.material.wireframe=!0,this.renderablePool=new m({create:function(){return{meshData:null,transform:new u,materials:[]}},init:function(t,o){this.meshData=t,this.materials[0]=o},destroy:function(t){t.meshData=null,t.materials.length=0}})}return C.prototype=Object.create(o.prototype),C.prototype.constructor=C,C.prototype.process=function(t){if(this.clear(),!this.passive)for(var o=0,e=t.length;o!==e;o++){var n=t[o];if((this.renderAll||this.selection.contains(n))&&n.colliderComponent){n.colliderComponent.updateWorldCollider();var i=n.colliderComponent.worldCollider,s=this.getMeshData(i),r=this.renderablePool.get(s,this.material);this.getWorldTransform(n,i,r.transform),r.transform.update(),this.renderList.push(r)}}},C.prototype.getWorldTransform=function(t,o,e){if(e.copy(t.transformComponent.worldTransform),o instanceof a){var n=o.radius;e.scale.set(n,n,n)}else o instanceof c?e.scale.copy(o.halfExtents).mul(2):o instanceof l?e.scale.set(o.radius,o.radius,o.height):o instanceof p?e.scale.set(1,1,1):o instanceof d&&e.scale.setVector(o.scale)},C.prototype.getMeshData=function(t){var o;return t instanceof a?o=this.sphereMeshData:t instanceof c?o=this.boxMeshData:t instanceof l?o=this.cylinderMeshData:t instanceof p?o=this.planeMeshData:t instanceof d&&(o=t.meshData),o},C.prototype.render=function(t){t.checkResize(this.camera),this.camera&&t.render(this.renderList,this.camera,null,null,!1)},C.prototype.clear=function(){for(var t=0,o=this.renderList.length;t!==o;t++)this.renderablePool.release(this.renderList[t]);this.renderList.length=0},C.prototype.cleanup=function(){this.clear()},C}(goo.EntitySelection,goo.System,goo.SystemBus,goo.Sphere,goo.Box,goo.Cylinder,goo.PhysicsPlaneDebugShape,goo.SphereCollider,goo.BoxCollider,goo.CylinderCollider,goo.PlaneCollider,goo.MeshCollider,goo.Quaternion,goo.Vector3,goo.Transform,goo.Material,goo.ShaderLib,goo.Pool),goo.AbstractRigidBodyComponent=function(t,o,e,n,i){"use strict";function s(){t.call(this,arguments),this.joints=[]}var r=new e;s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype.addJoint=function(t){this.joints.push(t)},s.prototype.removeJoint=function(t){var o=this.joints,e=o.indexOf(t);-1!==e&&o.splice(e,1)},s.initializedEvent={entity:null},s.prototype.emitInitialized=function(t){var o=s.initializedEvent;o.entity=t,i.emit("goo.physics.initialized",o),o.entity=null},s.prototype.initialize=function(){},s.prototype.destroy=function(){},s.prototype.initializeJoint=function(){},s.prototype.destroyJoint=function(){};var a=new n,c=new n,l=new n;return s.prototype.traverseColliders=function(t,o){t.transformComponent.updateTransform(),t.transformComponent.updateWorldTransform();var e=t.transformComponent.worldTransform;a.copy(e),a.invert(a);for(var i=[t];i.length;){var s=i.pop(),p=s.colliderComponent;if(p){s.transformComponent.updateTransform(),s.transformComponent.updateWorldTransform(),c.copy(s.transformComponent.worldTransform),n.combine(a,c,l);var d=l.translation,h=l.rotation;r.fromRotationMatrix(h),o.call(this,s,p.collider,d,r)}for(var y=s.transformComponent.children,u=0;u<y.length;u++){var g=y[u].entity;g.rigidBodyComponent||i.push(g)}}},s.prototype.attached=function(){},s.prototype.detached=function(){this._entity=null,this._system=null},s}(goo.Component,goo.Vector3,goo.Quaternion,goo.Transform,goo.SystemBus),goo.AbstractColliderComponent=function(t,o){"use strict";function e(o){t.apply(this),o=o||{},this.entity=null,this.collider=o.collider||null,this.worldCollider=this.collider?this.collider.clone():null,this.isTrigger=void 0!==o.isTrigger?o.isTrigger:!1,this.bodyEntity=null,this.material=void 0!==o.material?o.material:null}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.prototype.getBodyEntity=function(){var t;return this.entity.traverseUp(function(o){return o.rigidBodyComponent?(t=o,!1):void 0}),t},e.prototype.updateWorldCollider=function(){var t=[];this.entity.traverseUp(function(o){t.unshift(o)});for(var o=t.length,e=0;e!==o;e++){var n=t[e],i=n.transformComponent;i.updateTransform(),i.updateWorldTransform()}this.collider.transform(this.entity.transformComponent.worldTransform,this.worldCollider)},e.prototype.attached=function(t){this.entity=t,this.system=t._world.getSystem("PhysicsSystem")},e.prototype.detached=function(){this.entity=null},e.applyOnEntity=function(t,n){return t instanceof o?(n.setComponent(new e({collider:t})),!0):void 0},e.prototype.api={},e}(goo.Component,goo.Collider),goo.ColliderComponent=function(t,o,e,n,i,s,r,a,c){"use strict";function l(o){t.apply(this,arguments),this.type="ColliderComponent",o=o||{},this.cannonBody=null,this.cannonShape=null}var p=new c;return l.prototype=Object.create(t.prototype),l.prototype.constructor=l,l.type="ColliderComponent",l.prototype.initialize=function(){var t=null;this.material&&(t=new CANNON.Material,t.friction=this.material.friction,t.restitution=this.material.restitution),this.updateWorldCollider();var i=this.cannonShape=l.getCannonShape(this.worldCollider);i.material=t;var s=new CANNON.Body({mass:0,collisionResponse:!this.isTrigger});this.system.cannonWorld.addBody(s),this.cannonBody=s;var r=this.entity;this.system._shapeIdToColliderEntityMap.set(i.id,r);var a=r.transformComponent.worldTransform;s.position.copy(a.translation),p.fromRotationMatrix(a.rotation),s.quaternion.copy(p);var c=this.worldCollider;if(c instanceof e)i.radius=c.radius;else if(c instanceof o)i.halfExtents.copy(c.halfExtents),i.updateConvexPolyhedronRepresentation();else if(c instanceof n){var d=new CANNON.Vec3;d.copy(c.scale),i.setScale(d)}i.updateBoundingSphereRadius(),s.computeAABB(),s.addShape(i),s.aabbNeedsUpdate=!0},l.prototype.destroy=function(){var t=this.cannonBody;t.shapes.forEach(function(t){this.system._shapeIdToColliderEntityMap["delete"](t.id)}.bind(this)),this.system.cannonWorld.removeBody(t),this.cannonBody=null,this.cannonShape=null},l.numCylinderSegments=10,l.getCannonShape=function(t){var r;if(t instanceof o){var c=new CANNON.Vec3;c.copy(t.halfExtents),r=new CANNON.Box(c)}else if(t instanceof e)r=new CANNON.Sphere(t.radius);else if(t instanceof i)r=new CANNON.Plane;else if(t instanceof s){r=new CANNON.Cylinder(t.radius,t.radius,t.height,l.numCylinderSegments);var p=new CANNON.Quaternion;p.setFromAxisAngle(new a(0,0,1),-Math.PI/2),r.transformAllPoints(new a,p),r.computeEdges(),r.updateBoundingSphereRadius()}else if(t instanceof n){if("Triangles"!==t.meshData.indexModes[0])throw new Error("MeshCollider data must be a triangle mesh!");r=new CANNON.Trimesh(t.meshData.getAttributeBuffer("POSITION"),t.meshData.getIndexBuffer())}else console.warn("Unhandled collider: ",t);return r},l.applyOnEntity=function(t,o){return t instanceof r?(o.setComponent(new l({collider:t})),!0):void 0},l}(goo.AbstractColliderComponent,goo.BoxCollider,goo.SphereCollider,goo.MeshCollider,goo.PlaneCollider,goo.CylinderCollider,goo.Collider,goo.Vector3,goo.Quaternion),goo.ColliderSystem=function(t,o){"use strict";function e(){t.call(this,"ColliderSystem",["ColliderComponent","TransformComponent"]),this.priority=1}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.prototype.process=function(){},e.prototype.inserted=function(t){o.emit("goo.collider.inserted",{entity:t})},e.prototype.deleted=function(t){o.emit("goo.collider.deleted",{entity:t})},e.prototype.removedComponent=function(t,e){o.emit("goo.collider.deletedComponent",{entity:t,component:e})},e}(goo.System,goo.SystemBus),goo.RaycastResult=function(t){"use strict";function o(o){o=o||{},this.point=o.point?new t(o.point):new t,this.normal=o.normal?new t(o.normal):new t,this.entity=o.entity||null}return o.prototype.reset=function(){this.entity=null},o}(goo.Vector3),goo.RigidBodyComponent=function(t,o,e,n,i,s,r,a,c,l,p,d){"use strict";function h(e){e=e||{},t.apply(this,arguments),this.type="RigidBodyComponent",this.cannonBody=null,this._dirty=!0,this._isKinematic=!!e.isKinematic,this._mass=void 0!==e.mass?e.mass:1,this._isKinematic?this._mass=0:0===this._mass&&(this._isKinematic=!0),this._initialized=!1,this._velocity=e.velocity?new o(e.velocity):new o,this._angularVelocity=e.angularVelocity?new o(e.angularVelocity):new o,this._linearDamping=void 0!==e.linearDamping?e.linearDamping:.01,this._angularDamping=void 0!==e.angularDamping?e.angularDamping:.05,this._sleepingThreshold=void 0!==e.sleepingThreshold?e.sleepingThreshold:.2,this._sleepingTimeLimit=void 0!==e.sleepingTimeLimit?e.sleepingTimeLimit:1,y||(y=new CANNON.Vec3,u=new CANNON.Vec3),this._colliderEntities=[]}var y,u,g=new e;return h.prototype=Object.create(t.prototype),h.prototype.constructor=h,h.type="RigidBodyComponent",h.numCylinderSegments=10,h.prototype.setTransformFromEntity=function(t){var o=t.transformComponent.worldTransform,e=this.cannonBody;e.position.copy(o.translation),g.fromRotationMatrix(o.rotation),e.quaternion.copy(g)},h.prototype.applyForce=function(t){y.copy(t),this.cannonBody.force.vadd(y,this.cannonBody.force)},h.prototype.setVelocity=function(t){this.cannonBody&&this.cannonBody.velocity.copy(t),this._velocity.setVector(t)},h.prototype.getVelocity=function(t){var o=this.cannonBody,e=o?o.velocity:this._velocity;t.setDirect(e.x,e.y,e.z)},h.prototype.setAngularVelocity=function(t){this.cannonBody&&this.cannonBody.angularVelocity.copy(t),this._angularVelocity.setVector(t)},h.prototype.getAngularVelocity=function(t){var o=this.cannonBody,e=o?o.angularVelocity:this._angularVelocity;t.setDirect(e.x,e.y,e.z)},h.prototype.setPosition=function(t){this.cannonBody&&this.cannonBody.position.copy(t)},h.prototype.getPosition=function(t){if(this.cannonBody){var o=this.cannonBody.position;t.setDirect(o.x,o.y,o.z)}},h.prototype.setQuaternion=function(t){this.cannonBody&&this.cannonBody.quaternion.copy(t)},h.prototype.getQuaternion=function(t){if(this.cannonBody){var o=this.cannonBody.quaternion;t.setDirect(o.x,o.y,o.z,o.w)}},Object.defineProperties(h.prototype,{linearDamping:{get:function(){return this._linearDamping},set:function(t){this.cannonBody&&(this.cannonBody.linearDamping=t),this._linearDamping=t}},angularDamping:{get:function(){return this._angularDamping},set:function(t){this.cannonBody&&(this.cannonBody.angularDamping=t),this._angularDamping=t}},isKinematic:{get:function(){return this._isKinematic},set:function(t){this._isKinematic=t,this.cannonBody&&(this.cannonBody.type=t?CANNON.Body.KINEMATIC:CANNON.Body.DYNAMIC,this.cannonBody.updateMassProperties())}},sleepingThreshold:{get:function(){return this._sleepingThreshold},set:function(t){this._sleepingThreshold=t,this.cannonBody&&(this.cannonBody.sleepSpeedLimit=t)}},mass:{get:function(){return this._mass},set:function(t){this._mass=t,this.cannonBody&&(this.cannonBody.mass=t,this.cannonBody.updateMassProperties())}},sleepingTimeLimit:{get:function(){return this._sleepingTimeLimit},set:function(t){this._sleepingTimeLimit=t,this.cannonBody&&(this.cannonBody.sleepTimeLimit=t)}}}),h.prototype.destroy=function(){var t=this.cannonBody;t&&(t.world.removeBody(t),delete this._system._entities[t.id],t.shapes.forEach(function(t){this._system._shapeIdToColliderEntityMap["delete"](t.id)}.bind(this)),this.cannonBody=null);for(var o=0;o<this._colliderEntities.length;o++)this._colliderEntities[o].bodyEntity=null;this._colliderEntities.length=0},h.prototype.initialize=function(){this.destroy();var t=this.cannonBody=new CANNON.Body({mass:this._mass,linearDamping:this._linearDamping,angularDamping:this._angularDamping,sleepSpeedLimit:this._sleepingThreshold,sleepTimeLimit:this._sleepingTimeLimit});this._system.cannonWorld.addBody(t),this._system._entities[t.id]=this._entity,this._initialized||(t.velocity.copy(this._velocity),t.angularVelocity.copy(this._angularVelocity)),this.traverseColliders(this._entity,function(t,o,e,n){this.addCollider(t,e,n),t.colliderComponent.bodyEntity=this._entity}),this._isKinematic&&(t.type=CANNON.Body.KINEMATIC),this.setTransformFromEntity(this._entity),t.aabbNeedsUpdate=!0,this.emitInitialized(this._entity)},h.prototype.initializeJoint=function(t){var o,e=this.cannonBody,n=(t.connectedEntity.rigidBodyComponent||t.connectedEntity.colliderComponent).cannonBody;if(t instanceof l){var i=t.localPivot.clone();i.mulVector(this._entity.transformComponent.transform.scale);var s=new CANNON.Vec3,r=new CANNON.Vec3;if(s.copy(i),t.autoConfigureConnectedPivot)e.pointToWorldFrame(s,r),n.pointToLocalFrame(r,r);else{var a=t.connectedLocalPivot.clone();a.mulVector(t.connectedEntity.transformComponent.transform.scale),r.copy(a)}o=new CANNON.PointToPointConstraint(e,s,n,r)}else if(t instanceof p){var s=new CANNON.Vec3,r=new CANNON.Vec3,c=new CANNON.Vec3,d=new CANNON.Vec3,i=t.localPivot.clone();if(i.mulVector(this._entity.transformComponent.transform.scale),s.copy(i),c.copy(t.localAxis),t.autoConfigureConnectedPivot)e.pointToWorldFrame(s,r),n.pointToLocalFrame(r,r);else{var a=t.connectedLocalPivot.clone();a.mulVector(t.connectedEntity.transformComponent.transform.scale),r.copy(a)}d.copy(t.localAxis),e.vectorToWorldFrame(t.localAxis,d),n.vectorToLocalFrame(d,d),o=new CANNON.HingeConstraint(e,n,{pivotA:s,pivotB:r,axisA:c,axisB:d,collideConnected:t.collideConnected})}else console.warn("Unhandled joint: ",t);o&&(e.world.addConstraint(o),t.cannonJoint=o)},h.copyScaleFromColliderToCannonShape=function(t,o){if(o instanceof s)t.radius=o.radius;else if(o instanceof i)t.halfExtents.copy(o.halfExtents),t.updateConvexPolyhedronRepresentation(),t.updateBoundingSphereRadius();else if(o instanceof c){var e;y||(y=new CANNON.Vec3),e=y,e.copy(o.scale),t.setScale(e)}t.updateBoundingSphereRadius()},h.prototype.destroyJoint=function(t){var o=this.cannonBody;o&&t.cannonJoint&&(o.world.removeConstraint(t.cannonJoint),t.cannonJoint=null)},h.prototype.addCollider=function(t,o,e){var n=this.cannonBody,i=t.colliderComponent;i.updateWorldCollider(!0);var s=i.worldCollider,r=i.cannonShape=d.getCannonShape(s);this._system._shapeIdToColliderEntityMap.set(r.id,t);var a=new CANNON.Material;a.friction=i.material?i.material.friction:-1,a.restitution=i.material?i.material.restitution:-1,r.material=a,r.collisionResponse=!i.isTrigger;var c=new CANNON.Vec3;o&&c.copy(o);var l=new CANNON.Quaternion;o&&l.copy(e),n.addShape(r,c,l),this._colliderEntities.push(t)},h.prototype.clone=function(){return new h({isKinematic:this._isKinematic,mass:this._mass,velocity:this._velocity,angularVelocity:this._angularVelocity,linearDamping:this._linearDamping,angularDamping:this._angularDamping,sleepingThreshold:this._sleepingThreshold,sleepingTimeLimit:this._sleepingTimeLimit})},h.prototype.attached=function(t){this._entity=t,this._system=t._world.getSystem("PhysicsSystem")},h.prototype.api={},h}(goo.AbstractRigidBodyComponent,goo.Vector3,goo.Quaternion,goo.Transform,goo.BoxCollider,goo.SphereCollider,goo.CylinderCollider,goo.PlaneCollider,goo.MeshCollider,goo.BallJoint,goo.HingeJoint,goo.ColliderComponent),goo.PhysicsSystem=function(t,o,e,n,i,s,r){"use strict";function a(o){o=o||{},this.cannonWorld=new CANNON.World({broadphase:new CANNON.SAPBroadphase});var e=this;this.cannonWorld.addEventListener("postStep",function(){e.emitContactEvents(),e.emitSubStepEvent()}),this._entities={},this._shapeIdToColliderEntityMap=new Map,c||(c=new CANNON.Vec3,l=new CANNON.Vec3,p=new CANNON.RaycastResult),this.setGravity(o.gravity||new n(0,-10,0)),this.stepFrequency=void 0!==o.stepFrequency?o.stepFrequency:60,this.maxSubSteps=void 0!==o.maxSubSteps?o.maxSubSteps:10,this._currentContacts=new Set,this._lastContacts=new Set,this._sortContacts=function(t,o){return a._getShapePairHash(t.si,t.sj)-a._getShapePairHash(o.si,o.sj)}.bind(this),this._emitEndContactEvents=function(t){var o=a._getShapeIdA(t),e=a._getShapeIdB(t),n=this._shapeIdToColliderEntityMap.get(o),i=this._shapeIdToColliderEntityMap.get(e),s=this._currentContacts.has(t);s||this.emitEndContact(n,i)}.bind(this),this._moveHashes=function(t){this._lastContacts.add(t),this._currentContacts["delete"](t)}.bind(this),this._emptyLastContacts=function(t){this._lastContacts["delete"](t)}.bind(this),this.initialized=!1,t.call(this,"PhysicsSystem",["RigidBodyComponent"])}var c,l,p,d=new i,h=new n,y=new r;a.prototype=Object.create(t.prototype),a.prototype.constructor=a,a.prototype._swapContactLists=function(){this._lastContacts.forEach(this._emptyLastContacts),this._currentContacts.forEach(this._moveHashes)},a.prototype.setGravity=function(t){this.cannonWorld.gravity.copy(t)},a.prototype.getGravity=function(t){var o=this.cannonWorld.gravity;t.x=o.x,t.y=o.y,t.z=o.z},a.prototype.step=function(t){var o=this.cannonWorld,e=1/this.stepFrequency,n=this.maxSubSteps;n?o.step(e,t,n):o.step(t)},a._getShapePairHash=function(t,o){var e=t.id,n=o.id;if(e>n){var i=e;e=n,n=i}var s=e<<16|n;return s},a._getShapeIdA=function(t){return(4294901760&t)>>16},a._getShapeIdB=function(t){return 65535&t},a.prototype._fillContactsMap=function(t,o){for(var e=0;e!==t.length;e++){var n=t[e],i=a._getShapePairHash(n.si,n.sj);o.add(i)}},a.prototype.emitContactEvents=function(){var t=this.cannonWorld.contacts.sort(this._sortContacts),o=this._currentContacts,e=this._lastContacts;this._fillContactsMap(t,o);for(var n,i=0;i<t.length;i++){var s=t[i],r=s.si,c=s.sj,l=this._shapeIdToColliderEntityMap.get(r.id),p=this._shapeIdToColliderEntityMap.get(c.id),d=a._getShapePairHash(s.si,s.sj);if(d!==n){var h=this._lastContacts.has(d);h?this.emitDuringContact(l,p):this.emitBeginContact(l,p)}n=d}e.forEach(this._emitEndContactEvents),this._swapContactLists()};var u={};a.prototype._getCannonRaycastOptions=function(t){return u.collisionFilterMask=void 0!==t.collisionMask?t.collisionMask:-1,u.collisionFilterGroup=void 0!==t.collisionGroup?t.collisionGroup:-1,u.skipBackfaces=void 0!==t.skipBackfaces?t.skipBackfaces:!0,u},a.prototype._copyCannonRaycastResultToGoo=function(t,o){if(t.hasHit){o.entity=this._entities[t.body.id]||this._shapeIdToColliderEntityMap.get(t.shape.id);var e=t.hitPointWorld,n=t.hitNormalWorld;o.point.setDirect(e.x,e.y,e.z),o.normal.setDirect(n.x,n.y,n.z)}return t.hasHit},a.prototype._getCannonStartEnd=function(t,o,e,n,i){n.copy(t),i.copy(o),i.scale(e,i),i.vadd(t,i)},a.prototype.raycastAny=function(t,e,n,i,s){i instanceof o&&(s=i,i={}),i=i||{},s=s||new o;var r=c,a=l;return this._getCannonStartEnd(t,e,n,r,a),this.cannonWorld.raycastAny(r,a,this._getCannonRaycastOptions(i),p),this._copyCannonRaycastResultToGoo(p,s)},a.prototype.raycastClosest=function(t,e,n,i,s){i instanceof o&&(s=i,i={}),i=i||{},s=s||new o;var r=c,a=l;return this._getCannonStartEnd(t,e,n,r,a),this.cannonWorld.raycastClosest(r,a,this._getCannonRaycastOptions(i),p),this._copyCannonRaycastResultToGoo(p,s)};var g=new o;return a.prototype.raycastAll=function(t,o,e,n,i){"function"==typeof n&&(i=n,n={}),i=i||function(){};var s=c,r=l;this._getCannonStartEnd(t,o,e,s,r);var a=this,p=!1;return this.cannonWorld.raycastAll(s,r,this._getCannonRaycastOptions(n),function(t){var o=a._copyCannonRaycastResultToGoo(t,g);o&&(p=!0),i(g)===!1&&t.abort()}),p},a.prototype.pause=function(){this.passive=!0},a.prototype.play=function(){this.passive=!1,this.initialize()},a.prototype.stop=function(){this.pause(),this.destroy()},a.prototype.initialize=function(t){t=t||this._activeEntities;for(var o=t.length,e=0;e!==o;e++){var n=t[e],i=n.rigidBodyComponent;i.initialize()}for(var s=this._activeColliderEntities,e=0;e!==s.length;e++){var r=s[e];r.colliderComponent&&(r.colliderComponent.getBodyEntity()||r.colliderComponent.cannonBody||r.colliderComponent.initialize())}for(var e=0;e!==o;e++)for(var n=t[e],a=n.rigidBodyComponent.joints,c=0;c<a.length;c++){var l=a[c];n.rigidBodyComponent.initializeJoint(l,n,this)}this.initialized=!0},a.prototype.destroy=function(t){t=t||this._activeEntities;var o=t.length;this._shapeIdToColliderEntityMap.forEach(function(t){this._shapeIdToColliderEntityMap["delete"](t)}.bind(this)),this._lastContacts.forEach(function(t){this._lastContacts["delete"](t)}.bind(this)),this._currentContacts.forEach(function(t){this._currentContacts["delete"](t)}.bind(this));for(var e=0;e!==o;e++)for(var n=t[e],i=n.rigidBodyComponent.joints,s=0;s<i.length;s++){var r=i[s];n.rigidBodyComponent.destroyJoint(r,n,this)}for(var e=0;e!==this._activeColliderEntities.length;e++){var a=this._activeColliderEntities[e];a.colliderComponent&&a.colliderComponent.cannonBody&&a.colliderComponent.destroy()}for(var e=0;e!==o;e++){var n=t[e],c=n.rigidBodyComponent;c.destroy()}this.initialized=!1},a.prototype.process=function(t,o){this.initialized||this.initialize(),this.step(o),this.syncTransforms(t)},a.prototype.syncTransforms=function(t){for(var o=t.length,e=[],n=0;n!==o;n++){var i=t[n],s=i.rigidBodyComponent;s._updated=!1,i.transformComponent.parent?e.unshift(i):e.push(i)}for(;e.length;){var i=e.pop(),s=i.rigidBodyComponent,a=i.transformComponent,c=a.transform;if(!s._updated){s._updated=!0,s.getPosition(h),s.getQuaternion(d),c.translation.setVector(h),c.rotation.copyQuaternion(d),a.updateTransform(),a.updateWorldTransform();var l=a.parent;l&&(l.entity.transformComponent.worldTransform.invert(y),r.combine(y,c,y),c.rotation.copy(y.rotation),c.translation.copy(y.translation),a.updateTransform(),a.updateWorldTransform()),a.setUpdated()}}},a}(goo.AbstractPhysicsSystem,goo.RaycastResult,goo.RigidBodyComponent,goo.Vector3,goo.Quaternion,goo.EntityUtils,goo.Transform),goo.PhysicsRegister=function(t){"use strict";for(var o=["goo/scripts/Scripts","goo/addons/physicspack/colliders/BoxCollider","goo/addons/physicspack/colliders/Collider","goo/addons/physicspack/colliders/CylinderCollider","goo/addons/physicspack/colliders/MeshCollider","goo/addons/physicspack/colliders/PlaneCollider","goo/addons/physicspack/colliders/SphereCollider","goo/addons/physicspack/joints/BallJoint","goo/addons/physicspack/joints/HingeJoint","goo/addons/physicspack/joints/PhysicsJoint","goo/addons/physicspack/systems/AbstractPhysicsSystem","goo/addons/physicspack/systems/PhysicsDebugRenderSystem","goo/addons/physicspack/components/AbstractRigidBodyComponent","goo/addons/physicspack/components/ColliderComponent","goo/addons/physicspack/systems/ColliderSystem","goo/addons/physicspack/systems/PhysicsSystem","goo/addons/physicspack/RaycastResult","goo/addons/physicspack/PhysicsMaterial","goo/addons/physicspack/components/RigidBodyComponent","goo/addons/physicspack/shapes/PhysicsPlaneDebugShape"],e=1;e<o.length;e++){var n=o[e].slice(o[e].lastIndexOf("/")+1);t.addClass(n,arguments[e])}}(goo.Scripts,goo.BoxCollider,goo.Collider,goo.CylinderCollider,goo.MeshCollider,goo.PlaneCollider,goo.SphereCollider,goo.BallJoint,goo.HingeJoint,goo.PhysicsJoint,goo.AbstractPhysicsSystem,goo.PhysicsDebugRenderSystem,goo.AbstractRigidBodyComponent,goo.ColliderComponent,goo.ColliderSystem,goo.PhysicsSystem,goo.RaycastResult,goo.PhysicsMaterial,goo.RigidBodyComponent,goo.PhysicsPlaneDebugShape),goo.ColliderComponentHandler=function(t,o,e,n,i,s,r,a,c,l,p){"use strict";function d(){t.apply(this,arguments),this._type="ColliderComponent"}return d.prototype=Object.create(t.prototype),d.prototype.constructor=d,t._registerClass("collider",d),d.prototype._prepare=function(t){return s.defaults(t,{shape:"Box",shapeOptions:{halfExtents:[1,1,1],radius:.5,height:1},isTrigger:!1,friction:.3,restitution:0})},d.prototype._create=function(){return new o({material:new p})},d.prototype._remove=function(t){t.clearComponent("ColliderComponent")},d.prototype.update=function(o,e,n){return t.prototype.update.call(this,o,e,n).then(function(t){if(t){switch(e.shape){default:case"Box":t.collider=new a(e.shapeOptions),t.worldCollider=new a;break;case"Sphere":t.collider=new r(e.shapeOptions),t.worldCollider=new r;break;case"Plane":t.collider=new c,t.worldCollider=new c;break;case"Cylinder":t.collider=new l(e.shapeOptions),t.worldCollider=new l}return t.material.friction=e.friction,t.material.restitution=e.restitution,t.isTrigger=e.isTrigger,t}})},d}(goo.ComponentHandler,goo.ColliderComponent,goo.BoundingBox,goo.ShapeCreatorMemoized,goo.rsvp,goo.ObjectUtil,goo.SphereCollider,goo.BoxCollider,goo.PlaneCollider,goo.CylinderCollider,goo.PhysicsMaterial),goo.RigidBodyComponentHandler=function(t,o,e,n,i,s,r){"use strict";function a(){t.apply(this,arguments),this._type="RigidBodyComponent"}return a.prototype=Object.create(t.prototype),a.prototype.constructor=a,t._registerClass("rigidBody",a),a.prototype._prepare=function(t){return s.defaults(t,{mass:1,isKinematic:!1,velocity:[0,0,0],angularVelocity:[0,0,0],linearDrag:0,angularDrag:0})},a.prototype._create=function(){return new o},a.prototype._remove=function(t){t.clearComponent("RigidBodyComponent")},a.prototype.update=function(o,e,n){return t.prototype.update.call(this,o,e,n).then(function(t){return t?(t.mass=e.mass,t.isKinematic=e.isKinematic,t.setVelocity(new r(e.velocity)),t.setAngularVelocity(new r(e.angularVelocity)),t.linearDamping=e.linearDrag,t.angularDamping=e.angularDrag,t):void 0})},a}(goo.ComponentHandler,goo.RigidBodyComponent,goo.BoundingBox,goo.ShapeCreatorMemoized,goo.rsvp,goo.ObjectUtil,goo.Vector3),"function"==typeof require&&(define("goo/addons/physicspack/PhysicsMaterial",[],function(){return goo.PhysicsMaterial}),define("goo/addons/physicspack/colliders/Collider",[],function(){return goo.Collider}),define("goo/addons/physicspack/colliders/BoxCollider",[],function(){return goo.BoxCollider}),define("goo/addons/physicspack/colliders/CylinderCollider",[],function(){return goo.CylinderCollider}),define("goo/addons/physicspack/colliders/MeshCollider",[],function(){return goo.MeshCollider}),define("goo/addons/physicspack/colliders/PlaneCollider",[],function(){
return goo.PlaneCollider}),define("goo/addons/physicspack/colliders/SphereCollider",[],function(){return goo.SphereCollider}),define("goo/addons/physicspack/joints/PhysicsJoint",[],function(){return goo.PhysicsJoint}),define("goo/addons/physicspack/joints/BallJoint",[],function(){return goo.BallJoint}),define("goo/addons/physicspack/joints/HingeJoint",[],function(){return goo.HingeJoint}),define("goo/addons/physicspack/systems/AbstractPhysicsSystem",[],function(){return goo.AbstractPhysicsSystem}),define("goo/addons/physicspack/shapes/PhysicsPlaneDebugShape",[],function(){return goo.PhysicsPlaneDebugShape}),define("goo/addons/physicspack/util/Pool",[],function(){return goo.Pool}),define("goo/addons/physicspack/systems/PhysicsDebugRenderSystem",[],function(){return goo.PhysicsDebugRenderSystem}),define("goo/addons/physicspack/components/AbstractRigidBodyComponent",[],function(){return goo.AbstractRigidBodyComponent}),define("goo/addons/physicspack/components/AbstractColliderComponent",[],function(){return goo.AbstractColliderComponent}),define("goo/addons/physicspack/components/ColliderComponent",[],function(){return goo.ColliderComponent}),define("goo/addons/physicspack/systems/ColliderSystem",[],function(){return goo.ColliderSystem}),define("goo/addons/physicspack/RaycastResult",[],function(){return goo.RaycastResult}),define("goo/addons/physicspack/components/RigidBodyComponent",[],function(){return goo.RigidBodyComponent}),define("goo/addons/physicspack/systems/PhysicsSystem",[],function(){return goo.PhysicsSystem}),define("goo/addons/physicspack/PhysicsRegister",[],function(){return goo.PhysicsRegister}),define("goo/addons/physicspack/handlers/ColliderComponentHandler",[],function(){return goo.ColliderComponentHandler}),define("goo/addons/physicspack/handlers/RigidBodyComponentHandler",[],function(){return goo.RigidBodyComponentHandler}));