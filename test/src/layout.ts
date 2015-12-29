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
  ChildMessage, ResizeMessage, Widget
} from 'phosphor-widget';

import {
  BoxLayout, BoxPanel, Direction
} from '../../lib/index';


class LogLayout extends BoxLayout {

  messages: string[] = [];

  methods: string[] = [];

  processParentMessage(msg: Message): void {
    super.processParentMessage(msg);
    this.messages.push(msg.type);
  }

  protected attachChild(index: number, child: Widget): void {
    super.attachChild(index, child);
    this.methods.push('attachChild');
  }

  protected moveChild(fromIndex: number, toIndex: number, child: Widget): void {
    super.moveChild(fromIndex, toIndex, child);
    this.methods.push('moveChild');
  }

  protected detachChild(index: number, child: Widget): void {
    super.detachChild(index, child);
    this.methods.push('detachChild');
  }

  protected onAfterShow(msg: Message): void {
    super.onAfterShow(msg);
    this.methods.push('onAfterShow');
  }

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.methods.push('onAfterAttach');
  }

  protected onChildShown(msg: ChildMessage): void {
    super.onChildShown(msg);
    this.methods.push('onChildShown');
  }

  protected onChildHidden(msg: ChildMessage): void {
    super.onChildHidden(msg);
    this.methods.push('onChildHidden');
  }

  protected onResize(msg: ResizeMessage): void {
    super.onResize(msg);
    this.methods.push('onResize');
  }

  protected onUpdateRequest(msg: Message): void {
    super.onUpdateRequest(msg);
    this.methods.push('onUpdateRequest');
  }

  protected onFitRequest(msg: Message): void {
    super.onFitRequest(msg);
    this.methods.push('onFitRequest');
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

  describe('BoxLayout', () => {

    describe('.LeftToRight', () => {

      it('should be an alias of the `LeftToRight` Direction', () => {
        expect(BoxLayout.LeftToRight).to.be(Direction.LeftToRight);
      });

    });

    describe('.RightToLeft', () => {

      it('should be an alias of the `RightToLeft` Direction', () => {
        expect(BoxLayout.RightToLeft).to.be(Direction.RightToLeft);
      });

    });

    describe('.TopToBottom', () => {

      it('should be an alias of the `TopToBottom` Direction', () => {
        expect(BoxLayout.TopToBottom).to.be(Direction.TopToBottom);
      });

    });

    describe('.BottomToTop', () => {

      it('should be an alias of the `BottomToTop` Direction', () => {
        expect(BoxLayout.BottomToTop).to.be(Direction.BottomToTop);
      });

    });

    describe('.getStretch', () => {

      it('should return the box panel stretch factor for the given widget', () => {
        let widget = new Widget();
        expect(BoxLayout.getStretch(widget)).to.be(0);
      });

    });

    describe('.setStretch', () => {

      it('should set the box panel stretch factor for the given widget.', () => {
        let widget = new Widget();
        BoxLayout.setStretch(widget, 1);
        expect(BoxLayout.getStretch(widget)).to.be(1);
      });

    });

    describe('.getSizeBasis', () => {

      it('should return the box panel size basis for the given widget', () => {
        let widget = new Widget();
        expect(BoxLayout.getSizeBasis(widget)).to.be(0);
      });

    });

    describe('.setSizeBasis', () => {

      it('should set the box panel size basis for the given widget.', () => {
        let widget = new Widget();
        BoxLayout.setSizeBasis(widget, 1);
        expect(BoxLayout.getSizeBasis(widget)).to.be(1);
      });

    });

    describe('#direction', () => {

      it('should get the direction for the box layout', () => {
        let layout = new BoxLayout();
        expect(layout.direction).to.be(Direction.TopToBottom);
      });

      it('should set the direction for the box layout', () => {
        let layout = new BoxPanel();
        layout.direction = Direction.LeftToRight;
        expect(layout.direction).to.be(Direction.LeftToRight);
      });

    });

    describe('#spacing', () => {

      it('should get the inter-element spacing for the box layout', () => {
        let layout = new BoxLayout();
        expect(layout.spacing).to.be(8);
      });

      it('should set the inter-element spacing for the box layout', () => {
        let layout = new BoxLayout();
        layout.spacing = 4;
        expect(layout.spacing).to.be(4);
      });

    });

    describe('#initialize()', () => {

      it('should set the direction of the parent', () => {
        let widget = new Widget();
        let layout = new BoxLayout();
        widget.layout = layout;
        expect(widget.hasClass('p-mod-top-to-bottom')).to.be(true);
      });

    });

    describe('#attachChild()', () => {

      it('should attach layout children', () => {
        let layout = new LogLayout();
        let children = [new LogWidget(), new LogWidget()];
        let widget = new Widget();
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        widget.layout = layout;
        widget.attach(document.body);
        expect(layout.methods.indexOf('attachChild')).to.not.be(-1);
        expect(children[0].messages.indexOf('after-attach')).to.not.be(-1);
        expect(children[1].messages.indexOf('after-attach')).to.not.be(-1);
        layout.dispose();
      });

    });

    describe('#moveChild()', () => {

      it('should be called when a child is moved', () => {
        let widget = new Widget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        widget.layout = layout;
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        layout.insertChild(0, children[1]);
        expect(layout.methods.indexOf('moveChild')).to.not.be(-1);
      });

      it("should send an update request to the parent", (done) => {
        let widget = new LogWidget();
        let children = [new LogWidget(), new LogWidget()];
        let layout = new LogLayout();
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        widget.layout = layout;
        children[1].messages = [];
        widget.attach(document.body);
        layout.insertChild(0, children[1]);
        expect(layout.methods.indexOf('moveChild')).to.not.be(-1);
        requestAnimationFrame(() => {
          expect(widget.messages.indexOf('update-request')).to.not.be(-1);
          widget.dispose();
          done();
        });
      });

    });

    describe('#detachChild()', () => {

      it('should be called when a child is detached', () => {
        let widget = new Widget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        widget.layout = layout;
        widget.attach(document.body);
        children[1].parent = null;
        expect(layout.methods.indexOf('detachChild')).to.not.be(-1);
        widget.dispose();
      });

      it("should send a `'before-detach'` message if appropriate", () => {
        let widget = new Widget();
        let children = [new LogWidget(), new LogWidget()];
        let layout = new LogLayout();
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        widget.layout = layout;
        widget.attach(document.body);
        children[1].parent = null;
        expect(layout.methods.indexOf('detachChild')).to.not.be(-1);
        expect(children[1].messages.indexOf('before-detach')).to.not.be(-1);
        layout.dispose();
      });

    });

    describe('#onAfterShow()', () => {

      it('should call fit on the parent', (done) => {
        let widget = new LogWidget();
        let layout = new LogLayout();
        widget.layout = layout;
        widget.attach(document.body);
        widget.hide();
        widget.show();
        expect(layout.methods.indexOf('onAfterShow')).to.not.be(-1);
        requestAnimationFrame(() => {
          expect(widget.messages.indexOf('fit-request')).to.not.be(-1);
          widget.dispose();
          done();
        });
      });

    });

    describe('#onAfterAttach()', () => {

      it('should call fit on the parent', (done) => {
        let widget = new LogWidget();
        let layout = new LogLayout();
        widget.layout = layout;
        widget.attach(document.body);
        expect(layout.methods.indexOf('onAfterAttach')).to.not.be(-1);
        requestAnimationFrame(() => {
          expect(widget.messages.indexOf('fit-request')).to.not.be(-1);
          widget.dispose();
          done();
        });
      });

    });

    describe('#onChildShown()', () => {

      it('should post or send fit message to the parent', (done) => {
        let widget = new LogWidget();
        let layout = new LogLayout();
        widget.layout = layout;
        layout.addChild(new Widget());
        layout.addChild(new Widget());
        widget.attach(document.body);
        layout.childAt(0).hide();
        layout.childAt(0).show();
        expect(layout.methods.indexOf('onChildShown')).to.not.be(-1);
        requestAnimationFrame(() => {
          expect(widget.messages.indexOf('fit-request')).to.not.be(-1);
          widget.dispose();
          done();
        });
      });

    });

    describe('#onChildHidden()', () => {

      it('should post or send fit message to the parent', (done) => {
        let widget = new LogWidget();
        let layout = new LogLayout();
        widget.layout = layout;
        layout.addChild(new Widget());
        layout.addChild(new Widget());
        widget.attach(document.body);
        layout.childAt(0).hide();
        expect(layout.methods.indexOf('onChildHidden')).to.not.be(-1);
        requestAnimationFrame(() => {
          expect(widget.messages.indexOf('fit-request')).to.not.be(-1);
          widget.dispose();
          done();
        });
      });

    });

    describe('#onResize()', () => {

      it('should lay out the children', () => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        widget.node.style.width = '50px';
        widget.node.style.height = '50px';
        let layout = new LogLayout();
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        expect(children[0].node.style.width).to.be('');
        expect(children[1].node.style.width).to.be('');
        sendMessage(widget, ResizeMessage.UnknownSize);
        expect(layout.methods.indexOf('onResize')).to.not.be(-1);
        expect(layout.childAt(0).node.style.width).to.be('50px');
        expect(layout.childAt(1).node.style.width).to.be('50px');
        widget.dispose();
      });

    });

    describe('#onUpdateRequest()', () => {

      it('should lay out the children', () => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        widget.node.style.width = '50px';
        widget.node.style.height = '50px';
        let layout = new LogLayout();
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        expect(children[0].node.style.width).to.be('');
        expect(children[1].node.style.width).to.be('');
        sendMessage(widget, Widget.MsgUpdateRequest);
        expect(layout.methods.indexOf('onUpdateRequest')).to.not.be(-1);
        expect(layout.childAt(0).node.style.width).to.be('50px');
        expect(layout.childAt(1).node.style.width).to.be('50px');
        widget.dispose();
      });

    });

    describe('#onFitRequest()', () => {

      it('should fit to the size required by the children', (done) => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        children[0].node.style.minHeight = '100px';
        children[1].node.style.minHeight = '100px';
        expect(widget.node.style.minHeight).to.be('');
        widget.fit();
        requestAnimationFrame(() => {
          expect(layout.methods.indexOf('onFitRequest')).to.not.be(-1);
          expect(widget.node.style.minHeight).to.be('208px');
          widget.dispose();
          done();
        });
      });

      it('should handle bottom to top', (done) => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        layout.direction = BoxLayout.BottomToTop;
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        children[0].node.style.minHeight = '100px';
        children[1].node.style.minHeight = '100px';
        expect(widget.node.style.minHeight).to.be('');
        widget.fit();
        requestAnimationFrame(() => {
          expect(layout.methods.indexOf('onFitRequest')).to.not.be(-1);
          expect(widget.node.style.minHeight).to.be('208px');
          widget.dispose();
          done();
        });
      });

      it('should handle left to right', (done) => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        layout.direction = BoxLayout.LeftToRight;
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        children[0].node.style.minWidth = '100px';
        children[1].node.style.minWidth = '100px';
        expect(widget.node.style.minHeight).to.be('');
        widget.fit();
        requestAnimationFrame(() => {
          expect(layout.methods.indexOf('onFitRequest')).to.not.be(-1);
          expect(widget.node.style.minWidth).to.be('208px');
          widget.dispose();
          done();
        });
      });

      it('should handle right to left', (done) => {
        let widget = new LogWidget();
        let children = [new Widget(), new Widget()];
        let layout = new LogLayout();
        layout.direction = BoxLayout.RightToLeft;
        widget.layout = layout;
        widget.attach(document.body);
        layout.addChild(children[0]);
        layout.addChild(children[1]);
        children[0].node.style.minWidth = '100px';
        children[1].node.style.minWidth = '100px';
        expect(widget.node.style.minHeight).to.be('');
        widget.fit();
        requestAnimationFrame(() => {
          expect(layout.methods.indexOf('onFitRequest')).to.not.be(-1);
          expect(widget.node.style.minWidth).to.be('208px');
          widget.dispose();
          done();
        });
      });

    });

  });

});
