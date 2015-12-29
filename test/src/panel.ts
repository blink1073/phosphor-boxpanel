/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import expect = require('expect.js');

import {
  Message, sendMessage
} from 'phosphor-messaging';

import {
  ChildMessage, Widget
} from 'phosphor-widget';

import {
  BoxLayout, BoxPanel, Direction
} from '../../lib/index';


class LogPanel extends BoxPanel {

  messages: string[] = [];

  methods: string[] = [];

  processMessage(msg: Message): void {
    super.processMessage(msg);
    this.messages.push(msg.type);
  }

  protected onChildAdded(msg: ChildMessage): void {
    super.onChildAdded(msg);
    this.methods.push('onChildAdded');
  }

  protected onChildRemoved(msg: ChildMessage): void {
    super.onChildRemoved(msg);
    this.methods.push('onChildRemoved');
  }
}


class LogWidget extends Widget {

  messages: string[] = [];

  processMessage(msg: Message): void {
    super.processMessage(msg);
    this.messages.push(msg.type);
  }
}


describe('phosphor-boxpanel', () => {

  describe('BoxPanel', () => {

    describe('.createLayout()', () => {

      it('should create a box layout for a box panel', () => {
        let layout = BoxPanel.createLayout();
        expect(layout instanceof BoxLayout).to.be(true);
      });

    });

    describe('.LeftToRight', () => {

      it('should be an alias of the `LeftToRight` Direction', () => {
        expect(BoxPanel.LeftToRight).to.be(Direction.LeftToRight);
      });

    });

    describe('.RightToLeft', () => {

      it('should be an alias of the `RightToLeft` Direction', () => {
        expect(BoxPanel.RightToLeft).to.be(Direction.RightToLeft);
      });

    });

    describe('.TopToBottom', () => {

      it('should be an alias of the `TopToBottom` Direction', () => {
        expect(BoxPanel.TopToBottom).to.be(Direction.TopToBottom);
      });

    });

    describe('.BottomToTop', () => {

      it('should be an alias of the `BottomToTop` Direction', () => {
        expect(BoxPanel.BottomToTop).to.be(Direction.BottomToTop);
      });

    });

    describe('.getStretch', () => {

      it('should return the panel stretch factor for the given widget', () => {
        let widget = new Widget();
        expect(BoxPanel.getStretch(widget)).to.be(0);
      });

    });

    describe('.setStretch', () => {

      it('should set the split panel stretch factor for the given widget.', () => {
        let widget = new Widget();
        BoxPanel.setStretch(widget, 1);
        expect(BoxPanel.getStretch(widget)).to.be(1);
      });

    });

    describe('.getSizeBasis', () => {

      it('should return the box panel size basis for the given widget', () => {
        let widget = new Widget();
        expect(BoxPanel.getSizeBasis(widget)).to.be(0);
      });

    });

    describe('.setSizeBasis', () => {

      it('should set the box panel size basis for the given widget.', () => {
        let widget = new Widget();
        BoxPanel.setSizeBasis(widget, 1);
        expect(BoxPanel.getSizeBasis(widget)).to.be(1);
      });

    });

    describe('#constructor()', () => {

      it('should accept no arguments', () => {
        let panel = new BoxPanel();
        expect(panel instanceof BoxPanel).to.be(true);
      });

      it('should add `p-BoxPanel` and `p-mod-top-to-bottom` ', () => {
        let panel = new BoxPanel();
        expect(panel.hasClass('p-BoxPanel')).to.be(true);
        expect(panel.hasClass('p-mod-top-to-bottom')).to.be(true);
      });

    });

    describe('#direction', () => {

      it('should get the layout direction for the box panel', () => {
        let panel = new BoxPanel();
        expect(panel.direction).to.be(Direction.TopToBottom);
      });

      it('should set the layout direction for the box panel', () => {
        let panel = new BoxPanel();
        panel.direction = Direction.LeftToRight;
        expect(panel.direction).to.be(Direction.LeftToRight);
      });

    });

    describe('#spacing', () => {

      it('should get the inter-element spacing for the box panel', () => {
        let panel = new BoxPanel();
        expect(panel.spacing).to.be(8);
      });

      it('should set the inter-element spacing for the box panel', () => {
        let panel = new BoxPanel();
        panel.spacing = 4;
        expect(panel.spacing).to.be(4);
      });

    });

    describe('#onChildAdded()', () => {

      it("should add `'p-BoxPanel-child'` class to child", () => {
        let panel = new LogPanel();
        let widget = new Widget();
        expect(panel.messages.indexOf('child-added')).to.be(-1);
        panel.addChild(widget);
        expect(panel.messages.indexOf('child-added')).to.not.be(-1);
        expect(panel.methods.indexOf('onChildAdded')).to.not.be(-1);
        expect(widget.hasClass('p-BoxPanel-child')).to.be(true);
        widget.dispose();
      });

    });

    describe('#onChildRemove()', () => {

      it("should remove `'p-BoxPanel-child'` class from child", () => {
        let panel = new LogPanel();
        let widget = new Widget();
        expect(panel.messages.indexOf('child-removed')).to.be(-1);
        panel.addChild(widget);
        widget.parent = null;
        expect(panel.messages.indexOf('child-removed')).to.not.be(-1);
        expect(panel.methods.indexOf('onChildRemoved')).to.not.be(-1);
        expect(widget.hasClass('p-BoxPanel-child')).to.be(false);
        widget.dispose();
      });

    });

  });

});
