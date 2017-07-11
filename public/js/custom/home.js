/*********************************************************************************** *
 * MIT License
 *
 * Copyright (c) 2017 Raphael "rGunti" Guntersweiler
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * ********************************************************************************* */

var ACTIONS = {
    'shutdown': {
        confirm: {
            title: 'Shutdown System',
            message: 'Would you like to shutdown the system? ' +
                'You won\'t be able to access it after shutdown.'
        },
        action: function() {
            sendSimpleAjaxRequest('/api/shutdown', 'post', null, function() {
                processingModal.modal('hide');
            });
        }
    },
    'reboot': {
        confirm: {
            title: 'Reboot System',
            message: 'Would you like to reboot the system?'
        },
        action: function() {
            sendSimpleAjaxRequest('/api/reboot', 'post', null, function() {
                processingModal.modal('hide');
            });
        }
    }
};

var confirmModal;
var processingModal;

$(document).ready(function() {
    confirmModal = $('#systemConfirmModal');
    processingModal = $('#processingModal');

    function openModal(action, modalConfig) {
        confirmModal.data('action', action);
        $('.modal-title', confirmModal).text(modalConfig.title);
        $('.modal-body', confirmModal).text(modalConfig.message);
        confirmModal.modal('show');
    }

    $('.btn-action').click(function(e) {
        var action = $(e.currentTarget).data('action');
        openModal(action, ACTIONS[action].confirm);
    });

    $('.btn-info', confirmModal).click(function(e) {
        var action = confirmModal.data('action');
        confirmModal.modal('hide');
        processingModal.modal('show');

        ACTIONS[action].action();
    });
});
