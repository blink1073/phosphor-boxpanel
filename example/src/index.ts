/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  Widget
} from 'phosphor-widget';

import {
  BoxPanel
} from 'phosphor-boxpanel';


function createContent(name: string): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass(name);
  return widget;
}


function main(): void {
  let red = createContent('red');
  let green = createContent('green');
  let blue = createContent('blue');
  let yellow = createContent('yellow');

  BoxPanel.setStretch(red, 1);
  BoxPanel.setStretch(green, 2);
  BoxPanel.setStretch(blue, 3);
  BoxPanel.setStretch(yellow, 1);

  let panel = new BoxPanel();
  panel.id = 'main';
  panel.addChild(red);
  panel.addChild(green);
  panel.addChild(blue);
  panel.addChild(yellow);

  let refresh = () => {
    if (document.documentElement.offsetWidth < 600) {
      panel.direction = BoxPanel.TopToBottom;
    } else {
      panel.direction = BoxPanel.LeftToRight;
    }
    panel.update();
  };

  panel.attach(document.body);

  refresh();

  window.onresize = refresh;
}


window.onload = main;
