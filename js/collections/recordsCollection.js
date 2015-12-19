/**
 * collections/recordsCollection.js
 * Backbone.Collection with methods to count models
 *
 * @return  {function} Collection constructor extended from Bacbone.Collection
 * @author  Ben on 21/Jul/2012
 */

define([
  'jquery',
  'backbone'
], function($) {

return Backbone.Collection.extend({

  count: function(type) {

    if (type === 'win') {
      return this.countWin();
    } else if (type === 'miss') {
      return this.length - this.countWin();
    }

    return this.length;
  },

  countWin: function() {
    return this.select(function(record) {
      return record.get('isMatched') && record.get('matchType') === 'matchThree';
    }).length;
  }
})

});
