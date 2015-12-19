/**
 * views/switchView.js
 * Switch between current draw and previous draw
 *
 * @return  {object} View constructor extended from Bacbone.View
 * @author  Ben on 18/Jul/2012
 */

define([
  'jquery',
  'backbone'
], function($) {

return Backbone.View.extend({

  initialize: function() {
    this.delegate = this.options.delegate;
    this.dataSource = this.options.dataSource;
    // Display months on switch buttons
    this.$el.find('#thisDraw').text( this.dataSource.getMonths('thisDraw') );
    this.$el.find('#prevDraw').text( this.dataSource.getMonths('prevDraw') );
  },

  events: {
    'change input.switch': 'switch'
  },

  switch: function(event) {

    // toggle buttons
    var $selected = $(event.target);
    $selected.parent().siblings().removeClass('selected');
    $selected.parent().addClass('selected');

    // tell otehr componants that the draw has changed
    var selectedDraw = event.target.value;
    this.delegate.switchViewDidSelectDraw(selectedDraw);
  }
});

});
