var ASQ = window.ASQ || {};

/**
 * This mixin object is for every ASQ element type, including question types and others.
 * @polymerBehavior
 */
var elementTypeBehavior =  ASQ.elementTypeBehavior = {
  properties : {
    // True for every ASQ element.
    isASQElement :{
      type: Boolean,
      value: true,
      notify: true
    },

     // Denotes whether an ASQ element is a `question type`. 
    isASQQuestionTypeElement : {
      type: Boolean,
      value: false,
      notify: true
    },

    uid:{
      type: String,
      value: "",
      notify: true,
      reflectToAttribute: true
    }
  }
};

/**
 * This mixin object is `ONLY` for question types.
 * @polymerBehavior
 */
var questionTypeBehavior = ASQ.questionTypeBehavior = {
  properties : {
    isASQQuestionTypeElement : {
      type: Boolean,
      value: true,
      notify: true
    }
  }
};


/**
 * Order is important since _roleChanged depends on roles being set
 * @polymerBehavior
 */
var roleBehavior = ASQ.roleBehavior = {
  properties: {

    roles:{
      type: Object,
      readOnly: true,
      value: function(){
        return {
          VIEWER: "viewer",
          PRESENTER: "presenter",
          TA: "ta"
        }
      }
    },

    role: {
      type: String,
      value: "viewer",
      notify: true,
      observer: "_roleChanged",  
      reflectToAttribute: true
    }
  },

  hasRole: function (role, candidate) {
    return role == candidate;
  },

  _isValidRole: function(role) {
    var roles = this.roles;
    var keys = Object.keys(roles);
    for (var i = 0, l = keys.length; i < l; i++) {
      if ( role == roles[keys[i]] ) {
        return true;
      }
    }
    return false;
  },


  /**
   * 
   * 1. Validate role update. If the new value
   * is not a valid one, then roll back to the old value.
   * 
   * 2. If the role of `outside` element is 
   * changed, then `inside` elements' role
   * are also changed.
   *
   **/
  _roleChanged: function(newRole, oldRole) {
    if ( this._isValidRole(newRole) ) {
      this._propagateRole(newRole);
    } else {
      this.role = oldRole || this.roles.VIEWER;
    }
  },

  _propagateRole: function(role) {
    if ( ! this._isValidRole(role) ) return;

    if ( this.role !== role ) this.role = role;

    var asqElements = Polymer.dom(this).children.filter(function(el) {
      return el.isASQElement;
    });

    asqElements.forEach(function(x) {
      x.role = role;
    });
  }
};

 /** @polymerBehavior ASQ.asqElementBehavior */
ASQ.asqElementBehavior = [elementTypeBehavior, roleBehavior];

 /** @polymerBehavior ASQ.asqQuestionElementBehavior */
ASQ.asqQuestionElementBehavior = [elementTypeBehavior, questionTypeBehavior, roleBehavior];
