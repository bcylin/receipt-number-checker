/**
 * views/prizeView.js
 * Module that displays prize form a given prizeModel
 *
 * @return  {function} View constructor extended from Bacbone.View
 * @author  Ben on 06/Jul/2012
 */

define([
  'jquery',
  'backbone'
], function($) {

return Backbone.View.extend({

  initialize: function() {
    this.dataSource = this.options.dataSource;
    // empty sections after getting the template
    this.template = this.$el.find('.template').html().trim();
    this.compiled = _.template(this.template);
    this.$el.empty();
  },

  render: function() {
    var self = this,
      prizeNumbers = this.dataSource.getPrizeNumbers();

    // go through each prize on the list
    $.each(prizeNumbers, function(name, numbers) {
      if (!$.isArray(numbers)) { return; }

      // prepare a section for prize info on the page
      var section = self.compiled({
        name: name
      });

      var $section = $(section),
        $ul = $section.find('ul');

      self.$el.append($section);

      // display winning numbers of this prize
      $.each(numbers, function(index, number) {
        var $li = $('<li>').appendTo($ul);
        $('<span>', {text: number}).appendTo($li);
      });
    });

    return this;
  },

  refresh: function() {
    this.$el.empty();
    this.render();
  }
});

});
