/**
 * Created by Jakub Matuška on 06.04.2017.
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Moment from 'moment';

import Main from 'main';

export default () => {
  const age = Moment().diff(Moment("19941130", "YYYYMMDD"), "years");
  const text = `
**You can contact me at [jkb.matuska@gmail.com](mailto://jkb.matuska@gmail.com) or check out my GitHub at [jkbmat](https://github.com/jkbmat)**
  
I'm a ${age} years old programmer from Slovakia, living in Brno, Czech Republic.

I have experience in **JavaScript**, **HTML5**, **CSS**, **PHP**, **Python**, **C#**, **Java**, **Free Pascal** and **Photoshop**.

Computers have been my passion ever since I was little.
[Winning](https://www.sgpsys.com/cz/bb2004/vysledky/BB2004vysledky.htm) the B+B 2004 competition at nine years old 
and again [placing third](https://crm.sgpsys.com/%28S%28w4h4o3xs05ffqwfourze2k1g%29%29/contests/sgpcup/2007/czsk/results.aspx) 
in 2007 was the start of my career.

I have always liked making games the most. With the coming of HTML 5 and especially Canvas, 
it became the biggest focus of my programming. I've created my own game engine, SloN, and upon that I have built 
[SpaceShip](http://php-jkbmat.rhcloud.com/SpaceShip/) and, most notably, [UFO](http://php-jkbmat.rhcloud.com/UFO/).
UFO was a big success, featuring on quite a few HTML 5 game showcasing sites. Even a Senior Marketing Manager at Opera Software became interested in the game, 
writing, that he was "blown away" by the game.

More recently, I have become interested in JavaScript frameworks. 
I began with Angular 1, creating a social network for dog lovers, which, sadly, never made it to production. This site itself is my next 
step in JS frameworks, using React, Redux and an Express server on Node.js.

I have graduated from __Masaryk University, Faculty of Informatics__ 
in 2017 as a bachelor. For my [dissertation](http://is.muni.cz/th/422747/fi_b/), I have created 
[Scenária](https://github.com/jkbmat/Bakalarska-praca), an online scene editor that uses Box2D physics library and is capable 
of programming objects' behavior.`;

  return (
    <Main title="Jakub Matuška">
      <ReactMarkdown source={text} />
    </Main>
  );
}