function g(name){
  var method=name=='.'? 'getElementsByClassName':'getElementById';
  return document[method](name);

}
