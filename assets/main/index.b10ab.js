window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AABB: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d10a7TQr7dCJKMc0f4ETMXZ", "AABB");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AABB = function() {
      function AABB() {
        this.type = cc.geomUtils.enums.SHAPE_AABB;
        this.center = new cc.Vec2();
        this.halfExtents = new cc.Vec2();
      }
      Object.defineProperty(AABB.prototype, "minX", {
        get: function() {
          return this.center.x - this.halfExtents.x;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AABB.prototype, "minY", {
        get: function() {
          return this.center.y - this.halfExtents.y;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AABB.prototype, "maxX", {
        get: function() {
          return this.center.x + this.halfExtents.x;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AABB.prototype, "maxY", {
        get: function() {
          return this.center.y + this.halfExtents.y;
        },
        enumerable: false,
        configurable: true
      });
      return AABB;
    }();
    exports.default = AABB;
    cc._RF.pop();
  }, {} ],
  AIBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da0beyKFrhECISegagfuajB", "AIBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AIBase = function(_super) {
      __extends(AIBase, _super);
      function AIBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.toNext = 0;
        _this.character = null;
        _this.attackRange = 100;
        _this.attackProb = 50;
        _this.attackInterval = 0;
        _this.direction = new cc.Vec2();
        _this.attackTimer = 0;
        return _this;
      }
      Object.defineProperty(AIBase.prototype, "mainCharacter", {
        get: function() {
          return GamaManager_1.default.inst.mainCharacter;
        },
        enumerable: false,
        configurable: true
      });
      AIBase.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
      };
      AIBase.prototype.start = function() {
        this.toNext = 1;
      };
      AIBase.prototype.checkCanAttack = function() {
        var distanceSqr = cc.Vec2.squaredDistance(this.node, this.mainCharacter.node);
        return this.attackTimer < 0 && distanceSqr <= this.attackRange * this.attackRange && 100 * Math.random() < this.attackProb;
      };
      AIBase.prototype.lookMainCharacter = function() {
        this.direction.set(cc.v2(this.mainCharacter.node.x - this.node.x, this.mainCharacter.node.y - this.node.y));
        this.direction.normalizeSelf();
        this.character.setDirection(Math.sign(this.direction.x));
      };
      AIBase.prototype.resetAttackTime = function() {
        this.attackTimer = this.attackInterval;
      };
      AIBase.prototype.tryCastSKill = function() {
        var attack = this.checkCanAttack();
        if (attack) {
          this.lookMainCharacter();
          this.character.doAction("Attack");
          this.resetAttackTime();
        }
        return attack;
      };
      AIBase.prototype.selfAction = function() {
        this.disguiseWander(cc.v2(this.mainCharacter.node, this.mainCharacter.node.y), 120, 300);
      };
      AIBase.prototype.disguiseWander = function(target, offsetX, offsetMax) {
        target.x += 2 * (Math.random() - .5) * offsetX;
        target.y += 2 * (Math.random() - .5) * offsetX;
        var dir = cc.v2(target.x - this.node.x, target.y - this.node.y);
        dir.normalizeSelf();
        dir.normalize(this.direction);
      };
      AIBase.prototype.fixUpdate = function() {
        var dt = FixManager_1.default.fixedDeltaTime;
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run || !this.character || true == this.character.isDead) return;
        if (null == this.mainCharacter || this.mainCharacter.isDead) return;
        this.toNext -= dt;
        this.attackTimer -= dt;
        if (this.toNext <= 0) {
          this.toNext = .2 + 1 * Math.random();
          this.tryCastSKill() || this.selfAction();
        }
        this.character.setDirection(Math.sign(this.direction.x));
        this.character.moveByDirection(this.direction);
      };
      __decorate([ property(cc.Float) ], AIBase.prototype, "attackRange", void 0);
      __decorate([ property({
        type: cc.Integer,
        min: 0,
        max: 100,
        slide: true
      }) ], AIBase.prototype, "attackProb", void 0);
      __decorate([ property(cc.Float) ], AIBase.prototype, "attackInterval", void 0);
      AIBase = __decorate([ ccclass ], AIBase);
      return AIBase;
    }(FixComponent_1.default);
    exports.default = AIBase;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../manager/GamaManager": "GamaManager",
    "../Character": "Character"
  } ],
  ActionEffectConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be0d2Fx05pCS5fLJseKwiVu", "ActionEffectConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ActionEffectConfig = function() {
      function ActionEffectConfig() {}
      return ActionEffectConfig;
    }();
    exports.default = ActionEffectConfig;
    cc._RF.pop();
  }, {} ],
  ActionInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61a11OF6pVLz6kO7G1cMRPz", "ActionInfo");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ActionInfo = function() {
      function ActionInfo(key, priority) {
        void 0 === priority && (priority = 0);
        this.priority = priority;
        this.key = key;
      }
      return ActionInfo;
    }();
    exports.default = ActionInfo;
    cc._RF.pop();
  }, {} ],
  ActionManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd12bTpxdhF/JUfz+o0eXaC", "ActionManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ConfigManager_1 = require("../../ConfigManager");
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ActionManager = function(_super) {
      __extends(ActionManager, _super);
      function ActionManager() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ActionManager_1 = ActionManager;
      Object.defineProperty(ActionManager, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      ActionManager.prototype.onLoad = function() {
        ActionManager_1._inst = this;
      };
      ActionManager.prototype.tryExecute = function(onwer, direction, key) {
        var config = ConfigManager_1.default.getActionEffectConfig(key);
        switch (config.actionType) {
         case "summon":
          return this.executeSummon(onwer, direction, config);
        }
        return false;
      };
      ActionManager.prototype.executeSummon = function(onwer, direction, config) {
        return true;
      };
      var ActionManager_1;
      ActionManager = ActionManager_1 = __decorate([ ccclass ], ActionManager);
      return ActionManager;
    }(FixComponent_1.default);
    exports.default = ActionManager;
    cc._RF.pop();
  }, {
    "../../ConfigManager": "ConfigManager",
    "../../common/fixcomponent/FixComponent": "FixComponent"
  } ],
  ActionTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79b7eUMjG5L3LGkgXVsW7TS", "ActionTable");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ActionTable = void 0;
    var ActionInfo_1 = require("../../unit/action/ActionInfo");
    exports.ActionTable = {
      hero: [ new ActionInfo_1.default("Idle", 0), new ActionInfo_1.default("Move", 1), new ActionInfo_1.default("Dead", 3) ],
      enemy_near: [ new ActionInfo_1.default("Idle", 0), new ActionInfo_1.default("Move", 1), new ActionInfo_1.default("Attack", 2), new ActionInfo_1.default("Enter", 3), new ActionInfo_1.default("Enter2", 3), new ActionInfo_1.default("Dead", 3) ],
      enemy_shooter: [ new ActionInfo_1.default("Idle", 0), new ActionInfo_1.default("Move", 1), new ActionInfo_1.default("Attack", 2), new ActionInfo_1.default("Enter", 3), new ActionInfo_1.default("Dead", 3) ],
      yingtao: [ new ActionInfo_1.default("Idle", 0), new ActionInfo_1.default("Move", 1), new ActionInfo_1.default("Enter", 3), new ActionInfo_1.default("Dead", 3) ],
      bossboluo: [ new ActionInfo_1.default("Idle", 0), new ActionInfo_1.default("Move", 1), new ActionInfo_1.default("Attack1", 2), new ActionInfo_1.default("Attack2", 2), new ActionInfo_1.default("Enter", 3), new ActionInfo_1.default("Dead", 3) ]
    };
    cc._RF.pop();
  }, {
    "../../unit/action/ActionInfo": "ActionInfo"
  } ],
  Adapt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61dfd/hfrJOuozCPQ4LTij9", "Adapt");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Adapt = function(_super) {
      __extends(Adapt, _super);
      function Adapt() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isByChange = true;
        return _this;
      }
      Adapt.prototype.onLoad = function() {
        var _this = this;
        this.isByChange && cc.view.setResizeCallback(function() {
          return _this.resize();
        });
        this.resize();
      };
      Adapt.prototype.resize = function() {
        var cvs = cc.find("Canvas").getComponent(cc.Canvas);
        this.curDR || (this.curDR = cvs.designResolution);
        var dr = this.curDR;
        var s = cc.view.getFrameSize();
        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;
        if (rw / rh > dr.width / dr.height) {
          finalH = dr.height;
          finalW = finalH * rw / rh;
        } else {
          finalW = dr.width;
          finalH = rh / rw * finalW;
        }
        cvs.designResolution = cc.size(finalW, finalH);
        cvs.node.width = finalW;
        cvs.node.height = finalH;
        cvs.node.emit("resize");
      };
      __decorate([ property() ], Adapt.prototype, "isByChange", void 0);
      Adapt = __decorate([ ccclass ], Adapt);
      return Adapt;
    }(cc.Component);
    exports.default = Adapt;
    cc._RF.pop();
  }, {} ],
  AesTools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c8c9VeXudGa6FEiTG/ZPQx", "AesTools");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CryptoJS = require("./aes.js");
    var AesTools = function() {
      function AesTools() {}
      AesTools.encrypt_csryw = function(str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY_csryw);
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV_csryw);
        var encrypted = CryptoJS.AES.encrypt(str, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
      };
      AesTools.decrypt_csryw = function(str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY_csryw);
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV_csryw);
        var decrypted = CryptoJS.AES.decrypt(str, key, {
          iv: iv,
          padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
      };
      AesTools.KEY_csryw = "b#63fFJ6AvkK3YT*";
      AesTools.IV_csryw = "J$f4DU%sNL73M&Go";
      return AesTools;
    }();
    exports.default = AesTools;
    cc._RF.pop();
  }, {
    "./aes.js": "aes"
  } ],
  AnimationAutoPlay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11ae6rMpEZH66E1rMtPqqpN", "AnimationAutoPlay");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
    var AnimationAutoPlay = function(_super) {
      __extends(AnimationAutoPlay, _super);
      function AnimationAutoPlay() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      AnimationAutoPlay.prototype.onLoad = function() {
        this._animation = this.getComponent(cc.Animation);
      };
      AnimationAutoPlay.prototype.onEnable = function() {
        if (this._animation) {
          var defClip = this._animation.defaultClip;
          defClip && this._animation.play(defClip.name, 0);
        }
      };
      AnimationAutoPlay = __decorate([ ccclass, requireComponent(cc.Animation) ], AnimationAutoPlay);
      return AnimationAutoPlay;
    }(cc.Component);
    exports.default = AnimationAutoPlay;
    cc._RF.pop();
  }, {} ],
  AppConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8f67bBoedOMYO872FafoSD", "AppConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppConfig = function() {
      function AppConfig() {}
      AppConfig.GameName_csryw = "\u5207\u4e2a\u5927\u83e0\u841d";
      AppConfig.closeUseRYSDK_csryw = false;
      AppConfig.isWX_TT_QQ_MiniGame_csryw = 0;
      AppConfig.TT_APP_ID_csryw = "tt1c326a8f830d1fcb02";
      AppConfig.WX_APP_ID_csryw = "";
      AppConfig.QQ_APP_ID_csryw = "";
      AppConfig.VIVO_APP_ID_csryw = "";
      AppConfig.OPPO_APP_ID_csryw = "";
      AppConfig.APK_APP_ID_csryw = "";
      AppConfig.TT_gameid_csryw = -1;
      AppConfig.WX_gameid_csryw = -1;
      AppConfig.QQ_gameid_csryw = -1;
      AppConfig.VIVO_gameid_csryw = -1;
      AppConfig.OPPO_gameid_csryw = -1;
      AppConfig.APK_gameid_csryw = -1;
      AppConfig.TT_ResServer_csryw = "";
      AppConfig.WX_ResServer_csryw = "https://oss.renyouwangluo.cn/dycsw_wx";
      AppConfig.QQ_ResServer_csryw = "";
      AppConfig.VIVO_ResServer_csryw = "";
      AppConfig.OPPO_ResServer_csryw = "";
      AppConfig.APK_ResServer_csryw = "";
      AppConfig.KS_ResServer_csryw = "https://oss.renyouwangluo.cn/srgzs_ks";
      AppConfig.TT_Versions_csryw = "0.0.0";
      AppConfig.WX_Versions_csryw = "1.0.0";
      AppConfig.QQ_Versions_csryw = "0.0.0";
      AppConfig.VIVO_Versions_csryw = "0.0.0";
      AppConfig.OPPO_Versions_csryw = "0.0.0";
      AppConfig.APK_Versions_csryw = "0.0.0";
      AppConfig.KS_Versions_csryw = "1.0.1";
      AppConfig.TT_LoopAdLocationID_csryw = -1;
      AppConfig.TT_BannerAdLocationID_csryw = -1;
      AppConfig.TT_InsertAdLocationID_csryw = -1;
      AppConfig.TT_AniAdLocationID_csryw = -1;
      AppConfig.TT_HistoryLocationID_csryw = -1;
      AppConfig.TT_MoreGameLocationID_csryw = -1;
      AppConfig.WX_LoopAdLocationID_csryw = "";
      AppConfig.WX_BannerAdLocationID_csryw = "";
      AppConfig.WX_InsertAdLocationID_csryw = -1;
      AppConfig.WX_AniAdLocationID_csryw = "";
      AppConfig.WX_HistoryLocationID_csryw = -1;
      AppConfig.WX_MoreGameLocationID_csryw = "";
      AppConfig.QQ_LoopAdLocationID_csryw = -1;
      AppConfig.QQ_BannerAdLocationID_csryw = -1;
      AppConfig.QQ_InsertAdLocationID_csryw = -1;
      AppConfig.QQ_AniAdLocationID_csryw = -1;
      AppConfig.QQ_HistoryLocationID_csryw = -1;
      AppConfig.QQ_MoreGameLocationID_csryw = -1;
      AppConfig.VIVO_LoopAdLocationID_csryw = -1;
      AppConfig.VIVO_BannerAdLocationID_csryw = -1;
      AppConfig.VIVO_InsertAdLocationID_csryw = -1;
      AppConfig.VIVO_AniAdLocationID_csryw = -1;
      AppConfig.VIVO_HistoryLocationID_csryw = -1;
      AppConfig.VIVO_MoreGameLocationID_csryw = -1;
      AppConfig.OPPO_LoopAdLocationID_csryw = -1;
      AppConfig.OPPO_BannerAdLocationID_csryw = -1;
      AppConfig.OPPO_InsertAdLocationID_csryw = -1;
      AppConfig.OPPO_AniAdLocationID_csryw = -1;
      AppConfig.OPPO_HistoryLocationID_csryw = -1;
      AppConfig.OPPO_MoreGameLocationID_csryw = -1;
      AppConfig.adUnitId_csryw = "";
      AppConfig.bannerAdUnitId_csryw = "";
      AppConfig.InsAdUnitId_csryw = "";
      AppConfig.tt_adUnitId_csryw = "";
      AppConfig.tt_bannerAdUnitId_csryw = "";
      AppConfig.tt_InsAdUnitId_csryw = "";
      AppConfig.tt_templateId_csryw = "";
      AppConfig.tt_adUnitIdArr_csryw = [ "3924djne3i76a9t987", "123c4cm20i5f6h7p7c", "1eb6hf1m2gg511e131" ];
      AppConfig.ks_InsAdUnitId_csryw = "";
      AppConfig.qq_adUnitId_csryw = "";
      AppConfig.qq_bannerAdUnitId_csryw = "";
      AppConfig.qq_InsAdUnitId_csryw = "";
      AppConfig.qq_AppBoxId_csryw = "";
      AppConfig.qq_blockAdArray_csryw = [];
      AppConfig.subResArray_csryw = [ "subResFrame", "subResGame" ];
      AppConfig.TT_state_csryw = 1;
      AppConfig.WX_state_csryw = 0;
      AppConfig.QQ_state_csryw = 4;
      AppConfig.VIVO_state_csryw = 7;
      AppConfig.OPPO_state_csryw = 5;
      AppConfig.BD_state_csryw = 3;
      AppConfig.APK_state_csryw = 6;
      AppConfig.AppID_csryw = "";
      AppConfig.state_csryw = 0;
      AppConfig.gameid_csryw = 0;
      AppConfig.ResServer_csryw = "";
      AppConfig.Versions_csryw = "0.0.0";
      AppConfig.LoopAdLocationID_csryw = -1;
      AppConfig.BannerAdLocationID_csryw = -1;
      AppConfig.InsertAdLocationID_csryw = -1;
      AppConfig.AniAdLocationID_csryw = -1;
      AppConfig.HistoryLocationID_csryw = -1;
      AppConfig.MoreGameLocationID_csryw = -1;
      AppConfig.UseRYSDK_csryw = true;
      return AppConfig;
    }();
    exports.default = AppConfig;
    cc._RF.pop();
  }, {} ],
  AppPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8b57dn8sFM+5vHjIk2kcjH", "AppPlatform");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LogUtils_1 = require("./LogUtils");
    var AppConfig_1 = require("../Config/AppConfig");
    var EventMgr_1 = require("../Event/EventMgr");
    var EventEnum_1 = require("../Event/EventEnum");
    var RYPlatformMgr_1 = require("../Mgr/RYPlatformMgr");
    var TTAPI_1 = require("../../Platform/tt/TTAPI");
    var OPPOAPI_1 = require("../../Platform/oppo/OPPOAPI");
    var VIVOAPI_1 = require("../../Platform/vivo/VIVOAPI");
    var QQMiniGameAPI_1 = require("../../Platform/qq/QQMiniGameAPI");
    var WXAPI_1 = require("../../Platform/weixin/WXAPI");
    var UmengMgr_1 = require("../Mgr/UmengMgr");
    var KSAPI_1 = require("../../Platform/ks/KSAPI");
    var AppPlatform = function() {
      function AppPlatform() {}
      AppPlatform.loginPlatform_csryw = function(successListener, failListener, pcListener) {
        if (AppPlatform.is_KS_csryw()) KSAPI_1.default.login_csryw(function(code) {
          successListener(code);
        }, function(fail) {
          failListener(fail);
        }); else if (AppPlatform.is_TT_GAME_csryw()) TTAPI_1.default.ttLogin_csryw(function(code) {
          successListener(code);
        }, function() {
          failListener();
        }); else if (AppPlatform.is_WECHAT_GAME_csryw()) WXAPI_1.default.wxLogin_csryw(function(code) {
          successListener(code);
        }, null); else if (AppPlatform.is_OPPO_GAME_csryw()) {
          OPPOAPI_1.default.initAdService_csryw(function() {}, function() {}, function() {});
          OPPOAPI_1.default.Login_csryw(function(code) {
            successListener(code);
          }, null);
        } else if (AppPlatform.is_QQ_PLAY_csryw()) QQMiniGameAPI_1.default.Login_csryw(function(code) {
          successListener(code);
        }, null); else if (AppPlatform.is_VIVO_GAME_csryw()) {
          var failCounter_1 = 0;
          var _successListener_1 = function(code) {
            successListener(code);
          };
          var fail_1 = function() {
            if (failCounter_1 >= 1) {
              console.log("vivo \u767b\u9646\u5931\u8d25\uff01\uff01\uff01\u91cd\u8bd5\u6b21\u6570\u5df2\u8fbe\u4e0a\u9650");
              failListener();
              return;
            }
            VIVOAPI_1.default.showDialog_csryw("\u63d0\u793a", "\u767b\u5f55\u5931\u8d25\uff0c\u70b9\u51fb\u786e\u5b9a\u6309\u94ae\u91cd\u8bd5", [ {
              text: "\u786e\u5b9a",
              color: "#33dd44"
            } ], function() {
              VIVOAPI_1.default.Login_csryw(function(token, type) {
                _successListener_1(token);
              }, function() {
                fail_1();
              });
              ++failCounter_1;
            }, function() {}, function() {});
          };
          VIVOAPI_1.default.Login_csryw(function(token, type) {
            _successListener_1(token);
          }, function() {
            fail_1();
          });
        } else AppPlatform.is_Android_csryw() || AppPlatform.is_Iphone_csryw() ? LogUtils_1.LogUtils.log_csryw("playVideo android ios \u672a\u5b9e\u73b0") : pcListener ? pcListener() : failListener();
      };
      AppPlatform.loadSubpackageFinish_csryw = function(subName) {};
      AppPlatform.playVideo_csryw = function(tab) {
        if (AppPlatform.is_KS_csryw()) KSAPI_1.default.showRewardedVideoAd_csryw(tab.onClose, tab.onFailed, tab.onClose); else if (AppPlatform.is_WECHAT_GAME_csryw()) WXAPI_1.default.showRewardedVideoAd_csryw(tab.onClose, tab.onFailed, tab.name); else if (AppPlatform.is_TT_GAME_csryw()) TTAPI_1.default.showRewardedVideoAd_csryw("\u672a\u77e5", tab.onClose, tab.onFailed); else if (AppPlatform.is_VIVO_GAME_csryw()) VIVOAPI_1.default.showRewardedVideoAd_csryw(tab.onClose, tab.onFailed); else if (AppPlatform.is_OPPO_GAME_csryw()) OPPOAPI_1.default.showRewardedVideoAd_csryw(tab.onClose, tab.onFailed); else if (AppPlatform.is_QQ_PLAY_csryw()) QQMiniGameAPI_1.default.showRewardedVideoAd_csryw(tab.onClose, tab.onFailed); else if (AppPlatform.is_Android_csryw() || AppPlatform.is_Iphone_csryw()) LogUtils_1.LogUtils.log_csryw("playVideo android ios \u672a\u5b9e\u73b0"); else {
          LogUtils_1.LogUtils.log_csryw("playVideo \u5176\u4ed6\u5e73\u53f0 \u672a\u5b9e\u73b0");
          tab.onClose && tab.onClose(true);
        }
      };
      AppPlatform.showToast_csryw = function(title) {
        AppPlatform.is_WECHAT_GAME_csryw() || (AppPlatform.is_TT_GAME_csryw() ? window["tt"].showToast({
          title: title,
          icon: "none"
        }) : AppPlatform.is_VIVO_GAME_csryw() ? window["qg"].showToast({
          message: title
        }) : AppPlatform.is_OPPO_GAME_csryw() ? window["qg"].showToast({
          title: title,
          icon: "none"
        }) : AppPlatform.is_QQ_PLAY_csryw() ? window["qq"].showToast({
          title: title,
          icon: "none"
        }) : AppPlatform.is_Android_csryw() || AppPlatform.is_Iphone_csryw() || LogUtils_1.LogUtils.log_csryw("showToast \u5176\u4ed6\u5e73\u53f0 \u672a\u5b9e\u73b0"));
      };
      AppPlatform.checkUpdate_csryw = function() {
        var platform = "";
        AppPlatform.is_WECHAT_GAME_csryw() ? platform = "wx" : AppPlatform.is_TT_GAME_csryw() && (platform = "tt");
        if ("" != platform) {
          console.log("\u542f\u52a8\u4e86\u7248\u672c\u66f4\u65b0\u673a\u5236\u3002\u3002\u3002\u3002");
          var updateManager_1 = window[platform].getUpdateManager();
          updateManager_1.onCheckForUpdate(function(res) {
            console.log("\u662f\u5426\u9700\u8981\u66f4\u65b0 : ", res.hasUpdate);
          });
          updateManager_1.onUpdateReady(function() {
            window[platform].showModal({
              title: "\u66f4\u65b0\u63d0\u793a",
              content: "\u65b0\u7248\u672c\u5df2\u7ecf\u51c6\u5907\u597d\uff0c\u662f\u5426\u91cd\u542f\u5c0f\u6e38\u620f\uff1f",
              success: function(res) {
                res.confirm && updateManager_1.applyUpdate();
              }
            });
          });
          updateManager_1.onUpdateFailed(function() {
            console.log("\u65b0\u7248\u672c\u4e0b\u8f7d\u5931\u8d25!!!");
          });
        }
      };
      AppPlatform.navigateToMiniProgram_csryw = function(data, ad_tag) {
        if (data) {
          LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6e38\u620f\uff1a " + data.title);
          if (AppPlatform.is_TT_GAME_csryw()) TTAPI_1.default.showMoreGamesModal_csryw(function() {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6210\u529f");
          }, function() {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5931\u8d25");
            EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw);
          }); else if (AppPlatform.is_WECHAT_GAME_csryw()) {
            RYPlatformMgr_1.default.sendClickAd_csryw(data.id);
            UmengMgr_1.UmengMgr.sendReportAdClickStart_csryw(data.title, data.appid);
            WXAPI_1.default.navigateToMiniProgram_csryw(data.appid, data.url, function(res) {
              LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6210\u529f");
              UmengMgr_1.UmengMgr.sendReportAdClickSuccess_csryw(data.title, data.appid);
              RYPlatformMgr_1.default.sendClickAdAllow_csryw(data.id);
            }, function(res) {
              LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5931\u8d25");
              EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw);
              if ("navigateToMiniProgram:fail cancel" == res.errMsg) {
                LogUtils_1.LogUtils.log_csryw("\u7528\u6237\u53d6\u6d88\u8df3\u8f6c");
                UmengMgr_1.UmengMgr.sendReportAdClickFail_csryw(data.title, data.appid);
                EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw, ad_tag);
              }
            }, function(res) {
              LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5b8c\u6210");
            });
          } else AppPlatform.is_OPPO_GAME_csryw() ? OPPOAPI_1.default.navigateToMiniProgram_csryw(data.appid, data.title, data.url, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6210\u529f");
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5931\u8d25");
            EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw);
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5b8c\u6210");
          }) : AppPlatform.is_QQ_PLAY_csryw() ? QQMiniGameAPI_1.default.navigateToMiniProgram_csryw(data.appid, data.url, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6210\u529f");
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5931\u8d25");
            EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw);
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5b8c\u6210");
          }) : AppPlatform.is_VIVO_GAME_csryw() && VIVOAPI_1.default.navigateToMiniProgram_csryw(data.appid, data.url, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u6210\u529f");
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5931\u8d25");
            EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_ADKRQ_ClickQuit_csryw);
          }, function(res) {
            LogUtils_1.LogUtils.log_csryw("\u8df3\u8f6c\u5b8c\u6210");
          });
        }
      };
      AppPlatform.initGame_csryw = function() {
        if (AppPlatform.is_WECHAT_GAME_csryw()) ; else if (AppPlatform.is_QQ_PLAY_csryw()) QQMiniGameAPI_1.default.LoadAppBoxAd_csryw(function() {}, function() {}); else if (AppPlatform.is_OPPO_GAME_csryw()) {
          null != window["qg"].reportMonitor && "function" == typeof window["qg"].reportMonitor && window["qg"].reportMonitor("game_scene", 0);
          OPPOAPI_1.default.LoadCahcedNativeAd_csryw();
        } else AppPlatform.is_VIVO_GAME_csryw() ? VIVOAPI_1.default.LoadCahcedNativeAd_csryw() : AppPlatform.is_TT_GAME_csryw();
      };
      AppPlatform.is_KS_csryw = function() {
        return null != window["kwaigame"];
      };
      AppPlatform.is_WECHAT_GAME_csryw = function() {
        if (0 == AppConfig_1.default.isWX_TT_QQ_MiniGame_csryw && cc.sys.platform == cc.sys.WECHAT_GAME) return true;
        return false;
      };
      AppPlatform.is_QQ_PLAY_csryw = function() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME && 2 == AppConfig_1.default.isWX_TT_QQ_MiniGame_csryw) return true;
        return false;
      };
      AppPlatform.is_OPPO_GAME_csryw = function() {
        if (cc.sys.platform == cc.sys.OPPO_GAME) return true;
        return false;
      };
      AppPlatform.is_VIVO_GAME_csryw = function() {
        if (cc.sys.platform == cc.sys.VIVO_GAME) return true;
        return false;
      };
      AppPlatform.is_TT_GAME_csryw = function() {
        if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) return true;
        return false;
      };
      AppPlatform.is_Xiaomi_GAME_csryw = function() {
        if (cc.sys.platform == cc.sys.XIAOMI_GAME) return true;
        return false;
      };
      AppPlatform.is_Android_csryw = function() {
        if (cc.sys.platform == cc.sys.ANDROID) return true;
        return false;
      };
      AppPlatform.isIphoneX_csryw = function() {
        if (this.is_Iphone_csryw()) {
          var size = cc.sys.windowPixelResolution;
          if (2436 == size.width && 1125 == size.height || 2436 == size.height && 1125 == size.width) return true;
          if (2688 == size.width && 1242 == size.height || 2688 == size.height && 1242 == size.width) return true;
          if (1792 == size.width && 828 == size.height || 1792 == size.height && 828 == size.width) return true;
        }
        return false;
      };
      AppPlatform.is_Iphone_csryw = function() {
        if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) return true;
        return false;
      };
      AppPlatform.getLaunchOptionsSync_csryw = function() {
        var obj = null;
        if (AppPlatform.is_TT_GAME_csryw()) {
          obj = window["tt"].getLaunchOptionsSync();
          var str = JSON.stringify(obj);
          LogUtils_1.LogUtils.log_csryw("\u573a\u666f\u503c: " + str);
          return obj;
        }
        if (AppPlatform.is_WECHAT_GAME_csryw()) {
          obj = window["wx"].getLaunchOptionsSync();
          var str = JSON.stringify(obj);
          LogUtils_1.LogUtils.log_csryw("\u573a\u666f\u503c: " + str);
          return obj;
        }
        if (AppPlatform.is_OPPO_GAME_csryw()) {
          var options = window["qg"].getLaunchOptionsSync();
          if (null != options && "" != options) obj = options; else {
            obj = {
              query: "",
              referrerInfo: {
                package: "",
                extraData: {
                  appid: ""
                }
              }
            };
            console.log("\u6ca1\u6709\u542f\u52a8\u8bbe\u7f6e\uff01\uff01\uff01");
          }
          var str = JSON.stringify(obj);
          LogUtils_1.LogUtils.log_csryw("\u573a\u666f\u503c: " + str);
          return obj;
        }
        if (AppPlatform.is_QQ_PLAY_csryw()) {
          obj = window["qq"].getLaunchOptionsSync();
          var str = JSON.stringify(obj);
          LogUtils_1.LogUtils.log_csryw("\u573a\u666f\u503c: " + str);
          return obj;
        }
        if (AppPlatform.is_VIVO_GAME_csryw()) {
          obj = {};
          return obj;
        }
        obj = {};
        return obj;
      };
      AppPlatform.startRecord_csryw = function() {
        AppPlatform.is_KS_csryw() ? KSAPI_1.default.startRecord_csryw() : AppPlatform.is_TT_GAME_csryw() ? TTAPI_1.default.startRecord_csryw() : LogUtils_1.LogUtils.log_csryw("startRecord \u5176\u4ed6\u5e73\u53f0 \u672a\u5b9e\u73b0");
      };
      AppPlatform.stopRecord_csryw = function() {
        AppPlatform.is_KS_csryw() ? KSAPI_1.default.stopRecord_csryw() : AppPlatform.is_TT_GAME_csryw() ? TTAPI_1.default.stopRecord_csryw() : LogUtils_1.LogUtils.log_csryw("stopRecord \u5176\u4ed6\u5e73\u53f0 \u672a\u5b9e\u73b0");
      };
      AppPlatform.shareRecord_csryw = function() {
        AppPlatform.is_KS_csryw() ? KSAPI_1.default.shareRecord_csryw() : AppPlatform.is_TT_GAME_csryw() ? TTAPI_1.default.shareRecord_csryw() : LogUtils_1.LogUtils.log_csryw("shareRecord \u5176\u4ed6\u5e73\u53f0 \u672a\u5b9e\u73b0");
      };
      AppPlatform.PlatformResSubName_csryw = "PlatformRes";
      AppPlatform.isBackGameWX = false;
      return AppPlatform;
    }();
    exports.default = AppPlatform;
    cc._RF.pop();
  }, {
    "../../Platform/ks/KSAPI": "KSAPI",
    "../../Platform/oppo/OPPOAPI": "OPPOAPI",
    "../../Platform/qq/QQMiniGameAPI": "QQMiniGameAPI",
    "../../Platform/tt/TTAPI": "TTAPI",
    "../../Platform/vivo/VIVOAPI": "VIVOAPI",
    "../../Platform/weixin/WXAPI": "WXAPI",
    "../Config/AppConfig": "AppConfig",
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "../Mgr/RYPlatformMgr": "RYPlatformMgr",
    "../Mgr/UmengMgr": "UmengMgr",
    "./LogUtils": "LogUtils"
  } ],
  AppSwitchConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "363a2/EfUxOjLZAJUzEw51c", "AppSwitchConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cocosWxcfg = exports.BDCfg = exports.VVcfg = exports.TT2Cfg = exports.TTCfg = exports.QQCfg = exports.OPPOCfg = exports.WXCfg = exports.Quickgamecfg = exports.AppSwitchData = void 0;
    var AppConfig_1 = require("./AppConfig");
    var LogUtils_1 = require("../Util/LogUtils");
    var FMInterface_1 = require("../Interface/FMInterface");
    var AppSwitchData = function() {
      function AppSwitchData() {
        this.version_csryw = "";
        this.banner_csryw = 0;
        this.wudian_csryw = 0;
        this.debuginfo_csryw = 0;
        this.isNetWorkGame_csryw = 1;
        this.wudianAvailableTime_csryw = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
          12: 0,
          13: 0,
          14: 0,
          15: 0,
          16: 0,
          17: 0,
          18: 0,
          19: 0,
          20: 0,
          21: 0,
          22: 0,
          23: 0
        };
        this.homePageExportTimeControl_csryw = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
          12: 0,
          13: 0,
          14: 0,
          15: 0,
          16: 0,
          17: 0,
          18: 0,
          19: 0,
          20: 0,
          21: 0,
          22: 0,
          23: 0
        };
        this.mailiang_csryw = 1;
        this.mailianglist_csryw = new Array();
        this.mailiangSceneList_csryw = new Array();
        this.wxWuDianBanners_csryw = new Array();
        this.recreateBannerIDList_csryw = new Array();
        this.bannerRecreateTime_csryw = 5;
        this.kuangdianjiange_csryw = 0;
        this.btnMoveTimer_csryw = 1;
        this.bannerMoveTimer_csryw = .5;
        this.bannerFreshTimer_csryw = 200;
        this.bannerCreateFailNum_csryw = 3;
        this.bannerTodayBannerMax_csryw = 10;
        this.adSwitch_csryw = 1;
        this.wudianSceneList_csryw = new Array();
        this.continueBtnDelayTime_csryw = 2;
        this.bannerShowTime_csryw = 30;
        this.fakeBtn_csryw = 0;
        this.popAd_csryw = 0;
        this.continueBanner_csryw = 0;
        this.continueBannerShowTime_csryw = 2;
        this.continueBannerHideTime_csryw = 2;
        this.oppocfg_csryw = new OPPOCfg();
        this.qqcfg_csryw = new QQCfg();
        this.ttcfg_csryw = new TTCfg();
        this.vivocfg_csryw = new VVcfg();
        this.wxcfg_csryw = new WXCfg();
        this.tt2cfg_csryw = new TT2Cfg();
        this.cocosWxcfg_csryw = new cocosWxcfg();
        this.bdcfg_csryw = new BDCfg();
        this.quickgamecfg_csryw = new Quickgamecfg();
      }
      Object.defineProperty(AppSwitchData.prototype, "wudianTimeAvaliable_csryw", {
        get: function() {
          return 1 == this.wudianAvailableTime_csryw[new Date().getHours()];
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(AppSwitchData.prototype, "homePageExportIsOpen_csryw", {
        get: function() {
          return 1 == Number(this.homePageExportTimeControl_csryw["" + new Date().getHours()]);
        },
        enumerable: false,
        configurable: true
      });
      return AppSwitchData;
    }();
    exports.AppSwitchData = AppSwitchData;
    var Quickgamecfg = function() {
      function Quickgamecfg() {
        this.autoExport = 0;
        this.bigExportColor = "416e8d";
        this.bigExportColor_g = "416e8d";
        this.bigExportBannerType = 100;
        this.bigExportShowBannerTime = 1;
        this.bigExportHideBannerTime = 2;
        this.hotplayBannerType = 100;
        this.hotplayShowBannerTime = 1;
        this.hotplayHideBannerTime = 2;
        this.recommendBannerType = 100;
        this.recommendShowBannerTime = 1;
        this.recommendButMoveTime = .2;
        this.endBannerType = 100;
        this.endShowBannerTime = 1;
        this.endButMoveTime = .2;
        this.crazyShowBanner = [ 3, 10 ];
        this.playButVideo = 0;
        this.crazyBannerHideTime = 0;
      }
      return Quickgamecfg;
    }();
    exports.Quickgamecfg = Quickgamecfg;
    var WXCfg = function() {
      function WXCfg() {
        this.kuangdian_csryw = 1;
        this.kuangdianBanner_csryw = 0;
        this.kuangdianLevelSpcacing_csryw = 0;
        this.ForceSkip_csryw = 0;
        this.SlideSkip_csryw = 0;
        this.tc_ForceSkip_csryw = 0;
        this.tc_SlideSkip_csryw = 0;
        this.phb_ForceSkip_csryw = 0;
        this.phb_SlideSkip_csryw = 0;
        this.tc_continueBanner_csryw = 0;
        this.MainPop_csryw = 0;
        this.hyrw_ForceSkip_csryw = 0;
        this.hyrw_SlideSkip_csryw = 0;
        this.hyrw_continueBanner_csryw = 0;
        this.handShow_csryw = 1;
        this.firstOpen_csryw = 0;
        this.startVideo_csryw = 0;
        this.mainBackBtn_csryw = 1;
        this.mainMoreBtn_csryw = 1;
        this.mainItemBtn_csryw = 1;
        this.mainExportShow_csryw = 0;
        this.isJumpHotPlay_csryw = 0;
        this.moreGameShowLevel_csryw = 0;
        this.setUserScan_csryw = 0;
      }
      return WXCfg;
    }();
    exports.WXCfg = WXCfg;
    var OPPOCfg = function() {
      function OPPOCfg() {
        this.yuansheng_csryw = 100;
        this.yuanshengSwitch_csryw = 1;
        this.addToDesktop_csryw = 0;
        this.oppoversions_csryw = "";
        this.btnShowTimer_csryw = 0;
        this.indexAdSwitch_csryw = 0;
        this.endAdSwitch_csryw = 0;
        this.yuansheng2_csryw = 100;
        this.yuanshengSwitch2_csryw = 1;
      }
      return OPPOCfg;
    }();
    exports.OPPOCfg = OPPOCfg;
    var QQCfg = function() {
      function QQCfg() {
        this.kuangdianBanner_csryw = 0;
        this.kuangdianBox_csryw = 0;
        this.box_csryw = 0;
        this.weiyi_csryw = 0;
        this.qqversions_csryw = "";
      }
      return QQCfg;
    }();
    exports.QQCfg = QQCfg;
    var TTCfg = function() {
      function TTCfg() {
        this.moreGameSwitch_csryw = 0;
        this.kuangdianBanner_csryw = 0;
        this.luping_csryw = 0;
        this.ttversions_csryw = "";
      }
      return TTCfg;
    }();
    exports.TTCfg = TTCfg;
    var TT2Cfg = function() {
      function TT2Cfg() {
        this.startSwitch_csryw = 0;
        this.signInSwitch_csryw = 0;
        this.getSwitch_csryw = 0;
        this.useSwitch_csryw = 0;
        this.reliveSwitch_csryw = 0;
        this.screenCapSwitch_csryw = 0;
        this.boxSwitch_csryw = 0;
      }
      return TT2Cfg;
    }();
    exports.TT2Cfg = TT2Cfg;
    var VVcfg = function() {
      function VVcfg() {
        this.yuanshengSwitch_csryw = 1;
        this.yuansheng_csryw = 100;
        this.yuanshengSwitch2_csryw = 1;
        this.yuansheng2_csryw = 100;
        this.chapingSwitch_csryw = 1;
        this.chaping_csryw = 100;
        this.addToDesktop_csryw = 1;
        this.vivoversions_csryw = "";
        this.btnShowTimer_csryw = 1;
      }
      return VVcfg;
    }();
    exports.VVcfg = VVcfg;
    var BDCfg = function() {
      function BDCfg() {
        this.version_csryw = "";
        this.signInSwitch_csryw = 0;
        this.taskVideo_csryw = 1;
        this.btnDelayTime_csryw = 0;
      }
      return BDCfg;
    }();
    exports.BDCfg = BDCfg;
    var cocosWxcfg = function() {
      function cocosWxcfg() {
        this.loopAd = {
          rollWayLeftUp_csryw: 0,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3,
          bgColor_csryw: "62d5ff"
        };
        this.skinTrial = {
          videoIcon_csryw: 0,
          wudian_csryw: 0,
          timeClick_csryw: 0,
          butMoveTime_csryw: 0,
          bannerShowTime_csryw: 0,
          bannerHideTime_csryw: 0,
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
        this.revival = {
          videoIcon_csryw: 0,
          wudian_csryw: 0,
          timeClick_csryw: 0,
          butMoveTime_csryw: 0,
          bannerShowTime_csryw: 0,
          bannerHideTime_csryw: 0,
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
        this.moreGoodGame = {
          bgColor_csryw: "3485fb",
          maskColor_csryw: "",
          mouseEventIsUp_csryw: 0,
          cancelIntercept_csryw: 1,
          wudian_csryw: 0,
          timeClick_csryw: 0,
          butMoveTime_csryw: 0,
          bannerShowTime_csryw: 0,
          bannerHideTime_csryw: 0,
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
        this.bigLoopAd = {
          bgColor_csryw: "3485fb",
          maskColor_csryw: "",
          wudian_csryw: 0,
          timeClick_csryw: 0,
          butMoveTime_csryw: 0,
          bannerShowTime_csryw: 0,
          bannerHideTime_csryw: 0,
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
        this.settlePage = {
          bgColor_csryw: "3485fb",
          maskColor_csryw: "",
          wudian_csryw: 0,
          timeClick_csryw: 0,
          butMoveTime_csryw: 0,
          bannerShowTime_csryw: 0,
          bannerHideTime_csryw: 0,
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
        this.moreGoodGame2 = {
          bgColor_csryw: "3485fb",
          maskColor_csryw: "",
          butDelayShowTime_csryw: 0,
          rollWayLeftUp_csryw: 1,
          rollWaitNum_csryw: 1,
          rollWaitTime_csryw: 1,
          roolSpeed_csryw: 3
        };
      }
      return cocosWxcfg;
    }();
    exports.cocosWxcfg = cocosWxcfg;
    var AppSwitchConfig = function() {
      function AppSwitchConfig() {
        this._data_csryw = new Array();
      }
      AppSwitchConfig.getInstance_csryw = function() {
        return AppSwitchConfig._instance_csryw;
      };
      AppSwitchConfig.prototype.loadUrlConfig_csryw = function(finish, errorListener) {
        var _this = this;
        if ("" == AppConfig_1.default.ResServer_csryw) {
          LogUtils_1.LogUtils.warn_csryw("\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684AppswitchConfig \u8def\u5f84");
          this._data_csryw.push(new AppSwitchData());
          finish && FMInterface_1.callFM_csryw(finish);
          return;
        }
        var url = AppConfig_1.default.ResServer_csryw + "/json/appswitch.json?" + new Date().getTime();
        cc.assetManager.loadRemote(url, function(err, textAsset) {
          cc.assetManager.cacheManager && cc.assetManager.cacheManager.removeCache(url);
          if (err) {
            LogUtils_1.LogUtils.error_csryw(err);
            _this._data_csryw.push(new AppSwitchData());
            errorListener && FMInterface_1.callFM_csryw(errorListener);
            return;
          }
          _this._data_csryw.length = 0;
          var json = textAsset.json;
          LogUtils_1.LogUtils.log_csryw("\u4e0b\u8f7d appswitch.json>>>");
          LogUtils_1.LogUtils.log_csryw(textAsset);
          if (json) for (var i = 0; i < json.length; ++i) {
            var row = json[i];
            var rowData = new AppSwitchData();
            rowData.version_csryw = String(row["version"]);
            rowData.banner_csryw = Number(row["banner"]);
            rowData.wudian_csryw = Number(row["wudian"]);
            rowData.debuginfo_csryw = Number(row["debuginfo"]);
            rowData.isNetWorkGame_csryw = Number(row["netWorkgame"]);
            rowData.wudianAvailableTime_csryw = Object(row["wudianTime"]);
            rowData.homePageExportTimeControl_csryw = Object(row["homePageExportTimeControl"]);
            var wxwudianbanners = row["wxwudianbanners"];
            if (null != wxwudianbanners) for (var j = 0; j < wxwudianbanners.length; ++j) {
              var bannerid = String(wxwudianbanners[j]);
              rowData.wxWuDianBanners_csryw.push(bannerid);
            }
            var recreateBannerIDList = row["recreateBannerIDList"];
            if (null != recreateBannerIDList) for (var j = 0; j < recreateBannerIDList.length; ++j) {
              var bannerid = String(recreateBannerIDList[j]);
              rowData.recreateBannerIDList_csryw.push(bannerid);
            }
            rowData.bannerRecreateTime_csryw = null != row["bannerRecreateTime"] ? Number(row["bannerRecreateTime"]) : rowData.bannerRecreateTime_csryw;
            rowData.kuangdianjiange_csryw = null != row["kuangdianjiange"] ? Number(row["kuangdianjiange"]) : rowData.kuangdianjiange_csryw;
            rowData.btnMoveTimer_csryw = Number(row["btnMoveTimer"]);
            rowData.bannerMoveTimer_csryw = Number(row["bannerMoveTimer"]);
            rowData.bannerCreateFailNum_csryw = Number(row["createFailNum"]);
            rowData.bannerFreshTimer_csryw = Number(row["bannerFreshTimer"]);
            rowData.bannerTodayBannerMax_csryw = Number(row["todayBannerMax"]);
            rowData.adSwitch_csryw = Number(row["adSwitch"]);
            var wudianSceneList = row["wudianSceneList"];
            if (null != wudianSceneList) for (var j = 0; j < wudianSceneList.length; ++j) {
              var wudianSceneValue = Number(wudianSceneList[j]);
              rowData.wudianSceneList_csryw.push(wudianSceneValue);
            }
            rowData.continueBtnDelayTime_csryw = Number(row["continueBtnDelayTime"]);
            rowData.bannerShowTime_csryw = Number(row["bannerShowTime"]);
            rowData.fakeBtn_csryw = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn_csryw;
            rowData.popAd_csryw = null != row["popAd"] ? Number(row["popAd"]) : rowData.popAd_csryw;
            rowData.continueBanner_csryw = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continueBanner_csryw;
            rowData.continueBannerShowTime_csryw = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continueBannerShowTime_csryw;
            rowData.continueBannerHideTime_csryw = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continueBannerHideTime_csryw;
            if (null != row["oppocfg"]) {
              var cfg = row["oppocfg"];
              rowData.oppocfg_csryw.yuansheng_csryw = Number(cfg["yuansheng"]);
              rowData.oppocfg_csryw.yuanshengSwitch_csryw = Number(cfg["yuanshengSwitch"]);
              rowData.oppocfg_csryw.addToDesktop_csryw = Number(cfg["addToDesktop"]);
              rowData.oppocfg_csryw.oppoversions_csryw = String(cfg["oppoversions"]);
              rowData.oppocfg_csryw.btnShowTimer_csryw = Number(cfg["btnShowTimer"]);
              rowData.oppocfg_csryw.indexAdSwitch_csryw = Number(cfg["indexAdSwitch"]);
              rowData.oppocfg_csryw.endAdSwitch_csryw = Number(cfg["endAdSwitch"]);
              rowData.oppocfg_csryw.yuansheng2_csryw = null != cfg["yuansheng2"] ? Number(cfg["yuansheng2"]) : rowData.oppocfg_csryw.yuansheng2_csryw;
              rowData.oppocfg_csryw.yuanshengSwitch2_csryw = null != cfg["yuanshengSwitch2"] ? Number(cfg["yuanshengSwitch2"]) : rowData.oppocfg_csryw.yuanshengSwitch2_csryw;
            }
            if (null != row["qqcfg"]) {
              var cfg = row["qqcfg"];
              rowData.qqcfg_csryw.kuangdianBanner_csryw = Number(cfg["kuangdianBanner"]);
              rowData.qqcfg_csryw.kuangdianBox_csryw = Number(cfg["kuangdianBox"]);
              rowData.qqcfg_csryw.box_csryw = Number(cfg["box"]);
              rowData.qqcfg_csryw.weiyi_csryw = Number(cfg["weiyi"]);
              rowData.qqcfg_csryw.qqversions_csryw = String(cfg["qqversions"]);
            }
            if (null != row["ttcfg"]) {
              var cfg = row["ttcfg"];
              rowData.ttcfg_csryw.moreGameSwitch_csryw = Number(cfg["moreGameSwitch"]);
              rowData.ttcfg_csryw.kuangdianBanner_csryw = Number(cfg["kuangdianBanner"]);
              rowData.ttcfg_csryw.luping_csryw = Number(cfg["luping"]);
              rowData.ttcfg_csryw.ttversions_csryw = String(cfg["ttversions"]);
            }
            if (null != row["tt2cfg"]) {
              var cfg = row["tt2cfg"];
              rowData.tt2cfg_csryw.startSwitch_csryw = Number(cfg["startSwitch"]);
              rowData.tt2cfg_csryw.signInSwitch_csryw = Number(cfg["signInSwitch"]);
              rowData.tt2cfg_csryw.getSwitch_csryw = Number(cfg["getSwitch"]);
              rowData.tt2cfg_csryw.useSwitch_csryw = Number(cfg["useSwitch"]);
              rowData.tt2cfg_csryw.reliveSwitch_csryw = Number(cfg["reliveSwitch"]);
              rowData.tt2cfg_csryw.screenCapSwitch_csryw = Number(cfg["screenCapSwitch"]);
              rowData.tt2cfg_csryw.boxSwitch_csryw = Number(cfg["boxSwitch"]);
            }
            if (null != row["vivocfg"]) {
              var cfg = row["vivocfg"];
              rowData.vivocfg_csryw.yuanshengSwitch_csryw = Number(cfg["yuanshengSwitch"]);
              rowData.vivocfg_csryw.yuansheng_csryw = Number(cfg["yuansheng"]);
              rowData.vivocfg_csryw.yuanshengSwitch2_csryw = Number(cfg["yuanshengSwitch2"]);
              rowData.vivocfg_csryw.yuansheng2_csryw = Number(cfg["yuansheng2"]);
              rowData.vivocfg_csryw.chapingSwitch_csryw = Number(cfg["chapingSwitch"]);
              rowData.vivocfg_csryw.chaping_csryw = Number(cfg["chaping"]);
              rowData.vivocfg_csryw.addToDesktop_csryw = Number(cfg["addToDesktop"]);
              rowData.vivocfg_csryw.vivoversions_csryw = String(cfg["vivoversions"]);
              rowData.vivocfg_csryw.btnShowTimer_csryw = Number(cfg["btnShowTimer"]);
            }
            if (null != row["wxcfg"]) {
              var cfg = row["wxcfg"];
              rowData.wxcfg_csryw.kuangdian_csryw = Number(cfg["kuangdian"]);
              rowData.wxcfg_csryw.kuangdianBanner_csryw = Number(cfg["kuangdianBanner"]);
              rowData.wxcfg_csryw.kuangdianLevelSpcacing_csryw = Number(cfg["kuangdianLevelSpcacing"]);
              rowData.wxcfg_csryw.ForceSkip_csryw = Number(cfg["ForceSkip"]);
              rowData.wxcfg_csryw.SlideSkip_csryw = Number(cfg["SlideSkip"]);
              rowData.wxcfg_csryw.tc_ForceSkip_csryw = Number(cfg["tc_ForceSkip"]);
              rowData.wxcfg_csryw.tc_SlideSkip_csryw = Number(cfg["tc_SlideSkip"]);
              rowData.wxcfg_csryw.phb_ForceSkip_csryw = Number(cfg["phb_ForceSkip"]);
              rowData.wxcfg_csryw.phb_SlideSkip_csryw = Number(cfg["phb_SlideSkip"]);
              rowData.wxcfg_csryw.tc_continueBanner_csryw = Number(cfg["tc_continueBanner"]);
              rowData.wxcfg_csryw.MainPop_csryw = Number(cfg["MainPop"]);
              rowData.wxcfg_csryw.hyrw_ForceSkip_csryw = Number(cfg["hyrw_ForceSkip"]);
              rowData.wxcfg_csryw.hyrw_SlideSkip_csryw = Number(cfg["hyrw_SlideSkip"]);
              rowData.wxcfg_csryw.hyrw_continueBanner_csryw = Number(cfg["hyrw_continueBanner"]);
              rowData.wxcfg_csryw.handShow_csryw = Number(cfg["handShow"]);
              rowData.wxcfg_csryw.firstOpen_csryw = Number(cfg["firstOpen"]);
              rowData.wxcfg_csryw.startVideo_csryw = Number(cfg["startVideo"]);
              rowData.wxcfg_csryw.mainBackBtn_csryw = Number(cfg["mainBackBtn"]);
              rowData.wxcfg_csryw.mainMoreBtn_csryw = Number(cfg["mainMoreBtn"]);
              rowData.wxcfg_csryw.mainItemBtn_csryw = Number(cfg["mainItemBtn"]);
              rowData.wxcfg_csryw.mainExportShow_csryw = Number(cfg["mainExportShow"]);
              rowData.wxcfg_csryw.isJumpHotPlay_csryw = Number(cfg["isJumpHotPlay"]);
              rowData.wxcfg_csryw.moreGameShowLevel_csryw = Number(cfg["moreGameShowLevel"]);
              rowData.wxcfg_csryw.setUserScan_csryw = Number(cfg["setUserScan"]);
            }
            if (null != row["bdcfg"]) {
              var cfg = row["bdcfg"];
              rowData.bdcfg_csryw.btnDelayTime_csryw = Number(cfg["btnDelayTime"]);
              rowData.bdcfg_csryw.signInSwitch_csryw = Number(cfg["signInSwitch"]);
              rowData.bdcfg_csryw.taskVideo_csryw = Number(cfg["taskVideo"]);
              rowData.bdcfg_csryw.version_csryw = String(cfg["version"]);
            }
            if (null != row["cocosWxConfig"]) {
              var cfg = row["cocosWxConfig"];
              var loopAd = cfg["loopAd"];
              var skinTrial = cfg["skinTrial"];
              var revival = cfg["revival"];
              var moreGoodGame = cfg["moreGoodGame"];
              var bigLoopAd = cfg["bigLoopAd"];
              var settlePage = cfg["settlePage"];
              var moreGoodGame2 = cfg["moreGoodGame2"];
              for (var key in rowData.cocosWxcfg_csryw.loopAd) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.loopAd, key) && (rowData.cocosWxcfg_csryw.loopAd[key] = "bgColor" == key ? null != loopAd[key] ? String(loopAd[key]) : rowData.cocosWxcfg_csryw.loopAd[key] : null != loopAd[key] ? Number(loopAd[key]) : rowData.cocosWxcfg_csryw.loopAd[key]);
              for (var key in rowData.cocosWxcfg_csryw.skinTrial) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.skinTrial, key) && (rowData.cocosWxcfg_csryw.skinTrial[key] = null != skinTrial[key] ? Number(skinTrial[key]) : rowData.cocosWxcfg_csryw.skinTrial[key]);
              for (var key in rowData.cocosWxcfg_csryw.revival) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.revival, key) && (rowData.cocosWxcfg_csryw.revival[key] = null != revival[key] ? Number(revival[key]) : rowData.cocosWxcfg_csryw.revival[key]);
              for (var key in rowData.cocosWxcfg_csryw.moreGoodGame) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.moreGoodGame, key) && (rowData.cocosWxcfg_csryw.moreGoodGame[key] = "bgColor" == key || "maskColor" == key ? null != moreGoodGame[key] ? String(moreGoodGame[key]) : rowData.cocosWxcfg_csryw.moreGoodGame[key] : null != moreGoodGame[key] ? Number(moreGoodGame[key]) : rowData.cocosWxcfg_csryw.moreGoodGame[key]);
              for (var key in rowData.cocosWxcfg_csryw.bigLoopAd) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.bigLoopAd, key) && (rowData.cocosWxcfg_csryw.bigLoopAd[key] = "bgColor" == key || "maskColor" == key ? null != bigLoopAd[key] ? String(bigLoopAd[key]) : rowData.cocosWxcfg_csryw.bigLoopAd[key] : null != bigLoopAd[key] ? Number(bigLoopAd[key]) : rowData.cocosWxcfg_csryw.bigLoopAd[key]);
              for (var key in rowData.cocosWxcfg_csryw.settlePage) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.settlePage, key) && (rowData.cocosWxcfg_csryw.settlePage[key] = "bgColor" == key || "maskColor" == key ? null != settlePage[key] ? String(settlePage[key]) : rowData.cocosWxcfg_csryw.settlePage[key] : null != settlePage[key] ? Number(settlePage[key]) : rowData.cocosWxcfg_csryw.settlePage[key]);
              for (var key in rowData.cocosWxcfg_csryw.moreGoodGame2) Object.prototype.hasOwnProperty.call(rowData.cocosWxcfg_csryw.moreGoodGame2, key) && (rowData.cocosWxcfg_csryw.moreGoodGame2[key] = "bgColor" == key || "maskColor" == key ? null != moreGoodGame2[key] ? String(moreGoodGame2[key]) : rowData.cocosWxcfg_csryw.moreGoodGame2[key] : null != moreGoodGame2[key] ? Number(moreGoodGame2[key]) : rowData.cocosWxcfg_csryw.moreGoodGame2[key]);
            }
            if (null != row["quickgamecfg"]) {
              var cfg = row["quickgamecfg"];
              rowData.quickgamecfg_csryw.autoExport = Number(cfg["autoExport"]);
              rowData.quickgamecfg_csryw.bigExportColor = cfg["bigExportColor"];
              rowData.quickgamecfg_csryw.bigExportColor_g = cfg["bigExportColor_g"];
              rowData.quickgamecfg_csryw.bigExportBannerType = Number(cfg["bigExportBannerType"]);
              rowData.quickgamecfg_csryw.bigExportShowBannerTime = Number(cfg["bigExportShowBannerTime"]);
              rowData.quickgamecfg_csryw.bigExportHideBannerTime = Number(cfg["bigExportHideBannerTime"]);
              rowData.quickgamecfg_csryw.hotplayBannerType = Number(cfg["hotplayBannerType"]);
              rowData.quickgamecfg_csryw.hotplayShowBannerTime = Number(cfg["hotplayShowBannerTime"]);
              rowData.quickgamecfg_csryw.hotplayHideBannerTime = Number(cfg["hotplayHideBannerTime"]);
              rowData.quickgamecfg_csryw.recommendBannerType = Number(cfg["recommendBannerType"]);
              rowData.quickgamecfg_csryw.recommendShowBannerTime = Number(cfg["recommendShowBannerTime"]);
              rowData.quickgamecfg_csryw.recommendButMoveTime = Number(cfg["recommendButMoveTime"]);
              rowData.quickgamecfg_csryw.endBannerType = Number(cfg["endBannerType"]);
              rowData.quickgamecfg_csryw.endShowBannerTime = Number(cfg["endShowBannerTime"]);
              rowData.quickgamecfg_csryw.endButMoveTime = Number(cfg["endButMoveTime"]);
              rowData.quickgamecfg_csryw.playButVideo = null == cfg["playButVideo"] ? 0 : Number(cfg["playButVideo"]);
              rowData.quickgamecfg_csryw.crazyBannerHideTime = null == cfg["crazyBannerHideTime"] ? 0 : Number(cfg["crazyBannerHideTime"]);
              var crazyShowString = cfg["crazyShowBanner"];
              if (crazyShowString) {
                var tmp = crazyShowString.split(",");
                rowData.quickgamecfg_csryw.crazyShowBanner[0] = Number(tmp[0]);
                rowData.quickgamecfg_csryw.crazyShowBanner[1] = Number(tmp[1]);
              }
            }
            _this._data_csryw.push(rowData);
          } else _this._data_csryw.push(new AppSwitchData());
          finish && FMInterface_1.callFM_csryw(finish);
        });
      };
      AppSwitchConfig.prototype.getAppSwitchData_csryw = function() {
        return this._data_csryw[0];
      };
      AppSwitchConfig._instance_csryw = new AppSwitchConfig();
      return AppSwitchConfig;
    }();
    exports.default = AppSwitchConfig;
    cc._RF.pop();
  }, {
    "../Interface/FMInterface": "FMInterface",
    "../Util/LogUtils": "LogUtils",
    "./AppConfig": "AppConfig"
  } ],
  AssetManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d0728kuDlH6boCZ7EH6xWj", "AssetManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResSubMgr_1 = require("../../FrameWork/Mgr/ResSubMgr");
    var AssetManager = function() {
      function AssetManager() {}
      AssetManager.getPrefab = function(name) {
        return ResSubMgr_1.ResSubMgr.getPrefab(this.bundleName, name);
      };
      AssetManager.loadRes = function(path, type, callback) {
        var _this = this;
        void 0 === callback && (callback = null);
        return new Promise(function(resolve, reject) {
          var bundle = cc.assetManager.getBundle(_this.bundleName);
          bundle.load(path, cc.AudioClip, function(err, ret) {
            if (err) {
              cc.error(path, err);
              callback(err, null);
              reject(null);
            } else {
              callback && callback(null, ret);
              resolve(ret);
            }
          });
        });
      };
      AssetManager.bundleName = "subResGame";
      return AssetManager;
    }();
    exports.default = AssetManager;
    cc._RF.pop();
  }, {
    "../../FrameWork/Mgr/ResSubMgr": "ResSubMgr"
  } ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0c5cCl/U5Ndpw2O7z5HpqB", "AudioManager");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetManager_1 = require("../../common/AssetManager");
    var AudioManager = function() {
      function AudioManager() {
        this.bgmEnable = true;
        this.sfxEnable = true;
        this.bgmVolume = 1;
        this.sfxVolume = 1;
        this.bgmAudioID = -1;
        this.audioId = -1;
        this.bgm_url = "music1";
        this.lastplaysfxtime = {};
      }
      Object.defineProperty(AudioManager, "inst", {
        get: function() {
          null == this._inst && (this._inst = new AudioManager());
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      AudioManager.prototype.playBGM = function(url) {
        return __awaiter(this, void 0, void 0, function() {
          var audioUrl;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this.bgmEnable) return [ 2 ];
              this.bgm_url = url;
              return [ 4, AssetManager_1.default.loadRes("" + url, cc.AudioClip) ];

             case 1:
              audioUrl = _a.sent();
              this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
              this.bgmVolume > 0 && (this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume));
              return [ 2 ];
            }
          });
        });
      };
      AudioManager.prototype.stopSFX = function(audioId) {
        var ok = cc.audioEngine.stop(audioId);
        return ok;
      };
      AudioManager.prototype.playSFX = function(url) {
        return __awaiter(this, void 0, void 0, function() {
          var audioUrl;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this.sfxEnable) return [ 2 ];
              if (this.lastplaysfxtime[url] && Date.now() - this.lastplaysfxtime[url] < 100) return [ 2 ];
              this.lastplaysfxtime[url] = Date.now();
              return [ 4, AssetManager_1.default.loadRes(url, cc.AudioClip) ];

             case 1:
              audioUrl = _a.sent();
              if (this.sfxVolume > 0) {
                this.audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
                return [ 2, this.audioId ];
              }
              return [ 2 ];
            }
          });
        });
      };
      AudioManager.prototype.pauseBGM = function() {
        this.bgmAudioID >= 0 && cc.audioEngine.pause(this.bgmAudioID);
      };
      AudioManager.prototype.resumBGM = function() {
        if (!this.bgmEnable) return;
        this.bgmAudioID >= 0 && cc.audioEngine.resume(this.bgmAudioID);
      };
      AudioManager.prototype.setBGMVolume = function(v, force) {
        void 0 === force && (force = false);
        if (this.bgmVolume != v || force) {
          cc.sys.localStorage.setItem("bgmVolume", v);
          this.bgmVolume = v;
          cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
        this.bgmAudioID >= 0 ? v > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID) : this.playBGM(this.bgm_url);
      };
      AudioManager.prototype.setSFXVolume = function(v, force) {
        void 0 === force && (force = false);
        if (this.sfxVolume != v || force) {
          cc.sys.localStorage.setItem("sfxVolume", v);
          this.sfxVolume = v;
        }
      };
      AudioManager.DEFAULT_VOLUME = .3;
      return AudioManager;
    }();
    exports.default = AudioManager;
    cc._RF.pop();
  }, {
    "../../common/AssetManager": "AssetManager"
  } ],
  BallMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a15765V4xFgYBrC73GAIcV", "BallMove");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_1 = require("../../manager/AudioManager");
    var EffectManager_1 = require("../../manager/EffectManager");
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var BallMove = function(_super) {
      __extends(BallMove, _super);
      function BallMove() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.character = null;
        _this.velocity = new cc.Vec2();
        _this.totalTime = 0;
        _this.duration = 0;
        return _this;
      }
      BallMove.prototype.onLoad = function() {
        this.character = this.getComponent(Character_1.default);
        this.character.addMoveProiver(this);
      };
      Object.defineProperty(BallMove.prototype, "finished", {
        get: function() {
          return false;
        },
        enumerable: false,
        configurable: true
      });
      BallMove.prototype.catapult = function(velocity, duration) {
        this.velocity.set(velocity);
        this.duration = duration;
        this.totalTime = duration;
      };
      BallMove.prototype.updateMovement = function(time) {
        if (this.duration <= 0) return cc.Vec2.ZERO;
        time >= this.duration ? this.duration = 0 : this.duration -= time;
        var movement = this.character.movement;
        if (movement.hit) {
          movement.hitX && (this.velocity.x *= -1);
          movement.hitY && (this.velocity.y *= -1);
          AudioManager_1.default.inst.playSFX("Sound/hitWall");
          EffectManager_1.default.inst.addEffect("Effect_HitWall", this.node, cc.v2(1.1 * movement.hitPoint.x, movement.hitPoint.y));
        }
        if (this.totalTime <= 0) return this.velocity;
        var value = this.duration / this.totalTime;
        value = Math.max(0, 1 - value);
        return this.velocity.div(this.totalTime);
      };
      BallMove = __decorate([ ccclass ], BallMove);
      return BallMove;
    }(cc.Component);
    exports.default = BallMove;
    cc._RF.pop();
  }, {
    "../../manager/AudioManager": "AudioManager",
    "../../manager/EffectManager": "EffectManager",
    "../Character": "Character"
  } ],
  BattleEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "119a2DzWcZE5YyGzKGirLSF", "BattleEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EffectManager_1 = require("../manager/EffectManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BattleEffect = function(_super) {
      __extends(BattleEffect, _super);
      function BattleEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.autoRemove = true;
        _this.removeDelay = 2;
        return _this;
      }
      BattleEffect.prototype.start = function() {
        this.autoRemove && this.scheduleOnce(this.removeSelf, this.removeDelay);
      };
      BattleEffect.prototype.removeSelf = function() {
        EffectManager_1.default.inst.removeObj(this.prefab, this.node);
      };
      BattleEffect.prototype.init = function(data) {};
      __decorate([ property(cc.Boolean) ], BattleEffect.prototype, "autoRemove", void 0);
      __decorate([ property(cc.Float) ], BattleEffect.prototype, "removeDelay", void 0);
      BattleEffect = __decorate([ ccclass ], BattleEffect);
      return BattleEffect;
    }(cc.Component);
    exports.default = BattleEffect;
    cc._RF.pop();
  }, {
    "../manager/EffectManager": "EffectManager"
  } ],
  Behavior: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fdadbWXaiRCKYzVMgiYUXH7", "Behavior");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BehaviorFlag = void 0;
    var BehaviorFlag;
    (function(BehaviorFlag) {
      BehaviorFlag[BehaviorFlag["move"] = 1] = "move";
      BehaviorFlag[BehaviorFlag["rotate"] = 2] = "rotate";
      BehaviorFlag[BehaviorFlag["doAction"] = 4] = "doAction";
      BehaviorFlag[BehaviorFlag["all"] = 5] = "all";
    })(BehaviorFlag = exports.BehaviorFlag || (exports.BehaviorFlag = {}));
    cc._RF.pop();
  }, {} ],
  BlackMask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "004153sszxPP6eEfqCn56vh", "BlackMask");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var Messages_1 = require("../message/Messages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlackMask = function(_super) {
      __extends(BlackMask, _super);
      function BlackMask() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BlackMask.prototype.onLoad = function() {
        this.node.active = false;
        GlobalMessage_1.GlobalMessage.on(Messages_1.BlackMaskShow, this.onShow, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.BlackMaskHide, this.onHide, this);
      };
      BlackMask.prototype.onShow = function() {
        this.node.active = true;
      };
      BlackMask.prototype.onHide = function() {
        this.node.active = false;
      };
      BlackMask.prototype.onDestroy = function() {
        GlobalMessage_1.GlobalMessage.offAll(this);
      };
      BlackMask = __decorate([ ccclass ], BlackMask);
      return BlackMask;
    }(cc.Component);
    exports.default = BlackMask;
    cc._RF.pop();
  }, {
    "../../tools/GlobalMessage": "GlobalMessage",
    "../message/Messages": "Messages"
  } ],
  BloodBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d191eXe109Oe7sJXVgcH8+H", "BloodBar");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BloodBar = function(_super) {
      __extends(BloodBar, _super);
      function BloodBar() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frame = [];
        _this.topBar = null;
        _this.downBar = null;
        _this.label = null;
        _this.m_Cur = 0;
        _this.m_Total = 0;
        _this.m_PerValue = 0;
        _this.m_TargetValue = 0;
        _this.m_TargetIndex = -1;
        _this.m_MaxIndex = 0;
        return _this;
      }
      BloodBar.prototype.setBar = function(total, perValue, cur) {
        void 0 === cur && (cur = -1);
        this.m_Total = total;
        this.m_Cur = -1 == cur ? this.m_Total : cur;
        this.m_PerValue = perValue;
        this.m_MaxIndex = Math.floor(this.m_Total / this.m_PerValue) - 1;
        this.updateIndexAndValue();
      };
      BloodBar.prototype.updateColor = function() {
        this.topBar.fillRange = this.downBar.fillRange = 1;
        this.topBar.spriteFrame = this.frame[this.m_TargetIndex % this.frame.length];
        if (this.m_TargetIndex >= this.m_MaxIndex) this.downBar.node.active = false; else {
          this.downBar.node.active = true;
          this.downBar.spriteFrame = this.frame[(this.m_TargetIndex + 1) % this.frame.length];
        }
      };
      BloodBar.prototype.updateIndexAndValue = function() {
        var cur = this.m_Cur;
        var old = this.m_TargetIndex;
        var targetIndex = Math.floor((this.m_Total - cur) / this.m_PerValue);
        this.m_TargetIndex = targetIndex;
        var targetValue = 0;
        targetValue = cur % this.m_PerValue == 0 ? this.m_PerValue : cur % this.m_PerValue;
        this.m_TargetValue = targetValue;
        old != this.m_TargetIndex && this.updateColor();
        this.updateBar();
      };
      BloodBar.prototype.updateBar = function() {
        this.topBar.fillRange = this.m_TargetValue / this.m_PerValue;
        this.label.string = "x" + (this.m_MaxIndex - this.m_TargetIndex);
      };
      BloodBar.prototype.ChangeValue = function(value) {
        this.m_Cur = value;
        this.m_Cur = Math.max(0, Math.min(this.m_Cur, this.m_Total));
        this.updateIndexAndValue();
      };
      __decorate([ property([ cc.SpriteFrame ]) ], BloodBar.prototype, "frame", void 0);
      __decorate([ property(cc.Sprite) ], BloodBar.prototype, "topBar", void 0);
      __decorate([ property(cc.Sprite) ], BloodBar.prototype, "downBar", void 0);
      __decorate([ property(cc.Label) ], BloodBar.prototype, "label", void 0);
      BloodBar = __decorate([ ccclass ], BloodBar);
      return BloodBar;
    }(cc.Component);
    exports.default = BloodBar;
    cc._RF.pop();
  }, {} ],
  Boom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "349ddfbROxONqRLoJbgPC23", "Boom");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var Gizmos_1 = require("../../../tools/Gizmos");
    var Circle_1 = require("../../../tools/objects/Circle");
    var CollisitionManager_1 = require("../../manager/CollisitionManager");
    var EffectManager_1 = require("../../manager/EffectManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Boom = function(_super) {
      __extends(Boom, _super);
      function Boom() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cdTimer = 0;
        _this.boomEffect = "";
        return _this;
      }
      Boom.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
      };
      Boom.prototype.fixUpdate = function() {
        var _this = this;
        var _a;
        var dt = FixManager_1.default.fixedDeltaTime;
        this.cdTimer -= dt;
        var movement = this.character.movement;
        var range = this.character.getProperty("boomRange");
        if (this.cdTimer <= 0 && movement.hit && range > 20) {
          EffectManager_1.default.inst.addEffect(this.boomEffect, this.character.node, movement.hitPoint.clone());
          var shape = new Circle_1.default();
          shape.center.set(movement.hitPoint);
          shape.radius = range;
          GamaManager_1.default.inst.debugHitBox && Gizmos_1.default.DrawCirle(shape.center, shape.radius);
          var damageMulti = null !== (_a = this.character.getProperty("boomDamageMulti")) && void 0 !== _a ? _a : 1;
          var result = CollisitionManager_1.default.inst.collisitionByShape(shape, "enemy");
          result.forEach(function(item) {
            GamaManager_1.default.inst.doDamage(_this.character.node, item, [ "boom" ]);
          });
          this.cdTimer = .1;
        }
      };
      __decorate([ property ], Boom.prototype, "boomEffect", void 0);
      Boom = __decorate([ ccclass ], Boom);
      return Boom;
    }(FixComponent_1.default);
    exports.default = Boom;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../../tools/Gizmos": "Gizmos",
    "../../../tools/objects/Circle": "Circle",
    "../../manager/CollisitionManager": "CollisitionManager",
    "../../manager/EffectManager": "EffectManager",
    "../../manager/GamaManager": "GamaManager",
    "../Character": "Character"
  } ],
  BossAI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cd52fpVy9E16BIQW6yd+W7", "BossAI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BossAI = void 0;
    var AIBase_1 = require("./AIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BossAI = function(_super) {
      __extends(BossAI, _super);
      function BossAI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.attackList = [];
        return _this;
      }
      BossAI.prototype.tryCastSKill = function() {
        var attack = this.checkCanAttack();
        if (attack) {
          this.lookMainCharacter();
          var index = Math.floor(Math.random() * this.attackList.length);
          index = Math.min(index, this.attackList.length - 1);
          this.character.doAction(this.attackList[index]);
          this.resetAttackTime();
        }
        return attack;
      };
      __decorate([ property([ String ]) ], BossAI.prototype, "attackList", void 0);
      BossAI = __decorate([ ccclass ], BossAI);
      return BossAI;
    }(AIBase_1.default);
    exports.BossAI = BossAI;
    cc._RF.pop();
  }, {
    "./AIBase": "AIBase"
  } ],
  BoxCollision: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62a50L8/EFC6Kh6c8njDIUj", "BoxCollision");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Gizmos_1 = require("../../tools/Gizmos");
    var AABB_1 = require("../../tools/objects/AABB");
    var Collision_1 = require("./Collision");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BoxCollision = function(_super) {
      __extends(BoxCollision, _super);
      function BoxCollision() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(BoxCollision.prototype, "shape", {
        get: function() {
          return cc.geomUtils.enums.SHAPE_AABB;
        },
        enumerable: false,
        configurable: true
      });
      BoxCollision.prototype.getShape = function() {
        var aabb = new AABB_1.default();
        this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, aabb.center);
        aabb.halfExtents.x = this.node.width / 2;
        aabb.halfExtents.y = this.node.height / 2;
        return aabb;
      };
      BoxCollision.prototype.draw = function() {
        var shape = this.getShape();
        Gizmos_1.default.DrawRect(shape.center.x - shape.halfExtents.x, shape.center.y - shape.halfExtents.y, 2 * shape.halfExtents.x, 2 * shape.halfExtents.y);
      };
      BoxCollision = __decorate([ ccclass ], BoxCollision);
      return BoxCollision;
    }(Collision_1.default);
    exports.default = BoxCollision;
    cc._RF.pop();
  }, {
    "../../tools/Gizmos": "Gizmos",
    "../../tools/objects/AABB": "AABB",
    "./Collision": "Collision"
  } ],
  BuffConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "82600oEjKVEOLA+8NK8pt/U", "BuffConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BuffConfig = function() {
      function BuffConfig() {}
      return BuffConfig;
    }();
    exports.default = BuffConfig;
    cc._RF.pop();
  }, {} ],
  BuffHeal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0cc8eWHdGlKR6sIJ7ohb6xO", "BuffHeal");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../../../character/Character");
    var BuffObj_1 = require("./BuffObj");
    var BuffHeal = function(_super) {
      __extends(BuffHeal, _super);
      function BuffHeal() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BuffHeal.prototype.onAdd = function(modifyStack) {
        var value = parseFloat(this.buffParam[0]);
        var character = this.owner.getComponent(Character_1.default);
        var value = character.getProperty("maxHp") * value;
        character.heal(value);
      };
      return BuffHeal;
    }(BuffObj_1.default);
    exports.default = BuffHeal;
    cc._RF.pop();
  }, {
    "../../../character/Character": "Character",
    "./BuffObj": "BuffObj"
  } ],
  BuffImmune: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83f1bmhyFxPwIrAxld2eXM8", "BuffImmune");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../../../character/Character");
    var BuffWitchCd_1 = require("./BuffWitchCd");
    var BuffImmune = function(_super) {
      __extends(BuffImmune, _super);
      function BuffImmune() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.orginValue = 0;
        return _this;
      }
      BuffImmune.prototype.onAdd = function(count) {
        _super.prototype.onAdd.call(this, count);
        this.addShield();
      };
      BuffImmune.prototype.addShield = function() {
        var character = this.owner.getComponent(Character_1.default);
        character.addImmune();
        this.orginValue = character.shieldImmune;
      };
      BuffImmune.prototype.onCdOver = function() {
        _super.prototype.onCdOver.call(this);
        this.addShield();
      };
      BuffImmune.prototype.onTick = function(dt) {
        _super.prototype.onTick.call(this, dt);
        var character = this.owner.getComponent(Character_1.default);
        this.orginValue > 0 && character.shieldImmune <= 0 && this.resetCd();
        this.orginValue = character.shieldImmune;
      };
      return BuffImmune;
    }(BuffWitchCd_1.default);
    exports.default = BuffImmune;
    cc._RF.pop();
  }, {
    "../../../character/Character": "Character",
    "./BuffWitchCd": "BuffWitchCd"
  } ],
  BuffObj: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "638aaGMcepN75HkXZjNzWpS", "BuffObj");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AddBuffInfo = void 0;
    var PropertyModifier_1 = require("../../PropertyModifier");
    var AddBuffInfo = function() {
      function AddBuffInfo() {}
      return AddBuffInfo;
    }();
    exports.AddBuffInfo = AddBuffInfo;
    var BuffObj = function() {
      function BuffObj(owner, config, addStack) {
        var _a, _b;
        this.propMod = new PropertyModifier_1.PropertyModifier();
        this.owner = owner;
        this.config = config;
        this.duration = null !== (_a = config.duration) && void 0 !== _a ? _a : 0;
        this.timeElapsed = 0;
        this.ticked = 0;
        this.stack = addStack;
        this.buffParam = null !== (_b = config.param) && void 0 !== _b ? _b : [];
      }
      BuffObj.prototype.onAdd = function(modifyStack) {};
      BuffObj.prototype.onTick = function(dt) {};
      BuffObj.prototype.onRemoved = function() {};
      return BuffObj;
    }();
    exports.default = BuffObj;
    cc._RF.pop();
  }, {
    "../../PropertyModifier": "PropertyModifier"
  } ],
  BuffProperty: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad6f0cxUsZL5JIsqZGK4Gtk", "BuffProperty");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../../../character/Character");
    var PropertyModifier_1 = require("../../PropertyModifier");
    var BuffObj_1 = require("./BuffObj");
    var BuffProperty = function(_super) {
      __extends(BuffProperty, _super);
      function BuffProperty() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.proiver = null;
        return _this;
      }
      BuffProperty.prototype.onAdd = function(modifyStack) {
        var name = this.buffParam[0];
        var percentage = parseFloat(this.buffParam[1]);
        var value = this.buffParam[2] ? parseFloat(this.buffParam[2]) : 0;
        this.proiver = new PropertyModifier_1.PropertyProvider(name, value, percentage);
        this.owner.getComponent(Character_1.default).addBuffProperty(this.proiver.property, this.proiver);
      };
      BuffProperty.prototype.onRemoved = function() {
        this.owner.getComponent(Character_1.default).removeBuffProperty(this.proiver.property, this.proiver);
      };
      return BuffProperty;
    }(BuffObj_1.default);
    exports.default = BuffProperty;
    cc._RF.pop();
  }, {
    "../../../character/Character": "Character",
    "../../PropertyModifier": "PropertyModifier",
    "./BuffObj": "BuffObj"
  } ],
  BuffScripts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d2bafYYjFPtLra5BzwUpsB", "BuffScripts");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuffScripts = void 0;
    var BuffScripts = function() {
      function BuffScripts() {}
      return BuffScripts;
    }();
    exports.BuffScripts = BuffScripts;
    cc._RF.pop();
  }, {} ],
  BuffShield: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a43bAIb0VNh7xIjkgmdouo", "BuffShield");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../../../character/Character");
    var BuffWitchCd_1 = require("./BuffWitchCd");
    var BuffShield = function(_super) {
      __extends(BuffShield, _super);
      function BuffShield() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.orginShield = 0;
        return _this;
      }
      BuffShield.prototype.onAdd = function(count) {
        _super.prototype.onAdd.call(this, count);
        this.addShield();
      };
      BuffShield.prototype.addShield = function() {
        var character = this.owner.getComponent(Character_1.default);
        var shield = .2 * character.getProperty("maxHp");
        character.addShield(shield);
        this.orginShield = shield;
      };
      BuffShield.prototype.onCdOver = function() {
        _super.prototype.onCdOver.call(this);
        this.addShield();
      };
      BuffShield.prototype.onTick = function(dt) {
        _super.prototype.onTick.call(this, dt);
        var character = this.owner.getComponent(Character_1.default);
        this.orginShield > 0 && character.shield <= 0 && this.resetCd();
        this.orginShield = character.shield;
      };
      return BuffShield;
    }(BuffWitchCd_1.default);
    exports.default = BuffShield;
    cc._RF.pop();
  }, {
    "../../../character/Character": "Character",
    "./BuffWitchCd": "BuffWitchCd"
  } ],
  BuffTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "488d15vYxdO8pmICRYP0Pci", "BuffTable");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuffTable = void 0;
    var BuffHeal_1 = require("../../structs/battle/buff/BuffHeal");
    var BuffImmune_1 = require("../../structs/battle/buff/BuffImmune");
    var BuffProperty_1 = require("../../structs/battle/buff/BuffProperty");
    var BuffShield_1 = require("../../structs/battle/buff/BuffShield");
    exports.BuffTable = {
      BuffHeal: BuffHeal_1.default,
      BuffProperty: BuffProperty_1.default,
      BuffShield: BuffShield_1.default,
      BuffImmune: BuffImmune_1.default
    };
    cc._RF.pop();
  }, {
    "../../structs/battle/buff/BuffHeal": "BuffHeal",
    "../../structs/battle/buff/BuffImmune": "BuffImmune",
    "../../structs/battle/buff/BuffProperty": "BuffProperty",
    "../../structs/battle/buff/BuffShield": "BuffShield"
  } ],
  BuffWitchCd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dfd12grlihO55QFru/5eOn+", "BuffWitchCd");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BuffObj_1 = require("./BuffObj");
    var BuffWitchCd = function(_super) {
      __extends(BuffWitchCd, _super);
      function BuffWitchCd() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cdTime = 0;
        _this.isReady = false;
        _this.cdCallback = null;
        return _this;
      }
      Object.defineProperty(BuffWitchCd.prototype, "cdTimer", {
        get: function() {
          return this._cdTimer;
        },
        set: function(value) {
          if (this._cdTimer == value) return;
          this._cdTimer = value;
          this.onCdTimerChanged();
        },
        enumerable: false,
        configurable: true
      });
      BuffWitchCd.prototype.onAdd = function(count) {
        count > 0 && (this.isReady = true);
      };
      BuffWitchCd.prototype.getCd = function() {
        var cd = this.buffParam["cd"];
        return null !== cd && void 0 !== cd ? cd : 0;
      };
      BuffWitchCd.prototype.onCdOver = function() {
        this.isReady = true;
      };
      BuffWitchCd.prototype.startCd = function(time, cdCallback) {
        this.cdTimer = time;
        this.cdTimer <= 0 ? cdCallback && cdCallback.apply(this) : this.cdCallback = cdCallback;
      };
      BuffWitchCd.prototype.resetCd = function() {
        this.isReady = false;
        this.cdTime = this.getCd();
        this.startCd(this.cdTime, this.onCdOver);
      };
      BuffWitchCd.prototype.onCdTimerChanged = function() {};
      BuffWitchCd.prototype.onTick = function(dt) {
        if (this.cdTimer && this.cdTimer > 0) {
          this.cdTimer -= dt;
          this.cdTimer <= 0 && this.cdCallback && this.cdCallback.apply(this);
        }
      };
      return BuffWitchCd;
    }(BuffObj_1.default);
    exports.default = BuffWitchCd;
    cc._RF.pop();
  }, {
    "./BuffObj": "BuffObj"
  } ],
  BulletEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7406bNlRv1D+aqE0MwIACU9", "BulletEmitter");
    cc._RF.pop();
  }, {} ],
  BulletModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56a63tHKVJF64mt+QhOD4x4", "BulletModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BulletModel = function() {
      function BulletModel(id, prefab, speed, hitTime, tags) {
        void 0 === hitTime && (hitTime = 1);
        void 0 === tags && (tags = []);
        this.id = id;
        this.prefab = prefab;
        this.speed = speed;
        this.hitTime = hitTime;
        this.tags = tags;
      }
      return BulletModel;
    }();
    exports.default = BulletModel;
    cc._RF.pop();
  }, {} ],
  BulletObj: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "689d8cEggtIwpO+7D+LExHQ", "BulletObj");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var Gizmos_1 = require("../../tools/Gizmos");
    var AABB_1 = require("../../tools/objects/AABB");
    var Character_1 = require("../character/Character");
    var CollisitionManager_1 = require("../manager/CollisitionManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BulletObj = function(_super) {
      __extends(BulletObj, _super);
      function BulletObj() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hitRecord = {};
        return _this;
      }
      BulletObj.prototype.init = function(owner, direction, model) {
        this.owner = owner;
        this.direction = direction;
        this.model = model;
        this.hitTime = model.hitTime;
        this.node.rotation = 180 * Math.atan2(direction.x, direction.y) / Math.PI;
      };
      BulletObj.prototype.fixUpdate = function() {
        var dt = FixManager_1.default.fixedDeltaTime;
        var position = this.direction.clone();
        position.mulSelf(this.model.speed * dt);
        position.x += this.node.x;
        position.y += this.node.y;
        this.node.setPosition(position);
        if (position.x < GamaManager_1.default.inst.minX || position.y < GamaManager_1.default.inst.minY || position.x > GamaManager_1.default.inst.maxX || position.y > GamaManager_1.default.inst.maxY) this.node.destroy(); else {
          GamaManager_1.default.inst.debugHitBox && Gizmos_1.default.DrawCirle(cc.v2(this.node.x, this.node.y), this.node.width / 2);
          var shape = new AABB_1.default();
          shape.center.set(this.node.position);
          shape.halfExtents.x = this.node.width / 2;
          shape.halfExtents.y = shape.halfExtents.x;
          var character = this.owner.getComponent(Character_1.default);
          var group = "hero";
          "hero" == character.group && (group = "enemy");
          var result = CollisitionManager_1.default.inst.collisitionByShape(shape, group);
          for (var i = 0; i < result.length; i++) {
            var node = result[i];
            var id = node["_id"];
            if (null == this.hitRecord[id]) {
              this.hitRecord[id] = true;
              this.hit(node);
            }
          }
        }
      };
      BulletObj.prototype.hit = function(node) {
        if (-1 != this.hitTime) {
          this.hitTime -= 1;
          this.hitTime <= 0 && this.node.destroy();
        }
        GamaManager_1.default.inst.doDamage(this.owner, node, this.model.tags);
      };
      BulletObj = __decorate([ ccclass ], BulletObj);
      return BulletObj;
    }(FixComponent_1.default);
    exports.default = BulletObj;
    cc._RF.pop();
  }, {
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../../tools/Gizmos": "Gizmos",
    "../../tools/objects/AABB": "AABB",
    "../character/Character": "Character",
    "../manager/CollisitionManager": "CollisitionManager",
    "../manager/GamaManager": "GamaManager"
  } ],
  BulletTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6b89Pb/7RH/5syCJn1PQnP", "BulletTable");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BulletTable = void 0;
    var BulletModel_1 = require("../../structs/battle/BulletModel");
    exports.BulletTable = {
      ganzhe_bullet: new BulletModel_1.default("ganzhe", "ganzhe_bullet", 600),
      shiliu_bullet: new BulletModel_1.default("shiliu", "shiliu_bullet", 600),
      boss_bullet: new BulletModel_1.default("boss", "boss_bullet", 1e3),
      feidao_bullet: new BulletModel_1.default("feidao", "feidao_bullet", 900, -1, [ "feidao" ]),
      fbsd_bullet: new BulletModel_1.default("fbsd", "feidao_bullet", 900, -1, [ "fbsd" ])
    };
    cc._RF.pop();
  }, {
    "../../structs/battle/BulletModel": "BulletModel"
  } ],
  BundleMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "877a3UASUlFu5nMq3NX2h6R", "BundleMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMInterface_1 = require("../Interface/FMInterface");
    var LogUtils_1 = require("../Util/LogUtils");
    var BundleMgr = function() {
      function BundleMgr() {}
      BundleMgr.loadBundleByName_csryw = function(bundleName, listener) {
        LogUtils_1.LogUtils.info_csryw("\u52a0\u8f7d\u8d44\u6e90\u5305 " + bundleName);
        cc.assetManager.loadBundle(bundleName, function(err, bundle) {
          console.log(bundle);
          FMInterface_1.callFM_csryw(listener, err, bundle);
        });
      };
      BundleMgr.getBundle_csryw = function(bundleName) {
        return cc.assetManager.getBundle(bundleName);
      };
      BundleMgr.removeBundle_csryw = function(bundleName, releaseAll) {
        void 0 === releaseAll && (releaseAll = true);
        var bundle = this.getBundle_csryw(bundleName);
        bundle && releaseAll && bundle.releaseAll();
        cc.assetManager.removeBundle(bundle);
      };
      BundleMgr.runScene_csryw = function(bundleName, sceneName, listener) {
        void 0 === listener && (listener = null);
        var bundle = this.getBundle_csryw(bundleName);
        bundle ? bundle.loadScene(sceneName, function(error, scene) {
          listener && FMInterface_1.callFM_csryw(listener);
          cc.director.runScene(scene);
        }) : this.loadBundleByName_csryw(bundleName, FMInterface_1.handleFM_csryw(function(err, bundle) {
          bundle.loadScene(sceneName, function(error, scene) {
            listener && FMInterface_1.callFM_csryw(listener);
            cc.director.runScene(scene);
          });
        }, this));
      };
      return BundleMgr;
    }();
    exports.default = BundleMgr;
    cc._RF.pop();
  }, {
    "../Interface/FMInterface": "FMInterface",
    "../Util/LogUtils": "LogUtils"
  } ],
  ChaProperty: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efb7avoFKlGR4mdozaXREvA", "ChaProperty");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ChaProperty = function() {
      function ChaProperty() {
        this.hp = 0;
        this.attack = 0;
        this.cirt = 0;
        this.moveSpeed = 0;
        this.catapultForce = 0;
        this.bodyRadius = 0;
        this.range = 0;
        this.energy = 0;
      }
      ChaProperty.prototype.IncreaseByModifier = function(baseProp, modifier) {
        this.hp = modifier.updateProperty("hp", baseProp.moveSpeed);
        this.attack = modifier.updateProperty("attack", baseProp.moveSpeed);
        this.moveSpeed = modifier.updateProperty("moveSpeed", baseProp.moveSpeed);
        this.catapultForce = modifier.updateProperty("catapultForce", baseProp.catapultForce);
        this.bodyRadius = modifier.updateProperty("bodyRadius", baseProp.moveSpeed);
        this.range = modifier.updateProperty("range", baseProp.range);
        this.cirt = modifier.updateProperty("cirt", baseProp.cirt);
      };
      ChaProperty.prototype.Merge = function(b) {
        this.hp += b.hp;
        this.attack += b.attack;
        this.cirt += b.cirt;
        this.moveSpeed += b.moveSpeed;
        this.catapultForce += b.catapultForce;
        this.bodyRadius += b.bodyRadius;
        this.range += b.range;
        this.energy += b.energy;
        return this;
      };
      ChaProperty.prototype.Zero = function() {
        this.hp = 0;
        this.attack = 0;
        this.cirt = 0;
        this.moveSpeed = 0;
        this.catapultForce = 0;
        this.bodyRadius = 0;
        this.range = 0;
        this.energy = 0;
      };
      Object.defineProperty(ChaProperty, "zero", {
        get: function() {
          return new ChaProperty();
        },
        enumerable: false,
        configurable: true
      });
      return ChaProperty;
    }();
    exports.default = ChaProperty;
    cc._RF.pop();
  }, {} ],
  CharacterActionConsumer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "77ecdKsUhNBL5LVgm3mgB8Q", "CharacterActionConsumer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_1 = require("../manager/AudioManager");
    var CollisitionManager_1 = require("../manager/CollisitionManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var Behavior_1 = require("./Behavior");
    var Character_1 = require("./Character");
    var BallMove_1 = require("./movement/BallMove");
    var DistanceMove_1 = require("./movement/DistanceMove");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var CharacterActionConsumer = function(_super) {
      __extends(CharacterActionConsumer, _super);
      function CharacterActionConsumer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.skeleton = null;
        return _this;
      }
      CharacterActionConsumer.prototype.onLoad = function() {
        this.character = this.getComponent(Character_1.default);
      };
      CharacterActionConsumer.prototype.update = function(dt) {
        var pause = GamaManager_1.default.inst.isPause;
        this.skeleton.paused != pause && (this.skeleton.paused = pause);
      };
      CharacterActionConsumer.prototype.onConsumeAction = function(action, args) {
        var func = this[action];
        if (null == func) {
          console.error("no find action, " + action);
          return;
        }
        func.apply(this, args);
      };
      CharacterActionConsumer.prototype.playAnim = function(animName, loop) {
        void 0 === loop && (loop = false);
        if (this.skeleton.animation == animName) return;
        this.skeleton.setAnimation(0, animName, loop);
      };
      CharacterActionConsumer.prototype.changeFlag = function(move, rotate) {
        void 0 === move && (move = true);
        void 0 === rotate && (rotate = true);
        false == move ? this.character.actionControlFlag &= ~Behavior_1.BehaviorFlag.move : this.character.actionControlFlag |= Behavior_1.BehaviorFlag.move;
        false == rotate ? this.character.actionControlFlag &= ~Behavior_1.BehaviorFlag.rotate : this.character.actionControlFlag |= Behavior_1.BehaviorFlag.rotate;
      };
      CharacterActionConsumer.prototype.attack = function(hitBox, group) {
        var collision = this.character.getHitBox(hitBox);
        GamaManager_1.default.inst.debugHitBox && collision.draw();
        group = "enemy" == this.character.group ? "hero" : "enemy";
        var nodes = CollisitionManager_1.default.inst.collisition(collision, group);
        for (var i = 0; i < nodes.length; i++) GamaManager_1.default.inst.doDamage(this.character.node, nodes[i]);
      };
      CharacterActionConsumer.prototype.shoot = function(bullet, launcher) {
        var target = GamaManager_1.default.inst.mainCharacter.node;
        var direction = new cc.Vec2(target.x - this.character.node.x, target.y - this.character.node.y);
        target == this.character.node && direction.set(cc.Vec2.RIGHT);
        var position;
        if (null == launcher) position = cc.v2(this.node.x, this.node.y); else {
          var node = this.character.node.getChildByName(launcher);
          position = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        }
        direction.normalizeSelf();
        GamaManager_1.default.inst.createBullet(this.character.node, bullet, position, direction);
      };
      CharacterActionConsumer.prototype.shootByCount = function(bullet, launcher, count, angle) {
        var target = GamaManager_1.default.inst.mainCharacter.node;
        var position;
        if (null == launcher) position = cc.v2(this.node.x, this.node.y); else {
          var node = this.character.node.getChildByName(launcher);
          position = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        }
        var direction = cc.v2(target.x - position.x, target.y - position.y);
        direction.normalizeSelf();
        var step = angle / count;
        direction.rotateSelf(-(angle - step) / 2);
        for (var i = 0; i < count; i++) {
          var dir = direction.rotate(i * step);
          GamaManager_1.default.inst.createBullet(this.character.node, bullet, position, dir);
        }
      };
      CharacterActionConsumer.prototype.explode = function(explodeHitBox, force) {
        void 0 === force && (force = 1500);
        var collision = this.character.getHitBox(explodeHitBox);
        GamaManager_1.default.inst.debugHitBox && collision.draw();
        var group = "enemy" == this.character.group ? "hero" : "enemy";
        var nodes = CollisitionManager_1.default.inst.collisition(collision, group);
        for (var i = 0; i < nodes.length; i++) {
          var ballMove = nodes[i].getComponent(BallMove_1.default);
          if (ballMove) {
            var direction = cc.v2(nodes[i].x - this.character.node.x, nodes[i].y - this.character.node.y);
            ballMove.catapult(direction.normalizeSelf(), force);
          }
        }
      };
      CharacterActionConsumer.prototype.attackToTarget = function(hitBox, group) {
        var collision = this.character.getHitBox(hitBox);
        GamaManager_1.default.inst.debugHitBox && collision.draw();
        var target = GamaManager_1.default.inst.mainCharacter.node;
        var direction = new cc.Vec2(target.x - this.character.node.x, target.y - this.character.node.y);
        target == this.character.node && direction.set(cc.v2(1, 1).normalize());
        direction.normalizeSelf();
        var angle = cc.misc.radiansToDegrees(Math.atan2(direction.x, direction.y));
        group = "enemy" == this.character.group ? "hero" : "enemy";
        collision.node.parent.angle = -angle;
        this.character.directionX < 0 && (collision.node.parent.angle *= -1);
        var nodes = CollisitionManager_1.default.inst.collisition(collision, group);
        for (var i = 0; i < nodes.length; i++) GamaManager_1.default.inst.doDamage(this.character.node, nodes[i]);
      };
      CharacterActionConsumer.prototype.springToHero = function() {
        var target = GamaManager_1.default.inst.mainCharacter.node;
        var direction = new cc.Vec2(target.x - this.character.node.x, target.y - this.character.node.y);
        direction.normalizeSelf();
        direction.mulSelf(300);
        this.character.addMoveProiver(new DistanceMove_1.default(direction, .3));
      };
      CharacterActionConsumer.prototype.playSound = function(sound) {
        AudioManager_1.default.inst.playSFX("Sound/" + sound);
      };
      __decorate([ property(sp.Skeleton) ], CharacterActionConsumer.prototype, "skeleton", void 0);
      CharacterActionConsumer = __decorate([ ccclass ], CharacterActionConsumer);
      return CharacterActionConsumer;
    }(cc.Component);
    exports.default = CharacterActionConsumer;
    cc._RF.pop();
  }, {
    "../manager/AudioManager": "AudioManager",
    "../manager/CollisitionManager": "CollisitionManager",
    "../manager/GamaManager": "GamaManager",
    "./Behavior": "Behavior",
    "./Character": "Character",
    "./movement/BallMove": "BallMove",
    "./movement/DistanceMove": "DistanceMove"
  } ],
  CharacterInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2da62mP5eFNw4mpM3uzEZN5", "CharacterInfo");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CharacterInfo = function() {
      function CharacterInfo(name, group, prefab, hp, attack, cirt, range, moveSpeed, catapultForce, bodyRadius, anim, skills) {
        this.name = "";
        this.group = "";
        this.nameIcon = "";
        this.prefab = "";
        this.hp = 0;
        this.attack = 0;
        this.cirt = 0;
        this.range = 0;
        this.moveSpeed = 0;
        this.catapultForce = 0;
        this.bodyRadius = 0;
        this.hit = "";
        this.type = 0;
        this.hurtSound = "";
        this.deadEffect = "";
        this.deadSound = "";
        this.dropMoney = 0;
        this.name = name;
        this.group = group;
        this.prefab = prefab;
        this.hp = hp;
        this.attack = attack;
        this.cirt = cirt;
        this.range = range;
        this.moveSpeed = moveSpeed;
        this.catapultForce = catapultForce;
        this.bodyRadius = bodyRadius;
        this.actions = anim;
        this.skills = skills;
      }
      return CharacterInfo;
    }();
    exports.default = CharacterInfo;
    cc._RF.pop();
  }, {} ],
  CharacterLevelTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84b2fRQy9tNN5/4OCe0NxRQ", "CharacterLevelTable");
    cc._RF.pop();
  }, {} ],
  CharacterLevel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c431aXZVZB8JrwnZr/b/8C", "CharacterLevel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CharacterLevel = function() {
      function CharacterLevel() {}
      return CharacterLevel;
    }();
    exports.default = CharacterLevel;
    cc._RF.pop();
  }, {} ],
  CharacterTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16e81qvBVJL+YJ/egv3CloE", "CharacterTable");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CharacterTable = void 0;
    var CharacterInfo_1 = require("../../structs/character/CharacterInfo");
    exports.CharacterTable = {
      hero: new CharacterInfo_1.default("\u4e3b\u89d2", "hero", "hero", 100, 100, 0, 100, 100, 1500, 0, "hero", []),
      xigua: new CharacterInfo_1.default("\u897f\u74dc", "enemy", "xigua", 100, 20, 0, 100, 100, 0, 0, "enemy_near", []),
      chengzi: new CharacterInfo_1.default("\u6a59\u5b50", "enemy", "chengzi", 100, 20, 0, 100, 100, 0, 0, "enemy_near", []),
      mangguo: new CharacterInfo_1.default("\u8292\u679c", "enemy", "mangguo", 100, 20, 0, 100, 100, 0, 0, "enemy_near", []),
      caomei: new CharacterInfo_1.default("\u8349\u8393", "enemy", "caomei", 100, 20, 0, 100, 100, 0, 0, "enemy_near", []),
      xiangjiao: new CharacterInfo_1.default("\u9999\u8549", "enemy", "xiangjiao", 20, 100, 0, 100, 100, 0, 0, "enemy_near", []),
      ganzhe: new CharacterInfo_1.default("\u7518\u8517", "enemy", "ganzhe", 100, 20, 0, 100, 100, 0, 0, "enemy_shooter", []),
      yingtao: new CharacterInfo_1.default("\u6a31\u6843", "enemy", "yingtao", 1, 20, 0, 100, 100, 0, 0, "yingtao", []),
      huolongguo: new CharacterInfo_1.default("\u897f\u74dc", "enemy", "huolongguo", 100, 20, 0, 100, 100, 0, 0, "enemy_near", [])
    };
    cc._RF.pop();
  }, {
    "../../structs/character/CharacterInfo": "CharacterInfo"
  } ],
  Character: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "572160VLAVPooieiGvWKElE", "Character");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var Gizmos_1 = require("../../tools/Gizmos");
    var AABB_1 = require("../../tools/objects/AABB");
    var Collision_1 = require("../collision/Collision");
    var CollisitionManager_1 = require("../manager/CollisitionManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var UnitMovement_1 = require("../unit/UnitMovement");
    var UnitAction_1 = require("../unit/action/UnitAction");
    var Behavior_1 = require("./Behavior");
    var CharacterActionConsumer_1 = require("./CharacterActionConsumer");
    var BuffObj_1 = require("../structs/battle/buff/BuffObj");
    var ConfigManager_1 = require("../../ConfigManager");
    var BuffTable_1 = require("../designer/table/BuffTable");
    var EffectManager_1 = require("../manager/EffectManager");
    var PropertyModifier_1 = require("../structs/PropertyModifier");
    var AudioManager_1 = require("../manager/AudioManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var Character = function(_super) {
      __extends(Character, _super);
      function Character() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.controlFlag = Behavior_1.BehaviorFlag.all;
        _this.actionControlFlag = Behavior_1.BehaviorFlag.all;
        _this.directionX = 1;
        _this.velocity = new cc.Vec2();
        _this.moving = false;
        _this.moveProviders = [];
        _this.waitActions = [];
        _this.hp = 0;
        _this.maxHp = 0;
        _this.attack = 0;
        _this.cirt = 0;
        _this.moveSpeed = 0;
        _this.catapultForce = 0;
        _this.bodyRadius = 0;
        _this.range = 0;
        _this.energy = 0;
        _this.critDamageMulti = 0;
        _this.critDamageOffset = 0;
        _this.shield = 0;
        _this.shieldImmune = 0;
        _this._realPropertyList = {};
        _this._propertyModifier = new PropertyModifier_1.PropertyModifier();
        _this.buffs = [];
        _this.lastHurtDirection = new cc.Vec2();
        return _this;
      }
      Object.defineProperty(Character.prototype, "hpPercentage", {
        get: function() {
          return Math.max(0, this.hp / this.getProperty("maxHp"));
        },
        enumerable: false,
        configurable: true
      });
      Character.prototype.onLoad = function() {
        this.movement = this.getComponent(UnitMovement_1.default);
        this.unitAction = this.getComponent(UnitAction_1.default);
        this.actionConsumer = this.getComponent(CharacterActionConsumer_1.default);
        this.unitAction && this.actionConsumer && this.unitAction.setActionConsumer(this.actionConsumer);
        this.body = this.node.getChildByName("Body");
        this.hitBox = this.node.getChildByName("HitBox");
      };
      Character.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
      };
      Character.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
      };
      Character.prototype.checkAllow = function(flag) {
        var curFlag = this.controlFlag & this.actionControlFlag;
        return (curFlag & flag) == flag;
      };
      Character.prototype.fixUpdate = function() {
        var dt = FixManager_1.default.fixedDeltaTime;
        if (this.isDead) this.moving = false; else {
          var toRemove = [];
          for (var i_1 = 0; i_1 < this.buffs.length; i_1++) {
            false == this.buffs[i_1].config.permanent && (this.buffs[i_1].duration -= dt);
            this.buffs[i_1].timeElapsed += dt;
            this.buffs[i_1].onTick(dt);
            this.buffs[i_1].ticked += 1;
            if (false == this.buffs[i_1].config.permanent && this.buffs[i_1].duration <= 0 || this.buffs[i_1].stack <= 0) {
              this.buffs[i_1].onRemoved();
              toRemove.push(this.buffs[i_1]);
            }
          }
          if (toRemove.length > 0) for (var i = 0; i < toRemove.length; i++) {
            var index = this.buffs.indexOf(toRemove[i]);
            this.buffs.splice(index, 1);
          }
          toRemove = null;
          var canMove = this.checkAllow(Behavior_1.BehaviorFlag.move);
          if (canMove) {
            for (var i_2 = 0; i_2 < this.moveProviders.length; ) {
              var provider = this.moveProviders[i_2];
              if (provider.finished) this.moveProviders.splice(i_2, 1); else {
                i_2++;
                this.velocity.addSelf(provider.updateMovement(dt));
              }
            }
            this.movement.move(this.velocity);
            this.moving = this.velocity.lengthSqr() > 1e-5;
            this.velocity.set(cc.Vec2.ZERO);
          }
          this.node.scaleX != this.directionX && (this.node.scaleX = 0 == this.directionX ? 1 : this.directionX);
          var canDoAction = this.checkAllow(Behavior_1.BehaviorFlag.doAction);
          if (canDoAction) {
            var tryRun = canMove && this.moving;
            false == tryRun ? this.waitActions.push("Idle") : this.waitActions.push("Move");
            for (var i = 0; i < this.waitActions.length; i++) this.unitAction.playAction(this.waitActions[i]);
            this.waitActions.length = 0;
          }
        }
        if (GamaManager_1.default.inst.debugHitBox) {
          var shape = this.getShape();
          Gizmos_1.default.DrawRect(shape.center.x - shape.halfExtents.x, shape.center.y - shape.halfExtents.y, 2 * shape.halfExtents.x, 2 * shape.halfExtents.y);
        }
      };
      Character.prototype.InitProperty = function(property) {
        this.maxHp = property.hp;
        this.attack = property.attack;
        this.cirt = property.cirt;
        this.moveSpeed = property.moveSpeed;
        this.catapultForce = property.catapultForce;
        this.bodyRadius = property.bodyRadius;
        this.range = property.range;
        this.critDamageMulti = 2;
        this.critDamageOffset = 0;
        for (var key in this._realPropertyList) this.updateReadProperty(key);
        this.hp = this.getProperty("maxHp");
      };
      Character.prototype.setActions = function(actions) {
        if (null == this.unitAction) return;
        this.unitAction.setAction(actions);
      };
      Character.prototype.doAction = function(name) {
        if (!this.checkAllow(Behavior_1.BehaviorFlag.doAction)) return;
        this.waitActions.push(name);
      };
      Character.prototype.moveByDirection = function(direction) {
        this.velocity.set(direction);
        this.velocity.mulSelf(this.moveSpeed);
      };
      Character.prototype.addMoveProiver = function(proiver) {
        if (this.moveProviders.includes(proiver)) return;
        this.moveProviders.push(proiver);
      };
      Character.prototype.setDirection = function(sign) {
        this.directionX = Math.sign(sign);
      };
      Character.prototype.getHitBox = function(name) {
        var _a;
        if (null == this.hitBox) return;
        var node = this.hitBox.getChildByName(name);
        return node && (null !== (_a = node.getComponent(Collision_1.default)) && void 0 !== _a ? _a : node.getComponentInChildren(Collision_1.default));
      };
      Character.prototype.beHurt = function(result) {
        if (true == this.isDead) return;
        if (this.shieldImmune > 0) {
          this.shieldImmune = 0;
          this.node.emit("IMMUNE_BREA_BROKEN");
          return;
        }
        var damage = result.damage;
        if (this.shield > 0) {
          this.shield -= damage;
          damage = 0;
          if (this.shield < 0) {
            this.shield = 0;
            damage = -this.shield;
            this.node.emit("SHIELD_BREA_BROKEN");
          }
        }
        this.hp -= damage;
        if (this.hp <= 0) {
          this.hp = 0;
          this.dead();
        }
        this.lastHurtDirection.set(result.direction);
        null != this.config.hit && "" != this.config.hit && EffectManager_1.default.inst.addEffect(this.config.hit, this.node, cc.v2(this.node.x, this.node.y), result.direction);
        EffectManager_1.default.inst.addEffect(result.isCirt ? "CirtHurtPopup" : "NormalHurtPopup", this.node, cc.v2(this.node.x, this.node.y), {
          damage: damage
        }, GamaManager_1.default.inst.numberLayer);
      };
      Character.prototype.hit = function(target) {};
      Character.prototype.heal = function(value) {
        this.hp += value;
        this.hp = Math.min(this.hp, this.getProperty("maxHp"));
      };
      Character.prototype.addShield = function(value) {
        this.shield += value;
        this.node.emit("ADD_SHIELD");
      };
      Character.prototype.addImmune = function() {
        this.shieldImmune = 1;
        this.node.emit("ADD_IMMUNE");
      };
      Character.prototype.dead = function() {
        this.isDead = true;
        this.deadRemove();
      };
      Character.prototype.deadRemove = function() {
        var _this = this;
        this.unitAction.playAction("Dead");
        CollisitionManager_1.default.inst.removeBody(this);
        if (null != this.config.deadEffect && "" != this.config.deadEffect) {
          this.node.children[0].active = false;
          EffectManager_1.default.inst.addEffect("Effect_Dead_" + this.config.prefab, this.node, cc.v2(this.node.x, this.node.y));
        }
        null != this.config.deadSound && "" != this.config.deadSound && AudioManager_1.default.inst.playSFX("Sound/" + this.config.deadSound);
        this.scheduleOnce(function() {
          return _this.node.destroy();
        }, 2);
      };
      Character.prototype.getBuffById = function(id) {
        for (var i = 0; i < this.buffs.length; i++) {
          var buff = this.buffs[i];
          if (buff.config.id == id) return buff;
        }
        return null;
      };
      Character.prototype.addBuff = function(id, addStack) {
        void 0 === addStack && (addStack = 1);
        var buff = this.getBuffById(id);
        var config = ConfigManager_1.default.getBuffConfig(id);
        if (null == config) {
          console.error("no find buff ", id);
          return;
        }
        var modStack = Math.min(addStack, config.maxStack);
        var toRemove = false;
        if (buff) {
          buff.duration = true == buff.config.durationSetTo ? buff.duration : buff.duration + buff.duration;
          var afterAdd = buff.stack + modStack;
          modStack = afterAdd >= buff.config.maxStack ? buff.config.maxStack - buff.stack : afterAdd <= 0 ? 0 - buff.stack : modStack;
          buff.stack += modStack;
          toRemove = buff.stack <= 0;
        } else {
          var buffClass = BuffTable_1.BuffTable[config.class];
          buff = buffClass ? new buffClass(this.node, config, addStack) : new BuffObj_1.default(this.node, config, addStack);
          this.buffs.push(buff);
          this.buffs.sort(function(a, b) {
            return a.config.priority - b.config.priority;
          });
        }
        false == toRemove && buff.onAdd(modStack);
      };
      Character.prototype.removeBuff = function(id) {
        for (var i = 0; i < this.buffs.length; i++) {
          var buff = this.buffs[i];
          if (buff.config.id == id) {
            buff.onRemoved();
            this.buffs.splice(i, 1);
            return;
          }
        }
      };
      Character.prototype.getProperty = function(name) {
        var _a;
        var value = this._realPropertyList[name];
        if (value) return this._realPropertyList[name];
        return null !== (_a = this[name]) && void 0 !== _a ? _a : 0;
      };
      Character.prototype.updateReadProperty = function(name) {
        var _a;
        this._realPropertyList[name] = this._propertyModifier.updateProperty(name, null !== (_a = this[name]) && void 0 !== _a ? _a : 0);
        "maxHp" == name && (this._realPropertyList[name] = Math.floor(this._realPropertyList[name]));
      };
      Character.prototype.addBuffProperty = function(name) {
        var provider = [];
        for (var _i = 1; _i < arguments.length; _i++) provider[_i - 1] = arguments[_i];
        for (var i = 0; i < provider.length; i++) this._propertyModifier.addProvider(provider[i]);
        this.updateReadProperty(name);
      };
      Character.prototype.removeBuffProperty = function(name) {
        var provider = [];
        for (var _i = 1; _i < arguments.length; _i++) provider[_i - 1] = arguments[_i];
        for (var i = 0; i < provider.length; i++) this._propertyModifier.removeProvider(provider[i]);
        this.updateReadProperty(name);
      };
      Character.prototype.getShape = function() {
        var aabb = new AABB_1.default();
        this.body.convertToWorldSpaceAR(cc.Vec2.ZERO, aabb.center);
        aabb.halfExtents.x = this.body.width / 2;
        aabb.halfExtents.y = this.body.height / 2;
        return aabb;
      };
      Character = __decorate([ ccclass ], Character);
      return Character;
    }(FixComponent_1.default);
    exports.default = Character;
    cc._RF.pop();
  }, {
    "../../ConfigManager": "ConfigManager",
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../../tools/Gizmos": "Gizmos",
    "../../tools/objects/AABB": "AABB",
    "../collision/Collision": "Collision",
    "../designer/table/BuffTable": "BuffTable",
    "../manager/AudioManager": "AudioManager",
    "../manager/CollisitionManager": "CollisitionManager",
    "../manager/EffectManager": "EffectManager",
    "../manager/GamaManager": "GamaManager",
    "../structs/PropertyModifier": "PropertyModifier",
    "../structs/battle/buff/BuffObj": "BuffObj",
    "../unit/UnitMovement": "UnitMovement",
    "../unit/action/UnitAction": "UnitAction",
    "./Behavior": "Behavior",
    "./CharacterActionConsumer": "CharacterActionConsumer"
  } ],
  CircleCollision: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61b11MXPi1H6Zt9JCxWi/df", "CircleCollision");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Circle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75842u6FmNONLJye8Az3JwD", "Circle");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Circle = function() {
      function Circle() {
        this.type = cc.geomUtils.enums.SHAPE_SPHERE;
        this.center = new cc.Vec2();
        this.radius = 0;
      }
      return Circle;
    }();
    exports.default = Circle;
    cc._RF.pop();
  }, {} ],
  Collision: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "870adl20udLiKRopvnW2u+i", "Collision");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Collision = function(_super) {
      __extends(Collision, _super);
      function Collision() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Collision.prototype.draw = function() {};
      Collision = __decorate([ ccclass ], Collision);
      return Collision;
    }(cc.Component);
    exports.default = Collision;
    cc._RF.pop();
  }, {} ],
  CollisitionManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6e8bcMZ01IuYOzoD0fbvaK", "CollisitionManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Obb_1 = require("../../tools/objects/Obb");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var CollisitionManager = function(_super) {
      __extends(CollisitionManager, _super);
      function CollisitionManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._bodyMap = {};
        return _this;
      }
      CollisitionManager_1 = CollisitionManager;
      Object.defineProperty(CollisitionManager, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      CollisitionManager.prototype.onLoad = function() {
        CollisitionManager_1._inst = this;
        this[cc.geomUtils.enums.SHAPE_AABB | cc.geomUtils.enums.SHAPE_AABB] = this.aabb2aabb;
        this[cc.geomUtils.enums.SHAPE_AABB | cc.geomUtils.enums.SHAPE_OBB] = this.aabb2obb;
        this[cc.geomUtils.enums.SHAPE_OBB | cc.geomUtils.enums.SHAPE_OBB] = this.obb2obb;
        this[cc.geomUtils.enums.SHAPE_SPHERE | cc.geomUtils.enums.SHAPE_AABB] = this.circle2aabb;
      };
      CollisitionManager.prototype.aabb2aabb = function(box0, box1) {
        if (box0.maxX < box1.minX || box0.minX > box1.maxX) return false;
        if (box0.maxY < box1.minY || box0.minY > box1.maxY) return false;
        return true;
      };
      CollisitionManager.prototype.obb2obb = function(box0, box1) {
        var A0 = box0.axis0;
        var A1 = box0.axis1;
        var B0 = box1.axis0;
        var B1 = box1.axis1;
        var EA0 = box0.halfExtents.x;
        var EA1 = box0.halfExtents.y;
        var EB0 = box1.halfExtents.x;
        var EB1 = box1.halfExtents.y;
        var D = box1.center.sub(box0.center);
        var AbsAdB00, AbsAdB01, AbsAdB10, AbsAdB11;
        var AbsAdD, RSum;
        AbsAdB00 = Math.abs(A0.dot(B0));
        AbsAdB01 = Math.abs(A0.dot(B1));
        AbsAdD = Math.abs(A0.dot(D));
        RSum = EA0 + EB0 * AbsAdB00 + EB1 * AbsAdB01;
        if (AbsAdD > RSum) return false;
        AbsAdB10 = Math.abs(A1.dot(B0));
        AbsAdB11 = Math.abs(A1.dot(B1));
        AbsAdD = Math.abs(A1.dot(D));
        RSum = EA1 + EB0 * AbsAdB10 + EB1 * AbsAdB11;
        if (AbsAdD > RSum) return false;
        AbsAdD = Math.abs(B0.dot(D));
        RSum = EB0 + EA0 * AbsAdB00 + EA1 * AbsAdB10;
        if (AbsAdD > RSum) return false;
        AbsAdD = Math.abs(B1.dot(D));
        RSum = EB1 + EA0 * AbsAdB01 + EA1 * AbsAdB11;
        if (AbsAdD > RSum) return false;
        return true;
      };
      CollisitionManager.prototype.aabb2obb = function(aabb, obb2) {
        var obb1 = new Obb_1.default();
        obb1.center.set(aabb.center);
        obb1.halfExtents.set(aabb.halfExtents);
        obb1.axis0.set(cc.Vec2.RIGHT);
        obb1.axis1.set(cc.Vec2.UP);
        return this.obb2obb(obb1, obb2);
      };
      CollisitionManager.prototype.circle2aabb = function(circle, box) {
        var distSquared = 0;
        var centerCoord = 0;
        var delta = 0;
        centerCoord = circle.center.x;
        if (centerCoord < box.minX) {
          delta = centerCoord - box.minX;
          distSquared += delta * delta;
        } else if (centerCoord > box.maxX) {
          delta = centerCoord - box.maxX;
          distSquared += delta * delta;
        }
        centerCoord = circle.center.y;
        if (centerCoord < box.minY) {
          delta = centerCoord - box.minY;
          distSquared += delta * delta;
        } else if (centerCoord > box.maxY) {
          delta = centerCoord - box.maxY;
          distSquared += delta * delta;
        }
        return distSquared <= circle.radius * circle.radius;
      };
      CollisitionManager.prototype.addBody = function(body) {
        var list = this._bodyMap[body.group];
        if (null == list) {
          list = [];
          this._bodyMap[body.group] = list;
        }
        list.includes(body) || list.push(body);
      };
      CollisitionManager.prototype.removeBody = function(body) {
        var list = this._bodyMap[body.group];
        if (null == list) return;
        var index = list.indexOf(body);
        -1 != index && list.splice(index, 1);
      };
      CollisitionManager.prototype.collisition = function(collision, group) {
        return this.collisitionByShape(collision.getShape(), group);
      };
      CollisitionManager.prototype.check = function(shape1, shape2) {
        var type1 = shape1.type;
        var type2 = shape2.type;
        var key = type1 | type2;
        var func = this[key].bind(this);
        return type1 < type2 ? func(shape1, shape2) : func(shape2, shape1);
      };
      CollisitionManager.prototype.collisitionByShape = function(shape, group) {
        var list = this._bodyMap[group];
        if (null == list) return [];
        var shape1 = shape;
        var result = [];
        for (var i = 0; i < list.length; i++) {
          var shape2 = list[i].getShape();
          var hit = this.check(shape1, shape2);
          hit && result.push(list[i].node);
        }
        return result;
      };
      var CollisitionManager_1;
      CollisitionManager = CollisitionManager_1 = __decorate([ ccclass ], CollisitionManager);
      return CollisitionManager;
    }(cc.Component);
    exports.default = CollisitionManager;
    cc._RF.pop();
  }, {
    "../../tools/objects/Obb": "Obb"
  } ],
  Common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50741XyLllMFLPp3iHvyV3u", "Common");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Common = function() {
      function Common() {}
      Common.createPrefab_csryw = function(prefab, type, parent) {
        var node = cc.instantiate(prefab);
        parent ? parent.addChild(node) : cc.director.getScene().getChildByName("Canvas").addChild(node);
        var src = node.getComponent(type);
        return src;
      };
      Common.loadSpriteFrame = function(bundle, path, callback) {
        var subres = cc.assetManager.getBundle(bundle);
        subres && subres.load(path, cc.SpriteFrame, function(err, asset) {
          if (err) {
            console.log("\u52a0\u8f7dSpriteFrame\u9519\u8bef>:", err);
            return;
          }
          callback && callback(asset);
        });
      };
      return Common;
    }();
    exports.default = Common;
    cc._RF.pop();
  }, {} ],
  ConfigManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c62e8fInzpMbLf3aCBfG92l", "ConfigManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameConfig_1 = require("./battle/structs/GameConfig");
    var ConfigManager = function() {
      function ConfigManager() {}
      ConfigManager.loadConfigs = function(callback) {
        var _this = this;
        var self = this;
        var p1 = new Promise(function(resove) {
          self.loadJson(self.basePath + "CharacterConfig.json", function(jsonAsset) {
            _this.characterConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p2 = new Promise(function(resove) {
          self.loadJson(self.basePath + "CharacterLevelConfig.json", function(jsonAsset) {
            _this.characterLevelConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p3 = new Promise(function(resove) {
          self.loadJson(self.basePath + "EndlessConfig.json", function(jsonAsset) {
            _this.endlessConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p4 = new Promise(function(resove) {
          self.loadJson(self.basePath + "TcoConfig.json", function(jsonAsset) {
            _this.tcoConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p5 = new Promise(function(resove) {
          self.loadJson(self.basePath + "BuffConfig.json", function(jsonAsset) {
            _this.buffConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p6 = new Promise(function(resove) {
          self.loadJson(self.basePath + "GameConfig.json", function(jsonAsset) {
            _this.gameConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p7 = new Promise(function(resove) {
          self.loadJson(self.basePath + "WeaponConfig.json", function(jsonAsset) {
            _this.weaponConfig = jsonAsset.json;
            resove(null);
          });
        });
        var p8 = new Promise(function(resove) {
          self.loadJson(self.basePath + "UltSkillConfig.json", function(jsonAsset) {
            _this.ultSkillConfig = jsonAsset.json;
            resove(null);
          });
        });
        Promise.all([ p1, p2, p3, p4, p5, p6, p7, p8 ]).then(function() {
          callback && callback();
        });
      };
      ConfigManager.loadJson = function(path, callback) {
        this.loadLocal ? this.loadLocalJson(path, callback) : cc.assetManager.loadRemote(path, function(err, asset) {
          callback && callback(asset);
        });
      };
      ConfigManager.loadLocalJson = function(path, callback) {
        path = path.replace(this.basePath, "");
        path = path.replace(".json", "");
        cc.resources.load(path, function(err, asset) {
          callback && callback(asset);
        });
      };
      ConfigManager.loadEndlessConfig = function(path, callback) {
        var _this = this;
        cc.assetManager.loadRemote(path, function(err, asset) {
          _this.endlessConfig.length = 0;
          var json = asset.json;
          for (var i = 0; i < json.length; i++) _this.endlessConfig.push(json[i]);
          callback && callback();
        });
      };
      ConfigManager.loadCharacterConfig = function(path, callback) {
        var _this = this;
        cc.assetManager.loadRemote(path, function(err, asset) {
          var character = {};
          var json = asset.json;
          for (var key in json) character[key] = json[key];
          _this.characterConfig = character;
          callback && callback();
        });
      };
      ConfigManager.getTcoInfoById = function(id) {
        return this.tcoConfig.find(function(item) {
          return item.id == id;
        });
      };
      ConfigManager.getTcoBuffList = function(id, level) {
        var info = this.getTcoInfoById(id);
        if (!info) return [];
        var data = info["level" + level];
        return "" == data ? [] : data.split("|");
      };
      ConfigManager.getBuffConfig = function(id) {
        return this.buffConfig[id];
      };
      ConfigManager.getWeaponConfig = function(id) {
        return this.weaponConfig.find(function(item) {
          return item.id == id;
        });
      };
      ConfigManager.getActionEffectConfig = function(key) {
        return null;
      };
      ConfigManager.loadLocal = false;
      ConfigManager.basePath = "https://oss.renyouwangluo.cn/qgdbl/json/";
      ConfigManager.endlessConfig = [];
      ConfigManager.characterConfig = {};
      ConfigManager.characterLevelConfig = [];
      ConfigManager.tcoConfig = [];
      ConfigManager.buffConfig = {};
      ConfigManager.gameConfig = new GameConfig_1.default();
      ConfigManager.weaponConfig = [];
      ConfigManager.ultSkillConfig = {};
      return ConfigManager;
    }();
    exports.default = ConfigManager;
    cc._RF.pop();
  }, {
    "./battle/structs/GameConfig": "GameConfig"
  } ],
  DamageInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e244cjXaT9Bz72knVCasbZa", "DamageInfo");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DamageResult = void 0;
    var Character_1 = require("../../character/Character");
    var DamageInfo = function() {
      function DamageInfo(attacker, defender, tags) {
        void 0 === tags && (tags = []);
        this.attacker = attacker;
        this.defender = defender;
        this.tags = tags;
        this.direction = cc.v2(attacker.x - defender.x, attacker.y - defender.y);
        this.direction.normalizeSelf();
      }
      DamageInfo.prototype.isHeal = function() {
        return false;
      };
      DamageInfo.prototype.DamageValue = function() {
        var attackerCharacter = this.attacker.getComponent(Character_1.default);
        return attackerCharacter.attack;
      };
      return DamageInfo;
    }();
    exports.default = DamageInfo;
    var DamageResult = function() {
      function DamageResult(damage, isCirt, direction) {
        this.isCirt = isCirt;
        this.damage = damage;
        this.direction = direction;
      }
      return DamageResult;
    }();
    exports.DamageResult = DamageResult;
    cc._RF.pop();
  }, {
    "../../character/Character": "Character"
  } ],
  DamagePopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5da9bUWGbNCWL0oZ9tJs677", "DamagePopup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleEffect_1 = require("../battle/effect/BattleEffect");
    var Utils_1 = require("./Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DamagePopup = function(_super) {
      __extends(DamagePopup, _super);
      function DamagePopup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.randomPos = new cc.Vec2();
        return _this;
      }
      DamagePopup.prototype.init = function(data) {
        this.label.string = data.damage.toString();
        this.label.node.x += Utils_1.default.random(-this.randomPos.x, this.randomPos.x);
        this.label.node.y += Utils_1.default.random(-this.randomPos.y, this.randomPos.y);
        this.node.zIndex = 999;
      };
      __decorate([ property(cc.Label) ], DamagePopup.prototype, "label", void 0);
      __decorate([ property(cc.Vec2) ], DamagePopup.prototype, "randomPos", void 0);
      DamagePopup = __decorate([ ccclass ], DamagePopup);
      return DamagePopup;
    }(BattleEffect_1.default);
    exports.default = DamagePopup;
    cc._RF.pop();
  }, {
    "../battle/effect/BattleEffect": "BattleEffect",
    "./Utils": "Utils"
  } ],
  DateUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "553a9c8nklAvIKumN8bOwCk", "DateUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DateUtils = void 0;
    var DateUtils = function() {
      function DateUtils() {}
      DateUtils.getNowTime_csryw = function() {
        return new Date().getTime();
      };
      DateUtils.formatTime2_csryw = function(time) {
        var str = "";
        var m = time / 60;
        m = parseInt(m + "");
        var s = time - 60 * m;
        s = parseInt(s + "");
        str += m > 9 ? m + "\u5206" : "0" + m + "\u5206";
        str += s > 9 ? s + "\u79d2" : "0" + s + "\u79d2";
        return str;
      };
      DateUtils.formatTime3_csryw = function(time) {
        var str = "";
        var m = time / 60;
        m = parseInt(m + "");
        var s = time - 60 * m;
        s = parseInt(s + "");
        str += m > 9 ? m + ":" : "0" + m + ":";
        str += s > 9 ? s : "0" + s;
        return str;
      };
      DateUtils.formatTime_csryw = function(time) {
        var str = "";
        var h = time / 3600;
        h = parseInt(h + "");
        var m = (time - 3600 * h) / 60;
        m = parseInt(m + "");
        var s = time - 3600 * h - 60 * m;
        s = parseInt(s + "");
        h > 0 && (str += h + ":");
        str += m > 9 ? m + ":" : "0" + m + ":";
        str += s > 9 ? s + "" : "0" + s;
        return str;
      };
      DateUtils.millisecondsToDate_csryw = function(time, fmt) {
        var d = new Date(time);
        var o = {
          "M+": d.getMonth() + 1,
          "d+": d.getDate(),
          "h+": d.getHours(),
          "H+": d.getHours(),
          "m+": d.getMinutes(),
          "s+": d.getSeconds(),
          "q+": Math.floor((d.getMonth() + 3) / 3),
          S: d.getMilliseconds()
        };
        var week = {
          0: "\u65e5",
          1: "\u4e00",
          2: "\u4e8c",
          3: "\u4e09",
          4: "\u56db",
          5: "\u4e94",
          6: "\u516d"
        };
        /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length)));
        /(E+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468" : "") + week[d.getDay() + ""]));
        for (var k in o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };
      DateUtils.convertDateFromString_csryw = function(dateString) {
        if (dateString) {
          var arrData = dateString.split(" ");
          var sdate = arrData[0].split("/");
          var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
          return date;
        }
      };
      DateUtils.getMonTimeByNowTime_csryw = function() {
        var now = new Date();
        var day = now.getDay();
        0 == day && (day = 7);
        now.setHours(0, 0, 0, 0);
        var monDate = new Date(now.getTime() - 24 * (day - 1) * 60 * 60 * 1e3);
        var time = monDate.getTime();
        return time;
      };
      DateUtils.isSameDay_csryw = function(time1, time2) {
        void 0 === time2 && (time2 = Date.now());
        var t1 = Number(time1);
        var t2 = Number(time2);
        if (t1 && t2) {
          var date1 = new Date(t1);
          var date2 = new Date(t2);
          var tick1 = date1.setHours(0, 0, 0, 0);
          var tick2 = date2.setHours(0, 0, 0, 0);
          return tick1 == tick2;
        }
        return false;
      };
      DateUtils.getMonthWeek_csryw = function() {
        var nowDate = new Date();
        var aYear = nowDate.getFullYear();
        var bWeekDay = nowDate.getDay();
        var cDays = nowDate.getDate();
        var w = nowDate.getDay();
        var d = nowDate.getDate();
        return Math.ceil((d + 6 - w) / 7);
      };
      return DateUtils;
    }();
    exports.DateUtils = DateUtils;
    cc._RF.pop();
  }, {} ],
  DebugInfoMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d2f3IqZ7JJM78bv3EoAtkN", "DebugInfoMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppConfig_1 = require("../Config/AppConfig");
    var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
    var EventEnum_1 = require("../Event/EventEnum");
    var EventMgr_1 = require("../Event/EventMgr");
    var HttpUnit_1 = require("../NetWork/HttpUnit");
    var AppPlatform_1 = require("../Util/AppPlatform");
    var DateUtils_1 = require("../Util/DateUtils");
    var Utilit_1 = require("../Util/Utilit");
    var WudianMgr_1 = require("./WudianMgr");
    var DebugInfoMgr = function() {
      function DebugInfoMgr() {}
      DebugInfoMgr.setDebug_csryw = function() {
        var _this = this;
        if (1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().debuginfo_csryw) {
          this.isOpenDebug_csryw = true;
          EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_App_OnUpdateIpBlockState_csryw, function() {
            _this.isNetIpBlockState_csryw = true;
            if (_this.debugPanel_csryw.active) {
              _this.updateFrameInfo_csryw();
              _this.updateItem_csryw();
            }
          }, this);
          EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_PlatformLoginState_csryw, function(tab) {
            var state_csryw = tab.state;
            var info_csryw = tab.info;
            _this.addDebugInfo_csryw(info_csryw);
          }, this);
          EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_NetLoginState_csryw, function(tab) {
            var state_csryw = tab.state;
            var info_csryw = tab.info;
            _this.addDebugInfo_csryw(info_csryw);
          }, this);
          EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_NetUserDataState_csryw, function(tab) {
            var state_csryw = tab.state;
            var info_csryw = tab.info;
            _this.addDebugInfo_csryw(info_csryw);
          }, this);
          EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_Umeng_csryw, function(tab) {
            var event = tab.event;
            _this.debugUmengInfoList_csryw[event] ? _this.debugUmengInfoList_csryw[event] = _this.debugUmengInfoList_csryw[event] + 1 : _this.debugUmengInfoList_csryw[event] = 1;
            _this.updateItem_csryw();
          }, this);
          var sizeView = cc.view.getVisibleSize();
          var size = cc.view.getFrameSize();
          console.log("\u542f\u52a8\u4e86debug\u5c55\u793a");
          this.debugNode_csryw = new cc.Node();
          cc.game.addPersistRootNode(this.debugNode_csryw);
          this.debugNode_csryw.width = sizeView.width;
          this.debugNode_csryw.height = sizeView.height;
          this.debugNode_csryw.anchorX = 0;
          this.debugNode_csryw.anchorY = 0;
          this.debugNode_csryw.x = 0;
          this.debugNode_csryw.y = 0;
          var butSize_csryw_1 = cc.size(180, 120);
          var butNode_csryw_1 = this.createNode_csryw(this.debugNode_csryw, cc.v2(0, sizeView.height - butSize_csryw_1.height), cc.Color.WHITE);
          butNode_csryw_1.setContentSize(butSize_csryw_1);
          butNode_csryw_1.on(cc.Node.EventType.TOUCH_START, function(touch, event) {}, this);
          butNode_csryw_1["_touchListener"].onTouchBegan = function(touch, event) {
            var pos_csryw = butNode_csryw_1.convertToNodeSpaceAR(touch.getLocation());
            if (pos_csryw.x < 0 || pos_csryw.y < 0 || pos_csryw.x > butSize_csryw_1.width || pos_csryw.y > butSize_csryw_1.height) return;
            if (_this.isOpenStartClick_csryw) {
              if (!_this.debugPanel_csryw.active) {
                _this.updateFrameInfo_csryw();
                _this.updateItem_csryw();
                _this.debugPanel_csryw.active = true;
              }
            } else {
              var time_csryw = DateUtils_1.DateUtils.getNowTime_csryw();
              if (time_csryw - _this.clickTime_csryw <= 500) {
                _this.touchClickSum_csryw = _this.touchClickSum_csryw + 1;
                _this.touchClickSum_csryw > 10 && (_this.isOpenStartClick_csryw = true);
              } else _this.touchClickSum_csryw = 0;
              _this.clickTime_csryw = time_csryw;
            }
            return true;
          };
          butNode_csryw_1["_touchListener"].setSwallowTouches(false);
          var showSize_csryw = cc.size(.98 * sizeView.width, .7 * sizeView.height);
          this.debugPanel_csryw = this.createNode_csryw(this.debugNode_csryw, cc.v2((sizeView.width - showSize_csryw.width) / 2, (sizeView.height - showSize_csryw.height) / 2), cc.Color.WHITE, showSize_csryw);
          this.debugPanel_csryw.active = false;
          this.debugPanel_csryw.addComponent(cc.Button);
          var snode_csryw = this.createNode_csryw(this.debugPanel_csryw, cc.v2(0, 0), cc.Color.GRAY, showSize_csryw);
          this.scrollview_csryw = snode_csryw.addComponent(cc.ScrollView);
          this.scrollview_csryw.horizontal = false;
          this.scrollview_csryw.vertical = true;
          this.scrollview_csryw.inertia = true;
          this.scrollview_csryw.brake = .75;
          var viewMask_csryw = this.createNode_csryw(snode_csryw, cc.v2(0, 0), cc.Color.WHITE);
          viewMask_csryw.setContentSize(showSize_csryw);
          viewMask_csryw.addComponent(cc.Mask);
          viewMask_csryw.anchorY = 1;
          viewMask_csryw.y = showSize_csryw.height;
          this.content_csryw = this.createNode_csryw(viewMask_csryw, cc.v2(0, 0), cc.Color.GRAY, showSize_csryw);
          this.content_csryw.anchorY = 1;
          this.scrollview_csryw.content = this.content_csryw;
          this.createButton_csryw(this.debugPanel_csryw, cc.v2(0, showSize_csryw.height), "\u5173\u95ed", cc.color(255, 180, 180), cc.Color.RED, cc.size(100, 70), function() {
            _this.debugPanel_csryw.active = false;
          });
          this.createButton_csryw(this.debugPanel_csryw, cc.v2(showSize_csryw.width - 170, showSize_csryw.height), "\u6e05\u7406\u7f13\u5b58", cc.color(255, 180, 180), cc.Color.RED, cc.size(170, 70), function() {
            HttpUnit_1.default.saveGameData_csryw("{}", function(res) {
              1 == res.code ? console.log("\u5b58\u6863\u6210\u529f") : console.log("\u5b58\u6863\u5931\u8d25");
            }, function(res) {
              console.log("\u5b58\u6863\u5931\u8d25");
            });
            _this.showToast_csryw("\u6e05\u7406\u7528\u6237\u6570\u636e\uff0c\u5e76\u63d0\u4ea4\uff01\u8bf7\u91cd\u542f");
          });
          var cshowToastSize_csryw = cc.size(.9 * showSize_csryw.width, 100);
          this.showInfoNode_csryw = this.createNode_csryw(this.debugNode_csryw, cc.v2(sizeView.width / 2, sizeView.height / 2), cc.color(175, 100, 170), cshowToastSize_csryw);
          this.showInfoNode_csryw.anchorX = .5;
          this.showInfoNode_csryw.anchorY = .5;
          this.showInfoLabel_csryw = this.createLabel_csryw(this.showInfoNode_csryw, cc.v2(0, 0), "", cc.Color.RED).getComponent(cc.Label);
          this.showInfoLabel_csryw.node.anchorX = .5;
          this.showInfoLabel_csryw.node.anchorY = .5;
          this.showInfoNode_csryw.active = false;
        }
      };
      DebugInfoMgr.addDebugInfo_csryw = function(info) {
        this.isOpenDebug_csryw && this.debugInfoList_csryw.push(info);
      };
      DebugInfoMgr.updateFrameInfo_csryw = function() {
        var _this = this;
        this.debugFrameInfoList_csryw = [];
        var addVersion_csryw = function() {
          var cur_csryw = Utilit_1.default.checkVersions_csryw();
          var versionSwitch_csryw = "[]";
          versionSwitch_csryw = AppPlatform_1.default.is_TT_GAME_csryw() ? "ttcfg:<" + AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().ttcfg_csryw.ttversions_csryw + ">" : AppPlatform_1.default.is_OPPO_GAME_csryw() ? "oppocfg:<" + AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().oppocfg_csryw.oppoversions_csryw + ">" : AppPlatform_1.default.is_QQ_PLAY_csryw() ? "qqcfg:<" + AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.qqversions_csryw + ">" : AppPlatform_1.default.is_WECHAT_GAME_csryw() ? "vivocfg:<" + AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.vivoversions_csryw + ">" : "version:<" + AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().version_csryw + ">";
          var str_csryw = "\u6e38\u620f\u540d\u5b57:[" + AppConfig_1.default.GameName_csryw + "],gameid:[" + AppConfig_1.default.gameid_csryw + "]\n";
          str_csryw = str_csryw + AppConfig_1.default.ResServer_csryw + "\n";
          str_csryw = str_csryw + "\u672c\u5730\u7248\u672c\u53f7:[" + AppConfig_1.default.Versions_csryw + "]\n\u8fdc\u7aef\u7248\u672c\u53f7:[" + versionSwitch_csryw + "]\n\u7248\u672c\u6bd4\u8f83\u7ed3\u679c:" + (cur_csryw ? "true" : "false");
          _this.debugFrameInfoList_csryw.push(str_csryw);
        };
        var cwudian_csryw = function() {
          var mainSwitch_csryw = 1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
          var isOpenTime_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianTimeAvaliable_csryw;
          var ipnotBlock_csryw = WudianMgr_1.default.ryw_GetIpBlocked_csryw();
          var launchScene_csryw_csryw = AppPlatform_1.default.getLaunchOptionsSync_csryw().scene;
          if (AppPlatform_1.default.is_TT_GAME_csryw()) {
            mainSwitch_csryw = true;
            isOpenTime_csryw = true;
          }
          var noEnterBySearch_csryw = true;
          var wudianSceneList_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
          for (var index = 0; index < wudianSceneList_csryw.length; index++) {
            var wudianSceneValue_csryw = wudianSceneList_csryw[index];
            launchScene_csryw_csryw == wudianSceneValue_csryw && (noEnterBySearch_csryw = false);
          }
          var cwd_csryw = mainSwitch_csryw && noEnterBySearch_csryw && ipnotBlock_csryw && isOpenTime_csryw;
          var str = "ip\u5c4f\u853d\u63a5\u53e3\u8c03\u7528:" + (_this.isNetIpBlockState_csryw ? "\u6210\u529f" : "\u5931\u8d25") + "\n\u8bef\u70b9\u6700\u7ec8\u7ed3\u679c\uff1a[" + (cwd_csryw ? "\u6709" : "\u6ca1\u6709") + "]\n\u5f53\u524d\u573a\u666f\u503c:[" + launchScene_csryw_csryw + "]\nip\u6ca1\u6709\u5c4f\u853d:[" + (ipnotBlock_csryw ? "\u662f" : "\u4e0d\u662f") + "]\n\u573a\u666f\u6ca1\u6709\u5c4f\u853d:[" + (noEnterBySearch_csryw ? "\u662f" : "\u4e0d\u662f") + "]\n\u8bef\u70b9\u5f00\u5173:[" + (mainSwitch_csryw ? "\u6253\u5f00" : "\u5173\u95ed") + "],\n\u65f6\u95f4\u5f00\u5173:[" + (isOpenTime_csryw ? "\u6253\u5f00" : "\u5173\u95ed") + "]";
          _this.debugFrameInfoList_csryw.push(str);
        };
        addVersion_csryw();
        cwudian_csryw();
      };
      DebugInfoMgr.showToast_csryw = function(info) {
        var _this = this;
        cc.Tween.stopAllByTarget(this.showInfoNode_csryw);
        this.showInfoLabel_csryw.string = info;
        this.showInfoNode_csryw.active = true;
        this.showInfoNode_csryw.opacity = 0;
        this.showInfoNode_csryw.scale = .75;
        cc.tween(this.showInfoNode_csryw).to(.25, {
          opacity: 255,
          scale: 1
        }, {
          easing: "backOut"
        }).delay(2).call(function() {
          _this.showInfoNode_csryw.active = false;
        }).start();
      };
      DebugInfoMgr.updateItem_csryw = function() {
        var infoList = [];
        for (var index = 0; index < this.debugFrameInfoList_csryw.length; index++) {
          var element_csryw = this.debugFrameInfoList_csryw[index];
          infoList.push(element_csryw);
        }
        var umengInfo = "\u53cb\u76df\u7edf\u8ba1\u5f00\u59cb\uff1a\n";
        for (var key in this.debugUmengInfoList_csryw) if (Object.prototype.hasOwnProperty.call(this.debugUmengInfoList_csryw, key)) {
          var element = this.debugUmengInfoList_csryw[key];
          umengInfo = "\u4e8b\u4ef6\uff1a" + umengInfo + key + ",\u6b21\u6570: " + element + "\n";
        }
        umengInfo += "\u53cb\u76df\u7edf\u8ba1\u7ed3\u675f!";
        infoList.push(umengInfo);
        for (var index = 0; index < this.debugInfoList_csryw.length; index++) {
          var element_csryw = this.debugInfoList_csryw[index];
          infoList.push(element_csryw);
        }
        var sizeInfo = infoList.length;
        var sizeLabel = this.debugLabelList_csryw.length;
        var num = sizeInfo - sizeLabel;
        if (num > 0) for (var index = 0; index < num; index++) {
          var label = this.createLabel_csryw(this.content_csryw, cc.v2(0, 0), "", cc.Color.BLACK).getComponent(cc.Label);
          label.node.width = this.content_csryw.width;
          label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
          label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
          label.node.anchorY = 1;
          this.debugLabelList_csryw.push(label);
        }
        for (var index = 0; index < this.debugLabelList_csryw.length; index++) {
          var element_csryw = this.debugLabelList_csryw[index];
          element_csryw.node.active = false;
        }
        var maxHeight_csryw = 0;
        var temp_csryw = false;
        for (var index = 0; index < infoList.length; index++) {
          var element_csryw = infoList[index];
          var label = this.debugLabelList_csryw[index];
          label.string = element_csryw;
          label.node.y = -maxHeight_csryw;
          label.node.active = true;
          label["_forceUpdateRenderData"]();
          maxHeight_csryw = maxHeight_csryw + label.node.height + 5;
          if (temp_csryw) {
            temp_csryw = false;
            label.node.color = cc.color(0, 0, 0);
          } else {
            temp_csryw = true;
            label.node.color = cc.color(122, 22, 22);
          }
        }
        this.content_csryw.height = maxHeight_csryw;
      };
      DebugInfoMgr.createLabel_csryw = function(parent, pos, info, color) {
        var node = this.createNode_csryw(parent, pos, color);
        var label = node.addComponent(cc.Label);
        label.fontSize = 30;
        label.lineHeight = 32;
        label.string = info;
        return node;
      };
      DebugInfoMgr.createNode_csryw = function(parent, pos, color, size) {
        var node = new cc.Node();
        if (size) {
          node.setContentSize(size);
          node.addComponent(cc.Sprite).spriteFrame = this.createSpriteFrame_csryw(size);
        }
        node.color = color;
        parent.addChild(node);
        node.x = pos.x;
        node.y = pos.y;
        node.anchorX = 0;
        node.anchorY = 0;
        return node;
      };
      DebugInfoMgr.createButton_csryw = function(parent, pos, info, color, labelColor, size, listener) {
        var node = this.createNode_csryw(parent, pos, color, size);
        node.addComponent(cc.Button);
        node.color = color;
        listener && node.on("click", listener, this);
        this.createLabel_csryw(parent, pos, info, labelColor);
        return node;
      };
      DebugInfoMgr.createSpriteFrame_csryw = function(size) {
        var texture = new cc.Texture2D();
        var spriteFrame = new cc.SpriteFrame();
        var count = size.width * size.height * 4;
        var imgData = new Uint8Array(count);
        for (var j = 0; j < count; j += 4) {
          imgData[j] = 255;
          imgData[j + 1] = 255;
          imgData[j + 2] = 255;
          imgData[j + 3] = 255;
        }
        texture.initWithData(imgData, cc.Texture2D.PixelFormat.RGBA8888, size.width, size.height);
        spriteFrame.setTexture(texture);
        spriteFrame.setRect(cc.rect(0, 0, size.width, size.height));
        return spriteFrame;
      };
      DebugInfoMgr.debugNode_csryw = null;
      DebugInfoMgr.debugPanel_csryw = null;
      DebugInfoMgr.scrollview_csryw = null;
      DebugInfoMgr.content_csryw = null;
      DebugInfoMgr.debugInfoList_csryw = new Array();
      DebugInfoMgr.debugFrameInfoList_csryw = new Array();
      DebugInfoMgr.debugLabelList_csryw = new Array();
      DebugInfoMgr.debugUmengInfoList_csryw = {};
      DebugInfoMgr.showInfoNode_csryw = null;
      DebugInfoMgr.showInfoLabel_csryw = null;
      DebugInfoMgr.isOpenDebug_csryw = false;
      DebugInfoMgr.isOpenStartClick_csryw = false;
      DebugInfoMgr.touchClickSum_csryw = 0;
      DebugInfoMgr.clickTime_csryw = 0;
      DebugInfoMgr.isNetIpBlockState_csryw = false;
      return DebugInfoMgr;
    }();
    exports.default = DebugInfoMgr;
    cc._RF.pop();
  }, {
    "../Config/AppConfig": "AppConfig",
    "../Config/AppSwitchConfig": "AppSwitchConfig",
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "../NetWork/HttpUnit": "HttpUnit",
    "../Util/AppPlatform": "AppPlatform",
    "../Util/DateUtils": "DateUtils",
    "../Util/Utilit": "Utilit",
    "./WudianMgr": "WudianMgr"
  } ],
  DialogAddPowerAll: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "158fb5OPdlEDKaTlRD/TyZv", "DialogAddPowerAll");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var PhysicalPowerMgr_1 = require("../../Mgr/PhysicalPowerMgr");
    var DialogUIBase_1 = require("./DialogUIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogAddPowerAll = function(_super) {
      __extends(DialogAddPowerAll, _super);
      function DialogAddPowerAll() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
      }
      DialogAddPowerAll.prototype.initView_csryw = function() {
        var _this = this;
        _super.prototype.initView_csryw.call(this);
        this.onClick(this.childNode("butLeft", this.showNode), function() {
          _this.closeDialog();
        }, this);
        var butRight = this.childNode("butRight", this.showNode);
        this.label = this.child(butRight, "label", cc.Label);
        this.onClick(butRight, function() {
          TTAPI_1.default.showRewardedVideoAd_csryw("\u65e0\u7ebf\u4f53\u529b", function(finish) {
            if (finish) {
              var num = PhysicalPowerMgr_1.default.getPhyVideoAllNum();
              num += 1;
              if (num >= 3) {
                num = 0;
                PhysicalPowerMgr_1.default.setPhyVideoAllNum(num);
                PhysicalPowerMgr_1.default.addNewPhysicalAll();
                _this.closeDialog(true);
              } else {
                PhysicalPowerMgr_1.default.setPhyVideoAllNum(num);
                _this.updateVideoNum();
              }
            }
          }, function() {});
        }, this);
        this.updateVideoNum();
      };
      DialogAddPowerAll.prototype.updateVideoNum = function() {
        this.label.string = PhysicalPowerMgr_1.default.getPhyVideoAllNum() + "/3";
      };
      DialogAddPowerAll = __decorate([ ccclass ], DialogAddPowerAll);
      return DialogAddPowerAll;
    }(DialogUIBase_1.default);
    exports.default = DialogAddPowerAll;
    cc._RF.pop();
  }, {
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../../Mgr/PhysicalPowerMgr": "PhysicalPowerMgr",
    "./DialogUIBase": "DialogUIBase"
  } ],
  DialogAddPower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51ef57GSeRLcrzbr5MPSyFo", "DialogAddPower");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var GameMgr_1 = require("../../Mgr/GameMgr");
    var PhysicalPowerMgr_1 = require("../../Mgr/PhysicalPowerMgr");
    var DialogUIBase_1 = require("./DialogUIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogAddPowerUI = function(_super) {
      __extends(DialogAddPowerUI, _super);
      function DialogAddPowerUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DialogAddPowerUI.prototype.initView_csryw = function() {
        var _this = this;
        _super.prototype.initView_csryw.call(this);
        this.onClick(this.childNode("butLeft", this.showNode), function() {
          _this.closeDialog();
        }, this);
        this.onClick(this.childNode("butRight", this.showNode), function() {
          TTAPI_1.default.showRewardedVideoAd_csryw("\u8865\u5145\u4f53\u529b", function(finish) {
            if (finish) {
              PhysicalPowerMgr_1.default.setPhysicalNum(3);
              GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
              _this.closeDialog(true);
            }
          }, function() {});
        }, this);
      };
      DialogAddPowerUI = __decorate([ ccclass ], DialogAddPowerUI);
      return DialogAddPowerUI;
    }(DialogUIBase_1.default);
    exports.default = DialogAddPowerUI;
    cc._RF.pop();
  }, {
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../../Mgr/GameMgr": "GameMgr",
    "../../Mgr/PhysicalPowerMgr": "PhysicalPowerMgr",
    "./DialogUIBase": "DialogUIBase"
  } ],
  DialogLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da62cRX36FO47RxnGLVZx5L", "DialogLoading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMViewBase_1 = require("../../Base/FMViewBase");
    var AppPlatform_1 = require("../../Util/AppPlatform");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogLoading = function(_super) {
      __extends(DialogLoading, _super);
      function DialogLoading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        _this.labelInfo = null;
        _this.typeNode1 = null;
        _this.typeNode2 = null;
        _this.butLoad1 = null;
        _this.butVisitor1 = null;
        _this.butLoad2 = null;
        _this.EventEnumView_csryw = {
          ClickVisitor: "ClickVisitor",
          ClickLoad: "ClickLoad"
        };
        return _this;
      }
      DialogLoading.prototype.initView_csryw = function() {
        var _this = this;
        this.butLoad1.on("click", function() {
          _this.closeView();
          _this.emitListenerEvent_csryw(_this.EventEnumView_csryw.ClickLoad);
        }, this);
        this.butVisitor1.on("click", function() {
          _this.closeView();
          _this.emitListenerEvent_csryw(_this.EventEnumView_csryw.ClickVisitor);
        }, this);
        this.butLoad2.on("click", function() {
          _this.closeView();
          _this.emitListenerEvent_csryw(_this.EventEnumView_csryw.ClickLoad);
        }, this);
        if (AppPlatform_1.default.is_Android_csryw() || AppPlatform_1.default.is_Iphone_csryw()) {
          this.typeNode1.active = false;
          this.typeNode2.active = true;
        } else {
          this.typeNode1.active = true;
          this.typeNode2.active = false;
        }
      };
      DialogLoading.prototype.openView = function(info) {
        this._initView_csryw();
        this.labelInfo.string = info;
        cc.Tween.stopAllByTarget(this.bgNode);
        this.bgNode.opacity = 0;
        this.bgNode.scale = .75;
        cc.tween(this.bgNode).to(.25, {
          opacity: 255,
          scale: 1
        }, {
          easing: "backOut"
        }).call(function() {}).start();
        this.node.active = true;
      };
      DialogLoading.prototype.closeView = function() {
        this.node.active = false;
      };
      DialogLoading.prototype.addEvent_csryw = function() {};
      DialogLoading.prototype.removeEvent_csryw = function() {};
      __decorate([ property({
        tooltip: "\u80cc\u666f\u56fe",
        type: cc.Node
      }) ], DialogLoading.prototype, "bgNode", void 0);
      __decorate([ property({
        tooltip: "\u9519\u8bef\u6587\u672c",
        type: cc.Label
      }) ], DialogLoading.prototype, "labelInfo", void 0);
      __decorate([ property({
        tooltip: "\u7b2c\u4e00\u79cd\u7c7b\u578b",
        type: cc.Node
      }) ], DialogLoading.prototype, "typeNode1", void 0);
      __decorate([ property({
        tooltip: "\u7b2c\u4e8c\u79cd\u7c7b\u578b",
        type: cc.Node
      }) ], DialogLoading.prototype, "typeNode2", void 0);
      __decorate([ property({
        tooltip: "\u7c7b\u578b1\u4e2d\u91cd\u65b0\u767b\u5f55",
        type: cc.Node
      }) ], DialogLoading.prototype, "butLoad1", void 0);
      __decorate([ property({
        tooltip: "\u7c7b\u578b1\u4e2d\u6e38\u5ba2\u6a21\u5f0f",
        type: cc.Node
      }) ], DialogLoading.prototype, "butVisitor1", void 0);
      __decorate([ property({
        tooltip: "\u7c7b\u578b2\u4e2d\u91cd\u65b0\u767b\u5f55",
        type: cc.Node
      }) ], DialogLoading.prototype, "butLoad2", void 0);
      DialogLoading = __decorate([ ccclass ], DialogLoading);
      return DialogLoading;
    }(FMViewBase_1.default);
    exports.default = DialogLoading;
    cc._RF.pop();
  }, {
    "../../Base/FMViewBase": "FMViewBase",
    "../../Util/AppPlatform": "AppPlatform"
  } ],
  DialogMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0d24ZWtl9PAoSgQxifrCRC", "DialogMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TcoView_1 = require("../../scripts/battle/view/TcoView");
    var DialogToast_1 = require("../SubResFrame/UI/DialogToast");
    var DialogUIBase_1 = require("../SubResFrame/UI/DialogUIBase");
    var ResSubMgr_1 = require("./ResSubMgr");
    var DialogMgr = function() {
      function DialogMgr() {}
      DialogMgr.openAddPowerDialog = function(listener, parentNode) {
        parentNode = parentNode || cc.director.getScene().getChildByName("Canvas");
        var prefab = ResSubMgr_1.ResSubMgr.getPrefabBySubFrame(ResSubMgr_1.EnumSubFrameRes.DialogAddPower);
        var node = cc.instantiate(prefab);
        parentNode.addChild(node, DialogMgr.DIALOG_INDEX);
        node.getComponent(DialogUIBase_1.default).openDialog(listener);
      };
      DialogMgr.openAddPowerAllDialog = function(listener, parentNode) {
        parentNode = parentNode || cc.director.getScene().getChildByName("Canvas");
        var prefab = ResSubMgr_1.ResSubMgr.getPrefabBySubFrame(ResSubMgr_1.EnumSubFrameRes.DialogAddPowerAll);
        var node = cc.instantiate(prefab);
        parentNode.addChild(node, DialogMgr.DIALOG_INDEX);
        node.getComponent(DialogUIBase_1.default).openDialog(listener);
      };
      DialogMgr.openSettingDialog = function(listener, parentNode, group) {
        void 0 === group && (group = "default");
        parentNode = parentNode || cc.director.getScene().getChildByName("Canvas");
        var prefab = ResSubMgr_1.ResSubMgr.getPrefabBySubFrame(ResSubMgr_1.EnumSubFrameRes.DialogSetting);
        var node = cc.instantiate(prefab);
        parentNode.addChild(node, DialogMgr.DIALOG_INDEX);
        node.getComponent(DialogUIBase_1.default).openDialog(listener);
        node.group = group;
      };
      DialogMgr.openToast = function(msg, group) {
        var parentNode = cc.director.getScene().getChildByName("Canvas");
        var prefab = ResSubMgr_1.ResSubMgr.getPrefabBySubFrame(ResSubMgr_1.EnumSubFrameRes.DialogToast);
        var node = cc.instantiate(prefab);
        parentNode.addChild(node, DialogMgr.TOAST_INDEX);
        node.getComponent(DialogToast_1.default).openTip(msg);
        group && (node.group = group);
      };
      DialogMgr.openSettlement = function(parent) {
        var prefab = ResSubMgr_1.ResSubMgr.getPrefab("subResGame", "SettlementView");
        var node = cc.instantiate(prefab);
        node.parent = parent;
      };
      DialogMgr.openTco = function(parent, options, callback) {
        var prefab = ResSubMgr_1.ResSubMgr.getPrefab("subResGame", "TcoView");
        var node = cc.instantiate(prefab);
        node.parent = parent;
        node.getComponent(TcoView_1.default).init(options, callback);
      };
      DialogMgr.openResurrection = function(parent) {
        var prefab = ResSubMgr_1.ResSubMgr.getPrefab("subResGame", "ResurrectionView");
        var node = cc.instantiate(prefab);
        node.parent = parent;
      };
      DialogMgr.openWeapon = function(parent) {
        var prefab = ResSubMgr_1.ResSubMgr.getPrefab("subResGame", "WeaponView");
        var node = cc.instantiate(prefab);
        node.parent = parent;
      };
      DialogMgr.DIALOG_INDEX = 10;
      DialogMgr.TOAST_INDEX = 11;
      return DialogMgr;
    }();
    exports.default = DialogMgr;
    cc._RF.pop();
  }, {
    "../../scripts/battle/view/TcoView": "TcoView",
    "../SubResFrame/UI/DialogToast": "DialogToast",
    "../SubResFrame/UI/DialogUIBase": "DialogUIBase",
    "./ResSubMgr": "ResSubMgr"
  } ],
  DialogSetting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49f4bQoFEtGNKvEW7uVu7JQ", "DialogSetting");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_1 = require("../../../scripts/battle/manager/AudioManager");
    var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
    var DialogUIBase_1 = require("./DialogUIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogSetting = function(_super) {
      __extends(DialogSetting, _super);
      function DialogSetting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.EventEnumView_csryw = {};
        return _this;
      }
      DialogSetting.prototype.initView_csryw = function() {
        var _this = this;
        _super.prototype.initView_csryw.call(this);
        var bg = this.childNode("bg");
        bg.on("click", function() {
          _this.closeDialog();
        }, this);
        this.btnBgm = this.childNode("butBgm", this.showNode);
        this.butSound = this.childNode("butSound", this.showNode);
        this.butVibrat = this.childNode("butVibrat", this.showNode);
        this.onClick(this.butSound, function() {
          AudioManager_1.default.inst.sfxEnable = !AudioManager_1.default.inst.sfxEnable;
          _this.updateShowSound();
        }, this);
        this.onClick(this.btnBgm, function() {
          AudioManager_1.default.inst.bgmEnable = !AudioManager_1.default.inst.bgmEnable;
          AudioManager_1.default.inst.bgmEnable ? AudioManager_1.default.inst.resumBGM() : AudioManager_1.default.inst.pauseBGM();
          _this.updateShowSound();
        }, this);
        this.onClick(this.butVibrat, function() {
          VibrateMgr_1.default.isEnable_csryw = !VibrateMgr_1.default.isEnable_csryw;
          _this.updateShowVibrat();
        }, this);
        this.onClick(this.childNode("butClose", this.showNode), function() {
          _this.closeDialog(true);
        }, this);
        this.onClick(this.childNode("butClose2", this.showNode), function() {
          _this.closeDialog(false);
        }, this);
        this.updateShowSound();
        this.updateShowVibrat();
      };
      DialogSetting.prototype.updateBtn = function(btn, active) {
        this.childNode("open", btn).active = active;
        this.childNode("close", btn).active = !active;
      };
      DialogSetting.prototype.updateShowSound = function() {
        this.updateBtn(this.btnBgm, AudioManager_1.default.inst.bgmEnable);
        this.updateBtn(this.butSound, AudioManager_1.default.inst.sfxEnable);
      };
      DialogSetting.prototype.updateShowVibrat = function() {
        this.childNode("open", this.butVibrat).active = VibrateMgr_1.default.isEnable_csryw;
        this.childNode("close", this.butVibrat).active = !VibrateMgr_1.default.isEnable_csryw;
      };
      DialogSetting = __decorate([ ccclass ], DialogSetting);
      return DialogSetting;
    }(DialogUIBase_1.default);
    exports.default = DialogSetting;
    cc._RF.pop();
  }, {
    "../../../scripts/battle/manager/AudioManager": "AudioManager",
    "../../Mgr/VibrateMgr": "VibrateMgr",
    "./DialogUIBase": "DialogUIBase"
  } ],
  DialogToast: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e6958nwKZCgZMGAU/8C0b3", "DialogToast");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMComponentExtend_1 = require("../../Base/FMComponentExtend");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogToast = function(_super) {
      __extends(DialogToast, _super);
      function DialogToast() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.EventEnumView_csryw = {};
        _this.label = null;
        return _this;
      }
      DialogToast.prototype.initView_csryw = function() {
        this.label = this.child(this.node, "label", cc.Label);
      };
      DialogToast.prototype.openTip = function(msg) {
        this.__onInit_csryw();
        this.label.string = msg;
        var height = .25 * cc.winSize.height;
        this.node.opacity = 0;
        this.node.x = 0;
        this.node.y = height;
        var self = this;
        cc.tween(this.node).to(.5, {
          y: height + 150,
          opacity: 255
        }, {
          easing: cc.easing.cubicOut
        }).delay(2).to(.5, {
          y: height + 250,
          opacity: 0
        }, {
          easing: cc.easing.cubicOut
        }).call(function() {
          self.node.destroy();
        }).start();
      };
      DialogToast = __decorate([ ccclass ], DialogToast);
      return DialogToast;
    }(FMComponentExtend_1.default);
    exports.default = DialogToast;
    cc._RF.pop();
  }, {
    "../../Base/FMComponentExtend": "FMComponentExtend"
  } ],
  DialogUIBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b16f9zCpZBKWZiw5vyh4wQx", "DialogUIBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMComponentExtend_1 = require("../../Base/FMComponentExtend");
    var TweenScale_1 = require("../../Tween/TweenScale");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DialogUIBase = function(_super) {
      __extends(DialogUIBase, _super);
      function DialogUIBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.EventEnumView_csryw = {};
        _this.showNode = null;
        _this.tweenScale = null;
        _this.listener = null;
        return _this;
      }
      DialogUIBase.prototype.initView_csryw = function() {
        this.showNode = this.node.getChildByName("showNode");
        this.tweenScale = this.showNode.getComponent(TweenScale_1.default);
      };
      DialogUIBase.prototype.openDialog = function(listener) {
        this.listener = listener;
        this.__onInit_csryw();
        this.tweenScale.openAction();
      };
      DialogUIBase.prototype.closeDialog = function(data) {
        var _this = this;
        this.tweenScale.closeAction(handleFM_csryw(function() {
          callFM_csryw(_this.listener, true, data);
          _this.node.destroy();
        }, this));
      };
      DialogUIBase = __decorate([ ccclass ], DialogUIBase);
      return DialogUIBase;
    }(FMComponentExtend_1.default);
    exports.default = DialogUIBase;
    cc._RF.pop();
  }, {
    "../../Base/FMComponentExtend": "FMComponentExtend",
    "../../Tween/TweenScale": "TweenScale"
  } ],
  DistanceMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84828b0jqxEgbx5D7q1/GeO", "DistanceMove");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DistanceMove = function() {
      function DistanceMove(velocity, duration) {
        this.velocity = velocity;
        this.duration = duration;
        this.totalTime = duration;
      }
      Object.defineProperty(DistanceMove.prototype, "finished", {
        get: function() {
          return this.duration <= 1e-5;
        },
        enumerable: false,
        configurable: true
      });
      DistanceMove.prototype.updateMovement = function(time) {
        time >= this.duration ? this.duration = 0 : this.duration -= time;
        if (this.totalTime <= 0) return this.velocity;
        var value = this.duration / this.totalTime;
        value = Math.max(0, 1 - value);
        return this.velocity.div(this.totalTime);
      };
      return DistanceMove;
    }();
    exports.default = DistanceMove;
    cc._RF.pop();
  }, {} ],
  EffectManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66547+edeRM2KZDaGwEc1IO", "EffectManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AssetManager_1 = require("../../common/AssetManager");
    var BattleEffect_1 = require("../effect/BattleEffect");
    var ObjPool_1 = require("../../tools/ObjPool");
    var GamaManager_1 = require("./GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EffectManager = function(_super) {
      __extends(EffectManager, _super);
      function EffectManager() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EffectManager_1 = EffectManager;
      Object.defineProperty(EffectManager, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      EffectManager.prototype.onLoad = function() {
        EffectManager_1._inst = this;
      };
      EffectManager.prototype.onDestroy = function() {};
      EffectManager.prototype.loadPrefab = function(name, callBack) {
        var prefab = AssetManager_1.default.getPrefab(name);
        callBack && callBack(null, prefab);
      };
      EffectManager.prototype.addEffect = function(name, owner, position, data, parent) {
        var self = this;
        this.getObj(name, function(prefab) {
          if (null == prefab) return;
          var node = cc.instantiate(prefab);
          node.parent = null !== parent && void 0 !== parent ? parent : GamaManager_1.default.inst.effectLayer;
          node.setPosition(position);
          var effect = node.getComponent(BattleEffect_1.default);
          effect.prefab = name;
          effect.owner = owner;
          effect.init(data);
        });
      };
      var EffectManager_1;
      EffectManager = EffectManager_1 = __decorate([ ccclass ], EffectManager);
      return EffectManager;
    }(ObjPool_1.default);
    exports.default = EffectManager;
    cc._RF.pop();
  }, {
    "../../common/AssetManager": "AssetManager",
    "../../tools/ObjPool": "ObjPool",
    "../effect/BattleEffect": "BattleEffect",
    "./GamaManager": "GamaManager"
  } ],
  EndlessStage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "683c2RAgkZB4p9yYEr7MJqK", "EndlessStage");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EndlessInfo = exports.CharacterWeights = void 0;
    var CharacterWeights = function() {
      function CharacterWeights() {}
      return CharacterWeights;
    }();
    exports.CharacterWeights = CharacterWeights;
    var EndlessInfo = function() {
      function EndlessInfo(time, interval, count, total, monsters, weights) {
        this.time = 0;
        this.interval = 1;
        this.count = 1;
        this.total = 0;
        this.monsters = [];
        this.weights = [];
        this.time = time;
        this.interval = interval;
        this.count = count;
        this.total = total;
        this.monsters = monsters;
        this.weights = weights;
      }
      return EndlessInfo;
    }();
    exports.EndlessInfo = EndlessInfo;
    cc._RF.pop();
  }, {} ],
  EndlessTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f517aEyCRtE87jgTYV5UaUY", "EndlessTable");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EndlessTable = void 0;
    var EndlessStage_1 = require("../../structs/battle/EndlessStage");
    exports.EndlessTable = [ new EndlessStage_1.EndlessInfo(60, 10, 15, 20, [], [ {
      weights: 100,
      id: "xigua"
    }, {
      weights: 100,
      id: "caomei"
    }, {
      weights: 100,
      id: "chengzi"
    }, {
      weights: 100,
      id: "ganzhe"
    }, {
      weights: 100,
      id: "mangguo"
    }, {
      weights: 100,
      id: "yingtao"
    }, {
      weights: 20,
      id: "huolongguo"
    } ]) ];
    cc._RF.pop();
  }, {
    "../../structs/battle/EndlessStage": "EndlessStage"
  } ],
  EventEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94947oCpcdGZ6oeuKmdOGCo", "EventEnum");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ryw_Event = void 0;
    var ryw_Event;
    (function(ryw_Event) {
      ryw_Event[ryw_Event["None_csryw"] = 0] = "None_csryw";
      ryw_Event[ryw_Event["ryw_ADKRQ_ClickQuit_csryw"] = 400] = "ryw_ADKRQ_ClickQuit_csryw";
      ryw_Event[ryw_Event["ryw_Export3_Dismiss_csryw"] = 401] = "ryw_Export3_Dismiss_csryw";
      ryw_Event[ryw_Event["ryw_App_CloseFirstLoadingView_csryw"] = 500] = "ryw_App_CloseFirstLoadingView_csryw";
      ryw_Event[ryw_Event["ryw_AD_OnShareAdFail_csryw"] = 501] = "ryw_AD_OnShareAdFail_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnViewOpen_csryw"] = 600] = "ryw_Game_OnViewOpen_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnViewClose_csryw"] = 601] = "ryw_Game_OnViewClose_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnUserMoneyChange_csryw"] = 701] = "ryw_Game_OnUserMoneyChange_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnUserCrystalChange_csryw"] = 702] = "ryw_Game_OnUserCrystalChange_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnUserUnlockedStore_csryw"] = 703] = "ryw_Game_OnUserUnlockedStore_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnLevelStart_csryw"] = 1e3] = "ryw_Game_OnLevelStart_csryw";
      ryw_Event[ryw_Event["ryw_Game_OnLevelComplate_csryw"] = 1001] = "ryw_Game_OnLevelComplate_csryw";
      ryw_Event[ryw_Event["ryw_AD_WudianBanner_LoadComplete_csryw"] = 2217] = "ryw_AD_WudianBanner_LoadComplete_csryw";
      ryw_Event[ryw_Event["ryw_AD_WudianBanner_Show_csryw"] = 2218] = "ryw_AD_WudianBanner_Show_csryw";
      ryw_Event[ryw_Event["ryw_AD_WudianBanner_Hide_csryw"] = 2219] = "ryw_AD_WudianBanner_Hide_csryw";
      ryw_Event[ryw_Event["ryw_AD_WudianBanner_PreLoad_csryw"] = 2220] = "ryw_AD_WudianBanner_PreLoad_csryw";
      ryw_Event[ryw_Event["ryw_App_OnUpdateIpBlockState_csryw"] = 2221] = "ryw_App_OnUpdateIpBlockState_csryw";
      ryw_Event[ryw_Event["ryw_Umeng_csryw"] = 2230] = "ryw_Umeng_csryw";
      ryw_Event[ryw_Event["ryw_PlatformLoginState_csryw"] = 2997] = "ryw_PlatformLoginState_csryw";
      ryw_Event[ryw_Event["ryw_NetLoginState_csryw"] = 2998] = "ryw_NetLoginState_csryw";
      ryw_Event[ryw_Event["ryw_NetUserDataState_csryw"] = 2999] = "ryw_NetUserDataState_csryw";
      ryw_Event[ryw_Event["ryw_Video_Finish_csryw"] = 3e3] = "ryw_Video_Finish_csryw";
      ryw_Event[ryw_Event["ryw_Video_UnFinish_csryw"] = 3001] = "ryw_Video_UnFinish_csryw";
      ryw_Event[ryw_Event["ryw_Video_Error_csryw"] = 3002] = "ryw_Video_Error_csryw";
      ryw_Event[ryw_Event["ryw_SET_LIST_PARAM"] = 3003] = "ryw_SET_LIST_PARAM";
      ryw_Event[ryw_Event["updatePhysicalPower"] = 4e3] = "updatePhysicalPower";
      ryw_Event[ryw_Event["weaponRefresh"] = 1e4] = "weaponRefresh";
    })(ryw_Event = exports.ryw_Event || (exports.ryw_Event = {}));
    cc._RF.pop();
  }, {} ],
  EventMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8dfeJgdmJHo6btOQzfwZzs", "EventMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventMgr = function() {
      function EventMgr() {}
      EventMgr.emitEvent_csryw = function(name, arg1, arg2, arg3, arg4, arg5) {
        this.eventTarget_csryw.emit(name + "", arg1, arg2, arg3, arg4, arg5);
      };
      EventMgr.onEvent_csryw = function(name, callback, target) {
        this.eventTarget_csryw.on(name + "", callback, target);
      };
      EventMgr.onceEvent_csryw = function(name, callback, target) {
        this.eventTarget_csryw.once(name + "", callback, target);
      };
      EventMgr.offEvent_csryw = function(name, callback, target) {
        this.eventTarget_csryw.off(name + "", callback, target);
      };
      EventMgr.offTargetEvent_csryw = function(target) {
        this.eventTarget_csryw.targetOff(target);
      };
      EventMgr.eventTarget_csryw = new cc.EventTarget();
      return EventMgr;
    }();
    exports.default = EventMgr;
    cc._RF.pop();
  }, {} ],
  FMButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "063f2oeVtlKeav7jb4gZRiz", "FMButton");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FMButton = void 0;
    var SoundMgr_1 = require("../Mgr/SoundMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent;
    var FMButton = function(_super) {
      __extends(FMButton, _super);
      function FMButton() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FMButton.prototype.onLoad = function() {
        var but = this.node.getComponent(cc.Button);
        if (but.transition == cc.Button.Transition.NONE) {
          but.transition = cc.Button.Transition.SCALE;
          but.duration = .1;
          but.zoomScale = .9;
        }
        this.node.on("click", function() {
          SoundMgr_1.default.playSound_csryw("anniu");
        }, this);
      };
      FMButton = __decorate([ ccclass, requireComponent(cc.Button), disallowMultiple(), menu("FM\u7ec4\u4ef6/FMButton") ], FMButton);
      return FMButton;
    }(cc.Component);
    exports.FMButton = FMButton;
    cc._RF.pop();
  }, {
    "../Mgr/SoundMgr": "SoundMgr"
  } ],
  FMComponentExtend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "415e8HkD95B7aloMcGJWw9P", "FMComponentExtend");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMComponentExtend = function(_super) {
      __extends(FMComponentExtend, _super);
      function FMComponentExtend() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.__isInit_csryw = false;
        _this.EventEnumView_csryw = {};
        return _this;
      }
      FMComponentExtend.prototype.onLoad = function() {
        this.__onInit_csryw();
      };
      FMComponentExtend.prototype.childNode = function(childName, node) {
        var cnode = node || this.node;
        var childNode = cnode.getChildByName(childName);
        childNode || console.error("\u6ca1\u6709\u627e\u5230\u8282\u70b9 ", childName, cnode.name);
        return childNode;
      };
      FMComponentExtend.prototype.child = function(node, childName, type) {
        var childNode = node.getChildByName(childName);
        if (childNode) return childNode.getComponent(type);
        console.error("\u6ca1\u6709\u627e\u5230\u8282\u70b9 ", childName, node.name);
        return;
      };
      FMComponentExtend.prototype.onClick = function(node, callback, target) {
        return node.on("click", callback, target);
      };
      FMComponentExtend.prototype.__onInit_csryw = function() {
        if (!this.__isInit_csryw) {
          this.__isInit_csryw = true;
          this.initView_csryw();
        }
      };
      FMComponentExtend.prototype.onListenerEventView_csryw = function(listener) {
        this._listenerCallView_csryw = listener;
      };
      FMComponentExtend.prototype.emitListenerEvent_csryw = function(event, data, data2) {
        this._listenerCallView_csryw && callFM_csryw(this._listenerCallView_csryw, event, this, data, data2);
      };
      FMComponentExtend.prototype.isActiveView_csryw = function() {
        if (cc.isValid(this, true) && this.node.activeInHierarchy) return true;
        return false;
      };
      FMComponentExtend.prototype.onDestroy = function() {};
      return FMComponentExtend;
    }(cc.Component);
    exports.default = FMComponentExtend;
    cc._RF.pop();
  }, {} ],
  FMInterface: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "960ddPW6plCX7rTQuyZQoCo", "FMInterface");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.callFM_csryw = exports.handleFM_csryw = exports.FMListener = void 0;
    var FMListener = function() {
      function FMListener() {}
      return FMListener;
    }();
    exports.FMListener = FMListener;
    function handleFM_csryw(callback, target) {
      return {
        target: target,
        callback: callback
      };
    }
    exports.handleFM_csryw = handleFM_csryw;
    function callFM_csryw(inter) {
      var _a;
      var argArray = [];
      for (var _i = 1; _i < arguments.length; _i++) argArray[_i - 1] = arguments[_i];
      if (inter && inter.callback) return (_a = inter.callback).call.apply(_a, __spreadArrays([ inter.target ], argArray));
    }
    exports.callFM_csryw = callFM_csryw;
    window.FMListener = FMListener;
    window.handleFM_csryw = handleFM_csryw;
    window.callFM_csryw = callFM_csryw;
    cc._RF.pop();
  }, {} ],
  FMItemLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8482a+fXPVGpbazvKpZtGQW", "FMItemLayout");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMViewBase_1 = require("../Base/FMViewBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
    var FMItemLayout = function(_super) {
      __extends(FMItemLayout, _super);
      function FMItemLayout() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemChilds = [];
        _this.ad_tag_csryw = null;
        _this.itemIndex_csryw = 0;
        return _this;
      }
      FMItemLayout.prototype.setAdTag_csryw = function(tag) {
        this.ad_tag_csryw = tag;
      };
      FMItemLayout.prototype.addEvent_csryw = function() {};
      FMItemLayout.prototype.removeEvent_csryw = function() {};
      FMItemLayout.prototype.initView_csryw = function() {};
      FMItemLayout.prototype.setFMListenerUpdate_csryw = function(_listener) {
        this._fmListenerData_csryw = _listener;
      };
      FMItemLayout.prototype.setItemIndex_csryw = function(id) {
        this.itemIndex_csryw = id;
        if (this._fmListenerData_csryw) {
          var childSum = this.itemChilds.length;
          for (var index = 0; index < childSum; index++) {
            var sum = this.itemIndex_csryw * childSum + index;
            var data = callFM_csryw(this._fmListenerData_csryw, sum);
            this.updateDataItemByIndex_csryw(data, index);
          }
        }
      };
      FMItemLayout.prototype.updateDataItemByIndex_csryw = function(data, childIndex) {
        LogUtils.log_csryw("FMItemLayout -> updateDataItemByIndex -> data", data);
      };
      FMItemLayout.prototype.getItemIndex_csryw = function() {
        return this.itemIndex_csryw;
      };
      FMItemLayout.prototype.getPointX_csryw = function() {
        return this.node.x;
      };
      FMItemLayout.prototype.getPointY_csryw = function() {
        return this.node.y;
      };
      FMItemLayout.prototype.setPointX_csryw = function(x) {
        this.node.x = x;
      };
      FMItemLayout.prototype.setPointY_csryw = function(y) {
        this.node.y = y;
      };
      FMItemLayout.prototype.getItemChildrenCount_csryw = function() {
        return this.itemChilds.length;
      };
      __decorate([ property({
        tooltip: "\u5b50\u8282\u70b9\u96c6\u5408",
        type: [ cc.Node ]
      }) ], FMItemLayout.prototype, "itemChilds", void 0);
      FMItemLayout = __decorate([ ccclass, disallowMultiple() ], FMItemLayout);
      return FMItemLayout;
    }(FMViewBase_1.default);
    exports.default = FMItemLayout;
    cc._RF.pop();
  }, {
    "../Base/FMViewBase": "FMViewBase"
  } ],
  FMMainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5474BSd0xPPrq9DFz4LkL1", "FMMainScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TTAPI_1 = require("../../../../Platform/tt/TTAPI");
    var AudioManager_1 = require("../../../../scripts/battle/manager/AudioManager");
    var DialogMgr_1 = require("../../../Mgr/DialogMgr");
    var PhysicalPowerMgr_1 = require("../../../Mgr/PhysicalPowerMgr");
    var User_1 = require("../../../User/User");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FMMainScene = function(_super) {
      __extends(FMMainScene, _super);
      function FMMainScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.touch = null;
        _this.butStart = null;
        return _this;
      }
      FMMainScene.prototype.onLoad = function() {
        var _this = this;
        this.touch = this.node.getChildByName("touch");
        this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        var butSet = this.node.getChildByName("butSet");
        butSet.on("click", function() {
          DialogMgr_1.default.openSettingDialog(handleFM_csryw(function() {}, _this));
        }, this);
        this.butStart = this.node.getChildByName("butStart");
        this.butStart.on("click", function() {
          User_1.default.addGameTime();
          TTAPI_1.default.reportAnalytics("gameStart");
          _this.butStart.getComponent(cc.Button).interactable = false;
          AudioManager_1.default.inst.playSFX("Sound/\u5207\u897f\u74dc");
          _this.butStart.getComponentInChildren(sp.Skeleton).setAnimation(0, "play", false);
          _this.scheduleOnce(function() {
            _this.getComponent(cc.Animation).play("CloseMask");
          }, .3);
          return;
        }, this);
        var butToast = this.node.getChildByName("butToast");
        butToast.on("click", function() {
          DialogMgr_1.default.openToast("\u8fd9\u662f\u63d0\u793a\u8bed");
        }, this);
        var butWeapon = this.node.getChildByName("butWeapon");
        butWeapon.on("click", function() {
          DialogMgr_1.default.openWeapon(_this.node);
        }, this);
      };
      FMMainScene.prototype.start = function() {
        AudioManager_1.default.inst.playBGM("Sound/battleBgm");
      };
      FMMainScene.prototype.onTouchStart = function() {};
      FMMainScene.prototype.onCloseComplete = function() {
        cc.director.loadScene("battleScene");
      };
      FMMainScene = __decorate([ ccclass ], FMMainScene);
      return FMMainScene;
    }(cc.Component);
    exports.default = FMMainScene;
    cc._RF.pop();
  }, {
    "../../../../Platform/tt/TTAPI": "TTAPI",
    "../../../../scripts/battle/manager/AudioManager": "AudioManager",
    "../../../Mgr/DialogMgr": "DialogMgr",
    "../../../Mgr/PhysicalPowerMgr": "PhysicalPowerMgr",
    "../../../User/User": "User"
  } ],
  FMScrollViewLoop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "685e88bRjRGNawxLozbkHdK", "FMScrollViewLoop");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMTouchMaskView_1 = require("./FMTouchMaskView");
    var FMInterface_1 = require("../Interface/FMInterface");
    var Utilit_1 = require("../Util/Utilit");
    var FMItemLayout_1 = require("./FMItemLayout");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
    var FMScrollViewLoop = function(_super) {
      __extends(FMScrollViewLoop, _super);
      function FMScrollViewLoop() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isAutoMoveType = true;
        _this.arrayAliveListLayout_csryw = [];
        _this.arrayFreeListLayout_csryw = [];
        _this.viewLayoutNum_csryw = 0;
        _this.viewLayoutGapNum_csryw = 3;
        _this.viewLayoutSum_csryw = 0;
        _this.startIndexItem_csryw = 0;
        _this.isCanUpdateItems_csryw = false;
        _this.isTouchStop_csryw = false;
        _this._isCanScrollViewLoopUpdate_csryw = true;
        _this.isAutoMoveWayLeftUp_csryw = true;
        _this.autoMoveWaitTime_csryw = 60;
        _this.autoMoveWaitNum_csryw = 1;
        _this.autoMoveSpeed_csryw = 3;
        _this._nextMoveLength_csryw = 0;
        _this._waitTimeNum_csryw = 0;
        _this._moveState_csryw = 0;
        return _this;
      }
      Object.defineProperty(FMScrollViewLoop.prototype, "isAutoMoveType", {
        get: function() {
          return this._isAutoMoveType;
        },
        set: function(val) {
          this._isAutoMoveType = val;
        },
        enumerable: false,
        configurable: true
      });
      FMScrollViewLoop.prototype._init_csryw = function() {
        if (_super.prototype._init_csryw.call(this)) {
          this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL ? this.viewLayoutNum_csryw = Math.ceil(this.node.width / this.itemPrefabWidth_csryw) : this._slideDirection == FMTouchMaskView_1.SlideDirection.VERTICAL && (this.viewLayoutNum_csryw = Math.ceil(this.node.width / this.itemPrefabHeight_csryw));
          this.viewLayoutSum_csryw = this.viewLayoutNum_csryw + 2 * this.viewLayoutGapNum_csryw;
          var pos = 0;
          for (var index = 0; index < this.viewLayoutSum_csryw; index++) {
            var layoutScript = this.cloneLayout_csryw();
            var layout = layoutScript.node;
            if (this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL) {
              layout.x = pos;
              layout.y = 0;
              pos += layout.width;
            } else if (this._slideDirection == FMTouchMaskView_1.SlideDirection.VERTICAL) {
              layout.x = 0;
              layout.y = pos;
              pos -= layout.height;
            }
            this.arrayAliveListLayout_csryw.push(layoutScript);
          }
          this.isCanUpdateItems_csryw = true;
          return true;
        }
        return false;
      };
      FMScrollViewLoop.prototype.setFMListenerUpdateItem_csryw = function(_listener) {
        this.fmListenerUpdateData_csryw = _listener;
      };
      FMScrollViewLoop.prototype.setAutoData_csryw = function(way, moveWaitNum, waitTime, speed, bgColor) {
        this.isAutoMoveWayLeftUp_csryw = 0 == way;
        this.autoMoveWaitNum_csryw = moveWaitNum ? Math.abs(moveWaitNum) : 0;
        this.autoMoveWaitTime_csryw = waitTime ? 60 * Math.abs(waitTime) : 60;
        this.autoMoveSpeed_csryw = speed ? Math.abs(speed) : 3;
        bgColor && (this.node.color = Utilit_1.default.colorHex2Rgb_csryw(bgColor));
      };
      FMScrollViewLoop.prototype.isTouchStopView_csryw = function() {
        return this.isTouchStop_csryw;
      };
      FMScrollViewLoop.prototype.setCanScrollViewLoopUpdate_csryw = function(_update) {
        this._isCanScrollViewLoopUpdate_csryw = _update;
      };
      FMScrollViewLoop.prototype.setAdTag_csryw = function(tag) {
        this.ad_tag_csryw = tag;
        for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
          var element = this.arrayAliveListLayout_csryw[index];
          element.setAdTag_csryw(this.ad_tag_csryw);
        }
        for (var index = 0; index < this.arrayFreeListLayout_csryw.length; index++) {
          var element = this.arrayFreeListLayout_csryw[index];
          element.setAdTag_csryw(this.ad_tag_csryw);
        }
      };
      FMScrollViewLoop.prototype.initUpdateItems_csryw = function() {
        this._init_csryw();
        this.startIndexItem_csryw = 0;
        if (this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL) {
          var pos = 3 * -this.itemPrefabWidth_csryw;
          for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            element.setPointX_csryw(pos);
            element.setItemIndex_csryw(this.startIndexItem_csryw + index);
            pos += this.itemPrefabWidth_csryw;
          }
        } else {
          var pos = 3 * this.itemPrefabHeight_csryw;
          for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            element.setPointY_csryw(pos);
            element.setItemIndex_csryw(this.startIndexItem_csryw + index);
            pos -= this.itemPrefabHeight_csryw;
          }
        }
        this._updateNextLengthTime_csryw();
      };
      FMScrollViewLoop.prototype.update = function(dt) {
        if (this.isCanUpdateItems_csryw && this._isCanScrollViewLoopUpdate_csryw) {
          this.updateScrollingItems_csryw();
          true == this.isAutoMoveType && this._updateAutoMove_csryw();
        }
      };
      FMScrollViewLoop.prototype.listenerUpdateInitItem_csryw = function(sum) {
        if (this.fmListenerUpdateData_csryw) {
          var data = FMInterface_1.callFM_csryw(this.fmListenerUpdateData_csryw, sum);
          return data;
        }
      };
      FMScrollViewLoop.prototype._updateAutoMove_csryw = function() {
        if (this.isTouchStopView_csryw()) return;
        if (0 == this._moveState_csryw) {
          this.isAutoMoveWayLeftUp_csryw ? this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL ? this.content_csryw.x = this.content_csryw.x - this.autoMoveSpeed_csryw : this.content_csryw.y = this.content_csryw.y + this.autoMoveSpeed_csryw : this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL ? this.content_csryw.x = this.content_csryw.x + this.autoMoveSpeed_csryw : this.content_csryw.y = this.content_csryw.y - this.autoMoveSpeed_csryw;
          if (this.autoMoveWaitNum_csryw > 0) {
            this._nextMoveLength_csryw = this._nextMoveLength_csryw - this.autoMoveSpeed_csryw;
            this._nextMoveLength_csryw <= 0 && (this._moveState_csryw = 1);
          }
        } else {
          this._waitTimeNum_csryw = this._waitTimeNum_csryw + 1;
          if (this._waitTimeNum_csryw >= this.autoMoveWaitTime_csryw) {
            this._waitTimeNum_csryw = 0;
            this._updateNextLengthTime_csryw();
          }
        }
      };
      FMScrollViewLoop.prototype._dispatchEvent_csryw = function(event) {
        if (event == FMTouchMaskView_1.FMTouchEvent.Scrolling) ; else if (event == FMTouchMaskView_1.FMTouchEvent.TouchStart) this.isTouchStop_csryw = true; else if (event == FMTouchMaskView_1.FMTouchEvent.TouchEnded) {
          this._updateNextLengthTime_csryw();
          this.isTouchStop_csryw = false;
        }
      };
      FMScrollViewLoop.prototype._updateNextLengthTime_csryw = function() {
        if (this.autoMoveWaitNum_csryw > 0) if (this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL) {
          this._nextMoveLength_csryw = this.autoMoveWaitNum_csryw * this.itemPrefab.data.width;
          if (this.isAutoMoveWayLeftUp_csryw) for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            var vcx = this.content_csryw.x + element.node.x;
            if (vcx > -element.node.width && vcx < 0) {
              this._nextMoveLength_csryw = this._nextMoveLength_csryw + vcx;
              break;
            }
          } else for (var index = this.arrayAliveListLayout_csryw.length - 1; index >= 0; index--) {
            var element = this.arrayAliveListLayout_csryw[index];
            var vcx = this.content_csryw.x + element.node.x;
            if (vcx < this.node.width + element.node.width && vcx > this.node.width) {
              vcx -= this.node.width;
              this._nextMoveLength_csryw = this._nextMoveLength_csryw - vcx;
              break;
            }
          }
        } else {
          this._nextMoveLength_csryw = this.autoMoveWaitNum_csryw * this.itemPrefab.data.height;
          if (this.isAutoMoveWayLeftUp_csryw) for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            var vcy = this.content_csryw.y + element.node.y;
            if (vcy < element.node.height && vcy > 0) {
              this._nextMoveLength_csryw = this._nextMoveLength_csryw - vcy;
              break;
            }
          } else for (var index = this.arrayAliveListLayout_csryw.length - 1; index >= 0; index--) {
            var element = this.arrayAliveListLayout_csryw[index];
            var vcy = this.content_csryw.y + element.node.y - element.node.height;
            if (vcy > -(this.node.height + element.node.height) && vcy < -this.node.height) {
              vcy += this.node.height;
              this._nextMoveLength_csryw = this._nextMoveLength_csryw + vcy;
              break;
            }
          }
        }
        this._waitTimeNum_csryw = 0;
        this._moveState_csryw = 0;
      };
      FMScrollViewLoop.prototype.updateScrollingItems_csryw = function() {
        var arrayLive = [];
        if (this._slideDirection == FMTouchMaskView_1.SlideDirection.HORIZONTAL) {
          for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            this.content_csryw.x + element.getPointX_csryw() < 3 * -this.itemPrefabWidth_csryw ? this.addFreeItem_csryw(element) : element.getPointX_csryw() + this.content_csryw.x > this.node.width + 3 * this.itemPrefabWidth_csryw ? this.addFreeItem_csryw(element) : arrayLive.push(element);
          }
          if (arrayLive[0].getPointX_csryw() + this.content_csryw.x > -this.itemPrefabWidth_csryw) {
            var element = this.getFreeItem_csryw();
            element.setPointX_csryw(arrayLive[0].getPointX_csryw() - this.itemPrefabWidth_csryw);
            element.setItemIndex_csryw(arrayLive[0].getItemIndex_csryw() - 1);
            arrayLive.splice(0, 0, element);
            element.node.active = true;
          }
          if (arrayLive[arrayLive.length - 1].getPointX_csryw() + this.content_csryw.x < +this.node.width + this.itemPrefabWidth_csryw) {
            var element = this.getFreeItem_csryw();
            element.setPointX_csryw(arrayLive[arrayLive.length - 1].getPointX_csryw() + this.itemPrefabWidth_csryw);
            element.setItemIndex_csryw(arrayLive[arrayLive.length - 1].getItemIndex_csryw() + 1);
            arrayLive.push(element);
            element.node.active = true;
          }
        } else {
          for (var index = 0; index < this.arrayAliveListLayout_csryw.length; index++) {
            var element = this.arrayAliveListLayout_csryw[index];
            element.getPointY_csryw() + this.content_csryw.y > 3 * this.itemPrefabHeight_csryw ? this.addFreeItem_csryw(element) : element.getPointY_csryw() < -(this.content_csryw.y + this.node.height + 3 * this.itemPrefabHeight_csryw) ? this.addFreeItem_csryw(element) : arrayLive.push(element);
          }
          if (arrayLive[0].getPointY_csryw() + this.content_csryw.y <= this.itemPrefabHeight_csryw) {
            var element = this.getFreeItem_csryw();
            element.setPointY_csryw(arrayLive[0].getPointY_csryw() + this.itemPrefabHeight_csryw);
            element.setItemIndex_csryw(arrayLive[0].getItemIndex_csryw() - 1);
            arrayLive.splice(0, 0, element);
            element.node.active = true;
          }
          if (arrayLive[arrayLive.length - 1].getPointY_csryw() >= -(this.content_csryw.y + this.node.height + this.itemPrefabHeight_csryw)) {
            var element = this.getFreeItem_csryw();
            element.setPointY_csryw(arrayLive[arrayLive.length - 1].getPointY_csryw() - this.itemPrefabHeight_csryw);
            element.setItemIndex_csryw(arrayLive[arrayLive.length - 1].getItemIndex_csryw() + 1);
            arrayLive.push(element);
            element.node.active = true;
          }
        }
        this.arrayAliveListLayout_csryw = arrayLive;
      };
      FMScrollViewLoop.prototype.cloneLayout_csryw = function() {
        var layout = cc.instantiate(this.itemPrefab);
        var script = layout.getComponent(FMItemLayout_1.default);
        script.setAdTag_csryw(this.ad_tag_csryw);
        script.setFMListenerUpdate_csryw(FMInterface_1.handleFM_csryw(this.listenerUpdateInitItem_csryw, this));
        this.content_csryw.addChild(layout);
        return script;
      };
      FMScrollViewLoop.prototype.getFreeItem_csryw = function() {
        var element = this.arrayFreeListLayout_csryw.pop();
        element || (element = this.cloneLayout_csryw());
        return element;
      };
      FMScrollViewLoop.prototype.addFreeItem_csryw = function(item) {
        item.node.active = false;
        this.arrayFreeListLayout_csryw.push(item);
      };
      __decorate([ property() ], FMScrollViewLoop.prototype, "_isAutoMoveType", void 0);
      __decorate([ property({
        tooltip: "\u81ea\u52a8\u6eda\u52a8",
        type: cc.Boolean
      }) ], FMScrollViewLoop.prototype, "isAutoMoveType", null);
      FMScrollViewLoop = __decorate([ ccclass, disallowMultiple() ], FMScrollViewLoop);
      return FMScrollViewLoop;
    }(FMTouchMaskView_1.default);
    exports.default = FMScrollViewLoop;
    cc._RF.pop();
  }, {
    "../Interface/FMInterface": "FMInterface",
    "../Util/Utilit": "Utilit",
    "./FMItemLayout": "FMItemLayout",
    "./FMTouchMaskView": "FMTouchMaskView"
  } ],
  FMSkeletonExtend: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e0489vcsZLQrcbLb8LpzGm", "FMSkeletonExtend");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, playOnFocus = _a.playOnFocus;
    var FMSkeletonExtend = function(_super) {
      __extends(FMSkeletonExtend, _super);
      function FMSkeletonExtend() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isEditorPlay_csryw = true;
        _this._isEditoAttach_csryw = false;
        return _this;
      }
      Object.defineProperty(FMSkeletonExtend.prototype, "isEditorPlay", {
        get: function() {
          return this._isEditorPlay_csryw;
        },
        set: function(val) {
          this._isEditorPlay_csryw = val;
          this._isEditorPlay_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FMSkeletonExtend.prototype, "isEditorAttach", {
        get: function() {
          return this._isEditoAttach_csryw;
        },
        set: function(val) {
          this._isEditoAttach_csryw = val;
          this._isEditoAttach_csryw && this["attachUtil"].generateAllAttachedNodes();
        },
        enumerable: false,
        configurable: true
      });
      FMSkeletonExtend.prototype.update = function(dt) {
        false;
        _super.prototype.update.call(this, dt);
      };
      FMSkeletonExtend.prototype.dumpSpineInfo_csryw = function() {
        var data = this["_skeleton"]["data"];
        var animations = data["animations"];
        var events = data["events"];
        var skins = data["skins"];
        console.group("spine : \u8282\u70b9 " + this.name + " ,\u52a8\u753b <" + this["_N$skeletonData"]["_name"] + " >");
        var animationsName = "\u52a8\u4f5c\u96c6\u5408\uff1a";
        var animationsInfo = "[";
        for (var index = 0; index < animations.length; index++) {
          var name = animations[index].name;
          0 != index && (animationsInfo += ",");
          animationsInfo += name;
        }
        animationsInfo += "]";
        var eventsName = "\u4e8b\u4ef6\u96c6\u5408\uff1a";
        var eventsInfo = "[";
        for (var index = 0; index < events.length; index++) {
          var name = events[index].name;
          var stringValue = events[index].stringValue;
          "" == stringValue && (stringValue = '""');
          0 != index && (eventsInfo += ",");
          eventsInfo = eventsInfo + name + ":" + stringValue;
        }
        eventsInfo += "]";
        var skinsName = "\u76ae\u80a4\u96c6\u5408\uff1a";
        var skinsInfo = "[";
        for (var index = 0; index < skins.length; index++) {
          var name = skins[index].name;
          0 != index && (skinsInfo += ",");
          skinsInfo += name;
        }
        skinsInfo += "]";
        console.log("%c " + animationsName + " %c " + animationsInfo + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
        console.log("%c " + eventsName + " %c " + eventsInfo + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
        console.log("%c " + skinsName + " %c " + skinsInfo + " ", "background: #35495E;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;", "background: #409EFF;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;");
        console.groupEnd();
      };
      __decorate([ property() ], FMSkeletonExtend.prototype, "_isEditorPlay_csryw", void 0);
      __decorate([ property({
        tooltip: "\u7f16\u8f91\u5668\u4e2d\u81ea\u52a8\u64ad\u653e\u52a8\u4f5c\n\u52fe\u9009\u72b6\u6001\uff0c\u5728\u9009\u4e2d\u8282\u70b9\u65f6\uff0c\u5e27\u738760\uff0c\u5426\u5219\u53ea\u6709\u5fc5\u8981\u65f6\u624d\u91cd\u7ed8\n\u975e\u52fe\u9009\uff0c\u4e0d\u81ea\u52a8\u64ad\u653e",
        type: cc.Boolean
      }) ], FMSkeletonExtend.prototype, "isEditorPlay", null);
      __decorate([ property() ], FMSkeletonExtend.prototype, "_isEditoAttach_csryw", void 0);
      __decorate([ property({
        tooltip: "\u7f16\u8f91\u5668\u4e2d\u751f\u6210\u6302\u70b9\n\u52fe\u9009\u72b6\u6001\uff0c\u751f\u6210\u6302\u70b9 ATTACHED_NODE_TREE\n\u975e\u52fe\u9009\uff0c\u4e0d\u505a\u64cd\u4f5c",
        type: cc.Boolean
      }) ], FMSkeletonExtend.prototype, "isEditorAttach", null);
      FMSkeletonExtend = __decorate([ ccclass, executeInEditMode, playOnFocus, menu("FM\u7ec4\u4ef6/\u6269\u5c55/FMSkeletonExtend") ], FMSkeletonExtend);
      return FMSkeletonExtend;
    }(sp.Skeleton);
    exports.default = FMSkeletonExtend;
    cc._RF.pop();
  }, {} ],
  FMSpine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b1a8Us5hFCxrdcJbkFM0w9", "FMSpine");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMSkeletonExtend_1 = require("./FMSkeletonExtend");
    var FMComponentExtend_1 = require("../Base/FMComponentExtend");
    var SoundMgr_1 = require("../Mgr/SoundMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, playOnFocus = _a.playOnFocus;
    var FMSpine = function(_super) {
      __extends(FMSpine, _super);
      function FMSpine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.arrayEvent = [];
        _this.arraySlotEvent = {};
        _this.EventEnumView_csryw = {};
        return _this;
      }
      FMSpine.prototype.initView_csryw = function() {
        var _this = this;
        this.getSpine().setEventListener(function(trackEntry, event) {
          var animation = trackEntry.animation;
          var animationName = trackEntry.animation.name;
          var eventName = event.data && event.data.name;
          var eventStringValue = event.stringValue;
          var eventIntValue = event.intValue;
          var eventFloatValue = event.floatValue;
          "sound" == eventName && SoundMgr_1.default.playSpineSound_csryw(eventStringValue, animationName);
          _this.arrayEvent.forEach(function(element) {
            var name = element.name;
            var listener = element.listener;
            name == eventName && callFM_csryw(listener, animation, animationName, eventName);
          });
        });
      };
      FMSpine.prototype.addSlotByNodeEvent = function(slotName, arrarAction, childNode) {
        this.arraySlotEvent[slotName] = {
          slot: this.getSpine().findSlot(slotName),
          arrayAction: arrarAction,
          childNode: childNode
        };
      };
      FMSpine.prototype.addEvent = function(eventName, listener) {
        this.arrayEvent.push({
          name: eventName,
          listener: listener
        });
      };
      FMSpine.prototype.removeEventAll = function() {
        this.arrayEvent = [];
      };
      FMSpine.prototype.animation = function() {
        return this.getSpine().animation;
      };
      FMSpine.prototype.setTimeScale = function(scale) {
        this.getSpine().timeScale = scale;
      };
      FMSpine.prototype.getSpine = function() {
        null == this.spine && (this.spine = this.node.getComponent(FMSkeletonExtend_1.default));
        return this.spine;
      };
      FMSpine.prototype.update = function(dt) {};
      FMSpine.prototype.setAnimation = function(name, loop, trackIndex) {
        void 0 === loop && (loop = false);
        void 0 === trackIndex && (trackIndex = 0);
        this.getSpine().setAnimation(trackIndex, name, loop);
      };
      FMSpine.prototype.setMix = function(fromAnimation, toAnimation, duration) {
        this.getSpine().setMix(fromAnimation, toAnimation, duration);
      };
      FMSpine.prototype.setSkin = function(skinName) {
        this.getSpine().setSkin(skinName);
      };
      FMSpine = __decorate([ ccclass, requireComponent(FMSkeletonExtend_1.default), disallowMultiple(), menu("FM\u7ec4\u4ef6/FMSpine") ], FMSpine);
      return FMSpine;
    }(FMComponentExtend_1.default);
    exports.default = FMSpine;
    cc._RF.pop();
  }, {
    "../Base/FMComponentExtend": "FMComponentExtend",
    "../Mgr/SoundMgr": "SoundMgr",
    "./FMSkeletonExtend": "FMSkeletonExtend"
  } ],
  FMTouchMaskView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74f62CQmAVNqqrNvtKV9cdq", "FMTouchMaskView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FMTouchEvent = exports.SlideDirection = void 0;
    var LogUtils_1 = require("../Util/LogUtils");
    var FMItemLayout_1 = require("./FMItemLayout");
    1;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, menu = _a.menu;
    var EPSILON = 1e-4;
    var SlideDirection;
    (function(SlideDirection) {
      SlideDirection[SlideDirection["HORIZONTAL"] = 1] = "HORIZONTAL";
      SlideDirection[SlideDirection["VERTICAL"] = 2] = "VERTICAL";
    })(SlideDirection = exports.SlideDirection || (exports.SlideDirection = {}));
    var FMTouchEvent;
    (function(FMTouchEvent) {
      FMTouchEvent["TouchStart"] = "touch_start";
      FMTouchEvent["Scrolling"] = "scrolling";
      FMTouchEvent["TouchEnded"] = "touch_ended";
    })(FMTouchEvent = exports.FMTouchEvent || (exports.FMTouchEvent = {}));
    var FMTouchMaskView = function(_super) {
      __extends(FMTouchMaskView, _super);
      function FMTouchMaskView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this._slideDirection = SlideDirection.HORIZONTAL;
        _this._tempPoint_csryw = cc.v2();
        _this._tempPrevPoint_csryw = cc.v2();
        _this._outOfBoundaryAmount_csryw = cc.v2(0, 0);
        _this._outOfBoundaryAmountDirty_csryw = true;
        _this._inited_csryw = false;
        _this._touchMoved_csryw = false;
        _this.cancelInnerEvents_csryw = true;
        _this.itemPrefabWidth_csryw = 0;
        _this.itemPrefabHeight_csryw = 0;
        return _this;
      }
      Object.defineProperty(FMTouchMaskView.prototype, "slideDirection", {
        get: function() {
          return this._slideDirection;
        },
        set: function(val) {
          this._slideDirection = val;
        },
        enumerable: false,
        configurable: true
      });
      FMTouchMaskView.prototype.onLoad = function() {
        this._init_csryw();
      };
      FMTouchMaskView.prototype._init_csryw = function() {
        if (this._inited_csryw) return false;
        var widget = this.node.getComponent(cc.Widget);
        widget && widget.updateAlignment();
        var view = new cc.Node();
        view.anchorX = 0;
        view.anchorY = 1;
        var viewWidget = view.addComponent(cc.Widget);
        viewWidget.top = 0;
        viewWidget.left = 0;
        viewWidget.right = 0;
        viewWidget.bottom = 0;
        viewWidget.isAlignTop = true;
        viewWidget.isAlignLeft = true;
        viewWidget.isAlignRight = true;
        viewWidget.isAlignBottom = true;
        this.node.addChild(view);
        viewWidget.updateAlignment();
        var mash = view.addComponent(cc.Mask);
        mash.type = cc.Mask.Type.RECT;
        this.content_csryw = new cc.Node();
        view.addChild(this.content_csryw);
        this.content_csryw.width = view.width;
        this.content_csryw.height = view.height;
        this.content_csryw.anchorX = 0;
        this.content_csryw.anchorY = 1;
        this.content_csryw.x = 0;
        this.content_csryw.y = 0;
        this.itemPrefabWidth_csryw = this.itemPrefab.data.width;
        this.itemPrefabHeight_csryw = this.itemPrefab.data.height;
        this.scriptItemPrefab_csryw = this.itemPrefab.data.getComponent(FMItemLayout_1.default);
        this.scriptItemPrefab_csryw ? 0 == this.scriptItemPrefab_csryw.getItemChildrenCount_csryw() && LogUtils_1.LogUtils.error_csryw("FMTouchMaskView -> _init -> scriptItemPrefab item child count ==0") : LogUtils_1.LogUtils.error_csryw("FMTouchMaskView -> _init -> scriptItemPrefab is null");
        this._inited_csryw = true;
        return true;
      };
      FMTouchMaskView.prototype._dispatchEvent_csryw = function(name) {
        console.log("FMTouchMaskView -> _dispatchEvent -> name", name);
      };
      FMTouchMaskView.prototype.setCancelInnerEvents_csryw = function(inner) {
        this.cancelInnerEvents_csryw = inner;
      };
      FMTouchMaskView.prototype.handlePressLogic_csryw = function(touch) {
        this._dispatchEvent_csryw(FMTouchEvent.TouchStart);
      };
      FMTouchMaskView.prototype.handleMoveLogic_csryw = function(touch) {
        var deltaMove = this.getLocalAxisAlignDelta_csryw(touch);
        deltaMove = this.clampDelta_csryw(deltaMove);
        var realMove = deltaMove;
        var outOfBoundary = this.getHowMuchOutOfBoundary_csryw(realMove);
        realMove = realMove.add(outOfBoundary);
        if (0 !== realMove.x || 0 !== realMove.y) {
          this._moveContent_csryw(realMove);
          this._dispatchEvent_csryw(FMTouchEvent.Scrolling);
        }
      };
      FMTouchMaskView.prototype.handleReleaseLogic_csryw = function(touch) {
        var delta = this.getLocalAxisAlignDelta_csryw(touch);
        this._dispatchEvent_csryw(FMTouchEvent.TouchEnded);
      };
      FMTouchMaskView.prototype._flattenVectorByDirection_csryw = function(vector) {
        var result = vector;
        result.x = this._slideDirection == SlideDirection.HORIZONTAL ? result.x : 0;
        result.y = this._slideDirection == SlideDirection.VERTICAL ? result.y : 0;
        return result;
      };
      FMTouchMaskView.prototype._moveContent_csryw = function(deltaMove) {
        var adjustedMove = this._flattenVectorByDirection_csryw(deltaMove);
        var newPosition = this.getContentPosition_csryw().add(adjustedMove);
        this.setContentPosition_csryw(newPosition);
      };
      FMTouchMaskView.prototype.getLocalAxisAlignDelta_csryw = function(touch) {
        this.node.convertToNodeSpaceAR(touch.getLocation(), this._tempPoint_csryw);
        this.node.convertToNodeSpaceAR(touch.getPreviousLocation(), this._tempPrevPoint_csryw);
        return this._tempPoint_csryw.sub(this._tempPrevPoint_csryw);
      };
      FMTouchMaskView.prototype._hasNestedViewGroup_csryw = function(event, captureListeners) {
        if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;
        if (captureListeners) for (var i = 0; i < captureListeners.length; ++i) {
          var item = captureListeners[i];
          if (this.node === item) {
            if (event.target.getComponent(cc.ViewGroup)) return true;
            return false;
          }
          if (item.getComponent(cc.ViewGroup)) return true;
        }
        return false;
      };
      FMTouchMaskView.prototype._stopPropagationIfTargetIsMe_csryw = function(event) {
        event.eventPhase === cc.Event.AT_TARGET && event.target === this.node && event.stopPropagation();
      };
      FMTouchMaskView.prototype._onTouchBegan_csryw = function(event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup_csryw(event, captureListeners)) return;
        var touch = event.touch;
        this.content_csryw && this.handlePressLogic_csryw(touch);
        this._touchMoved_csryw = false;
        this._stopPropagationIfTargetIsMe_csryw(event);
      };
      FMTouchMaskView.prototype._onTouchMoved_csryw = function(event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup_csryw(event, captureListeners)) return;
        var touch = event.touch;
        if (!this.node["_hitTest"](touch.getLocation(), this.node)) return;
        this.content_csryw && this.handleMoveLogic_csryw(touch);
        if (!this.cancelInnerEvents_csryw) return;
        var deltaMove = touch.getLocation().sub(touch.getStartLocation());
        if (deltaMove.mag() > 7 && !this._touchMoved_csryw) {
          var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
          cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
          cancelEvent.touch = event.touch;
          cancelEvent["simulate"] = true;
          event.target.dispatchEvent(cancelEvent);
          this._touchMoved_csryw = true;
        }
        this._stopPropagationIfTargetIsMe_csryw(event);
      };
      FMTouchMaskView.prototype._onTouchEnded_csryw = function(event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup_csryw(event, captureListeners)) return;
        var touch = event.touch;
        this.content_csryw && this.handleReleaseLogic_csryw(touch);
        this._touchMoved_csryw ? event.stopPropagation() : this._stopPropagationIfTargetIsMe_csryw(event);
      };
      FMTouchMaskView.prototype._onTouchCancelled_csryw = function(event, captureListeners) {
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup_csryw(event, captureListeners)) return;
        if (!event.simulate) {
          var touch = event.touch;
          this.content_csryw && this.handleReleaseLogic_csryw(touch);
        }
        this._stopPropagationIfTargetIsMe_csryw(event);
      };
      FMTouchMaskView.prototype.clampDelta_csryw = function(delta) {
        this._slideDirection == SlideDirection.HORIZONTAL ? delta.y = 0 : this._slideDirection == SlideDirection.VERTICAL && (delta.x = 0);
        return delta;
      };
      FMTouchMaskView.prototype.getHowMuchOutOfBoundary_csryw = function(addition) {
        addition = addition || cc.v2(0, 0);
        if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON) && !this._outOfBoundaryAmountDirty_csryw) return this._outOfBoundaryAmount_csryw;
        var outOfBoundaryAmount = cc.v2(0, 0);
        if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
          this._outOfBoundaryAmount_csryw = outOfBoundaryAmount;
          this._outOfBoundaryAmountDirty_csryw = false;
        }
        outOfBoundaryAmount = this.clampDelta_csryw(outOfBoundaryAmount);
        return outOfBoundaryAmount;
      };
      FMTouchMaskView.prototype.getContentPosition_csryw = function() {
        return this.content_csryw.getPosition();
      };
      FMTouchMaskView.prototype.setContentPosition_csryw = function(position) {
        if (position.fuzzyEquals(this.getContentPosition_csryw(), EPSILON)) return;
        this.content_csryw.setPosition(position);
        this._outOfBoundaryAmountDirty_csryw = true;
      };
      FMTouchMaskView.prototype.onEnable = function() {
        this._registerEvent_csryw();
      };
      FMTouchMaskView.prototype.onDisable = function() {
        this._unregisterEvent_csryw();
      };
      FMTouchMaskView.prototype._registerEvent_csryw = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan_csryw, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved_csryw, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded_csryw, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled_csryw, this, true);
      };
      FMTouchMaskView.prototype._unregisterEvent_csryw = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan_csryw, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved_csryw, this, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded_csryw, this, true);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled_csryw, this, true);
      };
      __decorate([ property({
        tooltip: "layout\u9884\u5236\u4f53(0,1)",
        type: cc.Prefab
      }) ], FMTouchMaskView.prototype, "itemPrefab", void 0);
      __decorate([ property() ], FMTouchMaskView.prototype, "_slideDirection", void 0);
      __decorate([ property({
        type: cc.Enum(SlideDirection),
        tooltip: "\u6eda\u52a8\u65b9\u5411:\n HORIZONTAL \u6c34\u5e73\u6eda\u52a8\nVERTICAL\u5782\u76f4\u6eda\u52a8"
      }) ], FMTouchMaskView.prototype, "slideDirection", null);
      FMTouchMaskView = __decorate([ ccclass, disallowMultiple() ], FMTouchMaskView);
      return FMTouchMaskView;
    }(cc.Component);
    exports.default = FMTouchMaskView;
    cc._RF.pop();
  }, {
    "../Util/LogUtils": "LogUtils",
    "./FMItemLayout": "FMItemLayout"
  } ],
  FMViewBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b171HYpFRDJ7C8uE/nm09B", "FMViewBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMInterface_1 = require("../Interface/FMInterface");
    var FMViewBase = function(_super) {
      __extends(FMViewBase, _super);
      function FMViewBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._isInit_csryw = 0;
        _this.EventEnumView_csryw = {};
        return _this;
      }
      FMViewBase.prototype.onLoad = function() {
        this._initView_csryw();
      };
      FMViewBase.prototype._initView_csryw = function() {
        if (0 != this._isInit_csryw) return;
        this._isInit_csryw = 1;
        this.initView_csryw();
        this.addEvent_csryw();
        this._isInit_csryw = 2;
        return true;
      };
      FMViewBase.prototype.onListenerEventView_csryw = function(listener) {
        this._listenerCallView_csryw = listener;
      };
      FMViewBase.prototype.emitListenerEvent_csryw = function(event) {
        console.log("\u53d1\u9001 " + event);
        this._listenerCallView_csryw && FMInterface_1.callFM_csryw(this._listenerCallView_csryw, event, this);
      };
      FMViewBase.prototype.removeView_csryw = function() {
        this.onDestroy();
        this.node.destroy();
      };
      FMViewBase.prototype.hideView_csryw = function() {
        this.node.active = false;
      };
      FMViewBase.prototype.showView_csryw = function() {
        this.node.active = true;
      };
      FMViewBase.prototype.isActiveView_csryw = function() {
        if (cc.isValid(this, true) && this.node.activeInHierarchy) return true;
        return false;
      };
      FMViewBase.prototype.showBanner_csryw = function() {};
      FMViewBase.prototype.hideBanner_csryw = function() {};
      FMViewBase.prototype.onEnable = function() {};
      FMViewBase.prototype.onDisable = function() {
        this.hideBanner_csryw();
      };
      FMViewBase.prototype.onDestroy = function() {
        this.removeEvent_csryw();
        this.hideBanner_csryw();
      };
      return FMViewBase;
    }(cc.Component);
    exports.default = FMViewBase;
    cc._RF.pop();
  }, {
    "../Interface/FMInterface": "FMInterface"
  } ],
  Fbsd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5085cY3IFNN77jC7D9gPSkX", "Fbsd");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Fbsd = function(_super) {
      __extends(Fbsd, _super);
      function Fbsd() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.character = null;
        _this.direction = new cc.Vec2();
        _this.cdTimer = 0;
        _this.bulletPrefab = "";
        return _this;
      }
      Fbsd.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
      };
      Fbsd.prototype.fire = function(direction, count) {
        direction.equals(cc.Vec2.ZERO) && direction.set(cc.Vec2.RIGHT);
        this.direction.set(direction);
        this.direction.rotateSelf(Math.PI / 2);
        var position = cc.v2(this.node.x, this.node.y);
        var step = Math.PI / (count - 1);
        for (var i = 0; i < count; i++) {
          GamaManager_1.default.inst.createBullet(this.node, this.bulletPrefab, position, this.direction.clone());
          this.direction.rotateSelf(step);
        }
      };
      Fbsd.prototype.fixUpdate = function() {
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run) return;
        var dt = FixManager_1.default.fixedDeltaTime;
        this.cdTimer -= dt;
        var count = this.character.getProperty("fbsd");
        if (this.cdTimer <= 0 && count > 0) {
          this.cdTimer = 3;
          this.fire(this.character.movement.curVelocity.normalize(), count);
        }
      };
      __decorate([ property() ], Fbsd.prototype, "bulletPrefab", void 0);
      Fbsd = __decorate([ ccclass ], Fbsd);
      return Fbsd;
    }(FixComponent_1.default);
    exports.default = Fbsd;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../manager/GamaManager": "GamaManager",
    "../Character": "Character"
  } ],
  Feidao: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9dfedNCHmVEipf/P8oCAaYs", "Feidao");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Feidao = function(_super) {
      __extends(Feidao, _super);
      function Feidao() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.firing = false;
        _this.count = 0;
        _this.timer = 0;
        _this.direction = new cc.Vec2();
        _this.cdTimer = 0;
        _this.bulletPrefab = "";
        return _this;
      }
      Feidao.prototype.fire = function(direction, count) {
        if (this.cdTimer > 0 || true == this.firing) return;
        this.count = count;
        this.firing = true;
        this.direction.set(direction);
      };
      Feidao.prototype.fireBullet = function() {
        var position = cc.v2(this.node.x, this.node.y);
        GamaManager_1.default.inst.createBullet(this.node, this.bulletPrefab, position, this.direction.clone());
      };
      Feidao.prototype.fixUpdate = function() {
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run) return;
        var dt = FixManager_1.default.fixedDeltaTime;
        this.cdTimer -= dt;
        if (this.cdTimer <= 0 && this.firing && this.count > 0) {
          this.timer -= dt;
          if (this.timer <= 0) {
            this.fireBullet();
            this.timer = .3;
            this.count--;
          }
          if (0 == this.count) {
            this.firing = false;
            this.cdTimer = 3;
          }
        }
      };
      __decorate([ property() ], Feidao.prototype, "bulletPrefab", void 0);
      Feidao = __decorate([ ccclass ], Feidao);
      return Feidao;
    }(FixComponent_1.default);
    exports.default = Feidao;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../manager/GamaManager": "GamaManager"
  } ],
  FixComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b440eLrtBpPy7DrrBPauGia", "FixComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixManager_1 = require("./FixManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FixComponent = function(_super) {
      __extends(FixComponent, _super);
      function FixComponent() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FixComponent.prototype.onEnable = function() {
        FixManager_1.default.inst.addFixComponent(this);
      };
      FixComponent.prototype.onDisable = function() {
        FixManager_1.default.inst.removeFixComponent(this);
      };
      FixComponent.prototype.fixUpdate = function() {};
      FixComponent = __decorate([ ccclass ], FixComponent);
      return FixComponent;
    }(cc.Component);
    exports.default = FixComponent;
    cc._RF.pop();
  }, {
    "./FixManager": "FixManager"
  } ],
  FixManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8a90WuI+5Px7mO3Lri5Kz0", "FixManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FixManager = function(_super) {
      __extends(FixManager, _super);
      function FixManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.fixedDeltaTime = 1 / 60;
        _this.pause = false;
        _this._components = [];
        _this._tick = 0;
        _this._totalTime = 0;
        return _this;
      }
      FixManager_1 = FixManager;
      Object.defineProperty(FixManager, "inst", {
        get: function() {
          if (null == this._ins) {
            var node = new cc.Node("FixMamager");
            cc.director.getScene().addChild(node);
            cc.game.addPersistRootNode(node);
            this._ins = node.addComponent(FixManager_1);
          }
          return this._ins;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FixManager.prototype, "totalTime", {
        get: function() {
          return this._totalTime;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FixManager.prototype, "_tickSinceGameStart", {
        get: function() {
          return Math.floor(this._totalTime / this.fixedDeltaTime);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FixManager, "fixedDeltaTime", {
        get: function() {
          return this._ins.fixedDeltaTime;
        },
        enumerable: false,
        configurable: true
      });
      FixManager.prototype.onLoad = function() {
        FixManager_1._ins = this;
        cc.game.addPersistRootNode(this.node);
      };
      FixManager.prototype.start = function() {
        this._gameStartTime = cc.director.getTotalTime();
      };
      FixManager.prototype.addFixComponent = function(component) {
        this._components.includes(component) || this._components.push(component);
      };
      FixManager.prototype.removeFixComponent = function(component) {
        var index = this._components.indexOf(component);
        if (-1 == index) return;
        this._components.splice(index, 1);
      };
      FixManager.prototype._checkUpdateFrame = function() {
        for (var i = 0; i < this._components.length; i++) this._components[i].fixUpdate();
        this._tick++;
      };
      FixManager.prototype.update = function(dt) {
        if (this.pause) return;
        this._totalTime += dt;
        while (this._tick < this._tickSinceGameStart) this._checkUpdateFrame();
      };
      var FixManager_1;
      __decorate([ property(cc.Float) ], FixManager.prototype, "fixedDeltaTime", void 0);
      FixManager = FixManager_1 = __decorate([ ccclass ], FixManager);
      return FixManager;
    }(cc.Component);
    exports.default = FixManager;
    cc._RF.pop();
  }, {} ],
  FruitDeadEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ba2abfoq3ZO/K122haBxKQx", "FruitDeadEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../character/Character");
    var BattleEffect_1 = require("./BattleEffect");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FruitDeadEffect = function(_super) {
      __extends(FruitDeadEffect, _super);
      function FruitDeadEffect() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      FruitDeadEffect.prototype.start = function() {
        _super.prototype.start.call(this);
        var body1 = this.node.getChildByName("Body1");
        var body2 = this.node.getChildByName("Body2");
        body1.opacity = body2.opacity = 255;
        body1.setPosition(cc.Vec2.ZERO);
        body2.setPosition(cc.Vec2.ZERO);
        var character = this.owner.getComponent(Character_1.default);
        var direction = character.lastHurtDirection.clone();
        var distance = 300;
        direction.rotateSelf(-Math.PI / 2);
        var position = direction.mul(distance);
        cc.tween(body1).to(.2, {
          x: position.x,
          y: position.y,
          opacity: 0
        }).start();
        position = direction.mul(-distance);
        cc.tween(body2).to(.2, {
          x: position.x,
          y: position.y,
          opacity: 0
        }).start();
      };
      FruitDeadEffect = __decorate([ ccclass ], FruitDeadEffect);
      return FruitDeadEffect;
    }(BattleEffect_1.default);
    exports.default = FruitDeadEffect;
    cc._RF.pop();
  }, {
    "../character/Character": "Character",
    "./BattleEffect": "BattleEffect"
  } ],
  GamaManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "577b8dWXfRA86mrs7HGnV0X", "GamaManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameState = void 0;
    var DialogMgr_1 = require("../../../FrameWork/Mgr/DialogMgr");
    var GameMgr_1 = require("../../../FrameWork/Mgr/GameMgr");
    var User_1 = require("../../../FrameWork/User/User");
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var ConfigManager_1 = require("../../ConfigManager");
    var AssetManager_1 = require("../../common/AssetManager");
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var Utils_1 = require("../../tools/Utils");
    var BulletObj_1 = require("../bullet/BulletObj");
    var Character_1 = require("../character/Character");
    var ActionTable_1 = require("../designer/table/ActionTable");
    var BulletTable_1 = require("../designer/table/BulletTable");
    var Messages_1 = require("../message/Messages");
    var ChaProperty_1 = require("../structs/battle/ChaProperty");
    var DamageInfo_1 = require("../structs/battle/DamageInfo");
    var AudioManager_1 = require("./AudioManager");
    var CollisitionManager_1 = require("./CollisitionManager");
    var HeroManager_1 = require("./HeroManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameState;
    (function(GameState) {
      GameState[GameState["None"] = 0] = "None";
      GameState[GameState["Guide"] = 1] = "Guide";
      GameState[GameState["Run"] = 2] = "Run";
      GameState[GameState["Resurrection"] = 3] = "Resurrection";
      GameState[GameState["Settlement"] = 4] = "Settlement";
    })(GameState = exports.GameState || (exports.GameState = {}));
    var GamaManager = function(_super) {
      __extends(GamaManager, _super);
      function GamaManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.debug = true;
        _this.debugHitBox = true;
        _this.debugNode = null;
        _this.mapSize = new cc.Vec2();
        _this.characterLayer = null;
        _this.bulletLayer = null;
        _this.effectLayer = null;
        _this.numberLayer = null;
        _this.bossCharacters = [];
        _this.state = GameState.None;
        _this.isPause = false;
        _this.win = false;
        _this.totalTime = 0;
        _this._stage = 0;
        _this.damageInfos = [];
        _this.isResurrected = false;
        _this.waitStartRecordTimer = -1;
        _this.clipIndexList = [];
        _this.currentMoney = 0;
        _this._clickCount = 0;
        return _this;
      }
      GamaManager_1 = GamaManager;
      Object.defineProperty(GamaManager, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GamaManager.prototype, "minX", {
        get: function() {
          return -this.mapSize.x / 2;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GamaManager.prototype, "minY", {
        get: function() {
          return -this.mapSize.y / 2;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GamaManager.prototype, "maxX", {
        get: function() {
          return this.mapSize.x / 2;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GamaManager.prototype, "maxY", {
        get: function() {
          return this.mapSize.y / 2;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GamaManager.prototype, "stage", {
        get: function() {
          return this._stage;
        },
        set: function(value) {
          if (this._stage == value) return;
          this._stage = value;
          this.onUpdateStage();
        },
        enumerable: false,
        configurable: true
      });
      GamaManager.prototype.onLoad = function() {
        GamaManager_1._inst = this;
        FixManager_1.default.inst.pause = false;
      };
      GamaManager.prototype.start = function() {
        var offset = 100;
        var canvas = cc.director.getScene().getChildByName("Canvas").getComponent(cc.Canvas);
        this.mapSize.x = 750 - offset;
        this.mapSize.y = 1334 - offset;
        this.mainCharacter = this.createCharacter("hero", cc.v2(0, -200)).getComponent(Character_1.default);
        this.stage = 0;
        this.swicthBattleBgm();
        this.debugNode.active = true;
        TTAPI_1.default.startRecord_csryw(360);
      };
      GamaManager.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.HeroDead, this.onHeroDead, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.KillMonster, this.onKillMonster, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.GameStart, this.onGameStart, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.HeroSuperStart, this.onHeroSuperChange, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.HeroSuperEnd, this.onHeroSuperChange, this);
      };
      GamaManager.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        GlobalMessage_1.GlobalMessage.offAll(this);
      };
      GamaManager.prototype.onGameStart = function() {
        this.state = GameState.Guide;
        this.createCharacter("xigua", cc.v2(0, 200));
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.GameGuideStart());
        this.schedule(function() {
          GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
        }, .5, 99999);
      };
      GamaManager.prototype.fixMovementPosition = function(position, fixPosition) {
        var mapSize = this.mapSize;
        var width = mapSize.x / 2;
        var height = mapSize.y / 2;
        var hit = false;
        fixPosition.set(position);
        if (fixPosition.x < -width) {
          fixPosition.x = -width;
          hit = true;
        }
        if (fixPosition.x > width) {
          fixPosition.x = width;
          hit = true;
        }
        if (fixPosition.y < -height) {
          fixPosition.y = -height;
          hit = true;
        }
        if (fixPosition.y > height) {
          fixPosition.y = height;
          hit = true;
        }
        return hit;
      };
      GamaManager.prototype.CreateFromPrefab = function(prefabPath, position, parent) {
        var prefab = AssetManager_1.default.getPrefab(prefabPath);
        var node = cc.instantiate(prefab);
        node.parent = parent;
        node.setPosition(position);
        return node;
      };
      GamaManager.prototype.createCharacter = function(name, pos) {
        var info = ConfigManager_1.default.characterConfig[name];
        if (null == info) {
          console.error("no find character data: ", name);
          return null;
        }
        var node = this.CreateFromPrefab(info.prefab, pos, this.characterLayer);
        var character = node.getComponent(Character_1.default);
        if (!character) {
          node.destroy();
          return null;
        }
        var property = new ChaProperty_1.default();
        property.hp = info.hp;
        property.attack = info.attack;
        property.range = info.range;
        property.catapultForce = info.catapultForce;
        property.moveSpeed = info.moveSpeed;
        property.cirt = info.cirt;
        character.InitProperty(property);
        for (var i = 0; i < info.skills.length; i++) ;
        character.group = info.group;
        character.setActions(ActionTable_1.ActionTable[info.actions]);
        character.config = info;
        CollisitionManager_1.default.inst.addBody(character);
        if (2 != this.stage && 2 == info.type) {
          this.stage = 1;
          this.bossCharacters.push(character);
          GlobalMessage_1.GlobalMessage.emit(Messages_1.BossShow.create(character));
        } else if (3 == info.type) {
          this.stage = 2;
          this.bossCharacters.push(character);
          GlobalMessage_1.GlobalMessage.emit(Messages_1.BossShow.create(character));
        }
        return node;
      };
      GamaManager.prototype.pause = function() {
        this.isPause = true;
        FixManager_1.default.inst.pause = true;
      };
      GamaManager.prototype.resume = function() {
        this.isPause = false;
        FixManager_1.default.inst.pause = false;
      };
      GamaManager.prototype.doDamage = function(attacker, target, tags) {
        void 0 === tags && (tags = []);
        this.damageInfos.push(new DamageInfo_1.default(attacker, target, tags));
      };
      GamaManager.prototype.checkCirtHappen = function(unit, critMulti) {
        var crit = unit.getProperty("cirt");
        if ((crit *= critMulti) <= .01) return false;
        if (crit >= 100) return true;
        return Utils_1.default.random(100) < 100 * crit;
      };
      GamaManager.prototype.createDamages = function(info, from, to, isCrit) {
        var attack = from.getProperty("attack");
        var tagMulti = 0;
        for (var i = 0; i < info.tags.length; i++) tagMulti += from.getProperty(info.tags[i] + "DamageMulti");
        var damage = attack * (0 == tagMulti ? 1 : tagMulti);
        if (isCrit) {
          var critDamageMulti = from.getProperty("critDamageMulti");
          var critDamageOffset = from.getProperty("critDamageOffset");
          damage *= critDamageMulti;
          damage += critDamageOffset;
        }
        damage *= 1 + .05 * Math.random();
        return Math.floor(damage);
      };
      GamaManager.prototype.dealWithDamage = function(dInfo) {
        if (!dInfo.defender) return;
        var defenderCharacter = dInfo.defender.getComponent(Character_1.default);
        if (!defenderCharacter) return;
        if (true == defenderCharacter.isDead) return;
        var attackerCharacter = null;
        if (dInfo.attacker) {
          attackerCharacter = dInfo.attacker.getComponent(Character_1.default);
          if (attackerCharacter == defenderCharacter) return;
          var isCirt = this.checkCirtHappen(attackerCharacter, 1);
          var damage = this.createDamages(dInfo, attackerCharacter, defenderCharacter, isCirt);
          var result = new DamageInfo_1.DamageResult(damage, isCirt, dInfo.direction);
          defenderCharacter.beHurt(result);
          attackerCharacter.hit(defenderCharacter);
        }
      };
      GamaManager.prototype.createBullet = function(owner, id, position, direction) {
        var model = BulletTable_1.BulletTable[id];
        null == model && console.error("no find bullet, ", id);
        var prefab = AssetManager_1.default.getPrefab(model.prefab);
        var node = cc.instantiate(prefab);
        node.parent = this.bulletLayer;
        node.active = true;
        node.setPosition(position);
        var bulletObj = node.getComponent(BulletObj_1.default);
        bulletObj.init(owner, direction, model);
      };
      GamaManager.prototype.fixUpdate = function() {
        var dt = FixManager_1.default.fixedDeltaTime;
        this.state == GameState.Run && (this.totalTime += dt);
        while (this.damageInfos.length) {
          var info = this.damageInfos.shift();
          this.dealWithDamage(info);
        }
        var old = this.waitStartRecordTimer;
        this.waitStartRecordTimer -= dt;
        if (old > 0 && this.waitStartRecordTimer <= 0) {
          this.clipIndexList = [];
          TTAPI_1.default.startRecord_csryw();
        }
      };
      GamaManager.prototype.settlement = function(win, now) {
        var _this = this;
        TTAPI_1.default.stopRecord_csryw();
        this.scheduleOnce(function() {
          _this.pause();
          _this.win = win;
          _this.state = GameState.Settlement;
          GlobalMessage_1.GlobalMessage.emit(new Messages_1.Settlement());
        }, now ? 0 : 3);
      };
      GamaManager.prototype.tryResurrection = function() {
        var _this = this;
        TTAPI_1.default.stopRecord_csryw();
        this.scheduleOnce(function() {
          _this.pause();
          _this.state = GameState.Resurrection;
          GlobalMessage_1.GlobalMessage.emit(new Messages_1.TryResurrection());
        }, 3);
      };
      GamaManager.prototype.resurrect = function(needResurrect) {
        if (needResurrect) {
          this.isResurrected = true;
          this.resume();
          this.state = GameState.Run;
          this.mainCharacter.resurrect();
          this.mainCharacter.node.setPosition(cc.Vec2.ZERO);
        } else this.settlement(false, true);
      };
      GamaManager.prototype.onKillMonster = function(data) {
        2 == data.character.config.type && 1 == this.stage && (this.stage = 0);
        if (this.state == GameState.Guide) {
          this.state = GameState.Run;
          GlobalMessage_1.GlobalMessage.emit(new Messages_1.GameGuideEnd());
        }
        var index = this.bossCharacters.findIndex(function(item) {
          return item == data.character;
        });
        -1 != index && this.bossCharacters.splice(index, 1);
        if (3 == data.character.config.type) {
          this.settlement(true);
          TTAPI_1.default.reportAnalytics("heroWin", {
            time: Math.floor(this.totalTime / 60),
            level: HeroManager_1.default.inst.level
          });
        }
        var dropMoney = data.character.config.dropMoney;
        dropMoney > 0 && this.addDropMoney(dropMoney, cc.v2(data.character.node.x, data.character.node.y));
        var monsterId = data.character.config.prefab;
        User_1.default.addKillMonster(monsterId);
        var weaponConfigs = ConfigManager_1.default.weaponConfig;
        for (var i = 0; i < weaponConfigs.length; i++) {
          var config = weaponConfigs[i];
          if (1 == config.type && config.monster == monsterId && User_1.default.getKillMonsterCount(monsterId) >= config.monsterCount && !User_1.default.checkHasWeapon(config.id)) {
            User_1.default.addWeapon(config.id);
            DialogMgr_1.default.openToast("\u89e3\u9501\uff1a" + config.name + "\u6b66\u5668", "view");
          }
        }
      };
      GamaManager.prototype.addDropMoney = function(dropMoney, position) {
        void 0 === position && (position = cc.Vec2.ZERO.clone());
        this.currentMoney += dropMoney;
        User_1.default.addMoney_csryw(dropMoney);
        GlobalMessage_1.GlobalMessage.emit(Messages_1.DropMoney.create(dropMoney, position));
      };
      GamaManager.prototype.onHeroDead = function() {
        console.log("\u7ed3\u675f\u5f55\u5c4f");
        if (this.isResurrected) {
          this.settlement(false);
          TTAPI_1.default.reportAnalytics("heroFail", {
            time: Math.floor(this.totalTime / 60),
            level: HeroManager_1.default.inst.level
          });
        } else this.tryResurrection();
      };
      GamaManager.prototype.onUpdateStage = function() {
        this.swicthBattleBgm();
      };
      GamaManager.prototype.swicthBattleBgm = function() {
        var soundName = "battleBgm";
        switch (this.stage) {
         case 2:
          soundName = "boss\u6218\u6597\u73af\u5883\u97f32";
        }
        AudioManager_1.default.inst.playBGM("Sound/" + soundName);
      };
      GamaManager.prototype.onHeroSuperChange = function(data) {};
      GamaManager.prototype.tryStartRecord = function() {
        this.waitStartRecordTimer = 1;
      };
      GamaManager.prototype.onTestAttack = function() {
        this.mainCharacter.doAction("Attack");
      };
      GamaManager.prototype.onTestHurt = function() {
        this.mainCharacter.beHurt(new DamageInfo_1.DamageResult(50, false, cc.Vec2.RIGHT.clone()));
      };
      GamaManager.prototype.onTestRotate = function() {
        this.mainCharacter.setDirection(-1 * Math.sign(this.mainCharacter.directionX));
      };
      GamaManager.prototype.onTestShoot = function() {
        this.mainCharacter.doAction("Shoot");
      };
      GamaManager.prototype.onAddTime = function() {
        this.totalTime += 60;
      };
      GamaManager.prototype.onInvincible = function() {
        this.mainCharacter.invincible = !this.mainCharacter.invincible;
      };
      GamaManager.prototype.onBigSkill = function() {
        this.mainCharacter.useBigSkill();
      };
      GamaManager.prototype.onClickHead = function() {
        if (!cc.sys.isBrowser && !this.debug) return;
        this._clickCount++;
        if (this._clickCount % 3 == 0) {
          this._clickCount = 0;
          this.debugNode.active = !this.debugNode.active;
        }
      };
      GamaManager.prototype.onClickAddMoney = function() {
        this.addDropMoney(5e3);
      };
      GamaManager.prototype.onClickAddLevel = function() {
        HeroManager_1.default.inst.upgrade();
      };
      GamaManager.prototype.onClickUnlockWeapon = function() {
        var weaponConfigs = ConfigManager_1.default.weaponConfig;
        weaponConfigs.forEach(function(item) {
          User_1.default.addWeapon(item.id);
        });
      };
      var GamaManager_1;
      __decorate([ property(cc.Node) ], GamaManager.prototype, "debugNode", void 0);
      __decorate([ property(cc.Vec2) ], GamaManager.prototype, "mapSize", void 0);
      __decorate([ property(cc.Node) ], GamaManager.prototype, "characterLayer", void 0);
      __decorate([ property(cc.Node) ], GamaManager.prototype, "bulletLayer", void 0);
      __decorate([ property(cc.Node) ], GamaManager.prototype, "effectLayer", void 0);
      __decorate([ property(cc.Node) ], GamaManager.prototype, "numberLayer", void 0);
      GamaManager = GamaManager_1 = __decorate([ ccclass ], GamaManager);
      return GamaManager;
    }(FixComponent_1.default);
    exports.default = GamaManager;
    cc._RF.pop();
  }, {
    "../../../FrameWork/Mgr/DialogMgr": "DialogMgr",
    "../../../FrameWork/Mgr/GameMgr": "GameMgr",
    "../../../FrameWork/User/User": "User",
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../../ConfigManager": "ConfigManager",
    "../../common/AssetManager": "AssetManager",
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../../tools/Utils": "Utils",
    "../bullet/BulletObj": "BulletObj",
    "../character/Character": "Character",
    "../designer/table/ActionTable": "ActionTable",
    "../designer/table/BulletTable": "BulletTable",
    "../message/Messages": "Messages",
    "../structs/battle/ChaProperty": "ChaProperty",
    "../structs/battle/DamageInfo": "DamageInfo",
    "./AudioManager": "AudioManager",
    "./CollisitionManager": "CollisitionManager",
    "./HeroManager": "HeroManager"
  } ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2df1cLuqrJMwqmrKVUUYyFn", "GameConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameConfig = function() {
      function GameConfig() {
        this.time = 3;
        this.sharedShowTime = 60;
        this.sharedShowProbability = .1;
      }
      return GameConfig;
    }();
    exports.default = GameConfig;
    cc._RF.pop();
  }, {} ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "00994MxDNBEArlTl2C0FNx/", "GameMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("../User/User");
    var LogUtils_1 = require("../Util/LogUtils");
    var AppConfig_1 = require("../Config/AppConfig");
    var GameMgr = function() {
      function GameMgr() {
        this.isFirstLoadAD = false;
        this.isWinner = false;
      }
      GameMgr.getInstance_csryw = function() {
        return GameMgr._instance_csryw;
      };
      GameMgr.prototype.preloadScene_csryw = function() {
        LogUtils_1.LogUtils.warn_csryw("GameMgr.getInstance().preloadScene_csryw\u8fd9\u91cc\u53ef\u4ee5\u52a0\u8f7d\u9700\u8981\u9884\u52a0\u8f7d\u7684\u573a\u666f");
      };
      GameMgr.prototype.onLoadToWorldScene_csryw = function() {
        cc.director.loadScene("FMMainScene", function(err, scene) {
          console.log("\u8df3\u8f6c\u6e38\u620f\u573a\u666f FMMainScene");
        });
      };
      GameMgr.prototype.saveGameData_csryw = function() {
        cc.sys.localStorage.setItem("data" + AppConfig_1.default.AppID_csryw, User_1.default.getSaveData_csryw());
      };
      GameMgr._instance_csryw = new GameMgr();
      return GameMgr;
    }();
    exports.default = GameMgr;
    cc._RF.pop();
  }, {
    "../Config/AppConfig": "AppConfig",
    "../User/User": "User",
    "../Util/LogUtils": "LogUtils"
  } ],
  GameView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8110LH0Z5PvJFESjY7xMnT", "GameView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DialogMgr_1 = require("../../../FrameWork/Mgr/DialogMgr");
    var VibrateMgr_1 = require("../../../FrameWork/Mgr/VibrateMgr");
    var Common_1 = require("../../../FrameWork/Util/Common");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var Utils_1 = require("../../tools/Utils");
    var GamaManager_1 = require("../manager/GamaManager");
    var HeroManager_1 = require("../manager/HeroManager");
    var Messages_1 = require("../message/Messages");
    var BloodBar_1 = require("./BloodBar");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameView = function(_super) {
      __extends(GameView, _super);
      function GameView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.maskAnimNode = null;
        _this.superFlagNode = null;
        _this.moneyWeight = null;
        _this.head = null;
        _this.heroHpBar = null;
        _this.heroHpLabel = null;
        _this.heroEnergyBar = null;
        _this.heroExpBar = null;
        _this.heroLevelLabel = null;
        _this.timeLabels = [];
        _this.heroHurt = null;
        _this.expItemPrefab = null;
        _this.expParent = null;
        _this.batterNode = null;
        _this.bossNameIcon = null;
        _this.bossHpBar = null;
        _this.guide = null;
        _this.crisisTip = null;
        _this.moneyItem = null;
        _this.moneyLabel = null;
        _this.expPool = new cc.NodePool();
        _this.moneyPool = new cc.NodePool();
        return _this;
      }
      GameView.prototype.start = function() {
        this.guide.active = false;
      };
      GameView.prototype.onEnable = function() {
        GlobalMessage_1.GlobalMessage.on(Messages_1.Settlement, this.onGameSettlement, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.StartSelectTco, this.onStartSelectTco, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.HeroHurt, this.onHeroHurt, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.KillMonster, this.onKillMonster, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.BatterShow, this.onBatterShow, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.TryResurrection, this.onTryResurrection, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.BossShow, this.onBossShow, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.GameGuideStart, this.onGameGuide, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.GameGuideEnd, this.onGameGuide, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.DropMoney, this.onDropMoeny, this);
      };
      GameView.prototype.onDisable = function() {
        GlobalMessage_1.GlobalMessage.offAll(this);
        this.expPool.clear();
      };
      GameView.prototype.updateHeroHp = function() {
        this.heroHpBar.fillRange = this.hero.hpPercentage;
        this.heroHpLabel.string = this.hero.hp + "/" + this.hero.getProperty("maxHp");
        this.heroLevelLabel.string = HeroManager_1.default.inst.level + "";
        this.heroExpBar.fillRange = HeroManager_1.default.inst.getExpProgress();
        this.heroEnergyBar.fillRange = this.hero.energy / this.hero.maxEnergy;
        this.superFlagNode.active = this.hero.isSuper;
        this.crisisTip.active = this.hero.hp / this.hero.getProperty("maxHp") <= .3;
      };
      GameView.prototype.updateTime = function() {
        var time = GamaManager_1.default.inst.totalTime;
        var sec = Math.floor(time % 60);
        var min = Math.floor(time / 60);
        this.timeLabels[0].string = Utils_1.default.stringPadding(min + "", 2);
        this.timeLabels[1].string = Utils_1.default.stringPadding(sec + "", 2);
      };
      GameView.prototype.updateBossHpBar = function() {
        var _this = this;
        var boss = this.hero.attackBoss;
        null == boss && (boss = GamaManager_1.default.inst.bossCharacters[0]);
        if (boss != this.tagetBoss) {
          this.tagetBoss = boss;
          if (null != boss) {
            this.bossHpBar.node.active = true;
            this.bossHpBar.setBar(boss.getProperty("maxHp"), 500);
            if (null != boss.config.nameIcon && "" != boss.config.nameIcon) {
              this.bossNameIcon.node.active = true;
              Common_1.default.loadSpriteFrame("subResGame", "Texture/Name/" + boss.config.nameIcon, function(frame) {
                _this.bossNameIcon.spriteFrame = frame;
              });
            } else this.bossNameIcon.node.active = false;
          }
        }
        this.bossHpBar.node.active && this.tagetBoss ? this.bossHpBar.ChangeValue(this.tagetBoss.hp) : this.bossHpBar.node.active = false;
      };
      GameView.prototype.update = function(dt) {
        null != this.hero && null != this.hero.node || (this.hero = GamaManager_1.default.inst.mainCharacter);
        this.hero && null != this.hero.node && this.updateHeroHp();
        this.updateBossHpBar();
        this.updateTime();
      };
      GameView.prototype.onClickSetting = function() {
        GamaManager_1.default.inst.pause();
        DialogMgr_1.default.openSettingDialog({
          callback: function(_, back) {
            back ? cc.director.loadScene("FMMainScene") : GamaManager_1.default.inst.resume();
          },
          target: this
        }, this.node, "view");
      };
      GameView.prototype.onGameSettlement = function() {
        DialogMgr_1.default.openSettlement(this.node);
      };
      GameView.prototype.onStartSelectTco = function(data) {
        GamaManager_1.default.inst.pause();
        DialogMgr_1.default.openTco(this.node, data.options, function() {
          GamaManager_1.default.inst.resume();
        });
      };
      GameView.prototype.onHeroHurt = function() {
        if (null == this.heroHurt) return;
        VibrateMgr_1.default.vibrateShort_csryw();
        this.heroHurt.node.opacity = 0;
        cc.tween(this.heroHurt.node).to(.2, {
          opacity: 255
        }).to(.2, {
          opacity: 0
        }).start();
      };
      GameView.prototype.onMaskOpened = function() {
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.GameStart());
      };
      GameView.prototype.onBatterShow = function() {
        this.batterNode.active = true;
        this.batterNode.getComponentInChildren(cc.Label).string = HeroManager_1.default.inst.batterCount + "";
        this.batterNode.getComponent(cc.Animation).play("Batter");
      };
      GameView.prototype.onTryResurrection = function() {
        DialogMgr_1.default.openResurrection(this.node);
      };
      GameView.prototype.onBossShow = function(data) {};
      GameView.prototype.onGameGuide = function(data) {
        data instanceof Messages_1.GameGuideStart ? this.guide.active = true : this.guide.active = false;
      };
      GameView.prototype.onKillMonster = function(data) {
        return;
        var character;
        var position;
        var node;
        var self;
      };
      GameView.prototype.onDropMoeny = function(data) {
        var position = data.position.clone();
        position = this.node.convertToNodeSpaceAR(position);
        position.x += this.node.width / 2;
        position.y += this.node.height / 2;
        var node = null;
        node = this.moneyPool.size() > 0 ? this.moneyPool.get() : node = cc.instantiate(this.moneyItem);
        node.parent = this.expParent;
        node.active = true;
        node.scale = 1;
        node.setPosition(position);
        this.moneyWeight.convertToWorldSpaceAR(cc.Vec2.ZERO, position);
        this.expParent.convertToNodeSpaceAR(position, position);
        var self = this;
        cc.tween(node).to(.7, {
          x: position.x,
          y: position.y,
          scale: .8
        }).call(function() {
          self.moneyPool.put(node);
        }).start();
        this.moneyLabel.string = GamaManager_1.default.inst.currentMoney + "";
      };
      __decorate([ property(cc.Node) ], GameView.prototype, "maskAnimNode", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "superFlagNode", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "moneyWeight", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "head", void 0);
      __decorate([ property(cc.Sprite) ], GameView.prototype, "heroHpBar", void 0);
      __decorate([ property(cc.Label) ], GameView.prototype, "heroHpLabel", void 0);
      __decorate([ property(cc.Sprite) ], GameView.prototype, "heroEnergyBar", void 0);
      __decorate([ property(cc.Sprite) ], GameView.prototype, "heroExpBar", void 0);
      __decorate([ property(cc.Label) ], GameView.prototype, "heroLevelLabel", void 0);
      __decorate([ property([ cc.Label ]) ], GameView.prototype, "timeLabels", void 0);
      __decorate([ property(cc.Sprite) ], GameView.prototype, "heroHurt", void 0);
      __decorate([ property(cc.Prefab) ], GameView.prototype, "expItemPrefab", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "expParent", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "batterNode", void 0);
      __decorate([ property(cc.Sprite) ], GameView.prototype, "bossNameIcon", void 0);
      __decorate([ property(BloodBar_1.default) ], GameView.prototype, "bossHpBar", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "guide", void 0);
      __decorate([ property(cc.Node) ], GameView.prototype, "crisisTip", void 0);
      __decorate([ property(cc.Prefab) ], GameView.prototype, "moneyItem", void 0);
      __decorate([ property(cc.Label) ], GameView.prototype, "moneyLabel", void 0);
      GameView = __decorate([ ccclass ], GameView);
      return GameView;
    }(cc.Component);
    exports.default = GameView;
    cc._RF.pop();
  }, {
    "../../../FrameWork/Mgr/DialogMgr": "DialogMgr",
    "../../../FrameWork/Mgr/VibrateMgr": "VibrateMgr",
    "../../../FrameWork/Util/Common": "Common",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../../tools/Utils": "Utils",
    "../manager/GamaManager": "GamaManager",
    "../manager/HeroManager": "HeroManager",
    "../message/Messages": "Messages",
    "./BloodBar": "BloodBar"
  } ],
  Gizmos: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a55bfictWNHUabsOcJYvzdg", "Gizmos");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executionOrder = _a.executionOrder;
    var Gizmos = function(_super) {
      __extends(Gizmos, _super);
      function Gizmos() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._graphics = null;
        return _this;
      }
      Gizmos_1 = Gizmos;
      Gizmos.prototype.onLoad = function() {
        Gizmos_1._instance = this;
        this._graphics = this.getComponent(cc.Graphics);
      };
      Gizmos.DrawRay1 = function(p1, p2, color) {
        void 0 === color && (color = cc.Color.RED);
        if (!this.isDebug) return;
        this._instance._graphics.moveTo(p1.x, p1.y);
        this._instance._graphics.lineTo(p2.x, p2.y);
        var orginColor = this._instance._graphics.strokeColor;
        this._instance._graphics.strokeColor = color;
        this._instance._graphics.stroke();
        this._instance._graphics.strokeColor = orginColor;
      };
      Gizmos.DrawRay2 = function(origin, direction, distance, color) {
        void 0 === color && (color = cc.Color.RED);
        if (!this.isDebug) return;
        var tempVec = Gizmos_1._tempVec;
        tempVec.set(direction);
        tempVec.mulSelf(distance);
        tempVec.addSelf(origin);
        this.DrawRay1(origin, tempVec, color);
      };
      Gizmos.DrawCirle = function(origin, r, color) {
        void 0 === color && (color = cc.Color.RED);
        if (!this.isDebug) return;
        var graphics = this._instance._graphics;
        graphics.circle(origin.x, origin.y, r);
        var orginColor = this._instance._graphics.strokeColor;
        this._instance._graphics.strokeColor = color;
        this._instance._graphics.stroke();
        this._instance._graphics.strokeColor = orginColor;
      };
      Gizmos.DrawRect = function(x, y, w, h, color) {
        void 0 === color && (color = cc.Color.RED);
        if (!this.isDebug) return;
        var graphics = this._instance._graphics;
        graphics.rect(x, y, w, h);
        var orginColor = this._instance._graphics.strokeColor;
        this._instance._graphics.strokeColor = color;
        this._instance._graphics.stroke();
        this._instance._graphics.strokeColor = orginColor;
      };
      Gizmos.prototype.update = function() {
        this._graphics.clear();
      };
      var Gizmos_1;
      Gizmos.isDebug = true;
      Gizmos._instance = null;
      Gizmos._tempVec = new cc.Vec2();
      Gizmos = Gizmos_1 = __decorate([ ccclass, requireComponent(cc.Graphics), executionOrder(-99999) ], Gizmos);
      return Gizmos;
    }(cc.Component);
    exports.default = Gizmos;
    cc._RF.pop();
  }, {} ],
  GlobalMessage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d20b29HOSpHu6d16weVWf88", "GlobalMessage");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GlobalMessage = void 0;
    var event = new cc.EventTarget();
    var GlobalMessage = function() {
      function GlobalMessage() {}
      GlobalMessage.getMessageKey = function(type) {
        var className = type["key"];
        "object" == typeof type && (className = type.constructor["key"]);
        return "E_" + className;
      };
      GlobalMessage.on = function(type, callBack, caller) {
        event.on(this.getMessageKey(type), callBack, caller);
      };
      GlobalMessage.emit = function(message) {
        event.emit(this.getMessageKey(message), message);
      };
      GlobalMessage.off = function(type, callBack, caller) {
        event.off(this.getMessageKey(type), callBack, this);
      };
      GlobalMessage.offAll = function(caller) {
        event.targetOff(caller);
      };
      return GlobalMessage;
    }();
    exports.GlobalMessage = GlobalMessage;
    cc._RF.pop();
  }, {} ],
  HeroManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d66d140N1C260Faaf9ehPA", "HeroManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("../../../FrameWork/User/User");
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var ConfigManager_1 = require("../../ConfigManager");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var WeigthsRandom_1 = require("../../tools/WeigthsRandom");
    var Messages_1 = require("../message/Messages");
    var ChaProperty_1 = require("../structs/battle/ChaProperty");
    var EffectManager_1 = require("./EffectManager");
    var GamaManager_1 = require("./GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeroManager = function(_super) {
      __extends(HeroManager, _super);
      function HeroManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tcoLevelMap = {};
        _this.batterCount = 0;
        _this.batterTime = 0;
        _this.batterGoodCount = 0;
        _this.batterGoodTime = 0;
        return _this;
      }
      HeroManager_1 = HeroManager;
      Object.defineProperty(HeroManager, "inst", {
        get: function() {
          return this._inst;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HeroManager.prototype, "currentModel", {
        get: function() {
          return ConfigManager_1.default.characterLevelConfig[this.currIndex];
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HeroManager.prototype, "level", {
        get: function() {
          return this.currIndex + 1;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(HeroManager.prototype, "maxExp", {
        get: function() {
          return this.currentModel.exp;
        },
        enumerable: false,
        configurable: true
      });
      HeroManager.prototype.onLoad = function() {
        HeroManager_1._inst = this;
        this.currIndex = 0;
        this.exp = 0;
      };
      HeroManager.prototype.start = function() {
        this.currIndex = 0;
      };
      HeroManager.prototype.onEnable = function() {
        GlobalMessage_1.GlobalMessage.on(Messages_1.KillMonster, this.onKillEnemy, this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.SelectTco, this.onSelectTco, this);
      };
      HeroManager.prototype.onDisable = function() {
        GlobalMessage_1.GlobalMessage.offAll(this);
      };
      HeroManager.prototype.upgrade = function() {
        this.exp = 0;
        if (this.currIndex == ConfigManager_1.default.characterLevelConfig.length - 1) return;
        this.currIndex++;
        this.currIndex = Math.min(this.currIndex, ConfigManager_1.default.characterLevelConfig.length - 1);
        var hero = GamaManager_1.default.inst.mainCharacter;
        var prop = new ChaProperty_1.default();
        prop.hp = this.currentModel.hp;
        prop.attack = this.currentModel.attack;
        prop.cirt = this.currentModel.cirt;
        prop.catapultForce = this.currentModel.catapultForce;
        prop.range = this.currentModel.range;
        prop.moveSpeed = this.currentModel.moveSpeed;
        hero.InitProperty(prop);
        var options = this.getSelectOptions();
        0 != options.length && GlobalMessage_1.GlobalMessage.emit(Messages_1.StartSelectTco.create(options));
      };
      HeroManager.prototype.randomSelectTcoOptions = function() {
        var selected = [];
        for (var key in this.tcoLevelMap) {
          var level = this.getTcoLevel(key);
          var info = ConfigManager_1.default.getTcoInfoById(key);
          level < info.maxLevel && selected.push(key);
        }
        var result = [];
        if (selected.length > 0) {
          var index = Math.floor(Math.random() * selected.length);
          index = Math.min(index, selected.length - 1);
          result.push(selected[index]);
        }
        return result;
      };
      HeroManager.prototype.randomAllTcoOptions = function(exclude, count) {
        var list = [];
        var tcoConfig = ConfigManager_1.default.tcoConfig;
        for (var i = 0; i < tcoConfig.length; i++) {
          var item = tcoConfig[i];
          var level = this.getTcoLevel(item.id);
          level < item.maxLevel && !exclude.includes(item.id) && list.push({
            key: item.id,
            weight: item.weight
          });
        }
        var result = [];
        var weigthsRandom = new WeigthsRandom_1.default();
        weigthsRandom.weights = list;
        count = Math.min(count, list.length);
        for (var i = 0; i < count; i++) {
          var id = weigthsRandom.Random();
          weigthsRandom.Delete(id);
          result.push(id);
        }
        return result;
      };
      HeroManager.prototype.getSelectOptions = function() {
        var list1 = [];
        User_1.default.getGameTime() % ConfigManager_1.default.gameConfig.time == 0 && (list1 = this.randomSelectTcoOptions());
        var list2 = this.randomAllTcoOptions(list1, 0 != list1.length ? 2 : 3);
        var arr = __spreadArrays(list1, list2);
        return arr;
      };
      HeroManager.prototype.setTcoLevel = function(id, level) {
        void 0 === level && (level = 1);
        this.tcoLevelMap[id] = level;
      };
      HeroManager.prototype.getTcoLevel = function(id) {
        var _a;
        return null !== (_a = this.tcoLevelMap[id]) && void 0 !== _a ? _a : 0;
      };
      HeroManager.prototype.onKillEnemy = function(data) {
        this.exp += 100;
        this.exp >= this.currentModel.exp && this.upgrade();
        var hero = GamaManager_1.default.inst.mainCharacter;
        if (hero.isSuper) {
          this.batterTime < GamaManager_1.default.inst.totalTime && (this.batterCount = 0);
          this.batterCount++;
          this.batterTime = GamaManager_1.default.inst.totalTime + 3;
          GlobalMessage_1.GlobalMessage.emit(new Messages_1.BatterShow());
          this.batterGoodTime < GamaManager_1.default.inst.totalTime && (this.batterGoodCount = 0);
          this.batterGoodCount++;
          if (this.batterGoodCount >= 3 || data.character.config.type > 1) {
            this.batterGoodCount = 0;
            EffectManager_1.default.inst.addEffect("Effect_batter_good", this.node, cc.v2(data.character.node.x, data.character.node.y));
          }
          this.batterGoodTime = GamaManager_1.default.inst.totalTime + .2;
        }
      };
      HeroManager.prototype.getExpProgress = function() {
        return Math.min(1, this.exp / this.currentModel.exp);
      };
      HeroManager.prototype.addTcoBuff = function(info, level) {
        var hero = GamaManager_1.default.inst.mainCharacter;
        this.setTcoLevel(info.id, level);
        var buffIds = ConfigManager_1.default.getTcoBuffList(info.id, level);
        for (var i = 0; i < buffIds.length; i++) hero.addBuff(buffIds[i]);
      };
      HeroManager.prototype.removeTcoBuff = function(info, level) {
        var hero = GamaManager_1.default.inst.mainCharacter;
        var buffIds = ConfigManager_1.default.getTcoBuffList(info.id, level);
        for (var i = 0; i < buffIds.length; i++) hero.removeBuff(buffIds[i]);
      };
      HeroManager.prototype.onSelectTco = function(data) {
        var info = ConfigManager_1.default.getTcoInfoById(data.id);
        var level = this.getTcoLevel(data.id);
        if (0 == level) this.addTcoBuff(info, 1); else {
          this.removeTcoBuff(info, level);
          this.addTcoBuff(info, level + 1);
        }
        TTAPI_1.default.reportAnalytics("selectSkill", {
          id: data.id
        });
      };
      var HeroManager_1;
      HeroManager = HeroManager_1 = __decorate([ ccclass ], HeroManager);
      return HeroManager;
    }(cc.Component);
    exports.default = HeroManager;
    cc._RF.pop();
  }, {
    "../../../FrameWork/User/User": "User",
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../../ConfigManager": "ConfigManager",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../../tools/WeigthsRandom": "WeigthsRandom",
    "../message/Messages": "Messages",
    "../structs/battle/ChaProperty": "ChaProperty",
    "./EffectManager": "EffectManager",
    "./GamaManager": "GamaManager"
  } ],
  Hero: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6251eVCt71Di4/ViWcDWpS7", "Hero");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("../../../FrameWork/User/User");
    var ConfigManager_1 = require("../../ConfigManager");
    var AssetManager_1 = require("../../common/AssetManager");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var AudioManager_1 = require("../manager/AudioManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var Messages_1 = require("../message/Messages");
    var Character_1 = require("./Character");
    var Fbsd_1 = require("./hero/Fbsd");
    var Feidao_1 = require("./hero/Feidao");
    var WeaponTw_1 = require("./hero/WeaponTw");
    var BallMove_1 = require("./movement/BallMove");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var Hero = function(_super) {
      __extends(Hero, _super);
      function Hero() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.invincible = false;
        _this.energy = 0;
        _this.maxEnergy = 100;
        _this.killEnergyGet = .5;
        _this.energyTimer = 0;
        _this.tuoweiParent = null;
        _this.initWeaponFlag = false;
        _this.weaponConfig = null;
        _this.weaponTw = null;
        _this.ultSkillConfig = null;
        _this.inSuper = false;
        return _this;
      }
      Object.defineProperty(Hero.prototype, "isSuper", {
        get: function() {
          return 0 != this.getProperty("supper");
        },
        enumerable: false,
        configurable: true
      });
      Hero.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.ballMove = this.getComponent(BallMove_1.default);
        this.feidaoAbility = this.getComponent(Feidao_1.default);
        this.fbsdAbility = this.getComponent(Fbsd_1.default);
      };
      Hero.prototype.start = function() {};
      Hero.prototype.InitProperty = function(property) {
        _super.prototype.InitProperty.call(this, property);
        false == this.initWeaponFlag && this.initWeapon();
        this.weaponTw && this.weaponTw.updateTuowei();
      };
      Hero.prototype.initWeapon = function() {
        var _a;
        this.initWeaponFlag = true;
        this.weaponConfig = ConfigManager_1.default.getWeaponConfig(User_1.default.useWeaponId);
        var buffs = (null !== (_a = this.weaponConfig.buff) && void 0 !== _a ? _a : "").split("|");
        for (var i = 0; i < buffs.length; i++) {
          this.removeBuff(buffs[i]);
          this.addBuff(buffs[i]);
        }
        this.ultSkillConfig = ConfigManager_1.default.ultSkillConfig["hero_ultskill_1"];
        this.ultSkill = this.addComponent(this.ultSkillConfig.class);
        this.ultSkill.init(this, this.ultSkillConfig);
        var prefab = AssetManager_1.default.getPrefab("WeaponTw_" + this.weaponConfig.id);
        if (prefab) {
          var node = cc.instantiate(prefab);
          node.parent = this.tuoweiParent;
          this.weaponTw = node.getComponent(WeaponTw_1.default);
          this.weaponTw.init(this);
        }
      };
      Hero.prototype.catapult = function(direction) {
        var _a;
        AudioManager_1.default.inst.playSFX("Sound/slide" + Math.floor(1.4 * Math.random()));
        this.ballMove.catapult(direction.mul(.5 * this.getProperty("catapultForce")), .3);
        this.setDirection(Math.sign(direction.x));
        this.getProperty("feidao") > 0 && (null === (_a = this.feidaoAbility) || void 0 === _a ? void 0 : _a.fire(direction, this.getProperty("feidao")));
      };
      Hero.prototype.updateReadProperty = function(name) {
        _super.prototype.updateReadProperty.call(this, name);
        this.weaponTw && this.weaponTw.updateTuowei();
      };
      Hero.prototype.hit = function(target) {
        target.config.type > 1 && (this.attackBoss = target);
        if (target.isDead) {
          this.attackBoss == target && (this.attackBoss = null);
          this.addEnergy(true);
          GlobalMessage_1.GlobalMessage.emit(Messages_1.KillMonster.create(target));
        }
      };
      Hero.prototype.addEnergy = function(isKill) {
        if (this.ultSkill.isRunning) return;
        var add = isKill ? this.getProperty("killEnergyGet") : 1;
        this.energy += add;
        this.energy >= this.maxEnergy && this.useBigSkill();
      };
      Hero.prototype.useBigSkill = function() {
        if (null == this.ultSkill || this.ultSkill.isRunning) return;
        this.energy = 0;
        this.ultSkill.castSkill();
      };
      Hero.prototype.beHurt = function(result) {
        if (this.invincible) return;
        _super.prototype.beHurt.call(this, result);
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.HeroHurt());
      };
      Hero.prototype.dead = function() {
        _super.prototype.dead.call(this);
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.HeroDead());
      };
      Hero.prototype.deadRemove = function() {};
      Hero.prototype.resurrect = function() {
        this.hp = this.getProperty("maxHp");
        this.isDead = false;
      };
      Hero.prototype.fixUpdate = function() {
        _super.prototype.fixUpdate.call(this);
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run) return;
        this.energyTimer -= FixManager_1.default.fixedDeltaTime;
        if (this.energyTimer <= 0) {
          this.energyTimer = 1;
          this.addEnergy(false);
        }
        if (true == this.isSuper) {
          if (false == this.inSuper) {
            this.inSuper = true;
            GlobalMessage_1.GlobalMessage.emit(new Messages_1.HeroSuperStart());
          }
        } else if (true == this.inSuper) {
          this.inSuper = false;
          GlobalMessage_1.GlobalMessage.emit(new Messages_1.HeroSuperEnd());
        }
      };
      __decorate([ property(cc.Node) ], Hero.prototype, "tuoweiParent", void 0);
      Hero = __decorate([ ccclass ], Hero);
      return Hero;
    }(Character_1.default);
    exports.default = Hero;
    cc._RF.pop();
  }, {
    "../../../FrameWork/User/User": "User",
    "../../ConfigManager": "ConfigManager",
    "../../common/AssetManager": "AssetManager",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../manager/AudioManager": "AudioManager",
    "../manager/GamaManager": "GamaManager",
    "../message/Messages": "Messages",
    "./Character": "Character",
    "./hero/Fbsd": "Fbsd",
    "./hero/Feidao": "Feidao",
    "./hero/WeaponTw": "WeaponTw",
    "./movement/BallMove": "BallMove"
  } ],
  HitEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2b9bBvr75DsJ0toFBvvn+J", "HitEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleEffect_1 = require("./BattleEffect");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HitEffect = function(_super) {
      __extends(HitEffect, _super);
      function HitEffect() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      HitEffect.prototype.init = function(data) {
        var direction = data;
        var angle = 180 * Math.atan2(direction.x, direction.y) / Math.PI;
        this.node.angle = angle;
        this.node.scale = 1.3;
      };
      HitEffect = __decorate([ ccclass ], HitEffect);
      return HitEffect;
    }(BattleEffect_1.default);
    exports.default = HitEffect;
    cc._RF.pop();
  }, {
    "./BattleEffect": "BattleEffect"
  } ],
  HttpUnit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c40efu7MRdF+6aINqLysydZ", "HttpUnit");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.requestData = void 0;
    var NetConfig_1 = require("./NetConfig");
    var User_1 = require("../User/User");
    var AesTools_1 = require("./AesTools");
    var AppConfig_1 = require("../Config/AppConfig");
    var LogUtils_1 = require("../Util/LogUtils");
    var AppPlatform_1 = require("../Util/AppPlatform");
    var requestData = function() {
      function requestData() {
        this.meth_csryw = "post";
        this.url_csryw = "";
        this.onSuccess_csryw = null;
        this.onFail_csryw = null;
        this.data_csryw = {};
      }
      return requestData;
    }();
    exports.requestData = requestData;
    var HttpUnit = function() {
      function HttpUnit() {}
      HttpUnit.sendHttpUrl_csryw = function(req, sendMsg, completeFunc, errorFunc, headers) {
        var headersTab = headers || {};
        var xhr = new XMLHttpRequest();
        xhr.onerror = function(error) {
          LogUtils_1.LogUtils.networkError_csryw("\u7f51\u7edc\u8bf7\u6c42\u5f02\u5e38" + error);
          errorFunc("\u7f51\u7edc\u8bf7\u6c42\u5f02\u5e38");
        };
        xhr.ontimeout = function(error) {
          LogUtils_1.LogUtils.networkError_csryw("\u7f51\u7edc\u8d85\u65f6" + error);
          errorFunc("\u7f51\u7edc\u8d85\u65f6");
        };
        xhr.onreadystatechange = function() {
          var readyState = xhr.readyState;
          var status = xhr.status;
          if (4 === readyState) if (status >= 200 && status < 300) {
            var responseText = xhr.responseText;
            LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u6570\u636e\uff1a----------------------");
            LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u5185\u5bb9:" + responseText);
            var response = JSON.parse(responseText);
            completeFunc(response);
          } else {
            var statusText = xhr.statusText;
            LogUtils_1.LogUtils.networkError_csryw("\u63a5\u6536\u6570\u636e\u5f02\u5e38\uff1a----------------------status " + status);
            LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u5185\u5bb9:" + statusText);
            errorFunc(statusText);
          }
        };
        xhr.open(req.meth_csryw, req.url_csryw, true);
        if (headersTab) for (var key in headersTab) xhr.setRequestHeader(key, headersTab[key]);
        LogUtils_1.LogUtils.networkLog_csryw("\u53d1\u9001\u6570\u636e\uff1a----------------------");
        LogUtils_1.LogUtils.networkLog_csryw(req.url_csryw + "  " + req.meth_csryw);
        LogUtils_1.LogUtils.networkLog_csryw(sendMsg);
        LogUtils_1.LogUtils.networkLog_csryw(JSON.stringify(headers));
        LogUtils_1.LogUtils.networkLog_csryw("----------------------");
        xhr.send(sendMsg);
      };
      HttpUnit.request_csryw = function(req) {
        req.url_csryw.indexOf("https://") > -1 || req.url_csryw.indexOf("http://") > -1 ? req.url_csryw = req.url_csryw : req.url_csryw = NetConfig_1.default.serverUrl_csryw + req.url_csryw;
        var completeFunc = function(res) {
          LogUtils_1.LogUtils.networkLog_csryw(res, "http Success");
          req.onSuccess_csryw && req.onSuccess_csryw(res);
          req.onSuccess_csryw = null;
          req = null;
        };
        var fail = req.onFail_csryw;
        var errorFunc = function(res) {
          LogUtils_1.LogUtils.networkLog_csryw(res, "http fail");
          fail && fail(res);
          req && (req.onFail_csryw = null);
          fail = null;
          req = null;
        };
        AppPlatform_1.default.is_OPPO_GAME_csryw() ? req.data_csryw.oppotoken = User_1.default.code_csryw : AppPlatform_1.default.is_Android_csryw() && (req.data_csryw.sbh = User_1.default.code_csryw);
        req.data_csryw.code = User_1.default.code_csryw;
        var time = "time=" + String(Date.now());
        var headers = {};
        headers["Content-Type"] = "application/json";
        headers["state"] = AppConfig_1.default.state_csryw;
        headers["gameid"] = AppConfig_1.default.gameid_csryw;
        headers["sign"] = AesTools_1.default.encrypt_csryw(time);
        User_1.default.token_csryw && (headers["token"] = User_1.default.token_csryw);
        var sendMsg = null;
        req.data_csryw && (sendMsg = JSON.stringify(req.data_csryw));
        this.sendHttpUrl_csryw(req, sendMsg, completeFunc, errorFunc, headers);
      };
      HttpUnit.getServerTime_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.Get_ServerTime_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.login_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.Login_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.saveGameData_csryw = function(gameData, onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.SaveGameData_csryw;
        req.data_csryw.gameData = gameData;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.getGameData_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.GetUser_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.GetIpBlock_csryw = function(onSuccess, onFail) {
        if (-1 != AppConfig_1.default.gameid_csryw) {
          console.error("\u542f\u52a8\u65b0\u7248\u672c\u7684\u5c4f\u853d\u7cfb\u7edf");
          var url = "https://wxxyx.renyouwangluo.cn/renyou_other_template/ipLogin";
          var headersTab = {};
          var xhr_1 = new XMLHttpRequest();
          xhr_1.timeout = 15e3;
          xhr_1.onerror = function(error) {
            LogUtils_1.LogUtils.networkError_csryw("\u7f51\u7edc\u8bf7\u6c42\u5f02\u5e38" + error);
            onFail("\u7f51\u7edc\u8bf7\u6c42\u5f02\u5e38");
          };
          xhr_1.ontimeout = function(error) {
            LogUtils_1.LogUtils.networkError_csryw("\u7f51\u7edc\u8d85\u65f6" + error);
            onFail("\u7f51\u7edc\u8d85\u65f6");
          };
          xhr_1.onreadystatechange = function() {
            var readyState = xhr_1.readyState;
            var status = xhr_1.status;
            if (4 === readyState) {
              var tab = {
                code: 1
              };
              if (status >= 200 && status < 300) {
                var responseText = xhr_1.responseText;
                LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u6570\u636e\uff1a----------------------");
                LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u5185\u5bb9:" + responseText);
                var response = JSON.parse(responseText);
                if (response && 0 == response.isBlackIp) {
                  tab.code = 0;
                  console.error("\u65b0\u7248\u672c\u7684\u5c4f\u853d\u7cfb\u7edf  \u4e0d\u5c4f\u853d");
                } else console.error("\u65b0\u7248\u672c\u7684\u5c4f\u853d\u7cfb\u7edf  ", responseText);
                onSuccess(tab);
              } else {
                var statusText = xhr_1.statusText;
                LogUtils_1.LogUtils.networkError_csryw("\u63a5\u6536\u6570\u636e\u5f02\u5e38\uff1a----------------------status " + status);
                LogUtils_1.LogUtils.networkLog_csryw("\u63a5\u6536\u5185\u5bb9:" + statusText);
                onSuccess(tab);
              }
            }
          };
          xhr_1.open("POST", url, true);
          headersTab["Content-Type"] || (headersTab["Content-Type"] = "application/json");
          if (headersTab) for (var key in headersTab) xhr_1.setRequestHeader(key, headersTab[key]);
          var params = {
            gameId: AppConfig_1.default.gameid_csryw
          };
          var sendMsg = JSON.stringify(params);
          xhr_1.send(sendMsg);
        }
      };
      HttpUnit.reportExport_csryw = function(appid, game_name, onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.reportExport_csryw;
        req.data_csryw.wbappid = appid;
        req.data_csryw.game_name = game_name;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.reportImport_csryw = function(appid, channel, onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.reportImport_csryw;
        req.data_csryw.wbappid = appid;
        req.data_csryw.channel = channel;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.Getuserip_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.getuserip_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.SignIn_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.signin_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        req.data_csryw.type = 1;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.GetSignIn_csryw = function(onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.signin_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        req.data_csryw.type = 0;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.reportTTLaunchChannel_csryw = function(ak, cd, bid, onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.ttReportLaunchChannel_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        req.data_csryw.ak = ak;
        req.data_csryw.bid = bid;
        req.data_csryw.cd = cd;
        HttpUnit.request_csryw(req);
      };
      HttpUnit.userScanCode_csryw = function(data, onSuccess, onFail) {
        var req = new requestData();
        req.url_csryw = NetConfig_1.default.userScanCode_csryw;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        req.data_csryw.code = data.code;
        req.data_csryw.state = data.state;
        req.data_csryw.type = data.type;
        req.data_csryw.scan = data.scan;
        HttpUnit.request_csryw(req);
      };
      return HttpUnit;
    }();
    exports.default = HttpUnit;
    cc._RF.pop();
  }, {
    "../Config/AppConfig": "AppConfig",
    "../User/User": "User",
    "../Util/AppPlatform": "AppPlatform",
    "../Util/LogUtils": "LogUtils",
    "./AesTools": "AesTools",
    "./NetConfig": "NetConfig"
  } ],
  IActionConsumer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fc738TawD5FP55L06shJapa", "IActionConsumer");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IMoveProvider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a71deKoLnRD5ZWkZojLHoFq", "IMoveProvider");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  ImmuneEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "736186EH1BCsbdheeCZILPK", "ImmuneEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ImmuneEffect = function(_super) {
      __extends(ImmuneEffect, _super);
      function ImmuneEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.effect = null;
        return _this;
      }
      ImmuneEffect.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
        this.node.on("ADD_IMMUNE", this.onAddShield, this);
        this.node.on("IMMUNE_BREA_BROKEN", this.onShieldBroken, this);
      };
      ImmuneEffect.prototype.onAddShield = function() {
        this.effect.node.active = true;
        this.effect.setAnimation(0, "play", true);
      };
      ImmuneEffect.prototype.onShieldBroken = function() {
        this.effect.setAnimation(0, "sui", false);
      };
      __decorate([ property(sp.Skeleton) ], ImmuneEffect.prototype, "effect", void 0);
      ImmuneEffect = __decorate([ ccclass ], ImmuneEffect);
      return ImmuneEffect;
    }(cc.Component);
    exports.default = ImmuneEffect;
    cc._RF.pop();
  }, {
    "../Character": "Character"
  } ],
  InputSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bea81oBDTZBMorPttyQz4i8", "InputSystem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Input = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var _temp = new cc.Vec2();
    var Input = function() {
      function Input() {
        this.direction = new cc.Vec2();
      }
      Input.prototype.reset = function() {
        this.slide = false;
        this.direction.set(cc.Vec2.ZERO);
      };
      return Input;
    }();
    exports.Input = Input;
    var InputSysten = function(_super) {
      __extends(InputSysten, _super);
      function InputSysten() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.slideThreshold = 5;
        _this._touching = false;
        _this._touchStartPos = new cc.Vec2();
        _this._touchPos = new cc.Vec2();
        _this._lastTouchPos = new cc.Vec2();
        _this._direction = new cc.Vec2();
        _this._lastSlidePos = new cc.Vec2();
        _this._slide = false;
        return _this;
      }
      InputSysten.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      };
      InputSysten.prototype.onTouchStart = function(e) {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this._touching = true;
        this._touchId = e.getID();
        this._touchStartPos.set(e.getLocation());
        this._touchPos.set(e.getLocation());
        this._lastTouchPos.set(e.getLocation());
        this._lastSlidePos.set(e.getLocation());
      };
      InputSysten.prototype.onTouchMove = function(e) {
        if (this._touchId != e.getID()) return;
        this._touchPos.set(e.getLocation());
        this.processSlide(true);
      };
      InputSysten.prototype.onTouchEnd = function(e) {
        if (this._touchId != e.getID()) return;
        this._touching = false;
        this._touchPos.set(e.getLocation());
        this.processSlide(false);
      };
      InputSysten.prototype.processSlide = function(move) {
        if (this._touchPos.equals(this._lastSlidePos)) return;
        var distance = 0;
        var targetPos = move ? this._lastSlidePos : this._touchStartPos;
        var slideThreshold = move ? 160 : this.slideThreshold;
        distance = cc.Vec2.distance(targetPos, this._touchPos);
        if (distance < slideThreshold) return;
        this._slide = true;
        this._touchPos.sub(targetPos, this._direction);
        this._direction.divSelf(distance);
        this._lastSlidePos.set(this._touchPos);
      };
      InputSysten.prototype.accumulateInput = function(input, dt) {
        if (this._slide) {
          this._slide = this._slide;
          input.slide = true;
          input.direction.set(this._direction);
          this._slide = false;
        }
      };
      InputSysten.prototype.clear = function() {
        this._slide = false;
        this._direction.set(cc.Vec2.ZERO);
      };
      InputSysten.prototype.update = function(dt) {
        this._lastTouchPos.lerp(this._touchPos, .8, this._lastTouchPos);
      };
      __decorate([ property(cc.Float) ], InputSysten.prototype, "slideThreshold", void 0);
      InputSysten = __decorate([ ccclass ], InputSysten);
      return InputSysten;
    }(cc.Component);
    exports.default = InputSysten;
    cc._RF.pop();
  }, {} ],
  KSAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9a5a6ijHxFjKvDcmBIW2QS", "KSAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var KSAPI = function() {
      function KSAPI() {}
      KSAPI.init_csryw = function() {
        this.KS && this.KS.init({
          appId: this.App_ID
        });
      };
      KSAPI.readyGo_csryw = function() {
        this.KS && this.KS.readyGo();
      };
      KSAPI.login_csryw = function(onSuccess, onFail) {
        this.KS && this.KS.login({
          success: function(result) {
            console.log("\u767b\u5f55\u6210\u529f" + JSON.stringify(result));
            var gameToken = result.gameToken;
            var gameUserId = result.gameUserId;
            onSuccess(result.gameToken);
          },
          fail: function(result) {
            console.log("\u767b\u5f55\u5931\u8d25" + JSON.stringify(result));
            onFail(result);
          }
        });
      };
      KSAPI.loadSubPackage_csryw = function(packageName, onSuccess, onFail, onProgress) {
        var subpackageSupport = this.KS.isSupport(this.KS.Support.features.Subpackage);
        if (!subpackageSupport) {
          window["require"](packageName + "/main.js");
          onSuccess();
          return;
        }
        var loadTask = this.KS.loadSubpackage({
          name: packageName,
          success: function(res) {
            onSuccess(res);
          },
          fail: function(err) {
            console.log(err);
            onFail(err);
          }
        });
        loadTask.onProgressUpdate(function(res) {
          console.log(res);
          onProgress(res);
        });
      };
      KSAPI.onRewardVideo_csryw = function(result) {
        console.log("\u6fc0\u52b1\u89c6\u9891\u5956\u52b1\u56de\u8c03: ", JSON.stringify(result), KSAPI.isPlaySuccess);
        KSAPI.onRewardCallBack && KSAPI.onRewardCallBack(KSAPI.isPlaySuccess);
      };
      KSAPI.onCloseVideo_csryw = function(result) {
        console.log("\u6fc0\u52b1\u89c6\u9891\u5173\u95ed\u56de\u8c03: ", JSON.stringify(result), KSAPI.isPlaySuccess);
        KSAPI.onCloseCallBack && KSAPI.onCloseCallBack(false);
      };
      KSAPI.regRewardedVideoAdEvent_csryw = function(rewardedVideoAd) {
        rewardedVideoAd.onReward(KSAPI.onRewardVideo_csryw);
        rewardedVideoAd.onClose(KSAPI.onCloseVideo_csryw);
        KSAPI.isRegisterVideoEvent = true;
      };
      KSAPI.showRewardedVideoAd_csryw = function(onClosed, onFailed, onRewarded) {
        if (this.KS) {
          KSAPI.onCloseCallBack = onClosed;
          KSAPI.onRewardCallBack = onRewarded;
          var rewardedVideoAd = this.KS.createRewardedVideoAd({
            adUnitId: KSAPI.adUnitId
          });
          KSAPI.isPlaySuccess = false;
          if (rewardedVideoAd) {
            KSAPI.isRegisterVideoEvent || KSAPI.regRewardedVideoAdEvent_csryw(rewardedVideoAd);
            rewardedVideoAd.show({
              success: function() {
                console.log("\u6fc0\u52b1\u89c6\u9891\u64ad\u653e\u6210\u529f");
                KSAPI.isPlaySuccess = true;
              },
              fail: function(result) {
                console.log("\u6fc0\u52b1\u89c6\u9891\u64ad\u653e\u5931\u8d25: " + JSON.stringify(result));
                onFailed();
              }
            });
          } else {
            console.log("\u6fc0\u52b1\u89c6\u9891\u64ad\u653e\u5931\u8d25!");
            onFailed();
          }
        } else onRewarded();
      };
      KSAPI.createRecord_csryw = function() {
        if (this.KS) {
          this.record = this.KS.createMediaRecorder();
          if (this.record) {
            var self_1 = this;
            this.record.onStart(function() {
              console.log("\u5f55\u9891\u5f00\u59cb\u6210\u529f");
            });
            this.record.onStop(function(data) {
              self_1.recordVideoID = data.videoID;
              console.log("\u5f55\u9891\u505c\u6b62\u6210\u529f " + JSON.stringify(data) + " ");
            });
            this.record.onError(function(error) {
              console.log("\u5f55\u9891\u8fc7\u7a0b\u4e2d\u53d1\u751f\u9519\u8bef " + JSON.stringify(error) + " ");
            });
            this.record.onPause(function() {
              console.log("\u6682\u505c\u5f55\u5236\u6210\u529f!");
            });
            this.record.onResume(function() {
              console.log("\u6062\u590d\u5f55\u5236\u6210\u529f!");
            });
          } else {
            console.log("\u8be5\u7248\u672c\u4e0d\u652f\u6301\u5f55\u5c4f!");
            this.isCanRecord = false;
          }
        }
      };
      KSAPI.startRecord_csryw = function() {
        this.stopRecord_csryw();
        if (this.KS) {
          KSAPI.recordStartTime = new Date().getTime();
          null == this.record && this.createRecord_csryw();
          this.record && this.record.start();
        }
      };
      KSAPI.stopRecord_csryw = function() {
        if (this.KS && this.record) {
          KSAPI.recordStopTime = new Date().getTime();
          this.record.stop();
        }
      };
      KSAPI.pauseRecord_csryw = function() {
        if (this.KS && this.record) {
          KSAPI.recordPauseTime = new Date().getTime();
          this.record.pause();
        }
      };
      KSAPI.resumeRecord_csryw = function() {
        if (this.KS && this.record) {
          KSAPI.recordResumeTime = new Date().getTime();
          this.record.resume();
        }
      };
      KSAPI.shareRecord_csryw = function(onCompleted, onFailed) {
        void 0 === onCompleted && (onCompleted = null);
        void 0 === onFailed && (onFailed = null);
        this.KS && this.record && this.record.publishVideo({
          video: this.recordVideoID,
          mouldId: this.adMoudleId,
          callback: function(error) {
            if (null != error && void 0 != error) {
              console.log("\u5206\u4eab\u5f55\u5c4f\u5931\u8d25: " + JSON.stringify(error));
              onFailed && onFailed();
              return;
            }
            console.log("\u5206\u4eab\u5f55\u5c4f\u6210\u529f");
            onCompleted && onCompleted();
          }
        });
      };
      KSAPI.onHide_csryw = function(onCompleted) {
        this.KS && this.KS.onHide(onCompleted);
      };
      KSAPI.onShow_csryw = function(onCompleted) {
        this.KS && this.KS.onShow(onCompleted);
      };
      KSAPI.getLocation_csryw = function() {
        var _this = this;
        this.KS && this.KS.getLocation({
          success: function(result) {
            console.log("\u83b7\u53d6\u5730\u7406\u4f4d\u7f6e\u6210\u529f:" + JSON.stringify(result));
            _this.location = result.province + result.city;
          },
          fail: function(error) {
            console.log("\u83b7\u53d6\u5730\u7406\u4f4d\u7f6e\u5931\u8d25:" + JSON.stringify(error));
          }
        });
      };
      KSAPI.showInterstitialAd = function(onAdClose, onFail) {
        if (this.KS) {
          console.log("\u63d2\u5c4f\u63d2\u5c4fcreate....................");
          var interstitialAd_1 = this.KS.createInterstitialAd({
            adUnitId: AppConfig_1.default.ks_InsAdUnitId_csryw
          });
          interstitialAd_1.show().then(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u5c55\u793a\u6210\u529f\uff01");
          }).catch(function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u663e\u793a\u5931\u8d25\uff1a", JSON.stringify(err));
          });
          interstitialAd_1.onClose(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u5173\u95ed");
            interstitialAd_1.destroy();
            onAdClose && onAdClose();
          });
        }
      };
      KSAPI.App_ID = "ks716072342233021082";
      KSAPI.KS = window["kwaigame"];
      KSAPI.adUnitId = "2300003758_01";
      KSAPI.adMoudleId = null;
      KSAPI.isRegisterVideoEvent = false;
      KSAPI.onRewardCallBack = null;
      KSAPI.onCloseCallBack = null;
      KSAPI.recordStartTime = 0;
      KSAPI.recordStopTime = 0;
      KSAPI.recordPauseTime = 0;
      KSAPI.recordResumeTime = 0;
      KSAPI.recordVideoID = null;
      KSAPI.isCanRecord = true;
      KSAPI.location = null;
      KSAPI.isPlaySuccess = false;
      return KSAPI;
    }();
    exports.default = KSAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig"
  } ],
  LoadingView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c6yp8JpK9ZcRBOOviij+", "LoadingView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
    var LoadingView = function(_super) {
      __extends(LoadingView, _super);
      function LoadingView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        return _this;
      }
      LoadingView.prototype.onLoad = function() {
        this.setProcess_csryw(0);
      };
      LoadingView.prototype.setProcess_csryw = function(process) {
        process < 0 ? process = 0 : process > 1 && (process = 1);
        this.progressBar.progress = process;
      };
      LoadingView.prototype.getProcess_csryw = function() {
        return this.progressBar.progress;
      };
      __decorate([ property({
        tooltip: "\u8fdb\u5ea6\u6761",
        type: cc.ProgressBar
      }) ], LoadingView.prototype, "progressBar", void 0);
      LoadingView = __decorate([ ccclass, disallowMultiple(), menu("FrameWork\u7ec4\u4ef6/LoadingView") ], LoadingView);
      return LoadingView;
    }(cc.Component);
    exports.default = LoadingView;
    cc._RF.pop();
  }, {} ],
  LogUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "030ecwzd3BB0oWLzUfn/dol", "LogUtils");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LogUtils = void 0;
    var LogUtils = function() {
      function LogUtils() {}
      LogUtils.setLogStatus = function(flag) {
        LogUtils._logStatus_csryw = flag;
      };
      LogUtils.log_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.log.apply(console, __spreadArrays([ "[log][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.info_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.debug.apply(console, __spreadArrays([ "[debug][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.warn_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.warn.apply(console, __spreadArrays([ "[warn][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.error_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.error.apply(console, __spreadArrays([ "[error][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.networkLog_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.log.apply(console, __spreadArrays([ "[network][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.networkError_csryw = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) optionalParams[_i - 1] = arguments[_i];
        if (!LogUtils._logStatus_csryw) return;
        console.error.apply(console, __spreadArrays([ "[network][", LogUtils.getFullTime_csryw(), "]", ":", message ], optionalParams));
      };
      LogUtils.getFullTime_csryw = function() {
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "-" + date.getMilliseconds();
      };
      LogUtils._logStatus_csryw = true;
      return LogUtils;
    }();
    exports.LogUtils = LogUtils;
    window.LogUtils = LogUtils;
    cc._RF.pop();
  }, {} ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1cbf7NzsSZAopnEpDM060/i", "Main");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LoadingView_1 = require("./View/Logo/LoadingView");
    var AppPlatform_1 = require("./Util/AppPlatform");
    var AppConfig_1 = require("./Config/AppConfig");
    var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
    var LogUtils_1 = require("./Util/LogUtils");
    var BundleMgr_1 = require("./Mgr/BundleMgr");
    var GameMgr_1 = require("./Mgr/GameMgr");
    var User_1 = require("./User/User");
    var RYSDK_1 = require("./RYSDK/RYSDK");
    var ResSubMgr_1 = require("./Mgr/ResSubMgr");
    var KSAPI_1 = require("../Platform/ks/KSAPI");
    var ConfigManager_1 = require("../scripts/ConfigManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Main = function(_super) {
      __extends(Main, _super);
      function Main() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loadingPrefab = null;
        _this.loadSubpackageTotal_csryw = .8;
        _this.loadHttpNetworkTotal_csryw = 1;
        _this.subpackageIndex_csryw = 0;
        _this.subpackageSum_csryw = 0;
        _this.needProcessNum_csryw = 0;
        _this.loadingState_csryw = 0;
        _this.loadingSpeed_csryw = 0;
        return _this;
      }
      Main.prototype.onLoad = function() {
        var _this = this;
        if (AppPlatform_1.default.is_TT_GAME_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.TT_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.TT_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.TT_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.TT_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.TT_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.TT_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.TT_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.TT_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.TT_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.TT_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.TT_MoreGameLocationID_csryw;
        } else if (AppPlatform_1.default.is_KS_csryw()) {
          console.log(" --- mian kwaigame ===== ");
          KSAPI_1.default.init_csryw();
          AppConfig_1.default.AppID_csryw = KSAPI_1.default.App_ID;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.KS_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.KS_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
        } else if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.WX_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.WX_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.WX_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.WX_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.WX_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = true;
          AppConfig_1.default.closeUseRYSDK_csryw && (AppConfig_1.default.UseRYSDK_csryw = false);
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.WX_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.WX_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.WX_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.WX_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.WX_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.WX_MoreGameLocationID_csryw;
        } else if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.QQ_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.QQ_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.QQ_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.QQ_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.QQ_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.QQ_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.QQ_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.QQ_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.QQ_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.QQ_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.QQ_MoreGameLocationID_csryw;
        } else if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.OPPO_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.OPPO_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.OPPO_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.OPPO_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.OPPO_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.OPPO_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.OPPO_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.OPPO_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.OPPO_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.OPPO_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.OPPO_MoreGameLocationID_csryw;
        } else if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.VIVO_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.VIVO_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.VIVO_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.VIVO_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.VIVO_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.VIVO_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.VIVO_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.VIVO_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.VIVO_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.VIVO_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.VIVO_MoreGameLocationID_csryw;
        } else if (AppPlatform_1.default.is_Android_csryw() || AppPlatform_1.default.is_Iphone_csryw()) {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.APK_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.APK_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.APK_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.APK_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.APK_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
        } else {
          AppConfig_1.default.AppID_csryw = AppConfig_1.default.WX_APP_ID_csryw;
          AppConfig_1.default.state_csryw = AppConfig_1.default.WX_state_csryw;
          AppConfig_1.default.gameid_csryw = AppConfig_1.default.WX_gameid_csryw;
          AppConfig_1.default.ResServer_csryw = AppConfig_1.default.WX_ResServer_csryw;
          AppConfig_1.default.Versions_csryw = AppConfig_1.default.WX_Versions_csryw;
          AppConfig_1.default.UseRYSDK_csryw = false;
          AppConfig_1.default.LoopAdLocationID_csryw = AppConfig_1.default.WX_LoopAdLocationID_csryw;
          AppConfig_1.default.BannerAdLocationID_csryw = AppConfig_1.default.WX_BannerAdLocationID_csryw;
          AppConfig_1.default.InsertAdLocationID_csryw = AppConfig_1.default.WX_InsertAdLocationID_csryw;
          AppConfig_1.default.AniAdLocationID_csryw = AppConfig_1.default.WX_AniAdLocationID_csryw;
          AppConfig_1.default.HistoryLocationID_csryw = AppConfig_1.default.WX_HistoryLocationID_csryw;
          AppConfig_1.default.MoreGameLocationID_csryw = AppConfig_1.default.WX_MoreGameLocationID_csryw;
        }
        this.loadView_csryw = this.loadingPrefab.getComponent(LoadingView_1.default);
        this.subpackageSum_csryw = AppConfig_1.default.subResArray_csryw.length;
        this.loadView_csryw.setProcess_csryw(0);
        AppSwitchConfig_1.default.getInstance_csryw().loadUrlConfig_csryw(handleFM_csryw(function() {
          LogUtils_1.LogUtils.log_csryw("\u52a0\u8f7d AppSwitchConfig \u5b8c\u6210");
          _this.loadSubpackage_csryw();
        }, this), handleFM_csryw(function() {
          console.log("\u52a0\u8f7d\u5931\u8d25\u3002\u3002\u3002");
        }, this));
        AppPlatform_1.default.checkUpdate_csryw();
      };
      Main.prototype.start = function() {};
      Main.prototype.loadSubpackage_csryw = function() {
        var _this = this;
        var self = this;
        if (this.subpackageIndex_csryw < this.subpackageSum_csryw) {
          var subpackageName_1 = AppConfig_1.default.subResArray_csryw[this.subpackageIndex_csryw];
          var proSum = (this.subpackageIndex_csryw + 1) / this.subpackageSum_csryw * self.loadSubpackageTotal_csryw;
          this.setStartLoadingPerNum_csryw(proSum);
          BundleMgr_1.default.loadBundleByName_csryw(subpackageName_1, handleFM_csryw(function(err, bundle) {
            if (err) console.error(err); else {
              self.subpackageIndex_csryw = self.subpackageIndex_csryw + 1;
              ResSubMgr_1.ResSubMgr.loadSubpackageFinish_csryw(subpackageName_1, handleFM_csryw(function() {
                self.loadSubpackage_csryw();
              }, _this));
            }
          }, this));
        } else this.onLoadResComplate_csryw();
      };
      Main.prototype.setStartLoadingPerNum_csryw = function(preNum) {
        this.setLoadingState_csryw(1, preNum);
      };
      Main.prototype.setLoadingState_csryw = function(state, preNum) {
        this.loadingState_csryw = state;
        this.needProcessNum_csryw = preNum;
        switch (state) {
         case 0:
          break;

         case 1:
          this.loadingSpeed_csryw = 1 / 80;
          break;

         case 2:
          this.loadingSpeed_csryw = .005;
          break;

         case 3:
          var precess = this.loadView_csryw.getProcess_csryw();
          var psum = 1 - precess;
          this.loadingSpeed_csryw = psum > 0 ? psum / 20 : .5;
        }
      };
      Main.prototype.update = function(dt) {
        if (this.loadView_csryw) {
          var precess = this.loadView_csryw.getProcess_csryw();
          var nextPrecess = precess + this.loadingSpeed_csryw;
          switch (this.loadingState_csryw) {
           case 0:
            break;

           case 1:
            if (nextPrecess >= .7 * this.needProcessNum_csryw) {
              nextPrecess >= this.needProcessNum_csryw && (nextPrecess = this.needProcessNum_csryw);
              this.setLoadingState_csryw(2, this.needProcessNum_csryw);
            }
            break;

           case 2:
            nextPrecess >= this.needProcessNum_csryw && (nextPrecess = this.needProcessNum_csryw);
            break;

           case 3:
            if (nextPrecess >= 1) {
              nextPrecess = 1;
              this.loadingState_csryw = 4;
            }
          }
          precess != nextPrecess && this.loadView_csryw.setProcess_csryw(nextPrecess);
        }
      };
      Main.prototype.setDownloadOver_csryw = function() {
        this.initGame_csryw();
        this.setLoadingState_csryw(3, 1);
      };
      Main.prototype.onLoadResComplate_csryw = function() {
        var self = this;
        this.setStartLoadingPerNum_csryw(this.loadHttpNetworkTotal_csryw);
        GameMgr_1.default.getInstance_csryw().preloadScene_csryw();
        var data = cc.sys.localStorage.getItem("data" + AppConfig_1.default.AppID_csryw);
        data ? User_1.default.initiUser_csryw(JSON.parse(data)) : User_1.default.initiUser_csryw(null);
        ConfigManager_1.default.loadConfigs(function() {
          self.setDownloadOver_csryw();
        });
      };
      Main.prototype.initGame_csryw = function() {
        if (AppPlatform_1.default.is_KS_csryw()) AppPlatform_1.default.loginPlatform_csryw(function(code) {
          console.log("\u767b\u9646\u6210\u529f\uff0c\u8fdb\u884c\u521d\u59cb\u5316");
          GameMgr_1.default.getInstance_csryw().onLoadToWorldScene_csryw();
        }, null); else if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          console.log("\u5c0f\u6e38\u620f\u8bbe\u7f6e\u8f6c\u53d1\u6309\u94ae");
          window["wx"].showShareMenu({
            withShareTicket: false,
            success: function() {},
            fail: function() {},
            complete: function() {}
          });
          window["wx"].onShareAppMessage(function() {
            return {
              title: "",
              imageUrl: ""
            };
          });
          window["wx"].onShow(function() {
            console.log("\u5fae\u4fe1 \u663e\u793a\u5728\u524d\u53f0");
            AppPlatform_1.default.isBackGameWX = true;
          });
          var self = this;
          AppPlatform_1.default.loginPlatform_csryw(function(code) {
            console.log("\u767b\u9646\u6210\u529f\uff0c\u8fdb\u884c\u521d\u59cb\u5316");
            GameMgr_1.default.getInstance_csryw().onLoadToWorldScene_csryw();
            AppConfig_1.default.UseRYSDK_csryw && RYSDK_1.default.init_csryw(code);
          }, null);
        } else AppPlatform_1.default.is_TT_GAME_csryw() ? AppPlatform_1.default.loginPlatform_csryw(function(code) {
          console.log("\u767b\u9646\u6210\u529f\uff0c\u8fdb\u884c\u521d\u59cb\u5316");
          GameMgr_1.default.getInstance_csryw().onLoadToWorldScene_csryw();
        }, null) : GameMgr_1.default.getInstance_csryw().onLoadToWorldScene_csryw();
      };
      Main.isBack_csryw = false;
      __decorate([ property({
        tooltip: "\u52a0\u8f7d\u9875\u9762\u9884\u652f",
        type: cc.Node
      }) ], Main.prototype, "loadingPrefab", void 0);
      Main = __decorate([ ccclass ], Main);
      return Main;
    }(cc.Component);
    exports.default = Main;
    cc._RF.pop();
  }, {
    "../Platform/ks/KSAPI": "KSAPI",
    "../scripts/ConfigManager": "ConfigManager",
    "./Config/AppConfig": "AppConfig",
    "./Config/AppSwitchConfig": "AppSwitchConfig",
    "./Mgr/BundleMgr": "BundleMgr",
    "./Mgr/GameMgr": "GameMgr",
    "./Mgr/ResSubMgr": "ResSubMgr",
    "./RYSDK/RYSDK": "RYSDK",
    "./User/User": "User",
    "./Util/AppPlatform": "AppPlatform",
    "./Util/LogUtils": "LogUtils",
    "./View/Logo/LoadingView": "LoadingView"
  } ],
  Messages: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90a9aBSWlpGvp4JFt+G6P7A", "Messages");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HeroSuperEnd = exports.HeroSuperStart = exports.DropMoney = exports.GameGuideEnd = exports.GameGuideStart = exports.BossShow = exports.BlackMaskHide = exports.BlackMaskShow = exports.BatterShow = exports.GameStart = exports.HeroHurt = exports.SelectTco = exports.StartSelectTco = exports.RemoveEffect = exports.AddEffect = exports.TryResurrection = exports.Settlement = exports.HeroDead = exports.KillMonster = exports.MonsterDead = void 0;
    var MonsterDead = function() {
      function MonsterDead() {}
      MonsterDead.key = "MonsterDead";
      return MonsterDead;
    }();
    exports.MonsterDead = MonsterDead;
    var KillMonster = function() {
      function KillMonster() {}
      KillMonster.create = function(character) {
        var data = new KillMonster();
        data.character = character;
        return data;
      };
      KillMonster.key = "KillMonster";
      return KillMonster;
    }();
    exports.KillMonster = KillMonster;
    var HeroDead = function() {
      function HeroDead() {}
      HeroDead.key = "HeroDead";
      return HeroDead;
    }();
    exports.HeroDead = HeroDead;
    var Settlement = function() {
      function Settlement() {}
      Settlement.key = "Settlement";
      return Settlement;
    }();
    exports.Settlement = Settlement;
    var TryResurrection = function() {
      function TryResurrection() {}
      TryResurrection.key = "TryResurrection";
      return TryResurrection;
    }();
    exports.TryResurrection = TryResurrection;
    var AddEffect = function() {
      function AddEffect() {}
      AddEffect.key = "AddEffect";
      return AddEffect;
    }();
    exports.AddEffect = AddEffect;
    var RemoveEffect = function() {
      function RemoveEffect() {}
      RemoveEffect.key = "RemoveEffect";
      return RemoveEffect;
    }();
    exports.RemoveEffect = RemoveEffect;
    var StartSelectTco = function() {
      function StartSelectTco() {}
      StartSelectTco.create = function(options) {
        var data = new StartSelectTco();
        data.options = options;
        return data;
      };
      StartSelectTco.key = "HeroLevelUp";
      return StartSelectTco;
    }();
    exports.StartSelectTco = StartSelectTco;
    var SelectTco = function() {
      function SelectTco() {}
      SelectTco.create = function(id) {
        var data = new SelectTco();
        data.id = id;
        return data;
      };
      SelectTco.key = "SelectTco";
      return SelectTco;
    }();
    exports.SelectTco = SelectTco;
    var HeroHurt = function() {
      function HeroHurt() {}
      HeroHurt.key = "HeroHurt";
      return HeroHurt;
    }();
    exports.HeroHurt = HeroHurt;
    var GameStart = function() {
      function GameStart() {}
      GameStart.key = "GameStart";
      return GameStart;
    }();
    exports.GameStart = GameStart;
    var BatterShow = function() {
      function BatterShow() {}
      BatterShow.key = "BatterShow";
      return BatterShow;
    }();
    exports.BatterShow = BatterShow;
    var BlackMaskShow = function() {
      function BlackMaskShow() {}
      BlackMaskShow.key = "BlackMaskShow";
      return BlackMaskShow;
    }();
    exports.BlackMaskShow = BlackMaskShow;
    var BlackMaskHide = function() {
      function BlackMaskHide() {}
      BlackMaskHide.key = "BlackMaskHide";
      return BlackMaskHide;
    }();
    exports.BlackMaskHide = BlackMaskHide;
    var BossShow = function() {
      function BossShow() {}
      BossShow.create = function(character) {
        var data = new BossShow();
        data.character = character;
        return data;
      };
      BossShow.key = "BossShow";
      return BossShow;
    }();
    exports.BossShow = BossShow;
    var GameGuideStart = function() {
      function GameGuideStart() {}
      GameGuideStart.key = "GameGuide";
      return GameGuideStart;
    }();
    exports.GameGuideStart = GameGuideStart;
    var GameGuideEnd = function() {
      function GameGuideEnd() {}
      GameGuideEnd.key = "GameGuideEnd";
      return GameGuideEnd;
    }();
    exports.GameGuideEnd = GameGuideEnd;
    var DropMoney = function() {
      function DropMoney() {
        this.money = 0;
      }
      DropMoney.create = function(money, position) {
        var data = new DropMoney();
        data.money = money;
        data.position = position;
        return data;
      };
      DropMoney.key = "DropMoney";
      return DropMoney;
    }();
    exports.DropMoney = DropMoney;
    var HeroSuperStart = function() {
      function HeroSuperStart() {}
      HeroSuperStart.key = "HeroSuperStart";
      return HeroSuperStart;
    }();
    exports.HeroSuperStart = HeroSuperStart;
    var HeroSuperEnd = function() {
      function HeroSuperEnd() {}
      HeroSuperEnd.key = "HeroSuperEnd";
      return HeroSuperEnd;
    }();
    exports.HeroSuperEnd = HeroSuperEnd;
    cc._RF.pop();
  }, {} ],
  MoneyWeight: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "284e5JdJ81MGoP86cAEqaGe", "MoneyWeight");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventEnum_1 = require("../../../FrameWork/Event/EventEnum");
    var EventMgr_1 = require("../../../FrameWork/Event/EventMgr");
    var User_1 = require("../../../FrameWork/User/User");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MoneyWeight = function(_super) {
      __extends(MoneyWeight, _super);
      function MoneyWeight() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moneyLabel = null;
        return _this;
      }
      MoneyWeight.prototype.start = function() {
        this.updateMoney();
      };
      MoneyWeight.prototype.updateMoney = function() {
        this.moneyLabel.string = User_1.default.getMoney_csryw() + "";
      };
      MoneyWeight.prototype.onEnable = function() {
        EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.ryw_Game_OnUserMoneyChange_csryw, this.updateMoney, this);
      };
      MoneyWeight.prototype.onDisable = function() {
        EventMgr_1.default.offEvent_csryw(EventEnum_1.ryw_Event.ryw_Game_OnUserMoneyChange_csryw, this.updateMoney, this);
      };
      __decorate([ property(cc.Label) ], MoneyWeight.prototype, "moneyLabel", void 0);
      MoneyWeight = __decorate([ ccclass ], MoneyWeight);
      return MoneyWeight;
    }(cc.Component);
    exports.default = MoneyWeight;
    cc._RF.pop();
  }, {
    "../../../FrameWork/Event/EventEnum": "EventEnum",
    "../../../FrameWork/Event/EventMgr": "EventMgr",
    "../../../FrameWork/User/User": "User"
  } ],
  MonsterSpawn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a0e0cEDGBDhIgmkFFemYmY", "MonsterSpawn");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ConfigManager_1 = require("../../ConfigManager");
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var WeigthsRandom_1 = require("../../tools/WeigthsRandom");
    var Messages_1 = require("../message/Messages");
    var AudioManager_1 = require("./AudioManager");
    var GamaManager_1 = require("./GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MonsterSpawn = function(_super) {
      __extends(MonsterSpawn, _super);
      function MonsterSpawn() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._nextTime = -1;
        _this._currentStageIndex = -1;
        _this._monsterWarningTime = -1;
        _this._monsterWarning = false;
        _this._weigthsRandom = new WeigthsRandom_1.default();
        _this.count = 0;
        _this.isOver = false;
        _this.endlessTable = [];
        return _this;
      }
      Object.defineProperty(MonsterSpawn.prototype, "currentStage", {
        get: function() {
          return this.endlessTable[this._currentStageIndex];
        },
        enumerable: false,
        configurable: true
      });
      MonsterSpawn.prototype.onLoad = function() {
        this.endlessTable = ConfigManager_1.default.endlessConfig;
      };
      MonsterSpawn.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
        GlobalMessage_1.GlobalMessage.on(Messages_1.MonsterDead, this.onMonsterDead, this);
      };
      MonsterSpawn.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        GlobalMessage_1.GlobalMessage.offAll(this);
      };
      MonsterSpawn.prototype.checkCurrentStage = function(time) {
        var stage = this.currentStage;
        if (null != stage && time < stage.time) return;
        if (this._currentStageIndex == this.endlessTable.length - 1) return;
        var index = -1 == this._currentStageIndex ? 0 : this._currentStageIndex;
        for (;index < this.endlessTable.length; index++) {
          var stage = this.endlessTable[index];
          if (stage.time > time) break;
        }
        this._currentStageIndex = index;
        var weights = this.currentStage.weights;
        var monsterWeights = [];
        for (var i = 0; i < weights.length; i++) {
          var item = weights[i];
          monsterWeights.push({
            key: item.id,
            weight: item.weights
          });
        }
        this._weigthsRandom.weights = monsterWeights;
        this.currentStage.monsters.length > 0 && null != this.currentStage.monsters.find(function(id) {
          return ConfigManager_1.default.characterConfig[id].type > 1;
        }) && (this._monsterWarningTime = this.currentStage.time - 3);
      };
      MonsterSpawn.prototype.createMonster = function(id) {
        var mapSize = GamaManager_1.default.inst.mapSize;
        var width = mapSize.x / 2;
        var height = mapSize.y / 2;
        var pos = new cc.Vec2(2 * (Math.random() - .5) * width, 2 * (Math.random() - .5) * height);
        GamaManager_1.default.inst.createCharacter(id, pos);
      };
      MonsterSpawn.prototype.tryGenerateMonsters = function(time, currentCount) {
        var index = this._currentStageIndex;
        var state = this.currentStage;
        this.checkCurrentStage(time);
        if (null != state && (state != this.currentStage || time > this.currentStage.time)) {
          index == this.endlessTable.length - 1 && (this.isOver = true);
          for (var i = 0; i < state.monsters.length; i++) {
            this.createMonster(state.monsters[i]);
            this.count++;
          }
        }
        var flag = false;
        if (this._nextTime <= 0) {
          flag = true;
          this._nextTime = this.currentStage.interval;
        }
        if (flag || 0 == this.count) {
          var needCount = this.currentStage.count;
          currentCount + needCount > this.currentStage.total && (needCount = this.currentStage.total - currentCount);
          for (var i = 0; i < needCount; i++) {
            var id = this._weigthsRandom.Random();
            this.createMonster(id);
            this.count++;
          }
        }
      };
      MonsterSpawn.prototype.fixUpdate = function() {
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run || this.isOver) return;
        var dt = FixManager_1.default.fixedDeltaTime;
        this._nextTime -= dt;
        this.tryGenerateMonsters(GamaManager_1.default.inst.totalTime, this.count);
        if (-1 != this._monsterWarningTime && this._monsterWarningTime <= GamaManager_1.default.inst.totalTime) if (false == this._monsterWarning) {
          this._monsterWarning = true;
          this._monsterWarningTime = GamaManager_1.default.inst.totalTime + 3;
          AudioManager_1.default.inst.pauseBGM();
          AudioManager_1.default.inst.playSFX("Sound/\u7cbe\u82f1\u548cboss\u51fa\u73b0\u524d\u5f00\u573a\u97f3\u65483");
        } else {
          this._monsterWarningTime = -1;
          this._monsterWarning = false;
          AudioManager_1.default.inst.resumBGM();
        }
      };
      MonsterSpawn.prototype.onMonsterDead = function() {
        this.count--;
        this.count = Math.max(this.count, 0);
      };
      MonsterSpawn = __decorate([ ccclass ], MonsterSpawn);
      return MonsterSpawn;
    }(FixComponent_1.default);
    exports.default = MonsterSpawn;
    cc._RF.pop();
  }, {
    "../../ConfigManager": "ConfigManager",
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../../tools/WeigthsRandom": "WeigthsRandom",
    "../message/Messages": "Messages",
    "./AudioManager": "AudioManager",
    "./GamaManager": "GamaManager"
  } ],
  Monster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3bfea9M6AlGn46viUFirg/B", "Monster");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var AudioManager_1 = require("../manager/AudioManager");
    var EffectManager_1 = require("../manager/EffectManager");
    var Messages_1 = require("../message/Messages");
    var Character_1 = require("./Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var Monster = function(_super) {
      __extends(Monster, _super);
      function Monster() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Monster.prototype.start = function() {
        var enterArr = [ "Enter", "Enter2" ];
        var enter = enterArr[Math.floor(1.8 * Math.random())];
        this.unitAction.playAction(enter) || this.unitAction.playAction("Enter");
      };
      Monster.prototype.dead = function() {
        _super.prototype.dead.call(this);
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.MonsterDead());
        this.config.type > 1 && EffectManager_1.default.inst.addEffect("Effect_batter_good", this.node, cc.v2(this.node.x, this.node.y));
      };
      Monster.prototype.beHurt = function(result) {
        _super.prototype.beHurt.call(this, result);
        null != this.config.hurtSound && "" != this.config.hurtSound && AudioManager_1.default.inst.playSFX("Sound/" + this.config.hurtSound);
      };
      Monster = __decorate([ ccclass ], Monster);
      return Monster;
    }(Character_1.default);
    exports.default = Monster;
    cc._RF.pop();
  }, {
    "../../tools/GlobalMessage": "GlobalMessage",
    "../manager/AudioManager": "AudioManager",
    "../manager/EffectManager": "EffectManager",
    "../message/Messages": "Messages",
    "./Character": "Character"
  } ],
  NetConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96e2fJpstFCTboG9kwVf8Op", "NetConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetConfig = function() {
      function NetConfig() {}
      NetConfig.serverUrl_csryw = "https://javaapi.renyouwangluo.cn";
      NetConfig.Login_csryw = "/api/user/login";
      NetConfig.SaveGameData_csryw = "/api/user/game/data/write";
      NetConfig.GetUser_csryw = "/api/user/game/data/read";
      NetConfig.IpBlock_csryw = "/api/user/ip/select";
      NetConfig.reportExport_csryw = "/api/share/getwaibuad";
      NetConfig.reportImport_csryw = "/api/share/getzjadml";
      NetConfig.getuserip_csryw = "/api/user/ip";
      NetConfig.signin_csryw = "/api/user/sign";
      NetConfig.Get_ServerTime_csryw = "/api/share/gettime";
      NetConfig.userScanCode_csryw = "/api/user/scan/code";
      NetConfig.ttReportLaunchChannel_csryw = "https://javareport.renyouwangluo.cn/api/data/tt/report";
      return NetConfig;
    }();
    exports.default = NetConfig;
    cc._RF.pop();
  }, {} ],
  OPPOAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e171acnwxpKoIMn4Mkvf/JE", "OPPOAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppPlatform_1 = require("../../FrameWork/Util/AppPlatform");
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var HttpUnit_1 = require("../../FrameWork/NetWork/HttpUnit");
    var AppSwitchConfig_1 = require("../../FrameWork/Config/AppSwitchConfig");
    var LogUtils_1 = require("../../FrameWork/Util/LogUtils");
    var OPPOAPI = function() {
      function OPPOAPI() {}
      Object.defineProperty(OPPOAPI, "BannerInstance_csryw", {
        get: function() {
          return OPPOAPI._banner_csryw;
        },
        enumerable: false,
        configurable: true
      });
      OPPOAPI.Login_csryw = function(onSuccess, onFail) {
        AppPlatform_1.default.is_OPPO_GAME_csryw() && window["qg"].login({
          success: function(res) {
            var token = res.data.token;
            onSuccess(token);
            console.log("OPPO \u767b\u9646\u6210\u529f,\u83b7\u53d6\u5230 token : " + token);
            for (var key in res) console.log(key, res[key]);
          },
          fail: function(res) {
            console.log("OPPO \u767b\u9646\u5931\u8d25", res);
            for (var key in res) console.log(key, res[key]);
          }
        });
      };
      OPPOAPI.initAdService_csryw = function(onSuccess, onFail, onComplete) {
        window["qg"].initAdService({
          appId: AppConfig_1.default.AppID_csryw,
          isDebug: false,
          success: function(res) {
            console.log("oppo initAdService success");
            onSuccess && onSuccess(res);
          },
          fail: function(res) {
            console.log("oppo initAdService fail: ", res.code, res.msg);
            onFail && onFail(res);
          },
          complete: function(res) {
            console.log("oppo initAdService complete");
            onComplete && onComplete(res);
          }
        });
      };
      OPPOAPI.showRewardedVideoAd_csryw = function(onAdClose, onFailed, id) {
        if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          var videoId = AppConfig_1.default.tt_adUnitId_csryw;
          id && (videoId = id);
          var videoAd_1 = window["qg"].createRewardedVideoAd({
            posId: videoId
          });
          videoAd_1.onLoad(function() {
            console.log("oppo \u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
            videoAd_1.show();
          });
          videoAd_1.onVideoStart(function() {
            console.log("oppo \u89c6\u9891\u5e7f\u544a\u5f00\u59cb\u64ad\u653e");
          });
          videoAd_1.onClose(function(res) {
            if (res.isEnded) {
              console.log("oppo \u89c6\u9891\u5e7f\u544a\u89c2\u770b \u5b8c\u6210");
              onAdClose(true);
            } else {
              console.log("oppo \u89c6\u9891\u5e7f\u544a\u89c2\u770b \u672a\u5b8c\u6210");
              onAdClose(false);
            }
            videoAd_1.destroy();
          });
          videoAd_1.onError(function(err) {
            console.log("oppo \u89c6\u9891\u5e7f\u544a\u83b7\u53d6\u5931\u8d25", err);
            videoAd_1.destroy();
            onFailed();
          });
          videoAd_1.load();
        } else onAdClose(true);
      };
      OPPOAPI.navigateToMiniProgram_csryw = function(pkgName, gameName, path, onSuccess, onFail, onComplate) {
        if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          console.log("OPPO \u8df3\u8f6c\u6e38\u620f\uff1a " + pkgName);
          HttpUnit_1.default.reportExport_csryw(pkgName, gameName, function(result) {
            1 == result.code ? console.log("OPPO \u5bfc\u51fa\u4e0a\u62a5\u6210\u529f") : console.log("OPPO \u5bfc\u51fa\u4e0a\u62a5\u5931\u8d25", result.msg);
          }, function(result) {
            console.log("OPPO \u5bfc\u51fa\u4e0a\u62a5\u5931\u8d25");
            for (var key in result) console.log(key, result[key]);
          });
          var time = Date.now();
          while (Date.now() - time <= 500) ;
          window["qg"].navigateToMiniGame({
            pkgName: pkgName,
            path: path,
            extraData: {
              from: AppConfig_1.default.AppID_csryw
            },
            envVersion: "release",
            success: function(res) {
              onSuccess && onSuccess(res);
            },
            fail: function(res) {
              onFail && onFail(res);
            }
          });
        }
      };
      OPPOAPI.showInterstitialAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          var insertAd = window["qg"].createInsertAd({
            posId: OPPOAPI.InsAdUnitId_csryw
          });
          insertAd.load();
          insertAd.onLoad(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
            insertAd.show();
          });
          insertAd.onShow(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u663e\u793a\u6210\u529f");
          });
          insertAd.onError(function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u62c9\u53d6\u5931\u8d25", err);
            insertAd.destroy();
            onFailed && onFailed();
          });
        } else onAdClose();
      };
      OPPOAPI.showBannaer_csryw = function() {
        if (OPPOAPI._banner_csryw) {
          OPPOAPI._banner_csryw.show();
          return;
        }
        var bannerAd = window["qg"].createBannerAd({
          posId: OPPOAPI.bannerAdUnitId_csryw
        });
        bannerAd.show();
        OPPOAPI._banner_csryw = bannerAd;
      };
      OPPOAPI.hideBanner_csryw = function() {
        OPPOAPI._banner_csryw && OPPOAPI._banner_csryw.hide();
      };
      OPPOAPI.destroyBanner_csryw = function() {
        OPPOAPI._banner_csryw && OPPOAPI._banner_csryw.destroy();
        OPPOAPI._banner_csryw = null;
      };
      OPPOAPI.getLaunchOptionsSync_csryw = function() {
        var obj = {
          query: "",
          referrerInfo: {
            package: "",
            extraData: {
              appid: ""
            }
          }
        };
        if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          var options = window["qg"].getLaunchOptionsSync();
          null != options && "" != options ? obj = options : console.log("\u6ca1\u6709\u542f\u52a8\u8bbe\u7f6e\uff01\uff01\uff01");
          return obj;
        }
        return obj;
      };
      OPPOAPI.share_csryw = function(complate, titel, imageUrl) {
        complate(false);
      };
      OPPOAPI.createDesktopIcon_csryw = function(onSuccess, onFail) {
        AppPlatform_1.default.is_OPPO_GAME_csryw() ? window["qg"].hasShortcutInstalled({
          success: function(res) {
            if (false == res) window["qg"].installShortcut({
              success: function() {
                onSuccess && onSuccess();
              },
              fail: function(err) {
                onFail && onFail();
                console.log("\u521b\u5efa\u684c\u9762\u56fe\u6807\u5931\u8d25\uff01\uff01\uff01\uff01", err);
                for (var key in err) console.log(key, err);
              },
              complete: function() {}
            }); else {
              console.log("\u684c\u9762\u56fe\u6807\u5df2\u5b58\u5728\uff01\uff01\uff01\uff01");
              onFail && onFail();
            }
          },
          fail: function(err) {
            onFail && onFail();
            console.log("\u5224\u65ad\u684c\u9762\u56fe\u6807\u662f\u5426\u5b58\u5728\u5931\u8d25\uff01\uff01\uff01", err);
            for (var key in err) console.log(key, err);
          },
          complete: function() {}
        }) : onFail && onFail();
      };
      OPPOAPI.autoPopCreateDestopIcon_csryw = function(onSuccess, onFail) {
        if (!AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          null != onFail && onFail();
          return;
        }
        var rate = Math.floor(100 * Math.random());
        rate <= AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().oppocfg_csryw.addToDesktop_csryw ? OPPOAPI.createDesktopIcon_csryw(onSuccess, onFail) : null != onFail && onFail();
      };
      OPPOAPI.showNativeAd_csryw = function(onSuccess, onFail) {
        LogUtils_1.LogUtils.warn_csryw("111111111111111111111111");
      };
      OPPOAPI.LoadCahcedNativeAd_csryw = function() {
        return;
        var self;
      };
      OPPOAPI.hasShortcutInstalled = function(onSuccess, onFail) {
        window["qg"].hasShortcutInstalled({
          success: function(res) {
            if (false == res) {
              console.log("\u684c\u9762\u56fe\u6807\u4e0d\u5b58\u5728\uff01\uff01\uff01\uff01");
              onSuccess && onSuccess(false);
            } else {
              console.log("\u684c\u9762\u56fe\u6807\u5df2\u5b58\u5728\uff01\uff01\uff01\uff01");
              onSuccess && onSuccess(true);
            }
          },
          fail: function(err) {
            onFail && onFail();
            console.log("\u5224\u65ad\u684c\u9762\u56fe\u6807\u662f\u5426\u5b58\u5728\u5931\u8d25\uff01\uff01\uff01", err);
            for (var key in err) console.log(key, err);
          },
          complete: function() {}
        });
      };
      OPPOAPI.adUnitId_csryw = "";
      OPPOAPI.bannerAdUnitId_csryw = "";
      OPPOAPI.InsAdUnitId_csryw = "";
      OPPOAPI.OpenScreenAdUnitId_csryw = "";
      OPPOAPI.NativeAdId_csryw = "";
      OPPOAPI._banner_csryw = null;
      OPPOAPI._cachedNativeAd_csryw = null;
      OPPOAPI._cachedAdItem_csryw = null;
      OPPOAPI._cachedimgUrl_csryw = null;
      OPPOAPI._tryLoadCount_csryw = 5;
      return OPPOAPI;
    }();
    exports.default = OPPOAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig",
    "../../FrameWork/Config/AppSwitchConfig": "AppSwitchConfig",
    "../../FrameWork/NetWork/HttpUnit": "HttpUnit",
    "../../FrameWork/Util/AppPlatform": "AppPlatform",
    "../../FrameWork/Util/LogUtils": "LogUtils"
  } ],
  ObbCollision: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93d3bLZEKxHApe0tfQgQiUT", "ObbCollision");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Obb_1 = require("../../tools/objects/Obb");
    var Collision_1 = require("./Collision");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ObbCollision = function(_super) {
      __extends(ObbCollision, _super);
      function ObbCollision() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(ObbCollision.prototype, "shape", {
        get: function() {
          return cc.geomUtils.enums.SHAPE_OBB;
        },
        enumerable: false,
        configurable: true
      });
      ObbCollision.prototype.onEnable = function() {};
      ObbCollision.prototype.getShape = function() {
        var obb = new Obb_1.default();
        var mat = new cc.Mat4();
        this.node.getWorldMatrix(mat);
        mat.getTranslation(obb.center);
        var qua = new cc.Quat();
        mat.getRotation(qua);
        cc.Quat.toAxisX(obb.axis0, qua);
        cc.Quat.toAxisY(obb.axis1, qua);
        obb.halfExtents.x = this.node.width / 2;
        obb.halfExtents.y = this.node.height / 2;
        return obb;
      };
      ObbCollision.prototype.draw = function() {
        var shape = this.getShape();
      };
      ObbCollision = __decorate([ ccclass ], ObbCollision);
      return ObbCollision;
    }(Collision_1.default);
    exports.default = ObbCollision;
    cc._RF.pop();
  }, {
    "../../tools/objects/Obb": "Obb",
    "./Collision": "Collision"
  } ],
  Obb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01282tvFGRLwrZc4jQOjssJ", "Obb");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Obb = function() {
      function Obb() {
        this.type = cc.geomUtils.enums.SHAPE_OBB;
        this.center = new cc.Vec2();
        this.halfExtents = new cc.Vec2();
        this.axis0 = new cc.Vec2();
        this.axis1 = new cc.Vec2();
      }
      return Obb;
    }();
    exports.default = Obb;
    cc._RF.pop();
  }, {} ],
  ObjPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a5d7TEYtNLZaGkE4AGJ5Qu", "ObjPool");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ObjPool = function(_super) {
      __extends(ObjPool, _super);
      function ObjPool() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.useCache = true;
        _this._pool_list = {};
        _this._obj_count = 0;
        return _this;
      }
      ObjPool.prototype.loadPrefab = function(name, callBack) {};
      ObjPool.prototype.getObj = function(name, callBack, forceCache) {
        if (this.useCache || forceCache) {
          this._pool_list[name] || (this._pool_list[name] = new cc.NodePool());
          var item = this._pool_list[name].get();
          null != item ? callBack && callBack(item) : this.loadPrefab(name, function(err, prefab) {
            if (err) console.error(err); else {
              var node = cc.instantiate(prefab);
              callBack && callBack(node);
            }
          }.bind(this));
        } else this.loadPrefab(name, function(err, prefab) {
          if (err) console.error(err); else {
            var node = cc.instantiate(prefab);
            callBack && callBack(node);
          }
        }.bind(this));
        this._obj_count++;
      };
      ObjPool.prototype.removeObj = function(name, node, forceCache) {
        if (node) {
          this.useCache, forceCache, this._pool_list[name] ? this._pool_list[name].put(node) : node.destroy();
          this._obj_count--;
        }
      };
      ObjPool.prototype.isEmpty = function() {
        return 0 == this._obj_count;
      };
      ObjPool.prototype.clearPool = function() {
        for (var key in this._pool_list) this._pool_list.hasOwnProperty(key) && this._pool_list[key].clear();
        this._pool_list = {};
      };
      ObjPool.prototype.onDestroy = function() {
        this.clearPool();
      };
      __decorate([ property(cc.Boolean) ], ObjPool.prototype, "useCache", void 0);
      ObjPool = __decorate([ ccclass ], ObjPool);
      return ObjPool;
    }(cc.Component);
    exports.default = ObjPool;
    cc._RF.pop();
  }, {} ],
  PhysicalPowerMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f51fOT21dGNJWVLl8YDg8c", "PhysicalPowerMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventEnum_1 = require("../Event/EventEnum");
    var EventMgr_1 = require("../Event/EventMgr");
    var DialogMgr_1 = require("./DialogMgr");
    var GameMgr_1 = require("./GameMgr");
    var PhysicalPowerMgr = function() {
      function PhysicalPowerMgr() {}
      PhysicalPowerMgr.initData = function(data) {
        var _this = this;
        this.physicalNum = this.verify(data.physicalNum, 0);
        this.physicalTime = this.verify(data.physicalTime, 0);
        this.physicalAllNum = this.verify(data.physicalAllNum, 0);
        this.physicalAllTime = this.verify(data.physicalAllTime, 0);
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.interval = setInterval(function() {
          _this.updatePhysicalTime();
        }, 1e3);
        this.updatePhysicalTime();
      };
      PhysicalPowerMgr.getData = function() {
        var tab = {
          physicalNum: this.physicalNum,
          physicalTime: this.physicalTime,
          physicalAllNum: this.physicalAllNum,
          physicalAllTime: this.physicalAllTime
        };
        return tab;
      };
      PhysicalPowerMgr.isCanUserPhysical = function(num) {
        void 0 === num && (num = 1);
        var isCanUser = false;
        if (this.getPhyVideoAllTime() > 0) {
          this.updatePhysicalTime();
          isCanUser = true;
        } else {
          var _cnum = this.getPhysicalNum() - num;
          if (_cnum < 0) isCanUser = false; else {
            this.getPhyVideoTime() <= 0 && this.setPhyVideoTime(this.getNowTime());
            this.setPhysicalNum(this.getPhysicalNum() - num);
            GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
            this.updatePhysicalTime();
            isCanUser = true;
          }
        }
        return isCanUser;
      };
      PhysicalPowerMgr.openAddPowerDialog = function(listener, needOpenAdd) {
        var _this = this;
        void 0 === needOpenAdd && (needOpenAdd = true);
        DialogMgr_1.default.openAddPowerAllDialog(handleFM_csryw(function(closeView, data) {
          closeView && (data ? callFM_csryw(listener, true) : needOpenAdd ? DialogMgr_1.default.openAddPowerDialog(handleFM_csryw(function(closeView, data) {
            closeView && data ? callFM_csryw(listener, true) : callFM_csryw(listener, false);
          }, _this)) : callFM_csryw(listener, false));
        }, this));
      };
      PhysicalPowerMgr.getPhysicalNum = function() {
        return this.physicalNum;
      };
      PhysicalPowerMgr.setPhysicalNum = function(num) {
        this.physicalNum = num;
        this.updatePhysicalTime();
      };
      PhysicalPowerMgr.getPhyVideoAllNum = function() {
        return this.physicalAllNum;
      };
      PhysicalPowerMgr.setPhyVideoAllNum = function(num) {
        this.physicalAllNum = num;
      };
      PhysicalPowerMgr.getPhyVideoAllTime = function() {
        return this.physicalAllTime;
      };
      PhysicalPowerMgr.setPhyVideoAllTime = function(num) {
        this.physicalAllTime = num;
      };
      PhysicalPowerMgr.getPhyVideoTime = function() {
        return this.physicalTime;
      };
      PhysicalPowerMgr.setPhyVideoTime = function(num) {
        this.physicalTime = num;
      };
      PhysicalPowerMgr.updatePhysicalTime = function() {
        var again = false;
        if (this.getPhyVideoAllTime() > 0) {
          var time = this.getPhyVideoAllTime();
          var ntime = new Date().getTime();
          var cctime = time - ntime;
          if (cctime <= 0) {
            this.setPhyVideoAllTime(0);
            this.setPhysicalNum(this.MaxPhysical);
            this.setPhyVideoTime(0);
            GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
            again = true;
          }
        } else if (this.getPhysicalNum() < this.MaxPhysical) {
          var time = this.getPhyVideoTime();
          var ntime = new Date().getTime();
          var maxTime = 1e3 * this.RecoverPhysicalTime;
          if (ntime - time >= maxTime) {
            time += maxTime;
            this.setPhyVideoTime(time);
            var num = this.getPhysicalNum() + 1;
            if (num >= this.MaxPhysical) {
              num = this.MaxPhysical;
              this.setPhyVideoTime(0);
            }
            this.setPhysicalNum(num);
            GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
            again = true;
          }
        } else this.setPhyVideoTime(0);
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.updatePhysicalPower);
        again && this.updatePhysicalTime();
      };
      PhysicalPowerMgr.addNewPhysicalAll = function() {
        var ctime = this.getNowTime() + 864e5;
        this.getPhyVideoAllTime() > 0 && (ctime = this.getPhyVideoAllTime() + 864e5);
        this.setPhyVideoAllTime(ctime);
        GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
        this.updatePhysicalTime();
      };
      PhysicalPowerMgr.getNowTime = function() {
        return new Date().getTime();
      };
      PhysicalPowerMgr.verify = function(data, defaultValue) {
        if (void 0 !== data) return data;
        return defaultValue;
      };
      PhysicalPowerMgr.formatTime3 = function(time) {
        var str = "";
        var m = time / 60;
        m = parseInt(m + "");
        var s = time - 60 * m;
        s = parseInt(s + "");
        str += m > 9 ? m + ":" : "0" + m + ":";
        str += s > 9 ? s : "0" + s;
        return str;
      };
      PhysicalPowerMgr.formatTime = function(time) {
        var str = "";
        var h = time / 3600;
        h = parseInt(h + "");
        var m = (time - 3600 * h) / 60;
        m = parseInt(m + "");
        var s = time - 3600 * h - 60 * m;
        s = parseInt(s + "");
        h > 0 && (str += h + ":");
        str += m > 9 ? m + ":" : "0" + m + ":";
        str += s > 9 ? s + "" : "0" + s;
        return str;
      };
      PhysicalPowerMgr.RecoverPhysicalTime = 300;
      PhysicalPowerMgr.MaxPhysical = 3;
      PhysicalPowerMgr.physicalNum = 0;
      PhysicalPowerMgr.physicalTime = 0;
      PhysicalPowerMgr.physicalAllNum = 0;
      PhysicalPowerMgr.physicalAllTime = 0;
      PhysicalPowerMgr.interval = null;
      return PhysicalPowerMgr;
    }();
    exports.default = PhysicalPowerMgr;
    cc._RF.pop();
  }, {
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "./DialogMgr": "DialogMgr",
    "./GameMgr": "GameMgr"
  } ],
  PlayerController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8a28fxZ+dLWaltm9e+6omm", "PlayerController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var InputSystem_1 = require("../../input/InputSystem");
    var GamaManager_1 = require("../../manager/GamaManager");
    var Hero_1 = require("../Hero");
    var BallMove_1 = require("../movement/BallMove");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayerController = function(_super) {
      __extends(PlayerController, _super);
      function PlayerController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.input = new InputSystem_1.Input();
        return _this;
      }
      PlayerController.prototype.start = function() {
        this.character = this.node.getComponent(Hero_1.default);
        this.ballMove = this.node.getComponent(BallMove_1.default);
      };
      PlayerController.prototype.onLoad = function() {
        this.inputSystem = cc.director.getScene().getComponentInChildren(InputSystem_1.default);
      };
      PlayerController.prototype.fixUpdate = function() {
        this.input.reset();
        this.inputSystem.accumulateInput(this.input, FixManager_1.default.inst.fixedDeltaTime);
        if (GamaManager_1.default.inst.state == GamaManager_1.GameState.None) return;
        if (this.input.slide) {
          var direction = GamaManager_1.default.inst.state == GamaManager_1.GameState.Guide ? cc.Vec2.UP.clone() : this.input.direction;
          this.character.catapult(direction);
        }
      };
      PlayerController = __decorate([ ccclass ], PlayerController);
      return PlayerController;
    }(FixComponent_1.default);
    exports.default = PlayerController;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../input/InputSystem": "InputSystem",
    "../../manager/GamaManager": "GamaManager",
    "../Hero": "Hero",
    "../movement/BallMove": "BallMove"
  } ],
  PowerNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dbe5epM8JNWZ1v3YZdRVhi", "PowerNode");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FMComponentExtend_1 = require("../../Base/FMComponentExtend");
    var EventEnum_1 = require("../../Event/EventEnum");
    var EventMgr_1 = require("../../Event/EventMgr");
    var PhysicalPowerMgr_1 = require("../../Mgr/PhysicalPowerMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PowerNode = function(_super) {
      __extends(PowerNode, _super);
      function PowerNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.EventEnumView_csryw = {};
        _this.labelPower = null;
        _this.labelPowerTime = null;
        _this.labelPowerAll = null;
        return _this;
      }
      PowerNode.prototype.initView_csryw = function() {
        var _this = this;
        var bgNode = this.node.getChildByName("bgNode");
        this.onClick(bgNode, function() {
          PhysicalPowerMgr_1.default.getPhyVideoAllTime() <= 0 && PhysicalPowerMgr_1.default.getPhysicalNum() < PhysicalPowerMgr_1.default.MaxPhysical ? PhysicalPowerMgr_1.default.openAddPowerDialog(handleFM_csryw(function() {}, _this), true) : PhysicalPowerMgr_1.default.openAddPowerDialog(handleFM_csryw(function() {}, _this), false);
        }, this);
        this.labelPower = this.child(bgNode, "labelPower", cc.Label);
        this.labelPowerTime = this.child(bgNode, "labelPowerTime", cc.Label);
        this.labelPowerAll = this.child(bgNode, "labelPowerAll", cc.Label);
        this.labelPower.node.active = true;
        this.labelPowerTime.node.active = true;
        this.labelPowerAll.node.active = true;
        EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.updatePhysicalPower, function(tab) {
          _this.updatePhysicalPower();
        }, this);
        this.updatePhysicalPower();
      };
      PowerNode.prototype.updatePhysicalPower = function() {
        if (PhysicalPowerMgr_1.default.getPhyVideoAllTime() > 0) {
          this.labelPowerTime.string = "";
          this.labelPower.string = "";
          var time = PhysicalPowerMgr_1.default.getPhyVideoAllTime();
          var ntime = new Date().getTime();
          var cctime = time - ntime;
          this.labelPowerAll.string = PhysicalPowerMgr_1.default.formatTime(cctime / 1e3);
        } else {
          this.labelPowerAll.string = "";
          this.labelPower.string = PhysicalPowerMgr_1.default.getPhysicalNum() + "/" + PhysicalPowerMgr_1.default.MaxPhysical;
          if (PhysicalPowerMgr_1.default.getPhysicalNum() < PhysicalPowerMgr_1.default.MaxPhysical) {
            var time = PhysicalPowerMgr_1.default.getPhyVideoTime();
            var ntime = new Date().getTime();
            var maxTime = 1e3 * PhysicalPowerMgr_1.default.RecoverPhysicalTime;
            var cctime = maxTime - (ntime - time);
            this.labelPowerTime.string = cctime > 0 ? PhysicalPowerMgr_1.default.formatTime3(cctime / 1e3) : "";
          } else this.labelPowerTime.string = "";
        }
      };
      PowerNode = __decorate([ ccclass ], PowerNode);
      return PowerNode;
    }(FMComponentExtend_1.default);
    exports.default = PowerNode;
    cc._RF.pop();
  }, {
    "../../Base/FMComponentExtend": "FMComponentExtend",
    "../../Event/EventEnum": "EventEnum",
    "../../Event/EventMgr": "EventMgr",
    "../../Mgr/PhysicalPowerMgr": "PhysicalPowerMgr"
  } ],
  PropertyModifier: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ac52xQEVRPo6x3ZBe6Cfo9", "PropertyModifier");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PropertyProvider = exports.PropertyModifier = void 0;
    var PropertyModifier = function() {
      function PropertyModifier() {
        this.m_ModifierMap = {};
      }
      PropertyModifier.prototype.addProvider = function(provider) {
        var name = provider.property;
        var list = this.m_ModifierMap[name];
        if (null == list) {
          list = [];
          this.m_ModifierMap[name] = list;
        }
        list.push(provider);
      };
      PropertyModifier.prototype.removeProvider = function(provider) {
        var name = provider.property;
        var list = this.m_ModifierMap[name];
        if (null == list) return;
        var index = list.indexOf(provider);
        -1 != index && list.splice(index, 1);
      };
      PropertyModifier.prototype.updateProperty = function(name, source) {
        var list = this.m_ModifierMap[name];
        if (null == list) return 0;
        var constantValue = 0, percentageValue = 0;
        list.forEach(function(provider) {
          constantValue += provider.constant;
          percentageValue += provider.percentage;
        });
        return (source + constantValue) * (1 + percentageValue);
      };
      return PropertyModifier;
    }();
    exports.PropertyModifier = PropertyModifier;
    var PropertyProvider = function() {
      function PropertyProvider(name, value, percentage) {
        this.property = name;
        this.constant = value;
        this.percentage = percentage;
      }
      return PropertyProvider;
    }();
    exports.PropertyProvider = PropertyProvider;
    cc._RF.pop();
  }, {} ],
  QQMiniGameAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d621cKEqIRF+qeAD5jRxzQ2", "QQMiniGameAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppPlatform_1 = require("../../FrameWork/Util/AppPlatform");
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var AppSwitchConfig_1 = require("../../FrameWork/Config/AppSwitchConfig");
    var WudianMgr_1 = require("../../FrameWork/Mgr/WudianMgr");
    var QQMiniGameAPI = function() {
      function QQMiniGameAPI() {}
      QQMiniGameAPI.Login_csryw = function(onSuccess, onFail) {
        AppPlatform_1.default.is_QQ_PLAY_csryw() && window["qq"].login({
          success: function(res) {
            if (res.code) {
              var code = res.code;
              onSuccess(code);
              console.log("\u767b\u9646\u6210\u529f,\u83b7\u53d6\u5230code : " + code);
            }
          }
        });
      };
      QQMiniGameAPI.onRewardedVideoAdLoad_csryw = function() {
        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
      };
      QQMiniGameAPI.onRewardedVideoAdError_csryw = function(err) {
        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + err);
        QQMiniGameAPI._onRewardedVideoAdFailed_csryw && QQMiniGameAPI._onRewardedVideoAdFailed_csryw();
      };
      QQMiniGameAPI.onRewardedVideoAdClose_csryw = function(res) {
        if (res && res.isEnded || null == res) {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u5df2\u5b8c\u6574\u89c2\u770b");
          QQMiniGameAPI._onRewardedVideoAdClose_csryw && QQMiniGameAPI._onRewardedVideoAdClose_csryw(true);
        } else {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u672a\u5b8c\u6574\u89c2\u770b");
          QQMiniGameAPI._onRewardedVideoAdClose_csryw && QQMiniGameAPI._onRewardedVideoAdClose_csryw(false);
        }
      };
      QQMiniGameAPI.regRewardedVideoAdEvent_csryw = function(rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQMiniGameAPI.onRewardedVideoAdLoad_csryw);
        rewardedVideoAd.onError(QQMiniGameAPI.onRewardedVideoAdError_csryw);
        rewardedVideoAd.onClose(QQMiniGameAPI.onRewardedVideoAdClose_csryw);
        QQMiniGameAPI._isRegRewardedVideoAdEvent_csryw = true;
      };
      QQMiniGameAPI.showRewardedVideoAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          QQMiniGameAPI._onRewardedVideoAdClose_csryw = onAdClose;
          QQMiniGameAPI._onRewardedVideoAdFailed_csryw = onFailed;
          var rewardedVideoAd = window["qq"].createRewardedVideoAd({
            adUnitId: AppConfig_1.default.qq_adUnitId_csryw
          });
          QQMiniGameAPI._isRegRewardedVideoAdEvent_csryw || QQMiniGameAPI.regRewardedVideoAdEvent_csryw(rewardedVideoAd);
          rewardedVideoAd.load().then(function() {
            var promise = rewardedVideoAd.show();
            promise.then(function() {
              return console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u6210\u529f");
            });
            promise.catch(function(err) {
              rewardedVideoAd.load().then(function() {
                return rewardedVideoAd.show();
              }).catch(function(err) {
                console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u5931\u8d25");
                onFailed && onFailed();
              });
            });
          }).catch(function(err) {
            console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25");
            onFailed && onFailed();
          });
        } else onAdClose(true);
      };
      QQMiniGameAPI.navigateToMiniProgram_csryw = function(appId, path, onSuccess, onFail, onComplate) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          console.log("\u8df3\u8f6c\u6e38\u620f\uff1a " + appId);
          window["qq"].navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: {
              foo: "bar"
            },
            envVersion: "release",
            success: function(res) {
              onSuccess && onSuccess(res);
            },
            fail: function(res) {
              onFail && onFail(res);
            },
            complete: function(res) {
              onComplate && onComplate(res);
            }
          });
        }
      };
      QQMiniGameAPI.share_csryw = function(complate, titel, imageUrl) {
        var _this = this;
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          QQMiniGameAPI._onShow_csryw = function() {
            window["qq"].offShow(QQMiniGameAPI._onShow_csryw);
            QQMiniGameAPI._onShow_csryw = null;
            var c = Date.now() - _this._lastShareTime_csryw;
            complate && (Date.now() - _this._lastShareTime_csryw > 2e3 ? complate(true) : complate(false));
          };
          window["qq"].onShow(QQMiniGameAPI._onShow_csryw);
          QQMiniGameAPI._lastShareTime_csryw = Date.now();
          window["qq"].shareAppMessage({
            title: titel,
            imageUrl: imageUrl
          });
        }
      };
      QQMiniGameAPI.showInterstitialAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          var interstitialAd = window["qq"].createInterstitialAd({
            adUnitId: AppConfig_1.default.qq_InsAdUnitId_csryw
          });
          var _onLoad_1 = function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u52a0\u8f7d\u5b8c\u6210");
            interstitialAd.show().catch(function(err) {
              console.log("\u63d2\u5c4f\u5e7f\u544a \u663e\u793a\u5931\u8d25 \uff1a" + err);
              interstitialAd.offLoad(_onLoad_1);
              interstitialAd.offError(_onError_1);
              interstitialAd.offClose(_onClose_1);
              interstitialAd.destroy();
              onFailed && onFailed();
            });
          };
          interstitialAd.onLoad(_onLoad_1);
          var _onError_1 = function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u52a0\u8f7d\u5931\u8d25" + err);
            interstitialAd.offLoad(_onLoad_1);
            interstitialAd.offError(_onError_1);
            interstitialAd.offClose(_onClose_1);
            interstitialAd.destroy();
            onFailed && onFailed();
          };
          interstitialAd.onError(_onError_1);
          var _onClose_1 = function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u5173\u95ed");
            interstitialAd.offLoad(_onLoad_1);
            interstitialAd.offError(_onError_1);
            interstitialAd.offClose(_onClose_1);
            interstitialAd.destroy();
            onAdClose && onAdClose();
          };
          interstitialAd.onClose(_onClose_1);
        } else onAdClose();
      };
      QQMiniGameAPI.LoadAppBoxAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          this.mAppboxAd_csryw = window["qq"].createAppBox({
            adUnitId: AppConfig_1.default.qq_AppBoxId_csryw
          });
          this.mAppboxAd_csryw.load().then(function() {
            console.log("\u76d2\u5b50\u5e7f\u544a \u52a0\u8f7d\u5b8c\u6210");
          });
          this.mAppboxAd_csryw.onError(function(err) {
            console.log("\u76d2\u5b50\u5e7f\u544a \u52a0\u8f7d\u5931\u8d25" + err);
            if (onFailed) {
              onFailed();
              onFailed = null;
            }
          });
          this.onBoxAdClose_csryw = function() {
            console.log("\u76d2\u5b50\u5e7f\u544a \u5173\u95ed");
            if (onAdClose) {
              onAdClose();
              onAdClose = null;
            }
          };
          this.mAppboxAd_csryw.onClose(this.onBoxAdClose_csryw);
        } else if (onAdClose) {
          onAdClose();
          onAdClose = null;
        }
      };
      QQMiniGameAPI.showAppBoxAd_csryw = function(onFailed, onAdClose) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) if (QQMiniGameAPI.mAppboxAd_csryw) {
          console.log("\u663e\u793a\u76d2\u5b50\u5e7f\u544a");
          QQMiniGameAPI.mAppboxAd_csryw.offClose(QQMiniGameAPI.onBoxAdClose_csryw);
          QQMiniGameAPI.onBoxAdClose_csryw = function() {
            console.log("\u76d2\u5b50\u5e7f\u544a \u5173\u95ed");
            if (onAdClose) {
              onAdClose();
              onAdClose = null;
            }
          };
          QQMiniGameAPI.mAppboxAd_csryw.onClose(QQMiniGameAPI.onBoxAdClose_csryw);
          QQMiniGameAPI.mAppboxAd_csryw.show().catch(function(err) {
            console.log("\u76d2\u5b50\u5e7f\u544a \u663e\u793a\u5931\u8d25 \uff1a" + err);
            if (onFailed) {
              onFailed();
              onFailed = null;
            }
          });
        } else QQMiniGameAPI.LoadAppBoxAd_csryw(onAdClose, onFailed);
      };
      QQMiniGameAPI.getLaunchOptionsSync_csryw = function() {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          var obj_1 = window["qq"].getLaunchOptionsSync();
          console.log("\u573a\u666f\u503c " + obj_1.scene);
          var str = JSON.stringify(obj_1.query);
          console.log("Query\u53c2\u6570 " + str);
          var key = obj_1.query["key"];
          console.log("Query\u53c2\u6570\uff1akey " + key);
          console.log("ShareTicket " + obj_1.shareTicket);
          console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
          console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
          return obj_1;
        }
        var obj = {
          scene: 1001,
          query: "",
          shareTicket: "",
          appId: "",
          extraData: ""
        };
        return obj;
      };
      QQMiniGameAPI.SetShareMenu_csryw = function(titel, imageUrl, success, fail, complate) {
        if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          console.log("\u5c0f\u6e38\u620f\u8bbe\u7f6e\u8f6c\u53d1\u6309\u94ae");
          window["qq"].showShareMenu({
            withShareTicket: false,
            success: success,
            fail: fail,
            complete: complate
          });
          window["qq"].onShareAppMessage(function() {
            return {
              title: titel,
              imageUrl: imageUrl
            };
          });
        }
      };
      QQMiniGameAPI.tryShowWXCrazyClick_csryw = function() {
        var launchScene = QQMiniGameAPI.getLaunchOptionsSync_csryw().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
        for (var i = 0; i < wudianSceneList.length; ++i) {
          var wudianSceneValue = wudianSceneList[i];
          launchScene == wudianSceneValue && (noEnterBySearch = false);
        }
        var ipBlocked = WudianMgr_1.default.ryw_GetIpBlocked_csryw();
        var wudian = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
        var kuangdianBanner = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.kuangdianBanner_csryw;
        return !(AppConfig_1.default.Versions_csryw != AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.qqversions_csryw || !ipBlocked || !noEnterBySearch || 1 != wudian || 1 != kuangdianBanner);
      };
      QQMiniGameAPI.tryShowWXCrazyClick2_csryw = function() {
        var launchScene = QQMiniGameAPI.getLaunchOptionsSync_csryw().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
        for (var i = 0; i < wudianSceneList.length; ++i) {
          var wudianSceneValue = wudianSceneList[i];
          launchScene == wudianSceneValue && (noEnterBySearch = false);
        }
        var ipBlocked = WudianMgr_1.default.ryw_GetIpBlocked_csryw();
        var wudian = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
        var kuangdianBox = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.kuangdianBox_csryw;
        return !(AppConfig_1.default.Versions_csryw != AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.qqversions_csryw || !ipBlocked || !noEnterBySearch || 1 != wudian || 1 != kuangdianBox);
      };
      QQMiniGameAPI.showAppBlockAd_csryw = function(onFail, top, orientation) {
        void 0 === top && (top = 150);
        void 0 === orientation && (orientation = "landscape");
        if (!AppPlatform_1.default.is_QQ_PLAY_csryw()) return;
        if (!window["qq"].createBlockAd) return;
        if (QQMiniGameAPI.isAppBlockAdLoading_csryw) return;
        QQMiniGameAPI.isAppBlockAdLoading_csryw = true;
        if (isNaN(QQMiniGameAPI.screenWidth_csryw)) try {
          var res = window["qq"].getSystemInfoSync();
          QQMiniGameAPI.screenWidth_csryw = res.windowWidth;
          QQMiniGameAPI.screenHeight_csryw = res.windowHeight;
          QQMiniGameAPI.pixelRatio_csryw = res.pixelRatio;
          QQMiniGameAPI.isIos_csryw = "ios" == res.platform;
          QQMiniGameAPI.skdVersion_csryw = res.SDKVersion;
          QQMiniGameAPI.screenWidth_csryw *= QQMiniGameAPI.isIos_csryw ? 1 : QQMiniGameAPI.pixelRatio_csryw;
          QQMiniGameAPI.screenHeight_csryw *= QQMiniGameAPI.isIos_csryw ? 1 : QQMiniGameAPI.pixelRatio_csryw;
          console.log("getSystemInfoSync ==> ", res.SDKVersion);
        } catch (e) {
          onFail && onFail();
          return;
        }
        var arr1 = QQMiniGameAPI.skdVersion_csryw.split(".").map(function(v) {
          return parseInt(v);
        });
        var arr2 = QQMiniGameAPI.supportSDKVersion_csryw.split(".").map(function(v) {
          return parseInt(v);
        });
        var isSupport = true;
        for (var i = 0; i < arr1.length; i++) if (arr1[i] < arr2[i]) {
          isSupport = false;
          break;
        }
        if (!isSupport) return;
        console.log("QQMiniGameAPI.showAppBlockAd ", top);
        QQMiniGameAPI.destroyAppBlockAd_csryw();
        QQMiniGameAPI.onFail = onFail;
        var min = QQMiniGameAPI.isIos_csryw ? 32 / QQMiniGameAPI.pixelRatio_csryw : 32;
        var mTop = Math.max(min, top / (QQMiniGameAPI.isIos_csryw ? QQMiniGameAPI.pixelRatio_csryw : 1));
        var mLeft = QQMiniGameAPI.screenWidth_csryw / 2;
        mLeft = min;
        QQMiniGameAPI.mAppBlockAd_csryw = window["qq"].createBlockAd({
          adUnitId: AppConfig_1.default.qq_blockAdArray_csryw[Math.floor(Math.random() * AppConfig_1.default.qq_blockAdArray_csryw.length)],
          style: {
            left: mLeft,
            top: mTop
          },
          size: QQMiniGameAPI.AppBlockSize_csryw,
          orientation: orientation
        });
        QQMiniGameAPI.mAppBlockAd_csryw.onError(QQMiniGameAPI.appBlockADError_csryw);
        QQMiniGameAPI.mAppBlockAd_csryw.show().catch(function(err) {
          console.log("\u79ef\u6728\u5e7f\u544a \u663e\u793a\u5931\u8d25 \uff1a" + JSON.stringify(err));
          onFail && onFail();
        });
        QQMiniGameAPI.isAppBlockAdLoading_csryw = false;
      };
      QQMiniGameAPI.appBlockADResize_csryw = function(obj) {
        if (!QQMiniGameAPI.mAppBlockAd_csryw["style"]) return;
        var realWidth = obj.width;
        var realHeight = obj.height;
        var mLeft = (QQMiniGameAPI.screenWidth_csryw - realWidth) / 2;
        QQMiniGameAPI.mAppBlockAd_csryw.style.left = mLeft;
      };
      QQMiniGameAPI.appBlockADError_csryw = function(err) {
        console.log("\u79ef\u6728\u5e7f\u544a  \u52a0\u8f7d\u5931\u8d25 ", JSON.stringify(err));
        QQMiniGameAPI.onFail && QQMiniGameAPI.onFail();
      };
      QQMiniGameAPI.destroyAppBlockAd_csryw = function() {
        if (!AppPlatform_1.default.is_QQ_PLAY_csryw()) return;
        if (!QQMiniGameAPI.mAppBlockAd_csryw) return;
        console.log("QQMiniGameAPI.destroyAppBlockAd");
        QQMiniGameAPI.mAppBlockAd_csryw.offResize(QQMiniGameAPI.appBlockADResize_csryw);
        QQMiniGameAPI.mAppBlockAd_csryw.offError(QQMiniGameAPI.appBlockADError_csryw);
        QQMiniGameAPI.mAppBlockAd_csryw.hide();
        QQMiniGameAPI.mAppBlockAd_csryw.destroy();
        QQMiniGameAPI.mAppBlockAd_csryw = null;
      };
      QQMiniGameAPI.AppBlockStyle_csryw = {
        left: 120,
        top: 200
      };
      QQMiniGameAPI.AppBlockSize_csryw = 5;
      QQMiniGameAPI.AppBlockOrientation_csryw = "landscape";
      QQMiniGameAPI._isRegRewardedVideoAdEvent_csryw = false;
      QQMiniGameAPI._onRewardedVideoAdFailed_csryw = null;
      QQMiniGameAPI._onRewardedVideoAdClose_csryw = null;
      QQMiniGameAPI._onShow_csryw = null;
      QQMiniGameAPI._lastShareTime_csryw = 0;
      QQMiniGameAPI.mAppboxAd_csryw = null;
      QQMiniGameAPI.onBoxAdClose_csryw = null;
      QQMiniGameAPI.mAppBlockAd_csryw = null;
      QQMiniGameAPI.screenWidth_csryw = NaN;
      QQMiniGameAPI.isAppBlockAdLoading_csryw = false;
      QQMiniGameAPI.supportSDKVersion_csryw = "1.15.0";
      return QQMiniGameAPI;
    }();
    exports.default = QQMiniGameAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig",
    "../../FrameWork/Config/AppSwitchConfig": "AppSwitchConfig",
    "../../FrameWork/Mgr/WudianMgr": "WudianMgr",
    "../../FrameWork/Util/AppPlatform": "AppPlatform"
  } ],
  RYAD: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03b26de3y9CwKBkYtLxD4rO", "RYAD");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RYSDK_1 = require("./RYSDK");
    var RYAD = function() {
      function RYAD() {}
      RYAD.prototype.getAD_csryw = function(id, complete, useLocalRandom) {
        useLocalRandom = null == useLocalRandom || useLocalRandom;
        var self = this;
        var para = {
          adv_key: id,
          success: function(data) {
            console.log("\u83b7\u53d6\u5230\u5e7f\u544a\u6570\u636e RYAD:", data);
            if (200 == data.code) {
              var datas = data.result.list;
              null == datas && console.error("\u83b7\u53d6\u5230\u5e7f\u544a\u6570\u636e  \u4e3aNULL");
              true == useLocalRandom && RYAD.sortDatas_csryw(datas);
              complete(datas);
            } else {
              console.error("\u83b7\u53d6\u5230\u5e7f\u544a\u6570\u636e  \u4e3aNULL");
              complete(null);
            }
          },
          fail: function(data) {
            complete(null);
          },
          complete: function(data) {}
        };
        null != RYSDK_1.default.Instance_csryw.rysdk_csryw ? RYSDK_1.default.Instance_csryw.rysdk_csryw.ry_GetAdv(para) : complete(null);
      };
      RYAD.sortDatas_csryw = function(datas) {
        if (null == datas || 0 == datas.length) return [];
        var dataDic = {};
        var keys = new Array();
        for (var i = 0; i < datas.length; ++i) {
          var data = datas[i];
          if (null == dataDic[data.appid]) {
            dataDic[data.appid] = new Array();
            dataDic[data.appid].push(data);
            keys.push(data.appid);
          } else dataDic[data.appid].push(data);
        }
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var randomIndex = Math.floor(Math.random() * keys.length);
          var temp = keys[randomIndex];
          keys[randomIndex] = key;
          keys[i] = temp;
        }
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var dataArray = dataDic[key];
          for (var j = 0; j < dataArray.length; ++j) {
            var data = dataArray[j];
            var randomIndex = Math.floor(Math.random() * dataArray.length);
            var temp = dataArray[randomIndex];
            dataArray[randomIndex] = data;
            dataArray[j] = temp;
          }
        }
        var res = new Array();
        while (keys.length > 0) if (1 == keys.length) {
          var key = keys[0];
          var isOk = false;
          var dataArray = dataDic[key];
          for (var i = 0; i < res.length; ++i) {
            var curData = res[i];
            var nextData = res[i + 1];
            if (null != nextData) {
              if (curData.appid != key && nextData.appid != key) {
                var data = dataArray.shift();
                if (null != data) {
                  var f = res.slice(0, i + 1);
                  var b = res.slice(i + 1, res.length);
                  res = f;
                  res.push(data);
                  for (var k = 0; k < b.length; ++k) res.push(b[k]);
                }
                isOk = true;
                break;
              }
            } else if (curData.appid != key) {
              var data = dataArray.shift();
              if (null != data) {
                var f = res.slice(0, i + 1);
                var b = res.slice(i + 1, res.length);
                res = f;
                res.push(data);
                for (var k = 0; k < b.length; ++k) res.push(b[k]);
              }
              isOk = true;
              break;
            }
          }
          (!isOk || dataArray.length <= 0) && keys.splice(0, 1);
        } else for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var dataArray = dataDic[key];
          var data = dataArray.shift();
          res.push(data);
          if (dataArray.length <= 0) {
            keys.splice(i, 1);
            --i;
          }
        }
        return res;
      };
      return RYAD;
    }();
    exports.default = RYAD;
    cc._RF.pop();
  }, {
    "./RYSDK": "RYSDK"
  } ],
  RYPlatformMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0d33tVObpCvoiBV5k15So1", "RYPlatformMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppConfig_1 = require("../Config/AppConfig");
    var HttpUnit_1 = require("../NetWork/HttpUnit");
    var RYAD_1 = require("../RYSDK/RYAD");
    var RYSDK_1 = require("../RYSDK/RYSDK");
    var LogUtils_1 = require("../Util/LogUtils");
    var RYPlatformMgr = function() {
      function RYPlatformMgr() {}
      RYPlatformMgr.sendClickAd_csryw = function(adv_id) {
        if (AppConfig_1.default.UseRYSDK_csryw) {
          LogUtils_1.LogUtils.info_csryw("\u8fd0\u8425\u4e0a\u62a5\uff1a\u70b9\u51fb\u5e7f\u544a" + adv_id);
          RYSDK_1.default.Instance_csryw.STAT_csryw.reportClickAd_csryw(adv_id);
        }
      };
      RYPlatformMgr.sendClickAdAllow_csryw = function(adv_id) {
        if (AppConfig_1.default.UseRYSDK_csryw) {
          LogUtils_1.LogUtils.info_csryw("\u8fd0\u8425\u4e0a\u62a5\uff1a\u70b9\u51fb\u5e7f\u544a\u6210\u529f " + adv_id);
          RYSDK_1.default.Instance_csryw.STAT_csryw.reportClickAdAllow_csryw(adv_id);
        }
      };
      RYPlatformMgr.getAD_csryw = function(id, complete, useLocalRandom) {
        if (AppConfig_1.default.UseRYSDK_csryw) {
          RYSDK_1.default.Instance_csryw.AD_csryw.getAD_csryw(id, complete, useLocalRandom);
          return true;
        }
        return false;
      };
      RYPlatformMgr.getADList_csryw = function(id, complete, useLocalRandom) {
        this.getRYWADVData_csryw(id, function(data) {
          if (data.result && data.result.list) {
            var datas_csryw = data.result.list;
            true == useLocalRandom && RYAD_1.default.sortDatas_csryw(datas_csryw);
            complete(datas_csryw);
          } else {
            LogUtils_1.LogUtils.networkError_csryw("\u83b7\u53d6\u5230\u5e7f\u544a\u6570\u636e  \u4e3aNULL");
            complete(null);
          }
        }, function() {
          LogUtils_1.LogUtils.networkError_csryw("\u83b7\u53d6\u5230\u5e7f\u544a\u6570\u636e  \u4e3aNULL");
          complete(null);
        });
      };
      RYPlatformMgr.getRYWADVData_csryw = function(locationid, onSuccess, onFail) {
        var timelog = Date.now();
        var req = new HttpUnit_1.requestData();
        req.url_csryw = this.urlRYWAdv_csryw;
        req.data_csryw.timelog = timelog;
        req.data_csryw.key = locationid;
        req.onSuccess_csryw = onSuccess;
        req.onFail_csryw = onFail;
        var completeFunc_csryw = function(res) {
          LogUtils_1.LogUtils.networkLog_csryw(res, "http Success");
          req.onSuccess_csryw && req.onSuccess_csryw(res);
          req.onSuccess_csryw = null;
          req = null;
        };
        var fail = req.onFail_csryw;
        var errorFunc_csryw = function(res) {
          LogUtils_1.LogUtils.networkLog_csryw(res, "http fail");
          fail && fail(res);
          req && (req.onFail_csryw = null);
          fail = null;
          req = null;
        };
        var headers = {};
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        headers["au"] = "renyou";
        var sendMsg_csryw = null;
        var para_csryw = "";
        for (var _i = 0, _a = Object.keys(req.data_csryw); _i < _a.length; _i++) {
          var key = _a[_i];
          var value = req.data_csryw[key];
          para_csryw += key + "=" + value + "&";
        }
        sendMsg_csryw = para_csryw;
        HttpUnit_1.default.sendHttpUrl_csryw(req, sendMsg_csryw, completeFunc_csryw, errorFunc_csryw, headers);
      };
      RYPlatformMgr.urlRYWAdv_csryw = "https://javasttts.renyouwangluo.cn/api/data/product/2result";
      return RYPlatformMgr;
    }();
    exports.default = RYPlatformMgr;
    cc._RF.pop();
  }, {
    "../Config/AppConfig": "AppConfig",
    "../NetWork/HttpUnit": "HttpUnit",
    "../RYSDK/RYAD": "RYAD",
    "../RYSDK/RYSDK": "RYSDK",
    "../Util/LogUtils": "LogUtils"
  } ],
  RYSDK: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96027gZ9+1CLIR6i5jgelrB", "RYSDK");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RYAD_1 = require("./RYAD");
    var RYSTAT_1 = require("./RYSTAT");
    var RYSDK = function() {
      function RYSDK() {
        this._ad_csryw = null;
        this._stat_csryw = null;
        this._rysdk_csryw = null;
      }
      Object.defineProperty(RYSDK, "Instance_csryw", {
        get: function() {
          null == RYSDK._instance_csryw && console.error("\u8bf7\u5148\u8c03\u7528 RYSDK.init() \u5bf9RYSDK\u8fdb\u884c\u521d\u59cb\u5316\uff01\uff01\uff01\uff01\uff01\uff01");
          return RYSDK._instance_csryw;
        },
        enumerable: false,
        configurable: true
      });
      RYSDK.init_csryw = function(code) {
        if (null != RYSDK._instance_csryw) {
          console.error("\u8bf7\u4e0d\u8981\u91cd\u590d\u521d\u59cb\u5316 RYSDK \uff01\uff01\uff01\uff01\uff01\uff01");
          return;
        }
        console.log("\u521d\u59cb\u5316 RYSDK \uff01\uff01\uff01\uff01\uff01\uff01");
        var ins = new RYSDK();
        ins._ad_csryw = new RYAD_1.default();
        ins._stat_csryw = new RYSTAT_1.default();
        RYSDK._instance_csryw = ins;
        if (null != window["rysdk"]) {
          window["rysdk"].ry_init();
          RYSDK._instance_csryw._rysdk_csryw = window["rysdk"];
          RYSDK.Instance_csryw.STAT_csryw.reportInit_csryw();
          RYSDK.Instance_csryw.STAT_csryw.reportLogin_csryw();
        }
      };
      Object.defineProperty(RYSDK.prototype, "AD_csryw", {
        get: function() {
          return this._ad_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RYSDK.prototype, "STAT_csryw", {
        get: function() {
          return this._stat_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RYSDK.prototype, "rysdk_csryw", {
        get: function() {
          return this._rysdk_csryw;
        },
        enumerable: false,
        configurable: true
      });
      RYSDK._instance_csryw = null;
      return RYSDK;
    }();
    exports.default = RYSDK;
    cc._RF.pop();
  }, {
    "./RYAD": "RYAD",
    "./RYSTAT": "RYSTAT"
  } ],
  RYSTAT: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "236c6WMFXJLnZZDWycGws3k", "RYSTAT");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RYSTAT_Event = void 0;
    var RYSDK_1 = require("./RYSDK");
    var TimerUtils_1 = require("../Mgr/TimerUtils");
    var RYSTAT_Event;
    (function(RYSTAT_Event) {
      RYSTAT_Event["RYSTAT_E_INIT_csryw"] = "init";
      RYSTAT_Event["RYSTAT_E_LOGIN_csryw"] = "login";
      RYSTAT_Event["RYSTAT_E_ENTRY_SOURCE_csryw"] = "entrysource";
      RYSTAT_Event["RYSTAT_E_CLICK_AD_csryw"] = "clickad";
      RYSTAT_Event["RYSTAT_E_CLICK_ALLOW_csryw"] = "clickad";
    })(RYSTAT_Event = exports.RYSTAT_Event || (exports.RYSTAT_Event = {}));
    var RYSTAT = function() {
      function RYSTAT() {}
      RYSTAT.prototype.SendEvent_csryw = function(event, data, s, f) {
        null != RYSDK_1.default.Instance_csryw.rysdk_csryw && null != RYSDK_1.default.Instance_csryw.rysdk_csryw.ry_SendEvent && RYSDK_1.default.Instance_csryw.rysdk_csryw.ry_SendEvent(event, data, null, s, f);
      };
      RYSTAT.prototype.reportInitFail_csryw = function() {
        null != RYSDK_1.default.Instance_csryw.rysdk_csryw && null != RYSDK_1.default.Instance_csryw.rysdk_csryw.ry_ReportFail && RYSDK_1.default.Instance_csryw.rysdk_csryw.ry_ReportFail();
      };
      RYSTAT.prototype.reportInit_csryw = function() {
        var _this = this;
        var tryCounter = 0;
        var s = function() {
          console.log("init \u4e0a\u62a5\u6210\u529f!!");
        };
        var f = function() {
          console.log("init \u4e0a\u62a5\u5931\u8d25!!");
          if (tryCounter >= 10) {
            console.log("init \u4e0a\u62a5\u91cd\u8bd5\u6b21\u6570\u8d85\u8fc7 10\u6b21\uff0c\u653e\u5f03\u4e0a\u62a5");
            _this.reportInitFail_csryw();
          } else {
            ++tryCounter;
            TimerUtils_1.TimerUtils.once_csryw(function() {
              _this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_INIT_csryw, null, s, f);
              console.log("init \u7b2c " + tryCounter + " \u6b21\u91cd\u65b0\u4e0a\u62a5");
            }, 5);
          }
        };
        this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_INIT_csryw, null, s, f);
      };
      RYSTAT.prototype.reportLogin_csryw = function() {
        this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_LOGIN_csryw);
      };
      RYSTAT.prototype.reportEntrySource_csryw = function() {
        this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_ENTRY_SOURCE_csryw);
      };
      RYSTAT.prototype.reportClickAd_csryw = function(adv_id) {
        this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_CLICK_AD_csryw, {
          adv_id: adv_id,
          timelog: Date.now(),
          type: 0
        });
      };
      RYSTAT.prototype.reportClickAdAllow_csryw = function(adv_id) {
        this.SendEvent_csryw(RYSTAT_Event.RYSTAT_E_CLICK_ALLOW_csryw, {
          adv_id: adv_id,
          timelog: Date.now(),
          type: 1
        });
      };
      return RYSTAT;
    }();
    exports.default = RYSTAT;
    cc._RF.pop();
  }, {
    "../Mgr/TimerUtils": "TimerUtils",
    "./RYSDK": "RYSDK"
  } ],
  RemoteMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb8ednCAwpACpPZDcMTgAI6", "RemoteMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var RemoteMgr = function() {
      function RemoteMgr() {}
      RemoteMgr.removeAllRemote_csryw = function() {
        for (var k in this.remoteArrayTexture_csryw) this.remoteArrayTexture_csryw[k].decRef();
        this.remoteArrayTexture_csryw = {};
      };
      RemoteMgr.loadRemote_csryw = function(url, listener) {
        var _this = this;
        var texture2D = this.remoteArrayTexture_csryw[url];
        texture2D ? callFM_csryw(listener, null, this.remoteArrayTexture_csryw[url]) : cc.assetManager.loadRemote(url, function(error, data) {
          if (error) {
            callFM_csryw(listener, error, null);
            return;
          }
          if (!_this.remoteArrayTexture_csryw[url]) {
            _this.remoteArrayTexture_csryw[url] = data;
            _this.remoteArrayTexture_csryw[url].addRef();
          }
          callFM_csryw(listener, null, _this.remoteArrayTexture_csryw[url]);
        });
      };
      RemoteMgr.remoteArrayTexture_csryw = {};
      return RemoteMgr;
    }();
    exports.default = RemoteMgr;
    cc._RF.pop();
  }, {} ],
  ResSubMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8337dnPwEFKPLARHw3Ci4BA", "ResSubMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ResSubMgr = exports.EnumSubFrameRes = void 0;
    var EnumSubFrameRes;
    (function(EnumSubFrameRes) {
      EnumSubFrameRes["DialogAddPower"] = "DialogAddPower";
      EnumSubFrameRes["DialogAddPowerAll"] = "DialogAddPowerAll";
      EnumSubFrameRes["DialogSetting"] = "DialogSetting";
      EnumSubFrameRes["DialogToast"] = "DialogToast";
      EnumSubFrameRes["PowerNode"] = "PowerNode";
    })(EnumSubFrameRes = exports.EnumSubFrameRes || (exports.EnumSubFrameRes = {}));
    var ResSubMgr = function() {
      function ResSubMgr() {}
      ResSubMgr.loadSubpackageFinish_csryw = function(subName, listener) {
        var subRes = this[subName];
        if (null == subRes) listener && callFM_csryw(listener); else {
          subRes.bundle = cc.assetManager.getBundle(subName);
          subRes.bundle.loadDir("Prefab", cc.Prefab, function(error, assets) {
            for (var index = 0; index < assets.length; index++) {
              var element = assets[index];
              console.log(element.name);
              subRes.prefab[element.name] = element;
            }
            listener && callFM_csryw(listener);
          });
        }
      };
      ResSubMgr.getPrefabBySubFrame = function(name) {
        if (null != ResSubMgr.subResFrame.prefab[name]) return ResSubMgr.subResFrame.prefab[name];
        console.error("\u6ca1\u6709\u627e\u5230 subResFrame <", name, "> \u4e2d\u7684\u9884\u5236\u4f53");
      };
      ResSubMgr.getPrefab = function(bundle, name) {
        var subRes = ResSubMgr[bundle];
        if (null != subRes.prefab[name]) return subRes.prefab[name];
      };
      ResSubMgr.subResFrame = {
        prefab: {},
        subName: "subResFrame"
      };
      ResSubMgr.subResGame = {
        prefab: {},
        subName: "subResGame"
      };
      return ResSubMgr;
    }();
    exports.ResSubMgr = ResSubMgr;
    cc._RF.pop();
  }, {} ],
  ResurrectionView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d960ndUsdPwJ2Razq4MoUm", "ResurrectionView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var User_1 = require("../../../FrameWork/User/User");
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var GamaManager_1 = require("../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResurrectionView = function(_super) {
      __extends(ResurrectionView, _super);
      function ResurrectionView() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ResurrectionView.prototype.onLoad = function() {
        var needShared = User_1.default.getGameTime() - User_1.default.showShareTime > 2;
        this.resurrectBtn.active = !needShared;
        this.sharedBtn.active = needShared;
        if (needShared) {
          TTAPI_1.default.reportAnalytics("sharedVideoShow");
          User_1.default.updateNoSharedTime();
        }
      };
      ResurrectionView.prototype.onClickResurrection = function() {
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_csryw("\u590d\u6d3b", function(finish) {
          if (finish) {
            GamaManager_1.default.inst.resurrect(true);
            self.node.destroy();
          }
        }, function() {});
      };
      ResurrectionView.prototype.onClickNo = function() {
        GamaManager_1.default.inst.resurrect(false);
        this.node.destroy();
      };
      ResurrectionView.prototype.onClickShared = function() {
        var self = this;
        TTAPI_1.default.ShowLoading();
        TTAPI_1.default.stopRecord_csryw(function() {
          TTAPI_1.default.HideLoading();
          GamaManager_1.default.inst.tryStartRecord();
          TTAPI_1.default.shareRecord_csryw(function() {
            TTAPI_1.default.reportAnalytics("sharedVideo");
            GamaManager_1.default.inst.resurrect(true);
            self.node.destroy();
          });
        });
      };
      __decorate([ property(cc.Node) ], ResurrectionView.prototype, "resurrectBtn", void 0);
      __decorate([ property(cc.Node) ], ResurrectionView.prototype, "sharedBtn", void 0);
      ResurrectionView = __decorate([ ccclass ], ResurrectionView);
      return ResurrectionView;
    }(cc.Component);
    exports.default = ResurrectionView;
    cc._RF.pop();
  }, {
    "../../../FrameWork/User/User": "User",
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../manager/GamaManager": "GamaManager"
  } ],
  SettlementView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a14e4xuMpZJq7/AvJ/8Hucb", "SettlementView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DialogMgr_1 = require("../../../FrameWork/Mgr/DialogMgr");
    var User_1 = require("../../../FrameWork/User/User");
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var AudioManager_1 = require("../manager/AudioManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SettlementView = function(_super) {
      __extends(SettlementView, _super);
      function SettlementView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.winNode = null;
        _this.failNode = null;
        _this.moneyLabel = null;
        return _this;
      }
      SettlementView.prototype.start = function() {
        this.winNode.active = GamaManager_1.default.inst.win;
        this.failNode.active = !GamaManager_1.default.inst.win;
        this.moneyLabel.string = GamaManager_1.default.inst.currentMoney + "";
        AudioManager_1.default.inst.pauseBGM();
        AudioManager_1.default.inst.playSFX("Sound/" + (GamaManager_1.default.inst.win ? "gameWin" : "gameFail"));
      };
      SettlementView.prototype.onClickVideo = function() {
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_csryw("\u53cc\u500d\u5956\u52b1", function(finish) {
          if (finish) {
            AudioManager_1.default.inst.playSFX("Sound/\u7ed3\u7b97\u754c\u9762\u83b7\u5f97\u91d1\u5e01");
            User_1.default.addMoney_csryw(GamaManager_1.default.inst.currentMoney);
            cc.director.loadScene("FMMainScene", function() {
              DialogMgr_1.default.openToast("\u53cc\u500d\u91d1\u5e01\u9886\u53d6\u6210\u529f");
            });
          }
        }, function() {});
      };
      SettlementView.prototype.onClickShared = function() {
        TTAPI_1.default.shareRecord_csryw();
        TTAPI_1.default.reportAnalytics("sharedVideo");
      };
      SettlementView.prototype.onClickBack = function() {
        cc.director.loadScene("FMMainScene");
        AudioManager_1.default.inst.playSFX("Sound/\u7ed3\u7b97\u754c\u9762\u83b7\u5f97\u91d1\u5e01");
      };
      __decorate([ property(cc.Node) ], SettlementView.prototype, "winNode", void 0);
      __decorate([ property(cc.Node) ], SettlementView.prototype, "failNode", void 0);
      __decorate([ property(cc.Label) ], SettlementView.prototype, "moneyLabel", void 0);
      SettlementView = __decorate([ ccclass ], SettlementView);
      return SettlementView;
    }(cc.Component);
    exports.default = SettlementView;
    cc._RF.pop();
  }, {
    "../../../FrameWork/Mgr/DialogMgr": "DialogMgr",
    "../../../FrameWork/User/User": "User",
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../manager/AudioManager": "AudioManager",
    "../manager/GamaManager": "GamaManager"
  } ],
  ShieldEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ccc8AIbEpKxZfZhT3clE8X", "ShieldEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShieldEffect = function(_super) {
      __extends(ShieldEffect, _super);
      function ShieldEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.effect = null;
        return _this;
      }
      ShieldEffect.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
        this.node.on("ADD_SHIELD", this.onAddShield, this);
        this.node.on("SHIELD_BREA_BROKEN", this.onShieldBroken, this);
      };
      ShieldEffect.prototype.onAddShield = function() {
        this.effect.node.active = true;
        this.effect.setAnimation(0, "play", true);
      };
      ShieldEffect.prototype.onShieldBroken = function() {
        this.effect.setAnimation(0, "sui", false);
      };
      __decorate([ property(sp.Skeleton) ], ShieldEffect.prototype, "effect", void 0);
      ShieldEffect = __decorate([ ccclass ], ShieldEffect);
      return ShieldEffect;
    }(cc.Component);
    exports.default = ShieldEffect;
    cc._RF.pop();
  }, {
    "../Character": "Character"
  } ],
  SightEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "940b9wzy4BHWocPhSk/twnV", "SightEffect");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SightEffect = function(_super) {
      __extends(SightEffect, _super);
      function SightEffect() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.duration = 1;
        return _this;
      }
      __decorate([ property(cc.Float) ], SightEffect.prototype, "duration", void 0);
      SightEffect = __decorate([ ccclass ], SightEffect);
      return SightEffect;
    }(cc.Component);
    exports.default = SightEffect;
    cc._RF.pop();
  }, {} ],
  SingleEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "700a9zZ1GFEEaVduB3wtok0", "SingleEmitter");
    cc._RF.pop();
  }, {} ],
  SoundMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f4408q1KolDabTXfdwaMWMQ", "SoundMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SoundMgr = function() {
      function SoundMgr() {}
      SoundMgr.isSoundEnabled_csryw = function() {
        return SoundMgr.enabled_csryw;
      };
      SoundMgr.setSoundEnabled_csryw = function(enabled) {
        SoundMgr.enabled_csryw = enabled;
        SoundMgr.enabled_csryw ? SoundMgr.autoPlayMusic_csryw() : SoundMgr.autoStopMusic_csryw();
      };
      SoundMgr.playMusic_csryw = function(name) {
        SoundMgr.musicPath = name;
        if (!SoundMgr.enabled_csryw) return;
        var url = SoundMgr.getSoundUrl_csryw(name);
        cc.resources.load(url, cc.AudioClip, function(err, clip) {
          if (err) {
            LogUtils.error_csryw(err);
            return;
          }
          cc.audioEngine.playMusic(clip, true);
        });
      };
      SoundMgr.autoPlayMusic_csryw = function() {
        "" != SoundMgr.musicPath && SoundMgr.playMusic_csryw(SoundMgr.musicPath);
      };
      SoundMgr.autoStopMusic_csryw = function() {
        cc.audioEngine.stopMusic();
      };
      SoundMgr.stopMusic_csryw = function() {
        SoundMgr.musicPath = "";
        cc.audioEngine.stopMusic();
      };
      SoundMgr.playSound_csryw = function(name) {
        if (!SoundMgr.enabled_csryw) return;
        var url = SoundMgr.getSoundUrl_csryw(name);
        cc.resources.load(url, cc.AudioClip, function(err, clip) {
          if (err) {
            LogUtils.error_csryw(err);
            return;
          }
          var audioID_csryw = cc.audioEngine.play(clip, false, 1);
        });
      };
      SoundMgr.playSpineSound_csryw = function(eventStringValue, animationName) {
        if (!SoundMgr.enabled_csryw) return;
        var url = SoundMgr.soundSpineResPath_csryw + animationName;
        cc.resources.load(url, cc.AudioClip, function(err, clip) {
          if (err) {
            LogUtils.error_csryw(err);
            return;
          }
          var audioID_csryw = cc.audioEngine.play(clip, false, 1);
        });
      };
      SoundMgr.getSoundUrl_csryw = function(name) {
        var url = SoundMgr.soundResPath_csryw + name;
        return url;
      };
      SoundMgr.soundResPath_csryw = "Sound/";
      SoundMgr.soundSpineResPath_csryw = "Spine/";
      SoundMgr.musicPath = "";
      SoundMgr.enabled_csryw = true;
      return SoundMgr;
    }();
    exports.default = SoundMgr;
    cc._RF.pop();
  }, {} ],
  SpSkinRandomPlay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "426d5cd4ANMvpMbUzcKpSgn", "SpSkinRandomPlay");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Utils_1 = require("./Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpSkinRandomPlay = function(_super) {
      __extends(SpSkinRandomPlay, _super);
      function SpSkinRandomPlay() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.names = [];
        _this.skeleton = null;
        return _this;
      }
      SpSkinRandomPlay.prototype.onLoad = function() {
        this.skeleton = this.node.getComponent(sp.Skeleton);
      };
      SpSkinRandomPlay.prototype.onEnable = function() {
        var index = Utils_1.default.random(0, this.names.length - 1);
        var name = this.names[index];
        this.skeleton.setSkin(name);
      };
      __decorate([ property([ String ]) ], SpSkinRandomPlay.prototype, "names", void 0);
      __decorate([ property(sp.Skeleton) ], SpSkinRandomPlay.prototype, "skeleton", void 0);
      SpSkinRandomPlay = __decorate([ ccclass ], SpSkinRandomPlay);
      return SpSkinRandomPlay;
    }(cc.Component);
    exports.default = SpSkinRandomPlay;
    cc._RF.pop();
  }, {
    "./Utils": "Utils"
  } ],
  SpringAI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25d47ACpTxFroJ4bk+cIw5A", "SpringAI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var BoxCollision_1 = require("../../collision/BoxCollision");
    var CollisitionManager_1 = require("../../manager/CollisitionManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var AIBase_1 = require("./AIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpringAI = function(_super) {
      __extends(SpringAI, _super);
      function SpringAI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.characterInRange = [];
        return _this;
      }
      SpringAI.prototype.tryCastSKill = function() {
        var attack = _super.prototype.tryCastSKill.call(this);
        return attack;
      };
      SpringAI.prototype.fixUpdate = function() {
        _super.prototype.fixUpdate.call(this);
        var dt = FixManager_1.default.fixedDeltaTime;
        if ("Attack" == this.character.unitAction.currentAction.key) {
          GamaManager_1.default.inst.debugHitBox && this.boxCollision.draw();
          var cha = CollisitionManager_1.default.inst.collisition(this.boxCollision, "hero");
          for (var i = this.characterInRange.length - 1; i >= 0; i--) cha.includes(this.characterInRange[i]) || this.characterInRange.splice(i, 1);
          for (var i = 0; i < cha.length; i++) if (this.node != cha[i] && !this.characterInRange.includes(cha[i])) {
            this.characterInRange.push(cha[i]);
            GamaManager_1.default.inst.doDamage(this.character.node, cha[i]);
          }
        } else this.characterInRange.length = 0;
      };
      __decorate([ property(BoxCollision_1.default) ], SpringAI.prototype, "boxCollision", void 0);
      SpringAI = __decorate([ ccclass ], SpringAI);
      return SpringAI;
    }(AIBase_1.default);
    exports.default = SpringAI;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../collision/BoxCollision": "BoxCollision",
    "../../manager/CollisitionManager": "CollisitionManager",
    "../../manager/GamaManager": "GamaManager",
    "./AIBase": "AIBase"
  } ],
  TTAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8644fgvRi1MWKdaywy+s6mk", "TTAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppPlatform_1 = require("../../FrameWork/Util/AppPlatform");
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var DialogMgr_1 = require("../../FrameWork/Mgr/DialogMgr");
    var TTAPI = function() {
      function TTAPI() {}
      TTAPI.ttLogin_csryw = function(onSuccess, onFail) {
        if (AppPlatform_1.default.is_TT_GAME_csryw()) {
          window["tt"].login({
            force: false,
            success: function(res) {
              console.log(res);
              console.log("\u767b\u9646\u6210\u529f1");
              var code = res.code;
              if (code) onSuccess(code); else {
                console.log("\u7528\u6237\u6ca1\u6709\u767b\u9646\uff0c\u91c7\u7528\u4e34\u65f6code");
                onFail();
              }
            },
            fail: function() {
              console.log("\u767b\u9646\u5931\u8d251");
              onFail();
            }
          });
          TTAPI.initRecord_csryw();
        }
      };
      TTAPI.onRewardedVideoAdLoad_csryw = function() {
        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
      };
      TTAPI.onRewardedVideoAdError_csryw = function(err) {
        window["tt"].hideLoading();
      };
      TTAPI.onRewardedVideoAdClose_csryw = function(res) {
        window["tt"].hideLoading();
        if (res && res.isEnded || null == res) {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u5df2\u5b8c\u6574\u89c2\u770b");
          TTAPI.reportAnalytics("videoFinished");
          TTAPI._onRewardedVideoAdClose_csryw && TTAPI._onRewardedVideoAdClose_csryw(true);
        } else {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u672a\u5b8c\u6574\u89c2\u770b");
          TTAPI.reportAnalytics("videoUnFinished");
          TTAPI._onRewardedVideoAdClose_csryw && TTAPI._onRewardedVideoAdClose_csryw(false);
        }
      };
      TTAPI.regRewardedVideoAdEvent_csryw = function(rewardedVideoAd) {
        rewardedVideoAd.onLoad(TTAPI.onRewardedVideoAdLoad_csryw);
        rewardedVideoAd.onError(TTAPI.onRewardedVideoAdError_csryw);
        rewardedVideoAd.onClose(TTAPI.onRewardedVideoAdClose_csryw);
        TTAPI._isRegRewardedVideoAdEvent_csryw = true;
      };
      TTAPI.showRewardedVideoAd_csryw = function(title, onAdClose, onFailed) {
        console.log(onAdClose);
        if (AppPlatform_1.default.is_TT_GAME_csryw()) {
          TTAPI.reportAnalytics("videoPlay", {
            title: title
          });
          window["tt"].showLoading({
            title: "\u8bf7\u6c42\u4e2d"
          });
          if (window["tt"].createRewardedVideoAd) {
            TTAPI._onRewardedVideoAdClose_csryw = onAdClose;
            TTAPI._onRewardedVideoAdFailed_csryw = onFailed;
            var videoid = AppConfig_1.default.tt_adUnitIdArr_csryw[Math.floor(Math.random() * AppConfig_1.default.tt_adUnitIdArr_csryw.length)];
            var rewardedVideoAd_1 = window["tt"].createRewardedVideoAd({
              adUnitId: videoid
            });
            TTAPI._isRegRewardedVideoAdEvent_csryw || TTAPI.regRewardedVideoAdEvent_csryw(rewardedVideoAd_1);
            rewardedVideoAd_1.show().then(function() {
              window["tt"].hideLoading();
            }).catch(function(e) {
              rewardedVideoAd_1.load().then(function() {
                rewardedVideoAd_1.show().then(function() {
                  window["tt"].hideLoading();
                }).catch(function(err) {
                  window["tt"].hideLoading();
                  console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25<2>:code:" + err.errCode + " ,msg:" + err.errMsg);
                  TTAPI.reportAnalytics("videoFail", {
                    msg: err.errMsg,
                    code: err.errCode
                  });
                  onFailed && onFailed();
                  DialogMgr_1.default.openToast("\u89c2\u770b\u89c6\u9891\u5931\u8d25");
                });
              }).catch(function(err) {
                window["tt"].hideLoading();
                console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25<1>:code:" + err.errCode + " ,msg:" + err.errMsg);
                TTAPI.reportAnalytics("videoFail", {
                  msg: err.errMsg,
                  code: err.errCode
                });
                onFailed && onFailed();
                DialogMgr_1.default.openToast("\u89c2\u770b\u89c6\u9891\u5931\u8d25");
              });
            });
          } else window["tt"].showModal({
            title: "\u63d0\u793a",
            content: "\u5f53\u524d\u5ba2\u6237\u7aef\u7248\u672c\u8fc7\u4f4e\uff0c\u65e0\u6cd5\u4f7f\u7528\u8be5\u529f\u80fd\uff0c\u8bf7\u5347\u7ea7\u5ba2\u6237\u7aef\u6216\u5173\u95ed\u540e\u91cd\u542f\u66f4\u65b0\u3002"
          });
        } else onAdClose(true);
      };
      TTAPI.reportAnalytics = function(eventName, data) {
        void 0 === data && (data = {});
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].reportAnalytics(eventName, data);
      };
      TTAPI.initRecord_csryw = function() {
        TTAPI.record_csryw = window["tt"].getGameRecorderManager();
        if (null != TTAPI.record_csryw) {
          TTAPI.record_csryw.onStart(function(res) {
            console.log("\u5f55\u5c4f\u5f00\u59cb");
            TTAPI.inRecord = true;
            TTAPI.recordRes_csryw = "";
          });
          TTAPI.record_csryw.onStop(function(res) {
            console.log("\u5f55\u5c4f\u7ed3\u675f");
            TTAPI.inRecord = false;
            TTAPI.recordRes_csryw = res.videoPath;
            TTAPI.onRecordStopCallback && TTAPI.onRecordStopCallback();
            TTAPI.onRecordStopCallback = null;
          });
        }
      };
      TTAPI.startRecord_csryw = function(duration) {
        void 0 === duration && (duration = 300);
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        console.log("\u5f00\u59cb\u5f55\u5c4f");
        TTAPI.record_csryw.start({
          duration: duration
        });
      };
      TTAPI.stopRecord_csryw = function(callback) {
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        if (this.inRecord) {
          TTAPI.record_csryw.stop();
          TTAPI.onRecordStopCallback = callback;
        } else callback && callback();
      };
      TTAPI.recordClip = function(timeRange, callback) {
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        TTAPI.record_csryw.clipVideo({
          timeRange: timeRange,
          success: function(r) {
            console.log(r.index);
            callback && callback(r.index);
          }
        });
      };
      TTAPI.clipVideo = function(timeRange, callback) {
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        console.log("mark1", TTAPI.recordRes_csryw);
        var args = {
          path: TTAPI.recordRes_csryw,
          timeRange: timeRange,
          success: function(res) {
            TTAPI.recordRes_csryw = res.videoPath;
            console.log("mark2", TTAPI.recordRes_csryw);
            callback && callback();
          },
          fail: function(e) {
            console.error(e);
          }
        };
        console.log("mark2", args.path);
        TTAPI.record_csryw.clipVideo(args);
      };
      TTAPI.shareRecord_csryw = function(callback, Failcallback) {
        void 0 === callback && (callback = null);
        void 0 === Failcallback && (Failcallback = null);
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) {
          callback && callback();
          return;
        }
        if ("" != TTAPI.recordRes_csryw) window["tt"].shareAppMessage({
          channel: "video",
          extra: {
            videoPath: TTAPI.recordRes_csryw,
            videoTopics: [ AppConfig_1.default.GameName_csryw ]
          },
          success: function() {
            null != callback && callback();
            console.log("\u5206\u4eab\u89c6\u9891\u6210\u529f");
          },
          fail: function(e) {
            console.log("\u5206\u4eab\u89c6\u9891\u5931\u8d25", e);
            var isTimeShortError = false;
            if (e && 21105 == e.errNo) {
              isTimeShortError = true;
              window["tt"].showToast({
                title: "\u5206\u4eab\u5931\u8d25\uff0c\u5206\u4eab\u89c6\u9891\u65f6\u95f4\u8fc7\u77ed"
              });
            }
            null != Failcallback && Failcallback(e, isTimeShortError);
          }
        }); else {
          null != Failcallback && Failcallback();
          console.log("\u5206\u4eab\u89c6\u9891\u4e3a\u7a7a");
        }
      };
      TTAPI.share_csryw = function(complate) {
        void 0 === complate && (complate = null);
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        window["tt"].shareAppMessage({
          templateId: AppConfig_1.default.tt_templateId_csryw,
          success: function() {
            null != complate && complate();
          },
          fail: function() {
            console.log("\u5206\u4eab\u5931\u8d25");
          }
        });
      };
      TTAPI.showBanner_csryw = function() {
        if (!AppPlatform_1.default.is_TT_GAME_csryw() || AppConfig_1.default.tt_bannerAdUnitId_csryw.length <= 0) return;
        if (!TTAPI._banner_csryw) {
          var _a = window["tt"].getSystemInfoSync(), windowWidth_1 = _a.windowWidth, windowHeight_1 = _a.windowHeight;
          var targetBannerAdWidth = 150;
          TTAPI._banner_csryw = window["tt"].createBannerAd({
            adUnitId: AppConfig_1.default.tt_bannerAdUnitId_csryw,
            adIntervals: 30,
            style: {
              width: targetBannerAdWidth,
              top: windowHeight_1 - targetBannerAdWidth / 16 * 9
            }
          });
          TTAPI._banner_csryw.style.left = (windowWidth_1 - targetBannerAdWidth) / 2;
          TTAPI._banner_csryw.onResize(function(size) {
            console.log(size.width, size.height);
            TTAPI._banner_csryw.style.top = windowHeight_1 - size.height;
            TTAPI._banner_csryw.style.left = (windowWidth_1 - size.width) / 2;
          });
        }
        TTAPI._banner_csryw.show();
      };
      TTAPI.hideBanner_csryw = function() {
        null != TTAPI._banner_csryw && TTAPI._banner_csryw.hide();
      };
      TTAPI.showMoreGamesModal_csryw = function(onSuccess, onFail) {
        var systemInfo = window["tt"].getSystemInfoSync();
        "ios" !== systemInfo.platform ? window["tt"].showMoreGamesModal({
          appLaunchOptions: [ {
            appId: AppConfig_1.default.AppID_csryw,
            query: "foo=bar&baz=qux",
            extraData: {}
          } ],
          success: function(res) {
            console.log("success", res.errMsg);
            onSuccess && onSuccess();
          },
          fail: function(res) {
            console.log("fail", res.errMsg);
            onFail && onFail();
          }
        }) : onFail && onFail();
      };
      TTAPI.showInterstitialAd = function(onAdClose, onFail) {
        if (!AppPlatform_1.default.is_TT_GAME_csryw()) return;
        console.log("\u63d2\u5c4f\u63d2\u5c4fcreate....................");
        var interstitialAd = window["tt"].createInterstitialAd({
          adUnitId: AppConfig_1.default.tt_InsAdUnitId_csryw
        });
        interstitialAd.load().then(function() {
          console.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u6210\u529f\uff01");
          interstitialAd.show().then(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u5c55\u793a\u6210\u529f\uff01");
          }).catch(function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u663e\u793a\u5931\u8d25\uff1a", JSON.stringify(err));
          });
        }).catch(function(err) {
          console.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\uff1a", JSON.stringify(err));
        });
        interstitialAd.onClose(function() {
          console.log("\u63d2\u5c4f\u5e7f\u544a \u5173\u95ed");
          interstitialAd.destroy();
          onAdClose && onAdClose();
        });
      };
      TTAPI.getLaunchOptionsSync_csryw = function() {
        if (AppPlatform_1.default.is_TT_GAME_csryw()) {
          var obj_1 = window["tt"].getLaunchOptionsSync();
          console.log("obj ", obj_1);
          console.log("\u573a\u666f\u503c " + obj_1.scene);
          var str = JSON.stringify(obj_1.query);
          console.log("Query\u53c2\u6570 " + str);
          var key = obj_1.query["key"];
          console.log("Query\u53c2\u6570\uff1akey " + key);
          return obj_1;
        }
        var obj = {
          scene: 1001,
          query: ""
        };
        return obj;
      };
      TTAPI.followTTCount = function() {
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].openAwemeUserProfile({
          success: function(res) {
            console.log(res);
          }
        });
      };
      TTAPI.addToZM = function() {
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].addShortcut({
          success: function(res) {
            console.log("\u6dfb\u52a0\u6210\u529f");
          },
          fail: function(res) {
            console.log("\u6dfb\u52a0\u5931\u8d25");
          }
        });
      };
      TTAPI.setRankData = function(dataType, value, priority, extra, success, faild) {
        void 0 === extra && (extra = "extra");
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].setImRankData({
          dataType: dataType,
          value: value,
          priority: priority,
          extra: extra,
          success: function(res) {
            console.log("setImRankData success res: " + res);
            success && success();
          },
          fail: function(res) {
            console.log("setImRankData fail res: " + res.errMsg);
            faild && faild();
          }
        });
      };
      TTAPI.getRankList = function(relationType, dataType, rankType, suffix, rankTitle, success, faild) {
        window["tt"].getImRankList({
          relationType: relationType,
          dataType: dataType,
          rankType: rankType,
          suffix: suffix,
          rankTitle: rankTitle,
          success: function(res) {
            console.log("getImRankData success res: " + res);
            success && success();
          },
          fail: function(res) {
            console.log("getImRankData fail res: " + res.errMsg);
            faild && faild();
          }
        });
      };
      TTAPI.getRankData = function(relationType, dataType, rankType, success, faild) {
        window["tt"].getImRankData({
          relationType: relationType,
          dataType: dataType,
          rankType: rankType,
          pageNum: 1,
          pageSize: 40,
          success: function(res, data) {
            console.log("getImRankData success res: " + res);
            success && success(data);
          },
          fail: function(res) {
            console.log("getImRankData fail res: " + res.errMsg);
            faild && faild();
          }
        });
      };
      TTAPI.ShowLoading = function() {
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].showLoading({
          title: "\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...",
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log("showLoading\u8c03\u7528\u5931\u8d25", res);
          }
        });
      };
      TTAPI.HideLoading = function() {
        AppPlatform_1.default.is_TT_GAME_csryw() && window["tt"].hideLoading({
          noConflict: true,
          success: function(res) {
            console.log(res);
          },
          fail: function(err) {
            console.log("hideLoading \u8c03\u7528\u5931\u8d25", err);
          }
        });
      };
      TTAPI.recordRes_csryw = "";
      TTAPI._banner_csryw = null;
      TTAPI._isRegRewardedVideoAdEvent_csryw = false;
      TTAPI._onRewardedVideoAdFailed_csryw = null;
      TTAPI._onRewardedVideoAdClose_csryw = null;
      TTAPI.inRecord = false;
      TTAPI.onRecordStopCallback = null;
      return TTAPI;
    }();
    exports.default = TTAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig",
    "../../FrameWork/Mgr/DialogMgr": "DialogMgr",
    "../../FrameWork/Util/AppPlatform": "AppPlatform"
  } ],
  TcoInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d01cfDNuM9JLbWgPO3VHDm1", "TcoInfo");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TcoInfo = function() {
      function TcoInfo() {}
      return TcoInfo;
    }();
    exports.default = TcoInfo;
    cc._RF.pop();
  }, {} ],
  TcoView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "00e882EvqhMI6/LQxAzcaDR", "TcoView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TweenScale_1 = require("../../../FrameWork/Tween/TweenScale");
    var User_1 = require("../../../FrameWork/User/User");
    var Common_1 = require("../../../FrameWork/Util/Common");
    var TTAPI_1 = require("../../../Platform/tt/TTAPI");
    var ConfigManager_1 = require("../../ConfigManager");
    var GlobalMessage_1 = require("../../tools/GlobalMessage");
    var GamaManager_1 = require("../manager/GamaManager");
    var HeroManager_1 = require("../manager/HeroManager");
    var Messages_1 = require("../message/Messages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TcoView = function(_super) {
      __extends(TcoView, _super);
      function TcoView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mask = null;
        _this.items = [];
        _this.allBtn = null;
        _this.sharedBtn = null;
        _this.tcoOptions = [];
        return _this;
      }
      TcoView.prototype.start = function() {
        var _this = this;
        this.getComponentInChildren(TweenScale_1.default).openAction({
          callback: function() {
            _this.mask.active = false;
          },
          target: this
        });
        this.refreshTcoOption();
      };
      TcoView.prototype.init = function(options, closeCallBack) {
        this.tcoOptions = options;
        this.closeCallBack = closeCallBack;
        var needShow = !GamaManager_1.default.inst["sharedShowed"] && GamaManager_1.default.inst.totalTime >= 60 && Math.random() <= .1;
        this.allBtn.active = !needShow;
        this.sharedBtn.active = needShow;
        if (needShow) {
          GamaManager_1.default.inst["sharedShowed"] = true;
          TTAPI_1.default.reportAnalytics("sharedVideoShow");
          User_1.default.updateNoSharedTime();
        }
      };
      TcoView.prototype.refreshTcoOption = function() {
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          var data = this.tcoOptions[i];
          null == data ? item.active = false : this.setItemView(item, data);
        }
      };
      TcoView.prototype.setItemView = function(item, optionId) {
        var info = ConfigManager_1.default.tcoConfig.find(function(item) {
          return item.id == optionId;
        });
        var level = HeroManager_1.default.inst.getTcoLevel(info.id);
        item.active = true;
        var name = item.getChildByName("name").getComponent(cc.Label);
        name.string = info.name;
        var lv = item.getChildByName("level").getComponent(cc.Label);
        lv.string = "Lv." + (level + 1);
        var desc = item.getChildByName("desc").getComponent(cc.Label);
        desc.string = info["desc" + (level + 1)];
        var sprite = item.getChildByName("icon").getComponent(cc.Sprite);
        Common_1.default.loadSpriteFrame("subResGame", "Texture/Icon/" + info.icon, function(spriteFrame) {
          sprite.spriteFrame = spriteFrame;
        });
        var bgSprite = item.getComponent(cc.Sprite);
        Common_1.default.loadSpriteFrame("subResGame", "Texture/View/Tco/" + (level + 1), function(spriteFrame) {
          bgSprite.spriteFrame = spriteFrame;
        });
        item["data"] = info;
      };
      TcoView.prototype.onClickItem = function(event) {
        var btn = event.currentTarget;
        var info = btn["data"];
        GlobalMessage_1.GlobalMessage.emit(Messages_1.SelectTco.create(info.id));
        this.close();
      };
      TcoView.prototype.onClickRefresh = function() {
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_csryw("\u5237\u65b0\u6280\u80fd", function(finish) {
          if (finish) {
            self.tcoOptions = HeroManager_1.default.inst.getSelectOptions();
            self.refreshTcoOption();
          }
        }, function() {});
      };
      TcoView.prototype.getAll = function() {
        for (var i = 0; i < this.tcoOptions.length; i++) GlobalMessage_1.GlobalMessage.emit(Messages_1.SelectTco.create(this.tcoOptions[i]));
      };
      TcoView.prototype.onClickAll = function() {
        var _this = this;
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_csryw("\u83b7\u5f97\u6240\u6709", function(finish) {
          if (finish) {
            self.getAll();
            _this.close();
          }
        }, function() {});
      };
      TcoView.prototype.onClickShared = function() {
        var _this = this;
        var self = this;
        TTAPI_1.default.ShowLoading();
        TTAPI_1.default.stopRecord_csryw(function() {
          TTAPI_1.default.HideLoading();
          GamaManager_1.default.inst.tryStartRecord();
          TTAPI_1.default.shareRecord_csryw(function() {
            self.getAll();
            _this.close();
            TTAPI_1.default.reportAnalytics("sharedVideo");
          });
        });
      };
      TcoView.prototype.close = function() {
        this.node.destroy();
        this.closeCallBack && this.closeCallBack();
      };
      __decorate([ property(cc.Node) ], TcoView.prototype, "mask", void 0);
      __decorate([ property([ cc.Node ]) ], TcoView.prototype, "items", void 0);
      __decorate([ property(cc.Node) ], TcoView.prototype, "allBtn", void 0);
      __decorate([ property(cc.Node) ], TcoView.prototype, "sharedBtn", void 0);
      TcoView = __decorate([ ccclass ], TcoView);
      return TcoView;
    }(cc.Component);
    exports.default = TcoView;
    cc._RF.pop();
  }, {
    "../../../FrameWork/Tween/TweenScale": "TweenScale",
    "../../../FrameWork/User/User": "User",
    "../../../FrameWork/Util/Common": "Common",
    "../../../Platform/tt/TTAPI": "TTAPI",
    "../../ConfigManager": "ConfigManager",
    "../../tools/GlobalMessage": "GlobalMessage",
    "../manager/GamaManager": "GamaManager",
    "../manager/HeroManager": "HeroManager",
    "../message/Messages": "Messages"
  } ],
  TimerUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bf29BcCWtM6532YBz8PUL4", "TimerUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TimerUtils = void 0;
    var TimerUtils = function() {
      function TimerUtils() {}
      TimerUtils.loopNum_csryw = function(handler, interval, repeat, delay) {
        return this.schedule_csryw(handler, interval, repeat, delay);
      };
      TimerUtils.once_csryw = function(handler, delayTime) {
        void 0 === delayTime && (delayTime = 0);
        return this.scheduleOnce_csryw(handler, delayTime);
      };
      TimerUtils.loop_csryw = function(handler, intervlTime, delay) {
        void 0 === intervlTime && (intervlTime = 0);
        void 0 === delay && (delay = 0);
        return this.schedule_csryw(handler, intervlTime || .02, cc.macro.REPEAT_FOREVER, delay);
      };
      TimerUtils.removeTimer_csryw = function(handler) {
        this.unschedule_csryw(handler);
      };
      TimerUtils.removeAllTimers_csryw = function() {
        cc.director.getScheduler().unscheduleAllForTarget(this);
      };
      TimerUtils.scheduleOnce_csryw = function(handler, delay) {
        this.schedule_csryw(handler, 0, 0, delay);
        return handler;
      };
      TimerUtils.schedule_csryw = function(handler, interval, repeat, delay) {
        cc.director.getScheduler().schedule(handler, this, interval, repeat, delay);
        return handler;
      };
      TimerUtils.unschedule_csryw = function(handler) {
        if (!handler) return;
        cc.director.getScheduler().unschedule(handler, this);
      };
      return TimerUtils;
    }();
    exports.TimerUtils = TimerUtils;
    cc._RF.pop();
  }, {} ],
  TweenScale: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2473xfbABKDqOOb69JqPVy", "TweenScale");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TweenScale = function(_super) {
      __extends(TweenScale, _super);
      function TweenScale() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scaleStartNum = .65;
        _this.scaleEndNum = 1;
        _this.scaleTime = .3;
        _this.listener = null;
        return _this;
      }
      TweenScale.prototype.openAction = function(listener) {
        var _this = this;
        this.listener = listener;
        cc.Tween.stopAllByTarget(this);
        this.node.scale = this.scaleStartNum;
        cc.tween(this.node).to(this.scaleTime, {
          scale: this.scaleEndNum
        }, {
          easing: cc.easing.backOut
        }).call(function() {
          _this.listener && callFM_csryw(listener);
        }).start();
      };
      TweenScale.prototype.closeAction = function(listener) {
        var _this = this;
        this.listener = listener;
        cc.Tween.stopAllByTarget(this);
        cc.tween(this.node).to(this.scaleTime, {
          scale: this.scaleStartNum
        }, {
          easing: cc.easing.backIn
        }).call(function() {
          _this.listener && callFM_csryw(listener);
        }).start();
      };
      __decorate([ property({
        tooltip: "\u521d\u59cb\u7f29\u653e\u6bd4\u4f8b",
        type: cc.Float
      }) ], TweenScale.prototype, "scaleStartNum", void 0);
      __decorate([ property({
        tooltip: "\u7ed3\u675f\u7f29\u653e\u6bd4\u4f8b",
        type: cc.Float
      }) ], TweenScale.prototype, "scaleEndNum", void 0);
      __decorate([ property({
        tooltip: "\u7f29\u653e\u65f6\u95f4",
        type: cc.Float
      }) ], TweenScale.prototype, "scaleTime", void 0);
      TweenScale = __decorate([ ccclass ], TweenScale);
      return TweenScale;
    }(cc.Component);
    exports.default = TweenScale;
    cc._RF.pop();
  }, {} ],
  TweenUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "742a75rY+xFBqss+FpyXdRN", "TweenUtils");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TweenUtils = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TweenUtils = function() {
      function TweenUtils() {}
      TweenUtils.prototype.start = function() {};
      TweenUtils.bezierTo = function(target, duration, c1, c2, to, opts) {
        opts = opts || Object.create(null);
        var twoBezier = function(t, p1, cp, p2) {
          var x = (1 - t) * (1 - t) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
          var y = (1 - t) * (1 - t) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
          return cc.v3(x, y, 0);
        };
        opts.onUpdate = function(arg, ratio) {
          target.position = twoBezier(ratio, c1, c2, to);
        };
        return cc.tween(target).to(duration, {}, opts);
      };
      TweenUtils = __decorate([ ccclass("TweenUtils") ], TweenUtils);
      return TweenUtils;
    }();
    exports.TweenUtils = TweenUtils;
    cc._RF.pop();
  }, {} ],
  UltSkill0: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3aef3/lx2VBMonsAGmFBrbO", "UltSkill0");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GlobalMessage_1 = require("../../../tools/GlobalMessage");
    var Messages_1 = require("../../message/Messages");
    var UltSkill_1 = require("./UltSkill");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var UltSkill0 = function(_super) {
      __extends(UltSkill0, _super);
      function UltSkill0() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UltSkill0.prototype.onSkillStart = function() {
        _super.prototype.onSkillStart.call(this);
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.BlackMaskShow());
      };
      UltSkill0.prototype.onSkillEnd = function() {
        _super.prototype.onSkillEnd.call(this);
        GlobalMessage_1.GlobalMessage.emit(new Messages_1.BlackMaskHide());
      };
      UltSkill0 = __decorate([ ccclass ], UltSkill0);
      return UltSkill0;
    }(UltSkill_1.default);
    exports.default = UltSkill0;
    cc._RF.pop();
  }, {
    "../../../tools/GlobalMessage": "GlobalMessage",
    "../../message/Messages": "Messages",
    "./UltSkill": "UltSkill"
  } ],
  UltSkillConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4a77f4qlxAMISngWX0Zx/H", "UltSkillConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UltSkillConfig = function() {
      function UltSkillConfig() {}
      return UltSkillConfig;
    }();
    exports.default = UltSkillConfig;
    cc._RF.pop();
  }, {} ],
  UltSkill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbdeaIntUVBS55hHotboWuy", "UltSkill");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var UltSkill = function(_super) {
      __extends(UltSkill, _super);
      function UltSkill() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.timer = 0;
        _this.isRunning = false;
        return _this;
      }
      UltSkill.prototype.init = function(hero, config) {
        var _a;
        this.hero = hero;
        this.config = config;
        this.buff = (null !== (_a = config.buff) && void 0 !== _a ? _a : "").split("|");
      };
      UltSkill.prototype.castSkill = function() {
        this.isRunning = true;
        this.timer = this.config.duration;
        this.onSkillStart();
      };
      UltSkill.prototype.onSkillStart = function() {
        for (var i = 0; i < this.buff.length; i++) {
          this.hero.removeBuff(this.buff[i]);
          this.hero.addBuff(this.buff[i]);
        }
      };
      UltSkill.prototype.onSkillEnd = function() {
        for (var i = 0; i < this.buff.length; i++) this.hero.removeBuff(this.buff[i]);
      };
      UltSkill.prototype.fixUpdate = function() {
        if (GamaManager_1.default.inst.state != GamaManager_1.GameState.Run || !this.isRunning) return;
        var dt = FixManager_1.default.fixedDeltaTime;
        var old = this.timer;
        this.timer -= dt;
        if (old > 0 && this.timer <= 0) {
          this.isRunning = false;
          this.onSkillEnd();
        }
      };
      UltSkill = __decorate([ ccclass ], UltSkill);
      return UltSkill;
    }(FixComponent_1.default);
    exports.default = UltSkill;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager",
    "../../manager/GamaManager": "GamaManager"
  } ],
  UmengMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a7ae6tdfhBgpuxR3eH1jyX", "UmengMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UmengMgr = void 0;
    var AppPlatform_1 = require("../Util/AppPlatform");
    var LogUtils_1 = require("../Util/LogUtils");
    var EventMgr_1 = require("../Event/EventMgr");
    var EventEnum_1 = require("../Event/EventEnum");
    var StatsFrameWorkEvent;
    (function(StatsFrameWorkEvent) {
      StatsFrameWorkEvent["ReportAdClickSuccess_csryw"] = "ReportAdClickSuccess";
      StatsFrameWorkEvent["ReportAdClickFail_csryw"] = "ReportAdClickFail";
      StatsFrameWorkEvent["ReportAdClickStart_csryw"] = "ReportAdClickStart";
      StatsFrameWorkEvent["ReportLaunchOptions_csryw"] = "ReportLaunchOptions";
      StatsFrameWorkEvent["LogReportInfo_csryw"] = "LogReportInfo";
      StatsFrameWorkEvent["LogReportError_csryw"] = "LogReportError";
      StatsFrameWorkEvent["LoginReportInfo_csryw"] = "LoginReportInfo";
      StatsFrameWorkEvent["GameEventLVInto_csryw"] = "Event_LVInto";
      StatsFrameWorkEvent["GameEventLVFinish_csryw"] = "Event_LVFinish";
      StatsFrameWorkEvent["Event_Commerce_csryw"] = "Event_Commerce";
      StatsFrameWorkEvent["Event_Custom_csryw"] = "Event_Custom";
    })(StatsFrameWorkEvent || (StatsFrameWorkEvent = {}));
    var UmengMgr = function() {
      function UmengMgr() {}
      UmengMgr.sendEvent_csryw = function(event, params) {
        AppPlatform_1.default.is_WECHAT_GAME_csryw() ? UmengMgr.uma_trackEvent(event, params) : AppPlatform_1.default.is_Iphone_csryw() || AppPlatform_1.default.is_Android_csryw();
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_Umeng_csryw, {
          event: event
        });
      };
      UmengMgr.sendReportLaunchOptions_csryw = function(scene, dqip, ipxq) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.ReportLaunchOptions_csryw, {
          scene: scene,
          dqip: dqip,
          ipxq: ipxq
        });
      };
      UmengMgr.sendReportAdClickSuccess_csryw = function(title, appid) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.ReportAdClickSuccess_csryw, {
          title: title,
          appid: String(appid)
        });
      };
      UmengMgr.sendReportAdClickFail_csryw = function(title, appid) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.ReportAdClickFail_csryw, {
          title: title,
          appid: String(appid)
        });
      };
      UmengMgr.sendReportAdClickStart_csryw = function(title, appid) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.ReportAdClickStart_csryw, {
          title: title,
          appid: String(appid)
        });
      };
      UmengMgr.sendGameEventLvInto_csryw = function(level) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.GameEventLVInto_csryw, {
          level: level
        });
        AppPlatform_1.default.is_WECHAT_GAME_csryw() && window["wx"].uma.stage.onStart({
          stageId: level + "",
          stageName: "\u7b2c" + level + "\u5173"
        });
      };
      UmengMgr.sendGameEventLvFinish_csryw = function(level, isWin, duration, custom) {
        var status = "win";
        isWin || (status = "lose");
        var params = {};
        params["level"] = level;
        params["status"] = status;
        params["duration"] = duration;
        if (custom) for (var key in custom) if (Object.prototype.hasOwnProperty.call(custom, key)) {
          var element = custom[key];
          "status" == key ? element && (params["status"] = "home") : params[key] = element;
        }
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.GameEventLVFinish_csryw, params);
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          var _um_sdu = 0;
          duration && (_um_sdu = 1e3 * duration);
          window["wx"].uma.stage.onEnd({
            stageId: level + "",
            stageName: "\u7b2c" + level + "\u5173",
            event: isWin ? "complete" : "fail",
            _um_sdu: _um_sdu
          });
        }
      };
      UmengMgr.sendEvent_Commerce_csryw = function(params) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.Event_Commerce_csryw, params);
      };
      UmengMgr.sendEvent_Custom_csryw = function(params) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.Event_Custom_csryw, params);
      };
      UmengMgr.sendLogReportInfo_csryw = function(info) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.LogReportInfo_csryw, {
          info: info
        });
      };
      UmengMgr.sendLogReportError_csryw = function(info) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.LogReportError_csryw, {
          info: info
        });
      };
      UmengMgr.sendLoginReportInfo_csryw = function(type, state, info) {
        UmengMgr.sendEvent_csryw(StatsFrameWorkEvent.LoginReportInfo_csryw, {
          type: type,
          state: state,
          info: info
        });
      };
      UmengMgr.uma_trackEvent = function(event, params) {
        AppPlatform_1.default.is_WECHAT_GAME_csryw() && (window["wx"].uma ? window["wx"].uma.trackEvent(event, params) : LogUtils_1.LogUtils.error_csryw("\u7edf\u8ba1\u4e8b\u4ef6 \u65e0\u53cb\u76df"));
      };
      return UmengMgr;
    }();
    exports.UmengMgr = UmengMgr;
    cc._RF.pop();
  }, {
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "../Util/AppPlatform": "AppPlatform",
    "../Util/LogUtils": "LogUtils"
  } ],
  UnitAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a27cbwn2BxJ6p97gHz+e3+u", "UnitAction");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../../common/fixcomponent/FixManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UnitAction = function(_super) {
      __extends(UnitAction, _super);
      function UnitAction() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.actions = [];
        _this.priorityDuration = 0;
        return _this;
      }
      Object.defineProperty(UnitAction.prototype, "currentAnimPriority", {
        get: function() {
          return null == this.currentAction ? 0 : this.priorityDuration <= 0 ? 0 : this.currentAction.priority;
        },
        enumerable: false,
        configurable: true
      });
      UnitAction.prototype.onLoad = function() {
        var _a;
        this.animation = null !== (_a = this.getComponent(cc.Animation)) && void 0 !== _a ? _a : this.getComponentInChildren(cc.Animation);
        if (null != this.animation) {
          this.hookAnimation(this.animation);
          this.animation.on(cc.Animation.EventType.PLAY, this.onAnimationPlay, this);
          this.animation.on(cc.Animation.EventType.FINISHED, this.onAnimationEnd, this);
        }
      };
      UnitAction.prototype.hookAnimation = function(animation) {
        if (this.animation["_hook_"]) return;
        var chips = this.animation.getClips();
        for (var i = 0; i < chips.length; i++) {
          var state = this.animation.getAnimationState(chips[i].name);
          var func = state["update"];
          state["update"] = function() {};
          state["hookUpdate"] = func;
        }
        this.animation["_hook_"] = true;
      };
      UnitAction.prototype.setAction = function(actions) {
        this.actions = actions;
      };
      UnitAction.prototype.setActionConsumer = function(consumer) {
        this.actionConsumer = consumer;
      };
      UnitAction.prototype.playAction = function(name) {
        if (null == this.animation) return false;
        var action = this.actions.find(function(item) {
          return item.key == name;
        });
        if (null == action || this.currentAction && this.currentAction.key == action.key || this.currentAnimPriority > action.priority) return false;
        this.currentAction = action;
        var state = this.animation.getAnimationState(this.currentAction.key);
        state ? this.priorityDuration = state.duration : console.error(this.node.name, this.currentAction.key);
        this.animation.play(this.currentAction.key);
        return true;
      };
      UnitAction.prototype.fixUpdate = function() {
        var dt = FixManager_1.default.fixedDeltaTime;
        this.animationState && this.animationState["hookUpdate"](dt);
        this.priorityDuration -= dt;
      };
      UnitAction.prototype.onAnimationPlay = function() {
        var state = arguments[1];
        this.animationState = state;
      };
      UnitAction.prototype.onAnimationEnd = function() {
        var state = arguments[1];
        this.currentAction && this.currentAction.key == state.name;
      };
      UnitAction.prototype.onActionEvent = function() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        var action = args[0];
        args.shift();
        this.actionConsumer && this.actionConsumer.onConsumeAction(action, args);
      };
      UnitAction = __decorate([ ccclass ], UnitAction);
      return UnitAction;
    }(FixComponent_1.default);
    exports.default = UnitAction;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../common/fixcomponent/FixManager": "FixManager"
  } ],
  UnitBindManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8068e2XYs1Eu5hJed/fDJ8Z", "UnitBindManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UnitBindPoint_1 = require("./UnitBindPoint");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UnitBindManager = function(_super) {
      __extends(UnitBindManager, _super);
      function UnitBindManager() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UnitBindManager.prototype.getBindPointByKey = function(key) {
        var bindPoints = this.getComponentsInChildren(UnitBindPoint_1.default);
        for (var i = 0; i < bindPoints.length; i++) if (bindPoints[i].key == key) return bindPoints[i];
        return null;
      };
      UnitBindManager.prototype.addBindGameObject = function(bindPointKey, go, key, loop) {
        var bp = this.getBindPointByKey(bindPointKey);
        if (null == bp) return;
        bp.addBindGameObject(go, key, loop);
      };
      UnitBindManager.prototype.removeBindGameObject = function(bindPointKey, key) {
        var bp = this.getBindPointByKey(bindPointKey);
        if (null == bp) return;
        bp.removeBindGameObject(key);
      };
      UnitBindManager.prototype.removeAllBindGameObject = function(key) {
        var bindPoints = this.getComponentsInChildren(UnitBindPoint_1.default);
        for (var i = 0; i < bindPoints.length; i++) bindPoints[i].removeBindGameObject(key);
      };
      UnitBindManager = __decorate([ ccclass ], UnitBindManager);
      return UnitBindManager;
    }(cc.Component);
    exports.default = UnitBindManager;
    cc._RF.pop();
  }, {
    "./UnitBindPoint": "UnitBindPoint"
  } ],
  UnitBindPoint: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ed6ah+fl9A4oV/D5GcaFos", "UnitBindPoint");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BindGameObjectInfo = void 0;
    var AssetManager_1 = require("../../common/AssetManager");
    var SightEffect_1 = require("../../common/SightEffect");
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UnitBindPoint = function(_super) {
      __extends(UnitBindPoint, _super);
      function UnitBindPoint() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.key = "";
        _this.offset = new cc.Vec2();
        _this.bindGameObject = {};
        return _this;
      }
      UnitBindPoint.prototype.fixUpdate = function() {
        var toRemove = [];
        for (var key in this.bindGameObject) {
          var goInfo = this.bindGameObject[key];
          if (null == goInfo.gameObject) {
            toRemove.push(key);
            continue;
          }
          if (false == goInfo.forever) {
            goInfo.duration -= FixManager_1.default.fixedDeltaTime;
            if (goInfo.duration <= 0) {
              goInfo.gameObject.destroy();
              toRemove.push(key);
            }
          }
        }
        for (var i = 0; i < toRemove.length; i++) delete this.bindGameObject[toRemove[i]];
      };
      UnitBindPoint.prototype.addBindGameObject = function(goPath, key, loop) {
        if ("" != key && null != this.bindGameObject[key]) return;
        var prefab = AssetManager_1.default.getPrefab(goPath);
        if (null == prefab) return;
        var effectGO = cc.instantiate(prefab);
        effectGO.setPosition(this.offset);
        effectGO.parent = this.node;
        effectGO.active = true;
        var se = effectGO.getComponent(SightEffect_1.default);
        if (!se) {
          effectGO.destroy();
          return;
        }
        var duration = se.duration * (false == loop ? 1 : -1);
        var bindGameObjectInfo = new BindGameObjectInfo(effectGO, duration);
        "" != key ? this.bindGameObject[key] = bindGameObjectInfo : this.bindGameObject[cc.director.getTotalFrames() * Math.random() * 10 + "_" + Math.random()] = bindGameObjectInfo;
      };
      UnitBindPoint.prototype.removeBindGameObject = function(key) {
        var info = this.bindGameObject[key];
        if (null == info) return;
        info.gameObject && info.gameObject.destroy();
        delete this.bindGameObject[key];
      };
      __decorate([ property(cc.String) ], UnitBindPoint.prototype, "key", void 0);
      __decorate([ property(cc.Vec2) ], UnitBindPoint.prototype, "offset", void 0);
      UnitBindPoint = __decorate([ ccclass ], UnitBindPoint);
      return UnitBindPoint;
    }(FixComponent_1.default);
    exports.default = UnitBindPoint;
    var BindGameObjectInfo = function() {
      function BindGameObjectInfo(gameObject, duration) {
        this.gameObject = gameObject;
        this.duration = Math.abs(duration);
        this.forever = duration <= 0;
      }
      return BindGameObjectInfo;
    }();
    exports.BindGameObjectInfo = BindGameObjectInfo;
    cc._RF.pop();
  }, {
    "../../common/AssetManager": "AssetManager",
    "../../common/SightEffect": "SightEffect",
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager"
  } ],
  UnitMovement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3957dGQcb9MdrZVZ3FYM93+", "UnitMovement");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../common/fixcomponent/FixComponent");
    var FixManager_1 = require("../../common/fixcomponent/FixManager");
    var GamaManager_1 = require("../manager/GamaManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var UnitMovement = function(_super) {
      __extends(UnitMovement, _super);
      function UnitMovement() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.canMove = true;
        _this.velocity = new cc.Vec2();
        _this.curVelocity = new cc.Vec2();
        _this.bodyRadius = 0;
        _this.hit = false;
        _this.hitY = false;
        _this.hitX = false;
        _this.hitPoint = new cc.Vec2();
        return _this;
      }
      UnitMovement.prototype.move = function(velocity) {
        if (false == this.canMove) return;
        this.velocity.set(velocity);
      };
      UnitMovement.prototype.StopMoving = function() {
        this.velocity.set(cc.Vec2.ZERO);
      };
      UnitMovement.prototype.DisableMove = function() {
        this.StopMoving();
        this.canMove = false;
      };
      UnitMovement.prototype.EnableMove = function() {
        this.canMove = true;
      };
      UnitMovement.prototype.ResetHit = function() {
        this.hit = false;
        this.hitX = false;
        this.hitY = false;
        this.hitPoint.set(cc.Vec2.ZERO);
      };
      UnitMovement.prototype.fixUpdate = function() {
        this.ResetHit();
        if (false == this.canMove || this.velocity.lengthSqr() <= 1e-5) return;
        this.curVelocity.set(this.velocity);
        var fixedDeltaTime = FixManager_1.default.fixedDeltaTime;
        var targetPos = cc.v2(this.velocity.x * fixedDeltaTime + this.node.x, this.velocity.y * fixedDeltaTime + this.node.y);
        var result = cc.v2();
        if (GamaManager_1.default.inst.fixMovementPosition(targetPos, result)) {
          this.hit = true;
          this.hitX = targetPos.x != result.x;
          this.hitY = targetPos.y != result.y;
          this.hitPoint.set(result);
        }
        this.node.setPosition(result);
        this.velocity.set(cc.Vec2.ZERO);
        this.node.zIndex = Math.floor(cc.macro.MAX_ZINDEX - (this.node.y - GamaManager_1.default.inst.minY));
      };
      UnitMovement = __decorate([ ccclass ], UnitMovement);
      return UnitMovement;
    }(FixComponent_1.default);
    exports.default = UnitMovement;
    cc._RF.pop();
  }, {
    "../../common/fixcomponent/FixComponent": "FixComponent",
    "../../common/fixcomponent/FixManager": "FixManager",
    "../manager/GamaManager": "GamaManager"
  } ],
  User: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1a5ei05EVBtYVLpdIe0BNl", "User");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UserGameData = void 0;
    var EventMgr_1 = require("../Event/EventMgr");
    var EventEnum_1 = require("../Event/EventEnum");
    var PhysicalPowerMgr_1 = require("../Mgr/PhysicalPowerMgr");
    var GameMgr_1 = require("../Mgr/GameMgr");
    var UserGameData = function() {
      function UserGameData() {
        this.physicalData = {};
        this.levelNum = 1;
        this.moneyNum = 0;
        this.gameTime = 0;
        this.weapons = [ "1" ];
        this.useWeapon = "1";
        this.showSharedTime = 0;
        this.killMonster = {};
      }
      return UserGameData;
    }();
    exports.UserGameData = UserGameData;
    var User = function() {
      function User() {}
      Object.defineProperty(User, "isLogin_csryw", {
        get: function() {
          return "" != User.code_csryw || "" != User.token_csryw;
        },
        enumerable: false,
        configurable: true
      });
      User.getSaveData_csryw = function() {
        User._gameData_csryw.physicalData = PhysicalPowerMgr_1.default.getData();
        return JSON.stringify(User._gameData_csryw);
      };
      User.testInitUser_csryw = function() {
        User._gameData_csryw.levelNum = 1;
        User._gameData_csryw.moneyNum = 1e3;
        User._gameData_csryw.gameTime = 0;
        User._gameData_csryw.useWeapon = "1";
        User._gameData_csryw.weapons = [ "1" ];
      };
      User.initiUser_csryw = function(data) {
        var _a, _b, _c;
        console.log("*****************************  User initUser  **************************************  ");
        console.log(data);
        if (data && 0 != data) {
          User._gameData_csryw.levelNum = User.verify(data.levelNum, 0);
          User._gameData_csryw.moneyNum = User.verify(data.moneyNum, 0);
          PhysicalPowerMgr_1.default.initData(User.verify(data.physicalData, {}));
          User._gameData_csryw.gameTime = User.verify(data.gameTime, 0);
          User._gameData_csryw.weapons = null !== (_a = data.weapons) && void 0 !== _a ? _a : [ "1" ];
          User._gameData_csryw.useWeapon = null !== (_b = data.useWeapon) && void 0 !== _b ? _b : "1";
          User._gameData_csryw.showSharedTime = User._gameData_csryw.gameTime;
          User._gameData_csryw.killMonster = null !== (_c = data.killMonster) && void 0 !== _c ? _c : {};
        }
      };
      User.setLeveNum_csryw = function(levelNum) {
        User._gameData_csryw.levelNum = levelNum;
      };
      User.getLeveNum_csryw = function() {
        return User._gameData_csryw.levelNum;
      };
      User.addMoney_csryw = function(add) {
        add = Math.ceil(add);
        var last = User._gameData_csryw.moneyNum;
        User._gameData_csryw.moneyNum += add;
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_Game_OnUserMoneyChange_csryw, {
          curr: User._gameData_csryw.moneyNum,
          last: last
        });
      };
      User.subMoney_csryw = function(sub) {
        sub = Math.ceil(sub);
        var last = User._gameData_csryw.moneyNum;
        User._gameData_csryw.moneyNum -= sub;
        User._gameData_csryw.moneyNum < 0 && (User._gameData_csryw.moneyNum = 0);
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_Game_OnUserMoneyChange_csryw, {
          curr: User._gameData_csryw.moneyNum,
          last: last
        });
      };
      User.getMoney_csryw = function() {
        return User._gameData_csryw.moneyNum;
      };
      User.addGameTime = function() {
        User._gameData_csryw.gameTime++;
        GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
      };
      User.getGameTime = function() {
        return User._gameData_csryw.gameTime;
      };
      User.addWeapon = function(id) {
        if (this.checkHasWeapon(id)) return;
        User._gameData_csryw.weapons.push(id);
        User._gameData_csryw.useWeapon = id;
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.weaponRefresh);
        GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
      };
      User.checkHasWeapon = function(id) {
        var index = User._gameData_csryw.weapons.indexOf(id);
        return -1 != index;
      };
      User.useWeapon = function(id) {
        if (!this.checkHasWeapon(id)) return;
        User._gameData_csryw.useWeapon = id;
        EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.weaponRefresh);
        GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
      };
      Object.defineProperty(User, "useWeaponId", {
        get: function() {
          return User._gameData_csryw.useWeapon;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(User, "showShareTime", {
        get: function() {
          return User._gameData_csryw.showSharedTime;
        },
        enumerable: false,
        configurable: true
      });
      User.updateNoSharedTime = function() {
        User._gameData_csryw.showSharedTime = this._gameData_csryw.gameTime;
        GameMgr_1.default.getInstance_csryw().saveGameData_csryw();
      };
      User.addKillMonster = function(monsterId) {
        var count = this.getKillMonsterCount(monsterId);
        User._gameData_csryw.killMonster[monsterId] = count + 1;
      };
      User.getKillMonsterCount = function(monsterId) {
        var _a;
        return null !== (_a = User._gameData_csryw.killMonster[monsterId]) && void 0 !== _a ? _a : 0;
      };
      User.verify = function(data, defaultValue) {
        if (void 0 !== data) return data;
        return defaultValue;
      };
      User.code_csryw = "";
      User.openId_csryw = "";
      User.token_csryw = null;
      User.nickName_csryw = "";
      User.gender_csryw = 0;
      User._gameData_csryw = new UserGameData();
      return User;
    }();
    exports.default = User;
    cc._RF.pop();
  }, {
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "../Mgr/GameMgr": "GameMgr",
    "../Mgr/PhysicalPowerMgr": "PhysicalPowerMgr"
  } ],
  Utilit: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61c44zlHUFAS7qfo4uDNl9l", "Utilit");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppConfig_1 = require("../Config/AppConfig");
    var AppPlatform_1 = require("./AppPlatform");
    var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
    var Utilit = function() {
      function Utilit() {}
      Utilit.random_csryw = function(range) {
        return Math.floor(Math.random() * range);
      };
      Utilit.convertDesignToFrameSize_csryw = function(node) {
        var pos = node.convertToWorldSpace(cc.v2(0, node.height));
        var nodeWidth = node.width;
        var size = cc.view.getFrameSize();
        var size3 = cc.view.getVisibleSize();
        var canvasNode = cc.director.getScene().getChildByName("Canvas");
        var scale = 1;
        var _cheight = 0;
        var _cwidth = 0;
        if (canvasNode) {
          var canvas = canvasNode.getComponent(cc.Canvas);
          if (canvas.fitWidth && canvas.fitHeight) {
            var scaleX = size.width / size3.width;
            var scaleY = size.height / size3.height;
            if (scaleX < scaleY) {
              scale = scaleX;
              _cwidth = size3.width;
              _cheight = size.height * size3.width / size.width;
            } else {
              scale = scaleY;
              _cheight = size3.height;
              _cwidth = size.width * size3.height / size.height;
            }
            _cheight = (_cheight - size3.height) / 2;
            _cwidth = (_cwidth - size3.width) / 2;
          } else canvas.fitWidth ? scale = size.width / size3.width : canvas.fitHeight && (scale = size.height / size3.height);
        }
        var pointY = size3.height - pos.y + _cheight;
        var left = pos.x * scale + _cwidth;
        var top = pointY * scale;
        var width = nodeWidth * scale;
        var tab = {};
        tab["left"] = left;
        tab["top"] = top;
        tab["width"] = width;
        return tab;
      };
      Utilit.colorHex2Rgb_csryw = function(hex) {
        var color = cc.color(75, 154, 228);
        if (6 == hex.length) {
          var r = parseInt("0x" + hex.slice(0, 2));
          var g = parseInt("0x" + hex.slice(2, 4));
          var b = parseInt("0x" + hex.slice(4, 6));
          color.r = r;
          color.g = g;
          color.b = b;
        }
        return color;
      };
      Utilit.checkVersions_csryw = function() {
        var cur = AppConfig_1.default.Versions_csryw;
        if (null === cur || "" === cur) return true;
        return AppPlatform_1.default.is_TT_GAME_csryw() ? cur === AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().ttcfg_csryw.ttversions_csryw : AppPlatform_1.default.is_OPPO_GAME_csryw() ? cur === AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().oppocfg_csryw.oppoversions_csryw : AppPlatform_1.default.is_QQ_PLAY_csryw() ? cur === AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().qqcfg_csryw.qqversions_csryw : AppPlatform_1.default.is_WECHAT_GAME_csryw() ? cur === AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().version_csryw : !AppPlatform_1.default.is_WECHAT_GAME_csryw() || cur === AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.vivoversions_csryw;
      };
      Utilit.ryw_OriginStageWidth_csryw = 1334;
      Utilit.ryw_OriginStageHeight_csryw = 750;
      Utilit.ryw_grayscaleMat_csryw = [ .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0 ];
      return Utilit;
    }();
    exports.default = Utilit;
    cc._RF.pop();
  }, {
    "../Config/AppConfig": "AppConfig",
    "../Config/AppSwitchConfig": "AppSwitchConfig",
    "./AppPlatform": "AppPlatform"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c825cVBiXRDT6wXGcZ+JYmK", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Utils = function() {
      function Utils() {}
      Utils.getRootModel = function(name, component) {
        component = component || name;
        var node = cc.find(name);
        if (node) return node.getComponent(component);
      };
      Utils.parseFloatParams = function(value) {
        var num = 0;
        if ("string" == typeof value) {
          num = parseFloat(value);
          if (isNaN(num)) return 0;
        }
        return num;
      };
      Utils.parseIntParams = function(value) {
        var num = 0;
        if ("string" == typeof value) {
          num = parseInt(value);
          if (isNaN(num)) return 0;
        }
        return num;
      };
      Utils.isStringNull = function(value) {
        return null == value || "" == value;
      };
      Utils.isNull = function(value) {
        return null == value || void 0 == value;
      };
      Utils.getConfigValue = function(value, def) {
        return this.isNull(value) ? value : def;
      };
      Utils.random = function(min, max) {
        switch (arguments.length) {
         case 1:
          return 0 == min ? 0 : parseInt((Math.random() * min + 1).toString(), 10);

         case 2:
          return parseInt((Math.random() * (max - min + 1) + min).toString(), 10);

         default:
          return 0;
        }
      };
      Utils.mergeTable = function(e, t) {
        if (!t) return e;
        for (var a in t) if (t.hasOwnProperty(a)) {
          var r = t[a];
          e[a] ? e[a] += r : e[a] = r;
        }
        return e;
      };
      Utils.getRandomListByCount = function(arr, count) {
        if (arr.length <= count) return arr;
        var result = [];
        for (var i = 0; i < count; i++) {
          var i = this.random(0, arr.length - 1);
          result.push(arr[i]);
          arr.splice(i, 1);
        }
        return result;
      };
      Utils.randomPointInCircle = function(radius) {
        var angle = Math.random() * Math.PI * 2;
        var x = Math.cos(angle) * radius;
        var y = Math.sin(angle) * radius;
        return cc.v2(x, y);
      };
      Utils.stringPadding = function(num, length) {
        for (var len = (num + "").length; len < length; len = num.length) num = "0" + num;
        return num;
      };
      return Utils;
    }();
    exports.default = Utils;
    cc._RF.pop();
  }, {} ],
  VIVOAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08928uow1VAept/ZcH0nf9M", "VIVOAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppPlatform_1 = require("../../FrameWork/Util/AppPlatform");
    var AppSwitchConfig_1 = require("../../FrameWork/Config/AppSwitchConfig");
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var VIVOAPI = function() {
      function VIVOAPI() {}
      Object.defineProperty(VIVOAPI, "BannerInstance_csryw", {
        get: function() {
          return this._banner_csryw;
        },
        enumerable: false,
        configurable: true
      });
      VIVOAPI.Login_csryw = function(onSuccess, onFail) {
        if (window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
          console.log("vivo \u5f00\u59cb\u767b\u9646 >= 1053");
          window["qg"].login().then(function(res) {
            if (res.data.token) {
              var token = res.data.token;
              onSuccess(token, true);
              console.log("vivo \u767b\u9646\u6210\u529f,\u83b7\u53d6\u5230 token : " + token);
            } else {
              console.log("\u767b\u5f55\u5931\u8d25 res.data.token \u4e3a null");
              onFail();
            }
          }, function(err) {
            console.log("\u767b\u5f55\u5931\u8d25" + JSON.stringify(err));
            onFail();
          });
        } else {
          console.log("vivo \u5f00\u59cb\u767b\u9646 < 1053");
          window["qg"].authorize({
            type: "token",
            success: function(data) {
              window["qg"].getProfile({
                token: data.accessToken,
                success: function(data) {
                  console.log("openid\u83b7\u53d6\u6210\u529f", data.openid);
                  onSuccess(data.openid, false);
                },
                fail: function(data, code) {
                  console.log("\u83b7\u53d6openid\u5931\u8d25 : " + code);
                  onFail();
                }
              });
            },
            fail: function(data, code) {
              console.log("\u767b\u5f55\u5931\u8d25" + code);
              onFail();
            }
          });
        }
      };
      VIVOAPI.showDialog_csryw = function(titel, message, buttons, success, cancel, fail) {
        window["qg"].showDialog({
          title: titel,
          message: message,
          buttons: buttons,
          success: function(data) {
            console.log("handling callback");
            success();
          },
          cancel: function() {
            console.log("handling cancel");
            cancel();
          },
          fail: function(data, code) {
            console.log("handling fail, code = " + code);
            fail();
          }
        });
      };
      VIVOAPI.createRewardedVideoAd_csryw = function() {
        if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          VIVOAPI.rewardedAd_csryw = window["qg"].createRewardedVideoAd({
            posId: VIVOAPI.adUnitId_csryw,
            style: {}
          });
          VIVOAPI.rewardedAd_csryw.onError(function(err) {
            switch (err.errCode) {
             case -3:
              console.log("\u6fc0\u52b1\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25---\u8c03\u7528\u592a\u9891\u7e41", JSON.stringify(err));
              break;

             case -4:
              console.log("\u6fc0\u52b1\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25--- \u4e00\u5206\u949f\u5185\u4e0d\u80fd\u91cd\u590d\u52a0\u8f7d", JSON.stringify(err));
              break;

             case 30008:
              break;

             default:
              console.log("\u6fc0\u52b1\u5e7f\u544a\u5c55\u793a\u5931\u8d25");
              console.log(JSON.stringify(err));
            }
          });
          VIVOAPI.rewardedAd_csryw.onLoad(function() {
            var adshow = VIVOAPI.rewardedAd_csryw.show();
            adshow && adshow.then(function() {
              console.log("\u6fc0\u52b1\u5e7f\u544a\u5c55\u793a\u6210\u529f");
            }).catch(function(err) {
              console.log("\u6fc0\u52b1\u5e7f\u544a\u5c55\u793a\u5931\u8d25" + JSON.stringify(err));
              VIVOAPI.onFailed();
            });
          });
          VIVOAPI.rewardedAd_csryw.onClose(function(res) {
            if (res && res.isEnded) {
              console.log("\u6b63\u5e38\u64ad\u653e\u7ed3\u675f\uff0c\u53ef\u4ee5\u4e0b\u53d1\u6e38\u620f\u5956\u52b1");
              VIVOAPI.onAdClose(true);
            } else {
              console.log("\u64ad\u653e\u4e2d\u9014\u9000\u51fa\uff0c\u4e0d\u4e0b\u53d1\u6e38\u620f\u5956\u52b1");
              VIVOAPI.onAdClose(false);
            }
          });
        }
      };
      VIVOAPI.showRewardedVideoAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          VIVOAPI.onAdClose = onAdClose;
          VIVOAPI.onFailed = onFailed;
          console.log("---------------------------------- VIVOAPI.rewardedAd:", VIVOAPI.rewardedAd_csryw + ",VIVOAPI.rewardedAdNum:", VIVOAPI.rewardedAdNum_csryw);
          if (0 == VIVOAPI.rewardedAdNum_csryw) VIVOAPI.createRewardedVideoAd_csryw(); else {
            var adLoad = VIVOAPI.rewardedAd_csryw.load();
            adLoad && adLoad.catch(function(err) {
              console.log("\u6fc0\u52b1\u5e7f\u544aload\u5931\u8d25" + JSON.stringify(err));
              onFailed();
            });
          }
          VIVOAPI.rewardedAdNum_csryw = 1;
          console.log("\u8fd1\u6765showRewardedVideoAd");
        }
      };
      VIVOAPI.showBannerAd_csryw = function() {
        var self = this;
        if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          console.log("===========bannerAd showBanerAd");
          var systemInfo = window["qg"].getSystemInfoSync();
          var sw = systemInfo.screenWidth;
          var sh = systemInfo.screenHeight;
          this.mBannerAd_csryw = window["qg"].createBannerAd({
            posId: VIVOAPI.bannerAdUnitId_csryw,
            style: {}
          });
          var adshow = this.mBannerAd_csryw.show();
          adshow && adshow.then(function() {
            console.log("banner\u5e7f\u544a\u5c55\u793a\u6210\u529f");
          }).catch(function(err) {
            switch (err.code) {
             case 30003:
              console.log("\u65b0\u7528\u62377\u5929\u5185\u4e0d\u80fd\u66dd\u5149Banner\uff0c\u8bf7\u5c06\u624b\u673a\u65f6\u95f4\u8c03\u6574\u4e3a7\u5929\u540e\uff0c\u9000\u51fa\u6e38\u620f\u91cd\u65b0\u8fdb\u5165");
              break;

             case 30009:
              console.log("10\u79d2\u5185\u8c03\u7528\u5e7f\u544a\u6b21\u6570\u8d85\u8fc71\u6b21\uff0c10\u79d2\u540e\u518d\u8c03\u7528");
              break;

             case 30002:
              console.log("\u52a0\u8f7d\u5e7f\u544a\u5931\u8d25\uff0c\u91cd\u65b0\u52a0\u8f7d\u5e7f\u544a");
              break;

             default:
              console.log("banner\u5e7f\u544a\u5c55\u793a\u5931\u8d25");
              console.log(JSON.stringify(err));
            }
          });
          this.mBannerAd_csryw.onError(function(err) {
            console.log("Banner\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25111:" + JSON.stringify(err));
          });
        }
      };
      VIVOAPI.hideBannerAd_csryw = function() {
        if (this.mBannerAd_csryw) {
          console.log("===========bannerAd \u9690\u85cf");
          this.mBannerAd_csryw.hide();
          this.mBannerAd_csryw.destroy();
          this.mBannerAd_csryw = null;
        } else console.log("===========bannerAd \u4e3a\u7a7a");
      };
      VIVOAPI.navigateToMiniProgram_csryw = function(pkgName, path, onSuccess, onFail, onComplate) {
        if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          console.log("vivo \u8df3\u8f6c\u6e38\u620f\uff1a " + pkgName);
          window["qg"].navigateToMiniGame({
            pkgName: pkgName,
            path: path,
            extraData: {
              from: AppConfig_1.default.AppID_csryw
            },
            envVersion: "release",
            success: function(res) {
              onSuccess && onSuccess(res);
            },
            fail: function(res) {
              onFail && onFail(res);
            },
            complete: function(res) {
              onComplate && onComplate(res);
            }
          });
        }
      };
      VIVOAPI.showInterstitialAd_csryw = function(onAdClose, onFailed) {
        if (AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          var insertAd = window["qg"].createInterstitialAd({
            posId: VIVOAPI.InsAdUnitId_csryw
          });
          insertAd.onLoad(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
          });
          insertAd.onClose(function() {
            onAdClose && onAdClose();
          });
          insertAd.onError(function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u62c9\u53d6\u5931\u8d25", JSON.stringify(err));
            onFailed && onFailed();
          });
          insertAd.show().then(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a\u663e\u793a\u6210\u529f");
          }).catch(function(err) {
            onFailed && onFailed();
          });
        } else onAdClose && onAdClose();
      };
      VIVOAPI.getLaunchOptionsSync_csryw = function() {
        return {};
      };
      VIVOAPI.share_csryw = function(complate) {
        AppPlatform_1.default.is_VIVO_GAME_csryw() && window["qg"].share({
          success: function() {
            null != complate && complate(true);
            window["qg"].showToast({
              message: "\u5206\u4eab\u6210\u529f"
            });
          },
          fail: function(erromsg, errocode) {
            window["qg"].showToast({
              message: "\u5206\u4eab\u5931\u8d25"
            });
          },
          cancel: function() {
            window["qg"].showToast({
              message: "\u5206\u4eab\u5931\u8d25"
            });
          },
          complete: function() {}
        });
      };
      VIVOAPI.createDesktopIcon_csryw = function(onSuccess, onFail) {
        AppPlatform_1.default.is_VIVO_GAME_csryw() ? window["qg"].hasShortcutInstalled({
          success: function(res) {
            if (false == res) window["qg"].installShortcut({
              success: function() {
                onSuccess && onSuccess();
              },
              fail: function(err) {
                onFail && onFail();
                console.log("\u521b\u5efa\u684c\u9762\u56fe\u6807\u5931\u8d25\uff01\uff01\uff01\uff01", err);
                for (var key in err) console.log(key, err);
              },
              complete: function() {}
            }); else {
              console.log("\u684c\u9762\u56fe\u6807\u5df2\u5b58\u5728\uff01\uff01\uff01\uff01");
              onFail && onFail();
            }
          },
          fail: function(err) {
            onFail && onFail();
            console.log("\u5224\u65ad\u684c\u9762\u56fe\u6807\u662f\u5426\u5b58\u5728\u5931\u8d25\uff01\uff01\uff01", err);
            for (var key in err) console.log(key, err);
          },
          complete: function() {}
        }) : onFail && onFail();
      };
      VIVOAPI.tryShowNativeAd_csryw = function() {
        var yuanshengSwitch = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.yuanshengSwitch_csryw;
        var vivoVersions = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.vivoversions_csryw;
        return 1 == yuanshengSwitch && vivoVersions == AppConfig_1.default.Versions_csryw;
      };
      VIVOAPI.tryPopCreateDestopIcon_csryw = function(onSuccess, onFail) {
        if (!AppPlatform_1.default.is_VIVO_GAME_csryw()) {
          null != onFail && onFail();
          return;
        }
        1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.addToDesktop_csryw ? VIVOAPI.createDesktopIcon_csryw(onSuccess, onFail) : null != onFail && onFail();
      };
      VIVOAPI.tryShowInsAd_csryw = function(onSuccess, onFail) {
        var chapingSwitch = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.chapingSwitch_csryw;
        if (1 == chapingSwitch) {
          var rate = 100 * Math.random();
          rate <= AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().vivocfg_csryw.chaping_csryw ? VIVOAPI.showInterstitialAd_csryw(function() {
            onSuccess && onSuccess();
          }, function() {
            onFail && onFail();
          }) : onFail && onFail();
        } else onFail && onFail();
      };
      VIVOAPI.LoadCahcedNativeAd_csryw = function() {
        return;
        var self;
      };
      VIVOAPI.hasShortcutInstalled_csryw = function(onSuccess, onFail) {
        window["qg"].hasShortcutInstalled({
          success: function(res) {
            if (false == res) {
              console.log("\u684c\u9762\u56fe\u6807\u4e0d\u5b58\u5728\uff01\uff01\uff01\uff01");
              onSuccess && onSuccess(false);
            } else {
              console.log("\u684c\u9762\u56fe\u6807\u5df2\u5b58\u5728\uff01\uff01\uff01\uff01");
              onSuccess && onSuccess(true);
            }
          },
          fail: function(err) {
            onFail && onFail();
            console.log("\u5224\u65ad\u684c\u9762\u56fe\u6807\u662f\u5426\u5b58\u5728\u5931\u8d25\uff01\uff01\uff01", err);
            for (var key in err) console.log(key, err);
          },
          complete: function() {}
        });
      };
      VIVOAPI.adUnitId_csryw = "";
      VIVOAPI.bannerAdUnitId_csryw = "";
      VIVOAPI.nativeAdId_csryw = "";
      VIVOAPI.InsAdUnitId_csryw = "";
      VIVOAPI.rewardedAd_csryw = null;
      VIVOAPI.rewardedAdNum_csryw = 0;
      VIVOAPI._banner_csryw = null;
      VIVOAPI.mBannerAd_csryw = null;
      VIVOAPI._cachedNativeAd_csryw = null;
      VIVOAPI._cachedAdItem_csryw = null;
      VIVOAPI._cachedimgUrl_csryw = null;
      VIVOAPI._tryLoadCount_csryw = 5;
      return VIVOAPI;
    }();
    exports.default = VIVOAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig",
    "../../FrameWork/Config/AppSwitchConfig": "AppSwitchConfig",
    "../../FrameWork/Util/AppPlatform": "AppPlatform"
  } ],
  VibrateMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1fd08XFy1K54GbFPz7QBml", "VibrateMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AppPlatform_1 = require("../Util/AppPlatform");
    var VibrateMgr = function() {
      function VibrateMgr() {}
      VibrateMgr.vibrateShort_csryw = function() {
        if (!VibrateMgr.isEnable_csryw) return;
        var name = "";
        AppPlatform_1.default.is_TT_GAME_csryw() ? name = "tt" : AppPlatform_1.default.is_WECHAT_GAME_csryw() ? name = "wx" : AppPlatform_1.default.is_OPPO_GAME_csryw() || AppPlatform_1.default.is_VIVO_GAME_csryw() ? name = "qg" : AppPlatform_1.default.is_QQ_PLAY_csryw() && (name = "qq");
        "" != name && window[name].vibrateShort();
      };
      VibrateMgr.vibrateLong_csryw = function() {
        if (!VibrateMgr.isEnable_csryw) return;
        var name = "";
        AppPlatform_1.default.is_TT_GAME_csryw() ? name = "tt" : AppPlatform_1.default.is_WECHAT_GAME_csryw() ? name = "wx" : AppPlatform_1.default.is_OPPO_GAME_csryw() || AppPlatform_1.default.is_VIVO_GAME_csryw() ? name = "qg" : AppPlatform_1.default.is_QQ_PLAY_csryw() && (name = "qq");
        "" != name && window[name].vibrateLong();
      };
      VibrateMgr.vibrate_csryw = function(time) {
        if (!VibrateMgr.isEnable_csryw) return;
        var num = 0;
        var count = time / 15;
        var funCall = null;
        funCall = function(cTime) {
          setTimeout(function() {
            VibrateMgr.vibrateShort_csryw();
            num++;
            num <= count && funCall(cTime);
          }, cTime);
        };
        if (AppPlatform_1.default.is_TT_GAME_csryw()) {
          count = time / 15;
          funCall(16);
        } else if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          count = time / 15;
          funCall(16);
        } else if (AppPlatform_1.default.is_OPPO_GAME_csryw()) {
          count = time / 20;
          funCall(21);
        } else if (AppPlatform_1.default.is_QQ_PLAY_csryw()) {
          count = time / 20;
          funCall(21);
        }
      };
      VibrateMgr.isEnable_csryw = true;
      return VibrateMgr;
    }();
    exports.default = VibrateMgr;
    cc._RF.pop();
  }, {
    "../Util/AppPlatform": "AppPlatform"
  } ],
  WXAPI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc8023CDWpHe7xTzNvqfFhi", "WXAPI");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameRecorder = void 0;
    var AppPlatform_1 = require("../../FrameWork/Util/AppPlatform");
    var AppConfig_1 = require("../../FrameWork/Config/AppConfig");
    var AppSwitchConfig_1 = require("../../FrameWork/Config/AppSwitchConfig");
    var WudianMgr_1 = require("../../FrameWork/Mgr/WudianMgr");
    var GameRecorder = function() {
      function GameRecorder() {
        this._recorder_csryw = null;
      }
      Object.defineProperty(GameRecorder.prototype, "recorder_csryw", {
        get: function() {
          return this._recorder_csryw;
        },
        enumerable: false,
        configurable: true
      });
      GameRecorder.prototype.start_csryw = function() {
        null != this.recorder_csryw && this.recorder_csryw.start();
      };
      GameRecorder.prototype.stop_csryw = function() {
        null != this.recorder_csryw && this.recorder_csryw.stop();
      };
      GameRecorder.prototype.pause_csryw = function() {
        null != this.recorder_csryw && this.recorder_csryw.pause();
      };
      GameRecorder.prototype.resume_csryw = function() {
        null != this.recorder_csryw && this.recorder_csryw.resume();
      };
      GameRecorder.prototype.abort_csryw = function() {
        null != this.recorder_csryw && this.recorder_csryw.abort();
      };
      GameRecorder.prototype.showShareBtn_csryw = function() {
        if (null != this.recorder_csryw) var button = window["wx"].createGameRecorderShareButton({
          style: {
            left: 10,
            top: 150,
            height: 50,
            color: "#ffffff",
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4,
            iconMarginRight: 16,
            paddingLeft: 1,
            paddingRight: 30
          },
          image: "button.jpg",
          text: "\u81ea\u5b9a\u4e49\u6587\u6848",
          icon: "icon.jpg",
          share: {
            query: "a=1&b=2",
            bgm: "walkin.mp3",
            timeRange: [ [ 0, 1e3 ], [ 2e3, 3e3 ] ],
            title: {
              template: "default.score",
              data: {
                score: 6500
              }
            },
            button: {
              template: "default.enter"
            }
          }
        });
      };
      return GameRecorder;
    }();
    exports.GameRecorder = GameRecorder;
    var WXAPI = function() {
      function WXAPI() {}
      WXAPI.wxLogin_csryw = function(onSuccess, onFail) {
        AppPlatform_1.default.is_WECHAT_GAME_csryw() && window["wx"].login({
          success: function(res) {
            if (res.code) {
              var code = res.code;
              console.log("\u767b\u9646\u6210\u529f,\u83b7\u53d6\u5230code : " + code);
              onSuccess(code);
            }
          }
        });
      };
      WXAPI.onRewardedVideoAdLoad_csryw = function() {
        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5b8c\u6210");
      };
      WXAPI.onRewardedVideoAdError_csryw = function(err) {
        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + err);
        console.log(JSON.stringify(err));
        WXAPI._onRewardedVideoAdFailed_csryw && WXAPI._onRewardedVideoAdFailed_csryw();
      };
      WXAPI.onRewardedVideoAdClose_csryw = function(res) {
        if (res && res.isEnded || null == res) {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u5df2\u5b8c\u6574\u89c2\u770b");
          WXAPI._onRewardedVideoAdClose_csryw && WXAPI._onRewardedVideoAdClose_csryw(true);
        } else {
          console.log("\u6fc0\u52b1\u89c6\u9891 \u672a\u5b8c\u6574\u89c2\u770b");
          WXAPI._onRewardedVideoAdClose_csryw && WXAPI._onRewardedVideoAdClose_csryw(false);
        }
      };
      WXAPI.regRewardedVideoAdEvent_csryw = function(rewardedVideoAd) {
        rewardedVideoAd.onLoad(WXAPI.onRewardedVideoAdLoad_csryw);
        rewardedVideoAd.onError(WXAPI.onRewardedVideoAdError_csryw);
        rewardedVideoAd.onClose(WXAPI.onRewardedVideoAdClose_csryw);
        WXAPI._isRegRewardedVideoAdEvent_csryw = true;
      };
      WXAPI.showRewardedVideoAd_csryw = function(onAdClose, onFailed, id) {
        var num = Math.floor(Math.random() * AppConfig_1.default.adUnitId_csryw.length);
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          WXAPI._onRewardedVideoAdClose_csryw = onAdClose;
          WXAPI._onRewardedVideoAdFailed_csryw = onFailed;
          var videoId = AppConfig_1.default.adUnitId_csryw[num];
          id && (videoId = id);
          var rewardedVideoAd_1 = window["wx"].createRewardedVideoAd({
            adUnitId: videoId
          });
          WXAPI._isRegRewardedVideoAdEvent_csryw || WXAPI.regRewardedVideoAdEvent_csryw(rewardedVideoAd_1);
          rewardedVideoAd_1.load().then(function() {
            var promise = rewardedVideoAd_1.show();
            promise.then(function() {
              return console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u6210\u529f");
            });
            promise.catch(function(err) {
              rewardedVideoAd_1.load().then(function() {
                return rewardedVideoAd_1.show();
              }).catch(function(err) {
                console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u663e\u793a\u5931\u8d25");
              });
            });
          }).catch(function(err) {
            console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25");
          });
        } else onAdClose(true);
      };
      WXAPI.navigateToMiniProgram_csryw = function(appId, path, onSuccess, onFail, onComplate) {
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          console.log("\u8df3\u8f6c\u6e38\u620f\uff1a " + appId);
          window["wx"].navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: {
              foo: "bar"
            },
            envVersion: "release",
            success: function(res) {
              onSuccess && onSuccess(res);
            },
            fail: function(res) {
              onFail && onFail(res);
            },
            complete: function(res) {
              onComplate && onComplate(res);
            }
          });
        }
      };
      WXAPI.share_csryw = function(complate, titel, imageUrl) {
        var _this = this;
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          WXAPI._onShow_csryw = function() {
            window["wx"].offShow(WXAPI._onShow_csryw);
            WXAPI._onShow_csryw = null;
            var c = Date.now() - _this._lastShareTime_csryw;
            complate && (Date.now() - _this._lastShareTime_csryw > 2e3 ? complate(true) : complate(false));
          };
          window["wx"].onShow(WXAPI._onShow_csryw);
          this._lastShareTime_csryw = Date.now();
          window["wx"].shareAppMessage({
            title: titel,
            imageUrl: imageUrl
          });
        }
      };
      WXAPI.showInterstitialAd_csryw = function(onAdClose, onFailed) {
        var num = Math.floor(Math.random() * AppConfig_1.default.InsAdUnitId_csryw.length);
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          var interstitialAd = window["wx"].createInterstitialAd({
            adUnitId: AppConfig_1.default.InsAdUnitId_csryw[num]
          });
          interstitialAd.onLoad(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u52a0\u8f7d\u5b8c\u6210");
            interstitialAd.show().catch(function(err) {
              console.log("\u63d2\u5c4f\u5e7f\u544a \u663e\u793a\u5931\u8d25 \uff1a" + err);
              onFailed && onFailed();
            });
          });
          interstitialAd.onError(function(err) {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u52a0\u8f7d\u5931\u8d25" + err);
            onFailed && onFailed();
          });
          interstitialAd.onClose(function() {
            console.log("\u63d2\u5c4f\u5e7f\u544a \u5173\u95ed");
            onAdClose && onAdClose();
          });
        } else onAdClose();
      };
      WXAPI.getLaunchOptionsSync_csryw = function() {
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          var obj_1 = window["wx"].getLaunchOptionsSync();
          console.log("\u573a\u666f\u503c " + obj_1.scene);
          var str = JSON.stringify(obj_1.query);
          console.log("Query\u53c2\u6570 " + str);
          var key = obj_1.query["key"];
          console.log("Query\u53c2\u6570\uff1akey " + key);
          console.log("ShareTicket " + obj_1.shareTicket);
          console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
          console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
          return obj_1;
        }
        var obj = {
          scene: 1001,
          query: "",
          shareTicket: "",
          appId: "",
          extraData: ""
        };
        return obj;
      };
      WXAPI.SetShareMenu_csryw = function(titel, imageUrl, success, fail, complate) {
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          console.log("\u5c0f\u6e38\u620f\u8bbe\u7f6e\u8f6c\u53d1\u6309\u94ae");
          window["wx"].showShareMenu({
            withShareTicket: false,
            success: success,
            fail: fail,
            complete: complate
          });
          window["wx"].onShareAppMessage(function() {
            return {
              title: titel,
              imageUrl: imageUrl
            };
          });
        }
      };
      WXAPI.checkUpdate_csryw = function() {
        if (AppPlatform_1.default.is_WECHAT_GAME_csryw()) {
          var updateManager = window["wx"].getUpdateManager();
          updateManager.onCheckForUpdate(function(res) {
            console.log("\u662f\u5426\u9700\u8981\u66f4\u65b0 : ", res.hasUpdate);
          });
          updateManager.onUpdateReady(function() {
            window["wx"].showModal({
              title: "\u66f4\u65b0\u63d0\u793a",
              content: "\u65b0\u7248\u672c\u5df2\u7ecf\u51c6\u5907\u597d\uff0c\u662f\u5426\u91cd\u542f\u5c0f\u6e38\u620f\uff1f",
              success: function(res) {
                res.confirm && updateManager.applyUpdate();
              }
            });
          });
          updateManager.onUpdateFailed(function() {
            console.log("\u65b0\u7248\u672c\u4e0b\u8f7d\u5931\u8d25!!!");
          });
        }
      };
      WXAPI.tryShowWXCrazyClick_csryw = function() {
        if (!WudianMgr_1.default.wudianFlag_csryw || 1 != AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wxcfg_csryw.kuangdianBanner_csryw) return false;
        var kuangdianLevelSpcacing = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wxcfg_csryw.kuangdianLevelSpcacing_csryw;
        if (0 == kuangdianLevelSpcacing) return true;
        console.log(" WXAPI._crazyClickShowCounter_csryw = " + WXAPI._crazyClickShowCounter_csryw + " (kuangdianLevelSpcacing - 1) = " + (kuangdianLevelSpcacing - 1));
        if (WXAPI._crazyClickShowCounter_csryw == kuangdianLevelSpcacing - 1) {
          WXAPI._crazyClickShowCounter_csryw = 0;
          return true;
        }
        WXAPI._crazyClickShowCounter_csryw++;
        return false;
      };
      WXAPI.GameRecorder_csryw = new GameRecorder();
      WXAPI._isRegRewardedVideoAdEvent_csryw = false;
      WXAPI._onRewardedVideoAdFailed_csryw = null;
      WXAPI._onRewardedVideoAdClose_csryw = null;
      WXAPI._onShow_csryw = null;
      WXAPI._lastShareTime_csryw = 0;
      WXAPI._crazyClickShowCounter_csryw = 0;
      return WXAPI;
    }();
    exports.default = WXAPI;
    cc._RF.pop();
  }, {
    "../../FrameWork/Config/AppConfig": "AppConfig",
    "../../FrameWork/Config/AppSwitchConfig": "AppSwitchConfig",
    "../../FrameWork/Mgr/WudianMgr": "WudianMgr",
    "../../FrameWork/Util/AppPlatform": "AppPlatform"
  } ],
  WeaponConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cb43jqG4VJtJ0bQ7qG+oox", "WeaponConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WeaponConfig = function() {
      function WeaponConfig() {}
      return WeaponConfig;
    }();
    exports.default = WeaponConfig;
    cc._RF.pop();
  }, {} ],
  WeaponItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84ec7bICAtGqqXkuYYhV56H", "WeaponItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DialogMgr_1 = require("../../../../FrameWork/Mgr/DialogMgr");
    var User_1 = require("../../../../FrameWork/User/User");
    var Common_1 = require("../../../../FrameWork/Util/Common");
    var ConfigManager_1 = require("../../../ConfigManager");
    var AudioManager_1 = require("../../manager/AudioManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WeaponItem = function(_super) {
      __extends(WeaponItem, _super);
      function WeaponItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.descLabel = null;
        _this.desc2Label = null;
        _this.useBtn = null;
        _this.buyBtn = null;
        _this.using = null;
        _this.monsterLockFlag = null;
        return _this;
      }
      WeaponItem.prototype.setData = function(config) {
        var self = this;
        var weaponId = config.id;
        var has = User_1.default.checkHasWeapon(weaponId);
        var using = User_1.default.useWeaponId == weaponId;
        var unlockByMoney = 0 == config.type;
        this.data = config;
        this.buyBtn.active = !has && unlockByMoney;
        this.useBtn.active = has && !using;
        this.using.active = using;
        this.descLabel.string = config.name;
        this.desc2Label.string = config.desc;
        if (1 != config.type || has) this.monsterLockFlag.active = false; else {
          this.monsterLockFlag.active = true;
          this.descLabel.string = config.desc2;
          this.monsterLockFlag.getComponentInChildren(cc.Label).string = User_1.default.getKillMonsterCount(config.monster) + "/" + config.monsterCount;
          Common_1.default.loadSpriteFrame("subResGame", "Texture/characterIcon/" + ConfigManager_1.default.characterConfig[config.monster].prefab, function(frame) {
            self.monsterLockFlag.getComponentInChildren(cc.Sprite).spriteFrame = frame;
          });
        }
        this.buyBtn.getComponentInChildren(cc.Label).string = config.money + "";
        Common_1.default.loadSpriteFrame("subResGame", "Texture/View/Weapon/" + config.icon, function(frame) {
          self.icon.spriteFrame = frame;
        });
      };
      WeaponItem.prototype.onClickUse = function() {
        User_1.default.useWeapon(this.data.id);
      };
      WeaponItem.prototype.onClickBuy = function() {
        if (User_1.default.getMoney_csryw() < this.data.money) {
          DialogMgr_1.default.openToast("\u94b1\u4e0d\u591f\u54c7\uff0c\u52a0\u6cb9\u5207\u74dc\uff01");
          return;
        }
        User_1.default.subMoney_csryw(this.data.money);
        User_1.default.addWeapon(this.data.id);
        AudioManager_1.default.inst.playSFX("Sound/\u5546\u5e97\u82b1\u8d39\u91d1\u5e01");
      };
      __decorate([ property(cc.Sprite) ], WeaponItem.prototype, "icon", void 0);
      __decorate([ property(cc.Label) ], WeaponItem.prototype, "descLabel", void 0);
      __decorate([ property(cc.Label) ], WeaponItem.prototype, "desc2Label", void 0);
      __decorate([ property(cc.Node) ], WeaponItem.prototype, "useBtn", void 0);
      __decorate([ property(cc.Node) ], WeaponItem.prototype, "buyBtn", void 0);
      __decorate([ property(cc.Node) ], WeaponItem.prototype, "using", void 0);
      __decorate([ property(cc.Node) ], WeaponItem.prototype, "monsterLockFlag", void 0);
      WeaponItem = __decorate([ ccclass ], WeaponItem);
      return WeaponItem;
    }(cc.Component);
    exports.default = WeaponItem;
    cc._RF.pop();
  }, {
    "../../../../FrameWork/Mgr/DialogMgr": "DialogMgr",
    "../../../../FrameWork/User/User": "User",
    "../../../../FrameWork/Util/Common": "Common",
    "../../../ConfigManager": "ConfigManager",
    "../../manager/AudioManager": "AudioManager"
  } ],
  WeaponTw: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5271f8+EeBO/aIvICYUqaGQ", "WeaponTw");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WeaponTw = function(_super) {
      __extends(WeaponTw, _super);
      function WeaponTw() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.normalTex = null;
        _this.superTex = null;
        _this.motionStreak = null;
        _this.particleSystems = [];
        _this.startRange = 0;
        _this.tuoweiWidth = 30;
        _this.tuoweiMaxWidth = 150;
        _this.particleTotalCount = 0;
        return _this;
      }
      WeaponTw.prototype.onLoad = function() {
        this.motionStreak.texture = this.normalTex;
        this.particleSystems.length > 0 && (this.particleTotalCount = this.particleSystems[0].totalParticles);
      };
      WeaponTw.prototype.init = function(hero) {
        this.hero = hero;
        this.startRange = hero.getProperty("range");
      };
      WeaponTw.prototype.updateTuowei = function() {
        this.motionStreak.stroke = Math.min(this.tuoweiWidth + 1 * (this.hero.getProperty("range") - this.startRange), this.tuoweiMaxWidth);
        this.updateTuoweiTex();
      };
      WeaponTw.prototype.updateTuoweiTex = function() {
        var texture = this.hero.getProperty("supper") > 0 ? this.superTex : this.normalTex;
        this.motionStreak.texture != texture && (this.motionStreak.texture = texture);
      };
      WeaponTw.prototype.fixUpdate = function() {
        if (null == this.hero) return;
        if (this.hero.moving != this.motionStreak.node.active) {
          this.motionStreak.reset();
          this.motionStreak.node.active = this.hero.moving;
          this.updateTuoweiTex();
          var count = this.hero.moving ? this.particleTotalCount : 0;
          0 != this.particleSystems.length && this.particleSystems[0].totalParticles != count && this.particleSystems.forEach(function(item) {
            return item.totalParticles = count;
          });
        }
      };
      __decorate([ property(cc.Texture2D) ], WeaponTw.prototype, "normalTex", void 0);
      __decorate([ property(cc.Texture2D) ], WeaponTw.prototype, "superTex", void 0);
      __decorate([ property(cc.MotionStreak) ], WeaponTw.prototype, "motionStreak", void 0);
      __decorate([ property([ cc.ParticleSystem ]) ], WeaponTw.prototype, "particleSystems", void 0);
      WeaponTw = __decorate([ ccclass ], WeaponTw);
      return WeaponTw;
    }(FixComponent_1.default);
    exports.default = WeaponTw;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent"
  } ],
  WeaponView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae0a6+vMf9DqJxrf3/vzQFf", "WeaponView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventEnum_1 = require("../../../../FrameWork/Event/EventEnum");
    var EventMgr_1 = require("../../../../FrameWork/Event/EventMgr");
    var ConfigManager_1 = require("../../../ConfigManager");
    var WeaponItem_1 = require("./WeaponItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WeaponView = function(_super) {
      __extends(WeaponView, _super);
      function WeaponView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.itemPrefab = null;
        return _this;
      }
      WeaponView.prototype.onLoad = function() {
        this.node.getChildByName("mask").on("click", this.onClickMask, this);
      };
      WeaponView.prototype.start = function() {
        this.refreshList();
      };
      WeaponView.prototype.onEnable = function() {
        EventMgr_1.default.onEvent_csryw(EventEnum_1.ryw_Event.weaponRefresh, this.refreshList, this);
      };
      WeaponView.prototype.onDisable = function() {
        EventMgr_1.default.offEvent_csryw(EventEnum_1.ryw_Event.weaponRefresh, this.refreshList, this);
      };
      WeaponView.prototype.refreshList = function() {
        var weaponConfigs = ConfigManager_1.default.weaponConfig;
        var childCount = this.content.childrenCount;
        var createCount = ConfigManager_1.default.weaponConfig.length - childCount;
        for (var i = 0; i < createCount; i++) {
          var config = weaponConfigs[i];
          var node = cc.instantiate(this.itemPrefab);
          node.parent = this.content;
        }
        for (var i = 0; i < this.content.childrenCount; i++) {
          var config = weaponConfigs[i];
          var node = this.content.children[i];
          if (config) {
            node.active = true;
            var item = node.getComponent(WeaponItem_1.default);
            item.setData(config);
          } else node.active = false;
        }
      };
      WeaponView.prototype.onClickMask = function() {
        this.node.destroy();
      };
      __decorate([ property(cc.Node) ], WeaponView.prototype, "content", void 0);
      __decorate([ property(cc.Prefab) ], WeaponView.prototype, "itemPrefab", void 0);
      WeaponView = __decorate([ ccclass ], WeaponView);
      return WeaponView;
    }(cc.Component);
    exports.default = WeaponView;
    cc._RF.pop();
  }, {
    "../../../../FrameWork/Event/EventEnum": "EventEnum",
    "../../../../FrameWork/Event/EventMgr": "EventMgr",
    "../../../ConfigManager": "ConfigManager",
    "./WeaponItem": "WeaponItem"
  } ],
  WeigthsRandom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6844ait/tDRLAbo333ex7c", "WeigthsRandom");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WeigthsRandom = function() {
      function WeigthsRandom() {
        this.weights = [];
      }
      WeigthsRandom.prototype.Delete = function(key) {
        var index = this.weights.findIndex(function(item) {
          return item.key == key;
        });
        -1 != index && this.weights.splice(index, 1);
      };
      WeigthsRandom.prototype.Random = function() {
        var sum = 0;
        for (var key in this.weights) sum += this.weights[key].weight;
        var num = Math.random() * sum;
        for (var i = 0; i < this.weights.length; i++) {
          if (num < this.weights[i].weight) return this.weights[i].key;
          num -= this.weights[i].weight;
        }
        return this.weights[0].key;
      };
      return WeigthsRandom;
    }();
    exports.default = WeigthsRandom;
    cc._RF.pop();
  }, {} ],
  WhirlBlade: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92130HE1pBPhaCEj8HHzHRA", "WhirlBlade");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FixComponent_1 = require("../../../common/fixcomponent/FixComponent");
    var Gizmos_1 = require("../../../tools/Gizmos");
    var Circle_1 = require("../../../tools/objects/Circle");
    var BoxCollision_1 = require("../../collision/BoxCollision");
    var CollisitionManager_1 = require("../../manager/CollisitionManager");
    var GamaManager_1 = require("../../manager/GamaManager");
    var Character_1 = require("../Character");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WhirlBlade = function(_super) {
      __extends(WhirlBlade, _super);
      function WhirlBlade() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.effects = [];
        _this.boxCollision = null;
        _this.characterInRange = [];
        return _this;
      }
      WhirlBlade.prototype.onLoad = function() {
        this.character = this.node.getComponent(Character_1.default);
        this.circleHitBox = new Circle_1.default();
      };
      WhirlBlade.prototype.fixUpdate = function() {
        var _this = this;
        this.effects.forEach(function(node) {
          node.active = _this.character.moving;
        });
        if (this.character.moving) {
          this.boxCollision.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.circleHitBox.center);
          this.circleHitBox.radius = this.character.getProperty("range");
          GamaManager_1.default.inst.debugHitBox && Gizmos_1.default.DrawCirle(this.circleHitBox.center, this.circleHitBox.radius);
          var cha = CollisitionManager_1.default.inst.collisitionByShape(this.circleHitBox, "enemy");
          for (var i = this.characterInRange.length - 1; i >= 0; i--) cha.includes(this.characterInRange[i]) || this.characterInRange.splice(i, 1);
          for (var i = 0; i < cha.length; i++) if (this.node != cha[i] && !this.characterInRange.includes(cha[i])) {
            this.characterInRange.push(cha[i]);
            GamaManager_1.default.inst.doDamage(this.character.node, cha[i]);
          }
        } else this.characterInRange.length = 0;
      };
      __decorate([ property([ cc.Node ]) ], WhirlBlade.prototype, "effects", void 0);
      __decorate([ property(BoxCollision_1.default) ], WhirlBlade.prototype, "boxCollision", void 0);
      WhirlBlade = __decorate([ ccclass ], WhirlBlade);
      return WhirlBlade;
    }(FixComponent_1.default);
    exports.default = WhirlBlade;
    cc._RF.pop();
  }, {
    "../../../common/fixcomponent/FixComponent": "FixComponent",
    "../../../tools/Gizmos": "Gizmos",
    "../../../tools/objects/Circle": "Circle",
    "../../collision/BoxCollision": "BoxCollision",
    "../../manager/CollisitionManager": "CollisitionManager",
    "../../manager/GamaManager": "GamaManager",
    "../Character": "Character"
  } ],
  WudianMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84175hHWFRDVLEderLL8jc9", "WudianMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var QQMiniGameAPI_1 = require("../../Platform/qq/QQMiniGameAPI");
    var WXAPI_1 = require("../../Platform/weixin/WXAPI");
    var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
    var EventEnum_1 = require("../Event/EventEnum");
    var EventMgr_1 = require("../Event/EventMgr");
    var HttpUnit_1 = require("../NetWork/HttpUnit");
    var AppPlatform_1 = require("../Util/AppPlatform");
    var WudianMgr = function() {
      function WudianMgr() {}
      WudianMgr.ryw_IpBlockFlag_csryw = function() {
        return WudianMgr.ipBlockFlag_csryw;
      };
      WudianMgr.UpdateIpBlockState_csryw = function(completed) {
        HttpUnit_1.default.GetIpBlock_csryw(function(res) {
          console.log("\u8c03\u7528IpBlock\u63a5\u53e3\u6210\u529f,\u7ed3\u679c\u4e3a:", res);
          WudianMgr.ipBlockFlag_csryw = res.code;
          EventMgr_1.default.emitEvent_csryw(EventEnum_1.ryw_Event.ryw_App_OnUpdateIpBlockState_csryw, {
            ipBlockFlag: WudianMgr.ipBlockFlag_csryw
          });
          completed && completed();
        }, null);
      };
      WudianMgr.ryw_GetIpBlocked_csryw = function() {
        return 0 == WudianMgr.ipBlockFlag_csryw;
      };
      WudianMgr.ryw_IsSwitchOpen_csryw = function() {
        var mainSwitch_csryw = 1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
        var isOpenTime_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianTimeAvaliable_csryw;
        console.log("\u8bef\u70b9 Flag_csryw \u72b6\u6001: ", "\u603b\u5f00\u5173:", mainSwitch_csryw, "\u6253\u5f00\u65f6\u95f4", isOpenTime_csryw);
        return mainSwitch_csryw && isOpenTime_csryw;
      };
      Object.defineProperty(WudianMgr, "wudianFlag_noIpBlock_csryw", {
        get: function() {
          var mainSwitch_csryw = 1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
          var isOpenTime_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianTimeAvaliable_csryw;
          var launchScene_csryw = AppPlatform_1.default.getLaunchOptionsSync_csryw().scene;
          if (AppPlatform_1.default.is_TT_GAME_csryw()) {
            mainSwitch_csryw = true;
            isOpenTime_csryw = true;
          }
          var noEnterBySearch_csryw = true;
          var wudianSceneList_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
          for (var i = 0; i < wudianSceneList_csryw.length; ++i) {
            var wudianSceneValue = wudianSceneList_csryw[i];
            launchScene_csryw == wudianSceneValue && (noEnterBySearch_csryw = false);
          }
          console.log("\u8bef\u70b9 Flag_csryw \u72b6\u6001: ", "\u603b\u5f00\u5173:", mainSwitch_csryw, "\u573a\u666f\u8fdb\u5165", noEnterBySearch_csryw, "\u6253\u5f00\u65f6\u95f4", isOpenTime_csryw);
          return mainSwitch_csryw && noEnterBySearch_csryw && isOpenTime_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WudianMgr, "wudianFlag_csryw", {
        get: function() {
          var mainSwitch_csryw = 1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
          var isOpenTime_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianTimeAvaliable_csryw;
          var ipnotBlock_csryw = 0 == this.ipBlockFlag_csryw;
          var launchScene_csryw = AppPlatform_1.default.getLaunchOptionsSync_csryw().scene;
          if (AppPlatform_1.default.is_TT_GAME_csryw()) {
            mainSwitch_csryw = true;
            isOpenTime_csryw = true;
          }
          var noEnterBySearch_csryw = true;
          var wudianSceneList_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
          for (var i = 0; i < wudianSceneList_csryw.length; ++i) {
            var wudianSceneValue = wudianSceneList_csryw[i];
            launchScene_csryw == wudianSceneValue && (noEnterBySearch_csryw = false);
          }
          console.log("\u8bef\u70b9 Flag_csryw \u72b6\u6001: ", "\u603b\u5f00\u5173:", mainSwitch_csryw, "\u573a\u666f\u8fdb\u5165", noEnterBySearch_csryw, "IP\u672a\u88ab\u5c4f\u853d", ipnotBlock_csryw, "\u6253\u5f00\u65f6\u95f4", isOpenTime_csryw);
          return mainSwitch_csryw && noEnterBySearch_csryw && ipnotBlock_csryw && isOpenTime_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WudianMgr, "NoTimeWudianFlag_csryw", {
        get: function() {
          var mainSwitch_csryw = 1 == AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudian_csryw;
          var launchScene_csryw = AppPlatform_1.default.getLaunchOptionsSync_csryw().scene;
          var noEnterBySearch_csryw = true;
          var wudianSceneList_csryw = AppSwitchConfig_1.default.getInstance_csryw().getAppSwitchData_csryw().wudianSceneList_csryw;
          for (var i = 0; i < wudianSceneList_csryw.length; ++i) {
            var wudianSceneValue_csryw = wudianSceneList_csryw[i];
            launchScene_csryw == wudianSceneValue_csryw && (noEnterBySearch_csryw = false);
          }
          var ipnotBlock_csryw = 0 == WudianMgr.ipBlockFlag_csryw;
          console.log("\u8bef\u70b9 Flag_csryw \u72b6\u6001: ", "\u603b\u5f00\u5173:", mainSwitch_csryw, "\u573a\u666f\u8fdb\u5165", noEnterBySearch_csryw, "IP\u672a\u88ab\u5c4f\u853d");
          return mainSwitch_csryw && noEnterBySearch_csryw && ipnotBlock_csryw;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WudianMgr, "isEnterBySerach_csryw", {
        get: function() {
          var launchScene = null;
          AppPlatform_1.default.is_WECHAT_GAME_csryw() ? launchScene = WXAPI_1.default.getLaunchOptionsSync_csryw().scene : AppPlatform_1.default.is_QQ_PLAY_csryw() && (launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync_csryw().scene);
          var noEnterBySearch = true;
          var wudianSceneList = [ 1011, 1012, 1013, 1047 ];
          for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            launchScene == wudianSceneValue && (noEnterBySearch = false);
          }
          console.log("\u573a\u666f\u8fdb\u5165", noEnterBySearch);
          return noEnterBySearch;
        },
        enumerable: false,
        configurable: true
      });
      WudianMgr.ipBlockFlag_csryw = -1;
      return WudianMgr;
    }();
    exports.default = WudianMgr;
    cc._RF.pop();
  }, {
    "../../Platform/qq/QQMiniGameAPI": "QQMiniGameAPI",
    "../../Platform/weixin/WXAPI": "WXAPI",
    "../Config/AppSwitchConfig": "AppSwitchConfig",
    "../Event/EventEnum": "EventEnum",
    "../Event/EventMgr": "EventMgr",
    "../NetWork/HttpUnit": "HttpUnit",
    "../Util/AppPlatform": "AppPlatform"
  } ],
  aes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "214e0sY5D5IGaWnD8e+Y13+", "aes");
    "use strict";
    var CryptoJS = CryptoJS || function(u, p) {
      var d = {}, l = d.lib = {}, s = function s() {}, t = l.Base = {
        extend: function extend(a) {
          s.prototype = this;
          var c = new s();
          a && c.mixIn(a);
          c.hasOwnProperty("init") || (c.init = function() {
            c.$super.init.apply(this, arguments);
          });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function create() {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function init() {},
        mixIn: function mixIn(a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      }, r = l.WordArray = t.extend({
        init: function init(a, c) {
          a = this.words = a || [];
          this.sigBytes = c != p ? c : 4 * a.length;
        },
        toString: function toString(a) {
          return (a || v).stringify(this);
        },
        concat: function concat(a) {
          var c = this.words, e = a.words, j = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - k % 4 * 8 & 255) << 24 - (j + k) % 4 * 8; else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e);
          this.sigBytes += a;
          return this;
        },
        clamp: function clamp() {
          var a = this.words, c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
          a.length = u.ceil(c / 4);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function random(a) {
          for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
          return new r.init(c, a);
        }
      }), w = d.enc = {}, v = w.Hex = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) {
            var k = c[j >>> 2] >>> 24 - j % 4 * 8 & 255;
            e.push((k >>> 4).toString(16));
            e.push((15 & k).toString(16));
          }
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - j % 8 * 4;
          return new r.init(e, c / 2);
        }
      }, b = w.Latin1 = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - j % 4 * 8 & 255));
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (255 & a.charCodeAt(j)) << 24 - j % 4 * 8;
          return new r.init(e, c);
        }
      }, x = w.Utf8 = {
        stringify: function stringify(a) {
          try {
            return decodeURIComponent(escape(b.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function parse(a) {
          return b.parse(unescape(encodeURIComponent(a)));
        }
      }, q = l.BufferedBlockAlgorithm = t.extend({
        reset: function reset() {
          this._data = new r.init();
          this._nDataBytes = 0;
        },
        _append: function _append(a) {
          "string" == typeof a && (a = x.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function _process(a) {
          var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((0 | b) - this._minBufferSize, 0);
          a = b * k;
          j = u.min(4 * a, j);
          if (a) {
            for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
            q = e.splice(0, a);
            c.sigBytes -= j;
          }
          return new r.init(q, j);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      });
      l.Hasher = q.extend({
        cfg: t.extend(),
        init: function init(a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        },
        reset: function reset() {
          q.reset.call(this);
          this._doReset();
        },
        update: function update(a) {
          this._append(a);
          this._process();
          return this;
        },
        finalize: function finalize(a) {
          a && this._append(a);
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(a) {
          return function(b, e) {
            return new a.init(e).finalize(b);
          };
        },
        _createHmacHelper: function _createHmacHelper(a) {
          return function(b, e) {
            return new n.HMAC.init(a, e).finalize(b);
          };
        }
      });
      var n = d.algo = {};
      return d;
    }(Math);
    (function() {
      var u = CryptoJS, p = u.lib.WordArray;
      u.enc.Base64 = {
        stringify: function stringify(d) {
          var l = d.words, p = d.sigBytes, t = this._map;
          d.clamp();
          d = [];
          for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | l[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, v = 0; 4 > v && r + .75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
          if (l = t.charAt(64)) for (;d.length % 4; ) d.push(l);
          return d.join("");
        },
        parse: function parse(d) {
          var l = d.length, s = this._map, t = s.charAt(64);
          t && (t = d.indexOf(t), -1 != t && (l = t));
          for (var t = [], r = 0, w = 0; w < l; w++) if (w % 4) {
            var v = s.indexOf(d.charAt(w - 1)) << w % 4 * 2, b = s.indexOf(d.charAt(w)) >>> 6 - w % 4 * 2;
            t[r >>> 2] |= (v | b) << 24 - r % 4 * 8;
            r++;
          }
          return p.create(t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    })();
    (function(u) {
      function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
      r = r.MD5 = v.extend({
        _doReset: function _doReset() {
          this._hash = new w.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function _doProcessBlock(q, n) {
          for (var a = 0; 16 > a; a++) {
            var c = n + a, e = q[c];
            q[c] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          }
          var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]);
          a[0] = a[0] + f | 0;
          a[1] = a[1] + m | 0;
          a[2] = a[2] + g | 0;
          a[3] = a[3] + h | 0;
        },
        _doFinalize: function _doFinalize() {
          var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
          n[c >>> 5] |= 128 << 24 - c % 32;
          var e = u.floor(a / 4294967296);
          n[15 + (c + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          n[14 + (c + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
          b.sigBytes = 4 * (n.length + 1);
          this._process();
          b = this._hash;
          n = b.words;
          for (a = 0; 4 > a; a++) c = n[a], n[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
          return b;
        },
        clone: function clone() {
          var b = v.clone.call(this);
          b._hash = this._hash.clone();
          return b;
        }
      });
      t.MD5 = v._createHelper(r);
      t.HmacMD5 = v._createHmacHelper(r);
    })(Math);
    (function() {
      var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({
        cfg: d.extend({
          keySize: 4,
          hasher: p.MD5,
          iterations: 1
        }),
        init: function init(d) {
          this.cfg = this.cfg.extend(d);
        },
        compute: function compute(d, r) {
          for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q; ) {
            n && s.update(n);
            var n = s.update(d).finalize(r);
            s.reset();
            for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
            b.concat(n);
          }
          b.sigBytes = 4 * q;
          return b;
        }
      });
      u.EvpKDF = function(d, l, p) {
        return s.create(p).compute(d, l);
      };
    })();
    CryptoJS.lib.Cipher || function(u) {
      var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(),
        createEncryptor: function createEncryptor(e, a) {
          return this.create(this._ENC_XFORM_MODE, e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.create(this._DEC_XFORM_MODE, e, a);
        },
        init: function init(e, a, b) {
          this.cfg = this.cfg.extend(b);
          this._xformMode = e;
          this._key = a;
          this.reset();
        },
        reset: function reset() {
          t.reset.call(this);
          this._doReset();
        },
        process: function process(e) {
          this._append(e);
          return this._process();
        },
        finalize: function finalize(e) {
          e && this._append(e);
          return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function _createHelper(e) {
          return {
            encrypt: function encrypt(b, k, d) {
              return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
            },
            decrypt: function decrypt(b, k, d) {
              return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
            }
          };
        }
      });
      d.StreamCipher = v.extend({
        _doFinalize: function _doFinalize() {
          return this._process(!0);
        },
        blockSize: 1
      });
      var b = p.mode = {}, x = function x(e, a, b) {
        var c = this._iv;
        c ? this._iv = u : c = this._prevBlock;
        for (var d = 0; d < b; d++) e[a + d] ^= c[d];
      }, q = (d.BlockCipherMode = l.extend({
        createEncryptor: function createEncryptor(e, a) {
          return this.Encryptor.create(e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.Decryptor.create(e, a);
        },
        init: function init(e, a) {
          this._cipher = e;
          this._iv = a;
        }
      })).extend();
      q.Encryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize;
          x.call(this, e, a, c);
          b.encryptBlock(e, a);
          this._prevBlock = e.slice(a, a + c);
        }
      });
      q.Decryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
          b.decryptBlock(e, a);
          x.call(this, e, a, c);
          this._prevBlock = d;
        }
      });
      b = b.CBC = q;
      q = (p.pad = {}).Pkcs7 = {
        pad: function pad(a, b) {
          for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
          c = s.create(l, c);
          a.concat(c);
        },
        unpad: function unpad(a) {
          a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
      };
      d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
          mode: b,
          padding: q
        }),
        reset: function reset() {
          v.reset.call(this);
          var a = this.cfg, b = a.iv, a = a.mode;
          if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, 
          this._minBufferSize = 1;
          this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function _doProcessBlock(a, b) {
          this._mode.processBlock(a, b);
        },
        _doFinalize: function _doFinalize() {
          var a = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            a.pad(this._data, this.blockSize);
            var b = this._process(!0);
          } else b = this._process(!0), a.unpad(b);
          return b;
        },
        blockSize: 4
      });
      var n = d.CipherParams = l.extend({
        init: function init(a) {
          this.mixIn(a);
        },
        toString: function toString(a) {
          return (a || this.formatter).stringify(this);
        }
      }), b = (p.format = {}).OpenSSL = {
        stringify: function stringify(a) {
          var b = a.ciphertext;
          a = a.salt;
          return (a ? s.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(r);
        },
        parse: function parse(a) {
          a = r.parse(a);
          var b = a.words;
          if (1398893684 == b[0] && 1701076831 == b[1]) {
            var c = s.create(b.slice(2, 4));
            b.splice(0, 4);
            a.sigBytes -= 16;
          }
          return n.create({
            ciphertext: a,
            salt: c
          });
        }
      }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({
          format: b
        }),
        encrypt: function encrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          var l = a.createEncryptor(c, d);
          b = l.finalize(b);
          l = l.cfg;
          return n.create({
            ciphertext: b,
            key: c,
            iv: l.iv,
            algorithm: a,
            mode: l.mode,
            padding: l.padding,
            blockSize: a.blockSize,
            formatter: d.format
          });
        },
        decrypt: function decrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function _parse(a, b) {
          return "string" == typeof a ? b.parse(a, this) : a;
        }
      }), p = (p.kdf = {}).OpenSSL = {
        execute: function execute(a, b, c, d) {
          d || (d = s.random(8));
          a = w.create({
            keySize: b + c
          }).compute(a, d);
          c = s.create(a.words.slice(b), 4 * c);
          a.sigBytes = 4 * b;
          return n.create({
            key: a,
            iv: c,
            salt: d
          });
        }
      }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({
          kdf: p
        }),
        encrypt: function encrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          d = l.kdf.execute(d, b.keySize, b.ivSize);
          l.iv = d.iv;
          b = a.encrypt.call(this, b, c, d.key, l);
          b.mixIn(d);
          return b;
        },
        decrypt: function decrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          c = this._parse(c, l.format);
          d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
          l.iv = d.iv;
          return a.decrypt.call(this, b, c, d.key, l);
        }
      });
    }();
    (function() {
      for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
      for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ 255 & k ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
      }
      var H = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], d = d.AES = p.extend({
        _doReset: function _doReset() {
          for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else {
            var k = e[j - 1];
            j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k]) : (k = k << 8 | k >>> 24, 
            k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k], 
            k ^= H[j / d | 0] << 24);
            e[j] = e[j - d] ^ k;
          }
          c = this._invKeySchedule = [];
          for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[255 & k]];
        },
        encryptBlock: function encryptBlock(a, b) {
          this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
        },
        decryptBlock: function decryptBlock(a, c) {
          var d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
          this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
          d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
        },
        _doCryptBlock: function _doCryptBlock(a, b, c, d, e, j, l, f) {
          for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[255 & n] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[255 & g] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[255 & h] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[255 & k] ^ c[p++], g = q, h = s, k = t;
          q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[255 & n]) ^ c[p++];
          s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[255 & g]) ^ c[p++];
          t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[255 & h]) ^ c[p++];
          n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[255 & k]) ^ c[p++];
          a[b] = q;
          a[b + 1] = s;
          a[b + 2] = t;
          a[b + 3] = n;
        },
        keySize: 8
      });
      u.AES = p._createHelper(d);
    })();
    module.exports = CryptoJS;
    cc._RF.pop();
  }, {} ]
}, {}, [ "FMComponentExtend", "FMViewBase", "FMButton", "FMItemLayout", "FMScrollViewLoop", "FMSkeletonExtend", "FMSpine", "FMTouchMaskView", "AppConfig", "AppSwitchConfig", "EventEnum", "EventMgr", "FMInterface", "Main", "BundleMgr", "DebugInfoMgr", "DialogMgr", "GameMgr", "PhysicalPowerMgr", "RYPlatformMgr", "RemoteMgr", "ResSubMgr", "SoundMgr", "TimerUtils", "UmengMgr", "VibrateMgr", "WudianMgr", "AesTools", "HttpUnit", "NetConfig", "aes", "RYAD", "RYSDK", "RYSTAT", "DialogAddPower", "DialogAddPowerAll", "DialogSetting", "DialogToast", "DialogUIBase", "PowerNode", "TweenScale", "User", "Adapt", "AppPlatform", "Common", "DateUtils", "LogUtils", "TweenUtils", "Utilit", "FMMainScene", "DialogLoading", "LoadingView", "KSAPI", "OPPOAPI", "QQMiniGameAPI", "TTAPI", "VIVOAPI", "WXAPI", "ConfigManager", "BulletObj", "Behavior", "Character", "CharacterActionConsumer", "Hero", "Monster", "AIBase", "BossAI", "PlayerController", "SpringAI", "Boom", "Fbsd", "Feidao", "ImmuneEffect", "ShieldEffect", "WeaponTw", "WhirlBlade", "BallMove", "DistanceMove", "IMoveProvider", "UltSkill", "UltSkill0", "BoxCollision", "CircleCollision", "Collision", "ObbCollision", "BuffScripts", "ActionTable", "BuffTable", "BulletTable", "CharacterLevelTable", "CharacterTable", "EndlessTable", "BattleEffect", "BlackMask", "FruitDeadEffect", "HitEffect", "InputSystem", "BulletEmitter", "SingleEmitter", "ActionManager", "AudioManager", "CollisitionManager", "EffectManager", "GamaManager", "HeroManager", "MonsterSpawn", "Messages", "GameConfig", "PropertyModifier", "WeaponConfig", "ActionEffectConfig", "BulletModel", "ChaProperty", "DamageInfo", "EndlessStage", "BuffConfig", "BuffHeal", "BuffImmune", "BuffObj", "BuffProperty", "BuffShield", "BuffWitchCd", "CharacterInfo", "CharacterLevel", "TcoInfo", "UltSkillConfig", "UnitBindManager", "UnitBindPoint", "UnitMovement", "ActionInfo", "IActionConsumer", "UnitAction", "BloodBar", "GameView", "MoneyWeight", "ResurrectionView", "SettlementView", "TcoView", "WeaponItem", "WeaponView", "AssetManager", "SightEffect", "FixComponent", "FixManager", "AnimationAutoPlay", "DamagePopup", "Gizmos", "GlobalMessage", "ObjPool", "SpSkinRandomPlay", "Utils", "WeigthsRandom", "AABB", "Circle", "Obb" ]);
//# sourceMappingURL=index.js.map
