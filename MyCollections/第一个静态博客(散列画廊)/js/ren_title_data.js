var data=new Object();
var dataStr=
                      'German Verb conjugations>the summary of conjugations of the irregular verbs helps with more easily rememorize<a>\
                      Mein Tagebuch>which means diary, written based on what i encouter today<b>\
                      my lifeplan>A plan includes the rest of college years(2 and a half years)<c>\
                      Germany film recommend>Who Am I - Kein System ist sicher<d>\
                      mein Tagebuch 2 11.12>mein Tagebuch 2 11.12\
                      ';
var a=dataStr.split('<a>');
var b=a[1].split('<b>');
var c=b[1].split('<c>');
var d=c[1].split('<d>');
data.t1=a[0].split('>')[0];
data.c1=a[0].split('>')[1];
data.t2=b[0].split('>')[0];
data.c2=b[0].split('>')[1];
data.t3=c[0].split('>')[0];
data.c3=c[0].split('>')[1];
data.t4=d[0].split('>')[0];
data.c4=d[0].split('>')[1];
data.t5=d[1].split('>')[0];
data.c5=d[1].split('>')[1];
var ren_t_data=data;
