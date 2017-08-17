FlowRouter.route(['/', '/home'], {
  subscriptions:function(){
  //  this.register('productsList', Meteor.subscribe('products'));
    },
  action: function(){
    FlowLayout.render('layout', { main:'home'});
  }
});
