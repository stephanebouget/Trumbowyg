/* ===========================================================
 * trumbowyg.pasteimage.js v1.0
 * Basic base64 paste plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        plugins: {
            pasteImage: {
                init: function (trumbowyg) {
                    console.info('FORK');
                    trumbowyg.pasteHandlers.push(function (pasteEvent) {
                        try {
                            var items = (pasteEvent.originalEvent || pasteEvent).clipboardData.items,
                                mustPreventDefault = false,
                                reader;
                            console.info('FORK items', items);

                            for (var i = items.length - 1; i >= 0; i -= 1) {
                                if (items[i].type.match(/^image\//)) {
                                    reader = new FileReader();
                                    /* jshint -W083 */
                                    reader.onloadend = function (event) {
                                        console.info('FORK event', event);

                                       // trumbowyg.execCmd('insertImage', event.target.result, false, true);
                                        trumbowyg.execCmd('insertImage', 'http://localhost:9000/images/logo-parrot.svg', false, true);
                                    };
                                    /* jshint +W083 */
                                    reader.readAsDataURL(items[i].getAsFile());

                                    mustPreventDefault = true;
                                }
                            }

                            if (mustPreventDefault) {
                                pasteEvent.stopPropagation();
                                pasteEvent.preventDefault();
                            }
                        } catch (c) {
                        }
                    });
                }
            }
        }
    });
})(jQuery);
